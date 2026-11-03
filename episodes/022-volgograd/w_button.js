/* 022 — сцена `button`: тот же закат на вершине Мамаева кургана (планы window.VQ из хука). Том с часами зовёт в комментарии,
   над Волгой раскрывается портал часов с постерами следующих городов недели. Последние 0,9 с портал гаснет, камера поднимается
   к мечу — в ракурс первого кадра хука (петля), звук — тот же удар. Переход В сцену — багровое кольцо из часов раскрывает кадр. */
(() => {
  EV.bt_point = wtk('x1', 'Пиши');
  EV.bt_wink = wtk('x1', 'отмотаем!');
  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9) * (1 - sm((t - (DUR - 1.0)) / 0.6));
    lay(40, () => VQ.sky(t));
    lay(18, () => VQ.far(t));
    lay(5, () => VQ.statues(t, { lib: 1 - sm((t - (DUR - 0.55)) / 0.4), tape: false, q: false }));
    lay(4.5, () => { if (open <= 0) return; const cx = 600, cy = 760, R = 330 * open;
      glow(cx, cy, R * 1.35, 'rgba(255,170,120,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,230,200,0.9)'); g.addColorStop(0.5, 'rgba(70,24,34,0.75)'); g.addColorStop(1, 'rgba(20,10,16,0.9)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', VG.crimL, VG.steelL][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['ТВЕРЬ', '#2a4a3a', '#c8e0a0', 'col'], ['ПЕКИН', '#8a1a1a', '#f0c070', 'tower'], ['ВАРШАВА', '#3a2a5a', '#e8c0a0', 'tower'], ['?', '#3a5a8a', '#e8b07a', 'fuji']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); poster(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.5 + 0.12 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); }); });
    lay(3, () => VQ.mid(t));
    lay(1, () => { VQ.ground(t); cat(); });
    lay(0.62, () => VQ.front(t));
    motes(36, [-200, 300, 1300, 1500], '#ffd0a0', t, 23100, { sp: 20, vx: 60, sz: 2.6, a: 0.5, wob: 18 });
    haze('#e87a5a', 0.06);
  };
  DIR.button = {
    outfit: 'hoodieV', light: { side: -1, rim: '#ff9a6a' }, grade: ['#b04a40', 0.12],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink'], [DUR - 0.5, 'shock']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 270, y: 1500, s: 1.06, look: t < EV.portal + 0.3 ? [0.3, -0.6] : t > DUR - 0.6 ? [0.6, -0.8] : [0, 0.05], watchInHand: t < DUR - 0.6, glow: (0.4 + 0.6 * sm((t - EV.portal) / 0.8)) * (t < DUR - 0.6 ? 1 : 0), spin: 0.5,
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : [-80, -150], tilt: t > EV.bt_wink && t < DUR - 0.6 ? 0.08 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 540, 1020, 0.14], [EV.portal, 560, 900, 0.0], [EV.bt_point + 0.2, 560, 940, 0.06, 'x'], [EV.bt_wink, 580, 960, 0.1], [DUR - 0.9, 700, 700, 0.2], [DUR, 760, 520, 0.3, 'x']],
    afterCat: (t, u, P) => { if (!P.watchInHand) return; const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,190,140,0.6)', 0.25 * P.glow, 10, t * 2); }
  };
  TRANS_IN.button = { a: 0.2, b: 0.35, fx(k, t, A, B) {            // багровое кольцо из часов раскрывает кадр кнопки
    drawBuf(A); const R = Math.pow(sm(k), 1.4) * 2200 + 10; inCircle(560, 1000, R, () => drawBuf(B)); scr(() => ringFX(560, 1000, R, t, ['#ffd890', VG.crimL, '#14100c'], Math.sin(Math.PI * k)));
  } };
})();
