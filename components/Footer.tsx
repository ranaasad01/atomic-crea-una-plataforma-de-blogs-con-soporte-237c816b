"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks, APP_NAME, APP_TAGLINE } from "@/lib/data";
import { Edit, Code2 as Github, MessageCircle as Twitter, Mail } from 'lucide-react';
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerSections = [
  {
    title: "Navigation",
    links: navLinks,
  },
  {
    title: "Resources",
    links: [
      { label: "Markdown Guide", href: "#editor" },
      { label: "Keyboard shortcuts", href: "#editor" },
      { label: "Export articles", href: "#editor" },
    ],
  },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Mail, label: "Contact", href: "#" },
];

export default function Footer() {
  const pathname = usePathname();

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
    }
  }

  function getHref(href: string): string {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  return (
    <footer className="bg-[#e2e2e2] text-[#1a1a2e]/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="py-16 grid grid-cols-1 md:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c63ff] rounded-lg"
            >
              <div className="w-8 h-8 rounded-lg bg-[#6c63ff] flex items-center justify-center shadow-[0_2px_8px_rgba(108,99,255,0.4)]">
                <Edit size={14} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-playfair font-bold text-xl text-[#1a1a2e] tracking-tight">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-[#1a1a2e]/55 leading-relaxed max-w-xs">
              {APP_TAGLINE}
            </p>
            <p className="mt-3 text-sm text-[#1a1a2e]/40 leading-relaxed max-w-xs">
              An editorial platform for writers who value clarity and great design.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-[#1a1a2e]/5 border border-[#1a1a2e]/10 flex items-center justify-center text-[#1a1a2e]/50 hover:text-[#1a1a2e] hover:bg-[#1a1a2e]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c63ff]"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Nav sections */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#1a1a2e]/30 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={getHref(link.href)}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-sm text-[#1a1a2e]/60 hover:text-[#1a1a2e] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-[#1a1a2e]/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#1a1a2e]/40">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-[#1a1a2e]/30">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}