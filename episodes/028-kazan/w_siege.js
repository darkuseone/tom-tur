/* 028 — сцена `siege`: осень 1552, осада Казани. Дубовые стены и башни города на холме, перед ними ров, осадная башня-«гуляй-город»,
   туры с пушками, шатры русского лагеря, конница, дым костров. Без крови и тел: только техника, дым и обломки.
   Главный свет — багровый закат слева + вспышка взрыва (на «порохом»). Том в кольчуге (kolchuga) на бруствере:
   на «Иван» над лагерем поднимается царский стяг (без символов, гладкий красный), на «взял» Том оборачивается к стене,
   на «порохом» под стеной взрывается подкоп — столб дыма, брёвна летят, Том зажимает уши. Переход В — пороховой дым. */
(() => {
  EV.sg_ivan = wtk('s3', 'Иван');
  EV.sg_took = wtk('s3', 'взял');
  EV.sg_walls = wtk('s3', 'стены');
  EV.sg_boom = wtk('s3', 'подорвали');
  KEYW.push('Грозный', 'порохом.');
  SHAKES.push([EV.sg_boom, 0.6, 18]);
  const L = KZ.ink, BX = 720;
  const boom = t => t > EV.sg_boom ? clamp((t - EV.sg_boom) / 1.2) : 0;
  function sky(t) { vgrad(-900, 1200, ['#2a1a2a', '#6a2a2a', '#c8582a', '#e8904a'], 1); for (let i = 0; i < 6; i++) { const ph = (t * 0.1 + i / 6) % 1; ell(200 + i * 160, 700 - ph * 300, 80 + ph * 60, 40 + ph * 30, { wash: '#4a3038', washA: 0.4 * (1 - ph), line: false }); } }
  function city(t) {                                                 // дубовые стены и башни Казани на холме
    hills(1020, 60, '#4a3a3a', 3800); blob([[-300, 1020], [200, 880], [900, 860], [1400, 1020]], { wash: '#5a4440', washA: 1, w: 2, col: L });
    const b = boom(t); for (let i = 0; i < 16; i++) { const x = 60 + i * 70; if (b > 0 && Math.abs(x - BX) < 120) continue; rect(x - 34, 870 - 120, 68, 120, { wash: '#6a4424', washA: 1, w: 1.6, col: L }); for (let j = 0; j < 4; j++) pencil([[x - 34, 870 - 30 * j], [x + 34, 870 - 30 * j]], { w: 2, col: '#3a2410', pass2: false }); }
    for (const x of [200, 520, 960]) { rect(x - 50, 870 - 230, 100, 230, { wash: '#7a5030', washA: 1, w: 2, col: L }); poly([[x - 64, 870 - 230], [x, 870 - 320], [x + 64, 870 - 230]], { wash: '#4a3020', washA: 1, w: 2, col: L }); }
    for (const x of [380, 820]) { blob([[x - 40, 700], [x - 30, 640], [x, 610], [x + 30, 640], [x + 40, 700]], { wash: '#2a6a4a', washA: 1, w: 1.6, col: L }); rect(x - 30, 700, 60, 60, { wash: '#e8dcc0', washA: 1, w: 1.4, col: L }); }
    if (b > 0) { for (let q = 0; q < 14; q++) { const r = rng(3801 + q), a = -Math.PI / 2 + (r() - 0.5) * 1.6, d = b * (300 + r() * 500); push(BX + Math.cos(a) * d, 800 + Math.sin(a) * d + b * b * 400, 1, b * 6 + q); rect(-30, -8, 60, 16, { wash: '#6a4424', washA: 1, w: 1.4, col: L }); pop(); }
      for (let q = 0; q < 8; q++) { const r = rng(3820 + q); ell(BX + (r() - 0.5) * 300 * b, 800 - b * (200 + r() * 300), 90 + b * 160 * r(), 70 + b * 120 * r(), { wash: q % 2 ? '#3a3034' : '#5a4a48', washA: 0.85 * (1 - b * 0.4), line: false }); }
      if (b < 0.3) { glow(BX, 820, 420 * (1 - b / 0.3) + 80, 'rgba(255,200,100,1)', 0.8 * (1 - b / 0.3)); } }
    depthFog('#8a4a3a', 0.08);
  }
  function camp(t) {                                                 // лагерь: шатры, туры с пушками, гуляй-город, стяг, конница
    rect(-500, 1180, 2100, 60, { wash: '#4a3a30', washA: 1, w: 2, col: L });
    for (let i = 0; i < 5; i++) { const x = -200 + i * 360; push(x, 1180, 0.8); shape([[-110, 0], [0, -170], [110, 0]], { wash: i % 2 ? '#e8dcc0' : '#c8b898', washA: 1, w: 2, col: L }); pop(); }
    push(1060, 1180, 0.9); rect(-90, -380, 180, 380, { wash: '#7a5432', washA: 1, w: 2.2, col: L }); for (let j = 0; j < 8; j++) pencil([[-90, -40 - j * 44], [90, -40 - j * 44]], { w: 2, col: '#3a2410', pass2: false }); for (const k of [-60, 60]) ell(k, 0, 40, 40, { line: true, w: 6, col: '#3a2410' }); pop();
    for (const x of [260, 520]) { push(x, 1180, 0.8); for (let q = 0; q < 6; q++) pencil([[-60 + q * 24, 0], [-60 + q * 24, -110]], { w: 6, col: '#6a4424', pass2: false }); rect(-40, -150, 160, 40, { wash: '#3a3a40', washA: 1, w: 2, col: L, rot: -0.15 }); const fl = Math.sin(t * 9 + x) > 0.8; if (fl) { glow(130, -150, 70, 'rgba(255,200,100,1)', 0.6); ell(160, -170, 40, 30, { wash: '#e8e0d0', washA: 0.6, line: false }); } pop(); }
    if (t > EV.sg_ivan - 0.1) { const q = sm(clamp((t - EV.sg_ivan + 0.1) / 0.5)); pencil([[-40, 1180], [-40, 1180 - 360 * q]], { w: 6, col: '#4a2a12', pass2: false }); const f = Math.sin(t * 4) * 16; shape([[-40, 1180 - 350 * q], [120 + f, 1180 - 330 * q], [100 + f, 1180 - 240 * q], [-40, 1180 - 250 * q]], { wash: '#b8201e', washA: 1, w: 2, col: L }); }
    for (let i = 0; i < 4; i++) human(700 + i * 120, 1220, 0.5, t, { body: '#7a7a80', hat: 'helmet', legs: '#4a3a2a', prop: i % 2 ? 'spear' : 'axe', armR: 'hold', seed: 3830 + i, flip: -1, face: t > EV.sg_boom ? 'shock' : 'calm' });
    horse(1300, 1230, 0.5, t, 1, '#3a2a1e');
  }
  function rampart(t) {                                              // бруствер под Томом: туры, бочки пороха, ядра, мешки
    rect(-500, 1400, 2100, 900, { wash: '#5a4436', washA: 1, w: 2, col: L }); for (let i = 0; i < 9; i++) { push(-300 + i * 200, 1440, 1); ell(0, -50, 60, 70, { wash: '#7a5a34', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.3, col: '#3a2410', ang: 1.5 } }); pop(); }
    lightPool(BX - 200, 1620, 600, 140, 'rgba(255,170,90,1)', 0.45 + (boom(t) > 0 && boom(t) < 0.3 ? 0.4 : 0));
    for (const [x, y] of [[860, 1650], [960, 1670]]) { push(x, y, 1); ell(0, -50, 46, 56, { wash: '#4a2e14', washA: 1, w: 2, col: L }); for (const yy of [-80, -20]) pencil([[-44, yy], [44, yy]], { w: 4, col: '#2a2a30', pass2: false }); pop(); }
    for (let q = 0; q < 6; q++) ell(1100 + (q % 3) * 40, 1690 - Math.floor(q / 3) * 34, 18, 18, { wash: '#2a2a30', washA: 1, w: 1.4, col: L });
    push(760, 1700, 1); rect(-60, -40, 260, 40, { wash: '#3a3a40', washA: 1, w: 2, col: L, rot: -0.1 }); for (const k of [-40, 160]) ell(k, 10, 36, 36, { line: true, w: 7, col: '#4a2e14' }); pop();   // пушка
    for (let q = 0; q < 3; q++) { push(140 + q * 70, 1780, 1); blob([[-30, 0], [-36, -60], [-10, -80], [10, -80], [36, -60], [30, 0]], { wash: '#8a7a5a', washA: 1, w: 1.6, col: L }); txt('ПОРОХ', 0, -34, 14, { col: '#3a2a1a', font: 'Osw' }); pop(); }   // мешки пороха
    push(1180, 1760, 1); ell(0, -40, 50, 50, { wash: '#8a2a2a', washA: 1, w: 2, col: L }); ell(0, -40, 40, 40, { wash: '#e8dcc0', washA: 1, w: 1.4, col: L }); pencil([[-20, -100], [10, -60]], { w: 4, col: '#6a4424', pass2: false }); pop();   // барабан
    for (let q = 0; q < 2; q++) { push(-80 + q * 60, 1720, 1, 0.3 + q * 0.2); pencil([[0, 0], [0, -150]], { w: 6, col: '#6a4424', pass2: false }); blob([[-24, -150], [24, -150], [20, -200], [-20, -200]], { wash: '#8a8e94', washA: 1, w: 1.6, col: L }); pop(); }   // лопаты сапёров
    push(1000, 1820, 1); for (let q = 0; q < 4; q++) pencil([[-40 + q * 26, 0], [-50 + q * 30, -40]], { w: 7, col: '#5a3a1a', pass2: false }); const ff = Math.sin(t * 12) * 0.15 + 1; blob([[-30, -10], [-10, -70 * ff], [10, -40], [30, -80 * ff], [40, -10]], { wash: '#ff8a2a', washA: 1, line: false }); glow(0, -40, 90, 'rgba(255,170,80,1)', 0.35); pop();   // костёр
    for (let q = 0; q < 2; q++) { push(-120 + q * 100, 1860, 1); ell(0, 0, 30, 30, { wash: '#2a2a30', washA: 1, w: 1.4, col: L }); pop(); }
    castShadow(330, 1612, 120, 480, 0.3, 0.4); moodDark(BX, 900, 900, 1700, '#0e0608', 0.45);
  }
  function front(t) { const r = rng(hsh(FRAME, 3840)); for (let i = 0; i < 26; i++) { const x = r() * 1300 - 100, y = r() * 1900; ell(x, y, 3, 3, { wash: '#ffb060', washA: 0.7, line: false }); } for (const x of [-60, 1150]) sil([[x - 60, 2300], [x - 50, 1500], [x + 50, 1460], [x + 60, 2300]], '#140a08', 1); }
  WORLD.siege = (t, u, cat) => {
    lay(40, () => sky(t)); lay(12, () => city(t)); lay(3.4, () => { camp(t); depthFog('#6a3a30', 0.05); }); lay(1, () => { rampart(t); cat(); }); lay(0.6, () => front(t));
    lay(2.4, () => motes(30, [-100, 600, 1200, 1500], '#a89090', t, 3845, { sp: 2, sz: 5, a: 0.25, wob: 30 }));
  };
  DIR.siege = {
    outfit: 'kolchuga', light: { side: -1, rim: '#ff9a5a' }, grade: ['#4a1a1a', 0.12],
    act: () => [[S0.siege, 'cold'], [EV.sg_took, 'shock'], [EV.sg_boom, 'scared']],
    pose: (t, u, b) => { const ears = t > EV.sg_boom - 0.15; return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.sg_took ? [0.9, -0.5] : [-0.4, -0.3], hand: ears ? [60, -380] : [180, -300], handF: ears ? [-60, -380] : undefined, squash: t > EV.sg_boom && t < EV.sg_boom + 0.25 ? 0.15 : b.squash }); },
    cam: () => [[S0.siege, 560, 980, 0.02], [EV.sg_took, 640, 960, 0.08], [EV.sg_boom - 0.1, 680, 940, 0.12, 'x'], [EV.sg_boom + 0.3, 600, 980, -0.04, 'x'], [S1.siege, 600, 980, -0.06]]
  };
  TRANS_IN.siege = { a: 0.12, b: 0.35, fx(k, t, A, B) {             // пороховой дым заволакивает кадр и расходится
    const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI); const r = rng(3850); for (let i = 0; i < 26; i++) ell(r() * W, r() * H, 200 + r() * 260, 160 + r() * 200, { wash: i % 2 ? '#3a3034' : '#5a4a48', washA: 0.95 * a, line: false }); });
  } };
})();
