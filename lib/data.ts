export const APP_NAME = "BlogMD";
export const APP_TAGLINE = "Write with clarity. Publish with style.";
export const APP_DESCRIPTION =
  "Modern editorial platform with full Markdown support. Create, edit and share articles with the world.";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "#articles" },
  { label: "Categories", href: "#categories" },
  { label: "Editor", href: "#editor" },
  { label: "About", href: "#about" },
];

export const navCTA = {
  label: "New article",
  href: "#editor",
};

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string;
  count: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readingTime: number;
  tags: Tag[];
  coverImage: string;
  featured: boolean;
}

export const ACCENT_COLOR = "#6c63ff";
export const ACCENT_LIGHT = "#ede9fe";
export const DARK_BG = "#1a1a2e";
export const LIGHT_BG = "#f5f5f0";
