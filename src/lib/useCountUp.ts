"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `end` the first time the element scrolls into view.
 * Uses IntersectionObserver + requestAnimationFrame — no external dependency.
 * Respects prefers-reduced-motion (jumps straight to the final value).
 */
export function useCountUp(end: number, durationMs = 1400) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || startedRef.current) return;
        startedRef.current = true; // run once

        // Reduced motion: jump straight to the final value (no animation).
        if (reduce) {
          setValue(end);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1);
          // easeOutCubic for a smooth deceleration toward the final number
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(eased * end));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, durationMs]);

  return { ref, value };
}
