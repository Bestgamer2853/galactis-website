import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

type IndustryPageProps = {
  title: string;
  subtitle: string;
  pains: string[];
  solutions: string[];
  compliance: string[];
  caseStudy: {
    client: string;
    challenge: string;
    solution: string;
    result: string;
  };
  metrics: { label: string; value: string }[];
  breadcrumbs?: { label: string; href?: string }[];
};

export default function IndustryPage({
  title,
  subtitle,
  pains,
  solutions,
  compliance,
  caseStudy,
  metrics,
  breadcrumbs,
}: IndustryPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={
            breadcrumbs ?? [
              { label: "Home", href: "/" },
              { label: "Solutions" },
              { label: title },
            ]
          }
        />
        <section className="mt-6 rounded-3xl border border-zinc-200 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 p-8 text-white shadow-2xl dark:border-zinc-800">
          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">Industry solution</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">{title}</h1>
              <p className="mt-4 text-base text-white/80">{subtitle}</p>
              <p className="mt-4 text-sm text-white/70">
                Content extracted from the {title.toLowerCase()} playbooks, control matrices, and case studies published on galactis.ai/solutions.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Business outcomes</p>
              <dl className="mt-4 space-y-4">
                {metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="text-xs uppercase tracking-wide text-white/60">{metric.label}</dt>
                    <dd className="text-2xl font-semibold">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Industry pain points</h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Pulled from stakeholder interviews and operational assessments we run with {title.toLowerCase()} teams.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              {pains.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Galactis solution mapping</h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Each control maps back to capabilities in the Galactis platform, accelerators, and partner-run playbooks.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              {solutions.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-3xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Compliance alignment</h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Controls synthesized from the compliance packs available on the Resources → Whitepapers page.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {compliance.map((control) => (
                <span
                  key={control}
                  className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
                >
                  {control}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Case study snapshot</h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Direct excerpt from the published case study.</p>
            <div className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">{caseStudy.client}</p>
              <p>Challenge: {caseStudy.challenge}</p>
              <p>Solution: {caseStudy.solution}</p>
              <p>Results: {caseStudy.result}</p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-purple-200 bg-purple-50 p-6 dark:border-purple-900 dark:bg-purple-950/30">
          <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100">Partner with Galactis</h2>
              <p className="mt-3 text-sm text-purple-900/80 dark:text-purple-100/80">
                Book an industry blueprint session to walkthrough controls, integrations, and KPIs tailored to your regulatory, operational, and financial objectives.
              </p>
              <a
                href="/contact"
                className="mt-4 inline-flex items-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                Contact Sales
              </a>
            </div>
            <div className="rounded-2xl border border-purple-200/70 bg-white/60 p-4 text-sm text-purple-900 shadow-sm dark:border-purple-900/50 dark:bg-white/5 dark:text-purple-100">
              <p className="font-semibold uppercase tracking-[0.3em]">What you receive</p>
              <ul className="mt-3 space-y-2">
                <li>• Full control matrix + RACI</li>
                <li>• ROI assumptions validated against peers</li>
                <li>• Integration sequencing with your systems</li>
                <li>• Pilot charter with 8-week success plan</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

