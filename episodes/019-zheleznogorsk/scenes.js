/* Выпуск 019 — Железногорск. Сцены (эпохи), годы и подписи, реестры для миров. Загружается после engine/core.js, до tom.js и миров.
   Все времена — от реплик (VO/VD из data.js). Каждый мир-файл w_*.js регистрирует свою сцену:
     DIR[name] = { outfit, light, grade, act(), pose(t,u,base), cam(), hud?(t) }   — режиссура сцены (см. direct.js)
     WORLD[name] = (t, u, cat) => {...}                                               — рисование мира, cat() рисует Тома
     TRANS_IN[name] = { a, b, fx(k, t, A, B), holdA?, runA? }                        — переход В эту сцену (A — прошлая, B — эта)
     EV.*, SHAKES.push(...), KEYW.push(...)                                          — события, тряски, ключевые слова субтитров */
const SUBTITLE = 'Железногорск сквозь время';
const SAT = 1.1;                                          // насыщенность итогового кадра (владелец 18.10.2026: на ~10 % цветастее)
const HOOK_LINES = ['80 000 ЗЭКОВ', 'ЗАЧЕМ?!'];          // текст-хук на всю реплику h1
const PROGRESS = true;                                    // точки «эпоха n/N» вместо шкалы 450 млн лет
const QUESTION = { q: 'ЗАЧЕМ ИМ ГОРА?', a: 'ПЛУТОНИЙ ДЛЯ БОМБ', at: () => EV.answer };   // открытая петля до ответа (s6)
const YR = { hook: ['2026', 'ГОРА НАД ЕНИСЕЕМ'], tunnel: ['', ''], kremlin: ['1950', 'ПОСТАНОВЛЕНИЕ № 815'], rails: ['1950', 'ЛАГЕРЬ «ГРАНИТНЫЙ»'], drill: ['1950-е', 'ВНУТРИ ГОРЫ'], amnesty: ['1953', 'АМНИСТИЯ'], secret: ['1954', 'КРАСНОЯРСК-26'], reactor: ['1958', 'РАССЕКРЕЧЕНО'], heat: ['1964', 'АТОМНОЕ ТЕПЛО'], last: ['2010', 'ПОСЛЕДНИЙ РЕАКТОР'], today: ['2026', 'ЖЕЛЕЗНОГОРСК'], button: ['', ''] };
const SC = SCN.map(([n, a, b]) => [n, a, b, YR[n][0], YR[n][1]]);
const S0 = {}, S1 = {}; SC.forEach(s => { S0[s[0]] = s[1]; S1[s[0]] = Math.min(s[2], DUR); });
const LS = k => VO[k], LE = k => VO[k] + VD[k], LF = (k, f) => VO[k] + VD[k] * f;
const EV = { h2: LS('h2'), hookEnd: Math.min(4.5, LE('h1') - 0.1), portal: LS('x1') + 0.4 };
const SHAKES = [];
const YEARS = { hook: 2026, kremlin: 1950, rails: 1950, drill: 1952, amnesty: 1953, secret: 1954, reactor: 1958, heat: 1964, last: 2010, today: 2026 };
const KEYW = ['время!', 'город', 'отмотаем!'];
const DIR = {}, WORLD = {}, TRANS_IN = {};
/* WT('c2', 'московский') — время начала субтитра-фрагмента со словом (без ударений, без учёта регистра и знаков); для синхронизации действий со словами */
const WT = (k, w) => { const n = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, ''); const c = CAPS.find(c => c.key === k && c.words.some(x => n(x) === n(w))) || CAPS.find(c => c.key === k && c.words.some(x => n(x).startsWith(n(w)))); return c ? c.t0 : LS(k); };
