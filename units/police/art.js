/* =====================================================================
   公安局的图（宽高 100）：失物招领的东西，颜色可以换
   LART.svg('帽子', '#E5483B')
   画风：Q 版、平涂、粗黑线
   ===================================================================== */
(function () {
  const K = '#2B2B2B';
  const sw = (w = 3.5) => `stroke="${K}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16); const f = c => Math.max(0, Math.min(255, Math.round(c * k))); return '#' + [n >> 16, (n >> 8) & 255, n & 255].map(c => f(c).toString(16).padStart(2, '0')).join(''); };
  const DRAW = {
    // 帽子：棒球帽
    帽子: c => `<path d="M20 64 Q20 26 52 26 Q82 26 82 64 Z" fill="${c}" ${sw()}/><path d="M50 64 L92 64 Q96 74 84 76 L50 72 Z" fill="${shade(c, .8)}" ${sw()}/>` +
      `<path d="M52 27 L52 64" ${sw(2.5)}/><circle cx="52" cy="25" r="4" fill="${shade(c, .8)}" ${sw(2.5)}/><path d="M20 64 L50 64" ${sw()}/>`,
    // 书包：后背包
    书包: c => `<path d="M34 26 Q34 14 50 14 Q66 14 66 26" fill="none" ${sw(5)}/><rect x="22" y="24" width="56" height="66" rx="14" fill="${c}" ${sw()}/>` +
      `<rect x="30" y="56" width="40" height="26" rx="6" fill="${shade(c, .82)}" ${sw()}/><path d="M30 64 L70 64" ${sw(2.5)}/><rect x="46" y="60" width="8" height="8" rx="2" fill="#F5C531" ${sw(2)}/>`,
    // 雨伞：打开的
    雨伞: c => `<path d="M10 50 Q14 14 50 12 Q86 14 90 50 Q80 42 70 50 Q60 42 50 50 Q40 42 30 50 Q20 42 10 50 Z" fill="${c}" ${sw()}/>` +
      `<path d="M50 12 L50 82 Q50 92 40 90 Q34 88 36 80" fill="none" ${sw(4)}/><path d="M30 50 Q40 26 50 12 M70 50 Q60 26 50 12" fill="none" ${sw(2.5)}/>`,
    // 铅笔：斜放
    铅笔: c => `<g transform="rotate(-35 50 50)"><rect x="14" y="40" width="60" height="20" fill="${c}" ${sw()}/><path d="M14 46.7 L74 46.7 M14 53.3 L74 53.3" stroke="${shade(c, .75)}" stroke-width="2"/>` +
      `<path d="M74 40 L92 50 L74 60 Z" fill="#F2D3B0" ${sw()}/><path d="M86 47 L92 50 L86 53 Z" fill="${K}"/><rect x="6" y="40" width="10" height="20" rx="2" fill="#F49AC1" ${sw()}/></g>`,
    // 水壶
    水壶: c => `<path d="M58 14 Q72 8 74 22 Q75 32 64 32" fill="none" ${sw(4)}/>` +
      `<rect x="44" y="6" width="8" height="10" rx="3" fill="${shade(c, .75)}" ${sw(2.5)}/>` +
      `<rect x="36" y="14" width="28" height="16" rx="5" fill="${shade(c, .75)}" ${sw()}/>` +
      `<path d="M34 34 Q34 30 38 30 L62 30 Q66 30 66 34 L68 88 Q68 94 62 94 L38 94 Q32 94 32 88 Z" fill="${c}" ${sw()}/>` +
      `<path d="M33 52 L67 52 M33 70 L67 70" fill="none" ${sw(2.5)}/>` +
      `<path d="M40 38 L40 46 M40 58 L40 64" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="4" stroke-linecap="round"/>`,
    // 球
    球: c => `<circle cx="50" cy="52" r="36" fill="${c}" ${sw()}/><path d="M18 40 Q50 56 82 40 M18 64 Q50 48 82 64" fill="none" stroke="#FFFFFF" stroke-width="4"/><path d="M18 40 Q50 56 82 40 M18 64 Q50 48 82 64" fill="none" ${sw(1.5)}/>` +
      `<path d="M36 26 Q30 30 28 36" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="5" stroke-linecap="round"/>`
  };
  window.LART = {
    list: Object.keys(DRAW),
    svg: (zh, c) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${DRAW[zh](c)}</svg>`
  };
})();
