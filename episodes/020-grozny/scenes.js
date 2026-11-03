/* Выпуск 020 — Грозный. Сцены (эпохи), годы и подписи, реестры для миров. Загружается после engine/core.js, до tom.js и миров.
   Все времена — от реплик (VO/VD из data.js). Каждый мир-файл w_*.js регистрирует свою сцену:
     DIR[name] = { outfit, light, grade, act(), pose(t,u,base), cam(), hud?(t) }   — режиссура сцены (см. direct.js)
     WORLD[name] = (t, u, cat) => {...}                                               — рисование мира, cat() рисует Тома
     TRANS_IN[name] = { a, b, fx(k, t, A, B), holdA?, runA? }                        — переход В эту сцену (A — прошлая, B — эта)
     EV.*, SHAKES.push(...), KEYW.push(...)                                          — события, тряски, ключевые слова субтитров */
const SUBTITLE = 'Грозный сквозь время';
const SAT = 1.1;
const PROGRESS = true;                                    // точки «эпоха n/N» вместо шкалы 450 млн лет (для короткой истории; для геологии — убрать)
const QUESTION = { q: 'В ЧЕСТЬ КОГО?', a: 'КРЕПОСТЬ «ГРОЗНАЯ»', at: () => EV.answer };   // открытая петля до ответа (a1)
const HOOK_LINES = ['НЕ В ЧЕСТЬ', 'ИВАНА ГРОЗНОГО?!'];   // текст-хук на всю реплику h1
const YR = { hook: ['2026', 'НАБЕРЕЖНАЯ СУНЖИ'], tunnel: ['', ''], fort: ['1818', 'КРЕПОСТЬ НА СУНЖЕ'], valerik: ['1840', 'КАВКАЗСКАЯ ВОЙНА'], oil: ['1893', 'ПЕРВЫЙ ФОНТАН'], war42: ['1942', 'НАЛЁТЫ НА ПРОМЫСЛЫ'], deport: ['1944', 'ДЕПОРТАЦИЯ'], storm: ['1994', 'ПЕРВАЯ ВОЙНА'], ruins: ['2000', 'ВТОРАЯ ВОЙНА'], today: ['2026', 'ГРОЗНЫЙ-СИТИ'], answer: ['1818', 'ОТВЕТ'], button: ['', ''] };
const SC = SCN.map(([n, a, b]) => [n, a, b, YR[n][0], YR[n][1]]);
const S0 = {}, S1 = {}; SC.forEach(s => { S0[s[0]] = s[1]; S1[s[0]] = Math.min(s[2], DUR); });
const LS = k => VO[k], LE = k => VO[k] + VD[k], LF = (k, f) => VO[k] + VD[k] * f;
const EV = { h2: LS('h2'), hookEnd: Math.min(4.5, LE('h1') - 0.1), portal: LS('x1') + 0.4 };
const SHAKES = [];
const YEARS = { hook: 2026, fort: 1818, valerik: 1840, oil: 1893, war42: 1942, deport: 1944, storm: 1994, ruins: 2000, today: 2026 };
const KEYW = ['время!', 'город', 'отмотаем!'];
const DIR = {}, WORLD = {}, TRANS_IN = {};
/* WT('c2', 'московский') — время начала субтитра-фрагмента со словом (без ударений, без учёта регистра и знаков); для синхронизации действий со словами */
const WT = (k, w) => { const n = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, ''); const c = CAPS.find(c => c.key === k && c.words.some(x => n(x) === n(w))) || CAPS.find(c => c.key === k && c.words.some(x => n(x).startsWith(n(w)))); return c ? c.t0 : LS(k); };
