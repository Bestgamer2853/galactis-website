import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const codeExamples = {
  python: `from galactis import GalactisClient

client = GalactisClient(api_key="YOUR_API_KEY")

agent = client.agents.create(
    name="Support Bot",
    type="chat",
    model="gpt-4",
    integrations=["salesforce", "twilio"],
)

result = client.agents.execute(
    agent_id=agent.id,
    input={"message": "Hello"},
)
print(result)`
    ,
  node: `import Galactis from "galactis-sdk";

const client = new Galactis({ apiKey: process.env.GALACTIS_KEY });

const agent = await client.agents.create({
  name: "Support Bot",
  type: "chat",
  model: "gpt-4",
  integrations: ["salesforce", "twilio"],
});

const result = await client.agents.execute(agent.id, {
  message: "Hello",
});
console.log(result);`
    ,
  go: `package main

import (
  "context"
  "log"

  "github.com/galactis-ai/galactis-go"
)

func main() {
  client := galactis.NewClient("YOUR_API_KEY")
  agent, err := client.Agents.Create(context.Background(), galactis.CreateAgentRequest{
    Name: "Support Bot",
    Type: "chat",
    Model: "gpt-4",
    Integrations: []string{"salesforce", "twilio"},
  })
  if err != nil {
    log.Fatal(err)
  }
  _ = agent
}
` } as const;

export default function SDKsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">SDKs</h1>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">Official SDKs accelerate integration with Galactis APIs.</p>
        <div className="mt-8 space-y-8">
          {Object.entries(codeExamples).map(([language, code]) => (
            <div key={language} className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="text-lg font-semibold uppercase tracking-wide">{language}</h2>
              <pre className="mt-4 overflow-x-auto rounded bg-zinc-900 p-4 text-sm text-zinc-100">
                <code>{code}</code>
              </pre>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

