-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (authentication)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('resident', 'admin', 'health_worker', 'tanod', 'barangay_official', 'superadmin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, role)
);

-- Create households table
CREATE TABLE IF NOT EXISTS households (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    house_number VARCHAR(50) NOT NULL,
    street VARCHAR(150) NOT NULL,
    purok VARCHAR(50) NOT NULL,
    barangay VARCHAR(100) DEFAULT '76-A Bucana',
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create residents table
CREATE TABLE IF NOT EXISTS residents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    household_id UUID REFERENCES households(id) ON DELETE SET NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    suffix VARCHAR(20),
    dob DATE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    marital_status VARCHAR(20) CHECK (marital_status IN ('Single', 'Married', 'Widowed', 'Divorced')),
    contact_number VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL,
    gov_id VARCHAR(50),
    occupation VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create barangay_officials table
CREATE TABLE IF NOT EXISTS barangay_officials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    position VARCHAR(150) NOT NULL,
    description TEXT,
    contact_email VARCHAR(150),
    contact_phone VARCHAR(20),
    achievements TEXT[],
    image_url VARCHAR(500),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create emergency_alerts table
CREATE TABLE IF NOT EXISTS emergency_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
    active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'general',
    priority VARCHAR(20) CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    published BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(500),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create incidents table
CREATE TABLE IF NOT EXISTS incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    incident_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
    status VARCHAR(20) CHECK (status IN ('reported', 'investigating', 'resolved', 'closed')) DEFAULT 'reported',
    location VARCHAR(200),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    reported_by UUID REFERENCES users(id),
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
    appointment_type VARCHAR(100) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled')) DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document_requests table
CREATE TABLE IF NOT EXISTS document_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
    document_type VARCHAR(100) NOT NULL,
    purpose VARCHAR(200),
    status VARCHAR(20) CHECK (status IN ('pending', 'processing', 'ready', 'released', 'rejected')) DEFAULT 'pending',
    request_date DATE DEFAULT CURRENT_DATE,
    release_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample barangay officials
INSERT INTO barangay_officials (name, position, description, contact_email, contact_phone, achievements, image_url) VALUES
('Hon. Maria Santos', 'Barangay Captain', 'Leading our community with integrity and dedication to public service for over 10 years.', 'captain@barangaybucana.gov.ph', '(082) 123-4567', ARRAY['Community Development Award 2023', 'Excellence in Governance Award 2022', 'Outstanding Public Service Recognition'], '/placeholder.svg?height=120&width=120'),
('Hon. Juan Dela Cruz', 'Barangay Kagawad', 'Committed to improving infrastructure and community development programs.', 'kagawad1@barangaybucana.gov.ph', '(082) 123-4568', ARRAY['Infrastructure Development Award 2023'], '/placeholder.svg?height=80&width=80'),
('Hon. Ana Reyes', 'Barangay Kagawad', 'Advocating for health and wellness programs for all residents.', 'kagawad2@barangaybucana.gov.ph', '(082) 123-4569', ARRAY['Health Advocacy Award 2022'], '/placeholder.svg?height=80&width=80'),
('Hon. Pedro Martinez', 'Barangay Kagawad', 'Focused on education and youth development initiatives.', 'kagawad3@barangaybucana.gov.ph', '(082) 123-4570', ARRAY['Youth Development Recognition 2023'], '/placeholder.svg?height=80&width=80'),
('Ms. Carmen Lopez', 'Barangay Secretary', 'Ensuring efficient administrative operations and record management.', 'secretary@barangaybucana.gov.ph', '(082) 123-4571', ARRAY['Administrative Excellence Award 2022'], '/placeholder.svg?height=80&width=80'),
('Mr. Roberto Garcia', 'Barangay Treasurer', 'Managing barangay finances with transparency and accountability.', 'treasurer@barangaybucana.gov.ph', '(082) 123-4572', ARRAY['Financial Management Excellence 2023'], '/placeholder.svg?height=80&width=80');

-- Insert sample emergency alerts
INSERT INTO emergency_alerts (title, message, severity, active) VALUES
('Weather Advisory', 'Heavy rainfall expected in the next 24 hours. Residents in flood-prone areas are advised to take necessary precautions.', 'medium', true),
('Health Advisory', 'Free COVID-19 vaccination available at Barangay Health Station. Walk-ins welcome from 8AM-5PM.', 'low', true);

-- Insert sample announcements
INSERT INTO announcements (title, content, category, priority, published, featured) VALUES
('Community Clean-up Drive', 'Join us this Saturday, January 15, 2024, for our monthly community clean-up drive. Meeting point at the Barangay Hall at 6:00 AM.', 'community', 'medium', true, true),
('New Online Services Available', 'We are pleased to announce that document requests can now be processed online through our digital portal. Visit our website to learn more.', 'services', 'high', true, true),
('Barangay Assembly Meeting', 'Monthly barangay assembly meeting scheduled for January 20, 2024, at 2:00 PM at the Barangay Hall. All residents are encouraged to attend.', 'meeting', 'medium', true, false);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_residents_user_id ON residents(user_id);
CREATE INDEX IF NOT EXISTS idx_residents_household_id ON residents(household_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_incidents_status ON incidents(status);
CREATE INDEX IF NOT EXISTS idx_appointments_resident_id ON appointments(resident_id);
CREATE INDEX IF NOT EXISTS idx_document_requests_resident_id ON document_requests(resident_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE residents ENABLE ROW LEVEL SECURITY;
ALTER TABLE households ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Residents can see their own data
CREATE POLICY "Residents can view own data" ON residents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Residents can update own data" ON residents FOR UPDATE USING (auth.uid() = user_id);

-- Public read access for barangay officials and announcements
CREATE POLICY "Public read access for officials" ON barangay_officials FOR SELECT USING (true);
CREATE POLICY "Public read access for announcements" ON announcements FOR SELECT USING (published = true);
CREATE POLICY "Public read access for emergency alerts" ON emergency_alerts FOR SELECT USING (active = true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
