import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { BadgeCheck, Handshake, Sparkles, ArrowRight, Shield, Workflow } from "lucide-react";

const partnerBadges = ["ServiceNow", "AWS", "Microsoft", "Google Cloud", "Cisco", "Freshworks"];

const partnerBenefits = [
  {
    icon: Handshake,
    title: "Co-selling & revenue sharing",
    description: "Joint account plans with quarterly pipeline reviews and Kancheepuram-based partner success pods.",
  },
  {
    icon: BadgeCheck,
    title: "Enablement in under 4 weeks",
    description: "Playbooks, demo environments, and certification paths for ITAM, network, and AI agents.",
  },
  {
    icon: Shield,
    title: "Enterprise-grade compliance",
    description: "SOC 2, ISO 27001, HIPAA, and RBI-ready templates for regulated enterprise RFPs.",
  },
  {
    icon: Workflow,
    title: "Integration accelerators",
    description: "Pre-built connectors for ServiceNow, Salesforce, SAP, and telco OSS/BSS stacks.",
  },
];

const partnerTracks = [
  {
    name: "Build",
    description: "ISVs and product companies embedding Galactis data or agents into their solutions.",
    highlights: ["Co-innovation workshops", "Early access APIs", "Joint roadmap reviews"],
  },
  {
    name: "Expand",
    description: "Global GSIs and regional SIs delivering ITAM, network, and AI agent programs.",
    highlights: ["Dedicated partner success lead", "Enablement credits", "Delivery playbooks + QA"],
  },
  {
    name: "Scale",
    description: "Cloud, telco, and platform alliances aligning GTM motions with Galactis.",
    highlights: ["Executive steering group", "Marketing development funds", "Field CTO briefings"],
  },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Partners" }]} />
        <section className="mt-4 rounded-[40px] border border-zinc-200/70 bg-gradient-to-br from-purple-900 via-indigo-900 to-zinc-900 px-8 py-12 text-white shadow-[0_40px_120px_-60px_rgba(0,0,0,0.8)] dark:border-zinc-800 sm:px-10 sm:py-14">
          <ScrollReveal direction="fade">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Galactis Partner Network</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Build and scale enterprise automation programs with us from Kancheepuram
            </h1>
            <p className="mt-4 max-w-4xl text-base text-white/80">
              We collaborate with consulting partners, ISVs, and platform alliances to deliver IT Asset Management, network
              intelligence, and AI agent outcomes for regulated enterprises. Unlock new revenue with shared playbooks,
              joint go-to-market, and Kancheepuram-based enablement pods.
            </p>
          </ScrollReveal>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-white/70">
            <span className="rounded-full border border-white/30 px-4 py-2">Co-build initiatives</span>
            <span className="rounded-full border border-white/30 px-4 py-2">Joint NOC + AI agent demos</span>
            <span className="rounded-full border border-white/30 px-4 py-2">24-hour partner desk</span>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">Featured alliances</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {partnerBadges.map((partner) => (
              <div
                key={partner}
                className="flex h-20 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
              >
                {partner}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          {partnerBenefits.map((benefit) => (
            <ScrollReveal key={benefit.title} direction="up" delay={0.1}>
              <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
                <benefit.icon className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                <h3 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{benefit.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{benefit.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </section>

        <section className="mt-12 rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">Partner tracks</p>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Choose how we build together</h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border border-purple-600 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-50 dark:text-purple-300 dark:hover:bg-purple-900/30"
            >
              Book a partner briefing <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {partnerTracks.map((track) => (
              <div
                key={track.name}
                className="rounded-3xl border border-zinc-200 p-6 shadow-sm transition hover:border-purple-500 dark:border-zinc-800 dark:hover:border-purple-600"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-600">{track.name}</p>
                <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{track.description}</h3>
                <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {track.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4 text-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-purple-200 bg-purple-50 p-8 dark:border-purple-900 dark:bg-purple-950/30">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-900/70 dark:text-purple-100/80">
                Enablement timeline
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-purple-900 dark:text-purple-100">
                Ramp in four steps from Kancheepuram enablement HQ
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-purple-900/80 dark:text-purple-100/80">
                <li>Week 1: Partner kickoff, solution blueprinting, and GTM alignment</li>
                <li>Week 2: Hands-on labs for ITAM, network, and AI agent modules</li>
                <li>Week 3: Joint demo build + success planning for lighthouse accounts</li>
                <li>Week 4: Co-selling launch with shared dashboards and Slack channels</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-purple-200/60 bg-white/80 p-6 shadow-lg dark:border-purple-900/60 dark:bg-purple-900/20">
              <p className="text-sm font-semibold text-purple-900 dark:text-purple-100">Need something custom?</p>
              <p className="mt-2 text-sm text-purple-900/80 dark:text-purple-100/80">
                We frequently run Kancheepuram-based innovation sprints for alliances. Tell us your brief and we'll tailor a program.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                Contact alliance desk
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


