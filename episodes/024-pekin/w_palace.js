/* 024 — сцена `palace`: 1420, ТАЙНА 1 — Запретный город. Закат: солнце садится за надвратную башню, длинные тени, загораются фонари.
   Красная стена во весь кадр, огромные ворота с золотыми гвоздями 9×9: сначала приоткрыты — изнутри льётся золотой свет двора и виден зал.
   Стража с копьями, чиновники в халатах, носильщики с паланкином, каменные львы, курильница с дымом, бронзовый журавль, знамёна.
   Том тянется в щель — на «закрытый» створки с грохотом захлопываются перед носом, падает засов, свет изнутри гаснет (сцена темнеет, фонари ярче);
   на «пятьсот» — табличка «ВХОД ЗАПРЕЩЁН · 1420–1925 · 505 лет»; Том стучит в створку. Главный свет — закатное солнце справа-сверху.
   Переход В сцену — свиток: бумажный свиток раскатывается сверху вниз и открывает эпоху. */
(() => {
  EV.pl_peek = wtk('s1', 'прятать.');
  EV.pl_point = wtk('s1', 'дворец,');
  EV.pl_slam = wtk('s1', 'закрыли');
  EV.pl_500 = wtk('s1', 'пятьсот');
  EV.pl_knock = wtk('s1', 'лет.');
  KEYW.push('прятать.', 'дворец,', 'пятьсот', 'лет.');
  SHAKES.push([EV.pl_slam + 0.16, 0.35, 14]);
  const L = BJ.ink, DX = 600, DW = 360, DY = 800, DB = 1410, SUN = [930, 560];
  const open = t => t < EV.pl_slam ? 0.42 + 0.05 * Math.sin(t * 2) : 0.42 * (1 - clamp((t - EV.pl_slam) / 0.16));
  const dusk = t => sm((t - EV.pl_slam) / 0.8);
  function sky(t) { const d = dusk(t);
    vgrad(-900, 1300, [lerpC('#3a2a6a', '#1a1440', d), lerpC('#b8487a', '#5a2a5a', d), lerpC('#f08a4a', '#c8503a', d), lerpC('#ffd070', '#f09a50', d)], 1);
    glow(SUN[0], SUN[1], 700, 'rgba(255,220,130,1)', 0.75 - 0.2 * d); ell(SUN[0], SUN[1] + d * 60, 86, 86, { wash: '#fff2c0', washA: 1, w: 1.4, col: '#f0a040', a: 0.5 });
    rays(SUN[0], SUN[1], Math.PI * 0.72, 1.5, 1900, 'rgba(255,214,140,0.6)', 0.1, 9, t);
    cloudsBJ(t, -100, 5, '#ffc890', 2450, 0.7); cloudsBJ(t, 300, 4, '#f0a0a0', 2451, 0.5, 5); birdsBJ(t, 9, [-100, 100, 1200, 620], 2452, '#2a1420'); }
  function far(t) {                                                 // западные горы и пагода
    hills(820, 150, '#6a3a6a', 2.1, 1); hills(900, 90, '#8a4a5a', 4.7, 1);
    for (let i = 0; i < 5; i++) roofCN(180, 700 - i * 44, 150 - i * 22, 30, { sil: '#4a2a50', ev: 20 }); sil([[150, 880], [150, 480], [210, 480], [210, 880]], '#4a2a50', 1); pencil([[180, 480], [180, 420]], { w: 4, col: '#4a2a50', pass2: false });
    depthFog('#f0a070', 0.2); }
  function roofs(t) {                                               // море золотых крыш за стеной
    const r = rng(2453); for (let i = 0; i < 7; i++) { const x = -160 + i * 220 + r() * 40, y = 760 + r() * 60, w = 180 + r() * 120; hallCN(x, y + 60, w, 60, { bays: 3, rh: 70 + r() * 30, tiers: i % 3 === 0, roof: { ev: 30, lit: 0.12, shade: false } }); }
    depthFog('#e8905a', 0.16); }
  function gate(t) {                                                // стена, надвратная башня, ворота
    const o = open(t), d = dusk(t);
    hallCN(700, 640, 760, 150, { bays: 7, rh: 120, tiers: 1, roof: { ev: 60, lit: 0.18 * (1 - d) }, plaque: '午門', glowIn: 0.35 * d });
    rect(-900, 620, 2900, 800, { wash: BJ.red, washA: 1, w: 3, col: L, shade: { gap: 13, a: 0.22, col: BJ.redD, ang: 1.2 } });
    rect(-900, 600, 2900, 34, { wash: BJ.tile, washA: 1, w: 2.2, col: L }); for (let i = 0; i < 60; i++) pencil([[-700 + i * 46, 604], [-700 + i * 46, 630]], { w: 1.4, col: BJ.tileD, a: 0.8, pass2: false });
    rect(-900, 1300, 2900, 110, { wash: '#8a1a16', washA: 1, w: 2, col: L, shade: { gap: 8, a: 0.2, col: '#3a0a08', ang: 0.2 } });
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.4 * (1 - d * 0.7); const g = ctx.createLinearGradient(1200, 600, 300, 1300); g.addColorStop(0, '#ffb060'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(-300, 620, 1700, 700); ctx.restore();
    // проём: арка, за ней — двор в золотом свете
    blob([[DX - 40, DB], [DX - 40, DY + 60], [DX + DW / 2, DY - 70], [DX + DW + 40, DY + 60], [DX + DW + 40, DB]], { wash: '#3a0c0a', washA: 1, w: 3, col: L });
    ctx.save(); ctx.beginPath(); ctx.rect(DX, DY, DW, DB - DY); ctx.clip();
    vgrad(DY, DB, ['#ffe8a0', '#ffc860', '#e89a40'], 1); hallCN(DX + DW / 2, DB - 120, 250, 110, { bays: 3, rh: 90, tiers: 1, base: 40, roof: { ev: 30, lit: 0.3 } }); glow(DX + DW / 2, DB - 200, 300, 'rgba(255,240,180,1)', 0.7);
    for (const k of [-1, 1]) human(DX + DW / 2 + k * 70, DB - 10, 0.3, t, { body: '#a8231c', long: 1, hat: 'samo', seed: 2460 + k });
    // створки
    for (const k of [-1, 1]) { const w = DW / 2 * (1 - o), x0 = k < 0 ? DX : DX + DW - w;
      rect(x0, DY, w, DB - DY, { wash: '#8e1a14', washA: 1, w: 2.6, col: L, shade: { gap: 10, a: 0.28, col: '#3a0806', ang: 1.57 } });
      for (let i = 0; i < 5; i++) for (let j = 0; j < 9; j++) { const gx = x0 + w * (i + 0.5) / 5, gy = DY + 50 + j * 58; ell(gx, gy, Math.max(2, 9 * (1 - o * 0.6)), 9, { wash: BJ.gold, washA: 1, w: 1.2, col: BJ.goldD }); }
      const hx = k < 0 ? x0 + w - 26 * (1 - o) : x0 + 26 * (1 - o); ell(hx, 1150, 20 * (1 - o * 0.5), 20, { wash: BJ.goldD, washA: 1, w: 2, col: L }); ell(hx, 1164, 15 * (1 - o * 0.5), 18, { line: true, w: 4, col: BJ.gold }); }
    ctx.restore();
    if (t > EV.pl_slam + 0.16) { const q = popK(t, EV.pl_slam + 0.16, 0.25); rect(DX - 30, 1090 - 80 * (1 - q), DW + 60, 44, { wash: BJ.woodD, washA: 1, w: 2.6, col: L, shade: { gap: 6, a: 0.3, col: '#120804', ang: 0.1 } }); for (const k of [0.1, 0.9]) rect(DX - 30 + (DW + 60) * k - 14, 1076 - 80 * (1 - q), 28, 72, { wash: BJ.goldD, washA: 1, w: 2, col: L });
      puffK(DX + DW / 2, DB - 30, 1.5, t, EV.pl_slam + 0.14, 0.6, 2461, '#e8c8a0'); }
    if (o > 0.02) { shaft(DX + DW / 2, DY + 100, DW * o * 1.2, 900, 0.5, 'rgba(255,220,140,1)', 0.5 * o / 0.42); }
    moodDark(1000, 640, 420, 1500, '#2a0838', 0.5);
    for (const [x, on] of [[330, 1], [1090, 2], [60, 3]]) lantern(x, 900, 0.8, t, 0.25 + 0.75 * d, on, { cord: 70 });
    for (const [x, c] of [[460, BJ.gold], [1010, BJ.gold], [200, '#e8e0d0']]) { pencil([[x, 1400], [x, 700]], { w: 6, col: BJ.woodD, pass2: false }); const wv = Math.sin(t * 3 + x) * 12; blob([[x, 710], [x + 90 + wv, 730], [x + 80 - wv, 900], [x, 930]], { wash: c, washA: 1, w: 2, col: L }); hz('龍', x + 42, 810, 60, BJ.red, 0.9); }
  }
  function court(t) {                                               // у ворот: львы, стража, чиновники, курильница, журавль, паланкин
    const d = dusk(t);
    lionSt(470, 1450, 0.8, 1); lionSt(1090, 1450, 0.8, -1);
    human(560, 1440, 0.64, t, { body: '#3a3a4a', legs: '#2a2a30', hat: 'helmet', hatCol: '#8a8a94', prop: 'spear', armR: 'hold', seed: 2462 });
    human(1000, 1440, 0.64, t, { body: '#3a3a4a', legs: '#2a2a30', hat: 'helmet', hatCol: '#8a8a94', prop: 'spear', armR: 'hold', flip: -1, seed: 2463 });
    for (let i = 0; i < 3; i++) human(30 + i * 74, 1446 + (i % 2) * 16, 0.6, t, { body: PPL.ming[i], long: 1, hat: 'samo', beard: i === 1, seed: 2464 + i, look: [0.6, -0.2] });
    // курильница-треножник с дымом
    push(190, 1470, 1); for (const k of [-1, 0, 1]) pencil([[k * 26, -40], [k * 34, 0]], { w: 7, col: '#5a4a2a', pass2: false }); blob([[-46, -40], [-56, -92], [56, -92], [46, -40]], { wash: '#8a6a2a', washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.3, col: '#3a2a0a', ang: 0.6 } }); rect(-50, -104, 100, 14, { wash: '#a88a3a', washA: 1, w: 1.8, col: L }); pop();
    for (let k = 0; k < 5; k++) { const ph = (t * 0.25 + k / 5) % 1; ell(190 + Math.sin(ph * 6 + k) * 30, 1360 - ph * 330, 20 + ph * 44, 16 + ph * 30, { wash: '#f0d8c0', washA: 0.3 * (1 - ph), line: false }); }
    // бронзовый журавль
    push(1190, 1470, 0.9); rect(-40, -30, 80, 30, { wash: BJ.stone, washA: 1, w: 2, col: L }); pencil([[-8, -30], [-8, -110]], { w: 4, col: '#4a6a5a', pass2: false }); pencil([[10, -30], [10, -110]], { w: 4, col: '#4a6a5a', pass2: false }); blob([[-50, -120], [0, -170], [50, -130], [10, -100]], { wash: '#4a7a66', washA: 1, w: 2.2, col: L }); pencil(spline([[40, -140], [70, -200], [56, -250]], false, 8), { w: 8, col: '#4a7a66', pass2: false }); pencil([[56, -250], [96, -244]], { w: 4, col: '#4a6a5a', pass2: false }); pop();
    // паланкин с носильщиками (справа, уходит за край)
    const bob = Math.sin(t * 5) * 4; push(1260, 1500 + bob, 1); pencil([[-260, -150], [160, -150]], { w: 9, col: BJ.woodD, pass2: false }); rect(-110, -300, 220, 230, { wash: BJ.gold, washA: 1, w: 2.6, col: L, shade: { gap: 9, a: 0.2, col: BJ.goldD, ang: 1.2 } }); rect(-70, -260, 140, 120, { wash: '#5a1410', washA: 1, w: 2, col: L }); roofCN(0, -296, 240, 60, { ev: 26, col: BJ.red, colD: BJ.redD }); pop();
    human(1020, 1520 + bob * 0.5, 0.52, t, { body: '#4a6a8a', legs: '#2a2a30', hat: 'straw', seed: 2470, flip: -1 }); human(1150, 1560, 0.3, t, { body: '#e8e0d0', long: 1, hat: 'bun', seed: 2471 });
    for (const [x, y] of [[60, 1560], [120, 1580]]) crateW(x, y, 90, 60, { col: '#8a2a1a', label: '貢', lc: BJ.gold, ls: 34 });
    lightPool(DX + DW / 2 - 200, 1520, 520, 100, 'rgba(255,214,140,1)', 0.5 * open(t) / 0.42);
    for (const [x, len] of [[545, 300], [1010, 300], [480, 260], [1080, 260], [190, 200]]) castShadow(x, 1445, 80, len, 0.95, 0.32);
    moodDark(DX + DW / 2, 1100, 500, 1500, '#1a0a30', 0.25 + 0.3 * d);
  }
  function ground(t) {                                              // плиты двора, «императорская дорога» к воротам
    shape([[-900, 1410], [2000, 1410], [2000, 2500], [-900, 2500]], { wash: '#9a6452', washA: 1, line: false });
    shape([[DX - 10, 1410], [DX + DW + 10, 1410], [DX + DW + 340, 2500], [DX - 520, 2500]], { wash: '#c8946a', washA: 1, w: 2, col: '#5a3a28' });
    for (let i = 0; i < 9; i++) pencil([[-900, 1425 + i * i * 12 + i * 34], [2000, 1425 + i * i * 12 + i * 34]], { w: 1.8, col: '#6a4a38', a: 0.55, pass2: false });
    for (let i = -8; i < 14; i++) pencil([[780 + (i - 3) * 130, 1410], [780 + (i - 3) * 470, 2500]], { w: 1.6, col: '#6a4a38', a: 0.45, pass2: false });
    const r = rng(2472); for (let i = 0; i < 26; i++) { const x = -200 + r() * 1500, y = 1470 + r() * 500; pencil([[x, y], [x + 20 + r() * 40, y + (r() - 0.5) * 16]], { w: 1.4, col: '#5a3a2a', a: 0.5, pass2: false }); }
    ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.35; const g = ctx.createLinearGradient(0, 1410, 0, 2300); g.addColorStop(0, 'rgba(120,60,80,0.2)'); g.addColorStop(1, 'rgba(60,20,50,1)'); ctx.fillStyle = g; ctx.fillRect(-900, 1410, 2900, 1100); ctx.restore();
  }
  function front(t) {                                               // рама: тёмный угол карниза с колокольчиком, силуэт знамени
    roofCN(-150, 520, 700, 240, { sil: '#140810', ev: 90 }); sil([[-520, 500], [-80, 500], [-120, 600], [-520, 600]], '#140810', 1);
    const sw = Math.sin(t * 2) * 0.1; push(170, 470, 1.6, sw); pencil([[0, 0], [0, 40]], { w: 2, col: '#140810', pass2: false }); blob([[-14, 40], [14, 40], [20, 78], [-20, 78]], { wash: '#2a1810', washA: 1, w: 2, col: '#0a0406' }); pop();
    sil([[1290, 2400], [1296, 900], [1316, 900], [1322, 2400]], '#140810', 1); const wv = Math.sin(t * 2.5) * 20; sil([[1316, 920], [1620, 960 + wv], [1600, 1300 - wv], [1316, 1330]], '#2a0c10', 1);
  }
  function hud(t) {
    if (t > EV.pl_500 - 0.05) { const q = popK(t, EV.pl_500 - 0.05, 0.3); push(770, 930, q, -0.03); rect(-200, -84, 400, 168, { wash: '#16080a', washA: 0.9, w: 3, col: BJ.gold });
      txt('ВХОД ЗАПРЕЩЁН', 0, -40, 44, { col: '#ff6a4a', font: 'Osw' }); txt('1420 → 1925', 0, 10, 40, { col: BJ.goldL, font: 'Osw' }); const n = Math.round(lerp(0, 505, sm(clamp((t - EV.pl_500) / 0.8)))); txt(n + ' лет', 0, 56, 40, { col: '#fff0c8', font: 'Hand' }); pop(); }
    if (t > EV.pl_knock && t < EV.pl_knock + 0.6) for (let k = 0; k < 2; k++) txt('тук', 560 + k * 50, 1040 - k * 60, 40, { col: '#ffe8b0', font: 'Hand', rot: -0.2, a: 1 - (t - EV.pl_knock) / 0.6 });
  }
  WORLD.palace = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(24, () => far(t));
    lay(12, () => roofs(t));
    lay(6.5, () => gate(t));
    lay(3.4, () => court(t));
    lay(1, () => { ground(t); lightPool(980, 1620, 700, 150, 'rgba(255,190,110,1)', 0.45 * (1 - dusk(t) * 0.6)); castShadow(330, 1575, 200, 520, 0.95, 0.5); cat(); });
    lay(0.62, () => front(t));
    lay(5, () => motes(30, [-100, 500, 1250, 1400], '#ffe0a0', t, 2473, { sp: 6, vx: 20, sz: 2, a: 0.55, wob: 16, add: 1 }));
    lay(0.8, () => motes(10, [-200, 700, 1300, 1900], '#ffc890', t, 2474, { sp: 9, vx: 40, sz: 8, a: 0.2, wob: 30, add: 1 }));
    haze('#f08a50', 0.05 * (1 - dusk(t)));
  };
  DIR.palace = {
    outfit: 'mingbok', light: { side: 1, rim: '#ffc070' }, grade: ['#c8502a', 0.12],
    act: () => [[S0.palace, 'smug'], [EV.pl_point, 'awe'], [EV.pl_slam + 0.1, 'shock'], [EV.pl_500, 'annoyed'], [EV.pl_knock, 'sideeye']],
    pose: (t, u, b) => { const reach = t > EV.pl_peek && t < EV.pl_slam + 0.1, kn = t > EV.pl_knock - 0.1, kk = kn ? Math.abs(Math.sin((t - EV.pl_knock) * 18)) * 24 : 0, back = t > EV.pl_slam + 0.1 ? sm((t - EV.pl_slam - 0.1) / 0.2) * (1 - sm((t - EV.pl_500) / 0.4)) : 0;
      return Object.assign(b, { x: 330 + (reach ? sm((t - EV.pl_peek) / 0.6) * 90 : 0) * (t < EV.pl_slam + 0.1 ? 1 : 0) - back * 70 + (t > EV.pl_500 ? 60 : 0), y: 1575, s: 1.04, look: [0.9, -0.15],
        walk: reach && t < EV.pl_point ? t * 9 : undefined, hand: reach ? [230, -290] : kn ? [236 - kk, -310] : undefined, point: t > EV.pl_point && t < EV.pl_slam ? 1 : undefined,
        tilt: back ? -0.14 * back : 0, squash: t > EV.pl_slam + 0.1 && t < EV.pl_slam + 0.3 ? 0.14 : b.squash, tailUp: t > EV.pl_slam }); },
    cam: () => [[S0.palace, 600, 860, 0.0], [EV.pl_point, 640, 1040, 0.14], [EV.pl_slam, 700, 1080, 0.24], [EV.pl_slam + 0.2, 620, 1040, 0.08, 'x'], [EV.pl_500, 640, 1000, 0.12], [S1.palace, 680, 1040, 0.2]],
    hud
  };
  TRANS_IN.palace = { a: 0, b: 0.32, fx(k, t, A, B) {             // пламя дракона прожигает экран: из дыры с огненным краем — 1420 год
    drawBuf(B); const r = lerp(160, 1700, Math.sqrt(k));
    scr(() => { ctx.save(); ctx.beginPath(); for (let i = 0; i <= 40; i++) { const a = i / 40 * 6.283, rr = r * (1 + 0.12 * Math.sin(a * 5 + 1.3) + 0.07 * Math.sin(a * 11)); i ? ctx.lineTo(540 + Math.cos(a) * rr, 900 + Math.sin(a) * rr) : ctx.moveTo(540 + Math.cos(a) * rr, 900 + Math.sin(a) * rr); }
      ctx.rect(W, 0, -W, H); ctx.fillStyle = '#ffd23a'; ctx.fill('evenodd'); ctx.lineWidth = 26; ctx.strokeStyle = '#ff7a10'; ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = '#3a0c06'; ctx.stroke(); ctx.restore(); });
  } };
})();
