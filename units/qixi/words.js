/* =====================================================================
   单元：七夕情人节（节日岛 → 七夕情人节）
   ---------------------------------------------------------------------
   游戏：
     1 送爱心 games/hearts.html?unit=qixi
   句子：我爱你。我爱我的家人。情人节快乐！＿个心送给你。
   拼音照台湾的念法。人物的图在 shared/npcs.js（NPC_ART.person）
   ===================================================================== */
window.UNIT = {};

/* ---------------- 送爱心 ----------------
   Level 1：一个人头上的爱心写着阿拉伯数字（例如 7）。「＿个心送给你。」选对的中文数字（七）。没有 2（二年级还没学「两」）
   Level 2：「我爱我的家人。把五个心送给妈妈。」或「我爱我的朋友。把五个心送给我的朋友。」点那个人几下，再按「送出」
   Level 3：「穿红色衣服的哥哥，把十二个心送给穿蓝色衣服的妹妹。」先点送的人，再点收的人（数量对），再按「送出」
            画面上有同一个称呼、不同颜色的人，也有同一个颜色、不同称呼的人，要看清楚
   答对 target 题就马上结束、给金币（1/2/3） */
UNIT.hearts = {
  title: { zh: '送爱心', py: 'sòng ài xīn', en: 'Send Hearts' },
  time: [60, 90, 120],
  target: [8, 6, 5],
  max: [10, 10, 15],            // 数字最大到几
  family: [
    { zh: '爸爸', py: 'bà ba', kind: 'man' }, { zh: '妈妈', py: 'mā ma', kind: 'woman' },
    { zh: '哥哥', py: 'gē ge', kind: 'boy' }, { zh: '姐姐', py: 'jiě jie', kind: 'girl' },
    { zh: '弟弟', py: 'dì di', kind: 'boy', small: true }, { zh: '妹妹', py: 'mèi mei', kind: 'girl', small: true },
    { zh: '爷爷', py: 'yé ye', kind: 'oldman' }, { zh: '奶奶', py: 'nǎi nai', kind: 'oldwoman' }
  ],
  // 朋友（Level 2、3 跟家人一起出现：谁送给谁）
  friends: [{ zh: '朋友', py: 'péng yǒu', kind: 'boy' }, { zh: '朋友', py: 'péng yǒu', kind: 'girl' }],
  // Level 3 衣服的颜色
  colors: [
    { zh: '红色', py: 'hóng sè', hex: '#E5483B' }, { zh: '黄色', py: 'huáng sè', hex: '#F5C531' },
    { zh: '绿色', py: 'lǜ sè', hex: '#45A852' }, { zh: '蓝色', py: 'lán sè', hex: '#3B78D8' },
    { zh: '紫色', py: 'zǐ sè', hex: '#9B6BC9' }, { zh: '橙色', py: 'chéng sè', hex: '#F28C28' }
  ]
};

/* ---------------- 送礼物 ----------------
   情人节／节日送礼物：祝你节日快乐！这是我送你的＿＿。（衣服投影片）我想送你＿＿色的＿＿。（课纲）
   Level 1：卡片「这是我送你的帽子。」点对的衣服，放进礼物盒
   Level 2：卡片「我想送你红色的毛衣。」点对的（有同一种衣服别的颜色、同一个颜色别的衣服混淆）
   Level 3：打开礼物盒，看里面的衣服，用字卡排出「这是我送你的红色的毛衣。」再按 Submit
   答对 target 题就马上结束、给金币（1/2/3）。衣服的图在 shared/clothes-art.js */
UNIT.gift = {
  title: { zh: '送礼物', py: 'sòng lǐ wù', en: 'Give a Gift' },
  time: [60, 90, 120],
  target: [8, 6, 5],
  clothes: [
    { zh: 'T恤', py: 'xù' }, { zh: '毛衣', py: 'máo yī' }, { zh: '外套', py: 'wài tào' }, { zh: '球衣', py: 'qiú yī' },
    { zh: '牛仔裤', py: 'niú zǎi kù' }, { zh: '短裤', py: 'duǎn kù' }, { zh: '裙子', py: 'qún zi' }, { zh: '连衣裙', py: 'lián yī qún' },
    { zh: '运动鞋', py: 'yùn dòng xié' }, { zh: '皮鞋', py: 'pí xié' }, { zh: '高跟鞋', py: 'gāo gēn xié' }, { zh: '帽子', py: 'mào zi' }
  ],
  colors: [
    { zh: '红色', py: 'hóng sè', hex: '#E5483B' }, { zh: '黄色', py: 'huáng sè', hex: '#F5C531' }, { zh: '蓝色', py: 'lán sè', hex: '#3B78D8' },
    { zh: '绿色', py: 'lǜ sè', hex: '#45A852' }, { zh: '白色', py: 'bái sè', hex: '#FFFFFF' }, { zh: '橙色', py: 'chéng sè', hex: '#F28C28' },
    { zh: '紫色', py: 'zǐ sè', hex: '#8E5CC2' }, { zh: '粉红色', py: 'fěn hóng sè', hex: '#F49AC1' }
  ]
};
