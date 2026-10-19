/* Выпуск 004 — Рим. Сцены (эпохи), годы и подписи, реестры для миров. Загружается после engine/core.js, до tom.js и миров.
   Все времена — от реплик (VO/VD из data.js). Каждый мир-файл w_*.js регистрирует свою сцену:
     DIR[name] = { outfit, light, grade, act(), pose(t,u,base), cam(), hud?(t) }   — режиссура сцены (см. direct.js)
     WORLD[name] = (t, u, cat) => {...}                                               — рисование мира, cat() рисует Тома
     TRANS_IN[name] = { a, b, fx(k, t, A, B), holdA?, runA? }                        — переход В эту сцену (A — прошлая, B — эта)
     EV.*, SHAKES.push(...), KEYW.push(...)                                          — события, тряски, ключевые слова субтитров */
const SUBTITLE = 'Мифы Рима';
const SAT = 1.1;                                          // насыщенность итогового кадра (владелец 18.10.2026: на ~10 % цветастее)
const HOOK_LINES = ['ЦЕЗАРЬ', 'И КОТЫ?!'];   // текст-хук первых ~2.4 с
const YR = { hook: ['2026', 'ТОРРЕ АРДЖЕНТИНА'], tunnel: ['', ''], volcano: ['−600 000', 'АЛЬБАНСКИЙ ВУЛКАН'], wolf: ['753 до н. э.', 'ВОЛЧИЦА'], caesar: ['44 до н. э.', 'МАРТОВСКИЕ ИДЫ'],
  vespasian: ['70 г.', 'НАЛОГ ВЕСПАСИАНА'], colosseum: ['80 г.', 'АМФИТЕАТР ФЛАВИЕВ'], pantheon: ['125 г.', 'ПАНТЕОН'], sistine: ['1512', 'СИКСТИНСКАЯ КАПЕЛЛА'],
  forum: ['1650', 'КАМПО ВАЧЧИНО'], metro: ['2025', 'МЕТРО C'], today: ['2026', 'РИМ'], button: ['', ''] };
const SC = SCN.map(([n, a, b]) => [n, a, b, YR[n][0], YR[n][1]]);
const S0 = {}, S1 = {}; SC.forEach(s => { S0[s[0]] = s[1]; S1[s[0]] = Math.min(s[2], DUR); });
const LS = k => VO[k], LE = k => VO[k] + VD[k], LF = (k, f) => VO[k] + VD[k] * f;
const EV = { hookEnd: 2.3, portal: LS('x1') + 0.4 };
const SHAKES = [];
const YEARS = { hook: 2026, volcano: -600000, wolf: -753, caesar: -44, vespasian: 70, colosseum: 80, pantheon: 125, sistine: 1512, forum: 1650, metro: 2025, today: 2026 };
const KEYW = ['время!', 'город', 'отмотаем!'];
const DIR = {}, WORLD = {}, TRANS_IN = {};
/* WT('c2', 'московский') — время начала субтитра-фрагмента со словом (без ударений, без учёта регистра и знаков); для синхронизации действий со словами */
const WT = (k, w) => { const n = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, ''); const c = CAPS.find(c => c.key === k && c.words.some(x => n(x) === n(w))) || CAPS.find(c => c.key === k && c.words.some(x => n(x).startsWith(n(w)))); return c ? c.t0 : LS(k); };
