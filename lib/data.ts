export const APP_NAME = "BlogMD";
export const APP_TAGLINE = "Escribe con claridad. Publica con estilo.";
export const APP_DESCRIPTION =
  "Plataforma editorial moderna con soporte completo para Markdown. Crea, edita y comparte artículos con el mundo.";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Artículos", href: "#articles" },
  { label: "Categorías", href: "#categories" },
  { label: "Editor", href: "#editor" },
  { label: "Acerca de", href: "#about" },
];

export const navCTA = {
  label: "Nuevo artículo",
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