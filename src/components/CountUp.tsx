"use client";

import { useCountUp } from "@/lib/useCountUp";

/**
 * Renders a number that counts up from 0 → `end` the first time it scrolls
 * into view. Thin wrapper around the useCountUp hook so each stat gets its
 * own observer + animation frame loop.
 */
export default function CountUp({
  end,
  suffix = "",
  className,
}: {
  end: number;
  suffix?: string;
  className?: string;
}) {
  const { ref, value } = useCountUp(end);
  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
