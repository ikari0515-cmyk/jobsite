# セキュリティガイド

## 🔒 実装済みのセキュリティ対策

### 1. API経由のデータアクセス

すべての管理画面操作はNext.js API Routes経由で行われます。クライアント側から直接Firebaseを操作することはありません。

#### 管理者用APIエンドポイント

- `GET /api/admin/jobs` - 全求人取得（管理者のみ）
- `POST /api/admin/jobs` - 求人作成（管理者のみ）
- `PATCH /api/admin/jobs/[id]` - 求人更新（管理者のみ）
- `DELETE /api/admin/jobs/[id]` - 求人削除（管理者のみ）
- `PATCH /api/admin/jobs/[id]/publish` - 公開状態変更（管理者のみ）

#### 一般ユーザー用APIエンドポイント

- `GET /api/jobs` - 公開求人一覧取得（認証不要）
- `GET /api/jobs/[id]` - 公開求人詳細取得（認証不要）

### 2. Cookie認証

管理画面のログインはHTTPOnly Cookieで管理されています。

- **セッション有効期限**: 7日間
- **Secure属性**: 本番環境では自動的に有効化
- **SameSite**: Lax

### 3. 環境変数の管理

すべての機密情報は環境変数で管理されています。

```bash
# 必須環境変数
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
ADMIN_PASSWORD=xxx
```

### 4. GitHubでの情報保護

- `.env.local` は `.gitignore` に含まれており、コミットされません
- `env.example` にはプレースホルダー値のみが含まれます
- コード内にハードコードされた認証情報は存在しません

## ⚠️ 重要な注意事項

### 管理者パスワード

デフォルトのパスワード `admin123` は**必ず変更**してください。

推奨パスワード要件：
- 8文字以上
- 大文字・小文字・数字・記号を含む
- 例: `Asterisk@2025!Secure`

### Firebaseセキュリティルール

Firestoreのセキュリティルールを適切に設定してください：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 求人コレクション
    match /jobs/{jobId} {
      // 読み取り: 公開されている求人のみ誰でも読める
      allow read: if resource.data.is_published == true;
      
      // 書き込み: 完全に拒否（API経由のみ許可）
      allow write: if false;
    }
  }
}
```

**重要**: クライアント側から直接Firestoreへの書き込みを完全に禁止しています。すべての書き込み操作はサーバーサイド（API Routes）経由で行われます。

### 本番環境チェックリスト

デプロイ前に以下を確認してください：

- [ ] すべての環境変数がVercelに設定されている
- [ ] `ADMIN_PASSWORD` がデフォルト値から変更されている
- [ ] Firebaseセキュリティルールが適切に設定されている
- [ ] `.env.local` がGitHubにコミットされていない
- [ ] `env.example` に実際の認証情報が含まれていない

## 🛡️ セキュリティの仕組み

### クライアント側の制限

1. **AdminDashboard.tsx** - API経由でのみデータ取得・操作
2. **JobForm.tsx** - API経由でのみ求人作成・更新
3. **firestore.ts** - サーバーサイドでのみ使用（API Routes内）

### サーバーサイドの保護

すべての管理者用APIエンドポイントでCookie認証をチェック：

```typescript
function checkAuth(request: NextRequest): boolean {
  const adminSession = request.cookies.get('admin_session')
  return adminSession?.value === 'authenticated'
}
```

認証されていない場合は `401 Unauthorized` を返します。

## 📝 脆弱性の報告

セキュリティ上の問題を発見した場合は、以下にご連絡ください：

- メール: asterisk.mt.fuji@gmail.com

## 🔄 更新履歴

- **2025-01-XX**: 初版作成
  - API経由のアクセス実装
  - Cookie認証実装
  - 環境変数管理の徹底

