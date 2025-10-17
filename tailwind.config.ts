// tailwind.config.ts

import type { Config } from 'tailwindcss'

const config: Config = {
  // ★★★ この 'content' 設定が、すべての JSX ファイルを監視するために不可欠です ★★★
  content: [
    // src ディレクトリ内のすべてのファイル (.js, .ts, .jsx, .tsx) を監視対象に指定
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
