"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`glass flex w-full max-w-3xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${
          scrolled ? "scale-100 opacity-100" : "scale-[1.01]"
        }`}
      >
        <a
          href="#home"
          className="bg-gradient-to-r from-[#2C5EAD] to-[#1591DC] bg-clip-text text-sm font-bold tracking-tight text-transparent sm:text-base"
        >
          {name || "Portfolio"}
        </a>
        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-[#4BB8FA]/15 hover:text-[#2C5EAD] sm:text-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
