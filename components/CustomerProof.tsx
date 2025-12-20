"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Award, Trophy, Building2, Calculator, X } from "lucide-react";
import CompanyLogo from "./CompanyLogo";

const logos = ["ICICI Bank", "Airtel", "Ashok Leyland", "TVS Motors", "Infosys", "Corpay"];

const awards = [
  { title: "Gartner Cool Vendor", year: "2024" },
  { title: "Forrester Wave Leader", year: "2025" },
  { title: "Best AI Ops Platform", year: "SaaS Awards" },
];

export default function CustomerProof() {
  const [assets, setAssets] = useState(5000);
  const [budget, setBudget] = useState(2);
  const [hours, setHours] = useState(40);
  const [showCalculator, setShowCalculator] = useState(false);

  const projectedSavings = useMemo(() => {
    const savings = budget * 0.3 * 10 + hours * 20 + assets * 0.4;
    return Math.round(savings);
  }, [assets, budget, hours]);

  return (
    <section className="bg-white py-20 dark:bg-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-600">Proof in production</p>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">Customers, accolades, & live calculators</h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Pulling from the same customer logos, award shelf, and ROI calculators we showcase on roadshows.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-zinc-200 bg-zinc-50/80 p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-600">Trusted by</p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm font-semibold text-zinc-600 sm:grid-cols-3">
                {logos.map((logo) => (
                  <motion.div
                    key={logo}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
                  >
                    <CompanyLogo company={logo} size={40} />
                    <span className="text-sm font-semibold">{logo}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-600">Awards & analyst notes</p>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                {awards.map((award) => (
                  <li key={award.title} className="flex items-start gap-3">
                    <Award className="mt-0.5 h-4 w-4 text-yellow-500" />
                    <span>
                      <strong className="text-zinc-900 dark:text-white">{award.title}</strong> · {award.year}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/resources/case-studies" className="mt-6 inline-flex items-center text-sm font-semibold text-purple-600 transition hover:text-purple-800 dark:text-purple-300">
                Read the research <Trophy className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              22 enterprise customers · 4 innovation hubs · SLA 99.9%
            </div>
            <button
              onClick={() => setShowCalculator(true)}
              className="inline-flex items-center gap-2 rounded-full border border-purple-300 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:border-purple-500 hover:text-purple-900 dark:border-purple-700 dark:text-purple-200"
            >
              Launch impact calculator
              <Calculator className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {showCalculator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-xl rounded-3xl border border-white/20 bg-gradient-to-br from-purple-900 to-slate-900 p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">ROI simulator</p>
                <h3 className="mt-2 text-2xl font-semibold">How much could you save?</h3>
              </div>
              <button onClick={() => setShowCalculator(false)} aria-label="Close calculator" className="rounded-full border border-white/30 p-2 text-white/70 transition hover:border-white hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <SliderInput label="Number of IT assets" value={assets} min={1000} max={20000} step={500} onChange={setAssets} suffix="" />
              <SliderInput label="Annual IT budget (₹ Cr)" value={budget} min={1} max={10} step={0.5} onChange={setBudget} suffix="Cr" />
              <SliderInput label="Manual hours per week" value={hours} min={10} max={120} step={5} onChange={setHours} suffix="hrs" />
            </div>

            <div className="mt-8 rounded-2xl border border-white/20 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">Projected annual savings</p>
              <p className="mt-2 text-4xl font-semibold text-emerald-300">₹{projectedSavings.toLocaleString()} Lakhs*</p>
              <p className="mt-2 text-xs text-white/70">*Blends ITAM reclaim, network MTTR impact, and AI agent efficiency. Book a session for a bespoke analysis.</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-50">
                Share these numbers with our team
              </Link>
              <Link href="/pricing" className="rounded-2xl border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white hover:text-white">
                Download pricing guide
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm text-white/80">
        <span>{label}</span>
        <span className="font-semibold">
          {value.toLocaleString()} {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-purple-400"
      />
    </div>
  );
}
