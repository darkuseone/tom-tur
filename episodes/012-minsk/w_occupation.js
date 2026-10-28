/* 012 — сцена `occupation`: 1941–1944. Июнь 1941: дым над крышами, силуэты самолётов без опознавательных знаков, календарь «7-й день».
   На «оккупации» кадр сереет, по улице идёт патруль-силуэт без символики, на «гетто» поперёк кадра — колючая проволока, за ней
   деревянные дома и люди в тёмных пальто (лица спокойные, без насилия). На «десятки тысяч» — мемориал «Яма»: бронзовые фигуры
   спускаются по ступеням, свечи; табличка «Минское гетто · 1941–1943». Том в гимнастёрке. Музыка приглушена.
   Переход В сцену — колючая проволока натягивается поперёк кадра. */
(() => {
  EV.oc_day = wtk('s5', 'седьмой');
  EV.oc_occ = wtk('s5', 'оккупации,');
  EV.oc_ghetto = wtk('s5', 'гетто');
  EV.oc_dead = wtk('s5', 'десятки');
  KEYW.push('войны.', 'убитых.');
  SHAKES.push([S0.occupation + 0.05, 0.3, 7]);
  const grey = t => sm((t - EV.oc_occ) / 0.6);

  function sky(t) { const g = grey(t); vgrad(-900, 1000, [lerpC('#8a7a6a', '#3a3c44', g), lerpC('#c89a7a', '#6a6a70', g), lerpC('#e8c8a8', '#8a8a8e', g)], 1);
    if (g < 0.8) for (let i = 0; i < 3; i++) { const x = ((t - S0.occupation) * 200 + i * 300) % 1700 - 300, y = 300 + i * 60; sil([[x - 60, y], [x + 60, y - 6], [x + 70, y], [x + 10, y + 6], [x - 50, y + 8]], '#2a2a2e', 0.8 * (1 - g)); sil([[x - 10, y - 4], [x + 10, y - 40], [x + 22, y - 40], [x + 10, y]], '#2a2a2e', 0.8 * (1 - g)); }
    for (let k = 0; k < 5; k++) { const ph = (t * 0.25 + k / 5) % 1; ell(100 + k * 220 + ph * 60, 760 - ph * 380, 70 + ph * 110, 50 + ph * 80, { wash: '#3a3a3e', washA: 0.5 * (1 - ph), line: false }); } }
  function city(t) { const g = grey(t); for (let k = 0; k < 7; k++) { const x = -420 + k * 280, h = 220 + (k % 3) * 50; const f = rect(x, 1080 - h, 240, h, { wash: lerpC(['#e8d8b8', '#d8b8a0', '#c8d0c0'][k % 3], '#8a8a8a', g * 0.6), washA: 1, w: 2, col: '#2a2a2a' }); for (let j = 0; j < 2; j++) for (let q = 0; q < 3; q++) rect(x + 24 + q * 72, 1080 - h + 30 + j * 100, 40, 60, { wash: '#2a3040', washA: 1, w: 1.2, col: '#1a1a1a' }); }
    if (g > 0) for (let i = 0; i < 3; i++) { const x = 1300 - ((t - EV.oc_occ) * 60 + i * 80) % 1500; sil([[x - 20, 1080], [x - 22, 1010], [x - 14, 980], [x + 14, 980], [x + 22, 1010], [x + 20, 1080]], '#2a2a2e', 0.85 * g); sil(ellPts(x, 965, 14, 15, 0, 0, 16), '#2a2a2e', 0.85 * g); } }
  function ghetto(t) {                                                 // за колючей проволокой — деревянные дома и люди
    if (t < EV.oc_ghetto - 0.3) return; const k = sm((t - EV.oc_ghetto + 0.3) / 0.6);
    ctx.save(); ctx.globalAlpha = k; for (let q = 0; q < 4; q++) izba(-100 + q * 300, 1300, 220, 150, 0.7, t, { col: '#5a4a3a', roof: '#3a3430' });
    for (let i = 0; i < 6; i++) human(-60 + i * 170, 1320, 0.48, t, { body: ['#2a2a30', '#3a3030', '#2a3036', '#3a3a3a'][i % 4], legs: '#1a1a1e', hair: '#2a1a10', hat: i % 2 ? 'scarf' : 'cap', hatCol: '#3a3a3a', face: 'calm', armR: 'hold', armL: 'hold', long: i % 2 === 1, seed: 1350 + i }); ctx.restore();
    for (let r = 0; r < 4; r++) { const y = 1180 + r * 50; pencil(Array.from({ length: 30 }, (_, i) => [-400 + i * 70, y + Math.sin(i * 1.3 + r) * 8]), { w: 3, col: '#1a1a1a', a: k, pass2: false }); for (let i = 0; i < 30; i++) { const x = -400 + i * 70 + 35, yy = y + Math.sin((i + 0.5) * 1.3 + r) * 8; pencil([[x - 8, yy - 8], [x + 8, yy + 8]], { w: 2, col: '#1a1a1a', a: k, pass2: false }); pencil([[x + 8, yy - 8], [x - 8, yy + 8]], { w: 2, col: '#1a1a1a', a: k, pass2: false }); } }
    for (const px of [-100, 400, 900, 1400]) pencil([[px, 1380], [px, 1150]], { w: 10, col: '#3a2a1a', a: k });
  }
  function yama(t) {                                                   // мемориал «Яма»: бронзовые фигуры по ступеням, свечи
    if (t < EV.oc_dead) return; const k = sm((t - EV.oc_dead) / 0.8);
    ctx.save(); ctx.globalAlpha = k; for (let s = 0; s < 5; s++) rect(520 + s * 60, 1470 + s * 18, 380, 20, { wash: '#8a8478', washA: 1, w: 1.6, col: '#2a2420' });
    for (let i = 0; i < 6; i++) { const x = 560 + i * 58, y = 1470 + i * 15, h = 120 - i * 4; sil([[x - 12, y], [x - 14, y - h * 0.7], [x - 8, y - h * 0.9], [x + 8, y - h * 0.9], [x + 14, y - h * 0.7], [x + 12, y]], '#5a4a32', 0.95); sil(ellPts(x + 4, y - h, 9, 11, 0, 0, 12), '#5a4a32', 0.95); }
    for (let i = 0; i < 6; i++) { candle(560 + i * 64, 1600, 0.4, t, i, 1); glow(560 + i * 64, 1580, 60, 'rgba(255,200,120,1)', 0.35); } ctx.restore();
  }

  WORLD.occupation = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(8, () => city(t));
    lay(3, () => ghetto(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: lerpC('#a89a84', '#6a6a6a', grey(t)), washA: 1, w: 2, col: '#2a2a2a', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#2a2a2a', ang: 0.1, w: 1.2 }); yama(t); cat(); });
    lay(0.7, () => haze('#14141a', 0.22 * grey(t)));
  };
  DIR.occupation = {
    outfit: 'voen', light: { side: 1, rim: '#d8d0c0' }, grade: ['#6a6a6a', 0.16],
    act: () => [[S0.occupation, 'shock'], [EV.oc_occ, 'scared'], [EV.oc_dead - 0.05, 'neutral']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1480, s: 1.02, look: t < EV.oc_dead ? [0.5, -0.2] : [0.5, 0.2], nod: t > EV.oc_dead ? 0.06 : 0 }),
    cam: () => [[S0.occupation, 560, 1000, 0.06], [EV.oc_occ, 560, 1060, 0.06], [EV.oc_ghetto, 560, 1160, 0.1], [EV.oc_dead, 600, 1220, 0.14], [S1.occupation, 600, 1240, 0.18]],
    hud: t => {
      if (t > EV.oc_day - 0.2 && t < EV.oc_occ + 0.3) { const k = popK(t, EV.oc_day - 0.2, 0.35); push(760, 700, k, 0.04); for (let q = 0; q < 3; q++) rect(-110 + q * 3, -110 - q * 3, 220, 220, { wash: '#f2ece0', washA: 1, w: 2, col: '#3a3a3a' }); rect(-110, -110, 220, 46, { wash: '#2a2a32', washA: 1, w: 1.6, col: '#000' }); txt('ИЮНЬ 1941', 0, -86, 28, { font: 'Osw', col: '#f2ece0' }); txt('7', 0, 16, 110, { font: 'Osw', col: '#a8201e' }); txt('день войны', 0, 84, 24, { font: 'Osw', col: '#4a4a4a' }); pop(); }
      if (t > EV.oc_dead) { const k = popK(t, EV.oc_dead, 0.4); push(540, 700, k, 0); ctx.save(); ctx.globalAlpha = 0.9 * k; ctx.fillStyle = 'rgba(16,14,14,0.86)'; ctx.fillRect(-320, -70, 640, 140); ctx.restore(); txt('МИНСКОЕ ГЕТТО · 1941–1943', 0, -22, 40, { font: 'Osw', col: '#f2ece0', a: k }); txt('десятки тысяч убитых', 0, 30, 30, { col: '#e8d8b0', a: k }); pop(); }
    }
  };

  // ---------------------------------------------------------------- переход В occupation: колючая проволока натягивается поперёк кадра
  TRANS_IN.occupation = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    if (k < 0.5) drawBuf(A); else drawBuf(B, 1.08 - 0.08 * sm((k - 0.5) / 0.5));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI), L = W * sm(clamp(k * 2)); ctx.save(); ctx.globalAlpha = 0.6 * f; ctx.fillStyle = '#0e0e10'; ctx.fillRect(0, 0, W, H); ctx.restore();
      for (let r = 0; r < 9; r++) { const y = 200 + r * 200, pts = []; for (let x = 0; x <= L; x += 40) pts.push([x, y + Math.sin(x / 50 + r) * 10]); if (pts.length > 1) pencil(pts, { w: 5, col: '#c8c8cc', a: f, pass2: false }); for (let x = 30; x < L; x += 80) { pencil([[x - 12, y - 12], [x + 12, y + 12]], { w: 4, col: '#c8c8cc', a: f, pass2: false }); pencil([[x + 12, y - 12], [x - 12, y + 12]], { w: 4, col: '#c8c8cc', a: f, pass2: false }); } } });
  } };
})();
