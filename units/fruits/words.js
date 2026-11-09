/* =====================================================================
   单元：超市 Supermarket（主岛 → 超市）：水果＋青菜（资料夹名字还是 fruits，金币、统计才不会乱）
   ---------------------------------------------------------------------
   快手摆一摆 games/stock.html?unit=fruits、超市买一买 games/buy.html?unit=fruits、超市算一算 games/calc.html?unit=fruits 读这一份。图在 units/fruits/art.js。
   拼音照台湾的念法。课纲：
     二年级（中文二）4 月：12 种水果、11 种青菜（Level 1 全部都有）
     三年级（中文三）4 月：7 种水果、7 种青菜＋我想买（Level 2 只用这几种，加颜色，比较难）

   每个一行：
     zh / py / en   中文、拼音、英文（英文给老师看的）
     kind           'fruit' 水果、'veg' 青菜（三区：水果区、青菜区、综合促销区）
     l2             三年级也有（Level 2 以上用）
     colors         Level 2 的价签可以写哪些颜色（例如「绿色的苹果」）；空的 = Level 2 不出它的价签（只当干扰）
     mw             量词：买一买的购物清单会写「＿个苹果」「＿根香蕉」「＿串葡萄」（西瓜一片只当干扰）
     alt            另一个说法（菠萝 → 凤梨）：牌子上用小字写在旁边
     shelf: false   不上架子（只放在图书馆）
   注意每行最后的逗号。
   ===================================================================== */
window.UNIT = {};

/* 每一级的说明（Level 按钮上的小字）：两级就好 */
UNIT.levels = [
  { note: 'Name the food' },
  { note: 'Colors + food' }
];

/* 三区：进游戏先选一区（每一区分开算金币） */
UNIT.zones = [
  { id: 'fruit', zh: '水果区', py: 'shuǐ guǒ qū', en: 'Fruit', icon: '🍎' },
  { id: 'veg',   zh: '青菜区', py: 'qīng cài qū', en: 'Vegetables', icon: '🥕' },
  { id: 'mix',   zh: '综合促销区', py: 'zòng hé cù xiāo qū', en: 'Mix & Sale', icon: '🏷️' }
];

UNIT.words = [
  { zh: '水果',   py: 'shuǐ guǒ',   en: 'fruit',       level: 1, shelf: false },
  { zh: '蔬菜',   py: 'shū cài',    en: 'vegetables',  level: 1, shelf: false },
  // ---- 水果 ----
  { zh: '苹果',   py: 'píng guǒ',   en: 'apple',       kind: 'fruit', l2: true, colors: ['红色', '绿色', '黄色'], mw: '个', trad: '蘋果' },
  { zh: '草莓',   py: 'cǎo méi',    en: 'strawberry',  kind: 'fruit', l2: true, colors: ['红色'], mw: '个' },
  { zh: '橘子',   py: 'jú zi',      en: 'orange',      kind: 'fruit', colors: ['橙色', '绿色'], mw: '个' },
  { zh: '香蕉',   py: 'xiāng jiāo', en: 'banana',      kind: 'fruit', l2: true, colors: ['黄色', '绿色'], mw: '根' },
  { zh: '葡萄',   py: 'pú táo',     en: 'grapes',      kind: 'fruit', l2: true, colors: ['紫色', '绿色'], mw: '串' },
  { zh: '西瓜',   py: 'xī guā',     en: 'watermelon',  kind: 'fruit', l2: true, colors: [], mw: '片' },      // 画的是一片西瓜（红色的），Level 2 不出它的价签
  { zh: '梨子',   py: 'lí zi',      en: 'pear',        kind: 'fruit', colors: ['黄色', '绿色'], mw: '个' },
  { zh: '菠萝',   py: 'bō luó',     en: 'pineapple',   kind: 'fruit', l2: true, colors: ['黄色', '绿色'], mw: '个', trad: '菠蘿', alt: { zh: '凤梨', py: 'fèng lí' } },
  { zh: '桃子',   py: 'táo zi',     en: 'peach',       kind: 'fruit', colors: [], mw: '个' },      // 桃子是粉红色（四年级才学），Level 2 不出它的价签
  { zh: '芒果',   py: 'máng guǒ',   en: 'mango',       kind: 'fruit', colors: ['黄色', '绿色', '橙色'], mw: '个' },
  { zh: '李子',   py: 'lǐ zi',      en: 'plum',        kind: 'fruit', colors: ['紫色', '红色'], mw: '个' },
  { zh: '蓝莓',   py: 'lán méi',    en: 'blueberry',   kind: 'fruit', l2: true, colors: ['蓝色'], mw: '个', trad: '藍莓' },
  // ---- 青菜 ----
  { zh: '生菜',   py: 'shēng cài',  en: 'lettuce',     kind: 'veg', l2: true, colors: ['绿色', '紫色'], mw: '颗' },
  { zh: '菠菜',   py: 'bō cài',     en: 'spinach',     kind: 'veg', l2: true, colors: ['绿色'], mw: '把' },
  { zh: '芹菜',   py: 'qín cài',    en: 'celery',      kind: 'veg', colors: ['绿色'], mw: '根' },
  { zh: '芥兰',   py: 'jiè lán',    en: 'Chinese broccoli', kind: 'veg', l2: true, colors: ['绿色'], mw: '把', trad: '芥藍' },
  { zh: '马铃薯', py: 'mǎ líng shǔ', en: 'potato',     kind: 'veg', l2: true, colors: [], mw: '个', trad: '馬鈴薯' },
  { zh: '胡萝卜', py: 'hú luó bo',  en: 'carrot',      kind: 'veg', l2: true, colors: ['橙色', '紫色', '黄色'], mw: '根', trad: '胡蘿蔔' },
  { zh: '番茄',   py: 'fān qié',    en: 'tomato',      kind: 'veg', l2: true, colors: ['红色', '绿色', '黄色'], mw: '个' },
  { zh: '玉米',   py: 'yù mǐ',      en: 'corn',        kind: 'veg', l2: true, colors: ['黄色'], mw: '根' },
  { zh: '蘑菇',   py: 'mó gū',      en: 'mushroom',    kind: 'veg', colors: [], mw: '个' },
  { zh: '青椒',   py: 'qīng jiāo',  en: 'bell pepper', kind: 'veg', colors: ['绿色', '红色', '黄色'], mw: '个' },
  { zh: '茄子',   py: 'qié zi',     en: 'eggplant',    kind: 'veg', colors: ['紫色'], mw: '根' }
];
UNIT.words.forEach(w => { if (!w.level) w.level = 1; });

/* 量词：课纲没学过的（颗、把）在句子下面注明 measure word */
UNIT.mw = {
  '个': { py: 'gè' }, '根': { py: 'gēn' }, '串': { py: 'chuàn' }, '片': { py: 'piàn' },
  '颗': { py: 'kē', isNew: true }, '把': { py: 'bǎ', isNew: true }
};

/* 这一区、这一级可以用的东西（三个游戏都用这个）
   Level 1：二年级全部；Level 2 以上：三年级那几种（l2） */
UNIT.pool = function (level, zone) {
  return UNIT.words.filter(w => w.shelf !== false && w.kind &&
    (zone === 'mix' || !zone || w.kind === zone) && (level <= 1 || w.l2));
};

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
    'Read the signs on the shelves and fill them in {s} seconds! Drag the food to its shelf, or tap the food and its shelf.',
    'Read the color and the food on each sign, and fill the shelves in {s} seconds! Drag the food to its shelf, or tap the food and its shelf.'
  ],
  seconds: 90,
  target: [16, 16],   // Level 1、Level 2 都摆 16 格
  need: 1,
  levels: [
    { every: 1.5, cross: 9,   noise: 0.3 },
    { every: 1.2, cross: 7.5, noise: 0.35 }
  ]
};

/* ---------------- 超市买一买（以前叫水果买一买：超市买东西，凑数量） ----------------
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
  title: { zh: '超市买一买', py: 'chāo shì mǎi yi mǎi', en: 'Shopping List' },
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

/* ---------------- 超市算一算（跟感恩节市场的「市场算一算」一模一样，换成水果、青菜） ----------------
   题型和感恩节市场一样：Level 1 数一数、图形加法、是／不是；Level 2 图形加减、价钱、是／不是；Level 3 两样东西的价钱、够不够钱。
   levelList  这个游戏自己的三个等级（水果单元别的游戏只有两级）
   countMW    会出题的量词：一个苹果、一根香蕉、一串葡萄、一颗生菜、一把菠菜（西瓜一片只当干扰）
   levels     每一级：max 数字最大多少、noTwo 不出 2（二、三年级还没学「两」）、budget 够不够钱的钱
*/
UNIT.calc = {
  title: { zh: '超市算一算', py: 'chāo shì suàn yi suàn', en: 'Supermarket Math' },
  levelList: [
    { note: 'Count and add' },
    { note: '+ prices' },
    { note: '+ Do I have enough?' }
  ],
  countMW: ['个', '根', '串', '颗', '把'],
  count: 8,
  levels: [
    { max: 10, noTwo: true },
    { max: 15, noTwo: true },
    { max: 20, noTwo: false, budget: 10 }
  ]
};
