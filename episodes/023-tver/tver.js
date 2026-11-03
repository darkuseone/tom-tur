/* 023 — общие детали: из 022 (volgograd.js) + тверские ниже */
/* 022 — общие детали Волгограда. Хелперы (пушка, частокол, вал, дым, панелька, лошадь, арба, бочки, ящики, мешки, фонарь, провода, птицы, облака, барак, собака, ковыль, степь, ветер, река, юрта, верблюд, трактор, kman) — из 021 astana.js; Статуя Свободы — из 001 details.js. */
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
function kman(x, y, s, t, o = {}) {                                      // человек степи на базе human(): борик/малахай/платок, чапан
  human(x, y, s, t, Object.assign({ skin: '#d8a47e', hat: 'fur', hatCol: '#7a4a2a', body: '#4a2a3a', legs: '#2a2420', long: 1, trim: AZ.gold }, o));
}
function snowfall(t, a = 1, seed = 21005, vx = 260) { motes(90, [-300, -200, 1400, 2000], '#ffffff', t, seed, { sp: 120, vx, sz: 3.4, a: 0.8 * a, wob: 30, stretch: 2.2 }); }
function statue(x, y, s, t, pat) {                                   // Статуя Свободы v4: звёздный форт, пьедестал, тога с драпировкой, лицо, корона, скрижаль, факел
  push(x, y, s);
  const star = []; for (let i = 0; i < 22; i++) { const a = i / 22 * 6.283, R = i % 2 ? 230 : 300; star.push([Math.cos(a) * R, Math.sin(a) * R * 0.22]); }
  poly(star, { wash: '#8a7e6a', washA: 0.99, w: 2.4, col: '#2a2010', shade: { gap: 6, a: 0.3, col: '#3a3020' } });
  poly([[-170, -10], [170, -10], [150, -80], [-150, -80]], { wash: '#a89a80', washA: 0.99, w: 2.6, col: '#2a2010' });
  poly([[-130, -80], [130, -80], [104, -390], [-104, -390]], { wash: '#c8b898', washA: 0.99, w: 2.8, col: '#2a2010', shade: { gap: 7, a: 0.25, ang: 1.4 } });
  for (let r = 0; r < 3; r++) for (const wx of [-50, 0, 50]) rect(wx - 10, -350 + r * 80, 20, 46, { wash: '#6a5a44', washA: 0.95, w: 1.4 });
  rect(-112, -400, 224, 22, { wash: '#b8a888', washA: 1, w: 2 });
  push(0, -400, 1);
  const robe = [[-90, 0], [90, 0], [78, -160], [70, -300], [60, -400], [-62, -400], [-72, -300], [-82, -160]];
  const rp = poly(robe, { wash: K.copper, washA: 0.99, w: 3, col: '#2a1408' });
  ctx.save(); ctx.clip(rp.path); const front = -560 + pat * 760; const pg = ctx.createLinearGradient(0, front - 120, 0, front + 40); pg.addColorStop(0, K.patina); pg.addColorStop(1, 'rgba(90,163,145,0)'); ctx.fillStyle = pg; ctx.fillRect(-120, -600, 240, front + 640); ctx.restore();
  const fD = pat > 0.6 ? '#2f6a5a' : '#7a3a14', fL = pat > 0.6 ? '#9ad8c4' : '#e8a070';
  for (let k = 0; k < 9; k++) { const x0 = -78 + k * 19; line([[x0, -6], [x0 + 6 + Math.sin(k * 1.3) * 8, -150], [x0 + 12 - k * 1.5, -300]], { w: 2.4, col: fD, a: 0.85, pass2: false }); line([[x0 + 4, -10], [x0 + 10, -140]], { w: 1.4, col: fL, a: 0.5, pass2: false }); }
  line([[-62, -380], [-10, -300], [70, -220]], { w: 14, col: pat > 0.15 ? '#4f9684' : '#b05e2a' }); line([[-62, -380], [-10, -300], [70, -220]], { w: 2, col: fD, pass2: false });   // перевязь тоги
  const col = pat > 0.15 ? K.patina : K.copper, colD = pat > 0.15 ? '#2f6a5a' : '#7a3a14';
  poly([[-118, -300], [-58, -320], [-52, -196], [-110, -180]], { wash: col, washA: 0.99, w: 2.4, col: '#1a0e06' }); txt('JULY IV', -84, -262, 13, { col: colD, font: 'Osw', rot: -0.2 }); txt('MDCCLXXVI', -82, -240, 11, { col: colD, font: 'Osw', rot: -0.2 });
  line([[-60, -380], [-100, -330], [-84, -260]], { w: 26, col }); pencil([[-60, -380], [-100, -330], [-84, -260]], { w: 2.2 });
  const arm = [[52, -388], [96, -520], [110, -650]]; line(arm, { w: 32, col }); pencil(arm, { w: 2.4 }); line([[56, -400], [80, -470], [70, -420]], { w: 3, col: colD, pass2: false });
  rect(-14, -430, 28, 34, { wash: col, washA: 0.99, w: 2 });
  ell(0, -464, 38, 44, { wash: col, washA: 0.99, w: 3, col: '#1a0e06', shade: { gap: 5, a: 0.25, col: colD, ang: -0.6 } });
  for (const s2 of [-1, 1]) { ell(s2 * 13, -470, 6, 3, { wash: colD, washA: 1, w: 1 }); line([[s2 * 20, -482], [s2 * 6, -484]], { w: 2, col: colD, pass2: false }); }
  line([[0, -468], [-4, -446], [5, -444]], { w: 2, col: colD, smooth: false }); line([[-9, -432], [9, -432]], { w: 2, col: colD, pass2: false });
  rect(-40, -512, 80, 14, { wash: col, washA: 0.99, w: 2 }); for (let k = 0; k < 7; k++) { const a = -Math.PI * (0.12 + k * 0.76 / 6), b0 = [Math.cos(a) * 36, -506 + Math.sin(a) * 14]; poly([[b0[0] - 7, b0[1]], [b0[0] + Math.cos(a) * 72, b0[1] + Math.sin(a) * 72], [b0[0] + 7, b0[1]]], { wash: col, washA: 0.99, w: 1.8 }); }
  rect(98, -704, 26, 56, { wash: col, washA: 0.99, w: 2 }); poly([[84, -704], [138, -704], [130, -738], [92, -738]], { wash: '#d8a830', washA: 1, w: 2.4 }); for (let q = 0; q < 4; q++) line([[90 + q * 12, -706], [92 + q * 12, -736]], { w: 1.4, col: '#7a5410', pass2: false });
  const fl = Math.sin(t * 12) * 8; glow(112, -790, 150, 'rgba(255,200,90,1)', 0.75); blob([[94, -738], [106, -800], [114, -856 + fl], [126, -806], [132, -738]], { wash: '#ffb03a', washA: 1, w: 2.2, col: '#6a2a06' }); blob([[104, -740], [113, -790 + fl * 0.6], [122, -740]], { wash: '#fff0a0', washA: 1, w: 1.2 });
  if (pat > 0 && pat < 1) for (let i = 0; i < 16; i++) { const r = rng(hsh(FRAME, i)); glow((r() - 0.5) * 220, -200 - r() * 600, 8 + r() * 12, 'rgba(220,255,240,1)', 0.9); }
  pop(); pop();
}


/* ===== 022: новые детали Волгограда (курган, Родина-мать, Волга, руины, бойцы, струги, СТЗ-1, кирха, мельница) ===== */
const VG = { crim: '#b0283a', crimD: '#5a1420', crimL: '#e86a5a', steel: '#8a96a6', steelD: '#3e4856', steelL: '#c8d2dc', ink: '#140c0a',
  sun: '#ffb060', sunL: '#ffe0a0', volga: '#3a5a7a', volgaD: '#1a2a40', conc: '#d6cec2', concD: '#8a8278', gold: '#e8b04a', grass: '#8a9a4a', earth: '#6a4a32' };

function sunsetSky(t, o = {}) {                                          // закат над Волгой: багрянец → сталь, солнце у горизонта
  const c = o.cols || ['#1e2438', '#3a3a5a', '#7a3a4a', '#c8504a', '#f08a52', '#ffc070'];
  vgrad(o.y0 ?? -900, o.y1 ?? 1250, c, 1);
  const sx = o.sx ?? 820, sy = o.sy ?? 1060, sr = o.sr ?? 110;
  if (o.sun !== false) { glow(sx, sy, sr * 6, 'rgba(255,150,80,1)', 0.55); ell(sx, sy, sr, sr, { wash: VG.sunL, washA: 1, w: 1.4, col: '#c8603a', a: 0.5 });
    for (let k = 0; k < 4; k++) pencil([[sx - sr * 1.4, sy - 40 + k * 26], [sx + sr * 1.4, sy - 40 + k * 26]], { w: 6 - k, col: '#e86a4a', a: 0.35, pass2: false }); }
  rays(sx, sy, -Math.PI / 2, 2.6, 1500, 'rgba(255,190,130,0.5)', o.rays ?? 0.08, 9, t);
  clouds(t, -560, 6, o.cl1 || '#8a3a4a', (o.seed || 22000) + 1, 0.55); clouds(t, 220, 5, o.cl2 || '#e87a5a', (o.seed || 22000) + 2, 0.45); clouds(t, 640, 3, '#ffb070', (o.seed || 22000) + 3, 0.35);
  if (o.birds !== false) birds(t, o.nb || 8, [-100, -300, 1200, 500], (o.seed || 22000) + 4, '#2a1418');
}
function volga(y0, y1, t, o = {}) {                                      // Волга: широкая, с солнечной дорожкой и рябью
  ishim(y0, y1, t, { top: o.top || '#c86a5a', bot: o.bot || VG.volgaD, glint: o.glint || '#ffd8a0', seed: o.seed || 22010 });
  const sx = o.sx ?? 820, r = rng(o.seed || 22011);
  for (let i = 0; i < 26; i++) { const y = y0 + 8 + i * (y1 - y0) / 26, w = 30 + i * 9, x = sx + Math.sin(t * 1.7 + i) * 12 - w / 2 + (r() - 0.5) * 30;
    pencil([[x, y], [x + w, y]], { w: 3, col: '#ffe2a8', a: 0.5 - i * 0.012, pass2: false, gap: false }); }
  if (o.farBank !== false) hills(y0 + 4, 16, o.bank || '#4a3a4a', (o.seed || 22010) + 5, 1);
}
function kurgan(cx, base, w, h, o = {}) {                                // холм-курган: пологий купол, трава, тропа
  const pts = []; for (let i = 0; i <= 24; i++) { const k = i / 24, x = cx - w / 2 + k * w, y = base - h * Math.pow(Math.sin(Math.PI * k), 0.8) - Math.sin(k * 17 + (o.seed || 1)) * 6; pts.push([x, y]); }
  pts.push([cx + w / 2 + 400, base + 60], [cx - w / 2 - 400, base + 60]);
  const p = shape(pts, { wash: o.col || '#7a6a3a', washA: 1, w: 2.4, col: VG.ink, shade: o.shade === false ? undefined : { gap: 11, a: 0.22, col: '#2a1a10', ang: 0.5 } });
  if (o.rim) { ctx.save(); ctx.clip(p.path); const g = ctx.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, o.rim); ctx.globalAlpha = 0.45; ctx.fillStyle = g; ctx.fillRect(cx - w, base - h - 40, w * 2, h + 120); ctx.restore(); }
  if (o.grass) { const r = rng(o.seed || 22020); for (let i = 0; i < o.grass; i++) { const k = r(), x = cx - w / 2 + k * w, y = base - h * Math.pow(Math.sin(Math.PI * k), 0.8) + 10 + r() * 30; pencil([[x, y], [x + 3, y - 12 - r() * 12]], { w: 2, col: o.gcol || '#c8b060', a: 0.8, pass2: false }); } }
  return p;
}
const MOTHER = (() => {                                                   // геометрия «Родины-матери» (ноги в 0,0, рост фигуры 1000, меч до ≈ −1630)
  const legF = [[-40, -470], [10, -470], [-120, -40], [-170, -10], [-196, 0], [-110, 0], [-80, -40]];
  const legB = [[10, -470], [70, -460], [150, -60], [170, -4], [96, 0], [80, -60]];
  const robe = [[-70, -560], [70, -560], [110, -420], [260, -330], [380, -250], [300, -230], [200, -260], [120, -200], [40, -240], [-60, -200], [-110, -300], [-90, -440]];
  const torso = [[-80, -800], [-90, -840], [60, -850], [96, -800], [80, -640], [70, -560], [-70, -560], [-84, -660]];
  const scarf = [[60, -840], [120, -860], [260, -820], [420, -740], [520, -640], [450, -650], [380, -600], [300, -640], [180, -690], [90, -720]];
  const armL = [[-80, -830], [-200, -800], [-330, -790], [-350, -770], [-330, -750], [-200, -760], [-84, -770]];
  const armR = [[56, -850], [120, -930], [190, -1090], [230, -1120], [216, -1080], [150, -930], [92, -800]];
  const blade = [[205, -1130], [228, -1138], [300, -1630], [286, -1640]];
  return { legF, legB, robe, torso, scarf, armL, armR, blade };
})();
function motherland(x, base, s, t, o = {}) {                             // «Родина-мать зовёт!»: бетон, развевающийся шарф, меч из стали
  push(x, base, s, 0, o.flip || 1); const M = MOTHER, L = VG.ink, c = o.col || VG.conc, cd = o.colD || VG.concD;
  if (o.ghost) { const a = o.ghost; for (const k of ['scarf', 'robe', 'legB', 'legF', 'torso', 'armL', 'armR', 'blade']) sil(M[k], o.gcol || '#ffe8d0', a); sil(ellPts(-14, -905, 52, 62, 0, 0, 24), o.gcol || '#ffe8d0', a); pop(); return; }
  const up = o.build ?? 1;                                                // стройка: видно снизу до доли up
  if (up < 1) { ctx.save(); ctx.beginPath(); ctx.rect(-2000, -1700 * up - 10, 4000, 1800); ctx.clip(); }
  if (o.plinth !== false) { rect(-260, 0, 520, 70, { wash: '#a89a88', washA: 1, w: 2.6, col: L }); rect(-300, 70, 600, 60, { wash: '#8a7e70', washA: 1, w: 2.6, col: L }); }
  const sh = { gap: 10, a: 0.28, col: '#3a2a2a', ang: 1.2 };
  shape(M.scarf, { wash: cd, washA: 1, w: 2.6, col: L, shade: sh });
  for (let k = 0; k < 4; k++) pencil([[120 + k * 40, -800 + k * 10], [360 + k * 30, -690 + k * 14]], { w: 1.6, col: L, a: 0.5, pass2: false });
  shape(M.legB, { wash: cd, washA: 1, w: 2.6, col: L, shade: sh });
  shape(M.robe, { wash: c, washA: 1, w: 2.6, col: L, shade: { gap: 12, a: 0.2, col: '#3a2a2a', ang: 0.9 } });
  for (const [a, b] of [[[-40, -540], [-80, -230]], [[0, -540], [60, -250]], [[40, -520], [200, -280]], [[70, -470], [320, -260]]]) pencil([a, b], { w: 2, col: L, a: 0.55, pass2: false });   // складки
  shape(M.legF, { wash: c, washA: 1, w: 2.6, col: L, shade: sh });
  shape(M.torso, { wash: c, washA: 1, w: 2.6, col: L, shade: sh });
  pencil([[-70, -700], [60, -706]], { w: 2, col: L, a: 0.5, pass2: false });
  shape(M.armL, { wash: c, washA: 1, w: 2.6, col: L });
  for (let k = 0; k < 4; k++) pencil([[-336, -772 + k * 6], [-372, -786 + k * 9]], { w: 4, col: c, pass2: false });   // раскрытая ладонь
  shape(M.armR, { wash: c, washA: 1, w: 2.6, col: L, shade: sh });
  ell(-14, -905, 52, 62, { wash: c, washA: 1, w: 2.6, col: L });           // голова, волосы назад, рот открыт — зовёт
  blob([[-40, -950], [10, -972], [80, -950], [150, -900], [90, -910], [40, -880]], { wash: cd, washA: 1, w: 2.2, col: L });
  ell(-46, -886, 9, 12, { wash: '#3a2a2a', washA: 1, line: false }); pencil([[-58, -920], [-40, -924]], { w: 2.4, col: L, pass2: false }); pencil([[-62, -872], [-48, -858]], { w: 2, col: L, a: 0.6, pass2: false });
  const bl = shape(M.blade, { wash: VG.steelL, washA: 1, w: 2.4, col: L });   // меч: нержавеющая сталь, блик
  pencil([[214, -1136], [292, -1630]], { w: 2, col: '#ffffff', a: 0.8, pass2: false }); pencil([[180, -1120], [252, -1146]], { w: 8, col: VG.steelD, pass2: false });
  if (o.glint) { const k = (t * 0.5) % 1; glow(lerp(220, 296, k), lerp(-1150, -1620, k), 60, 'rgba(255,240,220,1)', 0.7 * o.glint); }
  if (o.rim) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (const k of ['robe', 'torso', 'armL', 'legF']) { const P = M[k]; pencil(P.filter(([px]) => px < 0), { w: 5, col: o.rim, a: 0.35, pass2: false }); } ctx.restore(); }
  if (up < 1) ctx.restore();
  pop();
}
function liberty(x, gy, H, t, o = {}) {                                  // Статуя Свободы без пьедестала: высота фигуры с факелом = H px
  const s = H / 856; ctx.save(); ctx.beginPath(); ctx.rect(-3000, -3000, 7000, gy + 3000); ctx.clip(); statue(x, gy + 400 * s, s, t, o.pat ?? 1); ctx.restore();
}
function soldier(x, y, s, t, o = {}) {                                   // боец 1942: гимнастёрка, каска, шинель — без знаков
  human(x, y, s, t, Object.assign({ body: '#5a5a3a', legs: '#3a3a2a', boots: '#1a1410', hat: 'helmet', skin: '#d0a07e', seed: 300 }, o));
}
function ruinBlock(x, base, w, h, t, o = {}) {                           // выгоревший дом: рваный верх, пустые окна, зарево внутри
  const L = VG.ink, r = rng(o.seed || 22030), top = []; top.push([x, base]);
  for (let i = 0; i <= 8; i++) top.push([x + i * w / 8, base - h + (i % 2 ? r() * h * 0.35 : r() * h * 0.12)]);
  top.push([x + w, base]);
  const p = shape(top, { wash: o.col || '#6a5048', washA: 1, w: 2.4, col: L, shade: { gap: 12, a: 0.25, col: '#1a0a0a', ang: 0.8 } });
  ctx.save(); ctx.clip(p.path);
  for (let rr = 0; rr < Math.floor(h / 90); rr++) for (let cc = 0; cc < Math.floor(w / 70); cc++) { const wx = x + 20 + cc * 70, wy = base - 80 - rr * 90; const lit = r() < (o.fire ?? 0.4);
    rect(wx, wy - 50, 34, 54, { wash: lit ? '#ff8a3a' : '#1a1012', washA: 1, w: 1.6, col: L }); if (lit) glow(wx + 17, wy - 24, 40, 'rgba(255,120,40,1)', 0.35 * flick(t, cc + rr)); }
  ctx.restore();
}
function rubble(x, y, w, seed, o = {}) {                                 // груда кирпича и балок
  const r = rng(seed), L = VG.ink;
  blob([[x, y], [x + w * 0.2, y - 40 - r() * 30], [x + w * 0.5, y - 70 - r() * 40], [x + w * 0.8, y - 30 - r() * 30], [x + w, y]], { wash: o.col || '#6a4a3e', washA: 1, w: 2, col: L, shade: { gap: 8, a: 0.3, col: '#1a0a0a' } });
  for (let i = 0; i < (o.n || 10); i++) { const bx = x + r() * w, by = y - r() * 50; rect(bx, by, 20 + r() * 16, 10 + r() * 6, { wash: ['#9a4a3a', '#7a3a2e', '#5a4a40'][i % 3], washA: 1, w: 1.4, col: L }); }
  for (let i = 0; i < 2; i++) pencil([[x + r() * w, y - 10], [x + r() * w, y - 80 - r() * 40]], { w: 7, col: '#3a2a20', pass2: false });
}
function strug(x, y, s, t, o = {}) {                                     // казачий струг: лодка с парусом и вёслами
  push(x, y + Math.sin(t * 2 + x) * 4, s, Math.sin(t * 1.6 + x) * 0.02, o.flip || 1); const L = VG.ink;
  blob([[-220, -40], [220, -50], [180, 10], [-180, 14]], { wash: o.col || '#6a4a2a', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.3, col: L, ang: 0 } });
  pencil([[-200, -30], [200, -38]], { w: 3, col: '#c89a5a', pass2: false });
  pencil([[0, -40], [0, -330]], { w: 6, col: '#3a2410', pass2: false });
  if (o.sail !== false) { const b = Math.sin(t * 2) * 10; blob([[6, -320], [150 + b, -260], [170 + b, -120], [6, -70]], { wash: o.sailCol || '#e8d8b8', washA: 1, w: 2, col: L }); }
  for (let k = 0; k < 5; k++) { const ox = -160 + k * 70, a = Math.sin(t * 4 + k) * 0.3; pencil([[ox, -40], [ox - 40 + Math.cos(a) * 20, 40 + Math.sin(a) * 30]], { w: 3, col: '#5a3a1e', pass2: false });
    if (o.crew !== false) { ell(ox, -64, 11, 12, { wash: '#c89a78', washA: 1, w: 1.2, col: L }); blob([[ox - 14, -40], [ox - 12, -56], [ox + 12, -56], [ox + 14, -40]], { wash: ['#b0283a', '#3a4a5a', '#5a3a2a'][k % 3], washA: 1, w: 1.2, col: L }); blob([[ox - 11, -70], [ox, -82], [ox + 11, -70]], { wash: '#2a1a14', washA: 1, line: false }); } }
  pop();
}
function stz(x, y, s, t, o = {}) {                                       // колёсный трактор СТЗ-1 (1930): шпоры на колёсах, капот, руль
  push(x, y, s, 0, o.flip || 1); const L = VG.ink, c = o.col || '#4a5a4a', run = t * (o.speed ?? 0);
  const big = (cx, R) => { ell(cx, -R, R, R, { wash: '#3a3430', washA: 1, w: 2.6, col: L }); ell(cx, -R, R * 0.8, R * 0.8, { wash: '#6a6258', washA: 1, w: 1.6, col: L });
    for (let k = 0; k < 10; k++) { const a = run * 2 + k * 0.628; pencil([[cx, -R], [cx + Math.cos(a) * R * 0.8, -R + Math.sin(a) * R * 0.8]], { w: 3, col: L, pass2: false });
      const ax = cx + Math.cos(a) * R, ay = -R + Math.sin(a) * R; rect(ax - 6, ay - 6, 12, 12, { wash: '#2a2420', washA: 1, w: 1, col: L }); }
    ell(cx, -R, 16, 16, { wash: '#c8302a', washA: 1, w: 2, col: L }); };
  const hood = rect(-60, -230, 260, 110, { wash: c, washA: 1, w: 2.4, col: L }); hatch(hood.path, hood.bb, { gap: 8, a: 0.2, col: '#000', ang: 1.57, w: 1.2 });
  rect(190, -240, 40, 140, { wash: '#2a2a2a', washA: 1, w: 2.2, col: L }); for (let k = 0; k < 6; k++) pencil([[194, -230 + k * 20], [226, -230 + k * 20]], { w: 2, col: '#8a8a8a', pass2: false });
  pencil([[40, -230], [40, -330]], { w: 10, col: '#2a2622', pass2: false }); if (o.smoke !== false) smokeCol(40, -340, t, { col: 'rgba(60,50,40,0.5)', h: 200, sz: 0.35, n: 5 });
  pencil([[-110, -200], [-60, -290]], { w: 4, col: L, pass2: false }); ell(-60, -292, 26, 8, { wash: '#2a2a2a', washA: 1, w: 2, col: L });
  rect(-170, -200, 90, 20, { wash: '#2a2a2a', washA: 1, w: 2, col: L });
  big(-140, 110); big(170, 62);
  if (o.label !== false) txt(o.label || 'СТЗ', 70, -170, 34, { col: '#f6ecd6', font: 'Osw' });
  if (o.driver) human(-130, -190, 0.42, t, { body: '#4a5a7a', legs: '#2a2a3a', hat: 'cap', hatCol: '#2a2a2a', seed: 330, armR: 'hold' });
  pop();
}
function factoryHall(x, base, w, h, t, o = {}) {                          // цех с пилообразной крышей, стеклом и трубами
  const L = VG.ink; const p = rect(x, base - h, w, h, { wash: o.col || '#8a6a5a', washA: 1, w: 2.4, col: L, shade: { gap: 13, a: 0.18, col: '#2a1a14', ang: 1.57 } });
  const n = Math.floor(w / 90); for (let k = 0; k < n; k++) { const sx = x + k * 90; poly([[sx, base - h], [sx + 90, base - h - 50], [sx + 90, base - h]], { wash: '#5a4a44', washA: 1, w: 2, col: L }); rect(sx + 56, base - h - 44, 30, 38, { wash: o.lit ? '#ffd890' : '#9ab0c0', washA: 1, w: 1.4, col: L }); }
  for (let k = 0; k < Math.floor(w / 60); k++) rect(x + 16 + k * 60, base - h + 40, 40, h - 90, { wash: o.lit ? '#ffcf80' : '#7a90a0', washA: 0.9, w: 1.4, col: L });
  for (const cx of (o.chim || [x + w * 0.3, x + w * 0.7])) { rect(cx - 18, base - h - 320, 36, 320, { wash: '#9a5a4a', washA: 1, w: 2.2, col: L }); for (let k = 0; k < 4; k++) pencil([[cx - 18, base - h - 300 + k * 70], [cx + 18, base - h - 300 + k * 70]], { w: 4, col: '#f0e8d8', pass2: false }); smokeCol(cx, base - h - 330, t, { col: 'rgba(80,70,70,0.45)', h: 360, sz: 0.5, n: 6, wind: 120 }); }
  return p;
}
function kirche(x, base, s, t, o = {}) {                                  // кирха Сарепты: белый дом с башенкой, часы, шпиль
  push(x, base, s); const L = VG.ink;
  rect(-260, -260, 520, 260, { wash: '#efe6d4', washA: 1, w: 2.6, col: L, shade: { gap: 12, a: 0.15, col: '#5a4a3a', ang: 1.4 } });
  poly([[-290, -260], [0, -380], [290, -260]], { wash: '#8a3a2a', washA: 1, w: 2.6, col: L, shade: { gap: 9, a: 0.3, col: L, ang: 0.4 } });
  for (const wx of [-200, -110, 110, 200]) { rect(wx - 22, -200, 44, 110, { wash: '#6a8aa0', washA: 1, w: 2, col: L }); ell(wx, -200, 22, 18, { wash: '#6a8aa0', washA: 1, w: 2, col: L }); }
  rect(-60, -130, 120, 130, { wash: '#5a3a24', washA: 1, w: 2.4, col: L });
  rect(-60, -560, 120, 220, { wash: '#efe6d4', washA: 1, w: 2.4, col: L }); ell(0, -480, 34, 34, { wash: '#f6f0e0', washA: 1, w: 2, col: L }); pencil([[0, -480], [0, -504]], { w: 3, col: L, pass2: false }); pencil([[0, -480], [16, -470]], { w: 3, col: L, pass2: false });
  poly([[-70, -560], [0, -760], [70, -560]], { wash: '#3a4a3a', washA: 1, w: 2.4, col: L }); pencil([[0, -760], [0, -820]], { w: 3, col: '#c8a040', pass2: false }); ell(0, -824, 8, 8, { wash: '#e8c050', washA: 1, w: 1.4, col: L });
  pop();
}
function fachwerk(x, base, w, h, t, o = {}) {                            // немецкий дом колонистов: фахверк, черепица, ставни
  const L = VG.ink; rect(x, base - h, w, h, { wash: o.col || '#efe0c4', washA: 1, w: 2.4, col: L });
  for (let k = 0; k <= 4; k++) pencil([[x + k * w / 4, base - h], [x + k * w / 4, base]], { w: 6, col: '#5a3a24', pass2: false });
  pencil([[x, base - h / 2], [x + w, base - h / 2]], { w: 6, col: '#5a3a24', pass2: false }); pencil([[x, base - h], [x + w / 4, base - h / 2]], { w: 5, col: '#5a3a24', pass2: false }); pencil([[x + w, base - h], [x + w * 0.75, base - h / 2]], { w: 5, col: '#5a3a24', pass2: false });
  poly([[x - 20, base - h], [x + w / 2, base - h - h * 0.7], [x + w + 20, base - h]], { wash: o.roof || '#a84a32', washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.3, col: L, ang: 0.2 } });
  for (const k of [0.125, 0.625]) { rect(x + w * k + 6, base - h / 2 + 16, w * 0.15, h * 0.28, { wash: o.lit ? '#ffd080' : '#6a8aa0', washA: 1, w: 1.8, col: L }); }
  if (o.sign) { rect(x + w * 0.2, base - h - 20, w * 0.6, 44, { wash: '#2a1a10', washA: 1, w: 2, col: '#c8a040' }); txt(o.sign, x + w / 2, base - h + 10, 26, { col: '#f2d070', font: 'Osw' }); }
  if (o.chim !== false) { rect(x + w * 0.7, base - h - h * 0.6, 26, 70, { wash: '#8a4a3a', washA: 1, w: 2, col: L }); smokeCol(x + w * 0.7 + 13, base - h - h * 0.6 - 10, t, { col: 'rgba(200,190,180,0.45)', h: 220, sz: 0.3, n: 4 }); }
}
function windmill(x, base, s, t, o = {}) {                               // мельница-шатровка: крылья крутятся
  push(x, base, s); const L = VG.ink;
  poly([[-90, 0], [-60, -360], [60, -360], [90, 0]], { wash: '#8a6a4a', washA: 1, w: 2.4, col: L, shade: { gap: 9, a: 0.3, col: L, ang: 1.57 } });
  poly([[-74, -360], [0, -440], [74, -360]], { wash: '#5a3a24', washA: 1, w: 2.4, col: L }); rect(-26, -110, 52, 110, { wash: '#3a2410', washA: 1, w: 2, col: L });
  const a0 = t * (o.speed ?? 1.2); for (let k = 0; k < 4; k++) { const a = a0 + k * Math.PI / 2; push(0, -380, 1, a); pencil([[0, 0], [0, -330]], { w: 7, col: '#3a2410', pass2: false }); for (let q = 0; q < 6; q++) pencil([[0, -90 - q * 40], [46, -90 - q * 40]], { w: 2, col: '#3a2410', pass2: false }); rect(6, -330, 40, 240, { wash: '#efe2c8', washA: 0.7, w: 1.4, col: L }); pop(); }
  ell(0, -380, 12, 12, { wash: '#2a1a10', washA: 1, w: 1.4, col: L });
  pop();
}
function mustardJar(x, y, s, o = {}) {                                   // банка горчицы с этикеткой
  push(x, y, s); const L = VG.ink;
  blob([[-34, 0], [-38, -70], [-26, -90], [26, -90], [38, -70], [34, 0]], { wash: '#d8b02a', washA: 1, w: 2.2, col: L });
  rect(-30, -104, 60, 18, { wash: '#8a5a2a', washA: 1, w: 2, col: L }); rect(-30, -66, 60, 40, { wash: '#f6ecd6', washA: 1, w: 1.6, col: L }); txt(o.lab || 'ГОРЧИЦА', 0, -42, 12, { col: '#8a2a1a', font: 'Osw' });
  pop();
}
function sareptaField(y0, y1, t, o = {}) {                                // поле цветущей горчицы: жёлтые метёлки
  const r = rng(o.seed || 22040); rect(-900, y0, 2900, y1 - y0, { wash: '#b8a030', washA: 1, line: false });
  for (let i = 0; i < (o.n || 220); i++) { const k = r(), y = y0 + k * k * (y1 - y0), x = -100 + r() * 1300, sz = 3 + k * 9, sw = Math.sin(t * 2 + x * 0.01) * sz * 0.4;
    pencil([[x, y + sz * 3], [x + sw, y]], { w: 1 + k, col: '#6a7a2a', a: 0.8, pass2: false }); ctx.fillStyle = i % 3 ? '#ffe040' : '#f2c020'; ctx.fillRect(x + sw - sz * 0.6, y - sz * 0.6, sz * 1.2, sz * 1.2); }
}
function blackGround(y0, t, o = {}) {                                    // земля 1943: выжженная, воронки, осколки железа
  const L = VG.ink; rect(-900, y0, 2900, 1400, { wash: o.col || '#2a2220', washA: 1, line: false });
  const r = rng(o.seed || 22050);
  for (let i = 0; i < (o.craters || 9); i++) { const x = -100 + r() * 1300, y = y0 + 40 + r() * 600, rx = 60 + r() * 120 * (0.5 + (y - y0) / 600); ell(x, y, rx, rx * 0.28, { wash: '#14100e', washA: 1, w: 2, col: '#4a3a34' }); pencil([[x - rx, y - 4], [x - rx * 0.4, y - rx * 0.16], [x + rx * 0.5, y - rx * 0.18], [x + rx, y - 2]], { w: 3, col: '#5a4a40', a: 0.7, pass2: false }); }
  for (let i = 0; i < (o.shards || 260); i++) { const x = -100 + r() * 1300, y = y0 + r() * 900, l = 3 + r() * 9 * (1 + (y - y0) / 500), a = r() * 3; ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = r() < 0.15 ? '#c8d2dc' : (r() < 0.5 ? '#6a6460' : '#4a3a32'); ctx.fillRect(-l / 2, -l / 6, l, l / 3); ctx.restore(); }
}
function memorialSteps(cx, y0, y1, t, o = {}) {                          // лестница мемориала: ступени-полосы, сужаются к вершине
  const L = VG.ink, n = o.n || 16;
  for (let i = 0; i < n; i++) { const k = i / n, y = lerp(y1, y0, k), wd = lerp(o.w0 || 1300, o.w1 || 300, k), hh = (y1 - y0) / n;
    rect(cx - wd / 2, y - hh, wd, hh, { wash: i % 2 ? '#b8b0a4' : '#a8a094', washA: 1, w: 1.4, col: L, a: 0.7 }); }
}
function poplar(x, y, h, t, o = {}) {                                    // пирамидальный тополь аллеи
  pencil([[x, y], [x, y - h * 0.3]], { w: 8, col: '#3a2a1e', pass2: false });
  const sw = Math.sin(t * 1.5 + x) * 6; blob([[x - h * 0.08, y - h * 0.2], [x - h * 0.1, y - h * 0.6], [x + sw, y - h], [x + h * 0.1, y - h * 0.6], [x + h * 0.08, y - h * 0.2]], { wash: o.col || '#4a6a3a', washA: 1, w: 2, col: VG.ink, shade: { gap: 7, a: 0.3, col: '#1a2a10', ang: 1.2 } });
}
function eternalFlame(x, y, s, t) {                                      // Вечный огонь: звезда-чаша и пламя
  push(x, y, s); const L = VG.ink; ell(0, 0, 120, 26, { wash: '#4a4a4a', washA: 1, w: 2.4, col: L });
  for (let i = 0; i < 7; i++) { const r = rng(hsh(FRAME, i, 22)); blob([[-50 + i * 16, 0], [-44 + i * 16 + r() * 10, -50 - r() * 60], [-36 + i * 16, 0]], { wash: i % 2 ? '#ff7a2a' : '#ffd04a', washA: 1, line: false }); }
  glow(0, -30, 220, 'rgba(255,150,60,1)', 0.7); pop();
}
function sparks(t, box, seed, col = '#ffb060', n = 40) { motes(n, box, col, t, seed, { sp: -120, vx: 60, sz: 3, a: 0.9, wob: 30, add: 1 }); }

/* ===================== 023 Тверь: палитра «лён и зелень, белый камень» и тверские детали ===================== */
const TV = { flax: '#e8dcb8', flaxD: '#b8a47a', linen: '#a8c0d8', linenD: '#5a7a9a', green: '#4a8a5a', greenD: '#1e4a2e', greenL: '#9ac88a',
  stone: '#f0e8d6', stoneD: '#c4b694', stoneS: '#9a8c6e', ink: '#16120c', gold: '#e2b04a', wood: '#8a6440', woodD: '#4a3420', red: '#b0322a', moss: '#6a8a4a' };

function flaxSky(t, o = {}) {                                            // льняное небо: голубой лён → тёплый свет, мягкие облака
  vgrad(o.y0 ?? -900, o.y1 ?? 1250, o.cols || ['#6a8aa8', '#93b0c6', '#bcd0d8', '#e6e2c8', '#f4e6c0'], 1);
  if (o.sun !== false) { const sx = o.sx ?? 880, sy = o.sy ?? 380; glow(sx, sy, 420, 'rgba(255,240,190,1)', 0.45); ell(sx, sy, 60, 60, { wash: '#fff6d8', washA: 1, w: 1.2, col: '#c8a060', a: 0.4 });
    rays(sx, sy, Math.PI / 2 + 0.4, 1.6, 1600, 'rgba(255,244,200,0.5)', o.rays ?? 0.07, 8, t); }
  clouds(t, -500, 5, o.cl1 || '#f6f0e0', (o.seed || 23000) + 1, 0.6); clouds(t, 160, 4, o.cl2 || '#e8e0c8', (o.seed || 23000) + 2, 0.5);
  if (o.birds !== false) birds(t, o.nb || 7, [-100, -200, 1200, 600], (o.seed || 23000) + 4, '#2a2418');
}
function tvGround(y, t, o = {}) {                                        // земля: трава-лён, тропа, кочки, мелкие камни — фактура до низа кадра
  const r = rng(o.seed || 23010);
  const g = shape([[-1300, y], [2400, y - 10], [2400, 2600], [-1300, 2600]], { wash: o.top || '#7a9a52', washA: 1, w: 2, col: TV.ink, line: false });
  ctx.save(); ctx.clip(g.path); const gr = ctx.createLinearGradient(0, y, 0, y + 900); gr.addColorStop(0, o.top || '#7a9a52'); gr.addColorStop(1, o.bot || '#3e5a2a'); ctx.fillStyle = gr; ctx.fillRect(-1300, y, 3700, 1700); ctx.restore();
  hatch(g.path, { x: -400, y, w: 1900, h: 900 }, { ang: 0.15, gap: 16, w: 1.4, col: '#2a3a1a', a: 0.22 });
  if (o.path) shape([[o.path - 60, y], [o.path + 60, y], [o.path + 420, 2600], [o.path - 300, 2600]], { wash: o.pathCol || '#c8b48a', washA: 0.9, w: 1.6, col: '#5a4a2a', a: 0.5, line: false });
  for (let i = 0; i < (o.tufts ?? 40); i++) { const x = -300 + r() * 1700, yy = y + 20 + Math.pow(r(), 0.7) * 900, s = 0.6 + (yy - y) / 600;
    for (let k = -2; k <= 2; k++) pencil([[x + k * 4 * s, yy], [x + k * 9 * s + Math.sin(t * 2 + i) * 3, yy - (16 + r() * 14) * s]], { w: 1.8, col: i % 3 ? '#2e4a1e' : '#c8c070', a: 0.8, pass2: false }); }
  for (let i = 0; i < (o.stones ?? 14); i++) { const x = -200 + r() * 1500, yy = y + 40 + r() * 800; ell(x, yy, 8 + r() * 12, 5 + r() * 6, { wash: '#b8ac90', washA: 1, w: 1.2, col: TV.ink, a: 0.6 }); }
  if (o.flowers) for (let i = 0; i < o.flowers; i++) { const x = -200 + r() * 1500, yy = y + 30 + r() * 700; ell(x, yy, 5, 5, { wash: i % 2 ? '#6a9ad8' : '#f0e8c8', washA: 1, line: false }); }   // голубые цветы льна
}
function izba(x, base, w, h, t, o = {}) {                                // изба/клеть: венцы брёвен, двускатная крыша, окошко, резьба
  const L = TV.ink; rect(x - w / 2, base - h, w, h, { wash: o.col || TV.wood, washA: 1, w: 2.2, col: L });
  for (let k = 1; k < h / 18; k++) pencil([[x - w / 2, base - k * 18], [x + w / 2, base - k * 18]], { w: 1.3, col: '#3a2410', a: 0.55, pass2: false });
  for (const sd of [-1, 1]) for (let k = 0; k < h / 18; k++) ell(x + sd * (w / 2 + 3), base - 9 - k * 18, 5, 8, { wash: '#c8a070', washA: 1, w: 0.8, col: L });
  poly([[x - w / 2 - 22, base - h], [x, base - h - w * 0.45], [x + w / 2 + 22, base - h]], { wash: o.roof || '#6a5a3a', washA: 1, w: 2.2, col: L, shade: { gap: 7, a: 0.35, col: L, ang: 1.2 } });
  pencil([[x - 14, base - h - w * 0.32], [x, base - h - w * 0.45], [x + 14, base - h - w * 0.32]], { w: 3, col: '#e8d8b0', pass2: false });
  rect(x - w * 0.15, base - h * 0.7, w * 0.3, h * 0.28, { wash: o.lit ? '#ffd890' : '#2a1a10', washA: 1, w: 2, col: L }); if (o.lit) glow(x, base - h * 0.56, w * 0.5, 'rgba(255,200,120,1)', 0.35);
  pencil([[x - w * 0.2, base - h * 0.4], [x + w * 0.2, base - h * 0.4]], { w: 3, col: '#e8d8b0', pass2: false });
  if (o.smoke) smokeCol(x + w * 0.3, base - h - w * 0.3, t, { col: 'rgba(230,230,220,0.35)', h: 200, sz: 0.25, n: 3 });
}
function woodTower(x, base, w, h, t, o = {}) {                           // рубленая башня тверского кремля: венцы, бойницы, шатёр
  const L = TV.ink; rect(x - w / 2, base - h, w, h, { wash: o.col || '#8a6440', washA: 1, w: 2.4, col: L });
  for (let k = 0; k < h / 22; k++) pencil([[x - w / 2, base - k * 22], [x + w / 2, base - k * 22]], { w: 1.5, col: '#3a2410', a: 0.55, pass2: false });
  rect(x - w / 2 - 14, base - h - 40, w + 28, 40, { wash: '#7a5434', washA: 1, w: 2.2, col: L }); for (let k = 0; k < 3; k++) rect(x - w / 3 + k * w / 3 - 8, base - h - 30, 16, 20, { wash: '#1a1008', washA: 1, w: 1.2, col: L });
  poly([[x - w / 2 - 20, base - h - 40], [x, base - h - 40 - h * 0.55], [x + w / 2 + 20, base - h - 40]], { wash: o.roof || '#4e6a3a', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.3, col: L, ang: 1.3 } });
  pencil([[x, base - h - 40 - h * 0.55], [x, base - h - 76 - h * 0.55]], { w: 3, col: L, pass2: false });
  if (o.flag) { const wv = Math.sin(t * 5 + x) * 8; shape([[x, base - h - 76 - h * 0.55], [x + 60, base - h - 70 - h * 0.55 + wv], [x, base - h - 50 - h * 0.55]], { wash: o.flag, washA: 1, w: 1.4, col: L }); }
  if (o.gate) { rect(x - w * 0.3, base - h * 0.45, w * 0.6, h * 0.45, { wash: '#2a1a10', washA: 1, w: 2, col: L }); ell(x, base - h * 0.45, w * 0.3, w * 0.2, { wash: '#2a1a10', washA: 1, w: 2, col: L }); }
}
function sobor(x, base, s, t, o = {}) {                                  // белокаменный Спасо-Преображенский собор: куб, закомары, пилястры, аркатурный пояс, шлемовидная глава
  push(x, base, s); const L = TV.ink, st = o.col || TV.stone, b = o.build ?? 1;
  const top = -360 + (1 - b) * 0;
  rect(-230, -360, 460, 360, { wash: st, washA: 1, w: 2.6, col: L, shade: { gap: 9, a: 0.16, col: TV.stoneS, ang: 0.9 } });
  for (const px of [-230, -76, 76, 230]) rect(px - 9, -360, 18, 360, { wash: TV.stoneD, washA: 1, w: 1.4, col: L });   // пилястры-лопатки
  for (const cx of [-153, 0, 153]) { const P = []; for (let k = 0; k <= 12; k++) { const a = Math.PI * k / 12; P.push([cx - 76 * Math.cos(a), -360 - 70 * Math.sin(a)]); } shape(P, { wash: st, washA: 1, w: 2.4, col: L }); pencil(P.map(([px, py]) => [px, py + 10]), { w: 1.4, col: TV.stoneS, a: 0.7, pass2: false }); }
  for (let k = 0; k < 20; k++) { const px = -220 + k * 23; pencil([[px, -190], [px, -170]], { w: 2, col: TV.stoneS, a: 0.8, pass2: false }); pencil(spline([[px, -190], [px + 11, -204], [px + 23, -190]], false, 5), { w: 1.6, col: TV.stoneS, a: 0.8, pass2: false }); }   // аркатурный пояс
  for (const cx of [-153, 0, 153]) { rect(cx - 12, -300, 24, 64, { wash: '#2a2a34', washA: 1, w: 1.6, col: L }); ell(cx, -300, 12, 10, { wash: '#2a2a34', washA: 1, w: 1.6, col: L }); }
  rect(-50, -130, 100, 130, { wash: '#3a2a20', washA: 1, w: 2.4, col: L }); for (let k = 0; k < 3; k++) pencil(ellPts(0, -130, 50 + k * 14, 40 + k * 12, 0, 0.5, 20).filter(([, py]) => py <= -130), { w: 2, col: TV.stoneS, pass2: false });   // перспективный портал
  rect(-70, -560, 140, 130, { wash: st, washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.15, col: TV.stoneS, ang: 0.9 } });   // барабан
  for (let k = 0; k < 4; k++) rect(-54 + k * 34, -530, 14, 50, { wash: '#2a2a34', washA: 1, w: 1.2, col: L });
  blob([[-82, -560], [-86, -620], [-50, -690], [0, -720], [50, -690], [86, -620], [82, -560]], { wash: o.dome || '#c8c8bc', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.3, col: '#5a5a54', ang: 1.1 } });   // шлем
  pencil([[0, -720], [0, -820]], { w: 5, col: TV.gold, pass2: false }); pencil([[-26, -790], [26, -790]], { w: 5, col: TV.gold, pass2: false }); pencil([[-16, -760], [16, -770]], { w: 4, col: TV.gold, pass2: false });
  glow(0, -790, 60, 'rgba(255,220,140,1)', 0.25);
  if (b < 1) {                                                         // стройка: леса закрывают верх
    const cut = -880 * b; ctx.save(); ctx.fillStyle = 'rgba(0,0,0,0)'; ctx.restore();
    for (let k = 0; k < 6; k++) pencil([[-260 + k * 104, 30], [-260 + k * 104, -860]], { w: 5, col: TV.woodD, pass2: false });
    for (let k = 0; k < 9; k++) pencil([[-270, -k * 100], [270, -k * 100]], { w: 4, col: TV.wood, pass2: false });
    for (let k = 0; k < 4; k++) pencil([[-260 + k * 156, -k * 100 - 40], [-104 + k * 156, -k * 100 - 140]], { w: 3, col: TV.woodD, a: 0.8, pass2: false });
  }
  pop();
}
function gramota(x, y, s, t, o = {}) {                                   // грамота-свиток с вислой печатью на шнуре
  push(x, y, s, o.rot || 0); const L = TV.ink, op = o.open ?? 1, h = 40 + 300 * op;
  rect(-150, -h / 2, 300, h, { wash: o.col || '#efe0b8', washA: 1, w: 2.2, col: L, shade: { gap: 10, a: 0.12, col: '#a08a5a', ang: 0.2 } });
  for (const sy of [-1, 1]) { ell(0, sy * h / 2, 168, 18, { wash: '#d8c08a', washA: 1, w: 2, col: L }); }
  if (op > 0.4) for (let k = 0; k < 7; k++) { const yy = -h / 2 + 50 + k * (h - 100) / 7; pencil([[-110, yy], [-110 + 220 * (0.6 + 0.4 * ((k * 37) % 10) / 10), yy]], { w: 3, col: '#5a3a1e', a: 0.8 * clamp((op - 0.4) / 0.4), pass2: false }); }
  if (o.title && op > 0.6) txt(o.title, 0, -h / 2 + 34, o.tsz || 30, { col: '#7a1a12', font: 'Osw' });
  if (o.seal !== false) { pencil([[0, h / 2], [0, h / 2 + 70]], { w: 3, col: '#7a1a12', pass2: false }); seal(0, h / 2 + 100, 42, t, { col: o.sealCol }); }
  pop();
}
function seal(x, y, r, t, o = {}) {                                      // вислая печать: восковой/свинцовый кружок со знаком
  const L = TV.ink; ell(x, y, r, r, { wash: o.col || '#a8302a', washA: 1, w: 2.2, col: L, shade: { gap: 5, a: 0.25, col: '#3a0a08', ang: 0.8 } });
  ell(x, y, r * 0.72, r * 0.72, { line: true, w: 1.6, col: '#3a0a08', a: 0.7 });
  if (o.txt) txt(o.txt, x, y + r * 0.18, r * 0.62, { col: '#f0d8b0', font: 'Osw' });
  else { pencil([[x - r * 0.4, y + r * 0.3], [x, y - r * 0.45], [x + r * 0.4, y + r * 0.3]], { w: 3, col: '#f0c8a0', pass2: false }); pencil([[x - r * 0.3, y + r * 0.05], [x + r * 0.3, y + r * 0.05]], { w: 2.4, col: '#f0c8a0', pass2: false }); }
}
function ladya(x, y, s, t, o = {}) {                                     // ладья: высокий нос с резной головой, прямой парус в полосу, щиты/вёсла
  push(x, y + Math.sin(t * 2 + x) * 5, s, Math.sin(t * 1.4 + x) * 0.025, o.flip || 1); const L = TV.ink;
  blob([[-260, -70], [-200, -30], [200, -30], [270, -80], [300, -150], [250, -60], [200, 20], [-200, 24], [-270, -10], [-300, -110]], { wash: o.col || '#6a4a2a', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.3, col: L, ang: 0 } });
  ell(300, -160, 22, 18, { wash: o.col || '#6a4a2a', washA: 1, w: 2, col: L }); pencil([[318, -164], [336, -160]], { w: 3, col: L, pass2: false });   // резная голова
  pencil([[-220, -30], [220, -34]], { w: 3, col: '#c89a5a', pass2: false });
  if (o.shields !== false) for (let k = 0; k < 6; k++) ell(-180 + k * 72, -44, 22, 22, { wash: k % 2 ? TV.red : TV.stone, washA: 1, w: 1.6, col: L });
  pencil([[0, -40], [0, -420]], { w: 7, col: '#3a2410', pass2: false }); pencil([[-150, -400], [150, -400]], { w: 5, col: '#3a2410', pass2: false });
  if (o.sail !== false) { const bw = Math.sin(t * 2 + x) * 12; const P = [[-150, -400], [150, -400], [160 + bw, -250], [150, -110], [-150, -110], [-160 + bw, -250]];
    const p = shape(P, { wash: o.sailCol || TV.flax, washA: 1, w: 2, col: L }); ctx.save(); ctx.clip(p.path); for (let k = 0; k < 5; k++) { if (k % 2) rect(-150 + k * 60, -410, 60, 320, { wash: o.stripe || TV.red, washA: 0.75, line: false }); } ctx.restore();
    if (o.sym) seal(0, -255, 44, t, { col: o.symCol || TV.gold, txt: o.sym }); }
  if (o.oars !== false) for (let k = 0; k < 6; k++) { const ox = -190 + k * 74, a = Math.sin(t * 4 + k) * 0.3; pencil([[ox, -30], [ox - 40 + Math.cos(a) * 20, 70 + Math.sin(a) * 30]], { w: 3.4, col: '#5a3a1e', pass2: false }); }
  if (o.crew) for (let k = 0; k < 4; k++) { const ox = -150 + k * 90; ell(ox, -86, 12, 13, { wash: '#c89a78', washA: 1, w: 1.2, col: L }); blob([[ox - 15, -56], [ox - 13, -74], [ox + 13, -74], [ox + 15, -56]], { wash: ['#3a5a8a', '#b0322a', '#e8dcb8', '#4a6a3a'][k], washA: 1, w: 1.2, col: L }); }
  pop();
}
function rider(x, y, s, t, o = {}) {                                     // всадник: лошадь + фигура в седле (ордынец/дружинник), копьё/знамя
  horse(x, y, s, t, { col: o.horseCol || '#5a3a20', flip: o.flip || 1, walk: o.walk ?? 1, saddle: 1 });
  const fl = o.flip || 1; push(x + fl * 10 * s, y - 150 * s, s * 0.9, 0, fl); const L = TV.ink, c = o.col || '#6a3a2a';
  blob([[-34, 0], [-38, -90], [-20, -120], [20, -120], [38, -90], [34, 0]], { wash: c, washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.25, col: L, ang: 0.6 } });
  ell(0, -146, 24, 26, { wash: o.skin || '#c8946a', washA: 1, w: 1.8, col: L });
  if (o.hat === 'helmet') { blob([[-26, -150], [-22, -176], [0, -200], [22, -176], [26, -150]], { wash: '#8a8a8a', washA: 1, w: 1.8, col: L }); pencil([[0, -200], [0, -222]], { w: 3, col: L, pass2: false }); }
  else blob([[-30, -146], [-26, -172], [0, -184], [26, -172], [30, -146]], { wash: o.hatCol || '#5a3a20', washA: 1, w: 1.8, col: L });
  if (o.spear) { pencil([[24, 0], [40, -320]], { w: 4, col: '#3a2410', pass2: false }); poly([[34, -320], [42, -360], [48, -318]], { wash: '#c8c8c8', washA: 1, w: 1.4, col: L });
    if (o.banner) { const wv = Math.sin(t * 6 + x) * 10; shape([[40, -320], [140, -300 + wv], [40, -250]], { wash: o.banner, washA: 1, w: 1.6, col: L }); } }
  pop();
}
function scoreHud(t, tv, mo, o = {}) {                                   // табло спора «ТВЕРЬ : МОСКВА» (экранные координаты), смена счёта — поп
  const x = o.x ?? 760, y = o.y ?? 760, k = o.t0 !== undefined ? popK(t, o.t0, 0.35) : 1, a = o.a ?? 1;
  push(x, y, 0.82 + 0.18 * k, -0.03);
  rect(-210, -54, 420, 108, { wash: '#16120c', washA: 0.86 * a, w: 3, col: TV.flax, a });
  txt('ТВЕРЬ', -120, -18, 30, { col: TV.greenL, font: 'Osw', a }); txt('МОСКВА', 120, -18, 30, { col: '#e8a090', font: 'Osw', a });
  txt(String(tv), -120, 34, 54, { col: '#f6ecd6', font: 'Osw', a }); txt(':', 0, 28, 54, { col: TV.flax, font: 'Osw', a }); txt(String(mo), 120, 34, 54, { col: '#f6ecd6', font: 'Osw', a });
  if (o.t0 !== undefined && t - o.t0 < 0.5) glow(o.side < 0 ? -120 : 120, 20, 90, 'rgba(255,230,160,1)', 0.6 * (1 - (t - o.t0) / 0.5));
  pop();
}
