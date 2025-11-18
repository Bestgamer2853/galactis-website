"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSalesModal from "@/components/ContactSalesModal";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

const bundleHighlights = [
  {
    title: "ITAM + FinOps Blueprint",
    description: "Unified asset inventory, continuous Effective License Position, and automation-ready reclaim playbooks.",
    bullets: ["Covers software, SaaS, hardware, and cloud", "Includes regulator-ready evidence packs", "Pairs with Finance + Procurement stakeholders"],
  },
  {
    title: "Network Intelligence & Automation",
    description: "Topology, observability, and AI runbooks to sustain 99.95% uptime across hybrid, 5G, and edge estates.",
    bullets: ["Predictive blast-radius modeling", "Event streaming into ServiceNow, PagerDuty, Slack", "Human-in-the-loop guardrails"],
  },
  {
    title: "AI Agents Platform",
    description: "Multimodal agents with policy, knowledge, and observability layers for customer, IT, and back-office journeys.",
    bullets: ["Studio + governance workspace", "Consumption guardrails for AIaaS", "Template library for voice, chat, workflow, RPA"],
  },
];

const engagementStages = [
  { phase: "Day 0", title: "Discovery & KPI intake", detail: "Share ITAM, NetOps, or AI agent objectives plus compliance requirements. Response within 24 hours." },
  { phase: "Days 1-5", title: "Blueprint & commercial modeling", detail: "Joint squads align scope, integrations, hosting, and success criteria. Pricing scenarios mapped to ROI." },
  { phase: "Weeks 2-10", title: "Pilot & measurement", detail: "Eight-week program with shared dashboards, exec checkpoints, and value realization tracking." },
  { phase: "Post-pilot", title: "Procurement & deployment", detail: "Commercials locked with legal + security sign-off. Rollouts follow the same automation playbooks documented on our solutions pages." },
];

const readinessChecklist = [
  "Target domains (ITAM, Network, AI Agents) and KPIs",
  "Systems to integrate (ITSM, ERP, cloud, telco, comms)",
  "Compliance scope (PCI-DSS, SOX, HIPAA, GDPR, CALEA)",
  "Preferred deployment model (multi-tenant, single-tenant, sovereign)",
  "Timeline constraints (audit windows, transformation programs)",
];

const assurances = [
  "SOC 2 Type II, ISO 27001, HIPAA, GDPR controls inherit across every plan.",
  "Sovereign and dedicated tenant options for financial services and public sector.",
  "AI agent guardrails include policy templates, audit logs, and rollback.",
  "Managed success pods align to your industry and region.",
];

const pricingFaq = [
  {
    question: "How is Galactis pricing structured?",
    answer: "Our pricing combines platform subscription fees with usage-based components (per asset monitored, per AI agent, per workflow). Volume discounts and annual commitments reduce overall costs. Enterprise deals typically start at $50K+ annually, tailored to your scale, compliance needs, and deployment model.",
  },
  {
    question: "Why is pricing consultative rather than listed?",
    answer: "Each deployment is unique—spanning multiple regions, compliance requirements (PCI-DSS, SOX, HIPAA), hosting preferences (multi-tenant, single-tenant, sovereign), and integration complexity. We co-design commercials to align with your KPIs, ROI targets, and procurement cycles.",
  },
  {
    question: "Do you offer volume discounts or add-on services?",
    answer: "Yes. Enterprise agreements include volume discounts for large asset footprints or agent deployments. Add-ons include professional services (integration, training, custom playbooks), premium support tiers (24/7, dedicated pods), and managed success programs. All options are outlined in your tailored proposal.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 p-8 text-white shadow-2xl dark:border-zinc-800">
          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Pricing & procurement</p>
              <h1 className="mt-3 text-4xl font-bold leading-tight">
                Enterprise pricing is a conversation, not a calculator
              </h1>
              <p className="mt-4 text-base text-white/80">
                Every Galactis deployment spans ITAM, network intelligence, and AI agents with compliance guardrails. We co-design commercials to match scope, hosting, and ROI expectations. Pricing combines platform subscriptions with usage-based components; typical enterprise deals start at $50K+ annually, with volume discounts and flexible deployment options.
              </p>
              <p className="mt-3 text-sm text-white/70">
                Why consultative? Each enterprise has unique requirements—multiple regions, specific compliance needs (PCI-DSS, SOX, HIPAA), deployment preferences (multi-tenant, single-tenant, sovereign), and integration complexity. We tailor pricing to align with your KPIs, ROI targets, and procurement cycles.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/80">
                <li>• 24-hour response from industry solution owners</li>
                <li>• Blueprint + commercial modeling in under 5 business days</li>
                <li>• Eight-week pilots with shared success dashboards</li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    trackEvent("pricing_hero_cta_clicked");
                    const button = document.querySelector('[data-contact-trigger][data-intent="sales"]') as HTMLButtonElement;
                    button?.click();
                  }}
                  className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-purple-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Get a tailored proposal
                </button>
                <Link
                  href="/solutions/financial-services"
                  className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View solution briefs
                </Link>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">What to expect</p>
              <dl className="mt-4 space-y-4 text-sm text-white/80">
                <div>
                  <dt className="text-white/60">Response SLA</dt>
                  <dd className="text-lg font-semibold text-white">24 hours</dd>
                </div>
                <div>
                  <dt className="text-white/60">Pilot duration</dt>
                  <dd className="text-lg font-semibold text-white">8 weeks</dd>
                </div>
                <div>
                  <dt className="text-white/60">Support model</dt>
                  <dd className="text-lg font-semibold text-white">Dedicated success pod</dd>
                </div>
                <div>
                  <dt className="text-white/60">Regions</dt>
                  <dd className="text-lg font-semibold text-white">NA · EU · APAC</dd>
                </div>
                <div>
                  <dt className="text-white/60">Starting range</dt>
                  <dd className="text-lg font-semibold text-white">$50K+ annually</dd>
                </div>
              </dl>
            </div>
            {/* Hidden trigger for ContactSalesModal */}
            <div className="hidden">
              <ContactSalesModal intent="sales" />
            </div>
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Solution bundles we typically model</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {bundleHighlights.map((bundle) => (
              <div key={bundle.title} className="rounded-3xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{bundle.title}</h3>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{bundle.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {bundle.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Procurement & pilot journey</h2>
          <div className="mt-6 space-y-4">
            {engagementStages.map((stage) => (
              <div key={stage.phase} className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600">{stage.phase}</div>
                <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{stage.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{stage.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 p-6 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Come prepared with</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              {readinessChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-zinc-200 p-6 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">What we guarantee</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              {assurances.map((assurance) => (
                <li key={assurance} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{assurance}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/50">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-600 dark:text-zinc-400">Volume & Add-ons</p>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                Enterprise agreements include volume discounts for large deployments. Add-ons: professional services, premium support tiers (24/7, dedicated pods), and managed success programs. All options detailed in your tailored proposal.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-purple-200 bg-purple-50 p-8 dark:border-purple-900 dark:bg-purple-950/30">
          <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-900/70 dark:text-purple-200/80">Next step</p>
              <h2 className="mt-3 text-2xl font-semibold text-purple-900 dark:text-purple-100">Ready for a tailored proposal?</h2>
              <p className="mt-3 text-sm text-purple-900/80 dark:text-purple-100/80">
                Bring your KPIs, integrations, and compliance constraints. We'll present a tailored commercial model and success plan in under a week.
              </p>
            </div>
            <div className="rounded-2xl border border-white/50 bg-white/70 p-4 text-sm text-purple-900 shadow-sm dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-100">
              <p className="font-semibold uppercase tracking-[0.3em]">What you receive</p>
              <ul className="mt-3 space-y-2">
                <li>• Commercial options mapped to ROI</li>
                <li>• Integration + rollout sequencing</li>
                <li>• Governance & security summary</li>
                <li>• Executive-ready business case</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={() => {
                trackEvent("pricing_final_cta_clicked");
                const button = document.querySelector('[data-contact-trigger][data-intent="sales"]') as HTMLButtonElement;
                button?.click();
              }}
              className="rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-700 hover:shadow-xl"
            >
              Request pricing consultation
            </button>
          </div>
          {/* Hidden trigger for ContactSalesModal */}
          <div className="hidden">
            <ContactSalesModal intent="sales" />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Frequently asked questions</h2>
          <div className="mt-6 space-y-6">
            {pricingFaq.map((faq, index) => (
              <div key={index} className="border-b border-zinc-200 pb-6 last:border-b-0 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{faq.question}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

