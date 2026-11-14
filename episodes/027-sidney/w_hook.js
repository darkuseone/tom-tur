/* 027 — сцена `hook`: 2026, Круговая пристань на закате. Справа — опера в оранжевом свете, слева за ней — мост-«вешалка» против
   солнца, по заливу идут паромы и яхты, на набережной — туристы с телефонами, уличный музыкант, чайки, какаду на перилах.
   С паруса оперы свисает огромный ценник «$7 МЛН»: на «В четырнадцать раз» Том бьёт по нему лапой — бирка крутится и показывает
   «$102 МЛН», на «Кто заплатил?» — «?». На «Отматываем» у Тома в лапе бумеранг. Главный свет — закатное солнце слева.
   Планы — window.SQ для today/button. */
(() => {
  EV.hk_tag = 0.35;
  EV.hk_14 = Math.max(wtk('h1', 'четырнадцать'), 0.65);
  EV.hk_opera = wtk('h1', 'Опера');
  EV.hk_q = wtk('h1', 'заплатил?');
  KEYW.push('дороже', 'Сиднея.', 'заплатил?');
  SHAKES.push([EV.hk_tag + 0.05, 0.25, 8]);
  const L = SY.ink, SUN = [180, 860];
  function sky(t) { vgrad(-900, 1200, ['#2a2a5a', '#7a4a6a', '#e8784a', '#ffc87a'], 1); glow(SUN[0], SUN[1], 240, 'rgba(255,200,120,1)', 0.45); ell(SUN[0], SUN[1], 64, 64, { wash: '#fff2c8', washA: 1, line: false });
    for (let i = 0; i < 5; i++) { const r = rng(3210 + i), y = 420 + i * 80; blob([[-200 + r() * 300, y], [300 + r() * 400, y - 26], [800 + r() * 300, y - 8], [1300, y + 14], [300, y + 26]], { wash: i < 2 ? '#9a5a7a' : '#f0905a', washA: 0.35, line: false }); }
    for (let i = 0; i < 6; i++) { const r = rng(3220 + i), x = ((r() * 1300 + t * 30) % 1400) - 150, y = 480 + r() * 260; push(x, y, 0.6); pencil([[-20, -6 + Math.sin(t * 8 + i) * 6], [0, 0], [20, -6 + Math.sin(t * 8 + i) * 6]], { w: 3, col: '#2a2a30', pass2: false }); pop(); } }
  function far(t) { hills(980, 30, '#5a3a5a', 3221); for (let i = 0; i < 9; i++) { const x = -100 + i * 150, h = 120 + (i * 37) % 160; rect(x - 40, 980 - h, 80, h, { wash: '#5a3a5a', washA: 1, line: false }); }
    harbourB(260, 1010, 0.6, t, { col: '#3a2a3a' }); depthFog('#e88a6a', 0.07); }
  function harbour(t) {                                              // залив: блики, паромы, яхты, опера справа
    vgrad(1000, 1380, ['#e88a5a', '#6a5a8a', '#2a3a6a'], 1);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const r = rng(hsh(FRAME, 3222)); for (let i = 0; i < 50; i++) { const y = 1010 + r() * 340, w = 20 + r() * 70; ctx.fillStyle = `rgba(255,200,130,${0.35 * r()})`; ctx.fillRect(SUN[0] - 100 + r() * 260 + (y - 1010) * 0.2 - w / 2, y, w, 3); } ctx.restore();
    ferrySY(520 - (t * 16) % 160, 1120, 0.42, t, { lit: 1 }); for (const [x, y] of [[180, 1180], [380, 1240]]) { push(x, y + Math.sin(t * 2 + x) * 4, 0.5); shape([[-60, 0], [60, 0], [44, 20], [-44, 20]], { wash: '#f4f2ec', washA: 1, w: 1.6, col: L }); shape([[0, 0], [0, -150], [60, -10]], { wash: '#f4f2ec', washA: 1, w: 1.6, col: L }); pop(); }
    operaH(800, 1200, 1.15, t, { lit: 0 });
    const sw = Math.sin(t * 2) * 0.06 + (t > EV.hk_tag ? Math.exp(-(t - EV.hk_tag) * 5) * Math.sin((t - EV.hk_tag) * 18) * 0.3 : 0), fl = t > EV.hk_14 ? Math.abs(Math.cos(clamp((t - EV.hk_14) / 0.4) * Math.PI)) : 1, back = t > EV.hk_14 + 0.2;
    pencil([[820, 830], [820 + Math.sin(sw) * 160, 830 + 160]], { w: 4, col: '#3a2a1a', pass2: false });
    push(820 + Math.sin(sw) * 220, 830 + 220, 1.5, -sw); const w = 220 * fl; shape([[-w / 2, -60], [w / 2, -60], [w / 2 + 30 * fl, 0], [w / 2, 60], [-w / 2, 60]], { wash: back ? SY.red : SY.yel, washA: 1, w: 3, col: L }); ell(w / 2 + 6, 0, 10, 10, { wash: '#2a2a30', washA: 1, line: false });
    if (fl > 0.3) txt(back ? '$102 МЛН' : '$7 МЛН', -6, 2, 44, { col: back ? '#fff2d6' : '#2a1a08', font: 'Osw', a: fl }); pop();
  }
  function quay(t) {                                                 // набережная: туристы, музыкант, фонари
    rect(-400, 1340, 1900, 30, { wash: '#c8b08a', washA: 1, w: 2, col: L }); for (let i = 0; i < 24; i++) pencil([[-380 + i * 80, 1342], [-380 + i * 80, 1260]], { w: 4, col: '#3a3a42', pass2: false }); pencil([[-400, 1262], [1500, 1262]], { w: 6, col: '#3a3a42', pass2: false });
    for (const x of [-100, 560, 1160]) { pencil([[x, 1340], [x, 1060]], { w: 7, col: '#2a2a30', pass2: false }); ell(x, 1050, 18, 22, { wash: '#ffe8a8', washA: 1, w: 2, col: L }); glow(x, 1050, 60, 'rgba(255,220,150,1)', 0.25); }
    const P = [[-60, '#2a6a9a', 'cap', 'phone', 1], [60, '#e85a6a', null, 'wave', -1], [180, '#f0c83a', 'brim', 'hold', 1], [1180, '#3a3a5a', null, 'phone', -1], [1290, '#6a9a4a', 'cap', 'hold', -1], [1400, '#e8e4dc', 'brim', 'wave', -1]];
    P.forEach(([x, c, h, a, fl], i) => human(x, 1344, 0.56, t, { body: c, hat: h, hatCol: '#3a4a6a', legs: '#2a2a32', hair: i % 2 ? '#c8a050' : '#2a1a10', armR: a === 'phone' ? 'hold' : a, prop: a === 'phone' ? 'phone' : undefined, flip: fl, seed: 3230 + i, face: 'smile' }));
    push(-170, 1344, 0.56); human(0, 0, 1, t, { body: '#8a3a2a', hat: 'brim', hatCol: '#5a3a1a', armR: 'hold', armL: 'hold', seed: 3240, beard: 'short', face: 'grin' }); pencil([[-70, -180], [80, -130]], { w: 10, col: '#a86a2a', pass2: false }); pop();   // уличный гитарист
  }
  function ground(t, o = {}) {                                       // мостовая под Томом: плитка, скамья, кофе, какаду на перилах
    rect(-400, 1420, 1900, 900, { wash: '#a8907a', washA: 1, w: 2, col: L }); for (let j = 0; j < 8; j++) for (let i = 0; i < 20; i++) rect(-400 + i * 100 + (j % 2) * 50, 1424 + j * 60, 98, 58, { wash: (i + j) % 3 ? '#b8a08a' : '#9a826c', washA: 1, w: 1.1, col: '#5a4a3a' });
    for (const [x, y, s] of [[200, 1560, 1], [760, 1720, 0.9]]) { push(x, y, s); ell(0, -30, 34, 20, { wash: '#f4f0e8', washA: 1, w: 1.6, col: L }); blob([[24, -40], [40, -70], [30, -100], [50, -110]], { wash: '#2a2a30', washA: 1, w: 1.4, col: L }); pencil(spline([[46, -108], [70, -96], [96, -70]], false, 6), { w: 4, col: '#2a2a30', pass2: false }); pencil([[-6, -12], [-10, 10]], { w: 3, col: '#2a2a30', pass2: false }); pencil([[6, -12], [10, 10]], { w: 3, col: '#2a2a30', pass2: false }); pop(); }   // ибисы
    push(560, 1600, 1); rect(-60, -260, 120, 70, { wash: '#1a5a3a', washA: 1, w: 2, col: L }); txt('CIRCULAR', 0, -238, 20, { col: '#f4f0e8', font: 'Osw' }); txt('QUAY', 0, -212, 22, { col: '#f4f0e8', font: 'Osw' }); pencil([[0, -190], [0, 0]], { w: 6, col: '#2a2a30', pass2: false }); pop();
    push(-40, 1640, 1); rect(-70, -160, 140, 160, { wash: '#e8e0d0', washA: 1, w: 2, col: L }); rect(-80, -190, 160, 36, { wash: SY.red, washA: 1, w: 1.6, col: L }); txt('GELATO', 0, -170, 20, { col: '#fff2d6', font: 'Osw' }); for (let q = 0; q < 4; q++) ell(-45 + q * 30, -120, 12, 12, { wash: ['#f8c8d8', '#fff0a0', '#a8e0c0', '#c8a080'][q], washA: 1, w: 1, col: L }); pop();
    lightPool(380, 1620, 600, 140, 'rgba(255,190,120,1)', 0.45); castShadow(380, 1612, 120, 520, 0.2, 0.4);
    push(980, 1600, 1); rect(-160, -70, 320, 20, { wash: '#7a5a3a', washA: 1, w: 2, col: L }); rect(-160, -130, 320, 18, { wash: '#7a5a3a', washA: 1, w: 2, col: L }); for (const k of [-140, 140]) pencil([[k, -50], [k, 0]], { w: 6, col: '#2a2a30', pass2: false });
    shape([[-80, -94], [-74, -132], [-50, -132], [-56, -94]], { wash: '#f4f0e8', washA: 1, w: 1.4, col: L }); pop(); cockatoo(1120, 1330, 1.2, t, 3241);
    moodDark(SUN[0], 1100, 700, 1500, '#1a1030', 0.4);
  }
  function front(t) { for (const x of [-60, 1150]) { sil([[x - 40, 2200], [x - 40, 1500], [x + 40, 1500], [x + 40, 2200]], '#1a1418', 1); ell(x, 1500, 50, 20, { wash: '#1a1418', washA: 1, line: false }); } pencil([[-100, 1520], [1180, 1560]], { w: 12, col: '#1a1418', pass2: false }); }
  window.SQ = { sky, far, harbour, quay, ground, front };
  WORLD.hook = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(20, () => far(t));
    lay(8, () => harbour(t));
    lay(3.4, () => { quay(t); depthFog('#e8907a', 0.05); });
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    lay(2.2, () => motes(26, [-100, 900, 1200, 1500], '#ffd8a0', t, 3242, { sp: 6, sz: 2.4, a: 0.5, wob: 18, add: 1 }));
  };
  DIR.hook = {
    outfit: 'hoodieSYD', light: { side: -1, rim: '#ffb46a' }, grade: ['#3a1a40', 0.08],
    act: () => [[0, 'shock'], [EV.hk_14, 'awe'], [EV.hk_opera, 'sideeye'], [EV.hk_q, 'suspicious'], [EV.h2, 'grin']],
    pose: (t, u, b) => { const sl = t < EV.hk_tag + 0.3, k = clamp(t / EV.hk_tag);
      return Object.assign(b, { x: 380, y: 1612, s: 1.0, look: t < EV.hk_q ? [0.8, -0.6] : t < EV.h2 ? [0.2, -0.3] : [0, -0.2], hand: sl ? [lerp(160, 300, k), lerp(-320, -470, k)] : t > EV.h2 ? [170, -420] : [160, -300], squash: t > EV.hk_tag && t < EV.hk_tag + 0.15 ? 0.1 : b.squash, tailUp: t > EV.h2 }); },
    afterCat: (t, u, P) => { if (t < EV.h2) return; const q = popK(t, EV.h2, 0.3); boomer(P.x + P.hand[0] * P.s + 10, P.y + P.hand[1] * P.s - 20, 0.9 * q, -0.6 + Math.sin(t * 6) * 0.1); },
    cam: () => [[0, 600, 1040, 0.06], [EV.hk_tag, 640, 1000, 0.14, 'x'], [EV.hk_14, 680, 980, 0.1], [EV.hk_q, 600, 1000, 0.06], [EV.h2, 480, 1080, 0.12], [S1.hook, 460, 1120, 0.2]]
  };
  TRANS_IN.tunnel = { a: 0.15, b: 0.35, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.globalAlpha = 1 - e; ctx.translate(540, 980); ctx.rotate(-e * 2.6); ctx.scale(1 - e * 0.7, 1 - e * 0.7); ctx.drawImage(A, -540, -980); ctx.restore(); }); } };
})();
