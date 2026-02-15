import type { VercelRequest, VercelResponse } from "@vercel/node";

const PAYPAL_API =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getPayPalToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
  ).toString("base64");

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || "PayPal auth failed");
  }
  return data.access_token;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_SECRET) {
    return res.status(503).json({ error: "PayPal not configured" });
  }

  try {
    const { amount, currency = "ILS", description } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    let token: string;
    try {
      token = await getPayPalToken();
    } catch (tokenErr: any) {
      console.error("PayPal auth failed:", tokenErr);
      return res.status(503).json({
        error: "PayPal authentication failed. Sandbox credentials may be invalid. Please use Stripe instead.",
      });
    }

    if (!token) {
      return res.status(503).json({
        error: "PayPal authentication failed. Please use Stripe instead.",
      });
    }
    const origin =
      req.headers.origin ||
      `https://${req.headers.host}` ||
      "https://ultime-esther-ifra-breslev.vercel.app";

    const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toString(),
            },
            description:
              description || "Librairie Breslev - Esther Ifrah",
          },
        ],
        application_context: {
          return_url: `${origin}/commande-confirmee`,
          cancel_url: `${origin}/panier`,
          brand_name: "Esther Ifrah - Litterature Breslev",
          locale: "fr-FR",
        },
      }),
    });

    const order = await orderRes.json();

    if (!orderRes.ok) {
      return res
        .status(500)
        .json({ error: order.message || "PayPal error" });
    }

    const approvalUrl = order.links?.find(
      (l: any) => l.rel === "approve"
    )?.href;

    return res.status(200).json({
      orderId: order.id,
      approvalUrl,
    });
  } catch (error: any) {
    console.error("PayPal create-order error:", error);
    return res.status(500).json({ error: error.message });
  }
}
