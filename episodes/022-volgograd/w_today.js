/* 022 — сцена `today`: 2026, вечерняя набережная Волгограда: балюстрада, фонари, кафе, прогулочный теплоход, вдали на холме —
   «Родина-мать» силуэтом на закате. На «только» над Волгой встаёт стальная плашка «ТОЛЬКО ВОЙНА?»; на «горчица» прямо на набережной
   распахивается холодильник со светом — внутри банка «САРЕПТСКАЯ»; на «откуда?» из холодильника вылетают значки эпох (крепость 1589,
   струг 1670, горчица 1810, трактор 1930) и плашка ломается. Переход В сцену — земля: кадр трескается и осыпается кусками. */
(() => {
  EV.td_war = wtk('t1', 'только');
  EV.td_must = wtk('t1', 'горчица');
  EV.td_fridge = wtk('t1', 'холодильнике');
  EV.td_where = wtk('t1', 'откуда?');
  KEYW.push('война?', 'горчица', 'откуда?');
  SHAKES.push([EV.td_where + 0.1, 0.2, 6]);
  const L = VG.ink;

  function sky(t) { sunsetSky(t, { sx: 960, sy: 1000, sr: 90, cols: ['#1a2038', '#3a3a5a', '#7a3a52', '#c8503e', '#f8904a', '#ffd088'], seed: 23000, nb: 9 }); }
  function far(t) {                                                 // холм с «Родиной-матерью» вдали, Волга, мост, теплоход
    kurgan(300, 1040, 700, 140, { col: '#3a3044', rim: 'rgba(255,120,90,1)', seed: 23001 });
    motherland(320, 920, 0.26, t, { col: '#5a4a56', colD: '#3a3040', plinth: false, glint: 1 });
    for (let i = 0; i < 6; i++) cityBlock(500 + i * 130, 1060, 100, 80 + (i * 37) % 90, '#3a3448', t, { lit: 0.7, seed: 23002 + i });
    volga(1060, 1200, t, { sx: 960, seed: 23003, farBank: false });
    push(700 + (t - S0.today) * 30, 1140, 0.6); rect(-200, -30, 400, 40, { wash: '#efe6d4', washA: 1, w: 2, col: L }); rect(-150, -80, 280, 50, { wash: '#f6f0e4', washA: 1, w: 2, col: L }); windows(-140, -74, 260, 30, 8, 1, 23004, 1, '#ffd890', '#ffd890', 0.9); rect(-20, -120, 30, 40, { wash: '#b0283a', washA: 1, w: 2, col: L }); pop();
    for (let k = 0; k < 12; k++) { const x = -100 + k * 120; pencil([[x, 1150], [x + 60, 1120], [x + 120, 1150]], { w: 3, col: '#3a3044', a: 0.7, pass2: false }); } pencil([[-100, 1150], [1400, 1150]], { w: 6, col: '#3a3044', pass2: false });
  }
  function prom(t) {                                                // набережная: балюстрада, фонари, кафе, гуляющие
    rect(-900, 1240, 2900, 40, { wash: '#c8beb0', washA: 1, w: 2.2, col: L }); for (let k = 0; k < 30; k++) { const x = -160 + k * 50; blob([[x - 10, 1320], [x - 14, 1290], [x, 1270], [x + 14, 1290], [x + 10, 1320]], { wash: '#d8cec0', washA: 1, w: 1.4, col: L }); } rect(-900, 1320, 2900, 20, { wash: '#b8ae9e', washA: 1, w: 2, col: L });
    for (const x of [120, 560, 1000]) lamppost(x, 1340, 300, t, { lit: 1 });
    push(1120, 1340, 1); rect(-150, -200, 300, 200, { wash: '#4a3a3a', washA: 1, w: 2.4, col: L }); poly([[-170, -200], [170, -200], [150, -250], [-150, -250]], { wash: '#b0283a', washA: 1, w: 2.2, col: L }); for (let k = 0; k < 8; k++) pencil([[-150 + k * 40, -200], [-130 + k * 40, -200]], { w: 8, col: k % 2 ? '#f6f0e4' : '#b0283a', pass2: false }); rect(-120, -170, 240, 100, { wash: '#ffd890', washA: 0.9, w: 2, col: L }); txt('КАФЕ', 0, -220, 30, { col: '#f6f0e4', font: 'Osw' }); pop();
    const P = [[240, '#3a4a6a', 'cap', 'phone'], [380, '#8a2a3a', null, null], [480, '#2a5a5a', 'scarf', 'phone'], [660, '#5a4a3a', 'cap', null], [760, '#4a3a5a', null, 'phone'], [860, '#6a5a2a', null, null], [960, '#2a3a4a', 'cap', null]];
    P.forEach(([x, c, h, p], i) => human(x + Math.sin(t * 0.8 + i) * 20, 1350 + (i % 2) * 8, 0.38, t, { body: c, legs: '#2a2a34', hat: h || undefined, hatCol: '#2a2a2a', prop: p || undefined, armR: p ? 'hold' : 'down', seed: 1000 + i, flip: i % 2 ? -1 : 1 }));
    dog(600, 1356, 0.26, t, { col: '#d8a860' });
    crowd(100, 1250, 1300, 14, t, 23020, { s: 0.3, phones: 0.5 });
    human(200, 1350, 0.38, t, { body: '#e8c040', legs: '#2a2a34', seed: 1020, armR: 'wave' });   // велосипедист-ребёнок
  }
  function fridge(t) {                                              // холодильник прямо на набережной, банка горчицы
    if (t < EV.td_must - 0.2) return; const q = popK(t, EV.td_must - 0.2, 0.35), op = sm((t - EV.td_fridge) / 0.35);
    push(800, 1560, q); rect(-110, -440, 220, 440, { wash: '#eef2f4', washA: 1, w: 3, col: L }); pencil([[-110, -300], [110, -300]], { w: 3, col: L, pass2: false });
    if (op > 0) { glow(0, -220, 300, 'rgba(220,240,255,1)', 0.7 * op); rect(-100, -290, 200, 280, { wash: '#f8fbff', washA: 1, w: 2, col: L }); for (let k = 0; k < 3; k++) pencil([[-100, -220 + k * 70], [100, -220 + k * 70]], { w: 3, col: '#a8b8c8', pass2: false }); mustardJar(-20, -150, 1.0, { lab: 'САРЕПТА' }); jug(50, -10, 0.5, '#8ac0e8'); rect(30, -290, 50, 60, { wash: '#f6e8b0', washA: 1, w: 1.4, col: L });
      shape([[110, -440], [110 + 160 * op, -420], [110 + 160 * op, -20], [110, 0]], { wash: '#dde4e8', washA: 1, w: 3, col: L }); }
    else pencil([[90, -260], [90, -160]], { w: 6, col: '#8a96a6', pass2: false });
    pop();
  }
  function ground(t) {                                              // плитка набережной, скамья, урна, клумба, самокат, голуби
    rect(-900, 1380, 2900, 800, { wash: '#8a8076', washA: 1, line: false });
    for (let k = 0; k < 8; k++) { const y = 1390 + k * k * 8 + k * 26; pencil([[-200, y], [1300, y]], { w: 2, col: '#5a5048', a: 0.6, pass2: false }); for (let i = 0; i < 10; i++) { const x = -100 + i * 140 + (k % 2) * 70; pencil([[x, y], [x + (x - 540) * 0.06, y + 26 + k * 16]], { w: 1.4, col: '#5a5048', a: 0.45, pass2: false }); } }
    push(420, 1660, 0.9); rect(-160, -70, 320, 22, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); rect(-160, -110, 320, 18, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (const sd of [-1, 1]) pencil([[sd * 140, -48], [sd * 140, 0]], { w: 8, col: '#2a2a2a', pass2: false }); pop();
    push(1100, 1640, 0.8); ell(0, -60, 110, 34, { wash: '#4a6a3a', washA: 1, w: 2, col: L }); for (let i = 0; i < 12; i++) ell(-90 + i * 16, -76 - (i % 2) * 8, 10, 9, { wash: i % 3 ? '#d8203a' : '#f2d040', washA: 1, w: 1, col: L }); pop();
    push(560, 1760, 0.8); pencil([[-60, 0], [60, 0]], { w: 6, col: '#2a2a2a', pass2: false }); pencil([[50, 0], [40, -130]], { w: 6, col: '#2a2a2a', pass2: false }); pencil([[20, -130], [60, -130]], { w: 5, col: '#2a2a2a', pass2: false }); ell(-50, 4, 14, 14, { wash: '#2a2a2a', washA: 1, line: false }); ell(50, 4, 14, 14, { wash: '#2a2a2a', washA: 1, line: false }); pop();   // самокат
    for (let k = 0; k < 5; k++) { const x = 900 + k * 40 + Math.sin(t * 3 + k) * 6, y = 1760 + (k % 2) * 16; ell(x, y, 16, 10, { wash: '#8a8a96', washA: 1, w: 1.2, col: L }); ell(x + 12, y - 10, 7, 7, { wash: '#6a6a7a', washA: 1, w: 1, col: L }); }   // голуби
    push(1220, 1700, 0.7); blob([[-30, 0], [-36, -90], [36, -90], [30, 0]], { wash: '#3a4a3a', washA: 1, w: 2, col: L }); pop();
    human(1000, 1520, 0.56, t, { body: '#2a4a6a', legs: '#1a1a24', hat: 'cap', hatCol: '#b0283a', seed: 1010, prop: 'phone', armR: 'hold', flip: -1 });
    fridge(t);
  }
  function front(t) { for (const [x, h] of [[-110, 1250], [1230, 1150]]) poplar(x, 2100, h, t, { col: '#2a3624' }); }
  function hud(t) {
    if (t > EV.td_war - 0.05) { const q = popK(t, EV.td_war - 0.05, 0.35), br = sm((t - EV.td_where) / 0.4); push(580, 800, q, -0.02);
      if (br < 1) { for (const sd of [-1, 1]) { push(sd * br * 120, br * br * 300, 1, sd * br * 0.5); ctx.save(); ctx.beginPath(); ctx.rect(sd < 0 ? -260 : 0, -70, 260, 140); ctx.clip(); rect(-240, -60, 480, 120, { wash: '#3e4856', washA: 0.95, w: 3, col: VG.steelL }); txt('ТОЛЬКО ВОЙНА?', 0, 14, 56, { col: '#e8eef6', font: 'Osw' }); ctx.restore(); pop(); } }
      pop(); }
    if (t > EV.td_where - 0.05) { const k = sm((t - EV.td_where + 0.05) / 0.6); [['1589', 'КРЕПОСТЬ'], ['1670', 'РАЗИН'], ['1810', 'ГОРЧИЦА'], ['1930', 'ТРАКТОРЫ']].forEach(([y, s], i) => {
      const a = -2.4 + i * 0.55, x = lerp(800, 560 + Math.cos(a) * 300, k), yy = lerp(1300, 900 + Math.sin(a) * 260, k); push(x, yy, k * 0.9, (i - 1.5) * 0.08); rect(-110, -50, 220, 100, { wash: '#14100a', washA: 0.88, w: 3, col: VG.gold }); txt(y, 0, -6, 40, { col: '#ffe8b8', font: 'Osw' }); txt(s, 0, 32, 24, { col: VG.gold, font: 'Osw' }); pop(); }); }
  }

  WORLD.today = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => far(t));
    lay(4, () => prom(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    motes(30, [-200, 300, 1300, 1500], '#ffd0a0', t, 23005, { sp: 14, vx: 40, sz: 2.4, a: 0.45, wob: 18 });
    haze('#e07a5a', 0.05);
  };
  DIR.today = {
    outfit: 'hoodieV', light: { side: 1, rim: '#ffa070' }, grade: ['#b05a40', 0.12],
    act: () => [[S0.today, 'suspicious'], [EV.td_war, 'sideeye'], [EV.td_must, 'smug'], [EV.td_where, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1540, s: 1.04, look: t < EV.td_must ? [0.6, -0.6] : [0.8, 0.1], tailUp: t > EV.td_where,
      point: t > EV.td_fridge && t < EV.td_where + 0.4 ? 1 : undefined, hand: t > EV.td_fridge && t < EV.td_where + 0.4 ? [240, -250] : undefined }),
    cam: () => [[S0.today, 620, 960, 0.1], [EV.td_war, 600, 920, 0.04], [EV.td_must, 640, 1080, 0.1, 'x'], [EV.td_where, 600, 980, 0.06], [S1.today, 600, 980, 0.1]],
    hud
  };
  TRANS_IN.today = { a: 0.2, b: 0.4, fx(k, t, A, B) {              // земля: кадр трескается и осыпается кусками
    drawBuf(B); const r = rng(23006), cols = 4, rows = 7, cw = W / cols, ch = H / rows;
    scr(() => { for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const d = r() * 0.4, f = clamp((k - d) / 0.6); if (f >= 1) continue; const dy = f * f * 2200, rot = f * (r() - 0.5) * 1.2;
        ctx.save(); ctx.translate(i * cw + cw / 2, j * ch + ch / 2 + dy); ctx.rotate(rot); ctx.drawImage(A, i * cw, j * ch, cw, ch, -cw / 2, -ch / 2, cw, ch); ctx.strokeStyle = '#2a1a10'; ctx.lineWidth = 4; ctx.strokeRect(-cw / 2, -ch / 2, cw, ch); ctx.restore(); }
      motes(80, [0, 0, W, H], '#7a5a3a', t, 23007, { sp: 400, vx: 0, sz: 5, a: Math.sin(Math.PI * k), wob: 20 }); });
  } };
})();
