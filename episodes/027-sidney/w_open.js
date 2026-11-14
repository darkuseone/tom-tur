/* 027 — сцена `open`: 20 октября 1973, ночь открытия. Готовая опера в золотой подсветке, над ней салют, по заливу яхты с огнями,
   у лестницы — ковровая дорожка, гости в вечерних нарядах, оркестр, вспышки фотографов. Главный свет — подсветка оперы (тёплый),
   второй — синяя ночь. Том в смокинге (tux) с бокалом: на «десять» — табличка «1963 → 1973 · +10 ЛЕТ», на «Сто» — ценник
   «$7 → $102 МЛН», на «семи» Том чуть не роняет бокал. Переход В — салют раскрывается на весь кадр. */
(() => {
  EV.op_open = wtk('s6', 'Открыли');
  EV.op_10 = wtk('s6', 'десять');
  EV.op_102 = wtk('s6', 'Сто');
  EV.op_7 = wtk('s6', 'семи!');
  KEYW.push('Открыли', 'десять', 'семи!');
  SHAKES.push([EV.op_7, 0.25, 7]);
  const L = SY.ink, OP = [640, 1180];
  function sky(t) { vgrad(-900, 1200, ['#060818', '#101a3a', '#2a2a5a'], 1); const r = rng(3460); ctx.save(); ctx.fillStyle = '#fff8e8'; for (let i = 0; i < 60; i++) { ctx.globalAlpha = 0.2 + 0.5 * r(); ctx.fillRect(r() * 1300 - 100, r() * 700 - 100, 2.2, 2.2); } ctx.restore();
    for (let i = 0; i < 5; i++) { const ph = ((t - S0.open) * 0.5 + i * 0.21) % 1, x = 200 + i * 200, y = 600 - i % 2 * 120, rr = ph * 260; if (ph < 0.75) { const c = ['#ff6a8a', '#ffe08a', '#8ae0ff', '#c88aff', '#8aff9a'][i]; for (let k = 0; k < 18; k++) { const a = k / 18 * 6.283; pencil([[x + Math.cos(a) * rr * 0.6, y + Math.sin(a) * rr * 0.6 + ph * 40], [x + Math.cos(a) * rr, y + Math.sin(a) * rr + ph * 60]], { w: 3, col: c, a: 1 - ph / 0.75, pass2: false }); } glow(x, y, rr * 0.5, 'rgba(255,240,200,1)', 0.12 * (1 - ph)); } } }
  function city(t) { hills(1020, 40, '#14182a', 3461); for (let i = 0; i < 16; i++) { const x = -300 + i * 100, h = 90 + (i * 41) % 160; rect(x - 36, 1020 - h, 72, h, { wash: '#1a1e30', washA: 1, line: false }); windows(x - 30, 1020 - h + 10, 60, h - 20, 3, Math.floor(h / 26), 3462 + i, 0.5, '#ffd98a', '#bfe0ff', 0.8); } harbourB(1100, 1060, 0.55, t, { col: '#2a2e40', lit: 1 }); depthFog('#1a2040', 0.08); }
  function opera(t) {                                                // опера в подсветке, вода с отражениями, яхты
    vgrad(1040, 1400, ['#1a2a4a', '#0a1428'], 1); operaH(OP[0], OP[1], 1.1, t, { lit: 1 });
    glow(OP[0], OP[1] - 200, 380, 'rgba(255,220,150,1)', 0.25); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.3; for (let i = 0; i < 14; i++) { ctx.fillStyle = '#ffd890'; ctx.fillRect(OP[0] - 300 + i * 44, 1200 + (i % 3) * 18, 26, 4); } ctx.restore();
    for (const [x, y] of [[180, 1250], [1080, 1270]]) { push(x, y + Math.sin(t * 2 + x) * 4, 0.5); shape([[-60, 0], [60, 0], [44, 20], [-44, 20]], { wash: '#f4f2ec', washA: 1, w: 1.6, col: L }); pencil([[0, 0], [0, -140]], { w: 3, col: L, pass2: false }); for (let q = 0; q < 6; q++) ell(-50 + q * 20, -140 + q * 24, 4, 4, { wash: '#ffe8a8', washA: 1, line: false }); pop(); }
  }
  function steps(t) {                                                // лестница, ковровая дорожка, гости, оркестр, фотографы
    rect(-500, 1300, 2100, 100, { wash: '#c8a878', washA: 1, w: 2, col: L }); for (let j = 0; j < 4; j++) pencil([[-500, 1310 + j * 24], [1600, 1310 + j * 24]], { w: 2, col: '#8a6a4a', pass2: false }); rect(380, 1300, 300, 100, { wash: '#b8201e', washA: 1, w: 1.6, col: L });
    const G = [[-80, '#1a1a20', null, 'hold'], [60, '#c83a6a', 'scarf', 'wave'], [200, '#1a1a20', null, 'hold'], [760, '#3a2a6a', 'scarf', 'wave'], [880, '#1a1a20', null, 'hold'], [1000, '#e8c050', 'scarf', 'hold']];
    G.forEach(([x, c, h, a], i) => human(x, 1310, 0.55, t, { body: c, hat: h, hatCol: c, long: h ? 1 : 0, legs: '#1a1a20', trim: '#f4f0e8', hair: i % 2 ? '#c8a050' : '#2a1a10', armR: a, flip: i % 2 ? -1 : 1, seed: 3470 + i, face: 'smile' }));
    for (const x of [1150, 1260]) { human(x, 1310, 0.55, t, { body: '#3a3a42', hat: 'boater', hatCol: '#2a2a30', armR: 'up', seed: 3480 + x, flip: -1 }); const fl = Math.sin(t * 7 + x) > 0.85; rect(x - 60, 1310 - 230, 40, 30, { wash: '#2a2a30', washA: 1, w: 1.4, col: L }); if (fl) glow(x - 40, 1310 - 230, 90, 'rgba(255,255,255,1)', 0.7); }
  }
  function terrace(t) {                                              // терраса под Томом: плиты, столик с шампанским, программки
    rect(-500, 1420, 2100, 900, { wash: '#4a4048', washA: 1, w: 2, col: L }); for (let j = 0; j < 8; j++) for (let i = 0; i < 16; i++) rect(-500 + i * 130 + (j % 2) * 65, 1424 + j * 70, 128, 68, { wash: (i + j) % 2 ? '#5a4e56' : '#4a4048', washA: 1, w: 1, col: '#2a2228' });
    lightPool(OP[0] - 200, 1620, 600, 140, 'rgba(255,220,150,1)', 0.45);
    push(900, 1640, 1); rect(-100, -150, 200, 20, { wash: '#f4f0e8', washA: 1, w: 2, col: L }); pencil([[0, -130], [0, 0]], { w: 8, col: '#2a2a30', pass2: false }); for (const k of [-50, 0, 50]) { pencil([[k, -152], [k, -190]], { w: 3, col: '#e8f0f4', pass2: false }); shape([[k - 14, -190], [k + 14, -190], [k + 8, -230], [k - 8, -230]], { wash: '#ffe8a0', washA: 0.85, w: 1.4, col: L }); } pop();
    for (let q = 0; q < 3; q++) { push(140 + q * 50, 1760 + q * 10, 1, -0.2 + q * 0.2); rect(-40, -54, 80, 108, { wash: '#f2ece0', washA: 1, w: 1.4, col: L }); operaH(0, 20, 0.08, t, { cranes: false }); pop(); }
    for (let q = 0; q < 4; q++) { const x = 520 + q * 70; human(x, 1560, 0.5, t, { body: '#1a1a20', legs: '#1a1a20', hair: '#2a1a10', armR: 'up', armL: 'hold', seed: 3495 + q, face: 'calm' }); pencil([[x - 30, 1560 - 170], [x + 40, 1560 - 140]], { w: 3, col: '#8a5a2a', pass2: false }); ell(x + 30, 1560 - 150, 22, 12, { wash: '#8a4a1e', washA: 1, w: 1.2, col: L, rot: 0.4 }); }   // струнный квартет
    for (let i = 0; i < 14; i++) { const x = -200 + i * 110, y = 1440 + Math.sin(i * 0.9) * 20; pencil([[x, y], [x + 110, y + 10]], { w: 2, col: '#3a3a42', pass2: false }); shape([[x + 40, y + 4], [x + 70, y + 6], [x + 55, y + 40]], { wash: ['#ff6a8a', '#ffe08a', '#8ae0ff', '#c88aff'][i % 4], washA: 1, w: 1, col: L }); }   // флажки
    for (const x of [1180, 1300]) { push(x, 1700, 1); ell(0, -110, 70, 14, { wash: '#f4f0e8', washA: 1, w: 2, col: L }); pencil([[0, -100], [0, 0]], { w: 6, col: '#2a2a30', pass2: false }); for (const k of [-30, 20]) { pencil([[k, -120], [k, -150]], { w: 2, col: '#e8f0f4', pass2: false }); shape([[k - 10, -150], [k + 10, -150], [k + 6, -180], [k - 6, -180]], { wash: '#ffe8a0', washA: 0.85, w: 1.2, col: L }); } pop(); }
    castShadow(330, 1612, 120, 480, -0.3, 0.4); moodDark(OP[0], 1100, 900, 1800, '#04060e', 0.4);
  }
  function hud(t) {
    if (t > EV.op_10 - 0.05 && t < EV.op_102) { const q = popK(t, EV.op_10 - 0.05, 0.3); push(560, 800, q, -0.03); rect(-250, -66, 500, 132, { wash: '#14100a', washA: 0.92, w: 3, col: SY.goldL }); txt('1963 → 1973', 0, -10, 54, { col: SY.goldL, font: 'Osw' }); txt('+10 ЛЕТ', 0, 42, 32, { col: '#ff8a6a', font: 'Osw' }); pop(); }
    if (t > EV.op_102 - 0.05) { const q = popK(t, EV.op_102 - 0.05, 0.35), big = t > EV.op_7 ? 1 + 0.1 * Math.exp(-(t - EV.op_7) * 6) : 1; push(560, 820, q * big, 0.03); shape([[-260, -80], [220, -80], [280, 0], [220, 80], [-260, 80]], { wash: SY.red, washA: 1, w: 3.4, col: L }); ell(240, 0, 12, 12, { wash: '#1a1a1e', washA: 1, line: false });
      txt('$7', -170, -6, 48, { col: '#ffd0c0', font: 'Osw' }); pencil([[-210, -6], [-130, -6]], { w: 5, col: '#ffd0c0', pass2: false }); txt('→ $102 МЛН', 40, -4, 60, { col: '#fff2d6', font: 'Osw' }); pop(); }
  }
  function front(t) { const r = rng(3490); for (let i = 0; i < 26; i++) { const ph = ((t - S0.open) * 0.3 + r()) % 1; push(r() * 1300 - 100, ph * 2000 - 100, 1, t * 3 + i); rect(-8, -4, 16, 8, { wash: ['#ff6a8a', '#ffe08a', '#8ae0ff', '#c88aff'][i % 4], washA: 0.95, line: false }); pop(); } rect(-200, 1900, 1500, 400, { wash: '#1a1418', washA: 1, line: false }); }
  WORLD.open = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => city(t));
    lay(6, () => opera(t));
    lay(2.6, () => { steps(t); depthFog('#1a1a3a', 0.05); });
    lay(1, () => { terrace(t); cat(); });
    lay(0.6, () => front(t));
  };
  DIR.open = {
    outfit: 'tux', light: { side: 1, rim: '#ffd890' }, grade: ['#1a1a3a', 0.06],
    act: () => [[S0.open, 'grin'], [EV.op_10, 'sideeye'], [EV.op_102, 'shock'], [EV.op_7, 'scared']],
    pose: (t, u, b) => { const wob = t > EV.op_7 ? Math.exp(-(t - EV.op_7) * 4) * Math.sin((t - EV.op_7) * 20) * 40 : 0; return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.op_102 ? [0.5, -0.8] : [0.6, -0.4], hand: [180 + wob, -380 + Math.abs(wob)], tailUp: t < EV.op_102, squash: t > EV.op_7 && t < EV.op_7 + 0.15 ? 0.08 : b.squash }); },
    afterCat: (t, u, P) => { const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s, tilt = t > EV.op_7 ? Math.sin((t - EV.op_7) * 20) * Math.exp(-(t - EV.op_7) * 4) : 0; push(x + 6, y - 20, 1.2, tilt); pencil([[0, 0], [0, -40]], { w: 3, col: '#e8f0f4', pass2: false }); shape([[-14, -40], [14, -40], [8, -90], [-8, -90]], { wash: '#ffe8a0', washA: 0.9, w: 1.4, col: L }); pop(); },
    cam: () => [[S0.open, 620, 960, -0.04], [EV.op_open, 620, 980, 0.0], [EV.op_10, 580, 1000, 0.06], [EV.op_102, 560, 1020, 0.12, 'x'], [S1.open, 540, 1040, 0.14]],
    hud
  };
  TRANS_IN.open = { a: 0.12, b: 0.4, fx(k, t, A, B) {               // салют раскрывается на весь кадр
    const e = sm(k); drawBuf(e < 0.5 ? A : B); scr(() => { const R = 1600 * e, a = Math.sin(e * Math.PI); for (let i = 0; i < 40; i++) { const an = i / 40 * 6.283; pencil([[540 + Math.cos(an) * R * 0.3, 960 + Math.sin(an) * R * 0.3], [540 + Math.cos(an) * R, 960 + Math.sin(an) * R]], { w: 10, col: ['#ff6a8a', '#ffe08a', '#8ae0ff', '#c88aff'][i % 4], a, pass2: false }); } if (e > 0.35 && e < 0.65) screenFill('#fff4d8', a * 0.6, 'source-over'); });
  } };
})();
