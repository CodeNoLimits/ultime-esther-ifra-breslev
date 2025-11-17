# 🎯 ORCHESTRATEUR AGENTS 26

**Version:** 1.0
**Date:** $(date +%Y-%m-%d)
**Projet:** $(basename $(pwd))

## Architecture

```
User Request
      ↓
Orchestrator (ce fichier)
      ↓
Agent Spécialisé (Cursor OU Claude Code)
      ↓
Exécution autonome
      ↓
Validation + Commit
      ↓
Sync avec autre agent
```

## Cursor Agents (13)

| # | Agent | Responsabilité | Autonomie |
|---|-------|----------------|-----------|
| 1 | **Frontend** | UI/UX components, React/Vue/Svelte | 100% |
| 2 | **Backend** | API routes, business logic, Express/Next.js | 100% |
| 3 | **Database** | Schema, migrations, Drizzle/Prisma | 100% |
| 4 | **Payments** | Stripe/PayPal integration complète | 100% |
| 5 | **Style** | Tailwind CSS, design system | 100% |
| 6 | **Tests** | Unit, integration, e2e (Vitest, Playwright) | 100% |
| 7 | **Research** | Code search, documentation, patterns | 100% |
| 8 | **Screenshots** | Visual regression, design validation | 100% |
| 9 | **DevOps** | Build, deploy Vercel/Netlify, CI/CD | 100% |
| 10 | **Analytics** | Tracking Vercel Analytics, Plausible | 100% |
| 11 | **SEO** | Meta tags, sitemap, robots.txt, performance | 100% |
| 12 | **Content** | Copywriting, descriptions produits | 100% |
| 13 | **Multilangue** | i18n FR/EN/HE, traductions | 100% |

## Claude Code Agents (13) - Mêmes rôles

Coordination via fichiers `agents/SYNC.md` temps réel.

## Règles Non-Négociables

### 1. AUTONOMIE TOTALE ✅
- **Zéro question** sauf blocage critique absolu
- Prendre décisions techniques dans son scope
- Utiliser best practices connues

### 2. COMMITS ATOMIQUES ✅
Convention:
```bash
feat(frontend): Add Hero component with animations
fix(backend): Resolve CORS issue on /api/products
style(design): Update Tailwind config for luxury theme
test(payments): Add Stripe webhook tests
docs: Update API documentation
```

### 3. COMMUNICATION SYNC ✅
Chaque action → Update `agents/SYNC.md`:
```markdown
## [2025-11-17 15:30] Frontend Agent (Cursor)
- ✅ Created Hero component
- 🔄 Working on: Product card animations
- ⚠️ Needs: Backend agent to expose /api/products endpoint
```

### 4. VALIDATION SYSTÉMATIQUE ✅
Avant commit:
- Lint pass (ESLint)
- Type check pass (TypeScript)
- Tests pass (si applicable)
- Build success

## Workflow Détaillé

### User demande: "Ajouter page produits avec filtres"

**Orchestrator décide:**
1. Frontend Agent → Créer UI page produits
2. Backend Agent → API endpoint /api/products avec filtres
3. Database Agent → Vérifier schema products
4. Style Agent → Design system produits (cards, filters)
5. SEO Agent → Meta tags page produits
6. Multilangue Agent → Traductions labels filtres

**Exécution parallèle:**
- Tous agents travaillent en même temps
- Sync via `agents/SYNC.md`
- Commits indépendants
- Review finale Orchestrator

### User demande: "Design validation Barukh Sagit"

**Orchestrator décide:**
1. Screenshots Agent → Capture site actuel
2. Research Agent → Benchmark Tiffany/Cartier
3. Style Agent → Compare design systems
4. Frontend Agent → Implémenter améliorations

## Escalation

Si agent bloqué:
1. Documenter dans `agents/SYNC.md`
2. Notifier Orchestrator
3. Orchestrator assigne autre agent ou demande user

**Jamais bloquer en silence.**

---
*Système 26 Agents - Automatisation totale*
