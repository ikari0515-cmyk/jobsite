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
import { sampleJobs } from '@/data/sampleJobs'

interface Props {
  params: Promise<{ id: string }>
}

async function getJob(id: string): Promise<Job | null> {
  // サンプルデータから該当する求人を取得
  const job = sampleJobs.find(job => job.id === id)
  return job || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
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
  const { id } = await params
  const job = await getJob(id)
  
  if (!job) {
    notFound()
  }

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

              {/* 仕事内容 */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">仕事内容</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                </div>
              </div>

              {/* 募集内容詳細 */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">募集内容</h3>
                <div className="space-y-4">
                  {(job as any).job_category && (
                    <div className="flex">
                      <dt className="w-24 flex-shrink-0 font-medium text-gray-900">募集職種</dt>
                      <dd className="text-gray-700">{(job as any).job_category}</dd>
                    </div>
                  )}
                  {(job as any).job_content && (
                    <div className="flex">
                      <dt className="w-24 flex-shrink-0 font-medium text-gray-900">仕事内容</dt>
                      <dd className="text-gray-700 whitespace-pre-line">{(job as any).job_content}</dd>
                    </div>
                  )}
                  {(job as any).service_type && (
                    <div className="flex">
                      <dt className="w-24 flex-shrink-0 font-medium text-gray-900">サービス形態</dt>
                      <dd className="text-gray-700">{(job as any).service_type}</dd>
                    </div>
                  )}
                  <div className="flex">
                    <dt className="w-24 flex-shrink-0 font-medium text-gray-900">給与</dt>
                    <dd className="text-gray-700">{formatSalary()}</dd>
                  </div>
                  {(job as any).salary_details && (
                    <div className="flex">
                      <dt className="w-24 flex-shrink-0 font-medium text-gray-900">給与備考</dt>
                      <dd className="text-gray-700 whitespace-pre-line">{(job as any).salary_details}</dd>
                    </div>
                  )}
                  {(job as any).welfare_benefits && (
                    <div className="flex">
                      <dt className="w-24 flex-shrink-0 font-medium text-gray-900">待遇</dt>
                      <dd className="text-gray-700 whitespace-pre-line">{(job as any).welfare_benefits}</dd>
                    </div>
                  )}
                  {(job as any).working_hours && (
                    <div className="flex">
                      <dt className="w-24 flex-shrink-0 font-medium text-gray-900">勤務時間</dt>
                      <dd className="text-gray-700 whitespace-pre-line">{(job as any).working_hours}</dd>
                    </div>
                  )}
                  {(job as any).holidays && (
                    <div className="flex">
                      <dt className="w-24 flex-shrink-0 font-medium text-gray-900">休日</dt>
                      <dd className="text-gray-700 whitespace-pre-line">{(job as any).holidays}</dd>
                    </div>
                  )}
                  {(job as any).vacation_system && (
                    <div className="flex">
                      <dt className="w-24 flex-shrink-0 font-medium text-gray-900">休暇制度</dt>
                      <dd className="text-gray-700 whitespace-pre-line">{(job as any).vacation_system}</dd>
                    </div>
                  )}
                </div>
              </div>

              {/* 応募資格・条件 */}
              {job.requirements && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">応募資格・条件</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
                  </div>
                </div>
              )}

              {/* 待遇・福利厚生 */}
              {job.benefits && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">待遇・福利厚生</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">{job.benefits}</p>
                  </div>
                </div>
              )}
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">この求人に応募する</h3>
                
                <div className="space-y-4">
                  <JobContactButtons />
                  
                  <div className="text-sm text-gray-600 p-4 bg-gray-50 rounded-lg">
                    <p className="mb-2">応募前にご確認ください：</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>応募書類は事前に準備してください</li>
                      <li>応募後の返信には2-3営業日いただく場合があります</li>
                      <li>詳細な労働条件は面接時に確認してください</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
