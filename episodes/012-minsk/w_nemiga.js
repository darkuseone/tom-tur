/* 012 — сцена `nemiga`: 3 марта 1067. Мартовская метель, лёд реки Немиги, на холме деревянный детинец. Дружины Всеслава Полоцкого и
   Ярославичей сходятся на льду: щиты, копья, стяги (без натурализма). На переднем плане летописец-монах пишет на пергаменте.
   На «летопись» — свиток «1067 · ПОВЕСТЬ ВРЕМЕННЫХ ЛЕТ · …на Немизе…», на «Москва» рядом призрачная пометка «МОСКВА — 1147 · +80 лет».
   Том в кольчуге. Переход В сцену — лёд трескается от центра и кадр раскалывается. */
(() => {
  EV.ne_chron = wtk('s1', 'летопись.');
  EV.ne_mos = wtk('s1', 'Москва');
  KEYW.push('Немиге:', 'летопись.', 'восемьдесят');
  SHAKES.push([S0.nemiga + 0.1, 0.3, 7]);

  function sky(t) { vgrad(-900, 1000, ['#6a7a8a', '#a8b4c0', '#d8dce0'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 450 + t * 30) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 140 + i * 80 + Math.sin(k) * 10, 80, 28, { wash: '#c8ccd2', washA: 0.85, line: false }); } }
  function hill(t) { const h = shape([[-500, 880], [-100, 760], [400, 740], [800, 800], [1600, 860], [1600, 1000], [-500, 1000]], { wash: '#e4e8ee', washA: 1, w: 2, col: '#6a7a8a' }); detinets(260, 820, 0.7, t);
    for (let i = 0; i < 3; i++) { const ph = (t * 0.4 + i / 3) % 1; ell(200 + i * 100, 560 - ph * 200, 20 + ph * 40, 14 + ph * 30, { wash: '#8a8a90', washA: 0.4 * (1 - ph), line: false }); } }
  function ice(t) {                                                    // лёд Немиги и две дружины
    const r = shape([[-500, 1000], [1600, 980], [1600, 1300], [-500, 1320]], { wash: '#cfe0ea', washA: 1, w: 2, col: '#6a8aa0' }); shadeG(r.path, 0, 980, 0, 1320, '#8aa8bc', 0.4); for (let k = 0; k < 10; k++) pencil([[-400 + k * 200, 1020 + (k % 3) * 60], [-300 + k * 200, 1080 + (k % 2) * 80]], { w: 1.6, col: '#f6fbff', a: 0.7, pass2: false });
    const clash = sm((t - S0.nemiga) / 1.2);
    for (let side = 0; side < 2; side++) for (let i = 0; i < 6; i++) { const x = side ? lerp(1500, 760, clash) + i * 70 : lerp(-400, 300, clash) - i * 70, y = 1150 + (i % 2) * 40;
      human(x, y, 0.5, t, { body: side ? '#8a3a2a' : '#3a4a6a', legs: '#4a3a2a', hat: 'helmet', beard: 'short', hair: '#4a3a2a', face: 'angry', armR: Math.sin(t * 6 + i) > 0 ? 'up' : 'hold', prop: 'spear', seed: 1240 + i + side * 10, flip: side ? -1 : 1 });
      ell(x + (side ? -30 : 30), y - 90, 26, 30, { wash: side ? '#c8302a' : '#2a5aa8', washA: 1, w: 2, col: '#1a1a1a' }); }
    for (const [x, c] of [[260, '#2a5aa8'], [1220, '#c8302a']]) { const fx = lerp(x < 600 ? -300 : 1500, x, clash), wv = Math.sin(t * 6 + x) * 8; pencil([[fx, 1150], [fx, 900]], { w: 5, col: '#4a3a2a' }); shape([[fx, 900], [fx + 110, 906 + wv], [fx + 100, 960 + wv], [fx, 956]], { wash: c, washA: 1, w: 1.6, col: '#1a1a1a' }); }
  }
  function monk(t) {                                                   // летописец с пергаментом
    const x = 900, y = 1490; rect(x - 120, y - 140, 200, 20, { wash: '#6a4424', washA: 1, w: 2, col: '#2a1a08' }); rect(x - 110, y - 120, 16, 120, { wash: '#6a4424', washA: 1, w: 1.6, col: '#2a1a08' }); rect(x + 60, y - 120, 16, 120, { wash: '#6a4424', washA: 1, w: 1.6, col: '#2a1a08' });
    rect(x - 100, y - 160, 160, 26, { wash: '#f2e6c4', washA: 1, w: 1.6, col: '#5a3a1a' }); for (let q = 0; q < 3; q++) pencil([[x - 90, y - 154 + q * 7], [x + 40, y - 154 + q * 7]], { w: 1.2, col: '#3a2a1a', pass2: false });
    human(x + 130, y, 0.95, t, { body: '#2a2420', legs: '#2a2420', hair: '#6a5a4a', beard: 'long', hat: 'hood', hatCol: '#2a2420', face: 'calm', armR: 'point', armL: 'hold', long: true, seed: 1260, flip: -1 });
  }
  function snow(t) { motes(120, [-200, -200, 1400, 2100], '#ffffff', t, 12300, { sp: 160, vx: -90, sz: 4, a: 0.8, wob: 20 }); }

  WORLD.nemiga = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(10, () => hill(t));
    lay(5, () => ice(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#eef2f6', washA: 1, w: 2, col: '#6a7a8a', a: 0.5 }); hatch(g.path, g.bb, { gap: 12, a: 0.1, col: '#6a7a8a', ang: 0.1, w: 1.2 }); monk(t); cat(); });
    lay(0.7, () => snow(t));
  };
  DIR.nemiga = {
    outfit: 'kolchuga', light: { side: -1, rim: '#e0eaf4' }, grade: ['#8aa0b8', 0.14],
    act: () => [[S0.nemiga, 'cold'], [EV.ne_chron - 0.03, 'proud'], [EV.ne_mos, 'smug']],
    pose: (t, u, b) => Object.assign(b, { x: 360, y: 1480, s: 1.04, look: t < EV.ne_chron ? [0.3, -0.3] : [0.6, 0], chatter: t < EV.ne_chron, frost: 1, hand: t > EV.ne_mos ? [100, -390] : undefined }),
    cam: () => [[S0.nemiga, 560, 1000, 0.08], [EV.ne_chron, 620, 1040, 0.1], [EV.ne_mos, 600, 1020, 0.06], [S1.nemiga, 600, 1040, 0.12]],
    hud: t => { if (t > EV.ne_chron) { const k = popK(t, EV.ne_chron, 0.35); push(540, 700, k, -0.02); rect(-300, -90, 600, 180, { wash: '#f2e6c4', washA: 0.97, w: 3, col: '#5a3a1a' }); for (const sx of [-300, 300]) ell(sx, 0, 20, 90, { wash: '#e2d0a0', washA: 1, w: 2, col: '#5a3a1a' });
        txt('1067 · ПОВЕСТЬ ВРЕМЕННЫХ ЛЕТ', 0, -40, 34, { font: 'Osw', col: '#5a1a10' }); txt('«…на Немизе…» — первое упоминание', 0, 20, 30, { col: '#2a1a10' }); pop(); }
      if (t > EV.ne_mos) { const k = popK(t, EV.ne_mos, 0.35); push(700, 900, k, 0.04); ctx.save(); ctx.globalAlpha = 0.9 * k; ctx.fillStyle = 'rgba(16,10,8,0.84)'; ctx.fillRect(-190, -60, 380, 120); ctx.restore(); txt('МОСКВА — 1147', 0, -16, 40, { font: 'Osw', col: '#f6e7c8', a: k }); txt('+80 лет', 0, 32, 34, { font: 'Osw', col: '#ffd24a', a: k }); pop(); } }
  };

  // ---------------------------------------------------------------- переход В nemiga: лёд трескается от центра и раскалывается
  TRANS_IN.nemiga = { a: 0.3, b: 0.4, fx(k, t, A, B) {
    const cr = sm(clamp(k / 0.45)), sp = sm(clamp((k - 0.45) / 0.55)); drawBuf(B, 1.08 - 0.08 * sm(k));
    const r = rng(12310), N = 9, cx = 540, cy = 960, ang = []; for (let i = 0; i < N; i++) ang.push(i / N * 6.283 + r() * 0.4);
    for (let i = 0; i < N; i++) { const a0 = ang[i], a1 = ang[(i + 1) % N] + (i === N - 1 ? 6.283 : 0), mid = (a0 + a1) / 2, d = sp * sp * 1600;
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(Math.cos(mid) * d, Math.sin(mid) * d); const P = new Path2D(); P.moveTo(cx, cy); P.lineTo(cx + Math.cos(a0) * 2400, cy + Math.sin(a0) * 2400); P.lineTo(cx + Math.cos(a1) * 2400, cy + Math.sin(a1) * 2400); P.closePath(); ctx.clip(P); drawBuf(A); ctx.fillStyle = 'rgba(210,230,245,' + 0.3 * cr + ')'; ctx.fill(P); ctx.restore(); }
    scr(() => { for (let i = 0; i < N; i++) { const L = 1400 * cr; pencil([[540, 960], [540 + Math.cos(ang[i]) * L, 960 + Math.sin(ang[i]) * L]], { w: 5, col: '#f6fbff', a: 0.9 * (1 - sp), pass2: false }); } });
  } };
})();
