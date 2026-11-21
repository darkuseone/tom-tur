/* 032 — сцена `border` (s4, 1924). Кабинет в Москве: большой стол с картой, зелёная лампа (главный свет — тёплый круг на столе),
   холодный свет из окна (заснеженные крыши, купола), чиновники в кожанках и френчах (без значков), машинистка, телефон, папки,
   самовар, стопки бумаг, сейф. Том-комиссар ведёт огромным красным карандашом линию по карте.
   На «Украине» — КАРТА: УССР, Донецкая и Луганская области в УССР; на «Шахты» — Шахтинский и Таганрогский округа отходят РСФСР
   (стрелка), подписи. Переход — красная линия карандаша разрезает кадр. */
(() => {
  EV.bd_moscow = wtk('s4', 'Москва:');
  EV.bd_ua = wtk('s4', 'Украине,') - 0.1;
  EV.bd_ru = wtk('s4', 'Шахты') - 0.05;
  KEYW.push('Москва:', 'Украине,', 'России.');
  const L = DB.ink, LAMP = [620, 1060];
  function wall(t) { vgrad(-900, 1300, ['#4a5a4a', '#6a7a64', '#7a846c'], 1); for (let x = -400; x < 1600; x += 80) pencil([[x, -900], [x, 1300]], { w: 2, col: '#3a4a3a', a: 0.3, pass2: false });
    push(860, 720, 1); rect(-230, -330, 460, 560, { wash: '#c8d8e8', washA: 1, w: 4, col: '#3a2a1a' }); vgrad(390, 950, ['#a8b8d0', '#d8e0ec'], 1);
      for (let i = 0; i < 4; i++) { const x = -200 + i * 110; rect(x, 60 - (i % 2) * 40, 100, 170 + (i % 2) * 40, { wash: '#8a7a74', washA: 1, w: 1.4, col: L }); poly([[x - 6, 60 - (i % 2) * 40], [x + 50, 20 - (i % 2) * 40], [x + 106, 60 - (i % 2) * 40]], { wash: '#f4f4f8', washA: 1, w: 1.4, col: L }); }
      for (const [x, s] of [[-60, 1], [120, 0.8]]) { push(x, 0, s); rect(-30, -60, 60, 120, { wash: '#e8dcc8', washA: 1, w: 1.4, col: L }); ell(0, -80, 40, 46, { wash: '#d8a838', washA: 1, w: 1.6, col: L }); pencil([[0, -126], [0, -160]], { w: 3, col: L, pass2: false }); pop(); }
      const r = rng(8800); for (let i = 0; i < 30; i++) { const y = ((r() * 560 + t * 60) % 560) - 330; ell(-220 + r() * 440, y, 3, 3, { wash: '#ffffff', washA: 0.9, line: false }); }
      pencil([[0, -330], [0, 230]], { w: 6, col: '#3a2a1a', pass2: false }); pencil([[-230, -60], [230, -60]], { w: 6, col: '#3a2a1a', pass2: false }); pop();
    rays(860, 600, 2.4, 0.4, 1200, 'rgba(220,235,255,1)', 0.1, 6, t);
    push(140, 760, 1); rect(-140, -200, 280, 360, { wash: '#e8dcc0', washA: 1, w: 3, col: '#3a2a1a' }); const P = [[-100, -150], [-40, -170], [60, -140], [110, -60], [90, 40], [20, 120], [-80, 100], [-120, 0]]; GLOBE.fill(P, '#d8b878'); pencil(P.concat([P[0]]), { w: 2, col: L, pass2: false }); txt('ГУБЕРНИИ · 1923', 0, 150, 22, { col: L, font: 'Osw' }); pop();
  }
  function room(t) {                                                // шкафы с папками, сейф, чиновники, машинистка, телефон
    push(-150, 1300, 1); rect(-150, -520, 300, 520, { wash: '#6a4428', washA: 1, w: 2.4, col: L }); for (let r = 0; r < 4; r++) for (let q = 0; q < 6; q++) rect(-130 + q * 44, -500 + r * 125, 36, 100, { wash: ['#c8a868', '#8a5a3a', '#e8dcc0', '#5a6a8a'][(q + r) % 4], washA: 1, w: 1.2, col: L }); pop();
    push(1180, 1300, 1); rect(-120, -260, 240, 260, { wash: '#3a4048', washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.2, col: '#1a1e22', ang: 1.4 } }); ell(0, -140, 36, 36, { wash: '#8a8a92', washA: 1, w: 2, col: L }); pop();
    const P = [[60, '#2a2220', 'cap', 'hold'], [480, '#4a4a3a', null, 'point'], [820, '#3a3a30', 'cap', 'hold'], [1000, '#2a2220', null, 'swing']];
    P.forEach(([x, c, h, a], i) => human(x, 1320, 0.7, t, { body: c, hat: h, hatCol: '#2a2220', legs: '#2a2a30', armR: a, prop: i === 2 ? 'scroll' : undefined, flip: x > 600 ? -1 : 1, seed: 8810 + i, face: t > EV.bd_moscow ? 'grin' : 'calm', beard: i === 3 ? 1 : undefined }));
    push(1000, 1330, 0.7); rect(-120, -140, 240, 20, { wash: '#6a4428', washA: 1, w: 2, col: L }); rect(-70, -200, 140, 60, { wash: '#2a2a30', washA: 1, w: 2, col: L }); for (let q = 0; q < 8; q++) ell(-56 + q * 16, -150, 5, 5, { wash: '#e8e0d0', washA: 1, line: false }); rect(-40, -260, 80, 60, { wash: '#f4f0e6', washA: 1, w: 1.4, col: L }); pop();
    human(1080, 1320, 0.7, t, { body: '#5a3a5a', hat: 'bun', hatCol: '#3a2a1a', legs: '#2a2a30', long: 1, armR: 'hold', seed: 8820, face: 'calm', flip: -1 });
  }
  function desk(t) {                                                // стол с картой, лампа, телефон, самовар, стаканы, папки
    rect(-500, 1300, 2200, 1000, { wash: '#5a3a24', washA: 1, w: 2, col: L, shade: { gap: 10, a: 0.18, col: '#2a1408', ang: 0.15 } }); for (let x = -500; x < 1700; x += 120) pencil([[x, 1300], [x - 40, 2300]], { w: 1.4, col: '#2a1408', a: 0.5, pass2: false });
    push(620, 1620, 1); rect(-420, -60, 840, 60, { wash: '#6a4428', washA: 1, w: 2.4, col: L }); rect(-400, -220, 800, 170, { wash: '#efe4c4', washA: 1, w: 2, col: L, rot: 0 });
      const P = ([lo, la]) => [(lo - 38.5) * 130, -(la - 48.2) * 130 * 0.5 - 135]; GLOBE.fill(UA.map(P).filter(([x]) => x > -400), '#e8c870'); GLOBE.fill(DON_OBL.map(P), '#f0a040'); GLOBE.fill(LUG_OBL.map(P), '#f0a040');
      const pk = clamp((t - S0.border - 0.4) / 1.6); const line = [[-380, -200], [-200, -160], [0, -150], [120, -130], [200, -100], [260, -70]]; const n = Math.max(2, Math.ceil(pk * line.length)); pencil(line.slice(0, n), { w: 6, col: DB.red, pass2: false });
      for (const k of [-380, 380]) rect(k - 20, -60, 40, 320, { wash: '#5a3a20', washA: 1, w: 2, col: L }); pop();
    push(LAMP[0] - 200, 1500, 1); pencil([[0, 0], [0, -140]], { w: 6, col: '#8a6a30', pass2: false }); poly([[-70, -140], [70, -140], [40, -190], [-40, -190]], { wash: '#2a7a4a', washA: 1, w: 2, col: L }); glow(0, -130, 120, 'rgba(255,220,140,1)', 0.5); pop();
    push(1000, 1560, 1); ell(0, -40, 60, 70, { wash: '#c88a3a', washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.2, col: '#6a3a10', ang: 1 } }); rect(-20, -140, 40, 40, { wash: '#a86a2a', washA: 1, w: 1.6, col: L }); pencil([[50, -30], [90, -10]], { w: 5, col: '#8a5a20', pass2: false }); pop();
    for (const [x, y] of [[880, 1580], [1180, 1590]]) { push(x, y, 1); rect(-18, -50, 36, 50, { wash: '#c8a060', washA: 0.8, w: 1.6, col: L }); ell(0, -50, 18, 6, { wash: '#8a5a1a', washA: 1, w: 1, col: L }); pop(); }
    push(150, 1580, 1); rect(-60, -40, 120, 40, { wash: '#1a1a1e', washA: 1, w: 2, col: L }); pencil([[-40, -40], [-30, -90], [30, -90], [40, -40]], { w: 5, col: '#1a1a1e', pass2: false }); ell(0, -90, 50, 14, { wash: '#2a2a30', washA: 1, w: 1.6, col: L }); pop();
    for (let q = 0; q < 4; q++) rect(1180 + q * 8, 1500 - q * 24, 160, 24, { wash: ['#c8a868', '#8a5a3a', '#e8dcc0', '#5a6a8a'][q], washA: 1, w: 1.4, col: L });
    for (let i = 0; i < 6; i++) { push(-140 + i * 50, 1880 + (i % 2) * 20, 1, i * 0.4); rect(-40, -26, 80, 52, { wash: '#f4f0e0', washA: 1, w: 1.2, col: L }); pop(); }
    lightPool(LAMP[0] - 200, 1660, 600, 150, 'rgba(255,220,140,1)', 0.4); castShadow(330, 1650, 120, 480, -0.3, 0.35); moodDark(-300, 900, 1900, 1900, '#0a0a08', 0.2);
  }
  function front(t) { sil([[-200, 2300], [-120, 1720], [60, 1700], [120, 2300]], '#1a1008', 1); push(1180, 1980, 1.2); rect(-120, -80, 240, 80, { wash: '#3a2414', washA: 1, w: 2, col: L }); pop(); }
  function mapBeat(t) {                                             // карта 1924: УССР, Донбасс в УССР, Шахты и Таганрог → РСФСР
    const k = sm(clamp((t - EV.bd_ua) / 0.25)); if (k <= 0) return; MAPON = t;
    scr(() => { ctx.save(); ctx.translate(0, (1 - k) * 1900); const P = GLOBE.map(480, 980, 260, 38.9, 48.4, { landCol: { eurasia: '#d8c8a0' } }); donMap(P, { ua: '#f0d878', oblCol: '#f0a040', oblA: 0.6 });
      const rk = clamp((t - EV.bd_ru) / 0.4); GLOBE.zone(P, Z1924, rk > 0 ? '#c8281e' : '#f0d878', 0.3 + 0.35 * rk, { w: 5, dash: true });
      if (rk > 0) GLOBE.route(P, [[38.6, 48.0], [39.4, 47.7], [40.4, 47.6]], rk, { col: '#c8281e', bend: -0.1 });
      GLOBE.city(P, ...DON.donetsk, 'СТАЛИНО (ДОНЕЦК)', { size: 32 }); GLOBE.city(P, ...DON.lugansk, 'ЛУГАНСК', { size: 32 }); GLOBE.city(P, ...DON.shakhty, 'ШАХТЫ', { size: 32, k: rk }); GLOBE.city(P, ...DON.taganrog, 'ТАГАНРОГ', { size: 32, left: 1, k: rk });
      const [ux, uy] = P([36.6, 49.3]); txt('УССР', ux, uy, 70, { col: '#7a5a10', font: 'Osw' }); const [rx, ry] = P([40.6, 49.4]); txt('РСФСР', rx, ry, 64, { col: '#6a3a20', font: 'Osw' }); ctx.restore();
      infoPlate(540, 1400, [['1924–25 · РЕШЕНИЕ ЦИК СССР', 40, DB.brassL], ['Донбасс — УССР · Шахты, Таганрог — РСФСР', 30]], t, EV.bd_ru + 0.2); });
  }
  WORLD.border = (t, u, cat) => {
    lay(20, () => wall(t)); lay(3.6, () => room(t)); lay(1, () => { desk(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(16, [500, 600, 1200, 1300], '#fff4d8', t, 8830, { sp: 1, sz: 2.4, a: 0.4, wob: 20, add: 1 }));
    mapBeat(t);
  };
  DIR.border = {
    outfit: 'komissar', light: { side: 1, rim: '#ffe0a0' }, grade: ['#1a2a1a', 0.05],
    act: () => [[S0.border, 'smug'], [EV.bd_moscow, 'proud'], [EV.bd_ua, 'talk'], [EV.bd_ru, 'sideeye']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1650, s: 0.95, look: [0.9, 0.2], hand: [200, -330 + Math.sin(t * 3) * 10] }),
    afterCat: (t, u, P) => { const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; push(x, y, 1, 0.5 + Math.sin(t * 3) * 0.1); rect(-10, -150, 20, 200, { wash: DB.red, washA: 1, w: 2, col: L }); poly([[-10, 50], [10, 50], [0, 80]], { wash: '#e8c890', washA: 1, w: 1.6, col: L }); pop(); },
    hud: t => { if (t > EV.bd_moscow && t < EV.bd_ua) infoPlate(560, 800, [['МОСКВА · 1924', 50, DB.brassL], ['раздел губерний УССР и РСФСР', 30]], t, EV.bd_moscow); },
    cam: () => [[S0.border, 600, 960, -0.04], [EV.bd_moscow, 520, 1100, 0.08, 'x'], [S1.border, 520, 1120, 0.1]]
  };
  TRANS_IN.border = { a: 0.06, b: 0.38, fx(k, t, A, B) {           // красная линия карандаша режет кадр по диагонали, верх уезжает
    const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, 700); ctx.lineTo(0, 1300); ctx.closePath(); ctx.clip(); ctx.drawImage(A, e * 1300, -e * 900); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.moveTo(0, 1300); ctx.lineTo(W, 700); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.clip(); ctx.drawImage(A, -e * 1300, e * 900); ctx.restore(); });
    if (e < 0.9) scr(() => pencil([[-40, 1320], [W + 40, 680]], { w: 14, col: DB.red, pass2: false, gap: false })); } };
})();
