/* 023 — сцена `yarlyk`: 1305, княжий двор в Твери. Резной терем с красным крыльцом, звонница, на крыльце — князь Михаил Ярославич
   в короне-шапке с боярами, вокруг — дружина с копьями и стягами, народ, гонец с грамотой; мостовая из плах, бочки мёда, лавки.
   На «Тверского» над князем вспыхивает луч и бирка «МИХАИЛ ТВЕРСКОЙ»; на «Руси» перед Томом разворачивается огромная грамота
   «ВЕЛИКИЙ КНЯЗЬ ВСЕЯ РУСИ» с вислой печатью; колокола раскачиваются; на «ноль!» — табло 2 : 0.
   Переход В сцену — грамота: свиток раскатывается слева направо, под ним — новая эпоха. */
(() => {
  EV.yr_prince = wtk('s2', 'Тверского');
  EV.yr_title = wtk('s2', 'всея');
  EV.yr_first = wtk('s2', 'первым');
  EV.yr_score = wtk('s2', 'ноль!');
  KEYW.push('Тверского', 'первым', 'ноль!');
  SHAKES.push([EV.yr_title + 0.1, 0.15, 5]);
  const L = TV.ink;
  function sky(t) { flaxSky(t, { sx: 900, sy: 260, seed: 23300, nb: 8, cols: ['#4e7aa6', '#7ea6c4', '#b6cede', '#e6e4cc', '#f2e2b4'] }); }
  function far(t) {                                                 // посад за стеной: крыши, белый собор, Волга
    hills(1060, 30, '#5a8a5a', 23301, 1);
    volga(1060, 1130, t, { sx: 900, seed: 23302, top: '#a8c8d8', bot: '#5a7a9a', farBank: false });
    for (let i = 0; i < 12; i++) izba(-60 + i * 110, 1150, 80, 50 + (i * 17) % 30, t, { roof: i % 3 ? '#6a5a3a' : '#4e6a3a', smoke: i % 4 === 1 });
    sobor(180, 1120, 0.3, t);
    palisade(-160, 1360, 1170, 90, t, { col: '#8a6440', seed: 23303 });
  }
  function terem(t) {                                               // княжий терем: срубы, бочка-кровли, резьба, крыльцо
    push(720, 1300, 0.9);
    for (const [x, w, h, rf] of [[-260, 240, 300, '#3e6a4a'], [0, 280, 420, TV.red], [270, 220, 260, '#3e6a4a']]) {
      rect(x - w / 2, -h, w, h, { wash: '#9a7048', washA: 1, w: 2.4, col: L });
      for (let k = 1; k < h / 20; k++) pencil([[x - w / 2, -k * 20], [x + w / 2, -k * 20]], { w: 1.2, col: '#3a2410', a: 0.5, pass2: false });
      blob([[x - w / 2 - 20, -h], [x - w / 2, -h - 80], [x, -h - 140], [x + w / 2, -h - 80], [x + w / 2 + 20, -h]], { wash: rf, washA: 1, w: 2.4, col: L, shade: { gap: 7, a: 0.3, col: L, ang: 1.2 } });   // бочка
      pencil([[x, -h - 140], [x, -h - 190]], { w: 4, col: TV.gold, pass2: false }); ell(x, -h - 196, 10, 10, { wash: TV.gold, washA: 1, w: 1.4, col: L });
      for (let k = 0; k < 3; k++) { const wx = x - w / 3 + k * w / 3; rect(wx - 18, -h + 60, 36, 50, { wash: '#ffe0a0', washA: 1, w: 1.6, col: L }); pencil([[wx - 26, -h + 54], [wx, -h + 40], [wx + 26, -h + 54]], { w: 3, col: '#e8d8b0', pass2: false }); }
      for (let k = 0; k < w / 24; k++) ell(x - w / 2 + 12 + k * 24, -h + 4, 10, 8, { wash: '#e8d8b0', washA: 1, w: 1, col: L });   // резной подзор
    }
    rect(-80, -160, 160, 160, { wash: '#7a5434', washA: 1, w: 2, col: L }); for (let k = 0; k < 8; k++) pencil([[-80 + k * 6, -k * 20], [80 - k * 6, -k * 20]], { w: 3, col: '#c8a070', pass2: false });   // лестница крыльца
    for (const sd of [-1, 1]) { pencil([[sd * 90, -160], [sd * 90, -330]], { w: 12, col: '#c8a070', pass2: false }); ell(sd * 90, -250, 16, 30, { wash: '#c8a070', washA: 1, w: 1.6, col: L }); }   // столбы-кувшины
    poly([[-120, -330], [0, -400], [120, -330]], { wash: TV.red, washA: 1, w: 2.2, col: L });
    pop();
    const b = sm((t - EV.yr_prince) / 0.4);                          // князь и бояре на крыльце
    if (b > 0) { glow(720, 980, 260, 'rgba(255,230,160,1)', 0.45 * b); rays(720, 500, Math.PI / 2, 0.4, 600, 'rgba(255,240,190,0.6)', 0.18 * b, 5, t); }
    human(720, 1156, 0.46, t, { body: '#8a1a1a', legs: '#3a1a10', long: 1, hat: 'crown', hatCol: TV.gold, beard: 1, seed: 2320, prop: 'sword', armR: 'hold', trim: TV.gold, look: [0, 0.2] });
    for (const [x, c] of [[620, '#3a4a7a'], [820, '#5a3a5a'], [560, '#4a5a3a'], [880, '#7a5a2a']]) human(x, 1160, 0.4, t, { body: c, legs: '#2a2a2a', long: 1, hat: 'fur', hatCol: '#3a2a1a', beard: 1, seed: 2321 + x, flip: x > 720 ? -1 : 1 });
    if (b > 0.5) { push(720, 900, popK(t, EV.yr_prince + 0.2, 0.3)); rect(-170, -30, 340, 60, { wash: '#16120c', washA: 0.86, w: 2.4, col: TV.gold }); txt('МИХАИЛ ТВЕРСКОЙ', 0, 10, 34, { col: '#ffe8b8', font: 'Osw' }); pop(); }
  }
  function belfry(t) {                                              // звонница: колокола качаются после «Руси»
    push(150, 1300, 0.8); for (const sx of [-80, 80]) rect(sx - 12, -460, 24, 460, { wash: '#8a6440', washA: 1, w: 2, col: L }); pencil([[-110, -440], [110, -440]], { w: 10, col: '#5a3a22', pass2: false });
    poly([[-130, -460], [0, -560], [130, -460]], { wash: '#3e6a4a', washA: 1, w: 2.2, col: L });
    const sw = t > EV.yr_title ? Math.sin((t - EV.yr_title) * 9) * 0.4 * Math.exp(-(t - EV.yr_title) * 0.6) : 0;
    for (const [x, r] of [[-50, 40], [30, 30], [80, 22]]) { push(x, -440, 1, sw * (r / 40)); pencil([[0, 0], [0, 20]], { w: 3, col: L, pass2: false }); blob([[-r * 0.5, 20], [-r * 0.6, 20 + r], [-r, 20 + r * 1.6], [r, 20 + r * 1.6], [r * 0.6, 20 + r], [r * 0.5, 20]], { wash: '#b88a3a', washA: 1, w: 2, col: L }); pop(); }
    if (sw) for (let k = 0; k < 3; k++) pencil(ellPts(0, -380, 120 + k * 40 + (t * 200) % 60, 60 + k * 20, 0, 0.6, 20).slice(0, 12), { w: 3, col: '#fff0c0', a: 0.5, pass2: false });
    pop();
  }
  function court(t) {                                               // двор: дружина, стяги, народ, гонец, мостовая
    rect(-600, 1300, 2400, 900, { wash: '#8a6a44', washA: 1, line: false });
    for (let k = 0; k < 14; k++) { const y = 1310 + k * k * 4 + k * 22; pencil([[-200, y], [1300, y]], { w: 2, col: '#4a3420', a: 0.7, pass2: false }); }   // плахи мостовой
    const r = rng(23304); for (let i = 0; i < 90; i++) pencil([[r() * 1200 - 50, 1320 + r() * 700], [r() * 1200 - 20, 1320 + r() * 700]], { w: 1.2, col: '#5a4028', a: 0.3, pass2: false });
    for (let k = 0; k < 6; k++) { const x = 380 + k * 130; human(x, 1370 + (k % 2) * 10, 0.4, t, { body: k % 2 ? '#6a6a6a' : '#7a7a74', legs: '#3a3020', hat: 'helmet', hatCol: '#8a8a8a', beard: 1, seed: 2330 + k, prop: 'spear', armR: 'hold', flip: k > 2 ? -1 : 1 }); }
    for (const [x, c] of [[330, TV.red], [1110, '#2a4a8a']]) { pencil([[x, 1380], [x, 960]], { w: 5, col: '#3a2410', pass2: false }); const wv = Math.sin(t * 4 + x) * 14; shape([[x, 970], [x + 140, 990 + wv], [x + 120, 1050 + wv], [x + 150, 1110 + wv], [x, 1100]], { wash: c, washA: 1, w: 2, col: L }); seal(x + 60, 1040, 22, t, { col: TV.gold, txt: '✦' }); }
    crowd(-80, 1260, 1420, 14, t, 23305, { s: 0.36, cols: ['#e8dcb8', '#6a3a2a', '#3a5a3a', '#b0322a', '#a8c0d8'] });
    human(1000, 1500, 0.52, t, { body: '#3a5a8a', legs: '#3a3020', hat: 'cap', hatCol: '#b0322a', seed: 2340, prop: 'scroll', armR: 'up', flip: -1 });   // гонец
    horse(1150, 1520, 0.4, t, { col: '#e8e0d0', flip: -1, saddle: 1 });
  }
  function ground(t) {                                              // ближний план: бочки мёда, лавки с калачами, лукошки, гуси
    barrel(860, 1720, 0.6, '#7a5030'); barrel(930, 1750, 0.55); txt('МЁД', 860, 1680, 26, { col: '#f0d8a0', font: 'Osw' });
    push(560, 1760, 0.7); rect(-160, -70, 320, 20, { wash: '#7a5434', washA: 1, w: 2, col: L }); for (const sx of [-140, 140]) pencil([[sx, -50], [sx, 0]], { w: 8, col: '#4a3420', pass2: false });
    for (let k = 0; k < 5; k++) { ell(-120 + k * 60, -86, 26, 16, { wash: '#d89a4a', washA: 1, w: 1.6, col: L }); ell(-120 + k * 60, -86, 10, 6, { wash: '#8a5a2a', washA: 1, line: false }); } pop();   // калачи на лавке
    sack(1060, 1770, 0.55, TV.flax); jug(700, 1790, 0.45); crate(380, 1800, 110, 60); jug(740, 1800, 0.38, '#5a6a8a');
    for (let k = 0; k < 4; k++) { const x = 1100 + k * 40 + Math.sin(t * 2 + k) * 8, y = 1660 + (k % 2) * 14; ell(x, y, 20, 13, { wash: '#f2ece0', washA: 1, w: 1.4, col: L }); pencil([[x + 14, y - 6], [x + 26, y - 28]], { w: 5, col: '#f2ece0', pass2: false }); ell(x + 28, y - 30, 6, 5, { wash: '#f2ece0', washA: 1, w: 1, col: L }); }
    human(1180, 1720, 0.58, t, { body: '#b0322a', legs: '#4a3a2a', hat: 'scarf', hatCol: TV.flax, long: 1, seed: 2341, armL: 'hold', flip: -1, look: [-0.6, -0.4] });
    human(450, 1640, 0.5, t, { body: '#a8c0d8', legs: '#4a3a2a', seed: 2342, armR: 'wave', look: [0.4, -0.6] });
    dog(260, 1800, 0.3, t, { col: '#6a4a2a' });
  }
  function front(t) {                                               // передний план: край сруба и резной столб, стяг у края
    rect(-120, 900, 200, 1200, { wash: '#7a5434', washA: 1, w: 2.6, col: L }); for (let k = 0; k < 30; k++) pencil([[-120, 920 + k * 40], [80, 920 + k * 40]], { w: 2, col: '#3a2410', a: 0.6, pass2: false });
    for (let k = 0; k < 6; k++) ell(80, 940 + k * 200, 22, 40, { wash: '#c8a070', washA: 1, w: 2, col: L });
    rect(1120, 1100, 200, 1000, { wash: '#7a5434', washA: 1, w: 2.6, col: L }); for (let k = 0; k < 24; k++) pencil([[1120, 1120 + k * 40], [1320, 1120 + k * 40]], { w: 2, col: '#3a2410', a: 0.6, pass2: false });
    for (let k = 0; k < 4; k++) ell(1120, 1160 + k * 220, 22, 40, { wash: '#c8a070', washA: 1, w: 2, col: L });
  }
  function hud(t) {
    if (t > EV.yr_title - 0.15 && t < EV.yr_score + 0.1) { const op = sm((t - EV.yr_title + 0.15) / 0.45); gramota(730, 1130, 1.15, t, { open: op, title: 'ВЕЛИКИЙ КНЯЗЬ', rot: 0.03 });
      if (op > 0.7) { txt('ВСЕЯ РУСИ', 730, 1145, 72, { col: '#7a1a12', font: 'Osw', a: sm((op - 0.7) / 0.3) }); txt('так писал патриарх, 1310-е', 730, 1225, 34, { col: '#5a3a1e', font: 'Hand', a: sm((op - 0.7) / 0.3) }); } }
    const s = t > EV.yr_score - 0.05; scoreHud(t, s ? 2 : 1, 0, s ? { t0: EV.yr_score - 0.05, side: -1 } : {});
  }
  WORLD.yarlyk = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(14, () => far(t));
    lay(5, () => { belfry(t); terem(t); });
    lay(2.4, () => court(t));
    lay(1, () => { ground(t); cat(); });
    lay(0.6, () => front(t));
    if (t > EV.yr_title) motes(50, [-100, 300, 1200, 1600], TV.gold, t, 23306, { sp: 60, vx: 20, sz: 3, a: 0.7, wob: 30, add: 1 });
    motes(24, [-200, 400, 1300, 1600], '#fff6d8', t, 23307, { sp: 10, vx: 40, sz: 2.4, a: 0.4, wob: 18 });
    haze('#f0e0b8', 0.05);
  };
  DIR.yarlyk = {
    outfit: 'knyaz', light: { side: 1, rim: '#ffe0a0' }, grade: ['#d0a860', 0.12],
    act: () => [[S0.yarlyk, 'talk'], [EV.yr_prince, 'proud'], [EV.yr_first, 'awe'], [EV.yr_score, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 290, y: 1580, s: 1.0, look: t < EV.yr_title ? [0.7, -0.8] : [0.5, -0.2], tailUp: t > EV.yr_prince,
      point: t > EV.yr_prince && t < EV.yr_title ? 1 : undefined, hand: t > EV.yr_prince && t < EV.yr_title ? [230, -380] : undefined }),
    cam: () => [[S0.yarlyk, 640, 880, 0.2], [EV.yr_prince, 680, 860, 0.1, 'x'], [EV.yr_title, 620, 960, 0.08], [EV.yr_score, 600, 980, 0.12], [S1.yarlyk, 600, 960, 0.14]],
    hud
  };
  TRANS_IN.yarlyk = { a: 0.2, b: 0.35, fx(k, t, A, B) {             // грамота раскатывается слева направо, под ней — 1305
    drawBuf(A); const x = lerp(-120, W + 160, sm(k));
    scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, x, H); ctx.clip(); drawBuf(B); ctx.restore();
      const g = ctx.createLinearGradient(x - 70, 0, x + 70, 0); g.addColorStop(0, 'rgba(170,140,90,1)'); g.addColorStop(0.5, 'rgba(250,236,200,1)'); g.addColorStop(1, 'rgba(150,120,70,1)');
      ctx.fillStyle = g; ctx.fillRect(x - 70, -10, 140, H + 20); pencil([[x - 70, -10], [x - 70, H + 10]], { w: 4, col: TV.ink, pass2: false }); pencil([[x + 70, -10], [x + 70, H + 10]], { w: 4, col: TV.ink, pass2: false });
      for (let i = 0; i < 12; i++) pencil([[x - 40, i * 170 + 40], [x - 40, i * 170 + 120]], { w: 3, col: '#8a6a3a', a: 0.6, pass2: false });
      seal(x, 1400, 46, t, { txt: '1305' }); pencil([[x, 1350], [x, 1250]], { w: 3, col: '#7a1a12', pass2: false }); });
  } };
})();
