import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSalesModal from "@/components/ContactSalesModal";
import Link from "next/link";

const funnelSteps = [
  {
    title: "Share your objectives",
    description: "Outline ITAM, network, or AI agent programs plus KPIs. We map these to our product blueprints.",
    timeline: "Day 0",
  },
  {
    title: "Co-design your pilot",
    description: "Solution architects align integrations, compliance scope, and success metrics within 5 business days.",
    timeline: "Day 1-5",
  },
  {
    title: "Launch & measure",
    description: "Run an eight-week pilot with shared dashboards, exec check-ins, and ROI tracking baked in.",
    timeline: "Week 2-10",
  },
];

const touchpoints = [
  { label: "Email", value: "info@galactis.ai" },
  { 
    label: "Office", 
    value: "Wing A, Greenwood, Rajiv Gandhi Salai, Egattur, Kancheepuram, Tamil Nadu - 603103" 
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="grid gap-8 rounded-3xl border border-zinc-200 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 p-8 text-white shadow-2xl dark:border-zinc-800">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Sales engagement</p>
            <h1 className="text-4xl font-bold leading-tight">Design a Galactis pilot aligned to your KPIs</h1>
            <p className="text-base text-white/80">
              Headquartered in Egattur, Kancheepuram, Tamil Nadu, we use the same intake funnel described on our solutions pages: capture objectives, map success criteria, and launch an eight-week proof of value that mirrors production controls.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-semibold">
              <span className="rounded-full border border-white/30 px-4 py-2">Response within 24 hours</span>
              <span className="rounded-full border border-white/30 px-4 py-2">Executive + architect pairing</span>
              <span className="rounded-full border border-white/30 px-4 py-2">Pilot runbooks included</span>
            </div>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Start here</p>
            <p className="mt-2 text-sm text-white/80">
              Submit the contact brief below and we will confirm a working session within one business day.
            </p>
            <div className="mt-4">
              <ContactSalesModal intent="sales" />
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-3xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Optimized funnel in three moves</h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              This is the same motion we run in every Galactis pilot: objective intake, blueprinting, and value realization.
            </p>
            <div className="mt-6 space-y-4">
              {funnelSteps.map((step) => (
                <div key={step.title} className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600">{step.timeline}</div>
                  <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{step.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Talk with the right team</h2>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                We route every request to industry specialists covering ITAM, network, and AI agent programs.
              </p>
              <div className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                {touchpoints.map((touch) => (
                  <div key={touch.label} className="flex justify-between">
                    <span className="font-medium text-zinc-500 dark:text-zinc-400">{touch.label}</span>
                    <span>{touch.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-purple-200 bg-purple-50 p-6 dark:border-purple-900 dark:bg-purple-950/30">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Need more context first?</h3>
              <p className="mt-2 text-sm text-purple-900/80 dark:text-purple-100/80">
                Review the financial services, telecom, and healthcare solution briefs before we meet.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link href="/solutions/financial-services" className="inline-flex items-center text-purple-700 hover:text-purple-900 dark:text-purple-200">
                  Financial Services →
                </Link>
                <Link href="/solutions/telecommunications" className="inline-flex items-center text-purple-700 hover:text-purple-900 dark:text-purple-200">
                  Telecommunications →
                </Link>
                <Link href="/solutions/healthcare" className="inline-flex items-center text-purple-700 hover:text-purple-900 dark:text-purple-200">
                  Healthcare →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

