/* 003 — сцены `today` и `button`.
   today: 2026, низ эскалатора «Арсенальной» (105,5 м — считается самой глубокой станцией метро в мире). Белые пилоны, арка, вагон метро;
   стена в разрезе — за ней в толще мергеля проплывает призрак акулы (петля к хуку). Переход В сцену: пасть акулы смыкается и открывается — мы на станции.
   button: ночной Киев с Владимирской горки — Днепр, мосты в огнях, Лавра с золотыми главами; портал часов с постерами городов.
   Переход В button: «перемотка VHS». */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.td_deep = wt('t1', 'самая');                 // счётчик глубины
  EV.td_105 = wt('t1', 'сто');                    // «105 м»
  EV.td_shark = wt('t1', 'Почти');                // за стеной проплывает акула, подмигивает
  EV.bt_point = wt('x1', 'Пиши');
  EV.bt_wink = wt('x1', 'отмотаем!');
  KEYW.push('глубокая', 'акул!');

  function station(t) {                                              // зал «Арсенальной» в перспективе
    vgrad(-200, 2200, ['#3a3430', '#8a7a68', '#4a4038']);
    const VX = 540, VY = 900;
    // свод
    const vault = blob([[-300, 300], [VX - 120, VY - 140], [VX + 120, VY - 140], [1380, 300], [1380, -200], [-300, -200]], { wash: '#e8e2d4', washA: 1, w: 2, col: '#4a4038', key: 8100 });
    for (let k = 0; k < 9; k++) { const u = k / 8, y = lerp(260, VY - 140, Math.pow(u, 0.7)); pencil([[lerp(-300, VX - 120, Math.pow(u, 0.7)), y], [lerp(1380, VX + 120, Math.pow(u, 0.7)), y]], { w: 3 - u * 2, col: '#8a8070', a: 0.6, pass2: false }); glow(VX, y + 20, 120 - u * 80, 'rgba(255,240,200,1)', 0.35); }
    // пол
    poly([[-300, 2000], [1380, 2000], [VX + 120, VY + 120], [VX - 120, VY + 120]], { wash: '#a89a88', washA: 1, w: 2, col: '#4a4038', key: 8101 }); for (let k = 0; k < 12; k++) { const u = k / 11; pencil([[lerp(VX - 120, -300, u), lerp(VY + 120, 2000, u)], [lerp(VX + 120, 1380, u), lerp(VY + 120, 2000, u)]], { w: 1.4, col: '#6a5e50', a: 0.5, pass2: false }); }
    // пилоны (белый мрамор) по бокам
    for (const sd of [-1, 1]) for (let k = 5; k >= 0; k--) { const u = Math.pow(k / 6, 0.8), x0 = lerp(sd < 0 ? 40 : 1040, VX + sd * 130, u), w = lerp(220, 30, u), top = lerp(380, VY - 120, u), bot = lerp(1650, VY + 120, u);
      const p = rect(sd < 0 ? x0 : x0 - w, top, w, bot - top, { wash: '#f2ede2', washA: 1, w: 2.2, col: '#5a5048', key: 8110 + k + (sd > 0 ? 10 : 0) }); shadeG(p.path, sd < 0 ? x0 + w : x0 - w, 0, sd < 0 ? x0 : x0, 0, '#a89a88', 0.5);
      hatch(p.path, p.bb, { gap: 12, a: 0.08, col: '#6a6058', ang: 1.2, key: 8130 + k }); }
    // торец: табличка станции
    rect(VX - 160, VY - 80, 320, 70, { wash: '#1e3a6a', washA: 1, w: 2, col: '#0a1a3a' }); txt('АРСЕНАЛЬНА', VX, VY - 46, 40, { font: 'Osw', col: '#f6ecd6' });
    glow(VX, VY + 40, 220, 'rgba(255,236,200,1)', 0.5);
  }
  function wallCut(t) {                                              // правая стена «прозрачная»: мергель и акула
    const k = sm((t - EV.td_shark + 0.4) / 0.4); if (t < EV.td_deep) return;
    const cx = 880, cy = 760, R = 230; ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 1.1, 0, 0, 6.283); ctx.clip();
    vgrad(cy - R * 1.2, cy + R * 1.2, ['#8a9aa2', '#5e7480']); const r = rng(8140); for (let i = 0; i < 30; i++) ell(cx + (r() - 0.5) * 2 * R, cy + (r() - 0.5) * 2 * R, 4, 3, { wash: '#d8e0de', washA: 0.8, line: false });
    shark(lerp(cx + 420, cx - 80, k), cy + 30, 0.5, t, { flip: -1, ghost: 1, a: 0.85, glowEye: k > 0.9 ? 1 : 0, col: '#6d8794', colD: '#1e3440', colL: '#c8dad8' });
    ctx.restore(); pencil(ellPts(cx, cy, R, R * 1.1, 0, 0.05, 60), { w: 6, col: '#2a2420' }); pencil(ellPts(cx, cy, R + 14, R * 1.1 + 14, 0, 0.05, 60), { w: 3, col: '#e8dcc0', a: 0.7 });
    const q = popK(t, EV.td_deep, 0.35); push(cx, cy - R * 1.1 - 50, q); txt('за стеной — мергель', 0, 0, 34, { font: 'Hand', col: '#f6ecd6' }); pop();
  }
  function train(t) { const x = 1300 - clamp((t - S0.today) / 1.2) * 300; push(x, 1100, 1); const b = rect(-200, -260, 600, 320, { wash: '#3a5a8a', washA: 1, w: 3, col: '#0a1a2a', key: 8150 }); rect(-200, -60, 600, 30, { wash: '#e8c040', washA: 1, w: 2 });
    for (let k = 0; k < 3; k++) rect(-170 + k * 170, -220, 120, 120, { wash: '#ffe6a8', washA: 1, w: 2, col: '#0a1a2a' }); pop(); }

  WORLD.today = (t, u, cat) => {
    lay(3, () => { station(t); train(t); wallCut(t); });
    lay(1, () => { cat(); });
  };
  DIR.today = {
    outfit: 'hoodieK', light: { side: -1, rim: '#fff0d0' }, grade: ['#5a5070', 0.12],
    act: () => [[S0.today, 'proud'], [EV.td_105, 'awe'], [EV.td_shark, 'smug'], [EV.td_shark + 0.6, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 480, y: 1520, s: 1.15, walk: u < 0.6 ? t * 8 : undefined, look: t > EV.td_shark ? [0.8, -0.4] : [0.2, 0], hand: t > EV.td_shark ? [140, -380] : undefined, point: t > EV.td_shark ? 1 : undefined, tailUp: t > EV.td_shark }),
    cam: () => [[S0.today, 540, 1000, 0.1], [EV.td_105, 560, 980, 0.04], [EV.td_shark, 640, 940, 0.06], [S1.today, 660, 940, 0.12]],
    hud: t => { if (t < EV.td_105 - 0.05 || t > S1.today) return; const k = popK(t, EV.td_105, 0.35); push(300, 640, k, -0.05); ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      ctx.font = '600 150px Osw'; ctx.lineWidth = 22; ctx.strokeStyle = 'rgba(12,8,6,0.94)'; ctx.strokeText('105 м', 0, 0); ctx.fillStyle = K.amber; ctx.fillText('105 м', 0, 0);
      ctx.font = '600 40px Osw'; ctx.lineWidth = 10; ctx.strokeText('ПОД ЗЕМЛЁЙ', 0, 94); ctx.fillStyle = '#f6ecd6'; ctx.fillText('ПОД ЗЕМЛЁЙ', 0, 94); ctx.restore(); pop(); }
  };
  // ---------------------------------------------------------------- переход В today: пасть акулы смыкается и раскрывается
  function jaws(open) { scr(() => { const g = (1 - open) * H / 2; ctx.fillStyle = '#1a0608';
    for (const sd of [-1, 1]) { ctx.save(); const y = sd < 0 ? g : H - g; ctx.beginPath(); if (sd < 0) { ctx.rect(-10, -10, W + 20, y + 10); } else { ctx.rect(-10, y, W + 20, H - y + 10); } ctx.fillStyle = '#4e6e7e'; ctx.fill(); ctx.restore();
      ctx.fillStyle = '#5a0e12'; ctx.fillRect(0, sd < 0 ? g - 60 : H - g, W, 60); for (let x = 0; x < W; x += 60) poly(sd < 0 ? [[x, g - 6], [x + 50, g - 6], [x + 25, g + 70]] : [[x + 30, H - g + 6], [x + 80, H - g + 6], [x + 55, H - g - 70]], { wash: '#f4efe2', washA: 1, w: 2, col: '#5a5048' }); } }); }
  TRANS_IN.today = { a: 0.3, b: 0.38, runA: 1, fx(k, t, A, B) {
    if (k < 0.45) { drawBuf(A, 1 + k * 0.4); jaws(1 - sm(k / 0.45)); return; }
    const q = sm((k - 0.45) / 0.55); drawBuf(B, 1.1 - 0.1 * q); jaws(q);
  } };

  // ================================================================ BUTTON
  function lavra(x, y, s) { push(x, y, s); const Au = '#e6b84a';
    sil([[-40, 0], [-40, -380], [-24, -420], [24, -420], [40, -380], [40, 0]], '#e8e4d4', 1); sil([[-30, -420], [0, -500], [30, -420]], '#2a6a4a', 1); ell(0, -510, 18, 20, { wash: Au, washA: 1, line: false }); pencil([[0, -530], [0, -580]], { w: 4, col: Au, pass2: false }); glow(0, -500, 60, 'rgba(255,220,140,1)', 0.6);
    sil([[80, 0], [80, -180], [260, -180], [260, 0]], '#e8e4d4', 1); for (const [dx, r] of [[170, 40], [110, 24], [230, 24]]) { ell(dx, -200 - r, r, r * 1.2, { wash: Au, washA: 1, line: false }); glow(dx, -200 - r, r * 3, 'rgba(255,220,140,1)', 0.5); }
    pop(); }
  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9);
    lay(40, () => { vgrad(-800, 1400, ['#05071a', '#141838', '#2a2450', '#6a3a5a']); ctx.save(); ctx.fillStyle = '#fff8e8'; const r = rng(18); for (let i = 0; i < 120; i++) { ctx.globalAlpha = 0.3 + 0.6 * Math.abs(Math.sin(t * 1.7 + i * 1.3)); ctx.fillRect(r() * 1600 - 260, r() * 1300 - 500, 2, 2); } ctx.restore(); });
    lay(14, () => { sil([[-600, 1250], [-200, 1150], [300, 1180], [900, 1120], [1700, 1200], [1700, 1500], [-600, 1500]], '#141228', 1); lavra(800, 1150, 0.8);
      const rp = poly([[-600, 1320], [1700, 1300], [1700, 1500], [-600, 1500]], { wash: '#1a2a4a', washA: 1, line: false }); for (let k = 0; k < 40; k++) { const x = -500 + k * 55; pencil([[x, 1330 + (k % 4) * 30], [x + 30, 1330 + (k % 4) * 30]], { w: 3, col: '#ffcf7a', a: 0.4, pass2: false }); }
      pencil([[-600, 1300], [1700, 1270]], { w: 6, col: '#2a2a3a', pass2: false }); for (let k = 0; k < 30; k++) glow(-500 + k * 75, 1290 - k * 1.2, 14, 'rgba(255,214,140,1)', 0.8); });
    haze('#2a2050', 0.1);
    if (open > 0) lay(2, () => { const cx = 540, cy = 610, R = 400 * open;
      glow(cx, cy, R * 1.35, 'rgba(255,200,120,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(0.5, 'rgba(60,110,170,0.6)'); g.addColorStop(1, 'rgba(20,10,40,0.6)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', '#f1d27a', '#c99636'][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['РИМ', '#8a3a2a', '#f0c070', 'col'], ['ПАРИЖ', '#3a5a8a', '#e8b07a', 'eiffel'], ['ТОКИО', '#e8e0d0', '#f4a0a0', 'fuji'], ['?', '#2a4a3a', '#c8e0a0', 'tower']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); poster(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.62 + 0.14 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); });
    });
    lay(1, () => { const g = poly([[-400, 1560], [1500, 1540], [1500, 2400], [-400, 2400]], { wash: '#1e1a2a', washA: 1, w: 2, col: '#0a0810' }); for (let x = -300; x < 1400; x += 60) pencil([[x, 1550], [x, 1440]], { w: 6, col: '#2a2638', pass2: false }); pencil([[-400, 1440], [1500, 1430]], { w: 8, col: '#2a2638', pass2: false }); cat(); });
    motes(40, [0, 300, W, 1700], '#ffd8b0', t, 34, { sp: -14, sz: 2.4, a: 0.6, tw: 1, add: 1 });
  };
  DIR.button = {
    outfit: 'hoodieK', light: { side: 1, rim: '#ffc890' }, grade: ['#3a2050', 0.26],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 640, y: 1580, s: 1.45, look: t < EV.portal + 0.3 ? [0.2, -0.5] : [0, 0.05], watchInHand: true, glow: 0.4 + 0.6 * sm((t - EV.portal) / 0.8), spin: 0.5 + (t > EV.bt_wink ? (t - EV.bt_wink) * 3 : 0),
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : t > EV.bt_wink ? [-80, -170] : [-80, -150], tilt: t > EV.bt_wink ? 0.08 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 600, 1160, 0.22], [EV.portal, 580, 1000, 0.0], [EV.bt_point + 0.2, 590, 1040, 0.08, 'x'], [EV.bt_wink, 590, 1030, 0.06], [EV.bt_wink + 0.25, 600, 1050, 0.14, 'x'], [DUR + 0.2, 600, 1040, 0.1]],
    afterCat: (t, u, P) => { const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,140,0.6)', 0.25 * P.glow, 10, t * 2); }
  };
  // ---------------------------------------------------------------- переход В button: перемотка VHS
  TRANS_IN.button = { a: 0.24, b: 0.36, runA: 1, fx(k, t, A, B) {
    const src = k < 0.5 ? A : B, q = k < 0.5 ? k / 0.5 : 1 - (k - 0.5) / 0.5, r = rng(hsh(FRAME, 71));
    for (let y = 0; y < H; y += 60) { const dx = (r() - 0.5) * 140 * q + (y % 120 ? 0 : 40 * q); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(0, y, W, 60); ctx.clip(); ctx.drawImage(src, dx, 0); ctx.restore(); }
    scr(() => { screenFill('#3a3a5a', 0.25 * q, 'screen'); for (let i = 0; i < 6; i++) { const y = (r() * H + t * 2000) % H; ctx.fillStyle = `rgba(255,255,255,${0.5 * q})`; ctx.fillRect(0, y, W, 6 + r() * 14); }
      ctx.save(); ctx.globalAlpha = q; ctx.font = '600 120px Osw'; ctx.fillStyle = '#f6ecd6'; ctx.textAlign = 'left'; ctx.fillText('◀◀', 80, 560); ctx.font = '600 50px Osw'; ctx.fillText('REW', 80, 640); ctx.restore(); });
  } };
})();
