/* 011 — сцена `stairs`: 1841, Потёмкинская (тогда Бульварная) лестница. Два взгляда: «сверху» — от Дюка вниз видны только широкие
   площадки, а за ними порт и море; «снизу» — от порта вверх видны только ступени до Дюка наверху. На «Обман» кадр делится пополам:
   слева вид сверху, справа вид снизу, Том посередине кружится. Том в сюртуке и цилиндре, рядом дамы с зонтиками и господа 1840-х.
   Переход В сцену — кадр складывается ступенями (полосы съезжают поочерёдно). */
(() => {
  EV.sr_top = wtk('s4', 'сверху');
  EV.sr_bot = wtk('s4', 'снизу');
  EV.sr_trick = wtk('s4', 'Обман');
  KEYW.push('площадки,', 'ступени.', 'зрения!');

  function topView(t) {                                                // взгляд сверху: широкие площадки, порт, море
    vgrad(-900, 700, ['#5a98d0', '#b8d8ee', '#f2ead8'], 1);
    vgrad(560, 820, ['#3a8aa8', '#1e5a74'], 1); for (let k = 0; k < 8; k++) pencil([[-400, 580 + k * 30], [1480, 586 + k * 30]], { w: 1.2, col: '#bfe4f0', a: 0.3, pass2: false });
    merchant(1100, 700, 0.26, t, 1, { flag: '#2a5aa8' }); merchant(200, 720, 0.22, t, 2, { flag: '#c8302a' });
    rect(-500, 800, 2100, 60, { wash: OD.stoneD, washA: 1, w: 2, col: '#2a1a08' });
    for (let k = 9; k >= 0; k--) { const y0 = 860 + Math.pow(k / 10, 1.6) * 640, y1 = 860 + Math.pow((k + 1) / 10, 1.6) * 640, wt = lerp(300, 760, k / 10), wb = lerp(300, 760, (k + 1) / 10);
      const L = shape([[540 - wt, y0], [540 + wt, y0], [540 + wb, y1], [540 - wb, y1]], { wash: k % 2 ? '#e8dcc0' : '#efe4cc', washA: 1, w: 1.6, col: '#8a7a5a' }); pencil([[540 - wt, y0], [540 + wt, y0]], { w: 3, col: '#6a5a3a', a: 0.6, pass2: false }); }
    for (const sd of [-1, 1]) pencil([[540 + sd * 300, 860], [540 + sd * 760, 1500]], { w: 10, col: '#a8987a' });
    for (let i = 0; i < 6; i++) { const k = (i * 0.17 + t * 0.03) % 1, y = 880 + Math.pow(k, 1.6) * 600; human(420 + (i % 3) * 120, y, 0.15 + k * 0.4, t, { body: ['#5a2a3a', '#2a3a5a', '#e8d8c0'][i % 3], legs: '#2a2a2e', hair: '#3a2210', hat: i % 2 ? 'merchant' : 'bun', hatCol: '#1a1a1a', seed: 1160 + i }); }
  }
  function botView(t) {                                                // взгляд снизу: одни ступени до Дюка
    vgrad(-900, 1200, ['#4a88c8', '#a8cce6', '#f6ead6'], 1); for (let i = 0; i < 3; i++) { const x = ((i * 500 + t * 14) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 160 + i * 80, 70, 24, { wash: '#fbf8f2', washA: 0.85, line: false }); }
    for (const sd of [-1, 1]) acacia(540 + sd * 420, 640, 260, t, 11600 + sd); odHouse(-420, 640, 300, 200, OD.stone, t, { key: 11610 }); odHouse(1200, 640, 300, 200, '#e8b89a', t, { key: 11611 });
    duke(540, 600, 0.55, t);
    const st = shape([[540 - 160, 640], [540 + 160, 640], [540 + 760, 1520], [540 - 760, 1520]], { wash: '#e8dcc0', washA: 1, w: 2, col: '#6a5a3a' });
    for (let k = 0; k < 60; k++) { const f = k / 60, y = 640 + Math.pow(f, 1.25) * 880, w = lerp(160, 760, Math.pow(f, 1.25)); pencil([[540 - w, y], [540 + w, y]], { w: 1 + f * 2.4, col: '#7a6a4a', a: 0.7, pass2: false, gap: false }); }
    for (const sd of [-1, 1]) pencil([[540 + sd * 160, 640], [540 + sd * 760, 1520]], { w: 12, col: '#a8987a' });
    for (let i = 0; i < 5; i++) { const f = (i * 0.21 + t * 0.04) % 1, y = 640 + Math.pow(f, 1.25) * 880; human(470 + (i % 2) * 150, y, 0.12 + f * 0.45, t, { body: ['#5a2a3a', '#2a3a5a', '#e8d8c0', '#3a5a3a', '#8a3a3a'][i], legs: '#2a2a2e', hair: '#3a2210', hat: i % 2 ? 'merchant' : 'bun', hatCol: '#1a1a1a', seed: 1170 + i, flip: -1 }); }
  }

  WORLD.stairs = (t, u, cat) => {
    const split = t > EV.sr_trick, bot = t > EV.sr_bot;
    if (!split) { lay(6, () => bot ? botView(t) : topView(t)); }
    else { lay(6, () => { ctx.save(); ctx.beginPath(); ctx.rect(-600, -1200, 1140, 4000); ctx.clip(); topView(t); ctx.restore(); ctx.save(); ctx.beginPath(); ctx.rect(540, -1200, 1200, 4000); ctx.clip(); botView(t); ctx.restore(); pencil([[540, -1200], [540, 2600]], { w: 10, col: '#1a1410', pass2: false }); }); }
    lay(1, () => { const g = shape([[-500, 1490], [1600, 1490], [1600, 2400], [-500, 2400]], { wash: bot && !split ? '#b8aa94' : '#d8ccb0', washA: 1, w: 2, col: '#5a4a2a', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#5a4a2a', ang: 0.1, w: 1.2 });
      if (!bot) for (const sd of [-1, 1]) { const x = 540 + sd * 470; rect(x - 30, 1300, 60, 190, { wash: '#a8987a', washA: 1, w: 2, col: '#3a2a14' }); ell(x, 1290, 40, 16, { wash: '#b8a88a', washA: 1, w: 2, col: '#3a2a14' }); }
      human(860, 1500, 0.95, t, { body: '#8a3a5a', bodyD: '#4a1a2a', legs: '#8a3a5a', hair: '#5a3a1a', hat: 'bun', face: split ? 'shock' : 'smile', armR: 'hold', armL: 'up', long: true, seed: 1180, flip: -1 });
      push(860 - 40, 1500 - 360, 1); pencil([[0, 0], [0, -120]], { w: 3, col: '#3a2a1a', pass2: false }); blob([[-90, -110], [0, -150], [90, -110], [0, -124]], { wash: '#f2d8e0', washA: 1, w: 2, col: '#5a3a3a' }); pop();
      cat(); });
  };
  DIR.stairs = {
    outfit: 'victorian', light: { side: 1, rim: '#fff0d0' }, grade: ['#d0b080', 0.08],
    act: () => [[S0.stairs, 'talk'], [EV.sr_top, 'sideeye'], [EV.sr_bot, 'awe'], [EV.sr_trick - 0.03, 'laugh']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1490, s: 1.04, look: t < EV.sr_bot ? [0.2, 0.4] : [0.2, -0.6], rot: t > EV.sr_trick ? Math.sin((t - EV.sr_trick) * 9) * 0.08 : 0, hand: t > EV.sr_trick ? [100, -400] : [110, -270], handF: t > EV.sr_trick ? [-100, -400] : undefined }),
    cam: () => [[S0.stairs, 560, 1000, 0.06], [EV.sr_top, 560, 980, 0.08], [EV.sr_bot, 560, 980, 0.06, 'x'], [EV.sr_trick, 540, 1000, 0.04], [S1.stairs, 540, 1020, 0.1]],
    hud: t => { const lab = (s, x, a) => { ctx.save(); ctx.globalAlpha = 0.9 * a; ctx.fillStyle = 'rgba(16,10,8,0.82)'; ctx.fillRect(x - 150, 610, 300, 70); ctx.restore(); txt(s, x, 646, 38, { font: 'Osw', col: '#ffd24a', a }); };
      if (t > EV.sr_top && t < EV.sr_bot) lab('ВИД СВЕРХУ', 540, popK(t, EV.sr_top, 0.3)); if (t > EV.sr_bot && t < EV.sr_trick) lab('ВИД СНИЗУ', 540, popK(t, EV.sr_bot, 0.3));
      if (t > EV.sr_trick) { lab('СВЕРХУ', 300, 1); lab('СНИЗУ', 780, 1); note('192 ступени, 10 площадок', 540, 1440, t, EV.sr_trick + 0.2, S1.stairs, '#2a1a10', 38, -0.02); } }
  };

  // ---------------------------------------------------------------- переход В stairs: кадр складывается ступенями
  TRANS_IN.stairs = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    drawBuf(B, 1.06 - 0.06 * sm(k)); const n = 12, h = H / n;
    for (let i = 0; i < n; i++) { const d = sm(clamp(k * 1.8 - i * 0.06)), dx = (i % 2 ? 1 : -1) * d * (W + 100); if (d >= 1) continue;
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.beginPath(); ctx.rect(0, i * h, W, h + 1); ctx.clip(); ctx.translate(dx, 0); drawBuf(A); ctx.fillStyle = 'rgba(30,20,10,' + 0.3 * d + ')'; ctx.fillRect(0, i * h, W, h); ctx.restore(); }
    scr(() => { for (let i = 1; i < n; i++) pencil([[0, i * h], [W, i * h]], { w: 3, col: '#f2ead6', a: 0.5 * Math.sin(k * Math.PI), pass2: false }); });
  } };
})();
