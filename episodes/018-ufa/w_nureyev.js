/* 018 — сцена `nureyev`: 1950-е, балетный класс уфимского Дома пионеров / театра: станок, зеркало, рояль с аккомпаниатором,
   в окне — проходящий поезд (рождён в поезде). Худой мальчик-татарин в трико делает прыжок; девочки у станка. На «поезде»
   поезд за окном светится, на «Нуриев» — табличка «РУДОЛЬФ НУРИЕВ» и тень мальчика на стене превращается в силуэт танцовщика
   в большом прыжке. Том — советский костюм. Переход В сцену — поезд проносится. */
(() => {
  EV.nu_train = wtk('s6', 'поезде,');
  EV.nu_name = wtk('s6', 'Нуриев.');
  KEYW.push('поезде,', 'Нуриев.');

  function room(t) { vgrad(-900, 1600, ['#d8d0c4', '#e8e0d4'], 1);
    for (let q = 0; q < 3; q++) { const x = -360 + q * 520; const w = rect(x, 520, 360, 420, { wash: '#a8c8e0', washA: 1, w: 3, col: '#5a5048' }); ctx.save(); ctx.clip(w.path); vgrad(520, 940, ['#8ab8e0', '#e8f0e8'], 1); train(x - 900 + ((t * 300) % 1600), 900, 0.4, t, { lit: t > EV.nu_train, n: 5 }); ctx.restore(); pencil([[x + 180, 520], [x + 180, 940]], { w: 4, col: '#5a5048', pass2: false }); }
    rect(-600, 980, 2300, 300, { wash: '#c8d8e0', washA: 0.5, w: 2, col: '#7a8890' }); pencil([[-600, 1120], [1700, 1120]], { w: 10, col: '#8a6a42' }); for (let x = -500; x < 1700; x += 260) pencil([[x, 1120], [x, 1260]], { w: 6, col: '#6a4a2a', pass2: false }); }
  function dancers(t) {
    for (let i = 0; i < 3; i++) human(-150 + i * 160, 1290, 0.44, t, { body: '#f2f2f2', legs: '#e8c8c8', hair: '#5a3a1a', hat: 'bun', hatCol: '#5a3a1a', face: 'calm', armR: 'up', armL: 'point', long: true, seed: 18710 + i });
    const j = Math.max(0, Math.sin(t * 3.4)) * 120, jx = 760; human(jx, 1290 - j, 0.5, t, { body: '#2a2a32', legs: '#2a2a32', hair: '#c8a878', face: 'smile', armR: 'up', armL: 'up', seed: 18720 });
    if (t > EV.nu_name) { const k = sm((t - EV.nu_name) / 0.6); ctx.save(); ctx.globalAlpha = 0.35 * k; push(jx + 160, 1100, 1.4 * k + 0.01); sil([[-120, 0], [-40, -60], [0, -140], [30, -60], [140, -10], [40, -30], [10, 60], [-20, -20]], '#1a1a1e', 1); sil(ellPts(0, -170, 22, 24, 0, 0, 14), '#1a1a1e', 1); pop(); ctx.restore(); }
    push(1180, 1300, 0.6); rect(-150, -170, 300, 170, { wash: '#1a1a1e', washA: 1, w: 2, col: '#000' }); rect(-140, -190, 280, 30, { wash: '#f2f2f2', washA: 1, w: 1.4, col: '#000' }); for (let q = 0; q < 14; q++) pencil([[-140 + q * 20, -190], [-140 + q * 20, -170]], { w: 2, col: '#000', pass2: false }); pop();
    human(1180, 1310, 0.4, t, { body: '#6a4a5a', legs: '#2a2a2e', hair: '#d8d8d8', hat: 'bun', hatCol: '#d8d8d8', face: 'calm', armR: 'point', armL: 'point', long: true, seed: 18730, flip: -1 });
  }

  WORLD.nureyev = (t, u, cat) => {
    lay(8, () => room(t));
    lay(3, () => dancers(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#b8946a', washA: 1, w: 2, col: '#5a3a1a', a: 0.4 }); for (let x = -480; x < 1600; x += 60) pencil([[x, 1470], [x - 40, 2400]], { w: 2, col: '#8a6a42', a: 0.5, pass2: false }); cat(); });
    lay(0.7, () => motes(20, [0, 400, W, 1500], '#fff8e8', t, 18740, { sp: -6, sz: 2.5, a: 0.4, tw: 1, add: 1 }));
  };
  DIR.nureyev = {
    outfit: 'soviet', light: { side: 1, rim: '#fff4e0' }, grade: ['#b0a898', 0.06],
    act: () => [[S0.nureyev, 'grin'], [EV.nu_train, 'awe'], [EV.nu_name, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 270, y: 1480, s: 1.0, look: [0.6, -0.2], point: t > EV.nu_train && t < EV.nu_name ? 1 : undefined, hand: t > EV.nu_train && t < EV.nu_name ? [160, -420] : [120, -270] }),
    cam: () => [[S0.nureyev, 560, 1080, 0.04], [EV.nu_train, 560, 980, 0.06], [EV.nu_name, 700, 1140, 0.1], [S1.nureyev, 700, 1140, 0.12]],
    hud: t => { if (t > EV.nu_name) { const k = popK(t, EV.nu_name, 0.35); push(600, 760, k, -0.03); rect(-230, -60, 460, 120, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('РУДОЛЬФ НУРИЕВ', 0, -8, 40, { font: 'Osw', col: '#2a1a10' }); txt('родился в поезде, 1938', 0, 36, 24, { col: '#5a4a3a' }); pop(); } }
  };
  TRANS_IN.nureyev = { a: 0.25, b: 0.4, fx(k, t, A, B) {             // поезд проносится через кадр
    const q = sm(k), X = lerp(-1700, W + 200, q); drawBuf(A); const P = new Path2D(); P.rect(0, 0, Math.max(1, X + 1600), H); inPath(P, () => drawBuf(B, 1.04 - 0.04 * q));
    scr(() => train(X, 1400, 1.0, t, { n: 4 }));
  } };
})();
