"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type UseCase = {
  industry: string;
  headline: string;
  description: string;
  metrics: { label: string; value: string }[];
  playbooks: string[];
};

const useCases: UseCase[] = [
  {
    industry: "Financial Services",
    headline: "License optimization & resilience for tier-one banks",
    description:
      "Normalize contracts across 150+ countries, feed finance with real-time compliance, and automate true-ups with zero business disruption.",
    metrics: [
      { label: "Redundant spend removed", value: "₹8 Lakhs" },
      { label: "Audit prep time", value: "8 weeks → 7 days" },
    ],
    playbooks: ["Oracle & Microsoft reconciliations", "Regulator-ready evidence packs", "Automated remediation with ITSM hand-offs"],
  },
  {
    industry: "Telecommunications",
    headline: "Predictive network ops for global carriers",
    description:
      "Correlate NetOps, customer experience, and AI agents to deflect P1 incidents, auto-remediate, and keep NPS climbing.",
    metrics: [
      { label: "MTTR reduction", value: "3x faster" },
      { label: "P1 incidents", value: "-28%" },
    ],
    playbooks: ["Edge outage automation", "Customer comms triggered via AI agents", "Closed-loop change with ServiceNow"],
  },
  {
    industry: "Healthcare",
    headline: "AI agents orchestrate patient engagement & back office",
    description:
      "Voice, chat, and RPA agents coordinate scheduling, insurance, and clinical workflows with PHI guardrails baked in.",
    metrics: [
      { label: "Calls deflected", value: "320K" },
      { label: "Abandon rate", value: "25% → 6%" },
    ],
    playbooks: ["HIPAA-safe voice concierge", "Revenue cycle automation", "Clinical device inventory & recalls"],
  },
];

export default function UseCaseTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCase = useCases[activeIndex];

  return (
    <section className="bg-white py-20 dark:bg-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">Industry playbooks</p>
          <h2 className="mt-3 text-3xl font-bold text-zinc-900 dark:text-white">Deploy AI-led operations in weeks</h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
            Every industry pack includes reference architectures, integrations, and guardrails mapped to regulatory frameworks.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {useCases.map((useCase, index) => (
            <button
              key={useCase.industry}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                index === activeIndex
                  ? "border-purple-500 bg-purple-500 text-white shadow-lg"
                  : "border-zinc-300 text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300"
              }`}
            >
              {useCase.industry}
            </button>
          ))}
        </div>
        <div className="relative mt-10 overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-8 shadow-xl dark:border-zinc-800 dark:from-zinc-900 dark:to-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase.industry}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">
                {activeCase.industry}
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{activeCase.headline}</h3>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">{activeCase.description}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {activeCase.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-purple-200 bg-white/80 p-4 text-purple-900 shadow-sm dark:border-purple-900 dark:bg-purple-950/20 dark:text-purple-200">
                    <p className="text-3xl font-semibold">{metric.value}</p>
                    <p className="text-xs uppercase tracking-wide text-purple-600 dark:text-purple-300">{metric.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-3 text-sm text-zinc-700 dark:text-zinc-300 md:grid-cols-2">
                {activeCase.playbooks.map((playbook) => (
                  <div key={playbook} className="rounded-2xl border border-zinc-200 bg-white/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
                    {playbook}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

