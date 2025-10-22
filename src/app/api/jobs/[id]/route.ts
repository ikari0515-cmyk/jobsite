import { NextRequest, NextResponse } from 'next/server'
import { getJobById } from '@/lib/firestore'

// 求人詳細取得（Firestoreから取得）
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }             // ✅ Promise削除
) {
  void _request
  try {
    const { id } = params                            // ✅ await削除
    const job = await getJobById(id)

    
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error('Error fetching job:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// 求人更新（デモ用無効化）
export async function PUT() {
  return NextResponse.json({ error: 'Admin features disabled in demo mode' }, { status: 503 })
}

// 求人削除（デモ用無効化）
export async function DELETE() {
  return NextResponse.json({ error: 'Admin features disabled in demo mode' }, { status: 503 })
}
