#!/bin/bash
# Master Validation - Run ALL checks before presenting

URL=$1

if [ -z "$URL" ]; then
  echo "❌ Usage: $0 <deployed-url>"
  exit 1
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚨 PRE-PRESENTATION VALIDATION"
echo "URL: $URL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

ERRORS=0

echo "🎨 1/4 Design Validation..."
bash .validation/scripts/design-check.sh . || ((ERRORS++))

echo ""
echo "📸 2/4 Visual Screenshots..."
node .validation/scripts/visual-test.js "$URL" || ((ERRORS++))

echo ""
echo "🔌 3/4 API Health..."
node .validation/scripts/api-check.js "$URL" || ((ERRORS++))

echo ""
echo "🔘 4/4 Button Tests..."
node .validation/scripts/button-test.js "$URL" || ((ERRORS++))

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ERRORS -gt 0 ]; then
  echo "❌ VALIDATION FAILED - $ERRORS errors"
  echo ""
  echo "🚨 DO NOT PRESENT TO USER"
  exit 1
else
  echo "✅ VALIDATION PASSED"
  echo ""
  echo "🎉 READY TO PRESENT"
fi
