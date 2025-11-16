"use client";

import { Layers, Brain, ShieldCheck } from "lucide-react";
import { motion, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { ScrollRevealStagger } from "./ScrollReveal";

const reasons = [
  {
    icon: Layers,
    title: "Single operating system for ITAM, NOC, and AI agents",
    description:
      "Inventory, contracts, telemetry, and agent automation share the same data fabric, so CIO, COO, and CTO teams finally work from one plan of record.",
    proof: ["₹8 Lakhs average waste eliminated", "220+ systems bi-directionally synced"],
  },
  {
    icon: Brain,
    title: "AI-native automation with human-grade guardrails",
    description:
      "Galactis pairs graph AI, LLM copilots, and deterministic runbooks. Impact scoring, human approvals, and rollback capture learning into every workflow.",
    proof: ["42% fewer P1 incidents", "120K calls handled autonomously"],
  },
  {
    icon: ShieldCheck,
    title: "Compliance-first architecture",
    description:
      "SOC 2 Type II, ISO 27001, HIPAA, PCI-DSS, and regional privacy frameworks are enforced at the platform level with immutable audit trails and data residency controls.",
    proof: ["0 PHI findings across healthcare deployments", "Regulator-ready evidence packs in 7 days"],
  },
];

function WhyCard({ reason }: { reason: typeof reasons[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);
  const scale = useSpring(scaleProgress, { stiffness: 100, damping: 15, mass: 0.5 });

  return (
    <motion.div
      ref={cardRef}
      className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-950 sm:p-7 lg:p-8"
      style={{ scale }}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/15 to-emerald-500/15 text-purple-600 dark:text-purple-300">
                <reason.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{reason.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{reason.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-800 dark:text-gray-200">
                {reason.proof.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
      </ul>
    </motion.div>
  );
}

export default function WhyGalactis() {
  return (
    <section className="bg-gradient-to-b from-gray-50 via-white to-white py-12 dark:from-gray-900 dark:via-gray-900 dark:to-black sm:py-16 lg:py-20 snap-start min-h-screen flex items-center">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-600">Why Galactis</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
            Platform decisions driven by real enterprise requirements
          </h2>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
            Everything showcased below pulls directly from our ITAM blueprints, network operations briefs, and AI agent governance guides already running in production.
          </p>
        </div>
        <ScrollRevealStagger direction="up" staggerDelay={0.12} className="mt-12 grid gap-6 sm:gap-7 md:grid-cols-3 lg:gap-8">
          {reasons.map((reason) => (
            <WhyCard key={reason.title} reason={reason} />
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}


