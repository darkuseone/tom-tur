/* 004 — сцена `huguenot`: 1700. Улица Фридрихштадта: барочные фасады пастельных цветов с мансардами, кованые вывески по-французски
   (BOULANGERIE, PERRUQUIER, TAILLEUR), гугеноты в тёмном. Слева пятеро горожан — на «пятый» над ними счёт 1…5, пятый говорит «Bonjour!».
   Справа лоток с котлетами: вывеска BOULETTES мелом исправляется на BULETTE, Том пробует котлету на вилке. Переход сюда — разворот карты. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.hug_count = wt('s3', 'пятый');              // счёт 1…5 над головами
  EV.hug_fr = wt('s3', 'француз!');              // пятый: «Bonjour!»
  EV.hug_cut = wt('s3', 'Котлету');              // Том берёт котлету
  EV.hug_bul = wt('s3', 'булеттой.');            // вывеска исправлена мелом, Том откусывает
  SHAKES.push([EV.hug_fr, 0.2, 5]);
  KEYW.push('француз!', 'булеттой.');

  function sky(t) { vgrad(-700, 1400, ['#7aa8d4', '#b4d0e4', '#f2e6cc', '#f6d8a8'], 1); glow(860, 520, 400, 'rgba(255,236,190,1)', 0.4); for (const [x, y, s, sd] of [[200, 330, 1.2, 31], [800, 250, 1.4, 32]]) cloudB(x + t * 6, y, s, '#fff8ec', 0.8, sd); }
  function far(t) {                                                  // силуэт: купол дворца, башни церквей
    for (const [x, w, h] of [[-100, 300, 200], [200, 260, 160], [780, 360, 220], [1100, 260, 180]]) rect(x, 1160 - h, w, h, { wash: '#c8b8a4', washA: 0.7, line: false });
    push(540, 1000, 0.8); rect(-180, 0, 360, 160, { wash: '#d8c8b0', washA: 0.85, w: 1.4, col: '#6a5a4a', a: 0.5 }); const d = ell(0, 0, 90, 70, { wash: '#7a9a8a', washA: 0.85, w: 1.4, col: '#3a4a3a', a: 0.5 }); rect(-10, -100, 20, 40, { wash: '#7a9a8a', washA: 0.85, line: false }); pop();
    for (const x of [120, 960]) { push(x, 1100, 0.7); rect(-30, -260, 60, 260, { wash: '#c8b49a', washA: 0.8, line: false }); poly([[-40, -260], [40, -260], [0, -380]], { wash: '#5a7a6a', washA: 0.8, line: false }); pop(); }
    haze('#f4e8d4', 0.25);
  }
  function facade(x, base, w, h, col, sign, seed, t) {               // барочный дом: 3 этажа, наличники, мансарда, кованая вывеска
    const L = '#2a1e12', p = rect(x, base - h, w, h, { wash: col, washA: 1, w: 2.4, col: L, key: seed }); shadeG(p.path, x + w, 0, x, 0, '#7a6a5a', 0.25);
    for (let f = 0; f < 3; f++) for (let c = 0; c < 3; c++) { const wx = x + 22 + c * (w - 44) / 3 + 6, wy = base - h + 40 + f * (h - 80) / 3.2; rect(wx, wy, (w - 44) / 3 - 20, 64, { wash: '#3a4a5a', washA: 0.9, w: 1.6, col: L }); pencil([[wx - 4, wy - 6], [wx + (w - 44) / 3 - 16, wy - 6]], { w: 4, col: '#f6f0e2', pass2: false }); pencil([[wx + ((w - 44) / 3 - 20) / 2, wy], [wx + ((w - 44) / 3 - 20) / 2, wy + 64]], { w: 1.4, col: '#e8e0d0', a: 0.7, pass2: false }); }
    rect(x - 6, base - h - 14, w + 12, 16, { wash: '#f2ead8', washA: 1, w: 1.8, col: L });
    const m = poly([[x, base - h - 14], [x + w, base - h - 14], [x + w - 30, base - h - 110], [x + 30, base - h - 110]], { wash: '#5a5a6a', washA: 1, w: 2, col: L, key: seed + 1 }); hatch(m.path, m.bb, { gap: 6, a: 0.25, col: '#2a2a3a', ang: 1.5, key: seed + 2 });
    rect(x + w / 2 - 22, base - h - 90, 44, 54, { wash: '#f2ead8', washA: 1, w: 1.6, col: L }); rect(x + w / 2 - 14, base - h - 82, 28, 40, { wash: '#3a4a5a', washA: 1, line: false });
    rect(x + w / 2 - 34, base - 120, 68, 120, { wash: '#4a2e1a', washA: 1, w: 2, col: L });
    if (sign) { const sx = x + w - 10, sy = base - 200; pencil([[sx, sy], [sx + 110, sy]], { w: 4, col: '#1a1a1a', pass2: false }); pencil(spline([[sx, sy + 40], [sx + 40, sy + 6], [sx + 80, sy]], false, 6), { w: 3, col: '#1a1a1a', pass2: false });
      push(sx + 80, sy, 1, Math.sin(t * 1.5 + seed) * 0.06); rect(-80, 6, 160, 52, { wash: '#d6a842', washA: 1, w: 2, col: '#5a3a08' }); txt(sign, 0, 34, sign.length > 10 ? 21 : 26, { font: 'Osw', col: '#2a1608' }); pop(); }
  }
  function street(t) {
    const F = [[-300, 330, 720, '#e8c8b0', 'PERRUQUIER'], [30, 300, 780, '#c8d8c0', 'BOULANGERIE'], [330, 320, 740, '#efe0b0', null], [650, 310, 800, '#d8c4d8', 'TAILLEUR'], [960, 340, 720, '#f0d0a8', 'APOTHICAIRE']];
    F.forEach(([x, w, h, c, sg], i) => facade(x, 1420, w, h, c, sg, 8500 + i * 4, t));
    for (const lx of [10, 640, 1290]) { pencil([[lx, 1420], [lx, 1120]], { w: 6, col: '#1a1a1a', pass2: false }); poly([[lx - 22, 1120], [lx + 22, 1120], [lx + 14, 1070], [lx - 14, 1070]], { wash: '#f6dca0', washA: 0.9, w: 2, col: '#1a1a1a' }); }
    const p = rect(-300, 1410, 1700, 900, { wash: '#a89a86', washA: 1, line: false }); shadeG(p.path, 0, 2000, 0, 1320, '#5a5044', 0.4);
    for (let y = 1420, row = 0; y < 2000; row++) { const hh = 18 + (y - 1420) * 0.06; pencil([[-300, y], [1400, y]], { w: 1.3, col: '#5a5044', a: 0.5, pass2: false, gap: false }); for (let x = -300 + (row % 2) * hh * 0.85; x < 1400; x += hh * 1.7) pencil([[x, y], [x, y + hh]], { w: 1.1, col: '#5a5044', a: 0.4, pass2: false, gap: false }); y += hh; }
    pencil([[-300, 1440], [1400, 1440]], { w: 14, col: '#7a6e60', a: 0.6, pass2: false });
  }
  function five(t) {                                                 // пятеро берлинцев, пятый — француз
    const P = [[40, '#3a3a4a', 'cap', '#2a2a2a'], [140, '#6a4a2a', 'tricorn', '#2a1e14'], [240, '#4a6a4a', 'bonnet', null], [340, '#7a3a2a', 'tricorn', '#1a1a1a'], [450, '#1a1a1e', 'wig', null]];
    P.forEach(([x, c, h, hc], i) => human(x - 110 + i * 8, 1460, 0.8, t, { body: c, legs: '#2a2a2a', hat: h, hatCol: hc, hair: '#5a3a1a', trim: i === 4 ? '#f4f0e6' : undefined, face: i === 4 && t > EV.hug_fr ? 'grin' : t > EV.hug_fr ? 'shock' : 'calm', armR: i === 4 && t > EV.hug_fr ? 'wave' : i === 2 ? 'hold' : 'down', armL: i === 1 ? 'hips' : 'down', seed: 101 + i, long: i === 2 ? 1 : 0 }));
  }
  function stall(t) {                                                // лоток с котлетами: навес в полоску, сковорода, тарелка, вывеска
    push(880, 1470, 1);
    rect(-190, -230, 380, 230, { wash: '#8a5a32', washA: 1, w: 2.6, col: '#2a1608', key: 8530 }); for (let x = -180; x < 190; x += 40) pencil([[x, -226], [x, -4]], { w: 1.6, col: '#4a2a12', a: 0.5, pass2: false });
    for (const sx of [-180, 170]) rect(sx, -520, 12, 520, { wash: '#6a4424', washA: 1, w: 1.6, col: '#2a1608' });
    for (let k = 0; k < 8; k++) { const x0 = -210 + k * 52; shape([[x0, -520], [x0 + 52, -520], [x0 + 52, -450], [x0 + 26, -430], [x0, -450]], { wash: k % 2 ? '#f4f0e6' : '#2a4a9a', washA: 1, w: 1.6, col: '#1a1a2a' }); }
    ell(-60, -244, 90, 18, { wash: '#2a2a2e', washA: 1, w: 2, col: '#0a0a0a' }); for (let q = 0; q < 5; q++) { ell(-110 + q * 26, -252, 13, 9, { wash: '#8a4a22', washA: 1, w: 1.4, col: '#2a1206' }); } for (let k = 0; k < 3; k++) { const ph = (t * 0.8 + k / 3) % 1; ell(-80 + k * 30, -280 - ph * 120, 12 + ph * 20, 10 + ph * 14, { wash: '#efe8dc', washA: 0.5 * (1 - ph), line: false }); }
    ell(90, -240, 60, 14, { wash: '#f4f0e6', washA: 1, w: 1.8, col: '#4a4a4a' }); for (const [bx, by] of [[70, -250], [100, -252], [86, -264], [116, -246]]) ell(bx, by, 14, 10, { wash: '#7a3e1c', washA: 1, w: 1.4, col: '#2a1206' });
    const bk = rect(-150, -420, 300, 110, { wash: '#2a2a2a', washA: 1, w: 3, col: '#6a4424' });
    if (t < EV.hug_bul) txt('BOULETTES', 0, -380, 50, { font: 'Hand', col: '#f4f0e6' });
    else { const k = clamp((t - EV.hug_bul) / 0.5); txt('BOULETTES', 0, -380, 50, { font: 'Hand', col: '#f4f0e6', a: 1 - k * 0.6 }); pencil([[-110, -370], [lerp(-110, 110, k), -390]], { w: 5, col: '#f2c81e', pass2: false }); if (k > 0.5) txt('BULETTE', 0, -332, 56, { font: 'Hand', col: '#f2c81e', a: (k - 0.5) * 2, rot: -0.05 }); }
    pop();
    human(980, 1470, 0.86, t, { body: '#3a2a3a', legs: '#2a2a2a', hat: 'bonnet', face: t > EV.hug_bul ? 'grin' : 'smile', armR: 'hold', prop: 'pan', armL: 'hips', seed: 110, long: 1, flip: -1 });
  }
  function bulette(P, t) {                                           // котлета на вилке в лапе Тома
    if (t < EV.hug_cut) return; const h = P.hand || [120, -260], x = P.x + h[0] * P.s, y = P.y + h[1] * P.s, bit = t > EV.hug_bul + 0.25;
    push(x, y, 1, 0.35); pencil([[0, 0], [0, -110]], { w: 5, col: '#c8ccd0', pass2: false }); for (const fx of [-8, 0, 8]) pencil([[fx, -110], [fx, -140]], { w: 3, col: '#c8ccd0', pass2: false });
    const b = ell(0, -160, 34, 26, { wash: '#8a4a22', washA: 1, w: 2, col: '#2a1206' }); hatch(b.path, b.bb, { gap: 5, a: 0.3, col: '#3a1a08', ang: 0.7, key: 8540 }); if (bit) { ell(24, -170, 16, 16, { wash: '#f4e8d4', washA: 1, line: false }); ell(22, -170, 10, 10, { wash: '#c88a6a', washA: 1, line: false }); } else if (t > EV.hug_cut + 0.3) for (let k = 0; k < 2; k++) { const ph = (t * 1.2 + k * 0.5) % 1; pencil([[-10 + k * 20, -196 - ph * 50], [-4 + k * 20, -216 - ph * 50]], { w: 3, col: '#f4f0e6', a: 0.7 * (1 - ph), pass2: false }); }
    pop();
  }

  WORLD.huguenot = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(9, () => far(t));
    lay(2.4, () => street(t));
    lay(1.12, () => five(t));
    lay(1, () => { stall(t); cat(); });
    lay(0.8, () => { push(-60, 1900, 1.3); for (const [bx, c] of [[0, '#7a4a24'], [130, '#6a4020']]) { const b = ell(bx, -80, 60, 86, { wash: c, washA: 1, w: 2.4, col: '#2a1608' }); for (const yy of [-140, -20]) pencil([[bx - 58, yy], [bx + 58, yy]], { w: 5, col: '#3a3a3a', pass2: false }); } pop();
      for (let k = 0; k < 3; k++) { const x = 300 + k * 60 + Math.sin(t * 2 + k) * 6, y = 1880 + (k % 2) * 20, pk = Math.sin(t * 8 + k * 2) > 0.6 ? 8 : 0; ell(x, y, 24, 16, { wash: '#8a8a94', washA: 1, w: 1.6, col: '#2a2a2e' }); ell(x + 18, y - 14 + pk, 10, 9, { wash: '#6a6a74', washA: 1, w: 1.4, col: '#2a2a2e' }); poly([[x + 26, y - 14 + pk], [x + 34, y - 12 + pk], [x + 26, y - 10 + pk]], { wash: '#e8a030', washA: 1, line: false }); } });
    lay(0.65, () => { motes(20, [-100, 300, 1200, 1900], '#fff2d0', t, 8550, { sp: 20, vx: 10, sz: 3, a: 0.5, tw: 1 }); });
  };
  DIR.huguenot = {
    outfit: 'dutch', light: { side: 1, rim: '#ffe6b0' }, grade: ['#d88a50', 0.22],
    act: () => [[S0.huguenot, 'talk'], [EV.hug_count, 'suspicious'], [EV.hug_fr, 'shock'], [EV.hug_cut, 'smug'], [EV.hug_bul, 'grin']],
    pose: (t, u, b) => Object.assign(b, {
      x: 620, y: GY, s: 1.0, look: t > EV.hug_cut ? [0.4, -0.3] : t > EV.hug_count ? [-0.8, 0] : [0.1, 0],
      hand: t > EV.hug_cut ? [170, -170] : t > EV.hug_count && t < EV.hug_cut ? [-160, -260] : undefined, point: t > EV.hug_count && t < EV.hug_cut ? 1 : undefined, squash: b.squash, tilt: t > EV.hug_bul ? 0.05 : 0
    }),
    afterCat: (t, u, P) => bulette(P, t),
    cam: () => [[S0.huguenot, 540, 980, 0.1], [EV.hug_count, 420, 1020, 0.06], [EV.hug_fr + 0.3, 400, 1030, 0.1], [EV.hug_cut, 640, 1040, 0.1], [S1.huguenot, 700, 1030, 0.18]],
    hud: t => { if (t > EV.hug_count && t < EV.hug_cut + 0.4) { const a = clamp((EV.hug_cut + 0.4 - t) / 0.3); for (let i = 0; i < 5; i++) { const k = popK(t, EV.hug_count + i * 0.12, 0.3); if (t < EV.hug_count + i * 0.12) continue; txt(String(i + 1), 40 + i * 88, 900, 70 * k, { font: 'Osw', col: i === 4 ? K.amber : '#f6ecd6', a }); } }
      if (t > EV.hug_fr && t < S1.huguenot) note('Bonjour!', 420, 820, t, EV.hug_fr, EV.hug_bul, '#2a1a10', 60, -0.06); }
  };

  // ---------------------------------------------------------------- переход В 1700: старая карта разворачивается — городок прорастает кварталами, камера ныряет в квартал
  TRANS_IN.huguenot = { a: 0.35, b: 0.45, fx(k, t, A, B) {
    const q = sm(clamp(k / 0.45)), z = sm(clamp((k - 0.45) / 0.55));
    drawBuf(A, 1, 540, 960);
    scr(() => { const w = W * q, x0 = 540 - w / 2; ctx.save(); ctx.fillStyle = '#e8d6a8'; ctx.fillRect(x0, 0, w, H); ctx.beginPath(); ctx.rect(x0, 0, w, H); ctx.clip();
      const sc = 1 + z * 6; ctx.translate(540, 960); ctx.scale(sc, sc); ctx.translate(-540, -960);
      const r = rng(8560); for (let i = 0; i < 400; i++) { ctx.fillStyle = `rgba(120,90,50,${0.05 + r() * 0.08})`; ctx.fillRect(r() * W, r() * H, 2 + r() * 6, 2 + r() * 6); }
      pencil([[-50, 1100], [300, 1040], [540, 980], [760, 900], [1130, 880]], { w: 26, col: '#7ab0c8', pass2: false });
      const g = clamp(q * 1.6 - 0.4); for (let i = 0; i < 12; i++) { if (i / 12 > g) break; const yy = 600 + i * 60; pencil([[200, yy], [880, yy - 40]], { w: 3, col: '#6a4a2a', pass2: false }); pencil([[220 + i * 56, 560], [200 + i * 56, 1360]], { w: 3, col: '#6a4a2a', pass2: false }); }
      for (let i = 0; i < 30; i++) { if (i / 30 > g) break; rect(240 + (i % 6) * 104, 640 + Math.floor(i / 6) * 120, 60, 36, { wash: '#b8643e', washA: 0.7, line: false }); }
      txt('BERLIN · 1700', 540, 420, 70, { font: 'Hand', col: '#5a3a1a' }); txt('FRIEDRICHSTADT', 560, 1440, 44, { font: 'Hand', col: '#5a3a1a', rot: -0.05 });
      ctx.restore(); if (q > 0 && q < 1) for (const sx of [x0, x0 + w]) pencil([[sx, 0], [sx, H]], { w: 8, col: '#8a6a3a', a: 0.7, pass2: false }); });
    if (z > 0) inCircle(560, 900, Math.pow(z, 1.4) * 1400, () => drawBuf(B, 1.3 - 0.3 * z, 560, 900));
  } };
})();
