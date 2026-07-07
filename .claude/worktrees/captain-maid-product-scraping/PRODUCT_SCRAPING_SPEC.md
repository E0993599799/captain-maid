# CAPTAIN MAID PRODUCT DATA INDEXING SPECIFICATION

**Mission:** Scrape and index all Captain Maid products from official sources and retail partners.

**Date Created:** 2026-07-06  
**Assigned Agent:** Gemini / Scraping Agent  
**Status:** READY FOR EXECUTION

---

## 📋 PRIMARY SOURCES

### Official Source (AUTHORITATIVE)
**Website:** https://captain-maid.com/  
**Use for:** Product names, descriptions, official images, ingredients, category structure

### Secondary Source (VALIDATION)
**Retailer:** https://www.homepro.co.th/search?q=captain+maid  
**Use for:** Pricing, availability, SKUs, reviews, retail availability

---

## 🎯 EXPECTED CAPTAIN MAID PRODUCTS

Based on HomePro search, expect products like:
- SKU 1313735: Floor Cleaner (Floral) 900ml
- SKU 1313716: Floor Cleaner (Tea Tree) 900ml  
- SKU 1313729: Floor Cleaner (Lavender) 900ml
- Plus additional products from official site

---

## 📊 DATA TO EXTRACT PER PRODUCT

Essential fields:
- canonical_product_id
- source_sites (official, homepro, etc)
- product_name_th, product_name_en
- brand, sku, barcode
- category, subcategory, size, variant
- product_description, key_claims, ingredients
- usage_instruction, caution_warning
- price (official & retailer), stock_status
- rating, review_count, sold_count
- images (url, alt_text)
- scraped_at timestamp

---

## 📁 OUTPUT STRUCTURE

```
captain-maid-product-index/
├── data/
│   ├── captain_maid_product_index.csv
│   ├── captain_maid_product_index.json
│   ├── captain_maid_image_manifest.csv
│   └── captain_maid_source_comparison.csv
├── images/ (all downloaded product images)
├── logs/
│   ├── scrape.log
│   └── errors.log
└── captain_maid_scrape_report.md
```

---

## 🖼️ IMAGE NAMING CONVENTION

`captain-maid__{SKU}__{variant}__{source}__{index}.jpg`

Example: `captain-maid__1313735__floral__official__01.jpg`

---

## ✅ FINAL DELIVERABLES REQUIRED

1. Product index CSV & JSON
2. Image manifest CSV
3. Source comparison CSV
4. Detailed scrape report (MD)
5. All product images organized by SKU
6. Logs of all errors/blocks/warnings

---

## 🔐 COMPLIANCE RULES

- Respect robots.txt
- No CAPTCHA/login bypass
- Polite rate limiting (1-2s between requests)
- Proper source attribution
- Mark image licenses correctly
- No false ownership claims

---

## 📊 FINAL REPORT SHOULD INCLUDE

- Total official products: X
- Total retailer products: Y  
- Total merged products: Z
- Total images downloaded: N
- Source conflicts found: list
- Missing fields: list
- Pages failed/blocked: list
- Data quality score: %
- Recommendations: list

---

**Status:** Ready for Gemini or Scraping Agent execution
