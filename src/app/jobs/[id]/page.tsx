import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { 
  MapPin, 
  Building, 
  Clock, 
  DollarSign, 
  Phone, 
  Mail, 
  ExternalLink,
  ArrowLeft,
  Calendar
} from 'lucide-react'
import { JobStructuredData } from '@/components/JobStructuredData'
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

  const renderContactButton = () => {
    switch (job.contact_method) {
      case 'phone':
        return job.contact_phone ? (
          <a
            href={`tel:${job.contact_phone}`}
            className="inline-flex items-center justify-center w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Phone size={20} className="mr-2" />
            電話で応募: {job.contact_phone}
          </a>
        ) : null

      case 'email':
        return job.contact_email ? (
          <a
            href={`mailto:${job.contact_email}?subject=${encodeURIComponent(`【求人応募】${job.title}`)}`}
            className="inline-flex items-center justify-center w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Mail size={20} className="mr-2" />
            メールで応募: {job.contact_email}
          </a>
        ) : null

      case 'form':
      default:
        return job.contact_url ? (
          <a
            href={job.contact_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <ExternalLink size={20} className="mr-2" />
            応募フォームへ
          </a>
        ) : null
    }
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
                    <DollarSign size={18} className="mr-2" />
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
                  {renderContactButton()}
                  
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
