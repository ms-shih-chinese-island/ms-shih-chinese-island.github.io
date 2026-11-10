/* =====================================================================
   单元：动物园 Zoo & Farm（主岛 → 动物园）
   ---------------------------------------------------------------------
   游戏：
     1 动物园点名 games/animals.html?unit=zoo
     2 我喜欢＿＿ games/zoolike.html?unit=zoo
     3 排大小     games/zoosize.html?unit=zoo
   课纲：四年级 3 月动物园的动物（不说颜色）
   拼音照台湾的念法。
   ===================================================================== */
window.UNIT = {};

/* ---------------- 动物园点名 ----------------
   Level 1：「这是大象。」点对的（每一种只画一个）
   Level 2：「我喜欢熊猫和猴子。」两个都要点到
   Level 3：「我看到两只大象和三只猴子。」两样都要点刚好的数量（画面上的都比要的多；别的也画好几个，不能看数量猜）
   三级都有拼音。答对 target 题就马上结束、给金币
   animals：动物、拼音、英文、可以有的颜色（colors 里面的名字）；图在 shared/animals.js */
UNIT.animals = {
  title: { zh: '动物园点名', py: 'dòng wù yuán diǎn míng', en: 'Zoo Roll Call' },
  scene: 'zoo',
  time: [60, 60, 90],
  target: [6, 6, 6],
  mw: { zh: '只', py: 'zhī' },
  nums: [ { zh: '一', py: 'yì' }, { zh: '两', py: 'liǎng' }, { zh: '三', py: 'sān' } ],
  colors: null,      // 动物园的动物不说颜色
  animals: [
    { zh: '大象', py: 'dà xiàng', en: 'elephant' }, { zh: '狮子', py: 'shī zi', en: 'lion' },
    { zh: '熊猫', py: 'xióng māo', en: 'panda' }, { zh: '猴子', py: 'hóu zi', en: 'monkey' },
    { zh: '长颈鹿', py: 'cháng jǐng lù', en: 'giraffe' }, { zh: '老虎', py: 'lǎo hǔ', en: 'tiger' },
    { zh: '豹', py: 'bào', en: 'leopard' }, { zh: '犀牛', py: 'xī niú', en: 'rhino' },
    { zh: '鳄鱼', py: 'è yú', en: 'alligator' }, { zh: '骆驼', py: 'luò tuó', en: 'camel' },
    { zh: '熊', py: 'xióng', en: 'bear' }, { zh: '斑马', py: 'bān mǎ', en: 'zebra' }
  ],
};

/* ---------------- 我喜欢＿＿，因为＿＿很＿＿ ----------------
   课纲四年级 3 月：「我喜欢＿＿，因为＿＿很＿＿。」
   Level 1：看动物的图，选名字，放进「我喜欢＿＿。」
   Level 2：「我喜欢熊猫，因为＿＿很＿＿。」第一格放同一只动物；第二格放形容词（good 里的都对，bad 的是混淆：动物不会用来当「喜欢的理由」）
   Level 3：字卡自己排成整句「我喜欢熊猫，因为熊猫很可爱。」再按 Submit（good 里的形容词哪一个都对）
   动物用上面 UNIT.animals 的 12 种 */
UNIT.zoolike = {
  title: { zh: '我喜欢动物', py: 'wǒ xǐ huān dòng wù', en: 'My Favorite Animal' },
  time: [60, 90, 120],
  target: [6, 6, 5],
  good: [
    { zh: '漂亮', py: 'piào liàng', en: 'pretty' }, { zh: '聪明', py: 'cōng míng', en: 'smart' },
    { zh: '友善', py: 'yǒu shàn', en: 'friendly' }, { zh: '可爱', py: 'kě ài', en: 'cute' }
  ],
  bad: [
    { zh: '热', py: 'rè', en: 'hot' }, { zh: '冷', py: 'lěng', en: 'cold' }, { zh: '累', py: 'lèi', en: 'tired' },
    { zh: '饿', py: 'è', en: 'hungry' }, { zh: '渴', py: 'kě', en: 'thirsty' }, { zh: '生气', py: 'shēng qì', en: 'angry' },
    { zh: '幽默', py: 'yōu mò', en: 'humorous' }
  ]
};

/* ---------------- 排大小 ----------------
   只有一级（2 颗金币，shared/coins.js）。4～5 只动物，图照真的大小画（shared/animals.js 的 size），拖到「小 → 大」的格子。
   排对了再填「最大的是＿＿。」「最小的是＿＿。」都对了才算一题。「最大、最小」旁边有英文（进阶）
   同一个大小等级的动物不会一起出现（例如狮子和老虎、长颈鹿和大象） */
UNIT.zoosize = {
  title: { zh: '排大小', py: 'pái dà xiǎo', en: 'Small to Big' },
  time: 150,
  target: 5,
  count: [4, 5]
};
