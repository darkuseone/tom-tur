/* 023 — сцена `bortenevo`: 22 декабря 1317, заснеженное поле у Бортенева. Холодный закат, тёмные силуэты на снегу с контровым
   золотом. Тверская дружина под зелёно-красными стягами наступает слева, московские стяги и ордынский бунчук уходят вправо к лесу;
   обоз, сани, костры, вороны. На «разбила» — московский стяг падает в снег (удар), бирка «МОСКВА ↘»; на «Москву!» — табло 3 : 0;
   на «Орде» — пузырь-вставка: тёмная ставка хана, шапка Михаила на ковре, свеча гаснет; на «доносу» — свиток «ДОНОС» с московской
   печатью; на «князя» — табло 3 : 1. Без крови и тел. Переход В сцену — ладья: парус проносится через кадр и стирает прошлую эпоху. */
(() => {
  EV.bo_win = wtk('s3', 'разбила');
  EV.bo_score = wtk('s3', 'Москву!');
  EV.bo_horde = wtk('s3', 'Орде');
  EV.bo_kill = wtk('s3', 'казнили');
  EV.bo_donos = wtk('s3', 'доносу');
  EV.bo_score2 = wtk('s3', 'князя.');
  KEYW.push('разбила', 'Москву!', 'казнили', 'доносу');
  SHAKES.push([EV.bo_win + 0.05, 0.25, 9], [EV.bo_kill, 0.15, 5]);
  const L = TV.ink;
  function sky(t) { vgrad(-900, 1250, ['#2a3450', '#4a5a7a', '#8a8aa0', '#d8a888', '#f0c890'], 1); glow(880, 1080, 520, 'rgba(255,180,110,1)', 0.5); ell(880, 1080, 80, 80, { wash: '#ffe0a8', washA: 1, w: 1.2, col: '#c8805a', a: 0.4 });
    clouds(t, -480, 6, '#5a6080', 23401, 0.6); clouds(t, 240, 4, '#c88a80', 23402, 0.4); birds(t, 9, [-100, -100, 1200, 700], 23403, '#14121a'); }
  function far(t) {                                                 // дальний лес, деревня Бортенево, снежное поле
    hills(1100, 30, '#3a4058', 23404, 1);
    for (let i = 0; i < 34; i++) { const x = -120 + i * 42, h = 70 + (i * 37) % 60; poly([[x - 20, 1110], [x, 1110 - h], [x + 20, 1110]], { wash: '#1e2a36', washA: 1, w: 1, col: L, a: 0.5 }); }
    for (let i = 0; i < 6; i++) izba(140 + i * 90, 1120, 60, 38, t, { roof: '#e8eef4', smoke: i % 2 === 0, lit: i === 2 });
    shape([[-400, 1110], [1500, 1100], [1500, 1400], [-400, 1400]], { wash: '#c8d0dc', washA: 1, line: false });
  }
  function retreat(t) {                                             // московская рать отступает вправо: стяги, бунчук, всадники
    const run = t > EV.bo_win ? (t - EV.bo_win) * 60 : 0;
    for (let k = 0; k < 6; k++) rider(560 + k * 80 + run, 1250 + (k % 2) * 16, 0.26, t, { flip: -1, col: k % 2 ? '#5a2a2a' : '#3a2a3a', horseCol: '#2a1a14', hat: k === 2 ? undefined : 'helmet', spear: k % 2 === 0, banner: k === 0 ? '#7a2a2a' : null, walk: t > EV.bo_win ? 2 : 0.6 });
    push(960 + run * 0.6, 1230, 0.6); pencil([[0, 0], [0, -300]], { w: 5, col: '#2a1a10', pass2: false }); for (let k = 0; k < 8; k++) pencil([[0, -290], [Math.sin(t * 6 + k) * 20 - 10 + k * 3, -200 + k * 4]], { w: 4, col: '#2a1a14', pass2: false }); ell(0, -300, 12, 12, { wash: '#c8c0a0', washA: 1, w: 1.4, col: L }); pop();   // бунчук Кавгадыя
    const fall = sm((t - EV.bo_win) / 0.35);                         // московский стяг падает
    push(700, 1270, 0.9, fall * 1.3); pencil([[0, 0], [0, -320]], { w: 6, col: '#2a1a10', pass2: false }); const wv = Math.sin(t * 5) * 10; shape([[0, -320], [140, -300 + wv], [120, -250 + wv], [150, -200 + wv], [0, -210]], { wash: '#8a2a2a', washA: 1, w: 2, col: L }); txt('М', 60, -250, 40, { col: '#f0d8b0', font: 'Osw' }); pop();
    if (t > EV.bo_win) { const q = popK(t, EV.bo_win, 0.3); push(800, 1100, q, -0.05); rect(-120, -32, 240, 64, { wash: '#16120c', washA: 0.86, w: 2.4, col: '#e8a090' }); txt('МОСКВА ↘', 0, 10, 38, { col: '#ffd8c8', font: 'Osw' }); pop();
      for (let i = 0; i < 18; i++) { const r = rng(hsh(FRAME, i, 9)); ell(700 + (r() - 0.3) * 260, 1270 - r() * 80 * (1 - sm((t - EV.bo_win) / 0.8)), 10 + r() * 14, 6 + r() * 8, { wash: '#f4f8ff', washA: 0.7, line: false }); } }
  }
  function army(t) {                                                // тверская дружина слева: стяги, копья, щиты, всадники
    for (let k = 0; k < 5; k++) rider(200 + k * 110, 1340 + (k % 2) * 20, 0.34, t, { col: k % 2 ? '#3a5a3a' : '#5a4a3a', horseCol: k % 2 ? '#4a2a18' : '#d8d0c0', hat: 'helmet', spear: true, banner: k === 1 ? TV.green : k === 3 ? TV.red : null, walk: 1 });
    for (let k = 0; k < 7; k++) { const x = 280 + k * 70; human(x, 1420 + (k % 3) * 8, 0.36, t, { body: '#6a6a6a', legs: '#2a2a2a', hat: 'helmet', hatCol: '#8a8a8a', beard: 1, seed: 2350 + k, prop: 'spear', armR: 'hold' }); ell(x + 22, 1360 + (k % 3) * 8, 22, 30, { wash: k % 2 ? TV.red : TV.green, washA: 1, w: 1.6, col: L }); }
    for (const [x, c] of [[420, TV.green], [600, TV.red]]) { pencil([[x, 1420], [x, 980]], { w: 6, col: '#2a1a10', pass2: false }); const wv = Math.sin(t * 4 + x) * 16; shape([[x, 990], [x + 170, 1010 + wv], [x + 150, 1080 + wv], [x + 180, 1150 + wv], [x, 1130]], { wash: c, washA: 1, w: 2, col: L }); seal(x + 70, 1070, 24, t, { col: TV.gold }); }
  }
  function ground(t) {                                              // снег с колеями, обоз, сани, костёр, вороны
    shape([[-600, 1440], [1800, 1430], [1800, 2400], [-600, 2400]], { wash: '#dfe6f0', washA: 1, line: false });
    hatch(pathOf([[-600, 1440], [1800, 1430], [1800, 2400], [-600, 2400]]), { x: -200, y: 1440, w: 1500, h: 700 }, { ang: 0.1, gap: 18, w: 1.2, col: '#8a9ab8', a: 0.3 });
    for (let k = 0; k < 3; k++) pencil(spline([[-100, 1700 + k * 30], [400, 1600 + k * 20], [900, 1560 + k * 10], [1400, 1540]], false, 20), { w: 5, col: '#9aa8c0', a: 0.7, pass2: false });   // колеи
    push(880, 1640, 0.62); blob([[-150, 0], [-160, -40], [150, -40], [180, -10], [150, 0]], { wash: '#6a4a2a', washA: 1, w: 2, col: L }); pencil([[-170, 10], [200, 10], [230, -20]], { w: 6, col: '#3a2410', pass2: false });
      blob([[-130, -40], [-120, -150], [0, -180], [120, -150], [130, -40]], { wash: '#7a2a2a', washA: 1, w: 2.2, col: L, shade: { gap: 7, a: 0.25, col: L, ang: 1 } }); rect(-30, -130, 60, 50, { wash: '#2a1a10', washA: 1, w: 1.6, col: L }); pop();   // возок
    horse(1060, 1640, 0.42, t, { col: '#3a2a1e', flip: -1, saddle: 1 });
    push(560, 1700, 0.6); for (let k = 0; k < 5; k++) pencil([[-40 + k * 20, 0], [-20 + k * 10, -30]], { w: 6, col: '#3a2410', pass2: false }); glow(0, -40, 110, 'rgba(255,150,70,1)', 0.6 * flick(t)); blob([[-30, -30], [-12, -90 - Math.sin(t * 9) * 8], [0, -56], [14, -100 + Math.sin(t * 7) * 8], [30, -30]], { wash: '#f0a040', washA: 0.9, line: false }); pop();
    for (const [x, c] of [[480, '#3a4a3a'], [650, '#5a3a2a']]) human(x, 1720, 0.5, t, { body: c, legs: '#2a2a2a', hat: 'fur', hatCol: '#2a1a10', beard: 1, seed: 2360 + x, armR: 'hold', look: [0.2, -0.3], flip: x > 560 ? -1 : 1 });
    barrel(420, 1800, 0.5); sack(740, 1810, 0.55, '#c8b08a'); crate(980, 1820, 110, 60); jug(360, 1830, 0.42);
    for (let k = 0; k < 3; k++) { const x = 1140 + k * 50, y = 1760 + (k % 2) * 16, hop = Math.abs(Math.sin(t * 3 + k)) * 6; ell(x, y - hop, 18, 12, { wash: '#14121a', washA: 1, w: 1.2, col: L }); ell(x + 16, y - 12 - hop, 8, 7, { wash: '#14121a', washA: 1, line: false }); }   // вороны
    for (let i = 0; i < 6; i++) { const x = 200 + i * 160, y = 1880; ell(x, y, 60, 14, { wash: '#f6f8fc', washA: 1, w: 1.2, col: '#9aa8c0', a: 0.6 }); }   // сугробы
  }
  function front(t) {                                               // передний план: ёлки в снегу и копьё в сугробе
    for (const [x, h] of [[-80, 900], [1200, 760]]) { for (let k = 0; k < 6; k++) { const y = 2100 - k * h / 6, w = 260 - k * 36; poly([[x - w, y], [x, y - h / 4], [x + w, y]], { wash: '#16261e', washA: 1, w: 2, col: L }); pencil([[x - w * 0.8, y - 6], [x + w * 0.6, y - 10]], { w: 8, col: '#f0f4fa', pass2: false }); } }
  }
  function hud(t) {
    if (t > EV.bo_horde - 0.05) { const q = popK(t, EV.bo_horde - 0.05, 0.35); push(800, 1040, q, 0.03);   // ставка хана
      ell(0, 0, 200, 150, { wash: '#1a1414', washA: 0.95, w: 3, col: '#c89a6a' });
      yurt(0, 80, 0.5, t, { col: '#4a3a34' }); rect(-110, 60, 220, 30, { wash: '#7a2a2a', washA: 1, w: 1.6, col: L });
      push(-40, 56, 0.5, sm((t - EV.bo_kill) / 0.3) * 0.6); blob([[-40, 0], [-36, -40], [0, -54], [36, -40], [40, 0]], { wash: '#8a1a1a', washA: 1, w: 2, col: L }); pencil([[-40, -6], [40, -6]], { w: 8, col: '#5a3a1a', pass2: false }); pop();   // шапка князя
      const lit = t < EV.bo_kill ? 1 : 1 - sm((t - EV.bo_kill) / 0.25); candle(60, 70, 0.5, t, 1, lit);
      txt('ОРДА, 1318', 0, -110, 32, { col: '#e8c8a0', font: 'Osw' }); pop(); }
    if (t > EV.bo_donos - 0.05) { push(560, 1250, popK(t, EV.bo_donos - 0.05, 0.3), -0.1); rect(-120, -50, 240, 100, { wash: '#efe0b8', washA: 1, w: 2.4, col: L }); txt('ДОНОС', 0, 12, 46, { col: '#5a1a12', font: 'Osw' }); seal(110, 46, 30, t, { txt: 'М', col: '#8a2a2a' }); pop(); }
    if (t > EV.bo_score2 - 0.05) scoreHud(t, 3, 1, { t0: EV.bo_score2 - 0.05, side: 1 });
    else if (t > EV.bo_score - 0.05) scoreHud(t, 3, 0, { t0: EV.bo_score - 0.05, side: -1 }); else scoreHud(t, 2, 0);
  }
  WORLD.bortenevo = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(15, () => far(t));
    lay(5, () => retreat(t));
    lay(2.6, () => army(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    snowfall(t, 0.8, 23405, 120);
    glow(880, 1100, 700, 'rgba(255,170,110,1)', 0.12);
    haze('#a8b0c8', 0.06);
  };
  DIR.bortenevo = {
    outfit: 'bogatyr', light: { side: 1, rim: '#ffc890' }, grade: ['#6a7aa0', 0.14],
    act: () => [[S0.bortenevo, 'talk'], [EV.bo_win, 'proud'], [EV.bo_score, 'grin'], [EV.bo_horde, 'shock'], [EV.bo_donos, 'annoyed']],
    pose: (t, u, b) => Object.assign(b, { x: 270, y: 1600, s: 1.0, look: t < EV.bo_horde ? [0.8, -0.4] : [0.6, -0.6], tailUp: t > EV.bo_win && t < EV.bo_horde, frost: 0.3,
      point: t > EV.bo_win && t < EV.bo_horde ? 1 : undefined, hand: t > EV.bo_win && t < EV.bo_horde ? [240, -300] : undefined }),
    cam: () => [[S0.bortenevo, 560, 980, 0.16], [EV.bo_win, 640, 960, 0.06, 'x'], [EV.bo_horde, 620, 920, 0.1], [EV.bo_donos, 600, 980, 0.14], [S1.bortenevo, 600, 960, 0.18]],
    hud
  };
  TRANS_IN.bortenevo = { a: 0.2, b: 0.4, fx(k, t, A, B) {           // ладья: огромный полосатый парус проносится через кадр слева направо
    const x = lerp(-900, 1900, sm(k));
    drawBuf(B); scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(x, 0, W - x + 20, H); ctx.clip(); drawBuf(A); ctx.restore(); ladya(x - 120, 1500, 2.6, t, { crew: false, oars: false, shields: true, sym: 'Т', symCol: TV.green }); });
  } };
})();
