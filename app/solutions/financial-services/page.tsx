import IndustryPage from "@/components/IndustryPage";

export default function FinancialServicesPage() {
  return (
    <IndustryPage
      title="Financial Services"
      subtitle="PCI-DSS and SOX-aligned controls with technology value optimization across banking, insurance, and capital markets."
      pains={[
        "Siloed asset inventories and shadow IT increase compliance exposure.",
        "Regulators demand auditable evidence of software license usage and access.",
        "Operational resilience requirements mandate rapid incident response and service continuity.",
      ]}
      solutions={[
        "Unified ITAM + FinOps visibility with license optimization across trading floors, data centers, and cloud.",
        "Automated evidence packs for PCI-DSS, SOX, FFIEC, and regional regulations.",
        "AI-assisted incident response with change control integration for cyber resiliency.",
      ]}
      compliance={["PCI-DSS", "SOX", "FFIEC", "GLBA", "ISO 27001"]}
      caseStudy={{
        client: "Tier-1 Global Bank",
        challenge: "Fragmented software inventories created $4M in true-up risk during vendor audit.",
        solution: "Galactis normalized contracts, reconciled usage, and automated compliance reporting.",
        result: "$3.2M in avoided penalties and 35% reduction in annual maintenance spend.",
      }}
      metrics={[
        { label: "License Compliance", value: "100% attested across 12 regulators" },
        { label: "Audit Preparation", value: "90% faster evidence collection" },
        { label: "Operational Resilience", value: "99.95% uptime across trading platforms" },
      ]}
    />
  );
}

