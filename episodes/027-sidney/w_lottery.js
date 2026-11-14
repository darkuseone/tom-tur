/* 027 — сцена `lottery`: ≈1965, розыгрыш «Лотереи оперы». Зал с плакатом «OPERA HOUSE LOTTERY», проволочный барабан с шарами,
   очередь к кассе за билетами, телекамера, ведущий у микрофона; огромная стеклянная копилка в форме оперы наполняется монетами.
   Главный свет — софиты сцены сверху (тёплый). Том (suitK) крутит ручку барабана: на «игроки» — ответ на хук (плашка «ЛОТЕРЕЯ!»),
   на «Лотерея» из барабана выкатывается шар, на «деньги» копилка-опера наполняется доверху, на «азарт» Том подмигивает с билетом.
   Переход В — билет переворачивается на весь кадр. */
(() => {
  EV.lt_paid = wtk('s7', 'платили...');
  EV.answer = wtk('s7', 'игроки!');
  EV.lt_lot = wtk('s7', 'Лотерея');
  EV.lt_money = wtk('s7', 'деньги.');
  EV.lt_az = wtk('s7', 'азарт.');
  KEYW.push('игроки!', 'Лотерея', 'азарт.');
  SHAKES.push([EV.answer, 0.25, 8]);
  const L = SY.ink, SPOT = [560, 260];
  const fill = t => sm(clamp((t - EV.lt_lot) / (EV.lt_money - EV.lt_lot + 0.4)));
  function hall(t) {                                                 // зал: стены, плакат, софиты, занавес
    vgrad(-900, 2600, ['#3a1a24', '#6a2a30', '#2a1018'], 1);
    for (const x of [-120, 1200]) { rect(x - 160, 200, 320, 1200, { wash: '#8a1a24', washA: 1, w: 2, col: L }); for (let q = -2; q <= 2; q++) pencil([[x + q * 50, 200], [x + q * 56, 1400]], { w: 3, col: '#4a0a10', a: 0.6, pass2: false }); }
    push(560, 800, 0.85); rect(-340, -150, 680, 300, { wash: '#f2e6c8', washA: 1, w: 3, col: L }); rect(-340, -150, 680, 70, { wash: SY.red, washA: 1, w: 2, col: L }); txt('OPERA HOUSE LOTTERY', 0, -114, 40, { col: '#fff2d6', font: 'Osw' }); operaH(0, 120, 0.28, t, { cranes: false }); txt('ЛОТЕРЕЯ ОПЕРЫ', 0, -40, 34, { col: '#3a2a1a', font: 'Osw' }); pop();
    for (const x of [200, 560, 920]) { glow(x, 250, 60, 'rgba(255,230,170,1)', 0.5); shaft(x, 260, 120, 1300, (560 - x) * 0.0006, 'rgba(255,230,170,1)', 0.12); }
    depthFog('#3a1a24', 0.05);
  }
  function queue(t) {                                                // очередь к кассе: шляпы 60-х, сумочки, телекамера, ведущий
    rect(-500, 1260, 2100, 30, { wash: '#5a2a1e', washA: 1, w: 2, col: L });
    push(1060, 1270, 1); rect(-120, -230, 240, 230, { wash: '#efe4c8', washA: 1, w: 2.4, col: L }); rect(-90, -200, 180, 100, { wash: '#bcd8e4', washA: 1, w: 1.8, col: L }); txt('TICKETS', 0, -60, 34, { col: SY.red, font: 'Osw' }); pop();
    const Q = [[780, '#4a6a9a', 'boater'], [860, '#c83a5a', 'scarf'], [940, '#6a5a3a', 'boater'], [1200, '#3a5a3a', null], [1300, '#8a6a9a', 'scarf']];
    Q.forEach(([x, c, h], i) => human(x, 1280, 0.55, t, { body: c, hat: h, hatCol: h === 'scarf' ? '#e8c050' : '#2a2a30', long: h === 'scarf' ? 1 : 0, legs: '#2a2a32', hair: i % 2 ? '#c8a050' : '#2a1a10', armR: i % 2 ? 'hold' : 'down', prop: i === 1 ? 'scroll' : undefined, flip: -1, seed: 3500 + i, face: t > EV.answer ? 'grin' : 'calm' }));
    push(140, 1280, 0.6); human(0, 0, 1, t, { body: '#1a1a20', legs: '#1a1a20', hair: '#2a1a10', armR: 'point', seed: 3510, face: 'grin' }); pencil([[60, -180], [70, -40]], { w: 3, col: '#8a8e94', pass2: false }); ell(66, -190, 12, 16, { wash: '#3a3a42', washA: 1, w: 1.6, col: L }); pop();
    push(-60, 1280, 0.6); for (const k of [-40, 0, 40]) pencil([[0, -200], [k, 0]], { w: 4, col: '#2a2a30', pass2: false }); rect(-60, -300, 120, 100, { wash: '#3a3a42', washA: 1, w: 2, col: L }); ell(80, -250, 34, 34, { wash: '#1a1a1e', washA: 1, w: 2, col: L }); ell(-10, -330, 30, 30, { line: true, w: 4, col: '#2a2a30' }); pop();
  }
  function stage(t) {                                                // сцена под Томом: барабан, выкатившийся шар, копилка-опера, рассыпанные билеты
    rect(-500, 1400, 2100, 900, { wash: '#6a3a24', washA: 1, w: 2, col: L }); for (let i = 0; i < 26; i++) pencil([[-500 + i * 80, 1400], [-480 + i * 80, 2300]], { w: 2, col: '#4a2414', a: 0.6, pass2: false });
    lightPool(SPOT[0], 1640, 620, 140, 'rgba(255,230,170,1)', 0.5);
    const rot = (t - S0.lottery) * 4; push(580, 1420, 1); pencil([[-120, 0], [-80, -200]], { w: 8, col: '#3a3a42', pass2: false }); pencil([[120, 0], [80, -200]], { w: 8, col: '#3a3a42', pass2: false });
    for (let q = 0; q < 8; q++) { const a = rot + q / 8 * 6.283; pencil([[Math.cos(a) * 130, -220 + Math.sin(a) * 40], [Math.cos(a + 0.4) * 130, -220 + Math.sin(a + 0.4) * 40]], { w: 3, col: '#c8c8cc', pass2: false }); pencil([[Math.cos(a) * 130, -220 + Math.sin(a) * 40], [Math.cos(a) * 130, -380 + Math.sin(a) * 40]], { w: 2, col: '#c8c8cc', pass2: false }); }
    ell(0, -300, 140, 100, { line: true, w: 4, col: '#e8e8ec' }); const r = rng(3520); for (let q = 0; q < 14; q++) { const a = r() * 6.283 + rot * (0.5 + r()), d = r() * 90; ell(Math.cos(a) * d, -300 + Math.sin(a) * d * 0.6, 14, 14, { wash: ['#ff6a4a', '#ffe060', '#6ac0ff', '#8aff8a'][q % 4], washA: 1, w: 1.2, col: L }); }
    pencil([[140, -300], [220, -300], [220, -240]], { w: 7, col: '#8a8e94', pass2: false }); pop();
    if (t > EV.lt_lot) { const k = clamp((t - EV.lt_lot) / 0.5); push(lerp(720, 860, k), 1400 - Math.abs(Math.sin(k * 9)) * 40 * (1 - k), 1); ell(0, -20, 26, 26, { wash: '#ffe060', washA: 1, w: 2, col: L }); txt('218', 0, -18, 18, { col: L, font: 'Osw' }); pop(); }
    push(880, 1660, 1); const f = fill(t); ctx.save(); ctx.beginPath(); ctx.rect(-200, -300 + (1 - f) * 300, 400, 300); ctx.clip(); const rr = rng(3530); for (let q = 0; q < 70; q++) ell(-180 + rr() * 360, -20 - rr() * 280, 16, 7, { wash: q % 3 ? SY.gold : '#c8c8cc', washA: 1, w: 1, col: SY.goldD }); ctx.restore();
    operaH(0, 0, 0.42, t, { cranes: false }); ctx.save(); ctx.globalAlpha = 0.35; rect(-190, -300, 380, 300, { wash: '#bcd8e4', washA: 0.25, w: 3, col: '#e8f4f8' }); ctx.restore(); if (f > 0.95) glow(0, -150, 200, 'rgba(255,220,120,1)', 0.35); pop();
    for (let q = 0; q < 8; q++) { const r2 = rng(3540 + q); push(-100 + r2() * 600, 1760 + r2() * 200, 1, r2() * 2); rect(-40, -20, 80, 40, { wash: '#f2e6c8', washA: 1, w: 1.4, col: L }); pencil([[-20, 0], [20, 0]], { w: 3, col: SY.red, pass2: false }); pop(); }
    castShadow(330, 1612, 120, 440, 0.1, 0.4); moodDark(SPOT[0], 1100, 800, 1700, '#140608', 0.45);
  }
  function hud(t) {
    if (t > EV.lt_money - 0.05) { const q = popK(t, EV.lt_money - 0.05, 0.3); push(560, 820, q, -0.02); rect(-280, -66, 560, 132, { wash: '#14100a', washA: 0.92, w: 3, col: SY.goldL }); txt('≈ $100 МЛН', 0, -10, 60, { col: SY.goldL, font: 'Osw' }); txt('собрала лотерея за 16 лет', 0, 44, 26, { col: '#f6e7c8', font: 'Osw' }); pop(); }
  }
  function front(t) { for (const x of [-80, 1160]) { rect(x - 90, 200, 180, 2200, { wash: '#5a0a14', washA: 1, w: 2, col: '#1a0206' }); } const r = rng(3550); for (let i = 0; i < 10; i++) { const ph = ((t - S0.lottery) * 0.2 + r()) % 1; push(r() * 1300 - 100, ph * 2000 - 100, 1.4, t * 2 + i); rect(-40, -20, 80, 40, { wash: '#f2e6c8', washA: 0.95, w: 1.4, col: L }); pop(); } }
  WORLD.lottery = (t, u, cat) => {
    lay(14, () => hall(t));
    lay(3, () => { queue(t); depthFog('#4a1a24', 0.05); });
    lay(1, () => { stage(t); cat(); });
    lay(0.6, () => front(t));
    lay(2.4, () => motes(40, [100, 300, 1100, 1500], '#ffe0a0', t, 3555, { sp: 2, sz: 2.4, a: 0.5, wob: 14, add: 1 }));
  };
  DIR.lottery = {
    outfit: 'suitK', light: { side: 1, rim: '#ffe0a0' }, grade: ['#6a2a30', 0.08],
    act: () => [[S0.lottery, 'smug'], [EV.answer, 'laugh'], [EV.lt_lot, 'grin'], [EV.lt_money, 'awe'], [EV.lt_az, 'wink']],
    pose: (t, u, b) => { const crank = t < EV.lt_money, a = (t - S0.lottery) * 4, tk = t > EV.lt_az - 0.15; return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.lt_lot && t < EV.lt_az ? [0.9, -0.2] : [0.3, -0.2], hand: crank ? [250 + Math.cos(a) * 40, -240 + Math.sin(a) * 40] : tk ? [140, -470] : [200, -320], tailUp: t > EV.answer }); },
    afterCat: (t, u, P) => { if (t < EV.lt_az - 0.15) return; const q = popK(t, EV.lt_az - 0.15, 0.3); push(P.x + P.hand[0] * P.s + 50, P.y + P.hand[1] * P.s - 50, 1.4 * q, -0.15); rect(-90, -40, 180, 80, { wash: '#f2e6c8', washA: 1, w: 2, col: L }); txt('OPERA', 0, -12, 26, { col: SY.red, font: 'Osw' }); txt('№ 218 507', 0, 18, 18, { col: '#3a2a1a', font: 'Osw' }); pop(); },
    cam: () => [[S0.lottery, 600, 980, -0.02], [EV.answer, 560, 1040, 0.14, 'x'], [EV.lt_lot, 680, 1060, 0.08], [EV.lt_money, 760, 1080, 0.06], [EV.lt_az, 480, 1080, 0.16, 'x'], [S1.lottery, 480, 1080, 0.18]],
    hud
  };
  TRANS_IN.lottery = { a: 0.12, b: 0.38, fx(k, t, A, B) {            // лотерейный билет переворачивается на весь кадр
    const e = sm(k), sq = Math.abs(Math.cos(e * Math.PI)); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI); if (a < 0.05) return; push(540, 960, a * 1.4, -0.1); ctx.save(); ctx.scale(sq + 0.02, 1); rect(-380, -200, 760, 400, { wash: '#f2e6c8', washA: 1, w: 4, col: SY.ink }); txt('OPERA HOUSE', 0, -80, 70, { col: SY.red, font: 'Osw' }); txt('LOTTERY', 0, 10, 90, { col: SY.red, font: 'Osw' }); ctx.restore(); pop(); });
  } };
})();
