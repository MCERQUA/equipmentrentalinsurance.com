"use client";

import Link from "next/link";
import {
  ShieldCheck, HardHat, Container, Car, Wrench, KeyRound,
  Umbrella, ArrowRight,
} from "lucide-react";
import { SERVICES } from "@/lib/site";
import { COPY } from "@/lib/content";
import { FadeIn } from "@/components/animations/FadeIn";

const ICONS = {
  ShieldCheck, HardHat, Container, Car, Wrench, KeyRound, Umbrella,
} as const;

export function ServicesGrid() {
  return (
    <section id="services" className="relative bg-sonoran py-20 md:py-28">
      <div className="container-wide">
        <FadeIn className="max-w-3xl mb-12 md:mb-16">
          <span className="eyebrow"><span className="h-px w-8 bg-clay" />What we insure</span>
          <h2 className="mt-3 h-section">{COPY.servicesGrid.h2Lead} <span className="text-clay">{COPY.servicesGrid.h2Highlight}</span>.</h2>
          <p className="mt-4 lead">{COPY.servicesGrid.lead}</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon as keyof typeof ICONS] ?? ShieldCheck;
            const isFeatured = service.slug === "inland-marine";
            return (
              <FadeIn key={service.slug} delay={(i % 4) * 0.05}>
                <Link href={`/services/${service.slug}`} className={`group relative block h-full p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 ${isFeatured ? "bg-espresso text-cream border-espresso shadow-warm-lg" : "bg-white text-espresso border-adobe shadow-card hover:shadow-card-hover"}`}>
                  {isFeatured && <span className="absolute -top-2.5 right-5 pill-gold !bg-gold !text-espresso !border-gold-dark">Essential coverage</span>}
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl mb-4 transition-colors ${isFeatured ? "bg-clay-gradient text-white" : "bg-clay/10 text-clay group-hover:bg-clay group-hover:text-white"}`}>
                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                  </div>
                  <h3 className={`font-heading font-bold text-lg leading-tight mb-1.5 ${isFeatured ? "text-cream" : "text-espresso"}`}>{service.title}</h3>
                  <p className={`text-sm leading-relaxed ${isFeatured ? "text-cream/80" : "text-mocha"}`}>{service.description}</p>
                  <span className={`mt-4 inline-flex items-center gap-1 text-sm font-heading font-bold transition-all group-hover:gap-2 ${isFeatured ? "text-gold" : "text-clay"}`}>Explore coverage<ArrowRight className="h-4 w-4" /></span>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn className="mt-12 text-center">
          <p className="text-mocha">Not sure what you need? <Link href="/quote" className="font-heading font-bold text-clay hover:underline">Get a coverage review →</Link></p>
        </FadeIn>
      </div>
    </section>
  );
}
