-- Add referral tracking columns to website_leads table
ALTER TABLE website_leads 
ADD COLUMN IF NOT EXISTS referral_code VARCHAR(191) UNIQUE,
ADD COLUMN IF NOT EXISTS referred_by VARCHAR(191),
ADD COLUMN IF NOT EXISTS referral_count INTEGER DEFAULT 0;

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
    id VARCHAR(191) NOT NULL,
    referrer_id VARCHAR(191) NOT NULL,
    referred_id VARCHAR(191) NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE(referrer_id, referred_id)
);

-- Add foreign key constraints
ALTER TABLE referrals 
ADD CONSTRAINT fk_referrals_referrer 
FOREIGN KEY (referrer_id) REFERENCES website_leads(id) ON DELETE CASCADE;

ALTER TABLE referrals 
ADD CONSTRAINT fk_referrals_referred 
FOREIGN KEY (referred_id) REFERENCES website_leads(id) ON DELETE CASCADE;

-- Generate referral codes for existing leads
UPDATE website_leads 
SET referral_code = 'ref_' || substr(md5(random()::text), 1, 8) || substr(md5(random()::text), 1, 8)
WHERE referral_code IS NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_website_leads_referral_code ON website_leads(referral_code);
CREATE INDEX IF NOT EXISTS idx_website_leads_referred_by ON website_leads(referred_by);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_id ON referrals(referred_id);
