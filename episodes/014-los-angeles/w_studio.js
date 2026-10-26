/* 014 — сцена `studio`: 1911, угол Сансет и Гауэр — придорожная таверна, переделанная в первую киностудию (вывеска «STUDIO»,
   без чужих логотипов). Съёмка прямо на улице: декорация-фасад салуна на подпорках, «ковбой» на лошади, «шериф», оператор крутит
   ручку камеры, режиссёр с рупором; над площадкой натянут белый тент-рассеиватель; пальмы, апельсиновые деревья, тот же хребет.
   На «киностудия» над таверной вспыхивает вывеска, на «Лампы» — зачёркнутая лампа, на «солнце» сияет солнце и все щурятся.
   Том — режиссёр (твидовый жилет, кепка, рупор). Переход В сцену — кинохлопушка щёлкает, кадр мелькает перфорацией. */
(() => {
  EV.st_st = wtk('s4', 'киностудия');
  EV.st_lamp = wtk('s4', 'Лампы');
  EV.st_sun = wtk('s4', 'солнце.');
  KEYW.push('киностудия', 'Сансет.', 'солнце.');

  function sky(t) { const b = t > EV.st_sun ? sm((t - EV.st_sun) / 0.5) : 0; vgrad(-900, 1000, ['#4a8ad8', '#a8d4f0', '#f8f0d8'], 1); ell(1200, 300, 90 + b * 30, 90 + b * 30, { wash: '#fff2b0', washA: 1, line: false }); glow(1200, 300, 300 + b * 500, 'rgba(255,240,170,1)', 0.5 + b * 0.4); rays(1200, 300, 0, 6.28, 600 + b * 600, 'rgba(255,240,180,0.5)', 0.2 + b * 0.3, 14, t * 0.4); }
  function lot(t) {                                                    // таверна-студия, декорация, деревья
    const g = shape([[-600, 1500], [-600, 1040], [1700, 1030], [1700, 1500]], { wash: '#d8c49a', washA: 1, w: 2, col: '#7a5a2a' }); hatch(g.path, g.bb, { gap: 11, a: 0.14, col: '#9a7a4a', ang: -0.3, w: 1.1 });
    for (const [x, h] of [[-420, 360], [1380, 400]]) palm(x, 1060, h, t);
    for (const x of [-200, 1180]) { pencil([[x, 1060], [x, 960]], { w: 10, col: '#5a3a1e' }); for (let q = 0; q < 5; q++) { ell(x - 50 + q * 26, 930 - (q % 2) * 26, 44, 34, { wash: '#3a6a2a', washA: 1, w: 1.6, col: '#1a3a14' }); ell(x - 40 + q * 22, 930 + (q % 2) * 10, 7, 7, { wash: '#f0902a', washA: 1, w: 1, col: '#7a3a08' }); } }
    rect(-100, 820, 420, 240, { wash: '#e8dcc4', washA: 1, w: 2.6, col: '#3a2a14' }); poly([[-120, 820], [340, 820], [110, 720]], { wash: '#7a4a2a', washA: 1, w: 2.4, col: '#2a1408' }); for (let q = 0; q < 4; q++) rect(-70 + q * 96, 880, 50, 70, { wash: '#4a5a6a', washA: 1, w: 1.6, col: '#1a1a1a' });
    push(110, 790, t > EV.st_st ? 1 + 0.1 * popK(t, EV.st_st, 0.3) : 1); rect(-150, -34, 300, 68, { wash: '#2a1a10', washA: 1, w: 2.4, col: '#000' }); txt('FILM STUDIO · 1911', 0, 12, 30, { font: 'Osw', col: t > EV.st_st ? '#ffd24a' : '#c8b088' }); if (t > EV.st_st) glow(0, 0, 160, 'rgba(255,220,120,1)', 0.35); pop();
    push(820, 1180); rect(-200, -340, 400, 340, { wash: '#b8885a', washA: 1, w: 2.6, col: '#3a2412' }); for (let q = 1; q < 8; q++) pencil([[-200, -340 + q * 42], [200, -340 + q * 42]], { w: 1.6, col: '#7a5430', a: 0.7, pass2: false }); rect(-160, -400, 320, 60, { wash: '#efe0b8', washA: 1, w: 2.4, col: '#3a2412' }); txt('SALOON', 0, -360, 40, { font: 'Osw', col: '#5a1a10' }); rect(-50, -150, 100, 150, { wash: '#4a2e1a', washA: 1, w: 2, col: '#1a0a04' }); pencil([[200, -300], [300, 0]], { w: 6, col: '#7a5430' }); pop();
    blob([[440, 780], [1120, 760], [1100, 830], [460, 850]], { wash: '#fbf8f0', washA: 0.85, w: 2, col: '#8a8270' }); for (const px of [460, 1100]) pencil([[px, 820], [px, 1180]], { w: 6, col: '#6a5a4a', pass2: false });
  }
  function crew(t) {                                                   // ковбой на лошади, шериф, оператор
    const hx = 900 + Math.sin(t * 2) * 20; push(hx, 1320, 0.6, 0, -1); blob([[-140, -160], [-150, -230], [-60, -260], [100, -250], [150, -200], [140, -150]], { wash: '#7a4a2a', washA: 1, w: 2.4, col: '#2a1408' }); blob([[100, -240], [170, -330], [220, -320], [200, -260], [150, -220]], { wash: '#7a4a2a', washA: 1, w: 2.4, col: '#2a1408' }); for (const lx of [-110, -70, 80, 120]) pencil([[lx, -160], [lx + Math.sin(t * 6 + lx) * 14, 0]], { w: 12, col: '#5a3418' }); pencil([[-150, -220], [-200, -150]], { w: 8, col: '#2a1408', pass2: false }); pop();
    human(hx, 1320 - 0.6 * 250, 0.46, t, { body: '#c8603a', legs: '#4a5a8a', hair: '#3a2210', hat: 'straw', hatCol: '#d8b870', face: 'angry', armR: 'up', armL: 'hold', seed: 14510, flip: -1 });
    human(1130, 1330, 0.5, t, { body: '#2a2a2e', legs: '#4a4a4e', hair: '#3a2210', beard: 'short', hat: 'merchant', hatCol: '#2a1a10', face: 'angry', armR: 'point', armL: 'hold', seed: 14511, flip: -1 }); txt('★', 1130, 1250, 26, { col: '#e8b84a' });
    camera1911(560, 1360, 0.7, t, { crank: true }); human(470, 1360, 0.5, t, { body: '#e8e4dc', legs: '#5a4a3a', hair: '#2a1a10', hat: 'cap', hatCol: '#5a4a3a', face: 'calm', armR: 'point', armL: 'hold', seed: 14512 });
  }

  WORLD.studio = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(16, () => ridge(t, { col: '#b8a070', colD: '#7a6a3a' }));
    lay(5, () => lot(t));
    lay(2.5, () => crew(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#c8b088', washA: 1, w: 2, col: '#5a4a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#6a5a2a', ang: 0.1, w: 1.2 }); cat(); });
    lay(0.7, () => motes(30, [-200, 600, 1300, 1900], '#fff2c0', t, 14520, { sp: -10, vx: 20, sz: 3, a: 0.35, wob: 30 }));
  };
  DIR.studio = {
    outfit: 'director', light: { side: 1, rim: '#fff4d0' }, grade: ['#c8b080', 0.06],
    act: () => [[S0.studio, 'proud'], [EV.st_st, 'grin'], [EV.st_lamp, 'suspicious'], [EV.st_sun - 0.03, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 280, y: 1480, s: 1.0, look: t < EV.st_sun ? [0.6, -0.3] : [0.7, -0.8], point: t > EV.st_sun ? 1 : undefined, hand: t > EV.st_sun ? [140, -420] : [120, -300] }),
    cam: () => [[S0.studio, 560, 1080, 0.06], [EV.st_st, 440, 980, 0.1], [EV.st_lamp, 560, 1060, 0.06], [EV.st_sun, 620, 900, 0.02], [S1.studio, 620, 920, 0.04]],
    hud: t => { if (t > EV.st_lamp && t < EV.st_sun + 0.5) { const k = popK(t, EV.st_lamp, 0.3); push(640, 1000, k, 0.04); ell(0, -30, 60, 70, { wash: '#fff2b0', washA: 1, w: 3, col: '#3a3a3a' }); rect(-30, 30, 60, 50, { wash: '#8a8a8e', washA: 1, w: 2, col: '#2a2a2a' }); pencil([[-90, -110], [90, 90]], { w: 14, col: '#d8201e', pass2: false }); pencil([[90, -110], [-90, 90]], { w: 14, col: '#d8201e', pass2: false }); pop(); }
      if (t > EV.st_sun) { const k = popK(t, EV.st_sun, 0.35); push(600, 740, k, -0.03); rect(-220, -56, 440, 112, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('СОЛНЦЕ КРУГЛЫЙ ГОД', 0, -6, 36, { font: 'Osw', col: '#a8501e' }); txt('снимали при дневном свете', 0, 34, 22, { col: '#2a1a10' }); pop(); } }
  };
  TRANS_IN.studio = { a: 0.25, b: 0.4, fx(k, t, A, B) {              // хлопушка щёлкает, кадр мелькает перфорацией
    const sh = k < 0.4 ? 0 : (k - 0.4) * 2400; drawBuf(k < 0.45 ? A : B, 1.0);
    scr(() => { const f = Math.sin(clamp(k) * Math.PI); for (const sx of [0, W - 90]) { ctx.save(); ctx.globalAlpha = f; ctx.fillStyle = '#141414'; ctx.fillRect(sx, 0, 90, H); ctx.fillStyle = '#f2f2e8'; for (let y = -200 + (sh % 160); y < H; y += 160) ctx.fillRect(sx + 25, y, 40, 70); ctx.restore(); }
      const op = k < 0.35 ? (1 - k / 0.35) * 0.6 : 0; push(540, 960, 1.2 * f + 0.01); rect(-260, -60, 520, 220, { wash: '#1a1a1a', washA: 1, w: 3, col: '#000' }); txt('SCENE 1 · TAKE 1', 0, 60, 40, { font: 'Osw', col: '#f2f2e8' }); push(-260, -60, 1, -op); rect(0, -70, 520, 70, { wash: '#f2f2e8', washA: 1, w: 3, col: '#000' }); for (let q = 0; q < 6; q++) poly([[q * 90, -70], [q * 90 + 45, -70], [q * 90 + 80, 0], [q * 90 + 35, 0]], { wash: '#1a1a1a', washA: 1, w: 0, col: '#000' }); pop(); pop(); });
  } };
})();
