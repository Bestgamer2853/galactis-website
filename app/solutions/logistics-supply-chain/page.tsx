import IndustryPage from "@/components/IndustryPage";

export default function LogisticsPage() {
  return (
    <IndustryPage
      title="Logistics & Supply Chain"
      subtitle="TSA and C-TPAT compliant visibility across warehouses, fleets, and global trade operations with resilient automation."
      pains={[
        "Fragmented systems obscure asset location, maintenance, and chain-of-custody.",
        "Network outages disrupt warehouse automation, TMS, and customer commitments.",
        "Regulatory and contractual obligations demand tamper-proof audit logs and security.",
      ]}
      solutions={[
        "Real-time tracking of hardware, IoT devices, and software entitlements across global operations.",
        "Predictive incident response for WMS, TMS, and fleet-telematics integrations.",
        "AI agents orchestrate customs documentation, compliance workflows, and customer updates.",
      ]}
      compliance={["TSA", "C-TPAT", "ISO 28000", "SOC2", "GDPR"]}
      caseStudy={{
        client: "Orbit Logistics",
        challenge: "Visibility gaps and manual compliance processes slowed cross-border shipments.",
        solution: "Galactis delivered unified asset telemetry, compliance automation, and AI-driven customer notifications.",
        result: "Cut customs clearance delays by 45% and improved OTIF by 19%.",
      }}
      metrics={[
        { label: "On-Time Delivery", value: "+19% OTIF performance" },
        { label: "Compliance Processing", value: "45% faster customs documentation" },
        { label: "Operational Cost", value: "$3.1M annual savings" },
      ]}
    />
  );
}

