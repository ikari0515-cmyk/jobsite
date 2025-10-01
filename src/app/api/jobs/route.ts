import { NextRequest, NextResponse } from 'next/server'
import { getPublishedJobs } from '@/lib/firestore'

// 求人一覧取得（Firestoreから取得）
export async function GET(request: NextRequest) {
  try {
    console.log('Jobs API called')
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const location = searchParams.get('location')
    const employment_type = searchParams.get('employment_type')
    const search = searchParams.get('search')

    console.log('Calling getPublishedJobs...')
    // Firestoreから公開済みの求人を取得
    let filteredJobs = await getPublishedJobs()
    console.log('Retrieved jobs:', filteredJobs.length)

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

    // ページネーション
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
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
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
