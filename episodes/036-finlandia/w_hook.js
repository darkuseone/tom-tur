/* 036 — сцена `hook`. 0–1,25 с: глобус — Скандинавия, Финляндия подсвечена между Швецией и Россией (две пунктирные стрелки) →
   наезд в Хельсинки → облачная вспышка → Сенатская площадь ранней зимой: белый Кафедральный собор с зелёными куполами на лестнице,
   жёлтые здания Энгеля, в центре — бронзовый Александр II на гранитном постаменте, зелёный трамвай, рождественские домики, люди.
   Главный свет — низкое золотое солнце слева, тёплые окна и фонари. Туристка (второй голос, guest1) показывает на памятник:
   «Это что, русский царь? В центре Хельсинки?»; на «Именно!» Том указывает; на «сто тридцать» — плашка «1894 → 2026 = 132 ГОДА».
   Планы — window.HQ (кнопка возвращается сюда — петля). */
(() => {
  const G1 = 1.25, L = FIC.ink, SUN = [120, 600];
  EV.hk_zoom = 0.38; EV.hk_land = G1; EV.hk_ask = LS('guest1'); EV.hk_yes = wtk('h1', 'Именно!'); EV.hk_130 = wtk('h1', 'сто'); EV.hk_go = wtk('h2', 'Отматываем');
  KEYW.push('Хельсинки?', 'лет.');
  function sky(t) { vgrad(-900, 1100, ['#3a5a9a', '#9ab8d8', '#f8d8b0', '#f8b890'], 1); glow(SUN[0], SUN[1], 240, 'rgba(255,220,160,1)', 0.45); ell(SUN[0], SUN[1], 54, 54, { wash: '#fff2d8', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const y = 260 + i * 80, dx = (t * 9) % 200; blob([[-200 + dx, y], [300 + dx, y - 22], [900 + dx, y - 6], [1300, y + 12], [400, y + 18]], { wash: '#fff0e0', washA: 0.5, line: false }); }
    for (let i = 0; i < 4; i++) { const x = 600 + i * 120 + Math.sin(t + i) * 30, y = 520 + (i % 2) * 30; pencil([[x - 12, y - Math.sin(t * 9 + i) * 6], [x, y], [x + 12, y - Math.sin(t * 9 + i) * 6]], { w: 3, col: '#3a3a42', pass2: false }); } }
  function far(t) { cathedral(560, 1060, 0.62, t); engel(-80, 1060, 300, 220, t, { lit: 1 }); engel(1160, 1060, 300, 240, t, { lit: 1, cols: 1 }); depthFog('#f8e0c8', 0.07); }
  function square(t) {                                              // памятник, трамвай, домики, люди
    statueA2(640, 1240, 0.72, t, {}); const tx = 1500 - ((t * 90) % 2200); push(tx, 1230, 0.6); rect(-280, -200, 560, 170, { wash: '#3a8a4a', washA: 1, w: 2.4, col: L }); rect(-280, -60, 560, 30, { wash: '#e8e0c0', washA: 1, w: 1.4, col: L }); for (let q = 0; q < 7; q++) rect(-260 + q * 76, -186, 60, 70, { wash: '#ffe0a0', washA: 1, w: 1.4, col: L }); pencil([[0, -200], [30, -360]], { w: 3, col: '#2a2a2e', pass2: false }); for (const k of [-200, 200]) ell(k, -20, 24, 24, { wash: '#1e1e22', washA: 1, w: 2, col: L }); pop();
    for (let i = 0; i < 3; i++) { push(-40 + i * 150 + (i > 1 ? 900 : 0), 1260, 0.7); rect(-70, -110, 140, 110, { wash: '#8a3a2a', washA: 1, w: 2, col: L }); poly([[-90, -110], [0, -170], [90, -110]], { wash: '#f4f4f0', washA: 1, w: 2, col: L }); rect(-50, -90, 100, 50, { wash: '#ffd890', washA: 1, w: 1.4, col: L }); for (let q = 0; q < 6; q++) ell(-80 + q * 32, -110, 6, 6, { wash: ['#ffe060', '#ff8a4a'][q % 2], washA: 1, line: false }); pop(); }
    const P = [[260, '#1c3a7a', 'hold', 'phone', 'cap'], [360, '#c84a3a', 'swing', null, 'scarf'], [880, '#3a3a44', 'hold', null, 'fur'], [980, '#e8b030', 'wave', null, 'scarf'], [100, '#4a6a3a', 'hold', null, 'cap']];
    P.forEach(([x, c, a, pr, h], i) => human(x, 1310, 0.64, t, { body: c, skin: ['#f8d8c0', '#f0c8a0'][i % 2], hat: h, hatCol: ['#f4f4f0', '#c8281e', '#1c3a7a'][i % 3], legs: '#2a2a36', armR: a, prop: pr || undefined, long: h === 'scarf' ? 1 : undefined, flip: x > 600 ? -1 : 1, seed: 11300 + i, face: 'smile' }));
  }
  function ground(t) {                                              // брусчатка в снегу, сугробы, санки, фонарь, следы, голуби
    rect(-500, 1330, 2200, 1000, { wash: '#c8c4bc', washA: 1, w: 2, col: L }); const r = rng(11310); for (let i = 0; i < 100; i++) ell(r() * 2000 - 400, 1350 + r() * 700, 14 + r() * 14, 7 + r() * 5, { wash: i % 2 ? '#a8a49c' : '#dcd8d0', washA: 1, w: 1, col: L, a: 0.4 });
    for (let i = 0; i < 6; i++) blob([[-300 + i * 340, 1700 + (i % 2) * 140], [-200 + i * 340, 1660 + (i % 2) * 140], [-60 + i * 340, 1690 + (i % 2) * 140], [-120 + i * 340, 1720 + (i % 2) * 140]], { wash: '#ffffff', washA: 0.9, w: 1.2, col: '#a8b4c4' });
    push(940, 1720, 1); rect(-70, -30, 140, 14, { wash: FIC.red, washA: 1, w: 1.6, col: L }); for (const k of [-60, 60]) pencil([[k, -16], [k - 10, 0], [k + 20, 0]], { w: 4, col: '#4a4a4a', pass2: false }); pop();
    push(1120, 1640, 1); pencil([[0, 0], [0, -380]], { w: 7, col: '#2a2a2e', pass2: false }); rect(-30, -440, 60, 64, { wash: '#ffd890', washA: 1, w: 2, col: L }); glow(0, -408, 60, 'rgba(255,210,130,1)', 0.35); pop();
    for (let i = 0; i < 12; i++) ell(380 + i * 40, 1880 - i * 8, 8, 5, { wash: '#a8b4c4', washA: 1, line: false });
    lightPool(SUN[0] + 400, 1620, 900, 180, 'rgba(255,220,160,1)', 0.3); castShadow(420, 1700, 110, 600, 0.25, 0.3); moodDark(1100, 1000, 900, 1900, '#10182a', 0.16);
  }
  function guest(t) {                                               // туристка: шапка с помпоном, шарф, телефон; говорит на guest1
    const talk = t > EV.hk_ask && t < LE('guest1'), mouth = talk && Math.sin(t * 22) > 0;
    human(800, 1640, 1.05, t, { body: '#e86a8a', bodyD: '#8a2a4a', skin: '#f0c8a0', hat: 'scarf', hatCol: '#f4f4f0', long: 1, legs: '#2a3a5a', armR: 'hold', armL: talk ? 'wave' : 'swing', prop: 'phone', flip: -1, seed: 5160, face: t > EV.hk_yes ? 'shock' : (mouth ? 'grin' : 'smile') });
  }
  function front(t) { for (const x of [-150, 1240]) { pencil([[x, 2300], [x, 640]], { w: 16, col: '#2a2a2e', pass2: false }); ell(x, 620, 60, 30, { wash: '#2a2a2e', washA: 1, w: 2, col: L }); } }
  window.HQ = { sky, far, square, ground, front, guest };
  function extras2(t) {                                             // снеговик, дети с санками, продавец каштанов, собака в попоне, ёлка рынка
    push(-40, 1560, 0.9); ell(0, -40, 50, 44, { wash: '#ffffff', washA: 1, w: 2, col: L }); ell(0, -110, 36, 32, { wash: '#ffffff', washA: 1, w: 2, col: L }); ell(0, -160, 24, 22, { wash: '#ffffff', washA: 1, w: 2, col: L }); poly([[0, -160], [30, -154], [0, -150]], { wash: '#e8741e', washA: 1, line: false }); for (const d of [-1, 1]) pencil([[d * 36, -110], [d * 90, -150]], { w: 4, col: '#5a3a1a', pass2: false }); rect(-26, -200, 52, 20, { wash: '#1a1a1e', washA: 1, w: 1.4, col: L }); pop();
    for (let i = 0; i < 2; i++) human(80 + i * 60, 1560, 0.55, t, { body: ['#e8283a', '#2a8a5a'][i], hat: 'scarf', hatCol: '#f4f4f0', legs: '#2a2a36', armR: 'wave', seed: 11340 + i, face: 'grin' });
    push(1180, 1540, 0.85); rect(-70, -100, 140, 100, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); ell(0, -110, 60, 14, { wash: '#2a2a2e', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 6; q++) ell(-40 + q * 16, -120, 8, 7, { wash: '#8a4a2a', washA: 1, w: 1, col: L }); human(90, 0, 0.9, t, { body: '#5a4a3a', hat: 'fur', hatCol: '#3a2a1a', legs: '#2a2a2a', armR: 'hold', flip: -1, seed: 11345, face: 'smile' }); pop();
    push(1000, 1580, 0.7, 0, -1); blob([[-50, -10], [-40, -50], [30, -54], [56, -36], [50, -10]], { wash: '#c89a5a', washA: 1, w: 2, col: L }); rect(-40, -54, 70, 30, { wash: FIC.red, washA: 1, w: 1.2, col: L }); ell(66, -54, 20, 16, { wash: '#c89a5a', washA: 1, w: 1.6, col: L }); for (const lx of [-30, -14, 26, 40]) pencil([[lx, -14], [lx, 14]], { w: 6, col: '#8a5a30', pass2: false }); pop();
    push(560, 1500, 0.6); pineF(0, 0, 300, t, { snow: 1 }); for (let q = 0; q < 8; q++) ell(-60 + (q % 4) * 40, -60 - Math.floor(q / 4) * 80, 8, 8, { wash: ['#ffe060', '#ff4a3a'][q % 2], washA: 1, line: false }); pop();
  }
  WORLD.hook = (t, u, cat) => {
    if (t < G1) { lay(1, () => GLOBE.intro(t, Object.assign({ t1: G1 }, FI_GLOBE))); return; }
    lay(40, () => sky(t)); lay(14, () => far(t)); lay(3.2, () => { square(t); depthFog('#f8e8d8', 0.03); }); lay(1.5, () => extras2(t)); lay(1, () => { ground(t); guest(t); cat(); }); lay(0.6, () => front(t));
    lay(2.2, () => motes(30, [-100, 500, 1200, 1900], '#ffffff', t, 11320, { sp: 4, vx: -1, sz: 3, a: 0.7, wob: 10 }));
    if (t > EV.hk_130 - 0.1 && t < EV.hk_go) lay(1, () => fiBoard(330, 960, 1, t, EV.hk_130 - 0.1, [['1894 → 2026', 50, '#ffe08a'], ['= 132 ГОДА', 54]], { w: 420 }));
    GLOBE.burst(t, G1);
  };
  DIR.hook = {
    outfit: 'hoodieFI', light: { side: -1, rim: '#ffd8a0' }, grade: ['#1a2030', 0.05],
    act: () => [[0, 'awe'], [EV.hk_land, 'suspicious'], [EV.hk_ask, 'sideeye'], [EV.hk_yes, 'grin'], [EV.hk_130, 'smug'], [EV.hk_go, 'grin']],
    pose: (t, u, b) => { const w1 = clamp((t - G1) / 0.9), x = lerp(-60, 380, sm(w1)); return Object.assign(b, { x, y: 1660, s: 1.0, walk: w1 < 1 ? t * 9 : 0, look: t < EV.hk_yes ? [0.8, -0.2] : [0.5, -0.6], point: t > EV.hk_yes && t < EV.hk_go, hand: t > EV.hk_go ? [170, -360] : [160, -300], tailUp: t > EV.hk_go, frost: 0.3 }); },
    cam: () => [[0, 540, 960, 0], [G1, 540, 960, 0], [G1 + 0.01, 600, 940, -0.1], [G1 + 0.8, 560, 1000, -0.02], [EV.hk_yes, 600, 1000, 0.06, 'x'], [EV.hk_130, 560, 1040, 0.04], [EV.hk_go, 460, 1160, 0.14], [S1.hook, 470, 1200, 0.22]]
  };
  TRANS_IN.tunnel = { a: 0.15, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(A, 1 + e * 0.5); scr(() => { ctx.save(); ctx.globalAlpha = e; ctx.drawImage(B, 0, 0); ctx.restore(); for (let i = 0; i < 4; i++) pencil([[0, 300 + i * 80 + Math.sin(t * 3 + i) * 40], [W, 260 + i * 80]], { w: 30, col: i % 2 ? FIC.aur : FIC.aur2, a: 0.35 * Math.sin(e * Math.PI), pass2: false, gap: false }); }); } };
})();
