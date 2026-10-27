"""Проверка детальности миров выпуска (правило владельца 27.10.2026: «больше мелких деталей и проработанные задники»).
  python3 tools/detail.py <эп>            # по каждой сцене w_*.js: объём кода, планы lay(), люди, атмосфера, передний план
Минимумы на сцену (эталон 002 — 30–38 КБ кода на сцену, 7–14 планов): ≥ 20 КБ кода самой сцены, ≥ 5 планов lay(), есть атмосфера
(motes/haze/rays/glow), есть передний план lay(<1). Фигуры людей — справочно (в 002 люди нарисованы своими функциями), цель ≥ 8 живых
фигур в кадре. Ниже минимума — «МАЛО»: дорисовать ДО рендера. Это не замена глазу: контакт-лист всё равно сравнить с кадрами 002."""
import re, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
if len(sys.argv) < 2: sys.exit(__doc__)
d = ROOT / 'episodes' / sys.argv[1]
MIN = dict(kb=20, lay=5)
bad = 0
for f in sorted(d.glob('w_*.js')):
    if f.name == 'w_cover.js': continue
    s = '\n'.join(l for l in f.read_text().split('\n') if not l.strip().startswith('//') and not l.strip().startswith('/*'))
    kb = len(s.encode()) / 1024
    lay = len(re.findall(r'\blay\(', s))
    figs = len(re.findall(r'\b(human|crowd|rider|smilodon|mammoth|horse)\(', s)) + 3 * len(re.findall(r'for \(let i = 0; i < \d+; i\+\+\)[^\n]*human\(', s))
    atm = bool(re.search(r'\b(motes|haze|rays|glow)\(', s))
    fg = bool(re.search(r'lay\(0\.\d', s))
    miss = [n for n, ok in [(f'код {kb:.0f} КБ < {MIN["kb"]}', kb >= MIN['kb']), (f'планов {lay} < {MIN["lay"]}', lay >= MIN['lay']), ('нет атмосферы', atm), ('нет переднего плана lay(<1)', fg)] if not ok]
    bad += bool(miss)
    print(f'{f.name:22s} {kb:5.1f} КБ  lay {lay:2d}  фигур ≈{figs:2d}  ' + ('ok' if not miss else 'МАЛО: ' + '; '.join(miss)))
print('итог:', 'все сцены выше минимума — теперь сравнить контакт-лист с 002' if not bad else f'{bad} сцен ниже минимума — дорисовать')
