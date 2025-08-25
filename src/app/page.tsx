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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">求人広告サイト</h1>
          <p className="mt-1 text-sm text-gray-600">最新の求人情報をお探しください</p>
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