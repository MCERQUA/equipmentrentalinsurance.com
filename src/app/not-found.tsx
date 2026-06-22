import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ArrowRight, Home, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative bg-warm-radial pt-32 pb-24 md:pt-40 md:pb-32 min-h-[70vh] flex items-center">
        <div className="container-tight text-center">
          <p className="font-heading font-extrabold text-clay text-7xl md:text-9xl leading-none">404</p>
          <h1 className="mt-4 font-heading font-extrabold text-espresso text-3xl md:text-4xl tracking-tight">Looks like this unit's already checked out.</h1>
          <p className="mt-4 lead max-w-xl mx-auto">The page you're looking for doesn't exist or has moved. Let's get you back on track.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="btn-primary"><Home className="h-5 w-5" />Back to home</Link>
            <Link href="/quote" className="btn-secondary">Get a quote<ArrowRight className="h-5 w-5" /></Link>
            <a href={SITE.phoneHref} className="btn-ghost"><Phone className="h-4 w-4" />{SITE.phone}</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
