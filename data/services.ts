export interface Service {
  id: string;
  title: string;
  blurb: string;
  points: string[];
  /** Shown as-is on /pricing. */
  price: string;
}

export const services: Service[] = [
  {
    id: "web",
    title: "Web apps & sites",
    blurb:
      "Custom builds in Next.js and React, from a one-page launch site to a full company website.",
    points: [
      "Marketing sites, landing pages, company profiles",
      "Built to be fast, responsive and search-friendly",
    ],
    price: "From RM 1,000",
  },
  {
    id: "payments",
    title: "E-commerce & payments",
    blurb:
      "Storefronts and checkouts wired into the payment rails Malaysians actually use.",
    points: [
      "FPX, DuitNow QR, cards and e-wallets",
      "CHIP, Bayarcash and Xendit integrations",
      "Webhook handling, receipts and reconciliation",
    ],
    price: "From RM 3,000",
  },
  {
    id: "systems",
    title: "Custom systems",
    blurb:
      "Internal tools built around how your business actually runs.",
    points: [
      "Tracking and inventory systems",
      "Booking systems, dashboards, admin panels",
      "User accounts, roles and reports",
    ],
    price: "From RM 4,500",
  },
  {
    id: "ai",
    title: "AI-integrated systems",
    blurb:
      "Custom systems with AI built into the workflow, not bolted on the side.",
    points: [
      "Chat and support assistants trained on your own content",
      "Reading documents, receipts and forms automatically",
      "Smart search and automated tasks",
    ],
    price: "From RM 5,000",
  },
  {
    id: "mobile",
    title: "Mobile & PWA",
    blurb:
      "Installable, offline-capable apps that feel native without an app-store queue.",
    points: [
      "Progressive web apps you can add to a home screen",
      "Mobile-first layouts and touch interactions",
      "Push notifications and offline caching",
    ],
    // ponytail: no figure given yet, swap in "From RM X" once set.
    price: "On quote",
  },
  {
    id: "care",
    title: "Maintenance & consulting",
    blurb:
      "Keep an existing site healthy, or get a second opinion before you commit to a build.",
    points: [
      "Monthly retainer for updates and fixes, or ad-hoc work by the hour",
      "Performance, SEO and accessibility audits",
      "Technical advice on stack and hosting choices",
    ],
    price: "RM 200 / month or RM 50 / hour",
  },
];
