# -*- coding: utf-8 -*-
"""
Ferramenta de limpeza espectral e eliminação de ruídos na narração:
1. Eliminação de rajada/estalo de fim de arquivo (Tail Burst): Gemini TTS frequentemente
   produz um pacote de ruído de alta amplitude (pico até 32768, RMS > 10000) nos últimos
   150-200 ms, logo após o término da fala e de uma pausa de silêncio. Essa rajada é
   zerada suavemente com rampa Hann, mantendo rigorosamente a contagem de amostras
   (preserve_length: True) para compatibilidade com paginas.json.
2. Eliminação das rajadas INTERNAS (o "arranhão de agulha no vinil" entre frases): a página
   gravada é montada emendando vários pedidos à API (blocos: narradora + um personagem), e
   cada pedido traz a sua rajada de fim (~150-230 ms de ruído quase branco, RMS ~0,3-0,45 do
   fundo de escala, picos estourando) logo antes da pausa entre blocos, ou seja, exatamente
   na passagem de uma frase para a outra. O item 1 só pegava a última, a do fim do arquivo.
   Assinatura (sem nenhum falso positivo em todo o acervo, 2026-11-12): janelas de 30 ms
   altas (RMS > 4900) e com cara de ruído (planura espectral > 0,06) por >= 50 ms seguidos;
   a fala alta tem planura < 0,01. A rajada é zerada com rampas Hann de 10 ms, sem mudar a
   contagem de amostras (os ini/fim do paginas.json continuam valendo).
3. Gate espectral de pausas internas: elimina o piso estático (hiss neural de difusão de
   4 kHz a 12 kHz) nas pausas entre títulos, parágrafos e frases, preservando 100% da voz.

Uso:
  python3 tools/audio_gate.py                    (processa todos os MP3 de dom-quixote/audio/)
  python3 tools/audio_gate.py arquivo1.mp3 ...   (processa os arquivos informados)
  python3 tools/audio_gate.py --so-rajadas [arquivos]   (só tira as rajadas internas; não mexe
                                                 no resto nem recodifica arquivo sem rajada)
"""

import glob
import os
import shutil
import sys
import subprocess
import numpy as np

try:
    import imageio_ffmpeg
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
except ImportError:   # sem o pacote: o ffmpeg do sistema
    ffmpeg = shutil.which('ffmpeg') or 'ffmpeg'


def remover_rajadas_internas(samples_f, sample_rate=24000):
    """Zera, no lugar, as rajadas de ruído das emendas entre blocos (ver item 2 do cabeçalho).
    samples_f: float32 na escala do int16. Devolve a lista de trechos zerados (ini, fim) em amostras."""
    frame_len = int(sample_rate * 0.01)          # passo de 10 ms
    janela = 3 * frame_len                       # janela de 30 ms centrada no quadro
    n = len(samples_f) // frame_len
    if n < 10:
        return []
    pad = np.concatenate([np.zeros(frame_len, np.float32), samples_f.astype(np.float32),
                          np.zeros(janela, np.float32)])
    W = np.lib.stride_tricks.sliding_window_view(pad, janela)[::frame_len][:n]
    rms = np.sqrt(np.mean(W ** 2, axis=1))
    P = np.abs(np.fft.rfft(W * np.hanning(janela), axis=1)) ** 2 + 1e-9
    planura = np.exp(np.mean(np.log(P), axis=1)) / np.mean(P, axis=1)
    ruido = (rms > 4900) & (planura > 0.06)
    quieto = 330                                 # ~0,01 do fundo de escala

    # grupos de quadros ruidosos (buracos de até 30 ms não separam o grupo)
    grupos, i = [], 0
    while i < n:
        if not ruido[i]:
            i += 1
            continue
        j, ult, cont = i, i, 0
        while j < n and j - ult <= 3:
            if ruido[j]:
                ult, cont = j, cont + 1
            j += 1
        grupos.append((i, ult + 1, cont))
        i = ult + 1

    trechos = []
    for a, b, cont in grupos:
        if cont < 5 or (b - a) > 35:             # >= 50 ms de ruído, no máximo 350 ms de extensão
            continue
        # estende pelas bordas da rajada (subida e descida) até o silêncio, sem entrar na fala:
        # a fala é tonal de forma sustentada (planura < 0,01 em 3 quadros seguidos)
        def fala(k, passo):
            ks = [k + passo * d for d in range(3) if 0 <= k + passo * d < n]
            return all(planura[q] < 0.01 for q in ks)
        ext = 0
        while a > 0 and ext < 8 and rms[a - 1] > quieto and not fala(a - 1, -1):
            a, ext = a - 1, ext + 1
        ext = 0
        while b < n and ext < 8 and rms[b] > quieto and not fala(b, 1):
            b, ext = b + 1, ext + 1
        ini, fim = a * frame_len, min(len(samples_f), b * frame_len)
        rampa = frame_len                        # Hann de 10 ms fora do trecho zerado
        r0 = max(0, ini - rampa)
        if ini > r0:
            samples_f[r0:ini] *= 0.5 * (1 + np.cos(np.pi * np.arange(ini - r0) / (ini - r0)))
        r1 = min(len(samples_f), fim + rampa)
        if r1 > fim:
            samples_f[fim:r1] *= 0.5 * (1 - np.cos(np.pi * np.arange(r1 - fim) / (r1 - fim)))
        samples_f[ini:fim] = 0.0
        trechos.append((ini, fim))
    return trechos

def clean_audio_stream(samples, sample_rate=24000, preserve_length=True):
    """
    samples: np.ndarray (float32 ou int16)
    sample_rate: taxa de amostragem (24000)
    preserve_length: se True, mantém exatamente a mesma quantidade de amostras (imprescindível
                     para pN.mp3 com marcações de frases em paginas.json).
    """
    orig_type = samples.dtype
    samples_f = samples.astype(np.float32)
    
    if len(samples_f) < sample_rate * 0.1:
        return samples

    frame_len = int(sample_rate * 0.01) # 10 ms = 240 amostras
    n_frames = len(samples_f) // frame_len
    
    # -------------------------------------------------------------
    # 1. ELIMINAÇÃO DE RAJADA DE FIM DE ARQUIVO (Tail Burst / Shutdown Click)
    # -------------------------------------------------------------
    check_frames = min(80, n_frames) # últimos 800 ms
    tail_frames = samples_f[(n_frames - check_frames)*frame_len : n_frames*frame_len].reshape(check_frames, frame_len)
    tail_rms = np.sqrt(np.mean(tail_frames**2, axis=1))
    
    # Se nos últimos 25 frames (250 ms) houver energia alta (RMS > 200)
    burst_candidates = np.where(tail_rms[-25:] > 200)[0]
    if len(burst_candidates) > 0:
        burst_start_local = (check_frames - 25) + burst_candidates[0]
        pre_burst = tail_rms[:burst_start_local]
        quiet_local = np.where(pre_burst < 60)[0]
        
        # Se houve pelo menos 4 frames (40 ms) de silêncio antes do pico
        if len(quiet_local) >= 4:
            last_speech_local = quiet_local[0]
            cutoff_sample = (n_frames - check_frames + last_speech_local) * frame_len
            
            fade_samples = int(sample_rate * 0.03) # fade out suave de 30 ms
            if cutoff_sample > fade_samples:
                ramp = 0.5 * (1 + np.cos(np.pi * np.arange(fade_samples) / fade_samples))
                samples_f[cutoff_sample - fade_samples : cutoff_sample] *= ramp
            samples_f[cutoff_sample:] = 0.0

    # -------------------------------------------------------------
    # 2. RAJADAS INTERNAS (emendas entre blocos: o "arranhão" entre frases)
    # -------------------------------------------------------------
    remover_rajadas_internas(samples_f, sample_rate)

    # -------------------------------------------------------------
    # 3. ANÁLISE ESPECTRAL E GATE DE RUÍDO NAS PAUSAS INTERNAS
    # -------------------------------------------------------------
    frames = samples_f[:n_frames * frame_len].reshape(n_frames, frame_len)
    frame_rms = np.sqrt(np.mean(frames**2, axis=1))
    
    freqs = np.fft.rfftfreq(frame_len, 1.0 / sample_rate)
    lf_mask = freqs < 3000
    hf_mask = freqs >= 4000
    
    ffts = np.abs(np.fft.rfft(frames, axis=1))
    lf_energy = np.sum(ffts[:, lf_mask]**2, axis=1)
    hf_energy = np.sum(ffts[:, hf_mask]**2, axis=1)
    total_energy = np.sum(ffts**2, axis=1) + 1e-9
    
    lf_ratio = lf_energy / total_energy
    
    # Detecção de fala:
    # - Fala robusta (RMS >= 700)
    # - OU voz suave (RMS >= 250 e predominância de baixas frequências lf_ratio >= 0.50)
    is_speech = (frame_rms >= 700) | ((frame_rms >= 250) & (lf_ratio >= 0.50))
    
    # Margem de segurança de fala (dilatação):
    # Expande 5 frames (50 ms) antes e depois de cada trecho de fala para proteger
    # consoantes não vocalizadas (/s/, /p/, /t/, /f/) e respirações naturais
    speech_dilated = is_speech.copy()
    for i in range(n_frames):
        if is_speech[i]:
            start = max(0, i - 5)
            end = min(n_frames, i + 6)
            speech_dilated[start:end] = True
            
    # Pausas reais são regiões sem fala por pelo menos 7 frames (70 ms)
    is_pause = ~speech_dilated
    gated_mask = np.zeros(n_frames, dtype=bool)
    in_pause = False
    p_start = 0
    for i, p in enumerate(is_pause):
        if p:
            if not in_pause:
                in_pause = True
                p_start = i
        else:
            if in_pause:
                in_pause = False
                if (i - p_start) >= 7:
                    gated_mask[p_start:i] = True
    if in_pause and (n_frames - p_start) >= 7:
        gated_mask[p_start:n_frames] = True
        
    # Curva de ganho inicial
    frame_gain = np.where(gated_mask, 0.0, 1.0)
    
    # Suavização com janela de Hann de 5 frames (50 ms) para transições graduais
    kernel = np.hanning(5)
    kernel /= np.sum(kernel)
    smoothed_gain = np.convolve(frame_gain, kernel, mode='same')
    
    # Interpolação no nível da amostra
    sample_indices = np.linspace(0, n_frames - 1, len(samples_f))
    gain = np.interp(sample_indices, np.arange(n_frames), smoothed_gain)
    
    # Fade in nos primeiros 15 ms e fade out nos últimos 15 ms
    edge_len = int(sample_rate * 0.015)
    if len(samples_f) > 2 * edge_len:
        ramp = 0.5 * (1 - np.cos(np.pi * np.arange(edge_len) / edge_len))
        gain[:edge_len] = np.minimum(gain[:edge_len], ramp)
        gain[-edge_len:] = np.minimum(gain[-edge_len:], ramp[::-1])
        
    cleaned = (samples_f * gain).astype(np.float32)
    
    if preserve_length:
        return np.round(np.clip(cleaned, -32768, 32767)).astype(orig_type)
        
    margin = int(sample_rate * 0.06)
    active = np.where(gain > 0.05)[0]
    if len(active) == 0:
        return np.round(np.clip(cleaned, -32768, 32767)).astype(orig_type)
    start_idx = max(0, active[0] - margin)
    end_idx = min(len(cleaned), active[-1] + 1 + margin)
    trimmed = cleaned[start_idx:end_idx]
    
    fade = int(sample_rate * 0.01)
    if len(trimmed) > 2 * fade:
        ramp = 0.5 * (1 - np.cos(np.pi * np.arange(fade) / fade))
        trimmed[:fade] *= ramp
        trimmed[-fade:] *= ramp[::-1]
        
    return np.round(np.clip(trimmed, -32768, 32767)).astype(orig_type)

def decode_mp3(path):
    cmd = [ffmpeg, '-v', 'error', '-i', path, '-f', 's16le', '-ac', '1', '-ar', '24000', '-']
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    raw, _ = p.communicate()
    return np.frombuffer(raw, dtype=np.int16)

def encode_mp3(samples, dest_path):
    tmp = dest_path + '.tmp.mp3'
    cmd = [
        ffmpeg, '-y', '-v', 'error',
        '-f', 's16le', '-ar', '24000', '-ac', '1', '-i', '-',
        '-c:a', 'libmp3lame', '-b:a', '48k', '-ar', '24000',
        tmp
    ]
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    p.communicate(input=samples.tobytes())
    if os.path.exists(tmp) and os.path.getsize(tmp) > 0:
        os.replace(tmp, dest_path)
        return True
    return False

def remover_so_rajadas(path):
    """Só as rajadas internas; o arquivo só é recodificado se tiver alguma."""
    samples_orig = decode_mp3(path)
    samples_f = samples_orig.astype(np.float32)
    trechos = remover_rajadas_internas(samples_f)
    if not trechos:
        return False
    limpo = np.round(np.clip(samples_f, -32768, 32767)).astype(np.int16)
    if not encode_mp3(limpo, path):
        return False
    print(f"  {path}: {len(trechos)} rajada(s) em " + ', '.join(f"{i / 24000:.2f}s" for i, _ in trechos))
    return True

def process_file(path):
    samples_orig = decode_mp3(path)
    if len(samples_orig) < 2400:
        return False
    is_page = ('narracao' in path and 'p' in os.path.basename(path) and not '-s' in os.path.basename(path))
    samples_clean = clean_audio_stream(samples_orig, sample_rate=24000, preserve_length=is_page)
    if len(samples_orig) != len(samples_clean):
        return encode_mp3(samples_clean, path)
    diff = np.abs(samples_orig.astype(np.float32) - samples_clean.astype(np.float32))
    if np.max(diff) > 10:
        return encode_mp3(samples_clean, path)
    return False

def main():
    args = sys.argv[1:]
    so_rajadas = '--so-rajadas' in args
    args = [a for a in args if a != '--so-rajadas']
    files = args if args else sorted(glob.glob('classicos-vivos/dom-quixote/audio/**/*.mp3', recursive=True))
    if not files and os.path.exists('dom-quixote/audio'):
        files = sorted(glob.glob('dom-quixote/audio/**/*.mp3', recursive=True))
    print(f"Processando gate de áudio e eliminação de rajadas em {len(files)} arquivos...")
    modificados = 0
    for f in files:
        if (remover_so_rajadas(f) if so_rajadas else process_file(f)):
            modificados += 1
    print(f"Concluído: {modificados} arquivos tratados com sucesso.")

if __name__ == '__main__':
    main()
