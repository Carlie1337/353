-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS medical_records CASCADE;
DROP TABLE IF EXISTS document_requests CASCADE;
DROP TABLE IF EXISTS incidents CASCADE;
DROP TABLE IF EXISTS households CASCADE;
DROP TABLE IF EXISTS barangay_officials CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    gender VARCHAR(10),
    civil_status VARCHAR(20),
    occupation VARCHAR(100),
    role VARCHAR(20) DEFAULT 'resident' CHECK (role IN ('resident', 'admin', 'official', 'staff')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    profile_image_url TEXT,
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create barangay_officials table
CREATE TABLE barangay_officials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    position VARCHAR(100) NOT NULL,
    description TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    achievements TEXT[],
    image_url TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create households table
CREATE TABLE households (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household_head_id UUID REFERENCES users(id),
    address TEXT NOT NULL,
    purok VARCHAR(50),
    household_size INTEGER DEFAULT 1,
    monthly_income DECIMAL(10,2),
    house_type VARCHAR(50),
    lot_area DECIMAL(8,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create incidents table
CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES users(id),
    incident_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    incident_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'reported' CHECK (status IN ('reported', 'investigating', 'resolved', 'closed')),
    priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    assigned_to VARCHAR(255),
    resolution_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document_requests table
CREATE TABLE document_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID REFERENCES users(id),
    document_type VARCHAR(100) NOT NULL,
    purpose TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'ready', 'released', 'rejected')),
    request_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processing_fee DECIMAL(8,2),
    notes TEXT,
    processed_by UUID REFERENCES users(id),
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create medical_records table
CREATE TABLE medical_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES users(id),
    record_type VARCHAR(50) NOT NULL,
    diagnosis TEXT,
    treatment TEXT,
    medications TEXT[],
    vital_signs JSONB,
    attending_physician VARCHAR(255),
    record_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    follow_up_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES users(id),
    appointment_type VARCHAR(50) NOT NULL,
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
    purpose TEXT,
    notes TEXT,
    attending_staff VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_households_head ON households(household_head_id);
CREATE INDEX idx_incidents_reporter ON incidents(reporter_id);
CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_incidents_date ON incidents(incident_date);
CREATE INDEX idx_document_requests_requester ON document_requests(requester_id);
CREATE INDEX idx_document_requests_status ON document_requests(status);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);

-- Insert sample barangay officials
INSERT INTO barangay_officials (name, position, description, contact_email, contact_phone, achievements, image_url, active) VALUES
('Hon. Maria Santos', 'Barangay Captain', 'Leading our community with integrity and dedication to public service for over 10 years.', 'captain@barangaybucana.gov.ph', '(082) 123-4567', ARRAY['Community Development Award 2023', 'Excellence in Governance Award 2022'], '/placeholder.svg?height=120&width=120', true),
('Hon. Juan Dela Cruz', 'Barangay Kagawad - Infrastructure', 'Committed to improving infrastructure and community development programs.', 'kagawad1@barangaybucana.gov.ph', '(082) 123-4568', ARRAY['Infrastructure Development Award 2023'], '/placeholder.svg?height=80&width=80', true),
('Hon. Ana Reyes', 'Barangay Kagawad - Health & Wellness', 'Advocating for health and wellness programs for all residents.', 'kagawad2@barangaybucana.gov.ph', '(082) 123-4569', ARRAY['Health Advocacy Award 2022'], '/placeholder.svg?height=80&width=80', true),
('Hon. Pedro Martinez', 'Barangay Secretary', 'Managing administrative functions and community records with precision.', 'secretary@barangaybucana.gov.ph', '(082) 123-4570', ARRAY['Administrative Excellence Award 2023'], '/placeholder.svg?height=80&width=80', true),
('Hon. Carmen Lopez', 'Barangay Treasurer', 'Overseeing financial management and budget allocation for community projects.', 'treasurer@barangaybucana.gov.ph', '(082) 123-4571', ARRAY['Financial Management Certification'], '/placeholder.svg?height=80&width=80', true);

-- Insert sample users
INSERT INTO users (email, full_name, phone, address, role, status) VALUES
('admin@barangaybucana.gov.ph', 'System Administrator', '(082) 123-4500', 'Barangay Hall, Bucana', 'admin', 'active'),
('john.doe@email.com', 'John Doe', '09123456789', 'Purok 1, Bucana', 'resident', 'active'),
('jane.smith@email.com', 'Jane Smith', '09234567890', 'Purok 2, Bucana', 'resident', 'active'),
('mike.johnson@email.com', 'Mike Johnson', '09345678901', 'Purok 3, Bucana', 'resident', 'active');

-- Insert sample households
INSERT INTO households (household_head_id, address, purok, household_size, monthly_income, house_type) VALUES
((SELECT id FROM users WHERE email = 'john.doe@email.com'), 'Purok 1, Bucana', 'Purok 1', 4, 25000.00, 'Concrete'),
((SELECT id FROM users WHERE email = 'jane.smith@email.com'), 'Purok 2, Bucana', 'Purok 2', 3, 30000.00, 'Semi-Concrete'),
((SELECT id FROM users WHERE email = 'mike.johnson@email.com'), 'Purok 3, Bucana', 'Purok 3', 5, 20000.00, 'Wood');

-- Insert sample incidents
INSERT INTO incidents (reporter_id, incident_type, description, location, incident_date, status, priority) VALUES
((SELECT id FROM users WHERE email = 'john.doe@email.com'), 'Noise Complaint', 'Loud music from neighbor', 'Purok 1, Bucana', NOW() - INTERVAL '2 days', 'investigating', 'medium'),
((SELECT id FROM users WHERE email = 'jane.smith@email.com'), 'Street Light', 'Broken street light on main road', 'Main Road, Bucana', NOW() - INTERVAL '1 day', 'reported', 'high');

-- Insert sample document requests
INSERT INTO document_requests (requester_id, document_type, purpose, status, processing_fee) VALUES
((SELECT id FROM users WHERE email = 'john.doe@email.com'), 'Barangay Clearance', 'Employment requirement', 'processing', 50.00),
((SELECT id FROM users WHERE email = 'jane.smith@email.com'), 'Certificate of Residency', 'School enrollment', 'ready', 30.00);

-- Insert sample appointments
INSERT INTO appointments (patient_id, appointment_type, appointment_date, purpose, status) VALUES
((SELECT id FROM users WHERE email = 'john.doe@email.com'), 'General Consultation', NOW() + INTERVAL '3 days', 'Regular checkup', 'scheduled'),
((SELECT id FROM users WHERE email = 'jane.smith@email.com'), 'Vaccination', NOW() + INTERVAL '5 days', 'COVID-19 booster', 'confirmed');

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE barangay_officials ENABLE ROW LEVEL SECURITY;
ALTER TABLE households ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access to barangay_officials
CREATE POLICY "Public can view active officials" ON barangay_officials
    FOR SELECT USING (active = true);

-- Create RLS policies for users (basic access)
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Public can insert users" ON users
    FOR INSERT WITH CHECK (true);

-- Create RLS policies for other tables (restrict to authenticated users)
CREATE POLICY "Authenticated users can view households" ON households
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view incidents" ON incidents
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view document requests" ON document_requests
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view appointments" ON appointments
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view medical records" ON medical_records
    FOR SELECT USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON barangay_officials TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON users TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON households TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON incidents TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON document_requests TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON medical_records TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON appointments TO authenticated;

-- Grant sequence permissions
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

COMMIT;
