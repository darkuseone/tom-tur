/* 004 — сцена `gangnam`: 1960-е → 2012. Южный берег Хана: цветущий грушевый сад, залитые рисовые чеки, крестьянин с волом пашет,
   за рекой — Намсан и низкий город 60-х. Том-крестьянин в соломенной шляпе с грушей. На «А потом» — таймлапс: из грядок вырастают
   башни Гангнама, небо темнеет, загорается неон, Том «пуф» — в голубом смокинге и тёмных очках, танцует «лошадку».
   На «миллиард» — счётчик просмотров докручивается до 1 000 000 000. Переход В сцену — фары такси бьют в камеру. */
(() => {
  EV.gn_pear = wtk('s10', 'груши');
  EV.gn_then = wtk('s10', 'потом');
  EV.gn_clip = wtk('s10', 'клип');
  EV.gn_bil = wtk('s10', 'миллиард');
  KEYW.push('груши', 'рис.', 'миллиард');
  SHAKES.push([EV.gn_then + 0.1, 0.25, 5]);
  const city = t => sm((t - EV.gn_then + 0.05) / 0.9);                // 0 — 1960-е, 1 — Гангнам 2012
  const dusk = t => sm((t - EV.gn_then - 0.3) / 0.8);
  const TOWERS = [[-120, 150, 820, '#5a6a8a'], [60, 130, 640, '#7a8aa0'], [200, 170, 980, '#3a4a6a'], [390, 120, 560, '#6a7a8a'], [520, 150, 1050, '#2a3a5a'], [690, 140, 760, '#5a5a7a'], [840, 170, 900, '#3a4a5a'], [1020, 140, 700, '#6a6a8a'], [1160, 160, 860, '#4a5a7a']];

  function sky(t) { const d = dusk(t); vgrad(-900, 1100, [lerpC('#7ab4e0', '#1a1840', d), lerpC('#bcdaf0', '#5a2a6a', d), lerpC('#f6ead8', '#e8705a', d)], 1);
    if (d < 0.6) for (let i = 0; i < 4; i++) { const x = ((i * 410 + t * 18) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 46, 120 + i * 80 + Math.sin(k) * 10, 60, 26, { wash: '#fbf8f2', washA: 0.85 * (1 - d / 0.6), line: false }); }
    glow(860, 260, 300, d > 0.5 ? 'rgba(255,140,120,1)' : 'rgba(255,250,220,1)', 0.4); }
  function farBank(t) {                                                // северный берег: Намсан, низкий город 60-х; позже — Сеульская башня огнями
    const d = dusk(t);
    sil([[-400, 980], [-100, 900], [200, 860], [380, 700], [470, 660], [560, 700], [700, 820], [900, 880], [1200, 900], [1480, 960], [1480, 1100], [-400, 1100]], lerpC('#6a8a6a', '#1e2236', d), 1);
    pencil([[470, 660], [470, 560]], { w: 8, col: d > 0.4 ? '#e8e0f0' : '#7a8a7a', a: city(t), pass2: false }); if (city(t) > 0.5) { ell(470, 600, 18, 10, { wash: '#e8e0f0', washA: 1, w: 1.4, col: '#2a2a3a' }); glow(470, 580, 80, 'rgba(255,120,160,1)', 0.5 * d); }
    const r = rng(9990); for (let i = 0; i < 40; i++) { const x = -300 + r() * 1700, h = 10 + r() * 30 + city(t) * r() * 140; rect(x, 1000 - h, 20 + r() * 30, h, { wash: lerpC('#a89a8a', '#2a2a40', d), washA: 1, w: 1, col: '#3a3a3a', a: 0.4 }); if (d > 0.3) windows(x, 1000 - h, 30, h, 2, Math.max(1, Math.round(h / 16)), 9991 + i, 0.5 * d, '#ffd98a', '#9fd8ff', 0.8); }
    const rv = shape([[-400, 1000], [1480, 1000], [1480, 1090], [-400, 1090]], { wash: lerpC('#7ab0d0', '#1a2a4a', d), washA: 1, w: 1, col: '#000', a: 0.2 }); for (let k = 0; k < 6; k++) pencil([[-400, 1010 + k * 14], [1480, 1012 + k * 14]], { w: 1.4, col: '#e8f4ff', a: 0.3 * (1 - d), pass2: false });
    if (city(t) > 0.3) { pencil([[-400, 1040], [1480, 1040]], { w: 8, col: '#3a3a44', a: city(t), pass2: false }); for (let x = -380; x < 1480; x += 90) pencil([[x, 1040], [x, 1090]], { w: 5, col: '#3a3a44', a: city(t), pass2: false }); }
  }
  function orchard(t) {                                                // грушевый сад + рисовые чеки + вол с плугом; уходят вниз, когда растёт город
    const c = city(t); if (c >= 1) return; push(0, c * 500, 1);
    const pd = shape([[-400, 1100], [1480, 1100], [1480, 1500], [-400, 1500]], { wash: '#8ab0a0', washA: 1, w: 1, col: '#000', a: 0.2 });
    ctx.save(); ctx.clip(pd.path); for (let k = 0; k < 10; k++) pencil([[-400, 1110 + k * 40], [1480, 1120 + k * 40]], { w: 3, col: '#5a7a5a', a: 0.6, pass2: false }); for (let k = 0; k < 12; k++) pencil([[-300 + k * 160, 1100], [-500 + k * 200, 1500]], { w: 3, col: '#5a7a5a', a: 0.5, pass2: false });
    const r = rng(10001); for (let i = 0; i < 120; i++) { const x = -350 + r() * 1800, y = 1110 + r() * 380; pencil([[x, y], [x + 3, y - 14]], { w: 2, col: '#4a8a3a', a: 0.8, pass2: false }); } ctx.restore();
    for (const [x, y, s] of [[300, 1110, 0.7], [560, 1105, 0.65], [820, 1110, 0.7], [-120, 1180, 1.15], [120, 1150, 1.0], [1000, 1150, 1.0], [1220, 1190, 1.2], [-60, 1300, 1.3]]) pearTree(x, y, s, t);
    // вол и пахарь
    const ox = 960 + Math.sin(t * 0.5) * 20; push(ox, 1330, 0.9); const ob = blob([[-120, -40], [-110, -120], [60, -130], [110, -90], [110, -40]], { wash: '#8a5a32', washA: 1, w: 2.2, col: '#2a1408' });
    for (const lx of [-90, -50, 50, 90]) pencil([[lx, -40], [lx + Math.sin(t * 4 + lx) * 6, 20]], { w: 12, col: '#6a4224' }); ell(130, -100, 34, 26, { wash: '#8a5a32', washA: 1, w: 2, col: '#2a1408' }); for (const sd of [-1, 1]) pencil([[124, -120], [124 + sd * 30, -150]], { w: 5, col: '#e8e0cc', pass2: false });
    pencil([[-110, -60], [-220, -20]], { w: 4, col: '#4a2a14', pass2: false }); pop();
    human(ox - 250, 1340, 0.7, t, { body: '#e8e0cc', legs: '#d6cdb6', hat: 'straw', armR: 'hold', armL: 'hold', seed: 140, flip: 1 });
    pop();
  }
  function pearTree(x, y, s, t) {
    push(x, y, s); shape(tubeP(spline([[0, 0], [10, -120], [-10, -220]], false, 6), 30, 14), { wash: '#5a3a24', washA: 1, w: 2, col: '#1a0a04' });
    for (const [bx, by, d] of [[-10, -200, -1], [6, -160, 1], [-4, -120, -1]]) pencil([[bx, by], [bx + d * 120, by - 70]], { w: 7, col: '#5a3a24' });
    const r = rng(10010 + Math.round(x)); for (let i = 0; i < 46; i++) { const a = r() * 6.283, d = r() * 150; ell(Math.cos(a) * d * 1.2, -240 + Math.sin(a) * d * 0.6, 22 + r() * 16, 18 + r() * 12, { wash: r() < 0.7 ? '#fbf6f0' : '#f6dce4', washA: 0.95, w: 1, col: '#c8b8b8', a: 0.4 }); }
    for (let i = 0; i < 5; i++) ell(-80 + i * 40, -170 + (i % 2) * 30, 9, 11, { wash: '#d8c86a', washA: 1, w: 1, col: '#6a5a1a' });
    pop();
  }
  function towers(t) {                                                 // небоскрёбы вырастают из полей
    const c = city(t), d = dusk(t); if (c <= 0) return;
    TOWERS.forEach(([x, w, h, col], i) => { const k = sm(clamp(c * 1.6 - i * 0.07)); if (k <= 0) return; const hh = h * k, base = 1460;
      const tp = rect(x, base - hh, w, hh, { wash: lerpC(col, '#1a1a2e', d * 0.5), washA: 1, w: 2.2, col: '#0a0a14', key: 10020 + i }); const g = ctx.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, 'rgba(255,255,255,0.25)'); g.addColorStop(0.4, 'rgba(255,255,255,0)'); ctx.save(); ctx.clip(tp.path); ctx.fillStyle = g; ctx.fillRect(x, base - hh, w, hh); ctx.restore();
      ctx.save(); ctx.clip(tp.path); for (let y = base - hh + 12; y < base; y += 22) pencil([[x, y], [x + w, y]], { w: 1.2, col: '#c8d8ff', a: 0.35, pass2: false, gap: false }); ctx.restore();
      if (d > 0.2) windows(x + 6, base - hh + 10, w - 12, hh - 20, Math.round(w / 22), Math.round(hh / 26), 10030 + i, 0.6 * d, '#ffe0a0', '#a8e0ff', 0.85);
      if (k > 0.95 && i % 2 === 0) { const sy = base - hh + 60; neon(x + w / 2, sy, w * 0.8, 46, ['GANGNAM', '강남', 'K-POP', '카페', '코엑스'][i % 5], ['#ff5aa8', '#5ae8ff', '#ffd24a', '#c88aff', '#7aff8a'][i % 5], t, d, { size: i % 4 === 0 ? 0.5 : 0.62, font: i % 4 === 0 ? 'Osw' : 'KSign' }); }
      if (k < 1) for (let q = 0; q < 4; q++) ell(x + w * (0.2 + q * 0.2), base - hh, 14, 8, { wash: '#d8d0c0', washA: 0.6, line: false }); });
    if (d > 0.5) { for (let k = 0; k < 6; k++) { const a = -1.9 + k * 0.15 + Math.sin(t * 2 + k) * 0.2; ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(540, 1460, 540 + Math.cos(a) * 1400, 1460 + Math.sin(a) * 1400); g.addColorStop(0, `rgba(${k % 2 ? '255,90,170' : '90,220,255'},0.35)`); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(540, 1460); ctx.lineTo(540 + Math.cos(a - 0.03) * 1400, 1460 + Math.sin(a - 0.03) * 1400); ctx.lineTo(540 + Math.cos(a + 0.03) * 1400, 1460 + Math.sin(a + 0.03) * 1400); ctx.fill(); ctx.restore(); } }
  }
  function stage(t) {                                                  // передний план: дорожка поля → сцена с подсветкой
    const c = city(t), d = dusk(t);
    const g = shape([[-400, 1440], [1480, 1440], [1480, 2400], [-400, 2400]], { wash: lerpC('#8a7a4a', '#1a1a26', c), washA: 1, w: 1, col: '#000', a: 0.2 });
    if (c < 0.5) { const r = rng(10040); for (let i = 0; i < 30; i++) { const x = -200 + r() * 1500, y = 1460 + r() * 400; pencil([[x, y], [x + 4, y - 16]], { w: 2, col: '#5a7a3a', a: 0.7 * (1 - c * 2), pass2: false }); } }
    if (c > 0.3) { ctx.save(); ctx.clip(g.path); for (let k = -10; k <= 10; k++) pencil([[540 + k * 70, 1440], [540 + k * 260, 2400]], { w: 2, col: '#5a4a8a', a: 0.6 * c, pass2: false, gap: false }); glow(540, 1520, 520, 'rgba(255,120,200,1)', 0.35 * d); glow(300, 1600, 300, 'rgba(90,220,255,1)', 0.25 * d); ctx.restore(); }
    if (t < EV.gn_then + 0.1) { ell(140, 1470, 60, 40, { wash: '#c8a868', washA: 1, w: 2, col: '#5a3a1a' }); for (let q = 0; q < 6; q++) ell(110 + q * 12, 1446 - (q % 2) * 10, 12, 14, { wash: '#d8c86a', washA: 1, w: 1, col: '#6a5a1a' }); }
  }

  WORLD.gangnam = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(9, () => farBank(t));
    lay(3.5, () => { orchard(t); towers(t); });
    lay(1, () => { stage(t); cat(); puffK(560, 1180, 1.2, t, EV.gn_then + 0.05, 0.5, 10050, '#f8f0ff'); });
    lay(0.7, () => { if (city(t) < 0.6) { const r = rng(10060); for (let i = 0; i < 24; i++) { const x = (r() * 1400 + t * 60 * (0.5 + r())) % 1400 - 160, y = (r() * 2000 + t * 80) % 2000; ell(x, y, 6, 4, { wash: '#fbeef2', washA: 0.85 * (1 - city(t)), line: false, rot: t + i }); } } });
  };
  DIR.gangnam = {
    outfit: 'nongbu', light: { side: 1, rim: '#fff0d8' }, grade: ['#e0b070', 0.08],
    act: () => [[S0.gangnam, 'laugh'], [EV.gn_pear, 'grin'], [EV.gn_then - 0.04, 'shock'], [EV.gn_clip, 'smug'], [EV.gn_bil, 'grin']],
    pose: (t, u, b) => { const tx = t > EV.gn_then + 0.1; const ph = (t - EV.gn_clip) * 7, bounce = tx && t > EV.gn_clip ? Math.abs(Math.sin(ph)) * 22 : 0;
      return Object.assign(b, { outfit: tx ? 'tux' : 'nongbu', x: 540 + (tx && t > EV.gn_clip ? Math.sin(ph * 0.5) * 30 : 0), y: 1480 - bounce, s: 1.06, look: tx ? [0, 0.1] : [0.4, -0.2],
        hand: tx ? (t > EV.gn_clip ? [40 + Math.sin(ph) * 10, -250] : [80, -330]) : [110, -260], handF: tx && t > EV.gn_clip ? [-30 + Math.sin(ph) * 10, -260] : undefined,
        walk: tx && t > EV.gn_clip ? ph : undefined, squash: b.squash + (bounce > 18 ? 0.04 : 0), noBlink: tx }); },
    afterCat: (t, u, P) => { if (t < EV.gn_then + 0.1) { const h = P.hand, x = P.x + h[0] * P.s, y = P.y + h[1] * P.s - 30; const pr = blob([[x - 26, y + 30], [x - 30, y - 6], [x - 14, y - 34], [x, y - 44], [x + 14, y - 34], [x + 30, y - 6], [x + 26, y + 30]], { wash: '#e0cc66', washA: 1, w: 2, col: '#5a4a10' }); shadeG(pr.path, x + 30, 0, x - 20, 0, '#a8902a', 0.5); pencil([[x, y - 44], [x + 4, y - 64]], { w: 4, col: '#5a3a1a', pass2: false }); ell(x + 14, y - 58, 12, 6, { wash: '#4a8a3a', washA: 1, w: 1, col: '#1a3a1a', rot: -0.4 }); if (t > EV.gn_pear + 0.2) ell(x + 22, y - 6, 10, 14, { wash: '#f6f0d8', washA: 1, w: 1.4, col: '#5a4a10' }); } },
    cam: () => [[S0.gangnam, 560, 960, 0.08], [EV.gn_pear, 560, 1000, 0.1], [EV.gn_then, 560, 900, 0.0], [EV.gn_then + 0.8, 560, 880, -0.04, 'x'], [EV.gn_bil, 560, 960, 0.06], [S1.gangnam, 560, 980, 0.1]],
    hud: t => { if (t > EV.gn_then - 0.1 && t < EV.gn_clip + 0.3) { const y = Math.round(lerp(1965, 2012, city(t))); push(540, 470, 1); ctx.save(); ctx.globalAlpha = 0.85; ctx.fillStyle = 'rgba(16,10,8,0.85)'; ctx.fillRect(-140, -54, 280, 108); ctx.restore(); txt(String(y), 0, 0, 78, { font: 'Osw', col: '#f6e7c8' }); pop(); }
      if (t > EV.gn_clip) { const k = popK(t, EV.gn_clip, 0.35), n = Math.round(1e9 * sm(clamp((t - EV.gn_clip) / (EV.gn_bil - EV.gn_clip + 0.6)))); const sN = n.toLocaleString('ru-RU').replace(/ /g, ' ');
        push(540, 500, 0.6 + 0.4 * k); ctx.save(); ctx.fillStyle = 'rgba(16,10,8,0.88)'; ctx.fillRect(-420, -80, 840, 160); ctx.restore(); ell(-340, 0, 50, 50, { wash: '#f6f2ea', washA: 1, w: 3, col: '#1a1410' }); poly([[-356, -26], [-356, 26], [-314, 0]], { wash: '#d8302a', washA: 1, w: 2, col: '#3a0a0a' });
        txt(sN, 40, -12, 76, { font: 'Osw', col: n >= 1e9 ? '#ffd24a' : '#f6e7c8' }); txt('просмотров', 40, 52, 34, { font: 'Osw', col: '#e8a33c' }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В gangnam: фары такси бьют в камеру
  TRANS_IN.gangnam = { a: 0.3, b: 0.3, fx(k, t, A, B) {
    if (k < 0.5) drawBuf(A, 1 + k * 0.3); else drawBuf(B, 1.15 - (k - 0.5) * 0.3);
    scr(() => { const f = Math.sin(k * Math.PI), sp = 120 + 520 * sm(k); for (const sd of [-1, 1]) { glow(540 + sd * sp, 1100, 200 + 900 * f, 'rgba(255,248,220,1)', 0.95 * f); ell(540 + sd * sp, 1100, 60 + 200 * f, 40 + 140 * f, { wash: '#fffbe8', washA: f, line: false }); }
      ctx.save(); ctx.globalAlpha = clamp(f * 1.3 - 0.3); ctx.fillStyle = '#fffaf0'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
  } };
})();
