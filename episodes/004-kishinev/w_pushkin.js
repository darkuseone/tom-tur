/* 004 — сцена `pushkin`: 1820–1823, вечерний Кишинёв — одноэтажный пыльный городок: белёные дома с галереями, акации, кофейня-кафене,
   лоток с фруктами, молдаване в кушмах, грек в феске, кибитка, купол церкви Мазараки. В окне дома Наумова при свече пишет Пушкин.
   «сослали» — подкатывает почтовая кибитка; «Кишинёв.» — верстовой столб «КИШИНЁВЪ»; «Онегина»! — Пушкин поднимает лист, над окном
   рукописный титул «Евгений Онегин. Глава первая». Переход В сцену: кибитка проносится через кадр, дорожная пыль стирает 1466 год. */
(() => {
  EV.pu_kib = WT('s5', 'сослали');               // кибитка
  EV.pu_post = WT('s5', 'Кишинёв.');             // верстовой столб
  EV.pu_here = WT('s5', 'Тут');                  // Том показывает на окно
  EV.pu_oneg = WT('s5', 'Онегина');              // лист и титул
  KEYW.push('дерзкие', 'сослали', '«Онегина»!');

  const fade = (t, a, b) => clamp((t - a) / (b - a));
  function sky(t) {
    vgrad(-900, 1300, ['#2a3a6a', '#7a5a8a', '#e88a5a', '#f6c47a']);
    glow(300, 1000, 520, 'rgba(255,170,90,1)', 0.45);
    ctx.save(); ctx.fillStyle = '#fff8e8'; const r = rng(10001); for (let i = 0; i < 40; i++) { ctx.globalAlpha = 0.3 + 0.5 * Math.abs(Math.sin(t * 1.3 + i)); ctx.fillRect(r() * 1600 - 260, r() * 500 - 500, 2, 2); } ctx.restore();
    ell(880, 120, 34, 34, { wash: '#fff6dc', washA: 0.95, line: false }); glow(880, 120, 120, 'rgba(255,246,220,1)', 0.4);
  }
  function skyline(t) {                           // дальний план: купола церквей, тополя, дымки
    for (let k = 0; k < 10; k++) { const r = rng(10010 + k); poplar(-300 + k * 180 + r() * 60, 1180, 220 + r() * 120, t, 10010 + k, '#3a4a3a'); }
    push(760, 1180, 0.5); sil([[-100, 0], [-100, -200], [100, -200], [100, 0]], '#8a6a7a', 1); const dp = []; for (let a = 0; a <= 12; a++) { const q = Math.PI + a / 12 * Math.PI; dp.push([Math.cos(q) * 80, -200 + Math.sin(q) * 110]); } sil(dp, '#6a5a7a', 1); pencil([[0, -310], [0, -380]], { w: 5, col: '#e2b44a', pass2: false }); pencil([[-14, -360], [14, -360]], { w: 4, col: '#e2b44a', pass2: false }); pop();
    for (let k = 0; k < 6; k++) { const r = rng(10020 + k); bHouse(-200 + k * 260 + r() * 40, 1190, 200, 90, { seed: 30 + k, roof: k % 2 ? 'tile' : 'reed', lit: 0.6, t, smoke: k % 3 === 0, s: 0.6 }); }
    haze('#6a4a6a', 0.3);
  }
  function street(t) {                            // пыльная немощёная улица, колеи, лужи, тротуар-доски
    poly([[-600, 1300], [1700, 1280], [1700, 2400], [-600, 2400]], { wash: '#b8a07a', washA: 1, line: false }); vgrad(1280, 2000, ['#c8ae84', '#a8906a', '#7a6448']);
    for (const sx of [-1, 1]) pencil(spline([[540 + sx * 60, 1290], [540 + sx * 200, 1600], [540 + sx * 520, 2100]], false, 8), { w: 6, col: '#7a6448', a: 0.6, pass2: false });
    ell(300, 1700, 140, 26, { wash: '#6a7a9a', washA: 0.7, w: 1.6, col: '#4a3a2a' }); glow(300, 1700, 120, 'rgba(255,190,120,1)', 0.25);
    for (let i = 0; i < 30; i++) { const r = rng(10030 + i); ell(-300 + r() * 1600, 1320 + Math.pow(r(), 1.5) * 600, 6, 3, { wash: '#8a7254', washA: 0.8, line: false }); }
  }
  function naumovHouse(t) {                       // дом Наумова: белёный, галерея, большое освещённое окно с Пушкиным
    const L = KI.ink, X = 560, Y = 1300;
    push(X, Y, 1);
    const wl = rect(-420, -330, 840, 330, { wash: '#f2ead6', washA: 1, w: 2.4, col: L, key: 10040 }); shadeG(wl.path, 420, 0, -420, 0, '#b8a88a', 0.45); hatch(wl.path, wl.bb, { gap: 10, a: 0.06, col: '#7a6a4a', ang: 1.2, key: 10041 });
    rect(-420, -30, 840, 30, { wash: '#8a7a64', washA: 1, w: 1.8, col: L });
    const rf = poly([[-470, -320], [-360, -500], [360, -500], [470, -320]], { wash: '#b0563a', washA: 1, w: 2.6, col: L }); for (let k = 0; k < 7; k++) { const yy = -500 + k * 26; pencil([[lerp(-360, -470, k / 7), yy], [lerp(360, 470, k / 7), yy]], { w: 1.6, col: '#6a2a1a', a: 0.7, pass2: false }); }
    rect(200, -540, 34, 90, { wash: '#e8e0cc', washA: 1, w: 1.8, col: L }); for (let k = 0; k < 4; k++) { const ph = (t * 0.4 + k / 4) % 1; glow(217 + Math.sin(ph * 5) * 20, -560 - ph * 200, 20 + ph * 40, 'rgba(200,190,200,1)', 0.35 * (1 - ph), 'source-over'); }
    // окно Пушкина (большое, слева) и тёмное окно справа
    const wx = -200, wy = -300, ww = 330, wh = 250;
    rect(wx - ww / 2, wy, ww, wh, { wash: '#ffd690', washA: 1, w: 3, col: L });
    ctx.save(); ctx.beginPath(); ctx.rect(wx - ww / 2, wy, ww, wh); ctx.clip();
    vgrad(wy, wy + wh, ['#f4c070', '#c87a3a']); for (let i = 0; i < 5; i++) rect(wx - 120 + i * 30, wy + 20, 22, 70, { wash: ['#7a3a2a', '#3a5a3a', '#5a3a6a', '#8a6a2a', '#2a3a5a'][i], washA: 1, w: 1.2, col: L });   // полка с книгами
    rect(wx - 160, wy + 190, 320, 22, { wash: '#5a3a1e', washA: 1, w: 1.6, col: L });   // стол
    candle(wx + 110, wy + 190, 1.1, t, 3);
    for (let i = 0; i < 5; i++) { const r = rng(10045 + i); push(wx - 120 + r() * 100, wy + 186, 1, (r() - 0.5) * 0.4); rect(-22, -4, 44, 6, { wash: '#f6efe0', washA: 1, w: 1, col: L }); pop(); }
    pushkinFig(wx + 0, wy + 280, 0.84, t);
    ctx.restore();
    glow(wx, wy + wh / 2, 260, 'rgba(255,200,120,1)', 0.45);
    for (const xx of [wx - ww / 2, wx, wx + ww / 2]) pencil([[xx, wy], [xx, wy + wh]], { w: xx === wx ? 4 : 6, col: '#5a3a1e', pass2: false }); pencil([[wx - ww / 2, wy + wh / 2], [wx + ww / 2, wy + wh / 2]], { w: 4, col: '#5a3a1e', pass2: false });
    for (const sd of [-1, 1]) rect(wx + sd * (ww / 2 + 30) - 30, wy - 6, 60, wh + 12, { wash: '#3a6a9a', washA: 1, w: 2, col: L });
    rect(wx - ww / 2 - 14, wy + wh, ww + 28, 14, { wash: '#e6dcc4', washA: 1, w: 1.8, col: L });
    rect(140, -260, 120, 150, { wash: '#3a4a5a', washA: 1, w: 2.4, col: L }); pencil([[200, -260], [200, -110]], { w: 3, col: L, pass2: false });
    rect(300, -250, 80, 220, { wash: '#6a4428', washA: 1, w: 2.2, col: L, shade: { gap: 5, a: 0.3, col: L, ang: 1.57 } });
    // табличка (позже — музей)
    rect(-40, -310, 120, 26, { wash: '#2a2a2a', washA: 0.85, w: 1.4, col: L }); txt('ул. Антоновская', 20, -296, 16, { font: 'Hand', col: '#e8dcc0' });
    pop();
  }
  function pushkinFig(x, y, s, t) {               // Пушкин за столом: кудри, бакенбарды, перо
    const oneg = t > EV.pu_oneg;
    human(x, y, s, t, { body: '#2a2a3a', bodyD: '#12121a', hair: '#1a1008', face: oneg ? 'grin' : 'calm', armR: oneg ? 'up' : 'hold', prop: oneg ? 'scroll' : undefined, seed: 1799, look: oneg ? 0.4 : -0.5 });
    push(x, y, s); const hy = -238 - 46;
    for (let k = 0; k < 11; k++) { const a = Math.PI * (1.05 + k / 10 * 0.9), cx = Math.cos(a) * 44, cy = hy - 6 + Math.sin(a) * 50; ell(cx, cy, 13, 12, { wash: '#1a1008', washA: 1, w: 1.4, col: '#000' }); pencil(ellPts(cx, cy, 6, 6, k, 0.2, 10), { w: 1.4, col: '#4a3020', a: 0.7, pass2: false }); }
    for (const sd of [-1, 1]) blob([[sd * 40, hy - 10], [sd * 44, hy + 30], [sd * 30, hy + 40], [sd * 32, hy - 2]], { wash: '#1a1008', washA: 1, w: 1.2, col: '#000' });
    pencil([[-30, -230], [30, -230]], { w: 6, col: '#f2ece0', pass2: false });   // белый воротник
    if (!oneg) { push(68, -150, 1, -0.6 + Math.sin(t * 9) * 0.15); pencil([[0, 0], [0, -80]], { w: 3, col: '#efe8d8', pass2: false }); for (let q = 0; q < 8; q++) pencil([[0, -20 - q * 8], [10 - q * 0.5, -26 - q * 8]], { w: 2, col: '#efe8d8', pass2: false }); pop(); }
    pop();
  }
  function kibitka(t) {                           // почтовая кибитка с тройкой: въезжает и останавливается
    const k = sm(fade(t, EV.pu_kib - 0.6, EV.pu_kib + 0.5)), x = lerp(1600, 1060, k), bob = Math.sin(t * 14) * 4 * (1 - k);
    push(x, 1360 + bob, 0.62); const L = '#1e140a';
    for (let h = 0; h < 2; h++) { const hx = -360 - h * 40, g = Math.sin(t * 12 + h) * 0.35 * (1 - k);
      for (const lx of [-40, 40]) { push(hx + lx, -90, 1, g * (lx > 0 ? 1 : -1)); pencil([[0, 0], [0, 90]], { w: 9, col: h ? '#4a2a14' : '#6a3a1a', pass2: false }); pop(); }
      blob([[hx - 80, -100], [hx - 50, -150], [hx + 60, -150], [hx + 80, -110], [hx + 70, -80], [hx - 70, -80]], { wash: h ? '#4a2a14' : '#6a3a1a', washA: 1, w: 2, col: L });
      shape([[hx - 60, -140], [hx - 110, -230], [hx - 80, -244], [hx - 40, -150]], { wash: h ? '#4a2a14' : '#6a3a1a', washA: 1, w: 1.8, col: L }); ell(hx - 104, -244, 26, 18, { wash: h ? '#4a2a14' : '#6a3a1a', washA: 1, w: 1.8, col: L }); }
    pencil([[-300, -130], [-130, -100]], { w: 3, col: L, pass2: false }); pencil(spline([[-380, -220], [-360, -280], [-340, -220]], false, 6), { w: 6, col: '#a8302a', pass2: false });   // дуга
    const b = blob([[-140, -60], [-150, -200], [-60, -280], [140, -280], [170, -200], [160, -60]], { wash: '#5a4a3a', washA: 1, w: 2.4, col: L }); hatch(b.path, b.bb, { gap: 8, a: 0.25, col: L, ang: 0.4, key: 10050 });
    rect(-150, -70, 320, 30, { wash: '#6a4428', washA: 1, w: 2, col: L });
    for (const wx of [-90, 120]) { ell(wx, -30, 54, 54, { wash: '#6a4428', washA: 0.2, w: 4, col: L }); for (let q = 0; q < 8; q++) { const a = q / 8 * Math.PI * 2 + t * 6 * (1 - k); pencil([[wx, -30], [wx + Math.cos(a) * 52, -30 + Math.sin(a) * 52]], { w: 2.4, col: L, pass2: false }); } }
    human(-70, -200, 0.42, t, { body: '#3a3a4a', hat: 'cap', hatCol: '#2a2a3a', beard: 'long', hair: '#3a2a1a', face: 'calm', armR: 'swing', prop: 'stick', seed: 1051 });
    pop();
    if (k < 1) for (let i = 0; i < 10; i++) { const r = rng(10055 + i), ph = (t * 1.5 + r()) % 1; glow(x + 200 + ph * 300, 1360 - ph * 80, 40 + ph * 80, 'rgba(200,170,130,1)', 0.35 * (1 - ph) * (1 - k), 'source-over'); }
  }
  function milepost(t) {                          // верстовой столб «КИШИНЁВЪ» (полосатый)
    if (t < EV.pu_post - 0.05) return; const k = popK(t, EV.pu_post, 0.4);
    push(900, 1500, 1, 0.04); ctx.save(); ctx.scale(1, k); pencil([[0, 0], [0, -320]], { w: 18, col: '#f2ece0', pass2: false }); for (let q = 0; q < 6; q++) pencil([[0, -q * 54 - 10], [0, -q * 54 - 36]], { w: 18, col: '#1a1a1a', pass2: false });
    rect(-120, -380, 240, 66, { wash: '#f2ece0', washA: 1, w: 2.4, col: '#1a1a1a' }); txt('КИШИНЁВЪ', 0, -348, 38, { font: 'Osw', col: '#1a1a1a' }); ctx.restore(); pop();
  }
  function townsfolk(t) {
    human(-40, 1460, 0.6, t, { body: '#efe6d0', bodyD: '#a89a7a', belt: '#a8302a', hat: 'fur', hatCol: '#2a2420', hair: '#3a2a1a', beard: 'short', face: 'calm', armR: 'hold', prop: 'stick', seed: 1061, look: 0.5 });
    human(1180, 1440, 0.56, t, { body: '#3a4a6a', trim: '#d6a842', hat: 'crown', hatCol: '#a8241e', hair: '#1a1008', beard: 'short', face: 'smile', armL: 'hips', seed: 1062, flip: -1, look: -0.6 });   // грек в феске (приблизительно)
    // лоток с фруктами
    push(80, 1420, 0.7); rect(-120, -70, 240, 70, { wash: '#8a5a32', washA: 1, w: 2, col: '#2a1a0e' }); for (let q = 0; q < 16; q++) { const r = rng(10065 + q); ell(-100 + r() * 200, -80 - r() * 20, 14, 13, { wash: ['#e8a030', '#c83a2a', '#6a2a4a', '#b8c040'][q % 4], washA: 1, w: 1.2, col: '#2a1a0e' }); }
    pencil([[-130, -70], [-130, -230]], { w: 5, col: '#5a3a1e', pass2: false }); pencil([[130, -70], [130, -230]], { w: 5, col: '#5a3a1e', pass2: false }); poly([[-160, -230], [160, -230], [140, -270], [-140, -270]], { wash: '#c8a868', washA: 1, w: 2, col: '#2a1a0e' }); pop();
    for (let i = 0; i < 4; i++) { const r = rng(10080 + i), dir = i % 2 ? 1 : -1, x = ((300 + i * 260 + t * 40 * dir) % 1400 + 1400) % 1400 - 100;
      human(x, 1380 + i * 6, 0.4, t, { body: ['#5a4a3a', '#efe6d0', '#3a4a5a', '#7a2a2a'][i], hat: i % 2 ? 'fur' : 'cap', hatCol: '#2a2420', hair: '#2a1a10', beard: i % 2 ? 'short' : undefined, face: 'calm', armR: 'swing', seed: 1081 + i, flip: dir }); }
    for (let i = 0; i < 5; i++) { const r = rng(10090 + i), x = 380 + i * 60 + Math.sin(t * 3 + i) * 10; push(x, 1470, 0.6, 0, i % 2 ? 1 : -1); ell(0, -16, 20, 14, { wash: i % 2 ? '#e8e0d0' : '#a86a3a', washA: 1, w: 1.4, col: '#2a1a0e' }); ell(16, -30, 8, 9, { wash: i % 2 ? '#e8e0d0' : '#a86a3a', washA: 1, w: 1.2, col: '#2a1a0e' }); poly([[22, -38], [30, -46], [24, -30]], { wash: '#c83a2a', washA: 1, line: false }); pencil([[-4, -4], [-4, 6]], { w: 2, col: '#c8a040', pass2: false }); pop(); }   // куры
    // кафене
    push(1180, 1300, 0.6); txt('КАФЕНЕ', 0, -300, 40, { font: 'Hand', col: '#f6e7c8' }); pop();
  }

  WORLD.pushkin = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(12, () => skyline(t));
    lay(3, () => { street(t); acacia(-120, 1320, 600, t, 1071); acacia(1180, 1300, 560, t, 1072, '#5a7a3a'); naumovHouse(t); });
    lay(1.6, () => { kibitka(t); townsfolk(t); });
    lay(1, () => { milepost(t); cat(); });
    lay(0.6, () => { push(-40, 2000, 1); pencil([[0, 0], [0, -900]], { w: 14, col: '#2a2420', pass2: false }); pencil([[-60, -900], [60, -900]], { w: 8, col: '#2a2420', pass2: false }); rect(-40, -1000, 80, 100, { wash: '#ffd890', washA: 1, w: 3, col: '#2a2420' }); glow(0, -950, 200, 'rgba(255,200,120,1)', 0.6); pop(); });
    motes(36, [0, 400, W, 1700], '#ffd8a0', t, 61, { sp: -10, sz: 2.2, a: 0.5, tw: 1, add: 1 });
  };

  DIR.pushkin = {
    outfit: 'victorian', light: { side: -1, rim: '#ffc890' }, grade: ['#6a3a4a', 0.16],
    act: () => [[S0.pushkin, 'talk'], [EV.pu_kib, 'annoyed'], [EV.pu_post, 'sideeye'], [EV.pu_here, 'smug'], [EV.pu_oneg, 'proud']],
    pose: (t, u, b) => {
      const o = { x: 800, y: GY + 60, s: 1.0, look: [0.6, -0.1], walk: u < 0.7 ? t * 7 : undefined };
      if (t > EV.pu_here) { o.look = [-0.8, -0.4]; o.hand = [-150, -330]; o.point = 1; o.flip = false; }
      if (t > EV.pu_oneg) { o.look = [0, 0]; o.hand = [80, -360]; o.handF = [-150, -330]; o.tailUp = true; }
      return Object.assign(b, o);
    },
    cam: () => [[S0.pushkin, 660, 1040, 0.02], [EV.pu_kib, 740, 1060, 0.04], [EV.pu_post, 720, 1080, 0.06], [EV.pu_here, 520, 1040, 0.08], [EV.pu_oneg, 480, 1000, 0.14, 'x'], [S1.pushkin, 480, 1000, 0.16]],
    hud: t => {
      if (t > EV.pu_oneg - 0.05) { const k = popK(t, EV.pu_oneg, 0.4); push(540, 600, k, -0.04); ctx.save(); ctx.fillStyle = 'rgba(246,239,224,0.94)'; ctx.fillRect(-300, -110, 600, 220); ctx.restore(); pencil([[-300, -110], [300, -110], [300, 110], [-300, 110], [-300, -110]], { w: 3, col: '#3a2a1a', pass2: false });
        txt('Евгений Онѣгинъ', 0, -40, 70, { font: 'Hand', col: '#2a1a0e', reveal: clamp((t - EV.pu_oneg) / 0.5) }); txt('Глава первая · Кишинёвъ, 1823', 0, 50, 36, { font: 'Hand', col: '#5a3a1e', reveal: clamp((t - EV.pu_oneg - 0.2) / 0.5) }); pop(); }
      if (t > EV.pu_kib && t < EV.pu_here) note('за «дерзкие стихи» — на юг', 560, 1780, t, EV.pu_kib, EV.pu_here, '#fff0d8', 44, -0.03);
    }
  };

  // ---------------------------------------------------------------- переход В сцену: кибитка проносится через кадр, дорожная пыль стирает прошлое
  TRANS_IN.pushkin = { a: 0.3, b: 0.4, runA: 1, fx(k, t, A, B) {
    const q = sm(k), cx = lerp(W + 500, -500, q);
    drawBuf(B); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(0, 0, Math.max(0, cx + 200), H); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore();
    scr(() => {
      for (let i = 0; i < 40; i++) { const r = rng(i * 9 + 4), x = cx + 100 + r() * 700, y = 300 + r() * 1500, R = 150 + r() * 250; glow(x, y, R, `rgba(${200 + r() * 30},${170 + r() * 20},${130 + r() * 20},1)`, 0.6 * clamp(1 - Math.abs(x - cx - 300) / 900), 'source-over'); }
      push(cx, 1300, 1.6); for (const wx of [-90, 120]) { ell(wx, -30, 54, 54, { wash: '#2a1a0a', washA: 0.2, w: 5, col: '#1e140a' }); for (let s2 = 0; s2 < 8; s2++) { const a = s2 / 8 * 6.283 + t * 20; pencil([[wx, -30], [wx + Math.cos(a) * 52, -30 + Math.sin(a) * 52]], { w: 3, col: '#1e140a', pass2: false }); } }
      blob([[-140, -60], [-150, -200], [-60, -280], [140, -280], [170, -200], [160, -60]], { wash: '#3a2a1a', washA: 0.95, w: 3, col: '#1e140a' }); pop();
    });
  } };
})();
