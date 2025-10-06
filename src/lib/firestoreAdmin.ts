// src/lib/firestoreAdmin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

if (!getApps().length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY

  // 改行・余分な引用符を確実に処理
  const formattedKey = privateKey
    ?.replace(/\\n/g, '\n')
    ?.replace(/"/g, '')
    ?.trim()

  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: formattedKey,
    }),
  })
}

export const adminDb = getFirestore()

export async function getAllJobs() {
  const snapshot = await adminDb.collection('jobs').orderBy('created_at', 'desc').get()
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export async function createJob(jobData: any) {
  const now = new Date()
  const data = {
    ...jobData,
    created_at: now,
    updated_at: now,
    published_at: jobData.is_published ? now : null,
  }
  const docRef = await adminDb.collection('jobs').add(data)
  return docRef.id
}
