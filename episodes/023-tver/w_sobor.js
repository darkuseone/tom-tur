/* 023 — сцена `sobor`: 1285–1290, тверской кремль на мысу у Волги. В центре достраивают белокаменный Спасо-Преображенский собор
   (закомары, аркатура, шлем), вокруг — деревянные стены и башни, избы, на Волге ладьи; во дворе каменотёсы тешут белые блоки,
   ворот с бадьёй тянет камень на леса, бабы несут снопы льна. На «Белокаменный» леса падают и собор вспыхивает белым;
   на «деревянная» в небе всплывает «тем временем в Москве» — деревянный городок с биркой «МОСКВА: ДЕРЕВО»; на «ноль!» — табло 1 : 0.
   Переход В сцену — печать: огромная вислая печать опускается на кадр туннеля и, поднимаясь, оставляет оттиск-окно в 1285. */
(() => {
  EV.sb_white = wtk('s1', 'Белокаменный');
  EV.sb_wood = wtk('s1', 'деревянная.');
  EV.sb_score = wtk('s1', 'ноль!');
  EV.sb_moscow = wtk('s1', 'Москва');
  KEYW.push('Белокаменный', 'деревянная.', 'ноль!');
  SHAKES.push([EV.sb_white + 0.05, 0.2, 6], [EV.sb_score, 0.15, 5]);
  const L = TV.ink;
  function sky(t) { flaxSky(t, { sx: 260, sy: 300, seed: 23200, nb: 10, cols: ['#5a86b0', '#8ab0cc', '#c0d6dc', '#ece6c8', '#f6e8bc'] }); }
  function far(t) {                                                 // заволжский берег: лес, луга, Волга с ладьями
    hills(1080, 40, '#4a7a52', 23201, 1); hills(1110, 24, '#6a9a5a', 23202, 1);
    for (let i = 0; i < 26; i++) { const x = -100 + i * 52, h = 60 + (i * 31) % 50; poly([[x - 22, 1100], [x, 1100 - h], [x + 22, 1100]], { wash: '#2e5a3a', washA: 1, w: 1.2, col: L, a: 0.6 }); }
    volga(1110, 1250, t, { sx: 260, seed: 23203, top: '#9ac0d4', bot: '#3e6a8a', glint: '#fff6d8', farBank: false });
    ladya(820, 1210, 0.2, t, { crew: true }); ladya(1080, 1240, 0.16, t, { flip: -1, stripe: TV.green }); ladya(120, 1230, 0.14, t, { sail: false, crew: true });
    for (let k = 0; k < 6; k++) pencil([[880 + k * 40, 1180], [880 + k * 40 + 10, 1250]], { w: 3, col: '#5a3a1e', a: 0.8, pass2: false });   // мостки-пристань
  }
  function kremlin(t) {                                             // деревянный кремль: частокол, башни, избы, терем
    palisade(-160, 1360, 1240, 170, t, { col: '#8a6440', seed: 23204 });
    for (const [x, w, h, g] of [[60, 110, 240, 0], [1010, 120, 260, 1], [1240, 100, 220, 0]]) woodTower(x, 1250, w, h, t, { gate: g, flag: g ? TV.red : null });
    for (const [x, w, h] of [[180, 110, 90], [300, 130, 110], [880, 120, 100]]) izba(x, 1180, w, h, t, { smoke: x === 300, roof: '#5a6a3a' });
    push(1140, 1180, 0.8); rect(-70, -170, 140, 170, { wash: '#9a7048', washA: 1, w: 2.2, col: L }); poly([[-90, -170], [0, -290], [90, -170]], { wash: '#3e6a4a', washA: 1, w: 2.2, col: L }); blob([[-20, -290], [0, -330], [20, -290]], { wash: TV.gold, washA: 1, w: 1.6, col: L }); for (let k = 0; k < 3; k++) rect(-50 + k * 40, -130, 20, 30, { wash: '#2a1a10', washA: 1, w: 1.2, col: L }); pop();   // терем
    crowd(380, 900, 1200, 9, t, 23205, { s: 0.26, cols: ['#e8dcb8', '#6a3a2a', '#3a5a3a', '#b0322a', '#5a6a8a'] });
  }
  function cathedral(t) {                                           // собор + леса до «Белокаменного»
    const b = t < EV.sb_white ? 0.85 : 1, flash = t > EV.sb_white ? 1 - sm((t - EV.sb_white) / 0.8) : 0;
    if (flash > 0) glow(600, 900, 520, 'rgba(255,250,230,1)', 0.7 * flash);
    sobor(600, 1260, 0.72, t, { build: b });
    if (t > EV.sb_white && t < EV.sb_white + 0.7) for (let i = 0; i < 8; i++) { const r = rng(23206 + i), k = (t - EV.sb_white) / 0.7; pencil([[440 + r() * 320, 700 + r() * 300 + k * 600], [440 + r() * 320 + 140, 700 + r() * 300 + k * 600 + (r() - 0.5) * 80]], { w: 5, col: TV.woodD, a: 1 - k, pass2: false }); }   // падающие доски лесов
    if (t > EV.sb_white) for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.35; pencil([[600 + Math.cos(a) * 340, 980 + Math.sin(a) * 340], [600 + Math.cos(a) * 420, 980 + Math.sin(a) * 420]], { w: 6, col: '#fff6d0', a: 0.8 * sm((t - EV.sb_white) / 0.3), pass2: false }); }
    push(820, 1250, 0.7); pencil([[0, 0], [0, -420]], { w: 8, col: TV.woodD, pass2: false }); pencil([[0, -420], [160, -380]], { w: 6, col: TV.woodD, pass2: false });   // ворот-журавль: бадья с камнем
    const lift = (Math.sin(t * 1.2) + 1) / 2; pencil([[160, -380], [160, -380 + 260 - lift * 160]], { w: 2, col: '#3a2410', pass2: false }); rect(130, -120 - lift * 160, 60, 40, { wash: TV.stone, washA: 1, w: 2, col: L });
    ell(0, -60, 50, 50, { line: true, w: 4, col: TV.woodD }); for (let k = 0; k < 6; k++) { const a = k / 6 * 6.28 + t; pencil([[0, -60], [Math.cos(a) * 50, -60 + Math.sin(a) * 50]], { w: 3, col: TV.woodD, pass2: false }); } pop();
  }
  function yard(t) {                                                // двор каменотёсов: блоки, щепа, мастера
    for (const [x, y, w, h] of [[160, 1400, 130, 70], [260, 1420, 110, 60], [880, 1410, 140, 70], [980, 1440, 100, 56], [210, 1352, 100, 56]]) { const b = rect(x - w / 2, y - h, w, h, { wash: TV.stone, washA: 1, w: 2, col: L, shade: { gap: 7, a: 0.18, col: TV.stoneS, ang: 0.8 } }); }
    const r = rng(23207); for (let i = 0; i < 40; i++) ell(100 + r() * 1000, 1420 + r() * 60, 3 + r() * 5, 2 + r() * 3, { wash: '#f8f2e4', washA: 1, line: false });   // белая крошка
    const hit = Math.sin(t * 9) > 0;
    human(320, 1440, 0.42, t, { body: '#e8dcb8', legs: '#4a3a2a', hat: 'cap', hatCol: '#6a5a3a', beard: 1, seed: 2301, prop: 'axe', armR: hit ? 'up' : 'hold' });
    human(770, 1446, 0.42, t, { body: '#a8c0d8', legs: '#3a3020', beard: 1, seed: 2302, prop: 'axe', armR: hit ? 'hold' : 'up', flip: -1 });
    human(1060, 1450, 0.44, t, { body: '#4a6a3a', legs: '#3a3020', hat: 'fur', hatCol: '#3a2a1a', beard: 1, seed: 2303, prop: 'scroll', armR: 'hold', flip: -1 });   // зодчий с чертежом
    human(480, 1430, 0.4, t, { body: '#2a2a30', legs: '#2a2a30', long: 1, hat: 'hood', hatCol: '#1a1a20', beard: 1, seed: 2304, prop: 'candle', armR: 'hold' });   // монах
    horse(620, 1450, 0.34, t, { col: '#8a5a34', walk: 0.5, load: 1 }); cart(500, 1460, 0.34, t, { load: 'logs' });
  }
  function ground(t) {                                              // ближний план: трава, тропа, снопы льна, вёдра, корзины
    tvGround(1470, t, { seed: 23208, path: 560, flowers: 30, top: '#8aa65a', bot: '#4a6a32' });
    for (const [x, y, s] of [[820, 1640, 0.8], [900, 1660, 0.7], [1150, 1620, 0.9]]) { push(x, y, s); for (let k = -4; k <= 4; k++) pencil([[k * 5, 0], [k * 11, -130]], { w: 4, col: '#d8c078', pass2: false }); pencil([[-22, -50], [22, -50]], { w: 6, col: '#7a5a2a', pass2: false }); for (let k = -4; k <= 4; k++) ell(k * 11, -136, 6, 6, { wash: '#7aa0e0', washA: 1, line: false }); pop(); }   // снопы льна
    for (let k = 0; k < 3; k++) pencil([[560 + k * 70, 1600], [600 + k * 70, 1560]], { w: 14, col: '#7a5434', pass2: false });   // катки под камнем
    rect(540, 1480, 220, 90, { wash: TV.stone, washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.2, col: TV.stoneS, ang: 0.8 } }); pencil([[760, 1520], [1000, 1500]], { w: 3, col: '#5a3a1e', pass2: false });   // блок на катках + верёвка
    for (let k = 0; k < 3; k++) human(840 + k * 80, 1590 + k * 6, 0.48, t, { body: ['#e8dcb8', '#a8c0d8', '#7a8a5a'][k], legs: '#4a3a2a', beard: k !== 1 ? 1 : 0, hat: k === 2 ? 'cap' : undefined, hatCol: '#6a5a3a', seed: 2310 + k, armL: 'hold', armR: 'hold', flip: -1, look: [-0.2, 0.2] });
    push(420, 1600, 0.6); for (let k = 0; k < 5; k++) pencil([[-40 + k * 20, 0], [-20 + k * 10, -30]], { w: 6, col: '#5a3a1e', pass2: false }); glow(0, -40, 70, 'rgba(255,160,80,1)', 0.5 * flick(t)); blob([[-26, -30], [-10, -80 - Math.sin(t * 9) * 8], [0, -50], [12, -90 + Math.sin(t * 7) * 8], [26, -30]], { wash: '#f0a040', washA: 0.9, line: false });
      pencil([[-50, -110], [50, -110]], { w: 4, col: '#3a2a1a', pass2: false }); blob([[-30, -110], [-34, -150], [34, -150], [30, -110]], { wash: '#3a3a3a', washA: 1, w: 2, col: L }); pop();   // костёр с котлом
    for (const [x, y, a] of [[500, 1820, 0.3], [880, 1860, -0.4], [300, 1880, 0.1]]) { push(x, y, 0.8, a); pencil([[0, 0], [90, 0]], { w: 7, col: '#6a4a2a', pass2: false }); rect(84, -14, 30, 28, { wash: '#8a8a8a', washA: 1, w: 1.6, col: L }); pop(); }   // инструмент
    const r2 = rng(23211); for (let i = 0; i < 60; i++) ell(200 + r2() * 1000, 1560 + r2() * 360, 3 + r2() * 4, 2 + r2() * 2, { wash: '#f8f2e4', washA: 1, line: false });   // каменная крошка
    barrel(1000, 1720, 0.5); sack(1060, 1740, 0.55, TV.flax); jug(700, 1760, 0.45); crate(380, 1760, 110, 64);
    for (const [x, y] of [[620, 1700], [660, 1716]]) { blob([[x - 26, y], [x - 30, y - 50], [x + 30, y - 50], [x + 26, y]], { wash: '#8a6a42', washA: 1, w: 2, col: L }); pencil([[x - 30, y - 50], [x, y - 90], [x + 30, y - 50]], { w: 2, col: L, pass2: false }); }   // вёдра
    push(460, 1720, 0.6); blob([[-60, 0], [-70, -50], [70, -50], [60, 0]], { wash: '#b89a5a', washA: 1, w: 2, col: L }); for (let k = 0; k < 5; k++) pencil([[-66, -10 * k], [66, -10 * k]], { w: 1.4, col: '#5a4a2a', a: 0.7, pass2: false }); pop();   // корзина
    human(960, 1620, 0.6, t, { body: '#e8dcb8', legs: '#4a3a2a', hat: 'scarf', hatCol: TV.red, long: 1, seed: 2305, armL: 'hold', flip: -1, look: [-0.4, -0.3] });   // баба со снопом
    human(1160, 1700, 0.5, t, { body: '#a8c0d8', legs: '#4a3a2a', seed: 2306, armR: 'wave', flip: -1 });   // мальчишка
    for (let k = 0; k < 3; k++) { const x = 760 + k * 44 + Math.sin(t * 2 + k) * 10, y = 1780 + (k % 2) * 14; ell(x, y, 18, 12, { wash: '#f2ece0', washA: 1, w: 1.4, col: L }); ell(x + 16, y - 14, 7, 6, { wash: '#f2ece0', washA: 1, w: 1, col: L }); pencil([[x + 22, y - 14], [x + 30, y - 12]], { w: 3, col: '#e0a020', pass2: false }); }   // куры
  }
  function front(t) {                                               // передний план: белые блоки с разметкой и инструмент, лён у края
    for (const [x, y, w, h] of [[-40, 2080, 300, 200], [1120, 2100, 280, 180]]) { rect(x - w / 2, y - h, w, h, { wash: TV.stone, washA: 1, w: 2.6, col: L, shade: { gap: 8, a: 0.2, col: TV.stoneS, ang: 0.8 } }); pencil([[x - w / 2 + 20, y - h + 40], [x + w / 2 - 30, y - h + 40]], { w: 2, col: '#c8302a', a: 0.7, pass2: false }); }
    pencil([[60, 1890], [210, 1830]], { w: 10, col: '#6a4a2a', pass2: false }); rect(196, 1806, 40, 40, { wash: '#7a7a7a', washA: 1, w: 2, col: L });   // молоток-киянка
    for (let i = 0; i < 6; i++) { const x = 980 + i * 22; pencil([[x, 1960], [x + Math.sin(t * 2 + i) * 8, 1780 - i * 6]], { w: 3, col: '#4a6a2a', pass2: false }); ell(x + Math.sin(t * 2 + i) * 8, 1774 - i * 6, 10, 10, { wash: '#7aa0e0', washA: 1, w: 1.2, col: L }); }
  }
  function hud(t) {
    if (t > EV.sb_moscow - 0.05 && t < EV.sb_score + 0.2) { const q = popK(t, EV.sb_moscow - 0.05, 0.35); push(830, 980, q, 0.04);   // «тем временем в Москве»
      ell(0, 0, 190, 140, { wash: '#f4ecd6', washA: 0.95, w: 3, col: L }); for (let k = 0; k < 3; k++) ell(-150 + k * 30, 150 + k * 26, 14 - k * 4, 12 - k * 3, { wash: '#f4ecd6', washA: 0.95, w: 2, col: L });
      for (const [x, w, h] of [[-90, 60, 50], [-20, 70, 60], [60, 56, 46]]) izba(x, 40, w, h, t, { roof: '#7a5a3a' }); palisade(-160, 160, 60, 40, t, { col: '#8a6440', seed: 23209 });
      txt('МОСКВА: ДЕРЕВО', 0, -82, 34, { col: '#7a1a12', font: 'Osw' }); pop(); }
    if (t > EV.sb_score - 0.05) scoreHud(t, 1, 0, { t0: EV.sb_score - 0.05, side: -1 });
  }
  WORLD.sobor = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => far(t));
    lay(6, () => kremlin(t));
    lay(4, () => cathedral(t));
    lay(2.2, () => yard(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    motes(40, [-200, 500, 1300, 1700], '#ffffff', t, 23210, { sp: 10, vx: 30, sz: 2.6, a: 0.5, wob: 20 });   // каменная пыль
    rays(260, 300, Math.PI / 2 + 0.6, 1.2, 1500, 'rgba(255,246,210,0.5)', 0.08, 7, t);
    haze('#e8e4d0', 0.05);
  };
  DIR.sobor = {
    outfit: 'rubakha', light: { side: -1, rim: '#fff4d0' }, grade: ['#d8d0a8', 0.1],
    act: () => [[S0.sobor, 'talk'], [EV.sb_white, 'proud'], [EV.sb_wood, 'smug'], [EV.sb_score, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1560, s: 1.0, look: t < EV.sb_wood ? [0.7, -0.7] : [0.6, -0.4], tailUp: t > EV.sb_white,
      point: t > EV.sb_white && t < EV.sb_wood ? 1 : undefined, hand: t > EV.sb_white && t < EV.sb_wood ? [220, -380] : t > EV.sb_score ? [90, -330] : undefined }),
    cam: () => [[S0.sobor, 600, 900, 0.18], [EV.sb_white, 600, 860, 0.04, 'x'], [EV.sb_wood, 620, 960, 0.1], [EV.sb_score, 600, 980, 0.14], [S1.sobor, 600, 960, 0.16]],
    hud
  };
  TRANS_IN.sobor = { a: 0.15, b: 0.4, fx(k, t, A, B) {             // печать: опускается на кадр и поднимается, оставляя оттиск-окно в 1285
    const down = sm(clamp(k / 0.45)), up = sm(clamp((k - 0.45) / 0.55));
    drawBuf(A); if (k > 0.45) inCircle(540, 960, lerp(380, 1400, up), () => drawBuf(B));
    scr(() => { const r = lerp(900, 400, down) * (1 + up * 0.2), y = 960 - up * 1500; if (up < 1) {
      ell(540, y, r, r, { wash: '#a8302a', washA: 1, w: 4, col: TV.ink, shade: { gap: 9, a: 0.25, col: '#3a0a08', ang: 0.8 } }); ell(540, y, r * 0.75, r * 0.75, { line: true, w: 5, col: '#3a0a08' });
      txt('1285', 540, y + r * 0.12, r * 0.4, { col: '#f0d8b0', font: 'Osw' }); }
      if (k > 0.4 && k < 0.6) glow(540, 960, 600, 'rgba(255,200,160,1)', 0.5); });
  } };
})();
