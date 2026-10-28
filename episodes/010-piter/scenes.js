/* Выпуск 010 — Санкт-Петербург. Сцены (эпохи), годы и подписи, реестры для миров. Загружается после engine/core.js, до tom.js и миров.
   Все времена — от реплик (VO/VD из data.js). Каждый мир-файл w_*.js регистрирует свою сцену:
     DIR[name] = { outfit, light, grade, act(), pose(t,u,base), cam(), hud?(t) }   — режиссура сцены (см. direct.js)
     WORLD[name] = (t, u, cat) => {...}                                               — рисование мира, cat() рисует Тома
     TRANS_IN[name] = { a, b, fx(k, t, A, B), holdA?, runA? }                        — переход В эту сцену (A — прошлая, B — эта)
     EV.*, SHAKES.push(...), KEYW.push(...)                                          — события, тряски, ключевые слова субтитров */
const SUBTITLE = 'Санкт-Петербург сквозь время';
const SAT = 1.1;                                          // насыщенность итогового кадра (владелец 18.10.2026: на ~10 % цветастее)
const HOOK_LINES = ['ОСНОВАЛ', 'НЕ ПЁТР?!'];   // текст-хук первых ~2.4 с
const YR = { hook: ['2026', 'НЕВА У СМОЛЬНОГО'], tunnel: ['', ''], landskrona: ['1300', 'ШВЕДСКАЯ ЛАНДСКРОНА'], nyen: ['1703', 'ПЁТР БЕРЁТ НИЕНШАНЦ'],
  stone: ['1714', 'КАМЕННЫЙ НАЛОГ'], kunst: ['1719', 'КУНСТКАМЕРА'], flood: ['1824', 'ВЕЛИКОЕ НАВОДНЕНИЕ'], column: ['1832', 'АЛЕКСАНДРОВСКАЯ КОЛОННА'],
  aurora: ['1917', '«АВРОРА» И ШТУРМ ЗИМНЕГО'], blockade: ['1941–1944', 'БЛОКАДА ЛЕНИНГРАДА'], today: ['2026', 'САНКТ-ПЕТЕРБУРГ'], button: ['', ''] };
const SC = SCN.map(([n, a, b]) => [n, a, b, YR[n][0], YR[n][1]]);
const S0 = {}, S1 = {}; SC.forEach(s => { S0[s[0]] = s[1]; S1[s[0]] = Math.min(s[2], DUR); });
const LS = k => VO[k], LE = k => VO[k] + VD[k], LF = (k, f) => VO[k] + VD[k] * f;
const EV = { h2: LS('h2'), hookEnd: Math.min(2.4, LE('h1') - 0.15), portal: LS('x1') + 0.4 };
const SHAKES = [];
const YEARS = { hook: 2026, landskrona: 1300, nyen: 1703, stone: 1714, kunst: 1719, flood: 1824, column: 1832, aurora: 1917, blockade: 1942, today: 2026 };
const KEYW = ['время!', 'город', 'отмотаем!'];
const DIR = {}, WORLD = {}, TRANS_IN = {};
/* WT('c2', 'московский') — время начала субтитра-фрагмента со словом (без ударений, без учёта регистра и знаков); для синхронизации действий со словами */
const WT = (k, w) => { const n = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, ''); const c = CAPS.find(c => c.key === k && c.words.some(x => n(x) === n(w))) || CAPS.find(c => c.key === k && c.words.some(x => n(x).startsWith(n(w)))); return c ? c.t0 : LS(k); };
