/* =====================================================================
   单元：万圣节 Halloween（节日岛 → 鬼屋）
   ---------------------------------------------------------------------
   这个资料夹只有资料。鬼屋的游戏都读这一份。
   难度 level：1 = 二年级、2 = 三年级、3 = 四年级。
   每个年级都包含前面年级的字，只会多、不会少。

   生词库（words）每个字一行，栏位：
     zh     中文（简体）
     py     拼音，字和字之间空一格
     en     英文
     side   颜色：'night' = 紫色（万圣节）
     level  难度（1 = 二年级、2 = 三年级、3 = 四年级）
   加新字：复制一行，改内容就好。注意每行最后的逗号。
   ===================================================================== */
window.UNIT = {};

/* 游戏名称 */
UNIT.matchTitle = { zh: '万圣节配对', py: 'wàn shèng jié pèi duì', en: 'Halloween Matching' };

/* 每一级冰淇淋的说明（按钮上的小字） */
UNIT.levels = [
  { note: '' },
  { note: '' },
  { note: '' }
];

/* 生词库 */
UNIT.words = [
  // ---- 二年级 ----
  { zh: '南瓜',       py: 'nán guā',                en: 'pumpkin',          side: 'night', level: 1 },
  { zh: '南瓜灯',     py: 'nán guā dēng',           en: "jack-o'-lantern",  side: 'night', level: 1, trad: '南瓜燈' },
  { zh: '蝙蝠',       py: 'biān fú',                en: 'bat',              side: 'night', level: 1 },
  { zh: '巫婆',       py: 'wū pó',                  en: 'witch',            side: 'night', level: 1 },
  { zh: '鬼',         py: 'guǐ',                    en: 'ghost',            side: 'night', level: 1 },
  { zh: '黑猫',       py: 'hēi māo',                en: 'black cat',        side: 'night', level: 1, trad: '黑貓' },
  { zh: '蜘蛛',       py: 'zhī zhū',                en: 'spider',           side: 'night', level: 1 },
  { zh: '怪物',       py: 'guài wù',                en: 'monster',          side: 'night', level: 1 },
  { zh: '万圣节快乐', py: 'wàn shèng jié kuài lè',  en: 'Happy Halloween',  side: 'night', level: 1, trad: '萬聖節快樂' },
  { zh: '鬼屋',       py: 'guǐ wū',                 en: 'haunted house',    side: 'night', level: 1 },

  // ---- 三年级 ----
  { zh: '糖果',       py: 'táng guǒ',               en: 'candy',            side: 'night', level: 2 },
  { zh: '骨头',       py: 'gǔ tou',                 en: 'bones',            side: 'night', level: 2, trad: '骨頭' },
  { zh: '化妆舞会',   py: 'huà zhuāng wǔ huì',      en: 'costume party',    side: 'night', level: 2, trad: '化妝舞會' },

  // ---- 四年级 ----
  { zh: '吸血鬼',     py: 'xī xuè guǐ',             en: 'vampire',          side: 'night', level: 3 },
  { zh: '猫头鹰',     py: 'māo tóu yīng',           en: 'owl',              side: 'night', level: 3, trad: '貓頭鷹' },
  { zh: '面具',       py: 'miàn jù',                en: 'mask',             side: 'night', level: 3 },
  { zh: '给糖或捣蛋', py: 'gěi táng huò dǎo dàn',   en: 'trick or treat',   side: 'night', level: 3, trad: '給糖或搗蛋' }
];

/* 句型（以后「看图选句子」的游戏会用到） */
UNIT.patterns = [
  { level: 1, q: { zh: '你看到＿＿？',       py: 'nǐ kàn dào ＿＿?',          en: 'You see ＿＿?' },
              a: { zh: '是。／不是。',       py: 'shì. / bú shì.',            en: 'Yes. / No.' } },
  { level: 1, q: { zh: '你看到什么？',       py: 'nǐ kàn dào shén me?',       en: 'What do you see?' },
              a: { zh: '我看到＿＿。',       py: 'wǒ kàn dào ＿＿.',          en: 'I see ＿＿.' } },
  { level: 1, a: { zh: '我怕。／我不怕。',   py: 'wǒ pà. / wǒ bú pà.',        en: "I'm scared. / I'm not scared." } },
  { level: 2, q: { zh: '鬼屋里有＿＿？',     py: 'guǐ wū li yǒu ＿＿?',       en: 'Is there ＿＿ in the haunted house?' },
              a: { zh: '是。／不是。',       py: 'shì. / bú shì.',            en: 'Yes. / No.' } },
  { level: 2, q: { zh: '鬼屋里有什么？',     py: 'guǐ wū li yǒu shén me?',    en: 'What is in the haunted house?' },
              a: { zh: '鬼屋里有＿＿。',     py: 'guǐ wū li yǒu ＿＿.',       en: 'There is ＿＿ in the haunted house.' } },
  { level: 3, a: { zh: '万圣节来了，我要当＿＿。', py: 'wàn shèng jié lái le, wǒ yào dāng ＿＿.', en: 'Halloween is coming. I want to be ＿＿.' } }
];

/* =====================================================================
   鬼屋的四个游戏用的设定
   ===================================================================== */
UNIT.levelIcon = 'ghost';      // 难度用几只鬼

/* 1. 鬼屋窗户 */
UNIT.windows = {
  title: { zh: '鬼屋窗户', py: 'guǐ wū chuāng hu', en: 'Haunted House Windows' },
  count: 7,                     // 几扇窗户
  yesNoLevels: [1],             // 这些等级问是非题：鬼屋里有＿＿？是／不是
  // 是非题
  yesNoQ: { zh: '鬼屋里有{x}？', py: 'guǐ wū li yǒu {x}?', en: 'Is there {x} in the haunted house?' },
  yes:    { zh: '是。',   py: 'shì.',    en: 'Yes.' },
  no:     { zh: '不是。', py: 'bú shì.', en: 'No.' },
  // 开放式问题：鬼屋里有什么？三个句子选一个
  openQ:  { zh: '鬼屋里有什么？', py: 'guǐ wū li yǒu shén me?', en: 'What is in the haunted house?' },
  openA:  { zh: '鬼屋里有{x}。', py: 'guǐ wū li yǒu {x}.', en: 'There is {x} in the haunted house.' },
  skip: ['鬼屋', '万圣节快乐', '给糖或捣蛋', '化妆舞会']   // 这些字不会出现在窗户里
};

/* 2. 我看到 */
UNIT.spy = {
  title: { zh: '我看到', py: 'wǒ kàn dào', en: 'I See' },
  count: 6,                     // 几个圆圈
  frame: { zh: '我看到{x}。', py: 'wǒ kàn dào {x}.', en: 'I see {x}.' },
  question: { zh: '你看到什么？', py: 'nǐ kàn dào shén me?', en: 'What do you see?' },
  cards: 6,                     // 下面放几张字卡
  skip: ['鬼屋', '万圣节快乐', '给糖或捣蛋', '化妆舞会']
};

/* 3. 化妆舞会 */
UNIT.dressup = {
  title: { zh: '化妆舞会', py: 'huà zhuāng wǔ huì', en: 'Costume Party' },
  frame: { zh: '万圣节来了，我要当{x}。', py: 'wàn shèng jié lái le, wǒ yào dāng {x}.', en: 'Halloween is coming. I want to be {x}.' },
  costumes: ['巫婆', '吸血鬼', '鬼', '怪物', '黑猫', '蝙蝠', '南瓜', '南瓜灯', '蜘蛛', '猫头鹰'],
  distractors: ['糖果', '骨头', '面具'],    // 不能当装扮的字（干扰用）
  distractorLevels: [2, 3]                  // 这些等级会多放干扰字卡
};

/* 4. 我怕／我不怕 */
UNIT.afraid = {
  title: { zh: '我怕／我不怕', py: 'wǒ pà / wǒ bú pà', en: "I'm afraid / I'm not afraid" },
  rounds: 6,                    // 几题
  choices: 4,                   // 东西的字卡几张（1 张对的 + 干扰）
  me:    { zh: '我',   py: 'wǒ' },
  pa:    { zh: '怕',   py: 'pà',    en: "I'm afraid of ___." },
  bupa:  { zh: '不怕', py: 'bú pà', en: "I'm not afraid of ___." },
  skip: ['鬼屋', '万圣节快乐', '给糖或捣蛋', '化妆舞会', '面具', '糖果']
};
