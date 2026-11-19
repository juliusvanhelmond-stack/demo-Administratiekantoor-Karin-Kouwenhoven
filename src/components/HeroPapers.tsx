"use client";

import { motion, useReducedMotion } from "motion/react";
import { MARK_PATHS } from "./Mark";

/**
 * Loose slips of paper drift in and settle into one neat stack, which
 * becomes the bar that crosses the triangle in Karin's logo.
 */
const SHEETS = [
  { fill: "#ffffff", from: { x: -150, y: 30, r: -38 } },
  { fill: "#ded5c7", from: { x: 230, y: -60, r: 24 } },
  { fill: "#f7f5f0", from: { x: -60, y: -120, r: 62 } },
  { fill: "#c9d3c0", from: { x: 260, y: 140, r: -18 } },
  { fill: "#ffffff", from: { x: -200, y: 150, r: 14 } },
  { fill: "#ece6dc", from: { x: 90, y: -170, r: -70 } },
  { fill: "#ded5c7", from: { x: 30, y: 200, r: 40 } },
];

export function HeroPapers() {
  const reduce = useReducedMotion();
  const bar = { x: 8, w: 384, y: 197, h: 46 };

  return (
    <svg className="hero__motif" viewBox="0 0 400 360" aria-hidden="true">
      <g transform="scale(4)" fill="none" stroke="var(--green-bright)" strokeWidth="9" strokeLinejoin="miter">
        <path d={MARK_PATHS.upper} />
        <path d={MARK_PATHS.lowerLeft} />
        <path d={MARK_PATHS.lowerRight} />
      </g>
      {SHEETS.map((s, i) => {
        const finalY = bar.y + i * (bar.h / SHEETS.length) * 0.82;
        const final = { x: 0, y: 0, rotate: 0, opacity: 1 };
        return (
          <motion.g
            key={i}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            initial={reduce ? final : { x: s.from.x, y: s.from.y, rotate: s.from.r, opacity: 0 }}
            animate={final}
            transition={{
              duration: 1.6,
              delay: 0.35 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 0.4, delay: 0.25 + i * 0.12 },
            }}
          >
            <rect x={bar.x + i * 2} y={finalY} width={bar.w - i * 4} height={14} fill={s.fill} />
            <rect x={bar.x + 20 + i * 2} y={finalY + 5} width={60 + ((i * 37) % 90)} height={3} fill="#233743" opacity={0.25} />
          </motion.g>
        );
      })}
    </svg>
  );
}
