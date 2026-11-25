/* 034 — сцена `grunwald`, 15.07.1410. Поле у Грюнвальда, жаркий полдень, пыль: литовская конница с красными стягами «Погони»,
   польские стяги с белым орлом, тевтонские рыцари в белых плащах и горшковых шлемах (без крестов и без крови), обоз, шатры, лес.
   Главный свет — солнце сверху-справа, пыль в лучах. На «Витовт» — Витовт на коне поднимает булаву; на «разгромил» — белое знамя
   ордена падает, рыцари отступают в пыли, тряска; Том (кольчуга) вскидывает стяг «Погони». Плашка «15.07.1410 · ГРЮНВАЛЬД». */
(() => {
  const L = LTC.ink, SUN = [900, 460];
  EV.gr_vit = wtk('s2', 'Витовт'); EV.gr_win = wtk('s2', 'разгромил'); EV.gr_name = wtk('s2', 'Грюнвальде.');
  KEYW.push('разгромил', 'Грюнвальде.');
  const W8 = t => sm(clamp((t - EV.gr_win) / 0.9));
  function pagonia(x, y, s, t) { push(x, y, s); const wv = q => Math.sin(t * 5 + q * 0.05) * 8; const pts = []; for (let q = 0; q <= 160; q += 20) pts.push([q, wv(q)]); for (let q = 160; q >= 0; q -= 20) pts.push([q, 110 + wv(q)]); poly(pts, { wash: LTC.red, washA: 1, w: 2, col: L });
    push(80, 55, 0.5); blob([[-60, 20], [-50, -10], [30, -14], [56, 0], [50, 20]], { wash: '#f4efe4', washA: 1, w: 1.6, col: L }); ell(40, -40, 16, 22, { wash: '#f4efe4', washA: 1, w: 1.4, col: L }); pencil([[44, -60], [90, -90]], { w: 4, col: '#f4efe4', pass2: false }); pop(); pop(); }
  function eagle(x, y, s, t) { push(x, y, s); const pts = []; for (let q = 0; q <= 160; q += 20) pts.push([q, Math.sin(t * 5 + q * 0.05) * 8]); for (let q = 160; q >= 0; q -= 20) pts.push([q, 110 + Math.sin(t * 5 + q * 0.05) * 8]); poly(pts, { wash: LTC.red, washA: 1, w: 2, col: L });
    poly([[80, 20], [50, 50], [70, 60], [80, 90], [90, 60], [110, 50]], { wash: '#f4efe4', washA: 1, w: 1.4, col: L }); pop(); }
  function knight(x, y, s, t, o) { human(x, y, s, t, { body: o.body, bodyD: o.bodyD, hat: 'helmet', legs: '#6a6a70', armR: o.arm || 'hold', prop: o.prop || 'spear', flip: o.flip, seed: o.seed, face: o.face || 'angry', long: 1 }); }
  function sky(t) { vgrad(-900, 1100, ['#4a8ad0', '#a8cce8', '#f0e4c0'], 1); glow(SUN[0], SUN[1], 200, 'rgba(255,240,190,1)', 0.4); ell(SUN[0], SUN[1], 46, 46, { wash: '#fffbe0', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const y = 280 + i * 80, dx = (t * 8) % 200; blob([[-200 + dx, y], [300 + dx, y - 22], [900 + dx, y - 6], [1300, y + 12], [400, y + 18]], { wash: '#ffffff', washA: 0.5, line: false }); } }
  function far(t) { hills(1020, 26, '#5a7a4a', 5.3); for (let i = 0; i < 14; i++) { const r = rng(7400 + i); oak(-200 + i * 110 + r() * 40, 1030, 120 + r() * 50, t, 40 + i, { col: '#3a5a2a', colL: '#5a7a3a' }); }
    for (let i = 0; i < 4; i++) { push(-60 + i * 140, 1030, 0.6); poly([[-60, 0], [0, -110], [60, 0]], { wash: ['#f4efe4', '#c8281e', '#e8c040', '#f4efe4'][i], washA: 1, w: 2, col: L }); pencil([[0, -110], [0, -150]], { w: 3, col: '#4a3a2a', pass2: false }); pop(); } depthFog('#f0e4c8', 0.08); }
  function battle(t) {                                              // конница, пехота, стяги; орден отступает
    const w = W8(t), push_ = w * 260;
    for (let i = 0; i < 6; i++) { const r = rng(7410 + i), x = 140 + i * 90; horse(x, 1260 + (i % 2) * 20, 0.6, t, { col: ['#6a3a22', '#3a2a1a', '#8a6a4a'][i % 3], walk: 1, seed: i }); human(x - 6, 1260 - 58, 0.5, t, { body: i % 2 ? '#7a2a2a' : '#5a5a62', hat: 'helmet', legs: '#3a2a1a', armR: 'wave', prop: 'spear', seed: 7420 + i, face: 'angry' }); }
    pagonia(180, 980, 0.9, t); pagonia(420, 960, 0.8, t); eagle(560, 1000, 0.8, t);
    push(240, 1270, 1); horse(0, 0, 0.75, t, { col: '#f0ece2', seed: 9 }); human(-8, -72, 0.62, t, { body: '#a8281e', bodyD: '#5a0a08', hat: 'crown', hatCol: LTC.gold, legs: '#3a2a4a', armR: t > EV.gr_vit ? 'wave' : 'hold', prop: 'axe', seed: 7430, face: 'grin' }); pop();
    for (let i = 0; i < 6; i++) knight(820 + i * 80 + push_, 1270 + (i % 2) * 16, 0.62, t, { body: '#f2f0ea', bodyD: '#a8a8a0', flip: w > 0.3 ? 1 : -1, seed: 7440 + i, face: w > 0.3 ? 'shock' : 'angry' });
    push(980 + push_, 1250, 1, w * 1.3); pencil([[0, 0], [0, -320]], { w: 6, col: '#4a3a2a', pass2: false }); rect(0, -320, 150, 100, { wash: '#f2f0ea', washA: 1, w: 2, col: L }); pop();
    if (w > 0 && w < 1) for (let i = 0; i < 10; i++) { const r = rng(hsh(FRAME, i)); ell(800 + r() * 600, 1220 - r() * 140, 60 + r() * 60, 30 + r() * 20, { wash: '#d8c8a0', washA: 0.5 * (1 - w), line: false }); }
  }
  function ground(t) {                                              // поле: вытоптанная рожь, щиты, сломанные копья, шлем, бочка
    rect(-500, 1320, 2200, 1000, { wash: '#b8a868', washA: 1, w: 2, col: L, shade: { gap: 12, a: 0.12, col: '#6a5a2a', ang: 0.3 } }); const r = rng(7450);
    for (let i = 0; i < 80; i++) { const x = r() * 1900 - 400, y = 1340 + r() * 700, h = 18 + r() * 30; pencil([[x, y], [x + (r() - 0.5) * 20, y - h]], { w: 2.4, col: i % 3 ? '#a89040' : '#d8c070', pass2: false }); if (i % 4 === 0) ell(x, y - h, 4, 8, { wash: '#e8d080', washA: 1, line: false }); }
    for (let i = 0; i < 4; i++) { push(760 + i * 120, 1680 + (i % 2) * 60, 1, (i - 1.5) * 0.4); blob([[-40, -60], [40, -60], [36, 10], [0, 50], [-36, 10]], { wash: i % 2 ? '#f2f0ea' : '#8a5a32', washA: 1, w: 2, col: L }); pop(); }
    for (let i = 0; i < 4; i++) pencil([[-100 + i * 260, 1820 + i * 10], [60 + i * 260, 1760 - i * 6]], { w: 7, col: '#6a4a2a', pass2: false });
    push(1100, 1860, 1); ell(0, -30, 40, 32, { wash: '#9a9aa0', washA: 1, w: 2, col: L }); rect(-26, -40, 52, 8, { wash: '#2a2a2e', washA: 1, line: false }); pop();
    push(-60, 1700, 1); rect(-50, -90, 100, 90, { wash: '#8a5a32', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.25, col: '#3a2010', ang: 0 } }); for (const y of [-70, -20]) pencil([[-52, y], [52, y]], { w: 4, col: '#3a3a3a', pass2: false }); pop();
    lightPool(700, 1620, 1000, 200, 'rgba(255,240,190,1)', 0.3); castShadow(400, 1700, 110, 380, -2.4, 0.3); moodDark(100, 1000, 900, 1900, '#2a2010', 0.14);
  }
  function front(t) { for (const x of [-150, 1240]) { pencil([[x, 2300], [x + (x < 0 ? 80 : -80), 600]], { w: 10, col: '#4a3a2a', pass2: false }); push(x + (x < 0 ? 80 : -80), 640, 1.4); pagonia(-80, 0, 1, t); pop(); } }
  function extras(t) {                                              // лагерь: котёл на огне, повар, барабанщик, трубач, обозные телеги, бочки
    push(-60, 1500, 0.9); for (const k of [-50, 50]) pencil([[k, 0], [0, -120]], { w: 5, col: '#4a3a2a', pass2: false }); ell(0, -80, 50, 34, { wash: '#2a2a2e', washA: 1, w: 2, col: LTC.ink }); for (let i = 0; i < 3; i++) { const k = (t * 0.6 + i / 3) % 1; ell(Math.sin(i + t) * 20, -130 - k * 160, 20 + k * 40, 14 + k * 24, { wash: '#e8e4dc', washA: 0.4 * (1 - k), line: false }); }
    for (let i = 0; i < 4; i++) { const ph = (t * 2 + i / 4) % 1; blob([[-30 + i * 18, -40], [-24 + i * 18, -70 - ph * 30], [-16 + i * 18, -40]], { wash: i % 2 ? '#ff8a2a' : '#ffd060', washA: 1 - ph, line: false }); } human(90, 0, 0.9, t, { body: '#8a6a4a', hat: 'scarf', hatCol: '#e8e0d0', legs: '#3a2a1a', armR: 'hold', prop: 'stick', seed: 7480, face: 'smile' }); pop();
    push(1120, 1520, 0.9); human(0, 0, 1, t, { body: '#a8281e', hat: 'helmet', legs: '#3a2a1a', armR: 'wave', flip: -1, seed: 7481, face: 'grin' }); ell(-40, -170, 34, 26, { wash: '#c8a040', washA: 1, w: 2, col: LTC.ink }); pencil([[-60, -200], [-90, -250 + Math.sin(t * 12) * 20]], { w: 3, col: '#4a3a2a', pass2: false }); pop();
    push(1240, 1460, 0.8); human(0, 0, 1, t, { body: '#3a5a8a', hat: 'fur', hatCol: '#4a3020', legs: '#3a2a1a', armR: 'wave', flip: -1, seed: 7482, face: 'grin' }); poly([[-20, -330], [-120, -360], [-120, -300]], { wash: LTC.gold, washA: 1, w: 2, col: LTC.ink }); pop();
    for (let i = 0; i < 2; i++) { push(60 + i * 220, 1420, 0.7); rect(-100, -80, 200, 60, { wash: '#7a5a32', washA: 1, w: 2, col: LTC.ink }); poly([[-100, -80], [0, -170], [100, -80]], { wash: '#e8dcc0', washA: 1, w: 2, col: LTC.ink }); for (const k of [-70, 70]) ell(k, -14, 28, 28, { wash: false, w: 5, col: '#3a2a1a' }); pop(); }
  }
  WORLD.grunwald = (t, u, cat) => {
    lay(40, () => sky(t)); lay(15, () => far(t)); lay(3.0, () => battle(t)); lay(1.6, () => extras(t)); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(2.2, () => { rays(SUN[0], SUN[1], 2.2, 0.4, 1400, 'rgba(255,240,200,1)', 0.12, 5, t); motes(20, [-100, 800, 1200, 1700], '#f0e0b0', t, 7460, { sp: 2, vx: 2, sz: 3, a: 0.45, wob: 14 }); });
  };
  DIR.grunwald = {
    outfit: 'kolchuga', light: { side: 1, rim: '#fff0c0' }, grade: ['#3a2a10', 0.05],
    act: () => [[S0.grunwald, 'proud'], [EV.gr_vit, 'grin'], [EV.gr_win, 'laugh'], [EV.gr_name, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 380, y: 1700, s: 0.95, look: [0.7, -0.5], hand: t > EV.gr_win ? [140, -470] : [150, -320], squash: t > EV.gr_win && t < EV.gr_win + 0.25 ? 0.06 : b.squash }),
    afterCat: (t, u, P) => { const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; pencil([[x, y + 120], [x, y - 260]], { w: 6, col: '#4a3a2a', pass2: false }); pagonia(x, y - 260, 0.9, t); },
    hud: t => ltBoard(640, 980, 0.85, t, EV.gr_name - 0.2, [['15.07.1410', 52, LTC.amberL], ['ГРЮНВАЛЬД', 56]], { w: 420 }),
    cam: () => [[S0.grunwald, 600, 1000, -0.1], [EV.gr_vit, 520, 980, -0.06], [EV.gr_win, 720, 980, -0.02, 'x'], [S1.grunwald, 640, 1000, 0]]
  };
  SHAKES.push([EV.gr_win, 0.3, 10]);
  TRANS_IN.grunwald = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(e < 0.5 ? A : B, 1 + Math.sin(e * Math.PI) * 0.1); scr(() => { const a = Math.sin(e * Math.PI); for (let i = 0; i < 14; i++) { const r = rng(7470 + i); ell(r() * W, r() * H, 260, 160, { wash: '#d8c8a0', washA: 0.9 * a, line: false }); } }); } };
})();
