/* 033 — сцена `hook`. 0–1,25 с: глобус по смыслу — Европа → подсвечена Украина → наезд точно в Чернобыль: метки «ЧЕРНОБЫЛЬ · 1193»
   и «ЧАЭС · 1970», пунктир 15 км → облачная вспышка → апрельское утро у въезда в зону (КПП «Дитятки»). Главный свет — низкое солнце
   справа, длинные тени влево. Туристка (второй голос, guest1) с телефоном спрашивает: «Чернобыль — это где реактор взорвался?»
   Том входит шагом; на «Мимо!» — красный штамп «✗» на её карте в телефоне; на «пятнадцати» — пунктирная стрелка «15 КМ» к арке
   вдали; на «восемьсот» Том хлопает по бетонной стеле «ЧОРНОБИЛЬ» — выскакивает плашка «1193»; на «Отматываем» — дозиметр в лапе.
   Планы отдаются в window.HQ (кнопка возвращается сюда — петля). */
(() => {
  const G1 = 1.25, L = CH.ink, SUN = [980, 520];
  EV.hk_zoom = 0.38; EV.hk_land = G1;
  EV.hk_ask = LS('guest1'); EV.hk_miss = wtk('h1', 'Мимо!'); EV.hk_15 = wtk('h1', 'пятнадцати'); EV.hk_800 = wtk('h1', 'восемьсот'); EV.hk_go = wtk('h2', 'Отматываем');
  KEYW.push('Мимо!', 'километрах.');
  function sky(t) { vgrad(-900, 1100, ['#5a8ac8', '#9ac4e8', '#f0e0b8', '#f8c890'], 1); glow(SUN[0], SUN[1], 240, 'rgba(255,230,170,1)', 0.45); ell(SUN[0], SUN[1], 56, 56, { wash: '#fff6d8', washA: 1, line: false });
    for (let i = 0; i < 5; i++) { const r = rng(5100 + i), y = 260 + i * 70, dx = (t * 10 + i * 40) % 220; blob([[-200 + r() * 300 + dx, y], [300 + dx, y - 20], [820 + dx, y - 6], [1300, y + 12], [300, y + 18]], { wash: '#fff6e6', washA: 0.5, line: false }); }
    for (let i = 0; i < 4; i++) { const x = 200 + i * 140 + Math.sin(t * 1.2 + i) * 30, y = 520 + (i % 2) * 36; pencil([[x - 12, y - Math.sin(t * 9 + i) * 6], [x, y], [x + 12, y - Math.sin(t * 9 + i) * 6]], { w: 3, col: '#3a3a42', pass2: false }); } }
  function far(t) { hills(1040, 24, '#6a8a6a', 3.1); archNSC(860, 1040, 0.34, t, { col: '#d8e2ea' });
    for (let i = 0; i < 16; i++) { const r = rng(5120 + i); polPine(-120 + i * 85 + r() * 40, 1060, 220 + r() * 90, t, i, { col: '#3a5a3a', colD: '#2a4430' }); }
    depthFog('#f0e0c8', 0.08); }
  function checkpoint(t) {                                           // КПП: будка, шлагбаум, микроавтобус экскурсии, группа туристов с гидом
    push(150, 1230, 0.8); rect(-120, -260, 240, 260, { wash: '#e0dcd0', washA: 1, w: 2.4, col: L, shade: { gap: 10, a: 0.08, col: '#6a6a6a', ang: 1.4 } }); poly([[-140, -260], [0, -310], [140, -260]], { wash: '#5a6a7a', washA: 1, w: 2, col: L });
    rect(-90, -220, 180, 90, { wash: '#a8c8d8', washA: 1, w: 1.6, col: L }); rect(-130, -300, 260, 40, { wash: '#1e5aa8', washA: 1, w: 2, col: L }); txt('КПП «ДИТЯТКИ»', 0, -278, 26, { col: '#ffffff', font: 'Osw' }); pop();
    push(300, 1230, 0.8); pencil([[0, -90], [0, 0]], { w: 10, col: '#4a4a52', pass2: false }); const ba = -0.05 + Math.sin(t * 0.6) * 0.02; push(0, -90, 1, ba); for (let i = 0; i < 6; i++) rect(i * 70, -10, 70, 20, { wash: i % 2 ? CH.white : CH.red, washA: 1, w: 1.4, col: L }); pop(); pop();
    push(860, 1240, 0.62); rect(-230, -200, 440, 170, { wash: '#f2f0e8', washA: 1, w: 2.4, col: L }); for (let i = 0; i < 5; i++) rect(-210 + i * 76, -186, 62, 62, { wash: '#6a8aa0', washA: 1, w: 1.4, col: L });
    rect(-230, -100, 440, 26, { wash: '#2a8a5a', washA: 1, w: 1.2, col: L }); txt('CHERNOBYL TOUR', -10, -86, 22, { col: '#ffffff', font: 'Osw' }); for (const k of [-140, 130]) ell(k, -26, 32, 32, { wash: '#1e1e22', washA: 1, w: 2, col: L }); pop();
    const G = [[560, '#c84a3a', 'cap', '#2a2a30', 'phone'], [640, '#3a6aa8', null, null, 'hold'], [720, '#e8b030', 'scarf', '#5a3a6a', 'hold'], [1000, '#2a8a6a', 'cap', '#e8e0d0', 'phone'], [1080, '#7a4a8a', null, null, 'hold']];
    G.forEach(([x, c, h, hc, a], i) => human(x, 1270, 0.6, t, { body: c, skin: ['#e2b48e', '#d8a47e', '#f0c8a0'][i % 3], hat: h, hatCol: hc, legs: '#2a2a36', armR: a === 'phone' ? 'hold' : 'swing', prop: a === 'phone' ? 'phone' : undefined, flip: x > 800 ? -1 : 1, seed: 5130 + i, face: t > EV.hk_miss ? 'shock' : 'smile' }));
    push(460, 1270, 0.62); human(0, 0, 1, t, { body: '#3a4a3a', hat: 'cap', hatCol: '#3a4a3a', legs: '#2a2a2a', armR: 'wave', seed: 5140, face: 'grin' }); pencil([[50, -150], [56, -330]], { w: 4, col: '#4a4a4a', pass2: false }); poly([[56, -330], [130, -312], [56, -290]], { wash: CH.dos, washA: 1, w: 2, col: L }); pop();
  }
  function ground(t) {                                               // старый асфальт с трещинами, обочина, трава, полынь, стела-указатель
    rect(-500, 1290, 2200, 1000, { wash: '#7a9a4a', washA: 1, w: 2, col: L, shade: { gap: 13, a: 0.1, col: '#3a5a22', ang: 0.3 } });
    poly([[-500, 1420], [1600, 1360], [1600, 1600], [-500, 1700]], { wash: '#6a6a6e', washA: 1, w: 2, col: L }); const r = rng(5150);
    for (let i = 0; i < 14; i++) { const x = r() * 1800 - 300, y = 1400 + r() * 230; pencil([[x, y], [x + 30, y + 8], [x + 50, y - 4], [x + 90, y + 6]], { w: 1.6, col: '#2a2a2e', a: 0.6, pass2: false }); if (i % 3 === 0) pencil([[x + 40, y], [x + 46, y - 18], [x + 52, y]], { w: 2, col: '#5a8a2a', pass2: false }); }
    for (let i = 0; i < 6; i++) rect(-300 + i * 340, 1520 - i * 10, 160, 10, { wash: '#f0ece0', washA: 0.8, line: false });
    for (let i = 0; i < 40; i++) ell(r() * 2000 - 400, 1300 + r() * 110, 5 + r() * 12, 3 + r() * 5, { wash: i % 2 ? '#5a7a2a' : '#a8c060', washA: 1, w: 1, col: L, a: 0.4 });
    for (let i = 0; i < 9; i++) ell(-200 + i * 220, 1780 + (i % 2) * 40, 40, 14, { wash: '#5a7a2a', washA: 1, line: false });
    for (let i = 0; i < 70; i++) { const x = r() * 1900 - 400, y = 1640 + r() * 400, h = 14 + r() * 26, c = i % 3 ? '#3e6a22' : '#8ab040'; pencil([[x - 8, y], [x - 4, y - h]], { w: 2.4, col: c, pass2: false }); pencil([[x, y], [x + 2, y - h * 1.2]], { w: 2.4, col: c, pass2: false }); pencil([[x + 8, y], [x + 10, y - h * 0.8]], { w: 2.4, col: c, pass2: false });
      if (i % 7 === 0) { ell(x + 2, y - h * 1.2, 7, 7, { wash: '#f8d830', washA: 1, w: 1, col: '#6a5a10' }); } }
    push(560, 1840, 1); blob([[-170, 0], [-120, -40], [80, -46], [180, -10], [100, 30], [-120, 26]], { wash: '#8ab8d8', washA: 1, w: 2, col: L }); pencil([[-100, -10], [60, -14]], { w: 3, col: '#e8f6ff', a: 0.7, pass2: false }); pop();
    push(-80, 1930, 1, 0.3); rect(-60, -110, 120, 110, { wash: '#a8582a', washA: 1, w: 2, col: L, shade: { gap: 7, a: 0.25, col: '#4a1a08', ang: 0.9 } }); trefoil(0, -56, 30, '#16120c', CH.dos, 1); pop();
    roadSign(170, 1380, 1.0, t, 'zone'); lightPool(620, 1560, 900, 180, 'rgba(255,224,160,1)', 0.3); castShadow(430, 1640, 110, 600, -2.6, 0.32); castShadow(780, 1600, 90, 460, -2.6, 0.3);
    for (let i = 0; i < 3; i++) mugwort(980 + i * 70, 1720 + i * 30, 1.0 + i * 0.1, t, 20 + i);
    push(1010, 1500, 1); rect(-40, -26, 80, 26, { wash: '#3a6a9a', washA: 1, w: 2, col: L }); pencil([[-30, -26], [-24, -44], [24, -44], [30, -26]], { w: 3, col: L, pass2: false }); pop();
    moodDark(200, 1000, 1200, 1900, '#1a2a14', 0.16);
  }
  function guest(t) {                                                // туристка: светлая куртка, рюкзак, телефон с картой; говорит на guest1
    const talk = t > EV.hk_ask && t < LE('guest1'), mouth = talk && Math.sin(t * 22) > 0;
    human(800, 1640, 1.05, t, { body: '#e86a8a', bodyD: '#8a2a4a', skin: '#f0c8a0', hat: 'bun', hatCol: '#e8c060', long: 1, legs: '#2a3a5a', armR: 'hold', armL: talk ? 'wave' : 'swing', prop: 'phone', flip: -1, seed: 5160, face: t > EV.hk_miss ? 'shock' : (mouth ? 'grin' : 'smile') });
    push(800 + 46, 1640 - 380 * 1.05, 1); rect(-20, -20, 40, 30, { wash: '#2a6a5a', washA: 1, w: 1.6, col: L }); pop();
    if (t > EV.hk_ask) { const k = popK(t, EV.hk_ask + 0.1, 0.3); push(700, 1180, 0.9 * k, 0.05); rect(-70, -120, 140, 230, { wash: '#16161a', washA: 1, w: 3, col: L }); rect(-60, -108, 120, 196, { wash: '#cfe0a8', washA: 1, line: false });
      pencil([[-50, -60], [60, 20]], { w: 6, col: '#3a86b8', pass2: false }); trefoil(10, -30, 22, '#16120c', CH.dos, 1); txt('реактор', 0, 50, 24, { col: L, font: 'Osw' });
      if (t > EV.hk_miss) { const s = popK(t, EV.hk_miss, 0.25); push(10, -20, 1.6 - 0.6 * s, -0.2); pencil([[-60, -60], [60, 60]], { w: 18, col: CH.red, pass2: false }); pencil([[60, -60], [-60, 60]], { w: 18, col: CH.red, pass2: false }); pop(); }
      pop(); }
  }
  function front(t) { for (const x of [-150, 1240]) { sil([[x - 40, 2300], [x - 28, 400], [x + 28, 400], [x + 40, 2300]], '#3a2418', 1); for (let i = 0; i < 3; i++) blob([[x - 220, 420 + i * 120], [x, 340 + i * 120], [x + 220, 420 + i * 120], [x, 470 + i * 120]], { wash: '#1e3420', washA: 1, line: false }); } for (let i = 0; i < 3; i++) mugwort(-60 + i * 50, 1960, 1.6, t, 40 + i); }
  function hud15(t) {                                                // пунктир «15 КМ» к арке вдали
    if (t < EV.hk_15 || t > EV.hk_go) return; const k = clamp((t - EV.hk_15) / 0.6); scr(() => { const a = [520, 1060], b = [900, 940], m = [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
      pencil([a, m], { w: 8, col: '#fff6e0', pass2: false, gap: true }); if (k > 0.6) chLabel(640, 900, 'РЕАКТОР · 15 КМ', 40, { a: (k - 0.6) / 0.4 }); });
  }
  window.HQ = { sky, far, checkpoint, ground, front };
  WORLD.hook = (t, u, cat) => {
    if (t < G1) { lay(1, () => GLOBE.intro(t, Object.assign({ t1: G1 }, CH_GLOBE))); return; }
    lay(40, () => sky(t)); lay(14, () => far(t)); lay(3.4, () => { checkpoint(t); depthFog('#f8e8c8', 0.04); }); lay(1, () => { ground(t); guest(t); cat(); }); lay(0.6, () => front(t));
    lay(2.2, () => motes(18, [-100, 700, 1200, 1500], '#fff6c8', t, 5170, { sp: 2, sz: 2.4, a: 0.45, wob: 18, add: 1 }));
    hud15(t);
    if (t > EV.hk_800 && t < EV.hk_go + 0.2) lay(1, () => chBoard(330, 960, 1, t, EV.hk_800, [['ЧЕРНОБЫЛЬ', 46, '#ffe08a'], ['С 1193 ГОДА', 54]], { w: 420 }));
    GLOBE.burst(t, G1);
  };
  DIR.hook = {
    outfit: 'hoodieCH', light: { side: 1, rim: '#ffe0a0' }, grade: ['#2a2010', 0.05],
    act: () => [[0, 'awe'], [EV.hk_land, 'suspicious'], [EV.hk_ask, 'sideeye'], [EV.hk_miss, 'grin'], [EV.hk_15, 'smug'], [EV.hk_800, 'proud'], [EV.hk_go, 'grin']],
    pose: (t, u, b) => { const w1 = clamp((t - G1) / 0.9), x = lerp(-60, 400, sm(w1)), slap = t > EV.hk_800 && t < EV.hk_800 + 0.5;
      return Object.assign(b, { x, y: 1660, s: 1.0, walk: w1 < 1 ? t * 9 : 0, look: t < EV.hk_miss ? [0.8, -0.2] : t < EV.hk_800 ? [0.6, -0.5] : [-0.6, -0.3],
        point: t > EV.hk_miss && t < EV.hk_800, hand: slap ? [-180, -320] : t > EV.hk_go ? [170, -360] : [160, -300], squash: slap ? 0.06 * (1 - (t - EV.hk_800) / 0.5) : b.squash, tailUp: t > EV.hk_go }); },
    afterCat: (t, u, P) => { if (t > EV.hk_go - 0.1) dosimeter(P.x + P.hand[0] * P.s, P.y + P.hand[1] * P.s, 0.9, t, { needle: (t - EV.hk_go) * 9, blink: 1 }); },
    cam: () => [[0, 540, 960, 0], [G1, 540, 960, 0], [G1 + 0.01, 600, 940, -0.1], [G1 + 0.8, 560, 1000, -0.02], [EV.hk_miss, 600, 1080, 0.1, 'x'], [EV.hk_15, 700, 1000, 0.02], [EV.hk_800, 420, 1080, 0.08, 'x'], [EV.hk_go, 460, 1160, 0.14], [S1.hook, 470, 1200, 0.22]]
  };
  TRANS_IN.tunnel = { a: 0.15, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(A, 1 + e * 0.6); inCircle(560, 1250, e * 1500, () => drawBuf(B)); scr(() => { if (e > 0.02 && e < 0.98) pencil(ellPts(560, 1250, e * 1500, e * 1500, 0, 0, 80), { w: 18, col: CH.dos, pass2: false, gap: false }); }); } };
})();
