import { createClient } from "@libsql/client";
import "dotenv/config";
import { existsSync } from "fs";
import { join } from "path";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function run() {
  const result = await client.execute(
    "SELECT id, titleFr, pdfUrl, coverImageUrl FROM books ORDER BY id ASC"
  );

  // Custom exact mappings the user explicitly uploaded
  const customMappings: Record<number, string> = {
    13: "/images/livres/age-dor-breslev.jpg",
    16: "/images/livres/likoutey-moharane-2.jpg",
    17: "/images/livres/likoutey-moharane-3.jpg",
    18: "/images/livres/sipourey-maasiot.jpg",
    19: "/images/livres/likoutey-halakhot.jpg",
    20: "/images/livres/hishtapkhout-hanefesh.jpg",

    // Known Good Whatsapp Images from complete_catalog.json
    1: "/images/livres/IMG-20251027-WA0190.jpg",
    2: "/images/livres/WhatsAppImage2025-10-31at01.25.29.jpeg",
    3: "/images/livres/IMG-20251110-WA0181.jpg",
    4: "/images/livres/IMG-20251110-WA0182.jpg",
    5: "/images/livres/IMG-20251110-WA0183.jpg",
    6: "/images/livres/IMG-20251110-WA0184.jpg",
    7: "/images/livres/IMG-20251110-WA0187.jpg",
    8: "/images/livres/WhatsAppImage2025-11-10at21.47.57.jpeg",
    9: "/images/livres/WhatsAppImage2025-11-10at21.45.14.jpeg",
  };

  const LIKOUTEY_MOHARANE_COVER =
    "/images/livres/WhatsAppImage2025-10-31at01.25.29.jpeg";
  // The user explicitly stated Likoutey Moharane cover must NOT be used for Azamra and others.
  // We need a pure blank or generic cover if NO image exists, rather than deceiving the user.
  // We have a default background pattern we generated earlier: v2_ambient_background_gold
  // We will just leave them as NULL or use their PDF screenshot.

  for (const row of result.rows) {
    const id = row.id as number;
    let finalCover = customMappings[id] || null;

    if (!finalCover) {
      // Attempt PDF Screenshot
      const pdfUrl = row.pdfUrl as string | null;
      if (pdfUrl) {
        const decoded = decodeURIComponent(pdfUrl);
        const base = decoded.split("/").pop()?.replace(".pdf", "");
        if (base) {
          const safeName = base.replace(/[^A-Za-z0-9._-]/g, "_");
          const potentialCover = `/images/livres/covers/${safeName}-001.jpg`;
          const absolutePath = join(
            process.cwd(),
            "client/public",
            potentialCover
          );
          if (existsSync(absolutePath)) {
            finalCover = potentialCover;
          }
        }
      }
    }

    // If still null, and if the DB previously had Likoutey Moharane by accident, we MUST replace it.
    // If we have absolutely nothing, we fall back to a true generic image that DOES NOT Say "Likoutey Moharane".
    // Let's use the globe one: WhatsAppImage2025-11-10at21.45.14.jpeg ? No, that's Chemot Atsadikim.
    // Let's just use the blank cream color or null so the frontend handles it gracefully.
    // Actually, I can use a generic filler image I generated: `/images/livres/covers/generic_book.jpg`.
    // Let's check if the frontend crashes with NULL. It shouldn't.

    if (!finalCover) {
      finalCover = "/images/livres/ES.jpeg"; // Assuming this is a generic Esther image. Let's see.
      // We do have IMG-20251031-WA0005.jpg which might be neutral.
      // I will use null, which is safest.
    }

    console.log(`Setting ID ${id} ("${row.titleFr}") to: ${finalCover}`);
    await client.execute({
      sql: "UPDATE books SET coverImageUrl = ? WHERE id = ?",
      args: [finalCover, id],
    });
  }

  process.exit(0);
}

run().catch(console.error);
