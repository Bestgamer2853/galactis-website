"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Job = {
  title: string;
  department: string;
  location: string;
  employmentType: "Full time" | "Contract";
  locationType: "On-site" | "Hybrid" | "Remote";
  compensation: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
};

const jobs: Job[] = [
  {
    title: "AI Researcher",
    department: "Engineering",
    location: "San Francisco",
    employmentType: "Full time",
    locationType: "On-site",
    compensation: "$180K – $320K + Equity",
    summary:
      "Work with our Product and Network Intelligence teams to design large language agent architectures, reinforcement learning guardrails, and safety tooling that power enterprise deployments.",
    responsibilities: [
      "Prototype and benchmark multi-agent orchestration strategies with real customer data sets.",
      "Partner with Security to operationalize alignment + governance frameworks for regulated industries.",
      "Publish internal research notes and mentor engineers adopting the AI Agents Studio.",
    ],
    qualifications: [
      "6+ years of applied research experience in NLP, RLHF, or multi-agent systems.",
      "Shipped ML models that serve enterprise users at scale.",
      "Comfort presenting complex concepts to non-technical stakeholders.",
    ],
  },
  {
    title: "Data Engineer",
    department: "Engineering",
    location: "San Francisco",
    employmentType: "Full time",
    locationType: "On-site",
    compensation: "$160K – $260K + Equity",
    summary:
      "Own the ingestion and normalization pipelines that power IT Asset Management and Network Monitoring analytics for global enterprises.",
    responsibilities: [
      "Design streaming pipelines for IT, telco, and OT telemetry (Kafka, Snowflake, dbt).",
      "Build observability dashboards for SLA-backed data services.",
      "Collaborate with Product to expose data contracts to customer teams.",
    ],
    qualifications: [
      "5+ years in data engineering or infrastructure.",
      "Expertise in Python/TypeScript plus modern data stack tools.",
      "Experience working with compliance or regulated data sets is a plus.",
    ],
  },
  {
    title: "Customer Solutions Architect",
    department: "Customer Experience",
    location: "New York",
    employmentType: "Full time",
    locationType: "Hybrid",
    compensation: "$150K – $220K + Bonus",
    summary:
      "Translate customer requirements into blueprints that leverage ITAM, Network, and AI Agents modules. Lead pilots end-to-end across financial services and telecom accounts.",
    responsibilities: [
      "Run discovery workshops covering integrations, compliance, and success metrics.",
      "Create deployment architectures and executive-ready business cases.",
      "Partner with Delivery and Success to ensure pilots graduate to expansion.",
    ],
    qualifications: [
      "7+ years in solutions consulting, delivery architecture, or enterprise presales.",
      "Background across ITSM, observability, or automation platforms.",
      "Excellent storytelling and executive facilitation skills.",
    ],
  },
  {
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Remote (US)",
    employmentType: "Full time",
    locationType: "Remote",
    compensation: "$130K – $180K + Bonus",
    summary:
      "Own pipeline creation for strategic industries with narrative-driven campaigns and analyst relations programs.",
    responsibilities: [
      "Build integrated campaigns targeting CIO, COO, and CISO personas.",
      "Manage analyst relationships and coordinate thought leadership launches.",
      "Instrument multi-touch attribution and collaborate with Sales Dev.",
    ],
    qualifications: [
      "5+ years B2B growth or product marketing experience.",
      "Proven track record partnering with enterprise sales teams.",
      "Strong writing skills and familiarity with revenue tooling (HubSpot, 6sense).",
    ],
  },
  {
    title: "Network Reliability Engineer",
    department: "Engineering",
    location: "Bengaluru",
    employmentType: "Full time",
    locationType: "Hybrid",
    compensation: "₹55L – ₹85L + Equity",
    summary:
      "Extend our predictive NOC automation engine with autonomous remediation playbooks and telco-grade observability connectors.",
    responsibilities: [
      "Develop topology-aware automations leveraging ServiceNow, PagerDuty, and custom runbooks.",
      "Contribute to low-latency data collectors for routers, firewalls, and 5G infrastructure.",
      "Work closely with Customer Success on pilot tuning and RCA workshops.",
    ],
    qualifications: [
      "Hands-on experience with network protocols, observability, or SRE teams.",
      "Strong TypeScript or Go skills; Python a plus.",
      "Comfortable interfacing with customers during escalations.",
    ],
  },
];

const allDepartments = ["All departments", ...Array.from(new Set(jobs.map((job) => job.department)))];
const allLocations = ["All locations", ...Array.from(new Set(jobs.map((job) => job.location)))];
const allEmploymentTypes = ["All types", ...Array.from(new Set(jobs.map((job) => job.employmentType)))];

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="flex flex-col text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-purple-400 dark:focus:ring-purple-900/40"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function JobBoard() {
  const [departmentFilter, setDepartmentFilter] = useState(allDepartments[0]);
  const [locationFilter, setLocationFilter] = useState(allLocations[0]);
  const [employmentFilter, setEmploymentFilter] = useState(allEmploymentTypes[0]);
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const dept = departmentFilter === allDepartments[0] || job.department === departmentFilter;
      const location = locationFilter === allLocations[0] || job.location === locationFilter;
      const type = employmentFilter === allEmploymentTypes[0] || job.employmentType === employmentFilter;
      return dept && location && type;
    });
  }, [departmentFilter, locationFilter, employmentFilter]);

  const groupedJobs = useMemo(() => {
    return filteredJobs.reduce<Record<string, Job[]>>((acc, job) => {
      acc[job.department] = acc[job.department] || [];
      acc[job.department].push(job);
      return acc;
    }, {});
  }, [filteredJobs]);

  const [selectedJob, setSelectedJob] = useState<Job>(jobs[0]);

  const effectiveSelectedJob =
    filteredJobs.length > 0 ? filteredJobs.find((job) => job.title === selectedJob.title) ?? filteredJobs[0] : null;

  return (
    <section className="mt-16 rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-purple-600">Open Positions</p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {filteredJobs.length} roles across product, engineering, GTM, and customer teams
          </h2>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <Select label="Department" value={departmentFilter} onChange={setDepartmentFilter} options={allDepartments} />
          <Select label="Location" value={locationFilter} onChange={setLocationFilter} options={allLocations} />
          <Select
            label="Employment type"
            value={employmentFilter}
            onChange={setEmploymentFilter}
            options={allEmploymentTypes}
          />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-8">
          {filteredJobs.length === 0 && (
            <div className="rounded-2xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
              No roles match those filters yet. Adjust the filters or{" "}
              <Link href="/contact" className="font-semibold text-purple-600 dark:text-purple-400">
                reach out to recruiting
              </Link>{" "}
              and we’ll keep you in mind for future openings.
            </div>
          )}
          {Object.entries(groupedJobs).map(([dept, deptJobs]) => (
            <div key={dept}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">{dept}</h3>
              <div className="mt-4 space-y-3">
                {deptJobs.map((job) => (
                  <button
                    key={job.title}
                    onClick={() => setSelectedJob(job)}
                    className={`w-full rounded-2xl border px-5 py-4 text-left transition hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 ${
                      effectiveSelectedJob?.title === job.title
                        ? "border-purple-500 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/20"
                        : "border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{job.title}</p>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {job.department} • {job.location} • {job.employmentType} • {job.locationType}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          {effectiveSelectedJob ? (
            <>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                <button
                  onClick={() => setSelectedJob(filteredJobs[0])}
                  className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-600 hover:text-purple-500"
                >
                  All Jobs
                </button>
              </div>
              <h3 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{effectiveSelectedJob.title}</h3>
              <div className="mt-4 grid gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                <Meta label="Location" value={effectiveSelectedJob.location} />
                <Meta label="Employment Type" value={effectiveSelectedJob.employmentType} />
                <Meta label="Location Type" value={effectiveSelectedJob.locationType} />
                <Meta label="Department" value={effectiveSelectedJob.department} />
                <Meta label="Compensation" value={effectiveSelectedJob.compensation} />
              </div>
              <div className="mt-6 space-y-4 text-sm text-zinc-700 dark:text-zinc-200">
                <section>
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-purple-600">Overview</p>
                  <p className="mt-2 leading-relaxed">{effectiveSelectedJob.summary}</p>
                </section>
                <section>
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-purple-600">What you’ll work on</p>
                  <ul className="mt-2 space-y-2">
                    {effectiveSelectedJob.responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-purple-600">What you’ll bring</p>
                  <ul className="mt-2 space-y-2">
                    {effectiveSelectedJob.qualifications.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`mailto:careers@galactis.ai?subject=Application - ${encodeURIComponent(
                    effectiveSelectedJob.title,
                  )}`}
                  className="flex-1 rounded-xl bg-purple-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  Apply now
                </Link>
                <Link
                  href="/contact"
                  className="flex-1 rounded-xl border border-zinc-300 px-4 py-3 text-center text-sm font-semibold text-zinc-900 transition hover:border-zinc-500 dark:border-zinc-700 dark:text-zinc-100"
                >
                  Talk to recruiting
                </Link>
              </div>
            </>
          ) : (
            <p className="text-sm text-zinc-600 dark:text-zinc-300">Select a role to see more details.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">{label}</p>
      <p className="mt-1 font-medium text-zinc-900 dark:text-zinc-100">{value}</p>
    </div>
  );
}


