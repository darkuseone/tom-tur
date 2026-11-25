/* 036 — сцена `statue`, 29.04.1894. Открытие памятника на Сенатской площади: собор и здания Энгеля в флагах (бело-синие ленты),
   толпа в праздничном, оркестр, дамы с зонтиками, военный караул, покрывало сползает с бронзовой фигуры. Главный свет — весеннее
   солнце сзади-справа (контровой на памятнике), пятна света на площади. На «памятник» — покрывало слетает, конфетти-лепестки, плашка
   «29.04.1894 · ОТКРЫТ»; на «посреди главной площади» камера отъезжает на всю площадь; Том (цилиндр) снимает шляпу. */
(() => {
  const L = FIC.ink, SUN = [980, 480];
  EV.st_put = wtk('s5', 'поставили'); EV.st_mon = wtk('s5', 'памятник'); EV.st_sq = wtk('s5', 'площади.');
  KEYW.push('памятник', 'площади.');
  function sky(t) { vgrad(-900, 1100, ['#5a8ad0', '#a8cce8', '#f4ecd8'], 1); glow(SUN[0], SUN[1], 220, 'rgba(255,240,200,1)', 0.42); ell(SUN[0], SUN[1], 50, 50, { wash: '#fffbe8', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const y = 280 + i * 80, dx = (t * 9) % 200; blob([[-200 + dx, y], [300 + dx, y - 22], [900 + dx, y - 6], [1300, y + 12], [400, y + 18]], { wash: '#ffffff', washA: 0.5, line: false }); } }
  function far(t) { cathedral(560, 1060, 0.62, t); engel(-80, 1060, 300, 220, t); engel(1160, 1060, 300, 240, t, { cols: 1 }); for (let i = 0; i < 8; i++) { const x = -100 + i * 180; pencil([[x, 900], [x + 180, 920]], { w: 3, col: '#1c3a7a', pass2: false }); for (let q = 0; q < 6; q++) poly([[x + 10 + q * 30, 906 + q * 3], [x + 24 + q * 30, 906 + q * 3], [x + 17 + q * 30, 930 + q * 3]], { wash: q % 2 ? '#ffffff' : FIC.blue, washA: 1, w: 1, col: L }); } depthFog('#f4ecd8', 0.06); }
  function square(t) {                                              // памятник с покрывалом, толпа, оркестр, караул
    const off = sm(clamp((t - EV.st_mon) / 0.6)); statueA2(640, 1240, 0.72, t, {}); if (off < 1) { push(640, 1240 - 330 * 0.72 * 0.6, 0.72); poly([[-80, -330 + off * 200], [80, -330 + off * 200], [140 + off * 300, 60], [-140 - off * 100, 60]], { wash: '#f4f0e6', washA: 1 - off * 0.8, w: 2, col: L }); pop(); }
    const P = [[180, '#1a1a1e', 'brim'], [270, '#e8d8e0', 'scarf'], [360, '#3a2a5a', 'brim'], [900, '#c8d8e8', 'scarf'], [990, '#1a1a1e', 'brim'], [1080, '#e8c8a8', 'scarf'], [-20, '#2a4a2a', 'helmet'], [80, '#2a4a2a', 'helmet']];
    P.forEach(([x, c, h], i) => human(x, 1310, 0.64, t, { body: c, hat: h, hatCol: h === 'scarf' ? '#f4f4f0' : '#1a1a1e', legs: '#2a2a2a', long: h === 'scarf' ? 1 : undefined, armR: t > EV.st_mon ? 'wave' : 'hold', prop: h === 'helmet' ? 'spear' : undefined, flip: x > 600 ? -1 : 1, seed: 11800 + i, face: t > EV.st_mon ? 'grin' : 'smile' }));
    for (let i = 0; i < 4; i++) { push(1180 + i * 60, 1300, 0.55); human(0, 0, 1, t, { body: '#1c3a7a', hat: 'police', hatCol: '#1c3a7a', legs: '#1a1a2a', armR: 'hold', flip: -1, seed: 11810 + i, face: 'calm' }); ell(-30, -200, 24, 18, { wash: '#d8b040', washA: 1, w: 1.4, col: L }); pop(); }
  }
  function ground(t) {                                              // брусчатка, лепестки, трибуна, коляска, корзины цветов
    rect(-500, 1330, 2200, 1000, { wash: '#c8c0b0', washA: 1, w: 2, col: L }); const r = rng(11820); for (let i = 0; i < 110; i++) ell(r() * 2000 - 400, 1350 + r() * 700, 14 + r() * 14, 7 + r() * 5, { wash: i % 2 ? '#b0a898' : '#dcd4c4', washA: 1, w: 1, col: L, a: 0.45 });
    if (t > EV.st_mon) for (let i = 0; i < 40; i++) { const x = r() * 1700 - 300, y = ((r() * 1800 + (t - EV.st_mon) * 260) % 1900); ell(x, y, 7, 5, { wash: ['#ffffff', '#8ab0e8', '#f8d0e0'][i % 3], washA: 1, line: false, rot: t + i }); }
    push(940, 1700, 1); rect(-120, -60, 240, 60, { wash: '#1c3a7a', washA: 1, w: 2, col: L }); rect(-130, -80, 260, 20, { wash: '#f4f4f0', washA: 1, w: 1.4, col: L }); pop();
    for (let i = 0; i < 3; i++) { push(-60 + i * 80, 1760 + (i % 2) * 30, 1); blob([[-36, 0], [-30, -46], [30, -46], [36, 0]], { wash: '#c89a5a', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 5; q++) ell(-20 + q * 10, -54 - (q % 2) * 10, 9, 9, { wash: ['#e8283a', '#f8f0f0', '#f8d030'][q % 3], washA: 1, w: 1, col: L }); pop(); }
    lightPool(640, 1560, 900, 180, 'rgba(255,240,200,1)', 0.3); castShadow(400, 1720, 110, 560, Math.PI + 0.3, 0.3); moodDark(100, 1000, 800, 1900, '#10182a', 0.12);
  }
  function extras(t) { push(1180, 1560, 0.85); for (let i = 0; i < 3; i++) { human(-60 + i * 60, 0, 1, t, { body: '#1c3a7a', hat: 'police', hatCol: '#1c3a7a', legs: '#f4f4f0', armR: 'hold', flip: -1, seed: 11830 + i, face: 'calm' }); } ell(-60, -150, 26, 30, { wash: '#d8b040', washA: 1, w: 1.4, col: L }); pop();
    push(-60, 1560, 0.85, 0, 1); human(0, 0, 1, t, { body: '#e8c8d8', hat: 'scarf', hatCol: '#f4f4f0', legs: '#2a2a2a', long: 1, armR: 'hold', seed: 11835, face: 'smile' }); pencil([[40, -200], [40, -360]], { w: 3, col: '#3a3a3a', pass2: false }); blob([[-40, -350], [40, -400], [120, -350]], { wash: '#f8e0e8', washA: 1, w: 1.6, col: L }); pop(); }
  function front(t) { for (const x of [-150, 1240]) birchTrunk(x, t, x > 0 ? 6 : 5); }
  function extras2(t) {                                             // оркестр: трубы, барабан, дирижёр; фотограф с треногой; дети на плечах
    for (let i = 0; i < 4; i++) { push(860 + i * 70, 1500, 0.7); human(0, 0, 1, t, { body: '#1c3a7a', hat: 'police', hatCol: '#1c3a7a', legs: '#1a1a2a', armR: 'hold', flip: -1, seed: 11850 + i, face: 'calm' }); if (i % 2) ell(-40, -230, 30, 22, { wash: '#d8b040', washA: 1, w: 1.4, col: L }); else { ell(-30, -150, 40, 30, { wash: '#f4f4f0', washA: 1, w: 2, col: L }); pencil([[-60, -170], [-80, -200 + Math.sin(t * 10) * 10]], { w: 3, col: '#5a3a1a', pass2: false }); } pop(); }
    push(220, 1520, 0.8); for (const d of [-1, 0, 1]) pencil([[0, -200], [d * 60, 0]], { w: 4, col: '#4a3a2a', pass2: false }); rect(-50, -280, 100, 80, { wash: '#4a3a2a', washA: 1, w: 2, col: L }); ell(0, -240, 24, 24, { wash: '#2a2a2e', washA: 1, w: 1.6, col: L }); human(90, 0, 1, t, { body: '#3a3a44', hat: 'brim', hatCol: '#1a1a1e', legs: '#1a1a1e', armR: 'hold', flip: -1, seed: 11855, face: 'calm' }); if (Math.sin(t * 4) > 0.9) glow(0, -280, 100, 'rgba(255,255,240,1)', 0.6); pop();
    push(80, 1560, 0.8); human(0, 0, 1, t, { body: '#5a4a3a', hat: 'cap', hatCol: '#2a2a2a', legs: '#2a2a2a', armR: 'wave', seed: 11856, face: 'grin' }); human(0, -300, 0.55, t, { body: '#e8d8a0', legs: '#2a3a6a', armR: 'wave', seed: 11857, face: 'grin' }); pop();
    for (let i = 0; i < 2; i++) { push(380 + i * 360, 1600 + i * 20, 0.8); rect(-110, -60, 220, 18, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); rect(-110, -110, 220, 14, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (const k of [-90, 90]) pencil([[k, -42], [k, 0]], { w: 6, col: '#2a2a2a', pass2: false }); human(-40, -40, 0.7, t, { body: ['#5a6a8a', '#8a5a4a'][i], hat: i ? 'scarf' : 'cap', hatCol: '#3a3a3a', legs: '#2a2a2a', long: i ? 1 : undefined, armR: 'hold', seed: 12300 + i + 10, face: 'smile' }); pop(); }
    for (let i = 0; i < 6; i++) { const x = ((t * 50 + i * 260) % 1700) - 200, y = 560 + (i % 3) * 40 + Math.sin(t * 2 + i) * 14; push(x, y, 1); pencil([[-22, Math.sin(t * 8 + i) * 8], [0, 0], [22, Math.sin(t * 8 + i) * 8]], { w: 4, col: '#1a1a1e', pass2: false }); pop(); }
    for (let i = 0; i < 4; i++) { push(-120 + i * 90, 1880 + (i % 2) * 20, 1); blob([[-40, 0], [-20, -24], [30, -20], [44, 0]], { wash: '#ffffff', washA: 0.95, w: 1.2, col: '#a8b4c4' }); pop(); }
    for (let i = 0; i < 2; i++) { push(-100 + i * 1380, 1500, 0.8); pencil([[0, 0], [0, -420]], { w: 7, col: '#2a2a2e', pass2: false }); pencil([[0, -420], [50, -440]], { w: 5, col: '#2a2a2e', pass2: false }); rect(30, -470, 50, 56, { wash: '#ffd890', washA: 1, w: 2, col: L }); glow(55, -440, 50, 'rgba(255,210,130,1)', 0.3); ell(55, -476, 30, 8, { wash: '#ffffff', washA: 0.9, line: false }); pop(); }
  }
  WORLD.statue = (t, u, cat) => {
    lay(40, () => sky(t)); lay(14, () => far(t)); lay(3.2, () => square(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(2, () => { rays(SUN[0], SUN[1], 2.4, 0.35, 1400, 'rgba(255,240,200,1)', 0.12, 5, t); motes(14, [-100, 700, 1200, 1600], '#fff8e0', t, 11840, { sp: 2, sz: 2.4, a: 0.4, wob: 16, add: 1 }); });
  };
  DIR.statue = {
    outfit: 'victorian', light: { side: 1, rim: '#fff0c8' }, grade: ['#1a2030', 0.04],
    act: () => [[S0.statue, 'smug'], [EV.st_mon, 'awe'], [EV.st_sq, 'proud']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1720, s: 0.95, look: [0.6, -0.7], hand: t > EV.st_mon ? [60, -420] : [150, -300], noHat: t > EV.st_mon + 0.1 }),
    hud: t => fiBoard(640, 1000, 0.8, t, EV.st_mon + 0.1, [['29.04.1894', 54, '#ffe08a'], ['ПАМЯТНИК ОТКРЫТ', 48]], { w: 480 }),
    cam: () => [[S0.statue, 620, 960, 0.02], [EV.st_mon, 640, 940, 0.04], [EV.st_sq, 600, 980, -0.12], [S1.statue, 600, 980, -0.14]]
  };
  TRANS_IN.statue = { a: 0.12, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const a = Math.sin(e * Math.PI); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#f4f0e6'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, H * e * 1.4); ctx.lineTo(0, H * e); ctx.closePath(); ctx.fill(); ctx.restore(); }); } };
})();
