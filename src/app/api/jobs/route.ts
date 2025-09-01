import { NextRequest, NextResponse } from 'next/server'
import { sampleJobs } from '@/data/sampleJobs'

// 求人一覧取得（公開済みのみ）
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const location = searchParams.get('location')
    const employment_type = searchParams.get('employment_type')
    const search = searchParams.get('search')

    let query = supabase
      .from('jobs')
      .select('*', { count: 'exact' })
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    // フィルター適用
    if (location) {
      query = query.ilike('location', `%${location}%`)
    }
    if (employment_type) {
      query = query.eq('employment_type', employment_type)
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,company.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // ページネーション
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      jobs: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// 求人作成（管理者のみ）
export async function POST(request: NextRequest) {
  try {
    // 簡単な認証チェック
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: JobInsert = await request.json()

    // バリデーション
    if (!body.title || !body.company || !body.location || !body.description) {
      return NextResponse.json(
        { error: 'Required fields: title, company, location, description' },
        { status: 400 }
      )
    }

    // 公開設定時は published_at を設定
    if (body.is_published) {
      body.published_at = new Date().toISOString()
    }

    const { data, error } = await supabaseAdmin
      .from('jobs')
      .insert(body)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
