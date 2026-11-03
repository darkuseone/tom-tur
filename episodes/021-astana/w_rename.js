/* 021 — сцена `rename`: 2019 → 2022, морозное утро, въезд в город по трассе. Огромная бирюзовая стела с табличкой; на автовышке двое
   монтажников. На «Нур-Султан» табличка показывает НУР-СУЛТАН (календарь 2019), на «снова Астана» её снимают и вешают АСТАНА
   (календарь 2022), на «Табличкам» — у ног Тома растёт стопка старых табличек (АКМОЛА, ЦЕЛИНОГРАД…), Том похлопывает их.
   Позёмка, пар из выхлопных труб, грузовики с фарами. Переход В сцену — табличка вылетает из часов и закрывает кадр. */
(() => {
  EV.rn_nur = wtk('s1', 'Нур-Султан');
  EV.rn_22 = wtk('s1', 'второй');
  EV.rn_ast = wtk('s1', 'Астана');
  EV.rn_pile = wtk('s1', 'Табличкам');
  KEYW.push('Нур-Султан,', 'Астана.');
  SHAKES.push([EV.rn_ast + 0.25, 0.2, 5]);

  function sky(t) {
    vgrad(-900, 1300, ['#5a7aa8', '#8aa8c8', '#d8c8d0', '#f2d0b0', '#ffe8c8'], 1);
    ell(900, 860, 60, 60, { wash: '#fff4d8', washA: 1, line: false }); glow(900, 860, 420, 'rgba(255,220,180,1)', 0.45);
    rays(900, 860, Math.PI * 0.75, 1.2, 900, 'rgba(255,230,200,0.6)', 0.12, 6, t);
    clouds(t, -500, 6, '#e8e0ea', 21021, 0.6); birds(t, 5, [0, -200, 1100, 200], 21022, '#2a2a3a');
  }
  function far(t) {
    skylineA(1160, t, { col: '#7a8aa8', colL: '#ffe0c0', on: 0.25, white: '#e8e8f0', dome: '#6ab0d8' });
    baiterek(1120, 1170, 0.28, t, { white: '#e8eaf0' });
    for (let k = 0; k < 4; k++) smokeCol(-80 + k * 90, 1000, t, { col: 'rgba(240,240,248,0.7)', h: 500, sz: 0.5, n: 7, wind: 300, sp: 0.06 });   // ТЭЦ: пар в мороз
    for (let k = 0; k < 4; k++) rect(-110 + k * 90, 1000, 40, 170, { wash: '#8a8a98', washA: 1, w: 1.4, col: AZ.ink, a: 0.6 });
  }
  function road(t) {                                               // трасса: снежные валы, разметка, машины с фарами, столбы
    const L = AZ.ink; steppeGround(1180, t, { snow: '#eef2f8', snowA: 0.9, tufts: 14, wind: 1.6, seed: 21023 });
    rect(-700, 1230, 2500, 110, { wash: '#6a6a74', washA: 1, w: 1.6, col: L }); for (let x = -600; x < 1700; x += 160) rect(x + ((t * 300) % 160), 1282, 80, 8, { wash: '#f2f2ea', washA: 1, line: false });
    pencil([[-700, 1226], [1800, 1226]], { w: 10, col: '#f4f6fa', pass2: false }); pencil([[-700, 1344], [1800, 1344]], { w: 14, col: '#f4f6fa', pass2: false });
    for (const [x0, sp, col, dir] of [[-300, 260, '#c8302a', 1], [200, 200, '#2a5a8a', -1], [600, 320, '#e8e2d8', 1]]) {
      const x = ((x0 + t * sp * dir) % 2200 + 2200) % 2200 - 500, y = dir > 0 ? 1310 : 1262;
      push(x, y, 0.55, 0, dir); rect(-120, -70, 240, 54, { wash: col, washA: 1, w: 2, col: L }); poly([[-70, -70], [-40, -118], [60, -118], [90, -70]], { wash: lerpC(col, '#ffffff', 0.2), washA: 1, w: 2, col: L }); rect(-30, -110, 50, 34, { wash: '#a8c8d8', washA: 1, w: 1.4, col: L });
      for (const wx of [-70, 70]) ell(wx, -14, 22, 22, { wash: '#1a1a1e', washA: 1, w: 1.6, col: L }); glow(120, -48, 70, 'rgba(255,240,200,1)', 0.7); smokeCol(-130, -40, t, { col: 'rgba(240,240,250,0.6)', h: 90, sz: 0.25, n: 4, wind: -120 * dir, sp: 0.5 }); pop(); }
    for (let k = 0; k < 6; k++) { const x = -200 + k * 300; pole(x, 1226, 260, t, { lamp: 0.4, wood: '#5a5a62' }); }
  }
  function sign(t) {                                               // стела с табличкой + автовышка + монтажники
    const swap = clamp((t - EV.rn_22) / Math.max(0.3, EV.rn_ast - EV.rn_22)), after = t > EV.rn_ast;
    const nm = t < EV.rn_nur - 0.15 ? '' : after ? 'АСТАНА' : 'НУР-СУЛТАН', drop = after ? 0 : sm(swap) * 120, tilt = after ? Math.sin((t - EV.rn_ast) * 14) * 0.05 * Math.exp(-(t - EV.rn_ast) * 3) : sm(swap) * 0.12;
    push(0, drop, 1); stela(660, 1240, 0.95, t, nm, { tilt, bg: after ? AZ.turq : '#2a5a8a' }); pop();
    if (t > EV.rn_ast && t < EV.rn_ast + 0.6) { const q = (t - EV.rn_ast) / 0.6; for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283; ell(660 + Math.cos(a) * 380 * q, 830 + Math.sin(a) * 120 * q, 14 * (1 - q), 14 * (1 - q), { wash: '#ffffff', washA: 0.9, line: false }); } }
    // автовышка справа
    const L = AZ.ink; push(1110, 1300, 0.85); rect(-180, -150, 300, 110, { wash: '#e8a83a', washA: 1, w: 2.4, col: L }); rect(60, -230, 120, 190, { wash: '#e8a83a', washA: 1, w: 2.4, col: L }); rect(80, -210, 80, 60, { wash: '#a8c8d8', washA: 1, w: 2, col: L });
    for (const wx of [-120, 0, 130]) ell(wx, -36, 40, 40, { wash: '#1a1a1e', washA: 1, w: 2, col: L }); txt('АВАРИЙНАЯ', -40, -96, 26, { col: '#14100a', font: 'Osw' }); pop();
    const bx = 1080, by = 1180, tx = 900, ty = 770; pencil([[bx, by], [lerp(bx, tx, 0.5) + 60, lerp(by, ty, 0.5)], [tx + 40, ty + 80]], { w: 16, col: '#e8e4dc', pass2: false });
    rect(tx - 40, ty + 60, 150, 70, { wash: '#e8a83a', washA: 1, w: 2.4, col: L });
    human(tx, ty + 64, 0.42, t, { body: '#e86a2a', legs: '#2a2a30', hat: 'helmet', seed: 71, armL: t < EV.rn_ast ? 'up' : 'wave', armR: 'up' });
    human(tx + 70, ty + 64, 0.42, t, { body: '#e86a2a', legs: '#2a2a30', hat: 'helmet', seed: 72, armR: 'up', flip: -1 });
  }
  function crew(t) {                                               // на земле: прораб, зеваки, конусы, лопаты, ящики
    const L = AZ.ink;
    for (const cx of [420, 500, 880, 960]) { poly([[cx - 22, 1420], [cx, 1350], [cx + 22, 1420]], { wash: '#e8582a', washA: 1, w: 1.8, col: L }); rect(cx - 16, 1384, 32, 8, { wash: '#f4f4f4', washA: 1, line: false }); }
    human(820, 1420, 0.52, t, { body: '#e86a2a', legs: '#2a2a30', hat: 'helmet', seed: 73, prop: 'scroll', armR: 'hold', flip: -1 });
    kman(560, 1400, 0.46, t, { body: '#3a3a4a', hat: 'fur', hatCol: '#4a3a2a', seed: 74, prop: 'phone', armR: 'up' });
    human(620, 1404, 0.4, t, { body: '#b8302a', legs: '#2a2a30', hat: 'scarf', hatCol: '#f2ead8', seed: 75, long: 1, armL: 'point' });
    kman(470, 1396, 0.36, t, { body: '#6a4a2a', hat: 'fur', hatCol: '#d8d0c0', seed: 76, armR: 'hold' });
    human(1000, 1430, 0.5, t, { body: '#2a4a6a', legs: '#2a2a30', hat: 'cap', hatCol: '#e8a83a', seed: 77, prop: 'stick', armR: 'hold', flip: -1 });
    dog(720, 1440, 0.4, t, { bark: t > EV.rn_ast ? 1 : 0, flip: -1 });
    crate(700, 1450, 110, 60, { col: '#5a6a7a' }); txt('ИНСТРУМЕНТ', 755, 1424, 14, { col: '#f2ead8', font: 'Osw' });
    pencil([[1180, 1500], [1230, 1300]], { w: 6, col: '#6a4a2a', pass2: false }); poly([[1210, 1300], [1260, 1300], [1250, 1250], [1215, 1250]], { wash: '#c8302a', washA: 1, w: 1.6, col: L });   // лопата в сугробе
    barrel(1060, 1470, 0.5, '#3a5a8a'); sack(380, 1440, 0.5, '#c8b08a');
  }
  function pile(t) {                                               // стопка старых табличек у ног Тома
    const n = t < EV.rn_pile - 0.1 ? 0 : 4, items = [['АКМОЛИНСК', '#6a4a2a'], ['ЦЕЛИНОГРАД', '#b8302a'], ['АКМОЛА', '#3a5a3a'], ['НУР-СУЛТАН', '#2a5a8a']];
    items.forEach(([s, c], i) => { if (i >= n && !(t > EV.rn_ast + 0.3 && i === 3)) return; const k = popK(t, EV.rn_pile + i * 0.12, 0.35); if (k <= 0 && !(i === 3 && t > EV.rn_ast + 0.3)) return;
      const kk = i === 3 && t < EV.rn_pile ? sm((t - EV.rn_ast - 0.3) / 0.4) : Math.max(k, i === 3 ? 1 : 0);
      push(540, 1500 - i * 40 - 200 * (1 - kk), 0.5, (i % 2 ? 0.08 : -0.06)); rect(-210, -42, 420, 84, { wash: c, washA: 1, w: 3, col: AZ.ink }); txt(s, 0, 4, 54, { col: '#f6ecd6', font: 'Osw' }); pop(); });
  }
  function front(t) {
    const L = '#0e0a06';
    pencil(spline([[-160, 200], [20, 300], [140, 300], [240, 360]], false, 10), { w: 20, col: '#f0ece4', pass2: false }); pencil(spline([[-160, 206], [20, 306], [140, 306], [240, 366]], false, 10), { w: 6, col: '#2a2420', a: 0.6, pass2: false });
    for (let k = 0; k < 7; k++) { const x = -40 + k * 40, y = 300 + Math.sin(k) * 30; pencil([[x, y], [x + 10, y + 70 + k * 6]], { w: 2, col: '#3a2a20', pass2: false }); ell(x + 10, y + 74 + k * 6, 10, 6, { wash: '#f4f6fa', washA: 1, line: false }); }
    blob([[1100, 2100], [1080, 1600], [1180, 1560], [1300, 1600], [1320, 2100]], { wash: '#eef2f8', washA: 1, w: 2, col: '#5a6a7a' });
  }

  WORLD.rename = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => far(t));
    lay(6, () => road(t));
    lay(3, () => sign(t));
    lay(1, () => { crew(t); cat(); pile(t); });
    lay(0.65, () => front(t));
    snowfall(t, 0.8, 21024, 420); windLines(t, 0.5, [-100, 1100, 1200, 1600], 21025, '#ffffff');
    haze('#c8d0e8', 0.06);
  };
  DIR.rename = {
    outfit: 'pufferA', light: { side: 1, rim: '#ffe0c0' }, grade: ['#8aa0c8', 0.12],
    act: () => [[S0.rename, 'cold'], [EV.rn_nur, 'smug'], [EV.rn_22, 'suspicious'], [EV.rn_ast, 'shock'], [EV.rn_pile, 'sideeye']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1500, s: 1.04, frost: 0.5, look: t < EV.rn_pile ? [0.7, -0.5] : [0.5, 0.4], chatter: t < EV.rn_nur,
      point: t > EV.rn_nur && t < EV.rn_pile ? 1 : undefined, hand: t > EV.rn_nur && t < EV.rn_pile ? [200, -330] : t > EV.rn_pile ? [170, -170 + Math.abs(Math.sin(t * 9)) * 20] : undefined }),
    cam: () => [[S0.rename, 620, 980, 0.18], [EV.rn_nur, 600, 960, 0.08], [EV.rn_ast, 620, 930, 0.14, 'x'], [EV.rn_pile, 500, 1080, 0.2], [S1.rename, 480, 1100, 0.24]],
    hud: t => { if (t < EV.rn_nur || t > EV.rn_pile + 0.4) return; const y22 = t > EV.rn_22; push(250, 720, 1, -0.05); rect(-90, -70, 180, 140, { wash: '#f2ead8', washA: 1, w: 3, col: AZ.ink }); rect(-90, -70, 180, 40, { wash: '#c8302a', washA: 1, w: 3, col: AZ.ink }); txt(y22 ? '2022' : '2019', 0, 18, 64 * (y22 ? popK(t, EV.rn_22, 0.3) : 1), { col: '#14100a', font: 'Osw' }); pop(); }
  };
  TRANS_IN.rename = { a: 0.15, b: 0.4, fx(k, t, A, B) {             // табличка вылетает из часов и закрывает кадр, потом уходит вниз
    if (k < 0.5) drawBuf(A); else drawBuf(B);
    scr(() => { const s = k < 0.5 ? lerp(0.15, 3.2, sm(k / 0.5)) : 3.2, dy = k < 0.5 ? 0 : sm((k - 0.5) / 0.5) * 2200, rot = (1 - k) * 0.6;
      push(540, 900 + dy, s, rot); rect(-210, -80, 420, 160, { wash: AZ.turq, washA: 1, w: 4, col: AZ.ink }); pencil([[-196, -66], [196, -66], [196, 66], [-196, 66], [-196, -66]], { w: 3, col: AZ.gold, pass2: false }); txt('2019', 0, 6, 100, { col: '#f6ecd6', font: 'Osw' }); pop();
      windLines(t, 1 - k, [-100, 200, 1200, 1700], 21026); });
  } };
})();
