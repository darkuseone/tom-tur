/* 010 — сцены `today` и `button`.
   today: 2026, белая ночь, Дворцовая площадь. Зимний дворец (Эрмитаж) во всю ширину, Александровская колонна с ангелом, туристы
   с телефонами, гид с флажком, конный экипаж. В подвальных окошках дворца — коты, вокруг Тома на брусчатке сидят эрмитажные коты
   (у одного бейдж «ЭРМИТАЖ»). На «восемнадцатого» — свиток «1745 · указ Елизаветы: котов из Казани», на «Коллеги!» коты разом
   поворачиваются в камеру и поднимают лапу, Том подмигивает. Переход В сцену — блокадный лёд трескается и осыпается.
   button: ночная Нева, разведённый Дворцовый мост в огнях, шпиль Петропавловки; портал часов с постерами городов.
   Переход В button: Дворцовый мост разводится — две половины кадра поднимаются. */
(() => {
  EV.td_cats = wtk('t1', 'коты');
  EV.td_1745 = wtk('t1', 'восемнадцатого');
  EV.td_coll = wtk('t1', 'Коллеги!');
  EV.bt_point = wtk('x1', 'Пиши');
  EV.bt_wink = wtk('x1', 'отмотаем!');
  KEYW.push('коты', 'Коллеги!');

  function kitty(x, y, s, t, c, k, o = {}) {                           // сидящий кот: тело, голова, уши, хвост, глаза; o.salute — лапа вверх
    const [b, d, st] = c, look = o.front ? 0 : (k % 2 ? 1 : -1);
    push(x, y, s, 0, look >= 0 ? 1 : -1);
    const tw = Math.sin(t * 2 + k) * 10; pencil(spline([[30, -10], [80, -6], [96, -50 + tw], [84, -90 + tw]], false, 8), { w: 14, col: d });
    const bd = blob([[-44, 0], [-50, -60], [-30, -110], [30, -110], [50, -60], [44, 0]], { wash: b, washA: 1, w: 2, col: '#1a120a' }); if (st) hatch(bd.path, bd.bb, { gap: 12, a: 0.35, col: d, ang: 0.2, w: 3 });
    const hy = -140 + (o.salute ? -4 : 0); ell(0, hy, 46, 40, { wash: b, washA: 1, w: 2, col: '#1a120a' });
    for (const sd of [-1, 1]) poly([[sd * 40, hy - 14], [sd * 34, hy - 58], [sd * 12, hy - 34]], { wash: b, washA: 1, w: 2, col: '#1a120a' });
    if (st) for (const sd of [-1, 0, 1]) pencil([[sd * 10, hy - 36], [sd * 10, hy - 24]], { w: 3, col: d, pass2: false });
    const blink = Math.sin(t * 1.3 + k * 2) > 0.97; for (const sd of [-1, 1]) { if (blink || o.wink && sd > 0) pencil([[sd * 16 - 7, hy - 2], [sd * 16 + 7, hy - 2]], { w: 2.4, col: '#1a120a', pass2: false }); else { ell(sd * 16, hy - 2, 9, 10, { wash: '#c8d860', washA: 1, w: 1.4, col: '#1a120a' }); ell(sd * 16, hy - 1, 2.6, 7, { wash: '#000', washA: 1, line: false }); } }
    poly([[-5, hy + 10], [5, hy + 10], [0, hy + 16]], { wash: '#d88a8a', washA: 1, line: false }); for (const sd of [-1, 1]) for (const q of [0, 6]) pencil([[sd * 14, hy + 14 + q], [sd * 50, hy + 8 + q * 2]], { w: 1, col: '#1a120a', a: 0.6, pass2: false });
    if (o.salute) pencil([[26, -80], [50, -140], [56, -176]], { w: 16, col: b }); else for (const sd of [-1, 1]) ell(sd * 18, -4, 14, 8, { wash: b, washA: 1, w: 1.4, col: '#1a120a' });
    if (o.badge) { rect(-24, -96, 48, 28, { wash: '#f2ece0', washA: 1, w: 1.4, col: '#2a2a2a' }); txt('ЭРМИТАЖ', 0, -82, 9, { font: 'Osw', col: '#2a5a5a' }); }
    pop();
  }
  const CATS = [['#e8a050', '#a8602a', 1], ['#3a3a3e', '#1a1a1e', 0], ['#d8d0c4', '#8a8478', 1], ['#9a8a7a', '#5a4a3a', 1], ['#f2ece0', '#c8b8a0', 0]];

  // ================================================================ TODAY
  function sky(t) { vgrad(-900, 1100, ['#5a6aa0', '#a890b8', '#f0b8b0', '#f8e0c8'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 90 + i * 70 + Math.sin(k) * 10, 72, 24, { wash: '#f8d8d0', washA: 0.7, line: false }); } glow(900, 900, 600, 'rgba(255,220,180,1)', 0.3); }
  function palace(t) {
    winterPalace(-420, 1150, 1920, 360, t, {});
    for (let q = 0; q < 12; q++) { const x = -360 + q * 160; push(x, 1150, 1); const w = ell(0, -24, 30, 22, { wash: '#2a2a2e', washA: 1, w: 2, col: '#1a2a26' }); pop(); if (q % 3 === 1) kitty(x, 1138, 0.24, t, CATS[q % 5], q, { front: 1 }); }
  }
  function column(t) {                                                 // Александровская колонна с ангелом
    const x = 860, b = 1250; rect(x - 70, b - 120, 140, 120, { wash: '#8a4a42', washA: 1, w: 2, col: '#2a0a08' }); const sh = shape([[x - 30, b - 120], [x - 24, b - 820], [x + 24, b - 820], [x + 30, b - 120]], { wash: '#c88a7a', washA: 1, w: 2, col: '#3a1a14' }); shadeG(sh.path, x + 30, 0, x - 30, 0, '#7a3a30', 0.45);
    rect(x - 44, b - 850, 88, 32, { wash: '#7a6a3a', washA: 1, w: 2, col: '#2a1a08' }); rect(x - 26, b - 890, 52, 40, { wash: '#7a6a3a', washA: 1, w: 2, col: '#2a1a08' });
    push(x, b - 900, 1); ell(0, -50, 14, 16, { wash: '#a8986a', washA: 1, w: 1.6, col: '#2a2a10' }); blob([[-20, -36], [20, -36], [26, 0], [-26, 0]], { wash: '#a8986a', washA: 1, w: 1.6, col: '#2a2a10' }); for (const sd of [-1, 1]) blob([[sd * 10, -40], [sd * 50, -76], [sd * 40, -24]], { wash: '#b8a87a', washA: 1, w: 1.4, col: '#2a2a10' }); pencil([[16, -30], [26, -110]], { w: 4, col: '#4a4a2a', pass2: false }); pencil([[16, -90], [36, -90]], { w: 4, col: '#4a4a2a', pass2: false }); pop();
  }
  function people(t) {                                                 // туристы, гид с флажком, экипаж
    crowd(-200, 700, 1260, 20, t, 10500, { s: 0.85, phones: 0.6, cols: ['#c83a3a', '#2a4a8a', '#e8d8b0', '#3a6a3a', '#5a3a6a'] });
    human(560, 1290, 0.6, t, { body: '#e8a33c', legs: '#2a2a2a', hair: '#5a3a1a', face: 'smile', armR: 'up', seed: 510 }); pencil([[560 + 40 * 0.6, 1290 - 330 * 0.6], [584, 1050]], { w: 3, col: '#3a3a3a', pass2: false }); poly([[584, 1050], [640, 1060], [584, 1075]], { wash: '#c8201e', washA: 1, w: 1, col: '#3a0a0a' });
    const cx = 1300 - ((t - S0.today) * 60) % 1800; push(cx, 1300, 0.62, 0, -1); blob([[-140, -80], [140, -80], [150, -10], [-150, -10]], { wash: '#2a2a30', washA: 1, w: 2, col: '#000' }); blob([[-120, -80], [-100, -170], [100, -170], [120, -80]], { wash: '#3a3a42', washA: 1, w: 2, col: '#000' }); for (const wx of [-100, 100]) { ell(wx, -10, 50, 50, { wash: '#4a3a2a', washA: 1, w: 2, col: '#000' }); for (let q = 0; q < 6; q++) { const a = q / 6 * 6.283 + t * 2; pencil([[wx, -10], [wx + Math.cos(a) * 46, -10 + Math.sin(a) * 46]], { w: 2.4, col: '#2a1a10', pass2: false }); } }
      const hp = Math.sin(t * 8) * 6; blob([[180, -40 + hp], [200, -140], [260, -170], [300, -150], [280, -110], [240, -90], [230, -20 + hp]], { wash: '#f2ece0', washA: 1, w: 2, col: '#2a2a2a' }); for (const lx of [200, 240]) pencil([[lx, -40], [lx + Math.sin(t * 8 + lx) * 12, 10]], { w: 9, col: '#e8e0d0' }); pop();
  }
  function cats(t) {                                                   // эрмитажные коты вокруг Тома
    const coll = t > EV.td_coll - 0.05;
    [[620, 1500, 0.95], [780, 1480, 0.85], [940, 1510, 1.0], [130, 1520, 0.9], [-30, 1500, 0.8]].forEach(([x, y, s], i) => kitty(x, y, s, t, CATS[i], i, { front: coll || i === 2, salute: coll && i !== 1, badge: i === 2, wink: coll && i === 0 }));
  }

  WORLD.today = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(9, () => palace(t));
    lay(6, () => column(t));
    lay(3, () => people(t));
    lay(1, () => { const g = shape([[-400, 1400], [1480, 1400], [1480, 2400], [-400, 2400]], { wash: '#a89a90', washA: 1, w: 1, col: '#000', a: 0.2 });
      ctx.save(); ctx.clip(g.path); for (let k = -12; k <= 12; k++) pencil([[540 + k * 70, 1400], [540 + k * 260, 2400]], { w: 1.6, col: '#6a5e58', a: 0.4, pass2: false, gap: false }); for (let y = 1420, d = 18; y < 2400; y += d, d *= 1.25) pencil([[-400, y], [1480, y]], { w: 1.6, col: '#6a5e58', a: 0.4, pass2: false, gap: false }); ctx.restore();
      cats(t); cat(); });
    lay(0.7, () => motes(30, [0, 300, W, 1700], '#fff0e0', t, 10510, { sp: -10, sz: 2.4, a: 0.5, tw: 1, add: 1 }));
  };
  DIR.today = {
    outfit: 'hoodieP', light: { side: 1, rim: '#ffd8c8' }, grade: ['#c08aa0', 0.1],
    act: () => [[S0.today, 'proud'], [EV.td_cats, 'grin'], [EV.td_1745, 'smug'], [EV.td_coll - 0.04, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 380, y: 1480, s: 1.06, look: t < EV.td_coll ? [0.6, 0.1] : [0, 0.05], hand: t > EV.td_coll ? [100, -380] : [110, -270], tailUp: true, tilt: t > EV.td_coll ? 0.05 : 0 }),
    cam: () => [[S0.today, 600, 1000, 0.08], [EV.td_cats, 620, 1120, 0.14], [EV.td_1745, 600, 1100, 0.1], [EV.td_coll, 560, 1180, 0.2], [S1.today, 560, 1180, 0.24]],
    hud: t => { if (t > EV.td_1745 && t < EV.td_coll + 0.2) { const k = popK(t, EV.td_1745, 0.35); push(560, 600, k, -0.03); const sc = rect(-320, -100, 640, 200, { wash: '#f2e6c4', washA: 0.97, w: 3, col: '#5a3a1a' });
        for (const sx of [-1, 1]) ell(sx * 320, 0, 20, 100, { wash: '#e2d0a0', washA: 1, w: 2, col: '#5a3a1a' }); txt('1745 · УКАЗЪ ЕЛИЗАВЕТЫ', 0, -44, 40, { font: 'Osw', col: '#5a1a10' }); txt('«котовъ из Казани — ко двору»', 0, 26, 40, { col: '#2a1a10' }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В today: блокадный лёд трескается и осыпается
  TRANS_IN.today = { a: 0.35, b: 0.45, fx(k, t, A, B) {
    drawBuf(B, 1.06 - 0.06 * sm(k));
    const nx = 5, ny = 8, r = rng(10520), P = []; for (let j = 0; j <= ny; j++) { P.push([]); for (let i = 0; i <= nx; i++) { const ex = i === 0 || i === nx, ey = j === 0 || j === ny; P[j].push([i * W / nx + (ex ? 0 : (r() - 0.5) * 120), j * H / ny + (ey ? 0 : (r() - 0.5) * 120)]); } }
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      const d = (Math.abs(i - nx / 2) + Math.abs(j - ny / 2)) * 0.03 + r() * 0.08, f = Math.max(0, k - 0.4 - d), dy = f * f * 9000, rot = f * (r() - 0.5) * 3;
      const Q = [P[j][i], P[j][i + 1], P[j + 1][i + 1], P[j + 1][i]], cx = (Q[0][0] + Q[2][0]) / 2, cy = (Q[0][1] + Q[2][1]) / 2;
      if (dy > H * 1.4) continue;
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(cx, cy + dy); ctx.rotate(rot); ctx.translate(-cx, -cy);
      const path = new Path2D(); path.moveTo(...Q[0]); for (const q of Q.slice(1)) path.lineTo(...q); path.closePath(); ctx.clip(path); drawBuf(A); ctx.fillStyle = 'rgba(220,235,255,' + (0.15 + 0.3 * sm(k / 0.4)) + ')'; ctx.fill(path);
      ctx.strokeStyle = 'rgba(245,250,255,0.9)'; ctx.lineWidth = 5 * sm(k / 0.35); ctx.stroke(path); ctx.restore(); }
  } };

  // ================================================================ BUTTON
  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9);
    lay(40, () => { vgrad(-800, 1400, ['#0a1030', '#1a2450', '#3a3a70', '#8a5a8a']); ctx.save(); ctx.fillStyle = '#fff8e8'; const r = rng(19); for (let i = 0; i < 80; i++) { ctx.globalAlpha = 0.3 + 0.5 * Math.abs(Math.sin(t * 1.7 + i * 1.3)); ctx.fillRect(r() * 1600 - 260, r() * 1100 - 500, 2, 2); } ctx.restore(); });
    lay(14, () => { for (let k = 0; k < 40; k++) { const x = -500 + k * 55, h = 40 + (k * 37) % 70, y = 1240; sil([[x, y], [x, y - h], [x + 50, y - h], [x + 50, y]], '#1a1a3a', 1); windows(x + 3, y - h + 4, 44, h - 8, 3, Math.floor(h / 16), k * 7, 0.4, '#ffcf7a', '#ffcf7a', 0.6); }
      spire(140, 1240, 0.62, t, { glow: 1, col: '#c8a8a0' });
      neva(1240, 1520, t, { top: '#1a2450', bot: '#0a1028', lineCol: '#ffd890' });
      for (const [px, sd] of [[420, -1], [880, 1]]) { push(px, 1300, 1, sd * -0.9); rect(sd > 0 ? 0 : -330, -20, 330, 34, { wash: '#2a3a5a', washA: 1, w: 2, col: '#0a0a1a' }); for (let q = 0; q < 8; q++) glow((sd > 0 ? 20 : -310) + q * 42, -26, 16, 'rgba(255,214,140,1)', 0.9); pop(); }
      for (const px of [420, 880]) rect(px - 40, 1280, 80, 120, { wash: '#3a3a4a', washA: 1, w: 2, col: '#0a0a1a' }); });
    haze('#2a2050', 0.08);
    if (open > 0) lay(2, () => { const cx = 540, cy = 610, R = 400 * open;
      glow(cx, cy, R * 1.35, 'rgba(255,200,120,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(0.5, 'rgba(90,60,170,0.6)'); g.addColorStop(1, 'rgba(20,10,40,0.6)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', '#f1d27a', '#c99636'][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['ПАРИЖ', '#3a5a8a', '#e8b07a', 'eiffel'], ['РИМ', '#8a3a2a', '#f0c070', 'col'], ['ТОКИО', '#e8e0d0', '#f4a0a0', 'fuji'], ['?', '#2a4a3a', '#c8e0a0', 'tower']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); poster(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.62 + 0.14 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); });
    });
    lay(1, () => { embank(1520, t, { lit: 1, lamps: 1 }); const g = poly([[-400, 1560], [1500, 1550], [1500, 2400], [-400, 2400]], { wash: '#2a2632', washA: 1, w: 2, col: '#0a0810' });
      kitty(960, 1600, 0.8, t, CATS[3], 7, { front: t > EV.bt_wink, salute: t > EV.bt_wink }); cat(); });
    motes(40, [0, 300, W, 1700], '#ffd8b0', t, 35, { sp: -14, sz: 2.4, a: 0.6, tw: 1, add: 1 });
  };
  DIR.button = {
    outfit: 'hoodieP', light: { side: 1, rim: '#ffc890' }, grade: ['#3a2050', 0.24],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 600, y: 1600, s: 1.45, look: t < EV.portal + 0.3 ? [0.2, -0.5] : [0, 0.05], watchInHand: true, glow: 0.4 + 0.6 * sm((t - EV.portal) / 0.8), spin: 0.5 + (t > EV.bt_wink ? (t - EV.bt_wink) * 3 : 0),
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : t > EV.bt_wink ? [-80, -170] : [-80, -150], tilt: t > EV.bt_wink ? 0.08 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 600, 1160, 0.22], [EV.portal, 580, 1000, 0.0], [EV.bt_point + 0.2, 590, 1040, 0.08, 'x'], [EV.bt_wink, 590, 1030, 0.06], [EV.bt_wink + 0.25, 600, 1050, 0.14, 'x'], [DUR + 0.2, 600, 1040, 0.1]],
    afterCat: (t, u, P) => { const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,140,0.6)', 0.25 * P.glow, 10, t * 2); }
  };

  // ---------------------------------------------------------------- переход В button: Дворцовый мост разводится — половины кадра поднимаются
  TRANS_IN.button = { a: 0.3, b: 0.4, runA: 1, fx(k, t, A, B) {
    const ang = Math.pow(sm(k), 1.4) * 1.45;
    drawBuf(B, 1.08 - 0.08 * sm(k));
    for (const sd of [-1, 1]) { const px = sd < 0 ? 0 : W, py = 1300;
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(px, py); ctx.rotate(sd * ang * -1); ctx.translate(-px, -py); const P = new Path2D(); P.rect(sd < 0 ? 0 : W / 2, -400, W / 2, py + 400); ctx.clip(P); drawBuf(A);
      ctx.fillStyle = 'rgba(10,12,30,' + 0.4 * sm(k) + ')'; ctx.fill(P); ctx.strokeStyle = '#ffd890'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(W / 2, -400); ctx.lineTo(W / 2, py); ctx.stroke();
      for (let q = 0; q < 12; q++) { ctx.fillStyle = 'rgba(255,214,140,0.9)'; ctx.beginPath(); ctx.arc(W / 2 + sd * -20, py - q * 130, 8, 0, 6.3); ctx.fill(); }
      ctx.restore(); }
  } };
})();
