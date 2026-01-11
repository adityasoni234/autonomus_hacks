-- Sample data for testing
INSERT INTO companies (name, email, total_employees) VALUES 
('TechCorp Inc', 'admin@techcorp.com', 25),
('StartupXYZ', 'boss@startupxyz.com', 12);

INSERT INTO users (email, name, role, company_id, skills, performance_score, workload_percentage) VALUES 
('boss@techcorp.com', 'John Boss', 'boss', (SELECT id FROM companies WHERE email = 'admin@techcorp.com'), '{}', 95, 80),
('sarah@techcorp.com', 'Sarah Chen', 'employee', (SELECT id FROM companies WHERE email = 'admin@techcorp.com'), '{"react": 95, "typescript": 88, "css": 92, "nodejs": 65}', 92, 85),
('john@techcorp.com', 'John Doe', 'employee', (SELECT id FROM companies WHERE email = 'admin@techcorp.com'), '{"react": 78, "nodejs": 95, "python": 90, "aws": 82}', 88, 95),
('mike@techcorp.com', 'Mike Johnson', 'employee', (SELECT id FROM companies WHERE email = 'admin@techcorp.com'), '{"python": 92, "nodejs": 85, "docker": 88, "aws": 90}', 85, 70),
('alex@techcorp.com', 'Alex Smith', 'employee', (SELECT id FROM companies WHERE email = 'admin@techcorp.com'), '{"react": 45, "javascript": 60, "css": 55, "git": 40}', 72, 60);

INSERT INTO projects (name, description, company_id, start_date, end_date) VALUES 
('Website Redesign', 'Complete redesign of company website', (SELECT id FROM companies WHERE email = 'admin@techcorp.com'), '2024-01-01', '2024-02-15'),
('Mobile App', 'New mobile application development', (SELECT id FROM companies WHERE email = 'admin@techcorp.com'), '2024-01-15', '2024-03-30');

INSERT INTO tasks (title, description, project_id, assigned_to, status, priority, domain, story_points, deadline) VALUES 
('Design new homepage layout', 'Create wireframes and mockups for homepage', (SELECT id FROM projects WHERE name = 'Website Redesign'), (SELECT id FROM users WHERE email = 'sarah@techcorp.com'), 'in_progress', 'high', 'Frontend', 8, '2024-01-15'),
('Implement user authentication', 'Set up JWT authentication system', (SELECT id FROM projects WHERE name = 'Website Redesign'), (SELECT id FROM users WHERE email = 'john@techcorp.com'), 'in_progress', 'medium', 'Backend', 5, '2024-01-20'),
('Fix mobile responsive issues', 'Resolve CSS media query problems', (SELECT id FROM projects WHERE name = 'Website Redesign'), (SELECT id FROM users WHERE email = 'mike@techcorp.com'), 'done', 'critical', 'Frontend', 3, '2024-01-10');