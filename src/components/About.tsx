"use client";

import Reveal from "./Reveal";
import CountUp from "./CountUp";
import { collectTechIcons } from "@/lib/techIcons";
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

  // Real technologies (across all projects) that have a brand icon.
  const techIcons = collectTechIcons(projects.map((p) => p.tech));

  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-24">
      <Reveal>
        <SectionTitle>About Me</SectionTitle>
      </Reveal>

      {/* Bio card — fades + slides up on scroll into view */}
      <Reveal delay={0.1}>
        <div className="glass mx-auto mt-8 max-w-3xl rounded-3xl p-8 text-center">
          <p className="text-lg leading-relaxed text-slate-700">{profile.about}</p>
        </div>
      </Reveal>

      {/* Tech stack icon row — real techs, hover-scale + tooltip */}
      {techIcons.length > 0 && (
        <Reveal delay={0.15}>
          <div className="mt-8">
            <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-slate-400">
              Technologies I&apos;ve worked with
            </p>
            <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
              {techIcons.map(({ name, Icon, color }) => (
                <div key={name} className="group relative">
                  <div className="glass flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-200 hover:scale-110">
                    <Icon className="h-6 w-6" style={{ color }} aria-label={name} />
                  </div>
                  {/* Tooltip */}
                  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#14233f] px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Stat cards — staggered scroll-in, numbers count up from 0 */}
      <div className="mt-10 grid grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={0.2 + i * 0.1}>
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
