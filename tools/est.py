"""Оценка длины выпуска ДО платной озвучки (экономия кредитов ElevenLabs: не генерировать заново из-за длины).
  python3 tools/est.py <эп>
Дмитрий после prep_voice говорит ≈11 букв/с (замер 002: 10,9; 003: 11,2). Плюс туннель, паузы между сценами и хвост."""
import json, re, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
if len(sys.argv) < 2: sys.exit(__doc__)
ep = sys.argv[1]; d = ROOT / 'episodes' / ep
L = json.load(open(d / 'lines.json')); E = json.load(open(d / 'episode.json')); C = json.load(open(ROOT / 'tools/config.json'))['timeline']
T = {**C, **E.get('timeline', {})}; RATE = 11.0
tot = 0
for k, v in L.items():
    t = re.sub(r'\[[^\]]*\]', '', v).replace('́', '').strip(); n = len(re.sub(r'[^\w]', '', t)); s = n / RATE; tot += s
    words = len(t.split()); print(f'{k:5s} {s:4.1f} с  {words:2d} сл.  {t[:70]}' + ('  ← >14 слов' if words > 14 else ''))
gaps = T['tunnel'] + T['scene_gap'] * (len(E['scenes']) - 1) + T['tail']
print(f'речь ≈{tot:.1f} с + паузы {gaps:.1f} с = ≈{tot + gaps:.1f} с (цель 50–70, лучше 50–58)')
