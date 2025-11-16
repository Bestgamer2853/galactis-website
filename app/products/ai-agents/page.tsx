import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CostEstimator from "@/components/CostEstimator";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductHero from "@/components/ProductHero";

const pillars = [
  {
    title: "Design studio",
    description: "Drag-and-drop canvas orchestrates LLM prompts, APIs, RPA, and human approvals.",
  },
  {
    title: "Knowledge + policy layer",
    description: "Secure connectors ground agents with enterprise knowledge graphs, embeddings, and governance.",
  },
  {
    title: "Operations cockpit",
    description: "Observability for conversations, workflow traces, redaction, and rollback controls.",
  },
];

const journeys = [
  {
    title: "Contact center transformation",
    bullets: [
      "Voice & chat agents deflect Tier 1 and escalate with summaries.",
      "Sentiment, QA, and agent assist boost CSAT by 18 pts.",
    ],
  },
  {
    title: "IT + back office copilots",
    bullets: [
      "Service desk agents triage incidents with context-rich responses.",
      "Finance and supply chain RPA flows reconcile documents automatically.",
    ],
  },
];

const pricing = [
  { name: "SaaS subscription", text: "Per agent seat licensing with premium success pod and guardrails." },
  { name: "AIaaS consumption", text: "Usage-based pricing per token, call minute, workflow and vector storage." },
  { name: "Hybrid enterprise", text: "Dedicated tenant, custom SLAs, and bring-your-own LLM deployments." },
];

const connectors = ["ServiceNow", "Salesforce", "HubSpot", "Twilio", "cm.com", "Slack", "Teams", "UiPath", "Workato", "n8n", "Zapier", "Azure", "AWS", "GCP"];

const useCases = [
  {
    title: "Service desk copilots",
    description: "Autonomously resolve incidents, enrich tickets, and engage humans only when necessary.",
  },
  {
    title: "Revenue operations concierge",
    description: "Automate CRM hygiene, follow-ups, and personalized outreach with brand-safe copy.",
  },
  {
    title: "Procurement & finance automation",
    description: "Agents reconcile invoices, validate approvals, and update ERP systems with audit trails.",
  },
];

export default function AIAgentsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Galactis AI Agents Platform",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web, Cloud",
          offers: { "@type": "Offer", priceCurrency: "USD", price: "Contact for pricing" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "150" },
        }}
      />
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/ai-agents" },
            { label: "AI Agents Platform" },
          ]}
        />

        <ProductHero
          eyebrow="AI Agents Platform"
          title="Design guardrailed AI agents that orchestrate people, APIs, and RPA"
          subtitle="From contact centers to finance ops, Galactis lets you build multi-modal agents with observability, governance, and business-ready playbooks."
          bullets={[
            "Visual canvas with governance baked in",
            "Use any LLM or Galactis-managed models",
            "Human-in-the-loop, auditing, and rollback by default",
          ]}
          stats={[
            { label: "Calls automated", value: "120K" },
            { label: "Average cost to serve reduction", value: "24%" },
            { label: "Agent build time", value: "Weeks not months" },
            { label: "Compliance violations", value: "0 reported" },
          ]}
          primaryCta={{ label: "Launch an AI agent sprint", href: "/contact?cta=ai-agents" }}
          secondaryCta={{ label: "Explore templates", href: "/developers/agent-templates" }}
        />

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">Pillar</p>
              <h2 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-white">{pillar.title}</h2>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{pillar.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-8 md:grid-cols-2">
          {journeys.map((journey) => (
            <div key={journey.title} className="rounded-3xl border border-zinc-200 p-8 dark:border-zinc-800">
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">{journey.title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                {journey.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-purple-500" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Enterprise-ready use cases</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">{useCase.title}</p>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Pricing models that flex with usage</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {pricing.map((plan) => (
              <div key={plan.name} className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{plan.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-zinc-200 p-8 shadow-lg dark:border-zinc-800">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Integration hub</h2>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            Pre-built connectors orchestrate enterprise systems, communication channels, and automation platforms.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {connectors.map((connector) => (
              <span key={connector} className="rounded-full border border-zinc-200 px-4 py-1.5 dark:border-zinc-700">
                {connector}
              </span>
            ))}
          </div>
        </section>
      </main>
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-purple-200 bg-purple-50 p-8 dark:border-purple-900 dark:bg-purple-950/30">
          <h2 className="text-2xl font-semibold text-purple-900 dark:text-purple-100">Forecast AI agent economics</h2>
          <p className="mt-2 text-sm text-purple-900/80 dark:text-purple-200/80">
            Use the cost estimator to model SaaS vs AIaaS spend with your own call volumes, message volumes, and workflows.
          </p>
          <div className="mt-6">
            <CostEstimator />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

