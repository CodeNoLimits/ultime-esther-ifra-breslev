# Cursor Agents Configuration

## Setup

1. Chaque agent a son dossier: `agents/cursor/<agent-name>/`
2. Instructions spécifiques dans `agents/cursor/<agent-name>/INSTRUCTIONS.md`
3. Activity log: `agents/cursor/<agent-name>/activity.log`

## Convention Commits

Tous les commits Cursor suivent:
```
<type>(<scope>): <message>

Types: feat, fix, style, test, docs, refactor, perf, chore
Scopes: frontend, backend, database, payments, style, etc.
```

Exemples:
```bash
feat(frontend): Add product carousel with Swiper.js
fix(backend): Resolve race condition in order processing
style(design): Implement luxury color palette Barukh Sagit
test(payments): Add Stripe webhook signature validation
docs(api): Update OpenAPI schema for /products endpoint
```

## Autonomie

**Cursor agents NE DEMANDENT PAS:**
- Choix de librairie (utiliser best practices)
- Structure fichiers (suivre conventions projet)
- Naming conventions (camelCase, PascalCase selon langage)

**Cursor agents DEMANDENT seulement si:**
- Décision business critique (prix, tarifs, textes marketing)
- Intégration API externe nécessite credentials
- Choix UX majeur affecte parcours user

## Coordination

Avant de travailler sur un fichier:
1. Vérifier `agents/SYNC.md`
2. Si autre agent travaille dessus → Attendre ou coordonner
3. Sinon → Claim le fichier dans SYNC.md

Après commit:
1. Update `agents/SYNC.md` avec résumé
2. Notifier agents dépendants si nécessaire
