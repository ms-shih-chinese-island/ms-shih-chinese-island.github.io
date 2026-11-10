/* =====================================================================
   单元：花园 Garden（主岛 → 花园）
   ---------------------------------------------------------------------
   游戏：
     1 花园里的虫 games/animals.html?unit=garden
     2 我怕／我不怕 games/pa.html?unit=garden
   课纲：三年级 3 月昆虫（9 种）、颜色、我怕／不怕、大／小
   拼音照台湾的念法。
   ===================================================================== */
window.UNIT = {};

/* ---------------- 花园里的虫 ----------------
   Level 1：「这是红色的瓢虫。」点对的（每一种只画一个）
   Level 2：「我喜欢黄色的蝴蝶和绿色的蜻蜓。」两个都要点到
   Level 3：「我看到两只蓝色的蝴蝶和三只黑色的蚂蚁。」两样都要点刚好的数量（画面上的都比要的多；别的也画好几个，不能看数量猜）
   三级都有拼音。答对 target 题就马上结束、给金币
   animals：动物、拼音、英文、可以有的颜色（colors 里面的名字）；图在 shared/animals.js */
UNIT.animals = {
  title: { zh: '花园里的虫', py: 'huā yuán lǐ de chóng', en: 'Bugs in the Garden' },
  scene: 'garden',
  time: [60, 60, 90],
  target: [6, 6, 6],
  mw: { zh: '只', py: 'zhī' },
  nums: [ { zh: '一', py: 'yì' }, { zh: '两', py: 'liǎng' }, { zh: '三', py: 'sān' } ],
  colors: [
    { zh: '黑色', py: 'hēi sè', hex: '#3A3A3A' }, { zh: '白色', py: 'bái sè', hex: '#FFFFFF' }, { zh: '橙色', py: 'chéng sè', hex: '#F28C28' },
    { zh: '黄色', py: 'huáng sè', hex: '#F5C531' }, { zh: '蓝色', py: 'lán sè', hex: '#3B78D8' }, { zh: '红色', py: 'hóng sè', hex: '#E5483B' },
    { zh: '绿色', py: 'lǜ sè', hex: '#45A852' }, { zh: '紫色', py: 'zǐ sè', hex: '#8E5CC2' }
  ],
  animals: [
    { zh: '蝴蝶', py: 'hú dié', en: 'butterfly', colors: ['黄色', '蓝色', '橙色', '紫色'] },
    { zh: '瓢虫', py: 'piáo chóng', en: 'ladybug', colors: ['红色', '黄色', '橙色'] },
    { zh: '蜻蜓', py: 'qīng tíng', en: 'dragonfly', colors: ['蓝色', '绿色', '红色'] },
    { zh: '蚂蚁', py: 'mǎ yǐ', en: 'ant', colors: ['黑色', '红色'] }
  ],
};

/* ---------------- 我怕／我不怕 ----------------
   看小朋友的脸（害怕／不怕）和虫的图。课纲三年级 3 月：我怕／不怕、大／小
   Level 1：「我＿＿蜜蜂。」选怕／不怕
   Level 2：「我＿＿＿＿。」怕／不怕 ＋ 选对的虫
   Level 3：同一种画一大一小，每一只旁边一张脸（一张害怕、一张不怕）。「我怕大蜜蜂，我不怕小蜜蜂。」选怕／不怕、大／小（左边先说） */
UNIT.pa = {
  title: { zh: '我怕／我不怕', py: 'wǒ pà / wǒ bú pà', en: "Afraid or Not?" },
  scene: 'garden',
  time: [60, 90, 120],
  target: [8, 6, 6],
  things: [
    { zh: '蝴蝶', py: 'hú dié', en: 'butterfly', c: '#F5C531' }, { zh: '蟋蟀', py: 'xī shuài', en: 'cricket' },
    { zh: '蚊子', py: 'wén zi', en: 'mosquito' }, { zh: '蚂蚁', py: 'mǎ yǐ', en: 'ant', c: '#3A3A3A' },
    { zh: '瓢虫', py: 'piáo chóng', en: 'ladybug', c: '#E5483B' }, { zh: '苍蝇', py: 'cāng yíng', en: 'fly' },
    { zh: '萤火虫', py: 'yíng huǒ chóng', en: 'firefly' }, { zh: '蜜蜂', py: 'mì fēng', en: 'bee' },
    { zh: '蜻蜓', py: 'qīng tíng', en: 'dragonfly', c: '#3B78D8' }
  ]
};
