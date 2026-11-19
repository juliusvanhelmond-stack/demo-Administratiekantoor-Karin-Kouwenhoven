"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { steps } from "@/content/site";

/** Nine sheets that travel from loose slips to one closed binder. */
const COLORS = ["#ffffff", "#ded5c7", "#c9d3c0"];
const SCATTER = [
  [40, 40, -24], [250, 20, 18], [150, 120, 52], [290, 170, -12], [20, 220, 30],
  [180, 260, -40], [280, 300, 8], [60, 330, -10], [200, 30, 70],
];
type Pos = [number, number, number];
function position(step: number, i: number): Pos {
  if (step === 0) return SCATTER[i] as Pos;
  if (step === 1) {
    const pile = i % 3;
    const layer = Math.floor(i / 3);
    return [30 + pile * 120 + layer * 3, 230 - layer * 8, layer % 2 ? 3 : -3];
  }
  if (step === 2) return [150 + (i % 2) * 2, 110 + i * 16, 0];
  return [155, 150 + i * 2, 0];
}
const SHAPE = ["#ded5c7", "#c9d3c0", "#e2d6c2", "#233743"];

export function Werkwijze() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [scrollMode, setScrollMode] = useState(false);
  const wrapRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const update = () => setScrollMode(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!scrollMode) return;
    setStep(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length * 0.999))));
  });

  const choose = (i: number) => {
    setStep(i);
    const el = wrapRef.current;
    if (scrollMode && el) {
      const travel = el.offsetHeight - window.innerHeight;
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + travel * ((i + 0.5) / steps.length), behavior: "smooth" });
    }
  };

  const t = reduce ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      ref={wrapRef}
      id="werkwijze"
      className={`werkwijze${scrollMode ? " werkwijze--scroll" : ""}`}
      aria-labelledby="werkwijze-titel"
    >
      <div className="werkwijze__stage">
        <div className="werkwijze__visual">
          <div className="werkwijze__shape" style={{ backgroundColor: SHAPE[step] }} aria-hidden="true" />
          <svg className="werkwijze__scene" viewBox="0 0 400 420" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => {
              const [x, y, r] = position(step, i);
              return (
                <motion.g
                  key={i}
                  initial={false}
                  animate={{ x, y, rotate: r }}
                  transition={{ ...t, delay: reduce ? 0 : i * 0.035 }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                >
                  <rect width="96" height="124" fill={COLORS[i % 3]} />
                  <rect x={66 - (i % 4) * 14} y="-10" width="24" height="12" fill={step >= 2 ? "#4f6b22" : COLORS[i % 3]} />
                  <rect x="12" y="18" width={44 + (i % 3) * 12} height="5" fill="#233743" opacity="0.28" />
                  <rect x="12" y="32" width="62" height="5" fill="#233743" opacity="0.18" />
                  <rect x="12" y="46" width={36 + (i % 2) * 20} height="5" fill="#233743" opacity="0.18" />
                </motion.g>
              );
            })}
            <motion.g
              initial={false}
              animate={{ opacity: step === 3 ? 1 : 0, y: step === 3 ? 0 : 40 }}
              transition={t}
            >
              <rect x="130" y="110" width="146" height="230" fill="#e9b824" />
              <rect x="130" y="110" width="16" height="230" fill="#c99a12" />
              <circle cx="210" cy="250" r="16" fill="#233743" />
              <rect x="168" y="150" width="84" height="44" fill="#ffffff" />
              <rect x="178" y="166" width="54" height="6" fill="#233743" opacity="0.5" />
            </motion.g>
          </svg>
        </div>

        <div className="werkwijze__list">
          <h2 id="werkwijze-titel" className="werkwijze__heading">
            Van losse bonnetjes naar overzicht
          </h2>
          <ol className="werkwijze__names">
            {steps.map((s, i) => (
              <li key={s.name}>
                <button type="button" aria-pressed={step === i} onClick={() => choose(i)}>
                  <span className="tri" aria-hidden="true" />
                  <span className="sr-only">Stap {i + 1}: </span>
                  {s.name}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="werkwijze__fact" aria-live="polite">
          <div className="werkwijze__progress" aria-hidden="true">
            {steps.map((s, i) => (
              <span key={s.name} data-on={i <= step} />
            ))}
          </div>
          <p>
            <strong>{steps[step].name}.</strong> {steps[step].text}
          </p>
          <p className="small muted">Een indicatie van hoe het kan lopen. We stemmen het samen af op jouw onderneming.</p>
        </div>
      </div>
    </section>
  );
}
