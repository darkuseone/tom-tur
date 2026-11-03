/* 021 — сцена `button`: тот же золотой вечер у Байтерека (планы window.AQ). Том с часами зовёт в комментарии, над шаром раскрывается
   портал часов с постерами следующих городов недели. Последние 0,9 с портал гаснет, камера уходит в ракурс первого кадра хука,
   пять табличек снова вылетают из-за Байтерека (петля). Переход В сцену — янтарное кольцо из часов раскрывает кадр. */
(() => {
  EV.bt_point = wtk('x1', 'Пиши');
  EV.bt_wink = wtk('x1', 'отмотаем!');
  const NAMES = ['АКМОЛИНСК', 'ЦЕЛИНОГРАД', 'АКМОЛА', 'АСТАНА', 'НУР-СУЛТАН'], COLS = ['#6a4a2a', '#b8302a', '#3a5a3a', AZ.turq, '#2a3a6a'];

  function loopCards(t) {                                          // последние 0,6 с: таблички вылетают, как в первом кадре
    const t0 = DUR - 0.6; if (t < t0) return;
    NAMES.forEach((n, i) => { const k = sm((t - t0 - i * 0.06) / 0.4); if (k <= 0) return; const a = t * 1.6 + i * 1.2566;
      push(700 + Math.cos(a) * 300 * k, 650 + Math.sin(a) * 110 * k, 0.55, Math.sin(a) * 0.3); rect(-210, -46, 420, 92, { wash: COLS[i], washA: 1, w: 3, col: AZ.ink }); txt(n, 0, 4, 56, { col: '#f6ecd6', font: 'Osw' }); pop(); });
  }
  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9) * (1 - sm((t - (DUR - 1.0)) / 0.6));
    lay(40, () => AQ.sky(t));
    lay(18, () => AQ.far(t));
    lay(7, () => AQ.mid(t));
    lay(5, () => { if (open <= 0) return; const cx = 640, cy = 760, R = 330 * open;
      glow(cx, cy, R * 1.35, 'rgba(255,200,120,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(0.5, 'rgba(20,60,70,0.7)'); g.addColorStop(1, 'rgba(8,20,24,0.9)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', AZ.turqL, '#c99636'][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['ВОЛГОГРАД', '#6a1a1a', '#f0c070', 'tower'], ['ТВЕРЬ', '#2a4a3a', '#c8e0a0', 'col'], ['ПЕКИН', '#8a1a1a', '#f0c070', 'tower'], ['?', '#3a5a8a', '#e8b07a', 'fuji']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); poster(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.5 + 0.12 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); }); });
    lay(4, () => loopCards(t));
    lay(1, () => { AQ.ground(t); cat(); });
    lay(0.62, () => AQ.front(t));
    windLines(t, 0.35, [-100, 600, 1200, 1500], 21014);
    motes(34, [-200, 300, 1300, 1500], '#ffe0a0', t, 21015, { sp: 30, vx: 120, sz: 2.6, a: 0.5, wob: 18 });
    haze('#f0a860', 0.05);
  };
  DIR.button = {
    outfit: 'hoodieA', light: { side: -1, rim: '#ffc88a' }, grade: ['#c08040', 0.12],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink'], [DUR - 0.5, 'shock']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 290, y: 1490, s: 1.08, look: t < EV.portal + 0.3 ? [0.3, -0.6] : t > DUR - 0.6 ? [0.6, -0.5] : [0, 0.05], watchInHand: t < DUR - 0.6, glow: (0.4 + 0.6 * sm((t - EV.portal) / 0.8)) * (t < DUR - 0.6 ? 1 : 0), spin: 0.5,
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : [-80, -150], tilt: t > EV.bt_wink && t < DUR - 0.6 ? 0.08 : t > DUR - 0.3 ? -0.07 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 560, 1000, 0.14], [EV.portal, 560, 900, 0.0], [EV.bt_point + 0.2, 560, 940, 0.06, 'x'], [EV.bt_wink, 580, 960, 0.1], [DUR - 0.9, 660, 880, 0.24], [DUR, 700, 860, 0.34, 'x']],
    afterCat: (t, u, P) => { if (!P.watchInHand) return; const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,140,0.6)', 0.25 * P.glow, 10, t * 2); }
  };
  TRANS_IN.button = { a: 0.2, b: 0.35, fx(k, t, A, B) {            // янтарное кольцо из часов раскрывает кадр кнопки
    drawBuf(A); const R = Math.pow(sm(k), 1.4) * 2200 + 10; inCircle(560, 1000, R, () => drawBuf(B)); scr(() => ringFX(560, 1000, R, t, ['#ffd890', AZ.turqL, '#14100c'], Math.sin(Math.PI * k)));
  } };
})();
