/* =====================================================================
   单元：动物园 Zoo & Farm（主岛 → 动物园）
   ---------------------------------------------------------------------
   动物园里分两区（像超市分区）：动物区（四年级）、农场区（一年级）。动物园点名上面选区。
   游戏：
     1 动物园点名 games/animals.html?unit=zoo（农场区：&zone=farm）
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
  ],
  // 每种动物配得上的形容词（只出这些当答案；配不上的不会出现，例如「熊很友善」）
  // 一个都没有的（犀牛、鳄鱼）只在 Level 1 出现
  fit: {
    大象: ['聪明', '友善', '可爱'], 狮子: ['漂亮'], 熊猫: ['可爱', '漂亮'], 猴子: ['聪明', '可爱'],
    长颈鹿: ['漂亮', '友善', '可爱'], 老虎: ['漂亮'], 豹: ['漂亮'], 犀牛: [], 鳄鱼: [],
    骆驼: ['友善', '聪明'], 熊: ['聪明'], 斑马: ['漂亮', '可爱']
  }
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

/* ---------------- 农场区（课纲一年级 3 月）----------------
   动物园点名上面选「农场区」：
   Level 1：「这是母牛。」点对的；Level 2：「我喜欢鸭子和马。」两个都要点到
   Level 3：看一只动物的图（会叫的旁边有叫声，例如「哞哞！」），把字卡拖成「这是／母牛。」，按 Submit
            答对以后显示英文的叫声来对照（中文和英文的叫声不一样）。火鸡没有常用的叫声，只有图
   sound：中文的叫声（台湾的说法）；en：英文的叫声
   groups：容易搞混的放一组（Level 3 的字卡会放同一组的当干扰） */
UNIT.farm = {
  title: { zh: '农场点名', py: 'nóng chǎng diǎn míng', en: 'Farm Roll Call' },
  scene: 'farm',
  time: [60, 60, 90],
  target: [6, 6, 6],
  colors: null,
  l3: 'name',
  animals: [
    { zh: '母牛', py: 'mǔ niú', en: 'cow', sound: { zh: '哞哞！', py: 'mōu mōu!', en: 'moo' } },
    { zh: '猪', py: 'zhū', en: 'pig', sound: { zh: '呼噜呼噜！', py: 'hū lū hū lū!', en: 'oink' } },
    { zh: '马', py: 'mǎ', en: 'horse', sound: { zh: '嘶嘶！', py: 'sī sī!', en: 'neigh' } },
    { zh: '山羊', py: 'shān yáng', en: 'goat', sound: { zh: '咩咩！', py: 'miē miē!', en: 'baa' } },
    { zh: '绵羊', py: 'mián yáng', en: 'sheep', sound: { zh: '咩咩！', py: 'miē miē!', en: 'baa' } },
    { zh: '鸭子', py: 'yā zi', en: 'duck', sound: { zh: '呱呱！', py: 'guā guā!', en: 'quack' } },
    { zh: '公鸡', py: 'gōng jī', en: 'rooster', sound: { zh: '喔喔喔！', py: 'ō ō ō!', en: 'cock-a-doodle-doo' } },
    { zh: '母鸡', py: 'mǔ jī', en: 'hen', sound: { zh: '咕咕咕！', py: 'gū gū gū!', en: 'cluck' } },
    { zh: '火鸡', py: 'huǒ jī', en: 'turkey' }
  ],
  groups: [['公鸡', '母鸡', '火鸡', '鸭子'], ['山羊', '绵羊'], ['母牛', '马', '猪']],
  lead: { zh: '这是', py: 'zhè shì' },          // Level 3 要拼的句子：这是＿＿。
  wrongLead: [{ zh: '谢谢你', py: 'xiè xie nǐ' }, { zh: '我很好', py: 'wǒ hěn hǎo' }]   // 干扰的字卡：完全接不上「＿＿母牛」的（老师说：别用「我喜欢、我看到」，会跟「这是」搞混）
};
UNIT.zones = [
  { id: 'zoo', zh: '动物区', py: 'dòng wù qū', en: 'Zoo animals', icon: '🦁', cfg: 'animals' },
  { id: 'farm', zh: '农场区', py: 'nóng chǎng qū', en: 'Farm animals', icon: '🐮', cfg: 'farm' }
];
