/* =====================================================================
   单元：水族馆 Aquarium（主岛 → 水族馆）
   ---------------------------------------------------------------------
   游戏：
     1 在水族馆   games/animals.html?unit=aquarium   「这是＿＿。」「我喜欢＿＿和＿＿。」「在水族馆，我看到＿＿。」
     2 我怕／我不怕 games/pa.html?unit=aquarium
   课纲：四年级 6 月水族馆（鲸鱼、海豚、螃蟹、鲨鱼、水母、海龟、海星、章鱼）、我怕／不怕
   拼音照台湾的念法。图在 shared/animals.js
   ===================================================================== */
window.UNIT = {};

const SEA = [
  { zh: '鲸鱼', py: 'jīng yú', en: 'whale' }, { zh: '海豚', py: 'hǎi tún', en: 'dolphin' },
  { zh: '螃蟹', py: 'páng xiè', en: 'crab' }, { zh: '鲨鱼', py: 'shā yú', en: 'shark' },
  { zh: '水母', py: 'shuǐ mǔ', en: 'jellyfish' }, { zh: '海龟', py: 'hǎi guī', en: 'sea turtle' },
  { zh: '海星', py: 'hǎi xīng', en: 'starfish' }, { zh: '章鱼', py: 'zhāng yú', en: 'octopus' }
];

/* ---------------- 在水族馆 ----------------
   Level 1：「这是鲸鱼。」点对的（每一种只画一个）
   Level 2：「我喜欢海豚和海龟。」两个都要点到
   Level 3：「在水族馆，我看到两只鲨鱼和一只章鱼。」两样都要点刚好的数量（画面上的都比要的多；别的也画好几个，不能看数量猜）
   三级都有拼音。答对 target 题就马上结束、给金币 */
UNIT.animals = {
  title: { zh: '在水族馆', py: 'zài shuǐ zú guǎn', en: 'At the Aquarium' },
  scene: 'sea',
  lead: { zh: '在水族馆，', py: 'zài shuǐ zú guǎn,' },     // Level 3 句子前面加的
  time: [60, 60, 90],
  target: [6, 6, 6],
  mw: { zh: '只', py: 'zhī' },
  nums: [ { zh: '一', py: 'yì' }, { zh: '两', py: 'liǎng' }, { zh: '三', py: 'sān' } ],
  colors: null,
  animals: SEA
};

/* ---------------- 我怕／我不怕 ----------------
   看小朋友的脸（害怕／不怕）和图。
   Level 1：「我＿＿鲨鱼。」选怕／不怕
   Level 2：「我＿＿＿＿。」怕／不怕 ＋ 选对的动物
   Level 3：同一种画一大一小，每一只旁边一张脸（一张害怕、一张不怕）。「我怕大鲨鱼，我不怕小鲨鱼。」选怕／不怕、大／小（左边先说） */
UNIT.pa = {
  title: { zh: '我怕／我不怕', py: 'wǒ pà / wǒ bú pà', en: "Afraid or Not?" },
  scene: 'sea',
  time: [60, 90, 120],
  target: [8, 6, 6],
  things: SEA
};
