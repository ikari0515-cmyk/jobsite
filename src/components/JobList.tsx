'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { Job } from '@/types/database'

// --- 求人数取得用 ---
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

// --- メインコンポーネント ---
export function JobList() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    fetchJobs()
  }, [searchParams])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/jobs?${new URLSearchParams(Object.fromEntries(searchParams.entries())).toString()}`)
      const data = await res.json()
      setJobs(data.jobs)
    } catch (err) {
      setError('求人データの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  // --- 本採用時の給与フォーマット関数 ---
  const formatSalary = (job: Job) => {
    if (job.salary_type === 'negotiable') return '給与応相談'
    const formatAmount = (amount: number, type: string) => {
      if (type === 'monthly' || type === 'yearly') return (amount / 10000).toLocaleString()
      return amount.toLocaleString()
    }
    const salaryUnit = { hourly: '円/時', monthly: '万円/月', yearly: '万円/年' }[job.salary_type] || ''
    
    if (job.salary_min && job.salary_max) {
      return `${formatAmount(job.salary_min, job.salary_type)}-${formatAmount(job.salary_max, job.salary_type)}${salaryUnit}`
    } else if (job.salary_min) {
      return `${formatAmount(job.salary_min, job.salary_type)}${salaryUnit}〜`
    }
    return '給与応相談'
  }

  if (loading) return <p>読み込み中...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <Link
          key={job.id}
          href={`/jobs/${job.id}`}
          className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200"
        >
          <div className="p-5 sm:p-6">
            {/* ▼ 修正: 雇用形態バッジ ＋ お試し不可バッジの横並び */}
            <div className="mb-3 flex flex-wrap gap-2 items-center">
              <span
                className={`inline-block px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${
                  job.employment_type === 'full_time'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : job.employment_type === 'part_time'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : job.employment_type === 'contract'
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : job.employment_type === 'temporary'
                    ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                    : 'bg-gray-50 text-gray-600 border border-gray-200'
                }`}
              >
                {job.employment_type === 'full_time'
                  ? '正社員'
                  : job.employment_type === 'part_time'
                  ? 'アルバイト・パート'
                  : job.employment_type === 'contract'
                  ? '契約社員'
                  : job.employment_type === 'temporary'
                  ? '派遣・臨時'
                  : 'その他'}
              </span>

              {/* ▼ 追加: お試し勤務不可の目立つマーク */}
              {!job.short_term_available && (
                <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-red-50 text-red-700 border border-red-200">
                  お試し勤務不可
                </span>
              )}
            </div>

            {/* タイトル */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 leading-tight">
              {job.title}
            </h3>

            {/* 会社名 */}
            <div className="flex items-center text-gray-700 text-sm mb-4">
              <span className="font-medium">{job.company}</span>
            </div>

            {/* ▼ 修正: 本採用後の情報（給与・勤務時間・休日）に変更 */}
            <div className="mt-5 grid gap-3 sm:gap-4">
              
              {/* 本採用時の給与 */}
              <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex-shrink-0">
                  💰
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800">給与</p>
                  <p className="text-sm text-gray-700 truncate">{formatSalary(job)}</p>
                </div>
              </div>

              {/* 勤務時間 */}
              <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 flex-shrink-0">
                  🕒
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800">勤務時間</p>
                  <p className="text-sm text-gray-700 truncate">{job.working_hours || '情報なし'}</p>
                </div>
              </div>

              {/* 休日 */}
              <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                  🗓️
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800">休日</p>
                  <p className="text-sm text-gray-700 truncate">{job.holidays || '情報なし'}</p>
                </div>
              </div>

            </div>
          </div>

          {/* ▼ 修正: ボタン文言をお試し可否で切り替え */}
          <div className="flex justify-center mt-6 mb-4">
            <div className="inline-flex justify-center items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base">
              {job.short_term_available ? 'お試し勤務・採用条件の詳細をみる' : '採用条件の詳細をみる'}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}