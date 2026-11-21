/* 032 — сцена `button`: та же степь у посёлка, что в хуке (window.HQ), закат. Табельная доска хозяев теперь заполнена:
   последний жетон — «ООН: УКРАИНА». На «Отправь» Том протягивает телефон с карточкой «Чей Донбасс? → ООН: Украина · 143 : 5»
   и бумажным самолётиком «отправить»; на «Пиши город» подмигивает, «ПОДПИШИСЬ» выскакивает на этой фразе. Одна концовка. */
(() => {
  EV.bt_send = wtk('x1', 'Отправь');
  EV.endcard = wtk('x1', 'Пиши');
  KEYW.push('Донбасс.', 'отмотаем!');
  const L = DB.ink;
  WORLD.button = (t, u, cat) => { const Q = window.HQ; lay(40, () => Q.sky(t)); lay(12, () => Q.far(t)); lay(3.2, () => Q.town(t)); lay(1, () => { Q.ground(t); cat(); }); lay(0.6, () => Q.front(t));
    lay(2, () => motes(16, [-100, 700, 1200, 1500], '#fff0c8', t, 9400, { sp: 3, sz: 2.4, a: 0.4, wob: 16, add: 1 }));
    scr(() => { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(255,180,120,0.18)'; ctx.fillRect(0, 0, W, H); ctx.restore(); }); };
  DIR.button = {
    outfit: 'hoodieDON', light: { side: -1, rim: '#ffc890' }, grade: ['#3a1a10', 0.08],
    act: () => [[S0.button, 'smug'], [EV.bt_send, 'grin'], [EV.endcard, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 340, y: 1650, s: 1.0, look: t > EV.endcard ? [0, 0] : [0.4, -0.4], hand: t > EV.endcard ? [170, -360] : [190, -470], point: t > EV.endcard }),
    afterCat: (t, u, P) => { if (t < EV.bt_send - 0.1 || t > EV.endcard - 0.05) return; const k = popK(t, EV.bt_send - 0.1, 0.3); push(P.x + 250 * P.s, P.y - 620 * P.s, P.s * k, 0.05);
      rect(-150, -260, 300, 520, { wash: '#1a1a20', washA: 1, w: 4, col: '#000' }); rect(-130, -230, 260, 450, { wash: '#f4f0e8', washA: 1, line: false });
      rect(-110, -200, 220, 120, { wash: '#dfe8f4', washA: 1, w: 1.6, col: '#8a9ab8' }); txt('Чей Донбасс?', 0, -160, 26, { col: L, font: 'Osw' }); txt('ООН: Украина', 0, -118, 26, { col: '#1e5aa8', font: 'Osw' });
      txt('143 : 5', 0, -10, 70, { col: '#2a8a4a', font: 'Osw' }); token(0, 110, 0.7, 9, t);
      push(0, 190, 1); rect(-100, -26, 200, 52, { wash: '#2a7ad8', washA: 1, w: 2, col: L }); poly([[-60, 0], [-20, -16], [-34, 14]], { wash: '#ffffff', washA: 1, line: false }); txt('ОТПРАВИТЬ', 24, 2, 26, { col: '#ffffff', font: 'Osw' }); pop(); pop(); },
    cam: () => [[S0.button, 560, 980, 0.04], [EV.bt_send, 560, 940, 0.06], [EV.endcard - 0.1, 540, 920, 0.06], [EV.endcard + 0.2, 500, 840, 0.04, 'x'], [DUR, 500, 840, 0.05]]
  };
  Object.keys(OWN).forEach(n => { if (!DIR[n]) return; const h = DIR[n].hud; DIR[n].hud = t => { if (h) h(t); dbBadge(t, n); }; });
})();
