'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'
import type { Job } from '@/types/database'

interface Props {
  job?: Job | null
  onSuccess: () => void
  onCancel: () => void
}

export function JobForm({ job, onSuccess, onCancel }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: job?.title || '',
    company: job?.company || '',
    location: job?.location || '',
    job_category: job?.job_category || '',
    service_type: job?.service_type || '',
    employment_type: job?.employment_type || 'full_time',
    salary_type: job?.salary_type || 'negotiable',
    salary_min: job?.salary_min || '',
    salary_max: job?.salary_max || '',
    salary_details: job?.salary_details || '',
    description: job?.description || '',
    job_content: job?.job_content || '',
    requirements: job?.requirements || '',
    working_hours: job?.working_hours || '',
    holidays: job?.holidays || '',
    vacation_system: job?.vacation_system || '',
    benefits: job?.benefits || '',
    welfare_benefits: job?.welfare_benefits || '',
    short_term_available: job?.short_term_available || false,
    short_term_salary: job?.short_term_salary || '',
    short_term_work_style: job?.short_term_work_style || '',
    short_term_transportation_fee: job?.short_term_transportation_fee || false,
    short_term_details: job?.short_term_details || '', // 追加項目
    selection_process: job?.selection_process || '',
    contact_method: job?.contact_method || 'form',
    contact_url: job?.contact_url || '',
    contact_phone: job?.contact_phone || '',
    contact_email: job?.contact_email || '',
    is_published: job?.is_published || false,
    expires_at: job?.expires_at ? new Date(job.expires_at).toISOString().split('T')[0] : '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const endpoint = job ? `/api/jobs/${job.id}` : '/api/jobs'
      const method = job ? 'PUT' : 'POST'
      
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('保存に失敗しました')
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
      {error && <div className="bg-red-50 text-red-600 p-3 rounded">{error}</div>}
      
      {/* 項目を掲載ページと合わせ、整理しました */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="w-full p-2 border rounded" placeholder="求人タイトル" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          <input className="w-full p-2 border rounded" placeholder="会社名" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg space-y-3">
          <h3 className="font-bold text-blue-900">お試し勤務設定</h3>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={formData.short_term_available} onChange={e => setFormData({...formData, short_term_available: e.target.checked})} />
            お試し勤務を募集する
          </label>
          <input className="w-full p-2 border rounded" placeholder="お試し給与（例：時給1,150円）" value={formData.short_term_salary} onChange={e => setFormData({...formData, short_term_salary: e.target.value})} />
          <textarea className="w-full p-2 border rounded" placeholder="お試し勤務形態" value={formData.short_term_work_style} onChange={e => setFormData({...formData, short_term_work_style: e.target.value})} />
          <textarea className="w-full p-2 border rounded" placeholder="登用基準・期間等" value={formData.short_term_details} onChange={e => setFormData({...formData, short_term_details: e.target.value})} />
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={formData.short_term_transportation_fee} onChange={e => setFormData({...formData, short_term_transportation_fee: e.target.checked})} />
            お試し期間中も交通費支給
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">キャンセル</button>
        <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded flex items-center gap-2">
          <Save size={18} /> {loading ? '保存中...' : '保存'}
        </button>
      </div>
    </form>
  )
}