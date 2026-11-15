/* 028 — сцена `khan`: 1438–1552, двор казанского хана. Шатры с орнаментом, деревянная мечеть, ковры, курильницы, стража с копьями,
   музыканты, кони у коновязи. Главный свет — солнце сквозь полог большого шатра (тёплое пятно), второй — тень шатров.
   Том (shapan) сидит у доски для нард «КАЗАНЬ : МОСКВА» напротив визиря: на «сто» счётчик «114 ЛЕТ СПОРА» тикает «1438 → 1552»,
   на «Москвой» визирь двигает фишку, на «Спор» Том хмурится, на «войной» доска летит в воздух, гремит боевой рог. Переход В — полог шатра. */
(() => {
  EV.kh_khans = wtk('s2', 'ханы');
  EV.kh_100 = wtk('s2', 'сто');
  EV.kh_msk = wtk('s2', 'Москвой.');
  EV.kh_spor = wtk('s2', 'Спор');
  EV.kh_war = wtk('s2', 'войной.');
  KEYW.push('ханы', 'Москвой.', 'войной.');
  SHAKES.push([EV.kh_war, 0.35, 10]);
  const L = KZ.ink, SUN = [560, 420];
  function back(t) { vgrad(-900, 1200, ['#6aa8d8', '#a8d0e8', '#f0e8c8'], 1); hills(1000, 50, '#8aa874', 3780); depthFog('#f0e8d8', 0.06); }
  function camp(t) {                                                 // шатры с орнаментом, деревянная мечеть с минаретом, стяги
    for (let i = 0; i < 6; i++) { const x = -260 + i * 300, s = 0.8 + (i % 2) * 0.2; push(x, 1180, s); shape([[-150, 0], [-130, -150], [0, -260], [130, -150], [150, 0]], { wash: i % 2 ? '#e8dcc0' : '#f4ead6', washA: 1, w: 2.2, col: L, shade: { gap: 7, a: 0.15, col: '#8a7a5a', ang: 1 } });
      for (let k = -2; k <= 2; k++) ornament(k * 50, -100, 18, t, { a: 0.9 }); rect(-150, -40, 300, 18, { wash: KZ.pom, washA: 1, w: 1.4, col: L }); shape([[-26, 0], [0, -110], [26, 0]], { wash: '#3a2a1a', washA: 1, line: false }); pop(); }
    push(980, 1180, 0.8); rect(-120, -220, 240, 220, { wash: KZ.wood, washA: 1, w: 2, col: L }); blob([[-100, -220], [-80, -300], [0, -340], [80, -300], [100, -220]], { wash: KZ.green, washA: 1, w: 2, col: L }); rect(140, -480, 50, 480, { wash: KZ.wood, washA: 1, w: 2, col: L }); poly([[130, -480], [165, -580], [200, -480]], { wash: KZ.green, washA: 1, w: 1.6, col: L }); pop();
    for (const x of [-40, 620]) { pencil([[x, 1180], [x, 820]], { w: 5, col: '#4a2a12', pass2: false }); const f = Math.sin(t * 3 + x) * 14; shape([[x, 830], [x + 120 + f, 850], [x + 100 + f, 900], [x, 890]], { wash: KZ.green, washA: 1, w: 1.6, col: L }); }
  }
  function court(t) {                                                // двор: ковры, стража, музыканты, кони, слуги с подносами
    rect(-500, 1260, 2100, 60, { wash: '#c8a878', washA: 1, w: 2, col: L }); carpet(-200, 1240, 400, 80, 3781);
    const P = [[60, '#3a5a8a', 'helmet', 'spear', 1], [1180, '#3a5a8a', 'helmet', 'spear', -1], [760, '#8a2a2a', 'fur', null, -1], [880, '#2a6a4a', 'turban', 'hold', -1], [-120, '#6a4a2a', 'fur', 'hold', 1]];
    P.forEach(([x, c, h, a, fl], i) => human(x, 1300, 0.56, t, { body: c, hat: h, hatCol: '#5a3a1a', legs: '#3a2a1a', beard: i % 2 ? 'long' : 'short', hair: '#2a1a10', armR: a === 'spear' ? 'hold' : a || 'swing', prop: a === 'spear' ? 'spear' : undefined, flip: fl, seed: 3785 + i, face: t > EV.kh_war ? 'shock' : 'calm' }));
    horse(1320, 1300, 0.5, t, 1, '#5a3a24'); horse(1440, 1310, 0.5, t, 2, '#c8b8a0');
    push(320, 1300, 0.56); human(0, 0, 1, t, { body: '#a8402a', hat: 'turban', armR: 'hold', armL: 'hold', seed: 3790, face: 'smile' }); ell(30, -150, 40, 18, { wash: '#8a5a2a', washA: 1, w: 1.6, col: L }); pencil([[60, -150], [140, -260]], { w: 3, col: '#5a3a1a', pass2: false }); pop();   // музыкант с думбырой
  }
  function floor(t) {                                                // ковёр под Томом, доска нард, пиалы, курильница, визирь
    rect(-500, 1400, 2100, 900, { wash: '#8a5a32', washA: 1, w: 2, col: L }); carpet(-300, 1500, 1400, 300, 3792, { c1: '#8a1a24', c2: '#1e3f8a' });
    lightPool(SUN[0], 1620, 520, 140, 'rgba(255,230,170,1)', 0.5); shaft(SUN[0], 400, 260, 1300, 0, 'rgba(255,236,190,1)', 0.12);
    const fly = t > EV.kh_war ? sm(clamp((t - EV.kh_war) / 0.6)) : 0; push(lerp(640, 820, fly), 1600 - fly * 600, 1, fly * 3);
    rect(-170, -40, 340, 80, { wash: '#7a4a24', washA: 1, w: 2.4, col: L }); for (let q = 0; q < 12; q++) poly([[-160 + q * 28, -40], [-146 + q * 28, 0], [-132 + q * 28, -40]], { wash: q % 2 ? KZ.pom : '#e8dcc0', washA: 1, w: 1, col: L });
    txt('КАЗАНЬ', -90, 24, 18, { col: KZ.goldL, font: 'Osw' }); txt('МОСКВА', 90, 24, 18, { col: KZ.goldL, font: 'Osw' }); const mv = t > EV.kh_msk ? sm(clamp((t - EV.kh_msk) / 0.3)) : 0;
    for (let q = 0; q < 3; q++) ell(-120 + q * 40, -10, 12, 12, { wash: '#f4f0e8', washA: 1, w: 1.4, col: L }); for (let q = 0; q < 3; q++) ell(40 + q * 40 - (q === 2 ? mv * 120 : 0), -10, 12, 12, { wash: '#2a2a30', washA: 1, w: 1.4, col: L }); pop();
    push(1000, 1600, 0.62); human(0, 0, 1, t, { body: '#1e3f8a', hat: 'turban', hatCol: '#f4ead6', beard: 'long', hair: '#c8c0b0', armR: t > EV.kh_msk - 0.2 && t < EV.kh_war ? 'point' : 'hips', flip: -1, seed: 3793, face: t > EV.kh_war ? 'shock' : 'smile' }); pop();
    for (const [x, y] of [[480, 1700], [560, 1720]]) { ell(x, y, 26, 10, { wash: '#f4f0e8', washA: 1, w: 1.4, col: L }); ell(x, y - 4, 20, 6, { wash: '#8a4a1e', washA: 1, line: false }); }
    push(1180, 1700, 1); shape([[-30, 0], [-40, -60], [40, -60], [30, 0]], { wash: KZ.gold, washA: 1, w: 1.6, col: KZ.goldD }); for (let q = 0; q < 3; q++) { const ph = (t * 0.6 + q / 3) % 1; ell(Math.sin(ph * 6 + q) * 14, -80 - ph * 160, 10 + ph * 20, 8 + ph * 12, { wash: '#e8e4dc', washA: 0.5 * (1 - ph), line: false }); } pop();
    push(160, 1700, 1); kazanPot(0, 0, 0.45, t, { soup: '#e8b04a' }); for (let q = 0; q < 3; q++) { const ph = (t * 0.6 + q / 3) % 1; ell(Math.sin(ph * 6 + q) * 20, -110 - ph * 160, 14 + ph * 24, 10 + ph * 16, { wash: '#e8e4dc', washA: 0.5 * (1 - ph), line: false }); } pop();   // плов
    push(1200, 1520, 0.7); human(0, 0, 1, t, { body: '#6a4a2a', hat: 'fur', hatCol: '#3a2a1a', armR: 'up', seed: 4020, beard: 'long', face: 'calm', flip: -1 }); push(-60, -420, 1); ell(0, 0, 26, 20, { wash: '#8a6a4a', washA: 1, w: 1.6, col: L }); ell(18, -14, 12, 11, { wash: '#7a5a3a', washA: 1, w: 1.4, col: L }); poly([[26, -14], [38, -10], [26, -6]], { wash: '#e8c050', washA: 1, line: false }); pencil(spline([[-14, -6], [-40, -30 + Math.sin(t * 8) * 10], [-60, -10]], false, 6), { w: 6, col: '#6a4a2a', pass2: false }); pop(); pop();   // сокольник
    for (let q = 0; q < 4; q++) { push(-120 + q * 46, 1760, 1); blob([[-20, 0], [-24, -40], [-12, -60], [12, -60], [24, -40], [20, 0]], { wash: ['#c8743a', '#a8542a', '#d8944a', '#8a4a2a'][q], washA: 1, w: 1.6, col: L }); pop(); }   // кувшины
    castShadow(330, 1612, 120, 420, 0.3, 0.4); moodDark(SUN[0], 1000, 800, 1700, '#1a0e08', 0.35);
  }
  function hud(t) {
    if (t > EV.kh_100 - 0.05 && t < EV.kh_war + 0.4) { const q = popK(t, EV.kh_100 - 0.05, 0.3), y = Math.round(lerp(1438, 1552, sm(clamp((t - EV.kh_100) / 1.6)))); push(560, 800, q, -0.02); rect(-260, -66, 520, 132, { wash: '#14100a', washA: 0.9, w: 3, col: KZ.goldL }); txt('1438 → ' + y, 0, -10, 56, { col: KZ.goldL, font: 'Osw' }); txt('114 лет спора с Москвой', 0, 44, 26, { col: '#f6e7c8', font: 'Osw' }); pop(); }
  }
  function front(t) { for (const x of [-80, 1160]) { shape([[x - 120, -200], [x + 120, -200], [x + 90, 2400], [x - 90, 2400]], { wash: '#c8402a', washA: 1, w: 2, col: '#4a0a08' }); for (let j = 0; j < 8; j++) ornament(x, 200 + j * 260, 34, t, { a: 0.9 }); } }
  WORLD.khan = (t, u, cat) => {
    lay(40, () => back(t)); lay(10, () => camp(t)); lay(3, () => { court(t); depthFog('#f0e0c0', 0.05); }); lay(1, () => { floor(t); cat(); }); lay(0.6, () => front(t));
    lay(2.2, () => motes(30, [200, 400, 900, 1500], '#ffe8b0', t, 3795, { sp: 3, sz: 2.4, a: 0.5, wob: 14, add: 1 }));
  };
  DIR.khan = {
    outfit: 'shapan', light: { side: 1, rim: '#ffe0a0' }, grade: ['#c8904a', 0.06],
    act: () => [[S0.khan, 'smug'], [EV.kh_100, 'suspicious'], [EV.kh_msk, 'annoyed'], [EV.kh_spor, 'sideeye'], [EV.kh_war, 'shock']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.kh_war ? [0.6, -0.9] : [0.9, 0.3], hand: t < EV.kh_war ? [240, -260] : [120, -470], handF: t > EV.kh_war ? [-120, -470] : undefined, squash: t > EV.kh_war && t < EV.kh_war + 0.15 ? 0.12 : b.squash }),
    cam: () => [[S0.khan, 600, 1000, 0.02], [EV.kh_100, 640, 1040, 0.08], [EV.kh_msk, 700, 1080, 0.14, 'x'], [EV.kh_war, 600, 980, -0.02, 'x'], [S1.khan, 600, 980, 0.0]],
    hud
  };
  TRANS_IN.khan = { a: 0.12, b: 0.38, fx(k, t, A, B) {               // полог шатра распахивается двумя створками с орнаментом
    const e = sm(k); drawBuf(B); scr(() => { for (const sd of [-1, 1]) { const x = sd < 0 ? lerp(0, -560, e) : lerp(540, 1100, e); ctx.save(); ctx.beginPath(); ctx.rect(x, 0, 540, H); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore(); rect(x + (sd < 0 ? 510 : 0), 0, 30, H, { wash: KZ.pom, washA: 1, w: 2, col: KZ.ink }); } });
  } };
})();
