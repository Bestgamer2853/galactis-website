"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollReveal, { ScrollRevealStagger } from "@/components/ScrollReveal";
import AnimatedNumber from "@/components/AnimatedNumber";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Users, TrendingUp, Shield, Zap, Globe, Award } from "lucide-react";

const values = [
  {
    title: "Build with operators",
    description: "Every squad pairs product engineers with former ITAM, NetOps, or AI service owners to keep roadmaps anchored in reality.",
    icon: Users,
    color: "from-purple-500 to-indigo-600",
  },
  {
    title: "Design for trust",
    description: "Compliance, observability, and human-in-the-loop controls ship with v1. Every feature is auditable and explainable.",
    icon: Shield,
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "Automate responsibly",
    description: "AI Agents follow guardrails, data residency, and regulatory obligations before triggering automations.",
    icon: Zap,
    color: "from-emerald-500 to-teal-600",
  },
];

const leadership = [
  {
    name: "Madhujith",
    title: "Chief Executive Officer",
    bio: "Sets the Galactis vision, pairing customer obsession with disciplined operating cadences to keep R&D and go-to-market tightly aligned.",
    obsession: "Vision Carrier",
    badge: "Ship at Scale",
  },
  {
    name: "Aryan",
    title: "Chief Operating Officer",
    bio: "Leads global delivery, security, and customer success programs so every rollout hits compliance, speed, and value realization targets.",
    obsession: "Outcome Obsession",
    badge: "Ship at Scale",
  },
  {
    name: "Nikitha",
    title: "Chief Technology Officer",
    bio: "Owns product and engineering strategy, from multi-tenant architecture to the AI roadmap powering ITAM, NetOps, and agent platforms.",
    obsession: "Platform Builder",
    badge: "Ship at Scale",
  },
  {
    name: "Natasha",
    title: "Chief Marketing Officer",
    bio: "Drives market narrative, analyst relations, and demand programs that position Galactis as the platform of record for IT operations.",
    obsession: "Category Creator",
    badge: "Ship at Scale",
  },
  {
    name: "Harini",
    title: "Chief Human Resources Officer",
    bio: "Cultivates the builder culture across regions, focusing on leadership development, DEI, and hybrid collaboration rituals.",
    obsession: "Culture Catalyst",
    badge: "Ship at Scale",
  },
];

const leadershipTop = leadership.slice(0, 3);
const leadershipBottom = leadership.slice(3);

const milestones = [
  { 
    year: "Jan 2025", 
    detail: "Founded Galactis to solve enterprise IT visibility gaps. Built and launched ITAM software, gaining rapid traction with Indian enterprises.",
    icon: Sparkles,
  },
  { 
    year: "May 2025", 
    detail: "Expanded platform capabilities with Network Monitoring Software (NMS) featuring predictive analytics and automated remediation.",
    icon: TrendingUp,
  },
  { 
    year: "Aug 2025", 
    detail: "Strategic partnership with Nokia for joint R&D on next-generation Network Management Systems, bringing telco-grade reliability to enterprises.",
    icon: Globe,
  },
  { 
    year: "Oct 2025", 
    detail: "Launched AI Agents Platform with first deployment in logistics sector, delivering autonomous operations and ₹2.8 Cr+ in cost savings.",
    icon: Award,
  },
];

const stats = [
  { label: "Customers", value: "22", suffix: "" },
  { label: "Technology savings unlocked", value: "65", prefix: "₹", suffix: " Lakhs" },
  { label: "Incidents autonomously resolved", value: "3.2", suffix: "K" },
  { label: "Availability achieved", value: "99.9", suffix: "%" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Company" }, { label: "About" }]} />
        
        {/* Hero Section with Animated Background */}
        <ScrollReveal direction="fade" delay={0.1}>
          <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 px-8 py-16 shadow-2xl dark:border-zinc-800 dark:from-purple-950/20 dark:via-indigo-950/20 dark:to-blue-950/20">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-400/20 blur-3xl animate-pulse" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
            
            <div className="relative z-10">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600 dark:text-purple-400"
              >
                Our story
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-4 text-5xl font-bold leading-tight text-zinc-900 dark:text-white lg:text-6xl"
              >
                We build the platform for{" "}
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  technology leaders
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300"
              >
            Galactis.ai unifies IT Asset Management, Network Intelligence, and AI Agents so enterprises can see every asset, predict disruption, and orchestrate autonomous operations. We are a distributed team of builders, operators, and researchers obsessed with measurable outcomes.
              </motion.p>
              
              {/* Animated KPI Stats */}
              <ScrollRevealStagger staggerDelay={0.1} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/20 dark:border-zinc-700/50 dark:bg-zinc-900/80"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-indigo-500/0 transition-all duration-300 group-hover:from-purple-500/10 group-hover:to-indigo-500/10" />
                    <div className="relative">
                      <p className="text-4xl font-bold text-zinc-900 dark:text-white">
                        {stat.prefix}
                        <AnimatedNumber value={stat.value} />
                        {stat.suffix}
                      </p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        {stat.label}
                      </p>
              </div>
                  </motion.div>
                ))}
              </ScrollRevealStagger>
            </div>
        </section>
        </ScrollReveal>

        {/* Leadership Section - Enhanced 3D Glass Cards */}
        <ScrollReveal direction="up" delay={0.2}>
          <section className="mt-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600 dark:text-purple-400">Leadership</p>
                <h2 className="mt-2 text-4xl font-bold text-zinc-900 dark:text-white lg:text-5xl">
                  Operators who{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    shipped at scale
                  </span>
                </h2>
            </div>
              <Link 
                href="/careers" 
                className="group inline-flex items-center gap-2 text-sm font-semibold text-purple-600 transition-all hover:gap-4 hover:text-purple-700 dark:text-purple-300"
              >
                Meet the team
                <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
            
            <div className="mt-12 space-y-12">
              {/* Top Row - 3 Cards */}
              <ScrollRevealStagger staggerDelay={0.15} className="grid gap-6 md:grid-cols-3">
              {leadershipTop.map((leader) => (
                  <motion.div
                    key={leader.name}
                    whileHover={{ scale: 1.03, y: -8 }}
                    className="group relative overflow-hidden rounded-3xl border border-zinc-200/50 bg-gradient-to-br from-white/90 to-zinc-50/90 p-8 shadow-xl backdrop-blur-sm transition-all duration-500 hover:border-purple-300/50 hover:shadow-2xl hover:shadow-purple-500/30 dark:border-zinc-800/50 dark:from-zinc-900/90 dark:to-zinc-950/90"
                  >
                    {/* Glassmorphism effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-indigo-500/0 to-blue-500/0 transition-all duration-500 group-hover:from-purple-500/10 group-hover:via-indigo-500/10 group-hover:to-blue-500/10" />
                    
                    {/* Pulsating border on hover */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent transition-all duration-500 group-hover:border-purple-400/30" />
                    
                    {/* Animated background particles */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-purple-400 animate-ping" />
                      <div className="absolute bottom-8 left-8 h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
                    </div>
                    
                    <div className="relative z-10">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
                        {leader.title}
                      </p>
                      <h3 className="mt-3 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        {leader.name}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                        {leader.obsession}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {leader.bio}
                      </p>
                </div>
                  </motion.div>
              ))}
              </ScrollRevealStagger>
              
              {/* Bottom Row - 2 Cards */}
              <ScrollRevealStagger staggerDelay={0.15} className="grid gap-6 md:grid-cols-2 md:max-w-4xl md:mx-auto">
                {leadershipBottom.map((leader) => (
                  <motion.div
                    key={leader.name}
                    whileHover={{ scale: 1.03, y: -8 }}
                    className="group relative overflow-hidden rounded-3xl border border-zinc-200/50 bg-gradient-to-br from-white/90 to-zinc-50/90 p-8 shadow-xl backdrop-blur-sm transition-all duration-500 hover:border-purple-300/50 hover:shadow-2xl hover:shadow-purple-500/30 dark:border-zinc-800/50 dark:from-zinc-900/90 dark:to-zinc-950/90"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-indigo-500/0 to-blue-500/0 transition-all duration-500 group-hover:from-purple-500/10 group-hover:via-indigo-500/10 group-hover:to-blue-500/10" />
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent transition-all duration-500 group-hover:border-purple-400/30" />
                    
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-purple-400 animate-ping" />
                      <div className="absolute bottom-8 left-8 h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
                    </div>
                    
                    <div className="relative z-10">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
                        {leader.title}
                      </p>
                      <h3 className="mt-3 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        {leader.name}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                        {leader.obsession}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {leader.bio}
                      </p>
                </div>
                  </motion.div>
              ))}
              </ScrollRevealStagger>
            </div>
          </section>
        </ScrollReveal>

        {/* Values Section - Enhanced with Icons */}
        <ScrollReveal direction="up" delay={0.3}>
          <section className="mt-20 grid gap-6 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-8 shadow-lg transition-all duration-300 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/20 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />
                  <div className="relative z-10">
                    <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${value.color} p-3 text-white shadow-lg`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {value.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {value.description}
                    </p>
          </div>
                </motion.div>
              );
            })}
        </section>
        </ScrollReveal>

        {/* Interactive Timeline */}
        <ScrollReveal direction="up" delay={0.4}>
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Milestones</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Our journey building the unified platform for enterprise automation</p>
            
            <div className="relative mt-12">
              {/* Horizontal scroll timeline */}
              <div className="flex gap-6 overflow-x-auto pb-6 md:grid md:grid-cols-4 md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  return (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group relative min-w-[280px] flex-1 rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-6 shadow-lg transition-all duration-300 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/20 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950"
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-indigo-500/0 transition-all duration-300 group-hover:from-purple-500/10 group-hover:to-indigo-500/10" />
                      <div className="relative z-10">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 p-2 text-white shadow-lg">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {milestone.year}
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                          {milestone.detail}
                        </p>
                </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* Culture & Careers CTA - Enhanced */}
        <ScrollReveal direction="up" delay={0.5}>
          <section className="mt-20 rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 px-8 py-12 text-white shadow-2xl dark:border-purple-900">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">Culture</p>
                <h2 className="mt-4 text-3xl font-bold">We celebrate curious, outcome-obsessed teams</h2>
                <ul className="mt-6 space-y-4 text-sm text-white/90">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-purple-300">•</span>
                    <span>Hybrid-first teams across time zones with "follow-the-sun" collaboration.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-purple-300">•</span>
                    <span>Builder rotations to embed engineers with customers and success teams.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-purple-300">•</span>
                    <span>AI lab for open research, compliance, and safety innovation.</span>
                  </li>
              </ul>
            </div>
              <div className="rounded-2xl border border-white/30 bg-white/10 p-8 backdrop-blur-md">
                <p className="text-xl font-bold">We are hiring across product, engineering, GTM, and customer success.</p>
                <p className="mt-3 text-sm text-white/80">
                  Join us to ship platforms that redefine how enterprises run technology.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/careers"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-bold text-purple-700 shadow-xl transition-all hover:shadow-2xl"
              >
                Explore Careers
                    <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
                </motion.div>
            </div>
          </div>
        </section>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
