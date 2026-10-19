/* 004 — сцена `bell`: 1836–1840, литейный двор у нового собора Рождества. Груда трофейных турецких пушек (с полумесяцами на казёнках),
   плавильная печь, литейная яма. «переплавили» — пушку закатывают в печь, бронза течёт по жёлобу; «в колокол» — из ямы поднимается
   раскалённый колокол и остывает; «шесть с половиной тонн» — бирка «400 ПУДОВ ≈ 6,5 т», доски прогибаются; «В колокольню» — ворот
   поднимает колокол к окну звонницы; «не пролез!» — БУМ о проём, сыплется штукатурка, Том хохочет. Переход В сцену: пороховой дым. */
(() => {
  EV.bl_roll = WT('s7', 'Турецкие') + 0.2;        // пушку катят в печь
  EV.bl_melt = WT('s7', 'переплавили');          // бронза течёт
  EV.bl_rise = WT('s7', 'колокол');              // колокол из ямы
  EV.bl_ton = WT('s7', 'тонн.');                 // бирка, прогиб
  EV.bl_hoist = WT('s7', 'колокольню');          // подъём
  EV.bl_bonk = WT('s7', 'пролез!') - 0.05;        // удар о проём
  SHAKES.push([EV.bl_ton, 0.3, 12], [EV.bl_bonk, 0.45, 22]);
  KEYW.push('пушки', 'колокол', 'тонн.', 'пролез!');

  const fade = (t, a, b) => clamp((t - a) / (b - a));
  const BX = 820, BY = 1500, BS = 0.9;            // колокольня
  const WINY = BY - 427 * BS, WINW = 124 * 0.6 * BS; // подоконник окна 2-го яруса и полуширина проёма
  function sky(t) { vgrad(-900, 1300, ['#6a8ab8', '#b8c8d8', '#f0d8b0']); glow(200, 300, 400, 'rgba(255,236,200,1)', 0.4);
    for (let k = 0; k < 4; k++) { const r = rng(10200 + k), cx = ((r() * 1700 + t * 9) % 1900) - 400, cy = 100 + r() * 300; for (let q = 0; q < 5; q++) ell(cx + q * 64 - 128, cy - Math.sin(q / 4 * Math.PI) * 30, 70, 36, { wash: '#fbf4e8', washA: 0.8, line: false }); } }
  function town(t) {                              // дальний Кишинёв 1830-х: черепичные крыши, церкви, тополя
    for (let k = 0; k < 9; k++) { const r = rng(10210 + k); bHouse(-300 + k * 200, 1200, 180, 80, { seed: 60 + k, roof: k % 3 ? 'tile' : 'reed', s: 0.55, t, smoke: k % 4 === 0 }); }
    for (let k = 0; k < 8; k++) { const r = rng(10220 + k); poplar(-250 + k * 230 + r() * 50, 1200, 200 + r() * 80, t, 10220 + k, '#5a7a4a'); }
    haze('#e8dcc8', 0.3);
  }
  function cannon(x, y, s, rot, seed) {           // турецкая бронзовая пушка: ствол с поясами, казёнка с полумесяцем, лафет
    push(x, y, s, rot); const L = '#1a1008';
    const b = shape([[-150, -26], [140, -18], [150, -24], [160, -24], [160, 24], [150, 24], [140, 18], [-150, 26], [-170, 20], [-176, 0], [-170, -20]], { wash: '#a87a3a', washA: 1, w: 2.4, col: L });
    metalG(b.path, -40, -20, 120, '#f0d08a', '#a87a3a', '#4a3010'); for (const xx of [-120, -40, 60, 130]) pencil([[xx, -24], [xx, 24]], { w: 3, col: '#5a3a14', a: 0.8, pass2: false });
    ell(-188, 0, 12, 12, { wash: '#8a6020', washA: 1, w: 1.8, col: L }); pencil(ellPts(-90, 0, 12, 12, 0.9, 0.4, 14), { w: 3, col: '#f6e0a0', pass2: false });   // полумесяц
    ell(160, 0, 6, 16, { wash: '#1a1008', washA: 1, line: false });
    pop();
  }
  function cannons(t) {                           // груда трофейных пушек + пушка, которую катят в печь
    for (let i = 0; i < 7; i++) { const r = rng(10230 + i); cannon(80 + (i % 4) * 90 + r() * 20, 1520 - Math.floor(i / 4) * 54 - r() * 6, 0.72, (r() - 0.5) * 0.2, i); }
    const k = sm(fade(t, EV.bl_roll, EV.bl_melt)), cx = lerp(420, 300, k), cy = 1420 - 60 * k;
    if (k < 0.98) { cannon(cx, cy, 0.55, -0.35 * k, 9); human(cx + 120, 1450, 0.66, t, { body: '#efe6d0', bodyD: '#a89a7a', belt: '#5a3a1e', hair: '#3a2a1a', beard: 'short', face: 'angry', armL: 'point', armR: 'point', seed: 1241, flip: -1 }); }
  }
  function furnace(x, y, s, t) {                  // плавильная печь: кирпичный купол, жерло, жёлоб с бронзой
    push(x, y, s); const L = '#1a0a06';
    const p = blob([[-170, 0], [-160, -170], [-90, -260], [0, -280], [90, -260], [160, -170], [170, 0]], { wash: '#7a3a24', washA: 1, w: 3, col: L, shade: { gap: 7, a: 0.32, col: '#1a0804', ang: 1.2 } });
    ctx.save(); ctx.clip(p.path); ctx.strokeStyle = 'rgba(20,8,4,0.45)'; ctx.lineWidth = 1.6; ctx.beginPath(); for (let yy = -270; yy < 0; yy += 24) { ctx.moveTo(-180, yy); ctx.lineTo(180, yy); } ctx.stroke(); glow(60, -100, 160, 'rgba(255,120,40,1)', 0.35); ctx.restore();
    const fl = 0.8 + 0.2 * Math.sin(t * 23); const m = blob([[-60, 0], [-54, -80], [0, -110], [54, -80], [60, 0]], { wash: '#ffcf6a', washA: 1, w: 2.6, col: L });
    ctx.save(); ctx.clip(m.path); glow(0, -20, 100, 'rgba(255,250,210,1)', fl); for (let k = 0; k < 5; k++) { const r = rng(hsh(FRAME, k, 7)); blob([[-30 + k * 14, 0], [-20 + k * 14 + (r() - 0.5) * 20, -54 - r() * 30], [-8 + k * 14, 0]], { wash: k % 2 ? '#ff7a2a' : '#ffe08a', washA: 0.9, line: false }); } ctx.restore();
    glow(0, -40, 280, 'rgba(255,140,50,1)', 0.5 * fl);
    rect(-30, -380, 60, 110, { wash: '#5a2a1c', washA: 1, w: 2.6, col: L });
    for (let k = 0; k < 5; k++) { const ph = (t * 0.45 + k / 5) % 1; glow(Math.sin(ph * 6) * 40, -400 - ph * 520, 50 + ph * 160, 'rgba(70,62,60,1)', 0.55 * (1 - ph), 'source-over'); }
    pop();
  }
  function trough(t) {                            // жёлоб от печи к яме: течёт расплав
    const k = fade(t, EV.bl_melt, EV.bl_rise + 0.2); if (k <= 0) return;
    const P = [[330, 1380], [500, 1420], [700, 1440]]; pencil(P, { w: 28, col: '#3a2a1a', pass2: false });
    if (k < 1) { const n = Math.max(2, Math.ceil(3 * Math.min(1, k * 3))); pencil(P.slice(0, n), { w: 16, col: '#ffb040', pass2: false, gap: false }); pencil(P.slice(0, n), { w: 6, col: '#fff6c8', pass2: false, gap: false }); for (const [x, y] of P.slice(0, n)) glow(x, y, 120, 'rgba(255,190,90,1)', 0.6);
      for (let i = 0; i < 12; i++) { const r = rng(hsh(FRAME, i, 22)), a = -Math.PI * r(), v = 60 + r() * 200; glow(700 + Math.cos(a) * v * r(), 1440 + Math.sin(a) * v * r(), 6, 'rgba(255,230,150,1)', 0.9); } }
  }
  function bellNow(t) {                           // колокол: в яме → подъём (горячий→остывший) → ворот к окну → удар о проём
    const rise = sm(fade(t, EV.bl_rise, EV.bl_rise + 0.6)), cool = 1 - sm(fade(t, EV.bl_rise + 0.2, EV.bl_ton + 0.2)), hoist = sm(fade(t, EV.bl_hoist, EV.bl_bonk));
    const by0 = 1900 - 640 * rise, by1 = WINY + 250, y = lerp(by0, by1, hoist), bonk = t > EV.bl_bonk ? Math.exp(-(t - EV.bl_bonk) * 5) * Math.sin((t - EV.bl_bonk) * 30) : 0;
    const x = BX + 0, sw = Math.sin(t * 2.2) * 0.04 * hoist + bonk * 0.06;
    // канат через блок на балке
    if (hoist > 0 || t > EV.bl_ton) { pencil([[x, y - 330], [x, WINY - 320]], { w: 4, col: '#c8b088', pass2: false }); pencil([[x, WINY - 320], [1080, 1400]], { w: 4, col: '#c8b088', pass2: false }); ell(x, WINY - 320, 18, 18, { wash: '#6a4428', washA: 1, w: 2, col: '#1a0e06' }); }
    if (t < EV.bl_rise - 0.02) return;
    ctx.save(); if (hoist < 0.01) { ctx.beginPath(); ctx.rect(-500, -500, 2600, 1556 + 500); ctx.clip(); }
    kBell(x + bonk * 10, y + (t > EV.bl_bonk ? -Math.max(0, bonk) * 20 : 0), 0.36, t, { hot: cool * rise, swing: sw });
    ctx.restore(); if (rise < 1) glow(x, 1550, 300, 'rgba(255,190,90,1)', 0.6 * (1 - rise * 0.5));
    if (t > EV.bl_ton - 0.05 && hoist < 0.3) { const k = popK(t, EV.bl_ton, 0.35); push(x + 140, y - 160, k, 0.08); rect(-110, -40, 220, 80, { wash: '#efe2c4', washA: 1, w: 2.4, col: '#3a2a1a' }); txt('400 ПУДОВ', 0, -10, 34, { font: 'Osw', col: '#3a2a1a' }); txt('≈ 6,5 т', 0, 24, 28, { font: 'Hand', col: '#a8302a' }); pencil([[-80, -40], [-120, -100]], { w: 2, col: '#3a2a1a', pass2: false }); pop(); }
    if (t > EV.bl_bonk && t < EV.bl_bonk + 1) { const q = t - EV.bl_bonk; for (let i = 0; i < 18; i++) { const r = rng(10240 + i), xx = x + (r() - 0.5) * 2 * WINW * 1.6, yy = WINY - 40 + q * 500 * (0.5 + r()) + q * q * 300; ell(xx, yy, 3 + r() * 5, 3 + r() * 4, { wash: '#efe6d2', washA: 0.9 * (1 - q), line: false }); }
      for (let k = 0; k < 5; k++) glow(x - 120 + k * 60, WINY - 20, 100 + q * 100, 'rgba(240,230,210,1)', 0.4 * (1 - q), 'source-over'); }
  }
  function windlass(t) {                          // ворот с рабочими
    push(1080, 1440, 0.8); const L = '#1a0e06', rot = t > EV.bl_hoist ? (t - EV.bl_hoist) * 6 : 0;
    rect(-80, -160, 20, 160, { wash: '#6a4428', washA: 1, w: 2, col: L }); rect(60, -160, 20, 160, { wash: '#6a4428', washA: 1, w: 2, col: L }); ell(0, -130, 40, 40, { wash: '#8a5a32', washA: 1, w: 2.2, col: L });
    for (let q = 0; q < 4; q++) { const a = rot + q * Math.PI / 2; pencil([[0, -130], [Math.cos(a) * 110, -130 + Math.sin(a) * 110]], { w: 7, col: '#7a5432', pass2: false }); }
    pop();
    human(1000, 1470, 0.58, t, { body: '#efe6d0', bodyD: '#a89a7a', belt: '#a8302a', hair: '#3a2a1a', beard: 'short', face: t > EV.bl_bonk ? 'shock' : 'angry', armL: 'point', armR: 'point', seed: 1251 });
    human(1160, 1460, 0.56, t, { body: '#8a6a4a', bodyD: '#4a3420', hat: 'fur', hatCol: '#2a2420', hair: '#3a2a1a', beard: 'long', face: t > EV.bl_bonk ? 'shock' : 'angry', armL: 'point', armR: 'point', seed: 1252, flip: -1 });
  }
  function yard(t) {
    poly([[-600, 1340], [1700, 1320], [1700, 2400], [-600, 2400]], { wash: '#a89070', washA: 1, line: false }); vgrad(1320, 2000, ['#b09a78', '#8a7458', '#6a5640']);
    ell(BX, 1560, 260, 50, { wash: '#2a1a10', washA: 1, w: 2.4, col: '#1a0e06' }); ell(BX, 1556, 220, 36, { wash: '#4a3020', washA: 1, line: false });   // литейная яма
    for (let i = 0; i < 30; i++) { const r = rng(10250 + i); ell(-300 + r() * 1600, 1360 + Math.pow(r(), 1.3) * 560, 8, 4, { wash: '#6a5640', washA: 0.7, line: false }); }
    for (let k = 0; k < 4; k++) rect(450 + k * 26, 1360 - k * 6, 120, 18, { wash: '#8a6038', washA: 1, w: 1.6, col: '#2a1a0e' });   // доски
  }

  WORLD.bell = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(14, () => town(t));
    lay(6, () => { push(-60, 1300, 0.55); kCathedral(0, 0, 1, t, {}); pop(); for (let i = 0; i < 4; i++) { const r = rng(10260 + i); pencil([[-260 + i * 40, 1300], [-260 + i * 40, 700]], { w: 4, col: '#7a5432', a: 0.7, pass2: false }); } haze('#e8dcc8', 0.1); });
    lay(2, () => { yard(t); kBelfry(BX, BY, BS, t, { win: 1, winW: 0.6 }); furnace(240, 1400, 0.82, t); trough(t); bellNow(t); });
    lay(1.6, () => { cannons(t); windlass(t); });
        lay(1, () => cat());
    lay(0.6, () => { pencil([[-40, -200], [-30, 2200]], { w: 60, col: '#2a1608' }); for (let y = 300; y < 2000; y += 360) pencil([[-60, y], [90, y + 30]], { w: 10, col: '#3a2010', pass2: false }); cannon(1020, 1960, 1.3, 0.1, 99); });
    motes(50, [0, 300, W, 1800], '#ffc070', t, 71, { sp: -50, sz: 2.4, a: 0.7, add: 1, wob: 30, tw: 1 });
  };

  DIR.bell = {
    outfit: 'founder', light: { side: -1, rim: '#ff9a40' }, grade: ['#8a4a1a', 0.18],
    act: () => [[S0.bell, 'proud'], [EV.bl_melt, 'awe'], [EV.bl_rise, 'grin'], [EV.bl_ton, 'shock'], [EV.bl_hoist, 'suspicious'], [EV.bl_bonk, 'shock'], [EV.bl_bonk + 0.3, 'laugh']],
    pose: (t, u, b) => {
      const o = { x: 600, y: GY + 70, s: 1.0, look: [-0.6, -0.1] };
      if (t < EV.bl_rise) { o.hand = [-150, -260]; o.point = 1; o.flip = true; o.look = [0.6, -0.1]; }
      else if (t < EV.bl_hoist) { o.look = [0.7, -0.3]; o.hand = [150, -320]; o.point = 1; if (t > EV.bl_ton) { const j = Math.max(0, Math.sin((t - EV.bl_ton) * 9)) * 40 * Math.exp(-(t - EV.bl_ton) * 3); o.y -= j; } }
      else if (t < EV.bl_bonk) { o.look = [0.6, -0.8]; o.hand = [120, -330]; o.handF = [-60, -300]; }
      else { o.look = [0, 0]; o.hand = [60, -170]; o.handF = [-60, -170]; o.tilt = 0.08 * Math.sin(t * 11); o.squash = 0.05 * Math.sin(t * 22); }
      return Object.assign(b, o);
    },
    cam: () => [[S0.bell, 420, 1080, 0.04], [EV.bl_melt, 460, 1100, 0.08], [EV.bl_rise, 620, 1120, 0.06], [EV.bl_ton, 680, 1080, 0.1], [EV.bl_hoist, 680, 1000, 0.02], [EV.bl_bonk, 700, 920, 0.06], [EV.bl_bonk + 0.2, 700, 960, 0.0, 'x'], [S1.bell, 680, 980, 0.0]],
    hud: t => { if (t > EV.bl_bonk + 0.1) note('БУМ.', 820, 520, t, EV.bl_bonk + 0.1, S1.bell + 0.2, '#fff6dc', 80, -0.05); if (t > EV.bl_roll && t < EV.bl_rise) note('трофейные турецкие пушки', 400, 1760, t, EV.bl_roll, EV.bl_rise, '#fff0d8', 44, -0.03); }
  };

  // ---------------------------------------------------------------- переход В сцену: пороховой дым дуэли заволакивает кадр, из дыма — литейный двор
  TRANS_IN.bell = { a: 0.3, b: 0.45, runA: 1, fx(k, t, A, B) {
    if (k < 0.5) drawBuf(A, 1 + k * 0.08); else drawBuf(B, 1.06 - 0.06 * sm((k - 0.5) / 0.5));
    const d = Math.sin(Math.PI * clamp(k));
    scr(() => { for (let i = 0; i < 46; i++) { const r = rng(i * 13 + 2), x = r() * W + (r() - 0.5) * 300 * k, y = r() * H - 200 * k * r(), R = 200 + r() * 360; glow(x, y, R * (0.4 + d), `rgba(${210 + r() * 20},${206 + r() * 20},${200 + r() * 16},1)`, 0.9 * d, 'source-over'); }
      if (k > 0.5) for (let i = 0; i < 30; i++) { const r = rng(hsh(FRAME, i, 5)); glow(r() * W, r() * H, 8, 'rgba(255,190,90,1)', d); } });
  } };
})();
