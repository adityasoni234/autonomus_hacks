-- Time tracking table
CREATE TABLE time_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  hours_logged DECIMAL(5,2) NOT NULL,
  description TEXT,
  log_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE time_logs ENABLE ROW LEVEL SECURITY;