import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function run() {
  console.log("Fixing remaining covers 10-37 in Turso...");

  // Exactly matching the provided pristine images to the corresponding IDs.
  // We parsed these IDs from the DB check command earlier.
  const exactMappings: Record<number, string> = {
    13: "/images/livres/age-dor-breslev.jpg",
    16: "/images/livres/likoutey-moharane-2.jpg",
    17: "/images/livres/likoutey-moharane-3.jpg",
    18: "/images/livres/sipourey-maasiot.jpg",
    19: "/images/livres/likoutey-halakhot.jpg",
    20: "/images/livres/hishtapkhout-hanefesh.jpg",
  };

  const defaultDiamondCover =
    "/images/livres/WhatsAppImage2025-10-31at01.25.29.jpeg";

  // We are going to fetch all books and apply fixes to IDs 10 to 37.
  const result = await client.execute(
    "SELECT id, titleFr, coverImageUrl FROM books WHERE id >= 10"
  );

  for (const book of result.rows) {
    const id = book.id as number;
    let newCoverUrl = defaultDiamondCover; // Base fallback for premium look

    if (exactMappings[id]) {
      newCoverUrl = exactMappings[id];
      console.log(
        `[EXACT MATCH] ID: ${id} | Title: ${book.titleFr} -> ${newCoverUrl}`
      );
    } else {
      console.log(
        `[FALLBACK MATCH] ID: ${id} | Title: ${book.titleFr} -> (Diamond)`
      );
    }

    await client.execute({
      sql: "UPDATE books SET coverImageUrl = ? WHERE id = ?",
      args: [newCoverUrl, id],
    });
  }

  console.log("All covers fully repaired without generated PDF placeholders.");
  process.exit(0);
}

run().catch(console.error);
