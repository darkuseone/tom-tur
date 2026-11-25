/* 034 — сцена `lublin`, 1569. Зал сейма в Люблине: своды, высокие окна с витражами, магнаты в кунтушах и с саблями (в ножнах), писари,
   трон короля под балдахином, на стене огромная карта ВКЛ. Главный свет — косые лучи из окон слева (пыль в лучах). На «Польша» поляки
   встают; на «отрезала» огромные ножницы режут карту — украинские земли (Подляшье, Волынь, Киевщина, Брацлавщина) отъезжают к Польше,
   красная штриховка; Том (камзол) держит отрезанный кусок и морщится. Плашка «1569 · ЛЮБЛИНСКАЯ УНИЯ». */
(() => {
  const L = LTC.ink, WIN = [140, 700];
  EV.lb_pl = wtk('s4', 'Польша'); EV.lb_cut = wtk('s4', 'отрезала'); EV.lb_ua = wtk('s4', 'украинские');
  KEYW.push('отрезала', 'земли.');
  function hall(t) {                                                // стены, своды, окна, балдахин
    rect(-600, 300, 2400, 1100, { wash: '#c8b494', washA: 1, w: 2, col: L, shade: { gap: 14, a: 0.06, col: '#6a5a40', ang: 1.4 } }); vgrad(300, 1400, ['#5a4a3a', '#c8b494', '#a89474'], 0.5);
    for (let i = 0; i < 5; i++) { const x = -260 + i * 380; pencil(ellPts(x + 190, 520, 190, 170, 0, 0.5, 30).slice(15), { w: 6, col: '#7a6a50', pass2: false }); }
    for (let i = 0; i < 2; i++) { const x = WIN[0] - 120 + i * 0; push(-100 + i * 260, 640, 1); rect(-60, -200, 120, 300, { wash: '#a8c8e8', washA: 1, w: 3, col: L }); ell(0, -200, 60, 60, { wash: '#a8c8e8', washA: 1, w: 3, col: L }); for (let q = 0; q < 6; q++) rect(-60 + (q % 2) * 60, -180 + Math.floor(q / 2) * 90, 60, 90, { wash: ['#c84a3a', '#3a6aa8', '#e8c040'][q % 3], washA: 0.4, w: 1.4, col: L }); pop(); }
    push(1020, 1240, 1); rect(-150, -600, 300, 40, { wash: '#a8281e', washA: 1, w: 2, col: L }); for (const d of [-1, 1]) pencil([[d * 140, -560], [d * 140, -40]], { w: 8, col: LTC.gold, pass2: false }); poly([[-140, -560], [140, -560], [110, -380], [-110, -380]], { wash: '#c83a2a', washA: 0.9, w: 2, col: L });
    rect(-70, -280, 140, 280, { wash: '#6a2a1a', washA: 1, w: 2, col: L }); human(0, -40, 0.65, t, { body: '#c8281e', hat: 'crown', hatCol: LTC.gold, legs: '#3a2a4a', long: 1, armR: 'hold', seed: 7600, face: 'smile' }); pop();
    push(640, 820, 1); rect(-300, -260, 600, 380, { wash: '#e8dcb4', washA: 1, w: 4, col: '#5a3a1a' }); const P = ([lo, la]) => [(lo - 28.5) * 22, -(la - 51.3) * 34];
    const cut = sm(clamp((t - EV.lb_cut) / 1.0)); GLOBE.fill(GDL_1569.map(P), LTC.grn, 0.75); ctx.save(); ctx.translate(-cut * 160, cut * 40); GLOBE.fill(UA_CUT.map(P), cut > 0 ? '#c8382a' : LTC.grn, 0.75); pencil(UA_CUT.concat([UA_CUT[0]]).map(P), { w: 3, col: L, pass2: false, gap: cut > 0 }); ctx.restore();
    GLOBE.fill(POLAND.map(P), '#e8a8a0', 0.8); txt('ВКЛ', P([27, 54.6])[0], P([27, 54.6])[1], 34, { col: '#fff6e0', font: 'Osw' }); txt('КОРОНА', P([19.5, 52])[0], P([19.5, 52])[1], 30, { col: L, font: 'Osw' }); pop();
  }
  function szlachta(t) { const up = t > EV.lb_pl; const P = [[60, '#a8281e', '#e8c040'], [180, '#3a5a8a', '#c8a040'], [300, '#6a2a5a', '#d8b050'], [820, '#2a6a4a', '#c8a040'], [1180, '#8a3a2a', '#e8c040'], [1280, '#3a3a6a', '#d8b050']];
    P.forEach(([x, c, b], i) => { const isPl = i < 3; human(x, 1330 - (isPl && up ? 20 : 0), 0.74, t, { body: c, bodyD: lerpC(c, '#000000', 0.5), hat: 'fur', hatCol: '#3a2a1a', legs: '#c8a040', long: 1, armR: isPl && up ? 'wave' : 'hold', flip: x > 600 ? -1 : 1, seed: 7610 + i, face: isPl ? (up ? 'grin' : 'smile') : (t > EV.lb_cut ? 'angry' : 'smile'), beard: 1 }); pencil([[x + 20, 1330 - 120], [x + 60, 1330 - 30]], { w: 5, col: '#c8a040', pass2: false }); });
    push(560, 1360, 0.8); rect(-200, -80, 400, 30, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (const k of [-180, 180]) pencil([[k, -50], [k, 0]], { w: 8, col: '#4a2a1a', pass2: false }); rect(-150, -110, 120, 30, { wash: '#f0e8d0', washA: 1, w: 1.4, col: L }); pencil([[60, -110], [100, -160]], { w: 3, col: '#f4f4f4', pass2: false }); ell(-40, -100, 20, 12, { wash: '#c8281e', washA: 1, w: 1, col: L }); pop();
  }
  function floor_(t) { rect(-500, 1360, 2200, 1000, { wash: '#8a6a4a', washA: 1, w: 2, col: L }); for (let i = 0; i < 12; i++) for (let j = 0; j < 6; j++) rect(-400 + i * 170 + (j % 2) * 85, 1380 + j * 100, 170, 100, { wash: (i + j) % 2 ? '#e8dcc4' : '#5a4a3a', washA: 1, w: 1, col: L, a: 0.6 });
    push(640, 1720, 1); ell(0, 0, 420, 70, { wash: '#a8281e', washA: 0.85, w: 2, col: L }); ell(0, 0, 340, 50, { wash: false, w: 3, col: LTC.gold }); pop();
    for (let i = 0; i < 3; i++) { push(1050 + i * 90, 1760 + i * 30, 1); rect(-30, -60, 60, 60, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) rect(-26, -76 - q * 14, 52, 12, { wash: ['#e8dcc0', '#c8b490', '#f0e8d0'][q], washA: 1, w: 1, col: L }); pop(); }
    push(-60, 1780, 1); pencil([[0, 0], [0, -160]], { w: 6, col: LTC.gold, pass2: false }); ell(0, -170, 30, 30, { wash: '#ffd890', washA: 1, w: 1.6, col: L }); glow(0, -170, 60, 'rgba(255,200,120,1)', 0.3); pop();
    shaft(WIN[0], 600, 160, 1400, -0.45, 'rgba(255,236,190,1)', 0.14); lightPool(520, 1600, 700, 160, 'rgba(255,230,180,1)', 0.3); castShadow(420, 1700, 110, 500, 0.6, 0.32); moodDark(1100, 1000, 800, 1900, '#1a1008', 0.2); }
  function front(t) { for (const x of [-170, 1250]) { rect(x - 70, 400, 140, 2000, { wash: '#7a6a50', washA: 1, w: 2.4, col: L, shade: { gap: 12, a: 0.2, col: '#3a2a18', ang: 0 } }); rect(x - 90, 380, 180, 40, { wash: '#5a4a34', washA: 1, w: 2, col: L }); } }
  function scissors(t) { if (t < EV.lb_cut - 0.3 || t > EV.lb_cut + 1.4) return; const k = clamp((t - EV.lb_cut + 0.3) / 1.2), a = Math.abs(Math.sin(k * 12)) * 0.4; push(lerp(380, 820, k), lerp(760, 940, k), 1.4, 0.6);
    for (const d of [-1, 1]) { push(0, 0, 1, d * a); poly([[0, 0], [160, -10 * d], [170, 0], [0, 10 * d]], { wash: '#c8ccd4', washA: 1, w: 2.4, col: L }); ell(-50, 20 * d, 34, 22, { wash: false, w: 8, col: '#1a1a1a' }); pop(); } pop(); }
  function extras(t) {                                              // люстра со свечами, писари с перьями, гончая, паж, гобелен
    push(640, 420, 1); pencil([[0, -200], [0, 0]], { w: 3, col: '#3a2a1a', pass2: false }); ell(0, 0, 160, 24, { wash: false, w: 6, col: LTC.gold }); for (let i = 0; i < 8; i++) { const x = -150 + i * 43; pencil([[x, -6], [x, -40]], { w: 7, col: '#f4efe4', pass2: false }); blob([[x - 5, -40], [x, -58 - Math.sin(t * 9 + i) * 4], [x + 5, -40]], { wash: '#ffd060', washA: 1, line: false }); } glow(0, -40, 160, 'rgba(255,210,130,1)', 0.25); pop();
    for (let i = 0; i < 2; i++) { push(-40 + i * 1240, 1480, 0.9, 0, i ? -1 : 1); rect(-90, -110, 180, 20, { wash: '#6a4a2a', washA: 1, w: 2, col: LTC.ink }); human(0, 0, 0.9, t, { body: '#3a2a20', hat: 'hood', hatCol: '#3a2a20', legs: '#2a1a10', long: 1, armR: 'hold', seed: 7630 + i, face: 'calm' }); rect(20, -140, 80, 30, { wash: '#f0e8d0', washA: 1, w: 1.2, col: LTC.ink }); pencil([[70, -140], [110, -200]], { w: 3, col: '#f8f8f8', pass2: false }); pop(); }
    push(1060, 1540, 0.9, 0, -1); blob([[-60, -10], [-50, -56], [40, -60], [64, -40], [56, -10]], { wash: '#c8a070', washA: 1, w: 2, col: LTC.ink }); ell(76, -60, 22, 16, { wash: '#c8a070', washA: 1, w: 1.6, col: LTC.ink }); for (const lx of [-40, -20, 30, 46]) pencil([[lx, -14], [lx, 16]], { w: 6, col: '#8a6a40', pass2: false }); pencil([[-60, -40], [-90, -70 + Math.sin(t * 6) * 10]], { w: 5, col: '#c8a070', pass2: false }); pop();
    push(240, 700, 1); rect(-120, -180, 240, 300, { wash: '#6a2a2a', washA: 1, w: 2, col: LTC.ink }); for (let i = 0; i < 5; i++) pencil([[-100, -150 + i * 60], [100, -150 + i * 60]], { w: 3, col: LTC.gold, a: 0.6, pass2: false }); push(0, -30, 0.6); poly([[0, -80], [-60, 0], [0, 60], [60, 0]], { wash: '#f4efe4', washA: 1, w: 2, col: LTC.ink }); pop(); pop();
  }
  WORLD.lublin = (t, u, cat) => {
    lay(40, () => hall(t)); lay(2.6, () => szlachta(t)); lay(1.5, () => extras(t)); lay(1, () => { floor_(t); cat(); }); lay(0.62, () => front(t)); lay(1.8, () => motes(22, [-100, 500, 700, 1500], '#fff0c8', t, 7620, { sp: 1, sz: 2.6, a: 0.5, wob: 12, add: 1 }));
    lay(30, () => scissors(t));
  };
  DIR.lublin = {
    outfit: 'kamzol', light: { side: -1, rim: '#ffe8c0' }, grade: ['#2a1a08', 0.05],
    act: () => [[S0.lublin, 'suspicious'], [EV.lb_pl, 'sideeye'], [EV.lb_cut, 'shock'], [EV.lb_ua, 'annoyed']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1720, s: 0.95, look: [0.6, -0.7], hand: t > EV.lb_ua ? [160, -380] : [150, -300], point: t > EV.lb_cut - 0.2 && t < EV.lb_ua }),
    hud: t => ltBoard(640, 1240, 0.8, t, EV.lb_ua, [['1569 · ЛЮБЛИНСКАЯ УНИЯ', 40, LTC.amberL], ['ВОЛЫНЬ, КИЕВЩИНА → ПОЛЬШЕ', 36]], { w: 620, edge: '#c8282a' }),
    cam: () => [[S0.lublin, 620, 980, -0.06], [EV.lb_pl, 560, 1000, -0.04], [EV.lb_cut, 640, 900, 0.02, 'x'], [S1.lublin, 640, 920, 0.04]]
  };
  TRANS_IN.lublin = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k), x = lerp(0, W, e); drawBuf(B); scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(x, 0, W, H); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore(); pencil([[x, 0], [x, H]], { w: 10, col: '#c8ccd4', pass2: false, gap: false }); }); } };
})();
