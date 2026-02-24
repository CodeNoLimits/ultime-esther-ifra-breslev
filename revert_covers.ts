import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function run() {
  const catalogRaw = fs.readFileSync("scripts/complete_catalog.json", "utf-8");
  const catalog = JSON.parse(catalogRaw);

  const { rows } = await client.execute("SELECT id, slug FROM books");

  for (const book of rows) {
    const slug = book.slug as string;
    const catItem = catalog.find((c: any) => c.slug === slug);
    if (!catItem) continue;

    const v1Cover = catItem.cover_image;
    if (v1Cover) {
      console.log(`Reverting ${slug} cover to ${v1Cover}`);
      await client.execute({
        sql: "UPDATE books SET coverImageUrl = ? WHERE slug = ?",
        args: [v1Cover, slug],
      });
    }
  }

  console.log("Database reverted to beautiful V1 photos!");
}

run().catch(console.error);
