'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { MapPin, Building, Clock } from 'lucide-react'
import type { Job } from '@/types/database'
// 求人数を取得する関数（サービスページで利用）
export async function getJobCount() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/jobs`, {
      cache: 'no-store',
    })
    if (!res.ok) throw new Error('Failed to fetch jobs')
    const data = await res.json()
    return data.pagination?.total || data.jobs?.length || 0
  } catch (error) {
    console.error('Error fetching job count:', error)
    return 0
  }
}

export function JobList() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()

  useEffect(() => {
    fetchJobs()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      setError(null)

      // APIから求人データを取得
      const queryParams = new URLSearchParams()
      
      // 検索パラメータを追加
      const page = searchParams.get('page') || '1'
      const location = searchParams.get('location')
      const employmentType = searchParams.get('employment_type') 
      const search = searchParams.get('search')
      
      queryParams.set('page', page)
      queryParams.set('limit', '20')
      
      if (location) queryParams.set('location', location)
      if (employmentType) queryParams.set('employment_type', employmentType)
      if (search) queryParams.set('search', search)
      
      const response = await fetch(`/api/jobs?${queryParams.toString()}`)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error:', response.status, errorText)
        throw new Error(`求人データの取得に失敗しました (${response.status})`)
      }
      
      const data = await response.json()
      console.log('Fetched jobs data:', data)
      
      // 特徴フィルタリング（クライアントサイド）
      const features = searchParams.get('features')?.split(',').filter(Boolean) || []
      let filteredJobs = data.jobs
      
      if (features.length > 0) {
        filteredJobs = data.jobs.filter((job: Job) =>
          features.every(feature => {
            switch (feature) {
              case 'housing':
                return job.benefits?.includes('住宅手当') ?? false
              case 'unexperienced':
                return job.requirements?.includes('未経験') ?? false
              case 'career_break':
                return job.requirements?.includes('ブランク') ?? false
              case 'bonus':
                return job.benefits?.includes('賞与') ?? false
              case 'small_scale':
                return job.title.includes('小規模') || job.description.includes('小規模')
              default:
                return false
            }
          })
        )
      }
      
      setJobs(filteredJobs)
      setPagination(data.pagination)
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const formatSalary = (job: Job) => {
    if (job.salary_type === 'negotiable') {
      return '給与応相談'
    }

    // 月給・年収は円単位で保存されているため、万円に変換
    const formatAmount = (amount: number, type: string) => {
      if (type === 'monthly' || type === 'yearly') {
        return (amount / 10000).toLocaleString()
      }
      return amount.toLocaleString()
    }

    const salaryUnit = {
      hourly: '円/時',
      monthly: '万円/月',
      yearly: '万円/年'
    }[job.salary_type] || ''

    if (job.salary_min && job.salary_max) {
      return `${formatAmount(job.salary_min, job.salary_type)}-${formatAmount(job.salary_max, job.salary_type)}${salaryUnit}`
    } else if (job.salary_min) {
      return `${formatAmount(job.salary_min, job.salary_type)}${salaryUnit}〜`
    }
    return '給与応相談'
  }

  const getEmploymentTypeLabel = (type: string) => {
    const labels = {
      full_time: '正社員',
      part_time: 'パート',
      contract: '契約社員',
      temporary: '派遣'
    }
    return labels[type as keyof typeof labels] || type
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="animate-pulse space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={fetchJobs}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          再試行
        </button>
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
        <p className="text-gray-600">該当する求人が見つかりませんでした。</p>
        <p className="text-sm text-gray-500 mt-2">検索条件を変更して再度お試しください。</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 検索結果ヘッダー - バイトル風 */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 font-bold text-lg">{pagination.total}件</span>
              <span className="text-gray-600 text-sm">の求人が見つかりました</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <span className="text-gray-500">平均時給</span>
                <span className="font-bold text-green-600">1,550円</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-gray-500">平均月給</span>
                <span className="font-bold text-green-600">25万円</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-blue-600 hover:underline text-sm">
              この条件を保存する
            </button>
            <select className="border rounded px-3 py-1 text-sm">
              <option>おすすめ順</option>
              <option>新着順</option>
              <option>時給順</option>
              <option>月給順</option>
            </select>
          </div>
        </div>
      </div>

 {/* お試し勤務カード一覧 */}
<div className="space-y-4">
  {jobs.map((job) => (
    <Link
      key={job.id}
      href={`/jobs/${job.id}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-blue-300"
    >
      <div className="p-5 sm:p-6">
        {/* 雇用形態タグ */}
        <div className="mb-2">
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
              job.employment_type === 'full_time'
                ? 'bg-blue-100 text-blue-800'
                : job.employment_type === 'part_time'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {job.employment_type === 'full_time'
              ? '正社員'
              : job.employment_type === 'part_time'
              ? 'パート'
              : 'その他'}
          </span>
        </div>

        {/* タイトル・会社名 */}
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{job.title}</h3>
        <div className="flex items-center text-sm text-gray-700 mb-3">
          <Building size={15} className="mr-2 text-gray-400" />
          {job.company}
        </div>

        {/* お試し勤務情報ブロック */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-gray-700 w-24">給与</span>
            <span className="text-gray-900 text-right">
              {job.short_term_salary
                ? `時給${job.short_term_salary.toLocaleString()}円`
                : '情報なし'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-gray-700 w-24">勤務形態</span>
            <span className="text-gray-900 text-right">
              {job.short_term_work_style || '情報なし'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-gray-700 w-24">交通費</span>
            <span className="text-gray-900 text-right">
              {job.short_term_transportation_fee === null
                ? '情報なし'
                : job.short_term_transportation_fee
                ? '支給あり'
                : '支給なし'}
            </span>
          </div>
        </div>

        {/* ボタン */}
        <div className="mt-5 text-center">
          <a
            href={`/jobs/${job.id}`}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold py-3 rounded-lg shadow-md transition-colors"
          >
            お試し勤務・採用条件の詳細をみる
          </a>
        </div>
      </div>
    </Link>
  ))}
</div>

    
      {/* ページネーション */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {[...Array(pagination.totalPages)].map((_, i) => {
            const page = i + 1
            const current = pagination.page
            const isActive = page === current

            return (
              <Link
                key={page}
                href={`?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), page: page.toString() }).toString()}`}
                className={`px-3 py-2 text-sm rounded ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border'
                }`}
              >
                {page}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
