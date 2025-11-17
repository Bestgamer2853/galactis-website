"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Users, Building2, Briefcase, Code, MessageCircle, Play } from "lucide-react";
import { useState, useEffect } from "react";
import ContactSalesModal from "@/components/ContactSalesModal";

const steps = [
  { id: 1, label: "Create Account", description: "Sign up for partner portal" },
  { id: 2, label: "Submit Application", description: "Complete partner profile" },
  { id: 3, label: "Review Process", description: "We evaluate your application" },
  { id: 4, label: "Get Started", description: "Begin your partnership journey" },
];

const partnerTypes = [
  {
    name: "Reseller",
    description: "Distribute Galactis solutions to enterprise customers with competitive margins and dedicated support.",
    icon: Building2,
    features: [
      "Revenue sharing up to 30%",
      "Dedicated partner success manager",
      "Marketing development funds",
      "Co-marketing opportunities",
    ],
    cta: "Become a Reseller",
    href: "/contact",
  },
  {
    name: "Service Provider",
    description: "Deliver managed ITAM, network monitoring, and AI agent services powered by Galactis platform.",
    icon: Users,
    features: [
      "White-label service delivery",
      "Technical enablement & certification",
      "24/7 partner support desk",
      "Joint go-to-market programs",
    ],
    cta: "Join as Service Provider",
    href: "/contact",
  },
  {
    name: "Consulting",
    description: "Integrate Galactis into your consulting practice for ITAM, network, and AI automation engagements.",
    icon: Briefcase,
    features: [
      "Implementation playbooks",
      "Certified consultant program",
      "Access to demo environments",
      "Joint customer success stories",
    ],
    cta: "Partner with Us",
    href: "/contact",
  },
  {
    name: "Build",
    description: "Embed Galactis APIs and AI agents into your products and platforms for enhanced capabilities.",
    icon: Code,
    features: [
      "Early access to APIs",
      "Co-innovation workshops",
      "Technical integration support",
      "Joint roadmap planning",
    ],
    cta: "Start Building",
    href: "/contact",
  },
];

export default function PartnersPage() {
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButtons(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="relative">
        {/* Steps Bar */}
        <section className="border-b border-zinc-200 bg-gradient-to-r from-purple-50 to-indigo-50 dark:border-zinc-800 dark:from-purple-950/20 dark:to-indigo-950/20">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-1 min-w-[140px] items-center gap-3"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-sm font-bold text-white shadow-lg">
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{step.label}</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden h-5 w-5 flex-shrink-0 text-zinc-400 md:block" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold leading-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
              Find the right{" "}
              <span className="bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
                partner path
              </span>{" "}
              for you
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              Join the Galactis partner ecosystem and unlock new revenue opportunities while delivering world-class
              enterprise automation solutions to your customers.
            </p>
          </motion.div>

          {/* Partner Type Cards */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnerTypes.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="group relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition-all duration-300 hover:border-purple-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-purple-600"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-lg">
                  <partner.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{partner.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{partner.description}</p>
                <ul className="mt-4 space-y-2">
                  {partner.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={partner.href}
                  className="mt-6 flex items-center gap-2 text-sm font-semibold text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  {partner.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Say YES Section */}
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-purple-900 via-indigo-900 to-teal-900 p-8 shadow-2xl dark:border-zinc-800 sm:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Say <span className="text-emerald-400">YES</span> to a new partner experience
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/80">
                  Experience a partnership program designed for modern enterprises. Get dedicated support, competitive
                  margins, and access to cutting-edge AI-powered solutions that your customers demand.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Trusted by</p>
                    <p className="mt-1 text-lg font-bold text-white">50+ Partners</p>
                  </div>
                  <div className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Average Revenue</p>
                    <p className="mt-1 text-lg font-bold text-white">₹25 Lakhs+</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Placeholder for partner success image */}
                <div className="aspect-video rounded-2xl bg-white/10 backdrop-blur-sm">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <Users className="mx-auto h-16 w-16 text-white/40" />
                      <p className="mt-4 text-sm text-white/60">Partner Success Stories</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Additional Benefits Section */}
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              Why partners choose Galactis
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
              We've built a partner program that puts your success first, with the tools and support you need to grow.
            </p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Fast Onboarding",
                description: "Get up and running in under 4 weeks with comprehensive enablement and certification.",
              },
              {
                title: "Competitive Margins",
                description: "Industry-leading revenue sharing and pricing that helps you win more deals.",
              },
              {
                title: "Dedicated Support",
                description: "24/7 partner desk and dedicated success managers based in Chennai, India.",
              },
              {
                title: "Marketing Support",
                description: "Co-marketing opportunities, MDF, and joint go-to-market programs.",
              },
              {
                title: "Technical Excellence",
                description: "Access to demo environments, APIs, and technical resources for seamless integration.",
              },
              {
                title: "Joint Innovation",
                description: "Co-innovation workshops and early access to new features and capabilities.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{benefit.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Buttons */}
      {showFloatingButtons && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Trigger contact modal - will be handled by ContactSalesModal component
              const button = document.querySelector('[data-contact-trigger]') as HTMLButtonElement;
              button?.click();
            }}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/70"
          >
            <MessageCircle className="h-5 w-5" />
            Contact Sales
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full border-2 border-purple-600 bg-white px-6 py-3 text-sm font-semibold text-purple-600 shadow-lg transition-all hover:bg-purple-50 dark:border-purple-400 dark:bg-zinc-950 dark:text-purple-400 dark:hover:bg-zinc-900"
          >
            <Play className="h-5 w-5" />
            Watch Demo
          </motion.button>
        </motion.div>
      )}

      {/* Hidden trigger for ContactSalesModal */}
      <div className="hidden">
        <ContactSalesModal />
      </div>
      <Footer />
    </div>
  );
}
