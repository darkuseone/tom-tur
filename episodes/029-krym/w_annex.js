/* 029 — сцена `annex`: 1994 → 2014.
   1994: Будапешт, зал переговоров — за окном Дунай и Парламент на закате. На столе меморандум «ГРАНИЦЫ УКРАИНЫ» с картой,
   делегаты (без узнаваемых лиц), фотографы со вспышками. Том ставит подпись свидетелем; на «границы» вокруг Украины с Крымом
   загорается пунктир. На «Но» документ рвётся пополам — разрыв раскрывает 2014: ночь на перешейке, морось, стела «КРЫМ»,
   колонна грузовиков и бронемашин без опознавательных знаков, вертолёты, шлагбаум, мешки с песком (без стрельбы и насилия).
   На «забрала» тень накрывает стелу, печать «АННЕКСИЯ · 18.03.2014». Без шуток. Переход В: строки машинки → в этой сцене
   свой вход — бюллетень-лист «складывается» пополам. */
(() => {
  EV.an_promise = wtk('s8', 'обещала');
  EV.an_border = wtk('s8', 'границы.');
  EV.an_14 = wtk('s8', 'Но') - 0.05;
  EV.an_troops = wtk('s8', 'войска');
  EV.an_take = wtk('s8', 'забрала');
  KEYW.push('границы.', 'войска', 'Крым.');
  const L = KR.ink, B14 = t => t >= EV.an_14 + 0.18;
  const tearX = (y, s = 0) => 560 + Math.sin(y * 0.013) * 40 + Math.sin(y * 0.05 + 2) * 18 + s;
  // ---------- 1994, Будапешт
  function viewA(t) { vgrad(-600, 1400, ['#3a4a7a', '#c87a5a', '#f8c070'], 1); seaKR(1150, 1500, t, 5701, { cols: ['#5a6a8a', '#3a4a6a', '#2a3450'], glint: '#ffc880', gx: 500, n: 24 });
    push(560, 1150, 0.9); rect(-560, -120, 1120, 120, { wash: '#e8d8c0', washA: 1, w: 2, col: L }); for (let k = 0; k < 16; k++) { const x = -540 + k * 72; rect(x, -200, 40, 80, { wash: '#e8d8c0', washA: 1, w: 1.4, col: L }); poly([[x - 4, -200], [x + 20, -250], [x + 44, -200]], { wash: '#c84a3a', washA: 1, w: 1.2, col: L }); }
    blob([[-110, -200], [-100, -320], [0, -380], [100, -320], [110, -200]], { wash: '#c84a3a', washA: 1, w: 2, col: L }); pencil([[0, -380], [0, -440]], { w: 5, col: L, pass2: false });
    for (const x of [-300, 300]) { rect(x - 20, -340, 40, 140, { wash: '#e8d8c0', washA: 1, w: 1.4, col: L }); poly([[x - 24, -340], [x, -420], [x + 24, -340]], { wash: '#c84a3a', washA: 1, w: 1.2, col: L }); }
    for (let k = 0; k < 20; k++) rect(-520 + k * 54, -90, 24, 40, { wash: '#ffe0a0', washA: 0.8, line: false }); pop(); }
  function roomA(t) { const WX = [40, 560]; rect(-700, -300, 2500, 780, { wash: '#6a2a2a', washA: 1, w: 2, col: L }); rect(-700, 1200, 2500, 600, { wash: '#6a2a2a', washA: 1, w: 2, col: L });
    for (let i = 0; i <= WX.length; i++) { const x0 = i ? WX[i - 1] + 460 : -700, x1 = i < WX.length ? WX[i] : 1800; rect(x0, 480, x1 - x0, 720, { wash: '#6a2a2a', washA: 1, w: 2, col: L, shade: { gap: 9, a: 0.15, col: '#2a0a0a', ang: 1.4 } }); }
    WX.forEach(x => { rect(x, 480, 460, 720, { line: true, w: 9, col: KR.gold }); pencil([[x + 230, 480], [x + 230, 1200]], { w: 5, col: KR.gold, pass2: false }); });
    push(540, 360, 1); for (let k = -4; k <= 4; k++) { pencil([[0, -400], [k * 50, 40]], { w: 2, col: KR.gold, pass2: false }); ell(k * 50, 46, 10, 14, { wash: '#fff4d8', washA: 1, line: false }); glow(k * 50, 40, 26, 'rgba(255,220,150,1)', 0.25); } pop(); }
  function delegates(t) { const P = [[60, '#1e2a3a'], [180, '#2a2a30'], [880, '#1e2a3a'], [1000, '#3a3a40'], [1120, '#2a2a3a']];
    P.forEach(([x, c], i) => human(x, 1430, 0.7, t, { body: c, trim: '#c8c8d0', legs: '#1e1e24', hair: ['#c8c8c8', '#3a2a1a', '#8a6a4a', '#1a1a1a', '#d8d0c0'][i], armR: i === 4 ? 'up' : 'hold', prop: i === 4 ? 'phone' : undefined, flip: x > 600 ? -1 : 1, seed: 5710 + i, face: 'calm' }));
    if (Math.sin(t * 7) > 0.9) glow(1120, 1150, 90, 'rgba(255,255,255,1)', 0.7); }
  function tableA(t) { lightPool(560, 1640, 700, 160, 'rgba(255,220,160,1)', 0.45);
    push(700, 1620, 1); rect(-360, -80, 720, 50, { wash: '#3a1e10', washA: 1, w: 2.4, col: L }); for (const k of [-330, 330]) rect(k - 14, -30, 28, 180, { wash: '#3a1e10', washA: 1, w: 2, col: L });
    push(-20, -86, 1); rect(-170, -150, 340, 150, { wash: '#f4ecdc', washA: 1, w: 2, col: L }); txt('МЕМОРАНДУМ · 1994', 0, -128, 22, { col: L, font: 'Osw' });
    crimeaMap(-40, -60, 70, { w: 1.6, shade: false, land: '#e8d090', noMount: true }); blob([[-150, -110], [-60, -125], [60, -120], [150, -100], [140, -40], [-140, -40]], { wash: '#a8c8e8', washA: 0.4, line: false });
    if (t > EV.an_border - 0.1) { const k = clamp((t - EV.an_border + 0.1) / 0.4); pencil([[-150, -110], [-60, -125], [60, -120], [150, -100], [140, -24], [-140, -24], [-150, -110]].slice(0, 1 + Math.ceil(k * 6)), { w: 5, col: KR.ua, pass2: false, gap: true }); txt('ГРАНИЦЫ УКРАИНЫ', 60, -14, 18, { col: KR.ua, font: 'Osw', a: k }); }
    for (let q = 0; q < 3; q++) pencil([[-150, -30 + q * 0], [-150, -30]], { w: 1, col: L, pass2: false }); pop();
    for (const k of [-280, 260]) { ell(k, -100, 18, 26, { wash: '#c8e0f0', washA: 0.7, w: 1.4, col: L }); } pencil([[150, -110], [200, -140]], { w: 5, col: '#1a1a1e', pass2: false }); pop();
    castShadow(330, 1612, 120, 460, 0.4, 0.35); moodDark(600, 900, 900, 1800, '#140808', 0.3); }
  // ---------- 2014, перешеек ночью
  function skyB(t) { vgrad(-900, 1100, ['#04060c', '#0a1220', '#1a2234', '#2a2a3a'], 1); for (let i = 0; i < 5; i++) { const r = rng(5720 + i), y = 300 + i * 100, dx = (t * 30) % 300; blob([[-300 + dx, y], [200 + r() * 300 + dx, y - 40], [800 + dx, y - 10], [1400, y + 20], [100, y + 40]], { wash: '#1a2030', washA: 0.7, line: false }); }
    for (const [x, y] of [[200, 800], [760, 720]]) { push(x + (t * 40) % 300, y, 0.8); blob([[-80, 0], [-60, -30], [60, -30], [90, 0], [40, 20], [-60, 20]], { wash: '#1a1e24', washA: 1, w: 1.6, col: '#000' }); pencil([[90, -10], [180, -20]], { w: 6, col: '#1a1e24', pass2: false }); pencil([[-140 + Math.sin(t * 40) * 40, -40], [140 - Math.sin(t * 40) * 40, -40]], { w: 3, col: '#5a6070', pass2: false }); glow(-60, 10, 20, 'rgba(255,60,60,1)', 0.6 * (Math.sin(t * 8) > 0 ? 1 : 0.2)); pop(); } }
  function farB(t) { seaKR(1050, 1250, t, 5730, { cols: ['#1a2a3a', '#101a28', '#0a121c'], wave: '#3a5a7a', n: 20 }); push(1200, 1060, 0.6); rect(-20, -220, 40, 220, { wash: '#c8c8c8', washA: 1, w: 1.4, col: L }); glow(0, -230, 60, 'rgba(255,240,200,1)', 0.5); pop(); }
  function road(t) {                                                 // колонна: грузовики и бронемашины без знаков, фары
    rect(-500, 1260, 2200, 80, { wash: '#2a2a2e', washA: 1, w: 2, col: L }); const k = clamp((t - EV.an_14) / 3.2);
    for (let i = 0; i < 6; i++) { const x = 1000 - k * 1100 + i * 250; push(x, 1300, 0.72, 0, -1);
      if (i % 2) { shape([[-200, -40], [-160, -130], [160, -130], [220, -60], [220, -40]], { wash: '#3a4434', washA: 1, w: 2, col: '#000' }); rect(-60, -170, 100, 40, { wash: '#2a3226', washA: 1, w: 1.6, col: '#000' }); pencil([[40, -150], [160, -160]], { w: 8, col: '#2a3226', pass2: false }); for (const q of [-140, -50, 50, 140]) ell(q, -30, 34, 34, { wash: '#14141a', washA: 1, w: 1.6, col: '#000' }); }
      else { rect(-200, -200, 260, 170, { wash: '#3a4434', washA: 1, w: 2, col: '#000' }); rect(60, -150, 120, 120, { wash: '#2a3226', washA: 1, w: 2, col: '#000' }); for (const q of [-150, -40, 120]) ell(q, -26, 34, 34, { wash: '#14141a', washA: 1, w: 1.6, col: '#000' }); }
      glow(210, -80, 70, 'rgba(255,240,200,1)', 0.6); pop(); }
  }
  function post(t) {                                                 // стела «КРЫМ», шлагбаум, мешки, силуэты солдат без знаков
    push(860, 1440, 1); rect(-150, -420, 300, 420, { wash: '#d8d0c0', washA: 1, w: 2.4, col: L }); txt('КРЫМ', 0, -330, 64, { col: '#3a3a3a', font: 'Osw' }); crimeaMap(0, -180, 120, { w: 2, shade: false, land: '#e8d090', noMount: true });
    if (t > EV.an_take) { const k = sm(clamp((t - EV.an_take) / 0.6)); fillPts([[-150, -420], [-150 + 300 * k, -420], [-150 + 300 * k, 0], [-150, 0]], '#0a0a10', 0.7); } pop();
    for (let q = 0; q < 6; q++) { push(-80 + (q % 3) * 90, 1440 - Math.floor(q / 3) * 50, 1); ell(0, -24, 50, 26, { wash: '#7a7050', washA: 1, w: 1.6, col: L }); pop(); }
    pencil([[160, 1340], [560, 1310]], { w: 12, col: '#d8d0c0', pass2: false }); for (let q = 0; q < 5; q++) pencil([[180 + q * 80, 1338 - q * 6], [220 + q * 80, 1334 - q * 6]], { w: 12, col: KR.red, pass2: false });
    for (const [x, y] of [[300, 1440], [430, 1440], [1080, 1440], [1200, 1440]]) { sil([[x - 26, y], [x - 30, y - 120], [x - 16, y - 150], [x + 16, y - 150], [x + 30, y - 120], [x + 26, y]], '#141a14', 1); ell(x, y - 170, 22, 20, { wash: '#1e261e', washA: 1, line: false }); pencil([[x - 18, y - 120], [x + 30, y - 160]], { w: 5, col: '#0a0e0a', pass2: false }); }
  }
  function groundB(t) { rect(-500, 1440, 2200, 900, { wash: '#1e2024', washA: 1, w: 2, col: L }); for (let i = 0; i < 16; i++) pencil([[-500 + i * 160, 1600 + (i % 3) * 40], [-380 + i * 160, 1600 + (i % 3) * 40]], { w: 10, col: '#e8e0c0', a: 0.5, pass2: false });
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.25; for (let i = 0; i < 12; i++) { ctx.fillStyle = '#ffe8b0'; ctx.fillRect(400 + i * 60, 1460 + i * 30, 30, 120); } ctx.restore();
    lightPool(700, 1660, 700, 180, 'rgba(255,240,200,1)', 0.25);
    for (const [x, y] of [[1000, 1760], [1100, 1790]]) { push(x, y, 1); ell(0, -24, 54, 28, { wash: '#6a6448', washA: 1, w: 1.6, col: L }); pop(); }
    push(-30, 1780, 1); rect(-60, -40, 120, 40, { wash: '#4a5a3a', washA: 1, w: 2, col: L }); pop(); push(140, 1860, 1); ell(0, 0, 70, 16, { wash: '#3a4a5a', washA: 0.6, line: false }); pop();
    castShadow(330, 1612, 120, 520, -0.6, 0.4); moodDark(700, 900, 700, 1700, '#020306', 0.55); }
  function drawA(t, cat) { lay(20, () => viewA(t)); lay(6, () => roomA(t)); lay(2.6, () => delegates(t)); lay(1, () => { tableA(t); cat(); }); lay(0.6, () => { for (const x of [-160, 1240]) sil([[x - 80, 2300], [x - 70, 1380], [x + 70, 1380], [x + 80, 2300]], '#2a0808', 1); }); }
  function drawB(t, cat) { lay(40, () => skyB(t)); lay(16, () => farB(t)); lay(5, () => road(t)); lay(2.4, () => post(t)); lay(1, () => { groundB(t); cat(); }); lay(0.6, () => { for (const x of [-160, 1240]) sil([[x - 80, 2300], [x - 50, 1500], [x + 50, 1500], [x + 80, 2300]], '#06080a', 1); });
    lay(1.4, () => motes(60, [-200, 300, 1300, 1900], '#8a9ab0', t, 5740, { sp: 500, vx: -80, sz: 2, a: 0.4, stretch: 4 })); }
  WORLD.annex = (t, u, cat) => {
    const tw = (t - EV.an_14) / 0.4; if (tw < 0) return drawA(t, cat); drawB(t, cat); if (tw > 1) return;
    const g = sm(tw) * 700, P1 = [], P2 = []; for (let y = -20; y <= 1940; y += 40) { P1.push([tearX(y, -g), y]); P2.push([tearX(y, g), y]); }
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.moveTo(-10, -20); P1.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(-10, 1940); ctx.closePath(); ctx.moveTo(1090, -20); P2.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(1090, 1940); ctx.closePath(); ctx.clip();
    drawA(Math.min(t, EV.an_14), () => {}); ctx.restore();
    scr(() => { pencil(P1, { w: 14, col: '#f4ecdc', pass2: false, gap: false }); pencil(P2, { w: 14, col: '#f4ecdc', pass2: false, gap: false }); });
  };
  DIR.annex = {
    outfit: 'suitK', light: { side: -1, rim: '#ffd8a0' }, grade: ['#2a1a1a', 0.08],
    act: () => [[S0.annex, 'talk'], [EV.an_promise, 'proud'], [EV.an_border, 'smug'], [EV.an_14, 'shock'], [EV.an_troops, 'scared'], [EV.an_take, 'cold']],
    pose: (t, u, b) => { if (!B14(t)) return Object.assign(b, { x: 360, y: 1612, s: 0.92, look: [0.9, 0.2], hand: [190, -330], light: { side: -1, rim: '#ffd8a0' } });
      const w = clamp((t - EV.an_troops) / 0.6); return Object.assign(b, { x: lerp(380, 300, sm(w)), y: 1612, s: 0.92, outfit: 'pufferG', walk: w > 0 && w < 1 ? -t * 8 : 0, look: [0.9, -0.3], hand: [140, -290], light: { side: 1, rim: '#9ab0d8' } }); },
    afterCat: (t, u, P) => { if (!B14(t) && t > EV.an_promise) { const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; push(x, y, 1, -0.6); pencil([[0, 0], [0, -90]], { w: 8, col: '#1a1a1e', pass2: false }); pencil([[0, 0], [0, 16]], { w: 4, col: KR.gold, pass2: false }); pop(); } },
    hud: t => { if (t < EV.an_14) { push(540, 372, 0.9 + 0.1 * popK(t, S0.annex, 0.3)); ctx.save(); ctx.fillStyle = 'rgba(18,12,10,0.95)'; ctx.fillRect(-320, -88, 640, 170); ctx.restore(); txt('1994', 0, -18, 104, { col: '#f6e7c8', font: 'Osw' }); txt('БУДАПЕШТСКИЙ МЕМОРАНДУМ', 0, 54, 34, { col: K.amber, font: 'Osw' }); pop(); }
      if (t > EV.an_take + 0.3) { const k = popK(t, EV.an_take + 0.3, 0.3); push(560, 860, 1); stamp(0, 0, 0.9, 'АННЕКСИЯ · 18.03.2014', '#e83a2a', -0.06, k, { size: 54 }); pop(); } },
    cam: () => [[S0.annex, 560, 980, -0.08], [EV.an_promise, 560, 1080, 0.04], [EV.an_border - 0.1, 640, 1200, 0.1], [EV.an_border + 0.2, 640, 1240, 0.16, 'x'], [EV.an_14, 600, 1100, 0.04], [EV.an_14 + 0.4, 600, 980, -0.08], [EV.an_troops, 660, 1000, -0.02], [EV.an_take, 700, 1080, 0.08], [S1.annex, 700, 1100, 0.12]]
  };
  TRANS_IN.annex = { a: 0.08, b: 0.36, fx(k, t, A, B) {             // лист складывается пополам по вертикали: старый кадр сжимается к центру, новый раскрывается
    const e = sm(k); if (e < 0.5) { const s = 1 - e * 2; drawBuf(B, 1, 540, 960, 0.4); scr(() => { ctx.save(); ctx.translate(540, 960); ctx.scale(Math.max(0.02, s), 1); ctx.drawImage(A, -540, -960); ctx.restore(); }); }
    else { const s = (e - 0.5) * 2; scr(() => { ctx.fillStyle = '#0a0806'; ctx.fillRect(0, 0, W, H); ctx.save(); ctx.translate(540, 960); ctx.scale(Math.max(0.02, s), 1); ctx.drawImage(B, -540, -960); ctx.restore(); }); } } };
})();
