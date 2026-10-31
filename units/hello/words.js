/* =====================================================================
   单元：你好吗 Hello（主岛 → 旅客中心）：打招呼和心情
   ---------------------------------------------------------------------
   难度（挥手 👋）：1 = 二年级、2 = 三年级、3 = 四年级。
   每个年级都包含前面年级的句子，只会多、不会少。

   句子（words）每句一行，栏位：
     zh     中文（简体）
     py     拼音，字和字之间空一格
     en     英文
     key / keyZh / keyEn
            认字配对时只配会变的那个字：拼音写 key、中文写 keyZh、英文写 keyEn
            （例如「我很棒」只配 bàng ↔ 棒 / great）；没写就用整句
     feel   这句话配哪一张小朋友的图（你好吗？游戏用）
     level  难度（1 = 二年级、2 = 三年级、3 = 四年级）
   加新句子：复制一行，改内容就好。注意每行最后的逗号。
   ===================================================================== */
window.UNIT = {};
UNIT.levelIcon = 'wave';
UNIT.matchMode = 'pinyin';     // 配对游戏用「认字配对」：拼音 + 英文 ↔ 中文字

UNIT.matchTitle = { zh: '认字手牵手', py: 'rèn zì shǒu qiān shǒu', en: 'Hand in Hand' };
UNIT.matchMax = 12;            // 每次最多配几组；字比较多的时候，每次随机挑
UNIT.matchPics = true;         // 拼音那边放图（有图的字才有），可以用按钮关掉

UNIT.levels = [
  { note: '' },
  { note: '' },
  { note: '' }
];

UNIT.words = [
  // ---- 二年级 ----
  { zh: '你好！',         py: 'nǐ hǎo!',                    en: 'Hello!',                 side: 'sea', level: 1 },
  { zh: '你好吗？',       py: 'nǐ hǎo ma?',                 en: 'How are you?',           side: 'sea', level: 1 },
  { zh: '我很好',         py: 'wǒ hěn hǎo',                 en: "I'm fine",               side: 'sea', level: 1, feel: 'good' },   // 二年级配整句
  { zh: '谢谢你',         py: 'xiè xie nǐ',                 en: 'Thank you',              side: 'sea', level: 1 },
  { zh: '我不好',         py: 'wǒ bù hǎo',                  en: "I'm not good",           side: 'sea', level: 1, feel: 'notgood' },
  { zh: '我马马虎虎',     py: 'wǒ mǎ ma hū hu',             en: "I'm so-so",              side: 'sea', level: 1, feel: 'soso' },
  // ---- 三年级 ----
  { zh: '早上好',         py: 'zǎo shàng hǎo',              en: 'Good morning',           side: 'sea', level: 2 },
  { zh: '下午好',         py: 'xià wǔ hǎo',                 en: 'Good afternoon',         side: 'sea', level: 2 },
  { zh: '我很饿',         py: 'wǒ hěn è',       key: 'è',    keyZh: '饿', keyEn: 'hungry',en: "I'm hungry",             side: 'sea', level: 2, feel: 'hungry' },
  { zh: '我很棒',         py: 'wǒ hěn bàng',    key: 'bàng', keyZh: '棒', keyEn: 'great',en: "I'm great",              side: 'sea', level: 2, feel: 'great' },
  { zh: '我很累',         py: 'wǒ hěn lèi',     key: 'lèi',  keyZh: '累', keyEn: 'tired',en: "I'm tired",              side: 'sea', level: 2, feel: 'tired' },
  // ---- 四年级 ----
  { zh: '我很热',         py: 'wǒ hěn rè',      key: 'rè',   keyZh: '热', keyEn: 'hot',en: "I'm hot",                side: 'sea', level: 3, feel: 'hot' },
  { zh: '我很冷',         py: 'wǒ hěn lěng',    key: 'lěng', keyZh: '冷', keyEn: 'cold',en: "I'm cold",               side: 'sea', level: 3, feel: 'cold' },
  { zh: '我很渴',         py: 'wǒ hěn kě',      key: 'kě',   keyZh: '渴', keyEn: 'thirsty',en: "I'm thirsty",            side: 'sea', level: 3, feel: 'thirsty' },
];

/* 你好吗？（看小朋友的样子回答） */
UNIT.feel = {
  title: { zh: '你好吗？', py: 'nǐ hǎo ma?', en: 'How Are You?' },
  count: 8,           // 一回合几题
  choices: 3,         // 每题几个回答
  greetFrom: 2        // 从第几级开始出「早上好／下午好」
};

/* 小朋友的名单和图在 shared/kids.js（学校也用同一份） */

/* =====================================================================
   顺风耳 Super Ears（你好 → 顺风耳）：先听，再选
   Level 1 = 二年级、2 = 三年级、3 = 四年级（高的级也会出前面几级的题）
   每一回合 10 题，四种题型混在一起，比例写在 mix：
     py     听一个字或词，看中文字，选对的拼音（选错会出现 💡 提示）
     zh     只听，不看字，选对的中文字（干扰的字是发音很像的字）
     qa     听一个问题，选对的回答
     chain  听两个问题（中间停一下），把两个回答依顺序放进对话框
   ===================================================================== */
UNIT.ears = {
  title: { zh: '顺风耳', py: 'shùn fēng ěr', en: 'Super Ears' },
  count: 10,
  mix: [
    { py: 3, zh: 2, qa: 5, chain: 0 },   // Level 1 二年级
    { py: 2, zh: 2, qa: 5, chain: 1 },   // Level 2 三年级
    { py: 1, zh: 2, qa: 4, chain: 3 }    // Level 3 四年级
  ],
  /* 字和词：zh 中文、py 拼音、en 英文、level 年级、no 三个错的拼音、tip 选错时的提示（可以不写） */
  sounds: [
    // ---- 二年级 ----
    { zh: '一', py: 'yī', en: 'one', level: 1, no: ['yí', 'yǐ', 'yì'], tip: 'yī is high and flat (1st tone)' },
    { zh: '二', py: 'èr', en: 'two', level: 1, no: ['àr', 'òr', 'ùr'], tip: 'er sounds like “are”' },
    { zh: '三', py: 'sān', en: 'three', level: 1, no: ['sāng', 'sēn', 'shān'], tip: 'an ends with n; ang ends with ng, like “song”' },
    { zh: '四', py: 'sì', en: 'four', level: 1, no: ['shì', 'xì', 'cì'], tip: 's is like the “s” in sun, not “sh”' },
    { zh: '五', py: 'wǔ', en: 'five', level: 1, no: ['wú', 'wǒ', 'hǔ'], tip: 'wu sounds like “woo”; the 3rd tone dips down' },
    { zh: '六', py: 'liù', en: 'six', level: 1, no: ['lòu', 'liò', 'lù'], tip: 'iu sounds like the “yo” in yo-yo' },
    { zh: '七', py: 'qī', en: 'seven', level: 1, no: ['chī', 'xī', 'jī'], tip: 'q sounds like the “ch” in cheese' },
    { zh: '八', py: 'bā', en: 'eight', level: 1, no: ['pā', 'bà', 'bō'], tip: 'b is softer than p' },
    { zh: '九', py: 'jiǔ', en: 'nine', level: 1, no: ['jǒu', 'jiǒ', 'jǔ'], tip: 'iu sounds like the “yo” in yo-yo' },
    { zh: '十', py: 'shí', en: 'ten', level: 1, no: ['sí', 'xí', 'shì'], tip: 'after zh, ch, sh, r, z, c, s, the i is NOT “ee”' },
    { zh: '小', py: 'xiǎo', en: 'small', level: 1, no: ['shiǎo', 'siǎo', 'jiǎo'], tip: 'x sounds like the “sh” in she' },
    { zh: '大', py: 'dà', en: 'big', level: 1, no: ['tà', 'dǎ', 'duò'], tip: 'd is softer than t' },
    { zh: '谢', py: 'xiè', en: 'thank', level: 1, no: ['shiè', 'xì', 'qiè'], tip: 'ie sounds like the “ye” in yes' },
    { zh: '女', py: 'nǚ', en: 'girl', level: 1, no: ['nǔ', 'nǐ', 'nyǔ'], tip: 'ü: say “ee” with round lips' },
    { zh: '你', py: 'nǐ', en: 'you', level: 1, no: ['lǐ', 'ní', 'nǚ'], tip: 'n and l sound different: n goes through your nose' },
    { zh: '我', py: 'wǒ', en: 'I, me', level: 1, no: ['wǎ', 'wǔ', 'wǒu'], tip: 'uo sounds like “waw”' },
    { zh: '爸', py: 'bà', en: 'dad', level: 1, no: ['bò', 'bè', 'bài'], tip: 'a sounds like “ah”' },
    { zh: '妈', py: 'mā', en: 'mom', level: 1, no: ['mō', 'mē', 'māi'], tip: 'a sounds like “ah”' },
    { zh: '哥', py: 'gē', en: 'older brother', level: 1, no: ['kē', 'gā', 'gōu'], tip: 'e sounds like “uh”' },
    { zh: '姐', py: 'jiě', en: 'older sister', level: 1, no: ['jěi', 'jǐ', 'jiǎ'], tip: 'ie sounds like the “ye” in yes' },
    { zh: '弟', py: 'dì', en: 'younger brother', level: 1, no: ['tì', 'dé', 'dǐ'], tip: 'd is softer than t' },
    { zh: '妹', py: 'mèi', en: 'younger sister', level: 1, no: ['mài', 'mì', 'mè'], tip: 'ei sounds like the “ay” in day' },
    { zh: '月', py: 'yuè', en: 'moon, month', level: 1, no: ['yüè', 'yè', 'ywè'], tip: 'after j, q, x, y: write ue (no dots), say “ü-eh”' },
    { zh: '天', py: 'tiān', en: 'sky, day', level: 1, no: ['tiēn', 'tyān', 'tēn'], tip: 'ian sounds like “yen”' },
    { zh: '日', py: 'rì', en: 'sun, day', level: 1, no: ['rè', 'zhì', 'ruì'], tip: 'after zh, ch, sh, r, z, c, s, the i is NOT “ee”' },
    { zh: '是', py: 'shì', en: 'is, am, are', level: 1, no: ['shè', 'xì', 'shrì'], tip: 'after zh, ch, sh, r, z, c, s, the i is NOT “ee”' },
    { zh: '人', py: 'rén', en: 'person', level: 1, no: ['lén', 'zhén', 'rún'], tip: 'r: curl your tongue, a bit like the “s” in measure' },
    { zh: '上', py: 'shàng', en: 'up, on', level: 1, no: ['shàn', 'shèng', 'xiàng'], tip: 'an ends with n; ang ends with ng, like “song”' },
    { zh: '好', py: 'hǎo', en: 'good', level: 1, no: ['hǒu', 'hǎu', 'hǒ'], tip: 'ao sounds like the “ow” in cow' },
    { zh: '儿', py: 'ér', en: 'child, son', level: 1, no: ['ár', 'ór', 'úr'], tip: 'er sounds like “are”' },
    { zh: '门', py: 'mén', en: 'door', level: 1, no: ['méng', 'mín', 'mán'], tip: 'en sounds like the “un” in fun; eng like the “ung” in lung' },
    { zh: '手', py: 'shǒu', en: 'hand', level: 1, no: ['shǎo', 'shǒ', 'xǒu'], tip: 'ou sounds like the “o” in go' },
    { zh: '鬼', py: 'guǐ', en: 'ghost', level: 1, no: ['gwěi', 'gěi', 'gǔ'], tip: 'ui sounds like “way”' },
    { zh: '猫', py: 'māo', en: 'cat', level: 1, no: ['mōu', 'māu', 'mō'], tip: 'ao sounds like the “ow” in cow' },
    { zh: '有', py: 'yǒu', en: 'have', level: 1, no: ['yóu', 'yǔ', 'yǎo'], tip: 'ou sounds like the “o” in go' },
    { zh: '白', py: 'bái', en: 'white', level: 1, no: ['béi', 'bí', 'bā'], tip: 'ai sounds like “eye”' },
    { zh: '马', py: 'mǎ', en: 'horse', level: 1, no: ['mā', 'mà', 'mǒ'], tip: 'listen to the tone: mǎ dips down and up (3rd tone)' },
    { zh: '虎', py: 'hǔ', en: 'tiger', level: 1, no: ['hú', 'hǒu', 'fǔ'], tip: 'u sounds like the “oo” in food' },
    { zh: '朋友', py: 'péng yǒu', en: 'friend', level: 1, no: ['pén yǒu', 'péng yóu', 'pín yǒu'], tip: 'eng sounds like the “ung” in lung' },
    { zh: '什么', py: 'shén me', en: 'what', level: 1, no: ['sén me', 'shéng me', 'shén mo'], tip: 'shén ends with n, not ng' },
    // ---- 三年级 ----
    { zh: '千', py: 'qiān', en: 'thousand', level: 2, no: ['chiān', 'kiān', 'jiān'], tip: 'q sounds like the “ch” in cheese' },
    { zh: '饿', py: 'è', en: 'hungry', level: 2, no: ['à', 'ò', 'ù'], tip: 'e sounds like “uh”' },
    { zh: '累', py: 'lèi', en: 'tired', level: 2, no: ['lài', 'lì', 'nèi'], tip: 'ei sounds like the “ay” in day' },
    { zh: '黑', py: 'hēi', en: 'black', level: 2, no: ['hāi', 'hī', 'hē'], tip: 'ei sounds like the “ay” in day' },
    { zh: '爱', py: 'ài', en: 'love', level: 2, no: ['èi', 'ì', 'à'], tip: 'ai sounds like “eye”' },
    { zh: '对', py: 'duì', en: 'right, correct', level: 2, no: ['dèi', 'dwèi', 'dù'], tip: 'ui sounds like “way”' },
    { zh: '水', py: 'shuǐ', en: 'water', level: 2, no: ['shěi', 'shwěi', 'shǔ'], tip: 'ui sounds like “way”' },
    { zh: '快', py: 'kuài', en: 'fast', level: 2, no: ['kwài', 'kài', 'kuì'], tip: 'uai sounds like “why”' },
    { zh: '绿', py: 'lǜ', en: 'green', level: 2, no: ['lù', 'lì', 'lyù'], tip: 'ü: say “ee” with round lips' },
    { zh: '公', py: 'gōng', en: '(外公) grandpa', level: 2, no: ['gūng', 'gāng', 'gēng'], tip: 'ong sounds like “oong”' },
    { zh: '婆', py: 'pó', en: '(外婆) grandma', level: 2, no: ['pwó', 'póu', 'pú'], tip: 'o after b, p, m, f sounds like “waw”' },
    { zh: '学', py: 'xué', en: 'learn', level: 2, no: ['xüé', 'shué', 'xé'], tip: 'after j, q, x, y: write ue (no dots), say “ü-eh”' },
    { zh: '中', py: 'zhōng', en: 'middle', level: 2, no: ['zhūng', 'jōng', 'zhāng'], tip: 'ong sounds like “oong”' },
    { zh: '去', py: 'qù', en: 'go', level: 2, no: ['qǜ', 'chù', 'kù'], tip: 'after j, q, x, y, the u is really ü (no dots)' },
    { zh: '点', py: 'diǎn', en: "o'clock", level: 2, no: ['diěn', 'dyǎn', 'děn'], tip: 'ian sounds like “yen”' },
    { zh: '多', py: 'duō', en: 'many', level: 2, no: ['dō', 'dōu', 'dwō'], tip: 'uo sounds like “waw”' },
    { zh: '次', py: 'cì', en: 'time (once, twice)', level: 2, no: ['tsì', 'kì', 'zì'], tip: 'c sounds like the “ts” in cats' },
    // ---- 四年级 ----
    { zh: '聪明', py: 'cōng míng', en: 'smart', level: 3, no: ['cōng mín', 'tsōng míng', 'zōng míng'], tip: 'c sounds like the “ts” in cats' },
    { zh: '热', py: 'rè', en: 'hot', level: 3, no: ['lè', 'zhè', 'rù'], tip: 'r: curl your tongue, a bit like the “s” in measure' },
    { zh: '渴', py: 'kě', en: 'thirsty', level: 3, no: ['gě', 'kǎ', 'kè'], tip: 'e sounds like “uh”; the 3rd tone dips down' },
    { zh: '舅', py: 'jiù', en: "(舅舅) mom's brother", level: 3, no: ['jòu', 'jiò', 'jù'], tip: 'iu sounds like the “yo” in yo-yo' },
    { zh: '贵', py: 'guì', en: 'expensive', level: 3, no: ['gwèi', 'gèi', 'gù'], tip: 'ui sounds like “way”' },
    { zh: '姑', py: 'gū', en: "(姑姑) dad's sister", level: 3, no: ['gōu', 'gōo', 'gē'], tip: 'u sounds like the “oo” in food' },
    { zh: '叔', py: 'shū', en: "(叔叔) dad's younger brother", level: 3, no: ['shōu', 'shōo', 'xū'], tip: 'u sounds like the “oo” in food' },
    { zh: '伯', py: 'bó', en: "(伯伯) dad's older brother", level: 3, no: ['bwó', 'bóu', 'bú'], tip: 'o after b, p, m, f sounds like “waw”' },
    { zh: '姨', py: 'yí', en: "(阿姨) mom's sister", level: 3, no: ['yì', 'yú', 'yé'], tip: 'listen to the tone: yí goes up (2nd tone)' },
    { zh: '堂哥', py: 'táng gē', en: "older boy cousin (dad's side)", level: 3, no: ['tán gē', 'tǎng gē', 'táng kē'], tip: 'ang ends with ng, like “song”' },
    { zh: '表姐', py: 'biǎo jiě', en: "older girl cousin (mom's side)", level: 3, no: ['biǎo jiǎ', 'piǎo jiě', 'bǎo jiě'], tip: 'ie sounds like the “ye” in yes' }
  ],
  /* 问答：level 年级；group 同一组的回答不会拿来当彼此的错答案；who 'teacher' = 史老师说，'kid' = 小朋友说
     {me} = 学生自己的名字、{kid} = 说话的小朋友、{friend} = 好朋友的名字
     {age} {n} {sur} {grade} 会随机换成数字或姓
     拼音里不用写名字；traps = 这一题特别要放的错答案 */
  /* 口头对话的顺序：先打招呼（你好、早上好、下午好、小朋友好）→ 你好吗？你叫什么名字？→ 其他问题
     一回合里的问答题会照这个顺序出 */
  order: ['hello', 'feel', 'name', 'surname', 'age', 'grade', 'family', 'learn', 'friend'],
  /* 连续两题：只用这些「真的会接在一起问」的问题（写问题的中文，一模一样；| 是「或」）
     打招呼、你好吗？不会放进连续两题 */
  pairs: [
    ['你叫什么名字？', '你的好朋友叫什么名字？'],
    ['你叫什么名字？', '你家有几个人？'],
    ['你叫什么名字？', '你几岁？'],
    ['你叫什么名字？', '你姓什么？|你贵姓？'],
    ['你几岁？', '你上几年级？'],
    ['你几岁？', '你家有几个人？'],
    ['你上几年级？', '你学习什么？'],
    ['你家有几个人？', '你的好朋友叫什么名字？']
  ],
  qa: [
    // ---- 二年级 ----
    { level: 1, group: 'hello', who: 'teacher', q: ['小朋友好！', 'xiǎo péng yǒu hǎo!', 'Hello, kids!'], a: ['老师好！', 'lǎo shī hǎo!', 'Hello, teacher!'],
      traps: [['小朋友好！', 'xiǎo péng yǒu hǎo!'], ['再见！', 'zài jiàn!']] },
    { level: 1, group: 'name', who: 'kid', q: ['你好，我叫{kid}。', 'nǐ hǎo, wǒ jiào.', 'Hi, my name is {kid}.'], a: ['你好，我叫{me}。', 'nǐ hǎo, wǒ jiào.', 'Hi, my name is {me}.'],
      traps: [['你好。', 'nǐ hǎo.'], ['我很好。', 'wǒ hěn hǎo.'], ['谢谢你。', 'xiè xie nǐ.']] },
    { level: 1, group: 'name', q: ['你叫什么名字？', 'nǐ jiào shén me míng zì?', "What's your name?"], a: ['我叫{me}。', 'wǒ jiào.', 'My name is {me}.'] },
    { level: 1, group: 'feel', q: ['你好吗？', 'nǐ hǎo ma?', 'How are you?'], feel: true },
    // ---- 三年级 ----
    { level: 2, group: 'hello', who: 'teacher', q: ['早上好！', 'zǎo shàng hǎo!', 'Good morning!'], a: ['早上好！', 'zǎo shàng hǎo!', 'Good morning!'], traps: [['下午好！', 'xià wǔ hǎo!']] },
    { level: 2, group: 'hello', who: 'teacher', q: ['下午好！', 'xià wǔ hǎo!', 'Good afternoon!'], a: ['下午好！', 'xià wǔ hǎo!', 'Good afternoon!'], traps: [['早上好！', 'zǎo shàng hǎo!']] },
    { level: 2, group: 'age', q: ['你几岁？', 'nǐ jǐ suì?', 'How old are you?'], a: ['我{age}岁。', 'wǒ {age} suì.', "I'm {age#} years old."] },
    { level: 2, group: 'family', q: ['你家有几个人？', 'nǐ jiā yǒu jǐ gè rén?', 'How many people are in your family?'], a: ['我家有{n}个人。', 'wǒ jiā yǒu {n} gè rén.', 'There are {n#} people in my family.'] },
    { level: 2, group: 'surname', q: ['你姓什么？', 'nǐ xìng shén me?', "What's your last name?"], a: ['我姓{sur}。', 'wǒ xìng {sur}.', 'My last name is {sur#}.'] },
    { level: 2, group: 'learn', q: ['你学习什么？', 'nǐ xué xí shén me?', 'What do you learn?'], a: ['我学习中文。', 'wǒ xué xí zhōng wén.', 'I learn Chinese.'] },
    { level: 2, group: 'grade', q: ['你上几年级？', 'nǐ shàng jǐ nián jí?', 'What grade are you in?'], a: ['我上{grade}年级。', 'wǒ shàng {grade} nián jí.', "I'm in grade {grade#}."] },
    // ---- 四年级 ----
    { level: 3, group: 'surname', q: ['你贵姓？', 'nǐ guì xìng?', 'May I ask your last name?'], a: ['我姓{sur}。', 'wǒ xìng {sur}.', 'My last name is {sur#}.'] },
    { level: 3, group: 'friend', q: ['你的好朋友叫什么名字？', 'nǐ de hǎo péng yǒu jiào shén me míng zì?', "What's your best friend's name?"], a: ['我的好朋友叫{friend}。', 'wǒ de hǎo péng yǒu jiào.', 'My best friend is {friend}.'] }
  ]
};
