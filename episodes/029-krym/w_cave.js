/* 029 — сцена `cave`: 45 000 лет назад, грот Кийк-Коба над долиной. Сумерки, луна (холодный второй свет), главный — костёр
   у входа. В долине идут мамонты и бизоны, в гроте семья неандертальцев: кто колет кремень, кто несёт хворост, ребёнок, жарят
   мясо. Том (шкура) входит справа шагом и садится у огня. На «неандертальцы» камера к семье, старший оборачивается;
   на «Прописку» в лапе у Тома бумажка «ПРОПИСКА», на «оформили» неандерталец выхватывает её и бросает в костёр — вспышка.
   Переход В: воронка водоворота расходится кругом, внутри — огонь костра. */
(() => {
  EV.cv_who = wtk('s1', 'неандертальцы.');
  EV.cv_paper = wtk('s1', 'Прописку');
  EV.cv_burn = wtk('s1', 'оформили.');
  KEYW.push('неандертальцы.', 'оформили.');
  const L = KR.ink, FX = 560, FY = 1640;
  const flare = t => t > EV.cv_burn + 0.1 ? Math.max(0, 1 - (t - EV.cv_burn - 0.1) / 0.6) : 0;
  function mammoth(x, y, s, t, seed, col = '#2a1e22') {
    push(x, y, s, 0, -1); const st = Math.sin(t * 3 + seed) * 10;
    for (const [lx, ph] of [[-90, 0], [-50, 1], [60, 2], [100, 3]]) pencil([[lx, -60], [lx + Math.sin(t * 3 + seed + ph) * 12, 0]], { w: 26, col, pass2: false });
    blob([[-140, -60], [-150, -150], [-80, -220], [40, -230], [120, -200], [160, -140], [140, -60]], { wash: col, washA: 1, w: 2, col: '#0a0608', a: 0.8 });
    blob([[110, -200], [150, -270], [210, -260], [230, -200], [200, -150], [150, -140]], { wash: col, washA: 1, w: 2, col: '#0a0608', a: 0.8 });
    pencil([[220, -200], [250, -120], [236 + st * 0.5, -40]], { w: 14, col, pass2: false }); pencil([[200, -170], [270, -150], [300, -200]], { w: 7, col: '#e8dcc0', pass2: false });
    for (let k = 0; k < 8; k++) pencil([[-120 + k * 30, -70], [-124 + k * 30, -30]], { w: 3, col: '#4a3a40', a: 0.6, pass2: false }); pop();
  }
  function bison(x, y, s, t, seed) { push(x, y, s, 0, -1); for (const lx of [-60, -30, 40, 70]) pencil([[lx, -40], [lx + Math.sin(t * 4 + seed + lx) * 8, 0]], { w: 12, col: '#2a1a14', pass2: false });
    blob([[-90, -40], [-90, -100], [-20, -150], [60, -140], [100, -100], [100, -40]], { wash: '#3a2418', washA: 1, w: 1.6, col: '#0a0608', a: 0.8 }); ell(110, -90, 30, 26, { wash: '#2a1a14', washA: 1, line: false }); pencil([[108, -116], [124, -134]], { w: 4, col: '#e8dcc0', pass2: false }); pop(); }
  function sky(t) { vgrad(-900, 1100, ['#0e1030', '#2a2a5a', '#6a4a7a', '#c87a5a'], 1); glow(860, 420, 120, 'rgba(200,220,255,1)', 0.3); ell(860, 420, 46, 46, { wash: '#e8eef8', washA: 1, line: false });
    const r = rng(5000); for (let i = 0; i < 60; i++) { ctx.fillStyle = `rgba(255,250,235,${0.3 + r() * 0.5})`; ctx.fillRect(r() * 1400 - 150, r() * 700 - 300, 3, 3); } }
  function far(t) { ridgeKR(1040, 340, '#3a3a5a', 5001); depthFog('#6a5a8a', 0.06); }
  function valley(t) {                                               // степь, река, стадо
    blob([[-500, 1040], [300, 1000], [900, 1020], [1700, 1000], [1700, 1400], [-500, 1400]], { wash: '#5a5a3a', washA: 1, w: 2, col: L, shade: { gap: 10, a: 0.18, col: '#2a2a1a', ang: 0.3 } });
    pencil([[-400, 1180], [100, 1150], [500, 1200], [900, 1160], [1600, 1200]], { w: 18, col: '#6a8ab8', a: 0.8, pass2: false }); pencil([[-400, 1176], [1600, 1196]], { w: 3, col: '#c8dcf0', a: 0.5, pass2: false });
    const dx = t * 26; mammoth(-100 + dx % 1600, 1110, 0.42, t, 1); mammoth(150 + dx % 1600, 1130, 0.36, t, 2); bison(500 + (dx * 1.3) % 1400, 1120, 0.4, t, 3); bison(640 + (dx * 1.3) % 1400, 1126, 0.36, t, 4); bison(-300 + (dx * 1.3) % 1400, 1116, 0.34, t, 5);
    for (let i = 0; i < 6; i++) pencil([[100 + i * 220, 1060], [110 + i * 220, 1030]], { w: 3, col: '#2a3a1a', a: 0.6, pass2: false });
  }
  function grotto(t) {                                               // свод грота справа и сверху, сушилка шкур, кости, охра на стене
    blob([[700, 2000], [700, 1300], [760, 900], [900, 600], [1200, 420], [1700, 400], [1700, 2000]], { wash: '#5a4232', washA: 1, w: 3, col: L, shade: { gap: 8, a: 0.35, col: '#2a1a12', ang: 1.0 } });
    blob([[-500, 200], [200, 300], [700, 380], [1100, 360], [1700, 300], [1700, -400], [-500, -400]], { wash: '#4a3428', washA: 1, w: 3, col: L, shade: { gap: 9, a: 0.35, col: '#1e120c', ang: 0.4 } });
    for (let i = 0; i < 10; i++) { const x = -300 + i * 190; poly([[x, 330 + (i % 3) * 20], [x + 30, 440 + (i % 2) * 60], [x + 60, 330]], { wash: '#4a3428', washA: 1, w: 1.8, col: L }); }
    for (const [x, y] of [[900, 980], [960, 1060], [1020, 940]]) { ell(x, y, 26, 34, { wash: '#b8502a', washA: 0.5, line: false }); }
    push(1000, 1380, 1); for (const k of [-90, 90]) pencil([[k, 0], [k, -320]], { w: 9, col: KR.woodD, pass2: false }); pencil([[-110, -300], [110, -300]], { w: 9, col: KR.woodD, pass2: false });
    shape([[-80, -300], [80, -300], [90, -110], [-70, -130]], { wash: '#9a6a3a', washA: 1, w: 2, col: L, shade: { gap: 5, a: 0.3, col: '#4a2a10', ang: 0.6 } }); pop();
    const fam = [[200, '#7a5030', 'swing', 0.62, 'shock'], [470, '#6a4428', 'hold', 0.6, 'calm'], [880, '#8a5a34', 'point', 0.64, 'angry'], [1080, '#5a3a22', 'up', 0.6, 'smile'], [1260, '#7a4a2a', 'hold', 0.5, 'smile']];
    fam.forEach(([x, c, a, s, f], i) => human(x, 1410, s * 1.45, t, { body: c, skin: '#c89a70', hair: '#2a1a10', beard: i % 2 ? undefined : '#2a1a10', legs: '#5a3a22', boots: '#3a2414', armR: a, prop: i === 0 ? 'axe' : i === 3 ? 'spear' : i === 1 ? 'stick' : undefined, flip: x > 700 ? -1 : 1, seed: 5010 + i, face: i === 2 && t > EV.cv_who ? 'angry' : f }));
    human(640, 1410, 0.6, t, { body: '#8a5a34', skin: '#d8a880', hair: '#3a2410', legs: '#5a3a22', armR: 'wave', seed: 5016, face: 'grin' });
  }
  function floor(t) {                                                // каменный пол, костёр (главный свет), шкуры, кремни, кости, вертел
    rect(-500, 1400, 2200, 900, { wash: '#5a4232', washA: 1, w: 2, col: L }); const r = rng(5020); for (let i = 0; i < 70; i++) { const x = r() * 2000 - 400, y = 1420 + r() * 500; ell(x, y, 10 + r() * 30, 6 + r() * 14, { wash: i % 3 ? '#6a5040' : '#4a3426', washA: 1, w: 1.2, col: L, a: 0.6 }); }
    const fl = 1 + flare(t) * 1.8; lightPool(FX, FY, 700 * (1 + flare(t) * 0.4), 200, 'rgba(255,170,80,1)', 0.55 + flare(t) * 0.3);
    push(FX, FY, 1); for (let q = 0; q < 8; q++) { const a = q / 8 * 6.28; ell(Math.cos(a) * 90, Math.sin(a) * 24, 26, 18, { wash: '#6a6a6a', washA: 1, w: 1.6, col: L }); }
    for (let q = 0; q < 4; q++) pencil([[-70 + q * 40, 10], [-40 + q * 30, -40]], { w: 10, col: '#3a2410', pass2: false });
    const f = Math.sin(t * 13) * 0.18 + 1; blob([[-60, 0], [-40, -110 * f * fl], [-10, -60], [10, -150 * f * fl], [30, -70], [50, -120 * f * fl], [70, 0]], { wash: '#ff8a2a', washA: 1, line: false }); blob([[-30, 0], [0, -80 * f * fl], [30, 0]], { wash: '#ffe08a', washA: 1, line: false });
    glow(0, -60, 160 * fl, 'rgba(255,170,80,1)', 0.35); pencil([[-160, -150], [160, -170]], { w: 6, col: '#4a2a10', pass2: false }); ell(20, -162, 40, 22, { wash: '#8a3a1a', washA: 1, w: 1.6, col: L });
    if (t > EV.cv_burn && t < EV.cv_burn + 0.6) { const k = (t - EV.cv_burn) / 0.6; push(0, -100 - k * 80, 1 - k * 0.6, k * 3); rect(-50, -34, 100, 68, { wash: '#f0e2c0', washA: 1 - k, w: 1.4, col: L, a: 1 - k }); pop(); }
    pop(); motes(26, [FX - 200, FY - 500, FX + 200, FY - 100], '#ffb060', t, 5021, { sp: -60, sz: 3, a: 0.8, wob: 30, add: 1 });
    for (const [x, y, rot] of [[180, 1700, 0.2], [940, 1760, -0.3]]) { push(x, y, 1, rot); blob([[-110, 0], [-90, -40], [0, -50], [100, -40], [120, 0], [0, 20]], { wash: '#a87a4a', washA: 1, w: 2, col: L, shade: { gap: 5, a: 0.3, col: '#5a3a1a', ang: 0.5 } }); pop(); }
    for (let q = 0; q < 6; q++) { push(1080 + (q % 3) * 50, 1660 + Math.floor(q / 3) * 40, 1, q); poly([[-14, 0], [0, -26], [14, 0]], { wash: '#5a5a62', washA: 1, w: 1.4, col: L }); pop(); }
    push(840, 1640, 1); rect(-60, -40, 120, 40, { wash: '#7a7a72', washA: 1, w: 2, col: L }); pop();
    for (let q = 0; q < 4; q++) { push(1180 + q * 30, 1820, 1, 0.4 * q); pencil([[-40, 0], [40, 0]], { w: 10, col: '#e8dcc0', pass2: false }); ell(-42, 0, 10, 10, { wash: '#e8dcc0', washA: 1, w: 1.4, col: L }); ell(42, 0, 10, 10, { wash: '#e8dcc0', washA: 1, w: 1.4, col: L }); pop(); }
    push(-60, 1800, 1); ell(0, -50, 70, 60, { wash: '#e8dcc0', washA: 1, w: 2, col: L }); ell(-24, -60, 14, 16, { wash: '#2a1a10', washA: 1, line: false }); ell(24, -60, 14, 16, { wash: '#2a1a10', washA: 1, line: false }); pop();
    castShadow(330, 1612, 120, 500, -0.6, 0.4); moodDark(FX, FY - 100, 700, 1700, '#08060e', 0.5);
  }
  function front(t) { for (const x of [-120, 1220]) sil([[x - 90, 2300], [x - 60, 1600], [x + 10, 1460], [x + 70, 1600], [x + 90, 2300]], '#140c08', 1); }
  WORLD.cave = (t, u, cat) => {
    lay(40, () => sky(t)); lay(18, () => far(t)); lay(8, () => valley(t)); lay(2.4, () => grotto(t)); lay(1, () => { floor(t); cat(); }); lay(0.6, () => front(t));
    lay(1.6, () => motes(20, [-100, 700, 1200, 1500], '#d8c8b0', t, 5030, { sp: 3, sz: 3, a: 0.3, wob: 24 }));
  };
  DIR.cave = {
    outfit: 'caveman', light: { side: 1, rim: '#ffa860' }, grade: ['#3a1a10', 0.1],
    act: () => [[S0.cave, 'awe'], [EV.cv_who, 'grin'], [EV.cv_paper, 'smug'], [EV.cv_burn + 0.1, 'shock'], [EV.cv_burn + 0.5, 'sideeye']],
    pose: (t, u, b) => { const wIn = clamp(u / 0.95), x = lerp(620, 340, sm(wIn)), paper = t > EV.cv_paper - 0.05 && t < EV.cv_burn;
      return Object.assign(b, { x, y: 1612, s: 1.0, flip: wIn < 1 ? -1 : 1, walk: wIn < 1 ? t * 9 : 0, look: t > EV.cv_burn ? [0.6, 0.1] : t > EV.cv_who ? [0.9, -0.3] : [-0.5, -0.2],
        hand: paper ? [170, -380] : [150, -300], squash: t > EV.cv_burn && t < EV.cv_burn + 0.2 ? 0.12 : b.squash }); },
    afterCat: (t, u, P) => { if (t > EV.cv_paper - 0.05 && t < EV.cv_burn) { const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s, k = popK(t, EV.cv_paper - 0.05, 0.25); push(x + 40, y - 40, k, -0.15); rect(-80, -60, 160, 110, { wash: KR.paper, washA: 1, w: 2, col: L }); txt('ПРОПИСКА', 0, -30, 26, { col: L, font: 'Osw' }); for (let q = 0; q < 3; q++) pencil([[-60, 0 + q * 16], [60, 0 + q * 16]], { w: 1.5, col: KR.paperD, pass2: false }); pop(); } },
    cam: () => [[S0.cave, 640, 980, -0.06], [EV.cv_who - 0.1, 660, 1000, -0.02], [EV.cv_who + 0.3, 760, 1080, 0.08, 'x'], [EV.cv_paper, 480, 1160, 0.16], [EV.cv_burn, 500, 1180, 0.2], [S1.cave, 520, 1200, 0.24]]
  };
  TRANS_IN.cave = { a: 0.08, b: 0.4, fx(k, t, A, B) {               // воронка раскрывается кругом — внутри огонь грота
    const e = sm(k); drawBuf(A, 1 + e * 0.5, 540, 980, 1, null, 0, 0, e * 2); inCircle(540, 980, Math.pow(e, 1.6) * 1400, () => drawBuf(B, 1.25 - e * 0.25));
    if (e < 1) scr(() => pencil(ellPts(540, 980, Math.pow(e, 1.6) * 1400, Math.pow(e, 1.6) * 1400, 0, 0.03, 60), { w: 22, col: '#e8f4f8', a: 0.8 * (1 - e), pass2: false, gap: false })); } };
})();
