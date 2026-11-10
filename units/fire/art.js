/* =====================================================================
   消防局的图（Q 版、平涂、粗黑线）
   FART.man(worn)        消防员（worn = 已经穿好的装备，例如 ['帽子','外套']）→ <svg>
   FART.icon('帽子')      一样装备的小图（正方形）→ <svg>
   装备：帽子、面罩、手套（戴）；外套、裤子、靴子（穿）。干扰：运动鞋、短裤
   ===================================================================== */
(function () {
  const INK = '#2B2B2B', SKIN = '#F4CDAE', CHEEK = '#F29BA6';
  const TAN = '#E2B25A', TAN2 = '#C9963F', REF = '#F5E663', SIL = '#D9DEE3', RED = '#E5483B';
  const sw = (w = 3.5) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const stripe = (d, w = 7) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 4}" stroke-linecap="butt"/><path d="${d}" fill="none" stroke="${REF}" stroke-width="${w}" stroke-linecap="butt"/>`;

  // 一只手套（cx = 手的位置，d = 大拇指朝哪一边）
  const glove = (cx, d) => `<rect x="${cx - 13}" y="188" width="26" height="12" rx="3" fill="${REF}" ${sw(3)}/>` +
    `<path d="M${cx - 14} 200 L${cx + 14} 200 L${cx + 15} 214 Q${cx} 228 ${cx - 15} 214 Z" fill="#8A5A2B" ${sw()}/>` +
    `<path d="M${cx + d * 13} 204 Q${cx + d * 24} 202 ${cx + d * 20} 212 L${cx + d * 13} 212" fill="#8A5A2B" ${sw(3)}/>`;
  // ---- 每一样装备穿在身上的样子（消防员图 200 × 300）----
  const ON = {
    裤子: `<path d="M60 192 L62 272 L96 272 L100 216 L104 272 L138 272 L140 192 Z" fill="${TAN}" ${sw()}/>` +
          stripe('M62 252 L96 252 M104 252 L138 252'),
    靴子: `<path d="M64 258 L64 288 L100 288 L100 278 Q100 270 92 268 L96 258 Z" fill="${INK}" ${sw()}/>` +
          `<path d="M136 258 L136 288 L100 288 L100 278 Q100 270 108 268 L104 258 Z" fill="${INK}" ${sw()}/>` +
          `<path d="M66 280 L98 280 M134 280 L102 280" stroke="${REF}" stroke-width="4"/>`,
    外套: `<path d="M60 128 Q62 112 84 108 L116 108 Q138 112 140 128 L140 212 Q100 220 60 212 Z" fill="${TAN}" ${sw()}/>` +
          `<path d="M60 130 L38 196 L54 202 L68 160 Z M140 130 L162 196 L146 202 L132 160 Z" fill="${TAN}" ${sw()}/>` +
          stripe('M61 178 L139 178') + stripe('M61 204 L139 204') + stripe('M40 188 L56 194 M160 188 L144 194', 6) +
          `<path d="M100 112 L100 212" ${sw(3)}/><path d="M84 108 L100 124 L116 108" fill="${TAN2}" ${sw(3)}/>`,
    手套: glove(46, -1) + glove(154, 1),
    面罩: `<path d="M68 56 Q100 44 132 56 L130 92 Q100 112 70 92 Z" fill="rgba(170,215,240,.55)" ${sw()}/>` +
          `<circle cx="100" cy="98" r="10" fill="#5A5F66" ${sw(3)}/><path d="M94 98 L106 98" stroke="#BFC5CC" stroke-width="2"/>` +
          `<path d="M76 62 Q86 58 90 66" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity=".8"/>`,
    帽子: `<path d="M50 50 Q52 8 100 6 Q148 8 150 50 Z" fill="${RED}" ${sw()}/>` +
          `<path d="M42 50 Q100 40 166 54 Q172 62 160 62 Q100 54 42 58 Z" fill="${RED}" ${sw()}/>` +
          `<path d="M100 8 L100 46" stroke="#B23B3B" stroke-width="6"/><path d="M100 8 L100 46" fill="none" ${sw(2)}/>` +
          `<path d="M86 22 L114 22 L112 44 L100 50 L88 44 Z" fill="${REF}" ${sw(3)}/>`
  };
  const ORDER = ['裤子', '靴子', '外套', '手套', '面罩', '帽子'];

  // 没穿装备的消防员：白色 T 恤、蓝色短裤、光脚
  function man(worn, face) {
    const has = k => worn.includes(k);
    let g = '';
    // 腿、脚
    g += `<path d="M76 222 L76 280 M124 222 L124 280" stroke="${INK}" stroke-width="20" stroke-linecap="round"/><path d="M76 222 L76 280 M124 222 L124 280" stroke="${SKIN}" stroke-width="13" stroke-linecap="round"/>`;
    g += `<ellipse cx="72" cy="284" rx="13" ry="7" fill="${SKIN}" ${sw(3)}/><ellipse cx="128" cy="284" rx="13" ry="7" fill="${SKIN}" ${sw(3)}/>`;
    g += `<path d="M64 194 L62 230 L96 230 L100 214 L104 230 L138 230 L136 194 Z" fill="#3B78D8" ${sw()}/>`;
    if (has('裤子')) g += ON['裤子'];
    if (has('靴子')) g += ON['靴子'];
    // 手臂（光手臂）、身体（白色 T 恤）
    g += `<path d="M66 128 L46 200 M134 128 L154 200" stroke="${INK}" stroke-width="18" stroke-linecap="round"/><path d="M66 128 L46 200 M134 128 L154 200" stroke="${SKIN}" stroke-width="11" stroke-linecap="round"/>`;
    g += `<path d="M64 128 Q66 112 86 108 L114 108 Q134 112 136 128 L136 200 Q100 206 64 200 Z" fill="#FFFFFF" ${sw()}/>`;
    g += `<path d="M64 128 L56 152 L70 156 Z M136 128 L144 152 L130 156 Z" fill="#FFFFFF" ${sw(3)}/>`;
    g += `<circle cx="46" cy="204" r="10" fill="${SKIN}" ${sw(3)}/><circle cx="154" cy="204" r="10" fill="${SKIN}" ${sw(3)}/>`;
    if (has('外套')) g += ON['外套'];
    if (has('手套')) g += ON['手套'];
    // 头
    g += `<rect x="90" y="96" width="20" height="16" fill="${SKIN}" ${sw(3)}/>`;
    g += `<circle cx="100" cy="66" r="38" fill="${SKIN}" ${sw()}/>`;
    if (!has('帽子')) g += `<path d="M62 62 Q60 26 100 26 Q140 26 138 62 Q128 42 100 44 Q74 42 62 62 Z" fill="#3A2A1E" ${sw(3)}/>`;
    g += `<circle cx="86" cy="70" r="4.5" fill="${INK}"/><circle cx="114" cy="70" r="4.5" fill="${INK}"/>`;
    g += `<circle cx="78" cy="82" r="6" fill="${CHEEK}" opacity=".7"/><circle cx="122" cy="82" r="6" fill="${CHEEK}" opacity=".7"/>`;
    g += face === 'great' ? `<path d="M88 84 Q100 98 112 84 Z" fill="#B23B3B" ${sw(3)}/>` : `<path d="M90 86 Q100 92 110 86" fill="none" ${sw(3)}/>`;
    if (has('面罩')) g += ON['面罩'];
    if (has('帽子')) g += ON['帽子'];
    return `<svg viewBox="20 0 160 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${g}</svg>`;
  }

  // ---- 小图（100 × 100）----
  const ICON = {
    帽子: ['30 0 140 70', ON['帽子']],
    面罩: ['56 36 88 80', ON['面罩']],
    手套: ['0 0 100 100', `<g transform="translate(-2 -168) scale(1)">${glove(32, -1) + glove(70, 1)}</g>`],
    外套: ['30 100 140 110', ON['外套']],
    裤子: ['56 188 88 92', ON['裤子']],
    靴子: ['0 0 100 100', `<path d="M8 14 L32 14 L32 62 Q50 64 50 76 L50 84 L8 84 Z" fill="${INK}" ${sw()}/><path d="M10 72 L48 72" stroke="${REF}" stroke-width="5"/><path d="M8 14 L32 14 L32 22 L8 22 Z" fill="${TAN2}" ${sw(2.5)}/><path d="M52 14 L76 14 L76 62 Q94 64 94 76 L94 84 L52 84 Z" fill="${INK}" ${sw()}/><path d="M54 72 L92 72" stroke="${REF}" stroke-width="5"/><path d="M52 14 L76 14 L76 22 L52 22 Z" fill="${TAN2}" ${sw(2.5)}/>`],
    运动鞋: ['0 0 100 100', `<path d="M10 70 L12 46 Q30 44 40 34 L56 40 Q62 54 80 58 Q92 60 92 72 L92 76 L10 76 Z" fill="#FFFFFF" ${sw()}/>` +
            `<path d="M10 76 L92 76 L92 82 Q92 86 86 86 L14 86 Q10 86 10 82 Z" fill="#3B78D8" ${sw(3)}/><path d="M42 44 L50 50 M38 50 L46 56" ${sw(3)}/><path d="M60 66 Q72 60 84 66" fill="none" stroke="${RED}" stroke-width="4"/>`],
    短裤: ['0 0 100 100', `<path d="M18 22 L82 22 L88 76 L58 76 L50 44 L42 76 L12 76 Z" fill="#3B78D8" ${sw()}/><path d="M18 30 L82 30" ${sw(3)}/><path d="M50 22 L50 40" ${sw(2.5)}/>`]
  };
  function icon(k) {
    const [vb, g] = ICON[k], [x, y, w, h] = vb.split(' ').map(Number), s = Math.max(w, h);
    // 放成正方形，置中
    return `<svg viewBox="${x - (s - w) / 2} ${y - (s - h) / 2} ${s} ${s}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${g}</svg>`;
  }

  // ---- 去灭火 ----
  // 火（100 × 100）
  const flame = () => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
    `<path d="M50 6 Q62 30 74 34 Q70 22 78 16 Q94 44 90 66 Q86 94 50 96 Q14 94 10 66 Q8 44 26 30 Q28 44 36 46 Q34 22 50 6 Z" fill="#F28C28" ${sw()}/>` +
    `<path d="M50 40 Q60 56 66 58 Q72 70 68 80 Q62 92 50 92 Q36 92 32 80 Q30 66 40 60 Q42 66 46 66 Q44 52 50 40 Z" fill="#F5C531" ${sw(3)}/></svg>`;
  // 水桶（100 × 100）
  const bucket = () => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
    `<path d="M24 34 Q50 4 76 34" fill="none" ${sw(4)}/><path d="M18 34 L82 34 L74 90 Q50 96 26 90 Z" fill="${RED}" ${sw()}/>` +
    `<ellipse cx="50" cy="34" rx="32" ry="8" fill="#7FC4E8" ${sw(3)}/><path d="M24 56 L76 56" stroke="${REF}" stroke-width="6"/></svg>`;
  // 消防车（200 × 100，云梯另外画）
  const truck = () => `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
    `<rect x="10" y="30" width="130" height="50" rx="6" fill="${RED}" ${sw()}/><path d="M140 40 L170 40 L190 60 L190 80 L140 80 Z" fill="${RED}" ${sw()}/>` +
    `<path d="M148 46 L166 46 L180 60 L148 60 Z" fill="#BFE3EE" ${sw(3)}/><path d="M14 62 L138 62" stroke="${REF}" stroke-width="6"/>` +
    `<rect x="60" y="20" width="40" height="12" rx="3" fill="${SIL}" ${sw(3)}/><rect x="150" y="32" width="14" height="8" rx="2" fill="#4A86D0" ${sw(2)}/>` +
    `<circle cx="45" cy="84" r="13" fill="${INK}"/><circle cx="45" cy="84" r="5" fill="${SIL}"/><circle cx="160" cy="84" r="13" fill="${INK}"/><circle cx="160" cy="84" r="5" fill="${SIL}"/></svg>`;

  window.FART = { man, icon, order: ORDER, flame, bucket, truck };
})();
