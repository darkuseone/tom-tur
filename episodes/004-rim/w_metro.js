/* 004 — сцена `metro`: 2007–2025, Метро C. Разрез земли: наверху улица у Колизея, ниже слои — асфальт, Средневековье, Античность;
   проходческий щит врезается в стену руин, археологи с кистями расчищают колодцы и амфоры, счётчик 2006→2025.
   На «Станция» поезд линии C проносится через кадр — и мы на станции-музее «Colosseo — Fori Imperiali»: витрины с амфорами,
   бронзовой статуэткой, деревянным мечом, табло «350 находок». Том — метростроевец в каске (из 002).
   Переход В сцену: ротор проходческого щита врезается в кадр. */
(() => {
  EV.mt_years = WT('s9', 'копали');
  EV.mt_ruins = WT('s9', 'сплошные');
  EV.mt_station = WT('s9', 'Станция');
  EV.mt_museum = WT('s9', 'музей!');
  SHAKES.push([S0.metro, 0.4, 8], [EV.mt_station, 0.3, 6]);
  KEYW.push('руины.', 'музей!');
  const ST = t => t > EV.mt_station + 0.25;

  function cutter(x, y, R, t, a = 1) {                               // ротор щита: спицы, резцы, вращение
    push(x, y, 1, t * 1.6); ctx.save(); ctx.globalAlpha *= a;
    const d = ell(0, 0, R, R, { wash: '#c8a030', washA: 1, w: 4, col: '#2a2008' }); metalG(d.path, -R * 0.3, -R * 0.3, R * 1.2, '#f6e08a', '#c8a030', '#5a4008');
    for (let q = 0; q < 6; q++) { const an = q / 6 * 6.283; push(0, 0, 1, an); rect(-R * 0.08, 0, R * 0.16, R * 0.96, { wash: '#8a7020', washA: 1, w: 2, col: '#2a2008' }); for (let p = 1; p < 6; p++) poly([[-R * 0.12, R * p * 0.16], [0, R * p * 0.16 + R * 0.05], [R * 0.12, R * p * 0.16]], { wash: '#d8dcde', washA: 1, w: 1.4, col: '#2a2a2a' }); pop(); }
    ell(0, 0, R * 0.18, R * 0.18, { wash: '#5a4a10', washA: 1, w: 3, col: '#1a1004' }); ctx.restore(); pop();
  }
  function dig(t) {                                                  // разрез: улица с Колизеем, слои, руины, щит, археологи
    vgrad(-800, 700, ['#6aa8d8', '#bcd8ea', '#f2e8d4']);
    push(700, 640, 0.42); const c = blob([[-520, 0], [-520, -560], [-420, -640], [420, -640], [520, -560], [520, 0]], { wash: '#d8ccb0', washA: 1, w: 3, col: '#4a3a24' }); for (let r = 0; r < 3; r++) for (let q = 0; q < 11; q++) blob([[-480 + q * 92, -20 - r * 150], [-480 + q * 92, -100 - r * 150], [-450 + q * 92, -132 - r * 150], [-420 + q * 92, -100 - r * 150], [-420 + q * 92, -20 - r * 150]], { wash: '#5a4a3a', washA: 1, w: 1.6 }); poly([[200, -640], [520, -560], [520, -380], [380, -400]], { wash: '#bcd8ea', washA: 1, line: false }); pop();
    rect(-400, 640, 1900, 30, { wash: '#4a4a4e', washA: 1, w: 2, col: '#1a1a1a' }); for (let x = -380; x < 1500; x += 90) pencil([[x, 655], [x + 40, 655]], { w: 4, col: '#f0e8c0', pass2: false });
    for (const [x, col] of [[100, '#c8241e'], [300, '#2a5a8a']]) { push(x + ((t * 80) % 400), 640, 0.5); rect(-110, -90, 220, 70, { wash: col, washA: 1, w: 2, col: '#1a1a1a' }); rect(-70, -130, 120, 44, { wash: '#bcd8ea', washA: 1, w: 1.6 }); for (const wx of [-70, 70]) ell(wx, -14, 20, 20, { wash: '#1a1a1a', washA: 1, w: 1.4 }); pop(); }
    human(1000, 640, 0.42, t, { body: '#e8c04a', legs: '#3a3a4a', hair: '#3a2a1a', face: 'smile', armR: 'hold', prop: 'phone', seed: 1101 });
    const layers = [[670, 760, '#7a6a5a', 'XX'], [760, 900, '#8a6a4a', 'Средние века'], [900, 1120, '#a8805a', 'Империя'], [1120, 1500, '#9a7a5a', 'Республика']];
    for (const [y0, y1, col, nm] of layers) { const l = rect(-400, y0, 1900, y1 - y0, { wash: col, washA: 1, w: 2, col: '#2a1a0a' }); hatch(l.path, l.bb, { gap: 10, a: 0.15, col: '#2a1a0a', ang: 0.2 }); for (let k = 0; k < 20; k++) { const r = rng(10200 + y0 + k); ell(-380 + r() * 1860, y0 + 10 + r() * (y1 - y0 - 20), 6 + r() * 10, 4 + r() * 6, { wash: lerpC(col, '#000000', 0.3), washA: 1, line: false }); } txt(nm, 1160, y0 + 36, 30, { font: 'Hand', col: '#f6ecd6', a: 0.9 }); }
    // античные стены, мозаика, колодцы, амфоры
    for (let q = 0; q < 3; q++) { const x = 220 + q * 260; const w = rect(x, 940, 160, 160, { wash: '#b8643a', washA: 1, w: 2.2, col: '#3a1a08' }); for (let y = 950; y < 1100; y += 18) pencil([[x, y], [x + 160, y]], { w: 1.4, col: '#6a2a10', a: 0.6, pass2: false }); }
    rect(200, 1100, 700, 20, { wash: '#e8dcc0', washA: 1, w: 1.6, col: '#3a2a14' }); for (let x = 210; x < 890; x += 20) rect(x, 1102, 10, 10, { wash: ['#c8504a', '#2a5a8a', '#e8c04a'][(x / 20) % 3], washA: 1, line: false });
    for (let q = 0; q < 4; q++) { const x = 140 + q * 300; ell(x, 1260, 40, 12, { wash: '#2a1a10', washA: 1, w: 2 }); rect(x - 40, 1260, 80, 200, { wash: '#4a3020', washA: 0.6, line: false }); pencil([[x - 40, 1260], [x - 40, 1460]], { w: 2, col: '#2a1a0a', pass2: false }); pencil([[x + 40, 1260], [x + 40, 1460]], { w: 2, col: '#2a1a0a', pass2: false }); }
    for (const [x, y, r] of [[520, 1060, -0.3], [600, 1080, 0.2], [940, 1070, 1.4]]) { push(x, y, 0.5, r); const a = blob([[-8, 0], [-34, -50], [-30, -100], [-14, -120], [14, -120], [30, -100], [34, -50], [8, 0]], { wash: '#c8784a', washA: 1, w: 2, col: '#4a1e0a' }); shadeG(a.path, 30, 0, -20, 0, '#6a2a10', 0.5); pop(); }
    // археологи
    human(350, 1100, 0.55, t, { body: '#e8c04a', legs: '#5a6a8a', hair: '#3a2a1a', hat: 'cap', hatCol: '#f0f0f0', face: 'smile', armR: 'swing', prop: 'stick', armL: 'hold', look: 0.3, seed: 1102 });
    human(760, 1100, 0.55, t, { body: '#f08a2a', legs: '#3a3a4a', hair: '#c89a5a', hat: 'cap', hatCol: '#f0f0f0', face: 'shock', armR: 'point', armL: 'hold', look: -0.4, flip: -1, seed: 1103 });
    // тоннель и щит
    const adv = Math.min(1, (t - S0.metro) / 2.5);
    rect(-400, 1300, 400 + 600 * adv, 200, { wash: '#4a4e52', washA: 1, w: 2.4, col: '#1a1a1a' }); for (let x = -380; x < 600 * adv; x += 60) pencil([[x, 1300], [x, 1500]], { w: 3, col: '#6a6e72', pass2: false });
    rect(-400 + 600 * adv - 200, 1310, 200, 180, { wash: '#2a7a4a', washA: 1, w: 2.4, col: '#0a1a0a' }); txt('TBM', -400 + 600 * adv - 100, 1400, 40, { font: 'Osw', col: '#f6ecd6' });
    cutter(600 * adv + 10 - 400 + 30, 1400, 100, t);
    for (let k = 0; k < 10; k++) { const r = rng(hsh(FRAME, 1104 + k)); ell(600 * adv - 360 + r() * 80, 1320 + r() * 160, 6 + r() * 6, 5, { wash: '#a8805a', washA: 1, line: false }); }
  }
  function station(t) {                                              // станция-музей
    vgrad(-800, 1500, ['#1e2228', '#2e343c', '#4a5058', '#5a6068']);
    for (let q = 0; q < 9; q++) { const x = -260 + q * 200; rect(x, 300, 14, 1200, { wash: '#8a8e92', washA: 1, w: 1.6, col: '#1a1a1a' }); }
    rect(-400, 300, 1900, 60, { wash: '#e8e4dc', washA: 1, w: 2, col: '#1a1a1a' }); for (let x = -300; x < 1500; x += 120) { rect(x, 320, 80, 16, { wash: '#fff6dc', washA: 1, line: false }); glow(x + 40, 330, 90, 'rgba(255,246,220,1)', 0.4); }
    push(540, 560, 1); rect(-380, -60, 760, 120, { wash: '#1a2e4a', washA: 1, w: 3, col: '#0a0a0a' }); rect(-360, -40, 80, 80, { wash: '#c8241e', washA: 1, w: 2 }); txt('M', -320, 4, 64, { font: 'Osw', col: '#ffffff' }); rect(-270, -40, 60, 80, { wash: '#3a9a4a', washA: 1, w: 2 }); txt('C', -240, 4, 60, { font: 'Osw', col: '#ffffff' });
    txt('COLOSSEO', 40, -14, 50, { font: 'Osw', col: '#ffffff' }); txt('FORI IMPERIALI', 40, 34, 32, { font: 'Osw', col: '#d8e0e8' }); pop();
    const vit = (x, y, kind) => { push(x, y, 1); rect(-120, -220, 240, 220, { wash: '#bcd8e8', washA: 0.25, w: 3, col: '#2a3036' }); rect(-130, 0, 260, 120, { wash: '#2a3036', washA: 1, w: 2, col: '#0a0a0a' }); glow(0, -110, 160, 'rgba(255,246,220,1)', 0.35);
      if (kind === 'amph') { const a = blob([[-10, -20], [-44, -80], [-40, -150], [-18, -180], [18, -180], [40, -150], [44, -80], [10, -20]], { wash: '#c8784a', washA: 1, w: 2, col: '#4a1e0a' }); shadeG(a.path, 40, 0, -20, 0, '#6a2a10', 0.5); for (const sd of [-1, 1]) pencil([[sd * 18, -174], [sd * 46, -190], [sd * 40, -150]], { w: 6, col: '#c8784a', pass2: false }); }
      if (kind === 'bronze') { push(0, -20, 0.5); human(0, 0, 1, 0, { body: '#9a6a2a', skin: '#a8743a', hair: '#6a4a1a', long: 1, face: 'calm', armR: 'up', seed: 1110 }); pop(); }
      if (kind === 'sword') { push(0, -40, 1, 0.3); rect(-10, -150, 20, 150, { wash: '#8a6a3a', washA: 1, w: 2, col: '#2a1608' }); rect(-30, -6, 60, 14, { wash: '#6a4a24', washA: 1, w: 1.6 }); rect(-8, 8, 16, 40, { wash: '#5a3a1a', washA: 1, w: 1.6 }); pop(); }
      if (kind === 'lamps') for (let q = 0; q < 3; q++) { push(-60 + q * 60, -40 - (q % 2) * 50, 1); blob([[-30, 0], [-34, -20], [20, -24], [40, -10], [30, 0]], { wash: '#c8784a', washA: 1, w: 1.8, col: '#4a1e0a' }); ell(30, -10, 6, 4, { wash: '#2a1a0a', washA: 1, line: false }); pop(); }
      pop(); };
    vit(80, 1300, 'amph'); vit(380, 1300, 'bronze'); vit(980, 1300, 'sword'); vit(1240, 1300, 'lamps');
    push(660, 860, 1); rect(-170, -70, 340, 140, { wash: '#2a2420', washA: 0.92, w: 3, col: '#d6a842' }); txt('350', 0, -14, 72, { font: 'Osw', col: '#f6d890' }); txt('находок', 0, 44, 36, { font: 'Hand', col: '#f6ecd6' }); pop();
    for (const [x, s, sd] of [[-120, 0.9, 1120], [1180, 0.95, 1121]]) human(x, 1500, s, t, { body: ['#3a5a8a', '#c8504a'][sd % 2], legs: '#2a2a3a', hair: '#3a2a1a', face: 'shock', armR: 'hold', prop: 'phone', look: x < 0 ? 0.6 : -0.6, flip: x < 0 ? 1 : -1, seed: sd });
  }
  function trainWipe(t) {                                            // поезд линии C проносится через кадр (смена плана)
    const k = (t - EV.mt_station) / 0.5; if (k < 0 || k > 1) return;
    scr(() => { const x = lerp(1400, -2600, k); rect(x, 300, 3000, 1300, { wash: '#e8e8ea', washA: 1, w: 4, col: '#1a1a1a' }); rect(x, 1100, 3000, 120, { wash: '#3a9a4a', washA: 1, line: false });
      for (let q = 0; q < 12; q++) rect(x + 80 + q * 240, 500, 180, 340, { wash: '#2a3a4a', washA: 1, w: 3, col: '#1a1a1a' }); txt('C', x + 160, 1160, 90, { font: 'Osw', col: '#ffffff' });
      for (let i = 0; i < 30; i++) pencil([[0, 300 + i * 44], [W, 300 + i * 44]], { w: 3, col: '#ffffff', a: 0.3, pass2: false }); });
  }
  WORLD.metro = (t, u, cat) => {
    if (!ST(t)) { lay(1.6, () => dig(t)); lay(1, () => { cat(); }); }
    else { lay(2.2, () => station(t)); lay(1, () => { const f = poly([[-400, 1500], [1500, 1500], [1500, 2400], [-400, 2400]], { wash: '#8a8e92', washA: 1, w: 2, col: '#1a1a1a' }); for (let x = -400; x < 1500; x += 100) pencil([[540 + (x - 540) * 0.4, 1500], [x, 2100]], { w: 1.6, col: '#5a5e62', a: 0.6, pass2: false }); pencil([[-400, 1560], [1500, 1560]], { w: 12, col: '#e8c040', pass2: false }); cat(); }); }
    trainWipe(t);
    if (!ST(t)) motes(40, [0, 700, W, 1600], '#c8a880', t, 10210, { sp: 20, sz: 3, a: 0.6, tw: 0 });
  };
  DIR.metro = {
    outfit: 'metro', light: { side: 1, rim: '#ffe0a0' }, grade: ['#8a7a5a', 0.1],
    act: () => [[S0.metro, 'annoyed'], [EV.mt_years, 'sideeye'], [EV.mt_ruins, 'shock'], [EV.mt_station + 0.3, 'proud'], [EV.mt_museum, 'grin']],
    pose: (t, u, b) => ST(t) ? Object.assign(b, { x: 640, y: 1640, s: 1.0, look: [-0.4, -0.2], point: t > EV.mt_museum ? 1 : undefined, hand: t > EV.mt_museum ? [-120, -330] : undefined, tailUp: t > EV.mt_museum })
      : Object.assign(b, { x: 860, y: 1290, s: 0.6, prop: 'trowel', hand: [70, -220], look: t > EV.mt_ruins ? [-0.6, 0.4] : [-0.6, 0], tilt: t > EV.mt_ruins ? 0.06 : 0 }),
    cam: () => [[S0.metro, 520, 1000, -0.02], [EV.mt_years, 520, 1040, 0.0], [EV.mt_ruins, 620, 1160, 0.08, 'x'], [EV.mt_station, 620, 1160, 0.1], [EV.mt_station + 0.26, 560, 1060, -0.02], [EV.mt_museum, 600, 1100, 0.06, 'x'], [S1.metro, 600, 1100, 0.08]],
    hud: t => { if (t > EV.mt_years && !ST(t)) { const k = clamp((t - EV.mt_years) / 1.0); scr(() => { push(820, 520, popK(t, EV.mt_years, 0.3)); rect(-170, -60, 340, 120, { wash: '#2a2420', washA: 0.9, w: 3, col: '#d6a842' }); txt(String(Math.round(2006 + 19 * k)), 0, 6, 80, { font: 'Osw', col: '#f6d890' }); pop(); }); }
      stamp(t, EV.mt_museum + 0.05, 'truth', 300, 900, -0.1, 0.8); }
  };
  // ---------------------------------------------------------------- переход В сцену: ротор щита врезается в кадр
  TRANS_IN.metro = { a: 0.3, b: 0.4, runA: 1, fx(k, t, A, B) {
    drawBuf(k < 0.5 ? A : B, k < 0.5 ? 1 : 1.2 - 0.2 * sm((k - 0.5) / 0.5));
    const R = k < 0.5 ? 100 + sm(k / 0.5) * 1100 : 1200 + (k - 0.5) * 3000, a = k < 0.5 ? 1 : 1 - sm((k - 0.5) / 0.5);
    scr(() => { cutter(540, 960, R, t * 4, a); for (let i = 0; i < 20; i++) { const r = rng(hsh(FRAME, 1120 + i)), an = r() * 6.283, d = R * (0.8 + r() * 0.4); ell(540 + Math.cos(an) * d, 960 + Math.sin(an) * d, 10 + r() * 20, 8 + r() * 14, { wash: '#a8805a', washA: a, line: false }); } });
  } };
})();
