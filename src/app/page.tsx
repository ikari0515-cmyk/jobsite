import { JobList } from '@/components/JobList'
import { SearchFilters } from '@/components/SearchFilters'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: '求人広告サイト | 最新の求人情報',
  description: '最新の求人情報を掲載しています。正社員、アルバイト、パートなど様々な雇用形態の仕事を探すことができます。',
  openGraph: {
    title: '求人広告サイト | 最新の求人情報',
    description: '最新の求人情報を掲載しています。正社員、アルバイト、パートなど様々な雇用形態の仕事を探すことができます。',
    type: 'website',
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* メインヘッダー */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl sm:text-2xl font-bold text-blue-600">求人サイト</h1>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">全国掲載件数</span>
                <span className="font-bold">248,267件</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="hidden sm:inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
                検索履歴
              </button>
              <button className="hidden sm:inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
                保存した条件
              </button>
              <button className="flex items-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                お気に入り
                <span className="ml-1 bg-blue-600 text-white rounded-full px-1.5 py-0.5 text-xs">0</span>
              </button>
            </div>
          </div>
          
          {/* サブヘッダー - エリア選択 */}
          <div className="border-t py-2">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">エリア:</span>
                <button className="text-blue-600 font-medium hover:underline">全国</button>
                <span className="text-gray-400">変更</span>
              </div>
              <div className="hidden sm:flex items-center space-x-4">
                <span className="text-gray-500">|</span>
                <span className="text-gray-600">職種: 未選択</span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-600">給与: こだわらない</span>
              </div>
            </div>
          </div>
        </div>
      </header>

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
            <Suspense fallback={<div className="space-y-4">{[...Array(5)].map((_, i) => (<div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse h-32"></div>))}</div>}>
              <JobList />
            </Suspense>
          </section>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2024 求人広告サイト. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}