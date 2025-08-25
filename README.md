# 求人広告サイト

Next.js + Supabase + Vercelで構築された求人広告サイトです。サーバーレス・低コストでの運用を目指しています。

## 🚀 特徴

- **サーバーレス**: Vercel + Supabaseによる完全サーバーレス構成
- **低コスト**: 無料枠での運用が可能
- **SEO最適化**: JobPosting構造化データ、サイトマップ、OGP対応
- **レスポンシブデザイン**: モバイルファーストのUI/UX
- **管理機能**: 非技術者でも求人投稿・編集が可能

## 🛠 技術スタック

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📦 セットアップ

### 1. リポジトリのクローン

\`\`\`bash
git clone https://github.com/fortesnow/jobsite.git
cd jobsite
npm install
\`\`\`

### 2. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. SQL Editorで \`sql/init.sql\` を実行してテーブルを作成
3. プロジェクトのURL、anonキー、service roleキーを取得

### 3. 環境変数の設定

\`.env.local\` ファイルを作成：

\`\`\`bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Authentication
ADMIN_PASSWORD=your_secure_admin_password

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=求人広告サイト
\`\`\`

### 4. 開発サーバーの起動

\`\`\`bash
npm run dev
\`\`\`

## 🚀 デプロイ

### Vercelでのデプロイ

1. [Vercel](https://vercel.com)にGitHubリポジトリを連携
2. 環境変数を設定：
   - \`NEXT_PUBLIC_SUPABASE_URL\`
   - \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`
   - \`SUPABASE_SERVICE_ROLE_KEY\`
   - \`ADMIN_PASSWORD\`
   - \`NEXT_PUBLIC_SITE_URL\` (デプロイ後のURL)
   - \`NEXT_PUBLIC_SITE_NAME\`

3. デプロイが完了すると自動でサイトが公開されます

## 📁 プロジェクト構成

\`\`\`
src/
├── app/
│   ├── admin/           # 管理画面
│   ├── api/            # API Routes
│   ├── jobs/           # 求人詳細ページ
│   ├── layout.tsx      # ルートレイアウト
│   ├── page.tsx        # トップページ
│   ├── robots.ts       # robots.txt
│   └── sitemap.ts      # サイトマップ
├── components/         # Reactコンポーネント
├── lib/               # ユーティリティ
└── types/             # TypeScript型定義
\`\`\`

## 🔧 使い方

### 管理画面へのアクセス

1. \`/admin\` にアクセス
2. 設定した管理者パスワードでログイン
3. 求人の投稿・編集・削除が可能

### 求人の公開設定

- 管理画面で「求人を公開する」チェックボックスを有効にすると一般ユーザーに表示されます
- 募集終了日を設定すると自動で非表示になります（実装する場合）

## 🔒 セキュリティ

現在の認証は簡易的なパスワード認証です。本番環境では以下の改善を検討してください：

- JWT認証の実装
- セッション管理の強化
- 多要素認証の導入
- IPアドレス制限

## 📱 SEO対策

- JobPosting構造化データを自動生成
- サイトマップとrobots.txtの自動生成
- OGPタグの設定
- メタタグの最適化

## 🤝 貢献

プルリクエストや課題報告を歓迎します。

## 📄 ライセンス

MIT License