/* 036 — сцена `porvoo`, 1809. Порвоо: красные амбары на берегу реки, собор на холме, зима; в соборе сейм — сословия (дворяне,
   духовенство, горожане, крестьяне) присягают Александру I, который клянётся сохранить законы. Главный свет — свечи и окна собора.
   На «забрала Россия» — карта: Финляндия «перетекает» от Швеции к России (стрелка, цвет); на «оставила … законы» — книга законов
   с печатью, плашка «1809 · ПОРВОО: АВТОНОМИЯ, СВОИ ЗАКОНЫ»; Том (сюртук) кладёт лапу на книгу. */
(() => {
  const L = FIC.ink, WIN = [140, 640];
  EV.pv_ru = wtk('s2', 'забрала'); EV.pv_map = wtk('s2', 'восемьсот') - 0.1; EV.pv_law = wtk('s2', 'оставила'); EV.pv_end = wtk('s2', 'законы.');
  KEYW.push('Россия', 'законы.');
  function hall(t) {                                                // собор изнутри: своды, окна, алтарь, кафедра, люстры
    rect(-600, 200, 2400, 1300, { wash: '#e8e0d0', washA: 1, w: 2, col: L, shade: { gap: 14, a: 0.05, col: '#8a8070', ang: 1.4 } }); vgrad(200, 1400, ['#a89880', '#e8e0d0', '#d8ccb8'], 0.5);
    for (let i = 0; i < 4; i++) { const x = -200 + i * 420; pencil(ellPts(x + 210, 520, 210, 200, 0, 0.5, 30).slice(15), { w: 8, col: '#a89880', pass2: false }); }
    for (let i = 0; i < 2; i++) { push(120 + i * 840, 700, 1); rect(-70, -260, 140, 380, { wash: '#a8c8e8', washA: 1, w: 3, col: L }); ell(0, -260, 70, 70, { wash: '#a8c8e8', washA: 1, w: 3, col: L }); for (let q = 0; q < 3; q++) pencil([[-70, -200 + q * 110], [70, -200 + q * 110]], { w: 2, col: L, pass2: false }); pop(); }
    push(540, 900, 1); rect(-160, -200, 320, 260, { wash: '#f4efe4', washA: 1, w: 2.4, col: L }); for (let i = 0; i < 5; i++) pencil([[-140 + i * 70, -180], [-140 + i * 70, 40]], { w: 3, col: '#d8b040', pass2: false }); ell(0, -240, 70, 40, { wash: '#d8b040', washA: 1, w: 2, col: L }); pop();
    for (const x of [300, 780]) { push(x, 320, 1); pencil([[0, -100], [0, 0]], { w: 3, col: '#d8b040', pass2: false }); ell(0, 0, 100, 24, { wash: false, w: 5, col: '#d8b040' }); for (let i = 0; i < 6; i++) { const cx = -80 + i * 32; pencil([[cx, -4], [cx, -30]], { w: 6, col: '#f4efe4', pass2: false }); blob([[cx - 4, -30], [cx, -44 - Math.sin(t * 9 + i) * 3], [cx + 4, -30]], { wash: '#ffd060', washA: 1, line: false }); } glow(0, -30, 100, 'rgba(255,214,140,1)', 0.25); pop(); }
  }
  function estates(t) {                                             // сословия, император у алтаря, писари
    push(540, 1200, 0.75); human(0, 0, 1, t, { body: '#1a3a2a', bodyD: '#0a1a10', hat: null, legs: '#f4f4f0', armR: t > EV.pv_law ? 'wave' : 'hold', seed: 11500, face: 'smile' }); rect(-40, -210, 80, 14, { wash: '#d8b040', washA: 1, line: false }); pop();
    const E = [[60, '#1a1a1e', 'brim'], [160, '#1a1a1e', 'hood'], [260, '#5a4a3a', 'merchant'], [820, '#8a6a4a', 'fur'], [920, '#3a3a44', 'brim'], [1020, '#6a5a3a', 'fur']];
    E.forEach(([x, c, h], i) => human(x, 1250, 0.68, t, { body: c, hat: h, hatCol: '#2a2a2a', legs: '#2a2a2a', long: h === 'hood' ? 1 : undefined, armR: t > EV.pv_law ? 'wave' : 'hold', flip: x > 540 ? -1 : 1, seed: 11510 + i, face: 'calm', beard: i % 2 ? 1 : undefined }));
    for (let i = 0; i < 3; i++) { push(-40 + i * 50 + (i > 1 ? 1100 : 0), 1260, 0.6); rect(-60, -60, 120, 14, { wash: '#5a3a1a', washA: 1, w: 1.4, col: L }); pop(); }
  }
  function floor_(t) { rect(-500, 1330, 2200, 1000, { wash: '#b8a888', washA: 1, w: 2, col: L }); for (let i = 0; i < 12; i++) for (let j = 0; j < 6; j++) rect(-400 + i * 170 + (j % 2) * 85, 1350 + j * 100, 170, 100, { wash: (i + j) % 2 ? '#c8b898' : '#a89878', washA: 1, w: 1, col: L, a: 0.5 });
    for (let i = 0; i < 4; i++) { push(-100 + i * 140 + (i > 1 ? 760 : 0), 1600, 1); rect(-60, -80, 120, 16, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); rect(-60, -200, 16, 200, { wash: '#6a4a2a', washA: 1, w: 1.6, col: L }); pop(); }
    push(540, 1620, 1); rect(-110, -100, 220, 100, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); const o = sm(clamp((t - EV.pv_law) / 0.5)); rect(-90, -140, 180, 40, { wash: '#8a2a1a', washA: 1, w: 2, col: L }); push(0, -140, 1, -o * 0.4); rect(-90, -20, 90, 20, { wash: '#f4efe4', washA: 1, w: 1.4, col: L }); pop(); rect(0, -160, 90, 20, { wash: '#f4efe4', washA: 1, w: 1.4, col: L });
    if (t > EV.pv_end) { push(60, -170, popK(t, EV.pv_end, 0.3) * 0.7); ell(0, 0, 30, 30, { wash: FIC.red, washA: 1, w: 2, col: L }); pop(); } pop();
    lightPool(540, 1580, 800, 180, 'rgba(255,226,170,1)', 0.3); castShadow(400, 1700, 110, 460, 0.6, 0.3); moodDark(100, 1000, 800, 1900, '#1a1008', 0.2); }
  function extras(t) { push(1180, 1500, 0.9); human(0, 0, 1, t, { body: '#3a3a44', legs: '#1a1a1e', armR: 'hold', flip: -1, seed: 11520, face: 'calm' }); rect(-80, -150, 70, 30, { wash: '#f0e8d0', washA: 1, w: 1.2, col: L }); pencil([[-30, -150], [-10, -200]], { w: 3, col: '#f8f8f8', pass2: false }); pop();
    push(-60, 1520, 0.9); human(0, 0, 1, t, { body: '#6a4a3a', hat: 'fur', hatCol: '#3a2a1a', legs: '#3a2a1a', armR: 'hold', seed: 11521, face: 'smile', beard: 1 }); pop(); }
  function front(t) { for (const x of [-170, 1250]) { rect(x - 70, 300, 140, 2100, { wash: '#d8ccb8', washA: 1, w: 2.4, col: L, shade: { gap: 10, a: 0.15, col: '#8a7a60', ang: 0 } }); } }
  function map(t) { if (t < EV.pv_map || t > EV.pv_law - 0.1) return; const k = sm(clamp((t - EV.pv_map) / 0.3)); scr(() => { ctx.save(); ctx.globalAlpha = k; const P = GLOBE.map(540, 980, 52, 24, 63, { land: '#e2d4ac', sea: '#2a5a8a', seaD: '#183a66' });
      const f = sm(clamp((t - EV.pv_ru) / 0.7)); GLOBE.fill(SE_POLY.map(P), '#f2c81e', 0.6); GLOBE.fill(FI_POLY.map(P), lerpC('#f2c81e', '#3a8a5a', f), 0.85); pencil(FI_POLY.concat([FI_POLY[0]]).map(P), { w: 4, col: L, pass2: false, gap: false });
      const [sx, sy] = P([15.5, 62.5]); txt('ШВЕЦИЯ', sx, sy, 44, { col: '#5a3a10', font: 'Osw' }); const [rx, ry] = P([33.5, 62]); txt('РОССИЯ', rx, ry, 44, { col: '#1a4a2a', font: 'Osw' }); const [fx, fy] = P([26, 63.5]); txt('ФИНЛЯНДИЯ', fx, fy, 40, { col: L, font: 'Osw' });
      GLOBE.route(P, [[20, 61], [28, 63]], f, { col: FIC.red, bend: -0.3 }); ctx.restore(); }); }
  function extras2(t) {                                             // хор мальчиков, органист, свечи на подставках
    for (let i = 0; i < 3; i++) human(900 + i * 50, 1520, 0.55, t, { body: '#f4f4f0', bodyD: '#a8a8a0', legs: '#1a1a1e', long: 1, armR: 'hold', prop: 'scroll', flip: -1, seed: 11540 + i, face: 'smile' });
    for (let i = 0; i < 4; i++) { push(220 + i * 160, 1460, 0.8); pencil([[0, 0], [0, -180]], { w: 5, col: '#d8b040', pass2: false }); rect(-6, -220, 12, 40, { wash: '#f4efe4', washA: 1, w: 1, col: L }); blob([[-4, -220], [0, -238 - Math.sin(t * 9 + i) * 3], [4, -220]], { wash: '#ffd060', washA: 1, line: false }); glow(0, -230, 30, 'rgba(255,210,120,1)', 0.35); pop(); }
    push(-60, 1300, 0.8); rect(-100, -300, 200, 300, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (let q = 0; q < 7; q++) rect(-90 + q * 26, -420 + (q % 2) * 30, 20, 140 - (q % 2) * 30, { wash: '#c8b890', washA: 1, w: 1.2, col: L }); pop();
    for (let i = 0; i < 3; i++) { push(-60 + i * 620, 560, 0.9); rect(-90, -120, 180, 240, { wash: '#6a4a2a', washA: 1, w: 4, col: '#d8b040' }); ell(0, -30, 40, 50, { wash: '#c8a888', washA: 1, w: 1.6, col: L }); rect(-50, 20, 100, 90, { wash: ['#1a3a2a', '#3a2a4a', '#2a2a3a'][i], washA: 1, w: 1.4, col: L }); pop(); }
    for (let i = 0; i < 4; i++) { push(300 + i * 150, 1600, 0.8); rect(-40, -100, 80, 16, { wash: '#8a2a1a', washA: 1, w: 1.6, col: L }); rect(-40, -170, 12, 170, { wash: '#5a3a1a', washA: 1, w: 1.4, col: L }); for (const k of [-34, 34]) pencil([[k, -84], [k, 0]], { w: 5, col: '#5a3a1a', pass2: false }); pop(); }
  }
  WORLD.porvoo = (t, u, cat) => {
    lay(40, () => hall(t)); lay(3, () => estates(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => floor_(t)); lay(0.62, () => front(t));
    lay(2, () => { rays(WIN[0], WIN[1], 0.6, 0.35, 1400, 'rgba(255,236,190,1)', 0.12, 5, t); motes(14, [-100, 500, 1200, 1500], '#fff0c8', t, 11530, { sp: 1, sz: 2.4, a: 0.4, wob: 12, add: 1 }); });
    map(t); lay(1, () => cat());
  };
  DIR.porvoo = {
    outfit: 'victorian', light: { side: -1, rim: '#ffe0b0' }, grade: ['#2a1a10', 0.04],
    act: () => [[S0.porvoo, 'suspicious'], [EV.pv_ru, 'shock'], [EV.pv_law, 'awe'], [EV.pv_end, 'smug']],
    pose: (t, u, b) => { const mp = t > EV.pv_map && t < EV.pv_law - 0.1; return Object.assign(b, { x: mp ? 190 : 380, y: mp ? 1840 : 1720, s: mp ? 0.78 : 0.95, look: mp ? [0.6, -0.6] : [0.6, -0.2], hand: !mp && t > EV.pv_law ? [200, -150] : [150, -320], point: mp }); },
    hud: t => { if (t > EV.pv_end - 0.1) fiBoard(640, 1000, 0.8, t, EV.pv_end - 0.1, [['1809 · ПОРВОО', 48, '#ffe08a'], ['АВТОНОМИЯ, СВОИ ЗАКОНЫ', 40]], { w: 560 }); },
    cam: () => [[S0.porvoo, 600, 980, -0.08], [EV.pv_map - 0.01, 600, 980, -0.06], [EV.pv_map, 540, 960, 0], [EV.pv_law - 0.11, 540, 960, 0], [EV.pv_law - 0.1, 540, 1020, -0.02], [S1.porvoo, 520, 1060, 0.04]]
  };
  TRANS_IN.porvoo = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#3a8a5a'; ctx.fillRect(0, 0, W * Math.min(1, e * 2), H); ctx.restore(); }); } };
})();
