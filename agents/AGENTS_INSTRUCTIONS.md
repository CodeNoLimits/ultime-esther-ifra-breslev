# 📢 MESSAGE URGENT POUR TOUS LES AGENTS (CURSOR + CLAUDE CODE)

> **Date:** 2025-11-17
> **Priorité:** CRITIQUE
> **À lire:** AVANT toute action sur les projets

---

## 🎯 NOUVEAU SYSTÈME D'AUTOMATION - RÈGLES ABSOLUES

Un système d'automation complet a été mis en place. **Vous DEVEZ suivre ces règles systématiquement.**

---

## 🧠 1. CHECKPOINT MEMORY SYSTEM - FIN DES QUESTIONS RÉPÉTITIVES

### Localisation
```
/Users/codenolimits-dreamai-nanach/.claude-memory/
├── apis/           # API keys sauvegardées À VIE
├── patterns/       # Patterns design/architecture appris
├── screenshots/    # Screenshots de référence
└── benchmarks/     # Analyses sites world-class
```

### Script
```bash
/Users/codenolimits-dreamai-nanach/scripts/checkpoint-memory.sh
```

### RÈGLE #1: TOUJOURS CHECKER MEMORY AVANT DE DEMANDER

**AVANT de demander une API key, credentials, ou info déjà donnée:**

```bash
# Vérifier si API existe
bash /Users/codenolimits-dreamai-nanach/scripts/checkpoint-memory.sh get-api stripe
bash /Users/codenolimits-dreamai-nanach/scripts/checkpoint-memory.sh get-api vercel
bash /Users/codenolimits-dreamai-nanach/scripts/checkpoint-memory.sh get-api supabase-url
bash /Users/codenolimits-dreamai-nanach/scripts/checkpoint-memory.sh get-api supabase-key

# Lister toutes les APIs disponibles
bash /Users/codenolimits-dreamai-nanach/scripts/checkpoint-memory.sh recall-apis

# Lister tous les patterns appris
bash /Users/codenolimits-dreamai-nanach/scripts/checkpoint-memory.sh recall-patterns
```

**SI l'API existe → UTILISER directement**
**SI l'API n'existe PAS → Demander UNE FOIS puis sauvegarder:**

```bash
# Sauvegarder pour toujours
bash /Users/codenolimits-dreamai-nanach/scripts/checkpoint-memory.sh save-api stripe "sk_test_xxx"
bash /Users/codenolimits-dreamai-nanach/scripts/checkpoint-memory.sh save-api vercel "token"
```

**Résultat:** Cette API ne sera PLUS JAMAIS redemandée.

---

## 🔍 2. DESIGN QA AUTOMATION - VALIDATION WORLD-CLASS OBLIGATOIRE

### Script
```bash
/Users/codenolimits-dreamai-nanach/scripts/design-qa-automation.sh
```

### RÈGLE #2: VALIDER DESIGN AVANT CHAQUE DÉPLOIEMENT

**AVANT de dire "site terminé" ou "déploiement prêt":**

```bash
# Tester design automatiquement
bash /Users/codenolimits-dreamai-nanach/scripts/design-qa-automation.sh https://url-du-site.com
```

**Critères obligatoires (Lighthouse):**
- ✅ Performance: > 90/100
- ✅ Accessibility: > 95/100
- ✅ Best Practices: > 95/100
- ✅ SEO: > 95/100
- ✅ WCAG 2.1 AA: 0 issues

**SI scores < seuils → AMÉLIORER avant déployer**
**SI scores >= seuils → ✅ Approuver déploiement**

**JAMAIS déployer un site < 90 sur Performance ou < 95 sur les autres critères.**

---

## 🤖 3. AGENTS 26 SYSTEM - COORDINATION CURSOR ↔ CLAUDE CODE

### Template Installation
```bash
/Users/codenolimits-dreamai-nanach/.claude/templates/agents-26/install-agents.sh
```

### RÈGLE #3: UTILISER AGENTS/SYNC.MD POUR COORDINATION

**Si projet a dossier `agents/` → Système Agents 26 actif**

**Structure:**
```
projet/
└── agents/
    ├── ORCHESTRATOR.md     # Instructions coordination
    ├── SYNC.md             # Communication temps réel
    ├── STATUS.md           # État actuel
    ├── cursor/             # 13 agents Cursor
    └── claude-code/        # 13 agents Claude Code
```

**Workflow:**

1. **AVANT de travailler sur un fichier:**
   ```bash
   # Vérifier SYNC.md
   cat agents/SYNC.md | tail -20
   ```

   Si autre agent travaille sur même fichier → **ATTENDRE ou COORDONNER**

2. **PENDANT le travail:**
   ```bash
   # Annoncer dans SYNC.md
   echo "
   ## [$(date +%Y-%m-%d\ %H:%M)] Frontend Agent (Cursor/Claude)
   - 🔄 Currently working on: src/components/Hero.tsx
   - 🎯 Task: Adding animations to Hero component
   " >> agents/SYNC.md
   ```

3. **APRÈS commit:**
   ```bash
   # Update SYNC.md avec résumé
   echo "
   ## [$(date +%Y-%m-%d\ %H:%M)] Frontend Agent (Cursor/Claude)
   - ✅ Completed: Hero component animations
   - 📝 Files modified: src/components/Hero.tsx, styles/animations.css
   - 🔗 Other agents: Can now use <Hero /> with fade-in animation
   " >> agents/SYNC.md
   ```

**Convention Commits:**
```bash
feat(frontend): Add Hero component with animations
fix(backend): Resolve CORS issue on /api/products
style(design): Update Tailwind config luxury theme
test(payments): Add Stripe webhook tests
docs(api): Update API documentation
```

---

## 📊 4. DASHBOARD CENTRAL - MONITORING 47 PROJETS

### Localisation
```
/Users/codenolimits-dreamai-nanach/dashboard-central/
```

### RÈGLE #4: VÉRIFIER DASHBOARD AVANT DE COMMENCER

**Le dashboard montre l'état de tous les projets:**

```bash
# Lancer dashboard
cd /Users/codenolimits-dreamai-nanach/dashboard-central
npm start

# Ouvrir: http://localhost:3000
```

**Info disponible:**
- 47 projets actifs
- 8 projets urgents (priorité)
- Lighthouse scores si disponibles
- Agents 26 déployés
- Dernière activité Git

**Utiliser pour prioriser le travail sur projets urgents.**

---

## 🎯 5. WORKFLOW STANDARD POUR NOUVEAU PROJET

### Étapes Obligatoires

```bash
# 1. Créer projet
npx create-next-app@latest nom-projet --typescript --tailwind --app
cd nom-projet

# 2. Déployer Agents 26
bash /Users/codenolimits-dreamai-nanach/.claude/templates/agents-26/install-agents.sh .

# 3. Vérifier Memory pour APIs (ne pas redemander)
bash /Users/codenolimits-dreamai-nanach/scripts/checkpoint-memory.sh recall-apis

# 4. Développer (utiliser agents/SYNC.md pour coordination)

# 5. Build & Deploy
npm run build
vercel --prod  # ou netlify deploy --prod

# 6. Design QA OBLIGATOIRE
bash /Users/codenolimits-dreamai-nanach/scripts/design-qa-automation.sh https://url-deployée.com

# 7. Si Lighthouse >= 90/95 → ✅ Livrer
#    Sinon → Améliorer → Retester
```

---

## 🚨 6. RÈGLES NON-NÉGOCIABLES (ZÉRO EXCEPTION)

### A. AUTONOMIE TOTALE ✅

**NE PAS DEMANDER:**
- Choix de librairie (utiliser best practices connues)
- Structure de fichiers (suivre conventions projet)
- Naming (camelCase, PascalCase selon langage)
- Stack technique standard (Next.js, Tailwind, etc.)

**DEMANDER SEULEMENT SI:**
- Décision business critique (prix, tarifs, textes marketing)
- Intégration API externe nécessite credentials ET pas dans Memory
- Choix UX majeur affecte parcours utilisateur critique

### B. MEMORY FIRST ✅

**Workflow Memory:**
1. Check si info existe: `checkpoint-memory.sh get-api <service>`
2. Si existe → Utiliser
3. Si pas existe → Demander UNE FOIS → Sauvegarder immédiatement
4. Ne JAMAIS redemander info déjà sauvegardée

### C. QUALITY FIRST ✅

**Design QA obligatoire:**
- AVANT chaque déploiement
- AVANT de dire "projet terminé"
- AVANT de présenter au client

**Si Lighthouse < 90 → C'est un BLOCAGE, pas une suggestion.**

### D. COORDINATION ACTIVE ✅

**Si Agents 26 actif:**
- Toujours lire `agents/SYNC.md` avant de commencer
- Toujours updater `agents/SYNC.md` pendant et après travail
- Ne jamais modifier même fichier qu'un autre agent sans coordination

### E. API-FIRST TOUJOURS ✅

**JAMAIS dire:** "Va sur le dashboard cliquer ici"
**TOUJOURS:** Faire via API ou CLI

Exemples:
```bash
# ❌ MAL: "Va sur Vercel dashboard ajouter env var"
# ✅ BIEN:
vercel env add STRIPE_KEY production

# ❌ MAL: "Crée manuellement un repo GitHub"
# ✅ BIEN:
gh repo create mon-projet --private --source=. --remote=origin --push

# ❌ MAL: "Ouvre Netlify et déploie"
# ✅ BIEN:
netlify deploy --prod --dir=dist
```

---

## 📖 7. DOCUMENTATION DISPONIBLE

### Localisation Principale
```
/Users/codenolimits-dreamai-nanach/Desktop/🚀 AUTOMATION SYSTEM/
```

### Fichiers Essentiels

1. **📖 LIRE EN PREMIER.md**
   - Guide complet d'utilisation
   - Exemples concrets
   - Workflows

2. **documentation/AUTOMATION_README.md**
   - Guide détaillé (100+ lignes)
   - Tous les outils expliqués

3. **documentation/MASTER_AUTOMATION_PLAN.md**
   - Plan complet (500+ lignes)
   - Architecture système
   - Tous les scripts avec code source

4. **documentation/SYSTEM_STATUS.md**
   - État actuel système
   - Ce qui est installé
   - Prochaines étapes

5. **💡 EXEMPLES.txt**
   - 7 exemples concrets d'utilisation
   - Workflows réels

---

## 🎓 8. PRINCIPES PHILOSOPHIQUES

### Les 3 Piliers

**1. AUTONOMIE TOTALE** 🤖
- Checkpoint Memory → Zéro question répétée
- Agents 26 → Coordination intelligente
- Scripts automation → Tout automatisé

**2. QUALITY WORLD-CLASS** 🏆
- Design QA systématique → Lighthouse > 90 obligatoire
- Benchmarks leaders → Tiffany, Cartier, Stripe
- Validation avant deploy → Jamais de sites "basiques"

**3. AUTOMATION FIRST** ⚡
- APIs, jamais manuel
- Scripts pour tout
- Dashboard monitoring

---

## 🔥 9. EXEMPLES CONCRETS

### Exemple 1: User Demande "Ajouter Paiements Stripe"

**AVANT (Mauvais):**
```
Agent: "Quelle est ta Stripe key?"
User: "sk_test_xxx"
Agent: "OK j'ajoute"
[30 min plus tard, autre session]
Agent: "Quelle est ta Stripe key?"
User: 😡
```

**MAINTENANT (Correct):**
```bash
# 1. Check Memory
STRIPE_KEY=$(bash ~/scripts/checkpoint-memory.sh get-api stripe 2>/dev/null)

# 2. Si existe → Utiliser
if [ ! -z "$STRIPE_KEY" ]; then
  # Utiliser directement
  echo "STRIPE_SECRET_KEY=$STRIPE_KEY" >> .env
else
  # 3. Si pas existe → Demander UNE FOIS
  echo "Stripe key non trouvée en mémoire."
  read -p "Stripe key (sera sauvegardée pour toujours): " key

  # 4. Sauvegarder immédiatement
  bash ~/scripts/checkpoint-memory.sh save-api stripe "$key"

  echo "STRIPE_SECRET_KEY=$key" >> .env
fi
```

### Exemple 2: User Demande "Finaliser Site Bijoux"

**AVANT (Mauvais):**
```
Agent: "Site terminé! Voici le lien"
User ouvre → Design médiocre, lent
User: 😡 "C'est pas niveau Tiffany"
```

**MAINTENANT (Correct):**
```bash
# 1. Build
npm run build

# 2. Deploy
vercel --prod

# 3. Attendre URL
URL=$(vercel --prod 2>&1 | grep -o 'https://[^ ]*')

# 4. Design QA AUTOMATIQUE
bash ~/scripts/design-qa-automation.sh "$URL"

# 5. Analyser résultat
# Si Lighthouse >= 90 → "✅ Site world-class, prêt à livrer"
# Si Lighthouse < 90 → "⚠️ Améliorations nécessaires: Performance 75/100..."
```

### Exemple 3: Coordination Cursor ↔ Claude Code

**Cursor Agent (Frontend):**
```bash
# 1. Avant de travailler
cat agents/SYNC.md | tail -10

# 2. Annoncer
echo "
## [2025-11-17 15:30] Frontend Agent (Cursor)
- 🔄 Working on: Hero component animations
- 📁 Files: src/components/Hero.tsx
" >> agents/SYNC.md

# 3. Travailler
# ... modifications ...

# 4. Commit
git add src/components/Hero.tsx
git commit -m "feat(frontend): Add Hero animations with framer-motion"

# 5. Update SYNC
echo "
## [2025-11-17 15:45] Frontend Agent (Cursor)
- ✅ Completed: Hero animations
- 🔗 Backend Agent: Can now test with /api/hero endpoint
" >> agents/SYNC.md
```

**Claude Code Agent (Backend):**
```bash
# 1. Lire SYNC
cat agents/SYNC.md | tail -20

# 2. Voir que Frontend a terminé Hero

# 3. Annoncer son travail
echo "
## [2025-11-17 15:50] Backend Agent (Claude Code)
- 🔄 Working on: /api/hero endpoint for Hero data
- 📁 Files: src/app/api/hero/route.ts
" >> agents/SYNC.md

# 4. Implémenter
# ... code ...

# 5. Commit & Update
git commit -m "feat(backend): Add /api/hero endpoint with caching"
echo "
## [2025-11-17 16:00] Backend Agent (Claude Code)
- ✅ Completed: /api/hero endpoint
- 📝 Returns: { title, subtitle, cta }
- 🔗 Frontend can call: fetch('/api/hero')
" >> agents/SYNC.md
```

**Résultat:** Coordination parfaite, zéro conflit, travail parallèle efficace.

---

## 🚀 10. QUICK START POUR AGENTS

### Checklist Début de Session

```bash
# 1. Vérifier Memory disponible
bash ~/scripts/checkpoint-memory.sh recall-apis

# 2. Si projet a Agents 26 → Lire SYNC
if [ -d "agents" ]; then
  cat agents/SYNC.md | tail -20
fi

# 3. Vérifier Dashboard pour priorités
# (mentalement noter projets urgents)

# 4. Commencer à travailler avec règles ci-dessus
```

### Checklist Avant Commit

```bash
# 1. Lint & Type check
npm run lint
npm run type-check

# 2. Tests (si applicable)
npm run test

# 3. Build test
npm run build

# 4. Update SYNC si Agents 26
if [ -d "agents" ]; then
  echo "[$(date)] <Agent>: Completed <task>" >> agents/SYNC.md
fi
```

### Checklist Avant Deploy

```bash
# 1. Build production
npm run build

# 2. Deploy
vercel --prod

# 3. DESIGN QA OBLIGATOIRE
URL="https://site.vercel.app"
bash ~/scripts/design-qa-automation.sh "$URL"

# 4. Vérifier scores
# Performance >= 90 ✅
# Accessibility >= 95 ✅
# Best Practices >= 95 ✅
# SEO >= 95 ✅

# 5. Si OK → ✅ Déploiement validé
#    Sinon → ⚠️ Améliorer d'abord
```

---

## 📞 11. SUPPORT & AIDE

**Questions système?** Vérifier dans cet ordre:

1. Ce message (`📢 MESSAGE POUR TOUS LES AGENTS.md`)
2. `~/Desktop/🚀 AUTOMATION SYSTEM/📖 LIRE EN PREMIER.md`
3. `~/Desktop/🚀 AUTOMATION SYSTEM/documentation/AUTOMATION_README.md`
4. `agents/ORCHESTRATOR.md` (dans projets avec Agents 26)

**Problème technique?**
```bash
# Status système complet
bash ~/scripts/quick-start.sh all
```

---

## ⚠️ 12. AVERTISSEMENTS CRITIQUES

### ❌ NE JAMAIS:

1. **Redemander info dans Memory**
   - Check d'abord: `checkpoint-memory.sh get-api <service>`
   - Si existe → Utiliser

2. **Déployer sans Design QA**
   - TOUJOURS: `design-qa-automation.sh <URL>`
   - TOUJOURS vérifier Lighthouse >= 90/95

3. **Ignorer agents/SYNC.md**
   - Si dossier `agents/` existe → LIRE et UPDATER systématiquement

4. **Faire actions manuelles au lieu d'APIs**
   - TOUJOURS utiliser CLI/API (vercel, gh, netlify, etc.)

5. **Créer sites "basiques"**
   - SEULEMENT world-class (benchmark Tiffany, Stripe, etc.)

### ✅ TOUJOURS:

1. **Check Memory AVANT de demander**
2. **Design QA AVANT de déployer**
3. **Update SYNC.md SI Agents 26 actif**
4. **Utiliser APIs, jamais manuel**
5. **Viser Lighthouse > 90 sur tout**

---

## 🎯 RÉSUMÉ ULTRA-CONDENSÉ

**3 Règles à Mémoriser:**

1. **MEMORY FIRST** 🧠
   → Check `checkpoint-memory.sh` avant TOUTE question

2. **DESIGN QA OBLIGATOIRE** 🔍
   → `design-qa-automation.sh` avant TOUT déploiement

3. **COORDINATION VIA SYNC.md** 🤖
   → Lire + Updater `agents/SYNC.md` si dossier existe

**Si tu respectes ces 3 règles, tu es un agent parfait.**

---

## 📍 LOCALISATIONS IMPORTANTES À RETENIR

```bash
# Scripts automation
~/scripts/checkpoint-memory.sh
~/scripts/design-qa-automation.sh
~/scripts/quick-start.sh

# Template Agents 26
~/.claude/templates/agents-26/install-agents.sh

# Memory permanente
~/.claude-memory/

# Dashboard
~/dashboard-central/

# Documentation complète
~/Desktop/🚀 AUTOMATION SYSTEM/
```

---

## ✅ CONFIRMATION DE LECTURE

**Chaque agent (Cursor + Claude Code) DOIT:**

1. ✅ Avoir lu ce message en entier
2. ✅ Comprendre les 3 règles principales
3. ✅ Savoir utiliser checkpoint-memory.sh
4. ✅ Savoir utiliser design-qa-automation.sh
5. ✅ Savoir coordonner via agents/SYNC.md

**Si un agent ne respecte pas ces règles → Il est défaillant.**

---

**FIN DU MESSAGE**

**Date de création:** 2025-11-17
**Version:** 1.0
**Statut:** ACTIF PERMANENT

**Ce message est la source unique de vérité pour tous les agents.**

🚀 **AGISSEZ EN CONSÉQUENCE. ZÉRO EXCEPTION.**
