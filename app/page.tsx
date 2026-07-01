"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import {
  APP_NAME,
  APP_TAGLINE,
  APP_DESCRIPTION,
  ACCENT_COLOR,
} from "@/lib/data";
import { Edit, ArrowRight, Star, Clock, Eye, Check, FileText, Sparkles, Code2 as Github, MessageCircle as Twitter, Mail, ChevronRight, Search, Heart } from 'lucide-react';

// ─── Inline mock data ────────────────────────────────────────────────────────

const TAGS = [
  { id: "t1", name: "Tecnología", slug: "tecnologia", color: "#6c63ff" },
  { id: "t2", name: "Diseño", slug: "diseno", color: "#f59e0b" },
  { id: "t3", name: "Escritura", slug: "escritura", color: "#10b981" },
  { id: "t4", name: "Productividad", slug: "productividad", color: "#ef4444" },
  { id: "t5", name: "Open Source", slug: "open-source", color: "#3b82f6" },
  { id: "t6", name: "Markdown", slug: "markdown", color: "#8b5cf6" },
];

const ARTICLES = [
  {
    id: "a1",
    title: "Por qué Markdown sigue siendo el formato de escritura más poderoso",
    slug: "markdown-formato-poderoso",
    excerpt:
      "Desde documentación técnica hasta novelas, Markdown ha demostrado ser el lenguaje de marcado más versátil y duradero de la era digital.",
    author: "Sofía Ramírez",
    authorAvatar: "/images/author-sofia-ramirez.jpg",
    publishedAt: "12 jun 2025",
    readingTime: 6,
    views: 4820,
    tags: [TAGS[5], TAGS[2]],
    coverImage: "/images/markdown-writing-desk.jpg",
    featured: true,
  },
  {
    id: "a2",
    title: "Diseño tipográfico para blogs: guía completa",
    slug: "diseno-tipografico-blogs",
    excerpt:
      "La tipografía es la voz silenciosa de tu contenido. Aprende a elegir fuentes, escala y espaciado para que tus lectores nunca quieran irse.",
    author: "Carlos Mendoza",
    authorAvatar: "/images/author-carlos-mendoza.jpg",
    publishedAt: "8 jun 2025",
    readingTime: 9,
    views: 3210,
    tags: [TAGS[1], TAGS[2]],
    coverImage: "/images/typography-design-blog.jpg",
    featured: true,
  },
  {
    id: "a3",
    title: "Cómo construir un sistema de escritura sostenible",
    slug: "sistema-escritura-sostenible",
    excerpt:
      "Escribir con consistencia no es cuestión de disciplina ciega, sino de crear un entorno y rutinas que hagan fluir las ideas de forma natural.",
    author: "Lucía Torres",
    authorAvatar: "/images/author-lucia-torres.jpg",
    publishedAt: "3 jun 2025",
    readingTime: 7,
    views: 2890,
    tags: [TAGS[2], TAGS[3]],
    coverImage: "/images/writing-system-notebook.jpg",
    featured: false,
  },
  {
    id: "a4",
    title: "Open Source y documentación: el dúo perfecto",
    slug: "open-source-documentacion",
    excerpt:
      "Los proyectos open source que triunfan tienen algo en común: documentación clara, accesible y bien mantenida. Aquí te mostramos cómo lograrlo.",
    author: "Andrés Vega",
    authorAvatar: "/images/author-andres-vega.jpg",
    publishedAt: "28 may 2025",
    readingTime: 5,
    views: 1970,
    tags: [TAGS[4], TAGS[5]],
    coverImage: "/images/open-source-documentation.jpg",
    featured: false,
  },
];

const FEATURES = [
  {
    icon: FileText,
    title: "Editor Markdown en vivo",
    description:
      "Escribe en Markdown y ve el resultado renderizado en tiempo real. Soporte completo para GFM, tablas, bloques de código y más.",
    accent: "#6c63ff",
  },
  {
    icon: Sparkles,
    title: "Resaltado de sintaxis",
    description:
      "Bloques de código con coloreado automático para más de 40 lenguajes de programación. Tu código siempre lucirá profesional.",
    accent: "#8b5cf6",
  },
  {
    icon: Eye,
    title: "Vista previa instantánea",
    description:
      "Alterna entre modo edición y vista previa con un solo clic. Lo que ves es exactamente lo que publicarás.",
    accent: "#6c63ff",
  },
  {
    icon: Search,
    title: "Búsqueda inteligente",
    description:
      "Encuentra cualquier artículo por título, etiqueta o contenido. El motor de búsqueda indexa todo tu contenido al instante.",
    accent: "#8b5cf6",
  },
  {
    icon: Heart,
    title: "Lectura sin distracciones",
    description:
      "Tipografía cuidada, espaciado generoso y modo oscuro incluido. Tus lectores disfrutarán cada párrafo.",
    accent: "#6c63ff",
  },
  {
    icon: Github,
    title: "Exportación flexible",
    description:
      "Exporta tus artículos como Markdown puro, HTML o PDF. Tu contenido siempre será tuyo, en el formato que necesites.",
    accent: "#8b5cf6",
  },
];

const TESTIMONIALS = [
  {
    id: "r1",
    quote:
      "BlogMD cambió por completo mi flujo de escritura. El editor es tan limpio que me olvido de la herramienta y me concentro en las ideas.",
    author: "Elena Fuentes",
    role: "Escritora técnica en Stripe",
    avatar: "https://researcherprofiles.org/profile/Modules/CustomViewPersonGeneralInfo/PhotoHandler.ashx?NodeID=186650",
    stars: 5,
  },
  {
    id: "r2",
    quote:
      "Llevaba años buscando una plataforma que respetara el Markdown sin añadir capas innecesarias. BlogMD es exactamente eso.",
    author: "Marcos Ibáñez",
    role: "Desarrollador y blogger",
    avatar: "https://www.rochester.edu/college/ugresearch/about/ambassadors/images-2526/ibanez-marcos.jpg",
    stars: 5,
  },
  {
    id: "r3",
    quote:
      "La vista previa en tiempo real y el resaltado de código son increíbles. Mis artículos de programación nunca habían lucido tan bien.",
    author: "Valentina Cruz",
    role: "Ingeniería de software en Vercel",
    avatar: "https://i.ytimg.com/vi/q30dKlPjbHo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAwlgMeAqQ-vB8oqzY1gSN_AlSANg",
    stars: 5,
  },
];

const MARKDOWN_DEMO = `# Bienvenido a BlogMD

Escribe con **Markdown** y publica con estilo.

## Características principales

- Editor en tiempo real
- Resaltado de sintaxis
- Exportación flexible

\`\`\`typescript
const post = {
  title: "Mi primer artículo",
  tags: ["markdown", "blog"],
  published: true,
};
\`\`\`

> "La claridad es la cortesía del escritor."
> — Ortega y Gasset`;

const RENDERED_DEMO = [
  { type: "h1", text: "Bienvenido a BlogMD" },
  { type: "p", text: "Escribe con Markdown y publica con estilo." },
  { type: "h2", text: "Características principales" },
  { type: "li", items: ["Editor en tiempo real", "Resaltado de sintaxis", "Exportación flexible"] },
  { type: "code", lang: "typescript", lines: [
    'const post = {',
    '  title: "Mi primer artículo",',
    '  tags: ["markdown", "blog"],',
    '  published: true,',
    '};',
  ]},
  { type: "blockquote", text: '"La claridad es la cortesía del escritor." — Ortega y Gasset' },
];

const STATS = [
  { value: "12 000+", label: "Artículos publicados" },
  { value: "3 400+", label: "Escritores activos" },
  { value: "98%", label: "Satisfacción de usuarios" },
  { value: "40+", label: "Lenguajes de código" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function TagPill({ tag }: { tag: typeof TAGS[0] }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: tag.color + "18", color: tag.color }}
    >
      {tag.name}
    </span>
  );
}

function ArticleCard({ article, index }: { article: typeof ARTICLES[0]; index: number }) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={shouldReduce ? {} : { y: -4 }}
      transition={{ duration: 0.25 }}
      className="group bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(108,99,255,0.18)] transition-all duration-300"
    >
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {(article.tags ?? []).slice(0, 2).map((tag) => (
            <TagPill key={tag.id} tag={tag} />
          ))}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-playfair font-bold text-lg text-[#1a1a2e] leading-snug mb-2 group-hover:text-[#6c63ff] transition-colors duration-200 text-pretty">
          {article.title}
        </h3>
        <p className="text-sm text-[#1a1a2e]/60 leading-relaxed mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={article.authorAvatar}
              alt={article.author}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-white"
            />
            <span className="text-xs font-medium text-[#1a1a2e]/70">{article.author}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#1a1a2e]/40">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {article.readingTime} min
            </span>
            <span className="flex items-center gap-1">
              <Eye size={11} />
              {(article.views ?? 0).toLocaleString("es-ES")}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");

  return (
    <main className="bg-[#f5f5f0] min-h-screen overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, #6c63ff 0%, transparent 70%)",
          }}
        />
        {/* Subtle grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#1a1a2e 1px, transparent 1px), linear-gradient(90deg, #1a1a2e 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeInUp} className="mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6c63ff]/10 border border-[#6c63ff]/20 text-[#6c63ff] text-xs font-semibold tracking-wide">
                  <Sparkles size={12} />
                  Plataforma editorial con Markdown
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl text-[#1a1a2e] leading-[1.1] tracking-tight text-balance mb-6"
              >
                {APP_TAGLINE}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-[#1a1a2e]/60 leading-relaxed mb-8 max-w-lg text-pretty"
              >
                {APP_DESCRIPTION}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                <motion.a
                  href="#editor"
                  whileHover={shouldReduce ? {} : { scale: 1.03 }}
                  whileTap={shouldReduce ? {} : { scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6c63ff] text-white font-semibold text-sm shadow-[0_2px_8px_rgba(108,99,255,0.35),0_0_0_1px_rgba(108,99,255,0.2)] hover:bg-[#5b53e8] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c63ff] focus-visible:ring-offset-2"
                >
                  <Edit size={15} />
                  Empezar a escribir
                </motion.a>
                <motion.a
                  href="#articles"
                  whileHover={shouldReduce ? {} : { scale: 1.03 }}
                  whileTap={shouldReduce ? {} : { scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-black/8 text-[#1a1a2e] font-semibold text-sm shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-[#f0f0eb] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c63ff] focus-visible:ring-offset-2"
                >
                  Explorar artículos
                  <ArrowRight size={14} />
                </motion.a>
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={fadeInUp}
                className="mt-10 flex flex-wrap gap-6"
              >
                {STATS.slice(0, 3).map((s) => (
                  <div key={s.label}>
                    <p className="font-playfair font-bold text-2xl text-[#1a1a2e]">
                      {s.value}
                    </p>
                    <p className="text-xs text-[#1a1a2e]/50 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: editor mock */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-black/8 shadow-[0_4px_8px_rgba(0,0,0,0.06),0_24px_64px_-16px_rgba(108,99,255,0.22)] bg-white">
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-[#f8f8f6] border-b border-black/6">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="ml-3 text-xs text-[#1a1a2e]/30 font-mono">
                    mi-primer-articulo.md
                  </span>
                </div>
                {/* Tab bar */}
                <div className="flex border-b border-black/6">
                  {(["editor", "preview"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-2.5 text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c63ff] ${
                        activeTab === tab
                          ? "text-[#6c63ff] border-b-2 border-[#6c63ff] bg-white"
                          : "text-[#1a1a2e]/40 hover:text-[#1a1a2e]/70"
                      }`}
                    >
                      {tab === "editor" ? "Editor" : "Vista previa"}
                    </button>
                  ))}
                </div>
                {/* Content */}
                <div className="p-5 min-h-[280px] font-mono text-xs leading-relaxed overflow-hidden">
                  {activeTab === "editor" ? (
                    <pre className="text-[#1a1a2e]/80 whitespace-pre-wrap">
                      {MARKDOWN_DEMO}
                    </pre>
                  ) : (
                    <div className="font-sans space-y-3">
                      {RENDERED_DEMO.map((block, i) => {
                        if (block.type === "h1") {
                          return (
                            <h1 key={i} className="font-playfair font-bold text-xl text-[#1a1a2e]">
                              {block.text}
                            </h1>
                          );
                        }
                        if (block.type === "h2") {
                          return (
                            <h2 key={i} className="font-playfair font-semibold text-base text-[#1a1a2e] mt-2">
                              {block.text}
                            </h2>
                          );
                        }
                        if (block.type === "p") {
                          return (
                            <p key={i} className="text-sm text-[#1a1a2e]/70">
                              {block.text}
                            </p>
                          );
                        }
                        if (block.type === "li") {
                          return (
                            <ul key={i} className="space-y-1 pl-4">
                              {(block.items ?? []).map((item, j) => (
                                <li key={j} className="text-sm text-[#1a1a2e]/70 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#6c63ff] flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        if (block.type === "code") {
                          return (
                            <div key={i} className="rounded-lg bg-[#1a1a2e] p-3 overflow-x-auto">
                              {(block.lines ?? []).map((line, j) => (
                                <div key={j} className="text-[#a5b4fc] font-mono text-xs leading-relaxed">
                                  {line}
                                </div>
                              ))}
                            </div>
                          );
                        }
                        if (block.type === "blockquote") {
                          return (
                            <blockquote key={i} className="border-l-2 border-[#6c63ff] pl-3 text-sm text-[#1a1a2e]/60 italic">
                              {block.text}
                            </blockquote>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={shouldReduce ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-black/5 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-xs font-semibold text-[#1a1a2e]">Vista previa en vivo</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ARTICLES ─────────────────────────────────────────────────────── */}
      <section id="articles" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6c63ff] mb-3 block">
                Artículos destacados
              </span>
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[#1a1a2e] tracking-tight text-balance">
                  Lo mejor de la comunidad
                </h2>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6c63ff] hover:text-[#5b53e8] transition-colors"
                >
                  Ver todos
                  <ChevronRight size={14} />
                </a>
              </div>
            </motion.div>

            {/* Featured article — full width */}
            <motion.div variants={scaleIn} className="mb-8">
              <div className="group relative rounded-2xl overflow-hidden bg-white border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_48px_-12px_rgba(108,99,255,0.2)] transition-all duration-300 grid md:grid-cols-2">
                <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto">
                  <img
                    src={ARTICLES[0]?.coverImage ?? ""}
                    alt={ARTICLES[0]?.title ?? ""}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6c63ff] text-white text-xs font-semibold">
                      <Star size={10} fill="white" />
                      Destacado
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {(ARTICLES[0]?.tags ?? []).map((tag) => (
                      <TagPill key={tag.id} tag={tag} />
                    ))}
                  </div>
                  <h3 className="font-playfair font-bold text-2xl md:text-3xl text-[#1a1a2e] leading-tight mb-3 group-hover:text-[#6c63ff] transition-colors duration-200 text-balance">
                    {ARTICLES[0]?.title}
                  </h3>
                  <p className="text-[#1a1a2e]/60 leading-relaxed mb-6 text-pretty">
                    {ARTICLES[0]?.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={ARTICLES[0]?.authorAvatar ?? ""}
                        alt={ARTICLES[0]?.author ?? ""}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#1a1a2e]">
                          {ARTICLES[0]?.author}
                        </p>
                        <p className="text-xs text-[#1a1a2e]/40">
                          {ARTICLES[0]?.publishedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#1a1a2e]/40">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {ARTICLES[0]?.readingTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {(ARTICLES[0]?.views ?? 0).toLocaleString("es-ES")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Grid of remaining articles */}
            <motion.div
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {ARTICLES.slice(1).map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section
        id="categories"
        className="py-20 md:py-28 bg-[#1a1a2e] relative overflow-hidden"
      >
        {/* Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 w-[500px] h-[400px] opacity-10"
          style={{
            background:
              "radial-gradient(ellipse at top right, #6c63ff 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="mb-12 text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6c63ff] mb-3 block">
                Categorías
              </span>
              <h2 className="font-playfair font-bold text-3xl md:text-4xl text-white tracking-tight text-balance">
                Encuentra tu tema favorito
              </h2>
              <p className="mt-4 text-white/50 max-w-lg mx-auto leading-relaxed text-pretty">
                Explora artículos organizados por categorías. Desde tecnología hasta escritura creativa, hay algo para cada lector.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {TAGS.map((tag, i) => (
                <motion.a
                  key={tag.id}
                  href="#articles"
                  variants={scaleIn}
                  whileHover={shouldReduce ? {} : { scale: 1.03, y: -2 }}
                  whileTap={shouldReduce ? {} : { scale: 0.97 }}
                  className="group relative rounded-2xl p-6 border border-white/8 bg-white/5 hover:bg-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c63ff]"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: tag.color + "22" }}
                  >
                    <span
                      className="text-lg font-playfair font-bold"
                      style={{ color: tag.color }}
                    >
                      {tag.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{tag.name}</h3>
                  <p className="text-xs text-white/40">
                    {[14, 9, 22, 7, 11, 18][i] ?? 10} artículos
                  </p>
                  <ChevronRight
                    size={14}
                    className="absolute top-5 right-5 text-white/20 group-hover:text-white/60 transition-colors"
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Split header */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div variants={slideInLeft}>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#6c63ff] mb-3 block">
                  Funcionalidades
                </span>
                <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[#1a1a2e] tracking-tight text-balance">
                  Todo lo que necesitas para escribir mejor
                </h2>
              </motion.div>
              <motion.p
                variants={slideInRight}
                className="text-[#1a1a2e]/60 leading-relaxed text-lg text-pretty"
              >
                BlogMD combina la potencia de Markdown con una interfaz diseñada para que el proceso de escritura sea fluido, agradable y sin fricciones.
              </motion.p>
            </div>

            {/* Bento grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                const isLarge = i === 0 || i === 5;
                return (
                  <motion.div
                    key={feature.title}
                    variants={fadeInUp}
                    whileHover={shouldReduce ? {} : { y: -3 }}
                    className={`group rounded-2xl p-6 bg-white border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(108,99,255,0.15)] transition-all duration-300 ${isLarge ? "lg:col-span-1" : ""}`}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: feature.accent + "15" }}
                    >
                      <Icon size={20} style={{ color: feature.accent }} />
                    </div>
                    <h3 className="font-semibold text-[#1a1a2e] mb-2 text-base">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#1a1a2e]/55 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── EDITOR DEMO ──────────────────────────────────────────────────── */}
      <section
        id="editor"
        className="py-20 md:py-28 bg-gradient-to-b from-[#f5f5f0] to-[#ede9fe]/40"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6c63ff] mb-3 block">
                Editor
              </span>
              <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[#1a1a2e] tracking-tight text-balance mb-4">
                Escribe en Markdown, publica con elegancia
              </h2>
              <p className="text-[#1a1a2e]/60 max-w-xl mx-auto leading-relaxed text-pretty">
                Nuestro editor divide la pantalla entre el código Markdown y la vista renderizada. Sin configuración, sin complicaciones.
              </p>
            </motion.div>

            {/* Full editor mock */}
            <motion.div
              variants={scaleIn}
              className="rounded-2xl overflow-hidden border border-black/8 shadow-[0_4px_8px_rgba(0,0,0,0.06),0_32px_80px_-20px_rgba(108,99,255,0.2)] bg-white"
            >
              {/* Chrome */}
              <div className="flex items-center gap-1.5 px-5 py-3.5 bg-[#f8f8f6] border-b border-black/6">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-4 text-xs text-[#1a1a2e]/30 font-mono flex-1">
                  blogmd — editor
                </span>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#6c63ff]/10 text-[#6c63ff] text-xs font-semibold">
                    Guardar
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#6c63ff] text-white text-xs font-semibold">
                    Publicar
                  </span>
                </div>
              </div>

              {/* Split pane */}
              <div className="grid md:grid-cols-2 divide-x divide-black/6 min-h-[320px]">
                {/* Left: raw markdown */}
                <div className="p-6 bg-[#fafaf8]">
                  <p className="text-xs font-semibold text-[#1a1a2e]/30 uppercase tracking-widest mb-4">
                    Markdown
                  </p>
                  <pre className="font-mono text-xs text-[#1a1a2e]/70 leading-relaxed whitespace-pre-wrap">
                    {MARKDOWN_DEMO}
                  </pre>
                </div>
                {/* Right: rendered */}
                <div className="p-6">
                  <p className="text-xs font-semibold text-[#1a1a2e]/30 uppercase tracking-widest mb-4">
                    Vista previa
                  </p>
                  <div className="space-y-3">
                    {RENDERED_DEMO.map((block, i) => {
                      if (block.type === "h1") {
                        return (
                          <h1 key={i} className="font-playfair font-bold text-xl text-[#1a1a2e]">
                            {block.text}
                          </h1>
                        );
                      }
                      if (block.type === "h2") {
                        return (
                          <h2 key={i} className="font-playfair font-semibold text-base text-[#1a1a2e] mt-2">
                            {block.text}
                          </h2>
                        );
                      }
                      if (block.type === "p") {
                        return (
                          <p key={i} className="text-sm text-[#1a1a2e]/70">
                            {block.text}
                          </p>
                        );
                      }
                      if (block.type === "li") {
                        return (
                          <ul key={i} className="space-y-1 pl-4">
                            {(block.items ?? []).map((item, j) => (
                              <li key={j} className="text-sm text-[#1a1a2e]/70 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#6c63ff] flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (block.type === "code") {
                        return (
                          <div key={i} className="rounded-lg bg-[#1a1a2e] p-3">
                            {(block.lines ?? []).map((line, j) => (
                              <div key={j} className="text-[#a5b4fc] font-mono text-xs leading-relaxed">
                                {line}
                              </div>
                            ))}
                          </div>
                        );
                      }
                      if (block.type === "blockquote") {
                        return (
                          <blockquote key={i} className="border-l-2 border-[#6c63ff] pl-3 text-sm text-[#1a1a2e]/60 italic">
                            {block.text}
                          </blockquote>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Markdown cheatsheet pills */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap gap-2 justify-center"
            >
              {[
                { syntax: "**negrita**", label: "Negrita" },
                { syntax: "_cursiva_", label: "Cursiva" },
                { syntax: "# Título", label: "Encabezado" },
                { syntax: "- lista", label: "Lista" },
                { syntax: "`código`", label: "Código" },
                { syntax: "[link](url)", label: "Enlace" },
                { syntax: "> cita", label: "Cita" },
                { syntax: "---", label: "Separador" },
              ].map((item) => (
                <span
                  key={item.syntax}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-black/8 text-xs shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  <code className="font-mono text-[#6c63ff]">{item.syntax}</code>
                  <span className="text-[#1a1a2e]/40">{item.label}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6c63ff] mb-3 block">
                Testimonios
              </span>
              <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[#1a1a2e] tracking-tight text-balance">
                Lo que dicen nuestros escritores
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6"
            >
              {TESTIMONIALS.map((t) => (
                <motion.div
                  key={t.id}
                  variants={fadeInUp}
                  whileHover={shouldReduce ? {} : { y: -4 }}
                  className="rounded-2xl p-6 bg-[#f5f5f0] border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(108,99,255,0.12)] transition-all duration-300"
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} size={13} fill="#6c63ff" className="text-[#6c63ff]" />
                    ))}
                  </div>
                  <p className="text-[#1a1a2e]/70 leading-relaxed text-sm mb-5 text-pretty">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#1a1a2e]">{t.author}</p>
                      <p className="text-xs text-[#1a1a2e]/45">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT / STATS ────────────────────────────────────────────────── */}
      <section id="about" className="py-20 md:py-28 bg-[#f5f5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left: image + floating card */}
            <motion.div variants={slideInLeft} className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_4px_8px_rgba(0,0,0,0.06),0_24px_64px_-16px_rgba(108,99,255,0.18)] border border-black/5">
                <img
                  src="https://us.123rf.com/450wm/pandorapictures/pandorapictures1801/pandorapictures180100566/94274386-young-woman-writer-in-library-at-home-creative-occupation-working-on-typewriter.jpg"
                  alt="Escritora trabajando con BlogMD"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stats card */}
              <motion.div
                variants={scaleIn}
                className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-black/5 min-w-[180px]"
              >
                <div className="grid grid-cols-2 gap-4">
                  {STATS.map((s) => (
                    <div key={s.label}>
                      <p className="font-playfair font-bold text-xl text-[#6c63ff]">
                        {s.value}
                      </p>
                      <p className="text-xs text-[#1a1a2e]/50 mt-0.5 leading-tight">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: copy */}
            <motion.div variants={slideInRight}>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6c63ff] mb-3 block">
                Acerca de BlogMD
              </span>
              <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[#1a1a2e] tracking-tight text-balance mb-6">
                Construido para escritores que se toman en serio su oficio
              </h2>
              <p className="text-[#1a1a2e]/60 leading-relaxed mb-5 text-pretty">
                BlogMD nació de la frustración con plataformas que añaden capas de complejidad innecesaria. Creemos que la escritura debe ser el centro de la experiencia, no la herramienta.
              </p>
              <p className="text-[#1a1a2e]/60 leading-relaxed mb-8 text-pretty">
                Markdown es el lenguaje de los escritores modernos: limpio, portable y universal. Nosotros lo tomamos como base y construimos alrededor de él una experiencia editorial completa.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Sin suscripciones ocultas ni límites de artículos",
                  "Tu contenido siempre exportable en formato abierto",
                  "Diseño accesible y optimizado para la lectura",
                  "Comunidad activa de escritores y desarrolladores",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#1a1a2e]/70">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#6c63ff]/12 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-[#6c63ff]" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 flex-wrap">
                <motion.a
                  href="#editor"
                  whileHover={shouldReduce ? {} : { scale: 1.03 }}
                  whileTap={shouldReduce ? {} : { scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6c63ff] text-white font-semibold text-sm shadow-[0_2px_8px_rgba(108,99,255,0.3)] hover:bg-[#5b53e8] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c63ff] focus-visible:ring-offset-2"
                >
                  <Edit size={14} />
                  Probar el editor
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={shouldReduce ? {} : { scale: 1.03 }}
                  whileTap={shouldReduce ? {} : { scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-black/8 text-[#1a1a2e] font-semibold text-sm hover:bg-[#f0f0eb] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c63ff] focus-visible:ring-offset-2"
                >
                  <Github size={14} />
                  Ver en GitHub
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#1a1a2e] relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 60% 50%, rgba(108,99,255,0.18) 0%, transparent 65%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={scaleIn} className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#6c63ff]/20 border border-[#6c63ff]/30 mb-6">
                <Edit size={28} className="text-[#6c63ff]" />
              </div>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair font-bold text-3xl md:text-5xl text-white tracking-tight text-balance mb-5"
            >
              Tu próximo gran artículo empieza aquí
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/50 leading-relaxed mb-8 text-lg text-pretty"
            >
              Únete a miles de escritores que ya publican con claridad y estilo. El editor te espera, sin registro previo.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-3 justify-center"
            >
              <motion.a
                href="#editor"
                whileHover={shouldReduce ? {} : { scale: 1.04 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#6c63ff] text-white font-semibold shadow-[0_2px_8px_rgba(108,99,255,0.4),0_0_0_1px_rgba(108,99,255,0.3)] hover:bg-[#5b53e8] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c63ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a2e]"
              >
                <Edit size={16} />
                Abrir el editor gratis
              </motion.a>
              <motion.a
                href="#articles"
                whileHover={shouldReduce ? {} : { scale: 1.04 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/8 border border-white/12 text-white font-semibold hover:bg-white/14 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Leer artículos
                <ArrowRight size={15} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}