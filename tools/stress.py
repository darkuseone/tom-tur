"""Проверка ударений в lines.json ДО платной озвучки (владелец 22.10.2026: «на слух некоторые слова звучат неправильно»).
  python3 tools/stress.py <эп> [--fix]
Сверяет ручные ударения (U+0301) с моделью RUAccent (словарь + омографы: за́мок/замо́к, сне́сли/снесли́ по контексту)
и со словарём проекта docs/stress.md (слова, которые ElevenLabs уже читал неверно, и как их писать).
Печатает: нет ударения / два ударения / ударение не на гласной / расхождение с моделью (решать глазами) / замены из словаря.
--fix: ставит ударение модели только туда, где его нет, и применяет словарь проекта; ручные ударения не трогает.
Установка один раз: pip install ruaccent (без torch, модели ~200 МБ скачаются в кэш при первом запуске)."""
import json, re, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
if len(sys.argv) < 2: sys.exit(__doc__)
ep, FIX = sys.argv[1], '--fix' in sys.argv
F = ROOT / 'episodes' / ep / 'lines.json'; L = json.load(open(F))
ACC, V = '́', 'аеёиоуыэюяАЕЁИОУЫЭЮЯ'
WORD = re.compile(r'[А-Яа-яЁё́-]+')

def dict_rules():                                                    # docs/stress.md: | слово (без ударений) | как писать в lines.json | …
    R = {}; p = ROOT / 'docs/stress.md'
    if p.exists():
        for row in p.read_text().split('\n'):
            c = [x.strip() for x in row.strip('|').split('|')]
            if len(c) >= 2 and c[0] and not c[0].startswith(('слово', '---')) and WORD.fullmatch(c[0].replace(ACC, '')): R[c[0].lower().replace(ACC, '')] = c[1]
    return R
RULES = dict_rules()

def pos(w):                                                          # индекс ударной гласной (по гласным) или None; ё — ударная
    vi, out, n = -1, [], 0
    for ch in w:
        if ch in V: vi += 1
        if ch == ACC: out.append(vi)
    if not out and ('ё' in w or 'Ё' in w): out = [sum(1 for ch in w[:w.lower().index('ё')] if ch in V)]
    return out

try:
    from ruaccent import RUAccent
    M = RUAccent(); M.load(omograph_model_size='turbo3.1', use_dictionary=True, tiny_mode=False)
    import numpy as np                                               # обход бага ruaccent: модель ждёт token_type_ids, токенизатор их не даёт
    _s = M.accent_model.session; _run = _s.run; _need = {i.name for i in _s.get_inputs()}
    _s.run = lambda o, f: _run(o, dict(f, token_type_ids=np.zeros_like(f['input_ids'])) if 'token_type_ids' in _need and 'token_type_ids' not in f else f)
except Exception as e:
    M = None; print('ВНИМАНИЕ: модель RUAccent недоступна (pip install ruaccent) —', str(e)[:80])

issues = 0; out = dict(L)
for k, raw in L.items():
    tags = re.findall(r'\[[^\]]*\]', raw); plain = re.sub(r'\[[^\]]*\]', '\u0000', raw)
    text = plain.replace(ACC, '').replace('\u0000', ' ')
    model = {}
    if M:
        mt = M.process_all(text); ws_m = WORD.findall(mt.replace('+', '')); ws_p = [w for w in re.findall(r'[А-Яа-яЁё+-]+', mt)]
        for w in ws_p:
            base = w.replace('+', ''); i = w.find('+')
            if i >= 0: model.setdefault(base.lower(), []).append(sum(1 for ch in w[:i] if ch in V))
    new = plain
    for w in WORD.findall(plain):
        base = w.replace(ACC, ''); nv = sum(1 for ch in base if ch in V); p = pos(w); lw = base.lower()
        if lw in RULES and w != RULES[lw]:
            print(f'{k}: «{w}» → словарь проекта: «{RULES[lw]}»'); issues += 1
            if FIX: new = re.sub(rf'(?<![А-Яа-яЁё́]){re.escape(w)}(?![А-Яа-яЁё́])', RULES[lw], new, count=1)
            continue
        if nv < 2 or '-' in base: continue
        if len(p) > 1: print(f'{k}: «{w}» — два ударения'); issues += 1; continue
        if any(i < 0 for i in p) or re.search(f'[^{V}]{ACC}', w): print(f'{k}: «{w}» — ударение не после гласной'); issues += 1; continue
        mp = model.get(lw, [None])[0] if model.get(lw) else None
        if not p:
            fixw = None
            if mp is not None: vi = -1; fixw = ''.join(ch + (ACC if ch in V and (vi := vi + (ch in V)) == mp else '') if ch in V else ch for ch in base)
            print(f'{k}: «{base}» — нет ударения' + (f' (модель: «{fixw}»)' if fixw else ' (модель не знает — поставить вручную)')); issues += 1
            if FIX and fixw: new = re.sub(rf'(?<![А-Яа-яЁё́]){re.escape(base)}(?![А-Яа-яЁё́])', fixw, new, count=1)
        elif mp is not None and p[0] != mp:
            vi = -1; mw = ''.join(ch + (ACC if (vi := vi + 1) == mp else '') if ch in V else ch for ch in base)
            print(f'{k}: «{w}» ≠ модель «{mw}» — проверить (имена собственные модель часто не знает)'); issues += 1
    if FIX:
        for tg in tags: new = new.replace('\u0000', tg, 1)
        out[k] = new
if FIX: json.dump(out, open(F, 'w'), ensure_ascii=False, indent=1); print('записано:', F.relative_to(ROOT))
print('ok: ударения в порядке' if not issues else f'итого замечаний: {issues}')
