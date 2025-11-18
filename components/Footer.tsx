import { CheckCircle } from "lucide-react";
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
  { label: "About", href: "/company/about" },
  { label: "Leadership", href: "/company/leadership" },
  { label: "Careers", href: "/company/careers" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100/60 bg-white text-sm dark:border-zinc-900 dark:bg-black">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100">
              <img 
                src="/galactis-logo.svg" 
                alt="Galactis.ai company logo, stylized geometric 'G' with blue-purple gradient" 
                className="h-10 w-auto flex-shrink-0"
                style={{ display: "block", maxWidth: "none", objectFit: "contain" }}
              />
              <span className="text-base font-semibold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent leading-none">
                Galactis.ai
              </span>
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Modern ITAM, network intelligence, and AI agent orchestration sourced from the same operational data.
            </p>
            <div className="mt-4 space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
              <p>info@galactis.ai</p>
              <p className="leading-relaxed">
                Wing A, Greenwood,<br />
                Rajiv Gandhi Salai,<br />
                Egattur, Kancheepuram,<br />
                Tamil Nadu - 603103
              </p>
            </div>
          </div>
          <FooterColumn heading="Products" links={productLinks} />
          <FooterColumn heading="Solutions" links={solutionLinks} />
          <FooterColumn heading="Resources" links={resourceLinks} />
          <FooterColumn heading="Company" links={companyLinks} className="md:col-span-1" />
        </div>
      </div>

      <div className="border-t border-zinc-100 bg-gray-50 py-8 dark:border-zinc-900/80 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Enterprise security & compliance</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Information below reflects the certifications listed on galactis.ai/security.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {["SOC 2 Type II", "ISO 27001", "HIPAA", "GDPR"].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="/security"
              className="text-sm font-semibold text-purple-600 transition hover:text-purple-700 dark:text-purple-400"
            >
              View security brief →
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100 py-6 text-center text-xs text-zinc-500 dark:border-zinc-900 dark:text-zinc-400">
        © {new Date().getFullYear()} Galactis.ai · All rights reserved
      </div>
    </footer>
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

