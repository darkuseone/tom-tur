/* 020 — сцена `button`: та же вечерняя набережная Сунжи, что в хуке (планы window.GQ). Том с часами зовёт в комментарии, над башнями
   раскрывается портал часов с постерами следующих городов. Последние 0,9 с портал гаснет, камера уходит в ракурс первого кадра хука
   (петля). Переход В сцену — капля нефти с часов: янтарное кольцо раскрывает кадр. */
(() => {
  EV.bt_point = wtk('x1', 'Пиши');
  EV.bt_wink = wtk('x1', 'отмотаем!');

  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9) * (1 - sm((t - (DUR - 1.0)) / 0.6));
    lay(40, () => GQ.sky(t));
    lay(26, () => GQ.mount(t));
    lay(12, () => GQ.city(t));
    lay(8, () => { if (open <= 0) return; const cx = 600, cy = 700, R = 330 * open;
      glow(cx, cy, R * 1.35, 'rgba(255,200,120,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(0.5, 'rgba(40,30,20,0.7)'); g.addColorStop(1, 'rgba(10,8,6,0.9)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', '#f1d27a', '#c99636'][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['АСТАНА', '#2a5a6a', '#f0c070', 'tower'], ['ПЕКИН', '#6a1a1a', '#f0c070', 'tower'], ['ТВЕРЬ', '#2a4a3a', '#c8e0a0', 'col'], ['?', '#3a5a8a', '#e8b07a', 'fuji']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); poster(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.5 + 0.12 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); }); });
    lay(6, () => { GQ.bridge(t); GQ.river(t); });
    lay(1, () => { GQ.embank(t); cat(); });
    lay(0.62, () => { pencil(spline([[-120, 300], [60, 380], [200, 360], [300, 420]], false, 10), { w: 22, col: '#2a1e14', pass2: false }); for (let k = 0; k < 9; k++) { const x = -60 + k * 44, y = 330 + Math.sin(k) * 50 + Math.sin(t * 1.5 + k) * 6; blob([[x, y], [x + 30, y - 34], [x + 64, y - 6], [x + 50, y + 34], [x + 10, y + 30]], { wash: k % 2 ? '#2a3a1e' : '#3a4a24', washA: 0.95, w: 1.4, col: '#0e0a06', a: 0.6 }); } pencil([[1250, 2100], [1230, 760]], { w: 30, col: '#1e1e24', pass2: false }); ell(1190, 760, 34, 40, { wash: '#fff2c8', washA: 1, w: 2, col: '#3a3020' }); glow(1190, 760, 200, 'rgba(255,210,140,1)', 0.55); });
    motes(30, [-200, 200, 1300, 1500], '#ffd8a0', t, 20021, { sp: 20, vx: 12, sz: 2.6, a: 0.5, wob: 18 });
    haze('#e8a06a', 0.05);
  };
  DIR.button = {
    outfit: 'hoodieG', light: { side: 1, rim: '#ffc88a' }, grade: ['#8a5030', 0.12],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink'], [DUR - 0.5, 'shock']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 300, y: 1480, s: 1.08, look: t < EV.portal + 0.3 ? [0.2, -0.6] : t > DUR - 0.6 ? [0.6, -0.4] : [0, 0.05], watchInHand: t < DUR - 0.6, glow: (0.4 + 0.6 * sm((t - EV.portal) / 0.8)) * (t < DUR - 0.6 ? 1 : 0), spin: 0.5,
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : [-80, -150], tilt: t > EV.bt_wink && t < DUR - 0.6 ? 0.08 : t > DUR - 0.3 ? -0.07 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 560, 1000, 0.14], [EV.portal, 560, 900, 0.0], [EV.bt_point + 0.2, 560, 940, 0.06, 'x'], [EV.bt_wink, 580, 960, 0.1], [DUR - 0.9, 640, 920, 0.24], [DUR, 680, 900, 0.34, 'x']],
    afterCat: (t, u, P) => { if (!P.watchInHand) return; const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,140,0.6)', 0.25 * P.glow, 10, t * 2); }
  };
  TRANS_IN.button = { a: 0.2, b: 0.35, fx(k, t, A, B) {            // янтарное кольцо из часов раскрывает кадр кнопки
    drawBuf(A); const R = Math.pow(sm(k), 1.4) * 2200 + 10; inCircle(560, 1000, R, () => drawBuf(B)); scr(() => ringFX(560, 1000, R, t, ['#ffd890', '#e8a23a', '#14100c'], Math.sin(Math.PI * k)));
  } };
})();
