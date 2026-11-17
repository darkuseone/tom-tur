/* Глобус-заставка (стандарт с 029 Крым, владелец 17–18.11.2026): первые ≈1,25 с каждого ролика — Земля из космоса,
   разворот к месту выпуска, экспоненциальный наезд до карты города/территории, облачная вспышка → хук.
   Всё в пространстве имён GLOBE (029 держит свою копию в krym.js — имена не пересекаются).
   В мире хука:
     const G1 = 1.25;
     WORLD.hook = (t, u, cat) => { if (t < G1) { lay(1, () => GLOBE.intro(t, { lon, lat, label: 'РИО', t1: G1, detail })); return; }
       ...сцена хука...; GLOBE.burst(t, G1); };
   detail(pr, R, t) — своя подробная карта места (рисуется на финальном наезде): pr([[lon,lat],...]) → экранные точки.
   Звук: time_zoom на старте наезда (≈0,38 с), whip_whoosh ≈0,9 с, wind_gust на t1 − 0,1. */
const GLOBE = (() => {
  const D = Math.PI / 180;
  const LAND = {
    eurasia: [[-10, 36], [-10, 44], [-2, 48], [-5, 48.5], [2, 51], [8, 54], [8, 57], [5, 62], [14, 68], [25, 71], [40, 68], [60, 70], [80, 73], [110, 77], [140, 72], [170, 69], [180, 66], [160, 60], [143, 52], [140, 45], [122, 40], [121, 31], [110, 20],
      [105, 10], [100, 13], [98, 8], [92, 20], [80, 15], [77, 8], [72, 20], [66, 25], [57, 25], [56, 27], [50, 30], [48, 30], [43, 13], [35, 28], [34, 31], [36, 36], [30, 36.5], [26, 38], [23, 36.5], [20, 40], [15, 40], [16, 38], [10, 44], [3, 43], [-1, 37], [-5, 36]],
    africa: [[-17, 15], [-17, 21], [-10, 30], [-6, 35.8], [10, 37.2], [11, 33], [20, 31], [30, 31.3], [33, 31], [43, 12], [51, 12], [40, -2], [40, -15], [35, -24], [20, -35], [18, -30], [12, -17], [13, -5], [9, 4], [-8, 4.5], [-13, 8]],
    namerica: [[-168, 66], [-162, 70], [-150, 71], [-140, 70], [-128, 70], [-115, 68], [-100, 68], [-95, 72], [-85, 70], [-80, 63], [-90, 58], [-82, 55], [-78, 58], [-77, 62], [-70, 60], [-64, 60], [-60, 55], [-56, 52], [-60, 47], [-65, 44], [-70, 42], [-74, 40],
      [-76, 35], [-81, 31], [-80, 25.5], [-82, 27], [-84, 30], [-90, 29.5], [-94, 29.5], [-97, 26], [-97, 22], [-95, 19], [-91, 18.5], [-88, 21], [-87, 16], [-84, 15], [-83, 10], [-79.5, 9], [-77, 8.5], [-80, 7.5], [-84, 9], [-86, 12], [-92, 14.5], [-96, 15.8],
      [-105, 20], [-106, 23], [-110, 24], [-112, 29], [-115, 31], [-117, 32.5], [-121, 35], [-124, 40], [-124, 46], [-125, 49], [-130, 54], [-135, 58], [-140, 60], [-150, 61], [-155, 59], [-160, 58], [-165, 60], [-166, 64]],
    samerica: [[-77, 8.5], [-75, 11], [-71, 12.4], [-64, 10.6], [-60, 8.5], [-57, 6], [-52, 4.5], [-50, 0], [-48, -1.5], [-44, -2.5], [-40, -3], [-35, -5.5], [-35, -9], [-38, -13], [-39, -17], [-40, -20.5], [-41.5, -22.9], [-43.2, -23], [-45, -23.8],
      [-48, -25.5], [-48.5, -28], [-51, -31], [-53, -34], [-57, -35], [-57, -38], [-62, -39], [-65, -42], [-66, -45], [-68, -50], [-69, -52], [-70, -55], [-73, -53], [-75, -48], [-74, -42], [-73, -37], [-71.5, -32], [-71, -26], [-70, -18], [-75, -15], [-77, -12],
      [-79, -8], [-81, -5], [-80, -1], [-79, 1], [-78, 4], [-77, 7]],
    australia: [[113, -22], [114, -26], [115, -34], [118, -35], [124, -34], [130, -32], [135, -35], [138, -35], [140, -38], [145, -39], [150, -37], [153, -31], [153, -25], [150, -22], [146, -19], [145, -15], [142, -11], [141, -17], [136, -12], [132, -11], [129, -15], [125, -14], [122, -18]],
    greenland: [[-55, 60], [-45, 60], [-40, 65], [-22, 70], [-20, 77], [-30, 83], [-55, 82], [-65, 78], [-58, 75], [-55, 70], [-52, 65]],
    britain: [[-5, 50], [1, 51], [2, 53], [-1, 57], [-3, 58.5], [-6, 58], [-5, 55], [-3, 54], [-5, 52]],
    japan: [[130, 31], [135, 34], [140, 35], [141, 38], [142, 43], [145, 44], [141, 45.5], [140, 41], [136, 37], [132, 35]],
    madagascar: [[44, -25], [47, -25], [50, -15], [49, -12], [44, -17]]
  };
  const SEA = { black: [[27.5, 42], [28.6, 44.2], [30.2, 45.85], [31.5, 46.6], [33.6, 46.12], [35.5, 45.4], [37.6, 44.8], [39.2, 43.8], [41.6, 41.6], [39, 41], [36, 41.7], [33.5, 42], [30.5, 41.3], [28.2, 41.5]],
    caspian: [[47, 45], [53, 47], [54, 42], [53, 37], [49, 37.5], [49, 41], [47, 43]] };
  const COL = { eurasia: '#7a9a4a', africa: '#c8a65a', namerica: '#6a9a4a', samerica: '#4a9a3a', australia: '#c89a5a', greenland: '#e8eef4', britain: '#7a9a4a', japan: '#7a9a4a', madagascar: '#6a9a4a' };
  function orth(lon, lat, lon0, lat0) {
    const l = (lon - lon0) * D, p = lat * D, p0 = lat0 * D, cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l);
    const x = Math.cos(p) * Math.sin(l), y = Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l);
    if (cosc < 0) { const n = Math.hypot(x, y) || 1; return [x / n, -y / n]; } return [x, -y];
  }
  function fill(P, col, a = 1) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); P.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.fill(); ctx.restore(); }
  function draw(cx, cy, R, lon0, lat0, t, o = {}) {                  // экранные координаты (вызывать в scr)
    const pr = ll => ll.map(([lo, la]) => { const [x, y] = orth(lo, la, lon0, lat0); return [cx + x * R, cy + y * R]; });
    if (R < 3000) glow(cx, cy, R * 1.12, 'rgba(120,190,255,1)', 0.22);
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.clip();
    const g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R); g.addColorStop(0, '#3a8ad8'); g.addColorStop(0.7, '#1a4a8a'); g.addColorStop(1, '#0a1e40'); ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
    Object.keys(LAND).forEach(k => fill(pr(LAND[k]), COL[k])); Object.values(SEA).forEach(s => fill(pr(s), '#2266aa'));
    if (R < 3000) { const r = rng(4900); for (let i = 0; i < 10; i++) { const lo = lon0 - 70 + r() * 140, la = -50 + r() * 110, [x, y] = orth(lo, la, lon0, lat0); ell(cx + x * R, cy + y * R, R * (0.12 + r() * 0.1), R * 0.035, { wash: '#ffffff', washA: 0.5, line: false, rot: r() - 0.5 }); } }
    if (o.region) fill(pr(o.region), R > 3000 ? '#d8b070' : '#f0b84a');
    if (o.detail && R > 2500) o.detail(pr, R, t);
    const sh = ctx.createRadialGradient(cx - R * 0.4, cy - R * 0.45, R * 0.2, cx, cy, R * 1.02); sh.addColorStop(0, 'rgba(255,255,255,0.12)'); sh.addColorStop(0.75, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,20,0.5)');
    ctx.fillStyle = sh; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R); ctx.restore();
    if (R < 3000) pencil(ellPts(cx, cy, R, R, 0, 0.02, 90), { w: 3, col: '#bfe4ff', a: 0.6, pass2: false, gap: false });
    const [px, py] = pr([[o.lon, o.lat]])[0], pin = o.pin ?? 1;
    if (pin > 0) { const ph = (t * 1.6) % 1; pencil(ellPts(px, py, 20 + ph * 90, (20 + ph * 90) * 0.6, 0, 0, 40), { w: 5, col: '#ff6a4a', a: (1 - ph) * pin, pass2: false, gap: false });
      push(px, py - 6, 1.1 * pin); blob([[0, 0], [-34, -60], [-30, -98], [0, -116], [30, -98], [34, -60]], { wash: '#c8281e', washA: 1, w: 3, col: '#160f0a' }); ell(0, -80, 14, 14, { wash: '#fff6e0', washA: 1, line: false }); pop();
      if (o.labelOn !== false && o.label) { push(px + 56, py - 120, pin); ctx.save(); ctx.font = '600 52px Osw'; const w = ctx.measureText(o.label).width + 36; ctx.fillStyle = 'rgba(16,10,8,0.85)'; ctx.fillRect(-6, -40, w, 70); ctx.restore(); txt(o.label, w / 2 - 6, -6, 52, { col: '#ffe08a', font: 'Osw' }); pop(); } }
  }
  function intro(t, o) {                                             // космос → разворот → экспо-наезд → облака (до o.t1)
    const t1 = o.t1 || 1.25, z0 = o.zoomAt || 0.38, Rend = o.Rend || 20000;
    scr(() => { ctx.fillStyle = '#04060e'; ctx.fillRect(0, 0, W, H); const r = rng(4960); for (let i = 0; i < 160; i++) { const x = r() * W, y = r() * H, b = r(); ctx.fillStyle = `rgba(255,250,235,${0.3 + b * 0.6})`; ctx.fillRect(x, y, 1.5 + b * 2.5, 1.5 + b * 2.5); }
      const rk = sm(clamp(t / 0.55)), lon0 = lerp(o.fromLon ?? o.lon - 60, o.lon, rk), lat0 = lerp(o.fromLat ?? 0, o.lat, rk);
      const zk = clamp((t - z0) / (t1 - 0.08 - z0)), ze = zk < 1 ? (Math.pow(2, 8 * zk) - 1) / 255 : 1, R = 380 * Math.pow(Rend / 380, ze) * (0.92 + 0.08 * sm(clamp(t / 0.25)));
      draw(540, 980, R, lon0, lat0, t, Object.assign({}, o, { pin: R > Rend * 0.75 ? 0 : sm(clamp((t - 0.2) / 0.2)), labelOn: R < 2500 }));
      if (zk > 0.3 && zk < 1) { const a = Math.sin((zk - 0.3) / 0.7 * Math.PI) * 0.8, rr = rng(hsh(FRAME, 4961)); for (let i = 0; i < 40; i++) { const ang = rr() * 6.283, d0 = 200 + rr() * 300; pencil([[540 + Math.cos(ang) * d0, 980 + Math.sin(ang) * d0], [540 + Math.cos(ang) * (d0 + 500), 980 + Math.sin(ang) * (d0 + 500)]], { w: 3, col: '#e8f4ff', a: a * 0.6, pass2: false, gap: false }); } }
      if (t > t1 - 0.14) { const k = (t - t1 + 0.14) / 0.14, rr = rng(4962); for (let i = 0; i < 22; i++) ell(rr() * W, rr() * H, (160 + rr() * 220) * (0.4 + k), (110 + rr() * 140) * (0.4 + k), { wash: '#ffffff', washA: 0.95 * k, line: false }); } });
  }
  function burst(t, t1, d = 0.3) {                                   // облака расходятся поверх первой сцены
    if (t < t1 || t > t1 + d) return; scr(() => { const k = 1 - (t - t1) / d, rr = rng(4962); for (let i = 0; i < 22; i++) ell(rr() * W, rr() * H, (160 + rr() * 220) * (1.4 + (1 - k) * 2), (110 + rr() * 140) * (1.4 + (1 - k) * 2), { wash: '#ffffff', washA: 0.95 * k, line: false }); });
  }
  return { orth, fill, draw, intro, burst, LAND };
})();
