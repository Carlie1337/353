-- Insert demo users
INSERT INTO users (id, email, password_hash, email_verified, first_name, last_name, phone) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin@barangay.gov.ph', '$2b$10$rQZ8kHp0rQZ8kHp0rQZ8kOp0rQZ8kHp0rQZ8kHp0rQZ8kHp0rQZ8k', true, 'Juan', 'Dela Cruz', '+63-912-345-6789'),
('550e8400-e29b-41d4-a716-446655440001', 'health@barangay.gov.ph', '$2b$10$rQZ8kHp0rQZ8kHp0rQZ8kOp0rQZ8kHp0rQZ8kHp0rQZ8kHp0rQZ8k', true, 'Maria', 'Santos', '+63-912-345-6790'),
('550e8400-e29b-41d4-a716-446655440002', 'security@barangay.gov.ph', '$2b$10$rQZ8kHp0rQZ8kHp0rQZ8kOp0rQZ8kHp0rQZ8kHp0rQZ8kHp0rQZ8k', true, 'Pedro', 'Garcia', '+63-912-345-6791'),
('550e8400-e29b-41d4-a716-446655440003', 'tanod@barangay.gov.ph', '$2b$10$rQZ8kHp0rQZ8kHp0rQZ8kOp0rQZ8kHp0rQZ8kHp0rQZ8kHp0rQZ8k', true, 'Roberto', 'Martinez', '+63-912-345-6792'),
('550e8400-e29b-41d4-a716-446655440004', 'official@barangay.gov.ph', '$2b$10$rQZ8kHp0rQZ8kHp0rQZ8kOp0rQZ8kHp0rQZ8kHp0rQZ8kHp0rQZ8k', true, 'Carmen', 'Lopez', '+63-912-345-6793'),
('550e8400-e29b-41d4-a716-446655440005', 'superadmin@barangay.gov.ph', '$2b$10$rQZ8kHp0rQZ8kHp0rQZ8kOp0rQZ8kHp0rQZ8kHp0rQZ8kHp0rQZ8k', true, 'Ana', 'Reyes', '+63-912-345-6794'),
('550e8400-e29b-41d4-a716-446655440006', 'resident@email.com', '$2b$10$rQZ8kHp0rQZ8kHp0rQZ8kOp0rQZ8kHp0rQZ8kHp0rQZ8kHp0rQZ8k', true, 'Jose', 'Rizal', '+63-912-345-6795')
ON CONFLICT (id) DO NOTHING;

-- Insert user roles
INSERT INTO user_roles (user_id, role, department) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin', 'Administration'),
('550e8400-e29b-41d4-a716-446655440001', 'health_worker', 'Health'),
('550e8400-e29b-41d4-a716-446655440002', 'tanod', 'Security'),
('550e8400-e29b-41d4-a716-446655440003', 'tanod', 'Security'),
('550e8400-e29b-41d4-a716-446655440004', 'barangay_official', 'Administration'),
('550e8400-e29b-41d4-a716-446655440005', 'superadmin', 'IT'),
('550e8400-e29b-41d4-a716-446655440006', 'resident', NULL)
ON CONFLICT (user_id, role) DO NOTHING;

-- Insert sample households
INSERT INTO households (id, house_number, street, purok, city, province, zip_code, house_type, monthly_income_range) VALUES
('660e8400-e29b-41d4-a716-446655440000', '123', 'Main Street', 'Purok 1', 'Davao City', 'Davao del Sur', '8000', 'Concrete', '20,000 - 30,000'),
('660e8400-e29b-41d4-a716-446655440001', '456', 'Oak Avenue', 'Purok 2', 'Davao City', 'Davao del Sur', '8000', 'Wood', '15,000 - 20,000'),
('660e8400-e29b-41d4-a716-446655440002', '789', 'Pine Road', 'Purok 3', 'Davao City', 'Davao del Sur', '8000', 'Mixed', '10,000 - 15,000')
ON CONFLICT (id) DO NOTHING;

-- Insert sample residents
INSERT INTO residents (id, user_id, household_id, first_name, middle_name, last_name, dob, gender, marital_status, contact_number, email, occupation, relationship_to_head, is_voter, educational_attainment) VALUES
('770e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440000', 'Jose', 'Protacio', 'Rizal', '1990-06-19', 'Male', 'Single', '+63-912-345-6795', 'resident@email.com', 'Teacher', 'Head', true, 'College Graduate'),
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440001', 'Juan', 'Santos', 'Dela Cruz', '1985-03-15', 'Male', 'Married', '+63-912-345-6789', 'admin@barangay.gov.ph', 'Barangay Captain', 'Head', true, 'College Graduate'),
('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002', 'Maria', 'Cruz', 'Santos', '1988-07-22', 'Female', 'Married', '+63-912-345-6790', 'health@barangay.gov.ph', 'Nurse', 'Head', true, 'College Graduate')
ON CONFLICT (id) DO NOTHING;

-- Update household heads
UPDATE households SET household_head_id = '770e8400-e29b-41d4-a716-446655440000' WHERE id = '660e8400-e29b-41d4-a716-446655440000';
UPDATE households SET household_head_id = '770e8400-e29b-41d4-a716-446655440001' WHERE id = '660e8400-e29b-41d4-a716-446655440001';
UPDATE households SET household_head_id = '770e8400-e29b-41d4-a716-446655440002' WHERE id = '660e8400-e29b-41d4-a716-446655440002';

-- Insert barangay officials
INSERT INTO public.barangay_officials (name, position, description, contact_email, contact_phone, achievements, image_url, term_start, term_end) VALUES
('Hon. Maria Santos', 'Barangay Captain', 'Leading our community with integrity and dedication to public service for over 10 years. Committed to transparent governance and community development.', 'captain@barangaybucana.gov.ph', '(082) 123-4567', ARRAY['Community Development Award 2023', 'Excellence in Governance Award 2022', 'Outstanding Public Service Recognition 2021'], '/placeholder.svg?height=120&width=120', '2022-01-01', '2025-12-31'),
('Hon. Juan Dela Cruz', 'Barangay Kagawad - Infrastructure', 'Committed to improving infrastructure and community development programs. Oversees road maintenance, drainage systems, and public facilities.', 'kagawad1@barangaybucana.gov.ph', '(082) 123-4568', ARRAY['Infrastructure Development Award 2023', 'Public Works Excellence 2022'], '/placeholder.svg?height=80&width=80', '2022-01-01', '2025-12-31'),
('Hon. Ana Reyes', 'Barangay Kagawad - Health & Wellness', 'Advocating for health and wellness programs for all residents. Coordinates with health centers and manages community health initiatives.', 'kagawad2@barangaybucana.gov.ph', '(082) 123-4569', ARRAY['Health Advocacy Award 2022', 'Community Wellness Champion 2023'], '/placeholder.svg?height=80&width=80', '2022-01-01', '2025-12-31'),
('Hon. Pedro Martinez', 'Barangay Kagawad - Education & Youth', 'Focused on education and youth development initiatives. Manages scholarship programs and youth activities.', 'kagawad3@barangaybucana.gov.ph', '(082) 123-4570', ARRAY['Youth Development Recognition 2023', 'Education Advocate Award 2022'], '/placeholder.svg?height=80&width=80', '2022-01-01', '2025-12-31'),
('Hon. Rosa Garcia', 'Barangay Kagawad - Women & Family', 'Championing women''s rights and family welfare programs. Leads initiatives for gender equality and family support services.', 'kagawad4@barangaybucana.gov.ph', '(082) 123-4571', ARRAY['Women Empowerment Award 2023', 'Family Welfare Champion 2022'], '/placeholder.svg?height=80&width=80', '2022-01-01', '2025-12-31'),
('Hon. Miguel Torres', 'Barangay Kagawad - Peace & Order', 'Maintaining peace and order in the community. Coordinates with law enforcement and manages security programs.', 'kagawad5@barangaybucana.gov.ph', '(082) 123-4572', ARRAY['Peace & Order Excellence 2023', 'Community Safety Award 2022'], '/placeholder.svg?height=80&width=80', '2022-01-01', '2025-12-31'),
('Ms. Carmen Lopez', 'Barangay Secretary', 'Ensuring efficient administrative operations and record management. Handles official documents and correspondence.', 'secretary@barangaybucana.gov.ph', '(082) 123-4573', ARRAY['Administrative Excellence Award 2022', 'Records Management Recognition 2023'], '/placeholder.svg?height=80&width=80', '2022-01-01', '2025-12-31'),
('Mr. Roberto Garcia', 'Barangay Treasurer', 'Managing barangay finances with transparency and accountability. Oversees budget planning and financial reporting.', 'treasurer@barangaybucana.gov.ph', '(082) 123-4574', ARRAY['Financial Management Excellence 2023', 'Transparency Award 2022'], '/placeholder.svg?height=80&width=80', '2022-01-01', '2025-12-31')
ON CONFLICT DO NOTHING;

-- Insert sample document types
INSERT INTO public.documents (document_type, title, description, is_public) VALUES
('ordinance', 'Barangay Ordinance No. 001-2024', 'Ordinance regulating noise levels in residential areas', true),
('resolution', 'Barangay Resolution No. 001-2024', 'Resolution approving the annual budget', true),
('memo', 'Memorandum on Garbage Collection Schedule', 'Updated schedule for waste collection', true);

-- Insert sample announcements
INSERT INTO public.announcements (title, content, category, priority, author_id, target_audience, is_published, publish_date) VALUES
('Community Clean-up Drive', 'Join us this Saturday for our monthly community clean-up drive. Meeting point at the Barangay Hall at 6:00 AM.', 'Community', 'high', (SELECT id FROM auth.users LIMIT 1), 'all', true, NOW()),
('Health Check-up Schedule', 'Free health check-up for senior citizens every Tuesday at the Health Center. Please bring your senior citizen ID.', 'Health', 'normal', (SELECT id FROM auth.users LIMIT 1), 'senior_citizens', true, NOW()),
('Basketball Tournament Registration', 'Registration for the annual basketball tournament is now open. Contact the Barangay Hall for more details.', 'Sports', 'normal', (SELECT id FROM auth.users LIMIT 1), 'youth', true, NOW());

-- Insert sample events
INSERT INTO events (title, description, event_date, location, organizer_id, max_participants, registration_required, status) VALUES
('Barangay Fiesta 2024', 'Annual celebration of our barangay with cultural shows, games, and food festival.', '2024-12-15 08:00:00+08', 'Barangay Plaza', (SELECT id FROM auth.users LIMIT 1), 500, false, 'upcoming'),
('Youth Leadership Seminar', 'Leadership training for young residents aged 18-30.', '2024-08-20 09:00:00+08', 'Barangay Hall Conference Room', (SELECT id FROM auth.users LIMIT 1), 50, true, 'upcoming'),
('Senior Citizens Day', 'Special celebration for our beloved senior citizens with entertainment and free meals.', '2024-10-01 10:00:00+08', 'Community Center', (SELECT id FROM auth.users LIMIT 1), 200, false, 'upcoming');

-- Insert sample document requests
INSERT INTO public.document_requests (document_type, purpose, status, request_date, fee_amount, fee_paid) VALUES
('Barangay Clearance', 'Employment Requirements', 'processing', '2024-01-10', 50.00, true),
('Certificate of Residency', 'School Enrollment', 'ready', '2024-01-08', 30.00, true),
('Barangay Business Clearance', 'Business Registration', 'pending', '2024-01-12', 100.00, false),
('Certificate of Indigency', 'Medical Assistance', 'released', '2024-01-05', 0.00, true)
ON CONFLICT DO NOTHING;

-- Insert sample blotter reports
INSERT INTO public.blotter_reports (respondent_name, respondent_address, incident_type, incident_description, incident_date, incident_time, incident_location, status) VALUES
('John Doe', 'Block 5 Lot 10, Santos Subdivision', 'Noise Disturbance', 'Loud music and shouting during late hours disturbing neighbors. Multiple complaints received from surrounding residents.', '2024-01-10', '23:30:00', 'Santos Subdivision, Purok 7', 'mediation'),
('Jane Smith', 'House #25, Mabini Street', 'Property Dispute', 'Boundary dispute between neighbors regarding fence installation. Both parties claim ownership of disputed area.', '2024-01-08', '15:00:00', 'Mabini Street, Purok 3', 'investigating'),
('Unknown Person', 'Unknown', 'Theft', 'Bicycle stolen from front yard. Security camera footage available for investigation.', '2024-01-12', '02:00:00', 'Rizal Street, Purok 5', 'filed')
ON CONFLICT DO NOTHING;

-- Insert sample audit logs
INSERT INTO audit_logs (user_id, action, resource_type, resource_id, new_values) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'login', 'auth', '550e8400-e29b-41d4-a716-446655440000', '{"login_time": "2024-01-15T08:00:00Z", "ip_address": "192.168.1.100"}'),
('550e8400-e29b-41d4-a716-446655440006', 'create', 'document_request', '1', '{"type": "barangay_clearance", "status": "pending"}'),
('550e8400-e29b-41d4-a716-446655440001', 'update', 'appointment', '1', '{"status": "confirmed"}'),
('550e8400-e29b-41d4-a716-446655440000', 'create', 'announcement', '1', '{"title": "Community Clean-up Drive", "published": true}')
ON CONFLICT DO NOTHING;

-- Insert sample incident types
INSERT INTO public.incidents (incident_type, title, description, location, severity, status) VALUES
('infrastructure', 'Broken Street Light', 'Street light on Mabini Street is not working', 'Mabini Street, Purok 1', 'medium', 'reported'),
('public_safety', 'Stray Dogs', 'Multiple stray dogs roaming in the area causing safety concerns', 'Purok 2 vicinity', 'high', 'investigating'),
('utilities', 'Water Pipe Leak', 'Water pipe leak causing flooding on the road', 'Rizal Street corner Bonifacio', 'high', 'in_progress');
