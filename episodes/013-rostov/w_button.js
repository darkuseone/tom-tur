/* 013 — сцена `button`: закат на набережной Дона, та же стела «РОСТОВ-НА-ДОНУ», мост в огнях. Над рекой открывается портал
   часов с постерами следующих городов; Том с часами зовёт в комментарии. Последние 0,9 с камера возвращается в кадр хука (петля).
   Переход В сцену — стрелка часов обегает циферблат ВПЕРЁД (в хуке — назад): из 1749 обратно в 2026. */
(() => {
  EV.bt_point = wtk('x1', 'Пиши');
  EV.bt_wink = wtk('x1', 'отмотаем!');

  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9) * (1 - sm((t - (DUR - 1.0)) / 0.6));
    lay(30, () => { vgrad(-900, 1000, ['#3a4a8a', '#d88a5a', '#f6c890'], 1); ell(-120, 820, 120, 120, { wash: '#ffd090', washA: 1, line: false }); glow(-120, 820, 420, 'rgba(255,170,100,1)', 0.5);
      for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 160 + i * 80 + Math.sin(k) * 10, 72, 24, { wash: '#f8d8c0', washA: 0.8, line: false }); } });
    lay(12, () => { const g = shape([[-600, 980], [-600, 780], [-200, 740], [300, 760], [800, 720], [1700, 760], [1700, 980]], { wash: '#6a7a4a', washA: 1, w: 2, col: '#2a3418' });
      [[-560, 140, 200, '#d8c0a8'], [-400, 120, 260, '#c8b098'], [560, 150, 230, '#d0b8a0'], [720, 130, 280, '#b8a890'], [1040, 140, 300, '#c8b49c']].forEach(([x, w, h, c], i) => cityBlock(x, 800, w, h, c, t, { seed: 13900 + i, on: 0.7, wa: 0.9 })); cathedral(200, 790, 0.7, t); });
    lay(7, () => { don(980, t, { h: 340, dusk: 1, seed: 13910 }); bridge(900, 1000, 0.62, t, { night: true }); });
    if (open > 0) lay(5, () => { const cx = 540, cy = 640, R = 380 * open;
      glow(cx, cy, R * 1.35, 'rgba(255,200,120,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(0.5, 'rgba(200,120,60,0.6)'); g.addColorStop(1, 'rgba(40,20,40,0.6)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', '#f1d27a', '#c99636'][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['Л.-А.', '#3a5a8a', '#f0c070', 'col'], ['ПАРИЖ', '#3a5a8a', '#e8b07a', 'eiffel'], ['БАРСЕЛОНА', '#8a3a2a', '#f0c070', 'tower'], ['?', '#2a4a3a', '#c8e0a0', 'fuji']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); poster(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.6 + 0.14 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); });
    });
    lay(3, () => { rect(-600, 1310, 2300, 60, { wash: '#a89e8c', washA: 1, w: 2.4, col: '#3a3630' }); for (let x = -560; x < 1700; x += 60) rect(x, 1286, 30, 24, { wash: '#988e7c', washA: 1, w: 1.4, col: '#3a3630' });
      for (const lx of [-300, 140, 1180, 1600]) { pencil([[lx, 1310], [lx, 1010]], { w: 8, col: '#2a2a32' }); ell(lx, 1000, 26, 18, { wash: '#ffe6a0', washA: 1, w: 2, col: '#2a2a32' }); glow(lx, 1000, 90, 'rgba(255,220,140,1)', 0.7); } });
    lay(1, () => { const g = shape([[-500, 1370], [1600, 1370], [1600, 2400], [-500, 2400]], { wash: '#9a8e7c', washA: 1, w: 1, col: '#000', a: 0.2 }); ctx.save(); ctx.clip(g.path); for (let x = -480; x < 1600; x += 80) for (let y = 1380; y < 2400; y += 46) rect(x + (Math.floor(y / 46) % 2) * 40, y, 78, 44, { wash: (x + y) % 3 ? '#a89c88' : '#948870', washA: 0.7, w: 1, col: '#4a4438', a: 0.4 }); ctx.restore();
      stele(760, 1440, 0.95, t, ['РОСТОВ-НА-ДОНУ', 'ОСНОВАН · 1749'], { kind: 'modern', w: 560, h: 170, size: 56 }); cat(); });
    motes(30, [0, 300, W, 1700], '#ffd8b0', t, 13920, { sp: -14, sz: 2.4, a: 0.5, tw: 1, add: 1 });
  };
  DIR.button = {
    outfit: 'hoodieR', light: { side: -1, rim: '#ffc890' }, grade: ['#a06050', 0.14],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink'], [DUR - 0.5, 'shock']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 330, y: 1480, s: 1.06, look: t < EV.portal + 0.3 ? [0.2, -0.5] : t > DUR - 0.6 ? [0.7, -0.1] : [0, 0.05], watchInHand: t < DUR - 0.6, glow: (0.4 + 0.6 * sm((t - EV.portal) / 0.8)) * (t < DUR - 0.6 ? 1 : 0), spin: 0.5,
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : [-80, -150], tilt: t > EV.bt_wink && t < DUR - 0.6 ? 0.08 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 600, 1160, 0.18], [EV.portal, 560, 1000, 0.0], [EV.bt_point + 0.2, 570, 1040, 0.06, 'x'], [EV.bt_wink, 580, 1060, 0.06], [DUR - 0.9, 620, 1160, 0.12], [DUR, 640, 1200, 0.16, 'x']],
    afterCat: (t, u, P) => { if (!P.watchInHand) return; const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,140,0.6)', 0.25 * P.glow, 10, t * 2); }
  };
  TRANS_IN.button = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {      // стрелка обегает циферблат вперёд и открывает 2026
    const a = sm(k) * 6.283, cx = 540, cy = 960; drawBuf(A);
    const P = new Path2D(); P.moveTo(cx, cy); for (let q = 0; q <= 40; q++) { const an = -Math.PI / 2 + a * q / 40; P.lineTo(cx + Math.cos(an) * 2400, cy + Math.sin(an) * 2400); } P.closePath(); inPath(P, () => drawBuf(B, 1.06 - 0.06 * sm(k)));
    scr(() => { pencil(ellPts(cx, cy, 420, 420, 0, 0, 80), { w: 16, col: '#2a2420', a: 0.8 * Math.sin(k * Math.PI), pass2: false }); push(cx, cy, 1, -Math.PI / 2 + a); rect(0, -10, 900, 20, { wash: '#2a2420', washA: 1, w: 2, col: '#000' }); pop(); ell(cx, cy, 24, 24, { wash: RS.gold, washA: 1, w: 2, col: '#6a4a08' }); });
  } };
})();
