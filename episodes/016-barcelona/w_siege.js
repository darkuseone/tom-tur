/* 016 — сцена `siege`: 1714, осада Барселоны. Средневековая стена с проломом, дым, пушки осаждающих за турами, ядра летят,
   защитники на стене (без флагов и гербов — нейтрально). На «осада» — залпы, на «пал» стена рушится в пролом; на «праздник»
   кадр светлеет: та же улица сегодня, 11 сентября — цветы у стены, люди с цветами, конфетти (без политической символики).
   Том — бордовый камзол. Переход В сцену — пушечное ядро пробивает кадр. */
(() => {
  EV.sg_siege = wtk('s3', 'осада,');
  EV.sg_fall = wtk('s3', 'пал.');
  EV.sg_fest = wtk('s3', 'праздник');
  KEYW.push('осада,', 'пал.', 'праздник');
  SHAKES.push([EV.sg_fall, 0.4, 9]);
  const fest = t => sm((t - EV.sg_fest + 0.2) / 0.6);

  function sky(t) { const f = fest(t); vgrad(-900, 1000, [lerpC('#6a5a5a', '#5a9ad8', f), lerpC('#b08a6a', '#b8d8f0', f), lerpC('#d8b890', '#f6ecd4', f)], 1);
    if (f < 1) for (let k = 0; k < 6; k++) { const ph = (t * 0.25 + k / 6) % 1; ell(-100 + k * 260 + ph * 60, 820 - ph * 400, 80 + ph * 120, 60 + ph * 80, { wash: '#4a4448', washA: 0.5 * (1 - ph) * (1 - f), line: false }); } }
  function wall(t) {                                                   // стена, пролом, защитники, пушки
    const f = fest(t), br = t > EV.sg_fall ? sm((t - EV.sg_fall) / 0.6) : 0;
    const g = shape([[-600, 1500], [-600, 1100], [1700, 1090], [1700, 1500]], { wash: lerpC('#a89070', '#c8b88a', f), washA: 1, w: 2, col: '#5a4a2a' }); hatch(g.path, g.bb, { gap: 11, a: 0.14, col: '#7a6a4a', ang: -0.3, w: 1.1 });
    const W1 = rect(-600, 760, 2300, 380, { wash: '#bca47e', washA: 1, w: 2.6, col: '#4a3a24', shade: { gap: 8, a: 0.15, col: '#7a6444', ang: 1.4 } }); for (let x = -580; x < 1700; x += 50) rect(x, 730, 28, 30, { wash: '#bca47e', washA: 1, w: 1.6, col: '#4a3a24' });
    if (br > 0) { poly([[420, 760], [500, 760 + 380 * br * 0.2], [560, 760 + 380 * br], [700, 760 + 380 * br], [760, 760 + 380 * br * 0.3], [820, 760]], { wash: lerpC('#5a6a8a', '#a8c8e0', f), washA: 1, w: 2.4, col: '#2a2a2a' }); for (let i = 0; i < 9; i++) rect(440 + i * 40, 1100 + (i % 3) * 12, 50, 30, { wash: '#a88e68', washA: 1, w: 1.6, col: '#4a3a24' }); }
    if (f < 0.6) { for (let i = 0; i < 5; i++) { const x = -300 + i * 300; human(x, 760, 0.36, t, { body: '#3a3a5a', legs: '#2a2a2a', hair: '#3a2210', hat: 'cap', hatCol: '#2a2a2a', face: 'angry', armR: 'up', armL: 'hold', prop: 'spear', seed: 16410 + i }); } }
    if (t > EV.sg_siege && f < 0.5) { const r = rng(16420 + Math.floor(t * 4)); for (let i = 0; i < 3; i++) { const ph = (t * 1.5 + i / 3) % 1, x = lerp(1600, 400 + i * 200, ph), y = 700 - Math.sin(ph * Math.PI) * 300; ell(x, y, 14, 14, { wash: '#1a1a1a', washA: 1, w: 1, col: '#000' }); } glow(1400, 900, 120, 'rgba(255,180,90,1)', 0.6 * Math.abs(Math.sin(t * 6))); }
    if (f > 0) { ctx.save(); ctx.globalAlpha = f; for (let i = 0; i < 18; i++) { const x = -200 + i * 90, y = 1130; for (let q = 0; q < 3; q++) ell(x + q * 14, y - q * 6, 12, 10, { wash: ['#e83a5a', '#f0c030', '#e8e4dc'][q], washA: 1, w: 1, col: '#5a2a1a' }); }
      for (let i = 0; i < 6; i++) human(-120 + i * 260, 1320, 0.46, t, { body: ['#e8e4dc', '#3a8ac8', '#e83a5a', '#f0c030', '#2a2a2a', '#3a7a4a'][i], legs: '#2a3a5a', hair: ['#3a2a1a', '#e8c070', '#1a1410'][i % 3], face: 'smile', armR: 'up', armL: 'hold', seed: 16430 + i, flip: i % 2 ? 1 : -1 });
      const r = rng(16440); for (let i = 0; i < 40; i++) { const x = r() * 1300 - 100, y = ((t - EV.sg_fest) * (200 + r() * 200) + r() * 1200) % 1500; rect(x, y, 10, 6, { wash: ['#e83a5a', '#f0c030', '#3a8ac8'][i % 3], washA: 1, w: 0, col: '#000' }); } ctx.restore(); }
  }

  WORLD.siege = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(4, () => wall(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#a89070', washA: 1, w: 2, col: '#4a3a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#5a4a2a', ang: 0.1, w: 1.2 }); if (fest(t) < 0.5) { push(900, 1460, 0.8); ell(0, -40, 50, 50, { wash: '#2a2a2a', washA: 1, w: 2, col: '#000' }); pop(); } cat(); });
    lay(0.7, () => { if (fest(t) < 0.5) motes(30, [-200, 0, 1300, 1700], '#c8c0b4', t, 16450, { sp: 30, vx: -20, sz: 3, a: 0.4, wob: 20 }); });
  };
  DIR.siege = {
    outfit: 'kamzol', light: { side: 1, rim: '#ffe0c0' }, grade: ['#a08870', 0.1],
    act: () => [[S0.siege, 'shock'], [EV.sg_siege, 'scared'], [EV.sg_fall, 'shock'], [EV.sg_fest - 0.03, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 280, y: 1480, s: 1.0, look: t < EV.sg_fest ? [0.6, -0.3] : [0.6, -0.1], hand: t > EV.sg_fest ? [100, -400] : [120, -270] }),
    cam: () => [[S0.siege, 560, 1040, 0.06], [EV.sg_siege, 600, 1000, 0.04], [EV.sg_fall, 620, 1060, 0.1], [EV.sg_fest, 560, 1080, 0.04], [S1.siege, 560, 1080, 0.08]],
    hud: t => {
      if (t > EV.sg_siege && t < EV.sg_fest) { const k = popK(t, EV.sg_siege, 0.35); push(640, 1040, k, 0.03); rect(-190, -56, 380, 112, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('14 МЕСЯЦЕВ ОСАДЫ', 0, -8, 34, { font: 'Osw', col: '#a8201e' }); txt('пал 11.09.1714', 0, 34, 26, { col: '#2a1a10' }); pop(); }
      if (t > EV.sg_fest) { const k = popK(t, EV.sg_fest, 0.35); push(600, 1040, k, -0.03); rect(-220, -56, 440, 112, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('11 СЕНТЯБРЯ', 0, -8, 40, { font: 'Osw', col: '#2a1a10' }); txt('праздник — в день поражения', 0, 34, 24, { col: '#a8201e' }); pop(); }
    }
  };
  TRANS_IN.siege = { a: 0.25, b: 0.45, fx(k, t, A, B) {              // ядро пробивает кадр, дыра раскрывает новую эпоху
    const q = sm(k), cx = 600, cy = 900; drawBuf(A); const R = Math.pow(clamp((k - 0.3) / 0.7), 1.5) * 1600; if (R > 1) inCircle(cx, cy, R, () => drawBuf(B, 1.06 - 0.06 * q));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI); if (k < 0.35) { const s = k / 0.35; ell(lerp(1200, cx, s), lerp(200, cy, s), 30 + s * 60, 30 + s * 60, { wash: '#1a1a1a', washA: 1, w: 2, col: '#000' }); }
      if (R > 1) { const r = rng(16460); for (let i = 0; i < 14; i++) { const a = i * 0.45 + r() * 0.3; pencil([[cx + Math.cos(a) * R, cy + Math.sin(a) * R], [cx + Math.cos(a) * (R + 80 + r() * 160), cy + Math.sin(a) * (R + 80 + r() * 160)]], { w: 4, col: '#2a2420', a: f, pass2: false }); } } });
  } };
})();
