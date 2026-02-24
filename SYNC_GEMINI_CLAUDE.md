# 🤖 SYNC BIDIRECTIONNEL — Gemini (AntiGravity) ↔ Claude Code

> **Projet :** Esther Ifra — Littérature Breslev
> **Objectif :** 2-Hour Site Blitz (Livraison d'un site World-Class)
> **Production URL visée :** https://breslev-books-preview-1eerhbj7f-dream-ais-projects.vercel.app/

## 📜 PROTOCOLE TRIPARTITE ACTIF

- **AntiGravity (Gemini)** : Design System "Nano Banana", Génération UI/UX avancée, Assets Visuels, Protocoles.
- **Claude Code (CLI)** : Logique Backend (Stripe, Drizzle, API), Intégration CLI.
- **Claude Cowork** : Stratégie, Coordination `ESTHER-IFRAH-COORDINATION.md`, Assurance Qualité.
- **Document de référence :** `TRIPARTITE_PROTOCOL.md` (Voir les artifacts d'AntiGravity).

---

## 🎯 LA MISSION DES 2 HEURES (BLITZ)

Nous avons 2 heures maximum pour transformer ce site en une expérience "World-Class" (niveau Nano Banana), corriger les paiements, intégrer une nouvelle feature (cours quotidiens), améliorer les couvertures, et préparer une stratégie d'upsell réseaux sociaux (2000 ₪).

Pour réussir, nous allons diviser le travail strictement pour ne pas nous marcher dessus.

---

## 🚀 DIVISION DES TÂCHES

### 🎨 GEMINI / ANTIGRAVITY (Design, UI/UX, Assets & Stratégie)

_Je me concentre sur l'aspect visuel, l'expérience utilisateur, les assets graphiques et la stratégie de vente._

1. **Refonte UI/UX "World-Class"**
   - Implémenter un design ultra-premium, immersif (animations subtiles, typographie avancée).
   - _Architecture :_ Tailwind CSS 4, Framer Motion, Radix UI.
2. **Amélioration des Couvertures de Livres**
   - Générer/améliorer les couvertures existantes pour un rendu plus pro (utilisation de l'outil Canvas/génération si nécessaire).
3. **Expérience de lecture en ligne (PDF)**
   - Vérifier et sublimer l'UI du lecteur PDF intégré.
4. **Stratégie Social Media (Upsell 2000 ₪)**
   - Élaborer un plan d'action (TikTok, Facebook, YouTube, Instagram) basé sur le contexte.

### ⚙️ CLAUDE CODE (Backend, Intégrations & Features Core)

_Tu te concentres sur la robustesse technique, les paiements et les nouvelles fonctionnalités d'administration._

1. **Intégration Paiement (Stripe)**
   - Finaliser et debugger le flux de paiement pour qu'il soit 100% opérationnel (compte Stripe de David pour l'instant).
   - Gérer la conversion centimes/shekels si nécessaire.
2. **Feature : Upload de Cours Quotidiens**
   - Créer une interface d'administration sécurisée (accès spécial pour Esther).
   - Permettre l'upload audio/vidéo/texte quotidien.
   - Gérer le stockage (S3 ou Vercel Blob) et l'affichage côté client.
3. **Correction des bugs restants (issus de la session précédente)**
   - Si des images manquent dans le bundle, assurer le bon routing statique.

---

## 🔔 DERNIÈRE ACTION (par Gemini/AntiGravity)

- **Quand :** 2026-02-24 (2-Hour Blitz)
- **Quoi :**
  - **V1 (Original) :** Images WhatsApp originales copiées dans `client/public/images/livres/`. `seed.ts` fonctionne avec ces images (Zéro crédit cramé).
  - **V2 (Nano Banana Luxe) :** Nouvelles couvertures générées par IA (Style hyper-réaliste 3D Luxe) enregistrées dans le dossier `client/public/images/livres_v2_nano_banana/`. Ces images pourront être utilisées pour une version premium du site !
  - **Revue Design Cowork :** Les composants `BookCard`, `Footer` et la page `APropos` ont été refaits avec Framer Motion, des dégradés luxe et du CSS premium.
  - Stratégie Réseaux Sociaux pour upsell (2000₪) terminée (document `ESTHER_UPSALE_STRATEGY.md`).
- **Fichiers modifiés :** `index.css`, `index.html`, `Home.tsx`, `Header.tsx`, `PDFReader.tsx`, `BookCard.tsx`, `Footer.tsx`, `APropos.tsx`, `ESTHER_UPSALE_STRATEGY.md`
- **Status :** ✅ OK — Tout mon scope (Design / Stratégie / Setup assets V1 & V2) est 100% complété selon les directives de Cowork.

## ➡️ PROCHAINE ACTION (pour Claude Code)

- **Priorité :** 🔴 Urgent
- **Tâche :**
  1. Continuer et finaliser les paiements Stripe.
  2. Créer l'interface d'administration pour l'upload de cours quotidiens.
- **Fichiers concernés :** `server/routers.ts`, `api/`, dossier `/admin`.
- **Contexte :** Tu as carte blanche sur le backend. Les images de couverture V1 sont DÉJÀ dans `/public/images/livres/` et le `seed.ts` est bon. Tu n'as plus à t'en soucier ! Focus sur Stripe et l'admin.
