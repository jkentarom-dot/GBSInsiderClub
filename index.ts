// Supabase Edge Function: notify-waitlist
// Triggered by: Supabase Database Webhook on waitlist INSERT
// Sends email notification via Namecheap SMTP to julian.magata@gbsinsiderclub.com
//
// Deploy with Supabase CLI:
//   supabase functions deploy notify-waitlist
//
// Set secrets with:
//   supabase secrets set SMTP_PASS=yourpassword
//   supabase secrets set NOTIFY_EMAIL=julian.magata@gbsinsiderclub.com
//   supabase secrets set WEBHOOK_SECRET=gbs2026insider

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

serve(async (req) => {
  // ── Verify webhook secret ──────────────────────
  const secret = req.headers.get("x-webhook-secret");
  if (secret !== Deno.env.get("WEBHOOK_SECRET")) {
    return new Response("Unauthorized", { status: 401 });
  }

  // ── Parse payload ──────────────────────────────
  let payload;
  try {
    payload = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const email    = payload?.record?.email || "unknown";
  const time     = new Date().toLocaleString("en-GB", { timeZone: "Europe/Warsaw" });
  const notifyTo = Deno.env.get("NOTIFY_EMAIL") || "julian.magata@gbsinsiderclub.com";
  const smtpPass = Deno.env.get("SMTP_PASS") || "";

  // ── Send via Namecheap SMTP ────────────────────
  const client = new SmtpClient();

  try {
    await client.connectTLS({
      hostname: "mail.privateemail.com",
      port: 465,
      username: "julian.magata@gbsinsiderclub.com",
      password: smtpPass,
    });

    await client.send({
      from: "GBS Insider Club <julian.magata@gbsinsiderclub.com>",
      to: notifyTo,
      subject: "🔔 New Waitlist Signup — GBS Insider Club",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#f9f9f9;border-radius:8px;">
          <div style="background:#05080f;padding:20px 24px;border-radius:6px 6px 0 0;border-bottom:2px solid #b89438;">
            <span style="color:#b89438;font-weight:700;font-size:16px;letter-spacing:0.05em;">GBS INSIDER CLUB</span>
          </div>
          <div style="background:#ffffff;padding:28px 24px;border-radius:0 0 6px 6px;border:1px solid #e0e0e0;border-top:none;">
            <h2 style="color:#1a1a2e;font-size:20px;margin:0 0 16px;">New Waitlist Signup</h2>
            <p style="color:#444;font-size:15px;margin:0 0 8px;"><strong>Email:</strong> ${email}</p>
            <p style="color:#444;font-size:15px;margin:0 0 24px;"><strong>Time:</strong> ${time}</p>
            <a href="https://supabase.com/dashboard/project/wgdcfgknnentriqlajqe/editor"
              style="display:inline-block;background:#b89438;color:#05080f;font-weight:700;font-size:13px;padding:10px 20px;border-radius:4px;text-decoration:none;">
              View in Supabase →
            </a>
          </div>
        </div>
      `,
    });

    await client.close();
    return new Response("OK", { status: 200 });

  } catch (err) {
    console.error("SMTP error:", err);
    return new Response("Email failed: " + err.message, { status: 500 });
  }
});
