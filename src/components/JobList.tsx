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
      {/* 検索結果の件数 */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          {pagination.total}件の求人が見つかりました
        </p>
      </div>

      {/* 求人リスト */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="block bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Building size={16} className="mr-2" />
                    <span>{job.company}</span>
                  </div>
                </div>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {getEmploymentTypeLabel(job.employment_type)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign size={16} className="mr-2" />
                  <span>{formatSalary(job)}</span>
                </div>
              </div>

              {job.description && (
                <p className="mt-4 text-gray-700 line-clamp-2">
                  {job.description.substring(0, 150)}
                  {job.description.length > 150 && '...'}
                </p>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={14} className="mr-1" />
                  <span>
                    {new Date(job.published_at || job.created_at).toLocaleDateString('ja-JP')}
                  </span>
                </div>
                <span className="text-blue-600 font-medium text-sm">
                  詳細を見る →
                </span>
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
