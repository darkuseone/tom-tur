/* 030 — сцена `today` (ответ на хук): вечер, смотровая площадка на Сахарной Голове. Главный свет — закат справа, второй — огни города и
   подсвеченный Христос на Корковаду. Внизу залив, Копакабана, кварталы в огнях, яхты; вагончик канатки приходит; туристы с телефонами.
   Том (худи «РИО») показывает на город. На «столицей» (EV.answer) через кадр растёт шкала-инфографика «1763 ━━━ 1960 = 197 ЛЕТ СТОЛИЦЕЙ»;
   на «Бразилиа» — КАРТА: стрелка «СТОЛИЦА · 1960» Рио → Бразилиа, значок конгресса, «построена за 41 месяц». Планы — window.TQ.
   Переход В: свисток — кадр «сжимается» в мяч и разворачивается в закат. */
(() => {
  EV.answer = wtk('t1', 'столицей');
  EV.td_197 = wtk('t1', 'лет.');
  EV.td_bras = wtk('t1', 'потом') - 0.1;
  EV.td_b2 = wtk('t1', 'Бразилиа.');
  KEYW.push('путают:', 'лет.', 'Бразилиа.');
  const L = RJ.ink, SUN = [960, 760];
  function sky(t) { vgrad(-900, 1100, ['#1a1e4a', '#6a3a7a', '#e8704a', '#ffc070'], 1); glow(SUN[0], SUN[1], 220, 'rgba(255,190,120,1)', 0.45); ell(SUN[0], SUN[1], 60, 60, { wash: '#ffe8b0', washA: 1, line: false });
    for (let i = 0; i < 5; i++) { const r = rng(7000 + i), y = 380 + i * 80, dx = (t * 8) % 200; blob([[-200 + dx, y], [300 + r() * 300 + dx, y - 26], [800 + dx, y - 6], [1300, y + 12], [300, y + 22]], { wash: i < 2 ? '#8a4a7a' : '#f0905a', washA: 0.35, line: false }); } }
  function city(t) {                                                 // Корковаду с подсвеченным Христом, город в огнях, залив, яхты, Копакабана
    corcovado(220, 1020, 0.7, t, { col: '#2a3a3a' }); glow(220, 1020 - 760 * 0.7 - 80, 70, 'rgba(255,250,230,1)', 0.35);
    for (let i = 0; i < 140; i++) { const r = rng(7010 + i), x = -400 + r() * 1800, y = 1020 + r() * 150, w = 14 + r() * 26, h = 10 + r() * 60; rect(x, y - h, w, h, { wash: ['#3a3a5a', '#4a3a4a', '#2a2a4a'][i % 3], washA: 1, w: 0.6, col: L }); for (let q = 0; q < 3; q++) if (r() < 0.6) ctx.fillRect && (ctx.fillStyle = '#ffd890', ctx.fillRect(x + 3 + q * 6, y - h + 4 + (q % 2) * 10, 3, 4)); }
    seaKR(1150, 1300, t, 7020, { cols: ['#3a3a6a', '#2a2a50', '#1a1a3a'], glint: '#ffb070', gx: 900, n: 20 }); pencil([[-400, 1160], [600, 1150], [1600, 1170]], { w: 6, col: '#ffe0a0', a: 0.8, pass2: false });
    for (let i = 0; i < 4; i++) { const x = 200 + i * 260 + Math.sin(t * 0.5 + i) * 30; push(x, 1240, 0.3); shape([[-80, -10], [80, -10], [60, 10], [-60, 10]], { wash: '#f4f0e6', washA: 1, w: 1.4, col: L }); pencil([[0, -10], [0, -140]], { w: 3, col: '#3a3a40', pass2: false }); glow(0, -140, 20, 'rgba(255,230,160,1)', 0.6); pop(); }
    depthFog('#c87a6a', 0.05); }
  function deck(t) {                                                 // смотровая: перила, канатная станция, вагончик, туристы с телефонами
    rect(-500, 1330, 2200, 30, { wash: '#d8d0c0', washA: 1, w: 2, col: L }); for (let i = 0; i < 30; i++) pencil([[-480 + i * 70, 1360], [-480 + i * 70, 1430]], { w: 4, col: '#4a4a52', pass2: false });
    push(1150, 1340, 0.8); rect(-160, -260, 320, 260, { wash: '#e8e0d0', washA: 1, w: 2, col: L }); pencil([[-160, -260], [-700, -900]], { w: 3, col: '#2a2a30', pass2: false }); const k = clamp((t - S0.today) / 3); push(lerp(-600, -60, sm(k)), lerp(-840, -330, sm(k)), 1); pencil([[0, -40], [0, 0]], { w: 3, col: '#2a2a30', pass2: false }); rect(-70, 0, 140, 90, { wash: '#e84a3a', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) rect(-56 + q * 42, 14, 32, 32, { wash: '#ffe0a0', washA: 1, line: false }); pop(); pop();
    const P = [[-180, '#f8d030', 'straw'], [-60, '#3a5aa8', 'cap'], [620, '#e84a3a', null], [740, '#2ac86a', 'cap'], [860, '#f08ac8', 'straw'], [980, '#f4f0e6', null], [1240, '#7a4a8a', 'cap']];
    P.forEach(([x, c, h], i) => human(x, 1440, 0.62, t, { body: c, skin: ['#e2b48e', '#7a4a2a', '#c88a5a'][i % 3], hat: h, hatCol: h === 'straw' ? '#e8d08a' : '#2a2a30', legs: '#2a2a36', armR: 'hold', prop: i % 2 ? 'phone' : undefined, flip: x > 600 ? -1 : 1, seed: 7030 + i, face: 'smile' }));
  }
  function ground(t) {                                               // каменная площадка, бинокль, кофе, рюкзак, мартышка-игрунка на перилах
    rect(-500, 1440, 2200, 900, { wash: '#8a7a6a', washA: 1, w: 2, col: L }); for (let j = 0; j < 9; j++) for (let i = 0; i < 16; i++) rect(-480 + i * 140 + (j % 2) * 70, 1450 + j * 56, 136, 52, { wash: (i + j) % 3 ? '#968676' : '#7a6a5a', washA: 1, w: 1, col: '#4a3a2a' });
    lightPool(SUN[0] - 300, 1660, 800, 160, 'rgba(255,190,120,1)', 0.45);
    push(960, 1720, 1); pencil([[0, 0], [0, -200]], { w: 12, col: '#3a3a40', pass2: false }); rect(-60, -260, 120, 70, { wash: '#2a6a9a', washA: 1, w: 2, col: L }); for (const k of [-26, 26]) ell(k, -226, 18, 18, { wash: '#14181e', washA: 1, w: 1.6, col: L }); pop();
    push(-40, 1780, 1); blob([[-60, 0], [-70, -110], [-30, -140], [30, -140], [70, -110], [60, 0]], { wash: '#c8603a', washA: 1, w: 2, col: L }); pop();
    push(1180, 1380, 0.8); ell(0, -30, 26, 30, { wash: '#8a7a6a', washA: 1, w: 1.6, col: L }); ell(0, -70, 18, 18, { wash: '#a8988a', washA: 1, w: 1.4, col: L }); for (const sd of [-1, 1]) ell(sd * 18, -76, 10, 10, { wash: '#f4f0e6', washA: 1, line: false }); pencil([[20, -10], [60, 40 + Math.sin(t * 3) * 10], [40, 80]], { w: 5, col: '#5a4a3a', pass2: false }); pop();
    castShadow(330, 1640, 120, 520, -0.5, 0.4); moodDark(-200, 900, 1000, 1900, '#140a20', 0.35);
  }
  function timeline(t) {                                             // инфографика: шкала 1763 → 1960 = 197 лет
    if (t < EV.answer - 0.05 || t > EV.td_bras + 0.1) return; const k = sm(clamp((t - EV.answer) / 1.2)); scr(() => { push(540, 820, 1);
      ctx.save(); ctx.fillStyle = 'rgba(14,10,8,0.85)'; ctx.fillRect(-440, -110, 880, 230); ctx.restore(); pencil([[-440, -110], [440, -110], [440, 120], [-440, 120], [-440, -110]], { w: 4, col: RJ.goldL, pass2: false });
      rect(-380, -10, 760, 30, { wash: '#3a3a40', washA: 1, w: 2, col: '#000' }); rect(-380, -10, 760 * k, 30, { wash: RJ.gold, washA: 1, line: false });
      txt('1763', -380, -56, 44, { col: '#fff6e0', font: 'Osw' }); txt('1960', 380, -56, 44, { col: k > 0.98 ? '#fff6e0' : '#6a6a70', font: 'Osw' });
      txt(Math.round(197 * k) + ' ЛЕТ СТОЛИЦЕЙ', 0, 76, 56, { col: RJ.goldL, font: 'Osw' }); pop(); });
  }
  function mapBeat(t) {                                              // карта: столица уезжает Рио → Бразилиа
    const k = sm(clamp((t - EV.td_bras) / 0.3)); if (k <= 0) return; MAPON = t; scr(() => { ctx.save(); ctx.translate((1 - k) * 1200, 0);
      const P = GLOBE.map(560, 980, 70, -45, -19, { landCol: { samerica: '#a8c88a' } });
      GLOBE.zone(P, [[-48.3, -15.5], [-47.3, -15.5], [-47.3, -16.1], [-48.3, -16.1]], '#e8b84a', 0.6, { w: 3 });
      GLOBE.city(P, -43.2, -22.9, 'РИО', { size: 40 }); GLOBE.city(P, ...RIO.bras, 'БРАЗИЛИА', { size: 44, col: '#2ac86a', left: true });
      GLOBE.route(P, [[-43.2, -22.9], RIO.bras], clamp((t - EV.td_bras - 0.1) / 0.7), { col: '#2ac86a', bend: 0.25, label: 'СТОЛИЦА · 1960', t, t0: EV.td_bras + 0.4, lx: 150, ly: 20, size: 40 });
      const [bx, by] = P(RIO.bras); if (t > EV.td_b2 - 0.1) { push(bx, by - 120, popK(t, EV.td_b2 - 0.1, 0.3)); for (const sd of [-1, 1]) rect(sd * 22 - 10, -120, 20, 120, { wash: '#f4f0e6', washA: 1, w: 1.6, col: L }); rect(-90, 0, 180, 20, { wash: '#f4f0e6', washA: 1, w: 1.6, col: L }); blob([[-80, 0], [-60, 30], [-30, 0]], { wash: '#f4f0e6', washA: 1, w: 1.4, col: L }); blob([[30, 0], [60, -30], [80, 0]], { wash: '#f4f0e6', washA: 1, w: 1.4, col: L }); pop(); }
      ctx.restore(); infoPlate(560, 730, [['БРАЗИЛИА — СТОЛИЦА С 21.04.1960', 34, '#9affb8'], ['построена с нуля за ≈ 41 месяц', 28]], t, EV.td_b2 + 0.1, { edge: '#2ac86a' }); });
  }
  window.TQ = { sky, city, deck, ground };
  WORLD.today = (t, u, cat) => {
    lay(40, () => sky(t)); lay(16, () => city(t)); lay(2.6, () => deck(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => { for (const x of [-140, 1230]) sil([[x - 80, 2300], [x - 70, 1500], [x + 70, 1480], [x + 80, 2300]], '#140a14', 1); });
    lay(2, () => motes(14, [-100, 700, 1200, 1500], '#ffd8a0', t, 7040, { sp: 3, sz: 2.2, a: 0.4, wob: 16, add: 1 }));
    timeline(t); mapBeat(t);
  };
  DIR.today = {
    outfit: 'hoodieRIO', light: { side: 1, rim: '#ffc080' }, grade: ['#3a1a4a', 0.08],
    act: () => [[S0.today, 'suspicious'], [EV.answer, 'proud'], [EV.td_197, 'grin'], [EV.td_bras, 'smug'], [EV.td_b2, 'wink']],
    pose: (t, u, b) => { const w1 = clamp(u / 0.9), x = lerp(140, 330, sm(w1)); return Object.assign(b, { x, y: 1640, s: 0.95, walk: w1 < 1 ? t * 9 : 0, look: [0.8, -0.5], hand: t > EV.answer ? [200, -420] : [150, -300], point: t > EV.answer, tailUp: t > EV.answer }); },
    cam: () => [[S0.today, 600, 960, -0.1], [EV.answer - 0.2, 560, 1000, -0.04], [EV.td_197, 520, 1060, 0.04, 'x'], [S1.today, 520, 1080, 0.06]]
  };
  TRANS_IN.today = { a: 0.08, b: 0.38, fx(k, t, A, B) {             // кадр сжимается в мяч и разворачивается в закат
    const e = sm(k); if (e < 0.5) { const s = 1 - e * 1.9; drawBuf(B, 1, 540, 960, 0.0); scr(() => { ctx.fillStyle = '#140a14'; ctx.fillRect(0, 0, W, H); }); inCircle(540, 960, Math.max(4, 1100 * s), () => drawBuf(A, Math.max(0.05, s), 540, 960, 1, null, 0, 0, e * 6)); scr(() => ball(540, 960, 2.5 * (1 - s) + 0.1, e * 10)); }
    else { const s = (e - 0.5) * 2; drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - s; ctx.fillStyle = '#140a14'; ctx.fillRect(0, 0, W, H); ctx.restore(); }); } } };
})();
