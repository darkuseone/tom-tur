/* 010 — сцена `stone`: 1714, застава у въезда в Петербург. Слева — «вся Россия»: деревянный городок, каменщики бросают кладку под красной
   печатью указа; справа — шлагбаум, очередь телег, у каждой мешок камней, писарь ставит палочки, растёт куча; вдали — первые каменные дома
   и леса стройки. Том в рубахе тащит камень. На «запретили» — свиток указа со штампом, на «кроме» — золотая звезда «ПЕТЕРБУРГЪ»,
   на «налогом!» камень с грохотом в кучу. Переход В сцену — колесо телеги прокатывается через кадр. */
(() => {
  EV.st_ban = wtk('s3', 'запретили');
  EV.st_except = wtk('s3', 'кроме');
  EV.st_tax = wtk('s3', 'налогом!');
  KEYW.push('Петербурга.', 'налогом!');
  SHAKES.push([EV.st_tax + 0.1, 0.25, 7]);

  function sky(t) { vgrad(-900, 1000, ['#8aa6c0', '#c8d6e0', '#eee6d8'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 450 + t * 16) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 50, 120 + i * 80 + Math.sin(k) * 10, 66, 26, { wash: '#f8f6f0', washA: 0.85, line: false }); } }
  function izba(x, base, w, h, s) { push(x, base, s); const r = rect(-w / 2, -h, w, h, { wash: '#8a6a44', washA: 1, w: 2, col: '#2a1a08' }); for (let y = -h + 14; y < 0; y += 18) pencil([[-w / 2, y], [w / 2, y]], { w: 2, col: '#4a3218', a: 0.7, pass2: false });
    poly([[-w / 2 - 14, -h], [w / 2 + 14, -h], [0, -h - h * 0.7]], { wash: '#6a5a3a', washA: 1, w: 2, col: '#2a1a08' }); rect(-14, -h * 0.7, 28, 26, { wash: '#f2d48a', washA: 1, w: 1.4, col: '#2a1a08' }); pop(); }
  function far(t) {
    sil([[-400, 830], [1480, 820], [1480, 900], [-400, 900]], '#7a8a6a', 0.9);
    for (const [x, s] of [[-180, 0.7], [-40, 0.6], [80, 0.75], [200, 0.55]]) izba(x, 880, 120, 90, s);
    // каменщики бросают кладку: недостроенная каменная стенка под печатью
    const ws = rect(260, 780, 140, 100, { wash: '#c8c0b0', washA: 1, w: 2, col: '#3a3630' }); for (let y = 790; y < 880; y += 20) pencil([[260, y], [400, y]], { w: 1.4, col: '#6a6458', pass2: false });
    if (t > EV.st_ban) { const k = popK(t, EV.st_ban, 0.3); push(330, 820, k, -0.2); ell(0, 0, 70, 70, { wash: '#c8201e', washA: 0.8, w: 4, col: '#7a0a0a' }); txt('НЕЛЬЗЯ', 0, 4, 30, { font: 'Osw', col: '#fff2e8' }); pop(); }
    // каменный Петербург вдали справа: Меншиковский дворец, леса, шпиль
    facade(760, 880, 260, 170, '#e8c878', t, { key: 9800 }); poly([[750, 710], [1030, 710], [890, 660]], { wash: '#5a7a5a', washA: 1, w: 2, col: '#1a2a1a' });
    for (const x of [1060, 1110, 1160]) pencil([[x, 880], [x, 640]], { w: 4, col: '#8a6a3a', pass2: false }); for (const y of [700, 770, 840]) pencil([[1050, y], [1170, y]], { w: 4, col: '#8a6a3a', pass2: false });
    spire(1300, 880, 0.3, t);
  }
  function gate(t) {                                                   // застава: шлагбаум, будка, писарь, куча камней
    const pole = rect(560, 1040, 30, 260, { wash: '#f2ece0', washA: 1, w: 2, col: '#1a1a1a' }); ctx.save(); ctx.clip(pole.path); for (let y = 1040; y < 1300; y += 36) { ctx.fillStyle = '#1a1a1a'; ctx.fillRect(560, y, 30, 18); } ctx.restore();
    const ang = t > EV.st_tax ? -0.9 : -0.05; push(575, 1070, 1, ang); const bar = rect(0, -10, 460, 20, { wash: '#f2ece0', washA: 1, w: 2, col: '#1a1a1a' }); ctx.save(); ctx.clip(bar.path); for (let x = 0; x < 460; x += 50) { ctx.fillStyle = '#1a1a1a'; ctx.fillRect(x, -10, 25, 20); } ctx.restore(); pop();
    rect(380, 1000, 140, 300, { wash: '#e8e0cc', washA: 1, w: 2, col: '#2a2420' }); for (let k = 0; k < 6; k++) { ctx.save(); ctx.fillStyle = k % 2 ? '#1a1a1a' : '#f2ece0'; ctx.fillRect(380, 1000 + k * 50, 140, 50); ctx.restore(); } poly([[370, 1000], [530, 1000], [450, 940]], { wash: '#6a4a2a', washA: 1, w: 2, col: '#2a1a08' });
    // писарь с книгой
    human(700, 1310, 0.72, t, { body: '#2a5a3a', legs: '#2a2a2e', hair: '#2a1a10', face: 'calm', armR: 'hold', armL: 'hold', seed: 500, flip: -1 }); rect(620, 1200, 110, 22, { wash: '#6a4a2a', washA: 1, w: 1.6, col: '#2a1a08' });
    rect(630, 1170, 80, 32, { wash: '#f2e6c4', washA: 1, w: 1.4, col: '#4a3a1a' }); const n = Math.max(0, Math.floor((t - S0.stone) * 4)); for (let q = 0; q < Math.min(14, n); q++) pencil([[640 + q * 5, 1176], [640 + q * 5, 1196]], { w: 1.6, col: '#1a1410', pass2: false });
    // куча камней растёт
    const pile = 1 + Math.min(20, Math.floor((t - S0.stone) * 5)); const r = rng(9810); for (let q = 0; q < pile; q++) { const a = r() * Math.PI, d = r() * (40 + pile * 3); ell(880 + Math.cos(a) * d, 1300 - Math.sin(a) * d * 0.4 - q * 1.5, 22 + r() * 14, 16 + r() * 10, { wash: ['#9a948a', '#b8b2a6', '#8a8478'][q % 3], washA: 1, w: 1.6, col: '#3a362e' }); }
  }
  function carts(t) {                                                  // очередь телег с камнями
    for (let k = 0; k < 3; k++) { const x = 1000 + k * 300 - ((t - S0.stone) * 40) % 60; push(x, 1340, 0.7); const hb = blob([[-120, -60], [-110, -130], [40, -136], [90, -96], [90, -60]], { wash: '#7a5a3a', washA: 1, w: 2, col: '#1a0a04' });
      for (const lx of [-90, -60, 50, 70]) pencil([[lx, -60], [lx + Math.sin(t * 5 + lx + k) * 6, 0]], { w: 10, col: '#6a4a2a' }); ell(110, -110, 30, 24, { wash: '#7a5a3a', washA: 1, w: 2, col: '#1a0a04' });
      rect(140, -110, 220, 50, { wash: '#8a6a3a', washA: 1, w: 2, col: '#2a1a08' }); for (const wx of [170, 330]) { ell(wx, -40, 40, 40, { wash: '#6a4a24', washA: 1, w: 2.4, col: '#2a1a08' }); for (let q = 0; q < 6; q++) { const a = q / 6 * 6.283 + t * 2; pencil([[wx, -40], [wx + Math.cos(a) * 36, -40 + Math.sin(a) * 36]], { w: 3, col: '#3a2412', pass2: false }); } }
      for (let q = 0; q < 3; q++) ell(190 + q * 50, -126, 24, 18, { wash: '#a8a294', washA: 1, w: 1.6, col: '#3a362e' }); pop();
      human(x - 100, 1340, 0.6, t, { body: '#e8e0cc', legs: '#c6bda6', hair: '#6a4a2a', beard: 'long', hat: 'fur', hatCol: '#5a4a3a', face: 'calm', armR: 'hold', seed: 510 + k, flip: -1 }); }
  }

  WORLD.stone = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(8, () => far(t));
    lay(2.6, () => { gate(t); carts(t); });
    lay(1, () => { const g = shape([[-400, 1420], [1480, 1430], [1480, 2400], [-400, 2400]], { wash: '#9a8a6a', washA: 1, w: 2, col: '#2a2010', a: 0.4 }); hatch(g.path, g.bb, { gap: 10, a: 0.12, col: '#3a3020', ang: 0.15, w: 1.2 });
      for (let k = 0; k < 2; k++) pencil([[-400, 1560 + k * 120], [1480, 1540 + k * 130]], { w: 6, col: '#7a6a4a', a: 0.6, pass2: false });
      // мужик тащит камень на спине, бабы с корзиной — передний план справа
      human(1010, 1500, 0.95, t, { body: '#c8b896', legs: '#6a5a44', hair: '#5a3a1a', beard: 'long', hat: 'fur', hatCol: '#4a3a2a', face: t > EV.st_tax ? 'grin' : 'angry', armR: 'up', armL: 'up', seed: 530, flip: -1 });
      const sb = blob([[930, 1110], [960, 1060], [1060, 1056], [1090, 1110], [1010, 1130]], { wash: '#a8a294', washA: 1, w: 2.4, col: '#3a362e' }); hatch(sb.path, sb.bb, { gap: 6, a: 0.25, col: '#4a463e', ang: 0.6, w: 1 });
      const r2 = rng(9830); for (let i = 0; i < 9; i++) ell(-200 + r2() * 1500, 1520 + r2() * 300, 16 + r2() * 16, 10 + r2() * 8, { wash: '#a8a294', washA: 1, w: 1.4, col: '#3a362e' });
      cat(); });
    lay(0.7, () => { for (let i = 0; i < 3; i++) { const ph = (t * 0.4 + i / 3) % 1; ell(1200 - ph * 300, 1950 - ph * 120, 160, 50, { wash: '#c8b890', washA: 0.35 * (1 - ph), line: false }); } });
  };
  DIR.stone = {
    outfit: 'rubakha', light: { side: 1, rim: '#fff0d8' }, grade: ['#c0a070', 0.08],
    act: () => [[S0.stone, 'talk'], [EV.st_ban, 'annoyed'], [EV.st_except, 'smug'], [EV.st_tax - 0.03, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 340, y: 1470, s: 1.04, look: t < EV.st_except ? [-0.5, -0.2] : [0.6, -0.1], hand: [120, -250], handF: [-110, -250], walk: t > EV.st_tax - 0.6 && t < EV.st_tax ? t * 10 : undefined }),
    afterCat: (t, u, P) => { if (t < EV.st_tax) { const x = P.x + 0, y = P.y - 270 * P.s; const st = blob([[x - 70, y + 20], [x - 60, y - 40], [x, y - 60], [x + 66, y - 36], [x + 74, y + 24], [x, y + 40]], { wash: '#a8a294', washA: 1, w: 2.4, col: '#3a362e' }); hatch(st.path, st.bb, { gap: 6, a: 0.2, col: '#4a463e', ang: 0.5, w: 1 }); } },
    cam: () => [[S0.stone, 600, 900, 0.1], [EV.st_ban, 520, 920, 0.06], [EV.st_except, 620, 940, 0.06], [EV.st_tax, 600, 980, 0.1], [S1.stone, 600, 980, 0.12]],
    hud: t => { if (t > EV.st_ban && t < EV.st_tax + 0.3) { const k = popK(t, EV.st_ban, 0.35); push(540, 560, 0.7 + 0.3 * k, -0.02); const sc = rect(-300, -90, 600, 180, { wash: '#f2e6c4', washA: 0.97, w: 3, col: '#5a3a1a' }); txt('УКАЗЪ 1714', 0, -50, 40, { font: 'Osw', col: '#5a1a10' }); txt('каменное строение — ВЕЗДЕ ЗАПРЕЩЕНО', 0, 4, 34, { col: '#2a1a10' });
        if (t > EV.st_except) { const k2 = popK(t, EV.st_except, 0.35); txt('кромѣ ПЕТЕРБУРГА', 0, 56, 44 * k2, { font: 'Osw', col: '#b8801a' }); } pop(); }
      if (t > EV.st_tax) note('телега — 3 камня, судно — до 30', 560, 1720, t, EV.st_tax, S1.stone, '#3a2a1a', 42, -0.02); }
  };

  // ---------------------------------------------------------------- переход В stone: колесо телеги прокатывается через кадр
  TRANS_IN.stone = { a: 0.3, b: 0.35, fx(k, t, A, B) {
    const x = lerp(-700, W + 700, sm(k)); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); drawBuf(A); ctx.beginPath(); ctx.rect(0, 0, Math.max(0, x), H); ctx.clip(); drawBuf(B); ctx.restore();
    scr(() => { const R = 640, a = k * 12; ell(x, 960, R, R, { wash: '#6a4a24', washA: 1, w: 6, col: '#2a1a08' }); ell(x, 960, R - 70, R - 70, { wash: '#8a6a3a', washA: 1, w: 4, col: '#2a1a08' });
      for (let q = 0; q < 10; q++) { const an = a + q / 10 * 6.283; pencil([[x, 960], [x + Math.cos(an) * (R - 70), 960 + Math.sin(an) * (R - 70)]], { w: 28, col: '#5a3a1a' }); } ell(x, 960, 90, 90, { wash: '#4a3018', washA: 1, w: 4, col: '#1a0a04' }); });
  } };
})();
