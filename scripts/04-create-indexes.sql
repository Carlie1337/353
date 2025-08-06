-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);

CREATE INDEX IF NOT EXISTS idx_residents_user_id ON residents(user_id);
CREATE INDEX IF NOT EXISTS idx_residents_household_id ON residents(household_id);
CREATE INDEX IF NOT EXISTS idx_residents_email ON residents(email);
CREATE INDEX IF NOT EXISTS idx_residents_name ON residents(last_name, first_name);

CREATE INDEX IF NOT EXISTS idx_households_purok ON households(purok);
CREATE INDEX IF NOT EXISTS idx_households_street ON households(street);

CREATE INDEX IF NOT EXISTS idx_barangay_officials_position ON barangay_officials(position);
CREATE INDEX IF NOT EXISTS idx_barangay_officials_active ON barangay_officials(active);

CREATE INDEX IF NOT EXISTS idx_emergency_alerts_active ON emergency_alerts(active);
CREATE INDEX IF NOT EXISTS idx_emergency_alerts_severity ON emergency_alerts(severity);

CREATE INDEX IF NOT EXISTS idx_announcements_published ON announcements(published);
CREATE INDEX IF NOT EXISTS idx_announcements_featured ON announcements(featured);
CREATE INDEX IF NOT EXISTS idx_announcements_category ON announcements(category);

CREATE INDEX IF NOT EXISTS idx_incidents_status ON incidents(status);
CREATE INDEX IF NOT EXISTS idx_incidents_type ON incidents(incident_type);
CREATE INDEX IF NOT EXISTS idx_incidents_reported_by ON incidents(reported_by);
CREATE INDEX IF NOT EXISTS idx_incidents_created_at ON incidents(created_at);

CREATE INDEX IF NOT EXISTS idx_appointments_resident_id ON appointments(resident_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

CREATE INDEX IF NOT EXISTS idx_document_requests_resident_id ON document_requests(resident_id);
CREATE INDEX IF NOT EXISTS idx_document_requests_status ON document_requests(status);
CREATE INDEX IF NOT EXISTS idx_document_requests_type ON document_requests(document_type);

CREATE INDEX IF NOT EXISTS idx_blotter_reports_case_number ON blotter_reports(case_number);
CREATE INDEX IF NOT EXISTS idx_blotter_reports_complainant ON blotter_reports(complainant_id);
CREATE INDEX IF NOT EXISTS idx_blotter_reports_status ON blotter_reports(status);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
