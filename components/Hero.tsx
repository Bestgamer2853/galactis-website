"use client";
import { motion, useSpring, useTransform, useScroll } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import React from "react";
import HeroVisualization from "./HeroVisualization";

// Split headline into words for staggered animation
const headlineWords = "Put AI to Work for Your Enterprise Technology Stack".split(" ");
const gradientWords = ["Enterprise", "Technology", "Stack"];
const heroMetrics = [
  {
    label: "IT Asset Management",
    stat: "₹8 Lakhs waste removed",
    detail: "Based on the ITAM blueprint featured on galactis.ai/products/itam.",
    href: "/products/itam",
  },
  {
    label: "Network Intelligence",
    stat: "99.95% uptime",
    detail: "Data from the Northwind Telecom study in the Network Monitoring page.",
    href: "/products/network-monitoring",
  },
  {
    label: "AI Agents",
    stat: "120K calls automated",
    detail: "Sourced from the AI Agents Platform metrics and case studies.",
    href: "/products/ai-agents",
  },
];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };
    handleChange(mediaQuery);
    const listener = (event: MediaQueryListEvent) => handleChange(event);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    } else {
      mediaQuery.addListener(listener);
      return () => mediaQuery.removeListener(listener);
    }
  }, []);
  
  // Mouse parallax effect for blobs (desktop only)
  useEffect(() => {
    if (isMobile) {
      setMousePosition({ x: 0, y: 0 });
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40; // Max 20px each direction
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  return (
        <section 
          ref={sectionRef}
          className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-teal-900 dark:from-black dark:via-purple-950 dark:to-black snap-start"
        >
      {/* Enhanced background blobs with parallax */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          style={{
            x: mousePosition.x * 0.3,
            y: mousePosition.y * 0.3,
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[20%] h-96 w-96 rounded-full bg-purple-500 blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
          }}
          style={{
            x: -mousePosition.x * 0.2,
            y: -mousePosition.y * 0.2,
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[10%] top-[40%] h-96 w-96 rounded-full bg-teal-500 blur-3xl"
        />
        {/* Third blob with teal-purple gradient */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          style={{
            x: mousePosition.x * 0.15,
            y: mousePosition.y * 0.15,
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[50%] top-[60%] h-96 w-96 rounded-full bg-gradient-to-br from-purple-500 to-teal-500 blur-3xl opacity-50"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
              {headlineWords.map((word, index) => {
                const cleanWord = word.replace(/[^a-zA-Z]/g, "");
                const isGradientWord = gradientWords.includes(cleanWord);
                return (
                  <React.Fragment key={`${word}-${index}`}>
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="inline-block"
                    >
                      {isGradientWord ? (
                        <span className="bg-gradient-to-r from-purple-400 via-teal-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
                          {word}
                        </span>
                      ) : (
                        <span>{word}</span>
                      )}
                    </motion.span>
                    {index < headlineWords.length - 1 && " "}
                  </React.Fragment>
                );
              })}
            </h1>
                <p className="mt-4 text-base leading-relaxed text-gray-200 sm:text-lg">
              Unified ITAM, Network Intelligence & Autonomous Agents. One platform to see, control, and optimize your entire IT environment.
            </p>

            {/* Trust badges with staggered fade-in */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-300">
              {["SOC2 Type II", "ISO 27001", "GDPR Compliant"].map((badge, index) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
                  className="flex items-center gap-1.5"
                >
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  {badge}
                </motion.span>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:gap-4 lg:grid-cols-3">
              {heroMetrics.map((metric, index) => {
                const cardRef = useRef<HTMLAnchorElement>(null);
                const { scrollYProgress } = useScroll({
                  target: cardRef,
                  offset: ["start end", "end start"],
                });
                
                const scaleProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);
                const scale = useSpring(scaleProgress, { stiffness: 100, damping: 15, mass: 0.5 });

                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.2 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    className="h-full"
                  >
                    <Link
                      ref={cardRef}
                      href={metric.href}
                      className="block h-full rounded-xl border border-white/20 bg-white/10 p-3 text-left text-white transition-all duration-300 hover:border-white/40 hover:bg-white/15 sm:p-4"
                      style={{ scale }}
                    >
                      <motion.div
                        className="flex h-full flex-col"
                        whileHover={{ 
                          scale: 1.02,
                          transition: { type: "spring", stiffness: 300, damping: 20 }
                        }}
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60 sm:text-xs">{metric.label}</p>
                        <p className="mt-1.5 text-xl font-semibold text-white sm:mt-2 sm:text-2xl">{metric.stat}</p>
                        <p className="mt-1.5 flex-1 text-[11px] leading-relaxed text-white/70 sm:mt-2 sm:text-xs">{metric.detail}</p>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="relative">
            <HeroVisualization />
          </div>
        </div>
      </div>
    </section>
  );
}

