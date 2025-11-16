import IndustryPage from "@/components/IndustryPage";

export default function TelecomPage() {
  return (
    <IndustryPage
      title="Telecommunications"
      subtitle="CALEA and CPNI compliant operations for carriers, ISPs, and media networks with AI-driven service assurance."
      pains={[
        "Complex hybrid networks create blind spots leading to SLA breaches.",
        "Regulatory compliance requires lawful intercept readiness and subscriber data governance.",
        "Manual remediation slows response to outages impacting contact center and consumer services.",
      ]}
      solutions={[
        "Topology-aware observability across core, edge, 5G, and cloud workloads.",
        "Policy enforcement and audit trails for lawful intercept and CPNI obligations.",
        "Automated runbooks integrating with NOC, SOC, and field operations systems.",
      ]}
      compliance={["CALEA", "CPNI", "GDPR", "ISO 27001", "SOC2"]}
      caseStudy={{
        client: "Northwind Telecom",
        challenge: "Frequent SLA penalties due to slow outage detection and manual coordination.",
        solution: "Galactis correlated telemetry, predicted incidents, and automated comms workflows.",
        result: "42% reduction in P1 incidents and 60% faster customer notifications.",
      }}
      metrics={[
        { label: "SLA Compliance", value: "98.8% adherence vs 93% baseline" },
        { label: "Incident Volume", value: "P1 events down 42%" },
        { label: "Truck Rolls", value: "26% fewer field dispatches" },
      ]}
    />
  );
}

