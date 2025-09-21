import { NextRequest, NextResponse } from 'next/server'
import { sampleJobs } from '@/data/sampleJobs'

// 求人一覧取得（サンプルチE�Eタ使用�E�E
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const location = searchParams.get('location')
    const employment_type = searchParams.get('employment_type')
    const search = searchParams.get('search')

    // サンプルチE�Eタから公開済みの求人のみフィルタ
    let filteredJobs = sampleJobs.filter(job => job.is_published)
    
    // 投稿日で降頁E��ーチE
    filteredJobs.sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime())

    // フィルター適用
    if (location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.includes(location)
      )
    }
    if (employment_type) {
      filteredJobs = filteredJobs.filter(job => 
        job.employment_type === employment_type
      )
    }
    if (search) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.includes(search) || 
        job.company.includes(search) ||
        job.description.includes(search)
      )
    }

    // ペ�Eジネ�Eション
    const total = filteredJobs.length
    const from = (page - 1) * limit
    const to = from + limit
    const paginatedJobs = filteredJobs.slice(from, to)

    return NextResponse.json({
      jobs: paginatedJobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// 求人作�E�E�デモ版では無効化！E
export async function POST() {
  return NextResponse.json(
    { error: 'Demo version - POST not implemented' },
    { status: 501 }
  )
}
