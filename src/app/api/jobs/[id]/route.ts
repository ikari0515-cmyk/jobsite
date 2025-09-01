import { NextRequest, NextResponse } from 'next/server'
import { sampleJobs } from '@/data/sampleJobs'

// 求人詳細取得（サンプルデータ使用）
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const job = sampleJobs.find(job => job.id === id)
    
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    return NextResponse.json(job)
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// 求人更新（デモ用無効化）
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return NextResponse.json({ error: 'Admin features disabled in demo mode' }, { status: 503 })
}

// 求人削除（デモ用無効化）
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return NextResponse.json({ error: 'Admin features disabled in demo mode' }, { status: 503 })
}
