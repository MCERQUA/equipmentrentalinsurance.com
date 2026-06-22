import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";
import { FadeIn } from "@/components/animations/FadeIn";
import { SERVICES, SITE } from "@/lib/site";
import { SERVICE_DETAIL, GENERAL_FAQS, COPY } from "@/lib/content";
import {
  ShieldCheck, HardHat, Container, Car, Wrench, KeyRound, Umbrella,
  CheckCircle2, ArrowRight, ArrowLeft, Users, Target,
} from "lucide-react";

const ICONS = {
  ShieldCheck, HardHat, Container, Car, Wrench, KeyRound, Umbrella,
} as const;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  const url = `${SITE.url}/services/${slug}`;
  return {
    title: `${service.title} ${COPY.serviceDetail.h1Suffix}`,
    description: service.description,
    keywords: service.keywords ? [...service.keywords] : undefined,
    alternates: { canonical: url },
    openGraph: { title: `${service.title} ${COPY.serviceDetail.h1Suffix} | Contractors Choice Agency`, description: service.description, url },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const detail = SERVICE_DETAIL[slug];
  const Icon = ICONS[service.icon as keyof typeof ICONS] ?? ShieldCheck;
  const url = `${SITE.url}/services/${slug}`;
  const related = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  // Merge service-specific FAQs with general FAQs to reach 20 per page.
  const mergedFaqs = [...(detail?.faqs ?? []), ...GENERAL_FAQS].slice(0, 20);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: mergedFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: url },
    ],
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceService",
    name: `${service.title} ${COPY.serviceDetail.h1Suffix}`,
    description: service.description,
    url,
    provider: { "@type": "InsuranceAgency", name: SITE.name, url: SITE.url, telephone: "+18449675247", areaServed: { "@type": "Country", name: "United States" } },
    serviceType: service.title,
    category: COPY.serviceDetail.category,
  };

  return (
    <>
      {(Object.entries({ serviceSchema, faqSchema, breadcrumb }) as [string, object][]).map(([key, schema]) => (
        <script key={key} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <Navbar />
      <main>
        <section className="relative bg-warm-radial pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container-wide">
            <FadeIn>
              <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-clay hover:gap-2.5 transition-all mb-6"><ArrowLeft className="h-4 w-4" />All coverage lines</Link>
            </FadeIn>
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <FadeIn className="lg:col-span-7">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-clay-gradient text-white mb-5 shadow-warm"><Icon className="h-7 w-7" strokeWidth={2.2} /></div>
                <span className="pill-sage">Coverage line</span>
                <h1 className="mt-4 font-heading font-extrabold text-espresso text-4xl md:text-5xl leading-[1.08] tracking-tight">
                  {service.title}{" "}
                  <span className="bg-gradient-to-r from-clay via-clay-light to-gold-dark bg-clip-text text-transparent">{COPY.serviceDetail.h1Suffix}</span>
                </h1>
                {detail && <p className="mt-5 lead max-w-2xl">{detail.heroBlurb}</p>}
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Link href="/quote" className="btn-primary">Get a quote<ArrowRight className="h-5 w-5" /></Link>
                  <a href={SITE.phoneHref} className="btn-secondary">Call {SITE.phone}</a>
                </div>
              </FadeIn>

              <FadeIn direction="left" className="lg:col-span-5">
                <div className="rounded-t-[10rem] rounded-b-3xl overflow-hidden border-4 border-white shadow-warm-lg">
                  <img src={`/images/${slug}.jpg`} alt={`${service.title} — ${COPY.serviceDetail.imageAltSuffix}`} className="w-full h-[300px] md:h-[360px] object-cover" loading="lazy" />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {detail && (
          <section className="bg-cream py-16 md:py-24">
            <div className="container-wide grid lg:grid-cols-3 gap-8 lg:gap-10">
              <FadeIn>
                <div className="rounded-3xl bg-white border border-adobe shadow-card p-7 h-full">
                  <div className="flex items-center gap-2.5 mb-5"><span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-clay/10 text-clay"><ShieldCheck className="h-5 w-5" strokeWidth={2.2} /></span><h2 className="font-heading font-bold text-xl text-espresso">What it covers</h2></div>
                  <ul className="space-y-3">{detail.whatsCovered.map((c) => (<li key={c} className="flex items-start gap-2.5 text-cocoa text-[0.95rem] leading-relaxed"><CheckCircle2 className="h-5 w-5 text-sage flex-shrink-0 mt-0.5" /><span>{c}</span></li>))}</ul>
                </div>
              </FadeIn>
              <FadeIn delay={0.08}>
                <div className="rounded-3xl bg-espresso text-cream p-7 h-full">
                  <div className="flex items-center gap-2.5 mb-5"><span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-gold"><Users className="h-5 w-5" strokeWidth={2.2} /></span><h2 className="font-heading font-bold text-xl text-cream">Who it's for</h2></div>
                  <ul className="space-y-3">{detail.whoItsFor.map((c) => (<li key={c} className="flex items-start gap-2.5 text-cream/85 text-[0.95rem] leading-relaxed"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" /><span>{c}</span></li>))}</ul>
                </div>
              </FadeIn>
              <FadeIn delay={0.16}>
                <div className="rounded-3xl bg-white border border-adobe shadow-card p-7 h-full">
                  <div className="flex items-center gap-2.5 mb-5"><span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold-dark"><Target className="h-5 w-5" strokeWidth={2.2} /></span><h2 className="font-heading font-bold text-xl text-espresso">Why CCA</h2></div>
                  <ul className="space-y-3">{detail.whyCca.map((c) => (<li key={c} className="flex items-start gap-2.5 text-cocoa text-[0.95rem] leading-relaxed"><CheckCircle2 className="h-5 w-5 text-clay flex-shrink-0 mt-0.5" /><span>{c}</span></li>))}</ul>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        <FAQ items={mergedFaqs} eyebrow={`${service.title} — FAQ`} title={<>Common questions about <span className="text-clay">{service.title.toLowerCase()}</span></>} background="sand" />

        <section className="bg-cream py-16">
          <div className="container-wide">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-espresso mb-8">Pair it with related coverage</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((r) => {
                const RIcon = ICONS[r.icon as keyof typeof ICONS] ?? ShieldCheck;
                return (
                  <Link key={r.slug} href={`/services/${r.slug}`} className="group p-6 rounded-3xl bg-white border border-adobe shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-clay/10 text-clay group-hover:bg-clay group-hover:text-white transition-colors mb-3"><RIcon className="h-6 w-6" strokeWidth={2.2} /></div>
                    <p className="font-heading font-bold text-espresso">{r.title}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-heading font-bold text-clay group-hover:gap-2 transition-all">View <ArrowRight className="h-4 w-4" /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
    </>
  );
}
