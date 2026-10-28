/* 010 — сцена `flood`: 7 ноября 1824, Великое наводнение. Шторм, ливень, свинцовое небо; улица жёлтых и розовых доходных домов, вода
   поднимается от мостовой до второго этажа. Плывут бочки, брёвна, полосатая будка часового, шляпа; люди на крыше машут, лодка с гребцами
   между домов; фонарь торчит из воды. Том в бушлате стоит в лодке и качается. На «поднялась» — вал воды и тряска, на «четыре» — рейка
   уровня «+4,21 м», на «Погибли» — свет гаснет, грейдинг холоднее, пауза. Переход В сцену — вода поднимается снизу и заливает кадр. */
(() => {
  EV.fl_rise = wtk('s5', 'поднялась');
  EV.fl_four = wtk('s5', 'четыре');
  EV.fl_dead = wtk('s5', 'Погибли');
  KEYW.push('метра.', 'сотни');
  SHAKES.push([EV.fl_rise + 0.05, 0.35, 8]);
  const rise = t => sm((t - S0.flood + 0.2) / (EV.fl_four - S0.flood + 0.4));
  const lvl = t => lerp(1250, 1010, rise(t));
  const dark = t => sm((t - EV.fl_dead) / 0.6);
  const bob = (t, k = 0) => Math.sin(t * 2.6 + k) * 10;

  function sky(t) {
    vgrad(-900, 1100, [lerpC('#3a4450', '#262e38', dark(t)), '#5a6670', '#8a948e', '#a8aca0'], 1);
    for (let i = 0; i < 5; i++) { const x = ((i * 380 + t * 90) % 2000) - 500; for (let k = 0; k < 6; k++) ell(x + k * 60, 140 + i * 70 + Math.sin(k + i) * 16, 90, 34, { wash: i % 2 ? '#4a525a' : '#5e666c', washA: 0.85, line: false }); }
    if (Math.sin(t * 1.3) > 0.985) glow(800, 300, 700, 'rgba(220,230,255,1)', 0.5);
  }
  function far(t) {                                                    // дальний берег: шпиль Петропавловки, крыши в дымке
    for (let k = 0; k < 26; k++) { const x = -300 + k * 70, h = 50 + (k * 37) % 70; sil([[x, 900], [x, 900 - h], [x + 64, 900 - h], [x + 64, 900]], '#5a6268', 0.8); }
    spire(980, 900, 0.36, t, { col: '#9a8a5a' });
  }
  function street(t) {                                                 // доходные дома, люди на крыше, отметка на стене
    const H = [['#e8c878', 320], ['#d89a8a', 380], ['#a8c0c8', 340], ['#e8d8b8', 400], ['#c8b0d8', 360]];
    H.forEach(([c, h], i) => facade(-320 + i * 330, 1200, 320, h, c, t, { key: 9900 + i }));
    for (const [x, k] of [[150, 0], [200, 1]]) human(x, 1200 - 380 + 4, 0.34, t, { body: ['#3a3a4a', '#8a3a3a'][k], legs: '#2a2a2a', hair: '#3a2a1a', face: 'shock', armR: Math.sin(t * 8 + k) > 0 ? 'up' : 'wave', armL: 'up', seed: 600 + k });
    for (const [x, k] of [[790, 2], [840, 3], [880, 4]]) human(x, 1200 - 400 + 4, 0.32, t, { body: ['#4a5a3a', '#e8e0cc', '#2a3a5a'][k - 2], legs: '#2a2a2a', hair: '#3a2a1a', hat: k === 3 ? 'scarf' : null, hatCol: '#8a2a2a', face: 'shock', armR: 'up', armL: Math.sin(t * 7 + k) > 0 ? 'up' : 'hold', seed: 600 + k });
    // латунная отметка уровня на стене (такие висят в городе до сих пор)
    const my = 1010; pencil([[1010 - 40, my], [1010 + 60, my]], { w: 5, col: '#d6a842', pass2: false }); txt('1824', 1010 + 10, my - 18, 22, { font: 'Osw', col: '#5a3a08' });
  }
  function water(t, y0, cols, a = 1) {                                 // вода с волной, пеной и рябью
    const pts = []; for (let x = -500; x <= 1600; x += 40) pts.push([x, y0 + Math.sin(x / 70 + t * 4) * 12 + Math.sin(x / 31 - t * 6) * 5]);
    const w = shape([...pts, [1600, 2400], [-500, 2400]], { wash: cols[0], washA: a, w: 2, col: '#1a2a2a', a: 0.6 }); shadeG(w.path, 0, y0, 0, y0 + 700, cols[1], 0.7);
    pencil(pts, { w: 5, col: '#e8eee8', a: 0.7, pass2: false });
    const r = rng(9950 + Math.round(y0)); for (let i = 0; i < 26; i++) { const x = -300 + r() * 1800, y = y0 + 30 + r() * 600, l = 30 + r() * 60; pencil([[x + Math.sin(t * 2 + i) * 10, y], [x + l + Math.sin(t * 2 + i) * 10, y]], { w: 2.4, col: '#c8d4d0', a: 0.4, pass2: false }); }
  }
  function flotsam(t, y0) {                                            // бочки, брёвна, будка часового, шляпа
    const dx = ((t - S0.flood) * 70);
    push(1150 - dx, y0 + bob(t, 1), 0.9, Math.sin(t * 2) * 0.15); const bx = rect(-50, -150, 100, 150, { wash: '#f2ece0', washA: 1, w: 2, col: '#1a1a1a' }); ctx.save(); ctx.clip(bx.path); for (let y = -150; y < 0; y += 30) { ctx.fillStyle = '#1a1a1a'; ctx.fillRect(-50, y, 100, 15); } ctx.restore(); poly([[-60, -150], [60, -150], [0, -200]], { wash: '#2a2a2a', washA: 1, w: 2, col: '#000' }); pop();
    push(-60 + dx * 0.8, y0 + 20 + bob(t, 2), 0.8, Math.sin(t * 1.7) * 0.2); const br = ell(0, 0, 50, 34, { wash: '#8a5a2a', washA: 1, w: 2, col: '#2a1a08' }); for (const q of [-24, 24]) pencil([[q, -32], [q, 32]], { w: 4, col: '#3a3a3a', pass2: false }); pop();
    push(600 - dx * 0.5, y0 + 40 + bob(t, 3), 1, 0.1 + Math.sin(t * 1.4) * 0.05); rect(-180, -16, 360, 32, { wash: '#7a5a3a', washA: 1, w: 2, col: '#2a1a08' }); ell(-180, 0, 14, 16, { wash: '#a8845a', washA: 1, w: 1.6, col: '#2a1a08' }); pop();
    push(880 + Math.sin(t) * 30, y0 + 10 + bob(t, 4), 0.7, 0.3); blob([[-50, 0], [-30, -30], [30, -30], [50, 0], [70, 6], [-70, 6]], { wash: '#18161a', washA: 1, w: 2, col: '#000' }); pop();
  }
  function rowboat(t, y0) {                                            // лодка спасателей между домами
    const x = 760 - (t - S0.flood) * 30; push(x, y0 + 6 + bob(t, 5), 0.5, Math.sin(t * 2.2) * 0.04);
    shape([[-200, -40], [200, -40], [160, 20], [-160, 20]], { wash: '#6a4a2a', washA: 1, w: 2, col: '#1a0a04' });
    for (let q = 0; q < 2; q++) { const ox = -60 + q * 120, row = Math.sin(t * 5 + q) * 0.5; human(ox, -30, 0.9, t, { body: q ? '#2a3a5a' : '#5a3a2a', legs: '#2a2a2a', hair: '#2a1a10', hat: q ? 'cap' : 'fur', hatCol: '#2a2a2a', face: 'angry', armR: 'hold', armL: 'hold', seed: 620 + q, flip: -1 });
      pencil([[ox - 20, -160], [ox + Math.cos(row) * 200, 30 + Math.sin(row) * 30]], { w: 7, col: '#8a6a3a' }); }
    pop();
  }
  function lamp(t, y0) {                                               // фонарь торчит из воды
    pencil([[150, 2000], [150, 1080]], { w: 12, col: '#1a1a1e' }); push(150, 1060, 1); poly([[-30, 0], [30, 0], [22, -60], [-22, -60]], { wash: '#f6d48a', washA: 0.9, w: 3, col: '#1a1a1e' }); poly([[-36, -60], [36, -60], [0, -90]], { wash: '#1a1a1e', washA: 1, w: 2, col: '#000' }); pop();
    glow(150, 1030, 160, 'rgba(255,210,130,1)', (0.5 + 0.2 * Math.sin(t * 19)) * (1 - 0.7 * dark(t)));
  }
  function rain(t) { const r = rng(9960); ctx.save(); for (let i = 0; i < 120; i++) { const x = r() * 1700 - 300, sp = 1600 + r() * 600, y = ((r() * 2400 + t * sp) % 2400) - 300; pencil([[x, y], [x - 40, y + 90]], { w: 2, col: '#d8e0e4', a: 0.35, pass2: false, gap: false }); } ctx.restore(); }

  WORLD.flood = (t, u, cat) => {
    const L = lvl(t);
    lay(30, () => sky(t));
    lay(12, () => far(t));
    lay(6, () => { street(t); water(t, L, ['#5a6a62', '#2a3a3a'], 0.94); flotsam(t, L); });
    lay(3.2, () => rowboat(t, L + 140));
    lay(1, () => { water(t, 1440, ['#4a5a56', '#1e2a2a'], 1); lamp(t, L); cat(); });
    lay(0.7, () => { rain(t); haze('#1a2a34', 0.25 * dark(t)); });
  };
  DIR.flood = {
    outfit: 'sailor', light: { side: -1, rim: '#c8d8e0' }, grade: ['#4a6070', 0.16],
    act: () => [[S0.flood, 'shock'], [EV.fl_rise, 'scared'], [EV.fl_four, 'shock'], [EV.fl_dead - 0.05, 'neutral']],
    pose: (t, u, b) => Object.assign(b, { x: 430, y: 1440 + bob(t, 6), s: 1.04, rot: Math.sin(t * 2.6 + 6) * 0.04, look: t < EV.fl_dead ? [0.5, -0.4] : [0, 0.1], hand: t < EV.fl_dead ? [140, -330] : undefined, handF: [-120, -240], sweat: t < EV.fl_dead }),
    afterCat: (t, u, P) => {                                           // борт лодки перекрывает лапы Тома
      push(P.x, P.y, P.s, P.rot || 0); const hb = shape([[-280, -70], [290, -80], [240, 50], [-230, 50]], { wash: '#6a4428', washA: 1, w: 3, col: '#1a0a04' }); hatch(hb.path, hb.bb, { gap: 9, a: 0.18, col: '#2a1408', ang: 0.05, w: 1.2 });
      pencil([[-280, -70], [290, -80]], { w: 10, col: '#8a6a3a' }); txt('НЕВА', 0, -14, 34, { font: 'Osw', col: '#e8d8b0' }); pop();
      const y0 = P.y + 30; pencil(Array.from({ length: 30 }, (_, i) => [P.x - 400 + i * 30, y0 + Math.sin(i * 0.8 + t * 5) * 8]), { w: 5, col: '#e8eee8', a: 0.6, pass2: false });
    },
    cam: () => [[S0.flood, 560, 1000, 0.1], [EV.fl_rise, 560, 980, 0.03], [EV.fl_four, 600, 960, 0.08], [EV.fl_dead, 520, 1040, 0.12], [S1.flood, 520, 1060, 0.16]],
    hud: t => {
      if (t > EV.fl_rise - 0.2) { const k = popK(t, EV.fl_rise - 0.2, 0.35), h = rise(t); push(960, 1000, k);   // рейка уровня
        rect(-34, -360, 68, 720, { wash: '#f2ece0', washA: 0.95, w: 3, col: '#2a2a2a' }); for (let m = 0; m <= 4; m++) { const y = 340 - m * 170; pencil([[-34, y], [10, y]], { w: 4, col: '#2a2a2a', pass2: false }); txt(m + ' м', -80, y, 28, { font: 'Osw', col: '#f6f2ea' }); }
        const wy = 340 - h * 4.21 * 170; rect(-30, wy, 60, 356 - wy, { wash: '#3a6a8a', washA: 0.8, line: false }); pencil([[-50, wy], [50, wy]], { w: 6, col: '#8ac8ff', pass2: false });
        if (t > EV.fl_four) { const k2 = popK(t, EV.fl_four, 0.3); txt('+4,21 м', -40, wy - 50, 64 * k2, { font: 'Osw', col: '#ffd24a' }); } pop(); }
      if (t > EV.fl_dead) note('официально — около 500 погибших', 540, 1760, t, EV.fl_dead + 0.1, S1.flood, '#f2ece0', 40, -0.02);
    }
  };

  // ---------------------------------------------------------------- переход В flood: вода поднимается снизу и заливает кадр
  TRANS_IN.flood = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    const L = lerp(H + 160, -260, sm(k)), crest = x => L + Math.sin(x / 90 + t * 7) * 46 + Math.sin(x / 37 - t * 9) * 14;
    drawBuf(A, 1 + 0.04 * k);
    const P = new Path2D(); P.moveTo(0, H + 10); for (let x = 0; x <= W; x += 30) P.lineTo(x, crest(x)); P.lineTo(W, H + 10); P.closePath();
    inPath(P, () => { drawBuf(B, 1.1 - 0.1 * sm(k)); scr(() => { ctx.save(); ctx.globalAlpha = 0.45 * (1 - sm(k)); ctx.fillStyle = '#1e3a4a'; ctx.fillRect(0, 0, W, H); ctx.restore(); }); });
    scr(() => { const pts = []; for (let x = -20; x <= W + 20; x += 30) pts.push([x, crest(x)]); pencil(pts, { w: 14, col: '#f2f6f4', a: 0.9, pass2: false }); pencil(pts.map(([x, y]) => [x, y + 26]), { w: 6, col: '#8ab0c0', a: 0.7, pass2: false });
      const r = rng(9970); for (let i = 0; i < 30; i++) { const x = r() * W, y = crest(x) - r() * 120 * Math.sin(k * Math.PI); ell(x, y, 8 + r() * 14, 8 + r() * 14, { wash: '#f2f6f4', washA: 0.8, line: false }); } });
  } };
})();
