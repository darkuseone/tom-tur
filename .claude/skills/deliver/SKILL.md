---
name: deliver
description: Сдача выпуска ТОМ-ТУР — обложка, рендер фоном, финальная проверка одной командой, отправка в чат, тексты выкладки, документация, коммит и PR.
---
# /deliver <эп>

1. **Обложка**: `w_cover.js` → `COVER = { scene, t, cam, pose, title: [[строка, цвет], …], size, ty, badge, sub }` (обычно кадр хука, текст = хук). `python3 tools/mkpage.py <эп> && node tools/cover.cjs <эп>` → Read `build/<эп>/cover_small.jpg`: плашка города сразу под заголовком, всё в полосе y 280–1600 (безопасные зоны, CLAUDE.md §4: обложка — первый кадр ролика, верх перекрывают чёлка и кнопки; `ty` ≥ 400 при size 170).
2. **Ошибки по всей длине**: `node tools/dbg.cjs build/<эп>/film $(python3 -c "print(' '.join(f'{x/4:.2f}' for x in range(0,244)))") | tail -1`.
3. **Рендер** фоном (Bash `run_in_background: true`, ≈15–20 мин на 60 с): `tools/render.sh <эп> > build/<эп>/render.log 2>&1`. Пока идёт — пункты 5–6. Не опрашивать: придёт уведомление.
4. **Проверка**: `tools/finalcheck.sh <эп>` → длина / громкость / размер chat.mp4 + Read `build/<эп>/fin/sheet.jpg` (обложка + середины сцен).
5. **Тексты** `episodes/<эп>/publish.md`: сначала TikTok, потом YouTube Shorts; в каждом: название (1 предложение, город в начале, эмодзи; YouTube ≤ 70 знаков) / пустая строка / описание ≤ 3 предложений с поисковыми словами («история <города>», объекты, «за минуту») / пустая строка / 3–5 хэштегов.
6. **Документы** (одним python-скриптом replace, без чтения целиком): `docs/cities.md` (строка выпуска + «Следующему выпуску»), `docs/passport.md` (Сделано), `docs/costumes.md`, `docs/style.md` (таблица переходов выпуска), `docs/episode-formula.md` (что сделано впервые), `docs/decisions.md` (решения владельца), `assets/sfx/CATALOG.md`, `STATUS.md` (готово + слабые места), `script.md` (финал). Потом `python3 tools/libindex.py`.
7. **Отправка**: SendUserFile `build/<эп>/chat.mp4` + `episodes/<эп>/cover.png` (status proactive). Сообщение: 2–3 строки сути, честно — слабые места и длина, расход кредитов; в конце — тексты выкладки колонкой без подписей.
8. **Git**: коммит + `git push -u origin <ветка>` + черновой PR (если нет открытого) + `subscribe_pr_activity`. `final.mp4` ≈ 30–40 МБ — коммитить можно.
