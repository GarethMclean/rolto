# Rolto Referral System

This document outlines the complete referral system implementation for the Rolto waitlist platform.

## Overview

The referral system allows users who join the waitlist to share unique referral links with their network. When someone uses a referral link to join the waitlist, both the referrer and the referred person benefit from the system.

## Features

- **Unique Referral Codes**: Each user gets a unique referral code when they join
- **Referral Tracking**: Track how many people each user has referred
- **Email Notifications**: Automatic confirmation emails sent via Brevo
- **Admin Dashboard**: Comprehensive analytics and referral management
- **Public Referral Pages**: Shareable pages for each referral code

## Database Schema

### WebsiteLeads Table
```sql
ALTER TABLE website_leads 
ADD COLUMN referral_code VARCHAR(191) UNIQUE,
ADD COLUMN referred_by VARCHAR(191),
ADD COLUMN referral_count INTEGER DEFAULT 0;
```

### Referrals Table
```sql
CREATE TABLE referrals (
    id VARCHAR(191) NOT NULL,
    referrer_id VARCHAR(191) NOT NULL,
    referred_id VARCHAR(191) NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE(referrer_id, referred_id)
);
```

## API Endpoints

### 1. Lead Submission with Referral
**POST** `/api/leads`

Accepts referral codes and automatically:
- Generates unique referral codes for new users
- Tracks referral relationships
- Sends confirmation emails
- Updates referral counts

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "companyWebsite": "acme.com",
  "referralCode": "ref_abc123" // Optional
}
```

### 2. Referral Information
**GET** `/api/referrals/[code]`

Returns detailed information about a specific referral code and all people referred by that user.

### 3. Admin Referral Analytics
**GET** `/api/admin/referrals`

Returns comprehensive referral statistics and data for admin users.

## Email System

### Brevo Integration
- Uses Brevo API for sending transactional emails
- Sends waitlist confirmation emails with referral links
- Includes personalized content and referral tracking

### Email Template
The confirmation email includes:
- Personalized greeting with first name
- Rolto value proposition
- Referral link with unique code
- Call-to-action for sharing

## Frontend Components

### 1. Lead Capture Modal
- Automatically detects referral codes from URL parameters
- Includes referral code in form submission
- Shows different success messages for referrals

### 2. Referral Stats Component
- Displays user's referral statistics
- Shows referral link with copy functionality
- Lists people referred by the user

### 3. Admin Referral Dashboard
- Comprehensive referral analytics
- Search and filter functionality
- Performance metrics and insights

### 4. Public Referral Pages
- Shareable pages for each referral code
- Information about the referrer
- Direct waitlist signup integration

## URL Structure

### Referral Links
```
https://yourdomain.com?ref=ref_abc123
```

### Public Referral Pages
```
https://yourdomain.com/referral/ref_abc123
```

## Environment Variables

Add these to your `.env` file:

```env
BREVO_API_KEY=your_brevo_api_key_here
EMAIL_FROM=noreply@yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Setup Instructions

### 1. Database Migration
Run the SQL migration script to add referral columns:
```bash
psql -d your_database -f update-leads-table-referrals.sql
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Update Environment Variables
Add your Brevo API key and other required variables.

### 4. Run Database Migrations
```bash
npx prisma db push
```

### 5. Test the System
1. Submit a lead through the waitlist form
2. Check that confirmation email is sent
3. Verify referral code is generated
4. Test referral link functionality

## How It Works

### 1. User Joins Waitlist
- User fills out the waitlist form
- System generates unique referral code
- Confirmation email sent with referral link
- User can share their referral link

### 2. Referral Process
- Someone clicks a referral link
- Referral code is detected from URL
- New user joins with referral tracking
- Referrer's count is incremented
- Both users benefit from the system

### 3. Tracking and Analytics
- All referral data is stored in database
- Admin dashboard shows comprehensive stats
- Users can view their own referral performance
- System tracks conversion rates and top referrers

## Benefits

### For Users
- **Early Access**: Referrals can unlock early access
- **Special Perks**: Referrers get exclusive benefits
- **Network Growth**: Build relationships through referrals

### For Business
- **Viral Growth**: Organic user acquisition
- **Trust Building**: Referrals come with built-in trust
- **Data Insights**: Understand user acquisition patterns

## Security Considerations

- Referral codes are unique and cannot be guessed
- Admin access is restricted to authorized users
- Email addresses are validated before processing
- Rate limiting prevents abuse

## Monitoring and Analytics

### Key Metrics
- Total leads and referrals
- Conversion rates
- Top performing referrers
- Referral chain depth

### Admin Dashboard
- Real-time statistics
- User search and filtering
- Performance insights
- Export capabilities

## Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check Brevo API key
   - Verify email configuration
   - Check server logs

2. **Referral codes not working**
   - Verify database migration
   - Check referral code generation
   - Validate URL parameters

3. **Admin access issues**
   - Verify user role permissions
   - Check authentication setup
   - Validate route protection

## Future Enhancements

- **Referral Rewards**: Implement actual rewards system
- **Social Sharing**: Integrate with social media platforms
- **Advanced Analytics**: More detailed reporting and insights
- **Automated Campaigns**: Trigger-based email sequences
- **A/B Testing**: Test different referral strategies

## Support

For technical support or questions about the referral system, please refer to the development team or create an issue in the project repository.
