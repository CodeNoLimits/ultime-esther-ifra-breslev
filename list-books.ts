import "dotenv/config";
import { db } from "./server/db";
import { books } from "./shared/schema";

async function run() {
  const allBooks = await db.select().from(books);
  allBooks.forEach(b => {
    console.log(`ID: ${b.id} | Title: ${b.title} | Cover: ${b.coverImageUrl}`);
  });
  process.exit(0);
}

run().catch(console.error);
