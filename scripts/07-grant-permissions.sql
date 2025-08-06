-- Grant necessary permissions to authenticated and anonymous users
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant permissions on all tables
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

-- Grant permissions on sequences
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION handle_updated_at() TO authenticated;

-- Specific permissions for public tables
GRANT SELECT ON barangay_officials TO anon;
GRANT SELECT ON announcements TO anon;
GRANT SELECT ON emergency_alerts TO anon;

-- Revoke unnecessary permissions from anon for sensitive tables
REVOKE ALL ON users FROM anon;
REVOKE ALL ON user_roles FROM anon;
REVOKE ALL ON residents FROM anon;
REVOKE ALL ON households FROM anon;
REVOKE ALL ON incidents FROM anon;
REVOKE ALL ON appointments FROM anon;
REVOKE ALL ON document_requests FROM anon;
REVOKE ALL ON blotter_reports FROM anon;
REVOKE ALL ON audit_logs FROM anon;
