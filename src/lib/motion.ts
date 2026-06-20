"use client";

import { useSyncExternalStore } from "react";

/**
 * Shared spring physics so every cursor-reactive interaction across the site
 * feels like the same "material" (requirement 3.5.E). Soft + settling, never
 * bouncy — tuned for the premium feel of Linear / Vercel / Stripe.
 */
export const SPRING = { stiffness: 150, damping: 20, mass: 0.4 } as const;

/** A slightly snappier spring for small magnetic translations. */
export const SPRING_SNAP = { stiffness: 200, damping: 18, mass: 0.3 } as const;

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeHover(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia(HOVER_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/**
 * True only on devices with a real hovering pointer (mouse/trackpad).
 * Cursor-tracking effects fall back to the static float on touch devices
 * (performance note in 3.5). Uses useSyncExternalStore so the server snapshot
 * (false) matches first paint, then upgrades on the client with no
 * setState-in-effect.
 */
export function useHasHover(): boolean {
  return useSyncExternalStore(
    subscribeHover,
    () => window.matchMedia(HOVER_QUERY).matches, // client snapshot
    () => false // server snapshot
  );
}
