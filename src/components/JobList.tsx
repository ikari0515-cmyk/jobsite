'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Building } from 'lucide-react'
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
        {/* 雇用形態 */}
        <div className="mb-3">
          <span
            className={`inline-block px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${
              job.employment_type === 'full_time'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : job.employment_type === 'part_time'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-gray-50 text-gray-600 border border-gray-200'
            }`}
          >
            {job.employment_type === 'full_time'
              ? '正社員'
              : job.employment_type === 'part_time'
              ? 'パート'
              : 'その他'}
          </span>
        </div>

        {/* タイトル */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 leading-tight">
          {job.title}
        </h3>

        {/* 会社名 */}
        <div className="flex items-center text-gray-700 text-sm mb-4">
          <span className="font-medium">{job.company}</span>
        </div>

        {/* 情報ボックス */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 sm:p-5 space-y-2 sm:space-y-3">
          <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 text-sm sm:text-base">
            <span className="font-semibold text-gray-700 whitespace-nowrap">給与</span>
            <span className="text-gray-900 break-words">
              {job.short_term_salary
                ? `時給${job.short_term_salary.toLocaleString()}円`
                : '情報なし'}
            </span>

            <span className="font-semibold text-gray-700 whitespace-nowrap">勤務形態</span>
            <span className="text-gray-900 break-words">
              {job.short_term_work_style || '情報なし'}
            </span>

            <span className="font-semibold text-gray-700 whitespace-nowrap">交通費</span>
            <span className="text-gray-900 break-words">
              {job.short_term_transportation_fee === null
                ? '情報なし'
                : job.short_term_transportation_fee
                ? '支給あり'
                : '支給なし'}
            </span>
          </div>
        </div>

        {/* ボタン */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <a
            href={`/jobs/${job.id}`}
            className="block w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-md text-center transition-all duration-200"
          >
            お試し勤務・採用条件の詳細をみる
          </a>
        </div>
      </div>
    </Link>
  ))}
</div>

  )
}
