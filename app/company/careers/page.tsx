import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CareersApplication from "@/components/CareersApplication";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Company" }, { label: "Careers" }]} />
        <section className="mt-6 rounded-3xl border border-zinc-200 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 p-8 text-white shadow-2xl dark:border-zinc-800">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Careers @ Galactis</p>
          <h1 className="mt-3 text-4xl font-bold">Build Tamil Nadu's most ambitious enterprise platform</h1>
          <p className="mt-4 text-base text-white/80">
            We design, ship, and scale Galactis from our headquarters in Egattur, Kancheepuram, partnering with Indian and global enterprises on IT Asset Management, Network
            Intelligence, and AI Agents. Choose a role, share your details, and our recruiting team will follow up within 48 hours.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-white/70">
            <span className="rounded-full border border-white/30 px-4 py-2">Kancheepuram HQ + Bengaluru pods</span>
            <span className="rounded-full border border-white/30 px-4 py-2">Hybrid & on-site roles</span>
            <span className="rounded-full border border-white/30 px-4 py-2">Outcome-linked bonuses</span>
          </div>
        </section>

        <CareersApplication />

        <section className="mt-12 rounded-3xl border border-purple-200 bg-purple-50 p-6 dark:border-purple-900 dark:bg-purple-950/30">
          <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100">Didn’t see the right fit?</h2>
          <p className="mt-2 text-sm text-purple-900/80 dark:text-purple-100/80">
            Email your profile to <a href="mailto:careers@galactis.ai" className="underline">careers@galactis.ai</a> with the subject “General Application”.
            We constantly open roles across product, engineering, GTM, and delivery.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

