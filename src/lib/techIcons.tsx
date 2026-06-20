import type { ComponentType, SVGProps } from "react";
import {
  SiPython,
  SiReact,
  SiFlutter,
  SiFirebase,
  SiTensorflow,
  SiNextdotjs,
  SiTypescript,
  SiSupabase,
  SiLangchain,
  SiPandas,
  SiScikitlearn,
  SiUnity,
  SiPostgresql,
  SiSqlite,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiGooglegemini,
  SiPrisma,
  SiTailwindcss,
} from "react-icons/si";
import {
  FaBrain,
  FaMobileScreenButton,
  FaGlobe,
  FaGamepad,
  FaChartColumn,
  FaCode,
} from "react-icons/fa6";
import type { ProjectCategory } from "@/types";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Maps the exact tech strings used in src/data/projects.ts to a brand icon +
 * its brand color. Anything without an entry (e.g. "Groq LLM", "AI API",
 * "OOP") is simply skipped by callers — no broken icons.
 */
const TECH: Record<string, { Icon: IconType; color: string }> = {
  Python: { Icon: SiPython, color: "#3776AB" },
  React: { Icon: SiReact, color: "#61DAFB" },
  Flutter: { Icon: SiFlutter, color: "#02569B" },
  Firebase: { Icon: SiFirebase, color: "#FFCA28" },
  "TensorFlow Lite": { Icon: SiTensorflow, color: "#FF6F00" },
  "Next.js": { Icon: SiNextdotjs, color: "#000000" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  Supabase: { Icon: SiSupabase, color: "#3FCF8E" },
  LangChain: { Icon: SiLangchain, color: "#1C3C3C" },
  Pandas: { Icon: SiPandas, color: "#150458" },
  "Scikit-Learn": { Icon: SiScikitlearn, color: "#F7931E" },
  "Scikit-learn": { Icon: SiScikitlearn, color: "#F7931E" },
  Unity: { Icon: SiUnity, color: "#000000" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  SQLite: { Icon: SiSqlite, color: "#003B57" },
  HTML: { Icon: SiHtml5, color: "#E34F26" },
  CSS: { Icon: SiCss, color: "#1572B6" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  "Gemini API": { Icon: SiGooglegemini, color: "#8E75B2" },
  Prisma: { Icon: SiPrisma, color: "#2D3748" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  FAISS: { Icon: FaBrain, color: "#2C5EAD" },
};

export function getTechIcon(name: string) {
  return TECH[name] ?? null;
}

/**
 * De-duplicated, ordered list of techs (across all projects) that actually
 * have an icon — used for the About tech-stack row.
 */
export function collectTechIcons(techLists: string[][]) {
  const seen = new Set<string>();
  const out: { name: string; Icon: IconType; color: string }[] = [];
  for (const list of techLists) {
    for (const name of list) {
      if (seen.has(name)) continue;
      const hit = TECH[name];
      if (!hit) continue;
      seen.add(name);
      out.push({ name, ...hit });
    }
  }
  return out;
}

/**
 * Category → semantic icon, for the project-card thumbnail placeholder
 * (brain for AI/ML, phone for Mobile, globe for Web, controller for Game).
 */
export const CATEGORY_ICON: Record<ProjectCategory, IconType> = {
  "AI/ML": FaBrain,
  Mobile: FaMobileScreenButton,
  Web: FaGlobe,
  Game: FaGamepad,
  Data: FaChartColumn,
  Other: FaCode,
};
