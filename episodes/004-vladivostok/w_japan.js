/* 004 — сцена `japan`: 1990-е, порт на закате. Сухогруз из Японии, кран опускает машину в сетке, на причале ряды «японок» с ценами
   на стёклах, ларьки, неон, мужики в кожанках. Крупно — машина в разрезе: руль СПРАВА, Том за рулём справа. На «справа» — большая
   стрелка и обводка руля. Переход В сцену — вагончик фуникулёра проносится сквозь кадр по диагонали. */
(() => {
  EV.jp_ship = wt('s8', 'Японии.');             // кран опускает машину
  EV.jp_right = wt('s8', 'справа');             // стрелка к рулю
  EV.jp_all = wt('s8', 'всех!');                // все машины мигают фарами
  KEYW.push('Японии.', 'справа', 'всех!');
  SHAKES.push([EV.jp_ship + 0.35, 0.2, 6]);
  const CC = ['#e8e4dc', '#2a2a30', '#a8241e', '#c8ccd0', '#2a4a7a', '#e8c040', '#3a6a4a', '#8a8a92'];

  function sky(t) { vgrad(-900, 1300, ['#2a2050', '#6a3a6a', '#e8706a', '#f8b878'], 1); glow(300, 980, 300, 'rgba(255,170,100,1)', 0.6); ell(300, 980, 80, 80, { wash: '#ffd8a0', washA: 0.9, line: false }); }
  function port(t) {
    sopki(1000, '#3a3050', 3.1, 180, 1); cityBlocks(-300, 1400, 980, 97, ['#4a3a5a', '#3a3050', '#5a4a6a'], t, 1, 140);
    rect(-400, 1000, 1900, 150, { wash: '#4a3a6a', washA: 1, line: false }); for (let i = 0; i < 22; i++) pencil([[((i * 137 + t * 15) % 1700) - 200, 1010 + (i % 6) * 22], [((i * 137 + t * 15) % 1700) - 150, 1010 + (i % 6) * 22]], { w: 2, col: '#f8a878', a: 0.6, pass2: false });
    push(760, 1080, 0.9); poly([[-420, 0], [-400, -110], [420, -110], [460, 0]], { wash: '#2a3a5a', washA: 1, w: 2.4, col: '#0a0e18' }); rect(-400, -110, 820, 20, { wash: '#a8241e', washA: 1, line: false }); rect(240, -280, 160, 170, { wash: '#f0ece0', washA: 1, w: 2 }); for (let q = 0; q < 4; q++) rect(254 + q * 36, -260, 24, 18, { wash: '#ffd890', washA: 1, line: false });
    txt('MARU', -260, -50, 40, { font: 'Osw', col: '#f0ece0' }); for (let q = 0; q < 4; q++) { push(-300 + q * 130, -110, 0.42); car(0, 0, CC[q + 2], t, false); pop(); } pop();
    // кран и машина в сетке
    push(420, 1150, 1); pencil([[0, 0], [0, -620]], { w: 18, col: '#e8a030', pass2: false }); for (let y = -600; y < 0; y += 60) pencil([[-14, y], [14, y + 60]], { w: 3, col: '#e8a030', pass2: false }); pencil([[0, -620], [420, -560]], { w: 14, col: '#e8a030', pass2: false }); rect(-40, -660, 80, 60, { wash: '#e8a030', washA: 1, w: 2 });
    const dy = lerp(-300, -70, sm((t - EV.jp_ship + 0.2) / 0.6)); pencil([[400, -560], [400, dy - 60]], { w: 2.4, col: '#1a1a1a', pass2: false }); push(400, dy, 0.45, Math.sin(t * 2) * 0.05); car(0, 0, '#e8e4dc', t, false); for (let q = -3; q <= 3; q++) pencil([[q * 40, -60], [0, -130]], { w: 1.6, col: '#3a3a3a', pass2: false }); pop(); pop();
  }
  function car(x, y, c, t, lights) {                                // «японка»-седан в профиль
    push(x, y, 1); const b = blob([[-210, 0], [-220, -50], [-150, -64], [-90, -120], [90, -120], [150, -66], [220, -56], [224, 0]], { wash: c, washA: 1, w: 2.4, col: '#0e0e14' }); shadeG(b.path, 0, -120, 0, 0, '#ffffff', 0.25);
    poly([[-80, -112], [-20, -112], [-20, -68], [-130, -66]], { wash: '#8ab4d8', washA: 1, w: 1.6, col: '#0e0e14' }); poly([[-6, -112], [80, -112], [130, -68], [-6, -68]], { wash: '#8ab4d8', washA: 1, w: 1.6, col: '#0e0e14' });
    for (const wx of [-130, 140]) { ell(wx, 0, 40, 40, { wash: '#1a1a1a', washA: 1, w: 2 }); ell(wx, 0, 18, 18, { wash: '#b8bcc0', washA: 1, w: 1.4 }); }
    ell(214, -36, 12, 8, { wash: '#fff8d0', washA: 1, w: 1.2 }); ell(-212, -34, 10, 8, { wash: '#c8241e', washA: 1, w: 1.2 }); if (lights) { glow(230, -36, 120, 'rgba(255,248,200,1)', 0.8 * lights); glow(-220, -34, 60, 'rgba(255,60,40,1)', 0.6 * lights); }
    pop();
  }
  function lot(t, blink) {                                          // ряды машин с ценами
    for (let row = 0; row < 2; row++) for (let i = 0; i < 7; i++) { const x = -200 + i * 230 + row * 115, y = 1330 + row * 120, s = 0.5 + row * 0.1, c = CC[(i * 3 + row) % CC.length];
      push(x, y, s, 0, i % 2 ? 1 : -1); car(0, 0, c, t, blink * (Math.sin(t * 12 + i) > 0 ? 1 : 0.2)); pop(); push(x, y - 74 * s, s); txt(['ДЁШЕВО', '$ 2000', 'ТОРГ', '$ 3500', 'КАК НОВАЯ', '$ 1800', 'СРОЧНО'][(i + row * 3) % 7], 0, 0, 32, { font: 'Hand', col: '#f8f0a0' }); pop(); }
    for (const [x, s_, c] of [[-120, 'ЗАПЧАСТИ', '#ff4a8a'], [1120, 'АВТО ИЗ ЯПОНИИ', '#4ae8ff']]) { push(x, 1200, 1); rect(-150, -60, 300, 70, { wash: '#1a1428', washA: 1, w: 2 }); txt(s_, 0, -24, 34, { font: 'Osw', col: c }); glow(0, -24, 160, c, 0.3 + 0.1 * Math.sin(t * 9)); pop(); }
  }
  function carBack(t) {                                             // крупно, вид сзади: салон, правое кресло водителя, руль справа
    push(560, 1800, 1);
    const roof = blob([[-470, -260], [-380, -470], [380, -470], [470, -260]], { wash: '#e8e4dc', washA: 1, w: 3, col: '#0e0e14' });
    poly([[-400, -270], [-330, -440], [330, -440], [400, -270]], { wash: '#2a2a38', washA: 1, w: 2, col: '#0e0e14' });                       // салон
    for (const sx of [-1, 1]) { blob([[sx * 200 - 90, -270], [sx * 200 - 80, -380], [sx * 200 + 80, -380], [sx * 200 + 90, -270]], { wash: '#5a4a6a', washA: 1, w: 2, col: '#1a1428' }); }
    pop();
  }
  function carBackFront(t, blink) {                                 // багажник, фонари, номер, бампер, стекло — поверх Тома
    push(560, 1800, 1);
    poly([[-400, -270], [-330, -440], [330, -440], [400, -270]], { wash: '#bfe0f0', washA: 0.18, w: 6, col: '#0e0e14' }); pencil([[-250, -420], [-200, -300]], { w: 6, col: '#ffffff', a: 0.4, pass2: false });
    const b = blob([[-520, -270], [520, -270], [540, -120], [530, 0], [-530, 0], [-540, -120]], { wash: '#e8e4dc', washA: 1, w: 3, col: '#0e0e14', key: 9981 }); shadeG(b.path, 0, -270, 0, 0, '#9a968e', 0.4);
    for (const sx of [-1, 1]) { rect(sx * 390 - 90, -220, 180, 70, { wash: '#c8241e', washA: 1, w: 2, col: '#3a0a0a' }); if (blink) glow(sx * 390, -185, 160, 'rgba(255,60,40,1)', 0.7 * blink); }
    rect(-130, -130, 260, 66, { wash: '#f4f4f0', washA: 1, w: 2.4, col: '#1a1a1a' }); txt('А 777 АА', -20, -96, 34, { font: 'Osw', col: '#1a1a1a' }); txt('25', 96, -104, 22, { font: 'Osw', col: '#1a1a1a' }); txt('RUS', 96, -80, 14, { font: 'Osw', col: '#1a1a1a' });
    rect(-560, -40, 1120, 50, { wash: '#3a3a42', washA: 1, w: 2, col: '#0e0e14' }); for (const sx of [-1, 1]) rect(sx * 420 - 70, 0, 140, 90, { wash: '#1a1a1a', washA: 1, w: 2 });
    pop();
  }
  function wheelFX(t) { push(860, 1450, 1); pencil(ellPts(0, 0, 70, 70, 0, 0, 40), { w: 14, col: '#1a1a1a', pass2: false }); pencil([[-70, 0], [70, 0]], { w: 10, col: '#1a1a1a', pass2: false }); pencil([[0, 0], [0, 70]], { w: 10, col: '#1a1a1a', pass2: false }); ell(0, 0, 18, 18, { wash: '#3a3a3a', washA: 1 }); pop(); }
  function wheelRing(t) { if (t > EV.jp_right - 0.05) { const k = popK(t, EV.jp_right, 0.35); push(860, 1450, k); pencil(ellPts(0, 0, 110, 110, 0, 0.1, 50), { w: 10, col: K.amber, pass2: false }); pop(); } }

  WORLD.japan = (t, u, cat) => {
    const blink = t > EV.jp_all ? 1 : 0;
    lay(40, () => sky(t));
    lay(10, () => port(t));
    lay(2.2, () => { const g = poly([[-600, 1250], [1700, 1250], [1700, 2600], [-600, 2600]], { wash: '#5a5068', washA: 1, w: 2, col: '#1a1428' }); for (let i = 0; i < 16; i++) glow(-200 + i * 100, 1300 + (i % 3) * 80, 60, 'rgba(255,170,120,1)', 0.12); lot(t, blink);
      human(1080, 1520, 0.9, t, { body: '#1a1a1a', legs: '#2a3a8a', boots: '#f0f0f0', hair: '#2a1a0a', hat: 'cap', hatCol: '#1a1a1a', face: t > EV.jp_right ? 'grin' : 'calm', look: -0.6, armL: 'hips', armR: t > EV.jp_right ? 'point' : 'hold', prop: 'phone', seed: 601, flip: -1 }); });
    lay(1, () => { carBack(t); wheelFX(t); cat(); carBackFront(t, blink * (Math.sin(t * 12) > 0 ? 1 : 0.3)); wheelRing(t); });
  };
  DIR.japan = {
    outfit: 'kozhanka', light: { side: -1, rim: '#ffb890' }, grade: ['#8a4a6a', 0.16],
    act: () => [[S0.japan, 'talk'], [EV.jp_ship - 0.03, 'smug'], [EV.jp_right - 0.03, 'sideeye'], [EV.jp_all, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 660, y: 1680, s: 0.72, look: t < EV.jp_right ? [-0.3, -0.1] : [0.4, 0.1], hand: [80, -260], handF: t > EV.jp_right && t < EV.jp_all ? [-170, -330] : [-60, -230], point: t > EV.jp_right && t < EV.jp_all ? 1 : undefined, tailUp: t > EV.jp_all }),
    cam: () => [[S0.japan, 540, 1180, 0.06], [EV.jp_ship, 520, 1120, 0.02], [EV.jp_right, 700, 1420, 0.24, 'x'], [EV.jp_all, 600, 1280, 0.06], [S1.japan, 600, 1260, 0.1]],
    hud: t => { if (t > EV.jp_right && t < EV.jp_all + 0.6) { const k = popK(t, EV.jp_right, 0.35); push(860, 700, k); ctx.save(); ctx.font = '600 120px Osw'; ctx.textAlign = 'center'; ctx.lineJoin = 'round'; ctx.lineWidth = 20; ctx.strokeStyle = 'rgba(12,8,6,0.94)'; ctx.strokeText('РУЛЬ →', 0, 0); ctx.fillStyle = K.amber; ctx.fillText('РУЛЬ →', 0, 0); ctx.restore(); pop(); } }
  };
  // ---------------------------------------------------------------- переход В japan: вагончик фуникулёра проносится сквозь кадр
  TRANS_IN.japan = { a: 0.2, b: 0.34, runA: 1, fx(k, t, A, B) {
    const q = sm(k), cx = lerp(1500, -400, q), cy = lerp(2300, -300, q), ang = Math.atan2(-2600, -1900);
    const edge = (sd) => { const nx = Math.cos(ang + Math.PI / 2), ny = Math.sin(ang + Math.PI / 2); return [cx + nx * 3000 * sd, cy + ny * 3000 * sd]; };
    drawBuf(A); scr(() => { ctx.save(); ctx.beginPath(); const [ax, ay] = edge(-1), [bx, by] = edge(1); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.lineTo(bx + 4000, by + 4000); ctx.lineTo(ax + 4000, ay + 4000); ctx.closePath(); ctx.clip(); ctx.drawImage(B, 0, 0); ctx.restore();
      push(cx, cy, 3.2, ang + Math.PI); const c = poly([[-200, 0], [200, -60], [200, -320], [-200, -260]], { wash: '#e8c040', washA: 1, w: 4, col: '#2a1a0a' }); rect(-160, -220, 120, 90, { wash: '#bfe0f0', washA: 1, w: 3 }); rect(20, -260, 120, 90, { wash: '#bfe0f0', washA: 1, w: 3 }); pencil([[-200, -60], [200, -120]], { w: 16, col: '#a8241e', pass2: false }); pop();
      for (let i = 0; i < 20; i++) { const r = rng(hsh(i, 9)), d = (r() - 0.5) * 800; pencil([[cx + d, cy + d * 0.7], [cx + d + 400, cy + d * 0.7 + 550]], { w: 3 + r() * 5, col: '#fff6e0', a: 0.6, pass2: false }); } });
  } };
})();
