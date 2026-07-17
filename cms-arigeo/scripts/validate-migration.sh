#!/bin/bash

# Database Migration Validation Script
# Validates schema migration from dev to staging to production
# Usage: ./scripts/validate-migration.sh [environment]
# Example: ./scripts/validate-migration.sh staging

set -e

ENVIRONMENT=${1:-staging}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== CMS-Arigeo Migration Validator ===${NC}"
echo "Environment: $ENVIRONMENT"
echo ""

# 1. Load environment variables
echo -e "${BLUE}[1/6] Loading environment variables...${NC}"
if [ ! -f "$PROJECT_ROOT/.env.$ENVIRONMENT" ]; then
  echo -e "${RED}✗ Error: .env.$ENVIRONMENT not found${NC}"
  echo "   Copy .env.example or .env.$ENVIRONMENT.template and fill in your credentials"
  exit 1
fi
source "$PROJECT_ROOT/.env.$ENVIRONMENT"

# Validate required env vars
for var in DATABASE_URL PAYLOAD_SECRET; do
  if [ -z "${!var}" ]; then
    echo -e "${RED}✗ Missing required variable: $var${NC}"
    exit 1
  fi
done
echo -e "${GREEN}✓ Environment variables loaded${NC}"
echo ""

# 2. Test database connection
echo -e "${BLUE}[2/6] Testing database connection...${NC}"
if psql "$DATABASE_URL" -c "SELECT 1;" > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Database connection successful${NC}"
  # Get PostgreSQL version
  PG_VERSION=$(psql "$DATABASE_URL" -t -c "SELECT version();")
  echo "   PostgreSQL: $(echo $PG_VERSION | head -c 50)..."
else
  echo -e "${RED}✗ Database connection failed${NC}"
  echo "   Check DATABASE_URL and network connectivity"
  exit 1
fi
echo ""

# 3. Check schema tables
echo -e "${BLUE}[3/6] Checking database schema...${NC}"
TABLES=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")
echo "   Tables in public schema: $TABLES"

# Expected collections (18 total)
EXPECTED_COLLECTIONS=(
  "users"
  "media"
  "brands"
  "product_categories"
  "solutions"
  "products"
  "product_variants"
  "pages"
  "posts"
  "faqs"
  "banners"
  "testimonials"
  "careers"
  "product_offers"
  "reviews"
  "navigation"
  "site_settings"
  "enquiries"
)

MISSING=()
for table in "${EXPECTED_COLLECTIONS[@]}"; do
  if ! psql "$DATABASE_URL" -t -c "SELECT 1 FROM information_schema.tables WHERE table_name = '$table';" | grep -q "1"; then
    MISSING+=("$table")
  fi
done

if [ ${#MISSING[@]} -eq 0 ]; then
  echo -e "${GREEN}✓ All 18 expected collections present${NC}"
else
  echo -e "${YELLOW}⚠ Missing collections: ${MISSING[*]}${NC}"
  echo "   Payload migration may not have completed. Run: npm start"
fi
echo ""

# 4. Check localization fields
echo -e "${BLUE}[4/6] Checking localization setup...${NC}"
TH_FIELDS=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(column_name) FROM information_schema.columns WHERE table_name = 'products' AND column_name LIKE '%th_%';" 2>/dev/null || echo "0")
EN_FIELDS=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(column_name) FROM information_schema.columns WHERE table_name = 'products' AND column_name LIKE '%en_%';" 2>/dev/null || echo "0")

if [ "$TH_FIELDS" -gt 0 ] && [ "$EN_FIELDS" -gt 0 ]; then
  echo -e "${GREEN}✓ Localization fields present (TH: $TH_FIELDS, EN: $EN_FIELDS)${NC}"
else
  echo -e "${YELLOW}⚠ Localization fields not yet created${NC}"
  echo "   Expected fields: th_* and en_* prefixed columns"
fi
echo ""

# 5. Check data records (optional)
echo -e "${BLUE}[5/6] Checking data records...${NC}"
PRODUCT_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM products;" 2>/dev/null || echo "0")
PAGE_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM pages;" 2>/dev/null || echo "0")
USER_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM users;" 2>/dev/null || echo "0")

echo "   Records: Products=$PRODUCT_COUNT, Pages=$PAGE_COUNT, Users=$USER_COUNT"

if [ "$USER_COUNT" -gt 0 ]; then
  echo -e "${GREEN}✓ Data present in database${NC}"
else
  echo -e "${YELLOW}⚠ No users yet (expected before seeding content)${NC}"
fi
echo ""

# 6. Test API connectivity (if running)
echo -e "${BLUE}[6/6] Testing API connectivity...${NC}"
if command -v curl &> /dev/null; then
  # Try localhost first (dev)
  API_URL="http://localhost:3000"
  if [ "$ENVIRONMENT" = "staging" ]; then
    API_URL="https://staging-cms.vercel.app"
  elif [ "$ENVIRONMENT" = "production" ]; then
    API_URL="https://cms-arigeo.vercel.app"
  fi

  if curl -s "$API_URL/api/graphql" -H "Content-Type: application/json" -d '{"query":"{__typename}"}' | grep -q "data"; then
    echo -e "${GREEN}✓ API responding at $API_URL${NC}"
  else
    echo -e "${YELLOW}⚠ API not responding at $API_URL${NC}"
    echo "   Run: npm start (or check deployment status)"
  fi
else
  echo -e "${YELLOW}⚠ curl not available, skipping API test${NC}"
fi
echo ""

# Summary
echo -e "${BLUE}=== Validation Summary ===${NC}"
if [ ${#MISSING[@]} -eq 0 ] && [ "$TH_FIELDS" -gt 0 ]; then
  echo -e "${GREEN}✓ Schema migration validated successfully${NC}"
  echo "   All collections and localization fields present"
  echo ""
  echo -e "${YELLOW}Next steps:${NC}"
  echo "  1. Seed content (products, pages, posts)"
  echo "  2. Test admin UI: $API_URL/admin"
  echo "  3. Run performance tests"
  echo "  4. Review slow query log"
  echo "  5. If all tests pass, promote to next environment"
else
  echo -e "${YELLOW}⚠ Schema incomplete or migration pending${NC}"
  echo "   Run: npm start to trigger migration"
  echo "   Then re-run this script"
fi
echo ""
