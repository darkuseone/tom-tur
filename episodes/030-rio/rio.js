/* 030 Рио-де-Жанейро — общие детали: палитра «зелень гор, бирюза океана, белый песок, терракота, жёлто-зелёный»,
   Сахарная Голова с канатной дорогой, Корковаду с Христом, волнистая мозаика Копакабаны, пальмы, колониальные дома с балконами,
   фавелы на склоне, каравелла/фрегат, мяч. Глобус по смыслу: старт над Бразилиа («СТОЛИЦА ✓»), рывок к Рио («РИО?»),
   наезд точно в залив Гуанабара (подробная карта: залив, Сахарная Голова, Христос, Копакабана, Маракана).
   Бейдж «СТАТУС РИО» по эпохам. Отмотка 030: Том бьёт «через себя» — полный оборот, мяч летит в камеру. */
const RJ = { ink: '#140e08', sea: '#1e8ab8', seaD: '#0c4a7a', seaL: '#8ad8f0', sand: '#f0dcae', sandD: '#c8a870', green: '#2a8a3a', greenD: '#14501e', greenL: '#7ac868',
  rock: '#9a8a7a', rockD: '#5a4a40', rockL: '#d8c8b0', terra: '#c8562a', terraD: '#7a2a10', white: '#f4f0e6', yellow: '#f8d030', blue: '#1e4aa8', wood: '#8a5a32', woodD: '#4a2e14', gold: '#e8b84a', goldL: '#ffe08a', red: '#c8281e' };
const RIO = { lon: -43.2, lat: -22.93, sugar: [-43.157, -22.949], christ: [-43.2105, -22.9519], copa: [-43.187, -22.971], mara: [-43.2302, -22.9121], bras: [-47.88, -15.79], salv: [-38.5, -12.97], lisbon: [-9.14, 38.72], luanda: [13.23, -8.84], ouro: [-43.5, -20.39] };
const BAY = [[-43.16, -22.95], [-43.19, -22.92], [-43.22, -22.88], [-43.24, -22.84], [-43.25, -22.78], [-43.2, -22.72], [-43.1, -22.66], [-43.0, -22.68], [-42.98, -22.73], [-43.05, -22.8], [-43.08, -22.86], [-43.1, -22.9], [-43.13, -22.94]];
const OCEAN = [[-43.7, -23.05], [-43.5, -23.03], [-43.36, -23.01], [-43.28, -23.0], [-43.22, -22.99], [-43.19, -22.985], [-43.17, -22.97], [-43.155, -22.955], [-43.12, -22.95], [-43.05, -22.97], [-42.9, -22.97], [-42.7, -22.98], [-42.7, -23.5], [-43.7, -23.5]];
const LAGOA = [[-43.22, -22.97], [-43.2, -22.965], [-43.195, -22.975], [-43.215, -22.98]];

function rioDetail(pr, R, t) {                                          // подробная карта Рио на финале наезда глобуса
  GLOBE.fill(pr([[-44.5, -22.0], [-42.0, -22.0], [-42.0, -23.6], [-44.5, -23.6]]), '#5a9a4a');
  GLOBE.fill(pr([[-43.3, -22.93], [-43.22, -22.9], [-43.18, -22.94], [-43.24, -22.98], [-43.32, -22.97]]), '#3a7a34', 0.9);   // массив Тижука
  GLOBE.fill(pr(OCEAN), '#1e7ab8'); GLOBE.fill(pr(BAY), '#2a8ac8'); GLOBE.fill(pr(LAGOA), '#3a9ad8');
  pencil(pr(OCEAN.slice(0, 13)), { w: 5, col: RJ.ink, a: 0.85, pass2: false, gap: false }); pencil(pr(BAY.concat([BAY[0]])), { w: 4, col: RJ.ink, a: 0.8, pass2: false, gap: false });
  const k = clamp((R - 20000) / 40000); if (k <= 0) return;
  const lab = (ll, name, dx, dy, ic) => { const [x, y] = pr([ll])[0]; if (ic) ic(x, y); else ell(x, y, 12, 12, { wash: RJ.red, washA: k, w: 2.4, col: RJ.ink, a: k });
    ctx.save(); ctx.globalAlpha = k; ctx.font = '600 32px Osw'; const w = ctx.measureText(name).width + 20; ctx.fillStyle = 'rgba(16,10,8,0.82)'; ctx.fillRect(x + dx - w / 2, y + dy - 24, w, 46); ctx.restore(); txt(name, x + dx, y + dy - 1, 32, { col: '#fff6e0', font: 'Osw', a: k }); };
  lab(RIO.sugar, 'САХАРНАЯ ГОЛОВА', 120, 70, (x, y) => blob([[x - 26, y + 8], [x - 18, y - 30], [x, y - 44], [x + 18, y - 30], [x + 26, y + 8]], { wash: RJ.rock, washA: k, w: 2, col: RJ.ink }));
  lab(RIO.christ, 'ХРИСТОС', -150, 20, (x, y) => { pencil([[x, y + 10], [x, y - 40]], { w: 7, col: '#f4f0e6', pass2: false }); pencil([[x - 24, y - 26], [x + 24, y - 26]], { w: 7, col: '#f4f0e6', pass2: false }); });
  lab(RIO.copa, 'КОПАКАБАНА', -40, 70); lab(RIO.mara, 'МАРАКАНА', -60, -60);
  txt('ЗАЛИВ ГУАНАБАРА', pr([[-43.13, -22.8]])[0][0], pr([[-43.13, -22.8]])[0][1], 34, { col: '#e8f6ff', font: 'Osw', a: k * 0.9 });
}
function rioExtra(pr, R, t) {                                          // глобус по смыслу: Бразилиа «СТОЛИЦА ✓» видна на развороте
  if (R > 2600) return; const [x, y] = pr([RIO.bras])[0], a = clamp(t / 0.25) * (1 - clamp((R - 1400) / 1200));
  if (a <= 0) return; ell(x, y, 13, 13, { wash: '#2ac86a', washA: a, w: 3, col: RJ.ink, a });
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(10,40,20,0.9)'; ctx.fillRect(x - 250, y - 30, 230, 60); ctx.restore(); txt('БРАЗИЛИА ✓', x - 135, y, 36, { col: '#9affb8', font: 'Osw', a });
}
const RIO_GLOBE = { lon: RIO.lon, lat: RIO.lat, label: 'РИО?', fromLon: -60, fromLat: 5, Rend: 80000, detail: rioDetail, extra: rioExtra };

// ---------- природа и город
function sugarloaf(x, base, s, t, o = {}) {                           // Сахарная Голова + Урка, канатная дорога с вагончиком
  push(x, base, s); const L = RJ.ink;
  blob([[-420, 0], [-380, -120], [-300, -180], [-220, -150], [-170, -60], [-120, 0]], { wash: lerpC(RJ.green, RJ.rock, 0.3), washA: 1, w: 2, col: L, shade: { gap: 7, a: 0.25, col: RJ.greenD, ang: 1.1 } });
  blob([[-140, 0], [-110, -260], [-60, -480], [0, -560], [60, -500], [110, -320], [150, -80], [170, 0]], { wash: o.col || RJ.rock, washA: 1, w: 2.6, col: L, shade: { gap: 6, a: 0.3, col: RJ.rockD, ang: 1.3 } });
  for (let k = 0; k < 6; k++) pencil([[-90 + k * 36, -60 - k * 8], [-60 + k * 30, -480 + Math.abs(k - 2) * 40]], { w: 2, col: RJ.rockD, a: 0.45, pass2: false });
  blob([[-130, -30], [-100, -200], [-70, -120], [-40, -40]], { wash: RJ.green, washA: 0.9, line: false }); blob([[60, -60], [110, -220], [150, -80]], { wash: RJ.green, washA: 0.8, line: false });
  if (o.cable !== false) { pencil([[-300, -180], [-40, -530]], { w: 2, col: '#2a2a30', pass2: false }); const u = ((t * 0.12) % 1), cx = lerp(-300, -40, u), cy = lerp(-180, -530, u) + 30; pencil([[cx, cy - 30], [cx, cy - 14]], { w: 2, col: '#2a2a30', pass2: false }); rect(cx - 24, cy - 14, 48, 30, { wash: '#e8e4dc', washA: 1, w: 1.6, col: L }); for (const q of [-12, 8]) rect(cx + q, cy - 8, 12, 12, { wash: '#7ac8f0', washA: 1, line: false }); }
  pop();
}
function corcovado(x, base, s, t, o = {}) {                           // гора Корковаду, лес, статуя на вершине
  push(x, base, s); const L = RJ.ink;
  blob([[-500, 0], [-360, -260], [-200, -520], [-60, -700], [20, -720], [120, -560], [300, -320], [500, 0]], { wash: o.col || RJ.greenD, washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.3, col: '#0a2a10', ang: 1.2 } });
  for (let i = 0; i < 26; i++) { const r = rng(6000 + i), xx = -400 + r() * 800, yy = -40 - r() * 460 * (1 - Math.abs(xx) / 600); ell(xx, yy, 22 + r() * 20, 16 + r() * 12, { wash: i % 3 ? RJ.green : RJ.greenL, washA: 0.8, line: false }); }
  rect(-20, -760, 40, 50, { wash: '#e8e4dc', washA: 1, w: 1.6, col: L });
  if (o.statue !== false) { push(0, -760, o.statueS || 1); rect(-10, -150, 20, 150, { wash: '#f0ece2', washA: 1, w: 2, col: L }); pencil([[-110, -130], [110, -130]], { w: 16, col: '#f0ece2', pass2: false }); pencil([[-110, -130], [110, -130]], { w: 2, col: L, a: 0.6, pass2: false }); ell(0, -170, 16, 18, { wash: '#f0ece2', washA: 1, w: 1.6, col: L }); shape([[-16, -140], [16, -140], [24, 0], [-24, 0]], { wash: '#e8e4da', washA: 1, w: 1.6, col: L }); pop(); }
  pop();
}
function palm(x, y, h, t, seed = 1) {                                 // пальма: изогнутый ствол с кольцами, веер листьев качается
  const sw = Math.sin(t * 1.3 + seed) * h * 0.02, T = [[x, y], [x + h * 0.05, y - h * 0.4], [x + h * 0.12, y - h * 0.75], [x + h * 0.16 + sw, y - h]];
  pencil(T, { w: h * 0.06, col: '#8a6a40', pass2: false }); for (let k = 1; k < 8; k++) { const u = k / 8, px = lerp(x, x + h * 0.16, u * u), py = y - h * u; pencil([[px - h * 0.03, py], [px + h * 0.03, py]], { w: 2, col: '#4a3418', a: 0.7, pass2: false }); }
  const [tx, ty] = T[3]; for (let k = 0; k < 9; k++) { const a = -Math.PI + k / 8 * Math.PI + Math.sin(t * 1.6 + seed + k) * 0.06, len = h * (0.36 + (k % 2) * 0.08), ex = tx + Math.cos(a) * len, ey = ty + Math.sin(a) * len * 0.6 + len * 0.25;
    pencil([[tx, ty], [(tx + ex) / 2, (ty + ey) / 2 - len * 0.12], [ex, ey]], { w: h * 0.035, col: k % 2 ? RJ.green : RJ.greenD, pass2: false }); for (let q = 1; q < 6; q++) { const u = q / 6, qx = lerp(tx, ex, u), qy = lerp(ty, ey, u) - Math.sin(u * 3.14) * len * 0.12; pencil([[qx, qy], [qx + Math.cos(a + 1.2) * len * 0.12, qy + Math.sin(a + 1.2) * len * 0.12]], { w: 2, col: RJ.greenL, a: 0.7, pass2: false }); } }
}
function waves(x0, x1, y, t, s = 1) {                                 // волнистая мозаика Копакабаны (чёрно-белая)
  rect(x0, y, x1 - x0, 140 * s, { wash: '#f4f0e6', washA: 1, w: 2, col: RJ.ink }); for (let r = 0; r < 3; r++) { const P = []; for (let x = x0; x <= x1; x += 16) P.push([x, y + 26 * s + r * 42 * s + Math.sin(x / 70 + r) * 14 * s]); pencil(P, { w: 14 * s, col: '#1a1a1e', pass2: false, gap: false }); }
}
function colonial(x, base, w, h, col, o = {}) {                       // колониальный дом: цвет, белые наличники, балконы, черепица, ставни
  const L = RJ.ink; rect(x, base - h, w, h, { wash: col, washA: 1, w: 2, col: L, shade: { gap: 8, a: 0.12, col: lerpC(col, '#000', 0.4), ang: 1.4 } });
  poly([[x - 12, base - h], [x + w / 2, base - h - 46], [x + w + 12, base - h]], { wash: RJ.terra, washA: 1, w: 2, col: L, shade: { gap: 4, a: 0.3, col: RJ.terraD, ang: 1.57 } });
  const n = Math.max(2, Math.floor(w / 60)), fl = Math.max(1, Math.floor(h / 90));
  for (let f = 0; f < fl; f++) for (let i = 0; i < n; i++) { const wx = x + 18 + i * (w - 36) / n, wy = base - h + 22 + f * 88, ww = (w - 36) / n - 16;
    rect(wx, wy, ww, 50, { wash: o.lit && (i + f) % 2 ? '#ffe0a0' : '#2a3a4a', washA: 1, w: 1.4, col: L }); pencil([[wx - 4, wy - 4], [wx + ww + 4, wy - 4]], { w: 4, col: '#f4f0e6', pass2: false });
    if (f > 0 || fl === 1) { pencil([[wx - 6, wy + 54], [wx + ww + 6, wy + 54]], { w: 3, col: '#2a2a30', pass2: false }); for (let q = 0; q < 4; q++) pencil([[wx + q * ww / 3, wy + 54], [wx + q * ww / 3, wy + 70]], { w: 1.6, col: '#2a2a30', pass2: false }); }
    if (o.shut) for (const sd of [-1, 1]) rect(sd < 0 ? wx - 10 : wx + ww, wy, 10, 50, { wash: o.shut, washA: 1, w: 1, col: L }); }
  rect(x + w / 2 - 20, base - 62, 40, 62, { wash: '#5a3a1e', washA: 1, w: 1.6, col: L });
}
function favela(x0, x1, base, slope, t, seed) {                       // фавела на склоне: цветные коробки, окна, баки, бельё
  const r = rng(seed); for (let i = 0; i < 40; i++) { const x = x0 + r() * (x1 - x0), y = base - (x - x0) * slope - r() * 60, w = 40 + r() * 40, h = 30 + r() * 40, c = ['#e86a4a', '#f0c040', '#5aa8d8', '#e8e0d0', '#8ac868', '#c84a7a', '#f4a060'][i % 7];
    rect(x, y - h, w, h, { wash: c, washA: 1, w: 1.2, col: RJ.ink }); rect(x + 6, y - h + 8, 10, 10, { wash: (i + Math.floor(t * 0.3)) % 5 ? '#2a2a3a' : '#ffe0a0', washA: 1, line: false }); if (i % 4 === 0) rect(x + w - 16, y - h - 12, 14, 12, { wash: '#2a5aa8', washA: 1, line: false }); }
}
function ball(x, y, s, rot = 0) { push(x, y, s, rot); ell(0, 0, 40, 40, { wash: '#f8f6f0', washA: 1, w: 2.4, col: RJ.ink }); for (let k = 0; k < 5; k++) { const a = k / 5 * 6.283; poly([[Math.cos(a) * 26 - 8, Math.sin(a) * 26 - 8], [Math.cos(a) * 26 + 8, Math.sin(a) * 26 - 8], [Math.cos(a) * 26 + 6, Math.sin(a) * 26 + 8], [Math.cos(a) * 26 - 6, Math.sin(a) * 26 + 8]], { wash: '#1a1a1e', washA: 1, line: false }); } ell(0, 0, 10, 10, { wash: '#1a1a1e', washA: 1, line: false }); pop(); }
function shipRJ(x, y, s, t, kind = 'caravel', seed = 1, o = {}) {      // каравелла (кресты на парусах — без символики, просто полосы), фрегат, корабль работорговцев (без людей в кадре)
  push(x, y + Math.sin(t * 1.4 + seed) * 4, s, Math.sin(t * 1.1 + seed) * 0.03); const L = RJ.ink;
  shape([[-260, -80], [240, -80], [300, -150], [210, 0], [-200, 0], [-300, -170]], { wash: '#6a3a1e', washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.3, col: '#2a1408', ang: 0 } });
  rect(-280, -190, 120, 110, { wash: '#7a4a2a', washA: 1, w: 2, col: L }); for (let k = 0; k < 6; k++) rect(-200 + k * 70, -60, 18, 14, { wash: '#14100a', washA: 1, line: false });
  const masts = kind === 'frigate' ? [-150, 0, 150] : [-100, 60];
  for (const mx of masts) { pencil([[mx, -80], [mx, -520]], { w: 8, col: '#3a2410', pass2: false }); for (let q = 0; q < (kind === 'frigate' ? 3 : 2); q++) { const w = 120 - q * 26, yy = -140 - q * 130, bw = Math.sin(t * 2 + q + mx) * 6;
    shape([[mx - w, yy - 110], [mx + w, yy - 110], [mx + w * 0.9 + bw, yy], [mx - w * 0.9 + bw, yy]], { wash: o.sail || '#f4ecd8', washA: 1, w: 1.8, col: L }); if (kind === 'caravel' && o.stripe) pencil([[mx, yy - 100], [mx, yy - 10]], { w: 10, col: o.stripe, pass2: false }); } }
  if (o.flag) { pencil([[masts[masts.length - 1], -520], [masts[masts.length - 1], -600]], { w: 4, col: '#3a2410', pass2: false }); shape([[masts[masts.length - 1], -600], [masts[masts.length - 1] + 70 + Math.sin(t * 6) * 8, -585], [masts[masts.length - 1], -560]], { wash: o.flag, washA: 1, w: 1.4, col: L }); }
  pop();
}

// ---------- бейдж «СТАТУС РИО» (повторный хук каждой эпохи)
const RSTAT = { rock: ['ГОРА', '#6a5a4a'], river: ['«РЕКА»', '#1e6aa8'], french: ['ГОРОД', '#7a3a1a'], gold: ['СТОЛИЦА КОЛОНИИ', '#a8781a'], king: ['СТОЛИЦА ИМПЕРИИ', '#8a1a1a'], valongo: ['ПОРТ', '#3a3a3a'],
  christ: ['СТОЛИЦА БРАЗИЛИИ', '#1e8a4a'], maracana: ['СТОЛИЦА БРАЗИЛИИ', '#1e8a4a'], today: ['НЕ СТОЛИЦА', '#c8281e'] };
let MAPON = -1;                                                         // карта-инфографика на экране → бейдж прячем
function rioBadge(t, name) {
  const O = RSTAT[name]; if (!O || t < S0[name] + 0.15 || MAPON === t) return; const t0 = name === 'today' ? EV.answer + 0.9 : S0[name] + 0.45, ap = clamp((t - S0[name] - 0.15) / 0.2);
  push(780, 1300, 1, -0.04); ctx.save(); ctx.globalAlpha = ap; rect(-130, -80, 260, 160, { wash: '#f0e6cc', washA: 1, w: 3, col: RJ.ink }); txt('СТАТУС РИО', 0, -56, 24, { col: RJ.ink, font: 'Osw' });
  push(-60, 40, 0.16); sugarloaf(0, 0, 1, t, { cable: false }); pop(); push(70, 40, 0.1); corcovado(0, 0, 1, t); pop(); ctx.restore();
  if (name === 'today' && t < t0) stamp_(0, 14, 0.4, 'СТОЛИЦА', '#1e8a4a', -0.16, popK(t, S0.today + 0.45, 0.3));
  else stamp_(0, 14, O[0].length > 10 ? 0.32 : 0.42, O[0], O[1], -0.16, popK(t, t0, 0.3)); pop();
}
function stamp_(x, y, s, text, col, rot, k = 1, o = {}) {              // печать: двойная рамка, буквы; k — «удар»
  if (k <= 0) return; const sc = s * (1 + (1 - Math.min(1, k)) * 1.4); ctx.save(); ctx.globalAlpha = Math.min(1, k * 1.6) * 0.94; push(x, y, sc, rot);
  ctx.font = `600 ${o.size || 64}px Osw`; const w = ctx.measureText(text).width + 50, h = (o.size || 64) * 1.45;
  pencil([[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2], [-w / 2, -h / 2]], { w: 7, col, pass2: false }); pencil([[-w / 2 + 12, -h / 2 + 12], [w / 2 - 12, -h / 2 + 12], [w / 2 - 12, h / 2 - 12], [-w / 2 + 12, h / 2 - 12], [-w / 2 + 12, -h / 2 + 12]], { w: 3, col, pass2: false });
  txt(text, 0, 2, o.size || 64, { col, font: 'Osw' }); pop(); ctx.restore();
}
function infoPlate(x, y, lines, t, t0, o = {}) {                            // инфо-плашка: тёмная подложка, 1–3 строки, выскок
  if (t < t0) return; const k = popK(t, t0, 0.3); push(x, y, k, o.rot ?? -0.03); ctx.save(); ctx.font = `600 ${lines[0][1]}px Osw`; const w = Math.max(...lines.map(([s, sz]) => { ctx.font = `600 ${sz}px Osw`; return ctx.measureText(s).width; })) + 50, h = lines.reduce((a, [, sz]) => a + sz * 1.25, 0) + 30;
  ctx.fillStyle = o.bg || 'rgba(14,10,8,0.88)'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.restore(); pencil([[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2], [-w / 2, -h / 2]], { w: 4, col: o.edge || RJ.goldL, pass2: false });
  let yy = -h / 2 + 15; lines.forEach(([s, sz, c]) => { yy += sz * 0.62; txt(s, 0, yy, sz, { col: c || '#fff6e0', font: 'Osw' }); yy += sz * 0.63; }); pop();
}

// ---------- отмотка: удар «через себя», мяч в камеру
function wTunnelRJ(t, u, cat) {
  const p = u / (S1.tunnel - S0.tunnel);
  lay(40, () => scr(() => { vgrad(0, 1920, ['#0a3a1a', '#1e8a3a', '#f8d030'], 1); const r = rng(hsh(FRAME, 6050)); for (let i = 0; i < 50; i++) { const a = r() * 6.283, d0 = 100 + r() * 300 + p * 300, d1 = d0 + 300 + r() * 600; pencil([[540 + Math.cos(a) * d0, 960 + Math.sin(a) * d0], [540 + Math.cos(a) * d1, 960 + Math.sin(a) * d1]], { w: 3 + r() * 6, col: i % 3 ? '#fff6d0' : '#1e4aa8', a: 0.5, pass2: false, gap: false }); }
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + u * 2; glow(540 + Math.cos(a) * 700, 960 + Math.sin(a) * 900, 80, 'rgba(255,250,220,1)', 0.25); } }));
  lay(1, () => { cat(); const kk = clamp((p - 0.55) / 0.45); if (p > 0.5) scr(() => ball(540 + kk * 40, 900 - kk * 120, 0.8 + Math.pow(kk, 3) * 14, u * 12)); else scr(() => ball(540, 1300 - p * 500, 0.8, u * 6)); });
}
WORLD.tunnel = wTunnelRJ;
DIR.tunnel = { outfit: 'hoodieRIO', light: { side: 1, rim: '#fff0a0' }, grade: ['#0a3a1a', 0.1], act: () => [[S0.tunnel, 'grin'], [S0.tunnel + 0.8, 'laugh']],
  pose: (t, u, b) => { const p = u / (S1.tunnel - S0.tunnel), r = -6.283 * sm(clamp(p / 0.72)), sc = 0.95 + 0.06 * sm(clamp(p / 0.72));
    return Object.assign(b, { x: 540 - Math.sin(r) * 260 * sc, y: 1000 + Math.cos(r) * 260 * sc, s: sc, rot: r, look: [0, -0.4], hand: [160, -380], handF: [-160, -380], tailUp: true, walk: t * 14 }); },
  cam: () => [[S0.tunnel, 540, 960, 0], [S0.tunnel + 1.0, 540, 930, 0.1], [S1.tunnel, 540, 900, 0.18]] };

// ---------- общие из 029 (море, чайка)
function seaKR(y0, y1, t, seed, o = {}) {                               // море: градиент, волны-штрихи, блики, пена
  const c = o.cols || ['#2a7ab8', '#1a4a80', '#0c2a4a']; vgrad(y0, y1, c, 1);
  const r = rng(seed); for (let i = 0; i < (o.n || 46); i++) { const yy = y0 + Math.pow(r(), 1.6) * (y1 - y0), x = r() * 1700 - 300 + Math.sin(t * 0.8 + i) * 14, w = 30 + (yy - y0) / (y1 - y0) * 120;
    pencil([[x - w, yy], [x - w * 0.3, yy - 5], [x + w * 0.3, yy - 5], [x + w, yy]], { w: 1.5 + (yy - y0) / (y1 - y0) * 3, col: i % 3 ? (o.wave || '#8ac8f0') : '#e8f4f8', a: 0.55, pass2: false, gap: false }); }
  if (o.glint) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.35; for (let i = 0; i < 18; i++) { ctx.fillStyle = o.glint; ctx.fillRect(o.gx - 90 + Math.sin(i * 7 + t * 2) * 110, y0 + 10 + i * (y1 - y0) / 22, 50 - i * 2, 4); } ctx.restore(); }
}
function gull(x, y, s, t, seed = 1) { const f = Math.sin(t * 9 + seed) * 18; pencil([[x - 40 * s, y - f * s], [x - 14 * s, y - 8 * s], [x, y], [x + 14 * s, y - 8 * s], [x + 40 * s, y - f * s]], { w: 4 * s, col: '#f4f0e8', pass2: false }); pencil([[x - 40 * s, y - f * s], [x - 14 * s, y - 8 * s], [x, y], [x + 14 * s, y - 8 * s], [x + 40 * s, y - f * s]], { w: 1.4, col: RJ.ink, a: 0.7, pass2: false }); }
