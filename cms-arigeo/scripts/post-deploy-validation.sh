#!/bin/bash

# Post-Deployment Schema Validation
# Runs immediately after deployment to verify schema is healthy
# Usage: ./scripts/post-deploy-validation.sh [environment] [max-wait-seconds]

set -e

ENVIRONMENT=${1:-staging}
MAX_WAIT=${2:-300}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=== Post-Deployment Schema Validation ===${NC}"
echo "Environment: $ENVIRONMENT"
echo "Max wait time: ${MAX_WAIT}s"
echo ""

# 1. Wait for deployment to be healthy
echo -e "${BLUE}[1/5] Waiting for deployment to respond...${NC}"

# Determine API URL based on environment
case $ENVIRONMENT in
  staging)
    API_URL="https://staging-cms.vercel.app"
    ;;
  production)
    API_URL="https://cms-arigeo.vercel.app"
    ;;
  *)
    API_URL="http://localhost:3000"
    ;;
esac

ELAPSED=0
INTERVAL=10
while [ $ELAPSED -lt $MAX_WAIT ]; do
  if curl -s "$API_URL/api/graphql" -H "Content-Type: application/json" -d '{"query":"{__typename}"}' 2>/dev/null | grep -q "data"; then
    echo -e "${GREEN}✓ Deployment responding${NC}"
    break
  fi
  echo "  Waiting... ($ELAPSED/$MAX_WAIT seconds)"
  sleep $INTERVAL
  ELAPSED=$((ELAPSED + INTERVAL))
done

if [ $ELAPSED -ge $MAX_WAIT ]; then
  echo -e "${RED}✗ Deployment did not respond within ${MAX_WAIT}s${NC}"
  exit 1
fi
echo ""

# 2. Test GraphQL introspection
echo -e "${BLUE}[2/5] Testing GraphQL introspection...${NC}"
INTROSPECTION=$(curl -s "$API_URL/api/graphql" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __schema { types { name } } }"}')

if echo "$INTROSPECTION" | grep -q '"name"'; then
  echo -e "${GREEN}✓ GraphQL schema accessible${NC}"
else
  echo -e "${RED}✗ GraphQL introspection failed${NC}"
  echo "Response: $INTROSPECTION"
  exit 1
fi
echo ""

# 3. Test collections exist
echo -e "${BLUE}[3/5] Verifying core collections...${NC}"
COLLECTIONS=("products" "pages" "posts" "brands" "users")
MISSING_COLLECTIONS=()

for collection in "${COLLECTIONS[@]}"; do
  QUERY="{ $collection(limit: 1) { edges { node { id } } } }"
  RESPONSE=$(curl -s "$API_URL/api/graphql" \
    -H "Content-Type: application/json" \
    -d "{\"query\":\"$QUERY\"}" 2>/dev/null || echo "")

  if echo "$RESPONSE" | grep -q "data"; then
    echo "  ✓ $collection"
  else
    MISSING_COLLECTIONS+=("$collection")
    echo "  ✗ $collection"
  fi
done

if [ ${#MISSING_COLLECTIONS[@]} -gt 0 ]; then
  echo -e "${YELLOW}⚠ Missing collections: ${MISSING_COLLECTIONS[*]}${NC}"
else
  echo -e "${GREEN}✓ All core collections present${NC}"
fi
echo ""

# 4. Test API endpoints
echo -e "${BLUE}[4/5] Testing REST API endpoints...${NC}"
ENDPOINTS=(
  "/api/products?limit=1"
  "/api/pages?limit=1"
  "/api/posts?limit=1"
)

ALL_OK=true
for endpoint in "${ENDPOINTS[@]}"; do
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL$endpoint")
  if [ "$HTTP_CODE" = "200" ]; then
    echo -e "  ${GREEN}✓${NC} $endpoint (HTTP $HTTP_CODE)"
  else
    echo -e "  ${RED}✗${NC} $endpoint (HTTP $HTTP_CODE)"
    ALL_OK=false
  fi
done

if [ "$ALL_OK" = true ]; then
  echo -e "${GREEN}✓ All REST endpoints responding${NC}"
else
  echo -e "${YELLOW}⚠ Some endpoints failed${NC}"
fi
echo ""

# 5. Test admin UI
echo -e "${BLUE}[5/5] Testing admin UI...${NC}"
ADMIN_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/admin")
if [ "$ADMIN_CODE" = "200" ]; then
  echo -e "${GREEN}✓ Admin UI accessible${NC}"
elif [ "$ADMIN_CODE" = "302" ]; then
  echo -e "${GREEN}✓ Admin UI redirects (auth required)${NC}"
else
  echo -e "${YELLOW}⚠ Admin UI HTTP $ADMIN_CODE${NC}"
fi
echo ""

# Summary
echo -e "${BLUE}=== Validation Summary ===${NC}"
if [ ${#MISSING_COLLECTIONS[@]} -eq 0 ] && [ "$ALL_OK" = true ]; then
  echo -e "${GREEN}✅ Post-deployment validation PASSED${NC}"
  echo ""
  echo "Deployment is healthy and ready to use:"
  echo "  GraphQL: $API_URL/api/graphql"
  echo "  Admin: $API_URL/admin"
  exit 0
else
  echo -e "${YELLOW}⚠️ Post-deployment validation INCOMPLETE${NC}"
  echo ""
  if [ ${#MISSING_COLLECTIONS[@]} -gt 0 ]; then
    echo "Missing collections: ${MISSING_COLLECTIONS[*]}"
    echo "  → Schema migration may not have completed"
    echo "  → Try restarting deployment or checking logs"
  fi
  if [ "$ALL_OK" = false ]; then
    echo "Some endpoints failed"
    echo "  → Check Vercel deployment logs"
  fi
  exit 1
fi
