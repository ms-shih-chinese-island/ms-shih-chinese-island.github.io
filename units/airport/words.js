/* =====================================================================
   单元：机场 Airport（主岛 → 机场）
   ---------------------------------------------------------------------
   游戏：
     1 天气怎么样？ games/weather.html?unit=airport
     2 几点起飞？ games/clock.html?unit=airport
     3 涂国旗 games/flags.html?unit=airport
     4 我想去 games/trip.html?unit=airport
   图在 units/airport/art.js。拼音照台湾的念法。
   ===================================================================== */
window.UNIT = {};

/* ---------------- 天气怎么样？ ----------------
   课纲二年级 12 月：今天天气怎么样？今天的天气是＿＿。（三、四年级复习）
   Level 1：飞机窗外的天气，机长问「今天天气怎么样？」点对的天气
   Level 2：窗外的天气＋温度计（华氏），排「今天的天气是＿＿，＿＿度。」温度给三个选项（有混淆的：数字颠倒 75 ↔ 57、差十度），点对的填进去
   Level 3：机场的天气板（中国的城市），机长问「北京今天天气怎么样？」排「北京今天的天气是＿＿，＿＿度。」
            天气卡有混淆的选项（天气板上别的城市的天气）；温度只有一个空格（不告诉几个字），学生用「一～十」自己填，⌫ 删掉，按 Submit
   「度」课纲没有教（进阶），旁边有英文。答对 target 题就马上结束、给金币
   weather：天气、拼音、英文、气温范围（华氏，要合理：下雪在 32°F 以下，下雨在 32°F 以上）
   cities：天气板上的城市（课纲四年级 10 月） */
UNIT.weather = {
  title: { zh: '天气怎么样？', py: 'tiān qì zěn me yàng', en: "How's the Weather?" },
  time: [60, 90, 90],          // 每一级几秒
  target: [6, 6, 6],
  weather: [
    { zh: '晴天',   py: 'qíng tiān',   en: 'sunny',    temp: [65, 90] },
    { zh: '多云',   py: 'duō yún',     en: 'cloudy',   temp: [55, 78] },
    { zh: '阴天',   py: 'yīn tiān',    en: 'overcast', temp: [45, 65] },
    { zh: '下雨天', py: 'xià yǔ tiān', en: 'rainy',    temp: [42, 65] },   // 下雨：比冰点（32°F）高
    { zh: '下雪天', py: 'xià xuě tiān', en: 'snowy',   temp: [15, 31] },   // 下雪：冰点（32°F）以下
    { zh: '刮风',   py: 'guā fēng',    en: 'windy',    temp: [40, 60] }
  ],
  // min：这个城市最低几度（香港、台湾比较暖）
  // snow：这个城市会下雪（香港、台湾、上海、成都几乎不下雪，所以只有北京、哈尔滨会出现下雪天）
  cities: [
    { zh: '北京', py: 'běi jīng', snow: true }, { zh: '上海', py: 'shàng hǎi' }, { zh: '香港', py: 'xiāng gǎng', min: 55 },
    { zh: '哈尔滨', py: 'hā ěr bīn', snow: true }, { zh: '成都', py: 'chéng dū' }, { zh: '台湾', py: 'tái wān', min: 50 }
  ],
  tips: [ { zh: '度', py: 'dù', en: 'degrees (°F)' } ]
};

/* ---------------- 几点起飞？ ----------------
   课纲三年级 12 月：＿点。（时间）
   Level 1：机长问「现在几点？」看大时钟，把「三点」放进「现在＿＿。」（三选一）
   Level 2：机场的起飞时刻表（4 个城市＋小时钟），有「半」，机长问「去北京的飞机几点起飞？」（四选一，有混淆）
   Level 3：一个大时钟（不分城市），有「半」，机长问「飞机几点起飞？」没有选项：学生用字键（一～十、两、点、半）自己写，⌫ 删掉，按 Submit
   「半、起飞」课纲没有教（进阶），旁边有英文
   混淆的选项：差一个小时、时针和分针看反了（3:00 看成十二点）、时刻表上别的城市的时间、三点／三点半／两点半
   答对 target 题就马上结束、给金币
   hours：一到十二点（两点 = 两，不是二） */
UNIT.clock = {
  title: { zh: '几点起飞？', py: 'jǐ diǎn qǐ fēi', en: 'What Time Does It Leave?' },
  time: [60, 90, 90],
  target: [6, 6, 6],
  hours: [
    { zh: '一点', py: 'yì diǎn' }, { zh: '两点', py: 'liǎng diǎn' }, { zh: '三点', py: 'sān diǎn' }, { zh: '四点', py: 'sì diǎn' },
    { zh: '五点', py: 'wǔ diǎn' }, { zh: '六点', py: 'liù diǎn' }, { zh: '七点', py: 'qī diǎn' }, { zh: '八点', py: 'bā diǎn' },
    { zh: '九点', py: 'jiǔ diǎn' }, { zh: '十点', py: 'shí diǎn' }, { zh: '十一点', py: 'shí yī diǎn' }, { zh: '十二点', py: 'shí èr diǎn' }
  ],
  half: { zh: '半', py: 'bàn' },
  tips: [ [ { zh: '点', py: 'diǎn', en: "o'clock" } ],
          [ { zh: '点', py: 'diǎn', en: "o'clock" }, { zh: '半', py: 'bàn', en: 'half past' }, { zh: '起飞', py: 'qǐ fēi', en: 'take off' } ],
          [ { zh: '点', py: 'diǎn', en: "o'clock" }, { zh: '半', py: 'bàn', en: 'half past' }, { zh: '起飞', py: 'qǐ fēi', en: 'take off' } ] ]
};

/* ---------------- 涂国旗 ----------------
   选颜料（颜料上只写中文颜色，没有颜色），再点国旗上的格子涂上去。国旗的图在 units/airport/flags.js
   Level 1：格子里用英文写颜色（red），颜料是中文（红色），学生要配对。简单的国旗：日本、法国、意大利、德国、俄罗斯
   Level 2：格子里没有字，旁边有小小的彩色国旗当参考。全部 13 面国旗
   Level 3：跟 Level 2 一样，涂好以后再选「这是＿＿的国旗。」（三选一）
   国旗：日本、法国、意大利、德国、俄罗斯（Level 1）＋中国、台湾、美国、加拿大、韩国、英国、墨西哥、澳大利亚
   课纲四年级 3 月的 12 个国家＋台湾（史老师加的）
   答对 target 题就马上结束、给金币 */
UNIT.flags = {
  title: { zh: '涂国旗', py: 'tú guó qí', en: 'Color the Flag' },
  time: [60, 90, 90],
  target: [5, 5, 5],
  colors: [
    { zh: '红色', py: 'hóng sè' }, { zh: '白色', py: 'bái sè' }, { zh: '蓝色', py: 'lán sè' },
    { zh: '黄色', py: 'huáng sè' }, { zh: '绿色', py: 'lǜ sè' }, { zh: '黑色', py: 'hēi sè' }
  ]
};

/* ---------------- 我想去 ----------------
   机场的售票柜台。旅客说「我想去日本。」（课纲四年级 3 月：我想去＿＿；四年级 12 月：多少钱；三年级 9 月：几月几日）
   Level 1：「我想去日本。」点日本的国旗（国旗下面写英文）
   Level 2：航班板（4 班飞机，全部用英文：Date｜From｜To｜Price、Japan、Dec 5），旅客问「我想去法国。几月几日有票？」放进「＿＿有票。」
            混淆的日期：月和日对调（12月5日 ↔ 5月12日）、差十天、航班板上别的日期
   Level 3：一样的航班板，「我想去日本。几月几日有票？多少钱？」放进「＿＿有票，＿＿。」（价钱写「一千五百元」）
            混淆的价钱：多一个零（$500 ↔ $5000）、差五十、航班板上别的价钱
   「有票、元」旁边有英文。国旗的图在 units/airport/flags.js
   答对 target 题就马上结束、给金币
   prices：票价（价钱写「＿元」）；from：从哪里出发 */
UNIT.trip = {
  title: { zh: '我想去', py: 'wǒ xiǎng qù', en: 'Where Do You Want to Go?' },
  time: [60, 90, 90],
  target: [6, 6, 6],
  from: { zh: '美国', py: 'měi guó' },
  prices: [300, 400, 500, 600, 700, 800, 900, 1200, 1500],
  tips: [ [ { zh: '我想去', py: 'wǒ xiǎng qù', en: 'I want to go to' } ],
          [ { zh: '有票', py: 'yǒu piào', en: 'has tickets' } ],
          [ { zh: '有票', py: 'yǒu piào', en: 'has tickets' }, { zh: '元', py: 'yuán', en: 'dollars' } ] ]
};
