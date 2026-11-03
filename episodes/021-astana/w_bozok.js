/* 021 — сцена `bozok`: X век, озеро Бозок у излучины Ишима. Сначала — голая степь под полуденным солнцем (миф «пустое место»,
   рукописная заметка «пустое место?»). На «Тысячу лет» из земли в облаке пыли поднимается город Бозок: глинобитные стены с башнями,
   дома с плоскими крышами, купол с бирюзовой глазурью, ворота, караван, базар, мастера, дым очагов. На «Бозок!» — бирка
   «БОЗОК · VIII–XVI вв.» и в небе на миг проступает призрак Байтерека (тот же город через тысячу лет).
   Переход В сцену — ковыль косой волной сметает крепость 1830-го и солнце даёт вспышку. */
(() => {
  EV.bz_empty = wtk('s7', 'пустом');
  EV.bz_97 = wtk('s7', 'девяносто');
  EV.bz_rise = wtk('s7', 'Тысячу');
  EV.bz_city = wtk('s7', 'город');
  EV.bz_name = wtk('s7', 'Бозок!');
  KEYW.push('седьмом?', 'Бозок!');
  SHAKES.push([EV.bz_rise, 0.6, 7]);
  const R = t => sm((t - EV.bz_rise) / 0.9);                     // подъём города

  function sky(t) {
    vgrad(-900, 1300, ['#1e6aa0', '#3a9ac0', '#8ad0d8', '#e8f0d8', '#fff0c0'], 1);
    ell(300, -260, 70, 70, { wash: '#fffad8', washA: 1, line: false }); glow(300, -260, 560, 'rgba(255,250,210,1)', 0.6);
    clouds(t, -560, 6, '#ffffff', 21081, 0.7); birds(t, 6, [-100, -300, 1200, 300], 21082, '#2a3040');
    for (let k = 0; k < 2; k++) { const x = 700 + Math.sin(t * 0.5 + k * 3) * 200, y = 200 + k * 120; pencil([[x - 40, y], [x, y - 10], [x + 40, y]], { w: 4, col: '#2a2420', pass2: false }); }   // беркуты
    if (t > EV.bz_name - 0.1) { const a = 0.22 * sm((t - EV.bz_name + 0.1) / 0.5); push(860, 1150, 0.6); sil([[-20, 0], [-14, -700], [-100, -840], [-110, -960], [0, -1040], [110, -960], [100, -840], [14, -700], [20, 0]], '#fff4d8', a); pop(); }   // призрак Байтерека
  }
  function far(t) { hills(1120, 46, '#a8a070', 21083, 1); ishim(1110, 1150, t, { top: '#6ab0c0', bot: '#3a7a8a' }); for (let k = 0; k < 10; k++) { const x = -100 + k * 140; blob([[x - 30, 1112], [x - 10, 1080], [x + 20, 1078], [x + 34, 1112]], { wash: '#5a8a4a', washA: 1, line: false }); } }   // озеро и камыш
  function city(t) {                                               // город поднимается из-под земли
    const r = R(t); if (r <= 0) return; const L = AZ.ink, dy = (1 - r) * 520;
    ctx.save(); ctx.beginPath(); ctx.rect(-900, -900, 2900, 2190); ctx.clip();
    push(0, dy, 1);
    const wall = '#c89a62', wallD = '#8a6438';
    // стена с башнями
    const w = rect(-300, 1060, 1700, 230, { wash: wall, washA: 1, w: 2.4, col: L }); hatch(w.path, w.bb, { gap: 14, a: 0.22, col: wallD, ang: 0.05, w: 1.2 });
    for (let x = -280; x < 1400; x += 44) rect(x, 1040, 26, 24, { wash: wall, washA: 1, w: 1.8, col: L });   // зубцы
    for (const tx of [-120, 260, 820, 1200]) { const tw = rect(tx - 60, 960, 120, 330, { wash: '#b8885a', washA: 1, w: 2.4, col: L }); hatch(tw.path, tw.bb, { gap: 12, a: 0.25, col: wallD, ang: 1.4, w: 1.2 }); for (let k = 0; k < 3; k++) rect(tx - 56 + k * 44, 936, 24, 26, { wash: '#b8885a', washA: 1, w: 1.8, col: L }); rect(tx - 10, 1040, 20, 40, { wash: '#3a2410', washA: 1, w: 1.4, col: L }); }
    // ворота с аркой
    push(540, 1290, 1); blob([[-110, 0], [-110, -230], [0, -300], [110, -230], [110, 0]], { wash: '#a8784a', washA: 1, w: 2.6, col: L }); blob([[-60, 0], [-60, -160], [0, -210], [60, -160], [60, 0]], { wash: '#3a2410', washA: 1, w: 2, col: L });
    for (let k = 0; k < 9; k++) rect(-100 + k * 22, -250, 16, 16, { wash: AZ.turq, washA: 1, w: 1, col: L }); pop();
    // за стеной: купол с бирюзой, плоские крыши, дым
    push(820, 1060, 1); rect(-90, -160, 180, 160, { wash: '#d8b080', washA: 1, w: 2.2, col: L }); blob([[-100, -160], [-90, -240], [0, -300], [90, -240], [100, -160]], { wash: AZ.turq, washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.25, col: '#0a3e44', ang: 1 } }); pencil([[0, -300], [0, -350]], { w: 4, col: AZ.gold, pass2: false }); pop();
    for (let k = 0; k < 7; k++) { const x = -200 + k * 170; if (Math.abs(x - 540) < 120) continue; rect(x, 1000 - (k % 3) * 20, 120, 70, { wash: k % 2 ? '#d8b080' : '#c8a070', washA: 1, w: 1.8, col: L }); rect(x + 40, 1030 - (k % 3) * 20, 20, 24, { wash: '#3a2410', washA: 1, line: false }); if (k % 2) smokeCol(x + 90, 990 - (k % 3) * 20, t, { col: 'rgba(220,210,200,0.55)', h: 200, sz: 0.25, n: 4, wind: 120, sp: 0.2 }); }
    pop(); ctx.restore();
    if (r < 1) motes(60, [-200, 900, 1300, 1300], '#c8a070', t, 21084, { sp: 60, vx: 60, sz: 8, a: 0.8 * (1 - r), wob: 40 });
  }
  function life(t) {                                               // перед воротами: караван, базар, мастера, пастухи
    const r = R(t), L = AZ.ink; if (r <= 0.3) return; const a = clamp((r - 0.3) / 0.5);
    ctx.save(); ctx.globalAlpha = a;
    camel(860, 1380, 0.4, t, { load: '#b8302a', flip: -1 }); camel(1010, 1390, 0.38, t, { load: AZ.turq, flip: -1 });
    kman(780, 1380, 0.44, t, { body: '#6a2a2a', hat: 'fur', hatCol: '#3a2410', beard: 1, seed: 151, prop: 'stick', armR: 'hold', flip: -1 });
    // базарный навес с коврами и посудой
    push(420, 1400, 1); for (const sd of [-1, 1]) pencil([[sd * 110, 0], [sd * 110, -160]], { w: 6, col: '#6a4a2a', pass2: false }); blob([[-130, -160], [0, -200], [130, -160], [120, -140], [-120, -140]], { wash: '#c8302a', washA: 1, w: 2, col: L });
    rect(-100, -70, 200, 70, { wash: '#8a5a2a', washA: 1, w: 2, col: L }); for (let k = 0; k < 4; k++) jug(-70 + k * 46, -70, 0.45, ['#b8622a', AZ.turq, '#d8a83a', '#8a3a2a'][k]); pop();
    kman(500, 1410, 0.42, t, { body: '#2a4a6a', hat: 'scarf', hatCol: '#f2ead8', seed: 152, armL: 'wave', flip: -1 });
    kman(340, 1404, 0.4, t, { body: '#5a3a1a', hat: 'fur', hatCol: '#6a4a2a', seed: 153, armR: 'point' });
    human(620, 1394, 0.36, t, { body: '#7a5a2a', legs: '#3a2a1a', seed: 154, prop: 'axe', armR: 'swing' });   // мастер
    kman(1120, 1420, 0.44, t, { body: '#3a2a4a', hat: 'fur', hatCol: '#2a1a14', seed: 155, armL: 'up', flip: -1 });
    ctx.restore();
  }
  function ground(t) {
    steppeGround(1290, t, { top: '#d8b058', bot: '#8a6a2a', tufts: 18, wind: 1.2, seed: 21085 });
    const r = R(t), L = AZ.ink;
    horse(170, 1410, 0.4, t, { col: '#5a3a1e' }); kman(240, 1400, 0.38, t, { body: '#4a3a2a', hat: 'fur', hatCol: '#5a3a1e', seed: 156, armR: 'hold' });
    for (let k = 0; k < 7; k++) { const x = 600 + k * 56 + Math.sin(t + k) * 10, y = 1460 + (k % 2) * 16; ell(x, y, 22, 14, { wash: '#efe6d2', washA: 1, w: 1.4, col: L }); ell(x + 20, y - 8, 8, 8, { wash: '#2a2420', washA: 1, line: false }); }   // овцы
    push(1040, 1700, 1.1); blob([[-40, 0], [-46, -120], [-34, -190], [-40, -230], [0, -270], [40, -230], [34, -190], [46, -120], [40, 0]], { wash: '#8a8478', washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.3, col: '#3a3630', ang: 1.2 } }); pencil([[-16, -230], [-6, -228]], { w: 3, col: L, pass2: false }); pencil([[6, -228], [16, -230]], { w: 3, col: L, pass2: false }); pencil([[-26, -150], [24, -170]], { w: 3, col: L, pass2: false }); pop();   // каменный балбал
    for (const [x, y] of [[860, 1720], [420, 1760], [140, 1820]]) { push(x, y, 0.9); for (let k = 0; k < 7; k++) pencil(spline([[0, 0], [Math.cos(-0.3 - k * 0.4) * 40, -40], [Math.cos(-0.3 - k * 0.4) * 70, -60 - (k % 3) * 14]], false, 6), { w: 4, col: '#6a5a3a', pass2: false }); pop(); }   // саксаул
    for (const [x, y, s] of [[700, 1560, 0.8], [900, 1620, 1], [150, 1640, 0.9]]) { push(x, y, s); ell(0, 0, 70, 26, { wash: '#a89a88', washA: 1, w: 1.6, col: L }); pop(); }
    if (r > 0.4) { push(980, 1580, 0.9); ell(0, 0, 80, 22, { wash: '#8a6a3a', washA: 1, w: 1.6, col: L }); for (let k = 0; k < 4; k++) jug(-50 + k * 34, 0, 0.4, ['#b8622a', AZ.turq, '#d8a83a', '#8a3a2a'][k]); pop(); }   // черепки и кувшины
    push(560, 1700, 1); rect(-60, -24, 120, 24, { wash: '#c89a62', washA: 1, w: 1.8, col: L }); for (let k = 0; k < 3; k++) rect(-56 + k * 40, -48, 34, 24, { wash: '#b8885a', washA: 1, w: 1.4, col: L }); pop();   // кирпичи-сырцы
  }
  function front(t) {
    for (let i = 0; i < 5; i++) kovyl(-80 + i * 40, 2050, 3.2, t, { col: '#f2d078' }); for (let i = 0; i < 4; i++) kovyl(1100 + i * 50, 2080, 3, t, { col: '#f2d078' });
  }
  function hud(t) {
    if (t > EV.bz_empty - 0.05 && t < EV.bz_rise) { const q = popK(t, EV.bz_empty - 0.05, 0.3); push(640, 1040, q, -0.05); rect(-230, -50, 460, 100, { wash: '#f3e6c8', washA: 0.95, w: 3, col: AZ.ink }); txt('«пустое место»?', 0, 6, 54, { col: '#14100a', font: 'Hand' }); pop(); }
    if (t > EV.bz_97 && t < EV.bz_rise + 0.2) { const q = popK(t, EV.bz_97, 0.3); push(720, 860, q, 0.06); rect(-130, -50, 260, 100, { wash: '#14100a', washA: 0.85, w: 3, col: '#c8c0b0' }); txt('1997?', 0, 6, 64, { col: '#f2ead8', font: 'Osw' }); pop(); }
    if (t > EV.bz_name - 0.05) { const q = popK(t, EV.bz_name - 0.05, 0.35); push(620, 780, q, -0.04); rect(-240, -60, 480, 120, { wash: '#14100a', washA: 0.88, w: 3, col: AZ.turqL }); txt('БОЗОК', 0, -10, 60, { col: AZ.turqL, font: 'Osw' }); txt('VIII–XVI вв.', 0, 38, 30, { col: '#f2ead8', font: 'Osw' }); pop(); }
  }

  WORLD.bozok = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => far(t));
    lay(6, () => city(t));
    lay(2.5, () => { ground(t); life(t); });
    lay(1, () => cat());
    lay(0.6, () => front(t));
    windLines(t, 0.3, [-100, 1300, 1200, 1700], 21086);
    haze('#f8e0a0', 0.05);
  };
  DIR.bozok = {
    outfit: 'shapan', light: { side: -1, rim: '#fff0c0' }, grade: ['#d8b060', 0.1],
    act: () => [[S0.bozok, 'suspicious'], [EV.bz_97, 'sideeye'], [EV.bz_rise, 'shock'], [EV.bz_city, 'awe'], [EV.bz_name, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 280, y: 1520, s: 1.04, look: t < EV.bz_rise ? [0.3, 0.1] : [0.6, -0.5], tilt: t < EV.bz_rise ? 0.06 : 0, tailUp: t > EV.bz_city,
      hand: t < EV.bz_rise && t > EV.bz_empty ? [130, -200] : t > EV.bz_city ? [210, -330] : undefined, point: t > EV.bz_city ? 1 : undefined }),
    cam: () => [[S0.bozok, 560, 1060, 0.14], [EV.bz_rise, 580, 1000, 0.06], [EV.bz_city, 580, 940, -0.02, 'x'], [S1.bozok, 580, 940, 0.04]],
    hud
  };
  TRANS_IN.bozok = { a: 0.25, b: 0.4, fx(k, t, A, B) {              // ковыль косой волной сметает прошлую эпоху, солнце вспыхивает
    drawBuf(A); const q = sm(k), x = -400 + q * 2200;
    scr(() => { inPath(new Path2D(`M${x - 800},0 L${x},0 L${x - 500},1920 L${x - 1300},1920 Z`), () => drawBuf(B)); if (x > 1400) drawBuf(B);
      for (let i = 0; i < 30; i++) { const y = i * 66, xx = x - i * 16; pencil(spline([[xx - 60, y + 40], [xx, y], [xx + 50, y - 30]], false, 6), { w: 6, col: i % 2 ? '#f2d078' : '#c89a3a', pass2: false, gap: false }); }
      glow(540, 600, 700, 'rgba(255,250,210,1)', 0.6 * Math.sin(Math.PI * k)); });
  } };
})();
