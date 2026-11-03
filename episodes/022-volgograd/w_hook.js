/* 022 — сцена `hook`: 2026, закат над Волгой, вершина Мамаева кургана. Справа — «Родина-мать» (бетон, багровый контровой свет,
   стальной меч уходит за верх кадра), у её подножия — туристы, венки, гвоздики, фонари; внизу — Волга с баржей и город.
   С 0,0 с камера падает с меча вниз (движение), на «Свободы» рядом из земли выезжает зелёная Статуя Свободы (удар, пыль),
   на «плечо!» — пунктир-рулетка от факела к плечу и бирки «46 м» / «85 м»; на «здесь?» над курганом вспыхивает «?».
   Переход в туннель — волна Волги накрывает кадр снизу и уносит в часы. Петля: планы — window.VQ, кнопка кончается тем же ракурсом. */
(() => {
  EV.hk_lib = wtk('h1', 'Свободы');
  EV.hk_sh = wtk('h1', 'плечо!');
  EV.hk_q = wtk('h1', 'здесь?');
  EV.hk_wind = wtk('h2', 'Отматываем');
  SHAKES.push([0.02, 0.3, 9], [EV.hk_lib + 0.25, 0.3, 10], [EV.hk_q, 0.2, 5]);
  KEYW.push('Свободы', 'плечо!', 'здесь?');
  const MX = 760, MB = 1290, MS = 0.95, LX = 420;

  const VQ = window.VQ = {};
  VQ.sky = t => sunsetSky(t, { sx: 180, sy: 1080, sr: 100, seed: 22100, nb: 9 });
  VQ.far = t => {                                                  // левый берег, Волга, баржа, город, мост
    hills(1150, 30, '#3a2a3e', 22101, 1);
    for (let i = 0; i < 9; i++) cityBlock(-80 + i * 150, 1180, 110, 90 + (i * 37) % 120, '#4a3a4e', t, { lit: 0.4, seed: 22102 + i });
    volga(1180, 1300, t, { sx: 180, seed: 22103, farBank: false });
    push(860, 1236, 0.5); rect(-220, -30, 440, 40, { wash: '#2a2a34', washA: 1, w: 2, col: VG.ink }); rect(120, -80, 70, 50, { wash: '#e8e0d0', washA: 1, w: 2, col: VG.ink }); glow(150, -60, 30, 'rgba(255,220,150,1)', 0.6); pop();
    for (let k = 0; k < 11; k++) { const x = -60 + k * 120; pencil([[x, 1262], [x + 60, 1240], [x + 120, 1262]], { w: 3, col: '#2a2430', a: 0.8, pass2: false }); pencil([[x + 60, 1240], [x + 60, 1290]], { w: 3, col: '#2a2430', a: 0.6, pass2: false }); }
    pencil([[-100, 1262], [1300, 1262]], { w: 6, col: '#2a2430', pass2: false });
  };
  VQ.statues = (t, o = {}) => {                                    // Родина-мать + выезжающая Статуя Свободы
    const L = VG.ink, lib = o.lib ?? sm((t - EV.hk_lib) / 0.45);
    kurgan(MX - 40, MB + 30, 1500, 140, { col: '#6a5a3a', rim: 'rgba(255,120,80,1)', grass: 70, seed: 22104 });
    motherland(MX, MB, MS, t, { glint: 1, rim: '#ff8a6a', col: '#a8988e', colD: '#6e605c' });
    if (lib > 0) { const gy = MB + 10, H = 0.885 * 1000 * MS; push(0, (1 - lib) * H, 1); liberty(LX, gy + (lib < 1 ? 0 : 0), H, t, { pat: 1 }); pop();
      if (t < EV.hk_lib + 0.8) for (let i = 0; i < 14; i++) { const r = rng(hsh(FRAME, i, 41)); ell(LX - 200 + r() * 400, gy - r() * 120 * (1 - lib + 0.3), 30 + r() * 40, 18 + r() * 20, { wash: '#b89a7a', washA: 0.5, line: false }); } }
    if (o.tape !== false && t > EV.hk_sh - 0.05) { const q = sm((t - EV.hk_sh + 0.05) / 0.35), ty = MB - 0.885 * 1000 * MS + 4;
      for (let k = 0; k < 18 * q; k++) pencil([[LX + 40 + k * 22, ty], [LX + 52 + k * 22, ty]], { w: 4, col: '#fff2c8', pass2: false });
      if (q > 0.6) { const a = sm((q - 0.6) / 0.4); for (const [lx, ly, s1] of [[LX - 190, MB - 420, '46 м'], [880, MB - 640, '85 м']]) { push(lx, ly, a); rect(-74, -34, 148, 64, { wash: '#14100a', washA: 0.9, w: 2.4, col: '#ffd890' }); txt(s1, 0, 8, 44, { col: '#ffe8b8', font: 'Osw' }); pop(); } } }
    if (o.q !== false && t > EV.hk_q - 0.05) { const q = popK(t, EV.hk_q - 0.05, 0.35); push(MX - 120, 700, q); glow(0, 0, 160, 'rgba(255,200,120,1)', 0.5); txt('?', 0, 40, 200, { col: '#ffe0a0', font: 'Osw' }); pop(); }
  };
  VQ.mid = t => {                                                  // плато вершины: туристы, венки, фонари, гвоздики
    const L = VG.ink;
    for (const x of [140, 980]) lamppost(x, 1330, 300, t, { lit: 1 });
    for (let k = 0; k < 4; k++) { const x = 560 + k * 120; ell(x, 1300, 40, 40, { wash: '#2a4a2a', washA: 1, w: 2, col: L }); for (let i = 0; i < 8; i++) ell(x + Math.cos(i) * 30, 1300 + Math.sin(i) * 30, 9, 9, { wash: '#c8203a', washA: 1, w: 1, col: L }); pencil([[x - 30, 1330], [x + 30, 1330]], { w: 6, col: '#e8c050', pass2: false }); }
    const P = [[620, 1360, '#3a4a6a', 'cap', 'phone'], [700, 1366, '#8a2a3a', null, null], [860, 1360, '#2a5a5a', 'scarf', 'phone'], [940, 1368, '#5a4a3a', 'cap', null], [1040, 1362, '#4a3a5a', null, 'phone'], [520, 1370, '#6a5a2a', 'cap', null], [1120, 1366, '#2a3a4a', 'police', null], [460, 1376, '#7a3a2a', 'scarf', null]];
    P.forEach(([x, y, c, h, p], i) => human(x, y, 0.36, t, { body: c, legs: '#2a2a34', hat: h || undefined, hatCol: '#2a2a2a', prop: p || undefined, armR: p ? 'hold' : 'down', seed: 220 + i, flip: i % 2 ? -1 : 1, look: [0.4, -0.8] }));
    dog(780, 1376, 0.28, t, { col: '#c89a5a' });
    crowd(200, 1250, 1290, 16, t, 22120, { s: 0.3, phones: 0.4 });
    human(330, 1372, 0.4, t, { body: '#3a3a3a', legs: '#2a2a34', hat: 'cap', hatCol: '#2a2a2a', beard: 1, seed: 240, armR: 'hold', look: [0.5, -0.9] });   // ветеран с гвоздикой
    human(1180, 1374, 0.36, t, { body: '#c8a040', legs: '#2a2a34', seed: 241, armR: 'wave', flip: -1 });
    push(990, 1290, 0.5); pencil([[0, 0], [10, -160]], { w: 2, col: '#3a3a3a', pass2: false }); ell(12, -190, 34, 40, { wash: '#e8303a', washA: 1, w: 2, col: L }); pop();
  };
  VQ.ground = t => {                                               // ближний план: гранитные плиты, ступени, гвоздики, скамья, урна
    const L = VG.ink;
    rect(-900, 1390, 2900, 700, { wash: '#8a7e74', washA: 1, line: false });
    for (let k = 0; k < 7; k++) { const y = 1400 + k * k * 9 + k * 30; pencil([[-200, y], [1300, y]], { w: 2, col: '#4a4038', a: 0.7, pass2: false }); for (let i = 0; i < 9; i++) { const x = -100 + i * 160 + (k % 2) * 80; pencil([[x, y], [x + (x - 540) * 0.08, y + 30 + k * 18]], { w: 1.6, col: '#4a4038', a: 0.5, pass2: false }); } }
    const r = rng(22105); for (let i = 0; i < 140; i++) { ctx.fillStyle = i % 2 ? 'rgba(40,30,30,0.35)' : 'rgba(255,230,210,0.25)'; ctx.fillRect(-100 + r() * 1300, 1400 + r() * 500, 3 + r() * 4, 2); }
    for (const [x, y] of [[700, 1520], [760, 1540], [820, 1510]]) { pencil([[x, y], [x + 40, y - 70]], { w: 3, col: '#3a5a2a', pass2: false }); ell(x + 44, y - 76, 14, 12, { wash: '#d8203a', washA: 1, w: 1.4, col: L }); }
    push(980, 1580, 0.8); rect(-160, -70, 320, 22, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); rect(-160, -110, 320, 18, { wash: '#6a4a2a', washA: 1, w: 2, col: L }); for (const sx of [-140, 140]) pencil([[sx, -48], [sx, 0]], { w: 8, col: '#2a2a2a', pass2: false }); pop();
    push(580, 1620, 0.7); blob([[-30, 0], [-36, -90], [36, -90], [30, 0]], { wash: '#3a4a3a', washA: 1, w: 2, col: L }); pop();
    sack(1120, 1640, 0.5, '#5a4a3a'); jug(460, 1660, 0.5, '#8a3a2a');
    rect(-200, 1410, 1600, 40, { wash: '#6a5e56', washA: 1, w: 2.2, col: L, shade: { gap: 9, a: 0.25, col: '#2a2020', ang: 0 } });   // гранитный бортик
    for (const [x, y, sc] of [[760, 1700, 0.62], [1180, 1760, 0.8]]) { push(x, y, sc); ell(0, -90, 90, 90, { wash: '#2a4a2a', washA: 1, w: 2.4, col: L }); ell(0, -90, 50, 50, { wash: '#8a7e74', washA: 1, w: 2, col: L });   // венки
      for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283; ell(Math.cos(a) * 70, -90 + Math.sin(a) * 70, 14, 14, { wash: i % 2 ? '#d8203a' : '#a8102a', washA: 1, w: 1.2, col: L }); }
      for (const sd of [-1, 1]) blob([[sd * 10, -20], [sd * 40, 60], [sd * 24, 64], [sd * 4, 0]], { wash: sd < 0 ? '#e8a020' : '#1a1a1a', washA: 1, w: 1.6, col: L }); pencil([[-40, 0], [-60, 90]], { w: 6, col: '#3a2a1a', pass2: false }); pencil([[40, 0], [60, 90]], { w: 6, col: '#3a2a1a', pass2: false }); pop(); }
    human(880, 1640, 0.62, t, { body: '#2a3a5a', legs: '#1a1a24', hat: 'cap', hatCol: '#1a1a1a', prop: 'phone', armR: 'hold', seed: 231, flip: -1, look: [0.2, -0.9] });
    human(1020, 1660, 0.6, t, { body: '#7a2a3a', legs: '#2a2a34', hat: 'scarf', hatCol: '#e8d8c8', armL: 'hold', seed: 232, look: [0.3, -0.9] });
    human(600, 1650, 0.5, t, { body: '#4a5a3a', legs: '#2a2a34', seed: 233, armR: 'point', look: [0.5, -0.9] });
  };
  VQ.front = t => {                                                // передний план по краям: ветки тополей, гвоздики, лента
    for (const [x, h] of [[-120, 1300], [1230, 1200]]) poplar(x, 2100, h, t, { col: '#2a3a24' });
    for (let i = 0; i < 4; i++) { const x = 1100 + i * 50, y = 1980; pencil([[x, y], [x + 20, y - 160]], { w: 5, col: '#2a4a1a', pass2: false }); ell(x + 22, y - 170, 26, 22, { wash: '#c8102a', washA: 1, w: 2, col: VG.ink }); }
    pencil([[-100, 1900], [200, 1840], [360, 1880]], { w: 22, col: '#e8a020', pass2: false }); pencil([[-100, 1930], [200, 1870], [360, 1910]], { w: 14, col: '#1a1a1a', pass2: false });
  };

  WORLD.hook = (t, u, cat) => {
    lay(40, () => VQ.sky(t));
    lay(18, () => VQ.far(t));
    lay(5, () => VQ.statues(t));
    lay(3, () => VQ.mid(t));
    lay(1, () => { VQ.ground(t); cat(); });
    lay(0.62, () => VQ.front(t));
    motes(36, [-200, 300, 1300, 1500], '#ffd0a0', t, 22106, { sp: 20, vx: 60, sz: 2.6, a: 0.5, wob: 18 });
    haze('#e87a5a', 0.06);
  };
  DIR.hook = {
    outfit: 'hoodieV', light: { side: -1, rim: '#ff9a6a' }, grade: ['#b04a40', 0.12],
    act: () => [[0, 'shock'], [EV.hk_lib, 'awe'], [EV.hk_sh, 'shock'], [EV.hk_q, 'suspicious'], [LS('h2'), 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 250, y: 1500, s: 0.98, look: t < EV.hk_q ? [0.6, -0.8] : [0.2, -0.2], tailUp: t > EV.hk_sh,
      point: t > EV.hk_sh && t < EV.hk_q ? 1 : undefined, hand: t > EV.hk_sh && t < EV.hk_q ? [200, -340] : undefined,
      watchInHand: t > LS('h2') - 0.1, glow: sm((t - LS('h2')) / 0.5), spin: 1 }),
    cam: () => [[0, 760, 520, 0.3], [EV.hk_lib, 640, 820, 0.04], [EV.hk_sh, 600, 760, 0.0, 'x'], [EV.hk_q, 620, 820, 0.06], [LS('h2'), 520, 1040, 0.1], [S1.hook, 460, 1120, 0.2]]
  };
  TRANS_IN.tunnel = { a: 0.3, b: 0.35, runA: 1, fx(k, t, A, B) {       // волна Волги: вода поднимается снизу, гребень с пеной уносит в часы
    drawBuf(A); const y = lerp(2000, -300, sm(k));
    scr(() => {
      ctx.save(); ctx.beginPath(); ctx.moveTo(0, 2000); for (let x = 0; x <= W; x += 30) ctx.lineTo(x, y + Math.sin(x * 0.012 + t * 8) * 60); ctx.lineTo(W, 2000); ctx.closePath(); ctx.clip(); drawBuf(B);
      const g = ctx.createLinearGradient(0, y, 0, y + 500); g.addColorStop(0, 'rgba(90,140,180,0.7)'); g.addColorStop(1, 'rgba(20,40,70,0)'); ctx.fillStyle = g; ctx.fillRect(0, y - 80, W, 600); ctx.restore();
      const P = []; for (let x = -20; x <= W + 20; x += 30) P.push([x, y + Math.sin(x * 0.012 + t * 8) * 60]); pencil(P, { w: 14, col: '#f2f6ff', a: 0.9, pass2: false, gap: false }); pencil(P.map(([x, yy]) => [x, yy + 24]), { w: 6, col: '#ffd8a0', a: 0.6, pass2: false, gap: false });
      motes(120, [0, y - 200, W, y + 80], '#f6faff', t, 22107, { sp: -300, vx: 200, sz: 5, a: Math.sin(Math.PI * k), wob: 40 });
    });
  } };
})();
