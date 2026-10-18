/* 003 — сцена `mammoth`: ≈17 000 лет назад, Подол (Кирилловская стоянка). Холодная степь у реки, сумерки, стоянка охотников:
   жилище из костей мамонта под шкурами, костёр, охотник вырезает узор на бивне. На склоне — живой шерстистый мамонт.
   Панчлайн: на бивне нарисован… мамонт (гравировка с хоботом, как на находке Хвойки). Переход В сцену: искры салюта → звёзды и искры костра. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.mam_hunt = wt('s9', 'охотились');            // мамонт выходит на склон
  EV.mam_draw = wt('s9', 'рисовали');             // охотник режет бивень
  EV.mam_pic = wt('s9', 'мамонта!');              // крупно: гравировка-мамонт; живой мамонт трубит
  SHAKES.push([EV.mam_pic + 0.1, 0.3, 9]);
  KEYW.push('мамонтов', 'мамонта!');

  function woolly(x, y, s, t, trump) {                              // шерстистый мамонт мордой влево: купол головы, горб, длинная шерсть, бивни-спирали
    push(x, y, s); const C = '#6a3e22', CD = '#2e1a0c', CL = '#a8703e', ph = t * 2.4;
    for (let k = 0; k < 4; k++) { const lx = -120 + k * 80, sw = Math.sin(ph + k * 1.7) * 8; const l = blob([[lx - 30, -150], [lx + 30, -150], [lx + 26 + sw, 0], [lx - 30 + sw, 0]], { wash: k % 2 ? CD : C, washA: 1, w: 2.6, col: '#120804' }); ell(lx + sw - 2, -2, 32, 9, { wash: '#2a1a0c', washA: 1, w: 1.4 }); }
    const body = blob([[-170, -230], [-130, -380], [-40, -420], [60, -380], [180, -320], [230, -220], [210, -110], [-160, -100]], { wash: C, washA: 1, w: 3.4, col: '#120804', key: 7990 });
    fstr(body.path, body.bb, 300, 1.5, 36, CD, 0.55, 7991, 3); fstr(body.path, body.bb, 120, 1.55, 30, CL, 0.45, 7992, 2);
    for (let k = 0; k < 24; k++) { const xx = -160 + k * 16; pencil([[xx, -116], [xx + Math.sin(t * 2 + k) * 4, -60 - (k % 3) * 10]], { w: 4, col: CD, pass2: false }); }
    const head = blob([[-150, -250], [-200, -330], [-180, -440], [-110, -470], [-60, -420], [-80, -300], [-120, -230]], { wash: C, washA: 1, w: 3.2, col: '#120804', key: 7993 }); fstr(head.path, head.bb, 90, 1.4, 22, CD, 0.5, 7994, 3);
    blob([[-110, -400], [-70, -410], [-64, -330], [-100, -320]], { wash: CD, washA: 0.95, w: 2, col: '#120804' });
    const tr = trump > 0 ? [[-190, -290], [-240, -330], [-270, -400 - trump * 40], [-250, -460 - trump * 50]] : [[-190, -290], [-226, -200], [-214 + Math.sin(t * 1.5) * 8, -110], [-190 + Math.sin(t * 1.5) * 12, -60]];
    const tp = shape(tubeP(spline(tr, false, 8), 48, 20), { wash: C, washA: 1, w: 2.8, col: '#120804' });
    for (const dz of [0, 14]) { const tk = spline([[-170 + dz, -270], [-250 + dz, -230], [-310 + dz, -290], [-300 + dz, -370], [-250 + dz, -390]], false, 10); pencil(tk, { w: 20 - dz * 0.4, col: '#efe4c8' }); pencil(tk, { w: 2.2, col: '#3a2a14', pass2: false }); }
    ell(-150, -380, 7, 6, { wash: '#0a0604', washA: 1, w: 1.2 });
    if (trump > 0) for (let k = 0; k < 3; k++) { const u = (t * 2 + k / 3) % 1; pencil(ellPts(-250, -480 - trump * 50, 30 + u * 120, 20 + u * 60, -0.4, 0.3, 20).slice(0, 12), { w: 3, col: '#f6ecd6', a: (1 - u) * trump, pass2: false }); }
    pop();
  }
  function boneHut(x, y, s, t) {                                     // жилище из костей мамонта, шкуры, вход со светом
    push(x, y, s); const hut = blob([[-220, 0], [-200, -170], [-100, -280], [40, -300], [170, -200], [220, 0]], { wash: '#7a5a3a', washA: 1, w: 3, col: '#2a1a0a', key: 7995 });
    fstr(hut.path, hut.bb, 120, 0.4, 30, '#4a3220', 0.45, 7996, 3);
    for (let k = 0; k < 9; k++) { const a = Math.PI * (0.05 + 0.9 * k / 8), rx = Math.cos(a) * 220, ry = -Math.sin(a) * 280; pencil([[rx * 0.9, ry * 0.85 + 6], [rx * 1.04, ry * 1.04]], { w: 14, col: '#e8dcbc' }); pencil([[rx * 0.9, ry * 0.85 + 6], [rx * 1.04, ry * 1.04]], { w: 2, col: '#4a3a1a', pass2: false }); }
    for (let k = 0; k < 7; k++) ell(-200 + k * 66, -10, 34, 26, { wash: '#efe4c8', washA: 1, w: 2, col: '#4a3a1a' });         // черепа-основание
    for (const sd of [-1, 1]) pencil(spline([[sd * 40, -280], [sd * 120, -360], [sd * 100, -430]], false, 8), { w: 16, col: '#efe4c8' });   // бивни-арка
    const d = blob([[-50, 0], [-46, -110], [0, -140], [46, -110], [50, 0]], { wash: '#1a0e06', washA: 1, w: 2, col: '#0a0604' }); glow(0, -60, 90, 'rgba(255,170,80,1)', 0.5 * flick(t, 9));
    pop();
  }
  function fire(x, y, t) { glow(x, y - 60, 380, 'rgba(255,150,60,1)', 0.45 * flick(t)); for (let k = 0; k < 5; k++) { const a = -0.9 + k * 0.45; pencil([[x + Math.cos(a) * 70, y + 10], [x - Math.cos(a) * 70, y - 10]], { w: 12, col: '#3a2410' }); }
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let k = 0; k < 4; k++) { const f = flick(t, k), h = (110 - k * 18) * f, w = 50 - k * 9; ctx.fillStyle = ['#ff6a1a', '#ff9a2a', '#ffc84a', '#fff0b0'][k]; ctx.beginPath(); ctx.moveTo(x - w, y); ctx.quadraticCurveTo(x - w * 0.8, y - h * 0.5, x + Math.sin(t * 9 + k) * 10, y - h); ctx.quadraticCurveTo(x + w * 0.8, y - h * 0.5, x + w, y); ctx.fill(); } ctx.restore();
    motes(26, [x - 120, y - 520, x + 120, y - 40], 'rgba(255,200,120,1)', t, 7997, { sp: -60, sz: 3, a: 0.9, add: 1, wob: 20 }); }
  function hunter(x, y, s, t) {                                      // охотник сидит у костра, режет бивень кремнём
    push(x, y, s); const cut = t > EV.mam_draw && t < EV.mam_pic ? Math.sin(t * 22) * 10 : 0;
    blob([[-70, 0], [-80, -110], [-50, -190], [40, -190], [70, -110], [80, 0]], { wash: '#8a6a44', washA: 1, w: 2.4, col: '#2a1a0a', key: 7998 }); fstr(pathOf([[-70, 0], [-80, -110], [-50, -190], [40, -190], [70, -110], [80, 0]]), [-80, -190, 80, 0], 60, 1.5, 20, '#4a3420', 0.5, 7999, 2);
    ell(0, -230, 36, 40, { wash: '#c89a70', washA: 1, w: 2.2, col: '#3a2a1a' }); blob([[-40, -236], [-30, -280], [0, -290], [34, -280], [42, -232], [30, -250], [-30, -250]], { wash: '#3a2410', washA: 1, w: 1.8 }); blob([[-30, -216], [0, -170], [30, -216]], { wash: '#3a2410', washA: 1, w: 1.6 });
    ell(-14, -232, 4, 3, { wash: '#1a0e06', washA: 1, line: false }); ell(14, -232, 4, 3, { wash: '#1a0e06', washA: 1, line: false });
    const tk = spline([[-140, -60], [-40, -90], [80, -80], [180, -40]], false, 10); pencil(tk, { w: 30, col: '#efe4c8' }); pencil(tk, { w: 2.2, col: '#4a3a1a', pass2: false });
    pencil([[60 + cut, -150], [40 + cut, -90]], { w: 12, col: '#8a6a44' }); poly([[36 + cut, -96], [50 + cut, -100], [42 + cut, -76]], { wash: '#5a5a5a', washA: 1, w: 1.4 });
    pop();
  }
  function engraving(t) {                                            // крупный план бивня с гравировкой мамонта
    if (t < EV.mam_pic - 0.1) return; const k = popK(t, EV.mam_pic, 0.4);
    push(560, 640, k, -0.06); const tb = shape(tubeP(spline([[-430, 70], [-160, -40], [160, -40], [430, 40]], false, 14), 210, 90), { wash: '#efe4c8', washA: 1, w: 3, col: '#5a4a2a', key: 7985 }); shadeG(tb.path, 0, 90, 0, -40, '#b8a478', 0.5);
    for (let i = 0; i < 9; i++) pencil([[-380 + i * 20, 60 - i * 6], [-370 + i * 20, 0 - i * 6]], { w: 2.4, col: '#6a5232', pass2: false }); for (let i = 0; i < 6; i++) pencil([[220 + i * 24, -40], [232 + i * 24, 10], [244 + i * 24, -40]], { w: 2.4, col: '#6a5232', pass2: false });
    const lw = { w: 5, col: '#5a3a1a', pass2: false, jit: 1.2 };
    pencil(spline([[120, -10], [40, -70], [0, -90], [-60, -100], [-100, -104], [-130, -70]], false, 10), lw); pencil(spline([[-130, -70], [-150, 0], [-140, 60], [-118, 72]], false, 8), lw);
    pencil([[-100, 22], [96, 22], [120, -10]], lw); for (const x0 of [-84, -44, 40, 80]) pencil([[x0, 22], [x0 + 2, 84]], lw); pencil(spline([[-120, -36], [-172, -18], [-182, 22], [-160, 34]], false, 6), lw); pencil([[120, -10], [138, 36]], lw);
    ell(-100, -70, 5, 5, { wash: '#5a3a1a', washA: 1, line: false }); for (let i = 0; i < 8; i++) pencil([[-60 + i * 22, -70], [-56 + i * 22, -46]], { w: 2, col: '#6a4a2a', pass2: false });
    glow(0, 0, 300, 'rgba(255,220,150,1)', 0.25); pop();
  }

  WORLD.mammoth = (t, u, cat) => {
    lay(30, () => { vgrad(-600, 1500, ['#2a2a4a', '#6a5a7a', '#d8906a']); motes(60, [0, 0, W, 800], 'rgba(255,250,230,1)', t, 7980, { sp: 0, sz: 2, a: 0.8, tw: 1 }); });
    lay(12, () => { const P = [[-400, 1200]]; for (let x = -400; x <= 1500; x += 50) P.push([x, 1120 - Math.sin(x * 0.003 + 2) * 180]); P.push([1500, 1500], [-400, 1500]); shape(P, { wash: '#5a5a6a', washA: 1, w: 1.6, col: '#2a2a3a', a: 0.5 });
      for (let k = 0; k < 10; k++) { const x = -200 + k * 160; sil([[x, 1140 - Math.sin(x * 0.003 + 2) * 180], [x + 60, 1120 - Math.sin((x + 60) * 0.003 + 2) * 180], [x + 30, 1100 - Math.sin(x * 0.003 + 2) * 180]], '#e8e8ee', 0.6); }
      const mk = sm((t - EV.mam_hunt) / 0.5); woolly(lerp(1400, 980, mk), 1110, 0.78, t, t > EV.mam_pic ? sm((t - EV.mam_pic) / 0.3) : 0); haze('#6a5a7a', 0.18); });
    lay(4, () => { const r = poly([[-400, 1330], [1500, 1300], [1500, 1440], [-400, 1460]], { wash: '#4a5a72', washA: 1, w: 2, col: '#1a2230', key: 7981 }); for (let k = 0; k < 6; k++) pencil([[-200 + k * 260, 1360 + k * 10], [-120 + k * 260, 1356 + k * 10]], { w: 2, col: '#e8b080', a: 0.5, pass2: false }); boneHut(160, 1420, 0.9, t); });
    lay(1, () => { const g = poly([[-400, 1400], [1500, 1380], [1500, 2400], [-400, 2400]], { wash: '#8a7a5a', washA: 1, w: 2.4, col: '#2a2214', key: 7982 }); hatch(g.path, g.bb, { gap: 9, a: 0.18, col: '#2a2214', ang: 0.1, key: 7983 });
      for (let k = 0; k < 8; k++) sil(ellPts(-100 + k * 170, 1440 + (k % 3) * 60, 70, 10, 0, 0, 12).map(([x, y], i) => [x, y + Math.sin(i * 2.1) * 4]), '#e8eaee', 0.55);
      fire(420, 1500, t); hunter(260, 1510, 1.25, t); cat(); });
    lay(1, () => engraving(t));
  };
  DIR.mammoth = {
    outfit: 'caveman', light: { side: -1, rim: '#ffb060' }, grade: ['#6a3a5a', 0.14],
    act: () => [[S0.mammoth, 'neutral'], [EV.mam_hunt, 'proud'], [EV.mam_draw, 'suspicious'], [EV.mam_pic, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 660, y: 1500, s: 0.95, look: t < EV.mam_draw ? [0.7, -0.4] : [-0.7, 0.1], prop: 'spear', propAng: -0.1, tailUp: t > EV.mam_pic, light: { side: -1, rim: '#ffb060' } }),
    cam: () => [[S0.mammoth, 600, 1080, 0.06], [EV.mam_hunt, 680, 1040, 0.04], [EV.mam_draw, 420, 1180, 0.12], [EV.mam_pic, 540, 1000, 0.02], [S1.mammoth, 540, 990, 0.06]]
  };
  // ---------------------------------------------------------------- переход В сцену: искры салюта → звёзды и искры костра
  TRANS_IN.mammoth = { a: 0.26, b: 0.4, runA: 1, fx(k, t, A, B) {
    const q = sm(k); drawBuf(A, 1 + q * 0.1); scr(() => screenFill('#0a0a18', Math.min(1, q * 1.6)));
    if (k > 0.45) drawBuf(B, 1, 540, 960, sm((k - 0.45) / 0.55));
    scr(() => { for (let i = 0; i < 90; i++) { const r = rng(i * 13 + 4), x0 = r() * W, y0 = 300 + r() * 900, x = lerp(x0, 420 + (r() - 0.5) * 300, sm((k - 0.3) / 0.7) * (i % 2)), y = lerp(y0, i % 2 ? 1300 - r() * 500 : r() * 700, sm((k - 0.3) / 0.7));
      glow(x, y, 10 + r() * 14, i % 2 ? 'rgba(255,170,80,1)' : 'rgba(255,250,230,1)', 0.9 * (1 - sm((k - 0.8) / 0.2))); } });
  } };
})();
