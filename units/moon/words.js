/* =====================================================================
   单元：中秋节 Moon Festival（节日岛 → 中秋节）
   ---------------------------------------------------------------------
   两个游戏都读这一份：
     四格故事 games/story.html?unit=moon
     中秋小知识 games/quiz.html?unit=moon
   图在 units/moon/art.js。拼音照台湾的念法。
   ===================================================================== */
window.UNIT = {};

/* ---------------- 四格故事 ----------------
   panels：四格，照故事的顺序。
     lines：这一格要填的台词；who 是说话的人（图）：
       'villager' 村民、'houyi' 后羿、'king' 国王、'oldman' 老人、'change' 嫦娥
       （可以放两个人，例如 ['king', 'oldman']）
   wrong：放进去当干扰的台词卡
*/
UNIT.story = {
  title: { zh: '四格故事', py: 'sì gé gù shì', en: 'Story Panels' },
  panels: [
    { lines: [{ who: ['villager'],         zh: '我很热！我很渴！', py: 'wǒ hěn rè! wǒ hěn kě!', en: "I'm hot! I'm thirsty!" }] },
    { lines: [{ who: ['villager'],         zh: '一、二、三，射！', py: 'yī èr sān, shè!',       en: 'One, two, three, shoot!' }] },
    { lines: [{ who: ['king', 'oldman'],   zh: '送给你！',         py: 'sòng gěi nǐ!',          en: 'This is for you!' },
              { who: ['houyi'],            zh: '谢谢你！',         py: 'xiè xie nǐ!',           en: 'Thank you!' }] },
    { lines: [{ who: ['change'],           zh: '再见！',           py: 'zài jiàn!',             en: 'Goodbye!' }] }
  ],
  wrong: [
    { zh: '老师好！', py: 'lǎo shī hǎo!' },
    { zh: '早上好！', py: 'zǎo shàng hǎo!' },
    { zh: '你好吗？', py: 'nǐ hǎo ma?' }
  ]
};

/* ---------------- 中秋小知识 ----------------
   每一题：q 英文问题；a 对的答案；no 错的答案
   答案：{ pic: 图的名字, zh, py }；没有 zh 的答案只放图和英文 en
   one：这题对的答案每次从里面挑一个（例如中秋节的活动有好几个）
   题目照顺序出（后羿射下几个太阳要在后羿射下什么之后）
*/
UNIT.quiz = {
  title: { zh: '中秋小知识', py: 'zhōng qiū xiǎo zhī shi', en: 'Moon Festival Quiz' },
  questions: [
    { q: 'What do people eat at the Moon Festival?',
      a: { pic: 'mooncake', zh: '吃月饼', py: 'chī yuè bǐng' },
      no: [{ pic: 'turkey', zh: '吃火鸡', py: 'chī huǒ jī' }, { pic: 'candy', zh: '吃糖果', py: 'chī táng guǒ' }] },
    { q: 'What do people do at the Moon Festival?',
      one: [{ pic: 'lookmoon', zh: '看月亮', py: 'kàn yuè liàng' }, { pic: 'lantern', zh: '提灯笼', py: 'tí dēng lóng' }, { pic: 'reunion', zh: '团圆', py: 'tuán yuán' }],
      no: [{ pic: 'carve', zh: '刻南瓜', py: 'kè nán guā' }, { pic: 'trickortreat', zh: '要糖果', py: 'yào táng guǒ' }] },
    { q: 'When is the Moon Festival?',
      a: { pic: 'cal815', zh: '农历八月十五', py: 'nóng lì bā yuè shí wǔ' },
      no: [{ pic: 'cal1031', zh: '十月三十一日', py: 'shí yuè sān shí yī rì' }, { pic: 'cal11', zh: '一月一日', py: 'yī yuè yī rì' }] },
    { q: 'What shape is the moon at the Moon Festival?',
      a: { pic: 'moonRound', zh: '圆圆的', py: 'yuán yuán de' },
      no: [{ pic: 'moonCrescent', zh: '弯弯的', py: 'wān wān de' }, { pic: 'moonSquare', zh: '方方的', py: 'fāng fāng de' }] },
    { q: 'Who flew up to the moon?',
      a: { pic: 'change', zh: '嫦娥', py: 'cháng é' },
      no: [{ pic: 'houyi', zh: '后羿', py: 'hòu yì' }, { pic: 'teacher', zh: '老师', py: 'lǎo shī' }] },
    { q: 'Why did Chang\'e fly up to the moon?',
      a: { pic: 'elixir', zh: '吃了长生不老药', py: 'chī le cháng shēng bù lǎo yào' },
      no: [{ pic: 'mooncake', zh: '吃了月饼', py: 'chī le yuè bǐng' }, { pic: 'candy', zh: '吃了糖果', py: 'chī le táng guǒ' }] },
    { q: 'What did Hou Yi shoot down?',
      a: { pic: 'sun', zh: '太阳', py: 'tài yáng' },
      no: [{ pic: 'moon', zh: '月亮', py: 'yuè liàng' }, { pic: 'star', zh: '星星', py: 'xīng xīng' }] },
    { q: 'How many suns did Hou Yi shoot down?',
      a: { pic: 'suns9', zh: '九个', py: 'jiǔ gè' },
      no: [{ pic: 'suns10', zh: '十个', py: 'shí gè' }, { pic: 'suns1', zh: '一个', py: 'yī gè' }, { pic: 'suns3', zh: '三个', py: 'sān gè' }] },
    { q: 'In the story, which animal lives on the moon with Chang\'e?',
      a: { pic: 'rabbit', en: 'rabbit' },
      no: [{ pic: 'cat', en: 'cat' }, { pic: 'dog', en: 'dog' }] }
  ]
};

UNIT.levels = [{ note: '' }];
UNIT.words = [];
