// Single source of truth for the `quote` form (Netlify form `quote`).
// Imported by BOTH the browser page (src/app/quote/page.tsx) and the server function
// (netlify/functions/quote-request.ts) so client and server can never disagree.
//
// Scope: the ACORD-mandatory set for form id `equipment-rental` (Equipment Rental Application,
// EIBI) per skills/acord-forms/forms/equipment-rental/FIELDS.md, plus the base ACORD web spec
// (_app-specs/ACORD-CORE-WEB-SPEC.md). Commercial site: NO date of birth, driver licence, SSN,
// signature or payment fields are collected. Live field names are never renamed.
// Operator block only: date of birth + driver licence (number, state, expiry) are collected for LISTED
// operators (ACORD "Date of Birth_2/s License No_2/State of Issuance_2/Expiration Date_2" for operator 1,
// _3 for operator 2). Never SSN/card/bank. These values must never be logged or echoed anywhere.

export type Flat = Record<string, string>;
export type Kind =
  | "text" | "email" | "tel" | "date" | "time" | "int" | "year" | "money" | "money0" | "zip"
  | "fein" | "sic" | "naics" | "states" | "select" | "textarea" | "yn" | "checks" | "dob" | "dlno" | "licexp";
export interface Field {
  name: string;
  label: string;
  section: string;
  kind: Kind;
  max: number;
  options?: string[];
  placeholder?: string;
  autocomplete?: string;
  note?: string;
  req?: boolean; // false = optional
  when?: (d: Flat) => boolean; // required only when true
  show?: (d: Flat) => boolean; // visible when true (defaults to `when`)
  group?: string; // all-or-nothing block id (shown inside a collapsible)
  coverageKey?: string;
  coverageValue?: string;
}

export const NOTICE =
  "This is a complete, end-to-end quote request. We need all of the information below to prepare your quote. Please complete every required field. Once your quote is prepared, you can review it and discuss it with your agent.";

export const YES_NO = ["Yes", "No"];
// Live state list on this site is full names (kept); codes are also accepted in statesOfOperation.
export const STATE_NAMES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];
export const STATE_CODES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

export const ENTITY_TYPES = ["Individual / Sole proprietorship", "Partnership", "Corporation", "LLC", "Joint venture", "Other"];
export const SOLE_PROP = "Individual / Sole proprietorship";
export const TRADE_TYPES = [
  "Construction & heavy equipment rental", "Tool & small equipment rental", "Party / event equipment rental",
  "Trailer / towable rental", "Aerial lift / scaffolding rental", "Specialty / other equipment rental",
];
export const MAINTENANCE_OPTIONS = ["In-house staff", "Renter / customer", "Third-party vendor", "Mix of the above"];
export const LIMIT_OPTIONS = [
  "Silver: $25,000 per person, $50,000 per accident, $100,000 aggregate",
  "Gold: $50,000 per person, $100,000 per accident, $200,000 aggregate",
  "Platinum: $100,000 per person, $200,000 per accident, $400,000 aggregate",
  "Other",
];
export const DEDUCTIBLE_OPTIONS = ["$500", "$1,000", "$2,500", "Other"];

// ONE optional "other coverage you need" checklist; each ticked item needs a free-text box.
export const OTHER_COVERAGES = [
  { key: "pollution", value: "Pollution", label: "Pollution" },
  { key: "workersComp", value: "Workers Compensation", label: "Workers compensation" },
  { key: "commercialAuto", value: "Commercial Auto", label: "Commercial auto" },
  { key: "umbrella", value: "Umbrella/Excess", label: "Umbrella / excess" },
  { key: "bonds", value: "Bonds", label: "Bonds" },
  { key: "equipmentInlandMarine", value: "Tools & Equipment (Inland Marine)", label: "Equipment / inland marine" },
  { key: "liquor", value: "Liquor", label: "Liquor" },
];

export const SECTIONS = [
  { id: "applicant", title: "1. About your business" },
  { id: "address", title: "2. Business address and contact" },
  { id: "operations", title: "3. Your rental operation" },
  { id: "operators", title: "4. Who will operate the equipment" },
  { id: "rental", title: "5. The rental" },
  { id: "equipment", title: "6. Equipment you are renting" },
  { id: "coverage", title: "7. Coverage you want" },
  { id: "history", title: "8. Insurance and loss history" },
];

export const MAX_MACHINES = 5; // every row is registered in public/__forms.html (ACORD page holds 4)
export const MAX_OPERATORS = 2;

// ------------------------------------------------------------------ field definitions
const is = (k: string, v: string) => (d: Flat) => (d[k] || "").trim() === v;
const any = (names: string[]) => (d: Flat) => names.some((n) => (d[n] || "").trim() !== "");
const T = (name: string, label: string, section: string, o: Partial<Field> = {}): Field => ({ name, label, section, kind: "text", max: 120, ...o });

const MACHINE_REQ = (n: number) => ["equipmentType", "equipmentYear", "equipmentMake", "equipmentModel", "equipmentSerialNumber", "equipmentValue"].map((x) => `${x}_${n}`);
const equipRow = (n: number): Field[] => {
  const names = MACHINE_REQ(n);
  const when = n === 1 ? undefined : any(names);
  const g = n === 1 ? undefined : `equipment-${n}`;
  const base: Partial<Field> = { when, group: g, show: () => true };
  const P = n === 1 ? "Equipment 1" : `Machine ${n}`;
  return [
    T(`equipmentType_${n}`, `${P} type`, "equipment", { ...base, max: 40, placeholder: "Skid steer" }),
    T(`equipmentYear_${n}`, `${P} year`, "equipment", { ...base, kind: "year", max: 4, placeholder: "2021" }),
    T(`equipmentMake_${n}`, `${P} make`, "equipment", { ...base, max: 40, placeholder: "Bobcat" }),
    T(`equipmentModel_${n}`, `${P} model`, "equipment", { ...base, max: 40, placeholder: "S650" }),
    T(`equipmentSerialNumber_${n}`, `${P} serial number`, "equipment", { ...base, max: 40, placeholder: "ALJ812345" }),
    T(`equipmentValue_${n}`, `${P} value (exact dollar amount)`, "equipment", { ...base, kind: "money", max: 14, placeholder: "45000" }),
    T(`equipmentVIN_${n}`, `${P} VIN (optional, titled units such as trailers)`, "equipment", { req: false, group: g, show: () => true }),
    T(`equipmentACV_${n}`, `${P} actual cash value (optional, exact dollar amount, if different from value)`, "equipment", { req: false, kind: "money", max: 14, group: g, show: () => true }),
  ];
};

const DL_MAX = 20; // ACORD box is auto-size; 20 covers every state's licence-number format
const opRow = (n: number): Field[] => {
  const p = `operator${n}`;
  const names = ["Name", "Street", "City", "State", "Zip", "Phone", "Email", "Experience", "DateOfBirth", "LicenseNumber", "LicenseState", "LicenseExpiration"].map((x) => p + x);
  const yes = is("additionalOperators", "Yes");
  const when = n === 1 ? yes : (d: Flat) => yes(d) && any(names)(d);
  const base: Partial<Field> = { when, show: yes, group: n === 1 ? undefined : `operator-${n}` };
  const l = `Operator ${n}`;
  return [
    T(`${p}Name`, `${l}: full name`, "operators", base),
    T(`${p}Street`, `${l}: street address`, "operators", base),
    T(`${p}City`, `${l}: city`, "operators", { ...base, max: 60 }),
    T(`${p}State`, `${l}: state`, "operators", { ...base, kind: "select", options: STATE_NAMES }),
    T(`${p}Zip`, `${l}: ZIP`, "operators", { ...base, kind: "zip", max: 10 }),
    T(`${p}Phone`, `${l}: phone`, "operators", { ...base, kind: "tel", max: 30 }),
    T(`${p}Email`, `${l}: email`, "operators", { ...base, kind: "email" }),
    T(`${p}Experience`, `${l}: experience operating this type of rented equipment`, "operators", { ...base, kind: "textarea", max: 250 }),
    T(`${p}DateOfBirth`, `${l}: date of birth`, "operators", { ...base, kind: "dob", max: 10, autocomplete: "off" }),
    T(`${p}LicenseNumber`, `${l}: driver's licence number`, "operators", { ...base, kind: "dlno", max: DL_MAX, autocomplete: "off" }),
    T(`${p}LicenseState`, `${l}: state that issued the licence`, "operators", { ...base, kind: "select", options: STATE_CODES, autocomplete: "off" }),
    T(`${p}LicenseExpiration`, `${l}: licence expiration date`, "operators", { ...base, kind: "licexp", max: 10, autocomplete: "off" }),
  ];
};

const insured = is("currentlyInsured", "Yes");
const losses = is("lossesLast3Years", "Yes");

export const FIELDS: Field[] = [
  // ---- 1. business
  T("businessName", "Applicant full legal name (named insured)", "applicant", { autocomplete: "organization" }),
  T("name", "Your full name (printed name of the person completing this request)", "applicant", { autocomplete: "name" }),
  T("entityType", "Business entity type", "applicant", { kind: "select", options: ENTITY_TYPES }),
  T("fein", "Federal Employer ID Number (FEIN)", "applicant", {
    kind: "fein", max: 11, placeholder: "12-3456789",
    when: (d) => (d.entityType || "").trim() !== SOLE_PROP,
    note: "Required for every entity type except an individual / sole proprietor.",
  }),
  T("yearBusinessStarted", "Year business started", "applicant", { kind: "year", max: 4, placeholder: "2015" }),
  T("sicCode", "SIC code", "applicant", { kind: "sic", max: 4, placeholder: "7359" }),
  T("naicsCode", "NAICS code", "applicant", { kind: "naics", max: 6, placeholder: "532412" }),
  T("tradeType", "What type of equipment rental business is this?", "applicant", { kind: "select", options: TRADE_TYPES }),
  T("businessDescription", "Describe your rental operations (what you rent out, to whom, and whether you deliver, operate or staff the equipment)", "applicant", { kind: "textarea", max: 500 }),
  T("statesOfOperation", "States where you operate / rent out equipment", "applicant", { kind: "states", max: 120, placeholder: "Arizona, Nevada" }),
  T("fullTimeEmployees", "Full-time employees", "applicant", { kind: "int", max: 6 }),
  T("partTimeEmployees", "Part-time employees", "applicant", { kind: "int", max: 6 }),
  T("annualRevenue", "Annual gross revenue (exact dollar amount, next 12 months)", "applicant", { kind: "money", max: 16, placeholder: "500000" }),
  T("annualPayroll", "Annual payroll (exact dollar amount, excluding owners)", "applicant", { kind: "money", max: 16, placeholder: "180000" }),
  T("largestProjectValue", "Largest single rental or project, last 3 years (exact dollar amount)", "applicant", { kind: "money", max: 16, placeholder: "50000" }),

  // ---- 2. address + contact
  T("streetAddress", "Street address", "address", { autocomplete: "address-line1", placeholder: "1234 W Main St" }),
  T("city", "City", "address", { autocomplete: "address-level2", max: 60 }),
  T("state", "State", "address", { kind: "select", options: STATE_NAMES, autocomplete: "address-level1" }),
  T("zip", "ZIP code", "address", { kind: "zip", max: 10, autocomplete: "postal-code" }),
  T("email", "Email address", "address", { kind: "email", autocomplete: "email" }),
  T("phone", "Phone number", "address", { kind: "tel", max: 30, autocomplete: "tel" }),
  T("contactName", "Point of contact name (optional, if different from above)", "address", { req: false }),
  T("contactRole", "Point of contact role (optional)", "address", { req: false }),
  T("contactPhone", "Point of contact phone (optional)", "address", { req: false, kind: "tel", max: 30 }),
  T("contactEmail", "Point of contact email (optional)", "address", { req: false, kind: "email" }),

  // ---- 3. operations (existing live questions kept; previously-required ones stay required)
  T("operatesMultipleLocations", "Do you operate from multiple locations/branches?", "operations", { kind: "yn" }),
  T("additionalLocations", "List the other locations/branches (address or city/state for each)", "operations", { kind: "textarea", max: 400, when: is("operatesMultipleLocations", "Yes") }),
  T("secondaryBusinessOperations", "Do you operate any other type of business, besides equipment rental?", "operations", { kind: "yn" }),
  T("secondaryBusinessOperationsDescription", "Describe the other business", "operations", { kind: "textarea", max: 400, when: is("secondaryBusinessOperations", "Yes") }),
  T("usesSubcontractors", "Do you use subcontractors (delivery, setup, maintenance, operators)?", "operations", { kind: "yn" }),
  T("usesSubcontractorsExplain", "Explain: what work do subcontractors do for you?", "operations", { kind: "textarea", max: 250, when: is("usesSubcontractors", "Yes") }),
  T("rentalAgreementRequired", "Do renters sign a rental agreement/liability waiver before equipment leaves?", "operations", { kind: "yn" }),
  T("renterInsuranceRequired", "Do you require renters to carry their own insurance on rented equipment?", "operations", { kind: "yn" }),
  T("renterInsuranceVerificationMethod", "How do you verify it?", "operations", { max: 250, when: is("renterInsuranceRequired", "Yes") }),
  T("renterScreeningProcess", "Do you screen or qualify renters before renting (ID, experience, training)?", "operations", { kind: "yn" }),
  T("renterScreeningDescription", "Describe the screening process", "operations", { kind: "textarea", max: 400, when: is("renterScreeningProcess", "Yes") }),
  T("averageRentalContractLength", "Average rental length (optional)", "operations", { req: false, placeholder: "3 days, 2 weeks" }),
  T("averageDailyRentalRate", "Average rental rate (optional)", "operations", { req: false, placeholder: "$ per day/week" }),
  T("equipmentMaintenanceResponsibility", "Who is responsible for equipment maintenance? (optional)", "operations", { req: false, kind: "select", options: MAINTENANCE_OPTIONS }),
  T("equipmentInspectionFrequency", "How often is it inspected/checked? (optional)", "operations", { req: false, placeholder: "every return, monthly" }),

  // ---- 4. operators (DOB + driver licence collected per listed operator; email path only, never SMS)
  T("additionalOperators", "Will anyone besides you operate the rented equipment? (An operator who is not listed has no coverage.)", "operators", { kind: "yn" }),
  ...opRow(1),
  ...opRow(2),

  // ---- 5. rental
  T("rentalStartDate", "Rental start date", "rental", { kind: "date" }),
  T("rentalStartTime", "Rental start time", "rental", { kind: "time" }),
  T("rentalEndDate", "Rental end date", "rental", { kind: "date" }),
  T("rentalEndTime", "Rental end time", "rental", { kind: "time" }),
  T("lessorName", "Renting from: company name", "rental"),
  T("lessorStreet", "Renting from: street address", "rental"),
  T("lessorCity", "Renting from: city", "rental", { max: 60 }),
  T("lessorState", "Renting from: state", "rental", { kind: "select", options: STATE_NAMES }),
  T("lessorZip", "Renting from: ZIP", "rental", { kind: "zip", max: 10 }),
  T("rentalSiteDiffers", "Will the equipment be used at an address different from your business address?", "rental", { kind: "yn" }),
  T("rentalSiteStreet", "Rental location: street address", "rental", { when: is("rentalSiteDiffers", "Yes") }),
  T("rentalSiteCity", "Rental location: city", "rental", { max: 60, when: is("rentalSiteDiffers", "Yes") }),
  T("rentalSiteState", "Rental location: state", "rental", { kind: "select", options: STATE_NAMES, when: is("rentalSiteDiffers", "Yes") }),
  T("rentalSiteZip", "Rental location: ZIP", "rental", { kind: "zip", max: 10, when: is("rentalSiteDiffers", "Yes") }),
  T("rentalExperience", "Your previous experience with rentals of this type of equipment", "rental", { kind: "textarea", max: 250 }),
  T("message", "Project details: what is the equipment being used for, and where?", "rental", { kind: "textarea", max: 1000 }),

  // ---- 6. equipment schedule (machine 1 required; machines 2-5 all-or-nothing)
  ...[1, 2, 3, 4, 5].flatMap(equipRow),

  // ---- 7. coverage
  T("desiredEffectiveDate", "When do you need coverage to start?", "coverage", { kind: "date" }),
  T("quoteNeededBy", "When do you need this quote by?", "coverage", { kind: "date" }),
  T("requestedLimits", "Liability limit option", "coverage", { kind: "select", options: LIMIT_OPTIONS }),
  T("limitsOther", "Other liability limits you want (write in)", "coverage", { when: is("requestedLimits", "Other"), max: 120 }),
  T("deductibleOption", "Deductible option", "coverage", { kind: "select", options: DEDUCTIBLE_OPTIONS }),
  T("deductibleOther", "Other deductible amount you want (exact dollar amount)", "coverage", { kind: "money", max: 14, when: is("deductibleOption", "Other") }),
  { name: "coverageTypes", label: "Other coverage you need (optional: tick any that apply; leave blank if none)", section: "coverage", kind: "checks", req: false, max: 400 },
  ...OTHER_COVERAGES.map((c): Field => ({
    name: `otherCoverageDetail_${c.key}`, label: `${c.label}: tell us what you need`, section: "coverage", kind: "textarea", max: 250,
    when: (d) => listOf(d.coverageTypes).includes(c.value), coverageKey: c.key, coverageValue: c.value,
  })),
  T("seekingNewCoverageReason", "Why are you shopping for new coverage? (optional)", "coverage", { req: false, placeholder: "non-renewal, premium increase, new business" }),
  T("targetPremium", "Target premium (optional, exact dollar amount per year)", "coverage", { req: false, kind: "money", max: 14 }),

  // ---- 8. history
  T("currentlyInsured", "Do you currently have insurance in force?", "history", { kind: "yn" }),
  T("currentPolicyType", "Current policy type", "history", { when: insured, placeholder: "General liability" }),
  T("currentCarrier", "Current carrier (optional)", "history", { req: false, show: insured }),
  T("currentPolicyNumber", "Current policy number", "history", { when: insured, max: 40 }),
  T("currentPolicyEffective", "Current policy effective date", "history", { kind: "date", when: insured }),
  T("currentPolicyExpiration", "Current policy expiration date (optional)", "history", { kind: "date", req: false, show: insured }),
  T("currentLimits", "Current coverage limits", "history", { when: insured, placeholder: "$1M/$2M" }),
  T("currentCarrierOfferingRenewal", "Is your current carrier offering a renewal? (optional)", "history", { req: false, kind: "yn", show: insured }),
  T("ifNoRenewalWhy", "Why not?", "history", { max: 250, when: (d) => insured(d) && is("currentCarrierOfferingRenewal", "No")(d) }),
  T("shoppedOtherMarkets", "Have you already shopped this with other agents/markets? (optional)", "history", { req: false, kind: "yn" }),
  T("otherMarketsDetails", "What limits/coverage/premium did they offer?", "history", { max: 250, when: is("shoppedOtherMarkets", "Yes") }),
  T("lossesLast3Years", "Any liability losses or claims in the last 3 years?", "history", { kind: "yn" }),
  T("lossCount", "How many?", "history", { kind: "int", max: 3, when: losses }),
  T("lossHistoryDate", "Date of the (most recent) loss", "history", { kind: "date", when: losses }),
  T("lossHistoryAmount", "Amount of the (most recent) loss, paid/reserved/incurred (exact dollar amount)", "history", { kind: "money0", max: 14, when: losses }),
  T("lossHistoryDescription", "Explain each loss: date, what happened, amount paid, open or closed", "history", { kind: "textarea", max: 600, when: losses }),
  T("awareOfPotentialClaim", "Are you aware of any incident, event, or occurrence that might reasonably lead to a future claim?", "history", { kind: "yn" }),
  T("awareOfPotentialClaimDescription", "Please explain", "history", { kind: "textarea", max: 400, when: is("awareOfPotentialClaim", "Yes") }),
];

export const BY_NAME: Record<string, Field> = Object.fromEntries(FIELDS.map((f) => [f.name, f]));
// Derived/server-filled names (also registered in __forms.html).
export const DERIVED = ["applicationDate", "yearsInBusiness", "equipment", "equipmentCount"];
export const ALL_FIELDS: string[] = [...FIELDS.map((f) => f.name), ...DERIVED];

export function listOf(v: string | undefined): string[] {
  return (v || "").split(",").map((s) => s.trim()).filter(Boolean);
}
export const labelFor = (name: string): string => BY_NAME[name]?.label?.replace(/\s*\(.*?\)\s*$/, "") || name;

// ------------------------------------------------------------------ validation
export const ZIP_RE = /^\d{5}(-\d{4})?$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MONEY_RE = /^\$?\d{1,3}(,\d{3})+(\.\d{1,2})?$|^\$?\d+(\.\d{1,2})?$/;
const INT_RE = /^\d+$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const DL_RE = /^[A-Za-z0-9][A-Za-z0-9 \-]*$/;
const MIN_DRIVER_AGE = 16;
const FEIN_RE = /^\d{2}-?\d{7}$/;
const LOWER_STATES = STATE_NAMES.map((s) => s.toLowerCase());

function validDate(v: string): Date | null {
  if (!ISO_DATE_RE.test(v)) return null;
  const d = new Date(`${v}T00:00:00Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== v) return null;
  return d;
}

export const isRequired = (f: Field, d: Flat): boolean => f.req !== false && (f.when ? !!f.when(d) : true);
export const isShown = (f: Field, d: Flat): boolean => (f.show ? !!f.show(d) : f.when ? !!f.when(d) : true);

/** { fieldName: message } for every problem; {} = valid. Each message names the field. */
export function validateQuote(d: Flat, now: Date = new Date()): Record<string, string> {
  const err: Record<string, string> = {};
  const get = (k: string) => (d[k] ?? "").toString().trim();
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const year = now.getUTCFullYear();

  for (const f of FIELDS) {
    const v = get(f.name);
    const lab = labelFor(f.name);
    if (!v) {
      if (isRequired(f, d)) err[f.name] = f.kind === "yn" || f.kind === "select" ? `${lab}: please choose an answer` : `${lab} is required`;
      continue;
    }
    if (!isShown(f, d) && !isRequired(f, d)) continue; // stale value from a hidden branch: ignored
    if (v.length > f.max) { err[f.name] = `${lab} must be ${f.max} characters or fewer`; continue; }
    switch (f.kind) {
      case "email": if (!EMAIL_RE.test(v)) err[f.name] = `${lab} must be a valid email address`; break;
      case "tel": if (!/^[\d\s\-().+]+$/.test(v) || v.replace(/\D/g, "").length < 10) err[f.name] = `${lab} must be a valid number with area code`; break;
      case "zip": if (!ZIP_RE.test(v)) err[f.name] = `${lab} must be 5 digits (or ZIP+4)`; break;
      case "sic": if (!/^\d{4}$/.test(v)) err[f.name] = `${lab} must be 4 digits`; break;
      case "naics": if (!/^\d{6}$/.test(v)) err[f.name] = `${lab} must be 6 digits`; break;
      case "fein": if (!FEIN_RE.test(v)) err[f.name] = `${lab} must be 9 digits (XX-XXXXXXX)`; break;
      case "money": if (!MONEY_RE.test(v) || Number(v.replace(/[$,]/g, "")) <= 0) err[f.name] = `${lab} must be an exact dollar amount, numbers only (e.g. 45000)`; break;
      case "money0": if (!MONEY_RE.test(v)) err[f.name] = `${lab} must be an exact dollar amount, numbers only (e.g. 4500)`; break;
      case "int": if (!INT_RE.test(v)) err[f.name] = `${lab} must be a whole number`; break;
      case "year": {
        const y = Number(v);
        const lo = f.name === "yearBusinessStarted" ? 1900 : 1950;
        const hi = f.name === "yearBusinessStarted" ? year : year + 1;
        if (!/^\d{4}$/.test(v) || y < lo || y > hi) err[f.name] = `${lab} must be a 4-digit year (${lo} to ${hi})`;
        break;
      }
      case "states": {
        const ok = v.split(",").every((s) => { const t = s.trim(); return STATE_CODES.includes(t.toUpperCase()) || LOWER_STATES.includes(t.toLowerCase()); });
        if (!ok) err[f.name] = `${lab} must be state names or two-letter codes separated by commas (e.g. Arizona, NV)`;
        break;
      }
      case "time": if (!TIME_RE.test(v)) err[f.name] = `${lab} must be a valid time`; break;
      case "date": if (!validDate(v)) err[f.name] = `${lab} must be a valid date`; break;
      case "dob": {
        const x = validDate(v);
        if (!x) { err[f.name] = `${lab} must be a valid date`; break; }
        const cut = new Date(Date.UTC(today.getUTCFullYear() - MIN_DRIVER_AGE, today.getUTCMonth(), today.getUTCDate()));
        if (x.getUTCFullYear() < 1900) err[f.name] = `${lab} must be a real date of birth`;
        else if (x.getTime() >= today.getTime()) err[f.name] = `${lab} must be a date in the past`;
        else if (x.getTime() > cut.getTime()) err[f.name] = `${lab}: an operator must be at least ${MIN_DRIVER_AGE} years old`;
        break;
      }
      case "licexp": {
        const x = validDate(v);
        if (!x) err[f.name] = `${lab} must be a valid date`;
        else if (x.getUTCFullYear() < 1990) err[f.name] = `${lab} cannot be before 1990`;
        break;
      }
      case "dlno": if (!DL_RE.test(v)) err[f.name] = `${lab} may contain only letters, numbers, spaces and hyphens`; break;
      case "select": if (!(f.options || []).includes(v)) err[f.name] = `${lab}: choose one of the listed options`; break;
      case "yn": if (!YES_NO.includes(v)) err[f.name] = `${lab}: choose Yes or No`; break;
      case "checks": {
        const ok = OTHER_COVERAGES.map((c) => c.value);
        if (!listOf(v).every((x) => ok.includes(x))) err[f.name] = `${lab}: unknown selection`;
        break;
      }
      default: break;
    }
  }

  const dt = (k: string) => { const v = get(k); return v ? validDate(v) : null; };
  for (const k of ["desiredEffectiveDate", "quoteNeededBy"]) {
    const x = dt(k);
    if (x && x.getTime() < today.getTime() - 86400000) err[k] = `${labelFor(k)}: the date cannot be in the past`;
  }
  const rs = dt("rentalStartDate"), re = dt("rentalEndDate");
  if (rs && re) {
    if (re.getTime() < rs.getTime()) err.rentalEndDate = "Rental end date must be on or after the rental start date";
    else if (re.getTime() === rs.getTime() && get("rentalStartTime") && get("rentalEndTime") && get("rentalEndTime") <= get("rentalStartTime")) err.rentalEndTime = "Rental end time must be after the start time on a same-day rental";
  }
  const ce = dt("currentPolicyEffective"), cx = dt("currentPolicyExpiration");
  if (ce && cx && cx.getTime() <= ce.getTime()) err.currentPolicyExpiration = "Current policy expiration date must be after its effective date";
  if (get("lossesLast3Years") === "Yes" && INT_RE.test(get("lossCount")) && Number(get("lossCount")) < 1) err.lossCount = "How many? must be at least 1 when you answered Yes";
  return err;
}

const YEARS_BUCKETS = ["Less than 1 year", "1–2 years", "3–5 years", "6–10 years", "10+ years"];
function yearsBucket(started: number, now: Date): string {
  const n = now.getUTCFullYear() - started;
  if (n < 1) return YEARS_BUCKETS[0];
  if (n <= 2) return YEARS_BUCKETS[1];
  if (n <= 5) return YEARS_BUCKETS[2];
  if (n <= 10) return YEARS_BUCKETS[3];
  return YEARS_BUCKETS[4];
}

/** Fill the older live fields / "None" answers the application needs; call only after validateQuote passes. */
export function withDerived(d: Flat, now: Date = new Date()): Flat {
  const o: Flat = {};
  for (const f of ALL_FIELDS) o[f] = (d[f] ?? "").toString().trim();
  // drop answers left over from a branch that is switched off
  for (const f of FIELDS) if (!isShown(f, o) && !isRequired(f, o)) o[f.name] = "";
  o.applicationDate = now.toISOString().slice(0, 10);
  o.yearsInBusiness = yearsBucket(Number(o.yearBusinessStarted), now);
  if (o.currentlyInsured === "No") {
    for (const k of ["currentPolicyType", "currentCarrier", "currentPolicyNumber", "currentPolicyEffective", "currentPolicyExpiration", "currentLimits"]) o[k] = "None";
  }
  if (o.lossesLast3Years === "No") {
    o.lossCount = "0";
    o.lossHistoryDescription = "None - no liability losses in the last 3 years";
  }
  // Serialised equipment block (live field, kept for the lead body) + count
  const rows: string[] = [];
  for (let n = 1; n <= MAX_MACHINES; n++) {
    const g = (x: string) => o[`${x}_${n}`] || "—";
    if (!o[`equipmentMake_${n}`] && !o[`equipmentModel_${n}`] && !o[`equipmentSerialNumber_${n}`]) continue;
    rows.push(`${rows.length + 1}. Type: ${g("equipmentType")} | Year: ${g("equipmentYear")} | Make: ${g("equipmentMake")} | Model: ${g("equipmentModel")} | Serial: ${g("equipmentSerialNumber")} | Value: ${g("equipmentValue")} | VIN: ${g("equipmentVIN")} | ACV: ${g("equipmentACV")}`);
  }
  o.equipment = rows.join("\n");
  o.equipmentCount = String(rows.length);
  return o;
}
