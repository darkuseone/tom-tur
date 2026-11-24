/* 033 — сцена `drone`, 14.02.2025. Ночь, мелкий снег, арка крупно (стальные рёбра, прожекторы у основания), забор с колючкой,
   будка охраны, служебная машина, пожарные в касках. Главный свет — холодные прожекторы снизу, после удара — оранжевый огонь на крыше.
   Тёмный силуэт дрона (без опознавательных знаков) летит к арке; на «дрон» — вспышка и пробоина в крыше, дым, тряска; пожарные бегут,
   мигалка. Том (тёмный пуховик) проверяет дозиметр — фон в норме. Плашка: «14.02.2025 · ДРОН ПРОБИЛ КРЫШУ / МАГАТЭ: УДЕРЖАНИЕ ПОТЕРЯНО /
   ФОН — В НОРМЕ». Кто запустил — не называем. */
(() => {
  const L = CH.ink, HOLE = [520, 760];
  EV.dr_fly = LS('s8'); EV.dr_hit = wtk('s8', 'попал');
  KEYW.push('дрон.');
  const H = t => clamp((t - EV.dr_hit) / 0.2);
  function sky(t) { const h = H(t); vgrad(-900, 1100, ['#04060e', '#0c1426', lerpC('#1a2440', '#3a2018', h * 0.6)], 1); const r = rng(5900); for (let i = 0; i < 50; i++) { ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(r() * 1600 - 300, r() * 700, 2.5, 2.5); }
    if (t < EV.dr_hit) { const k = clamp((t - EV.dr_fly + 0.3) / (EV.dr_hit - EV.dr_fly + 0.3)), x = lerp(-150, HOLE[0], k), y = lerp(640, HOLE[1] - 20, k); push(x, y, 1.6, 0.12);
      poly([[-60, 0], [40, -10], [70, 0], [40, 10]], { wash: '#16161a', washA: 1, w: 2, col: '#000' }); poly([[-10, 0], [-30, -50], [0, -50], [20, 0]], { wash: '#1e1e22', washA: 1, w: 1.6, col: '#000' }); poly([[-10, 0], [-30, 50], [0, 50], [20, 0]], { wash: '#1e1e22', washA: 1, w: 1.6, col: '#000' }); pop(); } }
  function far(t) { hills(1060, 14, '#0e1420', 6.2); for (let i = 0; i < 14; i++) { const r = rng(5910 + i); polPine(-200 + i * 110 + r() * 40, 1070, 150 + r() * 70, t, 110 + i, { col: '#121c22', colD: '#0c1418', trunk: '#2a1a14' }); } depthFog('#1a2440', 0.06); }
  function arch(t) {                                                // арка крупно + огонь и дым после удара
    const h = H(t), u = t - EV.dr_hit; archNSC(640, 1260, 1.25, t, { col: '#8a98a8', hole: h > 0 ? [HOLE[0] - 640, (HOLE[1] - 1260) / 1.25] : null });
    for (let i = 0; i < 4; i++) { const x = 140 + i * 330; push(x, 1260, 0.8); pencil([[0, 0], [0, -120]], { w: 6, col: '#3a3a44', pass2: false }); rect(-24, -140, 48, 26, { wash: '#e8f0ff', washA: 1, w: 1.6, col: L }); pop(); shaft(x, 1140, 60, 500, Math.PI, 'rgba(200,220,255,1)', 0.08); }
    if (h > 0) { glow(HOLE[0], HOLE[1], 160, 'rgba(255,140,60,1)', 0.5 * (u < 0.3 ? 1.6 : 1)); for (let i = 0; i < 5; i++) { const k = (u * 0.5 + i / 5) % 1; ell(HOLE[0] + Math.sin(i * 2 + t) * 60 + k * 120, HOLE[1] - 40 - k * 520, 60 + k * 160, 40 + k * 90, { wash: i % 2 ? '#3a3a40' : '#4a4448', washA: 0.6 * (1 - k * 0.5), line: false }); }
      for (let i = 0; i < 5; i++) { const ph = (t * 2.2 + i / 5) % 1; blob([[HOLE[0] - 30 + i * 14, HOLE[1]], [HOLE[0] - 20 + i * 14, HOLE[1] - 40 - ph * 60], [HOLE[0] - 6 + i * 14, HOLE[1]]], { wash: i % 2 ? '#ff8a2a' : '#ffd060', washA: 1 - ph, line: false }); }
      if (u < 0.5) { const a = 1 - u / 0.5; ell(HOLE[0], HOLE[1], 120 + u * 400, 80 + u * 260, { wash: '#fff0c8', washA: 0.8 * a, line: false }); } }
  }
  function yard(t) {                                                 // забор, будка, машина, пожарные
    const h = H(t); for (let x = -200; x < 1500; x += 60) pencil([[x, 1380], [x, 1250]], { w: 4, col: '#4a4a52', pass2: false }); pencil([[-200, 1260], [1500, 1260]], { w: 3, col: '#5a5a62', pass2: false }); for (let x = -200; x < 1500; x += 20) pencil([[x, 1256], [x + 10, 1244], [x + 20, 1256]], { w: 1.6, col: '#6a6a72', pass2: false });
    for (let x = -200; x < 1500; x += 30) pencil([[x, 1380], [x + 30, 1260]], { w: 1.2, col: '#4a4a52', a: 0.6, pass2: false });
    push(120, 1420, 0.8); rect(-100, -200, 200, 200, { wash: '#4a5a6a', washA: 1, w: 2, col: L }); rect(-70, -160, 80, 60, { wash: '#ffd890', washA: 1, w: 1.4, col: L }); poly([[-120, -200], [0, -240], [120, -200]], { wash: '#2a3440', washA: 1, w: 2, col: L }); pop();
    push(980, 1440, 0.8); rect(-180, -120, 360, 90, { wash: '#c8281e', washA: 1, w: 2, col: L }); rect(60, -170, 120, 140, { wash: '#c8281e', washA: 1, w: 2, col: L }); rect(80, -156, 80, 50, { wash: '#a8c8d8', washA: 1, w: 1.4, col: L }); for (const k of [-110, 110]) ell(k, -26, 30, 30, { wash: '#1e1e22', washA: 1, w: 2, col: L });
    if (h > 0) glow(120, -180, 60, Math.sin(t * 14) > 0 ? 'rgba(80,140,255,1)' : 'rgba(255,60,40,1)', 0.6); txt('101', -60, -76, 34, { col: '#fff6e0', font: 'Osw' }); pop();
    const run = h > 0 ? (t - EV.dr_hit) * 120 : 0; for (let i = 0; i < 5; i++) human(560 + i * 80 + run * (i % 2 ? 1 : 0.6), 1460, 0.66, t, { body: '#3a3a40', bodyD: '#1a1a1e', hat: 'helmet', legs: '#2a2a30', armR: h > 0 ? 'wave' : 'hold', flip: -1, seed: 5920 + i, face: h > 0 ? 'shock' : 'smile' });
    human(260, 1460, 0.66, t, { body: '#4a5a3a', hat: 'cap', hatCol: '#3a4a2a', legs: '#2a2a30', armR: h > 0 ? 'wave' : 'hold', seed: 5930, face: h > 0 ? 'shock' : 'smile' });
  }
  function ground(t) {                                               // снег с колеями, следы, бухта шланга, огнетушитель, полынь из-под снега
    const h = H(t); rect(-500, 1500, 2200, 900, { wash: '#c8d0e0', washA: 1, w: 2, col: L, shade: { gap: 14, a: 0.06, col: '#5a6a8a', ang: 0.2 } }); const r = rng(5940);
    for (let i = 0; i < 2; i++) pencil([[-400, 1640 + i * 40], [600, 1600 + i * 40], [1500, 1660 + i * 40]], { w: 10, col: '#8a96b0', a: 0.6, pass2: false }); for (let i = 0; i < 24; i++) ell(r() * 1700 - 300, 1560 + r() * 400, 10, 6, { wash: '#9aa6c0', washA: 1, w: 1, col: '#6a7690', a: 0.6 });
    push(900, 1800, 1); for (let q = 0; q < 4; q++) pencil(ellPts(0, 0, 40 + q * 14, 26 + q * 9, 0, 0, 30), { w: 7, col: '#c8281e', pass2: false }); pop();
    push(1100, 1760, 1); rect(-24, -100, 48, 100, { wash: '#c8281e', washA: 1, w: 2, col: L }); pencil([[0, -100], [30, -124], [50, -110]], { w: 4, col: L, pass2: false }); pop();
    for (let i = 0; i < 3; i++) mugwort(-100 + i * 60, 1980, 1.1, t, 160 + i, { leaf: '#8a9a88' });
    push(700, 1700, 1); rect(-80, -140, 160, 140, { wash: '#e8e4d8', washA: 1, w: 2, col: L }); rect(-60, -120, 120, 50, { wash: '#2a3a4a', washA: 1, w: 1.4, col: L }); txt('ДОЗ. КОНТРОЛЬ', 0, -40, 20, { col: '#2a2a30', font: 'Osw' }); glow(0, -96, 40, 'rgba(120,255,140,1)', 0.3); txt('0.12', 0, -90, 30, { col: '#8affa0', font: 'Osw' }); pop();
    for (let i = 0; i < 4; i++) { push(-40 + i * 50, 1700 + (i % 2) * 20, 1); poly([[-20, 0], [-6, -56], [6, -56], [20, 0]], { wash: '#f06a1e', washA: 1, w: 1.4, col: L }); rect(-12, -36, 24, 10, { wash: '#ffffff', washA: 1, line: false }); pop(); }
    for (let i = 0; i < 2; i++) human(1020 + i * 120, 1880, 0.95, t, { body: '#3a3a40', bodyD: '#1a1a1e', hat: 'helmet', legs: '#2a2a30', armR: H(t) > 0 ? 'wave' : 'hold', prop: i ? 'stick' : undefined, flip: -1, seed: 5970 + i, face: H(t) > 0 ? 'shock' : 'smile' });
    push(920, 1960, 1); ell(0, 0, 70, 20, { wash: '#2a2a30', washA: 1, w: 2, col: L }); pencil([[-60, -4], [60, -4]], { w: 3, col: '#c8a040', pass2: false }); pop();
    lightPool(640, 1640, 1000, 200, h > 0 ? 'rgba(255,150,80,1)' : 'rgba(200,220,255,1)', 0.25); castShadow(380, 1760, 110, 520, h > 0 ? 2.6 : 3.1, 0.32); moodDark(540, 1200, 400, 1500, '#02040a', 0.35);
  }
  function front(t) { for (const x of [-160, 1240]) { sil([[x - 70, 2300], [x - 40, 1000], [x + 40, 1000], [x + 70, 2300]], '#060810', 1); for (let i = 0; i < 4; i++) blob([[x - 200, 1000 + i * 90], [x, 920 + i * 90], [x + 200, 1000 + i * 90], [x, 1050 + i * 90]], { wash: '#0c141a', washA: 1, line: false }); } }
  WORLD.drone = (t, u, cat) => {
    lay(40, () => sky(t)); lay(16, () => far(t)); lay(3.6, () => arch(t)); lay(2.4, () => yard(t)); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(1.8, () => motes(40, [-100, 500, 1200, 1900], '#ffffff', t, 5950, { sp: 5, vx: -1, sz: 3, a: 0.7, wob: 10 }));
  };
  DIR.drone = {
    outfit: 'pufferM', light: { side: 1, rim: '#ffb070' }, grade: ['#0a1020', 0.08],
    act: () => [[S0.drone, 'suspicious'], [EV.dr_hit, 'shock'], [EV.dr_hit + 0.7, 'annoyed']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1760, s: 0.95, look: t < EV.dr_hit ? [0.4, -0.9] : [0.6, -0.8], hand: t > EV.dr_hit + 0.5 ? [150, -320] : [140, -300], squash: t > EV.dr_hit && t < EV.dr_hit + 0.3 ? 0.08 : b.squash, cold: 0.3, light: { side: 1, rim: t > EV.dr_hit ? '#ff9a50' : '#a8c0f0' } }),
    afterCat: (t, u, P) => { if (t > EV.dr_hit + 0.5) dosimeter(P.x + P.hand[0] * P.s, P.y + P.hand[1] * P.s, 0.8, t, { needle: -0.5 + Math.sin(t * 7) * 0.06 }); },
    hud: t => { if (t < EV.dr_hit) chBoard(720, 1200, 0.8, t, S0.drone + 0.3, [['14.02.2025 · НОЧЬ', 44, '#ffe08a']], { w: 540 }); else chBoard(700, 1180, 0.78, t, EV.dr_hit, [['14.02.2025 · ДРОН', 40, '#ffe08a'], ['ПРОБИЛ КРЫШУ АРКИ', 40], ['МАГАТЭ: УДЕРЖАНИЕ ПОТЕРЯНО', 34, '#ff8a6a'], ['ФОН — В НОРМЕ', 44, '#8ae0a0']], { w: 640, edge: '#ff8a3a' }); },
    cam: () => [[S0.drone, 560, 900, -0.12], [EV.dr_hit, 540, 860, -0.06, 'x'], [S1.drone, 540, 900, -0.02]]
  };
  SHAKES.push([EV.dr_hit, 0.45, 16]);
  TRANS_IN.drone = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = 1 - Math.abs(e - 0.5) * 2, r = rng(5960); for (let i = 0; i < 18; i++) ell(r() * W, r() * H, (200 + r() * 200) * (0.6 + a), (140 + r() * 120) * (0.6 + a), { wash: i % 2 ? '#2a2a30' : '#3a3a42', washA: 0.95 * a, line: false }); }); } };
})();
