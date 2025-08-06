-- Create barangay_officials table
CREATE TABLE IF NOT EXISTS public.barangay_officials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    description TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    achievements TEXT[],
    image_url TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.barangay_officials ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON public.barangay_officials
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert" ON public.barangay_officials
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update" ON public.barangay_officials
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER handle_barangay_officials_updated_at
    BEFORE UPDATE ON public.barangay_officials
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Insert sample officials
INSERT INTO public.barangay_officials (name, position, description, contact_email, contact_phone, achievements, image_url) VALUES
('Hon. Maria Santos', 'Barangay Captain', 'Leading our community with integrity and dedication to public service.', 'captain@barangaybucana.gov.ph', '(082) 123-4567', ARRAY['Community Development Award 2023', 'Excellence in Governance'], '/placeholder.svg?height=120&width=120'),
('Hon. Juan Dela Cruz', 'Barangay Kagawad', 'Focused on health and sanitation programs for the community.', 'kagawad1@barangaybucana.gov.ph', '(082) 123-4568', ARRAY['Health Program Excellence'], '/placeholder.svg?height=80&width=80'),
('Hon. Ana Reyes', 'Barangay Secretary', 'Managing administrative functions and community records.', 'secretary@barangaybucana.gov.ph', '(082) 123-4569', ARRAY['Administrative Excellence'], '/placeholder.svg?height=80&width=80'),
('Hon. Pedro Martinez', 'Barangay Treasurer', 'Overseeing financial management and budget allocation.', 'treasurer@barangaybucana.gov.ph', '(082) 123-4570', ARRAY['Financial Management Award'], '/placeholder.svg?height=80&width=80');
