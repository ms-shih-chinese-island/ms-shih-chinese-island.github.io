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

UNIT.matchTitle = { zh: '认字配对', py: 'rèn zì pèi duì', en: 'Pinyin Match' };
UNIT.matchMax = 12;            // 每次最多配几组；字比较多的时候，每次随机挑

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
