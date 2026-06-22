"use client";

import Link from "next/link";
import { MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { LOCATIONS, SITE } from "@/lib/site";
import { AZ_REGIONS, COPY } from "@/lib/content";
import { FadeIn } from "@/components/animations/FadeIn";

export function CoverageMap() {
  return (
    <section id="coverage" className="relative bg-sonoran py-20 md:py-28">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn>
            <span className="eyebrow"><span className="h-px w-8 bg-clay" />{COPY.coverage.eyebrow}</span>
            <h2 className="mt-3 h-section">{COPY.coverage.h2Lead} <span className="text-clay">{COPY.coverage.h2Highlight}</span></h2>
            <p className="mt-4 lead">{COPY.coverage.lead}</p>

            <ul className="mt-7 space-y-3">
              {AZ_REGIONS.map((region) => (
                <li key={region.name} className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-clay flex-shrink-0 mt-0.5" />
                  <div><span className="font-heading font-semibold text-espresso">{region.name}</span><span className="text-mocha"> — {region.note}</span></div>
                </li>
              ))}
            </ul>

            <div className="mt-7 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 border border-sage/20 text-sage-dark text-sm font-heading font-semibold">
              <CheckCircle2 className="h-4 w-4" />Licensed & writing in all 50 states — NPN #{SITE.npn}
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="relative rounded-t-[12rem] rounded-b-3xl overflow-hidden border-4 border-white shadow-warm-lg">
              <img src="/images/coverage.jpg" alt={COPY.coverage.imageAlt} className="w-full h-[360px] md:h-[440px] object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/55 via-espresso/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-7">
                <p className="font-heading font-extrabold text-cream text-2xl leading-tight">{COPY.coverage.badgeTitle}</p>
                <p className="text-cream/80 text-sm mt-1">{COPY.coverage.badgeSub}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {LOCATIONS.map((l) => (
                    <Link key={l.slug} href={`/locations/${l.slug}`} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/15 backdrop-blur text-cream text-sm font-heading font-semibold border border-white/20 hover:bg-white/25 transition-colors">{l.name}<ArrowRight className="h-3.5 w-3.5" /></Link>
                  ))}
                  <Link href="/coverage" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-clay text-white text-sm font-heading font-semibold hover:bg-clay-dark transition-colors">All areas<ArrowRight className="h-3.5 w-3.5" /></Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
