"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import type { Profile } from "@/types";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-24 text-center"
    >
      {profile.avatar ? (
        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="glass mb-6 overflow-hidden rounded-full p-1"
        >
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={120}
            height={120}
            className="h-28 w-28 rounded-full object-cover"
          />
        </motion.div>
      ) : null}

      {profile.location ? (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass mb-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-white/70"
        >
          <MapPin className="h-3 w-3" />
          {profile.location}
        </motion.span>
      ) : null}

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl"
      >
        Hi, I am{" "}
        <span className="bg-gradient-to-r from-indigo-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
          {profile.name}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="mt-4 max-w-2xl text-lg text-white/70 sm:text-xl"
      >
        {profile.role}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href="#projects"
          className="glass-strong rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          View Projects
        </a>
        {profile.cvUrl ? (
          <a
            href={profile.cvUrl}
            download
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white/80 transition-transform hover:scale-105"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
        ) : null}
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 1.8 } }}
        className="absolute bottom-8 text-white/50"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}
