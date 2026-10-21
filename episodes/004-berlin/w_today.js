/* 004 — сцены `today` и `button`.
   today: 2026, улица в Митте: розовые трубы откачки грунтовой воды перекинуты аркой через дорогу и тянутся вдоль тротуара, из трубы
   хлещет вода в сток; стройка с краном, вдали — купол Рейхстага, ворота, телебашня. Велосипедист, кофе, туристы. На «Восемьсот лет» —
   счётчик 1237 → 2026, на «болото!» под асфальтом проступает призрак топи (камыш, кувшинки), на трубу садится лягушка — петля к хуку.
   button: ночная Шпрее у Обербаумбрюкке, жёлтая электричка по мосту, телебашня в огнях; портал часов с постерами городов.
   Переходы: В today — стена раскалывается, куски летят мимо камеры; В button — полёт сквозь розовую трубу. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.today_pipes = wt('t1', 'розовые');          // трубы загораются, насос
  EV.today_gush = wt('t1', 'откачивают');        // вода хлещет в сток
  EV.today_800 = wt('t2', 'Восемьсот');          // счётчик лет
  EV.today_ghost = wt('t2', 'болото!');          // призрак топи + лягушка — «ква»
  EV.bt_point = wt('x1', 'Пиши');
  EV.bt_wink = wt('x1', 'отмотаем!');
  SHAKES.push([S0.today + 0.05, 0.3, 10]);
  KEYW.push('розовые', 'Восемьсот', 'болото!');

  const PINK = '#e87aa8', PINKD = '#9a3a64', PINKL = '#ffc8de';
  function pipe(P, w, t, key) {                                      // розовая труба по ломаной: тело, блик, хомуты
    const sp = P; const p = shape(tubeP(sp, w, w), { wash: PINK, washA: 1, w: 2.6, col: '#3a1424', key }); shadeG(p.path, 0, 0, 0, 2000, PINKD, 0.15);
    pencil(sp.map(([x, y]) => [x, y - w * 0.22]), { w: w * 0.18, col: PINKL, a: 0.8, pass2: false });
    for (let i = 1; i < sp.length - 1; i++) { const [x, y] = sp[i]; ell(x, y, w * 0.62, w * 0.62, { wash: '#c85a8a', washA: 1, w: 2, col: '#3a1424' }); }
    const on = t > EV.today_pipes; if (on) for (let k = 0; k < 3; k++) { const ph = ((t * 0.8 + k / 3) % 1), i = Math.floor(ph * (sp.length - 1)), f = ph * (sp.length - 1) - i, a = sp[i], b = sp[Math.min(i + 1, sp.length - 1)]; glow(lerp(a[0], b[0], f), lerp(a[1], b[1], f), w * 1.2, 'rgba(255,210,230,1)', 0.35); }
  }
  function sky(t) { vgrad(-700, 1500, ['#4a86c8', '#8cbce4', '#d8e8f0', '#f6e8d4'], 1); glow(220, 440, 360, 'rgba(255,240,210,1)', 0.45); for (const [x, y, s, sd] of [[260, 300, 1.4, 101], [840, 220, 1.6, 102], [620, 520, 1.0, 103]]) cloudB(x + t * 8, y, s, '#ffffff', 0.9, sd); }
  function skyline(t) {
    tvTower(980, 1250, 0.66, t); push(160, 1150, 0.7); const dm = ell(0, 0, 110, 90, { wash: '#bcd0dc', washA: 0.85, w: 1.6, col: '#5a6a7a', a: 0.5 }); for (let q = -4; q <= 4; q++) pencil([[q * 24, -86 + Math.abs(q) * 6], [q * 27, 0]], { w: 1.2, col: '#5a6a7a', a: 0.45, pass2: false }); rect(-260, 0, 520, 180, { wash: '#d8ccb0', washA: 0.85, w: 1.4, col: '#6a5a4a', a: 0.4 }); for (let c = 0; c < 6; c++) rect(-220 + c * 80, 40, 18, 140, { wash: '#e8dcc4', washA: 0.9, line: false }); pop();
    push(560, 1250, 0.4); gate(0, 0, 1, t, { through: '#c8b090' }); pop(); haze('#eef0ee', 0.2);
  }
  function street(t) {                                               // дома Митте, стройка с краном, тротуар, дорога
    const B = [[-260, 300, 560, '#d8c4a8'], [40, 260, 620, '#c8d0d4'], [760, 300, 520, '#e0c8b8'], [1060, 300, 600, '#cfd8c8']];
    B.forEach(([x, w, h, c], i) => { rect(x, 1380 - h, w, h, { wash: c, washA: 1, w: 2.2, col: '#2a2018', key: 9100 + i }); for (let f = 0; f < Math.floor(h / 100); f++) for (let k = 0; k < Math.floor(w / 70); k++) rect(x + 18 + k * 70, 1380 - h + 30 + f * 100, 40, 60, { wash: (f + k + i) % 6 ? '#4a5a6e' : '#f6dca0', washA: 0.9, w: 1.2, col: '#2a2018' }); rect(x, 1300, w, 80, { wash: ['#3a6a5a', '#8a3a3a', '#3a4a7a', '#6a5a2a'][i], washA: 0.9, w: 1.6, col: '#1a1410' }); });
    txt('KAFFEE', 170, 1346, 30, { font: 'Osw', col: '#f6e7c8' }); txt('SPÄTI', 910, 1346, 34, { font: 'Osw', col: '#f6e7c8' });
    const cx = 560; rect(cx - 150, 900, 300, 480, { wash: '#8a8e94', washA: 0.25, line: false }); for (let y = 900; y < 1380; y += 60) pencil([[cx - 150, y], [cx + 150, y]], { w: 3, col: '#6a6e74', a: 0.7, pass2: false }); for (let x = cx - 150; x <= cx + 150; x += 75) pencil([[x, 900], [x, 1380]], { w: 3, col: '#6a6e74', a: 0.7, pass2: false });
    pencil([[cx + 40, 1380], [cx + 40, 520]], { w: 12, col: '#e8b030', pass2: false }); for (let y = 540; y < 1380; y += 40) pencil([[cx + 30, y], [cx + 50, y + 40]], { w: 3, col: '#e8b030', pass2: false }); const ja = Math.sin(t * 0.3) * 0.1; push(cx + 40, 520, 1, ja); pencil([[-160, 0], [440, 0]], { w: 12, col: '#e8b030', pass2: false }); for (let x = -150; x < 440; x += 40) pencil([[x, 0], [x + 40, -20]], { w: 3, col: '#e8b030', pass2: false }); pencil([[380, 0], [380, 280]], { w: 2, col: '#2a2a2a', pass2: false }); rect(360, 280, 40, 24, { wash: '#4a4a4a', washA: 1, w: 1.4 }); pop();
    const g = rect(-300, 1380, 1700, 900, { wash: '#8a8682', washA: 1, line: false }); shadeG(g.path, 0, 2100, 0, 1380, '#4a4644', 0.4);
    rect(-300, 1380, 1700, 70, { wash: '#b8b0a6', washA: 1, w: 1.6, col: '#3a3634' }); for (let x = -300; x < 1400; x += 80) pencil([[x, 1382], [x - 10, 1448]], { w: 1.2, col: '#6a6460', a: 0.6, pass2: false });
    for (let k = 0; k < 12; k++) rect(-260 + k * 140, 1640, 70, 12, { wash: '#f4f0e6', washA: 0.85, line: false });
  }
  function pipes(t) {
    pipe([[-300, 1430], [100, 1430], [140, 1390], [140, 760], [200, 700], [880, 700], [940, 760], [940, 1390], [980, 1430], [1400, 1430]], 46, t, 9120);
    pipe([[-300, 1500], [300, 1500], [330, 1470], [330, 1440]], 32, t, 9121);
    for (const x of [140, 940]) { rect(x - 40, 1380, 80, 60, { wash: '#7a7a7a', washA: 1, w: 2, col: '#2a2a2a' }); }
    push(880, 470, 1); ctx.save(); ctx.fillStyle = 'rgba(20,14,10,0.0)'; ctx.restore(); pop();
    const gs = t > EV.today_gush; push(1000, 1440, 1); rect(-40, -60, 60, 60, { wash: '#5a5a5e', washA: 1, w: 2, col: '#1a1a1a' }); ell(-10, -30, 20, 20, { wash: PINK, washA: 1, w: 2, col: '#3a1424' });
    const q = gs ? 1 : 0.35; for (let i = 0; i < 12; i++) { const ph = (t * 2.4 + i / 12) % 1; ell(10 + ph * 120, -30 + ph * ph * 160, 8 + ph * 10, 6 + ph * 6, { wash: '#a8d4ec', washA: 0.8 * q * (1 - ph * 0.5), line: false }); } ell(150, 120, 90 * q, 18 * q, { wash: '#8ac0dc', washA: 0.7, line: false }); pop();
    txt('GRUNDWASSER', 540, 712, 26, { font: 'Osw', col: '#5a1a34', a: 0.85 });
  }
  function ghost(t) {                                                // призрак топи под асфальтом + лягушка на трубе
    const g = sm(clamp((t - EV.today_ghost + 0.2) / 0.5)); if (g <= 0) return;
    ctx.save(); ctx.globalAlpha = 0.55 * g; const P = []; for (let i = 0; i < 40; i++) { const a = i / 40 * 6.283; P.push([540 + Math.cos(a) * 820, 1700 + Math.sin(a) * 300]); } const sp = spline(P, true, 4); ctx.fillStyle = '#4a6a2a'; ctx.fill(pathOf(sp)); ctx.restore();
    ctx.save(); ctx.globalAlpha = 0.8 * g; reeds(200, 1720, 260, t, 9130, 7); reeds(900, 1730, 240, t, 9131, 7); for (const [x, y] of [[300, 1760], [800, 1800]]) { blob([[x - 36, y], [x - 30, y - 14], [x, y - 18], [x + 30, y - 14], [x + 36, y], [x, y + 10]], { wash: '#4a8a3a', washA: 1, w: 1.8, col: '#1c2a10' }); } ctx.restore();
    frog(800, 1478, 1.0 * g, t, { croak: t > EV.today_ghost + 0.3 ? Math.max(0, Math.sin((t - EV.today_ghost) * 9)) : 0, flip: -1 });
  }
  function people(t) {
    const cy = ((t - S0.today) * 260) % 1900 - 400; push(cy, 1600, 0.9); for (const wx of [-90, 90]) { pencil(ellPts(wx, -50, 50, 50, 0, 0, 30), { w: 5, col: '#2a2a2a', pass2: false }); } pencil([[-90, -50], [-20, -130], [60, -130], [90, -50], [0, -50], [-20, -130]], { w: 5, col: '#c8302a', pass2: false }); human(0, -60, 0.62, t, { body: '#3a8a5a', legs: '#2a2a3a', hat: 'hardhat', hatCol: '#f4f0e6', face: 'smile', armR: 'point', armL: 'point', seed: 230 }); pop();
    human(80, 1470, 0.76, t, { body: '#e8b84a', legs: '#2a3a5a', hair: '#3a2010', face: t > EV.today_ghost ? 'shock' : 'smile', armR: 'hold', prop: 'phone', seed: 231 });
    human(1120, 1476, 0.78, t, { body: '#5a4a8a', legs: '#2a2a2a', hair: '#e8c070', hat: 'beret', hatCol: '#c8302a', face: t > EV.today_ghost ? 'grin' : 'calm', armR: 'hold', prop: 'camera', seed: 232, flip: -1 });
  }

  WORLD.today = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(9, () => skyline(t));
    lay(2.2, () => street(t));
    lay(1.4, () => pipes(t));
    lay(1, () => { ghost(t); people(t); cat(); });
  };
  DIR.today = {
    outfit: 'hoodieB', light: { side: 1, rim: '#ffe6b8' }, grade: ['#e89070', 0.18],
    act: () => [[S0.today, 'sideeye'], [EV.today_pipes, 'smug'], [EV.today_gush, 'awe'], [EV.today_800, 'proud'], [EV.today_ghost, 'laugh']],
    pose: (t, u, b) => Object.assign(b, {
      x: 520, y: GY, s: 1.0, look: t > EV.today_ghost ? [0.6, 0.5] : t > EV.today_pipes && t < EV.today_800 ? [0.3, -0.8] : [0.1, 0],
      hand: t > EV.today_pipes && t < EV.today_800 ? [150, -340] : t > EV.today_ghost ? [160, -200] : undefined, point: t > EV.today_pipes && t < EV.today_800 || t > EV.today_ghost ? 1 : undefined, squash: b.squash, tailUp: t > EV.today_ghost
    }),
    cam: () => [[S0.today, 540, 960, 0.12], [S0.today + 0.6, 540, 900, -0.02], [EV.today_gush, 600, 980, 0.04], [EV.today_800, 540, 960, 0.06], [EV.today_ghost, 560, 1060, 0.1], [S1.today, 560, 1080, 0.16]],
    hud: t => { if (t > EV.today_800) { const k = clamp((t - EV.today_800) / 1.0), y = Math.round(lerp(1237, 2026, sm(k))); push(540, 520, popK(t, EV.today_800, 0.3), -0.03); ctx.save(); ctx.fillStyle = 'rgba(20,14,10,0.75)'; ctx.fillRect(-230, -70, 460, 150); ctx.restore(); txt(String(y), 0, 0, 110, { font: 'Osw', col: k >= 1 ? K.amber : '#f6ecd6' }); txt('1237 → 2026', 0, 66, 36, { font: 'Hand', col: '#f6ecd6' }); pop(); } }
  };

  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9);
    lay(40, () => { vgrad(-800, 1400, ['#05071a', '#141838', '#2a2450', '#7a3a5e']); ctx.save(); ctx.fillStyle = '#fff8e8'; const r = rng(118); for (let i = 0; i < 120; i++) { ctx.globalAlpha = 0.3 + 0.6 * Math.abs(Math.sin(t * 1.7 + i * 1.3)); ctx.fillRect(r() * 1600 - 260, r() * 1300 - 500, 2, 2); } ctx.restore(); });
    lay(12, () => { tvTower(1080, 1200, 0.7, t, { night: 1 }); for (let k = 0; k < 30; k++) { const x = -500 + k * 70, h = 60 + (k * 37) % 140, y = 1220; sil([[x, y], [x, y - h], [x + 60, y - h], [x + 60, y]], '#1a1834', 1); windows(x + 4, y - h + 6, 52, h - 12, 3, Math.floor(h / 16), k * 7, 0.5, '#ffcf7a', '#8fd8ff', 0.7); } });
    lay(4, () => {                                                    // Обербаумбрюкке: кирпичные арки, две башенки, жёлтая электричка
      const by = 1230, L = '#1a0e0a'; rect(-400, by - 120, 1900, 120, { wash: '#7a3a2a', washA: 1, w: 2, col: L }); for (let k = 0; k < 9; k++) { const ax = -340 + k * 200; blob([[ax, by], [ax, by - 60], [ax + 80, by - 100], [ax + 160, by - 60], [ax + 160, by]], { wash: '#0e1024', washA: 1, w: 1.6, col: L }); }
      for (let k = 0; k < 40; k++) rect(-380 + k * 48, by - 170, 20, 50, { wash: '#8a4a32', washA: 1, w: 1.2, col: L }); rect(-400, by - 180, 1900, 14, { wash: '#6a3020', washA: 1, w: 1.4, col: L });
      for (const tx of [430, 650]) { rect(tx - 40, by - 380, 80, 260, { wash: '#8a4430', washA: 1, w: 2, col: L }); poly([[tx - 50, by - 380], [tx + 50, by - 380], [tx, by - 470]], { wash: '#3a5a4a', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) rect(tx - 12, by - 350 + q * 70, 24, 40, { wash: '#ffcf7a', washA: 0.8, line: false }); }
      const tx2 = ((t - S0.button) * 420) % 2400 - 900; for (let c = 0; c < 3; c++) { rect(tx2 + c * 230, by - 250, 220, 70, { wash: '#f2c81e', washA: 1, w: 2, col: L }); for (let q = 0; q < 5; q++) rect(tx2 + c * 230 + 14 + q * 40, by - 238, 26, 26, { wash: '#fff4d0', washA: 0.9, line: false }); }
      const rp = rect(-400, by, 1900, 300, { wash: '#14204a', washA: 1, line: false }); for (let k = 0; k < 40; k++) { const x = -380 + k * 50; pencil([[x, by + 20 + (k % 4) * 40], [x + 28, by + 20 + (k % 4) * 40]], { w: 3, col: '#ffcf7a', a: 0.4, pass2: false }); } });
    haze('#2a2050', 0.1);
    if (open > 0) lay(2, () => { const cx = 540, cy = 610, R = 400 * open;
      glow(cx, cy, R * 1.35, 'rgba(255,200,140,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(0.5, 'rgba(170,80,130,0.55)'); g.addColorStop(1, 'rgba(20,10,40,0.6)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', '#f1d27a', '#e87aa8'][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['ЛОНДОН', '#2a3a6a', '#e8b07a', 'tower'], ['СТАМБУЛ', '#8a3a2a', '#f0c070', 'col'], ['ПАРИЖ', '#3a5a8a', '#e8b07a', 'eiffel'], ['?', '#2a4a3a', '#c8e0a0', 'fuji']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); poster(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.62 + 0.14 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); });
    });
    lay(1, () => { const g = poly([[-400, 1560], [1500, 1540], [1500, 2400], [-400, 2400]], { wash: '#1e1a2a', washA: 1, w: 2, col: '#0a0810' }); for (let x = -300; x < 1400; x += 60) pencil([[x, 1550], [x, 1440]], { w: 6, col: '#2a2638', pass2: false }); pencil([[-400, 1440], [1500, 1430]], { w: 8, col: '#2a2638', pass2: false }); cat(); });
    motes(40, [0, 300, W, 1700], '#ffd8e8', t, 134, { sp: -14, sz: 2.4, a: 0.6, tw: 1, add: 1 });
  };
  DIR.button = {
    outfit: 'hoodieB', light: { side: 1, rim: '#ffc8d8' }, grade: ['#3a2050', 0.26],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 640, y: 1580, s: 1.45, look: t < EV.portal + 0.3 ? [0.2, -0.5] : [0, 0.05], watchInHand: true, glow: 0.4 + 0.6 * sm((t - EV.portal) / 0.8), spin: 0.5 + (t > EV.bt_wink ? (t - EV.bt_wink) * 3 : 0),
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : t > EV.bt_wink ? [-80, -170] : [-80, -150], tilt: t > EV.bt_wink ? 0.08 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 600, 1160, 0.22], [EV.portal, 580, 1000, 0.0], [EV.bt_point + 0.2, 590, 1040, 0.08, 'x'], [EV.bt_wink, 590, 1030, 0.06], [EV.bt_wink + 0.25, 600, 1050, 0.14, 'x'], [DUR + 0.2, 600, 1040, 0.1]],
    afterCat: (t, u, P) => { const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,200,0.6)', 0.25 * P.glow, 10, t * 2); }
  };

  // ---------------------------------------------------------------- переход В today: стена раскалывается, куски летят мимо камеры
  TRANS_IN.today = { a: 0.2, b: 0.45, fx(k, t, A, B) {
    drawBuf(B, 1.1 - 0.1 * sm(k), 540, 960);
    const r = rng(9140), q = sm(clamp((k - 0.15) / 0.85)), N = 7, M = 11, cw = W / N, ch = H / M;
    for (let i = 0; i < N; i++) for (let j = 0; j < M; j++) { const cx = (i + 0.5) * cw, cy = (j + 0.5) * ch, dx = cx - 540, dy = cy - 960, sp = 1 + q * (2.5 + r() * 3), d = q * (1 + r());
      const P = [[cx - cw / 2 + (r() - 0.5) * 30, cy - ch / 2], [cx + cw / 2, cy - ch / 2 + (r() - 0.5) * 30], [cx + cw / 2 + (r() - 0.5) * 30, cy + ch / 2], [cx - cw / 2, cy + ch / 2 + (r() - 0.5) * 30]];
      if (sp > 6) continue; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(540 + dx * sp, 960 + dy * sp); ctx.rotate(d * (r() - 0.5) * 2); ctx.scale(sp, sp); ctx.translate(-cx, -cy);
      const p = new Path2D(); p.moveTo(...P[0]); P.slice(1).forEach(pt => p.lineTo(...pt)); p.closePath(); ctx.clip(p); ctx.drawImage(A, 0, 0); ctx.restore(); }
    if (k < 0.25) scr(() => { const r2 = rng(9141); for (let i = 0; i < 14; i++) { let x = 540, y = 960; const P = [[x, y]]; const a = r2() * 6.283; for (let j = 0; j < 6; j++) { x += Math.cos(a + (r2() - 0.5)) * 120; y += Math.sin(a + (r2() - 0.5)) * 120; P.push([x, y]); } pencil(P, { w: 5, col: '#1a1a1e', a: 0.9, pass2: false }); } });
  } };
  // ---------------------------------------------------------------- переход В button: полёт сквозь розовую трубу
  TRANS_IN.button = { a: 0.3, b: 0.4, runA: 1, fx(k, t, A, B) {
    const z = sm(clamp(k / 0.5)), o = sm(clamp((k - 0.5) / 0.5));
    if (k < 0.5) drawBuf(A, 1 + z * 3, 1020, 1300); else drawBuf(B, 1.3 - 0.3 * o, 540, 960);
    scr(() => { const cx = 540, cy = 960, a = Math.sin(k * Math.PI); for (let i = 0; i < 12; i++) { const ph = (i / 12 + k * 2) % 1, R = 40 + Math.pow(ph, 2) * 1600; pencil(ellPts(cx, cy, R, R, 0, 0, 50), { w: 10 + ph * 90, col: i % 2 ? PINK : PINKD, a: a * 0.95, pass2: false, gap: false }); }
      glow(cx, cy, 300, 'rgba(255,240,250,1)', 0.6 * a); });
  } };
})();
