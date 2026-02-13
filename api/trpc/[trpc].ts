import { createClient, type Client } from "@libsql/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { join } from "path";

// ── DB Setup ──────────────────────────────────────────────────
// Production (Vercel): uses Turso cloud URL if set, otherwise bundled sqlite.db
// Local dev: falls back to file:sqlite.db in project root
let _client: Client | null = null;
function getClient(): Client {
  if (_client) return _client;
  if (process.env.TURSO_DATABASE_URL) {
    _client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  } else {
    // On Vercel, CWD is /var/task and sqlite.db is included via includeFiles
    const dbPath = join(process.cwd(), "sqlite.db");
    _client = createClient({ url: `file:${dbPath}` });
  }
  return _client;
}

// ── SQL Queries ───────────────────────────────────────────────
const queries: Record<string, (input?: any) => Promise<any>> = {
  "system.healthCheck": async () => ({ status: "ok" }),
  "auth.me": async () => null,
  "auth.logout": async () => ({ success: true }),

  "books.getAll": async () => {
    const r = await getClient().execute("SELECT * FROM books ORDER BY titleFr ASC");
    return r.rows;
  },
  "books.getFeatured": async () => {
    const r = await getClient().execute("SELECT * FROM books WHERE featured = 1");
    return r.rows;
  },
  "books.getBySlug": async (input: any) => {
    const r = await getClient().execute({
      sql: "SELECT * FROM books WHERE slug = ?",
      args: [input.slug],
    });
    return r.rows[0] || null;
  },
  "books.getFiltered": async () => {
    const r = await getClient().execute("SELECT * FROM books ORDER BY titleFr ASC");
    return r.rows;
  },

  "categories.getAll": async () => {
    const r = await getClient().execute("SELECT * FROM categories");
    return r.rows;
  },
  "categories.getById": async (input: any) => {
    const r = await getClient().execute({
      sql: "SELECT * FROM categories WHERE id = ?",
      args: [input.id],
    });
    return r.rows[0] || null;
  },

  "subscriptions.getPlans": async () => {
    const r = await getClient().execute("SELECT * FROM subscription_plans");
    return r.rows;
  },
  "subscriptions.getPlanById": async (input: any) => {
    const r = await getClient().execute({
      sql: "SELECT * FROM subscription_plans WHERE id = ?",
      args: [input.id],
    });
    return r.rows[0] || null;
  },

  // Stubs for authenticated routes
  "favorites.getMy": async () => [],
  "favorites.add": async () => null,
  "favorites.remove": async () => null,
  "reading.getProgress": async () => [],
  "reading.updateProgress": async () => null,
  "cart.get": async () => [],
  "cart.add": async () => null,
  "cart.remove": async () => null,
  "cart.clear": async () => [],
};

// ── Handler ───────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const url = new URL(req.url!, `https://${req.headers.host}`);
    const path = url.pathname.replace("/api/trpc/", "");

    // tRPC batched queries: "books.getAll,auth.me"
    const procedureNames = path.split(",");
    const isBatch = procedureNames.length > 1;

    // Parse input
    const rawInput = url.searchParams.get("input");
    let inputs: Record<string, any> = {};
    if (rawInput) {
      try {
        const parsed = JSON.parse(rawInput);
        if (isBatch) {
          inputs = parsed;
        } else {
          inputs = { "0": parsed };
        }
      } catch {}
    }

    const results: any[] = [];

    for (let i = 0; i < procedureNames.length; i++) {
      const procName = procedureNames[i];
      const queryFn = queries[procName];

      if (!queryFn) {
        results.push({
          error: { message: `Unknown: ${procName}`, code: -32004 },
        });
        continue;
      }

      try {
        const input = inputs[String(i)]?.json ?? inputs[String(i)] ?? undefined;
        const data = await queryFn(input);
        results.push({ result: { data: { json: data } } });
      } catch (error: any) {
        results.push({ error: { message: error.message, code: -32603 } });
      }
    }

    res.setHeader("Content-Type", "application/json");

    if (isBatch) {
      return res.status(200).json(results);
    } else {
      return res.status(200).json(results[0]);
    }
  } catch (error: any) {
    return res.status(500).json({ error: { message: error.message } });
  }
}
