/* 004 — сцена `airlift`: 1948, воздушный мост. Над крышами Западного Берлина заходит на посадку в Темпельхоф серебристый четырёхмоторный
   «Скаймастер», за ним в небе — очередь из самолётов (по одному в минуту, секундомер «60 с»). Дети у забора машут; на «конфеты»
   сыплются маленькие парашютики с шоколадками. Переход сюда — струя брандспойта заливает кадр акварелью и становится небом. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.air_plane = wt('s7', 'самолёт');            // самолёт проносится над головой — рёв
  EV.air_min = wt('s7', 'каждую');               // секундомер
  EV.air_candy = wt('s7', 'конфеты');            // парашютики с шоколадом
  SHAKES.push([EV.air_plane + 0.25, 0.5, 9]);
  KEYW.push('минуту!', 'конфеты');

  function plane(x, y, s, t, o = {}) {                               // C-54 «Скаймастер» сбоку, нос вправо: серебристый фюзеляж, киль, крыло, 2 мотора с винтами, шасси, звезда
    const L = '#1c1e22', M = '#c8ccd2', MD = '#6a7078', ML = '#f4f6f8'; push(x, y, s, o.rot || 0.06);
    shape([[-60, 2], [200, 2], [170, 24], [-40, 28]], { wash: MD, washA: 1, w: 2, col: L });
    const f = blob([[-420, -16], [-360, -34], [150, -46], [330, -40], [404, -20], [424, 2], [384, 24], [-360, 26]], { wash: M, washA: 1, w: 2.8, col: L, key: 8900 }); shadeG(f.path, 0, 30, 0, -46, ML, 0.55); shadeG(f.path, 0, -46, 0, 30, MD, 0.3);
    for (let q = 0; q < 10; q++) ell(-260 + q * 46, -16, 7, 6, { wash: '#3a4a5a', washA: 1, w: 1.2, col: L }); poly([[330, -36], [376, -26], [372, -12], [326, -18]], { wash: '#2a3a4a', washA: 1, w: 1.6, col: L });
    shape([[-330, -30], [-396, -160], [-436, -160], [-424, -16]], { wash: M, washA: 1, w: 2.2, col: L }); ell(-390, 2, 76, 9, { wash: MD, washA: 1, w: 1.8, col: L });
    for (const [ex, ey] of [[20, 34], [140, 28]]) { const n = ell(ex, ey, 60, 17, { wash: M, washA: 1, w: 2, col: L }); shadeG(n.path, ex, ey + 17, ex, ey - 17, MD, 0.4); ell(ex + 62, ey, 6, 16, { wash: '#3a3a3a', washA: 1, w: 1.2 });
      ctx.save(); ctx.globalAlpha = 0.3; ell(ex + 66, ey, 7, 78, { wash: '#e8eaee', washA: 1, line: false }); ctx.restore(); const bl = Math.cos(t * 70 + ex); pencil([[ex + 66, ey - 78 * bl], [ex + 66, ey + 78 * bl]], { w: 3, col: '#2a2a2a', a: 0.7, pass2: false }); }
    ell(-150, 0, 22, 22, { wash: '#2a3a7a', washA: 1, w: 1.6, col: L }); txt('★', -150, 2, 30, { font: 'Osw', col: '#f4f6f8' }); rect(-128, -6, 40, 12, { wash: '#f4f6f8', washA: 1, w: 1.2, col: L });
    if (!o.far) for (const gx of [40, 160, 340]) { pencil([[gx, 40], [gx, 74]], { w: 4, col: '#2a2a2a', pass2: false }); ell(gx, 80, 13, 13, { wash: '#1a1a1a', washA: 1, w: 1.4 }); }
    pop();
  }
  function chute(x, y, s, t, k) {                                    // парашютик-платок с шоколадкой
    push(x + Math.sin(t * 2 + k) * 20, y, s, Math.sin(t * 3 + k) * 0.15);
    const c = blob([[-50, 0], [-40, -40], [0, -54], [40, -40], [50, 0], [25, -8], [0, -4], [-25, -8]], { wash: '#fbf8f2', washA: 1, w: 2, col: '#5a5a5a' });
    for (const sx of [-50, -25, 25, 50]) pencil([[sx, -2], [0, 70]], { w: 1.4, col: '#5a5a5a', pass2: false });
    rect(-18, 66, 36, 22, { wash: '#5a2e14', washA: 1, w: 1.6, col: '#2a1206' }); rect(-18, 72, 36, 10, { wash: '#c8a040', washA: 1, line: false }); pop();
  }
  function sky(t) { vgrad(-700, 1500, ['#4a7ab8', '#8ab4dc', '#cfe2ec', '#f2e8d4'], 1); for (const [x, y, s, sd] of [[180, 300, 1.8, 71], [760, 520, 1.5, 72], [480, 180, 1.1, 73], [1000, 260, 1.2, 74]]) cloudB(x - t * 12, y, s, '#ffffff', 0.9, sd); }
  function queue(t) { for (let k = 0; k < 4; k++) { const ph = ((t - S0.airlift) * 0.06 + k * 0.22), x = -200 + ph * 1100, y = 260 + k * 60 + ph * 200; plane(x, y, 0.22 - k * 0.03, t, { far: 1, rot: 0.1 }); } }
  function roofs(t) {                                                // крыши доходных домов, трубы, антенны
    const r = rng(8910); for (let k = 0; k < 9; k++) { const x = -260 + k * 180, h = 280 + r() * 200, top = 1400 - h; rect(x, top, 170, h, { wash: ['#b8a088', '#a89078', '#c8b098'][k % 3], washA: 1, w: 2, col: '#2a1e14' });
      poly([[x - 10, top], [x + 180, top], [x + 150, top - 70], [x + 20, top - 70]], { wash: '#6a4a3a', washA: 1, w: 2, col: '#2a1e14' }); rect(x + 30 + r() * 80, top - 110, 22, 60, { wash: '#8a5a3a', washA: 1, w: 1.6, col: '#2a1e14' });
      for (let f = 0; f < 3; f++) for (let c = 0; c < 3; c++) rect(x + 18 + c * 52, top + 30 + f * 80, 30, 46, { wash: (k + f + c) % 4 ? '#3a4a5a' : '#f6dca0', washA: 0.9, w: 1.2, col: '#2a1e14' }); }
    haze('#e8ecec', 0.18);
  }
  function fence(t) {                                                // забор Темпельхофа и дети
    const p = rect(-300, 1380, 1700, 900, { wash: '#8a8a6a', washA: 1, line: false }); shadeG(p.path, 0, 2000, 0, 1380, '#4a4a34', 0.4);
    for (let x = -300; x < 1400; x += 22) pencil([[x, 1250], [x + 120, 1380]], { w: 1.2, col: '#5a5a5a', a: 0.5, pass2: false, gap: false }), pencil([[x + 120, 1250], [x, 1380]], { w: 1.2, col: '#5a5a5a', a: 0.5, pass2: false, gap: false });
    for (let x = -280; x < 1400; x += 200) rect(x, 1220, 12, 170, { wash: '#4a4a4a', washA: 1, w: 1.4 });
    const wv = t > EV.air_plane; const K2 = [[-20, '#8a3a2a', 'cap'], [110, '#3a5a8a', null], [770, '#6a6a3a', 'cap'], [890, '#a84a5a', 'scarf'], [1020, '#4a4a6a', null]];
    K2.forEach(([x, c, h], i) => human(x, 1450, 0.62, t, { body: c, legs: '#3a3a3a', hat: h, hatCol: '#3a3a3a', hair: '#8a5a2a', face: t > EV.air_candy ? 'grin' : wv ? 'shock' : 'smile', armL: wv ? 'wave' : 'down', armR: t > EV.air_candy && i % 2 ? 'up' : wv ? 'wave' : 'hold', seed: 170 + i, flip: x > 540 ? -1 : 1 }));
  }
  function bigPlane(t) {                                             // крупный самолёт проходит над головой (слой 2)
    const k = clamp((t - EV.air_plane + 1.0) / 2.6), x = lerp(-700, 1900, k), y = lerp(420, 760, k); plane(x, y, 1.3, t, { rot: 0.1 });
    if (k > 0 && k < 1) { ctx.save(); ctx.globalAlpha = 0.18; ell(x + 100, 1420, 500, 40, { wash: '#000000', washA: 1, line: false }); ctx.restore(); }
  }
  function candy(t) { if (t < EV.air_candy - 0.9) return; const u = t - EV.air_candy + 0.9, r = rng(8920); for (let k = 0; k < 10; k++) { const x = 40 + r() * 1000, y0 = 360 + r() * 420, d = r() * 0.5; if (u < d) continue; push(0, 0, 1); chute(x, y0 + (u - d) * (110 + r() * 60), (0.8 + r() * 0.4) * Math.min(1, (u - d) * 4), t, k); pop(); } }

  WORLD.airlift = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(12, () => queue(t));
    lay(4, () => roofs(t));
    lay(2.2, () => bigPlane(t));
    lay(1, () => { fence(t); cat(); });
    lay(0.8, () => candy(t));
    lay(0.66, () => { const j = clamp((t - EV.air_candy - 0.2) / 0.6); dog(880, 1850, 1.1, t, { jump: j, tongue: 1, flip: -1 }); push(120, 1870, 1.2); rect(-120, -150, 240, 150, { wash: '#8a6a3a', washA: 1, w: 2.4, col: '#2a1a0a' }); txt('CARE', 0, -70, 54, { font: 'Osw', col: '#2a1a0a', a: 0.8 }); for (let y = -150; y < 0; y += 50) pencil([[-120, y], [120, y]], { w: 2, col: '#5a3a1a', a: 0.6, pass2: false }); pop(); });
  };
  DIR.airlift = {
    outfit: 'aviator', light: { side: 1, rim: '#fff4dc' }, grade: ['#e0a060', 0.18],
    act: () => [[S0.airlift, 'awe'], [EV.air_plane, 'shock'], [EV.air_min, 'proud'], [EV.air_candy, 'grin']],
    pose: (t, u, b) => Object.assign(b, {
      x: 470, y: GY, s: 0.98, look: t > EV.air_plane - 0.4 && t < EV.air_min ? [0.6, -0.9] : t > EV.air_candy ? [0, -0.6] : [0.2, -0.3],
      hand: t > EV.air_candy ? [-130, -340] : t > EV.air_plane ? [150, -340] : undefined, handF: t > EV.air_candy ? [140, -340] : undefined, point: t > EV.air_plane && t < EV.air_candy ? 1 : undefined, squash: b.squash, tailUp: t > EV.air_plane && t < EV.air_plane + 0.8
    }),
    cam: () => [[S0.airlift, 540, 760, -0.05], [EV.air_plane, 540, 820, 0.0], [EV.air_min, 540, 900, 0.04], [S1.airlift, 520, 960, 0.08]],
    hud: t => { if (t > EV.air_min) { const k = popK(t, EV.air_min, 0.3), a = clamp((t - EV.air_min) / 1.2) * 6.283; push(880, 860, k); ell(0, 0, 90, 90, { wash: '#f6f0e2', washA: 1, w: 4, col: '#2a1a10' }); for (let q = 0; q < 12; q++) { const aa = q / 12 * 6.283; pencil([[Math.cos(aa) * 74, Math.sin(aa) * 74], [Math.cos(aa) * 84, Math.sin(aa) * 84]], { w: 3, col: '#2a1a10', pass2: false }); } pencil([[0, 0], [Math.sin(a) * 66, -Math.cos(a) * 66]], { w: 6, col: '#c8241e', pass2: false }); rect(-14, -112, 28, 20, { wash: '#2a1a10', washA: 1, line: false }); txt('60 с', 0, 140, 54, { font: 'Osw', col: '#f6ecd6' }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В 1948: струя брандспойта заливает кадр акварелью → небо
  TRANS_IN.airlift = { a: 0.3, b: 0.45, fx(k, t, A, B) {
    const j = sm(clamp(k / 0.45)), w = sm(clamp((k - 0.2) / 0.6));
    drawBuf(A, 1, 540, 960); drawBuf(B, 1, 540, 960, sm(clamp((k - 0.45) / 0.5)));
    scr(() => { const r = rng(8930); if (k < 0.7) { const ex = lerp(-100, 1300, j), ey = lerp(1900, -100, j); pencil([[-100, 1900], [lerp(-100, ex, 0.5), lerp(1900, ey, 0.5) - 120], [ex, ey]], { w: 60, col: '#d8f0ff', a: 0.85 * (1 - w), pass2: false }); pencil([[-100, 1900], [lerp(-100, ex, 0.5), lerp(1900, ey, 0.5) - 120], [ex, ey]], { w: 18, col: '#ffffff', a: 0.9 * (1 - w), pass2: false }); }
      for (let i = 0; i < 26; i++) { const x = r() * W, y = r() * H * j + (1 - j) * H, R = (100 + r() * 260) * w; if (R < 2) continue; ell(x, y, R, R * 0.8, { wash: ['#6aa0d8', '#9ac4e8', '#4a80c0'][i % 3], washA: 0.55 * (1 - sm(clamp((k - 0.6) / 0.4))), line: false }); pencil([[x, y + R * 0.7], [x + 4, y + R * 0.7 + 80 * w]], { w: 6, col: '#6aa0d8', a: 0.5 * (1 - k), pass2: false }); } });
  } };
})();
