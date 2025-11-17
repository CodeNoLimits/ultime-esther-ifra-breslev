#!/bin/bash
# Agent 1: Design Validator

PROJECT_PATH=${1:-.}
REPORT_DIR="$PROJECT_PATH/.validation/reports"
mkdir -p "$REPORT_DIR"

echo "🎨 DESIGN VALIDATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

ERRORS=0

# Check fonts
grep -r "font-family" "$PROJECT_PATH/src" 2>/dev/null > "$REPORT_DIR/fonts.txt" || touch "$REPORT_DIR/fonts.txt"
FONT_COUNT=$(grep -o "font-family" "$REPORT_DIR/fonts.txt" | sort -u | wc -l | tr -d ' ')
if [ $FONT_COUNT -gt 3 ]; then
  echo "❌ TOO MANY FONTS: $FONT_COUNT (max 3)"
  ((ERRORS++))
else
  echo "✅ Fonts OK: $FONT_COUNT/3"
fi

# Check spacing violations
grep -rE "(padding|margin):[^;]*(13px|17px|23px|27px)" "$PROJECT_PATH/src" 2>/dev/null > "$REPORT_DIR/spacing.txt" || touch "$REPORT_DIR/spacing.txt"
VIOLATIONS=$(wc -l < "$REPORT_DIR/spacing.txt" | tr -d ' ')
if [ $VIOLATIONS -gt 0 ]; then
  echo "❌ SPACING VIOLATIONS: $VIOLATIONS"
  ((ERRORS++))
else
  echo "✅ Spacing OK"
fi

# Check button states
BUTTONS=$(grep -r "button\|btn" "$PROJECT_PATH/src" 2>/dev/null | wc -l | tr -d ' ')
HOVER=$(grep -r ":hover" "$PROJECT_PATH/src" 2>/dev/null | wc -l | tr -d ' ')
FOCUS=$(grep -r ":focus" "$PROJECT_PATH/src" 2>/dev/null | wc -l | tr -d ' ')

if [ $BUTTONS -gt 0 ]; then
  HOVER_RATIO=$((HOVER * 100 / BUTTONS))
  FOCUS_RATIO=$((FOCUS * 100 / BUTTONS))

  if [ $HOVER_RATIO -lt 50 ]; then
    echo "⚠️ Missing hover states: $HOVER/$BUTTONS"
    ((ERRORS++))
  else
    echo "✅ Button hover states OK"
  fi

  if [ $FOCUS_RATIO -lt 50 ]; then
    echo "⚠️ Missing focus states: $FOCUS/$BUTTONS"
    ((ERRORS++))
  else
    echo "✅ Button focus states OK"
  fi
fi

# Check alt text
IMAGES=$(grep -rE "<img|<Image" "$PROJECT_PATH/src" 2>/dev/null | wc -l | tr -d ' ')
ALT_TEXTS=$(grep -rE 'alt="[^"]+"' "$PROJECT_PATH/src" 2>/dev/null | wc -l | tr -d ' ')
MISSING_ALT=$((IMAGES - ALT_TEXTS))
if [ $MISSING_ALT -gt 0 ] && [ $IMAGES -gt 0 ]; then
  echo "❌ MISSING ALT TEXT: $MISSING_ALT/$IMAGES"
  ((ERRORS++))
else
  echo "✅ Images alt text OK"
fi

echo ""
if [ $ERRORS -gt 0 ]; then
  echo "❌ DESIGN VALIDATION FAILED - $ERRORS errors"
  exit 1
else
  echo "✅ DESIGN VALIDATION PASSED"
fi
