# NeuroFit Labs - Deployment Guide

## Pre-Deployment Checklist

### Environment Setup
- [ ] Supabase project created
- [ ] Database tables migrated and seeded
- [ ] Stripe account configured with test and production keys
- [ ] All environment variables configured in Vercel
- [ ] GitHub repository connected to Vercel project

### Testing
- [ ] All pages load without errors
- [ ] Quiz functionality works end-to-end
- [ ] Product cards display correctly
- [ ] Leaderboard shows sample data
- [ ] Dashboard renders with mock data
- [ ] VR demo page loads (WebXR detection working)
- [ ] Mobile responsiveness verified
- [ ] Performance audit passed (Lighthouse)

### Code Quality
- [ ] No TypeScript errors
- [ ] ESLint warnings addressed
- [ ] Console errors cleared
- [ ] Accessibility checks passed (WCAG 2.1 AA)

## Step-by-Step Deployment

### 1. Set Up Supabase

```bash
# Create a new Supabase project
# Go to https://supabase.com and create a project

# Get your credentials:
# - Project URL
# - Anonymous API Key (for client)
# - Service Role Key (for server)
# - JWT Secret
```

### 2. Configure Database

```bash
# In Supabase dashboard, run the migration scripts:

# Option A: Use SQL Editor
# Copy content from scripts/01-create-tables.sql
# Paste into SQL Editor and execute

# Option B: Use psql (if available)
psql -h [POSTGRES_HOST] -U [POSTGRES_USER] -d [POSTGRES_DATABASE] < scripts/01-create-tables.sql
psql -h [POSTGRES_HOST] -U [POSTGRES_USER] -d [POSTGRES_DATABASE] < scripts/02-seed-data.sql
```

### 3. Set Up Stripe (Optional for Production)

```bash
# In Stripe Dashboard:

# 1. Create products:
#    - EEG Headset (one-time, $199)
#    - Monthly Pro Plan (recurring, $19.99/month)
#    - Ultimate Bundle (one-time, $249)

# 2. Get price IDs from each product

# 3. Create webhook endpoint:
#    - URL: https://yourdomain.com/api/webhooks/stripe
#    - Events: payment_intent.succeeded, payment_intent.payment_failed

# 4. Get webhook signing secret
```

### 4. Deploy to Vercel

```bash
# Method 1: Via GitHub (Recommended)
# 1. Push code to GitHub repository
# 2. Connect GitHub repo to Vercel project
# 3. Vercel auto-deploys on every push

# Method 2: Via CLI
# 1. Install Vercel CLI: npm i -g vercel
# 2. Run: vercel --prod
```

### 5. Configure Environment Variables in Vercel

Go to Project Settings > Environment Variables and add:

```
NEXT_PUBLIC_SUPABASE_URL=[your-supabase-url]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
SUPABASE_JWT_SECRET=[your-jwt-secret]
POSTGRES_URL=[your-postgres-url]
POSTGRES_HOST=[your-postgres-host]
POSTGRES_DATABASE=[your-database-name]
POSTGRES_USER=[your-postgres-user]
POSTGRES_PASSWORD=[your-postgres-password]
POSTGRES_URL_NON_POOLING=[postgres-url-non-pooling]

# Stripe (if using)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[pk_live_...]
STRIPE_SECRET_KEY=[sk_live_...]
NEXT_PUBLIC_STRIPE_PRODUCT_EEG=[price_...]
NEXT_PUBLIC_STRIPE_PRODUCT_SUB=[price_...]
NEXT_PUBLIC_STRIPE_PRODUCT_BUNDLE=[price_...]
```

### 6. Set Up Custom Domain

```bash
# In Vercel project settings:
# 1. Go to Domains
# 2. Add custom domain
# 3. Update DNS records (CNAME or A record)
# 4. Wait for verification (usually 5-10 minutes)
```

### 7. Enable Analytics (Optional)

```bash
# Vercel Analytics:
# - Already integrated via @vercel/analytics
# - Data visible in Vercel dashboard

# Web Vitals:
# - Automatically tracked
# - View in Vercel Insights
```

## Production Checklist

### Security
- [ ] HTTPS enabled (auto via Vercel)
- [ ] Environment variables not committed
- [ ] API secrets in Vercel dashboard, not code
- [ ] Rate limiting configured (if needed)
- [ ] CORS headers properly set
- [ ] SQL injection protection verified

### Performance
- [ ] Images optimized with Next.js Image
- [ ] Code splitting enabled
- [ ] Lazy loading for components
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

### Monitoring
- [ ] Error tracking set up (Sentry recommended)
- [ ] Performance monitoring enabled
- [ ] Uptime monitoring configured
- [ ] Log aggregation set up

### Data
- [ ] Database backups configured (Supabase auto-backups)
- [ ] Regular database maintenance scheduled
- [ ] Data retention policies defined
- [ ] GDPR compliance implemented if needed

## Rollback Procedure

If deployment has critical issues:

```bash
# Option 1: Revert GitHub commit and push
git revert <commit-hash>
git push origin main
# Vercel will automatically redeploy the previous version

# Option 2: In Vercel Dashboard
# 1. Go to Deployments
# 2. Find previous stable deployment
# 3. Click "Promote to Production"
```

## Maintenance

### Regular Tasks
- Check Vercel dashboard weekly for errors
- Review Stripe webhook logs monthly
- Update dependencies monthly: `pnpm update`
- Monitor database performance
- Review user analytics

### Monitoring Commands

```bash
# Check deployment status
vercel status

# View logs
vercel logs [project-name]

# Check environment variables are set
vercel env list

# Monitor function execution
vercel logs --follow
```

## Scaling Considerations

As the platform grows:

1. **Database Optimization**
   - Add indexes to frequently queried columns
   - Implement caching (Redis/Upstash)
   - Consider database replication

2. **CDN Configuration**
   - Vercel auto-uses Edge Network
   - Optimize image delivery with Next.js Image
   - Consider static asset caching

3. **API Rate Limiting**
   - Implement via Supabase or middleware
   - Separate limits for authenticated/public users

4. **WebSocket Scaling** (for real-time features)
   - Consider Vercel Websockets
   - Or use alternative real-time service

## Troubleshooting

### Build Failures
```bash
# Clear build cache
vercel projects list
vercel projects remove [project]
# Then redeploy
```

### Environment Variable Issues
```bash
# List vars being used
vercel env list

# Verify values
vercel env get [VAR_NAME]

# Add/update
vercel env set [VAR_NAME] [value] --prod
```

### Database Connection Issues
```bash
# Test connection
psql -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_DATABASE -c "SELECT 1"

# Check RLS policies
# In Supabase: Authentication > Policies
```

### Stripe Integration Issues
```bash
# Test API keys in Stripe dashboard
# View webhook deliveries: Developers > Webhooks
# Check event logs for failures
```

## Support

For deployment issues:
- Vercel Support: https://vercel.com/help
- Supabase Docs: https://supabase.com/docs
- Stripe Support: https://support.stripe.com
- Next.js Docs: https://nextjs.org/docs
