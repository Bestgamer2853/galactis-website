'use client';
import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { convertUSDtoINR, formatIndianNumber, USD_TO_INR_RATE } from '@/lib/currency';

export default function HomepageROICalculator() {
  // Default budget in INR (₹1.77 Cr = ~$2M USD)
  const defaultBudgetINR = convertUSDtoINR(2000000);
  const [assets, setAssets] = useState(5000);
  const [budget, setBudget] = useState(defaultBudgetINR);
  const [hours, setHours] = useState(40);

  // Calculate savings in INR (convert hourly cost first)
  const hourlyCostINR = convertUSDtoINR(80);
  const savings = Math.round(budget * 0.3 + hours * 52 * hourlyCostINR * 0.9);
  const timeSaved = Math.round(hours * 52 * 0.9);
  // ROI calculation: assume ₹50 per asset (converted from USD)
  const assetCostINR = convertUSDtoINR(50);
  const roi = Math.round((savings / (assets * assetCostINR)) * 100);

  const handleGetReport = () => {
    trackEvent('roi_calculator_submitted', { assets, budget, hours, savings });
    window.location.href = '/contact?source=roi-calculator';
  };

  return (
    <section className="bg-gradient-to-br from-purple-50 to-teal-50 py-20 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
            Calculate Your Potential Savings
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            See how much your organization could save with Galactis
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Number of IT Assets: <span className="font-semibold text-purple-600">{assets.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={assets}
                onChange={(e) => setAssets(parseInt(e.target.value))}
                className="mt-2 w-full accent-purple-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Annual IT Budget (₹)</label>
              <input
                type="text"
                value={budget.toLocaleString('en-IN')}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  setBudget(parseInt(val) || 0);
                }}
                placeholder="1,77,00,000"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-lg dark:border-gray-700 dark:bg-gray-900"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Default: {formatIndianNumber(defaultBudgetINR)} (~$2M USD)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Manual Hours/Week: <span className="font-semibold text-purple-600">{hours}</span>
              </label>
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="mt-2 w-full accent-purple-600"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl border-2 border-purple-200 bg-white p-8 shadow-xl dark:border-purple-900 dark:bg-gray-950">
            <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-400">Your Potential Results</h3>
            <dl className="mt-6 space-y-6">
              <div>
                <dt className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Annual Savings</dt>
                <dd className="mt-1 text-4xl font-bold text-green-600 dark:text-green-400">{formatIndianNumber(savings)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Time Saved</dt>
                <dd className="mt-1 text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {timeSaved.toLocaleString()} <span className="text-2xl">hrs/year</span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">ROI</dt>
                <dd className="mt-1 text-4xl font-bold text-purple-600 dark:text-purple-400">{roi}%</dd>
              </div>
            </dl>
            <button
              onClick={handleGetReport}
              className="mt-8 w-full rounded-lg bg-purple-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-purple-700"
            >
              Get Custom ROI Report
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


