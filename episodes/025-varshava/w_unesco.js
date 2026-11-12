/* 025 — сцена `unesco`: 1980, южная сторона Рынка Старого города в синий час. Каменицы с горящими окнами, фонари, у края площади
   «малюх» Fiat 126p и «Сирена», люди в одежде 80-х (дублёнки, вельвет, сетка-авоська), продавец газет, скамейка, урна, афишная тумба.
   На столе на площади — грамота «ЮНЕСКО · ВСЕМИРНОЕ НАСЛЕДИЕ» под лампой. Том в сером костюме.
   На «восьмидесятом» вспыхивают окна по цепочке; на «наследие» Том с размаху ставит печать — красный штамп и брызги чернил, вспышка
   фотоаппаратов; на «Хотя» он косится на дома; на «тридцать» перед ним вспыхивает торт со свечками «30», над фасадами — бирка «≈30 ЛЕТ».
   Главный свет — тёплый фонарь над столом, второй — холодное синее небо. Переход В сцену — широкий мазок кисти по диагонали. */
(() => {
  EV.un_80 = wtk('u1', 'восьмидесятом');
  EV.un_stamp = wtk('u1', 'наследие.');
  EV.un_old = wtk('u1', 'Хотя');
  EV.un_30 = wtk('u1', 'тридцать.');
  KEYW.push('ЮНЕСКО', 'наследие.', 'тридцать.');
  SHAKES.push([EV.un_stamp + 0.08, 0.25, 9]);
  const L = WA.ink, TX = 690, TY = 1590, lit = t => clamp((t - EV.un_80) / 0.8);
  function sky(t) { vgrad(-900, 1400, ['#0c1438', '#1e2e6a', '#3a4a8a', '#7a6a9a'], 1); const r = rng(2561); ctx.save(); for (let i = 0; i < 40; i++) { ctx.globalAlpha = 0.4 + 0.4 * Math.sin(t * 2 + i); ctx.fillStyle = '#e8f0ff'; ctx.fillRect(r() * 1400 - 150, r() * 600 - 200, 3, 3); } ctx.restore();
    ell(180, 180, 46, 46, { wash: '#f4eed8', washA: 1, line: false }); glow(180, 180, 120, 'rgba(220,230,255,1)', 0.2); cloudsWA(t, 0, 3, '#4a5a9a', 2562, 0.6, 5); }
  function far(t) { sil([[-700, 1050], [-700, 820], [-520, 820], [-500, 740], [-380, 740], [-360, 820], [-60, 820], [-40, 600], [-20, 820], [300, 820], [320, 760], [700, 760], [720, 520], [740, 760], [1100, 760], [1110, 700], [1400, 700], [1420, 820], [1800, 820], [1800, 1050]], '#1a2048', 1);
    for (let i = 0; i < 18; i++) { const r = rng(2563 + i); if (r() < 0.5) rect(-600 + i * 120 + r() * 40, 800 + r() * 100, 12, 18, { wash: '#ffcf78', washA: 0.8 * lit(t), line: false }); } depthFog('#2a3a7a', 0.08); }
  function row(t) {                                                  // южная сторона Рынка: окна загораются по цепочке
    const r = rng(2564); let x = -460; for (let i = 0; i < 11; i++) { const w = 160 * (0.85 + r() * 0.35), h = 480 * (0.85 + r() * 0.3), on = lit(t) > i / 11;
      kam(x + w / 2, 1290, w, h, { col: ['#c8763a', '#7a8aa0', '#d8b860', '#a8483a', '#6a9a7a', '#e0c890'][i % 6], top: ['attic', 'gable', 'roof'][i % 3], floors: 4 + (i % 2), cols: 2, seed: 2564 + i * 3, lit: on ? 0.7 : 0.1, frieze: i % 3 === 1, sign: i === 3 ? 'KAWA' : i === 7 ? 'APTEKA' : null }); x += w - 2; }
    moodDark(540, 900, 400, 1200, '#0a0e2a', 0.35); }
  function square(t) {                                               // площадь: люди 80-х, машины, тумба, газетчик
    rect(-1400, 1280, 3900, 1600, { wash: '#4a4a5a', washA: 1, line: false }); cobbles(-1400, 2500, 1290, 2700, '#5a5a6a', '#34344a', 2565, 1);
    const P = (x, y, s, sd, c, ex = {}) => human(x, y, s, t, Object.assign({ body: c, legs: '#2a2a36', seed: sd }, ex));
    fiat126(40, 1420, 0.95, '#e8c040'); fiat126(1060, 1424, 0.9, '#c8402a', -1);
    P(160, 1390, 0.62, 2566, '#7a5a3a', { hat: 'fur', hatCol: '#4a3a2a', armR: 'hold', prop: 'scroll' }); P(260, 1396, 0.6, 2567, '#3a4a6a', { hair: '#3a2a1a', face: 'smile' });
    P(430, 1384, 0.58, 2568, '#8a4a3a', { armR: 'up', look: [0.6, -0.4], hat: 'cap', hatCol: '#1a1a1a' }); rect(458, 1170, 40, 26, { wash: '#1a1a1a', washA: 1, w: 1.2, col: L });
    P(900, 1390, 0.6, 2569, '#4a6a5a', { flip: -1, hair: '#c89a5a', armL: 'hold' }); P(980, 1396, 0.62, 2570, '#5a4a6a', { flip: -1, beard: 1, hat: 'cap', hatCol: '#3a3a3a' });
    P(1040, 1384, 0.56, 2571, '#9a6a3a', { flip: -1, face: 'grin', armR: 'wave' }); P(-300, 1396, 0.62, 2572, '#3a3a4a', { armR: 'hold', prop: 'scroll' }); P(600, 1386, 0.54, 2573, '#6a3a3a', { look: [0.4, -0.2], hair: '#2a1a10' });
    push(330, 1400, 0.9); rect(-50, -210, 100, 210, { wash: '#6a7a5a', washA: 1, w: 2, col: L }); ell(0, -214, 58, 14, { wash: '#4a5a3a', washA: 1, w: 1.8, col: L }); for (let i = 0; i < 3; i++) rect(-44, -190 + i * 60, 88, 50, { wash: ['#e8d8b0', '#d8a050', '#c8d0e0'][i], washA: 1, w: 1.2, col: L }); txt('KINO', 0, -160, 22, { col: '#a8231c', font: 'Osw' }); pop();   // афишная тумба
    push(770, 1400, 0.9); rect(-70, -60, 140, 20, { wash: '#6a4426', washA: 1, w: 1.8, col: L }); rect(-70, -100, 140, 10, { wash: '#6a4426', washA: 1, w: 1.6, col: L }); for (const k of [-60, 60]) pencil([[k, -40], [k, 0]], { w: 5, col: '#2a2a2a', pass2: false }); pop();   // скамейка
    push(540, 1400, 0.9); rect(-22, -56, 44, 56, { wash: '#3a4a3a', washA: 1, w: 1.6, col: L }); pop();   // урна
    lampWA(40, 1400, 0.9, t, 1); lampWA(1000, 1400, 0.9, t, 1); lightPool(110, 1420, 160, 30, 'rgba(255,210,140,1)', 0.4); lightPool(1070, 1420, 160, 30, 'rgba(255,210,140,1)', 0.4);
    for (let i = 0; i < 3; i++) pigeon(700 + i * 40, 1420, 0.7, t, i + 7); }
  function stand(t) {                                                // стол с грамотой, печать, лампа, торт «30»
    lightPool(TX, TY + 20, 520, 110, 'rgba(255,214,140,1)', 0.55); castShadow(TX, TY, 300, 360, 0.0, 0.35); castShadow(360, 1640, 170, 380, 0.15, 0.4);
    rect(TX - 220, TY - 150, 440, 22, { wash: '#6a3a1e', washA: 1, w: 2.4, col: L }); rect(TX - 220, TY - 128, 440, 150, { wash: '#a8231c', washA: 1, w: 2.2, col: L }); for (let i = 0; i < 5; i++) pencil([[TX - 200 + i * 100, TY - 128], [TX - 200 + i * 100, TY + 20]], { w: 1.6, col: '#5a0f0c', a: 0.6, pass2: false });
    push(TX + 20, TY - 156, 1, -0.04); rect(-140, -16, 280, 16, { wash: '#f4ecd0', washA: 1, w: 1.8, col: L }); pop();
    push(TX + 20, TY - 330, 1, -0.04); rect(-120, -150, 240, 300, { wash: '#f6eed8', washA: 1, w: 2.4, col: L }); rect(-108, -138, 216, 276, { line: true, w: 2, col: WA.goldD });
    txt('UNESCO', 0, -96, 36, { col: '#1a3a7a', font: 'Osw' }); txt('Światowe Dziedzictwo', 0, -56, 22, { col: '#3a2a1a', font: 'Hand' }); txt('Stare Miasto · 1980', 0, -24, 24, { col: '#3a2a1a', font: 'Hand' }); for (let i = 0; i < 4; i++) pencil([[-80, 10 + i * 22], [80, 10 + i * 22]], { w: 1.6, col: '#7a6a5a', a: 0.6, pass2: false });
    if (t > EV.un_stamp + 0.08) { const q = popK(t, EV.un_stamp + 0.08, 0.2); push(30, 90, 0.6 + 0.4 * q, -0.2); ell(0, 0, 70, 70, { line: true, w: 6, col: '#c8201a' }); ell(0, 0, 56, 56, { line: true, w: 2.4, col: '#c8201a' }); txt('НАСЛЕДИЕ', 0, -6, 24, { col: '#c8201a', font: 'Osw' }); txt('МИРА', 0, 20, 22, { col: '#c8201a', font: 'Osw' }); pop();
      const r = rng(2575); for (let i = 0; i < 8; i++) { const a = r() * 6.283, d = 80 + r() * 50; ell(30 + Math.cos(a) * d, 90 + Math.sin(a) * d, 4 + r() * 6, 4 + r() * 6, { wash: '#c8201a', washA: 0.8, line: false }); } }
    pop();
    pencil([[TX - 180, TY - 150], [TX - 180, TY - 420], [TX - 120, TY - 460]], { w: 6, col: '#2a2a2a', pass2: false }); shape([[TX - 150, TY - 470], [TX - 80, TY - 470], [TX - 60, TY - 420], [TX - 170, TY - 420]], { wash: '#2a5a3a', washA: 1, w: 2, col: L });
    glow(TX - 115, TY - 410, 140, 'rgba(255,214,140,1)', 0.35);
    if (t > EV.un_30 - 0.15) { const q = popK(t, EV.un_30 - 0.15, 0.3); push(TX + 170, TY - 156, q); rect(-70, -70, 140, 70, { wash: '#f4d8e0', washA: 1, w: 2, col: L }); rect(-70, -70, 140, 14, { wash: '#e85a8a', washA: 1, line: false }); txt('30', 0, -20, 36, { col: '#a8231c', font: 'Osw' });
      for (let i = 0; i < 6; i++) { const cx = -50 + i * 20; rect(cx - 3, -100, 6, 30, { wash: ['#3a8ac0', '#e8c040', '#e84a3a'][i % 3], washA: 1, line: false }); ell(cx, -106 + Math.sin(t * 20 + i) * 1.5, 4, 7, { wash: '#ffd890', washA: 1, line: false }); } glow(0, -104, 90, 'rgba(255,200,120,1)', 0.3); pop(); }
  }
  function hud(t) {
    if (t > EV.un_30 + 0.1) { const q = popK(t, EV.un_30 + 0.1, 0.3); push(560, 760, q, 0.05); rect(-190, -46, 380, 92, { wash: '#16120e', washA: 0.9, w: 3, col: WA.gold }); txt('«СТАРИНЕ» ≈ 30 ЛЕТ', 0, 14, 44, { col: WA.goldL, font: 'Osw' }); pop(); }
    if (t > EV.un_stamp + 0.05 && t < EV.un_stamp + 0.25) whiteOut(0.35 * (1 - (t - EV.un_stamp - 0.05) / 0.2), '255,250,235');
  }
  function front(t) { sil([[-700, 2400], [-680, 1300], [-460, 1260], [-420, 2400]], '#080a18', 1); pencil([[1400, 2400], [1400, 700]], { w: 24, col: '#080a18', pass2: false }); sil([[1340, 700], [1460, 700], [1440, 630], [1360, 630]], '#080a18', 1); glow(1400, 668, 70, 'rgba(255,214,140,1)', 0.3); }
  WORLD.unesco = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(16, () => far(t));
    lay(6, () => row(t));
    lay(3.4, () => square(t));
    lay(1, () => { stand(t); cat(); });
    lay(2, () => motes(14, [0, 700, 1100, 1500], '#ffe0a0', t, 2576, { sp: 3, sz: 2, a: 0.4, wob: 14, add: 1 }));
    lay(0.64, () => front(t));
  };
  DIR.unesco = {
    outfit: 'suitK', light: { side: 1, rim: '#ffd08a' }, grade: ['#2a3a8a', 0.12],
    act: () => [[S0.unesco, 'talk'], [EV.un_80, 'proud'], [EV.un_stamp, 'grin'], [EV.un_old, 'sideeye'], [EV.un_30, 'laugh']],
    pose: (t, u, b) => { const st = t > EV.un_stamp - 0.35 && t < EV.un_stamp + 0.25, k = clamp((t - EV.un_stamp + 0.35) / 0.43);
      return Object.assign(b, { x: 380, y: 1640, s: 1.0, look: t < EV.un_stamp - 0.4 ? [0.2, -0.4] : t < EV.un_old ? [0.9, -0.3] : t < EV.un_30 ? [-0.5, -0.8] : [0.8, 0.1],
        hand: st ? [lerp(200, 290, k), lerp(-480, -330, sm(k))] : undefined, squash: st && k > 0.9 ? 0.1 : b.squash }); },
    afterCat: (t, u, P) => { if (t > EV.un_stamp - 0.35 && t < EV.un_stamp + 0.25) { const x = P.x + P.hand[0] * P.s, y = P.y + P.hand[1] * P.s; rect(x - 20, y - 60, 40, 50, { wash: '#6a3a1e', washA: 1, w: 1.8, col: L }); rect(x - 30, y - 12, 60, 18, { wash: '#c8201a', washA: 1, w: 1.8, col: L }); } },
    cam: () => [[S0.unesco, 520, 940, 0.0], [EV.un_80, 540, 960, 0.04], [EV.un_stamp, 600, 1160, 0.14], [EV.un_stamp + 0.15, 620, 1180, 0.2, 'x'], [EV.un_30, 600, 1140, 0.12], [S1.unesco, 600, 1120, 0.14]],
    hud
  };
  TRANS_IN.unesco = { a: 0.15, b: 0.25, fx(k, t, A, B) {           // широкий мазок кисти: кирпичная краска ложится по диагонали и смывается в новый кадр
    const e = sm(k); drawBuf(A); scr(() => { ctx.save(); ctx.beginPath(); const d = e * 3000 - 600; ctx.moveTo(-400, d + 700); for (let i = 0; i <= 24; i++) { const x = -400 + i * 80; ctx.lineTo(x, d - x * 0.6 + Math.sin(i * 2.3) * 30); } ctx.lineTo(1500, -800); ctx.lineTo(-400, -800); ctx.closePath(); ctx.clip(); drawBuf(B); ctx.restore();
      ctx.save(); ctx.strokeStyle = WA.brick; ctx.lineWidth = 60; ctx.lineCap = 'round'; ctx.globalAlpha = 0.9 * Math.sin(k * Math.PI); ctx.beginPath(); for (let i = 0; i <= 24; i++) { const x = -400 + i * 80; const y = d - x * 0.6 + Math.sin(i * 2.3) * 30; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
      ctx.strokeStyle = WA.brickL; ctx.lineWidth = 8; for (let j = -2; j <= 2; j++) { ctx.beginPath(); for (let i = 0; i <= 24; i++) { const x = -400 + i * 80; const y = d - x * 0.6 + Math.sin(i * 2.3) * 30 + j * 10; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); } ctx.restore(); });
  } };
})();
