#!/bin/bash
# 🎯 CURSOR - STARTUP HOOK
# Auto-chargé au démarrage du terminal Cursor
# Ce script affiche les requirements et instructions du projet

PROJECT_ROOT="$(pwd)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 CURSOR - SESSION STARTED"
echo "📁 Project: $(basename "$PROJECT_ROOT")"
echo "⏰ $(date '+%Y-%m-%d %H:%M:%S')"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. Read .cursorrules if exists
if [ -f "$PROJECT_ROOT/.cursorrules" ]; then
  echo "📋 CURSORRULES LOADED"
  echo ""
  echo "📖 Reading .cursorrules (first 40 lines)..."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  head -40 "$PROJECT_ROOT/.cursorrules"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "💡 Full file: cat .cursorrules"
  echo ""
fi

# 2. Read .requirements.md if exists
if [ -f "$PROJECT_ROOT/.requirements.md" ]; then
  echo "📋 REQUIREMENTS IMMUABLES DETECTED"
  echo ""
  echo "⚠️  CRITICAL: This file contains PERMANENT requirements"
  echo "   Read before ANY coding: cat .requirements.md"
  echo ""
  echo "📊 Quick summary (first 30 lines):"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  head -30 "$PROJECT_ROOT/.requirements.md"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
else
  echo "⚠️  WARNING: No .requirements.md found!"
  echo ""
  echo "📝 Create requirements file:"
  echo "   cp ~/.claude/templates/requirements-template.md .requirements.md"
  echo ""
fi

# 3. Check agents coordination
if [ -d "$PROJECT_ROOT/agents" ]; then
  echo "🤖 AGENTS COORDINATION ACTIVE"
  echo ""

  # Read SYNC.md
  if [ -f "$PROJECT_ROOT/agents/SYNC.md" ]; then
    echo "📡 Check what other agents are doing:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    tail -15 "$PROJECT_ROOT/agents/SYNC.md"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "💡 Update SYNC when you start/finish tasks:"
    echo "   echo \"[$(date)] Cursor: Working on XYZ\" >> agents/SYNC.md"
    echo ""
  fi
else
  echo "💡 No agents/ coordination (normal for single-agent projects)"
  echo ""
fi

# 4. Validation system check
if [ -d "$PROJECT_ROOT/.validation" ]; then
  echo "✅ VALIDATION SYSTEM AVAILABLE"
  echo ""
  echo "🔍 Before deploying, run:"
  echo "   bash .validation/pre-present-check.sh <url>"
  echo ""
else
  echo "⚠️  No validation system - Install it:"
  echo "   bash ~/.claude/templates/validation/setup-validation.sh ."
  echo ""
fi

# 5. Memory system reminder
echo "🔑 CHECKPOINT MEMORY SYSTEM"
echo ""
echo "Before asking for API keys, check memory:"
echo "   bash ~/scripts/checkpoint-memory.sh get-api <service>"
echo ""
echo "Save API once, use forever:"
echo "   bash ~/scripts/checkpoint-memory.sh save-api <service> <key>"
echo ""

# 6. Git quick status
echo "📦 GIT STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
git status --short 2>/dev/null || echo "Not a git repository"
echo ""
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)
if [ -n "$CURRENT_BRANCH" ]; then
  echo "Branch: $CURRENT_BRANCH"

  # Warn if on main/master
  if [[ "$CURRENT_BRANCH" == "main" ]] || [[ "$CURRENT_BRANCH" == "master" ]]; then
    echo ""
    echo "⚠️  WARNING: You're on $CURRENT_BRANCH branch!"
    echo "   Consider creating a feature branch:"
    echo "   git checkout -b cursor-feature-$(date +%Y%m%d)"
    echo ""
  fi
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 7. Core rules reminder
echo "⚡ 3 CORE RULES (NON-NEGOTIABLE)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. 🧠 MEMORY FIRST - Check before asking"
echo "   bash ~/scripts/checkpoint-memory.sh recall-apis"
echo ""
echo "2. 🔍 DESIGN QA OBLIGATOIRE - Validate before deploy"
echo "   bash ~/scripts/design-qa-automation.sh <url>"
echo ""
echo "3. 🤝 COORDINATION SYNC.md - Update if agents/ exists"
echo "   cat agents/SYNC.md | tail -20"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 8. Deployment URLs
if [ -f "$PROJECT_ROOT/.vercel/project.json" ]; then
  echo "🌐 VERCEL PROJECT"
  VERCEL_URL=$(cat "$PROJECT_ROOT/.vercel/project.json" | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
  echo "   URL: https://$VERCEL_URL.vercel.app"
  echo ""
fi

echo "✅ Cursor ready! Work autonomously, respect requirements."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
