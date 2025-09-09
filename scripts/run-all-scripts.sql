-- Master script to run all database setup scripts in order
-- Run this file to set up the complete database schema

\echo 'Starting Barangay Management System Database Setup...'

\echo 'Step 1: Creating extensions...'
\i scripts/01-create-extensions.sql

\echo 'Step 2: Creating core tables...'
\i scripts/02-create-core-tables.sql

\echo 'Step 3: Creating barangay-specific tables...'
\i scripts/03-create-barangay-tables.sql

\echo 'Step 4: Creating indexes for performance...'
\i scripts/04-create-indexes.sql

\echo 'Step 5: Inserting sample data...'
\i scripts/05-insert-sample-data.sql

\echo 'Step 6: Setting up Row Level Security policies...'
\i scripts/06-create-rls-policies.sql

\echo 'Step 7: Granting permissions...'
\i scripts/07-grant-permissions.sql

-- Verify tables were created
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Verify columns in households table
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'households'
ORDER BY ordinal_position;

-- Show sample data counts
SELECT 
    'users' as table_name, COUNT(*) as row_count FROM public.users
UNION ALL
SELECT 
    'households' as table_name, COUNT(*) as row_count FROM public.households
UNION ALL
SELECT 
    'residents' as table_name, COUNT(*) as row_count FROM public.residents
UNION ALL
SELECT 
    'announcements' as table_name, COUNT(*) as row_count FROM public.announcements
UNION ALL
SELECT 
    'events' as table_name, COUNT(*) as row_count FROM public.events;

\echo 'Database setup completed successfully!'
\echo 'You can now use the Barangay Management System.'
