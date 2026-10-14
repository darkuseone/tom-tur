/* Режиссура: позы героя, камера по сценам, переходы-порталы, грейд. */
const LIGHT = {
  times: { side: 1, rim: '#7fe6ff' }, tunnel: { side: 1, rim: '#ffd890' }, rock: { side: 1, rim: '#ffe9b0' }, globe: { side: -1, rim: '#9fdcff' },
  dino: { side: 1, rim: '#ffe2a0' }, ice: { side: 1, rim: '#e8f6ff' }, lenape: { side: 1, rim: '#ffc870' }, dutch: { side: -1, rim: '#e6eef2' },
  wall: { side: 1, rim: '#ffe0b0' }, bridge: { side: 1, rim: '#ffb060' }, liberty: { side: -1, rim: '#d8fff0' }, empire: { side: 1, rim: '#fff0c8' },
  today: { side: -1, rim: '#ff8fc8' }, button: { side: 1, rim: '#ffb38a' }
};
const GRADE = { times: ['#3a1a5a', 0.22], tunnel: ['#6a4010', 0.2], rock: ['#1a1a3a', 0.3], globe: ['#102040', 0.25], dino: ['#7a5a20', 0.25], ice: ['#3a5a7a', 0.3],
  lenape: ['#8a5a10', 0.3], dutch: ['#2a4a5a', 0.3], wall: ['#6a4a2a', 0.3], bridge: ['#8a4a10', 0.3], liberty: ['#1a5a5a', 0.25], empire: ['#6a5a3a', 0.3], today: ['#3a1a5a', 0.35], button: ['#5a2a4a', 0.3] };

const OUTF = { times: 'puffer', tunnel: 'puffer', rock: 'miner', globe: 'astro', dino: 'safari', ice: 'fur', lenape: 'explorer', dutch: 'dutch', bridge: 'victorian', liberty: 'sailor', empire: 'iron', today: 'hoodie', button: 'puffer' };
/* актёрская игра: смена эмоций по словам реплики */
function actKeys(name) {
  const a = S0[name];
  switch (name) {
    case 'times': return [[0, 'shock'], [LF('h1', 0.42), 'awe'], [EV.h2 - 0.1, 'smug'], [LF('h2', 0.55), 'wink'], [LE('h2') + 0.1, 'smug']];
    case 'tunnel': return [[a, 'awe']];
    case 'rock': return [[a, 'suspicious'], [EV.knock, 'talk'], [LF('r1', 0.45), 'smug'], [EV.rise, 'awe']];
    case 'globe': return [[a, 'talk'], [EV.split, 'shock'], [EV.atl, 'awe']];
    case 'dino': return [[a, 'talk'], [EV.sniff, 'scared'], [LF('d1', 0.78), 'sideeye']];
    case 'ice': return [[a, 'cold'], [EV.melt, 'talk'], [LF('i2', 0.55), 'proud']];
    case 'lenape': return [[a, 'talk'], [EV.mana, 'grin']];
    case 'dutch': return [[a, 'talk'], [LF('n1', 0.3), 'smug'], [EV.contract + 0.3, 'sideeye'], [EV.myth, 'suspicious']];
    case 'bridge': return [[a, 'talk'], [LF('b1', 0.35), 'laugh'], [EV.stoit - 0.2, 'grin']];
    case 'liberty': return [[a, 'talk'], [LF('s1', 0.42), 'smug'], [EV.proud - 0.1, 'annoyed']];
    case 'empire': return [[a, 'awe'], [LF('e1', 0.68), 'shock']];
    case 'today': return [[a, 'proud'], [LF('n2', 0.4), 'talk'], [EV.dive, 'smug']];
    case 'button': return [[a, 'talk'], [LF('x1', 0.45), 'grin'], [LF('x1', 0.85), 'wink']];
  }
  return [[0, 'neutral']];
}
const ACTK = {}; SC.forEach(s => { ACTK[s[0]] = actKeys(s[0]); });
function actAt(name, t) {
  const K_ = ACTK[name] || [[0, 'neutral']]; let i = 0; while (i < K_.length - 1 && t >= K_[i + 1][0]) i++;
  const cur = K_[i], prev = i > 0 ? K_[i - 1] : cur, k = clamp((t - cur[0]) / 0.16), pop = i > 0 && t - cur[0] < 0.22 ? 0.09 * (1 - (t - cur[0]) / 0.22) : 0;
  return { expr: prev[1], expr2: cur[1], ek: i > 0 ? sm(k) : 1, pop };
}
function catPose(name, t, u) {
  const L = LIGHT[name], A = actAt(name, t), base = { t, x: 560, y: GY, s: 1.25, expr: A.expr, expr2: A.expr2, ek: A.ek, squash: A.pop, look: [0.2, 0], light: L, outfit: OUTF[name] };
  const h2 = EV.h2, e2 = A.expr2;
  switch (name) {
    case 'times': return Object.assign(base, { x: 620, s: 1.3, look: t < h2 - 0.1 ? [0.15, -1] : [-0.25, 0.05], hand: t < h2 ? [60, -170] : [100, -250], watchInHand: t > h2, glow: clamp((t - h2 - 0.6) / 0.9), spin: t > h2 + 1.0 ? (t - h2 - 1.0) * 2 : 0, squash: t < 0.3 ? 0.35 * (1 - t / 0.3) : A.pop, tilt: t < h2 ? -0.06 : 0.05 });
    case 'tunnel': return Object.assign(base, { x: 540, y: 1260, s: 1.0, rot: u * 3.2, look: [0, -0.2], watchInHand: true, glow: 1, spin: 1.5 });
    case 'rock': { const knock = t > EV.knock - 0.05 && t < EV.knock + 0.8; return Object.assign(base, { x: 420, hand: knock ? [160 + Math.sin(t * 28) * 10, -290] : [86, -170], look: knock ? [0.9, -0.2] : [0.3, 0], walk: u < 0.6 ? t * 8 : undefined }); }
    case 'globe': return Object.assign(base, { x: 820, y: 1560, s: 0.85, rot: Math.sin(t * 0.8) * 0.12, look: [-0.8, -0.6], watchInHand: true, glow: 0.4 });
    case 'dino': { const sn = t > EV.sniff; return Object.assign(base, { x: 380, s: 1.22, look: sn ? [0.9, -0.5] : [0.3, 0], sweat: t > EV.sniff + 0.2, tailUp: sn, walk: u < 0.7 ? t * 8 : undefined, prop: sn ? undefined : 'binoc', hand: sn ? [60, -210] : [70, -230] }); }
    case 'ice': { const s0 = S0.ice + 0.25, slide = t > s0 && t < EV.melt - 0.2, cold = t < EV.melt; return Object.assign(base, { x: slide ? 520 + Math.sin((t - s0) * 2.8) * 170 : 520, rot: slide ? Math.sin((t - s0) * 2.8) * 0.12 : 0, chatter: cold, frost: cold, look: [0.3, 0], hand: cold ? [30, -220] : undefined, handF: cold ? [-30, -220] : undefined }); }
    case 'lenape': return Object.assign(base, { x: 380, point: t > EV.mana, hand: t > EV.mana ? [130, -310] : undefined, look: [0.5, -0.2], walk: u < 0.7 ? t * 8 : undefined });
    case 'dutch': return Object.assign(base, { x: 360, prop: t > EV.contract ? 'coin' : undefined, hand: [90, -190], look: e2 === 'sideeye' ? [0, 0] : [0.5, 0] });
    case 'bridge': return Object.assign(base, { x: 300, y: 1500, s: 1.15, look: t > EV.stoit - 0.2 ? [0, 0.05] : [0.6, 0], walk: u < 1.0 ? t * 7 : undefined, hand: e2 === 'laugh' ? [60, -230] : undefined });
    case 'liberty': return Object.assign(base, { x: 330, y: 1530, s: 1.2, point: t < EV.proud - 0.15, hand: t < EV.proud - 0.15 ? [140, -310] : [64, -180], look: t > EV.proud - 0.15 ? [0, 0] : [0.8, -0.4] });
    case 'empire': return Object.assign(base, { x: 360, s: 1.15, look: [0.7, -0.6] });
    case 'today': return Object.assign(base, { x: 560, look: [0, 0], walk: u < 0.5 ? t * 8 : undefined });
    case 'button': return Object.assign(base, { x: 560, y: GY + 80, s: 1.6, watchInHand: true, glow: clamp((t - EV.portal) / 1), spin: 0.4, hand: [86, -240], look: [0, 0.05] });
  }
  return base;
}
function catFor(name, t, u) {
  return () => { const P = catPose(name, t, u); tom(P);
    if (name === 'rock') { const hx = P.x + (P.look[0] * 14) * P.s, hy = P.y - (372 + 120) * P.s; rays(hx + 20, hy, P.look[0] > 0.5 ? -0.25 : -0.05, 0.35, 1100, 'rgba(255,240,190,0.55)', 0.6, 7, t); glow(hx + 10, hy, 70, 'rgba(255,250,220,1)', 0.9); } };
}
/* камера: ключи [время, x, y, z, ease]; 'x' — экспо (Spider-Verse: резкий «провал» в локацию), иначе плавно */
function camKeysFor(name) {
  const a = S0[name], b = S1[name], fall = (x, y, z) => [[a, x, y, -1.35], [a + 0.5, x, y, z, 'x']];
  switch (name) {
    case 'times': return [[0, 560, 820, -0.32], [0.9, 570, 840, -0.26], [1.05, 590, 870, -0.08, 'x'], [h2c(), 600, 900, 0.0], [EV.h2 + 0.2, 640, 1010, 0.3, 'x'], [b, 650, 1000, 0.36]];
    case 'tunnel': return [[a, 540, 960, 0], [b, 540, 960, 0.1]];
    case 'rock': return [[a, 470, 1000, 0.22], [a + 1.0, 520, 960, 0.04], [EV.knock + 0.2, 470, 1000, 0.2, 'x'], [EV.rise, 470, 980, 0.1], [EV.rise + 1.3, 480, -880, -0.15], [b, 480, -880, -0.12]];
    case 'globe': return [[a, 540, 960, 0.22], [EV.split, 520, 960, -0.1], [EV.split + 0.15, 520, 960, 0.05, 'x'], [b, 540, 940, 0.0]];
    case 'dino': return [...fall(500, 990, -0.02), [EV.sniff - 0.05, 520, 990, 0.04], [EV.sniff + 0.15, 560, 980, 0.3, 'x'], [b, 560, 990, 0.33]];
    case 'ice': return [[a, 540, 960, 0.12], [EV.melt - 0.4, 540, 960, 0.0], [EV.melt, 540, 960, -0.04], [EV.b3, 540, 960, -0.1], [b, 540, 960, 0.0]];
    case 'lenape': return [...fall(540, 960, -0.1), [b, 520, 980, 0.12]];
    case 'dutch': return [...fall(480, 1000, 0.18), [EV.contract, 560, 920, 0.03], [b, 560, 930, 0.12]];
    case 'bridge': return [...fall(540, 960, -0.06), [EV.stoit - 0.1, 540, 975, 0.08], [EV.stoit + 0.08, 420, 1020, 0.34, 'x'], [b, 420, 1020, 0.36]];
    case 'liberty': return [[a, 520, 980, 0.0], [EV.proud - 0.2, 440, 1040, 0.12], [EV.proud, 420, 1050, 0.36, 'x'], [b, 460, 1000, 0.22]];
    case 'empire': return [...fall(540, 960, 0.05), [b, 520, 900, -0.1]];
    case 'today': return [...fall(560, 960, 0.22), [EV.dive, 560, 960, 0.0], [b, 560, 960, 0.0]];
    case 'button': return [[a, 560, 1180, 0.18], [EV.portal, 560, 1080, 0.0], [DUR + 0.2, 560, 1080, -0.05]];
  }
  return [[0, 540, 960, 0]];
}
function h2c() { return Math.max(1.2, EV.h2 - 0.2); }
const CAMK = {}; SC.forEach(s => { CAMK[s[0]] = camKeysFor(s[0]); });
function camKeys(keys, t) {
  if (t <= keys[0][0]) return { x: keys[0][1], y: keys[0][2], z: keys[0][3] };
  for (let i = 0; i < keys.length - 1; i++) { const a = keys[i], b = keys[i + 1]; if (t <= b[0]) { const u = clamp((t - a[0]) / Math.max(1e-3, b[0] - a[0])), k = b[4] === 'x' ? 1 - Math.pow(2, -10 * u) : sm(u); return { x: lerp(a[1], b[1], k), y: lerp(a[2], b[2], k), z: lerp(a[3], b[3], k) }; } }
  const l = keys[keys.length - 1]; return { x: l[1], y: l[2], z: l[3] };
}
function camFor(name, t, u) {
  const c = camKeys(CAMK[name] || [[0, 540, 960, 0]], t);
  const punch = CAPS.some(cc => t >= cc.t0 && t < cc.t0 + 0.22 && cc.words.some(w => KEYW.includes(w))) ? 0.035 : 0;
  c.z += punch; return c;
}
function drawScene(i, t) {
  const name = SC[i][0], u = t - SC[i][1];
  CAM = camFor(name, t, u); const prev = camFor(name, t - 1 / 24, u - 1 / 24); CAMV = Math.max(CAMV, Math.abs(CAM.z - prev.z) * 24 + Math.hypot(CAM.x - prev.x, CAM.y - prev.y) * 24 / 2500);
  const sh = shakeAmt(t), r = rng(hsh(FRAME, 99));
  push((r() - 0.5) * sh, (r() - 0.5) * sh, 1);
  WORLD[name](t, u, catFor(name, t, u));
  pop();
}
const WORLD = { times: wTimes, tunnel: wTunnel, rock: wRock, globe: wGlobe, dino: wDino, ice: wIce,
  lenape: (t, u, c) => typeof wLenape === 'function' ? wLenape(t, u, c) : wTimes(t, u, c), dutch: (t, u, c) => typeof wDutch === 'function' ? wDutch(t, u, c) : wTimes(t, u, c),
  wall: (t, u, c) => typeof wWall === 'function' ? wWall(t, u, c) : wTimes(t, u, c), bridge: (t, u, c) => typeof wBridge === 'function' ? wBridge(t, u, c) : wTimes(t, u, c),
  liberty: (t, u, c) => typeof wLiberty === 'function' ? wLiberty(t, u, c) : wTimes(t, u, c), empire: (t, u, c) => typeof wEmpire === 'function' ? wEmpire(t, u, c) : wTimes(t, u, c),
  today: (t, u, c) => typeof wToday === 'function' ? wToday(t, u, c) : wTimes(t, u, c), button: (t, u, c) => typeof wButton === 'function' ? wButton(t, u, c) : wTimes(t, u, c) };

// ------------------------------------------------------------------ переходы: каждый свой (портал, зум в объект, заморозка, хлыст, дым…)
const TRANS = typeof TRANS_LIST !== 'undefined' ? TRANS_LIST : [];
let CAMV = 0;
function frame(t) {
  CAMV = 0;
  const tr = TRANS.find(q => t >= q.t - q.a && t < q.t + q.b);
  if (tr) {
    const iB = sceneAt(tr.t + 0.001), iA = iB - 1;
    const tA = Math.min(t, tr.t - 0.001), tB = Math.max(t, tr.t);
    renderTo(BUF[0], () => drawScene(iA, tr.holdA ? Math.min(t, tr.t - 0.001) : t < tr.t ? t : tr.t - 0.001 + (t - tr.t) * (tr.runA ?? 0)));
    renderTo(BUF[1], () => drawScene(iB, Math.max(t, tr.t)));
    const k = clamp((t - (tr.t - tr.a)) / (tr.a + tr.b));
    tr.fx(k, t, BUF[0], BUF[1]);
  } else drawScene(sceneAt(t), t);
  if (CAMV > 0.9) {                                                   // линии скорости при «провале» камеры
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); S = 1; const a = clamp((CAMV - 0.9) / 3), r = rng(hsh(FRAME, 61));
    for (let i = 0; i < 46; i++) { const ang = r() * 6.283, d0 = 300 + r() * 300, d1 = d0 + 300 + r() * 700; pencil([[540 + Math.cos(ang) * d0, 900 + Math.sin(ang) * d0 * 1.3], [540 + Math.cos(ang) * d1, 900 + Math.sin(ang) * d1 * 1.3]], { w: 2 + r() * 3, col: i % 3 ? '#fff6e0' : '#1a120c', a: 0.55 * a, pass2: false, gap: false }); }
    ctx.restore(); }
}
function hudFrame(t) {
  const name = SC[sceneAt(t)][0];
  if (name === 'times' && t < EV.hookEnd) hook(t); else titleCard(t);
  if (name === 'times' && t > EV.hookEnd + 0.05 && t < EV.h2 + 0.3) { const rv = clamp((t - EV.hookEnd - 0.05) / 0.35), f = clamp((EV.h2 + 0.3 - t) / 0.3); pencil([[1030, 400], [1030, 40]], { w: 4, col: K.amber, a: rv * f, pass2: false, gap: false }); for (const yy of [40, 400]) pencil([[1006, yy], [1054, yy]], { w: 4, col: K.amber, a: rv * f, pass2: false });
    push(990, 220, 1, -Math.PI / 2); txt('≈ 300 м льда', 0, 0, 46, { col: K.amber, reveal: rv, a: f }); pop(); }
  plate(); captions(t); endcard(t);
}
function hook(t) {
  const k = popK(t, 0.0, 0.35); push(540, 430, 0.85 + 0.15 * k, -0.02);
  ctx.save(); ctx.font = '600 150px Osw'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  for (const [s, y, c] of [['ЛЁД НАД', -86, '#f6ecd6'], ['ТАЙМС-СКВЕР?!', 80, K.amber]]) { ctx.lineWidth = 22; ctx.strokeStyle = 'rgba(12,8,6,0.94)'; ctx.strokeText(s, 0, y); ctx.fillStyle = c; ctx.fillText(s, 0, y); }
  ctx.restore(); pop();
}
function grade(name, o2) {                                         // цветокор на итоговом кадре: тон, виньетка, блум света
  const [c, a] = GRADE[name] || ['#000000', 0];
  o2.save(); o2.globalCompositeOperation = 'soft-light'; o2.globalAlpha = a; o2.fillStyle = c; o2.fillRect(0, 0, W, H);
  o2.globalCompositeOperation = 'multiply'; o2.globalAlpha = 1; const v = o2.createRadialGradient(540, 900, 380, 540, 960, 1250); v.addColorStop(0, 'rgba(255,255,255,1)'); v.addColorStop(1, 'rgba(120,100,90,1)'); o2.fillStyle = v; o2.fillRect(0, 0, W, H);
  o2.restore();
}
