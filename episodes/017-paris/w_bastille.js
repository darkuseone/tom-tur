/* 017 — сцена `bastille`: 14 июля 1789. Огромная Бастилия с восемью башнями, толпа с вилами, пиками и трёхцветными кокардами,
   пушка, дым; на «Бастилию» стена ломается, толпа врывается; на «семь» из ворот выходят ровно семь растерянных заключённых
   (HUD-счётчик «ВНУТРИ: 7»), толпа замирает. Том — камзол. Переход — ядро и дым. */
(() => {
  EV.ba_st = wtk('s3', 'Бастилию.');
  EV.ba_7 = wtk('s3', 'семь');
  KEYW.push('Бастилию.', 'семь');
  SHAKES.push([EV.ba_st, 0.4, 8]);

  function sky(t) { vgrad(-900, 1000, ['#7a8ab0', '#c8b8a8', '#e8d0b0'], 1); for (let k = 0; k < 5; k++) { const ph = (t * 0.25 + k / 5) % 1; ell(-100 + k * 300 + ph * 60, 800 - ph * 380, 70 + ph * 110, 50 + ph * 80, { wash: '#6a6460', washA: 0.45 * (1 - ph), line: false }); } }
  function fort(t) { const br = t > EV.ba_st ? sm((t - EV.ba_st) / 0.6) : 0; bastille(560, 1100, 0.8, t, { breach: br });
    if (t > EV.ba_7) for (let i = 0; i < 7; i++) { const k = clamp((t - EV.ba_7 - i * 0.08) / 0.5), x = 520 + (i - 3) * 40 * k, y = 1100 + k * 60; human(x, y, 0.32, t, { body: '#e8e4dc', legs: '#5a5a5a', hair: '#8a8a8a', beard: i % 2 ? 'long' : null, face: 'calm', armR: 'hold', armL: 'hold', seed: 17410 + i }); } }
  function crowd2(t) {
    const surge = t > EV.ba_st && t < EV.ba_7 ? (t - EV.ba_st) * 50 : t > EV.ba_7 ? (EV.ba_7 - EV.ba_st) * 50 : 0;
    for (let i = 0; i < 9; i++) { const x = -350 + i * 170 + surge * (i % 2 ? 1 : 0.6), y = 1300 + (i % 3) * 18; human(x, y, 0.48, t, { body: ['#3a4a6a', '#e8e4dc', '#7a3a2a', '#4a5a3a', '#2a2a32', '#c8a878'][i % 6], legs: '#2a2a2e', hair: '#3a2210', hat: i % 3 === 0 ? 'cap' : i % 3 === 1 ? 'scarf' : undefined, hatCol: i % 2 ? '#c8302a' : '#2a3a6a', face: t > EV.ba_7 ? 'calm' : 'angry', armR: t > EV.ba_7 ? 'hold' : 'up', armL: 'hold', prop: i % 2 ? 'spear' : 'axe', seed: 17420 + i }); if (i % 2 === 0) { ell(x + 4, y - 150, 8, 8, { wash: '#2a4aa8', washA: 1, w: 1, col: '#000' }); ell(x + 4, y - 150, 4, 4, { wash: '#f2f2f2', washA: 1, w: 0, col: '#000' }); } }
    push(1200, 1320, 0.6); ell(-30, -20, 34, 34, { wash: '#6a4424', washA: 1, w: 2.4, col: '#2a1408' }); blob([[-60, -70], [140, -90], [150, -60], [-60, -40]], { wash: '#3a3a3e', washA: 1, w: 2.4, col: '#0a0a0e' }); pop();
  }

  WORLD.bastille = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(8, () => { for (const [x, w, h] of [[-560, 200, 240], [1150, 220, 260]]) oldHouse(x, 1100, w, h, t); fort(t); });
    lay(3, () => { rect(-600, 1100, 2300, 380, { wash: '#a8987a', washA: 1, w: 2, col: '#4a3a24' }); crowd2(t); });
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#9a8a6c', washA: 1, w: 2, col: '#4a3a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#5a4a2a', ang: 0.1, w: 1.2 }); cat(); });
    lay(0.7, () => motes(30, [-200, 0, 1300, 1700], '#c8c0b4', t, 17430, { sp: 30, vx: -20, sz: 3, a: 0.4, wob: 20 }));
  };
  DIR.bastille = {
    outfit: 'kamzol', light: { side: 1, rim: '#ffe0c0' }, grade: ['#a89080', 0.1],
    act: () => [[S0.bastille, 'shock'], [EV.ba_st, 'grin'], [EV.ba_7 - 0.03, 'sideeye']],
    pose: (t, u, b) => Object.assign(b, { x: 270, y: 1480, s: 1.0, look: [0.6, -0.3], point: t > EV.ba_7 ? 1 : undefined, hand: t > EV.ba_7 ? [220, -330] : [120, -270] }),
    cam: () => [[S0.bastille, 560, 1060, 0.04], [EV.ba_st, 580, 1040, 0.08], [EV.ba_7, 560, 1120, 0.12], [S1.bastille, 560, 1120, 0.14]],
    hud: t => { if (t > EV.ba_7) { const k = popK(t, EV.ba_7, 0.35); push(620, 760, k, 0.03); rect(-200, -66, 400, 132, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('ВНУТРИ: 7', 0, -10, 52, { font: 'Osw', col: '#a8201e' }); txt('4 фальшивомонетчика…', 0, 40, 24, { col: '#2a1a10' }); pop(); } }
  };
  TRANS_IN.bastille = { a: 0.25, b: 0.45, fx(k, t, A, B) {           // ядро летит в кадр, белый дым раскрывает эпоху
    drawBuf(k < 0.45 ? A : B, k < 0.45 ? 1 : 1.06 - 0.06 * sm((k - 0.45) / 0.55));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI); if (k < 0.45) { const s = k / 0.45; ell(lerp(-100, 540, s), lerp(400, 960, s), 20 + s * 80, 20 + s * 80, { wash: '#1a1a1a', washA: 1, w: 2, col: '#000' }); } const r = rng(17440); for (let i = 0; i < 30; i++) { const a = r() * 6.28, d = sm(k) * (200 + r() * 900); ell(540 + Math.cos(a) * d, 960 + Math.sin(a) * d * 0.8, 140 + r() * 140, 100 + r() * 100, { wash: '#e8e4dc', washA: 0.85 * f, line: false }); } });
  } };
})();
