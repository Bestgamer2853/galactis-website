import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Case Studies</h1>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">Explore how Galactis.ai transforms technology operations for global enterprises.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Tier-1 Global Bank",
              industry: "Financial Services",
              outcome: "$3.2M audit risk avoided; 28% software waste reduction",
              summary: "Unified ITAM + FinOps platform delivering regulator-ready license positions and automated compliance evidence.",
            },
            {
              title: "Northwind Telecom",
              industry: "Telecommunications",
              outcome: "42% fewer P1 incidents; 99.95% uptime",
              summary: "AI-driven network observability with automated remediation playbooks and proactive customer comms.",
            },
            {
              title: "Integrated Healthcare Network",
              industry: "Healthcare",
              outcome: "Zero PHI findings; 75% faster compliance documentation",
              summary: "Clinical asset governance and automated HIPAA evidence packs across 60 facilities.",
            },
            {
              title: "Orbit Logistics",
              industry: "Logistics & Supply Chain",
              outcome: "+19% OTIF performance; 45% faster customs clearance",
              summary: "Real-time asset telemetry, AI agents for trade documentation, and resilient network automation.",
            },
          ].map((study) => (
            <div key={study.title} className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
              <p className="text-xs uppercase tracking-wide text-purple-600">{study.industry}</p>
              <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{study.title}</h3>
              <p className="mt-2 text-sm font-medium text-emerald-500">Outcome: {study.outcome}</p>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{study.summary}</p>
              <a
                href="/contact"
                className="mt-4 inline-block text-sm font-semibold text-purple-600 hover:text-purple-700"
              >
                Request full case study →
              </a>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-purple-200 bg-purple-50 p-6 dark:border-purple-900 dark:bg-purple-950/30">
          <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-200">Need an outcomes briefing?</h2>
          <p className="mt-2 text-sm text-purple-900/80 dark:text-purple-200/80">
            Download the Galactis Outcomes Report or contact us to benchmark ROI against your peers.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="/pricing-pack.pdf" className="rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700">
              Download Outcomes Report
            </a>
            <a href="/contact" className="rounded-md border border-purple-600 px-4 py-2 text-sm font-semibold text-purple-600 hover:bg-purple-100">
              Talk to Sales
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

