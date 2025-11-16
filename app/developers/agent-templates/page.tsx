import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const templates = [
  {
    title: "Voice Agent (IVR)",
    description: "Multi-lingual IVR with intent routing, ServiceNow integration, and live escalation triggers.",
  },
  {
    title: "Chat Agent (Support)",
    description: "Omnichannel support bot with Salesforce case creation and Twilio handoff.",
  },
  {
    title: "Workflow Agent (Approvals)",
    description: "Automated approval routing with Slack notifications and audit logs.",
  },
  {
    title: "RPA Agent (Data Entry)",
    description: "UiPath-powered data entry bot orchestrated by Galactis agents.",
  },
];

export default function AgentTemplatesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Agent Templates</h1>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">Accelerate deployment with pre-configured agent blueprints.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {templates.map((template) => (
            <div key={template.title} className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="text-lg font-semibold">{template.title}</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{template.description}</p>
              <button className="mt-4 rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700">
                Request Template
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

