"""Teste de regressão do tools/audio_gate.py (sem API, sem arquivos: sinais sintéticos).

1. Fala que termina 80 ms antes do fim do arquivo (o que o otimizar-audio.mjs deixa) e tem micro-pausas entre as
   palavras: a ÚLTIMA palavra tem de ficar inteira. Era o bug das Issues #75, #76 e #79 (2026-11-28): o detector
   de "rajada final" tomava a própria palavra por rajada e zerava a partir da primeira micro-pausa.
2. Fala + pausa + rajada de ruído branco do TTS no fim: a rajada tem de sumir e a fala, ficar.
Uso: python3 tools/testar-audio-gate.py   (npm run testar:audio). Sai com código 1 se algum caso falhar.
"""
import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import audio_gate as g  # noqa: E402

SR = 24000
rng = np.random.default_rng(1)


def palavra(dur, f0=180):
    t = np.arange(int(SR * dur)) / SR
    s = sum(np.sin(2 * np.pi * f0 * h * t) / h for h in range(1, 8))   # voz "tonal" (harmônicos)
    return (6000 * s * np.hanning(len(t)) ** 0.3).astype(np.float32)


def silencio(d):
    return np.zeros(int(SR * d), np.float32)


def rms(a):
    return float(np.sqrt(np.mean(a.astype(np.float32) ** 2)))


fala = np.concatenate([silencio(.2), palavra(.4), silencio(.05), palavra(.3, 200), silencio(.06), palavra(.35, 170)])
ult = slice(len(fala) - int(SR * .35), len(fala))
falhas = []

c1 = np.concatenate([fala, silencio(.08)])
o1 = g.clean_audio_stream(c1.astype(np.int16)).astype(np.float32)
if rms(o1[ult]) < .9 * rms(c1[ult]):
    falhas.append('caso 1: a última palavra foi cortada (fala sem rajada no fim)')

rajada = (rng.standard_normal(int(SR * .18)) * 11000).clip(-32768, 32767).astype(np.float32)
c2 = np.concatenate([fala, silencio(.10), rajada, silencio(.02)])
o2 = g.clean_audio_stream(c2.astype(np.int16)).astype(np.float32)
ini_r = len(fala) + int(SR * .10)
if np.max(np.abs(o2[ini_r:ini_r + len(rajada)])) > 50:
    falhas.append('caso 2: a rajada de ruído do fim não foi zerada')
if rms(o2[ult]) < .9 * rms(c2[ult]):
    falhas.append('caso 2: a última palavra foi cortada junto com a rajada')

for f in falhas:
    print('❌', f)
print('✅ audio_gate: última palavra preservada e rajada final removida.' if not falhas else f'{len(falhas)} falha(s).')
sys.exit(1 if falhas else 0)
