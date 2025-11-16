import Link from "next/link";

export default function EnterpriseCTA() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-600 to-indigo-600 px-6 py-12 text-white shadow-2xl dark:border-purple-900">
      <div className="relative z-10 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">Next best step</p>
          <h2 className="mt-4 text-3xl font-bold">Co-design a pilot that proves business value in 8 weeks</h2>
          <p className="mt-3 text-white/80">
            Bring your KPIs, tech stack, and constraints. We bring reference architectures, integration pods, and executive alignment to accelerate adoption.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-purple-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Book a Design Session
            </Link>
            <Link
              href="/resources/case-studies"
              className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore Case Studies
            </Link>
          </div>
        </div>
        <div className="grid gap-4 rounded-2xl bg-white/10 p-6 backdrop-blur">
          <div>
            <p className="text-3xl font-semibold">₹75 Lakhs</p>
            <p className="text-sm text-white/70">technology waste eliminated to date</p>
          </div>
          <div>
            <p className="text-3xl font-semibold">8 weeks</p>
            <p className="text-sm text-white/70">to production pilots with shared success plans</p>
          </div>
          <div>
            <p className="text-3xl font-semibold">25+</p>
            <p className="text-sm text-white/70">pre-built integrations & AI agent templates</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-10 top-10 h-60 w-60 rounded-full bg-emerald-400 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-400 blur-3xl" />
      </div>
    </section>
  );
}

