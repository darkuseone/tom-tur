/* 014 — сцена `aqueduct`: 5.11.1913, северная долина Сан-Фернандо. Бетонный каскад акведука спускается с холма, внизу —
   толпа (≈ 40 тыс.), флажки, оркестр, трибуна; вдали — тот же хребет. На «воду» открывают затвор и вода хлещет по каскаду
   (толпа ликует), на «километров» — карта-HUD: линия от гор Сьерра-Невада к Л.-А. «375 км», на «высохнет» — врезка: озеро
   Оуэнс сжимается до соляной корки. Том — инженер (сюртук, котелок, чертёж). Переход В сцену — вода бежит по каналу через кадр. */
(() => {
  EV.aq_w = wtk('s5', 'воду');
  EV.aq_km = wtk('s5', 'километров.');
  EV.aq_dry = wtk('s5', 'высохнет.');
  KEYW.push('воду', 'километров.', 'высохнет.');
  const flow = t => sm((t - EV.aq_w) / 0.8);

  function sky(t) { vgrad(-900, 1000, ['#6a9ad0', '#b8d4e8', '#f2e8d0'], 1); for (let i = 0; i < 4; i++) { const x = ((i * 470 + t * 14) % 1900) - 400; for (let k = 0; k < 5; k++) ell(x + k * 52, 180 + i * 80 + Math.sin(k) * 10, 76, 26, { wash: '#f6f4f0', washA: 0.85, line: false }); } }
  function valley(t) {                                                 // холм, каскад, трибуна, толпа
    const g = shape([[-600, 1500], [-600, 1040], [400, 1000], [700, 760], [1100, 700], [1700, 760], [1700, 1500]], { wash: '#c8b07a', washA: 1, w: 2, col: '#7a5a2a' }); hatch(g.path, g.bb, { gap: 11, a: 0.14, col: '#9a7a4a', ang: -0.5, w: 1.1 });
    cascade(780, 1160, 0.95, t, { flow: flow(t) });
    rect(-120, 1060, 360, 30, { wash: '#8a6a42', washA: 1, w: 2, col: '#3a2412' }); for (const px of [-100, 220]) pencil([[px, 1090], [px, 1180]], { w: 6, col: '#5a3a1e', pass2: false }); for (let q = 0; q < 8; q++) { const x = -110 + q * 46, wv = Math.sin(t * 5 + q) * 6; poly([[x, 1040], [x + 40, 1040 + wv], [x + 20, 1070]], { wash: ['#c8302a', '#f2ece0', '#2a5aa8'][q % 3], washA: 1, w: 1, col: '#2a2a2a' }); } pencil([[-120, 1040], [240, 1040]], { w: 2, col: '#3a2a14', pass2: false });
    const cheer = flow(t); crowd(-400, 1500, 1240, 46, t, 14610, { s: 0.9, dy: 60 });
    for (let i = 0; i < 6; i++) { const x = -260 + i * 300, j = cheer * Math.abs(Math.sin(t * 7 + i)) * 20; human(x, 1340 - j, 0.46, t, { body: ['#2a2a32', '#e8e4dc', '#5a3a2a', '#3a4a6a', '#e8d8b0', '#2a3a2a'][i], legs: '#2a2a2e', hair: '#3a2210', hat: i % 2 ? 'merchant' : 'straw', hatCol: i % 2 ? '#141414' : '#e8d090', face: cheer > 0.3 ? 'smile' : 'calm', armR: cheer > 0.3 ? 'up' : 'hold', armL: cheer > 0.3 && i % 2 ? 'up' : 'hold', long: i === 4, seed: 14620 + i }); }
  }

  WORLD.aqueduct = (t, u, cat) => {
    lay(30, () => sky(t));
    lay(18, () => ridge(t, { col: '#a89c78', colD: '#6a6040' }));
    lay(4, () => valley(t));
    lay(1, () => { const g = shape([[-500, 1460], [1600, 1460], [1600, 2400], [-500, 2400]], { wash: '#b8a070', washA: 1, w: 2, col: '#5a4a24', a: 0.4 }); hatch(g.path, g.bb, { gap: 12, a: 0.12, col: '#6a5a2a', ang: 0.1, w: 1.2 }); cat(); });
    lay(0.7, () => { if (flow(t) > 0) motes(40, [500, 900, 1100, 1300], '#f2faff', t, 14630, { sp: -40, sz: 4, a: 0.5 * flow(t), wob: 30 }); });
  };
  DIR.aqueduct = {
    outfit: 'architect', light: { side: 1, rim: '#fff4e0' }, grade: ['#a8b0b0', 0.06],
    act: () => [[S0.aqueduct, 'proud'], [EV.aq_w, 'awe'], [EV.aq_km, 'grin'], [EV.aq_dry - 0.03, 'annoyed']],
    pose: (t, u, b) => Object.assign(b, { x: 280, y: 1480, s: 1.0, look: [0.6, -0.4], point: t > EV.aq_w && t < EV.aq_km ? 1 : undefined, hand: t > EV.aq_w && t < EV.aq_km ? [210, -330] : [120, -270] }),
    cam: () => [[S0.aqueduct, 600, 1060, 0.04], [EV.aq_w, 680, 980, 0.06], [EV.aq_km, 560, 1060, 0.04], [EV.aq_dry, 560, 1080, 0.06], [S1.aqueduct, 560, 1080, 0.08]],
    hud: t => {
      if (t > EV.aq_km) { const k = popK(t, EV.aq_km, 0.35); push(650, 830, k, 0.02); rect(-210, -230, 420, 400, { wash: '#efe6cc', washA: 0.97, w: 3, col: '#5a4a2a' });
        pencil([[-120, 140], [-60, 40], [20, -40], [110, -170]], { w: 6, col: '#3a7ab8', pass2: false }); ell(-120, 140, 14, 14, { wash: '#c8302a', washA: 1, w: 2, col: '#3a0a08' }); txt('Л.-А.', -120, 180, 26, { font: 'Osw', col: '#2a1a10' });
        const dry = t > EV.aq_dry ? sm((t - EV.aq_dry) / 0.8) : 0; ell(110, -170, 60 * (1 - dry) + 6, 26 * (1 - dry) + 4, { wash: dry > 0.5 ? '#f2eee6' : '#5a9ac8', washA: 1, w: 2, col: '#2a4a6a' }); txt(dry > 0.5 ? 'СОЛЬ' : 'оз. Оуэнс', 110, -110, 24, { font: 'Osw', col: dry > 0.5 ? '#a8201e' : '#2a4a6a' });
        txt('375 км', 30, 30, 40, { font: 'Osw', col: '#a8201e' }); txt('акведук · 1913', 0, -200, 26, { font: 'Osw', col: '#2a1a10' }); pop(); }
      if (t > EV.aq_w && t < EV.aq_km) { const k = popK(t, EV.aq_w, 0.3); push(560, 740, k, -0.03); rect(-220, -50, 440, 100, { wash: '#f2ece0', washA: 0.97, w: 3, col: '#3a2a14' }); txt('«ВОТ ОНА. БЕРИТЕ!»', 0, 12, 38, { font: 'Osw', col: '#2a4a7a' }); pop(); }
    }
  };
  TRANS_IN.aqueduct = { a: 0.3, b: 0.45, fx(k, t, A, B) {            // вода бежит по каналу через кадр и смывает эпоху
    const q = sm(k), X = lerp(-200, W + 600, q); drawBuf(A); const P = new Path2D(); P.rect(0, 0, Math.max(1, X - 300), H); inPath(P, () => drawBuf(B, 1.04 - 0.04 * q));
    scr(() => { const f = Math.sin(clamp(k) * Math.PI); const g = ctx.createLinearGradient(X - 400, 0, X, 0); g.addColorStop(0, 'rgba(90,160,210,0)'); g.addColorStop(0.6, 'rgba(110,180,225,0.9)'); g.addColorStop(1, 'rgba(240,250,255,0.95)'); ctx.save(); ctx.globalAlpha = f; ctx.fillStyle = g; ctx.fillRect(X - 400, 0, 400, H); ctx.restore();
      for (let i = 0; i < 20; i++) ell(X - 10, i * 100 + Math.sin(t * 6 + i) * 20, 40, 30, { wash: '#f2faff', washA: 0.8 * f, line: false }); });
  } };
})();
