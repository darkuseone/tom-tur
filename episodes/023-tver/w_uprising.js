/* 023 — сцена `uprising`: 15 августа 1327, Тверь. Душный вечер, набат: на звоннице раскачивается вечевой колокол, горожане с топорами
   и кольями бегут к горящему двору ханского посла Чолхана (огонь и дым за частоколом, без людей в огне). На «восстала» — колокол бьёт,
   толпа вскидывает руки, ханский ярлык рвётся; на «Калита» справа на холм выезжает Иван Калита с кошелём-калитой, за ним — тёмная
   ордынская конница с бунчуками; на «войско.» — у Москвы на табло появляется «+ ОРДА». Без крови и тел.
   Переход В сцену — разорванная грамота: ханский ярлык рвётся сверху вниз зигзагом, в разрыве — 1327. */
(() => {
  EV.up_rise = wtk('s4', 'восстала');
  EV.up_horde = wtk('s4', 'Орды.');
  EV.up_kal = wtk('s4', 'Калита');
  EV.up_army = wtk('s4', 'войско.');
  KEYW.push('восстала', 'Калита', 'войско.');
  SHAKES.push([EV.up_rise + 0.05, 0.2, 7], [EV.up_army, 0.3, 8]);
  const L = TV.ink;
  function sky(t) { vgrad(-900, 1250, ['#2a1e2a', '#4a2e34', '#8a4a3a', '#d07a40', '#f0b060'], 1); glow(500, 1000, 700, 'rgba(255,140,60,1)', 0.45);
    clouds(t, -460, 6, '#3a2430', 23501, 0.65); clouds(t, 200, 4, '#a0503a', 23502, 0.5); birds(t, 8, [-100, -100, 1200, 600], 23503, '#140c0c'); }
  function far(t) {                                                 // посад, собор, горящий двор Чолхана
    hills(1080, 26, '#3a3030', 23504, 1);
    for (let i = 0; i < 12; i++) izba(-80 + i * 115, 1140, 84, 50 + (i * 23) % 30, t, { roof: '#4a3a2a', lit: i % 3 === 0 });
    sobor(860, 1130, 0.34, t, { col: '#f0dcc0' });
    push(420, 1150, 0.8); rect(-160, -200, 320, 200, { wash: '#5a3a24', washA: 1, w: 2.2, col: L }); poly([[-190, -200], [0, -300], [190, -200]], { wash: '#3a2a1a', washA: 1, w: 2.2, col: L }); pop();   // двор посла
    const fl = flick(t); glow(420, 1000, 360, 'rgba(255,120,40,1)', 0.6 * fl);
    for (let i = 0; i < 9; i++) { const r = rng(23505 + i), x = 300 + r() * 240, h = 120 + r() * 160; blob([[x - 30, 1150], [x - 14, 1150 - h * 0.6 - Math.sin(t * 9 + i) * 16], [x, 1150 - h - Math.sin(t * 7 + i) * 20], [x + 16, 1150 - h * 0.5], [x + 30, 1150]], { wash: i % 2 ? '#f08a30' : '#ffd060', washA: 0.85, line: false }); }
    smokeCol(420, 900, t, { col: 'rgba(60,40,40,0.55)', h: 700, sz: 0.8, n: 6 });
    palisade(-160, 1360, 1180, 70, t, { col: '#6a4a30', seed: 23506 });
  }
  function bell(t) {                                                // вечевой колокол на звоннице — набат
    push(1060, 1300, 0.9); for (const sx of [-90, 90]) rect(sx - 14, -520, 28, 520, { wash: '#6a4a30', washA: 1, w: 2, col: L }); pencil([[-120, -500], [120, -500]], { w: 12, col: '#4a3020', pass2: false });
    poly([[-140, -520], [0, -620], [140, -520]], { wash: '#3a4a3a', washA: 1, w: 2.2, col: L });
    const sw = Math.sin(t * 6) * (t > EV.up_rise ? 0.45 : 0.18);
    push(0, -500, 1, sw); pencil([[0, 0], [0, 26]], { w: 4, col: L, pass2: false }); blob([[-34, 26], [-44, 80], [-80, 150], [80, 150], [44, 80], [34, 26]], { wash: '#a8783a', washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.3, col: '#3a2410', ang: 1 } }); ell(0, 160, 12, 12, { wash: '#3a2a1a', washA: 1, w: 1.4, col: L }); pop();
    for (let k = 0; k < 3; k++) pencil(ellPts(0, -400, 140 + k * 50 + (t * 260) % 80, 70 + k * 24, 0, 0.6, 20).slice(0, 12), { w: 4, col: '#ffd890', a: 0.5, pass2: false });
    human(-40, -10, 0.4, t, { body: '#e8dcb8', legs: '#3a3020', beard: 1, seed: 2370, armR: 'up', armL: 'up' }); pop();   // звонарь
  }
  function horde(t) {                                               // справа на холм выезжают Калита и ордынская конница
    const come = sm((t - EV.up_kal + 0.1) / 0.6);
    if (come <= 0) return; const dx = (1 - come) * 600;
    push(dx, 0, 1);
    shape([[380, 1300], [640, 1180], [1400, 1160], [1400, 1300]], { wash: '#3a2a24', washA: 1, w: 2, col: L });
    for (let k = 0; k < 9; k++) rider(620 + (k % 5) * 105, 1230 - Math.floor(k / 5) * 50 + (k % 2) * 10, 0.27, t, { flip: -1, col: '#2a1e1e', horseCol: '#1a1210', hat: k % 3 ? undefined : 'helmet', hatCol: '#3a2a1a', spear: k % 2 === 0, walk: 1.2 });
    for (const x of [700, 980]) { pencil([[x, 1220], [x, 900]], { w: 5, col: '#1a1010', pass2: false }); for (let k = 0; k < 7; k++) pencil([[x, 910], [x - 12 + k * 4 + Math.sin(t * 6 + k) * 8, 1000]], { w: 4, col: '#1a1010', pass2: false }); }
    human(560, 1290, 0.42, t, { body: '#6a2a3a', legs: '#2a1a14', long: 1, hat: 'fur', hatCol: '#3a2a1a', beard: 1, seed: 2371, armR: 'up', flip: -1, trim: TV.gold });   // Иван Калита
    push(522, 1150, 0.42); blob([[-24, 0], [-30, 40], [-20, 64], [20, 64], [30, 40], [24, 0]], { wash: '#8a5a2a', washA: 1, w: 2, col: L }); pencil([[-24, 4], [24, 4]], { w: 4, col: TV.gold, pass2: false }); pop();   // калита-кошель
    if (come > 0.6) { push(600, 1010, popK(t, EV.up_kal + 0.3, 0.3)); rect(-130, -28, 260, 56, { wash: '#16120c', washA: 0.86, w: 2.4, col: '#e8a090' }); txt('ИВАН КАЛИТА', 0, 10, 32, { col: '#ffd8c8', font: 'Osw' }); pop(); }
    pop();
  }
  function crowd2(t) {                                              // горожане бегут к пожару: топоры, колья, вилы
    const up = t > EV.up_rise;
    for (let k = 0; k < 8; k++) { const x = 200 + k * 95 + Math.sin(t * 4 + k) * 6; human(x, 1420 + (k % 3) * 12, 0.42, t, { body: ['#e8dcb8', '#a8c0d8', '#6a3a2a', '#4a6a3a', '#b0322a', '#e8dcb8', '#5a5a6a', '#8a6a3a'][k], legs: '#3a3020', hat: k % 3 === 0 ? 'cap' : k % 3 === 1 ? undefined : 'scarf', hatCol: '#5a4a3a', beard: k % 2, seed: 2380 + k, prop: k % 2 ? 'axe' : 'stick', armR: up ? 'up' : 'hold', flip: -1, walk: t * 8 }); }
    crowd(100, 1100, 1350, 16, t, 23507, { s: 0.34, cols: ['#e8dcb8', '#6a3a2a', '#3a5a3a', '#b0322a', '#a8c0d8'] });
  }
  function ground(t) {                                              // улица: бревенчатая мостовая, телега, бочки, вёдра с водой
    rect(-600, 1440, 2400, 900, { wash: '#6a5034', washA: 1, line: false });
    for (let k = 0; k < 12; k++) { const y = 1450 + k * k * 5 + k * 26; pencil([[-200, y], [1300, y]], { w: 2, col: '#3a2818', a: 0.7, pass2: false }); }
    const r = rng(23508); for (let i = 0; i < 80; i++) pencil([[r() * 1200 - 50, 1460 + r() * 600], [r() * 1200 - 30, 1460 + r() * 600]], { w: 1.2, col: '#3a2818', a: 0.3, pass2: false });
    cart(860, 1640, 0.5, t, { load: 'barrels' }); horse(1030, 1640, 0.42, t, { col: '#5a3a20', flip: -1 });
    for (const [x, y] of [[560, 1700], [610, 1720], [660, 1700]]) { blob([[x - 26, y], [x - 30, y - 50], [x + 30, y - 50], [x + 26, y]], { wash: '#8a6a42', washA: 1, w: 2, col: L }); ell(x, y - 50, 28, 6, { wash: '#6a9ac0', washA: 1, w: 1, col: L }); }
    barrel(440, 1760, 0.5); sack(740, 1780, 0.5, '#c8b08a'); crate(1100, 1800, 110, 60); jug(380, 1800, 0.42);
    human(520, 1640, 0.56, t, { body: '#b0322a', legs: '#3a3020', hat: 'scarf', hatCol: TV.flax, long: 1, seed: 2390, armL: 'hold', armR: 'hold', look: [0.5, -0.4] });
    human(1160, 1700, 0.52, t, { body: '#a8c0d8', legs: '#3a3020', seed: 2391, armR: 'point', flip: -1, look: [-0.6, -0.6] });
    dog(300, 1820, 0.32, t, { col: '#3a2a1a' });
    motes(30, [200, 900, 1100, 1500], '#ffb060', t, 23509, { sp: -140, vx: 60, sz: 3, a: 0.9, wob: 30, add: 1 });   // искры
  }
  function front(t) {                                               // передний план: столб ворот и ветка, дым у края
    for (let i = 0; i < 6; i++) { const x = 1100 + i * 40; pencil([[x, 2200], [x + 10, 1700 - i * 30]], { w: 22, col: '#3a2818', pass2: false }); poly([[x - 12, 1700 - i * 30], [x + 10, 1650 - i * 30], [x + 32, 1700 - i * 30]], { wash: '#3a2818', washA: 1, w: 2, col: L }); }   // край частокола
    blob([[-200, 1900], [-60, 1760], [120, 1800], [200, 1960], [-100, 2100]], { wash: '#2a3a24', washA: 1, w: 2, col: L });
    smokeCol(-40, 1700, t, { col: 'rgba(60,40,40,0.4)', h: 600, sz: 0.6, n: 4 });
  }
  function hud(t) {
    if (t > EV.up_rise - 0.05 && t < EV.up_kal) { const tear = sm((t - EV.up_rise) / 0.35); for (const sd of [-1, 1]) { push(560 + sd * tear * 80, 1150, 0.9, sd * tear * 0.3); ctx.save(); ctx.beginPath(); ctx.rect(sd < 0 ? -200 : 0, -300, 200, 600); ctx.clip(); gramota(0, 0, 1, t, { title: 'ЯРЛЫК', seal: false, col: '#e8d8a8' }); ctx.restore(); pop(); } }
    const s = t > EV.up_army - 0.05; scoreHud(t, 3, 1, s ? { t0: EV.up_army - 0.05, side: 1 } : {});
    if (s) { const q = popK(t, EV.up_army - 0.05, 0.35); push(880, 850, q, 0.06); rect(-110, -30, 220, 60, { wash: '#7a1a1a', washA: 0.95, w: 2.4, col: '#ffd8c8' }); txt('+ ОРДА', 0, 12, 40, { col: '#ffe8d8', font: 'Osw' }); pop(); }
  }
  WORLD.uprising = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(14, () => far(t));
    lay(5, () => { bell(t); horde(t); });
    lay(2.4, () => crowd2(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    motes(36, [-200, 300, 1300, 1400], '#5a4040', t, 23510, { sp: -30, vx: 50, sz: 4, a: 0.35, wob: 24 });   // пепел
    haze('#d0703a', 0.07);
  };
  DIR.uprising = {
    outfit: 'kolchuga', light: { side: 1, rim: '#ffa060' }, grade: ['#b05a30', 0.15],
    act: () => [[S0.uprising, 'talk'], [EV.up_rise, 'proud'], [EV.up_kal, 'shock'], [EV.up_army, 'annoyed']],
    pose: (t, u, b) => Object.assign(b, { x: 260, y: 1590, s: 1.0, look: t < EV.up_kal ? [0.6, -0.5] : [0.9, -0.5], tailUp: t > EV.up_rise && t < EV.up_kal, sweat: t > EV.up_kal ? 1 : 0,
      point: t > EV.up_kal && t < EV.up_army + 0.3 ? 1 : undefined, hand: t > EV.up_kal && t < EV.up_army + 0.3 ? [260, -300] : t > EV.up_rise && t < EV.up_kal ? [80, -380] : undefined }),
    cam: () => [[S0.uprising, 580, 980, 0.16], [EV.up_rise, 560, 960, 0.08, 'x'], [EV.up_kal, 700, 960, 0.1], [EV.up_army, 720, 940, 0.06, 'x'], [S1.uprising, 680, 960, 0.12]],
    hud
  };
  TRANS_IN.uprising = { a: 0.2, b: 0.35, fx(k, t, A, B) {           // ханский ярлык рвётся сверху вниз зигзагом; в разрыве — 1327
    const g = sm(k) * 700, P = []; for (let y = -20; y <= H + 40; y += 60) P.push([540 + ((y / 60) % 2 ? 30 : -30), y]);
    drawBuf(B);
    scr(() => { for (const sd of [-1, 1]) { ctx.save(); ctx.beginPath(); if (sd < 0) { ctx.moveTo(-10, -20); P.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(-10, H + 40); } else { ctx.moveTo(W + 10, -20); P.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(W + 10, H + 40); } ctx.closePath();
      ctx.translate(sd * g, 0); ctx.rotate(sd * sm(k) * 0.06); ctx.clip(); drawBuf(A); ctx.restore();
      pencil(P.map(([x, y]) => [x + sd * g, y]), { w: 10, col: '#efe0b8', pass2: false, gap: false }); } });
  } };
})();
