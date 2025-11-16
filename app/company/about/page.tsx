import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

const values = [
  {
    title: "Build with operators",
    description: "Every squad pairs product engineers with former ITAM, NetOps, or AI service owners to keep roadmaps anchored in reality.",
  },
  {
    title: "Design for trust",
    description: "Compliance, observability, and human-in-the-loop controls ship with v1. Every feature is auditable and explainable.",
  },
  {
    title: "Automate responsibly",
    description: "AI Agents follow guardrails, data residency, and regulatory obligations before triggering automations.",
  },
];

const leadership = [
  {
    name: "Madhujith",
    title: "Chief Executive Officer",
    bio: "Sets the Galactis vision, pairing customer obsession with disciplined operating cadences to keep R&D and go-to-market tightly aligned.",
  },
  {
    name: "Aryan",
    title: "Chief Operating Officer",
    bio: "Leads global delivery, security, and customer success programs so every rollout hits compliance, speed, and value realization targets.",
  },
  {
    name: "Nikitha",
    title: "Chief Technology Officer",
    bio: "Owns product and engineering strategy, from multi-tenant architecture to the AI roadmap powering ITAM, NetOps, and agent platforms.",
  },
  {
    name: "Natasha",
    title: "Chief Marketing Officer",
    bio: "Drives market narrative, analyst relations, and demand programs that position Galactis as the platform of record for IT operations.",
  },
  {
    name: "Harini",
    title: "Chief Human Resources Officer",
    bio: "Cultivates the builder culture across regions, focusing on leadership development, DEI, and hybrid collaboration rituals.",
  },
];

const leadershipTop = leadership.slice(0, 3);
const leadershipBottom = leadership.slice(3);

const milestones = [
  { year: "2019", detail: "Galactis founded after repeated IT asset blind spots triggered eight-figure audit penalties." },
  { year: "2021", detail: "Expanded platform to network intelligence with predictive graph AI and remediation runbooks." },
  { year: "2023", detail: "Launched AI Agents Platform and delivered ₹75 Lakhs in customer savings across regulated industries." },
  { year: "2024", detail: "Opened innovation centers in Bengaluru, Dublin, and Toronto to accelerate co-innovation with clients." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Company" }, { label: "About" }]} />
        <section className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white px-8 py-12 shadow-xl dark:border-zinc-800 dark:from-zinc-900 dark:to-black">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">Our story</p>
          <h1 className="mt-4 text-4xl font-bold text-zinc-900 dark:text-white">We build the operating system for technology leaders</h1>
          <p className="mt-4 max-w-3xl text-lg text-zinc-700 dark:text-zinc-300">
            Galactis.ai unifies IT Asset Management, Network Intelligence, and AI Agents so enterprises can see every asset, predict disruption, and orchestrate autonomous operations. We are a distributed team of builders, operators, and researchers obsessed with measurable outcomes.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Customers", value: "22" },
              { label: "Technology savings unlocked", value: "₹65 Lakhs" },
              { label: "Incidents autonomously resolved", value: "3.2K" },
              { label: "Availability achieved", value: "99.9%" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-zinc-200 bg-white/80 p-4 text-center dark:border-zinc-700 dark:bg-zinc-900/60">
                <p className="text-3xl font-semibold text-zinc-900 dark:text-white">{stat.value}</p>
                <p className="text-xs uppercase tracking-wide text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{value.title}</h2>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{value.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">Leadership</p>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Operators who shipped at scale</h2>
            </div>
            <Link href="/company/careers" className="text-sm font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-300">
              Meet the team →
            </Link>
          </div>
          <div className="mt-8 space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
              {leadershipTop.map((leader) => (
                <div key={leader.name} className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">{leader.title}</p>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{leader.name}</h3>
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{leader.bio}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2 md:max-w-3xl md:mx-auto">
              {leadershipBottom.map((leader) => (
                <div key={leader.name} className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">{leader.title}</p>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{leader.name}</h3>
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{leader.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Milestones</h2>
          <div className="relative mt-8">
            <div className="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 bg-purple-200 md:block" />
            <div className="space-y-8 md:space-y-0">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:flex-row md:items-center">
                  <div className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">{milestone.year}</div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">{milestone.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-600 to-indigo-600 px-6 py-10 text-white shadow-2xl dark:border-purple-900">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">Culture</p>
              <h2 className="mt-2 text-2xl font-semibold">We celebrate curious, outcome-obsessed teams</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li>• Hybrid-first teams across time zones with “follow-the-sun” collaboration.</li>
                <li>• Builder rotations to embed engineers with customers and success teams.</li>
                <li>• AI lab for open research, compliance, and safety innovation.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/30 bg-white/10 p-6 backdrop-blur">
              <p className="text-lg font-semibold">We are hiring across product, engineering, GTM, and customer success.</p>
              <p className="mt-2 text-sm text-white/80">Join us to ship platforms that redefine how enterprises run technology.</p>
              <Link
                href="/company/careers"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-purple-700 shadow-lg"
              >
                Explore Careers
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

