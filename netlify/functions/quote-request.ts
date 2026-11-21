// Server-side gate for the `quote` Netlify form (static export has no Next API routes, so
// this is a Netlify Function, auto-detected from netlify/functions, served at /api/quote-request).
// The browser POSTs here; we re-validate with the SAME rules the form uses (quote-spec.ts) and
// only then forward the submission to Netlify Forms (/__forms.html) and the leads pipeline.
// A request that fails validation reaches neither. This adds no notification of its own: the
// existing Netlify notification hooks fire from the forwarded submission exactly as before.
//
// Honest limit: a client that POSTs straight to Netlify Forms or the leads webhook (bypassing this
// function) is not stopped by code in this repo; closing that needs a Netlify-side change.
import { ALL_FIELDS, validateQuote, withDerived, type Flat } from "../../src/app/quote/quote-spec";

const LEADS_URL =
  "https://josh.jam-bot.com/social-api/api/leads/webhook/netlify?tenant=josh&site=equipmentrentalinsurance.com";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export default async (request: Request): Promise<Response> => {
  if (request.method !== "POST") return json({ ok: false, errors: { _form: "POST only" } }, 405);

  let incoming: URLSearchParams;
  try {
    const type = request.headers.get("content-type") || "";
    if (type.includes("application/json")) {
      const j = (await request.json()) as Record<string, unknown>;
      incoming = new URLSearchParams();
      for (const [k, v] of Object.entries(j || {})) incoming.append(k, String(v ?? ""));
    } else {
      incoming = new URLSearchParams(await request.text());
    }
  } catch {
    return json({ ok: false, errors: { _form: "Unreadable submission" } }, 400);
  }

  // honeypot: pretend success, forward nothing
  if ((incoming.get("bot-field") || "").trim()) return json({ ok: true });

  const raw: Flat = {};
  for (const f of ALL_FIELDS) raw[f] = incoming.getAll(f).join(", ");
  const errors = validateQuote(raw);
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);
  const data = withDerived(raw);

  const body = new URLSearchParams({ "form-name": "quote" });
  for (const f of ALL_FIELDS) body.append(f, data[f]);

  const origin = process.env.URL || new URL(request.url).origin;
  try {
    const res = await fetch(`${origin}/__forms.html`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      redirect: "manual",
    });
    if (!(res.ok || (res.status >= 300 && res.status < 400))) {
      return json({ ok: false, errors: { _form: `Forms service returned ${res.status}` } }, 502);
    }
  } catch {
    return json({ ok: false, errors: { _form: "Could not reach the forms service" } }, 502);
  }

  // Leads pipeline (the endpoint the page used to post to directly), only after validation passed.
  try {
    const lr = await fetch(LEADS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form_name: "quote", source: "equipmentrentalinsurance.com", ...data }),
    });
    // The webhook answers 200 with stored:false when it did not store the lead.
    if (lr.ok) {
      const j = (await lr.json().catch(() => null)) as { stored?: boolean } | null;
      // Netlify Forms already saved this lead above, so a retry would only duplicate it: log, never fail the visitor.
      if (j && j.stored === false) console.error("quote-request: leads webhook answered stored:false (lead is in Netlify Forms)");
    }
  } catch {
    /* unreachable leads webhook: unchanged, the Netlify Forms write above already succeeded */
  }

  return json({ ok: true });
};

export const config = { path: "/api/quote-request" };
