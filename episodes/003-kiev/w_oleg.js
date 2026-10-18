/* 003 — сцена `oleg`: 882, причал на Почайне под киевской горой. Олег «купец» зазывает Аскольда и Дира, ладья гружёна тюками,
   под рогожей блестят шлемы. На «развод!» рогожа слетает — из-под товара выскакивает дружина (без насилия в кадре).
   Том — варяг в шлеме-спангенхельме. Переход В сцену: ныряем в Днепр и всплываем у ладей. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.oleg_merch = wt('s7', 'купцом.');            // вывеска «ТОВАР ИЗ ГРЕЦИИ»
  EV.oleg_reveal = wt('s7', 'Классический');      // рогожа слетает, дружина выскакивает
  EV.oleg_razvod = wt('s7', 'развод!');
  SHAKES.push([EV.oleg_reveal + 0.1, 0.25, 10]);
  KEYW.push('купцом.', 'развод!');

  function fortress(t) {                                             // гора с деревянной крепостью
    const P = [[-400, 1250], [-100, 980], [300, 860], [700, 900], [1000, 1060], [1500, 1180], [1500, 1500], [-400, 1500]];
    const h = shape(P, { wash: '#7a8a52', washA: 1, w: 2.4, col: '#2a3014', key: 7800 }); hatch(h.path, h.bb, { gap: 9, a: 0.18, col: '#2a3014', ang: -0.5, key: 7801 });
    for (let x = 0; x < 760; x += 22) { const y = 900 - Math.sin((x - 0) / 760 * Math.PI) * 50 - 10; pencil([[x, y], [x, y - 70]], { w: 10, col: '#8a6238' }); poly([[x - 5, y - 70], [x, y - 82], [x + 5, y - 70]], { wash: '#8a6238', washA: 1, w: 1.2 }); }
    for (const [x, y] of [[40, 900], [380, 845], [720, 880]]) { rect(x - 40, y - 160, 80, 160, { wash: '#9a7044', washA: 1, w: 2.2, col: '#2a1a0a' }); poly([[x - 52, y - 160], [x, y - 230], [x + 52, y - 160]], { wash: '#5a3e24', washA: 1, w: 2, col: '#2a1a0a' }); rect(x - 10, y - 130, 20, 26, { wash: '#2a1a0a', washA: 1, w: 1 }); }
    for (let k = 0; k < 3; k++) { const u = (t * 0.3 + k / 3) % 1; glow(260 + k * 140, 820 - u * 260, 30 + u * 60, 'rgba(160,150,140,1)', 0.35 * (1 - u), 'source-over'); }
  }
  function water(t) { const p = poly([[-400, 1420], [1500, 1420], [1500, 2400], [-400, 2400]], { wash: '#3e6a7e', washA: 1, w: 2, col: '#1e3a4a', key: 7810 });
    for (let k = 0; k < 16; k++) { const y = 1450 + k * 34, x = ((t * 30 + k * 157) % 1600) - 200; pencil([[x, y], [x + 70, y - 3], [x + 140, y]], { w: 2.2, col: '#bcd8e2', a: 0.55, pass2: false }); } }
  function pier() { const d = rect(-300, 1380, 760, 40, { wash: '#8a6238', washA: 1, w: 2.4, col: '#2a1a0a', key: 7820 }); for (let x = -280; x < 460; x += 40) pencil([[x, 1380], [x, 1420]], { w: 1.4, col: '#4a2c14', pass2: false }); for (const x of [-200, 0, 200, 420]) rect(x, 1420, 22, 200, { wash: '#6a4424', washA: 1, w: 2, col: '#2a1a0a' }); }
  function boat(t) {                                                 // ладья с драконьим носом, тюки под рогожей, дружина внутри
    const bob = Math.sin(t * 2) * 6, rv = t > EV.oleg_reveal ? popK(t, EV.oleg_reveal, 0.4) : 0, fly = t > EV.oleg_reveal ? clamp((t - EV.oleg_reveal) / 0.5) : 0;
    push(0, bob, 1);
    // воины (под рогожей видно только шлемы; потом встают)
    for (let k = 0; k < 4; k++) { push(560 + k * 125, 1330 - rv * 150, 1.3); const x = 0, y = 0;
      if (rv > 0) { blob([[x - 40, y + 130], [x - 44, y + 20], [x + 44, y + 20], [x + 40, y + 130]], { wash: ['#5a6a4a', '#6a4a3a', '#4a5a6a', '#6a5a3a'][k], washA: 1, w: 2, col: '#1a120a' }); ell(x, y, 30, 34, { wash: '#d8b090', washA: 1, w: 2, col: '#3a2a1a' }); blob([[x - 26, y + 10], [x, y + 46], [x + 26, y + 10]], { wash: '#8a5a2a', washA: 1, w: 1.4 });
        const sh = ell(x + 40, y + 70, 46, 46, { wash: ['#a8241e', '#d6a842', '#2a4a8a', '#a8241e'][k], washA: 1, w: 2.4, col: '#1a120a' }); ell(x + 40, y + 70, 12, 12, { wash: '#8a8e92', washA: 1, w: 1.4 }); pencil([[x - 30, y + 40], [x - 50, y - 70]], { w: 6, col: '#c8ccd0', pass2: false }); }
      const hm = blob([[x - 32, y - 4], [x - 26, y - 40], [x, y - 54], [x + 26, y - 40], [x + 32, y - 4]], { wash: '#9aa0a6', washA: 1, w: 2, col: '#2a3036' }); metalG(hm.path, x + 10, y - 30, 40, '#ffffff', '#9aa0a6', '#3a4048');
      if (rv === 0 && Math.sin(t * 3 + k * 2) > 0.85) glow(x + 10, y - 40, 40, 'rgba(255,255,230,1)', 0.8); pop(); }
    // рогожа поверх тюков
    if (fly < 1) { push(800 + fly * 500, 1330 - fly * 500, 1, fly * 1.4); ctx.save(); ctx.globalAlpha = 1 - fly;
      const c = blob([[-340, 70], [-320, -20], [-200, -60], [0, -70], [200, -60], [320, -20], [340, 70]], { wash: '#b89a6a', washA: 1, w: 2.4, col: '#3a2a14', key: 7830 }); hatch(c.path, c.bb, { gap: 6, a: 0.25, col: '#5a4424', ang: 0.8, key: 7831 }); hatch(c.path, c.bb, { gap: 6, a: 0.2, col: '#5a4424', ang: -0.8, key: 7832 });
      for (const [x, y] of [[-220, 10], [-40, -10], [160, 0]]) { rect(x - 50, y - 40, 100, 60, { wash: '#8a6a3a', washA: 0.3, line: false }); } ctx.restore(); pop(); }
    // корпус
    const hull = blob([[420, 1360], [1180, 1360], [1260, 1300], [1240, 1440], [1080, 1490], [520, 1490], [400, 1420]], { wash: '#8a5a32', washA: 1, w: 3, col: '#2a1608', key: 7840 });
    for (let k = 0; k < 4; k++) pencil([[420 + k * 6, 1380 + k * 26], [1230 - k * 10, 1370 + k * 26]], { w: 2, col: '#4a2c14', a: 0.7, pass2: false });
    for (let k = 0; k < 6; k++) ell(500 + k * 120, 1376, 26, 26, { wash: ['#a8241e', '#d6a842', '#2a4a8a'][k % 3], washA: 1, w: 2, col: '#1a120a' });
    const prow = shape(tubeP([[1240, 1330], [1280, 1240], [1270, 1150], [1230, 1100]], 44, 20), { wash: '#8a5a32', washA: 1, w: 2.6, col: '#2a1608' });
    blob([[1230, 1100], [1180, 1080], [1170, 1110], [1210, 1130]], { wash: '#8a5a32', washA: 1, w: 2.2, col: '#2a1608' }); ell(1222, 1104, 5, 5, { wash: '#d6a842', washA: 1, line: false });
    pencil([[800, 1360], [800, 700]], { w: 10, col: '#6a4424' }); const sail = poly([[640, 740], [960, 740], [980, 1100], [620, 1100]], { wash: '#e8dcc0', washA: 1, w: 2.4, col: '#3a2a14', key: 7850 });
    ctx.save(); ctx.clip(sail.path); for (let x = 640; x < 980; x += 60) { ctx.fillStyle = 'rgba(168,36,30,0.85)'; ctx.fillRect(x, 700, 30, 420); } ctx.restore();
    pop();
  }
  function person(x, y, s, t, o) {                                   // Аскольд / Дир / Олег — простые фигуры
    push(x, y, s, 0, o.flip || 1);
    blob([[-50, 0], [-56, -190], [-36, -250], [36, -250], [56, -190], [50, 0]], { wash: o.col, washA: 1, w: 2.4, col: '#1a120a', key: 7860 + (o.k || 0) });
    rect(-54, -120, 108, 12, { wash: '#4a2c14', washA: 1, w: 1.4 });
    ell(0, -282, 32, 36, { wash: '#e0b894', washA: 1, w: 2, col: '#3a2a1a' }); blob([[-32, -276], [-20, -220], [0, -200], [20, -220], [32, -276], [0, -258]], { wash: o.beard, washA: 1, w: 1.8 });
    if (o.hat === 'fur') { blob([[-36, -300], [-30, -336], [30, -336], [36, -300]], { wash: '#a8241e', washA: 1, w: 2 }); rect(-40, -310, 80, 18, { wash: '#4a3020', washA: 1, w: 1.6 }); }
    if (o.hat === 'merchant') { blob([[-40, -300], [-24, -350], [24, -350], [40, -300]], { wash: '#2a4a8a', washA: 1, w: 2 }); rect(-44, -312, 88, 16, { wash: '#d6a842', washA: 1, w: 1.4 }); }
    if (o.smile) pencil([[-14, -262], [0, -254], [14, -262]], { w: 2.6, pass2: false }); pencil([[-16, -290], [-6, -290]], { w: 3, pass2: false }); pencil([[6, -290], [16, -290]], { w: 3, pass2: false });
    if (o.bow) pencil([[40, -200], [100, -150]], { w: 16, col: o.col }); else pencil([[40, -200], [70, -110]], { w: 16, col: o.col });
    pop();
  }
  function sign(t) { if (t < EV.oleg_merch - 0.1) return; const k = popK(t, EV.oleg_merch, 0.35); push(470, 1080, k, -0.06); pencil([[0, 100], [0, 220]], { w: 8, col: '#5a3a1a' });
    rect(-150, -60, 300, 160, { wash: '#efe2c0', washA: 1, w: 2.6, col: '#3a2410' }); txt('ТОВАР', 0, -20, 40, { font: 'Osw', col: '#2a1a0a' }); txt('ИЗ ГРЕЦИИ', 0, 24, 34, { font: 'Osw', col: '#2a1a0a' }); txt('недорого!', 0, 66, 30, { font: 'Hand', col: '#a8241e' }); pop(); }

  WORLD.oleg = (t, u, cat) => {
    lay(30, () => { vgrad(-600, 1500, ['#a8c8d8', '#efe6cc', '#e8d0a0']); glow(300, 600, 500, 'rgba(255,236,190,1)', 0.45); });
    lay(6, () => { fortress(t); haze('#efe6cc', 0.2); });
    lay(1.2, () => { water(t); pier(); });
    lay(1, () => { boat(t); sign(t); const sur = t > EV.oleg_reveal ? 1 : 0;
      person(20, 1390, 1.3, t, { col: '#6a2a3a', beard: '#5a3a1a', hat: 'fur', k: 1, flip: 1, smile: !sur });
      person(150, 1395, 1.3, t, { col: '#2a4a3a', beard: '#3a2a1a', hat: 'fur', k: 2, flip: 1, smile: !sur });
      person(340, 1390, 1.4, t, { col: '#8a6a3a', beard: '#c89a5a', hat: 'merchant', k: 3, flip: -1, smile: 1, bow: t < EV.oleg_reveal });
      cat(); });
  };
  DIR.oleg = {
    outfit: 'varyag', light: { side: -1, rim: '#fff0c8' }, grade: ['#8aa0a8', 0.1],
    act: () => [[S0.oleg, 'sideeye'], [EV.oleg_merch, 'smug'], [EV.oleg_reveal, 'laugh'], [EV.oleg_razvod, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 1030, y: 1395, s: 0.9, look: t > EV.oleg_reveal ? [0, 0] : [-0.7, 0], hand: t > EV.oleg_merch && t < EV.oleg_reveal ? [-120, -330] : undefined, point: t > EV.oleg_merch && t < EV.oleg_reveal ? 1 : undefined, tailUp: t > EV.oleg_reveal, squash: b.squash }),
    cam: () => [[S0.oleg, 560, 1040, 0.02], [EV.oleg_merch, 440, 1080, 0.06], [EV.oleg_reveal, 640, 1120, 0.04], [EV.oleg_razvod, 680, 1140, 0.1], [S1.oleg, 700, 1140, 0.12]]
  };
  // ---------------------------------------------------------------- переход В сцену: нырок под воду и всплытие
  TRANS_IN.oleg = { a: 0.3, b: 0.4, runA: 1, fx(k, t, A, B) {
    const wave = (y0, amp) => { const p = new Path2D(); p.moveTo(-10, y0); for (let x = 0; x <= W + 20; x += 30) p.lineTo(x, y0 + Math.sin(x * 0.012 + t * 8) * amp); p.lineTo(W + 20, H + 10); p.lineTo(-10, H + 10); p.closePath(); return p; };
    const under = c => { drawBuf(c, 1.08); scr(() => { screenFill('#2a5a72', 0.75); for (let i = 0; i < 40; i++) { const r = rng(i * 17 + 1), x = r() * W, y = H - ((t * 900 * (0.5 + r()) + r() * H) % (H + 200)); ell(x, y, 6 + r() * 16, 6 + r() * 16, { wash: '#e0f2f8', washA: 0.5, w: 1.6, col: '#e0f2f8', a: 0.7 }); } }); };
    if (k < 0.5) { const y0 = H - sm(k / 0.5) * (H + 100); drawBuf(A); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clip(wave(y0, 30)); under(A); ctx.restore(); }
    else { const y0 = sm((k - 0.5) / 0.5) * (H + 100); drawBuf(B); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clip(wave(y0, 30)); under(B); ctx.restore(); }
  } };
})();
