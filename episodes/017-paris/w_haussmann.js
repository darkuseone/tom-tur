/* 017 — сцена `haussmann`: 1853–1870. Слева средневековые фахверковые дома рушатся (обломки, пыль, рабочие с кирками), справа
   по линейке вырастают одинаковые кремовые османовские фасады с балконами и цинковыми крышами; посередине прорезается бульвар
   с фонарями и платанами, омнибус на конной тяге. На «сносит» — дома проваливаются, на «открыток» кадр «застывает» в рамку-
   открытку «PARIS» с маркой. Том — сюртук и цилиндр. Переход — стена рушится сверху вниз. */
(() => {
  EV.ha_dem = wtk('s4', 'сносит');
  EV.ha_card = wtk('s4', 'открыток');
  KEYW.push('сносит', 'тысяч', 'открыток');
  const dem = t => sm((t - EV.ha_dem) / 0.9), grow = t => sm((t - EV.ha_dem - 0.3) / 1.4);

  function sky(t) { vgrad(-900, 1000, ['#6a9ad0', '#b8d4e8', '#f4ead4'], 1); for (let i = 0; i < 3; i++) { const x = ((i * 600 + t * 12) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 56, 210 + i * 90 + Math.sin(k) * 10, 76, 24, { wash: '#fbf8f0', washA: 0.85, line: false }); } }
  function street(t) {
    const d = dem(t), g = grow(t);
    for (let k = 0; k < 3; k++) { const x = -520 + k * 190, h = 280 - d * 220 * (1 - k * 0.1); if (h > 30) oldHouse(x, 1100, 170, h, t, { col: ['#e8dcc0', '#d8c8a8', '#e0d0b0'][k] }); }
    if (d > 0) for (let i = 0; i < 12; i++) rect(-500 + i * 50, 1090 - (i % 3) * 14, 46, 24, { wash: '#b8a888', washA: 1, w: 1.4, col: '#4a3a24' });
    for (let k = 0; k < 3; k++) { const x = 760 + k * 260; ctx.save(); ctx.beginPath(); ctx.rect(x - 20, 1100 - 420 * g - 120, 300, 420 * g + 130); ctx.clip(); facade(x, 1100, 240, 380, t); ctx.restore(); if (g < 1) { for (const lx of [x, x + 120, x + 240]) pencil([[lx, 1100], [lx, 1100 - 420 * g - 40]], { w: 4, col: '#8a6a3a', pass2: false }); } }
    rect(-600, 1100, 2300, 160, { wash: '#8a8478', washA: 1, w: 2, col: '#3a3630' });
    for (const x of [100, 520, 940, 1360]) { pencil([[x, 1260], [x, 1000]], { w: 8, col: '#5a4a3a' }); for (let q = 0; q < 4; q++) ell(x - 40 + q * 26, 960 - (q % 2) * 24, 40, 32, { wash: '#5a8a4a', washA: 1, w: 1.6, col: '#2a4a1a' }); }
    const ox = 1500 - ((t - S0.haussmann) * 160) % 2200; push(ox, 1250, 0.55); rect(-160, -200, 320, 150, { wash: '#c8a040', washA: 1, w: 2.4, col: '#3a2a08' }); for (let q = 0; q < 4; q++) rect(-140 + q * 74, -180, 54, 50, { wash: '#a8c8d8', washA: 1, w: 1.4, col: '#2a2a2a' }); for (const wx of [-100, 100]) ell(wx, -40, 44, 44, { wash: '#4a2e1a', washA: 1, w: 2, col: '#000' }); blob([[-320, -150], [-300, -220], [-220, -230], [-200, -150]], { wash: '#7a5a3a', washA: 1, w: 2, col: '#2a1408' }); for (const lx of [-300, -230]) pencil([[lx, -150], [lx + Math.sin(t * 6 + lx) * 10, -50]], { w: 8, col: '#5a3a1e' }); pop();
    for (let i = 0; i < 2; i++) human(-200 + i * 140, 1300, 0.46, t, { body: '#5a4a3a', legs: '#3a3a3a', hair: '#3a2210', hat: 'cap', hatCol: '#3a2a1a', face: 'calm', armR: Math.sin(t * 7 + i) > 0 ? 'up' : 'point', armL: 'hold', prop: 'axe', seed: 17510 + i });
  }

  WORLD.haussmann = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(5, () => street(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#a89a84', washA: 1, w: 2, col: '#4a4030', a: 0.4 }); ctx.save(); ctx.clip(g.path); for (let x = -480; x < 1600; x += 70) for (let y = 1470; y < 2400; y += 46) rect(x + (Math.floor(y / 46) % 2) * 35, y, 68, 44, { wash: '#9a8c76', washA: 0.6, w: 1, col: '#5a4c38', a: 0.4 }); ctx.restore(); cat(); });
    lay(0.7, () => { if (dem(t) > 0 && dem(t) < 1) motes(40, [-400, 800, 500, 1200], '#d8ccb0', t, 17520, { sp: -20, sz: 5, a: 0.5, wob: 30 }); });
  };
  DIR.haussmann = {
    outfit: 'victorian', light: { side: 1, rim: '#fff0d0' }, grade: ['#c0a880', 0.06],
    act: () => [[S0.haussmann, 'talk'], [EV.ha_dem, 'shock'], [EV.ha_card, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 280, y: 1480, s: 1.0, look: [0.6, -0.3], point: t > EV.ha_card ? 1 : undefined, hand: t > EV.ha_card ? [200, -330] : [120, -270] }),
    cam: () => [[S0.haussmann, 560, 1060, 0.04], [EV.ha_dem, 520, 1080, 0.06], [EV.ha_card, 600, 1040, 0.04], [S1.haussmann, 600, 1040, 0.06]],
    hud: t => { if (t > EV.ha_dem && t < EV.ha_card) { const k = popK(t, EV.ha_dem, 0.35); push(600, 760, k, -0.03); rect(-210, -56, 420, 112, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('≈ 20 000 ДОМОВ', 0, -8, 38, { font: 'Osw', col: '#a8201e' }); txt('снесено за 17 лет', 0, 34, 24, { col: '#2a1a10' }); pop(); }
      if (t > EV.ha_card) { const k = popK(t, EV.ha_card, 0.35); scr(() => { ctx.save(); ctx.globalAlpha = k; ctx.strokeStyle = '#f6f0e2'; ctx.lineWidth = 60; ctx.strokeRect(70, 300, 940, 1300); ctx.restore(); }); push(780, 680, k, 0.08); rect(-90, -110, 180, 220, { wash: '#f6f0e2', washA: 1, w: 3, col: '#3a5aa8' }); txt('PARIS', 0, -20, 44, { font: 'Osw', col: '#3a5aa8' }); txt('1870', 0, 40, 30, { font: 'Osw', col: '#a8201e' }); pop(); } }
  };
  TRANS_IN.haussmann = { a: 0.3, b: 0.45, fx(k, t, A, B) {           // стена рушится блоками сверху вниз
    drawBuf(B, 1.04 - 0.04 * sm(k)); const r = rng(17530), N = 6, M = 10, cw = W / N, ch = H / M;
    for (let i = 0; i < N; i++) for (let j = 0; j < M; j++) { const d = sm(clamp((k - (M - 1 - j) * 0.04 - r() * 0.15) / 0.5)); if (d >= 1) continue; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(0, d * d * 1400); ctx.beginPath(); ctx.rect(i * cw, j * ch, cw + 1, ch + 1); ctx.clip(); drawBuf(A); ctx.restore(); }
  } };
})();
