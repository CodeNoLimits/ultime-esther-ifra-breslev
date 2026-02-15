import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { books, categories, subscriptionPlans } from "../drizzle/schema";

const client = process.env.TURSO_DATABASE_URL
  ? createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
  : createClient({ url: "file:sqlite.db" });
const db = drizzle(client);

console.log("🌱 Début du seed de la base de données SQLite (LibSQL)...\n");

// Vider les tables existantes
console.log("🗑️  Nettoyage des tables existantes...");
await db.delete(books);
await db.delete(categories);
await db.delete(subscriptionPlans);

// Créer les catégories
console.log("\n📚 Création des catégories...");
const categoriesData = [
  {
    id: 1,
    nameEn: "Fundamental Teachings",
    nameFr: "Enseignements Fondamentaux",
    nameHe: "תורות יסוד",
    slug: "enseignements-fondamentaux",
  },
  {
    id: 2,
    nameEn: "Biography & Testimony",
    nameFr: "Biographie & Témoignage",
    nameHe: "ביוגרפיה ועדות",
    slug: "biographie-temoignage",
  },
  {
    id: 3,
    nameEn: "Stories & History",
    nameFr: "Récits & Histoire",
    nameHe: "סיפורים והיסטוריה",
    slug: "recits-histoire",
  },
  {
    id: 4,
    nameEn: "Stories & Inspiration",
    nameFr: "Récits & Inspiration",
    nameHe: "סיפורים והשראה",
    slug: "recits-inspiration",
  },
  {
    id: 5,
    nameEn: "Prayer & Protection",
    nameFr: "Prière & Protection",
    nameHe: "תפילה והגנה",
    slug: "priere-protection",
  },
];

for (const cat of categoriesData) {
  await db.insert(categories).values(cat);
  console.log(`  ✓ ${cat.nameFr}`);
}

// Créer les plans d'abonnement
console.log("\n💎 Création des plans d'abonnement...");
const plansData = [
  {
    id: 1,
    nameEn: "Monthly",
    nameFr: "Mensuel",
    nameHe: "חודשי",
    slug: "mensuel",
    descriptionEn: "Access to the full digital library",
    descriptionFr: "Accès à toute la bibliothèque digitale",
    descriptionHe: "גישה לכל הספרייה הדיגיטלית",
    price: 49,
    duration: "monthly" as const,
    maxDevices: 1,
    active: true,
  },
  {
    id: 2,
    nameEn: "Yearly",
    nameFr: "Annuel",
    nameHe: "שנתי",
    slug: "annuel",
    descriptionEn: "Access to the full digital library + 2 months free",
    descriptionFr: "Accès à toute la bibliothèque digitale + 2 mois gratuits",
    descriptionHe: "גישה לכל הספרייה הדיגיטלית + חודשיים חינם",
    price: 490,
    duration: "yearly" as const,
    maxDevices: 1,
    active: true,
  },
  {
    id: 3,
    nameEn: "Family",
    nameFr: "Familial",
    nameHe: "משפחתי",
    slug: "familial",
    descriptionEn: "Access for 5 devices",
    descriptionFr: "Accès pour 5 appareils",
    descriptionHe: "גישה ל-5 מכשירים",
    price: 690,
    duration: "family" as const,
    maxDevices: 5,
    active: true,
  },
];

for (const plan of plansData) {
  await db.insert(subscriptionPlans).values(plan);
  console.log(`  ✓ ${plan.nameFr} - ${plan.price}₪`);
}

// Créer les livres
console.log("\n📖 Création des livres...");
const booksData = [
  // 1. La Vie d'un Breslever
  {
    titleFr: "La Vie d'un Breslever",
    titleEn: "The Life of a Breslever",
    titleHe: "חייו של חסיד ברסלב",
    slug: "la-vie-dun-breslever",
    author: "Rav Lévy Its'hak Bender",
    descriptionFr:
      "Ce livre retrace la vie authentique de Rav Lévy Its'hak Bender, la dernière image Breslev venant d'Ouman.",
    pages: 218,
    language: "fr" as const,
    categoryId: 2,
    type: "book" as const,
    pricePhysical: 8000, // 80₪ en centimes
    priceDigital: 5000, // 50₪ en centimes
    weight: 350,
    coverImageUrl: "/images/livres/IMG-20251027-WA0190.jpg",
    pdfUrl: "/pdfs/LaVied'unBreslever.pdf",
    featured: true,
    includedInSubscription: true,
  },
  // 2. LM1
  {
    titleFr: "Likoutey Moharane - Tome 1",
    titleEn: "Likutey Moharan - Vol 1",
    titleHe: 'ליקוטי מוהר"ן - חלק א',
    slug: "likoutey-moharane-1",
    author: "Rabbi Nachman de Breslev",
    descriptionFr:
      "Le livre fondamental des enseignements de Rabbi Nachman de Breslev. Première partie.",
    pages: 280,
    language: "fr" as const,
    categoryId: 1,
    type: "book" as const,
    pricePhysical: 12000, // 120₪ en centimes
    priceDigital: 7000, // 70₪ en centimes
    weight: 450,
    coverImageUrl: "/images/livres/WhatsAppImage2025-10-31at01.25.29.jpeg",
    pdfUrl: "/pdfs/LikouteyMoharane1.pdf",
    featured: true,
    includedInSubscription: true,
  },
  // 3. LM4
  {
    titleFr: "Likoutey Moharane - Tome 4",
    titleEn: "Likutey Moharan - Vol 4",
    titleHe: 'ליקוטי מוהר"ן - חלק ד',
    slug: "likoutey-moharane-4",
    author: "Rabbi Nachman de Breslev",
    descriptionFr:
      "Quatrième partie du livre fondamental des enseignements de Rabbi Nachman.",
    pages: 250,
    language: "fr" as const,
    categoryId: 1,
    type: "book" as const,
    pricePhysical: 12000, // 120₪ en centimes
    priceDigital: 7000, // 70₪ en centimes
    weight: 420,
    coverImageUrl: "/images/livres/IMG-20251110-WA0181.jpg",
    pdfUrl: "/pdfs/LikouteyMoharane4.pdf",
    featured: true,
    includedInSubscription: true,
  },
  // 4. LM5
  {
    titleFr: "Likoutey Moharane - Tome 5",
    titleEn: "Likutey Moharan - Vol 5",
    titleHe: 'ליקוטי מוהר"ן - חלק ה',
    slug: "likoutey-moharane-5",
    author: "Rabbi Nachman de Breslev",
    descriptionFr: "Cinquième partie du livre fondamental de Rabbi Nachman.",
    pages: 240,
    language: "fr" as const,
    categoryId: 1,
    type: "book" as const,
    pricePhysical: 11500, // 115₪ en centimes
    priceDigital: 6800, // 68₪ en centimes
    weight: 410,
    coverImageUrl: "/images/livres/IMG-20251110-WA0182.jpg",
    pdfUrl: "/pdfs/LM5.pdf",
    featured: false,
    includedInSubscription: true,
  },
  // 5. LM6
  {
    titleFr: "Likoutey Moharane - Tome 6",
    titleEn: "Likutey Moharan - Vol 6",
    titleHe: 'ליקוטי מוהר"ן - חלק ו',
    slug: "likoutey-moharane-6",
    author: "Rabbi Nachman de Breslev",
    descriptionFr: "Sixième partie des enseignements de Rabbi Nachman.",
    pages: 235,
    language: "fr" as const,
    categoryId: 1,
    type: "book" as const,
    pricePhysical: 11500, // 115₪ en centimes
    priceDigital: 6800, // 68₪ en centimes
    weight: 405,
    coverImageUrl: "/images/livres/IMG-20251110-WA0183.jpg",
    pdfUrl: "/pdfs/LM6.pdf",
    featured: false,
    includedInSubscription: true,
  },
  // 6. LM7
  {
    titleFr: "Likoutey Moharane - Tome 7 (Tinyana)",
    titleEn: "Likutey Moharan - Vol 7",
    titleHe: 'ליקוטי מוהר"ן תניינא',
    slug: "likoutey-moharane-7-tinyana",
    author: "Rabbi Nachman de Breslev",
    descriptionFr: "Septième partie - Tinyana (Seconde série).",
    pages: 245,
    language: "fr" as const,
    categoryId: 1,
    type: "book" as const,
    pricePhysical: 11800, // 118₪ en centimes
    priceDigital: 6900, // 69₪ en centimes
    weight: 415,
    coverImageUrl: "/images/livres/IMG-20251110-WA0184.jpg",
    pdfUrl: "/pdfs/LM7.pdf",
    featured: false,
    includedInSubscription: true,
  },
  // 7. Voyage Rabbi Nahman
  {
    titleFr: "Le Voyage de Rabbi Nahman",
    titleEn: "The Journey of Rabbi Nachman",
    titleHe: "מסע רבי נחמן",
    slug: "le-voyage-de-rabbi-nahman",
    author: "Compilation Mayanot Hatsadik",
    descriptionFr:
      "Récit extraordinaire du voyage de Rabbi Nachman en Terre d'Israël.",
    pages: 180,
    language: "fr" as const,
    categoryId: 3,
    type: "book" as const,
    pricePhysical: 9500, // 95₪ en centimes
    priceDigital: 5800, // 58₪ en centimes
    weight: 320,
    coverImageUrl: "/images/livres/IMG-20251110-WA0187.jpg",
    pdfUrl: "/pdfs/LevoyagedeRabbiNahman.pdf",
    featured: false,
    includedInSubscription: true,
  },
  // 8. Conversations Anges 2
  {
    titleFr: "Conversations des Anges - Tome 2",
    titleEn: "Conversations of Angels - Vol 2",
    titleHe: "שיחות המלאכים - כרך ב",
    slug: "conversations-des-anges-2",
    author: "Breslev",
    descriptionFr:
      "Deuxième tome du recueil de conversations et anecdotes Breslev.",
    pages: 220,
    language: "fr" as const,
    categoryId: 4,
    type: "book" as const,
    pricePhysical: 8800, // 88₪ en centimes
    priceDigital: 5200, // 52₪ en centimes
    weight: 360,
    coverImageUrl: "/images/livres/WhatsAppImage2025-11-10at21.47.57.jpeg",
    pdfUrl: "/pdfs/conversations.pdf",
    featured: false,
    includedInSubscription: true,
  },
  // 9. Chemot Atsadikim
  {
    titleFr: "Chemot Atsadikim - Les Noms des Tsadikim",
    titleEn: "Names of the Tzadikim",
    titleHe: "שמות הצדיקים",
    slug: "chemot-atsadikim",
    author: "Breslev",
    descriptionFr: "Guide spirituel sur le pouvoir des noms des Tsadikim.",
    pages: 224,
    language: "fr" as const,
    categoryId: 5,
    type: "book" as const,
    pricePhysical: 6500, // 65₪ en centimes
    priceDigital: 3800, // 38₪ en centimes
    weight: 340,
    coverImageUrl: "/images/livres/WhatsAppImage2025-11-10at21.45.14.jpeg",
    pdfUrl: null, // Pas de PDF mentionné pour celui-ci
    featured: false,
    includedInSubscription: false,
  },
  // 10. Likoutey 8
  {
    titleFr: "Likoutey Moharane - Tome 8",
    titleEn: "Likutey Moharan - Vol 8",
    titleHe: 'ליקוטי מוהר"ן - חלק ח',
    slug: "likoutey-moharane-8",
    author: "Rabbi Nachman de Breslev",
    descriptionFr: "Huitième partie des enseignements de Rabbi Nachman.",
    pages: 240,
    language: "fr" as const,
    categoryId: 1,
    type: "book" as const,
    pricePhysical: 11800, // 118₪ en centimes
    priceDigital: 6900, // 69₪ en centimes
    weight: 410,
    coverImageUrl: null,
    pdfUrl: "/pdfs/ליקוטי 8.pdf", // "Likoutey 8.pdf"
    featured: false,
    includedInSubscription: true,
  },
  // 11. Azamra
  {
    titleFr: "Azamra - Je Chanterai",
    titleEn: "Azamra",
    titleHe: "אזמרה",
    slug: "azamra",
    author: "Rabbi Nachman de Breslev",
    descriptionFr:
      "L'enseignement fondamental sur le fait de trouver le bien en chacun.",
    pages: 60,
    language: "fr" as const,
    categoryId: 1,
    type: "brochure" as const,
    pricePhysical: 2500, // 25₪ en centimes
    priceDigital: 1500, // 15₪ en centimes
    weight: 100,
    coverImageUrl: "/images/livres/WhatsAppImage2025-10-31at01.25.29.jpeg", // Placeholder
    pdfUrl: "/pdfs/עטיפה אזמרה.pdf", // Only cover PDF provided? Or booklet? Assuming content
    featured: true,
    includedInSubscription: true,
  },
  // 12. Likoutey Tefilot
  {
    titleFr: "Likoutey Tefilot - Recueil de Prières",
    titleEn: "Likutey Tefilot",
    titleHe: "ליקוטי תפילות",
    slug: "likoutey-tefilot",
    author: "Rabbi Nathan de Breslev",
    descriptionFr:
      "Les prières de Rabbi Nathan basées sur les enseignements de Rabbi Nachman.",
    pages: 400,
    language: "fr" as const,
    categoryId: 5,
    type: "book" as const,
    pricePhysical: 15000, // 150₪ en centimes
    priceDigital: 9000, // 90₪ en centimes
    weight: 600,
    coverImageUrl: null,
    pdfUrl: "/pdfs/ליקוטי תפילות .pdf",
    featured: true,
    includedInSubscription: true,
  },
  // 13. L'Age d'Or de Breslev
  {
    titleFr: "L'Âge d'Or de Breslev",
    titleEn: "The Golden Age of Breslev",
    titleHe: "תור הזהב של ברסלב",
    slug: "age-or-breslev",
    author: "Breslev",
    descriptionFr: "Histoire de la Hassidout Breslev.",
    pages: 300,
    language: "fr" as const,
    categoryId: 3,
    type: "book" as const,
    pricePhysical: 10000, // 100₪ en centimes
    priceDigital: 6000, // 60₪ en centimes
    weight: 500,
    coverImageUrl: "/images/livres/age-dor-breslev.jpg",
    pdfUrl: "/pdfs/L'Age d'or de Breslev 1.pdf",
    featured: false,
    includedInSubscription: true,
  },
  // 14. Rabbi Nahman 2014
  {
    titleFr: "Rabbi Nahman 2014",
    titleEn: "Rabbi Nachman 2014",
    titleHe: "רבי נחמן 2014",
    slug: "rabbi-nahman-2014",
    author: "Breslev",
    descriptionFr: "Compilation d'enseignements.",
    pages: 150,
    language: "fr" as const,
    categoryId: 1,
    type: "book" as const,
    pricePhysical: 6000, // 60₪ en centimes
    priceDigital: 3500, // 35₪ en centimes
    weight: 250,
    coverImageUrl: null,
    pdfUrl: "/pdfs/Rabbi Nahman 2014.pdf",
    featured: false,
    includedInSubscription: true,
  },
  // 15. Tikoun Phonétique
  {
    titleFr: "Tikoun Haklali Phonétique",
    titleEn: "Tikkun Haklali Phonetic",
    titleHe: "תיקון הכללי",
    slug: "tikoun-phonetique",
    author: "Rabbi Nachman de Breslev",
    descriptionFr: "Le Remède Général en phonétique pour une lecture facile.",
    pages: 30,
    language: "fr" as const,
    categoryId: 5,
    type: "brochure" as const,
    pricePhysical: 1500, // 15₪ en centimes
    priceDigital: 1000, // 10₪ en centimes
    weight: 50,
    coverImageUrl: null,
    pdfUrl: "/pdfs/tikoun phonétique.pdf",
    featured: true,
    includedInSubscription: true,
  },
];

for (const book of booksData) {
  await db.insert(books).values(book);
  console.log(`  ✓ ${book.titleFr}`);
}

console.log("\n✅ Seed terminé avec succès!");
console.log(`   📚 ${booksData.length} livres créés`);
console.log(`   🏷️  ${categoriesData.length} catégories créées`);
console.log(`   💎 ${plansData.length} plans d'abonnement créés\n`);

client.close();
