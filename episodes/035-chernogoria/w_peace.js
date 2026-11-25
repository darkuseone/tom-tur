/* 035 — сцена `peace`, 1904–1905. Часть 1 («Говорят… объявила войну»): кафе в Цетине, старики за картами и ракией, на стене газета,
   слух передаётся из уст в уста (пузыри-реплики «ОБЪЯВИЛИ!»). Часть 2 («Но мир подписали без неё»): Портсмут, США, 1905 — деревянный
   зал верфи, за столом русская и японская делегации подписывают мир, флаги России и Японии, фотограф с магниевой вспышкой; а у края
   стола — пустой стул с табличкой «ЧЕРНОГОРИЯ». Главный свет — вспышка фотографа + окна. Том (фрак) сидит на пустом стуле и пожимает плечами. */
(() => {
  const L = MEC.ink;
  EV.pc_say = wtk('s5', 'Говорят,'); EV.pc_decl = wtk('s5', 'объявила'); EV.pc_peace = wtk('s5', 'мир'); EV.pc_sign = wtk('s5', 'подписали'); EV.pc_wo = wtk('s5', 'без');
  KEYW.push('войну.', 'неё.');
  const P2 = t => t > EV.pc_peace - 0.15;
  function cafe(t) {                                                // часть 1: кафе со слухами
    rect(-600, 200, 2400, 1300, { wash: '#c8a878', washA: 1, w: 2, col: L, shade: { gap: 14, a: 0.06, col: '#6a4a2a', ang: 1.4 } }); vgrad(200, 1400, ['#6a4a2a', '#c8a878', '#a88858'], 0.5);
    push(300, 700, 1); rect(-160, -200, 320, 300, { wash: '#f0e8d0', washA: 1, w: 3, col: L }); txt('ГЛАС ЦРНОГОРЦА', 0, -160, 26, { col: L, font: 'Osw' }); txt('ВОЙНА!', 0, -90, 60, { col: MEC.red, font: 'Osw' }); for (let i = 0; i < 5; i++) pencil([[-130, -30 + i * 24], [130, -30 + i * 24]], { w: 3, col: '#8a8270', a: 0.6, pass2: false }); pop();
    push(900, 640, 1); rect(-120, -120, 240, 240, { wash: '#a8c8d8', washA: 1, w: 4, col: L }); pencil([[0, -120], [0, 120]], { w: 4, col: L, pass2: false }); pencil([[-120, 0], [120, 0]], { w: 4, col: L, pass2: false }); pop();
    rect(-300, 1150, 1700, 60, { wash: '#6a4a2a', washA: 1, w: 2.4, col: L });
    const P = [[60, '#e8e0d0'], [200, '#3a4a7a'], [760, '#4a3a2a'], [900, '#e8e0d0'], [1040, '#3a4a7a']]; P.forEach(([x, c], i) => { human(x, 1170, 0.7, t, { body: c, hat: 'fez', hatCol: MEC.red, legs: '#2a2a4a', armR: t > EV.pc_decl && i % 2 ? 'wave' : 'hold', flip: x > 500 ? -1 : 1, seed: 9800 + i, face: t > EV.pc_decl ? 'shock' : 'grin', beard: i % 2 ? 1 : undefined });
      if (t > EV.pc_say + i * 0.25) { const k = popK(t, EV.pc_say + i * 0.25, 0.25); push(x, 1170 - 360 * 0.7, k * 0.8); ctx.save(); ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.fillRect(-90, -70, 180, 60); ctx.restore(); poly([[-10, -10], [10, -10], [0, 10]], { wash: '#ffffff', washA: 1, line: false }); txt(i % 2 ? 'ОБЪЯВИЛИ!' : 'ВОЙНА!', 0, -38, 28, { col: MEC.red, font: 'Osw' }); pop(); } });
    for (let i = 0; i < 6; i++) { push(-60 + i * 230, 1140, 0.8); blob([[-12, 0], [-14, -40], [14, -40], [12, 0]], { wash: '#e8f0e8', washA: 0.7, w: 1.4, col: L }); pop(); }
  }
  function portsmouth(t) {                                          // часть 2: зал верфи в Портсмуте, делегации, пустой стул
    rect(-600, 200, 2400, 1300, { wash: '#8a6a4a', washA: 1, w: 2, col: L }); for (let i = 0; i < 18; i++) pencil([[-600 + i * 140, 200], [-600 + i * 140, 1500]], { w: 3, col: '#5a3a1a', a: 0.5, pass2: false });
    for (let i = 0; i < 3; i++) { push(200 + i * 360, 620, 1); rect(-100, -180, 200, 300, { wash: '#c8d8e8', washA: 1, w: 3, col: L }); pencil([[0, -180], [0, 120]], { w: 3, col: L, pass2: false }); pop(); }
    push(360, 920, 1); const fl = []; for (let q = 0; q <= 180; q += 20) fl.push([q, Math.sin(t * 3 + q * 0.04) * 5]); for (let i = 0; i < 3; i++) { const c = ['#ffffff', '#1c3aa8', '#d0202a'][i]; poly([...fl.map(([x, y]) => [x, y + i * 40]), ...fl.slice().reverse().map(([x, y]) => [x, y + (i + 1) * 40])], { wash: c, washA: 1, w: 1.2, col: L }); } pop();
    push(740, 920, 1); poly([[0, 0], [180, 0], [180, 120], [0, 120]], { wash: MEC.jp, washA: 1, w: 1.6, col: L }); ell(90, 60, 36, 36, { wash: MEC.jpRed, washA: 1, line: false }); pop();
    rect(-200, 1160, 1500, 60, { wash: '#2a5a3a', washA: 1, w: 2.4, col: L }); rect(-200, 1220, 1500, 26, { wash: '#5a3a1a', washA: 1, w: 2, col: L });
    const R = [[100, '#1a1a1e'], [220, '#1a1a1e'], [340, '#2a3a5a']], J = [[560, '#1a1a1e'], [660, '#1a1a1e'], [760, '#2a2a3a']];
    R.forEach(([x, c], i) => human(x, 1180, 0.66, t, { body: c, legs: '#1a1a1e', armR: t > EV.pc_sign && i === 1 ? 'wave' : 'hold', seed: 9810 + i, face: 'calm', beard: 1 })); J.forEach(([x, c], i) => human(x, 1180, 0.66, t, { body: c, legs: '#1a1a1e', armR: t > EV.pc_sign && i === 1 ? 'wave' : 'hold', flip: -1, seed: 9820 + i, face: 'calm' }));
    push(900, 1220, 0.9); rect(-50, -160, 100, 20, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); pencil([[-50, -140], [-50, 0]], { w: 6, col: '#4a2a1a', pass2: false }); pencil([[50, -140], [50, 0]], { w: 6, col: '#4a2a1a', pass2: false }); rect(-50, -300, 100, 140, { wash: '#6a4a2a', washA: 1, w: 2, col: L });
    rect(-80, -360, 160, 40, { wash: '#f0e8d0', washA: 1, w: 2, col: L }); txt('ЧЕРНОГОРИЯ', 0, -340, 24, { col: MEC.red, font: 'Osw' }); pop();
    push(520, 1150, 1); rect(-80, -30, 160, 26, { wash: '#f4efe4', washA: 1, w: 1.6, col: L }); if (t > EV.pc_sign) { pencil([[-40, -18], [-10, -24], [20, -14], [50, -20]], { w: 3, col: '#1a2a8a', pass2: false }); } pop();
    const fl2 = t > EV.pc_sign && t < EV.pc_sign + 0.25; push(1000, 1340, 0.8); pencil([[0, 0], [0, -200]], { w: 4, col: '#3a3a3a', pass2: false }); rect(-50, -280, 100, 80, { wash: '#2a2a2e', washA: 1, w: 2, col: L }); pop(); if (fl2) glow(1000, 1340 - 260 * 0.8, 260, 'rgba(255,255,240,1)', 0.7);
  }
  function floor_(t) { rect(-500, 1360, 2200, 1000, { wash: P2(t) ? '#7a5a3a' : '#9a7a5a', washA: 1, w: 2, col: L }); for (let i = 0; i < 14; i++) pencil([[-400 + i * 140, 1380], [-500 + i * 160, 2300]], { w: 2, col: '#4a2a1a', a: 0.4, pass2: false });
    for (let i = 0; i < 3; i++) { push(1000 + i * 90, 1760 + i * 30, 1); rect(-30, -60, 60, 60, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) rect(-26, -76 - q * 14, 52, 12, { wash: ['#e8dcc0', '#c8b490', '#f0e8d0'][q], washA: 1, w: 1, col: L }); pop(); }
    push(-60, 1760, 1); pencil([[0, 0], [0, -140]], { w: 5, col: '#3a3a3a', pass2: false }); ell(0, -160, 50, 30, { wash: '#2a2a2e', washA: 1, w: 2, col: L }); pop();
    lightPool(540, 1600, 900, 200, 'rgba(255,244,210,1)', 0.28); castShadow(380, 1700, 110, 420, 0.9, 0.3); moodDark(100, 1000, 800, 1900, '#1a1008', 0.2); }
  function extras(t) {                                              // журналисты с блокнотами, пустой стул крупно, телеграфист
    if (!P2(t)) { push(1180, 1520, 0.9); human(0, 0, 1, t, { body: '#e8e4d8', legs: '#2a2a2a', armR: 'hold', flip: -1, seed: 9830, face: 'grin' }); ell(-60, -280, 60, 12, { wash: '#c8ccd4', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) rect(-90 + q * 30, -310, 18, 26, { wash: '#e8e0b0', washA: 0.8, w: 1.2, col: L }); pop(); return; }
    for (let i = 0; i < 2; i++) { push(-80 + i * 90, 1540, 0.9); human(0, 0, 1, t, { body: ['#3a3a44', '#5a4a3a'][i], hat: 'boater', hatCol: '#e8d8a0', legs: '#2a2a2a', armR: 'hold', seed: 9840 + i, face: 'smile' }); rect(30, -200, 50, 70, { wash: '#f4efe4', washA: 1, w: 1.4, col: L }); pop(); }
    push(1220, 1540, 0.85); rect(-80, -120, 160, 20, { wash: '#5a3a1a', washA: 1, w: 2, col: L }); human(0, 0, 0.9, t, { body: '#2a2a3a', legs: '#1a1a1e', armR: 'hold', flip: -1, seed: 9845, face: 'calm' }); rect(-60, -150, 80, 30, { wash: '#6a4a2a', washA: 1, w: 1.4, col: L }); pop();
  }
  function front(t) { for (const x of [-170, 1250]) { rect(x - 60, 300, 120, 2100, { wash: P2(t) ? '#5a3a1a' : '#8a6a4a', washA: 1, w: 2.4, col: L, shade: { gap: 10, a: 0.2, col: '#2a1a0a', ang: 0 } }); } }
  WORLD.peace = (t, u, cat) => {
    lay(40, () => P2(t) ? portsmouth(t) : cafe(t)); lay(1.6, () => extras(t)); lay(1, () => { floor_(t); cat(); }); lay(0.62, () => front(t));
    lay(2, () => motes(14, [-100, 500, 1200, 1500], '#fff0c8', t, 9850, { sp: 1, sz: 2.4, a: 0.4, wob: 12, add: 1 }));
  };
  DIR.peace = {
    outfit: 'director', light: { side: 1, rim: '#fff0d0' }, grade: ['#2a1a10', 0.05],
    act: () => [[S0.peace, 'smug'], [EV.pc_decl, 'shock'], [EV.pc_peace, 'suspicious'], [EV.pc_wo, 'sideeye']],
    pose: (t, u, b) => { const sit = P2(t); return Object.assign(b, { x: 360, y: 1720, s: 0.9, look: sit ? [0.8, -0.4] : [0.5, -0.5], hand: t > EV.pc_wo ? [200, -330] : [150, -300], handF: t > EV.pc_wo ? [-200, -330] : undefined, point: sit && t < EV.pc_wo }); },
    hud: t => { if (t > EV.pc_wo - 0.1) stamp(640, 1260, 0.9, t, EV.pc_wo - 0.1, 'МИР 1905 — БЕЗ НЕЁ', MEC.red, -0.12); },
    cam: () => [[S0.peace, 600, 980, -0.08], [EV.pc_decl, 560, 940, -0.02, 'x'], [EV.pc_peace - 0.16, 560, 940, -0.02], [EV.pc_peace, 600, 980, -0.08], [EV.pc_wo, 640, 980, -0.02, 'x'], [S1.peace, 640, 990, 0]]
  };
  TRANS_IN.peace = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI); for (let i = 0; i < 10; i++) { const r = rng(9860 + i); push(r() * W, (r() * H + e * 800) % H, 2.4, r() * 6); rect(-70, -50, 140, 100, { wash: '#f0e8d0', washA: a, w: 2, col: L, a }); pop(); } }); } };
})();
