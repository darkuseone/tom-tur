/* 027 — сцена `quit`: 1966, дождь над стройкой оперы на мысе Беннелонг. Паруса построены наполовину, жёлтые краны, рабочие в касках,
   в лужах отражаются прожекторы; на заборе — табло сметы, цифры ползут вверх. Главный свет — холодный прожектор крана, второй — серое небо.
   Том (director) под зонтом: на «смета» табло щёлкает «$7 → $22 → $50 МЛН», на «ушёл» по мокрой набережной уходит силуэт с чемоданом
   (архитектор, без портрета), ветер несёт газеты «UTZON QUITS», на «не увидел» Том опускает зонт — дождь по шляпе. Переход В — дождь стекает по кадру. */
(() => {
  EV.qt_cost = wtk('s5', 'смета');
  EV.qt_66 = wtk('s5', 'шестом');
  EV.qt_left = wtk('s5', 'ушёл');
  EV.qt_never = wtk('s5', 'увидел.');
  KEYW.push('смета', 'скандалом.', 'увидел.');
  SHAKES.push([EV.qt_left + 0.3, 0.2, 5]);
  const L = SY.ink, LAMP = [940, 520];
  function sky(t) { vgrad(-900, 1200, ['#3a4250', '#5a6270', '#7a8088', '#8a9098'], 1); for (let i = 0; i < 5; i++) { const r = rng(3410 + i), x = (r() * 1400 + t * 14) % 1500 - 200, y = 360 + r() * 300; for (let k = 0; k < 5; k++) ell(x + k * 60, y - (k % 2) * 24, 90, 40, { wash: '#4a525e', washA: 0.6, line: false }); } }
  function far(t) { hills(1000, 40, '#4a5258', 3411); harbourB(80, 1020, 0.5, t, { col: '#3a424a' }); depthFog('#6a727a', 0.12); }
  function site(t) {                                                 // недостроенная опера, краны, прожектор, рабочие
    vgrad(1000, 1350, ['#5a6a7a', '#2a3a4a'], 1); operaH(640, 1220, 1.0, t, { k: 0.55 });
    for (const x of [400, 900]) { pencil([[x, 1220], [x, 480]], { w: 10, col: SY.yel, pass2: false }); for (let j = 0; j < 12; j++) pencil([[x - 14, 1200 - j * 60], [x + 14, 1170 - j * 60]], { w: 2, col: '#8a6a10', pass2: false }); pencil([[x - 260, 500], [x + 180, 500]], { w: 8, col: SY.yel, pass2: false }); const sw = Math.sin(t * 0.8 + x) * 20; pencil([[x - 200 + sw, 500], [x - 200 + sw, 760]], { w: 2, col: L, pass2: false }); rect(x - 240 + sw, 760, 80, 40, { wash: '#a8a8a0', washA: 1, w: 1.6, col: L }); }
    glow(LAMP[0], LAMP[1], 70, 'rgba(230,240,255,1)', 0.6); shaft(LAMP[0], LAMP[1], 120, 1100, 0.35, 'rgba(220,235,255,1)', 0.16);
    for (let i = 0; i < 5; i++) human(220 + i * 170, 1230, 0.42, t, { body: '#e8a02a', legs: '#3a3a42', hat: 'helmet', armR: i % 2 ? 'hold' : 'swing', prop: i % 2 ? 'stick' : undefined, seed: 3420 + i, flip: i % 2 ? -1 : 1 });
  }
  function fence(t) {                                                // забор стройки с табло сметы, газеты, лужи
    rect(-400, 1180, 1900, 180, { wash: '#6a6a62', washA: 1, w: 2, col: L }); for (let i = 0; i < 20; i++) pencil([[-380 + i * 100, 1180], [-380 + i * 100, 1360]], { w: 3, col: '#3a3a36', pass2: false });
    push(760, 1120, 1); rect(-210, -120, 420, 200, { wash: '#1a1a1e', washA: 1, w: 3, col: L }); txt('СМЕТА ОПЕРЫ', 0, -84, 28, { col: '#e8e0c0', font: 'Osw' });
    const st = t < EV.qt_cost ? 0 : t < EV.qt_cost + 0.6 ? 1 : t < EV.qt_left ? 2 : 3; txt(['$7 МЛН', '$22 МЛН', '$50 МЛН', '$50+ МЛН'][st], 0, 4, 66, { col: st ? '#ff6a4a' : '#8ae08a', font: 'Osw' }); pop();
    if (t > EV.qt_left) for (let q = 0; q < 3; q++) { const ph = clamp((t - EV.qt_left - q * 0.3) / 1.6); if (ph <= 0) continue; push(lerp(1300, -300, ph), 1100 - Math.sin(ph * 6 + q) * 80 - q * 60, 1, ph * 8 + q); rect(-80, -56, 160, 112, { wash: '#e8e4d8', washA: 1, w: 1.6, col: L }); txt('UTZON', 0, -24, 26, { col: L, font: 'Osw' }); txt('QUITS', 0, 8, 26, { col: SY.red, font: 'Osw' }); pop(); }
  }
  function quay(t) {                                                 // мокрая набережная: уходящий силуэт, лужи с отражениями
    rect(-500, 1360, 2100, 900, { wash: '#3a4048', washA: 1, w: 2, col: L }); for (let j = 0; j < 7; j++) for (let i = 0; i < 16; i++) rect(-500 + i * 130 + (j % 2) * 65, 1364 + j * 80, 128, 78, { wash: (i + j) % 3 ? '#454b54' : '#3a3f48', washA: 1, w: 1, col: '#22262c' });
    for (const [x, y, w] of [[620, 1700, 220], [140, 1820, 160], [1000, 1780, 200]]) { ell(x, y, w, 26, { wash: '#6a7a8a', washA: 0.7, line: false }); pencil([[x - w * 0.6, y], [x + w * 0.6, y]], { w: 2, col: '#c8d8ff', a: 0.4, pass2: false }); }
    lightPool(LAMP[0] - 200, 1660, 520, 120, 'rgba(220,235,255,1)', 0.35);
    if (t > EV.qt_left - 0.3) { const ph = clamp((t - EV.qt_left + 0.3) / 3.2); push(lerp(820, 1300, ph), 1400 - ph * 30, 0.62 - ph * 0.25); human(0, 0, 1, t, { body: '#2a2a32', legs: '#1a1a20', hat: 'boater', hatCol: '#1a1a20', armR: 'hold', seed: 3430, flip: 1, face: 'calm' }); rect(30, -150, 70, 56, { wash: '#5a3a1e', washA: 1, w: 2, col: L });
      pencil([[-20, -330], [-20, -420]], { w: 3, col: L, pass2: false }); shape(ellPts(-20, -420, 110, 50, 0, 0, 20).filter(p => p[1] <= -420), { wash: '#1a1a20', washA: 1, w: 2, col: L }); pop(); }
    push(1100, 1600, 1); ell(0, -80, 110, 80, { wash: '#e8a02a', washA: 1, w: 2.4, col: L }); for (let q = -2; q <= 2; q++) pencil([[q * 40, -150], [q * 40 + 20, -10]], { w: 3, col: '#8a5a10', pass2: false }); rect(-130, -10, 260, 30, { wash: '#3a3a42', washA: 1, w: 2, col: L }); for (const k of [-90, 90]) ell(k, 30, 28, 28, { wash: '#1a1a1e', washA: 1, w: 2, col: L }); pop();   // бетономешалка
    for (let i = 0; i < 5; i++) { const x = -200 + i * 140; push(x, 1560, 1); rect(-60, -70, 120, 20, { wash: (i % 2) ? '#e8e0d0' : '#d82a1e', washA: 1, w: 1.6, col: L }); for (const k of [-50, 50]) pencil([[k, -50], [k, 0]], { w: 5, col: '#3a3a42', pass2: false }); pop(); }   // ограждения
    for (let i = 0; i < 6; i++) { const r2 = rng(3448 + i), x = r2() * 1300 - 100, y = 1500 + r2() * 400, ph = ((t * 2) + r2()) % 1; pencil(ellPts(x, y, 10 + ph * 40, 3 + ph * 10, 0, 0, 16), { w: 2, col: '#c8d8ff', a: 0.6 * (1 - ph), pass2: false }); }   // круги по лужам
    human(820, 1560, 0.62, t, { body: '#e8a02a', legs: '#3a3a42', hat: 'helmet', armR: 'hold', prop: 'stick', seed: 3449, flip: -1, face: 'calm' }); human(960, 1580, 0.6, t, { body: '#e8a02a', legs: '#3a3a42', hat: 'helmet', armR: 'point', seed: 3450, flip: -1, face: 'shock' });
    push(-120, 1640, 0.9); rect(-160, -120, 220, 120, { wash: '#3a5a7a', washA: 1, w: 2, col: L }); rect(60, -90, 100, 90, { wash: '#2a4a6a', washA: 1, w: 2, col: L }); rect(80, -80, 60, 40, { wash: '#bcd8e4', washA: 1, w: 1.4, col: L }); for (const k of [-110, 0, 110]) ell(k, 8, 26, 26, { wash: '#1a1a1e', washA: 1, w: 2, col: L }); pop();   // грузовик
    for (let i = 0; i < 4; i++) { const x = 480 + i * 90; pencil([[x, 1560], [x, 1440]], { w: 4, col: '#8a8e94', pass2: false }); } pencil([[460, 1450], [800, 1450]], { w: 4, col: '#8a8e94', pass2: false }); pencil([[460, 1500], [800, 1500]], { w: 4, col: '#8a8e94', pass2: false });   // леса у забора
    castShadow(330, 1612, 120, 400, -0.4, 0.4); moodDark(LAMP[0], 900, 900, 1800, '#0a0e14', 0.45);
  }
  function rain(t) { const r = rng(hsh(FRAME, 3440)); ctx.save(); ctx.strokeStyle = 'rgba(200,215,235,0.55)'; ctx.lineWidth = 2; for (let i = 0; i < 160; i++) { const x = r() * 1400 - 100, y = r() * 2000; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 10, y + 50); ctx.stroke(); } ctx.restore(); }
  function front(t) { rect(-200, 1900, 1500, 400, { wash: '#1a1e24', washA: 1, line: false }); rain(t); }
  WORLD.quit = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => far(t));
    lay(6, () => site(t));
    lay(2.6, () => { fence(t); depthFog('#5a626a', 0.06); });
    lay(1, () => { quay(t); cat(); });
    lay(0.6, () => front(t));
    lay(3, () => rain(t));
  };
  DIR.quit = {
    outfit: 'director', light: { side: 1, rim: '#c8d8ff' }, grade: ['#3a4a5a', 0.14],
    act: () => [[S0.quit, 'suspicious'], [EV.qt_cost, 'shock'], [EV.qt_left, 'scared'], [EV.qt_never, 'cold']],
    pose: (t, u, b) => { const down = t > EV.qt_never - 0.1; return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.qt_left && t < EV.qt_never ? [0.9, -0.1] : [0.6, -0.4], hand: down ? [150, -260] : [130, -470], tailUp: false, frost: down ? 0.3 : 0 }); },
    afterCat: (t, u, P) => { const down = t > EV.qt_never - 0.1 ? sm(clamp((t - EV.qt_never + 0.1) / 0.4)) : 0, x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; push(x, y, 1, down * 1.2); pencil([[0, 40], [0, -260]], { w: 5, col: '#2a2a30', pass2: false }); shape(ellPts(0, -260, 200, 90, 0, 0, 24).filter(p => p[1] <= -260), { wash: SY.red, washA: 1, w: 2.4, col: L }); for (let q = -2; q <= 2; q++) pencil([[0, -350], [q * 90, -264]], { w: 2, col: '#5a0a08', pass2: false }); pop(); },
    cam: () => [[S0.quit, 620, 960, 0.0], [EV.qt_cost, 700, 980, 0.1, 'x'], [EV.qt_left, 760, 1040, 0.06], [EV.qt_never, 460, 1080, 0.16, 'x'], [S1.quit, 460, 1080, 0.18]]
  };
  TRANS_IN.quit = { a: 0.12, b: 0.38, fx(k, t, A, B) {              // дождь стекает по кадру: капли смывают 1957-й, под ними серый 1966-й
    const e = sm(k); drawBuf(B); scr(() => { const r = rng(3445); for (let i = 0; i < 26; i++) { const x = i * 44 + r() * 20, len = H * clamp(e * 1.6 - r() * 0.6); ctx.save(); ctx.beginPath(); ctx.rect(x, len, 46, H); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore(); pencil([[x + 22, len - 40], [x + 22, len]], { w: 10, col: '#c8d8ff', a: 0.6, pass2: false }); } });
  } };
})();
