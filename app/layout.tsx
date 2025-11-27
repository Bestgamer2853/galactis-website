import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://galactis.ai"),
  title: {
    default: "Galactis.ai | Enterprise ITAM, Network Monitoring & AI Agents",
    template: "%s | Galactis.ai",
  },
  description:
    "Transform operations with AI-powered IT Asset Management, Network Intelligence & Autonomous Agents. Trusted by regulated enterprises worldwide.",
  keywords: [
    "Galactis",
    "IT Asset Management",
    "Network Monitoring",
    "AI Agents",
    "Enterprise Automation",
    "FinOps",
    "NOC automation",
    "B2B SaaS",
  ],
  applicationName: "Galactis.ai",
  authors: [{ name: "Galactis.ai" }],
  publisher: "Galactis.ai",
  category: "technology",
  alternates: {
    canonical: "https://galactis.ai",
    languages: {
      "en-US": "https://galactis.ai",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://galactis.ai",
    siteName: "Galactis.ai",
    title: "Galactis.ai | Enterprise ITAM, Network Monitoring & AI Agents",
    description:
      "Single operating system for IT Asset Management, Network Intelligence, and AI Agents. Built for financial services, telecom, healthcare, and public sector leaders.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Galactis.ai platform overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@galactis_ai",
    creator: "@galactis_ai",
  },
  // Icons are auto-generated from app/icon.tsx and app/apple-icon.tsx
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
