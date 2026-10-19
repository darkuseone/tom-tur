/* 004 — сцена `dino`: миоцен, берег отступившего моря — лагуна, тростник, платаны и саванна будущей Бессарабии.
   По кромке воды шагает динотерий (родня слонов, скелет из Молдовы стоит в нацмузее Кишинёва): короткий хобот, бивни из НИЖНЕЙ челюсти загнуты вниз.
   Вдали — табун гиппарионов (трёхпалые лошади), аисты; в траве прячется махайрод. «динотерий» — Том в бинокль; «вниз!» — зверь опускает голову,
   бивни крупно, Том хохочет. Переход В сцену: «отлив» — вода сбегает вниз и открывает берег. */
(() => {
  EV.dn_binoc = WT('s2', 'динотерий');            // бинокль
  EV.dn_tusk = WT('s2', 'слон');                 // зверь поворачивает голову
  EV.dn_down = WT('s2', 'вниз!');                 // бивни вниз крупно
  EV.dn_step = [0.35, 0.95, 1.55, 2.15].map(f => S0.dino + f);
  KEYW.push('динотерий', 'вниз!');

  const fade = (t, a, b) => clamp((t - a) / (b - a));
  function sky(t) {
    vgrad(-900, 1400, ['#5aa0d8', '#9ac8e8', '#f4e2b0', '#f8d890']);
    glow(220, 300, 420, 'rgba(255,240,190,1)', 0.5);
    for (let k = 0; k < 5; k++) { const r = rng(9800 + k), cx = ((r() * 1800 + t * 12) % 1900) - 400, cy = 80 + r() * 380;
      for (let q = 0; q < 6; q++) ell(cx + q * 70 - 175, cy - Math.sin(q / 5 * Math.PI) * 40, 80, 44, { wash: '#fffaf0', washA: 0.85, line: false }); pencil(spline([[cx - 240, cy + 30], [cx, cy + 40], [cx + 240, cy + 30]], false, 6), { w: 2, col: '#b8c8d8', a: 0.5, pass2: false }); }
    for (let i = 0; i < 7; i++) { const r = rng(9810 + i), x = ((r() * 1400 + t * 90) % 1600) - 200, y = 300 + r() * 200, f = Math.sin(t * 8 + i) * 12;   // аисты
      pencil([[x - 30, y + f], [x, y], [x + 30, y + f]], { w: 3, col: '#2a2a2a', pass2: false }); pencil([[x, y], [x + 18, y + 4]], { w: 2, col: '#c84a2a', pass2: false }); }
  }
  function hills(t) {
    sil([[-600, 1120], [-200, 980], [200, 1060], [600, 940], [1000, 1040], [1700, 960], [1700, 1300], [-600, 1300]], '#9ab08a', 1);
    sil([[-600, 1180], [0, 1090], [500, 1150], [900, 1080], [1700, 1140], [1700, 1300], [-600, 1300]], '#86a070', 1);
    haze('#f4e0b0', 0.25);
  }
  function hipparion(x, y, s, t, ph, flip) {      // гиппарион: лёгкая лошадка, полосатые ноги
    push(x, y, s, 0, flip); const g = Math.sin(t * 9 + ph);
    for (const [lx, o] of [[-50, 0], [-36, 1], [44, 1], [58, 0]]) { const a = (o ? g : -g) * 0.35; push(lx, -70, 1, a); pencil([[0, 0], [0, 70]], { w: 7, col: '#6a4a2a', pass2: false }); pencil([[-3, 66], [3, 66]], { w: 6, col: '#2a1a10', pass2: false }); pop(); }
    const b = blob([[-70, -80], [-30, -110], [40, -108], [76, -84], [70, -56], [-60, -56]], { wash: '#b08a5a', washA: 1, w: 1.8, col: '#3a2410' }); shadeG(b.path, 0, -110, 0, -56, '#6a4a2a', 0.5);
    shape([[60, -96], [96, -150], [118, -142], [86, -84]], { wash: '#b08a5a', washA: 1, w: 1.6, col: '#3a2410' }); blob([[96, -150], [130, -146], [140, -128], [118, -124]], { wash: '#a8805a', washA: 1, w: 1.6, col: '#3a2410' });
    pencil([[92, -150], [64, -100]], { w: 5, col: '#3a2410', pass2: false }); pencil([[-70, -78], [-92, -40]], { w: 4, col: '#3a2410', pass2: false });
    pop();
  }
  function plane(x, y, h, t, seed) {              // платан: пятнистый ствол, широкая крона
    const r = rng(seed); push(x, y, 1); const sw = Math.sin(t * 0.9 + seed) * 6;
    const tr = shape(tubeP([[0, 0], [-10, -h * 0.4], [6, -h * 0.66]], 34, 18), { wash: '#c8b898', washA: 1, w: 2, col: '#3a3020' });
    for (let i = 0; i < 9; i++) ell((r() - 0.5) * 30, -r() * h * 0.6, 8, 5, { wash: '#8a9a7a', washA: 0.8, line: false });
    for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.36, d = h * (0.26 + r() * 0.1); const cx = Math.cos(a) * d * 1.3 + sw, cy = -h * 0.72 + Math.sin(a) * d * 0.8; const b = ell(cx, cy, h * 0.2, h * 0.15, { wash: lerpC('#6a9a40', '#2e5a22', r() * 0.6), washA: 1, w: 1.8, col: '#1e3014' }); shadeG(b.path, cx, cy - h * 0.15, cx, cy + h * 0.15, '#1e3a14', 0.55); hatch(b.path, b.bb, { gap: 7, a: 0.15, col: '#1e3014', ang: 1.1, key: seed * 3 + k, w: 1 });
      for (let q = 0; q < 7; q++) { const lx = cx + (r() - 0.5) * h * 0.3, ly = cy + (r() - 0.6) * h * 0.2; pencil([[lx - 8, ly], [lx, ly - 8], [lx + 8, ly]], { w: 2, col: '#a8c870', a: 0.6, pass2: false }); } }
    pop();
  }
  function reeds(x, y, w, t, seed, col = '#8aa04a') {
    const r = rng(seed); for (let i = 0; i < w / 10; i++) { const rx = x + i * 10 + r() * 6, h = 120 + r() * 140, sw = Math.sin(t * 1.8 + rx * 0.02) * 14;
      pencil([[rx, y], [rx + sw * 0.6, y - h * 0.6], [rx + sw, y - h]], { w: 3, col: lerpC(col, '#4a5a2a', r()), pass2: false }); if (i % 3 === 0) ell(rx + sw, y - h - 14, 6, 18, { wash: '#6a4a2a', washA: 1, w: 1.2, col: '#2a1a0a' }); }
  }
  function lagoon(t) {
    const p = poly([[-600, 1220], [1700, 1200], [1700, 1340], [-600, 1360]], { wash: '#5aa8c0', washA: 1, line: false });
    ctx.save(); ctx.clip(p.path); vgrad(1200, 1360, ['#8ad0e0', '#3a8aa8']); for (let k = 0; k < 10; k++) pencil([[-500 + k * 160 + Math.sin(t + k) * 30, 1240 + (k % 4) * 24], [-420 + k * 160 + Math.sin(t + k) * 30, 1240 + (k % 4) * 24]], { w: 3, col: '#e8fff8', a: 0.6, pass2: false }); ctx.restore();
  }
  function shore(t) {                             // песчаный берег, ракушки, кромка прибоя, трава
    poly([[-600, 1330], [1700, 1310], [1700, 2400], [-600, 2400]], { wash: '#e0cc98', washA: 1, line: false }); vgrad(1310, 2100, ['#e4d0a0', '#c8ac74', '#a88a54']);
    const fo = []; for (let x = -600; x <= 1700; x += 30) fo.push([x, 1336 + Math.sin(x * 0.02 + t * 2) * 8]); pencil(fo, { w: 6, col: '#fffaf0', a: 0.85, pass2: false });
    const r = rng(9830); for (let i = 0; i < 40; i++) { const x = -300 + r() * 1600, y = 1360 + Math.pow(r(), 1.4) * 500; ell(x, y, 8 + (y - 1360) / 40, 5 + (y - 1360) / 70, { wash: r() < 0.5 ? '#f2e6cc' : '#d8c4a0', washA: 1, w: 1.2, col: '#7a6040' }); }
    for (let i = 0; i < 26; i++) { const x = -300 + i * 70 + r() * 30, y = 1500 + r() * 360; for (let q = 0; q < 5; q++) pencil([[x + q * 6, y], [x + q * 6 + Math.sin(t * 2 + i) * 8 + (q - 2) * 6, y - 40 - r() * 40]], { w: 2.4, col: '#7a8a3a', pass2: false }); }
    // следы динотерия на песке
    for (let k = 0; k < 6; k++) ell(1100 - k * 120, 1420 + (k % 2) * 30, 34, 12, { wash: '#a88a5a', washA: 0.6, w: 1.4, col: '#6a5030', a: 0.5 });
  }
  // динотерий в профиль мордой влево: колонны ног, мощный корпус, короткий хобот, бивни нижней челюсти вниз-назад
  function deinotherium(x, y, s, t, head) {
    push(x, y, s);
    const gait = t * 3.2, legs = [[-150, 0], [-100, 1], [150, 1], [200, 0]], C = '#7a706a', CD = '#3a3230', LN = '#1e1a18';
    ell(20, 6, 320, 30, { wash: '#000', washA: 0.22, line: false });
    const leg = (lx, o, near) => { const a = Math.sin(gait + o * Math.PI) * 0.16, lift = Math.max(0, Math.sin(gait + o * Math.PI)) * 14; push(lx, -360, 1, a);
      const lg = shape([[-56, -20], [56, -20], [50, 150], [44, 340 - lift], [-46, 340 - lift], [-50, 150]], { wash: near ? '#867c76' : '#5e5652', washA: 1, w: 2.6, col: LN }); shadeG(lg.path, 56, 0, -56, 0, CD, 0.55);
      for (let q = 0; q < 5; q++) pencil([[-44, 60 + q * 50], [40, 64 + q * 50]], { w: 1.2, col: CD, a: 0.4, pass2: false });
      for (let q = 0; q < 4; q++) ell(-30 + q * 20, 334 - lift, 10, 7, { wash: '#e0d4c0', washA: 1, w: 1.2, col: LN }); pop(); };
    for (const [lx, o] of legs.filter((_, i) => i % 2)) leg(lx - 20, o, 0);
    const B = [[-250, -380], [-220, -540], [-120, -640], [10, -650], [150, -610], [270, -540], [320, -430], [300, -330], [200, -290], [40, -280], [-120, -300], [-220, -320]];
    const b = blob(B, { wash: C, washA: 1, w: 3, col: LN, key: 9840 }); shadeG(b.path, 0, -650, 0, -280, CD, 0.65); hatch(b.path, b.bb, { gap: 7, a: 0.16, col: '#2a2420', ang: 1.2, key: 9841, w: 1.3 });
    for (let k = 0; k < 10; k++) pencil(spline([[-200 + k * 52, -600 + Math.abs(k - 3) * 10], [-190 + k * 52, -460], [-200 + k * 52, -310]], false, 5), { w: 1.4, col: '#4a4240', a: 0.45, pass2: false });   // складки кожи
    pencil(spline([[-200, -560], [-60, -640], [120, -620], [260, -540]], false, 8), { w: 5, col: '#b8aca4', a: 0.5, pass2: false });   // свет на хребте
    for (const [lx, o] of legs.filter((_, i) => !(i % 2))) leg(lx, o, 1);
    pencil(spline([[310, -460], [356, -390], [344, -300]], false, 6), { w: 8, col: CD, pass2: false }); ell(344, -296, 10, 16, { wash: '#2a2420', washA: 1, line: false });   // хвост с кисточкой
    // голова: опускается и поворачивается к камере (head 0..1)
    push(-220, -470, 1.15, -0.1 - 0.4 * head);
    const H = blob([[20, 40], [-20, -110], [-120, -170], [-230, -150], [-290, -80], [-280, 10], [-230, 70], [-120, 90], [-20, 90]], { wash: C, washA: 1, w: 2.8, col: LN, key: 9842 }); shadeG(H.path, -140, -170, -140, 90, CD, 0.5);
    const ear = blob([[-100, -130], [-50, -200], [20, -170], [30, -60], [-30, -20], [-80, -60]], { wash: '#8a7e78', washA: 1, w: 2.4, col: LN }); shadeG(ear.path, 30, -100, -100, -100, CD, 0.4); pencil(spline([[-70, -120], [-20, -150], [0, -80]], false, 5), { w: 1.6, col: CD, a: 0.6, pass2: false });
    ell(-200, -70, 11, 8, { wash: '#1a1410', washA: 1, w: 1.4 }); ell(-203, -72, 3, 3, { wash: '#fff', washA: 0.9, line: false }); pencil([[-218, -86], [-184, -90]], { w: 2.4, col: LN, pass2: false });
    const tr = []; for (let q = 0; q <= 10; q++) { const a = q / 10; tr.push([-280 - a * 70 + Math.sin(t * 2 + a * 3) * 12 * a, -30 + a * 170]); }   // короткий хобот
    shape(tubeP(tr, 54, 26), { wash: C, washA: 1, w: 2.6, col: LN }); for (let q = 2; q < 10; q++) pencil([[tr[q][0] - 20 + q, tr[q][1]], [tr[q][0] + 20 - q, tr[q][1]]], { w: 1.4, col: CD, a: 0.6, pass2: false });
    blob([[-260, 60], [-200, 100], [-150, 90], [-180, 50]], { wash: '#6a6260', washA: 1, w: 2.2, col: LN });   // нижняя челюсть
    for (const dx of [0, 18]) { const T = [[-215 + dx, 90], [-224 + dx, 180], [-196 + dx, 270], [-140 + dx, 316]]; const tk = shape(tubeP(spline(T, false, 6), 28, 9), { wash: '#f4ead4', washA: 1, w: 2.6, col: '#3a2a1a' }); shadeG(tk.path, -180, 0, -230, 0, '#b8a888', 0.5); }
    pop();
    pop();
  }

  WORLD.dino = (t, u, cat) => {
    const head = sm(fade(t, EV.dn_tusk, EV.dn_tusk + 0.5)) * (1 - 0.3 * sm(fade(t, S1.dino - 0.4, S1.dino)));
    lay(40, () => sky(t));
    lay(16, () => { hills(t); for (let i = 0; i < 7; i++) hipparion(400 + i * 90 + Math.sin(i) * 40 - ((t * 60) % 200), 1150 + (i % 3) * 10, 0.45, t, i, -1); });
    lay(7, () => { lagoon(t); plane(80, 1250, 520, t, 9851); plane(1050, 1240, 600, t, 9852); reeds(-200, 1240, 420, t, 9853); reeds(700, 1230, 500, t, 9854, '#9ab04a'); haze('#f4e0b0', 0.1); });
    lay(2.4, () => { shore(t); const wx = lerp(1350, 960, fade(t, S0.dino - 0.3, EV.dn_tusk)); deinotherium(wx, 1420, 0.92, t, head);
      // махайрод прячется в траве
      push(1020, 1500, 0.55); const e = Math.sin(t * 2) > 0.9 ? 0 : 1; blob([[-90, 0], [-60, -60], [40, -70], [90, -30], [80, 0]], { wash: '#c8a058', washA: 1, w: 2, col: '#3a2410' }); for (const ex of [40, 62]) ell(ex, -48, 5, 4 * e, { wash: '#f0d040', washA: 1, w: 1.2, col: '#1a1008' }); pencil([[56, -20], [52, 6]], { w: 4, col: '#f6f0e0', pass2: false }); pop();
      for (let i = 0; i < 30; i++) { const r = rng(9860 + i), x = 900 + r() * 260; pencil([[x, 1470], [x + Math.sin(t * 2 + i) * 10, 1380 - r() * 60]], { w: 3, col: '#8a9a3a', pass2: false }); } });
    lay(1, () => { cat(); });
    lay(0.62, () => { reeds(-140, 2000, 300, t, 9871, '#6a8a3a'); reeds(900, 2000, 300, t, 9872, '#7a9a3a'); });
    motes(26, [0, 300, W, 1600], '#fff6d8', t, 53, { sp: 6, sz: 2.2, a: 0.5, tw: 1, add: 1 });
  };

  DIR.dino = {
    outfit: 'safari', light: { side: -1, rim: '#fff0c0' }, grade: ['#8a6a2a', 0.12],
    act: () => [[S0.dino, 'awe'], [EV.dn_binoc, 'suspicious'], [EV.dn_tusk, 'shock'], [EV.dn_down, 'laugh']],
    pose: (t, u, b) => {
      const o = { x: 330, y: GY + 60, s: 1.0, look: [0.8, -0.35], flip: false };
      if (t > EV.dn_binoc - 0.1 && t < EV.dn_tusk) { o.prop = 'binoc'; o.hand = [70, -330]; o.handF = [-40, -330]; }
      else if (t >= EV.dn_tusk && t < EV.dn_down) { o.hand = [150, -260]; o.point = 1; o.tailUp = true; }
      else if (t >= EV.dn_down) { o.hand = [60, -170]; o.handF = [-60, -170]; o.squash = 0.05 * Math.sin(t * 22); o.tilt = 0.08 * Math.sin(t * 11); }
      return Object.assign(b, o);
    },
    cam: () => [[S0.dino, 640, 1000, 0.0], [EV.dn_binoc, 640, 990, 0.04], [EV.dn_tusk, 600, 1080, 0.08], [EV.dn_down - 0.1, 620, 1160, 0.16, 'x'], [S1.dino, 600, 1120, 0.12]],
    hud: t => { if (t > EV.dn_down - 0.2 && t < S1.dino + 0.2) note('бивни растут из нижней челюсти!', 560, 1780, t, EV.dn_down - 0.2, S1.dino + 0.2, '#fff6dc', 46, -0.03); }
  };

  // ---------------------------------------------------------------- переход В сцену: «отлив» — море сбегает вниз, открывая берег
  TRANS_IN.dino = { a: 0.15, b: 0.5, runA: 1, fx(k, t, A, B) {
    drawBuf(B, 1.05 - 0.05 * k);
    const q = sm(k), L = lerp(-100, H + 200, Math.pow(q, 1.3)), P = [];
    for (let x = -20; x <= W + 20; x += 20) P.push([x, L + Math.sin(x * 0.012 + t * 8) * 40 + Math.sin(x * 0.033 - t * 5) * 18]);
    const p = pathOf([...P, [W + 20, H + 400], [-20, H + 400]]); inPath(p, () => drawBuf(A, 1 + q * 0.15, 540, 960, 1, null, 0, q * 200));
    scr(() => { pencil(P, { w: 16, col: '#fffaf0', a: 0.9, pass2: false, gap: false }); for (let i = 0; i < 40; i++) { const r = rng(i * 5 + 3), x = r() * W; ell(x, L - 10 - r() * 50, 6 + r() * 10, 5 + r() * 6, { wash: '#ffffff', washA: 0.8 * (1 - q), line: false }); } });
  } };
})();
