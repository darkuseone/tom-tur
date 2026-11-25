/* 036 Финляндия — общие детали: палитра «снег и белые фасады, финский синий, жёлтый ампир Энгеля, зелень куполов, берёза, северное
   сияние». Структура «одно место»: Сенатская площадь Хельсинки сквозь века. Сквозная нить — HUD-бейдж «окошко на площадь»: что стоит
   на месте памятника в эту эпоху (скалы и море → стройка → площадь → памятник → цветы → снег войны → сегодня).
   Глобус по смыслу: Финляндия между Швецией и Россией (стрелки «600 лет» и «108 лет»), наезд на Хельсинки. Карты: 1809 переход
   к России, 1940 отрезанная Карелия. Отмотка 036 — северное сияние: снежный вихрь под зелёными лентами. */
const FIC = { ink: '#14100c', snow: '#f2f4f8', snowD: '#b8c4d4', blue: '#1c3a7a', blueL: '#4a7ac8', yel: '#e8c870', yelD: '#a8884a', green: '#4a8a6a', greenL: '#7ac0a0', birch: '#f2ece0',
  pine: '#24402e', pineD: '#16281c', wood: '#8a5a32', woodD: '#4a2e18', granite: '#8a8070', graniteD: '#5a5248', bronze: '#4a5a4a', bronzeL: '#7a9a80', sea: '#3a6a8a', red: '#c0281e', aur: '#5aff9a', aur2: '#a86aff', night: '#0a1428' };
const FIG = { helsinki: [24.94, 60.17], turku: [22.27, 60.45], porvoo: [25.66, 60.39], stockholm: [18.07, 59.33], stpete: [30.31, 59.94], vyborg: [28.73, 60.71] };
const FI_POLY = [[21.0, 60.3], [22.5, 59.8], [24.0, 60.0], [25.5, 60.3], [27.0, 60.5], [28.5, 60.6], [30.0, 61.3], [31.5, 62.5], [30.5, 63.8], [30.0, 64.8], [29.5, 66.0], [29.0, 67.5], [28.5, 68.5], [29.0, 69.5], [28.0, 70.0], [26.0, 69.8], [25.0, 68.8], [23.5, 68.5], [21.0, 69.0], [20.5, 68.5], [23.5, 67.0], [24.0, 65.8], [25.3, 65.0], [24.5, 64.5], [22.5, 63.5], [21.3, 62.8], [21.5, 61.5]];
const KARELIA = [[27.8, 60.5], [28.5, 60.6], [30.0, 61.3], [31.5, 62.5], [30.8, 62.9], [29.6, 62.0], [28.6, 61.3], [27.9, 60.9]];
const SE_POLY = [[11.1, 59.0], [11.8, 58.0], [12.4, 56.5], [14.2, 55.4], [16.0, 56.3], [16.6, 57.6], [18.8, 59.6], [17.2, 60.6], [17.8, 62.8], [21.4, 64.5], [23.9, 65.8], [23.5, 67.0], [20.5, 68.5], [18.0, 68.4], [15.0, 66.0], [12.4, 64.0], [12.0, 61.5]];

function fiLabel(x, y, s, size, o = {}) { ctx.save(); ctx.globalAlpha = o.a ?? 1; ctx.font = `600 ${size}px Osw`; const w = ctx.measureText(s).width + 30; ctx.fillStyle = o.bg || 'rgba(10,16,30,0.86)'; ctx.fillRect(x, y - size * 0.72, w, size * 1.34); ctx.restore();
  txt(s, x + w / 2, y, size, { col: o.col || '#ffe08a', font: 'Osw', a: o.a ?? 1 }); return w; }
function fiBoard(x, y, s, t, t0, rows, o = {}) { const k = popK(t, t0, 0.3); if (k <= 0) return; push(x, y, s * k, o.rot ?? -0.02); const w = o.w || 520, h = 70 + rows.length * 66;
  ctx.save(); ctx.fillStyle = o.bg || 'rgba(10,16,30,0.9)'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.restore(); pencil([[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2], [-w / 2, -h / 2]], { w: 4, col: o.edge || FIC.blueL, pass2: false, gap: false });
  rows.forEach(([s1, size, col], i) => txt(s1, 0, -h / 2 + 66 + i * 66, size || 48, { col: col || '#f2f4f8', font: 'Osw' })); pop(); }

// ---------- глобус и карты
function fiDetail(pr, R, t) {                                           // финал наезда: Финляндия, Хельсинки, Финский залив
  GLOBE.fill(pr(FI_POLY), '#e8ecf0'); pencil(pr(FI_POLY.concat([FI_POLY[0]])), { w: 4, col: FIC.ink, a: 0.8, pass2: false, gap: false });
  const k = clamp((R - 8000) / 9000); if (k <= 0) return;
  [['ХЕЛЬСИНКИ', FIG.helsinki, 48], ['ТУРКУ', FIG.turku, 32], ['ПОРВОО', FIG.porvoo, 30]].forEach(([n, ll, sz], i) => { const [x, y] = pr([ll])[0]; ell(x, y, i ? 12 : 22, i ? 12 : 22, { wash: FIC.blue, washA: k, w: 3, col: FIC.ink, a: k }); fiLabel(x + 28, y - (i === 2 ? 40 : 0) + 6, n, sz, { a: k }); });
}
function fiExtra(pr, R, t) {                                            // глобус по смыслу: Финляндия между Швецией и Россией
  if (R > 2600) return; const a = clamp(t / 0.25) * (1 - clamp((R - 1400) / 1200)); if (a <= 0) return;
  GLOBE.fill(pr(FI_POLY), FIC.blueL, a); const [hx, hy] = pr([FIG.helsinki])[0], [sx, sy] = pr([FIG.stockholm])[0], [px, py] = pr([FIG.stpete])[0];
  pencil([[sx, sy], [hx, hy]], { w: 5, col: '#ffe08a', a, pass2: false, gap: true }); pencil([[px, py], [hx, hy]], { w: 5, col: '#ff8a6a', a, pass2: false, gap: true });
}
const FI_GLOBE = { lon: FIG.helsinki[0], lat: FIG.helsinki[1], label: 'ХЕЛЬСИНКИ', fromLon: -20, fromLat: 45, Rend: 28000, detail: fiDetail, extra: fiExtra };

// ---------- Сенатская площадь
function cathedral(x, base, s, t, o = {}) {                             // Кафедральный собор: белый, зелёные купола, колонны, широкая лестница
  push(x, base, s); const L = FIC.ink, c = o.col || '#f6f6f2', g = o.dome || FIC.green;
  for (let i = 0; i < 10; i++) rect(-420 + i * 12, -20 - i * 22, 840 - i * 24, 22, { wash: i % 2 ? '#e8e8e4' : '#dcdcd8', washA: 1, w: 1.2, col: L });
  rect(-260, -560, 520, 340, { wash: c, washA: 1, w: 2.6, col: L, shade: { gap: 14, a: 0.06, col: '#8a8a88', ang: 1.4 } }); poly([[-200, -560], [0, -640], [200, -560]], { wash: c, washA: 1, w: 2.2, col: L });
  for (let i = 0; i < 6; i++) rect(-180 + i * 72 - 12, -540, 24, 320, { wash: '#ffffff', washA: 1, w: 1.4, col: L, shade: { gap: 5, a: 0.1, col: '#8a8a88', ang: 0 } });
  rect(-120, -800, 240, 160, { wash: c, washA: 1, w: 2.4, col: L }); blob([[-140, -800], [-120, -900], [0, -960], [120, -900], [140, -800]], { wash: g, washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.2, col: '#2a4a3a', ang: 0.9 } }); pencil([[0, -960], [0, -1020]], { w: 5, col: '#d8b040', pass2: false }); pencil([[-16, -996], [16, -996]], { w: 4, col: '#d8b040', pass2: false });
  for (const d of [-1, 1]) { rect(d * 300 - 40, -640, 80, 100, { wash: c, washA: 1, w: 2, col: L }); blob([[d * 300 - 50, -640], [d * 300, -720], [d * 300 + 50, -640]], { wash: g, washA: 1, w: 2, col: L }); }
  for (let i = 0; i < 5; i++) ell(-200 + i * 100, -580, 14, 30, { wash: '#f0f0ec', washA: 1, w: 1.2, col: L });
  pop();
}
function engel(x, base, w, h, t, o = {}) {                              // жёлтое ампирное здание Энгеля: колоннада, окна, карниз
  const L = FIC.ink, c = o.col || FIC.yel; rect(x - w / 2, base - h, w, h, { wash: c, washA: 1, w: 2.4, col: L, shade: { gap: 12, a: 0.08, col: FIC.yelD, ang: 1.4 } }); rect(x - w / 2 - 10, base - h - 16, w + 20, 16, { wash: '#f2ece0', washA: 1, w: 1.6, col: L });
  const n = Math.floor(w / 56); for (let i = 0; i < n; i++) for (let j = 0; j < 3; j++) rect(x - w / 2 + 20 + i * 56, base - h + 30 + j * (h / 3.2), 26, h / 5, { wash: o.lit && (i + j) % 3 === 0 ? '#ffd890' : '#4a5a6a', washA: 1, w: 1, col: L });
  if (o.cols) { poly([[x - w * 0.2, base - h], [x, base - h - 60], [x + w * 0.2, base - h]], { wash: c, washA: 1, w: 2, col: L }); for (let i = 0; i < 6; i++) rect(x - w * 0.18 + i * w * 0.07, base - h + 10, 12, h * 0.6, { wash: '#f6f2e8', washA: 1, w: 1.2, col: L }); }
}
function statueA2(x, base, s, t, o = {}) {                              // памятник Александру II: гранитный постамент, бронзовый император, 4 группы
  push(x, base, s); const L = FIC.ink, br = o.snow ? '#6a7a70' : FIC.bronze;
  rect(-200, -60, 400, 60, { wash: FIC.granite, washA: 1, w: 2.2, col: L, shade: { gap: 8, a: 0.2, col: FIC.graniteD, ang: 1.3 } }); rect(-130, -330, 260, 270, { wash: FIC.granite, washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.2, col: FIC.graniteD, ang: 1.3 } });
  for (const [gx, gy] of [[-170, -60], [170, -60]]) { blob([[gx - 50, gy], [gx - 40, gy - 150], [gx, gy - 190], [gx + 40, gy - 150], [gx + 50, gy]], { wash: br, washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.25, col: '#1a2a1a', ang: 0.8 } }); ell(gx, gy - 200, 18, 20, { wash: br, washA: 1, w: 1.6, col: L }); }
  push(0, -330, 1); rect(-34, -300, 68, 300, { wash: br, washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.25, col: '#1a2a1a', ang: 0.8 } }); poly([[-60, -40], [-34, -260], [34, -260], [60, -40], [0, 0]], { wash: lerpC(br, '#000000', 0.15), washA: 1, w: 2, col: L }); ell(0, -320, 26, 30, { wash: br, washA: 1, w: 2, col: L });
  pencil([[30, -240], [70, -180]], { w: 10, col: br, pass2: false }); pencil([[-30, -240], [-40, -150]], { w: 10, col: br, pass2: false }); if (o.snow) { ell(0, -348, 30, 10, { wash: '#ffffff', washA: 1, line: false }); ell(0, -260, 40, 8, { wash: '#ffffff', washA: 1, line: false }); } pop();
  if (o.flowers) { const r = rng(11000); for (let i = 0; i < (o.flowers > 1 ? 90 : 40); i++) ell(-200 + r() * 400, -10 - r() * 120 * (o.flowers > 1 ? 1.6 : 1), 14, 14, { wash: ['#e8283a', '#f8f0f0', '#f8d030', '#e86aa0', '#8a4ad8'][i % 5], washA: 1, w: 1, col: L }); }
  pop();
}
function finFlag(x, y, w, h, t, o = {}) { const pts = []; for (let q = 0; q <= w; q += 20) pts.push([x + q, y + Math.sin(t * 4 + q * 0.04) * 6 * q / w]); for (let q = w; q >= 0; q -= 20) pts.push([x + q, y + h + Math.sin(t * 4 + q * 0.04) * 6 * q / w]);
  poly(pts, { wash: '#ffffff', washA: 1, w: 1.6, col: FIC.ink }); rect(x + w * 0.3, y, w * 0.14, h, { wash: FIC.blue, washA: 1, line: false }); rect(x, y + h * 0.4, w, h * 0.2, { wash: FIC.blue, washA: 1, line: false }); pencil([[x, y - 10], [x, y + (o.pole || 400)]], { w: 6, col: '#4a3a2a', pass2: false }); }
function birchF(x, base, h, t, seed = 1) { const r = rng(11100 + seed), sw = Math.sin(t * 1.1 + seed) * 6; poly([[x - 10, base], [x - 4, base - h], [x + 4, base - h], [x + 10, base]], { wash: FIC.birch, washA: 1, w: 1.6, col: FIC.ink });
  for (let i = 0; i < 8; i++) { const yy = base - r() * h * 0.9; pencil([[x - 8, yy], [x + 2 + r() * 6, yy - 2]], { w: 3, col: '#2a2420', pass2: false }); } for (let i = 0; i < 6; i++) ell(x + (r() - 0.5) * h * 0.4 + sw, base - h * (0.7 + r() * 0.3), h * 0.12, h * 0.09, { wash: i % 2 ? '#a8c860' : '#6a9a3a', washA: 0.95, w: 1.2, col: '#2a3a1a' }); }
function pineF(x, base, h, t, o = {}) { poly([[x - h * 0.02, base], [x, base - h], [x + h * 0.02, base]], { wash: '#5a3a24', washA: 1, w: 1.2, col: FIC.ink }); for (let i = 0; i < 4; i++) { const y = base - h * (0.35 + i * 0.16), w = h * (0.24 - i * 0.045); poly([[x - w, y], [x, y - h * 0.24], [x + w, y]], { wash: i % 2 ? (o.col || FIC.pine) : (o.colD || FIC.pineD), washA: 1, w: 1.2, col: FIC.ink }); if (o.snow) ell(x, y - h * 0.18, w * 0.6, 8, { wash: '#ffffff', washA: 0.95, line: false }); } }

// ---------- сквозная нить: окошко «что на месте памятника»
const SPOT = { sweden: 'rocks', porvoo: 'rocks', capital: 'build', reforms: 'square', statue: 'statue', flowers: 'flowers', indep: 'statue', winter: 'snow', today: 'statue' };
function spotBadge(t, name) {
  const k0 = SPOT[name]; if (!k0 || t < S0[name] + 0.2) return; const k = popK(t, S0[name] + 0.2, 0.3);
  push(850, 740, 0.8 * k, 0.03); ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 110, 0, 6.283); ctx.clip(); ctx.fillStyle = k0 === 'snow' ? '#8a96aa' : '#a8c8e8'; ctx.fillRect(-120, -120, 240, 240);
  if (k0 === 'rocks') { ctx.fillStyle = FIC.sea; ctx.fillRect(-120, 30, 240, 90); blob([[-120, 40], [-60, -10], [20, 0], [80, -20], [120, 40]], { wash: '#7a7a70', washA: 1, w: 1.6, col: FIC.ink }); pineF(-50, 10, 80, t); pineF(40, 0, 70, t); }
  else { cathedral(0, 40, 0.13, t); ctx.fillStyle = '#c8c0b0'; ctx.fillRect(-120, 40, 240, 80);
    if (k0 === 'build') { for (let i = 0; i < 3; i++) pencil([[-60 + i * 50, 40], [-60 + i * 50, -40]], { w: 3, col: '#8a5a32', pass2: false }); }
    if (k0 === 'statue' || k0 === 'flowers' || k0 === 'snow') statueA2(0, 110, 0.22, t, { flowers: k0 === 'flowers' ? 2 : 0, snow: k0 === 'snow' });
    if (k0 === 'snow') { ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fillRect(-120, 60, 240, 60); } }
  ctx.restore(); pencil(ellPts(0, 0, 110, 110, 0, 0, 60), { w: 6, col: '#f2f4f8', pass2: false, gap: false }); txt('СЕНАТСКАЯ ПЛ.', 0, 140, 22, { col: '#f2f4f8', font: 'Osw' }); pop();
}

// ---------- отмотка 036: северное сияние — снежный вихрь под зелёными лентами
function wTunnelFI(t, u, cat) {
  const p = u / (S1.tunnel - S0.tunnel);
  lay(30, () => scr(() => { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#04081a'); g.addColorStop(1, '#0e2040'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let k = 0; k < 5; k++) { const pts = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * 6.283 * 1.2 + p * 6 + k * 1.3, d = 200 + k * 150 + Math.sin(i * 0.5 + t * 3) * 40; pts.push([540 + Math.cos(a) * d, 980 + Math.sin(a) * d * 1.3]); }
      pencil(pts, { w: 40 - k * 5, col: k % 2 ? FIC.aur : FIC.aur2, a: 0.35, pass2: false, gap: false }); }
    const r = rng(hsh(FRAME, 11200)); for (let i = 0; i < 60; i++) { const a = r() * 6.283 + p * 4, d = (1 - p * 0.6) * (100 + r() * 900); ell(540 + Math.cos(a) * d, 980 + Math.sin(a) * d * 1.3, 4 + r() * 6, 4 + r() * 6, { wash: '#ffffff', washA: 0.8, line: false }); }
  }));
  lay(1, () => cat());
  scr(() => { if (p > 0.82) { const k = (p - 0.82) / 0.18; ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#f2fff8'; ctx.fillRect(0, 0, W, H); ctx.restore(); } });
}
WORLD.tunnel = wTunnelFI;
DIR.tunnel = { outfit: 'hoodieFI', light: { side: 1, rim: '#9affc8' }, grade: ['#08203a', 0.1], act: () => [[S0.tunnel, 'grin'], [S0.tunnel + 0.7, 'awe']],
  pose: (t, u, b) => { const p = u / (S1.tunnel - S0.tunnel), r = 6.283 * sm(clamp(p / 0.7)), sc = 0.95 + 0.06 * sm(clamp(p / 0.7));
    return Object.assign(b, { x: 540 - Math.sin(r) * 260 * sc, y: 1000 + Math.cos(r) * 260 * sc, s: sc, rot: r, look: [0, -0.4], hand: [170, -340], tailUp: true }); },
  cam: () => [[S0.tunnel, 540, 960, 0], [S0.tunnel + 1.0, 540, 930, 0.1], [S1.tunnel, 540, 900, 0.18]] };

// лошадь (из 033)
function horse(x, y, s, t, o = {}) {                                   // лошадь Пржевальского: буланое тело, стоячая тёмная грива, светлая морда, тёмные ноги
  push(x, y, s, 0, o.flip || 1); const L = FIC.ink, c = o.col || '#c89a5a', ph = t * (o.walk ? 6 : 0) + (o.seed || 0);
  for (const [lx, d] of [[-70, 0], [-46, 1], [60, 1], [84, 0]]) { const sw = Math.sin(ph + d * 3) * 10; pencil([[lx, -90], [lx + sw, -40], [lx + sw * 0.5, 0]], { w: 12, col: '#3a2a1e', pass2: false }); }
  blob([[-100, -110], [-80, -160], [40, -166], [110, -150], [116, -100], [80, -80], [-60, -78], [-100, -90]], { wash: c, washA: 1, w: 2.4, col: L });
  blob([[96, -150], [126, -210], [150, -232], [176, -214], [170, -190], [140, -160], [116, -120]], { wash: c, washA: 1, w: 2.2, col: L });
  ell(166, -206, 20, 16, { wash: '#efe0c0', washA: 1, w: 1.6, col: L }); ell(150, -226, 3, 3, { wash: L, washA: 1, line: false });
  for (let i = 0; i < 9; i++) pencil([[104 + i * 6, -156 - i * 9], [100 + i * 6, -174 - i * 9]], { w: 5, col: '#2a1e14', pass2: false });
  pencil([[-100, -120], [-124, -70 + Math.sin(t * 3 + (o.seed || 0)) * 10]], { w: 9, col: '#2a1e14', pass2: false }); pencil([[-60, -96], [80, -96]], { w: 3, col: '#5a3a1a', a: 0.6, pass2: false });
  pop();
}
function birchTrunk(x, t, seed = 1) {                                 // передний план: ствол берёзы до верха кадра, чёрные чёрточки, пара веток
  const r = rng(11150 + seed); poly([[x - 36, 2400], [x - 26, 0], [x + 26, 0], [x + 36, 2400]], { wash: FIC.birch, washA: 1, w: 2, col: FIC.ink });
  for (let i = 0; i < 18; i++) { const yy = 100 + r() * 2200; pencil([[x - 30, yy], [x + 4 + r() * 20, yy - 4]], { w: 5, col: '#2a2420', pass2: false }); }
  for (let i = 0; i < 3; i++) { const yy = 300 + i * 220, d = x < 540 ? 1 : -1; pencil([[x, yy], [x + d * 160, yy - 60]], { w: 4, col: '#4a3a2a', pass2: false }); for (let q = 0; q < 4; q++) ell(x + d * (80 + q * 30), yy - 40 - q * 6 + Math.sin(t * 2 + q) * 4, 16, 10, { wash: q % 2 ? '#a8c860' : '#6a9a3a', washA: 1, w: 1, col: '#2a3a1a' }); }
}
