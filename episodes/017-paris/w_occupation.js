/* 017 — сцена `occupation`: 14 июня 1940. Пустой Париж: закрытые ставни, пустые кафе со стульями на столах, серые грузовики
   без символики едут по бульвару к башне, плакат «PARIS — VILLE OUVERTE» (открытый город); небо серое. Никаких флагов и знаков.
   На «боя» ставни захлопываются, на «оккупации» — HUD «14.06.1940 — 25.08.1944». Том — гимнастёрка. Музыка приглушена.
   Переход В сцену — ставни захлопываются по кадру. */
(() => {
  EV.oc_fight = wtk('s7', 'боя.');
  EV.oc_occ = wtk('s7', 'оккупации.');
  KEYW.push('боя.', 'оккупации.');

  function sky(t) { vgrad(-900, 1000, ['#5a5e6a', '#8a8c94', '#b0aca4'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 10) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 170 + i * 80 + Math.sin(k) * 10, 76, 26, { wash: '#a8a8ac', washA: 0.8, line: false }); } }
  function boulevard(t) {
    eiffel(900, 1060, 0.5, t, { col: '#5a4a3a' });
    for (const [x, w, h] of [[-560, 240, 360], [-300, 240, 340], [1180, 240, 360]]) { facade(x, 1100, w, h, t, { col: '#c8c0b0' }); const sh = t > EV.oc_fight ? 1 : 0.4; for (let j = 0; j < 5; j++) for (let q = 0; q < 3; q++) rect(x + 20 + q * 80 - 4, 1100 - h + j * h / 5 + 10, 48 * sh, h / 5 * 0.6, { wash: '#5a6a5a', washA: 1, w: 1.2, col: '#1a2a1a' }); }
    rect(-600, 1100, 2300, 200, { wash: '#7a7672', washA: 1, w: 2, col: '#2a2a2a' });
    for (let q = 0; q < 3; q++) { const x = 1700 - ((t - S0.occupation) * 140 + q * 360) % 2400; truck(x, 1250, 0.6, t, { flip: -1 }); }
    for (let q = 0; q < 4; q++) { const x = 80 + q * 120; rect(x, 1200, 70, 10, { wash: '#6a4a2a', washA: 1, w: 1.4, col: '#2a1408' }); pencil([[x + 35, 1210], [x + 35, 1290]], { w: 4, col: '#3a2a1a', pass2: false }); for (const sd of [-1, 1]) { push(x + 35 + sd * 20, 1200, 1, Math.PI); rect(-14, -50, 28, 50, { wash: '#8a6a4a', washA: 1, w: 1.4, col: '#2a1408' }); pop(); } }
    push(-160, 1000, 1, -0.04); rect(-150, -90, 300, 180, { wash: '#efe6d0', washA: 1, w: 2.4, col: '#2a2a2a' }); txt('PARIS', 0, -30, 44, { font: 'Osw', col: '#2a2a2a' }); txt('VILLE OUVERTE', 0, 24, 30, { font: 'Osw', col: '#a8201e' }); txt('12.06.1940', 0, 62, 22, { col: '#2a2a2a' }); pop();
  }

  WORLD.occupation = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(5, () => boulevard(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#7a7672', washA: 1, w: 2, col: '#2a2a2a', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#2a2a2a', ang: 0.1, w: 1.2 }); cat(); });
    lay(0.7, () => haze('#14141a', 0.14));
  };
  DIR.occupation = {
    outfit: 'voen', light: { side: 1, rim: '#d8d0c0' }, grade: ['#6a6a6a', 0.18],
    act: () => [[S0.occupation, 'shock'], [EV.oc_fight, 'scared'], [EV.oc_occ - 0.05, 'neutral']],
    pose: (t, u, b) => Object.assign(b, { x: 270, y: 1480, s: 1.0, look: [0.6, -0.2], nod: t > EV.oc_occ ? 0.06 : 0 }),
    cam: () => [[S0.occupation, 560, 1080, 0.06], [EV.oc_fight, 560, 1100, 0.08], [EV.oc_occ, 600, 1120, 0.1], [S1.occupation, 600, 1120, 0.12]],
    hud: t => { if (t > EV.oc_occ) { const k = popK(t, EV.oc_occ, 0.4); push(560, 760, k, 0); ctx.save(); ctx.globalAlpha = 0.9 * k; ctx.fillStyle = 'rgba(16,14,14,0.86)'; ctx.fillRect(-320, -60, 640, 120); ctx.restore(); txt('14.06.1940 — 25.08.1944', 0, -8, 38, { font: 'Osw', col: '#f2ece0', a: k }); txt('четыре года оккупации', 0, 36, 26, { col: '#e8d8b0', a: k }); pop(); } }
  };
  TRANS_IN.occupation = { a: 0.3, b: 0.4, fx(k, t, A, B) {           // ставни захлопываются по кадру и открываются в новую эпоху
    const q = sm(k), c = q < 0.5 ? q * 2 : 2 - q * 2; drawBuf(q < 0.5 ? A : B);
    scr(() => { for (const sd of [0, 1]) { const w = W / 2 * c, x = sd ? W - w : 0; rect(x, 0, w, H, { wash: '#4a6a4a', washA: 1, w: 3, col: '#1a2a1a' }); for (let y = 40; y < H; y += 60) pencil([[x, y], [x + w, y]], { w: 4, col: '#2a3a2a', pass2: false }); } });
  } };
})();
