"""Заготовка сцены (каркас 002+): episodes/<эп>/w_<сцена>.js по шаблону + запись в episode.json (worlds и scenes).
  python3 tools/new_scene.py <эп> <сцена> <ключ-реплики> <костюм> ["ГОД" "ПОДПИСЬ"]
Шаблон: EV по словам реплики (wtk), KEYW, 3 плана (lay 30/6/1), DIR (act/pose/cam/hud), TRANS_IN — заглушка.
Если сцены нет в episode.json → добавляет её перед today (и реплику), файл мира — перед w_cover.js. YR — подсказкой."""
import json, re, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
if len(sys.argv) < 5: sys.exit(__doc__)
ep, name, key, outfit = sys.argv[1:5]; yr = sys.argv[5:7]
d = ROOT / 'episodes' / ep; f = d / f'w_{name}.js'
if f.exists(): sys.exit(f'{f.relative_to(ROOT)} уже есть')
L = json.load(open(d / 'lines.json')); line = re.sub(r'\[[^\]]*\]', '', L.get(key, '')).replace('́', '').strip()
words = [w for w in re.findall(r'[\w«»!?.,:;—-]+', line) if len(re.sub(r'\W', '', w)) > 3][:3] or ['TODO']
ev = '\n'.join(f"  EV.{name}_{i} = wtk('{key}', '{re.sub(r'[«»]', '', w)}');" for i, w in enumerate(words))
f.write_text(f"""/* {ep[:3]} — сцена `{name}`: TODO эпоха. Что в кадре (3–4 плана, люди через human(), детали эпохи).
   Реплика {key}: «{line}»
   События: TODO на каких словах что происходит. Переход В сцену — TODO (не повторять прошлые, docs/style.md). */
(() => {{
{ev}
  KEYW.push('{words[-1]}');                                        // ровно как в субтитре, с пунктуацией
  SHAKES.push([EV.{name}_0, 0.25, 6]);

  function back(t) {{ vgrad(-900, 1100, ['#7aa6d0', '#b8d0e4', '#f2e8d8'], 1); }}   // небо, дальние горы
  function mid(t) {{ }}                                                             // главный объект эпохи, здания, люди
  function front(t) {{ const g = shape([[-400, 1440], [1480, 1440], [1480, 2400], [-400, 2400]], {{ wash: '#a8a294', washA: 1, w: 1, col: '#000', a: 0.2 }}); }}

  WORLD.{name} = (t, u, cat) => {{
    lay(30, () => back(t));
    lay(6, () => mid(t));
    lay(1, () => {{ front(t); cat(); }});
  }};
  DIR.{name} = {{
    outfit: '{outfit}', light: {{ side: 1, rim: '#fff0d0' }}, grade: ['#c0a070', 0.1],
    act: () => [[S0.{name}, 'talk'], [EV.{name}_0, 'shock'], [EV.{name}_{len(words) - 1}, 'grin']],
    pose: (t, u, b) => Object.assign(b, {{ x: 400, y: 1470, s: 1.05, look: [0.4, -0.2] }}),
    cam: () => [[S0.{name}, 560, 900, 0.12], [EV.{name}_0, 560, 960, 0.05], [S1.{name}, 560, 980, 0.1]],
    hud: t => {{ }}
  }};

  // ---------------------------------------------------------------- переход В {name}: TODO
  TRANS_IN.{name} = {{ a: 0.3, b: 0.35, fx(k, t, A, B) {{ if (k < 0.5) drawBuf(A); else drawBuf(B); }} }};
}})();
""")
E = json.load(open(d / 'episode.json'))
if f.name not in E['worlds']: E['worlds'].insert(E['worlds'].index('w_cover.js') if 'w_cover.js' in E['worlds'] else len(E['worlds']), f.name)
if name not in [s[0] for s in E['scenes']]:
    at = next((i for i, s in enumerate(E['scenes']) if s[0] == 'today'), len(E['scenes'])); E['scenes'].insert(at, [name, [key]])
json.dump(E, open(d / 'episode.json', 'w'), ensure_ascii=False, indent=1)
print('создан', f.relative_to(ROOT), '| EV:', ', '.join(words))
print(f"в scenes.js: YR.{name} = ['{yr[0] if yr else 'ГОД'}', '{yr[1] if len(yr) > 1 else 'ПОДПИСЬ'}'], YEARS.{name} = <число>")
