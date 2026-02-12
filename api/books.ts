import { createClient } from "@libsql/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { join } from "path";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const dbPath = join(process.cwd(), "sqlite.db");
    const client = createClient({ url: `file:${dbPath}` });

    const result = await client.execute(
      "SELECT id, titleFr, slug, author, pricePhysical FROM books LIMIT 5"
    );

    client.close();

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      books: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
    });
  }
}
