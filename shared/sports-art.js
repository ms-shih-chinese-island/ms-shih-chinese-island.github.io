/* =====================================================================
   球类运动的图（Q 版、平涂、粗黑线），100 × 100。课纲四年级 4 月的 9 种球类运动。
   SPORTS_ART.svg('篮球')  → <svg>
   SPORTS_ART.g('篮球')    → 只有图形（拿在手上用：<g transform=…>）
   ===================================================================== */
(function () {
  const INK = '#2B2B2B';
  const sw = (w = 4) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const A = {
    // 棒球：白色、红色的缝线
    棒球: `<circle cx="50" cy="50" r="38" fill="#FFFFFF" ${sw()}/><path d="M30 20 Q44 50 30 80 M70 20 Q56 50 70 80" fill="none" stroke="#E5483B" stroke-width="3.5"/>` +
      [26, 36, 46, 56, 66, 74].map(y => `<path d="M${33 + Math.abs(50 - y) * .15 - 4} ${y} l7 -3 M${67 - Math.abs(50 - y) * .15 - 3} ${y} l7 3" stroke="#E5483B" stroke-width="2.5" stroke-linecap="round"/>`).join(''),
    // 篮球：橘色、黑线
    篮球: `<circle cx="50" cy="50" r="38" fill="#F28C28" ${sw()}/><path d="M12 50 L88 50 M50 12 L50 88 M24 22 Q42 50 24 78 M76 22 Q58 50 76 78" fill="none" ${sw(3)}/>`,
    // 橄榄球：咖啡色的椭圆、白色的缝线
    橄榄球: `<path d="M10 50 Q50 6 90 50 Q50 94 10 50 Z" fill="#8A4B22" ${sw()}/><path d="M34 50 L66 50" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>` +
      [40, 47, 54, 61].map(x => `<path d="M${x} 44 L${x} 56" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`).join('') + `<path d="M22 36 Q18 50 22 64 M78 36 Q82 50 78 64" fill="none" stroke="#FFFFFF" stroke-width="3"/>`,
    // 排球：白色的球，三组弯弯的条纹（上面黄色、左下蓝色、右下白色）
    排球: `<defs><clipPath id="vbc"><circle cx="50" cy="50" r="38"/></clipPath></defs><circle cx="50" cy="50" r="38" fill="#FFFFFF"/>` +
      `<g clip-path="url(#vbc)">` +
      `<path d="M8 38 Q50 18 92 34" fill="none" stroke="#F5C531" stroke-width="13"/>` +
      `<path d="M34 50 Q24 72 34 96" fill="none" stroke="#3B78D8" stroke-width="13"/>` +
      `<path d="M8 31 Q50 11 92 27 M8 45 Q50 25 92 41 M8 55 Q50 38 92 52" fill="none" stroke="${INK}" stroke-width="3"/>` +
      `<path d="M27 50 Q17 72 27 96 M41 50 Q31 72 41 96 M52 52 Q44 72 54 96" fill="none" stroke="${INK}" stroke-width="3"/>` +
      `<path d="M52 66 Q72 60 96 70 M54 80 Q74 74 96 84" fill="none" stroke="${INK}" stroke-width="3"/></g>` +
      `<circle cx="50" cy="50" r="38" fill="none" ${sw()}/>`,
    // 足球：白色、黑色的五边形
    足球: `<circle cx="50" cy="50" r="38" fill="#FFFFFF" ${sw()}/><path d="M50 36 L63 45 L58 60 L42 60 L37 45 Z" fill="${INK}"/>` +
      `<path d="M50 12 L50 36 M63 45 L84 38 M58 60 L70 80 M42 60 L30 80 M37 45 L16 38" ${sw(3)}/><path d="M38 14 L50 20 L62 14 M84 30 L88 46 M80 70 L66 86 M34 86 L20 70 M12 46 L16 30" fill="none" ${sw(3)}/>`,
    // 乒乓球：红色的球拍、小小的白球
    乒乓球: `<path d="M58 64 L82 90" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><path d="M58 64 L82 90" stroke="#C98E62" stroke-width="8" stroke-linecap="round"/>` +
      `<circle cx="42" cy="44" r="30" fill="#E5483B" ${sw()}/><circle cx="80" cy="24" r="10" fill="#FFFFFF" ${sw(3)}/>`,
    // 网球：黄绿色的球、白色弯线，加一个球拍
    网球: `<ellipse cx="34" cy="38" rx="24" ry="30" fill="none" ${sw(5)} transform="rotate(-30 34 38)"/><path d="M48 60 L60 90" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M48 60 L60 90" stroke="#3B78D8" stroke-width="6" stroke-linecap="round"/>` +
      `<path d="M18 22 L50 54 M12 36 L40 64 M26 14 L56 44 M14 50 L46 18 M24 60 L54 30" stroke="#BDBDBD" stroke-width="2"/>` +
      `<circle cx="72" cy="66" r="18" fill="#D8E84A" ${sw()}/><path d="M58 56 Q72 66 62 80 M86 56 Q74 66 84 78" fill="none" stroke="#FFFFFF" stroke-width="3"/>`,
    // 冰球：黑色的冰球、冰球杆
    冰球: `<path d="M24 10 L46 70 Q48 78 58 78 L84 78" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 10 L46 70 Q48 78 58 78 L84 78" fill="none" stroke="#C98E62" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="M62 78 L84 78" stroke="#FFFFFF" stroke-width="4"/><ellipse cx="30" cy="80" rx="16" ry="7" fill="${INK}"/><rect x="14" y="72" width="32" height="8" fill="${INK}"/><ellipse cx="30" cy="72" rx="16" ry="7" fill="#555555" ${sw(2)}/>`,
    // 保龄球：蓝色的球（三个洞）、白色的球瓶
    保龄球: `<path d="M74 12 Q66 12 66 24 Q66 32 70 38 Q60 50 62 70 Q64 88 74 90 Q84 88 86 70 Q88 50 78 38 Q82 32 82 24 Q82 12 74 12 Z" fill="#FFFFFF" ${sw()}/><path d="M68 32 L80 32" stroke="#E5483B" stroke-width="4"/>` +
      `<circle cx="38" cy="62" r="28" fill="#3B78D8" ${sw()}/><circle cx="30" cy="54" r="4" fill="${INK}"/><circle cx="40" cy="50" r="4" fill="${INK}"/><circle cx="36" cy="64" r="4.5" fill="${INK}"/>`
  };
  window.SPORTS_ART = {
    names: Object.keys(A),
    g: k => A[k],
    svg: k => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${A[k]}</svg>`
  };
})();
