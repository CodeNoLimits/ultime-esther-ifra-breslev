# 🚀 CHECKLIST DE DÉMARRAGE DE PROJET WEB

> **Philosophie** : Collecter TOUS les "ingrédients" nécessaires AVANT de commencer à cuisiner le projet. Cela garantit un développement fluide sans interruptions pour demander des credentials manquants.

---

## 🎯 OBJECTIF

Avant d'écrire une seule ligne de code, cette checklist doit être **100% complétée**.

**Pourquoi ?**
- ✅ Évite les allers-retours frustrants ("Ah au fait, j'ai besoin de la clé Stripe...")
- ✅ Permet de travailler en continu sans blocages
- ✅ Garantit que toutes les intégrations sont anticipées
- ✅ Facilite l'automatisation via API dès le début

---

## 📋 QUESTIONNAIRE INITIAL (À REMPLIR AVANT DÉMARRAGE)

### 1️⃣ INFORMATIONS GÉNÉRALES DU PROJET

```
Nom du projet : ____________________________________
Domaine d'activité : ________________________________
Type de site : [ ] E-commerce [ ] SaaS [ ] Portfolio [ ] Blog [ ] Autre: _______
URL souhaitée (si déjà achetée) : ___________________
Délai de livraison : ________________________________
```

---

### 2️⃣ HÉBERGEMENT & DÉPLOIEMENT

#### Plateforme de déploiement choisie

```
[ ] Vercel
    - Token API : _____________________________________
    - Compte email : __________________________________

[ ] Netlify
    - Token API : _____________________________________
    - Compte email : __________________________________

[ ] Shopify (si e-commerce)
    - Nom du store : __________________________________
    - Admin API Access Token : ________________________
    - Storefront API Token : ___________________________
    - Compte email : __________________________________

[ ] Cloudflare Pages
    - API Token : _____________________________________

[ ] Autre : ____________________________________________
    - Credentials : ____________________________________
```

**IMPORTANT** : Fournir les tokens API, **PAS** les mots de passe. Les tokens sont plus sécurisés et permettent l'automatisation.

---

### 3️⃣ DOMAINE & DNS

```
Nom de domaine : _______________________________________

Registrar (où le domaine a été acheté) :
[ ] Namecheap
[ ] GoDaddy
[ ] OVH
[ ] Cloudflare
[ ] Autre : ____________________________________________

Credentials pour accès DNS :
- Login : ______________________________________________
- API Key (si disponible) : ____________________________

Domaine déjà configuré ? [ ] Oui [ ] Non
```

---

### 4️⃣ BASE DE DONNÉES

#### Choix de la base de données

```
[ ] Supabase (RECOMMANDÉ)
    - Project URL : ___________________________________
    - Anon Key : ______________________________________
    - Service Role Key : _______________________________

[ ] Vercel Postgres
    - Connection String : ______________________________

[ ] MongoDB Atlas
    - Connection String : ______________________________

[ ] Railway
    - Database URL : ___________________________________

[ ] Autre : ____________________________________________
    - Connection String : ______________________________
```

**Note** : Pour les projets simples sans backend, une base de données peut ne pas être nécessaire.

---

### 5️⃣ AUTHENTIFICATION (si applicable)

```
[ ] Supabase Auth (inclus si Supabase DB)

[ ] Clerk
    - Publishable Key : ________________________________
    - Secret Key : _____________________________________

[ ] Auth0
    - Domain : _________________________________________
    - Client ID : ______________________________________
    - Client Secret : __________________________________

[ ] NextAuth.js (self-hosted)

[ ] Pas d'auth nécessaire
```

---

### 6️⃣ PAIEMENT (si e-commerce / SaaS)

```
[ ] Stripe (RECOMMANDÉ)
    - Publishable Key (Test) : _________________________
    - Secret Key (Test) : _______________________________
    - Publishable Key (Live) : __________________________
    - Secret Key (Live) : _______________________________
    - Webhook Secret : __________________________________

[ ] PayPal
    - Client ID : ______________________________________
    - Client Secret : __________________________________

[ ] Square
    - Application ID : _________________________________
    - Access Token : ___________________________________

[ ] Pas de paiement nécessaire
```

**IMPORTANT** : Toujours commencer avec les clés de **test** pour éviter les transactions accidentelles.

---

### 7️⃣ STOCKAGE D'IMAGES / FICHIERS

```
[ ] Cloudinary (RECOMMANDÉ)
    - Cloud Name : _____________________________________
    - API Key : ________________________________________
    - API Secret : _____________________________________

[ ] Vercel Blob
    - Token : __________________________________________

[ ] Uploadthing
    - App ID : _________________________________________
    - Secret : _________________________________________

[ ] AWS S3
    - Bucket Name : ____________________________________
    - Access Key ID : __________________________________
    - Secret Access Key : _______________________________

[ ] Pas de stockage externe nécessaire (images locales)
```

---

### 8️⃣ EMAIL / TRANSACTIONNEL

```
[ ] Resend (RECOMMANDÉ pour Next.js)
    - API Key : ________________________________________

[ ] SendGrid
    - API Key : ________________________________________

[ ] Postmark
    - Server API Token : _______________________________

[ ] Mailgun
    - API Key : ________________________________________
    - Domain : _________________________________________

[ ] SMTP Custom
    - Host : ___________________________________________
    - Port : ___________________________________________
    - User : ___________________________________________
    - Password : _______________________________________

[ ] Pas d'email nécessaire
```

---

### 9️⃣ ANALYTICS & TRACKING

```
[ ] Google Analytics
    - Measurement ID (GA4) : ___________________________

[ ] Plausible Analytics
    - Domain : _________________________________________

[ ] Vercel Analytics (gratuit, pas de setup)

[ ] Fathom Analytics
    - Site ID : ________________________________________

[ ] Pas d'analytics pour l'instant
```

---

### 🔟 ERROR TRACKING / MONITORING

```
[ ] Sentry
    - DSN : ____________________________________________

[ ] LogRocket
    - App ID : _________________________________________

[ ] Pas de monitoring pour l'instant
```

---

### 1️⃣1️⃣ CMS (si site de contenu)

```
[ ] Sanity
    - Project ID : _____________________________________
    - Dataset : ________________________________________
    - API Token : ______________________________________

[ ] Contentful
    - Space ID : _______________________________________
    - Access Token : ___________________________________

[ ] Strapi (self-hosted)
    - API URL : ________________________________________
    - API Token : ______________________________________

[ ] WordPress (Headless)
    - Site URL : _______________________________________
    - Application Password : ____________________________

[ ] Pas de CMS nécessaire (contenu en dur)
```

---

### 1️⃣2️⃣ INTELLIGENCE ARTIFICIELLE (si applicable)

```
[ ] Anthropic (Claude)
    - API Key : ________________________________________

[ ] OpenAI (GPT)
    - API Key : ________________________________________

[ ] Google (Gemini)
    - API Key : ________________________________________

[ ] Replicate (pour images/modèles)
    - API Token : ______________________________________

[ ] Pas d'IA nécessaire
```

---

### 1️⃣3️⃣ RECHERCHE / SEARCH

```
[ ] Algolia
    - Application ID : _________________________________
    - Search API Key : __________________________________
    - Admin API Key : ___________________________________

[ ] Typesense
    - Host : ___________________________________________
    - API Key : ________________________________________

[ ] Shopify Search (natif)

[ ] Recherche native JavaScript (pas de service externe)
```

---

### 1️⃣4️⃣ INTÉGRATIONS SPÉCIFIQUES

#### Social Media

```
[ ] Facebook/Instagram
    - App ID : _________________________________________
    - App Secret : _____________________________________

[ ] Twitter/X
    - API Key : ________________________________________
    - API Secret : _____________________________________
```

#### Marketing

```
[ ] Klaviyo (email marketing e-commerce)
    - Private API Key : _________________________________

[ ] Mailchimp
    - API Key : ________________________________________
    - Audience ID : ____________________________________
```

#### Autres intégrations

```
Liste des APIs/Services à intégrer :
1. ____________________________________________________
2. ____________________________________________________
3. ____________________________________________________
```

---

### 1️⃣5️⃣ REPOSITORY & VERSION CONTROL

```
[ ] GitHub
    - Username : _______________________________________
    - Personal Access Token : ___________________________

[ ] GitLab
    - Username : _______________________________________
    - Access Token : ___________________________________

[ ] Bitbucket
    - Username : _______________________________________
    - App Password : ___________________________________
```

**Automatisation recommandée** :
- Utiliser `gh` CLI pour GitHub (authentification OAuth simplifiée)
- Connecter Vercel/Netlify au repo pour auto-deploy

---

### 1️⃣6️⃣ CONTENUS & ASSETS

```
[ ] Logo fourni ? [ ] Oui [ ] Non
    - Format : [ ] SVG [ ] PNG [ ] PDF
    - Localisation : ___________________________________

[ ] Palette de couleurs définie ? [ ] Oui [ ] Non
    - Primaire : _______________________________________
    - Secondaire : _____________________________________
    - Accent : _________________________________________

[ ] Typographie choisie ? [ ] Oui [ ] Non
    - Headings : _______________________________________
    - Body : ___________________________________________

[ ] Images/Photos disponibles ? [ ] Oui [ ] Non
    - Source : [ ] Unsplash [ ] Client [ ] À créer

[ ] Textes/Copywriting rédigés ? [ ] Oui [ ] Non
    - Qui rédige : [ ] Client [ ] Jules [ ] IA
```

---

### 1️⃣7️⃣ DONNÉES PRODUITS (E-commerce)

```
[ ] Catalogue produits disponible ? [ ] Oui [ ] Non

Format :
[ ] CSV
[ ] Excel
[ ] JSON
[ ] Google Sheets
[ ] Base de données existante

Localisation du fichier : _______________________________

Champs disponibles :
[ ] Titre
[ ] Description
[ ] Prix
[ ] Images (URLs ou fichiers)
[ ] SKU
[ ] Poids/Dimensions
[ ] Stock
[ ] Variantes (tailles, couleurs, etc.)
```

---

## ✅ VALIDATION FINALE

**Avant de commencer le développement, confirme :**

```
[ ] J'ai rempli TOUTES les sections applicables à mon projet
[ ] J'ai fourni les tokens API (pas les mots de passe)
[ ] J'ai accès à tous les services tiers nécessaires
[ ] J'ai les assets de design (logo, couleurs, typo)
[ ] J'ai le contenu ou une source pour le générer
[ ] J'ai défini le domaine et l'hébergement
[ ] J'ai un dépôt Git configuré (ou prêt à être créé)
```

**Si une case n'est PAS cochée** : Stopper et compléter AVANT de coder.

---

## 🔒 SÉCURITÉ DES CREDENTIALS

### Stockage sécurisé

**Jamais dans Git !**

Utilise un gestionnaire de mots de passe :
- **1Password** (recommandé pour équipes)
- **Bitwarden** (open-source)
- **LastPass**

Ou un fichier `.env.local` (Git-ignoré) :

```bash
# .env.local (JAMAIS commit)
STRIPE_SECRET_KEY=sk_test_xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx
```

### Partage avec Jules

Si tu travailles avec moi (Claude Code) :
- ✅ Colle les credentials dans le chat (ils ne sont pas stockés)
- ✅ Ou donne-moi le chemin vers le fichier `.env.local`
- ❌ Ne les mets JAMAIS dans le code source

---

## 📦 TEMPLATE DE RÉPONSE RAPIDE

Pour faciliter, copie-colle ce template et remplis-le :

```markdown
## PROJET : [Nom du projet]

### Hébergement
- Plateforme : Vercel
- Token API : vercel_xxxxx

### Base de données
- Type : Supabase
- Project URL : https://xxxxx.supabase.co
- Anon Key : eyJxxx
- Service Role Key : eyJxxx

### Paiement
- Stripe Publishable (Test) : pk_test_xxxxx
- Stripe Secret (Test) : sk_test_xxxxx

### Stockage
- Cloudinary Cloud Name : xxxxx
- API Key : xxxxx
- API Secret : xxxxx

### Email
- Resend API Key : re_xxxxx

### Domaine
- Nom : example.com
- Registrar : Namecheap
- DNS API Key : xxxxx

### Repository
- GitHub : https://github.com/user/repo
- Token : ghp_xxxxx

### Assets
- Logo : /chemin/vers/logo.svg
- Couleurs : #1A1A1A (primaire), #D4AF37 (accent)
- Typo : Inter (headings), Crimson Pro (body)
```

---

## 🎓 NOTES POUR JULES

### Quand tu reçois cette checklist remplie :

1. **Valide** que tous les champs critiques sont fournis
2. **Teste** les credentials (un appel API rapide)
3. **Crée** le fichier `.env.local` avec toutes les clés
4. **Configure** le repo Git et connecte Vercel/Netlify
5. **Lance** l'Agent 1 (Architecte) du framework 15 agents

### Si un champ manque :

Demande poliment mais fermement :
> "Pour avancer sur [fonctionnalité], j'ai besoin de [credential]. Peux-tu me fournir [nom exact du token] ?"

### Automatisation via API :

Privilégie **TOUJOURS** l'API aux actions manuelles :
- ✅ Créer un projet Vercel via API
- ✅ Configurer le domaine via API
- ✅ Uploader des images sur Cloudinary via API
- ❌ Demander au user d'aller sur le dashboard et cliquer

---

**Cette checklist est ton contrat de démarrage. Si elle est complète, le projet sera fluide. Si elle est incomplète, ce sera un parcours semé d'embûches.**

**Version** : 1.0
**Dernière mise à jour** : 2025-01-21
