"""Recorta uma camada gerada sobre fundo magenta puro (#FF00FF) e salva um PNG com canal alfa.

Uso:  python3 tools/recortar-camada.py entrada.png saida.png [--margem 6] [--sem-rosa]

      --sem-contorno: tira o contorno branco de "adesivo" que o modelo às vezes pinta em volta do desenho
                  (descasca, a partir do fundo, os pixels claros e pouco saturados, até 12 px, parando no traço de lápis)
      --sem-rosa: o desenho não tem rosa nenhum (poeira, madeira): todo pixel rosado é tratado como mistura
                  com o magenta, não só os da borda

O Nano-Banana não entrega transparência. Por isso as camadas são pedidas sobre magenta (chroma key), uma cor
que não aparece nas aquarelas (tools/gerar-imagens.mjs). Lição das camadas da pousada (P-003/P-005): tirar um
fundo BRANCO come as partes claras do personagem (o avental) e deixa "chão" claro em volta.

- Alfa pelo "excesso de magenta" de cada pixel: m = min(R, B) - G (255 no fundo, ~0 ou negativo no desenho).
- Nas bordas semitransparentes, a cor é "desmisturada" do magenta (F = (C - (1 - a) K) / a), sem halo rosa.
- Manchas soltas da textura do papel, longe do desenho, viram transparentes.
- Corta a imagem justa em volta do desenho (com uma pequena margem), como pede o TODO (§0.4).
Depois rode `npm run build:images` para converter para WebP (o alfa é preservado).
"""
import sys
import numpy as np
from PIL import Image, ImageFilter

OPACO = 40.0      # m até aqui: pixel do desenho (opaco)
FUNDO = 215.0     # m a partir daqui: fundo (transparente); o magenta gerado varia de ~185 a 250 (textura do papel)


def recortar(entrada: str, saida: str, margem: int = 6, sem_rosa: bool = False, sem_contorno: bool = False) -> None:
    c = np.asarray(Image.open(entrada).convert('RGB')).astype(np.float32)
    r, g, b = c[..., 0], c[..., 1], c[..., 2]
    m = np.minimum(r, b) - g
    a = np.clip((FUNDO - m) / (FUNDO - OPACO), 0, 1)
    a[a < 0.04] = 0
    # Manchas da textura do papel longe do desenho: só vale o alfa perto da silhueta sólida (a > 0.5)
    solido = Image.fromarray(((a > 0.5) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(9))
    a[np.asarray(solido) == 0] = 0
    # Perto do fundo, um pixel rosado é mistura de um desenho claro com o magenta (ex.: os fiapos da poeira),
    # e não um rosa do desenho: o alfa sai da mistura com uma cor clara neutra (m ~ -20). Longe do fundo
    # (flores, focinho), o rosa fica como está.
    fundo = Image.fromarray(((a < 0.05) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(31))
    rosado = ((np.asarray(fundo) > 0) | sem_rosa) & (m > 15)
    a = np.where(rosado, np.minimum(a, np.clip((FUNDO - m) / (FUNDO + 20), 0, 1)), a)

    if sem_contorno:
        # decide pela cor já desmisturada do magenta (a franja é mistura de branco com magenta)
        f0 = np.clip((c - (1 - a)[..., None] * np.array([255, 0, 255], np.float32)) / np.maximum(a, 1e-3)[..., None], 0, 255)
        claro = (f0.min(axis=2) > 175) & ((f0.max(axis=2) - f0.min(axis=2)) < 55)
        for _ in range(12):
            vazio = Image.fromarray(((a < 0.5) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))
            casca = (np.asarray(vazio) > 0) & claro & (a > 0)
            if not casca.any():
                break
            a[casca] = 0

    # Desmistura do magenta nas bordas
    k = np.array([255, 0, 255], np.float32)
    seguro = np.maximum(a, 1e-3)[..., None]
    f = np.clip((c - (1 - a)[..., None] * k) / seguro, 0, 255)
    f = np.where((a > 0.999)[..., None], c, f)
    # Vazamento de magenta: o modelo às vezes PINTA fiapos rosados nas bordas (ex.: a poeira). Nas partes
    # semitransparentes, tira o excesso de R e B sobre G; o rosa opaco do desenho (focinho, flores) fica.
    excesso = np.clip(np.minimum(f[..., 0], f[..., 2]) - f[..., 1], 0, None) * (a < 0.98)
    f[..., 0] -= excesso
    f[..., 2] -= excesso
    # Nos pixels rosados da borda, o que resta de rosa vira um tom neutro, e o fiapo fica mais transparente
    f[..., 0] = np.where(rosado, np.minimum(f[..., 0], f[..., 1] + 20), f[..., 0])
    f[..., 2] = np.where(rosado, np.minimum(f[..., 2], f[..., 1] + 5), f[..., 2])
    a = np.where(rosado, a * a, a)

    rgba = np.dstack([f, a * 255]).round().astype(np.uint8)
    ys, xs = np.nonzero(a > 0.04)
    if len(xs) == 0:
        raise SystemExit(f'{entrada}: nada além do fundo magenta')
    x0, x1 = max(xs.min() - margem, 0), min(xs.max() + margem + 1, rgba.shape[1])
    y0, y1 = max(ys.min() - margem, 0), min(ys.max() + margem + 1, rgba.shape[0])
    im = Image.fromarray(rgba[y0:y1, x0:x1], 'RGBA')
    im.save(saida)

    # Conferência: pixels ainda "magenta" (rosa forte) que ficaram visíveis
    v = rgba[y0:y1, x0:x1].astype(np.int16)
    rosa = ((v[..., 3] > 25) & (v[..., 0] > 200) & (v[..., 2] > 200) & (v[..., 1] < 90)).sum()
    print(f'{entrada} -> {saida} {im.size}, recorte x {x0}-{x1}, y {y0}-{y1} de {c.shape[1]}x{c.shape[0]}; '
          f'pixels rosa visíveis: {rosa}')


if __name__ == '__main__':
    args = sys.argv[1:]
    margem = 6
    sem_rosa = '--sem-rosa' in args
    if sem_rosa:
        args.remove('--sem-rosa')
    sem_contorno = '--sem-contorno' in args
    if sem_contorno:
        args.remove('--sem-contorno')
    if '--margem' in args:
        i = args.index('--margem')
        margem = int(args[i + 1])
        del args[i:i + 2]
    if len(args) != 2:
        raise SystemExit(__doc__)
    recortar(args[0], args[1], margem, sem_rosa, sem_contorno)
