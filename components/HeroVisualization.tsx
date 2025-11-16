"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "IT Asset Graph",
    subtitle: "100% visibility",
    accent: "from-purple-500 to-fuchsia-500",
    delay: 0,
    metricLabel: "Assets reconciled",
    metricValue: "1.2M",
  },
  {
    title: "Network Topology",
    subtitle: "Predictive AI",
    accent: "from-cyan-400 to-emerald-400",
    delay: 0.2,
    metricLabel: "Uptime",
    metricValue: "99.99%",
  },
  {
    title: "AI Agents Studio",
    subtitle: "Multimodal",
    accent: "from-orange-400 to-pink-400",
    delay: 0.4,
    metricLabel: "Tasks automated",
    metricValue: "18K",
  },
];

export default function HeroVisualization() {
  return (
    <div className="relative h-full rounded-xl border border-white/15 bg-white/5 p-3 shadow-2xl backdrop-blur-md sm:p-4">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      <div className="relative grid h-full gap-3">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            className="relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-3 text-white shadow-lg backdrop-blur"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: card.delay, duration: 0.6 }}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-40`}
              style={{ filter: "blur(30px)" }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
            />
            <div className="relative">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-[10px]">{card.title}</p>
              <h3 className="mt-1 text-sm font-semibold sm:mt-1.5 sm:text-base">{card.subtitle}</h3>
              <div className="mt-3">
                {index === 0 && <SignalWave />}
                {index === 1 && <TopologyLine />}
                {index === 2 && <AgentOrbits />}
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] text-white/80 sm:mt-4 sm:text-xs">
                <span>{card.metricLabel}</span>
                <span className="text-base font-semibold text-white sm:text-lg">{card.metricValue}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="absolute -right-10 bottom-12 hidden h-32 w-32 rounded-full bg-purple-500/40 blur-3xl lg:block"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -left-8 top-10 hidden h-28 w-28 rounded-full bg-cyan-500/40 blur-3xl lg:block"
        animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </div>
  );
}

function SignalWave() {
  return (
    <svg viewBox="0 0 220 80" className="h-12 w-full sm:h-14">
      <motion.path
        d="M 5 60 Q 40 20, 80 40 T 160 35 T 215 45"
        fill="transparent"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      />
    </svg>
  );
}

function TopologyLine() {
  const nodes = [20, 80, 140, 200];
  return (
    <svg viewBox="0 0 220 80" className="h-12 w-full sm:h-14">
      <motion.line
        x1="20"
        y1="40"
        x2="200"
        y2="40"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
      />
      {nodes.map((cx, idx) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy="40"
          r="5"
          fill="white"
          initial={{ scale: 0.8, opacity: 0.4 }}
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, delay: idx * 0.2, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

function AgentOrbits() {
  return (
    <div className="relative h-14 w-full sm:h-16">
      <motion.div
        className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {[35, 55].map((radius, idx) => (
        <motion.div
          key={radius}
          className="absolute left-1/2 top-1/2"
          style={{
            width: radius,
            height: radius,
            marginLeft: -radius / 2,
            marginTop: -radius / 2,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12 - idx * 3, repeat: Infinity, ease: "linear" }}
        >
          <motion.span
            className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      ))}
    </div>
  );
}

