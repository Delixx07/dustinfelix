"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Code2, ExternalLink, Star } from "lucide-react";
import Reveal from "./Reveal";
import { CATEGORY_ICON } from "@/lib/techIcons";
import type { Project } from "@/types";

const ALL = "All";

export default function Projects({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return [ALL, ...unique];
  }, [projects]);

  const [active, setActive] = useState<string>(ALL);
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    projects[0]?.slug ?? null
  );

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

  // Derive the displayed project during render (no effect/state-sync needed):
  // use the clicked one if it's still in the filtered list, otherwise fall back
  // to the first result. Selection state only changes on an explicit click.
  const selected =
    filtered.find((p) => p.slug === selectedSlug) ?? filtered[0] ?? null;

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-12">
        {/* ---------- LEFT: title + controls + project list ---------- */}
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Projects
            </h2>
            <p className="mt-2 max-w-md text-slate-500">
              A collection of work I&apos;ve built. Filter by category or search.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col gap-4">
              {/* Search */}
              <div className="glass flex w-full items-center gap-2 rounded-full px-4 py-2.5">
                <Search className="h-4 w-4 text-[#1591DC]" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects or technologies..."
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>

              {/* Category filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      active === cat
                        ? "text-[#2C5EAD]"
                        : "text-slate-500 hover:text-[#2C5EAD]"
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

          {/* Clickable project list — selecting a row updates the right panel */}
          <Reveal delay={0.15}>
            <ul className="mt-6 flex max-h-[420px] flex-col gap-1 overflow-y-auto pr-1">
              {filtered.map((p) => {
                const isActive = p.slug === selected?.slug;
                return (
                  <li key={p.slug}>
                    <button
                      onClick={() => setSelectedSlug(p.slug)}
                      className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                        isActive ? "text-[#2C5EAD]" : "text-slate-600 hover:text-[#2C5EAD]"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeProject"
                          className="glass absolute inset-0 rounded-xl"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span
                        className={`relative z-10 h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                          isActive ? "bg-[#1591DC]" : "bg-slate-300 group-hover:bg-[#4BB8FA]"
                        }`}
                      />
                      <span className="relative z-10 truncate text-sm font-medium">
                        {p.title}
                      </span>
                    </button>
                  </li>
                );
              })}
              {filtered.length === 0 && (
                <p className="px-3 py-4 text-sm text-slate-400">
                  No matching projects. Try another keyword or category.
                </p>
              )}
            </ul>
          </Reveal>
        </div>

        {/* ---------- RIGHT: static detail panel for the selected project ---------- */}
        <Reveal delay={0.1}>
          <div className="min-h-[420px]">
            <AnimatePresence mode="wait">
              {selected ? (
                <ProjectDetail key={selected.slug} project={selected} />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass flex h-full min-h-[420px] items-center justify-center rounded-3xl text-slate-400"
                >
                  Select a project to see details.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Static detail panel for one project — fully readable on load, no auto-motion.
 * Mounting/unmounting under AnimatePresence gives a smooth fade + slight slide
 * when switching projects.
 */
function ProjectDetail({ project }: { project: Project }) {
  const CategoryIcon = CATEGORY_ICON[project.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="glass flex flex-col overflow-hidden rounded-3xl"
    >
      {/* Thumbnail / icon header */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#C4E2F5]/40">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2C5EAD] via-[#1591DC] to-[#4BB8FA]">
            <CategoryIcon className="h-16 w-16 text-white/90 drop-shadow" />
          </div>
        )}
        {project.featured ? (
          <span className="glass-strong absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-[#1591DC]">
            <Star className="h-3 w-3 fill-[#1591DC]" />
            Featured
          </span>
        ) : null}
      </div>

      <div className="flex flex-col p-6">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#4BB8FA]/15 px-2.5 py-0.5 text-xs font-medium text-[#2C5EAD]">
            {project.category}
          </span>
          {project.year ? (
            <span className="text-xs text-slate-400">{project.year}</span>
          ) : null}
        </div>

        <h3 className="text-xl font-bold tracking-tight text-slate-800">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-[#C4E2F5]/40 px-2 py-0.5 text-[11px] text-[#2C5EAD] ring-1 ring-inset ring-[#4BB8FA]/30"
            >
              {t}
            </span>
          ))}
        </div>

        {(project.demoUrl || project.repoUrl) && (
          <div className="mt-6 flex gap-2">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#2C5EAD] to-[#1591DC] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#2C5EAD]/20 transition-transform hover:scale-[1.03]"
              >
                <ExternalLink className="h-4 w-4" />
                Demo
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#2C5EAD] transition-transform hover:scale-[1.03]"
              >
                <Code2 className="h-4 w-4" />
                Code
              </a>
            ) : null}
          </div>
        )}
      </div>
    </motion.article>
  );
}
