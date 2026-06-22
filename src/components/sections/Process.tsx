"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROCESS, COPY } from "@/lib/content";
import { SITE } from "@/lib/site";
import { FadeIn } from "@/components/animations/FadeIn";

export function Process() {
  return (
    <section id="process" className="relative bg-cream py-20 md:py-28">
      <div className="container-wide">
        <FadeIn className="max-w-3xl mb-12 md:mb-16">
          <span className="eyebrow"><span className="h-px w-8 bg-clay" />How it works</span>
          <h2 className="mt-3 h-section">From quote request to bound policy in <span className="text-clay">about a day</span>.</h2>
          <p className="mt-4 lead">{COPY.process.lead}</p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {PROCESS.map((step, i) => (
            <FadeIn key={step.step} delay={i * 0.08}>
              <div className="relative h-full rounded-3xl bg-white border border-adobe p-7 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <span className="absolute -top-4 left-7 inline-flex h-10 px-3 items-center justify-center rounded-full bg-clay-gradient text-white font-heading font-extrabold text-sm shadow-warm">Step {step.step}</span>
                <div className="mt-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold-dark mb-4"><step.icon className="h-6 w-6" strokeWidth={2.2} /></div>
                <h3 className="font-heading font-bold text-lg text-espresso leading-tight">{step.title}</h3>
                <p className="mt-2 text-sm text-mocha leading-relaxed">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quote" className="btn-primary">Start my quote<ArrowRight className="h-5 w-5" /></Link>
          <p className="text-sm text-mocha">Or call <a href={SITE.phoneHref} className="font-heading font-bold text-clay">{SITE.phone}</a> — usually answered live.</p>
        </FadeIn>
      </div>
    </section>
  );
}
