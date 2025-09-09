-- Enable RLS on all tables
ALTER TABLE public.barangay_officials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Barangay Officials policies
CREATE POLICY "Officials can be viewed by all authenticated users" ON public.barangay_officials
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Officials can be managed by admins" ON public.barangay_officials
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

-- Documents policies
CREATE POLICY "Public documents can be viewed by all" ON public.documents
    FOR SELECT USING (is_public = true OR auth.role() = 'authenticated');

CREATE POLICY "Documents can be managed by admins" ON public.documents
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

-- Announcements policies
CREATE POLICY "Published announcements can be viewed by all" ON public.announcements
    FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Announcements can be managed by admins" ON public.announcements
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

-- Events policies
CREATE POLICY "Active events can be viewed by all authenticated users" ON public.events
    FOR SELECT USING (is_active = true AND auth.role() = 'authenticated');

CREATE POLICY "Events can be managed by admins" ON public.events
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

-- Incidents policies
CREATE POLICY "Users can view incidents they reported" ON public.incidents
    FOR SELECT USING (
        reported_by IN (
            SELECT id FROM public.residents WHERE user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin', 'tanod')
        )
    );

CREATE POLICY "Users can report incidents" ON public.incidents
    FOR INSERT WITH CHECK (
        reported_by IN (
            SELECT id FROM public.residents WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Incidents can be managed by authorized personnel" ON public.incidents
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin', 'tanod')
        )
    );

-- Health records policies
CREATE POLICY "Users can view their own health records" ON public.health_records
    FOR SELECT USING (
        resident_id IN (
            SELECT id FROM public.residents WHERE user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin', 'health_worker')
        )
    );

CREATE POLICY "Health records can be managed by health workers" ON public.health_records
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin', 'health_worker')
        )
    );

-- Appointments policies
CREATE POLICY "Users can view their own appointments" ON public.appointments
    FOR SELECT USING (
        resident_id IN (
            SELECT id FROM public.residents WHERE user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin', 'health_worker')
        )
    );

CREATE POLICY "Users can create their own appointments" ON public.appointments
    FOR INSERT WITH CHECK (
        resident_id IN (
            SELECT id FROM public.residents WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own appointments" ON public.appointments
    FOR UPDATE USING (
        resident_id IN (
            SELECT id FROM public.residents WHERE user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin', 'health_worker')
        )
    );
