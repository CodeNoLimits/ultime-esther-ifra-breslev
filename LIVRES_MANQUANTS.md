# 📚 5 LIVRES À AJOUTER (Pour atteindre 20)

**Statut actuel**: 15/20 livres en ligne
**Objectif**: Ajouter 5 livres cette semaine

---

## 📋 LIVRES ACTUELS (15)

✅ La Vie d'un Breslever
✅ Likoutey Moharane - Tome 1
✅ Likoutey Moharane - Tome 4
✅ Likoutey Moharane - Tome 5
✅ Likoutey Moharane - Tome 6
✅ Likoutey Moharane - Tome 7 (Tinyana)
✅ Likoutey Moharane - Tome 8
✅ Le Voyage de Rabbi Nahman
✅ Conversations des Anges - Tome 2
✅ Chemot Atsadikim
✅ Azamra
✅ Likoutey Tefilot
✅ L'Âge d'Or de Breslev
✅ Rabbi Nahman 2014
✅ Tikoun Haklali Phonétique

---

## 🎯 LIVRES MANQUANTS (5)

**À choisir parmi les PDFs existants** (voir dossier `LIVRES PDF/`):

### Option 1: Compléter la série Likoutey Moharane
❌ **Likoutey Moharane - Tome 2** (LM2)
❌ **Likoutey Moharane - Tome 3** (LM3)

### Option 2: Ajouter d'autres œuvres majeures
❌ **Sipourey Maasiot** (Les Contes de Rabbi Nachman)
- Catégorie: Récits & Inspiration
- Prix suggéré: 100₪ (10000 centimes)
- Pages: ~200

❌ **Likoutey Halakhot** (compilation ou extrait)
- Catégorie: Enseignements Fondamentaux
- Prix suggéré: 130₪ (13000 centimes)
- Pages: ~300

❌ **Hishtapkhout HaNefesh** (Guide de la prière personnelle)
- Catégorie: Prière & Protection
- Prix suggéré: 45₪ (4500 centimes)
- Pages: ~100

---

## 🔧 COMMENT AJOUTER UN LIVRE

### Étape 1: Préparer les fichiers
```bash
# Placer la couverture
cp couverture.jpg public/images/livres/nouveau-livre.jpg

# Placer le PDF
cp livre.pdf public/pdfs/nouveau-livre.pdf
```

### Étape 2: Ajouter au seed.ts
```typescript
// Dans booksData array
{
  titleFr: "Titre en Français",
  titleEn: "English Title",
  titleHe: "כותרת בעברית",
  slug: "titre-en-francais",
  author: "Rabbi Nachman de Breslev",
  descriptionFr: "Description...",
  pages: 200,
  language: "fr" as const,
  categoryId: 1, // 1-5
  type: "book" as const,
  pricePhysical: 10000, // 100₪ en centimes
  priceDigital: 6000, // 60₪ en centimes
  weight: 400,
  coverImageUrl: "/images/livres/nouveau-livre.jpg",
  pdfUrl: "/pdfs/nouveau-livre.pdf",
  featured: false,
  includedInSubscription: true,
},
```

### Étape 3: Re-seed + Redeploy
```bash
rm sqlite.db
pnpm tsx scripts/migrate.ts
pnpm tsx scripts/seed.ts
vercel --yes --prod
```

---

## 📞 CONTACT ESTHER

**Avant d'ajouter les livres**, demander à Esther:
- Quels 5 livres elle veut en priorité ?
- Quels prix pour chaque livre ?
- A-t-elle les couvertures HD ?

**Téléphone**: +972 58-514-8500

---

## ⏱️ TEMPS ESTIMÉ

| Tâche | Durée |
|-------|-------|
| Préparer 5 couvertures + PDFs | 30 min |
| Ajouter au seed.ts | 20 min |
| Re-seed + test local | 10 min |
| Deploy Vercel | 5 min |
| **TOTAL** | **~1 heure** |

---

**Créé par**: Claude Sonnet 4.5
**Date**: 12 février 2026
