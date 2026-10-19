/* 004 — сцена `caesar`: 15 марта 44 до н. э., курия Помпея. Мраморный зал, статуя Помпея, сенаторы в тогах с поднятыми кинжалами,
   Брут впереди, Цезарь в лавровом венке. На «И ты, Брут?» — облачко-реплика «ET TU, BRUTE?», на «Шекспир» его перечёркивает,
   а из овального «окна в 1599» выглядывает Шекспир с пером. На «накрылся тогой» Цезарь натягивает тогу на голову — молча. Без крови.
   Том — сенатор в тоге. Переход В сцену: кинжалы режут кадр крест-накрест, куски разлетаются. */
(() => {
  EV.cz_brut = WT('s3', 'Брут?»');
  EV.cz_shake = WT('s3', 'Шекспир.');
  EV.cz_silent = WT('s3', 'молча');
  EV.cz_toga = WT('s3', 'тогой.');
  SHAKES.push([EV.cz_shake, 0.18, 6]);
  KEYW.push('Шекспир.', 'тогой.');

  function hall(t) {                                                 // зал курии: колоннада, мраморный пол, ниши, свет из проёмов
    vgrad(-800, 1500, ['#5a4a3a', '#8a7458', '#c8ac80', '#d8bc90']);
    for (let k = 0; k < 7; k++) { const x = -250 + k * 260; column(x, 1260, 980, 44, { cap: 'cor', col: k % 2 ? '#e8dcc4' : '#dccfb2', key: 9700 + k }); }
    rect(-400, 210, 1900, 80, { wash: '#d8c8a8', washA: 1, w: 2.4, col: '#3a2a14' }); for (let x = -380; x < 1500; x += 40) rect(x, 230, 20, 30, { wash: '#c8b898', washA: 1, w: 1, col: '#3a2a14', a: 0.6 });
    for (let k = 0; k < 6; k++) { const x = -120 + k * 260; rays(x, 300, 1.35, 0.12, 1100, 'rgba(255,236,190,0.6)', 0.12, 3, t); }
    for (let k = 0; k < 3; k++) { const x = 130 + k * 260 * 2 - 260; const n = rect(x - 70, 560, 140, 300, { wash: '#7a3a2a', washA: 1, w: 2, col: '#2a1408' }); }
  }
  function pompey(t) {                                               // статуя Помпея на пьедестале
    push(540, 1170, 1.25); rect(-110, -160, 220, 160, { wash: '#d8ccb0', washA: 1, w: 2.4, col: '#3a2a14', shade: { gap: 7, a: 0.15, col: '#000' } }); txt('POMPEIVS', 0, -80, 34, { font: 'Osw', col: '#5a4a30' });
    ctx.save(); ctx.globalAlpha = 0.95; human(0, -160, 1.15, 0, { body: '#e8e0cc', toga: '#f2ece0', long: 1, skin: '#e2d8c4', hair: '#cfc4ac', face: 'calm', armL: 'down', armR: 'point', look: 0.2, seed: 701 }); ctx.restore(); pop();
  }
  function senators(t) {                                             // заговорщики: кинжалы вверх (без ударов в кадре)
    const raise = sm(clamp((t - S0.caesar) / 0.5));
    const S = [[160, 0.82, '#e8e0cc', 702, -0.3, 'angry'], [300, 0.86, '#f0e8d4', 703, -0.5, 'angry'], [760, 0.84, '#ece4d0', 704, 0.6, 'angry'], [900, 0.8, '#e4dcc8', 705, 0.7, 'shock']];
    for (const [x, s, c, sd, lk, f] of S) { human(x, 1300, s, t, { body: c, toga: lerpC(c, '#ffffff', 0.3), stripe: '#6e1a52', long: 1, hair: ['#3a2a1a', '#8a8a8a', '#2a1a10', '#c8c8c8'][sd % 4], face: f, armR: raise > 0.5 ? 'up' : 'hold', armL: 'down', prop: 'sword', propAng: 0.15, look: lk, flip: x > 540 ? -1 : 1, seed: sd }); }
  }
  function caesarFig(t) {                                            // Цезарь: лавровый венок, пурпурная тога; на «тогой» — накрывает голову
    const cov = t > EV.cz_toga - 0.1;
    human(470, 1400, 1.15, t, { body: '#e8dcc4', toga: '#7a1a52', stripe: '#d6a842', long: 1, hair: '#6a5a4a', hat: cov ? 'hood' : 'laurel', hatCol: '#7a1a52', face: t > EV.cz_silent ? 'calm' : 'shock', armL: cov ? 'up' : 'down', armR: cov ? 'up' : 'wave', look: -0.5, seed: 710 });
    // Брут — ближе к нам, спиной к Тому
    human(260, 1420, 1.1, t, { body: '#efe6d0', toga: '#f8f2e4', stripe: '#6e1a52', long: 1, hair: '#2a1a10', beard: 'short', face: 'angry', armR: 'up', prop: 'sword', propAng: 0.15, armL: 'hips', look: 0.6, seed: 711 });
    txt('БРУТ', 260, 1450, 30, { font: 'Hand', col: '#3a2410' }); txt('ЦЕЗАРЬ', 470, 1430, 30, { font: 'Hand', col: '#3a2410' });
  }
  function bubble(t) {                                               // «ET TU, BRUTE?» и перечёркивание на «Шекспир»
    if (t < LS('s3') || t > EV.cz_silent) return; const k = popK(t, LS('s3'), 0.3); push(560, 880, k, -0.05);
    blob([[-200, -70], [200, -80], [220, 40], [40, 60], [-20, 120], [-10, 60], [-210, 50]], { wash: '#fbf6ea', washA: 1, w: 3, col: '#2a1a0a' });
    txt('ET TU, BRUTE?', 0, -6, 52, { font: 'Osw', col: '#2a1a0a' });
    if (t > EV.cz_shake) { const q = clamp((t - EV.cz_shake) / 0.25); pencil([[-190, 30], [-190 + 380 * q, -50]], { w: 10, col: '#c8241e', pass2: false }); }
    pop();
  }
  function bard(t) {                                                 // окно в 1599: Шекспир с пером
    if (t < EV.cz_shake - 0.05) return; const k = popK(t, EV.cz_shake - 0.05, 0.4), a = 1 - clamp((t - EV.cz_toga) / 0.3);
    if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; push(860, 760, k * 0.95);
    const fr = ell(0, 0, 150, 190, { wash: '#2a3a5a', washA: 1, w: 6, col: '#d6a842' }); ctx.save(); ctx.clip(fr.path);
    vgrad(-200, 200, ['#2a3a5a', '#5a6a8a']); human(0, 260, 1.05, t, { body: '#1e1c1e', legs: '#1e1c1e', hair: '#6a4a2a', beard: 'short', face: 'grin', armR: 'up', prop: 'scroll', look: -0.5, seed: 720 });
    ell(0, 260 - 1.05 * 238 + 6, 54, 16, { wash: '#f6f2e8', washA: 1, w: 2, col: '#3a3a3a' }); ctx.restore();
    pencil(ellPts(0, 0, 150, 190, 0, 0.02, 60), { w: 8, col: '#d6a842', pass2: false }); for (let q = 0; q < 10; q++) { const aa = q / 10 * 6.283 + t; glow(Math.cos(aa) * 160, Math.sin(aa) * 200, 18, 'rgba(255,230,160,1)', 0.8); }
    rect(-90, 160, 180, 56, { wash: '#efe2c0', washA: 1, w: 2, col: '#3a2410' }); txt('Шекспир, 1599', 0, 190, 30, { font: 'Hand', col: '#3a2410' });
    pop(); ctx.restore();
  }
  WORLD.caesar = (t, u, cat) => {
    lay(20, () => hall(t));
    lay(6, () => { pompey(t); haze('#d8bc90', 0.1); });
    lay(3, () => { senators(t); haze('#d8bc90', 0.06); });
    lay(1, () => { const f = poly([[-400, 1360], [1500, 1360], [1500, 2400], [-400, 2400]], { wash: '#d8ccb4', washA: 1, w: 2, col: '#3a2a14', key: 9710 });
      for (let k = 0; k < 14; k++) { pencil([[-400, 1380 + k * 30 + k * k * 2], [1500, 1380 + k * 30 + k * k * 2]], { w: 1.6, col: '#8a7a5a', a: 0.5, pass2: false }); } for (let x = -400; x < 1500; x += 120) pencil([[540 + (x - 540) * 0.3, 1360], [x, 2000]], { w: 1.6, col: '#8a7a5a', a: 0.5, pass2: false });
      for (let k = 0; k < 10; k++) { const r = rng(9711 + k), x = -300 + r() * 1700, y = 1400 + r() * 500; pencil(spline([[x, y], [x + 40, y + 10], [x + 70, y - 6]], false, 5), { w: 1.4, col: '#a89a7a', a: 0.6, pass2: false }); }
      caesarFig(t); cat(); bubble(t); bard(t); });
  };
  DIR.caesar = {
    outfit: 'toga', light: { side: -1, rim: '#ffe6b0' }, grade: ['#8a5a3a', 0.1],
    act: () => [[S0.caesar, 'suspicious'], [EV.cz_brut, 'sideeye'], [EV.cz_shake, 'smug'], [EV.cz_silent, 'scared'], [EV.cz_toga, 'awe']],
    pose: (t, u, b) => Object.assign(b, { x: 860, y: 1580, s: 0.98, look: t < EV.cz_shake ? [-0.6, 0] : t < EV.cz_silent ? [0.3, -0.3] : [-0.7, 0.1], point: t > EV.cz_shake && t < EV.cz_silent ? 1 : undefined, hand: t > EV.cz_shake && t < EV.cz_silent ? [-120, -330] : undefined, tilt: t > EV.cz_toga ? -0.06 : 0 }),
    cam: () => [[S0.caesar, 540, 1120, 0.06], [EV.cz_brut, 520, 1060, 0.1], [EV.cz_shake, 640, 980, 0.12], [EV.cz_silent, 500, 1140, 0.14, 'x'], [S1.caesar, 500, 1140, 0.2]],
    hud: t => { stamp(t, EV.cz_shake + 0.15, 'myth', 330, 1290, -0.1, 0.8); }
  };
  // ---------------------------------------------------------------- переход В сцену: кинжалы режут кадр, куски разлетаются
  TRANS_IN.caesar = { a: 0.25, b: 0.4, runA: 0, holdA: 1, fx(k, t, A, B) {
    drawBuf(B, 1.1 - 0.1 * sm(k));
    const cuts = [[[-100, 300], [1200, 1500]], [[1200, 200], [-100, 1700]], [[-100, 1000], [1200, 800]]];
    const sp = sm(clamp((k - 0.35) / 0.65)) * 900;
    const pieces = [[[0, 0], [W, 0], [W, 500], [0, 900]], [[0, 900], [W, 500], [W, 1300], [0, 1300]], [[0, 1300], [W, 1300], [W, H], [0, H]]];
    pieces.forEach((P, i) => { const ang = (i - 1) * 0.4, dx = Math.cos(ang + i) * sp * (i % 2 ? 1 : -1), dy = (i - 1) * sp * 0.8; const p = new Path2D(); P.forEach(([x, y], j) => j ? p.lineTo(x, y) : p.moveTo(x, y)); p.closePath();
      ctx.save(); ctx.setTransform(1, 0, 0, 1, dx, dy); ctx.rotate(sp * 0.0003 * (i - 1)); ctx.clip(p); ctx.drawImage(A, 0, 0); ctx.restore(); });
    scr(() => cuts.forEach(([a, b], i) => { const q = clamp(k * 3 - i * 0.4); if (q <= 0 || k > 0.6) return; const x = lerp(a[0], b[0], q), y = lerp(a[1], b[1], q);
      pencil([a, [x, y]], { w: 10, col: '#fff8e8', a: 0.95, pass2: false }); glow(x, y, 60, 'rgba(255,250,230,1)', 0.9);
      push(x, y, 1.3, Math.atan2(b[1] - a[1], b[0] - a[0]) + Math.PI / 2); blob([[-8, 0], [8, 0], [5, -110], [0, -130], [-5, -110]], { wash: '#dfe6ea', washA: 1, w: 1.8, col: '#2a3036' }); rect(-20, 0, 40, 10, { wash: '#c08a3c', washA: 1, w: 1.4 }); rect(-6, 10, 12, 34, { wash: '#4a2a14', washA: 1, w: 1.4 }); pop(); }));
  } };
})();
