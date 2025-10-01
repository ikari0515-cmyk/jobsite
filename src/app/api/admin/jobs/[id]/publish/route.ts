import { NextRequest, NextResponse } from 'next/server'
import { toggleJobPublishStatus } from '@/lib/firestore'

// 認証チェックヘルパー
function checkAuth(request: NextRequest): boolean {
  const adminSession = request.cookies.get('admin_session')
  return adminSession?.value === 'authenticated'
}

// 公開状態変更
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
    const { is_published } = body
    const { id } = params

    if (typeof is_published !== 'boolean') {
      return NextResponse.json(
        { error: 'is_published must be a boolean' },
        { status: 400 }
      )
    }

    await toggleJobPublishStatus(id, is_published)
    
    return NextResponse.json({ 
      success: true 
    })
  } catch (error) {
    console.error('Error toggling publish status:', error)
    return NextResponse.json(
      { error: 'Failed to toggle publish status' },
      { status: 500 }
    )
  }
}

