/* =====================================================================
   万圣节的图（鬼屋的游戏用）
   - ART.items['南瓜'] 是东西的图
   - ART.costumes['巫婆'] 是装扮好的 Q 版小朋友（化妆舞会用）
   - ART.kid('scared' | 'happy') 是害怕 / 不怕的小朋友（我怕／我不怕用）
   每张图都是 100 x 100 的 SVG。一般不需要改这个档案。
   ===================================================================== */
(function () {
  const K = '#2B2B2B';
  const svg = (inner, vb) => `<svg viewBox="${vb || '0 0 100 100'}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="${K}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${inner}</g></svg>`;

  // ---------- things ----------
  const pumpkinBody = (fill) =>
    `<path d="M50 30 C26 26 12 40 14 60 C16 80 34 88 50 84 C66 88 84 80 86 60 C88 40 74 26 50 30 Z" fill="${fill}"/>` +
    `<path d="M50 31 C40 40 38 74 50 84 M50 31 C60 40 62 74 50 84" fill="none"/>` +
    `<path d="M32 33 C24 44 24 72 34 82 M68 33 C76 44 76 72 66 82" fill="none" stroke-width="2.5"/>`;
  const items = {
    '南瓜': svg(pumpkinBody('#F28C3A') +
      `<path d="M50 31 C49 24 50 18 54 14" fill="none" stroke="#2F7A4D" stroke-width="5"/>` +
      `<path d="M54 18 C62 12 72 14 74 20 C66 24 58 24 54 18 Z" fill="#8CC7A0"/>`),
    '南瓜灯': svg(`<path d="M50 30 C26 26 12 40 14 60 C16 80 34 88 50 84 C66 88 84 80 86 60 C88 40 74 26 50 30 Z" fill="#F28C3A"/>` +
      `<path d="M50 31 C49 24 50 18 54 14" fill="none" stroke="#2F7A4D" stroke-width="5"/>` +
      `<path d="M28 52 L36 40 L44 52 Z M56 52 L64 40 L72 52 Z" fill="#F5C531"/>` +
      `<path d="M46 60 L50 54 L54 60 Z" fill="#F5C531"/>` +
      `<path d="M26 66 L34 74 L40 68 L46 76 L54 76 L60 68 L66 74 L74 66 C66 82 34 82 26 66 Z" fill="#F5C531"/>`),
    '蝙蝠': svg(`<path d="M50 40 C42 30 30 30 22 36 C14 30 8 34 4 42 C12 42 14 48 12 54 C20 50 26 54 28 60 C34 54 42 54 50 60 C58 54 66 54 72 60 C74 54 80 50 88 54 C86 48 88 42 96 42 C92 34 86 30 78 36 C70 30 58 30 50 40 Z" fill="#6B5A9C"/>` +
      `<path d="M42 38 L40 28 L46 34 M58 38 L60 28 L54 34" fill="#6B5A9C"/>` +
      `<circle cx="45" cy="44" r="4.5" fill="#FFFFFF" stroke-width="2"/><circle cx="55" cy="44" r="4.5" fill="#FFFFFF" stroke-width="2"/>` +
      `<circle cx="45" cy="44" r="1.8" fill="${K}" stroke="none"/><circle cx="55" cy="44" r="1.8" fill="${K}" stroke="none"/>` +
      `<path d="M46 52 L48 55 L50 52 L52 55 L54 52" fill="#FFFFFF" stroke-width="2"/>`),
    '巫婆': svg(`<path d="M26 54 C26 80 74 80 74 54" fill="#9B6BC9"/>` +
      `<circle cx="50" cy="58" r="20" fill="#FBD7B8"/>` +
      `<path d="M30 52 C30 66 28 76 24 82 M70 52 C70 66 72 76 76 82" fill="none" stroke="#7A4FB0" stroke-width="7"/>` +
      `<path d="M14 46 C30 42 70 42 86 46 C80 52 20 52 14 46 Z" fill="#5E4B8B"/>` +
      `<path d="M30 45 L46 10 C50 6 58 12 60 18 L70 45 Z" fill="#5E4B8B"/>` +
      `<path d="M32 40 L68 40 L69 45 L31 45 Z" fill="#F28C3A" stroke-width="2"/><rect x="45" y="38" width="10" height="9" fill="#F5C531" stroke-width="2"/>` +
      `<circle cx="43" cy="58" r="2.5" fill="${K}" stroke="none"/><circle cx="57" cy="58" r="2.5" fill="${K}" stroke="none"/>` +
      `<path d="M50 60 L47 66 L51 66" fill="none" stroke-width="2"/><path d="M44 71 Q50 75 56 71" fill="none" stroke-width="2.5"/>` +
      `<circle cx="37" cy="66" r="3" fill="#F7A8C4" stroke="none"/><circle cx="63" cy="66" r="3" fill="#F7A8C4" stroke="none"/>`),
    '鬼': svg(`<path d="M24 86 L24 44 C24 22 76 22 76 44 L76 86 L68 80 L60 88 L50 80 L40 88 L32 80 Z" fill="#FFFFFF"/>` +
      `<ellipse cx="41" cy="48" rx="4.5" ry="6" fill="${K}" stroke="none"/><ellipse cx="59" cy="48" rx="4.5" ry="6" fill="${K}" stroke="none"/>` +
      `<ellipse cx="50" cy="62" rx="5" ry="6.5" fill="${K}" stroke="none"/>` +
      `<circle cx="33" cy="57" r="3.5" fill="#F7A8C4" stroke="none"/><circle cx="67" cy="57" r="3.5" fill="#F7A8C4" stroke="none"/>`),
    '黑猫': svg(`<path d="M66 84 C84 84 88 66 80 58" fill="none" stroke="${K}" stroke-width="7"/>` +
      `<path d="M30 86 C26 70 32 56 40 52 L60 52 C68 56 74 70 70 86 Z" fill="#3A3A42"/>` +
      `<path d="M32 46 C32 30 68 30 68 46 C68 58 32 58 32 46 Z" fill="#3A3A42"/>` +
      `<path d="M34 36 L32 20 L44 31 M66 36 L68 20 L56 31" fill="#3A3A42"/>` +
      `<ellipse cx="43" cy="44" rx="4" ry="5" fill="#F5C531" stroke-width="2"/><ellipse cx="57" cy="44" rx="4" ry="5" fill="#F5C531" stroke-width="2"/>` +
      `<path d="M43 41 L43 47 M57 41 L57 47" stroke-width="2"/>` +
      `<path d="M48 50 L50 52 L52 50" fill="none" stroke="#F7A8C4" stroke-width="2"/>` +
      `<path d="M30 49 L20 47 M30 52 L20 54 M70 49 L80 47 M70 52 L80 54" stroke-width="1.5"/>`),
    '蜘蛛': svg(`<path d="M50 4 L50 40" stroke-width="2"/>` +
      `<path d="M38 52 C28 44 20 44 14 50 M38 58 C28 56 18 60 14 68 M40 64 C32 66 26 74 24 82 M42 68 C38 74 36 82 38 90 M62 52 C72 44 80 44 86 50 M62 58 C72 56 82 60 86 68 M60 64 C68 66 74 74 76 82 M58 68 C62 74 64 82 62 90" fill="none" stroke-width="3"/>` +
      `<ellipse cx="50" cy="62" rx="14" ry="16" fill="#4A4A55"/><circle cx="50" cy="44" r="9" fill="#4A4A55"/>` +
      `<circle cx="46" cy="43" r="3" fill="#FFFFFF" stroke-width="1.5"/><circle cx="54" cy="43" r="3" fill="#FFFFFF" stroke-width="1.5"/>` +
      `<circle cx="46" cy="43" r="1.2" fill="${K}" stroke="none"/><circle cx="54" cy="43" r="1.2" fill="${K}" stroke="none"/>`),
    '怪物': svg(`<path d="M34 28 L30 12 L42 22 M66 28 L70 12 L58 22" fill="#F5C531"/>` +
      `<path d="M22 84 C18 60 20 30 50 26 C80 30 82 60 78 84 Z" fill="#9B6BC9"/>` +
      `<path d="M22 60 L12 56 L14 66 M78 60 L88 56 L86 66" fill="#9B6BC9"/>` +
      `<circle cx="50" cy="48" r="13" fill="#FFFFFF"/><circle cx="50" cy="49" r="6.5" fill="#5CB85C" stroke-width="2"/><circle cx="50" cy="49" r="2.8" fill="${K}" stroke="none"/>` +
      `<path d="M36 68 Q50 78 64 68 Z" fill="#FFFFFF" stroke-width="2.5"/><path d="M42 69 L44 74 L46 70 M54 70 L56 74 L58 69" fill="#FFFFFF" stroke-width="2"/>`),
    '万圣节快乐': svg(`<path d="M6 22 Q50 40 94 22" fill="none" stroke-width="2.5"/>` +
      `<path d="M12 25 L20 44 L28 29 Z" fill="#F28C3A"/><path d="M30 31 L38 50 L46 34 Z" fill="#9B6BC9"/><path d="M48 34 L56 53 L64 33 Z" fill="#F28C3A"/><path d="M66 31 L74 49 L80 28 Z" fill="#9B6BC9"/><path d="M80 27 L86 42 L92 24 Z" fill="#F28C3A"/>` +
      `<path d="M50 62 C36 60 30 68 31 78 C32 88 42 92 50 90 C58 92 68 88 69 78 C70 68 64 60 50 62 Z" fill="#F28C3A"/>` +
      `<path d="M40 74 L44 69 L48 74 Z M52 74 L56 69 L60 74 Z" fill="#F5C531" stroke-width="2"/><path d="M40 80 Q50 88 60 80" fill="none" stroke-width="2.5"/>` +
      `<path d="M50 62 C50 58 51 56 54 55" fill="none" stroke="#2F7A4D" stroke-width="4"/>` +
      `<path d="M14 70 l3 -6 l3 6 l-6 -3 l6 0 Z M82 64 l3 -6 l3 6 l-6 -3 l6 0 Z" fill="#F5C531" stroke-width="1.5"/>`),
    '鬼屋': svg(`<path d="M20 90 L20 44 L36 30 L36 18 L44 18 L44 24 L50 18 L80 44 L80 90 Z" fill="#9B8BC4"/>` +
      `<path d="M14 46 L50 12 L86 46" fill="none" stroke="#5E4B8B" stroke-width="6"/>` +
      `<rect x="30" y="50" width="14" height="14" fill="#F5C531"/><rect x="56" y="50" width="14" height="14" fill="#F5C531"/>` +
      `<path d="M37 50 L37 64 M30 57 L44 57 M63 50 L63 64 M56 57 L70 57" stroke-width="2"/>` +
      `<path d="M42 90 L42 74 Q50 66 58 74 L58 90 Z" fill="#3E3260"/>` +
      `<path d="M62 22 q4 -4 8 0 q4 -4 8 0" fill="none" stroke-width="2"/>`),
    '糖果': svg(`<path d="M30 40 L12 28 L14 52 Z M70 40 L88 28 L86 52 Z" fill="#E2574C"/>` +
      `<ellipse cx="50" cy="40" rx="22" ry="15" fill="#E2574C"/>` +
      `<path d="M38 28 C36 36 36 44 38 52 M50 25 C48 34 48 46 50 55 M62 28 C60 36 60 44 62 52" fill="none" stroke="#FFFFFF" stroke-width="4"/>` +
      `<ellipse cx="50" cy="40" rx="22" ry="15" fill="none"/>` +
      `<path d="M50 70 L50 96" stroke-width="3.5"/><circle cx="50" cy="68" r="12" fill="#F7A8C4"/><path d="M50 68 m-6 0 a6 6 0 1 1 6 6 a3 3 0 1 1 -3 -3" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>` +
      `<path d="M22 72 L28 92 L16 92 Z" fill="#F5C531"/><path d="M19 84 L25 84" stroke="#FFFFFF" stroke-width="3"/><path d="M78 72 L84 92 L72 92 Z" fill="#F5C531"/><path d="M75 84 L81 84" stroke="#FFFFFF" stroke-width="3"/>`),
    '骨头': svg(`<g transform="rotate(35 50 50)"><path d="M26 44 C18 38 10 44 14 50 C10 56 18 62 26 56 L74 56 C82 62 90 56 86 50 C90 44 82 38 74 44 Z" fill="#FFFFFF"/></g>` +
      `<g transform="rotate(-35 50 50)"><path d="M26 44 C18 38 10 44 14 50 C10 56 18 62 26 56 L74 56 C82 62 90 56 86 50 C90 44 82 38 74 44 Z" fill="#F4F1E8"/></g>`),
    '化妆舞会': svg(`<path d="M6 16 Q50 30 94 16" fill="none" stroke-width="2"/>` +
      `<path d="M12 19 L18 32 L24 22 Z" fill="#F28C3A" stroke-width="2"/><path d="M28 23 L34 36 L40 25 Z" fill="#9B6BC9" stroke-width="2"/><path d="M60 25 L66 36 L72 23 Z" fill="#9B6BC9" stroke-width="2"/><path d="M76 22 L82 32 L88 19 Z" fill="#F28C3A" stroke-width="2"/>` +
      `<path d="M18 62 L18 90 M82 58 L82 90" stroke-width="2"/><ellipse cx="18" cy="50" rx="11" ry="13" fill="#9B6BC9"/><ellipse cx="82" cy="46" rx="11" ry="13" fill="#5CB85C"/>` +
      `<path d="M30 84 C40 80 60 80 70 84 C64 88 36 88 30 84 Z" fill="#5E4B8B"/><path d="M36 84 L48 46 C52 42 58 48 58 52 L64 84 Z" fill="#5E4B8B"/>` +
      `<path d="M38 77 L62 77 L63 82 L37 82 Z" fill="#F28C3A" stroke-width="2"/>` +
      `<path d="M38 70 C38 64 62 64 62 70 C62 76 54 74 50 72 C46 74 38 76 38 70 Z" fill="#F5C531" stroke-width="2"/><circle cx="45" cy="70" r="2" fill="${K}" stroke="none"/><circle cx="55" cy="70" r="2" fill="${K}" stroke="none"/>`),
    '吸血鬼': svg(`<path d="M18 92 L28 62 L50 72 L72 62 L82 92 Z" fill="#2B2B2B"/>` +
      `<path d="M28 62 L18 46 L40 60 Z M72 62 L82 46 L60 60 Z" fill="#C2372F"/>` +
      `<path d="M40 68 L50 82 L60 68" fill="#FFFFFF"/>` +
      `<circle cx="50" cy="44" r="20" fill="#E9EEF0"/>` +
      `<path d="M30 42 C30 22 70 22 70 42 C64 34 58 34 50 40 C42 34 36 34 30 42 Z" fill="${K}"/>` +
      `<path d="M41 45 L47 47 M59 45 L53 47" stroke-width="2.5"/><circle cx="44" cy="49" r="2.2" fill="#C2372F" stroke="none"/><circle cx="56" cy="49" r="2.2" fill="#C2372F" stroke="none"/>` +
      `<path d="M42 56 Q50 61 58 56" fill="none" stroke-width="2.5"/><path d="M45 57 L46.5 62 L48 57.6 M52 57.6 L53.5 62 L55 57" fill="#FFFFFF" stroke-width="1.6"/>`),
    '猫头鹰': svg(`<path d="M10 88 L90 88" stroke="#8A5A2B" stroke-width="7"/>` +
      `<path d="M28 84 C22 60 26 34 34 26 L30 14 L42 22 C46 21 54 21 58 22 L70 14 L66 26 C74 34 78 60 72 84 Z" fill="#B07A4E"/>` +
      `<path d="M38 84 C34 72 36 60 50 58 C64 60 66 72 62 84 Z" fill="#E8D2B0" stroke-width="2"/>` +
      `<path d="M42 66 l3 3 l3 -3 M52 66 l3 3 l3 -3 M46 74 l3 3 l3 -3" fill="none" stroke-width="1.8"/>` +
      `<circle cx="40" cy="40" r="10" fill="#FFFFFF"/><circle cx="60" cy="40" r="10" fill="#FFFFFF"/><circle cx="40" cy="41" r="4.5" fill="${K}" stroke="none"/><circle cx="60" cy="41" r="4.5" fill="${K}" stroke="none"/>` +
      `<path d="M46 50 L50 57 L54 50 Z" fill="#F5C531" stroke-width="2"/>` +
      `<path d="M40 88 l-3 4 M44 88 l0 5 M56 88 l0 5 M60 88 l3 4" stroke="#F5C531" stroke-width="3"/>`),
    '面具': svg(`<path d="M68 60 L84 94" stroke="#8A5A2B" stroke-width="5"/>` +
      `<path d="M10 42 C14 30 30 28 42 36 C46 38 54 38 58 36 C70 28 86 30 90 42 C92 56 80 66 66 62 C58 60 54 56 50 56 C46 56 42 60 34 62 C20 66 8 56 10 42 Z" fill="#9B6BC9"/>` +
      `<path d="M24 44 C26 38 38 38 40 46 C36 50 26 50 24 44 Z M60 46 C62 38 74 38 76 44 C74 50 64 50 60 46 Z" fill="#FFFFFF" stroke-width="2.5"/>` +
      `<path d="M14 34 C10 26 14 18 20 16 M86 34 C90 26 86 18 80 16" fill="none" stroke="#F28C3A" stroke-width="4"/>` +
      `<path d="M50 22 l3 7 l7 1 l-5 5 l1.5 7 l-6.5 -3.5 l-6.5 3.5 l1.5 -7 l-5 -5 l7 -1 Z" fill="#F5C531" stroke-width="2"/>`),
    '给糖或捣蛋': svg(`<path d="M24 40 C24 20 76 20 76 40" fill="none" stroke-width="3.5"/>` +
      `<circle cx="34" cy="38" r="7" fill="#E2574C" stroke-width="2"/><circle cx="48" cy="34" r="7" fill="#5CB85C" stroke-width="2"/><circle cx="62" cy="37" r="7" fill="#F5C531" stroke-width="2"/>` +
      `<path d="M50 40 C26 38 16 52 18 66 C20 84 36 92 50 90 C64 92 80 84 82 66 C84 52 74 38 50 40 Z" fill="#F28C3A"/>` +
      `<path d="M18 44 C30 48 70 48 82 44" fill="none" stroke-width="3"/>` +
      `<path d="M34 62 L40 54 L46 62 Z M54 62 L60 54 L66 62 Z" fill="${K}" stroke-width="2"/><path d="M34 72 L40 78 L46 73 L50 78 L54 73 L60 78 L66 72" fill="none" stroke-width="3"/>`)
  };

  // ---------- costumed kids (化妆舞会) ----------
  const skin = '#FBD7B8';
  const face = (cx, cy, opt = {}) =>
    `<circle cx="${cx - 7}" cy="${cy}" r="2.6" fill="${K}" stroke="none"/><circle cx="${cx + 7}" cy="${cy}" r="2.6" fill="${K}" stroke="none"/>` +
    `<circle cx="${cx - 11}" cy="${cy + 6}" r="3" fill="#F7A8C4" stroke="none"/><circle cx="${cx + 11}" cy="${cy + 6}" r="3" fill="#F7A8C4" stroke="none"/>` +
    (opt.fangs ? `<path d="M${cx - 5} ${cy + 7} Q${cx} ${cy + 11} ${cx + 5} ${cy + 7}" fill="none" stroke-width="2.2"/><path d="M${cx - 3} ${cy + 8.5} l1 3.5 l1 -3 M${cx + 1} ${cy + 9} l1 3 l1 -3.5" fill="#FFFFFF" stroke-width="1.4"/>`
               : `<path d="M${cx - 5} ${cy + 7} Q${cx} ${cy + 12} ${cx + 5} ${cy + 7}" fill="none" stroke-width="2.4"/>`);
  const legs = (c1 = K) => `<path d="M42 86 L42 94 M58 86 L58 94" stroke="${c1}" stroke-width="5"/><path d="M36 95 L46 95 M54 95 L64 95" stroke-width="4"/>`;
  const head = (y = 36) => `<circle cx="50" cy="${y}" r="17" fill="${skin}"/>`;
  const costumes = {
    '巫婆': svg(legs('#5E4B8B') +
      `<path d="M84 30 L66 92" stroke="#8A5A2B" stroke-width="4"/><path d="M62 86 L56 98 M66 88 L64 98 M70 88 L72 98" stroke="#E9B949" stroke-width="3"/>` +
      `<path d="M30 88 L38 54 L62 54 L70 88 Z" fill="#9B6BC9"/>` +
      `<path d="M32 40 C30 52 30 60 26 66 M68 40 C70 52 70 60 74 66" fill="none" stroke="#7A4FB0" stroke-width="6"/>` +
      head(40) + face(50, 41) +
      `<path d="M20 28 C34 24 66 24 80 28 C74 33 26 33 20 28 Z" fill="#5E4B8B"/><path d="M33 27 L46 2 C50 -1 56 4 58 8 L67 27 Z" fill="#5E4B8B"/>` +
      `<path d="M35 23 L65 23 L66 27 L34 27 Z" fill="#F28C3A" stroke-width="2"/>`),
    '吸血鬼': svg(legs() +
      `<path d="M22 90 L32 54 L50 60 L68 54 L78 90 Z" fill="${K}"/><path d="M32 54 L22 42 L42 56 Z M68 54 L78 42 L58 56 Z" fill="#C2372F"/>` +
      `<path d="M40 58 L50 74 L60 58 Z" fill="#FFFFFF"/><path d="M48 60 L52 60 L50 64 Z" fill="#C2372F" stroke-width="1.5"/>` +
      head(38) + face(50, 40, { fangs: true }) +
      `<path d="M33 36 C32 18 68 18 67 36 C62 28 56 28 50 34 C44 28 38 28 33 36 Z" fill="${K}"/>`),
    '鬼': svg(`<path d="M44 90 L44 96 M56 90 L56 96" stroke-width="4"/>` +
      `<path d="M22 92 L24 40 C24 12 76 12 76 40 L78 92 L68 86 L60 94 L50 86 L40 94 L32 86 Z" fill="#FFFFFF"/>` +
      `<ellipse cx="42" cy="40" rx="4" ry="5.5" fill="${K}" stroke="none"/><ellipse cx="58" cy="40" rx="4" ry="5.5" fill="${K}" stroke="none"/>` +
      `<ellipse cx="50" cy="54" rx="4" ry="5" fill="${K}" stroke="none"/>` +
      `<circle cx="34" cy="48" r="3" fill="#F7A8C4" stroke="none"/><circle cx="66" cy="48" r="3" fill="#F7A8C4" stroke="none"/>` +
      `<path d="M24 62 C18 64 14 60 14 56 M76 62 C82 64 86 60 86 56" fill="none" stroke-width="3"/>`),
    '怪物': svg(legs('#6E4FA0') +
      `<path d="M30 88 C28 70 32 56 50 54 C68 56 72 70 70 88 Z" fill="#9B6BC9"/>` +
      `<path d="M38 66 l4 4 l4 -4 M54 66 l4 4 l4 -4 M46 76 l4 4 l4 -4" fill="none" stroke="#F5C531" stroke-width="2.5"/>` +
      `<path d="M28 34 C26 12 74 12 72 34 L72 50 L28 50 Z" fill="#9B6BC9"/>` +
      `<path d="M34 20 L28 4 L42 14 M66 20 L72 4 L58 14" fill="#F5C531"/>` +
      `<circle cx="50" cy="38" r="14" fill="${skin}"/>` + face(50, 38) +
      `<path d="M28 50 L32 56 L36 50 L40 56 L44 50 L48 56 L52 50 L56 56 L60 50 L64 56 L68 50 L72 56" fill="none" stroke="#FFFFFF" stroke-width="2"/>`),
    '黑猫': svg(legs() +
      `<path d="M66 82 C84 84 88 66 78 58" fill="none" stroke="${K}" stroke-width="6"/>` +
      `<path d="M32 88 C30 70 34 56 50 54 C66 56 70 70 68 88 Z" fill="#3A3A42"/>` +
      `<path d="M30 40 C28 18 72 18 70 40 L70 52 L30 52 Z" fill="#3A3A42"/><path d="M32 26 L28 6 L44 18 M68 26 L72 6 L56 18" fill="#3A3A42"/>` +
      `<path d="M34 22 L32 12 L40 18 M66 22 L68 12 L60 18" fill="#F7A8C4" stroke-width="1.5"/>` +
      `<circle cx="50" cy="40" r="14" fill="${skin}"/>` + face(50, 39) +
      `<path d="M50 44 L48 46 L52 46 Z" fill="${K}" stroke="none"/><path d="M38 44 L30 42 M38 47 L30 49 M62 44 L70 42 M62 47 L70 49" stroke-width="1.5"/>`),
    '蝙蝠': svg(legs() +
      `<path d="M38 60 C30 50 18 50 10 56 C10 66 16 70 20 74 C26 70 32 72 36 78 Z M62 60 C70 50 82 50 90 56 C90 66 84 70 80 74 C74 70 68 72 64 78 Z" fill="#6B5A9C"/>` +
      `<path d="M34 88 C32 70 36 56 50 54 C64 56 68 70 66 88 Z" fill="#4A3F70"/>` +
      `<path d="M30 40 C28 18 72 18 70 40 L70 52 L30 52 Z" fill="#4A3F70"/><path d="M34 24 L32 10 L44 20 M66 24 L68 10 L56 20" fill="#4A3F70"/>` +
      `<circle cx="50" cy="40" r="14" fill="${skin}"/>` + face(50, 40, { fangs: true })),
    '南瓜': svg(legs('#2F7A4D') +
      `<path d="M50 50 C30 46 18 56 20 72 C22 88 36 94 50 90 C64 94 78 88 80 72 C82 56 70 46 50 50 Z" fill="#F28C3A"/>` +
      `<path d="M50 51 C42 58 42 84 50 90 M50 51 C58 58 58 84 50 90" fill="none" stroke-width="2.5"/>` +
      head(34) + face(50, 35) +
      `<path d="M34 24 C38 14 62 14 66 24 C58 20 42 20 34 24 Z" fill="#5CB85C"/><path d="M50 18 C50 12 52 8 56 6" fill="none" stroke="#2F7A4D" stroke-width="4"/>`),
    '南瓜灯': svg(legs('#2F7A4D') +
      `<path d="M50 50 C30 46 18 56 20 72 C22 88 36 94 50 90 C64 94 78 88 80 72 C82 56 70 46 50 50 Z" fill="#F28C3A"/>` +
      `<path d="M34 66 L39 59 L44 66 Z M56 66 L61 59 L66 66 Z" fill="#F5C531" stroke-width="2"/>` +
      `<path d="M34 74 L40 80 L44 76 L48 82 L52 82 L56 76 L60 80 L66 74 C60 86 40 86 34 74 Z" fill="#F5C531" stroke-width="2"/>` +
      head(34) + face(50, 35) +
      `<path d="M34 24 C38 14 62 14 66 24 C58 20 42 20 34 24 Z" fill="#F28C3A"/><path d="M50 18 C50 12 52 8 56 6" fill="none" stroke="#2F7A4D" stroke-width="4"/>`),
    '蜘蛛': svg(legs() +
      `<path d="M36 62 C26 56 18 58 12 64 M36 70 C26 68 18 72 14 80 M64 62 C74 56 82 58 88 64 M64 70 C74 68 82 72 86 80" fill="none" stroke-width="3"/>` +
      `<path d="M34 88 C32 70 36 56 50 54 C64 56 68 70 66 88 Z" fill="#4A4A55"/>` +
      `<circle cx="44" cy="68" r="2.5" fill="#E2574C" stroke="none"/><circle cx="56" cy="68" r="2.5" fill="#E2574C" stroke="none"/><circle cx="50" cy="76" r="2.5" fill="#E2574C" stroke="none"/>` +
      `<path d="M30 38 C28 16 72 16 70 38 L70 50 L30 50 Z" fill="#4A4A55"/>` +
      `<circle cx="38" cy="22" r="4" fill="#FFFFFF" stroke-width="2"/><circle cx="50" cy="19" r="4" fill="#FFFFFF" stroke-width="2"/><circle cx="62" cy="22" r="4" fill="#FFFFFF" stroke-width="2"/>` +
      `<circle cx="50" cy="40" r="13" fill="${skin}"/>` + face(50, 40)),
    '猫头鹰': svg(legs('#F5C531') +
      `<path d="M34 58 C24 62 22 74 26 82 C30 78 34 74 36 70 Z M66 58 C76 62 78 74 74 82 C70 78 66 74 64 70 Z" fill="#8A5A2B"/>` +
      `<path d="M34 88 C32 70 36 56 50 54 C64 56 68 70 66 88 Z" fill="#B07A4E"/>` +
      `<path d="M40 88 C38 76 42 66 50 64 C58 66 62 76 60 88 Z" fill="#E8D2B0" stroke-width="2"/>` +
      `<path d="M30 38 C28 16 72 16 70 38 L70 52 L30 52 Z" fill="#B07A4E"/><path d="M32 22 L28 6 L42 16 M68 22 L72 6 L58 16" fill="#B07A4E"/>` +
      `<path d="M46 18 L50 25 L54 18 Z" fill="#F5C531" stroke-width="2"/>` +
      `<circle cx="50" cy="40" r="13" fill="${skin}"/>` + face(50, 40))
  };

  // ---------- kid who is scared / not scared (我怕／我不怕) ----------
  function kid(mood) {
    if (mood === 'scared') {
      // pale face, screaming O mouth, hands on cheeks, shaking lines, sweat drops
      const pale = '#E3ECF5';
      return svg(legs('#3B78B5') +
        `<path d="M6 40 L12 44 L6 48 M8 58 L14 60 M94 40 L88 44 L94 48 M92 58 L86 60" fill="none" stroke-width="2.5"/>` +
        `<path d="M32 88 C30 70 34 58 50 56 C66 58 70 70 68 88 Z" fill="#7FC4D8"/>` +
        `<path d="M34 64 L28 46 M66 64 L72 46" stroke="${pale}" stroke-width="7"/>` +
        `<circle cx="50" cy="36" r="21" fill="${pale}"/>` +
        `<path d="M29 33 L30 20 L36 26 L40 14 L46 24 L50 12 L54 24 L60 14 L64 26 L70 20 L71 33 C62 26 38 26 29 33 Z" fill="#6B4A2E"/>` +
        `<ellipse cx="29" cy="46" rx="6" ry="7" fill="${pale}"/><ellipse cx="71" cy="46" rx="6" ry="7" fill="${pale}"/>` +
        `<path d="M36 28 L45 31 M64 28 L55 31" stroke-width="2.5"/>` +
        `<circle cx="42" cy="37" r="5.5" fill="#FFFFFF" stroke-width="2"/><circle cx="58" cy="37" r="5.5" fill="#FFFFFF" stroke-width="2"/>` +
        `<circle cx="42" cy="37" r="1.6" fill="${K}" stroke="none"/><circle cx="58" cy="37" r="1.6" fill="${K}" stroke="none"/>` +
        `<ellipse cx="50" cy="49" rx="6" ry="7.5" fill="#3E3260" stroke-width="2.5"/>` +
        `<path d="M74 18 C79 25 79 30 74 30 C69 30 69 25 74 18 Z M24 16 C28 22 28 26 24 26 C20 26 20 22 24 16 Z" fill="#7FC4D8" stroke-width="1.8"/>`);
    }
    // big grin, hands on hips, sparkles
    return svg(legs('#3B78B5') +
      `<path d="M12 22 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z M86 16 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z" fill="#F5C531" stroke-width="1.5"/>` +
      `<path d="M32 88 C30 70 34 58 50 56 C66 58 70 70 68 88 Z" fill="#F5C531"/>` +
      `<path d="M35 62 L24 70 L33 78 M65 62 L76 70 L67 78" fill="none" stroke="${skin}" stroke-width="7"/>` +
      `<circle cx="50" cy="36" r="21" fill="${skin}"/>` +
      `<path d="M29 33 C29 12 71 12 71 33 C62 25 40 25 29 33 Z" fill="#6B4A2E"/>` +
      `<path d="M37 36 Q42 31 47 36 M53 36 Q58 31 63 36" fill="none" stroke-width="3"/>` +
      `<path d="M37 43 Q50 60 63 43 Z" fill="#FFFFFF" stroke-width="2.6"/><path d="M42 50 Q50 55 58 50" fill="#F28C8C" stroke="none"/>` +
      `<circle cx="33" cy="44" r="3.5" fill="#F7A8C4" stroke="none"/><circle cx="67" cy="44" r="3.5" fill="#F7A8C4" stroke="none"/>`);
  }

  window.ART = { items, costumes, kid };
})();
