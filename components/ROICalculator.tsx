"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

export default function ROICalculator() {
  const [assets, setAssets] = useState(5000);
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [hourlyCost, setHourlyCost] = useState(80);

  const annualSavings = useMemo(() => {
    const manualAnnual = hoursPerWeek * 52 * hourlyCost;
    const automationFactor = 0.9; // 90% automation potential
    const wasteReduction = 0.3; // 30% waste reduction
    const savings = manualAnnual * automationFactor + assets * wasteReduction;
    return Math.max(0, Math.round(savings));
  }, [assets, hoursPerWeek, hourlyCost]);

  return (
    <section className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <h3 className="text-lg font-semibold">ROI Calculator</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm"># of IT Assets</label>
          <input
            type="number"
            className="mt-1 w-full rounded-md border border-zinc-300 p-2 dark:border-zinc-700 dark:bg-zinc-900"
            value={assets}
            onChange={(e) => {
              trackEvent("estimator_used", { type: "roi", field: "assets" });
              setAssets(parseInt(e.target.value || "0", 10));
            }}
          />
        </div>
        <div>
          <label className="block text-sm">Current Manual Effort (hrs/week)</label>
          <input
            type="number"
            className="mt-1 w-full rounded-md border border-zinc-300 p-2 dark:border-zinc-700 dark:bg-zinc-900"
            value={hoursPerWeek}
            onChange={(e) => {
              trackEvent("estimator_used", { type: "roi", field: "hours" });
              setHoursPerWeek(parseInt(e.target.value || "0", 10));
            }}
          />
        </div>
        <div>
          <label className="block text-sm">Average Hourly Cost (USD)</label>
          <input
            type="number"
            className="mt-1 w-full rounded-md border border-zinc-300 p-2 dark:border-zinc-700 dark:bg-zinc-900"
            value={hourlyCost}
            onChange={(e) => {
              trackEvent("estimator_used", { type: "roi", field: "hourlyCost" });
              setHourlyCost(parseInt(e.target.value || "0", 10));
            }}
          />
        </div>
      </div>
      <div className="mt-6 rounded-md bg-emerald-50 p-4 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
        Estimated Annual Savings: <span className="font-semibold">${annualSavings.toLocaleString()}</span>
      </div>
    </section>
  );
}

