"use client";

import Link from "next/link";
import { services } from "@/content/site";
import {
  aanleverLabel,
  situatieLabel,
  useIntake,
  type Aanlevering,
  type Situatie,
} from "./IntakeContext";

const NOTES: Record<Aanlevering, string> = {
  digitaal: "Je levert digitaal aan. Dan kan ik direct met je administratie aan de slag.",
  map: "Je levert aan in een map. Het digitaliseren neem ik dan van je over. Dat is extra werk, en dat nemen we mee in het voorstel.",
  onbekend: "Geen probleem. In het kennismakingsgesprek kijken we samen wat het beste bij je past.",
};

/** The page's one live thing: compose your intake and read it back as a receipt. */
export function IntakeComposer({ formHref = "/contact#formulier" }: { formHref?: string }) {
  const intake = useIntake();
  const chosen = services.filter((s) => intake.hulp.includes(s.key));

  return (
    <section className="wrap intake" aria-labelledby="intake-titel">
      <div data-reveal>
        <h2 id="intake-titel">Stel je kennismaking samen</h2>
        <p className="intake__intro">
          Kies wat bij je past. Zo zie je meteen waarom een prijs maatwerk is, en neem je je keuzes mee naar het
          kennismakingsgesprek.
        </p>

        <fieldset>
          <legend>Ik ben</legend>
          <div className="chips">
            {(Object.keys(situatieLabel) as Situatie[]).map((k) => (
              <label className="chip" key={k}>
                <input
                  type="radio"
                  name="situatie"
                  value={k}
                  checked={intake.situatie === k}
                  onChange={() => intake.setSituatie(k)}
                />
                <span>
                  <span className="tri" aria-hidden="true" />
                  {situatieLabel[k]}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Mijn bonnen en facturen lever ik aan</legend>
          <div className="chips">
            {(Object.keys(aanleverLabel) as Aanlevering[]).map((k) => (
              <label className="chip" key={k}>
                <input
                  type="radio"
                  name="aanlevering"
                  value={k}
                  checked={intake.aanlevering === k}
                  onChange={() => intake.setAanlevering(k)}
                />
                <span>
                  <span className="tri" aria-hidden="true" />
                  {aanleverLabel[k]}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Ik wil hulp bij</legend>
          <div className="chips">
            {services.map((s) => (
              <label className="chip" key={s.key}>
                <input
                  type="checkbox"
                  name="hulp"
                  value={s.key}
                  checked={intake.hulp.includes(s.key)}
                  onChange={() => intake.toggleHulp(s.key)}
                />
                <span>
                  <span className="tri" aria-hidden="true" />
                  {s.title}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className="receipt" aria-labelledby="bon-titel" data-reveal style={{ ["--d" as string]: "120ms" }}>
        <p id="bon-titel" className="receipt__title">
          Jouw kennismaking
        </p>
        <p className="receipt__sub">Administratiekantoor Karin Kouwenhoven, Gouda</p>
        <div aria-live="polite">
          {intake.isEmpty ? (
            <p className="receipt__empty" style={{ marginTop: 24 }}>
              Nog niets gekozen. Tik links aan wat voor jou geldt.
            </p>
          ) : (
            <ul className="receipt__lines">
              {intake.situatie ? (
                <li>
                  <span>{situatieLabel[intake.situatie]}</span>
                  <span>situatie</span>
                </li>
              ) : null}
              {intake.aanlevering ? (
                <li>
                  <span>{aanleverLabel[intake.aanlevering]}</span>
                  <span>aanlevering</span>
                </li>
              ) : null}
              {chosen.map((s) => (
                <li key={s.key}>
                  <span>{s.title}</span>
                  <span>{s.group === "extra" ? "extra service" : "dienst"}</span>
                </li>
              ))}
            </ul>
          )}
          {intake.aanlevering ? <p className="receipt__note">{NOTES[intake.aanlevering]}</p> : null}
        </div>
        <div className="receipt__total">
          <span>Totaal</span>
          <strong>Persoonlijk voorstel</strong>
        </div>
        <Link href={formHref} className="btn btn--ink">
          Bespreek jouw situatie <span className="tri" aria-hidden="true" />
        </Link>
      </aside>
    </section>
  );
}
