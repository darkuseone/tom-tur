/* 017 — сцена `catacombs`: 1786, ночь. Наверху — процессия: телеги под чёрным покрывалом, священники с факелами, ворота
   переполненного кладбища; лестница вниз; в разрезе под землёй — штольни каменоломен и ровные стены, сложенные из костей
   и черепов (стилизовано, без натурализма), табличка «ARRÊTE! C'EST ICI L'EMPIRE DE LA MORT». На «миллионов» — HUD «≈ 6 000 000»,
   на «каменоломни» камера уходит под землю. Том — шахтёр с фонарём. Переход В сцену — факел гаснет в темноте. */
(() => {
  EV.ca_mil = wtk('s2', 'миллионов');
  EV.ca_down = wtk('s2', 'каменоломни');
  KEYW.push('миллионов', 'каменоломни');

  function sky(t) { vgrad(-900, 1000, ['#0a0e22', '#1a2040', '#2a2a48'], 1); ctx.save(); ctx.fillStyle = '#fff8e8'; const r = rng(17301); for (let i = 0; i < 60; i++) { ctx.globalAlpha = 0.3 + 0.5 * Math.abs(Math.sin(t * 1.5 + i)); ctx.fillRect(r() * 1600 - 260, r() * 800 - 300, 2, 2); } ctx.restore(); ell(1150, 280, 50, 50, { wash: '#f6eed8', washA: 1, line: false }); }
  function surface(t) {                                                // кладбище, процессия, вход вниз
    const g = rect(-600, 900, 2300, 120, { wash: '#3a3a40', washA: 1, w: 2, col: '#0a0a10' });
    for (let q = 0; q < 8; q++) { const x = 900 + q * 90; rect(x, 840, 40, 60, { wash: '#6a6a70', washA: 1, w: 1.6, col: '#1a1a1e' }); ell(x + 20, 840, 20, 14, { wash: '#6a6a70', washA: 1, w: 1.6, col: '#1a1a1e' }); }
    for (let k = 0; k < 2; k++) { const x = -200 + ((t * 40 + k * 400) % 900); push(x, 900, 0.5); rect(-120, -80, 240, 60, { wash: '#1a1a1e', washA: 1, w: 2, col: '#000' }); for (const wx of [-80, 80]) ell(wx, -14, 30, 30, { wash: '#4a3a2a', washA: 1, w: 2, col: '#000' }); pop(); }
    for (let i = 0; i < 3; i++) { const x = -60 + i * 260 + ((t * 40) % 260); human(x, 905, 0.36, t, { body: '#1a1a1e', legs: '#1a1a1e', hair: '#1a1410', hat: 'hood', hatCol: '#1a1a1e', face: 'calm', armR: 'up', armL: 'hold', long: true, seed: 17310 + i }); glow(x + 20, 790, 60, 'rgba(255,170,80,1)', 0.7 + 0.2 * Math.sin(t * 13 + i)); ell(x + 20, 790, 8, 14, { wash: '#ffb050', washA: 1, line: false }); }
  }
  function under(t) {                                                  // штольня: стены из костей, табличка
    const g = rect(-600, 1020, 2300, 520, { wash: '#2a2420', washA: 1, w: 2, col: '#000' });
    skulls(-300, 1120, 600, 340, t); skulls(700, 1120, 600, 340, t);
    push(560, 1120); rect(-200, 0, 400, 340, { wash: '#1a1410', washA: 1, w: 2, col: '#000' }); ell(0, 0, 200, 90, { wash: '#1a1410', washA: 1, w: 2, col: '#000' }); rect(-180, -110, 360, 80, { wash: '#d8ccb0', washA: 1, w: 2.4, col: '#2a2420' }); txt('ARRÊTE! C\'EST ICI', 0, -78, 26, { font: 'Osw', col: '#2a1a10' }); txt('L\'EMPIRE DE LA MORT', 0, -46, 26, { font: 'Osw', col: '#2a1a10' }); pop();
    glow(560, 1300, 300, 'rgba(255,190,110,1)', 0.25 + 0.05 * Math.sin(t * 9));
  }

  WORLD.catacombs = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(6, () => { surface(t); under(t); });
    lay(1, () => { const g = shape([[-500, 1540], [1600, 1540], [1600, 2400], [-500, 2400]], { wash: '#3a322a', washA: 1, w: 2, col: '#000', a: 0.5 }); hatch(g.path, g.bb, { gap: 12, a: 0.15, col: '#000', ang: 0.1, w: 1.2 }); cat(); });
    lay(0.7, () => motes(30, [-200, 900, 1300, 1900], '#c8b8a0', t, 17320, { sp: 12, sz: 3, a: 0.3, wob: 20 }));
  };
  DIR.catacombs = {
    outfit: 'miner', light: { side: 1, rim: '#ffb870' }, grade: ['#4a3a2a', 0.2],
    act: () => [[S0.catacombs, 'suspicious'], [EV.ca_mil, 'shock'], [EV.ca_down, 'scared']],
    pose: (t, u, b) => Object.assign(b, { x: 280, y: 1560, s: 1.0, look: t < EV.ca_down ? [0.5, -0.5] : [0.6, 0.0] }),
    cam: () => [[S0.catacombs, 560, 960, 0.04], [EV.ca_mil, 560, 980, 0.04], [EV.ca_down, 560, 1260, 0.1], [S1.catacombs, 560, 1300, 0.12]],
    hud: t => { if (t > EV.ca_mil) { const k = popK(t, EV.ca_mil, 0.35); push(620, 720, k, 0.02); rect(-230, -60, 460, 120, { wash: '#1a1410', washA: 0.92, w: 3, col: '#000' }); txt('≈ 6 000 000', 0, -8, 48, { font: 'Osw', col: '#e8dcc0' }); txt('парижан под землёй', 0, 38, 26, { col: '#c8a878' }); pop(); } }
  };
  TRANS_IN.catacombs = { a: 0.3, b: 0.45, fx(k, t, A, B) {           // факел гаснет, из темноты проступает новая эпоха
    drawBuf(k < 0.5 ? A : B); scr(() => { const f = Math.sin(clamp(k) * Math.PI); ctx.save(); ctx.globalAlpha = f; ctx.fillStyle = '#05040a'; ctx.fillRect(0, 0, W, H); ctx.restore(); const fl = k < 0.5 ? 1 - k * 2 : 0; ell(540, 960, 30 * fl + 1, 60 * fl + 1, { wash: '#ffb050', washA: fl, line: false }); glow(540, 960, 200 * fl + 1, 'rgba(255,170,80,1)', fl); for (let q = 0; q < 4; q++) { const ph = (k * 2 + q / 4) % 1; ell(540 + ph * 40, 900 - ph * 300, 20 + ph * 40, 16 + ph * 30, { wash: '#6a6460', washA: 0.5 * (1 - ph) * f, line: false }); } });
  } };
})();
