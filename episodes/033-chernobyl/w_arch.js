/* 033 — сцена `arch`, ноябрь 2016. Площадка ЧАЭС: старый саркофаг «Укрытие» (ступенчатый бетон), гигантская стальная арка едет
   по рельсам и накрывает его; гусеничный кран, вагончики, рабочие в оранжевых жилетах и касках, разметка, бетонные блоки, прожекторы.
   Главный свет — низкое ноябрьское солнце слева сквозь разрыв серых облаков (луч на арку, блики на стали), холодные тени вправо.
   На «Три дня…» табло-счётчик дней крутится 3 → 14 610 = «40 ЛЕТ» (сувенир); на «аркой» Том (оранжевая роба) тянет рычаг гидродомкрата —
   арка доезжает и закрывает саркофаг (лязг); на «сто» — плашка «2016 · 36 000 Т · ≈ 1,5 МЛРД € · НА 100 ЛЕТ». */
(() => {
  const L = CH.ink, SUN = [180, 480];
  EV.ar_days = LS('s7'); EV.ar_40 = wtk('s7', 'сорок'); EV.ar_arch = wtk('s7', 'аркой'); EV.ar_100 = wtk('s7', 'сто'); EV.ar_lock = EV.ar_arch + 1.0;
  KEYW.push('лет.', 'аркой');
  const SLIDE = t => sm(clamp((t - EV.ar_arch + 0.1) / 1.1));
  function sky(t) { vgrad(-900, 1100, ['#5a6a80', '#9aa8b8', '#d8d0c4', '#e8c8a0'], 1); for (let i = 0; i < 6; i++) { const r = rng(5800 + i), y = 200 + i * 70, dx = (t * 14 + i * 50) % 260; blob([[-260 + dx, y], [200 + dx + r() * 100, y - 30], [800 + dx, y - 10], [1300, y + 16], [300, y + 30]], { wash: i % 2 ? '#7a8494' : '#a8b0bc', washA: 0.7, line: false }); }
    glow(SUN[0], SUN[1], 200, 'rgba(255,220,170,1)', 0.4); ell(SUN[0], SUN[1], 44, 44, { wash: '#fff2d8', washA: 1, line: false });
    for (let i = 0; i < 5; i++) { const x = 500 + i * 110 + Math.sin(t + i) * 20, y = 520 + (i % 2) * 30; pencil([[x - 11, y - Math.sin(t * 9 + i) * 5], [x, y], [x + 11, y - Math.sin(t * 9 + i) * 5]], { w: 2.6, col: '#2a2a30', pass2: false }); } }
  function far(t) { hills(1010, 16, '#6a7a6a', 5.1); for (let i = 0; i < 12; i++) { const r = rng(5810 + i); polPine(-200 + i * 130 + r() * 40, 1020, 140 + r() * 60, t, 90 + i, { col: '#4a5a4a', colD: '#3a4a3a' }); }
    nppBlock(-80, 1020, 0.55, t, { stack: false, col: '#9a9a96' }); panel16(1160, 1020, 160, 200, t, { col: '#b8b4aa', dark: 1, winCol: '#3a4048' }); depthFog('#d8d4cc', 0.08); }
  function site(t) {                                                 // саркофаг, рельсы, арка, кран, рабочие
    const s = SLIDE(t), ax = lerp(1240, 640, s);
    for (let i = 0; i < 3; i++) pencil([[-200, 1230 + i * 12], [1500, 1230 + i * 12]], { w: 5, col: '#5a5a62', pass2: false }); for (let i = 0; i < 30; i++) rect(-200 + i * 60, 1226, 14, 40, { wash: '#6a5a4a', washA: 1, w: 1, col: L });
    sarcophagus(640, 1230, 0.9, t); archNSC(ax, 1240, 1.05, t, {}); if (s > 0 && s < 1) for (let i = 0; i < 6; i++) { const r = rng(hsh(FRAME, i)); ell(ax + 560 + r() * 40, 1220 - r() * 30, 20, 10, { wash: '#d8d4cc', washA: 0.5, line: false }); }
    push(1180, 1300, 0.8); rect(-120, -90, 240, 70, { wash: '#c8281e', washA: 1, w: 2, col: L }); rect(-140, -26, 280, 30, { wash: '#2a2a30', washA: 1, w: 2, col: L, shade: { gap: 10, a: 0.4, col: '#000000', ang: 0 } }); pencil([[0, -90], [-260, -620]], { w: 10, col: '#c8281e', pass2: false });
    for (let i = 0; i < 9; i++) pencil([[-i * 29, -90 - i * 59], [-(i + 1) * 29, -90 - (i + 1) * 59 + 30]], { w: 2, col: '#c8281e', pass2: false }); pencil([[-260, -620], [-260, -460]], { w: 2, col: '#2a2a2a', pass2: false }); rect(-286, -460, 52, 40, { wash: '#8a8a8a', washA: 1, w: 1.6, col: L }); pop();
    const P = [[170, 'hold'], [250, 'wave'], [420, 'hold'], [880, 'swing'], [960, 'wave'], [1040, 'hold'], [330, 'swing']];
    P.forEach(([x, a], i) => human(x, 1330, 0.62, t, { body: i % 3 ? '#e8741e' : '#f2f0e8', bodyD: '#7a3008', hat: 'helmet', legs: '#3a4a6a', armR: a, flip: x > 640 ? -1 : 1, seed: 5820 + i, face: t > EV.ar_lock ? 'grin' : 'smile' }));
    for (let i = 0; i < 2; i++) { push(40 + i * 140, 1320, 0.7); rect(-60, -130, 120, 130, { wash: ['#2a6aa8', '#e8e4d8'][i], washA: 1, w: 2, col: L }); rect(-40, -100, 40, 40, { wash: '#ffd890', washA: 1, w: 1.4, col: L }); pop(); }
  }
  function ground(t) {                                               // бетон с разметкой, лужи, конусы, кабели, блоки, полынь у забора
    rect(-500, 1360, 2200, 1000, { wash: '#8a8a88', washA: 1, w: 2, col: L, shade: { gap: 14, a: 0.06, col: '#3a3a3a', ang: 0.2 } }); for (let i = 0; i < 6; i++) poly([[-300 + i * 340, 1700], [-180 + i * 340, 1700], [-120 + i * 340, 1400], [-200 + i * 340, 1400]], { wash: '#e8c830', washA: 0.7, line: false });
    for (let i = 0; i < 3; i++) { push(-40 + i * 520, 1820 - (i % 2) * 120, 1); blob([[-110, 0], [-80, -22], [90, -24], [120, 0], [60, 18], [-80, 16]], { wash: '#a8b8c8', washA: 1, w: 1.6, col: L }); pencil([[-60, -6], [40, -8]], { w: 3, col: '#e8f2fa', a: 0.7, pass2: false }); pop(); }
    for (let i = 0; i < 5; i++) { push(760 + i * 90, 1620 + (i % 2) * 40, 1); poly([[-24, 0], [-8, -70], [8, -70], [24, 0]], { wash: '#f06a1e', washA: 1, w: 1.6, col: L }); rect(-14, -46, 28, 12, { wash: '#ffffff', washA: 1, line: false }); rect(-30, -6, 60, 10, { wash: '#2a2a2a', washA: 1, line: false }); pop(); }
    pencil([[-300, 1560], [200, 1580], [600, 1540], [1400, 1600]], { w: 7, col: '#1a1a1e', pass2: false }); pencil([[-300, 1590], [300, 1610], [900, 1570], [1400, 1630]], { w: 6, col: '#2a5aa8', pass2: false });
    for (let i = 0; i < 2; i++) rect(1000 + i * 150, 1860 - i * 30, 140, 90, { wash: '#a8a49a', washA: 1, w: 2, col: L, shade: { gap: 8, a: 0.2, col: '#5a5a52', ang: 1.3 } });
    push(560, 1700, 1); rect(-40, -120, 80, 120, { wash: '#3a4a5a', washA: 1, w: 2.2, col: L }); rect(-26, -100, 52, 40, { wash: '#c8d8e0', washA: 1, w: 1.4, col: L }); const lv = t > EV.ar_arch ? 0.8 : -0.4; pencil([[0, -120], [Math.sin(lv) * 90, -120 - Math.cos(lv) * 90]], { w: 8, col: '#c8281e', pass2: false }); ell(Math.sin(lv) * 90, -120 - Math.cos(lv) * 90, 14, 14, { wash: '#1a1a1a', washA: 1, w: 1.4, col: L }); pop();
    for (let i = 0; i < 3; i++) mugwort(-120 + i * 60, 1950, 1.1, t, 140 + i);
    for (let i = 0; i < 3; i++) human(860 + i * 130, 1900 + (i % 2) * 30, 1.0, t, { body: i === 1 ? '#f2f0e8' : '#e8741e', bodyD: '#7a3008', hat: 'helmet', legs: '#3a4a6a', armR: i === 2 ? 'wave' : 'hold', prop: i === 0 ? 'phone' : undefined, flip: -1, seed: 5840 + i, face: t > EV.ar_lock ? 'grin' : 'smile' });
    push(160, 1880, 1); rect(-90, -50, 180, 50, { wash: '#3a6aa8', washA: 1, w: 2, col: L }); for (let q = 0; q < 4; q++) rect(-80 + q * 42, -90, 36, 40, { wash: '#a8a49a', washA: 1, w: 1.4, col: L }); ell(-60, 0, 16, 16, { wash: '#2a2a2e', washA: 1, w: 1.4, col: L }); ell(60, 0, 16, 16, { wash: '#2a2a2e', washA: 1, w: 1.4, col: L }); pop(); for (let i = 0; i < 9; i++) pencil([[-200 + i * 30, 2000], [-200 + i * 30, 1820]], { w: 4, col: '#6a6a70', pass2: false });
    lightPool(700, 1600, 1000, 200, 'rgba(255,220,170,1)', 0.25); castShadow(400, 1700, 110, 560, 0.6, 0.32); moodDark(1100, 1000, 900, 1900, '#1a2030', 0.18);
  }
  function front(t) { for (const x of [-160, 1240]) { for (let i = 0; i < 4; i++) pencil([[x - 60 + i * 40, 2300], [x - 60 + i * 40, 900]], { w: 6, col: '#3a3a40', pass2: false }); for (let i = 0; i < 8; i++) pencil([[x - 70, 950 + i * 160], [x + 70, 1030 + i * 160]], { w: 3, col: '#5a5a62', pass2: false }); pencil([[x - 80, 920], [x + 80, 920]], { w: 6, col: '#3a3a40', pass2: false }); } }
  function hud(t) {
    if (t < EV.ar_arch) { const k = popK(t, EV.ar_days, 0.3), f = sm(clamp((t - EV.ar_40) / 0.9)), n = Math.round(lerp(3, 14610, f)); push(640, 1000, k * 0.9, -0.02); ctx.save(); ctx.fillStyle = 'rgba(16,14,12,0.92)'; ctx.fillRect(-270, -110, 540, 220); ctx.restore();
      pencil([[-270, -110], [270, -110], [270, 110], [-270, 110], [-270, -110]], { w: 5, col: CH.dos, pass2: false, gap: false }); txt('«НА 3 ДНЯ»', 0, -60, 40, { col: '#ffe08a', font: 'Osw' }); txt(n.toLocaleString('ru-RU') + ' ДНЕЙ', 0, 10, 72, { col: '#fff6e0', font: 'Osw' }); if (f > 0.9) txt('= 40 ЛЕТ', 0, 80, 54, { col: '#ff8a6a', font: 'Osw' }); pop(); }
    else chBoard(640, 980, 0.85, t, EV.ar_100 - 0.1, [['2016 · АРКА', 48, '#ffe08a'], ['36 000 Т · ≈ 1,5 МЛРД €', 42], ['НА 100 ЛЕТ', 60, '#8ae0ff']], { w: 560 });
  }
  WORLD.arch = (t, u, cat) => {
    lay(40, () => sky(t)); lay(15, () => far(t)); lay(3.4, () => { site(t); depthFog('#e0dcd4', 0.03); }); lay(1, () => { ground(t); cat(); }); lay(0.62, () => front(t));
    lay(3, () => { rays(SUN[0], SUN[1], 0.6, 0.35, 1500, 'rgba(255,226,180,1)', 0.12, 5, t); motes(14, [-100, 700, 1200, 1600], '#f0f0f0', t, 5830, { sp: 3, sz: 2.4, a: 0.4, wob: 10, add: 1 }); });
  };
  DIR.arch = {
    outfit: 'stroyCH', light: { side: -1, rim: '#ffe0b0' }, grade: ['#1a2030', 0.05],
    act: () => [[S0.arch, 'sideeye'], [EV.ar_40, 'annoyed'], [EV.ar_arch, 'proud'], [EV.ar_lock, 'grin'], [EV.ar_100, 'smug']],
    pose: (t, u, b) => { const pull = t > EV.ar_arch - 0.15 && t < EV.ar_arch + 0.4; return Object.assign(b, { x: 390, y: 1720, s: 0.95, look: t < EV.ar_arch ? [0.3, -0.3] : [0.7, -0.7], hand: pull ? [200, -200] : [150, -300], squash: pull ? 0.06 : b.squash, point: t > EV.ar_lock }); },
    hud,
    cam: () => [[S0.arch, 600, 1000, -0.12], [EV.ar_40, 600, 980, -0.1], [EV.ar_arch, 680, 940, -0.06, 'x'], [EV.ar_lock, 660, 960, -0.04], [S1.arch, 640, 980, 0]]
  };
  SHAKES.push([EV.ar_lock, 0.2, 6]);
  TRANS_IN.arch = { a: 0.1, b: 0.3, fx(k, t, A, B) { const e = sm(k); drawBuf(B); scr(() => { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H * (1 - e)); ctx.clip(); ctx.drawImage(A, 0, -e * 300); ctx.restore(); }); } };
})();
