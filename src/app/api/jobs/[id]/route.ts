import { NextRequest, NextResponse } from 'next/server'
import { getJobById } from '@/lib/firestore'

// 求人詳細取得（Firestoreから取得）
export async function GET( _request: NextRequest,
  { params }: { params: { id: string } }
) {
  void _request
  try {
    const { id } = params
    
    // デバッグログ
    console.log('APIルートが実行されました。');
    console.log('URLから取得したID:', id);

    const job = await getJobById(id)
    
    // デバッグログ
    console.log('getJobByIdの実行結果:', job);

    if (!job) {
      console.log('求人データが見つかりませんでした。404を返します。');
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

// ...
