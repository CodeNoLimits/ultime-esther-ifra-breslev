# 🚀 QUICK START — Esther Ifra Breslev

**Projet**: E-commerce livres Breslev
**Stack**: React 19 + Express + SQLite (LibSQL) + tRPC
**Statut**: ✅ Migration SQLite complète

---

## ⚡ DÉMARRAGE RAPIDE (30 secondes)

```bash
cd /Users/codenolimits-dreamai-nanach/Desktop/_PROJETS/ULTIME-PROJECTS/ultime-esther-ifra-breslev

# 1. Installer les dépendances (si pas déjà fait)
pnpm install

# 2. Lancer le serveur dev
pnpm dev

# 3. Ouvrir le navigateur
open http://localhost:3000
```

**Port**: 3000
**Homepage**: Affiche 3 livres featured
**Boutique**: `/boutique` — Liste les 15 livres

---

## 📚 STRUCTURE

```
ultime-esther-ifra-breslev/
├── client/               # Frontend React 19
│   └── src/
│       ├── pages/       # Home, Boutique, Produit, etc.
│       └── components/  # BookCard, PDFReader, etc.
├── server/              # Backend Express + tRPC
│   ├── db.ts           # Fonctions DB (LibSQL)
│   └── routers.ts      # API tRPC
├── drizzle/
│   └── schema.ts       # Schema SQLite (13 tables)
├── scripts/
│   ├── migrate.ts      # Créer tables
│   └── seed.ts         # Peupler base (15 livres)
└── sqlite.db           # Base de données locale
```

---

## 🔧 COMMANDES

### Développement
```bash
pnpm dev              # Serveur dev (port 3000)
pnpm check            # Vérifier TypeScript
```

### Base de données
```bash
# Réinitialiser la base
rm sqlite.db
pnpm tsx scripts/migrate.ts
pnpm tsx scripts/seed.ts

# Inspecter les données
sqlite3 sqlite.db
> SELECT * FROM books LIMIT 3;
> .exit
```

### Production
```bash
pnpm build            # Build client + server
pnpm start            # Lancer en prod
```

---

## 📖 DONNÉES

**15 livres** en base:
- La Vie d'un Breslever (80₪)
- Likoutey Moharane Tomes 1-8 (115-120₪)
- Azamra (25₪)
- Likoutey Tefilot (150₪)
- L'Âge d'Or de Breslev (100₪)
- ...

**5 catégories**:
- Enseignements Fondamentaux
- Biographie & Témoignage
- Récits & Histoire
- Récits & Inspiration
- Prière & Protection

**3 plans d'abonnement**:
- Mensuel: 49₪/mois
- Annuel: 490₪/an (2 mois gratuits)
- Familial: 690₪/an (5 appareils)

---

## 🎨 PAGES DISPONIBLES

| Route | Description |
|-------|-------------|
| `/` | Homepage (3 livres featured) |
| `/boutique` | Catalogue complet (15 livres) |
| `/livre/:slug` | Détails d'un livre |
| `/abonnements` | Plans d'abonnement |
| `/a-propos` | À propos |
| `/contact` | Contact |
| `/espace-membre` | Espace membre (auth requis) |

---

## 🔐 AUTHENTIFICATION

**Statut**: OAuth non configuré en dev local (normal)

**Si tu veux tester l'auth**: Créer `.env`:
```env
OAUTH_SERVER_URL=https://your-oauth-server.com
VITE_OAUTH_PORTAL_URL=https://your-oauth-portal.com
VITE_APP_ID=your-app-id
```

**Fonctionnalités protégées** (nécessitent auth):
- Favoris
- Panier
- Progression de lecture

---

## 📞 CLIENT

**Nom**: Esther Ifrah
**Téléphone**: +972 58-514-8500
**Statut**: CRITICAL — menacé d'abandon
**Priorité**: Montrer les progrès rapidement

---

## 📝 DOCUMENTATION

- **AUDIT_RESULTS_FEB12.md** — Rapport complet
- **GUIDE_POST_AUDIT.md** — Prochaines étapes
- **SESSION_AUDIT_SQLITE_FEB12.md** — Log de session

---

**Dernière MAJ**: 12 février 2026, 18:50 IST
**Par**: Claude Sonnet 4.5
