/* 004 — сцена `tower`: 1969, Александерплац. Снизу вверх — новая телебашня, на её стальном шаре солнце зажигает блик-крест.
   Чиновники в серых костюмах на открытии с красной лентой шарахаются, один пытается закрыть крест газетой. Мировые часы, панельки, «Трабант».
   На «Месть Папы» — рукописная подпись к кресту. Переход сюда — парашютик с конфетой летит в камеру и закрывает кадр. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.tow_cut = wt('s8', 'построили');            // ленточку режут — хлопок
  EV.tow_cross = wt('s8', 'крест!');             // блик-крест — «дзинь»
  EV.tow_pope = wt('s8', '«Месть');              // подпись «Месть Папы»
  SHAKES.push([EV.tow_cross, 0.25, 6]);
  KEYW.push('башню', 'крест!');

  const TX = 660, TB = 1740, TS = 1.38;                                // башня
  const crossK = t => sm(clamp((t - EV.tow_cross + 0.15) / 0.35)) * (0.85 + 0.15 * Math.sin(t * 9));
  function sky(t) { vgrad(-700, 1500, ['#2e6ab4', '#6aa4dc', '#bcd8ec', '#eef0e8'], 1); glow(960, 420, 420, 'rgba(255,246,210,1)', 0.55); ell(960, 420, 54, 54, { wash: '#fffbe8', washA: 0.95, line: false }); for (const [x, y, s, sd] of [[180, 520, 1.2, 81], [420, 300, 0.9, 82]]) cloudB(x + t * 6, y, s, '#ffffff', 0.85, sd); }
  function blocks(t) {                                               // панельки и Дом учителя вдали
    for (const [x, w, h, c] of [[-220, 360, 420, '#d8d4c8'], [880, 420, 380, '#cfcabe'], [140, 300, 300, '#c4c0b4']]) { const p = rect(x, 1360 - h, w, h, { wash: c, washA: 1, w: 1.8, col: '#4a4a4a' }); for (let f = 0; f < Math.floor(h / 36); f++) for (let k = 0; k < Math.floor(w / 30); k++) rect(x + 8 + k * 30, 1360 - h + 10 + f * 36, 18, 20, { wash: (f + k) % 7 ? '#5a6a7a' : '#f6dca0', washA: 0.9, line: false }); }
    rect(-220, 1250, 360, 40, { wash: '#2a6ab4', washA: 0.8, line: false }); haze('#e8eef0', 0.2);
  }
  function worldClock(t) {                                           // Мировые часы (1969): колонна, кольцо с городами, «атом» сверху
    push(170, 1440, 1); rect(-14, -520, 28, 520, { wash: '#8a8e94', washA: 1, w: 2, col: '#2a2a2e' });
    const rr = ell(0, -560, 130, 46, { wash: '#d8a842', washA: 1, w: 2.4, col: '#4a3a08' }); rect(-130, -600, 260, 80, { wash: '#e8b84a', washA: 1, w: 2.2, col: '#4a3a08' });
    const C = ['MOSKAU', 'HAVANNA', 'PEKING', 'BERLIN', 'TOKIO', 'KAIRO']; for (let i = 0; i < 3; i++) txt(C[(Math.floor(t * 0.8) + i) % C.length], -84 + i * 84, -560, 20, { font: 'Osw', col: '#3a2a08' });
    for (let k = 0; k < 3; k++) pencil(ellPts(0, -700, 70, 22, k * 1.05 + t * 0.6, 0.05, 30), { w: 3, col: '#6a6e74', pass2: false }); for (let k = 0; k < 6; k++) { const a = k / 6 * 6.283 + t * 1.2; ell(Math.cos(a) * 66, -700 + Math.sin(a) * 22, 9, 9, { wash: '#c8cccf', washA: 1, w: 1.4, col: '#2a2a2e' }); }
    pencil([[0, -600], [0, -680]], { w: 6, col: '#6a6e74', pass2: false }); pop();
  }
  function tower(t) {
    tvTower(TX, TB, TS, t, { cross: crossK(t) });
    if (t > EV.tow_cross) { push(TX, TB - 800 * TS, TS); rays(92 * 0.36, -92 * 0.3, -0.8, 1.2, 600, 'rgba(255,250,220,1)', 0.25 * crossK(t), 10, t); pop(); }
  }
  function ceremony(t) {                                             // красная лента, чиновники, оркестр
    const cut = t > EV.tow_cut, sh = t > EV.tow_cross;
    const rb = cut ? 0 : 1; pencil([[300, 1380], [540, 1394 + rb * 6], [800, 1380]], { w: cut ? 0.1 : 10, col: '#c8241e', a: rb, pass2: false });
    if (cut) { pencil([[300, 1380], [380, 1440], [420, 1470]], { w: 10, col: '#c8241e', pass2: false }); pencil([[800, 1380], [720, 1440], [690, 1470]], { w: 10, col: '#c8241e', pass2: false }); }
    const O = [[260, null], [360, 'cap'], [740, null], [850, 'cap'], [960, null]];
    O.forEach(([x, h], i) => human(x, 1440, 0.74, t, { body: '#6a6e74', legs: '#4a4e54', hat: h, hatCol: '#2a2a2e', hair: '#3a3a3a', face: sh ? (i === 2 ? 'angry' : 'shock') : 'calm', armL: sh && i % 2 ? 'up' : 'down', armR: i === 2 && sh ? 'up' : i === 1 && !sh ? 'hold' : sh ? 'point' : 'down', prop: i === 2 && sh ? 'scroll' : undefined, seed: 180 + i, flip: x > 540 ? -1 : 1 }));
    for (let k = 0; k < 3; k++) { push(1080 + k * 60, 1450, 0.6); human(0, 0, 1, t, { body: '#2a4a7a', legs: '#2a2a3a', hat: 'cap', hatCol: '#2a4a7a', face: 'calm', armR: 'hold', seed: 190 + k, flip: -1 }); ell(-40, -170, 30, 14, { wash: '#d6a842', washA: 1, w: 1.6, col: '#5a3a08', rot: 0.4 }); pop(); }
  }
  function plaza(t) { const p = rect(-300, 1400, 1700, 900, { wash: '#b0aaa0', washA: 1, line: false }); shadeG(p.path, 0, 2000, 0, 1400, '#5a5650', 0.4); for (let k = 0; k < 16; k++) pencil([[540 + (k - 8) * 30, 1400], [540 + (k - 8) * 200, 2100]], { w: 1.4, col: '#7a7670', a: 0.5, pass2: false, gap: false }); for (let k = 0; k < 8; k++) { const y = 1400 + k * k * 12; pencil([[-300, y], [1400, y]], { w: 1.4, col: '#7a7670', a: 0.5, pass2: false, gap: false }); } }
  function trabant(t) {                                              // «Трабант» 601 на переднем плане
    push(1010, 1900, 1.1); ell(0, 6, 220, 20, { wash: '#000000', washA: 0.25, line: false });
    const b = blob([[-210, 0], [-206, -70], [-150, -90], [-90, -160], [80, -160], [140, -92], [210, -76], [214, 0]], { wash: '#8ab4a8', washA: 1, w: 3, col: '#1c2a26', key: 8950 }); shadeG(b.path, 0, -160, 0, 0, '#4a6a62', 0.35);
    poly([[-80, -150], [70, -150], [120, -96], [-130, -96]], { wash: '#3a4a5a', washA: 1, w: 2, col: '#1c2a26' }); pencil([[0, -150], [0, -96]], { w: 5, col: '#8ab4a8', pass2: false });
    for (const wx of [-130, 130]) { ell(wx, 0, 44, 44, { wash: '#1a1a1a', washA: 1, w: 2, col: '#000' }); ell(wx, 0, 20, 20, { wash: '#c8ccd0', washA: 1, w: 1.4 }); }
    rect(170, -60, 40, 22, { wash: '#fff2c0', washA: 1, w: 1.4 }); rect(-40, -40, 90, 26, { wash: '#f4f0e6', washA: 1, w: 1.4 }); txt('601', 4, -26, 20, { font: 'Osw', col: '#1a1a1a' });
    if (Math.sin(t * 5) > 0.3) { const ph = (t * 2) % 1; ell(-240 - ph * 60, -10 - ph * 20, 16 + ph * 30, 12 + ph * 20, { wash: '#c8c4bc', washA: 0.6 * (1 - ph), line: false }); }
    pop();
  }

  WORLD.tower = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(7, () => blocks(t));
    lay(2.2, () => tower(t));
    lay(1.3, () => worldClock(t));
    lay(1, () => { plaza(t); ceremony(t); cat(); });
    lay(0.7, () => trabant(t));
  };
  DIR.tower = {
    outfit: 'iron', light: { side: 1, rim: '#fff6d8' }, grade: ['#e8b070', 0.16],
    act: () => [[S0.tower, 'smug'], [EV.tow_cut, 'proud'], [EV.tow_cross, 'shock'], [EV.tow_pope, 'laugh']],
    pose: (t, u, b) => Object.assign(b, {
      x: 470, y: GY, s: 0.96, look: t > EV.tow_cross - 0.2 && t < EV.tow_pope ? [0.4, -1] : [0.2, -0.3], hand: t > EV.tow_cross && t < EV.tow_pope ? [150, -360] : undefined, point: t > EV.tow_cross && t < EV.tow_pope ? 1 : undefined, squash: b.squash, tailUp: t > EV.tow_cross && t < EV.tow_pope
    }),
    cam: () => [[S0.tower, 560, 1080, 0.06], [EV.tow_cut, 560, 1000, 0.02], [EV.tow_cross - 0.2, 620, 880, 0.0], [EV.tow_pope, 630, 900, 0.03], [S1.tower, 610, 940, 0.07]],
    hud: t => { if (t > EV.tow_pope) note('«Месть Папы»', 300, 640, t, EV.tow_pope, S1.tower, '#2a1a10', 76, -0.06, [[420, 690], [560, 640]]); if (t > S0.tower + 0.3 && t < EV.tow_cross) note('368 м — выше всех в Германии', 760, 1060, t, S0.tower + 0.3, EV.tow_cross, '#2a1a10', 38, -0.03); }
  };

  // ---------------------------------------------------------------- переход В 1969: парашютик с конфетой летит в камеру и закрывает кадр
  TRANS_IN.tower = { a: 0.35, b: 0.4, fx(k, t, A, B) {
    drawBuf(k < 0.5 ? A : B, 1, 540, 960);
    const g = k < 0.5 ? Math.pow(k / 0.5, 2.4) : 1, up = k < 0.5 ? 0 : sm((k - 0.5) / 0.5), sc = 0.8 + g * 22 - up * 18, y = 720 - up * 2600;
    scr(() => { push(540, y, sc); const c = blob([[-50, 0], [-40, -40], [0, -54], [40, -40], [50, 0], [25, -8], [0, -4], [-25, -8]], { wash: '#fbf8f2', washA: 1, w: 2, col: '#5a5a5a' }); for (const sx of [-50, -25, 25, 50]) pencil([[sx, -2], [0, 70]], { w: 1.4, col: '#5a5a5a', pass2: false }); if (sc < 4) { rect(-18, 66, 36, 22, { wash: '#5a2e14', washA: 1, w: 1.6, col: '#2a1206' }); rect(-18, 72, 36, 10, { wash: '#c8a040', washA: 1, line: false }); } pop(); });
    if (k > 0.42 && k < 0.6) whiteOut(0.9 * (1 - Math.abs(k - 0.5) / 0.1), '251,248,242');
  } };
})();
