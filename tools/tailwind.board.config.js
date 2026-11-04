// 家庭大富翁（games/board.html）的 Tailwind 设定。改了 board.html 的样式以后，要重新做一次 games/board.css：
//   npx tailwindcss@3 -c tools/tailwind.board.config.js -o games/board.css --minify
module.exports = {
  content: ['./games/board.html'],
  theme: {
    extend: {
      colors: { dadTop: '#f4a04d', momTop: '#f086ab', famTop: '#78c69f', goYellow: '#f5c531', boardBorder: '#1e293b' },
      fontFamily: {
        fun: ['"Fredoka"', 'system-ui', 'sans-serif'],
        pinyin: ['"Nunito"', '"Fredoka"', 'sans-serif'],
        cn: ['"Noto Sans SC"', '"Noto Sans TC"', 'sans-serif']
      }
    }
  }
};
