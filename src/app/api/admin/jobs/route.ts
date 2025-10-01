import { NextRequest, NextResponse } from 'next/server'
import { getAllJobs, createJob } from '@/lib/firestore'
import type { JobInsert } from '@/types/database'

// 管理者用求人一覧取得（公開・非公開全て）
export async function GET(request: NextRequest) {
  try {
    // 簡単な認証チェック
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const jobs = await getAllJobs()
    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// 管理者用求人作成
export async function POST(request: NextRequest) {
  try {
    // 簡単な認証チェック
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const jobData: JobInsert = await request.json()
    const jobId = await createJob(jobData)
    
    return NextResponse.json({ id: jobId, message: 'Job created successfully' })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
