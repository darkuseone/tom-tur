/* 026 — сцена `sultan`: ≈1840, Гранд-базар. Сводчатая галерея уходит вдаль кольцами арок, из окошек в сводах падают лучи (главный свет),
   под арками — мозаичные лампы; лавки с коврами, медью, горками пряностей; носильщик-хамал с огромным тюком, люди в фесках и тюрбанах.
   Том (fezcoat) у меняльной лавки с весами и столбиками монет: на «Нет» качает пальцем, на «монетах» поднимает золотую монету —
   она вырастает в плашку «КОСТАНТИНИЙЕ», на «народ» вокруг выскакивают облачка «СТАМБУЛ!» (обиходное имя). Переход В — ковёр перелетает кадр. */
(() => {
  EV.su_q = wtk('s6', 'сразу');
  EV.su_no = wtk('s6', 'Нет:');
  EV.su_coin = wtk('s6', 'монетах');
  EV.su_name = wtk('s6', 'Костантинийе».');
  EV.su_people = wtk('s6', 'народ.');
  EV.su_st = wtk('s6', 'говорил') - 0.45;
  KEYW.push('Нет:', 'Костантинийе».', 'народ.');
  SHAKES.push([EV.su_coin + 0.1, 0.2, 6]);
  const L = IS.ink, VP = [600, 900];
  function back(t) { vgrad(-900, 2600, ['#2a1a12', '#4a2e1c', '#2a1a12'], 1); }
  function vault(t) {                                                // кольца арок галереи, роспись, окошки со светом
    for (let k = 7; k >= 0; k--) { const s = Math.pow(0.72, k), w = 1500 * s, h = 1300 * s, y = VP[1] + 560 * s, x = VP[0];
      const ring = [[x - w / 2 - 60 * s, y + 200], [x - w / 2 - 60 * s, y - h * 0.55]].concat(ellPts(x, y - h * 0.55, w / 2 + 60 * s, h * 0.5 + 60 * s, 0, 0, 24).filter(p => p[1] <= y - h * 0.55)).concat([[x + w / 2 + 60 * s, y - h * 0.55], [x + w / 2 + 60 * s, y + 200]]);
      const inner = [[x + w / 2, y + 200], [x + w / 2, y - h * 0.55]].concat(ellPts(x, y - h * 0.55, w / 2, h * 0.5, 0, 0, 24).filter(p => p[1] <= y - h * 0.55).reverse()).concat([[x - w / 2, y - h * 0.55], [x - w / 2, y + 200]]);
      shape(ring.concat(inner), { wash: lerpC('#e8d8b8', '#6a4a30', k / 8), washA: 1, w: 2, col: L });
      for (let q = -3; q <= 3; q++) { const a = -Math.PI / 2 + q * 0.32; pencil([[x + Math.cos(a) * (w / 2 + 30 * s), y - h * 0.55 + Math.sin(a) * (h * 0.5 + 30 * s)], [x + Math.cos(a) * (w / 2 + 50 * s), y - h * 0.55 + Math.sin(a) * (h * 0.5 + 50 * s)]], { w: 4 * s + 1, col: q % 2 ? IS.cob : IS.pom, pass2: false }); }
      if (k % 2 === 0) { rect(x - 16 * s, y - h * 1.05 - 20 * s, 32 * s, 24 * s, { wash: '#fff2c8', washA: 1, line: false }); shaft(x, y - h * 1.05, 70 * s + 20, 900 * s + 200, 0.08, 'rgba(255,226,160,1)', 0.16); } }
    lightPool(VP[0], 1180, 300, 50, 'rgba(255,220,150,1)', 0.4);
    depthFog('#c89a6a', 0.07);
  }
  function stalls(t) {                                               // лавки: ковры, медь, пряности, лампы, торговцы
    for (const sd of [-1, 1]) for (let i = 0; i < 3; i++) { const x = VP[0] + sd * (330 + i * 150), y = 1250 - i * 70, s = 1 - i * 0.22;
      push(x, y, s); rect(-90, -330, 180, 330, { wash: '#3a2214', washA: 1, w: 2, col: L }); carpet(-80, -320, 160, 200, 2900 + i + (sd > 0 ? 10 : 0), { c1: i % 2 ? IS.pom : IS.cob, c2: i % 2 ? IS.cob : IS.pom });
      for (let q = 0; q < 4; q++) ell(-60 + q * 40, -60, 18, 22, { wash: '#c8743a', washA: 1, w: 1.4, col: L, shade: { gap: 4, a: 0.3, col: '#6a3a14', ang: 0.6 } });
      for (const [px, c] of [[-50, '#c8402a'], [0, '#e8b030'], [50, '#7a8a3a']]) shape([[px - 22, 0], [px, -40], [px + 22, 0]], { wash: c, washA: 1, w: 1.2, col: L }); pop(); }
    for (let i = 0; i < 5; i++) lampO(VP[0] - 400 + i * 200, 820 + (i % 2) * 40, 0.8 - Math.abs(i - 2) * 0.08, t, 1, 2910 + i);
    human(VP[0] - 520, 1250, 0.6, t, { body: '#6a3a2a', hat: 'turban', beard: 'long', hair: '#d8d0c0', armR: 'hips', seed: 2920, face: 'calm' });
    human(VP[0] + 520, 1250, 0.6, t, { body: '#2a4a6a', hat: 'fez', beard: 'short', hair: '#2a1a10', armR: 'wave', flip: -1, seed: 2921, face: 'smile' });
  }
  function crowd3(t) {                                               // толпа галереи: фески, тюрбаны, хамал с тюком, женщина с корзиной, кот
    const ppl = [[60, '#3a4a6a', 'fez', 1], [200, '#8a5a2a', 'turban', -1], [760, '#2a3a2a', 'fez', -1], [880, '#6a2a3a', 'scarf', 1], [1040, '#4a3a5a', 'turban', -1], [1180, '#3a4a6a', 'fez', -1]];
    ppl.forEach(([x, c, h, fl], i) => { const wx = x + Math.sin(t * 0.6 + i) * 20; human(wx, 1360, 0.58, t, { body: c, hat: h, hatCol: h === 'scarf' ? '#c83a5a' : undefined, legs: '#2a2a32', beard: h === 'scarf' ? null : 'short', hair: '#2a1a10', armR: i % 2 ? 'swing' : 'hold', flip: fl, seed: 2930 + i, long: h === 'scarf' ? 1 : 0 }); });
    push(420, 1360, 0.62, 0, -1); human(0, 0, 1, t, { body: '#7a6a4a', hat: 'scarf', hatCol: '#c8b8a0', armR: 'up', armL: 'up', seed: 2940, beard: 'short' }); rect(-110, -520, 220, 200, { wash: '#a88a5a', washA: 1, w: 2.4, col: L, shade: { gap: 6, a: 0.25, col: '#5a4a2a', ang: 0.8 } }); pencil([[-110, -420], [110, -420]], { w: 4, col: '#5a3a1a', pass2: false }); pop();
  }
  function counter(t) {                                              // пол и меняльная лавка: стойка, весы, столбики монет, пресс-чекан
    rect(-500, 1380, 2100, 900, { wash: '#8a6a4a', washA: 1, w: 2, col: L }); for (let j = 0; j < 8; j++) for (let i = 0; i < 16; i++) rect(-500 + i * 130 + (j % 2) * 65, 1384 + j * 70, 128, 68, { wash: (i * 3 + j) % 4 ? '#9a7a54' : '#7a5a3a', washA: 1, w: 1, col: '#4a3420' });
    lightPool(560, 1620, 500, 120, 'rgba(255,214,150,1)', 0.45);
    push(760, 1640, 1); rect(-230, -230, 460, 230, { wash: '#6a3a1e', washA: 1, w: 2.6, col: L }); rect(-240, -250, 480, 26, { wash: '#8a5a2a', washA: 1, w: 2, col: L }); carpet(-200, -200, 400, 150, 2950, { c1: '#8a2a2a' });
    pencil([[160, -250], [160, -420]], { w: 5, col: IS.goldD, pass2: false }); const tip = Math.sin(t * 1.5) * 0.1; push(160, -420, 1, tip); pencil([[-90, 0], [90, 0]], { w: 4, col: IS.goldD, pass2: false });
    for (const k of [-1, 1]) { pencil([[k * 90, 0], [k * 90 - 30, 70], [k * 90, 0], [k * 90 + 30, 70]], { w: 1.6, col: IS.goldD, pass2: false }); ell(k * 90, 74, 40, 10, { wash: IS.gold, washA: 1, w: 1.6, col: IS.goldD }); } pop();
    for (let c = 0; c < 4; c++) for (let q = 0; q < 6 - c; q++) ell(-160 + c * 50, -256 - q * 9, 20, 7, { wash: IS.gold, washA: 1, w: 1.2, col: IS.goldD }); pop();
    push(1080, 1640, 1); rect(-60, -280, 120, 280, { wash: '#3a3a40', washA: 1, w: 2.2, col: L }); const pr = Math.abs(Math.sin((t - S0.sultan) * 3)); rect(-40, -260 + pr * 60, 80, 40, { wash: '#6a6a72', washA: 1, w: 1.8, col: L }); pencil([[0, -280], [0, -360]], { w: 8, col: '#2a2a30', pass2: false }); pencil([[-90, -360], [90, -360]], { w: 10, col: '#2a2a30', pass2: false }); pop();
    castShadow(330, 1612, 120, 440, 0.1, 0.4); moodDark(VP[0], 1000, 800, 1700, '#140a06', 0.4);
  }
  function hud(t) {
    if (t > EV.su_coin && t < EV.su_st) { const q = popK(t, EV.su_coin, 0.4), sq = Math.abs(Math.cos(clamp((t - EV.su_coin) / 0.5) * Math.PI * 2)) * 0.6 + 0.4; push(560, 860, q, 0);
      coinO(0, 0, 200, t, { sq: t > EV.su_name ? 1 : sq, txt: t > EV.su_name - 0.1 ? 'КОСТАНТИНИЙЕ' : '', ts: 0.19, sub: t > EV.su_name - 0.1 ? 'монета султана' : '' }); pop(); }
    if (t > EV.su_st) [[230, 780, 'СТАМБУЛ!', -0.08, 0], [850, 820, 'СТАМБУЛ!', 0.08, 0.2], [700, 1030, 'İSTANBUL!', -0.05, 0.4]].forEach(([x, y, s, r, d]) => { const q = popK(t, EV.su_st + d, 0.3); if (q <= 0) return; push(x, y, q, r);
      blob([[-150, -60], [150, -60], [160, 46], [-10, 50], [-40, 96], [-56, 50], [-160, 46]], { wash: IS.white, washA: 1, w: 3, col: L }); txt(s, 0, -4, 54, { col: IS.cobD, font: 'Osw' }); pop(); });
  }
  function front(t) { for (const [x, c] of [[-40, IS.pom], [1120, IS.cob]]) { const sw = Math.sin(t * 1.3 + x) * 10; push(x + sw, -100, 1); carpet(-90, 0, 180, 1100, 2960 + x, { c1: c, c2: c === IS.pom ? IS.cob : IS.pom }); pop(); }
    lampO(940, 360, 1.6, t, 1, 2961); }
  WORLD.sultan = (t, u, cat) => {
    lay(40, () => back(t));
    lay(12, () => vault(t));
    lay(5, () => stalls(t));
    lay(2.4, () => crowd3(t));
    lay(1, () => { counter(t); cat(); });
    lay(0.55, () => front(t));
    lay(3, () => motes(40, [200, 500, 1000, 1300], '#ffe0a0', t, 2965, { sp: 3, sz: 2.4, a: 0.5, wob: 14, add: 1 }));
  };
  DIR.sultan = {
    outfit: 'fezcoat', light: { side: 1, rim: '#ffd890' }, grade: ['#8a5a2a', 0.08],
    act: () => [[S0.sultan, 'suspicious'], [EV.su_no, 'smug'], [EV.su_coin, 'proud'], [EV.su_name, 'awe'], [EV.su_people, 'laugh']],
    pose: (t, u, b) => { const wag = t > EV.su_no - 0.1 && t < EV.su_coin - 0.05, up = t > EV.su_coin - 0.1 && t < EV.su_st;
      return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: up ? [0.5, -0.9] : [0.7, -0.3], prop: up ? 'coin' : undefined, hand: up ? [140, -500] : wag ? [150 + Math.sin(t * 22) * 30, -440] : [190, -320], tailUp: t > EV.su_people }); },
    cam: () => [[S0.sultan, 620, 1000, 0.04], [EV.su_no, 560, 1040, 0.12, 'x'], [EV.su_coin, 560, 940, 0.06], [EV.su_people, 600, 1020, -0.04, 'x'], [S1.sultan, 600, 1000, -0.06]],
    hud
  };
  TRANS_IN.sultan = { a: 0.15, b: 0.35, fx(k, t, A, B) {            // ковёр перелетает через кадр слева направо, за ним — базар
    const e = sm(k), x = lerp(-1300, 1300, e); drawBuf(x < 0 ? A : B); scr(() => { ctx.save(); ctx.translate(x + 540, 960); ctx.rotate(-0.12 + Math.sin(e * 9) * 0.04); carpet(-620, -1050, 1240, 2100, 2970, { c1: IS.pom, c2: IS.cob }); ctx.restore(); });
  } };
})();
