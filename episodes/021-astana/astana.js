/* 021 — общие детали Астаны. Часть хелперов (лошадь, арба, бочки, ящики, мешки, фонари, провода, птицы, облака, барак, собака, пушка, частокол, дым, панелька) — из 020 grozny.js. */
function cannon(x, y, s, t, o = {}) {                                   // чугунная пушка на лафете, смотрит вправо
  push(x, y, s, 0, o.flip || 1); const L = '#140c06';
  blob([[-60, -18], [-40, -60], [30, -56], [50, -20], [30, 0], [-50, 0]], { wash: '#6a4a2a', washA: 1, w: 2, col: L, shade: { gap: 5, a: 0.3, col: L, ang: 0.3 } });
  for (const xx of [-34, 26]) { ell(xx, -6, 26, 26, { wash: '#5a3a1e', washA: 1, w: 2, col: L }); for (let q = 0; q < 6; q++) pencil([[xx, -6], [xx + Math.cos(q) * 24, -6 + Math.sin(q) * 24]], { w: 2, col: L, a: 0.7, pass2: false }); }
  push(10, -66, 1, -0.12 + (o.tilt || 0)); const c = blob([[-70, -14], [80, -11], [96, -16], [96, 16], [80, 11], [-70, 16], [-80, 0]], { wash: '#2a2a2a', washA: 1, w: 2, col: L }); shadeG(c.path, 0, -16, 0, 16, '#000000', 0.45); pencil([[-60, -8], [80, -6]], { w: 3, col: '#8a8a8a', a: 0.5, pass2: false }); pop();
  if (o.balls) for (let q = 0; q < 4; q++) ell(-110 + (q % 2) * 22, -12 - Math.floor(q / 2) * 18, 11, 11, { wash: '#222', washA: 1, w: 1.4, col: L });
  pop();
}
function palisade(x0, x1, y, h, t, o = {}) {                            // частокол из заострённых брёвен
  const r = rng(20400 + (o.seed || 0));
  for (let x = x0; x < x1; x += 26) { const hh = h * (0.9 + r() * 0.2); const p = poly([[x, y], [x, y - hh], [x + 12, y - hh - 18], [x + 24, y - hh], [x + 24, y]], { wash: lerpC(o.col || '#7a5a36', '#3a2810', r() * 0.4), washA: 1, w: 1.6, col: '#1a0e06', a: 0.8 });
    pencil([[x + 6, y - 8], [x + 6, y - hh + 6]], { w: 1.4, col: '#2a1808', a: 0.5, pass2: false }); }
  pencil([[x0, y - h * 0.3], [x1, y - h * 0.3]], { w: 6, col: '#4a3018', pass2: false }); pencil([[x0, y - h * 0.72], [x1, y - h * 0.72]], { w: 6, col: '#4a3018', pass2: false });
}
function rampart(x0, x1, y, h, t, o = {}) {                             // земляной вал с дёрном и рвом перед ним
  const P = [[x0 - 80, y + 40], [x0, y - h], [x1, y - h], [x1 + 80, y + 40]];
  const v = shape(P, { wash: o.col || '#7a6a42', washA: 1, w: 2.2, col: '#2a1a0a', a: 0.7 }); hatch(v.path, v.bb, { gap: 8, a: 0.25, col: '#3a2a12', ang: 0.6, w: 1.2 }); shadeG(v.path, 0, y - h, 0, y + 40, '#2a1a0a', 0.35);
  pencil([[x0, y - h], [x1, y - h]], { w: 8, col: o.turf || '#5a7a32', a: 0.9, pass2: false });
  const ditch = shape([[x0 - 160, y + 40], [x1 + 160, y + 40], [x1 + 120, y + 90], [x0 - 120, y + 90]], { wash: '#3a2c1a', washA: 1, w: 1.6, col: '#1a0e06', a: 0.6 }); hatch(ditch.path, ditch.bb, { gap: 6, a: 0.3, col: '#120a04', ang: 0, w: 1 });
}
function smokeCol(x, y, t, o = {}) {                                     // столб дыма (нефтяной пожар/трубы): клубы растут и тянутся ветром
  const n = o.n || 10, col = o.col || '#1e1814', sz = o.sz || 1;
  for (let k = 0; k < n; k++) { const ph = (t * (o.sp || 0.18) + k / n) % 1, xx = x + ph * (o.wind ?? 260) + Math.sin(t * 0.8 + k) * 20, yy = y - ph * (o.h || 700), r = (30 + ph * 140) * sz;
    blob([[xx - r, yy], [xx - r * 0.7, yy - r * 0.7], [xx, yy - r], [xx + r * 0.8, yy - r * 0.6], [xx + r, yy], [xx + r * 0.4, yy + r * 0.5], [xx - r * 0.5, yy + r * 0.4]], { wash: col, washA: (o.a ?? 0.75) * (1 - ph * 0.7), w: 1.2, col: '#000', a: 0.25 * (1 - ph) }); }
}
function panel(x, base, w, h, t, o = {}) {                               // советская панельная 9-этажка; o.ruin — руина: обломанный верх, пустые окна, копоть
  const L = '#120c08', fl = o.floors || 9, cols = Math.max(3, Math.round(w / 70)), fh = h / fl, r = rng(20500 + (o.seed || 0));
  let P; if (o.ruin) { P = [[x, base]]; for (let k = 0; k <= 10; k++) { const f = k / 10; P.push([x + w * f, base - h * (0.55 + 0.45 * Math.abs(Math.sin(f * 7 + (o.seed || 0))) * (0.6 + r() * 0.4))]); } P.push([x + w, base]); } else P = [[x, base], [x, base - h], [x + w, base - h], [x + w, base]];
  const b = shape(P, { wash: o.col || '#b8b0a0', washA: 1, w: 2.2, col: L, a: 0.8 }); shadeG(b.path, x, 0, x + w, 0, '#000000', 0.3); hatch(b.path, b.bb, { gap: 12, a: 0.1, col: '#3a3028', ang: 1.45, w: 1 });
  ctx.save(); ctx.clip(b.path);
  for (let fy = 0; fy < fl; fy++) { pencil([[x, base - fy * fh], [x + w, base - fh * fy]], { w: 1.4, col: L, a: 0.35, pass2: false });
    for (let c = 0; c < cols; c++) { const wx = x + 10 + c * (w - 20) / cols, wy = base - (fy + 1) * fh + fh * 0.22, ww = (w - 20) / cols - 16, wh = fh * 0.5; const lit = !o.ruin && r() < (o.on ?? 0.4);
      rect(wx, wy, ww, wh, { wash: o.ruin ? '#0e0a08' : lit ? '#ffcf7a' : '#3a4048', washA: 1, w: 1.2, col: L, a: 0.6 }); if (lit && o.glowW) glow(wx + ww / 2, wy + wh / 2, 40, 'rgba(255,200,110,1)', 0.3);
      if (o.ruin && r() < 0.35) blob([[wx - 6, wy + wh], [wx + ww * 0.5, wy - fh * 0.5], [wx + ww + 6, wy + wh]], { wash: '#1a1410', washA: 0.5, line: false });   // копоть над окном
      if (!o.ruin && c % 2 === 0 && fy > 0) rect(wx - 4, wy + wh, ww + 8, 10, { wash: '#8a8478', washA: 1, w: 1, col: L, a: 0.6 }); } }
  ctx.restore();
  if (o.ruin) for (let k = 0; k < 5; k++) { const rx = x + r() * w; pencil([[rx, base - h * 0.5 - r() * h * 0.3], [rx + (r() - 0.5) * 40, base - h * 0.2]], { w: 3, col: '#5a4a3a', a: 0.7, pass2: false }); }   // торчащая арматура
}
function horse(x, y, s, t, o = {}) {                                    // лошадь сбоку (тянет телегу / под седлом), голова вправо
  push(x, y, s, 0, o.flip || 1); const L = '#1a0e06', c = o.col || '#6a4024', st = Math.sin(t * (o.walk || 0) * 6);
  for (const [lx, ph] of [[-70, 0], [-50, 1.5], [60, 0.8], [80, 2.3]]) pencil([[lx, -110], [lx + Math.sin(ph + t * (o.walk || 0) * 6) * 12, -10], [lx + 4 + Math.sin(ph + t * (o.walk || 0) * 6) * 14, 0]], { w: 10, col: lerpC(c, '#000000', 0.3), pass2: false });
  blob([[-100, -110], [-90, -170], [0, -180], [80, -170], [110, -130], [90, -100], [-60, -96]], { wash: c, washA: 1, w: 2.2, col: L, shade: { gap: 6, a: 0.25, col: L, ang: 0.4 } });
  blob([[80, -160], [120, -230], [150, -250], [180, -230], [176, -210], [140, -190], [110, -130]], { wash: c, washA: 1, w: 2.2, col: L }); ell(160, -236, 4, 4, { wash: '#0a0604', washA: 1, line: false });
  pencil(spline([[100, -200], [120, -240], [140, -256]], false, 6), { w: 8, col: '#1a0e06', pass2: false }); pencil(spline([[-100, -150], [-130, -110 + st * 4], [-126, -60]], false, 6), { w: 10, col: '#1a0e06', pass2: false });
  if (o.saddle) blob([[-30, -180], [-20, -200], [30, -200], [40, -180]], { wash: '#5a1a12', washA: 1, w: 1.6, col: L });
  pop();
}
function cart(x, y, s, t, o = {}) {                                      // арба: два больших колеса, кузов с грузом (бочки/мешки/брёвна)
  push(x, y, s, 0, o.flip || 1); const L = '#140c06';
  const b = rect(-140, -150, 260, 60, { wash: '#7a5a36', washA: 1, w: 2, col: L }); hatch(b.path, b.bb, { gap: 10, a: 0.3, col: '#2a1808', ang: 0, w: 1.2 }); pencil([[120, -120], [260, -110]], { w: 7, col: '#5a3a1e', pass2: false });
  for (const wx of [-60]) { ell(wx, -70, 70, 70, { wash: 'rgba(0,0,0,0)', washA: 0, w: 7, col: '#4a3018' }); for (let q = 0; q < 8; q++) pencil([[wx, -70], [wx + Math.cos(q * 0.785) * 66, -70 + Math.sin(q * 0.785) * 66]], { w: 4, col: '#4a3018', pass2: false }); }
  if (o.load === 'barrels') for (let q = 0; q < 3; q++) barrel(-100 + q * 80, -150, 0.8, '#3a2a1a'); else if (o.load === 'logs') for (let q = 0; q < 4; q++) ell(-10, -160 - q * 18, 130, 12, { wash: '#8a6a42', washA: 1, w: 1.6, col: L }); else for (let q = 0; q < 4; q++) blob([[-120 + q * 60, -150], [-118 + q * 60, -200], [-70 + q * 60, -204], [-66 + q * 60, -150]], { wash: '#c8b08a', washA: 1, w: 1.6, col: L });
  pop();
}
function barrel(x, y, s, col = '#5a4030') { push(x, y, s); const b = blob([[-34, 0], [-40, -50], [-34, -100], [34, -100], [40, -50], [34, 0]], { wash: col, washA: 1, w: 2, col: '#1a120a' }); shadeG(b.path, -40, 0, 40, 0, '#000000', 0.4); for (const yy of [-20, -80]) pencil([[-38, yy], [38, yy]], { w: 4, col: '#2a2a2a', pass2: false }); pop(); }
function crate(x, y, w, h, o = {}) { const b = rect(x, y - h, w, h, { wash: o.col || '#8a6a42', washA: 1, w: 2, col: '#1a120a' }); hatch(b.path, b.bb, { gap: 10, a: 0.3, col: '#3a2410', ang: 0, w: 1.2 }); pencil([[x, y - h], [x + w, y]], { w: 2, col: '#3a2410', a: 0.6, pass2: false }); if (o.txt) txt(o.txt, x + w / 2, y - h / 2, Math.min(28, w / 4), { col: '#2a1a0a', font: 'Osw' }); }
function sack(x, y, s, col = '#c8b08a') { push(x, y, s); blob([[-30, 0], [-36, -40], [-20, -70], [0, -78], [20, -70], [36, -40], [30, 0]], { wash: col, washA: 1, w: 1.8, col: '#2a1a0a', shade: { gap: 6, a: 0.25, col: '#5a4020', ang: 0.6 } }); pencil([[-14, -66], [14, -66]], { w: 3, col: '#5a4020', pass2: false }); pop(); }
function jug(x, y, s, col = '#b8622a') { push(x, y, s); blob([[-20, 0], [-28, -30], [-14, -54], [-8, -70], [8, -70], [14, -54], [28, -30], [20, 0]], { wash: col, washA: 1, w: 1.8, col: '#2a1208' }); pencil(spline([[20, -56], [36, -44], [24, -24]], false, 5), { w: 3, col: '#2a1208', pass2: false }); pop(); }
function lamppost(x, y, h, t, o = {}) {                                  // фонарь набережной: тонкий столб, два плафона
  pencil([[x, y], [x, y - h]], { w: 7, col: o.col || '#2a2a30', pass2: false }); for (const sd of [-1, 1]) { pencil([[x, y - h + 10], [x + sd * 40, y - h - 4]], { w: 4, col: o.col || '#2a2a30', pass2: false }); ell(x + sd * 44, y - h + 4, 14, 18, { wash: '#fff2c8', washA: 1, w: 1.4, col: '#3a3020' }); glow(x + sd * 44, y - h + 4, 90, o.lampCol || 'rgba(255,214,150,1)', o.lamp ?? 0.6); }
}
function beam(x, y, ang, len, a, col = 'rgba(255,248,220,1)') {
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let k = 0; k < 3; k++) { const sp = 0.05 + k * 0.035, g = ctx.createLinearGradient(x, y, x + Math.cos(ang) * len, y + Math.sin(ang) * len); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = a * (0.55 - k * 0.15); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(ang - sp) * len, y + Math.sin(ang - sp) * len); ctx.lineTo(x + Math.cos(ang + sp) * len, y + Math.sin(ang + sp) * len); ctx.closePath(); ctx.fill(); }
  ctx.restore(); glow(x, y, 60, col, a * 0.9);
}
function wire(x0, x1, y, h, t, o = {}) {
  const step = o.step || 170, col = o.col || '#2a241e';
  for (let x = x0; x <= x1; x += step) pencil([[x, y + 6], [x + 4, y - h]], { w: o.post || 8, col: o.wood || '#4a3a2a', pass2: false });
  for (let k = 0; k < 5; k++) { const yy = y - h * (0.12 + k * 0.2); for (let x = x0; x < x1; x += step) { const P = []; for (let q = 0; q <= 8; q++) P.push([x + q / 8 * step, yy + Math.sin(q / 8 * Math.PI) * 8]); pencil(P, { w: o.w || 2, col, a: 0.9, pass2: false, gap: false });
    for (let q = 1; q < 8; q += 2) { const [bx, by] = P[q]; pencil([[bx - 6, by - 6], [bx + 6, by + 6]], { w: 1.6, col, pass2: false }); pencil([[bx - 6, by + 6], [bx + 6, by - 6]], { w: 1.6, col, pass2: false }); } } }
}
function pole(x, y, h, t, o = {}) {
  pencil([[x, y], [x + 4, y - h]], { w: 9, col: o.wood || '#4a3a2a', pass2: false }); pencil([[x - 50, y - h + 30], [x + 54, y - h + 30]], { w: 5, col: o.wood || '#4a3a2a', pass2: false });
  if (o.lamp) { pencil(spline([[x + 4, y - h + 10], [x + 60, y - h - 6], [x + 90, y - h + 20]], false, 6), { w: 4, col: '#2a2a2a', pass2: false }); poly([[x + 74, y - h + 20], [x + 106, y - h + 20], [x + 96, y - h + 4], [x + 84, y - h + 4]], { wash: '#2a2a2a', washA: 1, w: 1.4 }); glow(x + 90, y - h + 26, 120, o.lampCol || 'rgba(255,214,140,1)', o.lamp); }
}
function birds(t, n, box, seed, col = '#1a1410') {                       // птицы «галочкой»
  const r = rng(seed); for (let i = 0; i < n; i++) { const x = box[0] + ((r() * (box[2] - box[0]) + t * (20 + r() * 30)) % (box[2] - box[0])), y = box[1] + r() * (box[3] - box[1]), f = Math.sin(t * 8 + i) * 6, s = 8 + r() * 10;
    pencil([[x - s, y - f], [x, y], [x + s, y - f]], { w: 2.4, col, a: 0.8, pass2: false, gap: false }); }
}
function clouds(t, y, n, col, seed, a = 0.6) {
  const r = rng(seed); for (let k = 0; k < n; k++) { const w = 200 + r() * 260, x = ((r() * 2400 + t * (8 + r() * 10)) % 2600) - 800, yy = y + r() * 300;
    blob([[x, yy], [x + w * 0.2, yy - 50], [x + w * 0.5, yy - 70], [x + w * 0.8, yy - 40], [x + w, yy], [x + w * 0.5, yy + 20]], { wash: col, washA: a, w: 1.2, col: '#000', a: 0.12 }); }
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
function dog(x, y, s, t, o = {}) {                                     // овчарка (силуэт с ушами), сидит/лает
  push(x, y, s, 0, o.flip || 1); const L = '#1a120a', c = '#4a3a2a', bark = Math.max(0, Math.sin(t * 9)) * (o.bark || 0);
  blob([[-60, 0], [-70, -50], [-30, -80], [30, -76], [50, -40], [40, 0]], { wash: c, washA: 1, w: 2, col: L });
  push(52, -84, 1, -0.2 - bark * 0.2); blob([[-20, 0], [-18, -30], [10, -38], [44, -20], [46, -6], [10, 6]], { wash: c, washA: 1, w: 2, col: L }); poly([[-8, -30], [-4, -62], [8, -34]], { wash: c, washA: 1, w: 1.6, col: L }); ell(14, -22, 3, 3, { wash: '#f0d080', washA: 1, line: false }); if (bark > 0.3) pencil([[46, -4], [30, 10]], { w: 2, col: L, pass2: false }); pop();
  pencil(spline([[-60, -40], [-96, -60], [-110, -40]], false, 6), { w: 8, col: c, pass2: false });
  pop();
}

/* ===================== Астана: свои детали (021) ===================== */
const AZ = { gold: '#e2b04a', goldD: '#9a6a1a', grass: '#c89a3a', grassD: '#7a5a1e', turq: '#1e9aa0', turqL: '#6ad0d0', sky: '#00a8c8', ink: '#14100a', snow: '#eef4f8' };

function kovyl(x, y, s, t, o = {}) {                                     // пучок ковыля: серебристые метёлки гнутся по ветру
  const w = (o.wind ?? 1) * (0.6 + 0.4 * Math.sin(t * 2.4 + x * 0.013)), c = o.col || '#e8d8a8';
  for (let k = -3; k <= 3; k++) { const bx = x + k * 5 * s, h = (60 + Math.abs(k * 7)) * s, tip = [bx + (k * 6 + 34 * w) * s, y - h];
    pencil(spline([[bx, y], [bx + (k * 3 + 10 * w) * s, y - h * 0.55], tip], false, 6), { w: 1.6 * Math.max(0.6, s), col: k % 2 ? c : (o.colD || '#b89a5a'), a: 0.9, pass2: false, gap: false }); }
}
function steppeGround(y, t, o = {}) {                                    // степь: золотая трава полосами, кочки, ковыль, камни
  const top = o.top || '#d8a848', bot = o.bot || '#8a5e1e';
  const g = shape([[-900, y], [1980, y], [1980, 2600], [-900, 2600]], { wash: top, washA: 1, line: false });
  ctx.save(); ctx.clip(g.path); const gr = ctx.createLinearGradient(0, y, 0, y + 700); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, bot); ctx.fillStyle = gr; ctx.fillRect(-900, y, 2900, 1700); ctx.restore();
  const r = rng(o.seed || 21001);
  for (let k = 0; k < 26; k++) { const yy = y + 8 + k * k * 1.6; pencil([[-900, yy + r() * 6], [1980, yy + r() * 6]], { w: 1.2, col: '#5a3a10', a: 0.12 + k * 0.004, pass2: false }); }
  ctx.save(); for (let i = 0; i < 260; i++) { const xx = -300 + r() * 1700, d = r(), yy = y + 10 + d * d * 900; ctx.fillStyle = r() < 0.5 ? 'rgba(90,60,20,0.35)' : 'rgba(255,230,150,0.35)'; ctx.fillRect(xx, yy, 2 + d * 4, 2 + d * 3); } ctx.restore();
  if (o.snow) { const s2 = shape([[-900, y + 4], [1980, y + 4], [1980, 2600], [-900, 2600]], { wash: o.snow, washA: o.snowA ?? 0.75, line: false }); }
  for (let i = 0; i < (o.tufts ?? 30); i++) { const d = r(), xx = -200 + r() * 1500, yy = y + 20 + d * d * 700; kovyl(xx, yy, 0.5 + d * 1.4, t, { wind: o.wind, col: o.snow ? '#f4f0e0' : null }); }
  for (let i = 0; i < 8; i++) { const d = r(), xx = -100 + r() * 1300, yy = y + 40 + d * 500, rr = 8 + d * 26; ell(xx, yy, rr * 1.4, rr * 0.7, { wash: '#8a7a68', washA: 1, w: 1.6, col: AZ.ink, a: 0.6 }); }
}
function windLines(t, a = 1, box = [-100, 300, 1200, 1700], seed = 21002, col = '#fff6dc') {   // ветер степи: длинные изогнутые штрихи
  const r = rng(seed); for (let i = 0; i < 22; i++) { const len = 160 + r() * 280, sp = 900 + r() * 700, x = box[0] + ((r() * 3000 + t * sp) % (box[2] - box[0] + 1200)) - 600, y = box[1] + r() * (box[3] - box[1]);
    const P = []; for (let q = 0; q <= 8; q++) P.push([x + q / 8 * len, y + Math.sin(q / 8 * 3.1 + t * 3 + i) * 10]); pencil(P, { w: 2 + r() * 3, col, a: a * (0.35 + r() * 0.4), pass2: false, gap: false, taper: true }); }
}
function ishim(y0, y1, t, o = {}) {                                      // Ишим: спокойная вода, блики, рябь
  const w = rect(-900, y0, 2900, y1 - y0, { wash: o.top || '#4a8aa0', washA: 1, line: false });
  ctx.save(); ctx.clip(w.path); const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, 'rgba(255,255,255,0.15)'); g.addColorStop(1, o.bot || '#1e4a5a'); ctx.fillStyle = g; ctx.fillRect(-900, y0, 2900, y1 - y0); ctx.restore();
  const r = rng(o.seed || 21003); for (let i = 0; i < 40; i++) { const x = -200 + ((r() * 1600 + t * 18) % 1600), y = y0 + 6 + r() * (y1 - y0 - 10), l = 20 + r() * 60; pencil([[x, y], [x + l, y]], { w: 2, col: o.glint || '#e8f6ff', a: 0.25 + r() * 0.4, pass2: false, gap: false }); }
}
function baiterek(x, base, s, t, o = {}) {                               // Байтерек: белый «ствол» из рёбер, ветви-чаша, золотой шар; смотровая на 97 м
  push(x, base, s); const L = '#2a2420', wc = o.white || '#f2f0ea', sh = o.shade || '#9aa4b0';
  rect(-120, -40, 240, 40, { wash: '#b8b0a4', washA: 1, w: 2, col: L }); rect(-160, -12, 320, 12, { wash: '#8a8278', washA: 1, w: 2, col: L });
  for (let k = -4; k <= 4; k++) { const bx = k * 13; pencil(spline([[bx * 1.8, -40], [bx * 1.1, -300], [bx * 0.9, -600], [bx * 1.4, -760]], false, 10), { w: 7, col: k % 2 ? wc : sh, pass2: false }); }
  for (let y = -80; y > -760; y -= 34) pencil([[-60 + y * 0.02, y], [60 - y * 0.02, y]], { w: 1.6, col: L, a: 0.25, pass2: false });
  const cr = []; for (let k = -6; k <= 6; k++) { const a = k / 6, P = [[a * 50, -740], [a * 140, -830], [a * 165, -930], [a * 130 + Math.sign(a) * 10, -1010]]; cr.push(P[3]); pencil(spline(P, false, 10), { w: 6, col: k % 2 ? wc : sh, pass2: false }); }
  ell(0, -930, 105, 105, { wash: o.ball || '#e8a830', washA: 1, w: 3, col: '#5a3a10' });
  const gb = ctx.createRadialGradient(-40, -970, 10, 0, -930, 110); gb.addColorStop(0, 'rgba(255,250,210,0.95)'); gb.addColorStop(0.5, 'rgba(255,200,80,0.3)'); gb.addColorStop(1, 'rgba(120,60,0,0.4)'); ctx.save(); ctx.fillStyle = gb; ctx.beginPath(); ctx.arc(0, -930, 104, 0, 6.3); ctx.fill(); ctx.restore();
  for (let k = -3; k <= 3; k++) pencil(ellPts(0, -930, 104 * Math.cos(k * 0.4), 104, 0, 0, 30).slice(0, 16), { w: 1.4, col: '#7a4a10', a: 0.4, pass2: false });
  pencil([[-100, -930], [100, -930]], { w: 2, col: '#7a4a10', a: 0.5, pass2: false });
  if (o.glow) glow(0, -930, 260, 'rgba(255,200,90,1)', o.glow);
  pop();
}
function khanShatyr(x, base, s, t, o = {}) {                             // Хан Шатыр: наклонный прозрачный шатёр-конус на мачте, сетка тросов
  push(x, base, s); const L = '#1e2a30', top = [40, -760];
  const P = [[-330, 0], [-250, -180], [-120, -460], top, [180, -440], [300, -170], [360, 0]];
  const b = blob(P, { wash: o.col || '#bcd8dc', washA: 0.95, w: 3, col: L });
  ctx.save(); ctx.clip(b.path); const g = ctx.createLinearGradient(-330, 0, 360, -700); g.addColorStop(0, 'rgba(255,255,255,0.0)'); g.addColorStop(1, o.lit ? 'rgba(255,190,120,0.5)' : 'rgba(255,255,255,0.45)'); ctx.fillStyle = g; ctx.fillRect(-400, -800, 800, 820); ctx.restore();
  for (let k = 0; k <= 14; k++) { const bx = -330 + k * 690 / 14; pencil(spline([[bx, 0], [lerp(bx, top[0], 0.5) + (bx < 0 ? -20 : 20), -380], top], false, 10), { w: 1.6, col: L, a: 0.35, pass2: false, gap: false }); }
  for (let k = 1; k < 8; k++) { const yy = -k * 90, w2 = 345 * (1 - k / 8.6); pencil(ellPts(lerp(15, top[0], k / 8.4), yy, w2, 14, 0, 0, 40).slice(20, 41), { w: 1.6, col: L, a: 0.35, pass2: false, gap: false }); }
  pencil([[top[0], top[1]], [top[0] + 12, top[1] - 130]], { w: 6, col: '#e8e4dc', pass2: false });
  if (o.lit) for (let k = 0; k < 6; k++) glow(-200 + k * 90, -60 - (k % 3) * 40, 70, 'rgba(255,190,110,1)', 0.35 * o.lit);
  pop();
}
function sphereExpo(x, base, s, t, o = {}) {                             // «Нур Алем» ЭКСПО-2017: стеклянная сфера на подиуме
  push(x, base, s); const L = '#14202a'; rect(-120, -40, 240, 40, { wash: '#6a7a88', washA: 1, w: 2, col: L });
  ell(0, -200, 190, 190, { wash: o.col || '#3a8ab8', washA: 1, w: 3, col: L });
  for (let k = -4; k <= 4; k++) pencil(ellPts(0, -200, 190 * Math.cos(k * 0.36), 190, 0, 0, 40).slice(0, 21), { w: 1.4, col: '#c8eaff', a: 0.4, pass2: false });
  for (let k = -4; k <= 4; k++) pencil([[-Math.sqrt(1 - (k / 5) ** 2) * 190, -200 + k * 38], [Math.sqrt(1 - (k / 5) ** 2) * 190, -200 + k * 38]], { w: 1.4, col: '#c8eaff', a: 0.4, pass2: false });
  glow(-60, -270, 80, 'rgba(220,250,255,1)', 0.5); pop();
}
function skylineA(base, t, o = {}) {                                     // силуэт левого берега: башни, Акорда с голубым куполом, Пирамида
  const L = '#141c24', col = o.col || '#4a6a88', colL = o.colL || '#8ab0c8', on = o.on ?? 0.4, r = rng(21004);
  const T = [[-260, 140, 300], [-140, 90, 220], [-60, 110, 420], [70, 80, 260], [170, 120, 330], [600, 90, 280], [700, 130, 470], [840, 100, 380], [950, 90, 250], [1060, 140, 340], [1210, 100, 300]];
  for (const [x, w, h] of T) { const b = rect(x, base - h, w, h, { wash: col, washA: 1, w: 1.6, col: L, a: 0.7 }); ctx.save(); ctx.clip(b.path); const g = ctx.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, colL); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.globalAlpha = 0.35; ctx.fillStyle = g; ctx.fillRect(x, base - h, w, h); ctx.restore();
    windows(x + 6, base - h + 10, w - 12, h - 20, Math.max(2, Math.round(w / 26)), Math.round(h / 26), Math.round(x + 900), on, o.wa || '#ffd98a', '#9fd8ff', 0.7);
    if (r() < 0.5) poly([[x, base - h], [x + w / 2, base - h - 50 - r() * 60], [x + w, base - h]], { wash: col, washA: 1, w: 1.6, col: L, a: 0.7 }); }
  // Акорда: белый корпус, голубой купол со шпилем
  rect(290, base - 170, 260, 170, { wash: o.white || '#e8e4dc', washA: 1, w: 1.8, col: L, a: 0.8 }); for (let k = 0; k < 9; k++) pencil([[304 + k * 29, base - 160], [304 + k * 29, base - 10]], { w: 3, col: L, a: 0.3, pass2: false });
  ell(420, base - 200, 70, 60, { wash: o.dome || '#3aa8d8', washA: 1, w: 1.8, col: L, a: 0.8 }); rect(380, base - 196, 80, 30, { wash: o.white || '#e8e4dc', washA: 1, w: 1.4, col: L, a: 0.8 }); pencil([[420, base - 260], [420, base - 330]], { w: 4, col: AZ.gold, pass2: false }); ell(420, base - 336, 8, 8, { wash: AZ.gold, washA: 1, line: false });
  poly([[1300, base], [1400, base - 160], [1500, base]], { wash: o.pyr || '#b8a888', washA: 1, w: 1.6, col: L, a: 0.7 });
}
function stela(x, base, s, t, name, o = {}) {                            // въездная стела: бетонный столб + длинная табличка с именем города
  push(x, base, s); const L = '#14100a';
  for (const px of [-300, 300]) { const p = rect(px - 22, -520, 44, 520, { wash: '#b8b4ac', washA: 1, w: 2.4, col: L }); hatch(p.path, p.bb, { gap: 10, a: 0.25, col: '#3a3630', ang: 1.4, w: 1 }); }
  push(0, -430, 1, o.tilt || 0);
  const pl = rect(-360, -90, 720, 180, { wash: o.bg || AZ.turq, washA: 1, w: 4, col: L }); pencil([[-344, -74], [344, -74], [344, 74], [-344, 74], [-344, -74]], { w: 3, col: AZ.gold, a: 0.9, pass2: false });
  if (name) { ctx.save(); ctx.font = '600 120px Osw'; const fit = Math.min(1, 620 / ctx.measureText(name).width); ctx.restore(); txt(name, 0, 8, 120 * fit, { col: o.txtCol || '#f6ecd6', font: 'Osw', a: o.txtA ?? 1 }); }
  pop();
  // орнамент «кошкар-муйиз» над табличкой
  for (const sd of [-1, 1]) pencil(spline([[0, -540], [sd * 60, -580], [sd * 110, -560], [sd * 100, -520], [sd * 70, -530]], false, 10), { w: 7, col: AZ.gold, pass2: false });
  pop();
}
function yurt(x, base, s, t, o = {}) {                                   // юрта: белый войлок, купол-шанырак, орнаментная лента, дверь
  push(x, base, s); const L = '#1a120a', fc = o.felt || '#efe6d2';
  const w = rect(-150, -150, 300, 150, { wash: fc, washA: 1, w: 2.4, col: L }); hatch(w.path, w.bb, { gap: 14, a: 0.12, col: '#5a4a30', ang: 0.8, w: 1 });
  blob([[-160, -146], [-120, -230], [-40, -270], [40, -270], [120, -230], [160, -146]], { wash: lerpC(fc, '#a89a80', 0.25), washA: 1, w: 2.4, col: L });
  rect(-152, -120, 304, 22, { wash: o.band || '#b8302a', washA: 1, w: 1.6, col: L }); for (let k = 0; k < 10; k++) pencil(spline([[-140 + k * 30, -110], [-130 + k * 30, -118], [-122 + k * 30, -104]], false, 5), { w: 2, col: AZ.gold, pass2: false });
  for (let k = -3; k <= 3; k++) pencil([[k * 14, -270], [k * 50, -150]], { w: 2, col: '#8a6a3a', a: 0.5, pass2: false });
  ell(0, -268, 34, 10, { wash: '#6a4a2a', washA: 1, w: 1.6, col: L });
  rect(-36, -96, 72, 96, { wash: o.door || '#c8762a', washA: 1, w: 2, col: L }); pencil([[0, -96], [0, 0]], { w: 1.6, col: L, a: 0.6, pass2: false });
  if (o.smoke) smokeCol(0, -280, t, { col: 'rgba(220,210,200,0.5)', h: 260, sz: 0.4, n: 6 });
  pop();
}
function camel(x, y, s, t, o = {}) {                                     // двугорбый верблюд, сбоку
  push(x, y, s, 0, o.flip || 1); const L = '#1a120a', c = o.col || '#b8925a', st = Math.sin(t * 3 + x) * (o.walk ? 12 : 0);
  for (const [lx, ph] of [[-60, 0], [-36, 1], [50, 1], [74, 0]]) pencil([[lx, -110], [lx + (ph ? st : -st), -50], [lx + (ph ? st : -st) * 0.6, 0]], { w: 12, col: lerpC(c, '#000000', ph * 0.25), pass2: false });
  blob([[-90, -100], [-96, -150], [-60, -170], [-40, -230], [-10, -170], [20, -170], [44, -236], [74, -170], [100, -150], [96, -104], [0, -90]], { wash: c, washA: 1, w: 2.4, col: L });
  pencil(spline([[96, -140], [130, -190], [150, -240]], false, 8), { w: 26, col: c, pass2: false });
  blob([[136, -250], [150, -270], [196, -262], [206, -244], [170, -232], [140, -232]], { wash: c, washA: 1, w: 2.2, col: L }); ell(176, -256, 3, 3, { wash: L, washA: 1, line: false });
  if (o.load) { rect(-80, -190, 150, 50, { wash: o.load, washA: 1, w: 2, col: L }); for (let k = 0; k < 5; k++) pencil([[-70 + k * 30, -190], [-70 + k * 30, -140]], { w: 2, col: AZ.gold, pass2: false }); }
  pop();
}
function tractor(x, y, s, t, o = {}) {                                   // гусеничный трактор 1950-х: кабина, капот, дым из трубы, гусеница
  push(x, y, s, 0, o.flip || 1); const L = '#14100a', c = o.col || '#c8302a', run = t * (o.speed ?? 1);
  const tr = rect(-170, -70, 330, 70, { wash: '#2a2622', washA: 1, w: 2.4, col: L }); for (let k = 0; k < 14; k++) { const xx = -170 + ((k * 24 + run * 60) % 330); pencil([[xx, -70], [xx, 0]], { w: 2, col: '#5a524a', pass2: false }); }
  for (const wx of [-130, -45, 40, 120]) ell(wx, -35, 28, 28, { wash: '#4a443e', washA: 1, w: 2, col: L });
  const hood = rect(-20, -170, 190, 100, { wash: c, washA: 1, w: 2.4, col: L }); hatch(hood.path, hood.bb, { gap: 8, a: 0.2, col: '#000', ang: 1.57, w: 1.2 });
  for (let k = 0; k < 6; k++) pencil([[150, -160 + k * 14], [166, -160 + k * 14]], { w: 2, col: L, pass2: false });
  const cab = rect(-170, -280, 150, 210, { wash: lerpC(c, '#000000', 0.15), washA: 1, w: 2.4, col: L }); rect(-150, -260, 110, 80, { wash: o.lit ? '#ffd890' : '#9ac0c8', washA: 1, w: 2, col: L });
  pencil([[100, -170], [100, -260]], { w: 12, col: '#2a2622', pass2: false }); smokeCol(100, -268, t, { col: 'rgba(60,50,40,0.5)', h: 220, sz: 0.4, n: 6 });
  if (o.star !== false) txt('ДТ-54', 70, -120, 30, { col: '#f6ecd6', font: 'Osw' });
  pop();
}
function combine(x, y, s, t, o = {}) {                                   // зерноуборочный комбайн: жатка с мотовилом, бункер, кабина, выгрузной шнек
  push(x, y, s, 0, o.flip || 1); const L = '#14100a', c = o.col || '#d84a2a';
  for (const [wx, r] of [[-140, 70], [130, 46]]) { ell(wx, -r, r, r, { wash: '#2a2622', washA: 1, w: 2.4, col: L }); ell(wx, -r, r * 0.45, r * 0.45, { wash: '#8a8278', washA: 1, w: 2, col: L }); }
  const b = rect(-220, -300, 420, 190, { wash: c, washA: 1, w: 2.6, col: L }); hatch(b.path, b.bb, { gap: 9, a: 0.18, col: '#000', ang: 1.57, w: 1.2 });
  rect(-200, -420, 170, 120, { wash: lerpC(c, '#000000', 0.15), washA: 1, w: 2.4, col: L }); rect(-186, -404, 140, 70, { wash: '#a8d0d8', washA: 1, w: 2, col: L });
  rect(20, -400, 170, 100, { wash: '#e8d8a8', washA: 1, w: 2.2, col: L });
  pencil([[180, -360], [330, -420]], { w: 16, col: '#4a4a44', pass2: false });
  rect(-420, -150, 220, 90, { wash: '#e8c040', washA: 1, w: 2.4, col: L }); const rot = t * 4;
  for (let k = 0; k < 5; k++) { const a = rot + k * 1.256; pencil([[-310, -150], [-310 + Math.cos(a) * 80, -150 + Math.sin(a) * 50]], { w: 3, col: L, pass2: false }); }
  if (o.label) txt(o.label, 0, -200, 36, { col: '#f6ecd6', font: 'Osw' });
  pop();
}
function kman(x, y, s, t, o = {}) {                                      // человек степи на базе human(): борик/малахай/платок, чапан
  human(x, y, s, t, Object.assign({ skin: '#d8a47e', hat: 'fur', hatCol: '#7a4a2a', body: '#4a2a3a', legs: '#2a2420', long: 1, trim: AZ.gold }, o));
}
function snowfall(t, a = 1, seed = 21005, vx = 260) { motes(90, [-300, -200, 1400, 2000], '#ffffff', t, seed, { sp: 120, vx, sz: 3.4, a: 0.8 * a, wob: 30, stretch: 2.2 }); }
