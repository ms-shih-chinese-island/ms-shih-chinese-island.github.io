/* =====================================================================
   单元：消防局 Fire Station（主岛 → 消防局）
   ---------------------------------------------------------------------
   游戏：
     1 找装备 games/gear.html?unit=fire
     2 去灭火 games/douse.html?unit=fire
   这个单元是「进阶练习」：穿、戴、裤子、靴子、手套、面罩、楼、桶、上、下、左、右课纲没有教，所以金币比普通游戏多一颗：Level 1、2、3 给 2、3、4 颗（shared/coins.js）。
   图在 units/fire/art.js。拼音照台湾的念法。
   ===================================================================== */
window.UNIT = {};

/* ---------------- 找装备 ----------------
   着火了！帮消防员穿好装备。
   Level 1：消防员说「我的帽子呢？」点对的装备
   Level 2：点对了，再选穿／戴：「他戴帽子。」
   Level 3：「我的外套和面罩呢？」点两样，再把装备放进「他穿＿＿，戴＿＿。」
   架子上的装备只写英文（看图、读英文，要读懂中文才知道是哪一个）。运动鞋、短裤是干扰（不是消防员的装备）。
   答对 target 题就马上结束、给金币；时间到了还没达标就没有金币。
   items：装备和要用的动词（verb）；extra：干扰 */
UNIT.gear = {
  title: { zh: '找装备', py: 'zhǎo zhuāng bèi', en: 'Find the Gear' },
  time: [60, 60, 60],
  target: [6, 6, 6],
  items: [
    { zh: '帽子', py: 'mào zi',   en: 'helmet', verb: '戴' },
    { zh: '面罩', py: 'miàn zhào', en: 'mask',  verb: '戴' },
    { zh: '手套', py: 'shǒu tào', en: 'gloves', verb: '戴' },
    { zh: '外套', py: 'wài tào',  en: 'coat',   verb: '穿' },
    { zh: '裤子', py: 'kù zi',    en: 'pants',  verb: '穿' },
    { zh: '靴子', py: 'xuē zi',   en: 'boots',  verb: '穿' }
  ],
  extra: [
    { zh: '运动鞋', py: 'yùn dòng xié', en: 'sneakers' },
    { zh: '短裤',   py: 'duǎn kù',      en: 'shorts' }
  ],
  verbs: { '穿': { zh: '穿', py: 'chuān', en: 'wear (coat, pants, boots)' }, '戴': { zh: '戴', py: 'dài', en: 'wear (helmet, mask, gloves)' } }
};

/* ---------------- 去灭火 ----------------
   一栋 5 层楼，每层 4 个窗户，有几个地方着火了。队长下指令，学生灭火。
   Level 1：「三楼着火了！」点三楼着火的窗户（别的楼层也有火，要读懂几楼）
   Level 2：「四楼着火了！要三桶水。」点四楼，再按水桶三下，按「Spray」（数量不对：摇一摇，重来）
   Level 3：「五楼着火了！要两桶水。」水管从楼下开始，学生按「上、下、左、右」（只有中文）把水管移到火那里，选几桶水，按「Spray」
   答对 target 题就马上结束、给金币（2、3、4 颗）。三级都有拼音
   floors：几楼（一楼 yì lóu）；buckets：几桶水（1～3） */
UNIT.douse = {
  title: { zh: '去灭火', py: 'qù miè huǒ', en: 'Put Out the Fire' },
  time: [90, 90, 120],          // 每一级几秒（Level 3 要移水管，多给一点时间）
  target: [6, 6, 6],
  floors: [
    { zh: '一', py: 'yì' }, { zh: '二', py: 'èr' }, { zh: '三', py: 'sān' }, { zh: '四', py: 'sì' }, { zh: '五', py: 'wǔ' }
  ],
  buckets: [ { zh: '一', py: 'yì' }, { zh: '两', py: 'liǎng' }, { zh: '三', py: 'sān' } ],
  // 新字的小提示（英文）
  tips: [
    [ { zh: '楼', py: 'lóu', en: 'floor' }, { zh: '着火了', py: 'zháo huǒ le', en: 'on fire!' } ],
    [ { zh: '楼', py: 'lóu', en: 'floor' }, { zh: '桶', py: 'tǒng', en: 'bucket' }, { zh: '水', py: 'shuǐ', en: 'water' } ],
    [ { zh: '上', py: 'shàng', en: 'up' }, { zh: '下', py: 'xià', en: 'down' }, { zh: '左', py: 'zuǒ', en: 'left' }, { zh: '右', py: 'yòu', en: 'right' }, { zh: '桶', py: 'tǒng', en: 'bucket' } ]
  ]
};
