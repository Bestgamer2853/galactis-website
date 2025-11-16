"use client";

import ScrollReveal from "./ScrollReveal";
import AnimatedNumber from "./AnimatedNumber";

type Stat = {
  label: string;
  description: string;
  numeric: number;
  prefix?: string;
  suffix?: string;
};

const stats: Stat[] = [
  {
    label: "Technology waste removed",
    description: "ITAM + FinOps programs across Fortune 500 estates",
    numeric: 12,
    prefix: "₹",
    suffix: " Cr",
  },
  {
    label: "Network availability",
    description: "Predictive observability for carriers, finance, and energy",
    numeric: 99.95,
    suffix: "% uptime",
  },
  {
    label: "Customer conversations automated",
    description: "Voice + chat agents resolving service and support journeys",
    numeric: 120,
    suffix: "K",
  },
  {
    label: "Native integrations",
    description: "Connectors for ITSM, ERP, cloud, telco, and security stacks",
    numeric: 220,
    suffix: "+",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-zinc-950 py-20 text-white dark:bg-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">Impact in production</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Operational, financial, and customer outcomes delivered by Galactis
          </h2>
          <p className="text-base text-white/70">
            Data pulled from current ITAM, NOC, and AI agent deployments across financial services, telecom, healthcare, public sector, and logistics clients.
          </p>
        </div>
        <ScrollReveal direction="fade" delay={0.15}>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} direction="up" delay={index * 0.1} distance={30}>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
                  <p className="text-4xl font-semibold text-white">
                    {stat.prefix}
                    <AnimatedNumber value={stat.numeric} duration={2} />
                    {stat.suffix}
                  </p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-white/60">{stat.label}</p>
                  <p className="mt-2 text-sm text-white/70">{stat.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

