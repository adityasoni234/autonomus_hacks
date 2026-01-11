-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('boss', 'employee')),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  skills JSONB DEFAULT '{}',
  performance_score INTEGER DEFAULT 0,
  workload_percentage INTEGER DEFAULT 0,
  burnout_risk VARCHAR(20) DEFAULT 'low' CHECK (burnout_risk IN ('low', 'medium', 'high')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;