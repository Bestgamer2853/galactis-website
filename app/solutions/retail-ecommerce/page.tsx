import IndustryPage from "@/components/IndustryPage";

export default function RetailEcommercePage() {
  return (
    <IndustryPage
      title="Retail & E-commerce"
      subtitle="PCI-DSS and GDPR compliant digital commerce operations with peak season resilience and omni-channel automation."
      pains={[
        "Seasonal demand spikes strain infrastructure and fulfillment processes.",
        "SKU proliferation and vendor sprawl complicate software licensing and subscription waste.",
        "Customer experience depends on accurate inventory, personalized engagement, and rapid support.",
      ]}
      solutions={[
        "Hybrid IT asset visibility across stores, warehouses, and digital platforms with FinOps guardrails.",
        "AI agents automate customer care, returns, price adjustments, and supply chain workflows.",
        "Real-time monitoring of POS, e-commerce, and fulfillment systems with automated remediation.",
      ]}
      compliance={["PCI-DSS", "GDPR", "CCPA", "SOC2", "ISO 27001"]}
      caseStudy={{
        client: "Cascade Retail Group",
        challenge: "Fragmented tooling led to stockouts, overages, and rising support costs.",
        solution: "Galactis unified asset inventory, automated demand-response workflows, and deployed AI service bots.",
        result: "18% increase in on-time fulfillment and $6.5M in annualized savings.",
      }}
      metrics={[
        { label: "Order Accuracy", value: "+14% improvement" },
        { label: "Support Efficiency", value: "60% of Tier 1 inquiries automated" },
        { label: "IT Spend", value: "$6.5M cost avoidance" },
      ]}
    />
  );
}

