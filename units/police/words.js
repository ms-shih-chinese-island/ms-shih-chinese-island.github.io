/* =====================================================================
   单元：公安局 Police Station（主岛 → 公安局）
   ---------------------------------------------------------------------
   游戏：
     1 找家人 games/seek.html?unit=police
     2 失物招领 games/lostfound.html?unit=police
     3 在哪里 games/where.html?unit=police
   人物的图在 shared/npcs.js（NPC_ART.person）。拼音照台湾的念法。
   ===================================================================== */
window.UNIT = {};

/* 衣服的颜色 */
UNIT.colors = [
  { zh: '红色',   py: 'hóng sè',     hex: '#E5483B' },
  { zh: '黄色',   py: 'huáng sè',    hex: '#F5C531' },
  { zh: '蓝色',   py: 'lán sè',      hex: '#3B78D8' },
  { zh: '绿色',   py: 'lǜ sè',       hex: '#45A852' },
  { zh: '橙色',   py: 'chéng sè',    hex: '#F28C28' },
  { zh: '紫色',   py: 'zǐ sè',       hex: '#8E5CC2' },
  { zh: '粉红色', py: 'fěn hóng sè', hex: '#F49AC1' }
];

/* ---------------- 找家人 ----------------
   迷路的小朋友在公安局说「我找……」，学生在一排人里点对的人。称呼随着年级变难：
   Level 1（二年级）：爸爸、妈妈、哥哥、姐姐、弟弟、妹妹。「我找我的妈妈，她穿红色的衣服。」点对的人
   Level 2（三年级）：爷爷、奶奶、外公、外婆。「我找我爸爸的爸爸，他穿蓝色的衣服。」点对的人，再填「找到了，他是我的＿＿。」
   Level 3（四年级）：伯伯、叔叔、姑姑、舅舅、阿姨。「我找我妈妈的哥哥，他戴眼镜。」点对的人，再填「找到了，他是我的＿＿。」
   titles：每一级的称呼；kind = 画哪一种人；he = 他／她；rel = 小朋友怎么说（Level 2、3 不直接说称呼）
   rounds：一回合几题；time：每一级几秒 */
UNIT.seek = {
  title: { zh: '找家人', py: 'zhǎo jiā rén', en: 'Find My Family' },
  rounds: 5,
  time: [60, 60, 60],
  titles: [
    [ { zh: '爸爸', py: 'bà ba',   kind: 'man',   he: 'm' }, { zh: '妈妈', py: 'mā ma',   kind: 'woman', he: 'f' },
      { zh: '哥哥', py: 'gē ge',   kind: 'teenboy', he: 'm' }, { zh: '姐姐', py: 'jiě jie', kind: 'teengirl', he: 'f' },
      { zh: '弟弟', py: 'dì di',   kind: 'boy',   he: 'm' }, { zh: '妹妹', py: 'mèi mei', kind: 'girl',  he: 'f' } ],
    [ { zh: '爷爷', py: 'yé ye',    kind: 'oldman',   he: 'm', rel: [{ zh: '爸爸的爸爸', py: 'bà ba de bà ba' }] },
      { zh: '奶奶', py: 'nǎi nai',  kind: 'oldwoman', he: 'f', rel: [{ zh: '爸爸的妈妈', py: 'bà ba de mā ma' }] },
      { zh: '外公', py: 'wài gōng', kind: 'oldman',   he: 'm', rel: [{ zh: '妈妈的爸爸', py: 'mā ma de bà ba' }] },
      { zh: '外婆', py: 'wài pó',   kind: 'oldwoman', he: 'f', rel: [{ zh: '妈妈的妈妈', py: 'mā ma de mā ma' }] } ],
    [ { zh: '伯伯', py: 'bó bo',   kind: 'man',   he: 'm', rel: [{ zh: '爸爸的哥哥', py: 'bà ba de gē ge' }] },
      { zh: '叔叔', py: 'shū shu', kind: 'man',   he: 'm', rel: [{ zh: '爸爸的弟弟', py: 'bà ba de dì di' }] },
      { zh: '姑姑', py: 'gū gu',   kind: 'woman', he: 'f', rel: [{ zh: '爸爸的姐姐', py: 'bà ba de jiě jie' }, { zh: '爸爸的妹妹', py: 'bà ba de mèi mei' }] },
      { zh: '舅舅', py: 'jiù jiu', kind: 'man',   he: 'm', rel: [{ zh: '妈妈的哥哥', py: 'mā ma de gē ge' }, { zh: '妈妈的弟弟', py: 'mā ma de dì di' }] },
      { zh: '阿姨', py: 'ā yí',    kind: 'woman', he: 'f', rel: [{ zh: '妈妈的姐姐', py: 'mā ma de jiě jie' }, { zh: '妈妈的妹妹', py: 'mā ma de mèi mei' }] } ]
  ]
};

/* ---------------- 失物招领 ----------------
   小朋友来公安局说「我的＿＿不见了」，学生在失物箱里点对的东西，东西就飞回给他。
   Level 1：「我的帽子不见了。」失物箱里每样东西只有一个
   Level 2：「我的黄色铅笔不见了。」同一样东西有好几个颜色；后三题难一点，用「和」说两样东西：「我的红色帽子和蓝色雨伞不见了。」
   Level 3：两句，各有数量：「我的两支红色铅笔不见了。我的一个蓝色书包也不见了。」（数量 1～3，量词：顶、个、把、支）
            失物箱里每一堆都是 1～3 个（不能看哪一堆最多），对的那一堆有时刚好、有时多一个，要数对
   三级都有拼音。图在 units/police/art.js
   items：东西、量词 */
UNIT.lostfound = {
  title: { zh: '失物招领', py: 'shī wù zhāo lǐng', en: 'Lost and Found' },
  rounds: 6,
  time: [60, 60, 60],
  items: [
    { zh: '帽子', py: 'mào zi',   mw: { zh: '顶', py: 'dǐng' } },
    { zh: '书包', py: 'shū bāo',  mw: { zh: '个', py: 'gè' } },
    { zh: '雨伞', py: 'yǔ sǎn',   mw: { zh: '把', py: 'bǎ' } },
    { zh: '铅笔', py: 'qiān bǐ',  mw: { zh: '支', py: 'zhī' } },
    { zh: '水壶', py: 'shuǐ hú',  mw: { zh: '个', py: 'gè' } },
    { zh: '球',   py: 'qiú',      mw: { zh: '个', py: 'gè' } }
  ],
  counts: [{ zh: '两', py: 'liǎng', n: 2 }, { zh: '三', py: 'sān', n: 3 }]
};

/* ---------------- ＿＿在哪里？ ----------------
   迷路的小朋友来公安局问路，学生在地图上点对的地方，再回答他。
   Level 1：「请问，医院在哪里？」点对的地方
   Level 2：小朋友身边有黄色虚线圈。点对的地方，再选这里／那里：「医院在这里。」「学校在那里。」（地方已经放好）
   Level 3：「请问，银行在哪里？学校在哪里？」按顺序点两个地方，再把地方放进「＿在这里，＿在那里。」（这里、那里已经放好）
            小朋友站在地图上，身边有黄色虚线圈：圈里面的地方 = 这里，圈外面的 = 那里（一个在圈里、一个在圈外）
   答对 target 题就马上结束，给金币；时间到了还没达标就没有金币
   地方的图在 shared/places.js（公安局自己不放）。三级都有拼音
   time：每一级几秒；target：每一级要答对几题 */
UNIT.where = {
  title: { zh: '在哪里？', py: 'zài nǎ lǐ', en: 'Where Is It?' },
  time: [60, 60, 60],
  target: [6, 6, 6],
  words: {
    zai:   { zh: '在',   py: 'zài' },
    here:  { zh: '这里', py: 'zhè lǐ' },     // 台湾常说「这里、那里」（不说这儿、那儿）
    there: { zh: '那里', py: 'nà lǐ' },
    where: { zh: '哪里', py: 'nǎ lǐ' }
  }
};
