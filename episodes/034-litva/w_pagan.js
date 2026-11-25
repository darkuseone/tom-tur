/* 034 — сцена `pagan`, до 1387. Священная дубовая роща в сумерках: огромный дуб с лентами, каменный жертвенник с вечным огнём,
   жрицы-вайдилуте в белом поддерживают огонь, люди с дарами (мёд, хлеб, янтарь), кони у коновязи, деревянный идол Перкунаса, дым.
   Главный свет — огонь жертвенника (оранжевый), холодная луна сзади. На «огню» Том (княжий кафтан) греет лапы у огня; на «крестились»
   из-за деревьев выходят монахи с крестом, звенит колокольчик; плашка «КРЕЩЕНИЕ: ПОЛЬША 966 · РУСЬ 988 · ЛИТВА 1387». */
(() => {
  const L = LTC.ink, FIRE = [700, 1300];
  EV.pg_oak = wtk('s1', 'дубу'); EV.pg_fire = wtk('s1', 'огню.'); EV.pg_bapt = wtk('s1', 'крестились'); EV.pg_last = wtk('s1', 'последних');
  KEYW.push('огню.', 'Европе.');
  function sky(t) { vgrad(-900, 1100, ['#0e1430', '#2a3060', '#6a4a6a', '#c86a4a'], 1); ell(860, 420, 46, 46, { wash: '#f0ecdc', washA: 1, line: false }); glow(860, 420, 140, 'rgba(220,230,255,1)', 0.25);
    const r = rng(7300); for (let i = 0; i < 50; i++) { ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(r() * 1600 - 300, r() * 700, 2.5, 2.5); } }
  function far(t) { hills(1020, 40, '#1e2a30', 3.3); for (let i = 0; i < 12; i++) { const r = rng(7310 + i); oak(-200 + i * 140 + r() * 40, 1040, 200 + r() * 80, t, 20 + i, { col: '#1e3020', colL: '#2e4630', trunk: '#2a2018' }); } depthFog('#3a3048', 0.08); }
  function grove(t) {                                               // священный дуб, идол, жрицы, люди, кони
    const big = 1.0; push(1000, 1240, 1); poly([[-70, 0], [-50, -420], [-140, -520], [-20, -470], [40, -560], [60, -420], [80, 0]], { wash: '#4a3424', washA: 1, w: 2.6, col: L, shade: { gap: 8, a: 0.3, col: '#1a1008', ang: 1.5 } });
    const r = rng(7320); for (let i = 0; i < 12; i++) ell((r() - 0.5) * 520, -560 - r() * 260, 110 + r() * 50, 80, { wash: i % 2 ? '#2e5a2a' : '#4a7a3a', washA: 1, w: 1.6, col: '#14200e' });
    for (let i = 0; i < 6; i++) { const lx = -200 + i * 80; pencil([[lx, -470 - (i % 2) * 30], [lx + 10, -380 + Math.sin(t * 2 + i) * 10]], { w: 6, col: [LTC.red, '#f4efe4', LTC.yel][i % 3], pass2: false }); } pop();
    push(240, 1240, 0.9); rect(-40, -340, 80, 340, { wash: '#6a4a2a', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.3, col: '#2a1a0a', ang: 0 } }); ell(0, -300, 50, 56, { wash: '#7a5a3a', washA: 1, w: 2.2, col: L }); for (const d of [-1, 1]) ell(d * 18, -310, 8, 6, { wash: '#1a1008', washA: 1, line: false }); pencil([[-26, -270], [26, -270]], { w: 4, col: '#1a1008', pass2: false });
    pencil([[0, -360], [-20, -400], [10, -410], [-10, -450]], { w: 6, col: LTC.amberL, pass2: false }); pop();
    for (let i = 0; i < 3; i++) human(520 + i * 110, 1310, 0.7, t, { body: '#f4efe4', bodyD: '#b8b0a0', skin: '#f0c8a0', hat: 'scarf', hatCol: '#f4efe4', legs: '#e8e0d0', long: 1, armR: 'wave', flip: i % 2 ? -1 : 1, seed: 7330 + i, face: 'smile' });
    const P = [[60, '#8a5a3a', 'fur', 'hold'], [150, '#5a6a3a', null, 'wave'], [340, '#a83a2a', 'scarf', 'hold'], [1180, '#5a4a3a', 'fur', 'hold']];
    P.forEach(([x, c, h, a], i) => { human(x, 1300, 0.66, t, { body: c, hat: h, hatCol: '#4a3020', legs: '#3a2a1a', armR: a, long: h === 'scarf' ? 1 : undefined, flip: x > 600 ? -1 : 1, seed: 7340 + i, face: t > EV.pg_bapt ? 'shock' : 'smile' }); push(x + 40, 1300 - 150, 0.6); ell(0, 0, 26, 20, { wash: i % 2 ? LTC.amber : '#c8944a', washA: 1, w: 1.6, col: L }); pop(); });
    horse(-140, 1300, 0.6, t, { col: '#6a4a2a', seed: 2 }); horse(1300, 1300, 0.6, t, { col: '#3a2a1a', seed: 5, flip: -1 });
    if (t > EV.pg_bapt) { const k = sm(clamp((t - EV.pg_bapt) / 1.0)); for (let i = 0; i < 3; i++) { const x = lerp(-300, -20 + i * 90, k); human(x, 1320, 0.66, t, { body: '#3a2a20', bodyD: '#1a1008', hat: 'hood', hatCol: '#3a2a20', legs: '#2a1a10', long: 1, armR: 'hold', seed: 7350 + i, face: 'calm' }); }
      push(lerp(-260, 60, k), 1320 - 300, 0.7); pencil([[0, 0], [0, -160]], { w: 7, col: LTC.gold, pass2: false }); pencil([[-40, -110], [40, -110]], { w: 7, col: LTC.gold, pass2: false }); pop(); }
  }
  function ground(t) {                                              // поляна: корни, мох, камни, жертвенник с огнём, корзины, мёд
    rect(-500, 1340, 2200, 1000, { wash: '#2e4a26', washA: 1, w: 2, col: L, shade: { gap: 12, a: 0.12, col: '#14200e', ang: 0.3 } }); const r = rng(7360);
    for (let i = 0; i < 70; i++) { const x = r() * 1900 - 400, y = 1360 + r() * 700, h = 12 + r() * 24; pencil([[x, y], [x + 3, y - h]], { w: 2.4, col: i % 3 ? '#3e6a22' : '#6a8a3a', pass2: false }); }
    for (let i = 0; i < 5; i++) pencil([[900 + i * 60, 1360], [700 + i * 100, 1500 + i * 20]], { w: 12, col: '#3a2a1a', pass2: false });
    push(FIRE[0], FIRE[1] + 260, 1); for (let q = 0; q < 7; q++) ell(-120 + q * 40, -10, 30, 22, { wash: '#8a8478', washA: 1, w: 2, col: L, shade: { gap: 5, a: 0.3, col: '#3a3a38', ang: 1 } });
    rect(-110, -90, 220, 80, { wash: '#7a7468', washA: 1, w: 2.4, col: L }); for (let i = 0; i < 7; i++) { const ph = (t * 1.6 + i / 7) % 1; blob([[-60 + i * 20, -90], [-50 + i * 20 + Math.sin(t * 6 + i) * 8, -170 - ph * 120], [-34 + i * 20, -90]], { wash: i % 2 ? '#ff8a2a' : '#ffd060', washA: 1 - ph * 0.6, line: false }); }
    glow(0, -150, 160, 'rgba(255,150,60,1)', 0.35); pop();
    for (let i = 0; i < 2; i++) { push(1060 + i * 100, 1720 + i * 30, 1); blob([[-46, 0], [-40, -56], [40, -56], [46, 0]], { wash: '#c89a5a', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.3, col: '#6a4a1a', ang: 0.8 } }); ell(0, -60, 30, 10, { wash: i ? '#f0b030' : '#e8d8a8', washA: 1, w: 1.4, col: L }); pop(); }
    for (let i = 0; i < 5; i++) ell(-80 + i * 70, 1880 + (i % 2) * 30, 34, 16, { wash: '#6a6a60', washA: 1, w: 1.6, col: L });
    lightPool(FIRE[0], 1640, 900, 240, 'rgba(255,140,60,1)', 0.35); castShadow(380, 1700, 110, 560, 3.6, 0.35); moodDark(540, 1200, 450, 1500, '#05060e', 0.35);
  }
  function front(t) { for (const x of [-170, 1250]) { poly([[x - 90, 2400], [x - 60, 400], [x + 60, 400], [x + 90, 2400]], { wash: '#1e140c', washA: 1, w: 2, col: L }); for (let i = 0; i < 4; i++) ell(x + (i - 1.5) * 120, 380 - i * 30, 140, 80, { wash: '#14200e', washA: 1, line: false }); } }
  function plate(t) { if (t < EV.pg_last - 0.2) return; ltBoard(640, 980, 0.85, t, EV.pg_last - 0.2, [['КРЕЩЕНИЕ', 44, LTC.amberL], ['ПОЛЬША · 966', 44], ['РУСЬ · 988', 44], ['ЛИТВА · 1387', 56, '#ff8a6a']], { w: 440 }); }
  function extras(t) {                                              // борти с пчёлами, гнездо аиста, дети с венками, кувшины мёда
    push(1180, 1480, 0.9); rect(-30, -260, 60, 260, { wash: '#5a4030', washA: 1, w: 2, col: LTC.ink }); rect(-24, -200, 48, 40, { wash: '#2a1a10', washA: 1, w: 1.4, col: LTC.ink }); for (let i = 0; i < 8; i++) { const a = t * 3 + i, x = Math.cos(a) * 40, y = -180 + Math.sin(a * 1.3) * 30; ell(x, y, 4, 3, { wash: '#f2c02a', washA: 1, line: false }); } pop();
    push(-40, 1000, 1); rect(-14, 0, 28, 500, { wash: '#4a3424', washA: 1, w: 1.6, col: LTC.ink }); ell(0, 0, 70, 24, { wash: '#6a4a2a', washA: 1, w: 2, col: LTC.ink }); blob([[-20, -10], [-14, -50], [20, -54], [30, -30], [16, -10]], { wash: '#f4f4f0', washA: 1, w: 1.6, col: LTC.ink }); pencil([[20, -50], [30, -90]], { w: 5, col: '#f4f4f0', pass2: false }); pencil([[30, -90], [52, -84]], { w: 4, col: '#e85a1e', pass2: false }); pop();
    for (let i = 0; i < 2; i++) { push(160 + i * 80, 1520, 0.6); human(0, 0, 1, t, { body: '#f4efe4', skin: '#f8d8b8', legs: '#e8e0d0', long: 1, armR: 'wave', seed: 7380 + i, face: 'grin' }); for (let q = 0; q < 6; q++) { const a = q / 6 * 6.283; ell(Math.cos(a) * 34, -400 + Math.sin(a) * 10, 10, 10, { wash: q % 2 ? '#f2c02a' : '#c8281e', washA: 1, w: 1, col: LTC.ink }); } pop(); }
    for (let i = 0; i < 3; i++) { push(900 + i * 50, 1620, 0.9); blob([[-22, 0], [-26, -40], [-14, -56], [14, -56], [26, -40], [22, 0]], { wash: '#a8582a', washA: 1, w: 1.6, col: LTC.ink }); ell(0, -56, 16, 6, { wash: '#f0b030', washA: 1, line: false }); pop(); }
  }
  WORLD.pagan = (t, u, cat) => {
    lay(40, () => sky(t)); lay(15, () => far(t)); lay(3.2, () => grove(t)); lay(1.5, () => extras(t)); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(2.2, () => motes(26, [300, 900, 1100, 1700], '#ffb060', t, 7370, { sp: -6, sz: 3, a: 0.7, wob: 14, add: 1 }));
  };
  DIR.pagan = {
    outfit: 'knyaz', light: { side: 1, rim: '#ff9a4a' }, grade: ['#1a1020', 0.06],
    act: () => [[S0.pagan, 'awe'], [EV.pg_oak, 'smug'], [EV.pg_fire, 'grin'], [EV.pg_bapt, 'suspicious'], [EV.pg_last, 'sideeye']],
    pose: (t, u, b) => { const warm = t > EV.pg_fire - 0.1 && t < EV.pg_bapt; return Object.assign(b, { x: 420, y: 1690, s: 0.95, look: t < EV.pg_fire ? [0.7, -0.6] : t < EV.pg_bapt ? [0.6, 0] : [-0.8, -0.2], hand: warm ? [200, -230] : [150, -300], handF: warm ? [170, -220] : undefined, point: t > EV.pg_oak && t < EV.pg_fire, squash: warm ? 0.03 : b.squash }); },
    hud: t => plate(t),
    cam: () => [[S0.pagan, 640, 1000, -0.1], [EV.pg_oak, 720, 940, -0.08], [EV.pg_fire, 560, 1120, 0.06, 'x'], [EV.pg_bapt, 520, 1040, -0.04], [S1.pagan, 520, 1060, 0]]
  };
  TRANS_IN.pagan = { a: 0, b: 0.35, fx(k, t, A, B) { drawBuf(B, 1.08 - 0.08 * sm(k)); whiteOut(1 - sm(k), '255,236,180'); } };
})();
