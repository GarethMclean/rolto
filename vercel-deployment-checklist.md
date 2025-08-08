# Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Testimonial Images
- [ ] Replace `public/_static/avatars/testimonial-*.png` files with actual professional headshots
- [ ] Ensure images are high quality and properly sized
- [ ] Test locally to confirm images display correctly

### 2. Environment Variables (Required for Vercel)

#### **Database & Authentication:**
- [ ] `DATABASE_URL` - Your Supabase PostgreSQL connection string
- [ ] `AUTH_SECRET` - Random string for NextAuth.js
- [ ] `NEXTAUTH_URL` - Your Vercel deployment URL (e.g., https://your-app.vercel.app)

#### **OAuth Providers:**
- [ ] `GOOGLE_CLIENT_ID` - Google OAuth client ID
- [ ] `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- [ ] `GITHUB_OAUTH_TOKEN` - GitHub OAuth token

#### **Email Service:**
- [ ] `RESEND_API_KEY` - Resend.com API key for email sending
- [ ] `EMAIL_FROM` - Email address for sending emails (e.g., noreply@yourdomain.com)

#### **Stripe Configuration:**
- [ ] `STRIPE_API_KEY` - Stripe secret key
- [ ] `STRIPE_WEBHOOK_SECRET` - Stripe webhook endpoint secret

#### **Stripe Plan IDs (New Pricing Structure):**
- [ ] `NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PLAN_ID`
- [ ] `NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PLAN_ID`
- [ ] `NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID`
- [ ] `NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID`
- [ ] `NEXT_PUBLIC_STRIPE_VERTICAL_PRO_MONTHLY_PLAN_ID`
- [ ] `NEXT_PUBLIC_STRIPE_VERTICAL_PRO_YEARLY_PLAN_ID`
- [ ] `NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PLAN_ID`
- [ ] `NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PLAN_ID`

#### **App Configuration:**
- [ ] `NEXT_PUBLIC_APP_URL` - Your Vercel deployment URL

## 🚀 Deployment Steps

### 1. Vercel Setup
1. **Connect Repository** - Link your GitHub repository to Vercel
2. **Configure Environment Variables** - Add all variables listed above in Vercel dashboard
3. **Deploy** - Trigger initial deployment

### 2. Database Setup
1. **Supabase Database** - Ensure your Supabase database is running
2. **Table Creation** - Verify `website_leads` table exists (created via our scripts)
3. **Test Connection** - Confirm DATABASE_URL works from Vercel

### 3. Stripe Setup
1. **Create Products** - Create products in Stripe dashboard for each plan
2. **Get Plan IDs** - Copy the price IDs for each plan
3. **Configure Webhooks** - Set up webhook endpoint in Stripe

### 4. Email Setup
1. **Resend Account** - Create account at resend.com
2. **Domain Verification** - Verify your domain for sending emails
3. **API Key** - Generate and add API key to environment variables

## 🔧 Post-Deployment Testing

### 1. Waitlist Functionality
- [ ] Test waitlist form submission
- [ ] Verify data is saved to Supabase database
- [ ] Check email notifications (if configured)
- [ ] Test form validation and error handling

### 2. Testimonials
- [ ] Verify new testimonial images display correctly
- [ ] Test mobile interaction (tap to expand)
- [ ] Check responsive design on different screen sizes

### 3. SEO & Performance
- [ ] Verify sitemap is accessible at `/sitemap.xml`
- [ ] Check robots.txt at `/robots.txt`
- [ ] Test page loading speed
- [ ] Verify meta tags and structured data

### 4. Authentication
- [ ] Test Google OAuth login
- [ ] Test GitHub OAuth login
- [ ] Verify protected routes work correctly
- [ ] Test user session management

## 🐛 Common Issues & Solutions

### Database Connection Issues
- **Issue**: "Database connection failed"
- **Solution**: Check DATABASE_URL format and network access

### Image Loading Issues
- **Issue**: Testimonial images not displaying
- **Solution**: Ensure images are committed to repository and paths are correct

### Environment Variable Issues
- **Issue**: "Missing environment variable"
- **Solution**: Add all required variables in Vercel dashboard

### Stripe Integration Issues
- **Issue**: Pricing plans not working
- **Solution**: Verify all Stripe plan IDs are correct and products exist

## 📊 Monitoring

### 1. Vercel Analytics
- Monitor page views and performance
- Check for 404 errors or build failures

### 2. Supabase Monitoring
- Monitor database connections and queries
- Check for failed lead submissions

### 3. Stripe Dashboard
- Monitor payment attempts and webhook deliveries
- Check for failed subscription creations

## 🎯 Success Criteria

- [ ] Waitlist form submits successfully to Supabase
- [ ] Testimonial images display correctly
- [ ] All pages load without errors
- [ ] SEO meta tags are properly configured
- [ ] Mobile responsiveness works correctly
- [ ] Authentication flows work properly
- [ ] Pricing pages display correct information

Once all items are checked, your Rolto website will be fully functional on Vercel! 🚀 