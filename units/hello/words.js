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

/* 拼音小侦探：看一个字，选对的拼音。错的选项是用英文拼读规则最容易拼错的样子
   sounds：每一个容易搞混的音
     key   这一题在练的拼音（提示会把它标出来）
     tip   提示：这个音像英文的什么
     words 用这个音出题的字：zh 字、en 意思、py 对的拼音、no 错的拼音（3 个）
   一回合挑 count 个不同的音，每个音挑一个字出题。要加新的音，复制一组改内容就好。 */
UNIT.detective = {
  title: { zh: '拼音小侦探', py: 'pīn yīn xiǎo zhēn tàn', en: 'Pinyin Detective' },
  count: 10,          // 一回合几题（每题是不同的音）
  sounds: [
    { key: 'q',  tip: 'q sounds like the “ch” in cheese', words: [
      { zh: '七', en: 'seven',    py: 'qī',    no: ['chī', 'kī', 'jī'] },
      { zh: '千', en: 'thousand', py: 'qiān',  no: ['chiān', 'kiān', 'jiān'] } ] },
    { key: 'x',  tip: 'x sounds like the “sh” in she', words: [
      { zh: '小', en: 'small',    py: 'xiǎo',  no: ['shiǎo', 'siǎo', 'jiǎo'] },
      { zh: '谢', en: 'thank',    py: 'xiè',   no: ['shiè', 'siè', 'qiè'] } ] },
    { key: 'c',  tip: 'c sounds like the “ts” in cats', words: [
      { zh: '聪', en: 'smart (聪明)', py: 'cōng', no: ['tsōng', 'kōng', 'zōng'] },
      { zh: '次', en: 'time (一次)',  py: 'cì',   no: ['tsì', 'kì', 'zì'] } ] },
    { key: 'e',  tip: 'e sounds like “uh”', words: [
      { zh: '饿', en: 'hungry',   py: 'è',     no: ['à', 'ò', 'ù'] },
      { zh: '热', en: 'hot',      py: 'rè',    no: ['rà', 'rò', 'rù'] } ] },
    { key: 'ai', tip: 'ai sounds like “eye”', words: [
      { zh: '白', en: 'white',    py: 'bái',   no: ['béi', 'bí', 'bā'] },
      { zh: '爱', en: 'love',     py: 'ài',    no: ['èi', 'ì', 'à'] } ] },
    { key: 'ei', tip: 'ei sounds like the “ay” in day', words: [
      { zh: '黑', en: 'black',    py: 'hēi',   no: ['hāi', 'hī', 'hē'] },
      { zh: '妹', en: 'younger sister', py: 'mèi', no: ['mài', 'mì', 'mè'] } ] },
    { key: 'iu', tip: 'iu sounds like the “yo” in yo-yo', words: [
      { zh: '九', en: 'nine',     py: 'jiǔ',   no: ['jǒu', 'jiǒ', 'jǔ'] },
      { zh: '六', en: 'six',      py: 'liù',   no: ['lòu', 'liò', 'lù'] },
      { zh: '舅', en: "mom's brother (舅舅)", py: 'jiù', no: ['jòu', 'jiò', 'jù'] } ] },
    { key: 'ui', tip: 'ui sounds like “way”', words: [
      { zh: '对', en: 'correct',  py: 'duì',   no: ['dèi', 'dwèi', 'dù'] },
      { zh: '鬼', en: 'ghost',    py: 'guǐ',   no: ['gwěi', 'gěi', 'gǔ'] },
      { zh: '贵', en: 'expensive', py: 'guì',  no: ['gwèi', 'gèi', 'gù'] },
      { zh: '水', en: 'water',    py: 'shuǐ',  no: ['shěi', 'shwěi', 'shǔ'] } ] },
    { key: 'uai', tip: 'uai sounds like “why”', words: [
      { zh: '怪', en: 'monster (怪物)', py: 'guài', no: ['gwài', 'gài', 'guì'] },
      { zh: '快', en: 'fast, happy (快乐)', py: 'kuài', no: ['kwài', 'kài', 'kuì'] } ] },
    { key: 'ü',  tip: 'ü: say “ee” with round lips', words: [
      { zh: '绿', en: 'green',    py: 'lǜ',    no: ['lù', 'lì', 'lyù'] },
      { zh: '女', en: 'girl, female', py: 'nǚ', no: ['nǔ', 'nǐ', 'nyǔ'] } ] },
    { key: 'u',  tip: 'u sounds like the “oo” in food', words: [
      { zh: '姑', en: "dad's sister (姑姑)", py: 'gū', no: ['gōu', 'gōo', 'gē'] },
      { zh: '叔', en: "dad's younger brother (叔叔)", py: 'shū', no: ['shōu', 'shōo', 'xū'] } ] },
    { key: 'a',  tip: 'a sounds like “ah”', words: [
      { zh: '爸', en: 'dad (爸爸)', py: 'bà',  no: ['bò', 'bè', 'bài'] },
      { zh: '妈', en: 'mom (妈妈)', py: 'mā',  no: ['mō', 'mē', 'māi'] } ] },
    { key: 'ong', tip: 'ong sounds like “oong”', words: [
      { zh: '公', en: "grandpa (外公)", py: 'gōng', no: ['gūng', 'gāng', 'gēng'] },
      { zh: '中', en: 'middle, China (中文)', py: 'zhōng', no: ['zhūng', 'jōng', 'zhāng'] } ] },
    { key: 'o',  tip: 'o after b, p, m, f sounds like “waw”', words: [
      { zh: '婆', en: "grandma (外婆)", py: 'pó', no: ['pwó', 'póu', 'pú'] },
      { zh: '伯', en: "dad's older brother (伯伯)", py: 'bó', no: ['bwó', 'bóu', 'bú'] } ] },
    { key: 'ie', tip: 'ie sounds like the “ye” in yes', words: [
      { zh: '姐', en: 'older sister (姐姐)', py: 'jiě', no: ['jěi', 'jǐ', 'jiǎ'] },
      { zh: '谢', en: 'thank (谢谢)', py: 'xiè', no: ['xèi', 'xì', 'shiè'] } ] },
    { key: 'üe', tip: 'after j, q, x, y: write ue (no dots), say “ü-eh”', words: [
      { zh: '学', en: 'learn (学校)', py: 'xué', no: ['xüé', 'shué', 'xé'] },
      { zh: '月', en: 'moon, month', py: 'yuè', no: ['yüè', 'yè', 'ywè'] } ] },
    { key: 'ü→u', tip: 'after j, q, x, y, the u is really ü (no dots)', words: [
      { zh: '去', en: 'go',       py: 'qù',    no: ['qǜ', 'chù', 'kù'] },
      { zh: '鱼', en: 'fish',     py: 'yú',    no: ['yǘ', 'yóu', 'yí'] } ] },
    { key: 'ian', tip: 'ian sounds like “yen”', words: [
      { zh: '天', en: 'sky, day', py: 'tiān',  no: ['tiēn', 'tyān', 'tēn'] },
      { zh: '点', en: "o'clock, dot", py: 'diǎn', no: ['diěn', 'dyǎn', 'děn'] } ] },
    { key: 'i', tip: 'after zh, ch, sh, r, z, c, s, the i is NOT “ee”', words: [
      { zh: '日', en: 'sun, day', py: 'rì',    no: ['rè', 'zhì', 'ruì'] },
      { zh: '是', en: 'is, yes',  py: 'shì',   no: ['shè', 'xì', 'shrì'] } ] },
    { key: 'uo', tip: 'uo sounds like “waw”', words: [
      { zh: '我', en: 'I, me',    py: 'wǒ',    no: ['wǎ', 'wǔ', 'wǒu'] },
      { zh: '多', en: 'many',     py: 'duō',   no: ['dō', 'dōu', 'dwō'] } ] },
    { key: 'r',  tip: 'r: curl your tongue, a bit like the “s” in measure', words: [
      { zh: '人', en: 'person',   py: 'rén',   no: ['lén', 'zhén', 'rún'] },
      { zh: '热', en: 'hot',      py: 'rè',    no: ['lè', 'zhè', 'rù'] } ] },
    { key: 'an', tip: 'an ends with n; ang ends with ng, like “song”', words: [
      { zh: '三', en: 'three',    py: 'sān',   no: ['sāng', 'sēn', 'shān'] },
      { zh: '上', en: 'up, on (早上)', py: 'shàng', no: ['shàn', 'shèng', 'xiàng'] } ] },
    { key: 'ao', tip: 'ao sounds like the “ow” in cow', words: [
      { zh: '好', en: 'good',     py: 'hǎo',   no: ['hǒu', 'hǎu', 'hǒ'] },
      { zh: '猫', en: 'cat',      py: 'māo',   no: ['mōu', 'māu', 'mō'] } ] },
    { key: 'ou', tip: 'ou sounds like the “o” in go', words: [
      { zh: '狗', en: 'dog',      py: 'gǒu',   no: ['gǎo', 'gǒ', 'gǔ'] },
      { zh: '手', en: 'hand',     py: 'shǒu',  no: ['shǎo', 'shǒ', 'xǒu'] } ] },
    { key: 'er', tip: 'er sounds like “are”', words: [
      { zh: '二', en: 'two',      py: 'èr',    no: ['àr', 'òr', 'ùr'] },
      { zh: '儿', en: 'child, son (儿子)', py: 'ér', no: ['ár', 'ór', 'úr'] } ] },
    { key: 'en', tip: 'en sounds like the “un” in fun; eng like the “ung” in lung', words: [
      { zh: '门', en: 'door',     py: 'mén',   no: ['méng', 'mín', 'mán'] },
      { zh: '朋', en: 'friend (朋友)', py: 'péng', no: ['pén', 'póng', 'píng'] } ] }
  ]
};
