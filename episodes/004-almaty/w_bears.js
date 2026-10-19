/* 004 — сцена `bears`: до людей. Дикий яблоневый лес Тянь-Шаня, осень. Тянь-шаньский бурый медведь (светлый, белые когти) трясёт яблоню,
   яблоки падают; на «съел» медведь хрустит яблоком; на «посадил» — позади из земли выстреливает росток-яблонька (таймлапс), Том косится.
   Дикие лошади на поляне, ели, снежные пики. Том — натуралист в сафари с биноклем. Переход В сцену: крэш-зум сквозь крону — листья и яблоки летят в камеру. */
(() => {
  EV.br_bears = wtw('s1', 'медведи:');
  EV.br_ate = wtw('s1', 'съел');
  EV.br_plant = wtw('s1', 'посадил');
  KEYW.push('медведи:', 'яблоню.');
  SHAKES.push([EV.br_bears, 0.3, 6]);

  function bear(x, y, s, t) {                                         // тянь-шаньский медведь, стоит на задних лапах у ствола, мордой влево
    const shake = t > EV.br_bears - 0.2 && t < EV.br_ate ? Math.sin(t * 40) * 6 : 0, chew = t > EV.br_ate && t < EV.br_plant + 0.6 ? Math.abs(Math.sin(t * 14)) : 0;
    push(x + shake, y, s, 0, -1);
    ell(0, 6, 120, 18, { wash: '#000000', washA: 0.2, line: false });
    const C = '#c49a62', CD = '#7a5430', CL = '#e8c898', L = '#2a180a';
    for (const k of [-1, 1]) { blob([[k * 30, 0], [k * 70, -6], [k * 76, -130], [k * 30, -150]], { wash: CD, washA: 1, w: 2.4, col: L }); for (let q = 0; q < 4; q++) pencil([[k * 36 + q * k * 10, 2], [k * 40 + q * k * 10, 14]], { w: 3, col: '#f4f0e6', pass2: false }); }
    const body = blob([[-70, -110], [-90, -220], [-70, -330], [-20, -380], [40, -370], [80, -300], [86, -190], [70, -110], [0, -90]], { wash: C, washA: 1, w: 2.8, col: L, key: 9101 });
    shadeG(body.path, 80, -200, -40, -200, CD, 0.5); fstr(body.path, body.bb, 60, 1.4, 22, CD, 0.4, 9102); blob([[-30, -300], [-40, -200], [10, -160], [40, -220], [30, -300]], { wash: CL, washA: 0.5, line: false });
    // передние лапы — вверх к стволу (справа в зеркале)
    for (const [ex, ey, hx, hy] of [[70, -360, 110, -440], [90, -300, 130, -360]]) { shape(tubeP([[40, -330], [ex, ey], [hx, hy]], 44, 32), { wash: C, washA: 1, w: 2.4, col: L }); for (let q = 0; q < 4; q++) pencil([[hx + 8, hy - 10 + q * 7], [hx + 26, hy - 18 + q * 7]], { w: 3, col: '#f4f0e6', pass2: false }); }
    // голова
    push(-20, -400, 1.45, -0.15 + chew * 0.05);
    for (const ex of [-40, 36]) { ell(ex, -54, 18, 18, { wash: C, washA: 1, w: 2.2, col: L }); ell(ex, -54, 8, 8, { wash: CD, washA: 1, line: false }); }
    const hd = blob([[-56, -30], [-50, -70], [0, -86], [46, -66], [56, -20], [40, 14], [-40, 14]], { wash: C, washA: 1, w: 2.6, col: L, key: 9103 }); fstr(hd.path, hd.bb, 20, 1.2, 14, CD, 0.35, 9104);
    blob([[-76, -10], [-80, 22 + chew * 6], [-40, 30 + chew * 10], [-20, 6]], { wash: CL, washA: 1, w: 2.2, col: L }); ell(-80, -2, 11, 9, { wash: '#1a0e06', washA: 1, line: false });
    ell(-24, -36, 6, 7, { wash: '#1a0e06', washA: 1, line: false }); ell(-26, -38, 2, 2, { wash: '#ffffff', washA: 1, line: false });
    if (chew > 0) { apple(-70, 30, 16, t * 3, { bite: true, noLeaf: true }); if (chew > 0.8) for (let i = 0; i < 3; i++) { const r = rng(hsh(FRAME, i)); ell(-90 - r() * 30, 20 - r() * 30, 3, 2, { wash: '#f6ecc8', washA: 1, line: false }); } }
    pop(); pop();
  }
  function horse(x, y, s, t, k) {                                     // дикая лошадь (силуэт с тоном), щиплет траву
    const g = Math.sin(t * 1.5 + k) * 0.05; push(x, y, s, 0, k % 2 ? -1 : 1); const C = ['#8a5a32', '#c8a070', '#5a3a22'][k % 3], L = '#2a1608';
    for (const lx of [-60, -40, 40, 60]) pencil([[lx, -60], [lx + 4, 0]], { w: 8, col: C });
    const b = blob([[-80, -60], [-70, -110], [60, -116], [86, -80], [70, -50], [-60, -46]], { wash: C, washA: 1, w: 2, col: L });
    push(70, -100, 1, 0.9 + g); blob([[0, -10], [70, -16], [90, 10], [70, 24], [0, 14]], { wash: C, washA: 1, w: 2, col: L }); pencil([[0, -14], [50, -24]], { w: 6, col: '#2a1608' }); pop();
    pencil([[-80, -96], [-110, -40]], { w: 7, col: '#2a1608' }); pop();
  }
  function ground(t) {
    const g = poly([[-400, 1360], [1500, 1340], [1500, 2400], [-400, 2400]], { wash: '#8a9a4a', washA: 1, w: 2, col: '#3a4a1a', key: 9110 }); hatch(g.path, g.bb, { gap: 8, a: 0.16, col: '#3a4a1a', ang: -1.2, key: 9111 });
    const r = rng(9112); for (let k = 0; k < 70; k++) { const x = -200 + r() * 1400, y = 1380 + r() * 500; pencil([[x, y], [x - 4, y - 18 - r() * 16]], { w: 2, col: '#4a5a1a', a: 0.6, pass2: false }); }
    for (let k = 0; k < 22; k++) apple(-100 + r() * 1200, 1400 + r() * 360, 12 + r() * 6, r() * 3, { noLeaf: true, col: r() > 0.4 ? '#c8342a' : '#d8b03a' });
    for (let k = 0; k < 10; k++) { const x = -100 + r() * 1200, y = 1420 + r() * 300; ell(x, y, 10, 5, { wash: ['#c88a2a', '#a8541a', '#d8b03a'][k % 3], washA: 1, w: 1, col: '#4a2a0a', rot: r() }); }
  }
  function falling(t) {                                               // яблоки сыплются при тряске
    if (t < EV.br_bears) return; for (let i = 0; i < 9; i++) { const r = rng(9120 + i), t0 = EV.br_bears + r() * 0.8, dt = t - t0; if (dt < 0) continue; const y = 760 + dt * dt * 1600; if (y > 1450) continue; apple(560 + r() * 380, y, 14, dt * 8, { noLeaf: true }); }
    for (let i = 0; i < 14; i++) { const r = rng(9130 + i), dt = t - EV.br_bears - r() * 0.6; if (dt < 0) continue; const x = 520 + r() * 460 + Math.sin(dt * 4 + i) * 40, y = 700 + dt * 260; if (y > 1450) continue; ell(x, y, 9, 4, { wash: ['#c88a2a', '#a8541a', '#6a9a2a'][i % 3], washA: 1, w: 1, col: '#4a2a0a', rot: dt * 5 + i }); }
  }
  function sapling(t) {                                               // таймлапс: росток → молодая яблонька
    if (t < EV.br_plant - 0.05) return; const k = sm((t - EV.br_plant + 0.05) / 0.7), x = 300, y = 1470;
    if (k < 0.15) puffDust(x, y, t);
    push(x, y, 0.2 + k * 0.8); pencil([[0, 0], [4, -60], [-4, -140]], { w: 9, col: '#5a4030' }); if (k > 0.4) { pencil([[0, -90], [-50, -150]], { w: 6, col: '#5a4030' }); pencil([[0, -100], [50, -170]], { w: 6, col: '#5a4030' }); }
    for (const [lx, ly] of [[-4, -150], [-50, -160], [50, -180], [-24, -190], [26, -200]]) blob([[lx, ly], [lx - 22, ly - 22], [lx, ly - 40], [lx + 22, ly - 22]], { wash: '#6a9a2a', washA: 1, w: 1.6, col: '#1e3a0a' });
    if (k > 0.85) apple(36, -168, 12, 0.2, { noLeaf: true }); pop();
    if (t > EV.br_plant + 0.3) note('садовод', x - 30, 1270, t, EV.br_plant + 0.3, S1.bears + 0.2, '#2a1a0a', 40, -0.08);
  }
  function puffDust(x, y, t) { for (let i = 0; i < 8; i++) { const r = rng(9140 + i), a = r() * 3.1, d = (t - EV.br_plant) * 300; ell(x + Math.cos(a) * d, y - Math.sin(a) * d * 0.5, 14, 10, { wash: '#c8b890', washA: 0.6, line: false }); } }

  WORLD.bears = (t, u, cat) => {
    lay(30, () => { vgrad(-600, 1400, ['#7ab0d8', '#c8dcea', '#f0e2c0']); glow(260, 360, 380, 'rgba(255,240,200,1)', 0.5); });
    lay(18, () => { alatau(t, 980, { s: 1.0, key: 9150 }); haze('#e8eef4', 0.14); });
    lay(9, () => { const r = rng(9151); for (let k = 0; k < 26; k++) spruce(-200 + k * 60 + r() * 30, 1080 + r() * 40, 120 + r() * 80, '#2e4a3a'); haze('#eef0e8', 0.12);
      for (let k = 0; k < 6; k++) appleTree(-100 + k * 230, 1150, 160, t, 9160 + k, { leaf: ['#c89a3a', '#a8741a', '#8aa040'] }); haze('#f2ead8', 0.1); });
    lay(4, () => { horse(120, 1310, 0.6, t, 0); horse(260, 1320, 0.55, t, 1); horse(-20, 1300, 0.5, t, 2); for (let k = 0; k < 3; k++) appleTree(820 + k * 220, 1300, 300, t, 9170 + k, { leaf: ['#c8a040', '#8aa040', '#b0782a'] }); });
    lay(1.3, () => { ground(t); });
    lay(1, () => { appleTree(760, 1460, 640, t + (t > EV.br_bears && t < EV.br_ate ? Math.sin(t * 40) * 0.08 : 0), 9180, { n: t > EV.br_bears + 0.6 ? 6 : 18, leaf: ['#7a9a30', '#c89a3a', '#5e8a2a'] }); falling(t); bear(800, 1470, 1.1, t); sapling(t); cat(); });
    lay(0.6, () => { const r = rng(9190); for (let k = 0; k < 7; k++) { const x = r() * 1100, y = 1800 + r() * 200; blob([[x, y], [x - 60, y - 140], [x - 10, y - 240], [x + 50, y - 130]], { wash: '#4a6a1a', washA: 1, w: 2, col: '#1e2a0a' }); } });
  };
  DIR.bears = {
    outfit: 'safari', light: { side: -1, rim: '#fff0c8' }, grade: ['#e0a040', 0.1],
    act: () => [[S0.bears, 'sideeye'], [EV.br_bears, 'scared'], [EV.br_ate + 0.1, 'suspicious'], [EV.br_plant, 'shock'], [EV.br_plant + 0.5, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 380, y: 1520, s: 1.0, look: [0.7, -0.2], prop: t < EV.br_bears ? 'binoc' : undefined, hand: t < EV.br_bears ? [40, -330] : undefined,
      tilt: t > EV.br_bears && t < EV.br_ate ? -0.1 : 0, tailUp: t > EV.br_bears && t < EV.br_ate + 0.3, sweat: t > EV.br_bears && t < EV.br_ate ? 1 : 0, squash: b.squash }),
    cam: () => [[S0.bears, 600, 1000, 0.12, 'x'], [S0.bears + 0.5, 600, 1060, 0.04], [EV.br_bears, 680, 1080, 0.08], [EV.br_plant, 440, 1180, 0.12], [S1.bears, 460, 1160, 0.14]]
  };
  // ---------------------------------------------------------------- переход В сцену: крэш-зум сквозь крону
  TRANS_IN.bears = { a: 0.15, b: 0.45, runA: 1, fx(k, t, A, B) {
    if (k < 0.3) drawBuf(A, 1 + k * 2, 540, 960, 1); else drawBuf(B, 1.5 - (k - 0.3) * 0.7, 540, 960);
    scr(() => { const n = 60, kk = sm(clamp(k * 1.3)); for (let i = 0; i < n; i++) { const r = rng(9195 + i), a = r() * 6.283, z = Math.pow((r() + kk * 1.4) % 1.2, 2.2), d = 40 + z * 1400, s = 8 + z * 90;
      const x = 540 + Math.cos(a) * d, y = 960 + Math.sin(a) * d * 1.4, fade = (1 - clamp((k - 0.6) / 0.4));
      if (i % 5 === 0) apple(x, y, s * 0.6, a + t * 4, { a: fade, noLeaf: true });
      else { ctx.save(); ctx.globalAlpha = fade; blob([[x - s, y], [x, y - s * 0.5], [x + s, y], [x, y + s * 0.5]], { wash: ['#5e8a32', '#7aa040', '#c89a3a', '#4a7428'][i % 4], washA: 1, w: 1.6, col: '#1e3a0a', rot: a }); ctx.restore(); } }
      if (k > 0.25 && k < 0.45) whiteOut((0.45 - k) * 2, '240,250,220'); });
  } };
})();
