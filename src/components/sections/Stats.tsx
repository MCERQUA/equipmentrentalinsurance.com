"use client";

import { STATS } from "@/lib/site";
import { Counter } from "@/components/animations/Counter";
import { FadeIn } from "@/components/animations/FadeIn";

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-espresso text-cream py-16 md:py-20">
      <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(circle at 18% 30%, rgba(232,117,30,0.20) 0%, transparent 45%), radial-gradient(circle at 82% 70%, rgba(42,46,52,0.28) 0%, transparent 50%)" }} aria-hidden />
      <div className="absolute top-0 inset-x-0 h-px horizon-band" aria-hidden />

      <div className="container-wide relative">
        <FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading font-extrabold text-4xl md:text-5xl text-cream leading-none">
                  <span className="bg-gradient-to-r from-gold via-gold-light to-clay-light bg-clip-text text-transparent">
                    <Counter target={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </span>
                </p>
                <p className="mt-3 text-sm md:text-base text-cream/75 leading-snug max-w-[12rem] mx-auto">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
