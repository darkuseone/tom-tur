/* 004 — сцена `sea`: ≈12 млн лет назад, тёплое мелкое Сарматское море над будущим Кишинёвым. Дно — сплошные ракушки (сердцевидки, мактры,
   церитии), мшанковые рифы, водоросли, косяк рыб, вдали проплывает цетотерий (маленький усатый кит сармата). Том-водолаз шагает по дну.
   «ракушек» — Том поднимает сердцевидку; «построят Кишинёв» — ракушечный пласт светится и из него «вырастает» призрак арки и домов (камень города).
   Переход В сцену: спираль раковины раскручивается и открывает море. */
(() => {
  EV.sea_shell = WT('s1', 'ракушек');            // Том поднимает ракушку
  EV.sea_city = WT('s1', 'построят');            // призрак города из ракушечника
  EV.sea_whale = LF('s1', 0.12);                 // кит проплывает вдали
  KEYW.push('море.', 'ракушек', 'Кишинёв.');

  const fade = (t, a, b) => clamp((t - a) / (b - a));
  function water(t) {                             // толща воды: градиент, каустика, лучи
    vgrad(-900, 2200, ['#7ad8d0', '#2a9aa8', '#16707e', '#0c4652']);
    rays(620, -300, Math.PI / 2 + 0.12, 0.9, 2000, 'rgba(220,255,240,0.7)', 0.32, 9, t);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = 'rgba(200,255,240,0.18)'; ctx.lineWidth = 3;
    for (let k = 0; k < 16; k++) { ctx.beginPath(); for (let x = -400; x <= 1500; x += 40) { const y = 120 + k * 46 + Math.sin(x * 0.012 + t * 1.6 + k) * 16 + Math.sin(x * 0.031 - t * 2.2) * 8; x === -400 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); } ctx.restore();
    pencil(spline([[-400, -40], [200, -60], [700, -30], [1500, -60]], false, 10), { w: 6, col: '#e8fff8', a: 0.6, pass2: false });   // поверхность снизу
  }
  function whale(t) {                             // цетотерий: силуэт кита-полосатика вдали
    const k = fade(t, S0.sea - 0.2, S1.sea + 0.5), x = lerp(1400, -500, k), y = 520 + Math.sin(t * 0.8) * 20;
    push(x, y, 0.9, -0.03 + Math.sin(t * 1.2) * 0.02, -1);
    const P = [[-260, 0], [-200, -40], [-60, -60], [120, -46], [230, -18], [300, -10], [360, -40], [390, -60], [380, 0], [390, 56], [358, 34], [296, 12], [200, 30], [60, 50], [-120, 44], [-230, 24]];
    const b = blob(P, { wash: '#2e6a76', washA: 0.85, w: 2, col: '#163a42', a: 0.6 });
    ctx.save(); ctx.clip(b.path); vgrad(y - 60, y + 60, ['#3a7a86', '#5aa0a8']); ctx.restore();
    pencil(spline([[-230, 18], [-60, 30], [160, 20]], false, 6), { w: 2, col: '#a8d8d8', a: 0.5, pass2: false });
    ell(-190, -12, 5, 4, { wash: '#0a2a30', washA: 1, line: false }); blob([[-60, 40], [-30, 90], [10, 96], [0, 50]], { wash: '#2e6a76', washA: 0.85, w: 1.6, col: '#163a42', a: 0.6 });
    pop();
  }
  function fishSchool(t, cx, cy, n, s, seed, dir) {
    for (let i = 0; i < n; i++) { const r = rng(seed + i), ph = t * 1.2 + r() * 6, x = cx + Math.cos(ph * 0.6 + i) * 140 * r() + ((t * 60 * dir) % 400), y = cy + Math.sin(ph) * 60 * r() + (r() - 0.5) * 120;
      push(x, y, s * (0.7 + r() * 0.5), Math.sin(ph * 3) * 0.08, dir); const b = blob([[-30, 0], [-10, -9], [14, -7], [26, 0], [14, 7], [-10, 9]], { wash: '#b8d8d8', washA: 1, w: 1.4, col: '#2a4a52' });
      poly([[-28, 0], [-44, -10], [-40, 0], [-44, 10]], { wash: '#8ab8b8', washA: 1, w: 1.2, col: '#2a4a52' }); ell(16, -2, 2.4, 2.4, { wash: '#0a1a20', washA: 1, line: false }); pencil([[-8, 0], [18, 0]], { w: 1, col: '#e8ffff', a: 0.6, pass2: false }); pop(); }
  }
  function cockle(x, y, s, rot, col = '#f2e2c4', seed = 1) {     // сердцевидка: рёбра веером
    push(x, y, s, rot); const P = [[0, 20], [-34, 6], [-40, -16], [-26, -34], [0, -42], [26, -34], [40, -16], [34, 6]];
    const b = blob(P, { wash: col, washA: 1, w: 2, col: '#5a4030' }); shadeG(b.path, 30, 0, -30, 0, '#a88a64', 0.4);
    for (let k = -4; k <= 4; k++) pencil([[0, 18], [k * 9, -38 + Math.abs(k) * 3]], { w: 1.4, col: '#8a6a4a', a: 0.7, pass2: false });
    ell(0, 18, 8, 5, { wash: '#d8c4a0', washA: 1, w: 1.4, col: '#5a4030' }); pop();
  }
  function mactra(x, y, s, rot, col = '#e8d8c0') {               // мактра: гладкая треугольная, концентрические полосы
    push(x, y, s, rot); const b = blob([[-40, 10], [-20, -20], [0, -30], [20, -20], [40, 10], [0, 16]], { wash: col, washA: 1, w: 1.8, col: '#5a4030' });
    for (let k = 1; k < 4; k++) pencil(spline([[-40 + k * 8, 10 - k * 2], [0, -30 + k * 9], [40 - k * 8, 10 - k * 2]], false, 6), { w: 1.2, col: '#a88a64', a: 0.6, pass2: false }); pop();
  }
  function cerith(x, y, s, rot) {                                 // церитий: башенка-спираль с бугорками
    push(x, y, s, rot); for (let k = 0; k < 6; k++) { const yy = -k * 14, w = 18 - k * 2.6; const b = blob([[-w, yy], [-w * 0.8, yy - 12], [w * 0.8, yy - 14], [w, yy]], { wash: k % 2 ? '#c8a888' : '#d8bc98', washA: 1, w: 1.4, col: '#4a3020' }); for (let q = -1; q <= 1; q++) ell(q * w * 0.5, yy - 6, 2, 2, { wash: '#6a4a30', washA: 1, line: false }); }
    ell(0, 6, 10, 6, { wash: '#4a3020', washA: 1, w: 1.2 }); pop();
  }
  function seaweed(x, y, h, t, seed, col = '#4a8a3a') {
    const r = rng(seed); for (let s = 0; s < 3; s++) { const P = []; for (let k = 0; k <= 10; k++) { const q = k / 10; P.push([x + s * 14 + Math.sin(t * 1.4 + q * 3 + seed + s) * 26 * q, y - q * h * (0.8 + 0.3 * r())]); }
      const L_ = P.map(([a, b], i) => [a - 7 * (1 - i / 10), b]), R_ = P.map(([a, b], i) => [a + 7 * (1 - i / 10), b]).reverse(); shape(L_.concat(R_), { wash: lerpC(col, '#1e4a2a', r() * 0.5), washA: 0.95, w: 1.6, col: '#143018' }); }
  }
  function reef(x, y, s, seed) {                                  // мшанковый риф-холмик
    push(x, y, s); const r = rng(seed); const P = [[-220, 0]]; for (let k = 0; k <= 12; k++) { const q = k / 12; P.push([-220 + q * 440, -Math.sin(q * Math.PI) * (120 + r() * 60) - r() * 20]); } P.push([220, 0]);
    const b = blob(P, { wash: '#c8b48a', washA: 1, w: 2.2, col: '#4a3a22' }); shadeG(b.path, 0, -180, 0, 0, '#7a6440', 0.5); hatch(b.path, b.bb, { gap: 5, a: 0.2, col: '#5a4428', ang: 0.6, key: seed, w: 1 });
    for (let i = 0; i < 40; i++) ell(-200 + r() * 400, -r() * 140, 3, 3, { wash: '#efe2c4', washA: 0.9, w: 0.8, col: '#6a5030' });
    for (let i = 0; i < 6; i++) { const bx = -160 + i * 64, by = -100 - r() * 60; for (let q = 0; q < 4; q++) pencil([[bx, by + 40], [bx + (q - 1.5) * 16, by - 10]], { w: 4, col: '#e8a890', pass2: false }); }
    pop();
  }
  function caustic(t) {                           // солнечная сеть-каустика на дне
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = 'rgba(230,255,220,0.16)'; ctx.lineWidth = 3;
    for (let k = 0; k < 9; k++) { ctx.beginPath(); for (let x = -300; x <= 1400; x += 30) { const y = 1400 + k * 60 + Math.sin(x * 0.02 + t * 2 + k * 1.3) * 18 + Math.sin(x * 0.007 - t) * 22; x === -300 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); } ctx.restore();
  }
  function seabed(t) {                            // дно: песок + сплошной ракушечный пласт
    const g = poly([[-600, 1380], [1700, 1360], [1700, 2400], [-600, 2400]], { wash: '#d8c49a', washA: 1, line: false }); vgrad(1360, 2000, ['#c8b48a', '#a8946a', '#8a7650']);
    const r = rng(9700);
    for (let i = 0; i < 90; i++) { const x = -300 + r() * 1700, y = 1380 + Math.pow(r(), 1.3) * 520, s = 0.35 + (y - 1380) / 520 * 0.7, kind = r();
      if (kind < 0.5) cockle(x, y, s, (r() - 0.5) * 1.4, r() < 0.5 ? '#f2e2c4' : '#e8cfa8', i); else if (kind < 0.8) mactra(x, y, s, (r() - 0.5) * 1.6, r() < 0.5 ? '#efe2cc' : '#dcc8a8'); else cerith(x, y, s, (r() - 0.5) * 2.4); }
    for (let i = 0; i < 9; i++) { const rr = rng(9710 + i); seaweed(-200 + i * 170 + rr() * 60, 1400 + rr() * 60, 260 + rr() * 200, t, 9710 + i, i % 2 ? '#4a8a3a' : '#6a9a40'); }
  }
  function shellGlow(t) {                         // «построят Кишинёв»: пласт светится, из него поднимается призрак арки и домов
    const k = sm(fade(t, EV.sea_city, EV.sea_city + 0.7)); if (k <= 0) return;
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(560, 1460, 600 * k, 'rgba(255,220,150,1)', 0.35 * k); ctx.restore();
    ctx.save(); ctx.globalAlpha = 0.75 * k; const rise = (1 - k) * 160;
    push(860, 1410 + rise, 0.5); kArch(0, 0, 1, t, { build: k }); pop();
    for (const [x, w, h, sd] of [[160, 220, 130, 1], [-60, 200, 120, 3]]) bHouse(x, 1420 + rise, w, h, { seed: sd, roof: 'tile', chim: false });
    ctx.restore();
    // штрихи-«известняк»: ракушки складываются в блоки
    for (let i = 0; i < 18; i++) { const r = rng(9720 + i), q = clamp(k * 1.4 - r() * 0.4), x = lerp(200 + r() * 700, 300 + (i % 6) * 90, q), y = lerp(1600 + r() * 200, 1180 - Math.floor(i / 6) * 60, q);
      if (q < 1) cockle(x, y, 0.45, q * 3, '#fff0d0', i); else rect(x - 40, y - 26, 80, 52, { wash: '#f2e6cc', washA: 0.9 * k, w: 1.8, col: '#7a6040' }); }
    note('ракушечник — камень Кишинёва', 540, 1100 + rise * 0.5, t, EV.sea_city + 0.3, S1.sea + 0.3, '#fff4dc', 44, -0.03);
  }

  WORLD.sea = (t, u, cat) => {
    lay(40, () => water(t));
    lay(14, () => { whale(t); haze('#2a8a96', 0.25); fishSchool(t, 300, 820, 22, 0.8, 9730, 1); });
    lay(5, () => { reef(150, 1400, 0.9, 9741); reef(980, 1390, 1.1, 9742); haze('#2a8a96', 0.12); });
    lay(1, () => {
      seabed(t); caustic(t); shellGlow(t);
      cat();
      // пузыри от шлема водолаза
      for (let i = 0; i < 16; i++) { const r = rng(9750 + i), ph = (t * (0.5 + r() * 0.4) + r()) % 1; ell(620 + Math.sin(ph * 9 + i) * 26 + r() * 40, 980 - ph * 900, 6 + r() * 10, 6 + r() * 10, { wash: '#e8fff8', washA: 0.25, w: 1.6, col: '#e8fff8', a: 0.7 * (1 - ph) }); }
    });
    lay(0.6, () => { seaweed(-40, 2000, 700, t, 9760, '#2e6a2a'); seaweed(1060, 2000, 620, t, 9761, '#3a7a2e'); fishSchool(t, 900, 1300, 6, 1.6, 9770, -1);
      reef(-80, 2010, 1.3, 9781); reef(1180, 2030, 1.2, 9782); cockle(160, 1880, 2.4, -0.4, '#f2e2c4', 1); mactra(930, 1900, 2.2, 0.5); cerith(60, 1960, 2.6, 0.9); cockle(1010, 1990, 2.0, 0.3, '#e8cfa8', 2); });
    motes(70, [0, 0, W, H], '#e8fff8', t, 47, { sp: -16, sz: 2.6, a: 0.55, tw: 1, add: 1, wob: 30 });
  };

  DIR.sea = {
    outfit: 'diver', light: { side: 1, rim: '#bff8ff' }, grade: ['#0a5a6a', 0.22],
    act: () => [[S0.sea, 'awe'], [WT('s1', 'море.'), 'grin'], [EV.sea_shell, 'smug'], [EV.sea_city, 'proud']],
    pose: (t, u, b) => {
      const o = { x: lerp(420, 520, fade(t, S0.sea, EV.sea_shell)), y: GY - 10, s: 1.1, walk: t < EV.sea_shell - 0.1 ? t * 5 : undefined, look: [0.4, -0.4], rot: Math.sin(t * 1.5) * 0.02 };
      if (t > EV.sea_shell - 0.1 && t < EV.sea_city) { o.hand = [110, -300]; o.look = [0.5, -0.1]; o.prop = undefined; }
      if (t >= EV.sea_city) { o.look = [0.3, 0.3]; o.hand = [140, -200]; o.point = 1; }
      return Object.assign(b, o);
    },
    afterCat: (t, u, P) => { if (t < EV.sea_shell - 0.05 || t > EV.sea_city + 0.3) return; const h = P.hand || [110, -300]; const k = popK(t, EV.sea_shell, 0.3);
      push(P.x + h[0] * P.s, P.y + h[1] * P.s - 30, 0.9 + 0.2 * k); const b = blob([[0, 20], [-34, 6], [-40, -16], [-26, -34], [0, -42], [26, -34], [40, -16], [34, 6]], { wash: '#fff0d0', washA: 1, w: 2.2, col: '#5a4030' });
      for (let q = -4; q <= 4; q++) pencil([[0, 18], [q * 9, -38 + Math.abs(q) * 3]], { w: 1.4, col: '#8a6a4a', a: 0.7, pass2: false }); glow(0, -10, 80, 'rgba(255,240,200,1)', 0.4); pop(); },
    cam: () => [[S0.sea, 560, 560, 0.18], [S0.sea + 0.9, 540, 980, 0.16, 'x'], [EV.sea_shell, 560, 1080, 0.22], [EV.sea_city, 620, 1100, 0.08], [S1.sea, 640, 1100, 0.05]]
  };

  // ---------------------------------------------------------------- переход В сцену: спираль раковины раскручивается и открывает море
  function spiralPath(k, cx, cy) {
    const P = [], Q = [], turns = 3.2, a0 = 0.2, n = 120;
    for (let i = 0; i <= n; i++) { const q = i / n, ang = q * turns * 6.283 + k * 4, r1 = a0 * Math.exp(q * 2.6) * 220 * (0.2 + k * 2.2), r2 = r1 * lerp(0.2, 1.9, k);
      P.push([cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1]); Q.push([cx + Math.cos(ang) * (r1 + r2 * 0.6), cy + Math.sin(ang) * (r1 + r2 * 0.6)]); }
    return { path: pathOf(P.concat(Q.reverse())), P };
  }
  TRANS_IN.sea = { a: 0.22, b: 0.5, runA: 1, fx(k, t, A, B) {
    drawBuf(A, 1 + k * 0.3, 540, 960, 1, null, 0, 0, -k * 1.2);
    const q = sm(k), sp = spiralPath(q, 540, 960);
    if (q > 0.85) drawBuf(B, 1.06 - 0.06 * q); else inPath(sp.path, () => drawBuf(B, 1.15 - 0.15 * q));
    scr(() => { if (q < 0.9) { pencil(sp.P, { w: 10, col: '#f2e2c4', a: 0.9 * (1 - q), pass2: false, gap: false }); pencil(sp.P, { w: 3, col: '#7a5a3a', a: 0.8 * (1 - q), pass2: false, gap: false }); }
      for (let i = 0; i < 30; i++) { const r = rng(i * 7 + 11), y = H - (q * 1.6 + r()) % 1 * H * 1.2; ell(r() * W, y, 8 + r() * 16, 8 + r() * 16, { wash: '#e8fff8', washA: 0.25, w: 2, col: '#e8fff8', a: 0.8 * q * (1 - q) * 3 }); } });
  } };
})();
