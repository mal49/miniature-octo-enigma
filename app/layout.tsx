import type { Metadata } from "next";
import { Space_Grotesk, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { Cursor } from "@/components/cursor";
import { Grain } from "@/components/grain";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ikhmalhanif.xyz"),
  title: {
    default: "Ikhmal — Developer & Designer",
    template: "%s | Your Name",
  },
  description:
    "Full stack developer building modern, user-centered web experiences.",
  keywords: [
    "Developer",
    "Portfolio",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
  ],
  authors: [{ name: "Ikhmal Hanif", url: "https://ikhmalhanif.xyz" }],
  creator: "Ikhmal Hanif",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ikhmalhanif.xyz",
    images: [
      {
        url: "/me-cartoon-pic.png",
        width: 1024,
        height: 1024,
        alt: "Ikhmal Hanif",
      },
    ],
    title: "Ikhmal — Developer & Designer",
    description:
      "Full stack developer building modern, user-centered web experiences.",
    siteName: "Your Name Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name — Developer & Designer",
    description:
      "Full stack developer building modern, user-centered web experiences.",
    creator: "@yourtwitterhandle",
    images: ["/me-cartoon-pic.png"],
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
        className={`${spaceGrotesk.variable} ${interTight.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        {/* Direct children of <body>: mix-blend-difference only blends within
            its own stacking context, so a transformed wrapper would kill it. */}
        <Grain />
        <Cursor />
      </body>
    </html>
  );
}
