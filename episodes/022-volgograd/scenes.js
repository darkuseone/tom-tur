/* Выпуск 022 — Волгоград. Сцены (эпохи), годы и подписи, реестры для миров. Загружается после engine/core.js, до tom.js и миров.
   Все времена — от реплик (VO/VD из data.js). Каждый мир-файл w_*.js регистрирует свою сцену:
     DIR[name] = { outfit, light, grade, act(), pose(t,u,base), cam(), hud?(t) }   — режиссура сцены (см. direct.js)
     WORLD[name] = (t, u, cat) => {...}                                               — рисование мира, cat() рисует Тома
     TRANS_IN[name] = { a, b, fx(k, t, A, B), holdA?, runA? }                        — переход В эту сцену (A — прошлая, B — эта)
     EV.*, SHAKES.push(...), KEYW.push(...)                                          — события, тряски, ключевые слова субтитров */
const SUBTITLE = 'Волгоград сквозь время';
const SAT = 1.1;
const PROGRESS = true;                                    // точки «эпоха n/N» вместо шкалы 450 млн лет (для короткой истории; для геологии — убрать)
const QUESTION = { q: 'ПОЧЕМУ ОНА — ЗДЕСЬ?', a: 'ПОД НЕЙ 34 505 ЗАЩИТНИКОВ', at: () => EV.answer };   // плашка открытой петли до ответа (core.js qchip)                                          // насыщенность итогового кадра (владелец 18.10.2026: на ~10 % цветастее)
const HOOK_LINES = ['СВОБОДА —', 'ЕЙ ПО ПЛЕЧО?!'];   // текст-хук первых ~2.4 с
const YR = { hook: ['2026', 'МАМАЕВ КУРГАН'], tunnel: ['', ''], horde: ['XIV век', 'ЗОЛОТАЯ ОРДА'], fort: ['1589', 'КРЕПОСТЬ ЦАРИЦЫН'], razin: ['1670', 'СТЕПАН РАЗИН'], sarepta: ['1810', 'САРЕПТА'], tractor: ['1930', 'СТАЛИНГРАД'], battle: ['1942', 'СТАЛИНГРАДСКАЯ БИТВА'], black: ['1943', 'ВЫСОТА 102,0'], answer: ['1967', 'РОДИНА-МАТЬ'], today: ['2026', 'ВОЛГОГРАД'], button: ['', ''] };
const SC = SCN.map(([n, a, b]) => [n, a, b, YR[n][0], YR[n][1]]);
const S0 = {}, S1 = {}; SC.forEach(s => { S0[s[0]] = s[1]; S1[s[0]] = Math.min(s[2], DUR); });
const LS = k => VO[k], LE = k => VO[k] + VD[k], LF = (k, f) => VO[k] + VD[k] * f;
const EV = { h2: LS('h2'), hookEnd: Math.min(4.5, LE('h1') - 0.1), portal: LS('x1') + 0.4 };
const SHAKES = [];
const YEARS = { hook: 2026, horde: 1370, fort: 1589, razin: 1670, sarepta: 1810, tractor: 1930, battle: 1942, black: 1943, answer: 1967, today: 2026 };
const KEYW = ['время!', 'город', 'отмотаем!'];
const DIR = {}, WORLD = {}, TRANS_IN = {};
/* WT('c2', 'московский') — время начала субтитра-фрагмента со словом (без ударений, без учёта регистра и знаков); для синхронизации действий со словами */
const WT = (k, w) => { const n = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, ''); const c = CAPS.find(c => c.key === k && c.words.some(x => n(x) === n(w))) || CAPS.find(c => c.key === k && c.words.some(x => n(x).startsWith(n(w)))); return c ? c.t0 : LS(k); };
