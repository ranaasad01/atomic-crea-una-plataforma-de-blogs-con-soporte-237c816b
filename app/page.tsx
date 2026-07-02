"use client";

import { useRef, useState } from "react";
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
  { id: "t1", name: "Technology", slug: "technology", color: "#6c63ff", count: 2 },
  { id: "t2", name: "Design", slug: "design", color: "#f59e0b", count: 1 },
  { id: "t3", name: "Writing", slug: "writing", color: "#10b981", count: 3 },
  { id: "t4", name: "Productivity", slug: "productivity", color: "#ef4444", count: 2 },
  { id: "t5", name: "Open Source", slug: "open-source", color: "#3b82f6", count: 2 },
  { id: "t6", name: "Markdown", slug: "markdown", color: "#8b5cf6", count: 1 },
];

const ARTICLES = [
  {
    id: "a1",
    title: "Getting Started with Markdown: A Beginner's Guide",
    slug: "getting-started-with-markdown",
    excerpt:
      "Markdown is the simplest way to add formatting to plain text. This guide walks you through everything you need to know — from headings and lists to code blocks and tables — so you can start writing beautifully structured content today.",
    author: "Alex Johnson",
    authorAvatar: "/images/author-alex-johnson.jpg",
    publishedAt: "Jul 1, 2025",
    readingTime: 5,
    views: 6240,
    tags: [TAGS[5], TAGS[2]],
    coverImage: "/images/markdown-writing-desk.jpg",
    featured: true,
  },
  {
    id: "a2",
    title: "Dark Mode Design: Best Practices for Modern Blogs",
    slug: "dark-mode-design-best-practices",
    excerpt:
      "Dark mode is more than a trend — it's a user experience decision that affects readability, accessibility, and brand perception. Discover the principles and techniques that make dark mode feel polished and intentional on any blog.",
    author: "Maya Chen",
    authorAvatar: "/images/author-maya-chen.jpg",
    publishedAt: "Jun 28, 2025",
    readingTime: 8,
    views: 4510,
    tags: [TAGS[1], TAGS[0]],
    coverImage: "/images/dark-mode-design.jpg",
    featured: true,
  },
  {
    id: "a3",
    title: "The Art of Writing Compelling Headlines",
    slug: "art-of-writing-compelling-headlines",
    excerpt:
      "Your headline is the first — and sometimes only — impression you make on a reader. Learn the psychology behind click-worthy titles, the formulas that consistently work, and how to craft headlines that are honest, specific, and impossible to ignore.",
    author: "James Wright",
    authorAvatar: "/images/author-james-wright.jpg",
    publishedAt: "Jun 22, 2025",
    readingTime: 6,
    views: 3780,
    tags: [TAGS[2], TAGS[3]],
    coverImage: "/images/writing-headlines.jpg",
    featured: false,
  },
  {
    id: "a4",
    title: "Building a Personal Blog with Next.js and Tailwind CSS",
    slug: "building-personal-blog-nextjs-tailwind",
    excerpt:
      "Next.js and Tailwind CSS are a match made in developer heaven. In this deep-dive tutorial, you'll build a fully functional personal blog from scratch — complete with Markdown rendering, dark mode, and lightning-fast performance out of the box.",
    author: "Priya Patel",
    authorAvatar: "/images/author-priya-patel.jpg",
    publishedAt: "Jun 18, 2025",
    readingTime: 11,
    views: 5120,
    tags: [TAGS[0], TAGS[4]],
    coverImage: "/images/nextjs-tailwind-blog.jpg",
    featured: false,
  },
  {
    id: "a5",
    title: "How to Write Code Documentation That People Actually Read",
    slug: "code-documentation-people-actually-read",
    excerpt:
      "Great code without great documentation is a gift no one can open. This article covers the principles of writing clear, concise, and genuinely useful docs — from README files and inline comments to full API references that developers love.",
    author: "Sam Rivera",
    authorAvatar: "/images/author-sam-rivera.jpg",
    publishedAt: "Jun 14, 2025",
    readingTime: 7,
    views: 2950,
    tags: [TAGS[4], TAGS[0]],
    coverImage: "/images/code-documentation.jpg",
    featured: false,
  },
  {
    id: "a6",
    title: "Productivity Systems for Writers: From Chaos to Clarity",
    slug: "productivity-systems-for-writers",
    excerpt:
      "Between blank pages, endless revisions, and the constant pull of distraction, writing can feel overwhelming. Explore battle-tested productivity systems — from time-blocking and the Pomodoro technique to personal knowledge management — that help writers do their best work consistently.",
    author: "Elena Brooks",
    authorAvatar: "/images/author-elena-brooks.jpg",
    publishedAt: "Jun 10, 2025",
    readingTime: 9,
    views: 3340,
    tags: [TAGS[3], TAGS[2]],
    coverImage: "/images/productivity-writers.jpg",
    featured: false,
  },
];

// ─── Types ───────────────────────────────────────────────────────────────────

type Article = (typeof ARTICLES)[number];
type Tag = (typeof TAGS)[number];

// ─── Sub-components ──────────────────────────────────────────────────────────

function TagBadge({ tag, small }: { tag: Tag; small?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${
        small ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1"
      }`}
      style={{
        backgroundColor: tag.color + "18",
        color: tag.color,
        border: `1px solid ${tag.color}30`,
      }}
      data-atomic-id="af6v9x2">
      {tag.name}
    </span>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <motion.article
      variants={fadeInUp}
      className="group bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Cover */}
      <div
        className="relative h-44 bg-gradient-to-br from-[#e2e8f0] to-[#c7d2fe] overflow-hidden"
        data-atomic-id="a1izxydp">
        <div
          className="absolute inset-0 flex items-center justify-center"
          data-atomic-id="ab3e5bk">
          <FileText size={40} className="text-[#6c63ff]/20" />
        </div>
        <div
          className="absolute top-3 left-3 flex flex-wrap gap-1.5"
          data-atomic-id="ab4szg2">
          {article.tags.slice(0, 2).map((tag) => (
            <TagBadge key={tag.id} tag={tag} small />
          ))}
        </div>
      </div>
      {/* Body */}
      <div className="p-5 flex flex-col flex-1" data-atomic-id="a1j2rmmp">
        <h3
          className="font-playfair font-bold text-[#1a1a2e] text-lg leading-snug mb-2 group-hover:text-[#6c63ff] transition-colors line-clamp-2"
          data-atomic-id="ahysf0s">
          {article.title}
        </h3>
        <p
          className="text-sm text-[#1a1a2e]/60 leading-relaxed mb-4 line-clamp-3 flex-1"
          data-atomic-id="a114wg8z">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div
          className="flex items-center justify-between pt-3 border-t border-black/5"
          data-atomic-id="aordse2">
          <div className="flex items-center gap-2" data-atomic-id="a1mhsb25">
            <div
              className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6c63ff] to-[#a78bfa] flex items-center justify-center text-white text-[10px] font-bold"
              data-atomic-id="asht7hc">
              {article.author[0]}
            </div>
            <span
              className="text-xs text-[#1a1a2e]/50 font-medium"
              data-atomic-id="ai88gpd">{article.author}</span>
          </div>
          <div
            className="flex items-center gap-3 text-[#1a1a2e]/40"
            data-atomic-id="a1mj756n">
            <span className="flex items-center gap-1 text-xs" data-atomic-id="are8c41">
              <Clock size={11} />
              {article.readingTime}m
            </span>
            <span className="flex items-center gap-1 text-xs" data-atomic-id="asoty8j">
              <Eye size={11} />
              {article.views.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function FeaturedCard({ article }: { article: Article }) {
  return (
    <motion.article
      variants={fadeInUp}
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1"
    >
      {/* Cover */}
      <div
        className="relative h-56 bg-gradient-to-br from-[#1a1a2e] via-[#2d2b55] to-[#6c63ff] overflow-hidden"
        data-atomic-id="awobavi">
        <div
          className="absolute inset-0 flex items-center justify-center opacity-10"
          data-atomic-id="a1x8iiq9">
          <FileText size={80} className="text-white" />
        </div>
        <div className="absolute top-4 left-4" data-atomic-id="a1x9xcur">
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#6c63ff] text-white shadow"
            data-atomic-id="a6osa79">
            <Star size={10} fill="currentColor" /> Featured
          </span>
        </div>
        <div
          className="absolute bottom-4 left-4 flex flex-wrap gap-1.5"
          data-atomic-id="a1xbc6z9">
          {article.tags.map((tag) => (
            <TagBadge key={tag.id} tag={tag} small />
          ))}
        </div>
      </div>
      {/* Body */}
      <div className="p-6" data-atomic-id="awr4z4i">
        <h3
          className="font-playfair font-bold text-[#1a1a2e] text-xl leading-snug mb-2 group-hover:text-[#6c63ff] transition-colors"
          data-atomic-id="a1x8g3pp">
          {article.title}
        </h3>
        <p
          className="text-sm text-[#1a1a2e]/60 leading-relaxed mb-5 line-clamp-3"
          data-atomic-id="a1yz5k2s">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between" data-atomic-id="abve3tn">
          <div className="flex items-center gap-2" data-atomic-id="a1thx1ku">
            <div
              className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6c63ff] to-[#a78bfa] flex items-center justify-center text-white text-xs font-bold"
              data-atomic-id="a1gup6td">
              {article.author[0]}
            </div>
            <div data-atomic-id="a1gw40xv">
              <p
                className="text-xs font-semibold text-[#1a1a2e]"
                data-atomic-id="a1t85gfn">{article.author}</p>
              <p className="text-[10px] text-[#1a1a2e]/40" data-atomic-id="a1t85i45">{article.publishedAt}</p>
            </div>
          </div>
          <div
            className="flex items-center gap-3 text-[#1a1a2e]/40"
            data-atomic-id="a1tjbvpc">
            <span
              className="flex items-center gap-1 text-xs"
              data-atomic-id="a1dvb4eq"
              style={{
                color: "#84cc16",
                backgroundColor: "#000000",
                fontSize: "48px",
                padding: "24px",
                margin: "24px",
                borderRadius: "8px"
              }}>
              <Clock size={12} />
              {article.readingTime} min read
            </span>
            <span className="flex items-center gap-1 text-xs" data-atomic-id="a1f5wqj8">
              <Eye size={12} />
              {article.views.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editorContent, setEditorContent] = useState(
    `# Hello, BlogMD!\n\nStart writing your article here. You can use **bold**, *italic*, and more.\n\n## Features\n\n- Real-time preview\n- Syntax highlighting\n- Export to Markdown\n\n\`\`\`js\nconsole.log('Hello, world!');\n\`\`\`\n`
  );
  const [activeSection, setActiveSection] = useState<"write" | "preview">("write");
  const prefersReducedMotion = useReducedMotion();

  const articlesRef = useRef<HTMLElement>(null);

  const featuredArticles = ARTICLES.filter((a) => a.featured);
  const filteredArticles = ARTICLES.filter((article) => {
    const matchesTag = activeTag
      ? article.tags.some((t) => t.slug === activeTag)
      : true;
    const matchesSearch = searchQuery
      ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesTag && matchesSearch;
  });

  // Simple markdown-to-html for preview
  function renderMarkdown(md: string): string {
    return md
      .replace(/^### (.+)$/gm, "<h3 class='text-lg font-bold mt-4 mb-1'>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2 class='text-xl font-bold mt-6 mb-2'>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1 class='text-2xl font-bold mt-6 mb-3 font-playfair'>$1</h1>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code class='bg-black/5 px-1 rounded text-sm font-mono'>$1</code>")
      .replace(/```[\w]*\n([\s\S]*?)```/g, "<pre class='bg-[#1a1a2e] text-[#e2e8f0] rounded-xl p-4 my-4 overflow-x-auto text-sm font-mono'><code>$1</code></pre>")
      .replace(/^- (.+)$/gm, "<li class='ml-4 list-disc'>$1</li>")
      .replace(/\n/g, "<br />")
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0]" data-atomic-id="adkzv3c">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-32 pb-24 px-4 overflow-hidden"
        data-atomic-id="a13m40vz">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none" data-atomic-id="akjdymq">
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#6c63ff]/5 blur-3xl translate-x-1/3 -translate-y-1/3"
            data-atomic-id="a851v2t" />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#6c63ff]/4 blur-3xl -translate-x-1/3 translate-y-1/3"
            data-atomic-id="a86gp7b" />
        </div>

        <div
          className="max-w-4xl mx-auto text-center relative"
          data-atomic-id="akkssr8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <span
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#6c63ff] bg-[#6c63ff]/8 border border-[#6c63ff]/20 px-4 py-2 rounded-full"
                data-atomic-id="asf3xu4">
                <Sparkles size={12} />
                Editorial platform · Markdown-powered
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-playfair font-bold text-5xl sm:text-6xl lg:text-7xl text-[#1a1a2e] leading-[1.1] tracking-tight"
            >
              Write with{" "}
              <span className="relative" data-atomic-id="a146b1hs">
                <span className="text-[#6c63ff]" data-atomic-id="a11i1oib">clarity</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#6c63ff]/40 origin-left"
                />
              </span>
              {"."}  Publish with{" "}
              <span className="text-[#6c63ff]" data-atomic-id="a1823vva">style</span>.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-[#1a1a2e]/60 max-w-2xl mx-auto leading-relaxed"
            >
              {APP_DESCRIPTION}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
            >
              <a
                href="#editor"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#editor")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6c63ff] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(108,99,255,0.35)] hover:bg-[#5b52e8] hover:shadow-[0_6px_24px_rgba(108,99,255,0.45)] transition-all duration-200 active:scale-95"
                data-atomic-id="acq0l1d">
                <Edit size={15} />
                Start writing
              </a>
              <a
                href="#articles"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#articles")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#1a1a2e] font-semibold text-sm border border-black/8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-[#f0f0ea] hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] transition-all duration-200 active:scale-95"
                data-atomic-id="acq0mpv">
                Browse articles
                <ArrowRight size={15} />
              </a>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="mt-16 grid grid-cols-3 gap-6 max-w-sm mx-auto"
          >
            {[
              { value: "6", label: "Articles" },
              { value: "6", label: "Topics" },
              { value: "∞", label: "Ideas" },
            ].map((stat, __atomicIdx) => (<div
              key={stat.label}
              className="text-center"
              data-atomic-id="a1y5klex"
              data-atomic-instance={__atomicIdx}>
              <p
                className="font-playfair font-bold text-3xl text-[#1a1a2e]"
                data-atomic-id="aoe3yzd"
                data-atomic-instance={__atomicIdx}
                style={__atomicIdx === 0 ? {
                  fontSize: "28px",
                  color: "#f59e0b"
                } : undefined}>{stat.value}</p>
              <p
                className="text-xs text-[#1a1a2e]/40 mt-0.5"
                data-atomic-id="aoe40nv"
                data-atomic-instance={__atomicIdx}>{stat.label}</p>
            </div>))}
          </motion.div>
        </div>
      </section>
      {/* ── Featured Articles ─────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white/50" data-atomic-id="aqu2phf">
        <div className="max-w-6xl mx-auto" data-atomic-id="ay1q978">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <Star size={18} className="text-[#6c63ff]" fill="#6c63ff" />
              <h2
                className="font-playfair font-bold text-2xl text-[#1a1a2e]"
                data-atomic-id="a17p7pfa">Featured Articles</h2>
            </motion.div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              data-atomic-id="a1qiwhj0">
              {featuredArticles.map((article) => (
                <FeaturedCard key={article.id} article={article} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* ── Articles ──────────────────────────────────────────────────────── */}
      <section
        id="articles"
        ref={articlesRef}
        className="py-16 px-4"
        data-atomic-id="a9nnolq">
        <div className="max-w-6xl mx-auto" data-atomic-id="a12idcov">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Header + Search */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2
                className="font-playfair font-bold text-2xl text-[#1a1a2e]"
                data-atomic-id="a1u5wf4x">All Articles</h2>
              <div className="relative" data-atomic-id="a1gir0i4">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a1a2e]/30" />
                <input
                  type="text"
                  placeholder="Search articles…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm rounded-xl border border-black/8 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-[#6c63ff]/30 focus:border-[#6c63ff]/40 w-64 placeholder:text-[#1a1a2e]/30"
                  data-atomic-id="aqgez7i" />
              </div>
            </motion.div>

            {/* Tag filters */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveTag(null)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-150 ${
                  activeTag === null
                    ? "bg-[#6c63ff] text-white border-[#6c63ff] shadow-[0_2px_8px_rgba(108,99,255,0.3)]"
                    : "bg-white text-[#1a1a2e]/60 border-black/8 hover:border-[#6c63ff]/30 hover:text-[#6c63ff]"
                }`}
                data-atomic-id="a1evryf">
                All
              </button>
              {TAGS.map((tag, __atomicIdx) => (<button
                key={tag.id}
                onClick={() => setActiveTag(activeTag === tag.slug ? null : tag.slug)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-150 ${
                  activeTag === tag.slug
                    ? "text-white border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                    : "bg-white text-[#1a1a2e]/60 border-black/8 hover:border-current"
                }`}
                style={
                  activeTag === tag.slug
                    ? { backgroundColor: tag.color }
                    : { color: tag.color }
                }
                data-atomic-id="awbql78"
                data-atomic-instance={__atomicIdx}>
                {tag.name}
                <span
                  className="ml-1 opacity-60"
                  data-atomic-id="a3c9g5r"
                  data-atomic-instance={__atomicIdx}>({tag.count})</span>
              </button>))}
            </motion.div>

            {/* Grid */}
            {filteredArticles.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredArticles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div variants={fadeIn} className="text-center py-16">
                <FileText size={40} className="text-[#1a1a2e]/15 mx-auto mb-3" />
                <p className="text-[#1a1a2e]/40 text-sm" data-atomic-id="a1hlew8m">No articles found. Try a different search or tag.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
      {/* ── Categories ────────────────────────────────────────────────────── */}
      <section
        id="categories"
        className="py-16 px-4 bg-white/50"
        data-atomic-id="a1vwqf6a">
        <div
          className="max-w-6xl mx-auto"
          data-atomic-id="a1g24hdv"
          style={{
            borderRadius: "24px"
          }}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2 variants={fadeInUp} className="font-playfair font-bold text-2xl text-[#1a1a2e] mb-8">
              Browse by Category
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {TAGS.map((tag, __atomicIdx) => (<motion.button
                key={tag.id}
                variants={scaleIn}
                onClick={() => {
                  setActiveTag(activeTag === tag.slug ? null : tag.slug);
                  articlesRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] transition-all duration-200 hover:-translate-y-1"
                style={{
                  borderColor: activeTag === tag.slug ? tag.color + "60" : undefined,
                  backgroundColor: activeTag === tag.slug ? tag.color + "08" : undefined,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                  style={{ backgroundColor: tag.color + "18", color: tag.color }}
                  data-atomic-id="a17tp7z0"
                  data-atomic-instance={__atomicIdx}>
                  {tag.name[0]}
                </div>
                <div
                  className="text-center"
                  data-atomic-id="a17v423i"
                  data-atomic-instance={__atomicIdx}>
                  <p
                    className="text-xs font-semibold text-[#1a1a2e] group-hover:text-[#6c63ff] transition-colors"
                    data-atomic-id="a184kjvy"
                    data-atomic-instance={__atomicIdx}
                    >
                    {tag.name}
                  </p>
                  <p
                    className="text-[10px] text-[#1a1a2e]/40 mt-0.5"
                    data-atomic-id="a184klkg"
                    data-atomic-instance={__atomicIdx}>{tag.count} articles</p>
                </div>
              </motion.button>))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ── Editor ────────────────────────────────────────────────────────── */}
      <section id="editor" className="py-16 px-4" data-atomic-id="a1j4p3rq">
        <div className="max-w-6xl mx-auto" data-atomic-id="a1tlvm2v">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <h2
                className="font-playfair font-bold text-3xl text-[#1a1a2e] mb-3"
                data-atomic-id="aeiars7">
                Try the Markdown Editor
              </h2>
              <p
                className="text-[#1a1a2e]/55 text-sm max-w-lg mx-auto"
                data-atomic-id="ayvn2e7">
                Write in Markdown and see your content rendered in real time. Supports headings, lists, code blocks, and more.
              </p>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="bg-white rounded-2xl border border-black/5 shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              {/* Toolbar */}
              <div
                className="flex items-center justify-between px-5 py-3 border-b border-black/5 bg-[#f5f5f0]/60"
                data-atomic-id="a1nehhlg">
                <div className="flex items-center gap-1.5" data-atomic-id="a4mhtef">
                  <div
                    className="w-3 h-3 rounded-full bg-[#ef4444]/60"
                    data-atomic-id="a1wpyiuy" />
                  <div
                    className="w-3 h-3 rounded-full bg-[#f59e0b]/60"
                    data-atomic-id="a1wrdczg" />
                  <div
                    className="w-3 h-3 rounded-full bg-[#10b981]/60"
                    data-atomic-id="a1wss73y" />
                </div>
                <div
                  className="flex items-center gap-1 bg-black/5 rounded-lg p-0.5"
                  data-atomic-id="a4nwnix">
                  <button
                    onClick={() => setActiveSection("write")}
                    className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all ${
                      activeSection === "write"
                        ? "bg-white text-[#1a1a2e] shadow-sm"
                        : "text-[#1a1a2e]/50 hover:text-[#1a1a2e]"
                    }`}
                    data-atomic-id="a1h2831x">
                    Write
                  </button>
                  <button
                    onClick={() => setActiveSection("preview")}
                    className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all ${
                      activeSection === "preview"
                        ? "bg-white text-[#1a1a2e] shadow-sm"
                        : "text-[#1a1a2e]/50 hover:text-[#1a1a2e]"
                    }`}
                    data-atomic-id="a163t9o7">
                    Preview
                  </button>
                </div>
                <span
                  className="text-[10px] text-[#1a1a2e]/30 font-mono"
                  data-atomic-id="ad5mrvu">
                  {editorContent.length} chars
                </span>
              </div>

              {/* Editor / Preview */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 min-h-[360px]"
                data-atomic-id="a1nhb5ug">
                {/* Write pane */}
                <div
                  className={`${activeSection === "preview" ? "hidden md:block" : ""} border-r border-black/5`}
                  data-atomic-id="ai7ns7x">
                  <textarea
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    className="w-full h-full min-h-[360px] p-6 text-sm font-mono text-[#1a1a2e]/80 bg-transparent resize-none focus:outline-none leading-relaxed placeholder:text-[#1a1a2e]/20"
                    placeholder="Start writing in Markdown…"
                    spellCheck={false}
                    data-atomic-id="a1u2hjmj" />
                </div>

                {/* Preview pane */}
                <div
                  className={`${activeSection === "write" ? "hidden md:block" : ""} p-6 overflow-y-auto prose prose-sm max-w-none`}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(editorContent) }}
                  data-atomic-id="aiahggx" />
              </div>
            </motion.div>

            {/* Features list */}
            <motion.div
              variants={staggerContainer}
              className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            >
              {[
                "Headings",
                "Bold & Italic",
                "Code blocks",
                "Lists",
                "Tables",
                "Images",
              ].map((feature) => (
                <motion.div
                  key={feature}
                  variants={fadeInUp}
                  className="flex items-center gap-2 text-xs text-[#1a1a2e]/60 bg-white rounded-lg px-3 py-2 border border-black/5"
                >
                  <Check size={12} className="text-[#10b981] shrink-0" />
                  {feature}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-20 px-4 bg-[#1a1a2e] text-white overflow-hidden relative"
        data-atomic-id="a4e08s1">
        <div className="absolute inset-0 pointer-events-none" data-atomic-id="aezzmte">
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#6c63ff]/10 blur-3xl translate-x-1/3 -translate-y-1/3"
            data-atomic-id="andits5" />
        </div>
        <div
          className="max-w-4xl mx-auto text-center relative"
          data-atomic-id="af1egxw">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <span
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#6c63ff] bg-[#6c63ff]/10 border border-[#6c63ff]/20 px-4 py-2 rounded-full"
                data-atomic-id="a1ge2abg">
                About BlogMD
              </span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="font-playfair font-bold text-4xl sm:text-5xl text-white leading-tight">
              Built for writers who{" "}
              <span className="text-[#6c63ff]" data-atomic-id="a1s59dz4">care about craft</span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
              BlogMD is an editorial platform that puts writing first. No distractions, no clutter — just a clean, powerful environment where your ideas can shine.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {[
                {
                  icon: FileText,
                  title: "Markdown-first",
                  desc: "Write in plain text with full Markdown support including tables, code, and more.",
                },
                {
                  icon: Sparkles,
                  title: "Beautiful by default",
                  desc: "Every article looks stunning with our editorial typography and layout system.",
                },
                {
                  icon: Heart,
                  title: "Made with care",
                  desc: "Crafted with attention to detail for writers who value quality and clarity.",
                },
              ].map(({ icon: Icon, title, desc }, __atomicIdx) => (<div
                key={title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left hover:bg-white/8 transition-colors"
                data-atomic-id="a1acr61q"
                data-atomic-instance={__atomicIdx}>
                <div
                  className="w-10 h-10 rounded-xl bg-[#6c63ff]/20 flex items-center justify-center mb-4"
                  data-atomic-id="a1idizfl"
                  data-atomic-instance={__atomicIdx}>
                  <Icon size={18} className="text-[#6c63ff]" />
                </div>
                <h3
                  className="font-semibold text-white mb-2"
                  data-atomic-id="a1wdhxcr"
                  data-atomic-instance={__atomicIdx}>{title}</h3>
                <p
                  className="text-white/50 text-sm leading-relaxed"
                  data-atomic-id="alfziia"
                  data-atomic-instance={__atomicIdx}>{desc}</p>
              </div>))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
