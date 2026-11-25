/* 034 — сцена `partition`, 1795. Вильнюс поздней осенью: Острая брама (ворота с часовней и иконой в окне), узкая улица, купцы,
   монашки, извозчик, и в ворота входит колонна солдат империи в зелёных мундирах и треуголках (без гербов и знамён). Главный свет —
   холодное низкое солнце сквозь ворота, длинные тени к камере, мокрая брусчатка. На «проглотила» — карта: тёмно-зелёная заливка
   «РОССИЙСКАЯ ИМПЕРИЯ» с востока съедает всё ВКЛ; Том (камзол) прячет кулон за пазуху. Плашка «1795 · ТРЕТИЙ РАЗДЕЛ». */
(() => {
  const L = LTC.ink, GATE = [640, 1150];
  EV.pt_rest = wtk('s5', 'остаток'); EV.pt_eat = wtk('s5', 'проглотила'); EV.pt_map = EV.pt_eat - 0.1; EV.pt_emp = wtk('s5', 'империя.');
  KEYW.push('проглотила', 'империя.');
  function sky(t) { vgrad(-900, 1100, ['#5a6a80', '#9aa4b0', '#d8c8b0'], 1); for (let i = 0; i < 5; i++) { const y = 260 + i * 80, dx = (t * 14 + i * 50) % 240; blob([[-240 + dx, y], [300 + dx, y - 28], [900 + dx, y - 10], [1300, y + 14], [300, y + 26]], { wash: i % 2 ? '#7a8494' : '#a8b0bc', washA: 0.7, line: false }); } }
  function street(t) {                                              // дома улицы и Острая брама
    oldTown(-400, 260, 1200, t, 7700, { lit: 1 }); oldTown(1000, 1700, 1200, t, 7701, { lit: 1 });
    push(GATE[0], GATE[1], 1); rect(-300, -520, 600, 520, { wash: '#e8e0cc', washA: 1, w: 2.6, col: L, shade: { gap: 12, a: 0.1, col: '#8a8070', ang: 1.4 } });
    for (let i = 0; i < 9; i++) { const x = -300 + i * 75; poly([[x, -520], [x + 37, -580], [x + 75, -520]], { wash: '#e8e0cc', washA: 1, w: 1.6, col: L }); }
    rect(-110, -470, 220, 140, { wash: '#2a2420', washA: 1, w: 2, col: L }); ell(0, -400, 50, 60, { wash: LTC.gold, washA: 1, w: 2, col: L }); glow(0, -400, 90, 'rgba(255,220,140,1)', 0.35);
    poly([[-150, 0], [-150, -260], [0, -340], [150, -260], [150, 0]], { wash: '#d8d0c0', washA: 1, w: 2.4, col: L }); poly([[-110, 0], [-110, -240], [0, -300], [110, -240], [110, 0]], { wash: '#f4e8c8', washA: 1, w: 2, col: L }); pop();
    const k = clamp((t - EV.pt_rest) / 2.2); for (let i = 0; i < 6; i++) { const y = 1260, sx = GATE[0] + 60 - i * 20, depth = (k * 6 - i) / 3; if (depth < 0) continue; const s = 0.4 + Math.min(1, depth) * 0.28, x = lerp(GATE[0], 420 + i * 40, Math.min(1, depth));
      human(x, y + Math.min(1, depth) * 70, s, t, { body: '#2a4a2a', bodyD: '#10200e', hat: 'tricorn', hatCol: '#1a1a1a', legs: '#e8e0d0', armR: 'hold', prop: 'spear', seed: 7710 + i, face: 'calm' }); }
    const P = [[180, '#3a2a40', 'scarf', 'hold', 1], [260, '#1a1a1e', 'scarf', 'hold', 1], [960, '#6a5a3a', 'merchant', 'swing'], [1060, '#7a4a2a', 'fur', 'hold']];
    P.forEach(([x, c, h, a, lg], i) => human(x, 1320, 0.7, t, { body: c, hat: h, hatCol: i < 2 ? '#f0f0f0' : '#4a3020', legs: '#3a2a2a', armR: a, long: lg, flip: x > 600 ? -1 : 1, seed: 7720 + i, face: t > EV.pt_eat ? 'shock' : 'smile' }));
    push(1180, 1330, 0.7, 0, -1); horse(0, 0, 1, t, { col: '#5a4a3a', seed: 6 }); rect(110, -150, 200, 90, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); ell(150, -40, 40, 40, { wash: false, w: 5, col: '#3a2a1a' }); pop();
  }
  function ground(t) {                                              // мокрая брусчатка, лужи с отражениями, бочка, листья, фонарь
    rect(-500, 1330, 2200, 1000, { wash: '#6a6a6a', washA: 1, w: 2, col: L }); const r = rng(7730); for (let i = 0; i < 120; i++) ell(r() * 2000 - 400, 1350 + r() * 700, 14 + r() * 14, 7 + r() * 5, { wash: i % 2 ? '#5a5a5e' : '#8a8a8e', washA: 1, w: 1, col: L, a: 0.45 });
    for (let i = 0; i < 3; i++) { push(200 + i * 380, 1700 + (i % 2) * 120, 1); blob([[-120, 0], [-80, -24], [100, -26], [130, 0], [60, 18], [-90, 16]], { wash: '#8a9aae', washA: 1, w: 1.6, col: L }); pencil([[-60, -4], [40, -6]], { w: 3, col: '#e8f0fa', a: 0.7, pass2: false }); pop(); }
    for (let i = 0; i < 20; i++) { const x = r() * 1600 - 200, y = 1400 + r() * 600; ell(x, y, 10, 6, { wash: ['#c8582a', '#e8a030', '#8a3a1a'][i % 3], washA: 1, w: 1, col: L, rot: r() * 3 }); }
    push(1000, 1700, 1); pencil([[0, 0], [0, -340]], { w: 7, col: '#2a2a2e', pass2: false }); rect(-30, -400, 60, 70, { wash: '#ffd890', washA: 1, w: 2, col: L }); glow(0, -366, 60, 'rgba(255,210,130,1)', 0.35); pop();
    push(-60, 1820, 1); rect(-50, -90, 100, 90, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); pop();
    lightPool(GATE[0], 1500, 600, 160, 'rgba(255,236,200,1)', 0.28); castShadow(380, 1700, 110, 500, 1.2, 0.35); moodDark(540, 1200, 500, 1500, '#0a0e16', 0.3);
  }
  function front(t) { for (const x of [-170, 1250]) { rect(x - 80, 500, 160, 1900, { wash: '#a89880', washA: 1, w: 2.4, col: L, shade: { gap: 12, a: 0.2, col: '#4a3a28', ang: 0 } }); } }
  function map(t) {                                                 // империя съедает ВКЛ с востока
    const k = sm(clamp((t - EV.pt_map) / 0.3)); if (k <= 0) return; scr(() => { ctx.save(); ctx.globalAlpha = k; const P = ltMapBase(t, { k: 52, lon: 28.5, lat: 52.5 });
      ltZone(P, GDL_1569, LTC.grn, 0.8); ltZone(P, POLAND, '#e8a8a0', 0.7, { w: 3 }); const e = sm(clamp((t - EV.pt_eat) / 1.1));
      GLOBE.fill([[32, 60], [45, 60], [45, 44], [36, 44], [34, 46.5], [32.5, 52]].map(P), '#2e4a3a', 0.92); ctx.save(); ctx.beginPath(); ctx.rect(W - e * W * 1.1, 0, W * 1.3, H); ctx.clip(); GLOBE.fill(GDL_1569.map(P), '#2e4a3a', 0.95); GLOBE.fill(UA_CUT.map(P), '#2e4a3a', 0.6); ctx.restore();
      txt('ВКЛ', P([26.5, 54.5])[0], P([26.5, 54.5])[1], 50, { col: '#fff6e0', font: 'Osw' }); if (e > 0.5) { const [x, y] = P([33, 53.5]); txt('РОССИЙСКАЯ', x, y, 56, { col: '#e8f0e0', font: 'Osw' }); txt('ИМПЕРИЯ', x, y + 64, 56, { col: '#e8f0e0', font: 'Osw' }); }
      ctx.restore(); });
  }
  function extras(t) {                                              // лоток с бейгелями, кот на подоконнике, бельё, шпили костёлов, нищий с шапкой
    push(1160, 1500, 0.9); rect(-110, -100, 220, 100, { wash: '#7a5a32', washA: 1, w: 2, col: LTC.ink }); for (let q = 0; q < 6; q++) pencil(ellPts(-80 + q * 32, -110, 14, 10, 0, 0, 16), { w: 5, col: '#c8904a', pass2: false, gap: false }); human(60, -10, 0.9, t, { body: '#6a4a5a', hat: 'scarf', hatCol: '#c83a2a', legs: '#3a2a2a', long: 1, armR: 'hold', flip: -1, seed: 7750, face: 'smile' }); pop();
    for (const x of [-200, 1460]) { push(x, 1000, 1); poly([[-30, 0], [0, -320], [30, 0]], { wash: '#8a8478', washA: 1, w: 2, col: LTC.ink }); pencil([[0, -320], [0, -380]], { w: 4, col: LTC.gold, pass2: false }); pencil([[-14, -360], [14, -360]], { w: 4, col: LTC.gold, pass2: false }); pop(); }
    pencil([[-100, 900], [260, 930]], { w: 2, col: '#4a4a4a', pass2: false }); for (let i = 0; i < 5; i++) rect(-80 + i * 66, 912 + i * 4, 40, 50, { wash: ['#f4f4f0', '#c8d8e8', '#e8c8c8'][i % 3], washA: 1, w: 1.2, col: LTC.ink });
    push(100, 980, 0.6); blob([[-30, 0], [-26, -30], [26, -32], [30, 0]], { wash: '#2a2a2a', washA: 1, w: 1.4, col: LTC.ink }); ell(20, -40, 16, 14, { wash: '#2a2a2a', washA: 1, w: 1.4, col: LTC.ink }); pencil([[-30, -10], [-50, -40 + Math.sin(t * 2) * 10]], { w: 4, col: '#2a2a2a', pass2: false }); pop();
    for (let i = 0; i < 3; i++) { const fx = 600 + i * 40 + Math.sin(t * 1.5 + i) * 30; push(fx, 1560, 0.5); blob([[-24, 0], [-16, -26], [16, -28], [26, -10], [10, 4]], { wash: '#8a8e9a', washA: 1, w: 1.4, col: LTC.ink }); ell(20, -28, 8, 8, { wash: '#6a6e7a', washA: 1, line: false }); pop(); }
    push(-60, 1560, 0.9); human(0, 0, 1, t, { body: '#6a6a5a', hat: 'fur', hatCol: '#3a3a3a', legs: '#3a3a3a', armR: 'hold', seed: 7751, face: 'calm' }); ell(60, -10, 30, 12, { wash: '#4a3a2a', washA: 1, w: 1.4, col: LTC.ink }); pop();
  }
  WORLD.partition = (t, u, cat) => {
    lay(40, () => sky(t)); lay(3.2, () => street(t)); lay(1.5, () => extras(t)); lay(1, () => ground(t)); lay(0.62, () => front(t));
    lay(2, () => motes(30, [-100, 500, 1200, 1800], '#c8d0dc', t, 7740, { sp: 6, vx: -1, sz: 2.6, a: 0.5, wob: 8 }));
    map(t); lay(1, () => cat());
  };
  DIR.partition = {
    outfit: 'kamzol', light: { side: 1, rim: '#e8ecf4' }, grade: ['#1a2030', 0.06],
    act: () => [[S0.partition, 'suspicious'], [EV.pt_rest, 'sideeye'], [EV.pt_eat, 'shock'], [EV.pt_emp, 'annoyed']],
    pose: (t, u, b) => { const mp = t > EV.pt_map; return Object.assign(b, { x: mp ? 190 : 340, y: mp ? 1840 : 1720, s: mp ? 0.78 : 0.95, look: mp ? [0.6, -0.7] : [0.5, -0.4], hand: mp ? [150, -320] : [60, -260], point: mp, squash: t > EV.pt_eat && t < EV.pt_eat + 0.25 ? 0.06 : b.squash }); },
    hud: t => { if (t > EV.pt_emp - 0.2) ltBoard(620, 1380, 0.8, t, EV.pt_emp - 0.2, [['1795 · ТРЕТИЙ РАЗДЕЛ', 46, LTC.amberL]], { w: 540 }); },
    cam: () => [[S0.partition, 620, 980, -0.08], [EV.pt_rest, 640, 960, -0.04], [EV.pt_map - 0.01, 640, 940, 0], [EV.pt_map, 540, 960, 0], [S1.partition, 540, 960, 0]]
  };
  TRANS_IN.partition = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#2e4a3a'; ctx.fillRect(0, 0, W * e * 2, H); ctx.restore(); }); } };
})();
