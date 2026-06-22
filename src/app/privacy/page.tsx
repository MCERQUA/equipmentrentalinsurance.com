import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} and Contractors Choice Agency collect, use, and protect your information.`,
  alternates: { canonical: `${SITE.url}/privacy` },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream pt-32 pb-20 md:pt-40">
        <div className="container-tight max-w-3xl">
          <FadeIn>
            <span className="pill-clay">Legal</span>
            <h1 className="mt-5 font-heading font-extrabold text-espresso text-3xl md:text-4xl lg:text-5xl tracking-tight">Privacy Policy</h1>
            <p className="text-mocha mt-3 text-sm">Last updated: June 2026</p>

            <div className="prose-warm mt-8">
              <p>{SITE.legalName} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This policy describes how we collect, use, and protect information when you visit {SITE.domain} or work with us to obtain an insurance quote.</p>

              <h2>Information We Collect</h2>
              <p>When you request a quote or contact us, we may collect:</p>
              <ul>
                <li>Your name, business name, and contact details (email, phone, address)</li>
                <li>Information about your rental operation needed to quote insurance (fleet value, number of rental units, equipment types, annual rental revenue, payroll, loss history)</li>
                <li>Communications you send us and non-identifying usage data about your visit</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <ul>
                <li>To prepare insurance quotes and place coverage with our carrier partners</li>
                <li>To communicate with you about your policies, quotes, and claims</li>
                <li>To meet legal, regulatory, and underwriting requirements</li>
                <li>To improve our website and services</li>
              </ul>

              <h2>How We Share Information</h2>
              <p>We share your information with insurance carriers, managing general agents, and excess-and-surplus markets as necessary to quote and bind coverage. We do not sell your personal information. Form submissions are transmitted securely and may be processed through trusted service providers under appropriate data-protection terms.</p>

              <h2>Cookies & Analytics</h2>
              <p>Our website may use standard analytics cookies to understand site usage. You can control cookies through your browser settings. We do not use cookies to identify you personally for advertising.</p>

              <h2>Data Security</h2>
              <p>We use reasonable administrative, technical, and physical safeguards to protect your information. No method of transmission or storage is completely secure, but we work to protect your data consistent with industry standards.</p>

              <h2>Your Rights</h2>
              <p>Depending on your state of residence, you may have rights to access, correct, or request deletion of your personal information. To exercise these rights, contact us using the details below.</p>

              <h2>Contact Us</h2>
              <p>Questions about this policy? Contact {SITE.name} at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or <a href={SITE.phoneHref}>{SITE.phone}</a>, or write to us at {SITE.address.street}, {SITE.address.city}, {SITE.address.state} {SITE.address.zip}.</p>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  );
}
