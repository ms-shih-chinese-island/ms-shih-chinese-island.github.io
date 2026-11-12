"""把老师从录音室下载的 voice.zip 放进网站。
   用法：python3 tools/install-voice.py <解压后的资料夹>（里面有 list.js 和 v*.wav，或有 voice/ 子资料夹）

   做的事：
   1. 读老师的 list.js（句子 → 档名）。key 有拼音声调字母或全是字母（例如「zhǐ」，打错字录的；T恤 可以）和测试假资料不要。
   2. 新的 wav → mp3（单声道 22050 Hz 40 kbps，约是 wav 的七分之一大）。
   3. 网站上原本有、这次包里没带档案的录音，从旧的 packs 里留下来。
   4. 全部打包成 shared/voice/packs/p0.js … p15.js（base64）＋ packs/index.js（哪个档在哪一包）。
      用档名决定放哪一包，所以新增几个录音只会改到几包。
   5. 写新的 shared/voice/list.js；shared/voice/ 里散的录音档删掉（全部都在 packs 里）。
   正式网站和试玩版用一样的 packs：shared/voice/ 只有 list.js ＋ packs/（17 个档）。"""
import os, re, sys, json, base64, zlib, subprocess, tempfile, glob

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOICE = os.path.join(SITE, 'shared', 'voice'); PACKS = os.path.join(VOICE, 'packs')
NPACK = 16
JUNK = {'我爱吃粽子。'}
LATIN = re.compile(r'[À-ɏ]|^[A-Za-z\s]+$')   # 有拼音声调字母，或整个都是字母（T恤 这种可以）
AUDIO = ('.wav', '.webm', '.m4a', '.ogg', '.mp3')
HEAD = ('/* 老师的录音：句子 → 档名。录音室（games/studio.html）的「下载录音包」会做好新的这一份，\n'
        '   再用 tools/install-voice.py 转成 mp3、打包进 packs/。网站念句子的时候，有录音就放录音，没有就用电脑的声音。 */\n')

def read_list(path):
    if not os.path.exists(path): return {}
    m = re.search(r'window\.SHIH_VOICE\s*=\s*(\{.*\})\s*;', open(path, encoding='utf-8').read(), re.S)
    return json.loads(m.group(1)) if m else {}

def old_data():   # 旧的 packs：档名 → bytes
    out = {}
    for p in glob.glob(os.path.join(PACKS, 'p*.js')):
        m = re.search(r'Object\.assign\(window\.SHIH_VOICE_DATA \|\| \{\}, (\{.*\})\);', open(p).read(), re.S)
        if m:
            for f, u in json.loads(m.group(1)).items(): out[f] = base64.b64decode(u.split(',', 1)[1])
    for f in os.listdir(VOICE):   # 还没打包的散档
        if f.endswith(AUDIO): out.setdefault(f, open(os.path.join(VOICE, f), 'rb').read())
    return out

def to_mp3(path):
    with tempfile.NamedTemporaryFile(suffix='.mp3', delete=False) as t: tmp = t.name
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', path, '-ac', '1', '-ar', '22050', '-b:a', '40k', tmp], check=True)
    b = open(tmp, 'rb').read(); os.remove(tmp); return b

def main(src):
    if os.path.isdir(os.path.join(src, 'voice')): src = os.path.join(src, 'voice')
    site_list, data = read_list(os.path.join(VOICE, 'list.js')), old_data()
    new_list = read_list(os.path.join(src, 'list.js')) if src else {}
    merged, report = {}, {'new': [], 'changed': [], 'dropped': [], 'missing': []}
    for k in sorted(set(site_list) | set(new_list)):
        if k in JUNK or LATIN.search(k): report['dropped'].append(k); continue
        f = new_list.get(k)
        if f and src and os.path.exists(os.path.join(src, f)):
            stem = os.path.splitext(f)[0]; mp3 = stem + '.mp3'
            p = os.path.join(src, f)
            b = open(p, 'rb').read() if f.endswith('.mp3') else to_mp3(p)
            if k not in site_list: report['new'].append(k)
            elif os.path.splitext(site_list[k])[0] != stem: report['changed'].append(k)
            data[mp3] = b; merged[k] = mp3; continue
        f = site_list.get(k) or f
        if f in data:
            if not f.endswith('.mp3'):   # 旧的 wav：也转成 mp3
                with tempfile.NamedTemporaryFile(suffix=os.path.splitext(f)[1], delete=False) as t: t.write(data[f]); tp = t.name
                mp3 = os.path.splitext(f)[0] + '.mp3'; data[mp3] = to_mp3(tp); os.remove(tp); f = mp3
            merged[k] = f
        else: report['missing'].append(k)
    # 打包
    os.makedirs(PACKS, exist_ok=True)
    for p in glob.glob(os.path.join(PACKS, '*.js')): os.remove(p)
    buckets, index = {}, {}
    for f in sorted(set(merged.values())):
        pid = 'p%d' % (zlib.crc32(f.encode()) % NPACK); index[f] = pid
        buckets.setdefault(pid, {})[f] = 'data:audio/mpeg;base64,' + base64.b64encode(data[f]).decode()
    for pid, d in buckets.items():
        open(os.path.join(PACKS, pid + '.js'), 'w').write('window.SHIH_VOICE_DATA = Object.assign(window.SHIH_VOICE_DATA || {}, ' + json.dumps(d, sort_keys=True) + ');\n')
    open(os.path.join(PACKS, 'index.js'), 'w').write('/* 录音打包：档名 → 哪一包（tools/install-voice.py 做的）。 */\nwindow.SHIH_VOICE_PACKS = ' + json.dumps(index, sort_keys=True) + ';\n')
    open(os.path.join(VOICE, 'list.js'), 'w', encoding='utf-8').write(HEAD + 'window.SHIH_VOICE = {\n' + ',\n'.join('  ' + json.dumps(k, ensure_ascii=False) + ': ' + json.dumps(merged[k]) for k in sorted(merged)) + '\n};\n')
    for f in os.listdir(VOICE):
        if f.endswith(AUDIO): os.remove(os.path.join(VOICE, f))
    size = sum(os.path.getsize(p) for p in glob.glob(os.path.join(PACKS, '*.js')))
    print(f'{len(merged)} recordings → {len(buckets)} packs, {size/1e6:.1f} MB')
    for k, v in report.items(): print(f'{k} ({len(v)}):', '、'.join(v))

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else '')
