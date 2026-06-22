"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { COPY } from "@/lib/content";
import { FadeIn } from "@/components/animations/FadeIn";

interface CTABandProps {
  title?: string;
  description?: string;
}

export function CTABand({
  title = COPY.ctaBand.defaultTitle,
  description = COPY.ctaBand.defaultDescription,
}: CTABandProps) {
  return (
    <section className="relative bg-cream py-16 md:py-20">
      <div className="container-tight">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-espresso px-7 py-12 md:p-14 text-center shadow-warm-lg">
            <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(circle at 20% 20%, rgba(232,117,30,0.20) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(42,46,52,0.28) 0%, transparent 50%)" }} aria-hidden />
            <div className="relative">
              <h2 className="font-heading font-extrabold text-cream text-2xl md:text-4xl leading-tight">{title}</h2>
              <p className="mt-4 text-cream/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{description}</p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/quote" className="btn-primary">Get a free quote<ArrowRight className="h-5 w-5" /></Link>
                <a href={SITE.phoneHref} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 text-cream font-heading font-semibold text-base border border-white/20 hover:bg-white/20 transition-all"><Phone className="h-5 w-5" />{SITE.phone}</a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
