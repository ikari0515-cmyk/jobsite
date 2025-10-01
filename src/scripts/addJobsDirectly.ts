// Firestoreに直接データを登録するスクリプト（セキュリティルール開放後）
// ⚠️ このスクリプトは開発時のみ使用してください
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, connectFirestoreEmulator } from 'firebase/firestore'
import { sampleJobs } from '@/data/sampleJobs'

// 環境変数から設定を読み込み
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function addJobsDirectly() {
  console.log('Firestoreに求人データを直接追加しています...')
  
  try {
    for (let i = 0; i < sampleJobs.length; i++) {
      const job = sampleJobs[i]
      
      // idフィールドを除外してFirestoreに送信
      const { id, ...jobData } = job
      
      // 日付フィールドを適切に変換
      const jobWithDates = {
        ...jobData,
        created_at: new Date(),
        updated_at: new Date(),
        published_at: jobData.is_published ? new Date() : null,
        expires_at: jobData.expires_at ? new Date(jobData.expires_at) : null
      }
      
      const docRef = await addDoc(collection(db, 'jobs'), jobWithDates)
      console.log(`求人 ${i + 1}/6 を追加しました (ID: ${docRef.id}): ${job.title}`)
    }
    
    console.log('すべての求人データが正常に追加されました!')
    console.log('Firebase Console (https://console.firebase.google.com) でデータを確認してください。')
  } catch (error) {
    console.error('データ追加中にエラーが発生しました:', error)
    console.log('\nFirestoreのセキュリティルールを以下のように一時的に変更してください:')
    console.log('rules_version = \'2\';')
    console.log('service cloud.firestore {')
    console.log('  match /databases/{database}/documents {')
    console.log('    match /{document=**} {')
    console.log('      allow read, write: if true;')
    console.log('    }')
    console.log('  }')
    console.log('}')
  }
}

addJobsDirectly()
