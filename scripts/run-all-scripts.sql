-- Master script to run all database setup scripts in order
-- Run this script to set up the complete database schema

-- 1. Create extensions and functions
\i scripts/01-create-extensions.sql

-- 2. Create core tables
\i scripts/02-create-core-tables.sql

-- 3. Create barangay-specific tables
\i scripts/03-create-barangay-tables.sql

-- 4. Create indexes for performance
\i scripts/04-create-indexes.sql

-- 5. Insert sample data
\i scripts/05-insert-sample-data.sql

-- 6. Set up Row Level Security policies
\i scripts/06-create-rls-policies.sql

-- 7. Grant permissions
\i scripts/07-grant-permissions.sql

-- Display completion message
SELECT 'Database setup completed successfully!' as status;

-- Display table counts
SELECT 
    'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 
    'residents' as table_name, COUNT(*) as record_count FROM residents
UNION ALL
SELECT 
    'households' as table_name, COUNT(*) as record_count FROM households
UNION ALL
SELECT 
    'barangay_officials' as table_name, COUNT(*) as record_count FROM barangay_officials
UNION ALL
SELECT 
    'announcements' as table_name, COUNT(*) as record_count FROM announcements
UNION ALL
SELECT 
    'emergency_alerts' as table_name, COUNT(*) as record_count FROM emergency_alerts
UNION ALL
SELECT 
    'incidents' as table_name, COUNT(*) as record_count FROM incidents
UNION ALL
SELECT 
    'appointments' as table_name, COUNT(*) as record_count FROM appointments
UNION ALL
SELECT 
    'document_requests' as table_name, COUNT(*) as record_count FROM document_requests
UNION ALL
SELECT 
    'blotter_reports' as table_name, COUNT(*) as record_count FROM blotter_reports
ORDER BY table_name;
