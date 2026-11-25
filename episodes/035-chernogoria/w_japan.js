/* 035 — сцена `japan`, июнь 2006. Подгорица, кабинет МИДа: окно на горы, флаги Черногории и Японии на столе, японская делегация
   (спецпосланник с конвертом), черногорские дипломаты, журналисты с камерами, вишнёвая ветка в вазе (подарок). Главный свет —
   тёплое солнце из окна слева. На «признала» посланник вручает конверт; на «закрыла» конверт раскрывается — письмо «ВОЙНА ОКОНЧЕНА»,
   по экрану пролетает карта-линия Токио — Подгорица с подписью «МИР»; Том (костюм) пожимает руку посланнику, штамп «ДЕЛО ЗАКРЫТО». */
(() => {
  const L = MEC.ink, WIN = [140, 680];
  EV.jp_rec = wtk('s8', 'признала'); EV.jp_close = wtk('s8', 'закрыла'); EV.jp_war = wtk('s8', 'войну.');
  KEYW.push('признала', 'войну.');
  function room(t) {                                                // стены, окно с горами, портрет, флаги
    rect(-600, 200, 2400, 1300, { wash: '#e8e0cc', washA: 1, w: 2, col: L, shade: { gap: 14, a: 0.05, col: '#8a8070', ang: 1.4 } }); vgrad(200, 1400, ['#c8bca4', '#e8e0cc', '#d8d0bc'], 0.5);
    push(WIN[0], WIN[1], 1); rect(-200, -300, 400, 520, { wash: '#a8d0f0', washA: 1, w: 4, col: L }); ctx.save(); ctx.beginPath(); ctx.rect(-196, -296, 392, 512); ctx.clip(); blackMountain(-200, 200, 220, 260, t, 10100, { col: '#5a6a5a', trees: 20 }); ctx.restore();
    pencil([[0, -300], [0, 220]], { w: 4, col: L, pass2: false }); pencil([[-200, -40], [200, -40]], { w: 4, col: L, pass2: false }); pop();
    push(860, 560, 1); rect(-120, -150, 240, 300, { wash: '#6a4a2a', washA: 1, w: 4, col: MEC.gold }); meFlag(-80, -110, 160, 110, t, { pole: 0 }); pop();
    rect(-300, 1150, 1700, 60, { wash: '#5a3a1a', washA: 1, w: 2.4, col: L });
    push(520, 1100, 0.6); meFlag(-140, -200, 120, 80, t, { pole: 200 }); poly([[40, -200], [180, -200], [180, -110], [40, -110]], { wash: MEC.jp, washA: 1, w: 1.6, col: L }); ell(110, -155, 26, 26, { wash: MEC.jpRed, washA: 1, line: false }); pencil([[40, -200], [40, 0]], { w: 5, col: '#4a3a2a', pass2: false }); pop();
  }
  function people(t) {                                              // японская делегация, черногорские дипломаты, конверт
    const J = [[760, '#1a1a1e'], [860, '#2a2a3a'], [960, '#1a1a1e']], M = [[120, '#2a2a3a'], [220, '#1a1a1e'], [320, '#3a3a44']];
    J.forEach(([x, c], i) => human(x, 1180, 0.68, t, { body: c, legs: '#1a1a1e', armR: i === 0 && t > EV.jp_rec ? 'wave' : 'hold', flip: -1, seed: 10110 + i, face: 'smile', skin: '#f0d0a8', long: i === 1 ? 1 : undefined }));
    M.forEach(([x, c], i) => human(x, 1180, 0.68, t, { body: c, legs: '#1a1a1e', armR: t > EV.jp_close ? 'wave' : 'hold', seed: 10120 + i, face: t > EV.jp_close ? 'grin' : 'smile' }));
    const k = sm(clamp((t - EV.jp_rec) / 0.8)); push(lerp(720, 560, k), 1180 - 240 * 0.68, 0.8, -0.1); rect(-60, -40, 120, 80, { wash: '#f4efe4', washA: 1, w: 2, col: L }); pencil([[-60, -40], [0, 10], [60, -40]], { w: 2, col: L, pass2: false }); ell(0, 10, 14, 14, { wash: MEC.jpRed, washA: 1, w: 1.4, col: L }); pop();
    push(520, 1140, 0.7); blob([[-20, 0], [-26, -60], [-10, -90], [10, -90], [26, -60], [20, 0]], { wash: '#2a3a5a', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 8; q++) ell(-40 + q * 12, -120 - Math.sin(q) * 30, 10, 10, { wash: '#f8c8d8', washA: 1, w: 1, col: '#a86878' }); pencil([[0, -90], [-40, -150], [40, -140]], { w: 3, col: '#4a2a1a', pass2: false }); pop();
  }
  function floor_(t) { rect(-500, 1360, 2200, 1000, { wash: '#8a5a32', washA: 1, w: 2, col: L }); for (let i = 0; i < 24; i++) for (let j = 0; j < 8; j++) pencil([[-400 + i * 80 + (j % 2) * 40, 1380 + j * 80], [-360 + i * 80 + (j % 2) * 40, 1420 + j * 80]], { w: 2, col: '#5a3a1a', a: 0.5, pass2: false });
    push(640, 1720, 1); ell(0, 0, 440, 76, { wash: '#2a4a7a', washA: 0.85, w: 2, col: L }); ell(0, 0, 360, 56, { wash: false, w: 4, col: MEC.gold }); pop();
    for (let i = 0; i < 2; i++) { push(1060 + i * 120, 1780 + i * 30, 1); rect(-40, -100, 80, 100, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); rect(-50, -110, 100, 20, { wash: '#8a5a32', washA: 1, w: 1.6, col: L }); pop(); }
    lightPool(WIN[0] + 300, 1600, 900, 200, 'rgba(255,236,190,1)', 0.3); castShadow(380, 1700, 110, 440, 0.6, 0.3); moodDark(1100, 1000, 800, 1900, '#1a1008', 0.18); }
  function extras(t) {                                              // журналисты с камерами и микрофонами, вспышки
    for (let i = 0; i < 3; i++) { const x = -80 + i * 80 + (i > 1 ? 1180 : 0); push(x, 1540, 0.9, 0, x > 600 ? -1 : 1); human(0, 0, 1, t, { body: ['#3a3a44', '#5a4a3a', '#2a3a2a'][i], hat: i === 1 ? 'cap' : null, hatCol: '#2a2a2e', legs: '#2a2a2a', armR: 'hold', seed: 10130 + i, face: 'calm' }); rect(30, -300, 70, 50, { wash: '#1a1a1e', washA: 1, w: 1.6, col: L }); ell(100, -276, 16, 16, { wash: '#4a6a8a', washA: 1, w: 1.4, col: L }); if (Math.sin(t * 7 + i * 2) > 0.93) glow(60, -276, 90, 'rgba(255,255,240,1)', 0.6); pop(); }
  }
  function front(t) { for (const x of [-170, 1250]) { rect(x - 60, 300, 120, 2100, { wash: '#d8ccb4', washA: 1, w: 2.4, col: L, shade: { gap: 10, a: 0.15, col: '#8a7a60', ang: 0 } }); } }
  function letter(t) { if (t < EV.jp_close) return; const k = popK(t, EV.jp_close, 0.35); push(640, 990, 0.85 * k, 0.03); ctx.save(); ctx.fillStyle = 'rgba(250,246,236,0.98)'; ctx.fillRect(-250, -170, 500, 340); ctx.restore(); pencil([[-250, -170], [250, -170], [250, 170], [-250, 170], [-250, -170]], { w: 3, col: L, pass2: false, gap: false });
    ell(180, -110, 34, 34, { wash: MEC.jpRed, washA: 1, line: false }); txt('Япония — Черногория', -20, -110, 32, { col: L, font: 'Hand' }); txt('ВОЙНА', 0, -20, 70, { col: MEC.ink, font: 'Osw' }); txt('ОКОНЧЕНА', 0, 60, 70, { col: '#2a8a4a', font: 'Osw' }); txt('июнь 2006', 0, 130, 30, { col: '#5a5a5a', font: 'Hand' }); pop();
    if (t > EV.jp_war) stamp(700, 1260, 0.9, t, EV.jp_war, 'ДЕЛО ЗАКРЫТО', '#2a8a4a', -0.15); }
  function extras2(t) {                                             // книжный шкаф, секретарь с подносом кофе, фикус, напольная лампа
    push(1200, 1440, 0.8); rect(-120, -500, 240, 500, { wash: '#5a3a1a', washA: 1, w: 2, col: L }); for (let r = 0; r < 4; r++) { pencil([[-120, -380 + r * 120], [120, -380 + r * 120]], { w: 4, col: '#3a2010', pass2: false }); for (let q = 0; q < 8; q++) rect(-110 + q * 27, -480 + r * 120, 22, 90, { wash: ['#8a2a2a', '#2a4a7a', '#3a6a3a', '#c8a040'][q % 4], washA: 1, w: 1, col: L }); } pop();
    push(980, 1560, 0.85); human(0, 0, 1, t, { body: '#e8e4d8', hat: 'bun', hatCol: '#3a2a1a', legs: '#2a2a36', long: 1, armR: 'hold', flip: -1, seed: 10160, face: 'smile' }); ell(-60, -270, 60, 10, { wash: '#c8ccd4', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 3; q++) { ell(-90 + q * 30, -284, 10, 12, { wash: '#f4f4f0', washA: 1, w: 1, col: L }); } pop();
    push(-60, 1560, 0.9); rect(-40, -70, 80, 70, { wash: MEC.terra, washA: 1, w: 2, col: L }); for (let q = 0; q < 8; q++) ell(-40 + (q % 3) * 40, -110 - Math.floor(q / 3) * 50, 34, 22, { wash: q % 2 ? '#3a6a2a' : '#5a8a3a', washA: 1, w: 1.2, col: L }); pop();
    push(1080, 1460, 0.8); pencil([[0, 0], [0, -360]], { w: 5, col: '#2a2a2e', pass2: false }); poly([[-60, -360], [60, -360], [40, -440], [-40, -440]], { wash: '#f4e8c8', washA: 1, w: 2, col: L }); glow(0, -380, 70, 'rgba(255,220,150,1)', 0.3); pop();
    push(300, 1500, 0.8); rect(-120, -110, 240, 20, { wash: '#5a3a1a', washA: 1, w: 2, col: L }); for (const k of [-100, 100]) pencil([[k, -90], [k, 0]], { w: 6, col: '#3a2010', pass2: false }); ell(-40, -130, 26, 8, { wash: '#f4f4f0', washA: 1, w: 1.2, col: L }); rect(20, -150, 70, 40, { wash: '#2a2a2e', washA: 1, w: 1.4, col: L }); pencil([[-60, -130], [-20, -170]], { w: 2, col: '#d8d8d8', a: 0.6, pass2: false }); pop();
  }
  WORLD.japan = (t, u, cat) => {
    lay(40, () => room(t)); lay(3, () => people(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => { floor_(t); cat(); }); lay(0.62, () => front(t));
    lay(2, () => { rays(WIN[0], WIN[1], 0.6, 0.35, 1400, 'rgba(255,236,190,1)', 0.12, 5, t); motes(14, [-100, 500, 1200, 1500], '#fff0c8', t, 10140, { sp: 1, sz: 2.4, a: 0.4, wob: 12, add: 1 }); });
  };
  DIR.japan = {
    outfit: 'suitK', light: { side: -1, rim: '#ffe8c0' }, grade: ['#2a1a10', 0.04],
    act: () => [[S0.japan, 'smug'], [EV.jp_rec, 'awe'], [EV.jp_close, 'grin'], [EV.jp_war, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 380, y: 1720, s: 0.95, look: [0.6, -0.4], hand: t > EV.jp_rec ? [220, -280] : [150, -300] }),
    hud: t => letter(t),
    cam: () => [[S0.japan, 600, 980, -0.08], [EV.jp_rec, 620, 960, -0.04], [EV.jp_close, 580, 980, 0], [S1.japan, 560, 1000, 0.02]]
  };
  TRANS_IN.japan = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.drawImage(A, 0, 0); ctx.restore(); for (let i = 0; i < 12; i++) { const r = rng(10150 + i); ell(r() * W, (r() * H + e * 1200) % H, 14, 10, { wash: '#f8c8d8', washA: Math.sin(e * Math.PI), line: false, rot: r() * 3 }); } }); } };
})();
