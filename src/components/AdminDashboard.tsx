'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut } from 'lucide-react'
import { JobForm } from '@/components/JobForm'
import { getAllJobs, deleteJob, toggleJobPublishStatus } from '@/lib/firestore'
import type { Job } from '@/types/database'

interface Props {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: Props) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)

  useEffect(() => {
    fetchAllJobs()
  }, [])

  const fetchAllJobs = async () => {
    try {
      setLoading(true)
      const jobsData = await getAllJobs()
      setJobs(jobsData)
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePublish = async (job: Job) => {
    try {
      await toggleJobPublishStatus(job.id, !job.is_published)
      fetchAllJobs()
    } catch (error) {
      console.error('Failed to toggle publish status:', error)
    }
  }

  const handleDelete = async (job: Job) => {
    if (!confirm(`「${job.title}」を削除しますか？この操作は取り消せません。`)) {
      return
    }

    try {
      await deleteJob(job.id)
      fetchAllJobs()
    } catch (error) {
      console.error('Failed to delete job:', error)
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingJob(null)
    fetchAllJobs()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (showForm || editingJob) {
    return (
      <JobForm
        job={editingJob}
        onSuccess={handleFormSuccess}
        onCancel={() => {
          setShowForm(false)
          setEditingJob(null)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">求人管理システム</h1>
              <p className="mt-1 text-sm text-gray-600">求人の投稿・編集・削除を行えます</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus size={20} />
                新規求人投稿
              </button>
              <button
                onClick={onLogout}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                title="ログアウト"
              >
                <LogOut size={20} />
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <p className="text-gray-600 mb-4">まだ求人が投稿されていません</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              最初の求人を投稿する
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        job.is_published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {job.is_published ? '公開中' : '非公開'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{job.company} | {job.location}</p>
                    <p className="text-sm text-gray-500">
                      作成日: {job.created_at.toLocaleDateString('ja-JP')}
                      {job.published_at && (
                        <> | 公開日: {job.published_at.toLocaleDateString('ja-JP')}</>
                      )}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleTogglePublish(job)}
                      className={`p-2 rounded-lg ${
                        job.is_published
                          ? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                      title={job.is_published ? '非公開にする' : '公開する'}
                    >
                      {job.is_published ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    
                    <button
                      onClick={() => setEditingJob(job)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                      title="編集"
                    >
                      <Edit size={18} />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(job)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      title="削除"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

