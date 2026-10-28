/* 017 — сцена `expo`: 1887–1889, Марсово поле. Башня растёт ярусами в лесах, клёпальщики на фермах, павильоны выставки,
   флажки (только цветные, без гербов), воздушный шар; справа — художники в беретах с плакатом «ПОЗОР ПАРИЖА!» и мольбертом.
   На «башню» башня дорастает до верха, на «двадцать» — табличка «РАЗРЕШЕНИЕ: 20 ЛЕТ», на «Художники» плакаты взлетают.
   Том — архитектор. Переход В сцену — заклёпки сыплются и собирают кадр. */
(() => {
  EV.ex_tow = wtk('s5', 'башню');
  EV.ex_20 = wtk('s5', 'двадцать');
  EV.ex_art = wtk('s5', 'Художники');
  KEYW.push('выставки', 'двадцать', 'ярости.');
  const grow = t => 0.45 + 0.55 * sm((t - S0.expo) / (EV.ex_20 - S0.expo));

  function sky(t) { vgrad(-900, 1000, ['#5a8ad0', '#b0d0ea', '#f6ead4'], 1); for (let i = 0; i < 3; i++) { const x = ((i * 600 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 56, 210 + i * 90 + Math.sin(k) * 10, 76, 24, { wash: '#fbf8f0', washA: 0.85, line: false }); }
    const bx = 1200 + Math.sin(t * 0.5) * 40, by = 420 + Math.sin(t * 0.8) * 20; ell(bx, by, 70, 84, { wash: '#e8b830', washA: 1, w: 2.4, col: '#6a4a08' }); for (let q = 0; q < 4; q++) pencil([[bx - 60 + q * 40, by - 70], [bx - 50 + q * 33, by + 80]], { w: 1.4, col: '#a87a10', pass2: false }); rect(bx - 20, by + 110, 40, 30, { wash: '#8a5a32', washA: 1, w: 1.6, col: '#2a1408' }); pencil([[bx - 30, by + 70], [bx - 20, by + 110]], { w: 1.4, col: '#3a2a1a', pass2: false }); pencil([[bx + 30, by + 70], [bx + 20, by + 110]], { w: 1.4, col: '#3a2a1a', pass2: false }); }
  function field(t) {
    for (const [x, w, h, c] of [[-520, 300, 160, '#e8dcc0'], [1040, 320, 180, '#f0e2c8']]) { rect(x, 1100 - h, w, h, { wash: c, washA: 1, w: 2.4, col: '#4a3a24' }); ell(x + w / 2, 1100 - h, w * 0.3, 60, { wash: '#7a9ab8', washA: 1, w: 2, col: '#2a3a4a' }); for (let q = 0; q < 5; q++) { const fx = x + 20 + q * (w - 40) / 4; pencil([[fx, 1100 - h - 40], [fx, 1100 - h - 100]], { w: 2, col: '#3a3a3a', pass2: false }); shape([[fx, 1100 - h - 100], [fx + 30, 1100 - h - 90], [fx, 1100 - h - 80]], { wash: ['#c83a3a', '#3a5ac8', '#f0c030', '#3a8a4a', '#f2f2f2'][q], washA: 1, w: 1, col: '#2a2a2a' }); } }
    const g = grow(t); eiffel(560, 1120, 0.7, t, { build: g }); if (g < 1) { for (const lx of [380, 740]) pencil([[lx, 1120], [lx + (lx < 560 ? 60 : -60), 1120 - 900 * g]], { w: 5, col: '#8a6a3a', pass2: false }); const r = rng(17610 + Math.floor(t * 8)); for (let q = 0; q < 5; q++) { const y = 1120 - 900 * g * r(); glow(560 + (r() - 0.5) * 200, y, 26, 'rgba(255,200,90,1)', 0.8); } }
    for (let i = 0; i < 3; i++) human(400 + i * 90, 1120 - 360 * 0.7 - 20 + (i % 2) * 10, 0.22, t, { body: '#4a5a7a', legs: '#2a2a3a', hair: '#3a2210', hat: 'cap', hatCol: '#2a2a2a', face: 'calm', armR: Math.sin(t * 8 + i) > 0 ? 'up' : 'point', armL: 'hold', seed: 17620 + i });
  }
  function artists(t) {                                                // художники с плакатами протеста
    const up = t > EV.ex_art ? Math.abs(Math.sin((t - EV.ex_art) * 6)) * 30 : 0;
    for (let i = 0; i < 3; i++) { const x = 700 + i * 130; human(x, 1340, 0.5, t, { body: ['#2a2a32', '#5a3a4a', '#3a4a3a'][i], legs: '#2a2a2e', hair: '#3a2210', beard: i !== 1 ? 'long' : 'short', hat: 'bun', hatCol: '#1a1a1e', face: t > EV.ex_art ? 'angry' : 'calm', armR: 'up', armL: 'hold', seed: 17630 + i, flip: -1 }); }
    push(830, 1110 - up, 0.9, -0.05); pencil([[0, 120], [0, 40]], { w: 6, col: '#6a4424', pass2: false }); rect(-190, -60, 380, 110, { wash: '#f2ece0', washA: 1, w: 3, col: '#3a2412' }); txt('ПОЗОР ПАРИЖА!', 0, 10, 44, { font: 'Osw', col: '#a8201e' }); pop();
  }

  WORLD.expo = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(6, () => field(t));
    lay(3, () => { rect(-600, 1120, 2300, 360, { wash: '#c8b890', washA: 1, w: 2, col: '#5a4a34' }); artists(t); });
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#b8a880', washA: 1, w: 2, col: '#5a4a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#6a5a2a', ang: 0.1, w: 1.2 }); cat(); });
  };
  DIR.expo = {
    outfit: 'architect', light: { side: 1, rim: '#fff0d0' }, grade: ['#c0a878', 0.06],
    act: () => [[S0.expo, 'proud'], [EV.ex_tow, 'awe'], [EV.ex_20, 'shock'], [EV.ex_art, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 270, y: 1480, s: 1.0, look: t < EV.ex_art ? [0.4, -0.8] : [0.7, 0.0], point: t > EV.ex_tow && t < EV.ex_art ? 1 : undefined, hand: t > EV.ex_tow && t < EV.ex_art ? [150, -420] : [120, -270] }),
    cam: () => [[S0.expo, 560, 1000, 0.02], [EV.ex_tow, 560, 900, -0.02], [EV.ex_20, 560, 940, 0.0], [EV.ex_art, 700, 1120, 0.1], [S1.expo, 700, 1120, 0.12]],
    hud: t => { if (t > EV.ex_20) { const k = popK(t, EV.ex_20, 0.35); push(560, 1040, k, 0.03); rect(-220, -60, 440, 120, { wash: '#efe6d0', washA: 0.97, w: 3, col: '#5a3a1a' }); txt('РАЗРЕШЕНИЕ: 20 ЛЕТ', 0, -10, 36, { font: 'Osw', col: '#a8201e' }); txt('потом — разобрать', 0, 34, 24, { col: '#2a1a10' }); pop(); } }
  };
  TRANS_IN.expo = { a: 0.3, b: 0.45, fx(k, t, A, B) {                // заклёпки сыплются и собирают кадр
    drawBuf(A); const q = sm(k), r = rng(17640), P = new Path2D(); for (let i = 0; i < 18; i++) for (let j = 0; j < 30; j++) if (q > r() * 0.7) P.rect(i * W / 18, j * H / 30, W / 18 + 1, H / 30 + 1); inPath(P, () => drawBuf(B, 1.04 - 0.04 * q));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI), r2 = rng(17641); for (let i = 0; i < 80; i++) { const x = r2() * W, y = ((r2() * H) + k * 1600) % H; ell(x, y, 10, 10, { wash: '#8a6a4a', washA: f, w: 1.6, col: '#2a1408', a: f }); } });
  } };
})();
