-- Sprints table
CREATE TABLE sprints (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed')),
  capacity INTEGER DEFAULT 0,
  committed_points INTEGER DEFAULT 0,
  completed_points INTEGER DEFAULT 0,
  velocity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE sprints ENABLE ROW LEVEL SECURITY;