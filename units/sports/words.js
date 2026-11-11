/* =====================================================================
   单元：运动场 Sports Field（主岛 → 运动场）
   ---------------------------------------------------------------------
   游戏：
     1 我喜欢打球     games/sportstalk.html?unit=sports   我喜欢＿＿。我最棒的是＿＿。我不会＿＿。我想学＿＿。
     2 谁在打什么球？ games/whoball.html?unit=sports      ＿＿在打＿＿。穿＿＿色衣服的＿＿。有几个人在＿＿？
   课纲：四年级 4 月 球类运动（9 种）、我喜欢／我最棒是／我不会／我想学习
   图在 shared/sports-art.js。拼音照台湾的念法。
   ===================================================================== */
window.UNIT = {};

// 9 种球类运动：verb 是「打」或「踢」（踢足球）
UNIT.sports = [
  { ball: '棒球', py: 'bàng qiú', verb: '打', en: 'baseball' },
  { ball: '篮球', py: 'lán qiú', verb: '打', en: 'basketball' },
  { ball: '橄榄球', py: 'gǎn lǎn qiú', verb: '打', en: 'football' },
  { ball: '排球', py: 'pái qiú', verb: '打', en: 'volleyball' },
  { ball: '足球', py: 'zú qiú', verb: '踢', en: 'soccer' },
  { ball: '乒乓球', py: 'pīng pāng qiú', verb: '打', en: 'table tennis' },
  { ball: '网球', py: 'wǎng qiú', verb: '打', en: 'tennis' },
  { ball: '冰球', py: 'bīng qiú', verb: '打', en: 'ice hockey' },
  { ball: '保龄球', py: 'bǎo líng qiú', verb: '打', en: 'bowling' }
];
UNIT.verbs = { 打: 'dǎ', 踢: 'tī' };

/* ---------------- 我喜欢打球 ----------------
   小朋友的运动卡有四行：❤ 喜欢、⭐ 最棒、✗ 不会、📖 想学，每一行一种球。
   Level 1「我喜欢＿＿。」看 ❤ 那一行，选对的运动（例如「打篮球」）
   Level 2 句子开头不一样（我喜欢／我最棒的是／我不会／我想学），看是哪一行，再选运动
   Level 3 卡片上亮起一行，自己选句子开头＋打／踢＋球，拼出整句
   答对 target 题就马上结束、给金币（1/2/3） */
UNIT.sportstalk = {
  title: { zh: '我喜欢打球', py: 'wǒ xǐ huān dǎ qiú', en: 'Sports I Like' },
  time: [60, 90, 120],
  target: [8, 8, 6],
  rows: [
    { k: 'like', zh: '我喜欢', py: 'wǒ xǐ huān', en: 'I like' },
    { k: 'best', zh: '我最棒的是', py: 'wǒ zuì bàng de shì', en: 'I am best at' },
    { k: 'cant', zh: '我不会', py: 'wǒ bú huì', en: "I can't" },
    { k: 'learn', zh: '我想学', py: 'wǒ xiǎng xué', en: 'I want to learn' }
  ]
};

/* ---------------- 谁在打什么球？ ----------------
   运动场上有几个家人，每个人拿着一种球（头上有名字，衣服有颜色）。
   Level 1「哥哥在打篮球。」点对的人（每个称呼只有一个人）
   Level 2 加颜色「穿红色衣服的哥哥在打篮球。」点对的人（有同一个称呼、别的颜色的人，也有同一个颜色、别的称呼的人）
   Level 3 题目只说颜色「穿蓝色衣服的人在打什么球？有几个人？」找人、看球、数人数，拼出「有三个人在踢足球。」
           （同一种球也有别的颜色的人在打，不能只数球）
   答对 target 题就马上结束、给金币（1/2/3） */
UNIT.whoball = {
  title: { zh: '谁在打什么球？', py: 'shéi zài dǎ shén me qiú?', en: 'Who Plays What?' },
  time: [60, 75, 90],
  target: [8, 8, 6],
  people: [
    { zh: '爸爸', py: 'bà ba', kind: 'man' }, { zh: '妈妈', py: 'mā ma', kind: 'woman' },
    { zh: '哥哥', py: 'gē ge', kind: 'boy' }, { zh: '姐姐', py: 'jiě jie', kind: 'girl' },
    { zh: '弟弟', py: 'dì di', kind: 'boy', small: true }, { zh: '妹妹', py: 'mèi mei', kind: 'girl', small: true },
    { zh: '爷爷', py: 'yé ye', kind: 'oldman' }, { zh: '奶奶', py: 'nǎi nai', kind: 'oldwoman' }
  ],
  colors: [
    { zh: '红色', py: 'hóng sè', hex: '#E5483B' }, { zh: '黄色', py: 'huáng sè', hex: '#F5C531' }, { zh: '绿色', py: 'lǜ sè', hex: '#45A852' },
    { zh: '蓝色', py: 'lán sè', hex: '#3B78D8' }, { zh: '紫色', py: 'zǐ sè', hex: '#9B6BC9' }, { zh: '橙色', py: 'chéng sè', hex: '#F28C28' }
  ],
  nums: [{ zh: '一', py: 'yí' }, { zh: '两', py: 'liǎng' }, { zh: '三', py: 'sān' }, { zh: '四', py: 'sì' }]
};
