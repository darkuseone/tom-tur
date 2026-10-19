/* Выпуск 004 — Алматы. Сцены (эпохи), годы и подписи, реестры для миров. Загружается после engine/core.js, до tom.js и миров.
   Все времена — от реплик (VO/VD из data.js). Каждый мир-файл w_*.js регистрирует свою сцену:
     DIR[name] = { outfit, light, grade, act(), pose(t,u,base), cam(), hud?(t) }   — режиссура сцены (см. direct.js)
     WORLD[name] = (t, u, cat) => {...}                                               — рисование мира, cat() рисует Тома
     TRANS_IN[name] = { a, b, fx(k, t, A, B), holdA?, runA? }                        — переход В эту сцену (A — прошлая, B — эта)
     EV.*, SHAKES.push(...), KEYW.push(...)                                          — события, тряски, ключевые слова субтитров */
const SUBTITLE = 'Алматы сквозь время';
const SAT = 1.1;                                          // насыщенность итогового кадра (владелец 18.10.2026: на ~10 % цветастее)
const HOOK_LINES = ['ЯБЛОКО —', 'ОТСЮДА?!'];   // текст-хук первых ~2.4 с
const YR = { hook: ['2026', 'АЛМАТЫ'], tunnel: ['', ''], bears: ['ДО ЛЮДЕЙ', 'ДИКИЙ ЯБЛОНЕВЫЙ ЛЕС'], saka: ['IV В. ДО Н. Э.', 'ЗОЛОТОЙ ЧЕЛОВЕК'],
  silk: ['XIII ВЕК', 'ШЁЛКОВЫЙ ПУТЬ'], aport: ['1865', 'УКРЕПЛЕНИЕ ВЕРНОЕ'], cathedral: ['1911', 'ВОЗНЕСЕНСКИЙ СОБОР'], vavilov: ['1929', 'ЭКСПЕДИЦИЯ ВАВИЛОВА'],
  kino: ['1943', 'КИНОСТУДИЯ ЦОКС'], blast: ['1966', 'ВЗРЫВ В УЩЕЛЬЕ МЕДЕУ'], metro: ['2011', 'МЕТРО АЛМАТЫ'], names: ['XIII → XXI', 'ТРИ ИМЕНИ ГОРОДА'], today: ['2026', 'АЛМАТЫ'], button: ['', ''] };
const SC = SCN.map(([n, a, b]) => [n, a, b, YR[n][0], YR[n][1]]);
const S0 = {}, S1 = {}; SC.forEach(s => { S0[s[0]] = s[1]; S1[s[0]] = Math.min(s[2], DUR); });
const LS = k => VO[k], LE = k => VO[k] + VD[k], LF = (k, f) => VO[k] + VD[k] * f;
const EV = { h2: LS('h2'), hookEnd: Math.min(2.4, LE('h1') - 0.15), portal: LS('x1') + 0.4 };
const SHAKES = [];
const YEARS = { hook: 2026, bears: -1e5, saka: -350, silk: 1270, aport: 1865, cathedral: 1911, vavilov: 1929, kino: 1943, blast: 1966, metro: 2011, names: 2000, today: 2026 };
const KEYW = ['время!', 'город', 'отмотаем!'];
const DIR = {}, WORLD = {}, TRANS_IN = {};
/* WT('c2', 'московский') — время начала субтитра-фрагмента со словом (без ударений, без учёта регистра и знаков); для синхронизации действий со словами */
const WT = (k, w) => { const n = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, ''); const c = CAPS.find(c => c.key === k && c.words.some(x => n(x) === n(w))) || CAPS.find(c => c.key === k && c.words.some(x => n(x).startsWith(n(w)))); return c ? c.t0 : LS(k); };
