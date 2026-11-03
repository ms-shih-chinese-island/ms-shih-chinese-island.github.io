/* =====================================================================
   单元：水果 Fruits（主岛 → 超市）
   ---------------------------------------------------------------------
   快手摆一摆 games/stock.html?unit=fruits、水果买一买 games/buy.html?unit=fruits、超市算一算 games/calc.html?unit=fruits 读这一份。图在 units/fruits/art.js。
   拼音照台湾的念法。课纲：二年级（中文一）4 月 9 种水果；三年级（中文三）4 月多了蓝莓。

   水果（words）每个一行：
     zh / py / en   中文、拼音、英文（英文给老师看的）
     level          1 = 二年级、2 = 三、四年级（每一级都包含前面的字）
     colors         Level 2 的价签可以写哪些颜色（例如「绿色的苹果」）；空的 = Level 2 不出这种水果的价签
     mw             量词：买一买的购物清单会写「＿个苹果」「＿根香蕉」「＿串葡萄」（西瓜一片只当干扰）
     shelf: false   不上架子（只放在图书馆）
   注意每行最后的逗号。
   ===================================================================== */
window.UNIT = {};

/* 每一级的说明（Level 按钮上的小字）：两级就好 */
UNIT.levels = [
  { note: 'Fruits' },
  { note: 'Colors + fruits' }
];

/* 水果 */
UNIT.words = [
  { zh: '水果',   py: 'shuǐ guǒ',   en: 'fruit',       level: 1, shelf: false },
  // ---- Level 1（二年级） ----
  { zh: '苹果',   py: 'píng guǒ',   en: 'apple',       level: 1, colors: ['红色', '绿色', '黄色'], mw: '个', trad: '蘋果' },
  { zh: '草莓',   py: 'cǎo méi',    en: 'strawberry',  level: 1, colors: ['红色'], mw: '个' },
  { zh: '橘子',   py: 'jú zi',      en: 'orange',      level: 1, colors: ['橙色', '绿色'], mw: '个' },
  { zh: '香蕉',   py: 'xiāng jiāo', en: 'banana',      level: 1, colors: ['黄色', '绿色'], mw: '根' },
  { zh: '葡萄',   py: 'pú táo',     en: 'grapes',      level: 1, colors: ['紫色', '绿色'], mw: '串' },
  { zh: '西瓜',   py: 'xī guā',     en: 'watermelon',  level: 1, colors: [], mw: '片' },      // 画的是一片西瓜（红色的），Level 2 不出它的价签
  { zh: '梨子',   py: 'lí zi',      en: 'pear',        level: 1, colors: ['黄色', '绿色'], mw: '个' },
  { zh: '菠萝',   py: 'bō luó',     en: 'pineapple',   level: 1, colors: ['黄色', '绿色'], mw: '个', trad: '菠蘿' },
  { zh: '桃子',   py: 'táo zi',     en: 'peach',       level: 1, colors: [], mw: '个' },      // 桃子是粉红色（四年级才学），Level 2 不出它的价签
  // ---- Level 2（三年级） ----
  { zh: '蓝莓',   py: 'lán méi',    en: 'blueberry',   level: 2, colors: ['蓝色'], mw: '个', trad: '藍莓' }
];

/* 价签上的颜色（二、三年级学过的） */
UNIT.colors = {
  '红色': { py: 'hóng sè',  en: 'red' },
  '黄色': { py: 'huáng sè', en: 'yellow' },
  '绿色': { py: 'lǜ sè',    en: 'green' },
  '蓝色': { py: 'lán sè',   en: 'blue' },
  '紫色': { py: 'zǐ sè',    en: 'purple' },
  '橙色': { py: 'chéng sè', en: 'orange' }
};

/* ---------------- 快手摆一摆（超市上架） ----------------
   架子上一直有两格，每格上面贴一张价签（只有字），下面的输送带从右往左送水果。
   点水果再点格子（或先点格子再点水果、或直接拖过去），对了水果就摆上去；错了弹回输送带，不扣分。
   哪一格摆好了，那一格就换一张新的价签（像套圈圈）。时间内摆好 target 格就有金币（Level 1／2 给 1／2 颗）。
   Level 1：价签写水果（苹果）。新的价签一定跟旁边那格不同，最近出现过的先不出。
   Level 2：价签写「颜色的水果」（红色的苹果）。新的价签尽量跟旁边那格很像：
            同一种水果、不同颜色（红色的苹果／绿色的苹果），或同颜色、不同水果（红色的苹果／红色的草莓）。
   seconds  一关几秒
   target   要摆好几格（每一级一个数字）
   need     每格要摆几个水果
   每一级：every 几秒送一个水果、cross 水果走完输送带要几秒（越小越快）、noise 架子上没有的水果大约占多少
*/
UNIT.stock = {
  title: { zh: '快手摆一摆', py: 'kuài shǒu bǎi yi bǎi', en: 'Stock the Shelves' },
  done:  { zh: '摆好了！', py: 'bǎi hǎo le!', en: 'All stocked!' },
  // {s} 会换成秒数
  help: [
    'Read the signs on the shelves and fill them in {s} seconds! Drag a fruit to its shelf, or tap a fruit and its shelf.',
    'Read the color and the fruit on each sign, and fill the shelves in {s} seconds! Drag a fruit to its shelf, or tap a fruit and its shelf.'
  ],
  seconds: 90,
  target: [16, 16],   // Level 1、Level 2 都摆 16 格
  need: 1,
  levels: [
    { every: 1.5, cross: 9,   noise: 0.3 },
    { every: 1.2, cross: 7.5, noise: 0.35 }
  ]
};

/* ---------------- 水果买一买（超市买水果，凑数量） ----------------
   上面一张购物清单「＿个（颜色的）＿＿」，架上是一袋一袋装好的水果（袋子上不写数字，要自己数）。
   点袋子放进购物车（再点一下拿出来），挑袋子（一袋、两袋、三袋都可以），刚好是要买的数量就按「结帐」。
   有的题目一袋就刚好（single 的机会），有的要两袋加起来；对的水果有好几袋，乱试很慢，要算。
   买对了篮子上出现绿色圆圈＋白色的勾；买错了是红色圆圈＋白色 ✗、篮子摇一摇，袋子再飞回架上，不扣分；时间内 rounds 题都买对就有金币（Level 1／2 给 1／2 颗）。
   Level 1：五个苹果。架上 12 袋（三层、每层 4 袋）：对的水果 4 袋，别的水果 8 袋（别的水果也凑得出那个数字，骗没读字的）。
   Level 2：七个绿色的苹果。清单只出有两种以上颜色的水果，所以每一题都要看颜色。
            架上 12 袋：对的 4 袋；同一种水果、别的颜色的 4 袋（也凑得出那个数字，骗没看颜色的），其他是同颜色、别的水果。
   每一级：nums 要买的数量（不出 2，因为要说「两个」）、bag 一袋最多几个、bags 架上几袋、right 对的水果几袋
*/
UNIT.buy = {
  title: { zh: '水果买一买', py: 'shuǐ guǒ mǎi yi mǎi', en: 'Shopping List' },
  done:  { zh: '买好了！', py: 'mǎi hǎo le!', en: 'All bought!' },
  // {s} 会换成秒数
  help: [
    "Fill the cart with what's on the shopping list. Tap 1 or more bags, then tap 结帐 (check out). Finish in {s} seconds!",
    "Fill the cart with what's on the shopping list. Check the color too! Tap 1 or more bags, then tap 结帐 (check out). Finish in {s} seconds!"
  ],
  seconds: 90,
  rounds: 8,
  levels: [
    { nums: [3, 4, 5, 6, 7, 8, 9, 10], bag: 5, bags: 12, right: 4, single: 0.35 },
    { nums: [4, 5, 6, 7, 8, 9, 10, 11, 12], bag: 6, bags: 12, right: 4, single: 0.35 }
  ]
};

/* ---------------- 超市算一算（跟感恩节市场的「市场算一算」一模一样，换成水果） ----------------
   题型和感恩节市场一样：Level 1 数一数、图形加法、是／不是；Level 2 图形加减、价钱、是／不是；Level 3 两样东西的价钱、够不够钱。
   levelList  这个游戏自己的三个等级（水果单元别的游戏只有两级）
   countMW    会出题的量词：一个苹果、一根香蕉、一串葡萄（西瓜一片只当干扰）
   levels     每一级：max 数字最大多少、noTwo 不出 2（二、三年级还没学「两」）、budget 够不够钱的钱
*/
UNIT.calc = {
  title: { zh: '超市算一算', py: 'chāo shì suàn yi suàn', en: 'Supermarket Math' },
  levelList: [
    { note: 'Count and add' },
    { note: '+ prices' },
    { note: '+ Do I have enough?' }
  ],
  countMW: ['个', '根', '串'],
  count: 8,
  levels: [
    { max: 10, noTwo: true },
    { max: 15, noTwo: true },
    { max: 20, noTwo: false, budget: 10 }
  ]
};
