/* 011 — сцена `quarry` (ответ на хук): XIX век, разрез. Внизу — каменоломня: каменотёсы длинными пилами режут ракушняк на блоки,
   пыль в луче, ниши-галереи уходят вглубь; через колодец ворот поднимает блоки наверх. Наверху — улица: из тех же жёлтых блоков
   каменщики кладут дом. Том — шахтёр в каске с фонарём. На «одесситы» оживают пилы, на «сложен» подсвеченный блок летит из тоннеля
   вверх по колодцу прямо в стену дома, на «ногами» — плашка «ДОМ = ДЫРА». Переход В сцену — пила распиливает кадр на блоки. */
(() => {
  EV.qu_who = wtk('s7', 'Кто');
  EV.qu_ours = wtk('s7', 'одесситы');
  EV.qu_built = wtk('s7', 'сложен');
  EV.qu_feet = wtk('s7', 'ногами.');
  KEYW.push('одесситы:', 'ногами.');
  SHAKES.push([EV.qu_ours, 0.2, 4]);

  function above(t) {                                                  // улица наверху: дом растёт из блоков, кран-ворот над колодцем
    vgrad(-900, 640, ['#6aa0d0', '#c8dcec', '#f2e8d4'], 1);
    const g = rect(-500, 600, 2100, 70, { wash: '#b8a07a', washA: 1, w: 2, col: '#3a2a14' });
    odHouse(-420, 600, 320, 300, OD.stone, t, { key: 11900 });
    const k = sm((t - S0.quarry) / (S1.quarry - S0.quarry)), hh = 120 + 200 * k;
    ctx.save(); ctx.beginPath(); ctx.rect(660, 600 - hh, 380, hh); ctx.clip(); odHouse(680, 600, 340, 320, '#ecd09a', t, { key: 11901 }); ctx.restore();
    pencil([[660, 600 - hh], [1040, 600 - hh]], { w: 4, col: '#8a6a3a', pass2: false }); for (let q = 0; q < 2; q++) human(720 + q * 180, 600 - hh + 2, 0.3, t, { body: '#e8e0cc', legs: '#5a4a3a', hair: '#4a2a1a', hat: 'cap', hatCol: '#5a4a3a', armR: Math.sin(t * 7 + q) > 0 ? 'up' : 'hold', seed: 1230 + q });
    for (const x of [380, 520]) pencil([[x, 600], [x + (x < 450 ? 40 : -40), 420]], { w: 8, col: '#5a3a1e' }); pencil([[420, 420], [480, 420]], { w: 10, col: '#5a3a1e' });
    ell(450, 420, 34, 34, { wash: '#6a4a24', washA: 1, w: 2, col: '#2a1a08' }); for (let q = 0; q < 4; q++) { const a = q / 4 * 6.283 + t * 2; pencil([[450, 420], [450 + Math.cos(a) * 60, 420 + Math.sin(a) * 60]], { w: 5, col: '#8a6a3a', pass2: false }); }
    acacia(160, 600, 200, t, 11905); acacia(1240, 600, 220, t, 11906);
  }
  function below(t) {                                                  // каменоломня: порода, пильщики, колодец
    stoneRock(-500, 880, 1600, 1500, 11910, { n: 160 });
    const gal = shape([[-300, 1480], [-300, 1080], [100, 1010], [800, 1010], [1300, 1080], [1300, 1480]], { wash: '#2a1a0c', washA: 1, w: 2.6, col: OD.rockD }); shadeG(gal.path, 0, 1010, 0, 1480, '#5a4224', 0.5);
    for (let i = 0; i < 3; i++) { const x = -200 + i * 520; const n = shape([[x, 1200], [x, 1050], [x + 90, 1010], [x + 180, 1050], [x + 180, 1200]], { wash: '#0e0804', washA: 1, w: 2, col: OD.rockD }); }
    rect(410, 880, 80, 140, { wash: '#140c06', washA: 1, w: 2, col: OD.rockD }); pencil([[450, 640], [450, 1020]], { w: 2, col: '#2a2a2a', pass2: false });
    const bw = OD.stone; for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) rect(780 + c * 92, 1380 - r * 64, 86, 58, { wash: bw, washA: 1, w: 1.8, col: OD.rockD });
    const live = t > EV.qu_ours - 0.2; for (let i = 0; i < 2; i++) { const x = 840 + i * 220, y = 1180, saw = live ? Math.sin(t * 9 + i) * 40 : 0;
      rect(x - 80, y - 10, 160, 120, { wash: OD.stoneL, washA: 1, w: 2, col: OD.rockD }); human(x - 120, y + 120, 0.6, t, { body: '#c8b090', legs: '#5a4a3a', hair: '#2a1a10', hat: 'cap', hatCol: '#5a4a3a', face: 'angry', armR: 'point', armL: 'point', seed: 1235 + i });
      pencil([[x - 110 + saw, y + 30], [x + 120 + saw, y + 30]], { w: 6, col: '#8a8a8e', pass2: false }); for (let q = 0; q < 14; q++) pencil([[x - 100 + saw + q * 16, y + 30], [x - 94 + saw + q * 16, y + 40]], { w: 2, col: '#5a5a5e', pass2: false });
      if (live) for (let q = 0; q < 6; q++) { const ph = (t * 1.5 + q / 6 + i * 0.3) % 1; ell(x + saw + (q - 3) * 20, y + 40 + ph * 120, 4 + ph * 8, 4 + ph * 8, { wash: '#f6e6bc', washA: 0.7 * (1 - ph), line: false }); } }
    glow(560, 1100, 400, 'rgba(255,200,120,1)', 0.25); for (const lx of [160, 1180]) { candle(lx, 1300, 0.6, t, lx, 1); glow(lx, 1260, 120, 'rgba(255,190,100,1)', 0.4); }
  }
  function flyBlock(t) {                                               // подсвеченный блок: из тоннеля вверх по колодцу — в стену
    if (t < EV.qu_built - 0.2) return; const k = sm((t - EV.qu_built + 0.2) / 1.0);
    const P = k < 0.5 ? [lerp(900, 450, k * 2), lerp(1180, 1010, k * 2)] : k < 0.8 ? [450, lerp(1010, 650, (k - 0.5) / 0.3)] : [lerp(450, 820, (k - 0.8) / 0.2), lerp(650, 600, (k - 0.8) / 0.2)];
    for (let q = 1; q < 6; q++) { const kk = Math.max(0, k - q * 0.03); } glow(P[0], P[1], 90, 'rgba(255,220,140,1)', 0.7);
    rect(P[0] - 40, P[1] - 28, 80, 56, { wash: '#ffe6a8', washA: 1, w: 3, col: '#8a5a10' });
  }

  WORLD.quarry = (t, u, cat) => {
    lay(6, () => { below(t); push(0, 220, 1); above(t); pop(); flyBlock(t); });
    lay(1, () => { const g = shape([[-500, 1480], [1600, 1480], [1600, 2400], [-500, 2400]], { wash: '#7a6440', washA: 1, w: 2, col: '#2a1a08', a: 0.5 }); hatch(g.path, g.bb, { gap: 12, a: 0.15, col: '#2a1a08', ang: 0.1, w: 1.2 }); cat(); });
    lay(0.7, () => motes(40, [-100, 900, 1200, 1900], '#f6e6bc', t, 11920, { sp: 10, sz: 2.6, a: 0.5, wob: 30 }));
  };
  DIR.quarry = {
    outfit: 'miner', light: { side: 1, rim: '#ffd09a' }, grade: ['#c0884a', 0.12],
    act: () => [[S0.quarry, 'suspicious'], [EV.qu_ours, 'grin'], [EV.qu_built, 'awe'], [EV.qu_feet - 0.03, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1480, s: 1.04, look: t < EV.qu_built ? [0.5, -0.1] : [0.3, -0.6], hand: t > EV.qu_feet ? [90, -400] : [120, -270], handF: t > EV.qu_built && t < EV.qu_feet ? [-60, -420] : undefined }),
    cam: () => [[S0.quarry, 560, 1060, 0.08], [EV.qu_ours, 600, 1060, 0.06], [EV.qu_built, 560, 960, 0.0], [EV.qu_feet, 560, 1000, 0.02], [S1.quarry, 560, 1000, 0.06]],
    hud: t => { if (t > EV.qu_feet) { const k = popK(t, EV.qu_feet, 0.35); push(560, 700, k, -0.03); ctx.save(); ctx.globalAlpha = 0.9 * k; ctx.fillStyle = 'rgba(16,10,8,0.86)'; ctx.fillRect(-300, -70, 600, 140); ctx.restore(); txt('ДОМ', -170, 0, 70, { font: 'Osw', col: '#ffd24a', a: k }); txt('=', 0, 0, 70, { font: 'Osw', col: '#f6e7c8', a: k }); txt('ДЫРА', 170, 0, 70, { font: 'Osw', col: '#8ac0ff', a: k }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В quarry: пила распиливает кадр на блоки
  TRANS_IN.quarry = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    drawBuf(B, 1.06 - 0.06 * sm(k)); const cw = W / 4, ch = H / 7, cut = sm(clamp(k / 0.45));
    for (let r = 0; r < 7; r++) for (let c = 0; c < 4; c++) { const d = sm(clamp((k - 0.4) * 2.2 - (r + c) * 0.05)); if (d >= 1) continue;
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(c * cw, r * ch, cw, ch); ctx.clip(); ctx.translate(0, d * d * H * 1.2); drawBuf(A); ctx.restore(); }
    scr(() => { const y = cut * H; for (let c = 1; c < 4; c++) pencil([[c * cw, 0], [c * cw, y]], { w: 4, col: '#f6e6bc', a: 0.9 * (1 - sm(k)), pass2: false }); for (let r = 1; r < 7; r++) if (r * ch < y) pencil([[0, r * ch], [W, r * ch]], { w: 4, col: '#f6e6bc', a: 0.9 * (1 - sm(k)), pass2: false });
      if (k < 0.5) { push(W / 2, y, 1); rect(-300, -14, 600, 28, { wash: '#a8a8ae', washA: 1, w: 2, col: '#2a2a2e' }); for (let q = 0; q < 30; q++) pencil([[-300 + q * 20, 14], [-292 + q * 20, 26]], { w: 3, col: '#5a5a5e', pass2: false }); pop(); } });
  } };
})();
