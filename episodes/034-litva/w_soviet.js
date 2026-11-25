/* 034 — сцена `soviet`, 1940 → 1990. Серый Вильнюс: проспект, тяжёлые тучи, грузовики-полуторки, очередь у магазина, репродуктор
   на столбе, на фоне вырастают панельные пятиэтажки (полвека за 4 с), Гедиминова башня — без флага. Без символики и знамён.
   Главный свет — пасмурный холодный, одно жёлтое окно; к концу — тусклые фонари. На «СССР» — тяжёлый удар, краски выцветают в серое;
   на «полвека» — табло-счётчик 1940 → 1990 крутится, пятиэтажки «вырастают»; Том (ватник) стоит в очереди с авоськой. */
(() => {
  const L = LTC.ink;
  EV.sv_ussr = wtk('s7', 'СССР'); EV.sv_half = wtk('s7', 'полвека'); EV.sv_end = wtk('s7', 'советской.');
  KEYW.push('СССР', 'советской.');
  const G = t => sm(clamp((t - EV.sv_ussr) / 0.6));
  function sky(t) { vgrad(-900, 1100, ['#4a5058', '#7a7e86', '#a8a8a8'], 1); for (let i = 0; i < 6; i++) { const y = 240 + i * 80, dx = (t * 20 + i * 50) % 260; blob([[-260 + dx, y], [300 + dx, y - 30], [900 + dx, y - 10], [1300, y + 16], [300, y + 30]], { wash: i % 2 ? '#5a6068' : '#8a8e94', washA: 0.8, line: false }); } }
  function far(t) { hills(1030, 30, '#5a6058', 8.2); gedTower(900, 1040, 0.45, t, { brick: '#8a5a4a', hill: '#4a5a44' }); const g = sm(clamp((t - EV.sv_half) / 1.6));
    for (let i = 0; i < 5; i++) { const h = 240 * clamp(g * 1.5 - i * 0.12); if (h > 4) panelFive(-100 + i * 220, 1040, 200, h, t); } depthFog('#9a9aa0', 0.08); }
  function panelFive(x, base, w, h, t) { rect(x - w / 2, base - h, w, h, { wash: '#b8b4aa', washA: 1, w: 2, col: L }); for (let i = 0; i < Math.floor(h / 46); i++) for (let j = 0; j < 4; j++) rect(x - w / 2 + 16 + j * 46, base - h + 12 + i * 46, 28, 26, { wash: (i + j) % 7 === 0 ? '#ffd890' : '#5a6a74', washA: 1, w: 1, col: L, a: 0.7 }); }
  function street(t) {                                              // старые дома, магазин, очередь, грузовики, репродуктор
    const g = G(t); oldTown(-400, 300, 1230, t, 7900, { dark: g > 0.5 }); oldTown(980, 1700, 1230, t, 7901, { dark: g > 0.5 });
    push(640, 1240, 1); rect(-200, -260, 400, 260, { wash: lerpC('#d8c8a0', '#8a8a86', g), washA: 1, w: 2.4, col: L }); rect(-170, -240, 340, 50, { wash: '#4a4a52', washA: 1, w: 1.6, col: L }); txt('ПРОДУКТЫ', 0, -214, 34, { col: '#e8e8e0', font: 'Osw' });
    rect(-150, -170, 130, 120, { wash: '#ffe0a0', washA: 1, w: 1.4, col: L }); rect(40, -170, 70, 170, { wash: '#4a3a2a', washA: 1, w: 1.6, col: L }); pop();
    for (let i = 0; i < 7; i++) human(760 + i * 60, 1300, 0.66, t, { body: ['#4a4a52', '#5a4a3a', '#3a3a44', '#6a5a4a'][i % 4], hat: ['fur', 'scarf', 'cap', null][i % 4], hatCol: '#3a3a3a', legs: '#2a2a2e', long: i % 4 === 1 ? 1 : undefined, armR: 'hold', flip: -1, seed: 7910 + i, face: 'calm' });
    for (let i = 0; i < 2; i++) { const tx = ((t * 60 + i * 700) % 1900) - 400; push(tx, 1320, 0.7); rect(-160, -120, 220, 90, { wash: '#4a5a3a', washA: 1, w: 2, col: L }); rect(60, -150, 100, 120, { wash: '#4a5a3a', washA: 1, w: 2, col: L }); rect(80, -136, 60, 40, { wash: '#8a9aa8', washA: 1, w: 1.4, col: L }); for (const k of [-100, 100]) ell(k, -26, 28, 28, { wash: '#1e1e22', washA: 1, w: 2, col: L }); pop(); }
    push(260, 1300, 0.8); pencil([[0, 0], [0, -400]], { w: 8, col: '#3a3a3e', pass2: false }); poly([[0, -380], [80, -420], [80, -340]], { wash: '#6a6a70', washA: 1, w: 2, col: L }); pop();
  }
  function ground(t) {                                              // мокрый асфальт, лужи, урна, газеты, окурки, бордюр
    rect(-500, 1330, 2200, 1000, { wash: '#5a5a5e', washA: 1, w: 2, col: L }); const r = rng(7920); for (let i = 0; i < 18; i++) { const x = r() * 1900 - 400, y = 1360 + r() * 600; pencil([[x, y], [x + 40, y + 6], [x + 70, y - 4]], { w: 1.6, col: '#2a2a2e', a: 0.6, pass2: false }); }
    for (let i = 0; i < 3; i++) { push(300 + i * 360, 1700 + (i % 2) * 100, 1); blob([[-110, 0], [-80, -22], [90, -24], [120, 0], [60, 18], [-80, 16]], { wash: '#8a909a', washA: 1, w: 1.6, col: L }); pop(); }
    push(1080, 1720, 1); rect(-34, -80, 68, 80, { wash: '#4a5a4a', washA: 1, w: 2, col: L }); pop(); for (let i = 0; i < 4; i++) { push(800 + i * 70, 1880 - i * 10, 1, i); rect(-30, -20, 60, 40, { wash: '#e8e4d8', washA: 1, w: 1.2, col: L }); pop(); }
    rect(-500, 1330, 2200, 16, { wash: '#8a8a8e', washA: 1, w: 1.4, col: L }); lightPool(640, 1520, 500, 120, 'rgba(255,224,160,1)', 0.22); castShadow(380, 1720, 110, 420, 1.6, 0.25); moodDark(540, 1200, 500, 1500, '#101214', 0.28);
  }
  function front(t) { for (const x of [-170, 1250]) { rect(x - 80, 500, 160, 1900, { wash: '#6a6a6a', washA: 1, w: 2.4, col: L, shade: { gap: 12, a: 0.2, col: '#2a2a2a', ang: 0 } }); } }
  function hud(t) { if (t < EV.sv_half) return; const k = popK(t, EV.sv_half, 0.3), f = sm(clamp((t - EV.sv_half) / 1.4)); push(640, 1000, 0.85 * k, -0.02); ctx.save(); ctx.fillStyle = 'rgba(16,14,12,0.92)'; ctx.fillRect(-250, -90, 500, 180); ctx.restore();
    txt('1940 → ' + Math.round(lerp(1940, 1990, f)), 0, -30, 64, { col: '#e8e8e0', font: 'Osw' }); txt('≈ 50 ЛЕТ', 0, 50, 50, { col: '#ff8a6a', font: 'Osw' }); pop(); }
  function extras(t) {                                              // киоск «SPAUDA», скамья с пенсионерами, дети с мячом, фонари, провода трамвая
    push(1150, 1500, 0.9); rect(-90, -220, 180, 220, { wash: '#5a7a8a', washA: 1, w: 2, col: LTC.ink }); rect(-70, -180, 140, 80, { wash: '#c8d8e0', washA: 1, w: 1.4, col: LTC.ink }); rect(-90, -250, 180, 34, { wash: '#3a4a5a', washA: 1, w: 1.6, col: LTC.ink }); txt('SPAUDA', 0, -232, 26, { col: '#f0f0e8', font: 'Osw' }); for (let q = 0; q < 4; q++) rect(-60 + q * 32, -170, 26, 60, { wash: '#e8e4d8', washA: 1, w: 1, col: LTC.ink }); pop();
    push(-60, 1500, 0.9); rect(-120, -60, 240, 20, { wash: '#5a4a3a', washA: 1, w: 2, col: LTC.ink }); for (const k of [-100, 100]) pencil([[k, -40], [k, 0]], { w: 7, col: '#2a2a2a', pass2: false }); for (let i = 0; i < 2; i++) human(-50 + i * 100, -40, 0.7, t, { body: ['#5a4a5a', '#4a5a4a'][i], hat: ['scarf', 'fur'][i], hatCol: '#6a6a6a', legs: '#2a2a2a', long: i ? undefined : 1, armR: 'hold', seed: 7940 + i, face: 'calm' }); pop();
    const bh = Math.abs(Math.sin(t * 3.2)) * 120; ell(560, 1460 - bh, 20, 20, { wash: '#c8281e', washA: 1, w: 2, col: LTC.ink }); for (let i = 0; i < 2; i++) human(500 + i * 120, 1500, 0.55, t, { body: ['#3a5a8a', '#6a6a4a'][i], legs: '#2a2a36', armR: 'wave', flip: i ? -1 : 1, seed: 7945 + i, face: 'grin' });
    for (const x of [200, 900]) { push(x, 1300, 0.8); pencil([[0, 0], [0, -420]], { w: 6, col: '#3a3a3e', pass2: false }); pencil([[0, -420], [60, -440]], { w: 5, col: '#3a3a3e', pass2: false }); ell(66, -430, 20, 10, { wash: '#e8d8a0', washA: 1, w: 1.4, col: LTC.ink }); pop(); } pencil([[-400, 880], [1600, 860]], { w: 2, col: '#2a2a2e', a: 0.7, pass2: false });
    const tx = 1500 - ((t * 50) % 2200); push(tx, 1440, 0.75); rect(-260, -200, 520, 170, { wash: '#c8402a', washA: 1, w: 2.4, col: LTC.ink }); rect(-260, -60, 520, 30, { wash: '#e8d8a0', washA: 1, w: 1.4, col: LTC.ink }); for (let q = 0; q < 6; q++) rect(-240 + q * 80, -186, 64, 70, { wash: '#a8b8c0', washA: 1, w: 1.4, col: LTC.ink }); for (let q = 0; q < 4; q++) ell(-210 + q * 80, -150, 12, 14, { wash: '#e2b48e', washA: 1, w: 1, col: LTC.ink }); pencil([[0, -200], [40, -440]], { w: 3, col: '#2a2a2e', pass2: false }); for (const k of [-180, 180]) ell(k, -20, 26, 26, { wash: '#1e1e22', washA: 1, w: 2, col: LTC.ink }); txt('2', 200, -100, 40, { col: '#f0f0e8', font: 'Osw' }); pop();
  }
  WORLD.soviet = (t, u, cat) => {
    const g = G(t); lay(40, () => sky(t)); lay(15, () => far(t)); lay(3.2, () => street(t)); lay(1.5, () => extras(t)); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(2, () => motes(34, [-100, 500, 1200, 1800], '#c8ccd4', t, 7930, { sp: 7, vx: -1, sz: 2.4, a: 0.5, wob: 6 }));
    if (g > 0) scr(() => { ctx.save(); ctx.globalCompositeOperation = 'saturation'; ctx.globalAlpha = 0.6 * g; ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
  };
  DIR.soviet = {
    outfit: 'vatnik', light: { side: 1, rim: '#d0d4dc' }, grade: ['#202428', 0.08],
    act: () => [[S0.soviet, 'neutral'], [EV.sv_ussr, 'shock'], [EV.sv_half, 'annoyed'], [EV.sv_end, 'cold']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1720, s: 0.95, look: [0.6, -0.3], hand: [150, -260], squash: t > EV.sv_ussr && t < EV.sv_ussr + 0.3 ? 0.07 : b.squash }),
    afterCat: (t, u, P) => { const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; push(x, y, P.s); pencil([[0, 0], [0, 40]], { w: 3, col: '#3a3a3a', pass2: false }); blob([[-40, 40], [40, 40], [30, 120], [-30, 120]], { wash: false, w: 2, col: '#5a5a5a' }); ell(-10, 100, 16, 16, { wash: '#e8c040', washA: 1, w: 1, col: L }); pop(); },
    hud,
    cam: () => [[S0.soviet, 620, 1000, -0.08], [EV.sv_ussr, 600, 980, -0.02, 'x'], [S1.soviet, 620, 1000, -0.06]]
  };
  SHAKES.push([EV.sv_ussr, 0.25, 8]);
  TRANS_IN.soviet = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.drawImage(A, 0, e * 400); ctx.restore(); }); whiteOut(Math.sin(e * Math.PI) * 0.4, '120,120,124'); } };
})();
