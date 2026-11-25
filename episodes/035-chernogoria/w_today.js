/* 035 — сцена `today`, 2026. Остров-отель Свети-Стефан на закате: розовые черепичные крыши на скале, перешеек, пляж с лежаками и
   зонтиками, купальщики, яхты, японские туристы с фотоаппаратом (дружелюбный колбэк), пальмы и оливы. Главный свет — закатное солнце
   справа над морем, золотая дорожка. На «Объявления» раскрывается досье — вердикт: штамп «ОБЪЯВЛЕНИЯ ВОЙНЫ: НЕ НАЙДЕНО · ЛЕГЕНДА»;
   на «мир» второй штамп «МИР 2006 ✓»; плашка-ответ (QUESTION). Том (худи) захлопывает папку. */
(() => {
  const L = MEC.ink, SUN = [900, 760];
  EV.answer = wtk('t1', 'Объявления'); EV.td_leg = wtk('t1', 'легенда.'); EV.td_peace = wtk('t1', 'мир');
  KEYW.push('легенда.', 'заключили.');
  function sky(t) { vgrad(-900, 1100, ['#3a4a8a', '#c86a7a', '#f8a060', '#f8d090'], 1); glow(SUN[0], SUN[1], 260, 'rgba(255,200,130,1)', 0.5); ell(SUN[0], SUN[1], 66, 66, { wash: '#fff0c8', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const y = 300 + i * 70, dx = (t * 8) % 200; blob([[-200 + dx, y], [300 + dx, y - 18], [900 + dx, y - 6], [1300, y + 10], [300, y + 16]], { wash: '#f8b8a0', washA: 0.5, line: false }); } }
  function far(t) { sea(860, 1250, t, { col: '#3a7aa8', colL: '#f8c890', colD: '#1e4a70' }); for (let i = 0; i < 14; i++) pencil([[SUN[0] - 60 + Math.sin(t + i) * 30, 880 + i * 26], [SUN[0] + 60 + Math.sin(t + i) * 30, 880 + i * 26]], { w: 4, col: '#ffe0a0', a: 0.6, pass2: false });
    blackMountain(-400, 600, 880, 240, t, 10200, { col: '#5a5a6a', forest: '#3a3a4a', trees: 14 });
    push(380, 1010, 0.8); blob([[-260, 0], [-200, -120], [0, -170], [200, -120], [260, 0]], { wash: '#8a7a6a', washA: 1, w: 2, col: L }); for (let i = 0; i < 14; i++) { const r = rng(10210 + i), x = -200 + r() * 400, y = -60 - r() * 110; stoneHouse(x, y + 40, 50 + r() * 20, 30 + r() * 10, t, { col: '#e8d8c0', lit: i % 3 === 0 }); } pop();
    for (let i = 0; i < 3; i++) boat(820 + i * 160, 1040 + i * 30, 0.4, t, { sail: '#f4efe4' }); }
  function beach(t) {                                               // пляж: лежаки, зонты, купальщики, японские туристы, пальмы
    rect(-500, 1240, 2200, 160, { wash: '#e8c890', washA: 1, w: 2, col: L }); for (let i = 0; i < 6; i++) { push(-100 + i * 260, 1310, 0.7); pencil([[0, 0], [0, -200]], { w: 3, col: '#5a5a5a', pass2: false }); blob([[-110, -190], [0, -250], [110, -190]], { wash: [MEC.red, '#2a6aa8', '#e8c040'][i % 3], washA: 1, w: 2, col: L }); rect(-90, -30, 180, 20, { wash: '#f4efe4', washA: 1, w: 1.4, col: L }); pop(); }
    const P = [[60, '#e86a8a', 'wave'], [300, '#2a6aa8', 'hold'], [820, '#1a1a1e', 'hold', 'phone'], [900, '#e8e4d8', 'hold', 'phone'], [980, '#c84a3a', 'wave']];
    P.forEach(([x, c, a, pr], i) => human(x, 1330, 0.64, t, { body: c, skin: i >= 2 && i <= 3 ? '#f0d0a8' : ['#f0c8a0', '#d8a47e'][i % 2], hat: i >= 2 && i <= 3 ? 'cap' : null, hatCol: '#f4f4f0', legs: '#2a2a36', armR: a, prop: pr, flip: x > 600 ? -1 : 1, seed: 10220 + i, face: 'grin' }));
    for (const x of [-180, 1260]) { pencil([[x, 1340], [x + 30, 900]], { w: 14, col: '#7a5a3a', pass2: false }); for (let q = 0; q < 6; q++) { const a = -2.6 + q * 0.5; pencil([[x + 30, 900], [x + 30 + Math.cos(a) * 160, 900 + Math.sin(a) * 90 + 60]], { w: 10, col: '#3a6a2a', pass2: false }); } }
  }
  function ground(t) {                                              // каменная набережная-променад, кадки с олеандром, мороженое, полотенце
    rect(-500, 1400, 2200, 1000, { wash: '#d8ccb4', washA: 1, w: 2, col: L }); for (let i = 0; i < 12; i++) for (let j = 0; j < 6; j++) rect(-400 + i * 170 + (j % 2) * 85, 1420 + j * 100, 170, 100, { wash: (i + j) % 3 ? '#e0d4bc' : '#c8bca4', washA: 1, w: 1, col: '#8a7e68', a: 0.5 });
    for (let i = 0; i < 2; i++) { push(-40 + i * 1160, 1680, 1); rect(-50, -80, 100, 80, { wash: MEC.terra, washA: 1, w: 2, col: L }); for (let q = 0; q < 8; q++) ell(-40 + (q % 4) * 26, -110 - Math.floor(q / 4) * 30, 16, 16, { wash: q % 2 ? '#f070a0' : '#3a7a2a', washA: 1, w: 1, col: L }); pop(); }
    push(900, 1760, 1); rect(-100, -90, 200, 90, { wash: '#f4f4f0', washA: 1, w: 2, col: L }); poly([[-120, -90], [0, -150], [120, -90]], { wash: '#2a8aa8', washA: 1, w: 2, col: L }); txt('SLADOLED', 0, -40, 26, { col: MEC.red, font: 'Osw' }); pop();
    lightPool(SUN[0] - 200, 1620, 1000, 200, 'rgba(255,200,140,1)', 0.32); castShadow(400, 1720, 110, 560, Math.PI + 0.4, 0.32); moodDark(100, 1000, 800, 1900, '#1a1020', 0.16);
  }
  function extras(t) {                                              // кот на лежаке, дети с ведёрком, продавец кукурузы, чайки
    window.HQ && window.HQ.cat && window.HQ.cat(1120, 1560, 0.9, t, '#3a3a3a', 7);
    for (let i = 0; i < 2; i++) human(-60 + i * 70, 1560, 0.55, t, { body: ['#f2c02a', '#2a8a5a'][i], legs: '#2a2a36', armR: 'wave', seed: 10230 + i, face: 'grin' }); push(40, 1560, 0.6); blob([[-20, 0], [-24, -40], [24, -40], [20, 0]], { wash: MEC.red, washA: 1, w: 1.4, col: L }); pop();
    for (let i = 0; i < 3; i++) { const x = ((t * 70 + i * 400) % 1700) - 200, y = 620 + i * 40 + Math.sin(t * 2 + i) * 16; push(x, y, 1); pencil([[-30, Math.sin(t * 6 + i) * 10], [0, 0], [30, Math.sin(t * 6 + i) * 10]], { w: 4, col: '#f4f4f0', pass2: false }); pop(); }
  }
  function front(t) { for (const x of [-150, 1240]) cypress(x, 2400, 1900, t, x > 0 ? 6 : 5); }
  function verdict(t) { if (t < EV.answer - 0.1) return; const k = popK(t, EV.answer - 0.1, 0.35); push(640, 1000, 0.85 * k, 0.02); rect(-280, -220, 560, 440, { wash: '#d8b878', washA: 1, w: 4, col: L }); rect(-280, -250, 120, 36, { wash: '#d8b878', washA: 1, w: 2, col: L });
    txt('ДЕЛО №1904 · ВЕРДИКТ', 0, -170, 38, { col: '#3a2a10', font: 'Osw' }); txt('Объявление войны 1904:', 0, -100, 34, { col: '#3a2a10', font: 'Hand' }); pop();
    stamp(640, 990, 0.9, t, EV.td_leg - 0.3, 'НЕ НАЙДЕНО · ЛЕГЕНДА', MEC.red, -0.08); if (t > EV.td_peace) stamp(640, 1120, 0.85, t, EV.td_peace, 'МИР 2006 ✓', '#2a8a4a', 0.1); }
  function extras2(t) {                                             // волейболисты, гидроцикл, спасательная вышка, торговец кукурузой
    for (let i = 0; i < 2; i++) human(560 + i * 200, 1300, 0.55, t, { body: ['#2a6aa8', '#e8b030'][i], legs: '#e2b48e', armR: 'wave', flip: i ? -1 : 1, seed: 10250 + i, face: 'grin' }); pencil([[660, 1300], [660, 1180]], { w: 3, col: '#5a5a5a', pass2: false }); pencil([[600, 1190], [720, 1190]], { w: 2, col: '#f4f4f0', pass2: false }); const bh = Math.abs(Math.sin(t * 2.4)) * 120; ell(lerp(580, 740, (Math.sin(t * 1.2) + 1) / 2), 1150 - bh, 14, 14, { wash: '#f4f4f0', washA: 1, w: 1.4, col: L });
    const jx = ((t * 160) % 1800) - 300; push(jx, 1120, 0.6); blob([[-60, 0], [-40, -24], [50, -24], [70, 0]], { wash: MEC.red, washA: 1, w: 1.6, col: L }); human(0, -14, 0.5, t, { body: '#1a1a1e', legs: '#1a1a1e', armR: 'hold', seed: 10255, face: 'grin' }); for (let q = 0; q < 4; q++) ell(-80 - q * 30, 0, 20 + q * 6, 8, { wash: '#ffffff', washA: 0.7 - q * 0.15, line: false }); pop();
    push(1180, 1330, 0.7); for (const k of [-40, 40]) pencil([[k, 0], [k, -260]], { w: 6, col: '#f4f4f0', pass2: false }); rect(-60, -300, 120, 60, { wash: MEC.red, washA: 1, w: 2, col: L }); human(0, -300, 0.5, t, { body: MEC.red, legs: '#e2b48e', armR: 'hold', seed: 10256, face: 'calm' }); pop();
    push(-40, 1340, 0.6); rect(-90, -60, 180, 60, { wash: '#f4f0e6', washA: 1, w: 2, col: L }); poly([[-110, -60], [0, -120], [110, -60]], { wash: '#e8c040', washA: 1, w: 2, col: L }); for (let q = 0; q < 4; q++) ell(-60 + q * 40, -76, 12, 18, { wash: '#f0c040', washA: 1, w: 1, col: '#8a6a10' }); human(120, 0, 0.9, t, { body: '#f4f4f0', hat: 'straw', hatCol: '#e8c878', legs: '#3a3a3a', armR: 'wave', flip: -1, seed: 10257, face: 'grin' }); pop();
  }
  WORLD.today = (t, u, cat) => {
    lay(40, () => sky(t)); lay(14, () => far(t)); lay(3, () => beach(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => { ground(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(14, [-100, 700, 1200, 1700], '#ffe8c0', t, 10240, { sp: 2, sz: 2.4, a: 0.45, wob: 14, add: 1 }));
  };
  DIR.today = {
    outfit: 'hoodieME', light: { side: 1, rim: '#ffc890' }, grade: ['#3a1a20', 0.05],
    act: () => [[S0.today, 'suspicious'], [EV.answer, 'smug'], [EV.td_leg, 'laugh'], [EV.td_peace, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1740, s: 0.95, look: [0.5, -0.5], hand: t > EV.td_peace ? [200, -280] : [150, -300], handF: t > EV.td_peace ? [-120, -280] : undefined, squash: t > EV.td_peace && t < EV.td_peace + 0.25 ? 0.06 : b.squash }),
    hud: t => verdict(t),
    cam: () => [[S0.today, 600, 980, -0.08], [EV.answer, 620, 1000, -0.04], [S1.today, 600, 1000, -0.02]]
  };
  TRANS_IN.today = { a: 0.1, b: 0.35, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.drawImage(A, 0, 0); ctx.restore(); }); whiteOut(Math.sin(e * Math.PI) * 0.5, '255,220,170'); } };
})();
