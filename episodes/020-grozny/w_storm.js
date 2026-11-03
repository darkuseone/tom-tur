/* 020 — сцена `storm`: ночь 31 декабря 1994, центр Грозного. Площадь у советских «сталинок» и девятиэтажек: новогодняя ёлка
   с гирляндой, часы на столбе, заснеженный трамвай. В небе — осветительные ракеты и трассы, за домами — зарево и дым; окна гаснут.
   Без людей в бою и без техники крупным планом: только город. На «Новогодний» — часы бьют 00:00 и табличка «31.12.1994»;
   на «штурм» — вспышки над крышами, тряска; на «руинах» — верх дома справа обрушивается в пыль, гирлянда гаснет.
   Переход В сцену — осветительная ракета пролетает дугой по кадру, вспышка гасит снег 1944-го. */
(() => {
  EV.st_war = wtk('s6', 'война.');
  EV.st_ny = wtk('s6', 'Новогодний');
  EV.st_storm = wtk('s6', 'штурм');
  EV.st_ruin = wtk('s6', 'руинах.');
  SHAKES.push([EV.st_storm, 0.4, 12], [EV.st_ruin, 0.5, 10]);
  KEYW.push('война.', 'штурм', 'руинах.');

  function sky(t) {
    vgrad(-900, 1300, ['#06060e', '#141428', '#3a2430', '#8a3a2a'], 1);
    const r = rng(19951); for (let i = 0; i < 40; i++) { ctx.fillStyle = '#e8ecff'; ctx.globalAlpha = 0.5; ctx.fillRect(r() * 1500 - 200, r() * 700 - 700, 2, 2); } ctx.globalAlpha = 1;
    for (let k = 0; k < 3; k++) { const ph = ((t - S0.storm) * 0.25 + k * 0.33) % 1, x = 200 + k * 330 + ph * 80, y = -400 + ph * 600; glow(x, y, 200, 'rgba(255,240,200,1)', 0.6 * (1 - ph)); ell(x, y, 10, 10, { wash: '#fff8e0', washA: 1, line: false }); pencil([[x, y], [x - 20, y - 120]], { w: 2, col: '#d8d0c0', a: 0.4 * (1 - ph), pass2: false }); }   // осветительные ракеты на парашютах
    const r2 = rng(hsh(FRAME, 95)); const n = t > EV.st_storm ? 10 : 4; for (let i = 0; i < n; i++) { const x0 = r2() * 1100; pencil([[x0, 1100], [x0 + (r2() - 0.5) * 300, 300 - r2() * 600]], { w: 2.4, col: i % 2 ? '#ff6a4a' : '#ffd07a', a: 0.6, pass2: false, gap: false }); }
    for (let k = 0; k < 4; k++) { smokeCol(-100 + k * 380, 1100, t + k, { n: 14, h: 1300, sz: 1.6, col: '#1a1414', a: 0.35, wind: 260, sp: 0.1 }); glow(-100 + k * 380, 1080, 300, 'rgba(255,110,40,1)', 0.45); }
  }
  function far(t) {                                               // силуэт города: дома, трубы, зарево между ними
    for (let k = 0; k < 12; k++) { const x = -300 + k * 150, h = 160 + (k * 53 % 5) * 50; rect(x, 1150 - h, 130, h, { wash: '#1a1620', washA: 1, w: 1.4, col: '#060408', a: 0.6 }); windows(x + 6, 1150 - h + 10, 118, h - 20, 4, Math.round(h / 40), 400 + k, t > EV.st_storm ? 0.05 : 0.25, '#ffc870', '#ffc870', 0.6); }
    for (let k = 0; k < 4; k++) { const x = 100 + k * 300, ph = ((t - EV.st_storm) * 2 + k * 0.4) % 1; if (t > EV.st_storm && ph < 0.2) glow(x, 1000, 160, 'rgba(255,200,120,1)', 0.9 * (1 - ph * 5)); }
  }
  function square(t) {                                             // площадь: «сталинка» слева, 9-этажка справа (обрушится), ёлка, часы, трамвай
    const L = '#0a0808', fall = t > EV.st_ruin ? sm((t - EV.st_ruin) / 0.6) : 0;
    const st = rect(-260, 860, 560, 420, { wash: '#8a7a6a', washA: 1, w: 2.2, col: L }); hatch(st.path, st.bb, { gap: 12, a: 0.12, col: '#2a2018', ang: 1.5, w: 1 }); shadeG(st.path, -260, 0, 300, 0, '#000000', 0.4);
    for (let f = 0; f < 5; f++) for (let c = 0; c < 7; c++) { const wx = -240 + c * 78, wy = 890 + f * 76; rect(wx, wy, 44, 52, { wash: t > EV.st_storm && (f + c) % 3 ? '#0e0a0a' : '#ffc070', washA: 1, w: 1.6, col: L }); pencil([[wx - 6, wy - 6], [wx + 50, wy - 6]], { w: 4, col: '#6a5a4a', pass2: false }); }   // окна с сандриками
    rect(-280, 840, 600, 26, { wash: '#6a5a4a', washA: 1, w: 2, col: L });   // карниз
    if (t > EV.st_storm) for (let k = 0; k < 2; k++) smokeCol(-100 + k * 260, 900, t, { n: 8, h: 600, sz: 0.8, col: '#141010', a: 0.6, wind: 200 });
    ctx.save(); if (fall > 0) { ctx.beginPath(); ctx.rect(560, 1300 - 640 + fall * 300, 700, 2000); ctx.clip(); }
    panel(600, 1300, 480, 640, t, { floors: 9, col: '#a09888', on: t > EV.st_storm ? 0.05 : 0.45, glowW: 1, seed: 7 }); ctx.restore();
    if (fall > 0) { panel(600, 1300, 480, 640 - fall * 300, t, { floors: 9, col: '#8a8070', ruin: 1, seed: 8 }); smokeCol(840, 1000 + fall * 300, t - EV.st_ruin, { n: 10, h: 500, sz: 1.4, col: '#8a8078', a: 0.8 * (1 - fall * 0.5), wind: 100, sp: 0.4 }); rubble(560, 1120, 1290, t, { n: 24, seed: 3 }); }
    // ёлка с гирляндой
    const tx = 420, ty = 1360, on = t > EV.st_ruin ? 0 : 1; for (let q = 0; q < 5; q++) { const w = 170 - q * 30, y = ty - 60 - q * 90; poly([[tx - w, y], [tx, y - 130], [tx + w, y]], { wash: '#1e3a26', washA: 1, w: 2, col: '#06140a', shade: { gap: 6, a: 0.3, col: '#06140a', ang: 1.2 } }); pencil([[tx - w + 10, y - 4], [tx + w - 10, y - 4]], { w: 6, col: '#eef2f6', a: 0.7, pass2: false }); }
    rect(tx - 20, ty - 60, 40, 60, { wash: '#4a2a1a', washA: 1, w: 1.6 }); for (let i = 0; i < 26; i++) { const r = rng(1995 + i), y = ty - 80 - r() * 440, w = (170 - (ty - 60 - y) / 90 * 30) * (r() * 1.6 - 0.8), c = ['#ff4a4a', '#ffd84a', '#4ad8ff', '#8aff6a'][i % 4]; ell(tx + w * 0.8, y, 8, 8, { wash: on ? c : '#2a2a2a', washA: 1, w: 1, col: L }); if (on && Math.sin(t * 6 + i) > 0) glow(tx + w * 0.8, y, 30, c, 0.6); }
    poly([[tx, ty - 540], [tx - 16, ty - 500], [tx + 16, ty - 500]], { wash: on ? '#ff3a3a' : '#4a2a2a', washA: 1, w: 1.6, col: L });   // красная верхушка-шпиль
    // уличные часы
    pencil([[150, 1380], [150, 1100]], { w: 10, col: '#1a1a1e', pass2: false }); ell(150, 1060, 54, 54, { wash: '#f2ecd8', washA: 1, w: 3, col: L }); const m = t > EV.st_ny ? 0 : -0.15; pencil([[150, 1060], [150 + Math.sin(m) * 40, 1060 - Math.cos(m) * 40]], { w: 4, col: L, pass2: false }); pencil([[150, 1060], [150, 1028]], { w: 6, col: L, pass2: false }); glow(150, 1060, 90, 'rgba(255,240,200,1)', 0.25);
    // трамвай
    push(900, 1400, 0.7); const tb = rect(-260, -200, 520, 170, { wash: '#c83a2a', washA: 1, w: 2.2, col: L }); rect(-260, -120, 520, 20, { wash: '#f2e8d0', washA: 1, w: 1.4, col: L }); for (let q = 0; q < 6; q++) rect(-240 + q * 82, -186, 60, 56, { wash: t > EV.st_storm ? '#141010' : '#ffd890', washA: 1, w: 1.6, col: L }); pencil([[-260, -200], [260, -200]], { w: 12, col: '#eef2f6', a: 0.9, pass2: false }); pencil([[0, -200], [-60, -360]], { w: 4, col: '#2a2a2a', pass2: false }); for (const wx of [-170, 170]) ell(wx, -26, 26, 26, { wash: '#1a1a1a', washA: 1, w: 1.6 }); txt('4', 200, -150, 40, { col: '#f2e8d0', font: 'Osw' }); pop();
    pencil([[-600, 640], [1700, 660]], { w: 2, col: '#2a2a2a', pass2: false });   // контактный провод
  }
  function ground(t) {
    rect(-600, 1380, 2400, 700, { wash: '#c8ccd8', washA: 1, w: 0, line: false });
    const r = rng(19952); for (let k = 0; k < 50; k++) { const x = -200 + r() * 1500, y = 1400 + r() * 600; ell(x, y, 8 + r() * 20, 4 + r() * 8, { wash: k % 4 ? '#8a90a0' : '#3a3030', washA: 0.8, line: false }); }
    pencil([[-600, 1440], [1700, 1430]], { w: 6, col: '#4a4a52', pass2: false }); pencil([[-600, 1470], [1700, 1460]], { w: 6, col: '#4a4a52', pass2: false });   // рельсы трамвая
    for (let k = 0; k < 4; k++) { const x = 700 + k * 110; push(x, 1600, 0.9); rect(-40, -60, 80, 60, { wash: '#6a6a72', washA: 1, w: 1.6 }); pop(); }   // бетонные блоки
    push(1100, 1640, 1); rect(-70, -100, 140, 100, { wash: '#2a3a5a', washA: 1, w: 2 }); txt('ХЛЕБ', 0, -50, 30, { col: '#f2e8d0', font: 'Osw' }); pop();   // киоск
    for (let k = 0; k < 6; k++) { const x = 560 + k * 46; pencil([[x, 1720], [x + 30, 1700]], { w: 3, col: '#8a8a8a', pass2: false }); }   // осколки стекла
    push(600, 1760, 1, 0.3); ell(0, 0, 60, 14, { wash: '#2a2a2a', washA: 1, w: 1.6 }); ell(50, -10, 14, 14, { wash: '#d83a3a', washA: 1, w: 1 }); ell(-30, -6, 12, 12, { wash: '#4ad8ff', washA: 1, w: 1 }); pop();   // упавшие ёлочные шары
    lamppost(1180, 1400, 360, t, { lamp: t > EV.st_storm ? 0 : 0.5 });
    const run = t > EV.st_storm ? (t - EV.st_storm) * 160 : 0;   // жители бегут в подъезды и подвалы с сумками
    for (const [x, y, sd, o] of [[560, 1520, 171, { body: '#3a2a3a', hat: 'scarf', hatCol: '#5a5a6a', long: 1, armR: 'hold' }], [640, 1530, 172, { body: '#2a2a30', hat: 'cap', hatCol: '#1a1a1a', armL: 'hold', armR: 'swing' }], [720, 1540, 173, { body: '#4a3a2a', hat: 'fur', hatCol: '#3a3a3a', beard: 1, armR: 'hold' }], [480, 1540, 174, { body: '#5a3a3a', seed: 174 }]])
      human(x - run * (x / 700), y, 0.62, t, Object.assign({ legs: '#1a1a20', seed: sd, flip: -1 }, o));
    push(980, 1560, 0.9); const L = '#0a0808'; blob([[-160, 0], [-150, -50], [-90, -60], [-60, -100], [60, -100], [100, -60], [160, -50], [160, 0]], { wash: '#3a3a40', washA: 1, w: 2, col: L }); for (const wx of [-100, 100]) ell(wx, 0, 26, 26, { wash: '#141414', washA: 1, w: 1.6 }); rect(-50, -94, 100, 32, { wash: '#1a1a1e', washA: 1, w: 1.4 }); pencil([[-160, -40], [160, -40]], { w: 3, col: '#5a5a60', pass2: false }); pop();   // брошенные «Жигули» в снегу
    push(140, 1700, 1); rect(-150, -180, 300, 14, { wash: '#3a4a5a', washA: 1, w: 1.6 }); for (const sd of [-1, 1]) pencil([[sd * 140, -170], [sd * 140, 0]], { w: 6, col: '#2a2a30', pass2: false }); rect(-140, -170, 280, 120, { wash: '#8ab0c8', washA: 0.25, w: 1.4, col: '#2a2a30' }); txt('ОСТАНОВКА', 0, -196, 20, { col: '#f2e8d0', font: 'Osw' }); pop();   // остановка
    for (let k = 0; k < 5; k++) { push(420 + k * 70, 1840, 1); ell(0, 0, 40, 12, { wash: '#6a6a72', washA: 1, w: 1.4 }); pop(); }
  }
  function front(t) { pencil([[-120, 2000], [-60, 300]], { w: 36, col: '#1a1a20', pass2: false }); pencil(spline([[-80, 500], [160, 560], [400, 520]], false, 8), { w: 3, col: '#2a2a2a', pass2: false }); for (let q = 0; q < 8; q++) ell(-40 + q * 54, 540 + Math.sin(q) * 14, 7, 7, { wash: t > EV.st_ruin ? '#2a2a2a' : ['#ff4a4a', '#ffd84a', '#4ad8ff'][q % 3], washA: 1, line: false }); }   // столб и гирлянда через улицу
  function hud(t) { if (t < EV.st_ny - 0.1) return; const k = popK(t, EV.st_ny - 0.1, 0.35) * (1 - sm((t - EV.st_ruin) / 0.3)); if (k <= 0) return; push(700, 860, k, 0.04); rect(-170, -60, 340, 120, { wash: '#f2ece0', washA: 0.97, w: 2.4, col: '#1a1a1a' }); txt('31.12.1994', 0, -12, 52, { col: '#8a1a1a', font: 'Osw' }); txt('новогодний штурм', 0, 38, 24, { col: '#3a2a2a', font: 'Hand' }); pop(); }

  WORLD.storm = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => far(t));
    lay(4, () => square(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.62, () => front(t));
    motes(80, [-200, -200, 1300, 2000], '#eef2ff', t, 19953, { sp: 60, vx: -20, sz: 3, a: 0.7, wob: 26 });
    motes(40, [-200, -200, 1300, 2000], '#ff9a5a', t, 19954, { sp: -40, vx: 30, sz: 2.4, a: 0.6, add: 1, wob: 20 });
    haze('#5a3a4a', 0.07);
  };
  DIR.storm = {
    outfit: 'pufferG', light: { side: 1, rim: '#ff9a6a' }, grade: ['#3a2a5a', 0.16], hud,
    act: () => [[S0.storm, 'neutral'], [EV.st_ny, 'scared'], [EV.st_storm, 'shock'], [EV.st_ruin, 'scared']],
    pose: (t, u, b) => Object.assign(b, { x: 280, y: 1540, s: 1.0, frost: 0.3, look: t < EV.st_ruin ? [0.5, -0.4] : [0.8, -0.3], squash: b.squash + (t > EV.st_storm && t < EV.st_storm + 0.2 ? 0.08 : 0), sweat: t > EV.st_storm }),
    cam: () => [[S0.storm, 520, 1040, 0.12], [EV.st_storm, 560, 1000, 0.02], [EV.st_ruin, 620, 980, 0.08], [S1.storm, 640, 980, 0.12]]
  };
  TRANS_IN.storm = { a: 0.15, b: 0.3, fx(k, t, A, B) {             // осветительная ракета дугой через кадр, вспышка
    drawBuf(k < 0.55 ? A : B); scr(() => { const q = sm(clamp(k / 0.6)), x = lerp(-100, 1180, q), y = 1400 - Math.sin(q * Math.PI) * 1000;
      const P = []; for (let i = 0; i <= 20; i++) { const qq = q * i / 20; P.push([lerp(-100, 1180, qq), 1400 - Math.sin(qq * Math.PI) * 1000]); } pencil(P, { w: 10, col: '#ffe0a0', a: 0.7, pass2: false, gap: false });
      glow(x, y, 220, 'rgba(255,240,200,1)', 0.9); whiteOut(Math.max(0, 1 - Math.abs(k - 0.55) * 4) * 0.9, '255,244,220'); });
  } };
})();
