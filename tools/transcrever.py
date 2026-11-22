"""Transcrição LOCAL (sem API paga) para conferir a narração gravada: Whisper large-v3-turbo via faster-whisper.

Usado por tools/gravar-narracao.mjs, que o abre uma vez e manda um caminho de áudio por linha;
para cada linha, responde uma linha JSON {"texto": "...", "palavras": [[palavra, ini, fim], ...]}
(tempos em segundos, usados para marcar onde cada frase começa) ou {"erro": "..."}.

Instalação (só no ambiente de desenvolvimento, uma vez): pip install faster-whisper
Na primeira execução o modelo (~800 MB) é baixado do Hugging Face e fica em cache.
Uso avulso: python3 tools/transcrever.py arquivo.mp3 ...
"""
import ctypes
import glob
import json
import os
import site
import subprocess
import sys

import numpy as np
from faster_whisper import WhisperModel

try:
    import imageio_ffmpeg
    FFMPEG_BIN = imageio_ffmpeg.get_ffmpeg_exe()
except Exception:
    FFMPEG_BIN = 'ffmpeg'

MODELO = "large-v3-turbo"
# Idioma da fala (pt, en, fr, es): o gravar-narracao.mjs passa CV_IDIOMA e, nas traduções, os nomes em CV_NOMES
IDIOMA = os.environ.get("CV_IDIOMA", "pt")
# Nomes próprios dos livros: ajudam o Whisper a não "corrigir" o que a voz disse certo
NOMES = os.environ.get("CV_NOMES") or ("Dom Quixote de La Mancha, Alonso Quixano, Sancho Pança, Rocinante, Dulcineia del Toboso, Aldonza Lorenzo, "
         "Montiel, Campo de Criptana, Miguel de Cervantes, Mambrino, Micomicona, Micomicão, Alifanfarrão, Pentapolim, "
         "Trapobana, Pandafilando da Fosca Vista, Clavilenho, Barataria, Sansão Carrasco, Amadis, Teresa Pança, Sanchica, "
         "mestre Nicolau, Doroteia, bacielmo, Eugênio, Manchadinha, Antônia, Teresinha, Pedro Rezio de Tirafora, "
         "Mari Gutiérrez, Dom Antônio, Saragoça, Barcelona, Quixotiz, Curiambro, Miculoso, Teresona, Sansonino.")


def ler(arquivo):
    # Decodifica com o ffmpeg (16 kHz, mono): evita a dependência do PyAV na versão certa.
    # -nostdin e stdin fechado: senão o ffmpeg "come" o começo da próxima linha da fila (o caminho seguinte)
    pcm = subprocess.run([FFMPEG_BIN, "-nostdin", "-loglevel", "error", "-i", arquivo, "-f", "s16le", "-ac", "1", "-ar", "16000", "-"],
                         stdin=subprocess.DEVNULL, capture_output=True, check=True).stdout
    return np.frombuffer(pcm, np.int16).astype(np.float32) / 32768


def transcrever(modelo, arquivo):
    trechos, _ = modelo.transcribe(ler(arquivo), language=IDIOMA, beam_size=5, condition_on_previous_text=False,
                                   word_timestamps=True, initial_prompt=NOMES)
    trechos = list(trechos)
    palavras = [[p.word.strip(), round(p.start, 3), round(p.end, 3)] for t in trechos for p in (t.words or [])]
    return " ".join(t.text.strip() for t in trechos), palavras


def _registrar_cuda_windows():
    """Registra pastas bin CUDA/cuDNN de pacotes nvidia/* ou de CV_CUDA_BIN no Windows."""
    if sys.platform != "win32":
        return
    candidatos = [p for p in os.environ.get("CV_CUDA_BIN", "").split(os.pathsep) if p]
    raizes = list(site.getsitepackages()) + [site.getusersitepackages()]
    for raiz in raizes:
        candidatos.extend(glob.glob(os.path.join(raiz, "nvidia", "*", "bin")))
    vistos = set()
    for pasta in candidatos:
        norm = os.path.normcase(os.path.abspath(pasta))
        if norm not in vistos and os.path.isdir(pasta):
            vistos.add(norm)
            os.add_dll_directory(pasta)


def _carregar_modelo():
    """Usa GPU (CUDA) automaticamente quando há placa e DLLs CUDA 12/cuDNN 9; caso contrário, cai para CPU."""
    pedido = os.environ.get("CV_WHISPER_DEVICE", "auto").lower()
    if pedido != "cpu":
        try:
            import ctranslate2
            if ctranslate2.get_cuda_device_count() > 0:
                _registrar_cuda_windows()
                if sys.platform == "win32":
                    ctypes.WinDLL("cublas64_12.dll")
                    ctypes.WinDLL("cudnn64_9.dll")
                compute = os.environ.get("CV_WHISPER_COMPUTE", "int8_float16")
                return WhisperModel(MODELO, device="cuda", compute_type=compute)
        except Exception as e:  # noqa: BLE001 — fallback seguro para CPU
            if pedido == "cuda":
                raise
            print(f"[transcrever] CUDA indisponível ({e}); usando CPU.", file=sys.stderr)
    return WhisperModel(MODELO, device="cpu", compute_type="int8")


def main():
    modelo = _carregar_modelo()
    if len(sys.argv) > 1:
        for arquivo in sys.argv[1:]:
            print(f"{arquivo}: {transcrever(modelo, arquivo)[0]}")
        return
    print(json.dumps({"pronto": True}), flush=True)
    while True:
        linha = sys.stdin.readline()
        if not linha: break
        arquivo = linha.strip()
        if not arquivo:
            continue
        try:
            texto, palavras = transcrever(modelo, arquivo)
            resposta = {"texto": texto, "palavras": palavras}
        except Exception as e:  # noqa: BLE001 — o chamador decide o que fazer
            resposta = {"erro": str(e)}
        print(json.dumps(resposta, ensure_ascii=False), flush=True)


if __name__ == "__main__":
    main()
