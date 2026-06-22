// Rich, niche-accurate content blocks + centralized COPY for Equipment Rental Insurance.

import {
  PhoneCall, FileSearch, FileSignature, ShieldCheck,
  Container, Car, HardHat, Wrench, KeyRound, Umbrella, PackageCheck, AlertTriangle,
} from "lucide-react";
import faqsJson from "../../ai/content/faqs.json";

/* ============================================================
   FAQ types + single-source-of-truth wiring (ai/content/faqs.json)
   ============================================================ */
export interface FAQItem { q: string; a: string; }

export const HOME_FAQS: FAQItem[] = faqsJson.home as FAQItem[];
export const GENERAL_FAQS: FAQItem[] = faqsJson.general as FAQItem[];

/* ============================================================
   COPY — centralized display strings consumed by components/pages.
   ============================================================ */
export const COPY = {
  hero: {
    h1Lead: "Equipment rental insurance that protects",
    h1Highlight: "the fleet you rent out",
    subcopy:
      "Inland marine / equipment floater, rented-to-others coverage, equipment breakdown, general liability, commercial auto for delivery fleets, workers' comp, and commercial umbrella — purpose-built for equipment rental companies. Skid steers, excavators, boom lifts, trailers, tools, and party/event rentals. A-rated carriers. 15-minute quotes.",
    statValue: "$58M+",
    statLabel: "Premium placed for contractors — rental yards, fleets, and equipment operators",
    imageAlt: "Equipment rental yard at dawn — excavators, skid steers, and boom lifts staged for delivery",
  },
  nav: { ariaLabel: "Equipment Rental Insurance home" },
  footer: {
    ctaTitle: "Ready to protect your rental fleet?",
    ctaSubcopy: "15-minute quotes. 2-hour claims response. Insurance for equipment rental companies nationwide.",
    description:
      "Specialized insurance for equipment rental companies — inland marine / equipment floater, rented-to-others coverage, equipment breakdown, general liability, commercial auto for delivery fleets, workers' comp, and commercial umbrella. A division of Contractors Choice Agency — founded 2005, licensed all 50 states.",
  },
  servicesGrid: {
    h2Lead: "Coverage built specifically for",
    h2Highlight: "equipment rental companies",
    lead: "Standard commercial policies cover property at your yard and stop the moment your equipment rolls out the gate. We build programs designed for rental operations whose fleet is always in someone else's hands.",
  },
  why: {
    eyebrow: "Why rental yards switch to us",
    h2Lead: "The coverage gaps that",
    h2Highlight: "cost equipment rental companies the most",
    lead: "Most agents hand a rental yard a generic business-owner policy and call it done. Then a skid steer is stolen off a customer's site, an excavator comes back with a seized transmission, or a customer is injured operating your boom lift — and the exclusion kicks in. We underwrite the parts of your operation everyone else leaves out.",
    sidebarTitle: "Run by people who know the trades",
    sidebarBody:
      "Contractors Choice Agency was founded in 2005 by people from the trades. We've walked rental yards, valued fleets, and know what a $250,000 excavator or a fully-loaded boom lift actually costs to replace.",
  },
  coverage: {
    eyebrow: "Where we write",
    h2Lead: "Equipment rental coverage.",
    h2Highlight: "All 50 states.",
    lead: "From Phoenix and Dallas to Denver, Atlanta, Nashville, and Tampa, Contractors Choice Agency writes equipment rental insurance in every state where rental yards deliver equipment to job sites.",
    imageAlt: "Equipment rental fleet — excavators, skid steers and boom lifts staged at a regional yard — national coverage",
    badgeTitle: "National coverage for rental companies.",
    badgeSub: "Writing rental programs in all 50 states since 2005.",
  },
  process: {
    lead: "No two-week back-and-forth. A real conversation, real specialty markets, and a program you can actually understand — built around your fleet, your delivery operation, and your customers.",
  },
  testimonials: {
    eyebrow: "From rental yard owners",
    h2Lead: "Rental companies that found",
    h2Highlight: "coverage that actually pays",
  },
  finalCta: {
    h2Lead: "Protect Your Rental Operation",
    h2Highlight: "with coverage built for the fleet.",
    lead: "Whether you need an equipment floater today or a full program — rented-to-others, equipment breakdown, GL, auto, workers' comp, and umbrella — one call gets you real quotes from specialty markets. Not a voicemail and a two-week wait.",
  },
  ctaBand: {
    defaultTitle: "Ready to protect your rental fleet?",
    defaultDescription:
      "Get a 15-minute quote from specialists who understand equipment rental — inland marine floaters, rented-to-others coverage, equipment breakdown, and the liability limits your commercial customers require.",
  },
  faq: {
    defaultTitleLead: "Equipment rental insurance,",
    defaultTitleHighlight: "in plain English",
  },
  servicesPage: {
    metaTitle: "Equipment Rental Insurance Coverage & Services",
    metaDescription:
      "Seven lines of insurance built for equipment rental companies: inland marine / equipment floater, general liability, equipment breakdown, rented-to-others, commercial auto, workers' comp, and commercial umbrella. Licensed all 50 states.",
    h1Lead: "Insurance built line-by-line for",
    h1Highlight: "equipment rental companies",
    lead: "Each policy below addresses a specific exposure in equipment rental — from the equipment floater that follows your fleet off the yard to the rented-to-others coverage your business model depends on. Standard commercial policies miss most of it.",
    ogTitle: "Equipment Rental Insurance Coverage | Contractors Choice Agency",
    ogDescription:
      "Inland marine / equipment floater, general liability, equipment breakdown, rented-to-others, commercial auto, workers' comp, and commercial umbrella — written specifically for equipment rental companies.",
    ctaTitle: "Not sure which lines you need?",
    ctaDescription:
      "Most rental yards bundle equipment floater + rented-to-others + general liability + commercial auto + workers' comp + umbrella into one coordinated program. We'll build the right mix in one call.",
  },
  blogPage: {
    metaTitle: "Equipment Rental Insurance Blog — Guides & Insights",
    metaDescription:
      "Practical insurance guidance for equipment rental companies: equipment floater and inland marine, rented-to-others coverage, equipment breakdown, COI requirements, and the liability limits commercial customers demand.",
    h1Lead: "Equipment rental insurance,",
    h1Highlight: "decoded",
    lead: "Plain-English guides on the coverage that matters for equipment rental companies — inland marine and equipment floaters, rented-to-others exposure, equipment breakdown, certificates of insurance, and the liability limits your GC customers require.",
    ogTitle: "Equipment Rental Insurance Blog | Contractors Choice Agency",
    ogDescription:
      "Practical insurance guidance for equipment rental companies: equipment floaters, rented-to-others coverage, equipment breakdown, COI requirements, and the liability limits commercial customers demand.",
  },
  serviceDetail: {
    h1Suffix: "for equipment rental companies",
    imageAltSuffix: "equipment rental operations",
    category: "Equipment Rental Insurance",
  },
  about: {
    metaTitle: "About Equipment Rental Insurance | Contractors Choice Agency",
    metaDescription:
      "Equipment Rental Insurance is the rental-focused division of Contractors Choice Agency, founded 2005 by former contractor Josh Cotner. Inland marine, rented-to-others, equipment breakdown, GL, commercial auto, workers' comp, and umbrella for equipment rental companies. Licensed all 50 states.",
    h1Lead: "Built by people who know the trades,",
    h1Highlight: "for rental operations",
    lead: "Equipment Rental Insurance is the rental-focused division of Contractors Choice Agency — founded 2005 by Josh Cotner, who knows exactly what happens when an equipment floater lacks rented-to-others language or an equipment-breakdown exclusion shows up in a claim denial.",
    imageAlt: "An equipment rental yard owner on the lot with excavators and skid steers staged behind",
    storyEyebrow: "Our story",
    storyTitle: "From the jobsite to the agency.",
    storyLead:
      "Josh Cotner ran equipment, read specs, and filed certificates before founding CCA in 2005. That background is why we understand what's at stake when a skid steer is stolen off a customer's site, an excavator comes back with a seized transmission, and the yard's carrier cites a coverage gap.",
    valuesTitle: "Four things we won't compromise on.",
    timeline: [
      { year: "2005", title: "Contractors Choice Agency founded", desc: "Josh Cotner opens CCA in Chandler, AZ, after years working in the trades — built to insure contractors, operators, and equipment owners the right way." },
      { year: "15 yrs", title: "Expanded to specialty equipment markets", desc: "After placing programs for dozens of specialty contractor categories, CCA extends expertise to equipment rental and fleet operations with unique risk profiles." },
      { year: "Today", title: "Dedicated equipment rental division", desc: "Equipment Rental Insurance focuses CCA's expertise on rental yard owners — operations where inland marine, rented-to-others exposure, and equipment values are the real risks." },
    ],
    values: [
      { icon: "HardHat", title: "Operator-first, always", desc: "Josh spent years in the trades before starting the agency. We speak the language of equipment rental because we know what happens when coverage fails at claim time." },
      { icon: "ShieldCheck", title: "Coverage that closes the gaps", desc: "Missing rented-to-others language, equipment-breakdown exclusions, under-scheduled trailers, and inadequate liability limits — we address the risks standard commercial markets miss." },
      { icon: "Award", title: "A-rated specialty markets only", desc: "We shop carriers with the financial strength and rental-industry experience to be there when a major theft, a seized engine, or a serious injury claim hits your operation." },
      { icon: "Handshake", title: "Honest, no-pressure advice", desc: "If you don't need a line of coverage, we'll tell you. We earn trust by being straight about what your rental yard actually requires." },
    ],
  },
  quote: {
    h1Lead: "Get your",
    h1Highlight: "equipment rental insurance quote",
    lead: "Tell us about your fleet and rental operation. We'll shop A-rated specialty markets and come back with real quotes in about 15 minutes — no obligation.",
    businessPlaceholder: "Desert State Equipment Rental LLC",
    emailPlaceholder: "marcus@desertstaterental.com",
    phonePlaceholder: "(602) 555-0100",
    messagePlaceholder:
      "Fleet list (equipment types, makes, models, years, values), number of rental units, annual rental revenue, employee count and payroll, delivery radius, equipment categories rented, current insurer, loss history, or anything else that helps us quote accurately…",
    errorMessage: "Something went wrong. Please call us at 844-967-5247 or try again.",
    trustNicheTitle: "Built for rental yards",
    trustNicheDesc: "Policies written for equipment rental companies — not generic business-owner coverage.",
  },
  contact: {
    h1Lead: "Let's talk about your",
    h1Highlight: "rental coverage",
    lead: "Questions, a quote, or a claim — reach a person who knows equipment rental, not a queue.",
    errorMessage: "Something went wrong. Please call us at 844-967-5247.",
  },
  coveragePage: {
    metaTitle: "Equipment Rental Insurance — National Coverage, All 50 States",
    metaDescription:
      "Contractors Choice Agency writes equipment rental insurance in all 50 states — Phoenix, Dallas–Fort Worth, Houston, Denver, Atlanta, Nashville, Tampa, Salt Lake City, and everywhere rental yards operate.",
    h1Lead: "National reach.",
    h1Highlight: "All 50 states, every rental market.",
    lead: "Contractors Choice Agency places equipment rental insurance programs in all 50 states — from Phoenix and Dallas to Denver, Atlanta, Nashville, and the Mountain West.",
    sectionTitle: "Equipment rental regions we serve.",
    nationwideLead:
      "Whether your rental yard is in Phoenix, Dallas–Fort Worth, Denver, Nashville, or anywhere in between — one agent, one coordinated program. NPN #8608479.",
    faqs: [
      { q: "Do you only insure equipment rental companies in certain regions?", a: "No. Contractors Choice Agency is licensed in all 50 states and writes programs for equipment rental companies anywhere in the country — Phoenix, Dallas–Fort Worth, Houston, Denver, Atlanta, Nashville, Tampa, Salt Lake City, and everywhere rental yards operate." },
      { q: "Can you write coverage if we deliver equipment across state lines?", a: "Yes. We structure programs so your inland marine, commercial auto, and liability coverage follow your equipment across state lines without gaps — including the multi-state delivery radius that regional rental yards run." },
      { q: "Do you understand the specific risks of my region's rental market?", a: "Yes. We work with specialty markets that understand regional differences — Phoenix and Sun Corridor summer-peak utilization, Houston storm-response surge, Denver mountain-region access work, and Tampa hurricane-season demand." },
      { q: "Can you coordinate coverage across multiple rental branches or yards?", a: "Yes. If you operate from multiple locations, we build one coordinated program covering every branch, yard, and delivery route with no gaps between sites — and with consistent limits and additional-insured terms across the whole operation." },
    ],
  },
} as const;

/* ============================================================
   PROCESS
   ============================================================ */
export const PROCESS = [
  { step: "01", icon: PhoneCall, title: "Tell us about your fleet", description: "15-min call or form. Fleet list with values, number of rental units, delivery radius, employee count and payroll, equipment categories rented, and the coverage lines your old carrier excluded or under-limited." },
  { step: "02", icon: FileSearch, title: "We shop specialty rental markets", description: "Niche markets that actually write equipment floaters with rented-to-others language — not generic commercial markets that carve out the theft, the breakdown, or the liability limits your GC customers require." },
  { step: "03", icon: FileSignature, title: "Bind a program built for rental", description: "Equipment floater + rented-to-others + equipment breakdown + GL + commercial auto + workers' comp + umbrella, coordinated so there are no gaps across your fleet, your delivery operation, and your customers." },
  { step: "04", icon: ShieldCheck, title: "Claims support that moves fast", description: "When a theft, a breakdown, or an injury claim arrives, you reach a person with context — not a queue. 2-hour response." },
] as const;

/* ============================================================
   WHY CHOOSE US
   ============================================================ */
export const WHY_CHOOSE = [
  { icon: Container, title: "Equipment floaters with rented-to-others language", description: "Standard commercial property covers your yard and stops at the gate. We place equipment floaters that follow your fleet to customer sites — and carry the rented-to-others language that makes your business model insurable." },
  { icon: Wrench, title: "Equipment breakdown a floater won't cover", description: "An operator seizes a transmission or shorts an electrical system — the floater excludes internal failure. We build in equipment-breakdown coverage for exactly the failures high-utilization rental fleets generate most." },
  { icon: KeyRound, title: "Coverage for equipment in customers' hands", description: "Your core exposure is equipment operated by paying customers you can't directly supervise. Rented-to-others coverage addresses damage, abuse, and loss that ordinary floaters were never built to handle." },
  { icon: Car, title: "Commercial auto for the delivery fleet", description: "Delivery trucks, flatbeds, lowboys, and trailers need real commercial auto — with trailers scheduled at replacement value and coverage coordinated with the floater so equipment in transit is never uncovered." },
  { icon: AlertTriangle, title: "We place the hard rental risks", description: "Been declined over a high theft loss run, a prior total-loss, OSHA citations, or new-operation status? We have E&S markets for rental yards others won't touch." },
  { icon: HardHat, title: "Run by a former contractor", description: "Josh Cotner knows how rental operations work and what happens when coverage fails at claim time — on the lot and off." },
] as const;

/* ============================================================
   SERVICE DETAIL — keyed by each service slug
   ============================================================ */
export interface ServiceDetail {
  heroBlurb: string;
  whatsCovered: string[];
  whoItsFor: string[];
  whyCca: string[];
  faqs: FAQItem[];
}

export const SERVICE_DETAIL: Record<string, ServiceDetail> = {
  "inland-marine": {
    heroBlurb: "The coverage that defines a rental yard's risk. An equipment floater follows your owned rental equipment to customer job sites, in transit on your trucks, and anywhere else it operates — covering theft, physical damage, vandalism, and mysterious disappearance. Standard commercial property covers only your yard; this is what insures the fleet once it leaves the gate.",
    whatsCovered: ["Owned rental equipment at customer job sites, in transit, and in storage", "Theft and mysterious disappearance of scheduled equipment", "Physical damage, collision, fire, and vandalism", "Scheduled high-value units at agreed value — no depreciation dispute", "Blanket coverage for the working fleet with newly acquired equipment auto-covered", "Loading, unloading, and transit exposure"],
    whoItsFor: ["Any equipment rental company whose fleet leaves the yard (essentially all of them)", "Operations with high-value units — excavators, boom lifts, loaders — that must be scheduled individually", "Rental yards whose standard commercial property stops at the gate", "Companies delivering equipment across a wide radius or state lines"],
    whyCca: ["Equipment floater structured with rented-to-others language from day one", "High-value units scheduled at agreed value, not actual cash value", "Specialty inland marine markets for rental fleets with prior theft or damage loss runs"],
    faqs: faqsJson.services["inland-marine"] as FAQItem[],
  },
  "general-liability": {
    heroBlurb: "Third-party bodily injury and property damage protection for a rental operation — a customer injured while operating your equipment, property damage at a delivery site, and the products-and-completed-operations exposure that follows equipment you own and rent to others. Structured with the limits and additional-insured terms your commercial customers require.",
    whatsCovered: ["Third-party bodily injury at your yard and customer job sites", "Customer injuries sustained while operating your equipment", "Property damage during delivery, setup, and pickup", "Products and completed operations coverage", "Defense costs and legal fees", "Blanket additional insured endorsement for fast COI turnaround"],
    whoItsFor: ["Any rental company required to provide certificates of insurance to customers", "Operations renting to general contractors, commercial projects, or government work", "Yards renting equipment operated by the customer (injury exposure)", "Companies whose GL limits are too low to qualify for tier-one commercial bids"],
    whyCca: ["GL structured with products and completed operations for the rental exposure", "Limits sized to what GCs and project owners require — $1M/$2M baseline, higher for tier-one work", "Blanket additional insured endorsement so certificates issue same-day"],
    faqs: faqsJson.services["general-liability"] as FAQItem[],
  },
  "equipment-breakdown": {
    heroBlurb: "Covers the sudden and accidental internal mechanical or electrical failure of rental equipment — a seized transmission, a failed hydraulic pump, a shorted electrical system. Your equipment floater excludes internal breakdown; this coverage fills the gap that high-utilization rental fleets run by many different operators need most.",
    whatsCovered: ["Internal mechanical failure — transmissions, engines, drivetrains", "Hydraulic pump and system failure", "Electrical system shorts and failures", "Boiler, pressure-vessel, and compressor failure", "Cost to repair or replace failed components", "Coverage for the internal failures a floater explicitly excludes"],
    whoItsFor: ["Any rental yard whose floater excludes internal mechanical breakdown (most do)", "High-utilization fleets operated by many different customers", "Operations with significant investment in complex equipment — excavators, lifts, compressors", "Yards that have absorbed repair bills for operator-caused internal failures"],
    whyCca: ["Equipment breakdown paired with the floater — not one or the other", "Sudden-and-accidental internal failure covered, with documentation support", "One of the most cost-effective lines relative to the repair bills it prevents"],
    faqs: faqsJson.services["equipment-breakdown"] as FAQItem[],
  },
  "rented-to-others": {
    heroBlurb: "A specialized inland marine endorsement built for companies that own equipment and rent it to paying customers. It addresses the unique exposure created when your equipment sits in a customer's care, custody, and control — covering damage, abuse, and loss that ordinary floaters were never built to handle. If you rent out equipment you own, this is the coverage that makes the business model insurable.",
    whatsCovered: ["Damage to your equipment while in a customer's custody", "Operator abuse, overloading, and misuse losses", "Loss of rented equipment that doesn't come back", "Subrogation path against the customer's carrier after a loss", "Coverage for the core exposure of renting equipment you own", "Coordination with the equipment floater and customer COI requirements"],
    whoItsFor: ["Any company that owns equipment and rents it to paying customers", "Operations whose standard floater lacks rented-to-others language", "Rental yards that have had damage claims denied for lack of this endorsement", "Companies renting high-value equipment into commercial customer hands"],
    whyCca: ["We verify rented-to-others language is present — most agents never check", "Subrogation path built in so your loss history and deductible are protected", "Specialty markets that understand the rental-customer exposure"],
    faqs: faqsJson.services["rented-to-others"] as FAQItem[],
  },
  "commercial-auto": {
    heroBlurb: "Coverage for the delivery trucks, flatbeds, lowboys, and trailers you run to move rental equipment — liability, physical damage, uninsured/underinsured motorist, and hired and non-owned auto for employees on business. Trailers scheduled at real replacement value; coverage coordinated with the inland marine floater so there's no gap in transit.",
    whatsCovered: ["Liability for at-fault accidents in delivery trucks and tow vehicles", "Physical damage to owned trucks, flatbeds, and lowboys", "Trailers scheduled at real replacement value", "Uninsured and underinsured motorist coverage", "Hired and non-owned auto for employees on business", "Loading, unloading, and transit exposure coordinated with the floater"],
    whoItsFor: ["Rental companies that deliver equipment (legally required on public roads)", "Operations with significant investment in trailers and tow vehicles", "Yards whose employees use personal vehicles for parts runs or delivery coordination", "Companies whose personal auto or generic commercial forms exclude business use"],
    whyCca: ["Trailers scheduled at replacement value — not the under-valued default", "Coordinates with the floater so equipment in transit is always covered", "Fleet and single-vehicle programs with limits sized to commercial customer requirements"],
    faqs: faqsJson.services["commercial-auto"] as FAQItem[],
  },
  "workers-compensation": {
    heroBlurb: "Coverage for the real injury patterns in equipment rental work — heavy-lifting and loading injuries, delivery-driving incidents, and mechanic injuries around running equipment. Proper class codes for yard staff, drivers, and mechanics so you're neither overpaying nor exposed at audit or claim time.",
    whatsCovered: ["Medical treatment for on-the-job injuries", "Disability and lost-wage benefits for injured workers", "Heavy-lifting, loading, and unloading injuries", "Delivery-driving incidents and traffic exposure", "Mechanic injuries around running equipment", "Employers' liability (Part Two) protection"],
    whoItsFor: ["Rental companies with W-2 employees (required in most states)", "Yard, delivery, and mechanic crews", "Operations whose workers are misclassified under generic codes", "Companies whose seasonal peak-hiring needs accurate payroll reflection"],
    whyCca: ["Class codes structured for actual rental job categories — yard, driver, mechanic, office", "High-hazard rental labor reflected in the rating — not generic codes", "Seasonal payroll structured so the year-end audit doesn't produce a surprise bill"],
    faqs: faqsJson.services["workers-compensation"] as FAQItem[],
  },
  "umbrella": {
    heroBlurb: "Excess liability that sits above your general liability, commercial auto, and employers' liability — so when a serious truck accident or a severe injury from rented equipment exceeds the underlying limits, the umbrella responds and your business and personal assets aren't left in the gap. Often required by the large commercial customers you want to rent to.",
    whatsCovered: ["Excess liability above general liability limits", "Excess liability above commercial auto limits", "Excess employers' liability above workers' comp", "Protection against judgments that exceed underlying limits", "Coverage that follows form over underlying policies", "Limits from $1M to $10M+"],
    whoItsFor: ["Any multi-vehicle rental operation with a delivery fleet", "Rental yards bidding commercial or municipal contracts", "Operations whose contracts require a specific umbrella limit", "Owners protecting personal assets from a large liability claim"],
    whyCca: ["Umbrella layered correctly over GL, auto, and workers' comp", "Limits sized to what your GC and project-owner customers actually require", "One of the most cost-effective layers in the program relative to the severity it covers"],
    faqs: faqsJson.services["umbrella"] as FAQItem[],
  },
};

/* ============================================================
   COVERAGE REGIONS — coverage page
   ============================================================ */
export const AZ_REGIONS = [
  { name: "Phoenix & Central Arizona", note: "Sun Corridor — year-round construction and summer-peak rental demand" },
  { name: "Dallas–Fort Worth", note: "DFW Metroplex — one of the largest U.S. rental markets" },
  { name: "Houston & Gulf Coast", note: "Energy, port, and post-storm reconstruction rental volume" },
  { name: "Denver & Front Range", note: "Mountain-region construction and long hauling radius" },
  { name: "Atlanta & North Georgia", note: "Southeast hub — residential, commercial, and event rental demand" },
  { name: "Nashville & Middle Tennessee", note: "Construction boom driving excavation and dirt-work fleet demand" },
  { name: "Tampa & Central Florida", note: "Year-round construction and hurricane-season storm response" },
  { name: "Salt Lake City & Wasatch Front", note: "Fast-growing Mountain West — site-work and access equipment" },
];

export const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

export const QUOTE_SERVICE_TYPES = [
  "Inland Marine / Equipment Floater",
  "Rented-to-Others Coverage",
  "Equipment Breakdown",
  "General Liability",
  "Commercial Auto / Delivery Fleet",
  "Workers' Compensation",
  "Commercial Umbrella",
  "Party / Event Rental Insurance",
  "Full program / bundle (recommended)",
  "Not sure — help me figure it out",
];

export const YEARS_OPTIONS = [
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "6–10 years",
  "10+ years",
];

/* ============================================================
   FAQ helpers — used by location/service/coverage pages to pad to 20.
   ============================================================ */
export const LOCATION_FAQ_BASE = GENERAL_FAQS;

export function buildPageFaqs(base: FAQItem[], extras?: FAQItem[], target = 20): FAQItem[] {
  const merged = [...(extras ?? []), ...base];
  const seen = new Set<string>();
  const out: FAQItem[] = [];
  for (const f of merged) {
    if (seen.has(f.q)) continue;
    seen.add(f.q);
    out.push(f);
    if (out.length >= target) break;
  }
  return out;
}
