"use client";

import { motion } from "framer-motion";

const layers = [
  {
    title: "Sense & Discover",
    description: "Continuous ingestion across ITAM feeds, network telemetry, cloud, and business systems builds a living asset graph.",
    items: ["Agentless discovery", "Contracts + usage telemetry", "Network & infra signals"],
  },
  {
    title: "Decide & Predict",
    description: "Graph AI + domain models correlate anomalies, risk, and spend to recommend the next best action.",
    items: ["License intelligence", "AI root-cause analysis", "Impact forecasting"],
  },
  {
    title: "Act & Automate",
    description: "Playbooks orchestrate ITSM, RPA, APIs, and AI Agents for closed-loop remediation and optimization.",
    items: ["Autonomous runbooks", "Human-in-the-loop guardrails", "Value realization dashboards"],
  },
];

export default function PlatformBlueprint() {
  return (
    <section className="bg-gradient-to-b from-zinc-50 to-white py-20 dark:from-zinc-900 dark:to-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">Platform Blueprint</p>
          <h2 className="mt-3 text-3xl font-bold text-zinc-900 dark:text-white">One brain across assets, networks, and AI agents</h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
            Galactis unifies visibility, intelligence, and automation layers so operations leaders can shape outcomes from a single canvas.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-lg backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-500">Layer {index + 1}</div>
              <h3 className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-white">{layer.title}</h3>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{layer.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                {layer.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

