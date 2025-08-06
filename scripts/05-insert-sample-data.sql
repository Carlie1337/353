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
INSERT INTO barangay_officials (name, position, description, contact_email, contact_phone, achievements, image_url, term_start, term_end) VALUES
('Hon. Maria Santos', 'Barangay Captain', 'Leading our community with integrity and dedication to public service for over 10 years. Committed to transparency, community development, and responsive governance.', 'captain@barangaybucana.gov.ph', '(082) 123-4567', ARRAY['Community Development Award 2023', 'Excellence in Governance Award 2022', 'Outstanding Public Service Recognition 2021', 'Disaster Preparedness Leadership Award 2020'], '/placeholder.svg?height=120&width=120', '2023-07-01', '2026-06-30'),
('Hon. Juan Dela Cruz', 'Barangay Kagawad - Infrastructure', 'Committed to improving infrastructure and community development programs. Oversees road maintenance, public facilities, and construction projects.', 'kagawad1@barangaybucana.gov.ph', '(082) 123-4568', ARRAY['Infrastructure Development Award 2023', 'Public Works Excellence 2022'], '/placeholder.svg?height=80&width=80', '2023-07-01', '2026-06-30'),
('Hon. Ana Reyes', 'Barangay Kagawad - Health & Wellness', 'Advocating for health and wellness programs for all residents. Coordinates with health centers and medical missions.', 'kagawad2@barangaybucana.gov.ph', '(082) 123-4569', ARRAY['Health Advocacy Award 2022', 'Community Health Champion 2021'], '/placeholder.svg?height=80&width=80', '2023-07-01', '2026-06-30'),
('Hon. Pedro Martinez', 'Barangay Kagawad - Education & Youth', 'Focused on education and youth development initiatives. Promotes scholarship programs and youth activities.', 'kagawad3@barangaybucana.gov.ph', '(082) 123-4570', ARRAY['Youth Development Recognition 2023', 'Education Advocacy Award 2022'], '/placeholder.svg?height=80&width=80', '2023-07-01', '2026-06-30'),
('Hon. Carmen Lopez', 'Barangay Kagawad - Women & Family', 'Advocates for women empowerment and family welfare programs. Leads gender and development initiatives.', 'kagawad4@barangaybucana.gov.ph', '(082) 123-4571', ARRAY['Women Empowerment Award 2023', 'Family Welfare Recognition 2022'], '/placeholder.svg?height=80&width=80', '2023-07-01', '2026-06-30'),
('Hon. Roberto Garcia', 'Barangay Kagawad - Peace & Order', 'Ensures community safety and peace. Coordinates with law enforcement and security programs.', 'kagawad5@barangaybucana.gov.ph', '(082) 123-4572', ARRAY['Peace and Order Excellence 2023', 'Community Safety Award 2022'], '/placeholder.svg?height=80&width=80', '2023-07-01', '2026-06-30'),
('Ms. Elena Fernandez', 'Barangay Secretary', 'Ensuring efficient administrative operations and record management. Handles official documents and correspondence.', 'secretary@barangaybucana.gov.ph', '(082) 123-4573', ARRAY['Administrative Excellence Award 2022', 'Records Management Recognition 2021'], '/placeholder.svg?height=80&width=80', '2023-07-01', '2026-06-30'),
('Mr. Carlos Mendoza', 'Barangay Treasurer', 'Managing barangay finances with transparency and accountability. Oversees budget planning and financial reporting.', 'treasurer@barangaybucana.gov.ph', '(082) 123-4574', ARRAY['Financial Management Excellence 2023', 'Transparency Award 2022'], '/placeholder.svg?height=80&width=80', '2023-07-01', '2026-06-30')
ON CONFLICT DO NOTHING;

-- Insert emergency alerts
INSERT INTO emergency_alerts (title, message, severity, alert_type, active, created_by) VALUES
('Weather Advisory', 'Heavy rainfall expected in the next 24 hours. Residents in flood-prone areas are advised to take necessary precautions and prepare emergency kits.', 'medium', 'weather', true, '550e8400-e29b-41d4-a716-446655440000'),
('Health Advisory', 'Free COVID-19 vaccination available at Barangay Health Station. Walk-ins welcome from 8AM-5PM. Bring valid ID and vaccination card if available.', 'low', 'health', true, '550e8400-e29b-41d4-a716-446655440001'),
('Traffic Advisory', 'Road construction on Main Street from January 15-20. Alternative routes available via Oak Avenue and Pine Road.', 'medium', 'traffic', true, '550e8400-e29b-41d4-a716-446655440000')
ON CONFLICT DO NOTHING;

-- Insert announcements
INSERT INTO announcements (title, content, category, priority, published, featured, created_by, published_at) VALUES
('Community Clean-up Drive', 'Join us this Saturday, January 15, 2024, for our monthly community clean-up drive. Meeting point at the Barangay Hall at 6:00 AM. Bring your own cleaning materials and water. Light snacks will be provided.', 'community', 'medium', true, true, '550e8400-e29b-41d4-a716-446655440000', NOW()),
('New Online Services Available', 'We are pleased to announce that document requests can now be processed online through our digital portal. Visit our website to learn more about available services and requirements.', 'services', 'high', true, true, '550e8400-e29b-41d4-a716-446655440000', NOW()),
('Barangay Assembly Meeting', 'Monthly barangay assembly meeting scheduled for January 20, 2024, at 2:00 PM at the Barangay Hall. All residents are encouraged to attend. Agenda includes budget presentation and community projects update.', 'meeting', 'medium', true, false, '550e8400-e29b-41d4-a716-446655440000', NOW()),
('Senior Citizens Benefits', 'Senior citizens are reminded to claim their quarterly benefits at the Barangay Hall. Bring valid ID and senior citizen card. Office hours: Monday to Friday, 8AM-5PM.', 'benefits', 'medium', true, false, '550e8400-e29b-41d4-a716-446655440000', NOW()),
('Youth Sports Program', 'Registration for the Youth Basketball League is now open! Ages 13-21 welcome. Registration fee: PHP 200. Contact the Youth Development Office for more information.', 'youth', 'low', true, false, '550e8400-e29b-41d4-a716-446655440000', NOW())
ON CONFLICT DO NOTHING;

-- Insert sample incidents
INSERT INTO incidents (title, description, incident_type, severity, location, reported_by, status) VALUES
('Street Light Not Working', 'Street light on Main Street corner Oak Avenue is not functioning since last week. Area becomes dark at night affecting pedestrian safety.', 'infrastructure', 'medium', 'Main Street corner Oak Avenue', '550e8400-e29b-41d4-a716-446655440006', 'reported'),
('Noise Complaint', 'Loud music from neighbor disturbing peace during late hours. Ongoing issue for the past week affecting sleep of nearby residents.', 'noise', 'low', '456 Oak Avenue', '550e8400-e29b-41d4-a716-446655440006', 'investigating'),
('Stray Dogs', 'Pack of stray dogs roaming the area, causing concern for residents especially children. Dogs appear aggressive and may pose health risks.', 'animal', 'medium', 'Park Area, Purok 2', '550e8400-e29b-41d4-a716-446655440006', 'reported'),
('Pothole on Road', 'Large pothole on Pine Road causing damage to vehicles. Multiple residents have reported tire damage due to this road hazard.', 'infrastructure', 'high', 'Pine Road, Purok 3', '550e8400-e29b-41d4-a716-446655440006', 'processing')
ON CONFLICT DO NOTHING;

-- Insert sample appointments
INSERT INTO appointments (resident_id, appointment_type, appointment_date, appointment_time, purpose, status) VALUES
('770e8400-e29b-41d4-a716-446655440000', 'Document Processing', CURRENT_DATE + INTERVAL '2 days', '09:00:00', 'Barangay Clearance for employment', 'scheduled'),
('770e8400-e29b-41d4-a716-446655440000', 'Health Consultation', CURRENT_DATE + INTERVAL '3 days', '14:00:00', 'Annual health checkup', 'scheduled'),
('770e8400-e29b-41d4-a716-446655440001', 'Legal Consultation', CURRENT_DATE + INTERVAL '5 days', '10:00:00', 'Property dispute mediation', 'confirmed')
ON CONFLICT DO NOTHING;

-- Insert sample document requests
INSERT INTO document_requests (resident_id, document_type, purpose, status, processing_fee) VALUES
('770e8400-e29b-41d4-a716-446655440000', 'Barangay Clearance', 'Employment requirement', 'processing', 50.00),
('770e8400-e29b-41d4-a716-446655440000', 'Certificate of Residency', 'School enrollment', 'pending', 30.00),
('770e8400-e29b-41d4-a716-446655440001', 'Business Permit', 'Sari-sari store operation', 'ready', 200.00),
('770e8400-e29b-41d4-a716-446655440002', 'Indigency Certificate', 'Medical assistance', 'released', 0.00)
ON CONFLICT DO NOTHING;

-- Insert sample blotter reports
INSERT INTO blotter_reports (case_number, complainant_id, respondent_name, incident_type, incident_date, incident_location, description, status) VALUES
('BLT-2024-001', '770e8400-e29b-41d4-a716-446655440000', 'John Doe', 'Noise Complaint', CURRENT_DATE - INTERVAL '5 days', '123 Main Street', 'Loud music during late hours disturbing neighbors', 'mediation'),
('BLT-2024-002', '770e8400-e29b-41d4-a716-446655440001', 'Jane Smith', 'Property Dispute', CURRENT_DATE - INTERVAL '10 days', '456 Oak Avenue', 'Boundary dispute between neighbors', 'investigating'),
('BLT-2024-003', '770e8400-e29b-41d4-a716-446655440002', 'Bob Johnson', 'Verbal Altercation', CURRENT_DATE - INTERVAL '3 days', 'Purok 2 Basketball Court', 'Heated argument during basketball game', 'resolved')
ON CONFLICT DO NOTHING;

-- Insert sample audit logs
INSERT INTO audit_logs (user_id, action, resource_type, resource_id, new_values) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'login', 'auth', '550e8400-e29b-41d4-a716-446655440000', '{"login_time": "2024-01-15T08:00:00Z", "ip_address": "192.168.1.100"}'),
('550e8400-e29b-41d4-a716-446655440006', 'create', 'document_request', '1', '{"type": "barangay_clearance", "status": "pending"}'),
('550e8400-e29b-41d4-a716-446655440001', 'update', 'appointment', '1', '{"status": "confirmed"}'),
('550e8400-e29b-41d4-a716-446655440000', 'create', 'announcement', '1', '{"title": "Community Clean-up Drive", "published": true}')
ON CONFLICT DO NOTHING;
