"""Проверка саунд-дизайна выпуска до рендера (владелец, 03.11.2026: «не забывай про классный саунд-дизайн»).
  python3 tools/soundcheck.py <эп>
Требования: у каждой сцены — атмосфера-луп (beds); на каждый переход — звук в окне S0 −0,5…+0,2 с; у каждой сцены ≥ 3 SFX;
каждое событие EV.* (кроме служебных) озвучено звуком в ±0,35 с; все файлы есть в assets/sfx; музыка задана. Печатает «ok» или список дыр."""
import importlib.util, json, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
if len(sys.argv) < 2: sys.exit(__doc__)
ep = sys.argv[1]; d = ROOT / 'episodes' / ep
T0 = json.load(open(d / 'times.json')); EVJ = json.load(open(d / 'ev.json'))
class TT: pass
T = TT(); T.EV = EVJ['EV']; T.WT = EVJ.get('WT', {}); T.DUR = T0['DUR']; T.S0 = {n: a for n, a, b in T0['SCN']}; T.S1 = {n: min(b, T0['DUR']) for n, a, b in T0['SCN']}
VO = T0.get('start', {}); T.LS = lambda k: VO.get(k, 0.0)
spec = importlib.util.spec_from_file_location('snd', d / 'sound.py'); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); S = m.sound(T)
sfx, beds = S['sfx'], S['beds']; holes = []
for f in {x[0] for x in sfx} | {b[0] for b in beds} | ({S['music']} if S.get('music') else set()):
    if not (ROOT / 'assets/sfx' / f'{f}.mp3').exists(): holes.append(f'нет файла assets/sfx/{f}.mp3')
if not S.get('music'): holes.append('не задана музыка')
for n, a, b in T0['SCN']:
    b = min(b, T0['DUR'])
    if n != 'tunnel' and not any(x0 <= a + 0.3 and x1 >= b - 0.3 for _, x0, x1 in beds): holes.append(f'сцена {n}: нет атмосферы на всю длину')
    if a > 0.1 and not any(a - 0.5 <= t <= a + 0.2 for _, t, _ in sfx): holes.append(f'переход в {n} ({a:.2f} с): нет звука в окне −0,5…+0,2 с')
    k = sum(1 for _, t, _ in sfx if a - 0.4 <= t < b)
    if n != 'tunnel' and k < 3: holes.append(f'сцена {n}: всего {k} SFX (нужно ≥ 3)')
skip = {'h2', 'hookEnd', 'portal'}
for k, t in T.EV.items():
    if k in skip or not isinstance(t, (int, float)): continue
    if not any(abs(t - s) <= 0.35 for _, s, _ in sfx): holes.append(f'событие {k} ({t:.2f} с) без звука')
print(f'SFX {len(sfx)}, атмосфер {len(beds)}, музыка {S.get("music")}')
print('ok: саунд-дизайн полный' if not holes else 'ДЫРЫ:\n  ' + '\n  '.join(holes))
sys.exit(1 if holes else 0)
