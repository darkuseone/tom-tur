"""Проверка детальности миров выпуска (правило владельца 27.10.2026: «больше мелких деталей и проработанные задники»).
  python3 tools/detail.py <эп>            # по каждой сцене w_*.js: объём кода, планы lay(), люди, атмосфера, передний план
Эталон — 001 Нью-Йорк (≈ 6 планов на сцену) и 002 Москва (7–14 планов, 30–38 КБ). Обязательно: ≥ 5 планов lay(), есть атмосфера
(motes/haze/rays/glow), есть передний план lay(<1). Фигуры людей — справочно (в 002 люди нарисованы своими функциями), цель ≥ 8 живых
фигур в кадре; объём кода — справочно (у 011–018 было 5–8 КБ). Ниже минимума — «МАЛО»: дорисовать ДО рендера. Это не замена глазу: контакт-лист всё равно сравнить с кадрами 002."""
import re, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
if len(sys.argv) < 2: sys.exit(__doc__)
d = ROOT / 'episodes' / sys.argv[1]
MIN = dict(lay=5, kb=9.0)                                       # 9 КБ — нижняя граница 019 (эталон 002: 30–38 КБ); кнопка, переиспользующая планы хука, — исключение
bad = 0
for f in sorted(d.glob('w_*.js')):
    if f.name == 'w_cover.js': continue
    s = '\n'.join(l for l in f.read_text().split('\n') if not l.strip().startswith('//') and not l.strip().startswith('/*'))
    kb = len(s.encode()) / 1024
    lay = len(re.findall(r'\blay\(', s))
    FIG = r'\b(human|worker|soldier|crowd|rider|person|smilodon|mammoth|horse|dog)\('
    figs = 0
    for line in s.split('\n'):
        n = len(re.findall(FIG, line)); loop = re.search(r'for \(let \w+ = 0; \w+ < (\d+);', line)
        figs += n * (int(loop.group(1)) if loop and n else 1)
    atm = bool(re.search(r'\b(motes|haze|rays|glow)\(', s))
    fg = bool(re.search(r'lay\(0\.\d', s))
    miss = [n for n, ok in [(f'планов {lay} < {MIN["lay"]}', lay >= MIN['lay']), ('нет атмосферы', atm), ('нет переднего плана lay(<1)', fg), (f'{kb:.1f} КБ < {MIN["kb"]} КБ (бедно)', kb >= MIN['kb'] or f.name == 'w_button.js')] if not ok]
    if not re.search(r'\b(lightPool|shaft|castShadow|moodDark)\(', s) and f.name != 'w_button.js': miss.append('нет света (lightPool/shaft/castShadow/moodDark)')
    if not re.search(r'\b(prop:|afterCat|handF?:)', s): miss.append('Том ни с чем не взаимодействует (prop/hand/afterCat)')
    warn = '  (фигур мало по коду — проверь глазом в vs_etalon: ≥ 8 живых в кадре)' if figs < 6 and f.name != 'w_button.js' else ''
    bad += bool(miss)
    print(f'{f.name:22s} {kb:5.1f} КБ  lay {lay:2d}  фигур ≈{figs:2d}  ' + ('ok' if not miss else 'МАЛО: ' + '; '.join(miss)) + warn)
print('итог:', 'все сцены выше минимума — теперь python3 tools/vs_etalon.py <эп> и сравнить глазом с эталоном' if not bad else f'{bad} сцен ниже минимума — дорисовать')
