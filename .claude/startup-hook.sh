#!/bin/bash
# 🚀 CLAUDE CODE - STARTUP HOOK
# Auto-chargé au démarrage du terminal Claude Code
# Ce script affiche les requirements et instructions du projet

PROJECT_ROOT="$(pwd)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🤖 CLAUDE CODE - SESSION STARTED"
echo "📁 Project: $(basename "$PROJECT_ROOT")"
echo "⏰ $(date '+%Y-%m-%d %H:%M:%S')"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. Check if .requirements.md exists
if [ -f "$PROJECT_ROOT/.requirements.md" ]; then
  echo "📋 REQUIREMENTS LOADED"
  echo ""
  echo "📖 Reading .requirements.md (first 50 lines)..."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  head -50 "$PROJECT_ROOT/.requirements.md"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "💡 Full file: cat .requirements.md"
  echo ""
else
  echo "⚠️  WARNING: No .requirements.md found!"
  echo ""
  echo "📝 Create requirements file:"
  echo "   cp ~/.claude/templates/requirements-template.md .requirements.md"
  echo ""
fi

# 2. Check if agents/ directory exists
if [ -d "$PROJECT_ROOT/agents" ]; then
  echo "🤖 AGENTS DETECTED"
  echo ""

  # Read last 20 lines of SYNC.md
  if [ -f "$PROJECT_ROOT/agents/SYNC.md" ]; then
    echo "📡 Latest SYNC updates:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    tail -20 "$PROJECT_ROOT/agents/SYNC.md"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
  fi

  # Check AGENTS_INSTRUCTIONS.md
  if [ -f "$PROJECT_ROOT/agents/AGENTS_INSTRUCTIONS.md" ]; then
    echo "📢 Agents instructions available: cat agents/AGENTS_INSTRUCTIONS.md"
    echo ""
  fi
else
  echo "💡 No agents/ directory found (normal for non-coordinated projects)"
  echo ""
fi

# 3. Check if validation system exists
if [ -d "$PROJECT_ROOT/.validation" ]; then
  echo "✅ VALIDATION SYSTEM INSTALLED"
  echo ""
  echo "🔍 Available validation scripts:"
  ls -1 "$PROJECT_ROOT/.validation/scripts/" 2>/dev/null | sed 's/^/   /'
  echo ""
  echo "🚀 Run full validation:"
  echo "   bash .validation/pre-present-check.sh <deployed-url>"
  echo ""
else
  echo "⚠️  WARNING: No validation system found!"
  echo ""
  echo "🛠️  Install validation:"
  echo "   bash ~/.claude/templates/validation/setup-validation.sh ."
  echo ""
fi

# 4. Recall saved APIs from Checkpoint Memory
echo "🔑 CHECKPOINT MEMORY - Saved APIs"
echo ""
if command -v bash ~/.claude-memory/.git/config &> /dev/null && [ -d ~/.claude-memory/apis ]; then
  echo "Available APIs in memory:"
  bash ~/scripts/checkpoint-memory.sh recall-apis 2>/dev/null || echo "   (None saved yet)"
else
  echo "⚠️  Checkpoint Memory not initialized"
  echo "   Run: bash ~/scripts/checkpoint-memory.sh save-api <service> <key>"
fi
echo ""

# 5. Git status check
echo "📦 GIT STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
git status --short 2>/dev/null || echo "Not a git repository"
echo ""
git branch --show-current 2>/dev/null | sed 's/^/Current branch: /' || true
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 6. Quick reminders
echo "⚡ QUICK REMINDERS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. 🧠 Memory First - Check APIs before asking"
echo "2. 🔍 Design QA - Run validation before deploy"
echo "3. 🤝 Coordination - Update agents/SYNC.md if exists"
echo "4. 🎯 World-Class - Lighthouse > 90, WCAG AA"
echo "5. 🚫 Never Rush - Quality > Speed"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 7. Display deployment URLs if available
if [ -f "$PROJECT_ROOT/.vercel/project.json" ]; then
  echo "🌐 VERCEL PROJECT DETECTED"
  VERCEL_URL=$(cat "$PROJECT_ROOT/.vercel/project.json" | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
  echo "   Preview: https://$VERCEL_URL.vercel.app"
  echo ""
fi

echo "✅ Ready to work! Remember the 3 core rules:"
echo "   1️⃣  Memory First (zero repeated questions)"
echo "   2️⃣  Design QA Obligatoire (validation before deploy)"
echo "   3️⃣  Coordination SYNC.md (if agents/ exists)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
