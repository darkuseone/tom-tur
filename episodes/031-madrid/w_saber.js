/* 031 — сцена `saber`: поздний миоцен, ≈9 млн лет назад, саванна к югу от будущего Мадрида (Серро-де-лос-Батальонес). Золотой вечер,
   солнце слева (главный свет). Вдали плато и столовые горы, акациевидные деревья, стадо гиппарионов, жирафовые-децентатерии, мастодонт.
   В траве крадётся саблезубый махайрод; на «кошки» он прыгает; на «застряли» второй махайрод с размаху проваливается в яму-ловушку
   (облако пыли, торчит хвост) — Том (шкура) заглядывает в яму. Плашка «≈ 9 МЛН ЛЕТ · МАХАЙРОД · 30 КМ ОТ МАДРИДА».
   Переход В: красная ткань мулеты сдёргивается вбок, как с фокусника. */
(() => {
  EV.sb_cat = wtk('s1', 'саблезубые');
  EV.sb_jump = wtk('s1', 'кошки.');
  EV.sb_stuck = wtk('s1', 'застряли');
  KEYW.push('кошки.', 'ямах.');
  const L = MD.ink, SUN = [180, 600], PIT = [780, 1600];
  function saber(x, y, s, t, o = {}) {                                 // махайрод: тело тигра, бледные пятна, сабли-клыки
    push(x, y, s, o.rot || 0, o.flip || 1); const ph = t * (o.run ? 14 : 3);
    for (const [lx, q] of [[-90, 0], [-60, 1.6], [70, 3.1], [100, 4.7]]) { const a = Math.sin(ph + q) * (o.run ? 0.6 : 0.1); pencil([[lx, -80], [lx + Math.sin(a) * 40, -30], [lx + Math.sin(a) * 30, 0]], { w: 18, col: '#b8803a', pass2: false }); }
    blob([[-130, -80], [-120, -150], [-30, -170], [80, -165], [130, -130], [120, -80], [0, -70]], { wash: '#c88a42', washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.25, col: '#6a3a14', ang: 1.2 } });
    for (let q = 0; q < 8; q++) ell(-90 + q * 26, -130 + (q % 2) * 16, 8, 6, { wash: '#8a5a24', washA: 0.6, line: false });
    blob([[110, -150], [150, -190], [200, -186], [220, -150], [200, -120], [140, -116]], { wash: '#c88a42', washA: 1, w: 2.2, col: L }); ell(186, -164, 6, 5, { wash: '#1a1008', washA: 1, line: false });
    for (const dx of [176, 196]) poly([[dx, -126], [dx + 8, -126], [dx + 2, -70]], { wash: '#f4ecd8', washA: 1, w: 1.6, col: L });
    pencil([[-130, -110], [-180, -140 + Math.sin(t * 5) * 14], [-200, -120]], { w: 10, col: '#c88a42', pass2: false }); pop();
  }
  function sky(t) { vgrad(-900, 1050, ['#3a5a9a', '#c8885a', '#f8c070', '#ffe8b0'], 1); glow(SUN[0], SUN[1], 220, 'rgba(255,220,150,1)', 0.45); ell(SUN[0], SUN[1], 64, 64, { wash: '#fff0c0', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const r = rng(7300 + i), y = 330 + i * 80, dx = (t * 8) % 200; blob([[-200 + dx, y], [300 + r() * 300 + dx, y - 26], [800 + dx, y - 6], [1300, y + 12], [300, y + 22]], { wash: '#f8d8a8', washA: 0.5, line: false }); } }
  function mesas(t) { blob([[-500, 1000], [-400, 880], [-100, 870], [-60, 920], [300, 930], [360, 860], [700, 850], [760, 910], [1100, 920], [1160, 870], [1700, 880], [1700, 1000]], { wash: '#b8885a', washA: 1, w: 2, col: L, a: 0.6, shade: { gap: 9, a: 0.2, col: '#6a4a2a', ang: 1.4 } }); depthFog('#f0c890', 0.07); }
  function herd(t) {                                                 // саванна: деревья, гиппарионы, жирафовые, мастодонт
    rect(-500, 1000, 2200, 260, { wash: '#c8a858', washA: 1, w: 2, col: L, shade: { gap: 10, a: 0.15, col: '#7a6428', ang: 0.2 } });
    for (const [x, h] of [[-280, 220], [140, 260], [980, 240], [1300, 200]]) { pencil([[x, 1060], [x + 10, 1060 - h * 0.6]], { w: 12, col: '#5a3a1e', pass2: false }); blob([[x - h * 0.6, 1060 - h * 0.6], [x - h * 0.3, 1060 - h * 0.9], [x + h * 0.5, 1060 - h * 0.92], [x + h * 0.7, 1060 - h * 0.62]], { wash: '#5a7a3a', washA: 1, w: 1.8, col: L }); }
    const dx = (t * 30) % 300; for (let i = 0; i < 7; i++) { const x = 300 + i * 90 - dx * (i % 2 ? 1 : 0.6), y = 1100 + (i % 3) * 14; push(x, y, 0.32, 0, -1); for (const lx of [-50, -26, 30, 54]) pencil([[lx, -40], [lx + Math.sin(t * 10 + i + lx) * 8, 0]], { w: 8, col: '#6a4a2a', pass2: false }); blob([[-70, -40], [-66, -90], [40, -96], [70, -60], [60, -40]], { wash: '#a8784a', washA: 1, w: 1.6, col: L }); blob([[50, -90], [86, -140], [104, -120], [70, -80]], { wash: '#a8784a', washA: 1, w: 1.4, col: L }); pop(); }
    for (const x of [-120, 1080]) { push(x, 1120, 0.45, 0, x > 0 ? -1 : 1); for (const lx of [-40, -20, 30, 50]) pencil([[lx, -60], [lx, 0]], { w: 9, col: '#8a6a3a', pass2: false }); blob([[-60, -60], [-50, -120], [50, -130], [60, -60]], { wash: '#c8a060', washA: 1, w: 1.6, col: L }); pencil([[40, -120], [80, -260]], { w: 16, col: '#c8a060', pass2: false }); ell(90, -270, 26, 16, { wash: '#c8a060', washA: 1, w: 1.4, col: L }); pop(); }
    push(620, 1120, 0.55, 0, -1); for (const lx of [-60, -30, 40, 70]) pencil([[lx, -60], [lx, 0]], { w: 22, col: '#6a5a50', pass2: false }); blob([[-100, -60], [-110, -170], [0, -200], [100, -170], [110, -60]], { wash: '#7a6a5e', washA: 1, w: 2, col: L }); pencil([[110, -150], [150, -80], [140, -10]], { w: 16, col: '#7a6a5e', pass2: false }); pencil([[120, -110], [190, -90]], { w: 7, col: '#f0e8d8', pass2: false }); pop();
  }
  function grass(t) {                                                // ближняя трава, засада махайрода
    rect(-500, 1260, 2200, 200, { wash: '#b89850', washA: 1, w: 2, col: L }); for (let i = 0; i < 90; i++) { const r = rng(7310 + i), x = -480 + r() * 2100, y = 1270 + r() * 180; pencil([[x, y], [x + Math.sin(t * 2 + i) * 6, y - 30 - r() * 30]], { w: 3, col: i % 2 ? '#8a7030' : '#d8c070', pass2: false }); }
    if (t < EV.sb_jump) saber(820 + Math.sin(t * 2) * 10, 1420, 1.35, t, { flip: -1 }); else { const k = clamp((t - EV.sb_jump) / 0.7); saber(lerp(820, 1500, k), 1420 - Math.sin(k * 3.14) * 300, 1.35, t, { flip: -1, run: true, rot: -0.2 + k * 0.4 }); }
  }
  function ground(t) {                                               // сухая земля, яма-ловушка, кости, камни, сухая трава
    rect(-500, 1460, 2200, 900, { wash: '#c8a868', washA: 1, w: 2, col: L }); const r = rng(7320); for (let i = 0; i < 50; i++) ell(r() * 2000 - 400, 1480 + r() * 440, 10 + r() * 26, 5 + r() * 9, { wash: i % 2 ? '#b89858' : '#d8b878', washA: 1, w: 1, col: L, a: 0.5 });
    lightPool(SUN[0] + 400, 1680, 800, 160, 'rgba(255,220,150,1)', 0.4);
    push(PIT[0], PIT[1], 1); ell(0, 0, 220, 70, { wash: '#3a2414', washA: 1, w: 3, col: L }); ell(0, 10, 180, 50, { wash: '#1a0e08', washA: 1, line: false });
    const st = t > EV.sb_stuck - 0.2 ? clamp((t - EV.sb_stuck + 0.2) / 0.5) : 0; if (st > 0 && st < 1) saber(-80 + st * 80, -260 + st * 260, 0.9, t, { run: true, rot: 0.6 + st }); if (st >= 1) { pencil([[-20, -6], [-40, -80 + Math.sin(t * 8) * 16], [-70, -110]], { w: 10, col: '#c88a42', pass2: false }); }
    if (st > 0.6) for (let q = 0; q < 8; q++) { const a = (q / 8) * 3.14 + 3.14, d = 80 + (t - EV.sb_stuck) * 160; ell(Math.cos(a) * d, -20 + Math.sin(a) * d * 0.4, 50, 34, { wash: '#d8b880', washA: Math.max(0, 0.8 - (t - EV.sb_stuck) * 0.6), line: false }); } pop();
    for (let q = 0; q < 4; q++) { push(1100 + q * 40, 1820, 1, q * 0.5); pencil([[-40, 0], [40, 0]], { w: 10, col: '#f0e6d0', pass2: false }); ell(-42, 0, 10, 10, { wash: '#f0e6d0', washA: 1, w: 1.4, col: L }); ell(42, 0, 10, 10, { wash: '#f0e6d0', washA: 1, w: 1.4, col: L }); pop(); }
    for (let q = 0; q < 5; q++) ell(-60 + q * 70, 1800 + (q % 2) * 30, 30, 20, { wash: '#9a8a6a', washA: 1, w: 1.6, col: L });
    for (let i = 0; i < 70; i++) { const r2 = rng(7340 + i), x = -480 + r2() * 2100, y = 1500 + r2() * 420; if (Math.abs(x - PIT[0]) < 240 && Math.abs(y - PIT[1]) < 90) continue; pencil([[x, y], [x + Math.sin(t * 2 + i) * 8, y - 40 - r2() * 40]], { w: 4, col: i % 2 ? '#8a7030' : '#d8c070', pass2: false }); }
    castShadow(330, 1650, 120, 500, 0.6, 0.35); moodDark(1200, 900, 900, 1800, '#2a1408', 0.3);
  }
  WORLD.saber = (t, u, cat) => {
    lay(40, () => sky(t)); lay(18, () => mesas(t)); lay(7, () => herd(t)); lay(2.6, () => grass(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => { for (const x of [-140, 1230]) for (let q = 0; q < 14; q++) pencil([[x - 60 + q * 9, 2300], [x - 60 + q * 9 + Math.sin(t * 2 + q) * 20, 1700 - (q % 3) * 60]], { w: 7, col: '#5a4a1e', pass2: false }); });
    lay(1.8, () => motes(20, [-100, 700, 1200, 1500], '#ffe8b0', t, 7330, { sp: 2, sz: 2.4, a: 0.45, wob: 16, add: 1 }));
  };
  DIR.saber = {
    outfit: 'caveman', light: { side: -1, rim: '#ffd090' }, grade: ['#4a2a10', 0.08],
    act: () => [[S0.saber, 'awe'], [EV.sb_cat, 'scared'], [EV.sb_jump, 'shock'], [EV.sb_stuck, 'grin'], [EV.sb_stuck + 0.6, 'smug']],
    pose: (t, u, b) => { const w1 = clamp((t - EV.sb_stuck + 0.4) / 0.7), x = lerp(260, 470, sm(w1)); return Object.assign(b, { x, y: 1650, s: 0.95, walk: w1 > 0 && w1 < 1 ? t * 9 : 0, squash: t > EV.sb_jump && t < EV.sb_jump + 0.3 ? 0.12 : b.squash, look: t > EV.sb_stuck ? [0.9, 0.5] : t > EV.sb_cat ? [0.9, -0.2] : [-0.4, -0.4], hand: [150, -300] }); },
    hud: t => infoPlate(560, 780, [['≈ 9 МЛН ЛЕТ · МАХАЙРОД', 46, MD.goldL], ['ямы-ловушки в 30 км от Мадрида', 30]], t, EV.sb_cat),
    cam: () => [[S0.saber, 560, 880, -0.1], [EV.sb_cat, 720, 980, 0.0], [EV.sb_jump, 760, 960, 0.04, 'x'], [EV.sb_stuck - 0.2, 620, 1200, 0.1], [EV.sb_stuck + 0.3, 640, 1260, 0.16, 'x'], [S1.saber, 640, 1260, 0.18]]
  };
  TRANS_IN.saber = { a: 0.06, b: 0.4, fx(k, t, A, B) {              // красную ткань сдёргивают вбок — под ней новая эпоха
    const e = sm(k), X = e * 1500; drawBuf(B); scr(() => { if (X < 1400) { const sw = Math.sin(t * 10) * 40; shape([[X - 100, -60], [X + 1200, -60], [X + 1180 + sw, 1980], [X - 140 + sw, 1980]], { wash: '#c8181a', washA: 1, w: 4, col: MD.ink, shade: { gap: 14, a: 0.25, col: '#6a0a08', ang: 1.4 } }); } }); } };
})();
