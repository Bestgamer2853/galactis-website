import { CheckCircle, Linkedin, Instagram, Sparkles } from "lucide-react";
import Link from "next/link";

const productLinks = [
  { label: "IT Asset Management", href: "/products/itam" },
  { label: "Network Monitoring", href: "/products/network-monitoring" },
  { label: "AI Agents Platform", href: "/products/ai-agents" },
];

const solutionLinks = [
  { label: "Financial Services", href: "/solutions/financial-services" },
  { label: "Telecommunications", href: "/solutions/telecommunications" },
  { label: "Healthcare & Life Sciences", href: "/solutions/healthcare" },
  { label: "Manufacturing & Logistics", href: "/solutions/logistics-supply-chain" },
];

const resourceLinks = [
  { label: "Blog", href: "/resources/blog" },
  { label: "Case Studies", href: "/resources/case-studies" },
  { label: "Developers", href: "/developers" },
];

const companyLinks = [
  { label: "About", href: "/company" },
  { label: "Leadership", href: "/company/leadership" },
  { label: "Careers", href: "/careers" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 text-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-[#040216] via-[#0c0828] to-[#041a1f]" />
      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div>
              <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <img 
                src="/galactis-logo.svg" 
                  alt="Galactis.ai logo"
                  className="h-10 w-auto"
              />
                <span className="text-base font-semibold tracking-wide text-white dark:text-white">Galactis.ai</span>
            </Link>
              <p className="text-sm text-white/70">
                The leading platform for technology leaders. ITAM, NetOps, and AI agents.
            </p>
              <div className="mt-4 space-y-1 text-xs text-white/60">
              <p>info@galactis.ai</p>
                <p>Wing A, Greenwood · Rajiv Gandhi Salai · Chennai, IN</p>
              </div>
              <div className="mt-5 flex gap-3">
                <FooterSocial href="https://www.linkedin.com/company/galactisaitech/posts/?feedView=all" label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </FooterSocial>
                <FooterSocial href="https://www.instagram.com/galactis_tech/" label="Instagram">
                  <Instagram className="h-4 w-4" />
                </FooterSocial>
            </div>
          </div>
          <FooterColumn heading="Products" links={productLinks} />
          <FooterColumn heading="Solutions" links={solutionLinks} />
          <FooterColumn heading="Resources" links={resourceLinks} />
            <FooterColumn heading="Company" links={companyLinks} />
      </div>

          <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">Security</p>
                <p className="text-lg font-semibold text-white">Enterprise certifications</p>
                <p className="text-xs text-white/70">
                  Mapped to the documents hosted on galactis.ai/security. Request evidence any time.
              </p>
            </div>
              <div className="flex flex-wrap gap-3">
              {["SOC 2 Type II", "ISO 27001", "HIPAA", "GDPR"].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide">
                    <CheckCircle className="h-4 w-4 text-emerald-300" />
                    {badge}
                </div>
              ))}
            </div>
              <Link
              href="/security"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-white"
            >
              View security brief →
              </Link>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Galactis.ai · All rights reserved</p>
              <div className="flex items-center gap-2 text-white/60">
                <Sparkles className="h-4 w-4 text-purple-300" />
                Easter egg: ask the homepage chatbot “What’s the Sense-Decide-Act mantra?” for a surprise meme.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterSocial({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="rounded-full border border-white/20 p-2 text-white/70 transition hover:border-white hover:text-white"
    >
      {children}
    </a>
  );
}

function FooterColumn({
  heading,
  links,
  className = "",
}: {
  heading: string;
  links: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">{heading}</h3>
      <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
        {links.map((link) => (
          <li key={link.label}>
            <a className="transition hover:text-purple-600 dark:hover:text-purple-400" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

