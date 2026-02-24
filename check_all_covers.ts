import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function run() {
  const result = await client.execute(
    "SELECT id, titleFr, coverImageUrl FROM books ORDER BY id ASC"
  );
  for (const row of result.rows) {
    console.log(`${row.id} | ${row.titleFr} | ${row.coverImageUrl}`);
  }
  process.exit(0);
}

run().catch(console.error);
