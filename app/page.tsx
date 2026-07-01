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
  { id: "t1", name: "Technology", slug: "technology", color: "#6c63ff" },
  { id: "t2", name: "Design", slug: "design", color: "#f59e0b" },
  { id: "t3", name: "Writing", slug: "writing", color: "#10b981" },
  { id: "t4", name: "Productivity", slug: "productivity", color: "#ef4444" },
  { id: "t5", name: "Open Source", slug: "open-source", color: "#3b82f6" },
  { id: "t6", name: "Markdown", slug: "markdown", color: "#8b5cf6" },
];

const ARTICLES = [
  {
    id: "a1",
    title: "Why Markdown remains the most powerful writing format",
    slug: "markdown-most-powerful-format",
    excerpt:
      "From technical documentation to novels, Markdown has proven to be the most versatile and enduring markup language of the digital age.",
    author: "Sofia Ramirez",
    authorAvatar: "/images/author-sofia-ramirez.jpg",
    publishedAt: "Jun 12, 2025",
    readingTime: 6,
    views: 4820,
    tags: [TAGS[5], TAGS[2]],
    coverImage: "/images/markdown-writing-desk.jpg",
    featured: true,
  },
  {
    id: "a2",
    title: "Typographic design for blogs: a complete guide",
    slug: "typographic-design-blogs",
    excerpt:
      "Typography is the silent voice of your content. Learn to choose fonts, scale and spacing so your readers never want to leave.",
    author: "Carlos Mendoza",
    authorAvatar: "/images/author-carlos-mendoza.jpg",
    publishedAt: "Jun 8, 2025",
    readingTime: 9,
    views: 3210,
    tags: [TAGS[1], TAGS[2]],
    coverImage: "/images/typography-design-blog.jpg",
    featured: true,
  },
  {
    id: "a3",
    title: "How to build a sustainable writing system",
    slug: "sustainable-writing-system",
    excerpt:
      "Writing consistently is not about blind discipline, but about creating an environment and routines that let ideas flow naturally.",
    author: "Lucia Torres",
    authorAvatar: "/images/author-lucia-torres.jpg",
    publishedAt: "Jun 3, 2025",
    readingTime: 7,
    views: 2890,
    tags: [TAGS[2], TAGS[3]],
    coverImage: "/images/writing-system-notebook.jpg",
    featured: false,
  },
  {
    id: "a4",
    title: "Open Source and documentation: the perfect duo",
    slug: "open-source-documentation",
    excerpt:
      "Open source projects that succeed have one thing in common: clear, accessible and well-maintained documentation. Here we show you how to achieve it.",
    author: "Andres Vega",
    authorAvatar: "/images/author-andres-vega.jpg",
    publishedAt: "May 28, 2025",
    readingTime: 5,
    views: 1970,
    tags: [TAGS[4], TAGS[5]],
    coverImage: "/images/open-source-documentation.jpg",
    featured: false,
  },
  {
    id: "a5",
    title: "Productivity for writers: tools that actually work",
    slug: "productivity-tools-writers",
    excerpt:
      "Between notifications, meetings and mental blocks, finding focus is an art. We review the tools and techniques that real writers use.",
    author: "Maria Jimenez",
    authorAvatar: "/images/author-maria-jimenez.jpg",
    publishedAt: "May 22, 2025",
    readingTime: 8,
    views: 2340,
    tags: [TAGS[3], TAGS[2]],
    coverImage: "/images/productivity-writers.jpg",
    featured: false,
  },
  {
    id: "a6",
    title: "The future of digital publishing",
    slug: "future-digital-publishing",
    excerpt:
      "Newsletters, micro-blogs, long-form content: the publishing landscape is changing. Where are we headed and how can writers adapt?",
    author: "Sofia Ramirez",
    authorAvatar: "/images/author-sofia-ramirez.jpg",
    publishedAt: "May 15, 2025",
    readingTime: 6,
    views: 3100,
    tags: [TAGS[0], TAGS[2]],
    coverImage: "/images/future-digital-publishing.jpg",
    featured: false,
  },
];

const FEATURES = [
  {
    icon: FileText,
    title: "Live Markdown Editor",
    description:
      "Write in Markdown and see the rendered result in real time. Full support for GFM, tables, code blocks and more.",
    accent: "#6c63ff",
  },
  {
    icon: Sparkles,
    title: "Syntax Highlighting",
    description:
      "Code blocks with automatic coloring for over 40 programming languages. Your code will always look professional.",
    accent: "#8b5cf6",
  },
  {
    icon: Eye,
    title: "Instant Preview",
    description:
      "Toggle between edit mode and preview with a single click. What you see is exactly what you will publish.",
    accent: "#6c63ff",
  },
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Find any article by title, content or tag in milliseconds. Full-text search that actually works.",
    accent: "#8b5cf6",
  },
];

const STATS = [
  { value: "12K+", label: "Published articles", description: "Growing every day" },
  { value: "340+", label: "Active writers", description: "From around the world" },
  { value: "98%", label: "Satisfaction", description: "According to our surveys" },
  { value: "4.9", label: "Average rating", description: "On app stores" },
];

const SAMPLE_MARKDOWN = `# My first article

Welcome to **BlogMD**, the editorial platform that puts writing first.

## Why Markdown?

Markdown lets you focus on what matters: *your ideas*.

\`\`\`javascript
const hello = () => {
  console.log('Hello, BlogMD!');
};
\`\`\`

> Writing is thinking. To write well is to think clearly.

- Simple and clean syntax
- Renders beautifully
- Works everywhere
`;

// ─── Sub-components ──────────────────────────────────────────────────────────

function TagBadge({ tag }: { tag: (typeof TAGS)[0] }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: tag.color + "18", color: tag.color }}
    >
      {tag.name}
    </span>
  );
}

function ArticleCard({
  article,
  index = 0,
}: {
  article: (typeof ARTICLES)[0];
  index?: number;
}) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.article
      variants={fadeInUp}
      className="group bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300 flex flex-col"
    >
      {/* Cover */}
      <div className="relative h-48 bg-gradient-to-br from-[#e2e8f0] to-[#ede9fe] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: ACCENT_COLOR + "20" }}
          >
            <FileText size={28} style={{ color: ACCENT_COLOR }} />
          </div>
        </div>
        {article.featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#6c63ff] text-white shadow-sm">
              <Star size={10} fill="currentColor" />
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {article.tags.map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
        </div>

        <h3 className="font-playfair font-bold text-lg text-[#1a1a2e] leading-snug mb-2 group-hover:text-[#6c63ff] transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-[#1a1a2e]/60 leading-relaxed mb-4 line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-3 border-t border-black/5">
          <div className="flex items-center gap-3 text-xs text-[#1a1a2e]/40">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {article.readingTime} min read
            </span>
            <span className="flex items-center gap-1">
              <Eye size={11} />
              {article.views.toLocaleString()} views
            </span>
          </div>
          <Link
            href={`/article/${article.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#6c63ff] hover:gap-2 transition-all"
          >
            Read article <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function MarkdownPreview({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="prose prose-sm max-w-none text-[#1a1a2e]/80 space-y-2">
      {lines.map((line, i) => {
        if (line.startsWith("# "))
          return (
            <h1 key={i} className="font-playfair text-2xl font-bold text-[#1a1a2e] mt-0">
              {line.slice(2)}
            </h1>
          );
        if (line.startsWith("## "))
          return (
            <h2 key={i} className="font-playfair text-lg font-bold text-[#1a1a2e]">
              {line.slice(3)}
            </h2>
          );
        if (line.startsWith("> "))
          return (
            <blockquote
              key={i}
              className="border-l-4 border-[#6c63ff] pl-4 italic text-[#1a1a2e]/60"
            >
              {line.slice(2)}
            </blockquote>
          );
        if (line.startsWith("- "))
          return (
            <li key={i} className="ml-4 list-disc text-[#1a1a2e]/70">
              {line.slice(2)}
            </li>
          );
        if (line.startsWith("```"))
          return (
            <div
              key={i}
              className="bg-[#1a1a2e] text-green-400 rounded-lg px-4 py-2 font-mono text-xs"
            >
              {line.slice(3) || "code"}
            </div>
          );
        if (line.trim() === "") return <div key={i} className="h-1" />;
        // inline bold/italic
        const formatted = line
          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.+?)\*/g, "<em>$1</em>")
          .replace(/`(.+?)`/g, '<code class="bg-[#ede9fe] text-[#6c63ff] px-1 rounded text-xs">$1</code>');
        return (
          <p
            key={i}
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatted }}
          />
        );
      })}
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState(SAMPLE_MARKDOWN);
  const [editorTab, setEditorTab] = useState<"write" | "preview">("write");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const featuredArticles = ARTICLES.filter((a) => a.featured);
  const filteredArticles = ARTICLES.filter((a) => {
    const matchesSearch =
      !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag =
      !activeTag || a.tags.some((t) => t.slug === activeTag);
    return matchesSearch && matchesTag;
  });

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  }

  function insertMarkdown(before: string, after = "") {
    const ta = editorRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = editorContent.slice(start, end);
    const newContent =
      editorContent.slice(0, start) +
      before +
      selected +
      after +
      editorContent.slice(end);
    setEditorContent(newContent);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(
        start + before.length,
        start + before.length + selected.length
      );
    }, 0);
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6c63ff]/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8b5cf6]/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto"
          >
            {/* Tagline pill */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6c63ff]/10 text-[#6c63ff] text-sm font-medium border border-[#6c63ff]/20">
                <Sparkles size={14} />
                The editorial platform for modern writers
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1a1a2e] leading-[1.1] tracking-tight mb-6"
            >
              Write with clarity.
              <br />
              <span className="text-[#6c63ff]">Publish with style.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-[#1a1a2e]/60 leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              BlogMD is the modern editorial platform with full Markdown support.
              Create, edit and share your articles with the world — without distractions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="#editor"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#editor")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6c63ff] text-white font-semibold shadow-[0_4px_16px_rgba(108,99,255,0.35)] hover:shadow-[0_6px_24px_rgba(108,99,255,0.45)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Edit size={16} />
                Start writing
              </Link>
              <Link
                href="#articles"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#articles")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#1a1a2e] font-semibold border border-black/10 hover:border-[#6c63ff]/40 hover:text-[#6c63ff] hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
              >
                Explore articles <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero stats strip */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="bg-white rounded-2xl p-5 text-center border border-black/5 shadow-sm"
              >
                <div className="font-playfair text-3xl font-bold text-[#6c63ff] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-[#1a1a2e] mb-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-[#1a1a2e]/40">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED ARTICLES ────────────────────────────────────────────── */}
      <section id="articles" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-end justify-between mb-10"
            >
              <div>
                <p className="text-sm font-semibold text-[#6c63ff] uppercase tracking-widest mb-2">
                  Editor&apos;s picks
                </p>
                <h2 className="font-playfair text-4xl font-bold text-[#1a1a2e]">
                  Featured Articles
                </h2>
              </div>
              <Link
                href="#all-articles"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#all-articles")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#6c63ff] hover:gap-3 transition-all"
              >
                View all <ChevronRight size={14} />
              </Link>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {featuredArticles.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SEARCH + FILTER ──────────────────────────────────────────────── */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-y border-black/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1a2e]/30"
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 bg-[#f5f5f0] text-sm text-[#1a1a2e] placeholder:text-[#1a1a2e]/30 focus:outline-none focus:ring-2 focus:ring-[#6c63ff]/30 focus:border-[#6c63ff]/40 transition-all"
              />
            </div>

            {/* Tag filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveTag(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTag === null
                    ? "bg-[#6c63ff] text-white shadow-sm"
                    : "bg-[#f5f5f0] text-[#1a1a2e]/60 hover:bg-[#e2e8f0]"
                }`}
              >
                All
              </button>
              {TAGS.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() =>
                    setActiveTag(activeTag === tag.slug ? null : tag.slug)
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeTag === tag.slug
                      ? "text-white shadow-sm"
                      : "bg-[#f5f5f0] text-[#1a1a2e]/60 hover:bg-[#e2e8f0]"
                  }`}
                  style={
                    activeTag === tag.slug
                      ? { backgroundColor: tag.color }
                      : {}
                  }
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL ARTICLES ─────────────────────────────────────────────────── */}
      <section id="all-articles" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeInUp} className="mb-10">
              <h2 className="font-playfair text-3xl font-bold text-[#1a1a2e]">
                All Articles
              </h2>
              {filteredArticles.length === 0 && (
                <p className="mt-4 text-[#1a1a2e]/50 text-sm">
                  No articles found for your search.
                </p>
              )}
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredArticles.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <p className="text-sm font-semibold text-[#6c63ff] uppercase tracking-widest mb-2">
                Topics
              </p>
              <h2 className="font-playfair text-4xl font-bold text-[#1a1a2e]">
                Explore by Category
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {TAGS.map((tag) => (
                <motion.button
                  key={tag.id}
                  variants={scaleIn}
                  onClick={() =>
                    setActiveTag(activeTag === tag.slug ? null : tag.slug)
                  }
                  className="group flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-1"
                  style={{
                    borderColor:
                      activeTag === tag.slug ? tag.color : "transparent",
                    backgroundColor:
                      activeTag === tag.slug ? tag.color + "10" : "#f5f5f0",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                    style={{ backgroundColor: tag.color + "20", color: tag.color }}
                  >
                    {tag.name[0]}
                  </div>
                  <span
                    className="text-sm font-semibold text-center"
                    style={{ color: tag.color }}
                  >
                    {tag.name}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <p className="text-sm font-semibold text-[#6c63ff] uppercase tracking-widest mb-2">
                Features
              </p>
              <h2 className="font-playfair text-4xl font-bold text-[#1a1a2e] mb-4">
                Everything you need to write
              </h2>
              <p className="text-[#1a1a2e]/55 max-w-xl mx-auto">
                BlogMD combines the simplicity of Markdown with the power of a
                modern editorial platform.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: feature.accent + "15" }}
                    >
                      <Icon size={20} style={{ color: feature.accent }} />
                    </div>
                    <h3 className="font-semibold text-[#1a1a2e] mb-2">
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

      {/* ── MARKDOWN EDITOR ──────────────────────────────────────────────── */}
      <section
        id="editor"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1a1a2e]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <p className="text-sm font-semibold text-[#6c63ff] uppercase tracking-widest mb-2">
                Try it now
              </p>
              <h2 className="font-playfair text-4xl font-bold text-white mb-4">
                Markdown Editor
              </h2>
              <p className="text-white/50 max-w-xl mx-auto">
                Write in Markdown and see the result instantly. No setup required.
              </p>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Editor toolbar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#f5f5f0] border-b border-black/8">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-black/8">
                  <button
                    onClick={() => setEditorTab("write")}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      editorTab === "write"
                        ? "bg-[#6c63ff] text-white shadow-sm"
                        : "text-[#1a1a2e]/50 hover:text-[#1a1a2e]"
                    }`}
                  >
                    Write
                  </button>
                  <button
                    onClick={() => setEditorTab("preview")}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      editorTab === "preview"
                        ? "bg-[#6c63ff] text-white shadow-sm"
                        : "text-[#1a1a2e]/50 hover:text-[#1a1a2e]"
                    }`}
                  >
                    Preview
                  </button>
                </div>

                {/* Formatting buttons */}
                <div className="flex items-center gap-1">
                  {[
                    { label: "B", action: () => insertMarkdown("**", "**"), title: "Bold" },
                    { label: "I", action: () => insertMarkdown("*", "*"), title: "Italic" },
                    { label: "H", action: () => insertMarkdown("## "), title: "Heading" },
                    { label: "`", action: () => insertMarkdown("`", "`"), title: "Code" },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      onClick={btn.action}
                      title={btn.title}
                      className="w-7 h-7 rounded-md bg-white border border-black/8 text-xs font-bold text-[#1a1a2e]/60 hover:text-[#6c63ff] hover:border-[#6c63ff]/30 transition-all"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editor body */}
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
                {/* Write pane */}
                <div
                  className={`border-r border-black/8 ${
                    editorTab === "preview" ? "hidden md:block" : ""
                  }`}
                >
                  <textarea
                    ref={editorRef}
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    placeholder="Start writing in Markdown..."
                    className="w-full h-full min-h-[400px] p-6 font-mono text-sm text-[#1a1a2e] bg-white resize-none focus:outline-none leading-relaxed"
                    spellCheck={false}
                  />
                </div>

                {/* Preview pane */}
                <div
                  className={`p-6 overflow-auto ${
                    editorTab === "write" ? "hidden md:block" : ""
                  }`}
                >
                  <div className="text-xs font-semibold text-[#1a1a2e]/30 uppercase tracking-widest mb-4">
                    Preview
                  </div>
                  <MarkdownPreview content={editorContent} />
                </div>
              </div>

              {/* Editor footer */}
              <div className="flex items-center justify-between px-6 py-3 bg-[#f5f5f0] border-t border-black/8">
                <span className="text-xs text-[#1a1a2e]/40">
                  {editorContent.split(" ").filter(Boolean).length} words ·{" "}
                  {Math.ceil(
                    editorContent.split(" ").filter(Boolean).length / 200
                  )}{" "}
                  min read
                </span>
                <button className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#6c63ff] text-white text-xs font-semibold hover:bg-[#5a52d5] transition-colors shadow-sm">
                  <Check size={12} /> Publish
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── NEWSLETTER / CTA ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div
              variants={scaleIn}
              className="bg-gradient-to-br from-[#6c63ff] to-[#8b5cf6] rounded-3xl p-10 shadow-[0_8px_40px_rgba(108,99,255,0.3)]"
            >
              <Heart
                size={32}
                className="text-white/60 mx-auto mb-4"
                fill="currentColor"
              />
              <h2 className="font-playfair text-3xl font-bold text-white mb-3">
                Stay up to date
              </h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                Receive the best articles directly in your inbox. No spam,
                unsubscribe whenever you want.
              </p>

              {subscribed ? (
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-center gap-2 text-white font-semibold"
                >
                  <Check size={20} />
                  You&apos;re subscribed! Thank you.
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-white text-[#6c63ff] font-semibold text-sm hover:bg-white/90 transition-colors shadow-sm whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
