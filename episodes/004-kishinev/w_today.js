/* 004 — сцены `today` и `button`.
   today: 2026, Кишинёв, площадь у собора на закате: Триумфальная арка крупно, собор и колокольня, горожане, троллейбус, фонтан, голуби.
   «Сто семьдесят лет» — счётчик «170 ЛЕТ»; «гаражом для колокола!» — над проёмом второго яруса выскакивает табличка «ГАРАЖ · колокол», Том сухо в камеру.
   Переход В today: лифт вверх — из подвала камера взлетает по шахте к площади. button: ночной Кишинёв — арка и собор в подсветке,
   «Ворота города», телебашня, огни троллейбусов; портал часов с постерами городов. Переход В button: стрелка часов заметает кадр по кругу. */
(() => {
  EV.td_170 = WT('t1', 'Сто');
  EV.td_arch = WT('t1', 'арка');
  EV.td_garage = WT('t1', 'гаражом');
  EV.bt_point = WT('x1', 'Пиши');
  EV.bt_wink = WT('x1', 'отмотаем!');
  KEYW.push('семьдесят', 'гаражом', 'колокола!');

  const fade = (t, a, b) => clamp((t - a) / (b - a));
  const AX = 620, AY = 1440, AS = 1.0;
  function sky(t) { vgrad(-900, 1400, ['#3a4a8a', '#a87aa0', '#f4a070', '#f8cc88']); glow(260, 1000, 600, 'rgba(255,180,100,1)', 0.5);
    for (let k = 0; k < 6; k++) { const r = rng(1600 + k), cx = ((r() * 1800 + t * 10) % 1900) - 400, cy = 60 + r() * 420; for (let q = 0; q < 5; q++) ell(cx + q * 64 - 128, cy - Math.sin(q / 4 * Math.PI) * 30, 76, 32, { wash: q % 2 ? '#f8c8a8' : '#fcdcc0', washA: 0.8, line: false }); pencil([[cx - 170, cy + 24], [cx + 170, cy + 24]], { w: 2, col: '#b87a7a', a: 0.4, pass2: false }); } }
  function city(t) {                              // дальний план: многоэтажки, телебашня, тополя
    for (let k = 0; k < 20; k++) { const r = rng(1610 + k), x = -500 + k * 110, h = 140 + r() * 180; sil([[x, 1200], [x, 1200 - h], [x + 90, 1200 - h], [x + 90, 1200]], k % 2 ? '#7a6a8a' : '#6a5e80', 1); windows(x + 4, 1206 - h, 82, h - 12, 4, Math.floor(h / 22), 1620 + k, 0.5, '#ffd890', '#a8d8ff', 0.7); }
    pencil([[1180, 1200], [1180, 640]], { w: 8, col: '#6a5e80', pass2: false }); glow(1180, 640, 24, 'rgba(255,90,70,1)', 0.9);
    for (let k = 0; k < 12; k++) { const r = rng(1630 + k); poplar(-300 + k * 140 + r() * 40, 1230, 200 + r() * 90, t, 1630 + k, '#4a6a4a'); }
    haze('#e8a088', 0.22);
  }
  function plaza(t) {
    poly([[-600, 1320], [1700, 1300], [1700, 2400], [-600, 2400]], { wash: '#c4ae90', washA: 1, line: false }); vgrad(1300, 2000, ['#c8b090', '#a89070', '#7a6650']);
    for (let k = 0; k < 16; k++) { const q = Math.pow(k / 15, 1.6), y = lerp(1320, 2100, q); pencil([[-600, y], [1700, y - 20]], { w: 1 + q * 2, col: '#7a6650', a: 0.45, pass2: false }); }
    for (let k = -14; k <= 14; k++) pencil([[AX + k * 30, 1320], [AX + k * 200, 2200]], { w: 1.2, col: '#7a6650', a: 0.3, pass2: false });
    glow(AX, 1600, 500, 'rgba(255,200,130,1)', 0.25);
  }
  function fountain(x, y, t) { push(x, y, 0.8); ell(0, 0, 150, 30, { wash: '#8a8a90', washA: 1, w: 2.4, col: '#2a2a30' }); ell(0, -6, 130, 22, { wash: '#6aa8c8', washA: 1, line: false });
    for (let q = 0; q < 7; q++) { const a = (q / 7 - 0.5) * 2.2, P = []; for (let s2 = 0; s2 <= 10; s2++) { const u = s2 / 10; P.push([Math.sin(a) * 120 * u, -8 - Math.sin(u * Math.PI) * 120 + u * 0]); } pencil(P, { w: 3, col: '#d8f0ff', a: 0.8, pass2: false }); }
    for (let i = 0; i < 12; i++) { const r = rng(hsh(FRAME, i, 41)); ell((r() - 0.5) * 220, -10 - r() * 40, 3, 3, { wash: '#e8f8ff', washA: 0.8, line: false }); } pop(); }
  function people(t) {
    const cols = ['#3a5a7a', '#a84a3a', '#6a7a4a', '#4a4a5a', '#c8a040', '#7a3a5a', '#2a6a6a'];
    for (let i = 0; i < 10; i++) { const r = rng(1640 + i), dir = i % 2 ? 1 : -1, x = ((200 + i * 140 + t * 50 * dir * (0.6 + r())) % 1500 + 1500) % 1500 - 200;
      human(x, 1360 + (i % 3) * 14, 0.3 + (i % 3) * 0.03, t, { body: cols[i % 7], hair: r() < 0.5 ? '#2a1a10' : '#6a4a2a', hat: i % 4 === 0 ? 'cap' : undefined, hatCol: '#2a3a5a', face: 'smile', armR: i % 3 === 0 ? 'hold' : 'swing', prop: i % 3 === 0 ? 'phone' : undefined, seed: 1650 + i, flip: dir, long: i % 4 === 1 }); }
    human(140, 1480, 0.66, t, { body: '#3a5a7a', hair: '#3a2a1a', face: t > EV.td_garage ? 'grin' : 'smile', armR: 'up', prop: 'phone', seed: 1661, look: 0.5 });
    human(1080, 1470, 0.62, t, { body: '#a84a3a', hat: 'scarf', hatCol: '#e8c040', face: t > EV.td_garage ? 'shock' : 'smile', armL: t > EV.td_garage ? 'point' : 'down', flip: -1, seed: 1662, long: 1 });
  }
  function trolley(t) { const x = -400 + ((t * 120) % 2400); push(x, 1290, 0.5); rect(-260, -200, 520, 190, { wash: '#e8d24a', washA: 1, w: 2.4, col: '#2a2a20' }); rect(-260, -60, 520, 50, { wash: '#3a6a9a', washA: 1, w: 1.8, col: '#2a2a20' });
    for (let k = 0; k < 6; k++) rect(-240 + k * 82, -180, 66, 90, { wash: '#ffe8b0', washA: 1, w: 1.6, col: '#2a2a20' }); for (const wx of [-170, 170]) ell(wx, -6, 34, 34, { wash: '#1a1a1e', washA: 1, w: 2, col: '#0a0a0a' });
    pencil([[-120, -200], [-60, -360]], { w: 4, col: '#2a2a30', pass2: false }); pencil([[-80, -200], [-20, -350]], { w: 4, col: '#2a2a30', pass2: false }); pop(); }
  function garageSign(t) {                        // «ГАРАЖ» над проёмом колокола
    if (t < EV.td_garage - 0.05) return; const k = popK(t, EV.td_garage, 0.4); push(AX, AY - 720 * AS, k, -0.04);
    rect(-170, -50, 340, 100, { wash: '#2a5aa8', washA: 1, w: 3, col: '#0a1a3a' }); rect(-160, -40, 320, 80, { wash: '#2a5aa8', washA: 1, w: 2, col: '#f6ecd6' }); txt('ГАРАЖ', -20, -2, 54, { font: 'Osw', col: '#f6ecd6' });
    push(110, 0, 0.12); kBell(0, 300, 1, t, {}); pop(); pop();
    pencil([[AX + 40, AY - 660 * AS], [AX + 20, AY - 560 * AS]], { w: 4, col: '#f6ecd6', a: 0.9 * k, pass2: false });
  }

  WORLD.today = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => city(t));
    lay(6, () => { push(980, 1300, 0.6); kCathedral(0, 0, 1, t, {}); pop(); for (let i = 0; i < 8; i++) { const r = rng(1670 + i); acacia(-150 + i * 190 + r() * 40, 1330, 300 + r() * 80, t, 1670 + i, i % 2 ? '#5a8a3a' : '#6a9a44'); } trolley(t); haze('#f0b890', 0.08); });
    lay(2.4, () => { plaza(t); kBelfry(70, 1420, 0.9, t, {}); fountain(1080, 1440, t); });
    lay(1.5, () => { kArch(AX, AY, AS, t, { bell: 1, lit: 0.8 }); garageSign(t); people(t); });
    lay(1, () => cat());
    lay(0.6, () => { const sw = Math.sin(t * 1.2) * 8; for (let k = 0; k < 7; k++) { push(-40 + sw, 220, 1, 0.3 + k * 0.2); blob([[0, 0], [60, -30], [190, -10], [220, 20], [180, 40], [60, 30]], { wash: k % 2 ? '#3a5a2a' : '#4a6a30', washA: 0.96, w: 2, col: '#142410' }); pop(); }
      for (let i = 0; i < 6; i++) { const r = rng(1680 + i), x = 200 + i * 140, y = 1880 + (i % 2) * 20, hop = Math.abs(Math.sin(t * 6 + i)) * 10; push(x, y - hop, 0.9, 0, i % 2 ? 1 : -1); ell(0, 0, 22, 13, { wash: '#8a8a96', washA: 1, w: 1.4, col: '#2a2a30' }); ell(18, -10, 10, 9, { wash: '#6a6a7a', washA: 1, w: 1.2, col: '#2a2a30' }); pop(); } });
    motes(26, [0, 300, W, 1700], '#ffe0b0', t, 91, { sp: 6, sz: 2.2, a: 0.5, tw: 1, add: 1 });
  };
  DIR.today = {
    outfit: 'hoodieKi', light: { side: -1, rim: '#ffc890' }, grade: ['#8a4a3a', 0.14],
    act: () => [[S0.today, 'proud'], [EV.td_170, 'awe'], [EV.td_arch, 'smug'], [EV.td_garage, 'sideeye'], [EV.td_garage + 0.6, 'wink']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: GY + 80, s: 1.0, walk: u < 0.6 ? t * 8 : undefined, look: t > EV.td_garage ? [0, 0.05] : [0.7, -0.4], hand: t > EV.td_arch && t < EV.td_garage ? [150, -340] : undefined, point: t > EV.td_arch && t < EV.td_garage ? 1 : undefined, tailUp: t > EV.td_garage }),
    cam: () => [[S0.today, 600, 1000, 0.0], [EV.td_170, 600, 980, 0.02], [EV.td_arch, 620, 920, 0.06], [EV.td_garage, 600, 900, 0.1, 'x'], [S1.today, 560, 960, 0.12]],
    hud: t => { if (t < EV.td_170 - 0.05 || t > S1.today) return; const k = popK(t, EV.td_170, 0.35); push(820, 1760, k, -0.04); ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
      ctx.font = '600 120px Osw'; ctx.lineWidth = 20; ctx.strokeStyle = 'rgba(12,8,6,0.94)'; ctx.strokeText('170 ЛЕТ', 0, 0); ctx.fillStyle = K.amber; ctx.fillText('170 ЛЕТ', 0, 0); ctx.restore(); pop(); }
  };
  // ---------------------------------------------------------------- переход В today: лифт вверх из подвала к площади
  TRANS_IN.today = { a: 0.2, b: 0.4, runA: 1, fx(k, t, A, B) {
    const q = sm(k), off = q * H;
    drawBuf(A, 1, 540, 960, 1, null, 0, off); drawBuf(B, 1, 540, 960, 1, null, 0, off - H - 120);
    scr(() => { ctx.fillStyle = '#3a2a1c'; ctx.fillRect(0, off - 120, W, 120); for (let x = 0; x < W; x += 90) pencil([[x, off - 120], [x + 40, off]], { w: 3, col: '#1a120a', a: 0.6, pass2: false });
      const a = Math.sin(Math.PI * q); for (let i = 0; i < 40; i++) { const r = rng(hsh(FRAME, i, 51)), x = r() * W; pencil([[x, r() * H], [x, r() * H + 360 * a]], { w: 2 + r() * 3, col: '#fff6e0', a: 0.5 * a, pass2: false, gap: false }); } });
  } };

  // ================================================================ BUTTON
  function gates(x, y, s) {                       // «Ворота города»: две башни 1970-х у въезда
    push(x, y, s); for (const sd of [-1, 1]) { const bx = sd * 160; sil([[bx - 70, 0], [bx - 70, -520], [bx + 70, -520], [bx + 70, 0]], '#2a2848', 1); windows(bx - 66, -514, 132, 508, 6, 22, 1700 + sd, 0.5, '#ffd890', '#a8d8ff', 0.8); }
    sil([[-100, -470], [100, -470], [100, -440], [-100, -440]], '#2a2848', 1); pop();
  }
  WORLD.button = (t, u, cat) => {
    const open = sm((t - EV.portal) / 0.9);
    lay(40, () => { vgrad(-800, 1400, ['#05071a', '#141838', '#2a2450', '#6a3a5a']); ctx.save(); ctx.fillStyle = '#fff8e8'; const r = rng(1710); for (let i = 0; i < 120; i++) { ctx.globalAlpha = 0.3 + 0.6 * Math.abs(Math.sin(t * 1.7 + i * 1.3)); ctx.fillRect(r() * 1600 - 260, r() * 1300 - 500, 2, 2); } ctx.restore(); });
    lay(14, () => { sil([[-600, 1250], [1700, 1220], [1700, 1500], [-600, 1500]], '#141228', 1); gates(1050, 1240, 0.7); pencil([[200, 1240], [200, 720]], { w: 7, col: '#2a2848', pass2: false }); glow(200, 720, 24, 'rgba(255,90,70,1)', 0.9);
      for (let k = 0; k < 30; k++) { const x = -500 + k * 70, h = 40 + (k * 37) % 120, y = 1250; sil([[x, y], [x, y - h], [x + 56, y - h], [x + 56, y]], '#1a1834', 1); windows(x + 3, y - h + 4, 50, h - 8, 3, Math.floor(h / 14), k * 7, 0.5, '#ffcf7a', '#8fd8ff', 0.7); }
      for (let k = 0; k < 40; k++) glow(-500 + k * 60, 1300 - (k % 3) * 4, 12, 'rgba(255,214,140,1)', 0.8); });
    lay(5, () => { ctx.save(); ctx.globalAlpha = 0.95; push(560, 1320, 0.5); kArch(0, 0, 1, t, { bell: 1, lit: 1 }); pop(); push(900, 1300, 0.36); kCathedral(0, 0, 1, t, {}); pop(); ctx.restore(); glow(560, 1100, 260, 'rgba(255,200,120,1)', 0.45); glow(900, 1050, 200, 'rgba(255,220,150,1)', 0.35); haze('#2a2050', 0.12); });
    if (open > 0) lay(2, () => { const cx = 540, cy = 610, R = 400 * open;
      glow(cx, cy, R * 1.35, 'rgba(255,200,120,1)', 0.45 * open);
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.9, R * 0.82, 0, 0, 6.3); ctx.clip(); const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(0.5, 'rgba(60,110,170,0.6)'); g.addColorStop(1, 'rgba(20,10,40,0.6)'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); ctx.restore();
      for (let k = 0; k < 3; k++) pencil(ellPts(cx, cy, R * (1 - k * 0.07), R * (1 - k * 0.07) * 0.92, t * (k % 2 ? 1.5 : -1), 0.05, 80), { w: 9 - k * 2.5, col: ['#ffd890', '#f1d27a', '#c99636'][k], a: open, pass2: false });
      for (let n = 0; n < 12; n++) { const a = n / 12 * 6.283 - Math.PI / 2 + t * 0.4; txt(['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'][n], cx + Math.cos(a) * R * 1.09, cy + Math.sin(a) * R * 1.0, 32, { col: '#ffe9b8', font: 'Osw', a: open }); }
      [['РИМ', '#8a3a2a', '#f0c070', 'col'], ['ПАРИЖ', '#3a5a8a', '#e8b07a', 'eiffel'], ['ТОКИО', '#e8e0d0', '#f4a0a0', 'fuji'], ['?', '#2a4a3a', '#c8e0a0', 'tower']].forEach(([s, c1, c2, kd], k) => {
        const a = t * 0.55 + k * Math.PI / 2, d = Math.sin(a); poster(cx + Math.cos(a) * R * 0.66, cy + d * R * 0.42, (0.62 + 0.14 * d) * open, Math.cos(a) * -0.12, s, c1, c2, kd, t); });
    });
    lay(1, () => { poly([[-400, 1560], [1500, 1540], [1500, 2400], [-400, 2400]], { wash: '#1e1a2a', washA: 1, w: 2, col: '#0a0810' }); for (let x = -300; x < 1400; x += 60) pencil([[x, 1550], [x, 1440]], { w: 6, col: '#2a2638', pass2: false }); pencil([[-400, 1440], [1500, 1430]], { w: 8, col: '#2a2638', pass2: false }); cat(); });
    motes(40, [0, 300, W, 1700], '#ffd8b0', t, 94, { sp: -14, sz: 2.4, a: 0.6, tw: 1, add: 1 });
  };
  DIR.button = {
    outfit: 'hoodieKi', light: { side: 1, rim: '#ffc890' }, grade: ['#3a2050', 0.26],
    act: () => [[S0.button, 'talk'], [EV.bt_point, 'grin'], [EV.bt_wink - 0.05, 'wink']],
    pose: (t, u, b) => { const pt = t > EV.bt_point && t < EV.bt_wink - 0.05, wv = Math.sin(t * 10) * 14;
      return Object.assign(b, { x: 640, y: 1580, s: 1.45, look: t < EV.portal + 0.3 ? [0.2, -0.5] : [0, 0.05], watchInHand: true, glow: 0.4 + 0.6 * sm((t - EV.portal) / 0.8), spin: 0.5 + (t > EV.bt_wink ? (t - EV.bt_wink) * 3 : 0),
        hand: [92, -270], handF: pt ? [-120, -250 + wv] : t > EV.bt_wink ? [-80, -170] : [-80, -150], tilt: t > EV.bt_wink ? 0.08 : 0, tailUp: t > EV.portal }); },
    cam: () => [[S0.button, 600, 1160, 0.22], [EV.portal, 580, 1000, 0.0], [EV.bt_point + 0.2, 590, 1040, 0.08, 'x'], [EV.bt_wink, 590, 1030, 0.06], [EV.bt_wink + 0.25, 600, 1050, 0.14, 'x'], [DUR + 0.2, 600, 1040, 0.1]],
    afterCat: (t, u, P) => { const wx = P.x + (P.hand[0] + 6) * P.s, wy = P.y + (P.hand[1] - 34) * P.s; rays(wx, wy, -Math.PI / 2, 6.28, 300 + 200 * P.glow, 'rgba(255,214,140,0.6)', 0.25 * P.glow, 10, t * 2); }
  };
  // ---------------------------------------------------------------- переход В button: стрелка часов заметает кадр по кругу
  TRANS_IN.button = { a: 0.2, b: 0.45, runA: 1, fx(k, t, A, B) {
    const q = sm(k), cx = 540, cy = 960, ang = -Math.PI / 2 + q * Math.PI * 2;
    drawBuf(A);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, 2400, -Math.PI / 2, ang); ctx.closePath(); ctx.clip(); ctx.drawImage(B, 0, 0); ctx.restore();
    scr(() => { pencil([[cx, cy], [cx + Math.cos(ang) * 1400, cy + Math.sin(ang) * 1400]], { w: 22, col: '#c99636', pass2: false, gap: false }); pencil([[cx, cy], [cx + Math.cos(ang) * 1400, cy + Math.sin(ang) * 1400]], { w: 6, col: '#fff1c8', pass2: false, gap: false }); ell(cx, cy, 30, 30, { wash: '#c99636', washA: 1, w: 3, col: '#5a3a10' }); glow(cx, cy, 120, 'rgba(255,220,150,1)', 0.6); });
  } };
})();
