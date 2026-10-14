---
name: episode
description: Новый выпуск ТОМ-ТУР от города до готового ролика (факты → сценарий → озвучка → миры → рендер → сдача).
---
# /episode <город> — выпуск ТОМ-ТУР

Правила — `CLAUDE.md`, формула — `docs/episode-formula.md`, техника — `docs/pipeline.md`. Сначала `STATUS.md`.

1. **Факты:** поиск 9–11 эпох города (геология → сегодня) + хук-факт для первого кадра. Каждый факт с источником → `docs/sources/<NNN-город>.md`. Сомнительное не берём.
2. **Сценарий** `episodes/<NNN-город>/script.md`: хук, реплики (≤ 14 слов, панчлайн в конце, шутка каждые 3–4 факта), эпохи, костюмы Тома под эпоху, переход на каждую стыковку (не повторять), эмоции по ключевым словам, SFX. Отправить владельцу (SendUserFile) + 3 строки. Ждать «ок», если не сказано «делай сам».
3. **Реплики** `lines.json`: теги эмоций, без шёпота, U+0301 во всех словах из 2+ слогов, «ё». Вычитать. `python3 tools/tts.py lines <эп>` → `python3 tools/prep_voice.py <эп>`.
4. **Таймлайн:** `episode.json` → `python3 tools/build_data.py <эп>`.
5. **Миры и режиссура:** `scenes.js` (YR, SUBTITLE, EV, SHAKES, YEARS, KEYW), `worlds_*.js`, `details.js`, `transitions.js`, `direct.js` (OUTF, actKeys, LIGHT, camKeysFor), новые костюмы — в `engine/tom.js`.
6. **Контроль:** `tools/render.sh <эп> snap <середины эпох>` → смотреть `contact-sheet.jpg`, проблемное — в полном размере; `node tools/dbg.cjs build/<эп>/film`.
7. **Звук:** `sound.py`; новые SFX → `tools/tts.py sfx` → `tools/sfxcheck.py` → `assets/sfx/`.
8. **Рендер** фоном: `tools/render.sh <эп>`.
9. **Финал:** кадры из `final.mp4`, громкость (mean ≈ −20, пик ≤ −1 дБ), длина 50–60 с.
10. **Сдача:** SendUserFile `build/<эп>/chat.mp4` + 2–3 строки (кредиты, что нового). Коммит + пуш. Обновить `docs/cities.md`, `docs/passport.md` (Сделано), `STATUS.md`.
