/* 018 — сцена `button`: «Уфа-Арена» (как в хуке), портал часов с постерами следующих городов; Том с часами зовёт в комментарии.
   Последние 0,9 с камера возвращается к свитеру «САЛАВАТ» и шайбе — первый кадр хука (петля). Переход В сцену — вспышка-лучи. */
(() => {
  EV.bt_point = wtk('x1', 'Пиши');
  EV.bt_wink = wtk('x1', 'отмотаем!');

  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9) * (1 - sm((t - (DUR - 1.0)) / 0.6));
    lay(20, () => { vgrad(-900, 1000, ['#141a2a', '#2a3450', '#4a5a7a'], 1); for (let q = 0; q < 8; q++) glow(-300 + q * 260, 300, 120, 'rgba(255,250,230,1)', 0.35); stands(t, { cheer: true }); });
    if (open > 0) lay(5, () => { const cx = 540, cy = 640, R = 380 * open;
      glow(cx, cy, R * 1.35, 'rgba(255,200,120,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(0.5, 'rgba(40,120,80,0.6)'); g.addColorStop(1, 'rgba(10,30,30,0.6)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', '#f1d27a', '#c99636'][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['КАЗАНЬ', '#2a5a3a', '#f0c070', 'tower'], ['РИМ', '#5a3a2a', '#f0c070', 'col'], ['ТОКИО', '#2a4a3a', '#c8e0a0', 'fuji'], ['?', '#3a5a8a', '#e8b07a', 'eiffel']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); poster(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.6 + 0.14 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); });
    });
    lay(3, () => { rink(t); jersey(860, 1110, 0.62, t, { rot: 0.04, num: '1' }); puck(1180, 1330, 0.7); });
    lay(1, () => { const g = shape([[-500, 1470], [1600, 1470], [1600, 2400], [-500, 2400]], { wash: '#d8e6ee', washA: 1, w: 1, col: '#000', a: 0.2 }); hatch(g.path, g.bb, { gap: 14, a: 0.1, col: '#8aa8b8', ang: 0.2, w: 1 }); cat(); });
    motes(30, [0, 300, W, 1700], '#e8f4ff', t, 18920, { sp: -14, sz: 2.4, a: 0.5, tw: 1, add: 1 });
  };
  DIR.button = {
    outfit: 'hoodieUFA', light: { side: 1, rim: '#ffc890' }, grade: ['#6a7a9a', 0.08],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink'], [DUR - 0.5, 'shock']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 320, y: 1480, s: 1.06, look: t < EV.portal + 0.3 ? [0.2, -0.5] : t > DUR - 0.6 ? [0.5, -0.7] : [0, 0.05], watchInHand: t < DUR - 0.6, glow: (0.4 + 0.6 * sm((t - EV.portal) / 0.8)) * (t < DUR - 0.6 ? 1 : 0), spin: 0.5,
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : [-80, -150], tilt: t > EV.bt_wink && t < DUR - 0.6 ? 0.08 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 600, 1160, 0.18], [EV.portal, 560, 1000, 0.0], [EV.bt_point + 0.2, 570, 1040, 0.06, 'x'], [EV.bt_wink, 580, 1060, 0.06], [DUR - 0.9, 760, 1120, 0.14], [DUR, 820, 1120, 0.2, 'x']],
    afterCat: (t, u, P) => { if (!P.watchInHand) return; const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,140,0.6)', 0.25 * P.glow, 10, t * 2); }
  };
  TRANS_IN.button = { a: 0.3, b: 0.4, runA: 1, fx(k, t, A, B) {      // крест вспыхивает и раскрывает кадр лучами
    const q = sm(k), cx = 540, cy = 520; drawBuf(A); const R = Math.pow(q, 1.3) * 2200 + 1; inCircle(cx, cy, R, () => drawBuf(B, 1.06 - 0.06 * q));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI); rays(cx, cy, 0, 6.28, 900 * f + 100, 'rgba(255,245,210,0.7)', 0.6 * f, 16, t); push(cx, cy, 1 + f); pencil([[0, -60], [0, 60]], { w: 16, col: '#fff6d8', a: f, pass2: false }); pencil([[-40, -20], [40, -20]], { w: 16, col: '#fff6d8', a: f, pass2: false }); pop(); glow(cx, cy, 200, 'rgba(255,240,200,1)', f); });
  } };
})();
