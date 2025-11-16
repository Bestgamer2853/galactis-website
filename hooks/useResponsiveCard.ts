"use client";

import { useState, useEffect, useRef } from "react";
import { useInView, useScroll, useTransform, useSpring } from "framer-motion";

interface ResponsiveCardConfig {
  basePadding?: number;
  minPadding?: number;
  maxPadding?: number;
  baseGap?: number;
  minGap?: number;
  maxGap?: number;
  enableScrollScale?: boolean;
  scrollScaleRange?: [number, number];
}

export function useResponsiveCard(config: ResponsiveCardConfig = {}) {
  const {
    basePadding = 24,
    minPadding = 16,
    maxPadding = 32,
    baseGap = 24,
    minGap = 16,
    maxGap = 32,
    enableScrollScale = true,
    scrollScaleRange = [0.98, 1.02],
  } = config;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Responsive padding calculation
  const [padding, setPadding] = useState(basePadding);
  const [gap, setGap] = useState(baseGap);

  useEffect(() => {
    const updateSizing = () => {
      const width = window.innerWidth;
      
      // Calculate responsive padding (mobile to desktop)
      let newPadding = basePadding;
      if (width < 640) {
        // Mobile
        newPadding = minPadding + (basePadding - minPadding) * (width / 640);
      } else if (width < 1024) {
        // Tablet
        newPadding = basePadding;
      } else {
        // Desktop
        newPadding = Math.min(maxPadding, basePadding + (width - 1024) / 100);
      }
      setPadding(newPadding);

      // Calculate responsive gap
      let newGap = baseGap;
      if (width < 640) {
        newGap = minGap + (baseGap - minGap) * (width / 640);
      } else if (width < 1024) {
        newGap = baseGap;
      } else {
        newGap = Math.min(maxGap, baseGap + (width - 1024) / 120);
      }
      setGap(newGap);
    };

    updateSizing();
    window.addEventListener("resize", updateSizing);
    return () => window.removeEventListener("resize", updateSizing);
  }, [basePadding, minPadding, maxPadding, baseGap, minGap, maxGap]);

  // Scroll-based scale animation with spring physics
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5, 1], scrollScaleRange);
  const scale = useSpring(scaleProgress, {
    stiffness: 100,
    damping: 15,
    mass: 0.5,
  });

  // Shadow intensity based on scroll
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.15, 0.08]);
  const shadowBlur = useTransform(scrollYProgress, [0, 0.5, 1], [12, 24, 12]);

  return {
    ref,
    isInView,
    padding: Math.round(padding),
    gap: Math.round(gap),
    scale: enableScrollScale ? scale : 1,
    shadowOpacity,
    shadowBlur,
    scrollYProgress,
  };
}

