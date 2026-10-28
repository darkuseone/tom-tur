/* 019 Железногорск — общие детали города (берут все сцены): Атамановский кряж, сибирская тайга, Енисей, портал тоннеля,
   вышки, колючка, прожектора, паровоз 1950-х, бараки, снег. Плюс шапки и инструменты людей для human() (патч в props.js не нужен — свои фигуры). */

function spruce(x, y, h, t, seed = 1, o = {}) {                     // сибирская ель/пихта: узкий конус ярусами, снег на лапах
  const r = rng(19000 + seed), sw = Math.sin(t * 0.7 + seed) * h * 0.008, w = h * (o.w || 0.3), col = o.col || '#1f3a2c', colD = o.colD || '#0c1c14', colL = o.colL || '#4a6e4e';
  pencil([[x, y], [x + sw, y - h]], { w: Math.max(1.5, h * 0.025), col: '#3a2416', pass2: false, gap: false });
  const n = o.tiers || 7;
  for (let k = 0; k < n; k++) { const f = k / n, yy = y - h * 0.1 - f * h * 0.86, ww = w * (1 - f * 0.85) * (0.85 + r() * 0.3), dy = h * 0.16;
    const P = [[x - ww + sw * f, yy], [x - ww * 0.55 + sw * f, yy - dy * 0.45], [x + sw * (f + 0.1), yy - dy * 1.15], [x + ww * 0.55 + sw * f, yy - dy * 0.45], [x + ww + sw * f, yy], [x + ww * 0.4, yy - dy * 0.12], [x, yy + dy * 0.06], [x - ww * 0.4, yy - dy * 0.12]];
    const s = shape(P.concat([P[0]]), { wash: k % 2 ? col : lerpC(col, colD, 0.25), washA: o.a || 1, w: o.far ? 0 : 1.4, col: colD, a: 0.6, line: !o.far });
    if (!o.far && h > 160) hatch(s.path, s.bb, { gap: 4, a: 0.22, col: colD, ang: 1.1, w: 1 });
    if (o.snow) pencil([[x - ww * 0.8 + sw * f, yy - 2], [x - ww * 0.3, yy - dy * 0.3], [x + ww * 0.3, yy - dy * 0.3], [x + ww * 0.8 + sw * f, yy - 2]], { w: Math.max(2, h * 0.02), col: o.snowCol || '#eef4f8', a: 0.9 * o.snow, pass2: false, gap: false });
    else if (!o.far) pencil([[x - ww * 0.7, yy - 3], [x - ww * 0.2, yy - dy * 0.4]], { w: 1.6, col: colL, a: 0.5, pass2: false }); }
}
function taigaRidge(y, h, col, seed, a = 1, step = 26) {             // дальняя тайга: зубчатый силуэт елей
  const r = rng(19500 + seed), pts = [[-1400, 2600]];
  for (let x = -1400; x <= W + 1400; x += step) { const base = y - Math.sin(x * 0.0021 + seed) * h * 0.5 - Math.sin(x * 0.007 + seed * 3) * h * 0.18; const th = h * (0.4 + r() * 0.6);
    pts.push([x, base], [x + step * 0.5, base - th], [x + step, base]); }
  pts.push([W + 1400, 2600]); sil(pts, col, a);
}
function mountain(t, o = {}) {                                         // Атамановский кряж: тяжёлая гора в тайге, скальные выходы, снег
  const cx = o.x ?? 640, top = o.top ?? 520, base = o.base ?? 1280, wd = o.w ?? 1500, col = o.col || '#3a4a44', colD = o.colD || '#1a2420', colL = o.colL || '#7a8a7c';
  const P = []; for (let k = 0; k <= 40; k++) { const f = k / 40, x = cx - wd / 2 + f * wd, bump = Math.sin(f * Math.PI) ** 0.7, nz = Math.sin(f * 23 + 1) * 14 + Math.sin(f * 61) * 6; P.push([x, base - (base - top) * bump - nz]); }
  P.push([cx + wd / 2 + 600, base + 200], [cx - wd / 2 - 600, base + 200]);
  const m = shape(P.concat([P[0]]), { wash: col, washA: 1, w: 2.2, col: colD, a: 0.7 }); shadeG(m.path, cx - wd * 0.4, 0, cx + wd * 0.3, 0, colD, 0.55);
  hatch(m.path, m.bb, { gap: 7, a: 0.18, col: colD, ang: 0.9, w: 1.1 }); hatch(m.path, m.bb, { gap: 11, a: 0.1, col: colL, ang: -0.6, w: 1 });
  const r = rng(19700 + (o.seed || 1));                                // скальные выходы (гнейс)
  for (let k = 0; k < 9; k++) { const f = 0.15 + r() * 0.7, x = cx - wd / 2 + f * wd, yy = base - (base - top) * Math.sin(f * Math.PI) ** 0.7 + 40 + r() * 160, s = 30 + r() * 60;
    poly([[x - s, yy], [x - s * 0.5, yy - s * 0.6], [x + s * 0.3, yy - s * 0.7], [x + s, yy - s * 0.1], [x + s * 0.6, yy + s * 0.3]], { wash: lerpC(colL, '#a8a090', 0.4), washA: 0.85, w: 1.4, col: colD, a: 0.5 }); }
  for (let k = 0; k < (o.trees ?? 70); k++) { const f = r(), x = cx - wd / 2 + f * wd, ytop = base - (base - top) * Math.sin(f * Math.PI) ** 0.7, yy = ytop + 30 + r() * (base - ytop - 30);
    spruce(x, yy, 26 + r() * 40, t, k + 300, { far: 1, col: lerpC(o.tree || '#1c3326', colD, r() * 0.4), snow: o.snow, snowCol: o.snowCol }); }
  if (o.snow) { const cap = P.slice(8, 33).map(([x, y]) => [x, y + 4]); pencil(cap, { w: 10, col: o.snowCol || '#e8f0f6', a: 0.55 * o.snow, pass2: false, gap: false }); }
  return m;
}
function yenisei(y0, y1, t, o = {}) {                                // Енисей: широкая холодная вода, блики, рябь
  const top = o.top || '#2a4a62', bot = o.bot || '#0e1e2a';
  ctx.save(); const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(-1500, y0, W + 3000, y1 - y0); ctx.restore();
  const r = rng(19800); for (let k = 0; k < 60; k++) { const yy = y0 + Math.pow(r(), 1.6) * (y1 - y0), x = -200 + r() * 1500 + Math.sin(t * 0.6 + k) * 30, w = 30 + (yy - y0) * 0.25 * r();
    pencil([[x, yy], [x + w, yy + 1]], { w: 1.5 + (yy - y0) / (y1 - y0) * 2, col: o.glint || '#9fc8e0', a: 0.35 + 0.3 * Math.sin(t * 2 + k), pass2: false, gap: false }); }
}
function portal(x, y, s, t, o = {}) {                                  // бетонный портал тоннеля в гору: арка, козырёк, лампы, рельсы внутрь, ворота
  push(x, y, s);
  const arch = []; for (let k = 0; k <= 20; k++) { const a = Math.PI + k / 20 * Math.PI; arch.push([Math.cos(a) * 150, -230 + Math.sin(a) * 120]); }
  const face = shape([[-300, 0], [-300, -420], [-240, -470], [240, -470], [300, -420], [300, 0], [-300, 0]], { wash: o.conc || '#8a8a80', washA: 1, w: 2.6, col: '#1a1a16' });
  hatch(face.path, face.bb, { gap: 6, a: 0.2, col: '#3a3a34', ang: 0.2, w: 1 }); shadeG(face.path, -300, 0, 300, 0, '#2a2a26', 0.4);
  for (let k = 0; k < 6; k++) pencil([[-300, -70 * k], [300, -70 * k]], { w: 1.2, col: '#3a3a34', a: 0.4, pass2: false });   // швы опалубки
  const hole = [[-150, 0]].concat(arch, [[150, 0]]); shape(hole.concat([[-150, 0]]), { wash: '#06080a', washA: 1, w: 3, col: '#101010' });
  glow(0, -200, 160, o.inner || 'rgba(255,200,120,1)', o.lit ?? 0.35);
  for (let k = 1; k < 7; k++) { const z = k / 7, w2 = 150 * (1 - z * 0.8); pencil(ellPts(0, -230 * (1 - z * 0.7) + 0, w2, w2 * 0.8, 0, 0, 20).slice(10, 21), { w: 1.4, col: '#2a2a28', a: 0.5 * (1 - z), pass2: false }); }
  for (const sd of [-1, 1]) { pencil([[sd * 70, 0], [sd * 16, -150]], { w: 4, col: '#7a7a74', a: 0.9, pass2: false }); }   // рельсы уходят внутрь
  for (let k = 0; k < 7; k++) { const z = k / 7; pencil([[-70 + 54 * z, -z * 150], [70 - 54 * z, -z * 150]], { w: 5 - z * 3, col: '#4a3a2a', a: 0.8, pass2: false }); }
  rect(-320, -490, 640, 34, { wash: '#6a6a62', washA: 1, w: 2.2, col: '#1a1a16' });             // козырёк
  for (const sd of [-1, 1]) { rect(sd * 230 - 14, -440, 28, 18, { wash: '#2a2a28', washA: 1, w: 1.4 }); glow(sd * 230, -424, 70, o.lamp || 'rgba(255,220,150,1)', 0.8 * (o.lamps ?? 1)); ell(sd * 230, -424, 8, 6, { wash: '#fff2c8', washA: 1, line: false }); }
  if (o.star) { push(0, -530, 1); poly([[0, -36], [9, -11], [35, -11], [14, 5], [22, 31], [0, 16], [-22, 31], [-14, 5], [-35, -11], [-9, -11]], { wash: '#b8322a', washA: 1, w: 2, col: '#3a0a06' }); pop(); }
  if (o.gate !== undefined) { const g = o.gate; for (const sd of [-1, 1]) { push(sd * 150, 0, 1); const gw = 150 * (1 - g); const gp = rect(sd > 0 ? -gw : 0, -260, gw, 260, { wash: '#4a5a4a', washA: 1, w: 2, col: '#101410' }); if (gw > 10) hatch(gp.path, gp.bb, { gap: 18, a: 0.5, col: '#202820', ang: 1.57, w: 2 }); pop(); } }
  pop();
}
function watchtower(x, y, s, t, o = {}) {                            // лагерная вышка: столбы, лестница, будка с навесом, прожектор
  push(x, y, s); const L = '#1a120a', wd = o.wood || '#5a4630';
  for (const sd of [-1, 1]) pencil([[sd * 60, 0], [sd * 34, -380]], { w: 9, col: wd, pass2: false });
  for (let k = 1; k < 5; k++) { const yy = -k * 76; pencil([[-60 + k * 6, yy + 38], [60 - k * 6, yy]], { w: 4, col: wd, a: 0.9, pass2: false }); pencil([[60 - k * 6, yy + 38], [-60 + k * 6, yy]], { w: 4, col: wd, a: 0.9, pass2: false }); }
  for (let k = 0; k < 9; k++) pencil([[18, -k * 40], [30, -k * 40]], { w: 3, col: wd, pass2: false });
  const cab = rect(-70, -480, 140, 100, { wash: lerpC(wd, '#000000', 0.15), washA: 1, w: 2.4, col: L }); hatch(cab.path, cab.bb, { gap: 8, a: 0.3, col: L, ang: 1.57, w: 1.2 });
  rect(-50, -462, 100, 40, { wash: o.win || '#2a2418', washA: 1, w: 1.6, col: L });
  poly([[-100, -480], [0, -550], [100, -480]], { wash: o.roof || '#3a3026', washA: 1, w: 2.4, col: L });
  if (o.snow) pencil([[-96, -484], [0, -550], [96, -484]], { w: 9, col: '#eef4f8', a: 0.9, pass2: false });
  if (o.guard) { blob([[-18, -420], [-20, -460], [0, -478], [20, -460], [18, -420]], { wash: '#2a2e26', washA: 1, w: 1.6, col: L }); ell(0, -486, 13, 14, { wash: '#c89a78', washA: 1, w: 1.4, col: L }); blob([[-16, -490], [0, -506], [16, -490]], { wash: '#3a3a2e', washA: 1, w: 1.4, col: L }); }
  push(60, -490, 1, o.beam ?? -0.4); rect(-4, -18, 40, 36, { wash: '#30343a', washA: 1, w: 1.8, col: L }); ell(36, 0, 6, 18, { wash: '#fff6d8', washA: 1, w: 1.2 }); pop();
  pop();
  return [x + 60 * s, y - 490 * s];                                 // точка прожектора
}
function beam(x, y, ang, len, a, col = 'rgba(255,248,220,1)') {      // луч прожектора: конус с мягким краем
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let k = 0; k < 3; k++) { const sp = 0.05 + k * 0.035, g = ctx.createLinearGradient(x, y, x + Math.cos(ang) * len, y + Math.sin(ang) * len); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = a * (0.55 - k * 0.15); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(ang - sp) * len, y + Math.sin(ang - sp) * len); ctx.lineTo(x + Math.cos(ang + sp) * len, y + Math.sin(ang + sp) * len); ctx.closePath(); ctx.fill(); }
  ctx.restore(); glow(x, y, 60, col, a * 0.9);
}
function wire(x0, x1, y, h, t, o = {}) {                               // колючая проволока: столбы, 5 нитей с колючками, провис
  const L = '#1a140e', step = o.step || 170, col = o.col || '#2a241e';
  for (let x = x0; x <= x1; x += step) { pencil([[x, y + 6], [x + 4, y - h]], { w: o.post || 8, col: o.wood || '#4a3a2a', pass2: false }); if (o.snow) pencil([[x - 6, y - h - 2], [x + 10, y - h - 2]], { w: 6, col: '#eef4f8', a: 0.9, pass2: false }); }
  for (let k = 0; k < 5; k++) { const yy = y - h * (0.12 + k * 0.2); for (let x = x0; x < x1; x += step) {
    const P = []; for (let q = 0; q <= 8; q++) P.push([x + q / 8 * step, yy + Math.sin(q / 8 * Math.PI) * 8]); pencil(P, { w: o.w || 2, col, a: 0.9, pass2: false, gap: false });
    for (let q = 1; q < 8; q += 2) { const [bx, by] = P[q]; pencil([[bx - 6, by - 6], [bx + 6, by + 6]], { w: 1.6, col, pass2: false }); pencil([[bx - 6, by + 6], [bx + 6, by - 6]], { w: 1.6, col, pass2: false }); } } }
}
function loco(x, y, s, t, o = {}) {                                    // паровоз серии Э (вид сбоку, едет вправо), тендер, дым
  push(x, y, s); const L = '#0e0a08', bk = '#1e1e22', rd = '#8a1e18';
  const boil = rect(-60, -230, 330, 130, { wash: bk, washA: 1, w: 2.6, col: L }); shadeG(boil.path, 0, -230, 0, -100, '#000000', 0.5); metalG(boil.path, 100, -200, 120, '#6a6a74', bk, '#000000');
  for (let k = 0; k < 4; k++) pencil([[k * 80 - 20, -230], [k * 80 - 20, -100]], { w: 2, col: '#4a4a52', a: 0.7, pass2: false });
  rect(270, -210, 30, 110, { wash: '#2a2a30', washA: 1, w: 2, col: L }); ell(300, -155, 12, 50, { wash: '#30303a', washA: 1, w: 2, col: L });   // дымовая коробка
  rect(210, -300, 40, 70, { wash: bk, washA: 1, w: 2.2, col: L }); rect(204, -306, 52, 12, { wash: '#2a2a30', washA: 1, w: 1.6, col: L });     // труба
  ell(120, -238, 26, 18, { wash: '#2a2a30', washA: 1, w: 1.8, col: L });
  const cab = rect(-170, -300, 120, 200, { wash: bk, washA: 1, w: 2.4, col: L }); rect(-150, -280, 70, 60, { wash: o.cabLit ? '#ffcf7a' : '#3a3a40', washA: 1, w: 1.6, col: L }); if (o.cabLit) glow(-115, -250, 90, 'rgba(255,200,110,1)', 0.6);
  rect(-180, -310, 140, 14, { wash: '#2a2a30', washA: 1, w: 1.8, col: L });
  rect(-200, -100, 520, 30, { wash: rd, washA: 1, w: 2.2, col: L });                               // красная рама
  for (let k = 0; k < 5; k++) { const wx = -120 + k * 90, R = k === 0 ? 34 : 48; push(wx, -48, 1, t * (o.v || 0) * 4); ell(0, 0, R, R, { wash: rd, washA: 1, w: 2.4, col: L }); for (let q = 0; q < 8; q++) pencil([[0, 0], [Math.cos(q * 0.785) * R * 0.85, Math.sin(q * 0.785) * R * 0.85]], { w: 2.4, col: '#2a0a08', pass2: false }); ell(0, 0, 9, 9, { wash: '#c8c8c8', washA: 1, w: 1.4 }); pop(); }
  pencil([[-30, -48], [240, -48]], { w: 6, col: '#8a8a90', pass2: false });
  if (o.head !== false) { ell(320, -250, 18, 18, { wash: '#fff2c8', washA: 1, w: 2, col: L }); glow(320, -250, 120, 'rgba(255,240,190,1)', o.headA ?? 0.8); }
  push(-330, 0); rect(-140, -230, 260, 150, { wash: '#2a2a30', washA: 1, w: 2.4, col: L }); for (let k = 0; k < 3; k++) { ell(-90 + k * 90, -48, 34, 34, { wash: rd, washA: 1, w: 2.2, col: L }); ell(-90 + k * 90, -48, 8, 8, { wash: '#c8c8c8', washA: 1, w: 1.2 }); }
  blob([[-140, -230], [-120, -262], [-40, -270], [60, -266], [120, -232]], { wash: '#141210', washA: 1, w: 1.8, col: L }); pop();
  pop();
  if (o.smoke !== false) for (let k = 0; k < 9; k++) { const ph = (t * 0.6 + k / 9) % 1, sx = x + (230 - ph * 520) * s, sy = y - (310 + ph * 360) * s, r = (40 + ph * 140) * s;
    ell(sx, sy, r, r * 0.8, { wash: o.smokeCol || '#cfcac0', washA: 0.55 * (1 - ph), w: 0, line: false }); }
}
function barrack(x, y, w, h, t, o = {}) {                               // барак: доски, двускатная крыша, окна, труба с дымом, снег
  const L = '#1a120a', wd = o.wood || '#6a5038';
  const body = rect(x, y - h, w, h, { wash: wd, washA: 1, w: 2.2, col: L }); hatch(body.path, body.bb, { gap: 9, a: 0.35, col: '#2a1a0e', ang: 0, w: 1.2 }); shadeG(body.path, x, 0, x + w, 0, '#1a0e06', 0.35);
  poly([[x - 20, y - h], [x + w / 2, y - h - h * 0.55], [x + w + 20, y - h]], { wash: o.roof || '#4a3a2c', washA: 1, w: 2.2, col: L });
  if (o.snow) pencil([[x - 16, y - h - 4], [x + w / 2, y - h - h * 0.55 - 4], [x + w + 16, y - h - 4]], { w: 12, col: '#eef4f8', a: 0.95, pass2: false });
  const nwin = Math.max(1, Math.floor(w / 110)); for (let k = 0; k < nwin; k++) { const wx = x + (k + 0.5) * w / nwin - 22; rect(wx, y - h * 0.68, 44, 40, { wash: o.lit ? '#ffcf7a' : '#2a2420', washA: 1, w: 1.8, col: L }); pencil([[wx + 22, y - h * 0.68], [wx + 22, y - h * 0.68 + 40]], { w: 1.6, col: L, pass2: false }); if (o.lit) glow(wx + 22, y - h * 0.68 + 20, 60, 'rgba(255,200,110,1)', 0.45); }
  const cx = x + w * 0.7; rect(cx, y - h - h * 0.5, 22, h * 0.3, { wash: '#5a4a40', washA: 1, w: 1.6, col: L });
  for (let k = 0; k < 6; k++) { const ph = (t * 0.3 + k / 6 + x * 0.001) % 1; ell(cx + 11 + ph * 90 + Math.sin(t + k) * 10, y - h - h * 0.55 - ph * 220, 14 + ph * 40, 12 + ph * 30, { wash: '#bdb8ae', washA: 0.4 * (1 - ph), line: false }); }
  if (o.sign) { rect(x + w * 0.1, y - h * 0.32, 130, 34, { wash: '#efe4cc', washA: 1, w: 1.6, col: L }); txt(o.sign, x + w * 0.1 + 65, y - h * 0.32 + 18, 20, { col: '#3a1a10', font: 'Osw' }); }
}
function snowGround(y, t, o = {}) {                                    // снежная земля с колеями, следами и тенями
  const g = shape([[-1500, y], [W + 1500, y], [W + 1500, 2600], [-1500, 2600]], { wash: o.col || '#dfe8ee', washA: 1, w: 0, line: false });
  shadeG(g.path, 0, y, 0, y + 500, o.colD || '#9fb2c2', 0.5);
  const r = rng(19900 + (o.seed || 0)); for (let k = 0; k < 70; k++) { const x = -300 + r() * 1700, yy = y + 10 + Math.pow(r(), 1.5) * 500, w = 30 + r() * 120; pencil([[x, yy], [x + w, yy + r() * 6 - 3]], { w: 1.4, col: o.colD || '#9fb2c2', a: 0.5, pass2: false, gap: false }); }
  for (let k = 0; k < 24; k++) { const x = -200 + r() * 1500, yy = y + 40 + r() * 420; ell(x, yy, 8, 4, { wash: '#8a9eb0', washA: 0.45, line: false }); ell(x + 22, yy + 10, 8, 4, { wash: '#8a9eb0', washA: 0.45, line: false }); }
}
function worker(x, y, s, t, o = {}) {                                   // человек 1950-х на базе human(): ушанка/каска/шапочка, ватник, инструмент
  const hat = o.hat || 'ushanka';
  human(x, y, s, t, Object.assign({ body: o.body || '#3c4148', legs: '#2a2c30', boots: '#1a1a1a', hat: hat === 'ushanka' ? 'fur' : hat === 'whitecap' ? 'scarf' : hat === 'kaska' ? 'helmet' : hat, hatCol: hat === 'ushanka' ? '#5a4632' : hat === 'whitecap' ? '#f4f6f2' : o.hatCol }, o));
  push(x, y, s, 0, o.flip || 1); const L = '#1a120a', hy = -238 - 46;
  if (hat === 'ushanka') for (const sd of [-1, 1]) blob([[sd * 38, hy - 20], [sd * 52, hy - 10], [sd * 50, hy + 26], [sd * 36, hy + 20]], { wash: '#5a4632', washA: 1, w: 1.6, col: L });
  if (hat === 'kaska') { rect(-10, hy - 70, 20, 14, { wash: '#30343a', washA: 1, w: 1.2 }); glow(0, hy - 63, 50, 'rgba(255,230,160,1)', 0.7); ell(0, hy - 63, 6, 5, { wash: '#fff6d8', washA: 1, line: false }); }
  if (o.tool === 'shovel') { pencil([[52, -170], [96, 20]], { w: 6, col: '#6a4424', pass2: false }); poly([[86, 10], [112, 6], [118, 50], [96, 58]], { wash: '#7a7e84', washA: 1, w: 1.6, col: L }); }
  if (o.tool === 'pick') { pencil([[50, -150], [110, -280]], { w: 6, col: '#6a4424', pass2: false }); pencil(spline([[70, -300], [110, -282], [150, -250]], false, 6), { w: 7, col: '#7a7e84', pass2: false }); }
  if (o.tool === 'drill') { push(70, -150, 1, -0.5 + Math.sin(t * 50) * 0.03); rect(-14, -30, 28, 70, { wash: '#4a5058', washA: 1, w: 1.8, col: L }); pencil([[0, -30], [0, -150]], { w: 5, col: '#a8acb0', pass2: false }); pop(); }
  if (o.tool === 'sleeper') { push(0, -250, 1, -0.12); rect(-150, -18, 300, 30, { wash: '#6a4a2a', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.3, col: L, ang: 0 } }); pop(); }
  if (o.tool === 'bag') { blob([[30, -160], [70, -170], [84, -110], [40, -96]], { wash: '#8a7a5a', washA: 1, w: 1.6, col: L }); }
  pop();
}
function wheelbarrow(x, y, s, o = {}) {                                // тачка с породой
  push(x, y, s, 0, o.flip || 1); const L = '#1a120a';
  poly([[-70, -70], [70, -70], [50, -20], [-50, -20]], { wash: '#5a5048', washA: 1, w: 2, col: L }); ell(60, -14, 18, 18, { wash: '#2a2420', washA: 1, w: 2, col: L });
  pencil([[-60, -40], [-140, -10]], { w: 5, col: '#6a4424', pass2: false });
  for (let k = 0; k < 6; k++) ell(-40 + k * 16, -76 - (k % 2) * 8, 14, 10, { wash: o.rock || '#8a8478', washA: 1, w: 1.2, col: L });
  pop();
}
function crate(x, y, w, h, o = {}) { const b = rect(x, y - h, w, h, { wash: o.col || '#8a6a42', washA: 1, w: 2, col: '#1a120a' }); hatch(b.path, b.bb, { gap: 10, a: 0.3, col: '#3a2410', ang: 0, w: 1.2 }); pencil([[x, y - h], [x + w, y]], { w: 2, col: '#3a2410', a: 0.6, pass2: false }); if (o.txt) txt(o.txt, x + w / 2, y - h / 2, Math.min(28, w / 4), { col: '#2a1a0a', font: 'Osw' }); }
function barrel(x, y, s, col = '#5a4030') { push(x, y, s); const b = blob([[-34, 0], [-40, -50], [-34, -100], [34, -100], [40, -50], [34, 0]], { wash: col, washA: 1, w: 2, col: '#1a120a' }); shadeG(b.path, -40, 0, 40, 0, '#000000', 0.4); for (const yy of [-20, -80]) pencil([[-38, yy], [38, yy]], { w: 4, col: '#2a2a2a', pass2: false }); pop(); }
function dog(x, y, s, t, o = {}) {                                     // овчарка (силуэт с ушами), сидит/лает
  push(x, y, s, 0, o.flip || 1); const L = '#1a120a', c = '#4a3a2a', bark = Math.max(0, Math.sin(t * 9)) * (o.bark || 0);
  blob([[-60, 0], [-70, -50], [-30, -80], [30, -76], [50, -40], [40, 0]], { wash: c, washA: 1, w: 2, col: L });
  push(52, -84, 1, -0.2 - bark * 0.2); blob([[-20, 0], [-18, -30], [10, -38], [44, -20], [46, -6], [10, 6]], { wash: c, washA: 1, w: 2, col: L }); poly([[-8, -30], [-4, -62], [8, -34]], { wash: c, washA: 1, w: 1.6, col: L }); ell(14, -22, 3, 3, { wash: '#f0d080', washA: 1, line: false }); if (bark > 0.3) pencil([[46, -4], [30, 10]], { w: 2, col: L, pass2: false }); pop();
  pencil(spline([[-60, -40], [-96, -60], [-110, -40]], false, 6), { w: 8, col: c, pass2: false });
  pop();
}
function pole(x, y, h, t, o = {}) {                                    // деревянный столб с проводами и фонарём
  pencil([[x, y], [x + 4, y - h]], { w: 9, col: o.wood || '#4a3a2a', pass2: false }); pencil([[x - 50, y - h + 30], [x + 54, y - h + 30]], { w: 5, col: o.wood || '#4a3a2a', pass2: false });
  if (o.lamp) { pencil(spline([[x + 4, y - h + 10], [x + 60, y - h - 6], [x + 90, y - h + 20]], false, 6), { w: 4, col: '#2a2a2a', pass2: false }); poly([[x + 74, y - h + 20], [x + 106, y - h + 20], [x + 96, y - h + 4], [x + 84, y - h + 4]], { wash: '#2a2a2a', washA: 1, w: 1.4 }); glow(x + 90, y - h + 26, 120, o.lampCol || 'rgba(255,214,140,1)', o.lamp); }
}
