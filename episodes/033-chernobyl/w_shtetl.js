/* 033 — сцена `shtetl`, 1897 → 1941. Рыночная площадь местечка Чернобыль: деревянная синагога с ярусной крышей, лавки с вывесками,
   возы, гуси, хасиды в чёрных сюртуках и широкополых шляпах, торговки в платках, пристань с баржой. Главный свет — полуденное солнце
   слева (тёплые пятна, тени вправо). На «хасидов» — плашка-инфографика «1897 · ЕВРЕЕВ 59 %» со шкалой. На «Но в сорок первом» —
   свет гаснет до холодной синевы, люди исчезают, ставни закрыты, перевёрнутый воз, брошенный чемодан; у Тома гаснет керосиновая
   лампа; плашка «1941 · ОККУПАЦИЯ / НОЯБРЬ 1941: РАССТРЕЛЯНЫ ≈ 400 ЕВРЕЕВ». Без людей у ям, без символики. */
(() => {
  const L = CH.ink, SUN = [140, 520];
  EV.sh_has = wtk('s2', 'хасидов.'); EV.sh_41 = wtk('s2', 'сорок') - 0.15; EV.sh_shot = wtk('s2', 'расстреляли');
  KEYW.push('хасидов.', 'евреев.');
  const N = t => sm(clamp((t - EV.sh_41) / 0.7));
  function sky(t) { const n = N(t); vgrad(-900, 1100, [lerpC('#6a9ad8', '#0e1428', n), lerpC('#a8cce8', '#1e2a48', n), lerpC('#f8e8c8', '#3a4a6a', n)], 1);
    if (n < 1) { glow(SUN[0], SUN[1], 220, 'rgba(255,232,170,1)', 0.45 * (1 - n)); ell(SUN[0], SUN[1], 50, 50, { wash: '#fff8dc', washA: 1 - n, line: false }); }
    if (n > 0) { ell(880, 420, 40, 40, { wash: '#e8ecf4', washA: n, line: false }); glow(880, 420, 120, 'rgba(200,220,255,1)', 0.25 * n); const r = rng(5400); for (let i = 0; i < 40; i++) { ctx.fillStyle = `rgba(255,255,255,${0.6 * n})`; ctx.fillRect(r() * 1400 - 200, r() * 700 + 100, 3, 3); } }
    for (let i = 0; i < 3; i++) { const y = 300 + i * 90, dx = (t * 6) % 200; blob([[-200 + dx, y], [400 + dx, y - 20], [1000 + dx, y - 4], [1300, y + 14], [300, y + 20]], { wash: lerpC('#fff4e4', '#3a4a6a', n), washA: 0.45, line: false }); } }
  function far(t) { const n = N(t); hills(1010, 30, lerpC('#6a8a5a', '#1e2a3a', n), 2.3); river(990, 1040, t, { col: lerpC('#5aa0b0', '#1a2a40', n), colD: lerpC('#2a6a80', '#0e1626', n), hl: n > 0.5 ? '#8aa0c8' : '#e8fbff' });
    push(1000, 1010, 0.5); blob([[-200, 0], [-170, 30], [170, 30], [200, 0]], { wash: '#5a3a22', washA: 1, w: 2, col: L }); rect(-140, -50, 200, 50, { wash: '#8a6a4a', washA: 1, w: 1.6, col: L }); pencil([[60, 0], [60, -200]], { w: 5, col: '#4a3a2a', pass2: false }); pop();
    for (let i = 0; i < 9; i++) { const r = rng(5410 + i); khata(-200 + i * 170, 1030, 130 + r() * 40, 70 + r() * 20, t, { wall: lerpC('#e8e0cc', '#4a5468', n), roof: lerpC(i % 2 ? '#8a7a6a' : CH.thatch, '#2a3040', n), win: 1, trim: lerpC('#3a7ab0', '#2a3448', n), lit: n > 0.5 && i === 3, s: 0.7 }); }
    depthFog(n > 0.5 ? '#2a3a5a' : '#f8ecd8', 0.06); }
  function square(t) {                                               // синагога, лавки, вывески, возы, гуси, люди
    const n = N(t), wall = c => lerpC(c, '#3a4258', n * 0.8);
    push(820, 1200, 1); const W1 = wall('#a87a4a');
    rect(-200, -280, 400, 280, { wash: W1, washA: 1, w: 2.4, col: L, shade: { gap: 12, a: 0.25, col: CH.woodD, ang: 0 } });
    poly([[-240, -280], [-150, -380], [150, -380], [240, -280]], { wash: wall('#5a4a3a'), washA: 1, w: 2.4, col: L, shade: { gap: 8, a: 0.3, col: '#2a1a10', ang: 1 } });
    rect(-130, -440, 260, 60, { wash: W1, washA: 1, w: 2, col: L }); poly([[-170, -440], [-90, -520], [90, -520], [170, -440]], { wash: wall('#5a4a3a'), washA: 1, w: 2.2, col: L, shade: { gap: 8, a: 0.3, col: '#2a1a10', ang: 1 } });
    rect(-50, -560, 100, 40, { wash: W1, washA: 1, w: 2, col: L }); poly([[-70, -560], [0, -620], [70, -560]], { wash: wall('#5a4a3a'), washA: 1, w: 2, col: L });
    for (let i = 0; i < 4; i++) { rect(-170 + i * 90, -230, 50, 80, { wash: n > 0.5 ? '#141a28' : '#ffe0a0', washA: 1, w: 1.6, col: L }); ell(-145 + i * 90, -230, 25, 18, { wash: n > 0.5 ? '#141a28' : '#ffe0a0', washA: 1, w: 1.4, col: L }); }
    rect(-50, -130, 100, 130, { wash: wall('#5a3a1e'), washA: 1, w: 2, col: L }); pop();
    const shops = [[-120, 'ЛАВКА', '#3a7ab0'], [170, 'ЧАЙ · САХАР', '#a8281e'], [1180, 'КОЖИ', '#2a6a3a']];
    shops.forEach(([x, s1, c], i) => { push(x, 1220, 0.95); rect(-140, -200, 280, 200, { wash: wall(['#e8dcc0', '#d8c8a0', '#e0d4b8'][i]), washA: 1, w: 2.2, col: L, shade: { gap: 11, a: 0.08, col: '#6a5a4a', ang: 1.3 } });
      poly([[-160, -200], [0, -270], [160, -200]], { wash: wall('#7a8a96'), washA: 1, w: 2, col: L }); rect(-110, -190, 220, 40, { wash: wall(c), washA: 1, w: 1.6, col: L }); txt(s1, 0, -170, 26, { col: '#fff6e0', font: 'Osw' });
      if (n < 0.5) { rect(-100, -140, 90, 90, { wash: '#ffe8b0', washA: 1, w: 1.4, col: L }); poly([[-130, -40], [130, -40], [110, -10], [-110, -10]], { wash: ['#c83a2a', '#2a6aa8', '#e8b030'][i], washA: 1, w: 1.6, col: L });
        for (let q = 0; q < 6; q++) ell(-90 + q * 34, -50, 12, 10, { wash: ['#c8281e', '#e8b030', '#6aa040'][q % 3], washA: 1, w: 1, col: L }); }
      else { for (let q = 0; q < 2; q++) rect(-100 + q * 50, -140, 46, 90, { wash: '#2a3040', washA: 1, w: 1.6, col: L, shade: { gap: 6, a: 0.4, col: '#0a0e18', ang: 0 } }); }
      rect(30, -140, 70, 140, { wash: wall('#6a4a2a'), washA: 1, w: 1.6, col: L }); pop(); });
    if (n < 0.6) { const P = [[300, '#1a1a1e', 'brim', '#1a1a1e', 'hold', 1, 'beard'], [400, '#1a1a1e', 'brim', '#1a1a1e', 'swing', 1, 'beard'], [520, '#2a2a30', 'brim', '#1a1a1e', 'wave', 1, 'beard'], [620, '#a8584a', 'scarf', '#e8c030', 'hold', 1], [980, '#5a6a8a', 'scarf', '#c83a2a', 'hold', 1], [1080, '#1a1a1e', 'brim', '#1a1a1e', 'hold', 1, 'beard'], [-40, '#7a6a4a', 'cap', '#3a3a3a', 'swing'], [60, '#c8b89a', 'scarf', '#3a6aa8', 'hold', 1]];
      P.forEach(([x, c, h, hc, a, lg, bd], i) => human(x, 1300, 0.72, t, { body: c, skin: ['#e8c0a0', '#d8a47e', '#f0c8a0'][i % 3], hat: h, hatCol: hc, legs: '#2a2a2e', armR: a, long: lg, beard: bd ? 1 : undefined, flip: x > 600 ? -1 : 1, seed: 5420 + i, face: 'smile' })); }
    push(720, 1330, 0.8, n * 0.9); rect(-150, -90, 260, 70, { wash: '#8a5a32', washA: 1, w: 2, col: L, shade: { gap: 7, a: 0.25, col: '#3a2010', ang: 0.2 } }); for (const k of [-110, 80]) ell(k, -20, 40, 40, { wash: false, w: 5, col: '#3a2a1a' }); if (n < 0.5) for (let q = 0; q < 5; q++) ell(-120 + q * 46, -100, 22, 16, { wash: '#e8c860', washA: 1, w: 1, col: L }); pop();
    if (n < 0.5) { horse(560, 1330, 0.7, t, { col: '#8a6a4a', seed: 3 }); for (let i = 0; i < 4; i++) { const gx = 120 + i * 60 + Math.sin(t * 2 + i) * 20; push(gx, 1350, 0.5); blob([[-30, 0], [-20, -30], [20, -30], [30, -10], [10, 4]], { wash: '#f6f2ea', washA: 1, w: 1.6, col: L }); pencil([[16, -28], [28, -60]], { w: 7, col: '#f6f2ea', pass2: false }); poly([[28, -60], [44, -56], [28, -52]], { wash: '#e8a030', washA: 1, w: 1, col: L }); pop(); } }
    else { for (let i = 0; i < 7; i++) sil([[200 + i * 110, 1100], [215 + i * 110, 980], [240 + i * 110, 960], [262 + i * 110, 980], [270 + i * 110, 1100]], '#0a0e18', 0.35 * n); }
  }
  function ground(t) {                                               // булыжник, лужа, солома, корзины, чемодан на 1941
    const n = N(t); rect(-500, 1360, 2200, 1000, { wash: lerpC('#a8906a', '#3a4050', n), washA: 1, w: 2, col: L });
    const r = rng(5440); for (let i = 0; i < 110; i++) { const x = r() * 2000 - 400, y = 1380 + r() * 700; ell(x, y, 16 + r() * 16, 8 + r() * 6, { wash: lerpC(i % 2 ? '#8a7a5a' : '#c8b08a', '#2a3040', n), washA: 1, w: 1.2, col: L, a: 0.5 }); }
    push(820, 1760, 1); blob([[-160, 0], [-120, -30], [100, -34], [170, -6], [90, 26], [-110, 22]], { wash: lerpC('#8ac0d8', '#1a2a48', n), washA: 1, w: 2, col: L }); if (n > 0.5) ell(40, -6, 18, 8, { wash: '#e8ecf4', washA: 0.8, line: false }); pop();
    for (let i = 0; i < 2; i++) { push(1000 + i * 120, 1660 + i * 40, 1); blob([[-50, 0], [-46, -60], [46, -60], [50, 0]], { wash: '#c89a5a', washA: 1, w: 2, col: L, shade: { gap: 6, a: 0.3, col: '#6a4a1a', ang: 0.8 } }); if (n < 0.5) for (let q = 0; q < 4; q++) ell(-30 + q * 20, -64, 12, 10, { wash: i ? '#6aa040' : '#c8281e', washA: 1, w: 1, col: L }); pop(); }
    if (n > 0.3) { push(620, 1640, 1, 0.2); rect(-70, -60, 140, 60, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); pencil([[-20, -60], [-20, -76], [20, -76], [20, -60]], { w: 4, col: L, pass2: false }); pop();
      push(300, 1900, 1, -0.4); for (let q = 0; q < 3; q++) rect(-60 + q * 10, -14 + q * 6, 110, 12, { wash: '#e8e0d0', washA: 1, w: 1, col: L }); pop(); }
    roadSign(-40, 1520, 0.9, t, 'shtetl'); for (let i = 0; i < 4; i++) mugwort(1150 + i * 40, 1820, 1, t, 80 + i);
    if (n < 1) { lightPool(500, 1640, 900, 200, 'rgba(255,224,150,1)', 0.3 * (1 - n)); castShadow(400, 1700, 110, 520, 0.3, 0.3 * (1 - n)); }
    moodDark(540, 1200, 400 - 200 * n, 1500, n > 0.5 ? '#050812' : '#1a1408', 0.18 + 0.4 * n);
  }
  function front(t) { const n = N(t); for (const x of [-170, 1250]) { rect(x - 60, 700, 120, 1800, { wash: lerpC('#6a4a2a', '#141824', n), washA: 1, w: 2.4, col: L, shade: { gap: 12, a: 0.3, col: '#2a1a0a', ang: 0 } }); rect(x - 90, 680, 180, 40, { wash: lerpC('#5a3a1e', '#0e1220', n), washA: 1, w: 2, col: L }); } }
  function plates(t) {
    if (t > EV.sh_has && t < EV.sh_41) { const k = popK(t, EV.sh_has, 0.3), f = sm(clamp((t - EV.sh_has) / 0.8)); push(640, 1010, k, -0.02); ctx.save(); ctx.fillStyle = 'rgba(16,14,12,0.9)'; ctx.fillRect(-250, -100, 500, 200); ctx.restore();
      txt('1897 · ЕВРЕЕВ', 0, -50, 44, { col: '#ffe08a', font: 'Osw' }); rect(-210, 0, 420, 40, { wash: '#3a3a40', washA: 1, w: 2, col: '#fff6e0' }); rect(-210, 0, 420 * 0.591 * f, 40, { wash: '#e8b030', washA: 1, line: false }); txt(Math.round(59 * f) + ' %', 0, 70, 46, { col: '#fff6e0', font: 'Osw' }); pop(); }
    if (t > EV.sh_41) chBoard(620, 1000, 0.9, t, EV.sh_41 + 0.15, [['1941 · ОККУПАЦИЯ', 48, '#ff8a6a'], ['НОЯБРЬ: РАССТРЕЛЯНЫ', 40], ['≈ 400 ЕВРЕЕВ', 54, '#ffe08a']], { w: 520, edge: '#c8281e' });
  }
  WORLD.shtetl = (t, u, cat) => {
    const n = N(t); lay(40, () => sky(t)); lay(14, () => far(t)); lay(3.2, () => square(t)); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(2.4, () => motes(16, [-100, 800, 1200, 1700], n > 0.5 ? '#c8d4f0' : '#fff2c0', t, 5450, { sp: n > 0.5 ? 6 : 2, sz: 2.4, a: 0.4, wob: 12, add: 1 }));
  };
  DIR.shtetl = {
    outfit: 'director', light: { side: -1, rim: '#ffd890' }, grade: ['#2a2010', 0.05],
    act: () => [[S0.shtetl, 'grin'], [EV.sh_has, 'proud'], [EV.sh_41, 'scared'], [EV.sh_shot, 'shock'], [EV.sh_shot + 0.8, 'annoyed']],
    pose: (t, u, b) => { const n = N(t); return Object.assign(b, { x: 300, y: 1700, s: 0.9, look: t < EV.sh_41 ? [0.6, -0.4] : [0.4, 0.2], hand: [150, -300], prop: 'lantern', glow: n < 0.9 ? 1 - n : 0, tilt: n * -0.04, light: { side: -1, rim: n > 0.5 ? '#8aa8e8' : '#ffd890' } }); },
    hud: t => plates(t),
    cam: () => [[S0.shtetl, 620, 1000, -0.14], [EV.sh_has, 640, 980, -0.1], [EV.sh_41, 560, 1040, -0.02, 'x'], [S1.shtetl, 520, 1080, 0.04]]
  };
  TRANS_IN.shtetl = { a: 0.15, b: 0.3, fx(k, t, A, B) { const e = sm(k), x = lerp(-500, 1600, e); drawBuf(B); scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(x, 0, W + 600, H); ctx.clip(); ctx.drawImage(A, 0, 0); ctx.restore(); push(x, 960, 4.2, 0.3); mugwort(0, 260, 1, t, 99, {}); pop(); }); } };
})();
