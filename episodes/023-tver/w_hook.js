/* 023 — сцена `hook`: 2026, Тверь утром, набережная Волги. Справа за рекой — Старый мост (стальные арки 1900 г.), слева — Путевой дворец,
   на переднем плане над дорогой — синий указатель трассы «← МОСКВА | С.-ПЕТЕРБУРГ →», под ним несутся фуры (миф «просто трасса»).
   С 0,0 с камера падает с неба к указателю; на «Тверь!» на указатель с грохотом падает красная печать «СТОЛИЦА» прямо на табличку «ТВЕРЬ»;
   на «Москва?» стрелка «МОСКВА» мигает, над ней всплывает «?». Переход в туннель — свиток-грамота сворачивается и затягивает кадр.
   Петля: планы — window.TQ, кнопка заканчивается тем же ракурсом и звуком. */
(() => {
  EV.hk_seal = wtk('h1', 'Тверь!');
  EV.hk_q = wtk('h1', 'Москва?');
  EV.hk_wind = wtk('h2', 'Отматываем');
  SHAKES.push([0.02, 0.3, 9], [EV.hk_seal + 0.12, 0.3, 12], [EV.hk_q, 0.2, 5]);
  KEYW.push('Тверь!', 'Москва?');
  const L = TV.ink;
  const TQ = window.TQ = {};
  TQ.sky = t => flaxSky(t, { sx: 860, sy: 330, seed: 23100, nb: 9 });
  TQ.far = t => {                                                   // дальний берег: город, колокольня, Старый мост, Волга
    hills(1110, 26, '#6a8a72', 23101, 1);
    for (let i = 0; i < 10; i++) cityBlock(-120 + i * 140, 1140, 110, 70 + (i * 53) % 110, ['#c8c0a8', '#b8b49c', '#d8ccb0'][i % 3], t, { lit: 0.1, seed: 23102 + i });
    push(1030, 1140, 0.42); rect(-40, -380, 80, 380, { wash: TV.stone, washA: 1, w: 2, col: L }); rect(-50, -440, 100, 60, { wash: TV.stone, washA: 1, w: 2, col: L }); blob([[-34, -440], [0, -520], [34, -440]], { wash: TV.gold, washA: 1, w: 2, col: L }); pencil([[0, -520], [0, -580]], { w: 4, col: TV.gold, pass2: false }); pop();   // колокольня
    volga(1140, 1290, t, { sx: 860, seed: 23103, top: '#a8c4d0', bot: '#4a6a82', glint: '#fff4d0', farBank: false });
    for (const [x0, x1] of [[-80, 380], [380, 840], [840, 1300]]) {      // Старый мост: три стальные арки
      const P = []; for (let k = 0; k <= 16; k++) { const q = k / 16; P.push([lerp(x0, x1, q), 1196 - Math.sin(Math.PI * q) * 90]); }
      pencil(P, { w: 7, col: '#3a5a6a', pass2: false }); pencil(P.map(([x, y]) => [x, y + 22]), { w: 4, col: '#3a5a6a', pass2: false });
      for (let k = 1; k < 16; k++) pencil([P[k], [P[k][0], 1200]], { w: 2, col: '#3a5a6a', a: 0.8, pass2: false });
    }
    pencil([[-100, 1200], [1300, 1200]], { w: 8, col: '#2a3a44', pass2: false }); for (let k = 0; k < 4; k++) rect(360 + k * 460 - 460, 1200, 40, 70, { wash: '#8a8a7a', washA: 1, w: 1.6, col: L });
    ladya(200, 1270, 0.16, t, { sym: null, crew: false }); push(700, 1256, 0.45); rect(-160, -24, 320, 30, { wash: '#f0f0e8', washA: 1, w: 2, col: L }); rect(-60, -60, 140, 36, { wash: '#e8e4d8', washA: 1, w: 2, col: L }); pencil([[-150, -6], [150, -6]], { w: 4, col: TV.linenD, pass2: false }); pop();   // ладья-реплика и теплоход
  };
  TQ.palace = t => {                                                // Путевой дворец: кремовый, белые колонны, купол-бельведер, ограда, липы
    push(330, 1290, 0.62);
    rect(-420, -260, 840, 260, { wash: '#f0dca8', washA: 1, w: 2.4, col: L, shade: { gap: 10, a: 0.12, col: '#a08a5a', ang: 0.9 } });
    rect(-140, -330, 280, 330, { wash: '#f4e4b8', washA: 1, w: 2.4, col: L }); poly([[-160, -330], [0, -410], [160, -330]], { wash: TV.stone, washA: 1, w: 2.4, col: L });
    for (let k = 0; k < 6; k++) { const x = -110 + k * 44; rect(x - 9, -320, 18, 320, { wash: '#fbf6ea', washA: 1, w: 1.4, col: L }); }
    blob([[-60, -400], [-50, -470], [0, -500], [50, -470], [60, -400]], { wash: '#6a8a7a', washA: 1, w: 2, col: L });
    for (let k = 0; k < 12; k++) { const x = -400 + k * 70 + (k > 4 ? 300 : 0); if (x > 400) continue; if (Math.abs(x) < 150) continue; for (const y of [-220, -110]) rect(x, y, 30, 60, { wash: '#4a5a6a', washA: 1, w: 1.4, col: L }); }
    pop();
    crowd(-60, 900, 1300, 14, t, 23105, { s: 0.3, phones: 0.3, cols: ['#3a5a8a', '#b0322a', '#e8dcb8', '#4a6a3a', '#5a4a6a'] });
    for (let k = 0; k < 14; k++) { const x = -40 + k * 56; pencil([[x, 1300], [x, 1250]], { w: 3, col: '#1a1a14', pass2: false }); } pencil([[-60, 1260], [760, 1260]], { w: 3, col: '#1a1a14', pass2: false });   // ограда
    for (const x of [-60, 640, 760]) { pencil([[x, 1300], [x + 6, 1130]], { w: 14, col: '#4a3a2a', pass2: false }); blob([[x - 90, 1150], [x - 70, 1020], [x, 980], [x + 80, 1020], [x + 100, 1150]], { wash: '#5a8a4a', washA: 1, w: 2, col: L, shade: { gap: 8, a: 0.25, col: TV.greenD, ang: 1 } }); }
  };
  TQ.sign = (t, o = {}) => {                                        // указатель трассы над дорогой + печать «СТОЛИЦА» + «?»
    const sx = 640, sy = 1090;
    for (const px of [300, 1020]) { rect(px - 14, sy, 28, 320, { wash: '#7a8a94', washA: 1, w: 2, col: L }); }
    pencil([[290, sy + 10], [1030, sy + 10]], { w: 10, col: '#6a7a84', pass2: false });
    rect(sx - 330, sy - 230, 660, 230, { wash: '#1e4aa0', washA: 1, w: 3, col: '#f6f6f6' }); rect(sx - 318, sy - 218, 636, 206, { line: true, w: 3, col: '#f6f6f6' });
    const mq = o.q !== false && t > EV.hk_q - 0.05 ? (Math.sin(t * 18) > 0 ? 1 : 0.4) : 1;
    pencil([[sx - 300, sy - 160], [sx - 240, sy - 190], [sx - 240, sy - 130], [sx - 300, sy - 160]], { w: 5, col: '#f6f6f6', pass2: false });
    txt('МОСКВА', sx - 120, sy - 146, 50, { col: mq < 1 ? '#ffd040' : '#f6f6f6', font: 'Osw' });
    pencil([[sx + 300, sy - 70], [sx + 240, sy - 100], [sx + 240, sy - 40], [sx + 300, sy - 70]], { w: 5, col: '#f6f6f6', pass2: false });
    txt('С.-ПЕТЕРБУРГ', sx + 50, sy - 56, 44, { col: '#f6f6f6', font: 'Osw' });
    rect(sx - 330, sy - 300, 200, 64, { wash: '#f6f6f6', washA: 1, w: 2.4, col: L }); txt('ТВЕРЬ', sx - 230, sy - 256, 40, { col: '#1e4aa0', font: 'Osw' });
    rect(sx + 200, sy - 290, 120, 54, { wash: '#c8202a', washA: 1, w: 2.4, col: '#f6f6f6' }); txt('М-10', sx + 260, sy - 252, 34, { col: '#f6f6f6', font: 'Osw' });
    const T0 = o.t0 ?? EV.hk_seal, sk = o.seal ?? (t > T0 - 0.15 ? 1 : 0);
    if (sk) { const fall = o.seal !== undefined ? 1 : sm((t - T0 + 0.15) / 0.2), y = lerp(-300, sy - 330, fall);
      push(sx - 230, y, 0.72 + 0.3 * (1 - fall), -0.12); glow(0, 0, 200, 'rgba(255,120,90,1)', 0.35);
      ell(0, 0, 130, 120, { wash: '#b8262a', washA: 1, w: 3, col: L, shade: { gap: 6, a: 0.25, col: '#4a0808', ang: 0.8 } });
      for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283; ell(Math.cos(a) * 128, Math.sin(a) * 116, 22, 18, { wash: '#b8262a', washA: 1, w: 2, col: L }); }   // восковые наплывы
      ell(0, 0, 96, 88, { line: true, w: 3, col: '#5a0a0a' }); txt('СТОЛИЦА', 0, 14, 44, { col: '#ffe8c8', font: 'Osw' }); pop();
      if (o.seal === undefined && t < T0 + 0.6 && t > T0) for (let i = 0; i < 16; i++) { const r = rng(hsh(FRAME, i, 7)), a = r() * 6.28, d = 140 + (t - T0) * 900 * r(); ell(sx - 230 + Math.cos(a) * d, sy - 330 + Math.sin(a) * d * 0.6, 8, 6, { wash: '#c8302a', washA: 0.8, line: false }); } }
    if (o.q !== false && t > EV.hk_q - 0.05) { const q = popK(t, EV.hk_q - 0.05, 0.35); push(sx + 220, sy - 380, q); glow(0, 0, 150, 'rgba(255,220,120,1)', 0.5); txt('?', 0, 50, 190, { col: '#ffd040', font: 'Osw' }); pop(); }
  };
  TQ.road = t => {                                                  // трасса: асфальт, разметка, фуры и легковушки летят
    rect(-900, 1300, 2900, 140, { wash: '#4a4a4c', washA: 1, line: false });
    for (let k = 0; k < 12; k++) { const x = ((k * 160 - t * 900) % 1920 + 1920) % 1920 - 400; pencil([[x, 1370], [x + 80, 1370]], { w: 6, col: '#f0f0e0', pass2: false }); }
    for (let i = 0; i < 3; i++) { const x = ((i * 820 + t * 1300) % 2400) - 900, y = 1330 + i % 2 * 30;   // фуры: тягач + фургон
      push(x, y, 0.62); rect(-300, -150, 380, 150, { wash: ['#e8e4dc', '#c8302a', '#3a6a9a'][i], washA: 1, w: 2.2, col: L }); txt(['ЛЕН', 'ПРОДУКТЫ', 'ВОЛГА'][i], -110, -64, 50, { col: i ? '#f6f6f6' : '#3a6a3a', font: 'Osw' });
      rect(90, -120, 110, 120, { wash: '#2a3a5a', washA: 1, w: 2.2, col: L }); rect(130, -110, 60, 50, { wash: '#a8d0e8', washA: 1, w: 1.4, col: L });
      for (const wx of [-240, -160, 30, 150]) ell(wx, 0, 26, 26, { wash: '#1a1a1a', washA: 1, w: 2, col: L }); pop();
      for (let k = 0; k < 4; k++) pencil([[x - 260 - k * 60, y - 60 + k * 20], [x - 420 - k * 60, y - 60 + k * 20]], { w: 3, col: '#f6f2e8', a: 0.5, pass2: false }); }
    for (let i = 0; i < 2; i++) { const x = 1500 - ((i * 900 + t * 1600) % 2600), y = 1420; push(x, y, 0.5); blob([[-120, 0], [-110, -50], [-50, -90], [60, -90], [110, -50], [130, 0]], { wash: ['#e8b020', '#f0f0f0'][i], washA: 1, w: 2, col: L }); for (const wx of [-70, 70]) ell(wx, 0, 24, 24, { wash: '#1a1a1a', washA: 1, w: 2, col: L }); pop(); }
  };
  TQ.ground = t => {                                                // набережная: плитка, бортик, скамья, фонари, велосипед, голуби, люди
    rect(-900, 1440, 2900, 700, { wash: '#b8ae9a', washA: 1, line: false });
    for (let k = 0; k < 8; k++) { const y = 1450 + k * k * 8 + k * 28; pencil([[-200, y], [1300, y]], { w: 1.8, col: '#6a604e', a: 0.6, pass2: false }); for (let i = 0; i < 10; i++) { const x = -100 + i * 150 + (k % 2) * 75; pencil([[x, y], [x + (x - 540) * 0.06, y + 28 + k * 16]], { w: 1.4, col: '#6a604e', a: 0.45, pass2: false }); } }
    rect(-200, 1436, 1600, 30, { wash: '#e8e0cc', washA: 1, w: 2.2, col: L });
    lamppost(140, 1450, 360, t, { lit: 0 }); lamppost(1120, 1460, 360, t, { lit: 0 });
    push(940, 1600, 0.78); rect(-160, -70, 320, 22, { wash: '#4a7a4a', washA: 1, w: 2, col: L }); rect(-160, -110, 320, 18, { wash: '#4a7a4a', washA: 1, w: 2, col: L }); for (const sx of [-140, 140]) pencil([[sx, -48], [sx, 0]], { w: 8, col: '#2a2a2a', pass2: false }); pop();
    push(700, 1640, 0.6); for (const wx of [-70, 70]) pencil(ellPts(wx, -40, 44, 44, 0, 0.05, 24), { w: 3, col: '#1a1a1a', pass2: false }); pencil([[-70, -40], [-10, -100], [50, -100], [70, -40], [-10, -40], [-10, -100]], { w: 4, col: '#2a6a9a', pass2: false }); pop();   // велосипед
    for (let k = 0; k < 5; k++) { const x = 480 + k * 60 + Math.sin(t * 3 + k) * 8; ell(x, 1700 + (k % 2) * 14, 16, 11, { wash: '#8a8a94', washA: 1, w: 1.4, col: L }); ell(x + 14, 1690 + (k % 2) * 14, 7, 7, { wash: '#6a6a74', washA: 1, w: 1, col: L }); }   // голуби
    jug(1180, 1720, 0.4, '#6a8a4a'); sack(380, 1700, 0.45, '#d8c8a0'); crate(1040, 1760, 90, 50, { col: '#9a7a52' });
    push(860, 1720, 0.6); blob([[-30, 0], [-36, -90], [36, -90], [30, 0]], { wash: '#3a5a3a', washA: 1, w: 2, col: L }); pop();   // урна
    const P = [[520, 1500, '#3a5a8a', 'cap', 'phone'], [620, 1506, '#b0322a', null, null], [760, 1500, '#e8dcb8', 'scarf', 'phone'], [880, 1508, '#4a6a3a', 'cap', null], [1000, 1504, '#5a4a6a', null, 'phone'], [420, 1510, '#8a6a2a', null, null]];
    P.forEach(([x, y, c, h, p], i) => human(x, y, 0.4, t, { body: c, legs: '#2a2a34', hat: h || undefined, hatCol: '#2a2a2a', prop: p || undefined, armR: p ? 'hold' : 'down', seed: 230 + i, flip: i % 2 ? -1 : 1, look: [0.2, -0.9] }));
    human(1080, 1700, 0.62, t, { body: '#2a4a6a', legs: '#1a1a24', hat: 'cap', hatCol: '#1a1a1a', prop: 'phone', armR: 'hold', seed: 239, flip: -1, look: [0.2, -0.9] });
    dog(1180, 1560, 0.3, t, { col: '#e8d0a0' });
    human(340, 1520, 0.38, t, { body: '#c8a040', legs: '#2a2a34', seed: 241, armR: 'wave', look: [0.4, -0.8] }); human(1180, 1500, 0.36, t, { body: '#2a3a4a', legs: '#2a2a34', hat: 'cap', hatCol: '#2a2a2a', seed: 242, flip: -1 });
  };
  TQ.front = t => {                                                 // передний план: ветви лип и лён по краям
    for (const [x, y] of [[-60, 360], [1160, 220]]) { blob([[x - 220, y - 120], [x - 60, y - 220], [x + 160, y - 160], [x + 220, y + 40], [x + 40, y + 160], [x - 200, y + 100]], { wash: '#3e6a3a', washA: 0.95, w: 2, col: L, shade: { gap: 9, a: 0.3, col: TV.greenD, ang: 0.7 } }); }
    for (let i = 0; i < 9; i++) { const x = 1040 + i * 26, y = 2000; pencil([[x, y], [x + Math.sin(t * 2 + i) * 10, y - 200 - i * 8]], { w: 3, col: '#4a6a2a', pass2: false }); ell(x + Math.sin(t * 2 + i) * 10, y - 206 - i * 8, 12, 12, { wash: '#7aa0e0', washA: 1, w: 1.4, col: L }); }
    for (let i = 0; i < 7; i++) { const x = -40 + i * 26, y = 2020; pencil([[x, y], [x + Math.sin(t * 2 + i) * 10, y - 160 - i * 10]], { w: 3, col: '#4a6a2a', pass2: false }); ell(x + Math.sin(t * 2 + i) * 10, y - 166 - i * 10, 11, 11, { wash: '#8aaae8', washA: 1, w: 1.4, col: L }); }
  };
  WORLD.hook = (t, u, cat) => {
    lay(40, () => TQ.sky(t));
    lay(18, () => TQ.far(t));
    lay(8, () => TQ.palace(t));
    lay(3, () => { TQ.road(t); TQ.sign(t); });
    lay(1, () => { TQ.ground(t); cat(); });
    lay(0.62, () => TQ.front(t));
    motes(30, [-200, 200, 1300, 1500], '#fff6d8', t, 23104, { sp: 14, vx: 40, sz: 2.4, a: 0.45, wob: 18 });
    haze('#e8e0c0', 0.05);
  };
  DIR.hook = {
    outfit: 'hoodieT', light: { side: 1, rim: '#fff0c0' }, grade: ['#c8b880', 0.1],
    act: () => [[0, 'shock'], [EV.hk_seal, 'awe'], [EV.hk_q, 'suspicious'], [LS('h2'), 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 250, y: 1560, s: 0.98, look: t < EV.hk_q ? [0.6, -0.8] : [0.4, -0.6], tailUp: t > EV.hk_seal,
      point: t > EV.hk_q && t < LS('h2') ? 1 : undefined, hand: t > EV.hk_q && t < LS('h2') ? [200, -360] : undefined,
      watchInHand: t > LS('h2') - 0.1, glow: sm((t - LS('h2')) / 0.5), spin: 1 }),
    cam: () => [[0, 640, 360, 0.3], [EV.hk_seal - 0.2, 600, 780, 0.06], [EV.hk_seal + 0.1, 560, 760, 0.12, 'x'], [EV.hk_q, 560, 820, 0.08], [LS('h2'), 480, 1060, 0.12], [S1.hook, 420, 1140, 0.22]]
  };
  TRANS_IN.tunnel = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {       // грамота: кадр сворачивается свитком сверху вниз, за ним — часы
    drawBuf(B); const y = lerp(-80, H + 120, sm(k));
    scr(() => {
      ctx.save(); ctx.beginPath(); ctx.rect(0, y, W, H - y + 10); ctx.clip(); drawBuf(A); ctx.restore();
      const g = ctx.createLinearGradient(0, y - 60, 0, y + 60); g.addColorStop(0, 'rgba(216,192,138,1)'); g.addColorStop(0.5, 'rgba(250,236,200,1)'); g.addColorStop(1, 'rgba(160,130,80,1)');
      ctx.fillStyle = g; ctx.fillRect(-10, y - 60, W + 20, 120); pencil([[-10, y - 60], [W + 10, y - 60]], { w: 4, col: TV.ink, pass2: false }); pencil([[-10, y + 60], [W + 10, y + 60]], { w: 4, col: TV.ink, pass2: false });
      for (let i = 0; i < 9; i++) pencil([[i * 130 - 40, y - 30], [i * 130 + 50, y - 30]], { w: 3, col: '#8a6a3a', a: 0.6, pass2: false });
      seal(540, y + 110, 56, t, { txt: 'Т' });
    });
  } };
})();
