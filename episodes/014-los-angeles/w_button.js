/* 014 — сцена `button`: закат над Голливудскими холмами (как в хуке), портал часов с постерами следующих городов; Том с часами
   зовёт в комментарии. Последние 0,9 с камера возвращается к надписи на холме — первый кадр хука (петля).
   Переход В сцену — луч прожектора из 1942 разворачивается в золотой луч заката и раскрывает кадр. */
(() => {
  EV.bt_point = wtk('x1', 'Пиши');
  EV.bt_wink = wtk('x1', 'отмотаем!');

  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9) * (1 - sm((t - (DUR - 1.0)) / 0.6));
    lay(30, () => { vgrad(-900, 1000, ['#5a4a8a', '#e87a5a', '#f6c890'], 1); ell(1300, 760, 120, 120, { wash: '#ffe0a0', washA: 1, line: false }); glow(1300, 760, 420, 'rgba(255,190,120,1)', 0.5); });
    lay(16, () => ridge(t, { base: 1100, sign: 1, tower: 1, bulbs: true }));
    lay(8, () => { for (let k = 0; k < 9; k++) { const x = -520 + k * 240, h = 80 + (k % 3) * 40; rect(x, 1080 - h, 200, h, { wash: ['#e8d0b8', '#d8b8a0', '#c8c0b0'][k % 3], washA: 1, w: 2, col: '#4a3a2a' }); } for (const [x, h] of [[-300, 420], [-60, 380], [180, 460], [980, 440], [1220, 400], [1440, 470]]) palm(x, 1090, h, t); });
    if (open > 0) lay(5, () => { const cx = 540, cy = 640, R = 380 * open;
      glow(cx, cy, R * 1.35, 'rgba(255,200,120,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(0.5, 'rgba(220,100,90,0.6)'); g.addColorStop(1, 'rgba(40,20,60,0.6)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', '#f1d27a', '#c99636'][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['ПАРИЖ', '#3a5a8a', '#e8b07a', 'eiffel'], ['БАРСЕЛОНА', '#8a3a2a', '#f0c070', 'tower'], ['РИМ', '#5a3a2a', '#f0c070', 'col'], ['?', '#2a4a3a', '#c8e0a0', 'fuji']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); poster(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.6 + 0.14 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); });
    });
    lay(3, () => { rect(-600, 1180, 2300, 120, { wash: '#4a4a52', washA: 1, w: 2, col: '#1a1a1e' }); rect(-600, 1300, 2300, 170, { wash: '#a89890', washA: 1, w: 2, col: '#3a3030' }); });
    lay(1, () => { const g = shape([[-500, 1470], [1600, 1470], [1600, 2400], [-500, 2400]], { wash: '#9a8a84', washA: 1, w: 1, col: '#000', a: 0.2 }); ctx.save(); ctx.clip(g.path); for (let x = -480; x < 1600; x += 90) for (let y = 1480; y < 2400; y += 90) rect(x, y, 88, 88, { wash: '#a89890', washA: 0.6, w: 1, col: '#5a4a48', a: 0.4 }); ctx.restore(); star(760, 1560, 1.2); star(1040, 1560, 1.2); cat(); });
    motes(30, [0, 300, W, 1700], '#ffd8b0', t, 14920, { sp: -14, sz: 2.4, a: 0.5, tw: 1, add: 1 });
  };
  DIR.button = {
    outfit: 'hoodieLA', light: { side: 1, rim: '#ffc890' }, grade: ['#a06050', 0.12],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink'], [DUR - 0.5, 'shock']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 330, y: 1480, s: 1.06, look: t < EV.portal + 0.3 ? [0.2, -0.5] : t > DUR - 0.6 ? [0.5, -0.7] : [0, 0.05], watchInHand: t < DUR - 0.6, glow: (0.4 + 0.6 * sm((t - EV.portal) / 0.8)) * (t < DUR - 0.6 ? 1 : 0), spin: 0.5,
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : [-80, -150], tilt: t > EV.bt_wink && t < DUR - 0.6 ? 0.08 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 600, 1160, 0.18], [EV.portal, 560, 1000, 0.0], [EV.bt_point + 0.2, 570, 1040, 0.06, 'x'], [EV.bt_wink, 580, 1060, 0.06], [DUR - 0.9, 600, 960, 0.14], [DUR, 620, 640, 0.22, 'x']],
    afterCat: (t, u, P) => { if (!P.watchInHand) return; const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,140,0.6)', 0.25 * P.glow, 10, t * 2); }
  };
  TRANS_IN.button = { a: 0.3, b: 0.4, runA: 1, fx(k, t, A, B) {      // луч прожектора раскрывается веером в закат
    const q = sm(k), cx = 540, cy = 1900; drawBuf(A);
    const sp = q * 1.7, P = new Path2D(); P.moveTo(cx, cy); P.lineTo(cx + Math.cos(-Math.PI / 2 - sp) * 3000, cy + Math.sin(-Math.PI / 2 - sp) * 3000); P.lineTo(cx + Math.cos(-Math.PI / 2 + sp) * 3000, cy + Math.sin(-Math.PI / 2 + sp) * 3000); P.closePath(); inPath(P, () => drawBuf(B, 1.06 - 0.06 * q));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI); for (const sd of [-1, 1]) pencil([[cx, cy], [cx + Math.cos(-Math.PI / 2 + sd * sp) * 2400, cy + Math.sin(-Math.PI / 2 + sd * sp) * 2400]], { w: 18, col: '#fff2c8', a: f, pass2: false }); glow(cx, cy - 100, 300, 'rgba(255,230,160,1)', 0.6 * f); });
  } };
})();
