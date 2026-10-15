/* Выпуск 002 — Москва. Сцены (эпохи), годы и подписи, реестры для миров. Загружается после engine/core.js, до tom.js и миров.
   Все времена — от реплик (VO/VD из data.js). Каждый мир-файл w_*.js регистрирует свою сцену:
     DIR[name] = { outfit, light, grade, act(), pose(t,u,base), cam(), hud?(t) }   — режиссура сцены (см. direct.js)
     WORLD[name] = (t, u, cat) => {...}                                               — рисование мира, cat() рисует Тома
     TRANS_IN[name] = { a, b, fx(k, t, A, B), holdA?, runA? }                        — переход В эту сцену (A — прошлая, B — эта)
     EV.*, SHAKES.push(...), KEYW.push(...)                                          — события, тряски, ключевые слова субтитров */
const SUBTITLE = 'Москва сквозь время';
const HOOK_LINES = ['МОРЕ НАД', 'КРЕМЛЁМ?!'];   // текст-хук первых ~2.4 с (2 строки)
const YR = { square: ['2026', 'КРАСНАЯ ПЛОЩАДЬ'], tunnel: ['', ''], sea: ['−310 000 000', 'ТЁПЛОЕ МОРЕ'], ice: ['−150 000', 'МОСКОВСКОЕ ОЛЕДЕНЕНИЕ'],
  feast: ['1147', 'ПЕРВОЕ УПОМИНАНИЕ'], white: ['1367', 'БЕЛОКАМЕННЫЙ КРЕМЛЬ'], red: ['1495', 'КРАСНЫЙ КРЕМЛЬ'], bell: ['1735', 'ЦАРЬ-КОЛОКОЛ'],
  fire: ['1812', 'НАПОЛЕОН В МОСКВЕ'], metro: ['1938', 'СТАНЦИЯ «МАЯКОВСКАЯ»'], today: ['2026', 'МОСКВА'], button: ['', ''] };
const SC = SCN.map(([n, a, b]) => [n, a, b, YR[n][0], YR[n][1]]);
const S0 = {}, S1 = {}; SC.forEach(s => { S0[s[0]] = s[1]; S1[s[0]] = Math.min(s[2], DUR); });
const LS = k => VO[k], LE = k => VO[k] + VD[k], LF = (k, f) => VO[k] + VD[k] * f;
const EV = { h2: LS('h2'), hookEnd: Math.min(2.4, LE('h1') - 0.15), portal: LS('x1') + 0.4 };
const SHAKES = [];
const YEARS = { square: 2026, sea: -3.1e8, ice: -1.5e5, feast: 1147, white: 1367, red: 1495, bell: 1735, fire: 1812, metro: 1938, today: 2026 };
const KEYW = ['море!', 'Кремлём!', 'время!', 'город', 'отмотаем!'];
const DIR = {}, WORLD = {}, TRANS_IN = {};
/* WT('c2', 'московский') — время начала субтитра-фрагмента со словом (без ударений, без учёта регистра и знаков); для синхронизации действий со словами */
const WT = (k, w) => { const n = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, ''); const c = CAPS.find(c => c.key === k && c.words.some(x => n(x) === n(w))) || CAPS.find(c => c.key === k && c.words.some(x => n(x).startsWith(n(w)))); return c ? c.t0 : LS(k); };
