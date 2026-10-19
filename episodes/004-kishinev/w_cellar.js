/* 004 — сцена `cellar`: подземные галереи Криковы под Кишинёвом. Сначала (XV–XIX вв.) — штольня-каменоломня: фонари, каменотёсы пилят
   блоки котельца двуручной пилой, пыль, следы пил на стенах. «вино.» — «пуф»: Том из шахтёра в винодела, вспыхивают лампы, в нишах бочки,
   стеллажи бутылок, указатели «ул. КАБЕРНЕ», «ул. СОВИНЬОН»; «Сто двадцать километров» — камера летит по тоннелю, мимо проезжает
   экскурсионный электрокар; «улиц!» — таблички выскакивают. Переход В сцену: провал камеры сквозь брусчатку и пласты известняка (Spider-Verse). */
(() => {
  EV.cl_saw = WT('s9', 'пилили');                // пила
  EV.cl_wine = WT('s9', 'вино.') - 0.06;         // «пуф», свет, бочки
  EV.cl_km = WT('s9', 'Сто');                    // полёт по тоннелю
  EV.cl_street = WT('s9', 'улиц!');              // таблички
  KEYW.push('штольнях,', 'камень,', 'вино.', 'километров', 'улиц!');

  const fade = (t, a, b) => clamp((t - a) / (b - a));
  const VX = 560, VY = 900;                       // точка схода тоннеля
  function tunnel(t, lit) {                       // сводчатая галерея в перспективе: известняк, следы пил, рёбра свода
    vgrad(-200, 2200, [lerpC('#2a2016', '#5a4632', lit), lerpC('#4a3a28', '#c8a878', lit), lerpC('#2a2016', '#6a5236', lit)]);
    for (let k = 9; k >= 0; k--) {               // арки-рёбра от дальних к ближним
      const u = Math.pow(k / 9, 1.6), w = lerp(140, 1500, u), h = lerp(170, 1800, u), y0 = lerp(VY + 60, 2200, u), x0 = VX;
      const P = [[x0 - w / 2, y0], [x0 - w / 2, y0 - h * 0.55]]; for (let a = 0; a <= 16; a++) { const q = Math.PI + a / 16 * Math.PI; P.push([x0 + Math.cos(q) * w / 2, y0 - h * 0.55 + Math.sin(q) * h * 0.45]); } P.push([x0 + w / 2, y0]);
      const c = lerpC(lerpC('#3a2c1e', '#d8b888', lit), lerpC('#1a120a', '#7a5e3e', lit), 1 - u);
      pencil(P, { w: 2 + u * 6, col: lerpC('#1a120a', '#5a4428', lit), a: 0.7, pass2: false });
      if (k % 3 === 0) { ctx.save(); ctx.globalAlpha = 0.18; ctx.fillStyle = c; ctx.fill(pathOf(P)); ctx.restore(); }
    }
    // следы пил на стенах (сетка «блоков»)
    for (const sd of [-1, 1]) for (let r = 0; r < 14; r++) for (let c = 0; c < 8; c++) { const u = Math.pow((c + 0.5) / 8, 1.4), x = VX + sd * lerp(80, 760, u), y = lerp(VY - 80, -300, u) + r * lerp(24, 220, u) * 0.9;
      if (y > lerp(VY + 50, 2200, u)) continue; pencil([[x, y], [x + sd * lerp(8, 70, u), y + lerp(2, 18, u)]], { w: 1 + u * 2, col: lerpC('#1a120a', '#8a6a44', lit), a: 0.45, pass2: false }); }
    // пол-дорога
    poly([[VX - 70, VY + 60], [VX + 70, VY + 60], [VX + 900, 2200], [VX - 900, 2200]], { wash: lerpC('#2a2016', '#8a7254', lit), washA: 1, line: false });
    for (let k = 0; k < 12; k++) { const u = Math.pow(((k + t * 2 * (t > EV.cl_km ? 1 : 0.1)) % 12) / 12, 2); pencil([[VX - 4 - u * 20, lerp(VY + 60, 2200, u)], [VX + 4 + u * 20, lerp(VY + 60, 2200, u) + 10 + u * 60]], { w: 4 + u * 10, col: lerpC('#5a4a3a', '#efe2c4', lit), a: 0.7, pass2: false }); }
  }
  function lamps(t, lit) {                         // лампы вдоль свода
    for (let k = 0; k < 8; k++) { const u = Math.pow(((k + (t > EV.cl_km ? (t - EV.cl_km) * 2.2 : 0)) % 8) / 8, 1.8), y = lerp(VY - 120, -600, u), sc = lerp(0.15, 2.2, u);
      if (lit > 0) { glow(VX, y, 200 * sc, 'rgba(255,214,140,1)', 0.6 * lit); ell(VX, y, 16 * sc, 12 * sc, { wash: '#fff4c8', washA: lit, w: 1.4, col: '#3a2a10' }); } }
  }
  function niches(t, lit) {                        // ниши с бочками и стеллажами вдоль стен
    if (lit <= 0) return; const run = t > EV.cl_km ? (t - EV.cl_km) * 2.2 : 0;
    for (const sd of [-1, 1]) for (let k = 0; k < 7; k++) { const u = Math.pow(((k + 0.5 + run) % 7) / 7, 1.7), x = VX + sd * lerp(80, 820, u), y = lerp(VY + 40, 2150, u), sc = lerp(0.08, 1.5, u);
      ctx.save(); ctx.globalAlpha = lit * clamp(u * 4); if (k % 2) { barrel(x, y - 120 * sc, sc, { label: sd < 0 ? 'Каберне' : 'Совиньон' }); barrel(x + sd * 180 * sc, y - 120 * sc, sc * 0.9, {}); barrel(x + sd * 90 * sc, y - 300 * sc, sc * 0.85, {}); }
      else { push(x, y, sc); rect(-150, -420, 300, 420, { wash: '#4a3020', washA: 1, w: 2, col: '#1a0e06' }); for (let rr = 0; rr < 7; rr++) for (let cc = 0; cc < 8; cc++) { ell(-130 + cc * 37, -400 + rr * 58, 14, 14, { wash: (rr + cc) % 3 ? '#1e2a14' : '#3a1418', washA: 1, w: 1, col: '#0a0604' }); ell(-134 + cc * 37, -404 + rr * 58, 4, 4, { wash: '#a8c870', washA: 0.4, line: false }); } pop(); }
      ctx.restore(); }
  }
  function signs(t, lit) {                         // указатели улиц
    if (lit <= 0) return;
    const S = [['ул. КАБЕРНЕ', 260, 760, -0.05, '#3a1418'], ['ул. СОВИНЬОН', 840, 700, 0.05, '#2a3a1a'], ['ул. АЛИГОТЕ', 870, 900, 0.03, '#2a3a1a'], ['ул. ФЕТЯСКА', 230, 960, -0.04, '#3a1418']];
    S.forEach(([s, x, y, r, c], i) => { const k = i < 2 ? clamp((t - EV.cl_wine - 0.1) / 0.3) : popK(t, EV.cl_street + i * 0.08, 0.35); if (k <= 0) return; push(x, y, k, r);
      rect(-160, -40, 320, 80, { wash: '#efe6d2', washA: 1, w: 3, col: '#1a120a' }); rect(-150, -30, 300, 60, { wash: c, washA: 1, w: 1.4, col: '#1a120a' }); txt(s, 0, 2, 38, { font: 'Osw', col: '#f6ecd6' }); pencil([[0, -40], [0, -120]], { w: 4, col: '#2a2a2a', pass2: false }); pop(); });
  }
  function quarry(t, lit) {                        // каменотёсы с двуручной пилой, блоки, фонари (до «вино»)
    const a = 1 - lit; if (a <= 0) return; ctx.save(); ctx.globalAlpha = a;
    for (const [lx, ly] of [[220, 820], [900, 760]]) { pencil([[lx, ly - 80], [lx, ly]], { w: 2, col: '#2a2a2a', pass2: false }); rect(lx - 20, ly, 40, 54, { wash: '#ffd890', washA: 1, w: 2, col: '#2a1a0a' }); glow(lx, ly + 26, 260, 'rgba(255,190,100,1)', 0.7); }
    const sw = Math.sin(t * 12) * 40 * (t > EV.cl_saw - 0.3 ? 1 : 0.3);
    rect(780, 1150, 260, 170, { wash: '#e8d4a8', washA: 1, w: 2.4, col: '#5a4428' }); pencil([[780 + 130 + sw * 0.2, 1150], [780 + 130 + sw * 0.2, 1240]], { w: 3, col: '#3a2a14', pass2: false });
    push(910 + sw, 1150, 1); pencil([[-180, 0], [180, 0]], { w: 6, col: '#a8acb0', pass2: false }); for (let q = -17; q <= 17; q++) poly([[q * 10, 0], [q * 10 + 5, 8], [q * 10 + 10, 0]], { wash: '#a8acb0', washA: 1, line: false }); for (const ex of [-190, 190]) pencil([[ex, -30], [ex, 30]], { w: 10, col: '#6a4428', pass2: false }); pop();
    human(700 + sw, 1330, 0.62, t, { body: '#8a7a64', bodyD: '#4a3a28', belt: '#2a1a10', hat: 'cap', hatCol: '#4a3a2a', hair: '#3a2a1a', beard: 'short', face: 'angry', armR: 'point', armL: 'point', seed: 1401 });
    human(1120 + sw, 1330, 0.62, t, { body: '#6a5a44', bodyD: '#3a2a18', belt: '#2a1a10', hat: 'fur', hatCol: '#2a2420', hair: '#5a5a5a', beard: 'long', face: 'angry', armL: 'point', armR: 'point', seed: 1402, flip: -1 });
    for (let i = 0; i < 6; i++) rect(60 + (i % 3) * 100, 1330 - Math.floor(i / 3) * 70, 96, 66, { wash: '#efe2c4', washA: 1, w: 2, col: '#7a6040' });
    for (let i = 0; i < 30; i++) { const r = rng(hsh(FRAME, i, 14)); ell(780 + r() * 260, 1150 + r() * 200, 3, 3, { wash: '#f6ecd6', washA: 0.8, line: false }); }
    ctx.restore();
  }
  function cart(t) {                               // экскурсионный электрокар проезжает мимо
    if (t < EV.cl_km - 0.2) return; const k = fade(t, EV.cl_km - 0.2, S1.cellar + 0.3), u = Math.pow(1 - k, 1.6), x = VX + 120 + u * 0, y = lerp(2300, VY + 80, u), sc = lerp(1.6, 0.1, u);
    push(lerp(1300, VX + 30, u), y, sc); const L = '#1a1a1a'; rect(-200, -160, 400, 120, { wash: '#efe6d2', washA: 1, w: 2.4, col: L }); rect(-200, -60, 400, 30, { wash: '#7a1a2a', washA: 1, w: 2, col: L });
    for (let q = 0; q < 3; q++) human(-130 + q * 130, -60, 0.35, t, { body: ['#3a5a7a', '#a84a3a', '#6a7a4a'][q], hair: '#3a2a1a', face: 'smile', armR: q === 1 ? 'wave' : 'down', seed: 1410 + q });
    for (const wx of [-140, 140]) ell(wx, -26, 34, 34, { wash: '#1a1a1e', washA: 1, w: 2, col: '#0a0a0a' }); glow(-200, -100, 120, 'rgba(255,240,200,1)', 0.6); pop();
  }

  WORLD.cellar = (t, u, cat) => {
    const lit = sm(fade(t, EV.cl_wine, EV.cl_wine + 0.25));
    lay(8, () => { tunnel(t, lit); lamps(t, lit); });
    lay(2, () => { niches(t, lit); quarry(t, lit); });
    lay(1.4, () => cart(t));
    lay(1, () => { cat(); if (t > EV.cl_wine - 0.05 && t < EV.cl_wine + 0.6) { const q = (t - EV.cl_wine + 0.05) / 0.65; for (let i = 0; i < 14; i++) { const r = rng(1420 + i), a = r() * 6.283, d = 60 + q * 260; glow(560 + Math.cos(a) * d, 1150 + Math.sin(a) * d * 0.8, 120 * (1 - q * 0.5), 'rgba(250,240,225,1)', 0.85 * (1 - q), 'source-over'); } } });
    lay(1.2, () => signs(t, lit));
    lay(0.6, () => { if (lit > 0) { ctx.save(); ctx.globalAlpha = lit; bottle(-20, 2000, 2.6, 0.2, '#2a3a1e', 'КРИКОВА'); bottle(1080, 2000, 2.4, -0.15, '#3a1418', '1952'); ctx.restore(); } });
    motes(50, [0, 0, W, H], lit > 0.5 ? '#ffe2b0' : '#f6ecd6', t, 81, { sp: 6, sz: 2.2, a: 0.5, tw: 1, add: 1 });
  };

  DIR.cellar = {
    outfit: 'miner', light: { side: 1, rim: '#ffcf8a' }, grade: ['#6a4a2a', 0.18],
    act: () => [[S0.cellar, 'awe'], [EV.cl_saw, 'suspicious'], [EV.cl_wine, 'grin'], [EV.cl_km, 'shock'], [EV.cl_street, 'proud']],
    pose: (t, u, b) => {
      const o = { x: 540, y: GY + 60, s: 1.02, look: [0.5, -0.1], outfit: t > EV.cl_wine ? 'vintner' : 'miner' };
      if (t < EV.cl_wine) { o.hand = [140, -280]; o.point = 1; o.look = [0.7, -0.1]; }
      else if (t < EV.cl_km) { o.prop = 'goblet'; o.hand = [100, -320]; o.look = [0, 0]; o.squash = t - EV.cl_wine < 0.3 ? 0.1 * (1 - (t - EV.cl_wine) / 0.3) : b.squash; }
      else { o.prop = 'goblet'; o.hand = [100, -320]; o.handF = [-140, -300]; o.look = [0.1, -0.3]; o.tailUp = true; }
      return Object.assign(b, o);
    },
    cam: () => [[S0.cellar, 600, 1100, 0.08], [EV.cl_saw, 680, 1120, 0.12], [EV.cl_wine, 560, 1080, 0.04], [EV.cl_km, 560, 1000, 0.0], [EV.cl_km + 0.6, 560, 960, 0.22, 'x'], [S1.cellar, 560, 980, 0.18]],
    hud: t => {
      if (t > EV.cl_km - 0.05) { const k = popK(t, EV.cl_km, 0.35); push(540, 470, k, -0.04); ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
        ctx.font = '600 160px Osw'; ctx.lineWidth = 22; ctx.strokeStyle = 'rgba(12,8,6,0.94)'; ctx.strokeText('120 км', 0, 0); ctx.fillStyle = K.amber; ctx.fillText('120 км', 0, 0);
        ctx.font = '600 42px Osw'; ctx.lineWidth = 10; ctx.strokeText('ПОДЗЕМНЫХ УЛИЦ', 0, 104); ctx.fillStyle = '#f6ecd6'; ctx.fillText('ПОДЗЕМНЫХ УЛИЦ', 0, 104); ctx.restore(); pop(); }
      if (t > EV.cl_saw && t < EV.cl_wine) note('здесь добывали камень для Кишинёва', 540, 1790, t, EV.cl_saw, EV.cl_wine, '#fff0d8', 42, -0.03);
    }
  };

  // ---------------------------------------------------------------- переход В сцену: провал сквозь брусчатку и пласты известняка
  TRANS_IN.cellar = { a: 0.2, b: 0.5, runA: 1, fx(k, t, A, B) {
    const q = sm(k), off = q * H * 2.2;
    drawBuf(B, 1.3 - 0.3 * q, 540, 960, 1, null, 0, (1 - q) * H * 1.1);
    scr(() => {
      const top = H - off + H * 1.1;               // полоса пластов между сценами
      for (let i = 0; i < 9; i++) { const y0 = top - H * 1.1 + i * H * 1.1 / 9, h = H * 1.1 / 9; ctx.fillStyle = ['#c8b494', '#e8d8b0', '#b8a07a', '#efe2c4', '#a88a64', '#e0cc9a', '#9a8058', '#d8c498', '#8a7050'][i]; ctx.fillRect(0, y0, W, h + 2);
        const r = rng(i + 40); for (let s2 = 0; s2 < 20; s2++) { ctx.fillStyle = 'rgba(255,248,230,0.6)'; ctx.beginPath(); ctx.ellipse(r() * W, y0 + r() * h, 10 + r() * 14, 6 + r() * 6, r() * 3, 0, 6.3); ctx.fill(); }
        pencil([[0, y0], [W, y0 + 10]], { w: 4, col: '#5a4428', a: 0.8, pass2: false }); }
    });
    drawBuf(A, 1 + q * 0.4, 540, 960, 1, null, 0, -off);
    scr(() => { const a = Math.sin(Math.PI * q); for (let i = 0; i < 50; i++) { const r = rng(hsh(FRAME, i, 33)), x = r() * W; pencil([[x, r() * H], [x, r() * H + 400 * a]], { w: 2 + r() * 3, col: i % 3 ? '#fff6e0' : '#1a120c', a: 0.6 * a, pass2: false, gap: false }); } });
  } };
})();
