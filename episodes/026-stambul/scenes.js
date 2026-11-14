/* Выпуск 026 — Стамбул. Сцены (эпохи), годы и подписи, реестры для миров. Загружается после engine/core.js, до tom.js и миров.
   Все времена — от реплик (VO/VD из data.js). Каждый мир-файл w_*.js регистрирует свою сцену:
     DIR[name] = { outfit, light, grade, act(), pose(t,u,base), cam(), hud?(t) }   — режиссура сцены (см. direct.js)
     WORLD[name] = (t, u, cat) => {...}                                               — рисование мира, cat() рисует Тома
     TRANS_IN[name] = { a, b, fx(k, t, A, B), holdA?, runA? }                        — переход В эту сцену (A — прошлая, B — эта)
     EV.*, SHAKES.push(...), KEYW.push(...)                                          — события, тряски, ключевые слова субтитров */
const SUBTITLE = 'Стамбул сквозь время';
const SAT = 1.1;
const BLOOM = 0.12;                                        // свечение только самых ярких мест (12.11.2026: 0.3 давало ореол и мыло); 0 — выключить
const JUICE = 0.2;                                         // «сочность» итогового кадра: +контраст и насыщенность (владелец 12.11.2026)
const PROGRESS = true;                                    // точки «эпоха n/N» вместо шкалы 450 млн лет (для короткой истории; для геологии — убрать)
const QUESTION = { q: 'КОГДА — СТАМБУЛ?', a: 'В 1930-м!', at: () => EV.answer };   // плашка открытой петли до ответа (core.js qchip)                                          // насыщенность итогового кадра (владелец 18.10.2026: на ~10 % цветастее)
const HOOK_LINES = ['СУЛТАН НЕ', 'ПЕРЕИМЕНОВАЛ?!'];
const CHAPTERS = { byzant: ['ИМЯ 1', 'ВИЗАНТИЙ'], konst: ['ИМЯ 2', 'КОНСТАНТИНОПОЛЬ'], sultan: ['ИМЯ 3?', 'КОСТАНТИНИЙЕ'], post: ['ИМЯ 4', 'СТАМБУЛ'] };   // главы — текстом, голос не читает   // текст-хук первых ~2.4 с
const YR = { hook: ['2026', 'ГАЛАТСКИЙ МОСТ'], tunnel: ['', ''], byzant: ['VII В. ДО Н. Э.', 'ГРЕКИ НА БОСФОРЕ'], konst: ['330', 'НОВАЯ СТОЛИЦА'], sofia: ['537', 'СВЯТАЯ СОФИЯ'], fall: ['1453', 'ЦЕПЬ ЗОЛОТОГО РОГА'], sultan: ['1840', 'ИМЯ НА МОНЕТАХ'], post: ['1930', 'ЗАКОН О ПОЧТЕ'], today: ['2026', 'ДВА КОНТИНЕНТА'], button: ['', ''] };
const SC = SCN.map(([n, a, b]) => [n, a, b, YR[n][0], YR[n][1]]);
const S0 = {}, S1 = {}; SC.forEach(s => { S0[s[0]] = s[1]; S1[s[0]] = Math.min(s[2], DUR); });
const LS = k => VO[k], LE = k => VO[k] + VD[k], LF = (k, f) => VO[k] + VD[k] * f;
const EV = { h2: LS('h2'), hookEnd: Math.min(4.5, LE('h1') - 0.1), portal: LS('x1') + 0.4 };
const SHAKES = [];
const YEARS = { hook: 2026, byzant: -660, konst: 330, sofia: 537, fall: 1453, sultan: 1840, post: 1930, today: 2026 };
const KEYW = ['время!', 'город:', 'отмотаем!'];
const DIR = {}, WORLD = {}, TRANS_IN = {};
/* WT('c2', 'московский') — время начала субтитра-фрагмента со словом (без ударений, без учёта регистра и знаков); для синхронизации действий со словами */
const WT = (k, w) => { const n = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, ''); const c = CAPS.find(c => c.key === k && c.words.some(x => n(x) === n(w))) || CAPS.find(c => c.key === k && c.words.some(x => n(x).startsWith(n(w)))); return c ? c.t0 : LS(k); };
