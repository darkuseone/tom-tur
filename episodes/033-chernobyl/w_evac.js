/* 033 — сцена `evac`, 27.04.1986, Припять. Солнечный весенний проспект: 16-этажки с буквами на крышах, бельё на балконах, колесо
   обозрения с жёлтыми кабинками, цветущие яблони. Колонна автобусов (жёлтые, красно-белые) едет по проспекту, жители с чемоданами и
   узлами садятся, милиционер с мегафоном, дети, оставленная собака. Главный свет — яркое солнце слева, но в воздухе мерцает пыль.
   На «три часа» — табло-таймер «3 ч · ≈ 1 200 АВТОБУСОВ»; на «три дня» Том (кардиган, без шапки, с чемоданом) — шлёпает наклейку
   «НА 3 ДНЯ» на чемодан. Переход в сцену — автобус проезжает через кадр. */
(() => {
  const L = CH.ink, SUN = [120, 560];
  EV.ev_3h = wtk('s6', 'три'); EV.ev_3d = wtk('s6', 'дня.') - 0.25;
  KEYW.push('часа.', 'дня.');
  function sky(t) { vgrad(-900, 1100, ['#5a9ae0', '#a8d0f0', '#eaf0e8'], 1); glow(SUN[0], SUN[1], 220, 'rgba(255,240,200,1)', 0.4); ell(SUN[0], SUN[1], 50, 50, { wash: '#fffbe8', washA: 1, line: false });
    for (let i = 0; i < 3; i++) { const y = 260 + i * 90, dx = (t * 12) % 220; blob([[-200 + dx, y], [400 + dx, y - 20], [1000 + dx, y - 6], [1300, y + 12], [300, y + 18]], { wash: '#ffffff', washA: 0.5, line: false }); } }
  function ferris(x, base, R, t) { push(x, base, 1); pencil([[-R * 0.5, 0], [0, -R - 40], [R * 0.5, 0]], { w: 6, col: '#5a5a62', pass2: false }); const cy = -R - 40, a0 = t * 0.05;
    pencil(ellPts(0, cy, R, R, 0, 0, 60), { w: 5, col: '#8a8a92', pass2: false, gap: false }); for (let i = 0; i < 16; i++) { const a = a0 + i / 16 * 6.283, cx = Math.cos(a) * R, cyy = cy + Math.sin(a) * R; pencil([[0, cy], [cx, cyy]], { w: 1.6, col: '#8a8a92', pass2: false }); rect(cx - 16, cyy, 32, 30, { wash: '#f2c81e', washA: 1, w: 1.6, col: L }); } pop(); }
  function far(t) { hills(1020, 14, '#7a9a7a', 2.6); panel16(-40, 1030, 220, 380, t, { col: '#e8e4d8', roofTxt: 'ПРИПЯТЬ', rs: 34, lit: 0.05 }); panel16(240, 1030, 200, 330, t, { col: '#dcd8cc', lit: 0.05 });
    ferris(620, 1030, 170, t); panel16(900, 1030, 240, 420, t, { col: '#e8e4d8', roofTxt: 'ХАЙ БУДЕ АТОМ РОБІТНИКОМ', rs: 24, lit: 0.05 }); panel16(1180, 1030, 200, 300, t, { col: '#d8d4c8', lit: 0.05 }); depthFog('#eef4f0', 0.08); }
  function avenue(t) {                                               // проспект: яблони в цвету, колонна автобусов, люди с вещами
    for (let i = 0; i < 6; i++) { const x = -160 + i * 270; pencil([[x, 1230], [x, 1130]], { w: 10, col: '#6a4a2a', pass2: false }); const r = rng(5700 + i); for (let q = 0; q < 7; q++) ell(x + (r() - 0.5) * 140, 1080 + (r() - 0.5) * 70, 46, 32, { wash: q % 2 ? '#f8e0ea' : '#ffffff', washA: 1, w: 1.2, col: '#a8848a' }); }
    rect(-500, 1220, 2200, 120, { wash: '#7a7a80', washA: 1, w: 2, col: L }); for (let i = 0; i < 9; i++) rect(-300 + i * 220, 1278, 110, 8, { wash: '#f0ece0', washA: 0.8, line: false });
    const go = sm(clamp((t - S0.evac) / (S1.evac - S0.evac))); for (let i = 0; i < 5; i++) bus(-260 + i * 520 - go * 700, 1320, 0.8, t, { col: ['#f2c81e', '#e8e4d8', '#f2c81e', '#d84a2a', '#e8e4d8'][i], stripe: ['#c8281e', '#2a5aa8', '#c8281e', '#f0e0c0', '#c8281e'][i], faces: 1, num: ['АТ 12-34', 'КИ 47-81', 'АТ 55-02', 'КИ 11-90', 'АТ 77-13'][i] });
    const P = [[180, '#3a6aa8', 'hold', 'scarf'], [260, '#c84a3a', 'hold', null], [340, '#5a6a3a', 'wave', 'cap'], [760, '#7a4a8a', 'hold', 'scarf'], [840, '#2a8a6a', 'hold', null], [930, '#a8584a', 'swing', 'cap'], [1060, '#e8b030', 'hold', 'scarf'], [1180, '#3a4a6a', 'hold', 'cap']];
    P.forEach(([x, c, a, h], i) => { human(x, 1400, 0.66, t, { body: c, skin: ['#e2b48e', '#f0c8a0', '#d8a47e'][i % 3], hat: h, hatCol: '#c83a2a', legs: '#2a2a36', armR: a, long: h === 'scarf' ? 1 : undefined, flip: x > 600 ? -1 : 1, seed: 5710 + i, face: 'smile' });
      push(x + 40 * (x > 600 ? -1 : 1), 1400, 0.66); rect(-30, -90, 60, 60, { wash: ['#6a4a2a', '#2a4a6a', '#8a2a2a'][i % 3], washA: 1, w: 1.6, col: L }); pop(); });
    push(560, 1400, 0.7); human(0, 0, 1, t, { body: '#3a4a6a', hat: 'police', hatCol: '#3a4a6a', legs: '#2a2a36', armR: 'wave', seed: 5720, face: 'grin' }); rect(40, -360, 60, 30, { wash: '#e8e4d8', washA: 1, w: 1.6, col: L }); poly([[100, -360], [150, -380], [150, -310], [100, -330]], { wash: '#e8e4d8', washA: 1, w: 1.6, col: L }); pop();
    for (let i = 0; i < 2; i++) human(440 + i * 50, 1410, 0.42, t, { body: ['#e85a8a', '#4a9ae0'][i], legs: '#2a2a36', armR: 'wave', seed: 5730 + i, face: 'smile' });
  }
  function ground(t) {                                               // тротуар с плиткой, бордюр, клумба, детский велосипед, узел с вещами, собака
    rect(-500, 1440, 2200, 1000, { wash: '#b8b4ac', washA: 1, w: 2, col: L }); for (let i = 0; i < 12; i++) for (let j = 0; j < 6; j++) rect(-400 + i * 170 + (j % 2) * 85, 1460 + j * 90, 170, 90, { wash: j % 2 ? '#c8c4bc' : '#bcb8b0', washA: 1, w: 1, col: '#7a766e', a: 0.5 });
    rect(-500, 1440, 2200, 20, { wash: '#e8e4dc', washA: 1, w: 1.6, col: L });
    push(1000, 1620, 1); ell(0, 0, 180, 40, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (let q = 0; q < 9; q++) { const x = -150 + q * 38; pencil([[x, -10], [x, -60]], { w: 3, col: '#3a7a2a', pass2: false }); ell(x, -66, 12, 12, { wash: q % 2 ? '#e8281e' : '#f8d030', washA: 1, w: 1, col: L }); } pop();
    push(600, 1820, 1, 0.1); ell(-50, 0, 36, 36, { wash: false, w: 4, col: '#2a2a30' }); ell(50, 0, 36, 36, { wash: false, w: 4, col: '#2a2a30' }); pencil([[-50, 0], [0, -50], [50, 0], [-10, -50]], { w: 5, col: '#2a8ae0', pass2: false }); pop();
    push(820, 1760, 1); blob([[-60, 0], [-50, -60], [0, -80], [50, -60], [60, 0]], { wash: '#d8a85a', washA: 1, w: 2, col: L, shade: { gap: 7, a: 0.2, col: '#8a5a1a', ang: 0.8 } }); pencil([[-20, -76], [0, -96], [20, -76]], { w: 4, col: L, pass2: false }); pop();
    push(1130, 1880, 1, 0, -1); blob([[-50, -10], [-40, -50], [30, -54], [56, -36], [50, -10]], { wash: '#c8945a', washA: 1, w: 2, col: L }); ell(66, -54, 22, 18, { wash: '#c8945a', washA: 1, w: 1.6, col: L }); for (const lx of [-30, -14, 26, 40]) pencil([[lx, -14], [lx, 14]], { w: 6, col: '#8a5a30', pass2: false }); pop();
    for (let i = 0; i < 3; i++) mugwort(-120 + i * 60, 1900, 1, t, 120 + i);
    lightPool(500, 1640, 1000, 200, 'rgba(255,240,190,1)', 0.3); castShadow(400, 1720, 110, 520, 0.3, 0.3); castShadow(820, 1760, 70, 260, 0.3, 0.25); moodDark(1000, 1000, 900, 1900, '#1a2030', 0.12);
  }
  function front(t) { for (const x of [-150, 1240]) { pencil([[x, 2300], [x, 700]], { w: 22, col: '#4a3a2a', pass2: false }); const r = rng(5740 + x); for (let q = 0; q < 8; q++) ell(x + (r() - 0.5) * 300, 700 + (r() - 0.5) * 200, 70, 50, { wash: q % 2 ? '#f8e0ea' : '#ffffff', washA: 1, w: 1.4, col: '#a8848a' }); } }
  function petals(t) { const r = rng(5750); for (let i = 0; i < 26; i++) { const x = ((r() * 1400 + t * 60) % 1500) - 200, y = ((r() * 1800 + t * (80 + r() * 60)) % 1900); ell(x + Math.sin(t * 3 + i) * 20, y, 6, 4, { wash: '#fff0f4', washA: 0.9, line: false, rot: t + i }); } }
  WORLD.evac = (t, u, cat) => {
    lay(40, () => sky(t)); lay(13, () => far(t)); lay(3.0, () => { avenue(t); depthFog('#f4f6f0', 0.03); }); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(1.6, () => { petals(t); motes(14, [-100, 700, 1200, 1700], '#fff8e0', t, 5760, { sp: 2, sz: 2.4, a: 0.4, wob: 14, add: 1 }); });
  };
  DIR.evac = {
    outfit: 'cardigan', light: { side: -1, rim: '#fff0c8' }, grade: ['#2a2a10', 0.04],
    act: () => [[S0.evac, 'neutral'], [EV.ev_3h, 'awe'], [EV.ev_3d - 0.3, 'suspicious'], [EV.ev_3d, 'sideeye']],
    pose: (t, u, b) => { const w = clamp(u / 1.6), stick = t > EV.ev_3d && t < EV.ev_3d + 0.4; return Object.assign(b, { x: lerp(200, 340, sm(w)), y: 1720, s: 0.95, walk: w < 1 ? t * 8 : 0, noHat: true, look: t < EV.ev_3d ? [0.6, -0.4] : [0.2, 0.4],
      hand: stick ? [90, -150] : [160, -220], squash: stick ? 0.05 : b.squash }); },
    afterCat: (t, u, P) => { const x = P.x + 160 * P.s, y = P.y - 140 * P.s; push(x, y, P.s); rect(-60, -40, 130, 100, { wash: '#8a3a2a', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.2, col: '#3a1008', ang: 0.6 } }); pencil([[-20, -40], [-20, -60], [30, -60], [30, -40]], { w: 5, col: L, pass2: false });
      if (t > EV.ev_3d) { const k = popK(t, EV.ev_3d, 0.25); push(6, 10, k, -0.15); rect(-56, -26, 112, 52, { wash: '#f8e8a0', washA: 1, w: 2, col: L }); txt('НА 3 ДНЯ', 0, 2, 26, { col: '#a8281e', font: 'Osw' }); pop(); } pop(); },
    hud: t => { if (t < EV.ev_3d) chBoard(640, 960, 0.85, t, EV.ev_3h, [['ЭВАКУАЦИЯ ПРИПЯТИ', 42, '#ffe08a'], ['≈ 3 ЧАСА', 64], ['≈ 1 200 АВТОБУСОВ', 46]], { w: 540 });
      else { const k = popK(t, EV.ev_3d, 0.3); push(660, 1000, (1.8 - 0.8 * k) * (k > 0 ? 1 : 0), -0.12); ctx.save(); ctx.globalAlpha = Math.min(1, k * 1.5); ctx.fillStyle = 'rgba(248,232,160,0.96)'; ctx.fillRect(-250, -80, 500, 160); ctx.restore(); pencil([[-250, -80], [250, -80], [250, 80], [-250, 80], [-250, -80]], { w: 8, col: '#a8281e', pass2: false, gap: false }); txt('НА 3 ДНЯ', 0, 10, 96, { col: '#a8281e', font: 'Osw' }); pop(); } },
    cam: () => [[S0.evac, 580, 1020, -0.1], [EV.ev_3h, 600, 1000, -0.06], [EV.ev_3d, 440, 1180, 0.12, 'x'], [S1.evac, 420, 1200, 0.16]]
  };
  TRANS_IN.evac = { a: 0.15, b: 0.3, fx(k, t, A, B) { const e = sm(k), x = lerp(1500, -900, e); drawBuf(e < 0.5 ? A : B); scr(() => { bus(x, 1500, 3.0, t, { col: '#f2c81e', stripe: '#c8281e', faces: 1, num: 'АТ 12-34' }); }); } };
})();
