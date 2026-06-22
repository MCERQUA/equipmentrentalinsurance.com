import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing your use of ${SITE.domain} and the services of ${SITE.name}.`,
  alternates: { canonical: `${SITE.url}/terms` },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream pt-32 pb-20 md:pt-40">
        <div className="container-tight max-w-3xl">
          <FadeIn>
            <span className="pill-clay">Legal</span>
            <h1 className="mt-5 font-heading font-extrabold text-espresso text-3xl md:text-4xl lg:text-5xl tracking-tight">Terms of Service</h1>
            <p className="text-mocha mt-3 text-sm">Last updated: June 2026</p>

            <div className="prose-warm mt-8">
              <p>These terms govern your use of {SITE.domain} (the &ldquo;Site&rdquo;) operated by {SITE.legalName}. By using the Site, you agree to these terms.</p>

              <h2>No Insurance Advice or Quote Guarantee</h2>
              <p>The information on this Site is provided for general educational purposes and is not a quote, an offer of coverage, or insurance advice. Quotes are prepared individually based on the details you provide and the underwriting of our carrier partners. Coverage is bound only by a written policy issued by a licensed carrier.</p>

              <h2>Use of the Site</h2>
              <p>You agree to use the Site lawfully and not to misuse, disrupt, or attempt to gain unauthorized access to it. We may modify or discontinue any part of the Site at any time without notice.</p>

              <h2>Intellectual Property</h2>
              <p>All content on this Site — text, graphics, logos, and images — is owned by or licensed to us and may not be reproduced without permission.</p>

              <h2>External Links</h2>
              <p>The Site may link to third-party websites we do not control. We are not responsible for the content or practices of those sites.</p>

              <h2>Limitation of Liability</h2>
              <p>The Site is provided &ldquo;as is&rdquo; without warranties of any kind. To the fullest extent permitted by law, {SITE.name} and Contractors Choice Agency are not liable for any damages arising from your use of the Site.</p>

              <h2>Licensing &amp; States</h2>
              <p>{SITE.name} is a division of Contractors Choice Agency, a licensed insurance agency (NPN #{SITE.npn}) writing in all 50 states. Insurance products are underwritten by licensed insurance carriers.</p>

              <h2>Contact</h2>
              <p>Questions about these terms? Contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or <a href={SITE.phoneHref}>{SITE.phone}</a>, or write to {SITE.address.street}, {SITE.address.city}, {SITE.address.state} {SITE.address.zip}.</p>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  );
}
