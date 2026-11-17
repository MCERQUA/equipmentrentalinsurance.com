"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE } from "@/lib/site";
import { COPY } from "@/lib/content";
import { CheckCircle2, ShieldCheck, ArrowRight, Clock, Zap, MapPin } from "lucide-react";
import {
  ALL_FIELDS, BY_NAME, FIELDS, MAX_MACHINES, NOTICE, OTHER_COVERAGES, SECTIONS, isRequired, isShown,
  listOf, validateQuote, type Field, type Flat,
} from "./quote-spec";

const trustItems = [
  { icon: ShieldCheck, title: COPY.quote.trustNicheTitle, desc: COPY.quote.trustNicheDesc },
  { icon: Zap, title: "~15-minute quotes", desc: "Real quotes from real markets, fast." },
  { icon: Clock, title: "2-hour claims response", desc: "When a loss hits, you reach a person." },
  { icon: MapPin, title: "All 50 states", desc: `Licensed nationwide — NPN #${SITE.npn}.` },
];

const inputClass = "w-full px-4 py-3 rounded-xl border border-adobe bg-cream/50 text-espresso placeholder-mocha/60 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all text-sm";
const labelClass = "block text-sm font-heading font-semibold text-espresso mb-1.5";

const blank = (): Flat => Object.fromEntries([...ALL_FIELDS, "bot-field"].map((k) => [k, ""]));

export default function QuotePage() {
  const [values, setValues] = useState<Flat>(blank);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const errors = useMemo(() => validateQuote(values), [values]);
  const errorNames = Object.keys(errors);
  const valid = errorNames.length === 0;

  const set = (name: string, v: string) => setValues((p) => ({ ...p, [name]: v }));
  const touch = (name: string) => setTouched((p) => ({ ...p, [name]: true }));
  const toggleCoverage = (value: string, on: boolean) => {
    const cur = listOf(values.coverageTypes);
    const next = on ? [...cur, value] : cur.filter((x) => x !== value);
    set("coverageTypes", OTHER_COVERAGES.map((c) => c.value).filter((x) => next.includes(x)).join(", "));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values["bot-field"]) return;
    if (!valid) { setTouched(Object.fromEntries(errorNames.map((n) => [n, true]))); return; }
    setSubmitting(true);
    setFormError("");
    setServerErrors({});
    try {
      const res = await fetch("/api/quote-request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ "form-name": "quote", ...values }) });
      if (res.ok) { setSubmitted(true); return; }
      let body: { errors?: Record<string, string> } = {};
      try { body = await res.json(); } catch { /* not json */ }
      if (res.status === 422 && body.errors) { setServerErrors(body.errors); setTouched(Object.fromEntries(Object.keys(body.errors).map((n) => [n, true]))); setFormError("Please fix the fields marked below."); }
      else setFormError(COPY.quote.errorMessage);
    } catch {
      setFormError(COPY.quote.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const shownErr = (name: string) => (touched[name] ? errors[name] || serverErrors[name] : "");
  const star = (f: Field) => (isRequired(f, values) ? " *" : "");
  const labelText = (f: Field) => f.label + star(f);

  const control = (f: Field) => {
    const common = { id: f.name, name: f.name, value: values[f.name] || "", onBlur: () => touch(f.name), className: inputClass, "aria-describedby": `err-${f.name}`, "aria-invalid": !!shownErr(f.name) } as const;
    const on = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => set(f.name, e.target.value);
    const ph = f.placeholder;
    switch (f.kind) {
      case "select":
        return (<select {...common} onChange={on} autoComplete={f.autocomplete}><option value="">Select…</option>{(f.options || []).map((o) => (<option key={o} value={o}>{o}</option>))}</select>);
      case "yn":
        return (<select {...common} onChange={on}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select>);
      case "textarea":
        return (<textarea {...common} onChange={on} rows={3} maxLength={f.max} placeholder={ph} className={`${inputClass} resize-none`} />);
      case "date": return (<input {...common} onChange={on} type="date" />);
      case "time": return (<input {...common} onChange={on} type="time" />);
      case "email": return (<input {...common} onChange={on} type="email" maxLength={f.max} autoComplete={f.autocomplete} />);
      case "tel": return (<input {...common} onChange={on} type="tel" maxLength={f.max} autoComplete={f.autocomplete} />);
      case "zip": case "int": case "year": case "sic": case "naics": return (<input {...common} onChange={on} type="text" inputMode="numeric" maxLength={f.max} placeholder={ph} autoComplete={f.autocomplete} />);
      case "money": case "money0": return (<input {...common} onChange={on} type="text" inputMode="decimal" maxLength={f.max} placeholder={ph} />);
      default: return (<input {...common} onChange={on} type="text" maxLength={f.max} placeholder={ph} autoComplete={f.autocomplete} />);
    }
  };

  const fieldBlock = (f: Field) => (
    <div key={f.name} data-field={f.name}>
      <label htmlFor={f.name} className={labelClass}>{labelText(f)}</label>
      {f.note && <p className="text-xs text-mocha mb-1.5">{f.note}</p>}
      {control(f)}
      <p id={`err-${f.name}`} role="alert" className="text-red-600 text-xs mt-1">{shownErr(f.name)}</p>
    </div>
  );

  const groupTitle = (g: string) => {
    const n = g.split("-")[1];
    return g.startsWith("operator") ? `Additional operator ${n} (optional; complete the whole block if you start it)` : `Machine ${n} (optional; complete the whole row if you start it)`;
  };

  const renderSection = (sectionId: string) => {
    const fs = FIELDS.filter((f) => f.section === sectionId && !f.coverageKey && isShown(f, values));
    const out: React.ReactNode[] = [];
    let i = 0;
    while (i < fs.length) {
      const f = fs[i];
      if (f.group) {
        const g = f.group;
        const block = fs.filter((x) => x.group === g);
        const hasValue = block.some((x) => (values[x.name] || "").trim() !== "");
        const hasError = block.some((x) => !!shownErr(x.name));
        out.push(
          <details key={g} open={hasValue || hasError} className="rounded-xl border border-adobe bg-white p-4">
            <summary className="cursor-pointer text-sm font-heading font-semibold text-espresso">{groupTitle(g)}</summary>
            <div className="mt-3 grid sm:grid-cols-2 gap-4">{block.map(fieldBlock)}</div>
          </details>,
        );
        i += block.length;
        continue;
      }
      if (f.kind === "checks") {
        out.push(
          <div key={f.name} data-field={f.name}>
            <p className={labelClass}>{f.label}</p>
            <div className="space-y-3">
              {OTHER_COVERAGES.map((c) => {
                const det = BY_NAME[`otherCoverageDetail_${c.key}`];
                const on = listOf(values.coverageTypes).includes(c.value);
                return (
                  <div key={c.key}>
                    <label className="flex items-center gap-2 text-sm text-espresso"><input type="checkbox" name="coverageTypes" value={c.value} checked={on} onChange={(e) => toggleCoverage(c.value, e.target.checked)} /> {c.label}</label>
                    {on && <div className="mt-2 ml-6">{fieldBlock(det)}</div>}
                  </div>
                );
              })}
            </div>
            <p id={`err-${f.name}`} role="alert" className="text-red-600 text-xs mt-1">{shownErr(f.name)}</p>
          </div>,
        );
        i += 1;
        continue;
      }
      out.push(fieldBlock(f));
      i += 1;
    }
    return out;
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="relative bg-warm-radial pt-32 pb-20 md:pt-40 md:pb-28 overflow-x-clip">
          <div className="container-wide">
            <FadeIn className="text-center max-w-2xl mx-auto mb-12">
              <span className="pill-clay"><ShieldCheck className="h-3.5 w-3.5" /> Free quote</span>
              <h1 className="mt-5 font-heading font-extrabold text-espresso text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                {COPY.quote.h1Lead}{" "}
                <span className="bg-gradient-to-r from-clay via-clay-light to-gold-dark bg-clip-text text-transparent">{COPY.quote.h1Highlight}</span>
              </h1>
              <p className="mt-5 lead">{COPY.quote.lead}</p>
            </FadeIn>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                {trustItems.map((item) => (
                  <FadeIn key={item.title}>
                    <div className="flex gap-3 p-5 rounded-2xl bg-white border border-adobe shadow-card">
                      <span className="flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-clay/10 text-clay"><item.icon className="h-5 w-5" strokeWidth={2.2} /></span>
                      <div>
                        <p className="font-heading font-bold text-espresso text-sm">{item.title}</p>
                        <p className="text-mocha text-xs leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              <div className="lg:col-span-2">
                {submitted ? (
                  <FadeIn>
                    <div className="p-10 md:p-12 rounded-3xl bg-white border border-adobe shadow-card text-center">
                      <div className="w-16 h-16 rounded-full bg-sage/15 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="h-8 w-8 text-sage" /></div>
                      <h2 className="font-heading font-extrabold text-espresso text-2xl mb-3">Quote request received</h2>
                      <p className="text-mocha mb-2">Thank you! We'll review your operation and reach out within one business day with personalized quotes.</p>
                      <Link href="/" className="btn-secondary mt-6 inline-flex">Back to home</Link>
                    </div>
                  </FadeIn>
                ) : (
                  <FadeIn>
                    <form name="quote" id="quote-form" onSubmit={handleSubmit} noValidate className="rounded-3xl bg-white border border-adobe shadow-card p-7 md:p-9 space-y-5">
                      <input type="hidden" name="form-name" value="quote" />
                      <input name="bot-field" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={values["bot-field"]} onChange={(e) => set("bot-field", e.target.value)} style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

                      <p className="text-sm text-espresso font-heading font-semibold rounded-xl bg-cream/60 border border-adobe p-4" role="note">{NOTICE}</p>

                      {SECTIONS.map((s) => (
                        <fieldset key={s.id} className="rounded-2xl border border-adobe bg-cream/40 p-5 space-y-4">
                          <legend className="px-2 font-heading font-bold text-espresso text-sm">{s.title}</legend>
                          {s.id === "operators" && <p className="text-xs text-mocha">We do not collect driver licence or date of birth here; your agent will follow up on operator details if needed.</p>}
                          {s.id === "equipment" && <p className="text-xs text-mocha">Equipment 1 is required, including its serial number. Renting more machines? Open machine 2-{MAX_MACHINES}; if you start a row, complete the whole row.</p>}
                          <div className="grid sm:grid-cols-2 gap-4">{renderSection(s.id)}</div>
                        </fieldset>
                      ))}

                      {formError && <p className="text-red-600 text-sm font-medium" role="alert">{formError}</p>}
                      {!valid && (
                        <p className="text-sm text-espresso" role="status" aria-live="polite" id="still-needed">
                          Still needed ({errorNames.length}): {errorNames.slice(0, 3).map((n) => errors[n]).join("; ")}{errorNames.length > 3 ? "; …" : ""}
                        </p>
                      )}
                      <button type="submit" disabled={submitting || !valid} className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-clay-gradient text-white font-heading font-bold rounded-full shadow-warm hover:shadow-warm-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                        {submitting ? "Sending…" : "Request my free quote"}{!submitting && <ArrowRight className="h-5 w-5" />}
                      </button>
                      <p className="text-xs text-center text-mocha/70">No spam. No commitment. We'll only contact you about your quote.</p>
                    </form>
                  </FadeIn>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
