"use client";

import { motion, useReducedMotion } from "motion/react";
import { MARK_PATHS } from "./Mark";

/**
 * The triangle from Karin's logo with its bar: one plain, solid blue
 * rectangle that slides in across the gap in the legs.
 */
export function HeroPapers() {
  const reduce = useReducedMotion();

  return (
    <svg className="hero__motif" viewBox="0 0 400 360" aria-hidden="true">
      <g transform="scale(4)" fill="none" stroke="var(--green-bright)" strokeWidth="9" strokeLinejoin="miter">
        <path d={MARK_PATHS.upper} />
        <path d={MARK_PATHS.lowerLeft} />
        <path d={MARK_PATHS.lowerRight} />
      </g>
      <motion.rect
        x="24"
        y="202"
        width="352"
        height="36"
        fill="var(--bar-blue)"
        style={{ transformBox: "fill-box", transformOrigin: "left center" }}
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
