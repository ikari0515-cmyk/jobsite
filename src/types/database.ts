export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: {
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
          created_at: string
          updated_at: string
          published_at: string | null
          expires_at: string | null
        }
        Insert: {
          id?: string
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
          created_at?: string
          updated_at?: string
          published_at?: string | null
          expires_at?: string | null
        }
        Update: {
          id?: string
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
          created_at?: string
          updated_at?: string
          published_at?: string | null
          expires_at?: string | null
        }
      }
    }
  }
}

export type Job = Database['public']['Tables']['jobs']['Row']
export type JobInsert = Database['public']['Tables']['jobs']['Insert']
export type JobUpdate = Database['public']['Tables']['jobs']['Update']

