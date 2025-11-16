import IndustryPage from "@/components/IndustryPage";

export default function ContactCentersPage() {
  return (
    <IndustryPage
      title="Contact Centers"
      subtitle="TCPA and GDPR compliant customer engagement with AI-powered voice, chat, and workflow automation."
      pains={[
        "High agent turnover drives inconsistent CX and rising operational costs.",
        "Legacy IVR and siloed systems prolong handle times and lower CSAT.",
        "Regulatory compliance (TCPA, GDPR) requires robust consent and data handling controls.",
      ]}
      solutions={[
        "AI agents triage and resolve Tier 1 inquiries with sentiment-aware escalation.",
        "Integrated knowledge base and workflow automation reduce handle time by surfacing next-best actions.",
        "Consent tracking, call recording governance, and automated compliance reporting.",
      ]}
      compliance={["TCPA", "GDPR", "PCI-DSS", "SOC2", "ISO 27001"]}
      caseStudy={{
        client: "Skyline Contact Services",
        challenge: "Rising call volumes and regulatory scrutiny created backlog and fines.",
        solution: "Galactis deployed voice and chat agents integrated with CRM, QA analytics, and compliance workflows.",
        result: "30% reduction in average handle time and 18-point increase in NPS within 90 days.",
      }}
      metrics={[
        { label: "Average Handle Time", value: "30% reduction" },
        { label: "First Contact Resolution", value: "+22% improvement" },
        { label: "Compliance Exceptions", value: "Zero TCPA violations post-deployment" },
      ]}
    />
  );
}

