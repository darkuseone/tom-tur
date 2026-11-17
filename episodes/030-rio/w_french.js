/* 030 — сцена `french`: 1555 → 1565. Сначала КАРТА-ИНФОГРАФИКА залива Гуанабара (стандарт 18.11.2026): на «французы» синей зоной
   загорается «АНТАРКТИЧЕСКАЯ ФРАНЦИЯ · 1555» и форт Колиньи на острове; на «выбили» с океана идут красные стрелки португальцев,
   форт перечёркивается; на «основали» камера ныряет в звезду «1565» у Сахарной Головы → берег у подножия горы: частокол строится,
   солдаты в морионах, плотники, каменный столб «1565», на острове вдали дымит сгоревший форт. Том (колонист) забивает кол.
   Переход В: пушечный дым над картой. Главный свет — полуденное солнце (сцена), карта — бумажная, тёплая. */
(() => {
  EV.fr_fr = wtk('s3', 'французы!');
  EV.fr_out = wtk('s3', 'выбили');
  EV.fr_found = wtk('s3', 'основали');
  KEYW.push('французы!', 'выбили', 'город.');
  const L = RJ.ink, SW = EV.fr_found - 0.1, FORT = [-43.163, -22.912], FOUND = [-43.163, -22.948];
  const FR = [[-43.175, -22.9], [-43.15, -22.9], [-43.148, -22.922], [-43.172, -22.925]];
  function mapBeat(t) {                                               // карта залива, экранные координаты
    MAPON = t; scr(() => { const zk = clamp((t - SW + 0.25) / 0.25), sc = 1 + Math.pow(zk, 3) * 6;
      const P = GLOBE.map(540, 960, 1500, -43.15, -22.88, { sea: '#4a7aa8', land: '#d8c898' });
      ctx.save(); ctx.translate(540, 980); ctx.scale(sc, sc); ctx.translate(-540, -980);
      GLOBE.fill([[-44, -22.6], [-42.6, -22.6], [-42.6, -23.2], [-44, -23.2]].map(P), '#d8c898'); GLOBE.fill(OCEAN.map(P), '#4a7aa8'); GLOBE.fill(BAY.map(P), '#5a8ab8');
      pencil(OCEAN.slice(0, 13).map(P), { w: 5, col: L, a: 0.85, pass2: false, gap: false }); pencil(BAY.concat([BAY[0]]).map(P), { w: 4, col: L, a: 0.8, pass2: false, gap: false });
      GLOBE.fill([[-43.3, -22.93], [-43.22, -22.9], [-43.18, -22.94], [-43.24, -22.98], [-43.32, -22.97]].map(P), '#7a9a5a'); GLOBE.fill([[-43.1, -22.9], [-43.02, -22.88], [-42.98, -22.93], [-43.06, -22.95]].map(P), '#7a9a5a');
      const rr = rng(6440); for (let i = 0; i < 40; i++) { const lo = -43.35 + rr() * 0.15, la = -22.86 - rr() * 0.12, [x, y] = P([lo, la]); ell(x, y, 10, 8, { wash: '#4a7a3a', washA: 0.7, line: false }); }
      txt('НИТЕРОЙ', P([-43.06, -22.9])[0], P([-43.06, -22.9])[1], 30, { col: '#3a2a10', font: 'Osw' });
      push(880, 1420, 1); for (let q = 0; q < 4; q++) { const a = q * Math.PI / 2; poly([[0, 0], [Math.cos(a - 0.3) * 30, Math.sin(a - 0.3) * 30], [Math.cos(a) * 80, Math.sin(a) * 80], [Math.cos(a + 0.3) * 30, Math.sin(a + 0.3) * 30]], { wash: q % 2 ? '#f0e2c0' : '#8a3a1a', washA: 1, w: 2, col: L }); } txt('N', 0, -100, 30, { col: L, font: 'Osw' }); pop();
      for (const [lo, la] of [[-43.05, -23.04], [-43.3, -23.05]]) { const [x, y] = P([lo, la]); shipRJ(x, y, 0.16, t, 'caravel', lo * 10, { stripe: '#c8281e' }); }
      const [sx, sy] = P(RIO.sugar); blob([[sx - 30, sy + 10], [sx - 20, sy - 34], [sx, sy - 50], [sx + 20, sy - 34], [sx + 30, sy + 10]], { wash: RJ.rock, washA: 1, w: 2, col: L });
      txt('ЗАЛИВ ГУАНАБАРА', P([-43.12, -22.78])[0], P([-43.12, -22.78])[1], 36, { col: '#e8f6ff', font: 'Osw' }); txt('АТЛАНТИКА', 540, 1520, 44, { col: '#cfe6f8', font: 'Osw' });
      if (t > EV.fr_fr - 0.1) { const k = clamp((t - EV.fr_fr + 0.1) / 0.4); GLOBE.zone(P, FR, '#2a5ae8', 0.65 * k, { w: 6 }); const [fx, fy] = P(FORT); push(fx, fy, 1.7 * popK(t, EV.fr_fr, 0.3)); rect(-30, -40, 60, 40, { wash: '#e8e4dc', washA: 1, w: 2, col: L }); for (let q = 0; q < 4; q++) rect(-30 + q * 17, -52, 10, 12, { wash: '#e8e4dc', washA: 1, w: 1.2, col: L }); pop();
        GLOBE.city(P, -43.18, -22.89, 'ФРАНЦУЗЫ · 1555', { left: true, col: '#2a5ae8', size: 40, k }); }
      if (t > EV.fr_out - 0.1) { const k = clamp((t - EV.fr_out + 0.1) / 0.6); GLOBE.route(P, [[-43.1, -23.08], FORT], k, { col: '#e8281e', bend: 0.2, label: 'ПОРТУГАЛЬЦЫ', t, t0: EV.fr_out + 0.3, lx: 90 }); GLOBE.route(P, [[-43.25, -23.07], [-43.17, -22.93]], clamp(k * 1.1 - 0.1), { col: '#e8281e', bend: -0.2 });
        if (k > 0.8) { const [fx, fy] = P(FORT); pencil([[fx - 50, fy - 60], [fx + 50, fy + 20]], { w: 10, col: '#e8281e', pass2: false }); pencil([[fx + 50, fy - 60], [fx - 50, fy + 20]], { w: 10, col: '#e8281e', pass2: false }); } }
      if (t > SW - 0.4) { const [x, y] = P(FOUND), k = popK(t, SW - 0.4, 0.3); push(x, y, k); poly([[0, -40], [12, -12], [42, -12], [18, 6], [26, 36], [0, 18], [-26, 36], [-18, 6], [-42, -12], [-12, -12]], { wash: RJ.goldL, washA: 1, w: 2.4, col: L }); pop(); GLOBE.city(P, FOUND[0], FOUND[1], '1565 · ОСНОВАН РИО', { col: RJ.gold, size: 40, k }); }
      ctx.restore(); if (zk > 0.6) { ctx.save(); ctx.globalAlpha = (zk - 0.6) / 0.4; ctx.fillStyle = '#fffbe8'; ctx.fillRect(0, 0, W, H); ctx.restore(); } });
  }
  // ---------- 1565: берег у Сахарной Головы
  function sky(t) { vgrad(-900, 1050, ['#2a7ad0', '#7ab8e8', '#d8eef4', '#fff0c8'], 1); glow(880, 380, 200, 'rgba(255,240,190,1)', 0.4); ell(880, 380, 56, 56, { wash: '#fffbe0', washA: 1, line: false }); }
  function far(t) { seaKR(1000, 1180, t, 6401, { cols: ['#3ab0c8', '#1e8ab8', '#0e5a8a'], glint: '#fff6d0', gx: 820, n: 20 }); push(300, 1060, 0.5); rect(-80, -60, 160, 60, { wash: '#6a6460', washA: 1, w: 2, col: L }); for (let q = 0; q < 4; q++) pencil([[-60 + q * 40, -60], [-50 + q * 40, -100]], { w: 6, col: '#2a2420', pass2: false }); pop();
    for (let q = 0; q < 6; q++) { const ph = (t * 0.3 + q / 6) % 1; ell(300 + ph * 80, 1000 - ph * 300, 40 + ph * 60, 30 + ph * 40, { wash: '#4a4448', washA: 0.6 * (1 - ph), line: false }); } sugarloaf(1000, 1080, 0.9, t, { cable: false }); depthFog('#e0f0f4', 0.04); }
  function camp(t) {                                                 // частокол, хижины, солдаты, плотники, лодки
    rect(-500, 1180, 2200, 220, { wash: RJ.sand, washA: 1, w: 2, col: L });
    const up = clamp((t - SW) / 1.0); for (let i = 0; i < 18; i++) { const x = -300 + i * 70, h = 220 * (i < 6 + up * 12 ? 1 : 0); if (h) { pencil([[x, 1300], [x, 1300 - h]], { w: 18, col: '#8a5a32', pass2: false }); poly([[x - 9, 1300 - h], [x, 1300 - h - 26], [x + 9, 1300 - h]], { wash: '#8a5a32', washA: 1, w: 1.4, col: L }); } }
    for (const x of [520, 760]) { push(x, 1320, 0.8); blob([[-110, 0], [-90, -110], [0, -170], [90, -110], [110, 0]], { wash: '#c8a058', washA: 1, w: 2, col: L, shade: { gap: 4, a: 0.3, col: '#7a5a2a', ang: 1.4 } }); pop(); }
    const P = [[-180, '#8a8e94', 'helmet', 'spear'], [-60, '#8a8e94', 'helmet', 'spear'], [880, '#6a3a2a', 'brim', 'axe'], [980, '#2a2a3a', 'hood', 'hold'], [1100, '#8a8e94', 'helmet', 'spear'], [1220, '#7a4a2a', null, 'axe']];
    P.forEach(([x, c, h, pr], i) => human(x, 1340, 0.62, t, { body: c, hat: h, hatCol: h === 'helmet' ? '#a8acb0' : '#2a1a10', beard: '#3a2410', legs: '#3a2a1a', armR: pr === 'axe' ? 'swing' : 'hold', prop: pr === 'hold' ? undefined : pr, long: h === 'hood' ? 1 : undefined, flip: x > 600 ? -1 : 1, seed: 6410 + i, face: 'calm' }));
  }
  function ground(t) {                                               // песок, каменный столб «1565», бочки, ящики, канаты, якорь
    rect(-500, 1400, 2200, 900, { wash: '#f0dcae', washA: 1, w: 2, col: L }); const r = rng(6420); for (let i = 0; i < 50; i++) ell(r() * 2000 - 400, 1420 + r() * 480, 4 + r() * 6, 3 + r() * 3, { wash: '#d8bc8a', washA: 1, line: false });
    lightPool(700, 1640, 700, 160, 'rgba(255,240,190,1)', 0.35);
    push(760, 1700, 1); rect(-50, -300, 100, 300, { wash: '#d8d0c0', washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.2, col: '#8a8070', ang: 1.4 } }); rect(-64, -330, 128, 30, { wash: '#c8c0b0', washA: 1, w: 2, col: L }); txt('1565', 0, -200, 40, { col: L, font: 'Osw' }); pop();
    for (const [x, y] of [[1000, 1720], [1080, 1750]]) { push(x, y, 1); ell(0, -50, 46, 56, { wash: '#6a4424', washA: 1, w: 2, col: L }); for (const yy of [-80, -20]) pencil([[-44, yy], [44, yy]], { w: 4, col: '#2a2a30', pass2: false }); pop(); }
    push(-40, 1760, 1); rect(-70, -60, 140, 60, { wash: '#8a6a3a', washA: 1, w: 2, col: L }); pop(); push(140, 1860, 1); pencil([[0, 0], [0, -100]], { w: 8, col: '#3a3a40', pass2: false }); pencil([[-40, -20], [0, 0], [40, -20]], { w: 8, col: '#3a3a40', pass2: false }); pop();
    for (let q = 0; q < 3; q++) { push(460 + q * 40, 1600, 1, 0.2); pencil([[0, 0], [0, -120]], { w: 14, col: '#8a5a32', pass2: false }); pop(); }
    castShadow(330, 1640, 120, 480, -0.4, 0.35); moodDark(-100, 900, 900, 1800, '#0e2a3a', 0.25);
  }
  WORLD.french = (t, u, cat) => {
    if (t < SW) { lay(1, () => mapBeat(t)); return; }
    lay(40, () => sky(t)); lay(18, () => far(t)); lay(3.2, () => camp(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => { for (const x of [-140, 1230]) sil([[x - 80, 2300], [x - 60, 1600], [x + 60, 1560], [x + 80, 2300]], '#0e2016', 1); });
    if (t < SW + 0.3) scr(() => { ctx.save(); ctx.globalAlpha = 1 - (t - SW) / 0.3; ctx.fillStyle = '#fffbe8'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
  };
  DIR.french = {
    outfit: 'colono', light: { side: 1, rim: '#fff0c0' }, grade: ['#3a2a1a', 0.05],
    act: () => [[S0.french, 'suspicious'], [EV.fr_fr, 'shock'], [EV.fr_out, 'grin'], [EV.fr_found, 'proud']],
    pose: (t, u, b) => { const k = clamp((t - SW) / 0.6); return Object.assign(b, { x: lerp(200, 330, sm(k)), y: 1640, s: 0.95, walk: k < 1 ? t * 9 : 0, look: [0.8, -0.3], hand: [180, -320 + Math.abs(Math.sin(t * 7)) * -60] }); },
    afterCat: (t, u, P) => { if (t < SW) return; const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; push(x, y, 1, -0.8 + Math.sin(t * 7) * 0.5); pencil([[0, 20], [0, -110]], { w: 7, col: RJ.woodD, pass2: false }); rect(-30, -140, 60, 32, { wash: '#6a6a72', washA: 1, w: 2, col: L }); pop(); },
    cam: () => [[S0.french, 540, 960, 0], [SW - 0.01, 540, 960, 0], [SW, 600, 940, -0.08], [S1.french, 500, 1080, 0.1]]
  };
  TRANS_IN.french = { a: 0.08, b: 0.36, fx(k, t, A, B) {            // пушечный дым: клубы закрывают кадр и расходятся
    const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI), r = rng(6430); for (let i = 0; i < 26; i++) ell(r() * W, r() * H, 200 + r() * 260, 160 + r() * 200, { wash: i % 2 ? '#e8e4dc' : '#b8b4ac', washA: 0.95 * a, line: false }); if (e < 0.3) glow(540, 960, 500, 'rgba(255,220,150,1)', 0.6 * (1 - e / 0.3)); }); } };
})();
