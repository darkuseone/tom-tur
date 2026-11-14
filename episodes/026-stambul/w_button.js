/* 026 — сцена `button`: та же палуба ночного парома (планы window.TQ). Том поворачивается к зрителю: на «Стамбул» слева выскакивает
   «СТАМБУЛ?», на «Константинополь» справа — «КОНСТАНТИНОПОЛЬ?»; на «Пиши» Том салютует стаканом в камеру и выскакивает
   «ПОДПИШИСЬ» (EV.endcard) — до конца ролика; на «отмотаем» — подмигивание. Одна концовка: после голоса ≤ 0,8 с того же кадра. */
(() => {
  EV.bt_q = wtk('x1', 'говоришь');
  EV.bt_st = wtk('x1', 'Стамбул');
  EV.bt_kp = wtk('x1', 'Константинополь?');
  EV.bt_write = wtk('x1', 'Пиши');
  EV.bt_go = wtk('x1', 'отмотаем!');
  EV.endcard = wtk('x1', 'Пиши');
  KEYW.push('Стамбул', 'Константинополь?');
  WORLD.button = (t, u, cat) => {
    const Q = window.TQ;
    lay(40, () => Q.sky(t));
    lay(16, () => Q.shores(t));
    lay(8, () => Q.water(t));
    lay(2.6, () => Q.deck(t));
    lay(1, () => { Q.floor(t); cat(); });
    lay(0.6, () => Q.front(t));
    lay(3, () => motes(24, [-100, 600, 1200, 1300], '#c8d8ff', t, 3055, { sp: 2, sz: 2, a: 0.4, wob: 20, add: 1 }));
  };
  DIR.button = {
    outfit: 'hoodieIST', light: { side: -1, rim: '#8ac0ff' }, grade: ['#1a1a40', 0.08],
    act: () => [[S0.button, 'suspicious'], [EV.bt_st, 'grin'], [EV.bt_kp, 'sideeye'], [EV.bt_write, 'proud'], [EV.bt_go, 'wink']],
    pose: (t, u, b) => { const sal = t > EV.bt_write - 0.1; return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t < EV.bt_st ? [0.6, -0.3] : t < EV.bt_kp ? [-0.7, -0.4] : t < EV.bt_write ? [0.8, -0.4] : [0, 0],
      hand: sal ? [170, -470] : [150, -300], tailUp: t > EV.bt_write }); },
    afterCat: (t, u, P) => teaGlass(P.x + P.hand[0] * P.s + 6, P.y + P.hand[1] * P.s + 30, 1.2),
    cam: () => [[S0.button, 560, 1000, 0.1], [EV.bt_st, 520, 1000, 0.12], [EV.bt_kp, 600, 1000, 0.12], [EV.bt_write, 500, 1330, 0.06, 'x'], [DUR, 500, 1350, 0.08]],
    hud: t => { for (const [ev, x, y, s, r, end] of [[EV.bt_st, 270, 690, 'СТАМБУЛ?', -0.06, EV.bt_write], [EV.bt_kp, 760, 770, 'КОНСТАНТИНОПОЛЬ?', 0.06, EV.bt_write]]) if (t > ev - 0.05 && t < end + 0.1) { const q = popK(t, ev - 0.05, 0.3), f = clamp((end + 0.1 - t) / 0.2);
      push(x, y, q, r); ctx.save(); ctx.globalAlpha = f; ctx.font = '600 50px Osw'; const w = ctx.measureText(s).width + 60; ctx.restore(); rect(-w / 2, -50, w, 100, { wash: '#0a0a1a', washA: 0.9 * f, w: 3, col: IS.goldL }); txt(s, 0, 2, 50, { col: IS.goldL, font: 'Osw', a: f }); pop(); } }
  };
})();
