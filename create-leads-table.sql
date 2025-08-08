-- Create the website_leads table
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

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_website_leads_email ON website_leads(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_website_leads_created_at ON website_leads(created_at);
