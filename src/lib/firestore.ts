import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp,
  FirestoreError 
} from 'firebase/firestore'
import { db } from './firebase'
import type { Job, JobInsert, JobUpdate } from '@/types/database'

const JOBS_COLLECTION = 'jobs'

// Date型をTimestamp型に変換するヘルパー関数
const convertDatesToTimestamps = (data: any) => {
  const converted = { ...data }
  if (data.created_at instanceof Date) {
    converted.created_at = Timestamp.fromDate(data.created_at)
  }
  if (data.updated_at instanceof Date) {
    converted.updated_at = Timestamp.fromDate(data.updated_at)
  }
  if (data.published_at instanceof Date) {
    converted.published_at = Timestamp.fromDate(data.published_at)
  }
  if (data.expires_at instanceof Date) {
    converted.expires_at = Timestamp.fromDate(data.expires_at)
  }
  return converted
}

// Timestamp型をDate型に変換するヘルパー関数
const convertTimestampsToDates = (data: any): Job => {
  try {
    return {
      ...data,
      created_at: data.created_at?.toDate ? data.created_at.toDate() : new Date(data.created_at || Date.now()),
      updated_at: data.updated_at?.toDate ? data.updated_at.toDate() : new Date(data.updated_at || Date.now()),
      published_at: data.published_at?.toDate ? data.published_at.toDate() : (data.published_at ? new Date(data.published_at) : null),
      expires_at: data.expires_at?.toDate ? data.expires_at.toDate() : (data.expires_at ? new Date(data.expires_at) : null),
    }
  } catch (error) {
    console.error('Error converting timestamps:', error, data)
    // フォールバック: 基本的なデータ構造を返す
    return {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      published_at: new Date(),
      expires_at: null,
    }
  }
}

// 全ての求人を取得（管理者用）
export const getAllJobs = async (): Promise<Job[]> => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, JOBS_COLLECTION), orderBy('created_at', 'desc'))
    )
    return querySnapshot.docs.map(doc => 
      convertTimestampsToDates({ id: doc.id, ...doc.data() })
    )
  } catch (error) {
    console.error('Error fetching all jobs:', error)
    throw error
  }
}

// 公開されている求人のみ取得（一般ユーザー用）
export const getPublishedJobs = async (): Promise<Job[]> => {
  try {
    console.log('Fetching published jobs from Firestore...')
    
    // まず、orderBy付きのクエリを試行
    let querySnapshot
    try {
      querySnapshot = await getDocs(
        query(
          collection(db, JOBS_COLLECTION), 
          where('is_published', '==', true),
          orderBy('published_at', 'desc')
        )
      )
    } catch (orderError) {
      console.warn('OrderBy query failed, trying simple query:', orderError)
      // orderByが失敗した場合、単純なクエリにフォールバック
      querySnapshot = await getDocs(
        query(
          collection(db, JOBS_COLLECTION), 
          where('is_published', '==', true)
        )
      )
    }
    
    console.log('Raw docs count:', querySnapshot.docs.length)
    
    const jobs = querySnapshot.docs.map(doc => {
      const data = { id: doc.id, ...doc.data() }
      console.log('Processing doc:', doc.id)
      return convertTimestampsToDates(data)
    })
    
    // 手動でソート（orderByが使えない場合のフォールバック）
    jobs.sort((a, b) => {
      const dateA = a.published_at || a.created_at
      const dateB = b.published_at || b.created_at
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })
    
    console.log('Converted jobs:', jobs.length)
    return jobs
  } catch (error) {
    console.error('Error fetching published jobs:', error)
    if (error instanceof FirestoreError) {
      console.error('Firestore error code:', error.code)
      console.error('Firestore error message:', error.message)
    }
    throw error
  }
}

// 特定の求人を取得
export const getJobById = async (id: string): Promise<Job | null> => {
  try {
    const docRef = doc(db, JOBS_COLLECTION, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return convertTimestampsToDates({ id: docSnap.id, ...docSnap.data() })
    }
    return null
  } catch (error) {
    console.error('Error fetching job by ID:', error)
    throw error
  }
}

// 新しい求人を作成
export const createJob = async (jobData: JobInsert): Promise<string> => {
  try {
    const now = new Date()
    const dataWithTimestamps = convertDatesToTimestamps({
      ...jobData,
      created_at: now,
      updated_at: now,
      published_at: jobData.is_published ? now : null,
    })
    
    const docRef = await addDoc(collection(db, JOBS_COLLECTION), dataWithTimestamps)
    return docRef.id
  } catch (error) {
    console.error('Error creating job:', error)
    throw error
  }
}

// 求人を更新
export const updateJob = async (id: string, updates: JobUpdate): Promise<void> => {
  try {
    const docRef = doc(db, JOBS_COLLECTION, id)
    const dataWithTimestamps = convertDatesToTimestamps({
      ...updates,
      updated_at: new Date(),
    })
    
    await updateDoc(docRef, dataWithTimestamps)
  } catch (error) {
    console.error('Error updating job:', error)
    throw error
  }
}

// 求人を削除
export const deleteJob = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, JOBS_COLLECTION, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting job:', error)
    throw error
  }
}

// 求人の公開状態を切り替え
export const toggleJobPublishStatus = async (id: string, isPublished: boolean): Promise<void> => {
  try {
    const updates: JobUpdate = {
      is_published: isPublished,
      updated_at: new Date(),
    }
    
    if (isPublished) {
      updates.published_at = new Date()
    }
    
    await updateJob(id, updates)
  } catch (error) {
    console.error('Error toggling publish status:', error)
    throw error
  }
}
