"use client";

import { useState } from "react";

type Job = {
  title: string;
  location: string;
  type: "Full time" | "Contract";
  mode: "On-site" | "Hybrid" | "Remote";
  summary: string;
};

const jobs: Job[] = [
  {
    title: "Platform Engineer – ITAM & Automation",
    location: "Chennai • India",
    type: "Full time",
    mode: "On-site",
    summary: "Build the core Galactis platform that powers IT Asset Management, network intelligence, and AI agent workflows.",
  },
  {
    title: "Network Reliability Engineer",
    location: "Chennai • India",
    type: "Full time",
    mode: "Hybrid",
    summary: "Extend our predictive NOC automation stack with telemetry collectors, topology logic, and remediation runbooks.",
  },
  {
    title: "Implementation Specialist – Enterprise Pilots",
    location: "Bengaluru • India",
    type: "Full time",
    mode: "Hybrid",
    summary: "Lead go-lives for BFSI and telecom customers, connecting Galactis to ServiceNow, cloud, and security systems.",
  },
  {
    title: "Customer Success & Value Lead",
    location: "Chennai • India",
    type: "Full time",
    mode: "Hybrid",
    summary: "Own KPI tracking and executive reviews for our Chennai-built programs, ensuring expansion and advocacy.",
  },
];

export default function CareersApplication() {
  const [selectedJob, setSelectedJob] = useState<Job>(jobs[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      linkedin: formData.get("linkedin"),
      portfolio: formData.get("portfolio"),
      message: formData.get("message"),
      job: selectedJob.title,
    };
    setStatus("loading");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <section className="mt-12 grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
      <div className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">Choose a role</p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Core openings in Chennai & Bengaluru</h2>
        </div>
        <div className="space-y-3">
          {jobs.map((job) => (
            <button
              key={job.title}
              onClick={() => setSelectedJob(job)}
              className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                selectedJob.title === job.title
                  ? "border-purple-500 bg-purple-50 shadow-sm dark:border-purple-700 dark:bg-purple-900/20"
                  : "border-zinc-200 hover:border-purple-300 dark:border-zinc-800 dark:hover:border-purple-600"
              }`}
            >
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{job.title}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {job.location} • {job.type} • {job.mode}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">{job.summary}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <form
        action={handleSubmit}
        className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">Apply for</div>
        <h3 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{selectedJob.title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">{selectedJob.location}</p>

        <div className="mt-6 grid gap-4">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Name *
            <input
              name="name"
              required
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-purple-400 dark:focus:ring-purple-900/40"
            />
          </label>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Email *
            <input
              type="email"
              name="email"
              required
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:text-zinc-100"
            />
          </label>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Phone / WhatsApp
            <input
              name="phone"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:text-zinc-100"
            />
          </label>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            LinkedIn or Portfolio URL
            <input
              name="linkedin"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:text-zinc-100"
            />
          </label>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Attach Resume (URL)
            <input
              name="portfolio"
              placeholder="Link to Drive, Notion, etc."
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:text-zinc-100"
            />
          </label>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Tell us about your impact
            <textarea
              name="message"
              rows={4}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-zinc-700 dark:text-zinc-100"
              placeholder="Share your proudest project or why Galactis is the right next step."
            />
          </label>
        </div>

        <input type="hidden" name="job" value={selectedJob.title} />

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-6 w-full rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:opacity-60"
        >
          {status === "loading" ? "Submitting..." : status === "success" ? "Received! We'll reply soon" : "Submit application"}
        </button>
        {status === "error" && (
          <p className="mt-2 text-sm text-red-600">Something went wrong. Email us at careers@galactis.ai instead.</p>
        )}
      </form>
    </section>
  );
}

