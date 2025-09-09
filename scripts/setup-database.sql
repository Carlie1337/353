-- Complete Database Setup Script for Barangay Management System
-- Run this script in your Supabase SQL Editor

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create utility functions
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = timezone('utc'::text, now());
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_random_id(length INTEGER DEFAULT 8)
RETURNS TEXT AS $$
DECLARE
   chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   result TEXT := '';
   i INTEGER := 0;
BEGIN
   FOR i IN 1..length LOOP
       result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
   END LOOP;
   RETURN result;
END;
$$ LANGUAGE plpgsql;

-- 3. Drop existing tables if they exist (in correct order)
DROP TABLE IF EXISTS public.appointments CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.residents CASCADE;
DROP TABLE IF EXISTS public.households CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- 4. Create core tables
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'resident',
    phone VARCHAR(20),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.households (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    house_number VARCHAR(50) NOT NULL,
    street VARCHAR(255) NOT NULL,
    purok VARCHAR(100) NOT NULL,
    barangay VARCHAR(100) NOT NULL DEFAULT '76-A Bucana',
    city VARCHAR(100) NOT NULL DEFAULT 'Davao City',
    province VARCHAR(100) NOT NULL DEFAULT 'Davao del Sur',
    zip_code VARCHAR(10) NOT NULL DEFAULT '8000',
    household_head_id UUID,
    total_members INTEGER DEFAULT 1,
    monthly_income DECIMAL(12,2),
    house_type VARCHAR(50),
    lot_area DECIMAL(10,2),
    floor_area DECIMAL(10,2),
    water_source VARCHAR(100),
    electricity_source VARCHAR(100),
    toilet_facility VARCHAR(100),
    waste_disposal VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.residents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    resident_id VARCHAR(50) UNIQUE NOT NULL DEFAULT ('RES-' || generate_random_id(8)),
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    suffix VARCHAR(10),
    nickname VARCHAR(50),
    dob DATE NOT NULL,
    age INTEGER, -- Removed generated column, will be calculated in application
    gender VARCHAR(20) NOT NULL,
    marital_status VARCHAR(30),
    contact_number VARCHAR(20),
    email VARCHAR(255),
    gov_id VARCHAR(100),
    occupation VARCHAR(100),
    monthly_income DECIMAL(10,2),
    educational_attainment VARCHAR(100),
    religion VARCHAR(100),
    ethnicity VARCHAR(100),
    blood_type VARCHAR(5),
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    is_voter BOOLEAN DEFAULT false,
    is_pwd BOOLEAN DEFAULT false,
    is_senior_citizen BOOLEAN DEFAULT false,
    is_4ps BOOLEAN DEFAULT false,
    is_solo_parent BOOLEAN DEFAULT false,
    is_ofw BOOLEAN DEFAULT false,
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    emergency_contact_relationship VARCHAR(50),
    profile_picture_url TEXT,
    qr_code TEXT,
    is_household_head BOOLEAN DEFAULT false,
    relationship_to_head VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL,
    granted_by UUID REFERENCES public.users(id),
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create appointments table
CREATE TABLE public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL DEFAULT 'consultation',
    service VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    notes TEXT,
    purpose TEXT,
    requirements_met BOOLEAN DEFAULT false,
    assigned_staff UUID REFERENCES public.users(id),
    location VARCHAR(255),
    reminder_sent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Add foreign key constraint for household head
ALTER TABLE public.households 
ADD CONSTRAINT fk_household_head 
FOREIGN KEY (household_head_id) REFERENCES public.residents(id) ON DELETE SET NULL;

-- 7. Create indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_households_barangay ON public.households(barangay);
CREATE INDEX idx_households_purok ON public.households(purok);
CREATE INDEX idx_residents_user_id ON public.residents(user_id);
CREATE INDEX idx_residents_household_id ON public.residents(household_id);
CREATE INDEX idx_residents_email ON public.residents(email);
CREATE INDEX idx_appointments_user_id ON public.appointments(user_id);
CREATE INDEX idx_appointments_date ON public.appointments(date);
CREATE INDEX idx_appointments_status ON public.appointments(status);

-- 8. Create triggers
CREATE TRIGGER handle_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_households_updated_at
    BEFORE UPDATE ON public.households
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_residents_updated_at
    BEFORE UPDATE ON public.residents
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_appointments_updated_at
    BEFORE UPDATE ON public.appointments
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- 9. Create function to calculate age
CREATE OR REPLACE FUNCTION calculate_age(birth_date DATE)
RETURNS INTEGER AS $$
BEGIN
    RETURN EXTRACT(YEAR FROM AGE(birth_date));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 10. Create trigger to auto-calculate age
CREATE OR REPLACE FUNCTION update_resident_age()
RETURNS TRIGGER AS $$
BEGIN
    NEW.age = calculate_age(NEW.dob);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_resident_age
    BEFORE INSERT OR UPDATE OF dob ON public.residents
    FOR EACH ROW EXECUTE PROCEDURE update_resident_age();

-- 11. Grant permissions
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.user_roles TO authenticated;
GRANT ALL ON public.households TO authenticated;
GRANT ALL ON public.residents TO authenticated;
GRANT ALL ON public.appointments TO authenticated;

-- 12. Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.households ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.residents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- 13. Create RLS policies
CREATE POLICY "Users can manage own profile" ON public.users
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Residents can manage own data" ON public.residents
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Households accessible by members" ON public.households
    FOR ALL USING (
        id IN (
            SELECT household_id FROM public.residents 
            WHERE user_id = auth.uid()
        ) OR
        household_head_id IN (
            SELECT id FROM public.residents 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "User roles viewable by user" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "User roles insertable by authenticated" ON public.user_roles
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can manage own appointments" ON public.appointments
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all appointments" ON public.appointments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'staff', 'health_worker')
        )
    );

-- 14. Insert sample data
INSERT INTO public.users (id, email, name, role, phone) VALUES
    ('00000000-0000-0000-0000-000000000001', 'admin@barangaybucana.gov.ph', 'System Administrator', 'admin', '+63 912 345 6789'),
    ('00000000-0000-0000-0000-000000000002', 'health@barangaybucana.gov.ph', 'Health Worker', 'health_worker', '+63 912 345 6790')
ON CONFLICT (id) DO NOTHING;

-- Success message
SELECT 'Database setup completed successfully!' as message;
