/* 012 — сцена `oswald`: 1961, цех Минского радиозавода. Конвейер с радиолами, лампы-«тарелки», работницы в косынках, плакат
   «РАДИОЛА — В КАЖДЫЙ ДОМ»; за окнами — новые сталинские дома. Освальд — худой молодой американец в рубашке за верстаком с отвёрткой.
   На «Освальд» — бейдж «ЛИ ХАРВИ ОСВАЛЬД · США · сборщик», на «Даллас» — открытка-карта «ДАЛЛАС · 1963» с булавкой (без сцен
   насилия). Том в сером костюме. Переход В сцену — шкала радиоприёмника крутится, кадр «настраивается» сквозь помехи. */
(() => {
  EV.os_name = wtk('s7', 'Освальд.');
  EV.os_dallas = wtk('s7', 'Даллас.');
  KEYW.push('Освальд.', 'Даллас.');

  function factory(t) {                                                // цех: окна с видом на город, лампы, конвейер
    vgrad(-900, 1600, ['#c8ccd0', '#d8d4cc'], 1);
    for (let k = 0; k < 5; k++) { const x = -360 + k * 380; rect(x, 560, 300, 360, { wash: '#a8c4d8', washA: 1, w: 3, col: '#3a3a3a' }); for (let q = 1; q < 3; q++) pencil([[x + q * 100, 560], [x + q * 100, 920]], { w: 3, col: '#3a3a3a', pass2: false }); pencil([[x, 740], [x + 300, 740]], { w: 3, col: '#3a3a3a', pass2: false }); ctx.save(); ctx.beginPath(); ctx.rect(x, 560, 300, 360); ctx.clip(); stalin(x - 40, 960, 380, 300, t, { key: 12700 + k }); ctx.restore(); }
    for (let k = 0; k < 5; k++) { const x = -200 + k * 330; pencil([[x, 300], [x, 470]], { w: 2, col: '#2a2a2a', pass2: false }); blob([[x - 60, 500], [x - 40, 470], [x + 40, 470], [x + 60, 500]], { wash: '#4a6a5a', washA: 1, w: 2, col: '#1a2a24' }); glow(x, 520, 120, 'rgba(255,240,200,1)', 0.35); }
    rect(-500, 1080, 2100, 40, { wash: '#5a5a5e', washA: 1, w: 2, col: '#1a1a1a' }); const off = ((t - S0.oswald) * 80) % 220;
    for (let k = 0; k < 9; k++) { const x = -420 + k * 220 + off; push(x, 1080, 0.55); rect(-80, -110, 160, 110, { wash: '#7a4a2a', washA: 1, w: 2, col: '#2a1408' }); rect(-64, -90, 80, 50, { wash: '#e8dcc0', washA: 1, w: 1.6, col: '#2a1408' }); for (const kx of [40, 60]) ell(kx, -56, 10, 10, { wash: '#d6a842', washA: 1, w: 1.2, col: '#5a4a08' }); pop(); }
    for (let i = 0; i < 4; i++) human(-200 + i * 260, 1090, 0.48, t, { body: '#e8e4dc', legs: '#2a2a3a', hair: '#5a3a1a', hat: 'scarf', hatCol: ['#c8302a', '#2a5aa8', '#e8b030', '#3a7a4a'][i], face: 'calm', armR: Math.sin(t * 5 + i) > 0 ? 'point' : 'hold', seed: 1370 + i });
    push(900, 640, 0.9, 0.04); rect(-150, -80, 300, 160, { wash: '#c8302a', washA: 1, w: 3, col: '#5a0a08' }); txt('РАДИОЛА —', 0, -24, 40, { font: 'Osw', col: '#f6ecd6' }); txt('В КАЖДЫЙ ДОМ', 0, 30, 36, { font: 'Osw', col: '#ffd24a' }); pop();
  }
  function bench(t) {                                                  // верстак, Освальд
    rect(560, 1300, 460, 30, { wash: '#6a5a4a', washA: 1, w: 2.4, col: '#2a2018' }); for (const lx of [590, 990]) rect(lx - 10, 1330, 20, 150, { wash: '#4a4a4e', washA: 1, w: 2, col: '#1a1a1a' });
    push(700, 1300, 0.7); rect(-80, -110, 160, 110, { wash: '#7a4a2a', washA: 1, w: 2, col: '#2a1408' }); for (let q = 0; q < 4; q++) ell(-40 + q * 26, -60, 8, 8, { wash: '#f6d48a', washA: 1, w: 1, col: '#5a4a08' }); pop();
    human(880, 1490, 1.0, t, { body: '#e8e8e4', bodyD: '#a8a8a4', legs: '#3a3a40', boots: '#1a1a1a', hair: '#3a2a1a', face: t > EV.os_name ? 'calm' : 'smile', armR: 'point', armL: 'hold', seed: 1380, flip: -1, look: -0.5 });
    pencil([[880 - 150, 1490 - 300], [880 - 200, 1490 - 280]], { w: 4, col: '#c8302a', pass2: false });
  }

  WORLD.oswald = (t, u, cat) => {
    lay(6, () => factory(t));
    lay(1, () => { const g = shape([[-500, 1470], [1600, 1470], [1600, 2400], [-500, 2400]], { wash: '#8a8a84', washA: 1, w: 2, col: '#2a2a2a', a: 0.4 }); ctx.save(); ctx.clip(g.path); for (let x = -480; x < 1600; x += 90) for (let y = 1480; y < 2400; y += 90) rect(x, y, 88, 88, { wash: (Math.floor(x / 90) + Math.floor(y / 90)) % 2 ? '#9a9a94' : '#7a7a74', washA: 0.6, w: 1, col: '#3a3a3a', a: 0.4 }); ctx.restore(); bench(t); cat(); });
  };
  DIR.oswald = {
    outfit: 'soviet', light: { side: 1, rim: '#fff4e0' }, grade: ['#a8b0b8', 0.08],
    act: () => [[S0.oswald, 'talk'], [EV.os_name - 0.03, 'shock'], [EV.os_dallas, 'suspicious']],
    pose: (t, u, b) => Object.assign(b, { x: 320, y: 1480, s: 1.02, look: [0.6, -0.2], point: t > EV.os_name && t < EV.os_dallas ? 1 : undefined, hand: t > EV.os_name && t < EV.os_dallas ? [180, -320] : [120, -270] }),
    cam: () => [[S0.oswald, 580, 1000, 0.06], [EV.os_name, 640, 1060, 0.12], [EV.os_dallas, 600, 1020, 0.08], [S1.oswald, 600, 1020, 0.12]],
    hud: t => { if (t > EV.os_name && t < EV.os_dallas) { const k = popK(t, EV.os_name, 0.35); push(760, 760, k, 0.04); rect(-150, -80, 300, 160, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#2a2a2a' }); rect(-150, -80, 300, 40, { wash: '#2a5aa8', washA: 1, w: 2, col: '#2a2a2a' }); txt('ПРОПУСК', 0, -60, 26, { font: 'Osw', col: '#f2ece0' });
        txt('ЛИ ХАРВИ ОСВАЛЬД', 0, -6, 30, { font: 'Osw', col: '#1a1a1a' }); txt('США · сборщик', 0, 40, 26, { col: '#4a4a4a' }); pop(); }
      if (t > EV.os_dallas) { const k = popK(t, EV.os_dallas, 0.35); push(600, 720, k, -0.05); rect(-220, -110, 440, 220, { wash: '#f6ecd6', washA: 0.97, w: 3, col: '#5a3a1a' }); poly([[-160, 60], [-120, -60], [40, -80], [150, -20], [130, 70]], { wash: '#d8c8a0', washA: 1, w: 2, col: '#5a4a2a' });
        ell(60, 0, 14, 14, { wash: '#c8201e', washA: 1, w: 2, col: '#5a0a08' }); pencil([[60, 0], [60, -40]], { w: 3, col: '#5a5a5a', pass2: false }); txt('ДАЛЛАС · 1963', 0, -84, 34, { font: 'Osw', col: '#5a1a10' }); txt('через 2 года', 0, 90, 26, { col: '#2a1a10' }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В oswald: шкала радио крутится, кадр настраивается сквозь помехи
  TRANS_IN.oswald = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    const tune = sm(k); drawBuf(tune < 0.5 ? A : B, 1.02); const r = rng(Math.floor(t * 24));
    scr(() => { const n = 1 - Math.abs(tune - 0.5) * 2; for (let i = 0; i < 40; i++) { const y = r() * H; ctx.save(); ctx.globalAlpha = 0.5 * n; ctx.fillStyle = r() < 0.5 ? '#f2f2f2' : '#1a1a1a'; ctx.fillRect(0, y, W, 2 + r() * 10); ctx.restore(); }
      push(540, 1500, 1); rect(-360, -70, 720, 140, { wash: '#2a1a10', washA: 0.9 * n, w: 3, col: '#000' }); for (let q = 0; q < 24; q++) pencil([[-330 + q * 28, -40], [-330 + q * 28, q % 4 ? -20 : 0]], { w: 2, col: '#f6d48a', a: n, pass2: false }); pencil([[-330 + tune * 660, -60], [-330 + tune * 660, 60]], { w: 5, col: '#c8201e', a: n, pass2: false }); pop(); });
  } };
})();
