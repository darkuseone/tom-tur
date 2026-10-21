/* 004 — сцена `bowl`: 1831. Люстгартен перед Старым музеем Шинкеля (18 ионических колонн, широкая лестница). Гигантская полированная
   Гранитная чаша (⌀ 6,91 м) из того самого валуна — на боку меловая метка Тома из ледникового периода. Рабочие на катках пытаются
   затолкать её в музей — не влезает в проём между колоннами. Рулетка «6,91 м», красный крест. Переход сюда — крышка ящика захлопывается и открывается. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.bowl_shine = wt('s5', 'чашей');             // блик по полированной чаше
  EV.bowl_tape = wt('s5', 'семь');               // рулетка растягивается
  EV.bowl_bump = wt('s5', 'влез');               // чаша упирается в колонны — бум
  EV.bowl_x = wt('s5', 'музей!');                // красный крест на проёме
  SHAKES.push([EV.bowl_bump, 0.35, 14]);
  KEYW.push('метров', 'музей!');

  const BX = 700, BY = 1330;                                         // центр чаши (верхний край)
  const pushX = t => -120 * sm(clamp((t - S0.bowl) / (EV.bowl_bump - S0.bowl))) + (t > EV.bowl_bump ? 30 * Math.exp(-(t - EV.bowl_bump) * 5) * Math.cos((t - EV.bowl_bump) * 30) + 24 : 0);
  function sky(t) { vgrad(-700, 1400, ['#5a8ac4', '#9cc0e0', '#e8ecec', '#f4e4c8'], 1); glow(200, 500, 400, 'rgba(255,240,210,1)', 0.4); for (const [x, y, s, sd] of [[300, 240, 1.4, 51], [880, 380, 1.2, 52]]) cloudB(x + t * 8, y, s, '#ffffff', 0.85, sd); }
  function cathedral(t) { push(1080, 1150, 0.9); rect(-200, -360, 400, 360, { wash: '#c8bca8', washA: 0.8, line: false }); ell(0, -380, 150, 130, { wash: '#7a9a8a', washA: 0.8, line: false }); rect(-10, -560, 20, 70, { wash: '#7a9a8a', washA: 0.8, line: false }); pop(); haze('#eef0ec', 0.2); }
  function museum(t) {                                               // Старый музей: подиум, лестница, 18 ионических колонн, антаблемент с надписью, аттик
    const L = '#2a2014', ST = '#e8dcc4', SD = '#a8987c', base = 1250, x0 = -260, x1 = 1340;
    rect(x0, base - 640, x1 - x0, 640, { wash: '#d8ccb0', washA: 1, w: 2.4, col: L, key: 8700 }); rect(x0, base - 560, x1 - x0, 500, { wash: '#6a5a46', washA: 0.85, line: false });
    for (let k = 0; k < 6; k++) { const wx = x0 + 60 + k * 270; rect(wx, base - 470, 90, 220, { wash: '#4a3a2a', washA: 0.9, w: 1.4, col: L }); for (let q = 0; q < 3; q++) ell(wx + 45, base - 420 + q * 60, 22, 14, { wash: '#8a7a5a', washA: 0.5, line: false }); }
    for (let k = 0; k < 18; k++) { const cx = x0 + 40 + k * ((x1 - x0 - 80) / 17); const c = rect(cx - 20, base - 560, 40, 500, { wash: ST, washA: 1, w: 2, col: L, key: 8710 + k }); shadeG(c.path, cx + 20, 0, cx - 6, 0, SD, 0.55);
      for (let q = -1; q <= 1; q++) pencil([[cx + q * 9, base - 556], [cx + q * 9, base - 64]], { w: 1.2, col: SD, a: 0.5, pass2: false, gap: false });
      for (const sd of [-1, 1]) pencil(ellPts(cx + sd * 20, base - 566, 9, 9, 0, 0.1, 16), { w: 2.2, col: L, a: 0.8, pass2: false }); rect(cx - 30, base - 584, 60, 14, { wash: ST, washA: 1, w: 1.6, col: L }); }
    const en = rect(x0 - 20, base - 660, x1 - x0 + 40, 80, { wash: ST, washA: 1, w: 2.4, col: L, key: 8730 }); shadeG(en.path, 0, base - 580, 0, base - 660, SD, 0.3);
    txt('FRIDERICVS GVILELMVS III STVDIO ANTIQVITATIS OMNIGENAE', 540, base - 618, 30, { font: 'Osw', col: '#5a4a32', a: 0.85 });
    rect(220, base - 760, 640, 100, { wash: ST, washA: 1, w: 2.2, col: L }); for (const ax of [260, 820]) { push(ax, base - 760, 0.8); horse(0, 0, 0.5, t, { col: '#6a7a7a', colD: '#2a3a3a', colL: '#a8b8b8', noShadow: 1, rear: 0.6, flip: ax > 540 ? -1 : 1 }); pop(); }
    for (let k = 0; k < 9; k++) rect(x0 + 200 + k * 20, base - 40 + k * 6, 1000 - k * 40, 10, { wash: '#d8ccb0', washA: 1, w: 1.4, col: L });
    rect(x0, base - 60, x1 - x0, 60, { wash: '#cfc2a6', washA: 1, w: 2, col: L });
    if (t > EV.bowl_x) { const k = popK(t, EV.bowl_x, 0.3); push(540, base - 300, k); for (const s of [-1, 1]) pencil([[-140, -140 * s], [140, 140 * s]], { w: 22, col: '#c8241e', a: 0.85, pass2: false }); pop(); }
    if (t > EV.bowl_tape) { for (const dx of [440, 640]) pencil([[dx, base - 60], [dx, base - 560]], { w: 8, col: '#f2c81e', a: 0.9, pass2: false }); pencil([[450, base - 520], [630, base - 520]], { w: 5, col: '#f2c81e', pass2: false }); txt('проём', 540, base - 545, 40, { font: 'Hand', col: '#f2c81e' }); }
  }
  function bowl(t) {                                                 // чаша на катках: полированный гранит, отражение неба, метка «Т»
    const x = BX + pushX(t), y = BY, rx = 400, ry = 92;
    push(x, y, 1, t > EV.bowl_bump ? -0.035 : 0);
    ell(0, 340, 420, 34, { wash: '#000000', washA: 0.25, line: false });
    for (const rx2 of [-260, -80, 100, 280]) { const rr = ell(rx2, 316, 26, 26, { wash: '#8a5a32', washA: 1, w: 2, col: '#1c0e04' }); pencil([[rx2 - 26, 316], [rx2 + 26, 316]], { w: 2, col: '#4a2a12', pass2: false }); }
    const sp = shape([[-110, 300], [110, 300], [70, 150], [-70, 150]], { wash: '#9a8a86', washA: 1, w: 2.4, col: '#2a1a14' }); shadeG(sp.path, 110, 0, -60, 0, '#4a3a36', 0.5);
    const B = [[-rx, 0], [-rx + 30, 70], [-260, 140], [0, 170], [260, 140], [rx - 30, 70], [rx, 0]];
    const bp = shape(spline(B, false, 8), { wash: '#b08c86', washA: 1, w: 3.2, col: '#2a1610', key: 8740 }); shadeG(bp.path, 300, 60, -260, 60, '#4a2a26', 0.55);
    ctx.save(); ctx.clip(bp.path); const r = rng(8741); for (let k = 0; k < 160; k++) { const px = -400 + r() * 800, py = r() * 170; ell(px, py, 2 + r() * 4, 1.5 + r() * 3, { wash: ['#d8908a', '#efe8e0', '#2a2420'][k % 3], washA: 0.7, line: false }); }
    const sh = clamp((t - EV.bowl_shine) / 0.6); if (sh > 0 && sh < 1) { ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(-400 + sh * 900, 0, -300 + sh * 900, 170); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.5, 'rgba(255,255,240,0.6)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(-420, -20, 840, 200); }
    ctx.restore();
    pencil([[-110, 104], [50, 104]], { w: 11, col: '#f6e8b8', a: 0.95, pass2: false }); pencil([[-30, 104], [-30, 160]], { w: 11, col: '#f6e8b8', a: 0.95, pass2: false });
    const rim = ell(0, 0, rx, ry, { wash: '#c8a49c', washA: 1, w: 3, col: '#2a1610', key: 8742 }); ell(0, 6, rx - 26, ry - 20, { wash: '#7a9ab8', washA: 1, w: 2, col: '#3a2a24' });
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, 6, rx - 26, ry - 20, 0, 0, 6.283); ctx.clip(); const g2 = ctx.createLinearGradient(0, -70, 0, 80); g2.addColorStop(0, '#c8dcf0'); g2.addColorStop(1, '#5a7a9a'); ctx.fillStyle = g2; ctx.fillRect(-400, -80, 800, 170); cloudB(-120, 10, 0.5, '#ffffff', 0.7, 53); ctx.restore();
    pop();
  }
  function workers(t) {                                              // рабочие толкают чашу; после удара — падают/чешут затылки
    const b = t > EV.bowl_bump, x = BX + pushX(t);
    human(x + 460, 1470, 0.8, t, { body: '#6a5a4a', legs: '#3a3a3a', hat: 'cap', hatCol: '#3a3a3a', face: b ? 'shock' : 'angry', armL: 'point', armR: 'point', seed: 140, flip: -1 });
    human(x + 580, 1476, 0.82, t, { body: '#8a4a2a', legs: '#3a3a3a', hat: 'top', hatCol: '#2a2a2a', beard: 'short', hair: '#4a2a14', face: b ? 'shock' : 'angry', armL: b ? 'up' : 'point', armR: b ? 'up' : 'point', seed: 141, flip: -1 });
    human(x - 470, 1466, 0.78, t, { body: '#5a6a7a', legs: '#3a3a3a', hat: 'cap', hatCol: '#6a4a2a', face: b ? 'grin' : 'calm', armR: 'hold', prop: 'stick', propAng: 0.5, seed: 142 });
  }
  function tape(t) {                                                 // рулетка поперёк чаши
    if (t < EV.bowl_tape) return; const k = sm(clamp((t - EV.bowl_tape) / 0.5)), x = BX + pushX(t), x0 = x - 400, x1 = lerp(x0, x + 400, k), y = BY - 140;
    pencil([[x0, y], [x1, y]], { w: 14, col: '#f2c81e', pass2: false }); for (let q = x0; q < x1; q += 26) pencil([[q, y - 7], [q, y + 2]], { w: 2, col: '#2a1a0a', pass2: false });
    rect(x1 - 10, y - 30, 56, 60, { wash: '#c8302a', washA: 1, w: 2, col: '#2a1a0a' });
    if (k > 0.8) { push(x, y - 70, 1); ctx.save(); ctx.fillStyle = 'rgba(20,14,10,0.75)'; ctx.fillRect(-120, -46, 240, 84); ctx.restore(); txt('6,91 м', 0, 0, 62, { font: 'Osw', col: K.amber }); pop(); }
  }
  function lustgarten(t) { const p = rect(-300, 1240, 1700, 900, { wash: '#c8b890', washA: 1, line: false }); shadeG(p.path, 0, 2000, 0, 1240, '#6a5a3a', 0.4); for (let k = 0; k < 40; k++) { const r = rng(8750 + k), x = r() * 1500 - 200, y = 1300 + r() * 600; pencil([[x, y], [x + 30 + r() * 40, y]], { w: 1.6, col: '#8a7a52', a: 0.5, pass2: false }); } for (const x of [-140, 1240]) linden(x, 1500, 520, t, 8760 + x, '#4a7a3a'); }

  WORLD.bowl = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(10, () => cathedral(t));
    lay(2.3, () => museum(t));
    lay(1, () => { lustgarten(t); bowl(t); workers(t); cat(); tape(t); });
    lay(0.66, () => { push(950, 1860, 1.1); ell(-110, -20, 40, 40, { wash: '#4a3a2a', washA: 1, w: 2.4, col: '#1a1008' }); const bb = poly([[-150, -150], [140, -150], [100, -50], [-130, -50]], { wash: '#7a8086', washA: 1, w: 2.4, col: '#1a1a1e' }); for (let k = 0; k < 8; k++) ell(-110 + k * 30, -158, 20, 14, { wash: '#b08c86', washA: 1, w: 1.4, col: '#2a1610' }); pencil([[120, -110], [260, -40]], { w: 10, col: '#6a4424', pass2: false }); pop(); for (let k = 0; k < 3; k++) { const x = 160 + k * 70 + Math.sin(t * 2 + k) * 6, y = 1830 + (k % 2) * 16, pk = Math.sin(t * 8 + k * 2) > 0.6 ? 8 : 0; ell(x, y, 26, 17, { wash: '#8a8a94', washA: 1, w: 1.6, col: '#2a2a2e' }); ell(x + 20, y - 15 + pk, 11, 10, { wash: '#6a6a74', washA: 1, w: 1.4, col: '#2a2a2e' }); poly([[x + 28, y - 15 + pk], [x + 37, y - 13 + pk], [x + 28, y - 11 + pk]], { wash: '#e8a030', washA: 1, line: false }); } });
    lay(0.7, () => { motes(16, [-100, 400, 1200, 1900], '#fff6e0', t, 8770, { sp: 20, vx: 10, sz: 3, a: 0.5 }); if (t > EV.bowl_bump && t < EV.bowl_bump + 0.6) { const k = (t - EV.bowl_bump) / 0.6, r = rng(8771); for (let i = 0; i < 16; i++) ell(1100 + (r() - 0.5) * 200, 1300 - k * 200 * r(), 30 * k + 10, 20 * k + 8, { wash: '#e8dcc4', washA: 0.6 * (1 - k), line: false }); } });
  };
  DIR.bowl = {
    outfit: 'victorian', light: { side: -1, rim: '#fff0d0' }, grade: ['#d8a060', 0.2],
    act: () => [[S0.bowl, 'proud'], [EV.bowl_shine, 'awe'], [EV.bowl_tape, 'proud'], [EV.bowl_bump, 'shock'], [EV.bowl_x, 'laugh']],
    pose: (t, u, b) => Object.assign(b, {
      x: 230, y: GY, s: 0.98, look: t > EV.bowl_bump ? [0.8, -0.3] : [0.6, -0.1], hand: t > EV.bowl_tape && t < EV.bowl_bump ? [170, -240] : t > EV.bowl_x ? [-60, -200] : undefined,
      point: t > EV.bowl_tape && t < EV.bowl_bump ? 1 : undefined, squash: b.squash, tilt: t > EV.bowl_x ? Math.sin(t * 9) * 0.04 : 0
    }),
    cam: () => [[S0.bowl, 600, 980, 0.0], [EV.bowl_tape, 560, 1000, 0.04], [EV.bowl_bump, 620, 980, 0.08], [S1.bowl, 560, 1000, 0.14]],
    hud: t => { if (t > S0.bowl + 0.4 && t < EV.bowl_tape) note('метка с ледника!', 760, 1380, t, S0.bowl + 0.4, EV.bowl_tape, '#f6ecd6', 46, -0.04); }
  };

  // ---------------------------------------------------------------- переход В 1831: крышка ящика падает на кадр и откидывается
  TRANS_IN.bowl = { a: 0.25, b: 0.35, fx(k, t, A, B) {
    const q = clamp(k / 0.45), o = clamp((k - 0.5) / 0.5);
    drawBuf(k < 0.5 ? A : B, 1, 540, 960);
    scr(() => { const y = k < 0.5 ? lerp(-H, 0, q * q) : 0, h = k < 0.5 ? H : H * (1 - sm(o)); if (h < 2) return;
      ctx.save(); ctx.translate(0, k < 0.5 ? y : H - h); ctx.fillStyle = '#b88c54'; ctx.fillRect(0, 0, W, h); for (let yy = 0; yy < h; yy += h / 6) { ctx.fillStyle = 'rgba(90,60,30,0.6)'; ctx.fillRect(0, yy, W, 6); }
      ctx.fillStyle = '#9a7040'; ctx.fillRect(0, 0, 70, h); ctx.fillRect(W - 70, 0, 70, h); ctx.restore(); const yy = k < 0.5 ? y : H - h; push(540, yy + h / 2, Math.max(0.05, h / H)); txt('PARIS', 0, 0, 220, { font: 'Osw', col: '#2a2a3a', a: 0.8 }); txt('1814 → BERLIN', 0, 180, 80, { font: 'Hand', col: '#8a2a1a', a: 0.9 }); pop(); });
    if (k > 0.42 && k < 0.56) whiteOut(0.25, '40,24,10');
  } };
})();
