/* 013 — сцена `fortress`: 1761, крепость Св. Димитрия Ростовского над Доном. Земляные бастионы с частоколом, пушки, флаг,
   деревянная церковь-шатёр внутри, солдаты в треуголках и зелёных кафтанах, барабанщик; на Дону — парусник. Над воротами — икона-
   портрет святителя Димитрия (митра, борода, нимб) и доска «КРЕПОСТЬ СВ. ДИМИТРИЯ РОСТОВСКОГО». На «Великого» — карта: стрелка
   от Дона на север к «РОСТОВ ВЕЛИКИЙ ≈ 1100 км». Ответ (a1): на «имя» у ворот вырастает табличка «РОСТОВ», на «на-Дону» к ней
   прибивают доску «-НА-ДОНУ», на «путать» — карточки «РОСТОВ ВЕЛИКИЙ ≠ РОСТОВ-НА-ДОНУ». Том — в кафтане Преображенского полка.
   Переход В сцену — залп пушки, дым расходится. */
(() => {
  EV.fo_fort = wtk('s6', 'крепость');
  EV.fo_dim = wtk('s6', 'Димитрия');
  EV.fo_vel = wtk('s6', 'Великого.');
  EV.fo_name = wtk('a1', 'имя!');
  EV.fo_don = wtk('a1', 'на-Дону');
  EV.fo_conf = wtk('a1', 'путать');
  KEYW.push('Димитрия', 'Великого.', 'имя!', 'на-Дону');
  SHAKES.push([S0.fortress + 0.05, 0.3, 8]);

  function sky(t) { vgrad(-900, 1000, ['#5a8ac0', '#b8d0e0', '#f0e2c4'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 14) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 160 + i * 80 + Math.sin(k) * 10, 72, 24, { wash: '#f8f2e6', washA: 0.85, line: false }); } }
  function river(t) { don(940, t, { h: 200, seed: 13701 }); ship(1250, 1080, 0.42, t, 1, { flag: '#f2ece0' }); const g = shape([[-600, 940], [-600, 880], [1700, 860], [1700, 940]], { wash: '#a8b070', washA: 1, w: 2, col: '#4a5a24' }); }
  function fort(t) {                                                   // бастион, ворота, церковь, икона, солдаты
    fortStar(560, 1180, 0.95, t, { fire: t < S0.fortress + 0.9 ? sm((t - S0.fortress) / 0.9) : 0 });
    push(560, 940, 0.55); rect(-60, -200, 120, 200, { wash: '#9a6e3e', washA: 1, w: 2.4, col: '#2a1408' }); for (let q = 1; q < 8; q++) pencil([[-60, -200 + q * 25], [60, -200 + q * 25]], { w: 1.6, col: '#5a3a1a', a: 0.7, pass2: false }); poly([[-80, -200], [80, -200], [0, -380]], { wash: '#5a7a5a', washA: 1, w: 2.4, col: '#1a2a1a' }); ell(0, -390, 18, 22, { wash: RS.gold, washA: 1, w: 2, col: RS.goldD }); pencil([[0, -410], [0, -460]], { w: 4, col: RS.goldD, pass2: false }); pencil([[-16, -440], [16, -440]], { w: 4, col: RS.goldD, pass2: false }); pop();
    rect(460, 1100, 200, 80, { wash: '#4a2e1a', washA: 1, w: 3, col: '#1a0a04' }); ell(560, 1100, 100, 50, { wash: '#4a2e1a', washA: 1, w: 3, col: '#1a0a04' });
    push(560, 1010, 0.8); const ic = popK(t, EV.fo_dim, 0.4) * (t > EV.fo_dim ? 1 : 0) * 0.3 + 0.7; push(0, 0, ic);
    rect(-70, -90, 140, 180, { wash: '#c8902a', washA: 1, w: 3, col: '#5a3a08' }); rect(-56, -76, 112, 152, { wash: '#e8d4a0', washA: 1, w: 2, col: '#5a3a08' }); ell(0, -24, 44, 44, { wash: '#f0cc6a', washA: 1, w: 2, col: '#8a6418' });
    ell(0, -16, 22, 26, { wash: '#e0b890', washA: 1, w: 2, col: '#5a3a1a' }); blob([[-22, -24], [-24, -64], [0, -76], [24, -64], [22, -24]], { wash: '#f2ece0', washA: 1, w: 2, col: '#5a4a2a' }); pencil([[0, -76], [0, -50]], { w: 2, col: '#c8302a', pass2: false }); pencil([[-10, -62], [10, -62]], { w: 2, col: '#c8302a', pass2: false });
    blob([[-18, -6], [-14, 26], [0, 40], [14, 26], [18, -6]], { wash: '#8a8a8e', washA: 1, w: 1.6, col: '#3a3a3a' }); blob([[-40, 74], [-34, 20], [0, 12], [34, 20], [40, 74]], { wash: '#3a5a8a', washA: 1, w: 2, col: '#1a2a4a' }); for (const cx of [-20, 20]) { pencil([[cx - 6, 40], [cx + 6, 52]], { w: 2, col: '#2a2a2a', pass2: false }); pencil([[cx + 6, 40], [cx - 6, 52]], { w: 2, col: '#2a2a2a', pass2: false }); }
    if (t > EV.fo_dim) glow(0, -24, 120, 'rgba(255,230,160,1)', 0.4); pop(); pop();
    for (let i = 0; i < 4; i++) { const x = 160 + i * 240, y = 1220 + (i % 2) * 14; human(x, y, 0.5, t, { body: '#2e5a3a', bodyD: '#1a3422', trim: '#c8302a', legs: '#e8e0c8', boots: '#1a1a1a', hair: '#e8e4dc', face: 'calm', armR: i === 1 ? 'up' : 'hold', armL: 'hold', prop: i === 1 ? undefined : 'spear', seed: 13710 + i, flip: i % 2 ? -1 : 1 }); tricorn(x, y - 340 * 0.5 - 4, 0.5); }
    const dx = 1000; human(dx, 1240, 0.5, t, { body: '#2e5a3a', trim: '#c8302a', legs: '#e8e0c8', boots: '#1a1a1a', hair: '#e8e4dc', face: 'smile', armR: Math.sin(t * 12) > 0 ? 'up' : 'point', armL: Math.sin(t * 12) > 0 ? 'point' : 'up', seed: 13720, flip: -1 }); tricorn(dx, 1240 - 174, 0.5); ell(dx, 1150, 34, 26, { wash: '#c8302a', washA: 1, w: 2, col: '#5a0a08' }); pencil([[dx - 34, 1140], [dx + 34, 1140]], { w: 3, col: '#f2ece0', pass2: false });
  }
  function sign(t) {                                                   // ответ: табличка «РОСТОВ» + доска «НА-ДОНУ»
    if (t < EV.fo_name - 0.1) return; const k = popK(t, EV.fo_name - 0.1, 0.35);
    push(900, 1470, k); stele(0, 0, 0.62, t, ['РОСТОВ'], { kind: 'wood', w: 440, h: 130, size: 70 }); pop();
    if (t > EV.fo_don) { const q = popK(t, EV.fo_don, 0.3); push(900, 1470 - 4, q, 0.06); rect(-170, -40, 340, 70, { wash: '#d8a868', washA: 1, w: 3, col: '#3a2412' }); txt('-НА-ДОНУ', 0, 10, 44, { font: 'Osw', col: '#5a1a10' }); for (const nx of [-150, 150]) ell(nx, -6, 6, 6, { wash: '#5a5a5a', washA: 1, w: 1, col: '#1a1a1a' }); pop(); }
  }

  WORLD.fortress = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(12, () => river(t));
    lay(4, () => fort(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#a8a068', washA: 1, w: 2, col: '#4a4a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#5a5a2a', ang: 0.1, w: 1.2 }); sign(t); cat(); });
    lay(0.7, () => { if (t < S0.fortress + 1.4) { const k = sm((t - S0.fortress) / 1.4); for (let i = 0; i < 8; i++) ell(200 + i * 120, 900 - i * 20, 200 * (0.5 + k), 120 * (0.5 + k), { wash: '#f2eee6', washA: 0.5 * (1 - k), line: false }); } });
  };
  DIR.fortress = {
    outfit: 'preobr', light: { side: 1, rim: '#fff0d0' }, grade: ['#b0a070', 0.08],
    act: () => [[S0.fortress, 'shock'], [EV.fo_fort, 'proud'], [EV.fo_dim, 'awe'], [EV.fo_vel, 'wink'], [EV.fo_name - 0.03, 'grin'], [EV.fo_don, 'smug'], [EV.fo_conf, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1480, s: 1.0, look: t < EV.fo_name ? [0.5, -0.4] : [0.7, 0.1], point: (t > EV.fo_dim && t < EV.fo_vel) || (t > EV.fo_name && t < EV.fo_conf) ? 1 : undefined,
      hand: t > EV.fo_dim && t < EV.fo_vel ? [190, -360] : t > EV.fo_name && t < EV.fo_conf ? [210, -230] : [120, -270] }),
    cam: () => [[S0.fortress, 560, 1000, 0.02], [EV.fo_fort, 560, 1040, 0.04], [EV.fo_dim, 580, 1000, 0.1], [EV.fo_vel, 560, 980, 0.04], [EV.fo_name, 640, 1200, 0.12], [EV.fo_conf, 600, 1140, 0.08], [S1.fortress, 600, 1140, 0.1]],
    hud: t => {
      if (t > EV.fo_dim && t < EV.fo_name - 0.1) { const k = popK(t, EV.fo_dim, 0.35); push(560, 640, k, -0.02); rect(-320, -56, 640, 112, { wash: '#efe0b8', washA: 0.98, w: 3, col: '#5a3a1a' }); txt('КРЕПОСТЬ СВ. ДИМИТРИЯ', 0, -12, 38, { font: 'Osw', col: '#5a1a10' }); txt('РОСТОВСКОГО · 1761', 0, 32, 30, { font: 'Osw', col: '#2a1a10' }); pop(); }
      if (t > EV.fo_vel && t < EV.fo_name - 0.1) { const k = popK(t, EV.fo_vel, 0.35); push(760, 980, k, 0.03); rect(-150, -230, 300, 400, { wash: '#efe6cc', washA: 0.97, w: 3, col: '#5a4a2a' });
        pencil([[-80, 140], [-40, 60], [-60, -20], [-10, -120], [20, -180]], { w: 4, col: RS.don, pass2: false }); ell(-80, 140, 12, 12, { wash: RS.red, washA: 1, w: 2, col: '#3a0a08' }); ell(20, -190, 12, 12, { wash: RS.gold, washA: 1, w: 2, col: RS.goldD });
        pencil([[-60, 120], [10, -170]], { w: 3, col: '#a8201e', a: 0.8, pass2: false }); poly([[10, -170], [-6, -146], [22, -144]], { wash: '#a8201e', washA: 1, w: 1, col: '#a8201e' });
        txt('РОСТОВ ВЕЛИКИЙ', 0, -205, 26, { font: 'Osw', col: '#5a1a10' }); txt('≈ 1100 км', 70, -40, 28, { font: 'Osw', col: '#a8201e' }); txt('крепость', -60, 168, 22, { col: '#2a1a10' }); pop(); }
      if (t > EV.fo_conf) { const k = popK(t, EV.fo_conf, 0.35); for (const [x, y, s, r] of [[420, 660, 'РОСТОВ ВЕЛИКИЙ', -0.05], [700, 820, 'РОСТОВ-НА-ДОНУ', 0.05]]) { push(x, y, k, r); rect(-190, -50, 380, 100, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt(s, 0, 12, 36, { font: 'Osw', col: '#5a1a10' }); pop(); } push(560, 742, k); txt('≠', 0, 20, 90, { font: 'Osw', col: '#c8302a' }); pop(); }
    }
  };

  // ---------------------------------------------------------------- переход В fortress: залп пушки, белый дым расходится
  TRANS_IN.fortress = { a: 0.25, b: 0.45, fx(k, t, A, B) {
    drawBuf(k < 0.4 ? A : B, k < 0.4 ? 1 + k * 0.15 : 1.08 - 0.08 * sm((k - 0.4) / 0.6));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI), r = rng(13730); ctx.save(); ctx.globalAlpha = 0.9 * clamp(1 - Math.abs(k - 0.3) * 8); ctx.fillStyle = '#fff6e0'; ctx.fillRect(0, 0, W, H); ctx.restore();
      for (let i = 0; i < 36; i++) { const a = r() * 6.28, d = sm(k) * (300 + r() * 900), R = 140 + r() * 180; ell(540 + Math.cos(a) * d, 1000 + Math.sin(a) * d * 0.8, R, R * 0.75, { wash: i % 3 ? '#f2eee6' : '#d8d4cc', washA: 0.9 * f, line: false }); } });
  } };
})();
