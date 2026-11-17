/* 030 — сцена `hook`. 0–1,25 с: глобус по смыслу — над Бразилией горит «БРАЗИЛИА ✓», пин «РИО?», резкий наезд точно в залив
   Гуанабара (карта: Сахарная Голова, Христос, Копакабана, Маракана) → облачная вспышка → 2026, Копакабана.
   Утро, солнце справа (главный свет), холодный океан — второй. Вдали Корковаду с Христом и Сахарная Голова с канаткой, ряд отелей,
   пальмы, пляж с зонтами, волейбол, сёрферы. Том входит шагом с табличкой «СТОЛИЦА БРАЗИЛИИ: РИО»; на «не Рио!» её перечёркивает
   красная печать «НЕТ»; на «почему» над отдыхающими пузыри «РИО!» (все так думают); на «Отматываем» Том подбрасывает мяч. Планы — window.HQ. */
(() => {
  const G1 = 1.25;
  EV.hk_zoom = 0.38; EV.hk_land = G1;
  EV.hk_no = wtk('h1', 'не');
  EV.hk_why = wtk('h1', 'почему');
  EV.hk_think = wtk('h1', 'думают');
  EV.hk_ball = wtk('h2', 'Отматываем');
  KEYW.push('Ошибка!', 'Рио!', 'иначе?');
  const L = RJ.ink, SUN = [920, 380];
  function sky(t) { vgrad(-900, 1050, ['#2a7ad0', '#6ab8ea', '#c8ecf8', '#fff4d8'], 1); glow(SUN[0], SUN[1], 220, 'rgba(255,240,190,1)', 0.4); ell(SUN[0], SUN[1], 64, 64, { wash: '#fffbe0', washA: 1, line: false });
    for (let i = 0; i < 5; i++) { const r = rng(6100 + i), y = 300 + i * 80, dx = (t * 12) % 200; blob([[-200 + r() * 300 + dx, y], [300 + dx, y - 26], [800 + dx, y - 6], [1300, y + 12], [300, y + 22]], { wash: '#ffffff', washA: 0.6, line: false }); }
    for (let i = 0; i < 6; i++) gull(160 + i * 170 + Math.sin(t + i) * 30, 560 + (i % 2) * 50, 0.7, t, i); }
  function far(t) {                                                  // горы: Тижука, Корковаду с Христом слева, Сахарная Голова справа
    blob([[-500, 1000], [-300, 780], [-100, 720], [100, 800], [300, 760], [500, 840], [800, 820], [1100, 900], [1700, 1000]], { wash: '#5a8a6a', washA: 1, w: 2, col: L, a: 0.6 });
    corcovado(200, 1000, 0.75, t, { col: '#2a6a3a' }); sugarloaf(880, 1010, 0.72, t); depthFog('#d8eef8', 0.06);
  }
  function hotels(t) {                                               // Авенида Атлантика: высотки, «Копакабана Палас», пальмы
    for (let i = 0; i < 9; i++) { const x = -360 + i * 150, h = 130 + (i % 3) * 50 + (i === 4 ? -30 : 0), c = i === 4 ? '#f8f4ea' : ['#e8e0d0', '#f0d8b0', '#d8e4ec', '#e8c8b8'][i % 4]; rect(x, 1090 - h, 136, h, { wash: c, washA: 1, w: 1.8, col: L, shade: { gap: 8, a: 0.1, col: '#8a7a6a', ang: 1.4 } });
      for (let f = 0; f < Math.floor(h / 34); f++) for (let k = 0; k < 4; k++) rect(x + 10 + k * 31, 1090 - h + 12 + f * 34, 22, 20, { wash: (f + k + i) % 5 ? '#6a8aa8' : '#ffe8a8', washA: 1, w: 0.8, col: L });
      if (i === 4) { txt('COPACABANA PALACE', x + 68, 1090 - h + 30, 14, { col: '#3a3a3a', font: 'Osw' }); for (let k = 0; k < 6; k++) pencil([[x + 6, 1090 - h + 60 + k * 26], [x + 130, 1090 - h + 60 + k * 26]], { w: 3, col: '#e8e0d0', pass2: false }); } }
    for (const x of [-300, -40, 300, 640, 980]) palm(x, 1100, 230, t, x);
  }
  function beach(t) {                                                // океан, пляж, зонты, волейбол, люди, сёрферы
    seaKR(1090, 1220, t, 6110, { cols: ['#2aa8d8', '#1e8ab8', '#0e5a8a'], glint: '#fff6d8', gx: 860, n: 26 });
    for (let i = 0; i < 3; i++) { const x = 300 + i * 260 + Math.sin(t + i) * 30; push(x, 1150, 0.4); shape([[-60, -6], [60, -6], [50, 4], [-50, 4]], { wash: ['#f8d030', '#e84a3a', '#f4f0e6'][i], washA: 1, w: 1.4, col: L }); human(0, -6, 0.5, t, { body: '#e8a070', skin: '#c88a5a', legs: '#1e3a8a', armR: 'up', seed: 6111 + i, face: 'grin' }); pop(); }
    rect(-500, 1210, 2200, 140, { wash: RJ.sand, washA: 1, w: 2, col: L, shade: { gap: 10, a: 0.12, col: RJ.sandD, ang: 0.2 } });
    for (let i = 0; i < 7; i++) { const x = -300 + i * 230; pencil([[x, 1300], [x, 1200]], { w: 4, col: '#6a5a4a', pass2: false }); blob([[x - 80, 1210], [x - 60, 1180], [x, 1166], [x + 60, 1180], [x + 80, 1210]], { wash: ['#e84a3a', '#f8d030', '#1e8ab8', '#2ac86a', '#f08ac8'][i % 5], washA: 1, w: 1.6, col: L }); }
    pencil([[620, 1300], [620, 1220]], { w: 4, col: '#2a2a30', pass2: false }); pencil([[860, 1300], [860, 1220]], { w: 4, col: '#2a2a30', pass2: false }); for (let q = 0; q < 4; q++) pencil([[620, 1226 + q * 10], [860, 1226 + q * 10]], { w: 1.4, col: '#2a2a30', a: 0.7, pass2: false });
    ball(740, 1150 - Math.abs(Math.sin(t * 3)) * 70, 0.3, t * 4);
    const P = [[-200, '#f8d030', 'straw'], [-60, '#e84a3a', null], [120, '#1e8ab8', 'cap'], [560, '#2ac86a', null], [700, '#f08ac8', 'straw'], [930, '#e8603a', null], [1080, '#3a5aa8', 'cap'], [1240, '#f4f0e6', 'straw']];
    P.forEach(([x, c, h], i) => { human(x, 1330, 0.6, t, { body: c, skin: ['#e2b48e', '#a8704a', '#c88a5a', '#7a4a2a'][i % 4], hat: h, hatCol: h === 'straw' ? '#e8d08a' : '#2a2a30', legs: '#1e3a8a', armR: t > EV.hk_think && i % 2 ? 'up' : i === 3 || i === 4 ? 'swing' : 'hold', seed: 6120 + i, flip: x > 600 ? -1 : 1, face: t > EV.hk_why ? 'shock' : 'smile' });
      if (t > EV.hk_think && i % 2 === 0) { const k = popK(t, EV.hk_think + i * 0.05, 0.25); push(x + 30, 1100, k); blob([[-70, -30], [-60, -70], [0, -84], [60, -70], [70, -30], [10, -24], [-10, 4], [-14, -24]], { wash: '#ffffff', washA: 1, w: 2, col: L }); txt('РИО!', 0, -52, 30, { col: RJ.green, font: 'Osw' }); pop(); } });
  }
  function promenade(t) {                                            // набережная: мозаика, киоск с кокосами, велосипед, холодильник, тапки
    waves(-500, 1700, 1400, t, 1);
    push(1060, 1440, 1); rect(-120, -200, 240, 200, { wash: '#f8d030', washA: 1, w: 2, col: L }); poly([[-150, -200], [0, -270], [150, -200]], { wash: RJ.green, washA: 1, w: 2, col: L }); txt('ÁGUA DE COCO', 0, -150, 22, { col: RJ.green, font: 'Osw' });
    for (let q = 0; q < 4; q++) ell(-80 + q * 50, -40, 22, 26, { wash: '#6aa83a', washA: 1, w: 1.6, col: L }); pop();
    push(-120, 1440, 0.9); for (const k of [-60, 60]) ell(k, -40, 40, 40, { line: true, w: 5, col: '#2a2a30' }); pencil([[-60, -40], [0, -100], [60, -40], [0, -40], [-60, -40]], { w: 5, col: RJ.red, pass2: false }); pop();
  }
  function ground(t) {                                               // мозаика под Томом, табличка, мяч, сумка-холодильник, тапки, ракушки
    rect(-500, 1540, 2200, 800, { wash: '#f4f0e6', washA: 1, w: 2, col: L }); for (let r = 0; r < 4; r++) { const P = []; for (let x = -500; x <= 1700; x += 16) P.push([x, 1600 + r * 80 + Math.sin(x / 80 + r) * 22]); pencil(P, { w: 24, col: '#1a1a1e', pass2: false, gap: false }); }
    lightPool(SUN[0] - 300, 1680, 700, 160, 'rgba(255,240,190,1)', 0.35);
    push(900, 1760, 1); rect(-80, -90, 160, 90, { wash: '#1e8ab8', washA: 1, w: 2, col: L }); rect(-80, -110, 160, 24, { wash: '#f4f0e6', washA: 1, w: 2, col: L }); pop();
    for (const [x, c] of [[640, '#f8d030'], [700, '#2ac86a']]) { push(x, 1830, 1, 0.2); ell(0, 0, 44, 16, { wash: c, washA: 1, w: 1.6, col: L }); pencil([[-10, -6], [0, -16], [10, -6]], { w: 3, col: L, pass2: false }); pop(); }
    if (t < EV.hk_ball) ball(560, 1780, 0.9, 0);
    castShadow(330, 1640, 120, 520, -0.5, 0.35); moodDark(-200, 900, 1000, 1900, '#0e2a4a', 0.25);
  }
  function front(t) { palm(-140, 2000, 900, t, 7); palm(1240, 2000, 820, t, 9); }
  window.HQ = { sky, far, hotels, beach, promenade, ground, front };
  WORLD.hook = (t, u, cat) => {
    if (t < G1) { lay(1, () => GLOBE.intro(t, Object.assign({ t1: G1 }, RIO_GLOBE))); return; }
    lay(40, () => sky(t)); lay(20, () => far(t)); lay(9, () => hotels(t)); lay(4.5, () => { beach(t); depthFog('#e8f4fc', 0.03); }); lay(2.2, () => promenade(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(16, [-100, 700, 1200, 1500], '#fff8e0', t, 6130, { sp: 3, sz: 2.2, a: 0.4, wob: 16, add: 1 }));
    GLOBE.burst(t, G1);
  };
  DIR.hook = {
    outfit: 'hoodieRIO', light: { side: 1, rim: '#fff0c0' }, grade: ['#1a4a6a', 0.05],
    act: () => [[0, 'awe'], [EV.hk_land, 'smug'], [EV.hk_no, 'shock'], [EV.hk_why, 'suspicious'], [EV.hk_think, 'sideeye'], [EV.hk_ball, 'grin']],
    pose: (t, u, b) => { const w1 = clamp((t - G1) / 0.75), x = lerp(-60, 340, sm(w1)), sign = t < EV.hk_ball;
      return Object.assign(b, { x, y: 1640, s: 1.0, walk: w1 < 1 ? t * 9 : 0, look: t > EV.hk_think ? [0.9, -0.3] : [0.2, -0.4], hand: sign ? [130, -470] : [150, -330], handF: sign ? [-90, -470] : undefined, tailUp: t > EV.hk_ball }); },
    afterCat: (t, u, P) => { if (t < EV.hk_ball) { push(P.x + 20 * P.s, P.y - 640 * P.s, P.s, -0.04); rect(-210, -110, 420, 220, { wash: '#f4f0e6', washA: 1, w: 3, col: L }); pencil([[-150, 110], [-150, 260]], { w: 8, col: RJ.woodD, pass2: false });
        txt('СТОЛИЦА БРАЗИЛИИ:', 0, -60, 34, { col: L, font: 'Osw' }); txt('РИО', 0, 20, 96, { col: RJ.green, font: 'Osw' }); if (t > EV.hk_no - 0.05) stamp_(10, 10, 0.95, 'НЕТ', RJ.red, -0.18, popK(t, EV.hk_no - 0.05, 0.25), { size: 90 }); pop(); }
      else { const k = clamp((t - EV.hk_ball) / 0.6); ball(P.x + 60 * P.s, P.y - (200 + Math.sin(k * 3.14) * 380) * P.s, 0.9, t * 8); } },
    hud: t => { if (t > EV.hk_why && t < EV.hk_ball) { push(780, 820, popK(t, EV.hk_why, 0.3), 0.1); txt('?', 0, 0, 220, { col: RJ.yellow, font: 'Osw' }); pop(); } },
    cam: () => [[0, 540, 960, 0], [G1, 540, 960, 0], [G1 + 0.01, 600, 920, -0.1], [G1 + 0.7, 560, 980, -0.04], [EV.hk_no, 460, 1080, 0.12, 'x'], [EV.hk_why, 560, 1000, 0.0], [EV.hk_think, 620, 960, -0.06], [EV.hk_ball, 420, 1200, 0.12], [S1.hook, 400, 1240, 0.2]]
  };
  TRANS_IN.tunnel = { a: 0.12, b: 0.35, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.translate(540, 960); ctx.rotate(-e * 2.6); ctx.scale(1 - e * 0.85, 1 - e * 0.85); ctx.drawImage(A, -540, -960); ctx.restore(); }); } };
})();
