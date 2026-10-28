/* 013 — сцена `nakhichevan`: 1779, высокий берег Дона, степь. Вереница повозок армянских переселенцев из Крыма (тенты,
   сундуки, волы, семьи), каменщики ставят армянскую церковь с конусным куполом, рядом размечают улицы колышками. Справа вдали —
   земляной вал крепости. Межевой столб с двумя дощечками: «← РОСТОВ» и «НАХИЧЕВАНЬ →». На «армяне» повозки въезжают,
   на «Нахичевань» вспыхивает вывеска; на «Сольются» дощечки съезжаются в одну с годом «1928». Том — армянский кафтан и папаха.
   Переход В сцену — дорожная пыль от колёс заметает кадр слева направо. */
(() => {
  EV.nk_arm = wtk('s5', 'армяне');
  EV.nk_name = wtk('s5', 'Нахичевань.');
  EV.nk_merge = wtk('s5', 'Сольются');
  KEYW.push('армяне', 'Нахичевань.', 'Сольются');
  const mg = t => sm((t - EV.nk_merge) / 0.8);

  function sky(t) { vgrad(-900, 1000, ['#6a9ad0', '#c8dce8', '#f6e6c4'], 1); ell(1300, 260, 80, 80, { wash: '#fff2c8', washA: 1, line: false }); glow(1300, 260, 260, 'rgba(255,230,160,1)', 0.4);
    for (let i = 0; i < 3; i++) { const x = ((i * 600 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 56, 200 + i * 90 + Math.sin(k) * 10, 76, 26, { wash: '#fbf6ec', washA: 0.85, line: false }); }
    for (let i = 0; i < 3; i++) { const x = ((t * 50 + i * 380) % 1700) - 300, y = 420 + i * 50, f = Math.sin(t * 8 + i) * 10; pencil([[x - 22, y - f], [x, y], [x + 22, y - f]], { w: 3, col: '#2a2a32', pass2: false }); } }
  function far(t) {                                                    // Дон внизу, левый берег, вал крепости вдали
    don(900, t, { h: 140, seed: 13601 });
    const g = shape([[-600, 900], [-600, 820], [1700, 800], [1700, 900]], { wash: '#a8b070', washA: 1, w: 2, col: '#4a5a24' });
    push(1250, 820, 0.35); fortStar(0, 0, 1, t); pop();
  }
  function steppe(t) {                                                 // берег: церковь, разметка, повозки
    const g = shape([[-600, 1500], [-600, 1000], [-100, 960], [500, 990], [1100, 960], [1700, 1000], [1700, 1500]], { wash: RS.steppe, washA: 1, w: 2, col: RS.steppeD }); hatch(g.path, g.bb, { gap: 10, a: 0.16, col: RS.steppeD, ang: -0.4, w: 1.2 });
    const r = rng(13610); for (let i = 0; i < 40; i++) { const x = r() * 2100 - 500, y = 1000 + r() * 120; pencil([[x, y], [x - 4, y - 18]], { w: 2, col: '#6a7a2a', pass2: false }); pencil([[x, y], [x + 6, y - 16]], { w: 2, col: '#8a8a3a', pass2: false }); }
    armChurch(760, 1080, 0.62, t); for (let q = 0; q < 3; q++) { const x = 600 + q * 120; pencil([[x, 1080], [x, 860 + q * 20]], { w: 5, col: '#8a6a3a' }); } pencil([[580, 900], [900, 900]], { w: 4, col: '#8a6a3a', pass2: false });
    for (let i = 0; i < 2; i++) human(560 + i * 380, 1100, 0.44, t, { body: '#8a6a4a', legs: '#3a2a1a', hair: '#1a1410', beard: 'short', hat: 'cap', hatCol: '#3a2a1a', face: 'calm', armR: Math.sin(t * 5 + i) > 0 ? 'up' : 'point', armL: 'hold', seed: 13620 + i, flip: i ? -1 : 1 });
    for (let q = 0; q < 8; q++) { const x = 120 + q * 70; pencil([[x, 1130], [x, 1100]], { w: 4, col: '#c8a868', pass2: false }); } pencil([[120, 1110], [610, 1110]], { w: 1.6, col: '#c8a868', a: 0.7, pass2: false });
    const enter = sm((t - S0.nakhichevan + 0.4) / (EV.nk_name - S0.nakhichevan + 0.6));
    for (let k = 0; k < 3; k++) { const x = lerp(-700 - k * 420, 40 - k * 360, enter); cart(x, 1260 + k * 30, 0.62 - k * 0.04, t, k, { tent: ['#e8dcc0', '#c8a080', '#d8c8a8'][k] }); human(x + 330, 1290 + k * 30, 0.46, t, { body: ['#6a2420', '#2a3a5a', '#4a3a2a'][k], legs: '#2a2420', hair: '#1a1410', beard: k !== 1 ? 'long' : null, hat: k === 1 ? 'scarf' : 'fur', hatCol: k === 1 ? '#c8302a' : '#1a1a1a', face: 'calm', armR: 'hold', armL: 'hold', long: true, seed: 13630 + k }); }
  }
  function post(t) {                                                   // межевой столб с двумя дощечками — сольются в 1928
    const x = 650, b = 1470; pencil([[x, b], [x, b - 360]], { w: 14, col: '#6a4424' });
    const m = mg(t), dx = lerp(150, 0, m);
    ctx.save(); ctx.globalAlpha = 1 - m * 0.4; stele(x - dx, b - 220, 0.5, t, ['← РОСТОВ'], { kind: 'wood', w: 420, h: 110, rot: -0.04 * (1 - m) }); stele(x + dx, b - 90, 0.5, t, ['НАХИЧЕВАНЬ →'], { kind: 'wood', w: 480, h: 110, rot: 0.04 * (1 - m) }); ctx.restore();
    if (t > EV.nk_name && t < EV.nk_merge) glow(x + dx, b - 150, 160, 'rgba(255,220,140,1)', 0.4 * popK(t, EV.nk_name, 0.4));
  }

  WORLD.nakhichevan = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(12, () => far(t));
    lay(4, () => steppe(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#c8b07a', washA: 1, w: 2, col: '#5a4a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#6a5a2a', ang: 0.1, w: 1.2 }); post(t); cat(); });
    lay(0.7, () => motes(40, [-200, 900, 1300, 1900], '#e8d8b0', t, 13640, { sp: -10, vx: 40, sz: 4, a: 0.35, wob: 30 }));
  };
  DIR.nakhichevan = {
    outfit: 'armen', light: { side: 1, rim: '#fff0c8' }, grade: ['#c8a870', 0.1],
    act: () => [[S0.nakhichevan, 'awe'], [EV.nk_arm, 'proud'], [EV.nk_name, 'grin'], [EV.nk_merge - 0.03, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1480, s: 1.0, look: t < EV.nk_merge ? [-0.4, -0.2] : [0.6, -0.2], point: t > EV.nk_merge ? 1 : undefined, hand: t > EV.nk_merge ? [200, -280] : [120, -270] }),
    cam: () => [[S0.nakhichevan, 540, 1080, 0.06], [EV.nk_arm, 480, 1120, 0.1], [EV.nk_name, 600, 1080, 0.06], [EV.nk_merge, 680, 1180, 0.14], [S1.nakhichevan, 680, 1180, 0.16]],
    hud: t => { if (t > EV.nk_merge + 0.5) { const k = popK(t, EV.nk_merge + 0.5, 0.35); push(560, 760, k, -0.03); rect(-230, -70, 460, 140, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('ОДИН ГОРОД — 1928', 0, -10, 40, { font: 'Osw', col: '#5a1a10' }); txt('сегодня — Пролетарский район', 0, 38, 24, { col: '#2a1a10' }); pop(); }
      else if (t > EV.nk_arm) { const k = popK(t, EV.nk_arm, 0.35); push(560, 760, k, 0.03); rect(-210, -60, 420, 120, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('ИЗ КРЫМА — НА ДОН', 0, -8, 36, { font: 'Osw', col: '#5a1a10' }); txt('указ 1779', 0, 34, 24, { col: '#2a1a10' }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В nakhichevan: дорожная пыль заметает кадр
  TRANS_IN.nakhichevan = { a: 0.3, b: 0.45, fx(k, t, A, B) {
    const q = sm(k), X = lerp(-300, W + 300, q); drawBuf(A); const P = new Path2D(); P.rect(0, 0, Math.max(1, X), H); inPath(P, () => drawBuf(B, 1.04 - 0.04 * q));
    scr(() => { const r = rng(13650); for (let i = 0; i < 50; i++) { const y = r() * H, R = 80 + r() * 160; ell(X + (r() - 0.5) * 300, y, R, R * 0.7, { wash: i % 2 ? '#d8c8a0' : '#c8b088', washA: 0.85 * Math.sin(clamp(k) * Math.PI), line: false }); } });
  } };
})();
