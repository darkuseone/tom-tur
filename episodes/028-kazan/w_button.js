/* 028 — сцена `button`: та же ночная площадь кремля (window.TQ). На «Казань» слева — «КАЗАНЬ?», на «Москва» справа — «МОСКВА?»,
   на «Пиши» Том салютует половником и выскакивает «ПОДПИШИСЬ» (EV.endcard) — до конца; на «отмотаем» — подмигивание. Одна концовка. */
(() => {
  EV.bt_kz = wtk('x1', 'Казань');
  EV.bt_ms = wtk('x1', 'Москва?');
  EV.bt_write = wtk('x1', 'Пиши');
  EV.bt_go = wtk('x1', 'отмотаем!');
  EV.endcard = wtk('x1', 'Пиши');
  KEYW.push('старше', 'Москва?');
  WORLD.button = (t, u, cat) => { const Q = window.TQ; lay(40, () => Q.sky(t)); lay(10, () => Q.kremlinD(t)); lay(2.6, () => Q.square(t)); lay(1, () => { Q.plaza(t); cat(); }); lay(0.6, () => Q.front(t)); lay(2.2, () => motes(24, [-100, 700, 1200, 1400], '#c8e8ff', t, 4010, { sp: 2, sz: 2, a: 0.4, wob: 20, add: 1 })); };
  DIR.button = {
    outfit: 'hoodieKZN', light: { side: 1, rim: '#8ae8d8' }, grade: ['#1a1a40', 0.06],
    act: () => [[S0.button, 'suspicious'], [EV.bt_kz, 'proud'], [EV.bt_ms, 'sideeye'], [EV.bt_write, 'grin'], [EV.bt_go, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t < EV.bt_ms ? [-0.6, -0.4] : t < EV.bt_write ? [0.8, -0.4] : [0, 0], hand: t > EV.bt_write - 0.1 ? [170, -470] : [170, -300], tailUp: t > EV.bt_write }),
    afterCat: (t, u, P) => { if (t < EV.bt_write - 0.1) return; push(P.x + P.hand[0] * P.s, P.y + P.hand[1] * P.s, 1, -0.5); pencil([[0, 60], [0, -200]], { w: 9, col: KZ.woodD, pass2: false }); ell(0, -220, 40, 26, { wash: '#6a6a72', washA: 1, w: 2, col: KZ.ink }); pop(); },
    cam: () => [[S0.button, 560, 1000, 0.08], [EV.bt_ms, 600, 1000, 0.1], [EV.bt_write, 500, 1330, 0.06, 'x'], [DUR, 500, 1350, 0.08]],
    hud: t => { for (const [ev, x, y, s, r] of [[EV.bt_kz, 290, 700, 'КАЗАНЬ?', -0.06], [EV.bt_ms, 780, 760, 'МОСКВА?', 0.06]]) if (t > ev - 0.05 && t < EV.bt_write + 0.1) { const q = popK(t, ev - 0.05, 0.3), f = clamp((EV.bt_write + 0.1 - t) / 0.2);
      push(x, y, q, r); rect(-150, -50, 300, 100, { wash: '#0a0a1a', washA: 0.9 * f, w: 3, col: KZ.goldL }); txt(s, 0, 2, 54, { col: KZ.goldL, font: 'Osw', a: f }); pop(); } }
  };
})();
