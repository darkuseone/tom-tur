"""Заготовка нового выпуска на каркасе 002+ (экономит токены: не надо читать и копировать файлы руками).
  python3 tools/new_episode.py 003-rim "Рим"
Создаёт episodes/<эп>/: общий каркас (direct.js, props.js, transitions.js — копии из последнего выпуска на каркасе),
scenes.js / episode.json / lines.json / w_cover.js / script.md — шаблоны с TODO; docs/sources/<эп>.md."""
import json, shutil, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
if len(sys.argv) < 3: sys.exit(__doc__)
ep, city = sys.argv[1], sys.argv[2]; d = ROOT / 'episodes' / ep
if d.exists(): sys.exit(f'{d} уже есть')
src = max((p for p in (ROOT / 'episodes').iterdir() if (p / 'props.js').exists()), key=lambda p: p.name)
d.mkdir(parents=True); (d / 'voice').mkdir()
for f in ['direct.js', 'props.js', 'transitions.js']: shutil.copy(src / f, d / f)
s = (src / 'scenes.js').read_text()
old_city = json.load(open(src / 'episode.json'))['city']
head = s.split('const SUBTITLE')[0].replace(src.name[:3], ep[:3]).replace(old_city, city)
(d / 'scenes.js').write_text(head + f"""const SUBTITLE = '{city} сквозь время';
const SAT = 1.1;                                          // насыщенность итогового кадра (владелец 18.10.2026: на ~10 % цветастее)
const HOOK_LINES = ['TODO СТРОКА 1', 'TODO СТРОКА 2?!'];   // текст-хук первых ~2.4 с
const YR = {{ hook: ['2026', 'TODO'], tunnel: ['', ''], /* сцена: ['год', 'ПОДПИСЬ'] */ today: ['2026', '{city.upper()}'], button: ['', ''] }};
const SC = SCN.map(([n, a, b]) => [n, a, b, YR[n][0], YR[n][1]]);
const S0 = {{}}, S1 = {{}}; SC.forEach(s => {{ S0[s[0]] = s[1]; S1[s[0]] = Math.min(s[2], DUR); }});
const LS = k => VO[k], LE = k => VO[k] + VD[k], LF = (k, f) => VO[k] + VD[k] * f;
const EV = {{ h2: LS('h2'), hookEnd: Math.min(2.4, LE('h1') - 0.15), portal: LS('x1') + 0.4 }};
const SHAKES = [];
const YEARS = {{ hook: 2026, today: 2026 }};
const KEYW = ['время!', 'город', 'отмотаем!'];
const DIR = {{}}, WORLD = {{}}, TRANS_IN = {{}};
""" + s[s.index('/* WT('):])
(d / 'episode.json').write_text(json.dumps({'num': ep[:3], 'city': city, 'title': 'TODO', 'hook': 'TODO', 'timeline': {'scene_gap': 0.05, 'tail': 0.6},
    'worlds': ['props.js', 'w_hook.js', 'w_today.js', 'w_cover.js'], 'scenes': [['hook', ['h1', 'h2']], ['tunnel', []], ['today', ['t1']], ['button', ['x1']]]}, ensure_ascii=False, indent=1))
(d / 'lines.json').write_text(json.dumps({'h1': '[shocked, loud] TODO', 'h2': '[smug, conspiratorial] TODO', 't1': '[warm, proud] TODO', 'x1': '[playful, to the camera] TODO'}, ensure_ascii=False, indent=1))
(d / 'w_cover.js').write_text("/* Обложка: Том в ключевой локации + крупный текст-хук. */\nconst COVER = { scene: 'hook', t: 2.0, cam: { x: 540, y: 900, z: 0.1 }, pose: { expr: 'shock', expr2: 'shock', ek: 1 },\n  title: [['TODO', '#f6ecd6'], ['TODO?!', '#e8a33c']], size: 190, ty: 360, badge: '" + city.upper() + "', sub: 'история за 60 секунд' };\n")
(d / 'script.md').write_text(f'# {ep} — {city}: сценарий\n\n| время | эпоха | костюм | реплика | переход | SFX |\n|---|---|---|---|---|---|\n')
(ROOT / 'docs/sources' / f'{ep}.md').write_text(f'# {ep} — {city}: факты и источники\n\n| реплика | факт | источник (2+) |\n|---|---|---|\n')
print('создан', d.relative_to(ROOT), '← каркас из', src.name)
