/* =====================================================================
   衣服的图（单独一件，Q 版、平涂、粗黑线）：衣服投影片、学习单、岛上的衣服游戏共用
   CLOTHES_ART.svg('T恤', '#E5483B')  → <svg>（100 × 100），颜色不写就用预设的颜色
   CLOTHES_ART.names  → 12 件衣服的名字
   ===================================================================== */
(function () {
  const INK = '#2B2B2B';
  const sw = (w = 4) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const line = (d, w = 3) => `<path d="${d}" fill="none" ${sw(w)}/>`;
  // 比衣服深一点的颜色（领子、袖口、鞋底）
  const shade = hex => { const n = parseInt(hex.slice(1), 16); const f = v => Math.max(0, Math.round(v * 0.78)); return '#' + [f(n >> 16), f((n >> 8) & 255), f(n & 255)].map(v => v.toString(16).padStart(2, '0')).join(''); };
  const ART = {
    'T恤': c => `<path d="M34 16 Q50 26 66 16 L90 30 L80 46 L70 40 L70 88 L30 88 L30 40 L20 46 L10 30 Z" fill="${c}" ${sw()}/>` + line('M34 16 Q50 30 66 16') +
      `<path d="M30 56 L70 56 L70 64 L30 64 Z" fill="#FFFFFF" ${sw(2.5)}/>`,
    '毛衣': c => `<path d="M34 14 Q50 22 66 14 L84 22 L92 72 L80 74 L74 40 L74 86 L26 86 L26 40 L20 74 L8 72 L16 22 Z" fill="${c}" ${sw()}/>` +
      `<path d="M36 14 Q50 26 64 14 L64 20 Q50 32 36 20 Z" fill="${shade(c)}" ${sw(2.5)}/>` +
      `<path d="M26 80 L74 80 M8 66 L20 68 M92 66 L80 68" ${sw(3)}/>` + line('M38 46 L44 52 L50 46 L56 52 L62 46', 2.5) + line('M38 60 L44 66 L50 60 L56 66 L62 60', 2.5),
    '外套': c => `<path d="M32 12 L50 22 L68 12 L86 22 L94 78 L80 80 L76 44 L76 90 L24 90 L24 44 L20 80 L6 78 L14 22 Z" fill="${c}" ${sw()}/>` +
      `<path d="M32 12 L44 34 L50 22 Z M68 12 L56 34 L50 22 Z" fill="${shade(c)}" ${sw(2.5)}/>` + line('M50 22 L50 90', 3) +
      `<rect x="30" y="58" width="14" height="10" rx="2" fill="${shade(c)}" ${sw(2.5)}/><rect x="56" y="58" width="14" height="10" rx="2" fill="${shade(c)}" ${sw(2.5)}/>` +
      `<circle cx="54" cy="40" r="2.5" fill="${INK}"/><circle cx="54" cy="52" r="2.5" fill="${INK}"/>`,
    '球衣': c => `<path d="M34 12 Q50 24 66 12 L78 14 Q76 30 84 40 L76 46 L74 90 L26 90 L24 46 L16 40 Q24 30 22 14 Z" fill="${c}" ${sw()}/>` +
      `<path d="M34 12 Q50 30 66 12" fill="none" stroke="#FFFFFF" stroke-width="5"/>` + line('M34 12 Q50 24 66 12', 3) +
      `<text x="50" y="72" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="30" fill="#FFFFFF" stroke="${INK}" stroke-width="2">7</text>`,
    '牛仔裤': c => `<path d="M26 10 L74 10 L80 92 L58 92 L50 38 L42 92 L20 92 Z" fill="${c}" ${sw()}/>` +
      `<path d="M26 10 L74 10 L74 20 L26 20 Z" fill="${shade(c)}" ${sw(3)}/><circle cx="50" cy="15" r="2.5" fill="#F5C531" ${sw(1.5)}/>` +
      line('M30 20 Q34 30 44 30 M70 20 Q66 30 56 30', 2.5) + line('M50 20 L50 38', 2.5) +
      `<path d="M30 60 L30 64 M70 60 L70 64" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="3 3"/>`,
    '短裤': c => `<path d="M22 24 L78 24 L86 72 L58 76 L50 46 L42 76 L14 72 Z" fill="${c}" ${sw()}/>` +
      `<path d="M22 24 L78 24 L78 34 L22 34 Z" fill="${shade(c)}" ${sw(3)}/>` + line('M50 34 L50 46', 2.5) +
      line('M42 28 Q38 40 34 42 M58 28 Q62 40 66 42', 2),
    '裙子': c => `<path d="M30 22 L70 22 L72 32 L28 32 Z" fill="${shade(c)}" ${sw()}/>` +
      `<path d="M28 32 L72 32 L90 80 Q80 86 70 80 Q60 86 50 80 Q40 86 30 80 Q20 86 10 80 Z" fill="${c}" ${sw()}/>` +
      line('M40 34 L32 78 M60 34 L68 78 M50 34 L50 80', 2.5),
    '连衣裙': c => `<path d="M36 8 L42 8 L44 20 Q50 24 56 20 L58 8 L64 8 L66 26 L62 40 L84 86 Q50 96 16 86 L38 40 L34 26 Z" fill="${c}" ${sw()}/>` +
      `<path d="M38 40 L62 40 L62 46 L38 46 Z" fill="#FFFFFF" ${sw(2.5)}/><path d="M50 43 L44 38 L44 48 Z M50 43 L56 38 L56 48 Z" fill="${shade(c)}" ${sw(2)}/>` +
      `<path d="M38 72 Q42 66 46 72 Q42 78 38 72 Z M56 62 Q60 56 64 62 Q60 68 56 62 Z" fill="#FFFFFF" ${sw(2)}/>`,
    // 鞋子：侧面，鞋头都朝左，鞋底都踩在同一条线（y = 84）
    // 运动鞋：白色厚鞋底、鞋头、交叉的鞋带和蝴蝶结
    '运动鞋': c => `<path d="M8 62 Q6 50 20 48 L40 44 Q50 34 60 28 L72 22 Q84 18 90 28 L94 42 Q96 58 94 74 L8 74 Q6 66 8 62 Z" fill="${c}" ${sw()}/>` +
      `<path d="M8 72 Q6 54 20 50 Q27 60 25 74 L8 74 Z" fill="#FFFFFF" ${sw(3)}/>` +
      `<path d="M70 24 Q80 18 89 26 Q80 30 71 29 Z" fill="${shade(c)}" ${sw(2.5)}/>` +
      `<path d="M38 46 L50 34 L62 26" fill="none" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round"/><path d="M38 46 L50 34 L62 26" fill="none" ${sw(2.5)}/>` +
      `<path d="M40 40 L48 48 M46 34 L54 42 M52 29 L60 37 M58 25 L64 31" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>` +
      `<path d="M62 26 Q54 14 50 22 Q54 28 62 26 Q70 14 74 22 Q70 28 62 26 Z" fill="#FFFFFF" ${sw(2.5)}/><path d="M62 26 L58 36 M62 26 L68 35" ${sw(2.5)}/>` +
      `<path d="M8 74 L94 74 Q97 78 94 82 Q92 84 86 84 L14 84 Q7 84 7 79 Q7 75 8 74 Z" fill="#FFFFFF" ${sw()}/>` +
      `<path d="M66 50 Q78 42 90 46" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>`,
    // 皮鞋：低低的、亮亮的，鞋口在右上，薄鞋底和后跟
    '皮鞋': c => `<path d="M8 74 Q6 58 20 56 Q36 54 46 46 Q54 40 64 40 L86 40 Q94 42 94 54 L94 74 Z" fill="${c}" ${sw()}/>` +
      `<path d="M60 42 Q74 37 90 42 Q78 47 62 46 Z" fill="${shade(shade(c))}" ${sw(2.5)}/>` +
      `<path d="M26 56 Q32 64 30 74" fill="none" ${sw(2.5)}/><path d="M48 46 L56 52 M52 43 L60 49" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>` +
      `<path d="M6 74 L96 74 L96 84 L74 84 L74 80 Q66 78 58 80 L58 84 L12 84 Q6 84 6 78 Z" fill="${INK}"/>` +   // 鞋底：前面和后跟都踩在 y = 84，中间（脚弓）往上凹
      `<ellipse cx="18" cy="64" rx="6" ry="3" fill="#FFFFFF" opacity=".7"/><ellipse cx="76" cy="58" rx="7" ry="3" fill="#FFFFFF" opacity=".35"/>`,
    // 高跟鞋：尖尖的鞋头踩在地上，鞋口往下弯，后面高高的鞋跟（细跟也踩在地上）
    '高跟鞋': c => `<path d="M78 56 L88 54 L86 84 L82 84 Z" fill="${shade(c)}" ${sw()}/><path d="M80 82 L88 82 L88 87 L80 87 Z" fill="${INK}"/>` +
      `<path d="M6 84 Q4 76 14 74 Q28 68 42 66 Q60 68 70 56 Q78 44 86 38 L89 40 Q92 50 87 58 Q72 62 60 72 Q46 84 26 85 Z" fill="${c}" ${sw()}/>` +
      `<path d="M44 67 Q60 69 70 58 L84 42 Q78 55 66 65 Q54 74 44 67 Z" fill="${shade(c)}" ${sw(2.5)}/>` +
      `<path d="M12 78 Q22 72 34 70" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity=".7"/>`,
    // 帽子：跟岛上（海滩小朋友）的帽子一样：宽宽的帽檐、白色的帽带
    '帽子': c => `<g transform="translate(-30 14) scale(0.8)"><path d="M40 60 Q100 44 160 60 Q150 70 100 66 Q50 70 40 60 Z" fill="${c}" ${sw(5)}/><path d="M64 60 Q66 30 100 28 Q134 30 136 60 Z" fill="${c}" ${sw(5)}/>` +
      `<path d="M66 52 Q100 46 134 52" fill="none" stroke="#FFFFFF" stroke-width="5"/></g>`
  };
  const DEF = { 'T恤': '#E5483B', '毛衣': '#F28C28', '外套': '#3B78D8', '球衣': '#45A852', '牛仔裤': '#4F7CC0', '短裤': '#F5C531',
    '裙子': '#EC8FB3', '连衣裙': '#9B6BC9', '运动鞋': '#E5483B', '皮鞋': '#7A4B2A', '高跟鞋': '#E2557A', '帽子': '#F2C14E' };
  window.CLOTHES_ART = {
    names: Object.keys(ART),
    color: zh => DEF[zh],
    svg: (zh, c) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${ART[zh](c || DEF[zh])}</svg>`
  };
})();
