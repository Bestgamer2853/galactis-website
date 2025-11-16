# Galactis.ai Website - Complete Codebase Overview

## PROJECT OVERVIEW

This is a Next.js 16 website for Galactis.ai, an enterprise platform offering:
- IT Asset Management (ITAM)
- Network Monitoring
- AI Agents Platform

**Tech Stack:**
- Next.js 16.0.1 (App Router)
- React 19.2.0
- TypeScript 5
- Tailwind CSS 4
- Radix UI components
- Framer Motion for animations
- React Hook Form + Zod for form validation
- Google Analytics 4

---

## PROJECT STRUCTURE

```
galactis-website/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx             # Root layout (fonts, metadata, global setup)
│   ├── page.tsx               # Homepage
│   ├── globals.css            # Global styles, Tailwind config, CSS variables
│   ├── api/                   # API routes
│   │   └── contact/route.ts   # Contact form API endpoint (stub - needs HubSpot)
│   ├── products/              # Product pages (ITAM, Network Monitoring, AI Agents)
│   ├── solutions/             # Industry-specific pages (Finance, Healthcare, etc.)
│   ├── company/               # About, Careers, Leadership
│   ├── developers/            # Developer docs, API reference, SDKs
│   ├── resources/             # Blog, Case Studies, Whitepapers
│   ├── pricing/               # Pricing page
│   └── contact/               # Contact page
├── components/                # React components (reusable)
│   ├── Navbar.tsx            # Main navigation
│   ├── Footer.tsx            # Site footer
│   ├── Hero.tsx              # Hero section with animations
│   ├── DarkModeToggle.tsx    # Dark/light mode switcher
│   ├── ContactSalesModal.tsx # Contact form modal
│   ├── HomepageROICalculator.tsx # ROI calculator
│   └── [other components]      # Stats, Testimonials, Features, etc.
├── lib/                       # Utility functions
│   ├── analytics.ts          # Google Analytics wrapper
│   └── hubspot.ts            # HubSpot integration (stub)
└── public/                    # Static assets
```

---

## KEY FILES WITH CODE AND COMMENTS

### 1. Root Layout (app/layout.tsx)

```typescript
// Root layout component - wraps all pages
// Handles fonts, global metadata, SEO setup

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Font optimization - loads Inter for body text
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap", // Prevents layout shift
});

// Font optimization - loads JetBrains Mono for code
const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Global metadata for SEO, social sharing
export const metadata: Metadata = {
  metadataBase: new URL("https://galactis.ai"),
  title: "Galactis.ai | Enterprise ITAM, Network Monitoring & AI Agents",
  description: "Transform operations with AI-powered IT Asset Management...",
  openGraph: {
    title: "Galactis.ai",
    description: "AI-powered ITAM, Network Intelligence & Autonomous Agents...",
    url: "https://galactis.ai",
    images: ["/og-image.png"], // TODO: Add actual OG image
  },
  twitter: {
    card: "summary_large_image",
    site: "@galactis_ai",
  },
};

// Root layout component - applies fonts and renders children
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Applies font variables and anti-aliasing */}
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

**Current Status:** ✅ Working - handles fonts and metadata well
**Improvements Needed:** 
- Add actual OG image
- Consider adding structured data here
- Could add theme provider for better dark mode management

---

### 2. Homepage (app/page.tsx)

```typescript
// Homepage component - main landing page
// Composes multiple sections into a single page

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import GA from "@/components/GA"; // Google Analytics initialization
import JsonLd from "@/components/JsonLd"; // Structured data for SEO
import CustomersMarquee from "@/components/CustomersMarquee";
import StatsSection from "@/components/StatsSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ContactSalesModal from "@/components/ContactSalesModal";
import WhyGalactis from "@/components/WhyGalactis";
import HomepageROICalculator from "@/components/HomepageROICalculator";
import CaseStudyCards from "@/components/CaseStudyCards";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans dark:bg-black">
      {/* Google Analytics - initializes GA4 */}
      <GA />
      
      {/* JSON-LD structured data for SEO */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Galactis.ai",
          url: "https://galactis.ai",
          logo: "https://galactis.ai/logo.png", // TODO: Add actual logo
          description: "Enterprise ITAM, Network Monitoring & AI Agents Platform",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-XXX-XXX-XXXX", // TODO: Add real phone number
            contactType: "sales",
            areaServed: "Worldwide",
          },
          sameAs: [
            "https://linkedin.com/company/galactis-ai",
            "https://twitter.com/galactis_ai",
          ],
        }}
      />
      
      {/* Main navigation bar - sticky at top */}
      <Navbar />
      
      <main>
        {/* Hero section - main value proposition */}
        <Hero />
        
        {/* Why choose Galactis - three key differentiators */}
        <WhyGalactis />
        
        {/* Scrolling customer logos */}
        <CustomersMarquee />
        
        {/* Value proposition section */}
        <section className="bg-white py-16 dark:bg-black">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Optimise spend, safeguard compliance, and orchestrate autonomous operations from one platform.
                </h2>
                {/* Key benefits list */}
                <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li>• Reduce IT waste by 30% with continuous Technology Value Optimization.</li>
                  <li>• Automate 90% of routine tasks across service desks, networks, and workflows.</li>
                  <li>• Achieve 99.9% uptime with predictive network intelligence and autonomous remediation.</li>
                </ul>
              </div>
              {/* Contact CTA section */}
              <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
                <h3 className="text-lg font-semibold">Ready to accelerate transformation?</h3>
                <ContactSalesModal />
              </div>
            </div>
          </div>
        </section>
        
        {/* Interactive ROI calculator */}
        <HomepageROICalculator />
        
        {/* Statistics display */}
        <StatsSection />
        
        {/* Feature highlights - 4 cards */}
        <FeatureHighlights />
        
        {/* Customer testimonials carousel */}
        <TestimonialCarousel />
        
        {/* Industry case studies */}
        <CaseStudyCards />
      </main>
      
      {/* Site footer */}
      <Footer />
    </div>
  );
}
```

**Current Status:** ✅ Working - well-structured homepage
**Improvements Needed:**
- Phone number placeholder needs real value
- Logo URL needs actual image
- Could add more sections (product previews, integration logos)
- Performance: Consider lazy loading sections below fold

---

### 3. Navigation Bar (components/Navbar.tsx)

```typescript
// Main navigation bar component
// Sticky header with logo, nav links, dark mode toggle, CTAs

import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    {/* Sticky header with backdrop blur effect */}
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800/60 dark:bg-black/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo - links to homepage */}
        <Link href="/" className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
          {/* Gradient logo square - TODO: Replace with actual logo image */}
          <span className="h-6 w-6 rounded bg-gradient-to-br from-purple-500 to-emerald-500" />
          <span className="font-semibold">Galactis.ai</span>
        </Link>
        
        {/* Main navigation links - hidden on mobile */}
        <nav className="hidden items-center gap-6 text-sm text-zinc-700 md:flex dark:text-zinc-300">
          <Link href="/products/itam">Products</Link>
          <Link href="/solutions/financial-services">Solutions</Link>
          <Link href="/developers">Developers</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/company/about">Company</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
        
        {/* Right side: Dark mode toggle, Login, Contact Sales */}
        <div className="hidden items-center gap-3 md:flex">
          <DarkModeToggle />
          {/* TODO: Login should link to actual login page */}
          <Link href="/contact" className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700">Login</Link>
          <Link href="/contact" className="rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700">Contact Sales</Link>
        </div>
      </div>
    </header>
  );
}
```

**Current Status:** ✅ Working - functional navigation
**Improvements Needed:**
- Add mobile menu (hamburger menu for small screens)
- Login link points to contact - needs actual login route
- Logo is placeholder gradient - needs real logo image
- Could add active state highlighting for current page
- Missing accessibility: skip to content link

---

### 4. Hero Section (components/Hero.tsx)

```typescript
// Hero section - main value proposition with animated background
// Client component because it uses Framer Motion animations

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-teal-900 dark:from-black dark:via-purple-950 dark:to-black min-h-[90vh] flex items-center">
      {/* Animated background blur circles */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute left-[10%] top-[20%] h-96 w-96 rounded-full bg-purple-500 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute right-[10%] top-[40%] h-96 w-96 rounded-full bg-teal-500 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left column: Headline and CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white lg:text-6xl">
              Put AI to Work for Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                Enterprise Technology Stack
              </span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-gray-200">
              Unified ITAM, Network Intelligence & Autonomous Agents. One platform to see, control, and optimize your entire IT environment.
            </p>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-300">
              {["SOC2 Type II", "ISO 27001", "GDPR Compliant"].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  {badge}
                </span>
              ))}
            </div>

            {/* Call-to-action buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group rounded-lg bg-white px-8 py-4 text-center text-base font-semibold text-purple-900 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
                onClick={() => trackEvent("hero_contact_sales_cta")}
              >
                Contact Sales
              </Link>
              <Link
                href="/resources/webinars"
                className="rounded-lg border-2 border-white/80 px-8 py-4 text-center text-base font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10"
                onClick={() => trackEvent("hero_demo_requested")}
              >
                Watch Platform Demo
              </Link>
            </div>

            {/* Customer logos section */}
            <div className="mt-10">
              <p className="text-sm uppercase tracking-wide text-gray-400">Trusted by Leading Enterprises</p>
              <div className="mt-4 flex flex-wrap items-center gap-8">
                {/* TODO: Replace placeholder names with actual customer logos */}
                {["Acme Financial", "Northwind Telecom", "Zenith Health", "Orbital Mfg", "Cascade Retail", "Vector Logistics", "Summit Insurance", "Helios Energy"].map((name, i) => (
                  <div
                    key={`${name}-${i}`}
                    className="h-8 w-24 rounded bg-white/10 flex items-center justify-center text-xs text-white/60 font-medium"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column: Animated mock dashboard preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-2xl backdrop-blur-sm">
              {/* Animated dashboard cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute left-4 top-4 w-48 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur"
              >
                <div className="text-xs font-semibold text-white">Asset Discovery</div>
                <div className="mt-2 h-20 w-full rounded bg-gradient-to-br from-purple-500/40 to-transparent" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-4 right-4 w-48 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur"
              >
                <div className="text-xs font-semibold text-white">Network Topology</div>
                <div className="mt-2 h-20 w-full rounded bg-gradient-to-br from-teal-500/40 to-transparent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

**Current Status:** ✅ Working - nice animations
**Improvements Needed:**
- Customer logos are placeholder text - need real logo images
- Demo link points to /resources/webinars which may not exist
- Could add video background or better dashboard preview
- Performance: Large animations could impact mobile performance

---

### 5. Contact Form Modal (components/ContactSalesModal.tsx)

```typescript
// Contact sales modal - form for lead generation
// Uses Radix UI Dialog for accessibility
// React Hook Form + Zod for validation

"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackEvent } from "@/lib/analytics";

// Zod schema for form validation
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  phone: z.string().optional(),
  message: z.string().min(5),
});

type FormValues = z.infer<typeof schema>;

export default function ContactSalesModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // React Hook Form setup with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    try {
      // POST to API route
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setSubmitted(true);
      reset();
      trackEvent("contact_sales_submitted");
    } catch {
      // TODO: Add proper error handling and user feedback
      // Currently silently fails
    }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (value) trackEvent("contact_sales_opened");
      }}
    >
      <Dialog.Trigger asChild>
        <button className="rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700">
          Contact Sales
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-200 bg-white p-6 shadow-xl focus:outline-none dark:border-zinc-800 dark:bg-zinc-950">
          <Dialog.Title className="text-lg font-semibold">Contact Sales</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Tell us about your needs. Our team will contact you within 24 hours.
          </Dialog.Description>
          
          {/* Success state */}
          {submitted ? (
            <div className="mt-6 rounded-md bg-emerald-50 p-4 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
              Thank you! Our team will contact you within 24 hours.
            </div>
          ) : (
            /* Form fields */
            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input className="mt-1 w-full rounded-md border border-zinc-300 p-2 dark:border-zinc-700 dark:bg-zinc-900" {...register("name")} />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>
              {/* ... other fields ... */}
              <div className="flex items-center justify-end gap-3">
                <Dialog.Close asChild>
                  <button className="rounded-md border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700">Cancel</button>
                </Dialog.Close>
                <button disabled={isSubmitting} className="rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-60">
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

**Current Status:** ⚠️ Working but incomplete
**Improvements Needed:**
- Error handling is missing (silent failures)
- No loading state during submission
- Success message doesn't close modal or auto-close
- Phone field doesn't have validation format
- Should integrate with HubSpot (currently stubbed)

---

### 6. API Route (app/api/contact/route.ts)

```typescript
// Contact form API endpoint
// Currently returns success without actually processing

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // TODO: Implement HubSpot integration
    // In production, forward to HubSpot via lib/hubspot.ts
    // await submitToHubSpot(body)
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    // TODO: Add proper error logging
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
```

**Current Status:** ❌ Stub - needs implementation
**Improvements Needed:**
- Implement actual HubSpot integration
- Add request validation
- Add error logging (Sentry, etc.)
- Add rate limiting to prevent spam
- Return proper error messages

---

### 7. Analytics (lib/analytics.ts)

```typescript
// Google Analytics 4 wrapper
// Handles initialization and event tracking

import ReactGA from "react-ga4";

let initialized = false;

// Initialize GA4 once
export function initAnalytics(trackingId?: string) {
  if (initialized) return;
  const id = trackingId || process.env.NEXT_PUBLIC_GA4_TRACKING_ID;
  if (!id) return; // Fails silently if no tracking ID
  ReactGA.initialize(id);
  initialized = true;
}

// Track custom events
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  try {
    ReactGA.event({ category: "User", action: eventName, ...params });
  } catch {
    // Silently fails in SSR or if GA not initialized
  }
}

// Predefined event constants
export const EVENTS = {
  HERO_CONTACT_SALES: "hero_contact_sales_cta",
  HERO_DEMO: "hero_demo_requested",
  ROI_CALC_SUBMITTED: "roi_calculator_submitted",
  CONTACT_FORM_SUBMITTED: "contact_form_submitted",
  DARK_MODE_TOGGLED: "dark_mode_toggled",
  CASE_STUDY_VIEWED: "case_study_viewed",
} as const;
```

**Current Status:** ✅ Working - good structure
**Improvements Needed:**
- Add more comprehensive event tracking
- Track page views
- Add e-commerce tracking for pricing pages
- Could add analytics consent banner for GDPR

---

### 8. Dark Mode Toggle (components/DarkModeToggle.tsx)

```typescript
// Dark mode toggle component
// Syncs with localStorage and system preference

'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false); // Prevents hydration mismatch

  useEffect(() => {
    setMounted(true);
    // Check localStorage first, then system preference
    const isDark =
      localStorage.getItem('darkMode') === 'true' ||
      (!('darkMode' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    document.documentElement.classList.toggle('dark', newMode);
    // TODO: Track dark mode toggle in analytics
  };

  // Prevent hydration mismatch - render placeholder until mounted
  if (!mounted) return <div className="h-10 w-10" />;

  return (
    <button
      onClick={toggleDarkMode}
      className="rounded-lg border border-gray-300 p-2 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      )}
    </button>
  );
}
```

**Current Status:** ✅ Working well
**Improvements Needed:**
- Add analytics tracking for dark mode toggles
- Could add transition animation for theme switch
- Listen for system preference changes

---

### 9. ROI Calculator (components/HomepageROICalculator.tsx)

```typescript
// Interactive ROI calculator component
// Calculates potential savings based on user inputs

'use client';
import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function HomepageROICalculator() {
  const [assets, setAssets] = useState(5000);
  const [budget, setBudget] = useState(2000000);
  const [hours, setHours] = useState(40);

  // Calculate savings (simplified formula)
  const savings = Math.round(budget * 0.3 + hours * 52 * 80 * 0.9);
  const timeSaved = Math.round(hours * 52 * 0.9);
  const roi = Math.round((savings / (assets * 50)) * 100);

  const handleGetReport = () => {
    trackEvent('roi_calculator_submitted', { assets, budget, hours, savings });
    window.location.href = '/contact?source=roi-calculator';
  };

  return (
    <section className="bg-gradient-to-br from-purple-50 to-teal-50 py-20 dark:from-gray-900 dark:to-gray-800">
      {/* Input fields and calculated results */}
      {/* ... */}
    </section>
  );
}
```

**Current Status:** ✅ Working - functional calculator
**Improvements Needed:**
- ROI formula might need refinement based on actual business metrics
- Could add more input fields (industry, company size, etc.)
- Could save calculator state in URL params for sharing
- Results could be formatted better (charts, etc.)

---

### 10. Global Styles (app/globals.css)

```css
/* Tailwind CSS 4 configuration with custom theme */
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

/* Inline theme configuration for Tailwind CSS 4 */
@theme inline {
  /* Custom color palette */
  --color-primary-500: #3b82f6; /* Blue */
  --color-secondary-500: #8b5cf6; /* Purple */
  --color-accent-500: #10b981; /* Emerald */

  /* Custom gradients */
  --gradient-primary: linear-gradient(135deg, #9333ea 0%, #4f46e5 100%);
  --gradient-hero: linear-gradient(135deg, #581c87 0%, #312e81 50%, #134e4a 100%);

  /* Custom shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  /* Font variables */
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

/* Utility classes */
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

**Current Status:** ✅ Working - good custom styling
**Improvements Needed:**
- Could add more utility classes
- Dark mode colors could be more refined
- Consider adding CSS variables for spacing scale

---

## CURRENT ISSUES & TODOS

### Critical Issues
1. ❌ **HubSpot Integration**: API route is stub, needs real implementation
2. ❌ **Error Handling**: Forms fail silently, no user feedback
3. ❌ **Placeholder Content**: Customer logos, phone numbers, OG images are placeholders

### Important Improvements
4. ⚠️ **Mobile Menu**: Navbar missing mobile hamburger menu
5. ⚠️ **Login Route**: Login button points to contact page
6. ⚠️ **Accessibility**: Missing skip links, ARIA labels could be improved
7. ⚠️ **Performance**: No image optimization, large animations on mobile
8. ⚠️ **Testing**: No test files present

### Nice-to-Have Enhancements
9. 💡 **Analytics**: More comprehensive event tracking
10. 💡 **SEO**: Expand sitemap, add more structured data
11. 💡 **Loading States**: Better loading indicators
12. 💡 **Error Boundaries**: React error boundaries for better error handling

---

## ARCHITECTURE PATTERNS

### Component Patterns
- **Server Components by Default**: Most pages are server components
- **Client Components When Needed**: Only for interactivity, hooks, browser APIs
- **Composition**: Large pages composed of smaller components
- **Reusable Components**: IndustryPage, Breadcrumbs for consistency

### State Management
- **Local State**: useState() in client components
- **Form State**: React Hook Form for all forms
- **No Global State**: No Redux/Zustand (could add if needed)
- **Theme State**: localStorage + DOM class manipulation

### Styling Approach
- **Utility-First**: Tailwind CSS classes
- **Dark Mode**: class-based (dark: prefix)
- **Responsive**: Mobile-first (sm:, md:, lg:)
- **Custom Classes**: Complex patterns in globals.css

---

## DEPENDENCIES

```json
{
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",      // Form validation
    "@radix-ui/react-dialog": "^1.1.15",  // Accessible modals
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "framer-motion": "^12.23.24",         // Animations
    "lucide-react": "^0.553.0",           // Icons
    "next": "16.0.1",                      // Framework
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "react-ga4": "^2.1.0",                // Analytics
    "react-hook-form": "^7.66.0",         // Forms
    "recharts": "^3.3.0",                 // Charts (not heavily used)
    "redoc": "^3.0.0-rc.0",               // API docs (not used yet)
    "zod": "^4.1.12"                      // Validation
  }
}
```

---

## ENVIRONMENT VARIABLES NEEDED

```bash
# Google Analytics
NEXT_PUBLIC_GA4_TRACKING_ID=G-XXXXXXXXXX

# HubSpot (not implemented yet)
HUBSPOT_PORTAL_ID=xxxxx
HUBSPOT_FORM_ID=xxxxx
HUBSPOT_API_KEY=xxxxx
```

---

## NEXT STEPS FOR ANALYSIS

When analyzing this codebase, consider:

1. **Code Quality**: TypeScript types, error handling, code organization
2. **Performance**: Image optimization, code splitting, bundle size
3. **Accessibility**: ARIA labels, keyboard navigation, screen readers
4. **SEO**: Meta tags, structured data, sitemap completeness
5. **User Experience**: Loading states, error messages, mobile responsiveness
6. **Maintainability**: Component reusability, documentation, testing
7. **Security**: API route validation, XSS prevention, CSP headers
8. **Scalability**: Component patterns, state management, code structure

---

## SUMMARY

This is a well-structured Next.js website with:
- ✅ Modern tech stack (Next.js 16, React 19, TypeScript)
- ✅ Good component organization
- ✅ Nice animations and UI
- ⚠️ Missing critical integrations (HubSpot)
- ⚠️ Needs better error handling
- ⚠️ Placeholder content needs replacement
- 💡 Room for performance and accessibility improvements

**Ready for code review and improvement suggestions!**

