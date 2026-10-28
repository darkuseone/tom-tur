/* 019 — сцена `button`: та же ночная гора над Енисеем, что в хуке (планы из window.ZS). Том с часами зовёт в комментарии, в небе
   раскрывается портал часов с постерами следующих городов. Последние 0,9 с портал гаснет, камера возвращается к ракурсу первого
   кадра хука (петля), прожектор идёт по кадру. Переход В сцену — метка навигатора падает с неба и раскрывает кадр. */
(() => {
  EV.bt_point = wtk('x1', 'Пиши');
  EV.bt_wink = wtk('x1', 'отмотаем!');

  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9) * (1 - sm((t - (DUR - 1.0)) / 0.6));
    lay(40, () => ZS.sky(t));
    const portalFx = () => { if (open <= 0) return; const cx = 560, cy = 640, R = 330 * open;
      glow(cx, cy, R * 1.35, 'rgba(255,200,120,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(0.5, 'rgba(60,90,160,0.6)'); g.addColorStop(1, 'rgba(10,16,40,0.6)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', '#f1d27a', '#c99636'][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['КАЗАНЬ', '#2a5a3a', '#f0c070', 'tower'], ['РИМ', '#5a3a2a', '#f0c070', 'col'], ['ТОКИО', '#2a4a3a', '#c8e0a0', 'fuji'], ['?', '#3a5a8a', '#e8b07a', 'eiffel']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); poster(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.5 + 0.12 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); });
    };
    lay(24, () => ZS.far(t));
    lay(12, () => ZS.mount(t));
    lay(8, () => portalFx());
    lay(5, () => ZS.portal(t, 0.15));
    lay(3, () => ZS.beams(t, DUR - 0.9));
    lay(1, () => { snowGround(1440, t, { col: '#d4dff0', colD: '#8a9ec2', seed: 3 }); spruce(-90, 1500, 640, t, 5, { snow: 1, col: '#1e2c3a', colD: '#0a1018', colL: '#4a6a7a', snowCol: '#dfe8f6', w: 0.34 }); spruce(1170, 1520, 700, t, 6, { snow: 1, col: '#1e2c3a', colD: '#0a1018', colL: '#4a6a7a', snowCol: '#dfe8f6', w: 0.34 });
      for (let k = 0; k < 6; k++) { const x = 640 + k * 130, y = 1640 + (k % 2) * 60; push(x, y, 0.9 + k * 0.1); rect(-60, -70, 120, 70, { wash: '#a8b0bc', washA: 1, w: 2, col: '#2a2e38' }); pencil([[-60, -72], [60, -72]], { w: 10, col: '#eef4fb', a: 0.95, pass2: false }); for (const sd of [-1, 1]) rect(sd * 34 - 5, -64, 10, 50, { wash: k % 2 ? '#c8302a' : '#f2f2f2', washA: 1, line: false }); pop(); }
      cat(); });
    lay(0.62, () => { spruce(-260, 2100, 1200, t, 9, { snow: 1, col: '#141e28', colD: '#05080c', snowCol: '#c8d6ec', w: 0.4, tiers: 9 }); pencil([[1240, 2000], [1220, 900]], { w: 30, col: '#2a2c34', pass2: false }); });
    motes(70, [-200, -200, 1300, 2000], '#eef4ff', t, 19021, { sp: 70, vx: -24, sz: 3.2, a: 0.8, wob: 26 });
    haze('#4a5a9a', 0.05);
  };
  DIR.button = {
    outfit: 'hoodieZ', light: { side: 1, rim: '#bcd6ff' }, grade: ['#3a4a8a', 0.12],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink'], [DUR - 0.5, 'shock']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 300, y: 1480, s: 1.08, look: t < EV.portal + 0.3 ? [0.2, -0.6] : t > DUR - 0.6 ? [0.7, -0.3] : [0, 0.05], watchInHand: t < DUR - 0.6, glow: (0.4 + 0.6 * sm((t - EV.portal) / 0.8)) * (t < DUR - 0.6 ? 1 : 0), spin: 0.5,
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : [-80, -150], tilt: t > EV.bt_wink && t < DUR - 0.6 ? 0.08 : t > DUR - 0.3 ? -0.07 : 0, tailUp: t > EV.portal, frost: 0.3 }); },
    cam: () => [[S0.button, 560, 1000, 0.14], [EV.portal, 540, 880, 0.0], [EV.bt_point + 0.2, 560, 940, 0.06, 'x'], [EV.bt_wink, 580, 980, 0.08], [DUR - 0.9, 700, 1040, 0.2], [DUR, 760, 1060, 0.26, 'x']],
    afterCat: (t, u, P) => { if (!P.watchInHand) return; const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,140,0.6)', 0.25 * P.glow, 10, t * 2); }
  };
  TRANS_IN.button = { a: 0.3, b: 0.45, runA: 1, fx(k, t, A, B) {     // метка навигатора падает с неба, её кружок раскрывает кадр
    const drop = sm(clamp(k / 0.45)), cx = 540, cy = lerp(-200, 900, drop * drop);
    drawBuf(A); const R = k > 0.45 ? Math.pow(sm((k - 0.45) / 0.55), 1.4) * 2200 + 30 : 0; if (R > 0) inCircle(cx, 900, R, () => drawBuf(B, 1.1 - 0.1 * sm((k - 0.45) / 0.55)));
    scr(() => { if (k < 0.7) { push(cx, cy, 2.4 * (1 - sm((k - 0.45) / 0.25) * (k > 0.45 ? 1 : 0)) + 0.01); blob([[0, 30], [-30, -10], [-30, -40], [0, -64], [30, -40], [30, -10]], { wash: '#e8402a', washA: 1, w: 3, col: '#6a1a10' }); ell(0, -34, 12, 12, { wash: '#ffffff', washA: 1, line: false }); pop(); } if (k > 0.4 && k < 0.6) whiteOut(0.3, '255,230,220'); });
  } };
})();
