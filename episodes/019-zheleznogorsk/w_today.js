/* 019 — сцена `today`: 2026, чистая комната сборки спутников (ИСС им. Решетнёва, Железногорск). Белые стены, синие световые полосы,
   мостовой кран, большой спутник ГЛОНАСС на стапеле — панели батарей раскрываются, второй спутник дальше, техники в белых комбинезонах,
   стойки, ноутбуки, тележки. На «Глонасс» панели раскрываются и вспыхивает надпись, на «Город» Том достаёт телефон, на «навигаторе» —
   HUD-телефон с картой и меткой «Железногорск». Переход В сцену — экран пульта гаснет в точку, точка становится спутником. */
(() => {
  EV.td_glo = wtk('t1', 'Глонасс.');
  EV.td_city = wtk('t1', 'Город,');
  EV.td_nav = wtk('t1', 'навигаторе!');
  SHAKES.push([EV.td_glo, 0.2, 4]);
  KEYW.push('Глонасс.', 'навигаторе!');
  const L = '#0e0e12';

  function room(t) {
    screenFill('#dfe6ee', 1); glow(540, 600, 1000, 'rgba(255,255,255,1)', 0.3);
    for (let x = -500; x < 1700; x += 180) { const p = rect(x, 120, 170, 1200, { wash: '#eef2f6', washA: 1, w: 1.6, col: '#8a96a4' }); shadeG(p.path, x, 0, x + 170, 0, '#b8c4d0', 0.25); }
    for (const y of [300, 1000]) { rect(-500, y, 2200, 18, { wash: '#4ab0ff', washA: 1, w: 0, line: false }); glow(540, y + 9, 900, 'rgba(90,180,255,1)', 0.18); }
    rect(-500, -100, 2200, 220, { wash: '#c8d0da', washA: 1, w: 2, col: '#6a7684' }); for (let k = 0; k < 10; k++) { rect(-460 + k * 230, -40, 180, 90, { wash: '#ffffff', washA: 1, w: 1.4, col: '#8a96a4' }); glow(-370 + k * 230, 5, 160, 'rgba(255,255,255,1)', 0.35); }
    const g = rect(-500, 180, 2200, 50, { wash: '#f2c83a', washA: 1, w: 2, col: L }); for (let q = 0; q < 22; q++) pencil([[-500 + q * 100, 180], [-450 + q * 100, 230]], { w: 3, col: '#2a2008', a: 0.5, pass2: false });
    push(900, 230, 1); rect(-60, 0, 120, 60, { wash: '#f2c83a', washA: 1, w: 2, col: L }); pencil([[0, 60], [0, 360]], { w: 3, col: '#1a1a1a', pass2: false }); pop();
    push(1040, 760, 1); rect(-150, -110, 300, 220, { wash: '#1a2a4a', washA: 1, w: 3, col: '#8a96a4' }); ell(-20, 0, 80, 80, { wash: '#2a6aaa', washA: 1, w: 1.6, col: '#8ac8ff' }); blob([[-70, -30], [-30, -60], [10, -40], [0, 10], [-50, 20]], { wash: '#4a9a5a', washA: 1, w: 1, col: '#2a5a3a' }); pencil(ellPts(-20, 0, 120, 40, -0.3, 0, 30), { w: 2, col: '#ffd34a', a: 0.8, pass2: false }); txt('24 НА ОРБИТЕ', 0, 90, 22, { col: '#cfe0ff', font: 'Osw' }); pop();   // экран с орбитами
  }
  function sat(x, y, s, t, open, o = {}) {                          // спутник: корпус, фольга, антенная решётка, панели батарей
    push(x, y, s);
    const b = rect(-110, -260, 220, 300, { wash: '#d8b04a', washA: 1, w: 2.6, col: L }); for (let q = 0; q < 14; q++) { const r = rng(19900 + q); pencil([[-110 + r() * 220, -260 + r() * 300], [-110 + r() * 220, -260 + r() * 300]], { w: 2, col: '#fff2c0', a: 0.5, pass2: false }); } metalG(b.path, -40, -160, 180, '#fff6d0', '#d8b04a', '#7a5a14');
    rect(-90, -320, 180, 60, { wash: '#e8eaee', washA: 1, w: 2, col: L }); for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) ell(-75 + i * 30, -305 + j * 16, 6, 5, { wash: '#8a96a4', washA: 1, line: false });   // антенная решётка
    for (const sd of [-1, 1]) { pencil([[sd * 110, -110], [sd * (110 + 50 * open), -110]], { w: 8, col: '#8a8a8a', pass2: false });
      for (let k = 0; k < 3; k++) { const f = clamp(open * 3 - k), w = 170, x0 = sd * (160 + k * (w + 10)) * (0.25 + 0.75 * f); push(x0, -110, 1, (1 - f) * sd * 1.2); const p = rect(-w / 2, -120, w, 240, { wash: '#1a2a6a', washA: 1, w: 2.4, col: '#c8ccd4' }); for (let q = 1; q < 6; q++) pencil([[-w / 2, -120 + q * 40], [w / 2, -120 + q * 40]], { w: 1.4, col: '#5a7ac8', pass2: false }); for (let q = 1; q < 4; q++) pencil([[-w / 2 + q * w / 4, -120], [-w / 2 + q * w / 4, 120]], { w: 1.4, col: '#5a7ac8', pass2: false }); glow(0, 0, 120, 'rgba(120,170,255,1)', 0.25 * f); pop(); } }
    rect(-160, 40, 320, 40, { wash: '#6a7684', washA: 1, w: 2, col: L }); for (const sd of [-1, 1]) pencil([[sd * 140, 80], [sd * 200, 400]], { w: 14, col: '#4a5664', pass2: false });
    if (o.label) { rect(-120, 120, 240, 60, { wash: '#1a2a4a', washA: 1, w: 2, col: '#8a96a4' }); txt('ГЛОНАСС', 0, 150, 36, { col: '#ffd34a', font: 'Osw' }); }
    pop();
  }
  function techs(t) {                                               // техники в белых комбинезонах с капюшонами
    const xs = [380, 520, 1060, 1180, 760, 300, 1300, 640];
    xs.forEach((x, i) => human(x, i < 5 ? 1330 : 1220, i < 5 ? 0.55 : 0.4, t + i, { body: '#f6f8fa', legs: '#eef2f6', boots: '#5a8ad8', hat: 'hood', hatCol: '#f6f8fa', armR: i % 3 === 0 ? 'up' : i % 3 === 1 ? 'hold' : 'point', prop: i === 4 ? 'phone' : undefined, face: t > EV.td_glo && i % 2 ? 'smile' : 'calm', seed: 240 + i, flip: x > 700 ? -1 : 1 }));
    for (const [x, y] of [[440, 1300], [1120, 1300]]) { push(x, y, 0.7); rect(-70, -120, 140, 120, { wash: '#c8ccd4', washA: 1, w: 2, col: L }); rect(-60, -180, 120, 60, { wash: '#2a2e36', washA: 1, w: 2, col: L }); rect(-52, -172, 104, 44, { wash: '#2a6ae8', washA: 1, w: 1, col: L }); glow(0, -150, 70, 'rgba(90,150,255,1)', 0.4); for (const sd of [-1, 1]) ell(sd * 50, 4, 12, 12, { wash: '#2a2a2a', washA: 1, w: 1.4 }); pop(); }   // тележки с ноутбуками
  }
  function hud(t) {                                                 // телефон с картой и меткой
    if (t < EV.td_city - 0.05) return; const k = popK(t, EV.td_city - 0.05, 0.4); push(570, 800, (0.75 + 0.25 * k) * 0.85, -0.04);
    rect(-170, -300, 340, 600, { wash: '#14161c', washA: 1, w: 4, col: '#4a4e58' }); rect(-150, -270, 300, 540, { wash: '#e8eef2', washA: 1, w: 0, line: false });
    ctx.save(); ctx.beginPath(); ctx.rect(-150, -270, 300, 540); ctx.clip();
    for (let q = -6; q <= 6; q++) { pencil([[-160, q * 50], [160, q * 50 + 20]], { w: q % 3 ? 4 : 10, col: '#ffffff', pass2: false }); pencil([[q * 40, -280], [q * 40 + 30, 280]], { w: q % 3 ? 4 : 10, col: '#ffffff', pass2: false }); }
    blob([[-160, 120], [-60, 80], [40, 140], [160, 110], [160, 280], [-160, 280]], { wash: '#9ac8e8', washA: 1, w: 0, line: false }); txt('Енисей', -40, 200, 22, { col: '#3a6a9a', font: 'Osw' });
    blob([[60, -280], [160, -280], [160, -60], [100, -120]], { wash: '#a8d8a0', washA: 1, w: 0, line: false });
    const d = sm(clamp((t - EV.td_nav + 0.3) / 0.4)); push(-10, lerp(-200, -30, d), 1); blob([[0, 30], [-30, -10], [-30, -40], [0, -64], [30, -40], [30, -10]], { wash: '#e8402a', washA: 1, w: 2.4, col: '#6a1a10' }); ell(0, -34, 12, 12, { wash: '#ffffff', washA: 1, line: false }); pop();
    if (d > 0.5) { ctx.save(); ctx.globalAlpha = d; rect(-130, 20, 260, 56, { wash: '#ffffff', washA: 1, w: 2, col: '#8a96a4' }); txt('Железногорск', 0, 48, 30, { col: '#1a1a1a', font: 'Osw' }); ctx.restore(); }
    ctx.restore(); pop();
  }

  WORLD.today = (t, u, cat) => {
    lay(14, () => room(t));
    lay(8, () => sat(1000, 1060, 0.5, t, 1, {}));
    lay(4, () => { const f = rect(-800, 1330, 2700, 1100, { wash: '#c8d0da', washA: 1, w: 0, line: false }); for (let x = -800; x < 1900; x += 100) pencil([[x, 1330], [x - 300, 2400]], { w: 2, col: '#9aa6b4', a: 0.5, pass2: false }); for (let y = 1360; y < 2400; y += 90) pencil([[-800, y], [1900, y]], { w: 2, col: '#9aa6b4', a: 0.5, pass2: false }); pencil([[-800, 1700], [1900, 1700]], { w: 16, col: '#f2c83a', a: 0.7, pass2: false }); techs(t); });
    lay(2.6, () => sat(930, 1330, 0.7, t, sm((t - EV.td_glo + 0.4) / 0.9), { label: 1 }));
    lay(1, () => cat());
    lay(0.6, () => { for (const sd of [-1, 1]) { const x = sd < 0 ? -140 : 1220; rect(x - 60, -300, 120, 2700, { wash: '#eef2f6', washA: 1, w: 2.4, col: '#6a7684' }); rect(x - 60, 700, 120, 30, { wash: '#4ab0ff', washA: 1, w: 0, line: false }); } pencil(spline([[-200, 1900], [200, 1760], [500, 1900]], false, 10), { w: 14, col: '#2a2e36', pass2: false }); });   // колонны, кабель
    if (t > EV.td_glo - 0.05 && t < EV.td_glo + 0.6) glow(780, 1000, 700, 'rgba(255,220,120,1)', 0.35 * Math.sin(clamp((t - EV.td_glo) / 0.6) * Math.PI));
    motes(24, [0, 200, 1080, 1600], '#ffffff', t, 19902, { sp: -6, vx: 3, sz: 2, a: 0.35, tw: 1, add: 1 });
  };
  DIR.today = {
    outfit: 'hoodieZ', light: { side: 1, rim: '#bfe0ff' }, grade: ['#5a7aaa', 0.08],
    act: () => [[S0.today, 'proud'], [EV.td_glo, 'grin'], [EV.td_city, 'smug'], [EV.td_nav, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1500, s: 1.04, look: t < EV.td_city ? [0.6, -0.4] : [0.7, -0.1], point: t > EV.td_glo && t < EV.td_city ? 1 : undefined, hand: t > EV.td_city ? [120, -280] : t > EV.td_glo ? [210, -300] : undefined, prop: t > EV.td_city ? 'coin' : undefined }),
    cam: () => [[S0.today, 700, 1060, 0.18], [EV.td_glo, 720, 1040, 0.1, 'x'], [EV.td_city, 600, 1060, 0.2], [EV.td_nav, 600, 1040, 0.26], [S1.today, 600, 1040, 0.28]],
    hud
  };
  TRANS_IN.today = { a: 0.3, b: 0.45, runA: 0, holdA: 1, fx(k, t, A, B) {   // экран пульта гаснет в точку → точка становится спутником
    if (k < 0.45) { const f = sm(k / 0.45); screenFill('#000', 1); scr(() => { ctx.save(); ctx.translate(540, 960); ctx.scale(Math.max(0.01, 1 - f * 0.98), Math.max(0.004, 1 - f * 1.4)); ctx.drawImage(A, -540, -960); ctx.restore(); glow(540, 960, 60 + 200 * f, 'rgba(220,240,255,1)', f); }); }
    else { const f = sm((k - 0.45) / 0.55); screenFill('#000', 1); inCircle(540, 960, Math.pow(f, 1.5) * 2100 + 6, () => drawBuf(B, 1.2 - 0.2 * f)); scr(() => { glow(540, 960, 180, 'rgba(220,240,255,1)', 1 - f); for (const sd of [-1, 1]) rect(540 + sd * 14 - 8, 956, 16, 8, { wash: '#4a7ae8', washA: 1 - f, line: false }); }); }
  } };
})();
