/* 025 — сцена `button`: та же площадь, что в хуке (планы window.WQ). На «Отличишь копию» над домами всплывают две бирки «КОПИЯ?» /
   «СРЕДНЕВЕКОВЬЕ?», на «Пиши» Том поворачивается в камеру с кистью, на «Пиши» выскакивает «ПОДПИШИСЬ» (EV.endcard) и висит до конца;
   после голоса — тот же кадр ≤ 0,8 с, музыка затухает (одна концовка, без возврата в хук — владелец 12.11.2026). */
(() => {
  EV.bt_q = wtk('x1', 'Отличишь');
  EV.bt_write = wtk('x1', 'Пиши');
  EV.bt_go = wtk('x1', 'отмотаем!');
  EV.endcard = wtk('x1', 'Пиши');
  KEYW.push('копию', 'Пиши');
  const L = WA.ink, Q = window.WQ;
  WORLD.button = (t, u, cat) => {
    lay(40, () => Q.sky(t));
    lay(16, () => Q.far(t));
    lay(6, () => Q.row(t, { done: 1 }));
    lay(4.5, () => Q.ground(t));
    lay(3.2, () => Q.square(t, {}));
    lay(1, () => { lightPool(560, 1640, 600, 140, 'rgba(255,214,150,1)', 0.3); castShadow(330, 1610, 160, 420, Math.PI * 0.86, 0.4); Q.easelFrame(t); cat(); });
    lay(2, () => motes(18, [0, 600, 1100, 1500], '#ffe8b0', t, 2531, { sp: 4, sz: 2, a: 0.45, wob: 16, add: 1 }));
    lay(0.62, () => Q.front(t));
    shaft(1150, 300, 260, 1600, 0.45, 'rgba(255,220,160,1)', 0.12);
  };
  function hud(t) {
    if (t > EV.bt_q && t < EV.bt_write) { for (const [x, s, d] of [[300, 'КОПИЯ?', 0], [780, 'СРЕДНЕВЕКОВЬЕ?', 0.25]]) { const q = popK(t, EV.bt_q + d, 0.3); if (q <= 0) continue; push(x, 760, q, x < 500 ? -0.06 : 0.06); rect(-150, -40, 300, 80, { wash: '#16120e', washA: 0.9, w: 3, col: WA.gold }); txt(s, 0, 12, s.length > 8 ? 34 : 44, { col: WA.goldL, font: 'Osw' }); pop(); } }
  }
  DIR.button = {
    outfit: 'hoodieWA', light: { side: 1, rim: '#ffd890' }, grade: ['#f0a050', 0.08],
    act: () => [[S0.button, 'grin'], [EV.bt_q, 'suspicious'], [EV.bt_write, 'wink'], [EV.bt_go, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1610, s: 0.98, look: t < EV.bt_write ? [0.7, -0.4] : [0, 0], prop: 'brush', propAng: t > EV.bt_go ? -1.2 : -0.4, hand: t > EV.bt_write ? [180, -440] : [160, -300], point: t > EV.bt_write && t < EV.bt_go }),
    cam: () => [[S0.button, 560, 980, 0.08], [EV.bt_q, 540, 940, 0.02], [EV.bt_write - 0.3, 440, 1080, 0.12], [EV.bt_write + 0.3, 520, 1290, 0.02], [DUR, 520, 1300, 0.04]],
    hud
  };
  TRANS_IN.button = { a: 0.1, b: 0.25, fx(k, t, A, B) { drawBuf(k < 0.5 ? A : B); scr(() => { ctx.save(); ctx.globalAlpha = Math.sin(k * Math.PI) * 0.8; ctx.fillStyle = WA.gold; ctx.beginPath(); ctx.arc(540, 960, 1400 * Math.sin(k * Math.PI), 0, 6.283); ctx.fill(); ctx.restore(); }); } };
})();
