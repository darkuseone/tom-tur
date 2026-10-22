"""Вставка нового костюма Тома в engine/tom.js без чтения рига (экономия токенов).
  python3 tools/add_costume.py <файл.js>
Файл — фрагменты с метками-разделами (каждая запись заканчивается запятой или нет — не важно):
  //@OUTFIT
    myname: { top: '#..', topD: '#..', topL: '#..', pants: '#..', detail: 'mydetail', hat: 'myhat', boots: 'leather', long: 1 },
  //@COST6
    mydetail(OF, b, t, bp, L) { ... },          // тело: координаты туловища y −256 (ворот) … −118 (пояс), подол skirt6(..., −118, −30, ...)
  //@HAT6
    myhat(t, o, fx, L) { ... },                 // шапка в системе головы: макушка y≈−100, глаза (±42+fx, −10), r головы ≈100
Скрипт ставит каждый раздел перед закрывающей `};` своего реестра, добавляет detail в список «без манишки», проверяет синтаксис."""
import re, subprocess, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent; TOM = ROOT / 'engine/tom.js'
if len(sys.argv) < 2: sys.exit(__doc__)
src = Path(sys.argv[1]).read_text(); parts = dict((m.group(1), m.group(2).strip('\n')) for m in re.finditer(r'//@(OUTFIT|COST6|HAT6)\n(.*?)(?=//@|\Z)', src, re.S))
L = TOM.read_text().split('\n')
def close_of(reg):
    i = next(k for k, l in enumerate(L) if l.startswith(f'const {reg} = {{')); j = i + 1
    while L[j] != '};': j += 1
    return j
for reg in ['OUTFIT', 'COST6', 'HAT6']:
    if reg not in parts: continue
    j = close_of(reg); k = j - 1
    while not L[k].strip(): k -= 1
    if not L[k].rstrip().endswith((',', '{')): L[k] = L[k].rstrip() + ','
    L[j:j] = [f'  // ---- добавлено tools/add_costume.py', parts[reg].rstrip().rstrip(',')]
s = '\n'.join(L)
for det in re.findall(r'^\s*(\w+)\(OF, b, t, bp, L', parts.get('COST6', ''), re.M):   # свой костюм — без белой «манишки» шерсти
    i = s.index('].includes(D)) { const bib'); st = s.rindex("&& !['", 0, i) + 5
    if f"'{det}'" not in s[st:i]: s = s[:st] + f"'{det}', " + s[st:]
TOM.write_text(s)
r = subprocess.run(['node', '-e', "new Function(require('fs').readFileSync(process.argv[1],'utf8'))", str(TOM)], capture_output=True, text=True)
print('ok: tom.js' if r.returncode == 0 else 'ОШИБКА синтаксиса: ' + r.stderr[-400:], '| разделы:', ', '.join(parts))
