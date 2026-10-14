/* Миры 1: Таймс-сквер подо льдом, туннель часов, сланец, Пангея, юрский берег, ледник. Каждый мир — слои по глубине + герой (cat) + передний план. */

function glacier(t, dy, lit = 1) {                                 // ледниковый щит: слои, трещины, сосульки, подсветка снизу неоном
  const r = rng(3); const edge = []; for (let x = -700; x <= W + 700; x += 70) edge.push([x, 560 + dy + Math.sin(x * 0.011) * 46 + (r() - 0.5) * 60]);
  const body = [[-700, -1600 + dy]].concat([[W + 700, -1600 + dy]], edge.slice().reverse());
  const bp = pathOf(body);
  const g = ctx.createLinearGradient(0, -900 + dy, 0, 640 + dy); g.addColorStop(0, '#ffffff'); g.addColorStop(0.45, '#e2f2fb'); g.addColorStop(0.8, '#a6d0ec'); g.addColorStop(1, '#5d95c4');
  ctx.save(); ctx.fillStyle = g; ctx.fill(bp); ctx.restore();
  hatch(bp, [-700, -900 + dy, W + 700, 640 + dy], { gap: 12, a: 0.16, ang: -0.35, col: '#2b5d8f', seg: 60, key: 5 });
  for (let k = 0; k < 9; k++) { const y = -760 + dy + k * 150, sp = []; for (let x = -700; x <= W + 700; x += 50) sp.push([x, y + Math.sin(x * 0.007 + k * 1.3) * 22 + Math.sin(x * 0.03 + k) * 5]); pencil(sp, { w: 2 + (k % 3), col: k % 2 ? '#3d72a6' : '#f4fbff', a: 0.55, pass2: false, key: k }); }
  for (let k = 0; k < 8; k++) { const x = -300 + k * 230 + (r() - 0.5) * 80, y1 = 560 + dy + Math.sin(x * 0.011) * 46, y0 = y1 - 260 - r() * 260;
    shape([[x - 26, y1], [x - 8, y0], [x + 6, y0 + 30], [x + 24, y1]], { wash: '#173e6a', washA: 0.75, w: 2.2, col: '#0e2440' }); line([[x - 4, y0 + 20], [x + 2, y1 - 30]], { w: 2, col: '#cfeaff', a: 0.6, pass2: false }); }
  edge.forEach(([x, y], i) => { if (i % 2) return; const Lr = 40 + (i * 37 % 7) * 22; shape([[x - 14, y - 4], [x + 14, y - 4], [x + 2, y + Lr], [x - 14, y - 4]], { wash: '#d9efff', washA: 0.95, w: 2, col: '#2b5d8f' });
    const ph = (t * 0.8 + i * 0.37) % 1; ctx.save(); ctx.globalAlpha = 0.9 * (1 - ph); ctx.fillStyle = '#bfe6ff'; ctx.beginPath(); ctx.ellipse(x + 2, y + Lr + ph * 700, 4, 8, 0, 0, 6.3); ctx.fill(); ctx.restore(); });
  for (let i = 0; i < edge.length - 1; i += 2) { const [x0, y0] = edge[i], [x1, y1] = edge[i + 1], hh = 70 + (i * 53 % 5) * 26;   // сераки: грани со светом
    poly([[x0, y0 - hh], [x1, y1 - hh * 0.8], [x1, y1], [x0, y0]], { wash: '#f4fbff', washA: 0.95, w: 2, col: '#2b5d8f' }); poly([[x1, y1 - hh * 0.8], [x1 + 30, y1 - hh * 0.5], [x1 + 26, y1 + 6], [x1, y1]], { wash: '#6fa6d2', washA: 0.95, w: 1.6, col: '#2b5d8f' }); }
  pencil(edge, { w: 6, col: '#0e2440' });
  if (lit) { ctx.save(); ctx.clip(bp); const lg = ctx.createLinearGradient(0, 380 + dy, 0, 640 + dy); lg.addColorStop(0, 'rgba(0,0,0,0)'); lg.addColorStop(0.6, 'rgba(255,79,154,0.35)'); lg.addColorStop(1, 'rgba(54,214,255,0.55)'); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = lit; ctx.fillStyle = lg; ctx.fillRect(-700, 380 + dy, W + 1400, 300); ctx.restore(); }
}
function building(x, top, w, base, col, o = {}) {                  // фасад с окнами, карнизами, водонапорной бочкой
  const p = rect(x, top, w, base - top, { wash: col, washA: 0.98, w: o.lw ?? 2.6, col: o.lc || '#120c1e' });
  if (o.shade !== false) hatch(p.path, p.bb, { gap: 9, a: 0.25, ang: 1.3, col: '#0a0614', key: x });
  windows(x + 6, top + 18, w - 12, base - top - 40, Math.max(3, Math.floor(w / 26)), Math.floor((base - top) / 38), x * 7 + top, o.on ?? 0.6, o.wa, o.wb, o.wA ?? 0.85);
  for (let y = top + 90; y < base - 40; y += 160) pencil([[x, y], [x + w, y]], { w: 1.6, col: '#0a0614', a: 0.5, pass2: false });
  if (o.tank) { push(x + w * 0.7, top, 1); rect(-18, -46, 36, 40, { wash: '#4a3226', washA: 0.95, w: 2, col: '#120c1e' }); shape([[-22, -46], [0, -66], [22, -46], [-22, -46]], { wash: '#3a261c', washA: 0.95, w: 2, col: '#120c1e' }); for (const lx of [-14, 14]) pencil([[lx, -6], [lx, 0]], { w: 2, pass2: false }); pop(); }
  return p;
}
function billboard(x, y, w, h, bg, s, col, t, k, size) {             // светящийся экран-вывеска с пародийным брендом
  const fl = 0.85 + 0.15 * Math.sin(t * 9 + k * 2.3) * (Math.sin(t * 1.3 + k) > 0.8 ? 1 : 0.2);
  glow(x + w / 2, y + h / 2, Math.max(w, h) * 1.1, bg, 0.35 * fl);
  rect(x, y, w, h, { wash: bg, washA: 0.95 * fl, w: 2.6, col: '#120c1e' });
  ctx.save(); ctx.globalAlpha = 0.18; for (let yy = y + 3; yy < y + h; yy += 5) { ctx.fillStyle = '#000'; ctx.fillRect(x, yy, w, 2); } ctx.restore();
  push(x + w / 2, y + h / 2, 1); txt(s, 0, 2, size || Math.min(h * 0.55, w / s.length * 1.7), { col, font: 'Osw', a: 0.95 * fl }); pop();
}
function taxi(x, y, s, t, k) {
  push(x, y, s, 0, k % 2 ? -1 : 1);
  blob([[-130, -30], [-120, -70], [-60, -78], [-30, -118], [60, -118], [96, -78], [134, -66], [138, -28], [120, -6], [-120, -6]], { wash: '#e6b52a', washA: 0.98, w: 3, col: '#1a120a', shade: { gap: 7, a: 0.25, col: '#5a3a0a' } });
  shape([[-22, -112], [54, -112], [84, -78], [-46, -78], [-22, -112]], { wash: '#2b3846', washA: 0.95, w: 2, col: '#1a120a' }); line([[16, -112], [16, -78]], { w: 2.4 });
  rect(-10, -134, 40, 16, { wash: '#f6edd2', washA: 1, w: 1.6, col: '#1a120a' }); txt('TAXI', 10, -126, 13, { col: '#1a120a', font: 'Osw' });
  for (let q = 0; q < 6; q++) rect(-118 + q * 40, -46, 18, 9, { wash: q % 2 ? '#1a120a' : '#e6b52a', washA: 1, line: false });
  for (const wx of [-78, 82]) { ell(wx, -6, 26, 26, { wash: '#151515', washA: 1, w: 2.4 }); ell(wx, -6, 11, 11, { wash: '#8a8a8a', washA: 1, w: 1.4 }); }
  glow(134, -44, 90, 'rgba(255,240,200,0.9)', 0.6); glow(-132, -40, 50, 'rgba(255,40,40,0.9)', 0.5);
  pop();
}
function steam(x, y, t, n = 7, a = 0.55, col = '#e6e0f0') {        // пар из люка
  for (let k = 0; k < n; k++) { const ph = (t * 0.35 + k / n) % 1, r = 30 + ph * 150, xx = x + Math.sin(ph * 6 + k) * 40 * ph, yy = y - ph * 520;
    ctx.save(); ctx.globalAlpha = a * Math.sin(ph * Math.PI); const g = ctx.createRadialGradient(xx, yy, 0, xx, yy, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(230,224,240,0)'); ctx.fillStyle = g; ctx.fillRect(xx - r, yy - r, r * 2, r * 2); ctx.restore(); }
}
function wTimes(t, u, cat, o = {}) {
  const iceK = o.ice ?? 1;
  lay(40, () => { vgrad(-1200, 1500, ['#05060f', '#151338', '#3a1d4d', '#5a2a52']); });
  lay(3.2, () => { const r = rng(21); for (let k = 0; k < 16; k++) { const x = -500 + k * 140 + r() * 40, top = 520 + r() * 260, w = 110 + r() * 70; sil([[x, top], [x + w, top], [x + w, 1500], [x, 1500]], '#1a1530', 1); windows(x + 4, top + 10, w - 8, 900, Math.floor(w / 18), 34, k * 13, 0.42, '#ffcf7a', '#8fd8ff', 0.55); }
    for (let k = 0; k < 4; k++) { const x = -200 + k * 420; glow(x, 900, 260, ['rgba(255,79,154,0.9)', 'rgba(54,214,255,0.9)'][k % 2], 0.25); } });
  haze('#3b2150', 0.16);
  if (iceK > 0) lay(2.9, () => glacier(t, (1 - iceK) * -1700 + 170, 1));
  lay(2.0, () => {
    building(-420, 420, 300, 1500, '#2a2240', { tank: 1 }); building(-110, 300, 230, 1500, '#30264a', {}); building(760, 360, 260, 1500, '#2b2445', { tank: 1 }); building(1030, 460, 300, 1500, '#271f3c', {});
    billboard(-90, 560, 200, 300, '#ff4f9a', 'МУР-КОЛА', '#fff6e8', t, 1, 52); billboard(780, 520, 220, 150, '#36d6ff', 'BROADWAY', '#10202a', t, 2, 50);
    billboard(780, 700, 220, 260, '#1b1b22', 'SALE −90%', '#ffd34a', t, 3, 44); billboard(-400, 760, 260, 160, '#ffd34a', 'КОТО-ПИЦЦА', '#3a1a0a', t, 4, 46);
    if (typeof timesExtra === 'function') timesExtra(t);
    push(-30, 940, 1); rect(-14, 0, 28, 340, { wash: '#14101e', washA: 1, w: 2 }); for (let q = 0; q < 6; q++) { const on = Math.sin(t * 6 - q * 0.6) > -0.3; txt('BROADWAY'[q] || '', 0, 26 + q * 54, 44, { col: on ? '#ff6fb0' : '#5a2a44', font: 'Osw' }); if (on) glow(0, 26 + q * 54, 50, 'rgba(255,79,154,0.8)', 0.4); } pop();
  });
  haze('#2a1838', 0.08);
  lay(1.25, () => {                                                 // улица: асфальт, разметка, лужи-отражения, такси, толпа-силуэты
    vgrad(1180, 2200, ['#2a2433', '#191520']); const road = pathOf([[-900, 1180], [W + 900, 1180], [W + 900, 2300], [-900, 2300]]);
    hatch(road, [-900, 1180, W + 900, 2300], { gap: 10, a: 0.25, ang: 0.05, col: '#000', key: 3 });
    for (let k = -3; k < 8; k++) rect(-200 + k * 190, 1300, 110, 10, { wash: '#e9e2c8', washA: 0.5, line: false });
    for (const [px, c] of [[150, 'rgba(255,79,154,0.5)'], [820, 'rgba(54,214,255,0.5)'], [480, 'rgba(255,211,74,0.4)']]) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(px, 1400, 140, 18, 0, 0, 6.3); ctx.fill(); ctx.restore(); }
    for (let k = 0; k < 2; k++) taxi(((t * 380 * (k ? -1 : 1) + k * 900) % 2000 + 2000) % 2000 - 500, 1300 + k * 26, 0.95, t, k);
    const r = rng(77); for (let k = 0; k < 22; k++) { const x = -300 + k * 80 + r() * 30, h = 150 + r() * 50, by = 1240 + (k % 3) * 8; sil([[x - 18, by], [x - 22, by - h * 0.62], [x - 10, by - h * 0.72], [x + 10, by - h * 0.72], [x + 22, by - h * 0.62], [x + 18, by]], '#120d18', 0.92); ctx.fillStyle = '#120d18'; ctx.beginPath(); ctx.arc(x, by - h * 0.82, 15, 0, 6.3); ctx.fill(); if (r() < 0.3) glow(x + 10, by - h * 0.6, 18, 'rgba(160,220,255,0.9)', 0.6); }
  });
  lay(1, () => { vgrad(GY - 20, 2200, ['#3a3344', '#231e2a']); pencil([[-600, GY - 20], [W + 600, GY - 24]], { w: 3, col: '#0e0a12' }); for (let k = -4; k < 10; k++) pencil([[k * 170, GY - 20], [k * 170 - 60, 2200]], { w: 1.6, a: 0.5, pass2: false, col: '#0e0a12' }); cat(); });
  lay(0.62, () => {                                                 // передний план: фонарь, светофор, гидрант, пар из люка
    push(-60, 1600, 1); rect(-16, -1200, 32, 1300, { wash: '#1a1a20', washA: 1, w: 2.6, col: '#050508' }); rect(-46, -1210, 92, 40, { wash: '#1a1a20', washA: 1, w: 2 });
    rect(4, -860, 84, 120, { wash: '#14141a', washA: 1, w: 2.4, col: '#050508' }); const walk = Math.sin(t * 2) > 0; txt(walk ? 'WALK' : 'DON\'T', 46, -820, 24, { col: walk ? '#e9f6ff' : '#ff7a3a', font: 'Osw' }); glow(46, -800, 70, walk ? 'rgba(220,240,255,0.8)' : 'rgba(255,120,60,0.8)', 0.45); pop();
    push(1080, 1690, 1.1); blob([[-40, 0], [-34, -90], [-50, -96], [-50, -116], [-26, -120], [-20, -150], [20, -150], [26, -120], [50, -116], [50, -96], [34, -90], [40, 0]], { wash: '#8e2a24', washA: 1, w: 3, col: '#1a0806', shade: { gap: 6, a: 0.35, col: '#2a0a08' } }); pop();
    steam(860, 1780, t, 7, 0.5);
  });
  motes(60, [0, 0, W, H], '#dff3ff', t, 4, { sp: 160, sz: 2.4, vx: 30, a: 0.7 });
}

function wTunnel(t, u, cat) {                                      // внутри часов: шестерни, римские цифры, светящаяся линия времени
  screenFill('#120c08', 1);
  const cx = 540, cy = 900;
  for (let k = 0; k < 14; k++) { const ph = (u * 1.6 + k / 14) % 1, z = Math.pow(ph, 2.2), r = 30 + z * 1500, a = Math.min(1, ph * 2) * (1 - ph * 0.3), rot = t * (k % 2 ? 1.5 : -1.1) + k;
    push(cx, cy, 1, rot); const teeth = 24 + k % 3 * 8; const pts = []; for (let i = 0; i <= teeth * 2; i++) { const aa = i / (teeth * 2) * 6.283, rr = r * (i % 2 ? 1 : 1.06); pts.push([Math.cos(aa) * rr, Math.sin(aa) * rr]); }
    pencil(pts, { w: 2 + z * 8, col: k % 3 ? '#c99636' : '#f1d27a', a: 0.85 * a, pass2: false, gap: false });
    if (k % 2 === 0) for (let n = 0; n < 12; n++) { const aa = n / 12 * 6.283; push(Math.cos(aa) * r * 0.86, Math.sin(aa) * r * 0.86, 1, aa + Math.PI / 2); txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], 0, 0, 10 + z * 70, { col: '#f6e2b0', font: 'Osw', a: 0.8 * a }); pop(); }
    pop(); }
  glow(cx, cy, 500, 'rgba(255,200,110,0.9)', 0.5);
  const yrs = ['1931', '1626', '−20 000', '1884', '−200 млн', '1653', '−450 млн', '1886', '1500'];
  yrs.forEach((y, k) => { const ph = (u * 1.3 + k / yrs.length) % 1, z = Math.pow(ph, 2), a = k * 0.7 + u; txt(y, cx + Math.cos(a) * z * 620, cy + Math.sin(a) * z * 820, 20 + z * 120, { col: '#ffe9b8', font: 'Osw', a: (1 - ph) * 0.9 }); });
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const r = rng(hsh(FRAME, 8)); for (let i = 0; i < 60; i++) { const a = r() * 6.283, d0 = 60 + r() * 300, d1 = d0 + 200 + r() * 600; ctx.strokeStyle = 'rgba(255,214,140,0.5)'; ctx.lineWidth = 1 + r() * 3; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * d0, cy + Math.sin(a) * d0); ctx.lineTo(cx + Math.cos(a) * d1, cy + Math.sin(a) * d1); ctx.stroke(); } ctx.restore();
  pencil([[-100, 1500], [cx, cy], [W + 100, 300]], { w: 6, col: '#ffd890', a: 0.9, pass2: false, gap: false }); glow(cx, cy, 120, 'rgba(255,240,200,1)', 0.8);
  cat();
}

function wRock(t, u, cat) {                                        // фундамент Манхэттена: сланец со складками, гранаты, слюда, кварц; подъём к небоскрёбам
  const up = sm((t - EV.rise) / 1.3);
  lay(3, () => { vgrad(-2400, 2600, ['#0d0c12', '#1d1b26', '#15131c']); for (let k = 0; k < 14; k++) { const y = -2200 + k * 330, sp = []; for (let x = -800; x <= W + 800; x += 60) sp.push([x, y + Math.sin(x * 0.006 + k * 1.7) * 90 + Math.sin(x * 0.02) * 20]); pencil(sp, { w: 8, col: k % 2 ? '#2c2a38' : '#3a3648', a: 0.8, pass2: false }); } });
  lay(1, () => {
    const top = -620;                                                   // поверхность скалы (над ней — город)
    // складчатые слои сланца
    for (let k = 0; k < 16; k++) { const y0 = top + k * 190, pts = []; for (let x = -900; x <= W + 900; x += 45) pts.push([x, y0 + Math.sin(x * 0.0045 + k * 0.9) * 110 + Math.sin(x * 0.018 + k) * 18]);
      const poly_ = pts.concat([[W + 900, y0 + 400], [-900, y0 + 400]]); const pp = pathOf(poly_); wash(pp, [K.slate, '#45435a', K.slateD, '#504c64'][k % 4], 0.97);
      hatch(pp, [-900, y0 - 120, W + 900, y0 + 300], { gap: 7, a: 0.35, ang: 0.25 + Math.sin(k) * 0.2, col: '#141219', seg: 40, key: k });
      pencil(pts, { w: 3, col: '#0f0d14', key: k }); pencil(pts.map(([x, y]) => [x, y + 6]), { w: 1.4, col: '#8a86a0', a: 0.5, pass2: false }); }
    line([[-200, 900], [200, 1060], [520, 980], [900, 1180], [1300, 1100]], { w: 16, col: '#e8e4ee', a: 0.9 }); line([[-200, 906], [200, 1066], [520, 986], [900, 1186], [1300, 1106]], { w: 3, col: '#9a96aa', a: 0.6, pass2: false });
    const r = rng(12); for (let i = 0; i < 90; i++) { const x = -300 + r() * 1700, y = top + 40 + r() * 2600, s = 6 + r() * 9;
      if (i % 3 === 0) { shape([[x, y - s * 1.3], [x + s, y - s * 0.3], [x + s * 0.7, y + s], [x - s * 0.7, y + s], [x - s, y - s * 0.3], [x, y - s * 1.3]], { wash: K.garnet, washA: 1, w: 1.8, col: '#2a0610' }); ctx.fillStyle = 'rgba(255,200,210,0.85)'; ctx.fillRect(x - s * 0.3, y - s * 0.6, s * 0.35, s * 0.3); }
      else { const tw = Math.max(0, Math.sin(t * 3 + i * 1.7)); if (tw > 0.6) glow(x, y, 10 + s, 'rgba(240,235,255,1)', (tw - 0.6) * 2); } }
    // поверхность: почва, улица, фундаменты небоскрёбов (разрез)
    const soil = pathOf([[-900, top - 140], [W + 900, top - 140], [W + 900, top + 10], [-900, top + 10]]); wash(soil, '#5a4636', 0.97); hatch(soil, [-900, top - 140, W + 900, top + 10], { gap: 8, a: 0.4, ang: 0.9, col: '#2a1e14', key: 9 });
    vgrad(top - 1800, top - 160, ['#1e2a44', '#d98a5a'], 0.95); rect(-900, top - 180, W + 1800, 40, { wash: '#3a3640', washA: 1, w: 2.4 });
    [[-60, 160, 1050], [170, 190, 1500], [420, 150, 900], [640, 210, 1350], [900, 170, 1150]].forEach(([x, w, h], k) => {
      ctx.save(); ctx.setLineDash([12, 10]); ctx.strokeStyle = 'rgba(160,215,255,0.9)'; ctx.lineWidth = 3 / S; ctx.strokeRect(x, top - 180 - h, w, h); for (let y = top - 180 - h + 60; y < top - 180; y += 60) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke(); } ctx.restore();
      for (const px of [x + 20, x + w - 20]) { rect(px - 8, top - 180, 16, 260 + (k % 2) * 60, { wash: '#8e95a0', washA: 0.95, w: 1.8, col: '#1a1a20' }); } });
    note('фундаменты врезаны прямо в сланец', 540, top - 120 - 1500 + 1700 * 0 + 1340, t, EV.rise + 0.6, S1.rock, '#bfe6ff', 46, -0.03);
    // пещера-карман вокруг героя: выступ-пол
    const ledge = pathOf([[-900, GY - 10], [W + 900, GY - 30], [W + 900, 2600], [-900, 2600]]); wash(ledge, '#2a2836', 0.98); hatch(ledge, [-900, GY - 30, W + 900, 2600], { gap: 8, a: 0.4, ang: 0.15, col: '#0d0c12', key: 11 }); pencil([[-900, GY - 10], [W + 900, GY - 30]], { w: 4, col: '#0d0c12' });
    cat();
    // удар лапой: пыль
    if (t > EV.knock && t < EV.knock + 0.85) { const k = (t - EV.knock) / 0.85; for (let i = 0; i < 14; i++) { const rr = rng(i + 40), a = -1.4 + rr() * 2.4, d = k * (60 + rr() * 140); ctx.save(); ctx.globalAlpha = 0.7 * (1 - k); ctx.fillStyle = '#b9b2c8'; ctx.beginPath(); ctx.arc(860 + Math.cos(a) * d, 1150 + Math.sin(a) * d + k * k * 80, 4 + rr() * 6, 0, 6.3); ctx.fill(); ctx.restore(); } }
  });
  lay(0.66, () => {                                                 // передний план: тёмные массы скалы, капли
    sil([[-400, -900], [180, -900], [140, -300], [60, 300], [120, 900], [-20, 1700], [-400, 2400]], '#0c0b10', 0.97);
    sil([[W + 400, -900], [W - 120, -900], [W - 60, 0], [W - 140, 700], [W - 40, 1500], [W + 400, 2400]], '#0c0b10', 0.97);
    for (let k = 0; k < 3; k++) { const ph = (t * 0.7 + k * 0.33) % 1; ctx.save(); ctx.globalAlpha = 0.8 * (1 - ph); ctx.fillStyle = '#a8c8e8'; ctx.beginPath(); ctx.ellipse(120 + k * 380, -200 + ph * 1900, 4, 9, 0, 0, 6.3); ctx.fill(); ctx.restore(); }
  });
  motes(40, [0, 0, W, H], '#d8d0e8', t, 7, { sp: 12, sz: 2, a: 0.5, wob: 30 });
}

const CONT = [ // Пангея: континенты (lon, lat), drift: −1 на запад, +1 на восток
  { pts: [[-70, 62], [-40, 66], [-18, 56], [-10, 40], [-22, 26], [-40, 12], [-60, 16], [-80, 30], [-86, 48]], drift: -1, col: '#8b8a4c', mt: [[-60, 50], [-40, 30]] },
  { pts: [[-40, 8], [-18, 4], [-6, -8], [-10, -30], [-26, -52], [-40, -40], [-48, -16]], drift: -1, col: '#9c8f52', mt: [[-44, -10], [-40, -40]] },
  { pts: [[-2, 36], [30, 38], [48, 10], [42, -26], [24, -38], [8, -20], [-8, 4]], drift: 1, col: '#b39a5c', mt: [[20, 30], [36, -10]] },
  { pts: [[-4, 46], [30, 62], [90, 66], [140, 54], [130, 30], [80, 34], [40, 40], [10, 42]], drift: 1, col: '#7f8a4e', mt: [[60, 50], [110, 50]] }];
function wGlobe(t, u, cat) {                                        // 3D-глобус: раскол Пангеи, рифт с лавой, облака, атмосфера
  lay(60, () => { screenFill('#04060e', 1); const r = rng(31); for (let i = 0; i < 220; i++) { const x = r() * W, y = r() * H, s = 0.6 + r() * 2.2; ctx.fillStyle = r() < 0.15 ? '#ffd9a0' : '#e6ecff'; ctx.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.5 + i)); ctx.beginPath(); ctx.arc(x, y, s, 0, 6.3); ctx.fill(); } ctx.globalAlpha = 1;
    glow(200, 400, 700, 'rgba(90,60,160,0.6)', 0.5); glow(900, 1500, 600, 'rgba(40,90,160,0.6)', 0.4); });
  lay(2, () => {
    const cx = 540, cy = 860, R = 420, rot = 0.45 + u * 0.12, split = sm((t - EV.split) / 2.6) * 32;
    const proj = (lon, lat) => { const L = lon * Math.PI / 180 + rot, P = lat * Math.PI / 180; return [cx + Math.cos(P) * Math.sin(L) * R, cy - Math.sin(P) * R, Math.cos(P) * Math.cos(L)]; };
    glow(cx, cy, R * 1.35, 'rgba(110,180,255,0.9)', 0.35);
    const og = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.1, cx, cy, R); og.addColorStop(0, '#3f86b8'); og.addColorStop(0.7, '#1d4f80'); og.addColorStop(1, '#0c2848');
    ctx.save(); ctx.fillStyle = og; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.3); ctx.fill(); ctx.restore();
    const sp = new Path2D(); sp.arc(cx, cy, R, 0, 6.3); hatch(sp, [cx - R, cy - R, cx + R, cy + R], { gap: 10, a: 0.22, col: '#0a1e38', ang: 0.5, key: 3 });
    ctx.save(); ctx.clip(sp);
    for (let la = -60; la <= 60; la += 20) { const pts = []; for (let lo = -180; lo <= 180; lo += 8) { const p = proj(lo, la); if (p[2] > 0) pts.push([p[0], p[1]]); else if (pts.length > 1) pencil(pts.splice(0), { w: 1.2, col: '#9fd0ff', a: 0.35, pass2: false }); else pts.length = 0; } if (pts.length > 1) pencil(pts, { w: 1.2, col: '#9fd0ff', a: 0.35, pass2: false }); }
    CONT.forEach((c, k) => { const P3 = c.pts.map(([lo, la]) => proj(lo + c.drift * split, la)); if (P3.filter(p => p[2] > 0).length < 3) return;
      const pts = spline(P3.map(p => [p[0], p[1]]), true, 6); shape(pts, { wash: c.col, washA: 0.97, w: 3, col: '#1e1a0c', shade: { gap: 6, a: 0.35, col: '#3a3010', ang: -0.6 } });
      c.mt.forEach(([lo, la]) => { const p = proj(lo + c.drift * split, la); if (p[2] > 0.1) for (let q = 0; q < 4; q++) line([[p[0] - 20 + q * 10, p[1] + 8], [p[0] - 14 + q * 10, p[1] - 10], [p[0] - 8 + q * 10, p[1] + 8]], { w: 1.6, col: '#3a2a10', smooth: false, pass2: false }); }); });
    if (t > EV.split) { const pts = []; for (let la = -55; la <= 62; la += 6) { const p = proj(-4 + Math.sin(la * 0.12) * 4, la); if (p[2] > 0) pts.push([p[0], p[1]]); }
      if (pts.length > 1) { const hot = clamp(1 - (t - EV.split - 0.3) / 2.5); pencil(pts, { w: 4 + split * 0.5, col: '#2f78b8', a: 0.95 }); if (hot > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; pencil(pts, { w: 8, col: '#ff7a2a', a: hot, pass2: false }); ctx.restore(); pts.forEach(([x, y], i) => i % 3 || glow(x, y, 40, 'rgba(255,120,40,1)', 0.5 * hot)); } } }
    for (let k = 0; k < 7; k++) { const p = proj(-120 + k * 50 + t * 6, -40 + (k * 37) % 90); if (p[2] > 0) { ctx.save(); ctx.globalAlpha = 0.45 * p[2]; ctx.fillStyle = '#f4f8ff'; ctx.beginPath(); ctx.ellipse(p[0], p[1], 70 * p[2], 16 * p[2], 0.3, 0, 6.3); ctx.fill(); ctx.restore(); } }
    const term = ctx.createLinearGradient(cx - R, 0, cx + R, 0); term.addColorStop(0, 'rgba(0,0,0,0)'); term.addColorStop(0.55, 'rgba(0,0,10,0.1)'); term.addColorStop(1, 'rgba(0,0,12,0.78)'); ctx.fillStyle = term; ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
    ctx.restore();
    pencil(ellPts(cx, cy, R, R, 0, 0.1, 90), { w: 4, col: '#06101e' }); pencil(ellPts(cx, cy, R + 6, R + 6, 0, 0.1, 90).slice(0, 50), { w: 3, col: '#9fdcff', a: 0.6, pass2: false });
    if (split > 3) note('Атлантика открывается', 300, 300, t, EV.atl, S1.globe, '#ffd890', 54, -0.05, [[340, 350], [470, 470], [520, 560]]);
  });
  lay(1, cat);
}

function theropod(x, y, s, t, sniff, walk, flip = -1) {             // дилофозавр: шея-S, двойной гребень, полосы, три пальца
  push(x, y, s, 0, flip);
  const ph = t * 5 * walk, lg = Math.sin(ph) * 26 * walk, bob = -Math.abs(Math.sin(ph)) * 8 * walk;
  const col = '#6f6a3c', colD = '#3a3a1c', belly = '#b9ae78';
  // хвост
  const tail = spline([[120, -330 + bob], [260, -350 + bob], [400, -330 + bob + Math.sin(t * 2) * 10], [520, -300 + bob + Math.sin(t * 2 + 1) * 24]], false, 8);
  shape(tubePts(tail, 90, 8), { wash: col, washA: 0.98, w: 3, col: colD, shade: { gap: 6, a: 0.3, col: colD } });
  // дальняя нога
  blob([[60, -300 + bob], [110, -300 + bob], [100 - lg, -150], [70 - lg * 1.2, -20], [40 - lg, -20], [70 - lg, -160]], { wash: colD, washA: 0.95, w: 2.6, col: '#1a1a0c' });
  // тело
  const body = [[-80, -380 + bob], [40, -420 + bob], [150, -390 + bob], [190, -320 + bob], [120, -250 + bob], [-20, -240 + bob], [-110, -290 + bob]];
  const bp = blob(body, { wash: col, washA: 0.98, w: 3.4, col: '#1a1a0c', key: 3 });
  blob([[-70, -270 + bob], [60, -250 + bob], [130, -270 + bob], [60, -262 + bob], [-60, -282 + bob]], { wash: belly, washA: 0.9, line: false });
  for (let k = 0; k < 7; k++) line([[-40 + k * 30, -410 + bob + Math.abs(k - 3) * 4], [-30 + k * 30, -330 + bob]], { w: 7, col: colD, a: 0.7, pass2: false });
  fstrokes(bp.path, bp.bb, 70, 0.4, 10, colD, 0.4, 5);
  // ближняя нога: бедро, голень, плюсна, три пальца с когтями
  blob([[20, -330 + bob], [110, -340 + bob], [100 + lg, -170], [80 + lg * 1.2, -24], [40 + lg * 1.1, -22], [50 + lg, -180], [10, -260 + bob]], { wash: col, washA: 0.98, w: 3, col: '#1a1a0c', shade: { gap: 6, a: 0.35, col: colD } });
  for (let q = -1; q <= 1; q++) line([[60 + lg * 1.15, -24], [60 + lg * 1.15 - 40 + q * 22, 0]], { w: 10, col: col }), line([[60 + lg * 1.15 - 40 + q * 22, 0], [60 + lg * 1.15 - 52 + q * 22, 4]], { w: 3, col: '#efe6c8', pass2: false });
  // ручки
  line([[-60, -320 + bob], [-96, -290 + bob], [-110, -300 + bob]], { w: 12, col: colD });
  // шея и голова (опускается понюхать)
  const hx = lerp(-190, -300, sniff), hy = lerp(-540, -300, sniff) + bob;
  const neck = spline([[-70, -370 + bob], [-130, -430 + bob - sniff * -60], [-170, -500 + sniff * 220], [hx + 40, hy + 10]], false, 8);
  shape(tubePts(neck, 110, 70), { wash: col, washA: 0.98, w: 3, col: '#1a1a0c', key: 6 }); for (let k = 0; k < 5; k++) { const p = neck[Math.floor(k * neck.length / 5)]; line([[p[0] - 16, p[1] - 10], [p[0] + 10, p[1] + 14]], { w: 5, col: colD, a: 0.6, pass2: false }); }
  push(hx, hy, 1.35, lerp(0.05, 0.3, sniff));
  blob([[-90, 6], [-60, -22], [10, -34], [56, -18], [60, 14], [20, 28], [-60, 24]], { wash: col, washA: 0.99, w: 3.2, col: '#1a1a0c', shade: { gap: 6, a: 0.3, col: colD } });
  line([[-88, 12], [-30, 16], [30, 20]], { w: 3, col: '#1a0a06' }); for (let q = 0; q < 7; q++) shape([[-82 + q * 14, 12], [-76 + q * 14, 24], [-70 + q * 14, 13], [-82 + q * 14, 12]], { wash: '#efe6c8', washA: 1, w: 1.2, col: '#1a1a0c' });
  for (const c of [0, 1]) blob([[-40 + c * 30, -24], [-30 + c * 36, -84 + c * 8], [-6 + c * 30, -30]], { wash: '#b8562a', washA: 0.95, w: 2.4, col: '#2a0e06', shade: { gap: 5, a: 0.4, col: '#5a1a08' } });
  ell(4, -10, 11, 8, { wash: '#e8c24a', washA: 1, w: 2.2, col: '#1a0a06' }); ctx.fillStyle = '#0a0604'; ctx.beginPath(); ctx.ellipse(2 - sniff * 4, -10, 2.6, 7, 0, 0, 6.3); ctx.fill(); line([[-12, -22], [20, -24]], { w: 3.6, col: '#1a0a06' });
  ctx.fillStyle = '#1a0a06'; ctx.beginPath(); ctx.ellipse(-80, -6, 4, 2.4, 0.3, 0, 6.3); ctx.fill();
  if (sniff > 0.5) { const ph2 = (t * 1.6) % 1; ctx.save(); ctx.globalAlpha = 0.55 * (1 - ph2); const g = ctx.createRadialGradient(-110 - ph2 * 80, 0, 0, -110 - ph2 * 80, 0, 30 + ph2 * 60); g.addColorStop(0, '#f0eee6'); g.addColorStop(1, 'rgba(240,238,230,0)'); ctx.fillStyle = g; ctx.fillRect(-260, -100, 220, 200); ctx.restore(); }
  pop(); pop();
}
function fern(x, y, h, t, col = K.fern, a = 1, n = 7) {            // папоротник: изогнутые вайи с перышками
  for (let k = 0; k < n; k++) { const ang = -Math.PI / 2 + (k / (n - 1) - 0.5) * 2.2 + Math.sin(t * 1.4 + k + x) * 0.05, L = h * (0.7 + 0.3 * Math.sin(k * 2.1));
    const tip = [x + Math.cos(ang) * L, y + Math.sin(ang) * L * 0.9], mid = [x + Math.cos(ang) * L * 0.5 + Math.cos(ang + 1.2) * L * 0.08, y + Math.sin(ang) * L * 0.6];
    const spine = spline([[x, y], mid, tip], false, 8); pencil(spine, { w: 3, col: '#1c2a0e', a, pass2: false });
    for (let i = 2; i < spine.length - 1; i += 2) { const [px, py] = spine[i], f = 1 - i / spine.length, ll = 10 + f * h * 0.12; for (const sgn of [-1, 1]) { const aa = Math.atan2(spine[i + 1][1] - py, spine[i + 1][0] - px) + sgn * 1.1; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(px + Math.cos(aa) * ll * 0.5, py + Math.sin(aa) * ll * 0.5, ll * 0.55, ll * 0.18, aa, 0, 6.3); ctx.fill(); ctx.restore(); } } }
}
function wDino(t, u, cat) {
  lay(30, () => { vgrad(-600, 1500, ['#7f8e7a', '#cdbb84', '#e8cf92']); glow(780, 420, 520, 'rgba(255,226,160,0.95)', 0.7); });
  lay(8, () => { sil([[-900, 900], [-500, 640], [-300, 660], [-100, 560], [200, 590], [520, 520], [860, 600], [1200, 560], [1800, 700], [1800, 1200], [-900, 1200]], '#6f7a6a', 0.9);
    for (let x = -700; x < 1700; x += 34) pencil([[x, 620 + Math.sin(x * 0.01) * 50], [x + 4, 900]], { w: 2, col: '#4d5648', a: 0.4, pass2: false });   // столбчатые базальты Палисейдс
    for (let k = 0; k < 5; k++) { const ph = (t * 0.08 + k / 5) % 1; glow(1300 + Math.sin(k) * 60, 520 - ph * 600, 120 + ph * 200, 'rgba(150,140,130,0.8)', 0.4 * (1 - ph), 'source-over'); } });
  haze('#d8c896', 0.28);
  lay(4, () => { for (let k = 0; k < 11; k++) { const x = -600 + k * 230, h = 460 + (k * 53 % 5) * 70; araucaria(x, 1150, h, t, k); } });
  haze('#d8c896', 0.18);
  lay(2.2, () => { const lake = pathOf([[-900, 1180], [W + 900, 1160], [W + 900, 1320], [-900, 1340]]); wash(lake, '#6d8c88', 0.95); for (let k = 0; k < 10; k++) pencil([[-600 + k * 260 - (t * 30 % 260), 1210 + (k % 3) * 30], [-480 + k * 260 - (t * 30 % 260), 1206 + (k % 3) * 30]], { w: 2, col: '#e8f0e0', a: 0.6, pass2: false }); glow(780, 1230, 300, 'rgba(255,226,160,0.8)', 0.35); });
  lay(1.35, () => { const sniff = sm((t - EV.sniff) / 0.7), dx = lerp(1700, 880, sm(u / 1.6)); theropod(dx, 1440, 1.25, t, sniff, 1 - sniff, 1); });
  lay(1, () => {
    const mud = pathOf([[-900, 1330], [W + 900, 1310], [W + 900, 2600], [-900, 2600]]); wash(mud, '#7a6446', 0.98); hatch(mud, [-900, 1310, W + 900, 2600], { gap: 8, a: 0.35, ang: 0.1, col: '#3a2a18', key: 4 });
    for (let k = 0; k < 6; k++) { const fx = 360 + k * 130, fy = 1520 + (k % 2) * 40, a = -0.15; push(fx, fy, 1, a); for (const q of [-0.5, 0, 0.5]) { const p = pathOf(ellPts(Math.sin(q) * 34, -Math.cos(q) * 34, 9, 24, q, 0, 16)); wash(p, '#3e2c18', 0.85); } wash(pathOf(ellPts(0, 6, 14, 12, 0, 0, 16)), '#3e2c18', 0.85); pop(); }
    note('следы: Нью-Джерси', 760, 1660, t, S0.dino + 0.9, S1.dino, '#fff2cf', 48, -0.04, [[700, 1630], [640, 1570]]);
    cat();
  });
  lay(0.6, () => { cycad(960, 1980, 600, t); fern(-60, 2000, 520, t, '#3e5a22'); fern(1140, 2050, 560, t, '#35501c'); fern(180, 2150, 300, t, '#4f6b2e');
    for (let k = 0; k < 6; k++) { const x = 900 + k * 40; line([[x, 2100], [x + 10, 1500 + k * 40]], { w: 7, col: '#3a4a1e' }); for (let q = 0; q < 6; q++) pencil([[x + 6, 1540 + k * 40 + q * 90], [x + 6, 1556 + k * 40 + q * 90]], { w: 9, col: '#1e2a0e', pass2: false }); } });
  motes(26, [0, 300, W, 1500], '#fff6c8', t, 9, { sp: -8, sz: 2.6, a: 0.7, tw: 1, add: 1, wob: 40 });
}

function boulder(x, y, r, seed, o = {}) {
  const rr = rng(seed), pts = []; for (let i = 0; i < 11; i++) { const a = Math.PI + i / 10 * Math.PI, R = r * (0.8 + rr() * 0.3); pts.push([x + Math.cos(a) * R * 1.2, y + Math.sin(a) * R]); }
  pts.push([x + r * 1.1, y]); const p = poly(pts, { wash: o.col || '#7d7a86', washA: 0.99, w: 3.2, col: '#16141c', shade: { gap: 6, a: 0.4, col: '#2a2832', ang: 0.8 } });
  softShade(p.path, x + r, y - r, x - r * 0.4, y - r * 0.2, 'rgba(20,18,30,0.9)', 0.6); glow(x - r * 0.4, y - r * 0.7, r * 0.6, 'rgba(255,250,240,1)', 0.25, 'source-over');
  pencil([[x - r * 0.6, y - r * 0.7], [x - r * 0.1, y - r * 0.4], [x + r * 0.3, y - r * 0.8]], { w: 2, col: '#e8e6f0', a: 0.5, pass2: false });
  for (let i = 0; i < 6; i++) { const q = rng(seed * 9 + i); ctx.save(); ctx.globalAlpha = 0.55; ctx.fillStyle = i % 2 ? '#a8b070' : '#c8b878'; ctx.beginPath(); ctx.ellipse(x + (q() - 0.5) * r * 1.6, y - q() * r * 0.8, 6 + q() * 12, 4 + q() * 8, q() * 3, 0, 6.3); ctx.fill(); ctx.restore(); } return p;
}
function mastodon(x, y, s, t) {
  push(x, y, s, 0, -1); const ph = t * 3;
  blob([[-180, -250], [-60, -380], [120, -360], [210, -250], [190, -60], [-160, -60]], { wash: '#5a3a24', washA: 0.97, w: 3.4, col: '#1a0e06', shade: { gap: 6, a: 0.4, col: '#2a1a0c' } });
  for (let k = 0; k < 4; k++) blob([[-140 + k * 100, -80], [-90 + k * 100, -80], [-90 + k * 100 + Math.sin(ph + k) * 12, 0], [-140 + k * 100 + Math.sin(ph + k) * 12, 0]], { wash: '#4a2e1a', washA: 0.97, w: 2.6, col: '#1a0e06' });
  blob([[-240, -300], [-170, -380], [-110, -310], [-130, -200], [-220, -210]], { wash: '#5a3a24', washA: 0.98, w: 3, col: '#1a0e06' });
  line([[-230, -230], [-270, -150], [-250, -80]], { w: 26, col: '#4a2e1a' }); line([[-210, -230], [-300, -200], [-320, -260]], { w: 11, col: '#efe4c8' });
  for (let k = 0; k < 16; k++) line([[-170 + k * 22, -360 + Math.abs(k - 8) * 6], [-176 + k * 22, -240]], { w: 3, col: '#2a1a0c', a: 0.5, pass2: false });
  pop();
}
function wIce(t, u, cat) {
  const melt = sm((t - EV.melt) / 1.4);
  lay(30, () => { vgrad(-600, 1500, [lerpC('#7d93a8', '#7fb2d8', melt), lerpC('#c4d2dc', '#f2e6c4', melt)]); if (melt > 0) glow(300, 300, 600, 'rgba(255,236,190,1)', 0.6 * melt); });
  if (melt > 0) lay(9, () => { ctx.save(); ctx.globalAlpha = melt; hills(1060, 120, '#7a8a9a', 3); ctx.restore();
    ctx.save(); ctx.setLineDash([12, 10]); ctx.strokeStyle = 'rgba(70,110,150,' + (0.6 * clamp((t - EV.ghost) / 0.6)) + ')'; ctx.lineWidth = 3 / S; const r = rng(77); let x = -300; ctx.beginPath(); ctx.moveTo(x, 1000); while (x < 1400) { const w = 60 + r() * 90, h = 120 + r() * 420; ctx.lineTo(x, 1000 - h); ctx.lineTo(x + w, 1000 - h); ctx.lineTo(x + w, 1000); x += w + 10; } ctx.stroke(); ctx.restore(); });
  lay(5, () => glacierWall(t, melt));
  lay(3, () => { if (t > S0.ice + 0.3 && t < EV.b3 + 0.6) mastodon(lerp(1700, -600, (t - S0.ice - 0.3) / (EV.b3 + 0.3 - S0.ice)), 1240, 0.8, t); });
  haze(melt > 0.5 ? '#e6efe0' : '#d5e2ec', 0.25 * (1 - melt * 0.6));
  lay(1.6, () => { const snowA = 1 - melt; if (snowA > 0) { const p = pathOf([[-900, 1240], [-300, 1200], [300, 1250], [900, 1190], [1800, 1240], [1800, 1600], [-900, 1600]]); wash(p, '#e8eff4', snowA); }
    if (melt > 0) { const g = pathOf([[-900, 1240], [1800, 1220], [1800, 1600], [-900, 1600]]); wash(g, '#7d8f4c', melt * 0.95); hatch(g, [-900, 1220, 1800, 1600], { gap: 7, a: 0.35 * melt, ang: -1.4, col: '#3a4a1c', key: 6 });
      for (let k = 0; k < 5; k++) pencil([[-400 + k * 420, 1600], [-300 + k * 420 + Math.sin(t + k) * 20, 1400], [-260 + k * 420, 1240]], { w: 6, col: '#8fc0e0', a: melt * 0.9 }); }
    if (typeof iceExtra === 'function') iceExtra(t, melt); });
  lay(1, () => {
    const gr = pathOf([[-900, GY - 40], [W + 900, GY - 60], [W + 900, 2600], [-900, 2600]]); wash(gr, lerpC('#eef3f6', '#8a9a58', melt), 0.98);
    hatch(gr, [-900, GY - 60, W + 900, 2600], { gap: 8, a: 0.3, ang: 0.1, col: melt > 0.5 ? '#3a4a1c' : '#7f9cb8', key: 7 });
    [[700, 1460, 140, EV.b1], [960, 1490, 180, EV.b2], [130, 1480, 110, EV.b3]].forEach(([x, y, r, td], k) => { if (t < td) return; const kk = sm((t - td) / 0.32), yy = lerp(-200, y, kk * kk); boulder(x, yy, r, k + 4); if (kk >= 1 && t - td < 0.6) { const q = (t - td - 0.32) / 0.3; for (let i = 0; i < 10; i++) { const rr = rng(i + k * 20); ctx.save(); ctx.globalAlpha = 0.6 * (1 - q); ctx.fillStyle = '#c8c0b0'; ctx.beginPath(); ctx.arc(x + (rr() - 0.5) * r * 3 * q, y - rr() * 60 * q, 6 + rr() * 10, 0, 6.3); ctx.fill(); ctx.restore(); } } });
    if (t > EV.ghost) { ctx.save(); ctx.setLineDash([10, 8]); ctx.strokeStyle = 'rgba(160,220,255,0.9)'; ctx.lineWidth = 3; const a = clamp((t - EV.ghost) / 0.5); ctx.globalAlpha = a;
      ctx.beginPath(); ctx.moveTo(820, 1500); ctx.lineTo(820, 1180); ctx.moveTo(790, 1180); ctx.lineTo(850, 1180); ctx.moveTo(1040, 1420); ctx.lineTo(1200, 1420); ctx.moveTo(1050, 1420); ctx.lineTo(1050, 1480); ctx.moveTo(1190, 1420); ctx.lineTo(1190, 1480); ctx.stroke(); ctx.restore();
      glow(820, 1176, 40, 'rgba(255,240,180,1)', 0.6 * clamp((t - EV.ghost) / 0.5)); note('они до сих пор в Центральном парке', 540, 640, t, EV.ghost + 0.1, S1.ice, '#1d2a3a', 50, -0.03, [[760, 700], [900, 900], [940, 1270]]); }
    cat();
  });
  lay(0.6, () => { if (melt < 1) { ctx.save(); ctx.globalAlpha = 1 - melt; boulder(-60, 2120, 260, 41, { col: '#dde8f0' }); boulder(1160, 2160, 300, 43, { col: '#d2e0ea' }); ctx.restore(); }
    else { fern(-40, 2100, 380, t, '#4a6a2a'); fern(1120, 2140, 420, t, '#3e5a22'); } });
  if (melt < 0.9) { motes(140, [0, 0, W, H], '#ffffff', t, 11, { sp: 420, sz: 3, vx: -380, a: 0.85 * (1 - melt), stretch: 0.6 }); for (let k = 0; k < 18; k++) { const r = rng(hsh(FRAME, k)); pencil([[r() * W, r() * H], [r() * W - 260, r() * H + 40]], { w: 1.6, col: '#ffffff', a: 0.4 * (1 - melt), pass2: false }); } }
  if (melt > 0.2) motes(20, [0, 300, W, 1400], '#fff6d8', t, 12, { sp: -10, sz: 2.4, a: 0.6 * melt, tw: 1, add: 1 });
}
function glacierWall(t, melt) {                                    // фронт ледника: синие трещины, слоистость, отступает при таянии
  const dy = -melt * 900, r = rng(51);
  const top = []; for (let x = -900; x <= W + 900; x += 90) top.push([x, 420 + dy + Math.sin(x * 0.008) * 60 + (r() - 0.5) * 50]);
  const wall = top.concat([[W + 900, 1300 + dy * 0.2], [-900, 1300 + dy * 0.2]]); const wp = pathOf(wall);
  const g = ctx.createLinearGradient(0, 420 + dy, 0, 1300); g.addColorStop(0, '#f2f8fb'); g.addColorStop(0.5, '#b7d6ea'); g.addColorStop(1, '#6d9cc4');
  ctx.save(); ctx.globalAlpha = 1 - melt * 0.85; ctx.fillStyle = g; ctx.fill(wp); ctx.restore();
  hatch(wp, [-900, 380 + dy, W + 900, 1300], { gap: 10, a: 0.3 * (1 - melt), ang: 1.35, col: '#2b5d8f', seg: 70, key: 8 });
  for (let k = 0; k < 12; k++) { const x = -800 + k * 230 + (r() - 0.5) * 90; shape([[x - 30, 1300 + dy * 0.2], [x - 6, 520 + dy + r() * 200], [x + 16, 560 + dy + r() * 200], [x + 34, 1300 + dy * 0.2]], { wash: '#1d4e80', washA: 0.7 * (1 - melt), w: 2, col: '#0e2a48', a: 1 - melt }); }
  pencil(top, { w: 5, col: '#2a4a6a', a: 1 - melt * 0.8 });
}
function lerpC(a, b, k) { const pa = [1, 3, 5].map(i => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.substr(i, 2), 16)); return '#' + pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(k))).toString(16).padStart(2, '0')).join(''); }

function araucaria(x, y, h, t, seed) {                               // араукария: голый ствол, зонтичная крона из свисающих пучков
  line([[x, y], [x + 4, y - h * 0.5], [x - 2, y - h]], { w: Math.max(5, h * 0.022), col: '#3a3020' });
  const r = rng(seed * 7 + 1);
  for (let i = 0; i < 9; i++) { const yy = y - h + 20 + i * h * 0.045, span = h * (0.08 + i * 0.03), sw = Math.sin(t * 1.1 + seed + i) * 3;
    for (const s2 of [-1, 1]) { const bx = x + s2 * span * (0.6 + r() * 0.4); pencil([[x, yy], [x + s2 * span * 0.5, yy - 10], [bx + sw, yy + 14]], { w: 2.2, col: '#2a2a14', a: 0.8, pass2: false });
      ctx.save(); ctx.fillStyle = i % 2 ? '#46522a' : '#3a4622'; ctx.globalAlpha = 0.95; ctx.beginPath(); ctx.ellipse(bx + sw, yy + 18, span * 0.32 + 8, 12, s2 * 0.3, 0, 6.3); ctx.fill(); ctx.restore(); } }
}
function cycad(x, y, h, t) { line([[x, y], [x, y - h * 0.35]], { w: h * 0.12, col: '#5a4a2a' }); for (let q = 0; q < 6; q++) pencil([[x - h * 0.06, y - q * h * 0.06], [x + h * 0.06, y - q * h * 0.06 - 4]], { w: 2, col: '#2a2010', pass2: false }); fern(x, y - h * 0.35, h * 0.7, t, '#4a6a2a', 1, 9); }
