/* 002 — общие инструменты переходов. Сами переходы объявляют миры в TRANS_IN[сцена] (A — уходящая эпоха, B — новая). */
function drawBuf(c, s = 1, cx = 540, cy = 960, a = 1, op, dx = 0, dy = 0, rot = 0) {
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; if (op) ctx.globalCompositeOperation = op;
  ctx.translate(cx + dx, cy + dy); if (rot) ctx.rotate(rot); ctx.scale(s, s); ctx.drawImage(c, -cx, -cy); ctx.restore();
}
function inCircle(cx, cy, R, fn) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.arc(cx, cy, Math.max(0.1, R), 0, 6.3); ctx.clip(); fn(); ctx.restore(); }
function inPath(path, fn) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clip(path); fn(); ctx.restore(); }   // клип по произвольной форме (экранные координаты)
function ringFX(cx, cy, R, t, cols, a = 1) {                        // энергетическое кольцо портала: латунь + искры
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); S = 1;
  glow(cx, cy, R * 1.25 + 60, 'rgba(255,210,130,1)', 0.35 * a);
  for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.035), R * (1 - k * 0.035), t * (k % 2 ? 3 : -2), 0.05, 90), { w: 10 - k * 3, col: cols[k % cols.length], a, pass2: false, gap: false });
  for (let i = 0; i < 26; i++) { const r = rng(hsh(FRAME, i)), aa = r() * 6.283, d = R * (0.98 + r() * 0.18); glow(cx + Math.cos(aa) * d, cy + Math.sin(aa) * d, 8 + r() * 18, 'rgba(255,236,180,1)', 0.9 * a); }
  ctx.restore();
}
function smear(c, dx, dy, n = 5, base = 0) { for (let i = n; i >= 0; i--) drawBuf(c, 1, 540, 960, i ? 0.22 : 1, null, base + dx * i / n, dy * i / n); }
function whiteOut(a, col = '255,250,235') { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(a); ctx.fillStyle = `rgb(${col})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function scr(fn) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const pS = S; S = 1; fn(); S = pS; ctx.restore(); }  // рисовать в экранных координатах
