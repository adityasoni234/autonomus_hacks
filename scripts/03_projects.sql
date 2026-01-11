-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'on_hold')),
  start_date DATE,
  end_date DATE,
  predicted_completion_date DATE,
  completion_confidence INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;