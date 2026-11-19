/* 031 Мадрид — общие детали: палитра «кастильская охра, красный кирпич, серый сланец шпилей, синее небо, красно-жёлтый»,
   дома эпохи Габсбургов (кирпич + белый камень + сланцевые шпили-«чапители» + кованые балконы), Каса-де-Корреос с часами (Пуэрта-дель-Соль),
   статуя медведя с земляничным деревом, Королевский дворец, собор Альмудена, пинии, фонари.
   Глобус по смыслу: подсвечены владения Испанской империи XVI в., пин «МАДРИД?», наезд точно в центр Пиренейского полуострова —
   шесть радиальных дорог сходятся в «КМ 0», южнее метка «ЦЕНТР — ХЕТАФЕ». Бейдж «СТАТУС МАДРИДА». Отмотка 031 — мулета тореадора. */
const MD = { ink: '#160e0a', ochre: '#d8a860', ochreD: '#8a6430', brick: '#b8502a', brickD: '#6a2410', slate: '#4a5260', slateL: '#8a94a4', stone: '#f0e6d4', stoneD: '#a89878',
  red: '#c8281e', yellow: '#f8c830', sky: '#4a90d8', pine: '#2a5a2a', pineL: '#5a8a4a', gold: '#e8b84a', goldL: '#ffe08a', wood: '#7a4a24', woodD: '#3a2410' };
const MAD = { lon: -3.7038, lat: 40.4168, getafe: [-3.69, 40.31], toledo: [-4.02, 39.86], valla: [-4.72, 41.65] };
const IBERIA = [[-9.3, 43.0], [-8, 43.7], [-5, 43.6], [-1.8, 43.4], [3.2, 42.4], [3.1, 41.8], [0.8, 40.7], [0, 39.8], [-0.4, 39.3], [0.2, 38.7], [-0.8, 37.6], [-2.1, 36.7], [-4.4, 36.7], [-5.6, 36.0], [-6.3, 36.8], [-7.4, 37.2], [-8.9, 37.0], [-8.8, 38.7], [-9.5, 38.8], [-8.9, 40.2], [-8.7, 41.9]];
const RADIAL = [['N-I · ИРУН', -1.79, 43.34], ['N-II · БАРСЕЛОНА', 2.17, 41.39], ['N-III · ВАЛЕНСИЯ', -0.38, 39.47], ['N-IV · КАДИС', -6.29, 36.53], ['N-V · БАДАХОС', -6.97, 38.88], ['N-VI · ЛА-КОРУНЬЯ', -8.4, 43.37]];
const EMPIRE = [[[-117, 32], [-97, 26], [-87, 21], [-83, 10], [-90, 14], [-105, 20]], [[-81, -3], [-70, -18], [-70, -30], [-77, -12]], [[-75, 11], [-60, 8], [-64, -15], [-77, 2]], [[120, 18], [126, 7], [122, 6], [118, 10]],
  [[2.5, 51.4], [7, 53.5], [7, 50], [3, 49.8]], [[13, 41.5], [17, 40.6], [16, 38], [12.5, 38], [14, 40.5]]];

function madDetail(pr, R, t) {                                         // финал наезда: полуостров, 6 радиальных дорог в «КМ 0», центр — Хетафе
  GLOBE.fill(pr(IBERIA), '#e2c890'); pencil(pr(IBERIA.concat([IBERIA[0]])), { w: 4, col: MD.ink, a: 0.8, pass2: false, gap: false });
  const k = clamp((R - 6000) / 5000); const [mx, my] = pr([[MAD.lon, MAD.lat]])[0];
  RADIAL.forEach(([n, lo, la], i) => { const [x, y] = pr([[lo, la]])[0]; pencil([[mx, my], [lerp(mx, x, k), lerp(my, y, k)]], { w: 8, col: MD.red, a: 0.9, pass2: false, gap: false }); });
  if (k > 0.6) { const a = (k - 0.6) / 0.4; push(mx, my, 1); poly([[0, -40], [12, -12], [42, -12], [18, 6], [26, 36], [0, 18], [-26, 36], [-18, 6], [-42, -12], [-12, -12]], { wash: MD.goldL, washA: a, w: 2.4, col: MD.ink, a }); pop();
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(16,10,8,0.85)'; ctx.fillRect(mx + 40, my - 70, 200, 56); ctx.restore(); txt('КМ 0', mx + 140, my - 42, 40, { col: MD.goldL, font: 'Osw', a });
    const [gx, gy] = pr([MAD.getafe])[0]; ell(gx, gy, 10, 10, { wash: '#2ac86a', washA: a, w: 2, col: MD.ink, a }); }
}
function madExtra(pr, R, t) {                                          // глобус по смыслу: владения империи XVI в. и «МАДРИД?»
  if (R > 3000) return; const a = clamp(t / 0.3) * (1 - clamp((R - 1500) / 1500));
  if (a <= 0) return; const lon0 = lerp(-60, MAD.lon, sm(clamp(t / 0.55))), lat0 = lerp(15, MAD.lat, sm(clamp(t / 0.55)));
  EMPIRE.concat([IBERIA]).forEach(P => { if (P.some(([lo, la]) => Math.cos((lo - lon0) * Math.PI / 180) * Math.cos(la * Math.PI / 180) * Math.cos(lat0 * Math.PI / 180) + Math.sin(la * Math.PI / 180) * Math.sin(lat0 * Math.PI / 180) > 0.05)) GLOBE.fill(pr(P), '#e8402a', 0.7 * a); });
  ctx.save(); ctx.globalAlpha = a; ctx.font = '600 34px Osw'; ctx.fillStyle = 'rgba(16,10,8,0.85)'; ctx.fillRect(60, 1320, 520, 56); ctx.restore(); txt('ИСПАНСКАЯ ИМПЕРИЯ · XVI ВЕК', 320, 1348, 34, { col: '#ffb0a0', font: 'Osw', a });
}
const MAD_GLOBE = { lon: MAD.lon, lat: MAD.lat, label: 'МАДРИД?', fromLon: -60, fromLat: 15, Rend: 12000, detail: madDetail, extra: madExtra };

// ---------- город
function habsburg(x, base, w, h, col, t, o = {}) {                     // дом: кирпич/охра, белые обрамления, кованые балконы, сланцевая крыша
  const L = MD.ink; rect(x, base - h, w, h, { wash: col, washA: 1, w: 2, col: L, shade: { gap: 8, a: 0.12, col: lerpC(col, '#000', 0.4), ang: 1.4 } });
  rect(x - 8, base - h - 16, w + 16, 16, { wash: MD.stone, washA: 1, w: 1.6, col: L }); poly([[x - 8, base - h - 16], [x + w / 2, base - h - 50], [x + w + 8, base - h - 16]], { wash: MD.slate, washA: 1, w: 1.6, col: L });
  const n = Math.max(2, Math.floor(w / 56)), fl = Math.max(1, Math.floor(h / 80));
  for (let f = 0; f < fl; f++) for (let i = 0; i < n; i++) { const wx = x + 14 + i * (w - 28) / n, wy = base - h + 18 + f * 78, ww = (w - 28) / n - 14;
    rect(wx - 4, wy - 4, ww + 8, 56, { wash: MD.stone, washA: 1, w: 1, col: L }); rect(wx, wy, ww, 48, { wash: o.lit && (i + f) % 3 === 0 ? '#ffd890' : '#2a3a4a', washA: 1, w: 1, col: L });
    if (f < fl - 1 || fl === 1) { pencil([[wx - 6, wy + 50], [wx + ww + 6, wy + 50]], { w: 3, col: '#1a1a1e', pass2: false }); for (let q = 0; q < 4; q++) pencil([[wx + q * ww / 3, wy + 50], [wx + q * ww / 3, wy + 64]], { w: 1.6, col: '#1a1a1e', pass2: false });
      if ((i + f) % 3 === 1) for (let q = 0; q < 3; q++) ell(wx + 6 + q * ww / 3, wy + 46, 6, 5, { wash: '#e84a3a', washA: 1, line: false }); } }
  if (o.spire) for (const sx of [x + 10, x + w - 10]) { rect(sx - 22, base - h - 110, 44, 94, { wash: col, washA: 1, w: 1.6, col: L }); poly([[sx - 26, base - h - 110], [sx, base - h - 200], [sx + 26, base - h - 110]], { wash: MD.slate, washA: 1, w: 1.6, col: L }); pencil([[sx, base - h - 200], [sx, base - h - 230]], { w: 3, col: MD.gold, pass2: false }); }
}
function correos(x, base, s, t) {                                      // Каса-де-Корреос с часами (Пуэрта-дель-Соль)
  push(x, base, s); const L = MD.ink; rect(-300, -260, 600, 260, { wash: '#e8b890', washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.12, col: '#8a5a3a', ang: 1.4 } });
  for (let i = 0; i < 9; i++) { const wx = -280 + i * 64; rect(wx, -220, 40, 60, { wash: '#2a3a4a', washA: 1, w: 1.4, col: L }); rect(wx, -120, 40, 70, { wash: '#2a3a4a', washA: 1, w: 1.4, col: L }); pencil([[wx - 4, -54], [wx + 44, -54]], { w: 3, col: '#1a1a1e', pass2: false }); }
  rect(-60, -340, 120, 80, { wash: MD.stone, washA: 1, w: 2, col: L }); rect(-40, -420, 80, 80, { wash: MD.stone, washA: 1, w: 2, col: L }); ell(0, -380, 30, 30, { wash: '#fff8e8', washA: 1, w: 2, col: L });
  const a = t * 0.3; pencil([[0, -380], [Math.sin(a) * 20, -380 - Math.cos(a) * 20]], { w: 3, col: L, pass2: false }); pencil([[0, -380], [Math.sin(a * 12) * 26, -380 - Math.cos(a * 12) * 26]], { w: 2, col: L, pass2: false });
  pencil([[0, -420], [0, -470]], { w: 4, col: L, pass2: false }); ell(0, -478, 12, 12, { wash: MD.gold, washA: 1, w: 1.6, col: L });
  pencil([[-300, -260], [300, -260]], { w: 4, col: MD.stone, pass2: false }); rect(-40, -60, 80, 60, { wash: '#4a2a1a', washA: 1, w: 1.6, col: L }); pop();
}
function bearTree(x, base, s, t) {                                     // статуя «Медведь и земляничное дерево»
  push(x, base, s); const L = MD.ink; rect(-80, -60, 160, 60, { wash: '#c8c0b0', washA: 1, w: 2, col: L });
  blob([[-20, -60], [-30, -150], [0, -260], [20, -150], [30, -60]], { wash: '#5a4a3a', washA: 1, w: 2, col: L }); for (let q = 0; q < 6; q++) ell(-60 + q * 24, -260 - Math.sin(q) * 30, 40, 30, { wash: '#3a5a3a', washA: 1, w: 1.4, col: L }); for (let q = 0; q < 8; q++) ell(-60 + q * 18, -250 + (q % 3) * 10, 6, 6, { wash: MD.red, washA: 1, line: false });
  blob([[-70, -60], [-80, -140], [-60, -190], [-30, -200], [-10, -170], [-10, -60]], { wash: '#4a3a30', washA: 1, w: 2, col: L }); ell(-40, -200, 24, 20, { wash: '#4a3a30', washA: 1, w: 1.6, col: L }); pencil([[-10, -170], [10, -190]], { w: 10, col: '#4a3a30', pass2: false }); pop();
}
function umbrellaPine(x, y, h, t, seed = 1) { const sw = Math.sin(t + seed) * 4; pencil([[x, y], [x + h * 0.04, y - h * 0.6], [x + sw, y - h * 0.8]], { w: h * 0.05, col: '#6a4a2a', pass2: false });
  blob([[x - h * 0.42 + sw, y - h * 0.78], [x - h * 0.3 + sw, y - h], [x + sw, y - h * 1.06], [x + h * 0.32 + sw, y - h], [x + h * 0.44 + sw, y - h * 0.8], [x + sw, y - h * 0.72]], { wash: MD.pine, washA: 1, w: 2, col: MD.ink, shade: { gap: 5, a: 0.3, col: '#0e2a10', ang: 1.2 } });
  for (let q = 0; q < 5; q++) ell(x - h * 0.3 + q * h * 0.15 + sw, y - h * 0.92, h * 0.06, h * 0.03, { wash: MD.pineL, washA: 0.8, line: false }); }
function lamp(x, y, s, on = 1) { push(x, y, s); pencil([[0, 0], [0, -260]], { w: 8, col: '#1a1a1e', pass2: false }); poly([[-20, -260], [20, -260], [14, -310], [-14, -310]], { wash: on ? '#ffe0a0' : '#4a4a52', washA: 1, w: 2, col: MD.ink }); if (on) glow(0, -285, 40, 'rgba(255,220,150,1)', 0.35); pop(); }

// ---------- бейдж «СТАТУС МАДРИДА»
const MSTAT = { saber: ['ЯМЫ-ЛОВУШКИ', '#6a5a3a'], mayrit: ['КРЕПОСТЬ', '#2a7a5a'], court: ['СТОЛИЦА ИМПЕРИИ', '#c8281e'], palace: ['СТОЛИЦА', '#c8281e'], goya: ['ВОССТАЛ', '#8a1a1a'],
  siege: ['В ОСАДЕ', '#3a3a3a'], cathedral: ['ЕСТЬ СОБОР!', '#1e6aa8'], today: ['КМ 0', '#a8781a'] };
let MAPON = -1;
function madBadge(t, name) {
  const O = MSTAT[name]; if (!O || t < S0[name] + 0.15 || MAPON === t) return; const ap = clamp((t - S0[name] - 0.15) / 0.2), t0 = name === 'cathedral' ? EV.ct_93 : S0[name] + 0.45;
  push(780, 1300, 1, -0.04); ctx.save(); ctx.globalAlpha = ap; rect(-130, -80, 260, 160, { wash: '#f0e6cc', washA: 1, w: 3, col: MD.ink }); txt('СТАТУС МАДРИДА', 0, -56, 22, { col: MD.ink, font: 'Osw' });
  push(0, 50, 0.13); correos(0, 0, 1, t); pop(); ctx.restore();
  if (name === 'cathedral' && t < t0) stampM(0, 14, 0.36, 'БЕЗ СОБОРА', '#5a5a5a', -0.16, popK(t, S0.cathedral + 0.45, 0.3));
  else stampM(0, 14, O[0].length > 10 ? 0.32 : 0.42, O[0], O[1], -0.16, popK(t, t0, 0.3)); pop();
}
function stampM(x, y, s, text, col, rot, k = 1, o = {}) {
  if (k <= 0) return; const sc = s * (1 + (1 - Math.min(1, k)) * 1.4); ctx.save(); ctx.globalAlpha = Math.min(1, k * 1.6) * 0.94; push(x, y, sc, rot);
  ctx.font = `600 ${o.size || 64}px Osw`; const w = ctx.measureText(text).width + 50, h = (o.size || 64) * 1.45;
  pencil([[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2], [-w / 2, -h / 2]], { w: 7, col, pass2: false }); pencil([[-w / 2 + 12, -h / 2 + 12], [w / 2 - 12, -h / 2 + 12], [w / 2 - 12, h / 2 - 12], [-w / 2 + 12, h / 2 - 12], [-w / 2 + 12, -h / 2 + 12]], { w: 3, col, pass2: false });
  txt(text, 0, 2, o.size || 64, { col, font: 'Osw' }); pop(); ctx.restore();
}
function infoPlate(x, y, lines, t, t0, o = {}) {
  if (t < t0) return; const k = popK(t, t0, 0.3); push(x, y, k, o.rot ?? -0.03); ctx.save(); const w = Math.max(...lines.map(([s, sz]) => { ctx.font = `600 ${sz}px Osw`; return ctx.measureText(s).width; })) + 50, h = lines.reduce((a, [, sz]) => a + sz * 1.25, 0) + 30;
  ctx.fillStyle = o.bg || 'rgba(14,10,8,0.88)'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.restore(); pencil([[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2], [-w / 2, -h / 2]], { w: 4, col: o.edge || MD.goldL, pass2: false });
  let yy = -h / 2 + 15; lines.forEach(([s, sz, c]) => { yy += sz * 0.62; txt(s, 0, yy, sz, { col: c || '#fff6e0', font: 'Osw' }); yy += sz * 0.63; }); pop();
}

// ---------- отмотка: мулета тореадора — полный оборот, красная ткань заливает кадр
function wTunnelMD(t, u, cat) {
  const p = u / (S1.tunnel - S0.tunnel), r = 6.283 * sm(clamp(p / 0.72));
  lay(40, () => scr(() => { vgrad(0, 1920, ['#f8c830', '#e8903a', '#8a2a1a'], 1); ell(540, 1500, 900, 300, { wash: '#e8c890', washA: 1, line: false }); for (let i = 0; i < 3; i++) pencil(ellPts(540, 1500, 900 - i * 60, 300 - i * 20, 0, 0, 60), { w: 6, col: '#c8281e', a: 0.5, pass2: false });
    const rr = rng(hsh(FRAME, 7100)); for (let i = 0; i < 40; i++) { const a = rr() * 6.283, d0 = 200 + rr() * 300, d1 = d0 + 400; pencil([[540 + Math.cos(a) * d0, 960 + Math.sin(a) * d0], [540 + Math.cos(a) * d1, 960 + Math.sin(a) * d1]], { w: 4, col: '#fff6d0', a: 0.4 * p, pass2: false, gap: false }); } }));
  lay(1, () => { cat(); scr(() => { const cx = 540, cy = 1000, R = 260 + p * 300; const P = []; for (let q = 0; q <= 24; q++) { const a = r * 1.4 + q / 24 * 3.6, rr = R * (0.6 + 0.4 * Math.sin(q / 24 * 3.14)); P.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.8]); }
    P.push([cx, cy]); shape(P, { wash: '#c8181a', washA: 1, w: 3, col: MD.ink, shade: { gap: 10, a: 0.25, col: '#6a0a08', ang: r } });
    if (p > 0.8) { const k = (p - 0.8) / 0.2; ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#c8181a'; ctx.fillRect(0, 0, W, H); ctx.restore(); } }); });
}
WORLD.tunnel = wTunnelMD;
DIR.tunnel = { outfit: 'hoodieMAD', light: { side: 1, rim: '#ffe0a0' }, grade: ['#6a1a0a', 0.1], act: () => [[S0.tunnel, 'grin'], [S0.tunnel + 0.8, 'proud']],
  pose: (t, u, b) => { const p = u / (S1.tunnel - S0.tunnel), r = 6.283 * sm(clamp(p / 0.72)), sc = 0.95 + 0.06 * sm(clamp(p / 0.72));
    return Object.assign(b, { x: 540 - Math.sin(r) * 260 * sc, y: 1000 + Math.cos(r) * 260 * sc, s: sc, rot: r, look: [0, -0.2], hand: [180, -330], tailUp: true }); },
  cam: () => [[S0.tunnel, 540, 960, 0], [S0.tunnel + 1.0, 540, 930, 0.1], [S1.tunnel, 540, 900, 0.18]] };

// ---------- море/вода (из 029)
function seaKR(y0, y1, t, seed, o = {}) {                               // море: градиент, волны-штрихи, блики, пена
  const c = o.cols || ['#2a7ab8', '#1a4a80', '#0c2a4a']; vgrad(y0, y1, c, 1);
  const r = rng(seed); for (let i = 0; i < (o.n || 46); i++) { const yy = y0 + Math.pow(r(), 1.6) * (y1 - y0), x = r() * 1700 - 300 + Math.sin(t * 0.8 + i) * 14, w = 30 + (yy - y0) / (y1 - y0) * 120;
    pencil([[x - w, yy], [x - w * 0.3, yy - 5], [x + w * 0.3, yy - 5], [x + w, yy]], { w: 1.5 + (yy - y0) / (y1 - y0) * 3, col: i % 3 ? (o.wave || '#8ac8f0') : '#e8f4f8', a: 0.55, pass2: false, gap: false }); }
  if (o.glint) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.35; for (let i = 0; i < 18; i++) { ctx.fillStyle = o.glint; ctx.fillRect(o.gx - 90 + Math.sin(i * 7 + t * 2) * 110, y0 + 10 + i * (y1 - y0) / 22, 50 - i * 2, 4); } ctx.restore(); }
}
