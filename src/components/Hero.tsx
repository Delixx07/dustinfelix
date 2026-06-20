"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import {
  SiReact,
  SiPython,
  SiFlutter,
  SiTensorflow,
  SiNextdotjs,
} from "react-icons/si";
import { FaGraduationCap, FaCode, FaBriefcase } from "react-icons/fa6";
import type { Profile } from "@/types";
import Magnetic from "./Magnetic";
import { SPRING, useHasHover } from "@/lib/motion";

/** Real photo path (drop the file at /public/images/profile.png). Falls back
    to the profile.avatar field if set. */
const PHOTO = "/images/profile.png";

/** Floating badge cards — labels pulled from the real About stats.
    Positioned just outside the photo card edges so they never cover the face. */
const BADGES = [
  { icon: FaGraduationCap, label: "Informatics Student", pos: "left-[-3rem] top-1/4", delay: 0 },
  { icon: FaCode, label: "12+ Projects", pos: "right-[-2.5rem] top-1/2", delay: 0.8 },
  { icon: FaBriefcase, label: "Open to Internship", pos: "bottom-6 left-[-2rem]", delay: 1.6 },
];

/** Floating tech logos — technologies that actually appear in the projects.
    Kept to the outer corners, clear of the photo. */
const TECH_FLOATERS = [
  { Icon: SiReact, color: "#61DAFB", pos: "right-[-1.5rem] top-4", delay: 0.3 },
  { Icon: SiPython, color: "#3776AB", pos: "left-[-1.5rem] bottom-1/3", delay: 1.1 },
  { Icon: SiFlutter, color: "#02569B", pos: "right-[-1rem] bottom-10", delay: 1.9 },
  { Icon: SiTensorflow, color: "#FF6F00", pos: "left-1/3 top-[-1.5rem]", delay: 0.6 },
  { Icon: SiNextdotjs, color: "#0f172a", pos: "right-1/3 bottom-[-1.5rem]", delay: 1.4 },
];

export default function Hero({ profile }: { profile: Profile }) {
  const hasHover = useHasHover();
  const photoSrc = profile.avatar || PHOTO;

  // --- Cursor spotlight (3.5.C): a fixed-size blurred circle that we TRANSLATE
  // to follow the cursor. Moving via transform is compositor-only (cheap);
  // repainting a full-section radial-gradient every frame is not — that was a
  // big part of the lag.
  const sectionRef = useRef<HTMLElement>(null);
  const glowX = useMotionValue(-9999);
  const glowY = useMotionValue(-9999);

  // --- Photo tilt (3.5.A): pointer position (-0.5..0.5) → rotateX/Y springs.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), SPRING);

  // --- Parallax exit (Improvement 3): scroll progress through the Hero's own
  // height. offset start->end means 0 at top, 1 when the hero has scrolled fully
  // out. Text fades faster + drifts more than the photo → layered depth cue.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 0.8], [0, -50]);
  const photoScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // Throttle cursor handlers to one update per animation frame. Without this,
  // mousemove fires far more often than the screen refreshes and floods the
  // motion values with work → the jank you saw. rAF coalesces to ~60fps.
  const rafSection = useRef(0);
  const rafPhoto = useRef(0);

  function handleSectionMove(e: React.MouseEvent<HTMLElement>) {
    if (!hasHover || rafSection.current) return;
    const { clientX, clientY } = e;
    rafSection.current = requestAnimationFrame(() => {
      rafSection.current = 0;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      // local px coords for translating the spotlight circle (centered on cursor)
      glowX.set(clientX - rect.left);
      glowY.set(clientY - rect.top);
    });
  }

  function handlePhotoMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!hasHover || rafPhoto.current) return;
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    rafPhoto.current = requestAnimationFrame(() => {
      rafPhoto.current = 0;
      px.set((clientX - rect.left) / rect.width - 0.5);
      py.set((clientY - rect.top) / rect.height - 0.5);
    });
  }

  function resetPhoto() {
    px.set(0);
    py.set(0);
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleSectionMove}
      className="relative isolate flex min-h-screen items-center overflow-hidden px-4 pt-24"
    >
      {/* Hero background image (drop your file at /public/images/hero-bg.jpg).
          If it's missing the section just falls back to the page background. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Overlay — the current page background colour at partial opacity, so the
          bg image reads as a soft tinted texture (the "opacity play" you asked
          for). Adjust the /85 alpha to taste. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[#eef6fd]/85"
      />

      {/* Cursor-aware ambient glow (3.5.C) — a soft blue circle translated to
          the cursor (transform-only, cheap). */}
      {hasHover && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -z-10 h-[480px] w-[480px] rounded-full"
          style={{
            left: -240,
            top: -240,
            x: glowX,
            y: glowY,
            background:
              "radial-gradient(circle, rgba(75,184,250,0.18), transparent 70%)",
          }}
        />
      )}

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* ---------- LEFT: text (parallax exit — fades faster, drifts more) ---------- */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="order-2 text-center md:order-1 md:text-left"
        >
          {profile.location ? (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass mb-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-slate-600"
            >
              <MapPin className="h-3 w-3" />
              {profile.location}
            </motion.span>
          ) : null}

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl"
          >
            Hi, I am{" "}
            <span className="gradient-text-animated">{profile.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-4 max-w-2xl text-lg text-slate-600 sm:text-xl md:mx-0"
          >
            {profile.role}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
          >
            {/* Magnetic CTA buttons (3.5.D) — primary filled + secondary outline */}
            <Magnetic>
              <a
                href="#projects"
                className="block rounded-full bg-gradient-to-r from-[#2C5EAD] to-[#1591DC] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2C5EAD]/25 transition-transform hover:scale-105"
              >
                View Projects
              </a>
            </Magnetic>
            {/* Download CV — secondary outline button. Real download link via
                the `download` attr; drop the PDF at /public/files/ to enable. */}
            <Magnetic>
              <a
                href={profile.cvUrl || "/files/Dustin_Felix_CV.pdf"}
                download
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#2C5EAD]/40 bg-white/40 px-6 py-3 text-sm font-semibold text-[#2C5EAD] transition-all hover:scale-105 hover:border-[#2C5EAD] hover:bg-white/70"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* ---------- RIGHT: cutout photo + floaters (parallax exit — slower) ---------- */}
        <motion.div
          style={{ y: photoY, scale: photoScale, opacity: photoOpacity }}
          className="order-1 flex justify-center md:order-2"
        >
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center"
            style={{ perspective: 1000 }}
          >
          <div
            onMouseMove={handlePhotoMove}
            onMouseLeave={resetPhoto}
            className="relative isolate aspect-[2/3] w-60 sm:w-72 md:w-80"
          >
            {/* Cutout photo (native 2:3, transparent background) — tilts toward
                the cursor. No card/blob behind it; the hero background shows
                through the transparent areas. */}
            <motion.div
              style={{ rotateX, rotateY, willChange: "transform" }}
              className="absolute inset-0 z-10"
            >
              <HeroPhoto src={photoSrc} name={profile.name} />
            </motion.div>

            {/* Floating badge cards (magnetic, 3.5.B) */}
            {BADGES.map(({ icon: Icon, label, pos, delay }) => (
              <div key={label} className={`absolute ${pos} z-20`}>
                <Magnetic strength={0.25} max={10}>
                  <div
                    className="animate-float glass-lite flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold text-slate-700"
                    style={{ animationDelay: `${delay}s` }}
                  >
                    <Icon className="h-4 w-4 text-[#1591DC]" />
                    {label}
                  </div>
                </Magnetic>
              </div>
            ))}

            {/* Floating tech logos */}
            {TECH_FLOATERS.map(({ Icon, color, pos, delay }, i) => (
              <div key={i} className={`absolute ${pos} z-10`}>
                <Magnetic strength={0.3} max={12}>
                  <div
                    className="animate-float glass-lite flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ animationDelay: `${delay}s` }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </div>
                </Magnetic>
              </div>
            ))}
          </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator — clickable (smooth-scrolls to About, consistent with
          navbar anchor links), with a clear hover affordance + gentle bounce. */}
      <motion.a
        href="#about"
        aria-label="Scroll down to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1 },
          y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.25 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 cursor-pointer items-center justify-center rounded-full p-2 text-[#1591DC] transition-colors hover:text-[#2C5EAD]"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}

/**
 * Profile photo with a graceful fallback: if the file is missing (no photo
 * supplied yet), it shows a styled gradient initial instead of a broken image.
 */
function HeroPhoto({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Fallback keeps a tidy rounded square centered in the (taller) container.
    return (
      <div className="flex h-full w-full items-end justify-center">
        <div className="glass-strong flex aspect-square w-4/5 items-center justify-center overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#2C5EAD] via-[#1591DC] to-[#4BB8FA]">
          <span className="text-7xl font-black text-white/90">
            {name.charAt(0)}
          </span>
        </div>
      </div>
    );
  }

  // Cutout mode: transparent PNG at its native 2:3 ratio, no card behind it.
  // NOTE: no CSS `drop-shadow` filter here — re-evaluating a filter on a large
  // transparent image every tilt frame was the main cause of the jank.
  // transform-gpu + translateZ(0) promotes it to its own compositor layer so
  // the 3D tilt is a cheap transform of an already-rasterized layer.
  return (
    <Image
      src={src}
      alt={name}
      fill
      sizes="(max-width: 768px) 15rem, 20rem"
      className="transform-gpu object-contain object-bottom"
      style={{ transform: "translateZ(0)" }}
      loading="eager"
      // Serve the original transparent PNG as-is. Next's optimizer re-encodes
      // to lossy WebP which DROPS the alpha channel — turning the cutout's
      // transparent background into a solid white box. unoptimized preserves it.
      unoptimized
      onError={() => setFailed(true)}
    />
  );
}
