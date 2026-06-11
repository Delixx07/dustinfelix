"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, ExternalLink, Star } from "lucide-react";
import type { Project } from "@/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="glass group relative flex flex-col overflow-hidden rounded-3xl"
    >
      {project.featured ? (
        <span className="glass-strong absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-amber-200">
          <Star className="h-3 w-3 fill-amber-200" />
          Featured
        </span>
      ) : null}

      {/* Image / placeholder */}
      <div className="relative aspect-video w-full overflow-hidden bg-white/5">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/30">
            <span className="text-4xl font-black text-white/40">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/70">
            {project.category}
          </span>
          {project.year ? (
            <span className="text-xs text-white/40">{project.year}</span>
          ) : null}
        </div>

        <h3 className="text-lg font-bold tracking-tight">{project.title}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-white/65">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-white/60 ring-1 ring-inset ring-white/10"
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
              className="glass-strong inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.03]"
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
              className="glass inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-white/80 transition-transform hover:scale-[1.03]"
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
