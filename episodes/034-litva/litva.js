/* 034 Литва — общие детали: палитра «янтарь, дубовая зелень, жёлто-зелёно-красный, барокко Вильнюса, балтийская серость».
   Сквозная нить — янтарный кулон-карта (HUD-бейдж в каждой эпохе): внутри застывшая карта Литвы своего времени — от крошечной
   языческой до ВКЛ «от моря до моря» и обратно. Глобус по смыслу: Европа → крошечная Литва, пунктир до Чёрного моря и «?»;
   наезд точно в Вильнюс (Нерис, Гедиминова башня). Карты: рост ВКЛ, Люблин 1569 (ножницы), 1795 (империя), Балтийский путь.
   Отмотка 034 — янтарь: Том крутит кулон, кадр застывает в смоле и проваливается в золотую каплю. */
const LTC = { ink: '#14100c', amber: '#e8a028', amberL: '#ffd27a', amberD: '#8a4a0a', oak: '#3a6a2a', oakD: '#1e3a16', oakL: '#7aa848', yel: '#f2c02a', grn: '#1e7a3a', red: '#c0282a',
  brick: '#b8583a', stone: '#c8c0b0', stoneD: '#7a7268', white: '#f4efe4', sea: '#3a6a9a', grey: '#8a8e96', greyD: '#4a4e56', night: '#121a2a', gold: '#d8a838', ruRed: '#a83a2a' };
const LTG = { vilnius: [25.28, 54.69], trakai: [24.93, 54.64], kaunas: [23.90, 54.90], grunwald: [20.12, 53.48], lublin: [22.57, 51.25], kyiv: [30.52, 50.45], tallinn: [24.75, 59.44], riga: [24.10, 56.95],
  moscow: [37.62, 55.75], warsaw: [21.01, 52.23], spb: [30.31, 59.94], odesa: [30.73, 46.48], konig: [20.51, 54.71] };
const LT_NOW = [[21.0, 56.0], [22.2, 56.4], [24.0, 56.3], [25.7, 56.15], [26.6, 55.7], [26.8, 55.3], [25.8, 54.8], [25.7, 54.3], [24.4, 53.9], [23.5, 53.95], [22.9, 54.4], [22.7, 54.8], [21.3, 55.2], [21.0, 55.7]];
const GDL = [[21.0, 55.9], [24.5, 56.4], [27.5, 55.9], [30.5, 56.2], [33.0, 55.9], [35.3, 55.5], [36.0, 54.5], [35.5, 52.5], [34.5, 51.0], [34.0, 49.5], [33.0, 47.5], [31.6, 46.5], [30.3, 46.4], [29.6, 47.3], [28.2, 48.3],
  [26.5, 49.0], [24.0, 50.6], [23.5, 51.8], [23.4, 53.5], [22.6, 54.4], [21.3, 55.2]];
const UA_CUT = [[23.6, 51.6], [26.5, 52.0], [30.5, 51.4], [32.5, 52.0], [34.5, 51.0], [34.0, 49.5], [33.0, 47.5], [31.6, 46.5], [30.3, 46.4], [29.6, 47.3], [28.2, 48.3], [26.5, 49.0], [24.0, 50.6]];
const GDL_1569 = [[21.0, 55.9], [24.5, 56.4], [27.5, 55.9], [30.5, 56.2], [32.0, 55.6], [32.5, 54.0], [32.5, 52.0], [30.5, 51.4], [26.5, 52.0], [23.6, 51.6], [23.4, 53.5], [22.6, 54.4], [21.3, 55.2]];
const CORE_1250 = [[21.2, 55.8], [23.5, 56.3], [26.0, 55.9], [27.2, 55.0], [26.5, 54.0], [24.5, 53.6], [23.0, 54.2], [21.4, 55.1]];
const POLAND = [[14.5, 53.9], [18.5, 54.8], [20.0, 54.3], [22.6, 54.4], [23.4, 53.5], [23.5, 51.8], [24.0, 50.6], [22.5, 49.1], [19.0, 49.4], [16.5, 50.4], [15.0, 51.0], [14.6, 52.5]];
const BLACK = [[27.8, 42.5], [28.6, 44.3], [29.7, 45.3], [30.8, 46.5], [32.0, 46.4], [33.6, 46.1], [33.5, 44.6], [35.4, 45.1], [36.6, 45.3], [38.3, 44.4], [40.0, 43.4], [41.6, 41.6], [36.0, 41.6], [31.0, 41.2], [29.0, 41.2], [28.0, 41.6]];
const BALTIC_L = [[10, 54], [14, 54], [18, 54.6], [21, 55], [21, 57], [24, 57.4], [24, 59.4], [30, 60], [28.5, 60.6], [22.5, 60.4], [21.4, 63], [25.2, 65.4], [22, 65.9], [17.8, 62.8], [17.2, 60.6], [18.8, 59.6], [16.6, 57.2], [14.2, 55.6], [12.6, 56.2], [10.6, 57.6], [8.4, 57.2], [10.6, 55.6]];

function ltLabel(x, y, s, size, o = {}) { ctx.save(); ctx.globalAlpha = o.a ?? 1; ctx.font = `600 ${size}px Osw`; const w = ctx.measureText(s).width + 30; ctx.fillStyle = o.bg || 'rgba(16,10,8,0.86)'; ctx.fillRect(x - (o.center ? w / 2 : 0), y - size * 0.72, w, size * 1.34); ctx.restore();
  txt(s, x + (o.center ? 0 : w / 2), y, size, { col: o.col || '#ffe08a', font: 'Osw', a: o.a ?? 1 }); return w; }
function ltBoard(x, y, s, t, t0, rows, o = {}) { const k = popK(t, t0, 0.3); if (k <= 0) return; push(x, y, s * k, o.rot ?? -0.02); const w = o.w || 520, h = 70 + rows.length * 66;
  ctx.save(); ctx.fillStyle = o.bg || 'rgba(16,14,12,0.9)'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.restore(); pencil([[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2], [-w / 2, -h / 2]], { w: 4, col: o.edge || LTC.amber, pass2: false, gap: false });
  rows.forEach(([s1, size, col], i) => txt(s1, 0, -h / 2 + 66 + i * 66, size || 48, { col: col || '#fff6e0', font: 'Osw' })); pop(); }
function ltFlag(x, y, w, h, t, o = {}) {                               // жёлто-зелёно-красный (с 1918/1988; только в эпохах, где он был)
  const wv = q => Math.sin(t * 4 + q * 0.04) * 6; for (let i = 0; i < 3; i++) { const c = [LTC.yel, LTC.grn, LTC.red][i]; const pts = []; for (let q = 0; q <= w; q += 20) pts.push([x + q, y + i * h / 3 + wv(q) * q / w]); for (let q = w; q >= 0; q -= 20) pts.push([x + q, y + (i + 1) * h / 3 + wv(q) * q / w]); poly(pts, { wash: c, washA: 1, w: 1.4, col: LTC.ink }); }
  pencil([[x, y - 10], [x, y + (o.pole || 400)]], { w: 6, col: '#4a3a2a', pass2: false }); }

// ---------- глобус и карты
function ltDetail(pr, R, t) {                                           // финал наезда: Литва, Нерис, Вильнюс, Тракай, Каунас
  GLOBE.fill(pr(LT_NOW), '#d8e0a0'); pencil(pr(LT_NOW.concat([LT_NOW[0]])), { w: 4, col: LTC.ink, a: 0.8, pass2: false, gap: false });
  pencil(pr([[23.9, 54.9], [24.4, 54.95], [25.0, 54.75], [25.28, 54.69], [25.6, 54.8], [26.1, 54.9]]), { w: 9, col: '#3a86b8', pass2: false, gap: false });
  const k = clamp((R - 8000) / 9000); if (k <= 0) return;
  [['ВИЛЬНЮС', LTG.vilnius, 50], ['КАУНАС', LTG.kaunas, 36], ['ТРАКАЙ', LTG.trakai, 32]].forEach(([n, ll, sz], i) => { const [x, y] = pr([ll])[0]; ell(x, y, i ? 14 : 24, i ? 14 : 24, { wash: LTC.red, washA: k, w: 3, col: LTC.ink, a: k }); ltLabel(x + 30, y + 6, n, sz, { a: k }); });
}
function ltExtra(pr, R, t) {                                            // глобус по смыслу: крошечная Литва, пунктир до Чёрного моря, «?»
  if (R > 2600) return; const a = clamp(t / 0.25) * (1 - clamp((R - 1400) / 1200)); if (a <= 0) return;
  GLOBE.fill(pr(LT_NOW), '#f2c02a', a); const [x0, y0] = pr([LTG.vilnius])[0], [x1, y1] = pr([LTG.odesa])[0];
  pencil([[x0, y0], [x1, y1]], { w: 5, col: '#fff6e0', a, pass2: false, gap: true }); txt('?', x1 + 40, y1, 90, { col: LTC.amberL, font: 'Osw', a });
}
const LT_GLOBE = { lon: LTG.vilnius[0], lat: LTG.vilnius[1], label: 'ЛИТВА', fromLon: -10, fromLat: 40, Rend: 26000, detail: ltDetail, extra: ltExtra };
function ltMapBase(t, o = {}) {                                         // плоская карта Восточной Европы (экранные координаты)
  const P = GLOBE.map(o.cx ?? 560, o.cy ?? 1000, o.k ?? 46, o.lon ?? 28, o.lat ?? 51.5, { land: '#e8dcb4', sea: '#2a5a8a', seaD: '#183a66' });
  GLOBE.fill(BALTIC_L.map(P), '#2a5a8a'); GLOBE.fill(BLACK.map(P), '#2a5a8a'); txt('БАЛТИЙСКОЕ МОРЕ', P([18.5, 56.6])[0], P([18.5, 56.6])[1], 34, { col: '#cfe8ff', font: 'Osw' }); txt('ЧЁРНОЕ МОРЕ', P([33.5, 43.6])[0], P([33.5, 43.6])[1], 38, { col: '#cfe8ff', font: 'Osw' });
  return P;
}
function ltZone(P, poly, col, a = 0.75, o = {}) { GLOBE.fill(poly.map(P), col, a); pencil(poly.concat([poly[0]]).map(P), { w: o.w || 5, col: o.edge || LTC.ink, a: 0.9, pass2: false, gap: o.dash ?? false }); }

// ---------- сквозная нить: янтарный кулон с картой эпохи
const BADGE = { hook: 'now', pagan: 'core', grunwald: 'core', empire: 'gdl', lublin: 'cut', partition: 'gone', books: 'gone', soviet: 'red', chain: 'now', today: 'now', button: 'now' };
function amberBadge(t, name) {
  const kind = BADGE[name]; if (!kind || t < S0[name] + 0.2) return; const k = popK(t, S0[name] + 0.2, 0.3);
  push(850, 740, 0.85 * k, Math.sin(t * 1.5) * 0.05); pencil([[0, -120], [0, -200]], { w: 3, col: '#5a4a3a', pass2: false }); ell(0, 0, 100, 120, { wash: LTC.amber, washA: 1, w: 3, col: LTC.amberD });
  const g = ctx.createRadialGradient(-30, -40, 10, 0, 0, 120); g.addColorStop(0, 'rgba(255,230,150,0.8)'); g.addColorStop(1, 'rgba(140,70,10,0)'); ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, 0, 100, 120, 0, 0, 6.283); ctx.fill(); ctx.restore();
  const P = ([lo, la]) => [(lo - 28.5) * 12.5, -(la - 51.3) * 20];
  const shape = { core: CORE_1250, gdl: GDL, cut: GDL_1569, gone: LT_NOW, red: LT_NOW, now: LT_NOW }[kind], col = { core: LTC.grn, gdl: LTC.grn, cut: LTC.grn, gone: '#6a6a6a', red: '#8a3a3a', now: LTC.grn }[kind];
  GLOBE.fill(shape.map(P), col, 0.9); pencil(shape.concat([shape[0]]).map(P), { w: 2, col: LTC.ink, pass2: false, gap: false });
  if (kind === 'cut') { GLOBE.fill(UA_CUT.map(P), '#c8282a', 0.5); } ell(-36, -60, 18, 10, { wash: '#fff6e0', washA: 0.6, line: false, rot: -0.5 });
  pop();
}

// ---------- архитектура и природа
function gedTower(x, base, s, t, o = {}) {                              // Гедиминова башня на холме: кирпич, бойницы, флагшток
  push(x, base, s); const L = LTC.ink;
  blob([[-380, 0], [-260, -120], [-120, -200], [120, -210], [260, -120], [380, 0]], { wash: o.hill || '#5a8a3a', washA: 1, w: 2.4, col: L, shade: { gap: 11, a: 0.2, col: '#2a4a1a', ang: 0.6 } });
  rect(-80, -470, 160, 270, { wash: o.brick || LTC.brick, washA: 1, w: 2.6, col: L, shade: { gap: 8, a: 0.2, col: '#5a1a0a', ang: 0 } });
  for (let i = 0; i < 5; i++) rect(-80 + i * 32, -500, 20, 30, { wash: o.brick || LTC.brick, washA: 1, w: 1.8, col: L });
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) rect(-50 + j * 70, -420 + i * 110, 30, 46, { wash: o.lit ? '#ffd890' : '#2a2a30', washA: 1, w: 1.6, col: L });
  if (o.flag) ltFlag(0, -700, 130, 80, t, { pole: 200 }); pop();
}
function oak(x, base, h, t, seed = 1, o = {}) {                         // дуб: толстый узловатый ствол, широкая крона
  const r = rng(7000 + seed), sw = Math.sin(t * 0.8 + seed) * 5, L = LTC.ink;
  poly([[x - h * 0.08, base], [x - h * 0.05, base - h * 0.5], [x - h * 0.12, base - h * 0.62], [x + h * 0.1, base - h * 0.6], [x + h * 0.05, base - h * 0.5], [x + h * 0.08, base]], { wash: o.trunk || '#5a4030', washA: 1, w: 2, col: L, shade: { gap: 7, a: 0.3, col: '#2a1a10', ang: 1.5 } });
  for (let i = 0; i < 9; i++) ell(x + (r() - 0.5) * h * 0.8 + sw, base - h * (0.62 + r() * 0.36), h * (0.14 + r() * 0.08), h * (0.1 + r() * 0.05), { wash: i % 2 ? (o.col || LTC.oak) : (o.colL || LTC.oakL), washA: 1, w: 1.4, col: '#1a2a10' });
}
function vilChurch(x, base, s, t, o = {}) {                             // барочный костёл Вильнюса: две башни, фронтон, кресты
  push(x, base, s); const L = LTC.ink, c = o.col || '#f2ece0';
  rect(-170, -360, 340, 360, { wash: c, washA: 1, w: 2.4, col: L, shade: { gap: 12, a: 0.08, col: '#8a8070', ang: 1.4 } }); poly([[-170, -360], [0, -470], [170, -360]], { wash: c, washA: 1, w: 2.2, col: L });
  for (const d of [-1, 1]) { rect(d * 170 - 60, -620, 120, 620, { wash: c, washA: 1, w: 2.2, col: L }); blob([[d * 170 - 60, -620], [d * 170, -720], [d * 170 + 60, -620]], { wash: o.roof || '#5a8a8a', washA: 1, w: 2, col: L }); pencil([[d * 170, -720], [d * 170, -780]], { w: 4, col: LTC.gold, pass2: false }); pencil([[d * 170 - 18, -760], [d * 170 + 18, -760]], { w: 4, col: LTC.gold, pass2: false });
    for (let i = 0; i < 3; i++) rect(d * 170 - 22, -560 + i * 130, 44, 70, { wash: '#4a5a6a', washA: 1, w: 1.4, col: L }); }
  rect(-50, -200, 100, 200, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); ell(0, -300, 40, 40, { wash: '#4a5a6a', washA: 1, w: 1.6, col: L }); pop();
}
function oldTown(x0, x1, base, t, seed, o = {}) {                        // ряд домиков старого города: черепица, окна, вывески
  const r = rng(seed); for (let x = x0; x < x1;) { const w = 120 + r() * 70, h = 160 + r() * 100, c = ['#e8c87a', '#d88a6a', '#e8e0c8', '#a8c0a0', '#e8a8a0'][Math.floor(r() * 5)];
    rect(x, base - h, w, h, { wash: o.dark ? lerpC(c, '#3a4050', 0.6) : c, washA: 1, w: 2, col: LTC.ink }); poly([[x - 6, base - h], [x + w / 2, base - h - 60], [x + w + 6, base - h]], { wash: o.dark ? '#4a3a3a' : '#a8482a', washA: 1, w: 2, col: LTC.ink, shade: { gap: 6, a: 0.25, col: '#4a1a0a', ang: 0.5 } });
    for (let i = 0; i < 2; i++) for (let j = 0; j < Math.floor(w / 50); j++) rect(x + 14 + j * 50, base - h + 30 + i * 70, 26, 36, { wash: o.lit && r() < 0.4 ? '#ffd890' : '#3a4a5a', washA: 1, w: 1, col: LTC.ink }); x += w + 6; }
}

// ---------- отмотка 034: янтарь — кадр застывает в смоле, мошки и пузырьки кружат, провал в золотую каплю
function wTunnelLT(t, u, cat) {
  const p = u / (S1.tunnel - S0.tunnel);
  lay(30, () => scr(() => { const g = ctx.createRadialGradient(540, 980, 40, 540, 980, 1200); g.addColorStop(0, '#fff0b0'); g.addColorStop(0.35, LTC.amber); g.addColorStop(1, LTC.amberD); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 26; i++) { const r = rng(7100 + i), a = r() * 6.283 + p * (4 + r() * 4), d = (1 - p * 0.7) * (200 + r() * 800); const x = 540 + Math.cos(a) * d, y = 980 + Math.sin(a) * d * 1.3;
      if (i % 3) ell(x, y, 6 + r() * 14, 6 + r() * 14, { wash: '#fff6d0', washA: 0.5, w: 1.4, col: '#a86a10', a: 0.6 }); else { push(x, y, 0.8 + r(), a); ell(0, 0, 12, 6, { wash: '#3a2a10', washA: 1, line: false }); ell(-4, -6, 10, 5, { wash: '#f6f0e0', washA: 0.6, line: false, rot: -0.5 }); ell(4, -6, 10, 5, { wash: '#f6f0e0', washA: 0.6, line: false, rot: 0.5 }); pop(); } }
    for (let k = 0; k < 4; k++) pencil(ellPts(540, 980, 300 + k * 220 - p * 200, (300 + k * 220 - p * 200) * 1.2, p * 3 + k, 0.04, 70), { w: 8, col: '#fff2b0', a: 0.35, pass2: false, gap: false });
  }));
  lay(1, () => cat());
  scr(() => { if (p > 0.82) { const k = (p - 0.82) / 0.18; ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#fff4d0'; ctx.fillRect(0, 0, W, H); ctx.restore(); } });
}
WORLD.tunnel = wTunnelLT;
DIR.tunnel = { outfit: 'hoodieLT', light: { side: 1, rim: '#ffd27a' }, grade: ['#3a2008', 0.1], act: () => [[S0.tunnel, 'grin'], [S0.tunnel + 0.7, 'awe']],
  pose: (t, u, b) => { const p = u / (S1.tunnel - S0.tunnel), r = 6.283 * sm(clamp(p / 0.7)), sc = 0.95 + 0.06 * sm(clamp(p / 0.7));
    return Object.assign(b, { x: 540 - Math.sin(r) * 260 * sc, y: 1000 + Math.cos(r) * 260 * sc, s: sc, rot: r, look: [0, -0.4], hand: [170, -340], tailUp: true }); },
  cam: () => [[S0.tunnel, 540, 960, 0], [S0.tunnel + 1.0, 540, 930, 0.1], [S1.tunnel, 540, 900, 0.18]] };

// лошадь (из 033, перекрашивается через o.col)
function horse(x, y, s, t, o = {}) {                                   // лошадь Пржевальского: буланое тело, стоячая тёмная грива, светлая морда, тёмные ноги
  push(x, y, s, 0, o.flip || 1); const L = LTC.ink, c = o.col || '#c89a5a', ph = t * (o.walk ? 6 : 0) + (o.seed || 0);
  for (const [lx, d] of [[-70, 0], [-46, 1], [60, 1], [84, 0]]) { const sw = Math.sin(ph + d * 3) * 10; pencil([[lx, -90], [lx + sw, -40], [lx + sw * 0.5, 0]], { w: 12, col: '#3a2a1e', pass2: false }); }
  blob([[-100, -110], [-80, -160], [40, -166], [110, -150], [116, -100], [80, -80], [-60, -78], [-100, -90]], { wash: c, washA: 1, w: 2.4, col: L });
  blob([[96, -150], [126, -210], [150, -232], [176, -214], [170, -190], [140, -160], [116, -120]], { wash: c, washA: 1, w: 2.2, col: L });
  ell(166, -206, 20, 16, { wash: '#efe0c0', washA: 1, w: 1.6, col: L }); ell(150, -226, 3, 3, { wash: L, washA: 1, line: false });
  for (let i = 0; i < 9; i++) pencil([[104 + i * 6, -156 - i * 9], [100 + i * 6, -174 - i * 9]], { w: 5, col: '#2a1e14', pass2: false });
  pencil([[-100, -120], [-124, -70 + Math.sin(t * 3 + (o.seed || 0)) * 10]], { w: 9, col: '#2a1e14', pass2: false }); pencil([[-60, -96], [80, -96]], { w: 3, col: '#5a3a1a', a: 0.6, pass2: false });
  pop();
}

// хата, сосна, берёза (из 033)
function khata(x, base, w, h, t, o = {}) {                               // полесская хата: сруб/побелка, наличники, крыша (солома/жесть), труба, плетень
  const L = LTC.ink, wall = o.wall || '#ece4d0'; push(x, base, o.s || 1);
  rect(-w / 2, -h, w, h, { wash: wall, washA: 1, w: 2.2, col: L, shade: o.log ? { gap: 14, a: 0.25, col: '#4a2e18', ang: 0 } : { gap: 10, a: 0.08, col: '#8a7a6a', ang: 1.3 } });
  const roof = o.roof || '#c8a058'; poly([[-w / 2 - 26, -h], [0, -h - h * 0.75], [w / 2 + 26, -h]], { wash: roof, washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.22, col: lerpC(roof, '#000000', 0.5), ang: o.roof ? 0.2 : 1.1 } });
  rect(w * 0.18, -h - h * 0.6, 26, h * 0.4, { wash: '#a8584a', washA: 1, w: 1.6, col: L }); if (o.smoke) for (let i = 0; i < 4; i++) { const k = (t * 0.25 + i / 4) % 1; ell(w * 0.18 + 13 + Math.sin(t + i) * 14, -h - h * 0.6 - k * 140, 14 + k * 36, 10 + k * 22, { wash: '#d8d4cc', washA: 0.4 * (1 - k), line: false }); }
  const nw = o.win ?? 2; for (let i = 0; i < nw; i++) { const wx = -w / 2 + (i + 0.5) * w / nw - 26; rect(wx, -h * 0.72, 52, 60, { wash: o.lit ? '#ffd890' : '#4a6a7a', washA: 1, w: 1.6, col: L });
    pencil([[wx + 26, -h * 0.72], [wx + 26, -h * 0.72 + 60]], { w: 2, col: L, pass2: false }); rect(wx - 8, -h * 0.72 - 16, 68, 14, { wash: o.trim || '#3a7ab0', washA: 1, w: 1.4, col: L }); rect(wx - 8, -h * 0.72 + 60, 68, 10, { wash: o.trim || '#3a7ab0', washA: 1, w: 1.4, col: L });
    for (const d of [-1, 1]) rect(wx + (d < 0 ? -22 : 52), -h * 0.72, 22, 60, { wash: o.trim || '#3a7ab0', washA: 1, w: 1.2, col: L }); }
  if (o.door) rect(w / 2 - 70, -h * 0.66, 46, h * 0.66, { wash: '#8a5a32', washA: 1, w: 1.6, col: L });
  pop();
}
function polPine(x, base, h, t, seed = 1, o = {}) {                     // сосна Полесья: прямой рыжий ствол, ярусы хвои
  const r = rng(4600 + seed), sw = Math.sin(t * 0.8 + seed) * 4, L = LTC.ink;
  poly([[x - h * 0.025, base], [x - h * 0.012, base - h], [x + h * 0.012, base - h], [x + h * 0.025, base]], { wash: o.trunk || '#b8643a', washA: 1, w: 1.6, col: L });
  for (let i = 0; i < 4; i++) { const y = base - h * (0.62 + i * 0.12), w = h * (0.22 - i * 0.04); blob([[x - w + sw, y], [x - w * 0.5 + sw, y - h * 0.1], [x + w * 0.3 + sw, y - h * 0.12], [x + w + sw, y - h * 0.02], [x + w * 0.2, y + h * 0.04]], { wash: i % 2 ? (o.col || '#2a4a2a') : (o.colD || '#16281a'), washA: 1, w: 1.6, col: L }); }
}
function birch(x, base, h, t, seed = 1, o = {}) {                       // берёза: белый ствол с чёрными чёрточками, светлая крона
  const r = rng(4700 + seed), sw = Math.sin(t * 1.1 + seed) * 6, L = LTC.ink;
  poly([[x - 10, base], [x - 4, base - h], [x + 4, base - h], [x + 10, base]], { wash: '#f2ece0', washA: 1, w: 1.6, col: L });
  for (let i = 0; i < 8; i++) { const yy = base - r() * h * 0.9; pencil([[x - 8, yy], [x + 2 + r() * 6, yy - 2]], { w: 3, col: '#2a2420', pass2: false }); }
  for (let i = 0; i < 6; i++) ell(x + (r() - 0.5) * h * 0.4 + sw, base - h * (0.7 + r() * 0.3), h * 0.12 + r() * h * 0.06, h * 0.09, { wash: i % 2 ? (o.col || '#a8c860') : (o.colD || '#6a9a3a'), washA: 0.95, w: 1.2, col: '#2a3a1a' });
}
