import { JobList } from '@/components/JobList'
import { SearchFilters } from '@/components/SearchFilters'
import { StackedCircularFooter } from '@/components/ui/stacked-circular-footer'
import { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'お試し勤務一覧 | Asterisk+',
  description: '保育士・幼稚園教諭向けのお試し勤務一覧ページです。',
  openGraph: {
    title: 'お試し勤務一覧 | Asterisk+',
    description: '保育士・幼稚園教諭向けのお試し勤務一覧ページです。',
    type: 'website',
  },
}

export default async function ServicePage() {
  // ✅ APIから直接件数を取得
  const apiBase = process.env.NEXT_PUBLIC_SITE_URL || '';
const res = await fetch(`${apiBase}/api/jobs`, { cache: 'no-store' });

if (!res.ok) {
  console.error("API error:", await res.text());
  return <div>データ取得に失敗しました</div>;
}

const data = await res.json();

  const jobCount = data.pagination?.total || data.jobs?.length || 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ▼ 修正：ナビゲーションやエリア選択を削除し、スッキリしたヘッダーに変更 */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
              <Link href="/" className="hover:text-blue-800 transition-colors">
                Asterisk<span className="text-blue-600">+</span>
              </Link>
            </h1>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-700">
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ▼ 追加：お試し勤務から本採用への流れを解説する案内ボックス */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <h2 className="text-blue-900 font-bold text-lg mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            当サイトの「お試し勤務」から正式採用への流れ
          </h2>
          <div className="text-sm text-blue-800 space-y-3 leading-relaxed">
            <p>
              入職後のミスマッチを防ぐため、まずは<strong>短期間のお試し勤務（31日未満・週20時間未満 ※社会保険・雇用保険適用外）</strong>からスタートします。<br />
              実際に働いてみて「自分には合わない」と感じた場合は、お試し期間のみで終了して構いません。
            </p>
            <p>
              お試し勤務終了後、<strong>園の採用基準をクリアし、ご自身も納得した場合のみ</strong>、各求人に記載された雇用形態（正社員・契約社員など）へ正式採用となります。<br />
            </p>
          </div>
        </div>
      </main>
      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 検索フィルター */}
          <aside className="lg:col-span-1">
            <Suspense fallback={<div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse h-64"></div>}>
              <SearchFilters />
            </Suspense>
          </aside>

          {/* 求人一覧 */}
          <section className="lg:col-span-3">
            <Suspense fallback={<div className="space-y-4">{[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse h-32"></div>
            ))}</div>}>
              <JobList />
            </Suspense>
          </section>
        </div>
      </main>

      {/* フッター */}
      <StackedCircularFooter />
    </div>
  )
}
