/* 012 — сцена `magdeburg`: 1499. Рыночная площадь Верхнего города: торговые ряды, купцы, бочки, гуси; за площадью — костёлы и дома
   с черепицей. Глашатай читает грамоту с печатью; на «выбирает» мещане поднимают руки (выборы в магистрат), на «ратушу» в центре
   растёт ратуша — сначала леса, потом белые стены и башня с часами. Том — зодчий в дублете и берете. Переход В сцену — сургучная
   печать опускается на кадр. */
(() => {
  EV.mg_law = LS('s2');
  EV.mg_vote = wtk('s2', 'выбирает');
  EV.mg_hall = wtk('s2', 'ратушу.');
  KEYW.push('право:', 'ратушу.');
  SHAKES.push([S0.magdeburg + 0.05, 0.25, 6]);
  const build = t => sm((t - EV.mg_vote) / (EV.mg_hall - EV.mg_vote + 0.6));

  function sky(t) { vgrad(-900, 1000, ['#6aa0d0', '#b8d4e8', '#f2e8d4'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 450 + t * 16) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 140 + i * 80 + Math.sin(k) * 10, 70, 26, { wash: '#fbf8f2', washA: 0.85, line: false }); }
    for (let i = 0; i < 4; i++) { const x = ((i * 330 + t * 40) % 1500) - 200, y = 380 + i * 50, f = Math.sin(t * 7 + i) * 8; pencil([[x - 16, y + f], [x, y], [x + 16, y + f]], { w: 2.4, col: '#2a2a2a', pass2: false }); } }
  function town(t) {                                                   // дома с черепицей, костёлы
    for (let k = 0; k < 9; k++) { const x = -420 + k * 210, h = 160 + (k % 3) * 40, c = ['#e8dcc0', '#d8b89a', '#c8d0b8'][k % 3]; const f = rect(x, 1000 - h, 180, h, { wash: c, washA: 1, w: 2, col: '#3a2a14' }); shadeG(f.path, x + 180, 0, x, 0, '#8a7a5a', 0.3);
      poly([[x - 10, 1000 - h], [x + 190, 1000 - h], [x + 90, 1000 - h - 110]], { wash: '#a8503a', washA: 1, w: 2, col: '#3a1408' }); for (let q = 0; q < 2; q++) rect(x + 30 + q * 80, 1000 - h + 40, 36, 50, { wash: '#3a4a5a', washA: 1, w: 1.4, col: '#1a1a1a' }); }
    for (const cx of [-200, 1200]) { rect(cx - 40, 600, 80, 400, { wash: '#e8dcc0', washA: 1, w: 2, col: '#3a2a14' }); poly([[cx - 50, 600], [cx + 50, 600], [cx, 480]], { wash: '#4a6a5a', washA: 1, w: 2, col: '#1a2a1a' }); pencil([[cx, 480], [cx, 440]], { w: 3, col: MN.gold, pass2: false }); pencil([[cx - 10, 452], [cx + 10, 452]], { w: 3, col: MN.gold, pass2: false }); }
  }
  function hall(t) {                                                   // ратуша растёт: леса → стены → башня
    const b = build(t); if (b <= 0) { return; }
    ctx.save(); ctx.beginPath(); ctx.rect(200, 1080 - 760 * b, 680, 800); ctx.clip(); ratusha(540, 1080, 0.72, t); ctx.restore();
    if (b < 1) { const y = 1080 - 760 * b; for (const x of [260, 400, 540, 680, 820]) pencil([[x, 1080], [x, y - 40]], { w: 6, col: '#8a6a3a' }); for (let yy = 1060; yy > y - 40; yy -= 70) pencil([[240, yy], [840, yy]], { w: 5, col: '#8a6a3a', pass2: false });
      for (let q = 0; q < 3; q++) human(300 + q * 220, y + 2, 0.3, t, { body: '#e8e0cc', legs: '#5a4a3a', hair: '#4a2a1a', hat: 'cap', hatCol: '#5a4a3a', armR: Math.sin(t * 7 + q) > 0 ? 'up' : 'hold', seed: 1270 + q }); }
  }
  function market(t) {                                                 // торговые ряды, мещане голосуют
    const g = rect(-500, 1080, 2100, 80, { wash: '#b8a888', washA: 1, w: 2, col: '#3a2a14' });
    for (let k = 0; k < 4; k++) { const x = -360 + k * 520; rect(x, 1120, 220, 60, { wash: '#8a5a3a', washA: 1, w: 2, col: '#2a1a08' }); poly([[x - 20, 1120], [x + 240, 1120], [x + 220, 1060], [x, 1060]], { wash: ['#c8302a', '#2a6a8a', '#e8b030', '#3a7a4a'][k], washA: 1, w: 2, col: '#2a1a08' }); for (let q = 0; q < 4; q++) ell(x + 30 + q * 50, 1112, 18, 14, { wash: ['#e8a33c', '#a8c040', '#c84030', '#e8d8b0'][q], washA: 1, w: 1.2, col: '#2a1a08' }); }
    const vote = t > EV.mg_vote; for (let i = 0; i < 9; i++) { const x = -260 + i * 150 + (i > 3 ? 120 : 0), y = 1240 + (i % 2) * 30; human(x, y, 0.55, t, { body: ['#5a3a2a', '#2a4a6a', '#6a2a3a', '#3a5a3a', '#7a6a4a'][i % 5], legs: '#3a2a1a', hair: '#3a2210', beard: i % 3 ? null : 'short', hat: i % 2 ? 'fur' : 'merchant', hatCol: '#3a2a1a', face: vote ? 'smile' : 'calm', armR: vote && (i % 3) ? 'up' : 'hold', seed: 1280 + i, flip: i % 2 ? -1 : 1 }); }
  }
  function herald(t) { human(900, 1490, 1.0, t, { body: '#8a2a2a', bodyD: '#4a1010', legs: '#e8e0cc', boots: '#2a1a10', trim: '#d6a842', hair: '#6a4a2a', beard: 'short', hat: 'merchant', hatCol: '#2a1a10', face: 'angry', armR: 'up', armL: 'up', prop: 'scroll', seed: 1290, flip: -1 }); }

  WORLD.magdeburg = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(10, () => town(t));
    lay(6, () => hall(t));
    lay(3, () => market(t));
    lay(1, () => { const g = shape([[-500, 1470], [1600, 1470], [1600, 2400], [-500, 2400]], { wash: '#a89878', washA: 1, w: 1, col: '#000', a: 0.2 }); ctx.save(); ctx.clip(g.path); for (let x = -480; x < 1600; x += 60) for (let y = 1480; y < 2400; y += 36) ell(x + (Math.floor(y / 36) % 2) * 30, y, 26, 14, { wash: '#bcae90', washA: 0.7, w: 1, col: '#5a4e3a', a: 0.4 }); ctx.restore(); herald(t); cat(); });
  };
  DIR.magdeburg = {
    outfit: 'master', light: { side: 1, rim: '#fff0d0' }, grade: ['#c0a070', 0.08],
    act: () => [[S0.magdeburg, 'proud'], [EV.mg_vote, 'grin'], [EV.mg_hall, 'awe']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1480, s: 1.04, look: t < EV.mg_hall ? [0.5, -0.1] : [0.3, -0.6], hand: t > EV.mg_vote && t < EV.mg_hall ? [100, -400] : [120, -270] }),
    cam: () => [[S0.magdeburg, 580, 1060, 0.08], [EV.mg_vote, 560, 1100, 0.06], [EV.mg_hall, 560, 960, 0.02], [S1.magdeburg, 560, 960, 0.06]],
    hud: t => { if (t < EV.mg_hall + 0.3) { const k = popK(t, S0.magdeburg + 0.1, 0.35); push(560, 700, k, -0.03); rect(-280, -90, 560, 180, { wash: '#f2e6c4', washA: 0.97, w: 3, col: '#5a3a1a' }); txt('ПРИВИЛЕЙ · 1499', 0, -44, 40, { font: 'Osw', col: '#5a1a10' }); txt('город сам выбирает магистрат', 0, 6, 30, { col: '#2a1a10' });
      ell(200, 60, 40, 40, { wash: '#b8201e', washA: 1, w: 2, col: '#5a0a08' }); txt('М', 200, 62, 34, { font: 'Osw', col: '#f6d8c8' }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В magdeburg: сургучная печать опускается на кадр
  TRANS_IN.magdeburg = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    if (k < 0.5) drawBuf(A); else drawBuf(B, 1.08 - 0.08 * sm((k - 0.5) / 0.5));
    scr(() => { const s = k < 0.5 ? lerp(3, 1, sm(k / 0.5)) : 1 + sm((k - 0.5) / 0.5) * 4, a = k < 0.5 ? sm(k / 0.3) : 1 - sm((k - 0.5) / 0.5);
      ctx.save(); ctx.globalAlpha = a; push(540, 960, s); blob([[-300, -40], [-260, -230], [-40, -310], [230, -250], [310, -20], [250, 230], [10, 310], [-250, 240]], { wash: '#b8201e', washA: 1, w: 6, col: '#5a0a08' }); ell(0, 0, 200, 200, { wash: '#a01818', washA: 1, w: 4, col: '#5a0a08' }); txt('1499', 0, 10, 120, { font: 'Osw', col: '#f6d8c8' }); pop(); ctx.restore(); });
  } };
})();
