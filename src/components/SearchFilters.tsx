'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin, Filter, ChevronDown } from 'lucide-react'

const prefectures = [
  '北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県',
  '茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県',
  '新潟県','富山県','石川県','福井県','山梨県','長野県',
  '岐阜県','静岡県','愛知県','三重県',
  '滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県',
  '鳥取県','島根県','岡山県','広島県','山口県',
  '徳島県','香川県','愛媛県','高知県',
  '福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'
]

const employmentTypes: Array<{ value: string; label: string }> = [
  { value: '', label: 'すべて' },
  { value: 'full_time', label: '正社員' },
  { value: 'part_time', label: 'アルバイト・パート' },
  { value: 'contract', label: '契約社員' },
  { value: 'temporary', label: '派遣・臨時' }
]

const featureOptions: Array<{ value: string; label: string }> = [
  { value: 'housing', label: '住宅手当あり' },
  { value: 'unexperienced', label: '未経験歓迎' },
  { value: 'career_break', label: 'ブランクOK' },
  { value: 'bonus', label: '賞与あり' },
  { value: 'small_scale', label: '小規模園' }
]

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [location, setLocation] = useState(searchParams.get('location') ?? '')
  const [employmentType, setEmploymentType] = useState(searchParams.get('employment_type') ?? '')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    searchParams.get('features')?.split(',').filter(Boolean) ?? []
  )

  const buildQueryString = (
    overrides: Record<string, string | string[] | undefined>
  ) => {
    const params = new URLSearchParams(searchParams.toString())

    if (overrides.search !== undefined) {
      if (overrides.search) {
        params.set('search', overrides.search)
      } else {
        params.delete('search')
      }
    }

    if (overrides.location !== undefined) {
      if (overrides.location) {
        params.set('location', overrides.location)
      } else {
        params.delete('location')
      }
    }

    if (overrides.employment_type !== undefined) {
      const value = overrides.employment_type as string
      if (value) {
        params.set('employment_type', value)
      } else {
        params.delete('employment_type')
      }
    }

    if (overrides.features !== undefined) {
      const featuresValue = Array.isArray(overrides.features)
        ? overrides.features.join(',')
        : overrides.features ?? ''

      if (featuresValue.length > 0) {
        params.set('features', featuresValue)
      } else {
        params.delete('features')
      }
    }

    params.delete('page')
    return params.toString()
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const query = buildQueryString({
      search,
      location,
      employment_type: employmentType,
      features: selectedFeatures
    })
    router.push(query ? '/?' + query : '/')
  }

  const handleReset = () => {
    setSearch('')
    setLocation('')
    setEmploymentType('')
    setSelectedFeatures([])
    router.push('/')
  }

  const handleFeatureToggle = (feature: string) => {
    const nextFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter(item => item !== feature)
      : [...selectedFeatures, feature]

    setSelectedFeatures(nextFeatures)

    const query = buildQueryString({
      search,
      location,
      employment_type: employmentType,
      features: nextFeatures
    })
    router.push(query ? '/?' + query : '/')
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-800 mb-2">
              フリーワード
            </label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="保育園名、こども園、幼稚園など"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              絞り込む
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              リセット
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <button
            type="button"
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
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-800 mb-2">
                勤務地
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">都道府県を選択</option>
                  {prefectures.map((prefecture) => (
                    <option key={prefecture} value={prefecture}>
                      {prefecture}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="employment_type" className="block text-sm font-medium text-gray-800 mb-2">
                雇用形態
              </label>
              <select
                id="employment_type"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {employmentTypes.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-800 mb-2">こだわり条件</p>
              <div className="flex flex-wrap gap-2">
                {featureOptions.map(({ value, label }) => {
                  const isActive = selectedFeatures.includes(value)
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleFeatureToggle(value)}
                      className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700 border-blue-200'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
