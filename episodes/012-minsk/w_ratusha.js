/* 012 — сцена `ratusha`: 1857. Ратуша посреди площади, вокруг губернский город: извозчики, городовой, вывески. Свиток указа с
   вензелем «Н I» и надписью «СНЕСТИ». На «Горожане» мещане отворачиваются и машут руками («не будем»), на «арестанты» — колонна
   арестантов в серых халатах с ломами, ратуша осыпается до руин. Том в сюртуке и цилиндре. Переход В сцену — лом пробивает кадр трещинами. */
(() => {
  EV.ra_decree = wtk('s3', 'снести.');
  EV.ra_no = wtk('s3', 'Горожане');
  EV.ra_pris = wtk('s3', 'арестанты.');
  KEYW.push('снести.', 'арестанты.');
  SHAKES.push([EV.ra_pris + 0.3, 0.4, 8]);
  const fall = t => sm((t - EV.ra_pris - 0.2) / 0.9);

  function sky(t) { vgrad(-900, 1000, ['#7a8aa0', '#b8c4cc', '#e8e0d0'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 450 + t * 16) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 140 + i * 80 + Math.sin(k) * 10, 70, 26, { wash: '#eceae6', washA: 0.85, line: false }); } }
  function town(t) { for (let k = 0; k < 8; k++) { const x = -420 + k * 250, h = 200 + (k % 3) * 40; const f = rect(x, 1080 - h, 220, h, { wash: ['#e8d8b8', '#d8c8a8', '#c8d0c0'][k % 3], washA: 1, w: 2, col: '#3a2a14' }); shadeG(f.path, x + 220, 0, x, 0, '#8a7a5a', 0.3); rect(x - 6, 1080 - h - 12, 232, 14, { wash: '#f2ece0', washA: 1, w: 1.2, col: '#3a2a14' }); for (let j = 0; j < 2; j++) for (let q = 0; q < 3; q++) rect(x + 24 + q * 66, 1080 - h + 30 + j * 90, 36, 54, { wash: '#3a4a5a', washA: 1, w: 1.2, col: '#1a1a1a' }); }
    spirit(1250, 1000, 0.42, t); }
  function hall(t) {                                                   // ратуша → руины, пыль
    const f = fall(t); if (f < 1) { ctx.save(); ctx.beginPath(); ctx.rect(100, 1080 - 760 * (1 - f) - 20, 900, 800); ctx.clip(); ratusha(540, 1080, 0.72, t); ctx.restore(); }
    if (f > 0) { ratusha(540, 1080, 0.72, t, { ruin: 1 }); for (let q = 0; q < 10; q++) { const ph = clamp((t - EV.ra_pris - 0.2) * 0.8 + q * 0.05); ell(300 + q * 50 + ph * 40, 1040 - ph * 260, 40 + ph * 80, 30 + ph * 60, { wash: '#d8d0c4', washA: 0.6 * (1 - ph), line: false }); } }
  }
  function crowd2(t) {                                                 // мещане отказываются; арестанты с ломами
    const g = rect(-500, 1080, 2100, 80, { wash: '#a8a094', washA: 1, w: 2, col: '#3a3630' });
    const no = t > EV.ra_no; for (let i = 0; i < 6; i++) { const x = -200 + i * 110, y = 1250 + (i % 2) * 30; human(x, y, 0.55, t, { body: ['#5a3a2a', '#2a4a6a', '#6a2a3a', '#3a5a3a', '#7a6a4a', '#4a4a5a'][i], legs: '#3a2a1a', hair: '#3a2210', beard: i % 2 ? 'short' : null, hat: i % 2 ? 'cap' : 'merchant', hatCol: '#2a2a2a', face: no ? 'angry' : 'calm', armR: no ? 'wave' : 'hold', armL: no && i % 2 ? 'hips' : 'hold', seed: 1300 + i, flip: no ? -1 : 1 }); }
    if (t > EV.ra_pris - 0.3) for (let i = 0; i < 5; i++) { const x = lerp(1500, 700, sm((t - EV.ra_pris + 0.3) / 0.8)) + i * 90, y = 1230 + (i % 2) * 30, hit = Math.sin(t * 8 + i) > 0.3; human(x, y, 0.55, t, { body: '#8a8a84', legs: '#7a7a74', hair: '#2a1a10', hat: 'cap', hatCol: '#7a7a74', face: 'angry', armR: hit ? 'up' : 'hold', armL: hit ? 'up' : 'hold', prop: 'axe', seed: 1310 + i, flip: -1 }); }
  }
  function constable(t) { human(900, 1490, 1.0, t, { body: '#2a3a2a', bodyD: '#121a12', legs: '#2a2a2e', boots: '#141010', trim: '#d6a842', hair: '#3a2210', beard: 'short', hat: 'police', hatCol: '#2a3a2a', face: t > EV.ra_no ? 'angry' : 'calm', armR: 'point', armL: 'hips', prop: 'scroll', seed: 1320, flip: -1 }); }

  WORLD.ratusha = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(10, () => town(t));
    lay(6, () => hall(t));
    lay(3, () => crowd2(t));
    lay(1, () => { const g = shape([[-500, 1470], [1600, 1470], [1600, 2400], [-500, 2400]], { wash: '#9a9284', washA: 1, w: 1, col: '#000', a: 0.2 }); ctx.save(); ctx.clip(g.path); for (let x = -480; x < 1600; x += 60) for (let y = 1480; y < 2400; y += 36) ell(x + (Math.floor(y / 36) % 2) * 30, y, 26, 14, { wash: '#aaa292', washA: 0.7, w: 1, col: '#5a564a', a: 0.4 }); ctx.restore(); constable(t); cat(); });
    lay(0.7, () => { if (fall(t) > 0) motes(40, [-100, 600, 1200, 1900], '#e8e0d4', t, 12400, { sp: -30, sz: 4, a: 0.5 * (1 - fall(t) * 0.5), wob: 30 }); });
  };
  DIR.ratusha = {
    outfit: 'victorian', light: { side: 1, rim: '#f0e8d8' }, grade: ['#9a9a9a', 0.1],
    act: () => [[S0.ratusha, 'suspicious'], [EV.ra_decree, 'shock'], [EV.ra_no, 'smug'], [EV.ra_pris + 0.2, 'scared']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1480, s: 1.04, look: t < EV.ra_pris ? [0.5, -0.3] : [0.4, -0.5], hand: t > EV.ra_pris + 0.2 ? [80, -400] : [120, -270], handF: t > EV.ra_pris + 0.2 ? [-80, -400] : undefined }),
    cam: () => [[S0.ratusha, 560, 1000, 0.06], [EV.ra_decree, 560, 980, 0.1], [EV.ra_no, 560, 1100, 0.06], [EV.ra_pris, 560, 1020, 0.04], [S1.ratusha, 560, 1040, 0.1]],
    hud: t => { if (t > EV.ra_decree - 0.4 && t < EV.ra_pris) { const k = popK(t, EV.ra_decree - 0.4, 0.35); push(560, 700, k, 0.03); rect(-260, -100, 520, 200, { wash: '#f2e6c4', washA: 0.97, w: 3, col: '#5a3a1a' }); txt('ВЫСОЧАЙШЕЕ ПОВЕЛЕНИЕ · 1857', 0, -56, 30, { font: 'Osw', col: '#5a1a10' }); txt('ратушу — СНЕСТИ', 0, 4, 52, { font: 'Osw', col: '#a8201e' }); txt('Николай I', 120, 64, 30, { col: '#2a1a10' }); pop(); }
      if (t > EV.ra_pris) note('горожане отказались — ломали арестанты', 560, 1420, t, EV.ra_pris + 0.1, S1.ratusha, '#2a1a10', 34, -0.02); }
  };

  // ---------------------------------------------------------------- переход В ratusha: лом пробивает кадр, трещины, осыпание
  TRANS_IN.ratusha = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    const hit = sm(clamp(k / 0.3)), go = sm(clamp((k - 0.4) / 0.6)); drawBuf(B, 1.06 - 0.06 * sm(k));
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1 - go; drawBuf(A); ctx.restore();
    scr(() => { const r = rng(12410); for (let i = 0; i < 10; i++) { const a = r() * 6.283, L = (300 + r() * 900) * hit; const pts = [[540, 960]]; for (let q = 1; q <= 5; q++) pts.push([540 + Math.cos(a + (r() - 0.5) * 0.4) * L * q / 5, 960 + Math.sin(a + (r() - 0.5) * 0.4) * L * q / 5]); pencil(pts, { w: 5, col: '#1a1410', a: 1 - go, pass2: false }); }
      if (k < 0.45) { push(540 + (1 - hit) * 700, 960 - (1 - hit) * 700, 1, -0.78); rect(-20, -500, 40, 1000, { wash: '#4a4a4e', washA: 1, w: 3, col: '#000' }); pop(); } });
  } };
})();
