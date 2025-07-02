-- Enable UUID extension (no-op if it already exists)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-----------------------------------------------------------
--  BARANGAY OFFICIALS
-----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.barangay_officials (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(255) NOT NULL,
    position        VARCHAR(150) NOT NULL,
    description     TEXT,
    contact_email   VARCHAR(255),
    contact_phone   VARCHAR(30),
    achievements    TEXT[],               -- simple string-array column
    image_url       TEXT,
    active          BOOLEAN      DEFAULT true,
    created_at      TIMESTAMPTZ  DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  DEFAULT NOW()
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_officials_position ON public.barangay_officials(position);
CREATE INDEX IF NOT EXISTS idx_officials_active   ON public.barangay_officials(active);

-----------------------------------------------------------
--  TRIGGER: keep updated_at fresh
-----------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_barangay_officials_updated_at
BEFORE UPDATE ON public.barangay_officials
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-----------------------------------------------------------
--  ROW-LEVEL SECURITY (RLS)
-----------------------------------------------------------
-- Turn it on
ALTER TABLE public.barangay_officials ENABLE ROW LEVEL SECURITY;

-- Read-only for everyone (adjust in production)
CREATE POLICY "Everyone can read active officials"
ON public.barangay_officials
FOR SELECT
USING (active = true);

-- Only authenticated users with the role 'admin' or 'barangay_official'
-- may insert/update/delete (adjust as desired).
CREATE POLICY "Privileged may manage officials"
ON public.barangay_officials
FOR ALL
USING   (auth.role() IN ('authenticated'))
WITH CHECK (auth.role() IN ('authenticated'));
