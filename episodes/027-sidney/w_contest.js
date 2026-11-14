/* 027 — сцена `contest`: январь 1957, зал жюри конкурса. Стены увешаны эскизами (223 проекта из 28 стран), длинный стол, четыре судьи,
   корзина «REJECTED» с ворохом листов. Главный свет — высокое окно слева (дневной), второй — настольные лампы. Том (suitK) у стола:
   на «конкурс» звонит в колокольчик председателя; на «Утзон» на стене подсвечивается № 218; на «легенде» долговязый судья ныряет в
   корзину «REJECTED», на «отказов» достаёт эскиз парусов — лист вспыхивает в лапах Тома. Переход В — лист кальки ложится на кадр. */
(() => {
  EV.ct_comp = wtk('s4', 'конкурс');
  EV.ct_win = wtk('s4', 'Утзон:');
  EV.ct_leg = wtk('s4', 'легенде,');
  EV.ct_rej = wtk('s4', 'отказов.');
  KEYW.push('конкурс', 'Утзон:', 'отказов.');
  SHAKES.push([EV.ct_rej, 0.2, 6]);
  const L = SY.ink, WIN = [140, 700];
  function room(t) {                                                 // стены, окно с лучом, сотни эскизов
    vgrad(-900, 2600, ['#d8ccb4', '#b8a888', '#8a7a5a'], 1);
    push(WIN[0], WIN[1], 1); rect(-150, -380, 300, 700, { wash: '#e8f4f8', washA: 1, w: 4, col: L }); for (let k = 1; k < 3; k++) pencil([[-150 + k * 100, -380], [-150 + k * 100, 320]], { w: 6, col: L, pass2: false }); for (let k = 1; k < 4; k++) pencil([[-150, -380 + k * 175], [150, -380 + k * 175]], { w: 6, col: L, pass2: false }); pop();
    shaft(WIN[0] + 80, 500, 300, 1800, -0.55, 'rgba(255,252,236,1)', 0.18);
    const r = rng(3380); for (let j = 0; j < 4; j++) for (let i = 0; i < 9; i++) { const x = 340 + i * 110, y = 380 + j * 140; push(x, y, 1, (r() - 0.5) * 0.1); rect(-46, -56, 92, 112, { wash: '#f6f2e8', washA: 1, w: 1.4, col: '#6a5a4a' });
      const kind = Math.floor(r() * 4); if (kind === 0) rect(-30, -10, 60, 40, { line: true, w: 2, col: '#3a3a5a' }); else if (kind === 1) ell(0, 6, 30, 22, { line: true, w: 2, col: '#3a3a5a' }); else if (kind === 2) poly([[-30, 30], [0, -30], [30, 30]], { line: true, w: 2, col: '#3a3a5a' }); else for (let q = 0; q < 3; q++) pencil([[-30, -20 + q * 20], [30, -20 + q * 20]], { w: 2, col: '#3a3a5a', pass2: false });
      txt(String(100 + i * 13 + j * 31), 0, 44, 14, { col: '#8a7a5a', font: 'Osw' });
      if (i === 6 && j === 1 && t > EV.ct_win - 0.05) { const q = popK(t, EV.ct_win - 0.05, 0.3); pencil(ellPts(0, 0, 60 * q, 72 * q, 0, 0, 24), { w: 5, col: SY.red, pass2: false }); txt('№ 218?', 0, -80, 28, { col: SY.red, font: 'Osw', a: q }); } pop(); }
    lightPool(WIN[0] + 400, 1280, 500, 80, 'rgba(255,252,236,1)', 0.35); depthFog('#d8ccb4', 0.05);
  }
  function jury(t) {                                                 // стол жюри, судьи, лампы, графин, корзина «REJECTED»
    rect(-200, 1180, 1500, 40, { wash: '#6a4424', washA: 1, w: 2.4, col: L }); rect(-180, 1220, 1460, 120, { wash: '#4a2e18', washA: 1, w: 2, col: L });
    for (const x of [160, 780]) { pencil([[x, 1180], [x + 20, 1080]], { w: 4, col: '#2a2a30', pass2: false }); poly([[x - 10, 1090], [x + 50, 1060], [x + 60, 1100], [x + 10, 1120]], { wash: '#2a5a3a', washA: 1, w: 1.6, col: L }); glow(x + 30, 1110, 80, 'rgba(255,230,160,1)', 0.25); }
    const J = [[260, '#3a3a42', 'smile'], [420, '#4a3a2a', 'calm'], [600, '#2a3a4a', 'calm']]; J.forEach(([x, c, f], i) => human(x, 1190, 0.6, t, { body: c, legs: '#2a2a32', hair: i === 1 ? '#c8c0b0' : '#2a1a10', armR: 'hold', prop: i === 0 ? 'scroll' : undefined, seed: 3390 + i, face: f, beard: i === 2 ? 'short' : null }));
    const dive = t > EV.ct_leg - 0.1 ? sm(clamp((t - EV.ct_leg + 0.1) / 0.5)) : 0, up = t > EV.ct_rej - 0.2 ? sm(clamp((t - EV.ct_rej + 0.2) / 0.3)) : 0;
    push(820 - dive * 40, 1340, 0.66, (dive - up) * 0.5); human(0, 0, 1.15, t, { body: '#2a2a32', legs: '#2a2a32', hair: '#3a2a1a', armR: up > 0 ? 'up' : 'point', armL: 'point', seed: 3395, face: up > 0 ? 'grin' : 'calm', flip: -1 }); pop();
    push(940, 1440, 1); shape([[-90, 0], [-110, -160], [110, -160], [90, 0]], { wash: '#a88a5a', washA: 1, w: 2.4, col: L }); for (let q = 0; q < 6; q++) pencil([[-100 + q * 40, -160], [-90 + q * 40, 0]], { w: 2, col: '#6a4a2a', pass2: false });
    for (let q = 0; q < 9; q++) { const r = rng(3396 + q); push(-80 + r() * 160, -170 - r() * 50, 1, (r() - 0.5) * 1.2); rect(-34, -24, 68, 48, { wash: '#f2ece0', washA: 1, w: 1.2, col: '#6a5a4a' }); pop(); }
    rect(-110, -110, 220, 44, { wash: SY.red, washA: 1, w: 2, col: L }); txt('REJECTED', 0, -88, 30, { col: '#fff2d6', font: 'Osw' }); pop();
  }
  function floor(t) {                                                // паркет под Томом, стопки папок, колокольчик, графин
    rect(-500, 1420, 2100, 900, { wash: '#8a5a32', washA: 1, w: 2, col: L }); for (let i = 0; i < 30; i++) pencil([[-500 + i * 70, 1420], [-460 + i * 70, 2300]], { w: 2, col: '#5a3a1e', a: 0.6, pass2: false });
    lightPool(WIN[0] + 400, 1640, 560, 130, 'rgba(255,252,236,1)', 0.45);
    for (const [x, n] of [[760, 6], [880, 4]]) for (let q = 0; q < n; q++) rect(x - 70, 1640 - q * 18, 140, 18, { wash: q % 2 ? '#c8b088' : '#e8d8b0', washA: 1, w: 1.4, col: L });
    push(560, 1600, 1); ell(0, 0, 30, 10, { wash: '#8a8e94', washA: 1, w: 1.6, col: L }); blob([[-22, 0], [-18, -30], [0, -40], [18, -30], [22, 0]], { wash: SY.gold, washA: 1, w: 1.6, col: SY.goldD }); pop();
    push(1180, 1640, 1); rect(-20, -320, 40, 320, { wash: '#3a2a1a', washA: 1, w: 2, col: L }); for (const k of [-1, 1]) pencil([[0, -300], [k * 60, -260]], { w: 5, col: '#3a2a1a', pass2: false }); blob([[-60, -300], [60, -300], [70, -150], [-70, -150]], { wash: '#3a3a42', washA: 1, w: 2, col: L }); ell(0, -320, 40, 14, { wash: '#2a2a30', washA: 1, w: 1.6, col: L }); pop();   // вешалка с пальто
    push(120, 1700, 1); rect(-60, -120, 120, 20, { wash: '#6a4424', washA: 1, w: 2, col: L }); for (const k of [-50, 50]) pencil([[k, -100], [k, 0]], { w: 6, col: '#4a2e18', pass2: false }); rect(-50, -220, 100, 100, { wash: '#6a4424', washA: 1, w: 2, col: L }); pop();   // стул
    for (let q = 0; q < 3; q++) { push(700 + q * 40, 1560 - q * 6, 1, -0.3 + q * 0.2); rect(-70, -12, 140, 24, { wash: '#f2ece0', washA: 1, w: 1.4, col: '#6a5a4a' }); ell(-70, 0, 12, 12, { wash: '#e8e0d0', washA: 1, w: 1.2, col: '#6a5a4a' }); pop(); }   // свёрнутые чертежи
    castShadow(330, 1612, 120, 500, 0.4, 0.4); moodDark(WIN[0], 900, 1000, 1900, '#1a120a', 0.35);
  }
  function hud(t) {
    if (t > EV.ct_comp - 0.05 && t < EV.ct_win) { const q = popK(t, EV.ct_comp - 0.05, 0.3); push(560, 800, q, -0.02); rect(-260, -60, 520, 120, { wash: '#1a1410', washA: 0.9, w: 3, col: SY.oraL }); txt('223 ПРОЕКТА', 0, -6, 54, { col: SY.oraL, font: 'Osw' }); txt('из 28 стран', 0, 40, 26, { col: '#f6e7c8', font: 'Osw' }); pop(); }
  }
  function front(t) { rect(-200, 1880, 1500, 500, { wash: '#3a2412', washA: 1, w: 2, col: '#0a0604' }); for (let q = 0; q < 4; q++) { push(-40 + q * 30, 1840 - q * 26, 1.6, -0.2 + q * 0.1); rect(-60, -40, 120, 80, { wash: '#f2ece0', washA: 1, w: 1.6, col: '#6a5a4a' }); pop(); } }
  WORLD.contest = (t, u, cat) => {
    lay(30, () => room(t));
    lay(2.6, () => jury(t));
    lay(1, () => { floor(t); cat(); });
    lay(0.6, () => front(t));
    lay(3, () => motes(40, [100, 400, 900, 1500], '#fffaf0', t, 3400, { sp: 2, sz: 2.2, a: 0.5, wob: 14, add: 1 }));
    lay(8, () => motes(16, [200, 400, 1200, 1200], '#f6efe0', t, 3401, { sp: 1, sz: 4, a: 0.2, wob: 20 }));
  };
  DIR.contest = {
    outfit: 'suitK', light: { side: -1, rim: '#fffaf0' }, grade: ['#b8a888', 0.06],
    act: () => [[S0.contest, 'talk'], [EV.ct_comp, 'proud'], [EV.ct_win, 'awe'], [EV.ct_leg, 'sideeye'], [EV.ct_rej, 'grin']],
    pose: (t, u, b) => { const ring = t > EV.ct_comp - 0.1 && t < EV.ct_comp + 0.5, hold = t > EV.ct_rej - 0.05; return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.ct_leg && t < EV.ct_rej ? [0.9, -0.2] : [0.6, -0.4], hand: ring ? [230 + Math.sin(t * 30) * 10, -330] : hold ? [150, -470] : [190, -300], handF: hold ? [-40, -470] : undefined, tailUp: hold }); },
    afterCat: (t, u, P) => { if (t < EV.ct_rej - 0.05) return; const q = popK(t, EV.ct_rej - 0.05, 0.35); push(P.x + 60 * P.s, P.y - 560 * P.s, q * 1.3, -0.05); rect(-150, -100, 300, 200, { wash: '#f8f4ea', washA: 1, w: 2.4, col: L }); operaH(0, 60, 0.28, t, { cranes: false }); txt('№ 218', -90, -70, 22, { col: SY.red, font: 'Osw' }); glow(0, 0, 220, 'rgba(255,240,200,1)', 0.25 * q); pop(); },
    cam: () => [[S0.contest, 600, 960, -0.04], [EV.ct_comp, 580, 1000, 0.02], [EV.ct_win, 700, 860, 0.08, 'x'], [EV.ct_leg, 760, 1040, 0.1], [EV.ct_rej, 460, 1000, 0.12, 'x'], [S1.contest, 480, 1000, 0.14]],
    hud
  };
  TRANS_IN.contest = { a: 0.12, b: 0.38, fx(k, t, A, B) {            // лист кальки ложится на кадр: сквозь кальку проступает зал жюри
    const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI); ctx.save(); ctx.globalAlpha = 0.85 * a; ctx.fillStyle = '#f2f0e8'; ctx.translate(540, 960); ctx.rotate(0.06 - e * 0.12); ctx.fillRect(-700, -1100, 1400, 2200); ctx.restore();
      for (let q = 0; q < 6; q++) pencil([[100 + q * 160, 400], [180 + q * 160, 1500]], { w: 2, col: '#5a6a8a', a: a * 0.6, pass2: false }); });
  } };
})();
