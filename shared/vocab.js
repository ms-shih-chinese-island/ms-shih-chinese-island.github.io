// 同一个生词，整个网站都用同一张图（100 × 100）
//   window.VOCAB['糖果']  window.VOCAB['南瓜灯']  window.VOCAB['月饼']
//   万圣节（鬼屋）、中秋小知识、地图上送的糖果和月饼都用这一份
(function () {
  const K = '#2B2B2B';
  const svg = inner => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="${K}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${inner}</g></svg>`;
  const sw = (w = 3) => `stroke="${K}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const mooncake = (x, y, r) => `<g transform="translate(${x} ${y}) scale(${r / 30})">` +
    Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<circle cx="${(28 * Math.cos(a)).toFixed(1)}" cy="${(28 * Math.sin(a)).toFixed(1)}" r="7" fill="#D9963F" ${sw(2.5)}/>`; }).join('') +
    `<circle r="28" fill="#D9963F"/><circle r="18" fill="#E9B05A" ${sw(2)}/><path d="M-8 -8 L8 8 M8 -8 L-8 8 M0 -11 L0 11 M-11 0 L11 0" stroke="#B9782E" stroke-width="2.5" stroke-linecap="round"/></g>`;
  window.VOCAB = {
    '糖果': svg(`<path d="M30 40 L12 28 L14 52 Z M70 40 L88 28 L86 52 Z" fill="#E2574C"/>` +
      `<ellipse cx="50" cy="40" rx="22" ry="15" fill="#E2574C"/>` +
      `<path d="M38 28 C36 36 36 44 38 52 M50 25 C48 34 48 46 50 55 M62 28 C60 36 60 44 62 52" fill="none" stroke="#FFFFFF" stroke-width="4"/>` +
      `<ellipse cx="50" cy="40" rx="22" ry="15" fill="none"/>` +
      `<path d="M50 70 L50 96" stroke-width="3.5"/><circle cx="50" cy="68" r="12" fill="#F7A8C4"/><path d="M50 68 m-6 0 a6 6 0 1 1 6 6 a3 3 0 1 1 -3 -3" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>` +
      `<path d="M22 72 L28 92 L16 92 Z" fill="#F5C531"/><path d="M19 84 L25 84" stroke="#FFFFFF" stroke-width="3"/><path d="M78 72 L84 92 L72 92 Z" fill="#F5C531"/><path d="M75 84 L81 84" stroke="#FFFFFF" stroke-width="3"/>`),
    '南瓜灯': svg(`<path d="M50 30 C26 26 12 40 14 60 C16 80 34 88 50 84 C66 88 84 80 86 60 C88 40 74 26 50 30 Z" fill="#F28C3A"/>` +
      `<path d="M50 31 C49 24 50 18 54 14" fill="none" stroke="#2F7A4D" stroke-width="5"/>` +
      `<path d="M28 52 L36 40 L44 52 Z M56 52 L64 40 L72 52 Z" fill="#F5C531"/>` +
      `<path d="M46 60 L50 54 L54 60 Z" fill="#F5C531"/>` +
      `<path d="M26 66 L34 74 L40 68 L46 76 L54 76 L60 68 L66 74 L74 66 C66 82 34 82 26 66 Z" fill="#F5C531"/>`),
    '月饼': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${mooncake(50, 52, 30)}</svg>`
  };
  // 放在有底色的小方块里（小知识的答案卡用）
  window.VOCAB_BOX = (zh, bg) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
    (bg ? `<rect x="3" y="3" width="94" height="94" rx="16" fill="${bg}"/>` : '') +
    window.VOCAB[zh].replace('<svg ', '<svg x="0" y="0" width="100" height="100" ') + `</svg>`;
})();
