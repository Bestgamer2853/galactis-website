import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ROICalculator from "@/components/ROICalculator";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductHero from "@/components/ProductHero";

const programs = [
  {
    title: "Unified software intelligence",
    description: "Normalize catalogs, contracts, and telemetry across on-prem, SaaS, and cloud to unlock a single license truth.",
  },
  {
    title: "Lifecycle command center",
    description: "Track every device from requisition to retirement with IoT signals, warranty data, and automated chain-of-custody.",
  },
  {
    title: "Audit + compliance cockpit",
    description: "Generate regulator-ready evidence packs and simulate vendor audits before they arrive.",
  },
];

const transformations = [
  {
    title: "Shadow IT eliminated",
    bullets: [
      "AI enrichment classifies 12M+ titles with zero manual spreadsheets.",
      "Drift detection flags unauthorized SaaS and cloud spend within 24 hours.",
    ],
  },
  {
    title: "Financial governance",
    bullets: [
      "Continuous Effective License Position with scenario planning for renewals.",
      "FinOps dashboards translate usage into ₹ value impact for CFO dashboards.",
    ],
  },
];

const complianceBadges = ["SOC 2 Type II", "ISO 27001", "GDPR", "HIPAA", "FedRAMP (In Progress)", "ITIL 4 Aligned"];

const integrations = ["ServiceNow", "SAP Ariba", "AWS", "Azure", "Google Cloud", "Snow", "Flexera", "Jira", "Workday", "Okta"];

const useCases = [
  {
    name: "Technology Value Office",
    description: "Benchmark unit economics, allocate chargebacks, and orchestrate reclaim campaigns across business units.",
  },
  {
    name: "License Defense",
    description: "Automate tier-one vendor audits (Oracle, IBM, Microsoft) with certified playbooks and documentation trails.",
  },
  {
    name: "Hardware Refresh",
    description: "Predict end-of-life, trigger procurement, and ensure certified disposal with regulatory evidence.",
  },
];

export default function ITAMPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Galactis IT Asset Management",
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
            { label: "Products", href: "/products/itam" },
            { label: "IT Asset Management" },
          ]}
        />

        <ProductHero
          eyebrow="IT Asset Management"
          title="Know every asset, contract, and risk in one living system"
          subtitle="Galactis gives CIO, CFO, and security teams a single source of truth for software, hardware, SaaS, and cloud usage— with guardrails that automate audits and reclaim millions."
          bullets={[
            "Normalize discovery, contracts, and telemetry across hybrid estates",
            "Predict vendor risk and automate remediation with AI",
            "Tie every asset to ₹ value, compliance status, and owner",
          ]}
          stats={[
            { label: "Technology savings unlocked", value: "₹8 Lakhs" },
            { label: "Audit penalties avoided", value: "₹5 Lakhs" },
            { label: "Shadow IT eliminated", value: "85%" },
            { label: "Reclaim cycles automated", value: "320" },
          ]}
          primaryCta={{ label: "Book an ITAM blueprint", href: "/contact?cta=itam" }}
          secondaryCta={{ label: "View customer stories", href: "/resources/case-studies" }}
        />

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {programs.map((program) => (
            <div key={program.title} className="rounded-2xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">Program</p>
              <h2 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-white">{program.title}</h2>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{program.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-8 md:grid-cols-2">
          {transformations.map((item) => (
            <div key={item.title} className="rounded-3xl border border-zinc-200 p-8 dark:border-zinc-800">
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">{item.title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Operating system for asset confidence</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {useCases.map((useCase) => (
              <div key={useCase.name} className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">{useCase.name}</p>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Compliance & certifications baked in</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {complianceBadges.map((badge) => (
              <span key={badge} className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                {badge}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-zinc-200 p-8 shadow-lg dark:border-zinc-800">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Integrations and telemetry partners</h2>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">Connect OOB to procurement, finance, cloud, and ITSM systems.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {integrations.map((integration) => (
              <span key={integration} className="rounded-full border border-zinc-200 px-4 py-1.5 dark:border-zinc-700">
                {integration}
              </span>
            ))}
          </div>
        </section>
      </main>
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-purple-200 bg-purple-50 p-8 dark:border-purple-900 dark:bg-purple-950/30">
          <h2 className="text-2xl font-semibold text-purple-900 dark:text-purple-100">Model your ROI</h2>
          <p className="mt-2 text-sm text-purple-900/80 dark:text-purple-200/80">
            Quantify reclaimed licenses, avoided penalties, and lifecycle savings using your own metrics.
          </p>
          <div className="mt-6">
            <ROICalculator />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

