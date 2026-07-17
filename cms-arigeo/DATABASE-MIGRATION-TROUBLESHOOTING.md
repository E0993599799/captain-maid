# Database Migration Troubleshooting Guide

**Purpose**: Common issues and solutions for cms-arigeo database migrations  
**Last Updated**: 2026-07-17

---

## Connection Issues

### Issue: `ECONNREFUSED: Connection refused`

**Symptom**: 
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Causes**:
1. Database server not running
2. Wrong host/port in DATABASE_URL
3. Network connectivity issue
4. Firewall blocking connection

**Solutions**:

```bash
# 1. Verify DATABASE_URL format
echo $DATABASE_URL
# Should be: postgres://user:pass@host:5432/database?sslmode=require

# 2. Test connection manually
psql $DATABASE_URL -c "SELECT 1;"

# 3. If using Supabase, verify SSL mode
# Add ?sslmode=require to URL if missing

# 4. For Neon (dev), ensure Neon proxy is running
# Check: https://console.neon.tech/app/projects

# 5. For local Postgres, start service
# macOS: brew services start postgresql
# Linux: sudo systemctl start postgresql
# Windows (WSL2): sudo service postgresql start
```

---

### Issue: `FATAL: password authentication failed`

**Symptom**:
```
FATAL: password authentication failed for user "postgres"
```

**Causes**:
1. Wrong password in DATABASE_URL
2. Credentials changed in Supabase/Neon
3. User doesn't exist

**Solutions**:

```bash
# 1. Verify credentials in Supabase/Neon console
# Supabase: Settings → Database → Connection String
# Neon: Dashboard → Connection String

# 2. Test with psql using same credentials
psql -h db.neon.tech -U postgres -c "SELECT 1;"

# 3. If password has special characters, URL-encode it
# Example: pass@word → pass%40word
# Use: https://www.urlencoder.org/ or
python3 -c "import urllib.parse; print(urllib.parse.quote('pass@word'))"

# 4. Reset password in Supabase/Neon
# Supabase: Settings → Database → Reset Password
```

---

## Schema Migration Issues

### Issue: `Error: Table "products" does not exist`

**Symptom**:
```
Error: relation "products" does not exist
```

**Causes**:
1. Migration hasn't run yet
2. Migration failed silently
3. Schema in wrong database

**Solutions**:

```bash
# 1. Check if migration ran
psql $DATABASE_URL -c "SELECT tablename FROM pg_tables WHERE schemaname='public';"

# 2. If no tables, trigger migration
npm start
# Wait for "cms-arigeo initialized" message
# Ctrl+C after 30 seconds

# 3. Verify Payload can connect
NODE_ENV=staging npm start
# Check logs for errors

# 4. Check Payload logs for SQL errors
grep -i "error\|fail" ~/.payload.log | tail -20

# 5. Manually create test table
psql $DATABASE_URL -c "CREATE TABLE test (id SERIAL PRIMARY KEY, name VARCHAR(255));"
psql $DATABASE_URL -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_name='test';"
# If this works, database is fine; Payload migration issue
```

---

### Issue: `Error: column "th_title" does not exist`

**Symptom**:
```
Error: column "th_title" does not exist at character 23
```

**Causes**:
1. Localization fields not created by Payload
2. Field name mismatch (Payload generates th_*, en_* naming)
3. Payload version mismatch with DB schema

**Solutions**:

```bash
# 1. Check if localization fields exist
psql $DATABASE_URL -c "SELECT column_name FROM information_schema.columns WHERE table_name='products' ORDER BY ordinal_position;" | grep -E "th_|en_"

# 2. If missing, regenerate Payload schema
npm run payload generate:types

# 3. Stop server and restart with fresh migration
npm start
# Monitor for "migrating" messages

# 4. Check Payload config has localization
grep -A 5 "localization" payload.config.ts
# Should have: { code: 'th', label: 'ไทย' }, { code: 'en', label: 'English' }

# 5. If still failing, drop schema and retry (staging only!)
# WARNING: This deletes all data
psql $DATABASE_URL -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
npm start
```

---

## Performance Issues

### Issue: `Query time > 1000ms` (slow queries)

**Symptom**:
```
Slow query log shows GraphQL queries taking > 1s
```

**Solutions**:

```bash
# 1. Check slow query log (Supabase)
# Console → Database → Query Performance → Slow Queries

# 2. Add index to frequently queried fields
psql $DATABASE_URL << EOF
CREATE INDEX IF NOT EXISTS idx_products_site ON products(site);
CREATE INDEX IF NOT EXISTS idx_pages_published ON pages(published);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(product_category_id);
EOF

# 3. Check query plan
psql $DATABASE_URL -c "EXPLAIN ANALYZE SELECT * FROM products WHERE site = 'captain-maid' LIMIT 10;"

# 4. For N+1 queries in GraphQL, verify Payload config has relationships optimized
grep -i "relation\|relationship" src/payload/collections/*.ts

# 5. Enable query result caching (if using Redis)
# Add to payload.config.ts: cache: { enabled: true }
```

---

### Issue: `Connection pool exhausted`

**Symptom**:
```
Error: Client request queue is full, connection pool has been exhausted
```

**Causes**:
1. Too many concurrent connections
2. Connections not closing properly
3. Connection pool size too small

**Solutions**:

```bash
# 1. Check connection pool settings in Supabase
# Supabase → Settings → Database → Connection Pooling
# Verify mode = "Transaction" (for serverless)

# 2. Check active connections
psql $DATABASE_URL -c "SELECT count(*) FROM pg_stat_activity;"

# 3. Kill idle connections (if needed, be careful!)
psql $DATABASE_URL -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state='idle' AND pid <> pg_backend_pid();"

# 4. Increase pool size (Supabase settings)
# Settings → Database → Connection Pooling → Max Pool Size
# Staging: 15-25, Production: 25-50

# 5. Check Vercel Concurrency setting
# Vercel Dashboard → Project → Settings → Functions
# Verify max concurrency appropriate for your pool size
```

---

## Data Integrity Issues

### Issue: `Missing data after migration`

**Symptom**:
```
Data exists in staging but not visible in production
Or: Data count mismatch between databases
```

**Solutions**:

```bash
# 1. Compare record counts
echo "Staging:"
psql $STAGING_DATABASE_URL -t -c "SELECT 'products:' || COUNT(*) FROM products UNION ALL SELECT 'pages:' || COUNT(*) FROM pages;"

echo "Production:"
psql $PROD_DATABASE_URL -t -c "SELECT 'products:' || COUNT(*) FROM products UNION ALL SELECT 'pages:' || COUNT(*) FROM pages;"

# 2. Check for data in correct site
psql $DATABASE_URL -c "SELECT site, COUNT(*) FROM pages GROUP BY site;"

# 3. Verify no unique constraint violations
psql $DATABASE_URL -c "SELECT * FROM users WHERE email IS NOT NULL GROUP BY email HAVING COUNT(*) > 1;"

# 4. Check for orphaned records (foreign key issues)
psql $DATABASE_URL << EOF
SELECT * FROM products WHERE product_category_id NOT IN (
  SELECT id FROM product_categories
);
EOF

# 5. Restore from backup if data corrupted
# Supabase → Settings → Backups → [Select timestamp] → Restore
```

---

## Deployment Issues

### Issue: `Payload fails to initialize after deploy`

**Symptom**:
```
Deployment succeeds but app returns 500 errors
Logs show: "Error: cms-arigeo failed to initialize"
```

**Causes**:
1. Environment variables not set in Vercel
2. Database not accessible from Vercel
3. Schema mismatch between Vercel and database

**Solutions**:

```bash
# 1. Verify Vercel environment variables
# Vercel Dashboard → Project → Settings → Environment Variables
# Check: DATABASE_URL, PAYLOAD_SECRET, BLOB_READ_WRITE_TOKEN

# 2. Test database connection from Vercel environment
# Create a test deployment with this function:
# pages/api/db-test.ts
export default async function handler(req, res) {
  try {
    const result = await fetch(`${process.env.DATABASE_URL}` === 'undefined' ? 'MISSING' : 'OK');
    res.status(200).json({ db: process.env.DATABASE_URL ? 'OK' : 'MISSING' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

# 3. Check Vercel function logs
# Vercel Dashboard → Project → Deployments → [Select] → Function Logs

# 4. Verify DATABASE_URL not truncated in Vercel UI
# Copy the full URL from Supabase and paste carefully

# 5. If using connection pooling, ensure Supabase pooler is running
# Supabase → Settings → Database → Connection Pooling → Status
```

---

### Issue: `Payload types not generated in build`

**Symptom**:
```
Build fails with: "payload-types.ts not found"
Type errors: "Cannot find module '@payload-types'"
```

**Solutions**:

```bash
# 1. Generate types locally
npm run payload generate:types

# 2. Commit generated types
git add src/payload-types.ts
git commit -m "chore: regenerate Payload types"

# 3. Verify build script in package.json
grep '"build"' package.json
# Should include: npm run payload generate:types (or should run before build)

# 4. Update package.json if needed
# "build": "npm run payload generate:types && next build"

# 5. Test build locally
npm run build
# Should complete without errors
```

---

## Localization Issues

### Issue: `English content missing (fallback not working)`

**Symptom**:
```
Page shows TH text but EN fields appear blank
GraphQL query for EN locale returns null
```

**Solutions**:

```bash
# 1. Verify fallback enabled in payload.config.ts
grep -A 5 "localization" payload.config.ts
# Should have: fallback: true

# 2. Check if EN content actually exists
psql $DATABASE_URL -c "SELECT id, en_title, th_title FROM products LIMIT 5;"

# 3. Seed English content
# Use admin UI: Click product → Switch to "English" locale → Edit
# Or use GraphQL mutation with locale: "en"

# 4. Verify locale codes match config
# Config: { code: 'th', label: 'ไทย' }, { code: 'en', label: 'English' }
# Check database column names: th_title, en_title (must be lowercase)

# 5. Check GraphQL query for locale parameter
# Should include: locale: "en"
```

---

## Backup & Recovery Issues

### Issue: `Backup not being created`

**Symptom**:
```
Supabase → Settings → Backups shows no recent backups
```

**Solutions**:

```bash
# 1. Check backup settings
# Supabase → Settings → Backups → Automated Backups
# Verify: Enabled, Frequency = Daily

# 2. Manual backup for immediate backup
# Supabase → Settings → Backups → Create Manual Backup
# Wait for completion (5-10 minutes)

# 3. Verify backup storage quota
# Supabase → Settings → Storage → Backups
# Check usage vs. limit

# 4. Check backup notifications
# Supabase → Settings → Notifications
# Verify email address for backup alerts
```

---

### Issue: `Cannot restore from backup`

**Symptom**:
```
Restore button disabled or fails with: "Invalid backup"
```

**Solutions**:

```bash
# 1. Verify backup is available
# Supabase → Settings → Backups → Automated Backups
# Should see green checkmark for recent backup

# 2. Restore to point-in-time instead
# Supabase → Settings → Backups → PITR (Point In Time Recovery)
# Select timestamp, click Restore

# 3. If PITR unavailable, create new database
# Supabase → New Project
# Manually restore data via GraphQL export

# 4. For critical recovery, contact Supabase support
# Dashboard → Help → Contact Support
```

---

## Getting Help

**When reporting issues, include:**

1. Error message (full text, not truncated)
2. Environment: dev/staging/production
3. Steps to reproduce
4. Database connection type: Neon/Supabase/other
5. Payload CMS version: `npm list payload`
6. PostgreSQL version: `psql $DATABASE_URL -t -c "SELECT version();"`

**Resources**:
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Neon Docs](https://neon.tech/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

**Status**: Troubleshooting guide complete  
**Last Update**: 2026-07-17
