/* 036 — сцена `today`, 2026. Сенатская площадь летним вечером: собор, ступени заполнены людьми с кофе и мороженым, уличный музыкант,
   велосипедисты, финский флаг, трамвай, туристы фотографируют памятник; рядом с памятником — табличка. Главный свет — тёплое вечернее
   солнце справа. На «добрый царь» — плашка-ответ (QUESTION) и инфографика вокруг памятника: «СЕЙМ · МАРКА · ЯЗЫК · АВТОНОМИЯ»
   стрелками к фигуре; на «государственность» — штамп «→ 1917». Том (худи) кладёт лапу на постамент. */
(() => {
  const L = FIC.ink, SUN = [980, 560];
  EV.answer = wtk('t1', 'Для'); EV.td_good = wtk('t1', '«добрый'); EV.td_state = wtk('t1', 'государственность.');
  KEYW.push('царь»:', 'государственность.');
  function sky(t) { vgrad(-900, 1100, ['#4a8ad8', '#a8d0f0', '#f8e8c8', '#f8c890'], 1); glow(SUN[0], SUN[1], 230, 'rgba(255,232,180,1)', 0.42); ell(SUN[0], SUN[1], 52, 52, { wash: '#fff8e0', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const y = 280 + i * 80, dx = (t * 9) % 200; blob([[-200 + dx, y], [300 + dx, y - 22], [900 + dx, y - 6], [1300, y + 12], [400, y + 18]], { wash: '#ffffff', washA: 0.5, line: false }); }
    for (let i = 0; i < 5; i++) { const x = 300 + i * 110 + Math.sin(t + i) * 30, y = 520 + (i % 2) * 30; pencil([[x - 12, y - Math.sin(t * 9 + i) * 6], [x, y], [x + 12, y - Math.sin(t * 9 + i) * 6]], { w: 3, col: '#f4f4f4', pass2: false }); } }
  function far(t) { cathedral(560, 1060, 0.62, t); for (let i = 0; i < 18; i++) { const r = rng(12200 + i); ell(380 + r() * 360, 1050 - r() * 100, 8, 12, { wash: ['#e8283a', '#2a6aa8', '#f8d030', '#2a8a5a', '#f4f4f0'][i % 5], washA: 1, line: false }); } engel(-80, 1060, 300, 220, t); engel(1160, 1060, 300, 240, t, { cols: 1 }); finFlag(1160, 600, 130, 84, t, { pole: 0 }); depthFog('#f8ecd8', 0.06); }
  function square(t) {                                              // памятник, туристы, музыкант, велосипедисты, трамвай
    statueA2(640, 1240, 0.72, t, {}); push(840, 1240, 0.6); rect(-70, -100, 140, 80, { wash: '#2a2a2e', washA: 1, w: 2, col: L }); pencil([[0, -20], [0, 0]], { w: 6, col: '#2a2a2e', pass2: false }); txt('ALEKSANTERI II', 0, -60, 16, { col: '#f4f4f0', font: 'Osw' }); pop();
    const P = [[180, '#e86a8a', 'hold', 'phone'], [270, '#2a6aa8', 'hold', 'phone'], [360, '#f8d030', 'wave'], [920, '#2a8a5a', 'hold'], [1020, '#7a4a8a', 'hold', 'phone'], [80, '#c84a3a', 'swing']];
    P.forEach(([x, c, a, pr], i) => human(x, 1310, 0.64, t, { body: c, skin: ['#f8d8c0', '#f0c8a0', '#d8a47e'][i % 3], hat: i % 3 === 0 ? 'cap' : null, hatCol: '#f4f4f0', legs: '#2a2a36', armR: a, prop: pr, flip: x > 600 ? -1 : 1, seed: 12210 + i, face: 'smile' }));
    const bx = ((t * 90) % 1900) - 300; push(bx, 1320, 0.6); ell(-50, -30, 32, 32, { wash: false, w: 4, col: '#2a2a30' }); ell(50, -30, 32, 32, { wash: false, w: 4, col: '#2a2a30' }); pencil([[-50, -30], [0, -70], [50, -30]], { w: 4, col: FIC.blue, pass2: false }); human(0, -40, 0.7, t, { body: '#f4f4f0', legs: '#1c3a7a', armR: 'hold', seed: 12220, face: 'grin' }); pop();
  }
  function ground(t) {                                              // брусчатка, кофейные стаканы, тележка мороженого, голуби, клумба
    rect(-500, 1330, 2200, 1000, { wash: '#c8c0b0', washA: 1, w: 2, col: L }); const r = rng(12230); for (let i = 0; i < 110; i++) ell(r() * 2000 - 400, 1350 + r() * 700, 14 + r() * 14, 7 + r() * 5, { wash: i % 2 ? '#b0a898' : '#dcd4c4', washA: 1, w: 1, col: L, a: 0.45 });
    push(940, 1700, 1); rect(-90, -100, 180, 100, { wash: '#f4f4f0', washA: 1, w: 2, col: L }); poly([[-110, -100], [0, -170], [110, -100]], { wash: FIC.blue, washA: 1, w: 2, col: L }); txt('JÄÄTELÖ', 0, -50, 26, { col: FIC.blue, font: 'Osw' }); for (const k of [-60, 60]) ell(k, -4, 18, 18, { wash: '#2a2a2e', washA: 1, w: 1.4, col: L }); pop();
    for (let i = 0; i < 5; i++) { const gx = 420 + i * 60 + Math.sin(t * 2 + i) * 14; push(gx, 1860 + (i % 2) * 20, 0.7); blob([[-24, 0], [-16, -26], [16, -28], [26, -10], [10, 4]], { wash: '#8a8e9a', washA: 1, w: 1.4, col: L }); pop(); }
    for (let i = 0; i < 9; i++) { const x = -100 + i * 30; pencil([[x, 1800], [x, 1750]], { w: 3, col: '#3a7a2a', pass2: false }); ell(x, 1746, 10, 10, { wash: ['#f4f4f0', '#2a6aa8'][i % 2], washA: 1, w: 1, col: L }); }
    lightPool(640, 1580, 900, 180, 'rgba(255,232,180,1)', 0.3); castShadow(420, 1720, 110, 560, -2.6, 0.3); moodDark(100, 1000, 800, 1900, '#10182a', 0.12);
  }
  function extras(t) { push(1180, 1540, 0.85); human(0, 0, 1, t, { body: '#3a3a4a', hat: 'cap', hatCol: '#c8281e', legs: '#2a2a36', armR: 'wave', flip: -1, seed: 12240, face: 'grin' }); rect(-90, -200, 70, 90, { wash: '#c8281e', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 6; q++) pencil([[-86 + q * 12, -200], [-86 + q * 12, -110]], { w: 2, col: '#f4f4f0', pass2: false }); pop();
    for (let i = 0; i < 2; i++) { push(-60 + i * 70, 1560, 0.8); human(0, 0, 1, t, { body: ['#2a8a5a', '#e8b030'][i], legs: '#2a2a36', armR: 'hold', seed: 12245 + i, face: 'smile' }); rect(30, -190, 20, 30, { wash: '#f4f0e6', washA: 1, w: 1, col: L }); pop(); } }
  function front(t) { for (const x of [-150, 1240]) birchTrunk(x, t, x > 0 ? 12 : 11); }
  function infog(t) { if (t < EV.td_good - 0.1) return; const k = popK(t, EV.td_good - 0.1, 0.3); const tags = [['СЕЙМ', 300, 900], ['МАРКА', 760, 920], ['ЯЗЫК', 300, 1180], ['АВТОНОМИЯ', 780, 1180]];
    tags.forEach(([s1, x, y], i) => { const kk = popK(t, EV.td_good - 0.1 + i * 0.12, 0.25); if (kk <= 0) return; push(x, y, kk * 0.9, (i % 2 ? 0.05 : -0.05)); ctx.save(); ctx.font = '600 44px Osw'; const w = ctx.measureText(s1).width + 40; ctx.fillStyle = 'rgba(10,16,30,0.9)'; ctx.fillRect(-w / 2, -36, w, 72); ctx.restore(); txt(s1, 0, 0, 44, { col: '#ffe08a', font: 'Osw' }); pop(); });
    if (t > EV.td_state) { const kk = popK(t, EV.td_state, 0.3); push(640, 1000, 1.4 - 0.4 * kk, -0.1); pencil([[-160, -50], [160, -50], [160, 50], [-160, 50], [-160, -50]], { w: 7, col: '#2a8a4a', pass2: false, gap: true }); txt('→ 1917', 0, 6, 60, { col: '#2a8a4a', font: 'Osw' }); pop(); } }
  function extras2(t) {                                             // семья на ступенях, девушка с кофе, мальчик с флажком
    for (let i = 0; i < 3; i++) human(-80 + i * 60, 1560, 0.7, t, { body: ['#2a6aa8', '#e8b030', '#c84a3a'][i], legs: '#2a2a36', armR: i === 2 ? 'wave' : 'hold', seed: 12260 + i, face: 'smile' }); push(80, 1560 - 360 * 0.7, 0.7); finFlag(0, 0, 60, 40, t, { pole: 100 }); pop();
    push(1120, 1560, 0.8); human(0, 0, 1, t, { body: '#e86a8a', hat: 'bun', hatCol: '#e8c060', legs: '#2a3a5a', armR: 'hold', flip: -1, seed: 12265, face: 'smile' }); rect(-70, -190, 22, 34, { wash: '#f4f0e6', washA: 1, w: 1.2, col: L }); pop();
    for (let i = 0; i < 2; i++) { push(380 + i * 360, 1600 + i * 20, 0.8); rect(-110, -60, 220, 18, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); rect(-110, -110, 220, 14, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (const k of [-90, 90]) pencil([[k, -42], [k, 0]], { w: 6, col: '#2a2a2a', pass2: false }); human(-40, -40, 0.7, t, { body: ['#5a6a8a', '#8a5a4a'][i], hat: i ? 'scarf' : 'cap', hatCol: '#3a3a3a', legs: '#2a2a2a', long: i ? 1 : undefined, armR: 'hold', seed: 12300 + i + 20, face: 'smile' }); pop(); }
    for (let i = 0; i < 6; i++) { const x = ((t * 50 + i * 260) % 1700) - 200, y = 560 + (i % 3) * 40 + Math.sin(t * 2 + i) * 14; push(x, y, 1); pencil([[-22, Math.sin(t * 8 + i) * 8], [0, 0], [22, Math.sin(t * 8 + i) * 8]], { w: 4, col: '#1a1a1e', pass2: false }); pop(); }
    for (let i = 0; i < 4; i++) { push(-120 + i * 90, 1880 + (i % 2) * 20, 1); blob([[-40, 0], [-20, -24], [30, -20], [44, 0]], { wash: '#ffffff', washA: 0.95, w: 1.2, col: '#a8b4c4' }); pop(); }
    for (let i = 0; i < 2; i++) { push(-100 + i * 1380, 1500, 0.8); pencil([[0, 0], [0, -420]], { w: 7, col: '#2a2a2e', pass2: false }); pencil([[0, -420], [50, -440]], { w: 5, col: '#2a2a2e', pass2: false }); rect(30, -470, 50, 56, { wash: '#ffd890', washA: 1, w: 2, col: L }); glow(55, -440, 50, 'rgba(255,210,130,1)', 0.3); ell(55, -476, 30, 8, { wash: '#ffffff', washA: 0.9, line: false }); pop(); }
  }
  WORLD.today = (t, u, cat) => {
    lay(40, () => sky(t)); lay(14, () => far(t)); lay(3.2, () => square(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(2, () => motes(14, [-100, 700, 1200, 1600], '#fff8e0', t, 12250, { sp: 2, sz: 2.4, a: 0.4, wob: 16, add: 1 }));
  };
  DIR.today = {
    outfit: 'hoodieFI', light: { side: 1, rim: '#ffe0b0' }, grade: ['#2a2010', 0.04],
    act: () => [[S0.today, 'suspicious'], [EV.answer, 'smug'], [EV.td_good, 'grin'], [EV.td_state, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 380, y: 1720, s: 0.95, look: [0.6, -0.7], hand: t > EV.td_state ? [200, -330] : [150, -300], point: t > EV.td_good && t < EV.td_state }),
    hud: t => infog(t),
    cam: () => [[S0.today, 620, 980, -0.06], [EV.answer, 640, 960, -0.04], [S1.today, 620, 980, -0.02]]
  };
  TRANS_IN.today = { a: 0.1, b: 0.35, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.drawImage(A, 0, 0); ctx.restore(); }); whiteOut(Math.sin(e * Math.PI) * 0.5, '255,244,214'); } };
})();
