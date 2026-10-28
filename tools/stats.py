"""Статистика выпусков из таблицы владельца (xlsx «Tom_Tur_Stats_YouTube_TikTok», листы YouTube и TikTok) → сравнимые метрики.
  python3 tools/stats.py <файл.xlsx> [ДД.ММ.ГГГГ — дата снятия, по умолчанию сегодня]
Копирует xlsx в docs/stats/, дописывает строки в docs/stats/log.csv (история: одна строка = ролик × площадка × дата снятия)
и печатает таблицу долей на 1000 просмотров + просмотры в день. Абсолютные просмотры роликов разного возраста не сравнивать —
сравнивать удержание, досмотр, доли лайков/комментов/репостов/сохранений/подписок."""
import csv, datetime as dt, re, shutil, sys
from pathlib import Path
import openpyxl
ROOT = Path(__file__).resolve().parent.parent; OUT = ROOT / 'docs/stats'
if len(sys.argv) < 2: sys.exit(__doc__)
src = Path(sys.argv[1]); taken = dt.datetime.strptime(sys.argv[2], '%d.%m.%Y').date() if len(sys.argv) > 2 else dt.date.today()
OUT.mkdir(parents=True, exist_ok=True); shutil.copy(src, OUT / f'{taken:%Y-%m-%d}-tom-tur-stats.xlsx')
MON = {'янв': 1, 'фев': 2, 'мар': 3, 'апр': 4, 'мая': 5, 'май': 5, 'июн': 6, 'июл': 7, 'авг': 8, 'сен': 9, 'окт': 10, 'ноя': 11, 'дек': 12}

def num(v):                                                          # «123,9K», «3,1 тыс. (3 144)», «25,2 с.», «42 % (…)» → число
    if v is None: return None
    s = str(v); m = re.search(r'\(([\d\s ]+)\)', s)
    if m: return float(re.sub(r'\D', '', m.group(1)))
    m = re.search(r'(-?[\d\s ]+(?:[.,]\d+)?)\s*(K|тыс)?', s.replace(' ', ' '))
    if not m or not re.search(r'\d', m.group(1)): return None
    x = float(m.group(1).replace(' ', '').replace(' ', '').replace(',', '.')); return x * 1000 if m.group(2) else x

def secs(v):                                                         # «0:35» или «25,2 с.»
    if v is None: return None
    s = str(v); m = re.match(r'(\d+):(\d+)', s)
    return int(m.group(1)) * 60 + int(m.group(2)) if m else num(s)

def table(ws):
    rows = [r for r in ws.iter_rows(values_only=True)]; i = next(k for k, r in enumerate(rows) if r and r[0] == 'Название')
    head = [str(c) if c else '' for c in rows[i]]; return [dict(zip(head, r)) for r in rows[i + 1:] if r and r[0]]

wb = openpyxl.load_workbook(src, data_only=True); recs = []
for r in table(wb['TikTok']):
    d = r.get('Дата публикации'); pub = None
    if d: m = re.match(r'(\d+)\s+(\w+)\s+(\d{4})', str(d)); pub = dt.date(int(m.group(3)), MON[m.group(2)[:3]], int(m.group(1))) if m else None
    v = num(r.get('Просмотры'))
    recs.append(dict(platform='TikTok', title=r['Название'], published=pub, taken=taken, days=(taken - pub).days if pub else None, views=v,
                     likes=num(r.get('Лайки')), comments=num(r.get('Комменты')), shares=num(r.get('Репосты')), saves=num(r.get('Сохранения')),
                     subs=num(r.get('Новые подписчики')), avg_s=secs(r.get('Среднее время просмотра')), retention=num(r.get('Удержание (среднее)')),
                     completion=num(r.get('Досмотрели полностью')), notes=r.get('Заметки') or ''))
for r in table(wb['YouTube']):
    recs.append(dict(platform='YouTube', title=r['Название'], published=None, taken=taken, days=None, views=num(r.get('Просмотры')), likes=None, comments=None,
                     shares=None, saves=None, subs=num(r.get('Подписчики с ролика')), avg_s=secs(r.get('Средняя длительность')), retention=num(r.get('Удержание (%)')),
                     completion=None, swiped_stay=num(r.get('Продолжили смотреть')), notes=r.get('Заметки') or ''))

F = ['platform', 'title', 'published', 'taken', 'days', 'views', 'likes', 'comments', 'shares', 'saves', 'subs', 'avg_s', 'retention', 'completion', 'swiped_stay', 'notes']
log = OUT / 'log.csv'; new = not log.exists()
with open(log, 'a', newline='') as f:
    w = csv.DictWriter(f, F, extrasaction='ignore')
    if new: w.writeheader()
    for r in recs: w.writerow(r)
per = lambda r, k: f"{1000 * r[k] / r['views']:.1f}" if r.get(k) is not None and r.get('views') else '—'
fmt = lambda x, p='': '—' if x is None else (f'{x:.0f}{p}' if abs(x) >= 100 else f'{x:g}{p}')
print('| площадка | ролик | дней | просм. | в день | ср. % | досмотр | ср. время | лайки‰ | комм.‰ | репосты‰ | сохр.‰ | подписки‰ |')
print('|---|---|---|---|---|---|---|---|---|---|---|---|---|')
for r in recs:
    pd = f"{r['views'] / max(1, r['days']):.0f}" if r.get('days') is not None and r.get('views') else '—'
    print(f"| {r['platform']} | {r['title']} | {fmt(r['days'])} | {fmt(r['views'])} | {pd} | {fmt(r['retention'], ' %')} | {fmt(r['completion'], ' %')} | {fmt(r['avg_s'], ' с')} | {per(r, 'likes')} | {per(r, 'comments')} | {per(r, 'shares')} | {per(r, 'saves')} | {per(r, 'subs')} |")
print(f'\n→ {log.relative_to(ROOT)} (+{len(recs)} строк), копия таблицы в docs/stats/')
