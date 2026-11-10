/* =====================================================================
   海滩的图（Q 版、平涂、粗黑线）
   BART.kid({ kind, top, hat, glasses, item, itemColor })  海滩上的小朋友
     kind：'boy' / 'girl'；hat：帽子的颜色（没有就不给）；glasses：太阳眼镜；item：'球' '水桶' '游泳圈' '冰淇淋'
   BART.icon('球', '#E5483B')  东西的小图（提示用）
   ===================================================================== */
(function () {
  const INK = '#2B2B2B';
  const sw = (w = 3.5) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  // 拿在手上的东西（手在 86,172 和 114,172）
  const ITEM = {
    球: c => `<circle cx="100" cy="170" r="20" fill="#FFFFFF" ${sw()}/><path d="M100 150 Q86 170 100 190 Q114 170 100 150 Z" fill="${c}" ${sw(2.5)}/>` +
           `<path d="M81 164 Q100 172 119 164 L119 176 Q100 184 81 176 Z" fill="${c}" opacity=".55"/>`,
    水桶: c => `<path d="M86 156 Q100 136 114 156" fill="none" ${sw(3)}/><path d="M82 156 L118 156 L113 190 L87 190 Z" fill="${c}" ${sw()}/><path d="M84 166 L116 166" stroke="#FFFFFF" stroke-width="4"/>`,
    游泳圈: c => `<ellipse cx="100" cy="176" rx="40" ry="16" fill="${c}" ${sw()}/><ellipse cx="100" cy="176" rx="20" ry="7" fill="#F2DDB0" ${sw(3)}/>` +
           `<path d="M66 168 L74 184 M126 184 L134 168" stroke="#FFFFFF" stroke-width="7"/>`,
    冰淇淋: () => `<path d="M90 166 L110 166 L100 196 Z" fill="#E2B25A" ${sw()}/><path d="M93 172 L107 172 M95 179 L105 179" ${sw(1.5)}/><circle cx="100" cy="158" r="12" fill="#F49AC1" ${sw()}/>`
  };
  const HAT = c => `<path d="M40 60 Q100 44 160 60 Q150 70 100 66 Q50 70 40 60 Z" fill="${c}" ${sw()}/><path d="M64 60 Q66 30 100 28 Q134 30 136 60 Z" fill="${c}" ${sw()}/>` +
    `<path d="M66 52 Q100 46 134 52" fill="none" stroke="#FFFFFF" stroke-width="4"/>`;
  const GLASSES = `<rect x="70" y="76" width="26" height="16" rx="7" fill="${INK}"/><rect x="104" y="76" width="26" height="16" rx="7" fill="${INK}"/><path d="M96 82 L104 82" ${sw(3)}/>` +
    `<path d="M74 80 L80 80" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/><path d="M108 80 L114 80" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>`;
  function kid(o) {
    return window.NPC_ART.person({ kind: o.kind, top: o.top, hat: o.hat ? HAT(o.hat) : '', face: o.glasses ? GLASSES : '', holding: `<g transform="translate(100 174) scale(1.35) translate(-100 -174)">${ITEM[o.item](o.itemColor)}</g>` });   // 东西放大一点，比较看得清楚
  }
  function icon(item, c) {
    return `<svg viewBox="40 130 120 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${ITEM[item](c)}</svg>`;
  }
  // ---- 海滩找一找：沙滩上的东西（100 × 100）----
  const FIND = {
    // 贝壳：圆圆的扇形，上面一波一波，有放射的纹路，下面有两个小耳朵
    贝壳: `<path d="M34 80 L26 90 L42 88 Z M66 80 L74 90 L58 88 Z" fill="#F7B79A" ${sw(2.5)}/>` +
          `<path d="M50 88 L14 52 Q12 40 22 36 Q26 24 38 24 Q44 14 50 16 Q56 14 62 24 Q74 24 78 36 Q88 40 86 52 Z" fill="#F7B79A" ${sw()}/>` +
          `<path d="M50 88 L22 40 M50 88 L36 28 M50 88 L50 18 M50 88 L64 28 M50 88 L78 40" fill="none" stroke="#D98A6A" stroke-width="2.5" stroke-linecap="round"/>`,
    // 海星：五个角的星星，角是圆圆的（不尖），身上有小点点
    海星: (() => {
      const P = (r, deg) => { const t = (deg - 90) * Math.PI / 180; return [(50 + Math.cos(t) * r).toFixed(1), (54 + Math.sin(t) * r).toFixed(1)]; };
      let d = 'M' + P(19, -36).join(' ');
      for (let k = 0; k < 5; k++) { const c = P(66, k * 72), e = P(19, k * 72 + 36); d += ` Q${c[0]} ${c[1]} ${e[0]} ${e[1]}`; }
      const dots = [0, 72, 144, 216, 288].map(g => { const p = P(26, g); return `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="#FFE0B0"/>`; }).join('');
      return `<path d="${d} Z" fill="#F28C28" ${sw()}/>${dots}<circle cx="50" cy="54" r="4" fill="#FFE0B0"/>`;
    })(),
    螃蟹: `<ellipse cx="50" cy="60" rx="26" ry="18" fill="#E5483B" ${sw()}/><path d="M28 54 Q14 44 18 30 M72 54 Q86 44 82 30" fill="none" ${sw(4)}/><path d="M12 30 Q18 18 26 28 Q20 30 18 36 Z M88 30 Q82 18 74 28 Q80 30 82 36 Z" fill="#E5483B" ${sw(2.5)}/>` +
          `<path d="M30 70 L18 80 M36 74 L28 86 M70 70 L82 80 M64 74 L72 86" ${sw(3.5)}/><circle cx="42" cy="48" r="4" fill="#FFFFFF" ${sw(2)}/><circle cx="58" cy="48" r="4" fill="#FFFFFF" ${sw(2)}/><path d="M44 64 Q50 68 56 64" fill="none" ${sw(2)}/>`,
    沙堡: `<path d="M14 88 L14 52 L24 52 L24 44 L34 44 L34 52 L44 52 L44 30 L56 30 L56 52 L66 52 L66 44 L76 44 L76 52 L86 52 L86 88 Z" fill="#E8C77E" ${sw()}/><path d="M44 88 L44 72 Q50 64 56 72 L56 88" fill="#B08A50" ${sw(2.5)}/>` +
          `<path d="M50 30 L50 12" ${sw(2.5)}/><path d="M50 12 L64 17 L50 22 Z" fill="#E5483B" ${sw(2)}/>`,
    太阳伞: `<path d="M50 30 L50 92" ${sw(4)}/><path d="M10 46 Q50 0 90 46 Z" fill="#FFFFFF" ${sw()}/><path d="M30 46 Q38 16 50 13 Q42 22 42 46 Z M58 46 Q58 22 50 13 Q62 16 70 46 Z" fill="#E5483B" ${sw(2.5)}/>`,
    水桶: `<path d="M30 40 Q50 10 70 40" fill="none" ${sw(3.5)}/><path d="M24 40 L76 40 L68 90 L32 90 Z" fill="#3B78D8" ${sw()}/><path d="M27 54 L73 54" stroke="#FFFFFF" stroke-width="5"/>`
  };
  // ---- 课纲二年级 6 月的海滩词 ----
  Object.assign(FIND, {
    海滩伞: FIND.太阳伞,
    太阳眼镜: `<path d="M8 46 L22 44 M92 46 L78 44" ${sw(4)}/><path d="M44 48 Q50 42 56 48" fill="none" ${sw(4)}/>` +
          `<path d="M14 44 L46 44 Q46 66 30 66 Q14 66 14 44 Z M54 44 L86 44 Q86 66 70 66 Q54 66 54 44 Z" fill="#2E3A59" ${sw()}/>` +
          `<path d="M20 49 L28 49 M60 49 L68 49" stroke="#8FA8D8" stroke-width="4" stroke-linecap="round"/>`,
    拖鞋: `<path d="M22 20 Q8 20 8 44 Q8 72 16 86 Q22 94 32 88 Q40 72 38 44 Q38 20 22 20 Z" fill="#F5C531" ${sw()}/><path d="M12 46 Q22 30 23 24 Q24 30 35 46" fill="none" stroke="#3B78D8" stroke-width="5" stroke-linecap="round"/>` +
          `<path d="M70 14 Q56 14 56 38 Q56 66 64 80 Q70 88 80 82 Q88 66 86 38 Q86 14 70 14 Z" fill="#F5C531" ${sw()}/><path d="M60 40 Q70 24 71 18 Q72 24 83 40" fill="none" stroke="#3B78D8" stroke-width="5" stroke-linecap="round"/>`,
    毛巾: `<path d="M18 22 L82 22 L82 86 L18 86 Z" fill="#EC8FB3" ${sw()}/><path d="M18 34 L82 34 M18 74 L82 74" stroke="#FFFFFF" stroke-width="5"/>` +
          `<path d="M24 86 L24 94 M34 86 L34 94 M44 86 L44 94 M56 86 L56 94 M66 86 L66 94 M76 86 L76 94" ${sw(2.5)}/><path d="M18 22 L82 22 L82 30 L18 30 Z" fill="#D46E96" ${sw(2.5)}/>`,
    游泳衣: `<path d="M30 12 L36 12 L42 36 Q50 42 58 36 L64 12 L70 12 L72 46 Q76 62 80 78 Q64 70 50 88 Q36 70 20 78 Q24 62 28 46 Z" fill="#3BB3A8" ${sw()}/>` +
          `<circle cx="40" cy="56" r="4" fill="#FFFFFF"/><circle cx="60" cy="58" r="4" fill="#FFFFFF"/><circle cx="50" cy="70" r="4" fill="#FFFFFF"/>`,
    铲子: `<path d="M52 8 L48 8 L48 52" fill="none" ${sw(0)}/><rect x="44" y="8" width="12" height="46" rx="5" fill="#F28C28" ${sw()}/><rect x="36" y="6" width="28" height="10" rx="5" fill="#F28C28" ${sw()}/>` +
          `<path d="M28 54 L72 54 L70 78 Q50 98 30 78 Z" fill="#E5483B" ${sw()}/>`,
    防晒油: `<rect x="40" y="8" width="20" height="14" rx="3" fill="#FFFFFF" ${sw()}/><path d="M28 22 L72 22 Q78 22 78 30 L76 86 Q76 92 70 92 L30 92 Q24 92 24 86 L22 30 Q22 22 28 22 Z" fill="#F5C531" ${sw()}/>` +
          `<circle cx="50" cy="52" r="12" fill="#F28C28" ${sw(2.5)}/><path d="M50 34 L50 38 M50 66 L50 70 M32 52 L36 52 M64 52 L68 52" ${sw(2.5)}/><path d="M32 78 L68 78" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>`,
    冲浪板: `<path d="M50 4 Q74 30 66 70 Q60 96 50 96 Q40 96 34 70 Q26 30 50 4 Z" fill="#3B78D8" ${sw()}/><path d="M50 8 L50 94" stroke="#FFFFFF" stroke-width="5"/><path d="M38 40 Q50 50 62 40" fill="none" stroke="#F5C531" stroke-width="5" stroke-linecap="round"/>`
  });
  const findIcon = k => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${FIND[k]}</svg>`;

  window.BART = { find: findIcon, findList: Object.keys(FIND), kid, icon, items: Object.keys(ITEM), hat: c => `<svg viewBox="36 20 128 56" aria-hidden="true">${HAT(c)}</svg>`, glasses: `<svg viewBox="64 70 72 28" aria-hidden="true">${GLASSES}</svg>` };
})();
