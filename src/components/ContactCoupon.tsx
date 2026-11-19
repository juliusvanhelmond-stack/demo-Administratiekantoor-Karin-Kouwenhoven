"use client";

import { useRef, useState, type FormEvent } from "react";
import { business, services } from "@/content/site";
import { aanleverLabel, situatieLabel, useIntake } from "./IntakeContext";

type Errors = Partial<Record<"naam" | "email" | "vraag" | "toestemming", string>>;

/**
 * No form backend is configured for this demo, so the form composes an
 * e-mail in the visitor's own mail program. It never shows a fake
 * "sent" message.
 */
export function ContactCoupon({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const intake = useIntake();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "opened">("idle");
  const [mailBody, setMailBody] = useState("");
  const Heading = headingLevel === 1 ? "h1" : "h2";

  const chosen = [
    intake.situatie ? situatieLabel[intake.situatie] : null,
    intake.aanlevering ? `aanlevering: ${aanleverLabel[intake.aanlevering].toLowerCase()}` : null,
    ...services.filter((s) => intake.hulp.includes(s.key)).map((s) => s.title),
  ].filter(Boolean) as string[];

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const naam = String(fd.get("naam") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const telefoon = String(fd.get("telefoon") || "").trim();
    const vraag = String(fd.get("vraag") || "").trim();
    const toestemming = fd.get("toestemming") === "ja";

    const next: Errors = {};
    if (!naam) next.naam = "Vul je naam in.";
    if (!email) next.email = "Vul je e-mailadres in.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Dit e-mailadres lijkt niet te kloppen.";
    if (!vraag) next.vraag = "Schrijf kort je vraag of situatie.";
    if (!toestemming) next.toestemming = "Geef toestemming zodat Karin contact met je kan opnemen.";
    setErrors(next);

    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const body = [
      `Hoi Karin,`,
      ``,
      vraag,
      ``,
      chosen.length ? `Mijn keuzes: ${chosen.join(", ")}` : null,
      ``,
      `Naam: ${naam}`,
      `E-mail: ${email}`,
      telefoon ? `Telefoon: ${telefoon}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");
    setMailBody(body);
    const href = `mailto:${business.email}?subject=${encodeURIComponent(
      `Kennismaking aanvragen: ${naam}`,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatus("opened");
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <span className="form__error" id={`err-${k}`}>
        {errors[k]}
      </span>
    ) : null;

  return (
    <section className="wrap coupon-section" id="contact" aria-labelledby="contact-titel">
      <div className="coupon" data-reveal>
        <div className="coupon__left">
          <Heading id="contact-titel">Plan een kennismaking</Heading>
          <p>
            Vertel kort waar je mee zit. Ik neem contact met je op om een moment te plannen, aan de telefoon of op
            kantoor in Gouda.
          </p>
          <div className="coupon__direct">
            <a href={business.phoneHref}>
              <span className="tri" aria-hidden="true" />
              {business.phoneDisplay}
            </a>
            <a href={business.emailHref}>
              <span className="tri" aria-hidden="true" />
              {business.email}
            </a>
            <a href={business.whatsappHref} target="_blank" rel="noopener noreferrer">
              <span className="tri" aria-hidden="true" />
              WhatsApp
              <span className="sr-only"> (opent in nieuw venster)</span>
            </a>
            <p className="coupon__visit">
              {business.street} ({business.streetNote}), {business.postalCode} {business.city}.
              <br />
              <strong>{business.visitNote}.</strong>
            </p>
          </div>
        </div>

        <div className="coupon__right" id="formulier">
          <form ref={formRef} className="form" noValidate onSubmit={onSubmit} aria-describedby="form-uitleg">
            <p id="form-uitleg" className="form__privacy">
              Velden met * zijn verplicht. Deel hier geen BSN, bankgegevens of belastingdocumenten; die bespreken we
              veilig in het gesprek.
            </p>
            <div className="form__row form__row--2">
              <div className="form__row">
                <label htmlFor="f-naam">Naam *</label>
                <input
                  id="f-naam"
                  name="naam"
                  type="text"
                  autoComplete="name"
                  aria-invalid={!!errors.naam}
                  aria-describedby={errors.naam ? "err-naam" : undefined}
                />
                {err("naam")}
              </div>
              <div className="form__row">
                <label htmlFor="f-tel">Telefoon (optioneel)</label>
                <input id="f-tel" name="telefoon" type="tel" autoComplete="tel" inputMode="tel" />
              </div>
            </div>
            <div className="form__row">
              <label htmlFor="f-email">E-mailadres *</label>
              <input
                id="f-email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
              />
              {err("email")}
            </div>
            <div className="form__row">
              <label htmlFor="f-vraag">Je vraag *</label>
              <textarea
                id="f-vraag"
                name="vraag"
                rows={5}
                aria-invalid={!!errors.vraag}
                aria-describedby={errors.vraag ? "err-vraag" : undefined}
              />
              {err("vraag")}
            </div>
            {chosen.length ? (
              <p className="form__chosen">
                <strong>Gaat mee in je bericht:</strong> {chosen.join(", ")}
              </p>
            ) : null}
            <div className="form__row">
              <label className="form__consent">
                <input
                  type="checkbox"
                  name="toestemming"
                  value="ja"
                  aria-invalid={!!errors.toestemming}
                  aria-describedby={errors.toestemming ? "err-toestemming" : undefined}
                />
                <span>
                  Karin mag mijn gegevens gebruiken om contact met mij op te nemen over deze vraag. *
                </span>
              </label>
              {err("toestemming")}
            </div>
            <button type="submit" className="btn btn--ink form__submit">
              Stel je vraag <span className="tri" aria-hidden="true" />
            </button>
            <div aria-live="polite">
              {status === "opened" ? (
                <div className="form__status">
                  <strong>Je e-mailprogramma wordt geopend.</strong>
                  Je bericht staat klaar; verstuur het daar om het bij Karin te laten aankomen. Opent er niets? Mail
                  dan naar{" "}
                  <a className="link" href={business.emailHref}>
                    {business.email}
                  </a>{" "}
                  of bel {business.phoneDisplay}.
                  <details style={{ marginTop: 10 }}>
                    <summary>Bekijk je bericht</summary>
                    <pre style={{ whiteSpace: "pre-wrap", font: "inherit", margin: "8px 0 0" }}>{mailBody}</pre>
                  </details>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
