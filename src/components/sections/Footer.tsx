import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Container, ShieldCheck } from "lucide-react";
import { SITE, SERVICES, LOCATIONS, BRAND } from "@/lib/site";
import { COPY } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-espresso text-cream overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 horizon-band" />

      <div className="border-b border-white/10">
        <div className="container-wide py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-heading font-bold text-2xl text-cream">{COPY.footer.ctaTitle}</p>
            <p className="text-cream/70 mt-1">{COPY.footer.ctaSubcopy}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={SITE.phoneHref} className="btn-secondary !bg-white/10 !border-white/20 !text-cream hover:!bg-white/20 hover:!text-white"><Phone className="h-4 w-4" />{SITE.phone}</a>
            <Link href="/quote" className="btn-primary">Get a Free Quote</Link>
          </div>
        </div>
      </div>

      <div className="container-wide py-14 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-clay-gradient"><Container className="h-5 w-5 text-white" strokeWidth={2.4} /></span>
            <span className="flex flex-col leading-none">
              <span className="font-heading font-extrabold text-cream text-lg">{BRAND.brandShort}</span>
              <span className="font-heading font-semibold text-gold text-[0.65rem] uppercase tracking-[0.18em]">{BRAND.brandSub}</span>
            </span>
          </div>
          <p className="text-cream/70 text-sm leading-relaxed max-w-sm">{COPY.footer.description}</p>
          <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <ShieldCheck className="h-4 w-4 text-sage-light" />
            <span className="text-xs font-semibold text-cream/90">NPN #{SITE.npn} · Licensed all 50 states</span>
          </div>
        </div>

        <div>
          <p className="font-heading font-bold text-cream mb-4 text-sm uppercase tracking-wider">Services</p>
          <ul className="space-y-2.5">
            {SERVICES.slice(0, 6).map((s) => (<li key={s.slug}><Link href={`/services/${s.slug}`} className="text-cream/70 hover:text-gold text-sm transition-colors">{s.title}</Link></li>))}
          </ul>
        </div>

        <div>
          <p className="font-heading font-bold text-cream mb-4 text-sm uppercase tracking-wider">Coverage Regions</p>
          <ul className="space-y-2.5">
            {LOCATIONS.slice(0, 6).map((l) => (<li key={l.slug}><Link href={`/locations/${l.slug}`} className="text-cream/70 hover:text-gold text-sm transition-colors">{l.name}</Link></li>))}
            <li><Link href="/coverage" className="text-cream/70 hover:text-gold text-sm transition-colors">All regions</Link></li>
            <li><Link href="/blog" className="text-cream/70 hover:text-gold text-sm transition-colors">Blog & Insights</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-heading font-bold text-cream mb-4 text-sm uppercase tracking-wider">Contact</p>
          <ul className="space-y-3.5 text-sm">
            <li><a href={SITE.phoneHref} className="flex items-start gap-2.5 text-cream/80 hover:text-gold transition-colors"><Phone className="h-4 w-4 mt-0.5 text-gold flex-shrink-0" /><span><span className="block font-semibold text-cream">{SITE.phone}</span><span className="text-xs text-cream/60">Toll-free</span></span></a></li>
            <li><a href={`mailto:${SITE.email}`} className="flex items-start gap-2.5 text-cream/80 hover:text-gold transition-colors"><Mail className="h-4 w-4 mt-0.5 text-gold flex-shrink-0" /><span className="break-all">{SITE.email}</span></a></li>
            <li className="flex items-start gap-2.5 text-cream/80"><MapPin className="h-4 w-4 mt-0.5 text-gold flex-shrink-0" /><span>{SITE.address.street}<br />{SITE.address.city}, {SITE.address.state} {SITE.address.zip}</span></li>
            <li className="flex items-start gap-2.5 text-cream/80"><Clock className="h-4 w-4 mt-0.5 text-gold flex-shrink-0" /><span>{SITE.hours}<br /><span className="text-xs text-cream/60">24/7 claims hotline</span></span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>© {year} {SITE.name}. A division of Contractors Choice Agency. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-gold transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
