# Production Database Migration Checklist

**Project**: cms-arigeo (Payload CMS + Next.js)  
**Date**: 2026-07-17  
**Status**: Ready for implementation

---

## Pre-Migration Setup (Week 1)

### Supabase Account Setup
- [ ] Create Supabase account (if not exists)
- [ ] Create organization "cms-arigeo"
- [ ] Create staging project: `cms-arigeo-staging`
- [ ] Create production project: `cms-arigeo-production`
- [ ] Configure same PostgreSQL version (14+) for both
- [ ] Enable automated backups for both projects
- [ ] Configure connection pooling mode: `Transaction`

### Environment Configuration
- [ ] Copy .env.staging to local development
- [ ] Fill in Supabase staging DATABASE_URL
- [ ] Generate PAYLOAD_SECRET (32+ chars): `openssl rand -base64 32`
- [ ] Get BLOB_READ_WRITE_TOKEN from Vercel (staging)
- [ ] Copy .env.production.template to .env.production (local only, never commit)
- [ ] Add .env.production to .gitignore (if not already)

### Testing Infrastructure
- [ ] npm install script dependencies
- [ ] Make scripts/validate-migration.sh executable
- [ ] Verify psql command available locally

---

## Phase 1: Staging Migration (Week 1-2)

### Local Testing
- [ ] git pull origin main (latest code)
- [ ] npm install
- [ ] npm run lint (verify no errors)
- [ ] npm run build (verify production build)
- [ ] npm run payload generate:types (update types)

### Deploy to Staging
- [ ] Create Vercel staging project (or use branch deployment)
- [ ] Set environment variables in Vercel:
  - [ ] DATABASE_URL (staging Supabase)
  - [ ] PAYLOAD_SECRET
  - [ ] BLOB_READ_WRITE_TOKEN (staging)
- [ ] Deploy to staging: `git push` or `vercel deploy --prod`
- [ ] Monitor deployment logs for schema migration
- [ ] Verify no SQL errors or permission warnings

### Schema Validation
- [ ] Run: `./scripts/validate-migration.sh staging`
- [ ] Verify: All 18 collections present
- [ ] Verify: Localization fields (th_*, en_*) present
- [ ] Check slow query log (Supabase console)
- [ ] Verify backup created automatically

### Content & Data Testing
- [ ] Log into admin UI: https://staging-cms.vercel.app/admin
- [ ] Create test admin user (if not auto-created)
- [ ] Create 1 test product with all fields
- [ ] Create 1 test page with Hero block
- [ ] Upload test image to media collection
- [ ] Verify localization (TH + EN fields)
- [ ] Verify Vercel Blob storage (media storage)

### API Testing
- [ ] Test GraphQL endpoint: `POST /api/graphql`
  - [ ] Introspection query works
  - [ ] Sample product query returns data
- [ ] Test REST API: `GET /api/products?limit=10`
- [ ] Test pagination: `GET /api/products?limit=5&page=2`
- [ ] Test localization: Verify EN fallback works

### Performance Testing
- [ ] Enable slow query logging (Supabase)
- [ ] Run N+1 query checks via GraphQL
- [ ] Benchmark query times (target < 100ms)
- [ ] Test under load (optional, Lighthouse may suffice)
- [ ] Check connection pool utilization

### Access Control Testing
- [ ] Test admin role: full write access
- [ ] Test editor-mkt role: limited site access
- [ ] Test editor-graphic role: media-only access
- [ ] Test viewer role: read-only access
- [ ] Verify site-scoped filtering (arigeo vs captain-maid)

---

## Phase 2: Production Readiness (Week 2-3)

### Production Database Setup
- [ ] Create Supabase production project
- [ ] Verify same PostgreSQL version as staging
- [ ] Enable all required extensions (uuid-ossp, pgvector if used)
- [ ] Configure connection pooling: `Transaction` mode
- [ ] Enable automated backups: daily, 30-day retention
- [ ] Enable point-in-time recovery: 24-hour window
- [ ] Configure SSL certificate (sslmode=require)

### Production Environment Configuration
- [ ] Fill .env.production with production Supabase credentials
- [ ] Generate new PAYLOAD_SECRET for production
- [ ] Get production BLOB_READ_WRITE_TOKEN from Vercel
- [ ] Verify .env.production in .gitignore
- [ ] DO NOT COMMIT .env.production

### Production Code Verification
- [ ] Code review: all migrations in src/payload/collections/
- [ ] Lint: npm run lint (zero errors)
- [ ] Build: npm run build (zero errors)
- [ ] Type check: npm run payload generate:types
- [ ] Create production deployment commit (infrastructure only)

### Pre-Flight Checks
- [ ] Database connection test from local:
  ```bash
  psql $PROD_DATABASE_URL -c "SELECT version();"
  ```
- [ ] Verify Payload can load schema:
  ```bash
  NODE_ENV=production npm start
  # Wait 30 sec, verify "cms-arigeo initialized" in logs
  ```
- [ ] No SQL errors in migration logs
- [ ] No permission or schema errors

---

## Phase 3: Production Deployment (Week 3)

### Pre-Deployment Communication
- [ ] Notify stakeholders of deployment window
- [ ] Schedule deployment during low-traffic time
- [ ] Brief on rollback procedure
- [ ] Prepare incident response plan

### Production Deployment
- [ ] Set Vercel environment variables (production project):
  - [ ] DATABASE_URL (production Supabase)
  - [ ] PAYLOAD_SECRET (production)
  - [ ] BLOB_READ_WRITE_TOKEN (production)
- [ ] Deploy: `git push origin main` → Vercel auto-deploy OR manual `vercel deploy --prod`
- [ ] Monitor Vercel deployment logs (5 min)
- [ ] Verify "cms-arigeo initialized" in logs
- [ ] Check error log: zero SQL errors

### Post-Deployment Validation
- [ ] Run: `./scripts/validate-migration.sh production`
- [ ] Access admin UI: https://cms-arigeo.vercel.app/admin
- [ ] Log in with production admin user
- [ ] Create test data in production (1 product, 1 page)
- [ ] Test GraphQL endpoint (production)
- [ ] Test REST API (production)

### Monitoring (First 24 Hours)
- [ ] Check error rate in Vercel dashboard (target < 0.1%)
- [ ] Monitor database query performance (Supabase console)
- [ ] Check connection pool utilization (target < 80%)
- [ ] Verify backup created
- [ ] Monitor slow query log

### Monitoring (First Week)
- [ ] Daily backup completion check
- [ ] Weekly slow query analysis
- [ ] Performance metric trending
- [ ] User feedback monitoring

---

## Rollback Checklist

**If production deployment fails, use this:**

### Immediate Actions (< 5 min)
- [ ] Stop deployment (Vercel dashboard)
- [ ] Rollback to previous deployment version
- [ ] Monitor error rate drop
- [ ] Notify stakeholders

### Database Rollback (if needed)
- [ ] Supabase console → Settings → Backups
- [ ] Select backup from before deployment
- [ ] Click "Restore" → select timestamp
- [ ] Wait for restore completion (5-15 min)
- [ ] Verify data integrity: `SELECT COUNT(*) FROM products;`
- [ ] Redeploy application

### Post-Rollback
- [ ] Document incident: "Rollback: [reason] at [timestamp]"
- [ ] Create GitHub issue for root cause analysis
- [ ] Fix issue in code
- [ ] Re-test in staging
- [ ] Plan retry deployment

---

## Success Criteria

✅ **Migration is successful when:**

- [ ] All 18 collections present in production
- [ ] Localization fields (th_*, en_*) functional
- [ ] Admin UI accessible and responsive
- [ ] GraphQL API responding (< 100ms)
- [ ] REST API responding (< 100ms)
- [ ] Data persists after page refresh
- [ ] Media storage working (Vercel Blob)
- [ ] Automated backups running
- [ ] Error rate < 0.1%
- [ ] No database connection warnings

✅ **Ready to promote to frontend team when:**

- [ ] All success criteria met
- [ ] Content seeding complete (products, pages, posts)
- [ ] Frontend team confirmed schema contracts
- [ ] Frontend integration tested with GraphQL/REST
- [ ] Performance benchmarks met (Lighthouse 90+)

---

## Quick Commands Reference

```bash
# Validate schema after migration
./scripts/validate-migration.sh staging
./scripts/validate-migration.sh production

# Connect to staging database
psql $(grep DATABASE_URL .env.staging | cut -d= -f2)

# Generate Payload types after schema change
npm run payload generate:types

# Check database tables
psql $DATABASE_URL -c "SELECT tablename FROM pg_tables WHERE schemaname='public';"

# Monitor slow queries (Supabase)
# Dashboard → Database → Query Performance → Slow Queries tab

# Backup database before deployment
# Supabase → Settings → Backups → Create Manual Backup
```

---

## Rollback Command Reference

```bash
# View Supabase backups
# Dashboard → Settings → Backups

# Restore from backup
# Dashboard → Settings → Backups → [Select timestamp] → Restore

# Rollback Vercel deployment
# Dashboard → Deployments → [Select previous] → Redeploy
```

---

## Timeline Estimate

| Phase | Duration | Owner |
|-------|----------|-------|
| Pre-Migration Setup | 1 day | DevOps |
| Staging Migration & Testing | 3-5 days | DevOps + QA |
| Production Readiness Review | 2 days | Tech Lead |
| Production Deployment | 1 day | DevOps |
| Monitoring & Verification | 7 days | DevOps + Ops |
| **Total** | **2 weeks** | — |

---

## Sign-Off

- [ ] DevOps Lead: _________________ Date: _______
- [ ] Tech Lead: _________________ Date: _______
- [ ] QA: _________________ Date: _______

**Status**: Ready for implementation  
**Next Step**: Create Supabase projects and begin Phase 1 testing
