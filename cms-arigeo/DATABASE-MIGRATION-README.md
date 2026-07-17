# Production Database Migration Setup

**Project**: cms-arigeo (Payload CMS + Next.js)  
**Status**: ✅ Ready for Implementation  
**Created**: 2026-07-17

---

## What's Been Set Up

This package contains a complete production database migration path from development (Neon) through staging (Supabase) to production (Supabase).

### Files Created

| File | Purpose |
|------|---------|
| **DATABASE-MIGRATION-GUIDE.md** | Complete technical guide (30+ KB) |
| **DATABASE-MIGRATION-CHECKLIST.md** | Phase-by-phase implementation checklist |
| **DATABASE-MIGRATION-TROUBLESHOOTING.md** | Common issues and solutions |
| **.env.staging** | Staging environment template (ready to fill) |
| **.env.production.template** | Production env template (reference only) |
| **scripts/validate-migration.sh** | Automated schema validation script |

---

## Quick Start

### 1. Setup Supabase Projects (30 min)

```bash
# Create 2 new Supabase projects:
# - cms-arigeo-staging (test migrations safely)
# - cms-arigeo-production (live database)

# Copy connection strings from Supabase console:
# Settings → Database → Connection String (URI)
```

### 2. Configure Staging Environment (5 min)

```bash
# Edit .env.staging with Supabase credentials:
nano .env.staging
# Fill in:
#   DATABASE_URL=postgres://...staging...
#   PAYLOAD_SECRET=generated-32-char-secret
#   BLOB_READ_WRITE_TOKEN=staging-token
```

### 3. Test Staging Migration (30 min)

```bash
# Deploy to staging Vercel project
git push origin main

# Or test locally
npm install
npm run build
NODE_ENV=staging npm start

# Validate schema
./scripts/validate-migration.sh staging

# Seed test content via admin UI
# Visit http://localhost:3000/admin or staging URL
```

### 4. Production Deployment (1-2 hours)

```bash
# Only after staging tests pass:
# 1. Create production Supabase project
# 2. Fill .env.production (local only, never commit)
# 3. Set environment variables in Vercel
# 4. Deploy: git push origin main
# 5. Validate: ./scripts/validate-migration.sh production
```

---

## Environment Matrix

| Environment | Database | Payload Secret | Blob Token | Use Case |
|-------------|----------|---|---|---|
| **Local Dev** | Neon (free) | dev-only | — | Development |
| **Staging** | Supabase | unique | staging | Test migrations |
| **Production** | Supabase | unique | prod | Live data |

**Key Rule**: Never commit actual secrets to git. Use Vercel environment variables for staging/prod.

---

## Database Differences

### Neon (Development)
✅ Fast iteration, free tier  
✅ Instant snapshots  
⚠️ Smaller compute  
⚠️ Different extensions than Supabase

### Supabase (Staging & Production)
✅ Production-identical infrastructure  
✅ Automated backups  
✅ Point-in-time recovery  
✅ Dedicated compute  
✓ Must test migrations in staging first

---

## Validation Steps

After each deployment, run the validation script:

```bash
# Test schema after migration
./scripts/validate-migration.sh staging
./scripts/validate-migration.sh production

# Script checks:
# ✓ Database connection
# ✓ All 18 collections present
# ✓ Localization fields (th_*, en_*) exist
# ✓ Data records count
# ✓ API connectivity
```

---

## Pre-Deployment Checklist

**Never deploy to production without:**

- [ ] Staging database created and tested
- [ ] Schema migration validated: `./scripts/validate-migration.sh staging`
- [ ] Test data seeded: 3+ products, 3+ pages
- [ ] Localization tested: both TH and EN content works
- [ ] GraphQL API tested: queries < 100ms
- [ ] Admin UI tested: can create/edit content
- [ ] Backups working: Supabase showing automated backups

---

## Troubleshooting

**Connection failed?**  
→ See DATABASE-MIGRATION-TROUBLESHOOTING.md § Connection Issues

**Schema not migrating?**  
→ See DATABASE-MIGRATION-TROUBLESHOOTING.md § Schema Migration Issues

**Queries too slow?**  
→ See DATABASE-MIGRATION-TROUBLESHOOTING.md § Performance Issues

**Need to rollback?**  
→ See DATABASE-MIGRATION-GUIDE.md § Rollback Procedure

---

## Next Steps

1. **Read**: DATABASE-MIGRATION-GUIDE.md (full technical reference)
2. **Check**: DATABASE-MIGRATION-CHECKLIST.md (phase-by-phase plan)
3. **Create**: Supabase staging project
4. **Test**: Run ./scripts/validate-migration.sh staging
5. **Seed**: Add test content via admin UI
6. **Validate**: Verify all checklist items
7. **Deploy**: Follow DATABASE-MIGRATION-GUIDE.md § Production Deployment

---

## Timeline

| Phase | Duration | Gate |
|-------|----------|------|
| Setup Supabase | 1 day | Project creation |
| Staging migration | 3-5 days | Validation passing |
| Production readiness | 2 days | Review complete |
| Production deploy | 1 day | All checks passing |
| Monitoring | 7 days | Error rate < 0.1% |
| **Total** | **2 weeks** | |

---

## Key Files Reference

### Complete Guides
- **DATABASE-MIGRATION-GUIDE.md** — 2000+ lines of detailed procedures
- **DATABASE-MIGRATION-TROUBLESHOOTING.md** — 400+ lines of solutions

### Checklists & Tools
- **DATABASE-MIGRATION-CHECKLIST.md** — Phase-by-phase sign-off sheet
- **scripts/validate-migration.sh** — Automated validation (executable)

### Configuration Templates
- **.env.staging** — Fill with staging Supabase credentials
- **.env.production.template** — Reference for production setup
- **.env.example** — Original example (do not modify)

---

## Success Criteria

✅ **Migration is successful when:**
- All 18 collections present in database
- Localization fields functional
- Admin UI responding
- API queries < 100ms
- Automated backups running
- Error rate < 0.1%
- Content seeding possible

✅ **Ready for frontend team when:**
- All success criteria met
- Schema contracts frozen
- Frontend integration tested
- Performance benchmarks met

---

## Support & References

**Documentation**:
- [Payload CMS Database Docs](https://payloadcms.com/docs/database)
- [Supabase PostgreSQL Guide](https://supabase.com/docs/guides/database)
- [PostgreSQL Official Docs](https://www.postgresql.org/docs/)

**Tools**:
- Supabase Console: https://supabase.com/dashboard
- Vercel Dashboard: https://vercel.com/dashboard
- Neon Console: https://console.neon.tech

**Getting Help**:
1. Check DATABASE-MIGRATION-TROUBLESHOOTING.md first
2. Review DATABASE-MIGRATION-GUIDE.md for context
3. Contact team lead or DevOps for escalation

---

## Version & Status

| Item | Value |
|------|-------|
| **Setup Date** | 2026-07-17 |
| **Status** | Ready for implementation |
| **Payload CMS Version** | 3.75.0 |
| **Next.js Version** | 16.2.6 |
| **Collections** | 18 total |
| **Test Collections** | All functional |

---

**This setup is production-ready. Begin Phase 1 (Supabase Setup) to proceed.**

For detailed implementation instructions, see: **DATABASE-MIGRATION-GUIDE.md**  
For step-by-step checklist, see: **DATABASE-MIGRATION-CHECKLIST.md**  
For troubleshooting, see: **DATABASE-MIGRATION-TROUBLESHOOTING.md**
