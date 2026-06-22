"use client";

import { MapPin, CalendarCheck, HardHat, Timer, Zap, Award } from "lucide-react";
import { CREDENTIALS } from "@/lib/site";
import { FadeIn } from "@/components/animations/FadeIn";

const ICONS = { MapPin, CalendarCheck, HardHat, Timer, Zap, Award } as const;

export function TrustBar() {
  return (
    <section className="relative bg-white border-y border-adobe">
      <div className="container-wide py-6 md:py-8">
        <FadeIn>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-5">
            {CREDENTIALS.map((c) => {
              const Icon = ICONS[c.icon as keyof typeof ICONS] ?? MapPin;
              return (
                <li key={c.label} className="flex items-center gap-2.5">
                  <span className="flex-shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sand text-clay"><Icon className="h-5 w-5" strokeWidth={2.2} /></span>
                  <span className="text-sm font-heading font-semibold text-espresso leading-tight">{c.label}</span>
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </div>
      <div className="h-px horizon-band opacity-60" />
    </section>
  );
}
