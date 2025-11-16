import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Security & Compliance</h1>
        <section className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Data Protection",
              points: [
                "AES-256 encryption at rest, TLS 1.3 in transit",
                "Customer-managed encryption keys available",
                "Field-level encryption for PHI, PCI, and PII data",
              ],
            },
            {
              title: "Compliance & Governance",
              points: [
                "SOC 2 Type II, ISO 27001, GDPR, HIPAA",
                "FedRAMP Moderate authorization in progress",
                "Regular third-party audits and continuous control monitoring",
              ],
            },
            {
              title: "Operational Resilience",
              points: [
                "Active-active architecture across US, EU, and APAC regions",
                "RPO < 15 minutes; RTO < 1 hour",
                "Quarterly disaster recovery exercises with executive sign-off",
              ],
            },
            {
              title: "Secure Development",
              points: [
                "Shift-left security with SAST, DAST, SCA pipelines",
                "Mandatory threat modeling and peer review for all releases",
                "Bug bounty program and coordinated disclosure",
              ],
            },
          ].map((pillar) => (
            <div key={pillar.title} className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{pillar.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                {pillar.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section className="mt-12 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Privacy & Data Residency</h2>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            Choose regional hosting in the United States, European Union, or Asia-Pacific. Data processing agreements (DPAs) and Standard Contractual Clauses (SCCs) are available. Optional single-tenant and sovereign deployments ensure data never leaves your jurisdiction.
          </p>
        </section>
        <section className="mt-12 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Security Operations</h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>• 24/7 SOC monitoring with automated threat detection and response.</li>
            <li>• Monthly penetration testing by CREST-certified partners.</li>
            <li>• Vulnerability disclosure program with <a href="mailto:security@galactis.ai" className="text-purple-600">security@galactis.ai</a>.</li>
          </ul>
        </section>
        <section className="mt-12 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Talk to our Security Team</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Email <a href="mailto:dpo@galactis.ai" className="text-purple-600">dpo@galactis.ai</a> for privacy inquiries or <a href="mailto:security@galactis.ai" className="text-purple-600">security@galactis.ai</a> for incident coordination.
          </p>
          <a href="/contact" className="mt-4 inline-block rounded-md border border-purple-600 px-4 py-2 text-sm font-semibold text-purple-600 hover:bg-purple-100">Schedule a briefing</a>
        </section>
      </main>
      <Footer />
    </div>
  );
}

