"use client";

import { motion, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ScrollRevealStagger } from "./ScrollReveal";
import { useRef } from "react";

type IndustrySpotlight = {
  industry: string;
  summary: string;
  bullets: string[];
  href: string;
};

function IndustryCard({ spotlight }: { spotlight: IndustrySpotlight }) {
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
      className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950 sm:p-6"
      style={{ scale }}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-600">{spotlight.industry}</p>
      <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">{spotlight.summary}</h3>
      <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
        {spotlight.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <Link
        href={spotlight.href}
        className="mt-5 inline-flex items-center text-sm font-semibold text-purple-600 transition hover:text-purple-700 dark:text-purple-400"
      >
        View solution brief
        <ArrowUpRight className="ml-1 h-4 w-4" />
      </Link>
    </motion.div>
  );
}

export default function IndustrySpotlightCards({ spotlights }: { spotlights: IndustrySpotlight[] }) {
  return (
    <ScrollRevealStagger direction="up" staggerDelay={0.12} className="mt-10 grid gap-5 sm:gap-6 lg:grid-cols-3">
      {spotlights.map((spotlight) => (
        <IndustryCard key={spotlight.industry} spotlight={spotlight} />
      ))}
    </ScrollRevealStagger>
  );
}

