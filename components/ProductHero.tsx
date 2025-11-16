"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Stat = {
  label: string;
  value: string;
};

type CTA = {
  label: string;
  href: string;
};

type ProductHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  bullets: string[];
  stats: Stat[];
  primaryCta: CTA;
  secondaryCta?: CTA;
};

export default function ProductHero({
  eyebrow,
  title,
  subtitle,
  bullets,
  stats,
  primaryCta,
  secondaryCta,
}: ProductHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 px-6 py-12 text-white shadow-2xl dark:border-zinc-800">
      <div className="relative z-10 grid gap-10 lg:grid-cols-2">
        <div>
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 text-4xl font-semibold leading-tight lg:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-white/80">{subtitle}</p>
          <ul className="mt-6 space-y-3 text-sm text-white/80">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={primaryCta.href}
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-purple-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
        <div className="grid gap-4 rounded-2xl bg-white/10 p-6 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">OUTCOMES</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-xl border border-white/20 p-4"
              >
                <p className="text-3xl font-semibold">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -left-10 top-10 h-60 w-60 rounded-full bg-emerald-500 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-500 blur-3xl" />
      </div>
    </section>
  );
}

