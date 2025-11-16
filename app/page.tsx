import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import GA from "@/components/GA";
import JsonLd from "@/components/JsonLd";
import CustomersMarquee from "@/components/CustomersMarquee";
import StatsSection from "@/components/StatsSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ContactSalesModal from "@/components/ContactSalesModal";
import WhyGalactis from "@/components/WhyGalactis";
import HomepageROICalculator from "@/components/HomepageROICalculator";
import CaseStudyCards from "@/components/CaseStudyCards";
import PlatformBlueprint from "@/components/PlatformBlueprint";
import UseCaseTabs from "@/components/UseCaseTabs";
import EnterpriseCTA from "@/components/EnterpriseCTA";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedValueProposition from "@/components/AnimatedValueProposition";
import AnimatedProductCards from "@/components/AnimatedProductCards";
import IndustrySpotlightCards from "@/components/IndustrySpotlightCards";
import InsightHighlightCards from "@/components/InsightHighlightCards";
import { ArrowUpRight, Code2, Shield, Share2 } from "lucide-react";
import Link from "next/link";

const productSuite = [
  {
    name: "IT Asset Management",
    summary: "Know every asset, contract, and risk in one living system.",
    bullets: [
      "Effective License Position + FinOps scenario planning",
      "Autonomous reclamation workflows with guardrails",
      "Compliance packs for PCI-DSS, SOX, FFIEC, ISO 27001",
    ],
    metrics: ["₹8 Lakhs waste removed", "85% shadow IT eliminated"],
    href: "/products/itam",
    accent: "from-purple-500 via-indigo-500 to-purple-700",
  },
  {
    name: "Network Monitoring",
    summary: "Predict, diagnose, and resolve incidents with AI copilots.",
    bullets: [
      "Topology graph for hybrid, multi-cloud, and edge estates",
      "Blast radius + customer impact scoring before pages fire",
      "Closed-loop automation with ServiceNow, PagerDuty, Slack",
    ],
    metrics: ["99.95% uptime", "42% fewer P1 incidents"],
    href: "/products/network-monitoring",
    accent: "from-sky-500 via-cyan-500 to-emerald-500",
  },
  {
    name: "AI Agents Platform",
    summary: "Design multimodal agents with governance, telemetry, and human approvals baked in.",
    bullets: [
      "Visual studio for LLM prompts, APIs, RPA, and people",
      "Knowledge + policy layer with redaction and residency",
      "Operations cockpit with drift detection and rollback",
    ],
    metrics: ["120K calls automated", "24% cost-to-serve reduction"],
    href: "/products/ai-agents",
    accent: "from-amber-500 via-rose-500 to-fuchsia-500",
  },
];

const industrySpotlights = [
  {
    industry: "Financial Services",
    summary: "PCI-DSS, SOX, and FFIEC-aligned controls across trading, retail banking, and insurance.",
    bullets: ["$3.2M audit risk avoided", "90% faster evidence packs"],
    href: "/solutions/financial-services",
  },
  {
    industry: "Telecommunications",
    summary: "CALEA and CPNI compliance with predictive service assurance for 5G, core, and edge.",
    bullets: ["42% fewer P1 incidents", "60% faster customer comms"],
    href: "/solutions/telecommunications",
  },
  {
    industry: "Healthcare & Life Sciences",
    summary: "HIPAA-ready IT + biomedical operations with validation workflows and PHI guardrails.",
    bullets: ["0 PHI findings", "75% faster compliance documentation"],
    href: "/solutions/healthcare",
  },
];

const builderHighlights = [
  {
    title: "API-first platform",
    body: "OpenAPI 3.1 spec, Postman collection, and CLI from galactis.ai/developers.",
    icon: Code2,
  },
  {
    title: "Compliance-aware sandboxes",
    body: "Mirrors production controls for SOC 2, ISO 27001, HIPAA, and GDPR.",
    icon: Shield,
  },
  {
    title: "Connectors & events",
    body: "200+ integrations plus streaming into EventBridge, Kafka, or webhooks.",
    icon: Share2,
  },
];

const insightHighlights = [
  {
    type: "Case study",
    title: "Tier-1 Global Bank",
    snippet: "$3.2M audit risk avoided; 28% software waste reduction.",
    href: "/resources/case-studies",
  },
  {
    type: "Guide",
    title: "Network Automation Reference Kit",
    snippet: "Reference architectures and integration tips we share during partner enablement.",
    href: "/resources/case-studies",
  },
  {
    type: "Blog",
    title: "Architecting Agentic Workflows for Regulated Industries",
    snippet: "Design patterns for AI agents with governance, approvals, and audit trails.",
    href: "/resources/blog",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans dark:bg-black">
      <GA />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Galactis.ai",
          url: "https://galactis.ai",
          logo: "https://galactis.ai/logo.png",
          description:
            "Enterprise ITAM, Network Monitoring & AI Agents Platform",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-XXX-XXX-XXXX",
            contactType: "sales",
            areaServed: "Worldwide",
          },
          sameAs: [
            "https://linkedin.com/company/galactis-ai",
            "https://twitter.com/galactis_ai",
          ],
        }}
      />
      <Navbar />
      <main className="scroll-smooth">
        <Hero />
        <WhyGalactis />
        <CustomersMarquee />
        <ScrollReveal direction="up" delay={0.2}>
          <section className="bg-white py-12 dark:bg-black sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <AnimatedValueProposition />
            </div>
          </section>
        </ScrollReveal>
        <ScrollReveal direction="fade" delay={0.3}>
          <section className="bg-white py-16 dark:bg-black">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-600">
                    Galactis platform
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-zinc-900 dark:text-white">
                    One operating system, three critical domains
                  </h2>
                  <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
                    Content below pulls straight from the product pages so you can skim capabilities without leaving the homepage.
                  </p>
                </div>
              </ScrollReveal>
              <AnimatedProductCards products={productSuite} />
            </div>
          </section>
        </ScrollReveal>
        <HomepageROICalculator />
        <StatsSection />
        <FeatureHighlights />
        <section className="bg-gradient-to-b from-zinc-50 to-white py-20 dark:from-zinc-900 dark:to-black">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-600">
                Industry operating models
              </p>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Extracted from our solutions pages</h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400">
                Each card summarizes the pain, solution, and KPIs published on galactis.ai/solutions for regulated industries.
              </p>
            </div>
            <IndustrySpotlightCards spotlights={industrySpotlights} />
          </div>
        </section>
        <TestimonialCarousel />
        <CaseStudyCards />
        <section className="bg-zinc-900 py-20 text-white dark:bg-black">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Build on Galactis</p>
                <h2 className="mt-3 text-3xl font-bold text-white">Developers, architects, and integrators welcome</h2>
                <p className="mt-3 text-base text-white/70">
                  Highlights mirror what’s available on the Developers section: API reference, SDKs, integrations, and agent templates.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-xs">
                  <span className="rounded-full border border-white/30 px-4 py-2">OpenAPI 3.1</span>
                  <span className="rounded-full border border-white/30 px-4 py-2">Python · Node.js · Go · Java SDKs</span>
                  <span className="rounded-full border border-white/30 px-4 py-2">200+ integrations</span>
                </div>
                <Link
                  href="/developers"
                  className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
                >
                  Visit developers hub
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-4">
                {builderHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                  >
                    <div className="rounded-2xl bg-white/10 p-3">
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-white/70">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-16 dark:bg-black">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-600">Insights & research</p>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Taken from the actual resources library</h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400">
                Blog posts and case studies that already live under /resources.
              </p>
            </div>
            <InsightHighlightCards insights={insightHighlights} />
          </div>
        </section>
        <PlatformBlueprint />
        <UseCaseTabs />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <EnterpriseCTA />
        </div>
      </main>
      <Footer />
    </div>
  );
}
