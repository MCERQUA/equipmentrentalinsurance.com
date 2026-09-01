"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE } from "@/lib/site";
import { US_STATES, QUOTE_SERVICE_TYPES, YEARS_OPTIONS, COPY } from "@/lib/content";
import { CheckCircle2, ShieldCheck, ArrowRight, Phone, Clock, Zap, MapPin } from "lucide-react";

const WEBHOOK_URL = `https://josh.jam-bot.com/social-api/api/leads/webhook/netlify?tenant=josh&site=${SITE.domain}`;

const trustItems = [
  { icon: ShieldCheck, title: COPY.quote.trustNicheTitle, desc: COPY.quote.trustNicheDesc },
  { icon: Zap, title: "~15-minute quotes", desc: "Real quotes from real markets, fast." },
  { icon: Clock, title: "2-hour claims response", desc: "When a loss hits, you reach a person." },
  { icon: MapPin, title: "All 50 states", desc: `Licensed nationwide — NPN #${SITE.npn}.` },
];

type EquipmentRow = { year: string; make: string; model: string; serial: string; value: string };
const blankEquipment = (): EquipmentRow => ({ year: "", make: "", model: "", serial: "", value: "" });
const MAX_EQUIPMENT = 10;

/** One line per piece, so the CSR reads it as a list rather than a blob. */
function serialiseEquipment(rows: EquipmentRow[]): string {
  return rows
    .filter((r) => r.year || r.make || r.model || r.serial || r.value)
    .map((r, i) => `${i + 1}. Year: ${r.year || "—"} | Make: ${r.make || "—"} | Model: ${r.model || "—"} | Serial: ${r.serial || "—"} | Value: ${r.value || "—"}`)
    .join("\n");
}

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: "", businessName: "", email: "", phone: "", streetAddress: "", state: "", fein: "",
    serviceType: "", yearsInBusiness: "", message: "", "bot-field": "",
  });
  // Josh (site-manager note): "create sections for rental equipment including year, make,
  // model, serial number, and value allow people to add multiple pieces of equipment".
  // Netlify Forms has no array type, so the rows live in React state and are flattened on
  // submit into (a) a serialised `equipment` block, (b) discrete first-item columns, and
  // (c) `equipmentCount` — the same shape c10insurance.com uses for vehicles/VINs.
  const [equipment, setEquipment] = useState<EquipmentRow[]>([blankEquipment()]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateEquipment = (i: number, field: keyof EquipmentRow, val: string) => {
    setEquipment((rows) => rows.map((r, idx) => (idx === i ? { ...r, [field]: val } : r)));
  };
  const addEquipment = () => setEquipment((rows) => (rows.length >= MAX_EQUIPMENT ? rows : [...rows, blankEquipment()]));
  const removeEquipment = (i: number) => setEquipment((rows) => (rows.length === 1 ? rows : rows.filter((_, idx) => idx !== i)));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData["bot-field"]) return;
    setSubmitting(true);
    setError("");
    const filled = equipment.filter((r) => r.year || r.make || r.model || r.serial || r.value);
    const first = filled[0];
    const equipmentFields = {
      equipment: serialiseEquipment(equipment),
      equipmentCount: String(filled.length),
      equipmentYear: first?.year ?? "",
      equipmentMake: first?.make ?? "",
      equipmentModel: first?.model ?? "",
      equipmentSerialNumber: first?.serial ?? "",
      equipmentValue: first?.value ?? "",
    };
    try {
      await fetch(WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ form_name: "quote", source: SITE.domain, ...formData, ...equipmentFields }) });
      setSubmitted(true);
    } catch {
      setError(COPY.quote.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-adobe bg-cream/50 text-espresso placeholder-mocha/60 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all text-sm";
  const labelClass = "block text-sm font-heading font-semibold text-espresso mb-1.5";

  return (
    <>
      <Navbar />
      <main>
        <section className="relative bg-warm-radial pt-32 pb-20 md:pt-40 md:pb-28">
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
                <FadeIn>
                  <div className="p-5 rounded-2xl bg-espresso text-cream text-center">
                    <p className="text-xs font-heading font-bold uppercase tracking-wider text-gold mb-2">Prefer to call?</p>
                    <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 text-cream font-heading font-extrabold text-xl hover:text-gold-light transition-colors"><Phone className="h-5 w-5" />{SITE.phone}</a>
                    <p className="text-xs text-cream/60 mt-1">{SITE.hours}</p>
                  </div>
                </FadeIn>
              </div>

              <div className="lg:col-span-2">
                {submitted ? (
                  <FadeIn>
                    <div className="p-10 md:p-12 rounded-3xl bg-white border border-adobe shadow-card text-center">
                      <div className="w-16 h-16 rounded-full bg-sage/15 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="h-8 w-8 text-sage" /></div>
                      <h2 className="font-heading font-extrabold text-espresso text-2xl mb-3">Quote request received</h2>
                      <p className="text-mocha mb-2">Thank you! We'll review your operation and reach out within one business day with personalized quotes.</p>
                      <p className="text-sm text-mocha">Need it sooner? Call <a href={SITE.phoneHref} className="text-clay font-heading font-semibold">{SITE.phone}</a>.</p>
                      <Link href="/" className="btn-secondary mt-6 inline-flex">Back to home</Link>
                    </div>
                  </FadeIn>
                ) : (
                  <FadeIn>
                    <form name="quote" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="rounded-3xl bg-white border border-adobe shadow-card p-7 md:p-9 space-y-5">
                      <input type="hidden" name="form-name" value="quote" />
                      <input name="bot-field" type="hidden" value={formData["bot-field"]} onChange={handleChange} className="hidden" />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="name" className={labelClass}>Full name *</label><input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Jane Smith" className={inputClass} /></div>
                        <div><label htmlFor="businessName" className={labelClass}>Business name *</label><input id="businessName" name="businessName" type="text" required value={formData.businessName} onChange={handleChange} placeholder={COPY.quote.businessPlaceholder} className={inputClass} /></div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="email" className={labelClass}>Email *</label><input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder={COPY.quote.emailPlaceholder} className={inputClass} /></div>
                        <div><label htmlFor="phone" className={labelClass}>Phone *</label><input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder={COPY.quote.phonePlaceholder} className={inputClass} /></div>
                      </div>

                      <div><label htmlFor="streetAddress" className={labelClass}>Business address *</label><input id="streetAddress" name="streetAddress" type="text" required value={formData.streetAddress} onChange={handleChange} placeholder="1234 W Main St, Phoenix, AZ 85001" className={inputClass} /></div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="fein" className={labelClass}>Federal Employer ID Number (FEIN)</label><input id="fein" name="fein" type="text" inputMode="numeric" value={formData.fein} onChange={handleChange} placeholder="12-3456789" className={inputClass} /></div>
                        <div><label htmlFor="state" className={labelClass}>Primary state *</label>
                          <select id="state" name="state" required value={formData.state} onChange={handleChange} className={inputClass}><option value="">Select a state…</option>{US_STATES.map((s) => (<option key={s} value={s}>{s}</option>))}</select>
                        </div>
                      </div>

                      <div><label htmlFor="yearsInBusiness" className={labelClass}>Years in business</label>
                        <select id="yearsInBusiness" name="yearsInBusiness" value={formData.yearsInBusiness} onChange={handleChange} className={inputClass}><option value="">Select…</option>{YEARS_OPTIONS.map((y) => (<option key={y} value={y}>{y}</option>))}</select>
                      </div>

                      <div className="rounded-2xl border border-adobe bg-cream/40 p-5 space-y-4">
                        <div>
                          <p className="font-heading font-bold text-espresso text-sm">Rental equipment</p>
                          <p className="text-xs text-mocha mt-0.5">List each piece you want covered. Add as many as you need.</p>
                        </div>

                        {equipment.map((row, i) => (
                          <div key={i} className="rounded-xl bg-white border border-adobe p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-heading font-bold uppercase tracking-wider text-mocha">Item {i + 1}</p>
                              {equipment.length > 1 && (
                                <button type="button" onClick={() => removeEquipment(i)} className="text-xs font-heading font-semibold text-clay hover:text-espresso transition-colors">Remove</button>
                              )}
                            </div>
                            <div className="grid sm:grid-cols-3 gap-3">
                              <div><label htmlFor={`equipYear${i}`} className={labelClass}>Year</label><input id={`equipYear${i}`} type="text" inputMode="numeric" value={row.year} onChange={(e) => updateEquipment(i, "year", e.target.value)} placeholder="2021" className={inputClass} /></div>
                              <div><label htmlFor={`equipMake${i}`} className={labelClass}>Make</label><input id={`equipMake${i}`} type="text" value={row.make} onChange={(e) => updateEquipment(i, "make", e.target.value)} placeholder="Bobcat" className={inputClass} /></div>
                              <div><label htmlFor={`equipModel${i}`} className={labelClass}>Model</label><input id={`equipModel${i}`} type="text" value={row.model} onChange={(e) => updateEquipment(i, "model", e.target.value)} placeholder="S650" className={inputClass} /></div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div><label htmlFor={`equipSerial${i}`} className={labelClass}>Serial number</label><input id={`equipSerial${i}`} type="text" value={row.serial} onChange={(e) => updateEquipment(i, "serial", e.target.value)} placeholder="ALJ812345" className={inputClass} /></div>
                              <div><label htmlFor={`equipValue${i}`} className={labelClass}>Value</label><input id={`equipValue${i}`} type="text" inputMode="numeric" value={row.value} onChange={(e) => updateEquipment(i, "value", e.target.value)} placeholder="$45,000" className={inputClass} /></div>
                            </div>
                          </div>
                        ))}

                        {equipment.length < MAX_EQUIPMENT && (
                          <button type="button" onClick={addEquipment} className="w-full px-4 py-2.5 rounded-xl border border-dashed border-clay/60 text-clay font-heading font-semibold text-sm hover:bg-clay/5 transition-colors">+ Add another piece of equipment</button>
                        )}

                        {/* Netlify captures only declared, named fields — these mirrors carry the
                            rows into the submission and are declared in public/__forms.html. */}
                        <input type="hidden" name="equipment" value={serialiseEquipment(equipment)} readOnly />
                        <input type="hidden" name="equipmentCount" value={String(equipment.filter((r) => r.year || r.make || r.model || r.serial || r.value).length)} readOnly />
                        <input type="hidden" name="equipmentYear" value={equipment[0]?.year ?? ""} readOnly />
                        <input type="hidden" name="equipmentMake" value={equipment[0]?.make ?? ""} readOnly />
                        <input type="hidden" name="equipmentModel" value={equipment[0]?.model ?? ""} readOnly />
                        <input type="hidden" name="equipmentSerialNumber" value={equipment[0]?.serial ?? ""} readOnly />
                        <input type="hidden" name="equipmentValue" value={equipment[0]?.value ?? ""} readOnly />
                      </div>

                      <div><label htmlFor="serviceType" className={labelClass}>What do you need? *</label>
                        <select id="serviceType" name="serviceType" required value={formData.serviceType} onChange={handleChange} className={inputClass}><option value="">Select coverage…</option>{QUOTE_SERVICE_TYPES.map((s) => (<option key={s} value={s}>{s}</option>))}</select>
                      </div>

                      <div>
                        <label htmlFor="message" className={labelClass}>Tell us about your operation <span className="text-mocha/60 font-normal">(optional)</span></label>
                        <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} placeholder={COPY.quote.messagePlaceholder} className={`${inputClass} resize-none`} />
                      </div>

                      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

                      <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-clay-gradient text-white font-heading font-bold rounded-full shadow-warm hover:shadow-warm-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
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
