/* =====================================================================
   单元：春节 Chinese New Year（节日岛 → 春节）
   ---------------------------------------------------------------------
   游戏：
     1 生肖排一排 games/zodiac.html?unit=cny
     2 你属什么？ games/ask.html?unit=cny
     3 红包大放送 games/hongbao.html?unit=cny
     4 猜灯谜 games/riddle.html?unit=cny
     5 年夜饭找一找 games/feast.html?unit=cny
   图在 units/cny/art.js。拼音照台湾的念法。
   ===================================================================== */
window.UNIT = {};

/* 十二生肖：照顺序（第一个是老鼠）
   zh / py：完整的名字（别的游戏用，例如老虎、兔子）
   one / onePy：生肖的说法，一个字（生肖排一排用，例如虎、兔） */
UNIT.zodiac = [
  { zh: '老鼠', py: 'lǎo shǔ', en: 'rat', one: '鼠', onePy: 'shǔ' },
  { zh: '牛', py: 'niú', en: 'ox', one: '牛', onePy: 'niú' },
  { zh: '老虎', py: 'lǎo hǔ', en: 'tiger', one: '虎', onePy: 'hǔ' },
  { zh: '兔子', py: 'tù zi', en: 'rabbit', one: '兔', onePy: 'tù' },
  { zh: '龙', py: 'lóng', en: 'dragon', one: '龙', onePy: 'lóng' },
  { zh: '蛇', py: 'shé', en: 'snake', one: '蛇', onePy: 'shé' },
  { zh: '马', py: 'mǎ', en: 'horse', one: '马', onePy: 'mǎ' },
  { zh: '羊', py: 'yáng', en: 'goat', one: '羊', onePy: 'yáng' },
  { zh: '猴子', py: 'hóu zi', en: 'monkey', one: '猴', onePy: 'hóu' },
  { zh: '鸡', py: 'jī', en: 'rooster', one: '鸡', onePy: 'jī' },
  { zh: '狗', py: 'gǒu', en: 'dog', one: '狗', onePy: 'gǒu' },
  { zh: '猪', py: 'zhū', en: 'pig', one: '猪', onePy: 'zhū' }
];

/* 第一个～第十二个 */
UNIT.ordinals = [
  { zh: '第一个',   py: 'dì yī gè' },
  { zh: '第二个',   py: 'dì èr gè' },
  { zh: '第三个',   py: 'dì sān gè' },
  { zh: '第四个',   py: 'dì sì gè' },
  { zh: '第五个',   py: 'dì wǔ gè' },
  { zh: '第六个',   py: 'dì liù gè' },
  { zh: '第七个',   py: 'dì qī gè' },
  { zh: '第八个',   py: 'dì bā gè' },
  { zh: '第九个',   py: 'dì jiǔ gè' },
  { zh: '第十个',   py: 'dì shí gè' },
  { zh: '第十一个', py: 'dì shí yī gè' },
  { zh: '第十二个', py: 'dì shí èr gè' }
];

/* ---------------- 生肖排一排 ----------------
   Level 1：6 只动物（随便挑），把有拼音的名字卡拉到动物下面
   Level 2：12 张动物卡（图 + 名字）是乱的，拉到第一个～第十二个的空位
   Level 3：跟 Level 2 一样，排完再答一题「第几个是什么？」
   time：每一级几秒，时间内做完就有金币 */
UNIT.zodiacGame = {
  title: { zh: '生肖排一排', py: 'shēng xiào pái yì pái', en: 'Zodiac Line-Up', one: '生肖排一排', onePy: 'shēng xiào pái yì pái' },
  time: [60, 60, 90]
};

/* ---------------- 你属什么？ ----------------
   两个小朋友对话：「你属什么？」「我属＿＿。」
   右边的小朋友旁边有一张生日卡：随便一个年份 + 那一年的生肖图，学生看图回答。
   Level 1：「我属＿。」只填动物，3 张字卡（有拼音）
   Level 2：排「我／属／＿」，6 种动物里选一个（没有拼音）
   Level 3：问句「你／属／什么」和回答「我／属／＿」都要排，多几张不相关的字卡
   years：年份从哪一年到哪一年（随便挑）
   rounds：每一级几题；time：每一级几秒，时间内做完就有金币 */
UNIT.ask = {
  title: { zh: '你属什么？', py: 'nǐ shǔ shén me?', en: 'What Is Your Zodiac Animal?' },
  years: [2010, 2021],
  rounds: [6, 5, 4],
  time: [60, 60, 60],
  words: {
    我: { zh: '我', py: 'wǒ' }, 你: { zh: '你', py: 'nǐ' }, 属: { zh: '属', py: 'shǔ' }, 什么: { zh: '什么', py: 'shén me' },
    是: { zh: '是', py: 'shì' }, 吗: { zh: '吗', py: 'ma' }, 好: { zh: '好', py: 'hǎo' }
  },
  // Level 3 多放的字卡
  extra: ['是', '吗', '好']
};

/* ---------------- 红包大放送 ----------------
   亲戚一个一个来拜年，学生回对的话才拿得到红包。
   拜年话可以互相接（别人说新年好，回新年快乐也可以）：只要是拜年话都算对。
   Level 1：亲戚说一句拜年话（有字、有拼音、会念），4 张卡：1 句拜年话 + 3 句不是（有拼音）
   Level 2：亲戚只用说的（泡泡里只有 🔊），5 张卡：1 句拜年话 + 4 句不是（没有拼音）
   Level 3：亲戚拿出一张春节东西的图（泡泡写「这是…」），学生回答「这是＿＿。」，
            有吉祥话的东西还要配一句吉祥话，例如「这是鱼。年年有余！」（没有拼音）
   greet：拜年话，lv = 从第几级开始用；notGreet：不是拜年话的（当错的卡）
   things：Level 3 的东西（图在 units/cny/art.js）；lucky = 配的吉祥话（没有就不写）
          also = 也说得通的另一句（例如红包也可以说招财进宝）：这一句不会出现在错的卡里，免得有两个对的
   rounds：一回合几个亲戚；time：每一级几秒，时间内拿完红包就有金币 */
UNIT.hongbao = {
  title: { zh: '红包大放送', py: 'hóng bāo dà fàng sòng', en: 'Red Envelope Time' },
  rounds: 6,
  time: [60, 60, 60],
  greet: [
    { zh: '新年快乐', py: 'xīn nián kuài lè', lv: 1 },
    { zh: '恭喜发财', py: 'gōng xǐ fā cái',   lv: 1 },
    { zh: '新年好',   py: 'xīn nián hǎo',     lv: 1 },
    { zh: '春节快乐', py: 'chūn jié kuài lè', lv: 2 },
    { zh: '年年有余', py: 'nián nián yǒu yú', lv: 2 }
  ],
  notGreet: [
    { zh: '生日快乐',   py: 'shēng rì kuài lè' },
    { zh: '中秋节快乐', py: 'zhōng qiū jié kuài lè' },
    { zh: '感恩节快乐', py: 'gǎn ēn jié kuài lè' },
    { zh: '早上好',     py: 'zǎo shàng hǎo' },
    { zh: '再见',       py: 'zài jiàn' }
  ],
  things: [
    { zh: '红包',     py: 'hóng bāo',       lucky: { zh: '恭喜发财', py: 'gōng xǐ fā cái' }, also: '招财进宝' },
    { zh: '饺子',     py: 'jiǎo zi',        lucky: { zh: '招财进宝', py: 'zhāo cái jìn bǎo' }, also: '恭喜发财' },
    { zh: '鱼',       py: 'yú',             lucky: { zh: '年年有余', py: 'nián nián yǒu yú' } },
    { zh: '桔子',     py: 'jú zi',          lucky: { zh: '大吉大利', py: 'dà jí dà lì' } },
    { zh: '鞭炮',     py: 'biān pào' },
    { zh: '舞龙舞狮', py: 'wǔ lóng wǔ shī' }
  ]
};

/* ---------------- 猜灯谜 ----------------
   上面挂一排灯笼，每个灯笼一个谜语；下面架子上坐着生肖动物。
   点灯笼读谜语，再点对的动物，圈圈就套上去（套错了圈圈掉下去，不扣分）。
   谜语只用学过的字：颜色、身体部位、数字、第几个生肖。
   Level 1：8 只动物，谜语有拼音，一句线索
   谜语最后是「我是＿＿？」，套中以后空格会填上答案（一个字的生肖）
   Level 2：8 只动物，有拼音，两句线索（一句猜不出来，要两句一起看）
   Level 3：12 只动物，「第几个生肖」+ 一句线索
   clues：每一句线索 + 哪些动物符合（游戏会自己挑，保证只有一个答案）
   animals：每一级几只；target：每一级要套中几个；time：每一级几秒 */
UNIT.riddle = {
  title: { zh: '猜灯谜', py: 'cāi dēng mí', en: 'Lantern Riddles' },
  animals: [8, 8, 12],
  target: [6, 6, 6],
  time: [60, 60, 60],
  clues: [
    { zh: '我是白色的。',         py: 'wǒ shì bái sè de.',            who: ['兔子', '羊', '鸡'] },
    { zh: '我是绿色的。',         py: 'wǒ shì lǜ sè de.',             who: ['龙', '蛇'] },
    { zh: '我是橙色和黑色的。',   py: 'wǒ shì chéng sè hé hēi sè de.', who: ['老虎'] },
    { zh: '我是黑色和白色的。',   py: 'wǒ shì hēi sè hé bái sè de.',   who: ['牛'] },
    { zh: '我是粉红色的。',       py: 'wǒ shì fěn hóng sè de.',       who: ['猪'] },
    { zh: '我的耳朵很长。',       py: 'wǒ de ěr duo hěn cháng.',       who: ['兔子'] },
    { zh: '我的耳朵很大。',       py: 'wǒ de ěr duo hěn dà.',          who: ['老鼠'] },
    { zh: '我的鼻子很大。',       py: 'wǒ de bí zi hěn dà.',           who: ['猪'] },
    { zh: '我很小。',             py: 'wǒ hěn xiǎo.',                 who: ['老鼠'] },
    { zh: '我没有脚。',           py: 'wǒ méi yǒu jiǎo.',             who: ['蛇', '龙'] },
    { zh: '我有两只脚。',         py: 'wǒ yǒu liǎng zhī jiǎo.',        who: ['鸡', '猴子'] },
    { zh: '我有四只脚。',         py: 'wǒ yǒu sì zhī jiǎo.',           who: ['老鼠', '牛', '老虎', '兔子', '马', '羊', '狗', '猪'] },
    { zh: '我有两只手、两只脚。', py: 'wǒ yǒu liǎng zhī shǒu, liǎng zhī jiǎo.', who: ['猴子'] },
    { zh: '我会说：汪汪！',       py: 'wǒ huì shuō: wāng wāng!',       who: ['狗'] },
    { zh: '我会说：哞哞！',       py: 'wǒ huì shuō: mōu mōu!',         who: ['牛'] },
    { zh: '我会说：咩咩！',       py: 'wǒ huì shuō: miē miē!',         who: ['羊'] },
    { zh: '我会说：喔喔喔！',     py: 'wǒ huì shuō: ō ō ō!',           who: ['鸡'] }
  ]
};

/* ---------------- 年夜饭找一找 ----------------
   一张过年的图（年夜饭桌 + 灯笼、烟火），上面 6 个圆圈。点圆圈，看到什么就把字拉进「我看到＿＿。」
   东西用 UNIT.hongbao.things（红包、饺子、鱼、桔子、鞭炮、舞龙舞狮）
   三级都有拼音。
   Level 1：「我看到＿＿。」只填东西，3 张字卡
   Level 2：自己排句子「我／看到／＿＿。」，6 种东西
   Level 3：跟 Level 2 一样排句子；有吉祥话的东西还要配一句（我看到鱼。年年有余！）
   time：每一级几秒，时间内找完就有金币 */
UNIT.feast = {
  title: { zh: '年夜饭找一找', py: 'nián yè fàn zhǎo yì zhǎo', en: 'New Year Feast Hunt' },
  frame: { zh: '我看到{x}。', py: 'wǒ kàn dào {x}.' },
  question: { zh: '你看到什么？', py: 'nǐ kàn dào shén me?' },
  parts: [{ zh: '我', py: 'wǒ' }, { zh: '看到', py: 'kàn dào' }],   // Level 2、3 要自己排的字
  time: [60, 60, 60]
};
