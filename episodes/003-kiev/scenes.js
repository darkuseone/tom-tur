/* Выпуск 003 — Киев. Сцены (эпохи), годы и подписи, реестры для миров. Загружается после engine/core.js, до tom.js и миров.
   Все времена — от реплик (VO/VD из data.js). Каждый мир-файл w_*.js регистрирует свою сцену:
     DIR[name] = { outfit, light, grade, act(), pose(t,u,base), cam(), hud?(t) }   — режиссура сцены (см. direct.js)
     WORLD[name] = (t, u, cat) => {...}                                               — рисование мира, cat() рисует Тома
     TRANS_IN[name] = { a, b, fx(k, t, A, B), holdA?, runA? }                        — переход В эту сцену (A — прошлая, B — эта)
     EV.*, SHAKES.push(...), KEYW.push(...)                                          — события, тряски, ключевые слова субтитров */
const SUBTITLE = 'Киев сквозь время';
const HOOK_LINES = ['АКУЛА ПОД', 'КИЕВОМ?!'];   // текст-хук первых ~2.4 с
const YR = { metro: ['2026', 'СТАНЦИЯ «АРСЕНАЛЬНАЯ»'], tunnel: ['', ''], heli: ['1909', 'ВЕРТОЛЁТ СИКОРСКОГО'], chimera: ['1901', 'ДОМ С ХИМЕРАМИ'],
  caves: ['XII ВЕК', 'ПЕЩЕРЫ ЛАВРЫ'], anna: ['1063', 'АННА — КОРОЛЕВА ФРАНЦИИ'], perun: ['988', 'КРЕЩЕНИЕ КИЕВА'], oleg: ['882', 'ВЕЩИЙ ОЛЕГ'],
  kyi: ['482 (?)', '«ОСНОВАНИЕ» КИЕВА'], mammoth: ['−17 000', 'ОХОТНИКИ НА МАМОНТОВ'], sea: ['−41 000 000', 'ЭОЦЕНОВОЕ МОРЕ'], today: ['2026', 'КИЕВ'], button: ['', ''] };
const SC = SCN.map(([n, a, b]) => [n, a, b, YR[n][0], YR[n][1]]);
const S0 = {}, S1 = {}; SC.forEach(s => { S0[s[0]] = s[1]; S1[s[0]] = Math.min(s[2], DUR); });
const LS = k => VO[k], LE = k => VO[k] + VD[k], LF = (k, f) => VO[k] + VD[k] * f;
const EV = { h2: LS('h2'), hookEnd: Math.min(2.4, LE('h1') - 0.15), portal: LS('x1') + 0.4 };
const SHAKES = [];
const YEARS = { metro: 2026, heli: 1909, chimera: 1901, caves: 1188, anna: 1063, perun: 988, oleg: 882, kyi: 482, mammoth: -1.7e4, sea: -4.1e7, today: 2026 };
const KEYW = ['акулу!', 'время!', 'город', 'отмотаем!'];
const DIR = {}, WORLD = {}, TRANS_IN = {};
/* WT('c2', 'московский') — время начала субтитра-фрагмента со словом (без ударений, без учёта регистра и знаков); для синхронизации действий со словами */
const WT = (k, w) => { const n = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, ''); const c = CAPS.find(c => c.key === k && c.words.some(x => n(x) === n(w))) || CAPS.find(c => c.key === k && c.words.some(x => n(x).startsWith(n(w)))); return c ? c.t0 : LS(k); };
