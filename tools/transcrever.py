"""Transcrição LOCAL (sem API paga) para conferir a narração gravada: Whisper large-v3-turbo via faster-whisper.

Usado por tools/gravar-narracao.mjs, que o abre uma vez e manda um caminho de áudio por linha;
para cada linha, responde uma linha JSON {"texto": "...", "palavras": [[palavra, ini, fim], ...]}
(tempos em segundos, usados para marcar onde cada frase começa) ou {"erro": "..."}.

Instalação (só no ambiente de desenvolvimento, uma vez): pip install faster-whisper
Na primeira execução o modelo (~800 MB) é baixado do Hugging Face e fica em cache.
Uso avulso: python3 tools/transcrever.py arquivo.mp3 ...
"""
import json
import os
import subprocess
import sys

import numpy as np
from faster_whisper import WhisperModel

MODELO = "large-v3-turbo"
# Idioma da fala (pt, en, fr, es): o gravar-narracao.mjs passa CV_IDIOMA e, nas traduções, os nomes em CV_NOMES
IDIOMA = os.environ.get("CV_IDIOMA", "pt")
# Nomes próprios dos livros: ajudam o Whisper a não "corrigir" o que a voz disse certo
NOMES = os.environ.get("CV_NOMES") or ("Dom Quixote de La Mancha, Alonso Quixano, Sancho Pança, Rocinante, Dulcineia del Toboso, Aldonza Lorenzo, "
         "Montiel, Campo de Criptana, Miguel de Cervantes, Mambrino, Micomicona, Micomicão, Alifanfarrão, Pentapolim, "
         "Trapobana, Pandafilando da Fosca Vista, Clavilenho, Barataria, Sansão Carrasco, Amadis, Teresa Pança, Sanchica.")


def ler(arquivo):
    # Decodifica com o ffmpeg (16 kHz, mono): evita a dependência do PyAV na versão certa.
    # -nostdin e stdin fechado: senão o ffmpeg "come" o começo da próxima linha da fila (o caminho seguinte)
    pcm = subprocess.run(["ffmpeg", "-nostdin", "-loglevel", "error", "-i", arquivo, "-f", "s16le", "-ac", "1", "-ar", "16000", "-"],
                         stdin=subprocess.DEVNULL, capture_output=True, check=True).stdout
    return np.frombuffer(pcm, np.int16).astype(np.float32) / 32768


def transcrever(modelo, arquivo):
    trechos, _ = modelo.transcribe(ler(arquivo), language=IDIOMA, beam_size=5, condition_on_previous_text=False,
                                   word_timestamps=True, initial_prompt=NOMES)
    trechos = list(trechos)
    palavras = [[p.word.strip(), round(p.start, 3), round(p.end, 3)] for t in trechos for p in (t.words or [])]
    return " ".join(t.text.strip() for t in trechos), palavras


def main():
    modelo = WhisperModel(MODELO, device="cpu", compute_type="int8")
    if len(sys.argv) > 1:
        for arquivo in sys.argv[1:]:
            print(f"{arquivo}: {transcrever(modelo, arquivo)[0]}")
        return
    print(json.dumps({"pronto": True}), flush=True)
    for linha in sys.stdin:
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
