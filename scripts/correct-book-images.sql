-- Correction des associations image-livre basée sur l'analyse visuelle

-- La Vie d'un Breslever (Les Cahiers du Cœur)
UPDATE books SET coverImageUrl = '/images/livres/IMG-20251027-WA0190.jpg' 
WHERE slug = 'la-vie-dun-breslever';

-- Likoutey Moharane 1 (Couverture noire avec diamant)
UPDATE books SET coverImageUrl = '/images/livres/WhatsAppImage2025-10-31at01.25.29.jpeg'
WHERE slug = 'likoutey-moharane-1';

-- Likoutey Moharane 4 (Prix 10 Euros visible)
UPDATE books SET coverImageUrl = '/images/livres/IMG-20251110-WA0181.jpg'
WHERE slug = 'likoutey-moharane-4';

-- Likoutey Moharane 5
UPDATE books SET coverImageUrl = '/images/livres/IMG-20251110-WA0182.jpg'
WHERE slug = 'likoutey-moharane-5';

-- Likoutey Moharane 6
UPDATE books SET coverImageUrl = '/images/livres/IMG-20251110-WA0183.jpg'
WHERE slug = 'likoutey-moharane-6';

-- Likoutey Moharane 7 Tinyana
UPDATE books SET coverImageUrl = '/images/livres/IMG-20251110-WA0184.jpg'
WHERE slug = 'likoutey-moharane-7-tinyana';

-- Le Voyage de Rabbi Nahman
UPDATE books SET coverImageUrl = '/images/livres/IMG-20251110-WA0187.jpg'
WHERE slug = 'le-voyage-de-rabbi-nahman';

-- Conversations des Anges 2
UPDATE books SET coverImageUrl = '/images/livres/WhatsAppImage2025-11-10at21.47.57.jpeg'
WHERE slug = 'conversations-des-anges-2';

-- Chemot Atsadikim (Globe bleu)
UPDATE books SET coverImageUrl = '/images/livres/WhatsAppImage2025-11-10at21.45.14.jpeg'
WHERE slug = 'chemot-atsadikim';

SELECT titleFr, coverImageUrl FROM books ORDER BY id;
