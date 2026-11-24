/* 033 — сцена `today`, 2026, город Чернобыль: тихая улица, старые хаты с наличниками и яблонями в цвету, магазин «ПРОДУКТЫ»,
   водонапорная башня, вахтовики с сумками идут со смены, бабушка-самосёл с козой и курами, на лугу — лошади Пржевальского.
   Главный свет — тёплое весеннее солнце справа (как в хуке — петля), длинные тени влево.
   На «назвали» — плашка-ответ (QUESTION) и доска-карта района: зона 30 км, точка «ЧЕРНОБЫЛЬ · райцентр», знак «АЭС»; табличка
   «ЧЕРНОБЫЛЬСКАЯ» перелетает от города к станции. На «беде» Том кладёт веточку полыни к стеле «ЧОРНОБИЛЬ». */
(() => {
  const L = CH.ink, SUN = [960, 560];
  EV.answer = wtk('t1', 'назвали'); EV.td_name = wtk('t1', 'райцентру') + 0.1; EV.td_grief = wtk('t1', 'беде.') - 0.2;
  KEYW.push('«Чернобыль»?', 'райцентру');
  function sky(t) { vgrad(-900, 1100, ['#5a90d0', '#a8cce8', '#f4ecd0', '#f8d8a8'], 1); glow(SUN[0], SUN[1], 230, 'rgba(255,232,180,1)', 0.42); ell(SUN[0], SUN[1], 52, 52, { wash: '#fff8e0', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const y = 280 + i * 80, dx = (t * 9 + i * 60) % 220; blob([[-200 + dx, y], [300 + dx, y - 22], [900 + dx, y - 4], [1300, y + 12], [400, y + 18]], { wash: '#fffaf0', washA: 0.5, line: false }); }
    for (let i = 0; i < 4; i++) { const x = 160 + i * 120 + Math.sin(t * 1.1 + i) * 30, y = 500 + (i % 2) * 30; pencil([[x - 12, y - Math.sin(t * 9 + i) * 6], [x, y], [x + 12, y - Math.sin(t * 9 + i) * 6]], { w: 3, col: '#3a3a42', pass2: false }); } }
  function far(t) { hills(1030, 22, '#6a8a5a', 4.4); for (let i = 0; i < 14; i++) { const r = rng(6010 + i); (i % 3 ? polPine : birch)(-200 + i * 110 + r() * 40, 1040, 170 + r() * 80, t, 200 + i, { col: '#4a6a3a', colD: '#2e4a2a' }); }
    push(1060, 1040, 0.8); pencil([[-40, 0], [-20, -360]], { w: 6, col: '#5a5a62', pass2: false }); pencil([[40, 0], [20, -360]], { w: 6, col: '#5a5a62', pass2: false }); ell(0, -400, 80, 50, { wash: '#a8b0b8', washA: 1, w: 2.4, col: L }); rect(-80, -420, 160, 30, { wash: '#8a96a0', washA: 1, w: 2, col: L }); pop();
    depthFog('#f4ecd8', 0.07); }
  function street(t) {                                               // хаты, яблони, магазин, вахтовики, бабушка с козой, лошади
    khata(-60, 1220, 260, 150, t, { wall: '#eae4d4', roof: '#6a8a9a', trim: '#2a7ab0', door: 1, smoke: 1 }); khata(860, 1220, 240, 140, t, { wall: '#f2ead8', roof: '#8a6a5a', trim: '#2a8a5a', lit: 0 });
    push(380, 1230, 0.95); rect(-140, -200, 280, 200, { wash: '#e8e0c8', washA: 1, w: 2.2, col: L, shade: { gap: 11, a: 0.08, col: '#6a5a4a', ang: 1.3 } }); poly([[-160, -200], [0, -250], [160, -200]], { wash: '#5a6a7a', washA: 1, w: 2, col: L });
    rect(-110, -190, 220, 40, { wash: '#2a6aa8', washA: 1, w: 1.6, col: L }); txt('ПРОДУКТЫ', 0, -170, 28, { col: '#fff6e0', font: 'Osw' }); rect(-110, -140, 90, 90, { wash: '#ffe8b0', washA: 1, w: 1.4, col: L }); rect(30, -140, 70, 140, { wash: '#6a4a2a', washA: 1, w: 1.6, col: L }); pop();
    for (let i = 0; i < 3; i++) { const x = 180 + i * 500; pencil([[x, 1240], [x, 1110]], { w: 10, col: '#6a4a2a', pass2: false }); const r = rng(6020 + i); for (let q = 0; q < 7; q++) ell(x + (r() - 0.5) * 150, 1070 + (r() - 0.5) * 70, 44, 30, { wash: q % 2 ? '#f8e0ea' : '#ffffff', washA: 1, w: 1.2, col: '#a8848a' }); }
    for (let i = 0; i < 3; i++) human(560 + i * 80, 1300, 0.62, t, { body: ['#3a5a3a', '#2a4a6a', '#4a4a3a'][i], hat: 'cap', hatCol: '#2a3a2a', legs: '#2a2a30', armR: 'hold', flip: -1, seed: 6030 + i, face: 'smile' });
    for (let i = 0; i < 3; i++) { push(560 + i * 80 - 40, 1300, 0.62); rect(-30, -90, 60, 60, { wash: '#3a3a40', washA: 1, w: 1.4, col: L }); pop(); }
    human(1120, 1310, 0.66, t, { body: '#7a4a5a', hat: 'scarf', hatCol: '#e8c030', legs: '#3a2a3a', long: 1, armR: 'hold', prop: 'stick', flip: -1, seed: 6040, face: 'smile' });
    push(1020, 1320, 0.6); blob([[-50, -40], [-40, -80], [40, -84], [56, -50], [40, -36]], { wash: '#f0ece0', washA: 1, w: 2, col: L }); ell(66, -84, 18, 16, { wash: '#f0ece0', washA: 1, w: 1.6, col: L }); pencil([[60, -98], [50, -118]], { w: 3, col: '#5a4a3a', pass2: false }); for (const lx of [-34, -18, 26, 40]) pencil([[lx, -40], [lx, 0]], { w: 5, col: '#8a8478', pass2: false }); pop();
    for (let i = 0; i < 3; i++) { const hx = 1180 + i * 40 + Math.sin(t * 3 + i) * 6; push(hx, 1330, 0.4); blob([[-20, 0], [-16, -26], [14, -30], [24, -12], [10, 4]], { wash: i % 2 ? '#c8582a' : '#f0e0c0', washA: 1, w: 1.4, col: L }); ell(18, -30, 6, 6, { wash: '#c8281e', washA: 1, line: false }); pop(); }
  }
  function meadow(t) { rect(-500, 1100, 2200, 200, { wash: '#8ab050', washA: 1, w: 1.6, col: L }); for (let i = 0; i < 4; i++) horse(-120 + i * 180 + Math.sin(t * 0.4 + i) * 20, 1180 + (i % 2) * 20, 0.5, t, { seed: i * 2, walk: i === 1, flip: i % 2 ? -1 : 1 }); }
  function ground(t) {                                               // старая дорога, трава из трещин, лавка, ведро, ящики, стела «ЧОРНОБИЛЬ»
    rect(-500, 1360, 2200, 1000, { wash: '#7aa048', washA: 1, w: 2, col: L, shade: { gap: 13, a: 0.1, col: '#3a5a22', ang: 0.3 } });
    poly([[-500, 1480], [1600, 1420], [1600, 1640], [-500, 1740]], { wash: '#7a7672', washA: 1, w: 2, col: L }); const r = rng(6050);
    for (let i = 0; i < 18; i++) { const x = r() * 1900 - 400, y = 1460 + r() * 220; pencil([[x, y], [x + 30, y + 8], [x + 60, y - 2]], { w: 1.6, col: '#2a2a2e', a: 0.6, pass2: false }); pencil([[x + 30, y + 6], [x + 34, y - 18]], { w: 2.4, col: '#5a8a2a', pass2: false }); pencil([[x + 38, y + 6], [x + 46, y - 14]], { w: 2.4, col: '#5a8a2a', pass2: false }); }
    for (let i = 0; i < 70; i++) { const x = r() * 1900 - 400, y = 1720 + r() * 360, h = 14 + r() * 26, c = i % 3 ? '#3e6a22' : '#8ab040'; pencil([[x - 6, y], [x - 3, y - h]], { w: 2.4, col: c, pass2: false }); pencil([[x + 4, y], [x + 7, y - h * 1.1]], { w: 2.4, col: c, pass2: false }); if (i % 8 === 0) ell(x, y - h, 6, 6, { wash: '#f8d830', washA: 1, w: 1, col: L }); }
    push(700, 1560, 1); rect(-130, -60, 260, 20, { wash: '#8a5a32', washA: 1, w: 2, col: L }); for (const k of [-110, 110]) pencil([[k, -40], [k, 0]], { w: 8, col: '#5a3a1e', pass2: false }); rect(-60, -100, 50, 40, { wash: '#7a8a96', washA: 1, w: 1.6, col: L }); pop();
    for (let i = 0; i < 2; i++) { push(1060 + i * 90, 1700 + i * 30, 1); rect(-40, -60, 80, 60, { wash: '#a87a4a', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.25, col: '#5a3a1a', ang: 0.7 } }); for (let q = 0; q < 3; q++) ell(-20 + q * 20, -64, 12, 10, { wash: '#c8281e', washA: 1, w: 1, col: L }); pop(); }
    horse(990, 1640, 0.62, t, { seed: 1, flip: -1 }); horse(1160, 1700, 0.66, t, { seed: 4, walk: 1, flip: -1, col: '#b88a4a' });
    roadSign(140, 1500, 0.95, t, 'zone'); if (t > EV.td_grief + 0.3) mugwort(140, 1506, 0.5, t, 300);
    lightPool(620, 1620, 900, 180, 'rgba(255,226,170,1)', 0.3); castShadow(420, 1700, 110, 600, -2.6, 0.32); castShadow(900, 1560, 130, 300, -2.6, 0.25); moodDark(160, 1000, 900, 1900, '#1a2a14', 0.14);
  }
  function front(t) { for (const x of [-150, 1240]) { pencil([[x, 2300], [x, 560]], { w: 26, col: '#4a3a2a', pass2: false }); const r = rng(6060 + x); for (let q = 0; q < 9; q++) ell(x + (r() - 0.5) * 320, 560 + (r() - 0.5) * 240, 80, 56, { wash: q % 2 ? '#f8e0ea' : '#ffffff', washA: 1, w: 1.4, col: '#a8848a' }); } for (let i = 0; i < 3; i++) mugwort(1160 + i * 40, 2000, 1.6, t, 320 + i); }
  function board(t) {                                                // доска-карта района: зона 30 км, райцентр, АЭС, перелёт имени
    if (t < EV.answer - 0.1) return; const k = popK(t, EV.answer - 0.1, 0.3); push(710, 1000, k * 0.78, -0.02); ctx.save(); ctx.fillStyle = 'rgba(232,240,210,0.97)'; ctx.fillRect(-300, -190, 600, 380); ctx.restore(); pencil([[-300, -190], [300, -190], [300, 190], [-300, 190], [-300, -190]], { w: 5, col: L, pass2: false, gap: false });
    txt('ЧЕРНОБЫЛЬСКИЙ РАЙОН · 1970', 0, -150, 32, { col: '#3a3a20', font: 'Osw' }); pencil([[-260, -120], [-120, -40], [-40, 40], [60, 120], [200, 170]], { w: 12, col: '#3a86b8', pass2: false }); pencil(ellPts(-120, -20, 190, 140, 0, 0, 60), { w: 4, col: CH.red, a: 0.8, pass2: false, gap: true }); txt('зона 30 км', -230, 140, 28, { col: CH.red, font: 'Hand' });
    const T = [60, 60], N = [-150, -40]; ell(T[0], T[1], 18, 18, { wash: CH.red, washA: 1, w: 2.4, col: L }); txt('ЧЕРНОБЫЛЬ', T[0] + 110, T[1] + 6, 32, { col: L, font: 'Osw' }); txt('райцентр', T[0] + 110, T[1] + 40, 26, { col: '#5a3a20', font: 'Hand' }); trefoil(N[0], N[1], 24, '#16120c', CH.dos, 1); txt('АЭС', N[0], N[1] + 50, 30, { col: L, font: 'Osw' });
    const f = sm(clamp((t - EV.td_name) / 0.8)), x = lerp(T[0] + 110, N[0], f), y = lerp(T[1] - 40, N[1] - 60, f) - Math.sin(f * Math.PI) * 80; if (t > EV.td_name - 0.2) { push(x, y, 1, -0.06 * (1 - f)); ctx.save(); ctx.fillStyle = '#16120c'; ctx.fillRect(-150, -26, 300, 52); ctx.restore(); txt('ЧЕРНОБЫЛЬСКАЯ', 0, 2, 34, { col: CH.dos, font: 'Osw' }); pop(); }
    pop();
  }
  window.TQ = { sky, far, street, ground, front, meadow };
  WORLD.today = (t, u, cat) => {
    lay(40, () => sky(t)); lay(15, () => far(t)); lay(6, () => meadow(t)); lay(3.2, () => { street(t); depthFog('#f8ecd0', 0.03); }); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(2.2, () => { petalsT(t); motes(14, [-100, 700, 1200, 1600], '#fff6c8', t, 6070, { sp: 2, sz: 2.4, a: 0.4, wob: 16, add: 1 }); });
  };
  function petalsT(t) { const r = rng(6080); for (let i = 0; i < 18; i++) { const x = ((r() * 1400 + t * 50) % 1500) - 200, y = ((r() * 1800 + t * (70 + r() * 50)) % 1900); ell(x + Math.sin(t * 3 + i) * 20, y, 6, 4, { wash: '#fff0f4', washA: 0.9, line: false, rot: t + i }); } }
  DIR.today = {
    outfit: 'hoodieCH', light: { side: 1, rim: '#ffe0a0' }, grade: ['#2a2010', 0.04],
    act: () => [[S0.today, 'suspicious'], [EV.answer, 'proud'], [EV.td_name, 'smug'], [EV.td_grief, 'neutral']],
    pose: (t, u, b) => { const lay_ = t > EV.td_grief && t < EV.td_grief + 0.6; return Object.assign(b, { x: lay_ ? 290 : 360, y: 1720, s: 0.95, look: t < EV.td_grief ? [0.6, -0.5] : [-0.6, 0.2], hand: lay_ ? [-160, -120] : [150, -300], point: t > EV.answer && t < EV.td_grief, squash: lay_ ? 0.05 : b.squash }); },
    afterCat: (t, u, P) => { if (t > EV.td_grief - 0.6 && t < EV.td_grief + 0.3) mugwort(P.x + P.hand[0] * P.s, P.y + P.hand[1] * P.s + 20, 0.4, t, 301); },
    hud: t => board(t),
    cam: () => [[S0.today, 600, 1000, -0.12], [EV.answer, 620, 980, -0.08], [EV.td_grief, 420, 1160, 0.06, 'x'], [S1.today, 420, 1180, 0.1]]
  };
  TRANS_IN.today = { a: 0.1, b: 0.35, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.drawImage(A, 0, 0); ctx.restore(); }); whiteOut(Math.sin(e * Math.PI) * 0.5, '255,240,210'); } };
})();
