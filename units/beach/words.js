/* =====================================================================
   单元：海滩 Beach（主岛 → 海滩）
   ---------------------------------------------------------------------
   游戏：
     1 能去海滩吗？ games/forecast.html?unit=beach
     2 我是谁？ games/whoami.html?unit=beach
     3 海滩找一找 games/beachfind.html?unit=beach
   以后：夏天到了（三年级 6 月：夏天到了，我喜欢＿＿）
   「能去海滩吗？」「我是谁？」用「听」的，所以金币比普通游戏多一颗：Level 1、2、3 给 2、3、4 颗（shared/coins.js）。
   「海滩找一找」练认字（有拼音），金币是一般的 1、2、3 颗。
   天气的图用机场的 units/airport/art.js。拼音照台湾的念法。
   ===================================================================== */
window.UNIT = {};

/* ---------------- 能去海滩吗？ ----------------
   收音机播天气预报（只有声音，可以按 🔊 再听），练「听」。课纲二年级 12 月的天气。
   Level 1：「早上的天气是下雨天，下午的天气是晴天。」左边「早上」的框、右边「下午」的框，各自选天空（每个框 3 张）
   Level 2：「早上的天气是阴天，下午的天气是多云，六十五度。」早上、下午的框各 4 张图，再选温度（三选一）
   Level 3：跟 Level 2 一样（一个温度），最后决定「去海滩！」还是「不去海滩。」：早上或下午有一个是晴天／多云，而且 70°F 以上 → 去；不然就不去
   「早上、下午、度、海滩」课纲没有教（进阶），旁边有英文。答对 target 题就马上结束、给金币
   weather：天气（气温范围，华氏，要合理；早上、下午的温度要两个都合理） */
UNIT.forecast = {
  title: { zh: '能去海滩吗？', py: 'néng qù hǎi tān ma', en: 'Beach Day?' },
  time: [60, 90, 90],
  target: [6, 6, 6],
  weather: [
    { zh: '晴天',   py: 'qíng tiān',   en: 'sunny',    temp: [62, 92], beach: true },
    { zh: '多云',   py: 'duō yún',     en: 'cloudy',   temp: [60, 82], beach: true },
    { zh: '阴天',   py: 'yīn tiān',    en: 'overcast', temp: [45, 70] },
    { zh: '下雨天', py: 'xià yǔ tiān', en: 'rainy',    temp: [42, 75] },
    { zh: '下雪天', py: 'xià xuě tiān', en: 'snowy',   temp: [15, 31] },
    { zh: '刮风',   py: 'guā fēng',    en: 'windy',    temp: [40, 72] }
  ],
  warm: 70,          // 几度以上才够热，可以去海滩
  go:   { zh: '去海滩！',   py: 'qù hǎi tān!',    en: 'Go to the beach!' },
  nogo: { zh: '不去海滩。',   py: 'bú qù hǎi tān.',        en: 'No beach today.' },
  // lv：第几级开始出现这个提示
  tips: [ { zh: '早上', py: 'zǎo shang', en: 'morning', lv: 1 }, { zh: '下午', py: 'xià wǔ', en: 'afternoon', lv: 1 },
          { zh: '度', py: 'dù', en: 'degrees (°F)', lv: 2 }, { zh: '海滩', py: 'hǎi tān', en: 'beach', lv: 3 } ]
};

/* ---------------- 我是谁？ ----------------
   海滩上有 8 个小朋友，一个小朋友说「我有红色的球。我是谁？」（只有声音，可以按 🔊 再听），学生点对的人。
   Level 1：一个提示（我有红色的球。）
   Level 2：两个提示（我有黄色的帽子和绿色的水桶。）每一个提示单独听都有两个人以上符合，一定要两个都听懂
   Level 3：三个提示（我有蓝色的帽子、太阳眼镜和冰淇淋。）有只差一样的人
   「太阳眼镜、水桶、游泳圈、冰淇淋」课纲没有教（进阶），旁边有图和英文
   colors：帽子和东西的颜色；items：手上拿的东西（color: false = 不说颜色） */
UNIT.whoami = {
  title: { zh: '我是谁？', py: 'wǒ shì shéi', en: 'Who Am I?' },
  time: [60, 60, 90],
  target: [6, 6, 6],
  kids: 8,
  colors: [
    { zh: '红色', py: 'hóng sè', hex: '#E5483B' }, { zh: '黄色', py: 'huáng sè', hex: '#F5C531' },
    { zh: '蓝色', py: 'lán sè', hex: '#3B78D8' }, { zh: '绿色', py: 'lǜ sè', hex: '#45A852' },
    { zh: '紫色', py: 'zǐ sè', hex: '#8E5CC2' }
  ],
  hat:     { zh: '帽子', py: 'mào zi', en: 'hat' },
  glasses: { zh: '太阳眼镜', py: 'tài yáng yǎn jìng', en: 'sunglasses' },
  items: [
    { zh: '球',     py: 'qiú',       en: 'ball',      color: true },
    { zh: '水桶',   py: 'shuǐ tǒng', en: 'bucket',    color: true },
    { zh: '游泳圈', py: 'yóu yǒng quān', en: 'swim ring', color: true },
    { zh: '冰淇淋', py: 'bīng qí lín', en: 'ice cream', color: false }
  ]
};

/* ---------------- 海滩找一找（像快手分信） ----------------
   练认字（三级都有拼音）。海滩的东西一个一个从上面掉下来，学生点牌子写对的篮子，东西就装进去。
   篮子装满就收走，换一个新的篮子。没接到的东西掉到沙滩上就不见了（不扣分，只是浪费时间）。点错了篮子摇一摇。
   Level 1：3 个篮子，牌子写一样东西（贝壳），每个篮子装 3 个
   Level 2：5 个篮子，6 种东西都会掉，每个篮子装 3 个
   Level 3：3 个篮子，牌子写两样东西和数量（两个贝壳和一个水桶），要装刚好（已经够了再放会摇一下）
   装满 target 个篮子就过关、给金币
   words：海滩的字（图在 units/beach/art.js）；count：Level 3 用的东西（都用「个」）
   bags：画面上几个篮子；fill：Level 1、2 一个篮子装几个；fall：东西掉下来要几秒 */
UNIT.beachfind = {
  title: { zh: '海滩找一找', py: 'hǎi tān zhǎo yi zhǎo', en: 'Beach Hunt' },
  time: [60, 60, 90],
  target: [4, 5, 4],
  bags: [3, 5, 3],
  fill: 3,
  fall: [5, 5, 5],
  words: [
    { zh: '贝壳', py: 'bèi ké', en: 'shell' }, { zh: '海星', py: 'hǎi xīng', en: 'starfish' }, { zh: '螃蟹', py: 'páng xiè', en: 'crab' },
    { zh: '沙堡', py: 'shā bǎo', en: 'sandcastle' }, { zh: '太阳伞', py: 'tài yáng sǎn', en: 'beach umbrella' }, { zh: '水桶', py: 'shuǐ tǒng', en: 'bucket' }
  ],
  count: ['贝壳', '海星', '水桶', '沙堡'],
  nums: [ { zh: '一', py: 'yí' }, { zh: '两', py: 'liǎng' }, { zh: '三', py: 'sān' } ]
};
