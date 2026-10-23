"""Converte ilustrações JPG/PNG de <livro>/imagens/ para WebP otimizado para tablet.

Uso:  python3 tools/otimizar-imagens.py            (todos os livros)
      python3 tools/otimizar-imagens.py caminho.png (arquivos específicos)

- Redimensiona para no máximo 1376 px de largura (resolução nativa do Nano-Banana em 16:9).
- Qualidade 80 (sem perda perceptível em aquarela/guache) e preserva canal alfa de sprites.
- Remove o arquivo original depois de gerar o .webp (o original continua no histórico do Git).
"""
import sys
from pathlib import Path
from PIL import Image

MAX_W = 1376
QUALITY = 80


def converter(src: Path) -> None:
    dst = src.with_suffix('.webp')
    im = Image.open(src)
    if im.width > MAX_W:
        im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
    has_alpha = im.mode in ('RGBA', 'LA') or 'transparency' in im.info
    im = im.convert('RGBA' if has_alpha else 'RGB')
    im.save(dst, 'WEBP', quality=QUALITY, method=6)
    print(f'{src} ({src.stat().st_size // 1024} KB) -> {dst.name} ({dst.stat().st_size // 1024} KB)')
    src.unlink()


if __name__ == '__main__':
    root = Path(__file__).resolve().parent.parent
    alvos = [Path(a) for a in sys.argv[1:]] or [
        p for p in root.glob('*/imagens/*') if p.suffix.lower() in ('.jpg', '.jpeg', '.png')
    ]
    for p in alvos:
        converter(p)
