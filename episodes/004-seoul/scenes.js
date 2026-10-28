/* Выпуск 004 — Сеул. Сцены (эпохи), годы и подписи, реестры для миров. Загружается после engine/core.js, до tom.js и миров.
   Все времена — от реплик (VO/VD из data.js). Каждый мир-файл w_*.js регистрирует свою сцену:
     DIR[name] = { outfit, light, grade, act(), pose(t,u,base), cam(), hud?(t) }   — режиссура сцены (см. direct.js)
     WORLD[name] = (t, u, cat) => {...}                                               — рисование мира, cat() рисует Тома
     TRANS_IN[name] = { a, b, fx(k, t, A, B), holdA?, runA? }                        — переход В эту сцену (A — прошлая, B — эта)
     EV.*, SHAKES.push(...), KEYW.push(...)                                          — события, тряски, ключевые слова субтитров */
const SUBTITLE = 'Сеул сквозь время';
const SAT = 1.1;                                          // насыщенность итогового кадра (владелец 18.10.2026: на ~10 % цветастее)
const HOOK_LINES = ['НОЧЬЮ —', 'НЕЛЬЗЯ?!'];   // текст-хук первых ~2.4 с
const YR = { hook: ['2026', 'ПЛОЩАДЬ КВАНХВАМУН'], tunnel: ['', ''], granite: ['−170 000 000', 'ГРАНИТ ПОД СЕУЛОМ'], capital: ['1394', 'НОВАЯ СТОЛИЦА'],
  wall: ['1396', 'КРЕПОСТНАЯ СТЕНА'], hangul: ['1446', 'АЛФАВИТ ХАНГЫЛЬ'], light: ['1887', 'ПЕРВОЕ ЭЛЕКТРИЧЕСТВО'], legation: ['1896', 'КОРОЛЬ В РОССИЙСКОЙ МИССИИ'],
  ggb: ['1926 → 1995', 'ЗДАНИЕ ПЕРЕД ДВОРЦОМ'], curfew: ['1945–1982', 'КОМЕНДАНТСКИЙ ЧАС'], gangnam: ['1960-е → 2012', 'ГАНГНАМ'], today: ['2026', 'СЕУЛ'], button: ['', ''] };
const SC = SCN.map(([n, a, b]) => [n, a, b, YR[n][0], YR[n][1]]);
const S0 = {}, S1 = {}; SC.forEach(s => { S0[s[0]] = s[1]; S1[s[0]] = Math.min(s[2], DUR); });
const LS = k => VO[k], LE = k => VO[k] + VD[k], LF = (k, f) => VO[k] + VD[k] * f;
const EV = { h2: LS('h2'), hookEnd: Math.min(2.4, LE('h1') - 0.15), portal: LS('x1') + 0.4 };
const SHAKES = [];
const YEARS = { hook: 2026, granite: -1.7e8, capital: 1394, wall: 1396, hangul: 1446, light: 1887, legation: 1896, ggb: 1926, curfew: 1970, gangnam: 1965, today: 2026 };
const KEYW = ['время!', 'город', 'отмотаем!'];
const DIR = {}, WORLD = {}, TRANS_IN = {};
/* WT('c2', 'московский') — время начала субтитра-фрагмента со словом (без ударений, без учёта регистра и знаков); для синхронизации действий со словами */
const WT = (k, w) => { const n = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, ''); const c = CAPS.find(c => c.key === k && c.words.some(x => n(x) === n(w))) || CAPS.find(c => c.key === k && c.words.some(x => n(x).startsWith(n(w)))); return c ? c.t0 : LS(k); };
