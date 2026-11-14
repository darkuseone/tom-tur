/* 026 — сцена `sofia`: 537, Святая София за день до освящения. Внутри: гигантский купол с кольцом из сорока окон — главный свет,
   из окон падают золотые столбы, в них пыль; паникадила-поликандилы, аркады на зелёных и порфировых колоннах, леса с рабочими,
   ворот поднимает блок, мозаичисты кладут золотую смальту. Том-зодчий (master) на настиле лесов: на «Софию» показывает вверх,
   на «пять» вставляет последний золотой кубик — панель вспыхивает, штамп «5 ЛЕТ»; на «тысячу» — лента «РЕКОРД ≈ 1000 ЛЕТ»,
   на «крупнейший» камера отъезжает и смотрит в купол. Переход В сцену — кадр собирается из золотой смальты. */
(() => {
  EV.sf_need = wtk('s3', 'храм:');
  EV.sf_sofia = wtk('s3', 'Софию');
  EV.sf_five = wtk('s3', 'пять');
  EV.sf_thou = wtk('s3', 'тысячу');
  EV.sf_big = wtk('s3', 'крупнейший');
  KEYW.push('Софию', 'пять', 'крупнейший');
  SHAKES.push([EV.sf_five + 0.1, 0.2, 6]);
  const L = IS.ink, DC = [560, 900];
  function back(t) { vgrad(-900, 2600, ['#2a1a10', '#5a3a1e', '#8a6a3a', '#4a3020'], 1); }
  function dome(t) {                                                 // купол: золотая смальта, рёбра, кольцо окон, лучи
    push(DC[0], DC[1], 1); const R = 680;
    const d = shape(ellPts(0, 0, R, R * 0.62, 0, 0, 60).filter(p => p[1] <= 30), { wash: '#b8902a', washA: 1, w: 3, col: '#3a2a10' });
    const r = rng(2800); ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, R, R * 0.62, 0, Math.PI, 0); ctx.clip(); for (let i = 0; i < 900; i++) { const a = Math.PI + r() * Math.PI, dd = Math.sqrt(r()) * R; ctx.fillStyle = r() < 0.5 ? '#e8c050' : '#c89a30'; ctx.fillRect(Math.cos(a) * dd, Math.sin(a) * dd * 0.62, 7, 7); } ctx.restore();
    for (let k = 0; k < 20; k++) { const a = Math.PI + (k + 0.5) / 20 * Math.PI; pencil([[0, -R * 0.62 + 40], [Math.cos(a) * R * 0.98, Math.sin(a) * R * 0.6]], { w: 3, col: '#7a5a1a', a: 0.6, pass2: false }); }
    ell(0, -R * 0.55, 110, 60, { wash: IS.gold, washA: 1, w: 2.4, col: '#6a4a10' }); ell(0, -R * 0.55, 70, 36, { wash: '#f6dc8a', washA: 1, w: 1.6, col: '#6a4a10' });
    for (let k = 0; k < 40; k++) { const a = Math.PI + (k + 0.5) / 40 * Math.PI, x = Math.cos(a) * R * 0.97, y = Math.sin(a) * R * 0.6 + 20; if (y > 10) continue; rect(x - 10, y - 26, 20, 34, { wash: '#fff6d8', washA: 1, w: 1.2, col: '#6a4a10' }); }
    pop();
    for (let k = 0; k < 7; k++) { const a = Math.PI * (0.18 + k * 0.11), x = DC[0] + Math.cos(Math.PI + a) * 700, y = DC[1] + Math.sin(Math.PI + a) * 420 + 30; shaft(x, y, 80, 1500, (x - DC[0]) * -0.0006 + 0.18, 'rgba(255,226,160,1)', 0.13); }
  }
  function arcades(t) {                                              // галереи: арки на зелёных и порфировых колоннах, поликандилы
    push(0, 110, 1); rect(-500, 760, 2100, 70, { wash: '#8a6a3a', washA: 1, w: 2, col: L }); rect(-500, 1230, 2100, 40, { wash: '#7a5a34', washA: 1, w: 2, col: L });
    for (let i = 0; i < 12; i++) { const x = -360 + i * 150, c = i % 3 === 1 ? '#7a2a3a' : '#3a6a5a';
      const cl = rect(x - 20, 860, 40, 370, { wash: c, washA: 1, w: 1.8, col: L }); shadeG(cl.path, x - 20, 0, x + 20, 0, '#000000', 0.35); rect(x - 30, 836, 60, 26, { wash: '#e8dcc8', washA: 1, w: 1.4, col: L });
      shape(ellPts(x + 75, 836, 55, 60, 0, 0, 14).filter(p => p[1] <= 836).concat([[x + 130, 836], [x + 20, 836]]), { wash: '#3a2410', washA: 1, w: 1.6, col: L }); }
    for (let i = 0; i < 3; i++) { const x = 60 + i * 460, y = 1010 + (i % 2) * 40; pencil([[x, 300], [x, y - 40]], { w: 2, col: '#2a1a0a', pass2: false }); ell(x, y, 120, 22, { line: true, w: 4, col: '#8a6a2a' });
      for (let q = 0; q < 12; q++) { const a = q / 12 * 6.283, lx = x + Math.cos(a) * 120, ly = y + Math.sin(a) * 22; ell(lx, ly, 6, 8, { wash: '#ffd890', washA: 1, line: false }); } glow(x, y, 160, 'rgba(255,200,120,1)', 0.22); }
    pop(); depthFog('#c8a060', 0.06);
  }
  function scaffold(t) {                                             // леса: рабочие, ворот поднимает блок, мозаичисты
    for (let i = 0; i < 7; i++) pencil([[-120 + i * 210, 1420], [-120 + i * 210, 880]], { w: 7, col: '#7a5432', pass2: false });
    for (let j = 0; j < 3; j++) { rect(-160, 1380 - j * 170, 1500, 18, { wash: '#a87a4a', washA: 1, w: 1.6, col: L }); for (let i = 0; i < 6; i++) pencil([[-120 + i * 210, 1380 - j * 170], [90 + i * 210, 1210 - j * 170]], { w: 3, col: '#7a5432', a: 0.7, pass2: false }); }
    const up = ((t - S0.sofia) * 0.12) % 1; push(940, 880, 1); ell(0, 0, 40, 40, { line: true, w: 6, col: '#5a3a1a' }); pencil([[0, 0], [0, 200 + (1 - up) * 300]], { w: 2, col: '#3a2a1a', pass2: false }); rect(-50, 200 + (1 - up) * 300, 100, 60, { wash: IS.marble, washA: 1, w: 1.8, col: L }); pop();
    const P = [[60, 1380, '#8a6a4a', 'hold', 'stick'], [320, 1210, '#6a4a3a', 'up', null], [620, 1040, '#9a7a5a', 'up', null], [780, 1380, '#7a5a3a', 'hold', 'axe'], [1080, 1210, '#8a6a4a', 'swing', null], [1200, 1040, '#6a5a4a', 'up', null], [420, 1380, '#a88a5a', 'point', null]];
    P.forEach(([x, y, c, a, pr], i) => human(x, y, 0.5, t, { body: c, legs: '#5a4a3a', hat: i % 2 ? 'scarf' : null, hatCol: '#c8b8a0', hair: '#3a2a1a', beard: 'short', armR: a, armL: a === 'up' ? 'up' : 'down', prop: pr, flip: i % 2 ? -1 : 1, seed: 2810 + i }));
    for (const [x, y] of [[320, 1210 - 210], [620, 1040 - 210], [1200, 1040 - 210]]) { const r = rng(x); for (let q = 0; q < 10; q++) rect(x - 40 + r() * 80, y - r() * 60, 8, 8, { wash: '#f0c84a', washA: 1, line: false }); }
  }
  function floor(t) {                                                // пол: мраморные плиты, вёдра смальты, свиток чертежа, панель мозаики у Тома
    rect(-500, 1420, 2100, 900, { wash: '#c8b48a', washA: 1, w: 2, col: L });
    for (let j = 0; j < 7; j++) for (let i = 0; i < 14; i++) rect(-500 + i * 150 + (j % 2) * 75, 1424 + j * 90, 148, 88, { wash: (i + j) % 3 ? '#d8c8a0' : '#9a8a6a', washA: 1, w: 1, col: '#6a5a3a' });
    for (let k = 0; k < 4; k++) lightPool(160 + k * 300, 1640 + (k % 2) * 60, 160, 50, 'rgba(255,230,170,1)', 0.35);
    push(700, 1430, 1); const pn = rect(-200, -560, 400, 520, { wash: '#b8902a', washA: 1, w: 3, col: L });   // панель мозаики: павлин в золоте (без образов)
    const r = rng(2830); ctx.save(); for (let i = 0; i < 260; i++) { ctx.fillStyle = r() < 0.6 ? '#e8c050' : '#c89a30'; ctx.fillRect(-196 + r() * 392, -556 + r() * 512, 8, 8); } ctx.restore();
    blob([[-40, -200], [-10, -300], [30, -320], [50, -280], [20, -220], [60, -140], [-20, -120]], { wash: '#1f5f8a', washA: 1, w: 2, col: L }); ell(40, -306, 16, 14, { wash: '#2a7aa0', washA: 1, w: 1.6, col: L });
    for (let q = 0; q < 9; q++) { const a = -2.6 + q * 0.28; pencil([[-20, -180], [-20 + Math.cos(a) * 170, -180 + Math.sin(a) * 170]], { w: 6, col: '#2a8a6a', pass2: false }); ell(-20 + Math.cos(a) * 170, -180 + Math.sin(a) * 170, 14, 14, { wash: IS.turq, washA: 1, w: 1.4, col: L }); }
    if (t > EV.sf_five) { const q = clamp((t - EV.sf_five) / 0.6); glow(-120, -420, 120 + q * 120, 'rgba(255,230,140,1)', 0.45 * (1 - q * 0.5)); }
    pop();
    for (const [x, y] of [[1040, 1700], [150, 1740]]) { push(x, y, 1); shape([[-40, 0], [-50, -80], [50, -80], [40, 0]], { wash: '#7a5a3a', washA: 1, w: 2, col: L }); for (let q = 0; q < 14; q++) rect(-40 + (q % 7) * 12, -96 - Math.floor(q / 7) * 10, 9, 9, { wash: q % 3 ? '#f0c84a' : '#2a8a6a', washA: 1, line: false }); pop(); }
    push(980, 1820, 1, 0.1); rect(-140, -40, 280, 80, { wash: '#efe0b8', washA: 1, w: 2, col: L }); pencil(ellPts(0, 0, 90, 30, 0, 0, 20).filter(p => p[1] <= 0), { w: 2, col: '#6a4a2a', pass2: false }); pencil([[-90, 0], [90, 0]], { w: 2, col: '#6a4a2a', pass2: false }); pop();
    castShadow(330, 1612, 120, 420, -0.1, 0.4); moodDark(DC[0], 900, 900, 1900, '#1a0e06', 0.4);
  }
  function hud(t) {
    if (t > EV.sf_five && t < EV.sf_thou + 0.2) { const q = popK(t, EV.sf_five, 0.3); push(820, 1080, q, -0.06); rect(-150, -70, 300, 140, { wash: '#8a1a14', washA: 0.95, w: 3.4, col: IS.goldL }); txt('5 ЛЕТ', 0, 4, 80, { col: IS.goldL, font: 'Osw' }); pop(); }
    if (t > EV.sf_thou - 0.05) { const q = popK(t, EV.sf_thou - 0.05, 0.35); push(560, 800, q, 0.02); rect(-300, -64, 600, 128, { wash: '#14100a', washA: 0.92, w: 3, col: IS.gold }); txt('РЕКОРД ≈ 1000 ЛЕТ', 0, -14, 54, { col: IS.goldL, font: 'Osw' }); txt('крупнейший храм мира', 0, 36, 28, { col: '#f6e7c8', font: 'Osw' }); pop(); }
  }
  function front(t) { for (const x of [-40, 1130]) { rect(x - 22, -200, 44, 2600, { wash: '#2a1a0e', washA: 1, w: 2, col: '#0a0604' }); for (let j = 0; j < 6; j++) rect(x - 40, 300 + j * 340, 80, 16, { wash: '#3a2412', washA: 1, w: 1.6, col: '#0a0604' }); }
    pencil(spline([[900, -200], [930, 400], [910, 900]], false, 10), { w: 4, col: '#2a1a0e', pass2: false }); }
  WORLD.sofia = (t, u, cat) => {
    lay(40, () => back(t));
    lay(14, () => dome(t));
    lay(6, () => arcades(t));
    lay(2.8, () => scaffold(t));
    lay(1, () => { floor(t); cat(); });
    lay(0.6, () => front(t));
    lay(3, () => motes(60, [100, 300, 1100, 1600], '#ffe8b0', t, 2840, { sp: 3, sz: 2.4, a: 0.55, wob: 14, add: 1 }));
    lay(0.85, () => motes(10, [-200, 600, 1300, 1800], '#ffe0a0', t, 2841, { sp: 6, sz: 6, a: 0.16, wob: 30, add: 1 }));
  };
  DIR.sofia = {
    outfit: 'master', light: { side: 1, rim: '#ffe0a0' }, grade: ['#c8902a', 0.08],
    act: () => [[S0.sofia, 'talk'], [EV.sf_sofia, 'awe'], [EV.sf_five, 'proud'], [EV.sf_thou, 'grin'], [EV.sf_big, 'awe']],
    pose: (t, u, b) => { const ins = t > EV.sf_five - 0.25 && t < EV.sf_five + 0.25, ik = clamp((t - EV.sf_five + 0.25) / 0.25);
      return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.sf_sofia && t < EV.sf_five - 0.3 || t > EV.sf_big ? [0.3, -0.95] : [0.7, -0.3], prop: 'chisel', propAng: -0.6,
        hand: t > EV.sf_sofia && t < EV.sf_five - 0.3 ? [120, -480] : ins ? [lerp(200, 300, ik), lerp(-380, -560, ik)] : [180, -320], squash: ins && ik > 0.95 ? 0.08 : b.squash, tailUp: t > EV.sf_five }); },
    cam: () => [[S0.sofia, 560, 1100, 0.1], [EV.sf_sofia, 560, 900, 0.0], [EV.sf_five, 600, 1080, 0.16, 'x'], [EV.sf_thou, 560, 980, 0.04], [EV.sf_big, 560, 900, -0.12, 'x'], [S1.sofia, 560, 880, -0.16]],
    hud
  };
  TRANS_IN.sofia = { a: 0.12, b: 0.42, fx(k, t, A, B) {             // смальта: квадраты переворачиваются от центра, золото на рёбрах
    drawBuf(A); const N = 12, cw = W / N, rh = H / Math.round(H / cw), rows = Math.round(H / cw);
    scr(() => { for (let j = 0; j < rows; j++) for (let i = 0; i < N; i++) { const x = i * cw, y = j * rh, d = Math.hypot(x + cw / 2 - 540, y + rh / 2 - 960) / 1100, q = clamp((k * 1.6 - d * 0.6) / 0.4);
      if (q <= 0) continue; const sx = Math.abs(Math.cos(q * Math.PI)); ctx.save(); ctx.beginPath(); ctx.rect(x + cw / 2 * (1 - sx), y, cw * sx, rh); ctx.clip(); ctx.drawImage(q > 0.5 ? B : A, 0, 0); ctx.restore();
      if (q < 1) { ctx.strokeStyle = '#e8c050'; ctx.lineWidth = 3; ctx.strokeRect(x + cw / 2 * (1 - sx), y, cw * sx, rh); } } });
  } };
})();
