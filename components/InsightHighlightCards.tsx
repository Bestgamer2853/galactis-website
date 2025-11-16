"use client";

import { motion, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ScrollRevealStagger } from "./ScrollReveal";
import { useRef } from "react";

type InsightHighlight = {
  type: string;
  title: string;
  snippet: string;
  href: string;
};

function InsightCard({ insight }: { insight: InsightHighlight }) {
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
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-600">{insight.type}</p>
      <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-white">{insight.title}</h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{insight.snippet}</p>
      <Link
        href={insight.href}
        className="mt-4 inline-flex items-center text-sm font-semibold text-purple-600 transition hover:text-purple-700 dark:text-purple-400"
      >
        View in resources
        <ArrowUpRight className="ml-1 h-4 w-4" />
      </Link>
    </motion.div>
  );
}

export default function InsightHighlightCards({ insights }: { insights: InsightHighlight[] }) {
  return (
    <ScrollRevealStagger direction="up" staggerDelay={0.1} className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-3">
      {insights.map((insight) => (
        <InsightCard key={insight.title} insight={insight} />
      ))}
    </ScrollRevealStagger>
  );
}

