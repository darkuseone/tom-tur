/* 020 — сцена `answer` (ОТВЕТ НА ХУК): та же вечерняя набережная Сунжи, что в хуке. На «крепости» из земли перед башнями
   поднимается янтарный призрак крепости 1818-го (вал, частокол, бастион, ворота), на воротах загорается доска «ГРОЗНАЯ».
   На «она!» — табличка-карточка: «КРЕПОСТЬ ГРОЗНАЯ · 1818» → «ГОРОД ГРОЗНЫЙ · 1870»: окончание «-АЯ» меняется на «-ЫЙ».
   Плашка-вопрос «В ЧЕСТЬ КОГО?» меняется на ответ (EV.answer). Переход В сцену — янтарная LED-полоса башни прокатывается по кадру. */
(() => {
  EV.an_who = wtk('a1', 'кого?');
  EV.answer = wtk('a1', 'крепости');
  EV.an_name = wtk('a1', '«Грозная»!');
  EV.an_she = wtk('a1', 'она!');
  SHAKES.push([EV.answer + 0.1, 0.3, 8]);
  KEYW.push('крепости', '«Грозная»!', 'она!');

  function ghostFort(t) {                                          // призрак крепости 1818-го перед башнями
    const k = sm(clamp((t - EV.answer + 0.1) / 0.7)); if (k <= 0) return; const rise = (1 - k) * 260, a = 0.9 * k;
    push(0, rise - 40, 1); const C = '#ffb050';
    sil([[-200, 1340], [-120, 1190], [1300, 1190], [1400, 1340]], '#a85a18', 0.55 * a);                                     // вал
    for (let x = -120; x < 1300; x += 28) sil([[x, 1192], [x, 1110], [x + 12, 1092], [x + 24, 1110], [x + 24, 1192]], '#c86a20', 0.5 * a);   // частокол
    pencil([[-120, 1190], [1300, 1190]], { w: 5, col: C, a, pass2: false, gap: false }); pencil([[-120, 1120], [1300, 1120]], { w: 3, col: C, a: 0.7 * a, pass2: false, gap: false });
    sil([[880, 1190], [960, 1060], [1140, 1060], [1220, 1190]], '#c86a20', 0.5 * a); pencil([[880, 1190], [960, 1060], [1140, 1060], [1220, 1190]], { w: 4, col: C, a, pass2: false, gap: false });   // бастион
    for (const cx of [1000, 1100]) { pencil([[cx - 40, 1056], [cx + 50, 1040]], { w: 12, col: '#ffc070', a, pass2: false, gap: false }); }
    const gx = 640; sil([[gx, 1190], [gx, 1060], [gx + 90, 1000], [gx + 180, 1060], [gx + 180, 1190]], '#a85a18', 0.55 * a); pencil([[gx, 1190], [gx, 1060], [gx + 90, 1000], [gx + 180, 1060], [gx + 180, 1190]], { w: 4, col: C, a, pass2: false, gap: false });
    glow(540, 1150, 700, 'rgba(255,170,70,1)', 0.25 * k);
    for (let i = 0; i < 9; i++) { const x = -60 + ((i * 140 + (t - EV.answer) * 40) % 1300), y = 1090, s2 = 0.42, bob = Math.abs(Math.sin(t * 5 + i)) * 4;   // призрачные часовые 1818-го на валу
      const P = [[-24, 0], [-28, -100], [-40, -170], [-26, -200], [-14, -210], [-16, -236], [0, -252], [16, -236], [14, -210], [26, -200], [40, -170], [28, -100], [24, 0]].map(([a2, b2]) => [x + a2 * s2, y + (b2 - bob) * s2]);
      sil(P, '#c86a20', 0.6 * a); sil([[x - 14 * s2, y - 250 * s2], [x - 12 * s2, y - 300 * s2], [x + 12 * s2, y - 300 * s2], [x + 14 * s2, y - 250 * s2]], '#c86a20', 0.6 * a);   // кивер
      pencil([[x + 20 * s2, y - 200 * s2], [x + 30 * s2, y - 330 * s2]], { w: 2.4, col: '#ffd890', a: 0.7 * a, pass2: false, gap: false }); pencil(P.slice(0, 7), { w: 2, col: '#ffd890', a: 0.6 * a, pass2: false, gap: false }); }
    if (k > 0.6) { const ph = (t - EV.answer) % 2.2; if (ph < 1.2) smokeCol(1040, 1030, ph, { n: 5, h: 260, sz: 0.5, col: '#ffcf8a', a: 0.35 * (1 - ph / 1.2), wind: 160, sp: 0.6 }); }   // салют пушки-призрака
    const flag = Math.sin(t * 4) * 10; pencil([[1060, 1060], [1064, 900]], { w: 4, col: C, a, pass2: false, gap: false }); sil([[1064, 900], [1160, 906 + flag], [1150, 950 + flag], [1064, 944]], '#ffc070', 0.6 * a);   // вымпел
    if (t > EV.an_name - 0.15) { const q = popK(t, EV.an_name - 0.15, 0.35); push(gx + 90, 1040, q); rect(-130, -32, 260, 64, { wash: '#2a1408', washA: 0.95, w: 3, col: C }); txt('ГРОЗНАЯ', 0, 2, 48, { col: '#ffd890', font: 'Osw' }); glow(0, 0, 200, 'rgba(255,200,110,1)', 0.5); pop(); }
    pop();
  }
  function word2(a, b, x, y, size, c1, c2) {                    // слово из двух цветных частей, по центру, без зазора
    ctx.save(); ctx.font = `600 ${size}px Osw`; const w1 = ctx.measureText(a).width, w2 = ctx.measureText(b).width; ctx.restore(); const x0 = x - (w1 + w2) / 2;
    txt(a, x0 + w1 / 2, y, size, { col: c1, font: 'Osw' }); txt(b, x0 + w1 + w2 / 2, y, size, { col: c2, font: 'Osw' }); }
  function near(t) {                                              // ближние детали вечера: торговец сладкой ватой, девочка с шаром, фотограф, туристы у парапета
    const L = '#14100c';
    push(1000, 1560, 0.9); rect(-70, -110, 140, 100, { wash: '#f2c8d8', washA: 1, w: 1.8, col: L }); txt('САХАРНАЯ', 0, -74, 16, { col: '#8a1a4a', font: 'Osw' }); txt('ВАТА', 0, -50, 22, { col: '#8a1a4a', font: 'Osw' }); for (const sd of [-1, 1]) ell(sd * 46, -4, 14, 14, { wash: '#2a2a2a', washA: 1, w: 1.4 }); for (let q = 0; q < 3; q++) ell(-30 + q * 30, -150, 22, 20, { wash: '#ffc8e0', washA: 1, w: 1.2, col: '#c86a9a' }); pop();
    human(1110, 1580, 0.6, t, { body: '#3a3a5a', legs: '#2a2a30', hat: 'cap', hatCol: '#f2f2f2', seed: 221, armR: 'hold', flip: -1 });
    human(620, 1590, 0.5, t, { body: '#e8708a', legs: '#2a2a40', hat: 'scarf', hatCol: '#f2e8f2', long: 1, seed: 222, armR: 'up' }); pencil([[655, 1440], [700, 1300]], { w: 1.4, col: '#2a2a2a', pass2: false }); ell(700, 1280, 30, 36, { wash: '#e8402a', washA: 1, w: 1.6, col: '#6a1a10' }); glow(690, 1270, 40, 'rgba(255,200,180,1)', 0.3);   // девочка с шаром
    human(780, 1600, 0.62, t, { body: '#2a2a2a', legs: '#1a1a1e', seed: 223, armR: 'up', armL: 'up', beard: 1 }); push(780, 1600, 0.62); rect(-30, -330, 60, 40, { wash: '#1a1a1a', washA: 1, w: 1.4 }); ell(0, -310, 12, 12, { wash: '#4a6a8a', washA: 1, w: 1 }); pop(); if (Math.sin(t * 3) > 0.9) glow(780, 1395, 80, 'rgba(255,255,255,1)', 0.8);   // фотограф со вспышкой
    for (let k = 0; k < 6; k++) ell(420 + k * 60, 1700 + (k % 2) * 16, 14, 6, { wash: '#2a1a0a', washA: 0.3, line: false });
  }
  function hud(t) {                                                // карточка «она → он»
    if (t < EV.an_she - 0.2) return; const k = popK(t, EV.an_she - 0.2, 0.4), sw = sm(clamp((t - EV.an_she - 0.25) / 0.4)); push(690, 900, 0.95 * k, -0.03); const L = '#1a120a';
    rect(-230, -150, 460, 300, { wash: '#f2e6c8', washA: 0.97, w: 2.6, col: L });
    txt('КРЕПОСТЬ', 0, -110, 30, { col: '#5a3a1a', font: 'Osw' }); word2('ГРОЗН', 'АЯ', 0, -48, 64, '#1a120a', '#c8262a'); txt('1818', 0, 2, 28, { col: '#5a3a1a', font: 'Osw' });
    pencil([[0, 26], [0, 50]], { w: 4, col: L, pass2: false }); poly([[-10, 48], [10, 48], [0, 60]], { wash: L, washA: 1, w: 1 });
    ctx.save(); ctx.globalAlpha = sw; txt('ГОРОД', 0, 76, 26, { col: '#5a3a1a', font: 'Osw' }); word2('ГРОЗН', 'ЫЙ', 0, 116, 54, '#1a120a', '#2a6a3a'); txt('1870', 160, 76, 22, { col: '#5a3a1a', font: 'Osw' }); ctx.restore(); pop();
  }

  WORLD.answer = (t, u, cat) => {
    lay(40, () => GQ.sky(t));
    lay(26, () => GQ.mount(t));
    lay(12, () => GQ.city(t));
    lay(6, () => { GQ.bridge(t); GQ.river(t); ghostFort(t); });
    lay(1, () => { GQ.embank(t); near(t); cat(); });
    lay(0.62, () => { pencil(spline([[-120, 300], [60, 380], [200, 360], [300, 420]], false, 10), { w: 22, col: '#2a1e14', pass2: false }); for (let k = 0; k < 9; k++) { const x = -60 + k * 44, y = 330 + Math.sin(k) * 50 + Math.sin(t * 1.5 + k) * 6; blob([[x, y], [x + 30, y - 34], [x + 64, y - 6], [x + 50, y + 34], [x + 10, y + 30]], { wash: k % 2 ? '#2a3a1e' : '#3a4a24', washA: 0.95, w: 1.4, col: '#0e0a06', a: 0.6 }); } pencil([[1250, 2100], [1230, 760]], { w: 30, col: '#1e1e24', pass2: false }); });
    motes(40, [-200, 200, 1300, 1500], '#ffd8a0', t, 20263, { sp: -20, vx: 12, sz: 2.8, a: 0.6, add: 1, wob: 18 });
    haze('#e8a06a', 0.05);
  };
  DIR.answer = {
    outfit: 'hoodieG', light: { side: 1, rim: '#ffc88a' }, grade: ['#8a5030', 0.12], hud,
    act: () => [[S0.answer, 'smug'], [EV.answer, 'proud'], [EV.an_name, 'grin'], [EV.an_she, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 300, y: 1500, s: 1.05, look: t < EV.an_she ? [0.7, -0.3] : [0.1, 0.05], point: t > EV.answer && t < EV.an_she ? 1 : undefined, hand: t > EV.answer && t < EV.an_she ? [210, -300] : undefined, tailUp: t > EV.an_she }),
    cam: () => [[S0.answer, 560, 1060, 0.12], [EV.answer, 600, 1040, 0.06], [EV.an_she, 560, 1060, 0.12], [S1.answer, 520, 1100, 0.18]]
  };
  TRANS_IN.answer = { a: 0.15, b: 0.3, fx(k, t, A, B) {            // янтарная LED-полоса башни прокатывается сверху вниз и меняет день на вечер
    const y = lerp(-100, 2100, sm(k)); drawBuf(B); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(0, y, W, H); ctx.clip(); drawBuf(A); ctx.restore();
    scr(() => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.85; ctx.fillStyle = '#ffb84a'; ctx.fillRect(0, y - 26, W, 52); ctx.restore(); glow(540, y, 600, 'rgba(255,184,74,1)', 0.5); });
  } };
})();
