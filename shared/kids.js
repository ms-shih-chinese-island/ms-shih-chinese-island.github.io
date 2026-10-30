/* =====================================================================
   小朋友（旅客中心、学校都用这一份）：名单、画图、各种样子、早上／下午
   ART.people           16 个小朋友（名字只写英文）
   ART.kid(人, 样子)     样子 = 'good' 'notgood' 'soso' 'hungry' 'great' 'tired' 'hot' 'cold' 'thirsty' 'wave'
   ART.time('morning' | 'afternoon')
   ART.FEELS            「我很＿＿」这些回答（对话框用），level = 第几级开始出现
   ART.GREET            早上好、下午好
   换名字、加小朋友：改下面的 PEOPLE。
   skin：light / asian / tan    hair：short spiky side curly wavy long bob ponytail pigtails
   hairColor：black brown blonde red dark
   long：长发 true、短发 false（肩膀以上就算短发）
   ===================================================================== */
(function () {
  const PEOPLE = [
    { first: 'Tom',     last: 'Miller',  boy: true,  long: false, skin: 'light', hair: 'short',    hairColor: 'brown',  shirt: '#5B9BD5' },
    { first: 'David',   last: 'Brown',   boy: true,  long: false, skin: 'light', hair: 'side',     hairColor: 'blonde', shirt: '#8CC7A0' },
    { first: 'Vincent', last: 'Clark',   boy: true,  long: false, skin: 'light', hair: 'curly',    hairColor: 'dark',   shirt: '#F2A65A' },
    { first: 'Jack',    last: 'Wilson',  boy: true,  long: false, skin: 'light', hair: 'spiky',    hairColor: 'red',    shirt: '#9B8BC4' },
    { first: 'Emma',    last: 'Smith',   boy: false, long: true,  skin: 'light', hair: 'long',     hairColor: 'blonde', shirt: '#EC8FB3' },
    { first: 'Lily',    last: 'Johnson', boy: false, long: true,  skin: 'light', hair: 'pigtails', hairColor: 'brown',  shirt: '#F5C531' },
    { first: 'Sophie',  last: 'Davis',   boy: false, long: true,  skin: 'light', hair: 'ponytail', hairColor: 'dark',   shirt: '#7FC4D8' },
    { first: 'Grace',   last: 'Taylor',  boy: false, long: false, skin: 'light', hair: 'bob',      hairColor: 'red',    shirt: '#8CC7A0' },
    { first: 'Kevin',   last: 'Wang',    boy: true,  long: false, skin: 'asian', hair: 'short',    hairColor: 'black',  shirt: '#E2557A' },
    { first: 'Ryan',    last: 'Lee',     boy: true,  long: false, skin: 'asian', hair: 'spiky',    hairColor: 'black',  shirt: '#5B9BD5' },
    { first: 'Ethan',   last: 'Lin',     boy: true,  long: false, skin: 'asian', hair: 'side',     hairColor: 'black',  shirt: '#F5C531' },
    { first: 'Emily',   last: 'Chen',    boy: false, long: true,  skin: 'asian', hair: 'long',     hairColor: 'black',  shirt: '#9B8BC4' },
    { first: 'Chloe',   last: 'Zhang',   boy: false, long: true,  skin: 'asian', hair: 'pigtails', hairColor: 'black',  shirt: '#F2A65A' },
    { first: 'Angela',  last: 'Wu',      boy: false, long: false, skin: 'asian', hair: 'bob',      hairColor: 'black',  shirt: '#EC8FB3' },
    { first: 'Arjun',   last: 'Patel',   boy: true,  long: false, skin: 'tan',   hair: 'wavy',     hairColor: 'black',  shirt: '#8CC7A0' },
    { first: 'Priya',   last: 'Shah',    boy: false, long: true,  skin: 'tan',   hair: 'ponytail', hairColor: 'black',  shirt: '#F28C3A' }
  ];

  const FEELS = [
    { zh: '我很好',     py: 'wǒ hěn hǎo',     en: "I'm fine",     feel: 'good',    level: 1 },
    { zh: '我不好',     py: 'wǒ bù hǎo',      en: "I'm not good", feel: 'notgood', level: 1 },
    { zh: '我马马虎虎', py: 'wǒ mǎ ma hū hu', en: "I'm so-so",    feel: 'soso',    level: 1 },
    { zh: '我很饿',     py: 'wǒ hěn è',       en: "I'm hungry",   feel: 'hungry',  level: 2 },
    { zh: '我很棒',     py: 'wǒ hěn bàng',    en: "I'm great",    feel: 'great',   level: 2 },
    { zh: '我很累',     py: 'wǒ hěn lèi',     en: "I'm tired",    feel: 'tired',   level: 2 },
    { zh: '我很热',     py: 'wǒ hěn rè',      en: "I'm hot",      feel: 'hot',     level: 3 },
    { zh: '我很冷',     py: 'wǒ hěn lěng',    en: "I'm cold",     feel: 'cold',    level: 3 },
    { zh: '我很渴',     py: 'wǒ hěn kě',      en: "I'm thirsty",  feel: 'thirsty', level: 3 }
  ];
  const GREET = {
    morning:   { zh: '早上好', py: 'zǎo shàng hǎo', en: 'Good morning' },
    afternoon: { zh: '下午好', py: 'xià wǔ hǎo',    en: 'Good afternoon' }
  };

  const INK = '#2B2B2B', CHEEK = '#F4A7B9';
  const SKIN = { light: '#FBDCC8', asian: '#F6D9B5', tan: '#C98E62' };
  const HAIR = { black: '#2E2A2A', brown: '#7A4B2A', blonde: '#E8C25A', red: '#C0602E', dark: '#4A3424' };
  const sw = 'stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';

  // ---- hair: back layer (behind the head) and front layer ----
  function hairBack(style, c) {
    const f = `fill="${c}" ${sw}`;
    if (style === 'long') return `<path d="M40 62 Q36 30 70 31 Q104 30 100 62 L103 108 Q92 112 87 102 L87 74 L53 74 L53 102 Q48 112 37 108 Z" ${f}/>`;
    if (style === 'bob') return `<path d="M39 64 Q37 30 70 31 Q103 30 101 64 L101 88 Q92 92 89 84 L51 84 Q48 92 39 88 Z" ${f}/>`;
    if (style === 'ponytail') return `<path d="M96 46 Q118 50 112 82 Q108 98 102 104 Q104 86 100 70 Z" ${f}/>`;
    if (style === 'pigtails') return `<path d="M42 66 Q26 72 30 96 Q34 106 40 104 Q38 88 46 74 Z" ${f}/><path d="M98 66 Q114 72 110 96 Q106 106 100 104 Q102 88 94 74 Z" ${f}/>`;
    return '';
  }
  function hairFront(style, c) {
    const f = `fill="${c}" ${sw}`;
    switch (style) {
      case 'spiky': return `<path d="M42 60 L43 41 L52 45 L55 32 L64 40 L70 29 L77 40 L85 32 L88 45 L97 41 L98 60 Q90 47 70 47 Q50 47 42 60 Z" ${f}/>`;
      case 'side': return `<path d="M42 64 Q37 33 66 31 Q101 29 98 62 Q95 48 86 44 Q70 41 56 51 Q46 53 42 64 Z" ${f}/>`;
      case 'curly': return `<g ${f.replace(/stroke-width="2.5"/, 'stroke-width="2.2"')}>` +
        [[45, 52, 8], [50, 40, 9], [61, 33, 9], [73, 31, 9], [85, 35, 9], [94, 45, 8], [96, 56, 6], [44, 60, 6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('') + '</g>';
      case 'wavy': return `<path d="M42 62 Q38 34 70 31 Q102 34 98 62 Q94 52 88 50 Q84 44 76 47 Q70 42 63 47 Q56 43 51 50 Q45 52 42 62 Z" ${f}/>`;
      case 'long': case 'pigtails': return `<path d="M42 60 Q42 33 70 33 Q98 33 98 60 Q91 45 76 46 Q72 52 66 46 Q50 46 42 60 Z" ${f}/>`;
      case 'bob': return `<path d="M42 58 Q42 33 70 33 Q98 33 98 58 L42 58 Z" ${f}/>`;
      case 'ponytail': return `<path d="M42 60 Q40 32 70 32 Q100 32 98 60 Q92 46 76 46 Q60 48 42 60 Z" ${f}/><circle cx="99" cy="50" r="4" fill="#E2557A" stroke="${INK}" stroke-width="2"/>`;
      default: return `<path d="M42 61 Q39 32 70 32 Q101 32 98 61 Q93 47 80 45 Q68 51 54 46 Q46 51 42 61 Z" ${f}/>`;   // short
    }
  }

  // ---- face for each feeling ----
  const eyes = (y = 64) => `<circle cx="60" cy="${y}" r="3.2" fill="${INK}"/><circle cx="80" cy="${y}" r="3.2" fill="${INK}"/>`;
  const cheeks = (r = 4.5, c = CHEEK) => `<circle cx="53" cy="73" r="${r}" fill="${c}" opacity=".85"/><circle cx="87" cy="73" r="${r}" fill="${c}" opacity=".85"/>`;
  const line = d => `<path d="${d}" fill="none" ${sw}/>`;
  function face(state) {
    switch (state) {
      case 'great': return eyes() + cheeks() + `<path d="M59 75 Q70 90 81 75 Z" fill="#B23B3B" ${sw}/><path d="M61 76 L79 76" stroke="#fff" stroke-width="3"/>`;
      case 'notgood': return eyes(65) + cheeks(4, '#E9B9C2') + line('M54 57 L64 55') + line('M86 57 L76 55') + line('M62 81 Q70 74 78 81');
      case 'soso': return eyes() + cheeks() + line('M61 79 Q65.5 76 70 79 Q74.5 82 79 79');
      case 'hungry': return eyes() + cheeks() + `<ellipse cx="70" cy="79" rx="5" ry="6" fill="#B23B3B" ${sw}/><path d="M75 82 Q77 88 75 91" stroke="#7FC4D8" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
      case 'tired': return `<circle cx="60" cy="66" r="3" fill="${INK}"/><circle cx="80" cy="66" r="3" fill="${INK}"/>` +
        `<path d="M55 63 L65 63 L65 66 Q60 64.5 55 66 Z" fill="${INK}"/><path d="M75 63 L85 63 L85 66 Q80 64.5 75 66 Z" fill="${INK}"/>` +
        line('M54 59 L64 56') + line('M86 59 L76 56') + line('M56 71 Q60 73 64 71').replace(INK, '#A08CB8') + line('M76 71 Q80 73 84 71').replace(INK, '#A08CB8') +
        cheeks(3.5, '#E9C9D0') + line('M64 81 Q70 78 76 81');
      case 'hot': return eyes() + cheeks(6, '#F26B5B') + `<path d="M62 77 Q70 84 78 77 Z" fill="#B23B3B" ${sw}/><path d="M67 80 Q70 88 73 80" fill="#F28C9B" stroke="${INK}" stroke-width="2"/>`;
      case 'cold': return eyes() + cheeks(4, '#B9D3F5') + line('M61 79 L64 76 L67 79 L70 76 L73 79 L76 76 L79 79');
      case 'thirsty': return eyes() + cheeks() + `<path d="M62 77 Q70 82 78 77" fill="none" ${sw}/><path d="M66 79 Q70 90 74 79 Z" fill="#F28C9B" ${sw}/>`;
      default: return eyes() + cheeks() + line('M62 76 Q70 84 78 76');   // good / wave
    }
  }

  // ---- props around the kid ----
  const hand = (x, y, skin) => `<circle cx="${x}" cy="${y}" r="7.5" fill="${skin}" ${sw}/>`;
  function props(state, skin) {
    switch (state) {
      case 'wave': return `<path d="M104 112 Q112 98 114 84" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M104 112 Q112 98 114 84" fill="none" stroke="${skin}" stroke-width="5" stroke-linecap="round"/>` + hand(115, 80, skin) +
        line('M124 70 Q128 76 126 84') + line('M130 66 Q136 76 132 88');
      case 'great': return `<g transform="translate(104 22) rotate(-8)"><rect x="-28" y="-13" width="56" height="26" rx="13" fill="#F5C531" ${sw}/>` +
        `<text x="0" y="6" text-anchor="middle" font-family="Andika, Arial, sans-serif" font-weight="700" font-size="16" fill="${INK}">Great!</text></g>` +
        star(24, 36, 7, '#F5C531') + star(18, 74, 4.5, '#F5C531') + star(122, 72, 5, '#F5C531');
      case 'notgood': return `<g ${sw} fill="#B7BCC4"><path d="M12 30 Q12 18 24 20 Q28 10 38 16 Q48 14 48 26 Q54 30 48 36 L16 36 Q8 34 12 30 Z"/></g>` +
        `<g stroke="#7FC4D8" stroke-width="2.5" stroke-linecap="round"><path d="M20 42 L18 48"/><path d="M30 42 L28 48"/><path d="M40 42 L38 48"/></g>`;
      case 'soso': return `<g transform="translate(114 30)"><circle r="20" fill="#fff" ${sw}/><circle cx="-14" cy="25" r="4" fill="#fff" ${sw}/><circle cx="-20" cy="33" r="2.5" fill="#fff" ${sw}/>` +
        `<path d="M-12 0 Q-6 -7 0 0 Q6 7 12 0" fill="none" stroke="#7A5BC7" stroke-width="3.5" stroke-linecap="round"/></g>` +
        line('M55 57 L65 57') + line('M75 57 L85 57');
      case 'hungry': return `<ellipse cx="70" cy="124" rx="10" ry="7" fill="${skin}" ${sw}/>` +
        line('M48 118 Q44 123 48 128 Q44 133 48 138').replace(INK, '#C0602E') + line('M92 118 Q96 123 92 128 Q96 133 92 138').replace(INK, '#C0602E') +
        `<g transform="translate(112 30)"><circle r="24" fill="#fff" ${sw}/><circle cx="-17" cy="29" r="4.5" fill="#fff" ${sw}/><circle cx="-24" cy="38" r="2.8" fill="#fff" ${sw}/>` +
        `<path d="M-13 -2 Q-13 -13 0 -13 Q13 -13 13 -2 Z" fill="#fff" ${sw}/><path d="M-16 -2 L16 -2 Q14 14 0 14 Q-14 14 -16 -2 Z" fill="#E2557A" ${sw}/>` +
        `<path d="M2 -20 L18 -6 M7 -22 L21 -10" stroke="#8A5A2B" stroke-width="3" stroke-linecap="round"/></g>`;
      case 'tired': return drop(50, 44) +
        // low battery: almost empty, one red bar
        `<g transform="translate(112 30) rotate(-10)"><rect x="-20" y="-11" width="36" height="22" rx="4" fill="#fff" ${sw}/><rect x="16" y="-5" width="5" height="10" rx="1.5" fill="${INK}"/>` +
        `<rect x="-16" y="-7" width="7" height="14" rx="1.5" fill="#E04A3A"/></g>`;
      case 'hot': return `<g transform="translate(22 24)"><circle r="12" fill="#F5C531" ${sw}/>` +
        [0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M0 -17 L0 -23" transform="rotate(${a})" stroke="#E9A23B" stroke-width="3" stroke-linecap="round"/>`).join('') + '</g>' +
        drop(40, 50) + drop(102, 46) + drop(106, 62);
      case 'cold': return `<path d="M56 92 Q70 100 84 92 L86 102 Q70 110 54 102 Z" fill="#E2557A" ${sw}/><path d="M78 100 L82 124 L92 122 L86 98" fill="#E2557A" ${sw}/>` +
        line('M32 56 L28 62 L32 68').replace(INK, '#5B9BD5') + line('M108 56 L112 62 L108 68').replace(INK, '#5B9BD5') +
        flake(20, 26) + flake(120, 22) + flake(124, 104);
      case 'thirsty': return `<g transform="translate(110 96)"><path d="M-10 -14 L10 -14 L7 16 L-7 16 Z" fill="#E6F4F8" ${sw}/><path d="M-9 -6 L9 -6" stroke="#BFE3EE" stroke-width="2"/></g>` + hand(98, 104, skin) +
        `<g transform="translate(26 30)"><circle r="18" fill="#fff" ${sw}/><circle cx="14" cy="24" r="4" fill="#fff" ${sw}/><circle cx="20" cy="32" r="2.5" fill="#fff" ${sw}/>` +
        `<path d="M0 -10 Q9 2 9 6 A9 9 0 0 1 -9 6 Q-9 2 0 -10 Z" fill="#5B9BD5" ${sw}/></g>`;
    }
    return '';
  }
  function star(x, y, r, c) {
    let d = '';
    for (let i = 0; i < 8; i++) { const a = Math.PI / 4 * i - Math.PI / 2, rr = i % 2 ? r * 0.38 : r; d += (i ? 'L' : 'M') + (x + rr * Math.cos(a)).toFixed(1) + ' ' + (y + rr * Math.sin(a)).toFixed(1); }
    return `<path d="${d}Z" fill="${c}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`;
  }
  const drop = (x, y) => `<path d="M${x} ${y - 7} Q${x + 6} ${y + 1} ${x + 5} ${y + 4} A5 5 0 0 1 ${x - 5} ${y + 4} Q${x - 6} ${y + 1} ${x} ${y - 7} Z" fill="#9FD3F2" stroke="${INK}" stroke-width="1.8"/>`;
  const flake = (x, y) => `<g transform="translate(${x} ${y})" stroke="#5B9BD5" stroke-width="2.5" stroke-linecap="round">` +
    [0, 60, 120].map(a => `<path d="M0 -8 L0 8" transform="rotate(${a})"/>`).join('') + '</g>';

  // ---- a whole kid ----
  function kid(p, state) {
    const skin = SKIN[p.skin] || SKIN.light, hc = HAIR[p.hairColor] || HAIR.brown;
    const coldTint = state === 'cold' ? `<circle cx="70" cy="62" r="27" fill="#BFE3EE" opacity=".22"/>` : '';
    const tummy = state === 'hungry' ? '' : '';
    return `<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
      hairBack(p.hair, hc) +
      `<path d="M28 140 Q28 104 70 101 Q112 104 112 140 Z" fill="${p.shirt}" ${sw}/>` +
      `<rect x="63" y="84" width="14" height="19" fill="${skin}" ${sw}/>` +
      `<circle cx="42" cy="64" r="6" fill="${skin}" ${sw}/><circle cx="98" cy="64" r="6" fill="${skin}" ${sw}/>` +
      `<circle cx="70" cy="62" r="28" fill="${skin}" ${sw}/>` + coldTint +
      hairFront(p.hair, hc) + face(state) + tummy + props(state, skin) +
      `</svg>`;
  }

  // ---- 早上 / 下午 ----
  function clock(x, y, h) {
    const ha = (h % 12) * 30;
    return `<g transform="translate(${x} ${y})"><circle r="24" fill="#fff" ${sw}/>` +
      [0, 90, 180, 270].map(a => `<path d="M0 -20 L0 -16" transform="rotate(${a})" stroke="${INK}" stroke-width="2.5"/>`).join('') +
      `<path d="M0 0 L0 -12" transform="rotate(${ha})" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>` +
      `<path d="M0 0 L0 -18" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/><circle r="2.5" fill="${INK}"/></g>`;
  }
  function time(which) {
    const morning = which === 'morning';
    const sky = morning ? '#FFE3B8' : '#BFE3EE';
    const sun = morning
      ? `<g transform="translate(44 104)"><circle r="20" fill="#F5A531" ${sw}/>${[-60, -30, 0, 30, 60].map(a => `<path d="M0 -26 L0 -34" transform="rotate(${a})" stroke="#E9A23B" stroke-width="3.5" stroke-linecap="round"/>`).join('')}</g>`
      : `<g transform="translate(112 36)"><circle r="16" fill="#F5C531" ${sw}/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M0 -21 L0 -28" transform="rotate(${a})" stroke="#E9A23B" stroke-width="3" stroke-linecap="round"/>`).join('')}</g>`;
    return `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
      `<rect x="2" y="2" width="156" height="136" rx="14" fill="${sky}" ${sw}/>` + sun +
      `<path d="M3 104 Q40 96 80 104 Q120 112 157 102 L157 124 Q157 137 145 137 L15 137 Q3 137 3 124 Z" fill="#8CC7A0" ${sw}/>` +
      clock(morning ? 118 : 46, morning ? 46 : 54, morning ? 8 : 3) +
      `<text x="${morning ? 118 : 46}" y="${morning ? 86 : 94}" text-anchor="middle" font-family="Andika, Arial, sans-serif" font-weight="700" font-size="15" fill="${INK}">${morning ? '8:00 AM' : '3:00 PM'}</text>` +
      `</svg>`;
  }

  window.ART = { people: PEOPLE, FEELS, GREET, kid, time, STATES: ['good', 'notgood', 'soso', 'hungry', 'great', 'tired', 'hot', 'cold', 'thirsty', 'wave'] };
})();
