import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductHero from "@/components/ProductHero";

const signals = [
  { title: "Unified telemetry", description: "SNMP, streaming NetFlow, syslog, synthetic, and cloud-native metrics stream into one graph." },
  { title: "AI root cause", description: "Dependency-aware AI correlates anomalies with business impact to surface probable root cause in seconds." },
  { title: "Autonomous remediation", description: "Trigger runbooks, ITSM, and agentic workflows that resolve incidents before customers notice." },
];

const runbooks = [
  {
    title: "Edge outage automation",
    details: [
      "Detects brownouts using packet loss + customer sentiment",
      "Executes zero-touch remediation scripts via infrastructure-as-code",
      "Notifies affected customers with AI-generated comms",
    ],
  },
  {
    title: "Capacity & health forecasting",
    details: [
      "ML forecasts saturation and recommends capacity moves",
      "Automates workflows in ServiceNow and Jira",
      "Feeds finance with impact-to-revenue models",
    ],
  },
];

const useCases = [
  {
    title: "Command center copilots",
    description: "AI copilots summarize incidents, evaluate runbook success, and brief executives in real time.",
  },
  {
    title: "Customer experience guardrails",
    description: "Correlate network health with NPS, churn, and agent data to proactively reach out to customers.",
  },
  {
    title: "Change assurance",
    description: "Validate planned maintenance against blast radius models and auto-roll back risky pushes.",
  },
];

const integrations = ["ServiceNow", "PagerDuty", "Slack", "Jira", "Twilio", "Cisco", "Juniper", "Arista", "VMware", "Kubernetes", "AWS", "Azure", "GCP"];

export default function NetworkMonitoringPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Galactis Network Monitoring",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web, Cloud",
          offers: { "@type": "Offer", priceCurrency: "USD", price: "Contact for pricing" },
        }}
      />
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products/network-monitoring" },
            { label: "Network Monitoring" },
          ]}
        />

        <ProductHero
          eyebrow="Network Intelligence & Automation"
          title="Predict, diagnose, and resolve network incidents with AI"
          subtitle="Galactis blends observability, topology, and AI-runbooks so NOC teams sustain 99.99% availability with fewer pagers."
          bullets={[
            "Single pane of glass for hybrid, multi-cloud, and edge",
            "Blast radius analysis with business impact scoring",
            "Closed-loop automation with human approval guardrails",
          ]}
          stats={[
            { label: "Mean time to detect", value: "-48%" },
            { label: "Mean time to resolve", value: "3x faster" },
            { label: "P1 incidents prevented", value: "28%" },
            { label: "Automated runbooks", value: "85+" },
          ]}
          primaryCta={{ label: "Schedule a NOC briefing", href: "/contact?cta=network" }}
          secondaryCta={{ label: "View customer stories", href: "/resources/case-studies" }}
        />

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {signals.map((signal) => (
            <div key={signal.title} className="rounded-2xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">Capability</p>
              <h2 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-white">{signal.title}</h2>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{signal.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-8 md:grid-cols-2">
          {runbooks.map((runbook) => (
            <div key={runbook.title} className="rounded-3xl border border-zinc-200 p-8 dark:border-zinc-800">
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">{runbook.title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                {runbook.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Operations outcomes</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">{useCase.title}</p>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-zinc-200 p-8 shadow-lg dark:border-zinc-800">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Integration fabric</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Native connectors orchestrate alerts, runbooks, comms, and infrastructure change.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {integrations.map((integration) => (
              <span key={integration} className="rounded-full border border-zinc-200 px-4 py-1.5 dark:border-zinc-700">
                {integration}
              </span>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

