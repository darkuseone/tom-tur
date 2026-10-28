/* 019 — сцена `hook`: 2026, ночь, Енисей, Атамановский кряж. В подошве горы — бетонный портал тоннеля, КПП ЗАТО, забор с колючкой,
   прожектора режут снег. С 0,0 с луч прожектора проходит по кадру и бьёт в Тома (движение + удар). На «Восемьдесят тысяч» из снега
   проступает призрачная колонна заключённых и уходит в тоннель; на «Зачем?!» в портале вспыхивает голубое свечение (намёк на ответ).
   Последний кадр кнопки — эта же гора и портал (петля). Переход в туннель — луч прожектора заливает кадр. */
(() => {
  EV.hk_80 = wtk('h1', 'Восемьдесят');
  EV.hk_dig = wtk('h1', 'рыли');
  EV.hk_why = wtk('h1', 'Зачем?!');
  EV.hk_wind = wtk('h2', 'Отматываем');
  SHAKES.push([0.02, 0.3, 9], [EV.hk_why, 0.3, 7]);
  KEYW.push('заключённых', 'Зачем?!');

  const ZS = window.ZS = {};                                      // хук отдаёт свои планы кнопке (петля)
  ZS.sky = (t) => {
    vgrad(-900, 1300, ['#070a1c', '#16204a', '#2e3a6e', '#5a5a86'], 1);
    const r = rng(19011); for (let i = 0; i < 140; i++) { const x = r() * 1700 - 300, y = r() * 900 - 600, s = r() * 2.4 + 0.6; ctx.fillStyle = '#f2f4ff'; ctx.globalAlpha = 0.4 + 0.5 * Math.abs(Math.sin(t * 1.5 + i)); ctx.fillRect(x, y, s, s); } ctx.globalAlpha = 1;
    ell(860, -320, 54, 54, { wash: '#f4ecd0', washA: 1, w: 1.6, col: '#8a8270' }); glow(860, -320, 260, 'rgba(220,226,255,1)', 0.35);
    for (let k = 0; k < 5; k++) { const x = ((k * 400 + t * 14) % 2200) - 600, y = -120 + k * 70; blob([[x, y], [x + 120, y - 50], [x + 300, y - 40], [x + 420, y + 10], [x + 200, y + 30]], { wash: '#3a4270', washA: 0.55, w: 0, line: false }); }
    glow(540, 700, 900, 'rgba(90,150,255,1)', 0.12);
  };
  ZS.far = (t) => { taigaRidge(980, 120, '#1a2240', 3, 1); taigaRidge(1040, 90, '#141a34', 7, 1, 20);
    for (let k = 0; k < 18; k++) { const x = -200 + k * 90; glow(x, 1010 + (k % 3) * 6, 26, 'rgba(255,210,140,1)', 0.5 + 0.3 * Math.sin(t * 3 + k)); } };   // огни города на том берегу
  ZS.mount = (t, glowIn) => {
    mountain(t, { x: 640, top: 360, base: 1260, w: 1800, col: '#283048', colD: '#0e1224', colL: '#5a6a8a', tree: '#141c30', snow: 0.8, snowCol: '#c8d4ee', trees: 90, seed: 2 });
    for (let k = 0; k < 6; k++) { const x = 380 + k * 90, y = 1180 - (k % 2) * 40; pencil([[x, y], [x, y - 110]], { w: 6, col: '#3a4258', pass2: false }); glow(x, y - 112, 60, 'rgba(255,90,70,1)', 0.6 + 0.4 * Math.sin(t * 4 + k)); }   // мачты с красными огнями
    yenisei(1250, 1330, t, { top: '#1a2a4a', bot: '#0a1224', glint: '#8ab0e0' });
  };
  ZS.portal = (t, inner) => {
    const L = '#0e0e10';
    shape([[-600, 1330], [1700, 1330], [1700, 1500], [-600, 1500]], { wash: '#c8d4e2', washA: 1, w: 0, line: false });   // насыпь
    portal(760, 1330, 0.78, t, { conc: '#8a90a0', lit: 0.25 + inner * 0.9, inner: inner > 0.05 ? 'rgba(120,200,255,1)' : 'rgba(255,200,120,1)', star: 0, lamps: 1, lamp: 'rgba(255,214,150,1)' });
    // бетонный забор с колючкой по верху, КПП, шлагбаум, знак
    for (let x = -400; x < 1500; x += 120) { if (x > 560 && x < 980) continue; const p = rect(x, 1200, 116, 130, { wash: '#7a8090', washA: 1, w: 1.8, col: L }); hatch(p.path, p.bb, { gap: 7, a: 0.2, col: '#3a4050', ang: 0.15, w: 1 }); pencil([[x + 4, 1204], [x + 112, 1204]], { w: 6, col: '#e8eef6', a: 0.8, pass2: false }); }
    wire(-400, 560, 1200, 50, t, { step: 120, post: 4, wood: '#3a3e48', col: '#1a1c22', w: 1.6 }); wire(980, 1500, 1200, 50, t, { step: 120, post: 4, wood: '#3a3e48', col: '#1a1c22', w: 1.6 });
    const kp = rect(330, 1180, 170, 150, { wash: '#d8dce4', washA: 1, w: 2, col: L }); hatch(kp.path, kp.bb, { gap: 9, a: 0.12, col: '#5a6070', ang: 0, w: 1 });
    rect(350, 1210, 130, 60, { wash: '#ffd890', washA: 1, w: 1.6, col: L }); glow(415, 1240, 120, 'rgba(255,214,140,1)', 0.6); poly([[320, 1180], [415, 1140], [510, 1180]], { wash: '#3a4050', washA: 1, w: 1.8, col: L });
    human(400, 1330, 0.36, t, { body: '#2a3a2a', legs: '#1a1a1a', hat: 'police', hatCol: '#2a3a2a', armR: 'hold', face: 'calm', seed: 41 });
    push(510, 1300, 1, -0.02); for (let k = 0; k < 8; k++) rect(k * 40, -8, 40, 16, { wash: k % 2 ? '#c8302a' : '#f2f2f2', washA: 1, w: 1.2, col: L }); pop(); pencil([[505, 1330], [505, 1290]], { w: 8, col: '#3a3e48', pass2: false });
    rect(120, 1150, 190, 110, { wash: '#f2f2ee', washA: 1, w: 2, col: L }); txt('ЗАТО', 215, 1184, 34, { col: '#b8322a', font: 'Osw' }); txt('ВЪЕЗД ПО', 215, 1218, 20, { col: '#1a1a1a', font: 'Osw' }); txt('ПРОПУСКАМ', 215, 1240, 20, { col: '#1a1a1a', font: 'Osw' }); pencil([[160, 1260], [160, 1330]], { w: 6, col: '#5a5e68', pass2: false }); pencil([[270, 1260], [270, 1330]], { w: 6, col: '#5a5e68', pass2: false });
    pole(1060, 1330, 260, t, { lamp: 0.6, wood: '#3a3e48' }); pole(-60, 1330, 260, t, { lamp: 0.6, wood: '#3a3e48' });
  };
  function ghosts(t) {                                            // призрачная колонна заключённых уходит в портал (память места)
    if (t < EV.hk_80 - 0.1) return; const k = sm((t - EV.hk_80 + 0.1) / 0.6) * (1 - sm((t - LS('h2') - 0.2) / 0.5)); if (k <= 0) return;
    for (let i = 0; i < 18; i++) { const ph = ((t - EV.hk_80) * 0.11 + i / 18) % 1, x = lerp(1260, 770, ph) + (i % 2 ? 26 : -26) * (1 - ph), y = lerp(1720, 1335, ph), s = lerp(1.25, 0.24, ph), bob = Math.abs(Math.sin(t * 5 + i)) * 6 * s, a = k * (1 - ph * 0.3) * clamp(ph * 8);
      const P = [[-30, 0], [-34, -110], [-52, -200], [-34, -240], [-18, -250], [-22, -280], [0, -300], [22, -280], [18, -250], [34, -240], [52, -200], [34, -110], [30, 0]].map(([a2, b]) => [x + a2 * s, y + (b - bob) * s]);
      ell(x, y, 46 * s, 10 * s, { wash: '#2a3658', washA: 0.5 * a, line: false });
      sil(P, '#141a30', 0.82 * a); sil([[x - 40 * s, y - 284 * s], [x, y - 322 * s], [x + 40 * s, y - 284 * s]], '#141a30', 0.82 * a);   // ушанка
      pencil(P.slice(0, 7).map(([px, py]) => [px - 3 * s, py]), { w: Math.max(1.5, 5 * s), col: '#9fc4ff', a: 0.7 * a, pass2: false, gap: false });   // холодный контровой свет прожектора
      blob([[x + 30 * s, y - 210 * s], [x + 70 * s, y - 220 * s], [x + 76 * s, y - 160 * s], [x + 36 * s, y - 150 * s]], { wash: '#141a30', washA: 0.8 * a, w: 0, line: false }); }   // котомка
    txt('80 000', 700, 930, 70, { col: '#e4eeff', font: 'Osw', a: 0.85 * k, rot: -0.05 });
  }
  function front(t) {
    snowGround(1440, t, { col: '#d4dff0', colD: '#8a9ec2', seed: 3 });
    for (const sd of [-1, 1]) { pencil([[540 + sd * 120, 1460], [540 + sd * 640, 2000]], { w: 10, col: '#a8b8d6', a: 0.7, pass2: false }); }   // колея
    spruce(-90, 1500, 640, t, 5, { snow: 1, col: '#1e2c3a', colD: '#0a1018', colL: '#4a6a7a', snowCol: '#dfe8f6', w: 0.34 });
    spruce(1170, 1520, 700, t, 6, { snow: 1, col: '#1e2c3a', colD: '#0a1018', colL: '#4a6a7a', snowCol: '#dfe8f6', w: 0.34 });
    for (let k = 0; k < 14; k++) { const f = k / 14, x = lerp(540, 520 + (k % 2 ? 160 : -160), f), y = lerp(1450, 1900, f); ell(x + (k % 2) * 30, y, 10 + f * 16, 5 + f * 6, { wash: '#8a9ec2', washA: 0.6, line: false }); }   // следы к порталу
    for (let k = 0; k < 6; k++) { const x = 640 + k * 130, y = 1640 + (k % 2) * 60; push(x, y, 0.9 + k * 0.1); const b = rect(-60, -70, 120, 70, { wash: '#a8b0bc', washA: 1, w: 2, col: '#2a2e38' }); hatch(b.path, b.bb, { gap: 8, a: 0.2, col: '#4a5060', ang: 0.2, w: 1 }); pencil([[-60, -72], [60, -72]], { w: 10, col: '#eef4fb', a: 0.95, pass2: false }); for (const sd of [-1, 1]) { rect(sd * 34 - 5, -64, 10, 50, { wash: k % 2 ? '#c8302a' : '#f2f2f2', washA: 1, line: false }); } pop(); }   // бетонные блоки-«ежи» вдоль дороги
    for (let k = 0; k < 5; k++) { const x = -40 + k * 70, y = 1700 + (k % 3) * 50; pencil([[x, y], [x + 6, y - 120]], { w: 5, col: '#4a3a2a', pass2: false }); pencil([[x - 4, y - 100], [x + 30, y - 116]], { w: 3, col: '#4a3a2a', pass2: false }); }   // вешки в сугробе
    ell(860, 1520, 140, 34, { wash: '#eef4fb', washA: 1, w: 1.4, col: '#7a8aa6', a: 0.5 }); ell(160, 1560, 180, 40, { wash: '#eef4fb', washA: 1, w: 1.4, col: '#7a8aa6', a: 0.5 });
    push(900, 1540, 1); pencil([[0, 0], [0, -150]], { w: 6, col: '#5a5e68', pass2: false }); rect(-60, -230, 120, 80, { wash: '#2a5a9a', washA: 1, w: 2, col: '#0a0a0a' }); txt('ГХК', 0, -200, 30, { col: '#f2f2f2', font: 'Osw' }); txt('2 км', 0, -170, 22, { col: '#f2f2f2', font: 'Osw' }); pop();
  }
  ZS.beams = (t, k0 = 0) => {                                      // прожектора: один ходит маятником, второй с 0,0 с проходит через Тома
    const a1 = -2.2 + Math.sin(t * 0.9) * 0.5, a2 = lerp(-0.9, -2.5, sm(clamp((t - k0) / 1.1)));
    beam(980, 1110, a1, 1900, 0.5); beam(150, 1150, a2 + Math.PI, 1600, 0.45);
  };

  WORLD.hook = (t, u, cat) => {
    lay(40, () => ZS.sky(t));
    lay(24, () => ZS.far(t));
    lay(12, () => ZS.mount(t));
    lay(5, () => { ZS.portal(t, t > EV.hk_why ? sm((t - EV.hk_why) / 0.4) * (1 - 0.4 * sm((t - EV.hk_why - 0.6) / 0.6)) : 0); });
    lay(3, () => { ZS.beams(t); });
    lay(1, () => { front(t); ghosts(t); cat(); });
    lay(0.62, () => { spruce(-260, 2100, 1200, t, 9, { snow: 1, col: '#141e28', colD: '#05080c', snowCol: '#c8d6ec', w: 0.4, tiers: 9 }); pencil([[1240, 2000], [1220, 900]], { w: 30, col: '#2a2c34', pass2: false }); wire(1100, 1400, 1700, 600, t, { step: 300, post: 0, col: '#14161c', w: 3 }); });
    motes(70, [-200, -200, 1300, 2000], '#eef4ff', t, 19021, { sp: 70, vx: -24, sz: 3.2, a: 0.8, wob: 26 });
    haze('#4a5a9a', 0.05);
  };
  DIR.hook = {
    outfit: 'hoodieZ', light: { side: 1, rim: '#bcd6ff' }, grade: ['#3a4a8a', 0.12],
    act: () => [[0, 'shock'], [EV.hk_dig, 'scared'], [EV.hk_why - 0.05, 'suspicious'], [LS('h2'), 'smug'], [EV.hk_wind, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1480, s: 1.08, look: t < EV.hk_why ? [0.7, -0.3] : t < LS('h2') ? [0.1, 0.05] : [0.2, 0], tilt: t < 0.35 ? -0.07 : 0, squash: b.squash + (t < 0.2 ? 0.07 : 0),
      frost: 0.3, point: t > EV.hk_dig && t < EV.hk_why - 0.05 ? 1 : undefined, hand: t > EV.hk_wind - 0.05 ? [70, -330] : t > EV.hk_dig && t < EV.hk_why - 0.05 ? [210, -290] : undefined, tailUp: t < LS('h2'),
      watchInHand: t > EV.hk_wind - 0.1, glow: clamp((t - EV.hk_wind) / 0.4), spin: t > EV.hk_wind + 0.3 ? 1 : 0 }),
    cam: () => [[0, 760, 1060, 0.26], [EV.hk_80, 640, 1020, 0.12], [EV.hk_why, 600, 1000, 0.18, 'x'], [LS('h2'), 520, 1100, 0.14], [S1.hook, 480, 1120, 0.22]]
  };
  TRANS_IN.tunnel = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {       // луч прожектора разворачивается в камеру и заливает кадр белым
    const q = sm(k); drawBuf(q < 0.55 ? A : B, q < 0.55 ? 1 + q * 0.2 : 1.1 - 0.1 * q);
    scr(() => { beam(1080, 300, Math.PI * 0.75, 2400 * (0.4 + q), 0.9 * Math.sin(Math.min(1, k * 1.2) * Math.PI)); whiteOut(Math.sin(clamp(k) * Math.PI) * 0.95, '255,248,228'); });
  } };
})();
