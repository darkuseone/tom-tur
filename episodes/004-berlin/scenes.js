/* Выпуск 004 — Берлин. Сцены (эпохи), годы и подписи, реестры для миров. Загружается после engine/core.js, до tom.js и миров.
   Все времена — от реплик (VO/VD из data.js). Каждый мир-файл w_*.js регистрирует свою сцену:
     DIR[name] = { outfit, light, grade, act(), pose(t,u,base), cam(), hud?(t) }   — режиссура сцены (см. direct.js)
     WORLD[name] = (t, u, cat) => {...}                                               — рисование мира, cat() рисует Тома
     TRANS_IN[name] = { a, b, fx(k, t, A, B), holdA?, runA? }                        — переход В эту сцену (A — прошлая, B — эта)
     EV.*, SHAKES.push(...), KEYW.push(...)                                          — события, тряски, ключевые слова субтитров */
const SUBTITLE = 'Берлин сквозь время';
const SAT = 1.1;                                          // насыщенность итогового кадра (владелец 18.10.2026: на ~10 % цветастее)
const HOOK_LINES = ['БЕРЛИН =', 'БОЛОТО?!'];   // текст-хук первых ~2.4 с
const YR = { bog: ['2026', 'БРАНДЕНБУРГСКИЕ ВОРОТА'], tunnel: ['', ''], ice: ['−20 000', 'ЛЕДНИКОВЫЙ ПЕРИОД'], twins: ['1237', 'БЕРЛИН И КЁЛЛЬН'],
  huguenot: ['1700', 'ФРАНЦУЗСКИЙ БЕРЛИН'], quadriga: ['1806', 'НАПОЛЕОН В БЕРЛИНЕ'], bowl: ['1831', 'ГРАНИТНАЯ ЧАША'], yard: ['1862', 'ПЛАН ХОБРЕХТА'],
  airlift: ['1948', 'ВОЗДУШНЫЙ МОСТ'], tower: ['1969', 'ТЕЛЕБАШНЯ'], wall: ['1989', 'ПАДЕНИЕ СТЕНЫ'], today: ['2026', 'БЕРЛИН'], button: ['', ''] };
const SC = SCN.map(([n, a, b]) => [n, a, b, YR[n][0], YR[n][1]]);
const S0 = {}, S1 = {}; SC.forEach(s => { S0[s[0]] = s[1]; S1[s[0]] = Math.min(s[2], DUR); });
const LS = k => VO[k], LE = k => VO[k] + VD[k], LF = (k, f) => VO[k] + VD[k] * f;
const EV = { h2: LS('h2'), hookEnd: Math.min(2.4, LE('h1') - 0.15), portal: LS('x1') + 0.4 };
const SHAKES = [];
const YEARS = { bog: 2026, ice: -2e4, twins: 1237, huguenot: 1700, quadriga: 1806, bowl: 1831, yard: 1862, airlift: 1948, tower: 1969, wall: 1989, today: 2026 };
const KEYW = ['Болото!', 'время!', 'город', 'отмотаем!'];
const DIR = {}, WORLD = {}, TRANS_IN = {};
/* WT('c2', 'московский') — время начала субтитра-фрагмента со словом (без ударений, без учёта регистра и знаков); для синхронизации действий со словами */
const WT = (k, w) => { const n = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, ''); const c = CAPS.find(c => c.key === k && c.words.some(x => n(x) === n(w))) || CAPS.find(c => c.key === k && c.words.some(x => n(x).startsWith(n(w)))); return c ? c.t0 : LS(k); };
