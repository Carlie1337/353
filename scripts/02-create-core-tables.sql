-- Create users table (authentication)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('resident', 'admin', 'health_worker', 'tanod', 'barangay_official', 'superadmin')),
    department VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, role)
);

-- Create households table
CREATE TABLE IF NOT EXISTS households (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    house_number VARCHAR(50),
    street VARCHAR(150) NOT NULL,
    purok VARCHAR(50) NOT NULL,
    barangay VARCHAR(100) DEFAULT '76-A Bucana',
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    household_head_id UUID,
    total_members INTEGER DEFAULT 1,
    monthly_income_range VARCHAR(50),
    house_type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create residents table
CREATE TABLE IF NOT EXISTS residents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    household_id UUID REFERENCES households(id) ON DELETE SET NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    suffix VARCHAR(20),
    dob DATE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')) NOT NULL,
    marital_status VARCHAR(20) CHECK (marital_status IN ('Single', 'Married', 'Widowed', 'Divorced')),
    contact_number VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL,
    gov_id VARCHAR(50),
    occupation VARCHAR(150),
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    emergency_contact_relationship VARCHAR(100),
    is_voter BOOLEAN DEFAULT false,
    is_pwd BOOLEAN DEFAULT false,
    is_senior_citizen BOOLEAN DEFAULT false,
    is_4ps BOOLEAN DEFAULT false,
    educational_attainment VARCHAR(100),
    nationality VARCHAR(100) DEFAULT 'Filipino',
    birth_place VARCHAR(255),
    civil_status VARCHAR(50),
    relationship_to_head VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key constraint for household head
ALTER TABLE households ADD CONSTRAINT fk_household_head 
    FOREIGN KEY (household_head_id) REFERENCES residents(id) ON DELETE SET NULL;

-- Create triggers for updated_at
CREATE TRIGGER handle_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_households_updated_at
    BEFORE UPDATE ON households
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_residents_updated_at
    BEFORE UPDATE ON residents
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
