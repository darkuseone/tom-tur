/* 032 — сцена `today` (t1, ответ на хук). Зал Генеральной Ассамблеи ООН, 12.10.2022: золотая стена с большим диском-глобусом,
   два табло голосования по бокам, ряды делегатов за столами с табличками стран, наушники, папки, графины; Том на трибуне.
   Главный свет — тёплый прожектор сверху на трибуну, голубоватый свет табло.
   На «Для ООН» (EV.answer) — плашка-ответ; на «сто сорок три» — инфографика: 183 точки заполняются — 143 ЗА, 5 ПРОТИВ, 35 ВОЗДЕРЖ.,
   ниже «РЕЗОЛЮЦИЯ ES-11/4: „референдумы“ незаконны, не признавать». Переход — табло поднимается снизу. */
(() => {
  EV.answer = wtk('t1', 'Для') - 0.1;
  EV.td_143 = wtk('t1', 'сто') - 0.1;
  EV.td_5 = wtk('t1', 'пяти.') - 0.1;
  KEYW.push('Донбасс?', 'Украины:', 'пяти.');
  const L = DB.ink;
  function hall(t) { vgrad(-900, 1300, ['#2a2430', '#4a3a3a', '#6a5040'], 1);
    poly([[-200, 300], [1280, 300], [1100, 1120], [-20, 1120]], { wash: '#c89a40', washA: 1, w: 2.4, col: L, shade: { gap: 10, a: 0.15, col: '#6a4a10', ang: 1.57 } }); for (let i = 0; i < 9; i++) pencil([[-160 + i * 170, 300], [-10 + i * 140, 1120]], { w: 2, col: '#8a6a20', a: 0.5, pass2: false });
    push(540, 600, 1); ell(0, 0, 200, 200, { wash: '#e8d8a8', washA: 1, w: 3, col: '#6a4a10' }); for (let q = 1; q < 4; q++) pencil(ellPts(0, 0, q * 50, q * 50, 0, 0, 40), { w: 2, col: '#8a6a20', pass2: false }); for (let q = 0; q < 6; q++) pencil([[0, 0], [Math.cos(q * 1.047) * 200, Math.sin(q * 1.047) * 200]], { w: 2, col: '#8a6a20', pass2: false }); pop();
    for (const x of [-60, 1140]) { push(x, 720, 1); rect(-140, -260, 280, 520, { wash: '#14182a', washA: 1, w: 3, col: '#6a6a7a' }); const r = rng(9300 + x); for (let q = 0; q < 24; q++) { const c = r() < 0.75 ? '#3ac86a' : r() < 0.5 ? '#f8c830' : '#e83a3a'; rect(-120 + (q % 3) * 84, -240 + Math.floor(q / 3) * 62, 60, 16, { wash: '#8ab8ff', washA: 0.5, line: false }); ell(50 + (q % 3) * 84 - 84, -232 + Math.floor(q / 3) * 62, 7, 7, { wash: c, washA: t > EV.td_143 ? 1 : 0.3, line: false }); } glow(0, 0, 220, 'rgba(140,180,255,1)', 0.15); pop(); }
    rays(540, -100, 1.57, 0.25, 1300, 'rgba(255,240,200,1)', 0.16, 5, t);
    for (let i = 0; i < 6; i++) { const x = -260 + i * 300 + (i > 2 ? 60 : 0); if (x > 200 && x < 900) continue; push(x, 1000, 0.8); rect(-110, -70, 220, 120, { wash: '#1a1c28', washA: 1, w: 2, col: '#6a6a7a' }); rect(-96, -56, 192, 80, { wash: '#4a5a7a', washA: 0.6, line: false });
      for (let q = 0; q < 2; q++) { ell(-40 + q * 80, -20, 18, 20, { wash: '#2a2a34', washA: 1, line: false }); ell(-40 + q * 80, 14, 30, 16, { wash: '#2a2a34', washA: 1, line: false }); pencil(ellPts(-40 + q * 80, -26, 20, 14, 0, 0, 16).slice(0, 9), { w: 2, col: '#c8c8d0', pass2: false }); } glow(0, -20, 80, 'rgba(255,230,170,1)', 0.15); pop(); }
  }
  function rows(t) {                                                // ряды делегатов
    for (let rr = 0; rr < 2; rr++) { const y = 1200 + rr * 110, s = 0.5 + rr * 0.08; rect(-500, y - 40, 2200, 40, { wash: '#6a4a2a', washA: 1, w: 2, col: L });
      for (let i = 0; i < 9; i++) { const x = -220 + i * 180 + rr * 70; if (x > 300 && x < 760 && rr === 1) continue; human(x, y - 10, s, t, { body: ['#2a2a34', '#3a2a2a', '#1a2a3a', '#4a3a2a', '#2a3a2a'][(i + rr) % 5], hat: [null, 'scarf', null, 'cap', null, 'turban'][(i + rr) % 6], hatCol: '#f4f0e6', skin: ['#e2b48e', '#c88a5a', '#8a5a3a', '#f0c8a0'][(i + rr * 2) % 4], legs: '#1a1a22', armR: t > EV.td_143 && (i + rr) % 3 ? 'up' : 'hold', seed: 9310 + i + rr * 10, face: 'calm', long: (i + rr) % 6 === 1 ? 1 : undefined });
        rect(x - 40, y - 34, 80, 22, { wash: '#f4f0e6', washA: 1, w: 1, col: L }); rect(x + 34, y - 62, 14, 26, { wash: '#c8e0f0', washA: 0.7, w: 1, col: L }); rect(x - 64, y - 46, 40, 10, { wash: ['#2a5a8a', '#8a3a2a', '#3a6a3a'][i % 3], washA: 1, w: 1, col: L });
        pencil(ellPts(x, y - 70 * s, 26 * s, 18 * s, 0, 0, 16).slice(0, 9), { w: 2, col: '#1a1a1e', pass2: false }); } }
  }
  function floor(t) {                                               // ковёр, трибуна, графин, папки, наушники, стулья
    rect(-500, 1300, 2200, 1000, { wash: '#3a5a8a', washA: 1, w: 2, col: L, shade: { gap: 12, a: 0.12, col: '#1a2a4a', ang: 0.1 } }); for (let x = -500; x < 1700; x += 160) pencil([[x, 1300], [x - 80, 2300]], { w: 1.6, col: '#2a4a7a', a: 0.5, pass2: false });
    push(560, 1660, 1); rect(-220, -260, 440, 260, { wash: '#6a4a2a', washA: 1, w: 2.4, col: L, shade: { gap: 9, a: 0.2, col: '#2a1a08', ang: 1.4 } }); rect(-240, -280, 480, 30, { wash: '#8a6a3a', washA: 1, w: 2, col: L }); ell(0, -140, 60, 60, { wash: '#4a7ab8', washA: 1, w: 2, col: L }); pencil(ellPts(0, -140, 40, 40, 0, 0, 30), { w: 2, col: '#e8f0ff', pass2: false });
      for (const k of [-140, 140]) { pencil([[k, -280], [k + 20, -360]], { w: 4, col: '#2a2a30', pass2: false }); ell(k + 20, -366, 10, 10, { wash: '#2a2a30', washA: 1, line: false }); } pop();
    push(1100, 1600, 1); rect(-140, -20, 280, 20, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); ell(-60, -50, 22, 34, { wash: '#c8e0f0', washA: 0.7, w: 1.6, col: L }); rect(20, -40, 90, 20, { wash: '#2a5a8a', washA: 1, w: 1.4, col: L }); pencil(ellPts(-100, -40, 26, 16, 0, 0, 20), { w: 3, col: '#1a1a1e', pass2: false }); pop();
    for (let i = 0; i < 3; i++) { push(-80 + i * 130, 1860, 1); rect(-50, -100, 100, 100, { wash: '#2a4a7a', washA: 1, w: 2, col: L }); rect(-50, -160, 100, 60, { wash: '#2a4a7a', washA: 1, w: 2, col: L }); pop(); }
    const PH = [[-40, '#2a2a30'], [1260, '#3a3a44']]; PH.forEach(([x, c], i) => { human(x, 1640, 0.8, t, { body: c, hat: i ? 'cap' : null, hatCol: '#1a1a20', legs: '#1a1a22', armR: 'hold', seed: 9330 + i, face: 'calm', flip: i ? -1 : 1 });
      push(x + (i ? -40 : 40), 1420, 0.8); rect(-34, -26, 68, 48, { wash: '#1a1a1e', washA: 1, w: 2, col: L }); ell(0, -2, 14, 14, { wash: '#5a7aa8', washA: 1, w: 1.4, col: L }); pop(); const fl = (t * 1.3 + i * 0.5) % 1; if (fl < 0.08) glow(x + (i ? -40 : 40), 1410, 220, 'rgba(255,255,255,1)', 0.6 * (1 - fl / 0.08)); });
    human(840, 1700, 0.82, t, { body: '#1a1a22', hat: null, legs: '#1a1a22', armR: 'hold', prop: 'scroll', seed: 9335, face: 'calm', flip: -1 });
    for (let i = 0; i < 4; i++) { push(900 + i * 70, 1900 + (i % 2) * 20, 1, i * 0.4); rect(-40, -26, 80, 52, { wash: '#f4f0e6', washA: 1, w: 1.2, col: L }); pop(); }
    lightPool(560, 1660, 700, 170, 'rgba(255,235,190,1)', 0.45); castShadow(330, 1650, 120, 480, 0.2, 0.35); moodDark(-400, 900, 2200, 1900, '#0a0a14', 0.2);
  }
  function front(t) { for (const x of [-120, 1220]) { push(x, 2100, 1.3); rect(-120, -260, 240, 260, { wash: '#1a2030', washA: 1, w: 2, col: '#000' }); pop(); } }
  WORLD.today = (t, u, cat) => {
    lay(12, () => hall(t)); lay(3.2, () => rows(t)); lay(1, () => { floor(t); cat(); }); lay(0.6, () => front(t));
    lay(2, () => motes(20, [-100, 300, 1200, 1400], '#fff4d8', t, 9320, { sp: 1, sz: 2.2, a: 0.4, wob: 20, add: 1 }));
  };
  DIR.today = {
    outfit: 'suitK', light: { side: 1, rim: '#fff0c0' }, grade: ['#1a1420', 0.05],
    act: () => [[S0.today, 'suspicious'], [EV.answer, 'proud'], [EV.td_143, 'talk'], [EV.td_5, 'smug']],
    pose: (t, u, b) => { const w1 = clamp(u / 0.8), x = lerp(120, 330, sm(w1)); return Object.assign(b, { x, y: 1650, s: 0.95, walk: w1 < 1 ? t * 9 : 0, look: [0.6, -0.4], hand: t > EV.answer ? [170, -430] : [150, -300], point: t > EV.answer }); },
    hud: t => { if (t < EV.td_143) return; push(560, 860, popK(t, EV.td_143, 0.3), -0.02); ctx.save(); ctx.fillStyle = 'rgba(14,10,8,0.92)'; ctx.fillRect(-360, -220, 720, 440); ctx.restore(); pencil([[-360, -220], [360, -220], [360, 220], [-360, 220], [-360, -220]], { w: 4, col: DB.brassL, pass2: false });
      const n = Math.floor(183 * clamp((t - EV.td_143) / 1.3)); for (let i = 0; i < 183; i++) { if (i >= n) break; const c = i < 143 ? '#3ac86a' : i < 148 ? '#e83a3a' : '#f8c830'; ell(-320 + (i % 23) * 28.5, -170 + Math.floor(i / 23) * 28, 11, 11, { wash: c, washA: 1, line: false }); }
      const k = clamp((t - EV.td_143 - 0.6) / 0.4); txt('143 ЗА', -210, 140, 56, { col: '#3ac86a', font: 'Osw', a: k }); txt('5 ПРОТИВ', 30, 140, 46, { col: '#ff6a5a', font: 'Osw', a: k }); txt('35 ВОЗД.', 240, 140, 40, { col: '#f8c830', font: 'Osw', a: k });
      txt('ГА ООН · 12.10.2022 · «референдумы» незаконны', 0, 196, 28, { col: '#f0e8d8', font: 'Osw', a: k }); pop(); },
    cam: () => [[S0.today, 560, 920, -0.08], [EV.answer, 540, 1000, 0.0, 'x'], [EV.td_143, 540, 1040, 0.04], [S1.today, 540, 1060, 0.06]]
  };
  TRANS_IN.today = { a: 0.06, b: 0.4, fx(k, t, A, B) {            // табло поднимается снизу и накрывает старую сцену
    const e = sm(k), y = H - e * H; drawBuf(A); scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(0, y, W, H); ctx.clip(); ctx.drawImage(B, 0, 0); ctx.restore(); rect(0, y - 30, W, 30, { wash: '#14182a', washA: 1, line: false }); for (let q = 0; q < 20; q++) ell(30 + q * 54, y - 15, 8, 8, { wash: q % 7 ? '#3ac86a' : '#e83a3a', washA: 1, line: false }); }); } };
})();
