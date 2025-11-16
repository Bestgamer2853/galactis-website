"use client";

import { motion, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ScrollRevealStagger } from "./ScrollReveal";
import { useRef } from "react";

type Product = {
  name: string;
  summary: string;
  bullets: string[];
  metrics: string[];
  href: string;
  accent: string;
};

function ProductCard({ product }: { product: Product }) {
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
      className="group rounded-3xl border border-zinc-200 p-5 shadow-lg transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950/60 sm:p-6 lg:p-7"
      style={{ scale }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
          <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${product.accent}`} />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">{product.name}</p>
          <h3 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-white">{product.summary}</h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            {product.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {product.metrics.map((metric) => (
              <span key={metric} className="rounded-full bg-emerald-50 px-3 py-1 dark:bg-emerald-900/20">
                {metric}
              </span>
            ))}
          </div>
          <motion.div whileHover={{ x: 4 }}>
            <Link
              href={product.href}
              className="mt-6 inline-flex items-center text-sm font-semibold text-purple-600 transition hover:text-purple-700 dark:text-purple-400"
            >
              Explore {product.name}
              <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
    </motion.div>
  );
}

export default function AnimatedProductCards({ products }: { products: Product[] }) {
  return (
    <ScrollRevealStagger 
      direction="up" 
      staggerDelay={0.15} 
      className="mt-10 grid gap-5 sm:gap-6 lg:grid-cols-3"
    >
      {products.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </ScrollRevealStagger>
  );
}

