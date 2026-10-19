/* 004 — сцена `pantheon`: ≈125 г. Портик Пантеона: 8 гранитных колонн, фронтон, надпись M·AGRIPPA·L·F·COS·TERTIVM·FECIT, за ним купол
   в лесах, рабочие с лебёдкой и корзинами бетона. Адриан (первый бородатый император) с чертежом. На «Агриппа» надпись подсвечивается,
   на «Враньё» Том с лесов перечёркивает «AGRIPPA» и пишет мелом «HADRIANVS», рядом заметка «≈25 до н. э. → ≈125 г.».
   Том — римский строитель (туника, пилеус, киянка). Переход В сцену: Spider-Verse провал с неба сквозь окулус купола. */
(() => {
  EV.pn_agr = WT('s6', '«Агриппа».');
  EV.pn_lie = WT('s6', 'Враньё');
  EV.pn_hadr = WT('s6', 'Адриан,');
  EV.pn_cent = WT('s6', 'полтора');
  SHAKES.push([EV.pn_lie, 0.2, 6]);
  KEYW.push('«Агриппа».', 'Враньё', 'Адриан,');

  function dome(t) {                                                 // купол за портиком: ступенчатые кольца, леса, лебёдка, рабочие
    const D = spline([[-120, 900], [0, 700], [250, 600], [540, 570], [830, 600], [1080, 700], [1200, 900]], false, 10);
    const d = shape(D.concat([[1200, 1000], [-120, 1000]]), { wash: '#c8c0b0', washA: 1, w: 2.6, col: '#3a3024', key: 9960 }); shadeG(d.path, 1200, 0, 300, 0, '#7a7064', 0.45); hatch(d.path, d.bb, { gap: 9, a: 0.1, col: '#4a4034', ang: 0.2 });
    for (let r = 0; r < 4; r++) pencil(D.map(([x, y]) => [x, y + 60 + r * 50]).filter(([x]) => x > 60 + r * 40 && x < 1020 - r * 40), { w: 2.4, col: '#7a7064', a: 0.7, pass2: false });
    ell(540, 576, 70, 12, { wash: '#2a2420', washA: 1, w: 2 });
    for (let x = 120; x < 980; x += 70) pencil([[x, 1000], [x, 640 + Math.abs(x - 540) * 0.25]], { w: 3, col: '#7a5a34', pass2: false }); for (let y = 700; y < 1000; y += 70) pencil([[100, y], [980, y]], { w: 2.4, col: '#7a5a34', a: 0.8, pass2: false });
    push(860, 600, 1); pencil([[0, 0], [0, -200], [-140, -120]], { w: 7, col: '#6a4424', pass2: false }); const bob = Math.sin(t * 1.4) * 30; pencil([[-140, -120], [-140, 40 + bob]], { w: 2, col: '#3a2a1a', pass2: false }); rect(-170, 40 + bob, 60, 40, { wash: '#8a6a3a', washA: 1, w: 1.6 }); pop();
    for (const [x, y, sd] of [[300, 640, 960], [700, 610, 961], [480, 590, 962]]) human(x, y, 0.32, t, { body: '#b49a6c', legs: '#8a7454', hair: '#3a2a1a', face: 'smile', armR: 'swing', armL: 'hold', seed: sd });
  }
  function portico(t) {                                              // портик: фронтон, фриз с надписью, колонны, ступени
    const glowA = clamp((t - EV.pn_agr) / 0.3) * (1 - clamp((t - EV.pn_lie) / 0.3));
    poly([[60, 900], [540, 700], [1020, 900]], { wash: '#e6dcc4', washA: 1, w: 2.8, col: '#3a3024', key: 9970, shade: { gap: 8, a: 0.12, col: '#5a4a30' } }); poly([[130, 886], [540, 728], [950, 886]], { wash: '#d8ccb0', washA: 1, w: 2, col: '#3a3024' });
    const fr = rect(40, 900, 1000, 110, { wash: '#efe6d0', washA: 1, w: 2.6, col: '#3a3024', key: 9971 }); rect(40, 1000, 1000, 24, { wash: '#d8ccb0', washA: 1, w: 2, col: '#3a3024' });
    if (glowA) glow(540, 955, 520, 'rgba(255,230,140,1)', 0.5 * glowA);
    txt('M·AGRIPPA·L·F·COS·TERTIVM·FECIT', 540, 958, 50, { font: 'Osw', col: '#3a2a14' });
    const cr = clamp((t - EV.pn_lie) / 0.35); if (cr > 0) { pencil([[150, 962], [150 + 250 * cr, 950]], { w: 10, col: '#c8241e', pass2: false }); }
    const wr = clamp((t - EV.pn_hadr) / 0.5); if (wr > 0) txt('HADRIANVS!', 300, 870, 54, { font: 'Hand', col: '#c8241e', rot: -0.06, reveal: wr });
    for (let q = 0; q < 8; q++) column(110 + q * 123, 1440, 420, 34, { cap: 'cor', col: q % 2 ? '#a8a0a0' : '#b8b0ae', flute: false, key: 9980 + q });
    for (let q = 0; q < 4; q++) rect(20 - q * 20, 1440 + q * 20, 1040 + q * 40, 20, { wash: '#d8ccb0', washA: 1, w: 1.8, col: '#3a3024' });
    for (let q = 0; q < 7; q++) { const x = 172 + q * 123; rect(x, 1100, 60, 340, { wash: '#2a2420', washA: 0.5, line: false }); }
  }
  function scaffold(t) {                                             // леса у фриза, на которых стоит Том
    for (const x of [700, 1000]) pencil([[x, 1500], [x, 1000]], { w: 9, col: '#7a5a34', pass2: false }); pencil([[680, 1040], [1020, 1040]], { w: 14, col: '#8a6a3a', pass2: false }); pencil([[700, 1500], [1000, 1040]], { w: 5, col: '#7a5a34', pass2: false });
    for (let y = 1080; y < 1500; y += 50) pencil([[960, y], [1010, y]], { w: 4, col: '#6a4424', pass2: false }); pencil([[960, 1040], [960, 1500]], { w: 5, col: '#6a4424', pass2: false });
    push(760, 1040, 1); rect(-30, -60, 60, 60, { wash: '#7a5a34', washA: 1, w: 1.8, col: '#2a1608' }); ell(0, -62, 30, 8, { wash: '#c8c0b0', washA: 1, w: 1.4 }); pop();
  }
  function hadrian(t) {                                              // Адриан с бородой и чертежом купола
    human(260, 1560, 1.1, t, { body: '#e8dcc4', toga: '#6e1a52', stripe: '#d6a842', long: 1, hair: '#5a4a3a', beard: 'short', hat: 'laurel', face: t > EV.pn_lie ? 'grin' : 'calm', armL: 'hold', armR: t > EV.pn_hadr ? 'up' : 'hold', prop: 'scroll', look: 0.5, seed: 990 });
    txt('АДРИАН', 260, 1600, 32, { font: 'Hand', col: '#2a1a0a' });
    human(60, 1580, 0.95, t, { body: '#b49a6c', legs: '#8a7454', hair: '#2a1a10', face: 'shock', armL: 'hold', armR: 'point', look: 0.6, seed: 991 });
  }
  WORLD.pantheon = (t, u, cat) => {
    lay(40, () => { vgrad(-900, 1100, ['#3a7ab8', '#8ab8dc', '#e8e4d4', '#f2dcb0']); glow(900, 200, 380, 'rgba(255,246,220,1)', 0.6); for (let k = 0; k < 3; k++) { const x = (k * 520 + t * 10) % 1800 - 300; for (let q = 0; q < 5; q++) ell(x + q * 52, 220 + k * 120 - Math.sin(q / 4 * Math.PI) * 26, 46, 26, { wash: '#fbf6ea', washA: 0.85, w: 1, col: '#b8a888', a: 0.25 }); } });
    lay(12, () => { hills(1000, 80, '#8a9a6a', 3.3, 0.8); cypress(-60, 1000, 0.5, 9990); umbrellaPine(1180, 1000, 0.5, 9992); haze('#f2dcb0', 0.15); });
    lay(5, () => { dome(t); haze('#f2dcb0', 0.06); });
    lay(2.4, () => { portico(t); });
    lay(1.3, () => { scaffold(t); });
    lay(1, () => { const g = poly([[-400, 1520], [1500, 1520], [1500, 2400], [-400, 2400]], { wash: '#b8ac94', washA: 1, w: 2, col: '#3a3024', key: 9995 }); for (let k = 0; k < 24; k++) { const r = rng(9996 + k), x = -400 + r() * 1900, y = 1540 + r() * 400; poly([[x, y], [x + 110, y - 4], [x + 116, y + 46], [x + 4, y + 50]], { wash: '#c8bca4', washA: 1, w: 1.6, col: '#5a4a34' }); }
      for (const [x, y] of [[520, 1640], [600, 1700]]) { push(x, y, 1); rect(-60, -50, 120, 50, { wash: '#e8e0cc', washA: 1, w: 2, col: '#3a3024' }); pop(); }
      hadrian(t); cat(); });
    motes(26, [0, 400, W, 1700], '#f0e6d0', t, 9997, { sp: 10, sz: 3, a: 0.5, tw: 1 });
  };
  DIR.pantheon = {
    outfit: 'faber', light: { side: 1, rim: '#ffe6b0' }, grade: ['#c8a060', 0.08],
    act: () => [[S0.pantheon, 'neutral'], [EV.pn_agr, 'suspicious'], [EV.pn_lie, 'smug'], [EV.pn_hadr, 'grin'], [EV.pn_cent, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 850, y: 1040, s: 0.62, prop: t > EV.pn_lie - 0.1 && t < EV.pn_cent ? 'brush' : 'mallet', hand: t > EV.pn_lie - 0.1 && t < EV.pn_cent ? [-110, -330] : [80, -210], look: t < EV.pn_cent ? [-0.7, -0.1] : [0, 0], point: t > EV.pn_lie - 0.1 && t < EV.pn_cent ? 1 : undefined, tailUp: t > EV.pn_hadr }),
    cam: () => [[S0.pantheon, 540, 1060, -0.06], [EV.pn_agr, 520, 980, 0.04], [EV.pn_lie, 620, 1000, 0.1, 'x'], [EV.pn_cent, 560, 1120, 0.0], [S1.pantheon, 560, 1140, 0.02]],
    hud: t => { stamp(t, EV.pn_lie + 0.1, 'myth', 760, 1300, -0.1, 0.85); if (t > EV.pn_cent - 0.2) note('Агриппа ≈25 до н. э. → Адриан ≈125 г.', 520, 1420, t, EV.pn_cent - 0.2, S1.pantheon, '#2a1a0a', 38, -0.03); }
  };
  // ---------------------------------------------------------------- переход В сцену: провал с неба сквозь окулус
  TRANS_IN.pantheon = { a: 0.35, b: 0.35, runA: 1, fx(k, t, A, B) {
    if (k < 0.3) { const q = sm(k / 0.3); drawBuf(A, 1 + q * 0.4, 540, 600); scr(() => screenFill('#bcd8ea', q)); return; }
    const q = sm((k - 0.3) / 0.7), z = Math.pow(16, q);
    scr(() => { screenFill('#bcd8ea', 1); push(540, 960, 0.6 * z);
      ell(0, 0, 900, 900, { wash: '#c8c0b0', washA: 1, w: 3, col: '#3a3024' }); for (let r = 1; r < 6; r++) pencil(ellPts(0, 0, 900 - r * 130, 900 - r * 130, 0, 0.02, 80), { w: 3, col: '#7a7064', a: 0.8, pass2: false });
      for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283; pencil([[Math.cos(a) * 140, Math.sin(a) * 140], [Math.cos(a) * 880, Math.sin(a) * 880]], { w: 2, col: '#7a7064', a: 0.5, pass2: false }); }
      pop(); });
    const R = 0.6 * z * 130; inCircle(540, 960, R, () => drawBuf(B, 1.3 - 0.3 * q)); ringFX(540, 960, R, t, ['#fff6dc', '#e8d8b0', '#c8b890'], clamp(1.2 - q) * 0.6);
  } };
})();
