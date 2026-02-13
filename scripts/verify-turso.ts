import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

try {
  const books = await client.execute("SELECT COUNT(*) as count FROM books");
  const categories = await client.execute(
    "SELECT COUNT(*) as count FROM categories"
  );
  const plans = await client.execute(
    "SELECT COUNT(*) as count FROM subscription_plans"
  );

  console.log("Books:", (books.rows[0] as any).count);
  console.log("Categories:", (categories.rows[0] as any).count);
  console.log("Subscription plans:", (plans.rows[0] as any).count);

  // Show first book
  const firstBook = await client.execute(
    "SELECT id, titleFr, slug, author FROM books LIMIT 3"
  );
  console.log("Sample books:", JSON.stringify(firstBook.rows, null, 2));
} catch (e) {
  console.error("Error:", e);
} finally {
  client.close();
}
