import { projects } from "@/data/projects";

export const site = {
  name: "Neko Labz",
  fullName: "Neko Labz Solutions",
  short: "NEKO",
  author: "Ikhmal Hanif",
  /** How the name is signed on the site, as one word. */
  handle: "Ikhmalhanif",
  role: "Full-stack development",
  city: "Malaysia",
  entity: "SSM 202603210521 (IP0630481-A)",
  email: "ikhmalhanif60@gmail.com",
  whatsapp: "https://wa.me/60128176934",
  github: "https://github.com/mal49",
  linkedin: "https://linkedin.com/in/ikhmalhanif",
} as const;

export const navLinks = [
  { label: "Index", href: "#index" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
] as const;

/** Hero left column — numbered capability entries. */
export const heroEntries = [
  { id: "E01", label: "Web apps & sites" },
  { id: "E02", label: "E-commerce & payments" },
  { id: "E03", label: "Mobile & PWA" },
  { id: "E04", label: "Maintenance & consulting" },
  { id: "E05", label: "Technical consulting" },
] as const;

export const heroHeadline = ["Small businesses,", "shipped on the", "open web."] as const;

export const about = {
  lead: "ikhmalhanif",
  body:
    "Neko Labz Solutions is a one-person software developer in Malaysia that takes small business projects end to end, from design and build through payments and launch, and then stays on afterwards to keep them running. Work happens in Next.js and React [*], with checkouts wired into the rails Malaysians actually use [**]. Every project is quoted after a short call; there are no fixed packages, and nothing is handed over without the person who owns it knowing how to run it [***].",
  footnotes: [
    { mark: "[*]", text: "Next.js, React, TypeScript, Tailwind, Cloudflare and Vercel." },
    { mark: "[**]", text: "FPX, DuitNow QR, cards and e-wallets via CHIP, Bayarcash or Xendit." },
    { mark: "[***]", text: "Handover includes a walkthrough, docs and an optional monthly retainer." },
  ],
} as const;

export const statement = {
  line: "Built once. Maintained for as long as it earns.",
  cta: { label: "[Start a project]", href: "#contact" },
} as const;

export type StageItem = {
  index: string;
  name: string;
  featured: string;
  image: string;
  alt: string;
  href: string;
};

/** Scroll-stage sequence: the five shipped projects. */
export const stageItems: StageItem[] = projects.map((p, i) => ({
  index: `0${i + 1}`,
  name: p.title,
  featured: p.tech.slice(0, 3).join(" / "),
  image: p.image ?? "/neko-labz.png",
  alt: `Screenshot of ${p.title}`,
  href: p.demo,
}));

export type GalleryItem = { index: string; title: string; image: string; alt: string; meta: string };

export const galleryItems: GalleryItem[] = projects.map((p, i) => ({
  index: `0${i + 1}`,
  title: p.title,
  image: p.image ?? "/neko-labz.png",
  alt: `Screenshot of ${p.title}`,
  meta: p.tech.join(" / "),
}));

export const education = [
  {
    period: "2023 \u2014 current",
    degree: "Bachelor of Computer Science",
    institution: "Universiti Teknologi MARA",
    location: "Shah Alam",
    gpa: "3.19 / 4.00",
  },
  {
    period: "2020 \u2014 2023",
    degree: "Diploma in Electrical Engineering (Electronics)",
    institution: "Universiti Teknologi MARA",
    location: "Sarawak",
    gpa: "3.24 / 4.00",
  },
  {
    period: "2015 \u2014 2019",
    degree: "Sijil Pelajaran Malaysia",
    institution: "SMK Rancha-Rancha",
    location: "W.P. Labuan",
    gpa: undefined,
  },
] as const;

export const contactLinks = [
  { label: "[Email]", value: site.email, href: `mailto:${site.email}` },
  { label: "[WhatsApp]", value: "+60 12-817 6934", href: site.whatsapp },
  { label: "[GitHub]", value: "mal49", href: site.github },
  { label: "[LinkedIn]", value: "ikhmalhanif", href: site.linkedin },
] as const;
