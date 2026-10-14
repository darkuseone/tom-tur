/* Переходы между эпохами: каждый — физическое событие внутри кадра (портал часов, удар, сжатие в планету, крэш-зум, заморозка и раскол,
   хлыст-панорама, дым, монета, тилт, вспышка солнца, зум в пламя, гиперлапс, портал-воронка). A — уходящая эпоха, B — новая. */
function drawBuf(c, s = 1, cx = 540, cy = 960, a = 1, op, dx = 0, dy = 0, rot = 0) {
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; if (op) ctx.globalCompositeOperation = op;
  ctx.translate(cx + dx, cy + dy); if (rot) ctx.rotate(rot); ctx.scale(s, s); ctx.drawImage(c, -cx, -cy); ctx.restore();
}
function inCircle(cx, cy, R, fn) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.arc(cx, cy, Math.max(0.1, R), 0, 6.3); ctx.clip(); fn(); ctx.restore(); }
function ringFX(cx, cy, R, t, cols, a = 1) {                        // энергетическое кольцо портала: латунь + искры
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); S = 1;
  glow(cx, cy, R * 1.25 + 60, 'rgba(255,210,130,1)', 0.35 * a);
  for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.035), R * (1 - k * 0.035), t * (k % 2 ? 3 : -2), 0.05, 90), { w: 10 - k * 3, col: cols[k % cols.length], a, pass2: false, gap: false });
  for (let i = 0; i < 26; i++) { const r = rng(hsh(FRAME, i)), aa = r() * 6.283, d = R * (0.98 + r() * 0.18); glow(cx + Math.cos(aa) * d, cy + Math.sin(aa) * d, 8 + r() * 18, 'rgba(255,236,180,1)', 0.9 * a); }
  ctx.restore();
}
function smear(c, dx, dy, n = 5, base = 0) { for (let i = n; i >= 0; i--) drawBuf(c, 1, 540, 960, i ? 0.22 : 1, null, base + dx * i / n, dy * i / n); }
function whiteOut(a, col = '255,250,235') { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(a); ctx.fillStyle = `rgb(${col})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }

const TRANS_LIST = [
  { t: S0.tunnel, a: 0.5, b: 0.25, fx(k, t, A, B) {                       // 1. портал из часов
    const cx = 735, cy = 1040, R = Math.pow(sm(k), 1.6) * 1500;
    drawBuf(A); inCircle(cx, cy, R, () => drawBuf(B, 1.5 - 0.5 * k, cx, cy)); ringFX(cx, cy, R, t, ['#ffd890', '#f1d27a', '#c99636'], clamp(1.4 - k)); } },
  { t: S0.rock, a: 0.001, b: 0.35, fx(k, t, A, B) {                      // 2. жёсткая посадка: удар, вспышка
    drawBuf(B, 1.22 - 0.22 * sm(k)); whiteOut((1 - k) * 0.9); } },
  { t: S0.globe, a: 0.25, b: 0.6, fx(k, t, A, B) {                       // 3. скала сжимается в планету
    const cx = 540, cy = 848, R = lerp(1300, 472, sm(k));
    drawBuf(B); inCircle(cx, cy, R, () => drawBuf(A, R / 1300 * 1.2 + 0.0, cx, cy, clamp((1 - k) * 1.6)));
    ringFX(cx, cy, R, t, ['#9fdcff', '#5fb0ff'], clamp((1 - k) * 1.5) * 0.6); } },
  { t: S0.dino, a: 0.5, b: 0.35, fx(k, t, A, B) {                      // 4. крэш-зум в побережье сквозь облака
    if (k < 0.58) { const q = k / 0.58, s = 1 + Math.pow(q, 2.4) * 7; for (let i = 3; i >= 0; i--) drawBuf(A, s * (1 - i * 0.04 * q), 430, 660, i ? 0.25 : 1); whiteOut(Math.pow(q, 3) * 0.95); }
    else { const q = (k - 0.58) / 0.42; drawBuf(B, 1.25 - 0.25 * sm(q)); whiteOut((1 - q) * 0.95); for (let i = 0; i < 8; i++) { const r = rng(i * 5); glow(r() * W, r() * H, 300 + r() * 300, 'rgba(255,255,255,1)', 0.8 * (1 - q), 'source-over'); } } } },
  { t: S0.ice, a: 0.45, b: 0.45, fx(k, t, A, B) {                      // 5. мир замерзает и раскалывается
    if (k < 0.5) { const f = k / 0.5; drawBuf(A); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); S = 1; ctx.globalAlpha = 0.5 * f; ctx.fillStyle = '#cfe8ff'; ctx.fillRect(0, 0, W, H); ctx.restore();
      for (let i = 0; i < 70 * f; i++) { const r = rng(i * 13 + 1), side = i % 4, L = 80 + r() * 380 * f; let x, y, a; if (side === 0) { x = r() * W; y = 0; a = Math.PI / 2; } else if (side === 1) { x = r() * W; y = H; a = -Math.PI / 2; } else if (side === 2) { x = 0; y = r() * H; a = 0; } else { x = W; y = r() * H; a = Math.PI; } a += (r() - 0.5) * 1.2;
        ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); S = 1; pencil([[x, y], [x + Math.cos(a) * L, y + Math.sin(a) * L]], { w: 3, col: '#ffffff', a: 0.9, pass2: false, gap: false }); for (let b = 1; b < 4; b++) { const bx = x + Math.cos(a) * L * b / 4, by = y + Math.sin(a) * L * b / 4; pencil([[bx, by], [bx + Math.cos(a + 0.7) * 40, by + Math.sin(a + 0.7) * 40]], { w: 2, col: '#ffffff', a: 0.8, pass2: false }); } ctx.restore(); } }
    else { const q = (k - 0.5) / 0.5; drawBuf(B);
      for (let gy = 0; gy < 6; gy++) for (let gx = 0; gx < 4; gx++) { const r = rng(gx * 17 + gy * 31), x0 = gx * 270, y0 = gy * 320, jx = (r() - 0.5) * 80, jy = (r() - 0.5) * 80;
        const pts = [[x0 + jx * 0.2, y0], [x0 + 270, y0 + jy * 0.3], [x0 + 270 + jx * 0.2, y0 + 320], [x0, y0 + 320 + jy * 0.2]];
        const cxp = x0 + 135, cyp = y0 + 160, vx = (cxp - 540) * 1.6 * q, vy = (cyp - 960) * 1.0 * q + 1600 * q * q, rot = (r() - 0.5) * 2 * q;
        ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(cxp + vx, cyp + vy); ctx.rotate(rot); ctx.translate(-cxp, -cyp); ctx.beginPath(); ctx.moveTo(...pts[0]); pts.forEach(p => ctx.lineTo(...p)); ctx.closePath(); ctx.clip();
        ctx.globalAlpha = 1 - q * 0.4; ctx.drawImage(A, 0, 0); ctx.fillStyle = 'rgba(210,235,255,0.45)'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); } } } },
  { t: S0.lenape, a: 0.2, b: 0.22, fx(k, t, A, B) {                       // 6. хлыст-панорама
    const off = sm(k) * W * 1.15; smear(A, 160, 0, 4, -off); smear(B, 160, 0, 4, W * 1.15 - off);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); S = 1; const r = rng(hsh(FRAME, 3)); for (let i = 0; i < 30; i++) pencil([[r() * W, r() * H], [r() * W + 500, 0]].map((p, j) => j ? [p[0], r() * H] : p).map(p => [p[0], p[1]]), { w: 2, col: '#fff6e0', a: 0.35, pass2: false }); ctx.restore(); } },
  { t: S0.dutch, a: 0.35, b: 0.4, fx(k, t, A, B) {                      // 7. дым костра заволакивает и рассеивается
    drawBuf(k < 0.47 ? A : B); const d = Math.sin(clamp(k) * Math.PI);
    for (let i = 0; i < 22; i++) { const r = rng(i * 7 + 2), x = r() * W, y = H - (r() * H * 1.2) * clamp(k * 1.6) , R = 260 + r() * 420; glow(x + Math.sin(t * 2 + i) * 40, y, R, i % 2 ? 'rgba(206,198,188,1)' : 'rgba(176,170,164,1)', 0.85 * d, 'source-over'); }
    whiteOut(d * 0.25, '200,194,186'); } },
  { t: S0.bridge, a: 0.4, b: 0.35, fx(k, t, A, B) {                      // 8. монета-гульден летит в камеру и открывает окно в новую эпоху
    const cx = 540, cy = 980, R = 26 + Math.pow(k, 2.2) * 1700, fl = Math.cos(k * 18);
    drawBuf(A); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); S = 1; ctx.translate(cx, cy); ctx.scale(Math.max(0.12, Math.abs(fl)) * (k > 0.6 ? 1 : 1), 1);
    const g = ctx.createRadialGradient(-R * 0.3, -R * 0.3, R * 0.1, 0, 0, R); g.addColorStop(0, '#f6dc8a'); g.addColorStop(1, '#a8781e'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, R, 0, 6.3); ctx.fill();
    pencil(ellPts(0, 0, R, R, 0, 0.05, 80), { w: 4 + R * 0.01, col: '#5a3a08', pass2: false }); pencil(ellPts(0, 0, R * 0.86, R * 0.86, 0, 0.05, 80), { w: 2 + R * 0.006, col: '#7a5410', pass2: false });
    if (k < 0.62) txt('60', 0, 0, R * 0.8, { col: '#5a3a08', font: 'Osw', a: 0.85 }); ctx.restore();
    if (k > 0.55) inCircle(cx, cy, R * 0.86 * clamp((k - 0.55) / 0.3), () => drawBuf(B, 1.25 - 0.25 * k, cx, cy)); } },
  { t: S0.liberty, a: 0.3, b: 0.35, fx(k, t, A, B) {                      // 10. закатное солнце вспыхивает бликом
    drawBuf(A); drawBuf(B, 1, 540, 960, sm(k)); const d = Math.sin(k * Math.PI);
    glow(540, 820, 900, 'rgba(255,214,150,1)', d, 'lighter'); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(0, 0, W, 0); g.addColorStop(0, 'rgba(255,190,120,0)'); g.addColorStop(0.5, 'rgba(255,230,190,0.9)'); g.addColorStop(1, 'rgba(255,190,120,0)'); ctx.globalAlpha = d; ctx.fillStyle = g; ctx.fillRect(0, 806, W, 28); ctx.restore(); whiteOut(d * 0.4); } },
  { t: S0.empire, a: 0.45, b: 0.35, fx(k, t, A, B) {                      // 11. зум в пламя факела → искры клёпки
    const tx = 945, ty = 250;
    if (k < 0.56) { const q = k / 0.56; drawBuf(A, 1 + Math.pow(q, 2.5) * 12, tx, ty, 1, null, (540 - tx) * sm(q), (900 - ty) * sm(q)); glow(tx, ty, 200 + q * 1400, 'rgba(255,150,50,1)', q, 'source-over'); }
    else { const q = (k - 0.56) / 0.44; drawBuf(B, 1.2 - 0.2 * sm(q)); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1 - q; ctx.fillStyle = '#ff8a32'; ctx.fillRect(0, 0, W, H); ctx.restore();
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); S = 1; for (let i = 0; i < 40; i++) { const r = rng(i * 3), a = r() * 6.283, d = (200 + r() * 900) * q; pencil([[540 + Math.cos(a) * d * 0.7, 960 + Math.sin(a) * d * 0.7], [540 + Math.cos(a) * d, 960 + Math.sin(a) * d]], { w: 3, col: '#ffc060', a: 1 - q, pass2: false, gap: false }); } ctx.restore(); } } },
  { t: S0.today, a: 0.3, b: 0.4, fx(k, t, A, B) {                       // 12. гиперлапс: дни мелькают, следы фар
    drawBuf(A, 1, 540, 960, 1 - sm(k)); drawBuf(B, 1, 540, 960, sm(k)); const fl = Math.sin(k * 60) * 0.5 + 0.5; whiteOut(fl * 0.25 * Math.sin(k * Math.PI), fl > 0.5 ? '255,240,210' : '20,20,60');
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); S = 1; for (let i = 0; i < 16; i++) { const r = rng(i * 11), y = 1100 + r() * 500; pencil([[-100 + k * 300, y], [W + 100, y + (r() - 0.5) * 40]], { w: 3 + r() * 4, col: i % 3 ? '#ff4a3a' : '#fff6d8', a: 0.7 * Math.sin(k * Math.PI), pass2: false, gap: false }); } ctx.restore(); } },
  { t: S0.button, a: 0.35, b: 0.45, fx(k, t, A, B) {                     // 13. воронка-портал в следующий город
    const cx = 540, cy = 900, R = Math.pow(sm(k), 1.5) * 1500;
    drawBuf(A, 1, cx, cy, 1, null, 0, 0, k * 0.4); inCircle(cx, cy, R, () => drawBuf(B, 1.4 - 0.4 * k, cx, cy, 1, null, 0, 0, (1 - k) * -0.6)); ringFX(cx, cy, R, t, ['#c8a0ff', '#7fe0ff', '#ffd890'], clamp(1.4 - k)); } }
];
