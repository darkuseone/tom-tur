/* 035 — сцена `hook`. 0–1,25 с: глобус — с Японии разворот через всю Евразию по пунктиру «фронта» к крошечной красной Черногории →
   наезд в Которский залив → облачная вспышка → утренний Котор: чёрные горы отвесно в залив, стены зигзагом к крепости, терракотовые
   крыши, колокольня, лодки, круизный лайнер вдали, кафе на набережной, туристы, местные коты (Котор — город кошек). Главный свет —
   солнце из-за горы справа (лучи через ущелье), холодные тени гор. На «Сто лет войны» выскакивает газетная вырезка «ЧЕРНОГОРИЯ
   100 ЛЕТ ВОЕВАЛА С ЯПОНИЕЙ»; на «проверил» Том наводит подзорную трубу; на «байку» — штамп «БАЙКА?». Планы — window.HQ. */
(() => {
  const G1 = 1.25, L = MEC.ink, SUN = [960, 480];
  EV.hk_zoom = 0.38; EV.hk_land = G1; EV.hk_war = G1 + 0.1; EV.hk_check = wtk('h1', 'проверил'); EV.hk_tale = wtk('h1', 'байку.'); EV.hk_go = wtk('h2', 'Отматываем');
  KEYW.push('Японией!', 'байку.');
  function sky(t) { vgrad(-900, 1100, ['#4a8ad0', '#a8d0ec', '#f4ecd8'], 1); glow(SUN[0], SUN[1], 240, 'rgba(255,240,200,1)', 0.45); ell(SUN[0], SUN[1], 52, 52, { wash: '#fffbe8', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const y = 260 + i * 80, dx = (t * 9) % 200; blob([[-200 + dx, y], [300 + dx, y - 22], [900 + dx, y - 6], [1300, y + 12], [400, y + 18]], { wash: '#ffffff', washA: 0.5, line: false }); }
    for (let i = 0; i < 4; i++) { const x = 300 + i * 120 + Math.sin(t + i) * 30, y = 540 + (i % 2) * 30; pencil([[x - 12, y - Math.sin(t * 9 + i) * 6], [x, y], [x + 12, y - Math.sin(t * 9 + i) * 6]], { w: 3, col: '#f4f4f4', pass2: false }); } }
  function mountains(t) { blackMountain(-400, 1600, 1060, 620, t, 9300, { col: '#3e4a40' }); kotorWalls(560, 1040, 420, t); blackMountain(-400, 500, 1080, 300, t, 9301, { col: '#2e3830', trees: 20 }); depthFog('#dce8f0', 0.08); }
  function bay(t) { sea(1060, 1200, t); push(980, 1110, 0.5); rect(-300, -90, 600, 80, { wash: '#f4f4f4', washA: 1, w: 2, col: L }); for (let q = 0; q < 4; q++) rect(-280, -130 - q * 30, 520 - q * 60, 30, { wash: '#f4f4f4', washA: 1, w: 1.4, col: L }); for (let q = 0; q < 12; q++) ell(-260 + q * 44, -60, 8, 8, { wash: '#4a6a8a', washA: 1, line: false }); pop();
    boat(160, 1150, 0.6, t, { sail: '#f4efe4' }); boat(520, 1170, 0.5, t, { col: '#e8c040', stripe: MEC.red }); }
  function town(t) {                                                // старый город: дома, колокольня, кафе, туристы, коты
    for (let i = 0; i < 8; i++) { const r = rng(9310 + i); stoneHouse(-200 + i * 190, 1230, 150 + r() * 40, 140 + r() * 70, t, { shut: ['#2a6a5a', '#3a5a8a', '#8a3a2a'][i % 3], door: i % 2 }); }
    push(380, 1230, 1); rect(-50, -380, 100, 380, { wash: MEC.stone, washA: 1, w: 2.4, col: L, shade: { gap: 9, a: 0.12, col: MEC.stoneD, ang: 0.4 } }); rect(-30, -330, 60, 70, { wash: '#2a2a30', washA: 1, w: 1.6, col: L }); poly([[-60, -380], [0, -460], [60, -380]], { wash: MEC.terra, washA: 1, w: 2, col: L }); ell(0, -230, 26, 26, { wash: '#f4f0e6', washA: 1, w: 1.6, col: L }); pop();
    for (let i = 0; i < 3; i++) { push(760 + i * 150, 1300, 0.8); pencil([[0, 0], [0, -150]], { w: 3, col: '#6a6a6a', pass2: false }); poly([[-80, -150], [0, -190], [80, -150]], { wash: ['#f4f4f4', MEC.red, '#2a6aa8'][i], washA: 1, w: 2, col: L }); rect(-50, -60, 100, 10, { wash: '#6a4a2a', washA: 1, w: 1.4, col: L }); pop(); }
    const P = [[60, '#2a6aa8', 'hold', 'phone'], [160, '#e86a8a', 'wave'], [800, '#5a5a5a', 'hold', null, 'cap'], [900, '#c8a040', 'hold'], [1060, '#3a3a3a', 'hold', null, 'cap'], [1180, '#2a8a5a', 'swing']];
    P.forEach(([x, c, a, pr, h], i) => human(x, 1320, 0.66, t, { body: c, skin: ['#f0c8a0', '#e2b48e', '#c8946a'][i % 3], hat: h || null, hatCol: '#3a3a3a', legs: '#2a2a36', armR: a, prop: pr || undefined, flip: x > 600 ? -1 : 1, seed: 9320 + i, face: 'smile' }));
  }
  function cat(x, y, s, t, col, seed) { push(x, y, s); blob([[-40, 0], [-36, -40], [30, -44], [44, -20], [40, 0]], { wash: col, washA: 1, w: 2, col: L }); ell(46, -50, 22, 20, { wash: col, washA: 1, w: 1.6, col: L }); poly([[34, -66], [40, -84], [48, -68]], { wash: col, washA: 1, w: 1.2, col: L }); poly([[52, -66], [60, -84], [64, -64]], { wash: col, washA: 1, w: 1.2, col: L });
    pencil([[-40, -20], [-70, -50 + Math.sin(t * 3 + seed) * 14], [-60, -70]], { w: 6, col, pass2: false }); pop(); }
  function ground(t) {                                              // набережная: светлый камень, швартовы, тумбы, ящики с рыбой, коты
    rect(-500, 1340, 2200, 1000, { wash: '#d8ccb4', washA: 1, w: 2, col: L }); for (let i = 0; i < 12; i++) for (let j = 0; j < 6; j++) rect(-400 + i * 170 + (j % 2) * 85, 1360 + j * 100, 170, 100, { wash: (i + j) % 3 ? '#e0d4bc' : '#c8bca4', washA: 1, w: 1, col: '#8a7e68', a: 0.5 });
    for (let i = 0; i < 3; i++) { push(-60 + i * 520, 1420, 1); rect(-24, -60, 48, 60, { wash: '#2a2a2e', washA: 1, w: 2, col: L }); ell(0, -60, 30, 10, { wash: '#3a3a3e', washA: 1, w: 1.6, col: L }); pop(); } pencil([[-60, 1360], [200, 1300]], { w: 5, col: '#c8a878', pass2: false });
    push(900, 1640, 1); rect(-80, -60, 160, 60, { wash: '#6a8aa0', washA: 1, w: 2, col: L }); for (let q = 0; q < 5; q++) ell(-60 + q * 30, -66, 20, 8, { wash: '#c8ccd4', washA: 1, w: 1, col: L }); pop();
    cat(760, 1720, 1, t, '#e8a050', 1); cat(1100, 1820, 1.1, t, '#3a3a3a', 2); cat(200, 1900, 0.9, t, '#f4f0e8', 3);
    lightPool(700, 1600, 1000, 200, 'rgba(255,240,200,1)', 0.3); castShadow(420, 1700, 110, 560, -2.6, 0.3); moodDark(100, 1000, 900, 1900, '#10181e', 0.18);
  }
  function front(t) { for (const x of [-150, 1240]) cypress(x, 2400, 1900, t, x > 0 ? 2 : 1); }
  function clip(t) {                                                // газетная вырезка с байкой + штамп «БАЙКА?»
    if (t < EV.hk_war || t > EV.hk_go) return; const k = popK(t, EV.hk_war, 0.3); push(660, 1060, 0.85 * k, 0.04); ctx.save(); ctx.fillStyle = 'rgba(244,236,214,0.98)'; ctx.fillRect(-280, -170, 560, 340); ctx.restore();
    for (let i = 0; i < 12; i++) pencil([[-280 + i * 48, -170 + (i % 2) * 6], [-232 + i * 48, -170 - (i % 2) * 6]], { w: 3, col: '#a89878', pass2: false });
    txt('СЕНСАЦИЯ!', 0, -116, 34, { col: MEC.red, font: 'Osw' }); txt('ЧЕРНОГОРИЯ 100 ЛЕТ', 0, -56, 44, { col: L, font: 'Osw' }); txt('ВОЕВАЛА С ЯПОНИЕЙ', 0, 0, 44, { col: L, font: 'Osw' });
    for (let i = 0; i < 4; i++) pencil([[-230, 50 + i * 24], [230 - (i % 2) * 60, 50 + i * 24]], { w: 3, col: '#8a8270', a: 0.6, pass2: false });
    pop(); stamp(700, 1130, 0.9, t, EV.hk_tale, 'БАЙКА?', MEC.red, -0.2);
  }
  window.HQ = { sky, mountains, bay, town, ground, front, cat };
  function extras2(t) {                                             // рыбак чистит рыбу, сувенирный лоток с магнитами, велосипед, вазоны с геранью
    push(-60, 1540, 0.9); human(0, 0, 1, t, { body: '#3a5a7a', hat: 'cap', hatCol: '#2a2a2a', legs: '#2a2a36', armR: 'hold', seed: 9340, face: 'smile', beard: 1 }); rect(30, -150, 90, 30, { wash: '#8a6a4a', washA: 1, w: 1.4, col: L }); for (let q = 0; q < 3; q++) ell(50 + q * 24, -160, 14, 6, { wash: '#a8b8c8', washA: 1, w: 1, col: L }); pop();
    push(1180, 1540, 0.9); rect(-100, -160, 200, 160, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (let q = 0; q < 12; q++) rect(-86 + (q % 4) * 44, -150 + Math.floor(q / 4) * 44, 36, 36, { wash: [MEC.red, '#2a6aa8', '#e8c040', '#f4f4f0'][q % 4], washA: 1, w: 1, col: L }); txt('KOTOR', 0, -180, 24, { col: MEC.red, font: 'Osw' }); pop();
    push(1000, 1560, 0.8); ell(-50, -30, 32, 32, { wash: false, w: 4, col: '#2a2a30' }); ell(50, -30, 32, 32, { wash: false, w: 4, col: '#2a2a30' }); pencil([[-50, -30], [0, -70], [50, -30], [-10, -70]], { w: 4, col: '#2a8ad8', pass2: false }); pop();
    for (let i = 0; i < 3; i++) { push(560 + i * 60, 1580, 0.7); rect(-24, -40, 48, 40, { wash: MEC.terra, washA: 1, w: 1.4, col: L }); for (let q = 0; q < 5; q++) ell(-16 + (q % 3) * 16, -50 - Math.floor(q / 3) * 14, 9, 9, { wash: q % 2 ? '#e8283a' : '#3a7a2a', washA: 1, w: 1, col: L }); pop(); }
  }
  WORLD.hook = (t, u, cat_) => {
    if (t < G1) { lay(1, () => GLOBE.intro(t, Object.assign({ t1: G1 }, ME_GLOBE))); return; }
    lay(40, () => sky(t)); lay(18, () => mountains(t)); lay(8, () => bay(t)); lay(3.2, () => { town(t); depthFog('#eef4f8', 0.03); }); lay(1.5, () => extras2(t)); lay(1, () => { ground(t); cat_(); }); lay(0.6, () => front(t));
    lay(2.2, () => { rays(SUN[0], SUN[1], 2.4, 0.4, 1400, 'rgba(255,244,210,1)', 0.12, 5, t); motes(14, [-100, 700, 1200, 1500], '#fff8e0', t, 9330, { sp: 2, sz: 2.4, a: 0.4, wob: 16, add: 1 }); });
    GLOBE.burst(t, G1);
  };
  DIR.hook = {
    outfit: 'hoodieME', light: { side: 1, rim: '#fff0c8' }, grade: ['#102030', 0.04],
    act: () => [[0, 'awe'], [EV.hk_land, 'suspicious'], [EV.hk_check, 'smug'], [EV.hk_tale, 'sideeye'], [EV.hk_go, 'grin']],
    pose: (t, u, b) => { const w1 = clamp((t - G1) / 0.8), x = lerp(-40, 330, sm(w1)), look = t > EV.hk_check && t < EV.hk_go;
      return Object.assign(b, { x, y: 1660, s: 1.0, walk: w1 < 1 ? t * 9 : 0, look: look ? [0.9, -0.4] : [0.4, -0.3], hand: look ? [200, -380] : [150, -300], prop: look ? 'spyglass' : undefined, tailUp: t > EV.hk_go }); },
    hud: t => clip(t),
    cam: () => [[0, 540, 960, 0], [G1, 540, 960, 0], [G1 + 0.01, 620, 920, -0.1], [G1 + 0.7, 560, 980, -0.04], [EV.hk_check, 520, 1040, 0.04, 'x'], [EV.hk_tale, 560, 1020, 0.08, 'x'], [EV.hk_go, 440, 1180, 0.12], [S1.hook, 420, 1230, 0.2]]
  };
  TRANS_IN.tunnel = { a: 0.12, b: 0.35, fx(k, t, A, B) { const e = sm(k); drawBuf(A); scr(() => { const y = H * (1 - e); ctx.save(); ctx.beginPath(); ctx.moveTo(0, H); for (let x = 0; x <= W; x += 40) ctx.lineTo(x, y + Math.sin(x * 0.02 + t * 8) * 60); ctx.lineTo(W, H); ctx.closePath(); ctx.clip(); ctx.drawImage(B, 0, 0); ctx.restore();
    for (let x = 0; x <= W; x += 30) ell(x, y + Math.sin(x * 0.02 + t * 8) * 60, 30, 16, { wash: '#ffffff', washA: 0.9, line: false }); }); } };
})();
