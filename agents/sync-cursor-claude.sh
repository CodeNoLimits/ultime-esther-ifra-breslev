#!/bin/bash
# Sync Cursor ↔ Claude Code en temps réel
# Nécessite: brew install fswatch

SYNC_FILE="agents/SYNC.md"

if ! command -v fswatch &> /dev/null; then
  echo "⚠️ fswatch non installé. Installer avec: brew install fswatch"
  echo "   Sans fswatch, sync manuelle via agents/SYNC.md"
  exit 0
fi

echo "🔄 Monitoring agents/SYNC.md pour changements..."
echo "   Ctrl+C pour arrêter"
echo ""

fswatch -0 "$SYNC_FILE" | while read -d "" event
do
  clear
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🔄 AGENTS SYNC - Mise à jour détectée"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  tail -20 "$SYNC_FILE"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "$(date '+%Y-%m-%d %H:%M:%S') - Dernière update"
done
