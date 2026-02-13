import { createClient, type Client } from "@libsql/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { join } from "path";

let _client: Client | null = null;
function getClient(): Client {
  if (_client) return _client;
  if (process.env.TURSO_DATABASE_URL) {
    _client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  } else {
    const dbPath = join(process.cwd(), "sqlite.db");
    _client = createClient({ url: `file:${dbPath}` });
  }
  return _client;
}

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const client = getClient();
    const result = await client.execute(
      "SELECT id, titleFr, slug, author, pricePhysical FROM books LIMIT 5"
    );

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
