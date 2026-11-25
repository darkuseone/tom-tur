/* 035 — сцена `kotor`, 1420–1797. Венецианский Котор: Морские ворота с крылатым львом святого Марка, площадь, торговцы солью и
   оливковым маслом, венецианские стражники, мулы с поклажей, лодки у стены; высоко в горах — монастырь Цетине, где правит
   князь-епископ (владыка в чёрной рясе и клобуке, с посохом) и горцы с ружьями. Главный свет — полуденное солнце сверху-слева.
   На «Венеция» — лев на воротах «оживает» (блик); на «четыреста» — плашка «1420 → 1797 = 377 ЛЕТ»; на «в горах» камера уходит вверх
   к монастырю, на «князья-епископы» владыка поднимает посох. Том (купеческий камзол) торгуется с венецианцем. */
(() => {
  const L = MEC.ink, SUN = [300, 360];
  EV.kt_ven = wtk('s2', 'Венеция'); EV.kt_400 = wtk('s2', 'четыреста'); EV.kt_mnt = wtk('s2', 'горах'); EV.kt_bish = wtk('s2', 'князья-епископы.');
  KEYW.push('Котор.', 'князья-епископы.');
  function sky(t) { vgrad(-1400, 1100, ['#3a7ac8', '#8ac0e8', '#e8f0f0'], 1); glow(SUN[0], SUN[1], 200, 'rgba(255,244,210,1)', 0.4); ell(SUN[0], SUN[1], 46, 46, { wash: '#fffbe8', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const y = -300 + i * 150, dx = (t * 9) % 200; blob([[-200 + dx, y], [300 + dx, y - 22], [900 + dx, y - 6], [1300, y + 12], [400, y + 18]], { wash: '#ffffff', washA: 0.5, line: false }); } }
  function mountain(t) {                                            // гора с монастырём Цетине и владыкой наверху
    blackMountain(-400, 1600, 1080, 1300, t, 9500, { col: '#4a5446', trees: 50 }); kotorWalls(700, 1060, 600, t);
    push(260, 800, 0.8); rect(-160, -160, 320, 160, { wash: '#e8e0cc', washA: 1, w: 2.2, col: L }); poly([[-180, -160], [0, -240], [180, -160]], { wash: MEC.terra, washA: 1, w: 2, col: L }); rect(-30, -300, 60, 140, { wash: '#e8e0cc', washA: 1, w: 2, col: L }); blob([[-40, -300], [0, -350], [40, -300]], { wash: '#5a8a8a', washA: 1, w: 1.6, col: L }); pencil([[0, -350], [0, -390]], { w: 3, col: MEC.gold, pass2: false }); pencil([[-12, -376], [12, -376]], { w: 3, col: MEC.gold, pass2: false });
    const up = t > EV.kt_bish; human(220, 0, 0.75, t, { body: '#1a1a1e', bodyD: '#08080a', hat: 'hood', hatCol: '#1a1a1e', legs: '#1a1a1e', long: 1, armR: up ? 'wave' : 'hold', prop: 'stick', seed: 9510, face: up ? 'grin' : 'calm', beard: 1 });
    for (let i = 0; i < 3; i++) human(-200 + i * 70, 10, 0.6, t, { body: ['#e8e0d0', '#2a4a7a', '#c8281e'][i], hat: 'cap', hatCol: MEC.red, legs: '#2a2a2a', armR: up ? 'wave' : 'hold', prop: 'spear', seed: 9511 + i, face: 'grin' }); pop();
    depthFog('#e0e8f0', 0.06);
  }
  function town(t) {                                                // Морские ворота с львом, дома, торговцы, стража, мулы
    for (let i = 0; i < 7; i++) { const r = rng(9520 + i); stoneHouse(-260 + i * 230, 1230, 180 + r() * 40, 160 + r() * 80, t, { shut: ['#2a6a5a', '#3a5a8a', '#8a3a2a'][i % 3], door: 1 }); }
    push(640, 1240, 1); rect(-240, -360, 480, 360, { wash: MEC.stone, washA: 1, w: 2.6, col: L, shade: { gap: 9, a: 0.14, col: MEC.stoneD, ang: 0.4 } }); poly([[-110, 0], [-110, -200], [0, -270], [110, -200], [110, 0]], { wash: '#2a2420', washA: 1, w: 2.4, col: L });
    push(0, -310, 0.9); blob([[-80, 20], [-60, -20], [20, -30], [70, -10], [60, 20], [-40, 30]], { wash: MEC.gold, washA: 1, w: 2, col: '#5a3a08' }); blob([[-20, -20], [-60, -70], [10, -40]], { wash: MEC.gold, washA: 1, w: 1.6, col: '#5a3a08' }); ell(60, -30, 18, 18, { wash: MEC.gold, washA: 1, w: 1.6, col: '#5a3a08' }); pop();
    if (t > EV.kt_ven && t < EV.kt_ven + 0.6) glow(0, -320, 80, 'rgba(255,230,140,1)', 0.5 * (1 - (t - EV.kt_ven) / 0.6)); pop();
    const P = [[180, '#c8281e', 'helmet', 'hold', 'spear'], [1100, '#c8281e', 'helmet', 'hold', 'spear'], [880, '#3a2a5a', 'merchant', 'wave'], [980, '#e8e0c0', 'scarf', 'hold'], [-40, '#8a6a4a', 'cap', 'hold'], [60, '#5a6a3a', 'fur', 'swing']];
    P.forEach(([x, c, h, a, pr], i) => human(x, 1320, 0.68, t, { body: c, hat: h, hatCol: '#4a3020', legs: '#3a2a1a', armR: a, prop: pr, long: h === 'scarf' ? 1 : undefined, flip: x > 600 ? -1 : 1, seed: 9530 + i, face: 'smile' }));
    push(1200, 1330, 0.6, 0, -1); horse(0, 0, 1, t, { col: '#6a5a4a', seed: 4 }); for (const d of [-1, 1]) rect(-20 + d * 60, -170, 60, 70, { wash: '#a8905a', washA: 1, w: 1.6, col: L }); pop();
  }
  function ground(t) {                                              // площадь: полированный камень, лотки с солью и маслом, амфоры, кот
    rect(-500, 1340, 2200, 1000, { wash: '#e0d4bc', washA: 1, w: 2, col: L }); for (let i = 0; i < 12; i++) for (let j = 0; j < 6; j++) rect(-400 + i * 170 + (j % 2) * 85, 1360 + j * 100, 170, 100, { wash: (i + j) % 3 ? '#e8dcc4' : '#d0c4ac', washA: 1, w: 1, col: '#8a7e68', a: 0.45 });
    push(900, 1640, 1); rect(-170, -40, 340, 40, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (let q = 0; q < 4; q++) { blob([[-150 + q * 80, -40], [-140 + q * 80, -110], [-100 + q * 80, -110], [-90 + q * 80, -40]], { wash: q % 2 ? '#c8a06a' : '#e8e0d0', washA: 1, w: 1.6, col: L }); } poly([[-200, -170], [200, -170], [170, -130], [-170, -130]], { wash: '#2a6a8a', washA: 1, w: 2, col: L }); pop();
    for (let i = 0; i < 3; i++) { push(-80 + i * 60, 1700 + (i % 2) * 30, 1); blob([[-22, 0], [-30, -50], [-14, -80], [14, -80], [30, -50], [22, 0]], { wash: MEC.terra, washA: 1, w: 1.6, col: L }); pop(); }
    window.HQ && window.HQ.cat && window.HQ.cat(1080, 1860, 1, t, '#e8a050', 5);
    lightPool(SUN[0] + 300, 1620, 900, 180, 'rgba(255,244,210,1)', 0.3); castShadow(400, 1700, 110, 380, 0.7, 0.3); moodDark(1100, 1000, 800, 1900, '#10181e', 0.16);
  }
  function extras(t) {                                              // лодки у стены, бочки, сохнущие сети, голуби, мальчишка-водонос
    for (let i = 0; i < 2; i++) boat(-60 + i * 1240, 1480, 0.7, t, { col: '#8a5a32', stripe: '#3a5a8a', sail: i ? '#e8dcc0' : undefined });
    for (let i = 0; i < 3; i++) { push(1060 + i * 60, 1560 - i * 10, 0.9); rect(-30, -70, 60, 70, { wash: '#7a5a32', washA: 1, w: 2, col: L }); for (const y of [-56, -16]) pencil([[-32, y], [32, y]], { w: 3, col: '#3a3a3a', pass2: false }); pop(); }
    push(-40, 1560, 0.9); human(0, 0, 0.8, t, { body: '#c8b89a', legs: '#5a4a3a', armR: 'hold', seed: 9540, face: 'grin' }); blob([[30, -160], [24, -220], [56, -220], [50, -160]], { wash: MEC.terra, washA: 1, w: 1.6, col: L }); pop();
    for (let i = 0; i < 5; i++) { const gx = 500 + i * 60 + Math.sin(t * 2 + i) * 14; push(gx, 1560 + (i % 2) * 20, 0.6); blob([[-24, 0], [-16, -26], [16, -28], [26, -10], [10, 4]], { wash: '#8a8e9a', washA: 1, w: 1.4, col: L }); pop(); }
  }
  function front(t) { for (const x of [-170, 1250]) { rect(x - 80, 300, 160, 2100, { wash: MEC.stone, washA: 1, w: 2.4, col: L, shade: { gap: 12, a: 0.2, col: MEC.stoneD, ang: 0 } }); } }
  function extras2(t) {                                             // монахиня и священник у ворот, ослик с корзинами
    push(500, 1560, 0.8); human(0, 0, 1, t, { body: '#1a1a1e', hat: 'hood', hatCol: '#1a1a1e', legs: '#1a1a1e', long: 1, armR: 'hold', seed: 9560, face: 'calm', beard: 1 }); human(80, 0, 0.95, t, { body: '#2a2a3a', hat: 'scarf', hatCol: '#f4f4f0', legs: '#1a1a1e', long: 1, armR: 'hold', seed: 9561, face: 'smile' }); pop();
    push(820, 1580, 0.6, 0, -1); horse(0, 0, 0.8, t, { col: '#8a8478', seed: 11 }); for (const d of [-1, 1]) blob([[d * 50 - 30, -120], [d * 50 + 30, -120], [d * 50 + 24, -60], [d * 50 - 24, -60]], { wash: '#c89a5a', washA: 1, w: 1.4, col: L }); pop();
  }
  WORLD.kotor = (t, u, cat) => {
    lay(40, () => sky(t)); lay(14, () => mountain(t)); lay(3.2, () => town(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(2.2, () => motes(14, [-100, 700, 1200, 1500], '#fff8e0', t, 9550, { sp: 2, sz: 2.4, a: 0.4, wob: 16, add: 1 }));
  };
  DIR.kotor = {
    outfit: 'dutch', light: { side: -1, rim: '#fff0c8' }, grade: ['#203040', 0.04],
    act: () => [[S0.kotor, 'smug'], [EV.kt_ven, 'awe'], [EV.kt_400, 'sideeye'], [EV.kt_mnt, 'suspicious'], [EV.kt_bish, 'awe']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1700, s: 0.95, look: t < EV.kt_mnt ? [0.6, -0.3] : [0.4, -1], hand: t < EV.kt_mnt ? [180, -260] : [150, -380], prop: t < EV.kt_mnt ? 'coin' : undefined, point: t > EV.kt_mnt }),
    hud: t => { if (t > EV.kt_400 && t < EV.kt_mnt + 0.2) meBoard(640, 1000, 0.82, t, EV.kt_400, [['1420 → 1797', 52, MEC.gold], ['= 377 ЛЕТ ВЕНЕЦИИ', 44]], { w: 520 }); },
    cam: () => [[S0.kotor, 600, 1020, -0.08], [EV.kt_ven, 640, 1000, -0.04], [EV.kt_mnt - 0.1, 600, 980, -0.06], [EV.kt_mnt + 0.5, 420, 880, 0.04, 'x'], [S1.kotor, 400, 880, 0.08]]
  };
  TRANS_IN.kotor = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W * (1 - e), H); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore(); for (let y = 0; y < H; y += 80) ell(W * (1 - e), y + Math.sin(y * 0.02 + t * 6) * 20, 40, 50, { wash: '#ffffff', washA: 0.9, line: false }); }); } };
})();
