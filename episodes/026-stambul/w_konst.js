/* 026 — сцена `konst`: 330, освящение новой столицы. Форум Константина: мраморные колоннады, порфировая колонна со статуей наверху,
   толпа в тогах с пальмовыми ветвями, легионеры с красными щитами, конь, трубачи. Главный свет — полуденное солнце слева сверху:
   лучи через колоннаду, пятно на мраморе, тени вправо, край кадра в тени. Том-император (konst) на подиуме: на «столицей» трубы и
   лепестки, на «скромно» Том дёргает шнур — пурпурное покрывало слетает с плиты «КОНСТАНТИНОПОЛЬ», на «честь» на колонне вспыхивает
   статуя… с кошачьими ушами (сухая шутка: «в свою честь»). Переход В сцену — золотая монета-солид переворачивается на весь кадр. */
(() => {
  EV.kn_so = wtk('s2', 'Поэтому');
  EV.kn_cap = wtk('s2', 'столицей');
  EV.kn_cord = wtk('s2', 'скромно');
  EV.kn_honor = wtk('s2', 'честь.');
  KEYW.push('столицей', 'честь.');
  SHAKES.push([EV.kn_cord + 0.15, 0.25, 7]);
  const L = IS.ink, SUN = [120, 260];
  function sky(t) { vgrad(-900, 1200, ['#3a6aa8', '#6a9ad0', '#b8d4ec', '#f0e4c8'], 1); glow(SUN[0], SUN[1], 260, 'rgba(255,240,200,1)', 0.35);
    for (let i = 0; i < 5; i++) { const r = rng(2760 + i), x = (r() * 1400 + t * 8) % 1500 - 200, y = 360 + r() * 300; for (let k = 0; k < 4; k++) ell(x + k * 46, y - (k % 2) * 20, 60, 30, { wash: '#ffffff', washA: 0.5, line: false }); }
    gulls(5, -100, 1180, 380, 700, t, 2761, 0.4, 30); }
  function city(t) {                                                 // холмы Византия: черепичные крыши, ипподром, кромка моря
    rect(-600, 980, 2300, 80, { wash: '#6a9ac0', washA: 1, line: false }); hills(1000, 60, '#b8a07a', 2762);
    const r = rng(2763); for (let i = 0; i < 26; i++) { const x = -300 + i * 70, y = 1000 - r() * 80, w = 50 + r() * 40; rect(x - w / 2, y - 40, w, 40, { wash: r() < 0.5 ? '#efe2c8' : '#e2cca0', washA: 1, w: 1.2, col: '#6a5a3a' }); poly([[x - w / 2 - 6, y - 38], [x, y - 62], [x + w / 2 + 6, y - 38]], { wash: '#c8643a', washA: 1, w: 1.2, col: '#6a3a1a' }); }
    push(980, 1010, 1); for (let k = 0; k < 9; k++) { rect(-200 + k * 46, -90, 30, 90, { wash: '#efe2c8', washA: 1, w: 1.2, col: '#6a5a3a' }); } rect(-210, -110, 430, 22, { wash: '#e2cca0', washA: 1, w: 1.2, col: '#6a5a3a' }); pop();
    depthFog('#d8e4ec', 0.08);
  }
  function forum(t) {                                                // колоннада форума и порфировая колонна со статуей
    rect(-500, 1260, 2100, 30, { wash: '#d8ccb4', washA: 1, w: 1.6, col: L });
    for (let i = 0; i < 16; i++) { const x = -420 + i * 120; if (x > 700 && x < 980) continue; const c = rect(x - 18, 960, 36, 300, { wash: IS.marble, washA: 1, w: 1.8, col: L }); shadeG(c.path, x - 18, 0, x + 18, 0, '#a89a80', 0.4);
      rect(x - 28, 940, 56, 22, { wash: '#e8dcc8', washA: 1, w: 1.4, col: L }); rect(x - 26, 1256, 52, 14, { wash: '#e8dcc8', washA: 1, w: 1.4, col: L }); }
    rect(-460, 900, 1040, 44, { wash: '#e8dcc8', washA: 1, w: 2, col: L }); rect(960, 900, 700, 44, { wash: '#e8dcc8', washA: 1, w: 2, col: L });
    for (let i = 0; i < 10; i++) shaft(-380 + i * 120, 950, 70, 380, -0.35, 'rgba(255,240,200,1)', 0.08);
    push(840, 1270, 1); const col = rect(-46, -400, 92, 400, { wash: '#8a2a3a', washA: 1, w: 2.4, col: L }); shadeG(col.path, -46, 0, 46, 0, '#3a0a14', 0.5);
    for (let j = 0; j < 4; j++) rect(-50, -90 - j * 90, 100, 14, { wash: IS.gold, washA: 1, w: 1.4, col: IS.goldD }); rect(-70, -40, 140, 40, { wash: '#e8dcc8', washA: 1, w: 2, col: L }); rect(-64, -430, 128, 32, { wash: '#e8dcc8', washA: 1, w: 2, col: L });
    const rv = t > EV.kn_honor - 0.1 ? clamp((t - EV.kn_honor + 0.1) / 0.3) : 0;                       // статуя на колонне: золото, корона, кошачьи уши
    push(0, -430, 1.25); blob([[-34, 0], [-40, -120], [-26, -160], [26, -160], [40, -120], [34, 0]], { wash: lerpC('#a89a80', IS.gold, rv), washA: 1, w: 2, col: L }); ell(0, -186, 32, 30, { wash: lerpC('#a89a80', IS.gold, rv), washA: 1, w: 2, col: L });
    for (const k of [-1, 1]) poly([[k * 10, -206], [k * 30, -238], [k * 32, -200]], { wash: lerpC('#a89a80', IS.gold, rv), washA: 1, w: 1.6, col: L }); pencil([[40, -120], [80, -170]], { w: 9, col: lerpC('#a89a80', IS.gold, rv), pass2: false });
    if (rv > 0) { glow(0, -150, 120, 'rgba(255,220,120,1)', 0.3 * rv); for (let q = 0; q < 8; q++) { const a = q / 8 * 6.283 + t; pencil([[Math.cos(a) * 60, -150 + Math.sin(a) * 60], [Math.cos(a) * (90 + 30 * rv), -150 + Math.sin(a) * (90 + 30 * rv)]], { w: 3, col: IS.goldL, a: rv, pass2: false }); } }
    pop(); pop();
  }
  function crowd2(t) {                                               // толпа: тоги, пальмовые ветви, легионеры с красными щитами, трубачи, конь
    const cheer = t > EV.kn_cap ? 1 : 0;
    const P = [[-140, '#f0e6d0', 'wave'], [-20, '#e8c8a0', 'up'], [100, '#d8d0c0', 'hold'], [480, '#f0e6d0', 'up'], [1000, '#e0c890', 'wave'], [1120, '#f0e6d0', 'hold'], [1240, '#c8b090', 'up']];
    P.forEach(([x, c, a], i) => { human(x, 1300, 0.6, t + (cheer ? i * 0.3 : 0), { body: c, long: 1, legs: '#8a6a4a', trim: i % 2 ? IS.pom : '#7a2a6a', beard: i % 3 ? 'short' : null, hair: '#3a2a1a', armR: cheer ? 'up' : a, armL: cheer && i % 2 ? 'up' : 'down', flip: i % 2 ? -1 : 1, seed: 2770 + i, face: cheer ? 'grin' : 'calm', hat: i === 3 ? 'laurel' : null });
      if (a === 'hold' || cheer) { const hx = x + (i % 2 ? -1 : 1) * 40, hy = 1300 - 0.6 * 330 - (cheer ? 50 : 0); pencil([[hx, hy + 40], [hx + 10, hy - 70]], { w: 4, col: '#4a6a2a', pass2: false }); for (let q = 0; q < 6; q++) pencil([[hx + 4 + q * 1.2, hy - 10 - q * 10], [hx + 28, hy - 20 - q * 10]], { w: 3, col: '#5a8a3a', pass2: false }); } });
    for (const [x, fl] of [[260, 1], [360, 1], [1380, -1]]) { human(x, 1300, 0.62, t, { body: '#a8302a', legs: '#5a3a28', hat: 'helmet', prop: 'spear', armR: 'hold', flip: fl, seed: 2780 + x, face: 'calm' }); push(x + fl * 34, 1300 - 120, 1); rect(-26, -50, 52, 100, { wash: IS.pom, washA: 1, w: 2, col: L }); ell(0, 0, 10, 10, { wash: IS.gold, washA: 1, w: 1.2, col: IS.goldD }); pop(); }
    for (const x of [600, 920]) { human(x, 1300, 0.58, t, { body: '#f0e6d0', long: 1, armR: 'up', seed: 2790 + x }); const tr = t > EV.kn_cap && t < EV.kn_cap + 1.2; pencil([[x + 30, 1300 - 200], [x + 130, 1300 - 250]], { w: 6, col: IS.gold, pass2: false }); ell(x + 136, 1300 - 254, 16, 22, { wash: IS.gold, washA: 1, w: 1.4, col: IS.goldD }); if (tr) for (let q = 0; q < 3; q++) pencil(ellPts(x + 150, 1300 - 260, 30 + q * 20, 24 + q * 16, -0.5, 0, 10).slice(0, 5), { w: 3, col: IS.goldL, a: 0.8, pass2: false }); }
    push(1300, 1300, 0.9, 0, -1); for (const k of [-60, -30, 40, 70]) pencil([[k, -110], [k + Math.sin(t * 3 + k) * 4, 0]], { w: 8, col: '#5a3a1e', pass2: false }); ell(0, -140, 100, 46, { wash: '#7a4a2a', washA: 1, w: 2.2, col: L }); blob([[70, -160], [120, -250], [150, -240], [110, -150]], { wash: '#7a4a2a', washA: 1, w: 2, col: L }); pencil([[-96, -150], [-130, -90]], { w: 9, col: '#2a1a0e', pass2: false }); pop();
  }
  function plaza(t) {                                                // мрамор под Томом: подиум, плита с покрывалом, лепестки, корзины монет
    rect(-500, 1310, 2100, 900, { wash: '#e8dcc8', washA: 1, w: 2, col: L }); for (let j = 0; j < 9; j++) for (let i = 0; i < 18; i++) rect(-500 + i * 120 + (j % 2) * 60, 1316 + j * 80, 118, 78, { wash: (i + j) % 2 ? '#e2d4bc' : '#efe4d0', washA: 1, w: 1, col: '#a89a80' });
    lightPool(400, 1600, 700, 160, 'rgba(255,240,200,1)', 0.4);
    push(380, 1620, 1); rect(-210, -20, 420, 40, { wash: '#d8ccb4', washA: 1, w: 2, col: L }); rect(-190, -40, 380, 24, { wash: '#7a2a6a', washA: 1, w: 1.6, col: L }); pop();
    push(800, 1610, 0.78); const plate = rect(-200, -330, 400, 230, { wash: IS.marble, washA: 1, w: 3, col: L }); shadeG(plate.path, -200, 0, 200, 0, '#a89a80', 0.35); pencil([[-160, 0], [-140, -100]], { w: 10, col: '#6a5a3a', pass2: false }); pencil([[160, 0], [140, -100]], { w: 10, col: '#6a5a3a', pass2: false });
    txt('ΚΩΝΣΤΑΝΤΙΝΟΥΠΟΛΙΣ', 0, -250, 28, { col: '#5a4a2a', font: 'Osw' }); txt('КОНСТАНТИНОПОЛЬ', 0, -195, 40, { col: '#3a2a10', font: 'Osw' }); txt('«ГОРОД КОНСТАНТИНА»', 0, -145, 26, { col: '#7a2a6a', font: 'Osw' });
    const off = t > EV.kn_cord ? sm((t - EV.kn_cord) / 0.45) : 0;                                   // покрывало слетает вверх-вправо
    if (off < 1) { push(off * 420, -off * 380, 1, off * 1.4); blob([[-220, -350], [220, -350], [230, -90], [120, -60], [0, -100], [-120, -60], [-230, -90]], { wash: '#6a1a5a', washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.25, col: '#2a0a24', ang: 1.3 } }); pencil([[-200, -340], [200, -340]], { w: 6, col: IS.gold, pass2: false }); pop(); }
    pencil(spline([[-200, -340], [-330, -200 + off * 60], [-420, -300]], false, 10), { w: 3, col: IS.gold, pass2: false }); pop();
    for (const [x, y] of [[1000, 1690], [80, 1700]]) { push(x, y, 1); ell(0, 0, 70, 22, { wash: '#8a5a2a', washA: 1, w: 2, col: L }); for (let q = 0; q < 9; q++) coinO(-40 + q * 10, -12 - (q % 3) * 8, 14, t, { sq: 0.4 }); pop(); }
    if (t > EV.kn_cap) { const r = rng(2795); for (let i = 0; i < 40; i++) { const x0 = r() * 1300 - 100, sp = 140 + r() * 160, y = 600 + ((t - EV.kn_cap) * sp + r() * 900) % 1100; push(x0 + Math.sin(t * 2 + i) * 30, y, 1, t * 3 + i); ell(0, 0, 9, 5, { wash: i % 3 ? '#e83a5a' : '#f8c8d8', washA: 0.95, line: false }); pop(); } }
    castShadow(400, 1612, 120, 560, 0.2, 0.4); castShadow(800, 1610, 160, 480, 0.2, 0.35); moodDark(SUN[0], 900, 1100, 1900, '#2a1830', 0.3);
  }
  function front(t) {                                                // рама: колонны переднего плана и вымпел
    for (const [x, w] of [[-80, 150], [1230, 110]]) { const c = rect(x - w / 2, 300, w, 2000, { wash: '#d8ccb4', washA: 1, w: 2, col: L }); shadeG(c.path, x - w / 2, 0, x + w / 2, 0, '#7a6a50', 0.6); for (let k = -2; k <= 2; k++) pencil([[x + k * 22, 300], [x + k * 22, 2300]], { w: 2, col: '#a89a80', a: 0.6, pass2: false }); }
    for (let i = 0; i < 9; i++) { const x = -60 + i * 150, y = 1900 + (i % 2) * 30; sil([[x - 70, 2300], [x - 70, y + 40], [x - 40, y], [x + 40, y], [x + 70, y + 40], [x + 70, 2300]], '#3a2a24', 1); ell(x, y - 40, 40, 46, { wash: '#3a2a24', washA: 1, line: false }); if (i % 3 === 1) { pencil([[x + 50, y], [x + 70, y - 200]], { w: 6, col: '#2a3a1a', pass2: false }); for (let q = 0; q < 6; q++) pencil([[x + 66, y - 120 - q * 14], [x + 96, y - 130 - q * 14]], { w: 4, col: '#2a3a1a', pass2: false }); } }
    const f = Math.sin(t * 4) * 18; shape([[1180, 380], [1180, 600], [960 + f, 560], [980 + f * 0.6, 480], [950 + f, 400]], { wash: '#7a2a6a', washA: 1, w: 2, col: L }); pencil([[1180, 380], [950 + f, 400]], { w: 4, col: IS.gold, pass2: false });
  }
  WORLD.konst = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(20, () => city(t));
    lay(8, () => forum(t));
    lay(3.2, () => { crowd2(t); depthFog('#e8dcc8', 0.05); });
    lay(1, () => { plaza(t); cat(); });
    lay(0.6, () => front(t));
    lay(2, () => motes(26, [-100, 700, 1200, 1500], '#fff8e0', t, 2796, { sp: 4, sz: 2.2, a: 0.5, wob: 16, add: 1 }));
  };
  DIR.konst = {
    outfit: 'konst', light: { side: -1, rim: '#fff0c8' }, grade: ['#e8c890', 0.06],
    act: () => [[S0.konst, 'proud'], [EV.kn_cap, 'grin'], [EV.kn_cord, 'smug'], [EV.kn_honor, 'wink']],
    pose: (t, u, b) => { const pull = t > EV.kn_cord - 0.15 && t < EV.kn_cord + 0.4, pk = clamp((t - EV.kn_cord + 0.15) / 0.3);
      return Object.assign(b, { x: 380, y: 1600, s: 1.0, look: t > EV.kn_honor - 0.1 ? [0.8, -0.9] : [0.5, -0.3], hand: pull ? [lerp(240, 120, pk), lerp(-320, -260, pk)] : t > EV.kn_cap && t < EV.kn_cord ? [120, -470] : [200, -300],
        handF: [-120, -260], tilt: pull ? -0.06 * pk : 0, tailUp: t > EV.kn_cap }); },
    cam: () => [[S0.konst, 600, 960, 0.0], [EV.kn_cap, 560, 980, 0.06], [EV.kn_cord, 640, 1040, 0.12, 'x'], [EV.kn_honor, 680, 900, 0.12, 'x'], [S1.konst, 690, 880, 0.16]]
  };
  TRANS_IN.konst = { a: 0.1, b: 0.4, fx(k, t, A, B) {               // золотой солид переворачивается на весь кадр: аверс «330» → новая эпоха
    const e = sm(k), sq = Math.abs(Math.cos(e * Math.PI)); drawBuf(e < 0.5 ? A : B);
    scr(() => { const R = 1400 * Math.sin(e * Math.PI) + 20; if (R < 60) return; coinO(540, 960, R, t, { sq: sq, txt: e < 0.5 ? 'BYZANTION' : '330', ts: 0.2, sub: e < 0.5 ? '' : 'NOVA ROMA', rot: 0 }); });
  } };
})();
