-- Insert sample users
INSERT INTO users (id, email, name, role, department, phone, address) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'admin@barangay.gov.ph', 'Juan Dela Cruz', 'admin', 'Administration', '+63-912-345-6789', 'Barangay Hall, Bucana'),
  ('550e8400-e29b-41d4-a716-446655440001', 'health@barangay.gov.ph', 'Maria Santos', 'health_worker', 'Health', '+63-912-345-6790', 'Health Center, Bucana'),
  ('550e8400-e29b-41d4-a716-446655440002', 'security@barangay.gov.ph', 'Pedro Garcia', 'security', 'Security', '+63-912-345-6791', 'Security Office, Bucana'),
  ('550e8400-e29b-41d4-a716-446655440003', 'resident@email.com', 'Ana Reyes', 'user', NULL, '+63-912-345-6792', '123 Main St, Bucana')
ON CONFLICT (id) DO NOTHING;

-- Insert sample announcements
INSERT INTO announcements (title, content, type, priority, author_id, is_active) VALUES
  ('Community Meeting Tomorrow', 'Join us for the monthly community meeting at the Barangay Hall at 7:00 PM.', 'info', 'medium', '550e8400-e29b-41d4-a716-446655440000', true),
  ('Water Interruption Notice', 'Water supply will be interrupted from 8:00 AM to 5:00 PM for maintenance.', 'warning', 'high', '550e8400-e29b-41d4-a716-446655440000', true),
  ('Free Medical Checkup', 'Free medical checkup available at the Health Center every Saturday.', 'info', 'medium', '550e8400-e29b-41d4-a716-446655440001', true),
  ('Emergency Hotline Update', 'New emergency hotline number: 911. Available 24/7 for all emergencies.', 'emergency', 'critical', '550e8400-e29b-41d4-a716-446655440002', true)
ON CONFLICT DO NOTHING;

-- Insert sample documents
INSERT INTO documents (title, type, status, requester_id) VALUES
  ('Barangay Clearance', 'clearance', 'approved', '550e8400-e29b-41d4-a716-446655440003'),
  ('Certificate of Residency', 'certificate', 'pending', '550e8400-e29b-41d4-a716-446655440003'),
  ('Business Permit', 'permit', 'processing', '550e8400-e29b-41d4-a716-446655440003')
ON CONFLICT DO NOTHING;

-- Insert sample appointments
INSERT INTO appointments (title, description, type, user_id, scheduled_at, location) VALUES
  ('Medical Consultation', 'Regular health checkup', 'health', '550e8400-e29b-41d4-a716-446655440003', NOW() + INTERVAL '1 day', 'Health Center'),
  ('Document Processing', 'Process barangay clearance', 'document', '550e8400-e29b-41d4-a716-446655440003', NOW() + INTERVAL '2 days', 'Barangay Hall'),
  ('Legal Consultation', 'Legal advice consultation', 'legal', '550e8400-e29b-41d4-a716-446655440003', NOW() + INTERVAL '3 days', 'Legal Office')
ON CONFLICT DO NOTHING;

-- Insert sample incidents
INSERT INTO incidents (title, description, type, severity, reporter_id, location) VALUES
  ('Street Light Not Working', 'Street light on Main Street is not functioning', 'infrastructure', 'low', '550e8400-e29b-41d4-a716-446655440003', 'Main Street'),
  ('Noise Complaint', 'Loud music from neighbor disturbing peace', 'noise', 'medium', '550e8400-e29b-41d4-a716-446655440003', '456 Oak Avenue'),
  ('Stray Dogs', 'Pack of stray dogs roaming the area', 'animal', 'medium', '550e8400-e29b-41d4-a716-446655440003', 'Park Area')
ON CONFLICT DO NOTHING;

-- Insert sample audit logs
INSERT INTO audit_logs (user_id, action, resource_type, resource_id, new_values) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'login', 'auth', '550e8400-e29b-41d4-a716-446655440000', '{"login_time": "2024-01-15T08:00:00Z"}'),
  ('550e8400-e29b-41d4-a716-446655440003', 'create', 'document', 'doc-001', '{"type": "clearance", "status": "pending"}'),
  ('550e8400-e29b-41d4-a716-446655440001', 'update', 'appointment', 'apt-001', '{"status": "confirmed"}')
ON CONFLICT DO NOTHING;
