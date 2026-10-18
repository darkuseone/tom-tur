/* 003 — сцена `kyi`: «482 год» основания Киева выбрали в 1982-м, под 1500-летний юбилей (документов о 482-м нет).
   Кабинет юбилейной комиссии 1982: деревянные панели, окно на киевские холмы, на столе — дело «ОБ ОСНОВАНИИ», календарь-счётчик лет.
   За окном — призрак легенды: Кий, Щек, Хорив и Лыбедь в ладье (из неё в 1982-м сделали памятник). Штамп «УТВЕРЖДЕНО», салют «КИЕВУ — 1500!».
   Переход В сцену: полосатый парус ладьи заполняет кадр и рвётся пополам. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.kyi_482 = wt('s8', '«четыреста');            // счётчик крутится к 482, призрак ладьи
  EV.kyi_pick = wt('s8', 'выбрали');              // Том выбирает дату
  EV.kyi_stamp = wt('s8', 'втором.');             // штамп «УТВЕРЖДЕНО 1982»
  EV.kyi_jub = wt('s8', 'юбилей!');               // салют, растяжка
  SHAKES.push([EV.kyi_stamp + 0.05, 0.22, 10]);
  KEYW.push('выбрали', 'юбилей!');

  function office(t) {
    vgrad(-400, 2200, ['#6a4a30', '#8a6440', '#4a3020']);
    for (let x = -300; x < 1400; x += 150) { const p = rect(x, 300, 146, 1100, { wash: '#8a5e36', washA: 1, w: 2, col: '#3a2410', key: 7900 + x }); fstr(p.path, p.bb, 18, 1.57, 80, '#5a3a1e', 0.35, 7901 + x); }
    rect(-300, 1100, 1700, 24, { wash: '#5a3a1e', washA: 1, w: 2, col: '#2a1408' });
    // окно с видом на холмы и призраком легенды
    const wx = 60, wy = 420, ww = 520, wh = 520; rect(wx - 20, wy - 20, ww + 40, wh + 40, { wash: '#e8e0cc', washA: 1, w: 2.6, col: '#3a2a1a' });
    const win = rect(wx, wy, ww, wh, { wash: '#b8d0dc', washA: 1, w: 2, col: '#3a2a1a', key: 7910 }); ctx.save(); ctx.clip(win.path);
    vgrad(wy, wy + wh, ['#9ac0d8', '#e8e0c8']); sil([[wx, wy + 380], [wx + 160, wy + 300], [wx + 360, wy + 330], [wx + ww, wy + 280], [wx + ww, wy + wh], [wx, wy + wh]], '#6a8a5a', 1);
    for (let k = 0; k < 6; k++) rect(wx + 30 + k * 80, wy + 300 + (k % 2) * 30, 40, 80, { wash: '#e8e4d8', washA: 1, w: 1, col: '#5a5a5a', a: 0.5 });
    sil([[wx + 380, wy + 300], [wx + 386, wy + 120], [wx + 394, wy + 120], [wx + 400, wy + 300]], '#8a8e92', 1);           // Родина-мать вдали
    const g = sm((t - EV.kyi_482) / 0.4) * (1 - sm((t - EV.kyi_stamp) / 0.3)); if (g > 0) { ctx.save(); ctx.globalAlpha = g; legend(wx + 260, wy + 260, 0.8, t); ctx.restore(); }
    ctx.restore(); pencil([[wx + ww / 2, wy], [wx + ww / 2, wy + wh]], { w: 8, col: '#e8e0cc' }); pencil([[wx, wy + 180], [wx + ww, wy + 180]], { w: 8, col: '#e8e0cc' });
    // плакат и вымпел
    rect(700, 420, 300, 420, { wash: '#c8302a', washA: 1, w: 2.4, col: '#4a0a08' }); txt('КИЕВ', 850, 500, 64, { font: 'Osw', col: '#f6e7c8' }); txt('482', 850, 600, 80, { font: 'Osw', col: '#ffd34a' }); txt('—', 850, 668, 50, { font: 'Osw', col: '#f6e7c8' }); txt('1982', 850, 740, 80, { font: 'Osw', col: '#ffd34a' });
    for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * 0.5; pencil([[850, 800], [850 + Math.cos(a) * 30, 800 + Math.sin(a) * 30]], { w: 4, col: '#ffd34a', pass2: false }); }
  }
  function legend(x, y, s, t) {                                      // ладья с Кием, Щеком, Хоривом и Лыбедью (как на памятнике 1982)
    push(x, y + Math.sin(t * 2) * 4, s);
    blob([[-200, 0], [200, 0], [240, -60], [180, 60], [-180, 60], [-240, -40]], { wash: '#a87a3a', washA: 1, w: 2.4, col: '#3a2410' });
    for (let k = 0; k < 3; k++) { const x0 = -120 + k * 90; blob([[x0 - 26, 0], [x0 - 30, -120], [x0, -150], [x0 + 30, -120], [x0 + 26, 0]], { wash: '#8a6a3a', washA: 1, w: 2, col: '#3a2410' }); ell(x0, -170, 22, 24, { wash: '#a87a3a', washA: 1, w: 1.8, col: '#3a2410' }); }
    blob([[150, -20], [130, -150], [170, -260], [200, -160], [190, -20]], { wash: '#a87a3a', washA: 1, w: 2, col: '#3a2410' }); for (const sd of [-1, 1]) pencil([[170, -230], [170 + sd * 70, -300]], { w: 8, col: '#a87a3a' });
    txt('легенда', 0, 110, 34, { font: 'Hand', col: '#3a2a1a' }); pop();
  }
  function desk(t) {
    const d = rect(-200, 1250, 1500, 420, { wash: '#6a4224', washA: 1, w: 3, col: '#2a1408', key: 7920 }); fstr(d.path, d.bb, 30, 0.02, 200, '#3a2410', 0.35, 7921);
    rect(-200, 1236, 1500, 28, { wash: '#7a5030', washA: 1, w: 2, col: '#2a1408' });
    // телефон
    push(900, 1250, 1); blob([[-60, 0], [-50, -60], [50, -60], [60, 0]], { wash: '#d8c8a8', washA: 1, w: 2.4, col: '#3a2a1a' }); ell(0, -40, 26, 16, { wash: '#efe6d0', washA: 1, w: 1.6 }); blob([[-70, -64], [-64, -84], [64, -84], [70, -64], [50, -70], [-50, -70]], { wash: '#d8c8a8', washA: 1, w: 2.2 }); pop();
    // календарь-счётчик лет
    push(240, 1180, 1); rect(-150, -150, 300, 170, { wash: '#efe6d0', washA: 1, w: 2.6, col: '#2a1a0a' }); rect(-150, -150, 300, 36, { wash: '#a8241e', washA: 1, w: 2, col: '#2a1a0a' }); txt('ГОД ОСНОВАНИЯ', 0, -132, 22, { font: 'Osw', col: '#fff2d0' });
    let yr = '????'; if (t > EV.kyi_482) { const q = clamp((t - EV.kyi_482) / 0.8); yr = q < 1 ? String(Math.floor(lerp(1982, 482, Math.pow(q, 0.6)))) : '482'; if (q < 1) yr = yr.replace(/\d(?=\d$)/, d => String((+d + FRAME) % 10)); }
    txt(yr, 0, -46, 96, { font: 'Osw', col: t > EV.kyi_pick ? '#a8241e' : '#1a120c' }); pop();
    // дело
    push(640, 1330, 1, -0.04); rect(-180, -110, 360, 220, { wash: '#d8c08a', washA: 1, w: 2.6, col: '#5a4424', key: 7930 }); txt('ДЕЛО', 0, -64, 36, { font: 'Osw', col: '#3a2a10' }); txt('об основании Киева', 0, -20, 26, { font: 'Hand', col: '#3a2a10' });
    pencil([[-120, 40], [120, 40]], { w: 1.6, col: '#5a4424', pass2: false }); txt('документов: 0', 0, 70, 28, { font: 'Hand', col: '#a8241e' });
    if (t > EV.kyi_stamp) { const q = popK(t, EV.kyi_stamp, 0.25); push(40, 10, 1.7 - 0.7 * q, -0.2); ctx.save(); ctx.globalAlpha = Math.min(1, q * 1.4) * 0.92; rect(-170, -54, 340, 108, { wash: 'rgba(0,0,0,0)', washA: 0, w: 6, col: '#a8241e' });
      txt('УТВЕРЖДЕНО', 0, -10, 46, { font: 'Osw', col: '#a8241e' }); txt('1982', 0, 34, 30, { font: 'Osw', col: '#a8241e' }); ctx.restore(); pop(); }
    pop();
  }
  function salute(t) { if (t < EV.kyi_jub - 0.05) return; const q = clamp((t - EV.kyi_jub) / 0.9);
    for (let b = 0; b < 3; b++) { const cx = [250, 560, 860][b], cy = [560, 470, 600][b], R = 40 + q * (200 + b * 40), c = ['#ffd34a', '#ff6a4a', '#7fd8ff'][b];
      for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283; pencil([[cx + Math.cos(a) * R * 0.6, cy + Math.sin(a) * R * 0.6 + q * 40], [cx + Math.cos(a) * R, cy + Math.sin(a) * R + q * 60]], { w: 4, col: c, a: 1 - q * 0.8, pass2: false }); glow(cx + Math.cos(a) * R, cy + Math.sin(a) * R + q * 60, 14, 'rgba(255,240,200,1)', (1 - q) * 0.8); } }
    const k = popK(t, EV.kyi_jub, 0.4); push(540, 760, k, 0.03); rect(-380, -60, 760, 120, { wash: '#a8241e', washA: 1, w: 3, col: '#4a0a08' }); txt('КИЕВУ — 1500 ЛЕТ!', 0, 4, 64, { font: 'Osw', col: '#ffd34a' }); pop(); }

  WORLD.kyi = (t, u, cat) => {
    lay(3, () => { office(t); });
    lay(1, () => { cat(); desk(t); });
    lay(0.9, () => { salute(t); });
  };
  DIR.kyi = {
    outfit: 'soviet', light: { side: 1, rim: '#ffe6c0' }, grade: ['#8a6a4a', 0.14],
    act: () => [[S0.kyi, 'neutral'], [EV.kyi_482, 'suspicious'], [EV.kyi_pick, 'smug'], [EV.kyi_stamp, 'sideeye'], [EV.kyi_jub, 'grin']],
    pose: (t, u, b) => { const st = t > EV.kyi_stamp - 0.25 && t < EV.kyi_stamp + 0.2; return Object.assign(b, {
      x: 600, y: 1300, s: 1.0, look: t > EV.kyi_jub ? [0, 0] : t > EV.kyi_stamp - 0.3 ? [0.1, 0.7] : [-0.6, 0.3],
      hand: st ? [60, t < EV.kyi_stamp ? -260 : -40] : t > EV.kyi_482 && t < EV.kyi_stamp - 0.3 ? [-160, -250] : undefined, point: t > EV.kyi_482 && t < EV.kyi_stamp - 0.3 ? 1 : undefined, tailUp: t > EV.kyi_jub }); },
    cam: () => [[S0.kyi, 520, 980, 0.06], [EV.kyi_482, 440, 980, 0.1], [EV.kyi_stamp, 600, 1120, 0.12], [EV.kyi_jub, 540, 980, 0.02], [S1.kyi, 540, 970, 0.04]]
  };
  // ---------------------------------------------------------------- переход В сцену: парус заполняет кадр и рвётся
  function sailTex(x0, x1) { scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(x0, 0, x1 - x0, H); ctx.clip(); ctx.fillStyle = '#e8dcc0'; ctx.fillRect(0, 0, W, H); for (let x = 0; x < W; x += 180) { ctx.fillStyle = '#a8241e'; ctx.fillRect(x, 0, 90, H); } const r = rng(77); for (let i = 0; i < 300; i++) { ctx.fillStyle = 'rgba(60,40,20,0.08)'; ctx.fillRect(r() * W, r() * H, 2, 10); } ctx.restore(); }); }
  TRANS_IN.kyi = { a: 0.26, b: 0.38, runA: 1, fx(k, t, A, B) {
    if (k < 0.4) { const q = sm(k / 0.4); drawBuf(A, 1 + q * 0.6, 760, 900); ctx.save(); ctx.globalAlpha = q; sailTex(0, W); ctx.restore(); return; }
    const q = sm((k - 0.4) / 0.6), off = q * 700; drawBuf(B, 1.06 - 0.06 * q);
    const tear = side => { const p = new Path2D(); const cx = 540 + side * off; if (side < 0) { p.moveTo(-10, -10); p.lineTo(cx, -10); } else { p.moveTo(W + 10, -10); p.lineTo(cx, -10); } for (let y = 0; y <= H; y += 40) p.lineTo(cx + Math.sin(y * 0.09) * 26 + (y % 80 ? 14 : -14), y); if (side < 0) { p.lineTo(-10, H + 10); } else { p.lineTo(W + 10, H + 10); } p.closePath(); return p; };
    for (const sd of [-1, 1]) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clip(tear(sd)); ctx.translate(sd * off * 0.2, 0); sailTex(0, W); ctx.restore(); }
  } };
})();
