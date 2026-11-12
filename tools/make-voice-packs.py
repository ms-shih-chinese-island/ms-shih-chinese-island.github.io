"""试玩版（claude.ai）用：一个作品最多 512 个档案，录音不能一个一个放。
   把 shared/voice/*.wav 打包成 <输出资料夹>/p0.js … p8.js（base64）和 index.js（哪个档在哪一包）。
   上传到试玩版的 shared/voice/packs/。正式网站不用（直接用 wav 档）。
   用法：python3 tools/make-voice-packs.py <输出资料夹>"""
import os, sys, json, base64
SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(SITE, 'shared', 'voice'); out = sys.argv[1]
os.makedirs(out, exist_ok=True)
fs = sorted(f for f in os.listdir(src) if f.endswith(('.wav', '.webm', '.m4a', '.ogg')))
N = max(1, (len(fs) + 49) // 50); size = (len(fs) + N - 1) // N; index = {}
MIME = {'wav': 'audio/wav', 'webm': 'audio/webm', 'm4a': 'audio/mp4', 'ogg': 'audio/ogg'}
for i in range(N):
    chunk = fs[i * size:(i + 1) * size]
    if not chunk: continue
    pid = f'p{i}'
    data = {f: f'data:{MIME[f.rsplit(".", 1)[1]]};base64,' + base64.b64encode(open(os.path.join(src, f), 'rb').read()).decode() for f in chunk}
    for f in chunk: index[f] = pid
    open(os.path.join(out, pid + '.js'), 'w').write('window.SHIH_VOICE_DATA = Object.assign(window.SHIH_VOICE_DATA || {}, ' + json.dumps(data) + ');\n')
open(os.path.join(out, 'index.js'), 'w').write('/* 试玩版用：录音打包（一个作品最多 512 个档案）。正式网站没有这个资料夹。 */\nwindow.SHIH_VOICE_PACKS = ' + json.dumps(index) + ';\n')
print(len(index), 'files →', N, 'packs in', out)
