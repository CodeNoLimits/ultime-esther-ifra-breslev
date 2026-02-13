import { createClient, type Client } from "@libsql/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { join } from "path";
import Stripe from "stripe";

// ── DB Client (same pattern as other API files) ──
let _dbClient: Client | null = null;
function getDbClient(): Client {
  if (_dbClient) return _dbClient;
  if (process.env.TURSO_DATABASE_URL) {
    _dbClient = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  } else {
    _dbClient = createClient({
      url: `file:${join(process.cwd(), "sqlite.db")}`,
    });
  }
  return _dbClient;
}

// ── Stripe Client ──
function getStripe(): Stripe | null {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

interface CartItem {
  bookId: number;
  quantity: number;
  type: "physical" | "digital";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const stripe = getStripe();
  if (!stripe) {
    return res.status(503).json({
      error: "Payments not configured yet. Please contact the shop owner.",
    });
  }

  try {
    const { items } = req.body as { items: CartItem[] };

    if (!items?.length) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Get real prices from database (NEVER trust client prices)
    const db = getDbClient();
    const bookIds = items.map((i) => i.bookId);
    const placeholders = bookIds.map(() => "?").join(",");
    const result = await db.execute({
      sql: `SELECT id, titleFr, pricePhysical, priceDigital, coverImageUrl FROM books WHERE id IN (${placeholders})`,
      args: bookIds,
    });

    const booksMap = new Map<number, any>();
    for (const row of result.rows) {
      booksMap.set(Number(row.id), row);
    }

    // Build Stripe line items from DB prices
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    for (const item of items) {
      const book = booksMap.get(item.bookId);
      if (!book) continue;

      const price =
        item.type === "digital"
          ? Number(book.priceDigital)
          : Number(book.pricePhysical);

      lineItems.push({
        price_data: {
          currency: "ils",
          product_data: {
            name: String(book.titleFr),
            ...(book.coverImageUrl
              ? {
                  images: [
                    `https://ultime-esther-ifra-breslev.vercel.app${book.coverImageUrl}`,
                  ],
                }
              : {}),
          },
          unit_amount: price, // Already in centimes (agorot)
        },
        quantity: item.quantity,
      });
    }

    if (!lineItems.length) {
      return res.status(400).json({ error: "No valid items in cart" });
    }

    const origin =
      req.headers.origin ||
      `https://${req.headers.host}` ||
      "https://ultime-esther-ifra-breslev.vercel.app";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/panier`,
      locale: "fr",
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["IL", "FR", "CA", "US", "GB"],
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return res.status(500).json({ error: error.message });
  }
}
