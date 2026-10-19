/* 004 — сцена `silk`: XIII век, караван-сарай на Шёлковом пути у подножия Алатау (Алмату — торговая станция между Самаркандом и Кашгаром).
   Двор: арка с изразцами, верблюды под тюками, купцы, весы, ковры. На «шёлк» разворачивается рулон алого шёлка;
   на «семечки» из прорехи в мешке сыплются яблочные семечки, мешок подписан «ШЁЛК»; на «Контрабанда!» — красный штамп. Том — караванщик в чапане.
   Переход В сцену: песчаная буря сдувает кадр. */
(() => {
  EV.sl_silk = wtw('s3', 'шёлк.');
  EV.sl_seeds = wtw('s3', 'семечки.');
  EV.sl_contra = wtw('s3', 'Контрабанда!');
  KEYW.push('шёлк.', 'семечки.', 'Контрабанда!');
  SHAKES.push([EV.sl_contra + 0.05, 0.2, 7]);

  function camel(x, y, s, t, k, flip = 1) {                             // двугорбый верблюд с тюками
    const ch = Math.sin(t * 2 + k) * 4, L = '#2a1608', C = ['#c8a070', '#b08858', '#d8b888'][k % 3], CD = lerpC(C, '#000000', 0.35);
    push(x, y, s, 0, flip); ell(0, 6, 130, 16, { wash: '#000000', washA: 0.2, line: false });
    for (const lx of [-80, -50, 60, 90]) { pencil([[lx, -150], [lx + 4, -70], [lx, 0]], { w: 14, col: CD }); ell(lx + 4, -2, 12, 6, { wash: CD, washA: 1, line: false }); }
    const b = blob([[-120, -150], [-110, -230], [-60, -250], [-40, -320], [0, -250], [30, -250], [60, -320], [90, -250], [130, -220], [130, -150], [0, -130]], { wash: C, washA: 1, w: 2.6, col: L, key: 9301 + k }); fstr(b.path, b.bb, 40, 1.2, 18, CD, 0.35, 9302 + k); shadeG(b.path, 0, -130, 0, -260, CD, 0.4);
    shape(tubeP([[120, -200], [170, -260], [190, -340], [230, -360]], 50, 34), { wash: C, washA: 1, w: 2.4, col: L });
    push(240, -364 + ch, 1); blob([[-20, -20], [40, -26], [70, 0], [60, 20], [-10, 20]], { wash: C, washA: 1, w: 2.2, col: L }); ell(14, -10, 4, 4, { wash: L, washA: 1, line: false }); pencil([[56, 8], [70, 6]], { w: 2, pass2: false }); ell(-6, -24, 8, 12, { wash: C, washA: 1, w: 1.6, col: L }); pop();
    for (const [bx, by, c] of [[-40, -330, '#a8241e'], [50, -330, '#2a4a8a']]) { const p = rect(bx - 60, by - 50, 120, 100, { wash: c, washA: 1, w: 2.2, col: L }); hatch(p.path, p.bb, { gap: 6, a: 0.25, col: '#1a0a06', ang: 0.8 }); for (let q = 0; q < 3; q++) pencil([[bx - 60, by - 30 + q * 30], [bx + 60, by - 30 + q * 30]], { w: 3, col: '#d6a842', a: 0.8, pass2: false }); }
    blob([[-90, -250], [0, -270], [100, -250], [80, -210], [-80, -210]], { wash: '#d6a842', washA: 1, w: 2, col: L });
    for (let q = 0; q < 5; q++) ell(-80 + q * 40, -206, 6, 9, { wash: '#a8241e', washA: 1, w: 1, col: L });
    pop();
  }
  function serai(t) {                                                    // стены караван-сарая, портал-айван с изразцами
    const w = rect(-200, 820, 1500, 500, { wash: '#d8b884', washA: 1, w: 2.4, col: '#5a3a1a', key: 9310 }); hatch(w.path, w.bb, { gap: 10, a: 0.12, col: '#7a5a2a', ang: 0.2, key: 9311 });
    for (let yy = 840; yy < 1320; yy += 26) for (let xx = -200 + ((yy / 26) % 2) * 26; xx < 1300; xx += 52) pencil([[xx, yy], [xx + 48, yy]], { w: 1, col: '#9a7a4a', a: 0.4, pass2: false });
    const px = 540, a = blob([[px - 220, 1320], [px - 220, 700], [px + 220, 700], [px + 220, 1320]], { wash: '#c8a874', washA: 1, w: 2.6, col: '#5a3a1a' });
    const arch = blob([[px - 140, 1320], [px - 140, 960], [px - 100, 860], [px, 800], [px + 100, 860], [px + 140, 960], [px + 140, 1320]], { wash: '#3a2a20', washA: 1, w: 2.4, col: '#2a1a0a' });
    ctx.save(); ctx.clip(a.path); for (let k = 0; k < 16; k++) { const xx = px - 210 + (k % 8) * 54, yy = k < 8 ? 720 : 760; rect(xx, yy, 50, 34, { wash: k % 2 ? '#2a6a9a' : '#3aa0b0', washA: 1, w: 1.4, col: '#1a3a4a' }); ell(xx + 25, yy + 17, 9, 9, { wash: '#f2e6c8', washA: 1, w: 1, col: '#1a3a4a' }); } ctx.restore();
    pencil([[px - 140, 960], [px - 100, 860], [px, 800], [px + 100, 860], [px + 140, 960]], { w: 10, col: '#2a7a9a', a: 0.8 });
    glow(px, 1200, 150, 'rgba(255,200,120,1)', 0.25);
    for (const xx of [-120, 1000]) { rect(xx, 760, 160, 80, { wash: '#c8a874', washA: 1, w: 2, col: '#5a3a1a' }); for (let q = 0; q < 4; q++) rect(xx + 10 + q * 38, 730, 26, 30, { wash: '#c8a874', washA: 1, w: 1.6, col: '#5a3a1a' }); }
  }
  function carpets(t) { for (const [x, y, c1, c2] of [[-60, 1380, '#a8241e', '#d6a842'], [1060, 1370, '#2a4a8a', '#e8d8b0']]) { const sw = Math.sin(t * 1.5 + x) * 6; const p = poly([[x - 90, y - 300], [x + 90, y - 300 + sw], [x + 92, y], [x - 88, y + sw]], { wash: c1, washA: 1, w: 2, col: '#2a1608' }); ctx.save(); ctx.clip(p.path); for (let q = 0; q < 6; q++) poly([[x, y - 280 + q * 50], [x + 40, y - 255 + q * 50], [x, y - 230 + q * 50], [x - 40, y - 255 + q * 50]], { wash: c2, washA: 1, w: 1.2, col: '#2a1608' }); ctx.restore(); pencil([[x - 100, y - 304], [x + 100, y - 304]], { w: 6, col: '#6a4424' }); } }
  function merchants(t) {
    human(170, 1450, 0.95, t, { body: '#4a6a3a', trim: '#d6a842', legs: '#3a2a20', long: 1, hair: '#1a1a1a', beard: 'long', hat: 'scarf', hatCol: '#f2ece0', face: t > EV.sl_contra ? 'shock' : 'calm', armL: 'hold', armR: t > EV.sl_contra ? 'up' : 'point', look: 0.4, seed: 31 });
    human(980, 1440, 0.92, t, { body: '#6a2a4a', trim: '#e8c060', legs: '#3a2a20', long: 1, hair: '#2a1a10', beard: 'short', hat: 'merchant', hatCol: '#2a4a8a', face: t > EV.sl_seeds ? 'grin' : 'smile', armL: 'hold', armR: t > EV.sl_silk ? 'wave' : 'hold', look: -0.5, flip: -1, seed: 32 });
  }
  function scales(t) { push(330, 1480, 1); pencil([[0, 0], [0, -160]], { w: 6, col: '#6a4424' }); const tilt = Math.sin(t * 2) * 0.08; push(0, -160, 1, tilt); pencil([[-90, 0], [90, 0]], { w: 5, col: '#8a6a3a' }); for (const k of [-1, 1]) { pencil([[k * 90, 0], [k * 70, 60]], { w: 1.4, col: '#3a2a1a', pass2: false }); pencil([[k * 90, 0], [k * 110, 60]], { w: 1.4, col: '#3a2a1a', pass2: false }); ell(k * 90, 62, 34, 8, { wash: '#c89a4a', washA: 1, w: 1.6, col: '#5a3a10' }); } apple(-90, 44, 16, 0.2, { noLeaf: true }); ell(90, 52, 14, 8, { wash: '#e0b03a', washA: 1, w: 1.2, col: '#8a5a10' }); pop(); pop(); }
  function silkRoll(t) {                                                 // рулон алого шёлка разворачивается волной
    if (t < EV.sl_silk - 0.1) return; const k = sm((t - EV.sl_silk + 0.1) / 0.6), x0 = 480, y0 = 1080;
    const pts = [], pts2 = []; for (let i = 0; i <= 30; i++) { const u = i / 30 * k, x = x0 + u * 760, y = y0 - Math.sin(u * 6 + t * 3) * 30 - u * 40; pts.push([x, y - 70]); pts2.unshift([x, y + 70]); }
    const p = poly(pts.concat(pts2), { wash: '#d8282a', washA: 0.95, w: 2.2, col: '#6a0a10' }); const g = ctx.createLinearGradient(0, y0 - 80, 0, y0 + 80); g.addColorStop(0, 'rgba(255,200,190,0.5)'); g.addColorStop(0.5, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(80,0,10,0.4)'); ctx.save(); ctx.fillStyle = g; ctx.fill(p.path); ctx.restore();
    ell(x0, y0, 30, 74, { wash: '#a81818', washA: 1, w: 2.2, col: '#4a0a10' });
  }
  function sack(t) {                                                    // мешок «ШЁЛК», из прорехи сыплются семечки
    push(700, 1560, 1); const p = blob([[-110, 0], [-120, -150], [-80, -220], [-40, -250], [40, -250], [80, -220], [120, -150], [110, 0]], { wash: '#c8b088', washA: 1, w: 2.6, col: '#3a2a14', key: 9320 }); hatch(p.path, p.bb, { gap: 5, a: 0.2, col: '#6a5030', ang: 0.8, key: 9321 }); hatch(p.path, p.bb, { gap: 5, a: 0.16, col: '#6a5030', ang: -0.8, key: 9322 });
    pencil([[-40, -250], [0, -270], [40, -250]], { w: 6, col: '#6a4424' }); txt('ШЁЛК', 0, -130, 48, { font: 'Osw', col: '#2a1a0a', rot: -0.05 });
    if (t > EV.sl_seeds - 0.1) { blob([[60, -80], [90, -60], [70, -40]], { wash: '#1a0e06', washA: 1, w: 1.6 }); for (let i = 0; i < 26; i++) { const r = rng(9330 + i), dt = (t - EV.sl_seeds + r() * 0.6) % 0.7, x = 80 + dt * 120 + r() * 20, y = -60 + dt * dt * 900; if (y < 20) ell(x, y, 5, 8, { wash: '#4a2a14', washA: 1, w: 1, col: '#1a0e06', rot: r() * 3 }); }
      for (let i = 0; i < 18; i++) { const r = rng(9340 + i); ell(110 + r() * 120, 6 - r() * 10, 5, 8, { wash: '#5a3418', washA: 1, w: 1, col: '#1a0e06', rot: r() * 3 }); }
      push(130, -300, popK(t, EV.sl_seeds + 0.1, 0.4)); ell(0, 0, 70, 70, { wash: '#e8f2f4', washA: 0.4, w: 6, col: '#6a4424' }); pencil([[50, 50], [110, 110]], { w: 14, col: '#6a4424' }); for (let q = 0; q < 3; q++) ell(-20 + q * 22, 0, 10, 16, { wash: '#4a2a14', washA: 1, w: 1.4, col: '#1a0e06', rot: q * 0.4 }); pop(); }
    if (t > EV.sl_contra) { push(-10, -60, 1.6 - popK(t, EV.sl_contra, 0.25) * 0.6, -0.2); ctx.save(); ctx.globalAlpha = 0.85; rect(-150, -40, 300, 80, { wash: 'rgba(0,0,0,0)', washA: 0, w: 6, col: '#c81818' }); txt('КОНТРАБАНДА', 0, 4, 44, { font: 'Osw', col: '#c81818' }); ctx.restore(); pop(); }
    pop();
  }
  function coinSign(t) { push(860, 1160, 1, 0.1); ell(0, 0, 44, 44, { wash: '#b8bcc0', washA: 1, w: 2.4, col: '#4a4a4a' }); txt('Алмату', 0, 4, 20, { font: 'Hand', col: '#3a3a3a' }); pop(); }

  WORLD.silk = (t, u, cat) => {
    lay(30, () => { vgrad(-600, 1100, ['#5a9ad0', '#bcd8e8', '#f6e2b0']); glow(200, 300, 340, 'rgba(255,240,200,1)', 0.5); });
    lay(18, () => { alatau(t, 900, { s: 0.95, key: 9350 }); haze('#f2e6c8', 0.16); });
    lay(6, () => { serai(t); haze('#f6e2b0', 0.06); });
    lay(2.4, () => { const g = poly([[-400, 1320], [1500, 1320], [1500, 2400], [-400, 2400]], { wash: '#d8b884', washA: 1, w: 2, col: '#6a4a1a', key: 9360 }); hatch(g.path, g.bb, { gap: 9, a: 0.12, col: '#7a5a2a', ang: -0.2, key: 9361 }); camel(260, 1380, 0.75, t, 0); camel(900, 1390, 0.7, t, 1, -1); carpets(t); coinSign(t); });
    lay(1.2, () => { merchants(t); scales(t); silkRoll(t); });
    lay(1, () => { cat(); sack(t); });
    lay(0.6, () => motes(26, [-100, 400, 1200, 1900], 'rgba(230,200,140,1)', t, 9370, { sp: 60, vx: 80, sz: 4, a: 0.4 }));
  };
  DIR.silk = {
    outfit: 'chapan', light: { side: -1, rim: '#ffe0a0' }, grade: ['#e0a050', 0.1],
    act: () => [[S0.silk, 'smug'], [EV.sl_silk, 'proud'], [LF('s3', 0.45), 'sideeye'], [EV.sl_seeds, 'wink'], [EV.sl_contra, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1600, s: 1.0, look: t > EV.sl_seeds && t < EV.sl_contra ? [0.7, 0.4] : [0.2, 0], hand: t > EV.sl_seeds - 0.1 && t < EV.sl_contra ? [140, -200] : undefined, point: t > EV.sl_seeds - 0.1 && t < EV.sl_contra ? 1 : undefined, tailUp: t > EV.sl_contra, squash: b.squash }),
    cam: () => [[S0.silk, 540, 1100, 0.02], [EV.sl_silk, 560, 1140, 0.06], [EV.sl_seeds, 700, 1320, 0.16], [EV.sl_contra, 640, 1280, 0.12], [S1.silk, 620, 1260, 0.14]]
  };
  // ---------------------------------------------------------------- переход В сцену: песчаная буря сдувает кадр
  TRANS_IN.silk = { a: 0.3, b: 0.4, runA: 1, fx(k, t, A, B) {
    const front = lerp(-300, W + 300, sm(k));
    drawBuf(B); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(front, 0, W, H); ctx.clip(); drawBuf(A, 1, 540, 960, 1, null, k * 120, 0); ctx.restore();
    scr(() => { const g = ctx.createLinearGradient(front - 360, 0, front + 200, 0); g.addColorStop(0, 'rgba(216,176,110,0)'); g.addColorStop(0.6, 'rgba(216,176,110,0.95)'); g.addColorStop(1, 'rgba(216,176,110,0)'); ctx.fillStyle = g; ctx.fillRect(front - 360, 0, 560, H);
      for (let i = 0; i < 90; i++) { const r = rng(hsh(FRAME, i)), y = r() * H, x = front - 300 + r() * 500; pencil([[x, y], [x + 60 + r() * 120, y - 6]], { w: 2 + r() * 4, col: i % 3 ? '#e8c890' : '#a87a40', a: 0.7, pass2: false }); } });
  } };
})();
