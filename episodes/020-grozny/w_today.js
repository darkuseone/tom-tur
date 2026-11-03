/* 020 — сцена `today`: 2026, солнечный день у Сунжи. Ближе, чем в хуке: башни Грозный-Сити уходят за верх кадра, у подножия —
   фонтан, клумбы, такси, туристы с телефонами, торговец кукурузой, семья, велосипедисты; мечеть с минаретами слева в листве.
   На «без истории?» — Том косится, над ним всплывают годы 1818…2000 штампами; на «отстроили» — кран на верхушке достраивает этаж;
   на «небоскрёбы» — камера взлетает к верху башни. Переход В сцену — дождь смывает серую пыль 2000-го, под струями проступает цвет. */
(() => {
  EV.td_young = wtk('t1', 'Молодой');
  EV.td_hist = wtk('t1', 'истории?');
  EV.td_build = wtk('t1', 'отстроили');
  EV.td_sky = wtk('t1', 'небоскрёбы.');
  KEYW.push('истории?', 'небоскрёбы.');

  function towers(t) {                                             // близкие башни: крупно, уходят за верх кадра; кран на средней
    gcity(600, 1250, 1.15, t, { on: 0.15, col: '#4a6a8a', colL: '#d8ecf8' });
    const k = sm(clamp((t - EV.td_build) / 1.2)); push(600, 1250, 1.15);
    const cx = 130, top = -1000; pencil([[cx, top], [cx, top - 260]], { w: 10, col: '#e8b030', pass2: false }); for (let q = 0; q < 8; q++) pencil([[cx - 8, top - q * 32], [cx + 8, top - q * 32 - 16]], { w: 3, col: '#e8b030', pass2: false });
    pencil([[cx - 90, top - 250], [cx + 260, top - 250]], { w: 8, col: '#e8b030', pass2: false }); const hx = cx + 60 + k * 160; pencil([[hx, top - 250], [hx, top - 120 - (1 - k) * 60]], { w: 2, col: '#2a2a2a', pass2: false }); rect(hx - 40, top - 120 - (1 - k) * 60, 80, 22, { wash: '#8ab4d8', washA: 1, w: 1.6, col: '#1a1a1a' });   // кран поднимает стеклянную панель
    pop();
  }
  function plaza(t) {                                              // площадь у башен: фонтан, клумбы, люди, такси, торговец
    const L = '#14100c';
    rect(-600, 1250, 2400, 200, { wash: '#d8cdb8', washA: 1, w: 0, line: false }); for (let k = -10; k < 14; k++) pencil([[540 + k * 60, 1250], [540 + k * 120, 1450]], { w: 1, col: L, a: 0.15, pass2: false });
    push(760, 1330, 1); ell(0, 0, 200, 40, { wash: '#7ab0d0', washA: 1, w: 2.4, col: L }); ell(0, -6, 180, 30, { wash: '#a8d4ec', washA: 1, line: false }); for (let q = -3; q <= 3; q++) { const h = 120 + Math.abs(Math.sin(t * 3 + q)) * 60; pencil(spline([[q * 40, -10], [q * 44, -h], [q * 52, -h * 0.6]], false, 8), { w: 4, col: '#e8f6ff', a: 0.8, pass2: false, gap: false }); } motes(20, [560, 1120, 960, 1330], '#ffffff', t, 20261, { sp: 60, sz: 2.4, a: 0.7 }); pop();
    for (const [x, sd, o] of [[420, 201, { body: '#c83a5a', hat: 'scarf', hatCol: '#e8d8c8', long: 1, prop: 'phone', armR: 'up' }], [480, 202, { body: '#2a4a7a', prop: 'phone', armR: 'up' }], [990, 203, { body: '#3a3a3a', hat: 'cap', hatCol: '#c83a2a', armR: 'wave', flip: -1 }], [1050, 204, { body: '#6a8a3a', armL: 'hold', flip: -1 }],
      [1130, 205, { body: '#e8b030', hat: 'scarf', hatCol: '#3a2a5a', long: 1, flip: -1 }], [560, 206, { body: '#5a3a2a', hat: 'fur', hatCol: '#1a1a1a', beard: 1, prop: 'stick', armR: 'hold' }], [620, 207, { body: '#8a2a2a', armR: 'swing' }], [900, 208, { body: '#2a6a6a', hat: 'cap', hatCol: '#1a1a1a', armL: 'swing' }]])
      human(x, 1430, 0.6, t, Object.assign({ legs: '#2a2a32', seed: sd }, o));
    push(230, 1440, 0.7); rect(-80, -100, 160, 90, { wash: '#f2e0a0', washA: 1, w: 1.8, col: L }); txt('КУКУРУЗА', 0, -56, 20, { col: '#8a2a1a', font: 'Osw' }); for (const sd of [-1, 1]) ell(sd * 50, -4, 16, 16, { wash: '#2a2a2a', washA: 1, w: 1.4 }); poly([[-90, -100], [0, -150], [90, -100]], { wash: '#3a8a5a', washA: 1, w: 1.6 }); pop(); human(310, 1440, 0.56, t, { body: '#f2f2f2', legs: '#2a2a32', hat: 'cap', hatCol: '#f2f2f2', seed: 209, armR: 'hold', flip: -1 });   // торговец кукурузой
    push(1000, 1520, 0.8); blob([[-180, 0], [-170, -50], [-100, -60], [-70, -110], [80, -110], [120, -60], [180, -50], [180, 0]], { wash: '#f2c830', washA: 1, w: 2, col: L }); for (const wx of [-110, 110]) ell(wx, 0, 28, 28, { wash: '#141414', washA: 1, w: 1.6 }); rect(-60, -104, 120, 38, { wash: '#8ab4d8', washA: 1, w: 1.4 }); rect(-30, -130, 60, 18, { wash: '#f2f2f2', washA: 1, w: 1.4 }); txt('ТАКСИ', 0, -121, 14, { col: '#1a1a1a', font: 'Osw' }); pop();
  }
  function cafe(t) {                                               // кафе под полосатым тентом справа, столики, официант, дети с шарами
    const L = '#14100c';
    rect(1080, 1180, 400, 160, { wash: '#efe2c8', washA: 1, w: 2, col: L }); for (let q = 0; q < 8; q++) poly([[1060 + q * 54, 1180], [1114 + q * 54, 1180], [1104 + q * 54, 1230], [1070 + q * 54, 1230]], { wash: q % 2 ? '#c83a2a' : '#f2f2f2', washA: 1, w: 1.4, col: L });
    txt('КАФЕ «СУНЖА»', 1260, 1160, 26, { col: '#8a1a1a', font: 'Osw' }); for (let q = 0; q < 3; q++) rect(1110 + q * 120, 1250, 70, 60, { wash: '#ffe0a0', washA: 1, w: 1.4, col: L });
    for (let q = 0; q < 3; q++) { const x = 1100 + q * 130; ell(x, 1380, 40, 10, { wash: '#f2f2f2', washA: 1, w: 1.4 }); pencil([[x, 1380], [x, 1420]], { w: 3, col: '#2a2a2a', pass2: false }); ell(x - 10, 1374, 6, 4, { wash: '#8a4a2a', washA: 1, line: false }); }   // столики с чаем
    human(1150, 1430, 0.5, t, { body: '#f2f2f2', legs: '#1a1a1a', seed: 231, armR: 'hold', flip: -1 }); human(1260, 1430, 0.5, t, { body: '#4a2a5a', hat: 'scarf', hatCol: '#d8c8e8', long: 1, seed: 232 }); human(1330, 1430, 0.5, t, { body: '#2a4a3a', seed: 233, beard: 1, flip: -1 });
    for (let q = 0; q < 2; q++) { const x = 360 + q * 50; human(x, 1470, 0.4, t, { body: ['#3a8ac8', '#e8a030'][q], legs: '#2a2a40', seed: 234 + q, armR: 'up' }); pencil([[x + 30, 1380], [x + 40, 1270]], { w: 1.4, col: '#2a2a2a', pass2: false }); ell(x + 40, 1250, 22, 26, { wash: ['#e8402a', '#3ac8e8'][q], washA: 1, w: 1.4, col: L }); }
    for (let k = 0; k < 5; k++) { const x = -100 + k * 70; pencil([[x, 1420], [x, 1300]], { w: 5, col: '#3a2a1a', pass2: false }); blob([[x - 40, 1310], [x - 30, 1250], [x, 1230], [x + 34, 1256], [x + 40, 1310]], { wash: '#4a8a3a', washA: 1, w: 1.4, col: '#0a1a0a', a: 0.6 }); }   // молодые деревья
  }
  function ground(t) {
    rect(-600, 1460, 2400, 700, { wash: '#c8bca8', washA: 1, w: 0, line: false }); for (let k = 0; k < 14; k++) pencil([[-600, 1480 + k * k * 4], [1800, 1480 + k * k * 4]], { w: 1.2, col: '#3a2a1a', a: 0.18, pass2: false });
    for (const [fx, fy] of [[60, 1560], [700, 1600]]) { ell(fx, fy, 160, 36, { wash: '#5a4a3a', washA: 1, w: 1.6 }); for (let q = 0; q < 18; q++) ell(fx - 140 + q * 16, fy - 14 - (q % 3) * 8, 10, 10, { wash: ['#d83a4a', '#f2c84a', '#f2f2f2', '#c84ad8'][q % 4], washA: 1, w: 1, col: '#2a1a0a', a: 0.5 }); }
    push(420, 1600, 1); rect(-100, -40, 200, 14, { wash: '#7a5a3a', washA: 1, w: 1.6 }); rect(-100, -80, 200, 12, { wash: '#7a5a3a', washA: 1, w: 1.6 }); pop();
    for (let k = 0; k < 6; k++) { const x = 300 + k * 50 + Math.sin(t * 3 + k) * 6; ell(x, 1700, 12, 8, { wash: '#7a7a88', washA: 1, w: 1 }); }
    lamppost(1100, 1500, 320, t, { lamp: 0 }); push(1180, 1620, 1); rect(-24, -70, 48, 70, { wash: '#3a5a3a', washA: 1, w: 1.6 }); pop();
    push(880, 1700, 1); for (const wx of [-50, 50]) ell(wx, -30, 30, 30, { wash: 'rgba(0,0,0,0)', washA: 0, w: 4, col: '#2a2a2a' }); pencil([[-50, -30], [0, -70], [50, -30]], { w: 4, col: '#2a8a6a', pass2: false }); pop();
  }
  function front(t) { const L = '#0a1006'; pencil(spline([[-120, 260], [80, 320], [240, 300]], false, 8), { w: 20, col: '#2a1e14', pass2: false }); for (let k = 0; k < 8; k++) { const x = -60 + k * 40, y = 280 + Math.sin(k) * 40 + Math.sin(t * 1.4 + k) * 6; blob([[x, y], [x + 30, y - 34], [x + 64, y - 6], [x + 50, y + 34], [x + 10, y + 30]], { wash: k % 2 ? '#3a6a24' : '#4a7a2a', washA: 0.95, w: 1.4, col: L, a: 0.5 }); } }
  function hud(t) { if (t < EV.td_hist - 0.05 || t > EV.td_build) return; const k = (1 - sm((t - EV.td_build + 0.2) / 0.2)); ['1818', '1840', '1893', '1942', '1944', '1994', '2000'].forEach((y, i) => { const q = popK(t, EV.td_hist + i * 0.06, 0.3) * k; if (q <= 0) return; push(560 + (i % 4) * 110 - 60, 760 + Math.floor(i / 4) * 100 + (i % 2) * 20, q, (i % 3 - 1) * 0.08); rect(-56, -30, 112, 60, { wash: '#f2e6c8', washA: 0.95, w: 2.4, col: '#8a2a1a' }); txt(y, 0, 2, 36, { col: '#8a2a1a', font: 'Osw' }); pop(); }); }

  WORLD.today = (t, u, cat) => {
    lay(40, () => GQ.sky(t, 0));
    lay(26, () => GQ.mount(t, 0));
    lay(10, () => { mosque(-40, 1240, 0.62, t, {}); for (let k = 0; k < 6; k++) { const x = -260 + k * 90; blob([[x - 60, 1260], [x - 50, 1180], [x, 1150], [x + 54, 1186], [x + 60, 1260]], { wash: '#3a6a3a', washA: 1, w: 1.4, col: '#0a1a0a', a: 0.6 }); } });
    lay(5, () => towers(t));
    lay(2.5, () => { plaza(t); cafe(t); });
    lay(1, () => { ground(t); cat(); });
    lay(0.62, () => front(t));
    motes(20, [-200, 300, 1300, 1500], '#fff8e0', t, 20262, { sp: 10, vx: 10, sz: 2, a: 0.4 });
    haze('#e8f0f8', 0.04);
  };
  DIR.today = {
    outfit: 'hoodieG', light: { side: 1, rim: '#fff0d0' }, grade: ['#e8c080', 0.08], hud,
    act: () => [[S0.today, 'talk'], [EV.td_hist, 'sideeye'], [EV.td_build, 'proud'], [EV.td_sky, 'awe']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1540, s: 1.02, look: t < EV.td_sky ? [0.4, -0.2] : [0.5, -0.9], point: t > EV.td_build && t < EV.td_sky ? 1 : undefined, hand: t > EV.td_build && t < EV.td_sky ? [190, -340] : undefined }),
    cam: () => [[S0.today, 600, 1080, 0.1], [EV.td_build, 620, 1020, 0.04], [EV.td_sky, 640, 760, 0.06], [S1.today, 640, 620, 0.1]]
  };
  TRANS_IN.today = { a: 0.15, b: 0.4, fx(k, t, A, B) {            // дождь смывает серую пыль: сверху вниз по кадру — полосы, под ними цвет
    const lvl = lerp(-100, 2100, sm(k)); drawBuf(B); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(0, lvl, W, H); ctx.clip(); drawBuf(A); ctx.restore();
    scr(() => { const r = rng(hsh(FRAME, 2026)); for (let i = 0; i < 90; i++) { const x = r() * 1100, y = r() * lvl, l = 40 + r() * 80; pencil([[x, y], [x - 6, y + l]], { w: 2, col: '#e8f4ff', a: 0.6, pass2: false, gap: false }); }
      for (let x = 0; x < 1100; x += 60) pencil([[x, lvl - 30], [x + 30, lvl + 10]], { w: 6, col: '#c8dcec', a: 0.7, pass2: false, gap: false }); });
  } };
})();
