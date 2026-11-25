/* 035 Черногория — общие детали: палитра «чёрные горы Ловчена, адриатическая лазурь, терракота Котора, красный с золотом, оливки».
   Сквозная нить — папка-досье «ДЕЛО №1904: ВОЙНА С ЯПОНИЕЙ» (HUD-бейдж): в каждой эпохе к делу подшивается улика со штампом.
   Глобус по смыслу: от Японии через всю Евразию тянется пунктир «фронта» до крошечной Черногории; наезд в Которский залив.
   Карты: путь добровольцев в Маньчжурию, Черногория тонет в Югославии, линия «МИР» Токио — Подгорица. Отмотка 035 — волна Адриатики. */
const MEC = { ink: '#14100c', black: '#1e2420', blackL: '#3a4438', mnt: '#4a5448', sea: '#1e7aa8', seaL: '#6ac8e0', seaD: '#0e4a70', terra: '#c8603a', terraD: '#7a2a14', stone: '#d8ccb4', stoneD: '#8a7e68',
  red: '#c0201e', gold: '#e0b030', olive: '#6a7a3a', oliveL: '#a8b860', cypress: '#2a4a2a', sky: '#6ab0e0', jp: '#e8e4dc', jpRed: '#bc002d', night: '#101828' };
const MEG = { kotor: [18.77, 42.42], podgorica: [19.26, 42.44], cetinje: [18.92, 42.39], budva: [18.84, 42.29], tokyo: [139.69, 35.69], mukden: [123.43, 41.8], belgrade: [20.46, 44.82], berlin: [13.40, 52.52],
  stpete: [30.31, 59.94], moscow: [37.62, 55.75], vladivostok: [131.9, 43.1], portArthur: [121.25, 38.8] };
const ME_POLY = [[18.45, 42.48], [18.55, 42.65], [18.95, 43.2], [19.2, 43.5], [19.55, 43.25], [20.0, 43.0], [20.35, 42.85], [20.05, 42.55], [19.75, 42.5], [19.4, 41.85], [19.05, 41.95], [18.85, 42.25], [18.55, 42.4]];
const YU_POLY = [[13.6, 45.5], [16.0, 46.5], [19.0, 46.2], [20.5, 46.2], [22.5, 44.5], [23.0, 42.5], [22.5, 41.2], [20.5, 40.9], [19.4, 41.85], [18.4, 42.5], [16.5, 43.5], [15.0, 44.5], [13.6, 45.1]];
const ADRIA = [[12.3, 45.6], [13.7, 45.7], [14.5, 45.2], [15.2, 44.3], [16.4, 43.5], [17.6, 43.0], [18.5, 42.4], [19.4, 41.8], [19.5, 40.6], [18.5, 40.1], [17.0, 40.5], [16.0, 41.4], [14.0, 42.2], [13.5, 43.6], [12.4, 44.4]];

function meLabel(x, y, s, size, o = {}) { ctx.save(); ctx.globalAlpha = o.a ?? 1; ctx.font = `600 ${size}px Osw`; const w = ctx.measureText(s).width + 30; ctx.fillStyle = o.bg || 'rgba(16,10,8,0.86)'; ctx.fillRect(x, y - size * 0.72, w, size * 1.34); ctx.restore();
  txt(s, x + w / 2, y, size, { col: o.col || '#ffe08a', font: 'Osw', a: o.a ?? 1 }); return w; }
function meBoard(x, y, s, t, t0, rows, o = {}) { const k = popK(t, t0, 0.3); if (k <= 0) return; push(x, y, s * k, o.rot ?? -0.02); const w = o.w || 520, h = 70 + rows.length * 66;
  ctx.save(); ctx.fillStyle = o.bg || 'rgba(16,14,12,0.9)'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.restore(); pencil([[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2], [-w / 2, -h / 2]], { w: 4, col: o.edge || MEC.gold, pass2: false, gap: false });
  rows.forEach(([s1, size, col], i) => txt(s1, 0, -h / 2 + 66 + i * 66, size || 48, { col: col || '#fff6e0', font: 'Osw' })); pop(); }
function stamp(x, y, s, t, t0, text, col = MEC.red, rot = -0.15) { const k = popK(t, t0, 0.25); if (k <= 0) return; push(x, y, s * (1.6 - 0.6 * k), rot); ctx.save(); ctx.globalAlpha = Math.min(1, k * 1.4); ctx.font = '700 46px Osw'; const w = ctx.measureText(text).width + 40; ctx.restore();
  pencil([[-w / 2, -40], [w / 2, -40], [w / 2, 40], [-w / 2, 40], [-w / 2, -40]], { w: 6, col, pass2: false, gap: true }); txt(text, 0, 4, 46, { col, font: 'Osw' }); pop(); }

// ---------- глобус и карты
function meDetail(pr, R, t) {                                           // финал наезда: Черногория, Которский залив, Котор, Цетине, Подгорица
  GLOBE.fill(pr(ME_POLY), '#c8b890'); pencil(pr(ME_POLY.concat([ME_POLY[0]])), { w: 4, col: MEC.ink, a: 0.8, pass2: false, gap: false });
  GLOBE.fill(pr([[18.55, 42.48], [18.68, 42.5], [18.77, 42.44], [18.72, 42.4], [18.62, 42.43], [18.56, 42.4]]), '#2a76b0');
  const k = clamp((R - 8000) / 9000); if (k <= 0) return;
  [['КОТОР', MEG.kotor, 46], ['ЦЕТИНЕ', MEG.cetinje, 32], ['ПОДГОРИЦА', MEG.podgorica, 34]].forEach(([n, ll, sz], i) => { const [x, y] = pr([ll])[0]; ell(x, y, i ? 12 : 20, i ? 12 : 20, { wash: MEC.red, washA: k, w: 3, col: MEC.ink, a: k }); meLabel(x + 28, y + 6, n, sz, { a: k }); });
}
function meExtra(pr, R, t) {                                            // глобус по смыслу: Япония — пунктир «фронта» — Черногория
  if (R > 2600) return; const a = clamp(t / 0.25) * (1 - clamp((R - 1400) / 1200)); if (a <= 0) return;
  GLOBE.fill(pr(ME_POLY), MEC.red, a); const [x0, y0] = pr([MEG.podgorica])[0], [x1, y1] = pr([MEG.tokyo])[0];
  pencil([[x0, y0], [(x0 + x1) / 2, Math.min(y0, y1) - 120], [x1, y1]], { w: 5, col: '#ff6a4a', a, pass2: false, gap: true }); txt('⚔?', (x0 + x1) / 2, Math.min(y0, y1) - 150, 70, { col: '#ffe08a', font: 'Osw', a });
}
const ME_GLOBE = { lon: MEG.kotor[0], lat: MEG.kotor[1], label: 'ЧЕРНОГОРИЯ', fromLon: 110, fromLat: 35, Rend: 30000, detail: meDetail, extra: meExtra };

// ---------- сквозная нить: досье с уликами
const EVID = { name: 'ИМЯ', kotor: 'КОТОР', berlin: '1878', volunteers: 'ДОБРОВОЛЬЦЫ', peace: 'МИР БЕЗ НЕЁ', yugo: 'ИСЧЕЗЛА', vote: '55,5 %', japan: 'МИР 2006', today: 'ВЕРДИКТ' };
function dossier(t, name) {
  const ev = EVID[name]; if (!ev || t < S0[name] + 0.2) return; const k = popK(t, S0[name] + 0.2, 0.3), n = Object.keys(EVID).indexOf(name) + 1;
  push(840, 740, 0.8 * k, 0.04); rect(-110, -120, 220, 240, { wash: '#d8b878', washA: 1, w: 3, col: MEC.ink }); rect(-110, -140, 90, 26, { wash: '#d8b878', washA: 1, w: 2, col: MEC.ink });
  txt('ДЕЛО №1904', 0, -84, 28, { col: '#3a2a10', font: 'Osw' }); txt('ВОЙНА С ЯПОНИЕЙ', 0, -50, 20, { col: '#3a2a10', font: 'Osw' });
  for (let i = 0; i < Math.min(n, 4); i++) pencil([[-80, -20 + i * 18], [80, -20 + i * 18]], { w: 2, col: '#6a5a3a', a: 0.6, pass2: false });
  push(0, 66, 0.62, -0.12); pencil([[-150, -40], [150, -40], [150, 40], [-150, 40], [-150, -40]], { w: 6, col: MEC.red, pass2: false, gap: true }); txt(ev, 0, 4, 44, { col: MEC.red, font: 'Osw' }); pop();
  txt('улика ' + n, 70, 110, 20, { col: '#3a2a10', font: 'Hand' }); pop();
}

// ---------- пейзаж и постройки
function blackMountain(x0, x1, base, h, t, seed, o = {}) {               // карстовые горы: зубчатые вершины, тёмный лес, светлые осыпи
  const r = rng(seed), pts = [[x0, base]]; for (let x = x0; x <= x1; x += 60) pts.push([x, base - h * (0.55 + 0.45 * Math.abs(Math.sin(x * 0.006 + seed))) - r() * h * 0.15]); pts.push([x1, base]);
  poly(pts, { wash: o.col || MEC.mnt, washA: 1, w: 2, col: MEC.ink, shade: { gap: 10, a: 0.18, col: '#141a14', ang: 1.1 } });
  for (let i = 0; i < (o.trees ?? 30); i++) { const x = x0 + r() * (x1 - x0), y = base - r() * h * 0.5; ell(x, y, 14 + r() * 10, 18 + r() * 10, { wash: o.forest || MEC.black, washA: 0.9, line: false }); }
  for (let i = 0; i < 6; i++) { const x = x0 + r() * (x1 - x0); pencil([[x, base - h * 0.6], [x + 20, base - h * 0.2]], { w: 3, col: '#a8a490', a: 0.5, pass2: false }); }
}
function stoneHouse(x, base, w, h, t, o = {}) {                         // каменный дом побережья: терракотовая черепица, ставни, балкон
  const L = MEC.ink; rect(x - w / 2, base - h, w, h, { wash: o.col || MEC.stone, washA: 1, w: 2, col: L, shade: { gap: 9, a: 0.12, col: MEC.stoneD, ang: 0.4 } });
  poly([[x - w / 2 - 10, base - h], [x, base - h - h * 0.35], [x + w / 2 + 10, base - h]], { wash: o.dark ? '#5a3a30' : MEC.terra, washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.25, col: MEC.terraD, ang: 0.5 } });
  const n = Math.max(1, Math.floor(w / 60)); for (let i = 0; i < n; i++) { const wx = x - w / 2 + 16 + i * (w - 32) / n; rect(wx, base - h * 0.75, 24, 34, { wash: o.lit ? '#ffd890' : '#2a3a40', washA: 1, w: 1.2, col: L }); rect(wx - 8, base - h * 0.75, 8, 34, { wash: o.shut || '#2a6a5a', washA: 1, w: 1, col: L }); rect(wx + 24, base - h * 0.75, 8, 34, { wash: o.shut || '#2a6a5a', washA: 1, w: 1, col: L }); }
  if (o.door) rect(x - 18, base - h * 0.4, 36, h * 0.4, { wash: '#5a3a22', washA: 1, w: 1.4, col: L });
}
function cypress(x, base, h, t, seed = 1) { const sw = Math.sin(t * 0.9 + seed) * 4; blob([[x - h * 0.08, base], [x - h * 0.1 + sw * 0.3, base - h * 0.5], [x + sw, base - h], [x + h * 0.1 + sw * 0.3, base - h * 0.5], [x + h * 0.08, base]], { wash: MEC.cypress, washA: 1, w: 1.6, col: MEC.ink }); }
function olive(x, base, h, t, seed = 1) { const r = rng(9000 + seed); pencil([[x, base], [x - 10, base - h * 0.4], [x + 6, base - h * 0.6]], { w: 10, col: '#6a5a4a', pass2: false }); for (let i = 0; i < 7; i++) ell(x + (r() - 0.5) * h * 0.7, base - h * (0.55 + r() * 0.35), h * 0.14, h * 0.09, { wash: i % 2 ? MEC.olive : MEC.oliveL, washA: 1, w: 1.2, col: '#2a3a1a' }); }
function kotorWalls(x0, base, h, t) {                                    // стены Котора зигзагом на гору к крепости Святого Иоанна
  const pts = [[x0, base], [x0 + 120, base - h * 0.25], [x0 + 40, base - h * 0.45], [x0 + 180, base - h * 0.65], [x0 + 90, base - h * 0.85], [x0 + 200, base - h]];
  pencil(pts, { w: 10, col: MEC.stone, pass2: false }); pencil(pts, { w: 3, col: MEC.stoneD, pass2: false }); for (let i = 0; i < pts.length; i++) rect(pts[i][0] - 10, pts[i][1] - 16, 20, 16, { wash: MEC.stone, washA: 1, w: 1.4, col: MEC.ink });
  push(x0 + 200, base - h, 0.6); rect(-50, -60, 100, 60, { wash: MEC.stone, washA: 1, w: 2, col: MEC.ink }); rect(-20, -100, 40, 40, { wash: MEC.stone, washA: 1, w: 1.6, col: MEC.ink }); pop();
}
function meFlag(x, y, w, h, t, o = {}) {                                 // красный флаг с золотой каймой и орлом (упрощённо; только в своих эпохах)
  const pts = []; for (let q = 0; q <= w; q += 20) pts.push([x + q, y + Math.sin(t * 4 + q * 0.04) * 6 * q / w]); for (let q = w; q >= 0; q -= 20) pts.push([x + q, y + h + Math.sin(t * 4 + q * 0.04) * 6 * q / w]);
  poly(pts, { wash: MEC.red, washA: 1, w: 3, col: MEC.gold }); push(x + w / 2, y + h / 2, h / 120); poly([[0, -30], [-30, -10], [-40, 20], [-10, 10], [0, 30], [10, 10], [40, 20], [30, -10]], { wash: MEC.gold, washA: 1, w: 1.4, col: '#7a5a10' }); pop();
  pencil([[x, y - 10], [x, y + (o.pole || 400)]], { w: 6, col: '#4a3a2a', pass2: false });
}
function boat(x, y, s, t, o = {}) { push(x, y + Math.sin(t * 2 + x) * 4, s, Math.sin(t * 1.5 + x) * 0.03); blob([[-130, 0], [-100, 34], [100, 34], [140, -4]], { wash: o.col || '#f4efe4', washA: 1, w: 2, col: MEC.ink }); rect(-120, -6, 250, 10, { wash: o.stripe || '#2a6aa8', washA: 1, line: false });
  if (o.sail) { pencil([[0, 0], [0, -220]], { w: 4, col: '#4a3a2a', pass2: false }); poly([[4, -210], [110, -30], [4, -20]], { wash: o.sail, washA: 1, w: 1.6, col: MEC.ink }); } pop(); }
function sea(y0, y1, t, o = {}) { rect(-600, y0, 2400, y1 - y0, { wash: o.col || MEC.sea, washA: 1, line: false }); vgrad(y0, y1, [o.colL || MEC.seaL, o.col || MEC.sea, o.colD || MEC.seaD], 0.75);
  for (let i = 0; i < 24; i++) { const r = rng(9100 + i), y = y0 + 8 + r() * (y1 - y0 - 16), x = ((r() * 1600 + t * (16 + r() * 20)) % 1800) - 300; pencil([[x, y], [x + 40 + r() * 50, y]], { w: 2.4, col: '#e8fbff', a: 0.55, pass2: false }); } }

// ---------- отмотка 035: волна Адриатики — водоворот, пена, пузыри, провал в глубину
function wTunnelME(t, u, cat) {
  const p = u / (S1.tunnel - S0.tunnel);
  lay(30, () => scr(() => { const g = ctx.createRadialGradient(540, 980, 30, 540, 980, 1300); g.addColorStop(0, '#e8fbff'); g.addColorStop(0.3, MEC.seaL); g.addColorStop(0.7, MEC.sea); g.addColorStop(1, MEC.seaD); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let k = 0; k < 7; k++) { const pts = []; for (let i = 0; i < 60; i++) { const a = i / 60 * 6.283 * 1.5 + p * 8 + k, d = (80 + k * 130) * (1 - p * 0.5) + i * 4; pts.push([540 + Math.cos(a) * d, 980 + Math.sin(a) * d * 1.2]); } pencil(pts, { w: 10 - k, col: '#ffffff', a: 0.4, pass2: false, gap: false }); }
    const r = rng(hsh(FRAME, 9200)); for (let i = 0; i < 40; i++) { const a = r() * 6.283, d = 100 + r() * 800; ell(540 + Math.cos(a) * d, 980 + Math.sin(a) * d - p * 400 * r(), 6 + r() * 12, 6 + r() * 12, { wash: '#ffffff', washA: 0.4, w: 1, col: '#ffffff', a: 0.5 }); }
  }));
  lay(1, () => cat());
  scr(() => { if (p > 0.82) { const k = (p - 0.82) / 0.18; ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#f0fbff'; ctx.fillRect(0, 0, W, H); ctx.restore(); } });
}
WORLD.tunnel = wTunnelME;
DIR.tunnel = { outfit: 'hoodieME', light: { side: 1, rim: '#bff0ff' }, grade: ['#08203a', 0.1], act: () => [[S0.tunnel, 'grin'], [S0.tunnel + 0.7, 'awe']],
  pose: (t, u, b) => { const p = u / (S1.tunnel - S0.tunnel), r = 6.283 * sm(clamp(p / 0.7)), sc = 0.95 + 0.06 * sm(clamp(p / 0.7));
    return Object.assign(b, { x: 540 - Math.sin(r) * 260 * sc, y: 1000 + Math.cos(r) * 260 * sc, s: sc, rot: r, look: [0, -0.4], hand: [170, -340], tailUp: true }); },
  cam: () => [[S0.tunnel, 540, 960, 0], [S0.tunnel + 1.0, 540, 930, 0.1], [S1.tunnel, 540, 900, 0.18]] };

// лошадь (из 033/034)
function horse(x, y, s, t, o = {}) {                                   // лошадь Пржевальского: буланое тело, стоячая тёмная грива, светлая морда, тёмные ноги
  push(x, y, s, 0, o.flip || 1); const L = MEC.ink, c = o.col || '#c89a5a', ph = t * (o.walk ? 6 : 0) + (o.seed || 0);
  for (const [lx, d] of [[-70, 0], [-46, 1], [60, 1], [84, 0]]) { const sw = Math.sin(ph + d * 3) * 10; pencil([[lx, -90], [lx + sw, -40], [lx + sw * 0.5, 0]], { w: 12, col: '#3a2a1e', pass2: false }); }
  blob([[-100, -110], [-80, -160], [40, -166], [110, -150], [116, -100], [80, -80], [-60, -78], [-100, -90]], { wash: c, washA: 1, w: 2.4, col: L });
  blob([[96, -150], [126, -210], [150, -232], [176, -214], [170, -190], [140, -160], [116, -120]], { wash: c, washA: 1, w: 2.2, col: L });
  ell(166, -206, 20, 16, { wash: '#efe0c0', washA: 1, w: 1.6, col: L }); ell(150, -226, 3, 3, { wash: L, washA: 1, line: false });
  for (let i = 0; i < 9; i++) pencil([[104 + i * 6, -156 - i * 9], [100 + i * 6, -174 - i * 9]], { w: 5, col: '#2a1e14', pass2: false });
  pencil([[-100, -120], [-124, -70 + Math.sin(t * 3 + (o.seed || 0)) * 10]], { w: 9, col: '#2a1e14', pass2: false }); pencil([[-60, -96], [80, -96]], { w: 3, col: '#5a3a1a', a: 0.6, pass2: false });
  pop();
}
