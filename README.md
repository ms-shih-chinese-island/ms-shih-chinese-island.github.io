# 史老师的中文游戏岛 Ms. Shih's Island of Chinese Games

网址：https://szufanshih.github.io/

## 资料夹是什么

| 资料夹 / 档案 | 是什么 | 常常要改吗 |
|---|---|---|
| `index.html` | 岛（主页）的画面 | 不用 |
| `island.js` | 岛上有哪些地点、每个地点有哪些游戏 | 新增单元时改 |
| `units/` | 每个单元一个资料夹，里面只有生词（`words.js`） | 加字、改字时改 |
| `games/` | 游戏的玩法（配对、家族树、大富翁），所有单元共用 | 不用 |
| `shared/` | 大家共用的零件（拼音排版、配音、计时器、冰淇淋难度） | 不用 |

## 常做的事

- **改错字、改拼音、加一个字**：打开 `units/单元名/words.js` → 铅笔 ✏️ → 改 → Commit changes。
- **新增一个单元**：复制 `units/_template/words.js` 到 `units/新单元/words.js`，填生词；再到 `island.js` 加一个地点。
- **游戏的网址**：玩法 + 单元，例如 `games/match.html?unit=family`。
  - 直接开某一级：在后面加 `#3`，例如 `games/match.html?unit=family#3`。
- **改完看不到变化**：等一两分钟，按 Cmd + Shift + R（Windows：Ctrl + Shift + R）。
- **改坏了**：点开档案 → History → 找以前的版本贴回来。
