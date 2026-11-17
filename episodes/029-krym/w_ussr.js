/* 029 — сцена `ussr`: 1954 → 1991, две комнаты, между ними — резкий проброс камеры.
   1954: кабинет — зелёное сукно, лампы, стенографистка, чиновники, за окном зимняя Москва; на стене две доски-карты «РСФСР» и «УССР».
   Том (костюм) снимает с левой доски кусок-пазл «КРЫМ» и несёт к правой; на «Украине» кусок встаёт на место, падает «УКАЗ 19.02.1954».
   1991 (с «девяносто»): избирательный участок в Симферополе — урна, кабинки со шторками, очередь, плакат «РЕФЕРЕНДУМ 1.12.1991»,
   за окном троллейбус «Симферополь — Ялта». Том опускает бюллетень «ЗА», табло: «КРЫМ: 54,19 % ЗА · СЕВАСТОПОЛЬ: 57,07 %».
   Главный свет: 1954 — тёплая настольная лампа, 1991 — холодный дневной из окон. Переход В: строчки печатной машинки. */
(() => {
  EV.us_54 = wtk('s7', 'пятьдесят');
  EV.us_give = wtk('s7', 'Украине.');
  EV.us_91 = wtk('s7', 'девяносто') - 0.1;
  EV.us_vote = wtk('s7', 'проголосовал.');
  KEYW.push('Украине.', 'проголосовал.');
  const L = KR.ink, B91 = t => t >= EV.us_91;
  function view(t) {
    if (!B91(t)) { vgrad(-600, 1400, ['#5a6a80', '#a8b4c0', '#d8dce0'], 1); for (let i = 0; i < 6; i++) rect(-200 + i * 260, 900 - (i % 3) * 80, 200, 600, { wash: '#8a7a78', washA: 1, w: 1.6, col: L }); for (let i = 0; i < 40; i++) { const r = rng(5600 + i); ell(r() * 1400 - 200, ((r() * 1200 + t * 60) % 1200) + 400, 4, 4, { wash: '#ffffff', washA: 0.8, line: false }); } return; }
    vgrad(-600, 1400, ['#7aa8d0', '#c8dceb', '#eef0e8'], 1); ridgeKR(1100, 220, '#8a9ab0', 5601); rect(-400, 1180, 2000, 300, { wash: '#8a8a8a', washA: 1, line: false });
    const bx = 300 + ((t - EV.us_91) * 120) % 900; push(bx, 1260, 0.8); rect(-260, -200, 520, 170, { wash: '#2a7ab8', washA: 1, w: 2, col: L }); rect(-260, -110, 520, 30, { wash: '#f0e8d8', washA: 1, line: false }); for (let k = 0; k < 6; k++) rect(-230 + k * 80, -180, 60, 50, { wash: '#c8e0f0', washA: 1, w: 1.2, col: L });
    pencil([[-100, -200], [-60, -320]], { w: 3, col: '#2a2a30', pass2: false }); pencil([[-60, -200], [-20, -320]], { w: 3, col: '#2a2a30', pass2: false }); for (const k of [-180, 180]) ell(k, -20, 30, 30, { wash: '#1a1a1e', washA: 1, w: 1.6, col: L }); txt('СИМФЕРОПОЛЬ — ЯЛТА', 0, -94, 22, { col: '#1a3a6a', font: 'Osw' }); pop();
    for (const x of [-150, 1200]) cypress(x, 1200, 260, t, x);
  }
  function walls(t) {                                                // стены с окнами; 1954 — доски-карты, 1991 — плакат и табло
    const c = B91(t) ? '#d8dcc8' : '#c8b088', WX = [-200, 900];
    rect(-700, -300, 2500, 760, { wash: c, washA: 1, w: 2, col: L }); rect(-700, 1180, 2500, 600, { wash: c, washA: 1, w: 2, col: L });
    for (let i = 0; i <= WX.length; i++) { const x0 = i ? WX[i - 1] + 300 : -700, x1 = i < WX.length ? WX[i] : 1800; rect(x0, 460, x1 - x0, 720, { wash: c, washA: 1, w: 2, col: L, shade: { gap: 10, a: 0.08, col: '#6a5a3a', ang: 1.4 } }); }
    WX.forEach(x => { rect(x, 460, 300, 720, { line: true, w: 8, col: '#5a4a3a' }); pencil([[x + 150, 460], [x + 150, 1180]], { w: 5, col: '#5a4a3a', pass2: false }); pencil([[x, 820], [x + 300, 820]], { w: 5, col: '#5a4a3a', pass2: false }); });
    if (!B91(t)) {
      for (const [x, nm, col] of [[260, 'РСФСР', '#c86a5a'], [620, 'УССР', '#5a8ac8']]) { rect(x - 150, 560, 300, 330, { wash: '#f0e2c0', washA: 1, w: 3, col: '#5a3a1a' }); txt(nm, x, 600, 34, { col: L, font: 'Osw' }); blob([[x - 120, 880], [x - 130, 680], [x - 40, 640], [x + 80, 650], [x + 130, 700], [x + 120, 880]], { wash: col, washA: 0.6, w: 2, col: L }); }
      const k = 1 - clamp((t - EV.us_54) / 0.3); if (k > 0) crimeaMap(260, 820, 110 * k + 0.01, { w: 2, shade: false, land: '#e8b84a' });
      if (t > EV.us_give - 0.05) crimeaMap(620, 830, 110 * popK(t, EV.us_give - 0.05, 0.3), { w: 2, shade: false, land: '#e8b84a' });
      push(440, 400, 1); pencil([[-200, 0], [200, 0]], { w: 4, col: '#5a3a1a', pass2: false }); for (const k2 of [-160, 160]) { pencil([[k2, 0], [k2, 80]], { w: 3, col: '#2a2a2a', pass2: false }); ell(k2, 96, 30, 18, { wash: '#f0e8c8', washA: 1, w: 1.6, col: L }); glow(k2, 100, 50, 'rgba(255,230,170,1)', 0.3); } pop();
    } else {
      rect(140, 680, 600, 100, { wash: '#2a5aa8', washA: 1, w: 2.4, col: L }); txt('РЕФЕРЕНДУМ · 1 ДЕКАБРЯ 1991', 440, 730, 38, { col: '#ffe08a', font: 'Osw' });
      rect(180, 800, 520, 280, { wash: '#14181e', washA: 1, w: 3, col: '#8a8a8a' });
      if (t > EV.us_vote - 0.05) { const k = popK(t, EV.us_vote - 0.05, 0.3); push(440, 950, k); txt('КРЫМ: 54,19 % ЗА', 0, -60, 46, { col: '#7aff9a', font: 'Osw' }); txt('СЕВАСТОПОЛЬ: 57,07 %', 0, 6, 36, { col: '#c8f0d0', font: 'Osw' }); txt('ЗА НЕЗАВИСИМОСТЬ УКРАИНЫ', 0, 66, 28, { col: '#ffe08a', font: 'Osw' }); pop(); }
      else { txt('ИДЁТ ГОЛОСОВАНИЕ', 440, 940, 40, { col: '#7aa8d0', font: 'Osw', a: 0.5 + 0.5 * Math.sin(t * 6) }); }
    }
  }
  function people(t) {
    if (!B91(t)) { const P = [[60, '#3a3a40', 'hold', 'calm'], [880, '#2a2a30', 'point', 'calm'], [1000, '#4a3a2a', 'hold', 'smile'], [1130, '#6a6a5a', 'hold', 'calm']];
      P.forEach(([x, c, a, f], i) => human(x, 1420, 0.68, t, { body: c, legs: '#2a2a30', hat: i === 3 ? 'bun' : undefined, hair: i === 3 ? '#6a4a2a' : '#5a5a5a', long: i === 3 ? 1 : undefined, armR: a, prop: i === 2 ? 'scroll' : undefined, flip: x > 600 ? -1 : 1, seed: 5610 + i, face: f })); return; }
    const P = [[-40, '#8a3a3a', 'scarf'], [60, '#3a5a8a', 'cap'], [150, '#6a6a3a', null], [880, '#5a3a5a', 'scarf'], [980, '#2a6a5a', 'cap'], [1080, '#8a6a3a', 'fur'], [1180, '#3a3a4a', null]];
    P.forEach(([x, c, h], i) => human(x, 1420, 0.66, t, { body: c, hat: h, hatCol: h === 'scarf' ? '#d8c8a0' : '#2a2a30', legs: '#2a2a36', armR: i % 3 ? 'hold' : 'down', prop: i === 4 ? 'scroll' : undefined, flip: x > 600 ? -1 : 1, seed: 5620 + i, face: 'smile' }));
    for (const x of [620, 760]) { rect(x - 60, 1080, 120, 340, { wash: '#8a8a7a', washA: 1, w: 2, col: L }); shape([[x - 60, 1080], [x + 60, 1080], [x + 50 + Math.sin(t * 2 + x) * 6, 1380], [x - 50, 1380]], { wash: '#c84a3a', washA: 1, w: 1.6, col: L, shade: { gap: 6, a: 0.3, col: '#6a1a10', ang: 1.57 } }); }
  }
  function floor(t) {
    rect(-500, 1430, 2200, 900, { wash: B91(t) ? '#8a8478' : '#7a4a2a', washA: 1, w: 2, col: L }); for (let i = 0; i < 24; i++) pencil([[-480 + i * 90, 1430], [-520 + i * 96, 1950]], { w: 1.4, col: '#3a2a1a', a: 0.4, pass2: false });
    if (!B91(t)) { lightPool(760, 1640, 600, 160, 'rgba(255,220,150,1)', 0.45);
      push(800, 1620, 1); rect(-300, -90, 600, 60, { wash: '#2a6a3a', washA: 1, w: 2.4, col: L }); rect(-300, -30, 600, 30, { wash: '#4a2a14', washA: 1, w: 2, col: L }); for (const k of [-270, 270]) rect(k - 14, 0, 28, 160, { wash: '#4a2a14', washA: 1, w: 2, col: L });
      push(-200, -90, 1); pencil([[0, 0], [0, -120]], { w: 5, col: '#2a2a2a', pass2: false }); blob([[-50, -110], [-40, -150], [40, -150], [50, -110]], { wash: '#2a6a3a', washA: 1, w: 2, col: L }); glow(0, -100, 80, 'rgba(255,220,150,1)', 0.4); pop();
      for (let q = 0; q < 3; q++) rect(-60 + q * 70, -120, 60, 30, { wash: '#f0e8d8', washA: 1, w: 1.2, col: L }); ell(150, -110, 22, 14, { wash: '#1a1a1e', washA: 1, w: 1.4, col: L }); pencil([[150, -110], [190, -150]], { w: 3, col: '#2a2a2a', pass2: false });
      push(80, -200, 1); rect(-60, -50, 120, 60, { wash: '#2a2a30', washA: 1, w: 2, col: L }); for (let q = 0; q < 8; q++) rect(-50 + (q % 4) * 26, -40 + Math.floor(q / 4) * 22, 20, 16, { wash: '#e8e8e0', washA: 1, w: 1, col: L }); pop();
      if (t > EV.us_give) { const k = popK(t, EV.us_give + 0.1, 0.3); push(40, -160, k, -0.05); rect(-130, -80, 260, 160, { wash: KR.paper, washA: 1, w: 2, col: L }); txt('УКАЗ', 0, -44, 32, { col: L, font: 'Osw' }); txt('19.02.1954', 0, -6, 26, { col: L, font: 'Osw' }); txt('Крымская обл. → УССР', 0, 28, 20, { col: L, font: 'Osw' }); pop(); } pop();
    } else { lightPool(500, 1640, 900, 180, 'rgba(220,235,255,1)', 0.35);
      push(560, 1640, 1); rect(-90, -200, 180, 200, { wash: '#c8a868', washA: 1, w: 2.4, col: L }); rect(-50, -206, 100, 12, { wash: '#2a2a30', washA: 1, line: false }); rect(-60, -140, 120, 70, { wash: '#2a5aa8', washA: 1, w: 1.4, col: L }); txt('УРНА', 0, -104, 30, { col: '#ffe08a', font: 'Osw' });
      if (t > EV.us_vote - 0.4 && t < EV.us_vote + 0.2) { const k = clamp((t - EV.us_vote + 0.4) / 0.6); push(-30 + k * 30, -260 + k * 60, 1, 0.2 - k * 0.2); rect(-40, -30, 80, 60, { wash: '#f4f0e8', washA: 1, w: 1.4, col: L }); txt('ЗА', 0, 0, 26, { col: '#1a6a3a', font: 'Osw' }); pop(); } pop();
      for (let q = 0; q < 4; q++) { push(1040 + q * 30, 1760, 1, 0.3 * q); rect(-40, -30, 80, 60, { wash: '#f4f0e8', washA: 1, w: 1.2, col: L }); pop(); }
      push(-60, 1720, 1); rect(-100, -60, 200, 60, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (let q = 0; q < 4; q++) rect(-80 + q * 42, -100, 36, 40, { wash: '#f0e8d8', washA: 1, w: 1, col: L }); pop();
      push(880, 1820, 1); rect(-50, -80, 100, 80, { wash: '#a8502a', washA: 1, w: 2, col: L }); for (let q = 0; q < 7; q++) { const a = -2.6 + q * 0.35; blob([[0, -80], [Math.cos(a) * 90, -80 + Math.sin(a) * 160], [Math.cos(a + 0.15) * 70, -80 + Math.sin(a + 0.15) * 120]], { wash: '#3a7a3a', washA: 1, w: 1.4, col: L }); } pop();
      push(220, 1860, 1); rect(-160, -70, 320, 22, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (const k of [-140, 140]) pencil([[k, -48], [k, 0]], { w: 6, col: '#3a2a1a', pass2: false }); ell(-60, -84, 40, 16, { wash: '#3a5a8a', washA: 1, w: 1.4, col: L }); pop(); }
    castShadow(330, 1612, 120, 480, B91(t) ? 0.5 : -0.5, 0.35); moodDark(B91(t) ? 1000 : 800, 900, 900, 1800, '#140e0a', 0.3);
  }
  function front(t) { for (const x of [-160, 1240]) sil([[x - 80, 2300], [x - 70, 1380], [x + 70, 1380], [x + 80, 2300]], B91(t) ? '#1a2028' : '#2a1408', 1); }
  WORLD.ussr = (t, u, cat) => {
    lay(14, () => view(t)); lay(6, () => walls(t)); lay(2.6, () => people(t)); lay(1, () => { floor(t); cat(); }); lay(0.6, () => front(t));
    lay(1.8, () => motes(16, [-100, 700, 1200, 1500], B91(t) ? '#e8f0ff' : '#ffe8c0', t, 5630, { sp: 2, sz: 2.2, a: 0.35, wob: 16, add: 1 }));
    const w = 1 - Math.abs(t - EV.us_91) / 0.16; if (w > 0) scr(() => { const r = rng(hsh(FRAME, 5640)); for (let i = 0; i < 60; i++) { const y = r() * H; pencil([[-100, y], [1200, y + (r() - 0.5) * 30]], { w: 6 + r() * 30, col: i % 3 ? '#f4f0e8' : '#c8d8e8', a: 0.85 * w, pass2: false, gap: false }); } });
  };
  DIR.ussr = {
    outfit: 'suitK', light: { side: 1, rim: '#ffe0a8' }, grade: ['#2a2a1a', 0.06],
    act: () => [[S0.ussr, 'talk'], [EV.us_54, 'smug'], [EV.us_give, 'proud'], [EV.us_91, 'grin'], [EV.us_vote, 'proud']],
    pose: (t, u, b) => { if (B91(t)) { const w = clamp((t - EV.us_91) / 0.8); return Object.assign(b, { x: lerp(250, 420, sm(w)), y: 1612, s: 0.92, walk: w < 1 ? t * 9 : 0, look: [0.8, -0.4], hand: t > EV.us_vote - 0.4 ? [190, -360] : [150, -300] }); }
      const w = clamp((t - EV.us_54) / (EV.us_give - EV.us_54)); return Object.assign(b, { x: lerp(200, 470, sm(w)), y: 1612, s: 0.92, walk: w > 0 && w < 1 ? t * 9 : 0, look: [0.6, -0.8], hand: t > EV.us_54 && t < EV.us_give + 0.1 ? [170, -500] : [150, -300] }); },
    afterCat: (t, u, P) => { if (!B91(t) && t > EV.us_54 && t < EV.us_give) { const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; crimeaMap(x + 90, y - 60, 100, { w: 2, shade: false, land: '#e8b84a' }); } },
    hud: t => { if (t >= EV.us_91) { push(540, 372, 0.9 + 0.1 * popK(t, EV.us_91, 0.3)); ctx.save(); ctx.fillStyle = 'rgba(18,12,10,0.95)'; ctx.fillRect(-300, -88, 600, 170); ctx.restore(); txt('1991', 0, -18, 104, { col: '#f6e7c8', font: 'Osw' }); txt('РЕФЕРЕНДУМ · НЕЗАВИСИМОСТЬ', 0, 54, 34, { col: K.amber, font: 'Osw' }); pop(); } },
    cam: () => [[S0.ussr, 460, 1000, -0.06], [EV.us_54, 400, 980, 0.0], [EV.us_give - 0.1, 520, 940, 0.06], [EV.us_give + 0.25, 560, 980, 0.12, 'x'], [EV.us_91 - 0.01, 600, 1000, 0.08], [EV.us_91 + 0.01, 420, 1000, 0.02], [EV.us_vote - 0.1, 480, 1040, 0.08], [EV.us_vote + 0.25, 460, 1000, 0.14, 'x'], [S1.ussr, 460, 1000, 0.16]]
  };
  TRANS_IN.ussr = { a: 0.08, b: 0.42, fx(k, t, A, B) {              // печатная машинка: новый кадр «пропечатывается» строками
    const e = sm(k), n = 12, rows = Math.floor(e * (n + 1)); drawBuf(A);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); for (let i = 0; i < rows; i++) ctx.rect(0, i * H / n, W, H / n + 1);
    const part = e * (n + 1) - rows; if (rows < n) ctx.rect(0, rows * H / n, W * part, H / n + 1); ctx.clip(); ctx.drawImage(B, 0, 0); ctx.restore();
    if (rows < n) scr(() => { const y = rows * H / n; rect(W * part - 20, y, 40, H / n, { wash: '#1a1a1e', washA: 0.9, line: false }); }); } };
})();
