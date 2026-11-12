/* 024 — сцена `button`: тот же ночной зал музея (планы window.BQ): пустая витрина с пунктиром. Том с часами зовёт в комментарии,
   в круглом окне раскрывается портал часов с постерами следующих городов. Последние 0,9 с портал гаснет, в витрине под лучом
   снова вспыхивает череп, камера возвращается в ракурс первого кадра хука (петля), звук — тот же удар.
   Переход В сцену — свет гаснет щелчком и зажигается уже ночью. */
(() => {
  EV.bt_point = wtk('x1', 'Пиши');
  EV.bt_wink = wtk('x1', 'отмотаем!');
  EV.bt_back = DUR - 0.8;
  SHAKES.push([EV.bt_back + 0.1, 0.25, 9]);
  WORLD.button = (t, u, cat) => {
    const B = window.BQ, open = sm((t - EV.portal) / 0.8) * (1 - sm((t - (DUR - 1.05)) / 0.5)), back = t > EV.bt_back ? sm((t - EV.bt_back) / 0.25) : 0;
    lay(40, () => B.sky(t));
    lay(22, () => B.far(t));
    lay(11, () => { B.mid(t); depthFog('#1a1440', 0.18); });
    lay(8, () => { if (open <= 0) return; const cx = 560, cy = 800, R = 330 * open;
      glow(cx, cy, R * 1.4, 'rgba(255,220,150,1)', 0.5 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.95, R * 0.95, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,246,210,0.92)'); g.addColorStop(0.5, 'rgba(120,30,24,0.8)'); g.addColorStop(1, 'rgba(20,8,10,0.92)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07), t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: [BJ.goldL, BJ.jadeL, BJ.redL][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 0.82, cy + Math.sin(a) * R * 0.82, 30, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['ВАРШАВА', '#3a2a5a', '#e8c0a0', 'tower'], ['ТОКИО', '#8a1a3a', '#f0c070', 'fuji'], ['?', '#1a5a4a', '#e8d07a', 'col'], ['ТВОЙ?', '#2a3a6a', '#c8e0f0', 'tower']].forEach(([s, c1, c2, kd], k) => { const a = t * 0.6 + k * Math.PI / 2, dd = Math.sin(a); poster(cx + Math.cos(a) * R * 0.5, cy + dd * R * 0.3, (0.44 + 0.1 * dd) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); }); });
    lay(6, () => B.wall(t));
    lay(3.2, () => B.cols(t, 0, { lan: 1 }));
    lay(1.7, () => { B.showcase(t, { spot: 1, inside: () => { if (back > 0) { skullPM(B.CX - 12, B.CY, 0.8, { a: back }); if (back < 1) glow(B.CX, B.CY - 20, 260, 'rgba(255,240,190,1)', 0.8 * (1 - back)); } else { skullDash(B.CX, B.CY, 0.8, '#ffe9a8', 0.9); txt('?', B.CX, B.CY - 14, 150, { col: '#ffd24a', font: 'Osw' }); } } }); moodDark(B.CX, 1100, 380, 1250, '#0a0620', 0.6); });
    lay(1, () => { B.floor(t); castShadow(350, 1572, 190, 420, -0.9, 0.4); lightPool(B.CX - 40, 1540, 420, 90, 'rgba(255,225,170,1)', 0.35); cat(); });
    lay(0.62, () => B.front(t));
    lay(2.4, () => motes(26, [300, 430, 1100, 1450], '#fff0c8', t, 2660, { sp: 7, sz: 2.2, a: 0.55, wob: 14, add: 1 }));
    lay(0.8, () => motes(12, [-100, 500, 1200, 1900], '#ffd8a0', t, 2661, { sp: 10, sz: 7, a: 0.22, wob: 30, add: 1 }));
    if (back > 0 && back < 1) whiteOut(0.35 * (1 - back));
  };
  DIR.button = {
    outfit: 'hoodieBJ', light: { side: 1, rim: '#ffe2a8' }, grade: ['#3a1a40', 0.14],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink'], [EV.bt_back, 'awe']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14, end = t > EV.bt_back;
      return Object.assign(b, { x: 350, y: 1572, s: 1.04, look: end ? [0.85, -0.25] : t < EV.portal + 0.3 ? [0.3, -0.7] : [0, 0.05], watchInHand: !end, glow: (0.4 + 0.6 * sm((t - EV.portal) / 0.8)) * (end ? 0 : 1), spin: 0.5,
        prop: end ? 'lantern' : undefined, propAng: -0.2, hand: end ? [150, -330] : [92, -270], handF: pt ? [-120, -250 + wv] : [-80, -150], tilt: t > EV.bt_wink && !end ? 0.08 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 520, 1060, 0.14], [EV.portal, 560, 900, 0.0], [EV.bt_point + 0.2, 560, 940, 0.06, 'x'], [EV.bt_wink, 580, 960, 0.1], [EV.bt_back, 620, 1040, 0.2], [DUR, 640, 1080, 0.3, 'x']],
    afterCat: (t, u, P) => { if (!P.watchInHand) return; const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,230,160,0.6)', 0.25 * P.glow, 10, t * 2); }
  };
  TRANS_IN.button = { a: 0.18, b: 0.3, fx(k, t, A, B) {             // щёлк: свет гаснет и зажигается уже ночью
    if (k < 0.38) { drawBuf(A); whiteOut(k < 0.3 ? (Math.sin(k * 90) > 0 ? 0.25 : 0.85) : 1, '6,4,12'); } else { drawBuf(B); whiteOut(1 - sm((k - 0.38) / 0.5), '6,4,12'); }
  } };
})();
