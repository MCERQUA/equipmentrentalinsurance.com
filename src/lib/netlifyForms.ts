/**
 * Best-effort Netlify Forms submission.
 *
 * The React handlers post the lead straight to the lead API, which is what decides whether
 * the visitor sees success. That path never touches Netlify, so `submission_created` never
 * fires — and this site's two actual notification hooks (created 2026-07-09, to
 * joshai@inkboxmail.com and joshai@agentmail.to — confirmed via host's fleet-wide Netlify API
 * check; no josh@contractorschoiceagency.com hook exists anywhere in the fleet, the 2026-10-15
 * removal held) would never fire without this call. Posting the same fields urlencoded to "/"
 * (the shape Netlify's form backend expects on a static export) makes those hooks fire without
 * changing the lead API path at all.
 *
 * Deliberately swallows every error: a Netlify hiccup must not turn a lead that the API
 * already accepted into a failure message for the visitor.
 */
export async function postToNetlify(formName: string, fields: Record<string, string>): Promise<void> {
  try {
    const body = new URLSearchParams({ "form-name": formName, ...fields });
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
  } catch {
    /* non-fatal — the lead API call is the authoritative path */
  }
}
