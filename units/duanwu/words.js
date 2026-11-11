/* =====================================================================
   单元：端午节 Dragon Boat Festival（节日岛 → 端午节）
   ---------------------------------------------------------------------
   游戏：
     1 划龙舟 games/dragonboat.html?unit=duanwu   数字答对了，龙舟就往前划
     2 找龙舟 games/findboat.html?unit=duanwu     看颜色，把对的船员送上龙舟
   课纲：端午节、粽子、划龙舟（龙船）；我爱吃粽子／我不爱吃粽子
   拼音照台湾的念法。
   ===================================================================== */
window.UNIT = {};

/* ---------------- 划龙舟 ----------------
   三条龙舟比赛。答对一题，我的龙舟就往前划一段；别的龙舟一直慢慢往前（时间到就划到终点）。
   Level 1：看英文（one～ten），选对的中文（有拼音）
   Level 2：看英文（1～100，例如 forty-two），用按键拼出中文（四十二），按 Submit
   Level 3：看英文（百、千，例如 two thousand five hundred），用按键拼出中文（两千五百），按 Submit
   先划到终点（答对 target 题）就赢了、给金币（1/2/3） */
UNIT.dragonboat = {
  title: { zh: '划龙舟', py: 'huá lóng zhōu', en: 'Dragon Boat Race' },
  time: [60, 120, 180],
  target: [8, 8, 8],
  range: [[1, 10], [1, 100], [100, 9999]],
  win: { zh: '我们赢了！我爱吃粽子！', py: 'wǒ men yíng le! wǒ ài chī zòng zi!' }
};

/* ---------------- 找龙舟 ----------------
   码头上站着一排人（衣服、帽子颜色都不一样）。看题目，把对的船员送上龙舟。
   Level 1：一个颜色（需要三个穿红色衣服的船员）。点对的人上船，人数够了龙舟就出发。
   Level 2：两个颜色（需要两个穿红色衣服、戴黄色帽子的船员）。
   Level 3：船员名单（两组人），自己把人拖上船（或点一下），按 Submit。错了会告诉你哪一组人数不对。
   colors  每一级用的颜色（写颜色的中文，要在下面 COLORS 里）
   people  码头上站几个人
   boats   要让几条龙舟出发才过关
   time    每一级几秒（时间先到就没有金币）
   need    每一组要几个人（最少、最多） */
UNIT.findboat = {
  title: { zh: '找龙舟', py: 'zhǎo lóng zhōu', en: 'Dragon Boat Crew' },
  time: [90, 120, 180],
  boats: [5, 5, 5],
  people: [8, 9, 10],
  need: [[2, 4], [1, 3], [1, 3]],
  colors: [
    ['红色', '黄色', '蓝色', '绿色', '白色', '黑色'],
    ['红色', '黄色', '蓝色', '绿色', '白色', '黑色', '橙色', '紫色'],
    ['红色', '黄色', '蓝色', '绿色', '白色', '黑色', '橙色', '紫色', '粉红色']
  ],
  win: { zh: '我们的龙舟都出发了！', py: 'wǒ men de lóng zhōu dōu chū fā le!' }
};
UNIT.COLORS = [
  { zh: '红色', py: 'hóng sè', en: 'red', hex: '#E5483B' },
  { zh: '黄色', py: 'huáng sè', en: 'yellow', hex: '#F5C531' },
  { zh: '蓝色', py: 'lán sè', en: 'blue', hex: '#3B78D8' },
  { zh: '绿色', py: 'lǜ sè', en: 'green', hex: '#45A852' },
  { zh: '白色', py: 'bái sè', en: 'white', hex: '#FFFFFF' },
  { zh: '黑色', py: 'hēi sè', en: 'black', hex: '#2B2B2B' },
  { zh: '橙色', py: 'chéng sè', en: 'orange', hex: '#F28C28' },
  { zh: '紫色', py: 'zǐ sè', en: 'purple', hex: '#8E5CC2' },
  { zh: '粉红色', py: 'fěn hóng sè', en: 'pink', hex: '#F49AC1' }
];
