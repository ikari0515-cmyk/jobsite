'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin, Briefcase } from 'lucide-react'

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [employmentType, setEmploymentType] = useState(searchParams.get('employment_type') || '')

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
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        求人を絞り込む
      </h2>
      
      <form onSubmit={handleSearch} className="space-y-4">
        {/* キーワード検索 */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            <Search size={16} className="inline mr-1" />
            キーワード
          </label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="職種、会社名、キーワード"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 勤務地 */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin size={16} className="inline mr-1" />
            勤務地
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="東京都、大阪府など"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 雇用形態 */}
        <div>
          <label htmlFor="employment_type" className="block text-sm font-medium text-gray-700 mb-2">
            <Briefcase size={16} className="inline mr-1" />
            雇用形態
          </label>
          <select
            id="employment_type"
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">すべて</option>
            <option value="full_time">正社員</option>
            <option value="part_time">アルバイト・パート</option>
            <option value="contract">契約社員</option>
            <option value="temporary">派遣・臨時</option>
          </select>
        </div>

        {/* ボタン */}
        <div className="space-y-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            検索
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            条件をクリア
          </button>
        </div>
      </form>
    </div>
  )
}

