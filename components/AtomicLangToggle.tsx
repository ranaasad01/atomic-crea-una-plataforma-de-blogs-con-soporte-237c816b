"use client";

import { useEffect, useState } from "react";
import { Globe } from 'lucide-react';

const STORAGE_KEY = "blogmd_locale";

const EN_TO_ES: Record<string, string> = {
  "Write with clarity. Publish with style.": "Escribe con claridad. Publica con estilo.",
  "Modern editorial platform with full Markdown support. Create, edit and share articles with the world.": "Plataforma editorial moderna con soporte completo para Markdown. Crea, edita y comparte artículos con el mundo.",
  "Home": "Inicio",
  "Articles": "Artículos",
  "Categories": "Categorías",
  "Editor": "Editor",
  "About": "Acerca de",
  "New article": "Nuevo artículo",
  "Navigation": "Navegación",
  "Resources": "Recursos",
  "Markdown Guide": "Guía de Markdown",
  "Keyboard shortcuts": "Atajos de teclado",
  "Export articles": "Exportar artículos",
  "Contact": "Contacto",
  "An editorial platform for writers who value clarity and great design.": "Una plataforma editorial para escritores que valoran la claridad y el gran diseño.",
  "All rights reserved.": "Todos los derechos reservados.",
  "Privacy": "Privacidad",
  "Terms": "Términos",
  "Sitemap": "Mapa del sitio",
  "Technology": "Tecnología",
  "Design": "Diseño",
  "Writing": "Escritura",
  "Productivity": "Productividad",
  "Open Source": "Código Abierto",
  "Markdown": "Markdown",
  "Featured Articles": "Artículos Destacados",
  "Latest Articles": "Últimos Artículos",
  "Read more": "Leer más",
  "Read article": "Leer artículo",
  "min read": "min de lectura",
  "views": "vistas",
  "Search articles...": "Buscar artículos...",
  "New Article": "Nuevo Artículo",
  "Start writing": "Empezar a escribir",
  "Explore articles": "Explorar artículos",
  "Write with clarity": "Escribe con claridad",
  "The modern platform for writers": "La plataforma moderna para escritores",
  "Why Markdown remains the most powerful writing format": "Por qué Markdown sigue siendo el formato de escritura más poderoso",
  "Typographic design for blogs: a complete guide": "Diseño tipográfico para blogs: una guía completa",
  "How to build a sustainable writing system": "Cómo construir un sistema de escritura sostenible",
  "Open Source and documentation: the perfect duo": "Código abierto y documentación: el dúo perfecto",
  "Sofia Ramirez": "Sofia Ramirez",
  "Carlos Mendoza": "Carlos Mendoza",
  "Lucia Torres": "Lucia Torres",
  "Andres Vega": "Andres Vega",
  "Jun 12, 2025": "12 jun, 2025",
  "Jun 8, 2025": "8 jun, 2025",
  "Jun 3, 2025": "3 jun, 2025",
  "See all articles": "Ver todos los artículos",
  "Explore categories": "Explorar categorías",
  "Live Preview": "Vista previa en vivo",
  "Preview": "Vista previa",
  "Publish": "Publicar",
  "Save draft": "Guardar borrador",
  "Title": "Título",
  "Tags": "Etiquetas",
  "Add tag": "Agregar etiqueta",
  "Word count": "Conteo de palabras",
  "words": "palabras",
  "characters": "caracteres",
  "Heading 1": "Encabezado 1",
  "Bold": "Negrita",
  "Italic": "Cursiva",
  "Code": "Código",
  "Link": "Enlace",
  "Image": "Imagen",
  "List": "Lista",
  "Quote": "Cita",
  "Table": "Tabla",
  "Nothing to preview yet.": "Nada que previsualizar aún.",
  "Start typing in the editor to see a live preview here.": "Empieza a escribir en el editor para ver una vista previa aquí.",
  "Popular Tags": "Etiquetas Populares",
  "articles": "artículos",
  "article": "artículo",
  "GitHub": "GitHub",
  "Twitter": "Twitter",
};

// Build reverse map ES → EN
const ES_TO_EN: Record<string, string> = {};
for (const [en, es] of Object.entries(EN_TO_ES)) {
  ES_TO_EN[es] = en;
}

const ORIG = new WeakMap<Text, string>();

function textNodes(): Text[] {
  if (typeof document === "undefined") return [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const out: Text[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const t = n as Text;
    const p = t.parentElement;
    if (!p) continue;
    if (/SCRIPT|STYLE|NOSCRIPT|TEXTAREA/.test(p.tagName)) continue;
    if (p.closest("[data-no-translate]")) continue;
    if ((t.textContent ?? "").trim()) out.push(t);
  }
  return out;
}

function applyMap(map: Record<string, string>) {
  for (const t of textNodes()) {
    const orig = ORIG.has(t) ? (ORIG.get(t) as string) : (t.textContent ?? "");
    if (!ORIG.has(t)) ORIG.set(t, orig);
    const key = orig.trim();
    const tr = map[key];
    if (tr) {
      t.textContent = orig.replace(key, tr);
    } else {
      t.textContent = orig;
    }
  }
}

function restore() {
  for (const t of textNodes()) {
    if (ORIG.has(t)) t.textContent = ORIG.get(t) as string;
  }
}

function applyLocaleDOM(target: string) {
  if (target === "en") {
    restore();
  } else {
    applyMap(EN_TO_ES);
  }
}

export default function AtomicLangToggle() {
  const [locale, setLocale] = useState<"en" | "es">("en");

  useEffect(() => {
    let saved: "en" | "es" = "en";
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "es" || stored === "en") saved = stored;
    } catch {}
    setLocale(saved);
    if (saved === "es") {
      applyLocaleDOM("es");
    }
  }, []);

  function handleToggle() {
    const next: "en" | "es" = locale === "en" ? "es" : "en";
    applyLocaleDOM(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    setLocale(next);
  }

  return (
    <button
      data-no-translate
      onClick={handleToggle}
      title="Switch language / Cambiar idioma"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1a2e] text-white text-xs font-medium shadow-lg hover:bg-[#2d2d4e] transition-colors cursor-pointer border border-white/10"
    >
      <Globe size={12} />
      <span>{locale === "en" ? "EN" : "ES"}</span>
    </button>
  );
}
