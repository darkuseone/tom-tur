/* 004 — сцена `twins`: 1237. Два городка-двойняшки на Шпрее: Кёлльн (слева, церковь Св. Петра) и Берлин (справа, Св. Николая),
   между ними деревянный мост с торговцами. Фахверк, красные крыши, частокол, мельница, барки и утки на реке, аисты.
   На «Москвы» — заметка «Москва 1147 · Берлин 1237», на «двойняшкой» обе колокольни получают детские чепчики. Переход сюда — ледник тает: трещины, капель, вода уносит кадр. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.twins_moscow = wt('s2', 'Москвы');          // заметка с датами
  EV.twins_90 = wt('s2', 'девяносто');           // «−90 лет» штампом
  EV.twins_twin = wt('s2', 'двойняшкой!');       // чепчики на колокольнях — «пуп-пуп»
  SHAKES.push([EV.twins_twin + 0.05, 0.2, 5]);
  KEYW.push('девяносто', 'двойняшкой!');

  function sky(t) {
    vgrad(-700, 1400, ['#5aa0d8', '#8ec4e8', '#d8ecf0', '#f6ecd0'], 1);
    glow(220, 420, 380, 'rgba(255,240,200,1)', 0.45);
    for (const [x, y, s, sd] of [[260, 300, 1.3, 21], [820, 420, 1.6, 22], [560, 160, 1.0, 23]]) cloudB(x + t * 8, y, s, '#ffffff', 0.85, sd);
    for (let k = 0; k < 2; k++) { const x = (300 + k * 380 + t * 50) % 1300 - 100, y = 560 + k * 60 + Math.sin(t * 2 + k) * 10, f = Math.sin(t * 6 + k) * 18;   // аисты
      pencil([[x - 40, y + f], [x, y], [x + 40, y + f]], { w: 4, col: '#f4f0e6', pass2: false }); pencil([[x - 40, y + f], [x - 54, y + f + 6]], { w: 4, col: '#1a1a1a', pass2: false }); pencil([[x + 40, y + f], [x + 54, y + f + 6]], { w: 4, col: '#1a1a1a', pass2: false }); pencil([[x, y], [x + 26, y - 4]], { w: 3, col: '#d8402a', pass2: false }); }
  }
  function far(t) {
    hills(1180, 60, '#8aaa6a', 3.1, 1); hills(1230, 40, '#6a8e4a', 1.7, 1);
    for (let k = 0; k < 14; k++) { const x = -150 + k * 105, y = 1190 + Math.sin(k * 2.3) * 14; ell(x, y - 26, 34, 40, { wash: '#4a7a3a', washA: 0.9, w: 1.2, col: '#1c3010', a: 0.4 }); }
    push(1010, 1170, 0.55); rect(-30, -150, 60, 150, { wash: '#c8a878', washA: 1, w: 2, col: '#3a2a1a' }); poly([[-40, -150], [40, -150], [0, -210]], { wash: '#7a3a2a', washA: 1, w: 2, col: '#3a1a0a' });
    push(0, -160, 1, t * 1.2); for (let q = 0; q < 4; q++) { push(0, 0, 1, q * Math.PI / 2); rect(-8, -150, 16, 150, { wash: '#e8dcc0', washA: 0.9, w: 1.6, col: '#3a2a1a' }); pop(); } pop(); pop();
    haze('#e8f0f0', 0.25);
  }
  function house(x, base, w, h, wall, roof, seed) {                  // фахверковый дом: балки, окошки, крутая крыша, дымок
    const L = '#2a1a0c', wp = rect(x - w / 2, base - h, w, h, { wash: wall, washA: 1, w: 2.2, col: L, key: seed }); shadeG(wp.path, x + w / 2, 0, x - w / 4, 0, '#8a6a4a', 0.3);
    for (const fx of [-0.5, -0.17, 0.17, 0.5]) pencil([[x + fx * w, base - h], [x + fx * w, base]], { w: 5, col: '#5a3a1e', pass2: false });
    pencil([[x - w / 2, base - h * 0.55], [x + w / 2, base - h * 0.55]], { w: 5, col: '#5a3a1e', pass2: false }); pencil([[x - w / 2, base - h * 0.55], [x - w * 0.17, base - h]], { w: 4, col: '#5a3a1e', pass2: false }); pencil([[x + w / 2, base - h * 0.55], [x + w * 0.17, base - h]], { w: 4, col: '#5a3a1e', pass2: false });
    rect(x - w * 0.12, base - h * 0.4, w * 0.24, h * 0.4, { wash: '#4a2a14', washA: 1, w: 1.6, col: L }); for (const fx of [-0.34, 0.34]) rect(x + fx * w - 10, base - h * 0.85, 20, 22, { wash: '#2a2a3a', washA: 0.9, w: 1.4, col: L });
    const rp = poly([[x - w / 2 - 14, base - h], [x + w / 2 + 14, base - h], [x, base - h - w * 0.95]], { wash: roof, washA: 1, w: 2.4, col: L, key: seed + 1 }); hatch(rp.path, rp.bb, { gap: 7, a: 0.22, col: '#3a1408', ang: 0.2, key: seed + 2, w: 1.2 });
    rect(x + w * 0.18, base - h - w * 0.7, 14, 36, { wash: '#8a4a2a', washA: 1, w: 1.4, col: L });
  }
  function church(x, base, s, t, spire, bonnet, seed) {              // кирпичная церковь: неф, стрельчатые окна, башня со шпилем; bonnet 0..1 — детский чепчик
    const L = '#2a140a'; push(x, base, s);
    const nv = rect(-160, -180, 240, 180, { wash: '#b85a3a', washA: 1, w: 2.4, col: L, key: seed }); shadeG(nv.path, 80, 0, -100, 0, '#6a2a14', 0.3); poly([[-176, -180], [96, -180], [-40, -290]], { wash: '#6a3a2a', washA: 1, w: 2.2, col: L });
    for (let k = 0; k < 3; k++) { const wx = -130 + k * 70; blob([[wx, -40], [wx, -120], [wx + 14, -146], [wx + 28, -120], [wx + 28, -40]], { wash: '#2a3a5a', washA: 1, w: 1.6, col: L }); }
    const tw = rect(70, -380, 110, 380, { wash: '#c0643e', washA: 1, w: 2.6, col: L, key: seed + 1 }); shadeG(tw.path, 180, 0, 90, 0, '#6a2a14', 0.45);
    for (let y = -360; y < 0; y += 22) pencil([[72, y], [178, y]], { w: 1, col: '#7a3a1e', a: 0.4, pass2: false, gap: false });
    blob([[105, -300], [105, -340], [125, -360], [145, -340], [145, -300]], { wash: '#1a1a2a', washA: 1, w: 1.6, col: L }); blob([[115, -140], [115, -200], [125, -214], [135, -200], [135, -140]], { wash: '#1a1a2a', washA: 1, w: 1.4, col: L });
    const sp = poly([[60, -380], [190, -380], [125, -380 - spire]], { wash: '#3a5a4a', washA: 1, w: 2.4, col: L, key: seed + 2 }); shadeG(sp.path, 190, 0, 110, 0, '#1a2a20', 0.5);
    pencil([[125, -380 - spire], [125, -420 - spire]], { w: 4, col: '#c8a040', pass2: false }); pencil([[110, -405 - spire], [140, -405 - spire]], { w: 4, col: '#c8a040', pass2: false });
    if (bonnet > 0) { push(125, -300 - spire * 0.55, bonnet * 1.4); const b = blob([[-96, 40], [-100, -40], [-60, -110], [0, -130], [60, -110], [100, -40], [96, 40], [60, 0], [0, -20], [-60, 0]], { wash: '#fbf6ee', washA: 1, w: 2.4, col: '#6a5a4a' });
      for (let q = 0; q < 12; q++) { const a = Math.PI * 1.05 + q / 11 * Math.PI * 0.9; ell(Math.cos(a) * 100, Math.sin(a) * 110 + 20, 14, 10, { wash: '#ffffff', washA: 1, w: 1.2, col: '#8a7a6a' }); }
      for (const sd of [-1, 1]) pencil([[sd * 90, 30], [sd * 70, 110], [sd * 40, 150]], { w: 8, col: sd < 0 ? '#e88aa0' : '#8ab0e8', pass2: false }); pop(); }
    pop();
  }
  function town(t, side) {                                           // берег: дома, частокол, церковь
    const isL = side < 0, base = 1250, bk = popK(t, EV.twins_twin + (isL ? 0 : 0.12), 0.4) * (t > EV.twins_twin + (isL ? 0 : 0.12) ? 1 : 0);
    const P = [[isL ? -300 : 640, base], [isL ? 440 : 1400, base], [isL ? 440 : 1400, base + 60], [isL ? -300 : 640, base + 60]]; shape(P, { wash: '#8a7a4a', washA: 1, w: 2, col: '#3a2a14' });
    church(isL ? 150 : 870, base, 0.92, t, isL ? 300 : 220, bk, isL ? 8400 : 8410);
    const xs = isL ? [-160, -40, 320, 400] : [700, 1040, 1150, 1260], r = rng(isL ? 8420 : 8421);
    xs.forEach((x, i) => house(x, base, 100 + r() * 30, 110 + r() * 40, ['#efe2c2', '#e8d4a8', '#f2e6cc'][i % 3], ['#b8442a', '#a8382a', '#c45a34'][i % 3], (isL ? 8430 : 8450) + i * 3));
    for (let x = isL ? -300 : 640; x < (isL ? 440 : 1400); x += 18) poly([[x, base + 10], [x + 14, base + 10], [x + 14, base - 46], [x + 7, base - 60], [x, base - 46]], { wash: '#7a5a34', washA: 1, w: 1.4, col: '#2a1a0a' });
    for (let k = 0; k < 3; k++) { const ph = (t * 0.4 + k / 3) % 1, sx = (isL ? 60 : 980) + k * 120; ell(sx + ph * 40, base - 260 - ph * 160, 16 + ph * 30, 12 + ph * 20, { wash: '#d8d4cc', washA: 0.5 * (1 - ph), line: false }); }
    txt(isL ? 'КЁЛЛЬН' : 'БЕРЛИН', isL ? 90 : 960, base + 36, 34, { font: 'Osw', col: '#f6ecd0' });
  }
  function river(t) {                                                // Шпрее: блики, барка, утки
    const rp = rect(-300, 1300, 1700, 1100, { wash: '#4a8aa8', washA: 1, line: false }); shadeG(rp.path, 0, 1300, 0, 1700, '#9ccce0', 0.4);
    for (let k = 0; k < 22; k++) { const x = ((k * 97 + t * 40) % 1600) - 200, y = 1320 + (k * 37) % 300; pencil([[x, y], [x + 40 + (k % 3) * 20, y]], { w: 2.4, col: '#e8f6ff', a: 0.6, pass2: false, gap: false }); }
    push(180 + Math.sin(t * 0.6) * 20, 1400, 1); const bp = blob([[-140, -10], [140, -10], [120, 30], [-120, 30]], { wash: '#6a4424', washA: 1, w: 2.4, col: '#2a1608' }); for (let q = -2; q <= 2; q++) ell(q * 40, -26, 22, 18, { wash: '#c8a46a', washA: 1, w: 1.6, col: '#3a2a10' });
    human(110, -10, 0.42, t, { body: '#6a6a4a', legs: '#3a3a2a', hat: 'hood', hatCol: '#5a4a2a', armR: 'up', prop: 'stick', propAng: -0.6, seed: 91 }); pop();
    for (let k = 0; k < 3; k++) { const x = 820 + k * 70 + Math.sin(t + k) * 10, y = 1480 + k * 12; ell(x, y, 22, 10, { wash: '#8a6a3a', washA: 1, w: 1.4, col: '#2a1a0a' }); ell(x + 18, y - 12, 9, 8, { wash: k ? '#8a6a3a' : '#2a6a3a', washA: 1, w: 1.2, col: '#2a1a0a' }); poly([[x + 26, y - 12], [x + 36, y - 10], [x + 26, y - 8]], { wash: '#e8a030', washA: 1, line: false }); }
  }
  function bridge(t) {                                               // деревянный мост: настил, сваи, перила (дальние)
    const deck = rect(-300, 1440, 1700, 60, { wash: '#8a5a32', washA: 1, w: 2.4, col: '#2a1608', key: 8460 }); for (let x = -300; x < 1400; x += 34) pencil([[x, 1442], [x + 4, 1498]], { w: 1.6, col: '#4a2a12', a: 0.6, pass2: false, gap: false });
    for (let x = -260; x < 1400; x += 180) { rect(x, 1500, 26, 200, { wash: '#5a3a1e', washA: 1, w: 2, col: '#1c0e04' }); ell(x + 13, 1700, 30, 8, { wash: '#e8f6ff', washA: 0.4, line: false }); }
    pencil([[-300, 1340], [1400, 1340]], { w: 9, col: '#6a4424', pass2: false }); for (let x = -280; x < 1400; x += 90) pencil([[x, 1340], [x, 1440]], { w: 7, col: '#6a4424', pass2: false });
  }
  function people(t) {
    human(-10, 1450, 0.82, t, { body: '#6a4a8a', legs: '#3a2a2a', hat: 'merchant', hatCol: '#3a2a6a', beard: 'short', hair: '#4a2a14', face: t > EV.twins_twin ? 'grin' : 'calm', armR: 'hold', prop: 'stick', seed: 92 });
    human(150, 1452, 0.78, t, { body: '#a8402a', legs: '#3a2a2a', hat: 'bonnet', face: t > EV.twins_twin ? 'shock' : 'smile', armL: 'hold', armR: t > EV.twins_twin ? 'point' : 'hold', seed: 93, long: 1 });
    human(860, 1452, 0.8, t, { body: '#5a5a5a', legs: '#2a2a2a', hat: 'hood', hatCol: '#4a4a4a', face: 'calm', armR: 'hold', prop: 'scroll', seed: 94, long: 1, flip: -1 });
    human(990, 1456, 0.84, t, { body: '#3a6a3a', legs: '#4a3a2a', hat: 'chaperon', hatCol: '#a8302a', face: t > EV.twins_twin ? 'grin' : 'calm', armR: t > EV.twins_moscow ? 'wave' : 'down', seed: 95, flip: -1 });
    push(1090, 1450, 0.9); ell(0, 0, 40, 8, { wash: '#000', washA: 0.2, line: false }); blob([[-40, -30], [-30, -60], [20, -64], [40, -40], [30, -20], [-30, -16]], { wash: '#f4f0e6', washA: 1, w: 2, col: '#3a2a1a' }); pencil([[30, -56], [44, -96], [56, -100]], { w: 7, col: '#f4f0e6', pass2: false }); poly([[56, -104], [74, -98], [56, -94]], { wash: '#e8a030', washA: 1, w: 1.2 }); for (const lx of [-10, 10]) pencil([[lx, -18], [lx, 0]], { w: 3, col: '#e8a030', pass2: false }); pop();
  }
  function rail(t) { pencil([[-300, 1560], [1400, 1560]], { w: 16, col: '#7a4c28', pass2: false }); pencil([[-300, 1552], [1400, 1552]], { w: 3, col: '#c8905a', a: 0.7, pass2: false }); for (let x = -280; x < 1400; x += 150) rect(x, 1560, 22, 300, { wash: '#6a4424', washA: 1, w: 2, col: '#1c0e04' }); }

  WORLD.twins = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(10, () => far(t));
    lay(3.2, () => { town(t, -1); town(t, 1); });
    lay(2, () => river(t));
    lay(1, () => { bridge(t); people(t); cat(); });
    lay(0.7, () => rail(t));
  };
  DIR.twins = {
    outfit: 'burgher', light: { side: -1, rim: '#fff0c8' }, grade: ['#e8a850', 0.2],
    act: () => [[S0.twins, 'proud'], [EV.twins_moscow, 'smug'], [EV.twins_90, 'proud'], [EV.twins_twin, 'laugh']],
    pose: (t, u, b) => Object.assign(b, {
      x: 540, y: GY, s: 1.0, look: t > EV.twins_twin ? [0, -0.6] : t > EV.twins_moscow ? [0.2, 0] : [-0.4, -0.2],
      hand: t > EV.twins_twin ? [-130, -330] : t > EV.twins_moscow && t < EV.twins_twin ? [120, -280] : undefined, handF: t > EV.twins_twin ? [130, -330] : undefined,
      point: t > EV.twins_moscow && t < EV.twins_twin ? 1 : undefined, tilt: t > EV.twins_twin ? Math.sin(t * 10) * 0.04 : 0, squash: b.squash
    }),
    cam: () => [[S0.twins, 540, 900, -0.12], [S0.twins + 0.7, 540, 1000, 0.04], [EV.twins_twin - 0.1, 540, 1010, 0.08], [EV.twins_twin + 0.4, 540, 900, -0.02], [S1.twins, 540, 920, 0.04]],
    hud: t => { if (t > EV.twins_moscow) { note('Москва — 1147', 300, 760, t, EV.twins_moscow, S1.twins, '#2a1a10', 54, -0.04); note('Берлин — 1237', 790, 820, t, EV.twins_moscow + 0.3, S1.twins, '#2a1a10', 54, 0.03); }
      if (t > EV.twins_90) { const k = popK(t, EV.twins_90, 0.35); push(560, 680, 1.2 - 0.2 * k, -0.12); txt('−90 ЛЕТ', 0, 0, 80, { font: 'Osw', col: '#c8302a', a: 0.9 * k }); pencil([[-170, -50], [170, -50], [170, 50], [-170, 50], [-170, -50]], { w: 6, col: '#c8302a', a: 0.8 * k, pass2: false }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В 1237: ледник тает — трещины, капель, вода уносит кадр вниз
  TRANS_IN.twins = { a: 0.3, b: 0.45, fx(k, t, A, B) {
    drawBuf(B, 1.05 - 0.05 * k, 540, 960);
    const c = sm(clamp(k / 0.35)), m = sm(clamp((k - 0.3) / 0.7)), wl = lerp(-100, 2100, m);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(0, wl, W, H); ctx.clip(); for (let i = 4; i >= 0; i--) drawBuf(A, 1, 540, 960, i ? 0.2 : 1, null, 0, m * 500 + i * 30 * m); ctx.restore();
    scr(() => { const r = rng(8470); for (let i = 0; i < 14; i++) { let x = 540 + (r() - 0.5) * 200, y = 900 + (r() - 0.5) * 200; const P = [[x, y]]; const a = r() * 6.283; for (let j = 0; j < 8; j++) { x += Math.cos(a + (r() - 0.5)) * 90 * c; y += Math.sin(a + (r() - 0.5)) * 90 * c; P.push([x, y]); } if (wl < 1900) pencil(P.filter(p => p[1] > wl), { w: 5, col: '#eaf8ff', a: 0.9, pass2: false }); }
      const P = []; for (let x = -20; x <= W + 20; x += 30) P.push([x, wl + Math.sin(x * 0.03 + t * 10) * 14]); if (m > 0 && m < 1) { pencil(P, { w: 8, col: '#bfe4f4', a: 0.9, pass2: false, gap: false }); const r2 = rng(hsh(FRAME, 8471)); for (let i = 0; i < 26; i++) ell(r2() * W, wl - r2() * 120, 6, 10, { wash: '#d8f0fc', washA: 0.8, line: false }); } });
  } };
})();
