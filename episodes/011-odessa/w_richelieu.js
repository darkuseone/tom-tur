/* 011 — сцена `richelieu`: 1803–1814. Голая степь над морем размечается: землемеры натягивают шнуры по линейке, колышки, первая
   прямая улица; из ямы-каменоломни на телегах везут жёлтые блоки ракушняка (сквозная нить), каменщики кладут первые дома с колоннами.
   Ришельё в синем мундире со звездой разворачивает план города. На «Ришельё» — его медальон-подпись, на «будущий» — грамота
   «1815 · премьер-министр Франции» с лилиями. Переход В сцену — лист плана разворачивается на весь кадр. */
(() => {
  EV.ri_duc = wtk('s2', 'Ришельё');
  EV.ri_pm = wtk('s2', 'будущий');
  KEYW.push('Ришельё', 'Франции.');
  const grow = t => sm((t - S0.richelieu) / (S1.richelieu - S0.richelieu));

  function sky(t) { vgrad(-900, 900, ['#6aa0d0', '#b8d4e8', '#f2e8d4'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 450 + t * 16) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 140 + i * 80 + Math.sin(k) * 10, 70, 26, { wash: '#fbf8f2', washA: 0.85, line: false }); }
    for (let i = 0; i < 4; i++) { const x = ((i * 330 + t * 40) % 1500) - 200, y = 380 + i * 50, f = Math.sin(t * 7 + i) * 8; pencil([[x - 16, y + f], [x, y], [x + 16, y + f]], { w: 2.4, col: '#2a2a2a', pass2: false }); } }
  function seaSteppe(t) { vgrad(800, 900, ['#3a8aa8', '#2a6a86'], 1); const st = shape([[-500, 880], [1600, 860], [1600, 1440], [-500, 1440]], { wash: '#c8b878', washA: 1, w: 2, col: '#4a3a1a', a: 0.5 }); hatch(st.path, st.bb, { gap: 12, a: 0.15, col: '#6a5a2a', ang: 0.2, w: 1.2 });
    const R = rng(11400); for (let i = 0; i < 40; i++) { const x = -400 + R() * 1900, y = 890 + R() * 520; for (let q = -1; q <= 1; q++) pencil([[x + q * 5, y], [x + q * 8 + Math.sin(t * 2 + i) * 3, y - 22]], { w: 2, col: '#8a8a3a', pass2: false }); } }
  function grid(t) {                                                   // разметка улиц шнурами + первые дома растут
    const g = grow(t);
    for (let k = 0; k < 6; k++) { const y = 940 + k * 70, x1 = lerp(-200, 1500, clamp(g * 1.6 - k * 0.1)); pencil([[-300, y], [x1, y - 20]], { w: 2, col: '#f6f2ea', a: 0.9, pass2: false }); for (let q = 0; q < 8; q++) { const px = -260 + q * 220; if (px < x1) pencil([[px, y - (px + 300) / 1800 * 20], [px, y - 30 - (px + 300) / 1800 * 20]], { w: 4, col: '#6a4a2a', pass2: false }); } }
    for (let k = 0; k < 7; k++) pencil([[-200 + k * 240, 900], [-420 + k * 300, 1420]], { w: 2, col: '#f6f2ea', a: 0.7 * clamp(g * 2 - 0.3), pass2: false });
    [[620, 980, 220, 200], [880, 960, 180, 160], [1110, 970, 200, 190]].forEach(([x, b, w, h], i) => { const k = clamp(g * 2.2 - i * 0.35); if (k <= 0) return; ctx.save(); ctx.beginPath(); ctx.rect(x - 20, b - h * k, w + 40, h * k + 4); ctx.clip(); odHouse(x, b, w, h, OD.stone, t, { key: 11410 + i }); ctx.restore();
      if (k < 1) { pencil([[x - 10, b - h * k], [x + w + 10, b - h * k]], { w: 5, col: '#8a6a3a', pass2: false }); for (let q = 0; q < 2; q++) human(x + 40 + q * 100, b - h * k + 2, 0.3, t, { body: '#e8e0cc', legs: '#5a4a3a', hair: '#4a2a1a', hat: 'cap', hatCol: '#5a4a3a', armR: Math.sin(t * 7 + q) > 0 ? 'up' : 'hold', seed: 1142 + q }); } });
  }
  function quarry(t) {                                                 // яма-каменоломня и телеги с блоками ракушняка
    const p = shape([[-80, 1150], [300, 1140], [260, 1260], [-40, 1270]], { wash: '#140c06', washA: 1, w: 2.4, col: OD.rockD }); stoneRock(-60, 1150, 280, 1170, 11420, { n: 8 });
    for (let q = 0; q < 3; q++) { const x = 340 + ((t - S0.richelieu) * 60 + q * 220) % 700; push(x, 1200, 0.55); rect(-80, -60, 180, 50, { wash: '#8a6a3a', washA: 1, w: 2, col: '#2a1a08' }); for (const wx of [-50, 70]) { ell(wx, -10, 30, 30, { wash: '#6a4a24', washA: 1, w: 2, col: '#2a1a08' }); } for (let b = 0; b < 3; b++) rect(-70 + b * 52, -104, 46, 40, { wash: OD.stone, washA: 1, w: 1.6, col: OD.rockD }); pop(); }
  }
  function duc(t) {                                                    // Ришельё: синий мундир, белые лосины, звезда, план в руках
    const x = 860, y = 1490, s = 1.1, sh = t > EV.ri_duc - 0.2;
    human(x, y, s, t, { body: '#1e2e5a', bodyD: '#0e1630', legs: '#f2ece0', boots: '#141010', trim: '#d6a842', hair: '#d8d0c0', face: sh ? 'smile' : 'calm', armR: 'hold', armL: 'hold', belt: '#f2ece0', seed: 1144, flip: -1, look: -0.4 });
    push(x - 90, y - 190 * s, 0.7, -0.08 + Math.sin(t * 2) * 0.02); const pl = rect(-150, -100, 300, 200, { wash: '#f2e6c4', washA: 1, w: 2.4, col: '#5a3a1a' }); for (let k = 0; k < 6; k++) { pencil([[-130, -80 + k * 32], [130, -84 + k * 32]], { w: 1.6, col: '#5a4a3a', a: 0.7, pass2: false }); pencil([[-130 + k * 52, -84], [-130 + k * 52, 84]], { w: 1.6, col: '#5a4a3a', a: 0.7, pass2: false }); } pencil([[-140, 70], [140, 50]], { w: 6, col: '#2a7a96', pass2: false }); txt('ОДЕССА', 0, -112, 26, { font: 'Osw', col: '#5a1a10' }); pop();
    ell(x + 26, y - 220 * s, 12, 12, { wash: '#d6d8dc', washA: 1, w: 1.6, col: '#3a3a3a' });
  }

  WORLD.richelieu = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(8, () => seaSteppe(t));
    lay(5, () => { grid(t); quarry(t); });
    lay(1, () => { const g = shape([[-500, 1430], [1600, 1440], [1600, 2400], [-500, 2400]], { wash: '#b8a46a', washA: 1, w: 2, col: '#3a2a10', a: 0.5 }); hatch(g.path, g.bb, { gap: 10, a: 0.14, col: '#5a4a2a', ang: 0.15, w: 1.2 });
      for (let i = 0; i < 3; i++) rect(-120 + i * 70, 1500 + i * 12, 60, 46, { wash: OD.stone, washA: 1, w: 1.8, col: OD.rockD });
      duc(t); cat(); });
  };
  DIR.richelieu = {
    outfit: 'kamzol', light: { side: 1, rim: '#fff0d0' }, grade: ['#c0a070', 0.08],
    act: () => [[S0.richelieu, 'talk'], [EV.ri_duc, 'awe'], [EV.ri_pm - 0.03, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 380, y: 1480, s: 1.04, look: t < EV.ri_pm ? [0.5, -0.2] : [0.1, 0], hand: t > EV.ri_pm ? [100, -380] : [120, -260] }),
    cam: () => [[S0.richelieu, 600, 960, 0.1], [EV.ri_duc, 640, 1040, 0.08], [EV.ri_pm, 600, 1000, 0.12], [S1.richelieu, 600, 1000, 0.16]],
    hud: t => { if (t > EV.ri_pm) { const k = popK(t, EV.ri_pm, 0.35); push(560, 700, k, -0.03); rect(-280, -80, 560, 160, { wash: '#f2e6c4', washA: 0.97, w: 3, col: '#1e2e5a' }); for (const sx of [-230, 230]) { ell(sx, -10, 14, 22, { wash: '#d6a842', washA: 1, w: 1.4, col: '#5a4a08' }); for (const sd of [-1, 1]) ell(sx + sd * 14, -4, 9, 14, { wash: '#d6a842', washA: 1, w: 1.2, col: '#5a4a08' }); }
      txt('1815', 0, -36, 40, { font: 'Osw', col: '#1e2e5a' }); txt('ПРЕМЬЕР-МИНИСТР ФРАНЦИИ', 0, 22, 34, { font: 'Osw', col: '#a8201e' }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В richelieu: лист плана разворачивается на кадр
  TRANS_IN.richelieu = { a: 0.3, b: 0.35, fx(k, t, A, B) {
    const q = sm(k), x = lerp(-80, W + 80, q);
    drawBuf(A); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(0, 0, Math.max(0, x), H); ctx.clip(); drawBuf(B); ctx.restore();
    scr(() => { if (k < 0.98) { const r = 70; push(x, 960, 1); rect(-r, -1000, r * 2, 2000, { wash: '#f2e6c4', washA: 1, w: 3, col: '#5a3a1a' }); for (let y = -980; y < 1000; y += 40) pencil([[-r + 6, y], [r - 6, y]], { w: 1.4, col: '#a08a5a', a: 0.6, pass2: false }); ell(0, -1000, r, 18, { wash: '#e2d0a0', washA: 1, w: 2, col: '#5a3a1a' }); pop(); } });
  } };
})();
