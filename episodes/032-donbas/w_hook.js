/* 032 — сцена `hook`. 0–1,25 с: глобус по смыслу — Европа, подсвечена Украина, «?» над Донбассом, пин «ДОНБАСС?», резкий наезд точно
   в Донецкую и Луганскую области (Донецк, Луганск, Мариуполь, Азов, граница) → облачная вспышка → степь у шахтёрского посёлка.
   С 0 с — карточка-комментарий зрителя «А Донбасс чей? Отмотай!» (хук-приём «чужой вопрос»).
   Предзакатное солнце слева (главный свет), тёплые длинные тени. Терриконы, копёр с крутящимися колёсами, пятиэтажки, остановка,
   поле подсолнухов, шахтёры со сменой, бабушка с семечками, дети на велосипеде, собака. Том входит шагом; на «отмотал» — часы в лапе,
   на «хозяев» на доске выскакивают 9 латунных жетонов с «?» (сквозная нить). На «Отматываем» Том надевает каску. Планы — window.HQ. */
(() => {
  const G1 = 1.25;
  EV.hk_zoom = 0.38; EV.hk_land = G1;
  EV.hk_watch = wtk('h1', 'отмотал');
  EV.hk_300 = wtk('h1', 'триста');
  EV.hk_owners = wtk('h1', 'хозяев.') - 0.5;
  EV.hk_go = wtk('h2', 'Отматываем');
  KEYW.push('Донбасс?', 'хозяев.');
  const L = DB.ink, SUN = [150, 560];
  function sky(t) { vgrad(-900, 1060, ['#3a5a9a', '#7aa8d8', '#f0c890', '#f8a860'], 1); glow(SUN[0], SUN[1], 260, 'rgba(255,220,150,1)', 0.5); ell(SUN[0], SUN[1], 64, 64, { wash: '#fff4d0', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const r = rng(8400 + i), y = 300 + i * 80, dx = (t * 8) % 200; blob([[-200 + r() * 300 + dx, y], [300 + dx, y - 22], [800 + dx, y - 4], [1300, y + 14], [300, y + 20]], { wash: '#fff0d8', washA: 0.5, line: false }); }
    for (let i = 0; i < 5; i++) { const x = 500 + i * 120 + Math.sin(t * 1.1 + i) * 30, y = 560 + (i % 2) * 40; pencil([[x - 14, y - Math.sin(t * 9 + i) * 7], [x, y], [x + 14, y - Math.sin(t * 9 + i) * 7]], { w: 3, col: '#3a3a42', pass2: false }); } }
  function far(t) { terricon(820, 1010, 620, 330, t, { seed: 8410, col: '#5a4e52' }); terricon(300, 1010, 460, 240, t, { seed: 8411, col: '#6a5e5a' }); terricon(1180, 1010, 380, 200, t, { seed: 8412, col: '#4e4648', smoke: 1 });
    hills(1010, 30, '#a8a060', 2.1); for (let i = 0; i < 6; i++) pencil([[i * 200 - 100, 980], [i * 200 - 60, 940], [i * 200 - 20, 980]], { w: 2, col: '#5a5a3a', a: 0.4, pass2: false }); depthFog('#f8d8b0', 0.08); }
  function town(t) {                                                // посёлок: копёр, пятиэтажки, остановка, люди, автобус
    headframe(980, 1180, 0.95, t, { spin: 1.6, lit: 1 }); for (let i = 0; i < 3; i++) khrush(-380 + i * 270, 1200, 240, 300, [DB.panel, '#d8c8a8', '#c8b8a8'][i], t, { seed: 8420 + i, lit: 0.25 });
    push(620, 1250, 0.7); rect(-150, -220, 300, 18, { wash: '#4a6a8a', washA: 1, w: 2, col: L }); for (const k of [-130, 130]) pencil([[k, -202], [k, 0]], { w: 6, col: '#3a3a40', pass2: false }); rect(-130, -200, 260, 120, { wash: '#a8c8d8', washA: 0.4, w: 1.4, col: L }); txt('ОСТАНОВКА', 0, -238, 22, { col: '#f0e8d8', font: 'Osw' }); pop();
    const P = [[-280, '#3a4a6a', 'cap', 'hold', '#e8c030'], [-170, '#3a4a6a', 'cap', 'swing', '#e8c030'], [-40, '#7a3a3a', 'scarf', 'hold', '#c8a0d0'], [520, '#5a6a3a', 'cap', 'hold', '#2a2a30'], [700, '#a8584a', 'scarf', 'wave', '#f0e0a0'], [820, '#2a3a5a', null, 'hold', '#2a2a30'], [1150, '#4a4a52', 'cap', 'swing', '#3a3a40']];
    P.forEach(([x, c, h, a, hc], i) => human(x, 1270, 0.6, t, { body: c, skin: ['#e2b48e', '#d8a47e', '#c88a5a'][i % 3], hat: h, hatCol: hc, legs: '#2a2a36', armR: a, long: h === 'scarf' ? 1 : undefined, flip: x > 600 ? -1 : 1, seed: 8430 + i, face: t > EV.hk_owners ? 'shock' : 'smile' }));
    push(260, 1280, 0.6); human(0, 0, 1, t, { body: '#5a3a5a', hat: 'scarf', hatCol: '#e8a03a', legs: '#3a2a3a', long: 1, armR: 'hold', seed: 8440, face: 'smile' }); rect(40, -110, 70, 70, { wash: '#6a7a8a', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 8; q++) ell(50 + (q % 4) * 16, -116, 6, 4, { wash: '#2a2420', washA: 1, line: false }); pop();
    const bx = 380 + ((t * 40) % 200); push(bx, 1270, 0.6); ell(-40, -30, 30, 30, { wash: false, w: 4, col: '#2a2a30' }); ell(50, -30, 30, 30, { wash: false, w: 4, col: '#2a2a30' }); pencil([[-40, -30], [0, -70], [50, -30]], { w: 4, col: DB.red, pass2: false }); human(0, -40, 0.7, t, { body: '#f0c040', legs: '#3a4a8a', armR: 'hold', seed: 8441, face: 'grin' }); pop();
  }
  function ground(t) {                                              // степная обочина, грунтовка, подсолнухи, камни, ящик, собака
    rect(-500, 1300, 2200, 1000, { wash: '#b8a060', washA: 1, w: 2, col: L, shade: { gap: 12, a: 0.12, col: '#6a5a2a', ang: 0.2 } });
    poly([[-500, 1500], [1600, 1420], [1600, 1520], [-500, 1640]], { wash: '#a88a5a', washA: 1, w: 1.6, col: L }); const r = rng(8450); for (let i = 0; i < 50; i++) ell(r() * 2000 - 400, 1320 + r() * 560, 6 + r() * 14, 3 + r() * 6, { wash: i % 2 ? '#8a7a4a' : '#c8b078', washA: 1, w: 1, col: L, a: 0.4 });
    feather(-400, 1500, 1330, 70, t, 8451, '#e8dcb0', 50);
    for (let i = 0; i < 9; i++) sunflower(760 + (i % 5) * 80 + (i > 4 ? 40 : 0), 1700 + (i > 4 ? 120 : 0), 220 + (i % 3) * 30, t, i);
    lightPool(SUN[0] + 300, 1660, 900, 170, 'rgba(255,210,140,1)', 0.35);
    push(-40, 1760, 1); rect(-70, -60, 140, 60, { wash: '#7a5a32', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.2, col: '#3a2a10', ang: 1.4 } }); for (let q = 0; q < 6; q++) ell(-50 + q * 20, -66, 14, 9, { wash: '#1a1a20', washA: 1, w: 1, col: '#000' }); pop();
    push(620, 1800, 0.9); blob([[-60, -10], [-56, -50], [20, -56], [56, -40], [60, -10]], { wash: '#a87a4a', washA: 1, w: 2, col: L }); ell(66, -60, 22, 18, { wash: '#a87a4a', washA: 1, w: 1.6, col: L }); pencil([[-60, -40], [-90, -60 + Math.sin(t * 8) * 10]], { w: 6, col: '#a87a4a', pass2: false }); for (const lx of [-40, -20, 30, 46]) pencil([[lx, -14], [lx, 14]], { w: 6, col: '#8a5a30', pass2: false }); pop();
    for (let i = 0; i < 4; i++) ell(180 + i * 120, 1880 + (i % 2) * 20, 30, 12, { wash: '#8a8478', washA: 1, w: 1.4, col: L });
    castShadow(340, 1660, 120, 600, 0.9, 0.35); moodDark(900, 900, 1300, 1900, '#2a1a10', 0.2);
  }
  function front(t) { for (const x of [-140, 1230]) sil([[x - 80, 2300], [x - 50, 1560], [x + 50, 1540], [x + 80, 2300]], '#2a1a10', 1); for (let i = 0; i < 3; i++) sunflower(1060 + i * 70, 2000, 420, t, 9 + i); }
  function board(t) {                                               // табельная доска: 9 крючков, жетоны выскакивают с «?»
    if (t < EV.hk_owners) return; push(760, 900, popK(t, EV.hk_owners, 0.3), 0.03); rect(-230, -170, 460, 340, { wash: '#6a4a2a', washA: 1, w: 3, col: L, shade: { gap: 9, a: 0.2, col: '#2a1a08', ang: 0.2 } });
    txt('ХОЗЯЕВА ДОНБАССА', 0, -138, 30, { col: '#f8e8c0', font: 'Osw' });
    for (let i = 0; i < 9; i++) { const x = -150 + (i % 3) * 150, y = -60 + Math.floor(i / 3) * 96, k = popK(t, EV.hk_owners + i * 0.07, 0.25); pencil([[x, y - 40], [x, y - 28]], { w: 3, col: '#c8c8d0', pass2: false }); if (k > 0) { push(x, y, k * 0.6); token(0, 0, 1, '?', t); pop(); } } pop();
  }
  window.HQ = { sky, far, town, ground, front };
  WORLD.hook = (t, u, cat) => {
    if (t < G1) { lay(1, () => GLOBE.intro(t, Object.assign({ t1: G1 }, DB_GLOBE))); return; }
    lay(40, () => sky(t)); lay(12, () => far(t)); lay(3.2, () => { town(t); depthFog('#f8e0c0', 0.04); }); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(16, [-100, 700, 1200, 1500], '#fff0c8', t, 8460, { sp: 3, sz: 2.4, a: 0.4, wob: 16, add: 1 }));
    GLOBE.burst(t, G1);
  };
  DIR.hook = {
    outfit: 'hoodieDON', light: { side: -1, rim: '#ffd8a0' }, grade: ['#3a2010', 0.06],
    act: () => [[0, 'awe'], [EV.hk_land, 'suspicious'], [EV.hk_watch, 'smug'], [EV.hk_300, 'awe'], [EV.hk_owners, 'sideeye'], [EV.hk_go, 'grin']],
    pose: (t, u, b) => { const w1 = clamp((t - G1) / 0.7), x = lerp(-40, 330, sm(w1)); return Object.assign(b, { x, y: 1650, s: 1.0, walk: w1 < 1 ? t * 9 : 0, look: t > EV.hk_owners ? [0.8, -0.5] : [0.3, -0.3],
      hand: t > EV.hk_watch && t < EV.hk_owners ? [160, -380] : [150, -300], watchInHand: t > EV.hk_watch && t < EV.hk_owners + 0.3, spin: t > EV.hk_300 ? (t - EV.hk_300) * 6 : 0, tailUp: t > EV.hk_owners }); },
    hud: t => {
      if (t < EV.hk_owners) { const k = popK(t, 0.15, 0.3), m = sm(clamp((t - G1) / 0.4)); push(lerp(540, 640, m), lerp(1340, 760, m), k * lerp(1, 0.62, m), -0.02); ctx.save(); ctx.fillStyle = 'rgba(250,246,238,0.96)'; ctx.fillRect(-360, -80, 720, 160); ctx.restore(); pencil([[-360, -80], [360, -80], [360, 80], [-360, 80], [-360, -80]], { w: 3, col: L, pass2: false });
        poly([[-260, 80], [-220, 80], [-280, 130]], { wash: '#faf6ee', washA: 1, w: 3, col: L }); ell(-290, -16, 44, 44, { wash: '#8a9ab8', washA: 1, w: 2, col: L }); ell(-290, -30, 16, 16, { wash: '#e8ecf4', washA: 1, line: false }); ell(-290, 10, 26, 16, { wash: '#e8ecf4', washA: 1, line: false });
        txt('комментарий зрителя', 40, -46, 26, { col: '#7a7a82', font: 'Osw' }); txt('А Донбасс чей? Отмотай!', 40, 12, 50, { col: L, font: 'Osw' }); pop(); }
      board(t); },
    cam: () => [[0, 540, 960, 0], [G1, 540, 960, 0], [G1 + 0.01, 620, 920, -0.1], [G1 + 0.7, 560, 980, -0.04], [EV.hk_watch, 520, 1060, 0.06, 'x'], [EV.hk_300, 500, 1080, 0.1], [EV.hk_owners, 600, 980, 0.02, 'x'], [EV.hk_go, 440, 1180, 0.12], [S1.hook, 420, 1230, 0.2]]
  };
  TRANS_IN.tunnel = { a: 0.12, b: 0.35, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.translate(0, e * 1900); ctx.drawImage(A, 0, 0); ctx.restore(); ctx.save(); ctx.globalAlpha = 0.6 * (1 - Math.abs(e - 0.5) * 2); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, e * 1900); ctx.restore(); }); } };
})();
