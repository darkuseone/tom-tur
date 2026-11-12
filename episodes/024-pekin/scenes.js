/* Выпуск 024 — Пекин. Сцены (эпохи), годы и подписи, реестры для миров. Загружается после engine/core.js, до tom.js и миров.
   Все времена — от реплик (VO/VD из data.js). Каждый мир-файл w_*.js регистрирует свою сцену:
     DIR[name] = { outfit, light, grade, act(), pose(t,u,base), cam(), hud?(t) }   — режиссура сцены (см. direct.js)
     WORLD[name] = (t, u, cat) => {...}                                               — рисование мира, cat() рисует Тома
     TRANS_IN[name] = { a, b, fx(k, t, A, B), holdA?, runA? }                        — переход В эту сцену (A — прошлая, B — эта)
     EV.*, SHAKES.push(...), KEYW.push(...)                                          — события, тряски, ключевые слова субтитров */
const SUBTITLE = 'Пекин сквозь время';
const SAT = 1.1;
const BLOOM = 0.12;                                        // свечение только самых ярких мест (12.11.2026)
const JUICE = 0.2;                                         // сочность: контраст + насыщенность
const CHAPTERS = { palace: ['ТАЙНА 1', 'ЗАПРЕТНЫЙ ГОРОД'], dig: ['ТАЙНА 2', 'ГОРОД ПОД ГОРОДОМ'], cave: ['ТАЙНА 3', 'ПЕЩЕРА ДРАКОНА'] };   // главы — текстом, голос их не читает
const PROGRESS = true;                                    // точки «эпоха n/N» вместо шкалы 450 млн лет (для короткой истории; для геологии — убрать)
const QUESTION = { q: 'ГДЕ КОСТИ?', a: 'ПОД ПАРКОВКОЙ?', at: () => EV.answer };   // плашка открытой петли до ответа (core.js qchip)                                          // насыщенность итогового кадра (владелец 18.10.2026: на ~10 % цветастее)
const HOOK_LINES = ['КОСТИ', 'ПРОПАЛИ?!'];   // текст-хук первых ~2.4 с
const YR = { hook: ['2026', 'ПЕКИН · МУЗЕЙ'], tunnel: ['', ''], palace: ['1420', 'ТАЙНА 1 · ЗАПРЕТНЫЙ ГОРОД'], dig: ['1969', 'ТАЙНА 2 · ПОД ГОРОДОМ'], bunker: ['1979', 'УБЕЖИЩЕ ГОТОВО'], cave: ['1929', 'ТАЙНА 3 · ПЕЩЕРА'], occup: ['1937', 'ОККУПАЦИЯ'], crates: ['1941', 'ДВА ЯЩИКА'], parking: ['1947', 'ПОРТ ЦИНЬХУАНДАО'], today: ['2026', 'ПЕКИН · МУЗЕЙ'], button: ['', ''] };
const SC = SCN.map(([n, a, b]) => [n, a, b, YR[n][0], YR[n][1]]);
const S0 = {}, S1 = {}; SC.forEach(s => { S0[s[0]] = s[1]; S1[s[0]] = Math.min(s[2], DUR); });
const LS = k => VO[k], LE = k => VO[k] + VD[k], LF = (k, f) => VO[k] + VD[k] * f;
const EV = { h2: LS('h2'), hookEnd: Math.min(4.5, LE('h1') - 0.1), portal: LS('x1') + 0.4 };
const SHAKES = [];
const YEARS = { hook: 2026, palace: 1420, dig: 1969, bunker: 1979, cave: 1929, occup: 1937, crates: 1941, parking: 1947, today: 2026 };
const KEYW = ['время!', 'город', 'отмотаем!'];
const DIR = {}, WORLD = {}, TRANS_IN = {};
/* WT('c2', 'московский') — время начала субтитра-фрагмента со словом (без ударений, без учёта регистра и знаков); для синхронизации действий со словами */
const WT = (k, w) => { const n = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, ''); const c = CAPS.find(c => c.key === k && c.words.some(x => n(x) === n(w))) || CAPS.find(c => c.key === k && c.words.some(x => n(x).startsWith(n(w)))); return c ? c.t0 : LS(k); };
