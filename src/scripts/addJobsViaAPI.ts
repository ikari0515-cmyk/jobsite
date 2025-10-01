// APIエンドポイント経由でFirestoreにサンプルデータを登録するスクリプト
import { sampleJobs } from '@/data/sampleJobs'

const API_BASE_URL = 'http://localhost:3000'
const ADMIN_PASSWORD = 'admin123'

async function addJobsViaAPI() {
  console.log('APIエンドポイント経由でFirestoreに求人データを追加しています...')
  
  try {
    for (let i = 0; i < sampleJobs.length; i++) {
      const job = sampleJobs[i]
      
      // idフィールドを除外してAPIに送信
      const { id, created_at, updated_at, published_at, ...jobData } = job
      
      const response = await fetch(`${API_BASE_URL}/api/admin/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_PASSWORD}`
        },
        body: JSON.stringify({
          ...jobData,
          is_published: true
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`API Error: ${errorData.error}`)
      }
      
      const result = await response.json()
      console.log(`求人 ${i + 1}/6 を追加しました (ID: ${result.id}): ${job.title}`)
    }
    
    console.log('すべての求人データが正常に追加されました!')
  } catch (error) {
    console.error('データ追加中にエラーが発生しました:', error)
  }
}

addJobsViaAPI()
