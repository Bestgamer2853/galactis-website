"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { convertUSDtoINR, formatIndianNumber } from "@/lib/currency";

const testimonials = [
  {
    quote:
      "Galactis unified every application and device across our Chennai operations, eliminating 28% redundant spend in six months. Their AI reconciliation uncovered ₹12 Lakhs in annual savings we can reinvest in innovation.",
    name: "Rajesh Kumar",
    title: "CIO, ICICI Bank · Chennai",
    metrics: [
      { label: "Cost Reduction", value: "28%" },
      { label: "Annual Savings", value: "₹12 Lakhs", useINR: true },
      { label: "Time to Value", value: "6 months" },
    ],
    icon: "🏦",
  },
  {
    quote:
      "With Galactis automating network remediation from our Chennai NOC, P1 incidents dropped 42% and MTTR is now 22 minutes. Customers across Airtel's fiber footprint in Tamil Nadu feel the difference instantly.",
    name: "Arjun Venkatesh",
    title: "Head of Network Engineering, Airtel · Chennai",
    metrics: [
      { label: "P1 Incidents", value: "-42%" },
      { label: "MTTR", value: "22 min" },
      { label: "NPS Improvement", value: "+18" },
    ],
    icon: "📡",
  },
  {
    quote:
      "Our Chennai and Bangalore contact centres run on Galactis AI Agents. 120K calls were deflected in year one, saving ₹15 Lakhs while delivering consistent, multilingual support across Tamil, Telugu, and Kannada.",
    name: "Meera Subramanian",
    title: "COO, Infosys · Chennai",
    metrics: [
      { label: "Calls Deflected", value: "120K" },
      { label: "Annual Savings", value: "₹15 Lakhs", useINR: true },
      { label: "Sites Powered", value: "4" },
    ],
    icon: "📞",
  },
];

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 dark:from-gray-900 dark:to-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="fade" delay={0.2}>
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Trusted by Industry Leaders
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="fade" delay={0.3}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: active % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: active % 2 === 0 ? 50 : -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-950 lg:p-12"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-6xl text-center"
              >
                {testimonial.icon}
              </motion.div>
              <blockquote className="mt-8 text-center text-xl font-medium leading-relaxed text-gray-800 dark:text-gray-100">
                "{testimonial.quote}"
              </blockquote>
              <div className="mt-6 text-center">
                <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {testimonial.metrics?.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </ScrollReveal>

        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActive(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`h-3 rounded-full transition-all duration-300 ${
                active === index ? "w-8 bg-purple-600" : "w-3 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

