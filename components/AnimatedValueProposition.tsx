"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ContactSalesModal from "./ContactSalesModal";

export default function AnimatedValueProposition() {
  return (
    <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
      <motion.div
        className="space-y-4"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h2 className="text-2xl font-semibold text-zinc-900 text-balance dark:text-zinc-100 sm:text-3xl">
          Optimise spend, safeguard compliance, and orchestrate autonomous operations from one platform.
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
          Galactis.ai unifies IT Asset Management, Network Monitoring, and AI Agents so technology leaders can see, control, and automate their environments with confidence.
        </p>
        <ul className="space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <li>• Reduce IT waste by 30% with continuous Technology Value Optimization.</li>
          <li>• Automate 90% of routine tasks across service desks, networks, and workflows.</li>
          <li>• Achieve 99.9% uptime with predictive network intelligence and autonomous remediation.</li>
        </ul>
      </motion.div>
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-700 via-indigo-700 to-slate-900 p-6 text-white shadow-xl dark:border-purple-900"
        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.5)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="absolute -right-6 top-6 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-4 h-24 w-24 rounded-full bg-emerald-400/40 blur-3xl" />
        <div className="relative space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Executive pilot</p>
          <h3 className="text-2xl font-semibold text-white">Ready to accelerate transformation?</h3>
          <p className="text-sm text-white/80">
            Share your objectives and we'll orchestrate an 8-week guided pilot aligned to your KPIs, compliance needs, and integration roadmap.
          </p>
          <ul className="space-y-2 text-sm text-white/80">
            {[
              "Priority response within 24 hours",
              "Blueprint + commercial model in under 5 business days",
              "Joint success pod spanning product, delivery, and exec sponsors",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-white/70">
            <span className="rounded-full border border-white/30 px-3 py-1">SOC 2 · ISO 27001 · HIPAA</span>
            <span className="rounded-full border border-white/30 px-3 py-1">ITAM · Network · AI Agents</span>
            <span className="rounded-full border border-white/30 px-3 py-1">Global deployment</span>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ContactSalesModal />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/resources/case-studies"
                className="group inline-flex items-center rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20"
              >
                Explore proof points
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

