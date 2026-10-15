# Техника ТОМ-ТУР

## Структура

```
engine/            движок (общий для всех выпусков)
  engine.js        canvas, бумага, зерно, pencil/hatch/wash, камера lay/haze, renderTo, грейдинг
  core.js          HUD: плашка, табличка года, шкала, субтитры, хук, endcard «ПОДПИШИСЬ»
  tom.js           риг Тома: эмоции TE, визимы VZ, костюмы OUTFIT, шапки, часы, хвост
  page.html        шаблон страницы HyperFrames (__DUR__, __WORLDS__)
  vendor/gsap.min.js
episodes/NNN-город/
  episode.json     сцены ↔ реплики, список файлов миров, хук
  lines.json       реплики с тегами и ударениями
  voice/*.mp3      исходники ElevenLabs (в git)
  lips/*.json      липсинк Rhubarb
  durs.json        длительности обработанных реплик
  data.js, times.json  таймлайн (генерируются build_data.py)
  scenes.js        годы/подписи эпох, SUBTITLE, события EV, тряски, ключевые слова
  worlds_a.js, worlds_b.js, details.js   миры эпох
  transitions.js   переходы между эпохами
  direct.js        режиссура: костюмы, эмоции по словам, позы, камера, кадр, HUD
  sound.py         SFX и атмосферы от таймлайна
  script.md        сценарий; final.mp4 — готовый ролик
assets/            шрифты, sfx, модельный лист и фото Тома
tools/             конвейер (ниже)
build/             промежуточное (в git не идёт)
```

Порядок скриптов на странице: `gsap → data → engine → core → scenes → tom → миры (episode.json) → transitions → direct`.

## Конвейер

```bash
tools/setup.sh                                  # один раз в сессии
python3 tools/tts.py lines 002-rim               # озвучка (готовые mp3 пропускает)
python3 tools/prep_voice.py 002-rim              # паузы, темп, липсинк, durs.json
python3 tools/build_data.py 002-rim              # таймлайн → data.js, times.json
tools/render.sh 002-rim snap 0.5,4,9,14          # контрольные кадры → build/002-rim/snaps
node tools/dbg.cjs build/002-rim/film            # JS-ошибки по всей длине
tools/render.sh 002-rim                          # рендер + микс → episodes/002-rim/final.mp4 + build/002-rim/chat.mp4
python3 tools/mix.py 002-rim                     # только пересвести звук
```

Рендер 60 с ≈ 10–20 мин (4 воркера). Запускать фоном (Bash `run_in_background`), не через `&` внутри команды — иначе процесс убивается.

## Новый выпуск

1. `cp -r episodes/001-new-york episodes/002-<город>`; удалить `voice/ lips/ durs.json data.js times.json final.mp4`.
2. Переписать `lines.json`, `episode.json` (сцены), `scenes.js` (YR, SUBTITLE, EV, SHAKES, YEARS, KEYW), миры, `transitions.js`, `direct.js` (OUTF, actKeys, LIGHT, camKeysFor), `sound.py`.
3. Удачные детали из `details.js` / миров 001 (небоскрёбы, облака, вода, деревья, корабль, толпа) — переиспользовать; общие со временем вынести в `engine/props.js`.

## Ловушки

- Миры 001 используют старые имена хелперов (`tubePts`, `fstrokes`, `softShade`, `rim`) — в `tom.js` есть алиасы, не удалять.
- После правки `lines.json`/голоса **обязательно** `prep_voice.py` → `build_data.py`: все события мира считаются от `VO/VD`.
- `CAPS` (субтитры) строятся из текста реплики без тегов и ударений; ключевые слова для янтаря — `KEYW` в `scenes.js` (без ударений).
- Рисовать **только** через `ctx` движка, внутри `lay()`/`push()`; `renderTo(BUF[i], fn)` — для переходов (рендер сцены в буфер).
- Градиент на плакате/вывеске клипать по форме — иначе «протекает» на весь кадр.
- SendUserFile — максимум 30 МиБ: в чат идёт `build/<эп>/chat.mp4` (2-pass, < 29 МиБ).
- Отладка: `node tools/dbg.cjs <film> t1 t2…` показывает стек ошибки; `npx hyperframes snapshot … --at` — PNG кадров + `contact-sheet.jpg`.

## Каркас 002+ (параллельная работа, субагенты)

С выпуска 002 каждая сцена — свой файл `w_<сцена>.js` в IIFE, регистрирует себя в реестрах из `scenes.js`:
`WORLD[name]` (рисование), `DIR[name]` (outfit, light, grade, act, pose, cam, hud, afterCat), `TRANS_IN[name]` (переход В сцену), плюс `EV.*`, `SHAKES.push`, `KEYW.push`.
`direct.js` — общий каркас (не меняется от выпуска к выпуску), `transitions.js` — общие помощники переходов (drawBuf, inCircle, inPath, ringFX, smear, whiteOut, scr), `props.js` — туннель и мелкие общие детали.
`WT(key, 'слово')` — время фрагмента субтитра со словом (синхронизация действий со словами). `episode.json → "timeline"` переопределяет паузы (scene_gap, tail).

Инструменты:
- `python3 tools/mkpage.py <эп> [папка]` — своя папка сборки для каждого агента;
- `node tools/shot.cjs <film> <out> t1 t2 …` — быстрые PNG + `sheet.jpg` + мс/кадр (без HyperFrames, секунды);
- `node tools/evdump.cjs <эп>` → `episodes/<эп>/ev.json` — события картинки для `sound.py` (`T.EV`, `T.WT`), звук встаёт точно на событие.

Субагенты — **по умолчанию не использовать** (решение владельца 15.10.2026: дорого по токенам; выпуск делает один агент по очереди). Как было в 002: 5 агентов по 2 сцены + 1 агент костюмов (`engine/tom.js`), общий бриф с контрактом, таймлайном и планкой качества. Правило: агенты не трогают чужие файлы и не делают git checkout. Время: ~10 мин на агента, лимит API может оборвать — продолжать через SendMessage.
Микс: финальный лимитер `level=0` (иначе alimiter поднимает уровень и пик вылезает за −1 дБ).

## Экономичный цикл (с 15.10.2026)

`python3 tools/new_episode.py <эп> "<Город>"` → факты/сценарий → `tts.py` / `prep_voice.py` / `build_data.py` → миры по одному файлу (API — `docs/api.md`, готовые детали — `docs/library.md`) → `tools/check.sh <эп>` → `w_cover.js` + `node tools/cover.cjs <эп>` → `node tools/evdump.cjs <эп>` + `sound.py` → `tools/render.sh <эп>` (фоном; обложка = первые 2 кадра, final 2-pass 5 Мбит/с) → `publish.md` → `python3 tools/libindex.py`.
