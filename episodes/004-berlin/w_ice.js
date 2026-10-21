/* 004 — сцена `ice`: −20 000 лет. Край Скандинавского ледника над будущим Берлином: синяя стена льда со слоями грязи и трещинами,
   в её подошве — гигантский розовый гранитный валун (Маркграфский камень, ≈700 т), лёд толкает его вперёд по тундре.
   Справа — талая река (будущая долина Шпрее) и мамонты вдали. Указатель «← СКАНДИНАВИЯ». На «Запомни его» Том ставит мелом метку на камне
   (она вернётся на Гранитной чаше 1831). Переход сюда — падение сквозь метель. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.ice_land = S0.ice + 0.35;                   // приземление после падения сквозь метель
  EV.ice_scand = wt('s1', 'Скандинавии');        // указатель вспыхивает
  EV.ice_grind = wt('s1', 'семьсот');            // лёд с рёвом толкает валун
  EV.ice_mark = wt('s1', 'Запомни');             // мелом метка на камне
  SHAKES.push([EV.ice_land, 0.25, 8], [EV.ice_grind, 0.5, 12]);
  KEYW.push('семьсот', 'Запомни');

  function woolly(x, y, s, t, trump) {                              // шерстистый мамонт мордой влево: купол головы, горб, длинная шерсть, бивни-спирали
    push(x, y, s); const C = '#6a3e22', CD = '#2e1a0c', CL = '#a8703e', ph = t * 2.4;
    for (let k = 0; k < 4; k++) { const lx = -120 + k * 80, sw = Math.sin(ph + k * 1.7) * 8; const l = blob([[lx - 30, -150], [lx + 30, -150], [lx + 26 + sw, 0], [lx - 30 + sw, 0]], { wash: k % 2 ? CD : C, washA: 1, w: 2.6, col: '#120804' }); ell(lx + sw - 2, -2, 32, 9, { wash: '#2a1a0c', washA: 1, w: 1.4 }); }
    const body = blob([[-170, -230], [-130, -380], [-40, -420], [60, -380], [180, -320], [230, -220], [210, -110], [-160, -100]], { wash: C, washA: 1, w: 3.4, col: '#120804', key: 7990 });
    fstr(body.path, body.bb, 300, 1.5, 36, CD, 0.55, 7991, 3); fstr(body.path, body.bb, 120, 1.55, 30, CL, 0.45, 7992, 2);
    for (let k = 0; k < 24; k++) { const xx = -160 + k * 16; pencil([[xx, -116], [xx + Math.sin(t * 2 + k) * 4, -60 - (k % 3) * 10]], { w: 4, col: CD, pass2: false }); }
    const head = blob([[-150, -250], [-200, -330], [-180, -440], [-110, -470], [-60, -420], [-80, -300], [-120, -230]], { wash: C, washA: 1, w: 3.2, col: '#120804', key: 7993 }); fstr(head.path, head.bb, 90, 1.4, 22, CD, 0.5, 7994, 3);
    blob([[-110, -400], [-70, -410], [-64, -330], [-100, -320]], { wash: CD, washA: 0.95, w: 2, col: '#120804' });
    const tr = trump > 0 ? [[-190, -290], [-240, -330], [-270, -400 - trump * 40], [-250, -460 - trump * 50]] : [[-190, -290], [-226, -200], [-214 + Math.sin(t * 1.5) * 8, -110], [-190 + Math.sin(t * 1.5) * 12, -60]];
    const tp = shape(tubeP(spline(tr, false, 8), 48, 20), { wash: C, washA: 1, w: 2.8, col: '#120804' });
    for (const dz of [0, 14]) { const tk = spline([[-170 + dz, -270], [-250 + dz, -230], [-310 + dz, -290], [-300 + dz, -370], [-250 + dz, -390]], false, 10); pencil(tk, { w: 20 - dz * 0.4, col: '#efe4c8' }); pencil(tk, { w: 2.2, col: '#3a2a14', pass2: false }); }
    ell(-150, -380, 7, 6, { wash: '#0a0604', washA: 1, w: 1.2 });
    if (trump > 0) for (let k = 0; k < 3; k++) { const u = (t * 2 + k / 3) % 1; pencil(ellPts(-250, -480 - trump * 50, 30 + u * 120, 20 + u * 60, -0.4, 0.3, 20).slice(0, 12), { w: 3, col: '#f6ecd6', a: (1 - u) * trump, pass2: false }); }
    pop();
  }
  const BX = 760, BY = 1470;
  const push_ = t => 26 * sm(clamp((t - EV.ice_grind) / 0.7)) + (t - S0.ice) * 6;   // смещение льда и камня вперёд
  function sky(t) {
    vgrad(-700, 1500, ['#6a7e9e', '#9cb0c8', '#dae4ec', '#f2f0ea'], 1);
    glow(900, 760, 360, 'rgba(255,240,210,1)', 0.45); ell(900, 760, 60, 60, { wash: '#fff8e8', washA: 0.85, line: false });
    for (const [x, y, s, sd] of [[180, 400, 1.6, 11], [760, 300, 1.8, 12], [420, 620, 1.1, 13]]) cloudB(x + t * 10, y, s, '#e8eef4', 0.8, sd);
  }
  function farIce(t) {                                               // горизонт: ледниковый щит уходит на север (влево), дымка
    const P = [[-400, 1300]]; for (let x = -400; x <= 700; x += 40) P.push([x, 980 + Math.sin(x * 0.01) * 20 + (x + 400) * 0.18]); P.push([700, 1300]);
    const p = shape(P, { wash: '#dfe8f0', washA: 1, w: 2, col: '#6a7a8a', a: 0.6, key: 8300 }); hatch(p.path, p.bb, { gap: 10, a: 0.12, col: '#7a8aa0', ang: 0.2, key: 8301 });
    const T = [[600, 1300]]; for (let x = 600; x <= 1500; x += 60) T.push([x, 1210 + Math.sin(x * 0.02) * 10]); T.push([1500, 1300]); shape(T, { wash: '#9a9a78', washA: 1, w: 1.6, col: '#5a5a40', a: 0.5 });
    woolly(940, 1240, 0.22, t, 0); woolly(1060, 1250, 0.18, t + 1, 0); woolly(1160, 1236, 0.15, t + 2, 0);
    haze('#e8eef4', 0.25);
  }
  function river(t) {                                                // талая река в долине (будущая Шпрее)
    const P = [[620, 1300], [800, 1290], [1100, 1300], [1500, 1320], [1500, 1400], [1100, 1380], [800, 1350], [600, 1330]];
    const rp = blob(P, { wash: '#7ab0c8', washA: 1, w: 1.8, col: '#3a5a6a', a: 0.6, key: 8310 }); shadeG(rp.path, 0, 1290, 0, 1400, '#c8e4f0', 0.5);
    for (let k = 0; k < 8; k++) { const ph = (t * 0.5 + k / 8) % 1, x = 640 + ph * 860; pencil([[x, 1318 + k % 3 * 14], [x + 40, 1320 + k % 3 * 14]], { w: 2, col: '#f4fbff', a: 0.7 * Math.sin(ph * Math.PI), pass2: false }); }
  }
  function iceWall(t) {                                              // фронт ледника: слои, грязевые полосы, синие трещины, капель
    const dx = push_(t), top = x => 540 + Math.sin(x * 0.013) * 40 + (x > 620 ? Math.pow(x - 620, 1.25) * 1.6 : 0);
    push(dx, 0, 1);
    const P = [[-300, 1480]]; for (let x = -300; x <= 1200; x += 40) P.push([x, Math.min(1480, top(x))]); P.push([1200, 1480]);
    const ip = shape(P, { wash: '#bcd8ea', washA: 1, w: 3, col: '#2a4a6a', key: 8320 });
    ctx.save(); ctx.clip(ip.path); const g = ctx.createLinearGradient(0, 500, 0, 1480); g.addColorStop(0, '#eef6fc'); g.addColorStop(0.5, '#9cc8e4'); g.addColorStop(1, '#4a86b4'); ctx.fillStyle = g; ctx.fillRect(-400, 400, 1900, 1100);
    for (let k = 0; k < 7; k++) { const y = 660 + k * 115 + Math.sin(k * 3) * 30, P2 = []; for (let x = -300; x <= 1200; x += 60) P2.push([x, Math.min(y + Math.sin(x * 0.006 + k * 1.7) * 40 + Math.sin(x * 0.02 + k) * 10, top(x) + 1000)]); pencil(P2, { w: k % 3 === 0 ? 7 : 2.4, col: k % 3 === 0 ? '#6a5a4a' : '#5a8ab0', a: k % 3 === 0 ? 0.45 : 0.5, pass2: false }); }
    const r = rng(8321); for (let k = 0; k < 9; k++) { const x = -240 + k * 120 + r() * 70, y0 = top(x) + 120 + r() * 320, len = 120 + r() * 260, w = 8 + r() * 16, bend = (r() - 0.5) * 60;
      const cr = poly([[x - w, y0], [x + w, y0], [x + bend * 0.5 + 2, y0 + len * 0.6], [x + bend, y0 + len]], { wash: '#1e4a7a', washA: 0.8, w: 1.6, col: '#0e2a4a', a: 0.7 }); pencil([[x + w, y0], [x + bend * 0.5 + 4, y0 + len * 0.6]], { w: 2.4, col: '#f0faff', a: 0.8, pass2: false }); }
    for (let k = 0; k < 6; k++) { const x0 = -260 + r() * 900, y = 600 + r() * 700; pencil([[x0, y], [x0 + 60 + r() * 120, y + (r() - 0.5) * 30], [x0 + 140 + r() * 160, y + (r() - 0.5) * 40]], { w: 2, col: '#3a6a9a', a: 0.45, pass2: false }); }
    for (let k = 0; k < 40; k++) { const x = -280 + r() * 1600, y = 700 + r() * 700; ell(x, y, 3 + r() * 9, 2 + r() * 5, { wash: '#5a4a3a', washA: 0.6, line: false }); }
    rays(700, 300, 1.6, 0.5, 1200, 'rgba(255,255,255,1)', 0.12, 5, t);
    ctx.restore();
    for (let x = -280; x < 1300; x += 46) { const y = 1470, h = 30 + (x * 7 % 50); poly([[x, y - 6], [x + 22, y - 6], [x + 11, y + h * 0]], { wash: '#e8f4fc', washA: 1, w: 1.4, col: '#3a6a8a' }); }
    for (let k = 0; k < 6; k++) { const x = 40 + k * 220, ph = (t * 1.5 + k * 0.3) % 1; ell(x, 1100 + ph * 360, 3, 6, { wash: '#e0f4ff', washA: 1 - ph, line: false }); }
    pop();
  }
  function boulder(t) {                                              // розовый гранит: полевой шпат, кварц, слюда; меловая метка
    const dx = push_(t); push(BX + dx, BY, 1);
    ell(0, 4, 330, 30, { wash: '#000000', washA: 0.25, line: false });
    const P = [[-300, 0], [-334, -110], [-290, -250], [-200, -350], [-70, -420], [80, -430], [210, -370], [300, -260], [330, -110], [306, 0]];
    const bp = shape(P, { wash: '#a6807a', washA: 1, w: 3.4, col: '#2a1610', key: 8330 }); shadeG(bp.path, 320, -100, -200, -300, '#4a2a26', 0.6); shadeG(bp.path, 0, -430, 0, -250, '#e6cec4', 0.35);
    for (const [F, c, a] of [[[[-70, -420], [80, -430], [40, -300], [-110, -290]], '#c8a69a', 0.55], [[[210, -370], [300, -260], [330, -110], [180, -150], [140, -300]], '#5a3a34', 0.4], [[[-290, -250], [-200, -350], [-110, -290], [-160, -120], [-300, -110]], '#b8928a', 0.35]]) poly(F, { wash: c, washA: a, w: 1.6, col: '#3a1e18', a: 0.5 });
    ctx.save(); ctx.clip(bp.path); const r = rng(8331);
    for (let k = 0; k < 320; k++) { const x = -320 + r() * 650, y = -430 + r() * 430, kind = r(); if (kind < 0.35) poly([[x, y], [x + 6 + r() * 6, y + r() * 4], [x + 4, y + 5 + r() * 5]], { wash: '#d8907e', washA: 0.8, line: false }); else if (kind < 0.6) ell(x, y, 2 + r() * 4, 2 + r() * 3, { wash: '#efe8e0', washA: 0.8, line: false, rot: r() * 3 }); else if (kind < 0.85) ell(x, y, 2 + r() * 4, 2 + r() * 3, { wash: '#2a2420', washA: 0.85, line: false }); else ell(x, y, 3, 3, { wash: '#fff8f0', washA: 1, line: false }); }
    hatch(bp.path, bp.bb, { gap: 7, a: 0.16, col: '#3a1a14', ang: -0.7, key: 8332, w: 1.3 });
    pencil([[-200, -300], [-150, -200], [-170, -80]], { w: 3, col: '#3a1a14', a: 0.6, pass2: false }); pencil([[120, -380], [90, -280], [140, -160], [110, -40]], { w: 3, col: '#3a1a14', a: 0.5, pass2: false });
    for (let k = 0; k < 6; k++) { const x = -260 + k * 100; poly([[x, -404 + Math.abs(x) * 0.12], [x + 60, -410 + Math.abs(x) * 0.12], [x + 50, -380], [x + 10, -380]], { wash: '#f4fbff', washA: 0.9, w: 1.4, col: '#6a8aa0' }); }
    ctx.restore();
    const mk = clamp((t - EV.ice_mark - 0.1) / 0.5); if (mk > 0) { pencil([[-80, -260], [20, -260]].map((p, i) => i ? [lerp(-80, 20, mk), -258] : p), { w: 9, col: '#f6e8b8', a: 0.95, pass2: false }); if (mk > 0.4) pencil([[-30, -260], [-30, lerp(-260, -150, clamp((mk - 0.4) / 0.6))]], { w: 9, col: '#f6e8b8', a: 0.95, pass2: false }); }
    if (t > EV.ice_grind && t < EV.ice_grind + 1) { const k = (t - EV.ice_grind); const r2 = rng(hsh(FRAME, 8333)); for (let i = 0; i < 20; i++) ell(-320 - r2() * 80, -r2() * 60, 6 + r2() * 10, 5, { wash: '#8a7a6a', washA: 1 - k, w: 1, col: '#3a2a1a', a: 1 - k }); }
    pop();
  }
  function tundra(t) {                                               // галька, мох, лужи талой воды
    const p = rect(-300, 1440, 1700, 600, { wash: '#a49a7a', washA: 1, line: false }); shadeG(p.path, 0, 2000, 0, 1440, '#5a5240', 0.45);
    const r = rng(8340); for (let k = 0; k < 120; k++) { const x = -200 + r() * 1500, y = 1450 + r() * 520, s = 4 + r() * 16 * (y - 1400) / 500; ell(x, y, s, s * 0.6, { wash: ['#8a8070', '#b8aa94', '#6a6458', '#c8907a'][k % 4], washA: 1, w: 1.2, col: '#2a2418', a: 0.6 }); }
    for (const [x, y, w] of [[120, 1620, 160], [880, 1700, 220]]) { const pp = ell(x, y, w, 22, { wash: '#a8c8d8', washA: 0.9, w: 1.6, col: '#3a5a6a' }); pencil([[x - w * 0.5, y - 4], [x + w * 0.2, y - 6]], { w: 2, col: '#f4fbff', a: 0.7, pass2: false }); }
    push(120, 1480, 1, -0.06); rect(-6, -240, 12, 240, { wash: '#7a5a3a', washA: 1, w: 2, col: '#2a1a0a' }); const k = popK(t, EV.ice_scand, 0.35);
    poly([[-190, -250], [130, -250], [130, -180], [-190, -180], [-230, -215]], { wash: '#c8a46a', washA: 1, w: 2.4, col: '#2a1a0a' }); txt('СКАНДИНАВИЯ', -30, -214, 34, { font: 'Osw', col: '#2a1a0a' }); txt('≈500 км', -30, -160, 30, { font: 'Hand', col: '#2a1a0a' });
    if (t > EV.ice_scand) glow(-30, -215, 200, 'rgba(255,220,150,1)', 0.4 * (1 - clamp((t - EV.ice_scand) / 0.8))); ell(-70, -254, 40, 10, { wash: '#f4f8fc', washA: 1, w: 1.2, col: '#8aa0b0' }); pop();
  }
  function snow(t, a) { motes(60, [-100, -200, 1200, 2000], '#ffffff', t, 8350, { sp: 160, vx: -140, sz: 5, a, tw: 1, stretch: 2 }); }

  WORLD.ice = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(9, () => farIce(t));
    lay(5, () => river(t));
    lay(1.7, () => iceWall(t));
    lay(1, () => { tundra(t); boulder(t); const dx = push_(t); push(dx, 0, 1); const tg = blob([[BX + 90, 1475], [BX + 120, 1200], [BX + 220, 1060], [BX + 460, 1010], [BX + 600, 1475]], { wash: '#a8d0ea', washA: 1, w: 3, col: '#2a4a6a', key: 8380 }); shadeG(tg.path, BX + 120, 0, BX + 500, 0, '#e8f6ff', 0.5); hatch(tg.path, tg.bb, { gap: 9, a: 0.18, col: '#3a6a9a', ang: -0.6, key: 8381 }); pencil([[BX + 200, 1120], [BX + 260, 1300], [BX + 240, 1470]], { w: 4, col: '#1e4a7a', a: 0.6, pass2: false }); pop(); cat(); snow(t, 0.8); });
    lay(0.6, () => { snow(t + 3, 1); const D = [[-200, 2000]]; for (let x = -200; x <= 1300; x += 50) D.push([x, 1900 + Math.sin(x * 0.012) * 40 + Math.sin(x * 0.05) * 8]); D.push([1300, 2000]); const dp = shape(D, { wash: '#f2f6fa', washA: 1, w: 2.4, col: '#7a90a4', key: 8382 }); shadeG(dp.path, 0, 1860, 0, 2000, '#b8c8d8', 0.5); });
  };
  DIR.ice = {
    outfit: 'fur', light: { side: 1, rim: '#e8f4ff' }, grade: ['#4a7ab8', 0.26],
    act: () => [[S0.ice, 'scared'], [EV.ice_land + 0.15, 'cold'], [EV.ice_scand, 'awe'], [EV.ice_grind, 'shock'], [EV.ice_mark, 'wink']],
    pose: (t, u, b) => Object.assign(b, {
      x: 330, y: GY, s: 1.02, look: t > EV.ice_grind && t < EV.ice_mark ? [0.8, -0.2] : t > EV.ice_mark + 0.3 ? [0.1, 0] : [0.5, -0.1],
      frost: 1, chatter: t < EV.ice_scand ? 1 : 0, squash: b.squash + (t < EV.ice_land + 0.2 && t > EV.ice_land ? 0.12 : 0),
      hand: t > EV.ice_mark - 0.1 ? [180, -260] : t > EV.ice_grind && t < EV.ice_mark ? [-110, -320] : undefined, point: t > EV.ice_mark - 0.1 ? 1 : undefined, tailUp: t > EV.ice_grind && t < EV.ice_mark
    }),
    cam: () => [[S0.ice, 540, 400, -1.4], [EV.ice_land, 500, 1060, 0.04, 'x'], [EV.ice_grind, 600, 1080, 0.1], [EV.ice_mark, 520, 1060, 0.14], [S1.ice, 470, 1080, 0.18]],
    hud: t => { if (t > EV.ice_grind + 0.1) note('≈700 тонн', 760, 820, t, EV.ice_grind + 0.1, S1.ice, '#2a1a10', 64, -0.04); }
  };

  // ---------------------------------------------------------------- переход В ледник: падение сквозь метель (снег летит вверх, белая вспышка)
  TRANS_IN.ice = { a: 0.15, b: 0.42, fx(k, t, A, B) {
    const q = sm(k); drawBuf(A, 1 + q * 0.8, 540, 960, 1 - q); drawBuf(B, 1, 540, 960, sm((k - 0.25) / 0.5));
    scr(() => { const r = rng(hsh(FRAME, 8370)); for (let i = 0; i < 120; i++) { const x = r() * W, y = r() * H, len = 60 + r() * 260 * (1 - Math.abs(k - 0.5) * 1.6); pencil([[x, y], [x + 8, y - len]], { w: 2 + r() * 5, col: '#ffffff', a: 0.75 * (1 - Math.abs(k - 0.5) * 1.4), pass2: false, gap: false }); } });
    whiteOut(0.9 * Math.max(0, 1 - Math.abs(k - 0.4) * 3.2), '240,246,252');
  } };
})();
