// Centralized site data — used across nav, footer, schema, CTAs
// Equipment Rental Insurance — equipment rental company coverage

export const SITE = {
  name: "Equipment Rental Insurance",
  legalName: "Equipment Rental Insurance (by Contractors Choice Agency)",
  domain: "equipmentrentalinsurance.com",
  url: "https://equipmentrentalinsurance.com",
  tagline: "Insurance for Equipment Rental Companies — Protect the Fleet You Rent Out",
  description:
    "Specialized commercial insurance for equipment rental companies — inland marine / equipment floater, rented-to-others coverage, equipment breakdown, general liability, commercial auto for delivery fleets, workers' comp, and commercial umbrella. Skid steers, excavators, boom lifts, trailers, tools, and party/event rentals. Licensed all 50 states.",
  phone: "844-967-5247",
  phoneAlt: "855-336-7189",
  phoneHref: "tel:+18449675247",
  phoneAltHref: "tel:+18553367189",
  email: "josh@contractorschoiceagency.com",
  founded: 2005,
  npn: "8608479",
  address: {
    street: "12220 E Riggs Road, Suite #105",
    city: "Chandler",
    state: "AZ",
    zip: "85249",
    country: "US",
  },
  hours: "Mon–Fri 8am–5pm (MST)",
  claimsSla: "2-hour claims response",
  quoteSla: "15-minute quote turnaround",
  statesLicensed: "All 50 states",
} as const;

// Niche nouns used in headings, metadata, and component copy
export const BRAND = {
  brandShort: "Equipment",
  brandSub: "Rental Insurance",
  nicheShort: "equipment rental company",
  nicheShortCap: "Equipment Rental Company",
  nichePlural: "equipment rental companies",
  nichePluralCap: "Equipment Rental Companies",
  operator: "rental operation",
  operatorCap: "Rental Operation",
  industry: "equipment rental",
  industryCap: "Equipment Rental",
  audience: "rental yard owners",
  audienceCap: "Rental Yard Owners",
  ownerTitle: "rental yard owner",
  regionPill: "Phoenix · Dallas · Denver · National",
  serviceSuffix: "for Equipment Rental Companies",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Coverage", href: "/coverage" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const SERVICES = [
  {
    slug: "inland-marine",
    title: "Inland Marine / Equipment Floater Insurance",
    short: "Protect the fleet you rent out — wherever it goes",
    description:
      "The coverage that defines a rental yard's risk. An equipment floater follows your owned rental equipment to customer job sites, in transit on your trucks, and anywhere else it operates — covering theft, physical damage, vandalism, and mysterious disappearance. Standard commercial property covers only your yard; the floater covers the fleet once it leaves the gate.",
    icon: "Container",
    keywords: ["equipment floater insurance", "inland marine equipment insurance", "inland marine equipment floater", "construction equipment rental insurance"],
  },
  {
    slug: "general-liability",
    title: "General Liability for Equipment Rental Companies",
    short: "Third-party injury and damage from your rental operation",
    description:
      "Third-party bodily injury and property damage protection for a rental operation — a customer injured while operating your equipment, property damage at a delivery site, and the products-and-completed-operations exposure that follows equipment you own and rent to others. Structured with the limits and additional-insured terms commercial customers require.",
    icon: "ShieldCheck",
    keywords: ["general liability insurance for rental equipment", "rental company liability insurance", "insurance for equipment rental business"],
  },
  {
    slug: "equipment-breakdown",
    title: "Equipment Breakdown Insurance",
    short: "Mechanical & electrical failures a floater excludes",
    description:
      "Covers the sudden and accidental internal mechanical or electrical failure of rental equipment — a seized transmission, a failed hydraulic pump, a shorted electrical system. Your equipment floater excludes internal breakdown; this coverage fills the gap that high-utilization rental fleets run by many different operators need most.",
    icon: "Wrench",
    keywords: ["equipment breakdown insurance", "insurance for construction equipment", "mechanical breakdown coverage"],
  },
  {
    slug: "rented-to-others",
    title: "Rented-to-Others Coverage",
    short: "The core exposure: your equipment in customers' hands",
    description:
      "A specialized inland marine endorsement built for companies that own equipment and rent it to paying customers. It addresses the unique exposure created when your equipment sits in a customer's care, custody, and control — covering damage, abuse, and loss that ordinary floaters were never built to handle. If you rent out equipment you own, this is the coverage that makes the business model insurable.",
    icon: "KeyRound",
    keywords: ["rented to others insurance", "rented equipment coverage", "insurance for renting out equipment"],
  },
  {
    slug: "commercial-auto",
    title: "Commercial Auto for Rental Fleets",
    short: "Delivery trucks, flatbeds, lowboys & trailers",
    description:
      "Coverage for the delivery trucks, flatbeds, lowboys, and trailers you run to move rental equipment — liability, physical damage, uninsured/underinsured motorist, and hired and non-owned auto for employees on business. Trailers scheduled at real replacement value; coverage coordinated with the inland marine floater so there's no gap in transit.",
    icon: "Car",
    keywords: ["commercial auto insurance for equipment rental", "tool rental insurance", "delivery truck insurance"],
  },
  {
    slug: "workers-compensation",
    title: "Workers' Compensation for Rental Businesses",
    short: "For yard crews, drivers & mechanics",
    description:
      "Coverage for the real injury patterns in equipment rental work — heavy-lifting and loading injuries, delivery-driving incidents, and mechanic injuries around running equipment. Proper class codes for yard staff, drivers, and mechanics so you're neither overpaying nor exposed at audit or claim time.",
    icon: "HardHat",
    keywords: ["equipment rental workers comp", "workers compensation equipment rental"],
  },
  {
    slug: "umbrella",
    title: "Commercial Umbrella Insurance",
    short: "Excess liability above your auto, GL & workers' comp",
    description:
      "Excess liability that sits above your general liability, commercial auto, and employers' liability — so when a serious truck accident or a severe injury from rented equipment exceeds the underlying limits, the umbrella responds and your business and personal assets aren't left in the gap. Often required by the large commercial customers you want to rent to.",
    icon: "Umbrella",
    keywords: ["umbrella insurance for contractors", "commercial umbrella rental company"],
  },
] as const;

export const LOCATIONS = [
  { slug: "phoenix", name: "Phoenix", region: "Central Arizona", blurb: "Year-round construction demand and a fast-growing Sun Corridor make Phoenix one of the busiest equipment rental markets in the country. We insure Phoenix and Central Arizona rental yards — heavy equipment, boom and scissor lifts, skid steers, and party rentals — with markets that understand the desert climate and the summer-peak utilization that defines the market." },
  { slug: "dallas-fort-worth", name: "Dallas–Fort Worth", region: "DFW Metroplex · Texas", blurb: "The DFW Metroplex is one of the largest construction and industrial rental markets in the U.S. Coverage built for Dallas–Fort Worth rental companies — large excavation and dirt-work fleets, hot commercial demand, and the multi-state delivery radius that North Texas operators run." },
  { slug: "houston", name: "Houston", region: "Gulf Coast · Texas", blurb: "Houston's energy, port, and post-storm reconstruction volume drives heavy demand for equipment rental. Programs for Houston and Gulf Coast rental yards — exposure to industrial and petrochemical customers, high delivery volume, and storm-response surge capacity." },
  { slug: "denver", name: "Denver", region: "Front Range · Colorado", blurb: "Denver and the Colorado Front Range combine a strong construction market with mountain-region access work. Coverage for Denver rental companies — equipment built for elevation and grade, long hauling radius across the Mountain West, and the seasonal snow and earthwork cycles that shape the calendar." },
  { slug: "atlanta", name: "Atlanta", region: "North Georgia · Southeast", blurb: "Atlanta is the hub of the Southeast's construction and equipment rental market. We insure Atlanta and North Georgia rental yards — large residential and commercial build volume, event and party rental demand, and the regional delivery routes that Georgia operators serve." },
  { slug: "nashville", name: "Nashville", region: "Middle Tennessee", blurb: "Nashville's sustained construction boom has made Middle Tennessee a top-tier equipment rental market. Coverage for Nashville rental companies — heavy dirt-work and excavation fleets, commercial build demand, and the multi-state customer base Tennessee operators draw from." },
  { slug: "tampa", name: "Tampa", region: "Gulf Coast · Florida", blurb: "Tampa and Central Florida combine year-round construction with hurricane-season storm response. Programs for Tampa rental yards — exposure to storm-debris and rebuild surge, event and party rental demand, and the coastal climate that shapes equipment maintenance and storage." },
  { slug: "salt-lake-city", name: "Salt Lake City", region: "Wasatch Front · Utah", blurb: "Salt Lake City and the Wasatch Front are among the fastest-growing equipment rental markets in the Mountain West. Coverage for Utah rental companies — heavy excavation and site-work fleets, mountain-region access equipment, and the winter-to-summer utilization swing that defines the Intermountain market." },
] as const;

export const CREDENTIALS = [
  { label: "Licensed in all 50 states", icon: "MapPin" },
  { label: "Founded 2005 — 20+ years", icon: "CalendarCheck" },
  { label: "Rental-knowledgeable agents", icon: "HardHat" },
  { label: "15-minute quote turnaround", icon: "Timer" },
  { label: "2-hour claims response", icon: "Zap" },
  { label: "A.M. Best A+ carrier partners", icon: "Award" },
] as const;

export const STATS = [
  { value: 58, suffix: "M+", label: "Premium placed for contractors — rental yards and fleets", prefix: "$" },
  { value: 2, suffix: " hr", label: "Claims response — reach a person, not a queue", prefix: "" },
  { value: 50, suffix: "", label: "States licensed and writing", prefix: "" },
  { value: 20, suffix: "+", label: "Years insuring contractor operations", prefix: "" },
] as const;

export const TESTIMONIALS = [
  { quote: "Two skid steers were stolen off a customer's site the same week. Our old carrier's equipment floater didn't carry rented-to-others language and tried to deny the claim. Equipment Rental Insurance had the floater structured right, paid the scheduled value fast, and then went after the customer's carrier for recovery. That structure is the whole game for us.", name: "Marcus T.", role: "Rental Yard Owner", location: "Phoenix, AZ" },
  { quote: "A $180,000 excavator came back with a seized transmission — operator abuse. The floater wouldn't touch an internal failure, but the equipment-breakdown coverage these folks set up paid the rebuild without a fight. Nobody else even mentioned breakdown coverage when they quoted us. They get what a rental fleet actually deals with.", name: "Dana R.", role: "Fleet Manager", location: "Dallas–Fort Worth, TX" },
  { quote: "We were losing commercial bids because our liability limits were too low and we couldn't turn certificates fast enough. They built us a $5M umbrella with a blanket additional-insured endorsement and now I issue COIs same-day and qualify for tier-one GC work I couldn't touch before. Real rental-industry knowledge.", name: "Tony V.", role: "Operations Director", location: "Denver, CO" },
] as const;
