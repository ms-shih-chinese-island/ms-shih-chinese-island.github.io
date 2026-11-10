/* =====================================================================
   机场的图（Q 版、平涂、粗黑线）
   WART.sky('晴天')     飞机窗外的天空（200 × 140）
   WART.icon('晴天')    天气小图（正方形，天气板用）
   WART.pilot(kind)     机长（kind = 'man' / 'woman'）
   天气：晴天、多云、阴天、下雨天、下雪天、刮风（课纲二年级 12 月）
   ===================================================================== */
(function () {
  const INK = '#2B2B2B';
  const sw = (w = 3.5) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const sun = (x, y, r) => `<g>${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path d="M${x + Math.cos(a) * (r + 6)} ${y + Math.sin(a) * (r + 6)} L${x + Math.cos(a) * (r + 15)} ${y + Math.sin(a) * (r + 15)}" ${sw(4)} stroke="#F2A20C"/>`; }).join('')}` +
    `<circle cx="${x}" cy="${y}" r="${r}" fill="#F5C531" ${sw()}/></g>`;
  const cloud = (x, y, s, fill) => `<path transform="translate(${x} ${y}) scale(${s})" d="M-34 12 Q-44 12 -44 2 Q-44 -10 -30 -10 Q-28 -26 -10 -26 Q4 -36 18 -24 Q36 -26 38 -8 Q50 -6 48 6 Q46 14 36 14 Z" fill="${fill}" ${sw(3.5 / s)}/>`;
  const rain = (x, y) => `<path d="M${x} ${y} l-5 12" stroke="#3B78D8" stroke-width="4" stroke-linecap="round"/>`;
  // 雪花：六个角，白色、黑边，大一点比较清楚
  const flake = (x, y, r = 9) => { const d = [0, 60, 120].map(a => { const c = Math.cos(a * Math.PI / 180) * r, t = Math.sin(a * Math.PI / 180) * r; return `M${x - c} ${y - t} L${x + c} ${y + t}`; }).join(' ');
    return `<path d="${d}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="${d}" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`; };
  const wind = (x, y, w) => `<path d="M${x} ${y} L${x + w} ${y} Q${x + w + 14} ${y} ${x + w + 14} ${y - 10} Q${x + w + 14} ${y - 20} ${x + w + 4} ${y - 18}" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M${x} ${y} L${x + w} ${y} Q${x + w + 14} ${y} ${x + w + 14} ${y - 10} Q${x + w + 14} ${y - 20} ${x + w + 4} ${y - 18}" fill="none" stroke="#7FA9C9" stroke-width="3" stroke-linecap="round"/>`;
  const leaf = (x, y, r) => `<path transform="translate(${x} ${y}) rotate(${r})" d="M0 0 Q8 -8 16 0 Q8 8 0 0 Z" fill="#6DBE5A" ${sw(2)}/>`;
  const BLUE = '#9ED3F0', GREY = '#B7C2CC', DARK = '#8E99A4';
  const SKY = {
    晴天: [BLUE, sun(100, 66, 26)],
    // 多云：蓝天、大太阳、白云（还看得到太阳）
    多云: [BLUE, sun(130, 52, 24) + cloud(66, 70, 1.05, '#FFFFFF') + cloud(150, 104, .85, '#FFFFFF')],
    // 阴天：整片深灰色的天空，厚厚的灰云盖满，没有太阳
    阴天: ['#7D8893', cloud(40, 40, 1.1, '#A3ACB5') + cloud(120, 34, 1.2, '#959FA9') + cloud(180, 52, 1, '#A3ACB5') +
          cloud(70, 92, 1.2, '#959FA9') + cloud(150, 98, 1.1, '#A3ACB5') + cloud(20, 120, 1, '#A3ACB5') + cloud(110, 134, 1.1, '#959FA9')],
    下雨天: [GREY, cloud(70, 50, 1, DARK) + cloud(140, 56, 1, DARK) + [[50, 80], [76, 92], [102, 78], [128, 94], [154, 82], [64, 112], [114, 116], [166, 114]].map(p => rain(...p)).join('')],
    // 下雪天：大雪花、地上一层厚厚的白雪
    下雪天: ['#A9C4DA', cloud(60, 38, .9, '#E6ECF1') + cloud(140, 34, 1, '#E6ECF1') + [[34, 70], [78, 64], [122, 72], [168, 66], [52, 98], [100, 94], [146, 100], [186, 92], [26, 120], [76, 118], [124, 116]].map(p => flake(...p)).join('') +
      `<path d="M0 116 Q30 104 60 114 Q100 126 140 110 Q170 102 200 112 L200 140 L0 140 Z" fill="#FFFFFF" ${sw(3)}/>`],
    刮风: [BLUE, wind(24, 50, 90) + wind(60, 86, 100) + wind(20, 118, 70) + leaf(150, 40, 20) + leaf(170, 110, -30) + leaf(120, 124, 60)]
  };
  const sky = k => `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="200" height="140" fill="${SKY[k][0]}"/>${SKY[k][1]}</svg>`;
  const icon = k => `<svg viewBox="20 10 160 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="20" y="10" width="160" height="120" rx="14" fill="${SKY[k][0]}"/>${SKY[k][1]}</svg>`;
  // 机长：深蓝色制服、机长帽
  const CAP = `<path d="M54 52 Q100 30 146 52 L140 64 Q100 56 60 64 Z" fill="#1F3A68" ${sw()}/><path d="M60 62 Q100 54 140 62 L142 70 Q100 62 58 70 Z" fill="#2B2B2B" ${sw(3)}/>` +
    `<path d="M92 44 L108 44 L104 54 L96 54 Z" fill="#F5C531" ${sw(2.5)}/>`;
  const pilot = kind => window.NPC_ART.person({ kind, top: '#1F3A68', bottom: '#1F3A68', hat: CAP });
  window.WART = { sky, icon, pilot, list: Object.keys(SKY) };
})();
