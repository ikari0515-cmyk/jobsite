'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin, Briefcase, Filter, ChevronDown } from 'lucide-react'

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [employmentType, setEmploymentType] = useState(searchParams.get('employment_type') || '')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (location) params.set('location', location)
    if (employmentType) params.set('employment_type', employmentType)
    
    router.push(`/?${params.toString()}`)
  }

  const handleReset = () => {
    setSearch('')
    setLocation('')
    setEmploymentType('')
    router.push('/')
  }

  return (
    <div className="space-y-4">
      {/* メイン検索フォーム */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <form onSubmit={handleSearch} className="space-y-4">
          {/* キーワード検索 */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              フリーワード
            </label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="職種、会社名、キーワードなど"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          >
            絞り込む
          </button>
        </form>
      </div>

      {/* フィルター詳細 */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-900 flex items-center">
              <Filter size={16} className="mr-2" />
              詳細条件
            </span>
            <ChevronDown 
              size={16} 
              className={`transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {showAdvanced && (
          <div className="p-4 space-y-4">
            {/* 勤務地 */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                勤務地
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="東京都、大阪市など"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 雇用形態 */}
            <div>
              <label htmlFor="employment_type" className="block text-sm font-medium text-gray-700 mb-2">
                雇用形態
              </label>
              <select
                id="employment_type"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">すべて</option>
                <option value="full_time">正社員</option>
                <option value="part_time">アルバイト・パート</option>
                <option value="contract">契約社員</option>
                <option value="temporary">派遣・臨時</option>
              </select>
            </div>

            {/* 給与 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                給与
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">こだわらない</option>
                <option value="1000">時給1,000円以上</option>
                <option value="1200">時給1,200円以上</option>
                <option value="1500">時給1,500円以上</option>
                <option value="2000">時給2,000円以上</option>
              </select>
            </div>

            {/* 条件クリアボタン */}
            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-sm"
            >
              条件をクリア
            </button>
          </div>
        )}
      </div>

      {/* 人気の特徴 */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="font-medium text-gray-900 mb-3">人気の特徴から探す</h3>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <button className="text-left p-2 hover:bg-gray-50 rounded border">
            駅徒歩5分以内 <span className="text-gray-500">(2,234)</span>
          </button>
          <button className="text-left p-2 hover:bg-gray-50 rounded border">
            交通費支給 <span className="text-gray-500">(3,101)</span>
          </button>
          <button className="text-left p-2 hover:bg-gray-50 rounded border">
            髪型・髪色自由 <span className="text-gray-500">(1,427)</span>
          </button>
          <button className="text-left p-2 hover:bg-gray-50 rounded border">
            週1日〜OK <span className="text-gray-500">(1,806)</span>
          </button>
        </div>
      </div>
    </div>
  )
}

