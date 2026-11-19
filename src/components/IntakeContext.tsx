"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { ServiceKey } from "@/content/site";

export type Situatie = "starter" | "zzp" | "klein" | "anders";
export type Aanlevering = "digitaal" | "map" | "onbekend";

export type Intake = {
  situatie: Situatie | null;
  aanlevering: Aanlevering | null;
  hulp: ServiceKey[];
};

type Ctx = Intake & {
  setSituatie: (s: Situatie) => void;
  setAanlevering: (a: Aanlevering) => void;
  toggleHulp: (k: ServiceKey) => void;
  isEmpty: boolean;
};

const IntakeCtx = createContext<Ctx | null>(null);

export function IntakeProvider({ children }: { children: ReactNode }) {
  const [situatie, setSituatie] = useState<Situatie | null>(null);
  const [aanlevering, setAanlevering] = useState<Aanlevering | null>(null);
  const [hulp, setHulp] = useState<ServiceKey[]>([]);

  const value = useMemo<Ctx>(
    () => ({
      situatie,
      aanlevering,
      hulp,
      setSituatie,
      setAanlevering,
      toggleHulp: (k) => setHulp((h) => (h.includes(k) ? h.filter((x) => x !== k) : [...h, k])),
      isEmpty: !situatie && !aanlevering && hulp.length === 0,
    }),
    [situatie, aanlevering, hulp],
  );

  return <IntakeCtx.Provider value={value}>{children}</IntakeCtx.Provider>;
}

export function useIntake() {
  const ctx = useContext(IntakeCtx);
  if (!ctx) throw new Error("useIntake must be used inside IntakeProvider");
  return ctx;
}

export const situatieLabel: Record<Situatie, string> = {
  starter: "Starter",
  zzp: "Zzp'er",
  klein: "Kleine onderneming",
  anders: "Anders",
};

export const aanleverLabel: Record<Aanlevering, string> = {
  digitaal: "Alles digitaal",
  map: "In een map",
  onbekend: "Weet ik nog niet",
};
