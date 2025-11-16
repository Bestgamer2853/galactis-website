"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedNumberProps {
  value: string | number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedNumber({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      
      // Extract numeric value from string
      const numericValue = typeof value === "number" 
        ? value 
        : parseFloat(value.toString().replace(/[^\d.]/g, "")) || 0;

      if (numericValue === 0) {
        setDisplayValue(0);
        return;
      }

      const startTime = Date.now();
      const startValue = 0;
      const endValue = numericValue;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = startValue + (endValue - startValue) * easeOut;
        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(endValue);
        }
      };

      animate();
    }
  }, [isInView, value, duration, hasAnimated]);

  // Format the number based on original value format
  const formatNumber = (num: number): string => {
    if (typeof value === "string") {
      // Preserve original format (e.g., "50,000+", "$100M+", "99.9%")
      const original = value.toString();
      
      if (original.includes("+")) {
        return `${Math.round(num).toLocaleString()}+`;
      }
      if (original.includes("M")) {
        return `$${(num / 1000000).toFixed(0)}M+`;
      }
      if (original.includes("%")) {
        return `${num.toFixed(1)}%`;
      }
      if (original.includes(",")) {
        return Math.round(num).toLocaleString();
      }
    }
    return Math.round(num).toLocaleString();
  };

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
}

