import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase設定
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyA6LQDyPWekDOVyTS3pI5kEjqfhi90Wqz8",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "asterisk-c9136.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "asterisk-c9136",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "asterisk-c9136.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "230482047043",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:230482047043:web:9ccbffac1f366d199064f6"
}

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig)

// Firestoreデータベースを取得
export const db = getFirestore(app)

export default app
