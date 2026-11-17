/* 030 — сцена `rock`: ≈560 млн лет назад (эдиакарий). На суше нет ни одного растения: голые скалы, трещины с лавой, багровое небо,
   далёкие вулканы. В тёплой лагуне — первые многоклеточные: «перья» чарнии и диски дикинсонии, строматолиты. Том в скафандре (astro)
   входит шагом. На «выросла» земля трясётся, из раскалённой трещины поднимается гнейсовый купол — будущая Сахарная Голова;
   плашка «560 МЛН ЛЕТ · ГНЕЙС · 396 М». На «опоздал» рядом выскакивает табличка «РИО — ПОЗЖЕ», Том косится.
   Переход В: мяч разбивает кадр — осколки старой картинки осыпаются. Главный свет — лава/багровый закат, второй — бирюза лагуны. */
(() => {
  EV.rk_old = wtk('s1', 'полумиллиарда');
  EV.rk_grow = wtk('s1', 'выросла');
  EV.rk_name = wtk('s1', 'Сахарная');
  EV.rk_late = wtk('s1', 'опоздал.');
  KEYW.push('полумиллиарда', 'Голова.', 'опоздал.');
  SHAKES.push([EV.rk_grow, 0.5, 7]);
  const L = RJ.ink, DX = 760, rise = t => sm(clamp((t - EV.rk_grow) / 1.4));
  function sky(t) { vgrad(-900, 1050, ['#2a0e1e', '#6a1e2a', '#c84a2a', '#f8a050'], 1); glow(260, 760, 140, 'rgba(255,190,120,1)', 0.35); ell(260, 780, 54, 54, { wash: '#ffe0a0', washA: 1, line: false });
    for (let i = 0; i < 6; i++) { const ph = (t * 0.08 + i / 6) % 1; ell(100 + i * 200, 600 - ph * 300, 120 + ph * 80, 40 + ph * 20, { wash: '#4a1a24', washA: 0.4 * (1 - ph), line: false }); } }
  function volcanoes(t) { blob([[-500, 1000], [-300, 820], [-160, 700], [-60, 740], [100, 880], [300, 800], [420, 640], [520, 660], [700, 860], [900, 780], [1100, 900], [1700, 1000]], { wash: '#3a1e24', washA: 1, w: 2, col: L, a: 0.7 });
    for (const [x, y] of [[-160, 700], [420, 640]]) { glow(x, y, 80, 'rgba(255,120,40,1)', 0.45); for (let q = 0; q < 5; q++) { const ph = (t * 0.4 + q / 5) % 1; ell(x + ph * 60, y - 40 - ph * 260, 40 + ph * 60, 30 + ph * 40, { wash: '#2a1418', washA: 0.6 * (1 - ph), line: false }); } }
    depthFog('#c86a4a', 0.06); }
  function dome(t) {                                                 // гнейсовый купол растёт из раскалённой трещины
    const r = rise(t); blob([[-500, 1150], [200, 1100], [600, 1120], [1100, 1100], [1700, 1150], [1700, 1300], [-500, 1300]], { wash: '#4a3430', washA: 1, w: 2, col: L, shade: { gap: 9, a: 0.25, col: '#1e1210', ang: 0.3 } });
    push(DX, 1140, 0.55 + 0.45 * r); const h = 80 + 520 * r;
    blob([[-210, 0], [-185, -h * 0.55], [-140, -h * 0.88], [-60, -h], [40, -h * 0.99], [120, -h * 0.86], [170, -h * 0.5], [200, 0]], { wash: lerpC('#ff7a2a', RJ.rock, r), washA: 1, w: 2.6, col: L, shade: { gap: 6, a: 0.3, col: RJ.rockD, ang: 1.3 } });
    for (let k = 0; k < 6; k++) pencil([[-150 + k * 60, -20], [-100 + k * 40, -h * (0.5 + (k % 3) * 0.12)]], { w: 2.4, col: r < 0.6 ? '#ffd080' : RJ.rockD, a: 0.6, pass2: false });
    if (r < 0.9) glow(0, -h * 0.4, 260, 'rgba(255,140,50,1)', 0.45 * (1 - r)); pop();
    for (let q = 0; q < 10; q++) { const x = DX - 300 + q * 60, k = (t * 0.6 + q * 0.13) % 1; if (t > EV.rk_grow) ell(x, 1120 - k * 300, 6, 6, { wash: '#ffa040', washA: 1 - k, line: false }); }
  }
  function lagoon(t) {                                               // лагуна с эдиакарской жизнью: чарния, дикинсония, строматолиты
    seaKR(1300, 1440, t, 6201, { cols: ['#3ab8c0', '#2a98a8', '#1a6a80'], n: 18 });
    for (let i = 0; i < 9; i++) { const x = -200 + i * 170, sw = Math.sin(t * 1.5 + i) * 8; push(x, 1440, 0.7 + (i % 3) * 0.15, sw * 0.004); pencil([[0, 0], [sw, -150]], { w: 4, col: '#c8a080', pass2: false });
      blob([[0, -40], [-26, -90], [-18, -150], [sw, -180], [18, -150], [26, -90]], { wash: '#e8b08a', washA: 0.9, w: 1.6, col: L }); for (let q = 0; q < 6; q++) pencil([[-18 + sw * 0.3, -60 - q * 18], [18 + sw * 0.3, -66 - q * 18]], { w: 1.4, col: '#8a5a3a', a: 0.7, pass2: false }); pop(); }
    for (let i = 0; i < 6; i++) { const x = -100 + i * 250; push(x, 1400, 1); ell(0, 0, 46, 28, { wash: '#d8a878', washA: 0.9, w: 1.6, col: L }); for (let q = -4; q <= 4; q++) pencil([[q * 9, -24], [q * 9, 24]], { w: 1.2, col: '#8a5a3a', a: 0.6, pass2: false }); pop(); }
  }
  function ground(t) {                                               // голые плиты, трещины с лавой, строматолиты, галька — ни травинки
    rect(-500, 1450, 2200, 900, { wash: '#5a4038', washA: 1, w: 2, col: L }); const r = rng(6210); for (let i = 0; i < 40; i++) { const x = r() * 2000 - 400, y = 1470 + r() * 450; poly([[x, y], [x + 60 + r() * 60, y - 10], [x + 80, y + 30], [x + 10, y + 34]], { wash: i % 2 ? '#6a4c40' : '#4a342c', washA: 1, w: 1.4, col: L }); }
    for (const P of [[[200, 1700], [300, 1650], [420, 1690], [560, 1640]], [[700, 1900], [820, 1820], [900, 1840], [1100, 1760]]]) { pencil(P, { w: 14, col: '#2a1410', pass2: false }); pencil(P, { w: 6, col: '#ff8a2a', pass2: false }); glow(P[2][0], P[2][1], 80, 'rgba(255,140,50,1)', 0.35); }
    for (let i = 0; i < 5; i++) { push(980 + i * 70, 1640 + (i % 2) * 30, 1); blob([[-34, 0], [-30, -40], [0, -56], [30, -40], [34, 0]], { wash: '#8a7a5a', washA: 1, w: 1.6, col: L }); for (let q = 1; q < 4; q++) pencil([[-28, -q * 12], [28, -q * 12]], { w: 1.2, col: '#5a4a3a', a: 0.6, pass2: false }); pop(); }
    lightPool(DX, 1600, 700, 160, 'rgba(255,150,70,1)', 0.35 + 0.2 * (1 - rise(t)));
    if (t > EV.rk_late - 0.05) { const k = sm(clamp((t - EV.rk_late + 0.05) / 0.3)); push(700, 1660 + (1 - k) * 300, 1, Math.sin(t * 6) * 0.03 * (1 - k)); pencil([[0, 0], [0, -300]], { w: 10, col: RJ.woodD, pass2: false });
      rect(-140, -400, 280, 110, { wash: '#f0e6cc', washA: 1, w: 2.4, col: L }); txt('РИО —', 0, -370, 36, { col: L, font: 'Osw' }); txt('ПОЗЖЕ', 0, -322, 40, { col: RJ.red, font: 'Osw' }); pop(); }
    castShadow(330, 1640, 120, 480, 0.6, 0.35); moodDark(DX, 1000, 900, 1900, '#120608', 0.4);
  }
  function spires(t) {                                               // средний план: скальные иглы, гейзеры, кристаллы, молнии в туче
    for (let i = 0; i < 7; i++) { const r = rng(6240 + i), x = -360 + i * 260 + r() * 60, h = 160 + r() * 200; poly([[x - 50, 1120], [x - 20, 1120 - h], [x + 10, 1120 - h * 0.85], [x + 50, 1120]], { wash: i % 2 ? '#5a3a34' : '#4a2e2a', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.25, col: '#1e1210', ang: 1.2 } }); }
    for (const x of [-120, 1140]) { pencil([[x, 1120], [x, 1100]], { w: 20, col: '#6a4a3a', pass2: false }); for (let q = 0; q < 6; q++) { const ph = (t * 0.7 + q / 6) % 1; ell(x + Math.sin(q + t) * 20, 1090 - ph * 300, 30 + ph * 50, 24 + ph * 30, { wash: '#e8d8d0', washA: 0.5 * (1 - ph), line: false }); } }
    for (let i = 0; i < 8; i++) { const r = rng(6250 + i), x = 860 + r() * 300, y = 1110 + r() * 20; poly([[x, y], [x + 10, y - 40 - r() * 30], [x + 20, y]], { wash: '#b8e0f0', washA: 0.9, w: 1.4, col: L }); }
    if (Math.sin(t * 2.3) > 0.94) { pencil([[900, 520], [860, 640], [900, 660], [840, 800]], { w: 5, col: '#fff6d0', pass2: false }); glow(870, 640, 140, 'rgba(255,240,200,1)', 0.4); }
  }
  function front(t) { for (const x of [-140, 1230]) sil([[x - 110, 2300], [x - 90, 1640], [x - 10, 1520], [x + 60, 1580], [x + 110, 2300]], '#1a0e0c', 1); }
  WORLD.rock = (t, u, cat) => {
    lay(40, () => sky(t)); lay(18, () => volcanoes(t)); lay(11, () => spires(t)); lay(7, () => dome(t)); lay(3, () => lagoon(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(1.6, () => motes(30, [-100, 600, 1200, 1500], '#ff9a50', t, 6220, { sp: -40, sz: 3, a: 0.6, wob: 30, add: 1 }));
  };
  DIR.rock = {
    outfit: 'astro', light: { side: 1, rim: '#ff9a60' }, grade: ['#3a1010', 0.1],
    act: () => [[S0.rock, 'awe'], [EV.rk_grow, 'shock'], [EV.rk_name, 'proud'], [EV.rk_late, 'sideeye']],
    pose: (t, u, b) => { const w1 = clamp(u / 1.3), x = lerp(-40, 330, sm(w1)), jump = t > EV.rk_grow && t < EV.rk_grow + 0.5;
      return Object.assign(b, { x: x - (t > EV.rk_grow ? 30 * sm(clamp((t - EV.rk_grow) / 0.4)) : 0), y: 1640 - (jump ? Math.sin((t - EV.rk_grow) / 0.5 * 3.14) * 60 : 0), s: 0.95, walk: w1 < 1 ? t * 8 : 0,
        look: t > EV.rk_late ? [0.9, 0.1] : [0.8, -0.6], hand: t > EV.rk_name && t < EV.rk_late ? [190, -420] : [150, -300], point: t > EV.rk_name && t < EV.rk_late }); },
    hud: t => infoPlate(560, 780, [['560 МЛН ЛЕТ', 60, RJ.goldL], ['ГНЕЙС · ВЫСОТА 396 М', 32]], t, EV.rk_name),
    cam: () => [[S0.rock, 540, 900, -0.12], [EV.rk_old, 560, 920, -0.08], [EV.rk_grow, 640, 900, -0.02], [EV.rk_grow + 0.6, 700, 820, 0.06, 'x'], [EV.rk_name + 0.6, 640, 900, 0.04], [EV.rk_late, 520, 1120, 0.12, 'x'], [S1.rock, 500, 1140, 0.15]]
  };
  TRANS_IN.rock = { a: 0.06, b: 0.42, fx(k, t, A, B) {              // мяч разбивает кадр: осколки старой картинки осыпаются
    const e = sm(k); drawBuf(B); const r = rng(6230), cx = 560, cy = 900, n = 14;
    scr(() => { for (let i = 0; i < n; i++) { const a0 = i / n * 6.283, a1 = (i + 1) / n * 6.283, R = 2400, P = [[cx, cy], [cx + Math.cos(a0) * R, cy + Math.sin(a0) * R], [cx + Math.cos(a1) * R, cy + Math.sin(a1) * R]], vx = Math.cos((a0 + a1) / 2) * 400 * e, vy = (Math.sin((a0 + a1) / 2) * 200 + 1600 * e * (0.6 + r() * 0.6)) * e;
      ctx.save(); ctx.translate(vx, vy); ctx.beginPath(); P.forEach(([x, y], j) => j ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.clip(); ctx.translate(cx, cy); ctx.rotate(e * (r() - 0.5) * 0.8); ctx.translate(-cx, -cy); ctx.drawImage(A, 0, 0); ctx.restore();
      pencil([[P[0][0] + vx, P[0][1] + vy], [P[1][0] + vx, P[1][1] + vy]], { w: 4, col: '#ffffff', a: 0.8 * (1 - e), pass2: false, gap: false }); } }); } };
})();
