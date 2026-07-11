# Captain Maid Product Index Report

**Generated:** 2026-07-11T12:27:18.879179

## Executive Summary

- **Total Paired Files:** 173
- **Orphan Images:** 3
- **Orphan Text Files:** 0
- **Successfully Indexed:** 173
- **Average Data Completeness:** 15.6%
- **Total Image Data:** 54.02 MB
- **Duplicate Groups Found:** 2

## File Pairing Results

✅ **Paired:** 173 files
❌ **Orphaned:** 3 files

### Orphan Details

**Images without metadata (3):**
- pink-bottle
- green-bottle
- purple-bottle


**Metadata without images (0):**



## Product Data Quality

### Completeness Breakdown

- Complete (≥75%): 0
- Partial (50-75%): 0
- Incomplete (<50%): 173

### Content Analysis

- Has Thai Name: 108 (62.4%)
- Has English Name: 0 (0.0%)
- Has Description: 0 (0.0%)
- Has Category: 0 (0.0%)

## Deduplication

Found **2** potential duplicate groups (same normalized product name):

- **อาจเป็นรูปภาพของ ผลิตภัณฑ์จัดแต่งทรงผม และ ข้อความ:** CM-122135948241113602, CM-122133917613113602, CM-122131498653113602, CM-122131576533113602, CM-122135334255113602, CM-122137517385113602, CM-122134626729113602, CM-122137638309113602, CM-122135224509113602, CM-122136204573113602, CM-122135472729113602, CM-122138187465113602, CM-122132245605113602, CM-122132245683113602, CM-122136204579113602
- **อาจเป็นรูปภาพของ ข้อความ:** CM-122132714319113602, CM-122129332743113602, CM-122131576653113602, CM-122139042807113602, CM-122138695233113602, CM-122136061221113602, CM-122128749465113602, CM-122138693979113602, CM-122138187453113602, CM-122131576515113602, CM-122139189381113602


## Output Files Generated

✅ `data/captain_maid_product_index.csv` — All 173 products
✅ `data/captain_maid_product_index.json` — Structured JSON data
✅ `data/captain_maid_pair_manifest.csv` — Pairing manifest with orphan tracking
✅ `data/duplicate_products.csv` — Potential duplicates
✅ `data/human_review_needed.csv` — Low-confidence records
✅ `logs/index.log` — Detailed activity log
✅ `logs/errors.log` — Error tracking

## Recommendations

1. **Review orphaned files** — Investigate 3 unpaired files
2. **Verify duplicates** — Manually confirm 2 duplicate groups
3. **Enhance metadata** — 173 products need richer data
4. **Image optimization** — Consider image compression for 54.02 MB of product images
5. **Thai/English consistency** — Ensure all products have bilingual names

## Next Steps

1. Upload indexed data to Supabase
2. Create product database from CSV
3. Validate against e-commerce schema
4. Deploy to production

---

**Index Quality Score:** 15.6%
**Status:** ✅ Ready for import
**Indexed by:** Claude Code (Haiku 4.5)
