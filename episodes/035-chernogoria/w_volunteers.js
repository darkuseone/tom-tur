/* 035 — сцена `volunteers`, 1904. Цетине, старая столица: каменная улица у дворца князя, черногорцы в национальных куртках и шапках
   (красный верх, чёрный околыш) прощаются с добровольцами, женщины в чёрных платках, вьючные мулы, дети, флаг Черногории (красный с
   золотом), телеграфный столб. Главный свет — тёплое утро слева. На «Россия воюет с Японией» — карта: стрелка добровольцев
   Черногория → Россия → Маньчжурия через всю Евразию; на «рвутся» добровольцы машут, плашка «ДОБРОВОЛЬЦЫ → МАНЬЧЖУРИЯ · 10 000 КМ».
   Том (черкеска-«куртка») машет вслед. */
(() => {
  const L = MEC.ink, SUN = [140, 560];
  EV.vl_war = wtk('s4', 'воюет'); EV.vl_map = EV.vl_war - 0.4; EV.vl_go = wtk('s4', 'рвутся');
  KEYW.push('Японией', 'помогать.');
  function sky(t) { vgrad(-900, 1100, ['#5a8ad0', '#a8c8e8', '#f8e4c0'], 1); glow(SUN[0], SUN[1], 220, 'rgba(255,226,170,1)', 0.42); ell(SUN[0], SUN[1], 50, 50, { wash: '#fff4d8', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const y = 280 + i * 80, dx = (t * 9) % 200; blob([[-200 + dx, y], [300 + dx, y - 22], [900 + dx, y - 6], [1300, y + 12], [400, y + 18]], { wash: '#fff4e4', washA: 0.5, line: false }); } }
  function far(t) { blackMountain(-400, 1600, 1060, 380, t, 9700, { col: '#5a6450', trees: 30 }); push(820, 1060, 0.6); rect(-220, -200, 440, 200, { wash: '#e8dcc8', washA: 1, w: 2, col: L }); poly([[-240, -200], [0, -260], [240, -200]], { wash: MEC.terra, washA: 1, w: 2, col: L }); for (let i = 0; i < 6; i++) rect(-190 + i * 66, -160, 40, 60, { wash: '#4a5a6a', washA: 1, w: 1.4, col: L }); meFlag(0, -420, 120, 80, t, { pole: 160 }); pop(); depthFog('#f0e8d8', 0.07); }
  function street(t) {                                              // дома, прощание, мулы, телеграф
    for (let i = 0; i < 6; i++) { const r = rng(9710 + i); stoneHouse(-260 + i * 300, 1230, 200 + r() * 40, 150 + r() * 60, t, { shut: '#5a3a22', door: 1, col: '#e0d4bc' }); }
    push(560, 1250, 0.8); pencil([[0, 0], [0, -420]], { w: 8, col: '#5a4a3a', pass2: false }); pencil([[-60, -380], [60, -380]], { w: 5, col: '#5a4a3a', pass2: false }); pencil([[-60, -380], [-700, -340]], { w: 1.4, col: '#2a2a2a', pass2: false }); pencil([[60, -380], [700, -350]], { w: 1.4, col: '#2a2a2a', pass2: false }); pop();
    const go = t > EV.vl_go; const V = [[720, '#e8e0d0'], [800, '#3a4a7a'], [880, '#e8e0d0'], [960, '#3a4a7a']];
    V.forEach(([x, c], i) => { human(x + (go ? (t - EV.vl_go) * 60 : 0), 1320, 0.68, t, { body: c, hat: 'fez', hatCol: MEC.red, legs: '#2a2a4a', armR: go ? 'wave' : 'hold', prop: i % 2 ? 'spear' : undefined, flip: -1, seed: 9720 + i, face: go ? 'grin' : 'smile', beard: i === 1 ? 1 : undefined }); push(x + 30, 1320 - 170, 0.6); rect(-20, -30, 40, 50, { wash: '#6a5a3a', washA: 1, w: 1.4, col: L }); pop(); });
    const W2 = [[120, '#1a1a1e'], [220, '#1a1a1e'], [320, '#7a2a2a']]; W2.forEach(([x, c], i) => human(x, 1320, 0.66, t, { body: c, hat: 'scarf', hatCol: '#1a1a1e', legs: '#2a2a2a', long: 1, armR: go ? 'wave' : 'hold', seed: 9730 + i, face: 'smile' }));
    for (let i = 0; i < 2; i++) { push(1120 + i * 150, 1330, 0.55, 0, -1); horse(0, 0, 1, t, { col: '#7a6a5a', seed: 7 + i, walk: go }); rect(-60, -210, 120, 60, { wash: '#a8905a', washA: 1, w: 1.6, col: L }); pop(); }
  }
  function ground(t) {                                              // мостовая, камни, корзины, бочонок, кувшин, ружьё у стены
    rect(-500, 1340, 2200, 1000, { wash: '#b8a888', washA: 1, w: 2, col: L }); const r = rng(9740); for (let i = 0; i < 110; i++) ell(r() * 2000 - 400, 1360 + r() * 700, 14 + r() * 14, 7 + r() * 5, { wash: i % 2 ? '#9a8a6a' : '#d0c0a0', washA: 1, w: 1, col: L, a: 0.45 });
    for (let i = 0; i < 2; i++) { push(980 + i * 100, 1700 + i * 30, 1); blob([[-46, 0], [-40, -56], [40, -56], [46, 0]], { wash: '#c89a5a', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.3, col: '#6a4a1a', ang: 0.8 } }); for (let q = 0; q < 4; q++) ell(-24 + q * 16, -60, 10, 10, { wash: i ? '#6a2a5a' : '#c83a2a', washA: 1, w: 1, col: L }); pop(); }
    push(-60, 1720, 1); rect(-40, -80, 80, 80, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); pop(); push(1180, 1880, 1); blob([[-20, 0], [-26, -40], [-12, -64], [12, -64], [26, -40], [20, 0]], { wash: MEC.terra, washA: 1, w: 1.6, col: L }); pop();
    lightPool(SUN[0] + 400, 1620, 900, 180, 'rgba(255,226,170,1)', 0.3); castShadow(400, 1700, 110, 560, 0.3, 0.3); moodDark(1100, 1000, 800, 1900, '#1a1008', 0.16);
  }
  function extras(t) {                                              // дети машут, старик с гуслями, священник благословляет, собака
    for (let i = 0; i < 2; i++) human(-80 + i * 70, 1520, 0.55, t, { body: ['#c84a3a', '#3a6aa8'][i], legs: '#2a2a36', armR: 'wave', seed: 9750 + i, face: 'grin' });
    push(1180, 1520, 0.9); human(0, 0, 1, t, { body: '#4a3a2a', hat: 'fez', hatCol: MEC.red, legs: '#2a2a2a', armR: 'hold', flip: -1, seed: 9752, face: 'smile', beard: 1 }); blob([[-80, -200], [-60, -280], [-40, -200]], { wash: '#8a5a32', washA: 1, w: 1.6, col: L }); pencil([[-60, -280], [-60, -340]], { w: 4, col: '#5a3a1a', pass2: false }); pop();
    push(1040, 1540, 0.85); human(0, 0, 1, t, { body: '#1a1a1e', hat: 'hood', hatCol: '#1a1a1e', legs: '#1a1a1e', long: 1, armR: 'wave', flip: -1, seed: 9753, face: 'calm', beard: 1 }); pencil([[-50, -340], [-50, -280]], { w: 4, col: MEC.gold, pass2: false }); pencil([[-64, -320], [-36, -320]], { w: 4, col: MEC.gold, pass2: false }); pop();
  }
  function front(t) { for (const x of [-150, 1240]) cypress(x, 2400, 1800, t, x > 0 ? 4 : 3); }
  function map(t) { if (t < EV.vl_map) return; const k = sm(clamp((t - EV.vl_map) / 0.3)); scr(() => { ctx.save(); ctx.globalAlpha = k; const P = GLOBE.map(540, 980, 7.2, 72, 50, { land: '#e2d4ac', sea: '#2a5a8a', seaD: '#183a66' });
      GLOBE.fill(ME_POLY.map(P), MEC.red); GLOBE.city(P, MEG.podgorica[0], MEG.podgorica[1], 'ЧЕРНОГОРИЯ', { size: 30, left: true }); GLOBE.city(P, MEG.mukden[0], MEG.mukden[1], 'МАНЬЧЖУРИЯ', { size: 30, left: true }); GLOBE.city(P, MEG.tokyo[0], MEG.tokyo[1], 'ЯПОНИЯ', { size: 30 });
      const f = clamp((t - EV.vl_war) / 1.2); GLOBE.route(P, [MEG.podgorica, MEG.moscow, [80, 55], MEG.mukden], f, { col: MEC.red, label: 'ДОБРОВОЛЬЦЫ', t, t0: EV.vl_go });
      if (t > EV.vl_war) { const [x, y] = P([128, 39]); txt('⚔', x, y, 70, { col: '#ffe08a', font: 'Osw' }); txt('РОССИЯ — ЯПОНИЯ', x - 40, y + 70, 34, { col: '#fff6e0', font: 'Osw' }); } ctx.restore(); }); }
  function extras2(t) {                                             // пекарня с хлебом, куры, курятник, бельё на верёвке
    push(1040, 1560, 0.8); rect(-90, -60, 180, 60, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (let q = 0; q < 5; q++) ell(-70 + q * 34, -70, 18, 12, { wash: '#d8a060', washA: 1, w: 1, col: L }); pop();
    for (let i = 0; i < 4; i++) { const hx = 600 + i * 40 + Math.sin(t * 3 + i) * 10; push(hx, 1600, 0.45); blob([[-20, 0], [-16, -26], [14, -30], [24, -12], [10, 4]], { wash: i % 2 ? '#c8582a' : '#f0e0c0', washA: 1, w: 1.4, col: L }); ell(18, -30, 6, 6, { wash: '#c8281e', washA: 1, line: false }); pop(); }
    pencil([[-200, 1280], [300, 1300]], { w: 2, col: '#4a4a4a', pass2: false }); for (let i = 0; i < 5; i++) rect(-180 + i * 100, 1286 + i * 3, 50, 70, { wash: ['#f4f4f0', MEC.red, '#e8e0c0', '#2a4a7a', '#f4f4f0'][i], washA: 1, w: 1.2, col: L });
  }
  WORLD.volunteers = (t, u, cat) => {
    lay(40, () => sky(t)); lay(15, () => far(t)); lay(3.2, () => street(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => ground(t)); lay(0.62, () => front(t));
    lay(2.2, () => motes(14, [-100, 700, 1200, 1500], '#fff8e0', t, 9760, { sp: 2, sz: 2.4, a: 0.4, wob: 16, add: 1 }));
    map(t); lay(1, () => cat());
  };
  DIR.volunteers = {
    outfit: 'cherkeska', light: { side: -1, rim: '#ffe0b0' }, grade: ['#2a1a10', 0.04],
    act: () => [[S0.volunteers, 'neutral'], [EV.vl_war, 'awe'], [EV.vl_go, 'grin']],
    pose: (t, u, b) => { const mp = t > EV.vl_map; return Object.assign(b, { x: mp ? 190 : 360, y: mp ? 1840 : 1700, s: mp ? 0.78 : 0.95, look: mp ? [0.7, -0.6] : [0.6, -0.4], hand: [160, -380], point: mp, noHat: true }); },
    hud: t => { if (t > EV.vl_go) meBoard(620, 1340, 0.75, t, EV.vl_go, [['ДОБРОВОЛЬЦЫ — В МАНЬЧЖУРИЮ', 42, MEC.gold]], { w: 620 }); },
    cam: () => [[S0.volunteers, 600, 1000, -0.08], [EV.vl_map - 0.01, 620, 980, -0.04], [EV.vl_map, 540, 960, 0], [S1.volunteers, 540, 960, 0]]
  };
  TRANS_IN.volunteers = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.translate(-e * 600, 0); ctx.drawImage(A, 0, 0); ctx.restore(); for (let i = 0; i < 3; i++) pencil([[W * (1 - e) - i * 40, 0], [W * (1 - e) - i * 40 - 100, H]], { w: 6, col: '#fff6e0', a: 0.6, pass2: false, gap: false }); }); } };
})();
