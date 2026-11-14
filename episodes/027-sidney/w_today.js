/* 027 — сцена `today`: 2026, ночная Круговая пристань. Опера в цветной подсветке (меняются оттенки), мост в огнях, паромы,
   набережная с людьми, уличный кот, кофе. Главный свет — подсветка оперы (переливы), второй — фонари набережной.
   Том (hoodieSYD) у перил: на «миллион» — круглая «лупа» показывает плитки крупно и счётчик «1 056 000 ПЛИТОК», на «пять» —
   плашка «5,5 МЛН ЖИТЕЛЕЙ». Планы — window.TQ для кнопки (одна концовка, ПОДПИШИСЬ на «Пиши»). */
(() => {
  EV.td_roof = wtk('t1', 'крыше');
  EV.td_mil = wtk('t1', 'миллион');
  EV.td_city = wtk('t1', 'городе');
  EV.td_55 = wtk('t1', 'пять');
  KEYW.push('миллион', 'пять');
  const L = SY.ink;
  const hue = t => (t * 30) % 360;
  function sky(t) { vgrad(-900, 1200, ['#060818', '#0e1630', '#1a1e44'], 1); const r = rng(3600); ctx.save(); ctx.fillStyle = '#fff8e8'; for (let i = 0; i < 60; i++) { ctx.globalAlpha = 0.2 + 0.5 * r(); ctx.fillRect(r() * 1300 - 100, r() * 700 - 100, 2.2, 2.2); } ctx.restore(); }
  function city(t) { hills(1020, 30, '#10142a', 3601); for (let i = 0; i < 16; i++) { const x = -300 + i * 100, h = 140 + (i * 47) % 240; rect(x - 40, 1020 - h, 80, h, { wash: '#161a30', washA: 1, line: false }); windows(x - 34, 1020 - h + 10, 68, h - 20, 3, Math.floor(h / 26), 3602 + i, 0.55, '#ffd98a', '#bfe0ff', 0.85); }
    harbourB(220, 1060, 0.6, t, { col: '#2a2e40', lit: 1 }); depthFog('#141a3a', 0.08); }
  function opera(t) {                                                // опера в цветной подсветке, отражения, паромы
    vgrad(1040, 1400, ['#141c3a', '#060a18'], 1); operaH(800, 1200, 1.15, t, { lit: 1 });
    const c = `hsl(${hue(t)},80%,60%)`; ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.35; ctx.fillStyle = c; ctx.fillRect(420, 800, 760, 360); ctx.restore(); glow(800, 1040, 380, `hsla(${hue(t)},90%,60%,1)`, 0.18);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.3; for (let i = 0; i < 16; i++) { ctx.fillStyle = `hsl(${(hue(t) + i * 10) % 360},80%,60%)`; ctx.fillRect(500 + i * 40, 1230 + (i % 3) * 18, 24, 4); } ctx.restore();
    ferrySY(260 + (t * 14) % 200, 1250, 0.4, t, { lit: 1 });
  }
  function quay(t) {                                                 // набережная: перила, фонари, люди, кафе
    rect(-400, 1320, 1900, 26, { wash: '#4a4a52', washA: 1, w: 2, col: L }); for (let i = 0; i < 24; i++) pencil([[-380 + i * 80, 1322], [-380 + i * 80, 1250]], { w: 4, col: '#3a3a42', pass2: false }); pencil([[-400, 1252], [1500, 1252]], { w: 6, col: '#3a3a42', pass2: false });
    for (const x of [-60, 520, 1140]) { pencil([[x, 1320], [x, 1050]], { w: 7, col: '#2a2a30', pass2: false }); ell(x, 1040, 18, 22, { wash: '#ffe8a8', washA: 1, w: 2, col: L }); glow(x, 1040, 70, 'rgba(255,220,150,1)', 0.3); }
    const P = [[60, '#3a5a8a', null, 'phone'], [200, '#c83a5a', 'scarf', 'hold'], [960, '#2a6a4a', 'cap', 'phone'], [1080, '#e8c050', null, 'wave'], [1240, '#6a3a6a', 'scarf', 'hold']];
    P.forEach(([x, c, h, a], i) => human(x, 1326, 0.56, t, { body: c, hat: h, hatCol: '#e8c050', legs: '#2a2a32', hair: i % 2 ? '#c8a050' : '#2a1a10', armR: a === 'phone' ? 'hold' : a, prop: a === 'phone' ? 'phone' : undefined, flip: x > 600 ? -1 : 1, seed: 3610 + i, face: 'smile' }));
  }
  function ground(t) {                                               // плитка под Томом, столик кафе, кот
    rect(-400, 1400, 1900, 900, { wash: '#3a3640', washA: 1, w: 2, col: L }); for (let j = 0; j < 8; j++) for (let i = 0; i < 20; i++) rect(-400 + i * 100 + (j % 2) * 50, 1404 + j * 60, 98, 58, { wash: (i + j) % 3 ? '#45414c' : '#3a3640', washA: 1, w: 1, col: '#22202a' });
    lightPool(560, 1620, 600, 140, `hsla(${hue(t)},80%,70%,1)`, 0.3); lightPool(400, 1640, 360, 90, 'rgba(255,220,150,1)', 0.35);
    push(1000, 1620, 1); ell(0, -150, 90, 18, { wash: '#e8e4dc', washA: 1, w: 2, col: L }); pencil([[0, -140], [0, 0]], { w: 6, col: '#2a2a30', pass2: false }); shape([[-30, -168], [-26, -200], [-4, -200], [-8, -168]], { wash: '#f4f0e8', washA: 1, w: 1.4, col: L }); pop();
    push(140, 1660, 1); blob([[-40, 0], [-30, -60], [10, -70], [40, -40], [36, 0]], { wash: '#2a2a2e', washA: 1, w: 2, col: L }); for (const k of [-1, 1]) poly([[k * 8 - 6, -62], [k * 14, -86], [k * 18 + 6, -60]], { wash: '#2a2a2e', washA: 1, w: 1.6, col: L }); ell(-6, -42, 4, 3, { wash: '#ffe060', washA: 1, line: false }); ell(10, -42, 4, 3, { wash: '#ffe060', washA: 1, line: false }); pop();
    for (const [x, s1] of [[640, 'WHARF 2'], [-120, 'WHARF 3']]) { push(x, 1600, 1); rect(-80, -320, 160, 60, { wash: SY.green, washA: 1, w: 2, col: L }); txt(s1, 0, -290, 30, { col: SY.yel, font: 'Osw' }); pencil([[0, -260], [0, 0]], { w: 6, col: '#2a2a30', pass2: false }); pop(); }
    push(1220, 1640, 1); for (const k of [-60, 60]) ell(k, -30, 34, 34, { line: true, w: 5, col: '#c8c8cc' }); pencil([[-60, -30], [0, -80], [60, -30], [0, -30], [-60, -30]], { w: 5, col: SY.red, pass2: false }); pencil([[0, -80], [-10, -110]], { w: 4, col: '#2a2a30', pass2: false }); pop();   // велосипед
    for (const [x, y] of [[880, 1760], [1100, 1700]]) { push(x, y, 1); ell(0, -30, 34, 20, { wash: '#f4f0e8', washA: 1, w: 1.6, col: L }); blob([[24, -40], [40, -70], [30, -100], [50, -110]], { wash: '#2a2a30', washA: 1, w: 1.4, col: L }); pencil(spline([[46, -108], [70, -96], [96, -70]], false, 6), { w: 4, col: '#2a2a30', pass2: false }); pencil([[-6, -12], [-10, 10]], { w: 3, col: '#2a2a30', pass2: false }); pencil([[6, -12], [10, 10]], { w: 3, col: '#2a2a30', pass2: false }); pop(); }   // ибисы
    for (const [x, c] of [[40, '#c83a5a'], [700, '#3a5a8a'], [1380, '#5a6a3a']]) human(x, 1700, 0.62, t, { body: c, legs: '#2a2a32', hair: '#2a1a10', armR: 'wave', seed: 3625 + x, face: 'smile', flip: x > 600 ? -1 : 1 });
    for (const x of [860, 1020]) { push(x, 1560, 1); pencil([[0, -260], [0, 0]], { w: 5, col: '#2a2a30', pass2: false }); shape(ellPts(0, -260, 110, 40, 0, 0, 20).filter(p => p[1] <= -260), { wash: x > 900 ? SY.red : '#f4f0e8', washA: 1, w: 2, col: L }); for (let q = -2; q <= 2; q++) pencil([[0, -298], [q * 50, -262]], { w: 1.4, col: '#5a5a62', pass2: false }); pop(); }   // зонтики бара
    for (let q = 0; q < 5; q++) { const ph = ((t * 0.3) + q * 0.2) % 1; gull(-100 + ph * 1400, 560 + q * 40, 0.8, t, 3640 + q, '#e8e8f0'); }
    castShadow(330, 1612, 120, 420, -0.2, 0.4); moodDark(800, 1100, 800, 1700, '#04060e', 0.4);
  }
  function hud(t) {
    if (t > EV.td_mil - 0.1 && t < EV.td_55) { const q = popK(t, EV.td_mil - 0.1, 0.35), n = Math.round(sm(clamp((t - EV.td_mil) / 0.8)) * 1056000); push(760, 820, q, 0); ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 170, 0, 6.283); ctx.clip(); ctx.fillStyle = '#d8d4c8'; ctx.fillRect(-170, -170, 340, 340);
      for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) { const x = i * 22 + (j % 2) * 11, y = j * 22; ctx.fillStyle = (i + j) % 3 ? '#f6f2e8' : '#e8e2d2'; ctx.fillRect(x - 10, y - 10, 20, 20); } ctx.restore(); pencil(ellPts(0, 0, 170, 170, 0, 0, 40), { w: 10, col: '#2a2a30', pass2: false }); pencil([[120, 120], [200, 200]], { w: 22, col: '#2a2a30', pass2: false });
      rect(-220, 190, 440, 90, { wash: '#14100a', washA: 0.92, w: 3, col: SY.goldL }); txt(n.toLocaleString('ru-RU') + ' плиток', 0, 236, 40, { col: SY.goldL, font: 'Osw' }); pop(); }
    if (t > EV.td_55 - 0.05) { const q = popK(t, EV.td_55 - 0.05, 0.35); push(560, 820, q, 0.02); rect(-260, -66, 520, 132, { wash: '#14100a', washA: 0.92, w: 3, col: SY.oraL }); txt('5,5 МЛН', 0, -10, 64, { col: SY.oraL, font: 'Osw' }); txt('жителей, 2024', 0, 44, 26, { col: '#f6e7c8', font: 'Osw' }); pop(); }
  }
  function front(t) { for (const x of [-60, 1150]) { sil([[x - 40, 2200], [x - 40, 1480], [x + 40, 1480], [x + 40, 2200]], '#0a0a12', 1); ell(x, 1480, 50, 20, { wash: '#0a0a12', washA: 1, line: false }); } }
  window.TQ = { sky, city, opera, quay, ground, front };
  WORLD.today = (t, u, cat) => {
    lay(40, () => sky(t)); lay(18, () => city(t)); lay(6, () => opera(t)); lay(2.6, () => { quay(t); depthFog('#141a3a', 0.04); }); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2.2, () => motes(24, [-100, 700, 1200, 1400], '#c8d8ff', t, 3620, { sp: 2, sz: 2, a: 0.4, wob: 20, add: 1 }));
  };
  DIR.today = {
    outfit: 'hoodieSYD', light: { side: 1, rim: '#c8a0ff' }, grade: ['#1a1a40', 0.06],
    act: () => [[S0.today, 'grin'], [EV.td_mil, 'awe'], [EV.td_55, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.td_roof && t < EV.td_city ? [0.8, -0.7] : [0.4, -0.3], hand: t > EV.td_roof - 0.1 && t < EV.td_city ? [230, -480] : [170, -300], tailUp: t > EV.td_mil }),
    cam: () => [[S0.today, 600, 980, -0.02], [EV.td_mil, 640, 960, 0.06, 'x'], [EV.td_55, 560, 1000, 0.08], [S1.today, 560, 1000, 0.1]],
    hud
  };
  TRANS_IN.today = { a: 0.12, b: 0.38, fx(k, t, A, B) {              // ночь «включается»: полосы цветной подсветки проходят по кадру
    const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI); for (let i = 0; i < 12; i++) { ctx.save(); ctx.globalAlpha = 0.7 * a; ctx.fillStyle = `hsl(${(i * 30 + e * 200) % 360},85%,60%)`; ctx.fillRect(0, i * 160 + (e - 0.5) * 300 * (i % 2 ? 1 : -1), W, 160); ctx.restore(); } });
  } };
})();
