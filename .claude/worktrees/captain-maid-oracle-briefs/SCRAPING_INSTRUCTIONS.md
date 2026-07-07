# CAPTAIN MAID PRODUCT SCRAPING - INSTRUCTIONS

## 📋 TASK OVERVIEW

This is a product data indexing and image scraping task for **Captain Maid** brand.

**Assigned To:** Gemini AI or Web Scraping Agent  
**Deadline:** 2026-07-08  
**Status:** Ready for execution  

---

## 🚀 HOW TO EXECUTE

### Option 1: Using Gemini API
```
Use the PRODUCT_SCRAPING_SPEC.md as system prompt
Feed sources: 
- https://captain-maid.com/
- https://www.homepro.co.th/search?q=captain+maid

Expected output folder: captain-maid-product-index/
```

### Option 2: Using Selenium / Scrapy
```bash
# Install dependencies
pip install selenium scrapy requests pillow

# Run scraper
python scraper_captain_maid.py \
  --official-url "https://captain-maid.com/" \
  --retailer-url "https://www.homepro.co.th/search?q=captain+maid" \
  --output-dir "./captain-maid-product-index/"
```

### Option 3: Manual + Agent-Assisted
```
1. Visit https://captain-maid.com/ and extract products manually
2. Visit HomePro and search "captain maid"
3. Use Agent to:
   - Download images
   - Create CSV/JSON
   - Generate comparison report
```

---

## 📁 EXPECTED OUTPUT

### Files to generate:
1. `data/captain_maid_product_index.csv` - All products
2. `data/captain_maid_product_index.json` - Structured data
3. `data/captain_maid_image_manifest.csv` - Image metadata
4. `data/captain_maid_source_comparison.csv` - Official vs Retailer
5. `images/` - All downloaded product images
6. `logs/scrape.log` - Full scrape log
7. `logs/errors.log` - Errors and blocks
8. `captain_maid_scrape_report.md` - Final report

### Templates provided:
- `captain_maid_product_index_template.csv` - CSV format
- `captain_maid_product_index_template.json` - JSON format

---

## 🎯 PRIORITY REQUIREMENTS

**MUST HAVE:**
- ✅ All products scraped from both sources
- ✅ Product images downloaded and organized
- ✅ CSV and JSON outputs created
- ✅ Source comparison documented
- ✅ Errors/blocks logged

**SHOULD HAVE:**
- ✅ Image manifests with metadata
- ✅ Conflict notes for data differences
- ✅ Report with quality metrics
- ✅ Missing field documentation

**NICE TO HAVE:**
- ✅ Barcode/EAN codes
- ✅ Ingredient lists
- ✅ Usage instructions
- ✅ Ratings and reviews

---

## 🔍 KNOWN CAPTAIN MAID PRODUCTS

From HomePro search:

| SKU | Product Name | Variant | Volume |
|-----|-------------|---------|--------|
| 1313735 | Floor Cleaner | Floral | 900 ml |
| 1313716 | Floor Cleaner | Tea Tree | 900 ml |
| 1313729 | Floor Cleaner | Lavender | 900 ml |

**Expect:** 8-17 total unique products when official + retailer are merged

---

## ✅ QUALITY CHECKLIST

Before submitting, verify:

- [ ] No duplicate SKUs (unless intentional multipack)
- [ ] Every product has name + SKU + source
- [ ] All images downloaded and named correctly
- [ ] Image manifests complete with hashes
- [ ] Official source = authoritative for product info
- [ ] Retailer source = pricing + availability
- [ ] Conflict notes added for price/availability differences
- [ ] robots.txt respected
- [ ] No CAPTCHA bypass attempted
- [ ] Polite rate limiting used (1-2s delays)
- [ ] All logs included
- [ ] Report includes recommendations

---

## 🚨 WHAT TO LOG

Document these in `logs/`:

**scrape.log:**
- Pages visited
- Products found per page
- Images downloaded
- Time taken per source
- Completion status

**errors.log:**
- 404 / 500 errors
- CAPTCHA encounters
- Rate limit hits (429)
- Timeout errors
- SSL/connection errors
- Parsing failures

---

## 📊 FINAL REPORT TEMPLATE

The `captain_maid_scrape_report.md` should contain:

### Executive Summary
- Official products found: X
- HomePro products found: Y
- Merged products: Z
- Total images: N
- Data quality: %

### Discovery Results
- [Official site results]
- [HomePro results]
- [Merge strategy used]

### Data Coverage
- Completeness %
- Missing fields by product
- Source conflicts

### Image Report
- Total images: N
- By source: official X, homepro Y
- Failed downloads (if any)

### Errors & Blocks
- Pages failed
- CAPTCHA: yes/no
- Rate limits hit: yes/no
- Other issues

### Source Comparison
| Field | Official | HomePro | Conflict? |
|-------|----------|---------|-----------|
| Price | 129 THB | 119 THB | Yes |
| Stock | In Stock | In Stock | No |
| ... | | | |

### Recommendations
1. [Fill missing fields]
2. [Verify image licenses]
3. [Resolve conflicts]
4. [Next steps]

---

## 🔐 COMPLIANCE NOTES

✅ **MUST DO:**
- Respect `robots.txt`
- No login/CAPTCHA bypass
- 1-2 second delays between requests
- Proper source attribution
- Mark image licenses

❌ **MUST NOT DO:**
- Claim ownership of images
- Bypass anti-bot protection
- Rate limit abuse
- Store images without license notes
- Ignore robots.txt

---

## 📞 SUPPORT

For issues during scraping:

1. **Page won't load** → Check robots.txt, wait 5 min, retry
2. **CAPTCHA appears** → STOP, log as blocked, skip page
3. **Image download fails** → Log URL + error, continue
4. **Missing fields** → Mark as "missing_field_notes"
5. **Price difference** → Add to "data_conflict_notes"

---

## 📤 SUBMISSION CHECKLIST

When complete, provide:

1. ✅ `captain-maid-product-index/` folder
2. ✅ All data files (CSV, JSON, manifests)
3. ✅ All images organized by SKU
4. ✅ Complete logs
5. ✅ Final report with metrics
6. ✅ Summary email/report

---

**Status:** READY FOR EXECUTION  
**Created:** 2026-07-06  
**Deadline:** 2026-07-08  
**Expected Duration:** 2-4 hours of agent time
