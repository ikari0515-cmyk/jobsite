# デプロイ手順

## 🔥 Firebase設定（最重要！）

### 1. Firebaseセキュリティルールのデプロイ

**⚠️ これを設定しないと誰でもデータベースを操作できます！**

#### 方法1: Firebase Console（推奨）

1. [Firebase Console](https://console.firebase.google.com) にアクセス
2. プロジェクトを選択
3. 左メニューから「Firestore Database」を選択
4. 「ルール」タブをクリック
5. 以下のルールを貼り付けて「公開」をクリック：

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // 求人コレクション
    match /jobs/{jobId} {
      // 読み取り: 公開されている求人のみ誰でも閲覧可能
      allow read: if resource.data.is_published == true;
      
      // 書き込み: 完全に拒否
      // すべての書き込みはサーバーサイド（Next.js API Routes）経由でのみ可能
      allow create: if false;
      allow update: if false;
      allow delete: if false;
    }
    
    // その他のコレクション: すべて拒否
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

#### 方法2: Firebase CLI

```bash
# Firebase CLIをインストール
npm install -g firebase-tools

# Firebaseにログイン
firebase login

# プロジェクトを初期化（既存の場合はスキップ）
firebase init firestore

# ルールをデプロイ
firebase deploy --only firestore:rules
```

### 2. セキュリティルールの確認

デプロイ後、Firebase Consoleで「ルール」タブを確認し、以下が設定されていることを確認：

- ✅ 求人の読み取り：公開済みのみ許可
- ✅ 求人の書き込み：完全に拒否
- ✅ その他のコレクション：すべて拒否

### 3. テスト

#### 正常に動作するケース
- ✅ 一般ユーザーが公開求人を閲覧できる
- ✅ 管理者が管理画面で求人を作成/編集/削除できる（API経由）

#### ブロックされるケース
- ❌ ブラウザコンソールから直接Firestoreを操作しようとするとエラー
- ❌ 非公開求人は閲覧不可

## 🚀 Vercelデプロイ

### 1. 環境変数の設定

Vercel Dashboard → Settings → Environment Variables

```bash
# Firebase Configuration（必須）
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Admin Authentication（必須）
ADMIN_PASSWORD=your_secure_password
```

すべての環境変数を **Production**, **Preview**, **Development** に設定

### 2. デプロイ

```bash
# Vercel CLIの場合
vercel --prod

# またはGitHubプッシュで自動デプロイ
git push origin main
```

### 3. デプロイ後の確認

- ✅ 環境変数がすべて設定されている
- ✅ サイトが正常に表示される
- ✅ 管理画面にログインできる
- ✅ Firebaseセキュリティルールが適用されている

## ⚠️ デプロイ前チェックリスト

### 必須項目

- [ ] Firebaseセキュリティルールをデプロイした
- [ ] Vercelに全環境変数を設定した
- [ ] `ADMIN_PASSWORD` をデフォルトから変更した
- [ ] `.env.local` がGitHubにコミットされていない
- [ ] 管理画面にログインできることを確認した
- [ ] 一般ユーザーが求人を閲覧できることを確認した
- [ ] ブラウザコンソールから直接Firestoreを操作できないことを確認した

### セキュリティ確認

ブラウザのコンソールで以下を実行して、エラーになることを確認：

```javascript
// これがエラーになればOK
import { getFirestore, collection, getDocs } from 'firebase/firestore'
const db = getFirestore()
const snapshot = await getDocs(collection(db, 'jobs'))
// Expected: FirebaseError: Missing or insufficient permissions
```

## 🆘 トラブルシューティング

### 「Missing or insufficient permissions」エラー

- ✅ **正常です**：これはセキュリティルールが正しく機能している証拠
- API経由でのアクセスは正常に動作します

### 管理画面で操作できない

1. Cookie認証が有効か確認
2. 環境変数 `ADMIN_PASSWORD` が正しく設定されているか確認
3. ブラウザのCookieをクリアして再ログイン

### 一般ユーザーが求人を見られない

1. 求人の `is_published` が `true` になっているか確認
2. Firebaseセキュリティルールが正しくデプロイされているか確認

## 📞 サポート

問題が解決しない場合：
- メール: asterisk.mt.fuji@gmail.com
- Firebase Console で直接ルールを確認

