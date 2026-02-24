import { createClient } from "@libsql/client";
import "dotenv/config";
import { readFileSync } from "fs";
import { join } from "path";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function run() {
  const catalogPath = join(process.cwd(), "scripts/complete_catalog.json");
  const catalogData = JSON.parse(readFileSync(catalogPath, "utf-8"));

  console.log("Restoring covers from complete_catalog.json...");

  for (const book of catalogData) {
    const id = book.id;
    let coverImage = book.cover_image;

    // There are a few books where cover_image is null, they should get a unified fallback
    // Or we leave them as null if the UI handles it, but let's use the default "diamond" cover
    if (!coverImage) {
      coverImage = "/images/livres/WhatsAppImage2025-10-31at01.25.29.jpeg";
    }

    console.log(
      `Restoring book ${id} ("${book.title_fr}") cover: -> ${coverImage}`
    );
    await client.execute({
      sql: "UPDATE books SET coverImageUrl = ? WHERE id = ?",
      args: [coverImage, id],
    });
  }

  // Mettre à jour les livres ID > 9 qui ne sont potentiellement pas dans le catalog V1
  // Azamra = 11
  await client.execute({
    sql: "UPDATE books SET coverImageUrl = ? WHERE id = ?",
    args: ["/images/livres/WhatsAppImage2025-10-31at01.25.29.jpeg", 11],
  });

  console.log("Done restoring covers.");
  process.exit(0);
}

run().catch(console.error);
