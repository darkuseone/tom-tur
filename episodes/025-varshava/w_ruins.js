/* 025 — сцена `ruins`: январь 1945, бывший Рынок Старого города. Серое небо, снег пополам с пеплом. Остовы камениц с пустыми окнами,
   горы кирпича, торчащие балки, обгоревшая колонна-фонарь. Люди возвращаются в город: женщина с коляской и узлами, старик с тележкой,
   мальчик с ведром, двое разбирают кирпичи, на стене — записки мелом («ŻYJEMY», адреса). Посередине — бочка-жаровня, у неё греют руки.
   Том в ватнике держит обгоревший свиток-чертёж. На «чертежей» он разворачивает свиток — тот осыпается пеплом из лап; на «не осталось»
   пепел уносит ветром; на «уничтожили» камера проваливается к руинам, со стены сыплется кирпич; на «восемьдесят пять» — карта центра
   заливается серым до 85 %. Главный свет — тёплый огонь жаровни (единственное тёплое пятно), всё остальное холодное и серое.
   Переход В сцену — кадр рассыпается пеплом (клетки темнеют, тлеют и уносятся вверх). */
(() => {
  EV.ru_draw = wtk('s3', 'чертежей');
  EV.ru_gone = wtk('s3', 'осталось:');
  EV.ru_dest = wtk('s3', 'уничтожили');
  EV.ru_85 = wtk('s3', 'восемьдесят');
  KEYW.push('чертежей', 'уничтожили', 'процентов.');
  SHAKES.push([EV.ru_dest, 0.4, 8]);
  const L = WA.ink, crumble = t => clamp((t - EV.ru_draw - 0.15) / 0.9), FX = 760, FY = 1470;
  function sky(t) { vgrad(-900, 1400, ['#4a4a52', '#6a6a70', '#8a8682', '#a89a8a'], 1); for (let i = 0; i < 4; i++) { const x = -200 + i * 420 + Math.sin(t * 0.2 + i) * 40; blob([[x - 200, 700], [x - 120, 420 - i * 30], [x, 300 - i * 40], [x + 140, 400], [x + 220, 700]], { wash: '#3a3838', washA: 0.35, line: false }); } ell(980, 420, 60, 60, { wash: '#e8dcc8', washA: 0.5, line: false }); }
  function far(t) {                                                  // дальние остовы и обрубок башни — силуэты в дымке
    for (let i = 0; i < 10; i++) { const r = rng(2611 + i), x = -560 + i * 210, h = 200 + r() * 280, pts = [[x, 1060]]; for (let k = 0; k <= 6; k++) pts.push([x + k * 32, 1060 - h * (0.4 + 0.6 * r())]); pts.push([x + 200, 1060]); sil(pts, '#5a5654', 1); for (let k = 0; k < 4; k++) rect(x + 30 + (k % 2) * 90, 1060 - h * 0.6 + Math.floor(k / 2) * 70, 26, 40, { wash: '#8a8682', washA: 1, line: false }); }
    sil([[600, 1060], [600, 700], [630, 640], [660, 700], [660, 1060]], '#4a4644', 1); depthFog('#9a948c', 0.1); }
  function row(t) {                                                  // остовы камениц: пустые окна, следы копоти, записки мелом
    const fall = t > EV.ru_dest ? (t - EV.ru_dest) : 0;
    kam(-340, 1320, 230, 560, { col: '#c8763a', floors: 5, cols: 3, seed: 2621, ruin: 0.55 }); kam(-110, 1320, 200, 470, { col: '#7a9a6a', floors: 4, cols: 2, seed: 2622, ruin: 0.75 });
    kam(140, 1320, 260, 600, { col: '#e8b878', floors: 5, cols: 3, seed: 2623, ruin: 0.35 }); kam(400, 1320, 230, 420, { col: '#a84a4a', floors: 4, cols: 3, seed: 2624, ruin: 0.85 });
    kam(650, 1320, 240, 560, { col: '#6a8aa8', floors: 5, cols: 3, seed: 2625, ruin: 0.5 }); kam(900, 1320, 230, 500, { col: '#d8c070', floors: 4, cols: 3, seed: 2626, ruin: 0.65 }); kam(1140, 1320, 240, 580, { col: '#b86a4a', floors: 5, cols: 3, seed: 2627, ruin: 0.45 });
    for (const [x, y, s] of [[130, 1180, 'ŻYJEMY!'], [140, 1222, 'Kowalscy → Praga 12'], [660, 1200, 'Szukam Ani'], [-330, 1210, 'Mama, jesteśmy u cioci']]) txt(s, x, y, s.length > 9 ? 22 : 34, { col: '#f4f0e8', font: 'Hand', a: 0.9, rot: -0.03 });
    if (fall > 0 && fall < 1.4) { const r = rng(2628); for (let i = 0; i < 12; i++) { const x = 380 + r() * 120, y = 900 + r() * 60 + fall * fall * 700 + r() * 40; if (y < 1320) rect(x, y, 22, 10, { wash: WA.brick, washA: 1, w: 1, col: L }); } puffK(440, 1300, 2.2, t, EV.ru_dest + 0.5, 0.8, 2629, '#a8a098'); }
    moodDark(540, 900, 500, 1300, '#1a1a22', 0.25); }
  function square(t) {                                               // груды кирпича, люди возвращаются, жаровня
    rect(-1400, 1310, 3900, 1600, { wash: '#6a6260', washA: 1, line: false });
    ctx.save(); const r0 = rng(2630); for (let i = 0; i < 260; i++) { ctx.fillStyle = r0() < 0.5 ? '#e8e6e2' : '#8a8480'; ctx.globalAlpha = 0.6; ctx.fillRect(-900 + r0() * 2900, 1320 + r0() * 900, 6 + r0() * 10, 3 + r0() * 4); } ctx.restore();
    rubble(-600, -180, 1420, 160, 2631, { n: 36 }); rubble(860, 1400, 1420, 190, 2632, { n: 40, beams: 3 }); rubble(160, 560, 1380, 80, 2633, { n: 16, beams: 1 });
    const P = (x, y, s, sd, c, ex = {}) => human(x, y, s, t, Object.assign({ body: c, legs: '#2a2a2e', seed: sd }, ex));
    const wk = (t - S0.ruins) * 40;
    P(-60 + wk, 1420, 0.6, 2634, '#5a4a4a', { hat: 'scarf', hatCol: '#6a5a5a', armR: 'hold', look: [0.3, -0.2] }); push(30 + wk, 1420, 0.6); rect(-50, -110, 100, 70, { wash: '#2a2a2e', washA: 1, w: 1.8, col: L }); for (const k of [-36, 36]) ell(k, -20, 22, 22, { line: true, w: 4, col: '#2a2a2e' }); blob([[-40, -110], [-30, -160], [20, -170], [44, -120]], { wash: '#8a7a6a', washA: 1, w: 1.6, col: L }); pop();
    P(980, 1420, 0.62, 2635, '#4a4a3a', { flip: -1, beard: 1, hat: 'fur', hatCol: '#3a3a3a', armR: 'hold' }); push(880, 1420, 0.6); rect(-60, -70, 120, 40, { wash: '#6a4a2a', washA: 1, w: 1.6, col: L }); ell(-40, -20, 20, 20, { line: true, w: 4, col: '#3a2a1a' }); ell(40, -20, 20, 20, { line: true, w: 4, col: '#3a2a1a' }); for (let i = 0; i < 4; i++) rect(-50 + i * 26, -94, 24, 24, { wash: ['#8a7a6a', '#5a4a4a', WA.brick, '#6a6a5a'][i], washA: 1, w: 1, col: L }); pop();
    P(1180, 1420, 0.5, 2636, '#5a6a7a', { flip: -1, armR: 'hold', hat: 'cap', hatCol: '#3a3a3a' }); rect(1150, 1350, 30, 34, { wash: '#7a7a80', washA: 1, w: 1.4, col: L });
    P(260, 1384, 0.55, 2637, '#5a4a3a', { armR: 'up', armL: 'up', hat: 'scarf', hatCol: '#7a3a3a' }); rect(240, 1220, 30, 14, { wash: WA.brick, washA: 1, w: 1, col: L }); P(370, 1390, 0.55, 2638, '#4a4a4a', { armR: 'hold', flip: -1 });
    P(560, 1400, 0.58, 2639, '#3a3a40', { armR: 'hold', armL: 'hold', look: [0.2, 0.3] }); P(670, 1400, 0.56, 2640, '#5a4a40', { flip: -1, armR: 'hold', armL: 'hold', hat: 'scarf', hatCol: '#5a5a6a' });
    push(615, 1420, 0.8); rect(-36, -100, 72, 100, { wash: '#3a3430', washA: 1, w: 2, col: L }); for (const y of [-80, -30]) pencil([[-36, y], [36, y]], { w: 3, col: '#1a1614', pass2: false });
    for (let i = 0; i < 5; i++) { const h = 40 + Math.sin(t * 13 + i * 2) * 14; blob([[-26 + i * 12, -100], [-20 + i * 12, -100 - h], [-14 + i * 12, -100]], { wash: i % 2 ? '#ffb040' : '#ff6a2a', washA: 1, line: false }); } pop();
    glow(615, 1320, 160, 'rgba(255,150,70,1)', 0.35 * flick(t, 3)); lightPool(615, 1420, 260, 50, 'rgba(255,150,70,1)', 0.45);
    motes(12, [570, 1100, 660, 1330], '#ffb050', t, 2641, { sp: -60, sz: 3, a: 0.8, wob: 10, add: 1 }); }
  function plane(t) {                                                // Том, свиток-чертёж осыпается пеплом, табличка, ведро, кирпичи
    rect(-1400, 1560, 3900, 1400, { wash: '#5a5452', washA: 0, line: false });
    castShadow(370, 1650, 170, 300, -0.4, 0.35); lightPool(500, 1690, 360, 80, 'rgba(255,170,90,1)', 0.18);
    push(FX, FY, 1, 0.12); rect(-6, -10, 12, 180, { wash: '#4a3420', washA: 1, w: 1.6, col: L }); rect(-90, -80, 180, 70, { wash: '#d8d0c0', washA: 1, w: 2, col: L }); txt('UWAGA! GRUZ', 0, -38, 26, { col: '#a8231c', font: 'Osw' }); pop();
    for (let i = 0; i < 6; i++) { const r = rng(2642 + i); push(560 + i * 50, 1680 + r() * 30, 1, r() * 3); rect(-20, -9, 40, 18, { wash: i % 2 ? WA.brick : WA.brickD, washA: 1, w: 1.4, col: L }); pop(); }
    push(980, 1700, 0.9); shape([[-30, -70], [30, -70], [24, 0], [-24, 0]], { wash: '#6a6e72', washA: 1, w: 1.8, col: L }); pencil(spline([[-30, -70], [0, -110], [30, -70]], false, 8), { w: 3, col: '#3a3a3a', pass2: false }); pop();
  }
  function hud(t) {                                                  // карта центра: серое заливает до 85 %
    if (t > EV.ru_85 - 0.2) { const q = popK(t, EV.ru_85 - 0.2, 0.3), p = Math.round(85 * sm(clamp((t - EV.ru_85 + 0.1) / 0.9))); push(760, 860, q, 0.03);
      rect(-170, -150, 340, 300, { wash: '#16120e', washA: 0.92, w: 3, col: WA.ashL }); const cells = []; const r = rng(2643); for (let j = 0; j < 6; j++) for (let i = 0; i < 8; i++) cells.push([i, j, r()]);
      cells.sort((a, b) => a[2] - b[2]).forEach(([i, j], n) => { const gone = n < cells.length * p / 100; rect(-140 + i * 35, -130 + j * 32, 31, 28, { wash: gone ? '#4a4a4c' : WA.brick, washA: 1, w: 1, col: '#0a0806' }); });
      pencil(spline([[-150, 80], [-60, 50], [20, 90], [150, 60]], false, 10), { w: 10, col: '#3a6a9a', a: 0.8, pass2: false }); txt(p + ' %', 0, 112, 48, { col: '#f0ece4', font: 'Osw' }); pop(); }
  }
  function front(t) { const r = rng(2644); const pts = [[-800, 2400], [-800, 1400]]; for (let i = 0; i <= 6; i++) pts.push([-760 + i * 50, 1400 - r() * 260]); pts.push([-460, 2400]); sil(pts, '#121012', 1);
    pencil([[1200, 2400], [1500, 900]], { w: 30, col: '#141010', pass2: false }); pencil([[1260, 2400], [1380, 1300]], { w: 14, col: '#141010', pass2: false }); }
  WORLD.ruins = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => far(t));
    lay(6, () => row(t));
    lay(3.2, () => square(t));
    lay(1, () => { plane(t); cat(); });
    lay(8, () => ashSky(t, 2645, 0.8));
    lay(1.6, () => motes(30, [-200, 300, 1300, 1800], '#e8e4e0', t, 2646, { sp: 70, sz: 4, a: 0.7, wob: 30 }));
    lay(0.62, () => front(t));
    lay(0.7, () => motes(8, [-200, 400, 1300, 1900], '#cfcac4', t, 2647, { sp: 110, sz: 9, a: 0.35, wob: 40 }));
  };
  DIR.ruins = {
    outfit: 'vatnik', light: { side: 1, rim: '#ffb070' }, grade: ['#3a3a4a', 0.2],
    act: () => [[S0.ruins, 'talk'], [EV.ru_draw, 'suspicious'], [EV.ru_gone, 'shock'], [EV.ru_dest, 'scared'], [EV.ru_85, 'annoyed']],
    pose: (t, u, b) => Object.assign(b, { x: 370, y: 1650, s: 1.0, look: t < EV.ru_draw ? [0.3, -0.4] : t < EV.ru_dest ? [0.8, 0.3] : [0.6, -0.6], hand: t > EV.ru_draw - 0.3 && t < EV.ru_dest ? [210, -330] : undefined, handF: t > EV.ru_draw - 0.3 && t < EV.ru_dest ? [120, -320] : undefined, chatter: t > EV.ru_dest ? 1 : 0, frost: 0.4 }),
    afterCat: (t, u, P) => { if (t > EV.ru_draw - 0.3 && t < EV.ru_dest + 1) { const c = crumble(t), x = P.x + 170 * P.s, y = P.y - 340 * P.s; if (c < 1) { ctx.save(); ctx.beginPath(); ctx.rect(x - 120, y - 80 + c * 160, 240, 200); ctx.clip(); rect(x - 110, y - 70, 220, 130, { wash: '#d8e0e8', washA: 1, w: 2, col: L }); for (let i = 0; i < 5; i++) pencil([[x - 90, y - 50 + i * 24], [x + 90, y - 50 + i * 24]], { w: 1.6, col: '#3a5a8a', a: 0.8, pass2: false }); rect(x - 60, y - 40, 70, 60, { line: true, w: 2, col: '#3a5a8a' }); ctx.restore(); pencil([[x - 110, y - 80 + c * 160], [x + 110, y - 76 + c * 160]], { w: 6, col: '#2a1a10', pass2: false }); glow(x, y - 80 + c * 160, 40, 'rgba(255,130,60,1)', 0.35 * (1 - c)); }
      motes(26, [x - 120, y - 80, x + 120, y + 120], '#5a5450', t, 2648, { sp: -120 - c * 200, vx: 160, sz: 5, a: 0.8 * Math.min(1, c * 3) * (1 - Math.max(0, c - 0.8) * 5), wob: 26 }); } },
    cam: () => [[S0.ruins, 520, 1000, 0.08], [EV.ru_draw, 560, 1060, 0.16], [EV.ru_dest, 540, 940, 0.02], [EV.ru_dest + 0.2, 500, 860, -0.06, 'x'], [EV.ru_85, 560, 940, 0.0], [S1.ruins, 560, 960, 0.04]],
    hud
  };
  TRANS_IN.ruins = { a: 0.25, b: 0.3, fx(k, t, A, B) {             // кадр рассыпается пеплом: клетки тлеют и уносятся вверх, под ними — руины
    drawBuf(B); const n = 8, m = 14, cw = W / n, ch = H / m, r = rng(2649);
    scr(() => { for (let j = 0; j < m; j++) for (let i = 0; i < n; i++) { const d = r() * 0.5 + (1 - j / m) * 0.3, e = clamp((k - d) / 0.25); if (e >= 1) continue; const x = i * cw, y = j * ch;
      ctx.save(); ctx.beginPath(); ctx.rect(x, y - e * 160, cw + 1, ch + 1); ctx.clip(); ctx.globalAlpha = 1 - e; drawBuf(A, 1, 540, 960, 1, null, 0, -e * 160); ctx.restore();
      if (e > 0) { ctx.save(); ctx.globalAlpha = 0.6 * (1 - e); ctx.fillStyle = e < 0.4 ? '#ff7a30' : '#3a3434'; ctx.fillRect(x, y - e * 160 + ch - 4, cw, 4); ctx.restore(); } } });
  } };
})();
