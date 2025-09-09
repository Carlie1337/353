-- Create barangay officials table
CREATE TABLE IF NOT EXISTS public.barangay_officials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resident_id UUID REFERENCES public.residents(id) ON DELETE CASCADE,
    position VARCHAR(100) NOT NULL,
    term_start DATE NOT NULL,
    term_end DATE,
    is_active BOOLEAN DEFAULT true,
    appointed_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_url TEXT,
    file_size INTEGER,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES public.users(id),
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create announcements table
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50),
    priority VARCHAR(20) DEFAULT 'normal',
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    location VARCHAR(255),
    category VARCHAR(50),
    max_participants INTEGER,
    registration_required BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create incidents table
CREATE TABLE IF NOT EXISTS public.incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    coordinates POINT,
    severity VARCHAR(20) DEFAULT 'medium',
    status VARCHAR(50) DEFAULT 'reported',
    reported_by UUID REFERENCES public.residents(id),
    assigned_to UUID REFERENCES public.users(id),
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create health records table
CREATE TABLE IF NOT EXISTS public.health_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resident_id UUID REFERENCES public.residents(id) ON DELETE CASCADE,
    record_type VARCHAR(50) NOT NULL,
    record_date DATE NOT NULL,
    description TEXT,
    diagnosis TEXT,
    treatment TEXT,
    medications TEXT,
    notes TEXT,
    healthcare_provider VARCHAR(255),
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resident_id UUID REFERENCES public.residents(id) ON DELETE CASCADE,
    appointment_type VARCHAR(100) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    purpose TEXT,
    status VARCHAR(50) DEFAULT 'scheduled',
    notes TEXT,
    created_by UUID REFERENCES public.users(id),
    handled_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_barangay_officials_resident ON public.barangay_officials(resident_id);
CREATE INDEX idx_barangay_officials_position ON public.barangay_officials(position);
CREATE INDEX idx_documents_type ON public.documents(document_type);
CREATE INDEX idx_announcements_category ON public.announcements(category);
CREATE INDEX idx_announcements_published ON public.announcements(is_published);
CREATE INDEX idx_events_date ON public.events(event_date);
CREATE INDEX idx_events_category ON public.events(category);
CREATE INDEX idx_incidents_type ON public.incidents(incident_type);
CREATE INDEX idx_incidents_status ON public.incidents(status);
CREATE INDEX idx_health_records_resident ON public.health_records(resident_id);
CREATE INDEX idx_appointments_resident ON public.appointments(resident_id);
CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);

-- Add triggers
CREATE TRIGGER handle_barangay_officials_updated_at
    BEFORE UPDATE ON public.barangay_officials
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_documents_updated_at
    BEFORE UPDATE ON public.documents
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_announcements_updated_at
    BEFORE UPDATE ON public.announcements
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_events_updated_at
    BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_incidents_updated_at
    BEFORE UPDATE ON public.incidents
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_health_records_updated_at
    BEFORE UPDATE ON public.health_records
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_appointments_updated_at
    BEFORE UPDATE ON public.appointments
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
