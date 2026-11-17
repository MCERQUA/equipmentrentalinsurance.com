// Regenerates the `quote` form registration block in public/__forms.html from the shared spec
// (src/app/quote/quote-spec.ts). Netlify DROPS any posted field that is not registered here.
// Run: node scripts/gen-forms-registration.mjs   (Node 22.6+ strips the TS types natively)
import fs from "node:fs";
const { FIELDS, ALL_FIELDS } = await import("../src/app/quote/quote-spec.ts");

const reg = [`<form name="quote" data-netlify="true" netlify-honeypot="bot-field" hidden>`, `  <input type="hidden" name="form-name" value="quote" />`];
for (const n of ALL_FIELDS) {
  const f = FIELDS.find((x) => x.name === n);
  if (!f) reg.push(`  <input type="text" name="${n}" />`);
  else if (f.kind === "select" || f.kind === "yn") reg.push(`  <select name="${n}"></select>`);
  else if (f.kind === "textarea") reg.push(`  <textarea name="${n}"></textarea>`);
  else if (f.kind === "checks") reg.push(`  <input type="checkbox" name="${n}" />`);
  else if (f.kind === "email") reg.push(`  <input type="email" name="${n}" />`);
  else if (f.kind === "tel") reg.push(`  <input type="tel" name="${n}" />`);
  else if (f.kind === "date") reg.push(`  <input type="date" name="${n}" />`);
  else reg.push(`  <input type="text" name="${n}" />`);
}
reg.push(`  <input name="bot-field" type="text" />`, `</form>`);
const p = "public/__forms.html";
let forms = fs.readFileSync(p, "utf8");
const a = forms.indexOf('<form name="quote"');
const b = forms.indexOf("</form>", a) + "</form>".length;
if (a < 0) throw new Error("quote form not found");
forms = forms.slice(0, a) + reg.join("\n") + forms.slice(b);
fs.writeFileSync(p, forms);
console.log("registered fields:", ALL_FIELDS.length);
