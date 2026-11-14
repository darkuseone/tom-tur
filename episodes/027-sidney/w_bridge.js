/* 027 — сцена `bridge`: 1932, мост-«вешалка». Две половины стальной арки смыкаются над гаванью (на «вешалку»), по полотну едут
   машины 1930-х и паровоз, под мостом паром; на въезде — будка сбора платы «TOLL», очередь машин, клёпальщики на фермах.
   Главный свет — полуденное солнце справа сверху, блеск на стали. Том-клёпальщик (iron) у будки опускает монету в кассу; на «Долг»
   из будки выползает длинная квитанция-лента «1932 → 1988», на «шесть» — штамп «56 ЛЕТ». Переход В — стальная балка проносится через кадр. */
(() => {
  EV.br_so = wtk('s3', 'Поэтому');
  EV.br_30 = wtk('s3', 'тридцатые');
  EV.br_hang = wtk('s3', 'мост-«вешалку».');
  EV.br_debt = wtk('s3', 'Долг');
  EV.br_56 = wtk('s3', 'шесть');
  KEYW.push('мост-«вешалку».', 'Долг', 'шесть');
  SHAKES.push([EV.br_hang, 0.3, 8]);
  const L = SY.ink, SUN = [980, 360];
  const close = t => clamp(0.82 + 0.18 * sm(clamp((t - EV.br_hang + 0.5) / 0.6)));
  function sky(t) { vgrad(-900, 1200, ['#2a6aa8', '#6aa8d8', '#c8e0ec', '#eef4f0'], 1); glow(SUN[0], SUN[1], 240, 'rgba(255,248,220,1)', 0.35); for (let i = 0; i < 4; i++) { const r = rng(3340 + i), x = (r() * 1400 + t * 10) % 1500 - 200, y = 380 + r() * 260; for (let k = 0; k < 4; k++) ell(x + k * 46, y - (k % 2) * 20, 60, 28, { wash: '#ffffff', washA: 0.55, line: false }); } gulls(6, -100, 1180, 420, 720, t, 3341, 0.4, 26); }
  function city(t) { hills(1000, 60, '#6a8a8a', 3342); for (let i = 0; i < 14; i++) { const x = -300 + i * 110, h = 100 + (i * 53) % 140; rect(x - 40, 1000 - h, 80, h, { wash: '#b8a888', washA: 1, w: 1.2, col: '#5a5040' }); windows(x - 34, 1000 - h + 10, 68, h - 20, 3, Math.floor(h / 30), 3343 + i, 0.4, '#3a3a40', '#3a3a40', 0.6); } depthFog('#d8e8f0', 0.08); }
  function harbour(t) {
    vgrad(1000, 1400, ['#6ab0d8', '#2a7ab0', '#14507a'], 1); ctx.save(); ctx.globalCompositeOperation = 'lighter'; const r = rng(hsh(FRAME, 3344)); for (let i = 0; i < 40; i++) { const y = 1010 + r() * 360, w = 20 + r() * 60; ctx.fillStyle = `rgba(255,255,240,${0.3 * r()})`; ctx.fillRect(r() * W, y, w, 3); } ctx.restore();
    ferrySY(700 - (t * 14) % 200, 1220, 0.45, t);
    harbourB(560, 1160, 1.0, t, { k: close(t) });
    if (close(t) >= 1) { const ph = ((t - EV.br_hang) * 0.25) % 1; car30(-200 + ph * 1600, 1000, 0.32, t, '#2a3a5a'); car30(1200 - ph * 1500, 1000, 0.32, t, '#6a2a2a', -1);
      push(lerp(-300, 1500, ((t - EV.br_hang) * 0.15) % 1), 990, 0.32); rect(-160, -80, 120, 80, { wash: '#2a2a2e', washA: 1, w: 2, col: L }); rect(-40, -60, 200, 60, { wash: '#3a3a40', washA: 1, w: 2, col: L }); for (let q = 0; q < 3; q++) ell(-120 + q * 100, 4, 20, 20, { wash: '#1a1a1e', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 4; q++) ell(-130 - q * 60, -110 - q * 30, 30 + q * 10, 20 + q * 8, { wash: '#f0f0f0', washA: 0.6, line: false }); pop(); }
    if (t > EV.br_hang - 0.1 && t < EV.br_hang + 0.6) { const q = clamp((t - EV.br_hang + 0.1) / 0.7); glow(560, 680, 140 * (1 - q) + 40, 'rgba(255,240,200,1)', 0.6 * (1 - q)); for (let k = 0; k < 10; k++) { const a = k / 10 * 6.283; pencil([[560 + Math.cos(a) * 30, 680 + Math.sin(a) * 30], [560 + Math.cos(a) * (60 + 140 * q), 680 + Math.sin(a) * (60 + 140 * q)]], { w: 4, col: '#ffe8a0', a: 1 - q, pass2: false }); } }
    for (const [x, y] of [[300, 760], [820, 760]]) if (close(t) < 1) human(x, y, 0.35, t, { body: '#5a4a3a', hat: 'cap', hatCol: '#3a3a40', armR: 'swing', seed: 3350 + x });
  }
  function toll(t) {                                                 // въезд: будка «TOLL», шлагбаум, очередь машин, флажки
    rect(-500, 1380, 2100, 40, { wash: '#7a7a80', washA: 1, w: 2, col: L });
    push(820, 1400, 1); rect(-120, -260, 240, 260, { wash: '#efe4c8', washA: 1, w: 2.4, col: L }); poly([[-150, -260], [0, -340], [150, -260]], { wash: SY.red, washA: 1, w: 2, col: L }); rect(-80, -210, 160, 90, { wash: '#bcd8e4', washA: 1, w: 1.8, col: L });
    txt('TOLL', 0, -290, 36, { col: '#fff2d6', font: 'Osw' }); txt('6d', 0, -60, 40, { col: SY.red, font: 'Osw' }); human(0, -110, 0.32, t, { body: '#2a3a5a', hat: 'cap', hatCol: '#2a2a3a', armR: 'wave', seed: 3360, face: 'smile' });
    const bar = t > EV.br_debt - 0.2 ? sm(clamp((t - EV.br_debt + 0.2) / 0.4)) : 0; push(130, -120, 1, -bar * 1.3); rect(0, -8, 340, 16, { wash: '#f4f0e8', washA: 1, w: 1.6, col: L }); for (let q = 0; q < 5; q++) rect(20 + q * 66, -8, 30, 16, { wash: SY.red, washA: 1, line: false }); pop(); pop();
    car30(1200, 1400, 0.6, t, '#3a2a2a', -1); car30(1430, 1400, 0.6, t, '#1a2a3a', -1);
    for (let i = 0; i < 9; i++) { const x = -260 + i * 70; pencil([[x, 1380], [x, 1180]], { w: 3, col: '#5a5a62', pass2: false }); shape([[x, 1190], [x + 40 + Math.sin(t * 4 + i) * 6, 1200], [x, 1215]], { wash: i % 2 ? SY.red : '#2a3a8a', washA: 1, w: 1, col: L }); }
    const P = [[60, '#5a4a6a', 'boater'], [180, '#6a3a3a', 'brim'], [420, '#3a4a5a', 'boater']]; P.forEach(([x, c, h], i) => human(x, 1390, 0.56, t, { body: c, hat: h, hatCol: '#3a3a42', legs: '#2a2a32', armR: i === 1 ? 'up' : 'wave', flip: 1, seed: 3365 + i, face: 'grin', hair: '#2a1a10' }));
  }
  function road(t) {                                                 // асфальт под Томом, клёпки, ящик с заклёпками, касса-копилка
    rect(-500, 1430, 2100, 900, { wash: '#5a5a62', washA: 1, w: 2, col: L }); for (let i = 0; i < 8; i++) rect(-400 + i * 260, 1680, 140, 16, { wash: '#f0e8c8', washA: 1, line: false });
    lightPool(560, 1600, 640, 140, 'rgba(255,250,230,1)', 0.4);
    push(640, 1630, 1); rect(-60, -140, 120, 140, { wash: '#3a3a40', washA: 1, w: 2, col: L }); rect(-30, -150, 60, 12, { wash: '#1a1a1e', washA: 1, line: false }); txt('6d', 0, -70, 34, { col: SY.goldL, font: 'Osw' }); pop();
    if (t > EV.br_debt - 0.4 && t < EV.br_debt + 0.2) { const q = clamp((t - EV.br_debt + 0.4) / 0.5); coin6(640 - 60 + q * 50, 1300 + q * 180, 1); }
    push(1060, 1660, 1); rect(-80, -60, 160, 60, { wash: '#7a5a3a', washA: 1, w: 2, col: L }); for (let q = 0; q < 12; q++) ell(-60 + (q % 6) * 24, -66 - Math.floor(q / 6) * 10, 8, 8, { wash: '#8a8e94', washA: 1, w: 1, col: L }); pop();
    castShadow(330, 1612, 120, 480, -0.25, 0.4); moodDark(SUN[0], 1100, 900, 1700, '#101820', 0.3);
  }
  function coin6(x, y, s) { push(x, y, s); ell(0, 0, 22, 22, { wash: '#c8c8cc', washA: 1, w: 2, col: '#3a3a40' }); txt('6', 0, 0, 20, { col: '#3a3a40', font: 'Osw' }); pop(); }
  function hud(t) {
    if (t > EV.br_debt) { const q = clamp((t - EV.br_debt) / 0.6), len = 600 * q; push(560, 840, 1, -0.02); rect(-len / 2, -50, len, 100, { wash: '#f6efe0', washA: 1, w: 2.4, col: L }); for (let i = 0; i < len / 40; i++) pencil([[-len / 2 + 20 + i * 40, -30], [-len / 2 + 34 + i * 40, -30]], { w: 2, col: '#8a7a5a', pass2: false });
      if (q > 0.5) txt('1932 → 1988', 0, 6, 44, { col: '#3a2a1a', font: 'Osw', a: (q - 0.5) * 2 }); pop(); }
    if (t > EV.br_56 - 0.05) { const q = popK(t, EV.br_56 - 0.05, 0.3); push(760, 960, q * 1.1, -0.15); rect(-150, -60, 300, 120, { line: true, w: 8, col: SY.red }); txt('56 ЛЕТ', 0, 4, 72, { col: SY.red, font: 'Osw' }); pop(); }
  }
  function front(t) { pencil([[-200, 280], [1300, 360]], { w: 50, col: '#2e343c', pass2: false }); for (let i = 0; i < 12; i++) ell(-120 + i * 120, 300 + i * 5, 8, 8, { wash: '#8a8e94', washA: 1, line: false }); for (const x of [-40, 1130]) pencil([[x, 260], [x, 2300]], { w: 44, col: '#2e343c', pass2: false }); }
  WORLD.bridge = (t, u, cat) => {
    lay(40, () => sky(t));
    lay(18, () => city(t));
    lay(7, () => harbour(t));
    lay(2.6, () => { toll(t); depthFog('#dce8f0', 0.04); });
    lay(1, () => { road(t); cat(); });
    lay(0.6, () => front(t));
    lay(2.2, () => motes(20, [-100, 700, 1200, 1500], '#ffffff', t, 3370, { sp: 3, sz: 2, a: 0.35, wob: 18, add: 1 }));
  };
  DIR.bridge = {
    outfit: 'iron', light: { side: 1, rim: '#fff4d8' }, grade: ['#6a9ab8', 0.06],
    act: () => [[S0.bridge, 'proud'], [EV.br_hang, 'awe'], [EV.br_debt, 'annoyed'], [EV.br_56, 'shock']],
    pose: (t, u, b) => { const pay = t > EV.br_debt - 0.45 && t < EV.br_debt + 0.1; return Object.assign(b, { x: 330, y: 1612, s: 1.0, look: t > EV.br_hang - 0.4 && t < EV.br_debt - 0.5 ? [0.5, -0.9] : [0.8, -0.4], hand: pay ? [300, -330] : t > EV.br_hang - 0.3 && t < EV.br_debt - 0.5 ? [120, -480] : [190, -300], tailUp: t > EV.br_hang, sweat: t > EV.br_56 }); },
    cam: () => [[S0.bridge, 580, 900, -0.02], [EV.br_hang, 560, 820, -0.06, 'x'], [EV.br_debt, 560, 1080, 0.12, 'x'], [EV.br_56, 600, 1040, 0.14], [S1.bridge, 600, 1040, 0.16]],
    hud
  };
  TRANS_IN.bridge = { a: 0.12, b: 0.35, fx(k, t, A, B) {             // стальная балка с заклёпками проносится через кадр
    const e = sm(k), y = lerp(-500, H + 500, e); drawBuf(y < 960 ? A : B); scr(() => { ctx.save(); ctx.translate(540, y); ctx.rotate(-0.2); rect(-1200, -260, 2400, 520, { wash: '#4a5058', washA: 1, w: 4, col: SY.ink }); for (let i = 0; i < 24; i++) { ell(-1150 + i * 100, -200, 14, 14, { wash: '#8a8e94', washA: 1, w: 2, col: SY.ink }); ell(-1150 + i * 100, 200, 14, 14, { wash: '#8a8e94', washA: 1, w: 2, col: SY.ink }); } ctx.restore(); });
  } };
})();
