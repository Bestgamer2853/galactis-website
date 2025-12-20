"use client";

import CompanyLogo from "./CompanyLogo";
import { motion } from "framer-motion";

const partners = [
  { name: "ICICI Bank", metric: "ITAM & compliance automation" },
  { name: "HDFC Bank", metric: "Network resilience & monitoring" },
  { name: "Infosys", metric: "AI agent orchestration" },
  { name: "TCS", metric: "Enterprise IT asset governance" },
  { name: "Corpay", metric: "Financial operations & payments" },
  { name: "TVS Motors", metric: "Manufacturing ITAM & automation" },
  { name: "Airtel", metric: "Predictive network assurance" },
  { name: "Ashok Leyland", metric: "OT/IT convergence platform" },
];

export default function CustomersMarquee() {
  return (
    <section className="bg-white py-12 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-100 bg-zinc-50/60 p-8 dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="flex flex-col gap-2 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600">Proof in production</p>
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                Trusted by digital, network, and operations leaders worldwide
              </h3>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Regulated industries rely on Galactis for ITAM, NOC, and AI agent modernization.
            </p>
          </div>
          <div className="relative mt-8 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-zinc-50/90 dark:from-zinc-900/90" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-zinc-50/90 dark:from-zinc-900/90" />
            <div className="flex gap-6 py-4">
              <motion.div
                className="flex min-w-full shrink-0 gap-6"
                animate={{
                  x: [0, -100 + "%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                  },
                }}
              >
                {partners.map((partner, index) => (
                  <motion.div
                    key={`${partner.name}-${index}`}
                    className="group relative flex min-w-[260px] items-center gap-4 rounded-2xl border border-zinc-200/60 bg-white px-5 py-4 shadow-md dark:border-zinc-700/60 dark:bg-zinc-800/90"
                    style={{ transformStyle: "preserve-3d" }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03, duration: 0.4 }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      rotateX: 3,
                      z: 50,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                  >
                    <CompanyLogo company={partner.name} size={56} />
                    <div className="flex-1">
                      <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                        {partner.name}
                      </p>
                      <p className="mt-1 text-xs leading-tight text-zinc-600 dark:text-zinc-400">
                        {partner.metric}
                      </p>
                    </div>
                    {/* Animated gradient overlay on hover */}
                    <motion.div 
                      className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-transparent to-indigo-500/0"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.15 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Glow effect */}
                    <motion.div
                      className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-teal-500 opacity-0 blur-xl"
                      whileHover={{ opacity: 0.3 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                className="flex min-w-full shrink-0 gap-6"
                animate={{
                  x: [0, -100 + "%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                  },
                }}
              >
                {partners.map((partner, index) => (
                  <motion.div
                    key={`${partner.name}-duplicate-${index}`}
                    className="group relative flex min-w-[260px] items-center gap-4 rounded-2xl border border-zinc-200/60 bg-white px-5 py-4 shadow-md dark:border-zinc-700/60 dark:bg-zinc-800/90"
                    style={{ transformStyle: "preserve-3d" }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03, duration: 0.4 }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      rotateX: 3,
                      z: 50,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                  >
                    <CompanyLogo company={partner.name} size={56} />
                    <div className="flex-1">
                      <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                        {partner.name}
                      </p>
                      <p className="mt-1 text-xs leading-tight text-zinc-600 dark:text-zinc-400">
                        {partner.metric}
                      </p>
                    </div>
                    {/* Animated gradient overlay on hover */}
                    <motion.div 
                      className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-transparent to-indigo-500/0"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.15 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Glow effect */}
                    <motion.div
                      className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-teal-500 opacity-0 blur-xl"
                      whileHover={{ opacity: 0.3 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
