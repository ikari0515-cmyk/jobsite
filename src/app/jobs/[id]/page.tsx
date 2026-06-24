import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Building, Clock, ArrowLeft, Calendar } from 'lucide-react'
import { JobStructuredData } from '@/components/JobStructuredData'
import type { Job } from '@/types/database'
import Image from "next/image"

async function getJob(id: string): Promise<Job | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/jobs/${id}`, { cache: 'no-store' })
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('Error fetching job:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const job = await getJob(params.id)
  if (!job) return { title: '求人が見つかりません' }
  return { title: `${job.title} - ${job.company} | 求人広告サイト` }
}

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id)
  if (!job) notFound()

  const shortTermSalaryText = job.short_term_salary?.trim() || '情報が登録されていません'
  const shortTermWorkStyleText = job.short_term_work_style?.trim() || '情報が登録されていません'
  const shortTermTransportationText = job.short_term_transportation_fee ? '支給あり' : '支給なし'
  const showShortTermSummary = Boolean(job.short_term_available)

  const formatSalary = () => {
    if (job.salary_type === 'negotiable') return '給与応相談'
    const formatAmount = (amount: number, type: string) => (type === 'monthly' || type === 'yearly' ? (amount / 10000).toLocaleString() : amount.toLocaleString())
    const salaryUnit = { hourly: '円/時', monthly: '万円/月', yearly: '万円/年' }[job.salary_type] || ''
    return job.salary_min && job.salary_max ? `${formatAmount(job.salary_min, job.salary_type)}-${formatAmount(job.salary_max, job.salary_type)}${salaryUnit}` : `${formatAmount(job.salary_min || 0, job.salary_type)}${salaryUnit}〜`
  }

  const getEmploymentTypeLabel = (type: string) => ({ full_time: '正社員', part_time: 'アルバイト・パート', contract: '契約社員', temporary: '派遣・臨時' }[type] || type)

  return (
    <>
      <JobStructuredData job={job} />
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link href="/service" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeft size={20} className="mr-2" /> お試し勤務一覧に戻る
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">求人詳細</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* ▼ 修正: grid(横並び)設定を削除し、space-y-6(縦並びの余白)のみに変更しました */}
          <div className="space-y-6">
            
            {/* 基本情報 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {showShortTermSummary && (
                <div className="mb-4"><span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-orange-100 text-orange-800 border border-orange-200">★ お試し勤務からスタート</span></div>
              )}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h2>
                  <div className="flex items-center text-gray-600 mb-2"><Building size={20} className="mr-2" /> <span className="text-lg">{job.company}</span></div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg text-sm font-medium text-center">
                    {showShortTermSummary ? <><span className="text-xs block text-blue-600 mb-0.5">登用チャンスあり</span>{getEmploymentTypeLabel(job.employment_type)}採用</> : getEmploymentTypeLabel(job.employment_type)}
                  </span>
                </div>
              </div>
              {showShortTermSummary && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
                  <p className="text-sm text-yellow-800 font-medium">【重要】本ページに記載の給与・待遇について<br/>以下の募集内容は、お試し勤務終了後、採用基準を満たし正式に登用された場合の条件となります。お試し期間中の詳細については、下部をご確認ください。</p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div className="flex items-center"><MapPin size={18} className="mr-2" />{job.location}</div>
                <div className="flex items-center"><span className="text-green-500 mr-2 font-bold text-lg">￥</span>{formatSalary()}</div>
                <div className="flex items-center"><Calendar size={18} className="mr-2" />掲載日: {new Date(job.published_at || job.created_at).toLocaleDateString('ja-JP')}</div>
                {job.expires_at && (
                  <div className="flex items-center"><Clock size={18} className="mr-2" />募集終了: {new Date(job.expires_at).toLocaleDateString('ja-JP')}</div>
                )}
              </div>
            </div>

            {/* 企業紹介 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">企業紹介</h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
              </div>
            </div>

            {/* 募集内容詳細 */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">募集内容</h3>
              <div className="space-y-4">
                {job.job_category && <div className="flex"><dt className="w-24 flex-shrink-0 font-medium text-gray-900">募集職種</dt><dd className="text-gray-700">{job.job_category}</dd></div>}
                {job.job_content && <div className="flex"><dt className="w-24 flex-shrink-0 font-medium text-gray-900">仕事内容</dt><dd className="text-gray-700 whitespace-pre-line">{job.job_content}</dd></div>}
                {job.service_type && <div className="flex"><dt className="w-24 flex-shrink-0 font-medium text-gray-900">サービス形態</dt><dd className="text-gray-700">{job.service_type}</dd></div>}
                <div className="flex"><dt className="w-24 flex-shrink-0 font-medium text-gray-900">給与</dt><dd className="text-gray-700">{formatSalary()}</dd></div>
                {job.salary_details && <div className="flex"><dt className="w-24 flex-shrink-0 font-medium text-gray-900">給与備考</dt><dd className="text-gray-700 whitespace-pre-line">{job.salary_details}</dd></div>}
                {job.welfare_benefits && <div className="flex"><dt className="w-24 flex-shrink-0 font-medium text-gray-900">待遇</dt><dd className="text-gray-700 whitespace-pre-line">{job.welfare_benefits}</dd></div>}
                {job.working_hours && <div className="flex"><dt className="w-24 flex-shrink-0 font-medium text-gray-900">勤務時間</dt><dd className="text-gray-700 whitespace-pre-line">{job.working_hours}</dd></div>}
                {job.holidays && <div className="flex"><dt className="w-24 flex-shrink-0 font-medium text-gray-900">休日</dt><dd className="text-gray-700 whitespace-pre-line">{job.holidays}</dd></div>}
                {job.vacation_system && <div className="flex"><dt className="w-24 flex-shrink-0 font-medium text-gray-900">休暇制度</dt><dd className="text-gray-700 whitespace-pre-line">{job.vacation_system}</dd></div>}
              </div>
            </div>

            {/* 待遇・福利厚生 */}
            {job.benefits && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">待遇・福利厚生</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{job.benefits}</p>
                </div>
              </div>
            )}

            {/* お試し勤務詳細 */}
            {showShortTermSummary && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">お試し勤務（トライアル）詳細</h3>
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div>
                      <p className="text-sm text-blue-800 font-bold mb-1">双方合意で正社員登用へ</p>
                      <p className="text-sm text-blue-700 leading-relaxed">お試し勤務終了後、規定の採用基準を満たし、園とご本人の双方合意のもとで正規雇用へ移行します。実際の職場の雰囲気や業務内容をしっかり確認してから就業できる安心のシステムです。</p>
                    </div>
                  </div>
                </div>
                <dl className="space-y-4">
                  <div className="flex border-b border-gray-100 pb-3"><dt className="w-32 flex-shrink-0 font-medium text-gray-900">給与</dt><dd className="text-gray-700">{shortTermSalaryText}</dd></div>
                  <div className="flex border-b border-gray-100 pb-3"><dt className="w-32 flex-shrink-0 font-medium text-gray-900">勤務形態</dt><dd className="text-gray-700 whitespace-pre-line">{shortTermWorkStyleText}</dd></div>
                  <div className="flex border-b border-gray-100 pb-3"><dt className="w-32 flex-shrink-0 font-medium text-gray-900">交通費支給</dt><dd className="text-gray-700">{shortTermTransportationText}</dd></div>
                  {job.short_term_details && <div className="flex pt-1"><dt className="w-32 flex-shrink-0 font-medium text-gray-900">登用基準・期間等</dt><dd className="text-gray-700 whitespace-pre-line">{job.short_term_details}</dd></div>}
                </dl>
              </div>
            )}

            {/* 選考手順 */}
            {job.selection_process && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">選考手順</h3>
                <div className="space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4 overflow-x-auto">
                  {job.selection_process.split(' → ').map((step: string, index: number, array: string[]) => (
                    <div key={index} className="flex items-center min-w-max">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-800 rounded-full text-sm font-bold shadow-sm">{index + 1}</div>
                        <div className="ml-3"><span className="text-gray-700 font-medium text-sm">{step}</span></div>
                      </div>
                      {index < array.length - 1 && <svg className="ml-4 w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 7l5 5-5 5" /></svg>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* この求人について相談する（一番下に配置） */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                このお試し勤務について相談する
              </h3>

              {/* ボタン部分: PCでは横並び、スマホでは縦並び */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                {/* LINE相談ボタン */}
                <a
                  href="https://lin.ee/ro8TlMv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-transform hover:-translate-y-0.5 text-sm"
                >
                  <Image src="/line-logo.svg" alt="LINE" width={20} height={20} className="mr-2" />
                  LINEで相談する
                </a>

                {/* WEB相談ボタン */}
                <a
                  href="https://timerex.net/s/asterisk.mt.fuji_5e6a/57d94a1c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-transform hover:-translate-y-0.5 text-sm"
                >
                  <Image src="/web-logo.svg" alt="WEB" width={20} height={20} className="mr-2" />
                  WEBで相談する
                </a>
              </div>

              {/* 補足説明 */}
              <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="mb-2 font-medium">ご相談前にご確認ください：</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>LINEでは気軽に相談・質問が可能です</li>
                  <li>WEB相談はZoomを使ったオンライン面談です</li>
                  <li>どちらも無料でご利用いただけます</li>
                </ul>
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </>
  )
}