/* 035 — сцена `vote`, 21.05.2006. Ночная Подгорица в день референдума: площадь перед зданием, большое табло с подсчётом, толпа
   с красно-золотыми флагами, машины сигналят, фейерверк над мостом Миленниум (вантовый мост с пилоном). Главный свет — табло и
   прожекторы (белый) + фейерверк (золото). На «две тысячи шестом» — табло крутит проценты; на «полпроцента» — шкала: линия порога 55 %
   и столбик 55,5 %, зазор подсвечен, плашка «55,5 % ПРИ ПОРОГЕ 55 %»; толпа взрывается. Том (худи) машет флагом. */
(() => {
  const L = MEC.ink;
  EV.vt_back = wtk('s7', 'Вернулась'); EV.vt_2006 = wtk('s7', 'две'); EV.vt_half = wtk('s7', 'полпроцента'); EV.vt_thr = wtk('s7', 'порога.');
  KEYW.push('полпроцента', 'порога.');
  function sky(t) { vgrad(-900, 1100, ['#060a1a', '#141e3a', '#2a2a4a'], 1); const r = rng(10000); for (let i = 0; i < 40; i++) { ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(r() * 1600 - 300, r() * 600, 2.5, 2.5); }
    if (t > EV.vt_half) for (let k = 0; k < 4; k++) { const t0 = EV.vt_half + k * 0.35, u = t - t0; if (u < 0 || u > 1.4) continue; const cx = 200 + k * 260, cy = 400 + (k % 2) * 100; for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283, d = u * 220; ell(cx + Math.cos(a) * d, cy + Math.sin(a) * d + u * u * 60, 6, 6, { wash: k % 2 ? MEC.gold : '#ff6a4a', washA: 1 - u / 1.4, line: false }); } glow(cx, cy, 120, 'rgba(255,220,140,1)', 0.3 * (1 - u / 1.4)); } }
  function far(t) { blackMountain(-400, 1600, 1060, 260, t, 10010, { col: '#141a22', forest: '#0a0e14', trees: 20 });
    push(860, 1060, 0.7); pencil([[0, 0], [0, -500]], { w: 10, col: '#e8e8f0', pass2: false }); for (let i = 0; i < 6; i++) { pencil([[0, -480 + i * 30], [-300 + i * 30, -60]], { w: 2, col: '#c8ccd8', pass2: false }); pencil([[0, -480 + i * 30], [300 - i * 30, -60]], { w: 2, col: '#c8ccd8', pass2: false }); } rect(-400, -60, 800, 20, { wash: '#8a8e9a', washA: 1, w: 2, col: L }); pop();
    for (let i = 0; i < 6; i++) { push(-100 + i * 260, 1060, 0.5); rect(-80, -260, 160, 260, { wash: '#2a3040', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 10; q++) rect(-60 + (q % 3) * 44, -240 + Math.floor(q / 3) * 60, 26, 30, { wash: (q + i) % 3 ? '#ffd890' : '#3a4050', washA: 1, w: 1, col: L }); pop(); } depthFog('#141a2a', 0.06); }
  function board(t) {                                               // табло: «ЗА» с прокруткой и линия порога
    push(640, 1150, 1); rect(-300, -420, 600, 380, { wash: '#0e1218', washA: 1, w: 4, col: '#6a6a72' }); for (const k of [-260, 260]) pencil([[k, -40], [k, 120]], { w: 10, col: '#3a3a42', pass2: false });
    const f = sm(clamp((t - EV.vt_2006) / 1.2)), v = lerp(40, 55.5, f); txt('НЕЗАВИСИМОСТЬ: ЗА', 0, -370, 34, { col: '#e8e8f0', font: 'Osw' }); txt(v.toFixed(1).replace('.', ',') + ' %', 0, -270, 110, { col: v >= 55 ? '#8affa0' : '#ffd060', font: 'Osw' });
    rect(-250, -170, 500, 50, { wash: '#2a2a30', washA: 1, w: 2, col: '#8a8a92' }); rect(-250, -170, 500 * (v / 100), 50, { wash: v >= 55 ? '#3ac860' : '#e8b030', washA: 1, line: false }); const tx = -250 + 500 * 0.55; pencil([[tx, -190], [tx, -100]], { w: 6, col: MEC.red, pass2: false }); txt('ПОРОГ 55 %', tx, -80, 26, { col: '#ff8a6a', font: 'Osw' });
    glow(0, -230, 260, 'rgba(160,200,255,1)', 0.2); pop();
  }
  function crowd(t) { const up = t > EV.vt_half; for (let i = 0; i < 12; i++) { const x = -160 + i * 130 + (i % 2) * 20, y = 1300 + (i % 3) * 16; human(x, y, 0.62, t, { body: ['#c0201e', '#1a1a1e', '#e8e0d0', '#2a4a7a'][i % 4], legs: '#2a2a36', armR: up ? 'wave' : 'hold', armL: up && i % 2 ? 'wave' : undefined, flip: x > 640 ? -1 : 1, seed: 10020 + i, face: up ? 'grin' : 'smile' });
    if (i % 3 === 0) meFlag(x + 20, y - 420 * 0.62 - 60, 90, 60, t, { pole: 120 }); } }
  function ground(t) {                                              // асфальт площади, конфетти, бутылки, машина с флагом, отражения
    rect(-500, 1340, 2200, 1000, { wash: '#2a2e38', washA: 1, w: 2, col: L }); const r = rng(10030); for (let i = 0; i < 14; i++) { const x = r() * 1900 - 400, y = 1380 + r() * 600; pencil([[x, y], [x + 40, y + 6]], { w: 1.6, col: '#141820', a: 0.6, pass2: false }); }
    if (t > EV.vt_half) for (let i = 0; i < 50; i++) { const x = r() * 1700 - 300, y = ((r() * 1800 + (t - EV.vt_half) * 300) % 1900); rect(x, y, 10, 6, { wash: [MEC.red, MEC.gold, '#ffffff'][i % 3], washA: 1, line: false }); }
    push(1060, 1720, 0.9); rect(-180, -100, 300, 70, { wash: '#e8e8ec', washA: 1, w: 2, col: L }); rect(-90, -150, 160, 56, { wash: '#e8e8ec', washA: 1, w: 2, col: L }); rect(-76, -140, 70, 40, { wash: '#4a5a6a', washA: 1, w: 1.2, col: L }); for (const k of [-110, 70]) ell(k, -26, 30, 30, { wash: '#1e1e22', washA: 1, w: 2, col: L }); meFlag(110, -300, 100, 66, t, { pole: 200 }); pop();
    lightPool(640, 1500, 800, 180, 'rgba(180,210,255,1)', 0.25); castShadow(380, 1720, 110, 420, Math.PI, 0.3); moodDark(540, 1200, 500, 1500, '#02040a', 0.3);
  }
  function extras(t) {                                              // семья с детьми на плечах, пожилая пара, фотограф, сигналящая машина
    push(-60, 1540, 0.9); human(0, 0, 1, t, { body: '#3a4a6a', legs: '#2a2a36', armR: 'wave', seed: 10040, face: 'grin' }); human(0, -300, 0.55, t, { body: MEC.red, legs: '#2a2a36', armR: 'wave', seed: 10041, face: 'grin' }); pop();
    for (let i = 0; i < 2; i++) human(1120 + i * 80, 1540, 0.85, t, { body: ['#4a3a3a', '#3a3a4a'][i], hat: i ? 'fez' : 'scarf', hatCol: i ? MEC.red : '#1a1a1e', legs: '#2a2a2a', long: i ? undefined : 1, armR: t > EV.vt_half ? 'wave' : 'hold', flip: -1, seed: 10042 + i, face: 'grin' });
    push(960, 1560, 0.85); human(0, 0, 1, t, { body: '#2a2a2e', hat: 'cap', hatCol: '#2a2a2e', legs: '#1a1a1e', armR: 'hold', flip: -1, seed: 10045, face: 'calm' }); rect(-80, -300, 60, 40, { wash: '#1a1a1e', washA: 1, w: 1.6, col: L }); if (Math.sin(t * 5) > 0.95) glow(-50, -280, 80, 'rgba(255,255,240,1)', 0.6); pop();
  }
  function front(t) { for (const x of [-170, 1250]) { sil([[x - 80, 2300], [x - 60, 800], [x + 60, 800], [x + 80, 2300]], '#06080e', 1); } }
  function extras2(t) {                                             // полицейские, шарики, транспарант «DA!», мальчик на фонарном столбе
    for (let i = 0; i < 2; i++) human(560 + i * 70, 1560, 0.75, t, { body: '#1a2a4a', hat: 'police', hatCol: '#1a2a4a', legs: '#1a1a2a', armR: 'hold', flip: i ? -1 : 1, seed: 10060 + i, face: t > EV.vt_half ? 'grin' : 'calm' });
    for (let i = 0; i < 6; i++) { const bx = 200 + i * 160 + Math.sin(t + i) * 20, by = 900 - i * 20 - (t > EV.vt_half ? (t - EV.vt_half) * 120 : 0); pencil([[bx, by + 40], [bx + 6, by + 140]], { w: 1.4, col: '#e8e8f0', pass2: false }); ell(bx, by, 26, 32, { wash: [MEC.red, MEC.gold][i % 2], washA: 1, w: 1.4, col: L }); }
    push(400, 1260, 0.7); for (const k of [-180, 180]) pencil([[k, 0], [k, -260]], { w: 6, col: '#6a4a2a', pass2: false }); rect(-190, -260, 380, 80, { wash: MEC.red, washA: 1, w: 2, col: L }); txt('DA!', 0, -220, 54, { col: MEC.gold, font: 'Osw' }); pop();
    push(1240, 1300, 0.7); pencil([[0, 0], [0, -460]], { w: 8, col: '#3a3a42', pass2: false }); human(0, -300, 0.6, t, { body: '#2a8a5a', legs: '#2a2a36', armR: 'wave', flip: -1, seed: 10070, face: 'grin' }); pop();
    for (let i = 0; i < 2; i++) { push(-80 + i * 1320, 1460, 0.8, 0, i ? -1 : 1); rect(-150, -100, 240, 70, { wash: ['#2a4a7a', '#e8e8ec'][i], washA: 1, w: 2, col: L }); rect(-70, -150, 140, 56, { wash: ['#2a4a7a', '#e8e8ec'][i], washA: 1, w: 2, col: L }); for (const k of [-100, 50]) ell(k, -26, 26, 26, { wash: '#1e1e22', washA: 1, w: 2, col: L }); human(0, -140, 0.55, t, { body: MEC.red, legs: '#2a2a36', armR: 'wave', seed: 10080 + i, face: 'grin' }); pop(); }
  }
  WORLD.vote = (t, u, cat) => {
    lay(40, () => sky(t)); lay(15, () => far(t)); lay(4, () => board(t)); lay(2.6, () => crowd(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(2, () => motes(16, [-100, 700, 1200, 1700], '#ffe8b0', t, 10050, { sp: -2, sz: 2.4, a: 0.5, wob: 12, add: 1 }));
  };
  DIR.vote = {
    outfit: 'hoodieME', light: { side: 1, rim: '#bfd8ff' }, grade: ['#0a1020', 0.06],
    act: () => [[S0.vote, 'suspicious'], [EV.vt_2006, 'awe'], [EV.vt_half, 'laugh'], [EV.vt_thr, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1720, s: 0.95, look: [0.6, -0.6], hand: t > EV.vt_half ? [150, -430] : [150, -320] }),
    afterCat: (t, u, P) => { if (t > EV.vt_half - 0.1) meFlag(P.x + P.hand[0] * P.s, P.y + P.hand[1] * P.s - 160, 110, 74, t, { pole: 200 }); },
    hud: t => meBoard(640, 1330, 0.75, t, EV.vt_thr - 0.1, [['55,5 % ПРИ ПОРОГЕ 55 %', 44, MEC.gold]], { w: 600 }),
    cam: () => [[S0.vote, 600, 1000, -0.08], [EV.vt_2006, 620, 960, -0.04], [EV.vt_half, 640, 900, 0.02, 'x'], [S1.vote, 620, 940, 0]]
  };
  TRANS_IN.vote = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(e < 0.5 ? A : B); whiteOut(Math.sin(e * Math.PI) * 0.8, '255,226,140'); } };
})();
