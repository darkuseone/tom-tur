/* 019 — сцена `kremlin`: 1950, ночь, Кремль. Кабинет: дубовые панели, высокое окно со Спасской башней и рубиновой звездой под снегом,
   зелёная лампа, постановление № 815 «СОВ. СЕКРЕТНО» с чёрными плашками, карта Сибири с Енисеем. Пустое кресло и трубка в пепельнице —
   Сталина не рисуем. На «гора» красный карандаш обводит гору на карте, на «реки» загорается Енисей, на «бомбы» по окну ползут тени
   бомбардировщиков и прожектора. Переход В сцену — штамп «СОВ. СЕКРЕТНО» бьёт в камеру. */
(() => {
  EV.kr_st = wtk('s1', 'Сталину');
  EV.kr_gora = wtk('s1', 'гора');
  EV.kr_reka = wtk('s1', 'реки.');
  EV.kr_bomb = wtk('s1', 'бомбы');
  SHAKES.push([S0.kremlin + 0.02, 0.3, 10], [EV.kr_bomb, 0.35, 5]);
  KEYW.push('гора', 'бомбы');
  const L = '#140c06';

  function windowView(t) {                                        // за окном: Красная площадь ночью, Спасская, снег, прожектора, тени самолётов
    vgrad(-900, 1300, ['#060814', '#141c3a', '#2a3460', '#4a4a6e'], 1);
    const r = rng(19101); for (let i = 0; i < 70; i++) { ctx.fillStyle = '#e8ecff'; ctx.globalAlpha = 0.5 + 0.4 * Math.sin(t * 2 + i); ctx.fillRect(r() * 1400 - 150, r() * 700 - 300, 2, 2); } ctx.globalAlpha = 1;
    for (let k = 0; k < 7; k++) { const x = 160 + k * 120; sil([[x, 1240], [x, 1050 - (k % 3) * 30], [x + 20, 1030 - (k % 3) * 30], [x + 40, 1050 - (k % 3) * 30], [x + 40, 1240]], '#1a1e34', 1); }   // зубцы стены
    sil([[0, 1240], [0, 1080], [1100, 1080], [1100, 1240]], '#1c2038', 1); for (let x = 0; x < 1100; x += 40) sil([[x, 1080], [x + 6, 1050], [x + 18, 1062], [x + 30, 1050], [x + 36, 1080]], '#1c2038', 1);
    push(700, 1080, 1);                                            // Спасская башня
    const b1 = rect(-90, -330, 180, 330, { wash: '#6a2420', washA: 1, w: 2, col: L }); hatch(b1.path, b1.bb, { gap: 6, a: 0.25, col: '#2a0a08', ang: 0, w: 1 });
    rect(-28, -120, 56, 120, { wash: '#2a1a14', washA: 1, w: 1.8, col: L }); const ar = []; for (let k = 0; k <= 10; k++) ar.push([-28 + 56 * k / 10, -120 - Math.sin(k / 10 * Math.PI) * 26]); pencil(ar, { w: 2, col: L, pass2: false });
    rect(-70, -470, 140, 140, { wash: '#7a2a24', washA: 1, w: 2, col: L }); ell(0, -400, 52, 52, { wash: '#efe0b0', washA: 1, w: 2.4, col: L }); glow(0, -400, 90, 'rgba(255,230,160,1)', 0.5);
    for (let q = 0; q < 12; q++) { const a = q / 12 * 6.283; pencil([[Math.cos(a) * 44, -400 + Math.sin(a) * 44], [Math.cos(a) * 50, -400 + Math.sin(a) * 50]], { w: 2, col: L, pass2: false }); }
    pencil([[0, -400], [0, -432]], { w: 3, col: L, pass2: false }); pencil([[0, -400], [22, -392]], { w: 3, col: L, pass2: false });
    rect(-50, -560, 100, 90, { wash: '#6a2420', washA: 1, w: 2, col: L }); poly([[-60, -560], [0, -760], [60, -560]], { wash: '#2a5a3a', washA: 1, w: 2.2, col: L });
    for (const sd of [-1, 1]) poly([[sd * 70, -470], [sd * 92, -520], [sd * 104, -470]], { wash: '#c8a040', washA: 1, w: 1.4, col: L });
    push(0, -800, 1); const st = poly([[0, -46], [12, -14], [46, -14], [18, 6], [28, 40], [0, 20], [-28, 40], [-18, 6], [-46, -14], [-12, -14]], { wash: '#d0201a', washA: 1, w: 2.2, col: '#4a0806' }); glow(0, 0, 160, 'rgba(255,40,30,1)', 0.75); pop();
    pencil([[-60, -566], [0, -764], [60, -566]], { w: 8, col: '#eef2fa', a: 0.7, pass2: false });
    pop();
    for (let k = 0; k < 12; k++) { const x = 60 + k * 90 + Math.sin(t + k) * 4; sil([[x - 8, 1240], [x - 9, 1200], [x, 1190], [x + 9, 1200], [x + 8, 1240]], '#0e1020', 0.9); }   // часовые и прохожие у стены
    const bk = sm((t - EV.kr_bomb + 0.1) / 0.5); if (bk > 0) {        // тени бомбардировщиков и лучи ПВО
      for (const [dx, dy] of [[0, 0], [180, 60], [-160, 80]]) { const x = lerp(1300, -300, clamp((t - EV.kr_bomb) / 2.2)) + dx, y = 260 + dy; push(x, y, 0.9); sil([[-120, 0], [120, -6], [140, 0], [120, 6], [-120, 4]], '#05060c', 0.85 * bk); sil([[-10, -4], [40, -110], [70, -110], [40, 0]], '#05060c', 0.85 * bk); sil([[-10, 4], [40, 110], [70, 110], [40, 0]], '#05060c', 0.85 * bk); sil([[-120, 0], [-150, -40], [-130, 0]], '#05060c', 0.85 * bk); pop(); }
      beam(200, 1240, -1.2 + Math.sin(t * 1.4) * 0.3, 1600, 0.45 * bk); beam(1000, 1240, -1.9 + Math.sin(t * 1.1) * 0.3, 1600, 0.45 * bk); }
    const sq = rect(-300, 1240, 1700, 900, { wash: '#c8d0e0', washA: 1, w: 0, line: false }); shadeG(sq.path, 0, 1240, 0, 1500, '#6a7490', 0.5);
    motes(40, [0, -300, 1100, 1500], '#eef2fa', t, 19102, { sp: 40, vx: -10, sz: 2.4, a: 0.8 });
  }
  function room(t) {                                               // стены, окно с тяжёлыми шторами, карта, портрет-пятно, дверь
    const wall = rect(-500, -900, 2100, 2500, { wash: '#4a2e1a', washA: 1, w: 0, line: false }); shadeG(wall.path, 540, 300, 540, 1500, '#1a0e06', 0.55);
    for (let x = -480; x < 1600; x += 170) { const p = rect(x, 200, 150, 900, { wash: '#5a3a22', washA: 1, w: 2, col: L }); hatch(p.path, p.bb, { gap: 7, a: 0.2, col: '#2a1408', ang: 1.5, w: 1 }); rect(x + 18, 230, 114, 380, { wash: 'rgba(0,0,0,0)', washA: 0, w: 1.6, col: '#2a1408' }); rect(x + 18, 650, 114, 420, { wash: 'rgba(0,0,0,0)', washA: 0, w: 1.6, col: '#2a1408' }); }
    pencil([[-500, 1100], [1600, 1100]], { w: 10, col: '#2a1408', pass2: false });
    ctx.save(); ctx.beginPath(); ctx.rect(520, 280, 520, 900); ctx.clip(); push(530, 650, 0.42); windowView(t); pop(); ctx.restore();   // окно
    rect(520, 280, 520, 900, { wash: 'rgba(0,0,0,0)', washA: 0, w: 12, col: '#2a1408' }); pencil([[780, 280], [780, 1180]], { w: 10, col: '#2a1408', pass2: false }); pencil([[520, 700], [1040, 700]], { w: 10, col: '#2a1408', pass2: false });
    for (const sd of [-1, 1]) { const x0 = sd < 0 ? 440 : 1040; const P = [[x0, 220], [x0 + sd * 120, 220], [x0 + sd * 150, 1200], [x0 + sd * 20, 1200]]; const c = shape(P.concat([P[0]]), { wash: '#6a1a18', washA: 1, w: 2.2, col: L }); for (let k = 1; k < 5; k++) pencil([[x0 + sd * k * 26, 230], [x0 + sd * k * 32, 1190]], { w: 3, col: '#3a0a08', a: 0.6, pass2: false }); shadeG(c.path, x0, 0, x0 + sd * 150, 0, '#1a0404', 0.4); }
    rect(400, 200, 760, 40, { wash: '#3a2410', washA: 1, w: 2, col: L });
    // карта Сибири
    push(250, 850, 1, -0.01); const mp = rect(-240, -240, 480, 360, { wash: '#e8dcb8', washA: 1, w: 3, col: L }); shadeG(mp.path, -240, 0, 240, 0, '#a89a70', 0.3);
    blob([[-220, -140], [-120, -200], [40, -210], [200, -170], [220, -40], [180, 90], [40, 100], [-120, 80], [-210, 20]], { wash: '#cfe0b8', washA: 1, w: 1.6, col: '#5a6a3a' });
    const yen = [[20, -205], [10, -150], [26, -90], [6, -30], [18, 30], [4, 96]]; pencil(yen, { w: 4, col: '#2a5a9a', pass2: false }); if (t > EV.kr_reka) { pencil(yen, { w: 9, col: '#6ab0ff', a: 0.6 * sm((t - EV.kr_reka) / 0.3), pass2: false }); glow(14, -60, 120, 'rgba(110,180,255,1)', 0.4); }
    pencil([[-140, -120], [-100, -40], [-130, 40]], { w: 3, col: '#2a5a9a', a: 0.7, pass2: false }); pencil([[120, -160], [150, -60], [130, 60]], { w: 3, col: '#2a5a9a', a: 0.7, pass2: false });
    txt('ЕНИСЕЙ', 70, -120, 22, { col: '#1a3a6a', font: 'Osw', rot: -1.4 }); ell(12, 20, 6, 6, { wash: '#1a1a1a', washA: 1, line: false }); txt('Красноярск', -48, 22, 18, { col: '#1a1a1a' });
    for (let k = 0; k < 3; k++) poly([[30 + k * 18, 6], [40 + k * 18, -14], [50 + k * 18, 6]], { wash: '#8a6a3a', washA: 1, w: 1.2, col: L });
    if (t > EV.kr_gora) { const k = sm((t - EV.kr_gora) / 0.5), P = ellPts(56, -2, 46, 30, 0.2, 0.15, 30); pencil(P.slice(0, Math.max(2, Math.floor(P.length * k))), { w: 5, col: '#c81e16', pass2: false }); if (k > 0.9) txt('?', 120, -40, 44, { col: '#c81e16', font: 'Hand' }); }
    txt('СИБИРЬ', -120, -170, 30, { col: '#3a2a10', font: 'Osw' }); pop();
    // дверь и люди у двери
    push(1270, 1100, 1); rect(-150, -620, 300, 620, { wash: '#3a2212', washA: 1, w: 2.4, col: L }); rect(-120, -580, 110, 250, { wash: '#4a2c18', washA: 1, w: 1.6, col: L }); rect(10, -580, 110, 250, { wash: '#4a2c18', washA: 1, w: 1.6, col: L }); pop();
  }
  function people(t) {
    human(1000, 1180, 0.6, t, { body: '#3a4a3a', legs: '#2a2a2a', hat: 'police', hatCol: '#3a4a3a', armL: 'hold', armR: 'down', face: 'calm', seed: 54, flip: -1 });
    human(560, 1180, 0.6, t, { body: '#4a4440', legs: '#2a2a2a', hair: '#6a4a2a', armR: 'hold', prop: 'scroll', face: t > EV.kr_bomb ? 'shock' : 'calm', seed: 55 });
    human(1190, 1120, 0.62, t, { body: '#3a4a3a', legs: '#2a2a2a', hat: 'police', hatCol: '#3a4a3a', armR: 'hold', face: 'calm', seed: 51, flip: -1 });
    human(1330, 1120, 0.62, t, { body: '#2a2c30', legs: '#1a1a1a', hair: '#2a1a10', armR: 'hold', prop: 'scroll', face: t > EV.kr_bomb ? 'shock' : 'calm', seed: 52, flip: -1 });
    human(-40, 1140, 0.66, t, { body: '#3a4a3a', legs: '#2a2a2a', hat: 'police', hatCol: '#3a4a3a', armR: 'hips', face: 'angry', seed: 53 });
  }
  function desk(t) {                                               // письменный стол: сукно, лампа, постановление, телефоны, трубка, чай
    const top = shape([[300, 1300], [1300, 1300], [1380, 1400], [240, 1400]], { wash: '#2a5a3a', washA: 1, w: 2.4, col: L }); hatch(top.path, top.bb, { gap: 5, a: 0.15, col: '#0a2010', ang: 0.1, w: 1 });
    const fr = rect(240, 1400, 1140, 160, { wash: '#4a2a16', washA: 1, w: 2.4, col: L }); hatch(fr.path, fr.bb, { gap: 6, a: 0.3, col: '#1a0a04', ang: 1.57, w: 1 }); for (let k = 0; k < 3; k++) rect(300 + k * 380, 1430, 300, 90, { wash: 'rgba(0,0,0,0)', washA: 0, w: 1.8, col: '#1a0a04' });
    push(1150, 1310, 1); pencil([[0, 0], [0, -150]], { w: 7, col: '#c8a040', pass2: false }); ell(0, 0, 40, 10, { wash: '#c8a040', washA: 1, w: 1.6, col: L }); blob([[-80, -150], [-60, -200], [60, -200], [80, -150]], { wash: '#1e6a3a', washA: 1, w: 2, col: L }); glow(0, -130, 260, 'rgba(255,230,160,1)', 0.65); pop();
    // постановление
    push(720, 1330, 1, -0.04); const pp = rect(-170, -60, 340, 110, { wash: '#f2ead2', washA: 1, w: 2, col: L }); txt('СОВ. СЕКРЕТНО', 80, -42, 18, { col: '#b8322a', font: 'Osw' }); txt('ПОСТАНОВЛЕНИЕ № 815', -40, -16, 20, { col: '#1a1a1a', font: 'Osw' });
    rect(-140, 6, 120, 16, { wash: '#0a0a0a', washA: 1, line: false }); txt('— под горой', 40, 14, 18, { col: '#1a1a1a' }); rect(-150, 30, 90, 12, { wash: '#0a0a0a', washA: 1, line: false }); rect(-50, 30, 140, 12, { wash: '#0a0a0a', washA: 1, line: false }); pop();
    push(980, 1330, 1); for (let k = 0; k < 3; k++) { ell(k * 70, 0, 30, 12, { wash: ['#1a1a1a', '#e8e0d0', '#7a1a14'][k], washA: 1, w: 1.6, col: L }); blob([[k * 70 - 26, -12], [k * 70 - 20, -40], [k * 70 + 20, -40], [k * 70 + 26, -12]], { wash: ['#1a1a1a', '#e8e0d0', '#7a1a14'][k], washA: 1, w: 1.6, col: L }); } pop();   // три телефона
    ell(470, 1350, 46, 14, { wash: '#8a8a8a', washA: 1, w: 1.6, col: L }); push(470, 1340, 1, 0.3); pencil([[-40, 0], [10, -4]], { w: 6, col: '#3a1a0a', pass2: false }); ell(16, -12, 12, 12, { wash: '#3a1a0a', washA: 1, w: 1.4, col: L }); pop();
    for (let k = 0; k < 5; k++) { const ph = (t * 0.4 + k / 5) % 1; ell(486 + Math.sin(t * 2 + k) * 14 + ph * 30, 1320 - ph * 180, 10 + ph * 26, 8 + ph * 18, { wash: '#d8d4cc', washA: 0.35 * (1 - ph), line: false }); }   // дымок от трубки
    push(600, 1340, 1); rect(-16, -46, 32, 46, { wash: 'rgba(200,120,40,0.6)', washA: 1, w: 1.6, col: L }); rect(-20, -40, 40, 40, { wash: 'rgba(0,0,0,0)', washA: 0, w: 2.4, col: '#a8a8a8' }); pop();
    push(850, 1312, 1, 0.5); pencil([[-60, 0], [60, 0]], { w: 6, col: '#1a1a1a', pass2: false }); pencil([[60, 0], [72, 0]], { w: 4, col: '#c8a040', pass2: false }); pop();
    for (let k = 0; k < 4; k++) rect(330 + k * 6, 1316 - k * 10, 120, 12, { wash: ['#c8b890', '#a8b4c0', '#c8a080', '#e8e0c8'][k], washA: 1, w: 1.2, col: L });
  }
  function chair(t) { push(1330, 1560, 1); const c = blob([[-140, 0], [-150, -520], [-100, -600], [100, -600], [150, -520], [140, 0]], { wash: '#3a1a10', washA: 1, w: 3, col: L }); shadeG(c.path, -150, 0, 150, 0, '#0a0402', 0.5); for (let k = 0; k < 4; k++) for (let q = 0; q < 3; q++) ell(-90 + q * 90, -520 + k * 110, 6, 6, { wash: '#c8a040', washA: 1, w: 1 }); pop(); }

  WORLD.kremlin = (t, u, cat) => {
    lay(9, () => room(t));
    lay(5, () => people(t));
    lay(2.2, () => { pencil([[-500, 1560], [1600, 1560]], { w: 2, col: L, a: 0.4, pass2: false }); const fl = rect(-500, 1100, 2100, 1300, { wash: '#5a3420', washA: 1, w: 0, line: false }); for (let x = -500; x < 1600; x += 60) pencil([[x, 1100], [x - 200, 2400]], { w: 1.6, col: '#2a1408', a: 0.4, pass2: false }); const cp = shape([[0, 1180], [1100, 1180], [1300, 2400], [-200, 2400]], { wash: '#7a1a18', washA: 1, w: 1.6, col: L }); hatch(cp.path, cp.bb, { gap: 8, a: 0.15, col: '#2a0404', ang: 0.6, w: 1 }); pencil([[40, 1210], [1080, 1210]], { w: 8, col: '#c8a040', a: 0.7, pass2: false });
      for (let r = 0; r < 4; r++) { const y = 1600 + r * 160, w0 = lerp(560, 760, r / 3); pencil([[540 - w0, y], [540 + w0, y]], { w: 6, col: '#c8a040', a: 0.6, pass2: false });
        for (let q = -4; q <= 4; q++) { const x = 540 + q * w0 / 4.5; poly([[x, y + 30], [x + 34, y + 80], [x, y + 130], [x - 34, y + 80]], { wash: r % 2 ? '#1a3a5a' : '#c8a040', washA: 0.8, w: 1.4, col: '#2a0404' }); ell(x, y + 80, 8, 8, { wash: '#f2e0b0', washA: 1, line: false }); } } });
    lay(1.25, () => { chair(t); desk(t); });
    lay(1, () => cat());
    lay(0.65, () => { const c = shape([[-300, -100], [40, -100], [-20, 2400], [-300, 2400]], { wash: '#4a0e0c', washA: 1, w: 2, col: L }); for (let k = 0; k < 4; k++) pencil([[-260 + k * 70, -100], [-280 + k * 70, 2400]], { w: 4, col: '#2a0404', a: 0.5, pass2: false }); shadeG(c.path, -300, 0, 40, 0, '#0a0202', 0.4); });
    rays(900, 300, 1.9, 0.5, 1500, 'rgba(160,190,255,0.6)', 0.18, 6, t);
    motes(30, [0, 200, 1080, 1500], '#ffe8b8', t, 19103, { sp: -6, vx: 6, sz: 2, a: 0.35, tw: 1, add: 1 });
    haze('#2a1a0a', 0.06);
  };
  DIR.kremlin = {
    outfit: 'soviet', light: { side: 1, rim: '#ffd890' }, grade: ['#5a3a1a', 0.12],
    act: () => [[S0.kremlin, 'awe'], [EV.kr_st, 'annoyed'], [EV.kr_gora, 'suspicious'], [EV.kr_bomb - 0.05, 'smug'], [EV.kr_bomb + 0.5, 'sideeye']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1490, s: 1.02, look: t < EV.kr_gora ? [0.4, -0.1] : t < EV.kr_bomb ? [-0.6, -0.2] : [0.6, -0.5],
      point: t > EV.kr_gora && t < EV.kr_bomb ? 1 : undefined, handF: t > EV.kr_gora && t < EV.kr_bomb ? [-190, -300] : undefined, tilt: t > EV.kr_bomb ? 0.05 : 0 }),
    cam: () => [[S0.kremlin, 600, 1000, 0.22], [EV.kr_gora, 420, 900, 0.18], [EV.kr_bomb, 700, 860, 0.16, 'x'], [S1.kremlin, 660, 940, 0.12]]
  };
  TRANS_IN.kremlin = { a: 0.2, b: 0.45, runA: 1, fx(k, t, A, B) {     // штамп «СОВ. СЕКРЕТНО» бьёт в камеру, остаётся оттиск
    const hit = 0.38; drawBuf(k < hit ? A : B, k < hit ? 1 : 1.04 - 0.04 * sm((k - hit) / 0.6));
    scr(() => { const s = k < hit ? lerp(3.2, 1, sm(k / hit)) : 1, a = k < hit ? sm(k / hit) : 1 - sm((k - hit) / 0.62);
      push(540, 980, s, -0.12); ctx.save(); ctx.globalAlpha = a; ctx.lineWidth = 16; ctx.strokeStyle = '#c81e16'; ctx.strokeRect(-430, -130, 860, 260); ctx.restore();
      txt('СОВ. СЕКРЕТНО', 0, 10, 120, { col: '#c81e16', font: 'Osw', a }); pop(); if (k > hit && k < hit + 0.15) whiteOut(0.3, '255,240,220'); });
  } };
})();
