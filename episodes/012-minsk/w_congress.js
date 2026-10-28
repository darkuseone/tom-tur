/* 012 — сцена `congress`: март 1898, окраина Минска, ночь и мартовская слякоть. Деревянный домик железнодорожника, разрез: внутри при
   керосиновой лампе девять человек за столом с бумагами и самоваром; за забором топчется шпик в котелке. На «девять» над столом —
   счёт 1…9, на «партию» — бумага «МАНИФЕСТ», на «СССР» — плашка-цепочка «РСДРП → большевики → КПСС» (только текст, без символики).
   Том в вышитой рубахе. Переход В сцену — огонёк керосиновой лампы раскрывает кадр из темноты. */
(() => {
  EV.co_nine = wtk('s4', 'девять');
  EV.co_party = wtk('s4', 'партию,');
  EV.co_ussr = wtk('s4', 'СССР.');
  KEYW.push('девять', 'СССР.');

  function sky(t) { vgrad(-900, 1000, ['#0e1428', '#1e2a44', '#3a3a52'], 1); ctx.save(); ctx.fillStyle = '#fff8e8'; const r = rng(12500); for (let i = 0; i < 70; i++) { ctx.globalAlpha = 0.3 + 0.5 * Math.abs(Math.sin(t * 1.5 + i)); ctx.fillRect(r() * 1600 - 260, r() * 800 - 300, 2, 2); } ctx.restore(); ell(1100, 300, 50, 50, { wash: '#f6eed8', washA: 1, line: false }); glow(1100, 300, 160, 'rgba(240,230,200,1)', 0.3); }
  function outskirts(t) { for (let k = 0; k < 6; k++) izba(-300 + k * 360, 1000, 220, 150, 0.6, t, { lit: k % 2 === 0, col: '#4a3a2a', roof: '#2a2420' }); pencil([[-500, 1010], [1600, 990]], { w: 4, col: '#2a2a32', pass2: false }); for (let k = 0; k < 14; k++) pencil([[-400 + k * 140, 1010], [-400 + k * 140, 900]], { w: 5, col: '#2a2420', pass2: false }); }
  function house(t) {                                                  // домик в разрезе: стол, лампа, девять человек
    const x = 560, b = 1300, w = 760, h = 420;
    const f = rect(x - w / 2, b - h, w, h, { wash: '#6a4a2c', washA: 1, w: 3, col: '#1a0e04' }); for (let y = b - h + 16; y < b; y += 22) pencil([[x - w / 2, y], [x + w / 2, y]], { w: 2, col: '#3a2412', a: 0.7, pass2: false });
    poly([[x - w / 2 - 30, b - h], [x + w / 2 + 30, b - h], [x, b - h - 200]], { wash: '#3a3028', washA: 1, w: 3, col: '#1a0e04' });
    const ins = rect(x - w / 2 + 30, b - h + 30, w - 60, h - 40, { wash: '#4a3420', washA: 1, w: 2, col: '#1a0e04' }); glow(x, b - 200, 380, 'rgba(255,200,110,1)', 0.55);
    rect(x - 260, b - 120, 520, 18, { wash: '#7a5434', washA: 1, w: 2, col: '#1a0e04' }); for (const lx of [x - 230, x + 230]) rect(lx - 8, b - 102, 16, 92, { wash: '#5a3a1e', washA: 1, w: 1.6, col: '#1a0e04' });
    for (let q = 0; q < 4; q++) rect(x - 200 + q * 110, b - 132, 70, 12, { wash: '#f2ead6', washA: 1, w: 1, col: '#5a4a2a' });
    push(x + 170, b - 124, 0.5); ell(0, -50, 46, 50, { wash: '#c8902a', washA: 1, w: 2, col: '#5a3a08' }); rect(-14, -120, 28, 24, { wash: '#c8902a', washA: 1, w: 1.6, col: '#5a3a08' }); pop();
    push(x - 40, b - 124, 0.7); ell(0, -30, 26, 30, { wash: '#f6e8b0', washA: 0.9, w: 2, col: '#3a2a08' }); rect(-8, -80, 16, 24, { wash: '#3a3a3a', washA: 1, w: 1, col: '#000' }); pop(); glow(x - 40, b - 150, 120, 'rgba(255,220,140,1)', 0.7 + 0.1 * Math.sin(t * 17));
    for (let i = 0; i < 9; i++) { const px = x - 300 + i * 75, py = b - 20 - (i % 2) * 8, k = t > EV.co_nine ? popK(t, EV.co_nine + i * 0.08, 0.25) : 1;
      human(px, py, 0.42, t, { body: ['#2a2a32', '#3a2a2a', '#2a3a3a', '#4a3a2a', '#2a2a2a', '#3a3a4a', '#4a2a2a', '#2a3a2a', '#3a3a3a'][i], legs: '#1a1a1e', hair: ['#2a1a10', '#6a4a2a', '#1a1410'][i % 3], beard: i % 3 === 0 ? 'short' : null, face: t > EV.co_party ? 'smile' : 'calm', armR: i === 4 && t > EV.co_party ? 'up' : 'hold', armL: 'hold', seed: 1330 + i, flip: i < 4 ? 1 : -1 });
      if (t > EV.co_nine && t < EV.co_party + 0.4) txt(String(i + 1), px, py - 170, 30 * k, { font: 'Osw', col: '#ffd24a' }); }
  }
  function spy(t) { const x = 1060 + Math.sin(t * 0.8) * 30; human(x, 1490, 0.95, t, { body: '#2a2a30', legs: '#1a1a1e', hair: '#2a1a10', hat: 'merchant', hatCol: '#141414', face: 'calm', armR: 'hold', armL: 'hold', long: true, seed: 1345, flip: -1, look: -0.8 }); glow(x - 40, 1250, 30, 'rgba(255,180,90,1)', 0.6 * (0.6 + 0.4 * Math.sin(t * 3))); }

  WORLD.congress = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(10, () => outskirts(t));
    lay(4, () => house(t));
    lay(1, () => { const g = shape([[-500, 1470], [1600, 1470], [1600, 2400], [-500, 2400]], { wash: '#3a3430', washA: 1, w: 2, col: '#0a0806', a: 0.5 }); for (let i = 0; i < 6; i++) ell(-200 + i * 300, 1600 + (i % 2) * 80, 120, 20, { wash: '#5a6a7a', washA: 0.5, line: false }); for (let k = 0; k < 9; k++) pencil([[-300 + k * 220, 1480], [-300 + k * 220, 1330]], { w: 7, col: '#2a2018' }); pencil([[-400, 1360], [1500, 1350]], { w: 5, col: '#2a2018', pass2: false }); spy(t); cat(); });
    lay(0.7, () => motes(40, [-200, -200, 1300, 2000], '#d8dce4', t, 12510, { sp: 120, vx: -30, sz: 3, a: 0.5, wob: 20 }));
  };
  DIR.congress = {
    outfit: 'rubakha', light: { side: 1, rim: '#ffc890' }, grade: ['#3a3050', 0.18],
    act: () => [[S0.congress, 'suspicious'], [EV.co_nine, 'awe'], [EV.co_party, 'smug'], [EV.co_ussr - 0.03, 'shock']],
    pose: (t, u, b) => Object.assign(b, { x: 260, y: 1480, s: 1.0, look: [0.6, -0.3], hand: t > EV.co_ussr ? [90, -400] : [120, -270] }),
    cam: () => [[S0.congress, 560, 1060, 0.08], [EV.co_nine, 580, 1140, 0.12], [EV.co_party, 560, 1100, 0.08], [EV.co_ussr, 560, 1080, 0.06], [S1.congress, 560, 1080, 0.1]],
    hud: t => { if (t > EV.co_party && t < EV.co_ussr) { const k = popK(t, EV.co_party, 0.35); push(560, 700, k, -0.03); rect(-200, -60, 400, 120, { wash: '#f2ead6', washA: 0.97, w: 3, col: '#3a2a14' }); txt('МАНИФЕСТ · 1898', 0, -12, 40, { font: 'Osw', col: '#2a1a10' }); txt('9 делегатов · 3 дня', 0, 34, 26, { col: '#5a4a3a' }); pop(); }
      if (t > EV.co_ussr) { const k = popK(t, EV.co_ussr, 0.35); push(540, 700, k, 0); ctx.save(); ctx.globalAlpha = 0.9 * k; ctx.fillStyle = 'rgba(16,10,8,0.86)'; ctx.fillRect(-380, -60, 760, 120); ctx.restore(); txt('РСДРП → большевики → КПСС', 0, 6, 44, { font: 'Osw', col: '#ffd24a', a: k }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В congress: огонёк лампы раскрывает кадр из темноты
  TRANS_IN.congress = { a: 0.3, b: 0.45, fx(k, t, A, B) {
    if (k < 0.4) { drawBuf(A); scr(() => { ctx.save(); ctx.globalAlpha = sm(k / 0.4); ctx.fillStyle = '#05040a'; ctx.fillRect(0, 0, W, H); ctx.restore(); }); return; }
    scr(() => { ctx.fillStyle = '#05040a'; ctx.fillRect(0, 0, W, H); }); const R = Math.pow(sm((k - 0.4) / 0.6), 1.3) * 1500 + 1;
    inCircle(540, 1020, R, () => drawBuf(B, 1.1 - 0.1 * sm(k))); scr(() => glow(540, 1020, 200 + R * 0.3, 'rgba(255,200,110,1)', 0.7 * (1 - sm((k - 0.4) / 0.6))));
  } };
})();
