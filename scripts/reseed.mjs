import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { categories, books, subscriptionPlans } from '../drizzle/schema.js';

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(conn);

console.log('🗑️  Nettoyage des tables...');
await db.delete(books);
await db.delete(categories);
await db.delete(subscriptionPlans);

console.log('\n📚 Création des catégories...');
const cats = [
  { nameEn: 'Core Teachings', nameFr: 'Enseignements Fondamentaux', nameHe: 'לימודי יסוד', slug: 'enseignements' },
  { nameEn: 'Biography', nameFr: 'Biographie', nameHe: 'ביוגרפיה', slug: 'biographie' },
  { nameEn: 'Stories', nameFr: 'Récits', nameHe: 'סיפורים', slug: 'recits' },
  { nameEn: 'Prayer', nameFr: 'Prière', nameHe: 'תפילה', slug: 'priere' }
];
for (const c of cats) {
  await db.insert(categories).values(c);
  console.log(`  ✓ ${c.nameFr}`);
}

console.log('\n💎 Création des plans d\'abonnement...');
const plans = [
  {
    nameEn: 'Monthly', nameFr: 'Mensuel', nameHe: 'חודשי', slug: 'mensuel',
    price: 4900, duration: 'monthly', maxDevices: 1
  },
  {
    nameEn: 'Annual', nameFr: 'Annuel', nameHe: 'שנתי', slug: 'annuel',
    price: 49000, duration: 'yearly', maxDevices: 1
  },
  {
    nameEn: 'Family', nameFr: 'Familial', nameHe: 'משפחתי', slug: 'familial',
    price: 69000, duration: 'family', maxDevices: 5
  }
];
for (const p of plans) {
  await db.insert(subscriptionPlans).values(p);
  console.log(`  ✓ ${p.nameFr} - ${p.price}₪`);
}

console.log('\n📖 Création des livres avec les bonnes couvertures...');
const booksData = [
  {
    titleEn: 'Life of a Breslever',
    titleFr: 'La Vie d\'un Breslever',
    titleHe: 'חייו של חסיד ברסלב',
    slug: 'la-vie-dun-breslever',
    author: 'Rav Lévy Its\'hak Bender',
    descriptionFr: 'Témoignage authentique de Rav Lévy Its\'hak Bender, la dernière image Breslev venant d\'Ouman. Un récit captivant qui révèle la vie quotidienne et la profondeur spirituelle d\'un véritable Hassid de Breslev.',
    type: 'book',
    language: 'fr',
    categoryId: 2,
    pages: 218,
    pricePhysical: 8000,
    priceDigital: 5000,
    weight: 350,
    coverImageUrl: '/images/livres/IMG-20251027-WA0190.jpg',
    pdfUrl: '/pdfs/LaVied\'unBreslever.pdf',
    featured: true,
    inStock: true
  },
  {
    titleEn: 'Likoutey Moharane 1',
    titleFr: 'Likoutey Moharane - Tome 1',
    titleHe: 'ליקוטי מוהר"ן א',
    slug: 'likoutey-moharane-1',
    author: 'Rabbi Nachman de Breslev',
    descriptionFr: 'L\'œuvre maîtresse de Rabbi Nachman de Breslev. Première partie basée sur les récits allégoriques de Rabba Bar Bar Hanna. Un chef-d\'œuvre de sagesse profonde qui révèle les secrets de la Torah et de la prière.',
    type: 'book',
    language: 'fr',
    categoryId: 1,
    pages: 280,
    pricePhysical: 12000,
    priceDigital: 7000,
    weight: 450,
    coverImageUrl: '/images/livres/WhatsAppImage2025-10-31at01.25.29.jpeg',
    pdfUrl: '/pdfs/LikouteyMoharane1.pdf',
    featured: true,
    inStock: true
  },
  {
    titleEn: 'Likoutey Moharane 4',
    titleFr: 'Likoutey Moharane - Tome 4',
    titleHe: 'ליקוטי מוהר"ן ד',
    slug: 'likoutey-moharane-4',
    author: 'Rabbi Nachman de Breslev',
    descriptionFr: 'Quatrième partie des enseignements fondamentaux de Rabbi Nachman. Contient des Torot essentielles sur la foi, la prière et le service divin. Traduit par Mordechai Schwartz.',
    type: 'book',
    language: 'fr',
    categoryId: 1,
    pages: 250,
    pricePhysical: 12000,
    priceDigital: 7000,
    weight: 420,
    coverImageUrl: '/images/livres/IMG-20251110-WA0181.jpg',
    pdfUrl: '/pdfs/LikouteyMoharane4.pdf',
    featured: true,
    inStock: true
  },
  {
    titleEn: 'Likoutey Moharane 5',
    titleFr: 'Likoutey Moharane - Tome 5',
    titleHe: 'ליקוטי מוהר"ן ה',
    slug: 'likoutey-moharane-5',
    author: 'Rabbi Nachman de Breslev',
    descriptionFr: 'Cinquième partie explorant la convoitise de l\'argent, l\'attraction des âmes, et les chemins vers la véritable richesse spirituelle. Enseignements profonds sur la Torah 68.',
    type: 'book',
    language: 'fr',
    categoryId: 1,
    pages: 240,
    pricePhysical: 11500,
    priceDigital: 6800,
    weight: 410,
    coverImageUrl: '/images/livres/IMG-20251110-WA0182.jpg',
    pdfUrl: '/pdfs/LM5.pdf',
    featured: false,
    inStock: true
  },
  {
    titleEn: 'Likoutey Moharane 6',
    titleFr: 'Likoutey Moharane - Tome 6',
    titleHe: 'ליקוטי מוהר"ן ו',
    slug: 'likoutey-moharane-6',
    author: 'Rabbi Nachman de Breslev',
    descriptionFr: 'Sixième partie traitant de la controverse comme moyen d\'élévation spirituelle. Développe la métaphore de l\'homme comparé à l\'arbre des champs et des flots qui élèvent.',
    type: 'book',
    language: 'fr',
    categoryId: 1,
    pages: 235,
    pricePhysical: 11500,
    priceDigital: 6800,
    weight: 405,
    coverImageUrl: '/images/livres/IMG-20251110-WA0183.jpg',
    pdfUrl: '/pdfs/LM6.pdf',
    featured: false,
    inStock: true
  },
  {
    titleEn: 'Likoutey Moharane 7 Tinyana',
    titleFr: 'Likoutey Moharane - Tome 7 (Tinyana)',
    titleHe: 'ליקוטי מוהר"ן תניינא',
    slug: 'likoutey-moharane-7-tinyana',
    author: 'Rabbi Nachman de Breslev',
    descriptionFr: 'Septième partie - Tinyana (Seconde série). Débute avec la Torah sur le Shofar de Rosh Hashana. Enseignements profonds sur les fêtes, la téchouva et le renouvellement spirituel.',
    type: 'book',
    language: 'fr',
    categoryId: 1,
    pages: 245,
    pricePhysical: 11800,
    priceDigital: 6900,
    weight: 415,
    coverImageUrl: '/images/livres/IMG-20251110-WA0184.jpg',
    pdfUrl: '/pdfs/LM7.pdf',
    featured: false,
    inStock: true
  },
  {
    titleEn: 'The Journey of Rabbi Nahman',
    titleFr: 'Le Voyage de Rabbi Nahman',
    titleHe: 'מסע רבי נחמן',
    slug: 'le-voyage-de-rabbi-nahman',
    author: 'Compilation Mayanot Hatsadik',
    descriptionFr: 'Récit extraordinaire du voyage de Rabbi Nachman en Terre d\'Israël en 1798-1799. Inclut les éloges du Tsadik et le voyage du Baal Shem Tov. Un témoignage historique et spirituel fascinant.',
    type: 'book',
    language: 'fr',
    categoryId: 3,
    pages: 180,
    pricePhysical: 9500,
    priceDigital: 5800,
    weight: 320,
    coverImageUrl: '/images/livres/IMG-20251110-WA0187.jpg',
    pdfUrl: '/pdfs/LevoyagedeRabbiNahman.pdf',
    featured: false,
    inStock: true
  },
  {
    titleEn: 'Conversations of Angels 2',
    titleFr: 'Conversations des Anges - Tome 2',
    titleHe: 'שיחות המלאכים - כרך ב',
    slug: 'conversations-des-anges-2',
    author: 'Breslev',
    descriptionFr: 'Deuxième tome du recueil de conversations et anecdotes Breslev. Des histoires inspirantes et des enseignements pratiques qui illuminent le chemin spirituel au quotidien.',
    type: 'book',
    language: 'fr',
    categoryId: 3,
    pages: 220,
    pricePhysical: 8800,
    priceDigital: 5200,
    weight: 360,
    coverImageUrl: '/images/livres/WhatsAppImage2025-11-10at21.47.57.jpeg',
    pdfUrl: '/pdfs/conversations.pdf',
    featured: false,
    inStock: true
  },
  {
    titleEn: 'Chemot Atsadikim',
    titleFr: 'Chemot Atsadikim - Les Noms des Tsadikim',
    titleHe: 'שמות הצדיקים',
    slug: 'chemot-atsadikim',
    author: 'Breslev',
    descriptionFr: 'Guide spirituel sur le pouvoir des noms des Tsadikim. Révèle comment la prononciation des noms des Justes attire les miracles et la protection divine. 224 pages de sagesse pratique.',
    type: 'book',
    language: 'fr',
    categoryId: 4,
    pages: 224,
    pricePhysical: 6500,
    priceDigital: 3800,
    weight: 340,
    coverImageUrl: '/images/livres/WhatsAppImage2025-11-10at21.45.14.jpeg',
    pdfUrl: null,
    featured: false,
    inStock: true
  }
];

for (const book of booksData) {
  await db.insert(books).values(book);
  console.log(`  ✓ ${book.titleFr} (${book.pages} pages)`);
}

console.log('\n✅ Seed terminé avec succès!');
console.log(`   📚 ${booksData.length} livres créés`);
console.log(`   🏷️  ${cats.length} catégories créées`);
console.log(`   💎 ${plans.length} plans d\'abonnement créés\n`);

await conn.end();
