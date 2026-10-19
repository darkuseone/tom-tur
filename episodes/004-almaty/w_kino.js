/* 004 — сцена `kino`: 1943, ночь, Алма-Ата, Центральная объединённая киностудия (ЦОКС). Снимают «Ивана Грозного».
   Декорация Кремля — шатровые башни и стена; прожекторы, кинокамера на штативе, хлопушка, бояре в шубах, царь в чёрном с посохом.
   На «кустарника» декорация поворачивается — сзади вместо фанеры связки веток и верёвки. На «Фанеры не было!» — табличка «ФАНЕРА: 0 листов».
   Снимают ночью — днём ток идёт заводам (лампа мигает). Том — режиссёр с рупором. Переход В сцену: кадр становится киноплёнкой и протягивается вверх. */
(() => {
  EV.kn_kremlin = wtw('s7', 'Кремль');
  EV.kn_bush = wtw('s7', 'кустарника.');
  EV.kn_none = wtw('s7', 'Фанеры');
  KEYW.push('Грозного»', 'кустарника.', 'было!');

  function tower(x, base, w, h, t, back) {                               // башня-декорация: стена + шатёр + орёл/звезда нет — двуглавый шпиль
    if (back) { for (let q = 0; q < 14; q++) { const r = rng(9700 + q + x), x0 = x - w / 2 + r() * w, y0 = base - r() * h * 0.6; pencil([[x0, y0], [x0 + (r() - 0.5) * 80, y0 - 80 - r() * 120], [x0 + (r() - 0.5) * 120, y0 - 160 - r() * 160]], { w: 4 + r() * 4, col: '#5a4030' }); }
      for (let q = 0; q < 5; q++) { const yy = base - 40 - q * (h / 5); pencil([[x - w / 2, yy], [x + w / 2, yy - 10]], { w: 3, col: '#c8a870', pass2: false }); }
      for (let q = 0; q < 30; q++) { const r = rng(9720 + q + x); blob([[x - w / 2 + r() * w, base - r() * h], [x - w / 2 + r() * w + 14, base - r() * h - 10], [x - w / 2 + r() * w, base - r() * h - 20]], { wash: '#4a6a2a', washA: 1, w: 1, col: '#1e2a0a' }); }
      return; }
    const p = rect(x - w / 2, base - h, w, h, { wash: '#a8402a', washA: 1, w: 2.4, col: '#2a1008' }); for (let yy = base - h + 14; yy < base; yy += 14) pencil([[x - w / 2, yy], [x + w / 2, yy]], { w: 1, col: '#6a2010', a: 0.5, pass2: false });
    shadeG(p.path, x + w / 2, 0, x - w / 2, 0, '#3a1008', 0.4);
    for (let q = 0; q < 2; q++) rect(x - 14 - q * 0 + (q ? 20 : -30), base - h + 40, 18, 40, { wash: '#1a0a06', washA: 1, w: 1.2 });
    poly([[x - w / 2 - 10, base - h], [x, base - h - w * 1.6], [x + w / 2 + 10, base - h]], { wash: '#3a6a4a', washA: 1, w: 2.2, col: '#1a2a1a', shade: { gap: 6, a: 0.3, col: '#0a1a0a', ang: 0.5 } });
    pencil([[x, base - h - w * 1.6], [x, base - h - w * 1.6 - 40]], { w: 3, col: '#d6a842', pass2: false }); ell(x, base - h - w * 1.6 - 46, 10, 8, { wash: '#d6a842', washA: 1, w: 1.2 });
  }
  function setPiece(t) {                                                // декорация Кремля на поворотном круге
    const k = sm((t - EV.kn_bush + 0.1) / 0.5), sx = Math.cos(k * Math.PI), back = sx < 0;
    push(540, 1300, 1); ctx.save(); ctx.scale(Math.max(0.04, Math.abs(sx)), 1);
    const wall = (x0, x1) => { rect(x0, -240, x1 - x0, 240, { wash: back ? '#c8a870' : '#a8402a', washA: back ? 0.25 : 1, w: 2.4, col: '#2a1008' }); if (!back) for (let x = x0; x < x1; x += 40) poly([[x + 4, -240], [x + 4, -270], [x + 14, -262], [x + 20, -274], [x + 26, -262], [x + 36, -270], [x + 36, -240]], { wash: '#a8402a', washA: 1, w: 1.6, col: '#2a1008' }); };
    wall(-460, 460); tower(-300, 0, 140, 380, t, back); tower(80, 0, 180, 480, t, back); tower(380, 0, 120, 320, t, back);
    if (back) { for (let q = 0; q < 5; q++) pencil([[-460 + q * 230, 0], [-460 + q * 230, -300]], { w: 8, col: '#6a4a2a' }); for (let q = 0; q < 8; q++) { const r = rng(9740 + q); pencil([[-460 + r() * 920, -r() * 280], [-460 + r() * 920, -r() * 280]], { w: 2, col: '#d8c8a0', pass2: false }); } }
    ctx.restore(); pop();
    if (t > EV.kn_none) { push(860, 1080, popK(t, EV.kn_none, 0.35), 0.08); rect(-150, -60, 300, 120, { wash: '#f4ecd8', washA: 1, w: 3, col: '#2a1a0a' }); txt('ФАНЕРА:', 0, -18, 40, { font: 'Osw', col: '#2a1a0a' }); txt('0 листов', 0, 30, 40, { font: 'Hand', col: '#c81e24' }); pop(); }
  }
  function searchlight(x, y, ang, t, k) {                                // прожектор + луч
    const on = Math.sin(t * 13 + k) > -0.95 ? 1 : 0.3;
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(x, y, x + Math.cos(ang) * 900, y + Math.sin(ang) * 900); g.addColorStop(0, `rgba(255,240,200,${0.35 * on})`); g.addColorStop(1, 'rgba(255,240,200,0)'); ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(ang - 0.15) * 900, y + Math.sin(ang - 0.15) * 900); ctx.lineTo(x + Math.cos(ang + 0.15) * 900, y + Math.sin(ang + 0.15) * 900); ctx.closePath(); ctx.fill(); ctx.restore();
    pencil([[x, y + 40], [x - 30, y + 200], [x, y + 200], [x + 30, y + 200], [x, y + 40]], { w: 4, col: '#3a3a3a', pass2: false }); push(x, y, 1, ang); rect(-30, -26, 60, 52, { wash: '#4a4a4a', washA: 1, w: 2, col: '#1a1a1a' }); ell(30, 0, 8, 26, { wash: '#fff8e0', washA: on, w: 1.6, col: '#1a1a1a' }); pop();
  }
  function camera(x, y, t) {                                             // кинокамера 1940-х на штативе, две бобины
    push(x, y, 1); for (const a of [-0.35, 0, 0.35]) pencil([[0, -120], [Math.sin(a) * 120, 0]], { w: 6, col: '#4a3a2a' });
    rect(-70, -200, 140, 80, { wash: '#2a2a2a', washA: 1, w: 2.2, col: '#0a0a0a' }); rect(70, -180, 50, 40, { wash: '#3a3a3a', washA: 1, w: 2, col: '#0a0a0a' }); ell(126, -160, 10, 18, { wash: '#6a8aa0', washA: 1, w: 1.4 });
    for (const bx of [-40, 30]) { push(bx, -240, 1, t * 4); ell(0, 0, 40, 40, { wash: '#3a3a3a', washA: 1, w: 2, col: '#0a0a0a' }); for (let q = 0; q < 3; q++) ell(Math.cos(q * 2.1) * 20, Math.sin(q * 2.1) * 20, 8, 8, { wash: '#1a1a1a', washA: 1, line: false }); pop(); }
    pop();
  }
  function crew(t) {
    human(-30, 1460, 0.95, t, { body: '#3a3a3a', legs: '#2a2a2a', hair: '#2a1a10', hat: 'cap', hatCol: '#3a3a3a', face: 'calm', armL: 'hold', armR: 'hold', look: 0.6, seed: 71 });   // оператор
    const clap = t > S0.kino + 0.15 && t < S0.kino + 0.5; human(1000, 1470, 0.9, t, { body: '#5a4a3a', legs: '#2a2a2a', hair: '#6a4a2a', face: clap ? 'grin' : 'calm', armL: 'hold', armR: 'swing', look: -0.6, flip: -1, seed: 72 });
    push(1040, 1260, 1, -0.1); rect(-60, -10, 120, 70, { wash: '#1a1a1a', washA: 1, w: 2, col: '#000000' }); txt('ИВАН', 0, 20, 22, { font: 'Hand', col: '#f4f4f4' }); txt('ГРОЗНЫЙ', 0, 44, 18, { font: 'Hand', col: '#f4f4f4' }); push(-60, -10, 1, clap ? -0.4 : 0); rect(0, -18, 120, 18, { wash: '#f4f4f4', washA: 1, w: 1.6, col: '#000000' }); for (let q = 0; q < 4; q++) poly([[q * 30, -18], [q * 30 + 15, -18], [q * 30 + 5, 0], [q * 30 - 10, 0]], { wash: '#1a1a1a', washA: 1, line: false }); pop(); pop();
  }
  function actors(t) {                                                   // царь и бояре на «площади» декорации
    human(420, 1380, 0.8, t, { body: '#2a2228', trim: '#d6a842', legs: '#1a1a1a', long: 1, hair: '#1a1a1a', beard: 'long', hat: 'fur', hatCol: '#1a1a1a', face: 'angry', armL: 'down', armR: 'hold', prop: 'stick', look: 0.3, seed: 73 });
    for (let k = 0; k < 3; k++) human(560 + k * 90, 1385, 0.72, t, { body: ['#6a2a3a', '#2a4a6a', '#5a5a2a'][k], trim: '#d6a842', legs: '#2a2420', long: 1, hair: '#5a3a1a', beard: 'long', hat: 'fur', hatCol: '#4a3020', face: t > EV.kn_bush ? 'shock' : 'calm', armL: 'down', armR: t > EV.kn_bush ? 'up' : 'down', look: -0.6, flip: -1, seed: 74 + k });
  }

  WORLD.kino = (t, u, cat) => {
    lay(30, () => { vgrad(-600, 1300, ['#0a0e22', '#1e2244', '#3a3050']); ell(860, 320, 60, 60, { wash: '#f4eed8', washA: 1, w: 1.6, col: '#a8a090' }); glow(860, 320, 200, 'rgba(240,240,220,1)', 0.3); for (let k = 0; k < 30; k++) { const r = rng(9750 + k); ell(r() * 1100, r() * 900, 2, 2, { wash: '#fff8e0', washA: 0.4 + 0.4 * Math.sin(t * 3 + k), line: false }); } });
    lay(18, () => { alatau(t, 1040, { s: 0.9, col: '#2a3050', colD: '#14182e', snow: 0.5, key: 9760 }); });
    lay(8, () => { const s = rect(-300, 820, 1700, 500, { wash: '#2a2a32', washA: 1, w: 2, col: '#0a0a12' }); for (let x = -300; x < 1400; x += 120) pencil([[x, 820], [x, 1320]], { w: 2, col: '#1a1a22', pass2: false }); txt('ЦОКС · ПАВИЛЬОН № 1', 540, 880, 40, { font: 'Osw', col: '#8a8a9a' }); });
    lay(2.4, () => { const g = poly([[-400, 1300], [1500, 1300], [1500, 2400], [-400, 2400]], { wash: '#4a4038', washA: 1, w: 2, col: '#1a1410', key: 9770 }); hatch(g.path, g.bb, { gap: 12, a: 0.15, col: '#1a1410', ang: 0.1, key: 9771 }); setPiece(t); actors(t); });
    lay(1.5, () => { searchlight(-40, 980, 0.6, t, 1); searchlight(1120, 1000, 2.5, t, 2); camera(220, 1500, t); crew(t); });
    lay(1, () => cat());
    lay(0.6, () => motes(30, [-100, 300, 1200, 1700], 'rgba(255,240,200,1)', t, 9780, { sp: 20, vx: 10, sz: 3, a: 0.4, add: 1 }));
  };
  DIR.kino = {
    outfit: 'director', light: { side: 1, rim: '#fff0c8' }, grade: ['#3a4a8a', 0.12],
    act: () => [[S0.kino, 'proud'], [EV.kn_kremlin, 'smug'], [EV.kn_bush, 'laugh'], [EV.kn_none, 'annoyed'], [EV.kn_none + 0.5, 'sideeye']],
    pose: (t, u, b) => Object.assign(b, { x: 760, y: 1640, s: 0.95, look: t > EV.kn_none ? [0.3, 0] : [-0.6, -0.2], prop: 'megaphone', hand: t < EV.kn_bush ? [60, -330] : undefined, handF: t > EV.kn_none ? [-130, -300] : undefined, squash: b.squash }),
    cam: () => [[S0.kino, 540, 1080, 0.02], [EV.kn_kremlin, 520, 1040, 0], [EV.kn_bush, 540, 1100, 0.06], [EV.kn_none, 640, 1180, 0.12], [S1.kino, 660, 1190, 0.14]],
    hud: t => { if (t > EV.kn_kremlin + 0.3) note('снимали ночью: днём ток — заводам', 540, 1790, t, EV.kn_kremlin + 0.3, S1.kino, '#f3e6c8', 36, -0.02); }
  };
  // ---------------------------------------------------------------- переход В сцену: кадр → киноплёнка, протягивается вверх
  TRANS_IN.kino = { a: 0.3, b: 0.4, runA: 0, holdA: true, fx(k, t, A, B) {
    scr(() => screenFill('#141414', 1));
    const sh = sm(clamp(k / 0.3)), s = 1 - sh * 0.3, off = sm(clamp((k - 0.3) / 0.7)) * (H * 0.7 + 60);
    const fh = H * s * 0.7 + 60;
    for (let i = -1; i <= 1; i++) { const cy = 960 - off + i * fh + fh; drawBuf(i === -1 ? B : i === 0 ? A : B, s * 0.7 + 0.3 * (1 - sh), 540, 960, 1, null, 0, cy - 960 - fh); }
    scr(() => { for (const x of [60, W - 60]) for (let y = -60 + ((off) % 80); y < H; y += 80) rect(x - 18, y, 36, 46, { wash: '#f4f0e8', washA: 0.9 * sh, w: 1, col: '#000000', a: 0.3 }); });
    if (k > 0.85) drawBuf(B, 1, 540, 960, (k - 0.85) / 0.15);
  } };
})();
