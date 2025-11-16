"use client";

const partners = [
  { name: "ICICI Bank", metric: "ITAM & compliance automation" },
  { name: "HDFC Bank", metric: "Network resilience & monitoring" },
  { name: "Infosys", metric: "AI agent orchestration" },
  { name: "TCS", metric: "Enterprise IT asset governance" },
  { name: "Apollo Hospitals", metric: "HIPAA-ready infrastructure ops" },
  { name: "TVS Motors", metric: "Manufacturing ITAM & automation" },
  { name: "Airtel", metric: "Predictive network assurance" },
  { name: "Ashok Leyland", metric: "OT/IT convergence platform" },
];

export default function CustomersMarquee() {
  return (
    <section className="bg-white py-12 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-100 bg-zinc-50/60 p-8 dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="flex flex-col gap-2 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600">Proof in production</p>
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                Trusted by digital, network, and operations leaders worldwide
              </h3>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Regulated industries rely on Galactis for ITAM, NOC, and AI agent modernization.
            </p>
          </div>
          <div className="relative mt-8 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-zinc-50 dark:from-zinc-900" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-zinc-50 dark:from-zinc-900" />
            <div className="flex min-w-full gap-4 py-3 animate-marquee">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="min-w-[220px] rounded-2xl border border-white/40 bg-white/80 px-4 py-3 text-left shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80"
                >
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{partner.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{partner.metric}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

