'use client'

import { useState } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import type { Job, JobInsert, JobUpdate } from '@/types/database'

interface Props {
  job?: Job | null
  onSuccess: () => void
  onCancel: () => void
}

export function JobForm({ job, onSuccess, onCancel }: Props) {
  const [formData, setFormData] = useState({
    title: job?.title || '',
    company: job?.company || '',
    location: job?.location || '',
    salary_min: job?.salary_min || '',
    salary_max: job?.salary_max || '',
    salary_type: job?.salary_type || 'negotiable',
    employment_type: job?.employment_type || 'full_time',
    description: job?.description || '',
    requirements: job?.requirements || '',
    benefits: job?.benefits || '',
    contact_method: job?.contact_method || 'form',
    contact_url: job?.contact_url || '',
    contact_phone: job?.contact_phone || '',
    contact_email: job?.contact_email || '',
    is_published: job?.is_published || false,
    expires_at: job?.expires_at ? new Date(job.expires_at).toISOString().split('T')[0] : ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // バリデーション
      if (!formData.title || !formData.company || !formData.location || !formData.description) {
        setError('必須項目を入力してください')
        return
      }

      // データ準備
      const submitData: JobInsert | JobUpdate = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        salary_min: formData.salary_min ? Number(formData.salary_min) : null,
        salary_max: formData.salary_max ? Number(formData.salary_max) : null,
        salary_type: formData.salary_type as 'hourly' | 'monthly' | 'yearly' | 'negotiable',
        employment_type: formData.employment_type as 'full_time' | 'part_time' | 'contract' | 'temporary',
        description: formData.description,
        requirements: formData.requirements || null,
        benefits: formData.benefits || null,
        contact_method: formData.contact_method as 'form' | 'phone' | 'email',
        contact_url: formData.contact_url || null,
        contact_phone: formData.contact_phone || null,
        contact_email: formData.contact_email || null,
        is_published: formData.is_published,
        expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null
      }

      const url = job ? `/api/jobs/${job.id}` : '/api/jobs'
      const method = job ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('adminAuth')}`
        },
        body: JSON.stringify(submitData)
      })

      if (response.ok) {
        onSuccess()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'エラーが発生しました')
      }
    } catch {
      setError('ネットワークエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onCancel}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            管理画面に戻る
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {job ? '求人編集' : '新規求人投稿'}
          </h1>
        </div>
      </header>

      {/* フォーム */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* 基本情報 */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">基本情報</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  求人タイトル *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  会社名 *
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  勤務地 *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  雇用形態
                </label>
                <select
                  value={formData.employment_type}
                  onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="full_time">正社員</option>
                  <option value="part_time">アルバイト・パート</option>
                  <option value="contract">契約社員</option>
                  <option value="temporary">派遣・臨時</option>
                </select>
              </div>
            </div>
          </div>

          {/* 給与情報 */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">給与情報</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  給与形態
                </label>
                <select
                  value={formData.salary_type}
                  onChange={(e) => setFormData({ ...formData, salary_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="negotiable">応相談</option>
                  <option value="hourly">時給</option>
                  <option value="monthly">月給</option>
                  <option value="yearly">年収</option>
                </select>
              </div>

              {formData.salary_type !== 'negotiable' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      最低金額
                    </label>
                    <input
                      type="number"
                      value={formData.salary_min}
                      onChange={(e) => setFormData({ ...formData, salary_min: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      最高金額
                    </label>
                    <input
                      type="number"
                      value={formData.salary_max}
                      onChange={(e) => setFormData({ ...formData, salary_max: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 詳細情報 */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">詳細情報</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  仕事内容 *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  応募資格・条件
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  待遇・福利厚生
                </label>
                <textarea
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 応募方法 */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">応募方法</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  応募方法
                </label>
                <select
                  value={formData.contact_method}
                  onChange={(e) => setFormData({ ...formData, contact_method: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="form">応募フォーム</option>
                  <option value="email">メール</option>
                  <option value="phone">電話</option>
                </select>
              </div>

              {formData.contact_method === 'form' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    応募フォームURL
                  </label>
                  <input
                    type="url"
                    value={formData.contact_url}
                    onChange={(e) => setFormData({ ...formData, contact_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {formData.contact_method === 'email' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    応募先メールアドレス
                  </label>
                  <input
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {formData.contact_method === 'phone' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    応募先電話番号
                  </label>
                  <input
                    type="tel"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 公開設定 */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">公開設定</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_published" className="ml-2 block text-sm text-gray-700">
                  求人を公開する
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  募集終了日（任意）
                </label>
                <input
                  type="date"
                  value={formData.expires_at}
                  onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 送信ボタン */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save size={20} />
              {loading ? '保存中...' : (job ? '更新' : '投稿')}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
