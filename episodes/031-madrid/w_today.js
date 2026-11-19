/* 031 — сцена `today` (ответ на хук): 2026, снова Пуэрта-дель-Соль (window.HQ). Том на плите «КМ 0» разворачивает свиток «УКАЗ 1561» —
   он пустой, печать «НЕ НАЙДЕН»; на «почти в центре» (EV.answer) — КАРТА полуострова: шесть радиальных дорог из «КМ 0», пунктир
   к настоящему центру — Серро-де-лос-Анхелес (Хетафе), подпись «ЦЕНТР ≈ 13 КМ ЮЖНЕЕ»; на «без соперников» — Толедо «ЦЕРКОВЬ ✗»
   и Вальядолид «ЗНАТЬ ✗» перечёркиваются, Мадрид — «НИЧЕЙ → СТОЛИЦА». Переход В: облако пыли стройки → солнечная площадь. */
(() => {
  EV.td_why = wtk('t1', 'почему');
  EV.td_decree = wtk('t1', 'Указа');
  EV.answer = wtk('t1', 'почти') - 0.1;
  EV.td_rival = wtk('t1', 'соперников.') - 0.15;
  KEYW.push('Мадрид?', 'центре', 'соперников.');
  const L = MD.ink;
  function mapBeat(t) {
    const k = sm(clamp((t - EV.answer) / 0.3)); if (k <= 0) return; MAPON = t; scr(() => { ctx.save(); ctx.translate((1 - k) * 1200, 0);
      const P = GLOBE.map(600, 1000, 110, -3.9, 40.3, { landCol: { eurasia: '#d8c8a0', africa: '#e2cc98' } }); GLOBE.fill(IBERIA.map(P), '#ecd6a8'); pencil(IBERIA.concat([IBERIA[0]]).map(P), { w: 4, col: L, pass2: false, gap: false });
      const [mx, my] = P([MAD.lon, MAD.lat]); RADIAL.forEach(([n, lo, la]) => { const [x, y] = P([lo, la]); pencil([[mx, my], [x, y]], { w: 6, col: MD.red, a: 0.85, pass2: false, gap: false }); ell(x, y, 8, 8, { wash: MD.red, washA: 1, w: 1.4, col: L }); });
      push(mx, my, 0.8); poly([[0, -40], [12, -12], [42, -12], [18, 6], [26, 36], [0, 18], [-26, 36], [-18, 6], [-42, -12], [-12, -12]], { wash: MD.goldL, washA: 1, w: 2.4, col: L }); pop(); GLOBE.city(P, MAD.lon, MAD.lat + 0.25, 'МАДРИД · КМ 0', { size: 34, col: MD.red });
      const [gx, gy] = P(MAD.getafe); push(gx, gy + 50, 1); ell(0, 0, 14, 14, { wash: '#2ac86a', washA: 1, w: 2.4, col: L }); pop(); pencil([[mx, my], [gx, gy + 50]], { w: 5, col: '#2ac86a', pass2: false, gap: true });
      GLOBE.city(P, MAD.getafe[0] + 0.1, MAD.getafe[1] - 0.9, 'ЦЕНТР · ХЕТАФЕ ≈ 13 КМ', { size: 30, col: '#2ac86a', tcol: '#c8ffd8' });
      if (t > EV.td_rival) { const q = clamp((t - EV.td_rival) / 0.4); for (const [ll, name, dx] of [[MAD.toledo, 'ТОЛЕДО · ЦЕРКОВЬ', -1], [MAD.valla, 'ВАЛЬЯДОЛИД · ЗНАТЬ', -1]]) { const [x, y] = P(ll); GLOBE.city(P, ll[0], ll[1], name, { size: 28, left: true, col: '#5a5a5a' }); pencil([[x - 30, y - 30], [x - 30 + 60 * q, y - 30 + 60 * q]], { w: 8, col: MD.red, pass2: false }); pencil([[x + 30, y - 30], [x + 30 - 60 * q, y - 30 + 60 * q]], { w: 8, col: MD.red, pass2: false }); } }
      ctx.restore(); }); }
  function extras(t) {                                               // своё в ответе: фламенко, гитарист, тележка с чуррос, продавец шаров, туристы с картой, тень и свет
    push(880, 1300, 0.7); const sw = Math.sin(t * 6); human(0, 0, 1, t, { body: '#c8181a', long: 1, hat: 'bun', hair: '#1a1008', legs: '#c8181a', armR: 'up', armL: 'up', seed: 7990, face: 'grin' }); shape([[-80, -120], [80, -120], [110 + sw * 20, 0], [-110 + sw * 20, 0]], { wash: '#e8281e', washA: 1, w: 2, col: L, shade: { gap: 8, a: 0.2, col: '#6a0a08', ang: 1.4 } }); for (let q = 0; q < 5; q++) pencil([[-100 + q * 50 + sw * 10, -10], [-90 + q * 50 + sw * 10, -60]], { w: 3, col: '#f8f0e0', a: 0.7, pass2: false }); pop();
    human(1010, 1300, 0.62, t, { body: '#1a1a1e', hat: 'brim', hatCol: '#1a1a1e', legs: '#1a1a1e', armR: 'swing', seed: 7991, face: 'grin', flip: -1 }); push(990, 1190, 0.6, 0.4); ell(0, 0, 40, 30, { wash: '#a86a2a', washA: 1, w: 1.6, col: L }); pencil([[-30, -10], [-120, -50]], { w: 6, col: '#5a3a1a', pass2: false }); pop();
    push(-120, 1330, 0.7); rect(-110, -150, 220, 120, { wash: '#f4f0e6', washA: 1, w: 2, col: L }); rect(-120, -190, 240, 40, { wash: MD.red, washA: 1, w: 2, col: L }); txt('CHURROS', 0, -170, 26, { col: '#fff6e0', font: 'Osw' }); for (const q of [-80, 80]) ell(q, -20, 30, 30, { line: true, w: 5, col: '#2a2a30' }); for (let q = 0; q < 5; q++) pencil([[-70 + q * 30, -110], [-60 + q * 30, -140]], { w: 8, col: '#c88a3a', pass2: false }); pop();
    push(120, 1300, 0.62); human(0, 0, 1, t, { body: '#3a8ac8', hat: 'cap', hatCol: '#2a2a30', legs: '#2a2a36', armR: 'up', seed: 7992, face: 'smile' }); for (let q = 0; q < 4; q++) { const bx = 60 + q * 30 + Math.sin(t * 2 + q) * 10, by = -520 - q * 30; pencil([[90, -320], [bx, by + 40]], { w: 1.4, col: '#2a2a30', pass2: false }); ell(bx, by, 26, 32, { wash: ['#e8281e', '#f8c830', '#2a8ae8', '#2ac86a'][q], washA: 1, w: 1.6, col: L }); } pop();
    for (const [x, c] of [[600, '#f0a040'], [700, '#7a4a8a']]) human(x, 1300, 0.6, t, { body: c, hat: 'straw', hatCol: '#e8d08a', legs: '#2a2a36', armR: 'hold', prop: 'scroll', seed: 7993 + x, face: 'smile' });
    lightPool(560, 1400, 900, 120, 'rgba(255,240,190,1)', 0.25); castShadow(880, 1300, 80, 240, -0.5, 0.3); castShadow(1010, 1300, 80, 240, -0.5, 0.3);
  }
  function cafe(t) {                                                 // уличное кафе справа: зонт, столики, кофе, официант с подносом, туристы за столом
    push(1180, 1760, 1); pencil([[0, 0], [0, -360]], { w: 8, col: '#3a3a40', pass2: false }); blob([[-240, -360], [-160, -440], [0, -470], [160, -440], [240, -360]], { wash: '#f8c830', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.2, col: '#a87a10', ang: 1.2 } }); for (let q = -3; q <= 3; q++) pencil([[q * 70, -360], [q * 30, -460]], { w: 2, col: '#c89a20', a: 0.8, pass2: false });
    ell(-90, -110, 90, 20, { wash: '#f4f0e6', washA: 1, w: 2, col: L }); pencil([[-90, -110], [-90, 0]], { w: 6, col: '#2a2a30', pass2: false }); for (let q = 0; q < 2; q++) { push(-120 + q * 50, -126, 1); rect(-12, -20, 24, 20, { wash: '#f4f0e6', washA: 1, w: 1.4, col: L }); ell(0, -20, 12, 4, { wash: '#6a3a1a', washA: 1, line: false }); pop(); }
    human(-200, 0, 0.62, t, { body: '#2a8ac8', hat: 'straw', hatCol: '#e8d08a', legs: '#2a2a36', armR: 'hold', prop: 'phone', seed: 7995, face: 'smile' }); pop();
    human(980, 1780, 0.66, t, { body: '#f4f0e6', trim: '#1a1a1e', legs: '#1a1a1e', armR: 'up', seed: 7996, face: 'smile', flip: -1 }); push(980 + 50, 1780 - 0.66 * 340, 0.66); ell(0, 0, 60, 12, { wash: '#c8c8d0', washA: 1, w: 1.4, col: L }); for (let q = 0; q < 3; q++) rect(-36 + q * 26, -30, 18, 26, { wash: '#f4f0e6', washA: 1, w: 1, col: L }); pop();
    push(-40, 1880, 1); rect(-90, -16, 180, 16, { wash: MD.wood, washA: 1, w: 1.6, col: L }); for (const k of [-70, 70]) pencil([[k, 0], [k, 40]], { w: 5, col: '#2a2a30', pass2: false }); pop();
    for (let q = 0; q < 5; q++) { const x = 360 + q * 44 + Math.sin(t * 2 + q) * 6; push(x, 1880 - (q % 2) * 20, 0.9); ell(0, -16, 22, 14, { wash: '#8a8e9a', washA: 1, w: 1.4, col: L }); ell(18, -28, 10, 9, { wash: '#7a7e8a', washA: 1, w: 1.2, col: L }); poly([[26, -28], [36, -26], [26, -24]], { wash: '#e8a83a', washA: 1, line: false }); pop(); }   // голуби клюют крошки чуррос
    lightPool(1100, 1780, 400, 100, 'rgba(255,230,160,1)', 0.25);
  }
  WORLD.today = (t, u, cat) => { const Q = window.HQ;
    lay(40, () => Q.sky(t)); lay(12, () => Q.far(t)); lay(3.2, () => Q.square(t)); lay(2.4, () => extras(t)); lay(1, () => { Q.ground(t); cafe(t); cat(); }); lay(0.6, () => Q.front(t));
    lay(2, () => motes(14, [-100, 700, 1200, 1500], '#fff8e0', t, 7960, { sp: 3, sz: 2.2, a: 0.4, wob: 16, add: 1 }));
    mapBeat(t);
  };
  DIR.today = {
    outfit: 'hoodieMAD', light: { side: 1, rim: '#fff0c0' }, grade: ['#3a2a1a', 0.05],
    act: () => [[S0.today, 'suspicious'], [EV.td_decree, 'sideeye'], [EV.answer, 'proud'], [EV.td_rival, 'smug']],
    pose: (t, u, b) => { const w1 = clamp(u / 0.8), x = lerp(150, 340, sm(w1)); return Object.assign(b, { x, y: 1650, s: 1.0, walk: w1 < 1 ? t * 9 : 0, look: [0.7, -0.6], hand: t > EV.td_decree - 0.1 ? [190, -380] : [150, -300] }); },
    afterCat: (t, u, P) => { if (t < EV.td_decree - 0.1) return; const x = P.x + 300 * P.s, y = P.y - 470 * P.s, k = popK(t, EV.td_decree - 0.1, 0.3); push(x, y, k * P.s * 0.85, -0.04); rect(-200, -140, 400, 260, { wash: '#f0e2c0', washA: 1, w: 3, col: L }); ell(-200, -10, 18, 130, { wash: '#d8c8a0', washA: 1, w: 2, col: L }); ell(200, -10, 18, 130, { wash: '#d8c8a0', washA: 1, w: 2, col: L });
      txt('УКАЗ · 1561', 0, -100, 36, { col: L, font: 'Osw' }); for (let q = 0; q < 4; q++) pencil([[-150, -40 + q * 30], [150, -40 + q * 30]], { w: 1.4, col: '#c8b890', pass2: false }); stampM(20, 20, 0.8, 'НЕ НАЙДЕН', MD.red, -0.14, popK(t, EV.td_decree + 0.4, 0.25), { size: 60 }); pop(); },
    cam: () => [[S0.today, 600, 940, -0.08], [EV.td_why, 540, 1000, 0.0], [EV.td_decree, 460, 1060, 0.1, 'x'], [S1.today, 460, 1060, 0.1]]
  };
  TRANS_IN.today = { a: 0.08, b: 0.38, fx(k, t, A, B) {             // пыль стройки рассеивается в солнечную площадь
    const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI), r = rng(7970); for (let i = 0; i < 26; i++) ell(r() * W, r() * H, 200 + r() * 240, 150 + r() * 200, { wash: i % 2 ? '#fff4d8' : '#e8dcc0', washA: 0.95 * a, line: false }); }); } };
})();
