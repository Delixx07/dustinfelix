"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import { collectTechGroups } from "@/lib/techIcons";
import type { Profile, Project } from "@/types";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-center text-3xl font-bold tracking-tight sm:text-4xl">
      {children}
    </h2>
  );
}

export default function About({
  profile,
  projects,
}: {
  profile: Profile;
  projects: Project[];
}) {
  const categories = new Set(projects.map((p) => p.category));
  const techCount = new Set(projects.flatMap((p) => p.tech)).size;
  const stats = [
    { label: "Total Projects", value: projects.length, suffix: "+" },
    { label: "Categories", value: categories.size, suffix: "" },
    { label: "Technologies", value: techCount, suffix: "+" },
  ];

  // Curated, labeled groups of the real tech stack (Languages, Frameworks, …).
  const techGroups = collectTechGroups(projects.map((p) => p.tech));

  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-24">
      <Reveal>
        <SectionTitle>About Me</SectionTitle>
      </Reveal>

      {/* "Who I am" — bio + tech grouped together in one soft container so they
          read as a single block, visually separate from the stats row below. */}
      <Reveal delay={0.1}>
        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-[#4BB8FA]/20 bg-white/40 p-6 sm:p-8">
          {/* Bio */}
          <p className="text-center text-lg leading-relaxed text-slate-700">
            {profile.about}
          </p>

          {/* Tech stack — grouped + labeled */}
          {techGroups.length > 0 && (
            <div className="mt-8 border-t border-[#4BB8FA]/20 pt-6">
              <p className="mb-5 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                Technologies I&apos;ve worked with
              </p>

              <div className="flex flex-col gap-5">
                {techGroups.map((group, gi) => (
                  <motion.div
                    key={group.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: gi * 0.08, ease: "easeOut" }}
                    className="flex flex-col items-center gap-3 sm:flex-row sm:items-start"
                  >
                    {/* group label */}
                    <span className="w-full shrink-0 text-center text-xs font-semibold text-[#2C5EAD] sm:w-40 sm:pt-2 sm:text-right">
                      {group.label}
                    </span>

                    {/* icons with always-visible captions (Option A) */}
                    <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                      {group.items.map((tech) => (
                        <div
                          key={tech.name}
                          className="flex w-16 flex-col items-center gap-1.5"
                          title={tech.name}
                        >
                          <div className="glass flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-200 hover:scale-110">
                            <tech.Icon
                              className="h-6 w-6"
                              style={{ color: tech.color }}
                              aria-label={tech.name}
                            />
                          </div>
                          <span className="w-full truncate text-center text-[10px] leading-tight text-slate-500">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Reveal>

      {/* "The numbers" — stat cards, staggered scroll-in, count up from 0 */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div className="glass rounded-2xl p-6 text-center">
              <CountUp
                end={s.value}
                suffix={s.suffix}
                className="bg-gradient-to-r from-[#2C5EAD] to-[#1591DC] bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl"
              />
              <div className="mt-1 text-xs text-slate-500 sm:text-sm">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
