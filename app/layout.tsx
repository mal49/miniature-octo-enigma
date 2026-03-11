import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
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
      <body className={`${spaceGrotesk.variable} antialiased`}>{children}</body>
    </html>
  );
}
