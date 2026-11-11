/* =====================================================================
   单元：身体 Body（主岛 → 医院 → 看医生）
   ---------------------------------------------------------------------
   看医生 games/doctor.html?unit=body、候诊室 games/waiting.html?unit=body 读这一份。拼音照台湾的念法。
   只有两级：Level 1 = 二年级（这是我的＿＿）、Level 2 = 三、四年级（我的＿＿痛（疼））。

   身体部位（words）每个一行：
     zh / py / en   中文、拼音、英文（英文给老师看的）
     level          1 = 二年级、2 = 三年级（每一级都包含前面的字）
   注意每行最后的逗号。
   ===================================================================== */
window.UNIT = {};

/* 每一级的说明（Level 按钮上的小字）：两级就好，四年级没有新的身体部位，玩 Level 2 */
UNIT.levels = [
  { note: '这是我的＿＿。' },
  { note: '我的＿＿痛（疼）。' }
];

/* 身体部位 */
UNIT.words = [
  // ---- Level 1（二年级） ----
  { zh: '头',     py: 'tóu',         en: 'head',      level: 1 },
  { zh: '肩膀',   py: 'jiān bǎng',   en: 'shoulder',  level: 1 },
  { zh: '膝盖',   py: 'xī gài',      en: 'knee',      level: 1, trad: '膝蓋' },
  { zh: '脚',     py: 'jiǎo',        en: 'foot',      level: 1, trad: '腳' },
  { zh: '眼睛',   py: 'yǎn jīng',    en: 'eye',       level: 1 },
  { zh: '耳朵',   py: 'ěr duǒ',      en: 'ear',       level: 1 },
  { zh: '嘴巴',   py: 'zuǐ ba',      en: 'mouth',     level: 1 },
  { zh: '鼻子',   py: 'bí zi',       en: 'nose',      level: 1 },
  { zh: '手',     py: 'shǒu',        en: 'hand',      level: 1 },
  // ---- Level 2（三年级）：再加这些 ----
  { zh: '脸',     py: 'liǎn',        en: 'face',      level: 2, trad: '臉' },
  { zh: '脖子',   py: 'bó zi',       en: 'neck',      level: 2 },
  { zh: '手臂',   py: 'shǒu bì',     en: 'arm',       level: 2 },
  { zh: '肚子',   py: 'dù zi',       en: 'belly',     level: 2 },
  { zh: '腿',     py: 'tuǐ',         en: 'leg',       level: 2 },
  { zh: '背',     py: 'bèi',         en: 'back',      level: 2 },
  { zh: '手指头', py: 'shǒu zhǐ tóu', en: 'finger',    level: 2, trad: '手指頭' },
  { zh: '头发',   py: 'tóu fǎ',      en: 'hair',      level: 2, trad: '頭髮', noPain: true },   // noPain：不会「头发痛」，Level 2 只当干扰卡
  { zh: '脚趾头', py: 'jiǎo zhǐ tóu', en: 'toe',      level: 2, trad: '腳趾頭' }
];

/* ---------------- 看医生 ----------------
   一个大大的小病人。一关 8 题，全对才有金币（Level 1／2 给 1／2 颗）。题型混着出：
     pick    看图选字：箭头（Level 1）或疼的地方（Level 2），从 4 个字里选对的放进句子
     read    读句子：Level 1 点出那个地方；Level 2 把 OK 绷贴到疼的地方
     listen  听句子（🔊，不写出来）：一样点出来／贴 OK 绷
   手指头、脚趾头、背只出 pick（其他题型的图会直接告诉答案）。
*/
UNIT.doctor = {
  title: { zh: '看医生', py: 'kàn yī shēng', en: 'See the Doctor' },
  newShare: 0.7,        // Level 2 的题目里，三年级新字大约占多少（0.7 = 七成）
  help: [
    "It's check-up day! Look at the arrow and pick the word. Or read (or listen to) the sentence and tap that part on the kid.",
    'Look where it hurts and pick the word. Or read (or listen to) the sentence and put the bandage where it hurts.'
  ],
  kinds: [
    { pick: 3, read: 3, listen: 2 },
    { pick: 3, read: 3, listen: 2 }
  ],
  say1: { zh: '这是我的{x}。', py: 'zhè shì wǒ de {x}.' },
  say2: { zh: '我的{x}痛（疼）。', py: 'wǒ de {x} tòng téng.' },   // 跟投影片一样用「痛」，括号里写「疼」（括号里的不念）
  done: { zh: '太棒了！', py: 'tài bàng le!' }
};

/* ---------------- 候诊室 ----------------
   一轮 2 个病人，每个人头上一个对话泡泡，泡泡里有空格。学生用拆开的字卡，帮每个人排好句子。
     Level 1：这是／我的／鼻子 → 这是我的鼻子。（健康检查，每个小朋友指着一个地方）
     Level 2：我的／肚子／痛（疼）   → 我的肚子痛（疼）。  （每个病人有一个地方疼）
   两个人的「这是」「我的」「痛（疼）」是一样的卡，差别在身体部位；另外多 1 张陷阱卡（图上没有的部位）。
   people  每一轮几个人      rounds  一关几轮      traps  几张陷阱卡
*/
UNIT.waiting = {
  title: { zh: '候诊室', py: 'hòu zhěn shì', en: 'Waiting Room' },
  newShare: 0.7,        // Level 2：身体部位大约七成用三年级新字
  help: [
    "It's check-up day! Help each kid tell the doctor about one body part. Put the word cards in order. Watch out: some cards don't belong!",
    'Help each patient tell the doctor where it hurts. Put the word cards in order. Watch out: some cards don\'t belong!'
  ],
  people: 1,            // 一张图几个病人
  rounds: 8,            // 一关几张图
  traps: 3,             // 每张图多放几张干扰卡（长得像、位置靠近的部位，见 games/waiting.html 的 LIKE）
  done: { zh: '太棒了！', py: 'tài bàng le!' }
};

/* ---------------- 西门说 Simon Says ----------------
   有「西门说」才点小朋友身上的部位；没有「西门说」就不要点（等 wait 秒，没有点就算对）。
   Level 1「摸摸你的＿＿」（二年级的字）；Level 2「摸摸／指一指你的＿＿」（所有可以点的字）；Level 3 一样，可是只用听的。
   simonShare：有「西门说」的机会（其他的是没有「西门说」的陷阱题）。答对 target 题就马上结束、给金币（1/2/3） */
UNIT.simon = {
  title: { zh: '西门说', py: 'xī mén shuō', en: 'Simon Says' },
  time: [60, 75, 90],
  target: [8, 8, 8],
  wait: 4,
  simonShare: 0.65
};

/* ---------------- 转盘 Wheel of Body Parts ----------------
   转转盘，停在哪一个字，就「指一指你的＿＿」：点小朋友身上那个部位。
   Level 1：first 这 7 个字（一／二年级投影片）有拼音；Level 2：所有可以点的字，有拼音；Level 3：一样，转盘上只有中文。
   答对 target 题就马上结束、给金币（1/2/3） */
UNIT.wheel = {
  title: { zh: '转盘', py: 'zhuàn pán', en: 'Wheel of Body Parts' },
  time: [75, 90, 90],
  target: [6, 6, 6],
  first: ['头', '眼睛', '耳朵', '鼻子', '嘴巴', '手', '脚']
};
