"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks, APP_NAME, APP_TAGLINE } from "@/lib/data";
import { Edit, Code2 as Github, MessageCircle as Twitter, Mail } from 'lucide-react';
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerSections = [
  {
    title: "Navegación",
    links: navLinks,
  },
  {
    title: "Recursos",
    links: [
      { label: "Guía de Markdown", href: "#editor" },
      { label: "Atajos de teclado", href: "#editor" },
      { label: "Exportar artículos", href: "#editor" },
    ],
  },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Mail, label: "Contacto", href: "#" },
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
    <footer className="bg-[#1a1a2e] text-white/80">
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
              <span className="font-playfair font-bold text-xl text-white tracking-tight">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-white/55 leading-relaxed max-w-xs">
              {APP_TAGLINE}
            </p>
            <p className="mt-3 text-sm text-white/40 leading-relaxed max-w-xs">
              Una plataforma editorial para escritores que valoran la claridad y
              el buen diseño.
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
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c63ff]"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Nav sections */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={getHref(link.href)}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-sm text-white/55 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c63ff] rounded"
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
        <div className="py-5 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            &copy; 2024 {APP_NAME}. Hecho con dedicación para escritores.
          </p>
          <p className="text-xs text-white/20">
            Construido con Next.js, TypeScript y Markdown
          </p>
        </div>
      </div>
    </footer>
  );
}