// create-checkout-session-v2 — Stripe Checkout Session for Full Access, with regional (PPP) pricing.
// Faithful to create-checkout-session, plus an optional `tier` that selects a server-controlled price.
// Required secrets: STRIPE_SECRET_KEY.
//
// Security: the client may only pass a tier KEY (t1/t2/t3). The amount is resolved from a fixed
// server-side map; the client can never set an arbitrary price. Unknown/missing tier => full price.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

// USD cents. Flat single price ($45) for all tiers. Fail-safe default is $45.
const TIER_AMOUNTS: Record<string, number> = {
  t1: 4500,
  t2: 4500,
  t3: 4500
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...CORS, "Content-Type": "application/json" }
    });
  }

  const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
  if (!STRIPE_SECRET_KEY) {
    return new Response(JSON.stringify({
      error: "payment_not_configured",
      message: "Payment processing is being set up. Please check back shortly."
    }), { status: 503, headers: { ...CORS, "Content-Type": "application/json" } });
  }

  try {
    const { user_id, email, success_url, cancel_url, tier } = await req.json();
    if (!user_id || !email) {
      return new Response(JSON.stringify({ error: "user_id and email required" }), {
        status: 400, headers: { ...CORS, "Content-Type": "application/json" }
      });
    }

    // Resolve price from the fixed map; anything unrecognised falls back to full price.
    const unit_amount = TIER_AMOUNTS[String(tier)] ?? TIER_AMOUNTS.t3;

    const base = success_url || "https://gbsinsiderclub.com/paid-tier.html?payment=success";
    const successWithSession = base + (base.includes("?") ? "&" : "?") + "session_id={CHECKOUT_SESSION_ID}";

    const params = new URLSearchParams({
      mode: "payment",
      "line_items[0][quantity]": "1",
      client_reference_id: user_id,
      customer_email: email,
      success_url: successWithSession,
      cancel_url: cancel_url || "https://gbsinsiderclub.com/paid-tier.html?payment=cancelled",
      "allow_promotion_codes": "true"
    });
    params.set("line_items[0][price_data][currency]", "usd");
    params.set("line_items[0][price_data][unit_amount]", String(unit_amount));
    params.set("line_items[0][price_data][product_data][name]", "GBS Insider Club — Full Access");
    params.set("line_items[0][price_data][product_data][description]", "All learning paths, templates, exercises, and future updates. Lifetime access.");

    const resp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });

    const session = await resp.json();
    if (!resp.ok) {
      console.error("Stripe error:", session);
      return new Response(JSON.stringify({
        error: "stripe_error",
        message: session?.error?.message || "Stripe error"
      }), { status: 502, headers: { ...CORS, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ url: session.url, id: session.id, amount: unit_amount }), {
      status: 200, headers: { ...CORS, "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("create-checkout-session-v2 error:", err);
    return new Response(JSON.stringify({ error: "internal_error" }), {
      status: 500, headers: { ...CORS, "Content-Type": "application/json" }
    });
  }
});
