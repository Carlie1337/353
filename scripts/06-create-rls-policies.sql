-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE residents ENABLE ROW LEVEL SECURITY;
ALTER TABLE households ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE blotter_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view own data" ON users 
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data" ON users 
    FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Allow user registration" ON users 
    FOR INSERT WITH CHECK (true);

-- Create RLS policies for user_roles table
CREATE POLICY "Users can view own roles" ON user_roles 
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Admins can view all roles" ON user_roles 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles ur 
            WHERE ur.user_id::text = auth.uid()::text 
            AND ur.role IN ('admin', 'superadmin')
        )
    );

-- Create RLS policies for residents table
CREATE POLICY "Residents can view own data" ON residents 
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Residents can update own data" ON residents 
    FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Allow resident registration" ON residents 
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Admins can view all residents" ON residents 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles ur 
            WHERE ur.user_id::text = auth.uid()::text 
            AND ur.role IN ('admin', 'superadmin', 'health_worker')
        )
    );

-- Create RLS policies for households table
CREATE POLICY "Household members can view household data" ON households 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM residents r 
            WHERE r.household_id = households.id 
            AND r.user_id::text = auth.uid()::text
        )
    );

CREATE POLICY "Allow household creation" ON households 
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Household heads can update household data" ON households 
    FOR UPDATE USING (household_head_id::text IN (
        SELECT r.id::text FROM residents r 
        WHERE r.user_id::text = auth.uid()::text
    ));

-- Public read access for certain tables
CREATE POLICY "Public read access for officials" ON barangay_officials 
    FOR SELECT USING (active = true);

CREATE POLICY "Public read access for announcements" ON announcements 
    FOR SELECT USING (published = true);

CREATE POLICY "Public read access for emergency alerts" ON emergency_alerts 
    FOR SELECT USING (active = true);

-- Create policies for incidents
CREATE POLICY "Users can view own incidents" ON incidents 
    FOR SELECT USING (auth.uid()::text = reported_by::text);

CREATE POLICY "Users can create incidents" ON incidents 
    FOR INSERT WITH CHECK (auth.uid()::text = reported_by::text);

CREATE POLICY "Staff can view all incidents" ON incidents 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles ur 
            WHERE ur.user_id::text = auth.uid()::text 
            AND ur.role IN ('admin', 'superadmin', 'tanod')
        )
    );

-- Create policies for appointments
CREATE POLICY "Residents can view own appointments" ON appointments 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM residents r 
            WHERE r.id = appointments.resident_id 
            AND r.user_id::text = auth.uid()::text
        )
    );

CREATE POLICY "Residents can create appointments" ON appointments 
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM residents r 
            WHERE r.id = appointments.resident_id 
            AND r.user_id::text = auth.uid()::text
        )
    );

-- Create policies for document requests
CREATE POLICY "Residents can view own document requests" ON document_requests 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM residents r 
            WHERE r.id = document_requests.resident_id 
            AND r.user_id::text = auth.uid()::text
        )
    );

CREATE POLICY "Residents can create document requests" ON document_requests 
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM residents r 
            WHERE r.id = document_requests.resident_id 
            AND r.user_id::text = auth.uid()::text
        )
    );

-- Create policies for blotter reports
CREATE POLICY "Complainants can view own blotter reports" ON blotter_reports 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM residents r 
            WHERE r.id = blotter_reports.complainant_id 
            AND r.user_id::text = auth.uid()::text
        )
    );

CREATE POLICY "Staff can view all blotter reports" ON blotter_reports 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles ur 
            WHERE ur.user_id::text = auth.uid()::text 
            AND ur.role IN ('admin', 'superadmin', 'tanod')
        )
    );

-- Create policies for audit logs
CREATE POLICY "Admins can view audit logs" ON audit_logs 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles ur 
            WHERE ur.user_id::text = auth.uid()::text 
            AND ur.role IN ('admin', 'superadmin')
        )
    );
