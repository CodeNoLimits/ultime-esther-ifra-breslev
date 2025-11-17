import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { books, categories, subscriptionPlans } from "../drizzle/schema.js";

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

console.log("🌱 Début du seed de la base de données...\n");

// Vider les tables existantes
console.log("🗑️  Nettoyage des tables existantes...");
await db.delete(books);
await db.delete(categories);
await db.delete(subscriptionPlans);

// Créer les catégories
console.log("\n📚 Création des catégories...");
const categoriesData = [
  { id: 1, name: "Enseignements Fondamentaux", slug: "enseignements-fondamentaux", description: "Les œuvres maîtresses de Rabbi Nachman de Breslev" },
  { id: 2, name: "Biographie & Témoignage", slug: "biographie-temoignage", description: "Vies et témoignages des grands Tsadikim" },
  { id: 3, name: "Récits & Histoire", slug: "recits-histoire", description: "Histoires et récits spirituels authentiques" },
  { id: 4, name: "Récits & Inspiration", slug: "recits-inspiration", description: "Conversations et anecdotes inspirantes" },
  { id: 5, name: "Prière & Protection", slug: "priere-protection", description: "Guides de prière et protection spirituelle" },
];

for (const cat of categoriesData) {
  await db.insert(categories).values(cat);
  console.log(`  ✓ ${cat.name}`);
}

// Créer les plans d'abonnement
console.log("\n💎 Création des plans d'abonnement...");
const plansData = [
  {
    id: 1,
    name: "Mensuel",
    slug: "mensuel",
    price: 49,
    duration: "month",
    features: JSON.stringify([
      "Accès à toute la bibliothèque digitale",
      "Nouveaux livres chaque mois",
      "Lecteur PDF sécurisé",
      "Support prioritaire"
    ])
  },
  {
    id: 2,
    name: "Annuel",
    slug: "annuel",
    price: 490,
    duration: "year",
    features: JSON.stringify([
      "Accès à toute la bibliothèque digitale",
      "Nouveaux livres chaque mois",
      "Lecteur PDF sécurisé",
      "Support prioritaire",
      "2 mois gratuits",
      "Contenu exclusif"
    ])
  },
  {
    id: 3,
    name: "Familial",
    slug: "familial",
    price: 690,
    duration: "year",
    features: JSON.stringify([
      "Accès à toute la bibliothèque digitale",
      "Nouveaux livres chaque mois",
      "Lecteur PDF sécurisé",
      "Support prioritaire",
      "Jusqu'à 5 comptes familiaux",
      "Contenu exclusif",
      "Réductions sur livres physiques"
    ])
  }
];

for (const plan of plansData) {
  await db.insert(subscriptionPlans).values(plan);
  console.log(`  ✓ ${plan.name} - ${plan.price}₪`);
}

// Créer les livres avec le bon mapping
console.log("\n📖 Création des livres...");
const booksData = [
  {
    titleFr: "La Vie d'un Breslever",
    titleHe: "חייו של חסיד ברסלב",
    slug: "la-vie-dun-breslever",
    author: "Rav Lévy Its'hak Bender",
    descriptionFr: "Ce livre retrace la vie authentique de Rav Lévy Its'hak Bender, la dernière image Breslev venant d'Ouman. À travers son parcours exceptionnel, découvrez les pratiques quotidiennes, la simplicité et la profondeur d'un véritable Hassid de Breslev.",
    descriptionLongFr: "Traduit et adapté de l'ouvrage \"Ich Hassidéha\" édité par son gendre Rav Mordé'haï Laskar et sa fille Etty, ce livre est un trésor spirituel qui nous plonge dans l'univers authentique du Hassidisme Breslev. Rav Lévy Its'hak Bender représente la dernière génération de Hassidim ayant vécu à Ouman avant la dispersion, et son témoignage est d'une valeur inestimable.",
    pages: 218,
    language: "français",
    categoryId: 2,
    pricePhysical: 80,
    priceDigital: 50,
    coverImage: "/images/livres/IMG-20251027-WA0190.jpg",
    pdfFile: "/pdfs/LaVied'unBreslever.pdf",
    featured: true,
    availablePhysical: true,
    availableDigital: true,
    availableSubscription: true,
    weightG: 350
  },
  {
    titleFr: "Likoutey Moharane - Tome 1",
    titleHe: "ליקוטי מוהר\"ן - חלק א",
    slug: "likoutey-moharane-1",
    author: "Rabbi Nachman de Breslev",
    descriptionFr: "Le livre fondamental des enseignements de Rabbi Nachman de Breslev. Première partie basée sur les morceaux allégoriques de Rabba Bar Bar Hanna du Talmud de Babylone.",
    descriptionLongFr: "Likoutey Moharane est l'œuvre maîtresse de Rabbi Nachman de Breslev, contenant l'essence de ses enseignements spirituels les plus profonds. Cette première partie explore les dimensions mystiques de la Torah à travers une approche unique basée sur les récits allégoriques de Rabba Bar Bar Hanna.",
    pages: 280,
    language: "français",
    categoryId: 1,
    pricePhysical: 120,
    priceDigital: 70,
    coverImage: "/images/livres/WhatsAppImage2025-10-31at01.25.29.jpeg",
    pdfFile: "/pdfs/LikouteyMoharane1.pdf",
    featured: true,
    availablePhysical: true,
    availableDigital: true,
    availableSubscription: true,
    weightG: 450
  },
  {
    titleFr: "Likoutey Moharane - Tome 4",
    titleHe: "ליקוטי מוהר\"ן - חלק ד",
    slug: "likoutey-moharane-4",
    author: "Rabbi Nachman de Breslev",
    descriptionFr: "Quatrième partie du livre fondamental des enseignements de Rabbi Nachman. Contient des Torot essentielles sur la foi, la prière et le service divin.",
    descriptionLongFr: "Ce quatrième volume de Likoutey Moharane poursuit l'exploration des enseignements profonds de Rabbi Nachman de Breslev. À partir de la Torah 55, Rabbi Nachman nous guide à travers des concepts spirituels essentiels avec une clarté et une profondeur remarquables.",
    pages: 250,
    language: "français",
    categoryId: 1,
    pricePhysical: 120,
    priceDigital: 70,
    coverImage: "/images/livres/IMG-20251110-WA0181.jpg",
    pdfFile: "/pdfs/LikouteyMoharane4.pdf",
    featured: true,
    availablePhysical: true,
    availableDigital: true,
    availableSubscription: true,
    weightG: 420
  },
  {
    titleFr: "Likoutey Moharane - Tome 5",
    titleHe: "ליקוטי מוהר\"ן - חלק ה",
    slug: "likoutey-moharane-5",
    author: "Rabbi Nachman de Breslev",
    descriptionFr: "Cinquième partie du livre fondamental de Rabbi Nachman. Explore la convoitise de l'argent, l'attraction des âmes, et les chemins vers la véritable richesse spirituelle.",
    descriptionLongFr: "Le cinquième volume de Likoutey Moharane aborde des thèmes profonds et universels qui touchent chaque être humain. Rabbi Nachman y explore notamment la Torah 68 qui traite de la convoitise de l'argent et révèle les racines spirituelles de l'attraction matérielle.",
    pages: 240,
    language: "français",
    categoryId: 1,
    pricePhysical: 115,
    priceDigital: 68,
    coverImage: "/images/livres/IMG-20251110-WA0182.jpg",
    pdfFile: "/pdfs/LM5.pdf",
    featured: false,
    availablePhysical: true,
    availableDigital: true,
    availableSubscription: true,
    weightG: 410
  },
  {
    titleFr: "Likoutey Moharane - Tome 6",
    titleHe: "ליקוטי מוהר\"ן - חלק ו",
    slug: "likoutey-moharane-6",
    author: "Rabbi Nachman de Breslev",
    descriptionFr: "Sixième partie des enseignements de Rabbi Nachman. Traite de la controverse comme moyen d'élévation spirituelle, de la comparaison de l'homme à l'arbre des champs.",
    descriptionLongFr: "Ce sixième volume de Likoutey Moharane présente une perspective unique et révolutionnaire sur la controverse et les défis de la vie. À partir de la Torah 161, Rabbi Nachman développe une métaphore puissante.",
    pages: 235,
    language: "français",
    categoryId: 1,
    pricePhysical: 115,
    priceDigital: 68,
    coverImage: "/images/livres/IMG-20251110-WA0183.jpg",
    pdfFile: "/pdfs/LM6.pdf",
    featured: false,
    availablePhysical: true,
    availableDigital: true,
    availableSubscription: true,
    weightG: 405
  },
  {
    titleFr: "Likoutey Moharane - Tome 7 (Tinyana)",
    titleHe: "ליקוטי מוהר\"ן תניינא",
    slug: "likoutey-moharane-7-tinyana",
    author: "Rabbi Nachman de Breslev",
    descriptionFr: "Septième partie - Tinyana (Seconde série). Débute avec la Torah sur le Shofar de Rosh Hashana. Enseignements profonds sur les fêtes et la téchouva.",
    descriptionLongFr: "Ce volume marque le début de la série Tinyana de Likoutey Moharane, contenant des enseignements que Rabbi Nachman a transmis dans les dernières années de sa vie.",
    pages: 245,
    language: "français",
    categoryId: 1,
    pricePhysical: 118,
    priceDigital: 69,
    coverImage: "/images/livres/IMG-20251110-WA0184.jpg",
    pdfFile: "/pdfs/LM7.pdf",
    featured: false,
    availablePhysical: true,
    availableDigital: true,
    availableSubscription: true,
    weightG: 415
  },
  {
    titleFr: "Le Voyage de Rabbi Nahman",
    titleHe: "מסע רבי נחמן",
    slug: "le-voyage-de-rabbi-nahman",
    author: "Compilation Mayanot Hatsadik",
    descriptionFr: "Récit extraordinaire du voyage de Rabbi Nachman en Terre d'Israël, incluant les éloges du Tsadik et le voyage du Baal Shem Tov.",
    descriptionLongFr: "Ce livre unique compile trois récits extraordinaires qui révèlent la profondeur de l'aspiration à la Terre Sainte dans le Hassidisme. Le voyage de Rabbi Nachman en Eretz Israël en 1798-1799 est l'un des événements les plus marquants de sa vie.",
    pages: 180,
    language: "français",
    categoryId: 3,
    pricePhysical: 95,
    priceDigital: 58,
    coverImage: "/images/livres/IMG-20251110-WA0187.jpg",
    pdfFile: "/pdfs/LevoyagedeRabbiNahman.pdf",
    featured: false,
    availablePhysical: true,
    availableDigital: true,
    availableSubscription: true,
    weightG: 320
  },
  {
    titleFr: "Conversations des Anges - Tome 2",
    titleHe: "שיחות המלאכים - כרך ב",
    slug: "conversations-des-anges-2",
    author: "Breslev",
    descriptionFr: "Deuxième tome du recueil de conversations et anecdotes Breslev. Des histoires inspirantes et des enseignements pratiques qui illuminent le chemin spirituel.",
    descriptionLongFr: "Ce deuxième tome de \"Conversations des Anges\" est un trésor de sagesse pratique et d'inspiration spirituelle. À travers une collection soigneusement sélectionnée de conversations et d'anecdotes authentiques.",
    pages: 220,
    language: "français",
    categoryId: 4,
    pricePhysical: 88,
    priceDigital: 52,
    coverImage: "/images/livres/WhatsAppImage2025-11-10at21.47.57.jpeg",
    pdfFile: "/pdfs/conversations.pdf",
    featured: false,
    availablePhysical: true,
    availableDigital: true,
    availableSubscription: true,
    weightG: 360
  },
  {
    titleFr: "Chemot Atsadikim - Les Noms des Tsadikim",
    titleHe: "שמות הצדיקים",
    slug: "chemot-atsadikim",
    author: "Breslev",
    descriptionFr: "Guide spirituel sur le pouvoir des noms des Tsadikim. Révèle comment la prononciation des noms des Justes attire les miracles et la protection divine.",
    descriptionLongFr: "\"Chemot Atsadikim\" est un ouvrage unique qui explore la dimension spirituelle profonde des noms des Tsadikim (Justes). Basé sur les enseignements kabbalistiques et hassidiques, ce livre de 224 pages révèle comment la simple prononciation du nom d'un Tsadik peut éveiller son mérite.",
    pages: 224,
    language: "français",
    categoryId: 5,
    pricePhysical: 65,
    priceDigital: 38,
    coverImage: "/images/livres/WhatsAppImage2025-11-10at21.45.14.jpeg",
    pdfFile: null,
    featured: false,
    availablePhysical: true,
    availableDigital: false,
    availableSubscription: false,
    weightG: 340
  }
];

for (const book of booksData) {
  await db.insert(books).values(book);
  console.log(`  ✓ ${book.titleFr} (${book.pages} pages)`);
}

console.log("\n✅ Seed terminé avec succès!");
console.log(`   📚 ${booksData.length} livres créés`);
console.log(`   🏷️  ${categoriesData.length} catégories créées`);
console.log(`   💎 ${plansData.length} plans d'abonnement créés\n`);

await connection.end();
