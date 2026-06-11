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
          className="bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-sm font-bold tracking-tight text-transparent sm:text-base"
        >
          {name.split(" ")[0] || "Portfolio"}
        </a>
        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:text-sm"
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
