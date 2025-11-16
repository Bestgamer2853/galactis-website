import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

const execTeam = [
  {
    name: "Madhujith Rao",
    role: "Chief Executive Officer",
    bio: "Guides Galactis across product, go-to-market, and culture. Former CIO who led multi-region ITAM modernization at a tier-one bank.",
  },
  {
    name: "Aryan Kapoor",
    role: "Chief Operating Officer",
    bio: "Drives delivery, customer success, and security programs to ensure every deployment hits compliance and ROI goals.",
  },
  {
    name: "Nikitha Iyer",
    role: "Chief Technology Officer",
    bio: "Owns platform architecture and AI roadmap after leading observability and automation teams at hyperscale cloud providers.",
  },
  {
    name: "Natasha Mehta",
    role: "Chief Marketing Officer",
    bio: "Shaped the Galactis category narrative with analysts, partners, and enterprise communities worldwide.",
  },
  {
    name: "Harini Bhatt",
    role: "Chief People Officer",
    bio: "Builds the builder-operator culture across New York, Bengaluru, Dublin, and Singapore hubs.",
  },
];

const advisors = [
  {
    name: "Jordan Ellis",
    role: "Board Director · Former CIO, Fortune 50 insurer",
    note: "Champions financial governance, regulatory strategy, and executive alignment.",
  },
  {
    name: "Priya D’Souza",
    role: "Board Advisor · ex-Global Head of NetOps, Telco",
    note: "Guides network automation and telco partnerships.",
  },
  {
    name: "Marcus Silva",
    role: "Security Advisor · CISO, Healthcare group",
    note: "Shapes HIPAA/GDPR guardrails and trust programs.",
  },
];

const leadershipPrinciples = [
  "Operators at the table: every exec ran ITAM, NetOps, or AI programs at scale.",
  "Customer councils: quarterly sessions with financial services, telecom, healthcare, and public sector executives.",
  "Transparency: product roadmaps, incident reviews, and hiring plans shared company-wide.",
];

export default function LeadershipPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Company" }, { label: "Leadership" }]} />
        <section className="mt-6 rounded-3xl border border-zinc-200 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 p-8 text-white shadow-2xl dark:border-zinc-800">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Leadership</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight">People who built, ran, and modernized enterprise technology</h1>
          <p className="mt-4 max-w-3xl text-base text-white/80">
            The Galactis leadership bench blends decades of experience across CIO, CTO, and COO roles plus proven SaaS scale-ups. We ship with the same urgency and governance standards our customers demand.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-white/70">
            <span className="rounded-full border border-white/30 px-4 py-2">CIO / COO lineage</span>
            <span className="rounded-full border border-white/30 px-4 py-2">Global delivery pods</span>
            <span className="rounded-full border border-white/30 px-4 py-2">Customer advisory boards</span>
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          {leadershipPrinciples.map((principle) => (
            <div key={principle} className="rounded-3xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
              <p className="text-sm text-zinc-700 dark:text-zinc-300">{principle}</p>
            </div>
          ))}
        </section>

        <section className="mt-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Executive team</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Distributed across New York, Bengaluru, Dublin, and Singapore.</p>
            </div>
            <Link href="/company/careers" className="text-sm font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-300">
              Join the team →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {execTeam.map((leader) => (
              <div key={leader.name} className="rounded-3xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600">{leader.role}</p>
                <h3 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{leader.name}</h3>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{leader.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Board & advisors</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {advisors.map((advisor) => (
              <div key={advisor.name} className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600">{advisor.role}</p>
                <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{advisor.name}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{advisor.note}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

