/* 034 — сцена `hook`. 0–1,25 с: глобус — Европа → крошечная жёлтая Литва, пунктир до Чёрного моря и «?» → наезд в Вильнюс (Нерис,
   Тракай, Каунас) → облачная вспышка → вечерний Вильнюс: Гедиминова башня с флагом на холме, барочный костёл, черепичные крыши старого
   города, кафе с зонтиками, троллейбус, баскетбольное кольцо во дворе с детьми, голуби. Главный свет — закатное солнце слева.
   На «крошечная» Том зажимает карту Литвы двумя пальцами (мини-карта в лапе); на «дотянулась» на доске-карте граница ВКЛ растёт янтарём
   до Чёрного моря; на «Отматываем» — янтарный кулон в лапе. Планы — window.HQ (кнопка возвращается сюда). */
(() => {
  const G1 = 1.25, L = LTC.ink, SUN = [120, 600];
  EV.hk_zoom = 0.38; EV.hk_land = G1; EV.hk_tiny = wtk('h1', 'крошечная.'); EV.hk_grow = wtk('h1', 'дотянулась'); EV.hk_sea = wtk('h1', 'моря!'); EV.hk_go = wtk('h2', 'Отматываем');
  KEYW.push('крошечная.', 'моря!');
  function sky(t) { vgrad(-900, 1100, ['#4a6aa8', '#9ab8d8', '#f8d8a8', '#f8b070'], 1); glow(SUN[0], SUN[1], 240, 'rgba(255,220,150,1)', 0.45); ell(SUN[0], SUN[1], 56, 56, { wash: '#fff2d0', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const r = rng(7200 + i), y = 280 + i * 80, dx = (t * 10) % 220; blob([[-200 + dx, y], [300 + dx + r() * 100, y - 24], [900 + dx, y - 6], [1300, y + 12], [400, y + 18]], { wash: '#fff0dc', washA: 0.5, line: false }); }
    for (let i = 0; i < 5; i++) { const x = 500 + i * 110 + Math.sin(t * 1.2 + i) * 30, y = 520 + (i % 2) * 36; pencil([[x - 12, y - Math.sin(t * 9 + i) * 6], [x, y], [x + 12, y - Math.sin(t * 9 + i) * 6]], { w: 3, col: '#3a3a42', pass2: false }); } }
  function far(t) { hills(1040, 30, '#6a8a5a', 2.7); gedTower(820, 1040, 0.55, t, { flag: 1 }); vilChurch(240, 1040, 0.42, t, {}); for (let i = 0; i < 6; i++) { const r = rng(7210 + i); oak(-100 + i * 260 + r() * 60, 1050, 140 + r() * 40, t, i, { col: '#4a7a3a', colL: '#7aa858' }); } depthFog('#f8e0c0', 0.07); }
  function town(t) {                                                // старый город: домики, кафе, троллейбус, люди, баскетбол
    oldTown(-300, 1500, 1230, t, 7220, { lit: 1 });
    push(620, 1240, 0.75); rect(-260, -170, 520, 150, { wash: '#c8281e', washA: 1, w: 2.4, col: L }); for (let i = 0; i < 6; i++) rect(-240 + i * 80, -156, 64, 64, { wash: '#a8c8d8', washA: 1, w: 1.4, col: L }); for (const k of [-170, 170]) ell(k, -20, 30, 30, { wash: '#1e1e22', washA: 1, w: 2, col: L });
    for (const k of [-60, 60]) pencil([[k, -170], [k + 40, -300]], { w: 3, col: '#3a3a40', pass2: false }); pop(); pencil([[-500, 1012], [1600, 1012]], { w: 2, col: '#3a3a40', a: 0.6, pass2: false });
    for (let i = 0; i < 3; i++) { push(-80 + i * 160, 1290, 0.75); pencil([[0, 0], [0, -200]], { w: 4, col: '#5a5a5a', pass2: false }); poly([[-90, -200], [0, -250], [90, -200]], { wash: ['#e8b030', '#2a7a4a', '#c8281e'][i], washA: 1, w: 2, col: L }); rect(-40, -80, 80, 10, { wash: '#8a5a32', washA: 1, w: 1.4, col: L }); pop(); }
    const P = [[-120, '#3a6aa8', 'hold', 'phone'], [40, '#e86a8a', 'wave'], [190, '#5a6a3a', 'hold'], [880, '#7a4a8a', 'swing'], [980, '#2a8a6a', 'hold', 'phone'], [1080, '#e8b030', 'wave']];
    P.forEach(([x, c, a, pr], i) => human(x, 1310, 0.66, t, { body: c, skin: ['#f0c8a0', '#e2b48e', '#f8d8b8'][i % 3], hat: i % 3 === 1 ? 'cap' : null, hatCol: '#2a3a5a', legs: '#2a2a36', armR: a, prop: pr, flip: x > 600 ? -1 : 1, seed: 7230 + i, face: t > EV.hk_sea ? 'shock' : 'smile' }));
    push(1180, 1300, 0.7); pencil([[0, 0], [0, -330]], { w: 7, col: '#4a4a52', pass2: false }); rect(-70, -400, 120, 80, { wash: '#f4f4f0', washA: 1, w: 2, col: L }); pencil(ellPts(-10, -318, 30, 10, 0, 0, 20), { w: 4, col: '#e85a1e', pass2: false, gap: false }); pop();
    const bh = Math.abs(Math.sin(t * 3)) * 160; ell(1080, 1180 - bh, 22, 22, { wash: '#e8741e', washA: 1, w: 2, col: L }); human(1060, 1320, 0.55, t, { body: '#2a8a4a', legs: '#2a2a36', armR: 'wave', flip: -1, seed: 7240, face: 'grin' });
  }
  function ground(t) {                                              // брусчатка площади, клумба, скамейка, голуби, янтарная лавка
    rect(-500, 1330, 2200, 1000, { wash: '#a8988a', washA: 1, w: 2, col: L }); const r = rng(7250); for (let i = 0; i < 120; i++) ell(r() * 2000 - 400, 1350 + r() * 700, 14 + r() * 14, 7 + r() * 5, { wash: i % 2 ? '#8a7a6a' : '#c8b8a8', washA: 1, w: 1, col: L, a: 0.45 });
    push(900, 1640, 1); rect(-160, -150, 320, 150, { wash: '#7a4a2a', washA: 1, w: 2.4, col: L }); poly([[-190, -150], [0, -220], [190, -150]], { wash: '#2a7a4a', washA: 1, w: 2, col: L }); txt('GINTARAS · ЯНТАРЬ', 0, -186, 22, { col: '#fff6e0', font: 'Osw' });
    for (let q = 0; q < 7; q++) ell(-130 + q * 42, -90, 14, 18, { wash: q % 2 ? LTC.amber : LTC.amberL, washA: 1, w: 1.4, col: LTC.amberD }); pop();
    for (let i = 0; i < 5; i++) { const gx = 320 + i * 70 + Math.sin(t * 2 + i) * 14; push(gx, 1820 + (i % 2) * 30, 0.8); blob([[-24, 0], [-16, -26], [16, -28], [26, -10], [10, 4]], { wash: '#8a8e9a', washA: 1, w: 1.4, col: L }); ell(20, -28, 8, 8, { wash: '#6a6e7a', washA: 1, line: false }); pop(); }
    push(-20, 1700, 1); rect(-120, -60, 240, 20, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); rect(-120, -110, 240, 14, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (const k of [-100, 100]) pencil([[k, -40], [k, 0]], { w: 7, col: '#2a2a2a', pass2: false }); pop();
    for (let i = 0; i < 8; i++) { const x = 1040 + i * 30; pencil([[x, 1900], [x, 1850]], { w: 3, col: '#3a7a2a', pass2: false }); ell(x, 1846, 10, 10, { wash: ['#f2c02a', '#c8281e', '#e8e0f0'][i % 3], washA: 1, w: 1, col: L }); }
    lightPool(SUN[0] + 400, 1620, 900, 180, 'rgba(255,214,150,1)', 0.32); castShadow(420, 1680, 110, 600, 0.25, 0.32); moodDark(1100, 1000, 900, 1900, '#2a1a10', 0.16);
  }
  function front(t) { for (const x of [-150, 1240]) { sil([[x - 80, 2300], [x - 70, 600], [x + 70, 600], [x + 80, 2300]], '#3a2418', 1); rect(x - 120, 560, 240, 50, { wash: '#2a1a10', washA: 1, line: false }); } }
  function mapBoard(t) {                                             // доска-карта: Литва крошечная → граница растёт янтарём до Чёрного моря
    if (t < EV.hk_tiny - 0.1 || t > EV.hk_go) return; const k = popK(t, EV.hk_tiny - 0.1, 0.3); push(690, 1000, 0.8 * k, -0.03); ctx.save(); ctx.fillStyle = 'rgba(226,214,176,0.98)'; ctx.fillRect(-260, -320, 520, 640); ctx.restore(); pencil([[-260, -320], [260, -320], [260, 320], [-260, 320], [-260, -320]], { w: 5, col: L, pass2: false, gap: false });
    ctx.save(); ctx.beginPath(); ctx.rect(-260, -320, 520, 640); ctx.clip(); const P = ([lo, la]) => [(lo - 28.5) * 24, -(la - 51.6) * 38]; GLOBE.fill(BLACK.map(P), '#3a86b8'); GLOBE.fill(BALTIC_L.map(P), '#3a86b8');
    const g = sm(clamp((t - EV.hk_grow) / 1.2)); if (g > 0) { ctx.save(); ctx.globalAlpha = 0.8; ctx.beginPath(); ctx.rect(-260, -320, 520, 640 * g); ctx.clip(); GLOBE.fill(GDL.map(P), LTC.amber); ctx.restore(); }
    GLOBE.fill(LT_NOW.map(P), LTC.yel); pencil(LT_NOW.concat([LT_NOW[0]]).map(P), { w: 3, col: L, pass2: false, gap: false }); txt('ЛИТВА', P([24, 55.2])[0], P([24, 55.2])[1], 30, { col: L, font: 'Osw' });
    if (t > EV.hk_sea) { const [x, y] = P([32, 45.6]); txt('ЧЁРНОЕ МОРЕ!', x, y + 30, 40, { col: LTC.red, font: 'Osw' }); } ctx.restore(); pop();
  }
  window.HQ = { sky, far, town, ground, front };
  WORLD.hook = (t, u, cat) => {
    if (t < G1) { lay(1, () => GLOBE.intro(t, Object.assign({ t1: G1 }, LT_GLOBE))); return; }
    lay(40, () => sky(t)); lay(14, () => far(t)); lay(3.2, () => { town(t); depthFog('#f8e0c0', 0.04); }); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2.2, () => motes(16, [-100, 700, 1200, 1500], '#fff0c8', t, 7260, { sp: 2, sz: 2.4, a: 0.45, wob: 16, add: 1 }));
    GLOBE.burst(t, G1);
  };
  DIR.hook = {
    outfit: 'hoodieLT', light: { side: -1, rim: '#ffd8a0' }, grade: ['#3a2010', 0.05],
    act: () => [[0, 'awe'], [EV.hk_land, 'smug'], [EV.hk_tiny, 'sideeye'], [EV.hk_grow, 'awe'], [EV.hk_sea, 'shock'], [EV.hk_go, 'grin']],
    pose: (t, u, b) => { const w1 = clamp((t - G1) / 0.8), x = lerp(-40, 330, sm(w1)), pinch = t > EV.hk_tiny && t < EV.hk_grow;
      return Object.assign(b, { x, y: 1660, s: 1.0, walk: w1 < 1 ? t * 9 : 0, look: t > EV.hk_tiny ? [0.8, -0.5] : [0.3, -0.3], hand: pinch ? [180, -420] : t > EV.hk_go ? [170, -360] : [150, -300], point: t > EV.hk_grow && t < EV.hk_go, squash: t > EV.hk_sea && t < EV.hk_sea + 0.25 ? 0.06 : b.squash, tailUp: t > EV.hk_go }); },
    afterCat: (t, u, P) => { const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; if (t > EV.hk_tiny && t < EV.hk_grow) { push(x + 10, y - 20, 1); GLOBE.fill(LT_NOW.map(([lo, la]) => [(lo - 24) * 6, -(la - 55) * 10]), LTC.yel); pop(); }
      if (t > EV.hk_go - 0.1) { push(x, y + 30, 0.8, Math.sin(t * 6) * 0.2); pencil([[0, -60], [0, -10]], { w: 3, col: '#5a4a3a', pass2: false }); ell(0, 20, 34, 42, { wash: LTC.amber, washA: 1, w: 2.4, col: LTC.amberD }); ell(-10, 6, 10, 6, { wash: '#fff6e0', washA: 0.7, line: false }); pop(); } },
    hud: t => mapBoard(t),
    cam: () => [[0, 540, 960, 0], [G1, 540, 960, 0], [G1 + 0.01, 620, 920, -0.1], [G1 + 0.7, 560, 980, -0.04], [EV.hk_tiny, 500, 1060, 0.06, 'x'], [EV.hk_sea, 520, 1040, 0.04, 'x'], [EV.hk_go, 440, 1180, 0.12], [S1.hook, 420, 1230, 0.2]]
  };
  TRANS_IN.tunnel = { a: 0.12, b: 0.35, fx(k, t, A, B) { const e = sm(k); drawBuf(A); scr(() => { ctx.save(); ctx.globalAlpha = e; ctx.drawImage(B, 0, 0); ctx.restore(); ctx.save(); ctx.globalAlpha = 0.5 * Math.sin(e * Math.PI); ctx.fillStyle = LTC.amber; ctx.fillRect(0, 0, W, H); ctx.restore(); }); } };
})();
