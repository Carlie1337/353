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
    term_start DATE,
    term_end DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create emergency_alerts table
CREATE TABLE IF NOT EXISTS emergency_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
    alert_type VARCHAR(50) DEFAULT 'general',
    active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id),
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
    published_at TIMESTAMP WITH TIME ZONE,
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
    resolved_at TIMESTAMP WITH TIME ZONE,
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
    purpose TEXT,
    notes TEXT,
    assigned_to UUID REFERENCES users(id),
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
    processing_fee DECIMAL(10, 2) DEFAULT 0.00,
    notes TEXT,
    processed_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blotter_reports table
CREATE TABLE IF NOT EXISTS blotter_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_number VARCHAR(50) UNIQUE NOT NULL,
    complainant_id UUID REFERENCES residents(id),
    respondent_name VARCHAR(200) NOT NULL,
    incident_type VARCHAR(100) NOT NULL,
    incident_date DATE NOT NULL,
    incident_location VARCHAR(200),
    description TEXT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('filed', 'investigating', 'mediation', 'resolved', 'dismissed')) DEFAULT 'filed',
    investigating_officer UUID REFERENCES users(id),
    resolution TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100),
    resource_id VARCHAR(100),
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add triggers for updated_at
CREATE TRIGGER handle_barangay_officials_updated_at
    BEFORE UPDATE ON barangay_officials
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_emergency_alerts_updated_at
    BEFORE UPDATE ON emergency_alerts
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_announcements_updated_at
    BEFORE UPDATE ON announcements
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_incidents_updated_at
    BEFORE UPDATE ON incidents
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_appointments_updated_at
    BEFORE UPDATE ON appointments
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_document_requests_updated_at
    BEFORE UPDATE ON document_requests
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_blotter_reports_updated_at
    BEFORE UPDATE ON blotter_reports
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
