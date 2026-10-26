# -*- coding: utf-8 -*-
"""
Ferramenta de limpeza espectral e eliminação de ruídos na narração:
1. Eliminação de rajada/estalo de fim de arquivo (Tail Burst): Gemini TTS frequentemente
   produz um pacote de ruído de alta amplitude (pico até 32768, RMS > 10000) nos últimos
   150-200 ms, logo após o término da fala e de uma pausa de silêncio. Essa rajada é
   zerada suavemente com rampa Hann, mantendo rigorosamente a contagem de amostras
   (preserve_length: True) para compatibilidade com paginas.json.
2. Gate espectral de pausas internas: elimina o piso estático (hiss neural de difusão de
   4 kHz a 12 kHz) nas pausas entre títulos, parágrafos e frases, preservando 100% da voz.

Uso:
  python tools/audio_gate.py                     (processa todos os MP3 de dom-quixote/audio/)
  python tools/audio_gate.py arquivo1.mp3 ...    (processa os arquivos informados)
"""

import glob
import os
import sys
import subprocess
import imageio_ffmpeg
import numpy as np

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

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
    # 2. ANÁLISE ESPECTRAL E GATE DE RUÍDO NAS PAUSAS INTERNAS
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
    files = args if args else sorted(glob.glob('classicos-vivos/dom-quixote/audio/**/*.mp3', recursive=True))
    if not files and os.path.exists('dom-quixote/audio'):
        files = sorted(glob.glob('dom-quixote/audio/**/*.mp3', recursive=True))
    print(f"Processando gate de áudio e eliminação de rajadas em {len(files)} arquivos...")
    modificados = 0
    for f in files:
        if process_file(f):
            modificados += 1
    print(f"Concluído: {modificados} arquivos tratados com sucesso.")

if __name__ == '__main__':
    main()
