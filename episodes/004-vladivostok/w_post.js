/* 004 — сцена `post`: 1860, берег Золотого Рога. На рейде транспорт «Манджур» (парусно-паровой), на берегу солдаты рубят первую казарму:
   сруб в три венца, козлы, щепки, костёр с котлом, палатка, ружья в козлах. На «скромное» — крошечный столбик-указатель «ВОСТОКЪ →»;
   на «Владей Востоком» — над срубом взлетает огромная вывеска «ВЛАДИВОСТОКЪ», солнце встаёт с востока. Переход В сцену — якорная цепь. */
(() => {
  EV.ps_chop = LS('s2') + 0.15;                  // первый удар топора
  EV.ps_humble = wt('s2', 'скромное:');          // столбик-указатель
  EV.ps_name = wt('s2', 'Владей');               // большая вывеска
  KEYW.push('скромное:', '«Владей', 'Востоком»!');
  const chops = []; for (let q = EV.ps_chop; q < EV.ps_humble - 0.1; q += 0.55) chops.push(q);
  EV.ps_chops = chops;

  function sky(t, sun) { vgrad(-900, 1300, ['#3a6aa0', '#7aaad0', '#d8e4e0', '#f8d8a8'], 1);
    if (sun > 0) { glow(900, 980 - 260 * sun, 360, 'rgba(255,200,110,1)', 0.6 * sun); ell(900, 980 - 260 * sun, 70, 70, { wash: '#fff0c0', washA: sun, line: false }); rays(900, 980 - 260 * sun, -Math.PI / 2, 3.2, 900, 'rgba(255,220,150,0.5)', 0.25 * sun, 14, t); }
    for (let i = 0; i < 4; i++) { const x = ((i * 400 + t * 14) % 1800) - 300, y = 220 + i * 80; blob([[x - 160, y], [x - 70, y - 34], [x + 40, y - 46], [x + 150, y - 22], [x + 190, y]], { wash: '#ffffff', washA: 0.6, line: false }); } }
  function bay(t) {
    sopki(1000, '#6a8a9a', 2.7, 220, 1);
    const r = rng(71); for (let x = -400; x < 1500; x += 14) { const y = 960 - Math.abs(Math.sin(x * 0.0026 + 2.7)) * 180 + 60, h = 26 + r() * 30; poly([[x - 8, y], [x, y - h], [x + 8, y]], { wash: '#4a6a5a', washA: 1, line: false }); }
    const w = rect(-400, 1060, 1900, 300, { wash: '#4a7a9a', washA: 1, line: false });
    for (let i = 0; i < 26; i++) { const y = 1070 + (i % 9) * 22, x = ((i * 137 + t * 20) % 1700) - 200; pencil([[x, y], [x + 50, y]], { w: 2, col: '#cfe4f0', a: 0.55, pass2: false }); }
    manchur(780, 1090, 0.85, t);
  }
  function manchur(x, y, s, t) {                                    // транспорт «Манджур»: чёрный корпус, белая полоса, две мачты, труба
    const bob = Math.sin(t * 1.6) * 3; push(x, y + bob, s);
    poly([[-260, -40], [240, -40], [200, 30], [-220, 30]], { wash: '#1e1e24', washA: 1, w: 2.2, col: '#0a0a0e' }); pencil([[-250, -24], [236, -24]], { w: 6, col: '#e8e2d0', pass2: false });
    for (let q = -6; q <= 5; q++) ell(q * 36, -24, 4, 4, { wash: '#2a2a2a', washA: 1, line: false });
    for (const mx of [-120, 110]) { pencil([[mx, -40], [mx, -380]], { w: 7, col: '#5a3a20', pass2: false }); for (const yy of [-320, -230]) { pencil([[mx - 90, yy], [mx + 90, yy]], { w: 4, col: '#5a3a20', pass2: false }); blob([[mx - 86, yy + 4], [mx + 86, yy + 4], [mx + 74, yy + 80], [mx - 74, yy + 80]], { wash: '#f0e8d4', washA: 0.95, w: 1.4, col: '#6a5a40' }); }
      pencil([[mx, -380], [-260, -40]], { w: 1.4, col: '#2a2a2a', a: 0.6, pass2: false }); pencil([[mx, -380], [240, -40]], { w: 1.4, col: '#2a2a2a', a: 0.6, pass2: false }); }
    rect(-14, -150, 28, 110, { wash: '#2a2a2a', washA: 1, w: 1.6 }); smokeCol(0, -150, t, 0.4, 0.5, 7, 1);
    rect(160, -64, 70, 4, { wash: '#a8241e', washA: 1, line: false }); txt('МАНДЖУРЪ', -10, 6, 22, { font: 'Osw', col: '#e8e2d0' });
    pencil([[-200, 30], [-240, 120]], { w: 2, col: '#3a3a3a', a: 0.6, pass2: false });
    pop();
  }
  function shore(t, sign) {                                        // берег: галька, сруб, палатка, костёр, ружья, щепки
    const g = poly([[-500, 1260], [300, 1230], [1500, 1250], [1500, 2600], [-500, 2600]], { wash: '#8a7a50', washA: 1, w: 2, col: '#3a3020', key: 9710 });
    hatch(g.path, g.bb, { gap: 10, a: 0.12, col: '#3a2a10', ang: 0.2, key: 9711 }); for (let i = 0; i < 60; i++) { const r = rng(7120 + i); ell(-400 + r() * 1800, 1280 + r() * 500, 4 + r() * 8, 3 + r() * 5, { wash: ['#a89a7a', '#7a6a5a', '#c8b898'][i % 3], washA: 1, w: 1, col: '#3a3020', a: 0.6 }); }
    for (let i = 0; i < 10; i++) { const r = rng(7140 + i); poly([[-400 + r() * 1600, 1290 + r() * 60], [-390 + r() * 1600, 1270 + r() * 40], [-370 + r() * 1600, 1295 + r() * 50]], { wash: '#6a8a3a', washA: 1, line: false }); }
    // сруб — растёт по ударам топора
    const logs = 3 + EV.ps_chops.filter(q => t > q).length; push(300, 1330, 0.85);
    for (let i = 0; i < logs; i++) { const y = -i * 34; for (const side of [0, 1]) { const x0 = side ? -10 : -260, len = side ? 250 : 270;
      const lg = rect(side ? -270 : -270, y - 30, 540, 30, { wash: i % 2 ? '#9a6a3a' : '#a8784a', washA: 1, w: 2, col: '#3a200a', key: 9720 + i });
      for (const ex of [-270, 270]) ell(ex, y - 15, 16, 16, { wash: '#d8b080', washA: 1, w: 1.6, col: '#5a3a1a' }); } }
    rect(-40, -logs * 34, 80, logs * 34 - 10, { wash: '#2a1a0a', washA: 0.5, line: false });                                   // проём двери
    pop();
    push(-60, 1300, 0.7); poly([[-130, 0], [0, -200], [130, 0]], { wash: '#d8d0b8', washA: 1, w: 2.2, col: '#3a3020' }); poly([[-20, 0], [0, -150], [20, 0]], { wash: '#2a2010', washA: 1, line: false }); pencil([[0, -200], [0, -240]], { w: 4, col: '#5a3a20', pass2: false }); pop();
    push(60, 1380, 0.8); for (const a of [-0.35, 0, 0.35]) { push(0, 0, 1, a); pencil([[0, 0], [0, -200]], { w: 6, col: '#4a2a14', pass2: false }); pencil([[0, -200], [0, -250]], { w: 3, col: '#9aa0a8', pass2: false }); pop(); } pop();
    push(930, 1420, 0.9); for (let q = -2; q <= 2; q++) ell(q * 18, 0, 20, 8, { wash: '#4a3020', washA: 1, w: 1.2 }); flame(0, -10, 80, 34, t, 3); flame(-14, -6, 50, 22, t, 5); smokeCol(0, -60, t, 0.5, 0.4, 9);
    pencil([[-70, 10], [-40, -150], [40, -150], [70, 10]], { w: 5, col: '#3a2a1a', pass2: false }); ell(0, -96, 40, 34, { wash: '#2a2a2a', washA: 1, w: 2 }); for (let q = 0; q < 3; q++) glow(Math.sin(t * 3 + q) * 10, -150 - q * 40 - (t * 30) % 40, 30, 'rgba(255,255,255,1)', 0.2); pop();
    // щепки летят на ударах
    for (const q of EV.ps_chops) { const dt = t - q; if (dt < 0 || dt > 0.6) continue; const r = rng(Math.floor(q * 100)); for (let i = 0; i < 8; i++) { const vx = (r() - 0.3) * 600, vy = -300 - r() * 300; push(560 + vx * dt, 1240 + vy * dt + 900 * dt * dt, 1, dt * 12 + i); rect(-10, -3, 20, 6, { wash: '#e0c090', washA: 1, w: 1, col: '#5a3a1a' }); pop(); } }
    // крошечный указатель «ВОСТОКЪ →»
    if (t > EV.ps_humble - 0.05) { const k = popK(t, EV.ps_humble, 0.35); push(860, 1520, k); pencil([[0, 0], [0, -110]], { w: 6, col: '#6a4424', pass2: false }); poly([[-36, -110], [44, -110], [60, -96], [44, -82], [-36, -82]], { wash: '#e8dcc0', washA: 1, w: 1.6, col: '#3a2a10' }); txt('ВОСТОКЪ', 4, -96, 15, { font: 'Osw', col: '#3a2a10' }); pop(); }
    if (sign > 0) { push(380, 1330 - logs * 29 - 150 - 60 * sign, sign * 0.85); const b = rect(-330, -70, 660, 140, { wash: '#f0e2b8', washA: 1, w: 4, col: '#3a200a', key: 9730 }); shadeG(b.path, 0, -70, 0, 70, '#c8a060', 0.4);
      txt('ВЛАДИВОСТОКЪ', 0, 4, 96, { font: 'Osw', col: '#7a1a10' }); for (const sx of [-1, 1]) pencil([[sx * 300, 70], [sx * 300, 160]], { w: 10, col: '#6a4424', pass2: false }); glow(0, 0, 420, 'rgba(255,220,140,1)', 0.3 * sign); pop(); }
  }
  function soldiers(t) {
    const ch = q => EV.ps_chops.some(c => t > c - 0.12 && t < c + 0.12);
    human(560, 1440, 1.0, t, { body: '#e8e2cc', bodyD: '#a8a08a', belt: '#3a2a1a', legs: '#2a3a2a', boots: '#1a1208', hat: 'cap', hatCol: '#2a4a2a', hair: '#6a4a2a', face: t > EV.ps_name ? 'grin' : 'calm', look: -0.6, armL: 'up', armR: 'swing', prop: 'axe', seed: 101, flip: -1 });
    human(110, 1490, 1.05, t, { body: '#e8e2cc', bodyD: '#a8a08a', belt: '#3a2a1a', legs: '#2a3a2a', hat: 'cap', hatCol: '#2a4a2a', hair: '#3a2a1a', beard: 'short', face: t > EV.ps_name ? 'shock' : 'calm', look: 0.6, armL: 'hold', armR: 'hold', seed: 102 });
    push(110, 1490, 1.05); push(0, -150, 1, 0.05); rect(-120, -20, 240, 30, { wash: '#a8784a', washA: 1, w: 2, col: '#3a200a' }); ell(-120, -5, 15, 15, { wash: '#d8b080', washA: 1, w: 1.4 }); pop(); pop();
    human(1000, 1470, 0.95, t, { body: '#2a4a32', bodyD: '#10201a', trim: '#d8b04a', belt: '#e8e2d0', legs: '#1e2a24', hat: 'cap', hatCol: '#2a4a32', hair: '#2a1a0a', face: t > EV.ps_humble ? 'smile' : 'calm', look: -0.6, armL: 'hips', armR: t > EV.ps_name ? 'point' : 'hips', seed: 103, flip: -1 });   // прапорщик Комаров
  }

  function fore(t) {                                               // передний план: пень с топором, поленница, пила, ведро, щепа
    push(140, 1880, 1.1); ell(0, 0, 110, 34, { wash: '#a8784a', washA: 1, w: 2.4, col: '#3a200a' }); for (let r_ = 20; r_ < 100; r_ += 22) pencil(ellPts(0, 0, r_, r_ * 0.3, 0, 0, 30), { w: 1.4, col: '#7a4a24', a: 0.6, pass2: false });
    rect(-110, 0, 220, 90, { wash: '#6a4424', washA: 1, w: 2.4, col: '#2a1608' }); push(10, -10, 1, -0.5); pencil([[0, 0], [0, -170]], { w: 12, col: '#8a5a32' }); blob([[-40, 10], [0, -14], [40, 10], [30, 34], [-30, 34]], { wash: '#9aa0a6', washA: 1, w: 2, col: '#1a1a1a' }); pop(); pop();
    push(960, 1860, 1); for (let i = 0; i < 9; i++) { const row = i < 4 ? 0 : i < 7 ? 1 : 2, col = i < 4 ? i : i < 7 ? i - 4 : i - 7; ell(-90 + col * 60 + row * 30, -row * 52, 30, 28, { wash: '#d8b080', washA: 1, w: 2, col: '#5a3a1a' }); pencil(ellPts(-90 + col * 60 + row * 30, -row * 52, 14, 13, 0, 0, 16), { w: 1.2, col: '#a87a4a', pass2: false }); } pop();
    push(560, 1960, 1, 0.1); rect(-200, -10, 400, 30, { wash: '#b8bcc0', washA: 1, w: 2, col: '#2a2a2a' }); for (let q = -19; q < 20; q++) poly([[q * 10, 20], [q * 10 + 5, 32], [q * 10 + 10, 20]], { wash: '#8a8e92', washA: 1, line: false }); for (const sx of [-1, 1]) rect(sx * 210 - 15, -30, 30, 70, { wash: '#6a4424', washA: 1, w: 2 }); pop();
    for (let i = 0; i < 26; i++) { const r = rng(9790 + i); push(300 + r() * 600, 1820 + r() * 160, 1, r() * 3); rect(-12, -3, 24, 6, { wash: '#e8c898', washA: 1, w: 1, col: '#7a5a2a' }); pop(); }
  }
  WORLD.post = (t, u, cat) => {
    const sun = sm((t - EV.ps_name) / 0.6), sign = popK(t, EV.ps_name, 0.4);
    lay(40, () => sky(t, sun));
    lay(10, () => bay(t));
    lay(1, () => { shore(t, t > EV.ps_name ? sign : 0); soldiers(t); cat(); });
    lay(0.8, () => fore(t));
    lay(0.6, () => { motes(18, [-200, 900, 1300, 1900], '#f0d8a0', t, 72, { sp: -10, sz: 2.4, a: 0.5, tw: 1 }); for (const x of [-120, 1180]) { pencil([[x, 2200], [x + 30, 600]], { w: 40, col: '#3a2a18', pass2: false }); for (let q = 0; q < 6; q++) poly([[x - 160 + q * 10, 700 + q * 140], [x + 15, 560 + q * 140], [x + 190 - q * 10, 700 + q * 140]], { wash: '#1e3a26', washA: 1, w: 1.4, col: '#0e1a10' }); } });
  };
  DIR.post = {
    outfit: 'soldier', light: { side: 1, rim: '#ffe0a8' }, grade: ['#7a9a6a', 0.1],
    act: () => [[S0.post, 'talk'], [EV.ps_humble - 0.03, 'sideeye'], [EV.ps_name - 0.03, 'proud']],
    pose: (t, u, b) => { const c = EV.ps_chops.find(q => t > q - 0.3 && t < q + 0.2), sw = c !== undefined ? clamp((t - c + 0.3) / 0.3) : 0;
      return Object.assign(b, { x: 740, y: 1560, s: 1.15, look: t < EV.ps_humble ? [-0.5, 0.4] : t < EV.ps_name ? [0.4, 0.1] : [0, -0.2],
        prop: t < EV.ps_humble ? 'axe' : undefined, propAng: -1.4 + sw * 2.2, hand: t < EV.ps_humble ? [-60 - 60 * sw, -300 + 220 * sw] : t > EV.ps_name ? [90, -250] : [70, -170],
        tilt: t > EV.ps_name ? -0.05 : 0, squash: b.squash + (t > EV.ps_name ? 0.03 : 0), tailUp: t > EV.ps_name }); },
    cam: () => [[S0.post, 600, 1140, 0.1], [EV.ps_humble, 680, 1180, 0.08], [EV.ps_name, 540, 1020, -0.04, 'x'], [S1.post, 540, 1000, 0.0]]
  };
  // ---------------------------------------------------------------- переход В post: якорь с цепью падает и смахивает кадр
  TRANS_IN.post = { a: 0.24, b: 0.36, runA: 1, fx(k, t, A, B) {
    const q = sm(k), y = -200 + q * (H + 600), x = 560;
    drawBuf(B, 1.05 - 0.05 * q); scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(0, y - 40, W, H); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore(); });
    scr(() => { for (let yy = y - 40; yy > -200; yy -= 56) { const sw = Math.sin(yy * 0.01) * 10; pencil(ellPts(x + sw, yy, 22, 34, 0, 0, 24), { w: 10, col: '#3a3a40', pass2: false, gap: false }); pencil(ellPts(x + sw, yy - 28, 8, 30, 1.57, 0, 16), { w: 9, col: '#4a4a50', pass2: false, gap: false }); }
      push(x, y, 1.4); pencil([[0, -120], [0, 80]], { w: 22, col: '#2a2a30', pass2: false }); pencil([[-90, 40], [-60, 100], [0, 120], [60, 100], [90, 40]], { w: 20, col: '#2a2a30', pass2: false }); pencil([[-60, -80], [60, -80]], { w: 18, col: '#2a2a30', pass2: false }); ell(0, -140, 26, 26, { w: 10, col: '#2a2a30' }); pop();
      for (let i = 0; i < 14; i++) { const r = rng(hsh(FRAME, i)); ell(r() * W, y - 40 + r() * 60, 10 + r() * 20, 6 + r() * 8, { wash: '#cfe8f8', washA: 0.6, line: false }); } });
  } };
})();
