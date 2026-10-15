"""Собирает страницу выпуска для HyperFrames: build/<эп>/film/ = engine/* + episodes/<эп>/*.js + шрифты, index.html из engine/page.html.
  python3 tools/mkpage.py <эпизод> [папка]     # папка по умолчанию build/<эп>/film (своя папка — для параллельной работы)"""
import json, shutil, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main(ep, out=None):
    d = ROOT / 'episodes' / ep; f = Path(out).resolve() if out else ROOT / 'build' / ep / 'film'
    if f.exists(): shutil.rmtree(f)
    f.mkdir(parents=True)
    E = json.load(open(d / 'episode.json')); DUR = json.load(open(d / 'times.json'))['DUR']
    for p in [*(ROOT / 'engine').glob('*.js'), ROOT / 'engine/vendor/gsap.min.js']: shutil.copy(p, f)
    for p in d.glob('*.js'): shutil.copy(p, f)
    for p in (ROOT / 'assets/fonts').glob('*.ttf'): shutil.copy(p, f)
    html = (ROOT / 'engine/page.html').read_text().replace('__DUR__', str(DUR))
    html = html.replace('__WORLDS__', ''.join(f'<script src="{w}"></script>' for w in E['worlds']))
    (f / 'index.html').write_text(html)
    print(f, 'DUR', DUR)


if __name__ == '__main__':
    if len(sys.argv) < 2: sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
