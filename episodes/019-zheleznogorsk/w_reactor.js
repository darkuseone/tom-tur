/* 019 — сцена `reactor`: 1958, ОТВЕТ НА ХУК. Подземный реакторный зал в скале: свод из гнейса, бетонные стены, мостовой кран,
   «пятак» уран-графитового реактора (круглая плита с сеткой каналов), операторы в белом, трубы, знаки радиации, окно пульта.
   Сцена открывается в темноте с чёрными плашками цензуры; на «реактор» свет зажигается рядами, на «Плутоний» — плашка-вопрос
   сменяется ответом (core.js qchip), всплывает карточка Pu-239 → атомная бомба. Переход В сцену — маркер цензуры зачёркивает кадр, плашки срываются. */
(() => {
  EV.re_why = wtk('s6', 'зачем');
  EV.re_on = wtk('s6', 'реактор.');
  EV.answer = wtk('s6', 'Плутоний');
  EV.re_bomb = wtk('s6', 'бомб!');
  SHAKES.push([EV.re_on, 0.35, 7], [EV.answer, 0.3, 6]);
  KEYW.push('реактор.', 'Плутоний', 'бомб!');
  const L = '#0a0806', VX = 640;
  const lights = t => sm((t - EV.re_on + 0.1) / 0.7);

  function hall(t) {
    const on = lights(t); screenFill(lerpC('#0a0c10', '#3a3e44', on), 1);
    const vault = []; for (let k = 0; k <= 30; k++) { const a = Math.PI + k / 30 * Math.PI; vault.push([VX + Math.cos(a) * 1100, 420 + Math.sin(a) * 500]); }
    const v = shape(vault.concat([[VX + 1100, 420], [VX + 1100, -400], [VX - 1100, -400], [VX - 1100, 420]]).concat([vault[0]]), { wash: lerpC('#14120e', '#6a5a4a', on), washA: 1, w: 2, col: L }); hatch(v.path, v.bb, { gap: 12, a: 0.35, col: '#1a140e', ang: 0.6, w: 1.2 });
    const r = rng(19601); for (let k = 0; k < 30; k++) { const a = Math.PI + r() * Math.PI, d = 600 + r() * 480; poly([[VX + Math.cos(a) * d, 420 + Math.sin(a) * d * 0.45], [VX + Math.cos(a) * d + 40, 420 + Math.sin(a) * d * 0.45 - 20], [VX + Math.cos(a) * d + 70, 420 + Math.sin(a) * d * 0.45 + 10]], { wash: lerpC('#1a1610', '#8a7a68', on), washA: 0.8, w: 1, col: L, a: 0.4 }); }   // скальный свод
    for (const sd of [-1, 1]) { const w = rect(sd < 0 ? -500 : 1100, 420, 680, 900, { wash: lerpC('#14161a', '#4a7a8a', on), washA: 1, w: 2, col: L }); hatch(w.path, w.bb, { gap: 10, a: 0.18, col: '#2a2e32', ang: 0, w: 1 }); for (let q = 0; q < 6; q++) pencil([[sd < 0 ? -500 : 1100, 480 + q * 140], [sd < 0 ? 180 : 1780, 480 + q * 140]], { w: 1.4, col: '#2a2e32', a: 0.4, pass2: false }); }
    const back = rect(180, 420, 920, 900, { wash: lerpC('#101216', '#5a8494', on), washA: 1, w: 2, col: L }); hatch(back.path, back.bb, { gap: 10, a: 0.15, col: '#2a2e32', ang: 0, w: 1 });
    for (let q = 0; q < 5; q++) { const y = 560 + q * 60; pencil([[-500, y], [1780, y]], { w: 14 - q * 2, col: ['#7a3a2a', '#3a6a8a', '#8a8a3a', '#4a4e52', '#6a2a2a'][q], a: 0.9, pass2: false }); pencil([[-500, y - 4], [1780, y - 4]], { w: 2, col: '#ffffff', a: 0.25 * on, pass2: false }); }   // трубы вдоль стены
    push(300, 860, 1); rect(-140, -90, 280, 180, { wash: '#1a1a1e', washA: 1, w: 3, col: L }); rect(-124, -76, 248, 150, { wash: on > 0.2 ? '#8ad0e0' : '#1a2a30', washA: 0.9, w: 1.6, col: L }); for (let q = 0; q < 3; q++) human(-70 + q * 70, 60, 0.32, t + q, { body: '#f2f4f2', legs: '#d8dcd8', hat: 'scarf', hatCol: '#f2f4f2', armR: 'hold', seed: 190 + q }); pop();   // окно пульта
    for (const [x, y] of [[980, 820], [-60, 980]]) { push(x, y, 1); poly([[0, -60], [56, 40], [-56, 40]], { wash: '#f2d84a', washA: 1, w: 3, col: L }); ell(0, 8, 8, 8, { wash: '#1a1a1a', washA: 1, line: false }); for (let q = 0; q < 3; q++) { const a = -Math.PI / 2 + q * 2.094; poly([[Math.cos(a - 0.4) * 14, 8 + Math.sin(a - 0.4) * 14], [Math.cos(a - 0.4) * 32, 8 + Math.sin(a - 0.4) * 32], [Math.cos(a + 0.4) * 32, 8 + Math.sin(a + 0.4) * 32], [Math.cos(a + 0.4) * 14, 8 + Math.sin(a + 0.4) * 14]], { wash: '#1a1a1a', washA: 1, line: false }); } pop(); }
    for (let k = 0; k < 8; k++) { const a = Math.PI + (k + 0.5) / 8 * Math.PI, x = VX + Math.cos(a) * 980, y = 420 + Math.sin(a) * 440, on2 = sm((t - EV.re_on - k * 0.06) / 0.2); ell(x, y, 26, 14, { wash: on2 > 0.5 ? '#fff6d8' : '#3a3a3a', washA: 1, w: 1.6, col: L }); if (on2 > 0) { glow(x, y + 20, 340, 'rgba(255,240,200,1)', 0.5 * on2); rays(x, y, Math.PI / 2, 0.5, 900, 'rgba(255,240,210,0.6)', 0.14 * on2, 4, t); } }
  }
  function crane(t) {                                               // мостовой кран под сводом
    const on = lights(t), x = 620 + Math.sin(t * 0.5) * 60;
    const g = rect(-500, 330, 2300, 70, { wash: lerpC('#2a2a14', '#d8a82a', on), washA: 1, w: 2.4, col: L }); for (let q = 0; q < 24; q++) pencil([[-500 + q * 100, 330], [-450 + q * 100, 400]], { w: 4, col: '#2a2008', a: 0.6, pass2: false });
    rect(x - 90, 400, 180, 90, { wash: lerpC('#2a2a14', '#c8982a', on), washA: 1, w: 2.2, col: L }); pencil([[x - 30, 490], [x - 30, 800]], { w: 3, col: '#1a1a1a', pass2: false }); pencil([[x + 30, 490], [x + 30, 800]], { w: 3, col: '#1a1a1a', pass2: false }); poly([[x - 40, 800], [x + 40, 800], [x + 10, 850], [x - 10, 850]], { wash: '#3a3a3a', washA: 1, w: 1.6, col: L });
  }
  function pyatak(t) {                                              // «пятак» реактора: круглая плита с сеткой каналов, люди в белом
    const on = lights(t), cx = 780, cy = 1290, rx = 520, ry = 170;
    ell(cx, cy + 40, rx + 60, ry + 40, { wash: lerpC('#101214', '#6a6e72', on), washA: 1, w: 2.4, col: L });
    const p = ell(cx, cy, rx, ry, { wash: lerpC('#14181c', '#9aa4aa', on), washA: 1, w: 3, col: L }); shadeG(p.path, cx - rx, 0, cx + rx, 0, '#2a3034', 0.4);
    ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, rx - 8, ry - 6, 0, 0, 6.3); ctx.clip();
    for (let j = -10; j <= 10; j++) for (let i = -26; i <= 26; i++) { const x = cx + i * 20 + (j % 2) * 10, y = cy + j * 16; if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 > 0.9) continue; ctx.fillStyle = (i * 7 + j * 13) % 17 === 0 && on > 0.5 ? '#ffd34a' : lerpC('#0e1012', '#4a5458', on); ctx.beginPath(); ctx.ellipse(x, y, 7, 4.5, 0, 0, 6.3); ctx.fill(); }
    ctx.restore(); glow(cx, cy, 620, 'rgba(90,190,255,1)', 0.25 + 0.3 * on); for (let q = 0; q < 16; q++) { const a = q / 16 * 6.283, lx = cx + Math.cos(a) * (rx + 30), ly = cy + 40 + Math.sin(a) * (ry + 24); ell(lx, ly, 9, 5, { wash: on > 0.5 ? '#ffb840' : '#3a2a10', washA: 1, line: false }); glow(lx, ly, 70, 'rgba(255,170,60,1)', 0.45 * on); }   // янтарные огни по кругу плиты txt('РЕАКТОР АД', cx + 300, cy + 120, 34, { col: '#c81e16', font: 'Osw', a: on });
    for (let i = 0; i < 5; i++) human(cx - 320 + i * 165 + Math.sin(t * 0.8 + i) * 20, cy + 10 + (i % 2) * 50, 0.6, t + i, { body: '#f4f6f2', legs: '#e0e4e0', boots: '#e8e8e8', hat: 'scarf', hatCol: '#f4f6f2', armR: i % 2 ? 'hold' : 'point', prop: i === 2 ? 'scroll' : undefined, face: on > 0.5 && t > EV.answer ? 'shock' : 'calm', seed: 200 + i, flip: i % 2 ? -1 : 1 });
  }
  function near(t) {                                                // перила галереи, дозиметр, тележка с контейнером
    const on = lights(t); pencil([[-300, 1560], [1400, 1540]], { w: 12, col: lerpC('#1a1a10', '#d8b02a', on), pass2: false }); for (let k = 0; k < 9; k++) pencil([[-260 + k * 180, 1560], [-260 + k * 180, 1720]], { w: 8, col: lerpC('#1a1a10', '#b8902a', on), pass2: false }); pencil([[-300, 1650], [1400, 1630]], { w: 8, col: lerpC('#1a1a10', '#b8902a', on), pass2: false });
    push(1040, 1760, 1); rect(-120, -140, 240, 140, { wash: '#4a5a6a', washA: 1, w: 2.4, col: L }); ell(0, -140, 120, 26, { wash: '#6a7a8a', washA: 1, w: 2, col: L }); for (const sd of [-1, 1]) ell(sd * 90, 0, 26, 26, { wash: '#1a1a1a', washA: 1, w: 2 }); txt('ОСТОРОЖНО', 0, -70, 24, { col: '#f2d84a', font: 'Osw' }); pop();
  }
  function hud(t) {                                                 // карточка ответа: Pu-239 → атомная бомба
    if (t < EV.answer - 0.05) return; const k = popK(t, EV.answer - 0.05, 0.4);
    push(640, 820, 0.7 + 0.3 * k, -0.03); ctx.save(); ctx.fillStyle = 'rgba(16,10,8,0.88)'; ctx.fillRect(-300, -120, 600, 240); ctx.restore(); pencil([[-300, -120], [300, -120], [300, 120], [-300, 120], [-300, -120]], { w: 4, col: K.amber, pass2: false });
    rect(-270, -90, 170, 180, { wash: '#2a3a5a', washA: 1, w: 3, col: '#8ab0e0' }); txt('94', -244, -64, 26, { col: '#cfe0ff', font: 'Osw' }); txt('Pu', -185, -4, 90, { col: '#ffffff', font: 'Osw' }); txt('плутоний', -185, 66, 22, { col: '#cfe0ff', font: 'Osw' });
    const a = sm(clamp((t - EV.answer) / 0.5)); pencil([[-70, 0], [lerp(-70, 20, a), 0]], { w: 8, col: K.amber, pass2: false }); if (a > 0.9) poly([[20, -18], [44, 0], [20, 18]], { wash: K.amber, washA: 1, line: false });
    if (t > EV.re_bomb - 0.2) { const q = popK(t, EV.re_bomb - 0.2, 0.35); push(170, 0, q); const b = blob([[-90, 0], [-70, -50], [40, -56], [90, -20], [90, 20], [40, 56], [-70, 50]], { wash: '#6a7a6a', washA: 1, w: 3, col: '#0a0a0a' }); metalG(b.path, -10, -30, 90, '#c8d0c8', '#6a7a6a', '#1a201a'); for (const sd of [-1, 1]) poly([[-80, sd * 20], [-120, sd * 60], [-130, sd * 60], [-100, 0]], { wash: '#4a5a4a', washA: 1, w: 2, col: '#0a0a0a' }); pencil([[-60, -50], [-60, 50]], { w: 3, col: '#1a1a1a', pass2: false }); pop(); }
    pop();
  }
  function censor(t) {                                              // чёрные плашки срываются на «реактор»
    const k = sm((t - EV.re_on + 0.05) / 0.5); if (k >= 1) return;
    scr(() => { for (let q = 0; q < 5; q++) { const y = 760 + q * 150, dx = (q % 2 ? 1 : -1) * k * 1500, rot = (q % 2 ? 0.2 : -0.2) * k; push(760 + dx, y - k * 200, 1, rot); rect(-330, -55, 660, 110, { wash: '#050505', washA: 1, w: 0, line: false }); txt('СЕКРЕТНО', 180, 0, 34, { col: '#3a3a3a', font: 'Osw' }); pop(); } });
  }

  WORLD.reactor = (t, u, cat) => {
    lay(16, () => hall(t));
    lay(10, () => crane(t));
    lay(4, () => pyatak(t));
    lay(1, () => { near(t); cat(); });
    glow(240, 1500, 500, 'rgba(255,160,70,1)', 0.18 * lights(t)); glow(1000, 600, 600, 'rgba(80,200,255,1)', 0.15 * lights(t));
    lay(0.6, () => { const on = lights(t); for (const sd of [-1, 1]) { const x = sd < 0 ? -150 : 1230; const c = rect(x - 70, -300, 140, 2700, { wash: lerpC('#0e1012', '#7a7e82', on), washA: 1, w: 2.4, col: L }); hatch(c.path, c.bb, { gap: 12, a: 0.2, col: '#2a2e32', ang: 0, w: 1 }); } });
    motes(40, [0, 300, 1080, 1600], '#e8f0ff', t, 19602, { sp: -4, vx: 4, sz: 2, a: 0.4 * lights(t), tw: 1, add: 1 });
    censor(t);
  };
  DIR.reactor = {
    outfit: 'atom', light: { side: 1, rim: '#bfe0ff' }, grade: ['#3a5a7a', 0.12],
    act: () => [[S0.reactor, 'suspicious'], [EV.re_on - 0.05, 'shock'], [EV.answer, 'awe'], [EV.re_bomb, 'scared']],
    pose: (t, u, b) => Object.assign(b, { x: 280, y: 1500, s: 1.04, look: t < EV.re_on ? [0.3, -0.2] : [0.7, 0.1], point: t > EV.re_on && t < EV.re_bomb ? 1 : undefined, hand: t > EV.re_on && t < EV.re_bomb ? [210, -280] : undefined, squash: b.squash + (t > EV.re_on && t < EV.re_on + 0.2 ? 0.06 : 0) }),
    cam: () => [[S0.reactor, 560, 1000, 0.3], [EV.re_on, 640, 980, 0.0, 'x'], [EV.answer, 620, 980, 0.08], [EV.re_bomb, 620, 960, 0.14], [S1.reactor, 640, 980, 0.12]],
    hud
  };
  TRANS_IN.reactor = { a: 0.3, b: 0.4, runA: 1, fx(k, t, A, B) {     // чёрный маркер цензуры зачёркивает кадр полосами
    drawBuf(k < 0.6 ? A : B);
    scr(() => { const f = sm(k / 0.6); for (let q = 0; q < 7; q++) { const y = 200 + q * 260, len = clamp(f * 7 - q) * 1400; if (len > 0 && k < 0.6) pencil([[-100, y], [-100 + len, y + 20]], { w: 280, col: '#050505', pass2: false }); } if (k >= 0.6) screenFill('#050505', 1 - sm((k - 0.6) / 0.4)); });
  } };
})();
