import IndustryPage from "@/components/IndustryPage";

export default function HealthcarePage() {
  return (
    <IndustryPage
      title="Healthcare & Life Sciences"
      subtitle="HIPAA-compliant IT operations with validated processes for providers, payers, pharma, and medical device organizations."
      pains={[
        "Protected Health Information (PHI) sprawl creates audit and privacy risk.",
        "Legacy biomedical devices lack visibility and security patch governance.",
        "Regulatory change (FDA 21 CFR Part 11, EU MDR) demands traceable quality records.",
      ]}
      solutions={[
        "End-to-end asset catalog across clinical, biomedical, and research environments.",
        "Network segmentation insights and automated remediation for vulnerable devices.",
        "Validation workflows capturing electronic signatures, approvals, and audit trails.",
      ]}
      compliance={["HIPAA", "HITECH", "FDA 21 CFR Part 11", "GDPR", "EU MDR"]}
      caseStudy={{
        client: "Integrated Healthcare Network",
        challenge: "Inconsistent device inventories and manual compliance documentation.",
        solution: "Galactis unified ITAM/CMDB, automated validation workflows, and monitored PHI access.",
        result: "Eliminated 24 audit findings and accelerated onboarding of new clinics by 40%.",
      }}
      metrics={[
        { label: "PHI Exposure", value: "Zero critical findings post-implementation" },
        { label: "Compliance Documentation", value: "75% reduction in manual effort" },
        { label: "Device Uptime", value: "99.7% availability across clinical assets" },
      ]}
    />
  );
}

