/* 032 — сцена `fern` (s1, −300 млн лет, карбон). Влажный болотный лес: лепидодендроны с ромбической корой, каламиты-хвощи,
   древовидные папоротники, тёмная вода с отражениями, упавшие стволы. Главный свет — мутное солнце сверху справа, зелёные лучи сквозь дымку.
   Живые: гигантские стрекозы-меганевры, многоножка-артроплевра на бревне, амфибии в воде, тараканы, скорпион.
   На «папоротники» Том трогает лапой огромную вайю — она разворачивается; на «уголь» — разрез-инфографика «ЛЕС → ТОРФ → УГОЛЬ»;
   на «Донбасса» — плашка «ДОНБАСС = ДОНецкий БАССейн». Переход — угольная пыль осыпается и открывает лес. */
(() => {
  EV.fr_own = wtk('s1', 'хозяева');
  EV.fr_fern = wtk('s1', 'папоротники.');
  EV.fr_coal = wtk('s1', 'них') - 0.15;
  EV.fr_name = wtk('s1', 'Донбасса.');
  KEYW.push('папоротники.', 'уголь', 'Донбасса.');
  const L = DB.ink, SUN = [900, 120];
  function lepido(x, base, h, t, seed) {                            // лепидодендрон: ствол с ромбами, вилка ветвей с метёлками
    const r = rng(seed), w = h * 0.05; rect(x - w / 2, base - h, w, h, { wash: '#5a5a3a', washA: 1, w: 2, col: L });
    for (let y = base - h + 20; y < base; y += 26) for (let q = -1; q <= 1; q++) poly([[x + q * w / 3, y - 8], [x + q * w / 3 + 6, y], [x + q * w / 3, y + 8], [x + q * w / 3 - 6, y]], { wash: '#6a6a42', washA: 1, w: 1, col: '#2a2a18' });
    const top = base - h; for (const k of [-1, 1]) { const ex = x + k * h * 0.14, ey = top - h * 0.12; pencil([[x, top], [ex, ey]], { w: w * 0.6, col: '#5a5a3a', pass2: false });
      for (const kk of [-1, 1]) { const fx = ex + kk * h * 0.06, fy = ey - h * 0.06; pencil([[ex, ey], [fx, fy]], { w: w * 0.4, col: '#5a5a3a', pass2: false }); for (let q = 0; q < 8; q++) { const a = q * 0.78 + Math.sin(t + seed) * 0.05; pencil([[fx, fy], [fx + Math.cos(a) * h * 0.05, fy + Math.sin(a) * h * 0.05]], { w: 2.4, col: '#3a6a2a', pass2: false }); } } }
  }
  function calam(x, base, h, t, seed) {                             // каламит: членистый ствол с мутовками
    pencil([[x, base], [x + Math.sin(t * 0.6 + seed) * 6, base - h]], { w: 10, col: '#6a7a3a', pass2: false });
    for (let y = base - 40; y > base - h; y -= 46) { pencil([[x - 7, y], [x + 7, y]], { w: 3, col: '#2a3a1a', pass2: false }); for (let q = -3; q <= 3; q++) pencil([[x, y], [x + q * 14, y - 26 + Math.abs(q) * 4]], { w: 1.6, col: '#4a7a2a', pass2: false }); }
  }
  function treeFern(x, base, h, t, seed, open = 1) {                // древовидный папоротник: ствол + раскидистые вайи
    pencil([[x, base], [x + 4, base - h]], { w: 16, col: '#5a4a2a', pass2: false }); for (let y = base - 20; y > base - h; y -= 18) pencil([[x - 8, y], [x + 8, y - 4]], { w: 2, col: '#3a2a10', pass2: false });
    for (let q = 0; q < 7; q++) { const a = -2.9 + q * 0.42 + Math.sin(t * 0.9 + q + seed) * 0.04, len = h * 0.55 * open, P = []; for (let i = 0; i <= 8; i++) { const k = i / 8; P.push([x + Math.cos(a) * len * k, base - h + Math.sin(a) * len * k + k * k * len * 0.4]); }
      pencil(P, { w: 3, col: '#2a5a1a', pass2: false }); for (let i = 1; i < 8; i++) { const [px, py] = P[i]; pencil([[px, py], [px + 14 * (1 - i / 9), py + 12]], { w: 2.4, col: '#4a8a2a', pass2: false }); pencil([[px, py], [px - 12 * (1 - i / 9), py + 12]], { w: 2.4, col: '#4a8a2a', pass2: false }); } }
  }
  function dragonfly(x, y, s, t, seed) { push(x, y, s, Math.sin(t * 2 + seed) * 0.1); pencil([[-60, 0], [60, 0]], { w: 6, col: '#2a4a6a', pass2: false }); ell(54, 0, 10, 9, { wash: '#3a6a8a', washA: 1, w: 1.4, col: L });
    const f = Math.sin(t * 40 + seed) * 0.3; for (const k of [-1, 1]) for (const d of [20, 36]) ell(d, k * 40, 60, 12, { wash: '#d8f0ff', washA: 0.45, w: 1.2, col: '#3a5a6a', rot: k * (0.3 + f) }); pop(); }
  function sky(t) { vgrad(-900, 1100, ['#6a8a5a', '#a8c08a', '#d8e0a8', '#c8d098'], 1); glow(SUN[0], SUN[1], 300, 'rgba(255,250,200,1)', 0.45); rays(SUN[0], SUN[1], 2.1, 0.7, 1500, 'rgba(255,250,210,1)', 0.12, 8, t); }
  function far(t) { for (let i = 0; i < 6; i++) lepido(-200 + i * 260, 1080, 760 + (i % 3) * 90, t, 8500 + i); depthFog('#c8d8a0', 0.25); }
  function mid(t) {                                                 // каламиты, древовидные папоротники, болото с отражениями
    for (let i = 0; i < 7; i++) calam(-120 + i * 190, 1200, 380 + (i % 3) * 60, t, i); vgrad(1180, 1300, ['#3a4a2a', '#2a3a20'], 1);
    for (let i = 0; i < 12; i++) pencil([[-100 + i * 110, 1220 + (i % 3) * 22], [-40 + i * 110, 1220 + (i % 3) * 22]], { w: 2, col: '#a8c898', a: 0.4, pass2: false });
    treeFern(140, 1300, 460, t, 1); treeFern(860, 1300, 520, t, 2); treeFern(1160, 1310, 380, t, 3); treeFern(520, 1290, 300, t, 4);
    push(560, 1240, 0.8); blob([[-60, 0], [-40, -30], [20, -36], [60, -20], [70, 0]], { wash: '#5a6a3a', washA: 1, w: 2, col: L }); ell(66, -24, 16, 12, { wash: '#5a6a3a', washA: 1, w: 1.4, col: L }); ell(70, -28, 4, 4, { wash: '#f8e060', washA: 1, line: false }); pop();
    push(980, 1250, 0.7); blob([[-50, 0], [-30, -24], [20, -28], [50, -14], [60, 0]], { wash: '#6a7a4a', washA: 1, w: 2, col: L }); pop();
    dragonfly(300 + Math.sin(t * 0.8) * 120, 860 + Math.sin(t * 1.6) * 40, 0.8, t, 1); dragonfly(760 + Math.sin(t * 0.7 + 2) * 140, 760, 0.6, t, 2);
  }
  function clump(x, base, len, t, seed, n = 9, col = '#2a5a18') {   // куст папоротника: веер вай с перышками
    for (let q = 0; q < n; q++) { const a = -2.75 + q * (2.2 / (n - 1)) + Math.sin(t * 1.1 + q + seed) * 0.03, P = []; for (let i = 0; i <= 9; i++) { const k = i / 9; P.push([x + Math.cos(a) * len * k, base + Math.sin(a) * len * k + k * k * len * 0.35]); }
      pencil(P, { w: 3.4, col: '#1a3a10', pass2: false }); for (let i = 1; i < 9; i++) { const [px, py] = P[i], sz = len * 0.11 * (1 - i / 10); for (const k of [-1, 1]) shape([[px, py], [px + k * sz * 0.5, py - sz * 0.9], [px + k * sz * 0.1, py - sz * 0.15]], { wash: col, washA: 1, w: 1.2, col: '#0a1a04' }); } }
  }
  function ground(t) {                                              // болото: вода с отражениями и ряской, берег с мхом, бревно с многоножкой, тараканы, скорпион
    rect(-500, 1300, 2200, 1000, { wash: '#4a3a24', washA: 1, w: 2, col: L });
    vgrad(1300, 1560, ['#3a5a48', '#24403a', '#1a3030'], 1); const r = rng(8520);
    for (let i = 0; i < 9; i++) { const x = -100 + i * 150; pencil([[x, 1310], [x + Math.sin(t + i) * 4, 1480]], { w: 10, col: '#7a8a5a', a: 0.25, pass2: false }); }
    for (let i = 0; i < 26; i++) { const x = r() * 1600 - 300, y = 1320 + r() * 220; pencil([[x - 30, y], [x + 30 + Math.sin(t * 2 + i) * 6, y]], { w: 2, col: '#b8e0c8', a: 0.45, pass2: false }); }
    for (let i = 0; i < 14; i++) ell(r() * 1500 - 200, 1330 + r() * 200, 18 + r() * 14, 6 + r() * 4, { wash: '#6a9a3a', washA: 1, w: 1, col: L });
    for (const [x, y, s] of [[480, 1420, 0.9], [1040, 1470, 0.75]]) { push(x, y, s); ell(0, 0, 56, 18, { wash: '#5a6a3a', washA: 1, w: 2, col: L }); ell(40, -12, 20, 14, { wash: '#5a6a3a', washA: 1, w: 1.6, col: L }); ell(46, -18, 5, 5, { wash: '#f8e060', washA: 1, line: false }); pop(); }
    poly([[-500, 1560], [200, 1530], [700, 1560], [1600, 1520], [1600, 2400], [-500, 2400]], { wash: '#4a3a22', washA: 1, w: 2.4, col: L, shade: { gap: 12, a: 0.15, col: '#1a120a', ang: 0.3 } });
    for (let i = 0; i < 30; i++) ell(r() * 2000 - 400, 1580 + r() * 420, 20 + r() * 40, 6 + r() * 10, { wash: i % 3 ? '#4a6a2a' : '#5a4a2a', washA: 1, w: 1, col: L, a: 0.7 });
    for (let i = 0; i < 4; i++) calam(-60 + i * 50, 1600, 260 + i * 30, t, 20 + i); for (let i = 0; i < 3; i++) calam(1060 + i * 46, 1600, 240 + i * 30, t, 30 + i);
    push(820, 1720, 1, -0.05); rect(-260, -50, 520, 60, { wash: '#6a5030', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.25, col: '#2a1a08', ang: 0.1 } }); ell(-260, -20, 20, 30, { wash: '#8a6a40', washA: 1, w: 2, col: L });
    const mx = -150 + ((t * 30) % 300); for (let q = 0; q < 12; q++) { ell(mx + q * 18, -62, 12, 9, { wash: q % 2 ? '#7a4a2a' : '#8a5a32', washA: 1, w: 1, col: L }); pencil([[mx + q * 18, -58], [mx + q * 18 - 4, -44 + Math.sin(t * 20 + q) * 3]], { w: 1.4, col: L, pass2: false }); } pop();
    for (let q = 0; q < 3; q++) { const x = 160 + q * 70 + Math.sin(t * 3 + q) * 20; push(x, 1880 + q * 10, 0.9); ell(0, 0, 20, 12, { wash: '#5a2a10', washA: 1, w: 1.2, col: L }); for (const k of [-1, 1]) pencil([[-6, k * 6], [-16, k * 16]], { w: 1.2, col: L, pass2: false }); pop(); }
    push(1180, 1860, 0.9); ell(0, 0, 26, 14, { wash: '#3a2a20', washA: 1, w: 1.4, col: L }); pencil([[20, 0], [44, -16], [50, -40], [40, -50]], { w: 5, col: '#3a2a20', pass2: false }); pop();
    for (let i = 0; i < 5; i++) ell(-200 + i * 300, 1960, 40, 16, { wash: '#6a6050', washA: 1, w: 1.4, col: L });
    dragonfly(560 + Math.sin(t * 1.3) * 200, 1380 + Math.sin(t * 2.2) * 30, 0.5, t, 3);
    lightPool(700, 1640, 700, 150, 'rgba(240,255,200,1)', 0.25); castShadow(330, 1650, 120, 480, -0.4, 0.35); moodDark(-300, 900, 900, 1900, '#0a1a0a', 0.22);
  }
  function front(t) { const op = clamp((t - EV.fr_fern + 0.1) / 0.6);   // передний план: кусты папоротника по краям; правый разворачивается на «папоротники»
    clump(-120, 2000, 560, t, 1, 9, '#2a5a18'); clump(1160, 2000, 420 + op * 260, t, 2, 9, '#3a6a1a'); }
  WORLD.fern = (t, u, cat) => {
    lay(40, () => sky(t)); lay(12, () => far(t)); lay(3.2, () => { mid(t); depthFog('#d8e0b0', 0.06); }); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(26, [-100, 600, 1200, 1600], '#f0ffd0', t, 8530, { sp: 2, sz: 2.6, a: 0.45, wob: 22, add: 1 }));
  };
  DIR.fern = {
    outfit: 'safari', light: { side: 1, rim: '#e8ffc0' }, grade: ['#1a3a10', 0.06],
    act: () => [[S0.fern, 'awe'], [EV.fr_own, 'smug'], [EV.fr_fern, 'laugh'], [EV.fr_coal, 'talk'], [EV.fr_name, 'proud']],
    pose: (t, u, b) => { const w1 = clamp(u / 0.9), x = lerp(60, 330, sm(w1)), grab = t > EV.fr_fern - 0.1 && t < EV.fr_coal; return Object.assign(b, { x, y: 1650, s: 0.95, walk: w1 < 1 ? t * 9 : 0, look: grab ? [1, -0.6] : [0.5, -0.2], hand: grab ? [220, -440] : [150, -300], point: t > EV.fr_coal }); },
    hud: t => {
      if (t > EV.fr_coal && t < EV.fr_name) { push(560, 820, popK(t, EV.fr_coal, 0.3), -0.02); rect(-330, -150, 660, 300, { wash: '#f2ead2', washA: 1, w: 3, col: L });
        const cols = [['#3a7a2a', 'ЛЕС'], ['#6a4a24', 'ТОРФ'], ['#1a1a20', 'УГОЛЬ']]; cols.forEach(([c, n], i) => { const x = -220 + i * 220, g = clamp((t - EV.fr_coal - i * 0.15) / 0.2); rect(x - 80, -60, 160, 120 * g, { wash: c, washA: 1, w: 2, col: L }); txt(n, x, 100, 36, { col: L, font: 'Osw' }); if (i) txt('→', x - 110, 0, 50, { col: DB.red, font: 'Osw' }); });
        txt('300 МЛН ЛЕТ ДАВЛЕНИЯ', 0, -110, 34, { col: DB.red, font: 'Osw' }); pop(); }
      infoPlate(560, 820, [['ДОНБАСС = ДОНецкий БАССейн', 46, DB.brassL], ['угольный · назван в 1827 г.', 30]], t, EV.fr_name);
    },
    cam: () => [[S0.fern, 620, 900, -0.06], [EV.fr_fern, 700, 920, 0.02, 'x'], [EV.fr_coal, 560, 1040, 0.06], [EV.fr_name, 520, 1080, 0.1, 'x'], [S1.fern, 520, 1090, 0.12]]
  };
  TRANS_IN.fern = { a: 0.06, b: 0.42, fx(k, t, A, B) {             // угольная пыль осыпается: чёрная завеса уходит вниз крупными хлопьями
    drawBuf(B); scr(() => { const e = sm(k), rr = rng(8540); ctx.save(); ctx.fillStyle = '#0a0a0c'; ctx.globalAlpha = 1 - e; ctx.fillRect(0, 0, W, H); ctx.restore();
      for (let i = 0; i < 160; i++) { const x = rr() * W, y0 = rr() * H, sp = 0.6 + rr(); const y = y0 + e * 2200 * sp, s = 8 + rr() * 26; if (y < H + 40) ell(x, y, s, s * 0.7, { wash: '#121216', washA: 1 - e * 0.6, line: false, rot: rr() }); } }); } };
})();
