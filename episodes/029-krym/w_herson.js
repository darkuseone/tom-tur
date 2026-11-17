/* 029 — сцена `herson`: 988, Херсонес (Корсунь). Полдень, солнце справа (главный свет), холодные блики моря — второй.
   На холме дорический храм и стены с башнями, в гавани греческие корабли, деревянный кран с колесом поднимает колонну
   (на «построили» колонна встаёт), мозаичный пол, амфоры, рыбаки, коза. Том (хитон) идёт к купели, где крестится киевский
   князь (белая рубаха, шапка с мехом), рядом дружина и греки; на «князь» — всплеск воды. На «Москвы» из земли выскакивает
   указатель «МОСКВА →» с печатью «ЕЩЁ НЕТ», Том косится. Переход В: искра кремня — звезда-вспышка раскрывает кадр. */
(() => {
  EV.hs_build = wtk('s2', 'построили');
  EV.hs_bapt = wtk('s2', 'крестился');
  EV.hs_prince = wtk('s2', 'князь.');
  EV.hs_msk = wtk('s2', 'Москвы');
  EV.hs_no = wtk('s2', 'было.');
  KEYW.push('Херсонес.', 'князь.', 'было.');
  const L = KR.ink, SUN = [980, 360], FONT = 700;
  function sky(t) { vgrad(-900, 1000, ['#2a6ab8', '#6aa8e0', '#c8e4f4', '#f4ecd0'], 1); glow(SUN[0], SUN[1], 200, 'rgba(255,240,200,1)', 0.35); ell(SUN[0], SUN[1], 56, 56, { wash: '#fffbe8', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const r = rng(5100 + i), y = 330 + i * 90, dx = (t * 12) % 200; blob([[-200 + r() * 300 + dx, y], [300 + dx, y - 26], [800 + dx, y - 6], [1300, y + 12], [300, y + 22]], { wash: '#ffffff', washA: 0.55, line: false }); }
    for (let i = 0; i < 4; i++) gull(200 + i * 220 + Math.sin(t + i) * 30, 560 + (i % 2) * 50, 0.7, t, i + 5); }
  function far(t) { seaKR(940, 1200, t, 5101, { glint: '#fff6d0', gx: 900, n: 30 }); blob([[-500, 960], [-200, 900], [100, 930], [200, 960]], { wash: '#8a9ab0', washA: 1, w: 1.6, col: L, a: 0.5 }); depthFog('#d8ecf8', 0.05); }
  function hill(t) {                                                 // храм, стены и башни, дома с черепицей
    blob([[-500, 1200], [-200, 1000], [300, 960], [700, 990], [800, 1100], [900, 1200]], { wash: '#c8b07a', washA: 1, w: 2, col: L, shade: { gap: 9, a: 0.2, col: '#7a6040', ang: 1.0 } });
    push(80, 970, 0.7); rect(-260, -40, 520, 40, { wash: '#f4ecdc', washA: 1, w: 2, col: L }); for (let k = 0; k < 8; k++) columnKR(-230 + k * 66, -40, 200); poly([[-280, -260], [0, -370], [280, -260]], { wash: '#f0e6d2', washA: 1, w: 2.4, col: L }); rect(-280, -262, 560, 24, { wash: '#e8dcc4', washA: 1, w: 2, col: L }); ell(0, -305, 28, 22, { wash: '#c8401e', washA: 0.7, line: false }); pop();
    for (let i = 0; i < 9; i++) { const x = -360 + i * 120, h = 140 + (i % 3) * 30; rect(x - 18, 1080 - h, 110, h, { wash: '#e8d8b8', washA: 1, w: 1.6, col: L, shade: { gap: 7, a: 0.12, col: '#a89870', ang: 1.4 } }); if (i % 3 === 0) { rect(x - 30, 1080 - h - 60, 70, 60, { wash: '#e0ccaa', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 3; q++) rect(x - 30 + q * 26, 1080 - h - 76, 16, 16, { wash: '#e0ccaa', washA: 1, w: 1.2, col: L }); } }
    for (let i = 0; i < 7; i++) { const x = 380 + i * 130; rect(x, 1040, 110, 80, { wash: '#f0e2c4', washA: 1, w: 1.6, col: L }); poly([[x - 10, 1040], [x + 55, 1000], [x + 120, 1040]], { wash: '#b8502a', washA: 1, w: 1.6, col: L, shade: { gap: 4, a: 0.3, col: '#6a2a10', ang: 1.57 } }); rect(x + 40, 1070, 26, 50, { wash: '#3a2a1a', washA: 1, line: false }); }
    for (const [x, h] of [[-80, 160], [340, 190], [1180, 170]]) cypress(x, 1100, h, t, x);
  }
  function harbor(t) {                                               // гавань, корабли, кран-колесо поднимает колонну
    seaKR(1180, 1330, t, 5102, { cols: ['#2a7ab8', '#1f5f9a', '#164a7a'], n: 24 }); rect(-500, 1300, 1000, 40, { wash: '#d8c8a8', washA: 1, w: 2, col: L });
    shipKR(120, 1260, 0.42, t, 'greek', 1); shipKR(500, 1240, 0.3, t, 'greek', 2);
    const lift = sm(clamp((t - EV.hs_build) / 0.9)), cx = 900;
    push(cx, 1300, 0.9); pencil([[0, 0], [60, -520]], { w: 14, col: KR.woodD, pass2: false }); pencil([[120, 0], [60, -520]], { w: 14, col: KR.woodD, pass2: false }); pencil([[60, -520], [-140, -480]], { w: 10, col: KR.woodD, pass2: false });
    pencil(ellPts(260, -110, 100, 100, t * (t > EV.hs_build ? 3 : 0.3), 0.04, 30), { w: 10, col: KR.wood, pass2: false, gap: false }); for (let k = 0; k < 6; k++) { const a = k / 6 * 6.28 + t * (t > EV.hs_build ? 3 : 0.3); pencil([[260, -110], [260 + Math.cos(a) * 100, -110 + Math.sin(a) * 100]], { w: 5, col: KR.woodD, pass2: false }); }
    human(260, -30, 0.55, t, { body: '#e8dcc0', legs: '#8a6a4a', armR: 'up', armL: 'up', seed: 5110, face: 'calm' });
    const cy = -40 - lift * 120; pencil([[-140, -480], [-140, cy - 250]], { w: 3, col: '#5a4020', pass2: false }); push(-140, cy, 1, (1 - lift) * 1.3); columnKR(0, 0, 250); pop(); pop();
    for (const [x, c] of [[700, '#e8dcc0'], [800, '#c8a878']]) human(x, 1320, 0.5, t, { body: c, legs: '#6a4a2a', armR: 'hold', prop: 'stick', seed: 5111 + x, face: 'calm', flip: -1 });
  }
  function basilica(t) {                                             // открытая колоннада, народ у купели
    for (let k = 0; k < 6; k++) columnKR(380 + k * 150, 1430, 360, { broken: k === 5 ? 0.6 : undefined });
    rect(330, 1050, 820, 30, { wash: '#f0e6d2', washA: 1, w: 2, col: L });
    const P = [[440, '#8a1a1a', 'helmet', 'spear', 'calm'], [540, '#6a4a2a', 'helmet', 'spear', 'calm'], [640, '#3a5a8a', 'merchant', 'hold', 'smile'], [1000, '#f4ecdc', 'crown', 'up', 'smile'], [1100, '#3a2a5a', null, 'wave', 'smile'], [1200, '#c88a3a', 'scarf', 'hold', 'smile']];
    P.forEach(([x, c, h, a, f], i) => human(x, 1440, 0.62, t, { body: c, hat: h === 'crown' ? undefined : h, hatCol: '#7a7a82', legs: '#3a2a20', armR: a === 'spear' ? 'hold' : a, prop: a === 'spear' ? 'spear' : undefined, beard: i < 2 ? '#3a2410' : undefined, flip: x > FONT ? -1 : 1, seed: 5120 + i, face: f }));
  }
  function floor(t) {                                                // мозаичный пол, купель с князем, амфоры, рыба, коза, указатель
    rect(-500, 1440, 2200, 900, { wash: '#e8dcc0', washA: 1, w: 2, col: L }); for (let j = 0; j < 7; j++) for (let i = 0; i < 26; i++) { const c = ['#c8401e', '#2a5a9a', '#e8b84a', '#f4ecdc', '#3a7a4a'][(i * 3 + j * 2) % 5]; rect(-480 + i * 80, 1450 + j * 60, 76, 56, { wash: c, washA: 0.3, w: 1, col: '#8a7a5a' }); }
    for (let i = 0; i < 14; i++) { const cx = -200 + i * 150; pencil(ellPts(cx, 1640, 50, 24, 0, 0.1, 18), { w: 3, col: '#5a3a1a', a: 0.5, pass2: false }); }
    lightPool(FONT, 1640, 520, 140, 'rgba(255,240,200,1)', 0.45);
    push(FONT, 1660, 1); ell(0, -10, 200, 60, { wash: '#f0e8dc', washA: 1, w: 3, col: L }); ell(0, -24, 170, 44, { wash: '#5aa8d8', washA: 1, w: 2, col: '#1a4a7a' });
    for (let q = 0; q < 4; q++) pencil(ellPts(0, -24, 40 + q * 32 + (t * 40) % 32, 10 + q * 8, 0, 0.1, 24), { w: 2, col: '#e8f4f8', a: 0.5, pass2: false });
    human(10, -30, 0.9, t, { body: '#f8f4ec', skin: '#e2b48e', hair: '#6a4a2a', beard: '#6a4a2a', hat: 'fur', hatCol: '#c8281e', legs: '#f8f4ec', armR: t > EV.hs_prince ? 'up' : 'hold', armL: 'hold', seed: 5130, face: 'smile' });
    if (t > EV.hs_prince - 0.05 && t < EV.hs_prince + 0.8) { const k = (t - EV.hs_prince + 0.05) / 0.85, r = rng(5131); for (let q = 0; q < 22; q++) { const a = -Math.PI / 2 + (r() - 0.5) * 2.4, v = 260 + r() * 260; ell(Math.cos(a) * v * k, -60 + Math.sin(a) * v * k + 600 * k * k, 7, 10, { wash: '#bfe4ff', washA: 1 - k, w: 1, col: '#2a6a9a', a: 1 - k }); } }
    human(230, -10, 0.86, t, { body: '#2a2a3a', trim: KR.gold, hat: 'hood', hatCol: '#2a2a3a', beard: '#d8d0c0', hair: '#d8d0c0', legs: '#2a2a3a', armR: 'up', long: 1, seed: 5132, flip: -1, face: 'calm' }); pop();
    for (const [x, c] of [[1040, '#c86a3a'], [1100, '#b85a2a'], [1160, '#d07a4a']]) amphora(x, 1720, 0.8, c);
    push(-40, 1760, 1); rect(-90, -50, 180, 50, { wash: '#8a5a32', washA: 1, w: 2, col: L }); for (let q = 0; q < 4; q++) { push(-60 + q * 40, -60, 1, 0.2); ell(0, 0, 30, 10, { wash: '#a8b8c8', washA: 1, w: 1.4, col: L }); poly([[28, 0], [44, -10], [44, 10]], { wash: '#a8b8c8', washA: 1, w: 1.2, col: L }); pop(); } pop();
    push(1240, 1660, 0.9); blob([[-60, -40], [-60, -90], [40, -100], [70, -70], [60, -40]], { wash: '#f4f0e8', washA: 1, w: 2, col: L }); for (const lx of [-50, -30, 40, 55]) pencil([[lx, -40], [lx, 0]], { w: 6, col: '#e8e0d0', pass2: false }); ell(80, -100, 22, 18, { wash: '#f4f0e8', washA: 1, w: 1.6, col: L }); pencil([[78, -118], [64, -140]], { w: 3, col: '#6a5a4a', pass2: false }); pop();
    if (t > EV.hs_msk - 0.1) { const k = sm(clamp((t - EV.hs_msk + 0.1) / 0.35)); push(150, 1640 + (1 - k) * 300, 1, Math.sin(t * 6) * 0.02 * (1 - k)); pencil([[0, 0], [0, -330]], { w: 12, col: KR.woodD, pass2: false });
      shape([[-110, -340], [120, -340], [170, -290], [120, -240], [-110, -240]], { wash: '#d8b880', washA: 1, w: 2.4, col: L }); txt('МОСКВА', 0, -290, 46, { col: L, font: 'Osw' });
      stamp(10, -170, 0.7, 'ЕЩЁ НЕТ', KR.red, -0.14, popK(t, EV.hs_no - 0.05, 0.25), { size: 58 }); pop(); }
    castShadow(330, 1612, 120, 420, -0.4, 0.35); moodDark(SUN[0], 900, 1100, 1900, '#1a2a4a', 0.25);
  }
  function front(t) { push(-120, 1960, 1); columnKR(0, 0, 420, { broken: 0.5 }); pop(); for (const x of [1230]) sil([[x - 70, 2300], [x - 40, 1700], [x, 1420], [x + 40, 1700], [x + 70, 2300]], '#10261a', 1); }
  WORLD.herson = (t, u, cat) => {
    lay(40, () => sky(t)); lay(18, () => far(t)); lay(9, () => hill(t)); lay(5, () => { harbor(t); depthFog('#d8ecf8', 0.04); }); lay(2.4, () => basilica(t)); lay(1, () => { floor(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(16, [-100, 700, 1200, 1500], '#fff8e0', t, 5140, { sp: 3, sz: 2.4, a: 0.4, wob: 16, add: 1 }));
  };
  DIR.herson = {
    outfit: 'greekC', light: { side: 1, rim: '#fff0c0' }, grade: ['#2a5a8a', 0.06],
    act: () => [[S0.herson, 'talk'], [EV.hs_build, 'proud'], [EV.hs_bapt, 'awe'], [EV.hs_prince, 'grin'], [EV.hs_msk, 'suspicious'], [EV.hs_no, 'sideeye']],
    pose: (t, u, b) => { const w1 = clamp((t - EV.hs_bapt + 0.3) / 0.9), x = lerp(250, 420, sm(w1)), walking = w1 > 0 && w1 < 1;
      return Object.assign(b, { x, y: 1612, s: 0.92, walk: walking ? t * 9 : 0, look: t > EV.hs_msk ? [-0.9, -0.3] : t > EV.hs_bapt ? [0.9, -0.2] : [-0.6, -0.6],
        hand: t > EV.hs_msk ? [-170, -330] : t < EV.hs_bapt ? [-150, -420] : [150, -300], }); },
    cam: () => [[S0.herson, 520, 860, -0.2], [EV.hs_build + 0.6, 760, 900, -0.1], [EV.hs_bapt - 0.1, 640, 1000, -0.02], [EV.hs_bapt + 0.3, 620, 1140, 0.1, 'x'], [EV.hs_msk - 0.1, 600, 1150, 0.1], [EV.hs_msk + 0.2, 360, 1240, 0.14, 'x'], [S1.herson, 340, 1250, 0.18]]
  };
  TRANS_IN.herson = { a: 0.1, b: 0.36, fx(k, t, A, B) {             // искра кремня: белая звезда раскрывает новую эпоху
    const e = sm(k), cx = 560, cy = 1500, R = Math.pow(e, 1.5) * 2400; drawBuf(A);
    const P = []; for (let q = 0; q < 16; q++) { const a = q / 16 * 6.283, rr = R * (q % 2 ? 0.45 : 1); P.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
    inPath(pathOf(P), () => drawBuf(B)); if (e < 0.9) scr(() => { glow(cx, cy, 120 + R * 0.2, 'rgba(255,240,200,1)', 0.8 * (1 - e)); pencil(P.concat([P[0]]), { w: 8, col: '#fff6d8', a: 0.9 * (1 - e), pass2: false, gap: false }); }); } };
})();
