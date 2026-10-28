/* 004 — сцена `curfew`: 1970-е, ночь, улица Чонно. Бетонные дома с вертикальными вывесками (다방, 약국, 극장 с рисованной афишей),
   натриевые фонари, уличные часы 23:59 → 00:00, уходит последний автобус, такси. На «Полночь» — сирена и красная мигалка, патрульные
   свистят и тянут барьер, прохожие бегут; Том в сером костюме с портфелем бежит и замирает в луче фонаря. На «Отменили» — в кадр влетает
   газета «통금 해제! 1982», улица зажигается, на «Олимпиады» — салют и «СЕУЛ 1988». Переход В сцену — красно-синяя шторка мигалки. */
(() => {
  EV.cf_mid = LS('s9');
  EV.cf_siren = wtk('s9', 'сирена,');
  EV.cf_whistle = wtk('s9', 'свистки!');
  EV.cf_lift = wtk('s9', 'Отменили');
  EV.cf_olymp = wtk('s9', 'Олимпиады!');
  SHAKES.push([EV.cf_siren, 0.25, 6], [EV.cf_lift + 0.1, 0.3, 8]);
  KEYW.push('Полночь', 'Олимпиады!');
  const free = t => sm((t - EV.cf_lift - 0.1) / 0.5);

  function sky(t) { vgrad(-900, 1100, ['#06070f', '#121630', '#2a2440'], 1); const r = rng(9960); for (let i = 0; i < 40; i++) ell(-300 + r() * 1700, -700 + r() * 1000, 1.6, 1.6, { wash: '#fff6e0', washA: 0.5 * r(), line: false });
    if (t > EV.cf_olymp - 0.2) for (let q = 0; q < 5; q++) { const ph = ((t - EV.cf_olymp + 0.2) * 0.8 + q * 0.2) % 1, x = 100 + q * 220, y = 300 - ph * 260; for (let n = 0; n < 14; n++) { const a = n / 14 * 6.283; pencil([[x + Math.cos(a) * ph * 40, y + Math.sin(a) * ph * 40], [x + Math.cos(a) * ph * 140, y + Math.sin(a) * ph * 140]], { w: 4, col: ['#ff5a5a', '#ffd24a', '#5ad8ff', '#7aff8a', '#ffffff'][q], a: 1 - ph, pass2: false }); } glow(x, y, 160 * ph, 'rgba(255,230,180,1)', 0.3 * (1 - ph)); } }
  function street(t) {                                                 // дома 70-х: бетон, плитка, вывески, окна гаснут/зажигаются
    const fr = free(t), lightsOn = t < EV.cf_mid + 0.2 ? 1 : fr;
    const B = [[-260, 320, 620, '#7a7268'], [70, 230, 520, '#8a7a6a'], [300, 260, 700, '#6a6a70'], [560, 300, 560, '#8a8478'], [860, 240, 660, '#746a62'], [1100, 300, 600, '#6a625c']];
    B.forEach(([x, w, h, c], i) => { const base = 1260, fp = rect(x, base - h, w, h, { wash: c, washA: 1, w: 2, col: '#1a1814', key: 9961 + i }); hatch(fp.path, fp.bb, { gap: 7, a: 0.14, col: '#2a2420', ang: 1.45, w: 1 });
      for (let y = base - h + 20; y < base - 120; y += 90) { pencil([[x, y + 70], [x + w, y + 70]], { w: 3, col: '#4a4440', a: 0.6, pass2: false }); for (let wx = x + 20; wx < x + w - 50; wx += 70) { const on_ = rng(9970 + i * 50 + wx + y)() < 0.55 && lightsOn > 0.5; rect(wx, y, 46, 54, { wash: on_ ? '#f6c46a' : '#22242c', washA: 1, w: 1.4, col: '#141210' }); if (on_) glow(wx + 23, y + 27, 40, 'rgba(255,200,110,1)', 0.35); pencil([[wx + 23, y], [wx + 23, y + 54]], { w: 1.4, col: '#141210', a: 0.6, pass2: false }); } }
      rect(x + 10, base - 110, w - 20, 110, { wash: '#2a2420', washA: 1, w: 1.6, col: '#000' }); if (lightsOn > 0.5) glow(x + w / 2, base - 50, w * 0.6, 'rgba(255,190,110,1)', 0.3); });
    const S = [[120, 760, '다방', '#d83a2a'], [420, 700, '약국', '#2a8a4a'], [700, 760, '양복점', '#2a5aa8'], [980, 700, '여관', '#c8302a']];
    S.forEach(([x, y, s1, c]) => { rect(x - 34, y - 130, 68, 260, { wash: '#f2ece0', washA: 1, w: 2, col: '#1a1410' }); [...s1].forEach((ch, i) => txt(ch, x, y - 90 + i * 76, 60, { font: 'KSign', col: c, bold: false })); if (lightsOn > 0.5) glow(x, y, 160, 'rgba(255,240,210,1)', 0.25); });
    // кинотеатр с рисованной афишей
    const cx = 560, cy = 920; rect(cx - 170, cy - 110, 340, 190, { wash: '#e8d8b0', washA: 1, w: 2.4, col: '#1a1410' }); ctx.save(); ctx.beginPath(); ctx.rect(cx - 166, cy - 106, 332, 182); ctx.clip(); const pg = ctx.createLinearGradient(0, cy - 110, 0, cy + 80); pg.addColorStop(0, '#e86a3a'); pg.addColorStop(1, '#5a1a3a'); ctx.fillStyle = pg; ctx.fillRect(cx - 170, cy - 110, 340, 190); human(cx - 70, cy + 230, 0.9, t, { body: '#2a2a3a', hair: '#1a1410', face: 'calm', armR: 'hold', seed: 131, look: 0.4 }); human(cx + 80, cy + 240, 0.85, t, { body: '#c83a5a', hair: '#1a1410', hat: 'bun', face: 'smile', armR: 'hold', seed: 132, flip: -1, look: -0.4 }); ctx.restore(); txt('밤의 서울', cx, cy + 50, 34, { font: 'KSign', col: '#ffe8a0', bold: false });
    txt('극장', cx, cy - 140, 50, { font: 'KSign', col: '#c8302a', bold: false });
    // уличные часы
    const kx = 260, ky = 1000; pencil([[kx, 1260], [kx, ky + 60]], { w: 10, col: '#2a2a30' }); const ck = ell(kx, ky, 60, 60, { wash: '#f6f2e6', washA: 1, w: 4, col: '#1a1a1a' }); glow(kx, ky, 120, 'rgba(255,250,220,1)', 0.25);
    const mm = t < EV.cf_mid ? 59 : 0, hh = t < EV.cf_mid ? 11 : 12; const ma = mm / 60 * 6.283 - Math.PI / 2, ha = (hh % 12 + mm / 60) / 12 * 6.283 - Math.PI / 2;
    pencil([[kx, ky], [kx + Math.cos(ha) * 32, ky + Math.sin(ha) * 32]], { w: 6, col: '#1a1a1a', pass2: false }); pencil([[kx, ky], [kx + Math.cos(ma) * 48, ky + Math.sin(ma) * 48]], { w: 4, col: '#1a1a1a', pass2: false });
    for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283; pencil([[kx + Math.cos(a) * 50, ky + Math.sin(a) * 50], [kx + Math.cos(a) * 56, ky + Math.sin(a) * 56]], { w: 3, col: '#1a1a1a', pass2: false, gap: false }); }
    // фонари
    for (const x of [-60, 380, 760, 1140]) { pencil([[x, 1270], [x, 880]], { w: 8, col: '#1a1a20' }); pencil([[x, 880], [x + 50, 870]], { w: 6, col: '#1a1a20' }); ell(x + 56, 878, 18, 10, { wash: '#ffb050', washA: 1, w: 1.4, col: '#000' }); glow(x + 56, 900, 220, 'rgba(255,160,70,1)', 0.45); }
  }
  function roadLife(t) {                                               // автобус уезжает, такси, бегущие люди, патруль с барьером
    const bk = clamp((t - S0.curfew) / 1.6), bx = lerp(700, 1500, bk * bk);
    push(bx, 1330, 0.9); const bb = rect(-260, -200, 520, 190, { wash: '#2a7a5a', washA: 1, w: 3, col: '#0a1a10' }); rect(-260, -120, 520, 40, { wash: '#e8e0cc', washA: 1, line: false });
    for (let k = 0; k < 6; k++) rect(-240 + k * 82, -186, 64, 56, { wash: '#f6d48a', washA: 1, w: 1.6, col: '#0a1a10' }); for (const wx of [-170, 170]) ell(wx, -6, 40, 40, { wash: '#141414', washA: 1, w: 2, col: '#000' }); txt('막차', -150, -100, 34, { font: 'KSign', col: '#c8302a', bold: false }); pop();
    const tk = clamp((t - EV.cf_siren) / 1.2), tx = lerp(-300, 1300, tk);
    push(tx, 1390, 0.85); blob([[-170, -10], [-160, -80], [-90, -90], [-50, -150], [70, -150], [120, -90], [170, -80], [176, -10]], { wash: '#e8c040', washA: 1, w: 2.4, col: '#2a1a08' }); rect(-40, -140, 90, 46, { wash: '#2a3a4a', washA: 1, w: 1.4, col: '#000' });
    for (const wx of [-100, 110]) ell(wx, 0, 30, 30, { wash: '#141414', washA: 1, w: 2, col: '#000' }); ell(176, -50, 12, 10, { wash: '#fff6c8', washA: 1, w: 1.2, col: '#000' }); glow(220, -50, 140, 'rgba(255,240,190,1)', 0.5); rect(-14, -170, 40, 20, { wash: '#f6f2e6', washA: 1, w: 1.2, col: '#000' }); txt('택시', 6, -160, 16, { font: 'KSign', col: '#c8302a', bold: false }); pop();
    const run = t > EV.cf_mid; for (let q = 0; q < 5; q++) { const ph = run ? ((t - EV.cf_mid) * 0.5 + q * 0.21) % 1 : 0, x = run ? lerp(1300, -200, ph) : 200 + q * 180; if (t > EV.cf_lift) continue;
      human(x, 1420 + (q % 2) * 20, 0.66, t, { body: ['#5a4a3a', '#3a4a5a', '#7a3a3a', '#4a4a4a', '#6a5a3a'][q], legs: '#2a2a30', hair: '#1a1614', hat: q % 2 ? 'cap' : null, hatCol: '#3a3a3a', face: run ? 'shock' : 'calm', armR: run ? 'swing' : 'down', armL: run ? 'swing' : 'down', seed: 120 + q, flip: -1 }); }
    // патруль: свистит, тянет барьер
    if (t > EV.cf_mid && t < EV.cf_lift + 0.4) { const k = sm((t - EV.cf_mid) / 0.4); for (const [x, fl] of [[900, -1], [1060, -1]]) human(x, 1440, 0.82, t, { body: '#5a5a3c', bodyD: '#2e2e1a', legs: '#3a3a26', hat: 'police', hatCol: '#3a3c26', face: 'angry', armR: x === 900 ? 'up' : 'point', armL: 'hold', belt: '#2a1a10', seed: x, flip: fl });
      push(lerp(1300, 760, k), 1500, 0.9); for (const sx of [-110, 110]) pencil([[sx - 26, 0], [sx, -130], [sx + 26, 0]], { w: 7, col: '#4a3a2a' }); const bar = rect(-150, -130, 300, 46, { wash: '#f2ece0', washA: 1, w: 2.2, col: '#1a1410' }); ctx.save(); ctx.clip(bar.path); for (let q = -5; q < 7; q++) { ctx.fillStyle = '#c8302a'; ctx.beginPath(); ctx.moveTo(-150 + q * 48, -130); ctx.lineTo(-126 + q * 48, -130); ctx.lineTo(-150 + q * 48, -84); ctx.lineTo(-174 + q * 48, -84); ctx.fill(); } ctx.restore(); txt('통행금지', 0, -106, 32, { font: 'KSign', col: '#1a1410', bold: false }); pop();
      const rb = (Math.sin(t * 14) + 1) / 2; glow(1000, 900, 500, `rgba(255,${Math.round(40 + 40 * rb)},60,1)`, 0.35 * rb); for (let q = 0; q < 2; q++) { const ph = ((t * 3 + q / 2) % 1); pencil(ellPts(990, 1110, 20 + ph * 60, 20 + ph * 60, 0, 0, 16).slice(12, 17), { w: 4, col: '#fff2c0', a: 0.8 * (1 - ph), pass2: false }); } }
    if (t > EV.cf_lift) { crowd(-100, 1200, 1440, 16, t, 9980, { s: 0.85, cols: ['#5a4a3a', '#3a4a5a', '#7a3a3a', '#4a4a4a', '#e8e0cc'] }); }
  }
  function newspaper(t) {                                              // газета «통금 해제!» влетает
    if (t < EV.cf_lift) return; const k = sm((t - EV.cf_lift) / 0.45), x = lerp(1500, 700, k), y = lerp(500, 700, k), rot = lerp(1.2, -0.12, k);
    push(x, y, 0.82, rot); const np = rect(-230, -170, 460, 340, { wash: '#f2ead8', washA: 1, w: 2.4, col: '#2a2420' }); hatch(np.path, np.bb, { gap: 10, a: 0.05, col: '#4a4030', ang: 1.5, w: 1 });
    txt('통금 해제!', 0, -110, 76, { font: 'KSign', col: '#1a1410', bold: false }); pencil([[-210, -60], [210, -60]], { w: 3, col: '#1a1410', pass2: false }); txt('5.01.1982', 0, -26, 40, { font: 'Osw', col: '#a8201a' });
    rect(-210, 10, 180, 130, { wash: '#8a8478', washA: 1, w: 1.4, col: '#2a2420' }); for (let q = 0; q < 6; q++) pencil([[0, 20 + q * 20], [200, 20 + q * 20]], { w: 2, col: '#4a4030', a: 0.6, pass2: false }); pop();
  }

  WORLD.curfew = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(6, () => { push(0, 0, 1); bugak(780, 1.0, { far: '#1a1e30', mid: '#161a28', near: '#121822', rock: '#2a2e3e' }); pop(); street(t); });
    lay(2.2, () => roadLife(t));
    lay(1, () => { const rd = shape([[-400, 1440], [1480, 1440], [1480, 2400], [-400, 2400]], { wash: '#2a2a30', washA: 1, w: 1, col: '#000', a: 0.3 }); ctx.save(); ctx.clip(rd.path); for (let k = 0; k < 8; k++) rect(-300 + k * 220, 1700, 120, 16, { wash: '#e8e0b8', washA: 0.6, line: false }); glow(540, 1600, 500, 'rgba(255,160,70,1)', 0.18); ctx.restore();
      if (t > EV.cf_mid && t < EV.cf_lift) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(560, 1200, 30, 560, 1200, 420); g.addColorStop(0, 'rgba(255,240,190,0.35)'); g.addColorStop(1, 'rgba(255,240,190,0)'); ctx.fillStyle = g; ctx.fillRect(100, 700, 900, 900); ctx.restore(); }
      cat(); });
    lay(0.8, () => newspaper(t));
  };
  DIR.curfew = {
    outfit: 'suitK', light: { side: -1, rim: '#ffc890' }, grade: ['#3a2a5a', 0.14],
    act: () => [[S0.curfew, 'scared'], [EV.cf_siren, 'shock'], [EV.cf_whistle, 'scared'], [EV.cf_lift - 0.04, 'proud'], [EV.cf_olymp, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: t < EV.cf_whistle ? lerp(200, 520, clamp((t - S0.curfew) / (EV.cf_whistle - S0.curfew))) : 520, y: 1480, s: 1.04,
      walk: t < EV.cf_whistle ? t * 11 : undefined, look: t < EV.cf_whistle ? [0.6, 0] : t < EV.cf_lift ? [0.5, -0.1] : [0.2, -0.3],
      hand: t > EV.cf_whistle && t < EV.cf_lift ? [96, -350] : t > EV.cf_olymp ? [90, -380] : undefined, handF: t > EV.cf_whistle && t < EV.cf_lift ? [-96, -340] : undefined, sweat: t > EV.cf_siren && t < EV.cf_lift ? 1 : 0, tailUp: t > EV.cf_siren && t < EV.cf_lift }),
    afterCat: (t, u, P) => { if (t < EV.cf_whistle) { const x = P.x - 100 * P.s, y = P.y - 120 * P.s; rect(x - 40, y - 30, 80, 60, { wash: '#4a2a14', washA: 1, w: 2, col: '#1a0a04' }); rect(x - 12, y - 40, 24, 12, { wash: '#2a1408', washA: 1, w: 1.4, col: '#000' }); } },
    cam: () => [[S0.curfew, 560, 960, 0.08], [EV.cf_siren, 580, 1020, 0.12], [EV.cf_whistle, 560, 1060, 0.16], [EV.cf_lift, 560, 980, 0.06], [S1.curfew, 560, 960, 0.1]],
    hud: t => { if (t > EV.cf_olymp - 0.1) { const k = popK(t, EV.cf_olymp - 0.1, 0.35); push(540, 470, k, -0.04); txt('СЕУЛ 1988', 0, 0, 96, { font: 'Osw', col: '#ffd24a' }); pop(); }
      if (t < EV.cf_mid + 0.6) note('00:00', 300, 760, t, S0.curfew + 0.1, EV.cf_mid + 0.6, '#ffe8c0', 54, -0.04); }
  };

  // ---------------------------------------------------------------- переход В curfew: красно-синяя шторка мигалки
  TRANS_IN.curfew = { a: 0.3, b: 0.35, fx(k, t, A, B) {
    const x = lerp(-300, W + 300, sm(k));
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); drawBuf(A); ctx.beginPath(); ctx.rect(0, 0, Math.max(0, x), H); ctx.clip(); drawBuf(B); ctx.restore();
    scr(() => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (const [dx, c] of [[-120, 'rgba(255,40,60,0.85)'], [0, 'rgba(255,255,255,0.6)'], [120, 'rgba(50,120,255,0.85)']]) { const g = ctx.createLinearGradient(x + dx - 140, 0, x + dx + 140, 0); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.5, c); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(x + dx - 140, 0, 280, H); } ctx.restore(); });
  } };
})();
