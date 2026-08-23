import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
// Lenis ships this and requires it: it sets html/body height to auto, contains
// overscroll inside [data-lenis-prevent] scrollers, and kills pointer events on
// iframes mid-scroll. Loaded before globals so our own rules still win.
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { Cursor } from "@/components/cursor";
import { site } from "@/data/content";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  // 800 is the wordmark only. The rest of the site is 400/500.
  weight: ["400", "500", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ikhmalhanif.xyz"),
  title: {
    default: `${site.fullName} · Full-Stack Web Development, Malaysia`,
    template: `%s | ${site.name}`,
  },
  description: `${site.fullName} builds web apps, online stores and payment integrations for small businesses in Malaysia. Full-stack development by ${site.author}.`,
  keywords: [
    "Web development Malaysia",
    "Web design Kuala Lumpur",
    "Next.js developer",
    "E-commerce website",
    "Payment gateway integration",
    "FPX DuitNow",
    "Freelance web developer",
  ],
  authors: [{ name: site.author, url: "https://ikhmalhanif.xyz" }],
  creator: site.author,
  publisher: site.fullName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ikhmalhanif.xyz",
    images: [
      {
        url: "/og-neko-labz-solutions.png",
        width: 1200,
        height: 630,
        alt: "Neko Labz Solutions",
      },
    ],
    title: `${site.fullName} · Full-Stack Web Development, Malaysia`,
    description: `Web apps, online stores and payment integrations for small businesses. A one-person software developer in ${site.city}.`,
    siteName: site.fullName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} · Full-Stack Web Development, Malaysia`,
    description: `Web apps, online stores and payment integrations for small businesses. A one-person software developer in ${site.city}.`,
    images: [
      {
        url: "/og-neko-labz-solutions.png",
        alt: `${site.fullName} logo`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interTight.variable} antialiased`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        {/* Direct child of <body>: mix-blend-difference only blends within its
            own stacking context, so a transformed wrapper would kill it. */}
        <Cursor />
      </body>
    </html>
  );
}
