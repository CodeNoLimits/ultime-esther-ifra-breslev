# CODE CHANGES LOG — Esther Ifrah Site

## 2026-03-15 — Commits 4-8

### Commit 4: CoursAudioDuJour.tsx (bfbad28)
- Created `client/src/components/CoursAudioDuJour.tsx`
- Simple audio player widget: play/pause, seek bar, skip +/-15s
- Rubrique badges: LM, Halakha, Midot, Vie Breslever (color-coded)
- Placeholder daily course data (ready for API integration)
- Build: PASS

### Commit 5: Daily audio section on homepage (c6e172b)
- Imported CoursAudioDuJour in `client/src/pages/Home.tsx`
- New section between hero and "4 Piliers" features
- Centered layout, max-w-2xl, motion fade-in animation
- Build: PASS

### Commit 6: France/Israel shipping with +35% surcharge (dba1c07)
- Modified `client/src/pages/Checkout.tsx`
- Removed Canada from shipping zones (France + Israel only)
- Added `physicalSurcharge: 0.35` for France (35% on physical books)
- Country selector shows surcharge info to customer
- Build: PASS

### Commit 7: Testimonials section on homepage (4ec0eec)
- Added testimonials/reviews section to `client/src/pages/Home.tsx`
- 3 placeholder reviews with star ratings, glass-card styling
- Staggered motion animations, positioned before Subscription CTA
- Build: PASS

### Commit 8: PDFReader with page-flip + pdfjs-dist (e5c631f)
- Installed `page-flip@2.0.7` and `pdfjs-dist@5.5.207`
- Rewrote `client/src/components/PDFReader.tsx`:
  - Replaced iframe with canvas-based pdfjs-dist rendering
  - StPageFlip for realistic book-turning page flip effect
  - Lazy page rendering (renders visible + nearby pages)
  - Canvas watermarking (diagonal center + footer)
  - Preserved zoom, fullscreen, progress bar controls
- Build: PASS

### Commit 9: Rectangle central bleu marine (7a2e8f9)
- Modified `client/src/pages/Home.tsx` — Featured Books section
- Changed background from `bg-breslev-cream` (white #FAFAF9) to `bg-[#2C3E50]` (bleu marine)
- Updated section heading to `text-white`, paragraph to `text-white/70` for contrast
- Updated "Voir tous les livres" button: white border + white text + hover glow
- Requested by David: "rectangle central should be BLEU MARINE, not white"
- Build: PASS
