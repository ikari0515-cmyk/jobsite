# Asterisk+ 求人サイト

Next.js + Firebase + Vercelで構築された保育士・幼稚園教諭専門の求人サイトです。

## 🚀 特徴

- **サーバーレス**: Vercel + Firebaseによる完全サーバーレス構成
- **低コスト**: 無料枠での運用が可能
- **SEO最適化**: JobPosting構造化データ、サイトマップ、OGP対応
- **レスポンシブデザイン**: モバイルファーストのUI/UX
- **管理機能**: 非技術者でも求人投稿・編集が可能

## 🛠 技術スタック

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📦 セットアップ

### 1. リポジトリのクローン

\`\`\`bash
git clone https://github.com/fortesnow/jobsite.git
cd jobsite
npm install
\`\`\`

### 2. Firebaseプロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com)でプロジェクトを作成
2. Firestoreデータベースを有効化
3. プロジェクト設定から認証情報を取得
4. **⚠️ 重要**: Firestoreセキュリティルールを設定（`DEPLOYMENT.md`参照）

### 3. 環境変数の設定（必須）

\`.env.local\` ファイルを作成：

\`\`\`bash
# Firebase Configuration（必須）
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here

# Admin Authentication（必須）
ADMIN_PASSWORD=your_secure_password_here
\`\`\`

⚠️ **重要**: 環境変数の設定は必須です。設定しないとアプリケーションが動作しません。

### 4. 開発サーバーの起動

\`\`\`bash
npm run dev
\`\`\`

## 🚀 デプロイ

### Vercelでのデプロイ

1. [Vercel](https://vercel.com)にGitHubリポジトリを連携
2. **必須の環境変数を設定**：
   - \`NEXT_PUBLIC_FIREBASE_API_KEY\`
   - \`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN\`
   - \`NEXT_PUBLIC_FIREBASE_PROJECT_ID\`
   - \`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET\`
   - \`NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID\`
   - \`NEXT_PUBLIC_FIREBASE_APP_ID\`
   - \`ADMIN_PASSWORD\`

3. すべての環境変数を **Production**, **Preview**, **Development** に設定
4. デプロイが完了すると自動でサイトが公開されます

⚠️ **注意**: 環境変数を追加・変更した場合は必ず再デプロイしてください。

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

- HTTPOnly Cookieによるセッション管理を実装済み
- ページリロード後も認証状態を保持（7日間有効）
- **admin123**のデフォルトパスワードは本番運用前に変更してください

⚠️ **重要**: 
- GitHubにプッシュする前に、実際の認証情報が含まれていないことを確認してください
- \`.env.local\` ファイルは \`.gitignore\` に含まれており、コミットされません

## 📱 SEO対策

- JobPosting構造化データを自動生成
- サイトマップとrobots.txtの自動生成
- OGPタグの設定
- メタタグの最適化

## 🤝 貢献

プルリクエストや課題報告を歓迎します。

## 📄 ライセンス

MIT License