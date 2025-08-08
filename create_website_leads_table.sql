-- Create the website_leads table for PostgreSQL
CREATE TABLE IF NOT EXISTS website_leads (
    id VARCHAR(191) NOT NULL,
    full_name VARCHAR(191) NOT NULL,
    email VARCHAR(191) NOT NULL,
    company VARCHAR(191) NOT NULL,
    company_website VARCHAR(191) NULL,
    source VARCHAR(191) NULL DEFAULT 'waitlist',
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
); 