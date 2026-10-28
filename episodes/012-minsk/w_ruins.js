/* 012 — сцена `ruins`: июль 1944 → 1950-е. Сначала руины: остовы стен, печные трубы, на месте ратуши — груда камней, люди разбирают
   завалы цепочкой. На «строят заново» снизу вверх вырастают сталинские дома проспекта: русты, арки, башня со звездой-шпилем, краны,
   леса, оркестр-трубач на площади; на «ампиром» — табличка «проспект ≈ 2,9 км · 15 лет стройки». Том — архитектор (сюртук, котелок).
   Переход В сцену — пыль руин складывается в кирпичи. */
(() => {
  EV.ru_ruin = wtk('s6', 'руинах.');
  EV.ru_build = wtk('s6', 'строят');
  EV.ru_empire = wtk('s6', 'ампиром.');
  KEYW.push('руинах.', 'ампиром.');
  const grow = t => sm((t - EV.ru_build) / (EV.ru_empire - EV.ru_build + 0.8));

  function sky(t) { const g = grow(t); vgrad(-900, 1000, [lerpC('#8a8a8e', '#6aa0d0', g), lerpC('#b8b4ac', '#b8d4e8', g), lerpC('#d8d0c4', '#f2e8d4', g)], 1); for (let i = 0; i < 4; i++) { const x = ((i * 450 + t * 16) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 140 + i * 80 + Math.sin(k) * 10, 70, 26, { wash: '#f2f0ea', washA: 0.8, line: false }); } }
  function ruinsL(t) {                                                 // руины: остовы, трубы, завалы
    const g = grow(t), a = 1 - sm((g - 0.3) / 0.5); if (a <= 0) return; ctx.save(); ctx.globalAlpha = a;
    for (let k = 0; k < 8; k++) { const x = -420 + k * 250, h = 120 + ((k * 53) % 160); poly([[x, 1100], [x, 1100 - h], [x + 40, 1100 - h - 30], [x + 90, 1100 - h + 20], [x + 140, 1100 - h - 50], [x + 200, 1100 - h + 10], [x + 200, 1100]], { wash: '#a89c8c', washA: 1, w: 2, col: '#2a2420' }); for (let q = 0; q < 3; q++) rect(x + 20 + q * 60, 1100 - h + 40, 34, 50, { wash: '#2a2420', washA: 1, w: 1, col: '#000' }); }
    for (const cx of [100, 700, 1200]) rect(cx - 16, 820, 32, 280, { wash: '#8a5a3a', washA: 1, w: 2, col: '#2a1408' });
    ratusha(540, 1100, 0.7, t, { ruin: 1 }); ctx.restore();
  }
  function avenue(t) {                                                 // сталинские дома растут, краны, леса
    const g = grow(t); if (g <= 0) return;
    [[-460, 380, 420, 0], [-40, 420, 480, 1], [420, 420, 520, 2], [880, 380, 440, 3]].forEach(([x, w, h, i]) => { const k = clamp(g * 1.6 - i * 0.18); if (k <= 0) return; ctx.save(); ctx.beginPath(); ctx.rect(x - 20, 1100 - (h + 400) * k, w + 40, (h + 400) * k + 4); ctx.clip(); stalin(x, 1100, w, h, t, { key: 12600 + i, tower: i === 2 }); ctx.restore();
      if (k < 1) { const y = 1100 - h * k; for (const lx of [x + 20, x + w / 2, x + w - 20]) pencil([[lx, 1100], [lx, y - 30]], { w: 5, col: '#8a6a3a' }); pencil([[x, y], [x + w, y]], { w: 4, col: '#8a6a3a', pass2: false }); } });
    for (const cx of [300, 1100]) { const a = Math.sin(t * 0.6 + cx) * 0.2; pencil([[cx, 1100], [cx, 500]], { w: 10, col: '#c8a030' }); push(cx, 500, 1, a); pencil([[-200, 0], [360, 0]], { w: 8, col: '#c8a030' }); pencil([[300, 0], [300, 180]], { w: 2, col: '#2a2a2a', pass2: false }); rect(270, 180, 60, 40, { wash: MN.stalin, washA: 1, w: 1.6, col: '#3a3020' }); pop(); }
  }
  function people(t) {                                                 // цепочка разборщиков / оркестр
    const g = grow(t); for (let i = 0; i < 7; i++) { const x = -100 + i * 140, y = 1240 + (i % 2) * 20; human(x, y, 0.5, t, { body: ['#5a5a54', '#4a4a5a', '#6a5a4a', '#3a4a4a'][i % 4], legs: '#2a2a2a', hair: '#3a2210', hat: i % 2 ? 'scarf' : 'cap', hatCol: '#7a3a3a', face: g > 0.5 ? 'smile' : 'calm', armR: 'up', armL: 'up', long: i % 2 === 1, seed: 1360 + i }); ell(x + 30, y - 110, 14, 10, { wash: '#a85a3a', washA: 1, w: 1.2, col: '#2a1408' }); }
  }

  WORLD.ruins = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(6, () => { ruinsL(t); avenue(t); });
    lay(3, () => { const g = rect(-500, 1100, 2100, 200, { wash: '#a8a094', washA: 1, w: 2, col: '#3a3630' }); people(t); });
    lay(1, () => { const g = shape([[-500, 1470], [1600, 1470], [1600, 2400], [-500, 2400]], { wash: '#9a9284', washA: 1, w: 2, col: '#2a2420', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#2a2420', ang: 0.1, w: 1.2 });
      for (let i = 0; i < 4; i++) rect(760 + i * 60, 1440 - (i % 2) * 30, 54, 30, { wash: '#a8603a', washA: 1, w: 1.6, col: '#3a1408' }); cat(); });
    lay(0.7, () => { if (grow(t) < 0.5) motes(40, [-100, 500, 1200, 1900], '#d8d0c4', t, 12610, { sp: -20, sz: 4, a: 0.4, wob: 30 }); });
  };
  DIR.ruins = {
    outfit: 'architect', light: { side: 1, rim: '#fff0d0' }, grade: ['#a89878', 0.1],
    act: () => [[S0.ruins, 'awe'], [EV.ru_ruin, 'scared'], [EV.ru_build, 'proud'], [EV.ru_empire - 0.03, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1480, s: 1.02, look: [0.5, -0.4], hand: t > EV.ru_build ? [100, -400] : [120, -270] }),
    cam: () => [[S0.ruins, 560, 1060, 0.08], [EV.ru_ruin, 560, 1080, 0.06], [EV.ru_build, 560, 960, 0.0], [S1.ruins, 560, 940, 0.04]],
    hud: t => { if (t > EV.ru_empire) { const k = popK(t, EV.ru_empire, 0.35); push(560, 700, k, -0.03); rect(-280, -70, 560, 140, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a3020' }); txt('ПРОСПЕКТ ≈ 2,9 км', 0, -20, 46, { font: 'Osw', col: '#5a1a10' }); txt('≈ 15 лет стройки', 0, 32, 30, { col: '#2a1a10' }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В ruins: пыль складывается в кирпичи
  TRANS_IN.ruins = { a: 0.3, b: 0.45, fx(k, t, A, B) {
    if (k < 0.45) drawBuf(A); else drawBuf(B, 1.08 - 0.08 * sm((k - 0.45) / 0.55));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI), r = rng(12620), q = sm(clamp((k - 0.3) / 0.5)); ctx.save(); ctx.globalAlpha = 0.6 * f; ctx.fillStyle = '#8a8478'; ctx.fillRect(0, 0, W, H); ctx.restore();
      for (let i = 0; i < 80; i++) { const sx = r() * W, sy = r() * H, gx = (i % 8) * 140 + 30, gy = 300 + Math.floor(i / 8) * 130; const x = lerp(sx, gx, q), y = lerp(sy, gy, q); if (q < 0.5) ell(x, y, 30, 20, { wash: '#c8c0b4', washA: 0.8 * f, line: false }); else rect(x - 60, y - 26, 120, 52, { wash: '#a8603a', washA: f, w: 2, col: '#3a1408' }); } });
  } };
})();
