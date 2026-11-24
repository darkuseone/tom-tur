/* 033 — сцена `button`: тот же въезд в зону, что в хуке (window.HQ), предвечерний свет. Туристка из хука снова с телефоном —
   теперь на экране карточка «Чернобыль ≠ станция · городу 833 года» и кнопка «ОТПРАВИТЬ». На «Отправь» Том показывает на её телефон,
   на «Пиши город» подмигивает в камеру — «ПОДПИШИСЬ» выскакивает на этой фразе. Одна концовка; петля — тот же кадр, что в начале хука. */
(() => {
  EV.bt_send = wtk('x1', 'Отправь');
  EV.endcard = wtk('x1', 'Пиши');
  KEYW.push('станция.', 'отмотаем!');
  const L = CH.ink;
  function phone(t) { if (t < EV.bt_send - 0.1 || t > EV.endcard - 0.05) return; const k = popK(t, EV.bt_send - 0.1, 0.3); push(720, 1120, 0.95 * k, 0.05);
    rect(-150, -260, 300, 520, { wash: '#1a1a20', washA: 1, w: 4, col: '#000' }); rect(-130, -230, 260, 450, { wash: '#f4f0e8', washA: 1, line: false });
    rect(-110, -200, 220, 110, { wash: '#dfe8f4', washA: 1, w: 1.6, col: '#8a9ab8' }); txt('Чернобыль —', 0, -168, 26, { col: L, font: 'Osw' }); txt('не станция!', 0, -124, 30, { col: CH.red, font: 'Osw' });
    txt('833', 0, -20, 90, { col: '#2a8a4a', font: 'Osw' }); txt('года городу', 0, 40, 28, { col: L, font: 'Osw' }); mugwort(0, 150, 0.35, t, 401);
    push(0, 190, 1); rect(-100, -26, 200, 52, { wash: '#2a7ad8', washA: 1, w: 2, col: L }); poly([[-60, 0], [-20, -16], [-34, 14]], { wash: '#ffffff', washA: 1, line: false }); txt('ОТПРАВИТЬ', 24, 2, 26, { col: '#ffffff', font: 'Osw' }); pop(); pop(); }
  WORLD.button = (t, u, cat) => { const Q = window.HQ; lay(40, () => Q.sky(t)); lay(14, () => Q.far(t)); lay(3.4, () => Q.checkpoint(t)); lay(1, () => { Q.ground(t);
      human(800, 1640, 1.05, t, { body: '#e86a8a', bodyD: '#8a2a4a', skin: '#f0c8a0', hat: 'bun', hatCol: '#e8c060', long: 1, legs: '#2a3a5a', armR: 'hold', armL: t > EV.endcard ? 'wave' : 'swing', prop: 'phone', flip: -1, seed: 5160, face: t > EV.bt_send ? 'grin' : 'smile' }); cat(); }); lay(0.6, () => Q.front(t));
    lay(2.2, () => motes(16, [-100, 700, 1200, 1500], '#fff0c8', t, 6100, { sp: 2, sz: 2.4, a: 0.4, wob: 16, add: 1 }));
    scr(() => { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(255,200,150,0.14)'; ctx.fillRect(0, 0, W, H); ctx.restore(); }); };
  DIR.button = {
    outfit: 'hoodieCH', light: { side: 1, rim: '#ffc890' }, grade: ['#3a1a10', 0.06],
    act: () => [[S0.button, 'smug'], [EV.bt_send, 'grin'], [EV.endcard, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 400, y: 1660, s: 1.0, look: t > EV.endcard ? [0, 0] : [0.6, -0.4], hand: t > EV.endcard ? [170, -360] : [190, -380], point: t > EV.bt_send && t < EV.endcard }),
    afterCat: (t, u, P) => { if (t > EV.endcard) dosimeter(P.x + P.hand[0] * P.s, P.y + P.hand[1] * P.s, 0.9, t, { needle: -0.5 }); },
    hud: t => phone(t),
    cam: () => [[S0.button, 560, 1020, 0.02], [EV.bt_send, 600, 1000, 0.02], [EV.endcard - 0.1, 580, 980, 0], [EV.endcard + 0.2, 600, 940, -0.1, 'x'], [DUR, 600, 940, -0.1]]
  };
  TRANS_IN.button = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(e < 0.5 ? A : B, 1 + Math.sin(e * Math.PI) * 0.08); whiteOut(Math.sin(e * Math.PI) * 0.6, '255,236,200'); } };
})();
