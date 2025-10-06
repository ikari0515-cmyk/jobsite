import { NextRequest, NextResponse } from 'next/server'
import { getAllJobs, createJob } from '@/lib/firestoreAdmin'
import type { JobInsert } from '@/types/database'

// 認証チェックヘルパー
function checkAuth(request: NextRequest): boolean {
  const adminSession = request.cookies.get('admin_session')
  return adminSession?.value === 'authenticated'
}

// 全求人取得（管理者用）
export async function GET(request: NextRequest) {
  // 認証チェック
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const jobs = await getAllJobs()
    return NextResponse.json({ jobs })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}

// 求人作成
export async function POST(request: NextRequest) {
  // 認証チェック
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const jobData: JobInsert = body

    const jobId = await createJob(jobData)
    
    return NextResponse.json({ 
      success: true, 
      jobId 
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    )
  }
}
