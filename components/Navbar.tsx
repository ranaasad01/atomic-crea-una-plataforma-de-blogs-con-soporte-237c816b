"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, navCTA, APP_NAME } from "@/lib/data";
import { Menu, X, Edit } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setIsOpen(false);
    }
  }

  function getHref(href: string): string {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0d1a]/95 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] border-b border-white/5"
          : "bg-transparent"
      }`}
      data-atomic-id="aft31a8">
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        data-atomic-id="abn8cyn">
        <div
          className="flex items-center justify-between h-16"
          data-atomic-id="a1sn6r0g">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c63ff] rounded-lg"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2"
            >
              <div
                className="w-8 h-8 rounded-lg bg-[#6c63ff] flex items-center justify-center shadow-[0_2px_8px_rgba(108,99,255,0.35)]"
                data-atomic-id="a1i2vbaj">
                <Edit size={14} className="text-white" strokeWidth={2.5} />
              </div>
              <span
                className="font-playfair font-bold text-xl text-[#e2e8f0] tracking-tight"
                data-atomic-id="aa5targ">
                {APP_NAME}
              </span>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <div
            className="hidden md:flex items-center gap-1"
            data-atomic-id="awzmkjt">
            {navLinks.map((link) => {
              const isHome = link.href === "/";
              const isActive =
                isHome ? pathname === "/" : false;

              return (
                <Link
                  key={link.href}
                  href={getHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c63ff] ${
                    isActive
                      ? "text-[#6c63ff]"
                      : "text-[#e2e8f0]/70 hover:text-[#e2e8f0] hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-[#6c63ff]/8"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <Link
              href={getHref(navCTA.href)}
              onClick={(e) => handleAnchorClick(e, navCTA.href)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#6c63ff] text-white text-sm font-medium hover:bg-[#5a52e0] transition-colors shadow-[0_2px_8px_rgba(108,99,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c63ff] focus-visible:ring-offset-2"
            >
              <Edit size={13} strokeWidth={2.5} />
              {navCTA.label}
            </Link>

            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[#e2e8f0]/70 hover:text-[#e2e8f0] hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c63ff]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0d0d1a] border-t border-white/5 shadow-lg"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isHome = link.href === "/";
                const isActive = isHome ? pathname === "/" : false;

                return (
                  <Link
                    key={link.href}
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-[#6c63ff] bg-[#6c63ff]/8"
                        : "text-[#e2e8f0]/70 hover:text-[#e2e8f0] hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-white/5 mt-1">
                <Link
                  href={getHref(navCTA.href)}
                  onClick={(e) => handleAnchorClick(e, navCTA.href)}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#6c63ff] text-white text-sm font-medium hover:bg-[#5a52e0] transition-colors"
                >
                  <Edit size={13} strokeWidth={2.5} />
                  {navCTA.label}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
