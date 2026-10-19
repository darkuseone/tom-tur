/* 004 — сцена `sistine`: 1512, Сикстинская капелла. Высокий свод с фресками (части уже расписаны: пророки, «Сотворение Адама»,
   незакрашенная штукатурка с разметкой), под сводом — деревянный помост на кронштейнах. Микеланджело СТОИТ на помосте, запрокинув голову,
   кисть вверх, краска капает на бороду. На «не лёжа» — врезка-картинка «лёжа на спине» перечёркивается; на «Четыре года» — счётчик 1508→1512;
   на «задрав голову» Том тоже запрокидывает голову и держится за шею. Том — итальянский мастер (из 002).
   Переход В сцену: «Сотворение Адама» — пальцы касаются, вспышка. */
(() => {
  EV.st_not = WT('s7', 'потолок');
  EV.st_stand = WT('s7', 'Стоя!');
  EV.st_years = WT('s7', 'Четыре');
  EV.st_head = WT('s7', 'задрав');
  SHAKES.push([EV.st_stand, 0.2, 6]);
  KEYW.push('лёжа.', 'Стоя!', 'голову.');

  function hand(x, y, s, rot, col, fl) {                             // кисть руки в духе фрески (указательный палец вытянут)
    push(x, y, s, rot, fl); const L = '#3a2414';
    shape(tubeP([[-420, 30], [-200, 10], [-60, 0]], 90, 70), { wash: col, washA: 1, w: 3, col: L });
    blob([[-70, -40], [10, -46], [40, -20], [30, 30], [-60, 44]], { wash: col, washA: 1, w: 3, col: L });
    shape(tubeP([[20, -26], [90, -34], [150, -30]], 26, 20), { wash: col, washA: 1, w: 2.6, col: L });
    for (let q = 0; q < 3; q++) shape(tubeP([[24, -4 + q * 16], [70, 10 + q * 18], [86, 30 + q * 14]], 22, 18), { wash: col, washA: 1, w: 2.2, col: L });
    shape(tubeP([[-20, 30], [20, 60], [40, 74]], 24, 18), { wash: col, washA: 1, w: 2.2, col: L });
    pop();
  }
  function vault(t) {                                                // свод: распалубки, рамы, фрески, незакрашенные участки
    vgrad(-800, 1400, ['#5a4a3a', '#8a7458', '#b89a70', '#c8a878']);
    const V = spline([[-300, 1000], [-200, 500], [100, 200], [540, 120], [980, 200], [1280, 500], [1380, 1000]], false, 10);
    const v = shape(V.concat([[1380, -800], [-300, -800]]), { wash: '#e6d6b4', washA: 1, w: 3, col: '#3a2a14', key: 10010 }); shadeG(v.path, 540, 900, 540, 120, '#8a7050', 0.3);
    const panels = [[160, 360, 'sky'], [540, 260, 'adam'], [920, 360, 'sky2'], [-60, 640, 'prophet'], [1140, 640, 'sibyl']];
    for (const [x, y, kind] of panels) { const w = kind === 'adam' ? 380 : 260, h = kind === 'adam' ? 200 : 220;
      const fr = rect(x - w / 2, y - h / 2, w, h, { wash: '#d8c8a0', washA: 1, w: 5, col: '#6a5030' }); ctx.save(); ctx.clip(fr.path);
      if (kind === 'adam') { vgrad(y - h / 2, y + h / 2, ['#bcd0d8', '#e8dcc0']); hand(x - 40, y + 20, 0.32, 0.05, '#e0b890', 1); hand(x + 40, y + 6, 0.32, Math.PI - 0.05, '#e8c4a0', -1); ell(x + 140, y - 30, 60, 40, { wash: '#c8604a', washA: 0.9, w: 1.4, col: '#5a2a1a' }); }
      else if (kind === 'prophet' || kind === 'sibyl') { vgrad(y - h / 2, y + h / 2, ['#8aa0b0', '#d8c8a0']); human(x, y + h / 2 + 10, 0.7, 0, { body: kind === 'sibyl' ? '#5a8a5a' : '#c8604a', long: 1, hair: kind === 'sibyl' ? '#c8a040' : '#e8e0d0', beard: kind === 'sibyl' ? null : 'long', hat: kind === 'sibyl' ? 'scarf' : null, hatCol: '#e8e0c0', face: 'calm', armR: 'hold', prop: 'scroll', look: 0.4, seed: 1001 + x }); }
      else { const done = kind === 'sky'; if (done) { vgrad(y - h / 2, y + h / 2, ['#8ab0c8', '#e0d8c0']); for (let q = 0; q < 3; q++) ell(x - 60 + q * 60, y - 20 + q * 14, 50, 26, { wash: '#f6f0e0', washA: 0.9, line: false }); } else { ctx.fillStyle = '#e8dcc0'; ctx.fillRect(x - w / 2, y - h / 2, w, h); for (let q = 0; q < 6; q++) pencil([[x - w / 2, y - h / 2 + q * 40], [x + w / 2, y - h / 2 + q * 40 + 10]], { w: 1.4, col: '#a08a6a', a: 0.5, pass2: false }); pencil(spline([[x - 80, y + 60], [x - 20, y - 40], [x + 60, y - 20], [x + 90, y + 50]], false, 8), { w: 2, col: '#8a6a4a', a: 0.7, pass2: false }); } }
      ctx.restore(); }
    for (let q = 0; q < 6; q++) { const x = -100 + q * 256; pencil([[x, 1000], [x + (540 - x) * 0.3, 300]], { w: 10, col: '#c8b088', a: 0.8, pass2: false }); }
    for (let q = 0; q < 5; q++) { const x = 30 + q * 256; rect(x - 40, 820, 80, 160, { wash: '#f6ecd0', washA: 1, w: 2, col: '#6a5030' }); rays(x, 900, 1.4, 0.15, 800, 'rgba(255,246,220,0.5)', 0.12, 3, t); }
  }
  function scaffold(t) {                                             // помост на кронштейнах, лестница, вёдра, Микеланджело стоя
    rect(-200, 1000, 1500, 34, { wash: '#8a6a3a', washA: 1, w: 2.6, col: '#2a1608', key: 10020 }); for (let x = -180; x < 1300; x += 60) pencil([[x, 1002], [x, 1032]], { w: 1.4, col: '#4a2c14', pass2: false });
    for (const x of [-60, 300, 660, 1020]) { pencil([[x, 1034], [x + 90, 1180]], { w: 12, col: '#6a4424', pass2: false }); pencil([[x, 1034], [x, 1180]], { w: 10, col: '#6a4424', pass2: false }); }
    for (let q = 0; q < 3; q++) { push(120 + q * 70, 1000, 0.6); const b = blob([[-30, 0], [-34, -60], [34, -60], [30, 0]], { wash: '#8a6a4a', washA: 1, w: 2, col: '#2a1608' }); ell(0, -60, 34, 9, { wash: ['#3a6ab0', '#c8504a', '#e8c04a'][q], washA: 1, w: 1.4 }); pop(); }
    push(520, 1000, 1, -0.2); human(0, 0, 1.25, t, { body: '#5a4a3a', legs: '#3a3028', hair: '#2a1a10', beard: 'short', hat: 'cap', hatCol: '#2a2420', face: 'calm', armR: 'up', armL: 'up', prop: 'stick', look: 0.1, seed: 1010 }); pop();
    const dr = (t * 1.6) % 1; ell(560, 1000 - 400 + dr * 140, 5, 7, { wash: '#3a6ab0', washA: 1, line: false });
    txt('Микеланджело', 520, 1070, 36, { font: 'Hand', col: '#f6ecd6' });
  }
  function myth(t) {                                                 // врезка «лёжа на спине» и перечёркивание
    const a = clamp((t - LS('s7')) / 0.3) * (1 - clamp((t - EV.st_years) / 0.3)); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a; push(300, 1250, 0.9, -0.05);
    rect(-200, -120, 400, 240, { wash: '#efe2c0', washA: 1, w: 5, col: '#5a3a14' });
    push(0, 40, 1, -Math.PI / 2); human(0, 0, 0.55, 0, { body: '#5a4a3a', legs: '#3a3028', hair: '#2a1a10', beard: 'short', face: 'calm', armR: 'up', seed: 1011 }); pop();
    pencil([[-180, 70], [180, 70]], { w: 6, col: '#7a5a34', pass2: false }); txt('лёжа?', 0, -84, 40, { font: 'Hand', col: '#3a2410' });
    if (t > EV.st_stand - 0.2) { const q = clamp((t - EV.st_stand + 0.2) / 0.25); pencil([[-190, -110], [-190 + 380 * q, -110 + 220 * q]], { w: 12, col: '#c8241e', pass2: false }); pencil([[190, -110], [190 - 380 * q, -110 + 220 * q]], { w: 12, col: '#c8241e', pass2: false }); }
    pop(); ctx.restore();
  }
  function counter(t) { if (t < EV.st_years) return; const k = clamp((t - EV.st_years) / 0.9), y = Math.round(1508 + 4 * k); push(840, 1180, popK(t, EV.st_years, 0.3), 0.04); rect(-150, -60, 300, 120, { wash: '#2a1a10', washA: 0.92, w: 3, col: '#d6a842' }); txt(String(y), 0, 6, 80, { font: 'Osw', col: '#f6d890' }); txt('4 года', 0, 90, 40, { font: 'Hand', col: '#f6ecd6' }); pop(); }
  WORLD.sistine = (t, u, cat) => {
    lay(10, () => { push(0, 260, 1); vault(t); pop();
      for (let q = 0; q < 12; q++) { const x = -300 + q * 150; const c = blob([[x, 1080], [x + 150, 1080], [x + 140, 1400], [x + 75, 1380], [x + 10, 1400]], { wash: q % 2 ? '#c8b07a' : '#d8c08a', washA: 1, w: 1.6, col: '#6a5030' }); for (let f = 0; f < 4; f++) pencil([[x + 20 + f * 34, 1084], [x + 18 + f * 34, 1390]], { w: 2, col: '#8a6a3a', a: 0.6, pass2: false }); }
      pencil([[-300, 1080], [1500, 1080]], { w: 10, col: '#8a6a3a', pass2: false }); for (let q = 0; q < 8; q++) { const x = -200 + q * 220; pencil([[x, 1400], [x, 1240]], { w: 6, col: '#a8843a', pass2: false }); ell(x, 1236, 22, 8, { wash: '#d6a842', washA: 1, w: 1.4 }); candle(x, 1230, 0.7, t, q); } });
    lay(4, () => scaffold(t));
    lay(1, () => { const f = poly([[-400, 1440], [1500, 1440], [1500, 2400], [-400, 2400]], { wash: '#c8b494', washA: 1, w: 2, col: '#3a2a14', key: 10030 });
      for (let k = 0; k < 8; k++) { const r = 80 + k * 70; pencil(ellPts(540, 1700, r * 2.4, r * 0.5, 0, 0.02, 60), { w: 3, col: ['#8a3a2a', '#2a5a7a', '#e6dcc4'][k % 3], a: 0.6, pass2: false }); }
      myth(t); counter(t); cat(); });
    motes(40, [0, 300, W, 1500], '#fff2d0', t, 10040, { sp: 8, sz: 3, a: 0.5, tw: 1, add: 1, wob: 20 });
  };
  DIR.sistine = {
    outfit: 'master', light: { side: -1, rim: '#fff0c8' }, grade: ['#c89a5a', 0.1],
    act: () => [[S0.sistine, 'awe'], [EV.st_not, 'suspicious'], [EV.st_stand, 'shock'], [EV.st_years, 'proud'], [EV.st_head, 'annoyed']],
    pose: (t, u, b) => { const up = t > EV.st_head; return Object.assign(b, { x: 760, y: 1600, s: 0.9, look: up ? [0, -1] : t > EV.st_stand ? [-0.5, -0.8] : [-0.6, 0], tilt: up ? -0.16 : 0, hand: up ? [60, -330] : t > EV.st_stand && t < EV.st_years ? [-110, -340] : undefined, point: t > EV.st_stand && t < EV.st_years ? 1 : undefined, prop: 'brush' }); },
    cam: () => [[S0.sistine, 540, 1120, -0.04], [EV.st_not, 500, 1100, 0.0], [EV.st_stand, 540, 900, 0.06, 'x'], [EV.st_years, 600, 1060, -0.02], [EV.st_head, 560, 860, -0.04], [S1.sistine, 560, 800, -0.06]],
    hud: t => { stamp(t, EV.st_stand + 0.05, 'myth', 820, 1240, -0.1, 0.8); }
  };
  // ---------------------------------------------------------------- переход В сцену: пальцы «Сотворения Адама» касаются, вспышка
  TRANS_IN.sistine = { a: 0.35, b: 0.35, runA: 1, fx(k, t, A, B) {
    drawBuf(k < 0.5 ? A : B); const q = sm(clamp(k / 0.5)), fl = k < 0.5 ? q * q : 1 - sm((k - 0.5) / 0.5);
    scr(() => { screenFill('#e8dcc0', 0.85 * fl); const gap = (1 - q) * 500 + 6;
      hand(540 - gap / 2 - 150, 940, 1.0 * (k < 0.5 ? 1 : 1 - (k - 0.5)), 0.05, '#e0b890', 1); hand(540 + gap / 2 + 150, 920, 1.0 * (k < 0.5 ? 1 : 1 - (k - 0.5)), Math.PI - 0.05, '#e8c4a0', -1);
      if (k > 0.42) { const w = clamp((k - 0.42) / 0.12) * (1 - clamp((k - 0.62) / 0.3)); glow(540, 930, 900 * w + 50, 'rgba(255,250,230,1)', w); whiteOut(w * 0.9); } });
  } };
})();
