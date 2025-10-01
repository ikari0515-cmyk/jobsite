import { NextRequest, NextResponse } from 'next/server'
import { updateJob, deleteJob } from '@/lib/firestore'
import type { JobUpdate } from '@/types/database'

// 認証チェックヘルパー
function checkAuth(request: NextRequest): boolean {
  const adminSession = request.cookies.get('admin_session')
  return adminSession?.value === 'authenticated'
}

// 求人更新
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // 認証チェック
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const updates: JobUpdate = body
    const { id } = params

    await updateJob(id, updates)
    
    return NextResponse.json({ 
      success: true 
    })
  } catch (error) {
    console.error('Error updating job:', error)
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    )
  }
}

// 求人削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // 認証チェック
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = params
    await deleteJob(id)
    
    return NextResponse.json({ 
      success: true 
    })
  } catch (error) {
    console.error('Error deleting job:', error)
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    )
  }
}

