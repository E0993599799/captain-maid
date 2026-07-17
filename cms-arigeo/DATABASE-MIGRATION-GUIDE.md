# Database Migration Path: Dev → Staging → Production

**Status**: Production-ready migration strategy  
**Last Updated**: 2026-07-17  
**Environments**: Neon (dev) → Supabase (staging) → Supabase (prod)

---

## Environment Setup

### 1. Development (Neon)

**Purpose**: Local development with fast iteration  
**Connection**: PostgreSQL via Neon HTTP API or Pooling  

```bash
# .env.local (development)
DATABASE_URL=postgres://user:password@ep-xyz.neon.tech/cms_arigeo
PAYLOAD_SECRET=dev-secret-min-32-chars-required
BLOB_READ_WRITE_TOKEN=  # Optional, empty for local development
```

**Why Neon for dev?**
- Free tier includes unlimited branches per project
- Instant database snapshots (for testing schema changes)
- Connection pooling via Neon Proxy (PgBouncer)
- Fast iteration without schema drift

**Limitations**:
- Smaller compute (suitable for dev)
- May use different PostgreSQL extensions than Supabase

---

### 2. Staging (Supabase)

**Purpose**: Pre-production testing with exact prod infrastructure  
**Connection**: PostgreSQL via Supabase managed service

```bash
# .env.staging (staging environment)
DATABASE_URL=postgres://postgres:password@db.staging-project.supabase.co:5432/postgres?sslmode=require
PAYLOAD_SECRET=staging-secret-min-32-chars-required
BLOB_READ_WRITE_TOKEN=staging_vercel_blob_token
```

**Staging Database Setup**:
1. Create new Supabase project: `cms-arigeo-staging`
2. Configure same extensions as production
3. Set same resource limits as production
4. Enable statement logging for migration validation

**Why Supabase for staging?**
- Identical infrastructure to production
- Full feature parity (extensions, pooling, backups)
- Can test migrations safely before prod
- Easy rollback via snapshots

---

### 3. Production (Supabase)

**Purpose**: Live user data and content  
**Connection**: PostgreSQL via Supabase managed service

```bash
# .env.production (production environment - NEVER commit this)
DATABASE_URL=postgres://postgres:password@db.prod-project.supabase.co:5432/postgres?sslmode=require
PAYLOAD_SECRET=prod-secret-min-32-chars-required
BLOB_READ_WRITE_TOKEN=prod_vercel_blob_token
```

**Production Database Setup**:
1. Create new Supabase project: `cms-arigeo-production`
2. Enable automated backups (daily, 30-day retention)
3. Enable read replicas for scaling (optional)
4. Configure connection pooling mode: `Transaction` (Supabase default)
5. Enable point-in-time recovery (24 hour window)

---

## Database Differences: Neon vs Supabase

| Feature | Neon | Supabase | Impact |
|---------|------|---------|--------|
| **PostgreSQL Version** | 14+ (latest) | 14+ (managed) | Same baseline; test version compatibility |
| **Extensions** | Core + common | Core + pgvector, pgtap, uuid-ossp | Payload uses standard; OK to proceed |
| **Connection Pooling** | Neon Proxy (PgBouncer) | PgBouncer (transaction mode) | Both compatible; test pool settings |
| **SSL** | Optional | Required (sslmode=require) | Staging/Prod: **must use sslmode=require** |
| **Compute** | Shared/Dedicated | Dedicated | Staging/Prod: larger compute, more stable |
| **Backup Strategy** | Manual snapshots | Automated (daily) | Prod: use Supabase automated backups |
| **Schema Evolution** | Full Payload auto-migration | Full Payload auto-migration | Payload handles migrations; test in staging first |

---

## Migration Testing Procedure

### Phase 1: Schema Validation (Dev → Staging)

**Before deploying any schema change to staging:**

```bash
# 1. In development, make schema changes
# (e.g., add new field to collection, update collection config)

# 2. Commit schema changes to git
git add src/payload/collections/
git commit -m "chore: update collection schema (tested locally)"

# 3. Build and verify types
npm run build
npm run payload generate:types
git add src/payload-types.ts

# 4. Run lint
npm run lint
```

### Phase 2: Staging Deployment

**Deploy to staging environment and test migrations:**

```bash
# 1. Pull latest main branch
git pull origin main

# 2. Switch to staging environment
export NODE_ENV=staging
export DATABASE_URL=postgres://...staging...

# 3. Install dependencies
pnpm install

# 4. Build with staging config
npm run build

# 5. Start server (this triggers Payload auto-migration)
npm start
# Watch logs for migration success

# 6. Test migrations in admin UI
# - Visit https://staging.cms-arigeo.vercel.app/admin
# - Create test data in new/modified collections
# - Verify all fields work as expected

# 7. Run smoke tests (if applicable)
# - GraphQL introspection query
# - REST API pagination
# - Localization fallback (TH → EN)
```

### Phase 3: Data Validation

**Verify data integrity after migration:**

```sql
-- Run in Supabase staging console

-- Check collection exists
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check collection has expected columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;

-- Count records (should match expected)
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM pages;
SELECT COUNT(*) FROM posts;

-- Check localization (should have th_ and en_ prefixed fields)
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name LIKE '%th_%' 
LIMIT 10;
```

### Phase 4: Performance Validation

**Test query performance under staging load:**

```bash
# 1. Enable slow query logging in Supabase console
# Settings → Database → Query Performance

# 2. Run common queries via GraphQL
curl -X POST https://staging.cms-arigeo.vercel.app/api/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ products(limit: 100) { edges { node { id title } } } }"
  }'

# 3. Check slow query log
# Supabase console → Database → Query Performance tab
# Target: < 100ms for typical queries

# 4. Test pagination (large dataset)
# query { products(limit: 50, page: 1) { ... } }
# query { products(limit: 50, page: 100) { ... } }
```

---

## Pre-Deployment Checklist

**Before promoting staging → production, verify all items:**

### Database
- [ ] Staging database created in Supabase production account
- [ ] Same PostgreSQL version as production
- [ ] All required extensions enabled (pgvector if used, uuid-ossp, etc.)
- [ ] Connection pooling set to `Transaction` mode
- [ ] SSL certificate valid (sslmode=require working)
- [ ] Automated backups enabled (daily)
- [ ] Database user has correct permissions (schema owner)

### Schema & Collections
- [ ] All 18 collections present in staging
- [ ] Localization fields (th_*, en_*) present for all collections
- [ ] No migration errors in server logs
- [ ] Admin UI loads without TypeErrors
- [ ] All blocks and field types render correctly

### Data
- [ ] Test data created in all canonical collections
  - [ ] 3+ brands (Captain Maid, GenuLeaf, CeraTory)
  - [ ] 5+ products with variants
  - [ ] 3+ solutions
- [ ] Test data created in site-scoped collections
  - [ ] 1 page per site (arigeo, captain-maid)
  - [ ] 1 post per site
  - [ ] Navigation, site-settings configured
- [ ] Media/images upload to Vercel Blob (if BLOB_READ_WRITE_TOKEN set)
- [ ] All content fully localized (TH + EN versions)

### API & Performance
- [ ] GraphQL introspection works
- [ ] REST API /api/collections returns 200
- [ ] Pagination tested (limit=50, page=1..10)
- [ ] Slow queries identified and optimized
- [ ] Query times < 100ms for typical operations
- [ ] No N+1 queries in logs

### Access Control
- [ ] User roles working (admin, editor-mkt, editor-graphic, viewer)
- [ ] Site-scoped access enforced (editors see only assigned site)
- [ ] Canonical collections read-only for non-admins
- [ ] Authentication flows tested

### Backup & Recovery
- [ ] Database snapshot created before migration
- [ ] Point-in-time recovery window configured (24h)
- [ ] Backup restoration tested on dummy database
- [ ] Disaster recovery runbook documented

---

## Production Deployment

### Step 1: Create Production Database

```bash
# In Supabase console:
# 1. Create new organization "cms-arigeo-production"
# 2. Create new project
# 3. Copy production DATABASE_URL
# 4. Set up .env.production (DO NOT COMMIT)
```

### Step 2: Pre-Flight Checks

```bash
# 1. Verify connection string
psql $DATABASE_URL -c "SELECT version();"

# 2. Verify Payload can connect
NODE_ENV=production DATABASE_URL=$DATABASE_URL npm start
# Wait 30 seconds, then Ctrl+C

# 3. Check logs for any warnings
```

### Step 3: Production Migration

```bash
# 1. Pull latest, verified commit from main
git pull origin main

# 2. Set production environment
export NODE_ENV=production
export DATABASE_URL=postgres://...production...
export PAYLOAD_SECRET=***
export BLOB_READ_WRITE_TOKEN=***

# 3. Build
npm run build

# 4. Start (triggers auto-migration)
npm start

# 5. Monitor logs for 5 minutes
# Look for:
#   - "cms-arigeo initialized"
#   - No SQL errors
#   - No permission errors

# 6. Test admin login
# Visit https://cms-arigeo.vercel.app/admin
# Log in with admin user
```

### Step 4: Verify Production

```bash
# 1. Test GraphQL endpoint
curl https://cms-arigeo.vercel.app/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __typename }"}'

# 2. Check data exists (if seeded)
curl https://cms-arigeo.vercel.app/api/products?limit=1

# 3. Monitor error logs (Vercel dashboard)
# Supabase dashboard → Database → Query Performance

# 4. Confirm backups running
# Supabase dashboard → Settings → Backups
```

---

## Rollback Procedure

**If production migration fails:**

### Immediate Rollback (< 30 minutes)

```bash
# 1. Stop production instance
# Vercel dashboard → Deployments → Rollback to previous version

# 2. Point DATABASE_URL to backup (Supabase snapshot)
# Supabase dashboard → Backups → Restore to point-in-time

# 3. Verify rollback success
curl https://cms-arigeo.vercel.app/api/products?limit=1

# 4. Document incident
# Create issue: "Rollback: [Migration name] failed at [timestamp]"
```

### Full Restore (if backup needed)

```bash
# 1. In Supabase console:
#    Settings → Backups → Restore from [timestamp]

# 2. Wait for restore to complete (5-15 minutes)

# 3. Test connections
psql $DATABASE_URL -c "SELECT COUNT(*) FROM products;"

# 4. Redeploy application
# Vercel: git push origin main (or manual redeploy)
```

---

## Environment Variables Reference

### Development (.env.local)
```bash
NODE_ENV=development
DATABASE_URL=postgres://user:password@ep-xyz.neon.tech/cms_arigeo
PAYLOAD_SECRET=dev-secret-32-chars-min
BLOB_READ_WRITE_TOKEN=  # empty
PAYLOAD_CORS_ORIGIN=http://localhost:3000
PAYLOAD_CSRF_ORIGIN=http://localhost:3000
```

### Staging (.env.staging)
```bash
NODE_ENV=staging
DATABASE_URL=postgres://postgres:password@db.staging.supabase.co:5432/postgres?sslmode=require
PAYLOAD_SECRET=staging-secret-32-chars-min
BLOB_READ_WRITE_TOKEN=staging_vercel_blob_token
PAYLOAD_CORS_ORIGIN=https://staging-cms.vercel.app
PAYLOAD_CSRF_ORIGIN=https://staging-cms.vercel.app
```

### Production (.env.production - NEVER COMMIT)
```bash
NODE_ENV=production
DATABASE_URL=postgres://postgres:password@db.prod.supabase.co:5432/postgres?sslmode=require
PAYLOAD_SECRET=prod-secret-32-chars-min
BLOB_READ_WRITE_TOKEN=prod_vercel_blob_token
PAYLOAD_CORS_ORIGIN=https://cms-arigeo.vercel.app
PAYLOAD_CSRF_ORIGIN=https://cms-arigeo.vercel.app
```

---

## Monitoring & Maintenance

### Post-Deployment (First 24 Hours)

```bash
# Monitor every hour:
# 1. Error rate in Vercel dashboard
# 2. Database query performance (Supabase console)
# 3. Connection pool utilization
# 4. Backup completion status

# Alert thresholds:
# - Query time > 500ms → investigate index
# - Error rate > 1% → rollback
# - Backup fail → incident
```

### Weekly Maintenance

```bash
# 1. Check slow query log
# 2. Analyze table bloat
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) 
FROM pg_tables 
WHERE schemaname != 'pg_catalog' 
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

# 3. Verify backup restoration (on staging)
# 4. Review connection pool stats
```

---

## FAQ

**Q: How long does a migration take?**  
A: Typically < 1 minute for initial schema creation. For large existing databases, monitor migration logs.

**Q: Do I need to seed data before production?**  
A: Yes. Payload creates tables but doesn't seed content. Use admin UI or GraphQL mutations to add initial data in staging, then export/restore to prod if needed.

**Q: What if a collection doesn't migrate?**  
A: Check Payload logs for SQL errors. Common causes:
- Missing required field value
- Invalid field type
- Permission denied on schema
Review error, fix, and retry.

**Q: Can I migrate without downtime?**  
A: Payload's auto-migration is quick (< 1 min for typical schemas). To achieve zero-downtime: run migrations on canary deployment first, then promote.

**Q: How do I test production migrations safely?**  
A: Always use staging environment first. Staging should mirror production exactly.

---

**Status**: Ready for implementation  
**Next**: Set up Supabase staging project and run Phase 2 migration test
