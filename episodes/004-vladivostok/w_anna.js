/* 004 — сцена `anna`: 1935, ходовой мостик парохода «Чавыча». За широкими окнами — шторм: валы, брызги, молния, горизонт качается.
   Анна Щетинина (27 лет) у штурвала: китель с золотыми нашивками, фуражка. Позади усатые моряки с открытыми ртами. Компас-нактоуз,
   машинный телеграф, рында. На «первая в мире» — штамп-глобус «№ 1 В МИРЕ», на «двадцать семь» — крупная цифра 27.
   Переход В сцену — кадр уезжает вверх кинолентой (перфорация, кадрики). */
(() => {
  EV.an_first = wt('s6', 'первая');             // штамп «№ 1 в мире»
  EV.an_cap = wt('s6', 'женщина-капитан');      // моряки в шоке
  EV.an_27 = wt('s6', 'двадцать');              // «27»
  KEYW.push('первая', 'женщина-капитан', 'семь!');
  SHAKES.push([EV.an_first, 0.3, 9]);
  const roll = t => Math.sin(t * 1.4) * 0.06;

  function storm(t) {                                               // море за окнами: валы, пена, дождь, молния
    push(540, 420, 1, roll(t)); vgrad(-900, 1100, ['#1a2a3a', '#2a3e52', '#5a6a7a', '#8a9aa8'], 1);
    const lt = (t * 0.7) % 3 < 0.08; if (lt) { screenFill('#e8f0ff', 0.5); pencil([[200, -600], [140, -300], [220, -200], [160, 100]], { w: 6, col: '#ffffff', pass2: false }); }
    for (let k = 0; k < 5; k++) { const y = 200 + k * 90, P = []; for (let x = -1000; x <= 1000; x += 40) P.push([x, y - 60 - Math.abs(Math.sin(x * 0.006 + t * (1 + k * 0.3) + k)) * (90 + k * 30)]); P.push([1000, 1200], [-1000, 1200]);
      shape(P, { wash: ['#2a4a5a', '#2e5466', '#346072', '#3a6a7e', '#40748a'][k], washA: 1, w: 2, col: '#0e1a24', a: 0.6 }); for (let x = -900; x < 900; x += 160) { const yy = y - 60 - Math.abs(Math.sin(x * 0.006 + t * (1 + k * 0.3) + k)) * (90 + k * 30); ell(x, yy, 50, 10, { wash: '#e8f4f8', washA: 0.8, line: false }); } }
    motes(80, [-700, -900, 700, 1100], '#cfe4f0', t, 33, { sp: 900, vx: -300, sz: 2, a: 0.5, stretch: 4 });
    pop();
  }
  function bridgeRoom(t) {                                          // рубка: рамы окон, панели, нактоуз, телеграф, рында
    const r = roll(t) * 0.3;
    // стена с окнами: вырезаем окна
    ctx.save(); const wall = new Path2D(); wall.rect(-600, -200, 2300, 2900); for (let i = 0; i < 3; i++) wall.rect(-80 + i * 420, 420, 380, 520); ctx.clip(wall, 'evenodd');
    const g = ctx.createLinearGradient(0, 300, 0, 1500); g.addColorStop(0, '#4a3220'); g.addColorStop(1, '#2a1a10'); ctx.fillStyle = g; ctx.fillRect(-600, -200, 2300, 2900); ctx.restore();
    for (let i = 0; i < 3; i++) { const x = -80 + i * 420; rect(x, 420, 380, 520, { w: 10, col: '#8a6a3a' }); pencil([[x + 190, 420], [x + 190, 940]], { w: 8, col: '#8a6a3a', pass2: false }); for (let q = 0; q < 6; q++) pencil([[x + 20 + q * 60, 430], [x + 6 + q * 60, 930]], { w: 2, col: '#cfe4f0', a: 0.3, pass2: false }); }
    for (let x = -500; x < 1600; x += 90) pencil([[x, 300], [x, 410]], { w: 3, col: '#1a0e06', a: 0.5, pass2: false });
    const dk = poly([[-600, 1360], [1700, 1360], [1700, 2600], [-600, 2600]], { wash: '#7a5a3a', washA: 1, w: 2, col: '#2a1a0a', key: 9990 }); for (let i = -14; i < 18; i++) pencil([[i * 80, 1360], [i * 140 - 200, 2600]], { w: 2, col: '#4a3018', a: 0.6, pass2: false });
    rect(-600, 940, 2300, 420, { wash: '#5a3a22', washA: 1, w: 2, col: '#2a1a0a' }); for (let x = -500; x < 1600; x += 180) rect(x, 980, 150, 330, { wash: '#6a4a2a', washA: 1, w: 1.6, col: '#2a1a0a' });
    push(560, 1010, 1); rect(-150, -60, 300, 170, { wash: '#e8dcc0', washA: 1, w: 2, col: '#3a2a10' }); pencil([[-130, 60], [-60, 0], [10, 30], [80, -30], [130, -10]], { w: 3, col: '#a8241e', pass2: false }); for (let q = 0; q < 6; q++) pencil([[-140 + q * 56, -60], [-140 + q * 56, 110]], { w: 1, col: '#8a7a5a', a: 0.5, pass2: false }); txt('Гамбург → Владивосток', 0, 86, 18, { font: 'Hand', col: '#3a2a10' }); pop();
    push(-260, 1120, 1); pencil(ellPts(0, 0, 70, 70, 0, 0, 40), { w: 30, col: '#f4f0e8', pass2: false }); for (let q = 0; q < 4; q++) { const a = q * 1.57 + 0.78; pencil([[Math.cos(a - 0.25) * 70, Math.sin(a - 0.25) * 70], [Math.cos(a + 0.25) * 70, Math.sin(a + 0.25) * 70]], { w: 30, col: '#c8241e', pass2: false }); } pop();
    push(980, 1200, 1); rect(-40, -160, 80, 160, { wash: '#c89a3a', washA: 1, w: 2, col: '#4a3008' }); const te = ell(0, -220, 70, 70, { wash: '#e8c46a', washA: 1, w: 2.4, col: '#4a3008' }); metalG(te.path, -20, -240, 70, '#fff4c0', '#c89a3a', '#6a4a10');
    ell(0, -220, 52, 52, { wash: '#f8f0d8', washA: 1, w: 1.6 }); txt('ПОЛН.', 0, -250, 14, { font: 'Osw', col: '#2a1a0a' }); txt('СТОП', 0, -196, 14, { font: 'Osw', col: '#a8241e' }); push(0, -220, 1, Math.sin(t * 2) * 0.4 - 0.6); pencil([[0, 0], [0, -46]], { w: 5, col: '#1a1a1a', pass2: false }); pop(); pop();
    push(-120, 1300, 1); rect(-60, -200, 120, 200, { wash: '#8a5a2a', washA: 1, w: 2, col: '#2a1a0a' }); const cm = ell(0, -240, 74, 46, { wash: '#c89a3a', washA: 1, w: 2.4 }); metalG(cm.path, -20, -250, 70, '#fff4c0', '#c89a3a', '#6a4a10'); ell(0, -244, 46, 22, { wash: '#f0ece0', washA: 1, w: 1.4 }); pencil([[0, -244], [Math.sin(t * 1.4) * 30, -256]], { w: 3, col: '#a8241e', pass2: false }); pop();
    push(80, 960, 1.3, Math.sin(t * 1.4) * 0.15); pencil([[0, 0], [0, 50]], { w: 3, col: '#2a2a2a', pass2: false }); const bl = blob([[-40, 140], [-34, 70], [0, 50], [34, 70], [40, 140]], { wash: '#d8a840', washA: 1, w: 2, col: '#5a3a08' }); metalG(bl.path, -10, 80, 60, '#fff4c0', '#d8a840', '#7a5a10'); txt('ЧАВЫЧА', 0, 110, 16, { font: 'Osw', col: '#3a2008' }); pop();
  }
  function anna(t) {                                                // Анна у штурвала
    human(300, 1500, 1.08, t, { body: '#1e2236', bodyD: '#0a0c18', trim: '#d8b04a', legs: '#1e2236', long: 1, hair: '#3a2410', hat: 'cap', hatCol: '#1e2236', face: t > EV.an_27 ? 'smile' : 'calm', look: 0.6, armL: 'up', armR: 'point', seed: 401 });
    push(300, 1500, 1.08); for (const sd of [-1, 1]) for (let q = 0; q < 3; q++) pencil([[sd * 46 - 14, -140 + q * 8], [sd * 46 + 14, -140 + q * 8]], { w: 3, col: '#e8c040', pass2: false }); ell(0, -340, 10, 7, { wash: '#e8c040', washA: 1, line: false }); pop();
    push(470, 1480, 1);
    for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283 + Math.sin(t * 1.2) * 0.5; pencil([[0, -300], [Math.cos(a) * 140, -300 + Math.sin(a) * 140]], { w: 9, col: '#6a3a1a', pass2: false }); ell(Math.cos(a) * 160, -300 + Math.sin(a) * 160, 10, 10, { wash: '#8a5a2a', washA: 1, w: 1.4 }); }
    pencil(ellPts(0, -300, 140, 140, 0, 0, 40), { w: 14, col: '#7a4a24', pass2: false }); ell(0, -300, 30, 30, { wash: '#c89a3a', washA: 1, w: 2 }); rect(-18, -300, 36, 300, { wash: '#4a2a14', washA: 1, w: 2 });
    pop();
  }
  function sailors(t) {
    const sh = t > EV.an_cap - 0.1;
    human(1060, 1420, 0.9, t, { body: '#e8e4dc', bodyD: '#9a968e', trim: '#2a3a6a', legs: '#1e2236', hair: '#5a3a1a', beard: 'short', hat: 'cap', hatCol: '#1e2236', face: sh ? 'shock' : 'calm', look: -0.8, armL: sh ? 'up' : 'hold', armR: 'hold', seed: 402, flip: -1 });
    human(1180, 1440, 0.95, t, { body: '#2a2a3a', legs: '#1e2236', hair: '#8a6a4a', beard: 'long', hat: null, face: sh ? 'shock' : 'calm', look: -0.8, armL: 'down', armR: sh ? 'point' : 'hold', seed: 403, flip: -1 });
    if (sh) for (const x of [1060, 1180]) txt('!', x, 1060, 70, { font: 'Osw', col: '#ffd890', a: clamp((t - EV.an_cap) / 0.3) });
  }

  WORLD.anna = (t, u, cat) => {
    lay(30, () => storm(t));
    lay(1.15, () => bridgeRoom(t));
    lay(1, () => { push(540, 1500, 1, roll(t) * 0.25); push(-540, -1500); sailors(t); anna(t); cat(); pop(); pop(); });
    lay(0.6, () => { motes(20, [-200, 300, 1300, 1900], '#cfe4f0', t, 34, { sp: 300, vx: -200, sz: 3, a: 0.35, stretch: 3 }); pencil([[-60, 200], [-40, 2200]], { w: 34, col: '#2a1a0a', pass2: false }); });
  };
  DIR.anna = {
    outfit: 'sailor', light: { side: 1, rim: '#cfe4ff' }, grade: ['#2a4a6a', 0.18],
    act: () => [[S0.anna, 'talk'], [EV.an_first - 0.03, 'shock'], [EV.an_cap, 'awe'], [EV.an_27 - 0.03, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 770, y: 1560, s: 1.05, look: t < EV.an_27 ? [-0.7, -0.1] : [0.1, 0], hand: t > EV.an_27 ? [120, -340] : undefined, point: t > EV.an_first && t < EV.an_27 ? 1 : undefined, handF: t > EV.an_first && t < EV.an_27 ? [-150, -260] : undefined, rot: roll(t) * 0.25, tailUp: t > EV.an_first }),
    cam: () => [[S0.anna, 600, 1200, 0.2], [EV.an_first, 540, 1160, 0.1, 'x'], [EV.an_27, 560, 1160, 0.16], [S1.anna, 580, 1180, 0.2]],
    hud: t => {
      if (t > EV.an_first - 0.05 && t < EV.an_27) { const k = popK(t, EV.an_first, 0.35); push(820, 640, k, -0.12); pencil(ellPts(0, 0, 150, 150, 0, 0, 60), { w: 10, col: '#c8241e', pass2: false }); pencil(ellPts(0, 0, 128, 128, 0, 0, 60), { w: 4, col: '#c8241e', pass2: false });
        pencil(ellPts(0, 0, 60, 128, 0, 0, 40), { w: 3, col: '#c8241e', a: 0.7, pass2: false }); pencil([[-128, 0], [128, 0]], { w: 3, col: '#c8241e', a: 0.7, pass2: false }); txt('№ 1', 0, -40, 60, { font: 'Osw', col: '#c8241e' }); txt('В МИРЕ', 0, 46, 44, { font: 'Osw', col: '#c8241e' }); pop(); }
      if (t > EV.an_27 - 0.05 && t < S1.anna) { const k = popK(t, EV.an_27, 0.35); push(820, 640, k, -0.05); ctx.save(); ctx.font = '600 230px Osw'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.lineWidth = 26; ctx.strokeStyle = 'rgba(12,8,6,0.94)'; ctx.strokeText('27', 0, 0); ctx.fillStyle = K.amber; ctx.fillText('27', 0, 0);
        ctx.font = '600 50px Osw'; ctx.lineWidth = 10; ctx.strokeText('ЛЕТ', 0, 140); ctx.fillStyle = '#f6ecd6'; ctx.fillText('ЛЕТ', 0, 140); ctx.restore(); pop(); }
    }
  };
  // ---------------------------------------------------------------- переход В anna: кадр уезжает кинолентой
  TRANS_IN.anna = { a: 0.24, b: 0.36, runA: 1, fx(k, t, A, B) {
    const q = sm(k), off = q * (H + 200), fw = 900, x0 = (W - fw) / 2;
    scr(() => { ctx.fillStyle = '#120c08'; ctx.fillRect(0, 0, W, H);
      for (const [buf, y0] of [[A, -off], [B, H + 200 - off]]) { ctx.save(); ctx.translate(540, y0 + H / 2); const sc = 1 - 0.18 * Math.sin(q * Math.PI); ctx.scale(sc, sc); ctx.translate(-540, -H / 2);
        ctx.fillStyle = '#1a1410'; ctx.fillRect(x0 - 70, -100, fw + 140, H + 200); ctx.drawImage(buf, 0, 0, W, H, x0, 0, fw, H);
        for (let y = -80; y < H + 100; y += 70) for (const sx of [x0 - 50, x0 + fw + 20]) { ctx.fillStyle = '#f0e8d8'; ctx.fillRect(sx, y, 30, 40); } ctx.restore(); } });
  } };
})();
