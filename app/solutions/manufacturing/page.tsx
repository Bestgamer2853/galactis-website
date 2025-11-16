import IndustryPage from "@/components/IndustryPage";

export default function ManufacturingPage() {
  return (
    <IndustryPage
      title="Manufacturing"
      subtitle="ITAR and CMMC aligned operations for smart factories, discrete manufacturing, and process industries."
      pains={[
        "Operational technology (OT) assets lack lifecycle governance and security visibility.",
        "Production downtime incurs significant revenue loss and missed delivery windows.",
        "Export controls and defense regulations require strict data and access controls.",
      ]}
      solutions={[
        "Unified inventory for IT, OT, and IIoT assets with software license optimization and maintenance scheduling.",
        "Predictive monitoring for MES, SCADA, PLCs, and connected equipment with automated failover.",
        "Controlled data flows, encryption, and audit reporting for ITAR, EAR, and CMMC compliance.",
      ]}
      compliance={["ITAR", "CMMC", "NIST 800-171", "ISO 27001", "SOC2"]}
      caseStudy={{
        client: "Axiom Manufacturing Corp",
        challenge: "Legacy systems and manual processes created export compliance risk and production downtime.",
        solution: "Galactis provided unified asset intelligence, automated remediation, and compliance evidence packs.",
        result: "Achieved CMMC Level 3 readiness and reduced unplanned downtime by 37%.",
      }}
      metrics={[
        { label: "Downtime", value: "37% reduction in unplanned outages" },
        { label: "Compliance Audits", value: "Passed 3rd party assessments with zero findings" },
        { label: "Maintenance Costs", value: "22% reduction via predictive scheduling" },
      ]}
    />
  );
}

