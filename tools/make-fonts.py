"""做网站自己的字体（不连 Google Fonts）。
   中文字体只放网站上真的有用到的字，所以档案很小；以后加了新的字，要再跑一次这个程式。
   用法：python3 tools/make-fonts.py <放字体 .ttf 的资料夹>
   需要的字体：NotoSansSC_500Medium.ttf、NotoSansSC_700Bold.ttf、Andika_400Regular.ttf、Andika_700Bold.ttf
   （npm 套件 @expo-google-fonts/noto-sans-sc 和 @expo-google-fonts/andika 里面有）"""
import os, re, sys, glob
from fontTools import subset

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = sys.argv[1]
OUT = os.path.join(SITE, 'shared', 'fonts')

# 网站上所有用到的中文字和全形符号
chars = set()
for path in glob.glob(os.path.join(SITE, '**', '*.*'), recursive=True):
    if '/.git/' in path or not path.endswith(('.html', '.js', '.css', '.md')) or '/tools/' in path:
        continue
    text = open(path, encoding='utf-8', errors='ignore').read()
    chars.update(c for c in text if ord(c) > 0x2E7F)
chars.update('，。！？：；、「」『』（）《》〈〉＿—…·～ 　０１２３４５６７８９＋－＝×÷％＄')
zh_text = ''.join(sorted(chars))
print('中文字数：', len(zh_text))

latin = ['U+0000-024F', 'U+0250-02FF', 'U+0300-036F', 'U+1E00-1EFF', 'U+2000-206F', 'U+20A0-20CF', 'U+2100-214F', 'U+2190-21FF', 'U+2200-22FF', 'U+25A0-25FF']

def make(src, out, text=None, unicodes=None):
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['*']
    opts.name_IDs = ['*']
    font = subset.load_font(os.path.join(SRC, src), opts)
    s = subset.Subsetter(opts)
    s.populate(text=text or '', unicodes=subset.parse_unicodes(','.join(unicodes)) if unicodes else [])
    s.subset(font)
    subset.save_font(font, os.path.join(OUT, out), opts)
    print(out, os.path.getsize(os.path.join(OUT, out)) // 1024, 'KB')

os.makedirs(OUT, exist_ok=True)
make('NotoSansSC_500Medium.ttf', 'NotoSansSC-500.woff2', text=zh_text + ''.join(chr(c) for c in range(0x20, 0x7F)))
make('NotoSansSC_700Bold.ttf', 'NotoSansSC-700.woff2', text=zh_text + ''.join(chr(c) for c in range(0x20, 0x7F)))
make('Andika_400Regular.ttf', 'Andika-400.woff2', unicodes=latin)
make('Andika_700Bold.ttf', 'Andika-700.woff2', unicodes=latin)

# ---- 家庭大富翁（games/board.html）自己用的字体 ----
BOARD = [('Fredoka_500Medium.ttf', 'Fredoka-500.woff2', None), ('Fredoka_600SemiBold.ttf', 'Fredoka-600.woff2', None), ('Fredoka_700Bold.ttf', 'Fredoka-700.woff2', None),
         ('Nunito_700Bold.ttf', 'Nunito-700.woff2', None), ('Nunito_800ExtraBold.ttf', 'Nunito-800.woff2', None), ('Nunito_900Black.ttf', 'Nunito-900.woff2', None),
         ('NotoSansSC_900Black.ttf', 'NotoSansSC-900.woff2', 'zh'), ('NotoSansTC_700Bold.ttf', 'NotoSansTC-700.woff2', 'zh'), ('NotoSansTC_900Black.ttf', 'NotoSansTC-900.woff2', 'zh')]
for src, out, kind in BOARD:
    if not os.path.exists(os.path.join(SRC, src)):
        print('没有', src, '，跳过'); continue
    if kind == 'zh': make(src, out, text=zh_text + ''.join(chr(c) for c in range(0x20, 0x7F)))
    else: make(src, out, unicodes=latin)
