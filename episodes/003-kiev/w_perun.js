/* 003 — сцена `perun`: 988, круча над Днепром. Идол Перуна: деревянный, голова серебряная, усы золотые (ПВЛ, 980).
   При крещении Владимир велел привязать его к коню, бить палками (12 мужей) и сбросить в Днепр (ПВЛ, 988).
   Том в льняной рубахе с вышивкой и с палкой. Переход В сцену: грамота раскалывается на куски сургуча и осыпается. */
(() => {
  const nrm = s => s.toLowerCase().replace(/[^а-яёa-z0-9-]/g, '');
  const wt = (k, w) => {
    const c = CAPS.find(c => c.key === k && c.words.some(x => nrm(x) === nrm(w))); if (!c) return WT(k, w);
    const i = c.words.findIndex(x => nrm(x) === nrm(w)); const L = c.words.map(x => x.length + 1), tot = L.reduce((a, b) => a + b, 0), pre = L.slice(0, i).reduce((a, b) => a + b, 0);
    return c.t0 + (c.t1 - c.t0) * pre / tot;
  };
  EV.per_gold = wt('s6', 'золотыми');             // блеск усов
  EV.per_vlad = wt('s6', 'Владимир');             // князь указывает
  EV.per_beat = wt('s6', 'отлупить');             // удары палками
  EV.per_fall = wt('s6', 'Днепр!') - 0.15;        // идол валится и катится в реку
  const BEATS = [0, 0.22, 0.44, 0.62].map(d => EV.per_beat + d);
  EV.per_splash = Math.min(EV.per_fall + 0.75, S1.perun - 0.1);
  SHAKES.push(...BEATS.map(b => [b, 0.12, 6]), [EV.per_splash, 0.3, 12]);
  KEYW.push('палками', 'Днепр!');

  const IX = 380, IY = 1330;
  function idolSt(t) {                                               // положение идола: качание от ударов, падение, скольжение к воде
    let wob = 0; for (const b of BEATS) if (t > b && t < b + 0.3) wob += Math.sin((t - b) * 40) * 0.05 * (1 - (t - b) / 0.3);
    if (t < EV.per_fall) return { x: IX, y: IY, rot: wob, a: 1 };
    const q = clamp((t - EV.per_fall) / (EV.per_splash - EV.per_fall)), rot = Math.min(1.5, sm(q / 0.35) * 1.5);
    return { x: IX + Math.pow(q, 1.4) * 600, y: IY + Math.pow(q, 1.6) * 330, rot, a: 1 - sm((q - 0.85) / 0.15) };
  }
  function idol(t) {
    const S = idolSt(t); if (S.a <= 0) return;
    push(S.x, S.y, 1, S.rot); ctx.save(); ctx.globalAlpha = S.a;
    const b = shape([[-96, 0], [-100, -300], [-118, -400], [-90, -446], [90, -446], [118, -400], [100, -300], [96, 0]], { wash: '#8a5a32', washA: 1, w: 3, col: '#2a1608', key: 7700 });
    fstr(b.path, b.bb, 30, 1.57, 60, '#4a2c14', 0.5, 7701); shadeG(b.path, 70, 0, -40, 0, '#3a2010', 0.5);
    for (const y of [-120, -260]) { rect(-74, y - 12, 148, 24, { wash: '#6a4224', washA: 1, w: 2, col: '#2a1608' }); for (let k = 0; k < 7; k++) pencil([[-64 + k * 20, y - 10], [-54 + k * 20, y + 10]], { w: 2, col: '#2a1608', pass2: false }); }
    blob([[-60, -330], [-100, -250], [-90, -200], [-50, -280]], { wash: '#8a5a32', washA: 1, w: 2.4, col: '#2a1608' }); blob([[60, -330], [110, -260], [96, -210], [50, -280]], { wash: '#8a5a32', washA: 1, w: 2.4, col: '#2a1608' });
    // голова — серебро
    const hp = blob([[-96, -440], [-104, -540], [-84, -610], [84, -610], [104, -540], [96, -440]], { wash: '#b8bec4', washA: 1, w: 3, col: '#2a3036', key: 7702 }); metalG(hp.path, 30, -580, 160, '#ffffff', '#b8bec4', '#4a5058');
    for (const sd of [-1, 1]) { ell(sd * 34, -560, 18, 10, { wash: '#2a3036', washA: 1, w: 2 }); pencil([[sd * 14, -590], [sd * 56, -600]], { w: 4, col: '#2a3036', pass2: false }); }
    poly([[-8, -560], [8, -560], [12, -520], [-12, -520]], { wash: '#9aa0a6', washA: 1, w: 1.8, col: '#2a3036' });
    // золотые усы (с блеском)
    for (const sd of [-1, 1]) { const m = shape(tubeP([[0, -506], [sd * 40, -500], [sd * 80, -514], [sd * 100, -540], [sd * 92, -556]], 22, 8), { wash: '#d6a842', washA: 1, w: 2.2, col: '#6a4a08' }); metalG(m.path, sd * 50, -514, 70, '#fff2b0', '#d6a842', '#7a5414'); }
    const gl = t > EV.per_gold && t < EV.per_gold + 0.7 ? Math.sin(clamp((t - EV.per_gold) / 0.7) * Math.PI) : 0; if (gl > 0) { glow(70, -530, 120 * gl, 'rgba(255,240,170,1)', 0.95); for (let k = 0; k < 4; k++) { const a = k * 1.57 + t; pencil([[70, -530], [70 + Math.cos(a) * 90 * gl, -530 + Math.sin(a) * 90 * gl]], { w: 4, col: '#fff6c8', a: gl, pass2: false }); } }
    pencil([[-30, -480], [0, -470], [30, -480]], { w: 3, col: '#2a3036', pass2: false });
    const hm = blob([[-100, -600], [-80, -680], [0, -760], [80, -680], [100, -600]], { wash: '#b8bec4', washA: 1, w: 3, col: '#2a3036', key: 7703 }); metalG(hm.path, 30, -680, 140, '#ffffff', '#b8bec4', '#4a5058');
    rect(-104, -616, 208, 20, { wash: '#d6a842', washA: 1, w: 2, col: '#6a4a08' }); pencil([[0, -760], [0, -800]], { w: 6, col: '#d6a842', pass2: false });
    const bd = blob([[-60, -470], [-50, -400], [0, -370], [50, -400], [60, -470], [0, -456]], { wash: '#c8ccd0', washA: 1, w: 2.2, col: '#2a3036' }); metalG(bd.path, 20, -440, 80, '#ffffff', '#b8bec4', '#4a5058');
    ctx.restore(); pop();
    for (const b2 of BEATS) if (t > b2 && t < b2 + 0.28) { const q = (t - b2) / 0.28; push(IX + (b2 * 997 % 1 - 0.5) * 160, IY - 380 - (b2 * 613 % 1) * 200, 0.6 + q); ctx.save(); ctx.globalAlpha = 1 - q;
      poly([...Array(16)].map((_, i) => { const a = i / 16 * 6.283, r = i % 2 ? 26 : 60; return [Math.cos(a) * r, Math.sin(a) * r]; }), { wash: '#fff2c0', washA: 1, w: 2.4, col: '#6a3a08' }); txt('БУМ', 0, 2, 26, { font: 'Osw', col: '#6a1a08' }); ctx.restore(); pop(); }
  }
  function man(x, y, s, t, k, phase) {                               // дружинник с палкой, лупит идола
    const sw = t > EV.per_beat && t < EV.per_fall ? Math.sin((t - EV.per_beat) * 14 + phase) : -0.6;
    push(x, y, s, 0, k % 2 ? -1 : 1);
    blob([[-40, 0], [-46, -150], [-30, -200], [30, -200], [46, -150], [40, 0]], { wash: '#e8e0cc', washA: 1, w: 2.2, col: '#3a2a1a', key: 7710 + k });
    for (let q = 0; q < 5; q++) pencil([[-40 + q * 20, -30], [-30 + q * 20, -10]], { w: 2.4, col: '#a8241e', pass2: false }); rect(-44, -90, 88, 12, { wash: '#a8241e', washA: 1, w: 1.4 });
    ell(0, -228, 26, 30, { wash: '#d8b090', washA: 1, w: 2, col: '#3a2a1a' }); blob([[-26, -228], [0, -262], [26, -228], [18, -214], [-18, -214]], { wash: '#6a4a2a', washA: 1, w: 1.6 }); blob([[-20, -214], [0, -186], [20, -214]], { wash: '#8a6a4a', washA: 1, w: 1.4 });
    push(30, -170, 1, -0.6 - sw * 0.9); pencil([[0, 0], [130, -10]], { w: 9, col: '#6a4424' }); ell(132, -10, 9, 8, { wash: '#5a3418', washA: 1, w: 1.4 }); pop();
    pop();
  }
  function prince(x, y, t) {                                         // князь Владимир на круче: указывает на реку
    const pt = t > EV.per_vlad ? sm((t - EV.per_vlad) / 0.3) : 0; push(x, y, 1.55);
    blob([[-60, 0], [-70, -200], [-46, -260], [46, -260], [70, -200], [60, 0]], { wash: '#8a1a22', washA: 1, w: 2.4, col: '#2a0608', key: 7720 }); for (let k = 0; k < 5; k++) ell(0, -240 + k * 40, 5, 5, { wash: '#d6a842', washA: 1, w: 1 });
    rect(-62, -120, 124, 14, { wash: '#d6a842', washA: 1, w: 1.4, col: '#6a4a08' });
    ell(0, -296, 34, 38, { wash: '#e0b894', washA: 1, w: 2, col: '#3a2a1a' }); blob([[-34, -290], [-20, -240], [0, -226], [20, -240], [34, -290], [0, -270]], { wash: '#6a4a2a', washA: 1, w: 1.8 });
    blob([[-40, -320], [-36, -366], [0, -380], [36, -366], [40, -320]], { wash: '#a8241e', washA: 1, w: 2, col: '#3a0808' }); rect(-44, -330, 88, 20, { wash: '#4a3020', washA: 1, w: 1.8 });
    pencil([[40, -220], [40 + 90 * pt, -230 - 40 * pt]], { w: 18, col: '#8a1a22' }); ell(44 + 96 * pt, -232 - 42 * pt, 12, 10, { wash: '#e0b894', washA: 1, w: 1.6 });
    pop();
  }
  function river(t) {
    const p = poly([[-300, 1520], [1500, 1440], [1500, 2400], [-300, 2400]], { wash: '#4a7a92', washA: 1, w: 2, col: '#1e3a4a', key: 7730 });
    for (let k = 0; k < 14; k++) { const y = 1540 + k * 30, x = ((t * 40 + k * 137) % 1500) - 200; pencil([[x, y], [x + 80, y - 4], [x + 160, y]], { w: 2.4, col: '#c8e0ea', a: 0.6, pass2: false }); }
    if (t > EV.per_splash - 0.02) { const q = clamp((t - EV.per_splash) / 0.6), sx = IX + 600, sy = IY + 330;
      for (let i = 0; i < 18; i++) { const a = -Math.PI * (0.1 + 0.8 * i / 17), d = q * (300 + (i % 4) * 90); ell(sx + Math.cos(a) * d, sy + Math.sin(a) * d * 1.4 + q * q * 300, 14 * (1 - q) + 4, 18 * (1 - q) + 4, { wash: '#e8f4f8', washA: 1 - q, w: 1.4, col: '#3a6a82' }); }
      blob([[sx - 140 * (0.4 + q), sy], [sx - 60, sy - 220 * Math.sin(q * Math.PI)], [sx, sy - 300 * Math.sin(q * Math.PI)], [sx + 60, sy - 220 * Math.sin(q * Math.PI)], [sx + 140 * (0.4 + q), sy]], { wash: '#e8f4f8', washA: 0.9 * (1 - q), w: 2, col: '#3a6a82' }); }
  }

  WORLD.perun = (t, u, cat) => {
    lay(30, () => { vgrad(-600, 1600, ['#9ac2d8', '#e8e2c8', '#f0d8a8']); glow(900, 700, 500, 'rgba(255,236,190,1)', 0.6); });
    lay(16, () => { sil([[-400, 1450], [1500, 1380], [1500, 1600], [-400, 1600]], '#8aa088', 0.8); for (let k = 0; k < 20; k++) { const x = -300 + k * 90; sil([[x, 1410], [x + 20, 1360 - (k % 3) * 20], [x + 40, 1410]], '#5a7a5a', 0.6); } haze('#e8e2c8', 0.25); });
    lay(1.4, () => { river(t); });
    lay(1, () => { const g = poly([[-400, 1300], [560, 1330], [900, 1420], [1100, 1560], [1100, 2400], [-400, 2400]], { wash: '#7a8a4a', washA: 1, w: 2.6, col: '#2a3014', key: 7740 }); hatch(g.path, g.bb, { gap: 8, a: 0.2, col: '#2a3014', ang: -0.4, key: 7741 });
      poly([[600, 1340], [900, 1430], [1100, 1580], [1100, 2400], [1000, 2400], [880, 1500]], { wash: '#a88a5a', washA: 1, w: 2, col: '#3a2a14' });
      prince(60, 1310, t); man(190, 1340, 1.5, t, 0, 0); idol(t); man(560, 1350, 1.5, t, 1, 1.5); cat(); });
  };
  DIR.perun = {
    outfit: 'rubakha', light: { side: 1, rim: '#fff0c8' }, grade: ['#c8a060', 0.1],
    act: () => [[S0.perun, 'smug'], [EV.per_gold, 'awe'], [EV.per_vlad, 'sideeye'], [EV.per_beat, 'grin'], [EV.per_fall, 'laugh']],
    pose: (t, u, b) => { const hit = t > EV.per_beat && t < EV.per_fall; return Object.assign(b, {
      x: 780, y: 1440, s: 1.0, look: t > EV.per_fall ? [0.6, 0.4] : [-0.7, -0.4], prop: 'stick', propAng: hit ? -1.2 + Math.sin((t - EV.per_beat) * 14) * 0.9 : -0.3,
      hand: hit ? [-90, -330 + Math.sin((t - EV.per_beat) * 14) * 60] : undefined, tilt: hit ? Math.sin((t - EV.per_beat) * 14) * 0.05 : 0, tailUp: t > EV.per_fall }); },
    cam: () => [[S0.perun, 420, 880, 0.16], [EV.per_gold + 0.3, 440, 860, 0.2], [EV.per_vlad, 460, 1000, 0.06], [EV.per_beat, 520, 1060, 0.04], [EV.per_fall, 600, 1140, 0.04], [EV.per_splash, 760, 1260, 0.08], [S1.perun, 780, 1280, 0.1]]
  };
  // ---------------------------------------------------------------- переход В сцену: кадр-грамота раскалывается и осыпается кусками сургуча
  TRANS_IN.perun = { a: 0.24, b: 0.36, runA: 0, holdA: true, fx(k, t, A, B) {
    drawBuf(B, 1.05 - 0.05 * sm(k));
    const N = 6, M = 10, cw = W / N, ch = H / M;
    for (let i = 0; i < N; i++) for (let j = 0; j < M; j++) { const r = rng(i * 31 + j * 7 + 3), delay = (r() * 0.3 + (M - j) * 0.02), q = clamp((k - delay) / 0.6); if (q >= 1) continue;
      const x0 = i * cw, y0 = j * ch, dx = (r() - 0.5) * 200 * q, dy = q * q * 1600, rot = (r() - 0.5) * 2 * q;
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(x0 + cw / 2 + dx, y0 + ch / 2 + dy); ctx.rotate(rot); ctx.beginPath(); ctx.moveTo(-cw / 2 - r() * 10, -ch / 2); ctx.lineTo(cw / 2 + 6, -ch / 2 - r() * 12); ctx.lineTo(cw / 2, ch / 2 + 8); ctx.lineTo(-cw / 2 + r() * 12, ch / 2); ctx.closePath(); ctx.clip();
      ctx.drawImage(A, -(x0 + cw / 2), -(y0 + ch / 2)); ctx.strokeStyle = '#a8201e'; ctx.lineWidth = 6; ctx.stroke(); ctx.restore(); }
  } };
})();
