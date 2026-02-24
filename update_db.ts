import { createClient } from "@libsql/client";
import "dotenv/config";
import { existsSync } from "fs";
import { join } from "path";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const GOOD_COVERS = [
  "/images/livres/WhatsAppImage2025-10-31at01.25.29.jpeg",
  "/images/livres/WhatsAppImage2025-11-10at21.45.14.jpeg",
  "/images/livres/WhatsAppImage2025-11-10at21.47.57.jpeg",
];

async function run() {
  const result = await client.execute(
    "SELECT id, titleFr, pdfUrl, coverImageUrl FROM books;"
  );
  for (const row of result.rows) {
    const id = row.id;
    const pdfUrl = row.pdfUrl as string | null;
    const currentCover = row.coverImageUrl as string | null;
    let newCover = null;

    if (currentCover && GOOD_COVERS.includes(currentCover)) {
      console.log(
        `Skipping book ${id} ("${row.titleFr}") because it has a known good cover.`
      );
      continue;
    }

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
          newCover = potentialCover;
        } else {
          console.warn(
            `[WARNING] Cover ${potentialCover} does not exist for book ${id}. Falling back to default.`
          );
        }
      }
    }

    if (!newCover) {
      newCover = "/images/livres/WhatsAppImage2025-10-31at01.25.29.jpeg";
    }

    console.log(
      `Updating book ${id} ("${row.titleFr}") cover: ${currentCover} -> ${newCover}`
    );
    await client.execute({
      sql: "UPDATE books SET coverImageUrl = ? WHERE id = ?",
      args: [newCover, id],
    });
  }
  process.exit(0);
}
run();
