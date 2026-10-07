"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const DISMISS_KEY = "qp-popup-dismissed";
const POPUP_DELAY_MS = 4000;

export function FloatingQuoteBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const setHeight = () => {
      document.documentElement.style.setProperty("--qp-bar-height", `${el.offsetHeight}px`);
    };
    setHeight();
    document.body.classList.add("qp-bar-active");
    window.addEventListener("resize", setHeight, { passive: true });
    return () => {
      window.removeEventListener("resize", setHeight);
      document.body.classList.remove("qp-bar-active");
    };
  }, []);

  return (
    <div ref={barRef} className="fixed bottom-0 inset-x-0 z-[9998] bg-espresso border-t-2 border-gold" style={{ pointerEvents: "none" }}>
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-6 text-center" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}>
        <Link href="/quote" className="text-cream text-sm font-heading font-bold underline decoration-cream/50 hover:decoration-gold hover:text-gold transition-colors" style={{ pointerEvents: "auto" }}>
          Click here to request a quote
        </Link>
      </div>
    </div>
  );
}

export function QuotePopup() {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = !!sessionStorage.getItem(DISMISS_KEY);
    } catch {
      dismissed = false;
    }
    if (dismissed) return;
    const t = setTimeout(() => {
      lastFocused.current = document.activeElement as HTMLElement | null;
      setVisible(true);
    }, POPUP_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* private mode or storage disabled — pop-up will just show again next load */
    }
    setVisible(false);
    lastFocused.current?.focus?.();
  };

  useEffect(() => {
    if (!visible) return;
    const panel = panelRef.current;
    const sel = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>(sel) ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
        return;
      }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (f.length === 0) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="qp-popup-title">
      <div className="absolute inset-0 bg-espresso/70 backdrop-blur-sm" onClick={dismiss} aria-hidden="true" />

      <div ref={panelRef} className="relative w-full max-w-md bg-white rounded-3xl shadow-warm-lg overflow-hidden">
        <div className="bg-espresso px-6 py-5 relative">
          <button onClick={dismiss} className="absolute top-4 right-4 text-cream/70 hover:text-cream transition-colors" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-gold mb-1">A note from our team</p>
          <h2 id="qp-popup-title" className="font-heading font-extrabold text-cream text-xl leading-snug pr-6">
            Thank you for visiting our site! Let&apos;s Get Your Quote Started!!
          </h2>
        </div>

        <div className="px-6 py-6">
          <p className="text-sm text-espresso leading-relaxed mb-3">
            Our agents are actively working on quotes and helping customers find the right coverage.
          </p>
          <p className="text-sm text-espresso leading-relaxed mb-3">
            The fastest way to get started is to submit your information online. Our technology helps organize the details you provide so our agents can spend more time reviewing your needs, comparing options, and preparing your quote.
          </p>
          <p className="text-sm text-espresso leading-relaxed mb-3">
            Don&apos;t worry if you don&apos;t have all the answers.
          </p>
          <p className="text-sm text-espresso leading-relaxed mb-3">
            Just fill out what you can. Even partial information helps us get started, and one of our agents will follow up if we need anything else.
          </p>
          <p className="text-sm text-espresso leading-relaxed mb-1">
            Prefer to speak with someone?
          </p>
          <p className="text-sm text-espresso leading-relaxed mb-3">
            Give us a call at 844-967-5247. We&apos;re happy to help.
          </p>
          <p className="text-sm text-espresso leading-relaxed font-bold mb-6">
            Submit what you know, and we&apos;ll take it from there.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/quote" onClick={dismiss} className="flex-1 btn-primary">
              Get My Quote
            </Link>
            <button onClick={dismiss} className="flex-1 btn-secondary">
              Browse Site for More Information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
