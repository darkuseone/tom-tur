/* 004 — сцена `vespasian`: ≈70 г., римская улица. Общественная латрина (форика) — сенаторы сидят рядком и болтают; у угла — амфоры для
   мочи, рядом сукновальня: работник топчет тоги в чане. Сборщик налога за столом со счётами и сундуком «VECTIGAL». Веспасиан (лысый,
   в пурпуре) суёт монету под нос сыну Титу. Вдали — строящийся Колизей в лесах (мостик к следующей сцене).
   На «мочу» — над амфорами зелёные волны вони, на «не пахнут» Том нюхает монету — блеск. Том — тога + монета.
   Переход В сцену: тога накрывает камеру и сдёргивается. */
(() => {
  EV.vs_tax = WT('s4', 'налогом');
  EV.vs_pee = WT('s4', 'мочу.');
  EV.vs_coin = WT('s4', 'Деньги');
  EV.vs_smell = WT('s4', 'пахнут»');
  EV.vs_her = WT('s4', 'неё!');
  KEYW.push('мочу.', 'пахнут»', 'неё!');

  function insulae(t) {                                              // многоэтажные инсулы: кирпич, балконы, бельё, вывески
    for (const [x, w, h, c, k] of [[-380, 300, 760, '#b8643a', 0], [-60, 260, 680, '#c8784a', 1], [720, 300, 720, '#a85a34', 2], [1040, 320, 800, '#c47040', 3]]) {
      const b = rect(x, 1180 - h, w, h, { wash: c, washA: 1, w: 2.4, col: '#2a1408', key: 9800 + k }); hatch(b.path, b.bb, { gap: 16, a: 0.18, col: '#5a2a10', ang: 0, key: 9801 + k }); shadeG(b.path, x + w, 0, x + w * 0.4, 0, '#4a1a08', 0.3);
      poly([[x - 20, 1180 - h], [x + w / 2, 1180 - h - 50], [x + w + 20, 1180 - h]], { wash: '#9a3a22', washA: 1, w: 2, col: '#2a1408' });
      for (let j = 0; j < Math.floor(h / 160); j++) for (let i = 0; i < 3; i++) rect(x + 30 + i * (w - 60) / 2 - 20, 1180 - h + 60 + j * 160, 40, 56, { wash: '#2a1a10', washA: 1, w: 1.6 });
      rect(x - 10, 1180 - h * 0.55, w + 20, 14, { wash: '#7a4a24', washA: 1, w: 1.8, col: '#2a1408' }); for (let q = 0; q < w / 24; q++) pencil([[x + q * 24, 1180 - h * 0.55 + 14], [x + q * 24, 1180 - h * 0.55 + 46]], { w: 2, col: '#5a3418', pass2: false });
      pencil([[x + 10, 1180 - h * 0.55 - 70], [x + w - 10, 1180 - h * 0.55 - 60]], { w: 1.6, col: '#3a2a1a', pass2: false }); for (let q = 0; q < 3; q++) { const sx = x + 40 + q * (w - 80) / 2, sw = Math.sin(t * 2 + q + k) * 6; poly([[sx - 24, 1180 - h * 0.55 - 66], [sx + 24, 1180 - h * 0.55 - 64], [sx + 26 + sw, 1180 - h * 0.55 - 6], [sx - 22 + sw, 1180 - h * 0.55 - 8]], { wash: ['#f0e8d0', '#c8a040', '#8a3a3a'][q], washA: 1, w: 1.4, col: '#3a2a14' }); } }
  }
  function colosseumBuilding(t) {                                    // строящийся Колизей в лесах вдали
    push(560, 1160, 0.55); const b = blob([[-360, 0], [-360, -380], [-200, -440], [200, -440], [360, -380], [360, 0]], { wash: '#d8c8a8', washA: 1, w: 2.4, col: '#4a3a24' }); shadeG(b.path, 360, 0, -100, 0, '#8a7a5a', 0.4);
    for (let r = 0; r < 3; r++) for (let q = 0; q < 9; q++) { const x = -320 + q * 80, y = -60 - r * 120; blob([[x, y], [x, y - 70], [x + 25, y - 92], [x + 50, y - 70], [x + 50, y]], { wash: '#5a4a34', washA: 1, w: 1.6, col: '#3a2a14' }); }
    for (let x = -380; x <= 380; x += 40) pencil([[x, 20], [x, -470 + Math.abs(x) * 0.1]], { w: 3, col: '#7a5a34', pass2: false }); for (let y = -60; y > -470; y -= 70) pencil([[-380, y], [380, y]], { w: 2.4, col: '#7a5a34', pass2: false });
    const cr = Math.sin(t * 0.8) * 0.15; push(300, -470, 1, cr); pencil([[0, 0], [0, -260]], { w: 8, col: '#6a4424', pass2: false }); pencil([[0, -260], [-200, -150]], { w: 6, col: '#6a4424', pass2: false }); pencil([[-200, -150], [-200, -40]], { w: 2, col: '#3a2a1a', pass2: false }); rect(-230, -40, 60, 40, { wash: '#d8c8a8', washA: 1, w: 1.6 }); pop();
    pop();
  }
  function latrine(t) {                                              // форика: мраморная скамья с дырками, сенаторы болтают
    const x0 = -300, y0 = 1330; rect(x0, y0 - 420, 640, 420, { wash: '#e6dcc6', washA: 1, w: 2.4, col: '#3a2a14', key: 9820 }); for (let q = 0; q < 4; q++) column(x0 + 40 + q * 186, y0 - 300, 120, 14, { cap: 'dor', flute: false });
    rect(x0, y0 - 420, 640, 40, { wash: '#c8b898', washA: 1, w: 2, col: '#3a2a14' }); txt('FORICA', x0 + 320, y0 - 398, 30, { font: 'Osw', col: '#5a4a30' });
    for (let q = 0; q < 4; q++) { human(x0 + 90 + q * 150, y0 - 60, 0.72, t, { body: ['#efe6d0', '#e0d0b0', '#f2ece0', '#d8c8a8'][q], toga: ['#f8f2e4', '#efe2c8', '#ffffff', '#e8dcc0'][q], stripe: q === 1 ? '#6e1a52' : null, long: 1, hair: ['#3a2a1a', '#8a8a8a', '#2a1a10', '#c8c8c8'][q], beard: q === 2 ? 'short' : null, face: ['smile', 'grin', 'calm', 'smile'][q], armL: q % 2 ? 'wave' : 'hold', armR: q === 3 ? 'hold' : 'down', prop: q === 3 ? 'scroll' : null, look: q % 2 ? -0.6 : 0.6, seed: 820 + q }); }
    const bench = rect(x0 + 20, y0 - 80, 600, 80, { wash: '#f2ece0', washA: 1, w: 2.4, col: '#3a2a14', key: 9821 }); shadeG(bench.path, 0, y0, 0, y0 - 80, '#8a7a5a', 0.3);
    for (let q = 0; q < 4; q++) ell(x0 + 90 + q * 150, y0 - 40, 26, 12, { wash: '#3a2a1a', washA: 1, w: 1.6 });
    pencil([[x0 + 20, y0 - 10], [x0 + 620, y0 - 10]], { w: 10, col: '#5a8aa8', a: 0.8, pass2: false });
  }
  function fullers(t) {                                              // сукновальня: амфоры с мочой, работник в чане топчет ткань
    const x0 = 820, y0 = 1330, pee = clamp((t - EV.vs_pee) / 0.3) * (1 - clamp((t - EV.vs_smell) / 0.4));
    for (let q = 0; q < 3; q++) { push(x0 - 140 + q * 70, y0, 0.9 - q * 0.05); const a = blob([[-10, 0], [-40, -60], [-36, -130], [-18, -150], [18, -150], [36, -130], [40, -60], [10, 0]], { wash: '#c8784a', washA: 1, w: 2.2, col: '#4a1e0a' }); shadeG(a.path, 30, 0, -20, 0, '#6a2a10', 0.5); for (const sd of [-1, 1]) pencil([[sd * 16, -146], [sd * 40, -160], [sd * 34, -120]], { w: 5, col: '#c8784a', pass2: false }); rect(-14, -168, 28, 20, { wash: '#c8784a', washA: 1, w: 1.6, col: '#4a1e0a' });
      if (pee > 0) for (let w = 0; w < 3; w++) { const yy = -190 - w * 40 - ((t * 60) % 40); pencil([[-20, yy], [-6, yy - 14], [8, yy], [22, yy - 14]], { w: 4, col: '#7ac04a', a: pee * 0.8, pass2: false }); } pop(); }
    if (pee > 0) { txt('URINA', x0 - 70, y0 - 300, 40, { font: 'Osw', col: '#5a8a2a', a: pee }); }
    const tub = blob([[x0 + 40, y0], [x0 + 30, y0 - 90], [x0 + 230, y0 - 90], [x0 + 220, y0]], { wash: '#8a5a32', washA: 1, w: 2.4, col: '#2a1608' }); for (const yy of [-20, -70]) pencil([[x0 + 34, y0 + yy], [x0 + 226, y0 + yy]], { w: 4, col: '#4a4a4a', pass2: false });
    const st = Math.sin(t * 7) * 18; human(x0 + 130, y0 - 80 - Math.abs(st) * 0.5, 0.78, t, { body: '#c8b088', legs: '#a88a6a', hair: '#3a2a1a', face: 'grin', armL: 'hips', armR: 'hips', look: -0.6, flip: -1, seed: 830 });
    ell(x0 + 130, y0 - 86, 90, 14, { wash: '#e8e0b0', washA: 0.9, w: 1.6, col: '#5a5a2a' });
    rect(x0 + 20, y0 - 300, 220, 50, { wash: '#efe2c0', washA: 1, w: 2, col: '#3a2410' }); txt('FVLLONICA', x0 + 130, y0 - 274, 30, { font: 'Osw', col: '#3a2410' });
  }
  function taxDesk(t) {                                              // стол сборщика, Веспасиан и Тит
    const x0 = 330, y0 = 1470;
    rect(x0 - 150, y0 - 130, 300, 24, { wash: '#8a5a32', washA: 1, w: 2.4, col: '#2a1608' }); for (const sd of [-1, 1]) rect(x0 + sd * 120 - 10, y0 - 106, 20, 106, { wash: '#6a4424', washA: 1, w: 2, col: '#2a1608' });
    push(x0 - 70, y0 - 130, 1); rect(-50, -60, 100, 60, { wash: '#7a4a24', washA: 1, w: 2.2, col: '#2a1608' }); for (let q = 0; q < 6; q++) ell(-30 + q * 12, -66 - (q % 2) * 6, 9, 5, { wash: '#d6a842', washA: 1, w: 1, col: '#7a5414' }); txt('VECTIGAL', 0, -26, 18, { font: 'Osw', col: '#f0d890' }); pop();
    push(x0 + 60, y0 - 130, 1); rect(-50, -50, 100, 50, { wash: '#a87a4a', washA: 1, w: 2, col: '#2a1608' }); for (let q = 0; q < 4; q++) { pencil([[-44, -40 + q * 12], [44, -40 + q * 12]], { w: 1.2, col: '#3a2a14', pass2: false }); for (let p = 0; p < 4; p++) ell(-30 + p * 14 + (q % 2) * 6, -40 + q * 12, 4, 4, { wash: '#2a1a10', washA: 1, line: false }); } pop();
    const coinUp = t > EV.vs_coin - 0.2;
    human(x0 - 120, y0 + 10, 1.12, t, { body: '#e8dcc4', toga: '#6e1a52', stripe: '#d6a842', long: 1, hat: 'laurel', face: t > EV.vs_smell ? 'grin' : 'smile', armR: coinUp ? 'point' : 'hips', armL: 'hips', look: 0.7, seed: 840 });
    txt('ВЕСПАСИАН', x0 - 120, y0 + 46, 30, { font: 'Hand', col: '#2a1a0a' });
    if (coinUp) { const cx = x0 - 120 + 150 * 1.12, cy = y0 + 10 - 232 * 1.12 + 10; ell(cx, cy, 14, 14, { wash: '#d6a842', washA: 1, w: 2, col: '#7a5414' }); if (t > EV.vs_smell) { glow(cx, cy, 50, 'rgba(255,240,160,1)', 0.9); rays(cx, cy, 0, 6.28, 90, 'rgba(255,240,160,0.8)', 0.6, 8, t); } }
    human(x0 + 150, y0 + 10, 1.05, t, { body: '#f0e8d4', toga: '#f8f2e4', stripe: '#6e1a52', long: 1, hair: '#4a2a14', face: t > EV.vs_smell ? 'shock' : 'angry', armL: t > EV.vs_coin ? 'up' : 'hips', armR: 'hips', look: -0.7, flip: -1, seed: 841 });
    txt('ТИТ', x0 + 150, y0 + 46, 30, { font: 'Hand', col: '#2a1a0a' });
  }
  WORLD.vespasian = (t, u, cat) => {
    lay(40, () => { vgrad(-900, 1200, ['#6aa8d0', '#b8d4e4', '#f2e4c4', '#f2d4a4']); glow(300, 300, 400, 'rgba(255,246,220,1)', 0.5); for (let k = 0; k < 3; k++) { const x = (k * 500 + t * 10) % 1700 - 300; for (let q = 0; q < 5; q++) ell(x + q * 50, 260 + k * 90 - Math.sin(q / 4 * Math.PI) * 24, 44, 24, { wash: '#fbf6ea', washA: 0.85, w: 1, col: '#b8a888', a: 0.25 }); } });
    lay(14, () => { hills(1180, 90, '#8a9a6a', 1.4, 0.8); colosseumBuilding(t); haze('#f2e4c4', 0.2); });
    lay(5, () => { insulae(t); haze('#f2e4c4', 0.08); });
    lay(2.2, () => { const st = poly([[-500, 1330], [1600, 1330], [1600, 1500], [-500, 1500]], { wash: '#8a8478', washA: 1, w: 2, col: '#2a2420' }); for (let k = 0; k < 40; k++) { const r = rng(9840 + k), x = -500 + r() * 2100; poly([[x, 1340 + r() * 140], [x + 60, 1336 + r() * 140], [x + 66, 1370 + r() * 140], [x + 4, 1376 + r() * 140]], { wash: '#a8a094', washA: 1, w: 1.4, col: '#3a342c' }); }
      latrine(t); fullers(t); });
    lay(1, () => { const g = poly([[-400, 1440], [1500, 1440], [1500, 2400], [-400, 2400]], { wash: '#9a9284', washA: 1, w: 2, col: '#2a2420', key: 9850 }); for (let k = 0; k < 30; k++) { const r = rng(9851 + k), x = -400 + r() * 1900, y = 1460 + r() * 500; poly([[x, y], [x + 90, y - 4], [x + 96, y + 40], [x + 4, y + 44]], { wash: '#b0a898', washA: 1, w: 1.6, col: '#3a342c' }); }
      for (let k = 0; k < 3; k++) { const x = 500 + k * 70; pencil([[x, 1480], [x + 40, 1480]], { w: 6, col: '#6a5a4a', a: 0.6, pass2: false }); }
      taxDesk(t); cat(); });
    motes(20, [0, 400, W, 1700], '#fff6dc', t, 9860, { sp: -6, sz: 2, a: 0.4, tw: 1, add: 1 });
  };
  DIR.vespasian = {
    outfit: 'toga', light: { side: 1, rim: '#ffe6b0' }, grade: ['#e0a060', 0.1],
    act: () => [[S0.vespasian, 'sideeye'], [EV.vs_tax, 'smug'], [EV.vs_pee, 'annoyed'], [EV.vs_coin, 'suspicious'], [EV.vs_smell, 'awe'], [EV.vs_her, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 880, y: 1640, s: 0.9, prop: t > EV.vs_coin ? 'coin' : undefined, hand: t > EV.vs_coin ? [-40, -300] : undefined, look: t < EV.vs_pee ? [-0.6, 0] : t < EV.vs_coin ? [0.2, 0] : [-0.2, -0.2], tilt: t > EV.vs_her ? 0.08 : 0, squint: t > EV.vs_pee && t < EV.vs_coin, tailUp: t > EV.vs_her }),
    cam: () => [[S0.vespasian, 540, 1060, -0.06], [EV.vs_pee, 640, 1040, -0.02], [EV.vs_coin, 500, 1140, 0.02], [EV.vs_smell, 460, 1160, 0.1, 'x'], [S1.vespasian, 480, 1160, 0.12]],
    hud: t => { stamp(t, EV.vs_smell + 0.1, 'truth', 300, 760, -0.1, 0.8); if (t > EV.vs_tax + 0.2) note('налог на мочу · ок. 70 г.', 600, 1440, t, EV.vs_tax + 0.2, EV.vs_coin, '#2a1a0a', 40, -0.03); }
  };
  // ---------------------------------------------------------------- переход В сцену: тога накрывает камеру и сдёргивается
  TRANS_IN.vespasian = { a: 0.28, b: 0.4, runA: 1, fx(k, t, A, B) {
    drawBuf(k < 0.45 ? A : B);
    const c = k < 0.45 ? sm(k / 0.45) : 1, off = k < 0.45 ? 0 : sm((k - 0.45) / 0.55);
    scr(() => { const y0 = -200 + (1 - c) * -1600 - off * 2400, x0 = off * 900;
      const P = [[-300 + x0, y0], [W + 300 + x0, y0 - 100], [W + 360 + x0, y0 + 2200 + Math.sin(t * 6) * 60], [x0 + 500, y0 + 2300], [-360 + x0, y0 + 2160]];
      const tg = blob(P, { wash: '#f1ebdb', washA: 1, w: 4, col: '#3a2a14' }); shadeG(tg.path, 0, y0 + 2200, 0, y0, '#a89c80', 0.5);
      for (let i = 0; i < 9; i++) pencil(spline([[-200 + i * 160 + x0, y0], [-140 + i * 160 + x0 + Math.sin(t * 4 + i) * 30, y0 + 1000], [-200 + i * 160 + x0, y0 + 2200]], false, 8), { w: 3, col: '#a89c80', a: 0.7, pass2: false });
      pencil(P.slice(2).map(([x, y]) => [x, y - 20]), { w: 14, col: '#6e1a52', pass2: false }); });
  } };
})();
