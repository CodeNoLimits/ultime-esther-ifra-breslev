# Claude Code Agents Configuration

## Setup

1. Chaque agent a son dossier: `agents/claude-code/<agent-name>/`
2. Instructions spécifiques dans `agents/claude-code/<agent-name>/INSTRUCTIONS.md`
3. Activity log: `agents/claude-code/<agent-name>/activity.log`

## Convention Commits

Identique aux agents Cursor pour cohérence.

## Coordination Cursor ↔ Claude Code

Les deux systèmes partagent `agents/SYNC.md`:

```markdown
## [2025-11-17 15:35] Backend Agent (Claude Code)
- ✅ Created /api/products endpoint with pagination
- 📝 Response format: { products: [], pagination: { page, total } }
- 🔗 Frontend Agent (Cursor) peut maintenant l'utiliser

## [2025-11-17 15:40] Frontend Agent (Cursor)
- ✅ Integrated /api/products in ProductList component
- 🎨 Applied luxury design system
- ⚠️ Need: SEO Agent to add meta tags
```

Temps réel via file watching (optionnel):
```bash
./agents/sync-cursor-claude.sh
```

## Spécialisation Claude Code

Claude Code excelle sur:
- Macro-tâches (features multi-fichiers)
- Architecture complexe
- Debugging systémique
- Research approfondie

Cursor excelle sur:
- Micro-tâches (complétion ligne)
- Refactoring ciblé
- Modifications rapides inline
