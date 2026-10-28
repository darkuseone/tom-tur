/* 016 — сцена `barcino`: ≈ 10 г. до н. э., холм Табер у моря. Римская колония: стена с круглыми башнями и воротами, внутри
   колонны храма Августа, черепичные крыши; ветераны-легионеры с кирками и плугом размечают участки (центурия), торговая галера
   в бухте, гора Монжуик справа. На «Барцино» над воротами — надпись BARCINO, на «ветеранов» — HUD «колония для отставных
   легионеров: земля вместо пенсии». Том — римская туника и шлем. Переход В сцену — кадр собирается из мозаики. */
(() => {
  EV.bc_name = wtk('s1', 'Барцино');
  EV.bc_vet = wtk('s1', 'ветеранов.');
  KEYW.push('Барцино', 'ветеранов.');

  function sky(t) { vgrad(-900, 1000, ['#4a8ad8', '#a8d0f0', '#f6ecd4'], 1); ell(1250, 260, 80, 80, { wash: '#fff2c0', washA: 1, line: false }); glow(1250, 260, 280, 'rgba(255,240,180,1)', 0.45); for (let i = 0; i < 3; i++) { const x = ((i * 600 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 56, 210 + i * 90 + Math.sin(k) * 10, 76, 24, { wash: '#fbf8f0', washA: 0.85, line: false }); } }
  function far(t) {                                                    // море, Монжуик, галера
    sea(860, t, { h: 160 }); blob([[900, 870], [1050, 700], [1250, 660], [1500, 720], [1700, 870]], { wash: '#7a9a5a', washA: 1, w: 2, col: '#3a5a2a' });
    push(200 + Math.sin(t * 0.5) * 20, 960, 0.4); shape([[-260, -20], [240, -20], [280, -70], [-280, -60]], { wash: '#6a3a1e', washA: 1, w: 2, col: '#1a0a04' }); pencil([[0, -60], [0, -330]], { w: 7, col: '#3a2412' }); blob([[-110, -310], [110, -310], [120, -110], [-120, -110]], { wash: '#d8b070', washA: 1, w: 2, col: '#5a3a1a' }); for (let q = 0; q < 8; q++) pencil([[-200 + q * 55, -40], [-220 + q * 55 + Math.sin(t * 4 + q) * 10, 20]], { w: 4, col: '#5a3a1e', pass2: false }); pop();
  }
  function colony(t) {                                                 // стены, храм, крыши
    const g = shape([[-600, 1500], [-600, 1060], [1700, 1040], [1700, 1500]], { wash: '#c8b07a', washA: 1, w: 2, col: '#7a5a2a' }); hatch(g.path, g.bb, { gap: 11, a: 0.14, col: '#9a7a4a', ang: -0.3, w: 1.1 });
    for (let q = 0; q < 6; q++) { const x = -260 + q * 170; rect(x, 900, 140, 80, { wash: '#e8dcc0', washA: 1, w: 2, col: '#5a4a2a' }); poly([[x - 10, 900], [x + 150, 900], [x + 70, 860]], { wash: BC.terr, washA: 1, w: 2, col: '#5a2a1a' }); }
    push(560, 900); rect(-140, -40, 280, 40, { wash: '#efe6d0', washA: 1, w: 2, col: '#5a4a2a' }); for (let q = 0; q < 6; q++) { rect(-120 + q * 46, -200, 22, 160, { wash: '#f2ece0', washA: 1, w: 1.6, col: '#5a4a2a' }); } poly([[-150, -200], [150, -200], [0, -270]], { wash: '#e8dcc0', washA: 1, w: 2, col: '#5a4a2a' }); pop();
    romanWall(-500, 1600, 1100, 150, t, { gate: 560 });
    if (t > EV.bc_name) { const k = popK(t, EV.bc_name, 0.3); push(560, 920, k); rect(-130, -30, 260, 60, { wash: '#efe6d0', washA: 1, w: 2, col: '#5a4a2a' }); txt('BARCINO', 0, 12, 40, { font: 'Osw', col: '#5a1a10' }); pop(); }
    for (let i = 0; i < 4; i++) { const x = -150 + i * 300, y = 1300 + (i % 2) * 20; human(x, y, 0.46, t, { body: '#a8302a', bodyD: '#5a0e0a', legs: '#c8a878', hair: '#3a2210', beard: i % 2 ? 'short' : null, hat: 'helmet', hatCol: '#c8963a', face: t > EV.bc_vet ? 'smile' : 'calm', armR: Math.sin(t * 5 + i) > 0 ? 'up' : 'point', armL: 'hold', prop: i % 2 ? 'axe' : 'spear', seed: 16210 + i, flip: i % 2 ? -1 : 1 }); }
    for (let q = 0; q < 6; q++) { const x = 120 + q * 80; pencil([[x, 1390], [x, 1360]], { w: 4, col: '#c8a868', pass2: false }); } pencil([[120, 1374], [520, 1374]], { w: 1.6, col: '#c8a868', a: 0.7, pass2: false });
  }

  WORLD.barcino = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(14, () => far(t));
    lay(4, () => colony(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#b8a070', washA: 1, w: 2, col: '#5a4a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#6a5a2a', ang: 0.1, w: 1.2 }); cat(); });
    lay(0.7, () => motes(30, [-200, 900, 1300, 1900], '#f6e8c0', t, 16220, { sp: -10, vx: 20, sz: 3, a: 0.35, wob: 30 }));
  };
  DIR.barcino = {
    outfit: 'roman', light: { side: 1, rim: '#fff0c8' }, grade: ['#c8a870', 0.08],
    act: () => [[S0.barcino, 'proud'], [EV.bc_name, 'grin'], [EV.bc_vet, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1480, s: 1.0, look: [0.6, -0.3], point: t > EV.bc_name && t < EV.bc_vet ? 1 : undefined, hand: t > EV.bc_name && t < EV.bc_vet ? [200, -330] : [120, -270] }),
    cam: () => [[S0.barcino, 560, 1060, 0.06], [EV.bc_name, 580, 1040, 0.1], [EV.bc_vet, 560, 1100, 0.06], [S1.barcino, 560, 1100, 0.1]],
    hud: t => { if (t > EV.bc_vet) { const k = popK(t, EV.bc_vet, 0.35); push(620, 760, k, 0.03); rect(-240, -66, 480, 132, { wash: '#efe6d0', washA: 0.97, w: 3, col: '#5a4a2a' }); txt('КОЛОНИЯ ВЕТЕРАНОВ', 0, -12, 38, { font: 'Osw', col: '#5a1a10' }); txt('земля вместо пенсии', 0, 36, 26, { col: '#2a1a10' }); pop(); } }
  };
  TRANS_IN.barcino = { a: 0.3, b: 0.45, fx(k, t, A, B) {             // кадр собирается из мозаики
    drawBuf(A); const q = sm(k), r = rng(16230), N = 14, M = 24, cw = W / N, ch = H / M;
    const P = new Path2D(); for (let i = 0; i < N; i++) for (let j = 0; j < M; j++) { const d = r() * 0.6; if (q > d) P.rect(i * cw, j * ch, cw + 1, ch + 1); } inPath(P, () => drawBuf(B, 1.04 - 0.04 * q));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI); for (let i = 0; i <= N; i++) pencil([[i * cw, 0], [i * cw, H]], { w: 2, col: '#3a2a1a', a: 0.5 * f, pass2: false }); for (let j = 0; j <= M; j++) pencil([[0, j * ch], [W, j * ch]], { w: 2, col: '#3a2a1a', a: 0.5 * f, pass2: false }); });
  } };
})();
