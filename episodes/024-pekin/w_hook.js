/* 024 — сцена `hook`: 2026, ночной зал музея в Пекине. Красные лаковые колонны, расписная балка, бумажные фонари, круглое «лунное» окно
   на ночной город (арка ЦТ, башня, угловая башня дворца), витрины с нефритом, свитки. В центре — стеклянная витрина под лучом прожектора:
   в первом кадре в ней череп «пекинского человека»; на 0,4 с он исчезает (пуф, пунктир, «?»). Том с фонарём стучит по стеклу — стекло звенит.
   На «сорок первом» — штамп «ПРОПАЛ · 1941», свет становится тревожно-красным; на «Где они?» луч прожектора шарит по залу.
   Главный свет — прожектор над витриной (+ тёплые фонари, холодная луна в окне). Планы отдаёт window.BQ — их переиспользуют today и button (петля). */
(() => {
  EV.hk_gone = 0.42;
  EV.hk_knock = wtk('h1', 'первого');
  EV.hk_stamp = wtk('h1', 'сорок');
  EV.hk_q = wtk('h1', 'Где');
  KEYW.push('Пропали!', 'первом.', 'Где', 'они?');
  SHAKES.push([EV.hk_gone, 0.25, 9], [EV.hk_stamp + 0.1, 0.3, 12]);
  const L = BJ.ink, CX = 720, CY = 1168;                            // центр черепа в витрине
  function sky(t, d = 0) {                                          // небо за окном: ночь с луной / тёплый день
    vgrad(-900, 1500, [lerpC('#070a22', '#6ab0d8', d), lerpC('#1a1c4a', '#a8d4e0', d), lerpC('#4a2a5a', '#f0e0b8', d), lerpC('#a8483a', '#f8d8a0', d)], 1);
    if (d < 0.5) { starsBJ(t, 90, [-200, 200, 1300, 1000], 2440, 1 - d * 2); glow(420, 560, 300, 'rgba(220,230,255,1)', 0.5); ell(420, 560, 62, 62, { wash: '#f4f0dc', washA: 1, w: 1.4, col: '#b8b090', a: 0.5 }); ell(402, 548, 14, 12, { wash: '#d8d0b0', washA: 0.7, line: false }); ell(440, 580, 9, 8, { wash: '#d8d0b0', washA: 0.7, line: false }); }
    else { glow(700, 520, 520, 'rgba(255,240,190,1)', 0.6); cloudsBJ(t, 380, 5, '#fff6e0', 2441, 0.8); birdsBJ(t, 6, [200, 400, 950, 800], 2442); }
    cloudsBJ(t, 640, 4, lerpC('#3a3a6a', '#fff0d8', d), 2443, 0.5, 5);
  }
  function far(t, d = 0) { skylineBJ(t, { night: 1 - d, base: 1140, zx: 700, ax: 460, tx: 860 }); depthFog(lerpC('#2a2050', '#f0e0c0', d), 0.22); }
  function mid(t, d = 0) {                                          // ближе за окном: угловая башня дворца, стена, гирлянда фонарей
    const c = lerpC('#1a1230', '#8a3a2a', d);
    rect(100, 1010, 900, 170, { wash: lerpC('#2a1428', BJ.red, d), washA: 1, w: 2, col: L }); rect(100, 990, 900, 26, { wash: lerpC('#3a2a3a', BJ.tile, d), washA: 1, w: 1.6, col: L });
    hallCN(560, 1010, 250, 110, { bays: 3, rh: 90, tiers: 1, wall: c, roof: { col: lerpC('#4a3a4a', BJ.tile, d), colD: lerpC('#1a1220', BJ.tileD, d), ev: 34 }, glowIn: 0.5 * (1 - d) });
    for (let i = 0; i < 9; i++) { const x = 190 + i * 92, y = 930 + Math.sin(i * 0.8) * 16 + 20; pencil([[x - 46, y - 34], [x, y - 26]], { w: 1.4, col: L, pass2: false }); ell(x, y, 13, 15, { wash: BJ.red, washA: 1, w: 1.2, col: L }); glow(x, y, 46, 'rgba(255,170,80,1)', 0.6 * (1 - d * 0.8) * flick(t, i)); }
  }
  function wall(t, d = 0, o = {}) {                                 // задняя стена: лак, лунное окно, фриз, свитки, витрины с нефритом
    moonGate(560, 800, 318, { col: lerpC('#5a1410', '#8e1f18', d), y1: 1420 });
    latticeBJ(242, 482, 636, 636, lerpC('#2a0c08', '#4a1810', d), 0.5, 6);
    rect(-900, 1330, 2900, 90, { wash: lerpC('#2a0e0c', '#4a1a14', d), washA: 1, w: 2, col: L }); meander(-300, 1500, 1352, 34, BJ.gold, 0.7);
    rect(-900, 150, 2900, 140, { wash: BJ.jadeD, washA: 1, w: 2.4, col: L }); meander(-300, 1500, 176, 40, BJ.goldL, 0.75);
    for (let i = 0; i < 16; i++) { const x = -260 + i * 112; ell(x, 262, 16, 16, { wash: i % 2 ? BJ.red : '#2a5ac0', washA: 1, w: 1.4, col: BJ.gold }); }
    scrollHang(130, 420, 120, 560, '北京猿人', t, { col: '#1a0e0a' }); scrollHang(990, 420, 120, 560, '一九四一', t, { col: BJ.lac });
    for (const [x, kind] of [[130, 0], [990, 1]]) {                   // настенные витрины
      rect(x - 90, 1060, 180, 230, { wash: '#1a1410', washA: 1, w: 2.4, col: BJ.goldD }); rect(x - 78, 1072, 156, 190, { wash: lerpC('#243a3a', '#bfe0d8', d), washA: 0.9, w: 1.4, col: L });
      glow(x, 1160, 120, 'rgba(160,255,220,1)', 0.35);
      if (kind === 0) { ell(x, 1160, 52, 52, { wash: BJ.jade, washA: 1, w: 2.2, col: L, shade: { gap: 6, a: 0.3, col: BJ.jadeD, ang: 0.7 } }); ell(x, 1160, 17, 17, { wash: '#16302c', washA: 1, w: 1.6, col: L }); rect(x - 30, 1226, 60, 12, { wash: BJ.woodD, washA: 1, w: 1.2, col: L }); }
      else { blob([[x - 26, 1240], [x - 44, 1180], [x - 18, 1130], [x - 14, 1096], [x + 14, 1096], [x + 18, 1130], [x + 44, 1180], [x + 26, 1240]], { wash: '#e8f0f4', washA: 1, w: 2.2, col: L }); pencil(spline([[x - 34, 1180], [x, 1160], [x + 34, 1180]], false, 6), { w: 3, col: '#2a5ac0', pass2: false }); pencil(spline([[x - 30, 1206], [x, 1190], [x + 30, 1206]], false, 6), { w: 2.4, col: '#2a5ac0', pass2: false }); }
      txt(kind ? 'МИН · XV в.' : 'НЕФРИТ', x, 1310, 22, { col: BJ.goldL, font: 'Osw', a: 0.8 }); }
    if (o.map) o.map(t);
  }
  function cols(t, d = 0, o = {}) {                                 // колонны, балка, фонари, стойки ограждения
    for (const x of [-40, 1120]) { rect(x - 62, 150, 124, 1330, { wash: BJ.red, washA: 1, w: 3, col: L, shade: { gap: 10, a: 0.25, col: BJ.redD, ang: 1.57 } }); rect(x - 62, 150, 30, 1330, { wash: '#000000', washA: 0.2, line: false });
      rect(x - 76, 1420, 152, 70, { wash: BJ.stone, washA: 1, w: 2.4, col: L }); rect(x - 70, 300, 140, 46, { wash: BJ.gold, washA: 1, w: 2, col: L }); meander(x - 62, x + 60, 310, 24, BJ.redD, 0.9); }
    const on = o.lan ?? 1; lantern(250, 520, 1.05, t, on, 1, { ch: '福', cord: 250 }); lantern(880, 470, 0.9, t, on, 2.4, { ch: '京', cord: 230 });
    stanchion(470, 1470, 1, 590); stanchion(965, 1470, 1, 850);
    if (d < 0.3) {                                                      // ночная смена: сторож дремлет на стуле, уборщица со шваброй, кот-мышелов на витрине
      rect(1010, 1400, 80, 12, { wash: BJ.woodD, washA: 1, w: 2, col: L }); for (const k of [1016, 1084]) pencil([[k, 1412], [k, 1476]], { w: 5, col: BJ.woodD, pass2: false }); pencil([[1086, 1400], [1090, 1300]], { w: 5, col: BJ.woodD, pass2: false });
      human(1050, 1470, 0.62, t, { body: '#2a3a5a', legs: '#1e2a40', hat: 'police', hatCol: '#1e2a40', seed: 2448, flip: -1, look: [0, 0.9] }); for (let k = 0; k < 2; k++) txt('z', 1010 - k * 26, 1290 - k * 34 - ((t * 20) % 30), 34 - k * 8, { col: '#dfe8ff', font: 'Hand', a: 0.7 });
      human(70, 1476, 0.6, t, { body: '#5a6a8a', legs: '#2a2a36', hat: 'scarf', hatCol: '#a84a3a', long: 1, seed: 2449, prop: 'stick', armR: 'hold', look: [0.7, 0.3] });
      push(215, 1058, 1); blob([[-40, 0], [-36, -34], [0, -44], [36, -30], [40, 0]], { wash: '#2a2420', washA: 1, w: 2, col: L }); ell(34, -44, 18, 16, { wash: '#2a2420', washA: 1, w: 2, col: L }); pencil(spline([[-40, -6], [-70, -20], [-66, -50 + Math.sin(t * 2) * 8]], false, 6), { w: 7, col: '#2a2420', pass2: false }); for (const k of [-6, 8]) ell(34 + k, -46, 3, 4, { wash: '#b8ff9a', washA: 1, line: false }); pop(); }
  }
  function showcase(t, o = {}) {                                    // витрина: постамент, стекло, табличка, прожектор сверху, содержимое — o.inside(t)
    const sp = o.spot ?? 1, sc = o.spotC || 'rgba(255,236,190,1)', ang = o.ang || 0;
    pencil([[CX, 150], [CX, 360]], { w: 5, col: L, pass2: false }); blob([[CX - 46, 360], [CX + 46, 360], [CX + 30, 424], [CX - 30, 424]], { wash: '#2a2a30', washA: 1, w: 2.4, col: L }); ell(CX, 426, 30, 9, { wash: sp > 0.1 ? '#fff6d8' : '#4a4a50', washA: 1, w: 1.4, col: L });
    if (sp > 0.02) { shaft(CX, 426, 70, 1050, ang, sc, 0.62 * sp); shaft(CX, 426, 320, 1080, ang, sc, 0.3 * sp); glow(CX, 426, 90, sc, 0.9 * sp); lightPool(CX + Math.tan(ang) * -700, 1500, 330, 70, sc, 0.5 * sp); }
    rect(CX - 128, 1280, 256, 210, { wash: '#2c1c14', washA: 1, w: 2.8, col: L, shade: { gap: 9, a: 0.3, col: '#0e0806', ang: 1.57 } }); rect(CX - 142, 1262, 284, 24, { wash: BJ.woodD, washA: 1, w: 2.2, col: BJ.goldD }); rect(CX - 142, 1480, 284, 16, { wash: BJ.woodD, washA: 1, w: 2, col: L });
    rect(CX - 92, 1330, 184, 96, { wash: BJ.gold, washA: 1, w: 2, col: L }); txt(o.l1 || 'ПЕКИНСКИЙ ЧЕЛОВЕК', CX, 1362, 21, { col: '#2a1408', font: 'Osw' }); txt(o.l2 || '≈ 500 000 лет', CX, 1396, 26, { col: '#5a2a10', font: 'Hand' });
    rect(CX - 60, 1234, 120, 30, { wash: BJ.lac, washA: 1, w: 1.8, col: L });                // бархатная подушка
    if (o.inside) o.inside(t);
    if (o.noGlass) return;
    ctx.save(); ctx.globalAlpha = 0.14 + 0.06 * sp; ctx.fillStyle = '#cfeaf0'; ctx.fillRect(CX - 122, 990, 244, 272); ctx.restore();
    rect(CX - 122, 990, 244, 272, { line: true, w: 3, col: '#dff4f8', a: 0.85 }); pencil([[CX - 96, 1010], [CX - 60, 1210]], { w: 9, col: '#ffffff', a: 0.22 + 0.2 * (o.ring || 0), pass2: false }); pencil([[CX - 70, 1004], [CX - 48, 1120]], { w: 4, col: '#ffffff', a: 0.25, pass2: false });
    if (o.ring) for (let k = 0; k < 3; k++) pencil(ellPts(CX - 122, 1150, 30 + k * 34 * o.ring + 40 * o.ring, 44 + k * 40 * o.ring, 0, 0, 20), { w: 3, col: '#ffffff', a: 0.5 * (1 - o.ring), pass2: false });
  }
  function floor(t, d = 0) {                                        // пол: каменные плиты с отражением, ковровая дорожка
    shape([[-900, 1420], [2000, 1420], [2000, 2500], [-900, 2500]], { wash: lerpC('#1e1416', '#6a4a3a', d), washA: 1, line: false });
    for (let i = 0; i < 9; i++) pencil([[-900, 1440 + i * i * 13 + i * 30], [2000, 1440 + i * i * 13 + i * 30]], { w: 1.6, col: '#0a0608', a: 0.5, pass2: false });
    for (let i = -6; i < 14; i++) pencil([[540 + (i - 4) * 150, 1420], [540 + (i - 4) * 520, 2500]], { w: 1.6, col: '#0a0608', a: 0.45, pass2: false });
    shape([[150, 1640], [960, 1640], [1240, 2300], [-140, 2300]], { wash: BJ.lac, washA: 0.92, w: 2.4, col: L, shade: { gap: 13, a: 0.2, col: '#2a0806', ang: 0.2 } }); for (const k of [0.06, 0.94]) pencil([[lerp(150, 960, k), 1640], [lerp(-140, 1240, k), 2300]], { w: 6, col: BJ.gold, a: 0.8, pass2: false });
    for (let i = 0; i < 6; i++) { push(360 + i * 76, 1900 + (i % 2) * 90, 1, 0.2); hz('龍鳳福壽吉祥'[i], 0, 0, 70, BJ.goldD, 0.4); pop(); }
  }
  function front(t, d = 0) {                                        // передний план-рама: тёмная колонна, кисть фонаря, стойка с канатом
    sil([[-520, -200], [-250, -200], [-230, 2400], [-520, 2400]], '#0c0608', 1); rect(-262, 300, 26, 2000, { wash: '#3a0e0a', washA: 0.9, line: false });
    lantern(1330, 420, 1.9, t, 0.7, 5, { cord: 400 });
    sil([[1250, 2400], [1260, 1820], [1300, 1790], [1340, 1820], [1350, 2400]], '#0c0608', 1); pencil(spline([[1300, 1830], [1500, 1980], [1700, 1860]], false, 8), { w: 26, col: '#3a0a08', pass2: false });
  }
  function hud(t) {
    stampBJ(770, 880, 0.95, -0.09, 'ПРОПАЛ', '· 1941 ·', '#ff5a40', t, EV.hk_stamp);
    if (t > EV.hk_gone + 0.5 && t < EV.hk_stamp) note('было здесь', 900, 1080, t, EV.hk_gone + 0.5, EV.hk_stamp, '#fff0c8', 44, -0.06, [[880, 1104], [840, 1140], [800, 1150]]);
  }
  window.BQ = { sky, far, mid, wall, cols, showcase, floor, front, CX, CY };
  WORLD.hook = (t, u, cat) => {
    const gone = t > EV.hk_gone, al = t > EV.hk_stamp ? sm((t - EV.hk_stamp) / 0.3) : 0, sweep = t > EV.hk_q ? Math.sin((t - EV.hk_q) * 5) * 0.3 * (1 - sm((t - LS('h2')) / 0.4)) : 0;
    const fl = gone && t < EV.hk_gone + 0.5 ? (Math.sin(t * 70) > 0 ? 0.25 : 1) : 1, ring = t > EV.hk_knock && t < EV.hk_knock + 0.5 ? (t - EV.hk_knock) / 0.5 : 0;
    lay(40, () => sky(t));
    lay(22, () => far(t));
    lay(11, () => { mid(t); depthFog('#1a1440', 0.18); });
    lay(6, () => wall(t));
    lay(3.2, () => cols(t, 0, { lan: 1 - al * 0.5 }));
    lay(1.7, () => { showcase(t, { spot: fl, ang: sweep, ring, spotC: al > 0.5 ? 'rgba(255,150,120,1)' : 'rgba(255,236,190,1)', inside: () => {
      if (!gone) skullPM(CX - 12, CY, 0.8, {}); else { puffK(CX, CY - 20, 1.1, t, EV.hk_gone, 0.5, 2444, '#fff4d8'); skullDash(CX, CY, 0.8, '#ffe9a8', 0.9);
        if (t > EV.hk_q) txt('?', CX, CY - 14, 150 * popK(t, EV.hk_q, 0.3), { col: '#ffd24a', font: 'Osw' }); } } }); moodDark(CX, 1100, 380, 1250, '#0a0620', 0.62); });
    lay(1, () => { floor(t); castShadow(350, 1572, 190, 420, -0.9, 0.4); lightPool(CX - 40, 1540, 420, 90, al > 0.5 ? 'rgba(255,120,90,1)' : 'rgba(255,225,170,1)', 0.35 * fl); cat(); });
    lay(0.62, () => front(t));
    lay(2.4, () => motes(26, [300, 430, 1100, 1450], '#fff0c8', t, 2445, { sp: 7, sz: 2.2, a: 0.55, wob: 14, add: 1 }));
    lay(0.8, () => motes(12, [-100, 500, 1200, 1900], '#ffd8a0', t, 2446, { sp: 10, sz: 7, a: 0.22, wob: 30, add: 1 }));
    if (al > 0) screenFill('#ff3020', 0.07 * al * (0.6 + 0.4 * Math.sin(t * 9)), 'lighter');
    if (gone && t < EV.hk_gone + 0.12) whiteOut(0.5 * (1 - (t - EV.hk_gone) / 0.12));
  };
  DIR.hook = {
    outfit: 'hoodieBJ', light: { side: 1, rim: '#ffe2a8' }, grade: ['#3a1a40', 0.14],
    act: () => [[0, 'awe'], [EV.hk_gone, 'shock'], [EV.hk_knock, 'scared'], [EV.hk_stamp, 'shock'], [EV.hk_q, 'suspicious'], [LS('h2'), 'smug']],
    pose: (t, u, b) => { const kn = t > EV.hk_knock - 0.15 && t < EV.hk_stamp, kk = kn ? Math.abs(Math.sin((t - EV.hk_knock) * 16)) * 26 : 0;
      return Object.assign(b, { x: 350, y: 1572, s: 1.04, look: t < EV.hk_q ? [0.85, -0.25] : t < LS('h2') ? [0.5 + Math.sin(t * 5) * 0.4, -0.5] : [0.1, 0],
        prop: t < LS('h2') - 0.1 ? 'lantern' : undefined, propAng: -0.2 + Math.sin(t * 3) * 0.06, hand: t < LS('h2') - 0.1 ? [150, -330] : [92, -270], handF: kn ? [232 - kk, -300] : undefined,
        squash: t > EV.hk_gone && t < EV.hk_gone + 0.2 ? 0.12 : b.squash, tailUp: t > EV.hk_gone, watchInHand: t > LS('h2') - 0.1, glow: sm((t - LS('h2')) / 0.5), spin: 1 }); },
    cam: () => [[0, 640, 1080, 0.3], [EV.hk_gone, 650, 1090, 0.34], [EV.hk_gone + 0.25, 600, 1040, 0.16, 'x'], [EV.hk_stamp, 590, 1000, 0.12], [EV.hk_stamp + 0.15, 620, 960, 0.2, 'x'], [EV.hk_q, 560, 980, 0.1], [LS('h2'), 470, 1080, 0.14], [S1.hook, 400, 1150, 0.24]],
    hud
  };
  TRANS_IN.tunnel = { a: 0.3, b: 0.3, runA: 1, fx(k, t, A, B) { inkT(k, t, A, B, 2447); } };   // тушь: кляксы заливают кадр, из них проступают часы
})();
