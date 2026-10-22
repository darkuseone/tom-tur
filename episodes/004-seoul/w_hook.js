/* 004 — сцена `hook`: 2026, ночь, площадь Кванхвамун. Ворота в подсветке, за ними крыши Кёнбоккуна и тёмный купол Пугаксана,
   по бокам — дома с неоном, LED-экран, толпа с телефонами, золотой Седжон на постаменте. С 0,0 с — свисток: из 1970-х «прорывается»
   патрульный с поднятой ладонью и фонарём, Том замирает с поднятыми лапами. На «нельзя!» неон и окна гаснут волной, город проваливается в темноту;
   на «тридцать шесть» — красный штамп «36 ЛЕТ». Переход в туннель: в темноте загорается циферблат часов в лапе Тома. */
(() => {
  EV.hook_stop = LS('h1');                     // свисток, патрульный
  EV.hook_off = wtk('h1', 'нельзя!');           // волна темноты
  EV.hook_36 = wtk('h1', 'Тридцать');           // штамп «36 лет»
  EV.hook_wind = wtk('h2', 'Отматываем');       // часы
  SHAKES.push([EV.hook_stop + 0.02, 0.25, 9], [EV.hook_off + 0.05, 0.35, 7]);
  KEYW.push('Стоять!', 'нельзя!');

  let LIT = false;                                                   // true — площадь сегодня (сцена today): всё горит
  const dark = t => LIT ? 0 : sm((t - EV.hook_off) / 0.7);          // 0 — город светится, 1 — тьма
  const offAt = x => EV.hook_off + (Math.abs(x - 540) / 900) * 0.6; // гаснет волной от центра к краям
  const on = (t, x) => (LIT || t < offAt(x) ? 1 : 0);

  function sky(t) {
    vgrad(-900, 1300, ['#0c0a22', '#1e1a46', '#46305e', '#8a4a62'], 1);
    const r = rng(9201); for (let i = 0; i < 70; i++) { const x = -300 + r() * 1700, y = -700 + r() * 1100; ell(x, y, 1.6 + r() * 2, 1.6 + r() * 2, { wash: '#fff6e0', washA: (0.3 + 0.6 * r()) * (0.6 + 0.4 * dark(t)) * (0.6 + 0.4 * Math.sin(t * 3 + i)), line: false }); }
    const mx = 860, my = -300; glow(mx, my, 260, 'rgba(255,240,210,1)', 0.25 + 0.15 * dark(t)); ell(mx, my, 54, 54, { wash: '#f6eedc', washA: 1, w: 2, col: '#8a8270' }); ell(mx - 16, my - 10, 12, 9, { wash: '#d8ccb4', washA: 0.8, line: false }); ell(mx + 14, my + 16, 8, 6, { wash: '#d8ccb4', washA: 0.8, line: false });
    glow(540, 900, 900, 'rgba(255,120,160,1)', 0.22 * (1 - dark(t)));  // зарево города
  }
  function palace(t) {                                               // крыши Кёнбоккуна за воротами (Кынджонджон — двухъярусный)
    const lt = 1 - 0.75 * dark(t);
    for (const [x, w] of [[180, 240], [900, 260], [-90, 200], [1170, 220]]) koHall(x, 930, w, 200, t, { bays: 4, light: lt * 0.7, steps: false, key: 9210 + x });
    koHall(540, 905, 330, 330, t, { two: 1, bays: 5, light: lt * 0.8, key: 9220 });
    haze('#1a1838', 0.25);
  }
  function gate(t) {
    const lt = 1 - 0.6 * dark(t);
    glow(540, 860, 520, 'rgba(255,190,110,1)', 0.45 * lt);
    gwanghwamun(540, 1090, 0.82, t, { light: lt, archLit: 0.9 * lt + 0.1 });
    for (const sd of [-1, 1]) { haetae(540 + sd * 330, 1110, 0.5, -sd); glow(540 + sd * 330, 1060, 90, 'rgba(255,200,120,1)', 0.25 * lt); }
  }
  function blocks(t) {                                               // дома по краям площади: окна гаснут, неон гаснет
    const L = [[-240, 1240, 230, 900, '#2a2838', 'KHand'], [-20, 1240, 190, 640, '#33303f'], [890, 1240, 200, 700, '#2c3040'], [1080, 1240, 260, 980, '#262838']];
    L.forEach(([x, base, w, h, c], i) => { const o_ = on(t, x + w / 2); cityBlock(x, base, w, h, c, t, { seed: 9230 + i, on: 0.55 * o_ + 0.04, key: 9235 + i, wa: 0.9 });
      if (!o_) { ctx.save(); ctx.globalAlpha = 0.5; ctx.fillStyle = '#05040a'; ctx.fillRect(x, base - h, w, h); ctx.restore(); } });
    const S = [[-120, 520, 150, 70, '카페 24', '#ff5aa8'], [60, 760, 140, 64, '치킨', '#ffd24a'], [-140, 820, 120, 140, '노래방', '#5ae8ff', 1], [990, 600, 150, 66, '편의점', '#7aff8a'], [1170, 470, 170, 70, 'K-POP', '#c88aff'], [960, 820, 130, 60, '24시', '#ff7a4a']];
    S.forEach(([x, y, w, h, s1, c, vert]) => { const o_ = on(t, x); if (vert) { neon(x, y, w * 0.6, h, s1.length > 2 ? '노래' : s1, c, t, o_, { size: 0.38 }); neon(x, y + h * 0.75, w * 0.6, h * 0.5, '방', c, t, o_, { size: 0.7 }); } else neon(x, y, w, h, s1, c, t, o_, { flick: s1 === '치킨' }); });
    // LED-экран на правом доме
    const sx = 1150, sy = 760, o_ = on(t, sx); rect(sx - 110, sy - 80, 220, 160, { wash: '#0a0a14', washA: 1, w: 3, col: '#000' });
    if (o_) { ctx.save(); ctx.beginPath(); ctx.rect(sx - 104, sy - 74, 208, 148); ctx.clip(); const ph = t * 1.4; const g = ctx.createLinearGradient(sx - 104, sy - 74, sx + 104, sy + 74); g.addColorStop(0, `hsl(${(ph * 60) % 360},80%,55%)`); g.addColorStop(1, `hsl(${(ph * 60 + 140) % 360},80%,45%)`); ctx.fillStyle = g; ctx.fillRect(sx - 110, sy - 80, 220, 160);
      for (let k = 0; k < 5; k++) { const bx = sx - 80 + k * 40, bh = 30 + Math.abs(Math.sin(t * 6 + k)) * 80; ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(bx, sy + 70 - bh, 22, bh); } ctx.restore(); txt('SEOUL', sx, sy - 40, 36, { font: 'Osw', col: '#ffffff' }); glow(sx, sy, 260, 'rgba(200,140,255,1)', 0.35); }
  }
  function sejong(t) {                                               // золотой Седжон на постаменте (сидит)
    const lt = 1 - 0.5 * dark(t), x = 820, y = 1180;
    const ped = rect(x - 90, y - 120, 180, 120, { wash: '#6a6458', washA: 1, w: 2, col: '#1a1814' }); hatch(ped.path, ped.bb, { gap: 6, a: 0.2, col: '#000', ang: 0.2, w: 1 });
    rect(x - 100, y - 132, 200, 14, { wash: '#8a8478', washA: 1, w: 1.6, col: '#1a1814' });
    const G = '#c9a040', GD = '#6a4a10';
    blob([[x - 70, y - 132], [x - 76, y - 200], [x - 50, y - 270], [x + 50, y - 270], [x + 76, y - 200], [x + 70, y - 132]], { wash: G, washA: 1, w: 2.2, col: GD });
    blob([[x - 60, y - 230], [x - 90, y - 170], [x - 40, y - 160], [x - 20, y - 220]], { wash: G, washA: 1, w: 1.8, col: GD }); rect(x - 46, y - 190, 40, 50, { wash: '#e8c868', washA: 1, w: 1.6, col: GD });
    ell(x, y - 300, 30, 34, { wash: G, washA: 1, w: 2, col: GD }); blob([[x - 32, y - 320], [x - 28, y - 350], [x, y - 360], [x + 28, y - 350], [x + 32, y - 320]], { wash: '#a8802a', washA: 1, w: 1.6, col: GD });
    for (const k of [-1, 1]) ell(x + k * 22, y - 362, 8, 14, { wash: '#a8802a', washA: 1, w: 1.2, col: GD, rot: k * 0.3 });
    glow(x, y - 260, 160, 'rgba(255,210,120,1)', 0.35 * lt); glow(x - 20, y - 290, 40, 'rgba(255,250,220,1)', 0.4 * lt);
  }
  function patrol(t) {                                               // патрульный 1970-х «из прошлого»: фуражка, свисток, ладонь, фонарь
    const k = sm((t - EV.hook_stop) / 0.25), x = lerp(-120, 220, k), gl = (Math.sin(t * 31) > 0.7 ? 1 : 0);
    const by = 1470;
    // луч фонаря на Тома
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(x + 60, by - 300, 620, by - 300); g.addColorStop(0, 'rgba(255,240,190,0.55)'); g.addColorStop(1, 'rgba(255,240,190,0)');
    ctx.fillStyle = g; ctx.globalAlpha = 0.5 + 0.5 * dark(t); ctx.beginPath(); ctx.moveTo(x + 60, by - 290); ctx.lineTo(760, by - 560); ctx.lineTo(760, by - 40); ctx.closePath(); ctx.fill(); ctx.restore();
    push(gl ? 6 : 0, 0, 1); human(x, by, 1.25, t, { body: '#5a5a3c', bodyD: '#2e2e1a', legs: '#3a3a26', boots: '#141010', hat: 'police', hatCol: '#3a3c26', face: 'angry', armR: 'up', armL: 'hold', belt: '#2a1a10', seed: 21, look: 0.8 });
    // свисток во рту + звуковые «волны»
    const hy = by - 238 * 1.25 - 46 * 1.25; rect(x + 26, hy + 30, 26, 10, { wash: '#c8ccd0', washA: 1, w: 1.4, col: '#2a2a2a' });
    if (t < EV.hook_off + 0.4) for (let q = 0; q < 3; q++) { const ph = ((t * 3 + q / 3) % 1); pencil(ellPts(x + 70, hy + 34, 20 + ph * 70, 20 + ph * 70, 0, 0, 16).slice(12, 17), { w: 4, col: '#fff2c0', a: 0.8 * (1 - ph), pass2: false }); }
    pop();
    if (gl) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.25; ctx.fillStyle = '#ff2a4a'; ctx.fillRect(x - 100, by - 560, 200, 560); ctx.restore(); }
    // барьер «통행금지» (комендантский час)
    push(900, 1520, 1, 0.02); for (const sx of [-130, 130]) { pencil([[sx - 30, 0], [sx, -150], [sx + 30, 0]], { w: 8, col: '#4a3a2a' }); }
    const bar = rect(-180, -150, 360, 52, { wash: '#f2ece0', washA: 1, w: 2.4, col: '#1a1410' }); ctx.save(); ctx.clip(bar.path); for (let q = -6; q < 8; q++) { ctx.fillStyle = '#c8302a'; ctx.beginPath(); ctx.moveTo(-180 + q * 56, -150); ctx.lineTo(-152 + q * 56, -150); ctx.lineTo(-180 + q * 56, -98); ctx.lineTo(-208 + q * 56, -98); ctx.fill(); } ctx.restore();
    rect(-90, -146, 180, 44, { wash: '#f2ece0', washA: 0.95, w: 1.6, col: '#1a1410' }); txt('통행금지', 0, -122, 36, { font: 'KSign', col: '#1a1410', bold: false });
    const bl = Math.sin(t * 9) > 0 ? 1 : 0.2; ell(-160, -168, 12, 12, { wash: '#ff5a2a', washA: 1, w: 1.4, col: '#2a0a0a' }); glow(-160, -168, 60, 'rgba(255,90,40,1)', 0.6 * bl * dark(t));
    pop();
  }
  function plaza(t) {                                                // мощение площади в перспективе, фонари, лужицы отражений
    const pg = shape([[-400, 1240], [1480, 1240], [1480, 2300], [-400, 2300]], { wash: '#3a3442', washA: 1, w: 1, col: '#000', a: 0.3 });
    ctx.save(); ctx.clip(pg.path); for (let k = -14; k <= 14; k++) pencil([[540 + k * 60, 1240], [540 + k * 260, 2300]], { w: 1.4, col: '#5a5266', a: 0.45, pass2: false, gap: false });
    for (let y = 1250, d = 12; y < 2300; y += d, d *= 1.32) pencil([[-400, y], [1480, y]], { w: 1.4, col: '#5a5266', a: 0.45, pass2: false, gap: false });
    const lt = 1 - dark(t); glow(540, 1300, 520, 'rgba(255,190,120,1)', 0.25 * lt); glow(250, 1600, 260, 'rgba(255,90,170,1)', 0.18 * lt); glow(900, 1640, 260, 'rgba(90,220,255,1)', 0.16 * lt);
    ctx.restore();
    for (const x of [60, 1020]) { pencil([[x, 1260], [x, 980]], { w: 7, col: '#1a1820' }); pencil([[x, 980], [x + (x < 540 ? 40 : -40), 970]], { w: 5, col: '#1a1820' }); const lx = x + (x < 540 ? 44 : -44); ell(lx, 978, 16, 9, { wash: on(t, x) ? '#fff2c8' : '#3a3640', washA: 1, w: 1.4, col: '#000' }); if (on(t, x)) glow(lx, 990, 140, 'rgba(255,220,160,1)', 0.45); }
  }

  function tent(t) {                                                 // уличная палатка пходжанмача: оранжевый тент, пар, табуретки
    const lt = 1 - 0.7 * dark(t), x = 930, y = 1500;
    const tp = shape([[x - 40, y - 330], [x + 330, y - 350], [x + 330, y + 260], [x - 10, y + 260]], { wash: '#e8702a', washA: 0.92, w: 3, col: '#3a1a08', a: 0.8, key: 9260 });
    ctx.save(); ctx.clip(tp.path); for (let k = 0; k < 8; k++) pencil([[x - 40 + k * 50, y - 340], [x - 10 + k * 50, y + 260]], { w: 2, col: '#b8501a', a: 0.5, pass2: false }); ctx.restore();
    glow(x + 140, y - 60, 340, 'rgba(255,150,70,1)', 0.55 * lt);
    rect(x - 20, y - 260, 120, 46, { wash: '#f6e8c8', washA: 1, w: 2, col: '#3a1a08' }); txt('떡볶이', x + 40, y - 236, 34, { font: 'KSign', col: '#c8302a', bold: false });
    for (let k = 0; k < 4; k++) { const ph = ((t * 0.6 + k / 4) % 1); ell(x + 30 + Math.sin(t + k) * 20, y - 120 - ph * 220, 30 + ph * 50, 22 + ph * 30, { wash: '#f6f0e6', washA: 0.25 * (1 - ph) * lt, line: false }); }
    rect(x - 30, y - 60, 200, 26, { wash: '#8a8a90', washA: 1, w: 2, col: '#1a1a1a' }); ell(x + 60, y - 66, 70, 14, { wash: '#c8302a', washA: 1, w: 2, col: '#3a0a0a' });
    for (const sx of [x - 10, x + 120]) { rect(sx, y + 60, 46, 14, { wash: '#2a6ad8', washA: 1, w: 1.6, col: '#0a1a3a' }); pencil([[sx + 6, y + 74], [sx + 2, y + 150]], { w: 4, col: '#2a6ad8', pass2: false }); pencil([[sx + 40, y + 74], [sx + 44, y + 150]], { w: 4, col: '#2a6ad8', pass2: false }); }
    // скутер доставки слева
    push(70, 1700, 1, 0); ell(-60, 0, 34, 34, { wash: '#1a1a1e', washA: 1, w: 2.4, col: '#000' }); ell(90, 0, 34, 34, { wash: '#1a1a1e', washA: 1, w: 2.4, col: '#000' });
    blob([[-80, -30], [-40, -80], [60, -80], [110, -40], [100, -10], [-70, -10]], { wash: '#d8d4cc', washA: 1, w: 2.4, col: '#1a1a1a' }); rect(-110, -150, 90, 80, { wash: '#c8302a', washA: 1, w: 2, col: '#2a0a0a' }); txt('배달', -65, -110, 30, { font: 'KSign', col: '#fff6e0', bold: false });
    ell(110, -60, 12, 10, { wash: on(t, 70) ? '#fff6c8' : '#3a3a40', washA: 1, w: 1.4, col: '#000' }); if (on(t, 70)) glow(140, -60, 120, 'rgba(255,240,190,1)', 0.4); pop();
  }

  window.SQ = { sky, palace, gate, blocks, sejong, plaza, tent, lit: v => { LIT = v; } };            // площадь для сцены today

  WORLD.hook = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(18, () => { bugak(830, 1.05, { far: '#2e3252', mid: '#262a40', near: '#1e2436', rock: '#4a4a5e', a: 1 }); });
    lay(9, () => palace(t));
    lay(5.5, () => gate(t));
    lay(3.2, () => { blocks(t); sejong(t); crowd(-80, 400, 1250, 14, t, 9240, { s: 0.9, phones: 0.6 }); crowd(700, 1180, 1250, 14, t, 9241, { s: 0.9, phones: 0.6 }); });
    lay(1.6, () => { crowd(-200, 160, 1330, 6, t, 9242, { s: 1.3, phones: 0.5 }); crowd(980, 1300, 1330, 6, t, 9243, { s: 1.3, phones: 0.5 }); });
    lay(1, () => { plaza(t); if (dark(t) > 0) screenFill('#06040e', 0.55 * dark(t)); patrol(t); cat(); });
    lay(0.78, () => tent(t));
    lay(0.62, () => { const r = rng(9250); for (let i = 0; i < 9; i++) { const x = r() * 1080, y = 1500 + r() * 400, c = ['rgba(255,90,170,1)', 'rgba(90,220,255,1)', 'rgba(255,210,120,1)'][i % 3]; glow(x, y, 60 + r() * 60, c, 0.22 * (1 - dark(t))); } });
  };
  DIR.hook = {
    outfit: 'hoodieS', light: { side: -1, rim: '#ffe6b0' }, grade: ['#3a2a6a', 0.16],
    act: () => [[0, 'shock'], [EV.hook_off - 0.03, 'scared'], [EV.hook_36, 'shock'], [LS('h2'), 'smug'], [EV.hook_wind, 'grin']],
    pose: (t, u, b) => Object.assign(b, {
      x: 600, y: 1470, s: 1.15, walk: t < 0.25 ? t * 8 : undefined, look: t < LS('h2') ? [-0.6, -0.05] : [0.1, 0], tilt: t < LS('h2') ? -0.05 : 0,
      hand: t > EV.hook_wind - 0.05 ? [70, -330] : t < LS('h2') ? [96, -350 + Math.sin(t * 20) * 4] : undefined,
      handF: t < LS('h2') && t > 0.1 ? [-96, -340 + Math.sin(t * 20 + 1) * 4] : undefined,
      tailUp: t < LS('h2'), squash: b.squash + (t < 0.2 ? 0.06 : 0),
      watchInHand: t > EV.hook_wind - 0.1, glow: clamp((t - EV.hook_wind) / 0.4), spin: t > EV.hook_wind + 0.3 ? 1 : 0
    }),
    cam: () => [[0, 560, 1080, 0.02], [EV.hook_off, 560, 1120, 0.1], [EV.hook_36 + 0.2, 580, 1140, 0.14], [LS('h2'), 600, 1160, 0.18], [S1.hook, 640, 1100, 0.3]],
    hud: t => { if (t > EV.hook_36) { const k = popK(t, EV.hook_36, 0.35); push(800, 560, 0.6 + 0.4 * k, 0.12); ctx.save(); ctx.globalAlpha = 0.9 * k; ctx.strokeStyle = '#d8342a'; ctx.lineWidth = 9; ctx.strokeRect(-190, -88, 380, 176); ctx.restore(); txt('36 ЛЕТ', 0, -14, 112, { font: 'Osw', col: '#e8443a', a: 0.95 * k }); txt('1945–1982', 0, 58, 40, { font: 'Osw', col: '#e8443a', a: 0.9 * k }); pop(); }
      if (t > EV.hook_off + 0.3 && t < LS('h2')) note('통행금지 = комендантский час', 600, 1820, t, EV.hook_off + 0.3, LS('h2'), '#f3e6c8', 42, -0.02); }
  };

  // ---------------------------------------------------------------- переход В туннель: темнота сжимается, загорается циферблат в лапе Тома
  TRANS_IN.tunnel = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {
    const cx = 700, cy = 1010, q = sm(k);
    drawBuf(A, 1 + q * 0.6, cx, cy, 1);
    scr(() => { ctx.save(); ctx.fillStyle = '#05030a'; ctx.globalAlpha = sm(k * 1.8); ctx.fillRect(0, 0, W, H); ctx.restore(); });
    const R = Math.pow(sm((k - 0.3) / 0.7), 1.5) * 1400; if (R > 1) { inCircle(cx, cy, R, () => drawBuf(B, 1.3 - 0.3 * q, 540, 960)); ringFX(cx, cy, R, t, ['#e8a33c', '#fff1c8', '#c99636'], clamp(1.5 - k)); }
    else scr(() => glow(cx, cy, 80 + k * 300, 'rgba(255,214,140,1)', 0.9));
  } };
})();
