import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient, type Client } from "@libsql/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { join } from "path";

// ── DB Setup ──────────────────────────────────────────────────
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

// ── Supabase Admin (for JWT verification) ─────────────────────
function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !key) return null;
  return createSupabaseClient(url, key);
}

// ── Auth helper ───────────────────────────────────────────────
async function getUser(
  req: VercelRequest
): Promise<{ id: string; email: string } | null> {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  try {
    const {
      data: { user },
      error,
    } = await sb.auth.getUser(token);
    if (error || !user) return null;
    return { id: user.id, email: user.email || "" };
  } catch {
    return null;
  }
}

// ── Auto-migrate tables ───────────────────────────────────────
let _migrated = false;
async function ensureTables() {
  if (_migrated) return;
  const db = getClient();
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      bookId INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      type TEXT NOT NULL DEFAULT 'physical',
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      bookId INTEGER NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(userId, bookId)
    );
    CREATE TABLE IF NOT EXISTS reading_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      bookId INTEGER NOT NULL,
      currentPage INTEGER DEFAULT 0,
      totalPages INTEGER DEFAULT 0,
      progressPercent INTEGER DEFAULT 0,
      lastReadAt TEXT DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(userId, bookId)
    );
  `);
  _migrated = true;
}

// ── SQL Queries ───────────────────────────────────────────────
type User = { id: string; email: string } | null;
const queries: Record<
  string,
  (input: any, user: User) => Promise<any>
> = {
  "system.healthCheck": async () => ({ status: "ok" }),

  "auth.me": async (_input, user) => {
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      name: user.email.split("@")[0],
      role: "user",
    };
  },
  "auth.logout": async () => ({ success: true }),

  // ── Books ──
  "books.getAll": async () => {
    const r = await getClient().execute(
      "SELECT * FROM books ORDER BY titleFr ASC"
    );
    return r.rows;
  },
  "books.getFeatured": async () => {
    const r = await getClient().execute(
      "SELECT * FROM books WHERE featured = 1"
    );
    return r.rows;
  },
  "books.getBySlug": async (input) => {
    const r = await getClient().execute({
      sql: "SELECT * FROM books WHERE slug = ?",
      args: [input.slug],
    });
    return r.rows[0] || null;
  },
  "books.getFiltered": async () => {
    const r = await getClient().execute(
      "SELECT * FROM books ORDER BY titleFr ASC"
    );
    return r.rows;
  },

  // ── Categories ──
  "categories.getAll": async () => {
    const r = await getClient().execute("SELECT * FROM categories");
    return r.rows;
  },
  "categories.getById": async (input) => {
    const r = await getClient().execute({
      sql: "SELECT * FROM categories WHERE id = ?",
      args: [input.id],
    });
    return r.rows[0] || null;
  },

  // ── Subscriptions ──
  "subscriptions.getPlans": async () => {
    const r = await getClient().execute(
      "SELECT * FROM subscription_plans"
    );
    return r.rows;
  },
  "subscriptions.getPlanById": async (input) => {
    const r = await getClient().execute({
      sql: "SELECT * FROM subscription_plans WHERE id = ?",
      args: [input.id],
    });
    return r.rows[0] || null;
  },

  // ── Cart (REAL) ──
  "cart.get": async (_input, user) => {
    if (!user) return [];
    await ensureTables();
    const r = await getClient().execute({
      sql: `SELECT
              ci.id as ci_id, ci.bookId, ci.quantity, ci.type, ci.createdAt as ci_createdAt,
              b.titleFr, b.author, b.slug, b.coverImageUrl, b.pricePhysical, b.priceDigital, b.weight
            FROM cart_items ci
            JOIN books b ON ci.bookId = b.id
            WHERE ci.userId = ?
            ORDER BY ci.createdAt DESC`,
      args: [user.id],
    });
    return r.rows.map((row: any) => ({
      cartItem: {
        id: Number(row.ci_id),
        bookId: Number(row.bookId),
        quantity: Number(row.quantity),
        type: row.type,
        createdAt: row.ci_createdAt,
      },
      book: {
        id: Number(row.bookId),
        titleFr: row.titleFr,
        author: row.author,
        slug: row.slug,
        coverImageUrl: row.coverImageUrl,
        pricePhysical: Number(row.pricePhysical || 0),
        priceDigital: Number(row.priceDigital || 0),
        weight: Number(row.weight || 0),
      },
    }));
  },

  "cart.add": async (input, user) => {
    if (!user) return null;
    await ensureTables();
    const db = getClient();
    const existing = await db.execute({
      sql: "SELECT id, quantity FROM cart_items WHERE userId = ? AND bookId = ? AND type = ?",
      args: [user.id, input.bookId, input.type || "physical"],
    });
    if (existing.rows.length > 0) {
      await db.execute({
        sql: "UPDATE cart_items SET quantity = quantity + ? WHERE id = ?",
        args: [input.quantity || 1, existing.rows[0].id],
      });
    } else {
      await db.execute({
        sql: "INSERT INTO cart_items (userId, bookId, quantity, type) VALUES (?, ?, ?, ?)",
        args: [
          user.id,
          input.bookId,
          input.quantity || 1,
          input.type || "physical",
        ],
      });
    }
    return { success: true };
  },

  "cart.remove": async (input, user) => {
    if (!user) return null;
    await ensureTables();
    await getClient().execute({
      sql: "DELETE FROM cart_items WHERE id = ? AND userId = ?",
      args: [input.cartItemId, user.id],
    });
    return { success: true };
  },

  "cart.clear": async (_input, user) => {
    if (!user) return [];
    await ensureTables();
    await getClient().execute({
      sql: "DELETE FROM cart_items WHERE userId = ?",
      args: [user.id],
    });
    return [];
  },

  // ── Favorites (REAL) ──
  "favorites.getMy": async (_input, user) => {
    if (!user) return [];
    await ensureTables();
    const r = await getClient().execute({
      sql: `SELECT b.* FROM favorites f
            JOIN books b ON f.bookId = b.id
            WHERE f.userId = ?
            ORDER BY f.createdAt DESC`,
      args: [user.id],
    });
    return r.rows;
  },

  "favorites.add": async (input, user) => {
    if (!user) return null;
    await ensureTables();
    await getClient().execute({
      sql: "INSERT OR IGNORE INTO favorites (userId, bookId) VALUES (?, ?)",
      args: [user.id, input.bookId],
    });
    return { success: true };
  },

  "favorites.remove": async (input, user) => {
    if (!user) return null;
    await ensureTables();
    await getClient().execute({
      sql: "DELETE FROM favorites WHERE userId = ? AND bookId = ?",
      args: [user.id, input.bookId],
    });
    return { success: true };
  },

  // ── Reading Progress (REAL) ──
  "reading.getProgress": async (_input, user) => {
    if (!user) return [];
    await ensureTables();
    const r = await getClient().execute({
      sql: `SELECT rp.id, rp.bookId, rp.currentPage, rp.totalPages, rp.progressPercent, rp.lastReadAt,
                   b.titleFr, b.author, b.coverImageUrl
            FROM reading_progress rp
            JOIN books b ON rp.bookId = b.id
            WHERE rp.userId = ?
            ORDER BY rp.lastReadAt DESC`,
      args: [user.id],
    });
    return r.rows.map((row: any) => ({
      id: Number(row.id),
      bookId: Number(row.bookId),
      currentPage: Number(row.currentPage),
      totalPages: Number(row.totalPages),
      progressPercent: Number(row.progressPercent),
      lastReadAt: row.lastReadAt,
      book: {
        titleFr: row.titleFr,
        author: row.author,
        coverImageUrl: row.coverImageUrl,
      },
    }));
  },

  "reading.updateProgress": async (input, user) => {
    if (!user) return null;
    await ensureTables();
    const percent =
      input.totalPages > 0
        ? Math.round((input.currentPage / input.totalPages) * 100)
        : 0;
    // Try update first
    const result = await getClient().execute({
      sql: "UPDATE reading_progress SET currentPage = ?, totalPages = ?, progressPercent = ?, lastReadAt = CURRENT_TIMESTAMP WHERE userId = ? AND bookId = ?",
      args: [
        input.currentPage,
        input.totalPages,
        percent,
        user.id,
        input.bookId,
      ],
    });
    if (result.rowsAffected === 0) {
      await getClient().execute({
        sql: "INSERT INTO reading_progress (userId, bookId, currentPage, totalPages, progressPercent) VALUES (?, ?, ?, ?, ?)",
        args: [
          user.id,
          input.bookId,
          input.currentPage,
          input.totalPages,
          percent,
        ],
      });
    }
    return { success: true };
  },
};

// ── Handler ───────────────────────────────────────────────────
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const url = new URL(req.url!, `https://${req.headers.host}`);
    const path = url.pathname.replace("/api/trpc/", "");

    // tRPC batched queries: "books.getAll,auth.me"
    const procedureNames = path.split(",");
    const isBatch = procedureNames.length > 1;

    // Get authenticated user (if token provided)
    const user = await getUser(req);

    // Parse input from URL params (GET queries) or body (POST mutations)
    let inputs: Record<string, any> = {};

    if (req.method === "GET") {
      const rawInput = url.searchParams.get("input");
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
    } else if (req.method === "POST") {
      const body = req.body;
      if (body) {
        if (isBatch) {
          // Batched mutations
          inputs = typeof body === "string" ? JSON.parse(body) : body;
        } else {
          inputs = { "0": typeof body === "string" ? JSON.parse(body) : body };
        }
      }
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
        const input =
          inputs[String(i)]?.json ?? inputs[String(i)] ?? undefined;
        const data = await queryFn(input, user);
        results.push({ result: { data: { json: data } } });
      } catch (error: any) {
        results.push({
          error: { message: error.message, code: -32603 },
        });
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
