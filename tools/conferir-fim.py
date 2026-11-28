"""Confere, de ouvido (Whisper LOCAL, sem API paga), se o FIM de cada página gravada (pN.mp3) está inteiro:
a última palavra da última frase tem de aparecer no fim do áudio.

Por quê (2026-11-28, Issues #75, #76 e #79): o detector de "rajada final" do tools/audio_gate.py confundia a
última palavra da página com a rajada de ruído do TTS e zerava o fim da frase ("…de cabeça [para baixo]",
"…ajudar Mestre [Tomé]", "…a ponte [juntos]"). A conferência da gravação (Whisper bloco a bloco) roda ANTES do
gate, por isso não via o corte. Esta conferência roda no MP3 final, depois do gate.

Uso:
  python3 tools/conferir-fim.py                                   (todos os livros, idiomas e partes gravadas)
  python3 tools/conferir-fim.py --livro robin-hood --partes 1,2 --idiomas pt
  CV_WHISPER_MODELO=small python3 tools/conferir-fim.py ...       (CPU sem GPU: o "small" basta para isto)
Sai com código 1 se alguma página parecer cortada. "CORTE?" pode ser nome próprio que o Whisper escreveu de
outro jeito (ex.: "Sherwood" no lugar de Xervedo): confira de ouvido antes de regravar.
"""
import difflib
import glob
import json
import os
import re
import subprocess
import sys
import unicodedata

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import transcrever as T  # noqa: E402  (mesmo modelo/GPU da gravação; CV_WHISPER_MODELO troca o modelo)

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def args():
    a, i, argv = {}, 0, sys.argv[1:]
    while i < len(argv):
        if argv[i].startswith('--'):
            a[argv[i][2:]] = argv[i + 1] if i + 1 < len(argv) else ''
            i += 2
        else:
            i += 1
    return a


def palavras(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.findall(r"[a-z0-9]+", s)


def parecida(a, b):
    return a == b or difflib.SequenceMatcher(None, a, b).ratio() >= 0.75


def alvos(op):
    livros = op.get('livro', '').split(',') if op.get('livro') else sorted(
        d for d in os.listdir(RAIZ) if os.path.isdir(os.path.join(RAIZ, d, 'audio')))
    partes = set(op['partes'].split(',')) if op.get('partes') else None
    idiomas = set(op['idiomas'].split(',')) if op.get('idiomas') else None
    for livro in livros:
        for pasta in sorted(glob.glob(os.path.join(RAIZ, livro, 'audio', 'narracao*', 'parte-*'))):
            voz = os.path.basename(os.path.dirname(pasta))
            parte = pasta.rsplit('-', 1)[-1]
            idioma = voz.split('-', 1)[1] if '-' in voz else 'pt'
            if (partes and parte not in partes) or (idiomas and idioma not in idiomas):
                continue
            suf = '' if idioma == 'pt' else f'-{idioma}'
            arq_frases = os.path.join(RAIZ, 'docs', 'narracao', f'frases-{livro}-parte-{parte}{suf}.json')
            arq_reg = os.path.join(pasta, 'paginas.json')
            if not (os.path.exists(arq_frases) and os.path.exists(arq_reg)):
                continue
            frases = {f['id']: f for f in json.load(open(arq_frases, encoding='utf8'))['frases']}
            elenco = os.path.join(RAIZ, livro, 'audio', voz, 'elenco.json')
            nomes = json.load(open(elenco, encoding='utf8')).get('nomes', '') if os.path.exists(elenco) else ''
            reg = json.load(open(arq_reg, encoding='utf8'))
            for k in sorted((k for k in reg if re.fullmatch(r'p\d+', k)), key=lambda k: int(k[1:])):
                v = reg[k]
                if isinstance(v, dict) and v.get('frases') and os.path.exists(os.path.join(pasta, v['arquivo'])):
                    yield livro, idioma, parte, k, os.path.join(pasta, v['arquivo']), v['frases'][-1], frases, nomes


def main():
    op = args()
    modelo = T._carregar_modelo()
    cortes = 0
    total = 0
    for livro, idioma, parte, k, arq, ult, frases, nomes in alvos(op):
        esperado = palavras(frases.get(ult['id'], {}).get('fala', ''))
        if not esperado:
            continue
        total += 1
        # a última frase (com 0,3 s antes) + 0,5 s de silêncio, para o Whisper não "engolir" o fim
        pcm = subprocess.run([T.FFMPEG_BIN, '-nostdin', '-v', 'error', '-ss', str(max(0, ult['ini'] - 0.3)), '-i', arq,
                              '-f', 's16le', '-ac', '1', '-ar', '16000', '-'], stdin=subprocess.DEVNULL,
                             capture_output=True, check=True).stdout
        audio = np.concatenate([np.frombuffer(pcm, np.int16).astype(np.float32) / 32768, np.zeros(8000, np.float32)])
        trechos, _ = modelo.transcribe(audio, language=idioma, beam_size=5, condition_on_previous_text=False,
                                       initial_prompt=nomes or T.NOMES)
        ouvido = palavras(' '.join(t.text for t in trechos))
        fim = ouvido[-4:]
        ok = any(parecida(w, esperado[-1]) for w in fim)
        rotulo = f'{livro} {idioma} P{parte} {k}'
        if ok:
            print(f'OK     {rotulo}', flush=True)
            continue
        cortes += 1
        faltam = 0
        for w in reversed(esperado):
            if any(parecida(w, x) for x in ouvido[-6:]):
                break
            faltam += 1
        print(f'CORTE? {rotulo} ({os.path.relpath(arq, RAIZ)}): esperado "…{" ".join(esperado[-5:])}" | '
              f'ouvido "…{" ".join(ouvido[-6:])}" (faltam ~{faltam} palavra(s))', flush=True)
    print(f'\nFim das páginas: {total - cortes}/{total} inteiras; {cortes} para conferir de ouvido.')
    sys.exit(1 if cortes else 0)


if __name__ == '__main__':
    main()
