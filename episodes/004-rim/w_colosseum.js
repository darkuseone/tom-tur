/* 004 — сцена `colosseum`: 80 г., открытие амфитеатра Флавиев. Новенький Колизей из травертина: статуи в арках, тент-веларий, флаги,
   толпа валит на игры. Рядом — бронзовый Колосс Нерона ≈30 м с солнечной короной. На «не за размер» — рулетка вокруг Колизея и подпись
   «COLOSSEVM?», на «в честь» камера взлетает по Колоссу вверх, на «Нерона» — корона вспыхивает, рядом мерка «30 м».
   Том — гладиатор-мурмиллон. Переход В сцену: монета-флип (кадр переворачивается как подброшенная монета). */
(() => {
  EV.cl_not = WT('s5', 'не');
  EV.cl_size = WT('s5', 'размер');
  EV.cl_honor = WT('s5', 'честь');
  EV.cl_nero = WT('s5', 'тридцатиметрового');
  SHAKES.push([EV.cl_nero + 0.1, 0.25, 6]);
  KEYW.push('размер', 'Нерона!');

  function colosseum(x, y, s, t) {                                   // фасад: 3 яруса арок + аттик, статуи в арках, веларий
    push(x, y, s);
    const F = [[-520, 0], [-520, -560], [-420, -640], [420, -640], [520, -560], [520, 0]];
    const b = blob(F, { wash: '#efe2c4', washA: 1, w: 3, col: '#4a3a24', key: 9900 }); shadeG(b.path, 520, 0, -100, 0, '#a8946a', 0.45); hatch(b.path, b.bb, { gap: 10, a: 0.08, col: '#6a5a3a', ang: 0, key: 9901 });
    for (let r = 0; r < 3; r++) { const y0 = -20 - r * 150; pencil([[-520, y0 - 140], [520, y0 - 140]], { w: 4, col: '#6a5a3a', pass2: false });
      for (let q = 0; q < 11; q++) { const ax = -480 + q * 92, curve = Math.abs(ax) * 0.12; const A = blob([[ax, y0 + curve * 0], [ax, y0 - 80], [ax + 30, y0 - 112], [ax + 60, y0 - 80], [ax + 60, y0]], { wash: '#4a3a2a', washA: 1, w: 1.8, col: '#2a1a0a' });
        if (r > 0 && q % 2) { push(ax + 30, y0 - 4, 1); sil([[-10, 0], [-12, -50], [-6, -62], [-8, -74], [0, -84], [8, -74], [6, -62], [12, -50], [10, 0]], '#f6f0e0', 0.9); pop(); }
        column(ax + 76, y0, 120, 8, { cap: ['dor', 'ion', 'cor'][r], flute: false }); } }
    rect(-520, -640, 1040, 90, { wash: '#e6d8b8', washA: 1, w: 2.4, col: '#4a3a24' }); for (let q = 0; q < 20; q++) rect(-500 + q * 52, -620, 20, 30, { wash: '#4a3a2a', washA: 1, w: 1.2 });
    for (let q = 0; q < 14; q++) { const fx = -500 + q * 77; pencil([[fx, -640], [fx, -720]], { w: 4, col: '#6a4424', pass2: false }); const wv = Math.sin(t * 4 + q) * 8; poly([[fx, -720], [fx + 40, -712 + wv], [fx, -696]], { wash: q % 2 ? '#c8241e' : '#d6a842', washA: 1, w: 1.2 }); }
    // веларий — тент на мачтах, матросы тянут канаты
    const vel = blob([[-480, -700], [-200, -760 + Math.sin(t * 1.5) * 10], [200, -762], [480, -700], [440, -680], [-440, -680]], { wash: '#e8c070', washA: 0.95, w: 2, col: '#6a4a14' }); ctx.save(); ctx.clip(vel.path); for (let x = -500; x < 500; x += 70) { ctx.fillStyle = 'rgba(200,60,40,0.55)'; ctx.fillRect(x, -800, 35, 140); } ctx.restore();
    pop();
  }
  function colossus(x, y, s, t) {                                    // бронзовый Колосс Нерона (≈30 м): фигура в плаще, корона-лучи, руль у ноги
    push(x, y, s);
    rect(-150, -200, 300, 200, { wash: '#d8ccb0', washA: 1, w: 3, col: '#3a2a14', shade: { gap: 8, a: 0.18, col: '#000' } }); txt('NERO', 0, -100, 60, { font: 'Osw', col: '#5a4a30' });
    const B = '#b07a3a', S_ = 3.3; push(0, -200, S_);
    pencil([[-70, -10], [-90, -150], [-60, -240]], { w: 10, col: '#6a4a1a', pass2: false }); blob([[-70, -10], [-96, -40], [-70, -70], [-44, -40]], { wash: B, washA: 1, w: 1.4, col: '#2a1606' });
    human(0, 0, 1, 0, { body: B, bodyD: '#4a2a0a', legs: B, boots: '#6a4a1a', skin: '#c08a44', hair: '#7a4a1a', toga: '#a06a2a', face: 'calm', armL: 'down', armR: 'up', look: 0.2, seed: 950 });
    const sh = new Path2D(); sh.rect(-90, -330, 180, 340); ctx.save(); ctx.clip(sh); glow(-30, -200, 140, 'rgba(255,230,160,1)', 0.35); ctx.restore();
    const fl = t > EV.cl_nero ? clamp((t - EV.cl_nero) / 0.3) : 0, hy = -284;
    for (let q = 0; q < 7; q++) { const a = -Math.PI * (0.12 + q * 0.76 / 6); const tip = [Math.cos(a) * 82, hy + Math.sin(a) * 82]; poly([[Math.cos(a - 0.12) * 40, hy + Math.sin(a - 0.12) * 40], tip, [Math.cos(a + 0.12) * 40, hy + Math.sin(a + 0.12) * 40]], { wash: '#d8a040', washA: 1, w: 1.2, col: '#2a1606' }); if (fl) glow(tip[0], tip[1], 20, 'rgba(255,230,140,1)', fl); }
    if (fl) glow(0, hy, 110, 'rgba(255,220,120,1)', 0.5 * fl);
    ell(86, -340, 18, 18, { wash: B, washA: 1, w: 1.4, col: '#2a1606' });
    pop(); pop();
  }
  function crowd(t) {                                                // римляне идут на игры: флаги, дети, торговец
    for (let k = 0; k < 9; k++) { const x = -200 + k * 150 + ((t * 30) % 150), s = 0.62 + (k % 3) * 0.04;
      human(x, 1390, s, t, { body: ['#c8241e', '#2a5a8a', '#e8c04a', '#efe6d0', '#5a8a3a', '#8a3a6a', '#d8a060', '#efe6d0', '#3a6a7a'][k], toga: k % 3 === 0 ? '#f2ece0' : null, long: k % 2, hair: ['#3a2a1a', '#2a1a10', '#8a6a3a', '#c8c8c8'][k % 4], hat: k === 4 ? 'scarf' : null, hatCol: '#d6a842', face: k % 2 ? 'smile' : 'grin', armR: k % 3 === 1 ? 'up' : 'swing', armL: 'down', prop: k % 3 === 1 ? 'stick' : null, look: 0.6, seed: 920 + k }); }
  }
  function ruler(t) {                                                // рулетка вокруг Колизея + «COLOSSEVM?» + мерка «30 м»
    if (t > EV.cl_not && t < EV.cl_honor + 0.2) { const k = clamp((t - EV.cl_not) / 0.5); pencil([[-60, 1060], [-60 + 760 * k, 1060]], { w: 12, col: '#e8c04a', pass2: false }); for (let x = -60; x < -60 + 760 * k; x += 40) pencil([[x, 1054], [x, 1070]], { w: 2, col: '#2a1a0a', pass2: false }); txt('COLOSSEVM?', 330, 1000, 54, { font: 'Osw', col: '#c8241e', rot: -0.04, a: k }); }
    if (t > EV.cl_nero) { const k = clamp((t - EV.cl_nero) / 0.5); pencil([[1180, 1340], [1180, 1340 - 1000 * k]], { w: 6, col: '#c8241e', pass2: false }); pencil([[1160, 1340], [1200, 1340]], { w: 6, col: '#c8241e', pass2: false }); if (k > 0.9) { pencil([[1160, 340], [1200, 340]], { w: 6, col: '#c8241e', pass2: false }); txt('≈30 м', 1110, 840, 60, { font: 'Osw', col: '#c8241e', rot: -1.5708 }); } }
  }
  WORLD.colosseum = (t, u, cat) => {
    lay(40, () => { vgrad(-1400, 1200, ['#4a88c0', '#8ab8dc', '#d8e4e8', '#f2e2c0']); glow(200, 0, 500, 'rgba(255,246,220,1)', 0.5); for (let k = 0; k < 4; k++) { const x = (k * 420 + t * 14) % 1800 - 300; for (let q = 0; q < 5; q++) ell(x + q * 52, -200 + k * 160 - Math.sin(q / 4 * Math.PI) * 26, 46, 26, { wash: '#fbf6ea', washA: 0.85, w: 1, col: '#b8a888', a: 0.25 }); }
      for (let k = 0; k < 8; k++) { const x = (100 + k * 140 + t * 50) % 1300, y = 200 + Math.sin(t + k) * 40, f = Math.sin(t * 9 + k) * 8; pencil([[x - 14, y - f], [x, y], [x + 14, y - f]], { w: 2.4, col: '#2a2a2a', pass2: false }); } });
    lay(12, () => { hills(1200, 100, '#7a9a5a', 2.2, 0.9); umbrellaPine(-100, 1200, 0.6, 9920); cypress(1200, 1200, 0.6, 9922); haze('#f2e2c0', 0.18); });
    lay(4, () => { colosseum(330, 1340, 0.8, t); colossus(1010, 1340, 0.82, t); haze('#f2e2c0', 0.05); });
    lay(2.2, () => { const st = poly([[-500, 1330], [1600, 1330], [1600, 1500], [-500, 1500]], { wash: '#b8ac98', washA: 1, w: 2, col: '#3a3024' }); crowd(t); ruler(t); });
    lay(1, () => { const g = poly([[-400, 1440], [1500, 1440], [1500, 2400], [-400, 2400]], { wash: '#c8b898', washA: 1, w: 2, col: '#3a3024', key: 9930 }); for (let k = 0; k < 24; k++) { const r = rng(9931 + k), x = -400 + r() * 1900, y = 1470 + r() * 500; poly([[x, y], [x + 100, y - 4], [x + 106, y + 44], [x + 4, y + 48]], { wash: '#d8c8a8', washA: 1, w: 1.6, col: '#5a4a34' }); }
      for (const [x, s] of [[-120, 1.1], [1160, 1.15]]) { human(x, 1500, s, t, { body: '#9a3a2a', legs: '#5a3a28', hat: 'galea', face: 'calm', armR: 'hold', prop: 'spear', armL: 'down', look: x < 0 ? 0.5 : -0.5, flip: x < 0 ? 1 : -1, seed: 940 + Math.round(s * 10) }); }
      cat(); });
    motes(40, [0, 0, W, 1500], '#ffe6a0', t, 9940, { sp: 30, sz: 3, a: 0.5, tw: 1, add: 1 });
  };
  DIR.colosseum = {
    outfit: 'gladiator', light: { side: 1, rim: '#ffe6b0' }, grade: ['#d8a060', 0.1],
    act: () => [[S0.colosseum, 'smug'], [EV.cl_not, 'sideeye'], [EV.cl_honor, 'awe'], [EV.cl_nero, 'shock']],
    pose: (t, u, b) => Object.assign(b, { x: 560, y: 1640, s: 0.92, prop: 'gladius', hand: t > EV.cl_honor ? [80, -340] : [90, -220], look: t > EV.cl_honor ? [0.6, -0.7] : [-0.4, -0.2], point: t > EV.cl_honor ? 1 : undefined, tilt: t > EV.cl_nero ? -0.08 : 0, tailUp: t > EV.cl_nero }),
    cam: () => [[S0.colosseum, 520, 1100, -0.04], [EV.cl_not, 440, 1080, 0.0], [EV.cl_honor, 700, 900, -0.06], [EV.cl_nero, 760, 820, -0.02, 'x'], [S1.colosseum, 740, 860, -0.04]],
    hud: t => { stamp(t, EV.cl_honor, 'myth', 300, 1000, -0.1, 0.8); }
  };
  // ---------------------------------------------------------------- переход В сцену: монета-флип
  TRANS_IN.colosseum = { a: 0.25, b: 0.35, runA: 1, fx(k, t, A, B) {
    const q = sm(k), ang = q * Math.PI, sy = Math.abs(Math.cos(ang)), src = q < 0.5 ? A : B;
    scr(() => { screenFill('#1a120a', 1); glow(540, 960, 900, 'rgba(255,210,120,1)', 0.4); });
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(540, 960 - Math.sin(ang) * 260); ctx.scale(1 - Math.sin(ang) * 0.25, Math.max(0.02, sy) * (1 - Math.sin(ang) * 0.25)); ctx.drawImage(src, -540, -960);
    ctx.restore(); scr(() => { const h = Math.max(30, 960 * sy * (1 - Math.sin(ang) * 0.25)), cy = 960 - Math.sin(ang) * 260; if (sy < 0.35) { ctx.fillStyle = '#d6a842'; ctx.fillRect(540 - 540 * (1 - Math.sin(ang) * 0.25), cy - 12, 1080 * (1 - Math.sin(ang) * 0.25), 24); }
      for (let i = 0; i < 12; i++) { const r = rng(hsh(FRAME, 990 + i)); glow(540 + (r() - 0.5) * 900, cy + (r() - 0.5) * h * 2, 20, 'rgba(255,240,180,1)', 0.8 * Math.sin(ang)); } });
  } };
})();
