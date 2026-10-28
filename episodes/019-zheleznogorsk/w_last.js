/* 019 — сцена `last`: 15.04.2010, блочный щит управления реактора АДЭ-2. Стены-щиты с мнемосхемой, стрелочные приборы, ряды ламп,
   пара мониторов, операторы в белом, табло «15.04.2010». На «десятого» оператор жмёт красную кнопку АЗ (аварийная защита) — лампы
   гаснут по одной, стрелки падают; на «России» — HUD-карта: Северск 2008, Железногорск 2010, «ПОСЛЕДНИЙ». Переход В сцену — зум сквозь метель. */
(() => {
  EV.ls_pu = wtk('s8', 'Плутоний');
  EV.ls_off = wtk('s8', 'десятого.');
  EV.ls_ru = wtk('s8', 'России!');
  SHAKES.push([EV.ls_off + 0.1, 0.3, 6]);
  KEYW.push('десятого.', 'России!');
  const L = '#0a0806';
  const off = t => sm((t - EV.ls_off - 0.1) / 1.4);

  function panels(t) {                                              // щиты: мнемосхема, приборы, лампы
    const o = off(t); screenFill('#2a3a3a', 1); glow(540, 700, 900, 'rgba(160,230,210,1)', 0.12 * (1 - o));
    const back = rect(-500, 300, 2100, 1100, { wash: '#6a8a84', washA: 1, w: 2, col: L }); hatch(back.path, back.bb, { gap: 14, a: 0.15, col: '#2a3a38', ang: 0, w: 1 });
    rect(-500, 120, 2100, 180, { wash: '#d8dcd4', washA: 1, w: 2, col: L }); for (let k = 0; k < 8; k++) { rect(-460 + k * 260, 150, 200, 110, { wash: '#f2f6f0', washA: 1, w: 1.6, col: L }); glow(-360 + k * 260, 205, 160, 'rgba(240,255,250,1)', 0.25 * (1 - o * 0.6)); }   // светильники
    // мнемосхема реактора: круг, каналы, трубы, насосы
    push(560, 560, 1); rect(-360, -200, 720, 400, { wash: '#4a6a64', washA: 1, w: 3, col: L }); ell(-120, 0, 140, 140, { wash: '#3a5a54', washA: 1, w: 3, col: '#e8f0e8' });
    for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) { if (i * i + j * j > 18) continue; const lit = (1 - o) > ((i + 5) * 9 + j + 5) / 90; ell(-120 + i * 28, j * 28, 7, 7, { wash: lit ? (i + j) % 3 ? '#7aff9a' : '#ffd34a' : '#1a2a26', washA: 1, line: false }); if (lit) glow(-120 + i * 28, j * 28, 14, 'rgba(120,255,160,1)', 0.4); }
    for (let q = 0; q < 4; q++) { pencil([[20, -150 + q * 100], [320, -150 + q * 100]], { w: 6, col: q % 2 ? '#e8503a' : '#3a8ae8', pass2: false }); ell(200, -150 + q * 100, 22, 22, { wash: '#e8f0e8', washA: 1, w: 2, col: L }); } txt('АДЭ-2', -120, -170, 30, { col: '#f2f6f0', font: 'Osw' }); pop();
    for (const sd of [-1, 1]) for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) { const x = (sd < 0 ? -230 : 1050) + i * 120, y = 420 + j * 150; ell(x, y, 46, 46, { wash: '#f2f2ea', washA: 1, w: 3, col: L }); const a = lerp(-0.6 + Math.sin(t * 2 + i + j) * 0.08, -2.4, o * (0.6 + (i + j) * 0.1)); pencil([[x, y], [x + Math.cos(a) * 38, y + Math.sin(a) * 38]], { w: 3, col: '#c81e16', pass2: false }); for (let q = 0; q < 7; q++) { const aa = -2.6 + q * 0.4; pencil([[x + Math.cos(aa) * 36, y + Math.sin(aa) * 36], [x + Math.cos(aa) * 44, y + Math.sin(aa) * 44]], { w: 2, col: L, pass2: false }); } }
    for (let k = 0; k < 24; k++) { const x = 200 + (k % 12) * 62, y = 830 + Math.floor(k / 12) * 50, lit = (1 - o) > k / 24; ell(x, y, 14, 14, { wash: lit ? ['#7aff9a', '#ffd34a', '#ff6a4a'][k % 3] : '#2a2a2a', washA: 1, w: 1.6, col: L }); if (lit) glow(x, y, 30, 'rgba(255,240,160,1)', 0.3); }
    push(990, 760, 0.8); rect(-170, -46, 340, 92, { wash: '#0a0a0a', washA: 1, w: 3, col: '#5a5a5a' }); txt('15.04.2010', 0, 4, 60, { col: '#ff4a2a', font: 'Osw' }); glow(0, 0, 200, 'rgba(255,80,40,1)', 0.25); pop();
  }
  function desk(t) {                                                // пульт: клавиши, телефоны, мониторы, кнопка АЗ
    const o = off(t), top = shape([[-400, 1180], [1500, 1180], [1560, 1300], [-460, 1300]], { wash: '#c8ccc4', washA: 1, w: 2.4, col: L }); hatch(top.path, top.bb, { gap: 10, a: 0.12, col: '#5a5e58', ang: 0, w: 1 });
    rect(-460, 1300, 2020, 260, { wash: '#8a9088', washA: 1, w: 2.4, col: L });
    for (let k = 0; k < 30; k++) { const x = -300 + k * 56, y = 1220 + (k % 2) * 30; rect(x, y, 34, 22, { wash: ['#e8e8e0', '#3a3a3a', '#e8c040'][k % 3], washA: 1, w: 1.4, col: L }); }
    for (const x of [120, 1000]) { push(x, 1170, 1); rect(-110, -170, 220, 170, { wash: '#d8d4c8', washA: 1, w: 2.4, col: L }); rect(-90, -152, 180, 130, { wash: o > 0.8 ? '#1a1a1a' : '#1a3a6a', washA: 1, w: 2, col: L }); if (o < 0.8) { for (let q = 0; q < 4; q++) pencil([[-80, -130 + q * 26], [lerp(-80, 70, (Math.sin(t * 3 + q) + 1) / 2), -130 + q * 26]], { w: 8, col: '#7aff9a', a: 0.8, pass2: false }); glow(0, -90, 120, 'rgba(120,180,255,1)', 0.3); } pop(); }
    push(560, 1240, 1); rect(-80, -40, 160, 80, { wash: '#2a2a2a', washA: 1, w: 2, col: L }); const pr = t > EV.ls_off && t < EV.ls_off + 0.4 ? 6 : 0; ell(0, -6 + pr, 48, 26, { wash: '#d81e16', washA: 1, w: 2.4, col: L }); glow(0, 0, 120, 'rgba(255,40,30,1)', 0.5 + 0.4 * Math.sin(t * 8)); txt('АЗ', 0, -10 + pr, 28, { col: '#ffffff', font: 'Osw' }); pop();
    push(820, 1220, 1); rect(-40, -20, 80, 40, { wash: '#efe8d8', washA: 1, w: 1.6, col: L }); txt('журнал', 0, 0, 16, { col: '#1a1a1a' }); pop(); push(320, 1210, 1); ell(0, 0, 40, 16, { wash: '#1a1a1a', washA: 1, w: 1.6 }); blob([[-34, -10], [-26, -34], [26, -34], [34, -10]], { wash: '#1a1a1a', washA: 1, w: 1.6 }); pop();
  }
  function crew(t) {
    const press = t > EV.ls_off - 0.2 && t < EV.ls_off + 0.5;
    for (let i = 0; i < 5; i++) { const x = [-150, 70, 640, 900, 1150][i]; human(x, 1180, 0.62, t + i, { body: '#f2f4f2', legs: '#d0d4d0', boots: '#e8e8e8', hat: 'scarf', hatCol: '#f2f4f2', hair: '#4a3a2a', armR: i === 2 && press ? 'point' : i % 2 ? 'hold' : 'down', face: t > EV.ls_ru ? 'shock' : 'calm', seed: 220 + i, flip: i > 2 ? -1 : 1 }); }
  }
  function hud(t) {
    if (t < EV.ls_ru - 0.1) return; const k = popK(t, EV.ls_ru - 0.1, 0.4); push(600, 830, 0.75 + 0.25 * k, 0.02);
    ctx.save(); ctx.fillStyle = 'rgba(16,10,8,0.88)'; ctx.fillRect(-300, -140, 600, 280); ctx.restore(); pencil([[-300, -140], [300, -140], [300, 140], [-300, 140], [-300, -140]], { w: 3, col: K.amber, pass2: false });
    blob([[-280, 30], [-230, -60], [-90, -96], [80, -108], [250, -80], [280, 0], [210, 70], [40, 90], [-170, 80]], { wash: '#3a5a7a', washA: 1, w: 2, col: '#8ab0e0' }); txt('РОССИЯ', 170, -50, 28, { col: '#cfe0ff', font: 'Osw' });
    ell(-60, -10, 11, 11, { wash: '#9a9a9a', washA: 1, w: 1.6 }); txt('Северск — 2008', -120, -50, 30, { col: '#cfe0ff', font: 'Osw' });
    ell(20, 20, 13, 13, { wash: K.amber, washA: 1, w: 1.6 }); glow(20, 20, 50, 'rgba(255,190,90,1)', 0.7); txt('Железногорск — 2010', 40, 60, 34, { col: K.amber, font: 'Osw' });
    const q = popK(t, EV.ls_ru + 0.2, 0.3); if (t > EV.ls_ru + 0.2) { push(0, 110, q, -0.08); txt('ПОСЛЕДНИЙ', 0, 0, 44, { col: '#ff5a3a', font: 'Osw' }); pop(); }
    pop();
  }

  WORLD.last = (t, u, cat) => {
    lay(12, () => panels(t));
    lay(5, () => crew(t));
    lay(2.2, () => { desk(t); const f = rect(-800, 1560, 2700, 900, { wash: '#5a5e58', washA: 1, w: 0, line: false }); for (let x = -800; x < 1900; x += 120) pencil([[x, 1560], [x - 200, 2400]], { w: 2, col: '#3a3e38', a: 0.5, pass2: false }); for (let y = 1600; y < 2400; y += 110) pencil([[-800, y], [1900, y]], { w: 2, col: '#3a3e38', a: 0.5, pass2: false }); });
    lay(1, () => cat());
    lay(0.6, () => { push(1220, 2000, 1); rect(-140, -420, 280, 420, { wash: '#3a3e3a', washA: 1, w: 2.4, col: L }); rect(-120, -400, 240, 160, { wash: '#2a2e2a', washA: 1, w: 2, col: L }); pop(); push(-120, 1900, 1); ell(0, 0, 120, 40, { wash: '#2a2a2a', washA: 1, w: 2 }); blob([[-100, -10], [-90, -260], [90, -260], [100, -10]], { wash: '#3a3a3e', washA: 1, w: 2.4, col: L }); pop(); });   // стойка, кресло оператора
    screenFill('#000000', 0.35 * off(t)); if (t > EV.ls_off + 0.2) { const f = Math.max(0, Math.sin((t - EV.ls_off) * 6)) * (1 - off(t) * 0.5); screenFill('#ff2010', 0.08 * f, 'lighter'); }
    motes(16, [0, 200, 1080, 1500], '#e0f4ff', t, 19801, { sp: -4, vx: 2, sz: 1.8, a: 0.3, add: 1 });
  };
  DIR.last = {
    outfit: 'atom', light: { side: -1, rim: '#9affd0' }, grade: ['#3a6a5a', 0.12],
    act: () => [[S0.last, 'neutral'], [EV.ls_pu, 'smug'], [EV.ls_off, 'neutral'], [EV.ls_ru - 0.05, 'shock'], [EV.ls_ru + 0.6, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1500, s: 1.04, look: t < EV.ls_off ? [0.6, -0.2] : t < EV.ls_ru ? [0.7, 0.2] : [0, 0], point: t > EV.ls_pu && t < EV.ls_off ? 1 : undefined, hand: t > EV.ls_pu && t < EV.ls_off ? [200, -260] : undefined }),
    cam: () => [[S0.last, 600, 980, 0.26], [EV.ls_off, 620, 1080, 0.32], [EV.ls_ru, 620, 980, 0.12, 'x'], [S1.last, 600, 1000, 0.16]],
    hud
  };
  TRANS_IN.last = { a: 0.3, b: 0.4, runA: 1, fx(k, t, A, B) {        // зум сквозь метель за окном → пульт
    const q = sm(k); drawBuf(k < 0.5 ? A : B, k < 0.5 ? 1 + q * 2.2 : 1.6 - 0.6 * sm((k - 0.5) / 0.5), 720, 600);
    scr(() => { const d = Math.sin(clamp(k) * Math.PI), r = rng(hsh(FRAME, 71)); for (let i = 0; i < 90; i++) { const a = r() * 6.283, d0 = 80 + r() * 300, d1 = d0 + 200 + r() * 900 * d; pencil([[540 + Math.cos(a) * d0, 960 + Math.sin(a) * d0], [540 + Math.cos(a) * d1, 960 + Math.sin(a) * d1]], { w: 2 + r() * 4, col: '#eef4ff', a: 0.8 * d, pass2: false, gap: false }); } whiteOut(d * 0.35, '220,235,255'); });
  } };
})();
