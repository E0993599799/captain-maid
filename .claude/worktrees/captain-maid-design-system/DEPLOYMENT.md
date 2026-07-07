# Captain Maid 2.0 - Deployment Guide

## 🚀 Vercel Deployment

### Step 1: Connect GitHub Repository

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select `E0993599799/captain-maid`
4. Configure project settings (Next.js auto-detected)

### Step 2: Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY = your_service_role_key
```

### Step 3: Deploy

Click "Deploy" button. Vercel will:
1. Install dependencies
2. Build the application
3. Run tests
4. Deploy to live URL

### Step 4: Domain Configuration

1. In Vercel Dashboard → Project Settings → Domains
2. Add custom domain: `captain-maid.com`
3. Configure DNS records:
   - Type: CNAME
   - Name: @
   - Value: cname.vercel.sh
   - OR use Nameservers provided by Vercel

4. Enable SSL certificate (automatic)

### Step 5: Auto-Deploy Setup

When you push to main branch, Vercel automatically:
1. Detects changes
2. Builds new version
3. Runs tests
4. Deploys to production (if tests pass)

## 📋 Supabase Setup

### 1. Create Tables

```sql
-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contacts table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(255),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Enable RLS (Row Level Security)

```sql
-- Allow public read for products and blog posts
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON blog_posts FOR SELECT USING (true);

-- Allow authenticated for contacts
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow insert contacts" ON contacts FOR INSERT WITH CHECK (true);
```

### 3. Get API Keys

In Supabase Dashboard:
- Project Settings → API Keys
- Copy `URL` → NEXT_PUBLIC_SUPABASE_URL
- Copy `anon public` → NEXT_PUBLIC_SUPABASE_ANON_KEY
- Copy `service_role secret` → SUPABASE_SERVICE_ROLE_KEY

## ✅ Pre-Deployment Checklist

- [ ] All pages tested locally: `npm run dev`
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors: `npm run type-check`
- [ ] Environment variables configured
- [ ] Supabase tables created
- [ ] GitHub repo connected to Vercel
- [ ] Custom domain DNS configured
- [ ] SSL certificate enabled
- [ ] Analytics configured (optional)
- [ ] Domain nameservers updated (if using Vercel DNS)

## 🔍 Testing Deployed Site

After deployment, verify:

1. **Home Page**: https://captain-maid.com
   - Hero section loads with animations
   - Products display correctly
   - Navigation works

2. **Locale Routes**: 
   - https://captain-maid.com/th/blog
   - https://captain-maid.com/en/products
   - Correct language displays

3. **Root Redirects**:
   - /blog → /th/blog ✓
   - /products → /th/products ✓
   - /about → /th/about ✓
   - /contact → /th/contact ✓

4. **SEO**:
   - robots.txt accessible
   - sitemap.xml generates correctly
   - Meta tags present

5. **Forms**:
   - Contact form submits
   - Validation works
   - Success message displays

## 📊 Monitoring

### Vercel Analytics
1. Dashboard → Analytics
2. Monitor:
   - Page load times
   - Core Web Vitals
   - Error rates
   - Deployments

### Logs
1. Dashboard → Functions
2. View API logs
3. Debug contact form submissions

## 🔧 Troubleshooting

### Build fails
- Check environment variables in Vercel
- Verify Node.js version matches locally
- Check for TypeScript errors: `npm run type-check`

### Pages not found (404)
- Verify files exist in correct structure
- Check middleware.ts for routing issues
- Clear Vercel cache → Redeploy

### Styling looks wrong
- Clear browser cache
- Check CSS in `.next/static`
- Verify Tailwind config loads

### Contact form not working
- Check `/api/contact` route exists
- Verify Supabase connection
- Check browser console for errors

## 📞 Support

For issues:
1. Check Vercel Dashboard for deployment logs
2. Review error messages in Functions tab
3. Check Supabase Dashboard for DB issues
4. Inspect browser DevTools console

## 🎯 Next Phase Improvements

After successful deployment:

1. **Migrate Content**
   - Extract products from captain-maid.com
   - Import to Supabase
   - Update images

2. **Add Features**
   - Shopping cart
   - Checkout flow
   - Email notifications
   - Product reviews

3. **Optimization**
   - Image optimization with next/image
   - Cache strategy
   - CDN configuration
   - Analytics integration

4. **Marketing**
   - Newsletter signup
   - Social media integration
   - Email campaigns
   - SEO improvements
