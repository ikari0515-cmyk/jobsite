-- 求人テーブルの作成
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  salary_type VARCHAR(20) DEFAULT 'negotiable' CHECK (salary_type IN ('hourly', 'monthly', 'yearly', 'negotiable')),
  employment_type VARCHAR(20) DEFAULT 'full_time' CHECK (employment_type IN ('full_time', 'part_time', 'contract', 'temporary')),
  description TEXT NOT NULL,
  requirements TEXT,
  benefits TEXT,
  contact_method VARCHAR(10) DEFAULT 'form' CHECK (contact_method IN ('form', 'phone', 'email')),
  contact_url TEXT,
  contact_phone VARCHAR(20),
  contact_email VARCHAR(255),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ
);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_jobs_published ON jobs(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company);
CREATE INDEX IF NOT EXISTS idx_jobs_employment_type ON jobs(employment_type);

-- RLS (Row Level Security) を有効化
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- 公開済み求人は誰でも閲覧可能
CREATE POLICY "Public jobs are viewable by everyone" ON jobs
  FOR SELECT USING (is_published = true);

-- 管理者のみ全ての操作が可能（実際のアプリではサービスロールキーを使用）
CREATE POLICY "Admins can do everything" ON jobs
  FOR ALL USING (auth.role() = 'service_role');

-- updated_at を自動更新するトリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_jobs_updated_at 
  BEFORE UPDATE ON jobs 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

