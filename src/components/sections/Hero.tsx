"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Phone, ShieldCheck, Star, CheckCircle2 } from "lucide-react";
import { SITE, BRAND } from "@/lib/site";
import { COPY } from "@/lib/content";

export function Hero() {
  const prefersReduced = useReducedMotion();
  const container = prefersReduced ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { staggerChildren: 0.08, delayChildren: 0.05 } };
  const item = prefersReduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative overflow-hidden bg-warm-radial pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute top-24 inset-x-0 h-px horizon-band opacity-70" aria-hidden />
      <div className="absolute right-6 bottom-0 w-3 h-64 horizon-band opacity-30 hidden lg:block rounded-full" aria-hidden />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <motion.div className="lg:col-span-6" {...container}>
            <motion.div {...item}>
              <span className="pill-clay">
                <span className="h-1.5 w-1.5 rounded-full bg-clay animate-pulse" />
                {BRAND.regionPill}
              </span>
            </motion.div>

            <motion.h1 {...item} className="mt-5 font-heading font-extrabold text-espresso text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl leading-[1.05] tracking-tight">
              {COPY.hero.h1Lead}{" "}
              <span className="relative z-10 bg-gradient-to-r from-clay via-clay-light to-gold-dark bg-clip-text text-transparent">{COPY.hero.h1Highlight}</span>.
            </motion.h1>

            <motion.p {...item} className="mt-6 lead max-w-xl">{COPY.hero.subcopy}</motion.p>

            <motion.div {...item} className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/quote" className="btn-primary text-base">Get a Free Quote<ArrowRight className="h-5 w-5" /></Link>
              <a href={SITE.phoneHref} className="btn-secondary text-base"><Phone className="h-5 w-5" />{SITE.phone}</a>
            </motion.div>

            <motion.div {...item} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-mocha">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-sage" />15-minute quotes</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-sage" />2-hour claims response</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-sage" />Licensed all 50 states</span>
              <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 text-gold fill-gold" />20+ years insuring industry</span>
            </motion.div>
          </motion.div>

          <motion.div className="lg:col-span-6 relative" initial={prefersReduced ? {} : { opacity: 0, scale: 0.96 }} animate={prefersReduced ? {} : { opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-t-[6rem] rounded-b-3xl shadow-warm-lg border-4 border-white">
                <img src="/images/hero.jpg" alt={COPY.hero.imageAlt} className="w-full h-[420px] md:h-[520px] object-cover" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 via-transparent to-transparent" />
              </div>

              <motion.div initial={prefersReduced ? {} : { opacity: 0, y: 20 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="absolute -bottom-6 -left-4 md:-left-8 bg-white rounded-2xl shadow-warm-lg border border-adobe p-5 max-w-[15rem]">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-clay-gradient flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-heading font-extrabold text-espresso text-2xl leading-none">{COPY.hero.statValue}</p>
                    <p className="text-xs text-mocha mt-1 leading-snug">{COPY.hero.statLabel}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={prefersReduced ? {} : { opacity: 0, y: -10 }} animate={prefersReduced ? {} : { opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }} className="absolute -top-4 -right-3 md:-right-6 bg-sage text-white rounded-2xl shadow-warm-lg px-4 py-3">
                <p className="font-heading font-bold text-sm">NPN #{SITE.npn}</p>
                <p className="text-[0.7rem] text-white/80 mt-0.5">Licensed all 50 states</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
