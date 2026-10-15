"""Индекс готовых деталей миров прошлых выпусков → docs/library.md (что переиспользовать как основу, не читая файлы целиком).
  python3 tools/libindex.py
Берёт функции/константы-функции с комментарием на той же строке из episodes/*/w_*.js, worlds_*.js, details.js, props.js."""
import re
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
rx = re.compile(r'^\s*(?:function\s+([A-Za-z_]\w*)\s*\(([^)]*)\)|const\s+([A-Za-z_]\w*)\s*=\s*\(([^)]*)\)\s*=>)[^\n]*?//\s*(.+)$')
out = ['# Библиотека деталей миров (автоиндекс, `python3 tools/libindex.py`)', '',
       'Функции внутри IIFE не видны снаружи: чтобы взять деталь, скопируй функцию в свой файл (grep -n имя, затем sed -n диапазон).', '']
for ep in sorted((ROOT / 'episodes').iterdir()):
    files = sorted([*ep.glob('w_*.js'), *ep.glob('worlds_*.js'), *ep.glob('details.js'), *ep.glob('props.js')])
    rows = []
    for f in files:
        for i, l in enumerate(f.read_text().splitlines(), 1):
            m = rx.match(l)
            if m: rows.append(f'| `{m.group(1) or m.group(3)}({(m.group(2) or m.group(4) or "").strip()[:40]})` | {f.name}:{i} | {m.group(5).strip()[:110]} |')
    if rows: out += [f'## {ep.name}', '', '| функция | где | что |', '|---|---|---|', *rows, '']
(ROOT / 'docs/library.md').write_text('\n'.join(out) + '\n'); print('docs/library.md:', sum(1 for l in out if l.startswith('| `')), 'деталей')
