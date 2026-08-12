import { Globe, CreditCard, Smartphone, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  blurb: string;
  points: string[];
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    id: "web",
    title: "Web apps & sites",
    blurb:
      "Custom builds in Next.js and React — from a one-page launch site to a full internal dashboard.",
    points: [
      "Marketing sites, landing pages, company profiles",
      "Dashboards, booking systems, admin panels",
      "Built to be fast, responsive and search-friendly",
    ],
    icon: Globe,
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
    icon: CreditCard,
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
    icon: Smartphone,
  },
  {
    id: "care",
    title: "Maintenance & consulting",
    blurb:
      "Keep an existing site healthy, or get a second opinion before you commit to a build.",
    points: [
      "Monthly retainers for updates and fixes",
      "Performance, SEO and accessibility audits",
      "Technical advice on stack and hosting choices",
    ],
    icon: Wrench,
  },
];
