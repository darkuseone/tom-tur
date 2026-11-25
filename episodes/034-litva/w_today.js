/* 034 — сцена `today`, 2026. Кафедральная площадь Вильнюса: белый собор с колоннами, отдельная колокольня, Гедиминова башня на холме,
   туристы, велосипедисты, дети, голуби, уличный музыкант, кофе-фургон. Главный свет — мягкое дневное солнце справа.
   На «Украину» — карта-ответ: пунктиром граница ВКЛ, украинские земли розовым «ПОЛЬША · 1569», остальное тёмно-зелёным «РОССИЯ · 1795»,
   в центре жёлтая «ЛИТВА СЕГОДНЯ»; на «Россия» — плашка-ответ (QUESTION). Том (худи) показывает на карту. */
(() => {
  const L = LTC.ink, SUN = [980, 520];
  EV.answer = wtk('t1', 'Украину'); EV.td_pl = wtk('t1', 'Польша,'); EV.td_ru = wtk('t1', 'Россия.');
  KEYW.push('Польша,', 'Россия.');
  function sky(t) { vgrad(-900, 1100, ['#4a8ad8', '#a8d0f0', '#f0ecd8'], 1); glow(SUN[0], SUN[1], 220, 'rgba(255,240,200,1)', 0.4); ell(SUN[0], SUN[1], 50, 50, { wash: '#fffbe8', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const y = 280 + i * 80, dx = (t * 10) % 220; blob([[-200 + dx, y], [300 + dx, y - 22], [900 + dx, y - 6], [1300, y + 12], [400, y + 18]], { wash: '#ffffff', washA: 0.55, line: false }); } }
  function far(t) { hills(1020, 40, '#5a8a4a', 10.3); gedTower(1060, 1020, 0.5, t, { flag: 1 }); for (let i = 0; i < 8; i++) { const r = rng(8100 + i); oak(-200 + i * 180 + r() * 40, 1030, 150 + r() * 50, t, 80 + i, { col: '#4a7a3a', colL: '#7aa858' }); } depthFog('#eef0e8', 0.07); }
  function square(t) {                                              // собор, колокольня, люди, фургон
    push(520, 1200, 1); rect(-300, -300, 600, 300, { wash: '#f4f0e6', washA: 1, w: 2.6, col: L, shade: { gap: 12, a: 0.06, col: '#8a8070', ang: 1.4 } }); poly([[-320, -300], [0, -420], [320, -300]], { wash: '#f4f0e6', washA: 1, w: 2.4, col: L });
    for (let i = 0; i < 6; i++) { const x = -250 + i * 100; rect(x - 18, -290, 36, 290, { wash: '#ffffff', washA: 1, w: 1.6, col: L, shade: { gap: 6, a: 0.12, col: '#8a8070', ang: 0 } }); }
    for (const d of [-1, 0, 1]) { push(d * 220, -420 + Math.abs(d) * 80, 0.5); human(0, 0, 1, t, { body: '#e8e4d8', legs: '#e8e4d8', long: 1, armR: 'wave', seed: 8110 + d, face: 'calm' }); pop(); }
    rect(-60, -200, 120, 200, { wash: '#5a4a3a', washA: 1, w: 2, col: L }); pop();
    push(980, 1200, 1); rect(-60, -520, 120, 520, { wash: '#f4f0e6', washA: 1, w: 2.4, col: L }); for (let i = 0; i < 4; i++) rect(-30, -480 + i * 110, 60, 70, { wash: '#4a5a6a', washA: 1, w: 1.4, col: L }); blob([[-60, -520], [0, -620], [60, -520]], { wash: '#5a8a8a', washA: 1, w: 2, col: L }); ell(0, -440, 30, 30, { wash: '#f8f4e8', washA: 1, w: 1.6, col: L }); pop();
    const P = [[80, '#e86a8a', 'hold', 'phone'], [180, '#3a6aa8', 'wave'], [640, '#e8b030', 'hold'], [760, '#2a8a5a', 'hold', 'phone'], [860, '#7a4a8a', 'swing'], [1140, '#c84a3a', 'hold']];
    P.forEach(([x, c, a, pr], i) => human(x, 1310, 0.68, t, { body: c, skin: ['#f0c8a0', '#e2b48e', '#f8d8b8'][i % 3], hat: i % 3 === 2 ? 'cap' : null, hatCol: '#2a3a5a', legs: '#2a2a36', armR: a, prop: pr, flip: x > 600 ? -1 : 1, seed: 8120 + i, face: 'smile' }));
    const bx = ((t * 80) % 1800) - 300; push(bx, 1320, 0.62); ell(-50, -30, 32, 32, { wash: false, w: 4, col: '#2a2a30' }); ell(50, -30, 32, 32, { wash: false, w: 4, col: '#2a2a30' }); pencil([[-50, -30], [0, -70], [50, -30]], { w: 4, col: LTC.grn, pass2: false }); human(0, -40, 0.7, t, { body: '#f2c02a', legs: '#3a4a8a', armR: 'hold', seed: 8130, face: 'grin' }); pop();
    push(320, 1320, 0.7); rect(-130, -170, 260, 140, { wash: '#e8e4d8', washA: 1, w: 2, col: L }); rect(-100, -140, 120, 60, { wash: '#6a4a2a', washA: 1, w: 1.4, col: L }); txt('KAVA', 60, -110, 30, { col: LTC.red, font: 'Osw' }); for (const k of [-80, 80]) ell(k, -26, 26, 26, { wash: '#1e1e22', washA: 1, w: 2, col: L }); pop();
  }
  function ground(t) {                                              // светлая плитка, голуби, скамья, клумба, футляр музыканта
    rect(-500, 1340, 2200, 1000, { wash: '#d8d0c0', washA: 1, w: 2, col: L }); for (let i = 0; i < 12; i++) for (let j = 0; j < 6; j++) rect(-400 + i * 170 + (j % 2) * 85, 1360 + j * 100, 170, 100, { wash: (i + j) % 3 ? '#e0d8c8' : '#c8c0b0', washA: 1, w: 1, col: '#8a8270', a: 0.5 });
    for (let i = 0; i < 6; i++) { const gx = 700 + i * 60 + Math.sin(t * 2 + i) * 14; push(gx, 1760 + (i % 2) * 30, 0.8); blob([[-24, 0], [-16, -26], [16, -28], [26, -10], [10, 4]], { wash: '#8a8e9a', washA: 1, w: 1.4, col: L }); ell(20, -28, 8, 8, { wash: '#6a6e7a', washA: 1, line: false }); pop(); }
    human(1120, 1820, 0.95, t, { body: '#3a3a4a', hat: 'cap', hatCol: '#c8281e', legs: '#2a2a36', armR: 'wave', flip: -1, seed: 8140, face: 'grin' }); push(1020, 1860, 1); blob([[-60, 0], [-50, -24], [50, -24], [60, 0]], { wash: '#2a2a30', washA: 1, w: 2, col: L }); for (let q = 0; q < 4; q++) ell(-30 + q * 20, -10, 7, 7, { wash: '#e8c040', washA: 1, w: 1, col: L }); pop();
    push(-40, 1720, 1); rect(-120, -60, 240, 20, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (const k of [-100, 100]) pencil([[k, -40], [k, 0]], { w: 7, col: '#2a2a2a', pass2: false }); pop();
    lightPool(640, 1600, 1000, 200, 'rgba(255,244,210,1)', 0.28); castShadow(420, 1700, 110, 560, -2.6, 0.3); moodDark(100, 1000, 900, 1900, '#1a2030', 0.12);
  }
  function front(t) { for (const x of [-150, 1240]) { pencil([[x, 2300], [x, 620]], { w: 24, col: '#4a3424', pass2: false }); for (let i = 0; i < 4; i++) ell(x + (i - 1.5) * 100, 600 - i * 20, 120, 70, { wash: i % 2 ? '#4a7a3a' : '#6a9a48', washA: 1, w: 1.4, col: '#14200e' }); } }
  function map(t) {                                                 // ответ: куда делась великая Литва
    const k = sm(clamp((t - EV.answer + 0.1) / 0.3)); if (k <= 0) return; scr(() => { ctx.save(); ctx.globalAlpha = k; const P = ltMapBase(t, { k: 52, lon: 28.8, lat: 51.6 });
      const pl = sm(clamp((t - EV.td_pl + 0.6) / 0.6)), ru = sm(clamp((t - EV.td_ru + 0.6) / 0.6));
      pencil(GDL.concat([GDL[0]]).map(P), { w: 5, col: LTC.amberD, pass2: false, gap: true }); ltZone(P, UA_CUT, '#e8a8a0', 0.4 + 0.5 * pl, { w: 3 }); ltZone(P, GDL_1569, '#2e4a3a', 0.2 + 0.7 * ru, { w: 3 }); ltZone(P, LT_NOW, LTC.yel, 1, { w: 4 });
      if (pl > 0.3) { const [x, y] = P([29.5, 49]); txt('ПОЛЬША · 1569', x, y, 46, { col: '#7a1a1a', font: 'Osw', a: pl }); }
      if (ru > 0.3) { const [x, y] = P([29.0, 53.4]); txt('РОССИЯ · 1795', x, y, 46, { col: '#e8f0e0', font: 'Osw', a: ru }); }
      const [lx, ly] = P([23.8, 55.3]); txt('ЛИТВА', lx, ly, 38, { col: LTC.ink, font: 'Osw' }); ctx.restore(); });
  }
  function extras(t) {                                              // группа туристов с гидом и зонтиком, собака, продавщица цветов, аккордеонист
    for (let i = 0; i < 4; i++) human(-60 + i * 60, 1520, 0.8, t, { body: ['#e8b030', '#3a6aa8', '#e86a8a', '#2a8a5a'][i], skin: ['#f0c8a0', '#e2b48e', '#f8d8b8', '#d8a47e'][i], hat: i === 1 ? 'cap' : null, hatCol: '#c8281e', legs: '#2a2a36', armR: i === 0 ? 'hold' : 'swing', prop: i === 2 ? 'phone' : undefined, seed: 8160 + i, face: 'smile' });
    push(-90, 1520 - 330 * 0.8, 0.8); pencil([[0, 0], [0, -120]], { w: 4, col: '#3a3a3a', pass2: false }); blob([[-60, -110], [0, -150], [60, -110]], { wash: LTC.red, washA: 1, w: 2, col: LTC.ink }); pop();
    push(1180, 1540, 0.9, 0, -1); blob([[-50, -10], [-40, -50], [30, -54], [56, -36], [50, -10]], { wash: '#e8d8b8', washA: 1, w: 2, col: LTC.ink }); ell(66, -54, 20, 16, { wash: '#e8d8b8', washA: 1, w: 1.6, col: LTC.ink }); for (const lx of [-30, -14, 26, 40]) pencil([[lx, -14], [lx, 14]], { w: 6, col: '#a89878', pass2: false }); pencil([[-50, -40], [-74, -60 + Math.sin(t * 10) * 10]], { w: 5, col: '#e8d8b8', pass2: false }); pop();
    push(1040, 1480, 0.9); rect(-80, -80, 160, 80, { wash: '#6a4a2a', washA: 1, w: 2, col: LTC.ink }); for (let q = 0; q < 8; q++) ell(-60 + q * 17, -90 - (q % 2) * 14, 12, 12, { wash: ['#f2c02a', '#c8281e', '#e8e0f0', '#e86a8a'][q % 4], washA: 1, w: 1, col: LTC.ink }); human(100, 0, 0.9, t, { body: '#7a4a5a', hat: 'scarf', hatCol: '#e8c040', legs: '#3a2a3a', long: 1, armR: 'hold', flip: -1, seed: 8170, face: 'smile' }); pop();
  }
  WORLD.today = (t, u, cat) => {
    lay(40, () => sky(t)); lay(15, () => far(t)); lay(3.2, () => { square(t); depthFog('#f4f0e6', 0.03); }); lay(1.5, () => extras(t)); lay(1, () => ground(t)); lay(0.62, () => front(t));
    lay(2, () => motes(14, [-100, 700, 1200, 1600], '#fff8e0', t, 8150, { sp: 2, sz: 2.4, a: 0.4, wob: 16, add: 1 }));
    map(t); lay(1, () => cat());
  };
  DIR.today = {
    outfit: 'hoodieLT', light: { side: 1, rim: '#fff0c8' }, grade: ['#2a2010', 0.04],
    act: () => [[S0.today, 'suspicious'], [EV.answer, 'proud'], [EV.td_pl, 'sideeye'], [EV.td_ru, 'annoyed']],
    pose: (t, u, b) => { const mp = t > EV.answer; return Object.assign(b, { x: mp ? 190 : 360, y: mp ? 1840 : 1720, s: mp ? 0.78 : 0.95, look: mp ? [0.6, -0.7] : [0.5, -0.4], hand: [150, -320], point: mp, prop: mp ? undefined : 'spyglass' }); },
    cam: () => [[S0.today, 620, 980, -0.08], [EV.answer - 0.01, 640, 960, -0.04], [EV.answer, 540, 960, 0], [S1.today, 540, 960, 0]]
  };
  TRANS_IN.today = { a: 0.1, b: 0.35, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.drawImage(A, 0, 0); ctx.restore(); }); whiteOut(Math.sin(e * Math.PI) * 0.5, '255,244,214'); } };
})();
