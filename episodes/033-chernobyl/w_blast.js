/* 033 — сцена `blast`, 26.04.1986. Часть 1 (s4): ночь, ЧАЭС — машзал, 3-й и 4-й блоки, красно-белая труба с огнями, ЛЭП, пруд-охладитель,
   вдали огни Припяти. Главный свет — натриевые фонари (жёлтые пятна), после взрыва — оранжевое зарево и столб пара над 4-м блоком.
   Табло-часы «01:23» перещёлкиваются; на «взрывается» — крыша блока раскрывается, вспышка, обломки, искры, тряска (настоящий удар),
   стрелка дозиметра Тома (халат атомщика) зашкаливает, Том закрывается лапой. Часть 2 (s5): облако дыма сворачивается в карту Европы:
   Москва — «МОЛЧИТ», стрелка облака уходит на северо-запад в Швецию, «ФОРСМАРК · 28 АПРЕЛЯ · 1 100 КМ», звенят датчики. Том указкой. */
(() => {
  const L = CH.ink, BX = 760;
  EV.bl_clock = wtk('s4', 'час'); EV.bl_boom = wtk('s4', 'взрывается'); EV.bl_map = LS('s5') - 0.25; EV.bl_mos = wtk('s5', 'Москва'); EV.bl_swe = wtk('s5', 'шведов'); EV.bl_alarm = wtk('s5', 'звенят');
  KEYW.push('блок.', 'шведов', 'датчики.');
  const B = t => clamp((t - EV.bl_boom) / 0.25);
  const BALTIC = [[10, 54], [14, 54], [18, 54.6], [21, 55], [21, 57], [24, 57.4], [24, 59.4], [30, 60], [28.5, 60.6], [22.5, 60.4], [21.4, 63], [25.2, 65.4], [22, 65.9], [17.8, 62.8], [17.2, 60.6], [18.8, 59.6], [16.6, 57.2], [14.2, 55.6], [12.6, 56.2], [10.6, 57.6], [8.4, 57.2], [10.6, 55.6]];
  function sky(t) { const b = B(t); vgrad(-900, 1100, ['#060a18', '#0e1830', lerpC('#1a2a48', '#6a3018', b)], 1); const r = rng(5600); for (let i = 0; i < 70; i++) { ctx.fillStyle = `rgba(255,255,255,${0.5 + 0.4 * Math.sin(t * 3 + i)})`; ctx.fillRect(r() * 1600 - 300, r() * 800, 3, 3); }
    if (b > 0) { glow(BX, 760, 600, 'rgba(255,120,40,1)', 0.35 * b); for (let i = 0; i < 6; i++) { const k = ((t - EV.bl_boom) * 0.4 + i / 6) % 1; ell(BX + Math.sin(i * 2 + t) * 80, 760 - k * 700, 120 + k * 260, 80 + k * 140, { wash: i % 2 ? '#5a3a3a' : '#3a2a30', washA: 0.5 * (1 - k * 0.6), line: false }); } } }
  function far(t) { const b = B(t); hills(1040, 16, '#101a24', 4.1); panel16(140, 1040, 170, 200, t, { col: '#3a4050', lit: 0.4, winCol: '#1a2230' }); panel16(330, 1040, 150, 160, t, { col: '#3a4050', lit: 0.3, winCol: '#1a2230' }); panel16(-60, 1040, 150, 180, t, { col: '#3a4050', lit: 0.35, winCol: '#1a2230' });
    txt('ПРИПЯТЬ', 150, 800, 26, { col: '#6a7a9a', font: 'Osw' }); for (let i = 0; i < 5; i++) { push(560 + i * 180, 1040, 0.5); pencil([[-40, 0], [0, -260], [40, 0]], { w: 4, col: '#2a3040', pass2: false }); pencil([[-60, -200], [60, -200]], { w: 3, col: '#2a3040', pass2: false }); pop(); }
    depthFog(b > 0 ? '#5a2a18' : '#1a2440', 0.06); }
  function plant(t) {                                                // ЧАЭС ночью: блоки 3 и 4, труба, фонари; взрыв на 4-м
    const b = B(t), u = t - EV.bl_boom;
    nppBlock(300, 1220, 0.9, t, { lit: 1, num: '3', stack: false, col: '#7a7e88' });
    push(BX, 1220, 0.9); const c = lerpC('#7a7e88', '#a86a4a', b * 0.5);
    rect(-150, -400, 300, 400, { wash: c, washA: 1, w: 2.4, col: L, shade: { gap: 12, a: 0.14, col: '#2a2a30', ang: 1.5 } }); txt('4', 0, -300, 60, { col: '#3a3a40', font: 'Osw' });
    if (b <= 0) rect(-150, -430, 300, 30, { wash: c, washA: 1, w: 2, col: L });
    else { for (let i = 0; i < 6; i++) { const r = rng(5610 + i), k = clamp(u / 1.2); push(-120 + i * 48 + (r() - 0.5) * 200 * k, -430 - 500 * k * (0.5 + r()) + 400 * k * k, 1, k * (r() - 0.5) * 8); rect(-24, -10, 48, 20, { wash: '#5a5a60', washA: 1, w: 1.6, col: L }); pop(); }
      poly([[-150, -400], [-120, -440], [-60, -410], [0, -460], [70, -400], [150, -430], [150, -400]], { wash: '#3a2a2a', washA: 1, w: 2.4, col: L }); glow(0, -420, 220, 'rgba(255,160,60,1)', 0.55 * b); glow(0, -440, 90, 'rgba(255,240,200,1)', 0.5 * b);
      const col = clamp(u / 0.8); poly([[-40, -430], [-60, -430 - 700 * col], [60, -430 - 700 * col], [40, -430]], { wash: '#a8c8f0', washA: 0.35 * b, line: false }); }
    pop(); ventStack(BX - 200, 1220 - 380, 420, t, { lamp: 1 });
    for (let i = 0; i < 4; i++) { push(-40 + i * 360, 1260, 0.8); pencil([[0, 0], [0, -260]], { w: 6, col: '#3a3a44', pass2: false }); pencil([[0, -260], [40, -270]], { w: 5, col: '#3a3a44', pass2: false }); ell(44, -262, 16, 8, { wash: '#ffd060', washA: 1, line: false }); glow(44, -258, 80, 'rgba(255,200,90,1)', 0.3); pop(); }
    for (let i = 0; i < 3; i++) human(520 + i * 120, 1300, 0.6, t, { body: '#e8ecee', hat: 'cap', hatCol: '#e8ecee', legs: '#c8ccd0', armR: t > EV.bl_boom ? 'wave' : 'hold', flip: i % 2 ? -1 : 1, seed: 5620 + i, face: t > EV.bl_boom ? 'shock' : 'smile' });
    push(1120, 1300, 0.62); rect(-150, -110, 300, 80, { wash: '#c8281e', washA: 1, w: 2, col: L }); rect(60, -150, 90, 120, { wash: '#c8281e', washA: 1, w: 2, col: L }); rect(80, -136, 50, 40, { wash: '#a8c8d8', washA: 1, w: 1.4, col: L }); for (const k of [-90, 90]) ell(k, -26, 28, 28, { wash: '#1e1e22', washA: 1, w: 2, col: L }); if (t > EV.bl_boom + 0.6) glow(100, -160, 40, Math.sin(t * 14) > 0 ? 'rgba(80,140,255,1)' : 'rgba(255,60,40,1)', 0.6); pop();
  }
  function ground(t) {                                               // бетонные плиты, лужи, бухты кабеля, бочки, дозиметр-будка
    const b = B(t); rect(-500, 1340, 2200, 1000, { wash: '#3a4048', washA: 1, w: 2, col: L }); const r = rng(5630);
    for (let i = 0; i < 9; i++) for (let j = 0; j < 4; j++) rect(-400 + i * 230 + (j % 2) * 115, 1360 + j * 150, 230, 150, { wash: lerpC(j % 2 ? '#4a5058' : '#444a52', '#6a4a3a', b * 0.4), washA: 1, w: 1.4, col: '#1a1e24' });
    for (let i = 0; i < 4; i++) { push(-60 + i * 340, 1600 + (i % 2) * 140, 1); blob([[-120, 0], [-80, -26], [90, -28], [130, 0], [60, 20], [-90, 18]], { wash: lerpC('#2a3a5a', '#c86a2a', b), washA: 1, w: 1.6, col: L }); pop(); }
    for (let i = 0; i < 3; i++) { push(1050 + i * 70, 1720 + i * 20, 1); rect(-30, -90, 60, 90, { wash: '#3a6a8a', washA: 1, w: 2, col: L }); pencil([[-30, -60], [30, -60]], { w: 2, col: L, pass2: false }); pop(); }
    push(-80, 1820, 1); ell(0, 0, 80, 80, { wash: '#2a2a30', washA: 1, w: 2.4, col: L }); for (let q = 0; q < 4; q++) pencil(ellPts(0, 0, 30 + q * 12, 30 + q * 12, 0, 0, 30), { w: 4, col: '#c8a040', a: 0.7, pass2: false }); pop();
    lightPool(260, 1640, 600, 160, 'rgba(255,200,100,1)', 0.3); if (b > 0) lightPool(BX, 1500, 1100, 260, 'rgba(255,120,40,1)', 0.35 * b);
    castShadow(360, 1700, 110, 500, b > 0 ? 2.4 : 0.8, 0.35); moodDark(540, 1200, 500, 1500, '#04060c', 0.35);
  }
  function front(t) { for (const x of [-170, 1250]) { sil([[x - 80, 2300], [x - 60, 900], [x + 60, 900], [x + 80, 2300]], '#0a0c12', 1); pencil([[x, 900], [x + (x < 0 ? 300 : -300), 700]], { w: 8, col: '#0a0c12', pass2: false }); } }
  function sparks(t) { if (t < EV.bl_boom) return; const u = t - EV.bl_boom; for (let i = 0; i < 40; i++) { const r = rng(5640 + i), a = -Math.PI / 2 + (r() - 0.5) * 2.4, v = 400 + r() * 700, x = BX + Math.cos(a) * v * u, y = 800 + Math.sin(a) * v * u + 600 * u * u;
      if (u < 2) { ctx.fillStyle = i % 2 ? 'rgba(255,220,120,0.9)' : 'rgba(255,120,40,0.9)'; ctx.fillRect(x, y, 6, 6); } } }
  function clock(t) { if (t < EV.bl_clock - 0.3 || t > EV.bl_map) return; const k = popK(t, EV.bl_clock - 0.3, 0.3); push(600, 1330, k * 0.8); ctx.save(); ctx.fillStyle = 'rgba(10,8,8,0.92)'; ctx.fillRect(-220, -90, 440, 180); ctx.restore();
    const sec = Math.min(40, Math.floor((t - EV.bl_clock) * 18)); txt('01:23:' + String(Math.max(0, sec)).padStart(2, '0'), 0, 4, 96, { col: '#ff4a2a', font: 'Osw' }); txt('26 АПРЕЛЯ 1986', 0, 66, 30, { col: '#fff6e0', font: 'Osw' }); pop(); }
  function map(t) {                                                  // облако → Швеция, Москва молчит
    const k = sm(clamp((t - EV.bl_map) / 0.4)); if (k <= 0) return; scr(() => { ctx.save(); ctx.globalAlpha = k;
      const P = GLOBE.map(560, 1000, 30, 26, 55, { land: '#e2d2a8', sea: '#2a5a8a', seaD: '#183a66' }); GLOBE.fill(CH_UA.map(P), '#f0d070', 0.8); pencil(CH_UA.concat([CH_UA[0]]).map(P), { w: 3, col: L, a: 0.8, pass2: false, gap: false });
      GLOBE.fill(BALTIC.map(P), '#2a5a8a'); pencil(BALTIC.concat([BALTIC[0]]).map(P), { w: 3, col: L, a: 0.6, pass2: false, gap: false });
      for (const [n, ll] of [['ШВЕЦИЯ', [15.5, 62.5]], ['СССР', [36, 58]], ['ПОЛЬША', [19.5, 52]]]) { const [x, y] = P(ll); txt(n, x, y, 40, { col: '#5a3a20', font: 'Osw' }); }
      const [cx, cy] = P(CG.town); trefoil(cx, cy, 26, '#16120c', CH.dos, 1);
      const rk = clamp((t - EV.bl_swe + 0.2) / 0.9); for (let i = 0; i < 14; i++) { const f = i / 14 * rk, x = lerp(cx, P(CG.forsmark)[0], f) + Math.sin(i * 1.7) * 30, y = lerp(cy, P(CG.forsmark)[1], f) + Math.cos(i * 2.3) * 24; ell(x, y, 60 + i * 4, 36 + i * 2, { wash: '#8a8a7a', washA: 0.4, line: false }); }
      GLOBE.route(P, [CG.town, CG.forsmark], rk, { col: '#c8281e', bend: -0.2 });
      const mk = popK(t, EV.bl_mos, 0.3); GLOBE.city(P, CG.moscow[0], CG.moscow[1], 'МОСКВА', { size: 40 }); if (mk > 0) { const [mx, my] = P(CG.moscow); push(mx + 120, my + 80, mk); chLabel(-10, 0, 'МОЛЧИТ', 46, { col: '#ff8a6a' }); pop(); }
      if (rk > 0.95) { const [fx, fy] = P(CG.forsmark); GLOBE.city(P, CG.forsmark[0], CG.forsmark[1], 'ФОРСМАРК', { size: 40, left: true }); if (t > EV.bl_alarm) { const a = (t * 3) % 1; pencil(ellPts(fx, fy, 30 + a * 120, 30 + a * 120, 0, 0, 40), { w: 6, col: '#ff4a2a', a: 1 - a, pass2: false, gap: false }); } }
      if (t > EV.bl_alarm) { const ak = popK(t, EV.bl_alarm, 0.3); push(620, 1330, ak, -0.02); ctx.save(); ctx.fillStyle = 'rgba(16,10,8,0.9)'; ctx.fillRect(-300, -80, 600, 160); ctx.restore(); txt('ШВЕЦИЯ · 28 АПРЕЛЯ', 0, -30, 44, { col: '#ffe08a', font: 'Osw' }); txt('ТРЕВОГА · ЗА 1 100 КМ', 0, 40, 48, { col: '#ff8a6a', font: 'Osw' }); pop(); }
      ctx.restore(); });
  }
  WORLD.blast = (t, u, cat) => {
    lay(40, () => sky(t)); lay(14, () => far(t)); lay(3.6, () => plant(t)); lay(1, () => ground(t)); lay(0.62, () => front(t));
    lay(2.8, () => { motes(16, [-100, 700, 1200, 1500], t > EV.bl_boom ? '#ffb060' : '#c8d4f0', t, 5650, { sp: t > EV.bl_boom ? -8 : 2, sz: 3, a: 0.5, wob: 10, add: 1 }); sparks(t); });
    map(t); lay(1, () => cat());
  };
  DIR.blast = {
    outfit: 'atomCH', light: { side: 1, rim: '#ffb060' }, grade: ['#1a1020', 0.06],
    act: () => [[S0.blast, 'suspicious'], [EV.bl_clock, 'neutral'], [EV.bl_boom, 'shock'], [EV.bl_boom + 0.6, 'scared'], [EV.bl_mos, 'annoyed'], [EV.bl_swe, 'sideeye'], [EV.bl_alarm, 'smug']],
    pose: (t, u, b) => { const mp = t > EV.bl_map; return Object.assign(b, { x: mp ? 200 : 330, y: mp ? 1820 : 1700, s: mp ? 0.8 : 0.95, look: mp ? [0.6, -0.6] : t < EV.bl_boom ? [0.5, -0.4] : [0.7, -0.7],
      hand: !mp && t > EV.bl_boom && t < EV.bl_boom + 1.2 ? [60, -360] : [150, -310], point: mp, squash: t > EV.bl_boom && t < EV.bl_boom + 0.3 ? 0.08 : b.squash, sweat: t > EV.bl_boom && !mp, light: { side: 1, rim: t > EV.bl_boom && !mp ? '#ff8a3a' : '#ffd890' } }); },
    afterCat: (t, u, P) => { if (t < EV.bl_map) dosimeter(P.x - 90 * P.s, P.y - 240 * P.s, 0.8, t, { needle: t > EV.bl_boom ? 1.2 + Math.sin(t * 30) * 0.1 : -0.6, blink: t > EV.bl_boom }); },
    hud: t => clock(t),
    cam: () => [[S0.blast, 600, 1000, -0.1], [EV.bl_clock, 620, 980, -0.06], [EV.bl_boom, 700, 900, 0.02, 'x'], [EV.bl_map - 0.01, 680, 880, 0.06], [EV.bl_map, 540, 960, 0], [S1.blast, 540, 960, 0]]
  };
  SHAKES.push([EV.bl_boom, 0.6, 22]);
  TRANS_IN.blast = { a: 0.1, b: 0.3, fx(k, t, A, B) { const e = sm(k); if (e < 0.5) { drawBuf(A); whiteOut(e * 2 * 0.95, '6,8,16'); } else { drawBuf(B); whiteOut((1 - e) * 2 * 0.95, '6,8,16'); } } };
})();
