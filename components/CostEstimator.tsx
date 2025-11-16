"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

export default function CostEstimator() {
  const [agents, setAgents] = useState(10);
  const [callsPerMonth, setCallsPerMonth] = useState(2000);
  const [messagesPerMonth, setMessagesPerMonth] = useState(10000);
  const [workflowsPerDay, setWorkflowsPerDay] = useState(500);
  const [model, setModel] = useState<"saas" | "aiaas">("saas");

  const estimate = useMemo(() => {
    const saasPerAgent = 99; // placeholder unit price
    const tokenCostPer1M = 5; // placeholder
    const callMinuteCost = 0.02; // placeholder
    const workflowCost = 0.001; // placeholder
    if (model === "saas") {
      return agents * saasPerAgent;
    }
    const tokenMsgs = (messagesPerMonth / 1000) * tokenCostPer1M; // rough proxy
    const callMinutes = callsPerMonth * 3 * callMinuteCost; // avg 3 mins per call
    const workflows = workflowsPerDay * 30 * workflowCost;
    return Math.round(tokenMsgs + callMinutes + workflows);
  }, [agents, callsPerMonth, messagesPerMonth, workflowsPerDay, model]);

  return (
    <section className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">AI Agents Cost Estimator</h3>
        <div className="flex items-center gap-2 text-sm">
          <button
            className={`rounded-md px-3 py-1 ${model === "saas" ? "bg-purple-600 text-white" : "border border-zinc-300 dark:border-zinc-700"}`}
            onClick={() => {
              setModel("saas");
              trackEvent("estimator_used", { type: "cost", model: "saas" });
            }}
          >
            SaaS
          </button>
          <button
            className={`rounded-md px-3 py-1 ${model === "aiaas" ? "bg-purple-600 text-white" : "border border-zinc-300 dark:border-zinc-700"}`}
            onClick={() => {
              setModel("aiaas");
              trackEvent("estimator_used", { type: "cost", model: "aiaas" });
            }}
          >
            AIaaS
          </button>
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <div>
          <label className="block text-sm"># of Agents</label>
          <input
            type="number"
            className="mt-1 w-full rounded-md border border-zinc-300 p-2 dark:border-zinc-700 dark:bg-zinc-900"
            value={agents}
            onChange={(e) => {
              trackEvent("estimator_used", { type: "cost", field: "agents" });
              setAgents(parseInt(e.target.value || "0", 10));
            }}
          />
        </div>
        <div>
          <label className="block text-sm">Calls / month</label>
          <input
            type="number"
            className="mt-1 w-full rounded-md border border-zinc-300 p-2 dark:border-zinc-700 dark:bg-zinc-900"
            value={callsPerMonth}
            onChange={(e) => {
              trackEvent("estimator_used", { type: "cost", field: "calls" });
              setCallsPerMonth(parseInt(e.target.value || "0", 10));
            }}
          />
        </div>
        <div>
          <label className="block text-sm">Messages / month</label>
          <input
            type="number"
            className="mt-1 w-full rounded-md border border-zinc-300 p-2 dark:border-zinc-700 dark:bg-zinc-900"
            value={messagesPerMonth}
            onChange={(e) => {
              trackEvent("estimator_used", { type: "cost", field: "messages" });
              setMessagesPerMonth(parseInt(e.target.value || "0", 10));
            }}
          />
        </div>
        <div>
          <label className="block text-sm">Workflows / day</label>
          <input
            type="number"
            className="mt-1 w-full rounded-md border border-zinc-300 p-2 dark:border-zinc-700 dark:bg-zinc-900"
            value={workflowsPerDay}
            onChange={(e) => {
              trackEvent("estimator_used", { type: "cost", field: "workflows" });
              setWorkflowsPerDay(parseInt(e.target.value || "0", 10));
            }}
          />
        </div>
      </div>
      <div className="mt-6 rounded-md bg-indigo-50 p-4 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300">
        Estimated Monthly Cost: <span className="font-semibold">${estimate.toLocaleString()}</span>
      </div>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Contact Sales for enterprise pricing and volume discounts.</p>
    </section>
  );
}

