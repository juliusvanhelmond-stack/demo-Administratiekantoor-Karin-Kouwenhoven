"use client";

import { useId, useState } from "react";
import { faqs } from "@/content/site";

const CARD = ["#ded5c7", "#ece6dc", "#c9d3c0"];

export function Faq() {
  const [open, setOpen] = useState(0);
  const id = useId();

  return (
    <section className="wrap faq" aria-labelledby={`${id}-t`}>
      <div className="faq__inner">
        <h2 id={`${id}-t`} data-reveal>
          Veelgestelde vragen
        </h2>
        <div data-reveal style={{ ["--d" as string]: "80ms" }}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="faq__card"
                style={{ ["--i" as string]: i, ["--card" as string]: CARD[i % CARD.length] }}
              >
                <div className="faq__tab" aria-hidden="true">
                  {f.tab}
                </div>
                <div className="faq__body">
                  <h3>
                    <button
                      type="button"
                      className="faq__q"
                      aria-expanded={isOpen}
                      aria-controls={`${id}-p${i}`}
                      id={`${id}-b${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                    >
                      {f.q}
                      <span className="tri" aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    className="faq__panel"
                    data-open={isOpen}
                    id={`${id}-p${i}`}
                    role="region"
                    aria-labelledby={`${id}-b${i}`}
                    inert={!isOpen}
                  >
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="faq__disclaimer">
          Dit is algemene informatie. Wat voor jouw onderneming geldt, bespreken we persoonlijk.
        </p>
      </div>
    </section>
  );
}
