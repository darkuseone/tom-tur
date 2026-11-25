/* 035 — сцена `berlin`, 1878. Зал Берлинского конгресса: дипломаты во фраках и мундирах за длинным столом с зелёным сукном, огромная
   карта Балкан на стене, хрустальные люстры, высокие окна, лакеи с подносами, писари. Главный свет — окна справа (холодный дневной)
   + тёплые люстры. На «признала» председатель бьёт молотком, писарь ставит печать; на «независимой» на карте Черногория заливается
   красным, плашка «1878 · БЕРЛИНСКИЙ КОНГРЕСС · НЕЗАВИСИМА»; Том (сюртук, цилиндр) поднимает бокал. */
(() => {
  const L = MEC.ink, WIN = [1100, 600];
  EV.bl_rec = wtk('s3', 'признала'); EV.bl_ind = wtk('s3', 'независимой'); EV.bl_con = wtk('s3', 'Берлинском');
  KEYW.push('независимой', 'конгрессе.');
  function hall(t) {                                                // стены, окна, карта Балкан, люстры
    rect(-600, 200, 2400, 1200, { wash: '#7a3a34', washA: 1, w: 2, col: L, shade: { gap: 14, a: 0.06, col: '#3a1010', ang: 1.4 } }); vgrad(200, 1400, ['#4a2420', '#8a4a40', '#6a3430'], 0.5);
    for (let i = 0; i < 2; i++) { push(980 + i * 260, 700, 1); rect(-80, -320, 160, 460, { wash: '#c8d8e8', washA: 1, w: 3, col: L }); for (let q = 0; q < 3; q++) pencil([[-80, -320 + q * 150], [80, -320 + q * 150]], { w: 3, col: L, pass2: false }); pencil([[0, -320], [0, 140]], { w: 3, col: L, pass2: false }); rect(-110, -360, 220, 50, { wash: MEC.gold, washA: 1, w: 2, col: L }); pop(); }
    push(440, 760, 1); rect(-330, -260, 660, 440, { wash: '#e8dcb4', washA: 1, w: 6, col: '#5a3a1a' }); const P = ([lo, la]) => [(lo - 21) * 70, -(la - 43) * 95];
    GLOBE.fill(ADRIA.map(P), '#5a9ac8'); const f = sm(clamp((t - EV.bl_ind) / 0.6)); GLOBE.fill(ME_POLY.map(P), f > 0 ? lerpC('#c8b890', MEC.red, f) : '#c8b890'); pencil(ME_POLY.concat([ME_POLY[0]]).map(P), { w: 3, col: L, pass2: false, gap: false });
    for (const [n, ll] of [['ЧЕРНОГОРИЯ', [19.4, 42.9]], ['СЕРБИЯ', [21.2, 44.0]], ['ОСМ. ИМПЕРИЯ', [22.0, 41.8]], ['АВСТРО-ВЕНГРИЯ', [17.5, 44.4]]]) { const [x, y] = P(ll); txt(n, x, y, n === 'ЧЕРНОГОРИЯ' ? 30 : 24, { col: L, font: 'Osw' }); } pop();
    for (const x of [300, 820]) { push(x, 330, 1); pencil([[0, -130], [0, 0]], { w: 3, col: MEC.gold, pass2: false }); ell(0, 0, 120, 30, { wash: false, w: 5, col: MEC.gold }); for (let i = 0; i < 7; i++) { const cx = -100 + i * 33; pencil([[cx, -4], [cx, -34]], { w: 6, col: '#f4efe4', pass2: false }); blob([[cx - 4, -34], [cx, -48 - Math.sin(t * 9 + i) * 3], [cx + 4, -34]], { wash: '#ffd060', washA: 1, line: false }); } glow(0, -30, 120, 'rgba(255,214,140,1)', 0.25); pop(); }
  }
  function table(t) {                                               // стол с сукном, дипломаты, председатель, писарь, лакей
    rect(-300, 1150, 1700, 70, { wash: '#2a5a3a', washA: 1, w: 2.4, col: L }); rect(-300, 1220, 1700, 30, { wash: '#5a3a1a', washA: 1, w: 2, col: L });
    const D = [[-120, '#1a1a1e', 'brim'], [20, '#2a3a5a', 'helmet'], [160, '#1a1a1e', null], [620, '#3a2a2a', 'fez'], [760, '#1a1a1e', null], [900, '#4a2a5a', 'brim'], [1040, '#1a1a1e', null]];
    D.forEach(([x, c, h], i) => human(x, 1170, 0.66, t, { body: c, bodyD: '#08080a', hat: h, hatCol: h === 'fez' ? '#c8281e' : '#1a1a1e', legs: '#1a1a1e', armR: t > EV.bl_ind && i % 2 ? 'wave' : 'hold', flip: x > 500 ? -1 : 1, seed: 9600 + i, face: t > EV.bl_ind ? 'grin' : 'calm', beard: i % 3 === 0 ? 1 : undefined }));
    push(400, 1170, 0.72); human(0, 0, 1, t, { body: '#1a1a1e', hat: null, legs: '#1a1a1e', armR: t > EV.bl_rec ? 'wave' : 'hold', seed: 9610, face: 'calm', beard: 1 }); const hit = t > EV.bl_rec && t < EV.bl_rec + 0.3; push(60, -260 + (hit ? 40 : 0), 1, hit ? 0.6 : -0.3); rect(-12, -50, 24, 80, { wash: '#6a4a2a', washA: 1, w: 1.6, col: L }); rect(-30, -70, 60, 30, { wash: '#6a4a2a', washA: 1, w: 1.6, col: L }); pop(); pop();
    for (let i = 0; i < 6; i++) rect(-200 + i * 260, 1130, 90, 20, { wash: '#f4efe4', washA: 1, w: 1.2, col: L });
  }
  function floor_(t) {                                              // паркет ёлочкой, ковёр, кресла, лакей с подносом, глобус на подставке
    rect(-500, 1360, 2200, 1000, { wash: '#8a5a32', washA: 1, w: 2, col: L }); for (let i = 0; i < 24; i++) for (let j = 0; j < 8; j++) pencil([[-400 + i * 80 + (j % 2) * 40, 1380 + j * 80], [-360 + i * 80 + (j % 2) * 40, 1420 + j * 80]], { w: 2, col: '#5a3a1a', a: 0.5, pass2: false });
    push(640, 1720, 1); ell(0, 0, 460, 80, { wash: '#8a1a1a', washA: 0.9, w: 2, col: L }); ell(0, 0, 380, 60, { wash: false, w: 4, col: MEC.gold }); pop();
    push(1100, 1800, 1); human(0, 0, 0.95, t, { body: '#e8e4d8', bodyD: '#8a8478', legs: '#1a1a1e', armR: 'hold', flip: -1, seed: 9620, face: 'calm' }); ell(-60, -280, 70, 12, { wash: '#c8ccd4', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) blob([[-90 + q * 30, -290], [-94 + q * 30, -330], [-76 + q * 30, -330], [-80 + q * 30, -290]], { wash: '#f4f0c0', washA: 0.8, w: 1.4, col: L }); pop();
    push(-60, 1740, 1); pencil([[0, 0], [0, -120]], { w: 6, col: '#5a3a1a', pass2: false }); ell(0, -170, 60, 60, { wash: '#c8b890', washA: 1, w: 2, col: L }); pencil([[-60, -170], [60, -170]], { w: 2, col: L, pass2: false }); pencil(ellPts(0, -170, 30, 60, 0, 0, 20), { w: 2, col: L, pass2: false }); pop();
    lightPool(WIN[0] - 300, 1600, 900, 200, 'rgba(220,234,255,1)', 0.25); castShadow(380, 1700, 110, 460, 2.4, 0.3); moodDark(100, 1000, 800, 1900, '#1a0808', 0.2);
  }
  function extras(t) {                                              // писарь с пером, газетчик, собака посла, часы-напольные
    push(-80, 1520, 0.9); rect(-80, -110, 160, 20, { wash: '#5a3a1a', washA: 1, w: 2, col: L }); human(0, 0, 0.9, t, { body: '#3a3a44', legs: '#1a1a1e', armR: 'hold', seed: 9630, face: 'calm' }); rect(20, -140, 70, 26, { wash: '#f0e8d0', washA: 1, w: 1.2, col: L }); pencil([[70, -140], [100, -190]], { w: 3, col: '#f8f8f8', pass2: false });
    if (t > EV.bl_ind) { push(60, -150, popK(t, EV.bl_ind + 0.1, 0.3) * 0.6); ell(0, 0, 30, 30, { wash: MEC.red, washA: 1, w: 2, col: L }); pop(); } pop();
    push(1220, 1500, 0.9); rect(-50, -380, 100, 380, { wash: '#5a3a1a', washA: 1, w: 2, col: L }); ell(0, -320, 36, 36, { wash: '#f4efe4', washA: 1, w: 2, col: L }); const a = t * 0.5; pencil([[0, -320], [Math.sin(a) * 26, -320 - Math.cos(a) * 26]], { w: 3, col: L, pass2: false }); pencil([[0, -200], [Math.sin(t * 3) * 20, -110]], { w: 3, col: MEC.gold, pass2: false }); pop();
    push(980, 1560, 0.8, 0, -1); blob([[-60, -10], [-50, -56], [40, -60], [64, -40], [56, -10]], { wash: '#2a2a2a', washA: 1, w: 2, col: L }); ell(76, -60, 22, 16, { wash: '#2a2a2a', washA: 1, w: 1.6, col: L }); for (const lx of [-40, -20, 30, 46]) pencil([[lx, -14], [lx, 16]], { w: 6, col: '#1a1a1a', pass2: false }); pop();
  }
  function front(t) { for (const x of [-170, 1250]) { rect(x - 60, 300, 120, 2100, { wash: '#e8dcc4', washA: 1, w: 2.4, col: L, shade: { gap: 10, a: 0.15, col: '#8a7a60', ang: 0 } }); rect(x - 90, 280, 180, 40, { wash: MEC.gold, washA: 1, w: 2, col: L }); } }
  function extras2(t) {                                             // пальма в кадке, секретарь с папками
    push(-40, 1460, 0.8); rect(-50, -80, 100, 80, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); pencil([[0, -80], [0, -300]], { w: 8, col: '#6a5a3a', pass2: false }); for (let q = 0; q < 6; q++) { const a = -2.6 + q * 0.4; pencil([[0, -300], [Math.cos(a) * 140, -300 + Math.sin(a) * 80 + 40]], { w: 8, col: '#3a6a2a', pass2: false }); } pop();
  }
  WORLD.berlin = (t, u, cat) => {
    lay(40, () => hall(t)); lay(3, () => table(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => { floor_(t); cat(); }); lay(0.62, () => front(t));
    lay(2, () => { rays(WIN[0], WIN[1], 2.5, 0.3, 1400, 'rgba(220,234,255,1)', 0.12, 5, t); motes(16, [-100, 500, 1200, 1500], '#fff0c8', t, 9640, { sp: 1, sz: 2.4, a: 0.4, wob: 12, add: 1 }); });
  };
  DIR.berlin = {
    outfit: 'victorian', light: { side: 1, rim: '#d8e8ff' }, grade: ['#2a1010', 0.05],
    act: () => [[S0.berlin, 'smug'], [EV.bl_rec, 'awe'], [EV.bl_ind, 'proud'], [EV.bl_con, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 380, y: 1720, s: 0.95, look: [0.4, -0.6], hand: t > EV.bl_ind ? [160, -400] : [150, -300], prop: 'goblet' }),
    hud: t => meBoard(640, 1260, 0.8, t, EV.bl_con - 0.1, [['1878 · БЕРЛИНСКИЙ КОНГРЕСС', 40, MEC.gold], ['ЧЕРНОГОРИЯ — НЕЗАВИСИМА', 44]], { w: 640 }),
    cam: () => [[S0.berlin, 600, 980, -0.08], [EV.bl_rec, 500, 940, -0.04], [EV.bl_ind, 460, 860, 0.02, 'x'], [S1.berlin, 520, 940, 0]]
  };
  TRANS_IN.berlin = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#d8b878'; ctx.fillRect(0, 0, W, H); ctx.restore(); stamp(540, 960, 1.6, t, t - 0.1, 'УЛИКА 3', MEC.red, -0.1); }); } };
})();
