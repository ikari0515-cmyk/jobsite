import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { 
  MapPin, 
  Building, 
  Clock,
  ArrowLeft,
  Calendar
} from 'lucide-react'
import { JobStructuredData } from '@/components/JobStructuredData'
import { JobContactButtons } from '@/components/JobContactButtons'
import type { Job } from '@/types/database'

interface Props {
  params: { id: string }
}

async function getJob(id: string): Promise<Job | null> {
  // APIから求人データを取得
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/jobs/${id}`, {
      cache: 'no-store', // 常に最新データを取得
    })
    
    if (!response.ok) {
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching job:', error)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params
  const job = await getJob(id)
  
  if (!job) {
    return {
      title: '求人が見つかりません',
    }
  }

  return {
    title: `${job.title} - ${job.company} | 求人広告サイト`,
    description: job.description.substring(0, 160),
    openGraph: {
      title: `${job.title} - ${job.company}`,
      description: job.description.substring(0, 160),
      type: 'article',
    },
  }
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = params
  const job = await getJob(id)
  
  if (!job) {
    notFound()
  }

  const shortTermSalary = job.short_term_salary
  const shortTermWorkStyle = job.short_term_work_style
  const shortTermTransportation = job.short_term_transportation_fee
  const hasShortTermData =
    Boolean(shortTermSalary?.trim()) ||
    Boolean(shortTermWorkStyle?.trim()) ||
    shortTermTransportation !== null
  const showShortTermSummary = Boolean((job.short_term_available ?? false) || hasShortTermData)
  const shortTermSalaryText = shortTermSalary?.trim() ? shortTermSalary : '情報が登録されていません'
  const shortTermWorkStyleText = shortTermWorkStyle?.trim() ? shortTermWorkStyle : '情報が登録されていません'
  const shortTermTransportationText =
    shortTermTransportation === null
      ? '情報が登録されていません'
      : shortTermTransportation
        ? '支給あり'
        : '支給なし'

  const formatSalary = () => {
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
      part_time: 'アルバイト・パート',
      contract: '契約社員',
      temporary: '派遣・臨時'
    }
    return labels[type as keyof typeof labels] || type
  }


  return (
    <>
      <JobStructuredData job={job} />
      
      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              求人一覧に戻る
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">求人詳細</h1>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 gap-8">
            {/* 求人詳細 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 基本情報 */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h2>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Building size={20} className="mr-2" />
                      <span className="text-lg">{job.company}</span>
                    </div>
                  </div>
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {getEmploymentTypeLabel(job.employment_type)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2 font-bold text-lg">￥</span>
                    <span>{formatSalary()}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={18} className="mr-2" />
                    <span>
                      掲載日: {new Date(job.published_at || job.created_at).toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                  {job.expires_at && (
                    <div className="flex items-center">
                      <Clock size={18} className="mr-2" />
                      <span>
                        募集終了: {new Date(job.expires_at).toLocaleDateString('ja-JP')}
                      </span>
                    </div>
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
                  {job.job_category && (
                    <div className="flex">
                      <dt className="w-24 flex-shrink-0 font-medium text-gray-900">募集職種</dt>
                      <dd className="text-gray-700">{job.job_category}</dd>
                    </div>
                  )}
                  {job.job_content && (
                    <div className="flex">
                      <dt className="w-24 flex-shrink-0 font-medium text-gray-900">仕事内容</dt>
                      <dd className="text-gray-700 whitespace-pre-line">{job.job_content}</dd>
                    </div>
                  )}
                  {job.service_type && (
                    <div className="flex">
                      <dt className="w-24 flex-shrink-0 font-medium text-gray-900">サービス形態</dt>
                      <dd className="text-gray-700">{job.service_type}</dd>
                    </div>
                  )}
                  <div className="flex">
                    <dt className="w-24 flex-shrink-0 font-medium text-gray-900">給与</dt>
                    <dd className="text-gray-700">{formatSalary()}</dd>
                  </div>
                  {job.salary_details && (
                    <div className="flex">
                      <dt className="w-24 flex-shrink-0 font-medium text-gray-900">給与備考</dt>
                      <dd className="text-gray-700 whitespace-pre-line">{job.salary_details}</dd>
                    </div>
                  )}
                  {job.welfare_benefits && (
                    <div className="flex">
                      <dt className="w-24 flex-shrink-0 font-medium text-gray-900">待遇</dt>
                      <dd className="text-gray-700 whitespace-pre-line">{job.welfare_benefits}</dd>
                    </div>
                  )}
                  {job.working_hours && (
                    <div className="flex">
                      <dt className="w-24 flex-shrink-0 font-medium text-gray-900">勤務時間</dt>
                      <dd className="text-gray-700 whitespace-pre-line">{job.working_hours}</dd>
                    </div>
                  )}
                  {job.holidays && (
                    <div className="flex">
                      <dt className="w-24 flex-shrink-0 font-medium text-gray-900">休日</dt>
                      <dd className="text-gray-700 whitespace-pre-line">{job.holidays}</dd>
                    </div>
                  )}
                  {job.vacation_system && (
                    <div className="flex">
                      <dt className="w-24 flex-shrink-0 font-medium text-gray-900">休暇制度</dt>
                      <dd className="text-gray-700 whitespace-pre-line">{job.vacation_system}</dd>
                    </div>
                  )}
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
              {showShortTermSummary && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">短期パート時の給与・待遇について</h3>
                  <dl className="space-y-3">
                    <div className="flex">
                      <dt className="w-32 flex-shrink-0 font-medium text-gray-900">給与</dt>
                      <dd className="text-gray-700">{shortTermSalaryText}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-32 flex-shrink-0 font-medium text-gray-900">勤務形態</dt>
                      <dd className="text-gray-700">{shortTermWorkStyleText}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-32 flex-shrink-0 font-medium text-gray-900">交通費支給の有無</dt>
                      <dd className="text-gray-700">{shortTermTransportationText}</dd>
                    </div>
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
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-800 rounded-full text-sm font-bold shadow-sm">
                            {index + 1}
                          </div>
                          <div className="ml-3">
                            <span className="text-gray-700 font-medium text-sm">{step}</span>
                          </div>
                        </div>
                        {index < array.length - 1 && (
                          <svg className="ml-4 w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 7l5 5-5 5" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-blue-700 font-medium mb-1">選考について</p>
                        <p className="text-sm text-blue-600">
                          応募から内定まで通常1-2週間程度お時間をいただきます。各選考段階の詳細や必要書類については、応募後にご案内いたします。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
{/* サイドバー */}
<div className="lg:col-span-1">
{/* 相談セクション（ページ最下部） */}
<section className="mt-20 text-center">
  <h2 className="text-2xl font-bold text-gray-900 mb-6">
    この求人について相談する
  </h2>

  <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
    {/* LINEボタン */}
    <a
      href="https://lin.ee/ro8TlMv"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
    >
      {/* 正しいLINEアイコン */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M20.667 3.333H3.333A2.333 2.333 0 001 5.667v12.666a2.333 2.333 0 002.333 2.334H18l3.667 3.666V5.667a2.333 2.333 0 00-2.333-2.334z" />
      </svg>
      LINEで相談する
    </a>

    {/* WEBボタン */}
    <a
      href="https://timerex.net/s/asterisk.mt.fuji_5e6a/57d94a1c"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" viewBox="0 0 24 24" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      WEBで相談する
    </a>
  </div>

  <p className="mt-6 text-sm text-gray-600">
    LINEでは気軽に相談・質問が可能です。WEB相談はZoomを使ったオンライン面談です。<br />
    どちらも無料でご利用いただけます。
  </p>
</section>
  </div>
</div>
</main> 
</div> 
</>
  )
}