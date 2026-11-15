/* 028 — сцена `today`: 2026, ночной Казанский кремль с площади у Кул-Шарифа. Мечеть в бирюзовой подсветке и Благовещенский собор
   в тёплой — рядом; Сююмбике, Спасская, мост через Казанку в огнях, гуляющие, туристы с телефонами, чак-чак в коробке.
   Главный свет — подсветка мечети (бирюзовый), второй — тёплый собор. Том (hoodieKZN): на «мечеть» и «собор» — подписи-стрелки,
   на «миллион» — плашка «1 300 000». Планы — window.TQ для кнопки. */
(() => {
  EV.td_kr = wtk('t1', 'кремле');
  EV.td_mosq = wtk('t1', 'мечеть');
  EV.td_sob = wtk('t1', 'собор,');
  EV.td_mil = wtk('t1', 'миллион');
  KEYW.push('мечеть', 'собор,', 'миллион');
  const L = KZ.ink;
  function sky(t) { vgrad(-900, 1200, ['#060818', '#0e1630', '#1a2244'], 1); const r = rng(4000); ctx.save(); ctx.fillStyle = '#fff8e8'; for (let i = 0; i < 60; i++) { ctx.globalAlpha = 0.2 + 0.5 * r(); ctx.fillRect(r() * 1300 - 100, r() * 700 - 100, 2.2, 2.2); } ctx.restore(); ell(160, 420, 40, 40, { wash: '#f0ecd8', washA: 1, line: false }); }
  function kremlinD(t) { hills(1060, 30, '#10142a', 4001); kWall(-300, 1400, 1080, 70, t, { col: '#d8d0c0' }); suyum(140, 1060, 0.55, t, { lit: 1 }); annunc(380, 1020, 0.6, t); glow(380, 860, 200, 'rgba(255,214,150,1)', 0.18); kulsharif(800, 1030, 0.75, t, { lit: 1 }); glow(800, 800, 280, 'rgba(120,230,220,1)', 0.2); kTower(1220, 1080, 0.5, t, { spire: true });
    push(-200, 1080, 0.8); pencil([[-300, -40], [600, -40]], { w: 10, col: '#d8dce4', pass2: false }); pencil([[60, -40], [150, -380], [240, -40]], { w: 14, col: '#f4f6fa', pass2: false }); pencil([[150, -380], [150, -40]], { w: 10, col: '#f4f6fa', pass2: false }); for (let q = 0; q < 8; q++) pencil([[150, -360 + q * 30], [-200 + q * 50, -40]], { w: 1.6, col: '#c8d0dc', pass2: false }); for (let q = 0; q < 10; q++) ell(-280 + q * 90, -46, 4, 4, { wash: '#ffe8a8', washA: 1, line: false }); pop();   // мост «Миллениум»
    push(1420, 1060, 0.7); shape([[-150, -40], [150, -40], [220, -200], [-220, -200]], { wash: '#c8a050', washA: 1, w: 2, col: L }); ell(0, -200, 220, 30, { wash: '#e8c86a', washA: 1, w: 2, col: L }); rect(-40, -40, 80, 40, { wash: '#8a6a3a', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 6; q++) rect(-180 + q * 64, -150, 40, 30, { wash: '#ffe0a0', washA: 1, line: false }); pop();   // центр «Чаша»
    depthFog('#141a3a', 0.06); }
  function square(t) {                                               // площадь: гуляющие, фонари, туристы, скамейки, клумбы
    rect(-500, 1280, 2100, 40, { wash: '#3a3a48', washA: 1, w: 2, col: L });
    for (const x of [-60, 560, 1180]) { pencil([[x, 1290], [x, 1020]], { w: 7, col: '#2a2a30', pass2: false }); ell(x, 1010, 18, 22, { wash: '#ffe8a8', washA: 1, w: 2, col: L }); glow(x, 1010, 70, 'rgba(255,220,150,1)', 0.3); }
    const P = [[60, '#3a5a8a', null, 'phone'], [200, '#c83a5a', 'scarf', 'hold'], [700, '#2a8a4a', 'cap', 'wave'], [860, '#e8c050', 'scarf', 'phone'], [1000, '#6a3a6a', null, 'hold'], [1300, '#3a3a52', 'cap', 'wave']];
    P.forEach(([x, c, h, a], i) => human(x, 1300, 0.55, t, { body: c, hat: h, hatCol: '#e8c050', legs: '#2a2a32', hair: i % 2 ? '#c8a050' : '#2a1a10', armR: a === 'phone' ? 'hold' : a, prop: a === 'phone' ? 'phone' : undefined, flip: x > 600 ? -1 : 1, seed: 4005 + i, face: 'smile', long: h === 'scarf' ? 1 : 0 }));
    for (const x of [380, 1100]) { push(x, 1300, 0.7); rect(-80, -40, 160, 16, { wash: '#6a4424', washA: 1, w: 1.6, col: L }); for (const k of [-60, 60]) pencil([[k, -26], [k, 0]], { w: 5, col: '#2a2a30', pass2: false }); pop(); }
  }
  function plaza(t) {                                                // брусчатка под Томом, коробка чак-чака, клумба с тюльпанами
    rect(-500, 1400, 2100, 900, { wash: '#3a3640', washA: 1, w: 2, col: L }); for (let j = 0; j < 8; j++) for (let i = 0; i < 20; i++) rect(-500 + i * 100 + (j % 2) * 50, 1404 + j * 60, 98, 58, { wash: (i + j) % 3 ? '#45414c' : '#3a3640', washA: 1, w: 1, col: '#22202a' });
    lightPool(800, 1620, 600, 140, 'rgba(120,230,220,1)', 0.3); lightPool(380, 1640, 360, 90, 'rgba(255,214,150,1)', 0.35);
    push(980, 1660, 1); rect(-120, -50, 240, 50, { wash: '#4a3a2a', washA: 1, w: 2, col: L }); for (let q = 0; q < 9; q++) { pencil([[-100 + q * 25, -50], [-104 + q * 25, -110]], { w: 4, col: '#3a6a2a', pass2: false }); blob([[-112 + q * 25, -110], [-104 + q * 25, -140], [-96 + q * 25, -110]], { wash: q % 2 ? KZ.pom : '#e8c050', washA: 1, w: 1, col: L }); } pop();
    push(180, 1700, 1); rect(-60, -40, 120, 40, { wash: KZ.gold, washA: 1, w: 2, col: KZ.goldD }); txt('ЧАК-ЧАК', 0, -18, 20, { col: '#5a3a10', font: 'Osw' }); pop();
    push(1180, 1700, 1); for (const k of [-40, 40]) ell(k, -20, 22, 22, { line: true, w: 4, col: '#c8c8cc' }); pencil([[-40, -20], [-20, -110], [40, -20]], { w: 4, col: '#e8c050', pass2: false }); rect(-30, -120, 30, 10, { wash: '#2a2a30', washA: 1, line: false }); pop();   // самокат
    for (let q = 0; q < 4; q++) human(-40 + q * 110, 1760, 0.6, t, { body: ['#c83a5a', '#2a8a4a', '#3a5a8a', '#e8c050'][q], legs: '#2a2a32', hair: q % 2 ? '#c8a050' : '#2a1a10', armR: q % 2 ? 'wave' : 'hold', prop: q === 2 ? 'phone' : undefined, seed: 4080 + q, face: 'smile', flip: q % 2 ? -1 : 1 });   // гуляющие
    push(600, 1700, 0.9); ell(0, -16, 22, 14, { wash: '#8a8e9a', washA: 1, w: 1.4, col: KZ.ink }); ell(18, -28, 10, 9, { wash: '#7a7e8a', washA: 1, w: 1.2, col: KZ.ink }); poly([[26, -28], [36, -26], [26, -24]], { wash: '#e8a83a', washA: 1, line: false }); pencil([[-4, -4], [-6, 6]], { w: 2, col: '#c84a3a', pass2: false }); pencil([[6, -4], [8, 6]], { w: 2, col: '#c84a3a', pass2: false }); pop(); push(660, 1720, 0.9); ell(0, -16, 22, 14, { wash: '#8a8e9a', washA: 1, w: 1.4, col: KZ.ink }); ell(18, -28, 10, 9, { wash: '#7a7e8a', washA: 1, w: 1.2, col: KZ.ink }); poly([[26, -28], [36, -26], [26, -24]], { wash: '#e8a83a', washA: 1, line: false }); pencil([[-4, -4], [-6, 6]], { w: 2, col: '#c84a3a', pass2: false }); pencil([[6, -4], [8, 6]], { w: 2, col: '#c84a3a', pass2: false }); pop();
    push(-200 + ((t * 60) % 1700), 1280, 0.6); rect(-200, -150, 400, 120, { wash: '#c8202a', washA: 1, w: 2, col: L }); for (let q = 0; q < 6; q++) rect(-180 + q * 62, -130, 44, 50, { wash: '#ffe8a8', washA: 1, w: 1, col: L }); pencil([[0, -150], [0, -220]], { w: 3, col: '#2a2a30', pass2: false }); for (const k of [-140, 140]) ell(k, -26, 18, 18, { wash: '#1a1a1e', washA: 1, line: false }); pop();   // трамвай
    for (let q = 0; q < 3; q++) { push(640 + q * 160, 1860, 1); ell(0, 0, 60, 18, { wash: '#2a3a20', washA: 1, w: 1.6, col: L }); for (let k = 0; k < 6; k++) { blob([[-50 + k * 20, -10], [-44 + k * 20, -40], [-38 + k * 20, -10]], { wash: k % 2 ? KZ.pom : '#e8c050', washA: 1, w: 1, col: L }); } pop(); }   // клумбы
    castShadow(330, 1612, 120, 420, -0.3, 0.4); moodDark(800, 1100, 800, 1700, '#04060e', 0.4);
  }
  function hud(t) {
    for (const [ev, x, y, s, c] of [[EV.td_mosq, 800, 760, 'МЕЧЕТЬ ↓', KZ.turqL], [EV.td_sob, 380, 760, '↓ СОБОР', KZ.goldL]]) if (t > ev - 0.05 && t < EV.td_mil) { const q = popK(t, ev - 0.05, 0.3); push(x, y, q); rect(-110, -36, 220, 72, { wash: '#0a0a1a', washA: 0.85, w: 2.4, col: c }); txt(s, 0, 2, 38, { col: c, font: 'Osw' }); pop(); }
    if (t > EV.td_mil - 0.05) { const q = popK(t, EV.td_mil - 0.05, 0.35); push(560, 800, q, 0.02); rect(-260, -66, 520, 132, { wash: '#14100a', washA: 0.92, w: 3, col: KZ.goldL }); txt('1 300 000', 0, -10, 64, { col: KZ.goldL, font: 'Osw' }); txt('жителей', 0, 44, 26, { col: '#f6e7c8', font: 'Osw' }); pop(); }
  }
  function front(t) { for (const x of [-60, 1150]) sil([[x - 50, 2200], [x - 40, 1500], [x + 40, 1480], [x + 50, 2200]], '#0a0a12', 1); }
  window.TQ = { sky, kremlinD, square, plaza, front };
  WORLD.today = (t, u, cat) => { lay(40, () => sky(t)); lay(10, () => kremlinD(t)); lay(2.6, () => { square(t); depthFog('#141a3a', 0.04); }); lay(1, () => { plaza(t); cat(); }); lay(0.6, () => front(t)); lay(2.2, () => motes(24, [-100, 700, 1200, 1400], '#c8e8ff', t, 4010, { sp: 2, sz: 2, a: 0.4, wob: 20, add: 1 })); };
  DIR.today = {
    outfit: 'hoodieKZN', light: { side: 1, rim: '#8ae8d8' }, grade: ['#1a1a40', 0.06],
    act: () => [[S0.today, 'grin'], [EV.td_mosq, 'awe'], [EV.td_mil, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.td_mosq && t < EV.td_sob ? [0.9, -0.6] : t > EV.td_sob && t < EV.td_mil ? [0.2, -0.7] : [0.4, -0.3], hand: t > EV.td_mosq - 0.1 && t < EV.td_mil ? [240, -500] : [170, -300], tailUp: t > EV.td_mil }),
    cam: () => [[S0.today, 600, 980, -0.04], [EV.td_mosq, 640, 960, 0.0], [EV.td_mil, 560, 1000, 0.08, 'x'], [S1.today, 560, 1000, 0.1]],
    hud
  };
  TRANS_IN.today = { a: 0.12, b: 0.38, fx(k, t, A, B) { const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI); for (let k2 = 0; k2 < 6; k2++) { ctx.save(); ctx.globalAlpha = a * 0.8; ornament(180 + (k2 % 3) * 360, 500 + Math.floor(k2 / 3) * 900, 260 * a + 40, t, { rot: e * 4 + k2 }); ctx.restore(); } }); } };
})();
