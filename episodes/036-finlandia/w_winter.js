/* 036 — сцена `winter`, 1939–1940. Зимний лес Карелии в −40: глубокий снег, ели, лыжники в белых маскхалатах уходят между деревьями
   (без оружия в действии, без символики), полевая кухня-«котелок», землянка с дымом, сани с лошадью, санитары, северное сияние в небе.
   Главный свет — холодная луна + оранжевый огонь кухни. На «Зимняя война» — табло-счётчик дней 1 → 105; на «Карелию потеряли» —
   карта: Карелия отрезана красным; на «страну отстояли» — Финляндия остаётся синей, плашка «105 ДНЕЙ · КАРЕЛИЯ ПОТЕРЯНА · НЕЗАВИСИМОСТЬ
   СОХРАНЕНА». Том (тулуп) греет лапы у котла. */
(() => {
  const L = FIC.ink;
  EV.wn_war = wtk('s8', 'Зимняя'); EV.wn_105 = wtk('s8', 'сто'); EV.wn_kar = wtk('s8', 'Карелию'); EV.wn_map = EV.wn_kar - 0.15; EV.wn_keep = wtk('s8', 'страну');
  KEYW.push('дней.', 'отстояли.');
  function sky(t) { vgrad(-900, 1100, ['#040818', '#0e1a3a', '#2a3a5a'], 1); ell(860, 420, 40, 40, { wash: '#eef2fa', washA: 1, line: false }); glow(860, 420, 120, 'rgba(200,220,255,1)', 0.25);
    for (let k = 0; k < 3; k++) { const pts = []; for (let i = 0; i <= 20; i++) pts.push([-200 + i * 80, 300 + k * 60 + Math.sin(i * 0.5 + t * 0.8 + k) * 50]); pencil(pts, { w: 50, col: k % 2 ? FIC.aur2 : FIC.aur, a: 0.2, pass2: false, gap: false }); } }
  function far(t) { hills(1020, 30, '#c8d4e8', 9.9); for (let i = 0; i < 18; i++) { const r = rng(12100 + i); pineF(-200 + i * 90 + r() * 40, 1040, 200 + r() * 100, t, { snow: 1, col: '#1e3428', colD: '#142418' }); } depthFog('#2a3a5a', 0.06); }
  function camp(t) {                                                // лыжники, землянка, кухня, сани, санитары
    for (let i = 0; i < 5; i++) { const x = ((t * 40 + i * 260) % 1600) - 200; human(x, 1250 + (i % 2) * 20, 0.55, t, { body: '#f4f6fa', bodyD: '#a8b4c8', hat: 'hood', hatCol: '#f4f6fa', legs: '#e8ecf4', armR: 'swing', seed: 12110 + i, face: 'calm', long: 1 }); pencil([[x - 60, 1252 + (i % 2) * 20], [x + 60, 1248 + (i % 2) * 20]], { w: 4, col: '#6a4a2a', pass2: false }); }
    push(1000, 1230, 0.8); blob([[-160, 0], [-140, -90], [0, -130], [140, -90], [160, 0]], { wash: '#f4f6fa', washA: 1, w: 2, col: L }); rect(-40, -80, 80, 80, { wash: '#4a3a2a', washA: 1, w: 1.6, col: L }); rect(60, -160, 20, 60, { wash: '#3a3a3a', washA: 1, w: 1.4, col: L }); for (let i = 0; i < 4; i++) { const k = (t * 0.3 + i / 4) % 1; ell(70 + Math.sin(t + i) * 14, -170 - k * 160, 14 + k * 30, 10 + k * 20, { wash: '#c8ccd8', washA: 0.4 * (1 - k), line: false }); } pop();
    push(180, 1260, 0.65, 0, 1); horse(0, 0, 1, t, { col: '#5a4a3a', seed: 4 }); rect(110, -110, 220, 60, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); pencil([[110, -50], [340, -50]], { w: 5, col: '#3a2a1a', pass2: false }); pop();
    for (let i = 0; i < 2; i++) human(400 + i * 80, 1270, 0.6, t, { body: '#e8ecf4', hat: 'fur', hatCol: '#f4f4f0', legs: '#c8ccd8', armR: 'hold', seed: 12120 + i, face: 'calm' }); push(440, 1270 - 140 * 0.6, 0.6); rect(-60, -20, 120, 30, { wash: '#f4f4f0', washA: 1, w: 1.4, col: L }); pop();
  }
  function ground(t) {                                              // глубокий снег, кухня с котлом, дрова, лыжи, рукавицы
    rect(-500, 1330, 2200, 1000, { wash: '#e8eef8', washA: 1, w: 2, col: L, shade: { gap: 14, a: 0.05, col: '#6a7a9a', ang: 0.2 } }); const r = rng(12130);
    for (let i = 0; i < 6; i++) blob([[-300 + i * 340, 1700 + (i % 2) * 140], [-200 + i * 340, 1650 + (i % 2) * 140], [-60 + i * 340, 1680 + (i % 2) * 140], [-120 + i * 340, 1720 + (i % 2) * 140]], { wash: '#ffffff', washA: 0.95, w: 1.2, col: '#a8b4c4' });
    push(640, 1700, 1); rect(-90, -120, 180, 120, { wash: '#3a4a3a', washA: 1, w: 2, col: L }); ell(0, -130, 90, 26, { wash: '#2a2a2e', washA: 1, w: 2, col: L }); for (let i = 0; i < 4; i++) { const k = (t * 0.5 + i / 4) % 1; ell(Math.sin(t + i) * 20, -160 - k * 200, 20 + k * 40, 14 + k * 24, { wash: '#e8ecf4', washA: 0.5 * (1 - k), line: false }); }
    for (let i = 0; i < 4; i++) { const ph = (t * 2 + i / 4) % 1; blob([[-40 + i * 24, -10], [-34 + i * 24, -40 - ph * 30], [-26 + i * 24, -10]], { wash: i % 2 ? '#ff8a2a' : '#ffd060', washA: 1 - ph, line: false }); } glow(0, -20, 120, 'rgba(255,150,60,1)', 0.35); pop();
    for (let i = 0; i < 5; i++) rect(900 + i * 26, 1780 - i * 8, 140, 18, { wash: '#8a5a32', washA: 1, w: 1.4, col: L });
    for (let i = 0; i < 2; i++) pencil([[-100 + i * 30, 1900], [60 + i * 30, 1640]], { w: 7, col: '#8a6a4a', pass2: false });
    lightPool(640, 1640, 700, 180, 'rgba(255,170,90,1)', 0.3); castShadow(400, 1720, 110, 440, 2.4, 0.3); moodDark(540, 1200, 450, 1500, '#02040e', 0.35);
  }
  function extras(t) { push(1180, 1540, 0.85); human(0, 0, 1, t, { body: '#e8ecf4', hat: 'fur', hatCol: '#f4f4f0', legs: '#c8ccd8', armR: 'hold', flip: -1, seed: 12140, face: 'calm' }); pop(); push(-60, 1540, 0.85); human(0, 0, 1, t, { body: '#e8ecf4', hat: 'hood', hatCol: '#e8ecf4', legs: '#c8ccd8', long: 1, armR: 'hold', seed: 12141, face: 'calm' }); pop(); }
  function front(t) { for (const x of [-150, 1240]) pineF(x, 2400, 1600, t, { snow: 1, col: '#16281c', colD: '#0e1a12' }); }
  function counter(t) { if (t < EV.wn_105 - 0.4 || t > EV.wn_map) return; const k = popK(t, EV.wn_105 - 0.4, 0.3), f = sm(clamp((t - EV.wn_105 + 0.4) / 0.8)); push(640, 1000, 0.85 * k, -0.02); ctx.save(); ctx.fillStyle = 'rgba(10,16,30,0.92)'; ctx.fillRect(-240, -90, 480, 180); ctx.restore(); txt(Math.round(lerp(1, 105, f)) + ' ДНЕЙ', 0, -10, 80, { col: '#f2f4f8', font: 'Osw' }); txt('30.11.1939 — 13.03.1940', 0, 60, 32, { col: '#8ab0e8', font: 'Osw' }); pop(); }
  function map(t) { if (t < EV.wn_map) return; const k = sm(clamp((t - EV.wn_map) / 0.3)); scr(() => { ctx.save(); ctx.globalAlpha = k; const P = GLOBE.map(540, 980, 70, 27, 63.5, { land: '#e2d4ac', sea: '#2a5a8a', seaD: '#183a66' });
      GLOBE.fill(FI_POLY.map(P), '#4a7ac8', 0.85); pencil(FI_POLY.concat([FI_POLY[0]]).map(P), { w: 4, col: L, pass2: false, gap: false }); const c = sm(clamp((t - EV.wn_kar) / 0.6)); GLOBE.fill(KARELIA.map(P), FIC.red, 0.8 * c); pencil(KARELIA.concat([KARELIA[0]]).map(P), { w: 5, col: FIC.red, a: c, pass2: false, gap: true });
      const [kx, ky] = P([29.5, 61.6]); txt('КАРЕЛИЯ', kx + 60, ky, 40, { col: FIC.red, font: 'Osw', a: c }); const [fx, fy] = P([25.5, 64.5]); txt('ФИНЛЯНДИЯ', fx, fy, 50, { col: '#f2f4f8', font: 'Osw' });
      if (t > EV.wn_keep) { const kk = popK(t, EV.wn_keep, 0.3); push(560, 1330, kk); ctx.save(); ctx.fillStyle = 'rgba(10,16,30,0.92)'; ctx.fillRect(-300, -60, 600, 120); ctx.restore(); txt('НЕЗАВИСИМОСТЬ СОХРАНЕНА', 0, 4, 44, { col: '#8affa0', font: 'Osw' }); pop(); } ctx.restore(); }); }
  function extras2(t) {                                             // связист с катушкой, лыжи у ели, собака-упряжка
    push(1120, 1500, 0.8); human(0, 0, 1, t, { body: '#e8ecf4', hat: 'fur', hatCol: '#f4f4f0', legs: '#c8ccd8', armR: 'hold', flip: -1, seed: 12145, face: 'calm' }); ell(60, -140, 40, 40, { wash: '#4a3a2a', washA: 1, w: 2, col: L }); pencil([[60, -140], [300, -40]], { w: 2, col: '#2a2a2a', pass2: false }); pop();
    for (let i = 0; i < 3; i++) pencil([[180 + i * 20, 1560], [200 + i * 20, 1360]], { w: 6, col: '#8a6a4a', pass2: false });
    for (let i = 0; i < 6; i++) { const x = ((t * 50 + i * 260) % 1700) - 200, y = 560 + (i % 3) * 40 + Math.sin(t * 2 + i) * 14; push(x, y, 1); pencil([[-22, Math.sin(t * 8 + i) * 8], [0, 0], [22, Math.sin(t * 8 + i) * 8]], { w: 4, col: '#1a1a1e', pass2: false }); pop(); }
    for (let i = 0; i < 4; i++) { push(-120 + i * 90, 1880 + (i % 2) * 20, 1); blob([[-40, 0], [-20, -24], [30, -20], [44, 0]], { wash: '#ffffff', washA: 0.95, w: 1.2, col: '#a8b4c4' }); pop(); }
  }
  WORLD.winter = (t, u, cat) => {
    lay(40, () => sky(t)); lay(15, () => far(t)); lay(3.2, () => camp(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => ground(t)); lay(0.62, () => front(t));
    lay(2, () => motes(40, [-100, 500, 1200, 1900], '#ffffff', t, 12150, { sp: 5, vx: -1.5, sz: 3, a: 0.8, wob: 8 }));
    map(t); lay(1, () => cat());
  };
  DIR.winter = {
    outfit: 'tulup', light: { side: 1, rim: '#ffb070' }, grade: ['#081428', 0.08],
    act: () => [[S0.winter, 'cold'], [EV.wn_war, 'scared'], [EV.wn_kar, 'annoyed'], [EV.wn_keep, 'proud']],
    pose: (t, u, b) => { const mp = t > EV.wn_map; return Object.assign(b, { x: mp ? 190 : 420, y: mp ? 1840 : 1740, s: mp ? 0.78 : 0.95, look: mp ? [0.6, -0.6] : [0.6, 0], hand: mp ? [150, -320] : [210, -230], handF: mp ? undefined : [180, -220], point: mp, frost: 0.8, chatter: !mp }); },
    hud: t => counter(t),
    cam: () => [[S0.winter, 620, 1000, -0.06], [EV.wn_war, 600, 1020, -0.02], [EV.wn_map - 0.01, 600, 1000, 0], [EV.wn_map, 540, 960, 0], [S1.winter, 540, 960, 0]]
  };
  TRANS_IN.winter = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI), r = rng(12160); for (let i = 0; i < 26; i++) ell(r() * W, r() * H, (160 + r() * 200) * (0.6 + a), (100 + r() * 120) * (0.6 + a), { wash: '#ffffff', washA: 0.95 * a, line: false }); }); } };
})();
