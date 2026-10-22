/* 010 — сцена `blockade`: зима 1941/42, Ленинград. Сумерки, снег, аэростаты заграждения и лучи прожекторов; Петропавловский шпиль
   в сером чехле. Улица: окна крест-накрест заклеены бумагой, вмёрзший в сугроб трамвай, рупор радиоточки стучит метрономом,
   очередь у двери «ХЛЕБ», женщина везёт на санках ведро воды с Невы. Без шуток и без натурализма. На «восемьсот» — отрывной календарь
   «ДЕНЬ 872», на «Сто» — весы с кусочком хлеба «125 г», на «Погибло» — свет гаснет, остаётся свеча. Том в тулупе, озноб.
   Переход В сцену — маятник метронома проходит через кадр и сметает прошлую эпоху. */
(() => {
  EV.bl_days = wtk('s8', 'восемьсот');
  EV.bl_bread = wtk('s8', 'Сто');
  EV.bl_dead = wtk('s8', 'Погибло');
  KEYW.push('дня.', 'хлеба.', 'миллиона.');
  const dim = t => sm((t - EV.bl_dead) / 0.8);
  const tick = t => Math.sin(t * Math.PI * 2 * 0.5);                  // метроном ≈ 60 ударов в минуту

  function sky(t) { vgrad(-900, 1100, [lerpC('#3a3a52', '#1e1e2e', dim(t)), '#5a5a6e', '#8a8a96', '#b4b4ba'], 1);
    for (const [x, sp] of [[100, 0.3], [900, -0.25]]) rays(x, 1050, -Math.PI / 2 + Math.sin(t * sp) * 0.5, 0.04, 1500, 'rgba(220,226,240,0.6)', 0.14 * (1 - 0.5 * dim(t)), 2, t);
    for (const [x, y, s] of [[200, 260, 1], [760, 180, 0.8], [1000, 380, 0.6]]) { const bx = x + Math.sin(t * 0.4 + x) * 20; push(bx, y, s); ell(0, 0, 70, 30, { wash: '#7a7a84', washA: 1, w: 2, col: '#2a2a32' }); poly([[56, -6], [96, -30], [92, 0], [96, 30], [56, 6]], { wash: '#6a6a74', washA: 1, w: 1.6, col: '#2a2a32' }); pencil([[0, 30], [0, 700]], { w: 1.2, col: '#2a2a32', a: 0.6, pass2: false }); pop(); } }
  function far(t) { for (let k = 0; k < 26; k++) { const x = -300 + k * 70, h = 60 + (k * 41) % 80; sil([[x, 940], [x, 940 - h], [x + 64, 940 - h], [x + 64, 940]], '#6a6a76', 0.85); } spire(980, 940, 0.4, t, { col: '#8a8a90', cover: 1 }); }
  function street(t) {                                                 // дома с заклеенными окнами, сугробы, трамвай, радиоточка
    const H = [['#b8a888', 400], ['#a89898', 360], ['#9aa4a8', 420], ['#b0a890', 380]];
    H.forEach(([c, h], i) => { const x = -260 + i * 380; facade(x, 1220, 370, h, c, t, { key: 10400 + i, night: 1 }); poly([[x - 6, 1220 - h - 14], [x + 376, 1220 - h - 14], [x + 360, 1220 - h - 36], [x + 10, 1220 - h - 36]], { wash: '#eef0f4', washA: 1, w: 1.4, col: '#6a6a7a' });
      const fl = Math.max(2, Math.round(h / 110)), cols = Math.max(2, Math.round(370 / 70)), fh = h / fl, cw = 370 / cols;
      for (let j = 0; j < fl; j++) for (let q = 0; q < cols; q++) { const wx = x + q * cw + cw * 0.25, wy = 1220 - h + j * fh + fh * 0.25, ww = cw * 0.5, wh = fh * 0.55; pencil([[wx, wy], [wx + ww, wy + wh]], { w: 3, col: '#eae6da', a: 0.9, pass2: false }); pencil([[wx + ww, wy], [wx, wy + wh]], { w: 3, col: '#eae6da', a: 0.9, pass2: false }); } });
    // радиоточка с метрономом
    pencil([[60, 1230], [60, 820]], { w: 8, col: '#2a2a30' }); push(60, 830, 1, 0.3); poly([[0, -16], [90, -50], [90, 50], [0, 16]], { wash: '#3a3a42', washA: 1, w: 2, col: '#0a0a10' }); pop();
    if (tick(t) > 0.8) for (let q = 0; q < 3; q++) pencil(spline([[160 + q * 22, 800 - q * 6], [172 + q * 22, 830], [160 + q * 22, 860 + q * 6]], false, 6), { w: 3, col: '#eef0f4', a: 0.8, pass2: false });
    // очередь у булочной
    rect(800, 1080, 120, 140, { wash: '#3a2a20', washA: 1, w: 2, col: '#0a0a0a' }); rect(780, 1030, 160, 40, { wash: '#eae6da', washA: 1, w: 1.6, col: '#2a2a2a' }); txt('ХЛЕБ', 860, 1052, 30, { font: 'Osw', col: '#2a2a2a' });
    for (let q = 0; q < 5; q++) human(760 - q * 60, 1236, 0.42, t, { body: ['#3a3a42', '#4a3a32', '#2a3238', '#3a3a3a', '#4a4040'][q], legs: '#2a2a2e', boots: '#1a1a1a', hat: q % 2 ? 'scarf' : 'fur', hatCol: ['#6a5a5a', '#3a3a3a', '#5a4a5a', '#3a3030', '#5a5050'][q], face: 'calm', armR: 'hold', armL: 'hold', long: q % 2 === 1, seed: 900 + q, flip: -1 });
    // сугробы
    for (let q = 0; q < 6; q++) ell(-200 + q * 300, 1240, 220, 50, { wash: '#eef0f4', washA: 1, w: 1.4, col: '#8a8a9a', a: 0.7 });
  }
  function tram(t) {                                                   // трамвай вмёрз в сугроб
    push(1010, 1420, 0.6); const b = rect(-340, -260, 680, 220, { wash: '#a8433a', washA: 1, w: 2.4, col: '#1a0a08' }); rect(-340, -150, 680, 50, { wash: '#e0d4b8', washA: 1, w: 1.6, col: '#1a0a08' });
    for (let q = 0; q < 7; q++) rect(-310 + q * 90, -240, 70, 80, { wash: '#2a2e3a', washA: 1, w: 1.6, col: '#0a0a0a' });
    blob([[-360, -262], [-300, -300], [300, -300], [360, -262]], { wash: '#f2f4f8', washA: 1, w: 1.6, col: '#8a8a9a' }); pencil([[0, -300], [-120, -420]], { w: 5, col: '#2a2a2e' });
    blob([[-420, -20], [-300, -110], [0, -80], [300, -120], [420, -20], [420, 20], [-420, 20]], { wash: '#eef0f4', washA: 1, w: 1.6, col: '#8a8a9a' }); pop();
  }
  function sled(t) {                                                   // женщина везёт на санках ведро воды
    const x = 1000 - ((t - S0.blockade) * 40);
    human(x, 1480, 0.9, t, { body: '#3a3a44', legs: '#2a2a2e', boots: '#1a1a1a', hat: 'scarf', hatCol: '#6a4a4a', face: 'calm', armR: 'hold', armL: 'down', long: true, seed: 920, flip: -1, look: -0.3 });
    pencil([[x + 50, 1480 - 150], [x + 170, 1470]], { w: 3, col: '#4a3a2a', pass2: false });
    rect(x + 160, 1450, 200, 20, { wash: '#7a5a3a', washA: 1, w: 2, col: '#2a1a08' }); pencil(spline([[x + 140, 1470], [x + 170, 1480], [x + 380, 1480]], false, 6), { w: 4, col: '#4a4a4a', pass2: false });
    poly([[x + 220, 1450], [x + 300, 1450], [x + 310, 1370], [x + 210, 1370]], { wash: '#7a8088', washA: 1, w: 2, col: '#1a1a1a' }); ell(x + 260, 1372, 50, 10, { wash: '#a8c0d0', washA: 1, w: 1.4, col: '#1a1a1a' });
  }

  WORLD.blockade = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(12, () => far(t));
    lay(5, () => street(t));
    lay(3, () => tram(t));
    lay(1, () => { const g = shape([[-400, 1440], [1480, 1430], [1480, 2400], [-400, 2400]], { wash: '#e6e8ee', washA: 1, w: 2, col: '#6a6a7a', a: 0.5 }); hatch(g.path, g.bb, { gap: 12, a: 0.1, col: '#6a6a8a', ang: 0.1, w: 1.2 });
      for (let q = 0; q < 5; q++) pencil([[-300 + q * 120, 1560 + q * 40], [1400, 1540 + q * 46]], { w: 3, col: '#b8bccc', a: 0.6, pass2: false });
      sled(t); cat(); });
    lay(0.7, () => { motes(80, [-200, -200, 1300, 2100], '#ffffff', t, 10410, { sp: 90, vx: -20, sz: 4, a: 0.8, wob: 30 }); haze('#0a0a14', 0.3 * dim(t)); });
  };
  DIR.blockade = {
    outfit: 'tulup', light: { side: 1, rim: '#c8d0e8' }, grade: ['#5a6a8a', 0.22],
    act: () => [[S0.blockade, 'cold'], [EV.bl_bread, 'awe'], [EV.bl_dead - 0.05, 'neutral']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1470, s: 1.04, look: t < EV.bl_dead ? [0.4, -0.2] : [0, 0.15], chatter: t < EV.bl_dead, frost: 1, hand: [60, -250], handF: [-60, -250], nod: t > EV.bl_dead ? 0.06 : 0 }),
    afterCat: (t, u, P) => { if (t > EV.bl_dead) { const x = P.x + 64 * P.s, y = P.y - 250 * P.s; candle(x, y, 0.9, t, 3, 1); glow(x, y - 70, 260, 'rgba(255,200,120,1)', 0.35 * dim(t)); } },
    cam: () => [[S0.blockade, 580, 1000, 0.08], [EV.bl_days, 580, 1020, 0.06], [EV.bl_bread, 520, 1080, 0.12], [EV.bl_dead, 420, 1140, 0.2], [S1.blockade, 400, 1160, 0.26]],
    hud: t => {
      if (t > EV.bl_days - 0.1 && t < EV.bl_bread + 0.2) { const k = popK(t, EV.bl_days - 0.1, 0.35), n = Math.min(872, Math.round(872 * sm((t - EV.bl_days + 0.1) / 1.0))); push(780, 560, k, 0.04);
        for (let q = 0; q < 3; q++) rect(-130 + q * 4, -130 - q * 4, 260, 260, { wash: '#f2ece0', washA: 1, w: 2, col: '#3a3a3a' }); rect(-130, -130, 260, 54, { wash: '#2a2a32', washA: 1, w: 1.6, col: '#000' }); txt('ДЕНЬ', 0, -102, 34, { font: 'Osw', col: '#f2ece0' });
        txt(String(n), 0, 20, 110, { font: 'Osw', col: '#a8201e' }); txt('блокады', 0, 100, 30, { font: 'Osw', col: '#4a4a4a' }); pop(); }
      if (t > EV.bl_bread && t < EV.bl_dead + 0.3) { const k = popK(t, EV.bl_bread, 0.35); push(780, 600, k, -0.03);
        rect(-200, -170, 400, 330, { wash: '#efe6d0', washA: 0.97, w: 3, col: '#3a3a3a' }); txt('ХЛЕБНАЯ КАРТОЧКА · ДЕКАБРЬ 1941', 0, -138, 22, { font: 'Osw', col: '#3a3a3a' });
        pencil([[-110, 60], [110, 60]], { w: 8, col: '#3a3a42', pass2: false }); pencil([[0, 60], [0, 120]], { w: 10, col: '#3a3a42', pass2: false }); rect(-60, 120, 120, 16, { wash: '#3a3a42', washA: 1, w: 1, col: '#000' });
        const br = blob([[-34, 58], [-30, 30], [24, 26], [34, 56]], { wash: '#5a4430', washA: 1, w: 2, col: '#1a0a04' }); hatch(br.path, br.bb, { gap: 4, a: 0.3, col: '#2a1a08', ang: 0.8, w: 1 });
        txt('125 г', 0, -50, 100, { font: 'Osw', col: '#a8201e' }); pop(); }
      if (t > EV.bl_dead) { const k = sm((t - EV.bl_dead) / 0.5); txt('≈ 1 000 000', 540, 600, 120, { font: 'Osw', col: '#f2ece0', a: k }); note('по разным оценкам — от 650 тыс. до 1,4 млн', 540, 1790, t, EV.bl_dead + 0.2, S1.blockade, '#e8e8f0', 38, -0.01); }
    }
  };

  // ---------------------------------------------------------------- переход В blockade: маятник метронома сметает прошлую эпоху
  TRANS_IN.blockade = { a: 0.35, b: 0.45, fx(k, t, A, B) {
    const px = 540, py = H + 80, a0 = -1.65, a = lerp(a0, 1.65, sm(k)), L = 2600;
    drawBuf(A);
    const P = new Path2D(); P.moveTo(px, py); for (let q = 0; q <= 24; q++) { const an = lerp(a0, a, q / 24); P.lineTo(px + Math.sin(an) * L, py - Math.cos(an) * L); } P.closePath();
    inPath(P, () => drawBuf(B, 1.06 - 0.06 * sm(k)));
    scr(() => { const ex = px + Math.sin(a) * 1900, ey = py - Math.cos(a) * 1900; pencil([[px, py], [ex, ey]], { w: 22, col: '#1a1a1e', pass2: false }); pencil([[px, py], [ex, ey]], { w: 6, col: '#8a8a90', pass2: false });
      const wx = px + Math.sin(a) * 1300, wy = py - Math.cos(a) * 1300; push(wx, wy, 1, a); poly([[-90, -70], [90, -70], [70, 70], [-70, 70]], { wash: '#c8a040', washA: 1, w: 4, col: '#3a2a08' }); pop();
      if (Math.abs(a) < 0.12) txt('тик', px + 160, 980, 70, { font: 'Osw', col: '#f2ece0' }); });
  } };
})();
