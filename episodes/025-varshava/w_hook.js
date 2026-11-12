/* 025 — сцена `hook`: 2026, Рынок Старого города в золотой час. Ряд цветных камениц сначала — карандашный эскиз, золотой мазок кисти
   «дописывает» их слева направо (на «Срисовали!»). Справа — русалка на фонтане, кафе под зонтами, туристы с телефонами, голуби.
   На мольберте у Тома — золочёная рама: картина с той же площадью (сепия). На «картинам» Том стучит кистью по раме — картина вспыхивает,
   на «Чьим?» на раме проступает подпись с вопросом. Главный свет — низкое солнце справа (тёплое), тени влево; второй — холодное небо.
   Планы отдаёт через window.WQ для today/button (петля). */
(() => {
  EV.hk_paint = 0.05;
  EV.hk_pict = wtk('h1', 'картинам.');
  EV.hk_whose = wtk('h1', 'Чьим?');
  KEYW.push('Срисовали!', 'картинам.', 'Чьим?');
  SHAKES.push([EV.hk_pict, 0.25, 6]);
  const L = WA.ink, sweep = t => clamp((t - EV.hk_paint) / 1.5) * 1900 - 500;                  // x фронта мазка
  const FX = 720, FY = 1060, FW = 300, FH = 380;
  function sky(t, o = {}) { vgrad(-900, 1500, ['#3a6aa8', '#7aa8d0', '#f0c890', '#f4a868'], 1); glow(1150, 520, 260, 'rgba(255,220,150,1)', 0.35); ell(1150, 520, 70, 70, { wash: '#fff2c8', washA: 1, line: false });
    cloudsWA(t, -300, 5, '#fff4e0', 2501, 0.75, 10); birdsWA(t, 6, [-100, 0, 1100, 500], 2502); }
  function far(t, o = {}) {                                          // крыши и шпили за площадью: собор Св. Иоанна, башни
    sil([[-600, 1000], [-600, 760], [-300, 760], [-280, 700], [-100, 700], [-80, 760], [200, 760], [220, 660], [240, 760], [600, 760], [640, 620], [660, 500], [680, 620], [720, 760], [1100, 760], [1120, 690], [1300, 690], [1320, 760], [1700, 760], [1700, 1000]], '#7a6a8a', 1);
    shape([[560, 760], [580, 600], [660, 470], [740, 600], [760, 760]], { wash: '#9a4a3a', washA: 1, w: 2, col: '#3a2a3a' }); pencil([[660, 470], [660, 400]], { w: 3, col: '#3a2a3a', pass2: false });
    for (let i = 0; i < 5; i++) { rect(590 + i * 32, 640, 14, 60, { wash: '#4a3a4a', washA: 1, line: false }); }
    depthFog('#c8a8b8', 0.08); }
  function row(t, o = {}) {                                          // северная сторона Рынка: каменицы; эскиз → цвет под мазком
    const sw = o.sw ?? (o.done ? 3000 : sweep(t));
    ctx.save(); ctx.beginPath(); ctx.rect(-900, -500, sw + 900, 2400); ctx.clip(); rowKam(-420, 1290, 12, 2510, { w: 170, h: 470, each: { lit: o.lit || 0 } }); ctx.restore();
    if (sw < 1500) { ctx.save(); ctx.beginPath(); ctx.rect(sw, -500, 3000, 2400); ctx.clip(); vgrad(500, 1300, ['#f4e8cc', '#e8d8b0'], 0.9);
      const r = rng(2510); let x = -420; for (let i = 0; i < 12; i++) { const w = 170 * (0.8 + r() * 0.45), h = 470 * (0.85 + r() * 0.3); r(); r(); r(); r(); kam(x + w / 2, 1290, w, h, { ghost: 1, gcol: '#6a4a2a', ga: 0.8, floors: 4, cols: 2 }); x += w - 2; }
      ctx.restore();
      const yy = []; for (let i = 0; i <= 12; i++) yy.push([sw - 30 + Math.sin(i * 1.7 + t * 6) * 26, 380 + i * 80]);   // мазок-фронт
      pencil(yy, { w: 60, col: WA.gold, a: 0.9, pass2: false }); pencil(yy.map(p => [p[0] + 10, p[1]]), { w: 18, col: WA.goldL, a: 0.9, pass2: false }); }
    castShadow(-200, 1290, 1600, 60, Math.PI, 0.0); }
  function square(t, o = {}) {                                       // средний план: русалка, кафе, туристы, голуби
    mermaidW(1090, 1420, 1.0, {});
    umbrellaWA(150, 1380, 0.9, '#c8402a'); umbrellaWA(-120, 1400, 0.95, '#e8c040');
    const P = (x, y, s, sd, c, ex = {}) => human(x, y, s * 1.25, t, Object.assign({ body: c, legs: '#2a2a36', seed: sd }, ex));
    P(40, 1400, 0.5, 2521, PPLW.now[0], { armR: 'hold', prop: 'phone', look: [0.3, -0.4] }); P(260, 1396, 0.48, 2522, PPLW.now[1], { hat: 'cap', hatCol: '#2a2a36' }); P(560, 1404, 0.5, 2523, PPLW.now[2], { armR: 'point', flip: -1 });
    P(640, 1400, 0.46, 2524, PPLW.now[4], { hair: '#5a3a1a', face: 'smile' }); P(1100, 1410, 0.52, 2525, PPLW.now[3], { armR: 'hold', prop: 'phone', flip: -1 }); P(1240, 1404, 0.5, 2526, PPLW.now[5], { hat: 'straw' });
    P(-260, 1406, 0.5, 2527, '#6a3a7a', { hair: '#2a1a10', armR: 'wave' }); P(820, 1404, 0.44, 2528, '#3a6a4a', { flip: -1, face: 'grin' });
    for (let i = 0; i < 4; i++) { const fly = o.fly && t > o.fly ? (t - o.fly) * 400 : 0; pigeon(420 + i * 60 + fly * (i % 2 ? 1 : -0.5), 1430 - fly * 0.6, 0.8, t, i); }

    carriage(1320 - ((t * 40) % 300), 1430, 0.6, t, '#1a1a1a', -1);                                       // дорожка-извозчик у края площади
    human(-380, 1404, 0.62, t, { body: '#3a6aa8', legs: '#2a2a36', seed: 2532, hat: 'cap', hatCol: '#c8402a', armR: 'up' });   // продавец шариков
    for (let i = 0; i < 5; i++) { const bx = -400 + i * 22 + Math.sin(t * 2 + i) * 8, by = 1080 - (i % 2) * 40; pencil([[-370, 1250], [bx, by + 30]], { w: 1.2, col: '#3a3a3a', pass2: false }); ell(bx, by, 22, 28, { wash: ['#e84a3a', '#f0c040', '#3a8ac0', '#e86aa8', '#7ac04a'][i], washA: 1, w: 1.6, col: L }); }
    human(1000, 1404, 0.6, t, { body: '#6a3a2a', legs: '#2a2a36', seed: 2533, hat: 'merchant', hatCol: '#1a1a1a', beard: 1, flip: -1, armR: 'hold', armL: 'hold' }); rect(950, 1250, 60, 50, { wash: '#a8231c', washA: 1, w: 1.6, col: L }); for (let i = 0; i < 5; i++) pencil([[956 + i * 11, 1252], [956 + i * 11, 1298]], { w: 1.4, col: '#f4ecd8', pass2: false });   // аккордеонист
    for (let i = 0; i < 3; i++) { push(-40 + i * 34, 1430, 0.7); rect(-14, -30, 28, 30, { wash: '#a85a2a', washA: 1, w: 1.4, col: L }); ell(0, -40, 20, 14, { wash: ['#e84a3a', '#f0c040', '#e86aa8'][i], washA: 1, line: false }); pop(); }   // кадки с цветами
    lampWA(-20, 1420, 0.85, t, 0.6); lampWA(1200, 1420, 0.85, t, 0.6);
    rect(330, 1360, 90, 50, { wash: '#6a4a2a', washA: 1, w: 1.6, col: L }); for (let i = 0; i < 3; i++) ell(350 + i * 26, 1356, 12, 8, { wash: ['#e84a3a', '#f0c040', '#7ac04a'][i], washA: 1, line: false });   // лоток с цветами
    rect(470, 1370, 40, 40, { wash: '#2a3a5a', washA: 1, w: 1.4, col: L }); txt('i', 490, 1392, 26, { col: '#ffffff', font: 'Osw' }); }
  function ground(t, o = {}) {                                       // брусчатка в перспективе, солнечное пятно, тени
    rect(-1400, 1290, 3900, 1600, { wash: '#b89a7a', washA: 1, line: false });
    cobbles(-1400, 2500, 1300, 2700, '#a88a6a', '#7a624a', 2530, 1);
    lightPool(700, 1560, 700, 160, 'rgba(255,214,150,1)', 0.35); moodDark(-200, 1900, 300, 900, '#2a1a2a', 0.3); }
  function easelFrame(t, o = {}) {                                   // мольберт и рама с картиной той же площади
    easelW(FX, 1610, 1.0); const fl = t > EV.hk_pict && t < EV.hk_pict + 0.4 ? 1 - (t - EV.hk_pict) / 0.4 : 0;
    frameG(FX, FY, FW, FH, { b: 30, rot: Math.sin(t * 2) * 0.01 + (fl ? Math.sin(t * 60) * 0.02 : 0), inner: () => {
      vgrad(-FH / 2, FH / 2, ['#c8b48a', '#e0c898', '#a88a5a'], 1); push(0, 40, 0.28); const r = rng(2511); let x = -820; for (let i = 0; i < 9; i++) { const w = 180 * (0.85 + r() * 0.3); kam(x + w / 2, 300, w, 520, { col: ['#c89a5a', '#a86a4a', '#d8b878', '#8a7a5a'][i % 4], top: ['gable', 'attic', 'roof'][i % 3], floors: 4, cols: 2, seed: 2511 + i }); x += w; } pop();
      ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#6a4a20'; ctx.fillRect(-FW / 2, FH / 2 - 60, FW, 60); ctx.restore();
      for (let i = 0; i < 6; i++) ell(-110 + i * 44, FH / 2 - 40, 5, 12, { wash: '#3a2a1a', washA: 1, line: false });
      if (fl) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,230,160,' + (0.5 * fl) + ')'; ctx.fillRect(-FW / 2, -FH / 2, FW, FH); ctx.restore(); }
      if (t > EV.hk_whose - 0.1) signature(20, FH / 2 - 20, 0.5, t, { a: clamp((t - EV.hk_whose + 0.1) / 0.3), txt: 'Canaletto ?' }); } });
    castShadow(FX - 20, 1610, 120, 420, Math.PI * 0.86, 0.45);
    if (t > EV.hk_whose && t < EV.h2 + 0.3) { const q = popK(t, EV.hk_whose, 0.3); push(FX + 140, FY - 250, q, 0.08); txt('?', 0, 0, 120, { col: WA.goldL, font: 'Osw' }); pop(); }
    paletteW(FX + 120, 1600, 0.8, 0.2); for (let i = 0; i < 4; i++) rect(FX - 160 + i * 22, 1560, 14, 44, { wash: ['#c8402a', '#3a6aa8', '#e8c040', '#f4ecd8'][i], washA: 1, w: 1.2, col: L }); }
  function front(t) {                                                // рама кадра: край зонта и фонарь
    blob([[-700, -300], [-200, -380], [100, -300], [-100, -260], [-700, -200]], { wash: '#a83020', washA: 1, w: 2, col: L }); pencil([[1360, 2300], [1360, 400]], { w: 22, col: '#12100e', pass2: false }); sil([[1300, 400], [1420, 400], [1400, 330], [1320, 330]], '#12100e', 1); glow(1360, 365, 80, 'rgba(255,214,140,1)', 0.25); }
  window.WQ = { sky, far, row, square, ground, easelFrame, front };
  WORLD.hook = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => far(t));
    lay(6, () => row(t));
    lay(4.5, () => ground(t));
    lay(3.2, () => square(t, { fly: EV.hk_pict }));
    lay(1, () => { lightPool(560, 1640, 600, 140, 'rgba(255,214,150,1)', 0.3); castShadow(330, 1610, 160, 420, Math.PI * 0.86, 0.4); easelFrame(t); cat(); });
    lay(2, () => motes(18, [0, 600, 1100, 1500], '#ffe8b0', t, 2531, { sp: 4, sz: 2, a: 0.45, wob: 16, add: 1 }));
    lay(0.62, () => front(t));
    shaft(1150, 300, 260, 1600, 0.45, 'rgba(255,220,160,1)', 0.12);
  };
  DIR.hook = {
    outfit: 'hoodieWA', light: { side: 1, rim: '#ffd890' }, grade: ['#f0a050', 0.08],
    act: () => [[0, 'shock'], [EV.hk_pict, 'awe'], [EV.hk_whose, 'suspicious'], [EV.h2, 'grin']],
    pose: (t, u, b) => { const tap = t > EV.hk_pict - 0.15 && t < EV.hk_pict + 0.35, tk = clamp((t - EV.hk_pict + 0.15) / 0.15);
      return Object.assign(b, { x: 330, y: 1610, s: 0.98, look: t < EV.hk_pict - 0.2 ? [-0.6, -0.5] : t < EV.h2 ? [0.9, -0.2] : [0.1, -0.2], prop: 'brush', propAng: tap ? -1.2 + tk * 0.6 : -0.4,
        hand: tap ? [lerp(220, 290, tk), -380] : t > EV.h2 ? [140, -430] : [160, -300], squash: tap && tk > 0.9 ? 0.08 : b.squash, tailUp: t > EV.h2 }); },
    cam: () => [[0, 540, 1000, 0.0], [EV.hk_pict, 580, 1020, 0.05], [EV.hk_whose, 640, 1020, 0.1], [EV.h2, 560, 980, 0.06], [S1.hook, 540, 960, 0.12]]
  };
})();
