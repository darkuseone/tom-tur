/* 032 — сцена `steppe` (s2, XVIII век): Дикое поле. Утро, низкое солнце слева (главный свет), золотой ковыль под ветром,
   курган с половецкой каменной бабой, балка с выходом угольного пласта, далёкие всадники на горизонте (без оружия в действии), орёл.
   На «ничьей» — Том разводит лапами, пустая степь; на «империя» — КАРТА: стрелки переселений (сербы с Балкан → Славяносербия 1753,
   греки из Крыма → Мариуполь 1778–1780); после карты в степи стоят мазанки, колодец-журавль, чумацкий воз с волами, овцы, поселенцы.
   На «уголь» — поселенец бьёт кайлом в балке, Том поднимает блестящий кусок угля. Бейдж «НИЧЕЙ» → «ИМПЕРИЯ». Переход — ковыль проносится. */
(() => {
  EV.st_wild = wtk('s2', 'дикой');
  EV.st_none = wtk('s2', 'ничьей.');
  EV.st_emp = wtk('s2', 'империя');
  EV.st_coal = wtk('s2', 'уголь.') - 0.1;
  const MAP1 = EV.st_coal - 0.35;
  KEYW.push('ничьей.', 'империя', 'уголь.');
  const L = DB.ink, SUN = [180, 600];
  const settled = t => t > MAP1;
  function sky(t) { vgrad(-900, 1100, ['#4a7ab8', '#8ab8e0', '#f0dcb0', '#f8c890'], 1); glow(SUN[0], SUN[1], 240, 'rgba(255,230,170,1)', 0.45); ell(SUN[0], SUN[1], 56, 56, { wash: '#fff6d8', washA: 1, line: false });
    for (let i = 0; i < 3; i++) { const r = rng(8600 + i), y = 280 + i * 100, dx = (t * 14) % 240; blob([[-200 + r() * 200 + dx, y], [400 + dx, y - 20], [900 + dx, y], [1300, y + 16], [300, y + 22]], { wash: '#fff4e0', washA: 0.5, line: false }); }
    const ex = 300 + t * 40 % 800, ey = 520 + Math.sin(t) * 30; pencil([[ex - 50, ey - Math.sin(t * 3) * 10], [ex, ey], [ex + 50, ey - Math.sin(t * 3) * 10]], { w: 5, col: '#2a1a10', pass2: false }); }
  function far(t) { hills(1030, 40, '#c8b070', 1.3); hills(1050, 24, '#b8a060', 3.1);
    for (let i = 0; i < 3; i++) { const x = 700 + i * 90 + Math.sin(t * 0.8) * 20; push(x, 1040, 0.35); ell(0, -50, 60, 26, { wash: '#4a3a2a', washA: 1, w: 2, col: L }); ell(56, -74, 18, 26, { wash: '#4a3a2a', washA: 1, w: 1.6, col: L, rot: 0.6 }); for (const lx of [-40, -20, 20, 40]) pencil([[lx, -30], [lx + Math.sin(t * 9 + lx) * 10, 10]], { w: 5, col: '#3a2a1a', pass2: false });
      human(0, -60, 0.8, t, { body: ['#8a2a2a', '#2a4a6a', '#5a5a2a'][i], hat: i === 1 ? 'fur' : 'cap', hatCol: '#2a1a10', legs: '#2a2a30', armR: 'hold', seed: 8610 + i, face: 'calm' }); pop(); }
    kurgan(180, 1060, 300, 80, '#b8a868'); kurgan(1000, 1060, 260, 60, '#b0a060'); depthFog('#f8e8c8', 0.1); }
  function mid(t) {                                                 // курган с бабой, мазанки, журавль, воз с волами, овцы, поселенцы
    kurgan(840, 1240, 520, 170, '#a8a060'); stoneBaba(840, 1080, 0.9); stoneBaba(940, 1110, 0.6, { col: '#b8b098' });
    feather(-300, 1400, 1180, 60, t, 8620, '#f0e4c0', 70);
    const hx = ((t * 70) % 1800) - 400;                             // табун тарпанов скачет по степи, дрофы, всадники-казаки
    for (let q = 0; q < 5; q++) { push(hx + q * 110 - (q % 2) * 30, 1230 + (q % 3) * 16, 0.5); const g = Math.sin(t * 14 + q) * 0.3; ell(0, -60, 80, 34, { wash: ['#8a6a4a', '#6a4a30', '#a8885a'][q % 3], washA: 1, w: 2, col: L });
      ell(76, -96, 22, 34, { wash: ['#8a6a4a', '#6a4a30', '#a8885a'][q % 3], washA: 1, w: 1.6, col: L, rot: 0.7 }); pencil([[60, -110], [40, -80]], { w: 8, col: '#2a1a10', pass2: false }); pencil([[-80, -70], [-110, -50]], { w: 6, col: '#2a1a10', pass2: false });
      for (const [lx, ph] of [[-50, g], [-30, -g], [40, -g], [60, g]]) pencil([[lx, -36], [lx + ph * 40, 10]], { w: 6, col: '#3a2a1a', pass2: false }); pop(); }
    for (const [x, y] of [[380, 1270], [470, 1290]]) { push(x, y, 0.6); ell(0, -30, 40, 24, { wash: '#b8946a', washA: 1, w: 1.6, col: L }); pencil([[30, -40], [44, -80]], { w: 5, col: '#c8b8a0', pass2: false }); ell(46, -84, 10, 9, { wash: '#c8c0b0', washA: 1, w: 1.2, col: L }); for (const lx of [-10, 10]) pencil([[lx, -10], [lx, 16]], { w: 3, col: '#6a5a3a', pass2: false }); pop(); }
    if (!settled(t)) { for (let i = 0; i < 2; i++) { const x = 1240 - i * 130 - (t - S0.steppe) * 30; push(x, 1280, 0.62); ell(0, -50, 60, 26, { wash: '#5a3a2a', washA: 1, w: 2, col: L }); ell(56, -74, 18, 26, { wash: '#5a3a2a', washA: 1, w: 1.6, col: L, rot: 0.6 });
        for (const lx of [-40, -20, 20, 40]) pencil([[lx, -30], [lx + Math.sin(t * 9 + lx) * 8, 10]], { w: 5, col: '#3a2a1a', pass2: false }); human(0, -60, 0.8, t, { body: i ? '#8a2a2a' : '#2a4a8a', hat: 'fur', hatCol: '#1a1a20', legs: '#3a3a6a', armR: 'wave', seed: 8615 + i, face: 'grin', flip: -1 }); pop(); }
      for (let i = 0; i < 12; i++) { const r = rng(8625 + i), x = r() * 1400 - 200, y = 1260 + r() * 40; ell(x, y, 6, 6, { wash: i % 2 ? '#e83a2a' : '#4a7ad8', washA: 1, line: false }); } return; }
    const a = clamp((t - MAP1) / 0.3);
    for (const [x, s] of [[-80, 1], [260, 0.85]]) { push(x, 1250, s * 0.75); rect(-150, -170, 300, 170, { wash: '#f0e8d8', washA: 1, w: 2.4, col: L, shade: { gap: 9, a: 0.1, col: '#8a8070', ang: 1.4 } });
      poly([[-180, -170], [0, -290], [180, -170]], { wash: '#c8a858', washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.3, col: '#7a5a20', ang: 1.2 } }); rect(-110, -130, 60, 60, { wash: '#4a6a8a', washA: 1, w: 1.6, col: L }); rect(40, -120, 60, 120, { wash: '#6a4a2a', washA: 1, w: 1.6, col: L });
      for (let q = 0; q < 3; q++) ell(20 + q * 12, -300 - q * 30 - (t * 30) % 30, 18 + q * 6, 12 + q * 4, { wash: '#d8d0c8', washA: 0.4, line: false }); pop(); }
    push(500, 1260, 0.75); pencil([[0, 0], [0, -200]], { w: 8, col: '#5a3a1a', pass2: false }); const sw = Math.sin(t * 1.2) * 0.2; pencil([[-180 * Math.cos(sw), -200 - 180 * Math.sin(sw) * 0.3 + 60], [160, -260 + sw * 60]], { w: 6, col: '#6a4a2a', pass2: false }); rect(-50, -40, 100, 40, { wash: '#8a6a3a', washA: 1, w: 2, col: L }); pop();
    push(1120, 1270, 0.7); rect(-150, -150, 260, 90, { wash: '#8a6a3a', washA: 1, w: 2, col: L }); for (const k of [-110, 70]) { ell(k, -50, 46, 46, { wash: false, w: 5, col: '#3a2a1a' }); pencil([[k - 40, -50], [k + 40, -50]], { w: 2, col: '#3a2a1a', pass2: false }); }
      for (let q = 0; q < 2; q++) { push(-260 - q * 20, -40 + q * 10, 0.9); ell(0, -50, 70, 34, { wash: '#e8dcc8', washA: 1, w: 2, col: L }); ell(-70, -66, 22, 18, { wash: '#e8dcc8', washA: 1, w: 1.6, col: L }); pencil([[-84, -80], [-104, -100]], { w: 3, col: '#c8b898', pass2: false }); for (const lx of [-40, -20, 20, 40]) pencil([[lx, -20], [lx, 10]], { w: 7, col: '#c8b898', pass2: false }); pop(); } pop();
    for (let q = 0; q < 6; q++) { const x = 600 + q * 50 + Math.sin(t + q) * 6, y = 1290 + (q % 2) * 20; ell(x, y - 18, 24, 16, { wash: '#f4f0e6', washA: a, w: 1.4, col: L, a }); ell(x + 22, y - 24, 9, 8, { wash: '#3a3a3a', washA: a, line: false }); }
    const P = [[60, '#3a5a8a', 'fur', 'hold'], [180, '#c8a070', 'scarf', 'wave'], [380, '#8a3a2a', 'cap', 'hold'], [720, '#f0e8d8', 'straw', 'stick'], [1000, '#5a6a3a', 'fur', 'hold'], [1260, '#a8584a', 'scarf', 'hold']];
    P.forEach(([x, c, h, ar], i) => human(x, 1300, 0.58, t, { body: c, hat: h, hatCol: h === 'straw' ? '#e8d08a' : h === 'scarf' ? '#e8603a' : '#2a1a10', legs: '#3a3a30', armR: ar === 'stick' ? 'hold' : ar, prop: ar === 'stick' ? 'stick' : undefined, long: h === 'scarf' ? 1 : undefined, flip: x > 600 ? -1 : 1, seed: 8630 + i, face: t > EV.st_coal ? 'shock' : 'calm' }));
  }
  function ground(t) {                                              // степная земля, балка с угольным пластом, кайло, камни, полынь, суслик
    rect(-500, 1300, 2200, 1000, { wash: '#c8b070', washA: 1, w: 2, col: L, shade: { gap: 12, a: 0.1, col: '#7a6a3a', ang: 0.2 } });
    poly([[600, 1560], [760, 1500], [1300, 1520], [1600, 1600], [1600, 1900], [700, 1860]], { wash: '#8a6a40', washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.2, col: '#4a3010', ang: 1.3 } });
    poly([[700, 1700], [1600, 1660], [1600, 1740], [720, 1780]], { wash: '#141418', washA: 1, w: 2, col: '#000' }); const r = rng(8640); for (let i = 0; i < 14; i++) { const x = 760 + r() * 700; ell(x, 1720 + r() * 30, 8, 4, { wash: '#8a8aa0', washA: 0.7, line: false }); }
    if (t > EV.st_coal - 0.2) { const k = clamp((t - EV.st_coal + 0.2) / 0.3); glow(880, 1720, 120, 'rgba(255,240,200,1)', 0.25 * k); for (let q = 0; q < 8; q++) { const a = q * 0.8, d = 30 + k * 80; ell(880 + Math.cos(a) * d, 1700 + Math.sin(a) * d * 0.5 - k * 40, 8, 6, { wash: '#1a1a20', washA: 1 - k * 0.5, line: false }); } }
    human(1000, 1700, 0.75, t, { body: '#e8dcc0', hat: 'straw', hatCol: '#e8d08a', legs: '#4a3a2a', armR: 'hold', prop: 'axe', propAng: t > EV.st_coal - 0.3 ? -0.4 + Math.sin(t * 10) * 0.4 : -1.2, flip: -1, seed: 8650, face: t > EV.st_coal ? 'grin' : 'calm' });
    feather(-500, 700, 1320, 80, t, 8660, '#f4ecd0', 90); for (let i = 0; i < 18; i++) { const x = r() * 1800 - 300, y = 1350 + r() * 500; pencil([[x, y], [x - 8, y - 26], [x, y], [x + 8, y - 24]], { w: 2, col: '#8a9a6a', pass2: false }); }
    for (let i = 0; i < 6; i++) ell(r() * 1700 - 300, 1800 + r() * 200, 30, 12, { wash: '#a89878', washA: 1, w: 1.4, col: L });
    for (let i = 0; i < 26; i++) { const x = r() * 1000 - 300, y = 1360 + r() * 520, c = ['#e83a2a', '#4a7ad8', '#f8e060', '#f4f0e6'][i % 4]; pencil([[x, y], [x + 2, y - 30]], { w: 2, col: '#6a8a3a', pass2: false }); ell(x + 2, y - 32, 8, 7, { wash: c, washA: 1, w: 1, col: L }); }
    push(160, 1880, 1); rect(-90, -40, 180, 40, { wash: '#8a6a40', washA: 1, w: 2, col: L }); ell(-60, -40, 30, 14, { wash: '#a8a090', washA: 1, w: 1.4, col: L }); pencil([[-90, -40], [-140, -70]], { w: 4, col: '#6a4a2a', pass2: false }); pop();
    push(-60, 1720, 1); ell(0, -30, 70, 30, { wash: '#8a8478', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.2, col: '#4a4438', ang: 1 } }); pop();
    push(1220, 1900, 0.8); ell(0, -30, 16, 30, { wash: '#c89a5a', washA: 1, w: 1.6, col: L }); ell(0, -66, 12, 12, { wash: '#c89a5a', washA: 1, w: 1.4, col: L }); pop();
    lightPool(SUN[0] + 400, 1660, 900, 170, 'rgba(255,220,150,1)', 0.3); castShadow(330, 1650, 120, 620, 0.95, 0.35); moodDark(900, 900, 1300, 1900, '#2a1a08', 0.18);
  }
  function front(t) { feather(-400, 1500, 1980, 40, t, 8670, '#f8f0d8', 260); for (const x of [-150]) sil([[x - 80, 2300], [x - 60, 1560], [x + 60, 1540], [x + 80, 2300]], '#2a1a08', 1); }
  function mapBeat(t) {                                             // карта переселений XVIII в.
    const k = sm(clamp((t - EV.st_emp) / 0.25)) * (1 - sm(clamp((t - MAP1 + 0.05) / 0.25))); if (k <= 0) return; MAPON = t;
    scr(() => { ctx.save(); ctx.globalAlpha = k; const P = GLOBE.map(560, 960, 84, 31.5, 47, { landCol: { eurasia: '#e2d0a0' } }); donMap(P, { oblA: 0.35 });
      const p = clamp((t - EV.st_emp - 0.1) / 0.9);
      GLOBE.route(P, [[21, 44.5], [27, 47], [33, 48.5], [38.3, 48.7]], p, { col: '#c8281e', label: 'СЕРБЫ · 1753', bend: 0.12, lx: -40, ly: -40, size: 34 });
      GLOBE.route(P, [[34.2, 44.9], [35.8, 46.3], [37.55, 47.1]], p, { col: '#1e5aa8', label: 'ГРЕКИ · 1778', bend: -0.2, lx: -170, ly: 40, size: 34 });
      GLOBE.city(P, 37.55, 47.1, 'МАРИУПОЛЬ', { left: 1, size: 34 }); GLOBE.city(P, 38.0, 48.6, 'БАХМУТ', { size: 34 });
      ctx.restore(); infoPlate(540, 1380, [['ДИКОЕ ПОЛЕ → НОВОРОССИЙСКАЯ ГУБЕРНИЯ', 38, DB.brassL], ['1764 · империя зовёт поселенцев', 30]], t, EV.st_emp + 0.15); });
  }
  WORLD.steppe = (t, u, cat) => {
    lay(40, () => sky(t)); lay(12, () => far(t)); lay(3.2, () => { mid(t); depthFog('#f8ecd0', 0.04); }); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(18, [-100, 700, 1200, 1500], '#fff4d0', t, 8680, { sp: 4, vx: 60, sz: 2.2, a: 0.45, wob: 12, add: 1 }));
    mapBeat(t);
  };
  DIR.steppe = {
    outfit: 'kazakS', light: { side: -1, rim: '#ffe0a0' }, grade: ['#3a2a10', 0.05],
    act: () => [[S0.steppe, 'talk'], [EV.st_wild, 'awe'], [EV.st_none, 'sideeye'], [EV.st_emp, 'suspicious'], [EV.st_coal, 'shock'], [EV.st_coal + 0.6, 'proud']],
    pose: (t, u, b) => { const w1 = clamp(u / 0.9), x = lerp(80, 330, sm(w1)), shrug = t > EV.st_none - 0.1 && t < EV.st_emp; return Object.assign(b, { x, y: 1650, s: 0.95, walk: w1 < 1 ? t * 9 : 0, look: t > EV.st_coal ? [0.7, 0.3] : [0.5, -0.3],
      hand: shrug ? [200, -330] : t > EV.st_coal ? [170, -420] : [150, -300], handF: shrug ? [-200, -330] : undefined }); },
    afterCat: (t, u, P) => { if (t < EV.st_coal + 0.2) return; const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s, k = popK(t, EV.st_coal + 0.2, 0.3); push(x, y - 20, k);
      poly([[-36, 10], [-28, -26], [6, -38], [36, -14], [30, 22], [-6, 30]], { wash: '#141418', washA: 1, w: 2.4, col: '#000' }); for (let q = 0; q < 4; q++) ell(-14 + q * 12, -14 + (q % 2) * 16, 4, 3, { wash: '#c8d0ff', washA: 0.9, line: false }); pop(); },
    hud: t => { if (t > EV.st_coal + 0.25) infoPlate(560, 800, [['ДОНЕЦКИЙ УГОЛЬ · 1721', 46, DB.brassL], ['первые находки при Петре I', 30]], t, EV.st_coal + 0.25); },
    cam: () => [[S0.steppe, 600, 900, -0.08], [EV.st_wild, 560, 960, -0.02], [EV.st_none, 480, 1000, 0.04, 'x'], [MAP1, 620, 980, 0.0], [EV.st_coal, 700, 1100, 0.1, 'x'], [S1.steppe, 660, 1100, 0.12]]
  };
  TRANS_IN.steppe = { a: 0.06, b: 0.4, fx(k, t, A, B) {            // ковыль проносится через кадр слева направо, за ним — степь
    const e = sm(k), cut = -300 + e * 1700; drawBuf(B); scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(cut, 0, W + 400, H); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore();
      const rr = rng(8690); for (let i = 0; i < 90; i++) { const y = rr() * H, x = cut + (rr() - 0.5) * 260, h = 160 + rr() * 260; pencil([[x - 40, y + h / 2], [x, y], [x + 30, y - h / 2]], { w: 3 + rr() * 4, col: rr() < 0.5 ? '#f4ecd0' : '#d8c890', a: 0.9, pass2: false, gap: false }); } }); } };
})();
