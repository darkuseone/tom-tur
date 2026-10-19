/* 004 — сцена `volcano`: −600 000 лет. Альбанский вулкан извергается, пепел ложится на будущие семь холмов, Тибр петляет по долине,
   бродят лесные слоны (палеолоксодоны) и олени. На «Холмы Рима» — призрачный контур будущего города над холмами и подписи холмов.
   На «спит!» — вулкан гаснет, над кратером «Zzz», вместо огня — озеро Альбано, заметка «2 мм/год вверх».
   Том — вулканолог в термокостюме. Переход В сцену: облако пепла накрывает камеру и оседает. */
(() => {
  EV.volc_hills = WT('s1', 'Холмы');
  EV.volc_ash = WT('s1', 'вулканический');
  EV.volc_but = WT('s1', 'вулкан');
  EV.volc_sleep = WT('s1', 'спит!');
  SHAKES.push([S0.volcano + 0.05, 0.5, 9], [EV.volc_but, 0.35, 6]);
  KEYW.push('пепел.', 'спит!');
  const sleepK = t => sm(clamp((t - EV.volc_sleep + 0.1) / 0.45));

  function volcanoCone(t) {                                          // кратер на горизонте: лава, бомбы, столб пепла
    const sk = sleepK(t);
    const P = [[-200, 1060], [200, 860], [380, 700], [470, 660], [560, 664], [640, 700], [820, 860], [1260, 1060]];
    const c = shape(spline(P, false, 8).concat([[1260, 1300], [-200, 1300]]), { wash: lerpC('#5a3a3a', '#5a6a4a', sk), washA: 1, w: 2.6, col: '#1a0e0a', key: 9500 });
    hatch(c.path, c.bb, { gap: 8, a: 0.25, col: '#1a0e0a', ang: -0.6, key: 9501 }); shadeG(c.path, 900, 0, 400, 0, '#1a0a08', 0.45);
    if (sk < 1) { for (let k = 0; k < 5; k++) { const x0 = 480 + k * 22, wob = Math.sin(t * 3 + k) * 6; ctx.save(); ctx.globalAlpha = 1 - sk; pencil(spline([[x0, 672], [x0 - 30 - k * 20 + wob, 760], [x0 - 90 - k * 40, 900 + k * 20], [x0 - 130 - k * 50, 1040]], false, 8), { w: 12 - k, col: k % 2 ? '#ff7a2a' : '#ffc84a', pass2: false }); ctx.restore(); }
      glow(520, 660, 260, 'rgba(255,120,40,1)', 0.7 * (1 - sk));
      for (let k = 0; k < 12; k++) { const ph = (t * 0.7 + k / 12) % 1, a = -1.5 + Math.sin(k * 7) * 0.7, x = 520 + Math.cos(a) * ph * 520, y = 660 + Math.sin(a) * ph * 520 + ph * ph * 600; ctx.save(); ctx.globalAlpha = 1 - sk; ell(x, y, 8, 8, { wash: '#ff9a3a', washA: 1, w: 1.4, col: '#3a1a08' }); glow(x, y, 30, 'rgba(255,140,60,1)', 0.6); ctx.restore(); } }
    if (sk > 0) { ctx.save(); ctx.globalAlpha = sk; ell(520, 672, 96, 18, { wash: '#4a7aa0', washA: 1, w: 2, col: '#1a2a3a' }); pencil([[460, 668], [500, 666]], { w: 2, col: '#e8f4f8', pass2: false }); ctx.restore(); }
  }
  function ashColumn(t) {                                            // столб пепла: клубы, поднимающиеся и расплывающиеся
    const sk = sleepK(t);
    for (let k = 0; k < 16; k++) { const ph = (t * 0.25 + k / 16) % 1, y = 640 - ph * 900, x = 520 + Math.sin(k * 3.1 + t * 0.4) * 60 * (0.3 + ph) + ph * 260, r = 70 + ph * 260;
      ctx.save(); ctx.globalAlpha = (1 - sk) * 0.85 * (ph < 0.1 ? ph / 0.1 : 1);
      ell(x, y, r, r * 0.7, { wash: lerpC('#6a5a5a', '#c8b8a8', ph), washA: 0.9, w: 1.8, col: '#2a1e1a', a: 0.35 });
      ell(x - r * 0.3, y - r * 0.2, r * 0.5, r * 0.36, { wash: lerpC('#8a7a72', '#e0d4c4', ph), washA: 0.6, line: false }); ctx.restore(); }
    if (sk > 0) { const z = (t - EV.volc_sleep) * 1.4; ctx.save(); ctx.globalAlpha = sk; ['Z', 'z', 'Z'].forEach((c, i) => txt(c, 560 + i * 50 + Math.sin(t * 2 + i) * 8, 600 - i * 70 - (z * 40 % 70), 80 - i * 14, { font: 'Osw', col: '#f6ecd6' })); ctx.restore(); }
  }
  function sevenHills(t) {                                           // семь холмов: туф, подписи, призрак будущего Рима
    const P = [[-300, 1230], [-150, 1180], [-40, 1140], [60, 1170], [160, 1120], [260, 1150], [380, 1110], [500, 1150], [620, 1120], [740, 1160], [860, 1110], [980, 1150], [1100, 1140], [1300, 1200], [1300, 1400], [-300, 1400]];
    const h = shape(spline(P, false, 6), { wash: '#b89a6a', washA: 1, w: 2.4, col: '#3a2410', key: 9510 }); hatch(h.path, h.bb, { gap: 7, a: 0.18, col: '#6a4a24', ang: 0.5, key: 9511 });
    ctx.save(); ctx.clip(h.path); for (let y = 1140; y < 1400; y += 22) pencil([[-300, y], [1300, y + 10]], { w: 3, col: '#d8c098', a: 0.5, pass2: false }); ctx.restore();
    // Тибр
    const tb = spline([[-300, 1330], [100, 1300], [300, 1350], [500, 1310], [800, 1360], [1300, 1320]], false, 8); pencil(tb, { w: 26, col: '#5a8aa8', pass2: false }); pencil(tb.map(([x, y]) => [x, y - 4]), { w: 4, col: '#bcd8e4', a: 0.7, pass2: false });
    const lk = clamp((t - EV.volc_hills) / 0.4) * (1 - clamp((t - EV.volc_but) / 0.4));
    if (lk > 0) { ctx.save(); ctx.globalAlpha = lk;
      ['Капитолий', 'Палатин', 'Авентин', 'Целий', 'Эсквилин', 'Виминал', 'Квиринал'].forEach((nm, i) => { const x = -40 + i * 170, y = 1110 - (i % 2) * 30; pencil([[x, y + 10], [x, y - 40]], { w: 2, col: '#2a1a0a', pass2: false }); txt(nm, x, y - 64, 46, { font: 'Hand', col: '#2a1a0a', rot: -0.08 }); });
      const ga = 0.55; ctx.globalAlpha = lk * ga;                     // призрак будущего: Колизей, купол Св. Петра, колонны
      push(620, 1120, 0.6); for (let r = 0; r < 3; r++) for (let q = 0; q < 8; q++) { const x = -160 + q * 42, y = -40 - r * 50; pencil([[x, y], [x, y - 36], [x + 30, y - 36], [x + 30, y]], { w: 2.4, col: '#fff6e0', pass2: false }); } pencil([[-170, 0], [180, 0]], { w: 3, col: '#fff6e0', pass2: false }); pop();
      push(80, 1120, 0.6); pencil(spline([[-110, 0], [-100, -120], [-50, -200], [0, -214], [50, -200], [100, -120], [110, 0]], false, 10), { w: 3, col: '#fff6e0', pass2: false }); pencil([[0, -214], [0, -260]], { w: 3, col: '#fff6e0', pass2: false }); pop();
      ctx.restore(); }
  }
  function elephants(t) {                                            // лесные слоны и олени (силуэты в дымке)
    for (const [x0, s, sp] of [[-80, 0.55, 14], [180, 0.42, 14]]) { const x = x0 + (t * sp) % 400, step = Math.sin(t * 3 + x0) * 6; push(x, 1215, s);
      const b = blob([[-130, -40], [-120, -140], [-40, -170], [60, -160], [110, -110], [120, -40]], { wash: '#6a5a50', washA: 1, w: 2.2, col: '#1e1612' }); shadeG(b.path, 0, -40, 0, -170, '#2a2018', 0.4);
      const hd = blob([[-150, -150], [-210, -150], [-230, -90], [-200, -30], [-160, -60], [-120, -100]], { wash: '#6a5a50', washA: 1, w: 2.2, col: '#1e1612' });
      pencil(spline([[-220, -90], [-240, -20], [-226, 30]], false, 6), { w: 20, col: '#6a5a50' }); pencil(spline([[-210, -70], [-280, -60], [-300, -110]], false, 6), { w: 8, col: '#f0e6d0' });
      for (const [lx, k] of [[-90, 0], [-50, 1], [60, 2], [100, 3]]) pencil([[lx, -60], [lx + (k % 2 ? step : -step), 30]], { w: 30, col: '#5a4a40' }); pop(); }
    for (const [x, s] of [[900, 0.5], [1010, 0.45]]) { push(x + Math.sin(t * 0.8) * 10, 1230, s); blob([[-60, -100], [60, -100], [70, -60], [-60, -60]], { wash: '#9a6a3a', washA: 1, w: 2, col: '#2a1a0a' }); for (const lx of [-50, -30, 40, 60]) pencil([[lx, -62], [lx, 0]], { w: 7, col: '#7a4a2a' }); pencil([[-60, -100], [-90, -170]], { w: 18, col: '#9a6a3a' }); ell(-96, -176, 22, 16, { wash: '#9a6a3a', washA: 1, w: 2 }); for (const sd of [-1, 1]) pencil(spline([[-96, -190], [-96 + sd * 30, -250], [-96 + sd * 50, -280]], false, 5), { w: 4, col: '#4a2a14', pass2: false }); pop(); }
  }
  function ashFall(t) { const sk = sleepK(t); motes(Math.round(90 * (1 - sk * 0.85)), [-200, -100, W + 200, 1900], '#9a8a80', t, 9520, { sp: 90, vx: 30, sz: 4, a: 0.7, tw: 0, wob: 20 }); }
  function foreRocks(t) {                                            // передний план: лавовые глыбы, обугленные стволы, тлеющий туф
    const g = poly([[-400, 1420], [1500, 1420], [1500, 2400], [-400, 2400]], { wash: '#7a6658', washA: 1, w: 2, col: '#2a1a12', key: 9530 }); hatch(g.path, g.bb, { gap: 9, a: 0.18, col: '#2a1a12', ang: 0.3, key: 9531 });
    for (let k = 0; k < 40; k++) { const r = rng(9532 + k); ell(-300 + r() * 1700, 1440 + r() * 400, 4 + r() * 10, 3 + r() * 6, { wash: '#4a3a32', washA: 1, w: 1, col: '#1a0e0a', a: 0.6 }); }
    for (const [x, y, s] of [[-80, 1520, 1.2], [1040, 1560, 1.4], [360, 1700, 0.9]]) { push(x, y, s); const r = blob([[-120, 0], [-110, -70], [-40, -110], [60, -100], [120, -50], [110, 0]], { wash: '#3a302c', washA: 1, w: 2.6, col: '#0a0606' }); hatch(r.path, r.bb, { gap: 6, a: 0.35, col: '#000', ang: 0.8 }); const ph = 0.5 + 0.5 * Math.sin(t * 3 + x); for (let q = 0; q < 3; q++) pencil([[-60 + q * 50, -60 - q * 10], [-40 + q * 50, -20 - q * 4]], { w: 4, col: '#ff7a2a', a: 0.5 * ph * (1 - sleepK(t)), pass2: false }); pop(); }
    for (const x of [140, 900]) { push(x, 1440, 1); pencil([[0, 0], [-6, -260]], { w: 16, col: '#2a1e18' }); pencil([[-4, -180], [-60, -230]], { w: 7, col: '#2a1e18' }); pencil([[-5, -220], [40, -280]], { w: 6, col: '#2a1e18' }); pop(); }
  }
  WORLD.volcano = (t, u, cat) => {
    const sk = sleepK(t);
    lay(40, () => { vgrad(-900, 1300, [lerpC('#2a1a1a', '#6a9ac0', sk), lerpC('#6a3a2a', '#b8d0e0', sk), lerpC('#c8783a', '#f0e4c8', sk), lerpC('#e8a85a', '#f4dcb0', sk)]); glow(520, 640, 700, sk ? 'rgba(255,240,200,1)' : 'rgba(255,110,40,1)', 0.45); });
    lay(16, () => { ashColumn(t); volcanoCone(t); haze(sk ? '#e8dcc8' : '#b88a6a', 0.22); });
    lay(6, () => { sevenHills(t); elephants(t); haze(sk ? '#f0e4c8' : '#a8806a', 0.12); });
    lay(1, () => { foreRocks(t); cat(); });
    lay(0.6, () => ashFall(t));
  };
  DIR.volcano = {
    outfit: 'vulcan', light: { side: 1, rim: '#ffa060' }, grade: ['#c86a3a', 0.16],
    act: () => [[S0.volcano, 'awe'], [EV.volc_ash, 'proud'], [EV.volc_but, 'suspicious'], [EV.volc_sleep - 0.05, 'shock']],
    pose: (t, u, b) => Object.assign(b, { x: 250, y: 1600, s: 0.85, look: t < EV.volc_but ? [0.6, -0.5] : [0.4, -0.2], point: t > EV.volc_hills && t < EV.volc_but ? 1 : undefined, hand: t > EV.volc_hills && t < EV.volc_but ? [140, -320] : undefined, tilt: t > EV.volc_sleep ? -0.06 : 0, tailUp: t > EV.volc_sleep }),
    cam: () => [[S0.volcano, 540, 900, -0.02], [EV.volc_hills + 0.3, 520, 1000, 0.04], [EV.volc_but, 560, 980, 0.06], [EV.volc_sleep, 520, 860, 0.16, 'x'], [S1.volcano, 520, 860, 0.2]],
    hud: t => { stamp(t, EV.volc_sleep + 0.1, 'truth', 760, 1300, -0.12, 0.8); if (t > EV.volc_sleep + 0.2) note('Колли Альбани: +2 мм в год', 640, 1440, t, EV.volc_sleep + 0.2, S1.volcano, '#f6ecd6', 40, -0.04); }
  };
  // ---------------------------------------------------------------- переход В сцену: облако пепла накрывает камеру и оседает
  TRANS_IN.volcano = { a: 0.25, b: 0.45, runA: 1, fx(k, t, A, B) {
    drawBuf(k < 0.45 ? A : B, k < 0.45 ? 1 + k * 0.3 : 1.1 - (k - 0.45) * 0.18);
    const c = k < 0.45 ? sm(k / 0.45) : 1 - sm((k - 0.45) / 0.55);
    scr(() => { for (let i = 0; i < 26; i++) { const r = rng(9540 + i), x = r() * W, y0 = r() * H, rr = 200 + r() * 360, y = k < 0.45 ? y0 + (1 - c) * 900 : y0 + (1 - c) * 1600;
      ell(x, y, rr * (0.6 + c), rr * 0.7 * (0.6 + c), { wash: i % 3 ? '#5a4a46' : '#8a7a70', washA: c * 0.95, line: false }); }
      screenFill('#3a2c28', c * 0.7); motes(80, [0, 0, W, H], '#d8c8b8', t, 9541, { sp: 300, sz: 4, a: c, tw: 0 }); });
  } };
})();
