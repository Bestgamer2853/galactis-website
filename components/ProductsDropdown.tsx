"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { Package, Network, Bot, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

// Product items with icons and descriptions
const products = [
  {
    name: "IT Asset Management (ITAM)",
    href: "/products/itam",
    icon: Package,
    description: "Complete visibility and control over your IT assets",
  },
  {
    name: "Network Monitoring",
    href: "/products/network-monitoring",
    icon: Network,
    description: "Real-time network intelligence and autonomous remediation",
  },
  {
    name: "AI Agents Platform",
    href: "/products/ai-agents",
    icon: Bot,
    description: "Autonomous agents for IT service automation",
  },
];

export default function ProductsDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-1 text-sm text-zinc-700 transition-colors hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:text-zinc-300 dark:hover:text-purple-400 dark:focus:ring-offset-zinc-900">
          Products
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-[150] min-w-[320px] rounded-xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
          sideOffset={8}
          align="start"
        >
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <DropdownMenu.Item asChild>
                  <Link
                    href={product.href}
                    className="group flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:hover:bg-purple-900/20 dark:focus:ring-purple-400"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:group-hover:bg-purple-900/50">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {product.name}
                      </div>
                      <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                        {product.description}
                      </div>
                    </div>
                  </Link>
                </DropdownMenu.Item>
              </motion.div>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

