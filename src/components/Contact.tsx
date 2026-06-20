"use client";

import { Mail } from "lucide-react";
import Reveal from "./Reveal";
import BrandIcon from "./BrandIcon";
import type { Profile } from "@/types";

export default function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-4 py-24">
      <Reveal>
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Let&apos;s Connect
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-slate-500">
          Have a question, a project, or just want to say hi? Send a message.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="glass mt-8 rounded-3xl p-8 text-center">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2C5EAD] to-[#1591DC] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2C5EAD]/25 transition-transform hover:scale-105"
          >
            <Mail className="h-4 w-4" />
            {profile.email}
          </a>

          {profile.socials.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="glass flex h-12 w-12 items-center justify-center rounded-full text-[#2C5EAD] transition-all hover:scale-110 hover:text-[#1591DC]"
                >
                  <BrandIcon name={s.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
