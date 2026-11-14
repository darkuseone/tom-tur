/* 026 — сцена `today`: 2026, ночной Босфор с палубы парома. Мост в огнях через пролив: слева Европа, справа Азия; у воды —
   подсвеченная мечеть Ортакёй, по холмам огни города, мимо идёт танкер и паром. На палубе: перила, спасательный круг, стаканы чая,
   пассажиры, чайки ловят кусочки симита. Главный свет — тёплая лампа палубы над Томом, второй — холодные огни моста.
   Том (hoodieIST) с чаем: на «шестнадцать» — счётчик «15 754 053», на «Европе» и «Азии» — подписи берегов, Том кидает чайке
   кусок симита на «Азии», на «ста» — плашка «ИМЕНИ < 100 ЛЕТ». Планы — window.TQ (для кнопки). */
(() => {
  EV.td_now = wtk('t1', 'Сегодня');
  EV.td_16 = wtk('t1', 'шестнадцать');
  EV.td_eu = wtk('t1', 'Европе');
  EV.td_as = wtk('t1', 'Азии.');
  EV.td_100 = wtk('t1', 'ста');
  KEYW.push('шестнадцать', 'Европе', 'Азии.', 'ста');
  const L = IS.ink, LAMP = [380, 900];
  function sky(t) { vgrad(-900, 1100, ['#060a1e', '#0e1a3a', '#2a2a5a', '#5a3a6a'], 1); ell(880, 380, 44, 44, { wash: '#f0ecd8', washA: 1, line: false }); glow(880, 380, 120, 'rgba(220,230,255,1)', 0.2);
    const r = rng(3020); ctx.save(); ctx.fillStyle = '#fff8e8'; for (let i = 0; i < 60; i++) { ctx.globalAlpha = 0.2 + 0.5 * r(); ctx.fillRect(r() * 1300 - 100, r() * 600 - 100, 2.2, 2.2); } ctx.restore(); }
  function shores(t) {                                               // берега: Европа слева, Азия справа, огни холмов, мост
    const r = rng(3021);
    sil([[-600, 1010], [-600, 880], [-200, 860], [200, 900], [420, 960], [460, 1010]], '#1a1a30', 1); sil([[700, 1010], [760, 950], [1000, 880], [1400, 860], [1800, 900], [1800, 1010]], '#1a1a30', 1);
    ctx.save(); for (let i = 0; i < 160; i++) { const left = i % 2, x = left ? -560 + r() * 1000 : 720 + r() * 1080, y = (left ? 900 : 900) + r() * 100; ctx.fillStyle = r() < 0.7 ? '#ffd98a' : '#bfe0ff'; ctx.globalAlpha = 0.5 + 0.5 * r(); ctx.fillRect(x, y, 3, 3); } ctx.restore();
    domeM(240, 1010, 0.22, '#e8dcc0', { n: 2, lit: 0.9, line: true, seed: 3022 }); glow(240, 960, 100, 'rgba(255,230,170,1)', 0.25);
    const hue = (t - S0.today) * 40; const pts = ellPts(560, 1180, 900, 300, 0, 0, 40).filter(p => p[1] <= 1000);
    for (const tx of [-240, 1360]) { rect(tx - 16, 700, 32, 330, { wash: '#2a2a40', washA: 1, w: 2, col: L }); }
    pencil([[-560, 980], [-240, 700], [560, 930], [1360, 700], [1680, 980]], { w: 4, col: '#8a8ab0', pass2: false });
    rect(-600, 960, 2400, 14, { wash: '#2a2a40', washA: 1, w: 1.4, col: L });
    for (let i = 0; i < 40; i++) { const x = -560 + i * 56, y = x < -240 ? 980 - (x + 560) / 320 * 280 : x < 560 ? 700 + (x + 240) / 800 * 230 : x < 1360 ? 930 - (x - 560) / 800 * 230 : 700 + (x - 1360) / 320 * 280;
      pencil([[x, y], [x, 962]], { w: 1.4, col: `hsl(${(hue + i * 9) % 360},80%,65%)`, a: 0.8, pass2: false }); }
    for (let i = 0; i < 30; i++) ell(-560 + i * 76, 966, 4, 4, { wash: `hsl(${(hue + i * 12) % 360},90%,70%)`, washA: 1, line: false });
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.25; for (let i = 0; i < 18; i++) { ctx.fillStyle = `hsl(${(hue + i * 20) % 360},90%,60%)`; ctx.fillRect(-500 + i * 120, 1030 + (i % 3) * 20, 60, 4); } ctx.restore();
    depthFog('#1a1a40', 0.08);
  }
  function water(t) {                                                // пролив: отражения, танкер, встречный паром
    vgrad(1010, 1500, ['#1a1a3a', '#0a1028', '#060a18'], 1);
    for (let i = 0; i < 30; i++) { const r = rng(3030 + i), x = r() * 1300 - 100, y = 1030 + r() * 400; pencil([[x, y], [x + 40 + r() * 60, y]], { w: 2, col: r() < 0.5 ? '#ffd98a' : '#8ac0ff', a: 0.3, pass2: false }); }
    push(1100 - (t * 10) % 300, 1080, 0.5); shape([[-300, -30], [300, -30], [260, 30], [-280, 30]], { wash: '#2a2a3a', washA: 1, w: 2, col: L }); rect(140, -110, 120, 80, { wash: '#e8e0d0', washA: 1, w: 1.6, col: L }); for (let k = 0; k < 4; k++) rect(150 + k * 26, -96, 16, 14, { wash: '#ffe0a0', washA: 1, line: false }); ell(-280, -10, 6, 6, { wash: '#ff4a3a', washA: 1, line: false }); pop();
    ferry(220 + (t * 16) % 200, 1150, 0.38, t, { lit: 1, flip: -1, smoke: false });
  }
  function deck(t, o = {}) {                                         // палуба: перила, круг, пассажиры, столик с чаем, лампа
    rect(-500, 1260, 2100, 30, { wash: '#e8e4dc', washA: 1, w: 2, col: L }); for (let i = 0; i < 26; i++) pencil([[-480 + i * 80, 1290], [-480 + i * 80, 1420]], { w: 6, col: '#d8d4cc', pass2: false }); rect(-500, 1410, 2100, 18, { wash: '#e8e4dc', washA: 1, w: 2, col: L });
    push(960, 1360, 1); ell(0, 0, 70, 70, { wash: '#f2581e', washA: 1, w: 2.4, col: L }); ell(0, 0, 38, 38, { wash: '#1a1a30', washA: 1, w: 2, col: L }); for (let q = 0; q < 4; q++) { const a = q * 1.57 + 0.78; rect(Math.cos(a) * 54 - 12, Math.sin(a) * 54 - 12, 24, 24, { wash: IS.white, washA: 1, line: false }); } pop();
    for (const [x, c, fl, a] of [[620, '#3a4a6a', -1, 'hold'], [760, '#8a3a4a', -1, 'down'], [1180, '#4a5a3a', -1, 'wave']]) human(x, 1440, 0.6, t, { body: c, hat: x === 760 ? 'scarf' : null, hatCol: '#d84a6a', legs: '#2a2a32', hair: '#2a1a10', armR: a, prop: x === 620 ? 'phone' : undefined, flip: fl, seed: 3040 + x, face: 'smile' });
    for (const [x, c, h] of [[480, '#5a3a5a', 'scarf'], [1060, '#2a5a5a', null], [1290, '#7a5a2a', 'cap'], [1400, '#3a3a5a', null]]) human(x, 1440, 0.58, t, { body: c, hat: h, hatCol: '#4a6a9a', legs: '#2a2a32', hair: '#3a2a1a', armR: 'hold', flip: x > 1000 ? -1 : 1, seed: 3045 + x, face: 'smile' });
    pencil([[LAMP[0], 600], [LAMP[0], 860]], { w: 3, col: '#2a2a30', pass2: false }); ell(LAMP[0], 880, 36, 26, { wash: '#ffe8a8', washA: 1, w: 2, col: L }); glow(LAMP[0], 885, 120, 'rgba(255,220,150,1)', 0.35);
  }
  function floor(t) {                                                // доски палубы под Томом, столик с чаем и симитами, чайки ловят крошки
    rect(-500, 1440, 2100, 900, { wash: '#8a6a4a', washA: 1, w: 2, col: L }); for (let i = 0; i < 24; i++) pencil([[-500, 1460 + i * 34], [1600, 1470 + i * 34]], { w: 2, col: '#5a4030', a: 0.7, pass2: false });
    lightPool(LAMP[0], 1640, 520, 130, 'rgba(255,214,150,1)', 0.5);
    push(800, 1640, 1); rect(-120, -150, 240, 20, { wash: '#c8b8a0', washA: 1, w: 2, col: L }); pencil([[0, -130], [0, 0]], { w: 8, col: '#3a3a40', pass2: false }); teaGlass(-60, -152, 0.9); teaGlass(10, -152, 0.9); simit(80, -168, 30, {}); pop();
    if (t > EV.td_as - 0.1) { const k = clamp((t - EV.td_as + 0.1) / 0.6); push(lerp(560, 1000, k), lerp(1220, 900, k) - Math.sin(k * Math.PI) * 200, 1, k * 6); simit(0, 0, 16, {}); pop(); }
    gull(1000 + Math.sin(t * 0.9) * 40, 880 + Math.sin(t * 1.7) * 20, 1.4, t, 3050); gull(1150 + Math.sin(t * 1.1) * 30, 760, 1.1, t, 3051);
    castShadow(330, 1612, 120, 420, 0.25, 0.4); moodDark(LAMP[0], 1300, 700, 1600, '#04060e', 0.45);
  }
  function hud(t) {
    if (t > EV.td_16 - 0.05 && t < EV.td_100) { const q = popK(t, EV.td_16 - 0.05, 0.3), n = Math.round(sm(clamp((t - EV.td_16 + 0.05) / 0.9)) * 15754053); push(560, 780, q, -0.02); rect(-280, -70, 560, 140, { wash: '#0a0a1a', washA: 0.92, w: 3, col: IS.turqL }); txt(n.toLocaleString('ru-RU'), 0, -10, 70, { col: IS.goldL, font: 'Osw' }); txt('жителей, 2025', 0, 44, 26, { col: '#e8e0f0', font: 'Osw' }); pop(); }
    for (const [ev, x, s, c] of [[EV.td_eu, 230, 'ЕВРОПА', IS.cobL], [EV.td_as, 860, 'АЗИЯ', IS.turqL]]) if (t > ev - 0.05 && t < EV.td_100 + 0.2) { const q = popK(t, ev - 0.05, 0.3); push(x, 980, q, 0); rect(-130, -40, 260, 80, { wash: '#0a0a1a', washA: 0.85, w: 3, col: c }); txt(s, 0, 2, 50, { col: c, font: 'Osw' }); pop(); }
    if (t > EV.td_100 - 0.05) { const q = popK(t, EV.td_100 - 0.05, 0.35); push(560, 800, q, 0.03); rect(-300, -80, 600, 160, { wash: '#7a1a1a', washA: 0.95, w: 3.4, col: IS.goldL }); txt('ИМЕНИ < 100 ЛЕТ', 0, -14, 64, { col: IS.goldL, font: 'Osw' }); txt('1930 → 2026', 0, 48, 30, { col: '#f6e7c8', font: 'Osw' }); pop(); }
  }
  function front(t) { rect(-200, 1820, 1500, 500, { wash: '#4a3424', washA: 1, w: 2, col: '#0a0604' }); pencil([[-200, 1830], [1300, 1810]], { w: 14, col: '#e8e4dc', pass2: false });
    for (const x of [-30, 1110]) { rect(x - 20, 300, 40, 1600, { wash: '#e8e4dc', washA: 1, w: 2, col: '#3a3a40' }); } rect(-200, 280, 1500, 60, { wash: '#e8e4dc', washA: 1, w: 2, col: '#3a3a40' }); }
  window.TQ = { sky, shores, water, deck, floor, front };
  WORLD.today = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => shores(t));
    lay(8, () => water(t));
    lay(2.6, () => deck(t));
    lay(1, () => { floor(t); cat(); });
    lay(0.6, () => front(t));
    lay(3, () => motes(24, [-100, 600, 1200, 1300], '#c8d8ff', t, 3055, { sp: 2, sz: 2, a: 0.4, wob: 20, add: 1 }));
  };
  DIR.today = {
    outfit: 'hoodieIST', light: { side: -1, rim: '#8ac0ff' }, grade: ['#1a1a40', 0.08],
    act: () => [[S0.today, 'grin'], [EV.td_16, 'awe'], [EV.td_eu, 'proud'], [EV.td_as, 'laugh'], [EV.td_100, 'wink']],
    pose: (t, u, b) => { const th = t > EV.td_as - 0.25 && t < EV.td_as + 0.2, tk = clamp((t - EV.td_as + 0.25) / 0.25);
      return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.td_eu && t < EV.td_as ? [-0.7, -0.4] : t > EV.td_as && t < EV.td_100 ? [0.9, -0.5] : [0.4, -0.2],
        hand: th ? [lerp(150, 260, tk), lerp(-300, -460, tk)] : [150, -300], handF: t > EV.td_eu - 0.1 && t < EV.td_as - 0.3 ? [-220, -420] : undefined, tailUp: t > EV.td_16 }); },
    cam: () => [[S0.today, 600, 1000, -0.02], [EV.td_16, 560, 960, 0.06], [EV.td_eu, 460, 980, 0.04, 'x'], [EV.td_as, 660, 980, 0.04, 'x'], [EV.td_100, 560, 1000, 0.1], [S1.today, 560, 1000, 0.12]],
    afterCat: (t, u, P) => teaGlass(P.x + P.hand[0] * P.s + 6, P.y + P.hand[1] * P.s + 30, 1.2),   // стакан чая в лапе
    hud
  };
  TRANS_IN.today = { a: 0.15, b: 0.35, fx(k, t, A, B) {             // стая чаек проносится через кадр — за ней ночной Босфор
    const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const r = rng(3060); for (let i = 0; i < 60; i++) { const x = lerp(-600, 1700, e) + (r() - 0.5) * 900, y = r() * H; gull(x, y, 1.2 + r() * 2.4, t, i, '#ffffff'); } if (e > 0.3 && e < 0.7) screenFill('#ffffff', 0.4 * Math.sin((e - 0.3) / 0.4 * Math.PI), 'source-over'); });
  } };
})();
