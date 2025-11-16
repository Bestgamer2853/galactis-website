import IndustryPage from "@/components/IndustryPage";

export default function GovernmentPage() {
  return (
    <IndustryPage
      title="Government & Public Sector"
      subtitle="FedRAMP and FISMA aligned SaaS + AI operations for federal, state, and local agencies with sovereign control."
      pains={[
        "Legacy systems and fragmented inventories hinder mission readiness.",
        "Compliance mandates (FedRAMP, FISMA, CJIS) demand continuous monitoring and documentation.",
        "Budget oversight requires transparency into IT spend, utilization, and modernization ROI.",
      ]}
      solutions={[
        "Unified asset catalog with lifecycle and cost controls across on-prem, cloud, and edge deployments.",
        "Continuous diagnostics and mitigation (CDM) dashboards with automated POA&M tracking.",
        "AI agents automate citizen services, case management, and inter-agency workflows with security guardrails.",
      ]}
      compliance={["FedRAMP", "FISMA", "CJIS", "NIST 800-53", "StateRAMP"]}
      caseStudy={{
        client: "State Transportation Agency",
        challenge: "Limited visibility into IT assets and rising costs across 120 districts.",
        solution: "Galactis deployed centralized ITAM, FinOps dashboards, and AI-powered service automation.",
        result: "$12M budget reallocation towards modernization initiatives and improved citizen satisfaction.",
      }}
      metrics={[
        { label: "Budget Reallocation", value: "$12M redirected to mission programs" },
        { label: "Compliance Reporting", value: "Real-time dashboards with 100% control coverage" },
        { label: "Citizen Satisfaction", value: "+15 point increase in survey scores" },
      ]}
    />
  );
}

