import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "API Keys",
    items: ["Create and rotate keys", "Granular scopes", "Audit logs"],
  },
  {
    title: "Usage & Billing",
    items: ["Real-time usage charts", "Projected spend", "Budget alerts"],
  },
  {
    title: "Rate Limits",
    items: ["Current quota", "Burst limits", "Upgrade paths"],
  },
  {
    title: "Logs & Debugging",
    items: ["Request/response logs", "Webhook replay", "Agent run traces"],
  },
];

export default function DeveloperConsolePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Developer Console</h1>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">Manage keys, monitor usage, and debug agents in real time.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

