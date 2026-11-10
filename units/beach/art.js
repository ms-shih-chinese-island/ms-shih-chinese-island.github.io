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
  window.BART = { kid, icon, items: Object.keys(ITEM), hat: c => `<svg viewBox="36 20 128 56" aria-hidden="true">${HAT(c)}</svg>`, glasses: `<svg viewBox="64 70 72 28" aria-hidden="true">${GLASSES}</svg>` };
})();
