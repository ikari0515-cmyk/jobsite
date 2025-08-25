'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { MapPin, Building, Clock, DollarSign } from 'lucide-react'
import type { Job } from '@/types/database'

interface JobListResponse {
  jobs: Job[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
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

      const params = new URLSearchParams()
      if (searchParams.get('page')) params.set('page', searchParams.get('page')!)
      if (searchParams.get('location')) params.set('location', searchParams.get('location')!)
      if (searchParams.get('employment_type')) params.set('employment_type', searchParams.get('employment_type')!)
      if (searchParams.get('search')) params.set('search', searchParams.get('search')!)

      const response = await fetch(`/api/jobs?${params.toString()}`)
      if (!response.ok) {
        throw new Error('求人情報の取得に失敗しました')
      }

      const data: JobListResponse = await response.json()
      setJobs(data.jobs)
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

    const salaryUnit = {
      hourly: '円/時',
      monthly: '万円/月',
      yearly: '万円/年'
    }[job.salary_type] || ''

    if (job.salary_min && job.salary_max) {
      return `${job.salary_min.toLocaleString()}-${job.salary_max.toLocaleString()}${salaryUnit}`
    } else if (job.salary_min) {
      return `${job.salary_min.toLocaleString()}${salaryUnit}〜`
    }
    return '給与応相談'
  }

  const getEmploymentTypeLabel = (type: string) => {
    const labels = {
      full_time: '正社員',
      part_time: 'アルバイト・パート',
      contract: '契約社員',
      temporary: '派遣・臨時'
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

      {/* 求人リスト */}
      <div className="space-y-3">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="block bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-200 hover:border-blue-200"
          >
            <div className="p-4 sm:p-6">
              {/* 上部: 雇用形態タグと投稿日 */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                    {getEmploymentTypeLabel(job.employment_type)}
                  </span>
                  {job.salary_type !== 'negotiable' && (
                    <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                      高時給
                    </span>
                  )}
                  <span className="inline-block bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">
                    NEW
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={12} className="mr-1" />
                  <span>
                    {new Date(job.published_at || job.created_at).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              </div>

              {/* メイン情報 */}
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {job.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Building size={16} className="mr-2 flex-shrink-0" />
                  <span className="truncate">{job.company}</span>
                </div>
              </div>

              {/* 主要情報グリッド */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-700 truncate">{job.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign size={16} className="mr-2 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-bold text-green-600">{formatSalary(job)}</span>
                </div>
              </div>

              {/* 勤務時間と特徴 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                <div className="text-gray-600">
                  <span className="font-medium">勤務時間:</span> 08:00〜17:00など
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    交通費支給
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    制服貸与
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    週1〜OK
                  </span>
                </div>
              </div>

              {/* 説明文 */}
              {job.description && (
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                  {job.description.substring(0, 100)}
                  {job.description.length > 100 && '...'}
                </p>
              )}

              {/* 下部: アクションボタン */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center space-x-3">
                  <button className="text-xs text-gray-500 hover:text-blue-600 flex items-center">
                    <span className="mr-1">♡</span>キープ
                  </button>
                  <button className="text-xs text-gray-500 hover:text-blue-600">
                    友達に教える
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 font-bold text-sm">
                    詳細を見る
                  </span>
                  <span className="text-blue-600">→</span>
                </div>
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
