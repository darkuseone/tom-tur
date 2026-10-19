/* 004 — сцена `metro`: 1 декабря 2011, открытие метро Алматы. Зал станции: стрельчатые арки с казахским орнаментом, мраморный пол, люстры,
   поезд у платформы, первые пассажиры с шарами. Над платформой табло-счётчик «1988 → 2011» щёлкает годами; на «двадцать три» — «23 ГОДА»;
   на «семь станций» — схема линии: 7 точек загораются по одной. Том — метростроевец, загибает пальцы.
   Переход В сцену: сель заливает кадр грязью, щит-бур прорезает её круглым тоннелем. */
(() => {
  EV.mt_dig = wtw('s10', 'копали');
  EV.mt_23 = wtw('s10', 'двадцать');
  EV.mt_res = wtw('s10', 'Итог');
  EV.mt_7 = wtw('s10', 'семь');
  KEYW.push('года.', 'станций!');

  function hall(t) {                                                    // зал в перспективе: свод, арки с орнаментом, люстры
    vgrad(-200, 2200, ['#2a2a3a', '#8a7a6a', '#3a3230']);
    const VX = 540, VY = 900;
    blob([[-300, 260], [VX - 160, VY - 160], [VX + 160, VY - 160], [1380, 260], [1380, -300], [-300, -300]], { wash: '#e8dcc0', washA: 1, w: 2, col: '#4a4038', key: 9901 });
    poly([[-300, 2000], [1380, 2000], [VX + 160, VY + 140], [VX - 160, VY + 140]], { wash: '#c8b8a0', washA: 1, w: 2, col: '#4a4038', key: 9902 });
    for (let k = 0; k < 10; k++) { const u = k / 9; pencil([[lerp(VX - 160, -300, u), lerp(VY + 140, 2000, u)], [lerp(VX + 160, 1380, u), lerp(VY + 140, 2000, u)]], { w: 1.4, col: '#8a7a68', a: 0.5, pass2: false }); }
    for (let i = 0; i < 9; i++) { const u = i / 9; const x = lerp(VX - 160, -300, u), x2 = lerp(VX + 160, 1380, u); pencil([[x, VY + 140 + u * 860], [x2, VY + 140 + u * 860]], { w: 1.2, col: (i % 2) ? '#5a4a3a' : '#a8241e', a: 0.25, pass2: false }); }
    for (let k = 5; k >= 0; k--) { const u = Math.pow(k / 6, 0.85), aw = lerp(1500, 330, u), ah = lerp(1500, 360, u), cy = lerp(1620, VY + 140, u), sw = lerp(46, 10, u);   // стрельчатые арки
      const a = []; for (let q = 0; q <= 20; q++) { const v = q / 20, x = VX + (v - 0.5) * aw, y = cy - ah * (1 - Math.pow(Math.abs(v - 0.5) * 2, 1.6)) * 0.95; a.push([x, y]); }
      pencil(a, { w: sw, col: '#d8c8a8' }); pencil(a, { w: sw * 0.4, col: '#2a7a9a', a: 0.8, pass2: false });
      for (let q = 2; q < 19; q += 2) { const [x, y] = a[q]; poly([[x, y - sw * 0.4], [x + sw * 0.3, y], [x, y + sw * 0.4], [x - sw * 0.3, y]], { wash: '#d6a842', washA: 1, w: 1, col: '#5a3a08' }); }
      push(VX, cy - ah * 0.8, lerp(1, 0.3, u)); pencil([[0, -200], [0, -60]], { w: 3, col: '#8a6a3a', pass2: false }); for (let q = 0; q < 6; q++) { const aa = q / 6 * 6.283 + t * 0.2; ell(Math.cos(aa) * 60, -40 + Math.sin(aa) * 16, 10, 14, { wash: '#fff6d8', washA: 1, w: 1.2, col: '#8a6a3a' }); glow(Math.cos(aa) * 60, -40 + Math.sin(aa) * 16, 40, 'rgba(255,230,170,1)', 0.35); } ell(0, -40, 70, 18, { wash: 'rgba(0,0,0,0)', washA: 0, w: 3, col: '#d6a842' }); pop(); }
    glow(VX, VY, 300, 'rgba(255,236,200,1)', 0.4);
  }
  function train(t) {                                                    // поезд у платформы справа
    push(980, 1400, 1); const p = rect(-200, -340, 520, 300, { wash: '#e8eef2', washA: 1, w: 2.6, col: '#2a3a4a', key: 9910 }); rect(-200, -120, 520, 40, { wash: '#2a6a9a', washA: 1, w: 1.6, col: '#1a2a3a' });
    for (let q = 0; q < 3; q++) rect(-170 + q * 120, -300, 90, 120, { wash: '#3a5a7a', washA: 1, w: 2, col: '#1a2a3a' }); glow(-120, -240, 60, 'rgba(200,230,255,1)', 0.3); pop();
  }
  function people(t) {                                                   // первые пассажиры с шарами
    const r = rng(9920); for (let k = 0; k < 5; k++) { const x = 60 + k * 170, s = 0.8 + (k % 2) * 0.08; human(x, 1470 - (k % 2) * 20, s, t, { body: ['#a8241e', '#2a4a8a', '#e8c060', '#3a6a3a', '#6a3a6a'][k], legs: '#2a2a3a', hair: ['#1a1a1a', '#5a3a1a', '#2a1a10'][k % 3], hat: k === 2 ? 'cap' : undefined, hatCol: '#2a2a2a', face: t > EV.mt_7 ? 'grin' : 'smile', armL: 'down', armR: k % 2 ? 'up' : 'hold', prop: k % 2 ? undefined : 'phone', look: 0.2, seed: 80 + k });
      if (k % 2) { const bx = x + 70 * s, by = 1470 - 380 * s + Math.sin(t * 2 + k) * 10; pencil([[x + 82 * s, 1470 - 240 * s], [bx, by]], { w: 1.4, col: '#3a3a3a', pass2: false }); ell(bx, by - 40, 34, 42, { wash: ['#c8342a', '#2a8a4a', '#e8b030'][k % 3], washA: 1, w: 1.6, col: '#3a1a10' }); } }
  }
  function board(t) {                                                    // табло-счётчик лет и схема
    if (t < S0.metro + 0.1) return; const k = clamp((t - EV.mt_dig) / Math.max(0.3, EV.mt_23 - EV.mt_dig + 0.3)), yr = Math.round(lerp(1988, 2011, k));
    push(540, 640, 1); rect(-260, -70, 520, 140, { wash: '#121418', washA: 0.95, w: 3, col: '#d6a842' }); txt(t > EV.mt_23 ? '23 ГОДА' : '1988 → ' + yr, 0, 6, 72, { font: 'Osw', col: t > EV.mt_23 ? '#e8b030' : '#ff7a3a' }); pop();
    if (t < EV.mt_res - 0.1) return; push(540, 860, popK(t, EV.mt_res, 0.35)); rect(-380, -60, 760, 120, { wash: '#f4f0e8', washA: 0.95, w: 2.4, col: '#2a2a2a' }); pencil([[-330, 0], [330, 0]], { w: 12, col: '#c81e24' });
    const names = ['Райымбек', 'Жибек Жолы', 'Алмалы', 'Абай', 'Байконур', 'Ауэзова', 'Алатау'];
    for (let q = 0; q < 7; q++) { const x = -330 + q * 110, on = t > EV.mt_7 + q * 0.07; ell(x, 0, 16, 16, { wash: on ? '#ffffff' : '#c8c8c8', washA: 1, w: 4, col: on ? '#c81e24' : '#8a8a8a' }); if (on) txt(names[q], x, q % 2 ? 40 : -34, 18, { font: 'Osw', col: '#2a2a2a' }); }
    if (t > EV.mt_7 + 0.5) txt('= 7', 370, 10, 40, { font: 'Osw', col: '#c81e24' }); pop();
  }

  WORLD.metro = (t, u, cat) => {
    lay(1.6, () => { hall(t); });
    lay(1.2, () => { train(t); people(t); });
    lay(1, () => { cat(); board(t); });
    lay(0.65, () => { const r = rng(9930); for (let k = 0; k < 14; k++) { const x = r() * 1100, y = 1700 + r() * 200; ell(x, y, 18, 7, { wash: '#ffffff', washA: 0.25, line: false }); } });
  };
  DIR.metro = {
    outfit: 'metro', light: { side: -1, rim: '#ffe8c0' }, grade: ['#c09060', 0.08],
    act: () => [[S0.metro, 'sideeye'], [EV.mt_dig, 'annoyed'], [EV.mt_23, 'shock'], [EV.mt_res, 'smug'], [EV.mt_7, 'sideeye']],
    pose: (t, u, b) => Object.assign(b, { x: 720, y: 1640, s: 1.0, look: [-0.3, -0.3], hand: t > EV.mt_res ? [60, -300] : undefined, point: t > EV.mt_res ? 1 : undefined, prop: t < EV.mt_res ? 'trowel' : undefined, squash: b.squash }),
    cam: () => [[S0.metro, 540, 1040, 0.08], [EV.mt_23, 540, 960, 0.02], [EV.mt_7, 540, 980, 0.04], [S1.metro, 560, 1000, 0.08]]
  };
  // ---------------------------------------------------------------- переход В сцену: грязь селя заливает кадр, щит-бур прорезает её
  TRANS_IN.metro = { a: 0.3, b: 0.45, runA: 1, fx(k, t, A, B) {
    const m1 = sm(clamp(k / 0.45)); drawBuf(A);
    scr(() => { const y0 = -100 + m1 * (H + 200); const p = new Path2D(); p.moveTo(-10, -10); p.lineTo(W + 10, -10); for (let x = W + 10; x >= -10; x -= 30) p.lineTo(x, y0 + Math.sin(x * 0.02 + t * 10) * 40); p.closePath(); ctx.fillStyle = '#5a3a1e'; ctx.fill(p);
      for (let i = 0; i < 30; i++) { const r = rng(9940 + i); if (r() * H < y0) ell(r() * W, r() * y0, 20 + r() * 40, 16 + r() * 30, { wash: '#7a6a5a', washA: 1, w: 1.6, col: '#2a2018' }); } });
    if (k > 0.45) { const R = sm((k - 0.45) / 0.55) * 1400; inCircle(540, 960, R, () => drawBuf(B));
      scr(() => { pencil(ellPts(540, 960, R, R, 0, 0.02, 80), { w: 24, col: '#c8a040', pass2: false, gap: false }); for (let q = 0; q < 16; q++) { const a = q / 16 * 6.283 + t * 6; pencil([[540 + Math.cos(a) * (R - 10), 960 + Math.sin(a) * (R - 10)], [540 + Math.cos(a) * (R + 30), 960 + Math.sin(a) * (R + 30)]], { w: 8, col: '#8a8a8a', pass2: false }); } }); }
  } };
})();
