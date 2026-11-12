/* 025 Варшава — общие детали города: палитра «кирпич + золото + серый пепел», каменицы Старого города (цветные фасады, аттики, щипцы,
   режим руин и режим «эскиз с картины»), Королевский замок с часовой башней, колонна Сигизмунда, русалка-Syrenka, золочёная рама,
   мольберт, груды кирпича, силуэты в касках (без знаков), брусчатка, фонари. Отмотка 025: Том делает полный оборот с кистью Каналетто,
   кисть оставляет золотую спираль, на Тома летит золочёная рама — проходит сквозь кадр, вспышка → следующая эпоха. */
const WA = { ink: '#1a100c', brick: '#a8432a', brickD: '#5e2214', brickL: '#d8704a', gold: '#e8b23a', goldD: '#9a6a14', goldL: '#ffe08a',
  ash: '#8a8a88', ashD: '#4a4a4c', ashL: '#c8c6c0', paper: '#efe2c0', night: '#101428', copper: '#5aa88a', copperD: '#2a6a54', stone: '#bdb2a0', stoneD: '#6e6656',
  fac: ['#e0a548', '#c8563a', '#7a9a6a', '#ecd29a', '#b86a4a', '#6a8aa8', '#e8b878', '#a84a4a', '#d8c070', '#8a6a9a'] };
const PPLW = { old: ['#7a2a2a', '#2a3a6a', '#4a5a3a', '#6a4a2a', '#8a6a3a'], war: ['#4a4a44', '#5a5248', '#3a3e3a', '#6a5e4e', '#44403a'], fifty: ['#4a5a6a', '#6a5a48', '#3a4a5a', '#7a6a50', '#5a4a3a'], now: ['#d84a3a', '#3a8ac0', '#e8c040', '#2a2a36', '#3aa88a', '#e8e0d0'] };

function cobbles(x0, x1, y0, y1, col, colD, seed, a = 1) {           // брусчатка в перспективе: ряды камней растут книзу (дёшево — fillRect/ellipse)
  const r = rng(seed); ctx.save(); ctx.globalAlpha = a; let y = y0, row = 0;
  while (y < y1) { const h = 8 + (y - y0) * 0.05, w = h * 1.6, off = row % 2 ? w / 2 : 0;
    for (let x = x0 - off; x < x1; x += w) { const v = r(); ctx.fillStyle = v < 0.33 ? colD : v < 0.66 ? col : lerpC(col, '#ffffff', 0.12);
      ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2 - 1.5, h / 2 - 1.2, 0, 0, 6.283); ctx.fill(); }
    y += h; row++; }
  ctx.restore();
}

function kam(x, base, w, h, o = {}) {                                // каменица Старого города; o: col, floors, cols, top 'gable'|'attic'|'roof', ruin 0..1, ghost (эскиз), lit, frieze, seed, scaff
  const L = WA.ink, c = o.col || WA.fac[0], fl = o.floors || 4, nc = o.cols || 3, r = rng(o.seed || 7), ru = o.ruin || 0, x0 = x - w / 2, top = base - h;
  if (o.ghost) {                                                     // контур «с картины»: только карандаш
    const gc = o.gcol || '#f6e2a8', ga = o.ga ?? 0.8; pencil([[x0, base], [x0, top], [x0 + w, top], [x0 + w, base]], { w: 3, col: gc, a: ga, pass2: false });
    pencil([[x0 - 6, top], [x, top - h * 0.28], [x0 + w + 6, top]], { w: 3, col: gc, a: ga, pass2: false });
    for (let f = 0; f < fl; f++) for (let i = 0; i < nc; i++) { const wx = x0 + w * (i + 0.5) / nc, wy = top + 30 + f * (h - 60) / fl; rect(wx - w / nc * 0.22, wy, w / nc * 0.44, (h - 60) / fl * 0.55, { line: true, w: 2, col: gc, a: ga * 0.8 }); }
    return; }
  const jag = []; const nJ = 9; for (let i = 0; i <= nJ; i++) { const xx = x0 + w * i / nJ; jag.push([xx, top + (ru > 0 ? ru * h * (0.25 + 0.6 * r()) : 0)]); }
  const topAt = xx => { const i = clamp(Math.floor((xx - x0) / w * nJ), 0, nJ - 1), k = ((xx - x0) / w * nJ) - i; return lerp(jag[i][1], jag[i + 1][1], k); };
  if (ru > 0) shape([[x0, base], ...jag, [x0 + w, base]], { wash: lerpC(c, WA.ash, 0.55 * ru), washA: 1, w: 2.6, col: L });
  else rect(x0, top, w, h, { wash: c, washA: 1, w: 2.6, col: L });
  if (!ru) { const fr = rect(x0, top, w, h, { line: false }); wash(fr.path, '#000000', 0.0); }
  // крыша / щипец / аттик
  if (!ru) { const tp = o.top || 'roof';
    if (tp === 'roof') { shape([[x0 - 8, top], [x0 + w * 0.18, top - h * 0.34], [x0 + w * 0.82, top - h * 0.34], [x0 + w + 8, top]], { wash: '#9a3a22', washA: 1, w: 2.4, col: L });
      for (let k = 1; k < 5; k++) pencil([[x0 + w * 0.18 * (1 - k / 5) - 8 * (1 - k / 5), top - h * 0.34 * (1 - k / 5)], [x0 + w - w * 0.18 * (1 - k / 5) + 8 * (1 - k / 5), top - h * 0.34 * (1 - k / 5)]], { w: 1.6, col: '#5a1a10', a: 0.7, pass2: false });
      rect(x - w * 0.1, top - h * 0.24, w * 0.2, h * 0.13, { wash: c, washA: 1, w: 2, col: L }); rect(x - w * 0.05, top - h * 0.2, w * 0.1, h * 0.08, { wash: '#1e2a3a', washA: 1, w: 1.4, col: L });
      rect(x0 + w * 0.7, top - h * 0.42, 22, h * 0.14, { wash: WA.brickD, washA: 1, w: 1.8, col: L }); }
    else if (tp === 'gable') { const gh = h * 0.36; shape([[x0, top], [x0 + w * 0.12, top - gh * 0.3], [x0 + w * 0.12, top - gh * 0.55], [x0 + w * 0.3, top - gh * 0.62], [x0 + w * 0.36, top - gh * 0.9], [x - 14, top - gh], [x + 14, top - gh], [x0 + w * 0.64, top - gh * 0.9], [x0 + w * 0.7, top - gh * 0.62], [x0 + w * 0.88, top - gh * 0.55], [x0 + w * 0.88, top - gh * 0.3], [x0 + w, top]], { wash: c, washA: 1, w: 2.4, col: L });
      ell(x, top - gh * 0.5, w * 0.08, w * 0.08, { wash: '#1e2a3a', washA: 1, w: 1.8, col: L }); for (const k of [-1, 1]) ell(x + k * w * 0.36, top - gh * 0.66, 7, 7, { wash: WA.gold, washA: 1, w: 1.2, col: L }); pencil([[x, top - gh], [x, top - gh - 30]], { w: 3, col: L, pass2: false }); ell(x, top - gh - 34, 6, 6, { wash: WA.gold, washA: 1, line: false }); }
    else { const ah = h * 0.16; rect(x0, top - ah, w, ah, { wash: lerpC(c, '#ffffff', 0.15), washA: 1, w: 2.2, col: L }); for (let i = 0; i < 6; i++) { const bx = x0 + w * (i + 0.5) / 6; pencil([[bx, top - ah * 0.15], [bx, top - ah * 0.85]], { w: 5, col: lerpC(c, '#000000', 0.3), pass2: false }); }
      for (const k of [0.08, 0.5, 0.92]) { const vx = x0 + w * k; blob([[vx - 10, top - ah], [vx - 12, top - ah - 22], [vx, top - ah - 34], [vx + 12, top - ah - 22], [vx + 10, top - ah]], { wash: WA.stone, washA: 1, w: 1.6, col: L }); } } }
  // карниз и фриз
  if (topAt(x) < top + h * 0.2) pencil([[x0, top + 6], [x0 + w, top + 6]], { w: 5, col: lerpC(c, '#000000', 0.35), pass2: false });
  if (o.frieze && !ru) { const fy = top + 18; rect(x0 + 4, fy, w - 8, 26, { wash: lerpC(c, '#000000', 0.18), washA: 1, line: false }); for (let i = 0; i < 9; i++) ell(x0 + 12 + i * (w - 24) / 8, fy + 13, 6, 6, { wash: WA.goldL, washA: 0.9, line: false }); }
  // окна
  const fh = (h - 110) / fl;
  for (let f = 0; f < fl - 1; f++) for (let i = 0; i < nc; i++) {
    const wx = x0 + w * (i + 0.5) / nc, ww = Math.min(w / nc * 0.46, 46), wy = top + 44 + f * fh, wh = fh * 0.62;
    if (wy < topAt(wx) + 8) continue;
    const litW = o.lit && r() < o.lit; rect(wx - ww / 2 - 6, wy - 6, ww + 12, wh + 12, { wash: lerpC(c, '#ffffff', 0.35), washA: 1, w: 1.6, col: L });
    rect(wx - ww / 2, wy, ww, wh, { wash: ru ? '#0e0a0a' : litW ? '#ffcf78' : '#24324a', washA: 1, w: 1.6, col: L });
    if (!ru) { pencil([[wx, wy], [wx, wy + wh]], { w: 1.6, col: L, a: 0.8, pass2: false }); pencil([[wx - ww / 2, wy + wh * 0.4], [wx + ww / 2, wy + wh * 0.4]], { w: 1.4, col: L, a: 0.8, pass2: false });
      if (f === 0) shape([[wx - ww / 2 - 10, wy - 8], [wx, wy - 26], [wx + ww / 2 + 10, wy - 8]], { wash: lerpC(c, '#ffffff', 0.25), washA: 1, w: 1.4, col: L });
      if (litW) glow(wx, wy + wh / 2, ww * 1.3, 'rgba(255,200,120,1)', 0.25); }
    else { sil([[wx - ww / 2, wy - 4], [wx + ww / 2, wy - 4], [wx + ww * 0.7, wy - 60], [wx - ww * 0.6, wy - 70]], '#1a1416', 0.55 * ru); }
  }
  // первый этаж: портал и лавки
  const gy = base - fh * 0.9; pencil([[x0, gy - 10], [x0 + w, gy - 10]], { w: 4, col: lerpC(c, '#000000', 0.3), pass2: false });
  if (!ru || ru < 0.7) { blob([[x - 34, base], [x - 34, base - fh * 0.62], [x, base - fh * 0.86], [x + 34, base - fh * 0.62], [x + 34, base]], { wash: WA.stone, washA: 1, w: 2, col: L });
    blob([[x - 22, base], [x - 22, base - fh * 0.56], [x, base - fh * 0.72], [x + 22, base - fh * 0.56], [x + 22, base]], { wash: ru ? '#0e0a0a' : '#4a2a1a', washA: 1, w: 1.6, col: L });
    for (const k of [-1, 1]) if (w > 150) { const sx = x + k * w * 0.32; rect(sx - 26, base - fh * 0.66, 52, fh * 0.5, { wash: ru ? '#0e0a0a' : o.lit ? '#f8c070' : '#3a4a5a', washA: 1, w: 1.6, col: L }); } }
  if (o.sign && !ru) { push(x + w * 0.32, gy - 30, 1); pencil([[0, 0], [40, 0]], { w: 3, col: L, pass2: false }); rect(14, 2, 46, 34, { wash: WA.gold, washA: 1, w: 1.6, col: L }); txt(o.sign, 37, 22, 14, { col: WA.ink, font: 'Osw' }); pop(); }
  if (o.scaff) { const sc = '#8a6a3a'; for (let i = 0; i <= 3; i++) pencil([[x0 - 10 + (w + 20) * i / 3, base], [x0 - 10 + (w + 20) * i / 3, top - 20]], { w: 4, col: sc, pass2: false });
    for (let f = 0; f <= fl; f++) { const yy = base - f * h / fl; pencil([[x0 - 16, yy], [x0 + w + 16, yy]], { w: 5, col: sc, pass2: false }); rect(x0 - 16, yy - 6, w + 32, 6, { wash: '#b89060', washA: 1, w: 1, col: L }); } pencil([[x0 - 10, base], [x0 + w + 10, top]], { w: 2.4, col: sc, a: 0.7, pass2: false }); }
  if (ru) { ctx.save(); const g = ctx.createLinearGradient(0, top, 0, base); g.addColorStop(0, 'rgba(20,16,16,0.55)'); g.addColorStop(1, 'rgba(20,16,16,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x0, base); jag.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(x0 + w, base); ctx.fill(); ctx.restore(); }
  return { top, topAt };
}

function rowKam(x0, base, n, seed, o = {}) {                        // ряд камениц: разные ширины, цвета, верхи
  const r = rng(seed); let x = x0; const tops = ['gable', 'attic', 'roof'];
  for (let i = 0; i < n; i++) { const w = (o.w || 150) * (0.8 + r() * 0.45), h = (o.h || 420) * (0.85 + r() * 0.3);
    kam(x + w / 2, base, w, h, Object.assign({ col: (o.pal || WA.fac)[Math.floor(r() * (o.pal || WA.fac).length)], top: tops[Math.floor(r() * 3)], floors: 4 + (r() < 0.4 ? 1 : 0), cols: w > 150 ? 3 : 2, seed: seed + i * 7, frieze: r() < 0.4 }, o.each || {}, o.ruinF ? { ruin: o.ruinF(i) } : {}));
    x += w - 2; }
  return x;
}

function castleW(x, base, s, o = {}) {                               // Королевский замок: кирпично-лососевый фасад, часовая башня с медным шпилем
  const L = WA.ink, ru = o.ruin || 0, c = o.col || '#c8684a', cD = '#7a3a26';
  push(x, base, s);
  const fw = 900, fh = 270;
  if (!ru) { rect(-fw / 2, -fh, fw, fh, { wash: c, washA: 1, w: 3, col: L });
    for (let f = 0; f < 3; f++) for (let i = 0; i < 13; i++) { if (i === 6) continue; const wx = -fw / 2 + 36 + i * 69, wy = -fh + 26 + f * 80; rect(wx - 3, wy - 3, 34, 52, { wash: '#f0d8b8', washA: 1, w: 1.2, col: L }); rect(wx, wy, 28, 46, { wash: o.lit ? (i * 7 + f) % 3 ? '#ffd890' : '#3a2a20' : '#2a3448', washA: 1, w: 1.2, col: L }); }
    pencil([[-fw / 2, -fh], [fw / 2, -fh]], { w: 6, col: cD, pass2: false }); shape([[-fw / 2 - 10, -fh], [-fw / 2 + 40, -fh - 70], [fw / 2 - 40, -fh - 70], [fw / 2 + 10, -fh]], { wash: '#7a3a22', washA: 1, w: 2.4, col: L });
    for (const k of [-1, 1]) { rect(k * fw / 2 - 50, -fh - 40, 100, fh + 40, { wash: lerpC(c, '#000000', 0.08), washA: 1, w: 2.4, col: L }); shape([[k * fw / 2 - 60, -fh - 40], [k * fw / 2, -fh - 130], [k * fw / 2 + 60, -fh - 40]], { wash: WA.copper, washA: 1, w: 2.2, col: L }); }
    // часовая башня
    rect(-62, -fh - 220, 124, fh + 220, { wash: lerpC(c, '#ffffff', 0.06), washA: 1, w: 3, col: L, shade: { gap: 12, a: 0.18, col: cD, ang: 1.2 } });
    rect(-28, -70, 56, 70, { wash: '#3a2214', washA: 1, w: 2, col: L }); ell(0, -fh - 140, 40, 40, { wash: '#f4e8c8', washA: 1, w: 3, col: WA.goldD });
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; pencil([[Math.cos(a) * 32, -fh - 140 + Math.sin(a) * 32], [Math.cos(a) * 37, -fh - 140 + Math.sin(a) * 37]], { w: 2, col: L, pass2: false }); }
    const ha = o.hands ?? 0; pencil([[0, -fh - 140], [Math.sin(ha) * 24, -fh - 140 - Math.cos(ha) * 24]], { w: 4, col: L, pass2: false }); pencil([[0, -fh - 140], [Math.sin(ha * 12) * 32, -fh - 140 - Math.cos(ha * 12) * 32]], { w: 2.6, col: L, pass2: false });
    blob([[-70, -fh - 220], [-50, -fh - 290], [-20, -fh - 300], [-30, -fh - 340], [0, -fh - 420], [30, -fh - 340], [20, -fh - 300], [50, -fh - 290], [70, -fh - 220]], { wash: WA.copper, washA: 1, w: 2.6, col: L });
    ell(0, -fh - 300, 16, 12, { wash: WA.copperD, washA: 1, w: 1.6, col: L }); pencil([[0, -fh - 420], [0, -fh - 490]], { w: 4, col: L, pass2: false }); ell(0, -fh - 470, 9, 9, { wash: WA.gold, washA: 1, line: false });
    pencil([[-6, -fh - 490], [6, -fh - 490]], { w: 3, col: L, pass2: false }); }
  else { const r = rng(o.seed || 31), pts = [[-fw / 2, 0]]; for (let i = 0; i <= 14; i++) pts.push([-fw / 2 + fw * i / 14, -fh * (0.15 + 0.55 * r() * (1 - ru * 0.4))]); pts.push([fw / 2, 0]);
    shape(pts, { wash: lerpC(c, WA.ash, 0.6), washA: 1, w: 3, col: L, shade: { gap: 12, a: 0.25, col: '#1a1414', ang: 0.9 } });
    for (let i = 0; i < 9; i++) { const wx = -fw / 2 + 60 + i * 96; if (r() < 0.7) rect(wx, -fh * 0.32, 28, 44, { wash: '#0e0a0a', washA: 1, w: 1.2, col: L }); } }
  pop();
}

function columnZ(x, base, s, o = {}) {                                // колонна Сигизмунда: постамент, колонна красного гранита, бронзовый король с крестом и саблей
  const L = WA.ink; push(x, base, s);
  if (o.fallen) { rect(-90, -140, 180, 140, { wash: '#b8b0a4', washA: 1, w: 2.6, col: L }); for (let i = 0; i < 3; i++) { const bx = 120 + i * 190; push(bx, -30, 1, 0.08 * (i - 1)); rect(-90, -26, 180, 52, { wash: '#8a4a44', washA: 1, w: 2.4, col: L }); pencil([[-90, 0], [90, 0]], { w: 1.4, col: '#5a2a24', pass2: false }); pop(); }
    blob([[-70, -140], [-40, -180], [10, -160], [40, -190], [70, -140]], { wash: '#6a5a50', washA: 1, w: 2, col: L }); pop(); return; }
  rect(-120, -40, 240, 40, { wash: '#a8a094', washA: 1, w: 2.4, col: L }); rect(-100, -70, 200, 30, { wash: '#b8b0a4', washA: 1, w: 2.2, col: L }); rect(-74, -230, 148, 160, { wash: '#c8c0b2', washA: 1, w: 2.6, col: L, shade: { gap: 9, a: 0.2, col: '#5a5448', ang: 1.1 } });
  rect(-50, -190, 100, 70, { wash: '#2a2420', washA: 1, w: 1.6, col: WA.goldD }); for (let i = 0; i < 4; i++) pencil([[-38, -176 + i * 14], [38, -176 + i * 14]], { w: 1.6, col: WA.goldL, a: 0.7, pass2: false });
  rect(-80, -246, 160, 18, { wash: '#a8a094', washA: 1, w: 2, col: L });
  const ch = 560; shape([[-30, -246], [-24, -246 - ch], [24, -246 - ch], [30, -246]], { wash: '#9a524a', washA: 1, w: 2.6, col: L }); for (const k of [-12, 0, 12]) pencil([[k * 1.1, -246], [k, -246 - ch]], { w: 1.4, col: '#5a2a24', a: 0.6, pass2: false });
  rect(-40, -260 - ch, 80, 18, { wash: WA.gold, washA: 1, w: 2, col: L }); rect(-30, -276 - ch, 60, 16, { wash: '#4a5048', washA: 1, w: 1.6, col: L });
  const sy = -276 - ch; blob([[-22, sy], [-26, sy - 60], [-18, sy - 96], [18, sy - 96], [26, sy - 60], [22, sy]], { wash: '#3a4a40', washA: 1, w: 2, col: L }); ell(0, sy - 112, 15, 17, { wash: '#3a4a40', washA: 1, w: 1.8, col: L });
  blob([[-14, sy - 124], [-10, sy - 140], [10, sy - 140], [14, sy - 124]], { wash: WA.gold, washA: 1, w: 1.4, col: L });
  pencil([[-22, sy - 70], [-50, sy - 150]], { w: 5, col: '#2a3a30', pass2: false }); pencil([[-50, sy - 150], [-50, sy - 196]], { w: 4, col: WA.goldD, pass2: false }); pencil([[-64, sy - 182], [-36, sy - 182]], { w: 4, col: WA.goldD, pass2: false });
  pencil([[22, sy - 66], [44, sy - 30], [70, sy - 10]], { w: 4, col: '#c8ccd0', pass2: false });
  pop();
}

function mermaidW(x, base, s, o = {}) {                               // русалка Варшавы (Syrenka): бассейн, постамент, бронзовая фигура со щитом и мечом
  const L = WA.ink, br = o.col || '#3a5a4a', brL = '#7aa890'; push(x, base, s);
  ell(0, -10, 170, 30, { wash: '#6a6458', washA: 1, w: 2.4, col: L }); ell(0, -16, 150, 22, { wash: '#4a7088', washA: 1, w: 1.6, col: L }); rect(-60, -120, 120, 104, { wash: '#a8a094', washA: 1, w: 2.4, col: L }); rect(-70, -132, 140, 14, { wash: '#8a8478', washA: 1, w: 2, col: L });
  const sy = -132; blob([[-50, sy], [-60, sy - 20], [-30, sy - 30], [10, sy - 22], [40, sy - 50], [30, sy - 80], [-6, sy - 90], [-20, sy - 70], [-4, sy - 56], [-40, sy - 40]], { wash: br, washA: 1, w: 2.2, col: L });
  for (let i = 0; i < 5; i++) ell(-30 + i * 14, sy - 30 - i * 8, 8, 5, { line: true, w: 1.2, col: brL, a: 0.7 });
  blob([[-6, sy - 90], [-16, sy - 130], [-10, sy - 170], [12, sy - 172], [18, sy - 132], [12, sy - 92]], { wash: br, washA: 1, w: 2.2, col: L }); ell(2, sy - 190, 14, 17, { wash: br, washA: 1, w: 2, col: L }); blob([[-12, sy - 200], [-4, sy - 214], [14, sy - 210], [18, sy - 180], [10, sy - 196]], { wash: '#2a4034', washA: 1, line: false });
  ell(-34, sy - 136, 26, 30, { wash: br, washA: 1, w: 2.2, col: L }); ell(-34, sy - 136, 12, 14, { line: true, w: 1.6, col: brL });
  pencil([[14, sy - 160], [40, sy - 200], [52, sy - 236]], { w: 5, col: br, pass2: false }); pencil([[52, sy - 236], [70, sy - 330]], { w: 5, col: '#c8d4d0', pass2: false }); pencil([[40, sy - 236], [64, sy - 236]], { w: 4, col: br, pass2: false });
  if (o.water !== false) for (let i = 0; i < 3; i++) pencil(spline([[-110 + i * 110, -20], [-90 + i * 110, -60], [-70 + i * 110, -24]], false, 8), { w: 2.4, col: '#bfe0f0', a: 0.7, pass2: false });
  pop();
}

function frameG(x, y, w, h, o = {}) {                                 // золочёная рама с орнаментом; o.inner(t) — что внутри (клип), o.rot, o.s
  const L = WA.ink, b = o.b || Math.max(18, Math.min(w, h) * 0.09);
  push(x, y, o.s || 1, o.rot || 0);
  if (o.inner) { ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip(); o.inner(); ctx.restore(); }
  else if (o.fill) rect(-w / 2, -h / 2, w, h, { wash: o.fill, washA: 1, line: false });
  for (const [k, cc] of [[1, WA.goldD], [0.62, WA.gold], [0.3, WA.goldL]]) { const bb = b * k; ctx.save(); ctx.fillStyle = cc; ctx.beginPath(); ctx.rect(-w / 2 - b, -h / 2 - b, w + 2 * b, h + 2 * b); ctx.rect(-w / 2 - b + (b - bb), -h / 2 - b + (b - bb), w + 2 * bb, h + 2 * bb); ctx.fill('evenodd'); ctx.restore(); }
  ctx.save(); ctx.fillStyle = WA.gold; ctx.beginPath(); ctx.rect(-w / 2 - b, -h / 2 - b, w + 2 * b, h + 2 * b); ctx.rect(-w / 2, -h / 2, w, h); ctx.fill('evenodd'); ctx.restore();
  ctx.save(); ctx.fillStyle = WA.goldD; ctx.globalAlpha = 0.7; ctx.fillRect(-w / 2, -h / 2, w, b * 0.25); ctx.fillRect(-w / 2, -h / 2, b * 0.25, h); ctx.restore();
  rect(-w / 2 - b, -h / 2 - b, w + 2 * b, h + 2 * b, { line: true, w: 2.6, col: L }); rect(-w / 2, -h / 2, w, h, { line: true, w: 2, col: L });
  for (const [cx, cy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { const px = cx * (w / 2 + b / 2), py = cy * (h / 2 + b / 2); blob([[px - b * 0.9, py], [px, py - b * 0.9], [px + b * 0.9, py], [px, py + b * 0.9]], { wash: WA.goldL, washA: 1, w: 1.6, col: WA.goldD }); }
  for (let i = 1; i < 6; i++) { ell(-w / 2 + w * i / 6, -h / 2 - b / 2, b * 0.22, b * 0.22, { wash: WA.goldL, washA: 1, line: false }); ell(-w / 2 + w * i / 6, h / 2 + b / 2, b * 0.22, b * 0.22, { wash: WA.goldL, washA: 1, line: false }); }
  pop();
}

function easelW(x, base, s, o = {}) {                                 // мольберт: три ноги, полка, холст (o.canvas(t) — содержимое)
  const L = WA.ink, wd = '#7a4a24'; push(x, base, s);
  pencil([[-110, 0], [-40, -560]], { w: 9, col: wd }); pencil([[110, 0], [40, -560]], { w: 9, col: wd }); pencil([[0, 20], [0, -600]], { w: 8, col: lerpC(wd, '#000000', 0.3) });
  rect(-140, -200, 280, 16, { wash: wd, washA: 1, w: 2, col: L });
  pop();
}

function rubble(x0, x1, base, h, seed, o = {}) {                      // груда кирпича и щебня: силуэт + кирпичи + балки
  const r = rng(seed), pts = [[x0, base + 20]], n = 12; for (let i = 0; i <= n; i++) { const k = i / n; pts.push([lerp(x0, x1, k), base - h * Math.sin(k * Math.PI) * (0.6 + 0.5 * r())]); } pts.push([x1, base + 20]);
  shape(pts, { wash: o.col || '#6a5a52', washA: 1, w: 2.4, col: WA.ink, shade: { gap: 13, a: 0.25, col: '#2a2020', ang: 0.7 } });
  ctx.save(); for (let i = 0; i < (o.n || 40); i++) { const k = r(), x = lerp(x0, x1, k), y = base - h * Math.sin(k * Math.PI) * r() * 0.9, a = r() * 3; ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = r() < 0.6 ? WA.brick : r() < 0.5 ? WA.brickD : '#9a8a7a'; ctx.fillRect(-14, -6, 28, 12); ctx.strokeStyle = WA.ink; ctx.lineWidth = 1.2; ctx.strokeRect(-14, -6, 28, 12); ctx.restore(); } ctx.restore();
  for (let i = 0; i < (o.beams ?? 2); i++) { const x = lerp(x0, x1, 0.25 + r() * 0.5); pencil([[x - 60, base - h * 0.4], [x + 50, base - h * (0.9 + r() * 0.5)]], { w: 10, col: '#2a1a12', pass2: false }); }
}

function helmetSil(x, base, s, t, o = {}) {                            // солдат-силуэт в каске (серый, без знаков и эмблем)
  const c = o.col || '#3a3c40', st = Math.sin(t * 8 + (o.ph || 0)) * 5 * (o.walk ? 1 : 0); push(x, base, s, 0, o.flip || 1);
  sil([[-14, 0], [-17, -72], [-12, -98], [12, -98], [17, -72], [14, 0]], c, o.a ?? 1); sil(ellPts(0, -110, 13, 12, 0, 0, 12), c, o.a ?? 1);
  sil([[-20, -110], [-18, -122], [-8, -130], [8, -130], [18, -122], [20, -110], [24, -104], [-24, -104]], c, o.a ?? 1);
  pencil([[12, -60], [26, -170]], { w: 3, col: c, a: o.a ?? 1, pass2: false }); pencil([[-7, 0], [-7 + st, 32]], { w: 7, col: c, a: o.a ?? 1, pass2: false }); pencil([[7, 0], [7 - st, 32]], { w: 7, col: c, a: o.a ?? 1, pass2: false });
  pop();
}

function lampWA(x, base, s, t, on = 1) {                               // варшавский чугунный фонарь
  const L = WA.ink; push(x, base, s); pencil([[0, 0], [0, -330]], { w: 9, col: '#1e2224' }); rect(-18, -20, 36, 20, { wash: '#2a2e30', washA: 1, w: 1.6, col: L });
  pencil(spline([[0, -320], [40, -350], [70, -330]], false, 8), { w: 5, col: '#1e2224', pass2: false }); shape([[52, -330], [88, -330], [80, -390], [60, -390]], { wash: on ? '#ffe2a0' : '#3a3a30', washA: 1, w: 2, col: L }); shape([[50, -390], [90, -390], [70, -412]], { wash: '#1e2224', washA: 1, w: 1.6, col: L });
  pop(); if (on) { glow(x + 70 * s, base - 360 * s, 110 * s, 'rgba(255,210,130,1)', 0.32 * on); }
}

function brushW(x, y, s, ang, o = {}) {                                // кисть художника: древко, обойма, пучок с краской
  push(x, y, s, ang); pencil([[0, 0], [0, -150]], { w: 7, col: '#6a3a1a' }); rect(-6, -168, 12, 20, { wash: '#c8b070', washA: 1, w: 1.4, col: WA.ink });
  blob([[-7, -168], [-9, -190], [0, -212], [9, -190], [7, -168]], { wash: o.paint || WA.gold, washA: 1, w: 1.6, col: WA.ink }); pop();
}

function paletteW(x, y, s, rot = 0) {                                    // палитра с красками
  push(x, y, s, rot); blob([[-70, 0], [-60, -40], [0, -52], [64, -30], [70, 14], [20, 40], [-40, 34]], { wash: '#c89a5a', washA: 1, w: 2, col: WA.ink }); ell(-36, 10, 12, 12, { wash: '#e8d8c0', washA: 1, w: 1.2, col: WA.ink });
  [WA.brick, WA.gold, '#3a6aa8', '#f4ecd8', '#3a8a5a', '#2a1a10'].forEach((c, i) => ell(-30 + i * 18 + (i % 2) * 4, -24 + (i % 2) * 14, 9, 7, { wash: c, washA: 1, line: false })); pop();
}

function ashSky(t, seed, a = 1) { motes(40, [-200, -200, 1300, 1700], '#bdb8b2', t, seed, { sp: 40, sz: 3.4, a: 0.55 * a, wob: 24 }); }

/* ---- отмотка 025: кисть Каналетто + золочёная рама ---- */
function wTunnelWA(t, u, cat) {
  const cx = 540, cy = 900, dur = S1.tunnel - S0.tunnel, p = u / dur;
  vgrad(-200, 2100, ['#2a1a10', '#5a3418', '#3a2210'], 1);
  for (let k = 0; k < 10; k++) { const ph = (u * 0.9 + k / 10) % 1, z = Math.pow(ph, 2.1), w = 80 + z * 1900, h = w * 1.3, a = Math.min(1, ph * 2.5) * (1 - ph * 0.35);
    ctx.save(); ctx.globalAlpha = a; ctx.translate(cx, cy); ctx.rotate((k % 2 ? 1 : -1) * (u * 0.8 + k * 0.3)); ctx.strokeStyle = k % 3 ? WA.gold : WA.goldL; ctx.lineWidth = 3 + z * 18; ctx.strokeRect(-w / 2, -h / 2, w, h); ctx.restore(); }
  const yrs = ['2026', '1984', '1980', '1950', '1945', '1944', '1939', '1770'];
  yrs.forEach((y, k) => { const ph = (u * 1.0 + k / yrs.length) % 1, z = Math.pow(ph, 2), a = k * 0.8 + u; txt(y, cx + Math.cos(a) * z * 620, cy + Math.sin(a) * z * 820, 20 + z * 120, { col: '#ffe9b8', font: 'Osw', a: (1 - ph) * 0.9 }); });
  const sp = sm(clamp(p / 0.72)), r = sp * 6.283;                                       // золотая спираль — след кисти за оборотом
  const trail = []; for (let i = 0; i <= 40; i++) { const rr = r * i / 40; trail.push([cx - Math.sin(rr) * 330, 1000 + Math.cos(rr) * 330]); }
  if (trail.length > 2 && sp > 0.02) { pencil(trail, { w: 34, col: WA.gold, a: 0.95, pass2: false, gap: false }); pencil(trail, { w: 12, col: WA.goldL, a: 0.9, pass2: false, gap: false }); }
  cat();
  const fr = clamp((p - 0.62) / 0.3), fs = 0.15 + Math.pow(fr, 2.4) * 7;                // рама летит в камеру и проходит сквозь кадр
  if (fr > 0) frameG(cx, cy, 520, 680, { s: fs, rot: (1 - fr) * 0.5, b: 46 });
  if (fr > 0.82) screenFill('#fff2c8', clamp((fr - 0.82) / 0.18), 'source-over');      // вспышка на долю секунды
}
WORLD.tunnel = wTunnelWA;
DIR.tunnel = { outfit: 'hoodieWA', light: { side: 1, rim: '#ffd890' }, grade: ['#6a4010', 0.12], act: () => [[S0.tunnel, 'awe'], [S0.tunnel + (S1.tunnel - S0.tunnel) * 0.6, 'shock']],
  pose: (t, u, b) => { const p = u / (S1.tunnel - S0.tunnel), r = 6.283 * sm(clamp(p / 0.72)), sc = 1.0 + 0.08 * sm(clamp(p / 0.72)); return Object.assign(b, { x: 540 - Math.sin(r) * 260 * sc, y: 1000 + Math.cos(r) * 260 * sc, s: sc, rot: r, look: [0, -0.2], prop: 'brush', propAng: -0.6, hand: [120, -330], tailUp: true }); },
  cam: () => [[S0.tunnel, 540, 960, 0], [S0.tunnel + 1.0, 540, 900, 0.12], [S1.tunnel, 540, 880, 0.2]] };
TRANS_IN.tunnel = { a: 0.15, b: 0.2, fx(k, t, A, B) {                // из хука: золотой мазок кисти заливает кадр по диагонали
  drawBuf(k < 0.55 ? A : B); const e = k < 0.55 ? k / 0.55 : 1 - (k - 0.55) / 0.45;
  scr(() => { ctx.save(); ctx.fillStyle = WA.gold; ctx.beginPath(); const d = e * 2600; ctx.moveTo(-200, -200); ctx.lineTo(-200 + d, -200); for (let i = 0; i <= 20; i++) { const y = -200 + i * 120; ctx.lineTo(-200 + d - y * 0.5 + Math.sin(i * 2.7) * 40, y); } ctx.lineTo(-200, 2200); ctx.fill();
    ctx.strokeStyle = WA.goldL; ctx.lineWidth = 6; for (let i = 0; i < 18; i++) { const y = i * 110 + 20; ctx.beginPath(); ctx.moveTo(-200 + d - y * 0.5 - 220, y); ctx.lineTo(-200 + d - y * 0.5 - 20, y + 14); ctx.stroke(); } ctx.restore(); });
} };

function cloudsWA(t, y, n, col, seed, a = 0.7, sp = 8) { const r = rng(seed); for (let i = 0; i < n; i++) { const x = ((r() * 2200 + t * sp * (0.5 + r())) % 2400) - 600, yy = y + r() * 260, w = 180 + r() * 220;
  blob([[x - w / 2, yy], [x - w * 0.35, yy - w * 0.22], [x - w * 0.05, yy - w * 0.32], [x + w * 0.25, yy - w * 0.24], [x + w / 2, yy - w * 0.05], [x + w * 0.3, yy + w * 0.06], [x - w * 0.3, yy + w * 0.06]], { wash: col, washA: a, w: 1.4, col: '#ffffff', a: 0.3 }); } }
function birdsWA(t, n, box, seed, col = '#2a1a14') { const r = rng(seed); for (let i = 0; i < n; i++) { const x = box[0] + ((r() * (box[2] - box[0]) + t * (30 + r() * 30)) % (box[2] - box[0])), y = box[1] + r() * (box[3] - box[1]) + Math.sin(t + i) * 12, f = Math.sin(t * 9 + i * 2) * 9, s = 0.7 + r() * 0.7;
  pencil([[x - 16 * s, y - f * s], [x, y], [x + 16 * s, y - f * s]], { w: 2.6, col, pass2: false }); } }
function pigeon(x, y, s, t, sd = 0) { const pk = Math.sin(t * 6 + sd) > 0.6 ? 6 : 0; push(x, y, s); ell(0, -14, 20, 13, { wash: '#7a7e8a', washA: 1, w: 1.6, col: WA.ink }); ell(16, -26 + pk, 9, 9, { wash: '#6a6e7a', washA: 1, w: 1.4, col: WA.ink }); ell(14, -22 + pk, 5, 3, { wash: '#7aa890', washA: 1, line: false }); pencil([[24, -26 + pk], [30, -24 + pk]], { w: 2.4, col: '#d8a040', pass2: false }); pencil([[-20, -12], [-32, -8]], { w: 5, col: '#4a4e5a', pass2: false }); pencil([[-2, -2], [-2, 4]], { w: 2, col: '#c8604a', pass2: false }); pencil([[6, -2], [6, 4]], { w: 2, col: '#c8604a', pass2: false }); pop(); }
function umbrellaWA(x, base, s, col, o = {}) { const L = WA.ink; push(x, base, s); pencil([[0, 0], [0, -260]], { w: 6, col: '#3a2a1a' }); blob([[-150, -230], [-90, -290], [0, -310], [90, -290], [150, -230], [100, -238], [50, -228], [0, -238], [-50, -228], [-100, -238]], { wash: col, washA: 1, w: 2.2, col: L }); for (const k of [-100, -50, 0, 50, 100]) pencil([[0, -306], [k, -232]], { w: 1.4, col: lerpC(col, '#000000', 0.4), a: 0.7, pass2: false });
  if (o.table !== false) { ell(0, -90, 70, 14, { wash: '#e8e0d0', washA: 1, w: 1.8, col: L }); pencil([[0, -90], [0, 0]], { w: 5, col: '#2a2a2a', pass2: false }); rect(-14, -114, 18, 24, { wash: '#f4f0e8', washA: 1, w: 1.2, col: L }); ell(28, -98, 14, 6, { wash: '#8a5a2a', washA: 1, w: 1.2, col: L }); }
  pop(); }
function signature(x, y, s, t, o = {}) { push(x, y, s, -0.06); txt(o.txt || 'B. Bellotto detto Canaletto', 0, 0, 30, { col: o.col || '#3a1a0a', font: 'Hand', a: o.a ?? 1 }); pop(); }
function fiat126(x, base, s, col, fl = 1) {                            // «малюх» Fiat 126p: короткий горбатый кузов, круглые фары
  const L = WA.ink; push(x, base, s, 0, fl);
  ell(0, 4, 150, 16, { wash: '#000000', washA: 0.25, line: false });
  blob([[-140, -30], [-138, -80], [-100, -96], [-70, -160], [40, -164], [90, -100], [140, -88], [146, -30]], { wash: col, washA: 1, w: 2.6, col: L });
  shape([[-60, -150], [-86, -100], [-10, -100], [-10, -152]], { wash: '#9ac0d8', washA: 1, w: 2, col: L }); shape([[0, -152], [0, -100], [76, -100], [36, -152]], { wash: '#9ac0d8', washA: 1, w: 2, col: L });
  pencil([[-130, -60], [140, -60]], { w: 2, col: lerpC(col, '#000000', 0.4), pass2: false }); ell(136, -70, 10, 12, { wash: '#fff4c8', washA: 1, w: 1.6, col: L }); rect(-146, -46, 20, 12, { wash: '#c8201a', washA: 1, w: 1.2, col: L });
  for (const k of [-86, 90]) { ell(k, -24, 30, 30, { wash: '#1a1a1a', washA: 1, w: 2, col: L }); ell(k, -24, 13, 13, { wash: '#b8bcc0', washA: 1, w: 1.4, col: L }); }
  pop();
}
function dashLine(pts, col, w = 4, a = 1, seg = 22) { const [p0, p1] = pts, d = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), n = Math.floor(d / seg); for (let i = 0; i < n; i += 2) { const k0 = i / n, k1 = Math.min(1, (i + 1) / n); pencil([[lerp(p0[0], p1[0], k0), lerp(p0[1], p1[1], k0)], [lerp(p0[0], p1[0], k1), lerp(p0[1], p1[1], k1)]], { w, col, a, pass2: false }); } }
function carriage(x, base, s, t, col, fl = 1) {                         // карета XVIII в. с лошадью и кучером
  const L = WA.ink; push(x, base, s, 0, fl); const b = Math.sin(t * 8) * 3;
  ell(0, 6, 260, 16, { wash: '#000000', washA: 0.2, line: false });
  blob([[-150, -70 + b], [-160, -190 + b], [-120, -220 + b], [60, -220 + b], [90, -190 + b], [80, -70 + b]], { wash: col, washA: 1, w: 2.6, col: L }); rect(-110, -190 + b, 70, 60, { wash: '#f0d8a0', washA: 1, w: 1.6, col: L }); rect(-20, -190 + b, 70, 60, { wash: '#f0d8a0', washA: 1, w: 1.6, col: L });
  pencil([[-160, -150 + b], [90, -150 + b]], { w: 3, col: WA.gold, pass2: false }); for (const k of [-120, 50]) { ell(k, -40, 42, 42, { line: true, w: 5, col: '#3a2010' }); for (let i = 0; i < 6; i++) { const a = i / 6 * 3.14 + t * 6; pencil([[k, -40], [k + Math.cos(a) * 40, -40 + Math.sin(a) * 40]], { w: 2, col: '#3a2010', pass2: false }); } }
  human(110, -120 + b, 0.45, t, { body: '#2a2a3a', legs: '#2a2a30', seed: 2799, hat: 'merchant', hatCol: '#1a1a1a', armR: 'hold' });
  const g = Math.sin(t * 9); blob([[150, -70], [170, -150], [230, -170], [300, -200], [320, -180], [290, -150], [280, -80], [160, -70]], { wash: '#6a4a2a', washA: 1, w: 2.2, col: L }); for (const k of [170, 270]) { pencil([[k, -76], [k + g * 12, -4]], { w: 8, col: '#4a2a14', pass2: false }); pencil([[k + 20, -76], [k + 20 - g * 12, -4]], { w: 8, col: '#4a2a14', pass2: false }); }
  pencil([[110, -110 + b], [300, -170]], { w: 1.6, col: '#2a1a10', pass2: false });
  pop();
}
