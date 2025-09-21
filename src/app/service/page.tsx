import { JobList } from '@/components/JobList'
import { SearchFilters } from '@/components/SearchFilters'
import { StackedCircularFooter } from '@/components/ui/stacked-circular-footer'
import { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '求人一覧 | Asterisk+',
  description: '保育士・幼稚園教諭向けの求人一覧ページです。',
  openGraph: {
    title: '求人一覧 | Asterisk+',
    description: '保育士・幼稚園教諭向けの求人一覧ページです。',
    type: 'website',
  },
}

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* メインヘッダー */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl sm:text-2xl font-bold text-blue-600">Asterisk+</h1>
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-700">
                  <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded">保育士求人掲載件数</span>
                  <span className="font-bold text-gray-900">6件</span>
                </div>
              </div>
              <nav className="flex items-center space-x-4 md:space-x-6">
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  サービス
                </Link>
                <Link href="/service" className="text-blue-600 font-medium">
                  求人一覧
                </Link>
              </nav>
            </div>
          </div>

          {/* サブヘッダー - エリア選択 */}
          <div className="border-t py-2">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-gray-800 font-medium">エリア:</span>
                <button className="text-blue-600 font-medium hover:underline">全国</button>
                <button className="text-blue-500 hover:underline">変更</button>
              </div>
              <div className="hidden sm:flex items-center space-x-4">
                <span className="text-gray-400">|</span>
                <span className="text-gray-800">施設形態: 保育園・こども園</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-800">給与: こだわらない</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンチE��チE*/}
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
            <Suspense fallback={<div className="space-y-4">{[...Array(5)].map((_, i) => (<div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse h-32"></div>))}</div>}>
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
