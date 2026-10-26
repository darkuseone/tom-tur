/* 018 — сцена `chaliapin`: 18.12.1890, сцена уфимского городского театра. Занавес раскрывается, на сцене — оперная декорация
   (польский замок «Гальки»), долговязый 17-летний бас в кафтане Стольника, суфлёрская будка, оркестровая яма со смычками,
   в ложах — публика с лорнетами. На «Шаляпин» над ним бейдж «Ф. ШАЛЯПИН · 17 лет», на «замену» — табличка «вместо заболевшего».
   Том — сюртук и цилиндр в ложе. Переход В сцену — красный занавес закрывается и раскрывается. */
(() => {
  EV.ch_name = wtk('s4', 'Шаляпин');
  EV.ch_sub = wtk('s4', 'замену.');
  KEYW.push('Шаляпин', 'опере', 'замену.');

  function hall(t) { vgrad(-900, 1600, ['#2a1410', '#4a2418'], 1); for (let q = 0; q < 3; q++) for (let b = 0; b < 6; b++) { const x = -500 + b * 380, y = 500 + q * 150; rect(x, y, 300, 110, { wash: '#6a2a1e', washA: 1, w: 2, col: '#1a0604' }); rect(x, y + 90, 300, 20, { wash: UF.gold, washA: 1, w: 1, col: '#5a3a08' }); for (let p = 0; p < 3; p++) { ell(x + 60 + p * 90, y + 50, 16, 18, { wash: '#e8c8a8', washA: 1, w: 1, col: '#3a2a1a' }); rect(x + 44 + p * 90, y + 64, 32, 30, { wash: ['#2a2a32', '#7a2a4a', '#2a4a6a'][p], washA: 1, w: 1, col: '#000' }); } } glow(540, 300, 300, 'rgba(255,220,150,1)', 0.3); }
  function scene(t) {
    stage(560, 1260, 0.62, t, { lit: true, open: t > S0.chaliapin + 0.3 ? sm((t - S0.chaliapin - 0.3) / 0.8) : 0 });
    if (t > S0.chaliapin + 0.6) { push(560, 1250, 0.62); for (const tx of [-280, 280]) { rect(tx - 60, -440, 120, 440, { wash: '#a89878', washA: 1, w: 2, col: '#3a2a1a' }); for (let q = 0; q < 4; q++) rect(tx - 50 + q * 26, -470, 18, 30, { wash: '#a89878', washA: 1, w: 1.2, col: '#3a2a1a' }); } pop();
      human(560, 1250, 0.66, t, { body: '#7a2a1e', bodyD: '#3a0a08', trim: UF.gold, legs: '#2a2a2e', boots: '#1a1a1a', hair: '#d8b878', face: 'smile', armR: 'up', armL: 'hold', long: true, seed: 18510 }); for (let q = 0; q < 3; q++) { const ph = (t * 1.2 + q / 3) % 1; txt('♪', 620 + ph * 100, 1010 - ph * 200, 40, { col: '#ffe8b0', a: 1 - ph }); } }
    rect(500, 1250, 120, 40, { wash: '#3a2a1a', washA: 1, w: 2, col: '#000' }); ell(560, 1250, 60, 30, { wash: '#3a2a1a', washA: 1, w: 2, col: '#000' });
    rect(-600, 1290, 2300, 180, { wash: '#1a1010', washA: 1, w: 2, col: '#000' }); for (let i = 0; i < 9; i++) { const x = -100 + i * 140; ell(x, 1340, 16, 18, { wash: '#e8c8a8', washA: 1, w: 1, col: '#3a2a1a' }); pencil([[x + 10, 1340], [x + 60 + Math.sin(t * 8 + i) * 30, 1300]], { w: 2, col: '#c8a868', pass2: false }); }
  }

  WORLD.chaliapin = (t, u, cat) => {
    lay(12, () => hall(t));
    lay(4, () => scene(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#5a2a20', washA: 1, w: 2, col: '#1a0604', a: 0.5 }); hatch(g.path, g.bb, { gap: 12, a: 0.15, col: '#2a0a04', ang: 0.1, w: 1.2 }); cat(); });
  };
  DIR.chaliapin = {
    outfit: 'victorian', light: { side: 1, rim: '#ffd8a0' }, grade: ['#8a5a3a', 0.1],
    act: () => [[S0.chaliapin, 'awe'], [EV.ch_name, 'shock'], [EV.ch_sub, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 250, y: 1480, s: 1.0, look: [0.6, -0.4], point: t > EV.ch_name && t < EV.ch_sub ? 1 : undefined, hand: t > EV.ch_name && t < EV.ch_sub ? [220, -340] : [120, -270] }),
    cam: () => [[S0.chaliapin, 560, 1080, 0.04], [EV.ch_name, 600, 1100, 0.1], [EV.ch_sub, 580, 1080, 0.08], [S1.chaliapin, 580, 1080, 0.1]],
    hud: t => { if (t > EV.ch_name) { const k = popK(t, EV.ch_name, 0.35); push(620, 760, k, 0.03); rect(-220, -60, 440, 120, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('Ф. ШАЛЯПИН · 17 лет', 0, -8, 36, { font: 'Osw', col: '#5a1a10' }); txt(t > EV.ch_sub ? 'вместо заболевшего' : 'первая опера', 0, 36, 26, { col: '#2a1a10' }); pop(); } }
  };
  TRANS_IN.chaliapin = { a: 0.3, b: 0.45, fx(k, t, A, B) {           // красный занавес закрывается и раскрывается
    const q = sm(k), c = q < 0.5 ? q * 2 : 2 - q * 2; drawBuf(q < 0.5 ? A : B);
    scr(() => { for (const sd of [0, 1]) { const w = W / 2 * c + 1, x = sd ? W - w : 0; rect(x, 0, w, H, { wash: '#a81e1e', washA: 1, w: 3, col: '#4a0604' }); for (let q2 = 1; q2 < 6; q2++) pencil([[x + w * q2 / 6, 0], [x + w * q2 / 6 + 10, H]], { w: 3, col: '#6a0a08', a: 0.7, pass2: false }); } rect(0, 0, W, 120 * c, { wash: '#c8963a', washA: c, w: 0, col: '#000' }); });
  } };
})();
