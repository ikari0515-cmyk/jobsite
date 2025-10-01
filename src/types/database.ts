// Firestore用の求人データ型定義

export interface Job {
  id: string
  title: string
  company: string
  location: string
  salary_min: number | null
  salary_max: number | null
  salary_type: 'hourly' | 'monthly' | 'yearly' | 'negotiable'
  employment_type: 'full_time' | 'part_time' | 'contract' | 'temporary'
  description: string
  requirements: string | null
  benefits: string | null
  contact_method: 'form' | 'phone' | 'email'
  contact_url: string | null
  contact_phone: string | null
  contact_email: string | null
  is_published: boolean
  created_at: Date
  updated_at: Date
  published_at: Date | null
  expires_at: Date | null
  // 詳細情報フィールド
  job_category: string | null
  job_content: string | null
  service_type: string | null
  salary_details: string | null
  welfare_benefits: string | null
  working_hours: string | null
  holidays: string | null
  vacation_system: string | null
  // 短期パート・選考手順
  short_term_available: boolean | null
  short_term_details: string | null
  short_term_salary: string | null
  short_term_work_style: string | null
  short_term_transportation_fee: boolean | null
  selection_process: string | null
}

export interface JobInsert {
  title: string
  company: string
  location: string
  salary_min?: number | null
  salary_max?: number | null
  salary_type?: 'hourly' | 'monthly' | 'yearly' | 'negotiable'
  employment_type?: 'full_time' | 'part_time' | 'contract' | 'temporary'
  description: string
  requirements?: string | null
  benefits?: string | null
  contact_method?: 'form' | 'phone' | 'email'
  contact_url?: string | null
  contact_phone?: string | null
  contact_email?: string | null
  is_published?: boolean
  expires_at?: Date | null
  // 詳細情報フィールド
  job_category?: string | null
  job_content?: string | null
  service_type?: string | null
  salary_details?: string | null
  welfare_benefits?: string | null
  working_hours?: string | null
  holidays?: string | null
  vacation_system?: string | null
  // 短期パート・選考手順
  short_term_available?: boolean | null
  short_term_details?: string | null
  short_term_salary?: string | null
  short_term_work_style?: string | null
  short_term_transportation_fee?: boolean | null
  selection_process?: string | null
}

export interface JobUpdate {
  title?: string
  company?: string
  location?: string
  salary_min?: number | null
  salary_max?: number | null
  salary_type?: 'hourly' | 'monthly' | 'yearly' | 'negotiable'
  employment_type?: 'full_time' | 'part_time' | 'contract' | 'temporary'
  description?: string
  requirements?: string | null
  benefits?: string | null
  contact_method?: 'form' | 'phone' | 'email'
  contact_url?: string | null
  contact_phone?: string | null
  contact_email?: string | null
  is_published?: boolean
  updated_at?: Date
  published_at?: Date | null
  expires_at?: Date | null
  // 詳細情報フィールド
  job_category?: string | null
  job_content?: string | null
  service_type?: string | null
  salary_details?: string | null
  welfare_benefits?: string | null
  working_hours?: string | null
  holidays?: string | null
  vacation_system?: string | null
  // 短期パート・選考手順
  short_term_available?: boolean | null
  short_term_details?: string | null
  short_term_salary?: string | null
  short_term_work_style?: string | null
  short_term_transportation_fee?: boolean | null
  selection_process?: string | null
}

