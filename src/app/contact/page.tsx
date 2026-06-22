"use client";

import { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE } from "@/lib/site";
import { COPY } from "@/lib/content";
import { CheckCircle2, ArrowRight, Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const WEBHOOK_URL = `https://josh.jam-bot.com/social-api/api/leads/webhook/netlify?tenant=josh&site=${SITE.domain}`;

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "", "bot-field": "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData["bot-field"]) return;
    setSubmitting(true);
    setError("");
    try {
      await fetch(WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ form_name: "contact", source: SITE.domain, ...formData }) });
      setSubmitted(true);
    } catch {
      setError(COPY.contact.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-adobe bg-cream/50 text-espresso placeholder-mocha/60 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all text-sm";
  const labelClass = "block text-sm font-heading font-semibold text-espresso mb-1.5";

  const contactCards = [
    { icon: Phone, label: "Call us", value: SITE.phone, href: SITE.phoneHref, sub: SITE.hours },
    { icon: Mail, label: "Email us", value: SITE.email, href: `mailto:${SITE.email}`, sub: "Replies within one business day" },
    { icon: MessageCircle, label: "Get a quote", value: "Start online", href: "/quote", sub: "~15-minute quote turnaround" },
  ];

  return (
    <>
      <Navbar />
      <main>
        <section className="relative bg-warm-radial pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container-tight text-center">
            <FadeIn>
              <span className="pill-clay"><MessageCircle className="h-3.5 w-3.5" /> Contact</span>
              <h1 className="mt-5 font-heading font-extrabold text-espresso text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                {COPY.contact.h1Lead}{" "}
                <span className="bg-gradient-to-r from-clay via-clay-light to-gold-dark bg-clip-text text-transparent">{COPY.contact.h1Highlight}</span>
              </h1>
              <p className="mt-5 lead max-w-2xl mx-auto">{COPY.contact.lead}</p>
            </FadeIn>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-20">
          <div className="container-wide grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <FadeIn>
              <div className="grid sm:grid-cols-1 gap-4 mb-8">
                {contactCards.map((c) => (
                  <a key={c.label} href={c.href} className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-adobe shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
                    <span className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-clay/10 text-clay group-hover:bg-clay group-hover:text-white transition-colors"><c.icon className="h-6 w-6" strokeWidth={2.2} /></span>
                    <div>
                      <p className="text-xs font-heading font-bold uppercase tracking-wider text-mocha">{c.label}</p>
                      <p className="font-heading font-bold text-espresso">{c.value}</p>
                      <p className="text-xs text-mocha">{c.sub}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="rounded-2xl bg-espresso text-cream p-6">
                <div className="flex items-start gap-3 mb-4"><MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" /><div><p className="font-heading font-bold text-cream">Office</p><p className="text-cream/75 text-sm">{SITE.address.street}<br />{SITE.address.city}, {SITE.address.state} {SITE.address.zip}</p></div></div>
                <div className="flex items-start gap-3"><Clock className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" /><div><p className="font-heading font-bold text-cream">Hours</p><p className="text-cream/75 text-sm">{SITE.hours}</p><p className="text-cream/55 text-xs mt-0.5">24/7 claims hotline</p></div></div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              {submitted ? (
                <div className="p-10 rounded-3xl bg-white border border-adobe shadow-card text-center">
                  <div className="w-16 h-16 rounded-full bg-sage/15 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="h-8 w-8 text-sage" /></div>
                  <h2 className="font-heading font-extrabold text-espresso text-2xl mb-3">Message sent</h2>
                  <p className="text-mocha">Thanks for reaching out — we'll get back to you within one business day.</p>
                </div>
              ) : (
                <form name="contact" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="rounded-3xl bg-white border border-adobe shadow-card p-7 md:p-9 space-y-5">
                  <input type="hidden" name="form-name" value="contact" />
                  <input name="bot-field" type="hidden" value={formData["bot-field"]} onChange={handleChange} className="hidden" />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label htmlFor="name" className={labelClass}>Name *</label><input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Jane Smith" className={inputClass} /></div>
                    <div><label htmlFor="phone" className={labelClass}>Phone</label><input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(608) 555-0100" className={inputClass} /></div>
                  </div>

                  <div><label htmlFor="email" className={labelClass}>Email *</label><input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder={COPY.quote.emailPlaceholder} className={inputClass} /></div>
                  <div><label htmlFor="subject" className={labelClass}>Subject</label><input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} placeholder="How can we help?" className={inputClass} /></div>
                  <div><label htmlFor="message" className={labelClass}>Message *</label><textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange} placeholder="Tell us about your operation or question…" className={`${inputClass} resize-none`} /></div>

                  {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

                  <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-clay-gradient text-white font-heading font-bold rounded-full shadow-warm hover:shadow-warm-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                    {submitting ? "Sending…" : "Send message"}{!submitting && <ArrowRight className="h-5 w-5" />}
                  </button>
                </form>
              )}
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
