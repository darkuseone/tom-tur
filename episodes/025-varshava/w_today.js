/* 025 — сцена `today`: 2026, тот же Рынок Старого города (планы хука из window.WQ), но вечер: солнце ниже, окна загораются.
   Своё в кадре: уличные художники у стены продают виды Варшавы, экскурсовод с поднятым зонтом и группа, сувенирный лоток с магнитами-
   русалками, велосипед, кафе. Том в худи держит репродукцию картины Беллотто рядом с «живым» фасадом.
   На «приукрашивал» на картине у одной каменицы вспыхивает выдуманный декор (скульптуры и картуш на аттике) — золотой круг;
   на «фасады» пунктир-стрелка от картины к живому дому; на «построила» кирпичи взлетают и складывают тот же декор на реальном доме;
   на «выдумки» — штамп «ВЫДУМКА · ПОСТРОЕНО». Главный свет — низкое закатное солнце справа (оранжево-розовое), тени длинные влево.
   Переход В сцену — картина на мольберте 1770 наплывает на камеру и становится реальной площадью. */
(() => {
  EV.to_fancy = wtk('t1', 'приукрашивал');
  EV.to_fac = wtk('t1', 'фасады.');
  EV.to_built = wtk('t1', 'построила');
  EV.to_fict = wtk('t1', 'выдумки.');
  KEYW.push('приукрашивал', 'построила', 'выдумки.');
  SHAKES.push([EV.to_fict + 0.1, 0.25, 7]);
  const L = WA.ink, Q = window.WQ, PX = 700, PY = 1180;
  const HX = (() => { const r = rng(2510); let x = -420, best = 0; for (let i = 0; i < 12; i++) { const w = 170 * (0.8 + r() * 0.45); r(); r(); r(); r(); r(); if (i === 5) best = x + w / 2; x += w - 2; } return best; })();
  const build = t => clamp((t - EV.to_built) / 0.9);
  function deco(x, y, s, k = 1) {                                    // выдуманный декор аттика: картуш, две статуи, вазы
    push(x, y, s); ctx.save(); ctx.beginPath(); ctx.rect(-200, -260 * k + 40, 400, 400); ctx.clip();
    blob([[-70, 0], [-60, -50], [0, -80], [60, -50], [70, 0]], { wash: WA.gold, washA: 1, w: 2, col: L }); ell(0, -36, 24, 22, { wash: '#f4ecd8', washA: 1, w: 1.6, col: WA.goldD });
    for (const k2 of [-1, 1]) { blob([[k2 * 90 - 14, 0], [k2 * 90 - 16, -80], [k2 * 90, -112], [k2 * 90 + 16, -80], [k2 * 90 + 14, 0]], { wash: '#e8e0d0', washA: 1, w: 1.8, col: L }); ell(k2 * 90, -124, 11, 12, { wash: '#e8e0d0', washA: 1, w: 1.6, col: L }); pencil([[k2 * 90, -90], [k2 * 116, -140]], { w: 4, col: '#e8e0d0', pass2: false }); }
    for (const k2 of [-140, 140]) { blob([[k2 - 10, 0], [k2 - 14, -26], [k2, -40], [k2 + 14, -26], [k2 + 10, 0]], { wash: WA.goldL, washA: 1, w: 1.4, col: L }); }
    ctx.restore(); pop(); }
  function evening(t) { vgrad(-900, 1500, ['#3a3a7a', '#a86a8a', '#f09a6a', '#f8c070'], 1); glow(1150, 800, 260, 'rgba(255,190,120,1)', 0.35); ell(1150, 800, 80, 80, { wash: '#ffe0a8', washA: 1, line: false }); cloudsWA(t, -200, 5, '#f8b8a8', 2741, 0.7, 8); birdsWA(t, 6, [-100, 100, 1100, 600], 2742); }
  function rowPlus(t) { Q.row(t, { done: 1, lit: 0.3 }); const b = build(t);
    if (b > 0) { const top = 1290 - 470 * 1.0; deco(HX, top - 70, 0.7, b); if (b < 1) { const r = rng(2743); for (let i = 0; i < 10; i++) { const k = clamp(b * 1.6 - i * 0.06); if (k <= 0 || k >= 1) continue; rect(lerp(HX - 300 + i * 60, HX - 60 + i * 12, k), lerp(1300, top - 100, k) - Math.sin(k * 3.14) * 120, 24, 11, { wash: WA.brick, washA: 1, w: 1, col: L }); } } }
    if (t > EV.to_fac) { const q = clamp((t - EV.to_fac) / 0.3); ell(HX, 1290 - 470 - 130, 170 * q, 110 * q, { line: true, w: 6, col: WA.goldL }); } }
  function squarePlus(t) {                                           // уличные художники, экскурсовод, сувениры, велосипед
    Q.square(t, {});
    const P = (x, y, s, sd, c, ex = {}) => human(x, y, s, t, Object.assign({ body: c, legs: '#2a2a36', seed: sd }, ex));
    for (let i = 0; i < 4; i++) frameG(-260 + i * 120, 1250, 90, 70, { b: 8, inner: () => { vgrad(-35, 35, ['#9ac0e0', '#e8c890'], 1); push(0, 30, 0.12); kam(0, 0, 300, 500, { col: ['#e8b85a', '#c8563a', '#7a9a6a', '#6a8aa8'][i], top: 'gable', floors: 4, cols: 2, seed: 2744 + i }); pop(); } });
    P(-120, 1400, 0.66, 2748, '#5a3a6a', { hat: 'merchant', hatCol: '#2a2a2a', beard: 1, armR: 'point', flip: -1 });
    P(560, 1404, 0.66, 2749, '#e8c040', { armR: 'up', look: [0, -0.5] }); pencil([[600, 1240], [606, 1060]], { w: 3, col: '#2a2a2a', pass2: false }); blob([[566, 1080], [606, 1040], [646, 1080], [606, 1070]], { wash: '#c8402a', washA: 1, w: 1.6, col: L });
    for (let i = 0; i < 4; i++) P(660 + i * 56, 1410, 0.6, 2750 + i, PPLW.now[(i + 1) % 6], { flip: -1, armR: i === 1 ? 'hold' : null, prop: i === 1 ? 'phone' : null, hat: i === 3 ? 'cap' : null, hatCol: '#3a3a6a' });

    carriage(-500 + ((t - S0.today) * 70) % 600, 1440, 0.6, t, '#2a1a1a');                                  // дорожка с туристами
    human(900, 1400, 0.62, t, { body: '#2a2a36', legs: '#1a1a20', seed: 2757, hat: 'merchant', hatCol: '#1a1a1a', armR: 'hold', armL: 'hold', flip: -1 }); pencil([[880, 1250], [940, 1220]], { w: 4, col: '#6a3a1a', pass2: false }); ell(870, 1262, 26, 16, { wash: '#8a4a1a', washA: 1, w: 1.6, col: L });   // скрипач
    for (let i = 0; i < 4; i++) { push(420 + i * 30, 1420, 0.7); rect(-12, -26, 24, 26, { wash: '#7a4a2a', washA: 1, w: 1.2, col: L }); ell(0, -34, 18, 12, { wash: ['#e84a3a', '#f0c040', '#e86aa8', '#7ac04a'][i], washA: 1, line: false }); pop(); }
    push(1000, 1420, 0.8); rect(-80, -120, 160, 120, { wash: '#6a4426', washA: 1, w: 2, col: L }); for (let i = 0; i < 8; i++) { const x = -64 + (i % 4) * 40, y = -104 + Math.floor(i / 4) * 44; rect(x, y, 30, 34, { wash: ['#3a6aa8', '#e8c040', '#c8402a', '#7aa890'][i % 4], washA: 1, w: 1, col: L }); } txt('SYRENKA', 0, -132, 18, { col: '#f4ecd8', font: 'Osw' }); pop();
    push(250, 1420, 0.8); for (const k of [-60, 60]) ell(k, -36, 36, 36, { line: true, w: 4, col: '#2a2a2a' }); pencil([[-60, -36], [-10, -80], [40, -80], [60, -36]], { w: 4, col: '#c8402a', pass2: false }); pencil([[-10, -80], [-20, -100]], { w: 4, col: '#2a2a2a', pass2: false }); pop(); }
  function plane(t) {                                                // Том с репродукцией картины, пунктир к дому
    lightPool(560, 1660, 600, 140, 'rgba(255,190,130,1)', 0.35); castShadow(360, 1640, 170, 520, Math.PI * 0.9, 0.42);
    push(PX, PY, 1, -0.04); frameG(0, 0, 280, 210, { b: 22, inner: () => { vgrad(-105, 105, ['#c8b48a', '#e0c898', '#9a7a4a'], 1); push(0, 70, 0.22); const r = rng(2755); let x = -640; for (let i = 0; i < 7; i++) { const w = 180; kam(x + w / 2, 200, w, 520, { col: ['#e8b85a', '#a86a4a', '#d8b878', '#8a7a5a'][i % 4], top: ['gable', 'attic', 'roof'][i % 3], floors: 4, cols: 2, seed: 2755 + i }); if (i === 3 && t > EV.to_fancy) deco(x + w / 2, 200 - 520 - 60, 1, 1); x += w; } pop();
      if (t > EV.to_fancy) { const q = clamp((t - EV.to_fancy) / 0.3); ell(0, -50, 46 * q, 34 * q, { line: true, w: 4, col: WA.goldL }); glow(0, -50, 60, 'rgba(255,230,150,1)', 0.25 * q); }
      signature(40, 90, 0.36, t, { txt: 'Canaletto' }); } }); pop();
    if (t > EV.to_fac) dashLine([[PX, PY - 100], [HX + 60, 1290 - 470 - 40]], WA.goldL, 5, 0.85 * (1 - clamp((t - EV.to_built - 1) / 0.5)));
  }
  function hud(t) { if (t > EV.to_fict) { const q = popK(t, EV.to_fict, 0.25); push(720, 860, 0.6 + 0.4 * q, -0.12); rect(-220, -60, 440, 120, { line: true, w: 8, col: '#c8201a' }); txt('ВЫДУМКА · ПОСТРОЕНО', 0, 16, 40, { col: '#c8201a', font: 'Osw' }); pop(); }
    if (t > EV.to_fancy && t < EV.to_built) { push(620, 820, 1); txt('у Беллотто', 0, 0, 36, { col: '#fff4d8', font: 'Hand' }); pop(); } }
  WORLD.today = (t, u, cat) => {
    lay(40, () => evening(t));
    lay(16, () => Q.far(t));
    lay(6, () => rowPlus(t));
    lay(4.5, () => Q.ground(t));
    lay(3.2, () => squarePlus(t));
    lay(1, () => { plane(t); cat(); });
    lay(2, () => motes(18, [0, 600, 1100, 1500], '#ffd8a8', t, 2756, { sp: 4, sz: 2, a: 0.45, wob: 16, add: 1 }));
    lay(0.62, () => Q.front(t));
    shaft(1150, 760, 260, 1500, 0.9, 'rgba(255,190,130,1)', 0.12);
  };
  DIR.today = {
    outfit: 'hoodieWA', light: { side: 1, rim: '#ffb080' }, grade: ['#f08a5a', 0.08],
    act: () => [[S0.today, 'smug'], [EV.to_fancy, 'sideeye'], [EV.to_built, 'awe'], [EV.to_fict, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1640, s: 1.0, look: t < EV.to_fac ? [0.8, -0.3] : t < EV.to_fict ? [0.5, -0.9] : [0.1, -0.1], hand: [250, -400], handF: [230, -340], point: t > EV.to_fac && t < EV.to_built }),
    cam: () => [[S0.today, 600, 1060, 0.16], [EV.to_fancy, 680, 1120, 0.24], [EV.to_fac, 560, 900, 0.04], [EV.to_built, 560, 860, 0.0], [EV.to_fict, 560, 940, 0.06], [S1.today, 540, 960, 0.08]],
    hud
  };
  TRANS_IN.today = { a: 0.15, b: 0.35, fx(k, t, A, B) {            // холст 1770 наплывает на камеру и «оживает» площадью 2026
    const e = sm(k); drawBuf(A, 1 + e * 2.5, 730, 1000); scr(() => { const w = lerp(340, 1300, e), h = lerp(250, 2100, e); ctx.save(); ctx.globalAlpha = e; ctx.beginPath(); ctx.rect(540 - w / 2, 960 - h / 2, w, h); ctx.clip(); drawBuf(B); ctx.restore(); if (k < 0.8) frameG(540, 960, w, h, { b: lerp(14, 50, e) }); });
  } };
})();
