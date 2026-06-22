"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Container } from "lucide-react";
import { NAV_LINKS, SITE, BRAND } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-cream/90 backdrop-blur-md border-b border-adobe shadow-sm" : "bg-transparent"
      )}
    >
      <nav className="container-wide flex items-center justify-between h-18 py-3">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label={`${SITE.name} home`}>
          <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-clay-gradient shadow-warm">
            <Container className="h-5 w-5 text-white" strokeWidth={2.4} />
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-gold border-2 border-cream" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading font-extrabold text-espresso text-[1.05rem] tracking-tight">{BRAND.brandShort}</span>
            <span className="font-heading font-semibold text-clay text-[0.65rem] uppercase tracking-[0.18em]">{BRAND.brandSub}</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="px-4 py-2 rounded-full text-sm font-heading font-semibold text-cocoa hover:text-clay hover:bg-clay/8 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href={SITE.phoneHref} className="inline-flex items-center gap-2 text-sm font-heading font-bold text-espresso hover:text-clay transition-colors">
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
          <Link href="/quote" className="btn-primary !py-2.5 !px-6 text-sm">Get a Quote</Link>
        </div>

        <button className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-xl bg-white border border-adobe shadow-card text-espresso" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div className={cn("lg:hidden fixed inset-0 top-[72px] bg-cream transition-all duration-300", open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none")}>
        <div className="container-wide py-8 flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="px-5 py-4 rounded-2xl text-lg font-heading font-bold text-espresso hover:bg-sand transition-colors" style={{ transitionDelay: `${i * 30}ms` }}>
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <a href={SITE.phoneHref} className="btn-secondary w-full"><Phone className="h-4 w-4" />{SITE.phone}</a>
            <Link href="/quote" onClick={() => setOpen(false)} className="btn-primary w-full">Get a Free Quote</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
