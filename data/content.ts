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
  address: "Kg Belukut, Jalan Bebuloh Darat, W.P. Labuan, Malaysia",
  email: "ikhmalhanif60@gmail.com",
  phone: "+60 12-817 6934",
  whatsapp: "https://wa.me/60128176934",
  github: "https://github.com/mal49",
  linkedin: "https://linkedin.com/in/ikhmalhanif",
} as const;

export const navLinks = [
  { label: "Index", href: "#index" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "/pricing" },
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

export const about =
  "One developer in Malaysia, building websites and apps for small businesses from first sketch to launch, and keeping them running after.";

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

export const contactLinks = [
  { label: "[Email]", value: site.email, href: `mailto:${site.email}` },
  { label: "[WhatsApp]", value: site.phone, href: site.whatsapp },
  { label: "[GitHub]", value: "mal49", href: site.github },
  { label: "[LinkedIn]", value: "ikhmalhanif", href: site.linkedin },
] as const;
