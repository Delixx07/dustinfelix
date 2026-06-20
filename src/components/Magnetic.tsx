"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SPRING_SNAP, useHasHover } from "@/lib/motion";

/**
 * Reusable "magnetic" wrapper (requirement 3.5.D): as the cursor approaches,
 * the child shifts a few pixels toward it with a shared spring, then settles
 * back to rest when the cursor leaves. On touch devices it renders a plain
 * inline-block wrapper with no listeners.
 *
 * `strength` is the fraction of the cursor offset applied (kept small so it
 * reads as a refined detail). `max` clamps the displacement in px.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  max = 10,
  className,
}: {
  children: ReactNode;
  strength?: number;
  max?: number;
  className?: string;
}) {
  const hasHover = useHasHover();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING_SNAP);
  const sy = useSpring(y, SPRING_SNAP);

  if (!hasHover) {
    return <span className={className}>{children}</span>;
  }

  const clamp = (n: number) => Math.max(-max, Math.min(max, n));

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(clamp((e.clientX - cx) * strength));
    y.set(clamp((e.clientY - cy) * strength));
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
