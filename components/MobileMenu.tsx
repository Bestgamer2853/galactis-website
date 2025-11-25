"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, ChevronDown } from "lucide-react";
import HubSpotContactModal from "./HubSpotContactModal";

const navItems = [
  { label: "Partners", href: "/partner" },
  { label: "Careers", href: "/company/careers" },
  { label: "Company", href: "/company/about" },
  { label: "Pricing", href: "/pricing" },
];

const products = [
  {
    name: "IT Asset Management (ITAM)",
    href: "/products/itam",
    description: "Complete visibility and control over your IT assets",
  },
  {
    name: "Network Monitoring",
    href: "/products/network-monitoring",
    description: "Real-time network intelligence and autonomous remediation",
  },
  {
    name: "AI Agents Platform",
    href: "/products/ai-agents",
    description: "Autonomous agents for IT service automation",
  },
];

const solutions = [
  {
    name: "Financial Services",
    href: "/solutions/financial-services",
    description: "PCI-DSS, SOX, FFIEC-aligned IT operations",
  },
  {
    name: "Telecommunications",
    href: "/solutions/telecommunications",
    description: "CALEA/CPNI compliance with predictive assurance",
  },
  {
    name: "Healthcare & Life Sciences",
    href: "/solutions/healthcare",
    description: "HIPAA-ready clinical, biomedical, and AI ops",
  },
  {
    name: "Manufacturing & Logistics",
    href: "/solutions/logistics-supply-chain",
    description: "Supply chain, OT, and logistics telemetry + automation",
  },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleLinkClick = () => {
    setOpen(false);
    setProductsOpen(false);
    setSolutionsOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-zinc-700 transition-colors hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 md:hidden dark:text-zinc-300 dark:hover:text-purple-400"
          aria-label="Toggle menu"
        >
          <motion.div
            animate={open ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {open ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.div>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <AnimatePresence>
          {open && (
            <>
              {/* Overlay */}
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                />
              </Dialog.Overlay>

              {/* Menu Content */}
              <Dialog.Content asChild>
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl dark:bg-zinc-950"
                >
                  <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-800">
                      <Link
                        href="/"
                        onClick={handleLinkClick}
                        className="flex items-center gap-1 text-zinc-900 dark:text-zinc-100 overflow-visible"
                      >
                        <img 
                          src="/galactis-logo.svg" 
                          alt="Galactis.ai company logo, stylized geometric 'G' with blue-purple gradient" 
                          className="h-10 md:h-12 w-auto flex-shrink-0"
                          style={{ display: "block", maxWidth: "none", objectFit: "contain" }}
                        />
                        <span className="text-lg font-semibold leading-none">Galactis.ai</span>
                      </Link>
                      <Dialog.Close asChild>
                        <button
                          className="p-2 text-zinc-700 transition-colors hover:text-purple-600 dark:text-zinc-300 dark:hover:text-purple-400"
                          aria-label="Close menu"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </Dialog.Close>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 overflow-y-auto p-4">
                      <div className="space-y-2">
                        {/* Products Dropdown (Mobile) */}
                        <div>
                          <button
                            onClick={() => setProductsOpen(!productsOpen)}
                            className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-zinc-900 transition-colors hover:bg-purple-50 dark:text-zinc-100 dark:hover:bg-purple-900/20"
                          >
                            <span>Products</span>
                            <motion.div
                              animate={{ rotate: productsOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="h-5 w-5" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {productsOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-2 space-y-1 pl-4">
                                  {products.map((product, index) => (
                                    <motion.div
                                      key={product.href}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                    >
                                      <Link
                                        href={product.href}
                                        onClick={handleLinkClick}
                                        className="block rounded-lg px-4 py-2 text-sm text-zinc-700 transition-colors hover:bg-purple-50 hover:text-purple-600 dark:text-zinc-300 dark:hover:bg-purple-900/20 dark:hover:text-purple-400"
                                      >
                                        <div className="font-medium">{product.name}</div>
                                        <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                                          {product.description}
                                        </div>
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Solutions Dropdown (Mobile) */}
                        <div>
                          <button
                            onClick={() => setSolutionsOpen(!solutionsOpen)}
                            className="mt-2 flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-zinc-900 transition-colors hover:bg-purple-50 dark:text-zinc-100 dark:hover:bg-purple-900/20"
                          >
                            <span>Solutions</span>
                            <motion.div
                              animate={{ rotate: solutionsOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="h-5 w-5" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {solutionsOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-2 space-y-1 pl-4">
                                  {solutions.map((solution, index) => (
                                    <motion.div
                                      key={solution.href}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                    >
                                      <Link
                                        href={solution.href}
                                        onClick={handleLinkClick}
                                        className="block rounded-lg px-4 py-2 text-sm text-zinc-700 transition-colors hover:bg-purple-50 hover:text-purple-600 dark:text-zinc-300 dark:hover:bg-purple-900/20 dark:hover:text-purple-400"
                                      >
                                        <div className="font-medium">{solution.name}</div>
                                        <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                                          {solution.description}
                                        </div>
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Other Navigation Items */}
                        {navItems.map((item, index) => (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay:
                                ((productsOpen ? products.length : 0) + (solutionsOpen ? solutions.length : 0)) * 0.05 +
                                index * 0.05,
                            }}
                          >
                            <Link
                              href={item.href}
                              onClick={handleLinkClick}
                              className="block rounded-lg px-4 py-3 text-base font-medium text-zinc-900 transition-colors hover:bg-purple-50 dark:text-zinc-100 dark:hover:bg-purple-900/20"
                            >
                              {item.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </nav>

                    {/* Footer Actions */}
                    <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
                      <div onClick={handleLinkClick}>
                        <HubSpotContactModal 
                          variant="link"
                          triggerText="Contact Sales"
                          triggerClassName="block w-full rounded-md bg-purple-600 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-purple-700"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

