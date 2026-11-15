/* 028 — сцена `hook`: 2026, набережная Казанки на закате. За рекой — панорама кремля: белые стены, Спасская башня, Сююмбике,
   Благовещенский собор, бирюзовый купол Кул-Шарифа; на воде прогулочный катер, на набережной гуляющие, велосипедист, чак-чак в лотке.
   Рядом с Томом — табло «КАЗАНЬ 1005 : 1147 МОСКВА». На «старше» Том ставит на табло торт со свечой «1000» и тычет в счёт,
   на «полтора века» на табло вспыхивает «+142», на «Кто» — «?». На «Отматываем» в лапе у Тома половник. Главный свет — закатное
   солнце справа (тёплое), второй — сиреневое небо. Планы — window.KQ для today/button. */
(() => {
  EV.hk_old = wtk('h1', 'старше');
  EV.hk_142 = wtk('h1', 'полтора');
  EV.hk_who = wtk('h1', 'Кто');
  KEYW.push('старше', 'века.', 'решил?');
  SHAKES.push([EV.hk_old + 0.1, 0.2, 7]);
  const L = KZ.ink, SUN = [900, 840];
  function sky(t) { vgrad(-900, 1200, ['#2a2a5a', '#7a4a7a', '#e8885a', '#ffd08a'], 1); glow(SUN[0], SUN[1], 240, 'rgba(255,210,140,1)', 0.45); ell(SUN[0], SUN[1], 60, 60, { wash: '#fff2c8', washA: 1, line: false });
    for (let i = 0; i < 5; i++) { const r = rng(3700 + i), y = 420 + i * 80; blob([[-200 + r() * 300, y], [300 + r() * 400, y - 26], [800 + r() * 300, y - 8], [1300, y + 14], [300, y + 26]], { wash: i < 2 ? '#9a5a8a' : '#f0905a', washA: 0.32, line: false }); } }
  function panorama(t) {                                             // кремль на холме против заката
    hills(1000, 40, '#6a5070', 3701); kWall(-300, 1400, 1010, 70, t, { col: '#e8dccc' });
    kTower(-40, 1010, 0.45, t); kTower(260, 1010, 0.5, t, { spire: true }); annunc(470, 960, 0.5, t); suyum(700, 980, 0.5, t, { lit: 1 }); kulsharif(960, 970, 0.55, t, { lit: 1 }); kTower(1240, 1010, 0.45, t);
    depthFog('#e8907a', 0.07);
  }
  function river(t) { volga(1010, 1320, t, 3702); push(560 - (t * 18) % 200, 1150, 0.45); shape([[-200, -30], [200, -30], [180, 20], [-180, 20]], { wash: '#f4f0e8', washA: 1, w: 2, col: L }); rect(-120, -90, 220, 60, { wash: '#e8e0d0', washA: 1, w: 1.6, col: L }); for (let k = 0; k < 6; k++) rect(-110 + k * 36, -80, 24, 24, { wash: '#ffe0a0', washA: 1, w: 1, col: L }); pop();
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.35; for (let i = 0; i < 20; i++) { ctx.fillStyle = '#ffc890'; ctx.fillRect(SUN[0] - 120 + Math.sin(i * 7) * 120, 1020 + i * 14, 60 - i * 2, 4); } ctx.restore(); }
  function embank(t) {                                               // набережная: перила, фонари, люди, велосипедист
    rect(-400, 1320, 1900, 26, { wash: '#c8b8a0', washA: 1, w: 2, col: L }); for (let i = 0; i < 24; i++) pencil([[-380 + i * 80, 1322], [-380 + i * 80, 1250]], { w: 4, col: '#3a3a42', pass2: false }); pencil([[-400, 1252], [1500, 1252]], { w: 6, col: '#3a3a42', pass2: false });
    for (const x of [-60, 520, 1140]) { pencil([[x, 1320], [x, 1050]], { w: 7, col: '#2a2a30', pass2: false }); ell(x, 1040, 18, 22, { wash: '#ffe8a8', washA: 1, w: 2, col: L }); glow(x, 1040, 60, 'rgba(255,220,150,1)', 0.25); }
    const P = [[40, '#2a8a4a', 'cap', 'phone'], [180, '#c83a5a', 'scarf', 'hold'], [960, '#3a5a8a', null, 'wave'], [1100, '#e8c050', 'scarf', 'hold'], [1260, '#6a3a6a', 'cap', 'phone']];
    P.forEach(([x, c, h, a], i) => human(x, 1326, 0.56, t, { body: c, hat: h, hatCol: h === 'scarf' ? '#e8c050' : '#2a2a30', legs: '#2a2a32', hair: i % 2 ? '#c8a050' : '#2a1a10', armR: a === 'phone' ? 'hold' : a, prop: a === 'phone' ? 'phone' : undefined, flip: x > 600 ? -1 : 1, seed: 3710 + i, face: 'smile' }));
    const bx = ((t * 120) % 1800) - 300; push(bx, 1326, 0.55); for (const k of [-60, 60]) ell(k, -30, 34, 34, { line: true, w: 5, col: '#3a3a42' }); pencil([[-60, -30], [0, -80], [60, -30]], { w: 5, col: KZ.green, pass2: false }); human(0, -40, 0.9, t, { body: '#e85a2a', armR: 'point', seed: 3720, face: 'smile' }); pop();
  }
  function ground(t) {                                               // плитка под Томом, табло, торт, лоток чак-чака
    rect(-400, 1400, 1900, 900, { wash: '#a8907a', washA: 1, w: 2, col: L }); for (let j = 0; j < 8; j++) for (let i = 0; i < 20; i++) rect(-400 + i * 100 + (j % 2) * 50, 1404 + j * 60, 98, 58, { wash: (i + j) % 3 ? '#b8a08a' : '#9a826c', washA: 1, w: 1.1, col: '#5a4a3a' });
    lightPool(560, 1620, 600, 140, 'rgba(255,200,130,1)', 0.45);
    push(760, 1600, 1); pencil([[-140, 0], [-140, -420]], { w: 8, col: '#2a2a30', pass2: false }); pencil([[140, 0], [140, -420]], { w: 8, col: '#2a2a30', pass2: false }); rect(-220, -640, 440, 240, { wash: '#14100a', washA: 1, w: 3, col: KZ.goldL });
    txt('КАЗАНЬ', -110, -600, 32, { col: KZ.turqL, font: 'Osw' }); txt('МОСКВА', 110, -600, 32, { col: '#ff9a8a', font: 'Osw' }); txt('1005', -110, -520, 70, { col: KZ.turqL, font: 'Osw' }); txt(':', 0, -520, 70, { col: KZ.goldL, font: 'Osw' }); txt('1147', 110, -520, 70, { col: '#ff9a8a', font: 'Osw' });
    if (t > EV.hk_142 - 0.05) { const q = popK(t, EV.hk_142 - 0.05, 0.3); push(-110, -440, q); txt('+142 ГОДА', 0, 0, 34, { col: KZ.goldL, font: 'Osw' }); pop(); }
    if (t > EV.hk_who - 0.05) { const q = popK(t, EV.hk_who - 0.05, 0.3); push(250, -680, q, 0.1); txt('?', 0, 0, 150, { col: KZ.goldL, font: 'Osw' }); pop(); } pop();
    push(1080, 1640, 1); rect(-90, -120, 180, 120, { wash: '#8a5a2a', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) blob([[-60 + q * 50, -120], [-40 + q * 50, -170], [-20 + q * 50, -120]], { wash: '#e8a83a', washA: 1, w: 1.4, col: '#6a3a10' }); txt('ЧАК-ЧАК', 0, -60, 26, { col: KZ.goldL, font: 'Osw' }); pop();
    push(520, 1700, 0.9); ell(0, -16, 22, 14, { wash: '#8a8e9a', washA: 1, w: 1.4, col: KZ.ink }); ell(18, -28, 10, 9, { wash: '#7a7e8a', washA: 1, w: 1.2, col: KZ.ink }); poly([[26, -28], [36, -26], [26, -24]], { wash: '#e8a83a', washA: 1, line: false }); pencil([[-4, -4], [-6, 6]], { w: 2, col: '#c84a3a', pass2: false }); pencil([[6, -4], [8, 6]], { w: 2, col: '#c84a3a', pass2: false }); pop(); push(580, 1720, 0.9); ell(0, -16, 22, 14, { wash: '#8a8e9a', washA: 1, w: 1.4, col: KZ.ink }); ell(18, -28, 10, 9, { wash: '#7a7e8a', washA: 1, w: 1.2, col: KZ.ink }); poly([[26, -28], [36, -26], [26, -24]], { wash: '#e8a83a', washA: 1, line: false }); pencil([[-4, -4], [-6, 6]], { w: 2, col: '#c84a3a', pass2: false }); pencil([[6, -4], [8, 6]], { w: 2, col: '#c84a3a', pass2: false }); pop(); push(640, 1690, 0.9); ell(0, -16, 22, 14, { wash: '#8a8e9a', washA: 1, w: 1.4, col: KZ.ink }); ell(18, -28, 10, 9, { wash: '#7a7e8a', washA: 1, w: 1.2, col: KZ.ink }); poly([[26, -28], [36, -26], [26, -24]], { wash: '#e8a83a', washA: 1, line: false }); pencil([[-4, -4], [-6, 6]], { w: 2, col: '#c84a3a', pass2: false }); pencil([[6, -4], [8, 6]], { w: 2, col: '#c84a3a', pass2: false }); pop();   // голуби
    push(180, 1640, 1); rect(-90, -40, 180, 16, { wash: '#6a4424', washA: 1, w: 1.6, col: L }); rect(-90, -90, 180, 14, { wash: '#6a4424', washA: 1, w: 1.6, col: L }); for (const k of [-70, 70]) pencil([[k, -24], [k, 0]], { w: 5, col: '#2a2a30', pass2: false }); pop();   // скамья
    castShadow(330, 1612, 120, 480, -0.3, 0.4); moodDark(SUN[0], 1100, 800, 1600, '#1a1030', 0.4);
  }
  function cake(x, y, s, t) { push(x, y, s); const L2 = KZ.ink; rect(-80, -70, 160, 70, { wash: '#f4e8d8', washA: 1, w: 2, col: L2 }); rect(-80, -70, 160, 16, { wash: KZ.pom, washA: 1, line: false }); rect(-26, -130, 52, 60, { wash: '#f4e8d8', washA: 1, w: 1.6, col: L2 }); txt('1000', 0, -100, 22, { col: KZ.pom, font: 'Osw' }); pencil([[0, -130], [0, -160]], { w: 4, col: '#e8e0c0', pass2: false }); const f = Math.sin(t * 14) * 0.2 + 1; blob([[-6, -160], [0, -182 * f], [6, -160]], { wash: '#ffb44a', washA: 1, line: false }); glow(0, -170, 30, 'rgba(255,200,120,1)', 0.4); pop(); }
  function front(t) { for (const x of [-60, 1150]) { sil([[x - 40, 2200], [x - 40, 1480], [x + 40, 1480], [x + 40, 2200]], '#1a1418', 1); ell(x, 1480, 50, 20, { wash: '#1a1418', washA: 1, line: false }); } for (let i = 0; i < 10; i++) { const x = -40 + i * 130; sil([[x - 26, 2200], [x - 6, 1880 - (i % 3) * 50], [x + 10, 1890], [x + 26, 2200]], '#2a2a1a', 1); } }
  window.KQ = { sky, panorama, river, embank, ground, front };
  WORLD.hook = (t, u, cat) => {
    lay(40, () => sky(t)); lay(16, () => panorama(t)); lay(7, () => river(t)); lay(2.8, () => { embank(t); depthFog('#e8907a', 0.04); }); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2.2, () => motes(24, [-100, 800, 1200, 1500], '#ffd8a0', t, 3725, { sp: 5, sz: 2.4, a: 0.5, wob: 18, add: 1 }));
  };
  DIR.hook = {
    outfit: 'hoodieKZN', light: { side: 1, rim: '#ffc080' }, grade: ['#3a1a40', 0.08],
    act: () => [[0, 'shock'], [EV.hk_old, 'proud'], [EV.hk_142, 'smug'], [EV.hk_who, 'suspicious'], [EV.h2, 'grin']],
    pose: (t, u, b) => { const poke = t > EV.hk_old - 0.1 && t < EV.hk_who; return Object.assign(b, { x: 360, y: 1612, s: 1.0, look: t < EV.hk_who ? [0.8, -0.6] : [0.2, -0.3], hand: t < EV.h2 ? [160, -330] : [170, -420], handF: poke ? [280, -560] : undefined, tailUp: t > EV.hk_old }); },
    afterCat: (t, u, P) => { const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; if (t < EV.h2) cake(x + 10, y + 30, 1, t); else { push(x, y, 1, -0.6); pencil([[0, 60], [0, -200]], { w: 9, col: KZ.woodD, pass2: false }); ell(0, -220, 40, 26, { wash: '#6a6a72', washA: 1, w: 2, col: L }); pop(); } },
    cam: () => [[0, 600, 1040, 0.06], [EV.hk_old, 640, 1000, 0.12, 'x'], [EV.hk_142, 660, 980, 0.1], [EV.hk_who, 600, 1000, 0.06], [EV.h2, 480, 1080, 0.12], [S1.hook, 460, 1120, 0.2]]
  };
  TRANS_IN.tunnel = { a: 0.15, b: 0.35, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.translate(540, 1300); ctx.rotate(e * 2.4); ctx.scale(1 - e * 0.8, 1 - e * 0.8); ctx.drawImage(A, -540, -1300); ctx.restore(); }); } };
})();
