/* 027 — сцена `button`: та же ночная пристань (window.TQ). На «купил» выскакивают «ДА?» и «НЕТ?», на «Пиши» Том салютует
   лотерейным билетом и выскакивает «ПОДПИШИСЬ» (EV.endcard) — до конца; на «отмотаем» — подмигивание. Одна концовка, хвост ≤ 0,8 с. */
(() => {
  EV.bt_q = wtk('x1', 'купил');
  EV.bt_opera = wtk('x1', 'оперы?');
  EV.bt_write = wtk('x1', 'Пиши');
  EV.bt_go = wtk('x1', 'отмотаем!');
  EV.endcard = wtk('x1', 'Пиши');
  KEYW.push('оперы?');
  WORLD.button = (t, u, cat) => { const Q = window.TQ; lay(40, () => Q.sky(t)); lay(18, () => Q.city(t)); lay(6, () => Q.opera(t)); lay(2.6, () => Q.quay(t)); lay(1, () => { Q.ground(t); cat(); }); lay(0.6, () => Q.front(t)); lay(2.2, () => motes(24, [-100, 700, 1200, 1400], '#c8d8ff', t, 3620, { sp: 2, sz: 2, a: 0.4, wob: 20, add: 1 })); };
  DIR.button = {
    outfit: 'hoodieSYD', light: { side: 1, rim: '#c8a0ff' }, grade: ['#1a1a40', 0.06],
    act: () => [[S0.button, 'suspicious'], [EV.bt_opera, 'grin'], [EV.bt_write, 'proud'], [EV.bt_go, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t < EV.bt_write ? [0.6, -0.3] : [0, 0], hand: t > EV.bt_write - 0.1 ? [170, -470] : [170, -300], tailUp: t > EV.bt_write }),
    afterCat: (t, u, P) => { if (t < EV.bt_write - 0.1) return; const q = popK(t, EV.bt_write - 0.1, 0.3); push(P.x + P.hand[0] * P.s + 50, P.y + P.hand[1] * P.s - 50, 1.3 * q, -0.15); rect(-90, -40, 180, 80, { wash: '#f2e6c8', washA: 1, w: 2, col: SY.ink }); txt('OPERA', 0, -12, 26, { col: SY.red, font: 'Osw' }); txt('LOTTERY', 0, 18, 20, { col: '#3a2a1a', font: 'Osw' }); pop(); },
    cam: () => [[S0.button, 560, 1000, 0.08], [EV.bt_opera, 600, 1000, 0.1], [EV.bt_write, 500, 1330, 0.06, 'x'], [DUR, 500, 1350, 0.08]],
    hud: t => { for (const [ev, x, y, s, r] of [[EV.bt_q, 300, 700, 'ДА?', -0.06], [EV.bt_q + 0.3, 760, 760, 'НЕТ?', 0.06]]) if (t > ev - 0.05 && t < EV.bt_write + 0.1) { const q = popK(t, ev - 0.05, 0.3), f = clamp((EV.bt_write + 0.1 - t) / 0.2);
      push(x, y, q, r); rect(-110, -50, 220, 100, { wash: '#0a0a1a', washA: 0.9 * f, w: 3, col: SY.goldL }); txt(s, 0, 2, 56, { col: SY.goldL, font: 'Osw', a: f }); pop(); } }
  };
})();
