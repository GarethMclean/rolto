-- Create the website_leads table in Supabase
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS website_leads (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    company_website TEXT,
    source TEXT DEFAULT 'waitlist',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_website_leads_email ON website_leads(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_website_leads_created_at ON website_leads(created_at);

-- Add a comment to the table
COMMENT ON TABLE website_leads IS 'Website leads captured from the waitlist form';

-- Optional: Enable Row Level Security (RLS) if you want to control access
-- ALTER TABLE website_leads ENABLE ROW LEVEL SECURITY;

-- Optional: Create a policy to allow all operations (for now)
-- CREATE POLICY "Allow all operations on website_leads" ON website_leads FOR ALL USING (true); 