/* 004 — сцены `today` и `button`.
   today: 2026, та же площадь Кванхвамун, что в хуке, но после полуночи всё горит: неон, кафе, палатки, толпа, уличные танцоры,
   часы 00:00 → 03:00. Призрак патрульного 1970-х тает на «не спит» (петля к хуку). Том в худи с кофе. Переход В сцену: счётчик
   «1 000 000 000» рассыпается на неоновые искры.
   button: ночной Сеул с Намсана — Сеульская башня, Лотте-тауэр, мосты через Хан в огнях; портал часов с постерами городов.
   Переход В button: крышка часов захлопывается и открывается. */
(() => {
  EV.td_sleep = wtk('t1', 'спит');
  EV.td_catch = wtk('t1', 'навёрстывает!');
  EV.bt_point = wtk('x1', 'Пиши');
  EV.bt_wink = wtk('x1', 'отмотаем!');
  KEYW.push('спит', 'навёрстывает!');

  function dancers(t) {                                                // уличные танцоры (баскинг): синхронно, под LED
    for (let i = 0; i < 4; i++) { const x = 330 + i * 120, ph = t * 6 + (i % 2) * 0.3, up = Math.sin(ph) > 0;
      human(x, 1260 + Math.abs(Math.sin(ph)) * -14, 0.72, t, { body: ['#1a1a20', '#e8e4dc', '#c83a6a', '#2a4a8a'][i], legs: '#1a1a20', hair: '#1a1614', hat: i % 2 ? 'cap' : null, hatCol: '#e8e4dc', face: 'smile', armR: up ? 'up' : 'point', armL: up ? 'point' : 'up', seed: 150 + i }); }
    glow(520, 1100, 300, 'rgba(255,90,200,1)', 0.25 + 0.15 * Math.sin(t * 6));
  }
  function ghost(t) {                                                  // призрак патрульного 1970-х тает
    const a = 1 - sm((t - EV.td_sleep) / 0.7); if (a <= 0) return;
    const fl = 0.75 + 0.25 * Math.sin(t * 23), A_ = 0.55 * a * fl, c = '#f2d8a8', x = 200, y = 1470;   // полупрозрачный силуэт-призрак
    glow(x, y - 300, 260, 'rgba(255,220,160,1)', 0.25 * a);
    sil([[x - 70, y], [x - 66, y - 280], [x - 50, y - 330], [x + 50, y - 330], [x + 66, y - 280], [x + 70, y]], c, A_);
    sil(ellPts(x, y - 390, 48, 54, 0, 0, 20), c, A_); sil([[x - 56, y - 420], [x - 50, y - 470], [x + 50, y - 470], [x + 56, y - 420], [x + 80, y - 410], [x - 56, y - 410]], c, A_ * 1.2);
    sil([[x + 50, y - 320], [x + 120, y - 400], [x + 130, y - 470], [x + 150, y - 466], [x + 140, y - 390], [x + 70, y - 290]], c, A_);
    pencil([[x - 70, y], [x - 66, y - 280], [x - 50, y - 330], [x + 50, y - 330], [x + 66, y - 280], [x + 70, y]], { w: 3, col: '#fff2d0', a: 0.6 * a, pass2: false });
    if (a < 1) for (let k = 0; k < 20; k++) { const r = rng(10100 + k), ph = 1 - a; ell(200 + (r() - 0.5) * 200, 1300 - r() * 360 - ph * 200, 6, 6, { wash: '#f6e2b8', washA: 0.7 * a, line: false }); }
  }
  function clock(t) {                                                  // табло-часы на столбе: 00:00 → 03:00
    const k = sm((t - S0.today) / (S1.today - S0.today)), m = Math.round(k * 180), hh = String(Math.floor(m / 60)).padStart(2, '0'), mm = String(m % 60).padStart(2, '0');
    const x = 900, y = 1000; pencil([[x, 1280], [x, y + 50]], { w: 8, col: '#1a1820' }); rect(x - 90, y - 50, 180, 100, { wash: '#0a0a10', washA: 1, w: 3, col: '#000' });
    txt(hh + ':' + mm, x, y + 2, 64, { font: 'Osw', col: '#ff5a5a' }); glow(x, y, 140, 'rgba(255,80,80,1)', 0.3);
  }
  function cup(x, y, s) { push(x, y, s, 0.1); const c = poly([[-26, -40], [26, -40], [20, 40], [-20, 40]], { wash: '#f2ece0', washA: 1, w: 2, col: '#2a1a10' }); rect(-24, -16, 48, 26, { wash: '#2a7a5a', washA: 1, w: 1.4, col: '#0a2a1a' }); rect(-30, -52, 60, 14, { wash: '#3a2a20', washA: 1, w: 1.6, col: '#000' });
    for (let q = 0; q < 2; q++) { pencil(spline([[-6 + q * 12, -56], [-12 + q * 12, -80], [-2 + q * 12, -104]], false, 6), { w: 3, col: '#ffffff', a: 0.5, pass2: false }); } pop(); }

  WORLD.today = (t, u, cat) => {
    SQ.lit(true);
    lay(30, () => SQ.sky(t));
    lay(18, () => bugak(830, 1.05, { far: '#2e3252', mid: '#262a40', near: '#1e2436', rock: '#4a4a5e' }));
    lay(9, () => SQ.palace(t));
    lay(5.5, () => SQ.gate(t));
    lay(3.2, () => { SQ.blocks(t); SQ.sejong(t); crowd(-80, 400, 1250, 18, t, 10110, { s: 0.9, phones: 0.7 }); crowd(700, 1180, 1250, 18, t, 10111, { s: 0.9, phones: 0.7 }); });
    lay(2, () => { dancers(t); clock(t); crowd(-200, 200, 1330, 7, t, 10112, { s: 1.3, phones: 0.5 }); crowd(960, 1300, 1330, 7, t, 10113, { s: 1.3, phones: 0.5 }); });
    lay(1, () => { SQ.plaza(t); ghost(t); cat(); });
    lay(0.78, () => SQ.tent(t));
    lay(0.62, () => { const r = rng(10114); for (let i = 0; i < 12; i++) { const x = r() * 1080, y = 1450 + r() * 450, c = ['rgba(255,90,170,1)', 'rgba(90,220,255,1)', 'rgba(255,210,120,1)'][i % 3]; glow(x, y, 60 + r() * 60, c, 0.25); } });
    if (t > EV.td_catch) lay(20, () => { for (let q = 0; q < 4; q++) { const ph = ((t - EV.td_catch) * 0.9 + q * 0.25) % 1, x = 150 + q * 260, y = 260 - ph * 200; for (let n = 0; n < 14; n++) { const a = n / 14 * 6.283; pencil([[x + Math.cos(a) * ph * 40, y + Math.sin(a) * ph * 40], [x + Math.cos(a) * ph * 150, y + Math.sin(a) * ph * 150]], { w: 4, col: ['#ff5aa8', '#5ae8ff', '#ffd24a', '#c88aff'][q], a: 1 - ph, pass2: false }); } } });
    SQ.lit(false);
  };
  DIR.today = {
    outfit: 'hoodieS', light: { side: -1, rim: '#ffd0f0' }, grade: ['#4a2a7a', 0.14],
    act: () => [[S0.today, 'grin'], [EV.td_sleep, 'smug'], [EV.td_catch - 0.04, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 600, y: 1470, s: 1.12, look: [0, 0.05], hand: t > EV.td_catch ? [100, -380] : [110, -270], tilt: t > EV.td_catch ? -0.05 : 0, tailUp: true }),
    afterCat: (t, u, P) => { const h = P.hand; cup(P.x + (h[0] + 6) * P.s, P.y + (h[1] - 40) * P.s, 1); },
    cam: () => [[S0.today, 620, 1060, 0.2], [EV.td_sleep, 600, 1100, 0.12], [EV.td_catch, 600, 1080, 0.06], [S1.today, 600, 1100, 0.14]],
    hud: t => { if (t > EV.td_catch) { const k = popK(t, EV.td_catch, 0.35); push(820, 560, 0.6 + 0.4 * k, 0.1); ctx.save(); ctx.globalAlpha = 0.9 * k; ctx.strokeStyle = '#ff5aa8'; ctx.lineWidth = 8; ctx.strokeRect(-150, -70, 300, 140); ctx.restore(); txt('24/7', 0, 4, 110, { font: 'Osw', col: '#ff8ac8', a: k }); pop(); } }
  };
  TRANS_IN.today = { a: 0.3, b: 0.4, fx(k, t, A, B) {                // счётчик «1 000 000 000» рассыпается на неоновые искры
    if (k < 0.45) drawBuf(A); else drawBuf(B, 1.08 - 0.08 * sm((k - 0.45) / 0.55));
    scr(() => { const s1 = '1 000 000 000', e = sm(clamp((k - 0.3) / 0.6));
      if (k < 0.45) { const a = sm(k / 0.3); ctx.save(); ctx.globalAlpha = 0.85 * a; ctx.fillStyle = '#100a14'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
      if (e < 0.05) txt(s1, 540, 960, 120, { font: 'Osw', col: '#ffd24a', a: sm(k / 0.3) });
      else { const r = rng(10120); for (let i = 0; i < 90; i++) { const a = r() * 6.283, d = 40 + r() * 900 * e, x = 540 + (r() - 0.5) * 760 + Math.cos(a) * d, y = 960 + (r() - 0.5) * 100 + Math.sin(a) * d * 0.9, c = ['rgba(255,90,170,1)', 'rgba(90,220,255,1)', 'rgba(255,210,80,1)', 'rgba(200,140,255,1)'][i % 4];
        glow(x, y, 30 + r() * 30, c, 0.9 * (1 - e)); pencil([[x, y], [x - Math.cos(a) * 40 * e, y - Math.sin(a) * 40 * e]], { w: 4, col: '#ffffff', a: 0.8 * (1 - e), pass2: false }); } }
    });
  } };

  // ================================================================ BUTTON
  function nTower(x, y, s, t) {                                        // Сеульская башня на Намсане
    push(x, y, s); sil([[-160, 0], [-60, -120], [0, -140], [60, -120], [160, 0]], '#141a2a', 1);
    pencil([[0, -140], [0, -420]], { w: 18, col: '#d8d4e0' }); rect(-30, -460, 60, 50, { wash: '#e8e4f0', washA: 1, w: 2, col: '#2a2a3a' }); rect(-36, -420, 72, 20, { wash: '#c8c4d0', washA: 1, w: 2, col: '#2a2a3a' });
    pencil([[0, -460], [0, -600]], { w: 6, col: '#e8e4f0', pass2: false }); const hue = (t * 40) % 360; glow(0, -440, 140, `hsla(${hue},90%,65%,1)`, 0.6); glow(0, -600, 30, 'rgba(255,80,80,1)', 0.9 * (Math.sin(t * 4) > 0 ? 1 : 0.3)); pop();
  }
  function lotte(x, y, s, t) { push(x, y, s); sil([[-40, 0], [-30, -400], [-6, -700], [0, -760], [6, -700], [30, -400], [40, 0]], '#1e2438', 1); windows(-30, -680, 60, 680, 4, 40, 10130, 0.5, '#ffe0a0', '#a8e0ff', 0.7); glow(0, -740, 60, 'rgba(255,255,255,1)', 0.6); pop(); }
  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9);
    lay(40, () => { vgrad(-800, 1400, ['#05071a', '#141838', '#2a2450', '#7a3a6a']); ctx.save(); ctx.fillStyle = '#fff8e8'; const r = rng(18); for (let i = 0; i < 120; i++) { ctx.globalAlpha = 0.3 + 0.6 * Math.abs(Math.sin(t * 1.7 + i * 1.3)); ctx.fillRect(r() * 1600 - 260, r() * 1300 - 500, 2, 2); } ctx.restore(); });
    lay(14, () => { bugak(1120, 0.9, { far: '#1a1e34', mid: '#161a2c', near: '#121624', rock: '#2a2e40' }); lotte(1050, 1250, 0.9, t); nTower(130, 1240, 0.9, t);
      for (let k = 0; k < 44; k++) { const x = -500 + k * 50, h = 50 + (k * 37) % 140, y = 1260 - (k % 5) * 8; sil([[x, y], [x, y - h], [x + 40, y - h], [x + 40, y]], '#1a1834', 1); windows(x + 3, y - h + 4, 34, h - 8, 3, Math.floor(h / 14), k * 7, 0.55, '#ffcf7a', '#8fd8ff', 0.75); }
      const rp = poly([[-600, 1300], [1700, 1290], [1700, 1500], [-600, 1500]], { wash: '#141e3a', washA: 1, line: false }); for (let k = 0; k < 40; k++) { const x = -500 + k * 55; pencil([[x, 1320 + (k % 4) * 30], [x + 30, 1320 + (k % 4) * 30]], { w: 3, col: ['#ff8ac8', '#8ae8ff', '#ffcf7a'][k % 3], a: 0.4, pass2: false }); }
      for (const by of [1330, 1420]) { pencil([[-600, by], [1700, by - 20]], { w: 7, col: '#2a2a3a', pass2: false }); for (let k = 0; k < 30; k++) glow(-500 + k * 75, by - 4 - k * 0.8, 14, k % 2 ? 'rgba(255,214,140,1)' : 'rgba(140,220,255,1)', 0.8); } });
    haze('#2a2050', 0.1);
    if (open > 0) lay(2, () => { const cx = 540, cy = 610, R = 400 * open;
      glow(cx, cy, R * 1.35, 'rgba(255,200,120,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(0.5, 'rgba(90,60,170,0.6)'); g.addColorStop(1, 'rgba(20,10,40,0.6)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', '#f1d27a', '#c99636'][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['ТОКИО', '#e8e0d0', '#f4a0a0', 'fuji'], ['РИМ', '#8a3a2a', '#f0c070', 'col'], ['ПАРИЖ', '#3a5a8a', '#e8b07a', 'eiffel'], ['?', '#2a4a3a', '#c8e0a0', 'tower']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); poster(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.62 + 0.14 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); });
    });
    lay(1, () => { const g = poly([[-400, 1560], [1500, 1540], [1500, 2400], [-400, 2400]], { wash: '#1e1a2a', washA: 1, w: 2, col: '#0a0810' }); for (let x = -300; x < 1400; x += 60) pencil([[x, 1550], [x, 1440]], { w: 6, col: '#2a2638', pass2: false }); pencil([[-400, 1440], [1500, 1430]], { w: 8, col: '#2a2638', pass2: false });
      for (let k = 0; k < 7; k++) { const x = 820 + k * 34, y = 1450 - (k % 3) * 8; ell(x, y, 16, 12, { wash: ['#ff5a8a', '#5ae8ff', '#ffd24a', '#c88aff'][k % 4], washA: 1, w: 1.4, col: '#1a1020' }); } txt('замки любви', 920, 1500, 30, { col: '#ffd8e8', a: 0.8 });
      cat(); });
    motes(40, [0, 300, W, 1700], '#ffd8b0', t, 34, { sp: -14, sz: 2.4, a: 0.6, tw: 1, add: 1 });
  };
  DIR.button = {
    outfit: 'hoodieS', light: { side: 1, rim: '#ffc890' }, grade: ['#3a2050', 0.26],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 640, y: 1580, s: 1.45, look: t < EV.portal + 0.3 ? [0.2, -0.5] : [0, 0.05], watchInHand: true, glow: 0.4 + 0.6 * sm((t - EV.portal) / 0.8), spin: 0.5 + (t > EV.bt_wink ? (t - EV.bt_wink) * 3 : 0),
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : t > EV.bt_wink ? [-80, -170] : [-80, -150], tilt: t > EV.bt_wink ? 0.08 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 600, 1160, 0.22], [EV.portal, 580, 1000, 0.0], [EV.bt_point + 0.2, 590, 1040, 0.08, 'x'], [EV.bt_wink, 590, 1030, 0.06], [EV.bt_wink + 0.25, 600, 1050, 0.14, 'x'], [DUR + 0.2, 600, 1040, 0.1]],
    afterCat: (t, u, P) => { const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,140,0.6)', 0.25 * P.glow, 10, t * 2); }
  };
  // ---------------------------------------------------------------- переход В button: крышка часов захлопывается и открывается
  TRANS_IN.button = { a: 0.25, b: 0.35, runA: 1, fx(k, t, A, B) {
    const c = k < 0.5 ? sm(k / 0.5) : 1 - sm((k - 0.5) / 0.5), R = 1200 * (1 - c) + 1;
    scr(() => { ctx.fillStyle = '#1a1208'; ctx.fillRect(0, 0, W, H); });
    inCircle(540, 960, R, () => drawBuf(k < 0.5 ? A : B));
    scr(() => {
      for (let q = 0; q < 3; q++) pencil(ellPts(540, 960, R + q * 16, R + q * 16, 0, 0, 80), { w: 14 - q * 4, col: ['#f1d27a', '#c99636', '#7a5414'][q], a: 0.95, pass2: false, gap: false });
      if (c > 0.95) { glow(540, 960, 200, 'rgba(255,214,140,1)', 0.9); txt('щёлк', 540, 960, 60, { col: '#ffe9b8' }); } });
  } };
})();
