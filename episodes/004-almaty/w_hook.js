/* 004 — сцена `hook`: 2026, Зелёный базар Алматы. Над городом — Кок-Тобе с телебашней и снежный Алатау.
   С 0,0 с яблоко влетает в кадр — Том ловит. «Почти половина генов» — из яблока раскручивается спираль-ДНК из кожуры и тянется к лесам на склонах.
   «Отматываем время!» — Том кусает яблоко, в огрызке открываются часы → портал. Переход В туннель: укус-портал, кожура закручивается в туннель. */
(() => {
  EV.hk_catch = 0.22;
  EV.hk_almaty = wtw('h1', 'Алматы!');
  EV.hk_genes = wtw('h1', 'генов');
  EV.hk_here = wtw('h1', 'отсюда!');
  EV.hk_bite = wtw('h2', 'время!');
  SHAKES.push([EV.hk_catch, 0.18, 8]);
  KEYW.push('Алматы!', 'отсюда!');

  function sky(t) {
    vgrad(-800, 1500, ['#5a9ad8', '#9cc8ea', '#f2e6c8']); glow(860, 260, 420, 'rgba(255,240,200,1)', 0.55);
    for (const [x, y, w, sd] of [[180, 300, 380, 1], [820, 520, 300, 2], [520, 170, 260, 3]]) { const r = rng(9000 + sd), dx = (t * 6 + sd * 40) % 80; for (let k = 0; k < 6; k++) ell(x + dx + (k - 2.5) * w / 6 + (r() - 0.5) * 20, y - Math.sin(k / 5 * Math.PI) * 40, w * 0.16 + r() * 14, 36, { wash: '#fbf6ea', washA: 0.85, w: 1.2, col: '#b8b0a0', a: 0.3 }); }
    for (let k = 0; k < 4; k++) { const x = (200 + k * 230 + t * 40) % 1200 - 60, y = 420 + Math.sin(t * 1.2 + k) * 30, f = Math.sin(t * 8 + k) * 9; pencil([[x - 16, y - f], [x - 5, y - 2], [x, y], [x + 5, y - 2], [x + 16, y - f]], { w: 2.4, col: '#3a3a3a', pass2: false }); }
  }
  function slopes(t) {                                               // предгорья: еловые пояса, сады яблонь пятнами
    const s = poly([[-400, 1180], [-100, 1040], [300, 1080], [700, 1010], [1100, 1060], [1500, 1100], [1500, 1400], [-400, 1400]], { wash: '#6a8a4a', washA: 1, w: 2, col: '#2a3a1a', key: 9010 });
    hatch(s.path, s.bb, { gap: 10, a: 0.14, col: '#2a3a1a', ang: -0.4, key: 9011 });
    const r = rng(9012); for (let k = 0; k < 40; k++) spruce(-200 + r() * 1500, 1060 + r() * 90, 40 + r() * 40, '#2e4a3a', 0.85);
    for (let k = 0; k < 26; k++) { const x = -100 + r() * 1300, y = 1110 + r() * 80; ell(x, y, 16, 12, { wash: k % 3 ? '#7aa040' : '#9ab850', washA: 1, w: 1, col: '#2a4414', a: 0.5 }); for (let q = 0; q < 3; q++) ell(x + (r() - 0.5) * 20, y + (r() - 0.5) * 10, 2.4, 2.4, { wash: '#c8342a', washA: 1, line: false }); }
  }
  function kokTobe(t) {                                              // холм Кок-Тобе + телебашня 372 м + канатка
    const h = blob([[480, 1200], [620, 1050], [760, 990], [900, 1020], [1020, 1120], [1120, 1200]], { wash: '#5e7e44', washA: 1, w: 2, col: '#2a3a1a', key: 9020 }); hatch(h.path, h.bb, { gap: 8, a: 0.18, col: '#2a3a1a', ang: 0.6, key: 9021 });
    const tx = 790, tb = 995, top = 300;
    for (const sd of [-1, 1]) pencil([[tx + sd * 34, tb], [tx + sd * 9, tb - 280], [tx + sd * 4, top + 60]], { w: 6, col: '#d8dce2' });
    for (let k = 0; k < 14; k++) { const y = tb - k * 40, w = lerp(26, 4, k / 14); pencil([[tx - w, y], [tx + w, y - 20]], { w: 1.4, col: '#8a8e96', a: 0.8, pass2: false }); pencil([[tx + w, y], [tx - w, y - 20]], { w: 1.4, col: '#8a8e96', a: 0.8, pass2: false }); }
    for (const [y, w] of [[tb - 300, 30], [tb - 420, 22]]) rect(tx - w, y, w * 2, 22, { wash: '#e8eaee', washA: 1, w: 1.6, col: '#5a5e66' });
    pencil([[tx, top + 60], [tx, top - 60]], { w: 3, col: '#a8241e' }); for (let k = 0; k < 4; k++) pencil([[tx - 4, top - 40 + k * 26], [tx + 4, top - 40 + k * 26]], { w: 3, col: '#f4f4f4', pass2: false });
    if (Math.sin(t * 4) > 0) glow(tx, top - 60, 18, 'rgba(255,60,40,1)', 0.9);
    pencil([[1120, 1240], [890, 1010]], { w: 1.4, col: '#3a3a3a', pass2: false }); const k = (t * 0.06) % 1; push(lerp(1120, 890, k), lerp(1240, 1010, k) + 10, 1); pencil([[0, -12], [0, 0]], { w: 1.4, col: '#3a3a3a', pass2: false }); rect(-12, 0, 24, 18, { wash: '#d8382a', washA: 1, w: 1.4, col: '#3a1a10' }); pop();
  }
  function skyline(t) {                                              // город: «Казахстан» с короной, башни, панельки
    const B = [[-120, 960, 150, '#c8c0b0'], [40, 900, 120, '#d8cfc0'], [520, 900, 140, '#b8c4cc'], [660, 1000, 110, '#8aa0b8'], [940, 960, 120, '#c4b8a8'], [1080, 940, 140, '#d8d0c0']];
    for (const [x, top, w, c] of B) { const p = rect(x, top, w, 1300 - top, { wash: c, washA: 1, w: 2, col: '#4a4038' }); shadeG(p.path, x + w, 0, x, 0, '#6a5a4a', 0.3); windows(x + 10, top + 20, w - 20, 1260 - top, Math.max(2, Math.round(w / 30)), Math.round((1260 - top) / 40), x, 0.15, '#3a4a5a', '#ffe0a0', 0.6); }
    const hx = 380, ht = 640; const ho = blob([[hx - 70, 1300], [hx - 64, ht + 40], [hx - 40, ht], [hx + 40, ht], [hx + 64, ht + 40], [hx + 70, 1300]], { wash: '#f2ece0', washA: 1, w: 2.2, col: '#4a4038', key: 9030 });
    for (let k = 0; k < 15; k++) pencil([[hx - 62, ht + 60 + k * 42], [hx + 62, ht + 60 + k * 42]], { w: 1.6, col: '#8a7a68', a: 0.6, pass2: false });
    for (let k = 0; k < 7; k++) { const x = hx - 42 + k * 14; pencil([[x, ht + 4], [x, ht - 40 + Math.abs(3 - k) * 8]], { w: 4, col: '#d6a842', pass2: false }); } txt('КАЗАХСТАН', hx, ht + 30, 18, { font: 'Osw', col: '#2a3a6a' });
  }
  function street(t) {                                               // тополя и карагачи, машины
    const r = rng(9040); for (let k = 0; k < 7; k++) { const x = -60 + k * 190 + r() * 40, y = 1330; pencil([[x, y], [x, y - 120]], { w: 8, col: '#4a3424' }); const c = blob(ellPts(x, y - 260, 46, 160, 0, 0.2, 12), { wash: k % 2 ? '#4e7a2e' : '#5e8a36', washA: 1, w: 1.8, col: '#1e3a0a' }); hatch(c.path, c.bb, { gap: 6, a: 0.2, col: '#1e3a0a', ang: 1.4, key: 9041 + k }); }
    for (let k = 0; k < 3; k++) { const x = ((t * 140 + k * 420) % 1500) - 200, c = ['#d8382a', '#f2ece0', '#2a4a8a'][k]; rect(x, 1300, 120, 34, { wash: c, washA: 1, w: 1.8, col: '#1a1a1a' }); rect(x + 20, 1278, 70, 26, { wash: '#bcd0dc', washA: 1, w: 1.6, col: '#1a1a1a' }); ell(x + 24, 1336, 12, 12, { wash: '#1a1a1a', washA: 1, line: false }); ell(x + 96, 1336, 12, 12, { wash: '#1a1a1a', washA: 1, line: false }); }
  }
  function bazaar(t) {                                               // ряды Зелёного базара: навесы, лотки с яблоками, весы
    rect(-200, 1000, 1500, 70, { wash: '#2e7a4a', washA: 1, w: 2.4, col: '#0e2a1a', key: 9050 }); txt('ЗЕЛЁНЫЙ БАЗАР', 540, 1048, 46, { font: 'Osw', col: '#f6ecd6' });
    for (let k = 0; k < 8; k++) { const x = -160 + k * 190; poly([[x, 1070], [x + 190, 1070], [x + 170, 1130], [x + 20, 1130]], { wash: k % 2 ? '#e8d8b0' : '#2e7a4a', washA: 1, w: 1.8, col: '#2a2010' }); pencil([[x + 10, 1130], [x + 10, 1400]], { w: 6, col: '#6a6a6a' }); }
    for (let k = 0; k < 5; k++) { const x = -120 + k * 300; rect(x, 1300, 240, 110, { wash: '#8a6238', washA: 1, w: 2.2, col: '#2a1a0a' }); const r = rng(9060 + k);
      for (let q = 0; q < 16; q++) apple(x + 20 + (q % 8) * 28 + (r() - 0.5) * 6, 1294 - Math.floor(q / 8) * 22, 15, r() - 0.5, { noLeaf: true, col: k % 2 ? '#c8342a' : '#d84a2a', col2: k === 2 ? '#c8b830' : '#8ab040' }); }
    push(940, 1170, 1, 0.04); rect(-70, -40, 140, 70, { wash: '#f6ecd6', washA: 1, w: 2, col: '#3a2a14' }); txt('АПОРТ', 0, -14, 30, { font: 'Osw', col: '#a8241e' }); txt('местный!', 0, 16, 24, { font: 'Hand', col: '#2a1a0a' }); pop();
  }
  function crates(t) {                                               // ближние ящики с яблоками (передний план)
    for (const [x, y, s] of [[-40, 1640, 1.1], [180, 1680, 1.0], [880, 1650, 1.15]]) { push(x, y, s); const b = rect(-110, -80, 220, 110, { wash: '#b0844a', washA: 1, w: 2.6, col: '#3a2410' }); for (const yy of [-50, -15]) pencil([[-110, yy], [110, yy]], { w: 2, col: '#5a3a1a', a: 0.6, pass2: false }); fstr(b.path, b.bb, 14, 0.05, 40, '#5a3a1a', 0.3, 9070 + x);
      const r = rng(9080 + x); for (let q = 0; q < 9; q++) apple(-84 + (q % 5) * 42 + (r() - 0.5) * 8, -92 - Math.floor(q / 5) * 30, 22, r() - 0.5, { noLeaf: q % 3 !== 0 }); pop(); }
  }
  function flyingApple(t) {                                          // 0,0–0,22: яблоко влетает с размытием
    if (t > EV.hk_catch) return; const k = t / EV.hk_catch, x = lerp(-80, 720, k), y = lerp(500, 1150, k) - Math.sin(k * Math.PI) * 220;
    for (let i = 4; i > 0; i--) apple(x - i * 40, y - i * 18 + i * i * 4, 40, k * 6 - i * 0.3, { a: 0.18 });
    apple(x, y, 40, k * 6);
  }
  function helix(t, P) {                                             // кожура-ДНК: спираль от яблока к лесам на склонах
    if (t < EV.hk_genes - 0.1) return; const k = sm((t - EV.hk_genes + 0.1) / 0.8), ax = P.x + 80 * P.s, ay = P.y - 250 * P.s, bx = 120, by = 900;
    const N = Math.floor(60 * k); for (let i = 0; i < N; i++) { const u = i / 60, x = lerp(ax, bx, u), y = lerp(ay, by, u) - Math.sin(u * Math.PI) * 300, ph = u * 20 - t * 4, w = 44 * (1 - u * 0.5);
      const x1 = x + Math.cos(ph) * w, x2 = x - Math.cos(ph) * w; if (i % 3 === 0) pencil([[x1, y], [x2, y]], { w: 3, col: '#f6ecd6', a: 0.8, pass2: false });
      ell(x1, y, 7, 7, { wash: '#c8342a', washA: 1, w: 1.2, col: '#5a0e08' }); ell(x2, y, 6, 6, { wash: '#8ab040', washA: 1, w: 1.2, col: '#2a4414' }); }
    if (k > 0.9) { glow(bx, by, 160, 'rgba(255,240,180,1)', 0.5 * Math.min(1, (t - EV.hk_here) * 3 + 0.3)); push(bx, by - 160, popK(t, EV.hk_genes + 0.6, 0.4)); rect(-90, -46, 180, 92, { wash: '#f6ecd6', washA: 1, w: 3, col: '#3a2410' }); txt('46 %', 0, 2, 64, { font: 'Osw', col: '#a8241e' }); pop(); }
  }

  WORLD.hook = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(16, () => { alatau(t, 1040, { s: 1.15 }); haze('#e8eef4', 0.12); });
    lay(9, () => { slopes(t); kokTobe(t); haze('#eef0f0', 0.14); });
    lay(5, () => { skyline(t); haze('#f2ece0', 0.12); });
    lay(2.2, () => { street(t); });
    lay(1.2, () => { bazaar(t);
      human(120, 1420, 1.0, t, { body: '#e8e0d0', trim: '#2e7a4a', legs: '#3a3a4a', hair: '#2a1a10', hat: 'scarf', hatCol: '#c8342a', face: t > EV.hk_almaty ? 'smile' : 'calm', armL: 'hold', armR: t > EV.hk_almaty && t < EV.h2 ? 'wave' : 'hips', look: 0.5, seed: 91 });
      human(330, 1430, 0.96, t, { body: '#3a5a8a', legs: '#2a2a2a', hair: '#1a1a1a', face: t > EV.hk_genes ? 'shock' : 'calm', armL: 'down', armR: t > EV.hk_genes ? 'point' : 'hold', prop: t > EV.hk_genes ? undefined : 'phone', look: 0.6, seed: 92 });
      human(1000, 1425, 1.02, t, { body: '#7a3a5a', legs: '#2a2a3a', hair: '#5a3a1a', beard: 'short', hat: 'cap', hatCol: '#2a2a2a', face: 'grin', armL: 'hold', armR: 'down', look: -0.6, flip: -1, seed: 93 }); });
    lay(1, () => { flyingApple(t); cat(); });
    lay(0.65, () => crates(t));
  };
  DIR.hook = {
    outfit: 'hoodieA', light: { side: 1, rim: '#fff0c8' }, grade: ['#f0c070', 0.08],
    act: () => [[0, 'shock'], [EV.hk_catch + 0.15, 'awe'], [EV.hk_almaty, 'shock'], [EV.hk_genes, 'awe'], [EV.hk_here, 'proud'], [EV.h2, 'smug'], [EV.hk_bite, 'grin']],
    pose: (t, u, b) => { const bite = t > EV.hk_bite - 0.15;
      return Object.assign(b, { x: 600, y: 1560, s: 1.2, look: t > EV.hk_here && t < EV.h2 ? [-0.7, -0.5] : [0.15, 0.05], tilt: t < EV.hk_catch + 0.3 ? -0.08 : 0, squash: b.squash + (t > EV.hk_catch && t < EV.hk_catch + 0.15 ? 0.1 : 0),
        hand: bite ? [40, -320] : [92, -190], handF: t > EV.hk_here && t < EV.h2 ? [-170, -300] : undefined, point: t > EV.hk_here && t < EV.h2 ? 1 : undefined,
        watchInHand: t > EV.hk_bite + 0.2, glow: clamp((t - EV.hk_bite - 0.2) / 0.4), spin: t > EV.hk_bite + 0.4 ? 1 : 0, tailUp: t < EV.hk_catch + 0.6 });
    },
    afterCat: (t, u, P) => { if (t < EV.hk_catch || t > EV.hk_bite + 0.25) return; const hx = P.x + (P.hand[0] + 6) * P.s, hy = P.y + (P.hand[1] - 34) * P.s;
      apple(hx, hy, 40 * P.s, -0.2, { bite: t > EV.hk_bite }); helix(t, P);
      if (t > EV.hk_bite && t < EV.hk_bite + 0.25) for (let i = 0; i < 6; i++) { const r = rng(9090 + i), a = r() * 6.283, d = (t - EV.hk_bite) * 500; ell(hx + 30 + Math.cos(a) * d, hy + Math.sin(a) * d, 5, 4, { wash: '#f6ecc8', washA: 1, w: 1, col: '#8a6a3a' }); } },
    cam: () => [[0, 640, 1120, 0.14], [EV.hk_catch, 600, 1100, 0.1], [EV.hk_genes, 520, 1000, 0.02], [EV.hk_here, 460, 960, -0.02], [EV.h2, 600, 1080, 0.08], [S1.hook, 640, 1060, 0.2]]
  };
  // ---------------------------------------------------------------- переход В туннель: из укуса — портал часов, кожура закручивается спиралью
  TRANS_IN.tunnel = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {
    const cx = 640, cy = 760, R = Math.pow(k, 1.6) * 1500;
    drawBuf(A, 1 + k * 0.4, cx, cy, 1, null, 0, 0, k * 0.6);
    inCircle(cx, cy, R, () => drawBuf(B, 1.4 - k * 0.4, 540, 960));
    scr(() => { for (let i = 0; i < 40; i++) { const a = i / 40 * 6.283 * 2 + t * 6, d = R * (0.85 + (i % 2) * 0.12); ell(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 16, 8, { wash: i % 2 ? '#c8342a' : '#8ab040', washA: 1, w: 1.2, col: '#3a1408', rot: a }); } });
    ringFX(cx, cy, R, t, ['#e8c060', '#fff0c0', '#c8342a'], 1 - k * 0.3);
  } };
})();
