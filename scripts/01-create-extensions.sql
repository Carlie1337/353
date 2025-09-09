-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create function to handle updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = timezone('utc'::text, now());
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to generate random ID
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
