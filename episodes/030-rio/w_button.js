/* 030 — сцена `button`: та же смотровая на закате (window.TQ). На «знал» Том поднимает табличку «СТОЛИЦА БРАЗИЛИИ:» — «БРАЗИЛИА ✓»,
   снизу зачёркнутое «РИО»; на «Пиши город» подмигивает, «ПОДПИШИСЬ» выскакивает на этой фразе (одна концовка, хвост ≤ 0,8 с).
   В конце — бейдж статуса закрыт, вопрос к зрителю. */
(() => {
  EV.bt_knew = wtk('x1', 'знал,');
  EV.bt_not = wtk('x1', 'не');
  EV.endcard = wtk('x1', 'Пиши');
  KEYW.push('Рио?', 'отмотаем!');
  const L = RJ.ink;
  WORLD.button = (t, u, cat) => { const Q = window.TQ; lay(40, () => Q.sky(t)); lay(16, () => Q.city(t)); lay(2.6, () => Q.deck(t)); lay(1, () => { Q.ground(t); cat(); }); lay(0.6, () => { for (const x of [-140, 1230]) sil([[x - 80, 2300], [x - 70, 1500], [x + 70, 1480], [x + 80, 2300]], '#140a14', 1); });
    lay(2, () => motes(14, [-100, 700, 1200, 1500], '#ffd8a0', t, 7140, { sp: 3, sz: 2.2, a: 0.4, wob: 16, add: 1 })); };
  DIR.button = {
    outfit: 'hoodieRIO', light: { side: 1, rim: '#ffc080' }, grade: ['#3a1a4a', 0.08],
    act: () => [[S0.button, 'suspicious'], [EV.bt_knew, 'smug'], [EV.endcard, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1640, s: 0.95, look: t > EV.endcard ? [0, 0] : [0.3, -0.3], hand: t > EV.endcard ? [170, -360] : [130, -470], handF: t > EV.endcard ? undefined : [-90, -470], point: t > EV.endcard }),
    afterCat: (t, u, P) => { if (t < EV.bt_knew - 0.1 || t > EV.endcard - 0.05) return; const k = popK(t, EV.bt_knew - 0.1, 0.3); push(P.x + 20 * P.s, P.y - 640 * P.s, P.s * k, 0.04); rect(-220, -120, 440, 240, { wash: '#f4f0e6', washA: 1, w: 3, col: L }); pencil([[-150, 120], [-150, 260]], { w: 8, col: RJ.woodD, pass2: false });
      txt('СТОЛИЦА БРАЗИЛИИ:', 0, -78, 32, { col: L, font: 'Osw' }); txt('БРАЗИЛИА ✓', 0, -10, 64, { col: RJ.green, font: 'Osw' }); txt('РИО', 0, 70, 50, { col: '#8a8a80', font: 'Osw' }); if (t > EV.bt_not) pencil([[-60, 70], [60, 70]], { w: 8, col: RJ.red, pass2: false }); pop(); },
    cam: () => [[S0.button, 560, 1000, 0.04], [EV.bt_knew, 520, 960, 0.06], [EV.endcard - 0.1, 520, 940, 0.06], [EV.endcard + 0.2, 500, 820, 0.04, 'x'], [DUR, 500, 820, 0.05]]
  };
  Object.keys(RSTAT).forEach(n => { if (!DIR[n]) return; const h = DIR[n].hud; DIR[n].hud = t => { if (h) h(t); rioBadge(t, n); }; });
})();
