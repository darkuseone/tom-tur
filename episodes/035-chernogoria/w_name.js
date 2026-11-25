/* 035 — сцена `name`, XV век. Которский залив глазами венецианцев: галера с алыми парусами входит в залив, над ним — гора Ловчен,
   чёрная от густого леса; картограф на палубе выводит на карте «MONTE NEGRO»; рыбаки в лодках, чайки, деревушка на берегу.
   Главный свет — утреннее солнце слева, гора в собственной тени (чёрная), золото на парусах. На «Монте-Негро» картограф пишет
   название (рукопись на карте); на «Чёрная гора» гора темнеет ещё сильнее; на «лесов» плашка «CRNA GORA = MONTE NEGRO = ЧЁРНАЯ ГОРА».
   Том (моряк) стоит на носу галеры и указывает на гору. */
(() => {
  const L = MEC.ink, SUN = [120, 520];
  EV.nm_mn = wtk('s1', 'Монте-Негро'); EV.nm_black = wtk('s1', '«Чёрная'); EV.nm_wood = wtk('s1', 'лесов');
  KEYW.push('гора»:', 'Ловчена.');
  const D = t => sm(clamp((t - EV.nm_black) / 0.6));
  function sky(t) { vgrad(-900, 1100, ['#5a7ab0', '#a8c4e0', '#f8e0b8'], 1); glow(SUN[0], SUN[1], 220, 'rgba(255,224,170,1)', 0.45); ell(SUN[0], SUN[1], 50, 50, { wash: '#fff4d8', washA: 1, line: false });
    for (let i = 0; i < 4; i++) { const y = 260 + i * 80, dx = (t * 9) % 200; blob([[-200 + dx, y], [300 + dx, y - 22], [900 + dx, y - 6], [1300, y + 12], [400, y + 18]], { wash: '#fff2e0', washA: 0.5, line: false }); }
    for (let i = 0; i < 5; i++) { const x = 400 + i * 120 + Math.sin(t + i) * 30, y = 600 + (i % 2) * 30; pencil([[x - 12, y - Math.sin(t * 9 + i) * 6], [x, y], [x + 12, y - Math.sin(t * 9 + i) * 6]], { w: 3, col: '#f4f4f4', pass2: false }); } }
  function lovcen(t) { const d = D(t); blackMountain(-400, 1600, 1060, 700, t, 9400, { col: lerpC('#3a4436', '#141a14', d), forest: lerpC('#1e2a1c', '#080c08', d), trees: 60 }); depthFog('#e8e4d8', 0.06 * (1 - d)); }
  function bay(t) { sea(1060, 1240, t, { col: '#2a80a8' }); for (let i = 0; i < 5; i++) { const r = rng(9410 + i); stoneHouse(-120 + i * 130 + (i > 2 ? 700 : 0), 1080, 90 + r() * 30, 70 + r() * 20, t, { col: '#d8ccb4' }); }
    for (let i = 0; i < 3; i++) boat(180 + i * 360, 1190 + (i % 2) * 20, 0.5, t, { col: '#8a5a32', stripe: '#5a3a1a' }); }
  function galley(t) {                                              // венецианская галера: алые паруса, вёсла, львиный стяг, картограф
    const gx = lerp(1300, 760, sm(clamp((t - S0.name) / 3))); push(gx, 1290, 0.95);
    blob([[-420, -40], [-380, 30], [360, 30], [460, -60], [300, -70], [-300, -70]], { wash: '#7a4a2a', washA: 1, w: 2.6, col: L, shade: { gap: 9, a: 0.25, col: '#3a1a0a', ang: 0 } }); rect(-360, -70, 700, 16, { wash: MEC.gold, washA: 1, w: 1.4, col: L });
    for (let i = 0; i < 12; i++) { const ox = -330 + i * 56, a = Math.sin(t * 3 + i * 0.4) * 0.3; pencil([[ox, -10], [ox - 40 + Math.cos(a) * 20, 90 + Math.sin(a) * 20]], { w: 4, col: '#5a3a1a', pass2: false }); }
    for (const mx of [-120, 160]) { pencil([[mx, -70], [mx, -520]], { w: 7, col: '#4a3a2a', pass2: false }); const pts = []; for (let q = 0; q <= 10; q++) pts.push([mx + 10 + Math.sin(t * 2 + q) * 4 + q * 22, -500 + q * 40]); poly([[mx, -500], [mx + 240, -360], [mx, -120]], { wash: MEC.red, washA: 1, w: 2, col: L, shade: { gap: 10, a: 0.2, col: '#5a0a08', ang: 0.8 } }); }
    rect(340, -200, 90, 60, { wash: MEC.red, washA: 1, w: 1.6, col: L }); push(385, -170, 0.4); blob([[-50, 20], [-40, -20], [20, -30], [50, -10], [30, 20]], { wash: MEC.gold, washA: 1, w: 1.4, col: L }); pop(); pencil([[340, -200], [340, -70]], { w: 4, col: '#4a3a2a', pass2: false });
    human(-260, -70, 0.62, t, { body: '#3a2a5a', hat: 'merchant', hatCol: '#5a2a6a', legs: '#2a2a3a', armR: 'hold', prop: 'scroll', seed: 9420, face: 'smile' }); for (let i = 0; i < 3; i++) human(0 + i * 90, -70, 0.55, t, { body: ['#c8b89a', '#8a6a4a', '#a83a2a'][i], hat: i ? 'cap' : 'scarf', hatCol: '#3a2a1a', legs: '#3a2a1a', armR: i === 1 ? 'wave' : 'hold', seed: 9421 + i, face: 'smile' });
    pop();
  }
  function ground(t) {                                              // нос лодки-баркаса Тома: доски, канат, бочонок, сеть с рыбой, фонарь
    sea(1460, 2300, t, { col: '#1e6a98', colD: '#0e3a60' }); push(380, 1700, 1); blob([[-420, -40], [-380, 60], [300, 70], [520, -120], [300, -60], [-300, -70]], { wash: '#8a5a32', washA: 1, w: 2.6, col: L, shade: { gap: 8, a: 0.25, col: '#3a1a0a', ang: 0 } });
    for (let i = 0; i < 6; i++) pencil([[-380 + i * 120, -50], [-370 + i * 120, 50]], { w: 3, col: '#5a3a1a', pass2: false }); pencil(ellPts(-200, -70, 50, 16, 0, 0, 20), { w: 6, col: '#c8a878', pass2: false, gap: false });
    rect(160, -150, 80, 80, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (let q = 0; q < 5; q++) ell(-120 + q * 30, -90, 18, 8, { wash: '#a8b8c8', washA: 1, w: 1, col: L }); pencil([[-160, -80], [-60, -110]], { w: 2, col: '#6a5a3a', a: 0.6, pass2: false });
    pencil([[420, -100], [420, -260]], { w: 4, col: '#3a3a3a', pass2: false }); rect(400, -300, 40, 50, { wash: '#ffd890', washA: 1, w: 1.6, col: L }); pop();
    lightPool(500, 1700, 800, 160, 'rgba(255,224,170,1)', 0.25); castShadow(380, 1660, 110, 400, 0.5, 0.28); moodDark(1100, 1000, 800, 1900, '#08141e', 0.2);
  }
  function extras(t) {                                              // чайки близко, рыбак с сетью в лодке, дельфины, пена
    for (let i = 0; i < 3; i++) { const x = ((t * 80 + i * 400) % 1700) - 200, y = 700 + i * 50 + Math.sin(t * 2 + i) * 20; push(x, y, 1.2); pencil([[-40, Math.sin(t * 6 + i) * 12], [0, 0], [40, Math.sin(t * 6 + i) * 12]], { w: 5, col: '#f4f4f0', pass2: false }); ell(0, 0, 10, 6, { wash: '#f4f4f0', washA: 1, line: false }); pop(); }
    push(1120, 1500, 0.8); blob([[-130, 0], [-100, 34], [100, 34], [140, -4]], { wash: '#6a4a2a', washA: 1, w: 2, col: L }); human(-20, 0, 0.9, t, { body: '#5a6a8a', hat: 'fur', hatCol: '#3a2a1a', legs: '#3a2a1a', armR: 'wave', flip: -1, seed: 9430, face: 'grin' }); pencil([[40, -200], [120, 0]], { w: 2, col: '#8a7a5a', pass2: false }); for (let q = 0; q < 6; q++) pencil([[60 + q * 12, -150 + q * 30], [130, -100 + q * 20]], { w: 1.4, col: '#8a7a5a', a: 0.6, pass2: false }); pop();
    for (let i = 0; i < 2; i++) { const ph = (t * 0.8 + i * 0.5) % 1, x = 820 + i * 140, y = 1560 - Math.sin(ph * Math.PI) * 80; if (ph < 0.9) { push(x, y, 0.8, -0.6 + ph * 1.2); blob([[-50, 0], [-20, -20], [40, -16], [60, 0], [20, 10]], { wash: '#6a7a8a', washA: 1, w: 1.6, col: L }); poly([[0, -18], [10, -40], [20, -16]], { wash: '#6a7a8a', washA: 1, w: 1.2, col: L }); pop(); } }
  }
  function front(t) { for (const x of [-150, 1240]) { pencil([[x, 2300], [x + (x < 0 ? 60 : -60), 500]], { w: 14, col: '#4a3a2a', pass2: false }); pencil([[x + (x < 0 ? 60 : -60), 520], [x + (x < 0 ? 300 : -300), 760]], { w: 4, col: '#c8a878', pass2: false }); } }
  function plate(t) { if (t < EV.nm_wood - 0.3) return; meBoard(640, 1000, 0.82, t, EV.nm_wood - 0.3, [['CRNA GORA', 50, MEC.gold], ['= MONTE NEGRO', 46], ['= ЧЁРНАЯ ГОРА', 50, '#ff8a6a']], { w: 520 }); }
  function mapWrite(t) { if (t < EV.nm_mn - 0.2 || t > EV.nm_wood - 0.3) return; const k = popK(t, EV.nm_mn - 0.2, 0.3), f = clamp((t - EV.nm_mn) / 0.8); push(660, 1000, 0.85 * k, 0.04); ctx.save(); ctx.fillStyle = 'rgba(240,224,184,0.98)'; ctx.fillRect(-260, -160, 520, 320); ctx.restore();
    pencil([[-220, 60], [-120, 20], [-40, 60], [40, 10], [140, 40], [220, -10]], { w: 4, col: '#5a3a1a', pass2: false }); poly([[-60, 40], [0, -90], [60, 40]], { wash: '#2a2a20', washA: 1, w: 2, col: L }); txt('MONTE NEGRO', 0, -120, 46, { col: '#7a1a10', font: 'Hand', reveal: f }); txt('Golfo di Cattaro', 0, 120, 30, { col: '#3a5a8a', font: 'Hand' }); pop(); }
  function extras2(t) {                                             // вторая галера вдали, бочонки на причале, сохнущие сети
    push(1040, 1080, 0.35); blob([[-300, -30], [-280, 20], [260, 20], [320, -40]], { wash: '#6a4a2a', washA: 1, w: 2, col: L }); pencil([[0, -30], [0, -300]], { w: 6, col: '#4a3a2a', pass2: false }); poly([[4, -290], [160, -120], [4, -80]], { wash: '#c8a050', washA: 1, w: 1.6, col: L }); pop();
    for (let i = 0; i < 4; i++) pencil([[-200 + i * 40, 1080], [-180 + i * 40, 1040]], { w: 2, col: '#5a4a3a', a: 0.6, pass2: false });
  }
  WORLD.name = (t, u, cat) => {
    lay(40, () => sky(t)); lay(18, () => lovcen(t)); lay(9, () => bay(t)); lay(3.4, () => galley(t)); lay(1.6, () => extras(t)); lay(1.5, () => extras2(t)); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(2.4, () => { rays(SUN[0], SUN[1], 0.5, 0.4, 1400, 'rgba(255,230,180,1)', 0.12, 5, t); motes(14, [-100, 700, 1200, 1500], '#fff8e0', t, 9440, { sp: 2, sz: 2.4, a: 0.4, wob: 16, add: 1 }); });
  };
  DIR.name = {
    outfit: 'sailor', light: { side: -1, rim: '#ffe0b0' }, grade: ['#203040', 0.04],
    act: () => [[S0.name, 'awe'], [EV.nm_mn, 'smug'], [EV.nm_black, 'suspicious'], [EV.nm_wood, 'grin']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1650, s: 0.95, look: [0.6, -0.8], hand: [160, -330], point: t > EV.nm_black - 0.1 }),
    hud: t => { mapWrite(t); plate(t); },
    cam: () => [[S0.name, 600, 960, -0.1], [EV.nm_mn, 620, 940, -0.08], [EV.nm_black, 640, 860, -0.04, 'x'], [S1.name, 620, 900, 0]]
  };
  TRANS_IN.name = { a: 0, b: 0.35, fx(k, t, A, B) { drawBuf(B, 1.08 - 0.08 * sm(k)); whiteOut(1 - sm(k), '240,251,255'); } };
})();
