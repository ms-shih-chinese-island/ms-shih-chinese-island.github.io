// 把网站里所有「zh + py」配对收集起来，做成 shared/py-tw.js（台湾读音的小字典）
// 快闪抢地盘的试算表拼音空着的时候，先查这本字典，查不到才用 pinyin-pro。
// 用法：node tools/make-py.js     （有新单元、新字的时候再跑一次）
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (/^(\.git|vendor|fonts|tools)$/.test(f)) continue;
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(js|html)$/.test(f) && f !== 'py-tw.js') files.push(p);
  }
})(root);
const HAN = /[㐀-鿿]/;
const votes = {};
const re = /zh\s*:\s*(['"`])([^'"`]+)\1\s*,\s*py\s*:\s*(['"`])([^'"`]+)\3/g;
const re2 = /ruby\(\s*'([^']+)'\s*,\s*'([^']+)'\s*\)/g;
function add(zh, py) {
  if (/[{}$]/.test(zh + py)) return;
  const hans = Array.from(zh).filter(c => HAN.test(c));
  const syl = py.replace(/[.,?!;:，。？！、\/／…()（）'"“”‘’-]/g, ' ').trim().split(/\s+/).filter(Boolean);
  if (!hans.length || hans.length !== syl.length || hans.length > 8) return;
  if (!syl.every(s => /^[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]+$/i.test(s))) return;
  // 也把句子切成词：标点跟非汉字当作分隔
  const k = hans.join(''), v = syl.join(' ').toLowerCase();
  (votes[k] = votes[k] || {})[v] = (votes[k][v] || 0) + 1;
}
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = re.exec(s))) add(m[2], m[4]);
  while ((m = re2.exec(s))) add(m[1], m[2]);
}
const out = {};
Object.keys(votes).sort().forEach(k => {
  const v = votes[k]; out[k] = Object.keys(v).sort((a, b) => v[b] - v[a])[0];
});
const body = '/* 自动产生（node tools/make-py.js）：网站里用过的字跟拼音（台湾读音）。不用手改。 */\nwindow.SHIH_PY = ' + JSON.stringify(out) + ';\n';
fs.writeFileSync(path.join(root, 'shared/py-tw.js'), body);
console.log(Object.keys(out).length, 'entries,', body.length, 'bytes');
