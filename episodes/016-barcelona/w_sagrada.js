/* 016 — сцена `sagrada`: 1882, пустырь на окраине Эшампле. Сетка кварталов Серды ещё полупустая, огороды, ветряк; на пустыре
   закладывают первый камень крипты — епископ, гости в цилиндрах, рабочие; молодой Гауди с чертежом. На «закладывают» камень
   опускается на канатах, на «Гауди» над ним всплывает свиток-чертёж с силуэтом будущих башен, на «торопится» — HUD с цитатой.
   Том — сюртук и цилиндр. Переход В сцену — чертёж разворачивается на весь кадр. */
(() => {
  EV.sa_lay = wtk('s4', 'закладывают');
  EV.sa_g = wtk('s4', 'Гауди,');
  EV.sa_q = wtk('s4', 'торопится');
  KEYW.push('Саграду.', 'торопится');

  function sky(t) { vgrad(-900, 1000, ['#6a9ad8', '#b8d8f0', '#f6ecd4'], 1); for (let i = 0; i < 3; i++) { const x = ((i * 600 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 56, 210 + i * 90 + Math.sin(k) * 10, 76, 24, { wash: '#fbf8f0', washA: 0.85, line: false }); } }
  function lot(t) {                                                    // пустырь, редкие дома, ветряк, закладка
    const g = shape([[-600, 1500], [-600, 1040], [1700, 1030], [1700, 1500]], { wash: '#c8b884', washA: 1, w: 2, col: '#7a6a3a' }); hatch(g.path, g.bb, { gap: 11, a: 0.14, col: '#8a7a4a', ang: -0.3, w: 1.1 });
    for (let k = 0; k < 5; k++) { const x = -520 + k * 520 + (k % 2) * 80; rect(x, 1040 - 220, 200, 220, { wash: ['#e8d0b0', '#f0dcc0', '#d8c4a8'][k % 3], washA: 1, w: 2, col: '#4a3a2a' }); for (let j = 0; j < 3; j++) rect(x + 40, 850 + j * 60, 40, 40, { wash: '#4a6a8a', washA: 1, w: 1.4, col: '#1a1a1a' }); }
    for (let x = -560; x < 1700; x += 260) pencil([[x, 1060], [x + 200, 1060]], { w: 3, col: '#a8987a', a: 0.6, pass2: false });
    push(1300, 1040); pencil([[0, 0], [0, -300]], { w: 8, col: '#6a5a4a' }); const a = t * 2; for (let q = 0; q < 4; q++) { push(0, -300, 1, a + q * 1.57); blob([[0, 0], [20, -10], [140, -20], [140, 10]], { wash: '#e8e4dc', washA: 1, w: 1.6, col: '#4a4a4a' }); pop(); } pop();
    rect(380, 1180, 360, 60, { wash: '#8a7458', washA: 1, w: 2, col: '#3a2a14' }); const drop = t > EV.sa_lay ? sm((t - EV.sa_lay) / 0.8) : 0; const sy = lerp(900, 1130, drop);
    pencil([[560, 700], [520, sy - 40]], { w: 2, col: '#3a2a1a', pass2: false }); pencil([[560, 700], [600, sy - 40]], { w: 2, col: '#3a2a1a', pass2: false }); pencil([[480, 700], [640, 700]], { w: 10, col: '#6a4424' }); for (const px of [480, 640]) pencil([[px, 700], [px + (px < 560 ? -60 : 60), 1180]], { w: 8, col: '#6a4424' });
    rect(500, sy - 50, 120, 50, { wash: BC.stone, washA: 1, w: 2.4, col: '#4a3a24' }); if (drop >= 1) txt('1882', 560, sy - 14, 24, { font: 'Osw', col: '#5a1a10' });
    human(380, 1300, 0.5, t, { body: '#7a1e2a', legs: '#7a1e2a', hair: '#e8e4dc', hat: 'merchant', hatCol: '#7a1e2a', face: 'calm', armR: 'up', armL: 'hold', long: true, seed: 16510 });
    for (let i = 0; i < 3; i++) human(780 + i * 150, 1310, 0.48, t, { body: '#2a2a32', legs: '#2a2a2e', hair: '#3a2210', beard: i === 1 ? 'long' : 'short', hat: 'merchant', hatCol: '#141414', face: t > EV.sa_q ? 'smile' : 'calm', armR: 'hold', armL: 'hold', seed: 16511 + i, flip: -1 });
    human(1250, 1330, 0.5, t, { body: '#4a4a52', legs: '#3a3a40', hair: '#c8a878', beard: 'short', face: 'smile', armR: 'point', armL: 'hold', prop: 'scroll', seed: 16515, flip: -1 }); txt('Гауди', 1250, 1360, 22, { font: 'Osw', col: '#2a1a10' });
  }

  WORLD.sagrada = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(5, () => lot(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#b8a874', washA: 1, w: 2, col: '#5a4a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#6a5a2a', ang: 0.1, w: 1.2 }); cat(); });
    lay(0.7, () => { if (t > EV.sa_g) { const k = popK(t, EV.sa_g, 0.4); push(760, 1060, k * 0.62, -0.03); rect(-250, -260, 500, 380, { wash: '#e8dcc0', washA: 0.95, w: 3, col: '#3a5a8a' }); ctx.save(); ctx.globalAlpha = 0.85; for (const [px, h] of [[-160, 200], [-100, 240], [100, 240], [160, 200], [0, 330]]) poly([[px - 20, 90], [px, 90 - h], [px + 20, 90]], { wash: null, w: 2.4, col: '#2a4a7a' }); ctx.restore(); txt('проект · 18 башен', 0, -224, 26, { font: 'Osw', col: '#2a4a7a' }); pop(); } });
  };
  DIR.sagrada = {
    outfit: 'victorian', light: { side: 1, rim: '#fff0d0' }, grade: ['#c0a878', 0.06],
    act: () => [[S0.sagrada, 'proud'], [EV.sa_lay, 'awe'], [EV.sa_g, 'wink'], [EV.sa_q - 0.03, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 270, y: 1480, s: 1.0, look: [0.6, -0.3], point: t > EV.sa_lay && t < EV.sa_g ? 1 : undefined, hand: t > EV.sa_lay && t < EV.sa_g ? [220, -300] : [120, -270] }),
    cam: () => [[S0.sagrada, 560, 1080, 0.06], [EV.sa_lay, 580, 1100, 0.08], [EV.sa_g, 580, 1040, 0.04], [EV.sa_q, 560, 1060, 0.06], [S1.sagrada, 560, 1060, 0.08]],
    hud: t => { if (t > EV.sa_q) { const k = popK(t, EV.sa_q, 0.35); push(560, 1180, k, 0.02); rect(-300, -56, 600, 112, { wash: '#2a1a10', washA: 0.92, w: 3, col: '#000' }); txt('«МОЙ ЗАКАЗЧИК', 0, -10, 38, { font: 'Osw', col: '#f2ece0' }); txt('НЕ ТОРОПИТСЯ»', 0, 34, 38, { font: 'Osw', col: '#ffd24a' }); pop(); } }
  };
  TRANS_IN.sagrada = { a: 0.3, b: 0.45, fx(k, t, A, B) {             // чертёж раскатывается снизу вверх
    const q = sm(k), Y = lerp(H + 100, -200, q); drawBuf(A); const P = new Path2D(); P.rect(0, Math.max(0, Y + 60), W, H); inPath(P, () => drawBuf(B, 1.04 - 0.04 * q));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI); rect(0, Y - 40, W, 100, { wash: '#2a4a7a', washA: f, w: 3, col: '#0a1a3a', a: f }); for (let x = 30; x < W; x += 80) pencil([[x, Y - 30], [x + 40, Y + 50]], { w: 2, col: '#e8f0ff', a: 0.6 * f, pass2: false }); ell(-20, Y + 10, 50, 50, { wash: '#e8dcc0', washA: f, w: 2, col: '#5a4a2a', a: f }); ell(W + 20, Y + 10, 50, 50, { wash: '#e8dcc0', washA: f, w: 2, col: '#5a4a2a', a: f }); });
  } };
})();
