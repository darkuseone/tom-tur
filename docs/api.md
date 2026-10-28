# API движка — шпаргалка (читать ВМЕСТО engine/*.js и tom.js)

> Экономия токенов: `engine/tom.js` ≈ 108 КБ, `engine.js` + `core.js` ≈ 25 КБ. Не читать целиком. Здесь всё, что нужно для мира; детали — `grep -n` по имени.

## Холст и время
- Кадр 1080×1920 (`W`, `H`), центр 540/960, пол героя `GY = 1450`. Время `t` — секунды ролика, `u` — от начала сцены. Линия «кипит» по `FRAME` (12/с), движение — 24 к/с.
- Случайность только с зерном: `rng(seed)` → `r()`; `hsh(...числа)` → зерно. «Кипящее» зерно: `rng(hsh(FRAME, k))`, стабильное: `rng(k)`.
- `clamp(x,a=0,b=1)`, `lerp(a,b,k)`, `sm(k)` (smoothstep), `popK(t,t0,d=0.35)` (выскок с отскоком 0→1), `lerpC('#rrggbb','#rrggbb',k)` (props.js).

## Рисование (engine.js)
- `push(x,y,s=1,r=0,fx=1)` / `pop()` — трансформ (толщины линий остаются в экранных px).
- `pencil(pts,{w,col,a,jit,gap:false,pass2:false,taper:false,key})` — карандашная линия. `line(cp,{...,smooth:false})` — через сплайн.
- Формы (контур + заливки): `shape(pts,o)`, `ell(cx,cy,rx,ry,o)`, `blob(cp,o)` (сплайн), `rect(x,y,w,h,o)`, `poly(pts,o)` (core). Опции `o`: `wash` (цвет акварели) `washA`, `fill` (цветной карандаш, дорого), `shade:{gap,a,ang,col}` (штриховка), `line:false`, `w`, `col`, `rot` (для ell). Возвращают `{path, bb}`.
- `hatch(path,bb,{ang,gap,w,col,a,seg})`, `crayon(path,bb,col,o)` — дорого на больших площадях. `wash(path,col,a)`.
- `spline(cp,closed,n)`, `pathOf(pts)`, `bbOf(pts)`, `ellPts(cx,cy,rx,ry,rot,over,n)`.
- `txt(s,x,y,size,{font:'Osw'|'Hand'|'KHand'|'KSign',col,a,align,rot,reveal,bold})` — Osw = Oswald (заголовки), Hand = Caveat (рукопись), KHand = Nanum Pen (хангыль от руки), KSign = Black Han Sans (корейские вывески; `bold:false`).

## Сцена, свет, частицы (core.js)
- `lay(z, fn)` — слой на глубине z (1 = план героя; фон 20–40; средние 3–8; передний план 0.5–0.7). Камера `CAM {x,y,z}` задаётся `DIR.cam`.
- `vgrad(y0,y1,[цвета],a)` — вертикальный градиент на всю ширину; `haze(col,a)` — воздух между слоями; `screenFill(col,a,op)`.
- `glow(x,y,r,col,a,op='lighter')`, `rays(x,y,ang,spread,len,col,a,n,t)`, `motes(n,[x0,y0,x1,y1],col,t,seed,{sp,vx,sz,a,tw,add,wob,stretch})` (снег/пыль/пепел/пузыри), `sil(pts,col,a)` (силуэт без линии), `windows(x,y,w,h,cols,rows,seed,on,cA,cB,a)`, `note(s,x,y,t,t0,t1,col,size,rot,arr)` (рукописная заметка со стрелкой).
- `K` — палитра (ink, amber, ember, brick, stone, water, snow, ice, copper, patina, steel…), `shakeAmt(t)`.
- Буферы переходов: `BUF[0/1]`, `renderTo(canvas, fn)`.

## Переходы (episodes/<эп>/transitions.js)
`drawBuf(c,s,cx,cy,a,op,dx,dy,rot)`, `inCircle(cx,cy,R,fn)`, `inPath(path,fn)`, `ringFX(cx,cy,R,t,cols,a)`, `smear(c,dx,dy,n,base)`, `whiteOut(a,'r,g,b')`, `scr(fn)` — рисовать в экранных координатах.
`TRANS_IN[сцена] = { a, b, fx(k, t, A, B), holdA?, runA? }` — k 0→1 за (a+b) с вокруг S0.сцены; A — прошлая сцена, B — эта.

## Том: `tom(o)` (через DIR.pose; ноги в (x,y), рост ≈ 540·s, голова ≈ y−372·s, плечи ≈ [±64,−232])
`x y s rot flip` · `expr expr2 ek` (смешивание эмоций — приходит из act) · `look:[x,y]` (−1…1) · `hand:[x,y]` `handF:[x,y]` (лапы, локальные) · `point` · `walk` (фаза, напр. `t*8`) · `tilt nod squash` · `chatter frost sweat tailUp` · `watchInHand glow spin` (часы) · `prop` + `propAng`/`propAngF` · `noHat noBlink squint` · `outfit` · `light {side, rim}`.
- **Эмоции (14):** neutral talk shock awe smug sideeye annoyed grin laugh scared cold proud suspicious wink.
- **Костюмы:** 001 — puffer miner astro safari fur explorer dutch victorian sailor iron hoodie; 002 — pufferM diver tulup knyaz kolchuga master painter founder hussar metro hoodieM. Новый костюм: запись в `OUTFIT` + ветка в `costume5` (тело) + `hat5` (шапка); параметры костюма: `pin print capTxt boots mail cuff cuffFur cuffGold slash rolled mitt splash soot long gloves collar detail hat` (grep `OF.<имя>`).
- **Реквизит prop:** coin binoc trowel brush spyglass goblet scroll chisel key medal lantern.

## Режиссура выпуска (каркас 002+: scenes.js / direct.js)
- Реестры: `WORLD[n] = (t,u,cat) => {...; lay(1, () => {...; cat();}) }`, `DIR[n] = { outfit, light, grade:[цвет,сила], act:()=>[[t,эмоция],...], pose:(t,u,b)=>Object.assign(b,{...}), cam:()=>[[t,x,y,z,'x'?],...], hud?(t), afterCat?(t,u,P) }`, `TRANS_IN[n]`.
- Время: `S0.n`/`S1.n` (начало/конец сцены), `LS(k)`/`LE(k)`/`LF(k, доля)` (реплика), `WT(k,'слово')` (фрагмент субтитра со словом), `DUR`. Никаких захардкоженных секунд.
- `EV.<сцена>_<событие> = ...` (звук берёт их через `tools/evdump.cjs`), `SHAKES.push([t0, длит, px])`, `KEYW.push('слово.')` (ровно как в субтитрах, с пунктуацией).
- Камера: `'x'` в ключе — экспо-провал (Spider-Verse), скорость даёт линии и RGB-сдвиг. Панч-зум на KEYW — автоматически.
- HUD (сам): хук (`hook()` в direct.js, текст из episode.json-идеи), табличка года `YR`, шкала, субтитры y≈1588, «ПОДПИШИСЬ» в последнюю секунду. Голова Тома — вне y 1520–1660; верх y 140–380 — под табличку.
- Обложка: `w_cover.js` → `COVER = { scene, t, cam:{x,y,z}, pose:{...}, title:[[строка,цвет],...], size (170), ty (440), badge, sub }` → `node tools/cover.cjs <эп>`. Плашка города — под заголовком; Том и локация — в полосе y 240–1680 (сетка 3:4). render.sh вставляет её первым кадром ролика; в чат — отдельным файлом тоже.

## Инструменты (короткий вывод)
- `tools/check.sh <эп> [t1 t2 …]` — сборка + ошибки + контакт-лист `build/<эп>/shots/sheet.jpg` + мс/кадр одной командой.
- `python3 tools/new_episode.py <NNN-город> "<Город>"` — заготовка выпуска (каркас 002+).
- `python3 tools/libindex.py` → `docs/library.md` — индекс готовых деталей из прошлых миров (что брать за основу).
