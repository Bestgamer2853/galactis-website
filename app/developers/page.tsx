import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Code2, TerminalSquare, Layers, Zap, Shield, CircuitBoard } from "lucide-react";

const navigationCards = [
  {
    href: "/developers/getting-started",
    title: "Getting started",
    desc: "Authentication, environments, galleries of API requests.",
  },
  {
    href: "/developers/api-reference",
    title: "API reference",
    desc: "OpenAPI 3.1 explorer with request builders and schema diffs.",
  },
  {
    href: "/developers/sdks",
    title: "SDKs",
    desc: "Python, Node.js, Go, and Java packages kept parity with the API surface.",
  },
  {
    href: "/developers/integrations",
    title: "Integrations",
    desc: "ServiceNow, Salesforce, Twilio, n8n, Zapier, Workato, UiPath, and more.",
  },
  {
    href: "/developers/developer-console",
    title: "Developer console",
    desc: "Usage telemetry, billing, API keys, rate limits, and audit logs.",
  },
  {
    href: "/developers/agent-templates",
    title: "Agent templates",
    desc: "Voice, chat, workflow, and RPA starters aligned to the AI Agents Studio.",
  },
];

const capabilityHighlights = [
  {
    icon: Code2,
    title: "OpenAPI 3.1 spec + Postman collection",
    body: "Same reference that powers galactis.ai/api-reference and our GA4 tracking examples.",
  },
  {
    icon: TerminalSquare,
    title: "CLI + dev console automation",
    body: "Spin credentials, pipelines, and integration webhooks straight from CI.",
  },
  {
    icon: Layers,
    title: "200+ integration connectors",
    body: "ServiceNow, SAP, Salesforce, Twilio, n8n, Zapier, Workato, UiPath, PagerDuty, and custom webhooks.",
  },
  {
    icon: Shield,
    title: "Compliance-aware sandboxing",
    body: "Tenant isolation, audit logging, and secret redaction mirror production environments.",
  },
  {
    icon: Zap,
    title: "Event + streaming support",
    body: "Emit ITAM, network, and AI agent events into Kafka, EventBridge, or webhooks.",
  },
  {
    icon: CircuitBoard,
    title: "Agent building blocks",
    body: "LLM prompt packs, policy templates, and telemetry exporters reused by the AI Agents Studio.",
  },
];

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-900 via-purple-900 to-zinc-900 p-8 text-white shadow-2xl dark:border-zinc-800">
          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Galactis for builders</p>
              <h1 className="mt-3 text-4xl font-bold leading-tight">APIs, SDKs, and agent templates straight from the product</h1>
              <p className="mt-4 text-base text-white/80">
                Everything here is pulled from the developer docs sections on galactis.ai so you can automate ITAM, network, and AI agent workflows alongside your stack.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <div className="rounded-2xl bg-white/10 px-4 py-2">
                  OpenAPI 3.1 · SDKs for Python, Node.js, Go, Java
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-2">Agent templates for voice, chat, workflow, RPA</div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 text-sm text-white/80 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.35em]">Fast facts</p>
              <dl className="mt-4 space-y-4">
                {[
                  { label: "API latency SLO", value: "< 300ms p95" },
                  { label: "Rate limit tiers", value: "10K, 25K, 50K rpm" },
                  { label: "Events", value: "ITAM, NOC, agent actions" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-xs uppercase tracking-wide text-white/60">{stat.label}</dt>
                    <dd className="text-lg font-semibold text-white">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {navigationCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl border border-zinc-200 p-6 shadow-sm transition hover:-translate-y-1 hover:border-purple-400 hover:shadow-lg dark:border-zinc-800 dark:hover:border-purple-700"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{card.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{card.desc}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-purple-600 dark:text-purple-400">
                Explore →
              </span>
            </Link>
          ))}
        </section>

        <section className="mt-16">
          <div className="flex flex-col gap-3 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-600">Built-in capabilities</p>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Everything you need to ship IT + AI ops automations</h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              Highlights below are sourced from the Developers, Integrations, and Agent Templates pages already part of the site.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {capabilityHighlights.map((item) => (
              <div key={item.title} className="rounded-3xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

