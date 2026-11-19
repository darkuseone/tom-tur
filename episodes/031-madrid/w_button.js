/* 031 — сцена `button`: та же Пуэрта-дель-Соль (window.HQ). На «где сделал столицу» Том держит карту Испании с вопросительными флажками-булавками
   в разных городах (Толедо, Севилья, Барселона, Валенсия); на «Пиши город» подмигивает, «ПОДПИШИСЬ» выскакивает на этой фразе. */
(() => {
  EV.bt_where = wtk('x1', 'где');
  EV.endcard = wtk('x1', 'Пиши');
  KEYW.push('столицу?', 'отмотаем!');
  const L = MD.ink;
  WORLD.button = (t, u, cat) => { const Q = window.HQ; lay(40, () => Q.sky(t)); lay(12, () => Q.far(t)); lay(3.2, () => Q.square(t)); lay(1, () => { Q.ground(t); cat(); }); lay(0.6, () => Q.front(t));
    lay(2, () => motes(14, [-100, 700, 1200, 1500], '#fff8e0', t, 7980, { sp: 3, sz: 2.2, a: 0.4, wob: 16, add: 1 })); };
  DIR.button = {
    outfit: 'hoodieMAD', light: { side: 1, rim: '#fff0c0' }, grade: ['#3a2a1a', 0.05],
    act: () => [[S0.button, 'suspicious'], [EV.bt_where, 'grin'], [EV.endcard, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 350, y: 1650, s: 1.0, look: t > EV.endcard ? [0, 0] : [0.4, -0.4], hand: t > EV.endcard ? [170, -360] : [160, -470], handF: t > EV.endcard ? undefined : [-80, -470], point: t > EV.endcard }),
    afterCat: (t, u, P) => { if (t < EV.bt_where - 0.1 || t > EV.endcard - 0.05) return; const k = popK(t, EV.bt_where - 0.1, 0.3); push(P.x + 40 * P.s, P.y - 640 * P.s, P.s * k, 0.03); rect(-230, -170, 460, 320, { wash: '#f0e2c0', washA: 1, w: 3, col: L });
      const pr = ([lo, la]) => [(lo + 3.5) * 32, -(la - 40.2) * 40]; GLOBE.fill(IBERIA.map(pr), '#e2c890'); pencil(IBERIA.concat([IBERIA[0]]).map(pr), { w: 3, col: L, pass2: false, gap: false });
      [[MAD.lon, MAD.lat, MD.red], [-4.02, 39.86, '#3a5aa8'], [-5.98, 37.39, '#2a8a5a'], [2.17, 41.39, '#a8781a'], [-0.38, 39.47, '#7a3a8a']].forEach(([lo, la, c], i) => { const [x, y] = pr([lo, la]); pencil([[x, y], [x, y - 40]], { w: 3, col: '#2a2a30', pass2: false }); ell(x, y - 46, 12, 12, { wash: c, washA: 1, w: 1.6, col: L }); if (i) txt('?', x + 18, y - 52, 28, { col: c, font: 'Osw' }); });
      txt('А ТЫ ГДЕ?', 0, -136, 34, { col: L, font: 'Osw' }); pop(); },
    cam: () => [[S0.button, 560, 980, 0.04], [EV.bt_where, 520, 940, 0.06], [EV.endcard - 0.1, 520, 920, 0.06], [EV.endcard + 0.2, 500, 840, 0.04, 'x'], [DUR, 500, 840, 0.05]]
  };
  Object.keys(MSTAT).forEach(n => { if (!DIR[n]) return; const h = DIR[n].hud; DIR[n].hud = t => { if (h) h(t); madBadge(t, n); }; });
})();
