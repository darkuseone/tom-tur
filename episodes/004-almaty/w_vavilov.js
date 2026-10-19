/* 004 — сцена `vavilov`: сентябрь 1929, склоны Заилийского Алатау над Алма-Атой. Учёный Вавилов в шляпе пробирается сквозь дикие яблоневые заросли,
   повсюду яблоки — красные, жёлтые, полосатые, на земле ковёр. Вдали в долине — маленькая Алма-Ата. На «Родина» — Вавилов поднимает яблоко,
   над ним встаёт плакат-штамп «РОДИНА ЯБЛОК — ЗДЕСЬ!», на карте мира стрелки разбегаются от Алма-Аты. Том — ботаник с гербарием.
   Переход В сцену: звон колокола — ударные кольца расходятся и смывают кадр. */
(() => {
  EV.vv_saw = wtw('s6', 'дикие');
  EV.vv_home = wtw('s6', 'Родина');
  EV.vv_here = wtw('s6', 'здесь!');
  KEYW.push('леса:', 'здесь!');

  function vavilov(x, y, s, t) {                                         // Н. И. Вавилов: шляпа, светлый костюм, усы, рюкзак, яблоко в руке
    const up = t > EV.vv_home - 0.1 ? sm((t - EV.vv_home + 0.1) / 0.3) : 0, L = '#1c120a';
    push(x, y, s); ell(0, 2, 70, 12, { wash: '#000000', washA: 0.18, line: false });
    for (const k of [-1, 1]) { shape([[k * 8, -120], [k * 34, -120], [k * 30, -16], [k * 12, -16]], { wash: '#d8ccb0', washA: 1, w: 2.2, col: L }); blob([[k * 6, -20], [k * 36, -22], [k * 46, -4], [k * 42, 4], [k * 4, 4]], { wash: '#3a2a1a', washA: 1, w: 2.2, col: L }); }
    blob([[-60, -230], [-80, -200], [-80, -110], [-60, -100]], { wash: '#6a5a3a', washA: 1, w: 2, col: L });       // рюкзак
    const b = blob([[-56, -112], [-50, -178], [-44, -224], [-16, -238], [16, -238], [44, -224], [50, -178], [56, -112]], { wash: '#e6dcc2', washA: 1, w: 2.6, col: L, key: 9601 }); shadeG(b.path, 56, 0, -20, 0, '#a89a7a', 0.5);
    poly([[-10, -236], [10, -236], [0, -180]], { wash: '#f8f6f0', washA: 1, w: 1.4, col: L }); pencil([[0, -232], [0, -170]], { w: 5, col: '#5a2a1a', pass2: false });
    shape(tubeP([[-46, -216], [-62, -150], [-58, -100]], 28, 22), { wash: '#e6dcc2', washA: 1, w: 2.2, col: L }); ell(-58, -96, 12, 13, { wash: '#e2b48e', washA: 1, w: 2, col: L });
    const hx = lerp(70, 60, up), hy = lerp(-120, -300, up); shape(tubeP([[46, -216], [lerp(76, 70, up), lerp(-170, -250, up)], [hx, hy]], 28, 22), { wash: '#e6dcc2', washA: 1, w: 2.2, col: L }); ell(hx, hy, 12, 13, { wash: '#e2b48e', washA: 1, w: 2, col: L });
    apple(hx + 2, hy - 20, 20 + up * 6, 0.2, { col: '#c83a2a', col2: '#d8c040' }); if (up > 0.5) glow(hx, hy - 20, 70, 'rgba(255,240,180,1)', 0.5 * up);
    const hyH = -286; ell(0, -246, 16, 14, { wash: '#e2b48e', washA: 1, w: 1.6, col: L });
    const hp = ell(0, hyH, 40, 46, { wash: '#e2b48e', washA: 1, w: 2.4, col: L }); shadeG(hp.path, 40, 0, -10, 0, '#a8764e', 0.4);
    for (const ex of [-15, 15]) { ell(ex, hyH - 6, 4.5, 5, { wash: '#f8f4ea', washA: 1, w: 1.2, col: L }); ell(ex + 1, hyH - 5, 2.6, 2.8, { wash: L, washA: 1, line: false }); }
    pencil([[-22, hyH - 20], [-8, hyH - 24]], { w: 3, col: '#2a1a10', pass2: false }); pencil([[8, hyH - 24], [22, hyH - 20]], { w: 3, col: '#2a1a10', pass2: false });
    blob([[-22, hyH + 14], [0, hyH + 10], [22, hyH + 14], [14, hyH + 22], [0, hyH + 18], [-14, hyH + 22]], { wash: '#2a1a10', washA: 1, w: 1.4, col: L });   // усы
    if (up > 0.3) blob([[-12, hyH + 26], [12, hyH + 26], [0, hyH + 36]], { wash: '#5a1a10', washA: 1, w: 1.4, col: L });
    ell(0, hyH - 34, 62, 14, { wash: '#c8b890', washA: 1, w: 2.2, col: L }); blob([[-38, hyH - 36], [-32, hyH - 82], [32, hyH - 82], [38, hyH - 36]], { wash: '#d8c8a0', washA: 1, w: 2.2, col: L }); rect(-38, hyH - 52, 76, 12, { wash: '#3a2a1a', washA: 1, w: 1.2, col: L });
    pop();
  }
  function thicket(t, base, n, seed, s) { for (let k = 0; k < n; k++) { const r = rng(seed + k); appleTree(-150 + k * (1400 / n) + r() * 60, base + r() * 30, (300 + r() * 160) * s, t, seed + k * 7, { leaf: ['#6a9a30', '#8aa83a', '#c8a040'] }); } }
  function valley(t) {                                                 // далёкая Алма-Ата 1929 в долине: сетка улиц, тополя, дымки
    const v = poly([[-300, 1080], [1400, 1060], [1400, 1200], [-300, 1200]], { wash: '#b8b880', washA: 1, w: 1.6, col: '#6a6a3a' });
    const r = rng(9610); for (let k = 0; k < 60; k++) { const x = r() * 1200, y = 1080 + r() * 100; rect(x, y, 14, 9, { wash: k % 3 ? '#e0d0b0' : '#c89a7a', washA: 1, w: 0.8, col: '#6a5a3a' }); if (k % 2) pencil([[x + 20, y + 8], [x + 20, y - 18]], { w: 4, col: '#4a7a2a', pass2: false }); }
    for (let k = 0; k < 5; k++) { const u = (t * 0.3 + k / 5) % 1; glow(200 + k * 200, 1060 - u * 80, 10 + u * 20, 'rgba(200,200,200,1)', 0.3 * (1 - u), 'source-over'); }
  }
  function stamp(t) {                                                   // плакат-штамп + карта со стрелками
    if (t < EV.vv_home) return; const k = popK(t, EV.vv_home, 0.35);
    push(540, 640, k, -0.05); rect(-330, -70, 660, 140, { wash: '#f4ecd8', washA: 0.95, w: 5, col: '#a8241e' }); txt('РОДИНА ЯБЛОК —', 0, -14, 54, { font: 'Osw', col: '#a8241e' }); txt('ЗДЕСЬ!', 0, 46, 54, { font: 'Osw', col: '#2a1a0a' }); pop();
    if (t < EV.vv_here) return; const m = sm((t - EV.vv_here) / 0.6);
    push(540, 880, 1); rect(-300, -110, 600, 220, { wash: '#e8dcb8', washA: 0.95, w: 2.4, col: '#5a4a2a' });
    for (const p of [[[-260, -60], [-160, -80], [-120, -20], [-200, 20], [-250, 0]], [[-100, -80], [100, -90], [180, -40], [120, 20], [0, 10], [-90, -20]], [[-140, 30], [-80, 40], [-90, 90], [-140, 80]], [[150, 40], [220, 50], [210, 90]]]) blob(p, { wash: '#b8c890', washA: 1, w: 1.4, col: '#5a6a3a' });
    const ax = 60, ay = -30; ell(ax, ay, 9, 9, { wash: '#c81e24', washA: 1, w: 1.4, col: '#5a0a0a' }); txt('Алма-Ата', ax + 10, ay - 22, 22, { font: 'Hand', col: '#5a0a0a' });
    for (const [bx, by] of [[-220, -40], [-160, 60], [190, 60], [160, -60], [-60, -70]]) { const ex = lerp(ax, bx, m), ey = lerp(ay, by, m); pencil([[ax, ay], [ex, ey]], { w: 3, col: '#c81e24', pass2: false }); if (m > 0.9) apple(bx, by, 9, 0, { noLeaf: true }); }
    pop();
  }

  WORLD.vavilov = (t, u, cat) => {
    lay(30, () => { vgrad(-600, 1100, ['#6aa8d8', '#c4dcea', '#f4eacc']); glow(900, 300, 300, 'rgba(255,240,200,1)', 0.5); });
    lay(20, () => { alatau(t, 820, { s: 0.8, key: 9620 }); haze('#e8eef4', 0.1); });
    lay(12, () => { valley(t); haze('#f0ead0', 0.2); });
    lay(5, () => { thicket(t, 1180, 7, 9630, 0.7); haze('#f4eacc', 0.08); });
    lay(1.4, () => { const g = blob([[-400, 1340], [300, 1280], [800, 1300], [1500, 1260], [1500, 2400], [-400, 2400]], { wash: '#8aa04a', washA: 1, w: 2, col: '#3a4a1a', key: 9640 }); hatch(g.path, g.bb, { gap: 8, a: 0.16, col: '#3a4a1a', ang: -1.2, key: 9641 });
      const r = rng(9642); for (let k = 0; k < 40; k++) apple(-100 + r() * 1300, 1330 + r() * 500, 11 + r() * 6, r() * 3, { noLeaf: true, col: ['#c8342a', '#d8b03a', '#a8541a', '#c84a5a'][k % 4], col2: ['#8ab040', '#c8c040'][k % 2] });
      thicket(t, 1380, 4, 9650, 1.1); vavilov(800, 1520, 1.3, t); });
    lay(1, () => { cat(); stamp(t); });
    lay(0.6, () => { appleTree(-120, 2100, 900, t, 9660, { leaf: ['#5e8a32', '#7aa040', '#c89a3a'], n: 10 }); });
  };
  DIR.vavilov = {
    outfit: 'botanist', light: { side: 1, rim: '#fff0c8' }, grade: ['#d8c080', 0.08],
    act: () => [[S0.vavilov, 'awe'], [EV.vv_saw, 'proud'], [EV.vv_home, 'shock'], [EV.vv_here, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 380, y: 1600, s: 1.0, look: t < EV.vv_home ? [0.8, -0.1] : [0.2, -0.6], prop: 'herbarium', tailUp: t > EV.vv_home, squash: b.squash }),
    cam: () => [[S0.vavilov, 540, 1100, 0.04], [EV.vv_saw, 600, 1140, 0.06], [EV.vv_home, 560, 1000, 0], [EV.vv_here, 540, 960, -0.04], [S1.vavilov, 540, 960, -0.02]]
  };
  // ---------------------------------------------------------------- переход В сцену: звон колокола — ударные кольца
  TRANS_IN.vavilov = { a: 0.2, b: 0.45, runA: 1, fx(k, t, A, B) {
    const cx = 860, cy = 500; drawBuf(A, 1 + Math.sin(k * 40) * 0.01 * (1 - k));
    const R = Math.pow(k, 1.4) * 2200; inCircle(cx, cy, R, () => drawBuf(B));
    scr(() => { for (let q = 0; q < 4; q++) { const rr = R - q * 70; if (rr > 0) pencil(ellPts(cx, cy, rr, rr, 0, 0.02, 80), { w: 14 - q * 3, col: q % 2 ? '#fff0c0' : '#d6a842', a: 0.8 - q * 0.15, pass2: false, gap: false }); } });
  } };
})();
