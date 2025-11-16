import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const integrations = [
  { name: "ServiceNow", description: "ITSM incidents, CMDB, workflows." },
  { name: "Salesforce", description: "CRM sync, case routing, opportunity intelligence." },
  { name: "Twilio", description: "Programmable voice and messaging for agents." },
  { name: "cm.com", description: "Telephony and messaging orchestration." },
  { name: "n8n", description: "Agentic workflow automation across SaaS." },
  { name: "Zapier", description: "Low-code workflow automation triggers." },
  { name: "UiPath", description: "RPA bots combined with AI agents." },
  { name: "LangChain", description: "LLM chains and prompt orchestration." },
  { name: "Hugging Face", description: "Model hub connectors for specialized models." },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Integrations</h1>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">Pre-built connectors accelerate deployments with existing systems.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {integrations.map((integration) => (
            <div key={integration.name} className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="text-lg font-semibold">{integration.name}</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{integration.description}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

