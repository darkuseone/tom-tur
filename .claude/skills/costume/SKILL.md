---
name: costume
description: Костюм Тома под эпоху — сначала готовый из каталога, иначе новый в engine/tom.js через tools/add_costume.py (без чтения рига) и проверка листом tools/tomsheet.cjs.
---
# /costume <эп> <эпоха/описание>

1. **Сначала готовые**: `docs/costumes.md` (≈40 костюмов). Подходит по смыслу — берём. Дешёвый вариант — перекраска: новая строка OUTFIT с тем же `detail`/`hat` и своими `top/topD/topL/print/capTxt` (худи города: `detail: 'hoodie', print: 'ГОРОД', capTxt: 'Г'`).
2. **Новый**: написать фрагмент в scratchpad и вставить `python3 tools/add_costume.py <файл.js>`:
   ```
   //@OUTFIT
     name: { top, topD, topL, pants, detail: 'name', hat: 'hatname', boots: 'leather'|'shoe'|'oxford'|'lapti'|…, long: 1 /* длинная одежда */ },
   //@COST6
     name(OF, b, t, bp, L) { … },   // туловище: ворот y −256+b, пояс −118+b; подол: skirt6(OF, b, L, −118, −30, 90, 108, key); bp — путь тела
   //@HAT6
     hatname(t, o, fx, L) { … },     // голова: макушка y≈−100, глаза (±42+fx, −10), r≈100; уши видны — шапка поверх
   ```
   Хелперы рига: `goldBand(P,w,key)`, `embroid(P,w,key)`, `furBand(P,w,col,colD,colL,key)`, `nb(x,y,r,col)` (пуговица), `metalG(path,x,y,r,cL,c,cD)`, `shadeG`, `skirt6`, `tubeP`, `edgeOff`, `rimL`, `dashL`. Цвета металла — `CU.gold/copper/…`, линия — `TM.line`. Скрипт сам добавит detail в список «без манишки» и проверит синтаксис.
   Параметры OUTFIT, которые уже понимает риг: `sleeve` (цвет рукавов), `cuff`, `cuffFur`, `cuffGold`, `mail`, `rolled`, `gloves`, `shirt`, `tie: 'bow'`, `collar`, `noPin` (у `soviet`).
3. **Проверка за секунды**: `python3 tools/mkpage.py <эп> && node tools/tomsheet.cjs <эп> name1,name2,… [эмоция] [prop]` → Read `build/<эп>/tomsheet.jpg`. Смотреть: шапка не закрывает глаза, завязки/бусы не идут по лицу, нет «манишки» на чужом костюме, силуэт читается.
4. Строка в `docs/costumes.md` (ключ | что | выпуск | для чего ещё подойдёт). Шапки для людей (`human`, props.js): `topknot gat samo ikseon jeonrip straw police sailor bun jangot cap fur merchant helmet scarf crown hood`.
