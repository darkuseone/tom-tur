/* 004 — сцены `today` и `button`.
   today: 2026, весна, склон над Алматы. Цветущие дикие яблони Сиверса — «прабабушки» (у одной — платок), внизу город, Кок-Тобе, горы в снегу.
   На «прабабушки» от яблока в лапе Тома к деревьям тянется светящаяся нить (петля к хуку). Переход В сцену: валик маляра перекрашивает кадр.
   button: ночная Алматы с Кок-Тобе — огни сетки улиц, телебашня; портал часов с постерами городов; Том кусает яблоко и подмигивает.
   Переход В button: «укус» выгрызает кадр. */
(() => {
  EV.td_wild = wtw('t1', 'дикие');
  EV.td_gran = wtw('t1', 'прабабушки');
  EV.td_city = wtw('t1', 'городом!');
  EV.bt_point = wtw('x1', 'Пиши');
  EV.bt_wink = wtw('x1', 'отмотаем!');
  KEYW.push('прабабушки', 'городом!');

  function cityBelow(t, night) {                                         // город в долине: сетка кварталов, «Казахстан», Кок-Тобе
    const r = rng(10010);
    const v = poly([[-400, 1100], [1500, 1080], [1500, 1400], [-400, 1400]], { wash: night ? '#141a30' : '#c8c0a8', washA: 1, w: 1.6, col: night ? '#0a0e1a' : '#6a6050' });
    for (let k = 0; k < 90; k++) { const x = -300 + r() * 1700, y = 1100 + r() * 280, h = 20 + r() * 80 * (1 - (y - 1100) / 400); const c = night ? '#1e2440' : ['#e0d8c8', '#c8d0d8', '#d8c8b0'][k % 3]; rect(x, y - h, 30, h, { wash: c, washA: 1, w: 0.8, col: night ? '#0a0e1a' : '#6a6050' });
      if (night) windows(x + 3, y - h + 3, 24, h - 6, 2, Math.max(1, Math.round(h / 14)), 10020 + k, 0.55, '#ffcf7a', '#8fd8ff', 0.8); }
    for (let k = 0; k < 8; k++) { const y = 1110 + k * 36; pencil([[-300, y], [1500, y - 20]], { w: night ? 3 : 1.6, col: night ? '#ffcf7a' : '#8a8070', a: night ? 0.55 : 0.4, pass2: false }); }
    const hx = 420, ht = 900; rect(hx - 26, ht, 52, 230, { wash: night ? '#e8e0d0' : '#f2ece0', washA: 1, w: 1.6, col: '#4a4038' }); for (let q = 0; q < 5; q++) pencil([[hx - 18 + q * 9, ht], [hx - 18 + q * 9, ht - 20]], { w: 3, col: '#d6a842', pass2: false }); if (night) glow(hx, ht + 80, 80, 'rgba(255,230,170,1)', 0.4);
    const tx = 900, tb = 1080; for (const sd of [-1, 1]) pencil([[tx + sd * 22, tb], [tx + sd * 4, tb - 280], [tx, tb - 420]], { w: 4, col: night ? '#c8ccd8' : '#d8dce2' }); for (let k = 0; k < 9; k++) pencil([[tx - 18 + k * 2, tb - k * 30], [tx + 18 - k * 2, tb - k * 30 - 14]], { w: 1.2, col: '#8a8e96', pass2: false });
    if (night) { for (let k = 0; k < 6; k++) glow(tx, tb - 60 - k * 60, 30, `rgba(${[255, 120, 200][k % 3]},${[120, 200, 255][k % 3]},${[200, 255, 120][k % 3]},1)`, 0.6 + 0.3 * Math.sin(t * 4 + k)); }
    else if (Math.sin(t * 4) > 0) glow(tx, tb - 430, 14, 'rgba(255,60,40,1)', 0.9);
  }
  function headscarf(x, y, s) { push(x, y, s); blob([[-110, 40], [-120, -60], [-60, -130], [60, -130], [120, -60], [110, 40], [60, 0], [-60, 0]], { wash: '#c81e3a', washA: 1, w: 2.4, col: '#4a0a10' }); for (let q = 0; q < 8; q++) ell(-80 + q * 24, -50 + Math.sin(q) * 30, 8, 8, { wash: '#f4f0e0', washA: 1, w: 1, col: '#4a0a10' }); poly([[100, 30], [140, 90], [80, 60]], { wash: '#c81e3a', washA: 1, w: 2, col: '#4a0a10' }); pop(); }
  function grannies(t) {                                                 // цветущие дикие яблони на склоне
    const on = t > EV.td_gran - 0.1; for (const [x, y, h, sd] of [[-40, 1500, 560, 10030], [860, 1480, 620, 10031], [1150, 1360, 420, 10032]]) { appleTree(x, y, h, t, sd, { bloom: true }); if (on) glow(x, y - h * 0.75, h * 0.6, 'rgba(255,230,240,1)', 0.35 * sm((t - EV.td_gran) / 0.4)); }
    if (on) headscarf(860, 1480 - 620 * 0.98, popK(t, EV.td_gran + 0.15, 0.4) * 1.1);
  }
  function thread(t, P) {                                                // нить от яблока к прабабушкам
    if (t < EV.td_gran) return; const k = sm((t - EV.td_gran) / 0.6), ax = P.x + 100 * P.s, ay = P.y - 230 * P.s;
    for (const [bx, by] of [[860, 1000], [-40, 1060]]) { const pts = []; for (let i = 0; i <= 24 * k; i++) { const u = i / 24; pts.push([lerp(ax, bx, u), lerp(ay, by, u) - Math.sin(u * Math.PI) * 160]); } if (pts.length > 1) { pencil(pts, { w: 4, col: '#ffe8f0', a: 0.9, pass2: false, gap: false }); glow(pts[pts.length - 1][0], pts[pts.length - 1][1], 40, 'rgba(255,230,240,1)', 0.7); } }
  }

  WORLD.today = (t, u, cat) => {
    lay(30, () => { vgrad(-600, 1100, ['#4a90d8', '#a8d0ec', '#f4ecd8']); glow(800, 280, 320, 'rgba(255,244,210,1)', 0.5); });
    lay(18, () => { alatau(t, 900, { s: 1.15, key: 10040 }); haze('#e8eef4', 0.12); });
    lay(8, () => { cityBelow(t, false); haze('#eef0f2', 0.16); });
    lay(1.3, () => { const g = blob([[-400, 1420], [200, 1360], [700, 1400], [1500, 1340], [1500, 2400], [-400, 2400]], { wash: '#7aa84a', washA: 1, w: 2, col: '#2a4a1a', key: 10050 }); hatch(g.path, g.bb, { gap: 8, a: 0.16, col: '#2a4a1a', ang: -1.2, key: 10051 });
      const r = rng(10052); for (let k = 0; k < 50; k++) ell(-200 + r() * 1500, 1420 + r() * 500, 5, 5, { wash: k % 2 ? '#fff4f8' : '#f8e070', washA: 1, line: false }); grannies(t); });
    lay(1, () => { cat(); });
    lay(0.6, () => motes(36, [-100, 200, 1200, 1900], 'rgba(255,236,244,1)', t, 10060, { sp: 50, vx: 60, sz: 6, a: 0.8 }));
  };
  DIR.today = {
    outfit: 'hoodieA', light: { side: 1, rim: '#fff0d8' }, grade: ['#f0c0c8', 0.08],
    act: () => [[S0.today, 'proud'], [EV.td_gran, 'awe'], [EV.td_city, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 460, y: 1640, s: 1.1, look: t > EV.td_gran ? [0.6, -0.5] : [0.2, -0.1], hand: [92, -190], tailUp: t > EV.td_gran, squash: b.squash }),
    afterCat: (t, u, P) => { const hx = P.x + (P.hand[0] + 6) * P.s, hy = P.y + (P.hand[1] - 34) * P.s; apple(hx, hy, 38 * P.s, -0.2); thread(t, P); },
    cam: () => [[S0.today, 540, 1060, 0.04], [EV.td_gran, 540, 1000, 0], [EV.td_city, 560, 960, -0.04], [S1.today, 560, 950, -0.02]]
  };
  // ---------------------------------------------------------------- переход В today: валик маляра перекрашивает кадр
  TRANS_IN.today = { a: 0.25, b: 0.4, runA: 1, fx(k, t, A, B) {
    const x = lerp(-200, W + 200, sm(k)); drawBuf(A);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.moveTo(-10, -10); for (let y = -10; y <= H + 10; y += 40) ctx.lineTo(x + Math.sin(y * 0.03) * 24, y); ctx.lineTo(-10, H + 10); ctx.closePath(); ctx.clip(); drawBuf(B); ctx.restore();
    scr(() => { rect(x - 40, -10, 80, H + 20, { wash: '#f2ece0', washA: 1, w: 3, col: '#5a5048' }); for (let y = 0; y < H; y += 60) pencil([[x - 40, y], [x + 40, y + 20]], { w: 2, col: '#a89a88', a: 0.6, pass2: false }); pencil([[x + 40, 960], [x + 160, 960], [x + 160, 1700]], { w: 14, col: '#c8a040' }); });
  } };

  // ================================================================= КНОПКА
  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9);
    lay(40, () => { vgrad(-800, 1400, ['#05071a', '#141838', '#2a2450', '#6a3a5a']); ctx.save(); ctx.fillStyle = '#fff8e8'; const r = rng(18); for (let i = 0; i < 120; i++) { ctx.globalAlpha = 0.3 + 0.6 * Math.abs(Math.sin(t * 1.7 + i * 1.3)); ctx.fillRect(r() * 1600 - 260, r() * 1300 - 500, 2, 2); } ctx.restore(); });
    lay(16, () => { alatau(t, 1000, { s: 1.0, col: '#1e2240', colD: '#0e1028', snow: 0.45, key: 10070 }); });
    lay(10, () => cityBelow(t, true));
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
    outfit: 'hoodieA', light: { side: 1, rim: '#ffc890' }, grade: ['#3a2050', 0.26],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 640, y: 1580, s: 1.45, look: t < EV.portal + 0.3 ? [0.2, -0.5] : [0, 0.05], watchInHand: true, glow: 0.4 + 0.6 * sm((t - EV.portal) / 0.8), spin: 0.5 + (t > EV.bt_wink ? (t - EV.bt_wink) * 3 : 0),
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : t > EV.bt_wink ? [-80, -170] : [-80, -150], tilt: t > EV.bt_wink ? 0.08 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 600, 1160, 0.22], [EV.portal, 580, 1000, 0.0], [EV.bt_point + 0.2, 590, 1040, 0.08, 'x'], [EV.bt_wink, 590, 1030, 0.06], [EV.bt_wink + 0.25, 600, 1050, 0.14, 'x'], [DUR + 0.2, 600, 1040, 0.1]],
    afterCat: (t, u, P) => { const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,140,0.6)', 0.25 * P.glow, 10, t * 2);
      const fx = P.x + (P.handF[0]) * P.s, fy = P.y + (P.handF[1] - 30) * P.s; if (t < EV.bt_point) apple(fx, fy, 34 * P.s, 0.3, { bite: true }); }
  };
  // ---------------------------------------------------------------- переход В button: «укус» выгрызает кадр
  TRANS_IN.button = { a: 0.25, b: 0.35, runA: 1, fx(k, t, A, B) {
    drawBuf(B); const n = Math.floor(k * 5) + 1, bites = [[1000, 500], [140, 1300], [900, 1500], [200, 400], [560, 960]];
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(0, 0, W, H); for (let i = 0; i < n; i++) { const [bx, by] = bites[i], R = (i === n - 1 ? (k * 5) % 1 : 1) * (380 + i * 120); for (let q = 0; q < 6; q++) { const a = q / 6 * 6.283; ctx.moveTo(bx + Math.cos(a) * R + R * 0.25, by + Math.sin(a) * R); ctx.arc(bx + Math.cos(a) * R, by + Math.sin(a) * R, R * 0.25, 0, 6.283, true); } ctx.moveTo(bx + R, by); ctx.arc(bx, by, R, 0, 6.283, true); }
    ctx.clip('evenodd'); drawBuf(A); ctx.restore();
  } };
})();
