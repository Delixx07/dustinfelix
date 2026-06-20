"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, ExternalLink, Star } from "lucide-react";
import { CATEGORY_ICON } from "@/lib/techIcons";
import type { Project } from "@/types";

export default function ProjectCard({ project }: { project: Project }) {
  // Semantic icon for the thumbnail placeholder, chosen by category.
  const CategoryIcon = CATEGORY_ICON[project.category];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="glass group relative flex flex-col overflow-hidden rounded-3xl shadow-md transition-shadow duration-300 hover:shadow-2xl hover:shadow-[#2C5EAD]/15"
    >
      {project.featured ? (
        <span className="glass-strong absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-[#1591DC]">
          <Star className="h-3 w-3 fill-[#1591DC]" />
          Featured
        </span>
      ) : null}

      {/* Image / placeholder */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#C4E2F5]/40">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          // No screenshot yet → gradient + semantic category icon (zooms on hover)
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2C5EAD] via-[#1591DC] to-[#4BB8FA] transition-transform duration-500 group-hover:scale-110">
            <CategoryIcon className="h-14 w-14 text-white/90 drop-shadow" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#4BB8FA]/15 px-2.5 py-0.5 text-xs font-medium text-[#2C5EAD]">
            {project.category}
          </span>
          {project.year ? (
            <span className="text-xs text-slate-400">{project.year}</span>
          ) : null}
        </div>

        <h3 className="text-lg font-bold tracking-tight text-slate-800">{project.title}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">
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

        <div className="mt-5 flex gap-2">
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#2C5EAD] to-[#1591DC] px-3 py-2 text-xs font-semibold text-white shadow-md shadow-[#2C5EAD]/20 transition-transform hover:scale-[1.03]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Demo
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#2C5EAD] transition-transform hover:scale-[1.03]"
            >
              <Code2 className="h-3.5 w-3.5" />
              Code
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
