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

/**
 * Curated groupings of the tech stack for the About section. Each group lists
 * tech names; only those that (a) have an icon and (b) actually appear in the
 * project data are rendered. "Scikit-learn"/"Scikit-Learn" are deduped by icon.
 */
const TECH_GROUPS: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "HTML", "CSS"] },
  {
    label: "Frameworks & Libraries",
    items: ["React", "Next.js", "Flutter", "Tailwind CSS", "Prisma"],
  },
  {
    label: "AI / ML",
    items: ["TensorFlow Lite", "Scikit-Learn", "Pandas", "LangChain", "Gemini API", "FAISS"],
  },
  {
    label: "Tools & Platforms",
    items: ["Firebase", "Supabase", "PostgreSQL", "SQLite", "Unity"],
  },
];

export type TechIcon = { name: string; Icon: IconType; color: string };

/**
 * Returns the curated groups filtered to techs that have an icon AND appear in
 * the given project tech lists. Empty groups are dropped. Anything present in
 * the data but not assigned to a group is appended under "Other".
 */
export function collectTechGroups(
  techLists: string[][]
): { label: string; items: TechIcon[] }[] {
  const present = new Set(techLists.flat());
  const used = new Set<string>();

  const groups = TECH_GROUPS.map((g) => {
    const items: TechIcon[] = [];
    for (const name of g.items) {
      const hit = TECH[name];
      if (!hit || !present.has(name) || used.has(name)) continue;
      used.add(name);
      items.push({ name, ...hit });
    }
    return { label: g.label, items };
  }).filter((g) => g.items.length > 0);

  // Catch any iconed tech in the data that wasn't placed in a group.
  const leftovers: TechIcon[] = [];
  for (const name of present) {
    const hit = TECH[name];
    if (hit && !used.has(name)) {
      used.add(name);
      leftovers.push({ name, ...hit });
    }
  }
  if (leftovers.length) groups.push({ label: "Other", items: leftovers });

  return groups;
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
