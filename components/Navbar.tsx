"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProductsDropdown from "./ProductsDropdown";
import SolutionsDropdown from "./SolutionsDropdown";
import MobileMenu from "./MobileMenu";
import HubSpotContactModal from "./HubSpotContactModal";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative text-sm font-medium text-zinc-700 transition-colors hover:text-purple-600 dark:text-zinc-300 dark:hover:text-purple-400"
    >
      <span className="relative">
        {children}
        <motion.span
          className="absolute -bottom-1 left-0 h-0.5 w-0 bg-purple-600 dark:bg-purple-400"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </span>
    </Link>
  );
}

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-[120] w-full border-b border-zinc-100/60 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800/60 dark:bg-black/60"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Link href="/" className="flex items-center gap-1 md:gap-1.5 text-zinc-900 dark:text-zinc-100 overflow-visible">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex items-center justify-center overflow-visible"
            >
              <img 
                src="/galactis-logo.svg" 
                alt="Galactis.ai company logo, stylized geometric 'G' with blue-purple gradient" 
                className="h-12 md:h-14 w-auto flex-shrink-0"
                style={{ display: "block", maxWidth: "none", objectFit: "contain" }}
              />
            </motion.div>
            <span className="text-lg md:text-xl font-semibold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent leading-none">
              Galactis.ai
            </span>
          </Link>
        </motion.div>
        <nav className="hidden items-center gap-6 md:flex">
          <ProductsDropdown />
          <SolutionsDropdown />
          <NavLink href="/resources/blog">Blog</NavLink>
          <NavLink href="/partner">Partners</NavLink>
          <NavLink href="/company/careers">Careers</NavLink>
          <NavLink href="/company/about">Company</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <HubSpotContactModal 
            triggerText="Contact Sales"
            triggerClassName="group relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50"
          />
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}

