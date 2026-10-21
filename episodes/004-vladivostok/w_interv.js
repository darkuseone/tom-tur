/* 004 — сцена `interv`: 1918, Светланская улица. Каменные фасады (универмаг «Кунст и Альберс», доходные дома), трамвай, вывески с ятями,
   флаги США, Японии, Британии, Чехословакии. Колоннами маршируют американцы (шляпы «монтана»), японцы (кепи с красным околышем),
   британцы (каски), чехи. Том — фотограф с камерой на треноге. На «Туристы» — вспышка магния, солдаты позируют, как туристы.
   Переход В сцену — Spider-Verse-рывок вдоль рельсов (скорость-линии, RGB-сдвиг). */
(() => {
  EV.iv_us = wt('s4', 'американцы,');           // по словам — каждая колонна выходит вперёд
  EV.iv_jp = wt('s4', 'японцы,');
  EV.iv_cz = wt('s4', 'чехи.');
  EV.iv_flash = wt('s4', 'Туристы');            // вспышка магния
  KEYW.push('Туристы');
  const ARMY = {
    us: { body: '#8a7a4a', legs: '#7a6a3a', hat: 'monty', hc: '#8a6a3a', flag: 'us' },
    jp: { body: '#7a7448', legs: '#6a6438', hat: 'jpcap', hc: '#6a6438', flag: 'jp' },
    uk: { body: '#7a6a44', legs: '#6a5a34', hat: 'brodie', hc: '#5a5a3a', flag: 'uk' },
    cz: { body: '#5a6a5a', legs: '#4a5a4a', hat: 'cap', hc: '#4a5a4a', flag: 'cz' }
  };

  function sky(t) { vgrad(-900, 1300, ['#8a9ab0', '#c0c8d0', '#e8e0d0', '#e8d0b0'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 420 + t * 10) % 1800) - 300, y = 220 + i * 60; blob([[x - 200, y], [x - 80, y - 36], [x + 60, y - 40], [x + 200, y]], { wash: '#f4f0e8', washA: 0.5, line: false }); } }
  function facade(x, w, h, col, seed, o = {}) {                     // каменный фасад: карнизы, наличники, балконы, вывеска
    const base = 1300, r = rng(seed); const f = rect(x, base - h, w, h, { wash: col, washA: 1, w: 2.2, col: '#3a2a1e', key: 9900 + seed }); shadeG(f.path, x + w, 0, x + w * 0.4, 0, '#3a2a1e', 0.25);
    const fl = Math.floor(h / 120); for (let i = 0; i < fl; i++) { const y = base - h + 40 + i * 120; pencil([[x - 6, y - 14], [x + w + 6, y - 14]], { w: 5, col: lerpC(col, '#ffffff', 0.4), pass2: false });
      for (let q = 0; q < Math.floor(w / 80); q++) { const wx = x + 24 + q * 80; rect(wx, y, 40, 70, { wash: '#2a3040', washA: 1, w: 1.6, col: '#1a1a20' }); pencil([[wx + 20, y], [wx + 20, y + 70]], { w: 1.4, col: '#e8e0d0', pass2: false });
        poly([[wx - 6, y], [wx + 20, y - 18], [wx + 46, y]], { wash: lerpC(col, '#ffffff', 0.3), washA: 1, w: 1.2, col: '#3a2a1e' }); if (r() < 0.3) glow(wx + 20, y + 35, 30, 'rgba(255,220,150,1)', 0.25); } }
    if (o.dome) { ell(x + w / 2, base - h - 30, 70, 60, { wash: '#4a7a6a', washA: 1, w: 2, col: '#1a2a20' }); pencil([[x + w / 2, base - h - 90], [x + w / 2, base - h - 140]], { w: 4, col: '#2a2a2a', pass2: false }); }
    if (o.sign) { rect(x + 20, base - 150, w - 40, 50, { wash: '#1a2a20', washA: 1, w: 2, col: '#0a0a0a' }); txt(o.sign, x + w / 2, base - 125, Math.min(36, (w - 60) / o.sign.length * 1.7), { font: 'Osw', col: '#e8c46a' }); }
    rect(x, base - 90, w, 90, { wash: lerpC(col, '#000000', 0.25), washA: 1, w: 2, col: '#2a1a10' }); for (let q = 0; q < Math.floor(w / 110); q++) { rect(x + 20 + q * 110, base - 80, 80, 80, { wash: '#3a4a5a', washA: 1, w: 1.6 }); glow(x + 60 + q * 110, base - 40, 40, 'rgba(255,220,160,1)', 0.25); }
  }
  function flag(x, y, kind, t, s = 1) { push(x, y, s); pencil([[0, 0], [0, -200]], { w: 4, col: '#4a3a2a', pass2: false }); const wv = q => Math.sin(t * 5 + q * 0.03) * 8, P = (x0, y0, x1, y1) => [[x0, y0 + wv(x0)], [x1, y0 + wv(x1)], [x1, y1 + wv(x1)], [x0, y1 + wv(x0)]];
    if (kind === 'us') { for (let i = 0; i < 7; i++) poly(P(0, -200 + i * 14, 150, -186 + i * 14), { wash: i % 2 ? '#f4f0e8' : '#b8241e', washA: 1, line: false }); poly(P(0, -200, 64, -158), { wash: '#1e2a6a', washA: 1, line: false }); }
    if (kind === 'jp') { poly(P(0, -200, 150, -100), { wash: '#f8f4ec', washA: 1, w: 1.2, col: '#6a6a6a' }); ell(75, -150 + wv(75), 26, 26, { wash: '#c8241e', washA: 1, line: false }); }
    if (kind === 'uk') { poly(P(0, -200, 150, -110), { wash: '#1e2a6a', washA: 1, line: false }); pencil([[0, -200 + wv(0)], [150, -110 + wv(150)]], { w: 10, col: '#f4f0e8', pass2: false }); pencil([[0, -110 + wv(0)], [150, -200 + wv(150)]], { w: 10, col: '#f4f0e8', pass2: false }); pencil([[75, -200], [75, -110]], { w: 18, col: '#f4f0e8', pass2: false }); pencil([[0, -155], [150, -155]], { w: 18, col: '#f4f0e8', pass2: false }); pencil([[75, -200], [75, -110]], { w: 9, col: '#c8241e', pass2: false }); pencil([[0, -155], [150, -155]], { w: 9, col: '#c8241e', pass2: false }); }
    if (kind === 'cz') { poly(P(0, -200, 150, -155), { wash: '#f8f4ec', washA: 1, line: false }); poly(P(0, -155, 150, -110), { wash: '#c8241e', washA: 1, line: false }); }
    pop(); }
  function hatOn(x, y, s, kind, hc) {                               // шапка поверх головы human(): голова ≈ y − 284·s
    push(x, y - 300 * s, s); const L = '#1a120a';
    if (kind === 'monty') { ell(0, 6, 70, 14, { wash: hc, washA: 1, w: 2, col: L }); blob([[-34, 6], [-28, -40], [-10, -58], [0, -46], [10, -58], [28, -40], [34, 6]], { wash: hc, washA: 1, w: 2, col: L }); rect(-34, -4, 68, 8, { wash: '#4a3010', washA: 1, line: false }); }
    if (kind === 'jpcap') { blob([[-40, 10], [-36, -26], [36, -26], [40, 10]], { wash: hc, washA: 1, w: 2, col: L }); rect(-40, -2, 80, 12, { wash: '#c8241e', washA: 1, line: false }); ell(30, 12, 26, 6, { wash: '#2a2010', washA: 1, w: 1.4 }); ell(0, -14, 5, 5, { wash: '#e8c040', washA: 1, line: false }); }
    if (kind === 'brodie') { ell(0, 4, 66, 14, { wash: hc, washA: 1, w: 2, col: L }); blob([[-38, 4], [-30, -32], [0, -42], [30, -32], [38, 4]], { wash: hc, washA: 1, w: 2, col: L }); }
    pop(); }
  function trooper(x, y, s, t, side, i, pose) {                     // солдат: форма, шапка, винтовка на плече
    const A = ARMY[side], bob = Math.abs(Math.sin(t * 7 + i * 1.7)) * 6 * s;
    human(x, y - bob, s, t, { body: A.body, bodyD: lerpC(A.body, '#000000', 0.45), belt: '#4a3018', legs: A.legs, boots: '#2a1a0a', hair: '#3a2a1a', hat: A.hat === 'cap' ? 'cap' : null, hatCol: A.hc,
      face: pose ? 'grin' : 'calm', look: pose ? 0.8 : -0.9, armL: pose ? 'wave' : 'swing', armR: 'hold', seed: 200 + i, flip: pose ? 1 : -1 });
    if (A.hat !== 'cap') hatOn(x, y - bob, s, A.hat, A.hc);
    push(x, y - bob, s, 0, pose ? 1 : -1); pencil([[34, -120], [10, -380]], { w: 7, col: '#5a3a1a', pass2: false }); pencil([[10, -380], [6, -430]], { w: 3, col: '#9aa0a8', pass2: false }); pop();
  }
  function tram(t) { const x = 1300 - ((t - S0.interv) * 120) % 2600; push(x, 1270, 0.85); const b = rect(-260, -260, 520, 220, { wash: '#c8a040', washA: 1, w: 2.4, col: '#2a1a0a' }); rect(-260, -120, 520, 80, { wash: '#a8341e', washA: 1, w: 2, col: '#2a1a0a' });
    for (let q = 0; q < 6; q++) { rect(-240 + q * 82, -240, 62, 90, { wash: '#2a3a4a', washA: 1, w: 1.6 }); glow(-210 + q * 82, -200, 40, 'rgba(255,220,150,1)', 0.2); } pencil([[0, -260], [-40, -380]], { w: 3, col: '#2a2a2a', pass2: false }); txt('№ 1', 0, -80, 30, { font: 'Osw', col: '#f8f0d8' }); for (const wx of [-170, 170]) ell(wx, -30, 30, 30, { wash: '#2a2a2a', washA: 1, w: 2 }); pop(); }
  function street(t) {                                              // мостовая, рельсы трамвая, провода
    const g = poly([[-600, 1300], [1700, 1300], [1700, 2600], [-600, 2600]], { wash: '#8a8070', washA: 1, w: 2, col: '#3a3020', key: 9930 });
    for (let y = 1320; y < 2400; y += 34 + (y - 1300) * 0.05) for (let x = -500 + ((y / 30) % 2) * 30; x < 1700; x += 60 + (y - 1300) * 0.08) rect(x, y, 54 + (y - 1300) * 0.07, 26 + (y - 1300) * 0.03, { wash: ['#9a9080', '#7a7060', '#a89a88'][Math.floor(x + y) % 3], washA: 1, w: 1, col: '#4a4030', a: 0.6 });
    for (const y of [1330, 1360]) pencil([[-600, y], [1700, y]], { w: 4, col: '#4a4a52', pass2: false });
    pencil([[-600, 640], [1700, 600]], { w: 2, col: '#2a2a2a', a: 0.6, pass2: false }); pencil([[-600, 660], [1700, 630]], { w: 2, col: '#2a2a2a', a: 0.6, pass2: false });
  }
  function photographer(t, flash) {                                 // камера на треноге у Тома
    push(330, 1600, 1.05); for (const a of [-0.3, 0, 0.3]) { push(0, -220, 1, a); pencil([[0, 0], [0, 230]], { w: 6, col: '#5a3a1a', pass2: false }); pop(); }
    const cb = rect(-70, -330, 140, 110, { wash: '#4a2a14', washA: 1, w: 2.4, col: '#1a0a04' }); hatch(cb.path, cb.bb, { gap: 7, a: 0.25, col: '#1a0a04', ang: 0.2, key: 9940 });
    for (let q = 0; q < 4; q++) rect(70 + q * 14, -314 + q * 4, 14, 78 - q * 8, { wash: '#2a1a10', washA: 1, w: 1.2 }); ell(130, -276, 22, 22, { wash: '#3a3a40', washA: 1, w: 2 }); ell(130, -276, 12, 12, { wash: '#8ab4d8', washA: 1, line: false });
    push(-40, -400, 1, -0.3); pencil([[0, 0], [0, 60]], { w: 4, col: '#3a3a3a', pass2: false }); rect(-40, -10, 80, 16, { wash: '#6a6a6a', washA: 1, w: 1.4 }); if (flash > 0) { glow(0, -10, 400 * flash, 'rgba(255,255,240,1)', flash); smokeCol(0, -20, t, 0.4, 0.6 * flash, 31, 0); } pop();
    pop();
  }

  WORLD.interv = (t, u, cat) => {
    const flash = t > EV.iv_flash ? Math.max(0, 1 - (t - EV.iv_flash) / 0.5) : 0, pose = t > EV.iv_flash;
    lay(40, () => sky(t));
    lay(6, () => { sopki(900, '#8a9aa8', 1.1, 160, 1);
      facade(-420, 330, 520, '#c8a888', 1, { sign: 'АПТЕКА' }); facade(-80, 420, 640, '#7a8a6a', 2, { dome: 1, sign: 'КУНСТЪ и АЛЬБЕРСЪ' }); facade(350, 360, 560, '#c87a5a', 3, { sign: 'ГОСТИННИЦА «ВЕРСАЛЬ»' }); facade(720, 380, 600, '#d8c8a8', 4, { sign: 'КИНЕМАТОГРАФЪ' }); facade(1110, 320, 500, '#a8b0b8', 5, { sign: 'ЧАЙ' });
      flag(40, 760, 'us', t); flag(300, 740, 'jp', t); flag(560, 770, 'uk', t); flag(820, 750, 'cz', t); tram(t);
      for (const [x, y, n] of [[115, 690, 'США'], [375, 670, 'Япония'], [635, 700, 'Британия'], [895, 680, 'чехи']]) txt(n, x, y, 40, { font: 'Hand', col: '#2a1a0a' }); });
    lay(2.2, () => { street(t); const ph = (t - S0.interv) * 40; for (let i = 0; i < 14; i++) { const side = ['us', 'jp', 'uk', 'cz'][Math.floor(i / 3.5)], x = 1300 - i * 120 - ph; trooper(x, 1400, 0.62, t, side, i, false); } });
    lay(1, () => {
      const col = (side, t0, x0, y0, sc) => { if (t < t0 - 0.2) return; const k = sm((t - t0 + 0.2) / 0.5); for (let i = 0; i < 3; i++) trooper(x0 + i * 110 + (x0 > 500 ? 1 : -1) * (1 - k) * 700, y0 + i * 12, sc, t, side, 20 + i + x0, pose); };
      const y0s = { us: 1720, jp: 1720, cz: 1500 };
      col('cz', EV.iv_cz, 330, 1500, 0.72); col('us', EV.iv_us, -10, 1720, 0.92); col('jp', EV.iv_jp, 840, 1720, 0.92);
      photographer(t, flash); cat(); });
    lay(0.6, () => { pencil([[1180, 300], [1160, 2200]], { w: 20, col: '#3a3a3a', pass2: false }); ell(1170, 520, 40, 60, { wash: '#f4ecd0', washA: 0.9, w: 2, col: '#2a2a2a' }); glow(1170, 520, 120, 'rgba(255,230,170,1)', 0.25); });
    if (flash > 0) scr(() => screenFill('#fffcf0', 0.85 * flash));
  };
  DIR.interv = {
    outfit: 'photog', light: { side: 1, rim: '#ffe6c0' }, grade: ['#8a7a5a', 0.16],
    act: () => [[S0.interv, 'talk'], [EV.iv_us, 'sideeye'], [EV.iv_cz, 'suspicious'], [EV.iv_flash - 0.03, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 560, y: 1660, s: 1.0, look: t < EV.iv_flash ? [-0.7, 0] : [0.2, 0.1], hand: t > EV.iv_flash - 0.2 ? [-170, -330] : undefined, tilt: t > EV.iv_flash ? 0.05 : 0 }),
    cam: () => [[S0.interv, 540, 1160, 0.08], [EV.iv_us, 480, 1200, 0.04], [EV.iv_cz, 560, 1220, 0.02], [EV.iv_flash, 540, 1240, 0.1, 'x'], [S1.interv, 540, 1240, 0.14]]
  };
  // ---------------------------------------------------------------- переход В interv: Spider-Verse-рывок вдоль рельсов
  TRANS_IN.interv = { a: 0.24, b: 0.36, runA: 1, fx(k, t, A, B) {
    const vx = 600, vy = 1000, q = sm(k);
    if (k < 0.5) { const z = 1 + Math.pow(k / 0.5, 2) * 3; for (let i = 5; i >= 0; i--) drawBuf(A, z * (1 - i * 0.05), vx, vy, i ? 0.18 : 1); }
    else { const z = 2.2 - 1.2 * sm((k - 0.5) / 0.5); for (const [dx, op] of [[-14, 'lighter'], [14, 'lighter']]) drawBuf(B, z, vx, vy, 0.3, op, dx * (1 - q)); drawBuf(B, z, vx, vy, 0.85); }
    scr(() => { const r = rng(hsh(FRAME, 41)); for (let i = 0; i < 60; i++) { const a = r() * 6.283, d0 = 120 + r() * 300, d1 = d0 + 300 + r() * 900; pencil([[vx + Math.cos(a) * d0, vy + Math.sin(a) * d0], [vx + Math.cos(a) * d1, vy + Math.sin(a) * d1]], { w: 2 + r() * 4, col: i % 3 ? '#fff6e0' : '#ff3a6a', a: 0.6 * Math.sin(k * Math.PI), pass2: false, gap: false }); } });
  } };
})();
