"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProductsDropdown from "./ProductsDropdown";
import SolutionsDropdown from "./SolutionsDropdown";
import MobileMenu from "./MobileMenu";
import { useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";

function MagneticButton({ children, href, className = "" }: { children: React.ReactNode; href: string; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.2;
    const deltaY = (e.clientY - centerY) * 0.2;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div style={{ x: springX, y: springY }}>
      <Link
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        className={className}
      >
        {children}
      </Link>
    </motion.div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative text-sm font-medium text-zinc-700 transition-colors dark:text-zinc-300"
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
          <Link href="/" className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
            <motion.span
              className="h-6 w-6 rounded bg-gradient-to-br from-purple-500 to-emerald-500"
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <span className="font-semibold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
              Galactis.ai
            </span>
          </Link>
        </motion.div>
        <nav className="hidden items-center gap-6 md:flex">
          <ProductsDropdown />
          <SolutionsDropdown />
          <NavLink href="/partners">Partners</NavLink>
          <NavLink href="/company/careers">Careers</NavLink>
          <NavLink href="/company/about">Company</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <MagneticButton
            href="/contact"
            className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
            />
            <span className="relative">Contact Sales</span>
          </MagneticButton>
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}

