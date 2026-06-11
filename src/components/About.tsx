"use client";

import Reveal from "./Reveal";
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
  const stats = [
    { label: "Total Projects", value: projects.length },
    { label: "Categories", value: categories.size },
    {
      label: "Technologies",
      value: new Set(projects.flatMap((p) => p.tech)).size,
    },
  ];

  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-24">
      <Reveal>
        <SectionTitle>About Me</SectionTitle>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="glass mx-auto mt-8 max-w-3xl rounded-3xl p-8 text-center">
          <p className="text-lg leading-relaxed text-white/80">{profile.about}</p>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={0.15 + i * 0.1}>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-white/60 sm:text-sm">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
