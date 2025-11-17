-- INSERTION DES LIVRES AVEC LES BONNES COUVERTURES
-- Basé sur l'analyse visuelle des images fournies par le client

-- 1. La Vie d'un Breslever (Les Cahiers du Cœur)
-- Image: IMG-20251027-WA0190.jpg (Les Cahiers du Cœur)
INSERT INTO books (
  titleFr, titleEn, titleHe,
  slug, author,
  descriptionFr, descriptionEn, descriptionHe,
  pricePhysical, priceDigital, currency,
  coverImageUrl, pdfUrl,
  language, pageCount, weight,
  hasPhysical, hasDigital, isFeatured,
  categoryId
) VALUES (
  'La Vie d''un Breslever',
  'The Life of a Breslever',
  'חיי ברסלבר',
  'la-vie-dun-breslever',
  'Rabbi Nachman de Breslev',
  'Un guide spirituel complet pour vivre selon les enseignements de Rabbi Nachman. Ce livre fait partie de la collection "Les Cahiers du Cœur" et offre des conseils pratiques pour la vie quotidienne d''un Breslever.',
  'A complete spiritual guide to living according to Rabbi Nachman''s teachings.',
  'מדריך רוחני מלא לחיים על פי תורת רבי נחמן',
  80, 50, 'ILS',
  '/images/livres/IMG-20251027-WA0190.jpg',
  '/pdfs/LaVied''unBreslever.pdf',
  'fr', 180, 300,
  1, 1, 1,
  1
);

-- 2. Likoutey Moharane - Tome 1
-- Image: WhatsAppImage2025-10-31at01.25.29.jpeg (couverture noire avec diamant)
INSERT INTO books (
  titleFr, titleEn, titleHe,
  slug, author,
  descriptionFr, descriptionEn, descriptionHe,
  pricePhysical, priceDigital, currency,
  coverImageUrl, pdfUrl,
  language, pageCount, weight,
  hasPhysical, hasDigital, isFeatured,
  categoryId
) VALUES (
  'Likoutey Moharane - Tome 1',
  'Likoutey Moharan - Volume 1',
  'ליקוטי מוהר"ן - חלק א',
  'likoutey-moharane-tome-1',
  'Rabbi Nachman de Breslev',
  'Le premier tome de l''œuvre maîtresse de Rabbi Nachman, contenant les enseignements 1 à 15. Une œuvre fondamentale de la pensée hassidique Breslev.',
  'The first volume of Rabbi Nachman''s masterwork, containing teachings 1 to 15.',
  'הספר הראשון של ליקוטי מוהר"ן, מכיל תורות א-טו',
  120, 70, 'ILS',
  '/images/livres/WhatsAppImage2025-10-31at01.25.29.jpeg',
  '/pdfs/LikouteyMoharane1.pdf',
  'fr', 250, 450,
  1, 1, 1,
  6
);

-- 3. Chemot Atsadikim (Les Noms des Tsadikim)
-- Image: WhatsAppImage2025-11-10at21.45.14.jpeg (globe bleu)
INSERT INTO books (
  titleFr, titleEn, titleHe,
  slug, author,
  descriptionFr, descriptionEn, descriptionHe,
  pricePhysical, priceDigital, currency,
  coverImageUrl, pdfUrl,
  language, pageCount, weight,
  hasPhysical, hasDigital, isFeatured,
  categoryId
) VALUES (
  'Chemot Atsadikim',
  'Names of the Tzaddikim',
  'שמות הצדיקים',
  'chemot-atsadikim',
  'Rabbi Nachman de Breslev',
  'La prononciation du nom du Tsadik révèle son mérite qui est toujours présent au monde. Elle attire les miracles comme si le Tsadik les accomplissait. À lire chaque jour et en cas d''urgence. 224 pages.',
  'The pronunciation of the Tzadik''s name reveals their merit. 224 pages.',
  'ההגייה של שם הצדיק מגלה את זכותו. 224 עמודים',
  35, 25, 'EUR',
  '/images/livres/WhatsAppImage2025-11-10at21.45.14.jpeg',
  NULL,
  'fr', 224, 250,
  1, 0, 1,
  3
);

-- 4. Likoutey Moharane - Tome 3 (Troisième Tome)
-- Image: IMG-20251110-WA0184.jpg (Troisième Tome - Enseignements 29 à 58)
INSERT INTO books (
  titleFr, titleEn, titleHe,
  slug, author,
  descriptionFr, descriptionEn, descriptionHe,
  pricePhysical, priceDigital, currency,
  coverImageUrl, pdfUrl,
  language, pageCount, weight,
  hasPhysical, hasDigital, isFeatured,
  categoryId
) VALUES (
  'Likoutey Moharane - Tome 3',
  'Likoutey Moharan - Volume 3',
  'ליקוטי מוהר"ן - חלק ג',
  'likoutey-moharane-tome-3',
  'Rabbi Nachman de Breslev',
  'Le troisième tome de Likoutey Moharane, contenant les enseignements 29 à 58. Des enseignements profonds sur la joie, la prière et le service divin.',
  'The third volume of Likoutey Moharan, containing teachings 29 to 58.',
  'הספר השלישי של ליקוטי מוהר"ן, מכיל תורות כט-נח',
  110, 65, 'ILS',
  '/images/livres/IMG-20251110-WA0184.jpg',
  NULL,
  'fr', 280, 480,
  1, 1, 0,
  6
);

-- 5. Likoutey Moharane - Tome 5
-- PDF: LM5.pdf
INSERT INTO books (
  titleFr, titleEn, titleHe,
  slug, author,
  descriptionFr, descriptionEn, descriptionHe,
  pricePhysical, priceDigital, currency,
  coverImageUrl, pdfUrl,
  language, pageCount, weight,
  hasPhysical, hasDigital, isFeatured,
  categoryId
) VALUES (
  'Likoutey Moharane - Tome 5',
  'Likoutey Moharan - Volume 5',
  'ליקוטי מוהר"ן - חלק ה',
  'likoutey-moharane-tome-5',
  'Rabbi Nachman de Breslev',
  'Le cinquième tome de l''œuvre maîtresse de Rabbi Nachman. Enseignements essentiels sur la foi, la prière et la proximité avec Hachem.',
  'The fifth volume of Rabbi Nachman''s masterwork.',
  'הספר החמישי של ליקוטי מוהר"ן',
  115, 68, 'ILS',
  '/images/livres/IMG-20251110-WA0187.jpg',
  '/pdfs/LM5.pdf',
  'fr', 270, 470,
  1, 1, 0,
  6
);

-- 6. Likoutey Moharane - Tome 6
-- PDF: LM6.pdf
INSERT INTO books (
  titleFr, titleEn, titleHe,
  slug, author,
  descriptionFr, descriptionEn, descriptionHe,
  pricePhysical, priceDigital, currency,
  coverImageUrl, pdfUrl,
  language, pageCount, weight,
  hasPhysical, hasDigital, isFeatured,
  categoryId
) VALUES (
  'Likoutey Moharane - Tome 6',
  'Likoutey Moharan - Volume 6',
  'ליקוטי מוהר"ן - חלק ו',
  'likoutey-moharane-tome-6',
  'Rabbi Nachman de Breslev',
  'Le sixième tome de Likoutey Moharane. Enseignements profonds sur la Torah, la prière et le chemin spirituel.',
  'The sixth volume of Likoutey Moharan.',
  'הספר השישי של ליקוטי מוהר"ן',
  115, 68, 'ILS',
  '/images/livres/IMG-20251110-WA0188.jpg',
  '/pdfs/LM6.pdf',
  'fr', 265, 465,
  1, 1, 0,
  6
);

-- 7. Likoutey Moharane - Tome 7
-- PDF: LM7.pdf
INSERT INTO books (
  titleFr, titleEn, titleHe,
  slug, author,
  descriptionFr, descriptionEn, descriptionHe,
  pricePhysical, priceDigital, currency,
  coverImageUrl, pdfUrl,
  language, pageCount, weight,
  hasPhysical, hasDigital, isFeatured,
  categoryId
) VALUES (
  'Likoutey Moharane - Tome 7',
  'Likoutey Moharan - Volume 7',
  'ליקוטי מוהר"ן - חלק ז',
  'likoutey-moharane-tome-7',
  'Rabbi Nachman de Breslev',
  'Le septième tome de Likoutey Moharane. Enseignements sur la joie, la foi et le service divin.',
  'The seventh volume of Likoutey Moharan.',
  'הספר השביעי של ליקוטי מוהר"ן',
  115, 68, 'ILS',
  '/images/livres/IMG-20251110-WA0189.jpg',
  '/pdfs/LM7.pdf',
  'fr', 260, 460,
  1, 1, 0,
  6
);

-- 8. Conversations des Anges - Tome 2
-- Image: WhatsAppImage2025-11-10at21.47.57.jpeg
INSERT INTO books (
  titleFr, titleEn, titleHe,
  slug, author,
  descriptionFr, descriptionEn, descriptionHe,
  pricePhysical, priceDigital, currency,
  coverImageUrl, pdfUrl,
  language, pageCount, weight,
  hasPhysical, hasDigital, isFeatured,
  categoryId
) VALUES (
  'Conversations des Anges - Tome 2',
  'Conversations of Angels - Volume 2',
  'שיחות המלאכים - כרך ב',
  'conversations-des-anges-tome-2',
  'Breslev',
  'Recueil de conversations et anecdotes inspirantes de la tradition Breslev. Deuxième tome d''une série spirituelle profonde.',
  'Collection of inspiring conversations and anecdotes from Breslev tradition.',
  'אוסף שיחות וסיפורים מעוררי השראה מהמסורת ברסלב',
  65, 40, 'ILS',
  '/images/livres/WhatsAppImage2025-11-10at21.47.57.jpeg',
  '/pdfs/conversations.pdf',
  'fr', 200, 350,
  1, 1, 0,
  6
);

-- 9. Le Voyage de Rabbi Nahman
-- PDF: LevoyagedeRabbiNahman.pdf
INSERT INTO books (
  titleFr, titleEn, titleHe,
  slug, author,
  descriptionFr, descriptionEn, descriptionHe,
  pricePhysical, priceDigital, currency,
  coverImageUrl, pdfUrl,
  language, pageCount, weight,
  hasPhysical, hasDigital, isFeatured,
  categoryId
) VALUES (
  'Le Voyage de Rabbi Nahman',
  'The Journey of Rabbi Nahman',
  'מסע רבי נחמן',
  'le-voyage-de-rabbi-nahman',
  'Rabbi Nachman de Breslev',
  'Le récit fascinant du voyage de Rabbi Nachman en Terre Sainte. Un témoignage spirituel unique et inspirant.',
  'The fascinating account of Rabbi Nachman''s journey to the Holy Land.',
  'התיאור המרתק של מסעו של רבי נחמן לארץ הקודש',
  75, 45, 'ILS',
  '/images/livres/IMG-20251110-WA0190.jpg',
  '/pdfs/LevoyagedeRabbiNahman.pdf',
  'fr', 190, 330,
  1, 1, 0,
  3
);
