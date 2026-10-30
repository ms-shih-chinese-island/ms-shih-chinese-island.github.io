// 岛上的其他大人（跟史老师同一个画风）：发糖的邻居、中秋节的奶奶
// window.NPC_ART.neighbor()  window.NPC_ART.grandma()
(function () {
  const INK = '#2B2B2B', SKIN = '#F4CDAE', CHEEK = '#F29BA6';
  const sw = (w = 3.5) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const arm = (sx, sy, hx, hy) =>
    `<path d="M${sx} ${sy} L${hx} ${hy}" stroke="${INK}" stroke-width="15" stroke-linecap="round"/>` +
    `<path d="M${sx} ${sy} L${hx} ${hy}" stroke="${SKIN}" stroke-width="9" stroke-linecap="round"/>` +
    `<circle cx="${hx}" cy="${hy}" r="8" fill="${SKIN}" ${sw(3)}/>`;
  // o: { hairBack, hairFront, top, top2, bottom, skirt, holding, hat, glasses }
  function person(o) {
    let g = '';
    g += o.hairBack || '';
    // legs / skirt and shoes
    if (o.skirt) g += `<path d="M74 180 L66 226 L134 226 L126 180 Z" fill="${o.bottom}" ${sw()}/><path d="M84 226 L84 238 M116 226 L116 238" ${sw(10)} stroke="${SKIN}"/>` +
      `<path d="M84 226 L84 238 M116 226 L116 238" fill="none" stroke="${INK}" stroke-width="1"/>`;
    else g += `<path d="M76 182 L76 232 Q76 238 82 238 L94 238 Q99 238 99 232 L101 196 L103 232 Q103 238 108 238 L120 238 Q126 238 126 232 L126 182 Z" fill="${o.bottom}" ${sw()}/>`;
    g += `<path d="M70 240 Q70 230 84 230 Q98 230 98 240 L98 244 L70 244 Z" fill="#4A3424" ${sw(3)}/>`;
    g += `<path d="M104 240 Q104 230 118 230 Q132 230 132 240 L132 244 L104 244 Z" fill="#4A3424" ${sw(3)}/>`;
    // arms come to the front and hold something
    g += arm(78, 144, 86, 172) + arm(122, 144, 114, 172);
    // neck, then top
    g += `<rect x="92" y="112" width="16" height="16" fill="${SKIN}" ${sw(3)}/>`;
    g += `<path d="M72 140 Q74 126 90 124 L110 124 Q126 126 128 140 L128 184 Q100 190 72 184 Z" fill="${o.top}" ${sw()}/>`;
    g += `<path d="M90 124 Q100 132 110 124" fill="none" stroke="${o.top2}" stroke-width="3"/>`;
    // the arms again on top of the shirt (sleeves), then the hands with the thing they hold
    g += `<path d="M80 146 L86 168 M120 146 L114 168" stroke="${INK}" stroke-width="15" stroke-linecap="round"/><path d="M80 146 L86 168 M120 146 L114 168" stroke="${o.top}" stroke-width="9" stroke-linecap="round"/>`;
    g += `<circle cx="86" cy="172" r="8" fill="${SKIN}" ${sw(3)}/><circle cx="114" cy="172" r="8" fill="${SKIN}" ${sw(3)}/>`;
    g += o.holding || '';
    // head
    g += `<circle cx="100" cy="80" r="42" fill="${SKIN}" ${sw()}/>`;
    g += `<circle cx="85" cy="84" r="4.5" fill="${INK}"/><circle cx="115" cy="84" r="4.5" fill="${INK}"/>`;
    g += `<circle cx="74" cy="96" r="7" fill="${CHEEK}" opacity=".7"/><circle cx="126" cy="96" r="7" fill="${CHEEK}" opacity=".7"/>`;
    g += `<path d="M90 98 Q100 107 110 98" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`;
    if (o.glasses) g += `<circle cx="85" cy="84" r="10" fill="none" ${sw(2.5)}/><circle cx="115" cy="84" r="10" fill="none" ${sw(2.5)}/><path d="M95 84 L105 84" ${sw(2.5)}/>`;
    g += o.hairFront || '';
    g += o.hat || '';
    return `<svg viewBox="0 -30 200 290" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${g}</svg>`;
  }
  // a bowl of candy / a plate of mooncakes, held in front at the hands
  const candyBowl = `<path d="M70 166 L130 166 Q128 194 100 194 Q72 194 70 166 Z" fill="#F28C3A" ${sw(3)}/>` +
    `<circle cx="84" cy="162" r="7" fill="#EC8FB3" ${sw(2.5)}/><circle cx="100" cy="158" r="7" fill="#7FC4D8" ${sw(2.5)}/><circle cx="116" cy="162" r="7" fill="#F5C531" ${sw(2.5)}/>` +
    `<path d="M80 176 l6 -5 l6 5 M108 176 l6 -5 l6 5 M88 184 Q100 190 112 184" fill="none" ${sw(2.5)}/>`;
  const cake = (x, y) => `<g transform="translate(${x} ${y})">` +
    Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<circle cx="${(9 * Math.cos(a)).toFixed(1)}" cy="${(4.5 * Math.sin(a)).toFixed(1)}" r="3.5" fill="#D9963F" stroke="${INK}" stroke-width="1.8"/>`; }).join('') +
    `<ellipse rx="9" ry="4.5" fill="#E9B05A" stroke="${INK}" stroke-width="1.8"/></g>`;
  const mooncakePlate = `<ellipse cx="100" cy="176" rx="38" ry="10" fill="#FFFFFF" ${sw(3)}/>` + cake(86, 168) + cake(114, 168) + cake(100, 160);

  window.NPC_ART = {
    // 邻居：戴巫婆帽，捧着一碗糖
    neighbor: () => person({
      top: '#9B8BC4', top2: '#7E6DAA', bottom: '#2F3E66',
      hairBack: `<path d="M56 82 Q52 40 100 36 Q148 40 144 82 L146 110 Q134 116 126 108 L74 108 Q66 116 54 110 Z" fill="#B4471C" ${sw()}/>`,
      hairFront: `<path d="M58 80 Q60 52 100 50 Q140 52 142 80 Q128 66 100 66 Q72 66 58 80 Z" fill="#B4471C" ${sw()}/>`,
      hat: `<path d="M44 56 Q100 40 156 56 Q140 64 100 62 Q60 64 44 56 Z" fill="#3E3260" ${sw()}/><path d="M68 56 Q80 20 100 -10 Q112 6 118 18 L126 54 Q100 60 68 56 Z" fill="#3E3260" ${sw()}/>` +
        `<path d="M70 50 Q100 56 126 48 L127 54 Q100 60 69 56 Z" fill="#F5C531" ${sw(2.5)}/>`,
      holding: candyBowl
    }),
    // 奶奶：白头发、包包头、眼镜，端着一盘月饼
    grandma: () => person({
      top: '#D9603B', top2: '#B4471C', bottom: '#2F3E66', glasses: true,
      hairBack: `<circle cx="100" cy="34" r="17" fill="#E6E6E6" ${sw()}/>`,
      hairFront: `<path d="M58 84 Q52 40 100 38 Q148 40 142 84 Q136 62 116 56 Q100 64 84 56 Q64 62 58 84 Z" fill="#E6E6E6" ${sw()}/>`,
      holding: mooncakePlate
    })
  };
})();
