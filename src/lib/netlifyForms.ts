/**
 * Best-effort Netlify Forms submission.
 *
 * The React handlers post the lead straight to the lead API, which is what decides whether
 * the visitor sees success. That path never touches Netlify, so `submission_created` never
 * fires — and the josh@contractorschoiceagency.com notification hook created 2026-08-15 has
 * therefore never sent a single email. Posting the same fields urlencoded to "/" (the shape
 * Netlify's form backend expects on a static export) makes the hook fire without changing
 * the lead API path at all.
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
