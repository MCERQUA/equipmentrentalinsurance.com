"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE } from "@/lib/site";
import {
  US_STATES,
  QUOTE_SERVICE_TYPES,
  YEARS_OPTIONS,
  ENTITY_TYPES,
  EQUIPMENT_RENTAL_TRADE_TYPES,
  YES_NO_OPTIONS,
  MAINTENANCE_RESPONSIBILITY_OPTIONS,
  COPY,
} from "@/lib/content";
import { postToNetlify } from "@/lib/netlifyForms";
import { CheckCircle2, ShieldCheck, ArrowRight, Clock, Zap, MapPin } from "lucide-react";

const WEBHOOK_URL = `https://josh.jam-bot.com/social-api/api/leads/webhook/netlify?tenant=josh&site=${SITE.domain}`;

const trustItems = [
  { icon: ShieldCheck, title: COPY.quote.trustNicheTitle, desc: COPY.quote.trustNicheDesc },
  { icon: Zap, title: "~15-minute quotes", desc: "Real quotes from real markets, fast." },
  { icon: Clock, title: "2-hour claims response", desc: "When a loss hits, you reach a person." },
  { icon: MapPin, title: "All 50 states", desc: `Licensed nationwide — NPN #${SITE.npn}.` },
];

type EquipmentRow = { year: string; make: string; model: string; serial: string; value: string; vin: string; acv: string };
const blankEquipment = (): EquipmentRow => ({ year: "", make: "", model: "", serial: "", value: "", vin: "", acv: "" });
const MAX_EQUIPMENT = 5;   // every row is declared in public/__forms.html; keep in sync

/** One line per piece, so the CSR reads it as a list rather than a blob. */
function serialiseEquipment(rows: EquipmentRow[]): string {
  return rows
    .filter((r) => r.year || r.make || r.model || r.serial || r.value)
    .map((r, i) => `${i + 1}. Year: ${r.year || "—"} | Make: ${r.make || "—"} | Model: ${r.model || "—"} | Serial: ${r.serial || "—"} | Value: ${r.value || "—"} | VIN: ${r.vin || "—"} | ACV: ${r.acv || "—"}`)
    .join("\n");
}

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: "", businessName: "", email: "", phone: "",
    streetAddress: "", city: "", state: "", zip: "", fein: "",
    entityType: "", tradeType: "", businessDescription: "", statesOfOperation: "",
    usesSubcontractors: "", annualRevenue: "", annualPayroll: "", fullTimeEmployees: "",
    yearBusinessStarted: "",
    currentlyInsured: "", lossesLast3Years: "", desiredEffectiveDate: "",
    coverageTypes: "", yearsInBusiness: "", message: "", "bot-field": "",
    // Point of contact, if different from the applicant — all optional.
    contactName: "", contactRole: "", contactPhone: "", contactEmail: "",
    // Why shopping + target premium — optional, helps triage.
    seekingNewCoverageReason: "", targetPremium: "",
    // Forward-looking claim awareness, distinct from the 3-year lossesLast3Years lookback.
    awareOfPotentialClaim: "", awareOfPotentialClaimDescription: "",
    // Loss history detail, shown only when lossesLast3Years === "Yes".
    lossHistoryDate: "", lossHistoryAmount: "", lossHistoryDescription: "",
    // Prior carrier info, shown only when currentlyInsured === "Yes".
    currentCarrier: "", currentLimits: "", currentPolicyExpiration: "",
    currentCarrierOfferingRenewal: "", ifNoRenewalWhy: "",
    shoppedOtherMarkets: "", otherMarketsDetails: "",
    // Operational practice questions, universal to any rental business.
    operatesMultipleLocations: "", additionalLocations: "",
    secondaryBusinessOperations: "", secondaryBusinessOperationsDescription: "",
    rentalAgreementRequired: "", renterScreeningProcess: "", renterScreeningDescription: "",
    averageRentalContractLength: "", averageDailyRentalRate: "",
    equipmentMaintenanceResponsibility: "", equipmentInspectionFrequency: "",
    renterInsuranceRequired: "", renterInsuranceVerificationMethod: "",
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
    const equipmentFields: Record<string, string> = {
      equipment: serialiseEquipment(equipment),
      equipmentCount: String(filled.length),
    };
    // One declared field per row per attribute, so each piece of equipment survives as its
    // own column instead of collapsing into the serialised blob. Rows 1..MAX_EQUIPMENT are
    // always sent (empty when unused) so served names == declared names in __forms.html.
    for (let i = 0; i < MAX_EQUIPMENT; i++) {
      const r = equipment[i];
      equipmentFields[`equipmentYear_${i + 1}`] = r?.year ?? "";
      equipmentFields[`equipmentMake_${i + 1}`] = r?.make ?? "";
      equipmentFields[`equipmentModel_${i + 1}`] = r?.model ?? "";
      equipmentFields[`equipmentSerialNumber_${i + 1}`] = r?.serial ?? "";
      equipmentFields[`equipmentValue_${i + 1}`] = r?.value ?? "";
      equipmentFields[`equipmentVIN_${i + 1}`] = r?.vin ?? "";
      equipmentFields[`equipmentACV_${i + 1}`] = r?.acv ?? "";
    }
    try {
      const res = await fetch(WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ form_name: "quote", source: SITE.domain, ...formData, ...equipmentFields }) });
      // fetch() resolves on a 4xx/5xx, so the status is what says the lead was taken.
      if (!res.ok) throw new Error(String(res.status));
      // Same fields to Netlify so submission_created fires and Josh's email hook sends.
      // Best-effort and after the authoritative call, so it can never fail a taken lead.
      await postToNetlify("quote", { ...formData, ...equipmentFields });
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
                    <form name="quote" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="rounded-3xl bg-white border border-adobe shadow-card p-7 md:p-9 space-y-5">
                      <input type="hidden" name="form-name" value="quote" />
                      <input name="bot-field" type="hidden" value={formData["bot-field"]} onChange={handleChange} className="hidden" />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="name" className={labelClass}>Full name *</label><input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Jane Smith" className={inputClass} /></div>
                        <div><label htmlFor="businessName" className={labelClass}>Business name *</label><input id="businessName" name="businessName" type="text" required value={formData.businessName} onChange={handleChange} placeholder={COPY.quote.businessPlaceholder} className={inputClass} /></div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="entityType" className={labelClass}>Business entity *</label>
                          <select id="entityType" name="entityType" required value={formData.entityType} onChange={handleChange} className={inputClass}><option value="">Select…</option>{ENTITY_TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}</select>
                        </div>
                        <div><label htmlFor="tradeType" className={labelClass}>What type of equipment rental business is this? *</label>
                          <select id="tradeType" name="tradeType" required value={formData.tradeType} onChange={handleChange} className={inputClass}><option value="">Select…</option>{EQUIPMENT_RENTAL_TRADE_TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}</select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="email" className={labelClass}>Email *</label><input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder={COPY.quote.emailPlaceholder} className={inputClass} /></div>
                        <div><label htmlFor="phone" className={labelClass}>Phone *</label><input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder={COPY.quote.phonePlaceholder} className={inputClass} /></div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="contactName" className={labelClass}>Point of contact name <span className="text-mocha/60 font-normal">(optional, if different from above)</span></label><input id="contactName" name="contactName" type="text" value={formData.contactName} onChange={handleChange} placeholder="Office manager, risk contact, etc." className={inputClass} /></div>
                        <div><label htmlFor="contactRole" className={labelClass}>Their role <span className="text-mocha/60 font-normal">(optional)</span></label><input id="contactRole" name="contactRole" type="text" value={formData.contactRole} onChange={handleChange} placeholder="Operations manager" className={inputClass} /></div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="contactPhone" className={labelClass}>Their phone <span className="text-mocha/60 font-normal">(optional)</span></label><input id="contactPhone" name="contactPhone" type="tel" value={formData.contactPhone} onChange={handleChange} className={inputClass} /></div>
                        <div><label htmlFor="contactEmail" className={labelClass}>Their email <span className="text-mocha/60 font-normal">(optional)</span></label><input id="contactEmail" name="contactEmail" type="email" value={formData.contactEmail} onChange={handleChange} className={inputClass} /></div>
                      </div>

                      <div><label htmlFor="streetAddress" className={labelClass}>Street address *</label><input id="streetAddress" name="streetAddress" type="text" required value={formData.streetAddress} onChange={handleChange} placeholder="1234 W Main St" className={inputClass} /></div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div><label htmlFor="city" className={labelClass}>City *</label><input id="city" name="city" type="text" required value={formData.city} onChange={handleChange} placeholder="Phoenix" className={inputClass} /></div>
                        <div><label htmlFor="state" className={labelClass}>State *</label>
                          <select id="state" name="state" required value={formData.state} onChange={handleChange} className={inputClass}><option value="">Select…</option>{US_STATES.map((s) => (<option key={s} value={s}>{s}</option>))}</select>
                        </div>
                        <div><label htmlFor="zip" className={labelClass}>ZIP code *</label><input id="zip" name="zip" type="text" inputMode="numeric" required value={formData.zip} onChange={handleChange} placeholder="85001" className={inputClass} /></div>
                      </div>

                      <div><label htmlFor="statesOfOperation" className={labelClass}>States where you operate / rent out equipment *</label><input id="statesOfOperation" name="statesOfOperation" type="text" required value={formData.statesOfOperation} onChange={handleChange} placeholder="e.g. Arizona, Nevada (or 'same as above')" className={inputClass} /></div>

                      <div><label htmlFor="operatesMultipleLocations" className={labelClass}>Do you operate from multiple locations/branches? *</label>
                        <select id="operatesMultipleLocations" name="operatesMultipleLocations" required value={formData.operatesMultipleLocations} onChange={handleChange} className={inputClass}><option value="">Select…</option>{YES_NO_OPTIONS.map((y) => (<option key={y} value={y}>{y}</option>))}</select>
                      </div>

                      {formData.operatesMultipleLocations === "Yes" && (
                        <div><label htmlFor="additionalLocations" className={labelClass}>List the other locations/branches <span className="text-mocha/60 font-normal">(optional)</span></label><textarea id="additionalLocations" name="additionalLocations" rows={2} value={formData.additionalLocations} onChange={handleChange} placeholder="Address or city/state for each additional yard or branch" className={`${inputClass} resize-none`} /></div>
                      )}

                      <div><label htmlFor="fein" className={labelClass}>Federal Employer ID Number (FEIN) <span className="text-mocha/60 font-normal">(optional)</span></label><input id="fein" name="fein" type="text" inputMode="numeric" value={formData.fein} onChange={handleChange} placeholder="12-3456789" className={inputClass} /></div>

                      <div><label htmlFor="businessDescription" className={labelClass}>Describe your rental operations *</label>
                        <textarea id="businessDescription" name="businessDescription" rows={3} required value={formData.businessDescription} onChange={handleChange} placeholder="What do you rent out, to whom (homeowners, contractors, event planners), and do you deliver, operate, or staff the equipment?" className={`${inputClass} resize-none`} />
                      </div>

                      <div><label htmlFor="secondaryBusinessOperations" className={labelClass}>Do you operate any other type of business, besides equipment rental? *</label>
                        <select id="secondaryBusinessOperations" name="secondaryBusinessOperations" required value={formData.secondaryBusinessOperations} onChange={handleChange} className={inputClass}><option value="">Select…</option>{YES_NO_OPTIONS.map((y) => (<option key={y} value={y}>{y}</option>))}</select>
                      </div>

                      {formData.secondaryBusinessOperations === "Yes" && (
                        <div><label htmlFor="secondaryBusinessOperationsDescription" className={labelClass}>Describe the other business <span className="text-mocha/60 font-normal">(optional)</span></label><textarea id="secondaryBusinessOperationsDescription" name="secondaryBusinessOperationsDescription" rows={2} value={formData.secondaryBusinessOperationsDescription} onChange={handleChange} className={`${inputClass} resize-none`} /></div>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="yearsInBusiness" className={labelClass}>Years in business *</label>
                          <select id="yearsInBusiness" name="yearsInBusiness" required value={formData.yearsInBusiness} onChange={handleChange} className={inputClass}><option value="">Select…</option>{YEARS_OPTIONS.map((y) => (<option key={y} value={y}>{y}</option>))}</select>
                        </div>
                        <div><label htmlFor="yearBusinessStarted" className={labelClass}>Year business started *</label><input id="yearBusinessStarted" name="yearBusinessStarted" type="text" inputMode="numeric" required value={formData.yearBusinessStarted} onChange={handleChange} placeholder="2015" className={inputClass} /></div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div><label htmlFor="annualRevenue" className={labelClass}>Annual revenue (estimate) *</label><input id="annualRevenue" name="annualRevenue" type="text" inputMode="numeric" required value={formData.annualRevenue} onChange={handleChange} placeholder="$500,000" className={inputClass} /></div>
                        <div><label htmlFor="annualPayroll" className={labelClass}>Annual payroll (estimate) *</label><input id="annualPayroll" name="annualPayroll" type="text" inputMode="numeric" required value={formData.annualPayroll} onChange={handleChange} placeholder="$180,000" className={inputClass} /></div>
                        <div><label htmlFor="fullTimeEmployees" className={labelClass}>Full-time employees *</label><input id="fullTimeEmployees" name="fullTimeEmployees" type="text" inputMode="numeric" required value={formData.fullTimeEmployees} onChange={handleChange} placeholder="4" className={inputClass} /></div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="averageRentalContractLength" className={labelClass}>Average rental length <span className="text-mocha/60 font-normal">(optional)</span></label><input id="averageRentalContractLength" name="averageRentalContractLength" type="text" value={formData.averageRentalContractLength} onChange={handleChange} placeholder="e.g. 3 days, 2 weeks" className={inputClass} /></div>
                        <div><label htmlFor="averageDailyRentalRate" className={labelClass}>Average rental rate <span className="text-mocha/60 font-normal">(optional)</span></label><input id="averageDailyRentalRate" name="averageDailyRentalRate" type="text" value={formData.averageDailyRentalRate} onChange={handleChange} placeholder="$ per day/week" className={inputClass} /></div>
                      </div>

                      <div><label htmlFor="usesSubcontractors" className={labelClass}>Do you use subcontractors (delivery, setup, maintenance, operators)? *</label>
                        <select id="usesSubcontractors" name="usesSubcontractors" required value={formData.usesSubcontractors} onChange={handleChange} className={inputClass}><option value="">Select…</option>{YES_NO_OPTIONS.map((y) => (<option key={y} value={y}>{y}</option>))}</select>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="rentalAgreementRequired" className={labelClass}>Do renters sign a rental agreement/liability waiver before equipment leaves? *</label>
                          <select id="rentalAgreementRequired" name="rentalAgreementRequired" required value={formData.rentalAgreementRequired} onChange={handleChange} className={inputClass}><option value="">Select…</option>{YES_NO_OPTIONS.map((y) => (<option key={y} value={y}>{y}</option>))}</select>
                        </div>
                        <div><label htmlFor="renterInsuranceRequired" className={labelClass}>Do you require renters to carry their own insurance on rented equipment? *</label>
                          <select id="renterInsuranceRequired" name="renterInsuranceRequired" required value={formData.renterInsuranceRequired} onChange={handleChange} className={inputClass}><option value="">Select…</option>{YES_NO_OPTIONS.map((y) => (<option key={y} value={y}>{y}</option>))}</select>
                        </div>
                      </div>

                      {formData.renterInsuranceRequired === "Yes" && (
                        <div><label htmlFor="renterInsuranceVerificationMethod" className={labelClass}>How do you verify it? <span className="text-mocha/60 font-normal">(optional)</span></label><input id="renterInsuranceVerificationMethod" name="renterInsuranceVerificationMethod" type="text" value={formData.renterInsuranceVerificationMethod} onChange={handleChange} placeholder="e.g. we collect a COI before pickup" className={inputClass} /></div>
                      )}

                      <div><label htmlFor="renterScreeningProcess" className={labelClass}>Do you screen or qualify renters before renting (ID, experience, training)? *</label>
                        <select id="renterScreeningProcess" name="renterScreeningProcess" required value={formData.renterScreeningProcess} onChange={handleChange} className={inputClass}><option value="">Select…</option>{YES_NO_OPTIONS.map((y) => (<option key={y} value={y}>{y}</option>))}</select>
                      </div>

                      {formData.renterScreeningProcess === "Yes" && (
                        <div><label htmlFor="renterScreeningDescription" className={labelClass}>Describe the screening process <span className="text-mocha/60 font-normal">(optional)</span></label><textarea id="renterScreeningDescription" name="renterScreeningDescription" rows={2} value={formData.renterScreeningDescription} onChange={handleChange} className={`${inputClass} resize-none`} /></div>
                      )}

                      <div className="rounded-2xl border border-adobe bg-cream/40 p-5 space-y-4">
                        <div>
                          <p className="font-heading font-bold text-espresso text-sm">Rental equipment</p>
                          <p className="text-xs text-mocha mt-0.5">List each piece you want covered. Add as many as you need. The first item is required — without year, make, model and value we cannot rate the equipment.</p>
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
                              <div><label htmlFor={`equipmentYear_${i + 1}`} className={labelClass}>Year{i === 0 && " *"}</label><input id={`equipmentYear_${i + 1}`} name={`equipmentYear_${i + 1}`} type="text" inputMode="numeric" required={i === 0} value={row.year} onChange={(e) => updateEquipment(i, "year", e.target.value)} placeholder="2021" className={inputClass} /></div>
                              <div><label htmlFor={`equipmentMake_${i + 1}`} className={labelClass}>Make{i === 0 && " *"}</label><input id={`equipmentMake_${i + 1}`} name={`equipmentMake_${i + 1}`} type="text" required={i === 0} value={row.make} onChange={(e) => updateEquipment(i, "make", e.target.value)} placeholder="Bobcat" className={inputClass} /></div>
                              <div><label htmlFor={`equipmentModel_${i + 1}`} className={labelClass}>Model{i === 0 && " *"}</label><input id={`equipmentModel_${i + 1}`} name={`equipmentModel_${i + 1}`} type="text" required={i === 0} value={row.model} onChange={(e) => updateEquipment(i, "model", e.target.value)} placeholder="S650" className={inputClass} /></div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div><label htmlFor={`equipmentSerialNumber_${i + 1}`} className={labelClass}>Serial number <span className="text-mocha/60 font-normal">(optional)</span></label><input id={`equipmentSerialNumber_${i + 1}`} name={`equipmentSerialNumber_${i + 1}`} type="text" value={row.serial} onChange={(e) => updateEquipment(i, "serial", e.target.value)} placeholder="ALJ812345" className={inputClass} /></div>
                              <div><label htmlFor={`equipmentValue_${i + 1}`} className={labelClass}>Value{i === 0 && " *"}</label><input id={`equipmentValue_${i + 1}`} name={`equipmentValue_${i + 1}`} type="text" inputMode="numeric" required={i === 0} value={row.value} onChange={(e) => updateEquipment(i, "value", e.target.value)} placeholder="$45,000" className={inputClass} /></div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div><label htmlFor={`equipmentVIN_${i + 1}`} className={labelClass}>VIN <span className="text-mocha/60 font-normal">(optional — titled units like trailers/towables)</span></label><input id={`equipmentVIN_${i + 1}`} name={`equipmentVIN_${i + 1}`} type="text" value={row.vin} onChange={(e) => updateEquipment(i, "vin", e.target.value)} className={inputClass} /></div>
                              <div><label htmlFor={`equipmentACV_${i + 1}`} className={labelClass}>Actual cash value <span className="text-mocha/60 font-normal">(optional, if different from value above)</span></label><input id={`equipmentACV_${i + 1}`} name={`equipmentACV_${i + 1}`} type="text" inputMode="numeric" value={row.acv} onChange={(e) => updateEquipment(i, "acv", e.target.value)} placeholder="$32,000" className={inputClass} /></div>
                            </div>
                          </div>
                        ))}

                        {equipment.length < MAX_EQUIPMENT && (
                          <button type="button" onClick={addEquipment} className="w-full px-4 py-2.5 rounded-xl border border-dashed border-clay/60 text-clay font-heading font-semibold text-sm hover:bg-clay/5 transition-colors">+ Add another piece of equipment</button>
                        )}

                        {/* Netlify captures only declared, named fields. Rows the visitor has not
                            added still need their names present in the posted form, or served
                            names drift from public/__forms.html — so emit the unused rows empty. */}
                        {Array.from({ length: MAX_EQUIPMENT - equipment.length }, (_, k) => k + equipment.length).map((i) => (
                          <div key={`spare-${i}`} className="hidden">
                            <input type="hidden" name={`equipmentYear_${i + 1}`} value="" readOnly />
                            <input type="hidden" name={`equipmentMake_${i + 1}`} value="" readOnly />
                            <input type="hidden" name={`equipmentModel_${i + 1}`} value="" readOnly />
                            <input type="hidden" name={`equipmentSerialNumber_${i + 1}`} value="" readOnly />
                            <input type="hidden" name={`equipmentValue_${i + 1}`} value="" readOnly />
                            <input type="hidden" name={`equipmentVIN_${i + 1}`} value="" readOnly />
                            <input type="hidden" name={`equipmentACV_${i + 1}`} value="" readOnly />
                          </div>
                        ))}
                        <input type="hidden" name="equipment" value={serialiseEquipment(equipment)} readOnly />
                        <input type="hidden" name="equipmentCount" value={String(equipment.filter((r) => r.year || r.make || r.model || r.serial || r.value).length)} readOnly />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="equipmentMaintenanceResponsibility" className={labelClass}>Who's responsible for equipment maintenance? <span className="text-mocha/60 font-normal">(optional)</span></label>
                          <select id="equipmentMaintenanceResponsibility" name="equipmentMaintenanceResponsibility" value={formData.equipmentMaintenanceResponsibility} onChange={handleChange} className={inputClass}><option value="">Select…</option>{MAINTENANCE_RESPONSIBILITY_OPTIONS.map((m) => (<option key={m} value={m}>{m}</option>))}</select>
                        </div>
                        <div><label htmlFor="equipmentInspectionFrequency" className={labelClass}>How often is it inspected/checked? <span className="text-mocha/60 font-normal">(optional)</span></label><input id="equipmentInspectionFrequency" name="equipmentInspectionFrequency" type="text" value={formData.equipmentInspectionFrequency} onChange={handleChange} placeholder="e.g. every return, monthly" className={inputClass} /></div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="currentlyInsured" className={labelClass}>Currently insured? *</label>
                          <select id="currentlyInsured" name="currentlyInsured" required value={formData.currentlyInsured} onChange={handleChange} className={inputClass}><option value="">Select…</option>{YES_NO_OPTIONS.map((y) => (<option key={y} value={y}>{y}</option>))}</select>
                        </div>
                        <div><label htmlFor="lossesLast3Years" className={labelClass}>Any claims or losses in the last 3 years? *</label>
                          <select id="lossesLast3Years" name="lossesLast3Years" required value={formData.lossesLast3Years} onChange={handleChange} className={inputClass}><option value="">Select…</option>{YES_NO_OPTIONS.map((y) => (<option key={y} value={y}>{y}</option>))}</select>
                        </div>
                      </div>

                      {formData.currentlyInsured === "Yes" && (
                        <div className="rounded-2xl border border-adobe bg-cream/40 p-5 space-y-4">
                          <p className="font-heading font-bold text-espresso text-sm">Current coverage <span className="text-mocha/60 font-normal text-xs">(optional, helps us quote faster)</span></p>
                          <div className="grid sm:grid-cols-3 gap-3">
                            <div><label htmlFor="currentCarrier" className={labelClass}>Current carrier</label><input id="currentCarrier" name="currentCarrier" type="text" value={formData.currentCarrier} onChange={handleChange} className={inputClass} /></div>
                            <div><label htmlFor="currentLimits" className={labelClass}>Current limits</label><input id="currentLimits" name="currentLimits" type="text" value={formData.currentLimits} onChange={handleChange} placeholder="$1M/$2M" className={inputClass} /></div>
                            <div><label htmlFor="currentPolicyExpiration" className={labelClass}>Policy expiration date</label><input id="currentPolicyExpiration" name="currentPolicyExpiration" type="date" value={formData.currentPolicyExpiration} onChange={handleChange} className={inputClass} /></div>
                          </div>
                          <div><label htmlFor="currentCarrierOfferingRenewal" className={labelClass}>Is your current carrier offering a renewal?</label>
                            <select id="currentCarrierOfferingRenewal" name="currentCarrierOfferingRenewal" value={formData.currentCarrierOfferingRenewal} onChange={handleChange} className={inputClass}><option value="">Select…</option>{YES_NO_OPTIONS.map((y) => (<option key={y} value={y}>{y}</option>))}</select>
                          </div>
                          {formData.currentCarrierOfferingRenewal === "No" && (
                            <div><label htmlFor="ifNoRenewalWhy" className={labelClass}>Why not?</label><input id="ifNoRenewalWhy" name="ifNoRenewalWhy" type="text" value={formData.ifNoRenewalWhy} onChange={handleChange} className={inputClass} /></div>
                          )}
                        </div>
                      )}

                      <div><label htmlFor="shoppedOtherMarkets" className={labelClass}>Have you already shopped this with other agents/markets? <span className="text-mocha/60 font-normal">(optional)</span></label>
                        <select id="shoppedOtherMarkets" name="shoppedOtherMarkets" value={formData.shoppedOtherMarkets} onChange={handleChange} className={inputClass}><option value="">Select…</option>{YES_NO_OPTIONS.map((y) => (<option key={y} value={y}>{y}</option>))}</select>
                      </div>

                      {formData.shoppedOtherMarkets === "Yes" && (
                        <div><label htmlFor="otherMarketsDetails" className={labelClass}>What limits/coverage/premium did they offer? <span className="text-mocha/60 font-normal">(optional)</span></label><input id="otherMarketsDetails" name="otherMarketsDetails" type="text" value={formData.otherMarketsDetails} onChange={handleChange} className={inputClass} /></div>
                      )}

                      {formData.lossesLast3Years === "Yes" && (
                        <div className="rounded-2xl border border-adobe bg-cream/40 p-5 space-y-4">
                          <p className="font-heading font-bold text-espresso text-sm">Loss detail <span className="text-mocha/60 font-normal text-xs">(optional, helps us quote faster)</span></p>
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div><label htmlFor="lossHistoryDate" className={labelClass}>Date of loss</label><input id="lossHistoryDate" name="lossHistoryDate" type="date" value={formData.lossHistoryDate} onChange={handleChange} className={inputClass} /></div>
                            <div><label htmlFor="lossHistoryAmount" className={labelClass}>Amount (paid/reserved/incurred)</label><input id="lossHistoryAmount" name="lossHistoryAmount" type="text" value={formData.lossHistoryAmount} onChange={handleChange} className={inputClass} /></div>
                          </div>
                          <div><label htmlFor="lossHistoryDescription" className={labelClass}>Brief description</label><textarea id="lossHistoryDescription" name="lossHistoryDescription" rows={2} value={formData.lossHistoryDescription} onChange={handleChange} className={`${inputClass} resize-none`} /></div>
                        </div>
                      )}

                      <div><label htmlFor="awareOfPotentialClaim" className={labelClass}>Are you aware of any incident, event, or occurrence that might reasonably lead to a future claim? *</label>
                        <select id="awareOfPotentialClaim" name="awareOfPotentialClaim" required value={formData.awareOfPotentialClaim} onChange={handleChange} className={inputClass}><option value="">Select…</option>{YES_NO_OPTIONS.map((y) => (<option key={y} value={y}>{y}</option>))}</select>
                      </div>

                      {formData.awareOfPotentialClaim === "Yes" && (
                        <div><label htmlFor="awareOfPotentialClaimDescription" className={labelClass}>Please explain <span className="text-mocha/60 font-normal">(optional)</span></label><textarea id="awareOfPotentialClaimDescription" name="awareOfPotentialClaimDescription" rows={2} value={formData.awareOfPotentialClaimDescription} onChange={handleChange} className={`${inputClass} resize-none`} /></div>
                      )}

                      <div><label htmlFor="coverageTypes" className={labelClass}>What do you need? *</label>
                        <select id="coverageTypes" name="coverageTypes" required value={formData.coverageTypes} onChange={handleChange} className={inputClass}><option value="">Select coverage…</option>{QUOTE_SERVICE_TYPES.map((s) => (<option key={s} value={s}>{s}</option>))}</select>
                      </div>

                      <div><label htmlFor="desiredEffectiveDate" className={labelClass}>When do you need coverage to start? *</label><input id="desiredEffectiveDate" name="desiredEffectiveDate" type="date" required value={formData.desiredEffectiveDate} onChange={handleChange} className={inputClass} /></div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="seekingNewCoverageReason" className={labelClass}>Why are you shopping for new coverage? <span className="text-mocha/60 font-normal">(optional)</span></label><input id="seekingNewCoverageReason" name="seekingNewCoverageReason" type="text" value={formData.seekingNewCoverageReason} onChange={handleChange} placeholder="e.g. non-renewal, premium increase, new business" className={inputClass} /></div>
                        <div><label htmlFor="targetPremium" className={labelClass}>Target premium <span className="text-mocha/60 font-normal">(optional)</span></label><input id="targetPremium" name="targetPremium" type="text" inputMode="numeric" value={formData.targetPremium} onChange={handleChange} placeholder="$ per year" className={inputClass} /></div>
                      </div>

                      <div>
                        <label htmlFor="message" className={labelClass}>Project details and rental dates *</label>
                        <textarea id="message" name="message" rows={4} required value={formData.message} onChange={handleChange} placeholder="What is the equipment being used for, where, and over what dates? Include the rental start and end dates if you have them." className={`${inputClass} resize-none`} />
                      </div>

                      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

                      <p className="text-sm text-center text-espresso font-heading font-semibold">Please complete all required fields so we can prepare an accurate quote.</p>
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
