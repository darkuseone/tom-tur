/* 004 — сцена `names`: дорожный знак на въезде в город, за ним горы. Том-маляр с валиком перекрашивает табличку:
   «ВЕРНЫЙ» (1854) → «АЛМА-АТА» (1921) → «АЛМАТЫ» (1993); с каждым именем меняется транспорт на дороге (телега → автобус ЛиАЗ → машины).
   На «самое старое» прилетает и вырастает серебряная монета XIII в. с надписью «Алматы», подпись «так читают нумизматы».
   Переход В сцену: двери вагона метро съезжаются и разъезжаются. */
(() => {
  EV.nm_v = LS('s11') + 0.05;
  EV.nm_aa = wtw('s11', 'Алма-Ата');
  EV.nm_a = wtw('s11', 'Алматы');
  EV.nm_old = wtw('s11', 'старое:');
  EV.nm_coin = wtw('s11', 'монете');
  KEYW.push('старое:', 'века!');

  const era = t => t < EV.nm_aa ? 0 : t < EV.nm_a ? 1 : 2;
  function sign(t) {                                                     // знак на двух столбах, надпись перекрашивается мазком валика
    const e = era(t), names = ['ВЕРНЫЙ', 'АЛМА-АТА', 'АЛМАТЫ'], yrs = ['1867', '1921', '1990-х'], tc = [EV.nm_v, EV.nm_aa, EV.nm_a][e];
    push(540, 1100, 1); for (const x of [-260, 260]) { pencil([[x, 0], [x, 360]], { w: 16, col: '#8a8e96' }); }
    const p = rect(-330, -150, 660, 170, { wash: e === 0 ? '#e8dcc0' : e === 1 ? '#2a5a9a' : '#1e6aa8', washA: 1, w: 4, col: '#1a1a1a', key: 9951 });
    const m = clamp((t - tc) / 0.35), fresh = e > 0 && m < 1;
    if (fresh) { ctx.save(); ctx.clip(p.path); const prevC = e === 1 ? '#e8dcc0' : '#2a5a9a'; ctx.fillStyle = prevC; ctx.fillRect(-330 + 660 * m, -150, 660, 170); txt(names[e - 1], 0, -50, 96, { font: 'Osw', col: e === 1 ? '#2a1a0a' : '#f6f6f6' }); ctx.restore(); }
    ctx.save(); ctx.clip(p.path); ctx.beginPath(); ctx.rect(-330, -150, fresh ? 660 * m : 660, 170); ctx.clip(); txt(names[e], 0, -50, 96, { font: 'Osw', col: e === 0 ? '#2a1a0a' : '#f6f6f6' }); ctx.restore();
    push(0, 70, 1); rect(-90, -26, 180, 52, { wash: '#f4ecd8', washA: 1, w: 2, col: '#2a1a0a' }); txt((e === 2 ? '' : 'с ') + yrs[e], 0, 4, 34, { font: 'Osw', col: '#a8241e' }); pop();
    if (fresh) { const rx = -330 + 660 * m; push(rx, -65, 1); rect(-14, -100, 28, 200, { wash: '#f4f4f4', washA: 1, w: 2, col: '#3a3a3a' }); pencil([[0, 100], [40, 220]], { w: 6, col: '#c8a040' }); pop(); for (let i = 0; i < 6; i++) { const r = rng(hsh(FRAME, i)); ell(rx + (r() - 0.5) * 60, 40 + r() * 80, 4, 6, { wash: e === 1 ? '#2a5a9a' : '#1e6aa8', washA: 1, line: false }); } }
    pop();
  }
  function road(t) {
    const e = era(t); const rd = poly([[-400, 1500], [1500, 1500], [700, 1240], [380, 1240]], { wash: e === 0 ? '#a8946a' : '#5a5a60', washA: 1, w: 2, col: '#2a2a2a', key: 9960 });
    if (e > 0) for (let k = 0; k < 6; k++) { const u = ((k / 6) + t * 0.5) % 1, y = lerp(1250, 1500, u * u), w = lerp(6, 40, u * u); pencil([[540, y], [540, y + w]], { w: lerp(3, 12, u), col: '#f4f4f4', pass2: false }); }
    if (e === 0) { const x = ((t * 80) % 1400) - 200; push(x, 1300, 0.5); pencil([[-80, -60], [80, -60]], { w: 6, col: '#6a4424' }); for (const wx of [-60, 60]) ell(wx, -30, 30, 30, { wash: 'rgba(0,0,0,0)', washA: 0, w: 4, col: '#4a2c14' }); blob([[100, -60], [110, -120], [200, -126], [220, -80], [200, -50]], { wash: '#8a5a32', washA: 1, w: 2, col: '#2a1608' }); for (const lx of [120, 140, 190, 210]) pencil([[lx, -60], [lx, 0]], { w: 6, col: '#6a4424' }); pop(); }
    if (e === 1) { const x = 1300 - ((t * 160) % 1600); push(x, 1330, 0.6); rect(-160, -150, 320, 130, { wash: '#e8c040', washA: 1, w: 2.4, col: '#2a2a2a' }); rect(-160, -80, 320, 20, { wash: '#c83a2a', washA: 1, line: false }); for (let q = 0; q < 4; q++) rect(-140 + q * 72, -136, 56, 44, { wash: '#8aa8c0', washA: 1, w: 1.4, col: '#2a2a2a' }); for (const wx of [-100, 100]) ell(wx, -14, 24, 24, { wash: '#1a1a1a', washA: 1, line: false }); pop(); }
    if (e === 2) for (let k = 0; k < 3; k++) { const x = ((t * 260 + k * 500) % 1600) - 250; push(x, 1340 + k * 30, 0.5 + k * 0.08); rect(-110, -60, 220, 50, { wash: ['#f4f4f4', '#c81e24', '#2a2a2a'][k], washA: 1, w: 2, col: '#1a1a1a' }); poly([[-70, -60], [-40, -100], [50, -100], [80, -60]], { wash: '#9ab8d0', washA: 1, w: 1.6, col: '#1a1a1a' }); for (const wx of [-70, 70]) ell(wx, -8, 20, 20, { wash: '#1a1a1a', washA: 1, line: false }); pop(); }
  }
  function town(t) {                                                     // силуэт города меняется с эпохой
    const e = era(t), r = rng(9970 + e);
    for (let k = 0; k < 12; k++) { const x = -100 + k * 110, h = e === 0 ? 50 + r() * 30 : e === 1 ? 120 + r() * 160 : 160 + r() * 360, w = 90; const p = rect(x, 1240 - h, w, h, { wash: e === 0 ? '#d8c09a' : e === 1 ? '#c8c0b4' : ['#a8c0d8', '#d8d0c0', '#8aa0b8'][k % 3], washA: 1, w: 1.6, col: '#4a4038' }); if (e > 0) windows(x + 8, 1240 - h + 10, w - 16, h - 20, 3, Math.max(2, Math.round(h / 40)), 9971 + k, 0.2, '#3a4a5a', '#ffe0a0', 0.5); }
    if (e === 2) { const hx = 820; rect(hx - 40, 860, 80, 380, { wash: '#2a4a6a', washA: 1, w: 2, col: '#1a2a3a' }); poly([[hx - 40, 860], [hx, 800], [hx + 40, 860]], { wash: '#2a4a6a', washA: 1, w: 2, col: '#1a2a3a' }); }
    for (let k = 0; k < 10; k++) { const x = -150 + k * 140; pencil([[x, 1250], [x, 1150]], { w: 5, col: '#4a3424' }); blob(ellPts(x, 1080, 24, 90, 0, 0.2, 10), { wash: '#5e8a36', washA: 1, w: 1.4, col: '#1e3a0a' }); }
  }
  function coin(t) {                                                     // монета XIII в. «Алматы»
    if (t < EV.nm_old - 0.05) return; const k = sm((t - EV.nm_old + 0.05) / 0.5), s = lerp(0.2, 1, k), spin = Math.cos(clamp(1 - k) * 6);
    push(540, 780, s); ctx.save(); ctx.scale(Math.max(0.1, Math.abs(spin)), 1);
    const p = blob(ellPts(0, 0, 220, 214, 0.2, 0.08, 18), { wash: '#c8ccd0', washA: 1, w: 5, col: '#4a4e52' }); metalG(p.path, -70, -70, 260, '#ffffff', '#b8bcc0', '#5a5e62');
    pencil(ellPts(0, 0, 180, 176, 0, 0.04, 60), { w: 4, col: '#6a6e72', pass2: false, gap: false }); for (let q = 0; q < 24; q++) { const a = q / 24 * 6.283; ell(Math.cos(a) * 198, Math.sin(a) * 196, 5, 5, { wash: '#7a7e82', washA: 1, line: false }); }
    pencil([[-120, -10], [-90, -40], [-60, -10], [-30, -50], [-10, -10], [20, -40], [50, -12], [80, -46], [110, -10]], { w: 7, col: '#4a4e52', pass2: false });   // «арабская» вязь (условно)
    pencil([[-100, 40], [-40, 30], [20, 50], [100, 34]], { w: 6, col: '#4a4e52', pass2: false }); ell(-20, 80, 6, 6, { wash: '#4a4e52', washA: 1, line: false }); ell(10, 84, 6, 6, { wash: '#4a4e52', washA: 1, line: false });
    ctx.restore(); pop();
    if (t > EV.nm_coin) { push(540, 1060, popK(t, EV.nm_coin, 0.35), -0.03); rect(-260, -52, 520, 104, { wash: '#1a120a', washA: 0.9, w: 3, col: '#d6a842' }); txt('«АЛМАТЫ» · XIII век', 0, -6, 46, { font: 'Osw', col: '#f6ecd6' }); txt('так читают надпись нумизматы', 0, 34, 26, { font: 'Hand', col: '#d6a842' }); pop(); }
  }

  WORLD.names = (t, u, cat) => {
    const e = era(t);
    lay(30, () => { vgrad(-600, 1200, e === 0 ? ['#7ab0d8', '#c8dcea', '#f2e6c8'] : e === 1 ? ['#6a98c8', '#b8d0e4', '#ece4d0'] : ['#4a8ad0', '#a8cce8', '#eaf0f2']); glow(240, 300, 300, 'rgba(255,240,200,1)', 0.45); });
    lay(16, () => { alatau(t, 1000, { s: 1.1, key: 9980 }); haze('#eaeef4', 0.12); });
    lay(6, () => { town(t); haze('#eef0f0', 0.12); });
    lay(2, () => { const g = poly([[-400, 1240], [1500, 1240], [1500, 2400], [-400, 2400]], { wash: e === 0 ? '#9a9a5a' : '#7a9a4a', washA: 1, w: 2, col: '#3a4a1a', key: 9990 }); hatch(g.path, g.bb, { gap: 9, a: 0.14, col: '#3a4a1a', ang: -1.2, key: 9991 }); road(t); });
    lay(1.3, () => sign(t));
    lay(1, () => { cat(); coin(t); });
  };
  DIR.names = {
    outfit: 'painter', light: { side: 1, rim: '#fff0c8' }, grade: ['#d8c090', 0.06],
    act: () => [[S0.names, 'sly'], [EV.nm_aa, 'smug'], [EV.nm_a, 'proud'], [EV.nm_old, 'shock'], [EV.nm_coin, 'awe']],
    pose: (t, u, b) => Object.assign(b, { x: 240, y: 1640, s: 0.95, look: t < EV.nm_old ? [0.7, -0.5] : [0.4, -0.7], prop: 'brush', hand: t < EV.nm_old ? [110, -330 + Math.sin(t * 10) * 20] : undefined, tailUp: t > EV.nm_old, squash: b.squash }),
    cam: () => [[S0.names, 540, 1120, 0.04], [EV.nm_aa, 540, 1100, 0.06], [EV.nm_a, 560, 1080, 0.08], [EV.nm_old, 540, 960, 0], [EV.nm_coin, 540, 940, 0.04], [S1.names, 540, 940, 0.08]]
  };
  // ---------------------------------------------------------------- переход В сцену: двери вагона съезжаются и разъезжаются
  TRANS_IN.names = { a: 0.3, b: 0.35, runA: 0, holdA: true, fx(k, t, A, B) {
    const c = k < 0.5 ? sm(k / 0.5) : 1 - sm((k - 0.5) / 0.5); drawBuf(k < 0.5 ? A : B);
    scr(() => { for (const sd of [-1, 1]) { const x = sd < 0 ? -W / 2 + c * W / 2 : W - c * W / 2; rect(x, 0, W / 2, H, { wash: '#d8e0e6', washA: 1, w: 4, col: '#2a3a4a' }); rect(x + 80, 300, W / 2 - 160, 600, { wash: '#3a5a7a', washA: 1, w: 3, col: '#1a2a3a' }); rect(x + (sd < 0 ? W / 2 - 30 : 0), 0, 30, H, { wash: '#2a2a2a', washA: 1, line: false }); }
      if (c > 0.95) txt('ОСТОРОЖНО, ДВЕРИ…', 540, 1400, 48, { font: 'Osw', col: '#c81e24' }); });
  } };
})();
