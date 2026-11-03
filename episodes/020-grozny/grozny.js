/* 020 Грозный — общие детали города: Кавказский хребет, Сунжа, крепость Грозная (вал, частокол, бастион, пушки), нефтяные вышки и фонтан,
   резервуары и факел НПЗ, панельные дома (целые и руины), Грозный-Сити, мечеть с четырьмя минаретами, люди Кавказа, предметы быта.
   Палитра выпуска: нефтяной чёрный + янтарь, горный синий. */
const GZ = { oil: '#14100c', oilL: '#3a2c1e', amber: '#e8a23a', amberL: '#ffd27a', blue: '#3a5a8a', blueD: '#1a2a4a', blueL: '#8ab0d8', ink: '#120c08' };

function caucasus(y, t, o = {}) {                                      // Кавказский хребет: зубцы с ледниками, синие тени, дымка у подножия
  const r = rng(20100 + (o.seed || 1)), col = o.col || GZ.blue, colD = o.colD || GZ.blueD, snow = o.snow || '#eef2f8', h = o.h || 420;
  const P = [[-900, y + 200]]; const peaks = [];
  for (let x = -900; x <= 2000; x += 60) { const n = Math.abs(Math.sin(x * 0.0042 + (o.seed || 1))) * 0.7 + Math.abs(Math.sin(x * 0.011 + 2)) * 0.3, yy = y - n * h - r() * 24; P.push([x, yy]); if (n > 0.72) peaks.push([x, yy]); }
  P.push([2000, y + 200]);
  const m = shape(P, { wash: col, washA: o.a ?? 1, w: 1.8, col: colD, a: 0.5 }); shadeG(m.path, 0, y - h, 0, y + 100, colD, 0.4);
  hatch(m.path, m.bb, { gap: 12, a: 0.12, col: colD, ang: 1.0, w: 1 });
  for (let i = 1; i < P.length - 1; i++) { const [x, yy] = P[i]; if (yy < y - h * 0.45) { const d = (y - h * 0.45 - yy) * 0.9; poly([[x - d * 0.7, yy + d], [x, yy], [x + d * 0.5, yy + d * 0.8], [x + d * 0.1, yy + d * 0.55]], { wash: snow, washA: (o.a ?? 1) * 0.92, w: 1.2, col: colD, a: 0.35 }); } }
  if (o.lit) for (const [x, yy] of peaks) pencil([[x - 30, yy + 24], [x, yy], [x + 20, yy + 14]], { w: 4, col: o.lit, a: 0.7, pass2: false, gap: false });
  return m;
}
function foothills(y, t, col, colD, seed = 1, amp = 120) {             // лесистые предгорья: мягкие холмы с пятнами леса
  const P = [[-900, y + 400]]; for (let x = -900; x <= 2000; x += 40) P.push([x, y - Math.abs(Math.sin(x * 0.003 + seed)) * amp - Math.sin(x * 0.013 + seed * 2) * amp * 0.2]); P.push([2000, y + 400]);
  const m = shape(P, { wash: col, washA: 1, w: 1.6, col: colD, a: 0.5 }); hatch(m.path, m.bb, { gap: 9, a: 0.16, col: colD, ang: 0.8, w: 1 });
  const r = rng(20200 + seed); for (let k = 0; k < 40; k++) { const x = -800 + r() * 2700, yy = y - Math.abs(Math.sin(x * 0.003 + seed)) * amp * 0.9 + 20 + r() * 80; ell(x, yy, 20 + r() * 30, 12 + r() * 14, { wash: colD, washA: 0.5, line: false }); }
}
function sunzha(y0, y1, t, o = {}) {                                    // Сунжа: быстрая мутная вода, блики, рябь; o.oil — радужная плёнка, o.fire — отражение огня
  const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, o.top || '#4a5a6a'); g.addColorStop(1, o.bot || '#2a3038'); ctx.fillStyle = g; ctx.fillRect(-900, y0, 2900, y1 - y0);
  for (let k = 0; k < 26; k++) { const f = k / 26, yy = y0 + (y1 - y0) * f * f, ph = (t * (0.6 + f) + k * 0.37) % 1; pencil([[-200 + ph * 300 + (k % 4) * 260, yy], [-60 + ph * 300 + (k % 4) * 260 + f * 160, yy + 2]], { w: 1.4 + f * 3, col: o.glint || '#c8d8e8', a: 0.35 + 0.3 * f, pass2: false, gap: false });
    pencil([[600 + ph * 260 - (k % 3) * 220, yy + 4], [700 + ph * 260 - (k % 3) * 220 + f * 140, yy + 5]], { w: 1.2 + f * 2.4, col: o.glint || '#c8d8e8', a: 0.25 + 0.25 * f, pass2: false, gap: false }); }
  if (o.oil) for (let k = 0; k < 6; k++) { const x = 100 + k * 170 + Math.sin(t + k) * 20, yy = y0 + 30 + (k % 3) * 40; ell(x, yy, 90, 14, { wash: ['#8a4aa8', '#3a8a8a', '#c8a03a'][k % 3], washA: 0.25 * o.oil, line: false }); }
  if (o.fire) { glow(540, y0 + 20, 500, o.fire, 0.35); for (let k = 0; k < 10; k++) pencil([[300 + k * 50, y0 + 10 + k * 6], [360 + k * 50, y0 + 12 + k * 6]], { w: 4, col: '#ffb050', a: 0.5, pass2: false, gap: false }); }
}
function earthBank(y, t, o = {}) {                                     // глинистый берег: обрыв, трава, камни, следы
  const P = [[-900, y]]; for (let x = -900; x <= 2000; x += 50) P.push([x, y - Math.sin(x * 0.01 + (o.seed || 0)) * 10]); P.push([2000, y + 900], [-900, y + 900]);
  const b = shape(P, { wash: o.col || '#8a6a46', washA: 1, w: 2, col: '#2a1a0c', a: 0.6 }); hatch(b.path, b.bb, { gap: 10, a: 0.18, col: '#3a2412', ang: 0.3, w: 1.2 });
  const r = rng(20300 + (o.seed || 0));
  for (let k = 0; k < 50; k++) { const x = -300 + r() * 1700, yy = y + 10 + r() * 600; if (r() < 0.5) pencil([[x, yy], [x - 6, yy - 18 - r() * 18]], { w: 2, col: o.grass || '#6a7a3a', a: 0.8, pass2: false }), pencil([[x + 4, yy], [x + 10, yy - 14 - r() * 14]], { w: 2, col: o.grass || '#6a7a3a', a: 0.8, pass2: false });
    else ell(x, yy, 6 + r() * 12, 4 + r() * 6, { wash: o.stone || '#a89a84', washA: 1, w: 1.2, col: '#3a2a1a', a: 0.5 }); }
}
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
function derrick(x, y, s, t, o = {}) {                                   // деревянная нефтяная вышка XIX в.: усечённая пирамида, раскосы, полати, «фонарь» наверху
  push(x, y, s); const L = '#140c06', wd = o.wood || '#4a2e16', H = 520, b = 120, tp = 34, lw = o.lw || 1;
  for (const sd of [-1, 1]) pencil([[sd * b, 0], [sd * tp, -H]], { w: 14 * lw, col: wd, pass2: false });
  for (let k = 0; k < 7; k++) { const f0 = k / 7, f1 = (k + 1) / 7, w0 = lerp(b, tp, f0), w1 = lerp(b, tp, f1); pencil([[-w0, -H * f0], [w1, -H * f1]], { w: 6 * lw, col: wd, a: 0.9, pass2: false }); pencil([[w0, -H * f0], [-w1, -H * f1]], { w: 6 * lw, col: wd, a: 0.9, pass2: false }); pencil([[-w1, -H * f1], [w1, -H * f1]], { w: 8 * lw, col: wd, pass2: false }); }
  rect(-tp - 16, -H - 40, tp * 2 + 32, 40, { wash: '#4a3420', washA: 1, w: 2, col: L }); pencil([[-tp - 24, -H - 40], [tp + 24, -H - 40]], { w: 6, col: L, pass2: false });
  const sh = rect(-b - 90, -120, 90, 120, { wash: '#7a5a3a', washA: 1, w: 2, col: L }); hatch(sh.path, sh.bb, { gap: 9, a: 0.3, col: '#2a1808', ang: 0, w: 1.2 }); poly([[-b - 100, -120], [-b - 45, -160], [-b + 10, -120]], { wash: '#4a3020', washA: 1, w: 2, col: L });   // будка-котельная
  if (o.soak) { const p = shape([[-b, 0], [-tp, -H], [tp, -H], [b, 0]], { line: false }); wash(p.path, '#120a04', 0.35 * o.soak); }
  pop();
}
function gusher(x, y, h, t, k, o = {}) {                                 // фонтан нефти: чёрный столб, грибовидная шапка, брызги, дождь капель
  if (k <= 0) return; const hh = h * sm(clamp(k * 1.6)), r = rng(hsh(FRAME, 2041));
  ctx.save(); const P = []; for (let q = 0; q <= 12; q++) { const f = q / 12, w = 26 + f * 70 + Math.sin(t * 20 + q) * 10; P.push([x - w, y - hh * f]); } for (let q = 12; q >= 0; q--) { const f = q / 12, w = 26 + f * 70 + Math.cos(t * 18 + q) * 10; P.push([x + w, y - hh * f]); }
  shape(P, { wash: GZ.oil, washA: 1, w: 2, col: '#000', a: 0.6 }); pencil([[x - 8, y], [x - 14, y - hh]], { w: 3, col: o.rim || '#c88a3a', a: 0.6, pass2: false, gap: false });
  const cap = y - hh; for (let q = 0; q < 14; q++) { const a = -Math.PI + q / 13 * Math.PI, d = 150 + 80 * Math.sin(t * 6 + q); blob([[x + Math.cos(a) * d * 0.4, cap + Math.sin(a) * 30], [x + Math.cos(a) * d, cap + Math.sin(a) * d * 0.5], [x + Math.cos(a) * d * 1.3, cap + 40 + q * 2], [x + Math.cos(a) * d * 0.8, cap + 50]], { wash: '#1a120a', washA: 0.95, w: 1.4, col: '#000', a: 0.5 }); }
  for (let i = 0; i < 70; i++) { const ph = (t * 0.9 + r() ) % 1, sx = x + (r() - 0.5) * 520 * (0.3 + ph), sy = cap + ph * (hh + 200) * (0.6 + r() * 0.6); ctx.fillStyle = '#120a04'; ctx.globalAlpha = 0.85; ctx.fillRect(sx, sy, 4 + r() * 4, 10 + r() * 16); }
  ctx.restore(); ctx.globalAlpha = 1;
  glow(x, cap, 200, 'rgba(255,200,120,1)', 0.12);
}
function tank(x, y, w, h, t, o = {}) {                                   // цилиндрический резервуар с лестницей
  const L = '#120c08', c = o.col || '#8a8478'; const b = rect(x - w / 2, y - h, w, h, { wash: c, washA: 1, w: 2, col: L }); shadeG(b.path, x - w / 2, 0, x + w / 2, 0, '#000000', 0.45);
  ell(x, y - h, w / 2, w * 0.09, { wash: lerpC(c, '#ffffff', 0.25), washA: 1, w: 2, col: L }); for (let k = 1; k < 4; k++) pencil([[x - w / 2, y - h * k / 4], [x + w / 2, y - h * k / 4]], { w: 1.6, col: L, a: 0.35, pass2: false });
  pencil([[x + w * 0.3, y], [x + w * 0.05, y - h]], { w: 2.4, col: L, a: 0.7, pass2: false }); if (o.txt) txt(o.txt, x, y - h * 0.5, Math.min(40, w / 5), { col: '#2a1a0a', font: 'Osw', a: 0.7 });
}
function flare(x, y, h, t, o = {}) {                                     // факельная труба: высокий ствол, пляшущее пламя
  pencil([[x, y], [x, y - h]], { w: 14, col: '#3a3430', pass2: false }); for (let k = 1; k < 6; k++) pencil([[x - 10, y - h * k / 6], [x + 10, y - h * k / 6]], { w: 3, col: '#c83a2a', pass2: false });
  const r = rng(hsh(FRAME, x)); const fh = 90 + r() * 40; blob([[x - 20, y - h], [x - 30 + r() * 10, y - h - fh * 0.5], [x + r() * 20 - 10, y - h - fh], [x + 26, y - h - fh * 0.45], [x + 18, y - h]], { wash: '#ff9a2a', washA: 0.95, w: 1.4, col: '#a83a0a', a: 0.6 });
  blob([[x - 8, y - h], [x - 10, y - h - fh * 0.4], [x + 4, y - h - fh * 0.65], [x + 12, y - h - fh * 0.3], [x + 8, y - h]], { wash: '#fff0a0', washA: 0.95, line: false }); glow(x, y - h - 40, 260, 'rgba(255,170,70,1)', 0.5);
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
function rubble(x0, x1, y, t, o = {}) {                                  // груды обломков: плиты, кирпич, арматура
  const r = rng(20600 + (o.seed || 0));
  for (let k = 0; k < (o.n || 30); k++) { const x = x0 + r() * (x1 - x0), yy = y + r() * (o.dy || 60), s = 20 + r() * 50;
    poly([[x - s, yy], [x - s * 0.6, yy - s * 0.5], [x + s * 0.4, yy - s * 0.6], [x + s, yy - s * 0.1], [x + s * 0.6, yy]], { wash: lerpC(o.col || '#8a8278', '#4a4038', r() * 0.6), washA: 1, w: 1.6, col: '#1a120c', a: 0.6 });
    if (r() < 0.3) pencil([[x, yy - s * 0.4], [x + (r() - 0.5) * 60, yy - s * 0.4 - 40 - r() * 30]], { w: 2.4, col: '#4a3a2a', a: 0.8, pass2: false }); }
}
function gtower(x, base, w, h, t, o = {}) {                              // башня Грозный-Сити: стекло, вертикальные рёбра, косой срез наверху, LED-подсветка
  const L = '#0a0a12', top = base - h, cut = o.cut ?? 0.12;
  const P = [[x, base], [x, top + h * cut], [x + w * 0.5, top], [x + w, top + h * cut * 0.4], [x + w, base]];
  const b = shape(P, { wash: o.col || '#3a5a7a', washA: 1, w: 2, col: L, a: 0.8 }); const g = ctx.createLinearGradient(x, top, x + w, base); g.addColorStop(0, o.colL || '#8ab4d8'); g.addColorStop(1, 'rgba(10,20,40,0)'); ctx.save(); ctx.clip(b.path); ctx.globalAlpha = 0.5; ctx.fillStyle = g; ctx.fillRect(x, top, w, h); ctx.globalAlpha = 1;
  for (let q = 1; q < 8; q++) pencil([[x + w * q / 8, base], [x + w * q / 8, top]], { w: 1.4, col: L, a: 0.4, pass2: false });
  for (let f = 0; f < h; f += 26) pencil([[x, base - f], [x + w, base - f]], { w: 1, col: L, a: 0.18, pass2: false });
  windows(x + 4, top + h * 0.2, w - 8, h * 0.78, 6, Math.round(h / 34), o.seed || 1, o.on ?? 0.35, '#ffe0a0', '#bfe0ff', 0.7);
  if (o.led) { const ph = (t * 0.3 + (o.seed || 0) * 0.17) % 1; ctx.globalAlpha = 0.5; ctx.fillStyle = o.led; ctx.fillRect(x, base - h * ph, w, 30); ctx.globalAlpha = 1; }
  ctx.restore(); if (o.led) pencil([[x, top + h * cut], [x + w * 0.5, top], [x + w, top + h * cut * 0.4]], { w: 5, col: o.led, a: 0.9, pass2: false, gap: false });
}
function gcity(x, base, s, t, o = {}) {                                  // комплекс «Грозный-Сити»: пять башен разной высоты
  push(x, base, s); const T = [[-330, 150, 560, 21], [-160, 170, 800, 22], [30, 200, 1000, 23], [250, 160, 700, 24], [430, 130, 480, 25]];
  for (const [tx, tw, th, sd] of T) gtower(tx, 0, tw, th, t, { seed: sd, led: o.led, on: o.on, col: o.col, colL: o.colL });
  pop();
}
function mosque(x, base, s, t, o = {}) {                                 // мечеть с центральным куполом и четырьмя тонкими минаретами (силуэт «Сердце Чечни»)
  push(x, base, s); const L = '#1a140e', wcol = o.col || '#efe8da', gold = '#e8b84a';
  for (const mx of [-330, -250, 250, 330]) { const mh = mx * mx > 70000 ? 640 : 600; const m = rect(mx - 14, -mh, 28, mh, { wash: wcol, washA: 1, w: 1.8, col: L }); shadeG(m.path, mx - 14, 0, mx + 14, 0, '#8a7a60', 0.4);
    for (const f of [0.45, 0.75]) { rect(mx - 22, -mh * f - 12, 44, 14, { wash: wcol, washA: 1, w: 1.6, col: L }); } poly([[mx - 16, -mh], [mx, -mh - 90], [mx + 16, -mh]], { wash: '#8aa8c0', washA: 1, w: 1.6, col: L }); pencil([[mx, -mh - 90], [mx, -mh - 116]], { w: 2.4, col: gold, pass2: false }); ell(mx, -mh - 120, 6, 6, { wash: gold, washA: 1, line: false });
    if (o.lit) glow(mx, -mh * 0.75, 60, 'rgba(255,230,170,1)', 0.35 * o.lit); }
  const body = rect(-230, -230, 460, 230, { wash: wcol, washA: 1, w: 2, col: L }); shadeG(body.path, -230, 0, 230, 0, '#9a8a70', 0.35);
  for (let q = -3; q <= 3; q++) { const ax = q * 60; shape([[ax - 22, -20], [ax - 22, -130], [ax, -160], [ax + 22, -130], [ax + 22, -20]], { wash: o.lit ? '#ffd890' : '#6a7a8a', washA: 1, w: 1.4, col: L, a: 0.7 }); }
  const d = blob([[-170, -230], [-160, -330], [-90, -410], [0, -430], [90, -410], [160, -330], [170, -230]], { wash: '#8ab0cc', washA: 1, w: 2, col: L }); shadeG(d.path, -170, 0, 170, 0, '#3a5a7a', 0.45); for (let q = -2; q <= 2; q++) pencil([[q * 60, -232], [q * 22, -420]], { w: 1.4, col: '#e8f0f8', a: 0.5, pass2: false });
  rect(-180, -250, 360, 22, { wash: gold, washA: 1, w: 1.4, col: L }); pencil([[0, -430], [0, -480]], { w: 3, col: gold, pass2: false }); ell(0, -486, 8, 8, { wash: gold, washA: 1, line: false });
  if (o.lit) glow(0, -200, 420, 'rgba(255,220,150,1)', 0.25 * o.lit);
  pop();
}
function gman(x, y, s, t, o = {}) {                                     // человек Кавказа на базе human(): папаха/фуражка/платок, черкеска с газырями
  human(x, y, s, t, Object.assign({ body: '#3a3428', legs: '#2a2420', hat: 'fur', hatCol: '#2a221a', beard: 1, seed: 1 }, o));
  if (o.gazyri) { push(x, y, s, 0, o.flip || 1); for (const sd of [-1, 1]) for (let q = 0; q < 4; q++) rect(sd * 22 - 5, -212 + q * 12, 10, 8, { wash: '#d8c8a0', washA: 1, w: 1, col: '#1a120a' }); pop(); }
}
function soldier1818(x, y, s, t, o = {}) {                              // солдат 1818: тёмно-зелёный мундир, белая перевязь, кивер, ружьё/лопата
  human(x, y, s, t, Object.assign({ body: '#2e4a36', legs: '#d8d0bc', hat: 'merchant', hatCol: '#1a1a1a', belt: '#e8e2d0', seed: 3 }, o));
  push(x, y, s, 0, o.flip || 1); pencil([[-40, -230], [40, -130]], { w: 6, col: '#ece6d4', pass2: false }); pop();
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
