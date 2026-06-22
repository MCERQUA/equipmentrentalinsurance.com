"use client";

import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";
import { COPY } from "@/lib/content";
import { FadeIn } from "@/components/animations/FadeIn";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-cream py-20 md:py-28">
      <div className="container-wide">
        <FadeIn className="max-w-3xl mb-12 md:mb-16">
          <span className="eyebrow"><span className="h-px w-8 bg-clay" />{COPY.testimonials.eyebrow}</span>
          <h2 className="mt-3 h-section">{COPY.testimonials.h2Lead} <span className="text-clay">{COPY.testimonials.h2Highlight}</span>.</h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.08}>
              <figure className="relative h-full rounded-3xl bg-white border border-adobe p-7 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col">
                <Quote className="absolute top-6 right-6 h-9 w-9 text-gold/25" />
                <div className="flex gap-1 mb-4">{Array.from({ length: 5 }).map((_, k) => (<Star key={k} className="h-4 w-4 fill-gold text-gold" />))}</div>
                <blockquote className="text-cocoa leading-relaxed text-[0.97rem] flex-grow">“{t.quote}”</blockquote>
                <figcaption className="mt-5 pt-5 border-t border-adobe">
                  <p className="font-heading font-bold text-espresso">{t.name}</p>
                  <p className="text-sm text-mocha">{t.role} · {t.location}</p>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
