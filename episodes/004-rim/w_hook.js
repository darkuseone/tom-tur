/* 004 — сцена `hook`: 2026, Ларго ди Торре Арджентина. Раскоп ниже уровня улицы: колонны храмов A и круглого храма B, основание курии Помпея,
   средневековая башня, охристые палаццо с зелёными ставнями, трамвай, люди у ограды. На руинах — кошки колонии. Призрак Цезаря с кинжалами
   на «убили», табличка «здесь убит Цезарь». Том — худи «РИМ», крутит часы на «Отматываем». Переход В туннель: кошачий зрачок-щель раскрывается порталом.
   Общая функция argentina(o) — мир площади; её же берёт `today` (w_today.js). */
(() => {
  EV.hook_ghost = WT('h1', 'убили');
  EV.hook_forum = WT('h1', 'Форуме,');
  EV.hook_cats = WT('h1', 'кошки!');
  EV.hook_wind = WT('h1', 'Отматываем');
  EV.hook_jump = 0.25;
  SHAKES.push([EV.hook_ghost + 0.05, 0.2, 8]);
  KEYW.push('убили', 'кошки!');
})();

/* ---- мир площади (hook + today). o: { dusk 0..1, ghost(t)→0..1, catsWake(t) } */
function argentina(o = {}) {
  const dusk = o.dusk || 0;
  const sky = dusk ? ['#2a2a5a', '#8a5a8a', '#f0a070', '#f8d0a0'] : ['#7ab4dc', '#bcd8ea', '#f2e6cc', '#f6dcb0'];
  function palazzo(x, y, w, h, c, k, t) {                             // римский дом: охра, карниз, зелёные ставни, герани
    const b = rect(x, y - h, w, h, { wash: c, washA: 1, w: 2.4, col: '#3a2410', key: 9300 + k }); shadeG(b.path, x + w, 0, x + w * 0.4, 0, lerpC(c, '#5a3010', 0.5), 0.35); hatch(b.path, b.bb, { gap: 9, a: 0.08, col: '#6a3a14', ang: 1.2, key: 9301 + k });
    rect(x - 10, y - h - 22, w + 20, 22, { wash: lerpC(c, '#ffffff', 0.25), washA: 1, w: 2, col: '#3a2410' }); for (let q = 0; q < w / 26; q++) rect(x + q * 26, y - h - 6, 14, 10, { wash: lerpC(c, '#ffffff', 0.3), washA: 1, w: 1, col: '#3a2410', a: 0.6 });
    const cols = Math.floor(w / 70), rows = Math.floor((h - 60) / 110);
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const wx = x + 24 + i * (w - 48) / Math.max(1, cols - 1) - 20, wy = y - h + 50 + j * 110;
      const lit = dusk && ((i * 7 + j * 3 + k) % 3 === 0);
      rect(wx, wy, 40, 64, { wash: lit ? '#ffcf7a' : '#2a2018', washA: 1, w: 1.8, col: '#2a1a0a' }); if (lit) glow(wx + 20, wy + 32, 40, 'rgba(255,200,120,1)', 0.4);
      if ((i + j + k) % 3) { rect(wx - 18, wy, 16, 64, { wash: '#4a6a3a', washA: 1, w: 1.4, col: '#1a2a10' }); rect(wx + 42, wy, 16, 64, { wash: '#4a6a3a', washA: 1, w: 1.4, col: '#1a2a10' }); for (let q = 0; q < 6; q++) pencil([[wx - 16, wy + 6 + q * 10], [wx - 4, wy + 6 + q * 10]], { w: 1, col: '#2a3a1a', pass2: false }); }
      rect(wx - 6, wy + 64, 52, 8, { wash: '#e8dcc0', washA: 1, w: 1.2, col: '#3a2410' });
      if ((i * 3 + j + k) % 4 === 0) { rect(wx - 4, wy + 72, 48, 12, { wash: '#8a5a3a', washA: 1, w: 1.2 }); for (let q = 0; q < 5; q++) ell(wx + q * 10, wy + 68 - Math.sin(q) * 4, 6, 6, { wash: q % 2 ? '#d83a3a' : '#e85a6a', washA: 1, line: false }); } }
  }
  function tower(x, y, t) {                                           // Торре дель Папито (средневековая башня на углу)
    const b = rect(x, y - 520, 150, 520, { wash: '#b8865a', washA: 1, w: 2.6, col: '#3a2010', key: 9320 }); hatch(b.path, b.bb, { gap: 14, a: 0.25, col: '#6a3a1a', ang: 0, key: 9321 }); shadeG(b.path, x + 150, 0, x + 40, 0, '#5a3010', 0.4);
    for (let q = 0; q < 6; q++) rect(x - 6 + q * 28, y - 548, 18, 30, { wash: '#b8865a', washA: 1, w: 2, col: '#3a2010' });
    for (const yy of [-440, -320, -200]) { rect(x + 55, y + yy, 40, 60, { wash: '#2a1a0a', washA: 1, w: 1.6 }); }
  }
  function tram(t) {                                                   // зелёный трамвай 8 проезжает по улице
    const x = ((t * 120) % 2600) - 900; push(x, 1060, 0.8);
    const b = rect(0, -150, 620, 130, { wash: '#4a8a5a', washA: 1, w: 2.4, col: '#10200e', key: 9330 }); shadeG(b.path, 0, -20, 0, -150, '#1a3a1a', 0.3);
    for (let q = 0; q < 7; q++) rect(20 + q * 84, -132, 66, 54, { wash: '#bcdce8', washA: 1, w: 1.6, col: '#10200e' }); rect(0, -40, 620, 14, { wash: '#e8dcc0', washA: 1, w: 1.4 }); txt('8', 590, -100, 40, { font: 'Osw', col: '#f6e7c8' });
    pencil([[300, -150], [340, -220], [380, -220]], { w: 3, col: '#2a2a2a', pass2: false }); for (const wx of [80, 540]) ell(wx, -14, 22, 22, { wash: '#2a2a2a', washA: 1, w: 1.6 });
    pop();
  }
  function street(t) {                                                // уровень улицы: тротуар, ограда раскопа, люди, Vespa
    const s = poly([[-500, 1040], [1600, 1040], [1600, 1100], [-500, 1100]], { wash: '#a89a88', washA: 1, w: 2.2, col: '#3a3024', key: 9340 });
    for (let x = -480; x < 1600; x += 40) pencil([[x, 1046], [x + 20, 1096]], { w: 1.2, col: '#6a5e50', a: 0.5, pass2: false });
    for (let x = -480; x < 1600; x += 36) pencil([[x, 1100], [x, 1030]], { w: 3, col: '#2a2a2a', pass2: false }); pencil([[-500, 1030], [1600, 1030]], { w: 5, col: '#2a2a2a', pass2: false }); pencil([[-500, 1064], [1600, 1064]], { w: 3, col: '#2a2a2a', pass2: false });
    const hp = (x, s_, oo) => human(x, 1040, s_, t, oo);
    hp(-120, 0.5, { body: '#3a5a8a', legs: '#2a2a3a', hair: '#3a2a1a', face: 'smile', armR: 'hold', prop: 'phone', look: 0.4, seed: 301 });
    hp(60, 0.48, { body: '#e8c04a', legs: '#3a3a4a', hair: '#c89a5a', hat: 'cap', hatCol: '#a8241e', face: 'smile', armR: 'point', look: 0.3, seed: 302 });
    hp(720, 0.5, { body: '#d85a4a', legs: '#2a2a2a', hair: '#1a1008', face: 'calm', armL: 'hold', look: -0.3, flip: -1, seed: 303 });
    hp(860, 0.47, { body: '#f0ece2', legs: '#5a6a8a', hair: '#e8d0a0', hat: 'scarf', hatCol: '#3a7a5a', face: 'smile', armR: 'hold', prop: 'phone', look: -0.5, flip: -1, seed: 304 });
    push(1000, 1040, 0.55); const v = blob([[-90, -40], [-60, -100], [10, -96], [60, -70], [90, -40], [60, -10], [-80, -10]], { wash: '#8ab8b0', washA: 1, w: 2.4, col: '#1a2a28', key: 9341 }); metalG(v.path, -20, -80, 120, '#e8fff8', '#8ab8b0', '#3a5a58');
    for (const wx of [-70, 70]) { ell(wx, -14, 24, 24, { wash: '#2a2a2a', washA: 1, w: 2 }); ell(wx, -14, 10, 10, { wash: '#a8acb0', washA: 1, w: 1 }); } pencil([[50, -96], [70, -150], [40, -160]], { w: 5, col: '#3a3a3a', pass2: false }); ell(54, -112, 10, 10, { wash: '#ffe8a0', washA: 1, w: 1.4 }); pop();
  }
  function pitWalls() {                                                 // стенки раскопа (кирпич/туф) от улицы вниз
    const w = poly([[-500, 1100], [1600, 1100], [1600, 1240], [-500, 1240]], { wash: '#9a6a4a', washA: 1, w: 2.2, col: '#3a2010', key: 9350 });
    for (let y = 1110; y < 1240; y += 16) pencil([[-500, y], [1600, y + 2]], { w: 1.4, col: '#5a3a20', a: 0.5, pass2: false }); for (let k = 0; k < 120; k++) { const r = rng(9351 + k), x = -500 + r() * 2100, y = 1110 + Math.floor(r() * 8) * 16; pencil([[x, y], [x, y + 16]], { w: 1.2, col: '#5a3a20', a: 0.5, pass2: false }); }
    shadeG(w.path, 0, 1240, 0, 1100, '#2a1408', 0.4);
  }
  function temples(t) {                                                // храмы A (колоннада) и B (круглый), фундамент курии
    for (let k = 0; k < 6; k++) column(-60 + k * 92, 1300, 420 - (k % 3 === 2 ? 120 : 0), 26, { cap: 'ion', col: '#d8ccb0', broken: k % 3 === 2 ? 0.6 : 0, key: 9360 + k });
    rect(-120, 1300, 620, 40, { wash: '#a89878', washA: 1, w: 2.2, col: '#3a2a14' }); for (let k = 0; k < 8; k++) rect(-120 + k * 30, 1340 + k * 0, 640 - k * 60, 0.1, { line: false });
    // круглый храм B: дуга колонн
    for (let k = 0; k < 7; k++) { const a = Math.PI * (0.15 + k * 0.12), x = 820 + Math.cos(a) * 200, y = 1320 - Math.sin(a) * 24; column(x, y, 300 - (k === 3 ? 140 : 0), 22, { cap: 'cor', col: '#e6dac0', broken: k === 3 ? 0.7 : 0, key: 9370 + k }); }
    poly([[560, 1320], [1080, 1320], [1100, 1360], [540, 1360]], { wash: '#a89878', washA: 1, w: 2.2, col: '#3a2a14' });
    // курия Помпея: низкая стена из туфа + табличка
    const cw = rect(-300, 1360, 1700, 46, { wash: '#b89a70', washA: 1, w: 2.2, col: '#3a2410', key: 9380 }); for (let x = -300; x < 1400; x += 60) pencil([[x, 1360], [x, 1406]], { w: 1.4, col: '#5a3a20', a: 0.6, pass2: false });
    rect(170, 1340, 1, 1, { line: false });
  }
  function pitFloor(t) {                                               // дно раскопа: трава, плиты, обломки
    const f = poly([[-500, 1400], [1600, 1400], [1600, 2400], [-500, 2400]], { wash: '#9aa060', washA: 1, w: 2, col: '#3a3a14', key: 9390 });
    for (let k = 0; k < 18; k++) { const r = rng(9391 + k), x = -400 + r() * 1900, y = 1470 + r() * 300, w = 60 + r() * 120; poly([[x, y], [x + w, y - 6], [x + w + 10, y + 24], [x - 6, y + 28]], { wash: '#c8b898', washA: 1, w: 1.8, col: '#4a3a24' }); }
    for (let k = 0; k < 60; k++) { const r = rng(9400 + k), x = -400 + r() * 1900, y = 1420 + r() * 400; pencil([[x, y], [x - 4, y - 14 - r() * 10]], { w: 2, col: '#4a6a2a', a: 0.7, pass2: false }); pencil([[x + 4, y], [x + 8, y - 12 - r() * 8]], { w: 2, col: '#6a8a3a', a: 0.7, pass2: false }); }
    for (const [x, y, s] of [[-120, 1540, 1], [980, 1500, 0.8], [400, 1720, 0.7]]) { push(x, y, s); const d = poly([[-60, 0], [-50, -40], [40, -48], [62, -10], [50, 0]], { wash: '#d8ccb0', washA: 1, w: 2, col: '#3a2a14' }); shadeG(d.path, 60, 0, -20, 0, '#6a5a3a', 0.4); for (let q = -2; q <= 2; q++) pencil([[q * 18, -4], [q * 18, -38]], { w: 1.2, col: '#8a7a5a', a: 0.6, pass2: false }); pop(); }
  }
  function ghost(t, a) {                                               // призрак Цезаря в лавровом венке и кинжалы
    if (a <= 0) return; glow(250, 1150, 320, 'rgba(170,200,255,1)', 0.45 * a); ctx.save(); ctx.globalAlpha = a * 0.62;
    human(250, 1390 - Math.sin(t * 2) * 10, 1.3, t, { body: '#b8c8ec', toga: '#dce6fa', stripe: '#8a4ac0', long: 1, skin: '#c8d4f0', hair: '#7a8ab8', hat: 'laurel', face: 'shock', armL: 'up', armR: 'up', look: 0.3, seed: 310 });
    ctx.restore();
    for (let k = 0; k < 5; k++) { const ph = clamp((t - EV.hook_ghost - k * 0.08) / 0.3), ang = -2.2 + k * 0.5, d = 260 - ph * 160; if (ph <= 0) continue;
      push(250 + Math.cos(ang) * d, 1130 + Math.sin(ang) * d * 0.6, 1, ang + Math.PI / 2); ctx.save(); ctx.globalAlpha = a; blob([[-7, 0], [7, 0], [5, -110], [0, -130], [-5, -110]], { wash: '#dfe6ea', washA: 1, w: 1.8, col: '#2a3036' }); rect(-18, 0, 36, 9, { wash: '#c08a3c', washA: 1, w: 1.4 }); rect(-6, 9, 12, 30, { wash: '#4a2a14', washA: 1, w: 1.4 }); ctx.restore(); pop(); }
  }
  function plaque(t, a) { if (a <= 0) return; push(170, 1300, 1, -0.02); ctx.save(); ctx.globalAlpha = a; rect(-150, -50, 300, 90, { wash: '#efe6d0', washA: 1, w: 2.4, col: '#3a2410' }); txt('CVRIA POMPEI', 0, -18, 32, { font: 'Osw', col: '#3a2410' }); txt('здесь убит Цезарь · 44 до н. э.', 0, 20, 24, { font: 'Hand', col: '#8a1a14' }); ctx.restore(); pop(); }
  function cats(t) {                                                   // колония: кошки на колоннах, на плитах, гуляют
    const wake = o.catsWake ? o.catsWake(t) : 1, cr = o.crowns ? o.crowns(t) : 0, K = (x, y, s_, tt, oo) => kitty(x, y, s_, tt, Object.assign(oo, { crown: cr }));
    K(-60, 860, 0.55, t, { col: '#2a2420', belly: '#f0e8d8', pose: 'sit', look: 0.4, seed: 1 });
    K(32, 1300 - 420 - 30, 0.5, t, { col: '#e8e0d0', pose: 'loaf', look: -0.2, seed: 2 });
    K(124, 1300 - 300 - 26, 0.55, t, { col: '#c8843a', stripe: '#8a4a1a', pose: 'lie', sleep: 1, seed: 3 });
    K(820 + Math.cos(Math.PI * 0.51) * 200, 1320 - 160 - 26, 0.5, t, { col: '#7a7a80', stripe: '#3a3a40', pose: 'sit', look: 0.6, flip: -1, seed: 4 });
    K(380, 1560, 1.15, t, { col: '#d8a060', stripe: '#a0602a', belly: '#f6ecd8', pose: 'sit', look: 0.5, seed: 5 });
    K(1000, 1520, 1.05, t, { col: '#1e1a18', pose: 'loaf', look: -0.6, eye: '#e8c040', seed: 6 });
    K(-90 + ((t * 60) % 300), 1395, 0.6, t, { col: '#b0a090', stripe: '#6a5a4a', pose: 'walk', seed: 7 });
    K(560, 1405, 0.6, t, { col: '#f0e8dc', belly: '#ffffff', pose: 'lie', look: 0.2, seed: 8, flip: -1 });
    if (wake) { const jy = Math.max(0, Math.sin(clamp((t - EV.hook_jump) / 0.7) * Math.PI)) * 260; K(860, 1580 - jy, 1.05, t, { col: '#c8843a', stripe: '#8a4a1a', belly: '#f6ecd8', pose: jy > 20 ? 'walk' : 'sit', look: -0.8, seed: 9, flip: -1 }); }
    K(120, 1720, 1.4, t, { col: '#2a2420', belly: '#f0e8d8', pose: 'sit', look: 0.6, seed: 10 });
  }
  return (t, u, cat) => {
    lay(40, () => { vgrad(-900, 1100, sky); if (dusk) glow(900, 760, 600, 'rgba(255,170,110,1)', 0.45 * dusk); else glow(860, 260, 380, 'rgba(255,248,220,1)', 0.6);
      for (let k = 0; k < 4; k++) { const x = (k * 420 + t * 12) % 1900 - 300, y = 140 + k * 70; for (let q = 0; q < 5; q++) ell(x + q * 50, y - Math.sin(q / 4 * Math.PI) * 26, 46, 26, { wash: dusk ? '#f0b0a0' : '#fbf6ea', washA: 0.85, w: 1, col: '#b8a888', a: 0.25 }); }
      for (let k = 0; k < 6; k++) { const x = (200 + k * 160 + t * 40) % 1300, y = 380 + Math.sin(t + k) * 30 + k * 12, f = Math.sin(t * 9 + k) * 8; pencil([[x - 14, y - f], [x, y], [x + 14, y - f]], { w: 2.4, col: '#2a2a2a', pass2: false }); } });
    lay(14, () => { // купола и колокольни на горизонте
      sil([[-400, 1000], [-400, 780], [1600, 760], [1600, 1000]], dusk ? '#6a4a6a' : '#c8b8a8', 0.7);
      push(980, 780, 0.9); sil([[-110, 0], [-110, -60], [-90, -150], [-40, -200], [0, -210], [40, -200], [90, -150], [110, -60], [110, 0]], dusk ? '#5a3a5a' : '#a8968a', 1); sil([[-12, -210], [-12, -250], [12, -250], [12, -210]], dusk ? '#5a3a5a' : '#a8968a', 1); pop();
      umbrellaPine(150, 860, 0.5, 9310, dusk ? '#2a3a2a' : '#5a7a4a'); umbrellaPine(1180, 880, 0.45, 9312, dusk ? '#2a3a2a' : '#5a7a4a'); haze(dusk ? '#c08080' : '#f2e6cc', 0.25); });
    lay(7, () => { palazzo(-380, 1040, 380, 520, '#d89a5a', 0, t); palazzo(20, 1040, 300, 460, '#e6b46a', 1, t); tower(330, 1040, t); palazzo(500, 1040, 360, 500, '#c8784a', 2, t); palazzo(880, 1040, 420, 540, '#e0a868', 3, t); haze(dusk ? '#a07080' : '#f2e6cc', 0.1); });
    lay(4, () => { tram(t); street(t); pitWalls(); });
    lay(2.2, () => { temples(t); plaque(t, o.plaque ? o.plaque(t) : 1); });
    lay(1.4, () => { pitFloor(t); });
    lay(1, () => { ghost(t, o.ghost ? o.ghost(t) : 0); cats(t); cat(); });
    if (dusk) motes(30, [0, 400, W, 1700], '#ffd8a0', t, 31, { sp: -10, sz: 2.4, a: 0.5, tw: 1, add: 1 });
    else motes(24, [0, 400, W, 1700], '#fff6dc', t, 32, { sp: -6, sz: 2, a: 0.4, tw: 1, add: 1 });
  };
}

(() => {
  WORLD.hook = argentina({ ghost: t => clamp((t - EV.hook_ghost + 0.1) / 0.25) * (1 - clamp((t - EV.hook_cats) / 0.5)), plaque: t => clamp((t - EV.hook_forum) / 0.3) });
  DIR.hook = {
    outfit: 'hoodieR', light: { side: 1, rim: '#ffe6b0' }, grade: ['#d89a5a', 0.12],
    act: () => [[0, 'shock'], [EV.hook_forum, 'suspicious'], [EV.hook_cats - 0.05, 'grin'], [EV.hook_wind - 0.05, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 740, y: 1500, s: 0.98, look: t < EV.hook_forum ? [-0.5, -0.2] : t < EV.hook_cats ? [-0.6, 0.3] : [0.1, 0], tilt: t < EV.hook_forum ? -0.05 : 0,
      hand: t > EV.hook_wind - 0.15 ? [70, -330] : t > EV.hook_forum && t < EV.hook_wind - 0.15 ? [-150, -150] : undefined, point: t > EV.hook_forum && t < EV.hook_wind - 0.15 ? 1 : undefined,
      watchInHand: t > EV.hook_wind - 0.15, glow: clamp((t - EV.hook_wind) / 0.4), spin: t > EV.hook_wind ? 1.4 : 0, tailUp: t < 1.2 }),
    cam: () => [[0, 520, 1180, 0.16], [EV.hook_ghost + 0.3, 460, 1150, 0.1], [EV.hook_cats, 600, 1240, 0.12], [EV.hook_wind, 580, 1180, 0.18], [S1.hook, 600, 1200, 0.3]]
  };
  // ---------------------------------------------------------------- переход В туннель: кошачий глаз, зрачок-щель раскрывается порталом
  TRANS_IN.tunnel = { a: 0.35, b: 0.45, runA: 1, fx(k, t, A, B) {
    const cx = 540, cy = 920, g = sm(clamp(k / 0.4)), op = sm(clamp((k - 0.4) / 0.6));
    drawBuf(A, 1 + g * 0.6, 640, 1000);
    scr(() => {
      const R = 300 + g * 900; ctx.save(); ctx.globalAlpha = g;
      const ir = ctx.createRadialGradient(cx, cy, 20, cx, cy, R); ir.addColorStop(0, '#f6e05a'); ir.addColorStop(0.5, '#c8a020'); ir.addColorStop(1, '#5a6a10'); ctx.fillStyle = ir; ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.8, 0, 0, 6.3); ctx.fill();
      for (let i = 0; i < 60; i++) { const a = i / 60 * 6.283; pencil([[cx + Math.cos(a) * 60, cy + Math.sin(a) * 50], [cx + Math.cos(a) * R * 0.95, cy + Math.sin(a) * R * 0.76]], { w: 2, col: '#7a6010', a: 0.4, pass2: false }); }
      ctx.restore();
      const sw = lerp(40, 900, op), sh = lerp(R * 0.75, 1200, op);
      const p = new Path2D(); p.ellipse(cx, cy, sw, sh, 0, 0, 6.3);
      ctx.save(); ctx.globalAlpha = g; ctx.fillStyle = '#0a0806'; ctx.fill(p); ctx.restore();
      if (op > 0) { ctx.save(); ctx.clip(p); ctx.drawImage(B, 0, 0); ctx.restore(); ringFX(cx, cy, Math.min(sw, 700), t, ['#e8a33c', '#fff1c8', '#c99636'], clamp(1.2 - op)); }
      if (g > 0.3 && op < 0.2) glow(cx - R * 0.3, cy - R * 0.3, 80, 'rgba(255,255,255,1)', 0.8 * g);
    });
  } };
})();
