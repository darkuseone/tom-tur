/* 034 — сцена `empire`, XV век. Тракайский замок из красного кирпича на острове посреди озера, ладьи, мост, стража, купцы с янтарём,
   рыбаки, лебеди. Главный свет — тёплое утреннее солнце справа, блики на воде. На «раздулась» кадр уходит в карту: от крошечной Литвы
   янтарь заливает всё до Чёрного моря (граница ВКЛ ≈ 1430); на «четырнадцать» — плашка-сравнение «ВКЛ ≈ 930 000 КМ² / ЛИТВА 65 300 КМ² /
   × 14» с полосами. Том (княжий кафтан) на карте указывает от Балтики до Чёрного моря. */
(() => {
  const L = LTC.ink, SUN = [920, 520];
  EV.em_puff = wtk('s3', 'раздулась'); EV.em_map = wtk('s3', 'Балтики') - 0.3; EV.em_grow = EV.em_map + 0.1; EV.em_sea = wtk('s3', 'Чёрного'); EV.em_14 = wtk('s3', 'четырнадцать');
  KEYW.push('раздулась', 'нынешней.');
  function sky(t) { vgrad(-900, 1100, ['#5a8ad0', '#a8c8e8', '#f8e4c0'], 1); glow(SUN[0], SUN[1], 220, 'rgba(255,230,170,1)', 0.42); ell(SUN[0], SUN[1], 50, 50, { wash: '#fff6d8', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const y = 280 + i * 80, dx = (t * 9) % 200; blob([[-200 + dx, y], [300 + dx, y - 22], [900 + dx, y - 6], [1300, y + 12], [400, y + 18]], { wash: '#fff8ec', washA: 0.5, line: false }); } }
  function far(t) { hills(1000, 30, '#5a7a4a', 6.1); for (let i = 0; i < 14; i++) { const r = rng(7500 + i); oak(-200 + i * 110 + r() * 40, 1010, 130 + r() * 50, t, 60 + i, { col: '#3a6a3a', colL: '#6a9a48' }); } depthFog('#f4ead8', 0.07); }
  function castle(t) {                                              // Тракай: остров, стены, донжон, башни, мост, лодки
    rect(-600, 1080, 2400, 200, { wash: '#3a8aa8', washA: 1, line: false }); vgrad(1080, 1280, ['#8ad0e0', '#3a8aa8', '#1e5a78'], 0.7);
    for (let i = 0; i < 18; i++) { const r = rng(7510 + i), x = ((r() * 1600 + t * 20) % 1800) - 300; pencil([[x, 1100 + r() * 160], [x + 50, 1100 + r() * 160]], { w: 2.4, col: '#e8fbff', a: 0.5, pass2: false }); }
    blob([[200, 1140], [300, 1080], [900, 1070], [1100, 1120], [900, 1160], [300, 1170]], { wash: '#6a8a4a', washA: 1, w: 2, col: L });
    push(640, 1110, 1); rect(-320, -180, 640, 180, { wash: LTC.brick, washA: 1, w: 2.4, col: L, shade: { gap: 9, a: 0.18, col: '#5a1a0a', ang: 0 } }); for (let i = 0; i < 16; i++) rect(-320 + i * 40, -200, 24, 22, { wash: LTC.brick, washA: 1, w: 1.4, col: L });
    for (const d of [-1, 1]) { rect(d * 320 - 50, -300, 100, 300, { wash: '#a84a2a', washA: 1, w: 2.2, col: L, shade: { gap: 8, a: 0.2, col: '#4a1a0a', ang: 0 } }); poly([[d * 320 - 60, -300], [d * 320, -400], [d * 320 + 60, -300]], { wash: '#6a2a1a', washA: 1, w: 2, col: L }); rect(d * 320 - 14, -250, 28, 40, { wash: '#2a2a30', washA: 1, w: 1.2, col: L }); }
    rect(-90, -440, 180, 440, { wash: '#b8583a', washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.2, col: '#4a1a0a', ang: 0 } }); poly([[-110, -440], [0, -560], [110, -440]], { wash: '#6a2a1a', washA: 1, w: 2.2, col: L }); for (let i = 0; i < 3; i++) rect(-20, -400 + i * 110, 40, 56, { wash: '#ffd890', washA: 1, w: 1.4, col: L });
    pencil([[0, -560], [0, -640]], { w: 4, col: '#4a3a2a', pass2: false }); pop();
    for (let i = 0; i < 6; i++) { const x = -200 + i * 30; pencil([[x, 1160], [x + 40, 1120]], { w: 5, col: '#6a4a2a', pass2: false }); } pencil([[-260, 1150], [260, 1120]], { w: 10, col: '#8a5a32', pass2: false });
    for (let i = 0; i < 2; i++) { const bx = ((t * 30 + i * 500) % 1600) - 200; push(bx, 1220, 0.7); blob([[-120, 0], [-90, 26], [90, 26], [120, 0]], { wash: '#6a4a2a', washA: 1, w: 2, col: L }); pencil([[0, 0], [0, -180]], { w: 4, col: '#4a3a2a', pass2: false }); poly([[0, -170], [90, -60], [0, -40]], { wash: '#f0e8d0', washA: 1, w: 1.6, col: L }); human(-50, 6, 0.5, t, { body: '#5a6a8a', hat: 'fur', hatCol: '#4a3020', legs: '#3a2a1a', armR: 'hold', prop: 'oar', seed: 7520 + i }); pop(); }
    for (let i = 0; i < 3; i++) { const sx = 300 + i * 120 + Math.sin(t + i) * 30; push(sx, 1180, 0.5); blob([[-30, 0], [-20, -20], [20, -24], [34, 0]], { wash: '#ffffff', washA: 1, w: 1.4, col: L }); pencil([[20, -20], [30, -60], [44, -64]], { w: 6, col: '#ffffff', pass2: false }); pop(); }
  }
  function people(t) { const P = [[60, '#a83a2a', 'fur', 'hold'], [160, '#3a5a8a', 'helmet', 'hold', 'spear'], [880, '#6a5a3a', 'merchant', 'wave'], [980, '#c8944a', 'scarf', 'hold'], [1100, '#3a5a8a', 'helmet', 'hold', 'spear']];
    P.forEach(([x, c, h, a, pr], i) => human(x, 1330, 0.7, t, { body: c, hat: h, hatCol: '#6a3a1a', legs: '#3a2a1a', armR: a, prop: pr, long: h === 'scarf' ? 1 : undefined, flip: x > 600 ? -1 : 1, seed: 7530 + i, face: 'smile' })); }
  function ground(t) {                                              // берег: песок, мостки, сети, корзины янтаря, бочки
    rect(-500, 1320, 2200, 1000, { wash: '#c8b48a', washA: 1, w: 2, col: L }); const r = rng(7540); for (let i = 0; i < 70; i++) ell(r() * 2000 - 400, 1340 + r() * 700, 8 + r() * 10, 4 + r() * 4, { wash: i % 2 ? '#a8946a' : '#e0d0a8', washA: 1, w: 1, col: L, a: 0.4 });
    for (let i = 0; i < 8; i++) rect(-200 + i * 70, 1380, 60, 18, { wash: '#8a5a32', washA: 1, w: 1.6, col: L });
    for (let i = 0; i < 3; i++) { push(900 + i * 110, 1700 + i * 30, 1); blob([[-46, 0], [-40, -56], [40, -56], [46, 0]], { wash: '#c89a5a', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.3, col: '#6a4a1a', ang: 0.8 } }); for (let q = 0; q < 4; q++) ell(-24 + q * 16, -60, 10, 13, { wash: q % 2 ? LTC.amber : LTC.amberL, washA: 1, w: 1, col: LTC.amberD }); pop(); }
    for (let i = 0; i < 8; i++) pencil([[-300 + i * 40, 1800], [-260 + i * 40, 1700]], { w: 2, col: '#5a4a3a', a: 0.6, pass2: false }); for (let i = 0; i < 4; i++) pencil([[-300, 1700 + i * 30], [20, 1700 + i * 30]], { w: 2, col: '#5a4a3a', a: 0.6, pass2: false });
    push(-60, 1900, 1); rect(-50, -90, 100, 90, { wash: '#8a5a32', washA: 1, w: 2, col: L }); pop();
    lightPool(700, 1620, 900, 180, 'rgba(255,230,170,1)', 0.3); castShadow(420, 1700, 110, 520, -2.6, 0.3); moodDark(100, 1000, 900, 1900, '#1a2a10', 0.14);
  }
  function front(t) { for (const x of [-150, 1240]) { pencil([[x, 2300], [x, 700]], { w: 24, col: '#4a3424', pass2: false }); for (let i = 0; i < 4; i++) ell(x + (i - 1.5) * 100, 680 - i * 20, 120, 70, { wash: '#2e5a2a', washA: 1, w: 1.4, col: '#14200e' }); } reeds(-200, 140, 2000, t, 7550); }
  function reeds(x0, x1, base, t, seed) { const r = rng(seed); for (let x = x0; x < x1; x += 14) { const h = 50 + r() * 60, s = Math.sin(t * 2 + x * 0.05) * 8; pencil([[x, base], [x + s, base - h]], { w: 3, col: '#8aa04a', pass2: false }); } }
  function map(t) {                                                 // янтарь заливает ВКЛ до Чёрного моря + сравнение площадей
    const k = sm(clamp((t - EV.em_map) / 0.35)); if (k <= 0) return; scr(() => { ctx.save(); ctx.globalAlpha = k; const P = ltMapBase(t, { k: 52, lon: 28.5, lat: 51.2 });
      const g = sm(clamp((t - EV.em_grow) / 1.3)); ctx.save(); const [cx, cy] = P(LTG.vilnius); ctx.beginPath(); ctx.arc(cx, cy, 40 + g * 1100, 0, 6.283); ctx.clip(); ltZone(P, GDL, LTC.amber, 0.85); ctx.restore();
      ltZone(P, LT_NOW, LTC.yel, 1, { w: 3 }); txt('ЛИТВА', P([24.2, 55.3])[0], P([24.2, 55.3])[1], 34, { col: LTC.ink, font: 'Osw' }); if (g > 0.6) { const [x, y] = P([30.5, 51.0]); txt('ВЕЛИКОЕ КНЯЖЕСТВО', x, y, 44, { col: LTC.amberD, font: 'Osw' }); txt('ЛИТОВСКОЕ', x, y + 50, 44, { col: LTC.amberD, font: 'Osw' }); }
      for (const [n, ll] of [['ВИЛЬНЮС', LTG.vilnius], ['КИЕВ', LTG.kyiv]]) GLOBE.city(P, ll[0], ll[1], n, { size: 30 });
      if (t > EV.em_14) { const b = popK(t, EV.em_14, 0.3), f = sm(clamp((t - EV.em_14) / 0.8)); push(600, 1130, b * 0.9); ctx.save(); ctx.fillStyle = 'rgba(16,14,12,0.92)'; ctx.fillRect(-330, -130, 660, 260); ctx.restore();
        txt('ВКЛ ≈ 930 000 КМ²', -40, -80, 40, { col: LTC.amberL, font: 'Osw' }); rect(-300, -50, 560 * f, 34, { wash: LTC.amber, washA: 1, w: 2, col: '#000' }); txt('ЛИТВА СЕГОДНЯ 65 300 КМ²', -40, 20, 36, { col: '#fff6e0', font: 'Osw' }); rect(-300, 44, 40 * f, 34, { wash: LTC.yel, washA: 1, w: 2, col: '#000' }); txt('× 14', 230, 80, 80, { col: '#ff8a6a', font: 'Osw' }); pop(); }
      ctx.restore(); });
  }
  WORLD.empire = (t, u, cat) => {
    lay(40, () => sky(t)); lay(15, () => far(t)); lay(4.2, () => castle(t)); lay(2.4, () => people(t)); lay(1, () => ground(t)); lay(0.62, () => front(t));
    lay(2, () => motes(14, [-100, 800, 1200, 1700], '#fff6d0', t, 7560, { sp: 2, sz: 2.4, a: 0.4, wob: 14, add: 1 }));
    map(t); lay(1, () => cat());
  };
  DIR.empire = {
    outfit: 'knyaz', light: { side: 1, rim: '#ffe0a0' }, grade: ['#3a2a10', 0.04],
    act: () => [[S0.empire, 'proud'], [EV.em_puff, 'laugh'], [EV.em_grow, 'awe'], [EV.em_sea, 'grin'], [EV.em_14, 'smug']],
    pose: (t, u, b) => { const mp = t > EV.em_map; return Object.assign(b, { x: mp ? 190 : 360, y: mp ? 1840 : 1700, s: mp ? 0.78 : 0.95, look: mp ? [0.6, -0.7] : [0.6, -0.4], hand: [150, -320], point: mp, prop: mp ? undefined : 'scroll' }); },
    cam: () => [[S0.empire, 620, 980, -0.08], [EV.em_map - 0.01, 640, 960, -0.02], [EV.em_map, 540, 960, 0], [S1.empire, 540, 960, 0]]
  };
  TRANS_IN.empire = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.translate(540, 960); ctx.scale(1 + e * 0.4, 1 + e * 0.4); ctx.translate(-540, -960); ctx.drawImage(A, 0, 0); ctx.restore(); ctx.save(); ctx.globalAlpha = 0.45 * Math.sin(e * Math.PI); ctx.fillStyle = LTC.amber; ctx.fillRect(0, 0, W, H); ctx.restore(); }); } };
})();
