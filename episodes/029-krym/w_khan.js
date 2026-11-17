/* 029 — сцена `khan`: 1571, Бахчисарай → степь. Закат. Слева ханский дворец: резные галереи, ворота, минарет, дюрбе,
   кипарисы, во дворе фонтан, ковры, медные кувшины, гранаты, сокол на жёрдочке. Том (чапан) входит во двор шагом.
   На «ханы» мимо галопом идёт конница хана (зелёный стяг без знаков), камера ведёт её; на «сожгли» камера рывком к горизонту:
   там Москва (стены, башни, луковицы) — на «Москву!» её охватывает огонь, небо краснеет, дым столбами. Без тел и крови.
   Переход В: кадр херсонесского неба «уносит» пыль из-под копыт — горизонтальный пыльный вал. */
(() => {
  EV.kh_come = wtk('s3', 'пришли');
  EV.kh_khans = wtk('s3', 'ханы');
  EV.kh_burn = wtk('s3', 'сожгли');
  EV.kh_msk = wtk('s3', 'Москву!');
  KEYW.push('ханы', 'Москву!');
  const L = KR.ink, fire = t => clamp((t - EV.kh_burn) / 0.9);
  function sky(t) { const f = fire(t); vgrad(-900, 1000, [lerpC('#2a2a5a', '#3a0e0e', f), lerpC('#7a4a6a', '#8a1a0a', f), lerpC('#e88a4a', '#ff5a1a', f), lerpC('#ffc870', '#ffb04a', f)], 1);
    glow(260, 820, 160, 'rgba(255,200,120,1)', 0.35 * (1 - f)); ell(260, 840, 60, 60, { wash: '#ffe8b0', washA: 1 - f * 0.6, line: false }); }
  function moscow(t) {                                               // горизонт: Москва; на «сожгли» — пожар
    const f = fire(t); blob([[-500, 1000], [400, 980], [1700, 1000], [1700, 1100], [-500, 1100]], { wash: '#6a5a3a', washA: 1, line: false });
    push(900, 990, 0.55); rect(-500, -80, 1000, 80, { wash: lerpC('#c84a3a', '#3a1a10', f * 0.7), washA: 1, w: 2, col: L });
    for (let k = 0; k < 6; k++) { const x = -450 + k * 180; rect(x - 30, -180, 60, 180, { wash: lerpC('#c84a3a', '#3a1a10', f * 0.7), washA: 1, w: 2, col: L }); poly([[x - 36, -180], [x, -250], [x + 36, -180]], { wash: '#3a5a3a', washA: 1, w: 1.6, col: L }); }
    for (const [x, h] of [[-120, 200], [60, 260], [220, 180]]) { rect(x - 30, -80 - h, 60, h, { wash: '#f0e6d2', washA: 1, w: 1.6, col: L }); blob([[x - 40, -80 - h], [x - 30, -120 - h], [x, -150 - h], [x + 30, -120 - h], [x + 40, -80 - h]], { wash: KR.gold, washA: 1, w: 1.6, col: L }); }
    for (let k = 0; k < 14; k++) { const x = -700 + k * 110; rect(x, -60, 80, 60, { wash: '#7a5a3a', washA: 1, w: 1.2, col: L }); poly([[x - 6, -60], [x + 40, -96], [x + 86, -60]], { wash: '#5a3a24', washA: 1, w: 1.2, col: L }); }
    if (f > 0) { const r = rng(5200); for (let q = 0; q < 16; q++) { const x = -700 + r() * 1400, h = (160 + r() * 260) * f, w = 40 + r() * 50; blob([[x - w, 0], [x - w * 0.5, -h * 0.6], [x + Math.sin(t * 9 + q) * 14, -h], [x + w * 0.5, -h * 0.5], [x + w, 0]], { wash: q % 2 ? '#ff7a1a' : '#ffc040', washA: 0.9, line: false }); }
      for (let q = 0; q < 10; q++) { const ph = (t * 0.4 + q / 10) % 1, x = -600 + q * 130; ell(x + ph * 120, -200 - ph * 700, 90 + ph * 160, 60 + ph * 100, { wash: '#2a1a1a', washA: 0.7 * f * (1 - ph * 0.6), line: false }); }
      glow(0, -100, 700, 'rgba(255,120,40,1)', 0.45 * f); } pop();
    const rv = sm(clamp((t - EV.kh_burn + 0.35) / 0.4)); fillPts([[-600, 600], [1800, 600], [1800, 1000], [-600, 1000]], lerpC('#e88a4a', '#ff5a1a', f), 0.92 * (1 - rv));
    if (rv > 0) { push(900, 720, popK(t, EV.kh_burn - 0.1, 0.3)); ctx.save(); ctx.fillStyle = 'rgba(16,10,8,0.85)'; ctx.fillRect(-150, -42, 300, 84); ctx.restore(); txt('МОСКВА', 0, 2, 56, { col: '#ffe08a', font: 'Osw' }); pop(); }
  }
  function steppe(t) {                                               // степь, орда уходит к горизонту, пыль
    blob([[-500, 1060], [600, 1040], [1700, 1060], [1700, 1400], [-500, 1400]], { wash: '#a8884a', washA: 1, w: 2, col: L, shade: { gap: 10, a: 0.2, col: '#6a5228', ang: 0.2 } });
    const k = clamp((t - EV.kh_khans) / 2.0); for (let i = 0; i < 16; i++) { const r = rng(5210 + i), x = 200 + r() * 700 + k * 400, y = 1080 + r() * 60, s = 0.12 + r() * 0.06; if (t > EV.kh_come) horseKR(x, y, s, t, i % 2 ? '#3a2414' : '#5a3a1e', 1, i, { body: '#7a2a3a', hat: 'fur', hatCol: '#2a1a10', legs: '#3a2a1a', seed: 5230 + i, face: 'calm' }); }
    if (t > EV.kh_come) for (let q = 0; q < 10; q++) { const r = rng(5240 + q); ell(200 + r() * 900 + k * 400, 1100 + r() * 30, 80 + r() * 60, 30, { wash: '#c8a868', washA: 0.4, line: false }); }
  }
  function palace(t) {                                               // ханский дворец: галереи, ворота, минарет, дюрбе, кипарисы
    push(-80, 1300, 0.95); rect(-300, -360, 600, 360, { wash: '#f0e2c8', washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.12, col: '#a89070', ang: 1.4 } });
    rect(-320, -420, 640, 60, { wash: '#8a3a1e', washA: 1, w: 2, col: L }); poly([[-340, -420], [0, -520], [340, -420]], { wash: '#a84a2a', washA: 1, w: 2, col: L, shade: { gap: 5, a: 0.3, col: '#5a2010', ang: 1.57 } });
    for (let k = 0; k < 6; k++) { const x = -260 + k * 104; shape([[x, -360], [x, -250], [x + 40, -230], [x + 80, -250], [x + 80, -360]], { wash: '#2a6a5a', washA: 1, w: 1.8, col: L }); for (let q = 0; q < 3; q++) pencil([[x + 10 + q * 25, -350], [x + 10 + q * 25, -260]], { w: 2, col: KR.goldL, a: 0.6, pass2: false }); }
    shape([[-60, 0], [-60, -160], [0, -220], [60, -160], [60, 0]], { wash: '#3a2414', washA: 1, w: 2.4, col: L }); pencil([[-60, -160], [0, -220], [60, -160]], { w: 8, col: KR.gold, pass2: false });
    for (let k = 0; k < 8; k++) ell(-280 + k * 80, -180, 14, 20, { wash: '#ffd890', washA: 0.8, w: 1.2, col: L }); pop();
    push(330, 1300, 0.95); rect(-26, -560, 52, 560, { wash: '#f4ecdc', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.15, col: '#a89070', ang: 1.57 } }); rect(-40, -470, 80, 22, { wash: '#e8dcc4', washA: 1, w: 1.6, col: L }); poly([[-30, -560], [0, -680], [30, -560]], { wash: '#7a8a8a', washA: 1, w: 1.6, col: L }); pop();
    push(520, 1300, 0.9); rect(-80, -140, 160, 140, { wash: '#e8dcc4', washA: 1, w: 2, col: L }); blob([[-90, -140], [-70, -210], [0, -240], [70, -210], [90, -140]], { wash: '#9a9a8a', washA: 1, w: 2, col: L }); pop();
    for (const [x, h] of [[-420, 260], [220, 300], [430, 240], [660, 280]]) cypress(x, 1310, h, t, x);
    const P = [[620, '#2a6a5a', 'turban', 'hold'], [760, '#8a2a3a', 'fur', 'point'], [-200, '#c8a040', 'turban', 'wave'], [-60, '#3a4a7a', 'fur', 'hold']];
    P.forEach(([x, c, h, a], i) => human(x, 1320, 0.55, t, { body: c, hat: h, hatCol: h === 'turban' ? '#f4ecdc' : '#2a1a10', beard: '#2a1a10', legs: '#3a2a1a', armR: a, long: 1, trim: KR.gold, flip: x > 400 ? -1 : 1, seed: 5250 + i, face: t > EV.kh_burn ? 'shock' : 'calm' }));
  }
  function riders(t) {                                               // ближняя конница галопом слева направо
    if (t < EV.kh_khans - 0.4) return; const k = (t - EV.kh_khans + 0.4) / 2.2;
    for (let i = 0; i < 4; i++) { const x = -300 + k * 1900 - i * 260, rider = { body: i === 0 ? '#2a7a4a' : '#7a2a2a', hat: 'fur', hatCol: '#2a1a10', beard: '#2a1a10', legs: '#3a2a1a', armR: i === 0 ? 'up' : 'hold', prop: i === 0 ? undefined : 'spear', seed: 5260 + i, face: 'angry' };
      horseKR(x, 1400 + (i % 2) * 20, 0.62, t, ['#3a2414', '#6a3a1e', '#2a1a10', '#8a5a2a'][i], 1, i, rider);
      if (i === 0) { pencil([[x + 30, 1400 - 280], [x + 20, 1400 - 520]], { w: 5, col: KR.woodD, pass2: false }); shape([[x + 20, 1400 - 520], [x + 170 + Math.sin(t * 9) * 16, 1400 - 500], [x + 150 + Math.sin(t * 9) * 16, 1400 - 430], [x + 22, 1400 - 440]], { wash: '#2a8a4a', washA: 1, w: 2, col: L }); } }
    for (let q = 0; q < 12; q++) { const r = rng(5270 + q); ell(-400 + k * 1900 - r() * 900, 1420 + r() * 30, 60 + r() * 60, 26 + r() * 20, { wash: '#c8a868', washA: 0.5, line: false }); }
  }
  function court(t) {                                                // двор: плитка, фонтан, ковры, кувшины, гранаты, сокол
    rect(-500, 1440, 2200, 900, { wash: '#c8a878', washA: 1, w: 2, col: L }); for (let j = 0; j < 7; j++) for (let i = 0; i < 24; i++) rect(-480 + i * 90 + (j % 2) * 45, 1450 + j * 64, 86, 60, { wash: (i + j) % 2 ? '#d8b888' : '#b8946a', washA: 1, w: 1, col: '#7a5a3a' });
    lightPool(260, 1640, 700, 160, 'rgba(255,190,120,1)', 0.4 + fire(t) * 0.2);
    push(820, 1700, 1); rect(-150, -160, 300, 160, { wash: '#f0e6d2', washA: 1, w: 2.4, col: L }); for (let q = 0; q < 3; q++) ell(-80 + q * 80, -100, 26, 26, { wash: '#5aa8d8', washA: 1, w: 1.6, col: L }); const dr = (t * 2) % 1; for (let q = 0; q < 3; q++) ell(-80 + q * 80, -60 + dr * 50, 5, 8, { wash: '#bfe4ff', washA: 1 - dr, line: false }); rect(-130, -10, 260, 10, { wash: '#5aa8d8', washA: 1, line: false }); pop();
    for (const [x, c] of [[0, '#8a1a2a'], [200, '#1a4a7a']]) { push(x, 1820, 1); shape([[-150, 0], [150, 0], [130, -50], [-130, -50]], { wash: c, washA: 1, w: 2, col: L }); for (let q = 0; q < 5; q++) ell(-100 + q * 50, -25, 14, 10, { wash: KR.gold, washA: 1, w: 1, col: L }); pop(); }
    for (const [x, y] of [[1000, 1720], [1060, 1740]]) { push(x, y, 1); blob([[-20, 0], [-34, -50], [-14, -90], [-20, -120], [20, -120], [14, -90], [34, -50], [20, 0]], { wash: '#c8783a', washA: 1, w: 2, col: L }); pop(); }
    for (let q = 0; q < 5; q++) ell(560 + q * 30, 1830 - (q % 2) * 20, 20, 20, { wash: '#c8283a', washA: 1, w: 1.6, col: L });
    push(-80, 1660, 1); pencil([[0, 0], [0, -260]], { w: 8, col: KR.woodD, pass2: false }); pencil([[-60, -260], [60, -260]], { w: 8, col: KR.woodD, pass2: false }); blob([[-30, -260], [-36, -320], [-10, -360], [20, -350], [30, -300], [20, -260]], { wash: '#7a5a3a', washA: 1, w: 2, col: L }); ell(4, -350, 16, 16, { wash: '#8a6a4a', washA: 1, w: 1.6, col: L }); poly([[18, -352], [32, -346], [18, -340]], { wash: KR.gold, washA: 1, line: false }); pop();
    push(1180, 1660, 1); rect(-60, -100, 120, 100, { wash: '#6a4424', washA: 1, w: 2, col: L }); for (let q = 0; q < 5; q++) pencil([[-40 + q * 20, -100], [-46 + q * 22, -200]], { w: 3, col: '#c8a868', pass2: false }); pop();
    castShadow(330, 1612, 120, 500, 0.5, 0.4); moodDark(260, 900, 900, 1800, '#140a14', 0.3);
  }
  function front(t) { for (const x of [-140, 1230]) sil([[x - 70, 2300], [x - 40, 1700], [x, 1420], [x + 40, 1700], [x + 70, 2300]], '#0e1a12', 1); }
  WORLD.khan = (t, u, cat) => {
    lay(40, () => sky(t)); lay(24, () => moscow(t)); lay(11, () => { steppe(t); depthFog('#e8a870', 0.05); }); lay(4.5, () => palace(t)); lay(2.2, () => riders(t)); lay(1, () => { court(t); cat(); }); lay(0.6, () => front(t));
    if (fire(t) > 0) lay(2, () => motes(30, [-100, 400, 1200, 1500], '#ffa040', t, 5280, { sp: -50, sz: 3, a: 0.7 * fire(t), wob: 30, add: 1 }));
  };
  DIR.khan = {
    outfit: 'shapan', light: { side: -1, rim: '#ffb070' }, grade: ['#4a1a10', 0.1],
    act: () => [[S0.khan, 'proud'], [EV.kh_khans, 'grin'], [EV.kh_burn, 'shock'], [EV.kh_msk, 'scared']],
    pose: (t, u, b) => { const w1 = clamp(u / 1.1), x = lerp(200, 340, sm(w1)), turn = t > EV.kh_burn - 0.1;
      return Object.assign(b, { x, y: 1612, s: 0.95, walk: w1 < 1 ? t * 9 : 0, look: turn ? [0.9, -0.7] : t > EV.kh_khans ? [0.9, 0] : [-0.4, -0.3], hand: turn ? [60, -400] : [150, -300], handF: turn ? [-40, -400] : undefined }); },
    cam: () => [[S0.khan, 420, 980, -0.08], [EV.kh_khans - 0.2, 460, 1000, -0.04], [EV.kh_khans + 0.4, 720, 1060, 0.02], [EV.kh_burn, 760, 960, 0.0], [EV.kh_burn + 0.25, 820, 860, 0.12, 'x'], [S1.khan, 840, 860, 0.16]]
  };
  TRANS_IN.khan = { a: 0.1, b: 0.36, fx(k, t, A, B) {               // пыльный вал из-под копыт сносит кадр вправо
    const e = sm(k), X = -300 + e * 1900; drawBuf(B); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(X, 0, W, H); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore();
    scr(() => { const r = rng(5290); for (let i = 0; i < 26; i++) ell(X + (r() - 0.5) * 260, r() * H, 140 + r() * 120, 120 + r() * 100, { wash: i % 2 ? '#c8a868' : '#a88850', washA: 0.95, line: false }); }); } };
})();
