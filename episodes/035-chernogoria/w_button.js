/* 035 — сцена `button`: тот же утренний Котор, что в хуке (window.HQ). Том протягивает телефон с карточкой «100 лет войны с Японией?
   ЛЕГЕНДА · мир 2006» и кнопкой «ОТПРАВИТЬ»; на «Пиши город» подмигивает — «ПОДПИШИСЬ» на этой фразе. Одна концовка.
   Здесь же — досье-бейдж (сквозная нить) во всех сценах. */
(() => {
  EV.bt_send = wtk('x1', 'Отправь');
  EV.endcard = wtk('x1', 'Пиши');
  KEYW.push('байку.', 'отмотаем!');
  const L = MEC.ink;
  function phone(t) { if (t < EV.bt_send - 0.1 || t > EV.endcard - 0.05) return; const k = popK(t, EV.bt_send - 0.1, 0.3); push(700, 1080, 0.95 * k, 0.05);
    rect(-150, -260, 300, 520, { wash: '#1a1a20', washA: 1, w: 4, col: '#000' }); rect(-130, -230, 260, 450, { wash: '#f4f0e8', washA: 1, line: false });
    txt('100 лет войны', 0, -190, 30, { col: L, font: 'Osw' }); txt('с Японией?', 0, -150, 30, { col: L, font: 'Osw' }); push(0, -60, 0.6, -0.12); pencil([[-180, -40], [180, -40], [180, 40], [-180, 40], [-180, -40]], { w: 6, col: MEC.red, pass2: false, gap: true }); txt('ЛЕГЕНДА', 0, 4, 54, { col: MEC.red, font: 'Osw' }); pop();
    txt('мир — 2006 ✓', 0, 40, 30, { col: '#2a8a4a', font: 'Osw' }); push(0, 190, 1); rect(-100, -26, 200, 52, { wash: '#2a7ad8', washA: 1, w: 2, col: L }); poly([[-60, 0], [-20, -16], [-34, 14]], { wash: '#ffffff', washA: 1, line: false }); txt('ОТПРАВИТЬ', 24, 2, 26, { col: '#ffffff', font: 'Osw' }); pop(); pop(); }
  WORLD.button = (t, u, cat) => { const Q = window.HQ; lay(40, () => Q.sky(t)); lay(18, () => Q.mountains(t)); lay(8, () => Q.bay(t)); lay(3.2, () => Q.town(t)); lay(1, () => { Q.ground(t); cat(); }); lay(0.6, () => Q.front(t));
    lay(2.2, () => motes(16, [-100, 700, 1200, 1500], '#fff0c8', t, 10300, { sp: 2, sz: 2.4, a: 0.4, wob: 16, add: 1 }));
    scr(() => { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(255,214,170,0.14)'; ctx.fillRect(0, 0, W, H); ctx.restore(); }); };
  DIR.button = {
    outfit: 'hoodieME', light: { side: 1, rim: '#ffd8a0' }, grade: ['#2a1a10', 0.05],
    act: () => [[S0.button, 'smug'], [EV.bt_send, 'grin'], [EV.endcard, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1660, s: 1.0, look: t > EV.endcard ? [0, 0] : [0.5, -0.4], hand: t > EV.endcard ? [170, -360] : [190, -420], point: t > EV.bt_send && t < EV.endcard }),
    hud: t => phone(t),
    cam: () => [[S0.button, 560, 1020, 0.02], [EV.bt_send, 580, 1000, 0.04], [EV.endcard - 0.1, 560, 980, 0.02], [EV.endcard + 0.2, 620, 920, -0.1, 'x'], [DUR, 620, 920, -0.1]]
  };
  TRANS_IN.button = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(e < 0.5 ? A : B, 1 + Math.sin(e * Math.PI) * 0.08); whiteOut(Math.sin(e * Math.PI) * 0.6, '240,251,255'); } };
  Object.keys(EVID).forEach(n => { if (!DIR[n]) return; const h = DIR[n].hud; DIR[n].hud = t => { if (h) h(t); dossier(t, n); }; });
})();
