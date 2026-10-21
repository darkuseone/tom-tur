/* 004 — сцена `brynner`: 1920, вечер, улица Алеутская. Каменный особняк в стиле модерн с эркером и башенкой, в окне — колыбель и «Уа!».
   Газовые фонари, извозчик, японский рикша, прохожие. На «Бриннер» над сопкой зажигаются голливудские прожекторы и буквы HOLLYWOOD,
   на «лысый король» — призрак афиши «Король и я» с лысым королём (руки скрещены), блик на макушке. Переход В сцену — кадр проявляется из сепии. */
(() => {
  EV.br_name = wt('s5', 'Бриннер');             // прожекторы + HOLLYWOOD
  EV.br_bald = wt('s5', 'лысый');               // афиша, блик на лысине
  EV.br_holly = wt('s5', 'Голливуда!');
  KEYW.push('Бриннер', 'лысый', 'Голливуда!');

  function sky(t, hk) { vgrad(-900, 1300, ['#1a1a3a', '#3a3060', '#8a5a7a', '#e8907a'], 1);
    const r = rng(11); ctx.save(); ctx.fillStyle = '#fff8e8'; for (let i = 0; i < 70; i++) { ctx.globalAlpha = 0.3 + 0.5 * Math.abs(Math.sin(t * 1.5 + i)); ctx.fillRect(r() * 1600 - 260, r() * 700 - 300, 2, 2); } ctx.restore();
    if (hk > 0) for (let i = 0; i < 4; i++) { const a = -Math.PI / 2 + Math.sin(t * 1.3 + i * 1.7) * 0.5; rays(240 + i * 220, 1000, a, 0.12, 1600, 'rgba(255,240,200,0.7)', 0.3 * hk, 2, 0); } }
  function hill(t, hk) { sopki(1040, '#2a2a48', 2.2, 260, 1);
    if (hk > 0) { const W_ = 'HOLLYWOOD'; for (let i = 0; i < 9; i++) { const k = clamp(hk * 9 - i), x = 560 + i * 74, y = 640 + Math.sin(i * 0.7) * 16; if (k <= 0) continue; push(x, y, 1, Math.sin(i) * 0.05);  txt(W_[i], 0, -20, 84 * (0.8 + 0.2 * k), { font: 'Osw', col: '#f8f4ec', a: k }); glow(0, -20, 50, 'rgba(255,240,210,1)', 0.25 * k); pop(); } } }
  function hill2(t, hk) { if (hk <= 0) return; const W_ = 'HOLLYWOOD'; for (let i = 0; i < 9; i++) { const k = clamp(hk * 9 - i), x = 600 + i * 70, y = 640 + Math.sin(i * 0.7) * 14; if (k <= 0) continue; push(x, y, 1, Math.sin(i) * 0.05); txt(W_[i], 0, -20, 84 * (0.8 + 0.2 * k), { font: 'Osw', col: '#f8f4ec', a: k }); glow(0, -20, 50, 'rgba(255,240,210,1)', 0.25 * k); pop(); } }
  function mansion(t) {                                             // особняк Бринеров: серый камень, эркер, башенка с шатром, окна
    push(380, 1360, 1); const S = '#9a9aa4', D = '#4a4a56';
    const m = rect(-360, -700, 720, 700, { wash: S, washA: 1, w: 2.6, col: '#1a1a24', key: 9960 }); shadeG(m.path, 360, 0, -100, 0, '#2a2a3a', 0.35); hatch(m.path, m.bb, { gap: 18, a: 0.12, col: D, ang: 0, key: 9961, w: 1 });
    rect(120, -820, 200, 820, { wash: '#a8a8b2', washA: 1, w: 2.4, col: '#1a1a24' }); poly([[100, -820], [220, -1000], [340, -820]], { wash: '#3a5a5a', washA: 1, w: 2.4, col: '#0e1a1a' }); pencil([[220, -1000], [220, -1060]], { w: 4, col: '#2a2a2a', pass2: false });
    for (let fl = 0; fl < 3; fl++) for (let q = 0; q < 4; q++) { const x = -320 + q * 110, y = -640 + fl * 200; if (fl === 1 && q === 1) continue; const lit = (q + fl) % 3 !== 0;
      const w_ = blob([[x, y + 120], [x, y + 20], [x + 30, y], [x + 60, y + 20], [x + 60, y + 120]], { wash: lit ? '#f8c868' : '#2a2a40', washA: 1, w: 2, col: '#1a1a24' }); if (lit) glow(x + 30, y + 60, 80, 'rgba(255,200,110,1)', 0.35); pencil([[x + 30, y + 10], [x + 30, y + 120]], { w: 1.6, col: '#3a2a1a', pass2: false }); }
    for (let fl = 0; fl < 3; fl++) { rect(160, -640 + fl * 200, 120, 130, { wash: fl === 1 ? '#ffd890' : '#f8c868', washA: 1, w: 2, col: '#1a1a24' }); glow(220, -575 + fl * 200, 90, 'rgba(255,200,110,1)', 0.35); }
    // окно с колыбелью
    const cx = -180, cy = -380; rect(cx - 70, cy - 70, 140, 150, { wash: '#ffe4a0', washA: 1, w: 3, col: '#1a1a24' }); glow(cx, cy, 160, 'rgba(255,214,140,1)', 0.6);
    const rk = Math.sin(t * 3) * 0.12; push(cx, cy + 50, 1, rk); blob([[-50, -20], [50, -20], [40, 20], [-40, 20]], { wash: '#6a4a2a', washA: 1, w: 2, col: '#2a1a0a' }); pencil([[-60, 30], [0, 40], [60, 30]], { w: 4, col: '#6a4a2a', pass2: false }); ell(-10, -30, 18, 16, { wash: '#f0d0b0', washA: 1, w: 1.6, col: '#2a1a0a' }); blob([[-40, -26], [30, -36], [44, -20], [-36, -14]], { wash: '#f4f0f8', washA: 1, w: 1.4 }); pop();
    if (t > S0.brynner + 0.3 && t < EV.br_bald) { const k = popK(t, S0.brynner + 0.3, 0.3); txt('Уа!', cx + 120, cy - 110, 84 * k, { font: 'Hand', col: '#fff4d8', rot: -0.1 }); }
    rect(-380, -720, 760, 30, { wash: '#7a7a86', washA: 1, w: 2, col: '#1a1a24' }); for (let q = 0; q < 16; q++) rect(-370 + q * 48, -760, 20, 40, { wash: '#7a7a86', washA: 1, w: 1.4 });
    rect(-80, -200, 120, 200, { wash: '#3a2414', washA: 1, w: 2.4, col: '#1a0a04' }); ell(-20, -210, 60, 24, { wash: '#8a8a96', washA: 1, w: 2 }); txt('Алеутская ул.', -260, -120, 30, { font: 'Hand', col: '#1a1a24' });
    pop();
  }
  function poster(t) {                                              // призрак афиши «Король и я»: лысый король со скрещёнными руками
    const k = sm((t - EV.br_bald + 0.1) / 0.35); if (k <= 0) return; ctx.save(); ctx.globalAlpha = 0.9 * k; push(880, 1010, 0.78 + 0.04 * k, 0.05);
    const p = rect(-190, -300, 380, 560, { wash: '#2a1a3a', washA: 1, w: 4, col: '#e8c46a' }); glow(0, -60, 260, 'rgba(255,200,120,1)', 0.35);
    blob([[-120, 200], [-130, 40], [-80, -40], [80, -40], [130, 40], [120, 200]], { wash: '#c8962a', washA: 1, w: 2.4, col: '#2a1a0a' });   // плечи в золоте
    for (const sd of [-1, 1]) shape(tubeP([[sd * 100, 20], [-sd * 30, 70], [-sd * 90, 40]], 50, 40), { wash: '#d8a878', washA: 1, w: 2, col: '#2a1a0a' });
    const hd = ell(0, -110, 70, 84, { wash: '#d8a878', washA: 1, w: 2.4, col: '#2a1a0a' }); shadeG(hd.path, 60, 0, -20, 0, '#8a5a3a', 0.4);
    for (const ex of [-26, 26]) { pencil([[ex - 14, -124], [ex + 14, -118]], { w: 4, col: '#1a0a04', pass2: false }); ell(ex, -110, 6, 5, { wash: '#1a0a04', washA: 1, line: false }); }
    pencil([[-20, -60], [20, -62]], { w: 3, col: '#5a2a1a', pass2: false }); pencil([[-30, -140], [-10, -134]], { w: 3, col: '#1a0a04', pass2: false });
    const sh = t > EV.br_bald ? Math.max(0, 1 - Math.abs(t - EV.br_bald - 0.25) / 0.2) : 0; glow(-20, -180, 60 + 80 * sh, 'rgba(255,255,255,1)', 0.5 + sh); if (sh > 0) rays(-20, -180, 0, 6.28, 140, 'rgba(255,255,255,0.9)', sh, 8, t);
    rect(-190, 200, 380, 60, { wash: '#1a0e1a', washA: 1, line: false }); txt('КОРОЛЬ И Я', 0, 230, 52, { font: 'Osw', col: '#e8c46a' }); txt('1956 · «ОСКАР»', 0, -260, 30, { font: 'Osw', col: '#f8f0d8' });
    pop(); ctx.restore();
  }
  function street(t) {                                              // мостовая, газовые фонари, извозчик, прохожие
    const g = poly([[-600, 1360], [1700, 1360], [1700, 2600], [-600, 2600]], { wash: '#5a5060', washA: 1, w: 2, col: '#1a1a24', key: 9970 });
    for (let y = 1380; y < 2400; y += 40 + (y - 1360) * 0.05) pencil([[-600, y], [1700, y]], { w: 1.4, col: '#3a3044', a: 0.6, pass2: false });
    for (let i = 0; i < 20; i++) { const r = rng(9975 + i); glow(-200 + r() * 1500, 1400 + r() * 600, 60, 'rgba(255,190,110,1)', 0.12); }
    for (const x of [-60, 820]) { pencil([[x, 1380], [x, 900]], { w: 10, col: '#1a1a20', pass2: false }); poly([[x - 26, 900], [x + 26, 900], [x + 18, 840], [x - 18, 840]], { wash: '#ffd890', washA: 1, w: 2, col: '#1a1a20' }); glow(x, 870, 220 * flick(t, x), 'rgba(255,200,110,1)', 0.55); }
    human(1000, 1440, 0.8, t, { body: '#2a2a3a', legs: '#1a1a1a', hair: '#2a1a0a', hat: 'cap', hatCol: '#1a1a2a', face: t > EV.br_name ? 'shock' : 'calm', look: -0.7, armL: t > EV.br_name ? 'point' : 'down', seed: 301, flip: -1 });
    human(940, 1450, 0.78, t, { body: '#7a3a4a', long: 1, hair: '#6a3a1a', hat: 'scarf', hatCol: '#e8d8c8', face: t > EV.br_holly ? 'smile' : 'calm', look: -0.6, armR: 'hold', seed: 302, flip: -1 });
  }

  WORLD.brynner = (t, u, cat) => {
    const hk = sm((t - EV.br_name) / 0.5);
    lay(40, () => sky(t, hk));
    lay(16, () => hill(t, 0));
    lay(12, () => hill2(t, hk));
    lay(8, () => poster(t));
    lay(2.6, () => mansion(t));
    lay(1, () => { street(t); cat(); });
    lay(0.6, () => motes(30, [-200, 600, 1300, 2000], '#ffd8a0', t, 91, { sp: -8, sz: 2.2, a: 0.5, tw: 1, add: 1 }));
  };
  DIR.brynner = {
    outfit: 'kingsiam', light: { side: -1, rim: '#ffc890' }, grade: ['#6a3a6a', 0.18],
    act: () => [[S0.brynner, 'talk'], [EV.br_name - 0.03, 'awe'], [EV.br_bald - 0.03, 'laugh'], [EV.br_holly, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 600, y: 1600, s: 1.1, look: t < EV.br_name ? [-0.6, -0.3] : t < EV.br_holly ? [0.6, -0.4] : [0, 0.1],
      hand: t > EV.br_holly ? [40, -200] : t > EV.br_name && t < EV.br_bald ? [130, -360] : undefined, handF: t > EV.br_holly ? [-40, -200] : undefined, point: t > EV.br_name && t < EV.br_bald ? 1 : undefined,
      tilt: t > EV.br_bald && t < EV.br_holly ? 0.08 : 0, tailUp: t > EV.br_name }),
    cam: () => [[S0.brynner, 400, 1080, 0.12], [EV.br_name, 560, 1000, 0.0, 'x'], [EV.br_bald, 700, 1000, 0.06], [S1.brynner, 640, 1040, 0.1]]
  };
  // ---------------------------------------------------------------- переход В brynner: вспышка магния → кадр проявляется из сепии
  TRANS_IN.brynner = { a: 0.12, b: 0.5, runA: 1, fx(k, t, A, B) {
    if (k < 0.2) { drawBuf(A); whiteOut(sm(k / 0.2)); return; }
    const q = sm((k - 0.2) / 0.8); scr(() => { ctx.save(); ctx.filter = `sepia(${1 - q}) contrast(${1.3 - 0.3 * q}) brightness(${1.6 - 0.6 * q})`; ctx.drawImage(B, 0, 0); ctx.restore(); });
    whiteOut(1 - sm((k - 0.2) / 0.35));
  } };
})();
