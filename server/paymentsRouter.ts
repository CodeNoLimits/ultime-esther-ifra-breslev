import Stripe from "stripe";
import type { Express } from "express";
import * as db from "./db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-01-28.clover" as any,
});

const SITE_URL = process.env.SITE_URL || process.env.VITE_APP_URL || "https://esther-code-live.vercel.app";

export function registerPaymentRoutes(app: Express) {
  // POST /api/checkout — Create Stripe Checkout Session
  app.post("/api/checkout", async (req, res) => {
    try {
      if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(500).json({ error: "Stripe non configuré" });
      }

      const { items, shippingAddress } = req.body as {
        items: Array<{ bookId: number; quantity: number; type: "physical" | "digital" }>;
        shippingAddress?: {
          fullName: string;
          address: string;
          city: string;
          postalCode?: string;
          country?: string;
          phone?: string;
        };
      };

      if (!items || items.length === 0) {
        return res.status(400).json({ error: "Panier vide" });
      }

      // Build Stripe line items
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

      for (const item of items) {
        const book = await db.getBookById(item.bookId);
        if (!book) continue;

        const price = item.type === "physical"
          ? (book.pricePhysical ?? 0)
          : (book.priceDigital ?? 0);

        if (price <= 0) continue;

        lineItems.push({
          price_data: {
            currency: "ils",
            product_data: {
              name: `${book.titleFr || book.titleEn}${item.type === "digital" ? " (Numérique)" : " (Broché)"}`,
              description: book.author ?? undefined,
            },
            unit_amount: price, // already in agorot (cents)
          },
          quantity: item.quantity,
        });
      }

      if (lineItems.length === 0) {
        return res.status(400).json({ error: "Aucun article valide" });
      }

      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${SITE_URL}/checkout`,
        locale: "fr",
        metadata: {
          source: "breslev-books",
        },
      };

      if (shippingAddress) {
        sessionParams.shipping_address_collection = { allowed_countries: ["IL", "FR", "CA", "BE", "CH"] };
      }

      const session = await stripe.checkout.sessions.create(sessionParams);
      return res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe checkout error:", error);
      return res.status(500).json({ error: error.message || "Erreur Stripe" });
    }
  });

  // POST /api/paypal/create-order — PayPal Order (redirect to PayPal)
  app.post("/api/paypal/create-order", async (req, res) => {
    try {
      const { amount, currency, description } = req.body as {
        amount: string;
        currency: string;
        description: string;
      };

      const clientId = process.env.PAYPAL_CLIENT_ID;
      const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        return res.status(500).json({ error: "PayPal non configuré" });
      }

      // Get PayPal access token
      const tokenRes = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
      });

      const tokenData = await tokenRes.json() as { access_token: string };

      // Create PayPal order
      const orderRes = await fetch("https://api-m.paypal.com/v2/checkout/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: { currency_code: currency || "ILS", value: amount },
              description,
            },
          ],
          application_context: {
            return_url: `${SITE_URL}/success`,
            cancel_url: `${SITE_URL}/checkout`,
            locale: "fr-FR",
          },
        }),
      });

      const order = await orderRes.json() as {
        id: string;
        links: Array<{ rel: string; href: string }>;
      };
      const approvalUrl = order.links?.find((l) => l.rel === "approve")?.href;

      return res.json({ orderId: order.id, approvalUrl });
    } catch (error: any) {
      console.error("PayPal error:", error);
      return res.status(500).json({ error: error.message || "Erreur PayPal" });
    }
  });

  // POST /api/contact — Send contact email via Resend
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body as {
        name: string;
        email: string;
        message: string;
      };

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Champs requis manquants" });
      }

      const resendKey = process.env.RESEND_API_KEY;
      if (!resendKey) {
        console.error("RESEND_API_KEY not configured");
        return res.status(500).json({ error: "Service email non configuré" });
      }

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "contact@breslev.fr",
          to: ["contact@breslev.fr"],
          reply_to: email,
          subject: `[Breslev.fr] Message de ${name}`,
          html: `
            <h2>Nouveau message depuis breslev.fr</h2>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <hr/>
            <p><strong>Message :</strong></p>
            <p>${message.replace(/\n/g, "<br/>")}</p>
          `,
          text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { message?: string };
        throw new Error(err.message || `Resend error ${response.status}`);
      }

      return res.json({ success: true });
    } catch (error: any) {
      console.error("Contact email error:", error);
      return res.status(500).json({ error: error.message || "Erreur envoi email" });
    }
  });
}
