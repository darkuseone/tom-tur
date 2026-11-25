/* 036 — сцена `button`: та же Сенатская площадь, что в хуке (window.HQ), туристка из хука снова с телефоном — на экране карточка
   «Русский царь в Хельсинки? · „добрый царь“ · 130 лет» и кнопка «ОТПРАВИТЬ»; на «Пиши город» Том подмигивает — «ПОДПИШИСЬ» на этой
   фразе. Одна концовка. Здесь же — бейдж «окошко на площадь» (сквозная нить) во всех сценах. */
(() => {
  EV.bt_send = wtk('x1', 'Отправь');
  EV.endcard = wtk('x1', 'Пиши');
  KEYW.push('площади.', 'отмотаем!');
  const L = FIC.ink;
  function phone(t) { if (t < EV.bt_send - 0.1 || t > EV.endcard - 0.05) return; const k = popK(t, EV.bt_send - 0.1, 0.3); push(720, 1100, 0.95 * k, 0.05);
    rect(-150, -260, 300, 520, { wash: '#1a1a20', washA: 1, w: 4, col: '#000' }); rect(-130, -230, 260, 450, { wash: '#f4f0e8', washA: 1, line: false });
    txt('Русский царь', 0, -190, 30, { col: L, font: 'Osw' }); txt('в Хельсинки?', 0, -150, 30, { col: L, font: 'Osw' }); push(0, -40, 0.18); statueA2(0, 300, 1, t, {}); pop(); txt('«добрый царь»', 0, 70, 30, { col: FIC.blue, font: 'Osw' }); txt('130 лет', 0, 120, 34, { col: '#2a8a4a', font: 'Osw' });
    push(0, 190, 1); rect(-100, -26, 200, 52, { wash: '#2a7ad8', washA: 1, w: 2, col: L }); poly([[-60, 0], [-20, -16], [-34, 14]], { wash: '#ffffff', washA: 1, line: false }); txt('ОТПРАВИТЬ', 24, 2, 26, { col: '#ffffff', font: 'Osw' }); pop(); pop(); }
  WORLD.button = (t, u, cat) => { const Q = window.HQ; lay(40, () => Q.sky(t)); lay(14, () => Q.far(t)); lay(3.2, () => Q.square(t)); lay(1, () => { Q.ground(t); Q.guest(t); cat(); }); lay(0.6, () => Q.front(t));
    lay(2.2, () => motes(30, [-100, 500, 1200, 1900], '#ffffff', t, 12300, { sp: 4, vx: -1, sz: 3, a: 0.7, wob: 10 }));
    scr(() => { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(255,214,170,0.12)'; ctx.fillRect(0, 0, W, H); ctx.restore(); }); };
  DIR.button = {
    outfit: 'hoodieFI', light: { side: -1, rim: '#ffd8a0' }, grade: ['#1a2030', 0.05],
    act: () => [[S0.button, 'smug'], [EV.bt_send, 'grin'], [EV.endcard, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 380, y: 1660, s: 1.0, look: t > EV.endcard ? [0, 0] : [0.6, -0.4], hand: t > EV.endcard ? [170, -360] : [190, -380], point: t > EV.bt_send && t < EV.endcard, frost: 0.3 }),
    hud: t => phone(t),
    cam: () => [[S0.button, 560, 1020, 0.02], [EV.bt_send, 600, 1000, 0.02], [EV.endcard - 0.1, 580, 980, 0], [EV.endcard + 0.2, 600, 940, -0.1, 'x'], [DUR, 600, 940, -0.1]]
  };
  TRANS_IN.button = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(e < 0.5 ? A : B, 1 + Math.sin(e * Math.PI) * 0.08); whiteOut(Math.sin(e * Math.PI) * 0.6, '242,255,248'); } };
  Object.keys(SPOT).forEach(n => { if (!DIR[n]) return; const h = DIR[n].hud; DIR[n].hud = t => { if (h) h(t); spotBadge(t, n); }; });
})();
