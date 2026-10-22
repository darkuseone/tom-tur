/* 010 Петербург — общие детали города: spire — шпиль Петропавловского собора с ангелом; smolny — Смольный собор; winterPalace — фасад Зимнего;
   embank — гранитная набережная с фонарями; neva — вода с бликами и рябью; facade — петербургский дом (жёлтый/розовый/зелёный, пилястры);
   aurora — крейсер «Аврора»; swedeFort — деревянная шведская крепость с флагом; sweFlag — шведский флаг; sailship — парусник XVIII в. */

const PT = { granite: '#8a6a62', graniteD: '#4a3a36', water: '#3a5a72', waterL: '#8ab0c8', gold: '#e2b84a', green: '#4a8a6a', yellow: '#e8c878', pink: '#e8a89a', white: '#f2ece0' };

function sweFlag(x, y, s, t, k = 0) {                                   // шведский флаг: синий, жёлтый крест, на ветру
  push(x, y, s); pencil([[0, 0], [0, -220]], { w: 6, col: '#4a3a2a' }); ell(0, -224, 6, 6, { wash: PT.gold, washA: 1, w: 1.2, col: '#6a4a08' });
  const P = []; for (let q = 0; q <= 10; q++) P.push([q * 14, -216 + Math.sin(t * 5 + q * 0.6 + k) * 6 * q / 10]); for (let q = 10; q >= 0; q--) P.push([q * 14, -146 + Math.sin(t * 5 + q * 0.6 + k) * 6 * q / 10]);
  const fp = shape(P, { wash: '#2a5aa8', washA: 1, w: 1.6, col: '#0a1a3a', a: 0.7 });
  ctx.save(); ctx.clip(fp.path); ctx.fillStyle = '#f2c81e'; ctx.fillRect(36, -230, 14, 100); ctx.fillRect(-10, -190, 170, 14); ctx.restore();
  pop();
}

function swedeFort(x, base, s, t, o = {}) {                             // деревянная крепость: частокол, башни, ров, шведский флаг; o.burn 0..1 — горит
  push(x, base, s); const wood = o.ghost ? '#cfd8e0' : '#7a5a3a', woodD = o.ghost ? '#8a9aa8' : '#3a2412';
  shape([[-420, 0], [-380, -60], [380, -60], [420, 0]], { wash: o.ghost ? '#b8c4cc' : '#6a7a4a', washA: 1, w: 2, col: '#1a1a10', a: 0.6 });
  for (let x0 = -360; x0 <= 360; x0 += 18) { const h = 150 + Math.sin(x0) * 8; pencil([[x0, -60], [x0, -60 - h]], { w: 14, col: wood }); poly([[x0 - 7, -60 - h], [x0 + 7, -60 - h], [x0, -60 - h - 16]], { wash: wood, washA: 1, w: 1, col: woodD }); }
  pencil([[-370, -110], [370, -110]], { w: 5, col: woodD, a: 0.7, pass2: false });
  for (const tx of [-300, 0, 300]) { const tw = tx ? 90 : 120, th = tx ? 260 : 340; const tp = rect(tx - tw / 2, -60 - th, tw, th, { wash: wood, washA: 1, w: 2.4, col: woodD });
    hatch(tp.path, tp.bb, { gap: 8, a: 0.3, col: woodD, ang: 0, w: 1.2 }); poly([[tx - tw / 2 - 16, -60 - th], [tx + tw / 2 + 16, -60 - th], [tx, -60 - th - 90]], { wash: o.ghost ? '#9aa8b4' : '#4a3020', washA: 1, w: 2, col: woodD });
    for (let k = 0; k < 2; k++) rect(tx - 10, -60 - th + 40 + k * 70, 20, 30, { wash: '#1a1410', washA: 1, w: 1, col: '#000' }); }
  sweFlag(0, -60 - 340 - 90, 1, t);
  if (o.burn) { for (let k = 0; k < 9; k++) { const fx = -340 + k * 85, fh = (120 + Math.sin(t * 9 + k) * 30) * o.burn; blob([[fx - 30, -150], [fx - 10, -150 - fh * 0.6], [fx, -150 - fh], [fx + 12, -150 - fh * 0.5], [fx + 30, -150]], { wash: '#ff9a2a', washA: 0.9, line: false }); blob([[fx - 14, -150], [fx, -150 - fh * 0.6], [fx + 14, -150]], { wash: '#fff2a0', washA: 0.9, line: false }); glow(fx, -200, 140, 'rgba(255,140,50,1)', 0.35 * o.burn); }
    for (let k = 0; k < 5; k++) { const ph = (t * 0.4 + k / 5) % 1; ell(-200 + k * 100 + ph * 80, -350 - ph * 500, 60 + ph * 140, 40 + ph * 90, { wash: '#3a3430', washA: 0.5 * (1 - ph) * o.burn, line: false }); } }
  pop();
}

function spire(x, base, s, t, o = {}) {                                 // Петропавловский собор: колокольня, золотой шпиль, ангел с крестом
  push(x, base, s);
  const bt = rect(-60, -300, 120, 300, { wash: o.col || '#e8b8a8', washA: 1, w: 2, col: '#3a2a20' }); shadeG(bt.path, 60, 0, -60, 0, '#a8706a', 0.4);
  for (let k = 0; k < 3; k++) { rect(-62, -300 + k * 100, 124, 10, { wash: '#f6f0e6', washA: 1, w: 1, col: '#3a2a20' }); rect(-14, -270 + k * 100, 28, 56, { wash: '#2a3a4a', washA: 1, w: 1.2, col: '#1a1a1a' }); }
  rect(-46, -400, 92, 100, { wash: o.col || '#e8b8a8', washA: 1, w: 2, col: '#3a2a20' }); rect(-30, -460, 60, 60, { wash: o.col || '#e8b8a8', washA: 1, w: 2, col: '#3a2a20' });
  const sp = shape([[-30, -460], [30, -460], [4, -1040], [-4, -1040]], { wash: o.cover ? '#7a7a80' : PT.gold, washA: 1, w: 2, col: o.cover ? '#2a2a30' : '#6a4a08' }); if (!o.cover) metalG(sp.path, 10, -700, 300, '#fff2b0', PT.gold, '#7a5414'); else hatch(sp.path, sp.bb, { gap: 6, a: 0.3, col: '#3a3a40', ang: 0.4, w: 1 });   // cover — маскировочный чехол (блокада)
  pencil([[0, -1040], [0, -1080]], { w: 3, col: '#6a4a08', pass2: false });
  if (!o.cover) { push(0, -1090, 1, Math.sin(t * 0.8) * 0.1); ell(0, 0, 8, 12, { wash: PT.gold, washA: 1, w: 1, col: '#6a4a08' }); for (const sd of [-1, 1]) blob([[0, -4], [sd * 26, -16], [sd * 22, 4]], { wash: PT.gold, washA: 1, w: 1, col: '#6a4a08' });
  pencil([[0, -10], [0, -46]], { w: 3, col: PT.gold, pass2: false }); pencil([[-10, -36], [10, -36]], { w: 3, col: PT.gold, pass2: false }); pop(); }
  if (o.glow) glow(0, -700, 260, 'rgba(255,220,140,1)', 0.35 * o.glow);
  pop();
}

function smolny(x, base, s, t, o = {}) {                                // Смольный собор: голубой с белым, широкий барочный объём, большой купол-шлем + 4 башни с главками
  push(x, base, s); const B = o.col || '#7aaad6', W2 = '#f6f2ea', G = PT.gold;
  const cup = (dx, dy, r) => { const d = shape(ellPts(dx, dy, r, r * 1.15, 0, 0, 28).filter(p => p[1] <= dy).sort((a, b) => a[0] - b[0]), { wash: B, washA: 1, w: 2, col: '#2a3a4a' }); shadeG(d.path, dx + r, 0, dx - r, 0, '#3a5a7a', 0.45);
    for (let q = -2; q <= 2; q++) pencil(spline([[dx + q * r * 0.36, dy], [dx + q * r * 0.24, dy - r * 0.7], [dx, dy - r * 1.12]], false, 8), { w: 2.4, col: W2, a: 0.8, pass2: false });
    const k = blob([[dx - r * 0.22, dy - r * 1.1], [dx - r * 0.3, dy - r * 1.35], [dx, dy - r * 1.75], [dx + r * 0.3, dy - r * 1.35], [dx + r * 0.22, dy - r * 1.1]], { wash: G, washA: 1, w: 1.6, col: '#6a4a08' }); metalG(k.path, dx - r * 0.1, dy - r * 1.4, r * 0.5, '#fff2b0', G, '#7a5414');
    pencil([[dx, dy - r * 1.75], [dx, dy - r * 2.1]], { w: 3, col: G, pass2: false }); pencil([[dx - r * 0.12, dy - r * 1.98], [dx + r * 0.12, dy - r * 1.98]], { w: 3, col: G, pass2: false }); };
  const body = rect(-260, -230, 520, 230, { wash: B, washA: 1, w: 2.4, col: '#2a3a4a' }); shadeG(body.path, 260, 0, -260, 0, '#3a5a7a', 0.4);
  for (let k = 0; k < 9; k++) { const cx = -240 + k * 60; pencil([[cx, -230], [cx, 0]], { w: 8, col: W2, a: 0.95, pass2: false }); }
  for (let k = 0; k < 8; k++) { const wx = -222 + k * 60; rect(wx, -170, 26, 70, { wash: '#2a3a4a', washA: 1, w: 1.2, col: '#1a1a1a' }); pencil([[wx - 4, -176], [wx + 13, -186], [wx + 30, -176]], { w: 3, col: W2, pass2: false }); }
  pencil([[-270, -230], [270, -230]], { w: 8, col: W2, pass2: false }); pencil([[-270, -110], [270, -110]], { w: 4, col: W2, pass2: false });
  poly([[-120, -230], [120, -230], [0, -300]], { wash: B, washA: 1, w: 2, col: '#2a3a4a' }); pencil([[-110, -236], [0, -294], [110, -236]], { w: 5, col: W2, pass2: false });
  const dr = rect(-110, -440, 220, 150, { wash: B, washA: 1, w: 2, col: '#2a3a4a' }); for (let k = 0; k < 5; k++) { pencil([[-100 + k * 50, -440], [-100 + k * 50, -290]], { w: 6, col: W2, pass2: false }); rect(-88 + k * 50, -410, 24, 70, { wash: '#2a3a4a', washA: 1, w: 1, col: '#1a1a1a' }); }
  cup(0, -440, 140);
  for (const sd of [-1, 1]) { const tx = sd * 210; rect(tx - 34, -340, 68, 110, { wash: B, washA: 1, w: 1.8, col: '#2a3a4a' }); pencil([[tx - 26, -340], [tx - 26, -230]], { w: 4, col: W2, pass2: false }); pencil([[tx + 26, -340], [tx + 26, -230]], { w: 4, col: W2, pass2: false }); cup(tx, -340, 40); }
  if (o.lit) glow(0, -300, 380, 'rgba(255,230,170,1)', 0.3 * o.lit);
  pop();
}

function facade(x, base, w, h, col, t, o = {}) {                         // петербургский дом: штукатурка, пилястры, карнизы, наличники, окна
  const fp = rect(x, base - h, w, h, { wash: col, washA: 1, w: 2, col: '#2a2420', a: 0.8, key: o.key }); shadeG(fp.path, x + w, 0, x, 0, lerpC(col, '#000000', 0.35), 0.35);
  const fl = Math.max(2, Math.round(h / 110)), cols = Math.max(2, Math.round(w / 70)), fh = h / fl, cw = w / cols;
  for (let j = 0; j < fl; j++) { const y = base - h + j * fh; pencil([[x, y], [x + w, y]], { w: j ? 3 : 7, col: '#f6f0e6', a: 0.8, pass2: false });
    for (let i = 0; i < cols; i++) { const wx = x + i * cw + cw * 0.25, wy = y + fh * 0.25, ww = cw * 0.5, wh = fh * 0.55, on = o.lit && rng(hsh(i, j, x))() < 0.55;
      rect(wx, wy, ww, wh, { wash: on ? '#f6d48a' : (o.night ? '#1e2a3a' : '#3a4a5a'), washA: 1, w: 1.4, col: '#1a1410' }); pencil([[wx - 4, wy - 6], [wx + ww + 4, wy - 6]], { w: 4, col: '#f6f0e6', a: 0.85, pass2: false });
      if (on) glow(wx + ww / 2, wy + wh / 2, ww, 'rgba(255,200,110,1)', 0.3); } }
  for (let i = 0; i <= cols; i++) pencil([[x + i * cw, base - h], [x + i * cw, base]], { w: 3, col: lerpC(col, '#ffffff', 0.3), a: 0.6, pass2: false });
  rect(x - 6, base - h - 14, w + 12, 16, { wash: '#f6f0e6', washA: 1, w: 1.4, col: '#2a2420', a: 0.7 });
}

function winterPalace(x, base, w, h, t, o = {}) {                        // Зимний дворец: бирюзово-белый, два яруса колонн, статуи на крыше
  const G = o.col || '#6ab0a0', W2 = '#f6f2ea';
  const fp = rect(x, base - h, w, h, { wash: G, washA: 1, w: 2.2, col: '#1a2a26', key: 9500 }); shadeG(fp.path, x + w, 0, x, 0, '#2a5a50', 0.35);
  pencil([[x, base - h * 0.5], [x + w, base - h * 0.5]], { w: 6, col: W2, pass2: false }); pencil([[x, base - h], [x + w, base - h]], { w: 8, col: W2, pass2: false });
  const n = Math.round(w / 28);
  for (let i = 0; i < n; i++) { const cx = x + 14 + i * (w - 28) / (n - 1); for (const [y0, y1] of [[base - h * 0.5, base - 10], [base - h + 6, base - h * 0.5]]) pencil([[cx, y0], [cx, y1]], { w: 7, col: W2, a: 0.95, pass2: false });
    if (i % 2 === 0 && i < n - 1) for (const y of [base - h * 0.42, base - h * 0.92]) { const wx = cx + 4, ww = (w - 28) / (n - 1) - 8; rect(wx, y, ww, h * 0.28, { wash: o.lit ? '#f6d48a' : '#2a3a48', washA: 1, w: 1.2, col: '#1a1a1a' }); if (o.lit) glow(wx + ww / 2, y + h * 0.14, ww * 1.2, 'rgba(255,200,110,1)', 0.25 * o.lit); } }
  for (let i = 0; i < n; i += 3) { const sx = x + 14 + i * (w - 28) / (n - 1); ell(sx, base - h - 22, 7, 9, { wash: '#4a4a40', washA: 1, w: 1, col: '#1a1a1a' }); rect(sx - 5, base - h - 14, 10, 14, { wash: '#4a4a40', washA: 1, line: false }); }
  rect(x - 4, base - h - 8, w + 8, 10, { wash: W2, washA: 1, w: 1, col: '#2a2a2a', a: 0.6 });
}

function embank(y0, t, o = {}) {                                         // гранитная набережная с парапетом и фонарями
  const p = rect(-400, y0, 1880, 70, { wash: PT.granite, washA: 1, w: 2, col: PT.graniteD });
  hatch(p.path, p.bb, { gap: 6, a: 0.2, col: PT.graniteD, ang: 0.4, w: 1 }); for (let x = -380; x < 1480; x += 90) pencil([[x, y0], [x, y0 + 70]], { w: 1.4, col: PT.graniteD, a: 0.6, pass2: false });
  rect(-400, y0 - 26, 1880, 28, { wash: '#9a7a72', washA: 1, w: 1.6, col: PT.graniteD });
  if (o.lamps !== false) for (let x = -300; x < 1480; x += 260) { pencil([[x, y0 - 26], [x, y0 - 190]], { w: 6, col: '#1a1a1e' }); for (const sd of [-1, 1]) { pencil([[x, y0 - 170], [x + sd * 26, y0 - 186]], { w: 3, col: '#1a1a1e', pass2: false }); ell(x + sd * 26, y0 - 196, 9, 12, { wash: o.lit ? '#fff2c8' : '#e8e4dc', washA: 1, w: 1.4, col: '#1a1a1e' }); if (o.lit) glow(x + sd * 26, y0 - 196, 70, 'rgba(255,220,160,1)', 0.5 * o.lit); } }
}

function neva(y0, y1, t, o = {}) {                                       // Нева: тёмно-синяя вода, рябь, блики, отражения огней
  vgrad(y0, y1, [o.top || '#4a6a88', o.bot || '#22364a'], 1);
  for (let k = 0; k < 26; k++) { const y = y0 + (k + 0.5) * (y1 - y0) / 26, ph = t * 1.2 + k; pencil([[-400 + Math.sin(ph) * 30, y], [1480 + Math.cos(ph) * 30, y + 2]], { w: 1.4, col: o.lineCol || '#a8c8e0', a: 0.3, pass2: false, gap: false }); }
  const r = rng(9600 + Math.round(y0)); for (let k = 0; k < 40; k++) { const x = -300 + r() * 1700, y = y0 + r() * (y1 - y0), l = 20 + r() * 60; pencil([[x + Math.sin(t * 2 + k) * 10, y], [x + l + Math.sin(t * 2 + k) * 10, y]], { w: 2.4, col: '#e8f4ff', a: 0.35 * (o.glint ?? 1), pass2: false, gap: false }); }
}

function aurora(x, y, s, t, o = {}) {                                    // крейсер «Аврора»: серый корпус, три трубы, мачты, бак с пушкой
  push(x, y, s); const G = o.col || '#6a7078', D = '#2a2e34';
  const hull = shape([[-420, -40], [420, -40], [460, -110], [-440, -100], [-470, -60]], { wash: G, washA: 1, w: 2.6, col: '#141618' }); shadeG(hull.path, 0, -40, 0, -110, D, 0.45);
  pencil([[-450, -60], [440, -62]], { w: 3, col: '#a8241e', a: 0.8, pass2: false }); rect(-300, -150, 520, 50, { wash: '#7a8088', washA: 1, w: 2, col: '#141618' });
  for (const fx of [-180, -60, 60]) { const f = rect(fx - 22, -330, 44, 190, { wash: '#4a4e54', washA: 1, w: 2, col: '#141618' }); pencil([[fx - 22, -320], [fx + 22, -320]], { w: 6, col: '#1a1a1a', pass2: false }); if (o.smoke) for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k / 3) % 1; ell(fx + ph * 120, -360 - ph * 200, 30 + ph * 60, 20 + ph * 40, { wash: '#5a5a60', washA: 0.4 * (1 - ph), line: false }); } }
  for (const mx of [-320, 240]) { pencil([[mx, -150], [mx, -520]], { w: 6, col: '#2a2a2e' }); pencil([[mx - 60, -440], [mx + 60, -440]], { w: 4, col: '#2a2a2e', pass2: false }); }
  pencil([[-320, -520], [240, -520]], { w: 1.4, col: '#2a2a2e', pass2: false });
  push(330, -130, 1); rect(-30, -26, 60, 30, { wash: '#4a4e54', washA: 1, w: 1.6, col: '#141618' }); pencil([[20, -14], [120, -24]], { w: 10, col: '#2a2e34' }); pop();
  if (o.flash) { glow(x > 0 ? 450 : 450, -150, 400 * o.flash, 'rgba(255,240,200,1)', o.flash); }
  pop();
}

function sailship(x, y, s, t, k = 0) {                                   // парусник начала XVIII в.: корпус, три мачты, паруса, флаг
  push(x, y, s + 0 * k); const r = Math.sin(t * 1.4 + k) * 0.02; ctx.rotate(r);
  shape([[-200, 0], [200, 0], [240, -70], [-230, -80]], { wash: '#6a4a2a', washA: 1, w: 2.4, col: '#1a0a04' }); pencil([[-226, -60], [236, -54]], { w: 4, col: '#d6a842', pass2: false });
  for (const [mx, h] of [[-110, 300], [10, 360], [130, 280]]) { pencil([[mx, -70], [mx, -70 - h]], { w: 6, col: '#3a2412' }); for (let q = 0; q < 2; q++) { const sy = -70 - h * (0.3 + q * 0.4); blob([[mx - 70 + q * 12, sy], [mx + 70 - q * 12, sy], [mx + 66 - q * 12, sy + h * 0.28], [mx, sy + h * 0.33], [mx - 66 + q * 12, sy + h * 0.28]], { wash: '#f2ead6', washA: 1, w: 1.6, col: '#5a4a3a' }); } }
  push(10, -430, 1); const P = []; for (let q = 0; q <= 6; q++) P.push([q * 12, Math.sin(t * 6 + q) * 3]); for (let q = 6; q >= 0; q--) P.push([q * 12, 26 + Math.sin(t * 6 + q) * 3]); shape(P, { wash: '#f6f2ea', washA: 1, w: 1, col: '#2a2a2a' }); pencil([[0, 6], [72, 22]], { w: 4, col: '#2a5aa8', pass2: false }); pencil([[0, 20], [72, 6]], { w: 4, col: '#2a5aa8', pass2: false }); pop();
  pop();
}
