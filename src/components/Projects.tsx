"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import type { Project } from "@/types";

const ALL = "All";

export default function Projects({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return [ALL, ...unique];
  }, [projects]);

  const [active, setActive] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchCat = active === ALL || p.category === active;
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [projects, active, query]);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24">
      <Reveal>
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Projects
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-slate-500">
          A collection of work I&apos;ve built. Filter by category or search.
        </p>
      </Reveal>

      {/* Controls: search + filter */}
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="glass flex w-full max-w-md items-center gap-2 rounded-full px-4 py-2.5">
            <Search className="h-4 w-4 text-[#1591DC]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or technologies..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active === cat ? "text-[#2C5EAD]" : "text-slate-500 hover:text-[#2C5EAD]"
                }`}
              >
                {active === cat && (
                  <motion.span
                    layoutId="activeCategory"
                    className="glass-strong absolute inset-0 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Grid */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-slate-400">
          No matching projects. Try another keyword or category.
        </p>
      )}
    </section>
  );
}
