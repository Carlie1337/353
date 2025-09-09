-- Additional performance indexes

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_residents_household_active ON public.residents(household_id, is_active);
CREATE INDEX IF NOT EXISTS idx_residents_name_search ON public.residents(first_name, last_name, middle_name);
CREATE INDEX IF NOT EXISTS idx_households_location ON public.households(barangay, purok, street);
CREATE INDEX IF NOT EXISTS idx_users_role_active ON public.users(role, is_active);

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS idx_residents_search ON public.residents USING gin(to_tsvector('english', first_name || ' ' || last_name || ' ' || COALESCE(middle_name, '')));
CREATE INDEX IF NOT EXISTS idx_announcements_search ON public.announcements USING gin(to_tsvector('english', title || ' ' || content));
CREATE INDEX IF NOT EXISTS idx_events_search ON public.events USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- Date range indexes
CREATE INDEX IF NOT EXISTS idx_announcements_date_range ON public.announcements(published_at, expires_at);
CREATE INDEX IF NOT EXISTS idx_events_date_range ON public.events(event_date, start_time);
CREATE INDEX IF NOT EXISTS idx_appointments_date_range ON public.appointments(appointment_date, appointment_time);

-- Status and category indexes
CREATE INDEX IF NOT EXISTS idx_incidents_status_date ON public.incidents(status, created_at);
CREATE INDEX IF NOT EXISTS idx_appointments_status_date ON public.appointments(status, appointment_date);
CREATE INDEX IF NOT EXISTS idx_health_records_type_date ON public.health_records(record_type, record_date);

-- Spatial indexes (if using PostGIS)
CREATE INDEX IF NOT EXISTS idx_households_coordinates ON public.households USING gist(coordinates);
CREATE INDEX IF NOT EXISTS idx_incidents_coordinates ON public.incidents USING gist(coordinates);
