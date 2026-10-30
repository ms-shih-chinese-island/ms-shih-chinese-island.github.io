/* =====================================================================
   每一关的难度 = 全对可以拿到的金币数
   'game|unit'：游戏档名 | 单元资料夹
     一个数字    → 这个游戏只有一关（或每一关都一样）
     [1, 2, 3]   → Level 1、Level 2、Level 3 各给几颗
   没写在这里的游戏 → 不给金币（例如大富翁、自由拨、快闪活动）
   想改某一关的难度，改这里的数字就好。
   ===================================================================== */
(function () {
  const TABLE = {
    'match|family': [1, 2, 3, 4], 'tree|family': [1, 2, 3, 4],
    'match|school': [1, 2, 3], 'chat|school': [1, 2, 3], 'intro|school': 3, 'friends|school': 3,
    'match|hello': [1, 2, 3], 'feel|hello': [1, 2, 3], 'detective|hello': 2,
    'numbers|numbers': [1, 2, 3], 'abacus-read|numbers': 1, 'abacus-set|numbers': 2,
    'windows|halloween': [1, 2, 3], 'spy|halloween': [1, 2, 3], 'dressup|halloween': [1, 2, 3], 'afraid|halloween': [1, 2, 3], 'match|halloween': [1, 2, 3],
    'story|moon': 2, 'quiz|moon': 1
  };
  const COIN = '<svg class="coinIc" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="#F5C531" stroke="#2B2B2B" stroke-width="3"/><circle cx="20" cy="20" r="11.5" fill="none" stroke="#D99A1E" stroke-width="2.5"/><path d="M20 12.5 L22.2 17.4 L27.5 17.9 L23.5 21.4 L24.7 26.6 L20 23.9 L15.3 26.6 L16.5 21.4 L12.5 17.9 L17.8 17.4 Z" fill="#FFF3C2" stroke="#D99A1E" stroke-width="1.5" stroke-linejoin="round"/></svg>';
  window.ShihCoins = {
    svg: COIN,
    // 这一关全对给几颗（level 从 1 开始；没有分级的游戏 level 不用管）
    of(game, unit, level) {
      const v = TABLE[game + '|' + unit];
      if (v == null) return 0;
      if (typeof v === 'number') return v;
      return v[Math.max(0, Math.min(v.length, level || 1) - 1)] || 0;
    },
    // 选单上显示的范围：最少几颗、最多几颗
    range(game, unit) {
      const v = TABLE[game + '|' + unit];
      if (v == null) return null;
      const a = [].concat(v);
      return [Math.min(...a), Math.max(...a)];
    },
    // 一叠金币（Level 按钮上用，取代原本的冰淇淋）
    stack(n) {
      const g = Array.from({ length: n }, (_, i) => `<g transform="translate(16 ${54 - i * 17})"><ellipse cx="0" cy="3" rx="13" ry="6" fill="#D99A1E" stroke="#2B2B2B" stroke-width="2.5"/><ellipse cx="0" cy="0" rx="13" ry="6" fill="#F5C531" stroke="#2B2B2B" stroke-width="2.5"/><ellipse cx="0" cy="0" rx="7" ry="3" fill="none" stroke="#D99A1E" stroke-width="1.8"/></g>`).join('');
      return `<svg viewBox="0 0 32 66" aria-hidden="true">${g}</svg>`;
    }
  };
})();
