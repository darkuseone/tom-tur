/* Выпуск 004 — Владивосток. Сцены (эпохи), годы и подписи, реестры для миров. Загружается после engine/core.js, до tom.js и миров.
   Все времена — от реплик (VO/VD из data.js). Каждый мир-файл w_*.js регистрирует свою сцену:
     DIR[name] = { outfit, light, grade, act(), pose(t,u,base), cam(), hud?(t) }   — режиссура сцены (см. direct.js)
     WORLD[name] = (t, u, cat) => {...}                                               — рисование мира, cat() рисует Тома
     TRANS_IN[name] = { a, b, fx(k, t, A, B), holdA?, runA? }                        — переход В эту сцену (A — прошлая, B — эта)
     EV.*, SHAKES.push(...), KEYW.push(...)                                          — события, тряски, ключевые слова субтитров */
const SUBTITLE = 'Владивосток сквозь время';
const SAT = 1.1;                                          // насыщенность итогового кадра (владелец 18.10.2026: на ~10 % цветастее)
const HOOK_LINES = ['ШИРОТА', 'СОЧИ?!'];   // текст-хук первых ~2.4 с
const YR = { hook: ['2026', 'АМУРСКИЙ ЗАЛИВ · 43° С. Ш.'], tunnel: ['', ''], golden: ['1859', 'БУХТА ЗОЛОТОЙ РОГ'], post: ['1860', 'ПОСТ ВЛАДИВОСТОК'],
  tsar: ['1891', 'НАЧАЛО ТРАНССИБА'], interv: ['1918', 'ИНТЕРВЕНЦИЯ'], brynner: ['1920', 'УЛИЦА АЛЕУТСКАЯ'], anna: ['1935', 'КАПИТАН АННА ЩЕТИНИНА'],
  khrush: ['1959', '«НАШ САН-ФРАНЦИСКО»'], japan: ['1990-е', 'ПРАВЫЙ РУЛЬ'], bridge: ['2012', 'РУССКИЙ МОСТ'], today: ['2026', 'ВЛАДИВОСТОК'], button: ['', ''] };
const SC = SCN.map(([n, a, b]) => [n, a, b, YR[n][0], YR[n][1]]);
const S0 = {}, S1 = {}; SC.forEach(s => { S0[s[0]] = s[1]; S1[s[0]] = Math.min(s[2], DUR); });
const LS = k => VO[k], LE = k => VO[k] + VD[k], LF = (k, f) => VO[k] + VD[k] * f;
const EV = { h2: LS('h2'), hookEnd: Math.min(2.4, LE('h1') - 0.15), portal: LS('x1') + 0.4 };
const SHAKES = [];
const YEARS = { hook: 2026, golden: 1859, post: 1860, tsar: 1891, interv: 1918, brynner: 1920, anna: 1935, khrush: 1959, japan: 1995, bridge: 2012, today: 2026 };
const KEYW = ['время!', 'город', 'отмотаем!'];
/* wt(k, 'слово') — время слова внутри фрагмента субтитра (пропорция по буквам) */
const wt = (k, w) => { const n = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, ''); const c = CAPS.find(c => c.key === k && c.words.some(x => n(x) === n(w))); if (!c) return WT(k, w);
  const i = c.words.findIndex(x => n(x) === n(w)), L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0); return c.t0 + (c.t1 - c.t0) * pre / tot; };
const DIR = {}, WORLD = {}, TRANS_IN = {};
/* WT('c2', 'московский') — время начала субтитра-фрагмента со словом (без ударений, без учёта регистра и знаков); для синхронизации действий со словами */
const WT = (k, w) => { const n = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, ''); const c = CAPS.find(c => c.key === k && c.words.some(x => n(x) === n(w))) || CAPS.find(c => c.key === k && c.words.some(x => n(x).startsWith(n(w)))); return c ? c.t0 : LS(k); };
