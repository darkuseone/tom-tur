/* 035 — сцена `yugo`, 1918. Подгорица, ноябрь: дождливая площадь, Скупщина (собрание) у здания, люди с зонтами, жандармы, телега,
   афиши на стене; дворец короля Николы пустует (король в изгнании). Главный свет — серый пасмурный, тёплые окна собрания.
   На «исчезла» — карта: красная Черногория растворяется в большой Югославии (Королевство СХС), табличка «ЧЕРНОГОРИЯ» падает со стены;
   на «Война без страны» — плашка-шутка: досье «ВОЙНА С ЯПОНИЕЙ: СТОРОНА — НЕТ». Том (сюртук) держит зонт и снимает шляпу. */
(() => {
  const L = MEC.ink;
  EV.yg_gone = wtk('s6', 'исчезла'); EV.yg_map = EV.yg_gone - 0.2; EV.yg_joke = wtk('s6', 'Война');
  KEYW.push('Югославии.', 'страны.');
  function sky(t) { vgrad(-900, 1100, ['#4a525e', '#7a828e', '#a8a8ac'], 1); for (let i = 0; i < 6; i++) { const y = 240 + i * 80, dx = (t * 18 + i * 50) % 260; blob([[-260 + dx, y], [300 + dx, y - 30], [900 + dx, y - 10], [1300, y + 16], [300, y + 30]], { wash: i % 2 ? '#5a6068' : '#8a8e94', washA: 0.8, line: false }); } }
  function far(t) { blackMountain(-400, 1600, 1060, 320, t, 9900, { col: '#4a5048', forest: '#2a3028', trees: 24 }); depthFog('#9aa0a8', 0.08); }
  function square(t) {                                              // здание собрания, дворец, люди с зонтами, афиши, телега
    push(700, 1230, 1); rect(-260, -300, 520, 300, { wash: '#d8ccb4', washA: 1, w: 2.4, col: L, shade: { gap: 10, a: 0.1, col: MEC.stoneD, ang: 0.4 } }); poly([[-280, -300], [0, -380], [280, -300]], { wash: '#7a4a3a', washA: 1, w: 2, col: L });
    for (let i = 0; i < 5; i++) rect(-220 + i * 92, -250, 50, 80, { wash: '#ffd890', washA: 1, w: 1.4, col: L }); rect(-50, -140, 100, 140, { wash: '#4a3a2a', washA: 1, w: 2, col: L });
    const fall = clamp((t - EV.yg_gone) / 0.6); push(0, -330 + fall * 300, 1, fall * 1.4); rect(-110, -24, 220, 48, { wash: '#f0e8d0', washA: 1, w: 2, col: L }); txt('ЧЕРНОГОРИЯ', 0, 4, 28, { col: MEC.red, font: 'Osw' }); pop(); pop();
    for (let i = 0; i < 3; i++) { const r = rng(9910 + i); stoneHouse(-200 + i * 230 + (i > 1 ? 800 : 0), 1230, 180 + r() * 40, 140 + r() * 60, t, { dark: 1, col: '#a8a090' }); }
    const P = [[120, '#3a3a44'], [220, '#1a1a1e'], [330, '#5a4a3a'], [960, '#3a4a5a'], [1060, '#1a1a1e'], [1160, '#5a3a3a']];
    P.forEach(([x, c], i) => { human(x, 1320, 0.68, t, { body: c, hat: i % 2 ? 'fez' : 'scarf', hatCol: i % 2 ? MEC.red : '#1a1a1e', legs: '#2a2a2a', long: i % 2 ? undefined : 1, armR: 'hold', flip: x > 600 ? -1 : 1, seed: 9920 + i, face: t > EV.yg_gone ? 'shock' : 'calm' }); push(x + 30, 1320 - 260 * 0.68, 0.68); pencil([[0, 0], [0, -120]], { w: 4, col: '#2a2a2a', pass2: false }); blob([[-80, -110], [0, -170], [80, -110]], { wash: '#1a1a1e', washA: 1, w: 1.6, col: L }); pop(); });
    push(-60, 1330, 0.6); horse(0, 0, 1, t, { col: '#4a3a2a', seed: 9 }); rect(110, -150, 200, 90, { wash: '#5a4a3a', washA: 1, w: 2, col: L }); ell(150, -40, 40, 40, { wash: false, w: 5, col: '#2a1a10' }); pop();
  }
  function ground(t) {                                              // мокрая брусчатка, лужи с кругами от капель, листовки
    rect(-500, 1340, 2200, 1000, { wash: '#6a6a6e', washA: 1, w: 2, col: L }); const r = rng(9930); for (let i = 0; i < 110; i++) ell(r() * 2000 - 400, 1360 + r() * 700, 14 + r() * 14, 7 + r() * 5, { wash: i % 2 ? '#5a5a5e' : '#8a8a8e', washA: 1, w: 1, col: L, a: 0.45 });
    for (let i = 0; i < 3; i++) { const x = 220 + i * 380, y = 1700 + (i % 2) * 120; push(x, y, 1); blob([[-120, 0], [-80, -24], [100, -26], [130, 0], [60, 18], [-90, 16]], { wash: '#8a96a8', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 2; q++) { const ph = (t * 1.5 + q * 0.5 + i) % 1; pencil(ellPts(-20 + q * 50, -4, 6 + ph * 30, 3 + ph * 12, 0, 0, 20), { w: 2, col: '#e8f0fa', a: 1 - ph, pass2: false, gap: false }); } pop(); }
    for (let i = 0; i < 6; i++) { push(700 + i * 70, 1880 - i * 12, 1, i * 0.7); rect(-30, -20, 60, 40, { wash: '#e8e4d8', washA: 1, w: 1.2, col: L }); pop(); }
    lightPool(700, 1520, 600, 140, 'rgba(255,224,160,1)', 0.22); castShadow(400, 1720, 110, 380, 1.4, 0.25); moodDark(540, 1200, 500, 1500, '#101214', 0.3);
  }
  function extras(t) {                                              // жандарм, мальчишка-газетчик, бродячая собака, фонарь
    push(-60, 1540, 0.9); human(0, 0, 1, t, { body: '#2a3a2a', hat: 'police', hatCol: '#2a3a2a', legs: '#1a1a1a', armR: 'hold', prop: 'spear', seed: 9940, face: 'calm' }); pop();
    push(1180, 1540, 0.85); human(0, 0, 0.8, t, { body: '#5a4a3a', hat: 'cap', hatCol: '#3a3a3a', legs: '#3a2a2a', armR: 'wave', flip: -1, seed: 9941, face: 'grin' }); rect(-60, -190, 60, 40, { wash: '#f0e8d0', washA: 1, w: 1.2, col: L }); pop();
    push(1020, 1580, 0.8, 0, -1); blob([[-50, -10], [-40, -50], [30, -54], [56, -36], [50, -10]], { wash: '#8a7a5a', washA: 1, w: 2, col: L }); ell(66, -54, 20, 16, { wash: '#8a7a5a', washA: 1, w: 1.6, col: L }); for (const lx of [-30, -14, 26, 40]) pencil([[lx, -14], [lx, 14]], { w: 6, col: '#5a4a3a', pass2: false }); pop();
    push(300, 1500, 0.9); pencil([[0, 0], [0, -380]], { w: 6, col: '#2a2a2e', pass2: false }); rect(-26, -440, 52, 60, { wash: '#ffd890', washA: 1, w: 2, col: L }); glow(0, -410, 50, 'rgba(255,210,130,1)', 0.3); pop();
  }
  function front(t) { for (const x of [-170, 1250]) { rect(x - 80, 500, 160, 1900, { wash: '#7a7268', washA: 1, w: 2.4, col: L, shade: { gap: 12, a: 0.2, col: '#2a2a28', ang: 0 } }); } }
  function rain(t) { const r = rng(hsh(FRAME, 9950)); for (let i = 0; i < 70; i++) { const x = r() * 1500 - 200, y = r() * 2000; pencil([[x, y], [x - 10, y + 50]], { w: 2, col: '#c8d4e4', a: 0.5, pass2: false, gap: false }); } }
  function map(t) { if (t < EV.yg_map || t > EV.yg_joke - 0.1) return; const k = sm(clamp((t - EV.yg_map) / 0.3)); scr(() => { ctx.save(); ctx.globalAlpha = k; const P = GLOBE.map(540, 980, 120, 18.5, 43.6, { land: '#e2d4ac', sea: '#2a5a8a', seaD: '#183a66' });
      GLOBE.fill(ADRIA.map(P), '#2a5a8a'); const f = sm(clamp((t - EV.yg_gone) / 0.9)); GLOBE.fill(YU_POLY.map(P), '#5a7a9a', f * 0.85); pencil(YU_POLY.concat([YU_POLY[0]]).map(P), { w: 5, col: L, a: f, pass2: false, gap: false });
      GLOBE.fill(ME_POLY.map(P), MEC.red, 1 - f * 0.8); const [x, y] = P([19.2, 42.8]); txt('ЧЕРНОГОРИЯ', x, y - 120, 40, { col: MEC.red, font: 'Osw', a: 1 - f }); const [yx, yy] = P([18.5, 44.9]); txt('КОРОЛЕВСТВО СХС', yx, yy, 50, { col: '#14203a', font: 'Osw', a: f }); txt('(ЮГОСЛАВИЯ)', yx, yy + 60, 40, { col: '#14203a', font: 'Osw', a: f }); ctx.restore(); }); }
  function extras2(t) {                                             // торговки с корзинами под навесом, вывеска лавки, голуби
    push(900, 1500, 0.8); poly([[-160, -240], [160, -240], [190, -200], [-190, -200]], { wash: '#5a6a5a', washA: 1, w: 2, col: L }); for (const k of [-150, 150]) pencil([[k, -200], [k, 0]], { w: 5, col: '#4a3a2a', pass2: false });
    for (let i = 0; i < 2; i++) { human(-70 + i * 140, 0, 0.9, t, { body: ['#3a2a2a', '#1a1a1e'][i], hat: 'scarf', hatCol: '#1a1a1e', legs: '#2a2a2a', long: 1, armR: 'hold', seed: 9960 + i, face: 'calm' }); push(-30 + i * 140, -120, 0.8); blob([[-40, 0], [-34, -50], [34, -50], [40, 0]], { wash: '#a8905a', washA: 1, w: 1.4, col: L }); for (let q = 0; q < 3; q++) ell(-20 + q * 20, -54, 10, 10, { wash: ['#c83a2a', '#e8b030', '#6aa040'][q], washA: 1, w: 1, col: L }); pop(); } pop();
    for (let i = 0; i < 4; i++) { const gx = 560 + i * 50 + Math.sin(t * 2 + i) * 10; push(gx, 1600, 0.5); blob([[-24, 0], [-16, -26], [16, -28], [26, -10], [10, 4]], { wash: '#7a7e8a', washA: 1, w: 1.4, col: L }); pop(); }
  }
  WORLD.yugo = (t, u, cat) => {
    lay(40, () => sky(t)); lay(15, () => far(t)); lay(3.2, () => square(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => ground(t)); lay(0.62, () => front(t)); lay(1.4, () => rain(t));
    map(t); lay(1, () => cat());
  };
  DIR.yugo = {
    outfit: 'victorian', light: { side: 1, rim: '#d0d8e4' }, grade: ['#1a2028', 0.08],
    act: () => [[S0.yugo, 'neutral'], [EV.yg_gone, 'shock'], [EV.yg_joke, 'sideeye']],
    pose: (t, u, b) => { const mp = t > EV.yg_map && t < EV.yg_joke - 0.1; return Object.assign(b, { x: mp ? 190 : 360, y: mp ? 1840 : 1720, s: mp ? 0.78 : 0.95, look: mp ? [0.6, -0.6] : [0.4, -0.3], hand: [150, -340], point: mp, prop: mp ? undefined : 'lantern' }); },
    hud: t => { if (t > EV.yg_joke - 0.1) meBoard(640, 1000, 0.85, t, EV.yg_joke - 0.1, [['ВОЙНА С ЯПОНИЕЙ', 46, MEC.gold], ['СТОРОНА: —', 54, '#ff8a6a']], { w: 500 }); },
    cam: () => [[S0.yugo, 600, 1000, -0.08], [EV.yg_map - 0.01, 620, 980, -0.04], [EV.yg_map, 540, 960, 0], [EV.yg_joke - 0.11, 540, 960, 0], [EV.yg_joke - 0.1, 560, 1020, -0.02], [S1.yugo, 520, 1080, 0.06]]
  };
  TRANS_IN.yugo = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.drawImage(A, 0, 0); ctx.restore(); }); whiteOut(Math.sin(e * Math.PI) * 0.4, '90,96,104'); } };
})();
