/* 030 — сцена `king`: 1807–1808. Сначала КАРТА Атлантики (инфографика): на «Наполеон» синяя стрелка «НАПОЛЕОН · 1807» из Франции
   в Португалию; на «король сбежал» пунктирный маршрут с кораблём Лиссабон → Рио «ДВОР ПОРТУГАЛИИ · 1808» через океан.
   На «Рио» — 1808, площадь у дворца в Рио: король выходит из кареты, гвардия, толпа машет, салют, лепестки; Том (гусар эпохи)
   кланяется. Плашка «1808–1821 · СТОЛИЦА ПОРТУГАЛЬСКОЙ ИМПЕРИИ · единственная европейская столица в Америке».
   Переход В: золотая корона катится через кадр и тянет за собой карту. */
(() => {
  EV.kg_nap = wtk('s5', 'Наполеон');
  EV.kg_port = wtk('s5', 'Португалию,');
  EV.kg_flee = wtk('s5', 'сбежал');
  EV.kg_rio = wtk('s5', 'Рио') - 0.1;
  EV.kg_emp = wtk('s5', 'империи!');
  KEYW.push('Наполеон', 'сюда.', 'империи!');
  const L = RJ.ink, SW = EV.kg_rio;
  function mapBeat(t) {
    MAPON = t; scr(() => { const P = GLOBE.map(560, 960, 12, -20, 16, { landCol: { samerica: '#d8c890', africa: '#e2c890', eurasia: '#d0c09a' } });
      GLOBE.city(P, 2.35, 48.85, 'ПАРИЖ', { size: 30, left: true }); GLOBE.city(P, ...RIO.lisbon, 'ЛИССАБОН', { size: 32, left: true }); GLOBE.city(P, -43.2, -22.9, 'РИО', { size: 44, col: RJ.gold });
      txt('АТЛАНТИЧЕСКИЙ ОКЕАН', P([-28, 8])[0], P([-28, 8])[1], 34, { col: '#d8ecf8', font: 'Osw' });
      if (t > EV.kg_nap - 0.1) GLOBE.route(P, [[1.5, 46.5], [-7.5, 39.6]], clamp((t - EV.kg_nap + 0.1) / 0.8), { col: '#2a5ae8', bend: 0.15, label: 'НАПОЛЕОН · 1807', t, t0: EV.kg_nap + 0.3, lx: 140, ly: -20, w: 14 });
      if (t > EV.kg_flee - 0.2) GLOBE.route(P, [RIO.lisbon, [-25, 8], [-36, -12], [-43.2, -22.9]], clamp((t - EV.kg_flee + 0.2) / 1.3), { col: RJ.gold, dash: true, label: 'ДВОР ПОРТУГАЛИИ · 1808', t, t0: EV.kg_flee + 0.5, lx: 160, ly: 0, size: 32,
        icon: (x, y, a) => shipRJ(x, y + 30, 0.2, t, 'frigate', 3) });
      if (t > SW - 0.2) { ctx.save(); ctx.globalAlpha = clamp((t - SW + 0.2) / 0.2); ctx.fillStyle = '#fffbe8'; ctx.fillRect(0, 0, W, H); ctx.restore(); } });
  }
  function sky(t) { vgrad(-900, 1050, ['#2a6ac8', '#7ab8e8', '#e8f0f0', '#fff0c8'], 1); glow(900, 360, 200, 'rgba(255,240,190,1)', 0.4); ell(900, 360, 56, 56, { wash: '#fffbe0', washA: 1, line: false });
    if (t > EV.kg_emp - 0.1) for (let i = 0; i < 5; i++) { const ph = clamp((t - EV.kg_emp + 0.1 - i * 0.12) / 0.8); if (ph <= 0) continue; const x = 200 + i * 170, y = 640 - ph * 120; for (let q = 0; q < 12; q++) { const a = q / 12 * 6.28; ell(x + Math.cos(a) * 90 * ph, y + Math.sin(a) * 90 * ph, 6, 6, { wash: ['#ffe08a', '#ff8ac8', '#8ad8ff'][i % 3], washA: 1 - ph, line: false }); } } }
  function city(t) {                                                 // гавань с кораблями флота, Сахарная Голова, дворец Пасу
    seaKR(980, 1100, t, 6601, { cols: ['#3a9ac0', '#1e7aa0', '#0e5a80'], n: 18 }); sugarloaf(1080, 1000, 0.5, t, { cable: false }); for (let i = 0; i < 3; i++) shipRJ(300 + i * 260, 1060, 0.26, t, 'frigate', i, { flag: ['#2a6ae8', '#e8281e', '#2a8a4a'][i] });
    push(560, 1180, 0.9); rect(-360, -260, 720, 260, { wash: '#f0e2c8', washA: 1, w: 2.4, col: L, shade: { gap: 9, a: 0.1, col: '#a89070', ang: 1.4 } }); poly([[-380, -260], [0, -320], [380, -260]], { wash: RJ.terra, washA: 1, w: 2, col: L });
    for (let f = 0; f < 2; f++) for (let i = 0; i < 9; i++) { const x = -330 + i * 78; shape([[x, -220 + f * 110], [x, -150 + f * 110], [x + 44, -150 + f * 110], [x + 44, -220 + f * 110], [x + 22, -236 + f * 110]], { wash: '#3a4a6a', washA: 1, w: 1.4, col: L }); }
    rect(-50, -120, 100, 120, { wash: '#5a3a1e', washA: 1, w: 2, col: L }); for (const sd of [-1, 1]) { pencil([[sd * 240, -260], [sd * 240, -380]], { w: 4, col: '#3a2a1a', pass2: false }); shape([[sd * 240, -380], [sd * 240 + 70, -370 + Math.sin(t * 5) * 6], [sd * 240, -340]], { wash: sd < 0 ? '#2a6ae8' : RJ.gold, washA: 1, w: 1.4, col: L }); } pop();
    depthFog('#f0f4f0', 0.03);
  }
  function crowd(t) {                                                // толпа машет, гвардия, карета, король
    const P = [[-240, '#e8603a', 'straw', 'wave'], [-120, '#f4f0e6', 'bun', 'wave'], [0, '#3a5aa8', 'brim', 'up'], [120, '#a8304a', 'scarf', 'wave'], [880, '#f8d030', 'straw', 'up'], [1000, '#2a7a4a', 'brim', 'wave'], [1120, '#c87aa8', 'bun', 'wave'], [1240, '#7a4a2a', null, 'up']];
    P.forEach(([x, c, h, a], i) => human(x, 1390, 0.62, t, { body: c, skin: ['#e2b48e', '#7a4a2a', '#a8704a', '#e2b48e'][i % 4], hat: h, hatCol: h === 'straw' ? '#e8d08a' : '#2a1a10', legs: '#2a2a36', armR: a, long: h === 'bun' ? 1 : undefined, flip: x > 600 ? -1 : 1, seed: 6610 + i, face: t > EV.kg_emp ? 'grin' : 'smile' }));
    for (const x of [300, 820]) human(x, 1400, 0.66, t, { body: '#1e3a8a', trim: RJ.gold, hat: 'tricorn', hatCol: '#14100a', legs: '#f0e8d8', armR: 'hold', prop: 'spear', seed: 6620 + x, face: 'calm', flip: x > 600 ? -1 : 1 });
    push(640, 1420, 0.8); rect(-130, -200, 260, 150, { wash: RJ.gold, washA: 1, w: 2.4, col: L }); rect(-110, -180, 100, 90, { wash: '#8ac8e8', washA: 1, w: 1.6, col: L }); for (const k of [-100, 100]) { ell(k, -40, 50, 50, { line: true, w: 6, col: '#5a3a1a' }); } pop();
    human(560, 1410, 0.75, t, { body: '#a8201e', trim: RJ.gold, hat: 'crown', hatCol: RJ.gold, legs: '#f0e8d8', beard: undefined, armR: t > EV.kg_emp ? 'up' : 'hold', long: 1, seed: 6630, face: 'smile' });
  }
  function ground(t) {                                               // площадь: брусчатка, лепестки, барабан, ковровая дорожка, клетка с попугаем
    rect(-500, 1420, 2200, 900, { wash: '#b8a890', washA: 1, w: 2, col: L }); for (let j = 0; j < 9; j++) for (let i = 0; i < 24; i++) ell(-480 + i * 90 + (j % 2) * 45, 1450 + j * 56, 40, 22, { wash: (i + j) % 3 ? '#c8b8a0' : '#a89880', washA: 1, w: 1, col: '#6a5a48' });
    shape([[500, 1420], [640, 1420], [760, 1940], [380, 1940]], { wash: '#a8201e', washA: 1, w: 2, col: L }); lightPool(600, 1660, 700, 160, 'rgba(255,240,190,1)', 0.4);
    push(1080, 1760, 1); ell(0, -40, 60, 60, { wash: '#c8281e', washA: 1, w: 2, col: L }); ell(0, -40, 48, 48, { wash: '#f0e8d8', washA: 1, w: 1.6, col: L }); pop();
    push(-40, 1720, 1); pencil([[0, 0], [0, -200]], { w: 5, col: '#3a2a1a', pass2: false }); for (let q = 0; q < 7; q++) pencil([[-50 + q * 16, -200], [-50 + q * 16, -110]], { w: 2, col: '#8a6a3a', pass2: false }); blob([[-10, -150], [10, -170], [24, -140], [6, -126]], { wash: '#2ac86a', washA: 1, w: 1.4, col: L }); pop();
    if (t > EV.kg_emp - 0.2) motes(40, [-100, 600, 1200, 1900], '#ff8ac8', t, 6640, { sp: 80, sz: 6, a: 0.8, wob: 40 });
    castShadow(330, 1640, 120, 480, -0.5, 0.35); moodDark(-100, 900, 900, 1800, '#0e2a3a', 0.2);
  }
  WORLD.king = (t, u, cat) => {
    if (t < SW) { lay(1, () => mapBeat(t)); return; }
    lay(40, () => sky(t)); lay(14, () => city(t)); lay(2.4, () => crowd(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => { for (const x of [-140, 1230]) sil([[x - 80, 2300], [x - 70, 1450], [x + 70, 1450], [x + 80, 2300]], '#2a1a0a', 1); });
    if (t < SW + 0.3) scr(() => { ctx.save(); ctx.globalAlpha = 1 - (t - SW) / 0.3; ctx.fillStyle = '#fffbe8'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
  };
  DIR.king = {
    outfit: 'hussar', light: { side: 1, rim: '#fff0c0' }, grade: ['#2a3a5a', 0.05],
    act: () => [[S0.king, 'suspicious'], [EV.kg_nap, 'shock'], [EV.kg_flee, 'smug'], [SW, 'awe'], [EV.kg_emp, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1640, s: 0.95, look: [0.8, -0.3], nod: t > EV.kg_emp ? 0.25 * Math.sin(clamp((t - EV.kg_emp) / 0.6) * 3.14) : 0, hand: t > EV.kg_emp ? [60, -420] : [150, -300] }),
    hud: t => { if (t > SW) infoPlate(560, 780, [['1808–1821', 58, RJ.goldL], ['СТОЛИЦА ПОРТУГАЛЬСКОЙ ИМПЕРИИ', 32], ['единственная европейская столица в Америке', 24, '#d8d0c0']], t, EV.kg_emp); },
    cam: () => [[S0.king, 540, 960, 0], [SW - 0.01, 540, 960, 0], [SW, 600, 940, -0.08], [EV.kg_emp, 520, 1040, 0.08, 'x'], [S1.king, 520, 1060, 0.1]]
  };
  TRANS_IN.king = { a: 0.1, b: 0.38, fx(k, t, A, B) {               // золотая корона катится через кадр и утаскивает старый кадр за собой
    const e = sm(k), X = -300 + e * 1700; drawBuf(B); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(X, 0, W, H); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore();
    scr(() => { push(X, 980, 2.2, e * 9); ell(0, 0, 90, 90, { wash: RJ.gold, washA: 1, w: 4, col: RJ.ink }); for (let q = 0; q < 5; q++) { const a = q / 5 * 6.283; poly([[Math.cos(a) * 90, Math.sin(a) * 90], [Math.cos(a + 0.3) * 140, Math.sin(a + 0.3) * 140], [Math.cos(a + 0.6) * 90, Math.sin(a + 0.6) * 90]], { wash: RJ.goldL, washA: 1, w: 3, col: RJ.ink }); ell(Math.cos(a + 0.3) * 120, Math.sin(a + 0.3) * 120, 12, 12, { wash: '#c8281e', washA: 1, line: false }); } pop(); }); } };
})();
