/* 004 — сцена `aport`: 1865, укрепление Верное. Земляной вал с частоколом, глинобитные домики под тополями, казачий пост, горы.
   Переселенец Егор Редько с телегой саженцев сажает ряд яблонь. На «приезжий!» на саженце выскакивает багажная бирка «ПРИЕЗЖИЙ»,
   рядом — гигантское яблоко-апорт (крупный плод «на вырост»); на «Егор Редько» — подпись к фигуре. Том — переселенец в рубахе с лопатой.
   Переход В сцену: алый шёлковый платок накрывает кадр и слетает. */
(() => {
  EV.ap_guest = wtw('s4', 'приезжий!');
  EV.ap_name = wtw('s4', 'Егор');
  KEYW.push('приезжий!', 'Редько.');

  function fort(t) {                                                    // вал + частокол + сторожевая вышка + флаг
    const v = poly([[-300, 1180], [1400, 1160], [1400, 1250], [-300, 1260]], { wash: '#9a8a5a', washA: 1, w: 2.2, col: '#4a3a1a', key: 9401 }); hatch(v.path, v.bb, { gap: 8, a: 0.2, col: '#4a3a1a', ang: 0.3, key: 9402 });
    for (let x = -280; x < 1400; x += 24) { const y = 1180 - (x + 300) * 0.012; pencil([[x, y], [x, y - 80]], { w: 11, col: '#8a6238' }); poly([[x - 5, y - 80], [x, y - 92], [x + 5, y - 80]], { wash: '#8a6238', washA: 1, w: 1 }); }
    const tx = 980; for (const k of [-1, 1]) pencil([[tx + k * 40, 1170], [tx + k * 26, 900]], { w: 8, col: '#6a4424' }); rect(tx - 50, 860, 100, 50, { wash: '#8a6238', washA: 1, w: 2, col: '#2a1a0a' }); poly([[tx - 64, 860], [tx, 800], [tx + 64, 860]], { wash: '#5a3e24', washA: 1, w: 2, col: '#2a1a0a' });
    pencil([[tx, 800], [tx, 700]], { w: 3, col: '#3a2a1a' }); const f = Math.sin(t * 4) * 8; poly([[tx, 700], [tx + 70, 706 + f], [tx + 70, 746 + f], [tx, 740]], { wash: '#f4f4f4', washA: 1, w: 1.4, col: '#3a3a3a' }); poly([[tx, 713], [tx + 70, 719 + f], [tx + 70, 733 + f], [tx, 727]], { wash: '#2a4a9a', washA: 1, line: false }); poly([[tx, 727], [tx + 70, 733 + f], [tx + 70, 746 + f], [tx, 740]], { wash: '#c8242a', washA: 1, line: false });
    human(tx, 860, 0.4, t, { body: '#3a4a3a', legs: '#2a2a3a', hair: '#3a2a1a', beard: 'short', hat: 'cap', hatCol: '#2a3a2a', face: 'calm', armR: 'hold', prop: 'spear', look: -0.5, seed: 41 });
  }
  function houses(t) {                                                  // глинобитные домики, плоские крыши, тополя
    const r = rng(9410); for (let k = 0; k < 6; k++) { const x = -120 + k * 230, y = 1300, w = 160 + r() * 40, h = 90 + r() * 30;
      const p = rect(x, y - h, w, h, { wash: k % 2 ? '#d8c09a' : '#c8ae84', washA: 1, w: 2, col: '#5a3a1a' }); hatch(p.path, p.bb, { gap: 9, a: 0.1, col: '#7a5a2a', ang: 0.3, key: 9411 + k });
      rect(x - 10, y - h - 14, w + 20, 16, { wash: '#8a6a4a', washA: 1, w: 1.6, col: '#3a2a14' }); rect(x + 30, y - h + 30, 34, 30, { wash: '#3a5a6a', washA: 1, w: 1.4, col: '#2a1a0a' }); pencil([[x + 47, y - h + 30], [x + 47, y - h + 60]], { w: 2, col: '#6a4424', pass2: false });
      rect(x + w - 60, y - 70, 40, 70, { wash: '#6a4424', washA: 1, w: 1.6, col: '#2a1a0a' });
      if (k % 2 === 0) { const u = (t * 0.4 + k / 6) % 1; glow(x + 40, y - h - 40 - u * 120, 18 + u * 30, 'rgba(170,160,150,1)', 0.35 * (1 - u), 'source-over'); } }
    for (let k = 0; k < 9; k++) { const x = -160 + k * 170, y = 1310; pencil([[x, y], [x, y - 100]], { w: 7, col: '#5a4030' }); const c = blob(ellPts(x, y - 260, 30, 170, 0, 0.2, 10), { wash: k % 2 ? '#6a9a3a' : '#5a8a32', washA: 1, w: 1.6, col: '#1e3a0a' }); hatch(c.path, c.bb, { gap: 5, a: 0.2, col: '#1e3a0a', ang: 1.5, key: 9420 + k }); }
  }
  function cart(t) {                                                    // телега с пучками саженцев + лошадка
    push(860, 1470, 1);
    const hs = Math.sin(t * 2) * 3; push(230, 0, 0.9); for (const lx of [-50, -30, 40, 60]) pencil([[lx, -110], [lx, 0]], { w: 10, col: '#6a4a2a' }); blob([[-70, -110], [-60, -170], [60, -176], [80, -130], [60, -100], [-60, -100]], { wash: '#8a5a32', washA: 1, w: 2.2, col: '#2a1608' });
    push(70, -160 + hs, 1, 0.5); blob([[0, -10], [70, -16], [86, 10], [70, 24], [0, 14]], { wash: '#8a5a32', washA: 1, w: 2, col: '#2a1608' }); ell(40, -6, 4, 4, { wash: '#1a0e06', washA: 1, line: false }); pop(); pencil([[-70, -150], [-96, -90]], { w: 8, col: '#2a1608' }); pop();
    for (const wx of [-120, 120]) { ell(wx, -50, 56, 56, { wash: 'rgba(0,0,0,0)', washA: 0, w: 6, col: '#4a2c14' }); for (let q = 0; q < 6; q++) { const a = q / 6 * 3.14 + t * 0.2; pencil([[wx, -50], [wx + Math.cos(a) * 52, -50 + Math.sin(a) * 52]], { w: 3, col: '#6a4424', pass2: false }); } }
    rect(-180, -150, 360, 60, { wash: '#9a7044', washA: 1, w: 2.4, col: '#2a1a0a' }); for (let q = 0; q < 4; q++) pencil([[-180 + q * 120, -150], [-180 + q * 120, -90]], { w: 2, col: '#4a2c14', pass2: false });
    for (let k = 0; k < 7; k++) { const x = -150 + k * 48, sw = Math.sin(t * 2 + k) * 4; pencil([[x, -140], [x + sw, -280]], { w: 5, col: '#6a4a2a' }); for (const [lx, ly] of [[-14, -250], [14, -270], [-8, -290]]) blob([[x + sw + lx, -150 + ly + 150], [x + sw + lx - 14, ly - 12], [x + sw + lx, ly - 24], [x + sw + lx + 14, ly - 12]], { wash: '#6a9a2a', washA: 1, w: 1.2, col: '#1e3a0a' });
      ell(x, -150, 18, 12, { wash: '#6a4a2a', washA: 1, w: 1.2, col: '#2a1a0a' }); }
    push(0, -120, 1, -0.04); rect(-100, -22, 200, 44, { wash: '#efe2c0', washA: 1, w: 2, col: '#3a2410' }); txt('САЖЕНЦЫ: АПОРТ', 0, 2, 26, { font: 'Hand', col: '#2a1a0a' }); pop();
    pop();
  }
  function row(t) {                                                     // ряд свежепосаженных яблонек
    for (let k = 0; k < 4; k++) { const x = 120 + k * 150, y = 1430 - k * 18, s = 0.7 - k * 0.08; push(x, y, s); ell(0, 0, 50, 12, { wash: '#5a3a1a', washA: 1, w: 1.4, col: '#2a1a0a' }); pencil([[0, 0], [2, -150]], { w: 6, col: '#6a4a2a' }); pencil([[0, -100], [-40, -160]], { w: 4, col: '#6a4a2a' }); pencil([[0, -110], [44, -170]], { w: 4, col: '#6a4a2a' });
      for (const [lx, ly] of [[-40, -170], [44, -180], [2, -160], [-20, -140], [24, -140]]) blob([[lx, ly], [lx - 16, ly - 16], [lx, ly - 30], [lx + 16, ly - 16]], { wash: '#6a9a2a', washA: 1, w: 1.2, col: '#1e3a0a' });
      pencil([[-20, 0], [-14, -90]], { w: 3, col: '#8a6a3a', pass2: false }); pencil([[-14, -60], [0, -60]], { w: 2, col: '#3a2a1a', pass2: false }); pop(); }
  }
  function tag(t) {                                                     // бирка «ПРИЕЗЖИЙ» на ближнем саженце + апорт-гигант
    if (t < EV.ap_guest - 0.05) return; const k = popK(t, EV.ap_guest, 0.4), sw = Math.sin(t * 5) * 0.12;
    push(470, 1310, k, -0.3 + sw); pencil([[0, -40], [0, 0]], { w: 2, col: '#3a2a1a', pass2: false }); const p = poly([[-90, 0], [70, 0], [100, 30], [70, 60], [-90, 60]], { wash: '#f2d27a', washA: 1, w: 2.4, col: '#5a3a08' }); ell(80, 30, 7, 7, { wash: '#3a2a1a', washA: 1, w: 1 }); txt('ПРИЕЗЖИЙ', -6, 32, 30, { font: 'Osw', col: '#5a1a0a' }); pop();
    push(70, 1500, popK(t, EV.ap_guest + 0.25, 0.45)); apple(0, -90, 80, -0.1, { col: '#d8442a', col2: '#c8c040' }); txt('апорт', 0, 30, 38, { font: 'Hand', col: '#2a1a0a' }); pop();
  }
  function redko(t) {                                                   // Егор Редько с лопатой
    const dig = Math.sin(t * 5) > 0 ? 'swing' : 'hold';
    human(610, 1470, 1.0, t, { body: '#e8e0cc', trim: '#a8241e', belt: '#a8241e', legs: '#3a3a4a', boots: '#2a1a10', hair: '#6a4a2a', beard: 'long', hat: 'cap', hatCol: '#2a2a3a', face: t > EV.ap_name ? 'smile' : 'calm', armL: 'hold', armR: t > EV.ap_name ? 'wave' : dig, prop: t > EV.ap_name ? undefined : 'oar', propAng: 0.2, look: -0.6, flip: -1, seed: 42 });
    if (t > EV.ap_name) note('Егор Редько', 610, 1050, t, EV.ap_name, S1.aport + 0.2, '#2a1a0a', 46, -0.04);
  }

  WORLD.aport = (t, u, cat) => {
    lay(30, () => { vgrad(-600, 1200, ['#6aa0d0', '#c0d8e8', '#f4ead0']); glow(860, 320, 360, 'rgba(255,240,200,1)', 0.5); });
    lay(18, () => { alatau(t, 1000, { s: 1.05, key: 9430 }); haze('#e8eef4', 0.14); });
    lay(8, () => { fort(t); haze('#f4ead0', 0.12); });
    lay(4, () => houses(t));
    lay(1.3, () => { const g = poly([[-400, 1330], [1500, 1320], [1500, 2400], [-400, 2400]], { wash: '#9a8a4a', washA: 1, w: 2, col: '#4a3a1a', key: 9440 }); hatch(g.path, g.bb, { gap: 8, a: 0.15, col: '#4a3a1a', ang: -1.2, key: 9441 }); for (let k = 0; k < 5; k++) pencil([[-200, 1420 + k * 50], [1300, 1400 + k * 50]], { w: 3, col: '#6a5a2a', a: 0.35, pass2: false }); row(t); cart(t); });
    lay(1, () => { redko(t); cat(); tag(t); });
    lay(0.6, () => { const r = rng(9450); for (let k = 0; k < 10; k++) { const x = r() * 1200 - 60, y = 1850 + r() * 120; for (let q = 0; q < 5; q++) pencil([[x + q * 8, y], [x + q * 10 - 20 + Math.sin(t * 2 + q) * 6, y - 60 - r() * 60]], { w: 3, col: '#7a8a3a', a: 0.8, pass2: false }); } });
  };
  DIR.aport = {
    outfit: 'rubakha', light: { side: 1, rim: '#fff0c8' }, grade: ['#e8c080', 0.08],
    act: () => [[S0.aport, 'proud'], [EV.ap_guest, 'sideeye'], [EV.ap_guest + 0.4, 'smug'], [EV.ap_name, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 270, y: 1580, s: 0.95, look: t > EV.ap_name ? [0.8, 0] : [0.3, 0.2], prop: t > EV.ap_guest && t < EV.ap_name ? undefined : 'stick', hand: t > EV.ap_guest && t < EV.ap_name ? [160, -260] : [90, -150], point: t > EV.ap_guest && t < EV.ap_name ? 1 : undefined, squash: b.squash }),
    cam: () => [[S0.aport, 560, 1080, 0.02], [EV.ap_guest, 380, 1260, 0.1], [EV.ap_name, 560, 1180, 0.08], [S1.aport, 580, 1170, 0.1]]
  };
  // ---------------------------------------------------------------- переход В сцену: шёлковый платок накрывает кадр и слетает
  TRANS_IN.aport = { a: 0.3, b: 0.4, runA: 1, fx(k, t, A, B) {
    const cloth = (y0, fl) => { const p = new Path2D(); p.moveTo(-50, -50); p.lineTo(W + 50, -50); for (let x = W + 50; x >= -50; x -= 40) p.lineTo(x, y0 + Math.sin(x * 0.01 + t * 9) * 60 + fl * (x - 540) * 0.2); p.closePath(); return p; };
    if (k < 0.5) { drawBuf(A); const y = sm(k / 0.5) * (H + 200); const p = cloth(y, 0); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#c81e24'; ctx.fill(p); const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, 'rgba(255,200,190,0.35)'); g.addColorStop(0.5, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(60,0,0,0.4)'); ctx.fillStyle = g; ctx.fill(p); ctx.restore(); }
    else { drawBuf(B); const m = sm((k - 0.5) / 0.5); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(m * 1400, -m * 900); ctx.rotate(m * 0.8); ctx.fillStyle = '#c81e24'; ctx.globalAlpha = 1 - m * 0.3; ctx.fill(cloth(H + 200, 0)); ctx.restore(); }
  } };
})();
