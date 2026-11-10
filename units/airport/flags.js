/* =====================================================================
   国旗的图（涂国旗用）：300 × 200，每一面国旗分成几「格」，每一格要涂一个颜色
   FLAGS[国家] = { py, en, simple（Level 1 用）, parts: [{ c: 颜色, d: 形状（svg）, x, y（Level 1 写颜色字的位置） }], deco（不用涂的图，例如美国的星星）, decoAfter（第几格涂好才出现 deco） }
   颜色：红色、白色、蓝色、黄色、绿色、黑色
   画得简单一点（Q 版），不是真的比例
   ===================================================================== */
(function () {
  const R = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`;
  const star = (cx, cy, r, rot = 0) => { let d = ''; for (let i = 0; i < 10; i++) { const a = (rot - 90 + i * 36) * Math.PI / 180, rr = i % 2 ? r * .42 : r; d += (i ? 'L' : 'M') + (cx + Math.cos(a) * rr).toFixed(1) + ' ' + (cy + Math.sin(a) * rr).toFixed(1) + ' '; } return `<path d="${d}Z"/>`; };
  const stripes = (from) => Array.from({ length: 13 }, (_, i) => i % 2 === from ? R(0, i * 200 / 13, 300, 200 / 13 + .4) : '').join('');
  // 英国国旗的白色、红色（澳大利亚左上角也用，缩小一半）
  const UK_WHITE = '<path d="M0 0 L30 0 L300 180 L300 200 L270 200 L0 20 Z M300 0 L300 20 L30 200 L0 200 L0 180 L270 0 Z"/>' + R(125, 0, 50, 200) + R(0, 75, 300, 50);
  const UK_RED = R(137, 0, 26, 200) + R(0, 87, 300, 26);
  const FLAGS = {
    日本: { py: 'rì běn', en: 'Japan', simple: true, parts: [
      { c: '白色', d: R(0, 0, 300, 200), x: 40, y: 30 },
      { c: '红色', d: '<circle cx="150" cy="100" r="58"/>', x: 150, y: 100 } ] },
    法国: { py: 'fǎ guó', en: 'France', simple: true, parts: [
      { c: '蓝色', d: R(0, 0, 100, 200), x: 50, y: 100 }, { c: '白色', d: R(100, 0, 100, 200), x: 150, y: 100 }, { c: '红色', d: R(200, 0, 100, 200), x: 250, y: 100 } ] },
    意大利: { py: 'yì dà lì', en: 'Italy', simple: true, parts: [
      { c: '绿色', d: R(0, 0, 100, 200), x: 50, y: 100 }, { c: '白色', d: R(100, 0, 100, 200), x: 150, y: 100 }, { c: '红色', d: R(200, 0, 100, 200), x: 250, y: 100 } ] },
    德国: { py: 'dé guó', en: 'Germany', simple: true, parts: [
      { c: '黑色', d: R(0, 0, 300, 66.7), x: 150, y: 33 }, { c: '红色', d: R(0, 66.7, 300, 66.7), x: 150, y: 100 }, { c: '黄色', d: R(0, 133.3, 300, 66.7), x: 150, y: 167 } ] },
    俄罗斯: { py: 'é luó sī', en: 'Russia', simple: true, parts: [
      { c: '白色', d: R(0, 0, 300, 66.7), x: 150, y: 33 }, { c: '蓝色', d: R(0, 66.7, 300, 66.7), x: 150, y: 100 }, { c: '红色', d: R(0, 133.3, 300, 66.7), x: 150, y: 167 } ] },
    中国: { py: 'zhōng guó', en: 'China', parts: [
      { c: '红色', d: R(0, 0, 300, 200) },
      { c: '黄色', d: star(50, 50, 30) + star(100, 20, 10, 20) + star(120, 40, 10, 45) + star(120, 70, 10, 0) + star(100, 90, 10, 20) } ] },
    台湾: { py: 'tái wān', en: 'Taiwan', parts: [
      { c: '红色', d: R(0, 0, 300, 200) },
      { c: '蓝色', d: R(0, 0, 150, 100) },
      { c: '白色', d: (() => { let d = ''; for (let i = 0; i < 24; i++) { const a = (i * 15 - 90) * Math.PI / 180, r = i % 2 ? 22 : 38; d += (i ? 'L' : 'M') + (75 + Math.cos(a) * r).toFixed(1) + ' ' + (50 + Math.sin(a) * r).toFixed(1) + ' '; } return `<path d="${d}Z"/>`; })() } ],
      deco: '<circle cx="75" cy="50" r="18" fill="#2F55B4" stroke="#2B2B2B" stroke-width="1.5"/><circle cx="75" cy="50" r="14" fill="#FFFFFF" stroke="#2B2B2B" stroke-width="1.5"/>', decoAfter: 2 },
    美国: { py: 'měi guó', en: 'USA', parts: [
      { c: '红色', d: stripes(0) }, { c: '白色', d: stripes(1) },
      { c: '蓝色', d: R(0, 0, 130, 107.7) } ],
      deco: Array.from({ length: 20 }, (_, i) => `<circle cx="${14 + (i % 5) * 25}" cy="${14 + Math.floor(i / 5) * 26}" r="4" fill="#FFFFFF" stroke="#2B2B2B" stroke-width="1"/>`).join(''), decoAfter: 2 },
    加拿大: { py: 'jiā ná dà', en: 'Canada', parts: [
      { c: '红色', d: R(0, 0, 75, 200) + R(225, 0, 75, 200) }, { c: '白色', d: R(75, 0, 150, 200) },
      { c: '红色', d: '<path d="M150 36 L160 62 L176 54 L170 88 L194 80 L188 98 L204 104 L170 126 L176 140 L154 136 L154 168 L146 168 L146 136 L124 140 L130 126 L96 104 L112 98 L106 80 L130 88 L124 54 L140 62 Z"/>' } ] },
    韩国: { py: 'hán guó', en: 'South Korea', parts: [
      { c: '白色', d: R(0, 0, 300, 200) },
      { c: '红色', d: '<path d="M100 100 A50 50 0 0 1 200 100 A25 25 0 0 1 150 100 A25 25 0 0 0 100 100 Z"/>' },
      { c: '蓝色', d: '<path d="M100 100 A25 25 0 0 1 150 100 A25 25 0 0 0 200 100 A50 50 0 0 1 100 100 Z"/>' },
      { c: '黑色', d: [[52, 44, -34], [248, 44, 34], [52, 156, 34], [248, 156, -34]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})">${R(-20, -14, 40, 6)}${R(-20, -3, 40, 6)}${R(-20, 8, 40, 6)}</g>`).join('') } ] },
    英国: { py: 'yīng guó', en: 'UK', parts: [
      { c: '蓝色', d: R(0, 0, 300, 200) },
      { c: '白色', d: UK_WHITE },
      { c: '红色', d: UK_RED } ] },
    // 墨西哥：跟意大利很像，中间有老鹰（不用涂，涂好白色就会出现）
    墨西哥: { py: 'mò xī gē', en: 'Mexico', parts: [
      { c: '绿色', d: R(0, 0, 100, 200) }, { c: '白色', d: R(100, 0, 100, 200) }, { c: '红色', d: R(200, 0, 100, 200) } ],
      deco: '<path d="M126 118 Q150 140 174 118" fill="none" stroke="#2E9E57" stroke-width="5" stroke-linecap="round"/>' +
            '<path d="M134 112 Q132 84 150 78 Q166 74 170 92 Q160 88 156 96 L164 112 Z" fill="#8A5A2B" stroke="#2B2B2B" stroke-width="2" stroke-linejoin="round"/>' +
            '<circle cx="160" cy="82" r="2" fill="#2B2B2B"/><path d="M140 122 L160 122" stroke="#5B9BD5" stroke-width="4" stroke-linecap="round"/>', decoAfter: 1 },
    // 澳大利亚：蓝底，左上角小小的英国国旗，白色星星
    澳大利亚: { py: 'ào dà lì yà', en: 'Australia', parts: [
      { c: '蓝色', d: R(0, 0, 300, 200) },
      { c: '白色', d: `<g transform="scale(.5)">${UK_WHITE}</g>` + star(75, 152, 22) + star(230, 40, 11) + star(196, 92, 11) + star(262, 84, 11) + star(232, 160, 12) + star(248, 116, 6) },
      { c: '红色', d: `<g transform="scale(.5)">${UK_RED}</g>` } ] }
  };
  const HEX = { 红色: '#E5483B', 白色: '#FFFFFF', 蓝色: '#2F55B4', 黄色: '#F5C531', 绿色: '#2E9E57', 黑色: '#2B2B2B' };
  const EN = { 红色: 'red', 白色: 'white', 蓝色: 'blue', 黄色: 'yellow', 绿色: 'green', 黑色: 'black' };
  // 还没涂的格子：灰色加斜线（不会以为已经是白色）
  const EMPTY = 'url(#todo)';
  const TODO = '<defs><pattern id="todo" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="12" height="12" fill="#C9CFD6"/><rect width="5" height="12" fill="#B6BDC6"/></pattern></defs>';
  // 画国旗：filled = 已经涂好的格子（index 的 Set）；all = 全部涂好（参考图）
  function svg(name, opts = {}) {
    const F = FLAGS[name];
    const parts = F.parts.map((p, i) => {
      const on = opts.all || (opts.filled && opts.filled.has(i));
      return `<g class="part" data-i="${i}" fill="${on ? HEX[p.c] : EMPTY}" stroke="#2B2B2B" stroke-width="2.5" stroke-linejoin="round">${p.d}</g>`;
    }).join('');
    const labels = opts.labels ? F.parts.map((p, i) => p.x == null || (opts.filled && opts.filled.has(i)) ? '' :
      `<text class="lbl" x="${p.x}" y="${p.y + 7}" text-anchor="middle" font-size="22" font-weight="800" font-family="Fredoka, sans-serif" fill="#2B2B2B" stroke="#FFFFFF" stroke-width="5" paint-order="stroke" pointer-events="none">${EN[p.c]}</text>`).join('') : '';   // Level 1：格子里用英文写颜色
    return `<svg viewBox="-4 -4 308 208" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${TODO}${parts}${F.deco && (opts.all || (opts.filled && opts.filled.has(F.decoAfter))) ? F.deco : ''}<rect x="0" y="0" width="300" height="200" fill="none" stroke="#2B2B2B" stroke-width="5"/>${labels}</svg>`;
  }
  window.FLAGS = { list: Object.keys(FLAGS), info: n => FLAGS[n], svg, HEX };
})();
